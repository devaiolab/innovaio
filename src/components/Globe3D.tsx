import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

interface Globe3DProps {
  alerts: AlertData[];
}

export const Globe3D = ({ alerts }: Globe3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 32);
    
    // Earth material with glow effect
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e40af,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Add wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.01, 32, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Create pulse points based on alerts
    const pulsePoints: THREE.Mesh[] = [];
    alerts.forEach((alert, index) => {
      // Convert region to approximate coordinates
      const coords = getRegionCoordinates(alert.region);
      const position = latLongToVector3(coords.lat, coords.lng, 1.05);

      const pulseGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      let pulseColor = 0x0066ff; // blue
      
      if (alert.type === 'yellow') pulseColor = 0xffaa00;
      if (alert.type === 'red') pulseColor = 0xff0044;

      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: pulseColor,
        transparent: true,
        opacity: 0.8,
      });

      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.copy(position);
      scene.add(pulse);
      pulsePoints.push(pulse);

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: pulseColor,
        transparent: true,
        opacity: 0.3,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(position);
      scene.add(glow);
    });

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;
    };

    mountRef.current.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Smooth rotation following mouse
      earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.05;
      earth.rotation.y += (targetRotationY - earth.rotation.y) * 0.05;
      wireframe.rotation.x = earth.rotation.x;
      wireframe.rotation.y = earth.rotation.y;

      // Auto-rotation when not interacting
      earth.rotation.y += 0.002;
      wireframe.rotation.y += 0.002;

      // Animate pulse points
      const time = Date.now() * 0.003;
      pulsePoints.forEach((pulse, index) => {
        const scale = 1 + Math.sin(time + index) * 0.3;
        pulse.scale.setScalar(scale);
        
        // Update opacity for pulse effect
        const material = pulse.material as THREE.MeshBasicMaterial;
        material.opacity = 0.8 + Math.sin(time * 2 + index) * 0.2;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [alerts]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full rounded-lg overflow-hidden cyber-glow"
      style={{ minHeight: '400px' }}
    />
  );
};

// Helper functions
function latLongToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function getRegionCoordinates(region: string): { lat: number; lng: number } {
  const coordinates: Record<string, { lat: number; lng: number }> = {
    "América do Norte": { lat: 45, lng: -100 },
    "América do Sul": { lat: -15, lng: -60 },
    "Europa": { lat: 50, lng: 10 },
    "Ásia-Pacífico": { lat: 35, lng: 120 },
    "África": { lat: 0, lng: 20 },
    "Oceania": { lat: -25, lng: 140 },
  };

  return coordinates[region] || { lat: 0, lng: 0 };
}