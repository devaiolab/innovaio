import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Play, 
  Pause,
  MapPin,
  Activity,
  AlertTriangle,
  Clock,
  TrendingUp
} from "lucide-react";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

interface InteractiveGlobeDemoProps {
  alerts: AlertData[];
}

interface SelectedAlert {
  alert: AlertData;
  position: THREE.Vector3;
  worldPosition: THREE.Vector3;
}

interface FilterState {
  types: ("blue" | "yellow" | "red")[];
  urgencyMin: number;
  urgencyMax: number;
  timeRange: "1h" | "6h" | "24h" | "all";
}

export const InteractiveGlobeDemo = ({ alerts }: InteractiveGlobeDemoProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const frameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster>();
  const alertMeshesRef = useRef<THREE.Mesh[]>([]);
  
  const [selectedAlert, setSelectedAlert] = useState<SelectedAlert | null>(null);
  const [hoveredAlert, setHoveredAlert] = useState<AlertData | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    types: ["blue", "yellow", "red"],
    urgencyMin: 0,
    urgencyMax: 100,
    timeRange: "all"
  });

  // Enhanced geographic coordinates with more locations
  const getRegionCoordinates = (region: string): { lat: number; lng: number } => {
    const coordinates: Record<string, { lat: number; lng: number }> = {
      // Continents
      "América do Norte": { lat: 45, lng: -100 },
      "América do Sul": { lat: -15, lng: -60 },
      "Europa": { lat: 50, lng: 10 },
      "Ásia-Pacífico": { lat: 35, lng: 120 },
      "África": { lat: 0, lng: 20 },
      "Oceania": { lat: -25, lng: 140 },
      "Global": { lat: 0, lng: 0 },
      
      // Brazil regions
      "Brasil": { lat: -15, lng: -47 },
      "São Paulo": { lat: -23.550520, lng: -46.633309 },
      "São Bernardo do Campo": { lat: -23.691, lng: -46.565 },
      "Santo André": { lat: -23.663, lng: -46.531 },
      "Rio de Janeiro": { lat: -22.908333, lng: -43.196388 },
      "Brasília": { lat: -15.793889, lng: -47.882778 },
      "Belo Horizonte": { lat: -19.916667, lng: -43.933333 },
      "Salvador": { lat: -12.971111, lng: -38.501389 },
      "Recife": { lat: -8.047562, lng: -34.877 },
      "Porto Alegre": { lat: -30.034722, lng: -51.217778 },
      "Curitiba": { lat: -25.428954, lng: -49.267137 },
      "Fortaleza": { lat: -3.731667, lng: -38.526667 },
      "Manaus": { lat: -3.119167, lng: -60.021389 },
      
      // International
      "China": { lat: 35.86166, lng: 104.195397 },
      "Estados Unidos": { lat: 39.828175, lng: -98.5795 },
      "Coreia do Sul": { lat: 35.907757, lng: 127.766922 },
      "Japão": { lat: 36.204824, lng: 138.252924 },
      "Alemanha": { lat: 51.165691, lng: 10.451526 },
      "Reino Unido": { lat: 55.378051, lng: -3.435973 },
      "França": { lat: 46.227638, lng: 2.213749 },
      "Singapura": { lat: 1.352083, lng: 103.819836 },
      "Índia": { lat: 20.593684, lng: 78.96288 },
      "Austrália": { lat: -25.274398, lng: 133.775136 },
      "Canadá": { lat: 56.130366, lng: -106.346771 },
      "Rússia": { lat: 61.52401, lng: 105.318756 },
      "México": { lat: 23.634501, lng: -102.552784 },
      "Argentina": { lat: -38.416097, lng: -63.616672 },
      "Chile": { lat: -35.675147, lng: -71.542969 },
      "Colômbia": { lat: 4.570868, lng: -74.297333 },
      "Peru": { lat: -9.189967, lng: -75.015152 },
      "Venezuela": { lat: 6.42375, lng: -66.58973 },
      "Equador": { lat: -1.831239, lng: -78.183406 },
      "Uruguai": { lat: -32.522779, lng: -55.765835 },
      "Paraguai": { lat: -23.442503, lng: -58.443832 },
      "Bolívia": { lat: -16.290154, lng: -63.588653 },
      "Guiana": { lat: 4.860416, lng: -58.93018 },
      "Suriname": { lat: 3.919305, lng: -56.027783 },
      "Guiana Francesa": { lat: 3.933889, lng: -53.125782 },
    };

    return coordinates[region] || { lat: 0, lng: 0 };
  };

  const latLongToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  };

  const filterAlerts = useCallback((alerts: AlertData[]) => {
    const now = Date.now();
    const timeRanges = {
      "1h": 1 * 60 * 60 * 1000,
      "6h": 6 * 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "all": Infinity
    };

    return alerts.filter(alert => {
      // Type filter
      if (!filters.types.includes(alert.type)) return false;
      
      // Urgency filter
      if (alert.urgency < filters.urgencyMin || alert.urgency > filters.urgencyMax) return false;
      
      // Time filter
      if (filters.timeRange !== "all") {
        const alertAge = now - alert.timestamp.getTime();
        if (alertAge > timeRanges[filters.timeRange]) return false;
      }
      
      return true;
    });
  }, [filters]);

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!mountRef.current || !cameraRef.current || !raycasterRef.current) return;
    
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    mouseRef.current = { x, y };
    
    // Raycasting for hover detection
    raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(alertMeshesRef.current);
    
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const alertIndex = alertMeshesRef.current.indexOf(mesh);
      const filteredAlerts = filterAlerts(alerts);
      
      if (alertIndex >= 0 && alertIndex < filteredAlerts.length) {
        setHoveredAlert(filteredAlerts[alertIndex]);
        document.body.style.cursor = 'pointer';
      }
    } else {
      setHoveredAlert(null);
      document.body.style.cursor = 'default';
    }
  }, [alerts, filterAlerts]);

  const onClick = useCallback((event: MouseEvent) => {
    if (!mountRef.current || !cameraRef.current || !raycasterRef.current) return;
    
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycasterRef.current.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(alertMeshesRef.current);
    
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const alertIndex = alertMeshesRef.current.indexOf(mesh);
      const filteredAlerts = filterAlerts(alerts);
      
      if (alertIndex >= 0 && alertIndex < filteredAlerts.length) {
        const alert = filteredAlerts[alertIndex];
        const coords = getRegionCoordinates(alert.region);
        const position = latLongToVector3(coords.lat, coords.lng, 1.05);
        
        setSelectedAlert({
          alert,
          position,
          worldPosition: intersects[0].point
        });
      }
    }
  }, [alerts, filterAlerts]);

  const zoomToRegion = (region: string) => {
    if (!cameraRef.current) return;
    
    const coords = getRegionCoordinates(region);
    const position = latLongToVector3(coords.lat, coords.lng, 2.5);
    
    // Animate camera to position
    const startPosition = cameraRef.current.position.clone();
    const targetPosition = position;
    const duration = 1000;
    const startTime = Date.now();
    
    const animateCamera = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      cameraRef.current!.position.lerpVectors(startPosition, targetPosition, eased);
      cameraRef.current!.lookAt(0, 0, 0);
      
      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      }
    };
    
    animateCamera();
  };

  const resetCamera = () => {
    if (!cameraRef.current) return;
    
    const startPosition = cameraRef.current.position.clone();
    const targetPosition = new THREE.Vector3(0, 0, 3);
    const duration = 1000;
    const startTime = Date.now();
    
    const animateCamera = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      cameraRef.current!.position.lerpVectors(startPosition, targetPosition, eased);
      cameraRef.current!.lookAt(0, 0, 0);
      
      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      }
    };
    
    animateCamera();
  };

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
    cameraRef.current = camera;

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

    // Raycaster for interaction
    raycasterRef.current = new THREE.Raycaster();

    // Create enhanced Earth with better materials
    const earthGeometry = new THREE.SphereGeometry(1, 128, 64);
    
    // Earth material with improved visuals
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e40af,
      transparent: true,
      opacity: 0.85,
      shininess: 100,
      specular: 0x00d4ff,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Enhanced wireframe with subtle animation
    const wireframeGeometry = new THREE.SphereGeometry(1.005, 64, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Atmospheric glow effect
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xff6b35, 0.3);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    // Event listeners
    mountRef.current.addEventListener('mousemove', onMouseMove);
    mountRef.current.addEventListener('click', onClick);

    // Animation loop
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseInteracting = false;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (!mouseInteracting && isRotating) {
        earth.rotation.y += 0.003;
        wireframe.rotation.y += 0.003;
        atmosphere.rotation.y += 0.002;
      } else {
        // Mouse interaction
        targetRotationX = mouseRef.current.y * 0.3;
        targetRotationY = mouseRef.current.x * 0.3;
        
        earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.05;
        earth.rotation.y += (targetRotationY - earth.rotation.y) * 0.05;
        wireframe.rotation.x = earth.rotation.x;
        wireframe.rotation.y = earth.rotation.y;
        atmosphere.rotation.x = earth.rotation.x * 0.8;
        atmosphere.rotation.y = earth.rotation.y * 0.8;
      }

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
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', onMouseMove);
        mountRef.current.removeEventListener('click', onClick);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      
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
  }, [onMouseMove, onClick, isRotating]);

  // Update alert points when alerts or filters change
  useEffect(() => {
    if (!sceneRef.current) return;

    // Remove existing alert meshes
    alertMeshesRef.current.forEach(mesh => {
      sceneRef.current!.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
    alertMeshesRef.current = [];

    const filteredAlerts = filterAlerts(alerts);

    // Create new alert points
    filteredAlerts.forEach((alert, index) => {
      const coords = getRegionCoordinates(alert.region);
      const position = latLongToVector3(coords.lat, coords.lng, 1.05);

      // Enhanced sizing based on urgency
      const baseSize = 0.012 + (alert.urgency / 100) * 0.025;
      const pulseGeometry = new THREE.SphereGeometry(baseSize, 20, 20);
      
      let pulseColor = 0x00d4ff; // blue - sinais fracos
      if (alert.type === 'yellow') pulseColor = 0xffaa00; // yellow - alertas
      if (alert.type === 'red') pulseColor = 0xff0044; // red - críticos

      const pulseMaterial = new THREE.MeshPhongMaterial({
        color: pulseColor,
        transparent: true,
        opacity: 0.9,
        emissive: pulseColor,
        emissiveIntensity: 0.3,
      });

      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.copy(position);
      sceneRef.current!.add(pulse);
      alertMeshesRef.current.push(pulse);

      // Enhanced glow effect
      const glowSize = baseSize * (2.5 + alert.urgency / 40);
      const glowGeometry = new THREE.SphereGeometry(glowSize, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: pulseColor,
        transparent: true,
        opacity: 0.15 + (alert.urgency / 100) * 0.25,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(position);
      sceneRef.current!.add(glow);

      // Connection lines for critical alerts
      if (alert.type === 'red') {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          position
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: pulseColor,
          transparent: true,
          opacity: 0.4,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        sceneRef.current!.add(line);
      }

      // Pulse animation effect
      const time = Date.now() * 0.003;
      const pulseSpeed = alert.type === 'red' ? 5 : alert.type === 'yellow' ? 3 : 2;
      const animateAlert = () => {
        if (pulse.parent) {
          const currentTime = Date.now() * 0.003;
          const scale = 1 + Math.sin(currentTime * pulseSpeed + index) * (0.4 + alert.urgency / 200);
          pulse.scale.setScalar(scale);
          
          const glowScale = 1 + Math.sin(currentTime * pulseSpeed * 0.5 + index) * (0.3 + alert.urgency / 300);
          glow.scale.setScalar(glowScale);
          
          requestAnimationFrame(animateAlert);
        }
      };
      animateAlert();
    });
  }, [alerts, filters, filterAlerts]);

  const getAlertTypeInfo = (type: string) => {
    switch (type) {
      case 'red':
        return { label: 'Crítico', color: 'text-red-400', icon: AlertTriangle };
      case 'yellow':
        return { label: 'Alerta', color: 'text-yellow-400', icon: TrendingUp };
      case 'blue':
        return { label: 'Sinal', color: 'text-blue-400', icon: Activity };
      default:
        return { label: 'Desconhecido', color: 'text-gray-400', icon: Activity };
    }
  };

  const filteredAlerts = filterAlerts(alerts);
  const alertCounts = {
    red: filteredAlerts.filter(a => a.type === 'red').length,
    yellow: filteredAlerts.filter(a => a.type === 'yellow').length,
    blue: filteredAlerts.filter(a => a.type === 'blue').length,
  };

  return (
    <div className="relative w-full h-full">
      {/* Main Globe Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-lg overflow-hidden cyber-glow relative"
        style={{ 
          minHeight: '400px',
          maxHeight: '100%',
          isolation: 'isolate',
          zIndex: 1
        }}
      />

      {/* Control Panel */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-2 z-20">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <Filter className="h-4 w-4" />
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsRotating(!isRotating)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={resetCamera}
          className="bg-background/80 backdrop-blur-sm"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Panel */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex flex-wrap gap-1 sm:gap-2 z-20">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-red-400 border-red-400/50 text-xs">
          <AlertTriangle className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">{alertCounts.red} Críticos</span>
          <span className="sm:hidden">{alertCounts.red}</span>
        </Badge>
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-yellow-400 border-yellow-400/50 text-xs">
          <TrendingUp className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">{alertCounts.yellow} Alertas</span>
          <span className="sm:hidden">{alertCounts.yellow}</span>
        </Badge>
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-blue-400 border-blue-400/50 text-xs">
          <Activity className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">{alertCounts.blue} Sinais</span>
          <span className="sm:hidden">{alertCounts.blue}</span>
        </Badge>
      </div>

      {/* Hover Tooltip */}
      {hoveredAlert && (
        <div className="absolute pointer-events-none z-40 bg-background/95 backdrop-blur-sm border rounded-lg p-2 sm:p-3 shadow-lg max-w-xs"
             style={{
               left: Math.min(
                 (mouseRef.current.x + 1) * (mountRef.current?.clientWidth || 0) / 2 + 10,
                 (mountRef.current?.clientWidth || 0) - 250
               ),
               top: Math.max(
                 (-mouseRef.current.y + 1) * (mountRef.current?.clientHeight || 0) / 2 - 50,
                 10
               )
             }}>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={getAlertTypeInfo(hoveredAlert.type).color}>
              {getAlertTypeInfo(hoveredAlert.type).label}
            </Badge>
            <span className="text-xs text-muted-foreground">{hoveredAlert.urgency}%</span>
          </div>
          <h4 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2">{hoveredAlert.title}</h4>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {hoveredAlert.region}
          </p>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <Card className="absolute top-16 right-2 sm:right-4 w-[calc(100vw-1rem)] sm:w-80 max-w-sm p-3 sm:p-4 bg-background/95 backdrop-blur-sm z-30">
          <h3 className="font-semibold mb-3 text-sm sm:text-base">Filtros</h3>
          
          <div className="space-y-4">
            {/* Type Filters */}
            <div>
              <label className="text-sm font-medium mb-2 block">Tipos de Alerta</label>
              <div className="flex gap-2 flex-wrap">
                {(['red', 'yellow', 'blue'] as const).map(type => (
                  <Button
                    key={type}
                    size="sm"
                    variant={filters.types.includes(type) ? "default" : "outline"}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      types: prev.types.includes(type) 
                        ? prev.types.filter(t => t !== type)
                        : [...prev.types, type]
                    }))}
                    className={`${getAlertTypeInfo(type).color} ${
                      filters.types.includes(type) ? 'bg-primary' : ''
                    }`}
                  >
                    {getAlertTypeInfo(type).label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <div className="flex gap-2 flex-wrap">
                {(['1h', '6h', '24h', 'all'] as const).map(range => (
                  <Button
                    key={range}
                    size="sm"
                    variant={filters.timeRange === range ? "default" : "outline"}
                    onClick={() => setFilters(prev => ({ ...prev, timeRange: range }))}
                  >
                    {range === 'all' ? 'Todos' : range}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <label className="text-sm font-medium mb-2 block">Ações Rápidas</label>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => zoomToRegion("Brasil")}
                >
                  <ZoomIn className="h-3 w-3 mr-1" />
                  Brasil
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => zoomToRegion("São Bernardo do Campo")}
                >
                  <ZoomIn className="h-3 w-3 mr-1" />
                  SBC
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Alert Detail Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Detalhes do Alerta
            </DialogTitle>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getAlertTypeInfo(selectedAlert.alert.type).color}>
                  {getAlertTypeInfo(selectedAlert.alert.type).label}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {selectedAlert.alert.timestamp.toLocaleString('pt-BR')}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedAlert.alert.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedAlert.alert.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Região</label>
                  <p className="font-medium">{selectedAlert.alert.region}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Urgência</label>
                  <p className="font-medium">{selectedAlert.alert.urgency}%</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => zoomToRegion(selectedAlert.alert.region)}
                  className="flex-1"
                >
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Focar Região
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedAlert(null)}
                  className="flex-1"
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};