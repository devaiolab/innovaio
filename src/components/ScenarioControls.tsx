import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Square, Zap, Clock, Activity, AlertTriangle } from "lucide-react";

interface ScenarioControlsProps {
  scenarioMetrics: {
    scenario: any;
    runtime: number;
    speed: number;
  } | null;
  onStop: () => void;
  onSpeedChange: (speed: number) => void;
}

export const ScenarioControls = ({ scenarioMetrics, onStop, onSpeedChange }: ScenarioControlsProps) => {
  if (!scenarioMetrics) return null;

  const { scenario, runtime, speed } = scenarioMetrics;
  const progressPercentage = Math.min((runtime / (scenario.duration * 60)) * 100, 100);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "low": return "border-success text-success bg-success/10";
      case "medium": return "border-warning text-warning bg-warning/10";
      case "high": return "border-destructive text-destructive bg-destructive/10";
      default: return "border-muted";
    }
  };

  return (
    <Card className="p-4 border-warning bg-warning/5 cyber-glow">
      {/* Header with Simulation Active Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-warning" fill="none" />
          <h3 className="font-semibold text-sm">Simulação Ativa</h3>
          <Badge className="bg-warning text-warning-foreground pulse-glow">
            <Activity className="h-3 w-3 mr-1" />
            CENÁRIO
          </Badge>
        </div>
        <Button
          onClick={onStop}
          variant="outline"
          size="sm"
          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Square className="h-3 w-3 mr-1" />
          Parar
        </Button>
      </div>

      {/* Scenario Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-sm mb-2">{scenario.name}</h4>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getIntensityColor(scenario.intensity)}>
              {scenario.intensity.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {scenario.category.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Tempo Decorrido:</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="font-mono">{formatTime(runtime)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Duração Total:</span>
            <span className="font-mono">{formatTime(scenario.duration * 60)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground">Progresso da Simulação</span>
          <span className="font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2"
        />
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Velocidade da Simulação</span>
          <span className="font-medium">{speed}x</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          max={5}
          min={0.5}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0.5x</span>
          <span>1x</span>
          <span>2x</span>
          <span>5x</span>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-4 p-2 rounded-lg bg-warning/10 border border-warning/20">
        <div className="flex items-center gap-2 text-xs text-warning">
          <AlertTriangle className="h-3 w-3" />
          <span>Dados simulados - Não refletem a realidade atual</span>
        </div>
      </div>
    </Card>
  );
};