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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            INNOVAIO
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString('pt-BR')}</span>
            </div>
            
            {!isSimulationActive ? (
              <ScenarioSelector
                scenarios={scenarioTemplates}
                onStartScenario={startScenario}
                trigger={<Button variant="outline">Iniciar Simulação</Button>}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse">
                  SIMULAÇÃO ATIVA
                </Badge>
                <button
                  onClick={stopScenario}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                >
                  Parar Simulação
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Row */}
          <Card className="p-6">
            <InteractiveGlobeDemo alerts={currentAlerts} />
          </Card>
          
          <Card className="p-6">
            <CriticalSignals alerts={currentAlerts} />
          </Card>
          
          {/* Bottom Row */}
          <Card className="p-6">
            <GlobalPulseInfo alerts={currentAlerts} />
          </Card>
          
          <Card className="p-6 relative">
            <LocalMarketData />
            
            {/* Impact Analysis overlay during simulations */}
            {isSimulationActive && scenarioMetrics && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg">
                <ImpactAnalysis scenarioMetrics={scenarioMetrics} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};