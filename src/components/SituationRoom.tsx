import { useState, useEffect } from "react";
import { Globe3D } from "./Globe3D";
import { GlobalPulseInfo } from "./GlobalPulseInfo";
import { Navigation } from "./Navigation";
import { CriticalSignals } from "./CriticalSignals";
import { LocalMarketData } from "./LocalMarketData";
import { ScenarioSelector } from "./ScenarioSelector";
import { ScenarioControls } from "./ScenarioControls";
import { ImpactAnalysis } from "./ImpactAnalysis";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Globe, Zap } from "lucide-react";
import { useScenarioData } from "@/hooks/useScenarioData";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

const mockAlerts: AlertData[] = [
  {
    id: "1",
    type: "red",
    title: "Breakthrough Quântico - Criptografia RSA",
    description: "Cientistas chineses da Universidade de Shanghai conseguiram quebrar criptografia RSA de 90-bit usando computação quântica. Ameaça real para sistemas bancários e militares.",
    region: "China",
    urgency: 95,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    type: "red",
    title: "Starlink - Pressão Competitiva Real",
    description: "Starlink consolida preço de R$ 184/mês no Brasil com promoções no equipamento. Ameaça direta aos ISPs regionais em áreas rurais e remotas.",
    region: "Brasil",
    urgency: 88,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: "3",
    type: "yellow",
    title: "ANATEL - Regulamentação 5G Atualizada",
    description: "Resolução 777/2025 da ANATEL revoga regulamentações antigas do 5G. Novos requisitos de compartilhamento de infraestrutura impactam contratos existentes.",
    region: "Brasil",
    urgency: 82,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: "4",
    type: "yellow",  
    title: "5G - Expansão Acelerada no Brasil",
    description: "5G ativo em 589 cidades brasileiras com 45% de cobertura média e 28 milhões de usuários. Pressão sobre ISPs tradicionais aumenta.",
    region: "Brasil",
    urgency: 78,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: "5",
    type: "red",
    title: "Mercado Local ABC - Concorrência Acirrada",
    description: "Topnet lidera velocidade média em São Bernardo (573Mbps). K2 Network e Fibercom expandem agressivamente na região ABC paulista.",
    region: "São Bernardo do Campo",
    urgency: 85,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "6",
    type: "yellow",
    title: "Supply Chain - Fibra Óptica Global",
    description: "Fornecedores asiáticos reportam normalização gradual na entrega de cabos de fibra óptica, mas custos 15% mais altos que 2023.",
    region: "Global",
    urgency: 72,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: "7",
    type: "blue",
    title: "Edge Computing - Sinal Fraco Emergente",
    description: "Convergência entre IA generativa e edge computing criando novos modelos de distribuição de conteúdo. Potencial disruptivo para CDNs tradicionais.",
    region: "América do Norte",
    urgency: 65,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: "8",
    type: "yellow",
    title: "Regulamentação IA - União Europeia",
    description: "AI Act europeu entra em vigor afetando provedores de serviços de IA. Compliance custará milhões para grandes players tecnológicos.",
    region: "Europa",
    urgency: 70,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  },
];

export const SituationRoom = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
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

  // Use scenario alerts if simulation is active, otherwise use mock alerts
  const currentAlerts = isSimulationActive ? getScenarioAlerts() : mockAlerts;
  const scenarioMetrics = getScenarioMetrics();

  return (
    <div className={`min-h-screen p-2 sm:p-4 transition-colors duration-500 ${
      isSimulationActive 
        ? 'bg-background bg-gradient-to-br from-background via-background to-warning/5' 
        : 'bg-background'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary cyber-glow" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">ORÁCULO IA</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary text-primary text-xs sm:text-sm w-fit">
              SITUATION ROOM
            </Badge>
            {isSimulationActive && (
              <Badge className="bg-warning text-warning-foreground pulse-glow text-xs sm:text-sm">
                <Activity className="h-3 w-3 mr-1" />
                SIMULAÇÃO ATIVA
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-center sm:text-right">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {isSimulationActive ? "Simulação" : "Sistema Ativo"}
            </div>
            <div className="text-sm sm:text-lg font-mono text-primary">
              {currentTime.toLocaleTimeString('pt-BR')}
            </div>
          </div>
          {!isSimulationActive ? (
            <ScenarioSelector
              scenarios={scenarioTemplates}
              onStartScenario={startScenario}
              trigger={
                <Button 
                  variant="outline"
                  className="cyber-glow text-xs sm:text-sm w-full sm:w-auto"
                  size="sm"
                >
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">MODO CENÁRIO</span>
                  <span className="sm:hidden">CENÁRIO</span>
                </Button>
              }
            />
          ) : (
            <Button 
              onClick={stopScenario}
              variant="destructive"
              className="text-xs sm:text-sm w-full sm:w-auto"
              size="sm"
            >
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">PARAR CENÁRIO</span>
              <span className="sm:hidden">PARAR</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Globe Section */}
        <div className="lg:col-span-7 relative z-0">
          <Card className="h-[200px] lg:h-[500px] p-3 sm:p-6 relative isolate">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h2 className="text-base sm:text-xl font-semibold">Pulsos Globais</h2>
              </div>
              <Badge variant="outline" className="text-xs w-fit sm:ml-auto">
                <Activity className="h-3 w-3 mr-1" />
                Tempo Real
              </Badge>
            </div>
            <div className="relative h-[calc(100%-60px)] overflow-hidden">
              <Globe3D alerts={currentAlerts} />
            </div>
          </Card>
        </div>

        {/* Right Panel - Global Info & Critical Signals */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6 relative z-10">
          {/* Scenario Controls (only when simulation is active) */}
          {isSimulationActive && (
            <ScenarioControls
              scenarioMetrics={scenarioMetrics}
              onStop={stopScenario}
              onSpeedChange={setSimulationSpeed}
            />
          )}
          
          {/* Global Pulse Info */}
          <GlobalPulseInfo alerts={currentAlerts} />
          
          {/* Critical Signals */}
          <CriticalSignals alerts={currentAlerts} />
        </div>
      </div>

      {/* Secondary Grid - Local Market */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Local Market Data */}
        <div className={`${isSimulationActive ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
          <LocalMarketData />
        </div>
        
        {/* Impact Analysis (only when simulation is active) */}
        {isSimulationActive && (
          <div className="lg:col-span-3">
            <ImpactAnalysis scenarioMetrics={scenarioMetrics} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};