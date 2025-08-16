import { useState, useEffect } from "react";
import { Globe3D } from "./Globe3D";
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
    type: "yellow",
    title: "Tendência Emergente - Biomateriais",
    description: "Convergência de nanotecnologia e biotecnologia criando novos materiais autorreparáveis.",
    region: "Europa",
    urgency: 75,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  },
  {
    id: "3",
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
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary cyber-glow" />
            <h1 className="text-3xl font-bold gradient-text">ORÁCULO IA</h1>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            SITUATION ROOM
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Sistema Ativo</div>
            <div className="text-lg font-mono text-primary">
              {currentTime.toLocaleTimeString('pt-BR')}
            </div>
          </div>
          <Button 
            onClick={() => setScenarioMode(!scenarioMode)}
            variant={scenarioMode ? "default" : "outline"}
            className="cyber-glow"
          >
            <Zap className="h-4 w-4 mr-2" />
            MODO CENÁRIO
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Globe Section */}
        <div className="lg:col-span-2">
          <Card className="h-[500px] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Pulsos Globais de Tendências</h2>
              <Badge variant="outline" className="ml-auto">
                <Activity className="h-3 w-3 mr-1" />
                Em Tempo Real
              </Badge>
            </div>
            <Globe3D alerts={mockAlerts} />
          </Card>
        </div>

        {/* Critical Signals */}
        <div>
          <CriticalSignals alerts={mockAlerts.slice(0, 3)} />
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