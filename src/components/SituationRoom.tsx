import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { CriticalSignals } from "@/components/CriticalSignals";
import { InteractiveGlobeDemo } from "@/components/InteractiveGlobeDemo";
import { GlobalPulseInfo } from "@/components/GlobalPulseInfo";
import { LocalMarketData } from "@/components/LocalMarketData";
import { ScenarioSelector } from "@/components/ScenarioSelector";
import { ImpactAnalysis } from "@/components/ImpactAnalysis";
import { SystemHealthMonitor } from "@/components/SystemHealthMonitor";
import { useScenarioData } from "@/hooks/useScenarioData";
import { Clock, Activity } from "lucide-react";
import { dataService } from "@/services/dataService";

// Real-time alert data from database
interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

export const SituationRoom = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [databaseAlerts, setDatabaseAlerts] = useState<AlertData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [systemInitialized, setSystemInitialized] = useState(false);
  const scenarioData = useScenarioData();
  
  const {
    isSimulationActive,
    startScenario,
    stopScenario,
    setSimulationSpeed,
    getScenarioAlerts,
    getScenarioMetrics,
    scenarioTemplates,
  } = scenarioData;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize system and load real data
  useEffect(() => {
    const initializeSystem = async () => {
      setIsLoadingData(true);
      try {
        // Initialize database seeding and real-time sync
        const { databaseSeeder } = await import('../services/databaseSeeder');
        const { realDataService } = await import('../services/realDataService');
        
        // Check if database has data, seed if needed
        const summary = await databaseSeeder.getSeededDataSummary();
        if (summary.alerts === 0) {
          console.log('🌱 Seeding database with initial data...');
          await databaseSeeder.seedDatabase();
        }
        
        // Start real-time data sync
        await realDataService.startAutoSync();
        
        // Load alerts from database
        const alerts = await realDataService.getAlertsFromDatabase({ limit: 50 });
        
        // Format alerts for UI with type mapping
        const formattedAlerts: AlertData[] = alerts.map((alert: any) => ({
          id: alert.alert_id,
          type: alert.type === 'critical' ? 'red' : 
                alert.type === 'trending' ? 'yellow' : 'blue',
          title: alert.title,
          description: alert.description,
          region: alert.region,
          urgency: alert.urgency,
          timestamp: new Date(alert.timestamp)
        }));
        
        setDatabaseAlerts(formattedAlerts);
        setSystemInitialized(true);
        
        console.log(`✅ Sistema inicializado com ${formattedAlerts.length} alertas do banco de dados`);
      } catch (error) {
        console.error('❌ Error initializing system:', error);
        setDatabaseAlerts([]);
      } finally {
        setIsLoadingData(false);
      }
    };

    initializeSystem();
  }, []);

  // Determine which alerts to display - now 100% real data
  const currentAlerts = isSimulationActive 
    ? getScenarioAlerts() 
    : databaseAlerts;
  const scenarioMetrics = getScenarioMetrics();

  return (
    <div className={`min-h-screen p-2 sm:p-4 transition-colors duration-500 ${
      isSimulationActive 
        ? 'bg-background bg-gradient-to-br from-background via-background to-warning/5' 
        : 'bg-background'
    }`}>
      <div className="max-w-[1800px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              INNOVAIO
            </h1>
            {isSimulationActive && (
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 animate-pulse">
                SIMULAÇÃO ATIVA
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isLoadingData ? 'bg-yellow-400 animate-pulse' : 
                systemInitialized ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span>
                {isLoadingData ? 'Inicializando sistema...' : 
                 systemInitialized ? `${databaseAlerts.length} alertas em tempo real` : 'Sistema offline'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString('pt-BR')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>{currentTime.toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {!isSimulationActive ? (
              <ScenarioSelector
                scenarios={scenarioTemplates}
                onStartScenario={startScenario}
                trigger={<Button variant="outline">Iniciar Simulação</Button>}
              />
            ) : (
              <button
                onClick={stopScenario}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
              >
                Parar Simulação
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Globe and Signals */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="lg:col-span-1">
                <InteractiveGlobeDemo alerts={currentAlerts} />
              </div>
              
              <div className="lg:col-span-1">
                <CriticalSignals alerts={currentAlerts} />
              </div>
            </div>
            
            {/* Global Pulse and Local Market */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <GlobalPulseInfo alerts={currentAlerts} />
              <LocalMarketData />
            </div>
          </div>

          {/* Right Column - System Health */}
          <div className="space-y-4 sm:space-y-6">
            <SystemHealthMonitor />
            
            {/* Impact Analysis during simulations */}
            {isSimulationActive && scenarioMetrics && (
              <ImpactAnalysis scenarioMetrics={scenarioMetrics} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};