import { useState, useEffect } from "react";
import { Globe3D } from "./Globe3D";
import { GlobalPulseInfo } from "./GlobalPulseInfo";
import { AlertPanel } from "./AlertPanel";
import { Navigation } from "./Navigation";
import { CriticalSignals } from "./CriticalSignals";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Globe, Zap } from "lucide-react";

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
    title: "Breakthrough Quântico - Computação",
    description: "Nova arquitetura de processamento quântico demonstrada na China. Potencial disruptivo imediato para criptografia.",
    region: "Ásia-Pacífico",
    urgency: 95,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    type: "red",
    title: "Risco Starlink - Preço Agressivo",
    description: "Starlink reduz preços para R$ 99/mês no Brasil. Competição direta com ISPs regionais em áreas rurais.",
    region: "Brasil",
    urgency: 88,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: "3",
    type: "yellow",
    title: "Regulamentação ANATEL - 5G",
    description: "Novas regras de compartilhamento de infraestrutura podem impactar contratos de backhaul.",
    region: "Brasil",
    urgency: 82,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: "4",
    type: "red",
    title: "Aquisição Big Tech - Fibra",
    description: "Google negocia compra de provedores regionais para expandir Google Fiber no Brasil.",
    region: "São Paulo",
    urgency: 91,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: "5",
    type: "yellow",
    title: "Escassez de Fibra Óptica",
    description: "Fornecedores reportam atraso de 6 meses na entrega de cabos de fibra óptica importados.",
    region: "Brasil",
    urgency: 77,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: "6",
    type: "yellow",
    title: "Tendência Emergente - Biomateriais",
    description: "Convergência de nanotecnologia e biotecnologia criando novos materiais autorreparáveis.",
    region: "Europa",
    urgency: 75,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  },
  {
    id: "7",
    type: "blue",
    title: "Sinal Fraco - IA Generativa Médica",
    description: "Modelos de linguagem especializados em diagnóstico médico mostrando precisão superior a especialistas.",
    region: "América do Norte",
    urgency: 60,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
  },
];

export const SituationRoom = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scenarioMode, setScenarioMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary cyber-glow" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">ORÁCULO IA</h1>
          </div>
          <Badge variant="outline" className="border-primary text-primary text-xs sm:text-sm w-fit">
            SITUATION ROOM
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-center sm:text-right">
            <div className="text-xs sm:text-sm text-muted-foreground">Sistema Ativo</div>
            <div className="text-sm sm:text-lg font-mono text-primary">
              {currentTime.toLocaleTimeString('pt-BR')}
            </div>
          </div>
          <Button 
            onClick={() => setScenarioMode(!scenarioMode)}
            variant={scenarioMode ? "default" : "outline"}
            className="cyber-glow text-xs sm:text-sm w-full sm:w-auto"
            size="sm"
          >
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">MODO CENÁRIO</span>
            <span className="sm:hidden">CENÁRIO</span>
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Globe Section */}
        <div className="md:col-span-2 mb-6 md:mb-0 relative">
          <Card className="h-[300px] sm:h-[400px] lg:h-[500px] p-3 sm:p-6">
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
            <div className="relative h-full">
              <Globe3D alerts={mockAlerts} />
              <GlobalPulseInfo alerts={mockAlerts} />
            </div>
          </Card>
        </div>

        {/* Critical Signals */}
        <div>
          <CriticalSignals alerts={mockAlerts} />
        </div>
      </div>

      {/* Alert Panel */}
      <div className="mb-6">
        <AlertPanel alerts={mockAlerts} />
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};