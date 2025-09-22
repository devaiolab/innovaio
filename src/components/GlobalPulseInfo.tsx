import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { GlobalPulseDetails } from "./GlobalPulseDetails";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

interface GlobalPulseInfoProps {
  alerts: AlertData[];
}

export const GlobalPulseInfo = ({
  alerts
}: GlobalPulseInfoProps) => {
  const [realTime, setRealTime] = useState(new Date());
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRealTime(new Date());
      setPulseCount(prev => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const criticalCount = alerts.filter(a => a.type === "red").length;
  const alertCount = alerts.filter(a => a.type === "yellow").length;
  const signalCount = alerts.filter(a => a.type === "blue").length;
  const globalIntensity = Math.round(alerts.reduce((acc, alert) => acc + alert.urgency, 0) / alerts.length);

  const getIntensityLevel = (intensity: number) => {
    if (intensity >= 85) return {
      level: "EXTREMA",
      color: "text-destructive"
    };
    if (intensity >= 70) return {
      level: "ALTA",
      color: "text-warning"
    };
    if (intensity >= 50) return {
      level: "MODERADA",
      color: "text-primary"
    };
    return {
      level: "BAIXA",
      color: "text-success"
    };
  };

  const intensityInfo = getIntensityLevel(globalIntensity);
  const recentAlerts = alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 3);

  return (
    <Card className="p-4 border-primary/20 cyber-glow h-full my-0 px-6 py-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-primary" fill="none" />
        <h3 className="font-semibold text-base">Status Regional</h3>
        <Badge variant="outline" className="ml-auto text-xs">
          TEMPO REAL
        </Badge>
      </div>

      {/* Top Section - Key Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <div className="text-xl font-bold text-primary mb-1">{alerts.length}</div>
          <div className="text-xs text-muted-foreground">Pulsos Ativos</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <div className={`text-xl font-bold mb-1 ${intensityInfo.color}`}>
            {globalIntensity}%
          </div>
          <div className="text-xs text-muted-foreground">Intensidade</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <div className="text-xl font-bold text-primary mb-1">{Math.floor(Math.random() * 50) + 120}</div>
          <div className="text-xs text-muted-foreground">Regiões</div>
        </div>
      </div>

      {/* Alert Distribution - Compact Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex flex-col items-center p-2 rounded-lg bg-destructive/10">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive mb-1"></div>
          <div className="text-sm font-medium text-destructive">{criticalCount}</div>
          <div className="text-xs text-muted-foreground">Críticos</div>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-warning/10">
          <div className="w-2.5 h-2.5 rounded-full bg-warning mb-1"></div>
          <div className="text-sm font-medium text-warning">{alertCount}</div>
          <div className="text-xs text-muted-foreground">Alertas</div>
        </div>
        <div className="flex flex-col items-center p-2 rounded-lg bg-primary/10">
          <div className="w-2.5 h-2.5 rounded-full bg-primary mb-1"></div>
          <div className="text-sm font-medium text-primary">{signalCount}</div>
          <div className="text-xs text-muted-foreground">Sinais</div>
        </div>
      </div>

      {/* Intensity Level - Redesigned */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/20 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Nível Regional</span>
          <Badge variant="outline" className={`text-xs ${intensityInfo.color} border-current`}>
            {intensityInfo.level}
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              globalIntensity >= 85 ? 'bg-destructive' : 
              globalIntensity >= 70 ? 'bg-warning' : 
              globalIntensity >= 50 ? 'bg-primary' : 'bg-success'
            }`} 
            style={{ width: `${globalIntensity}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Activity - Improved Layout */}
      <div className="flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" fill="none" />
          <span className="text-sm font-medium">Atividade Recente</span>
        </div>
        <div className="space-y-2">
          {recentAlerts.slice(0, 3).map(alert => (
            <div key={alert.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                alert.type === 'red' ? 'bg-destructive' : 
                alert.type === 'yellow' ? 'bg-warning' : 'bg-primary'
              }`}></div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm truncate">{alert.title}</div>
                <div className="text-xs text-muted-foreground truncate">{alert.region}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Clock className="h-3 w-3" fill="none" />
                <span>{Math.floor((realTime.getTime() - alert.timestamp.getTime()) / (1000 * 60 * 60))}h</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Status & Actions */}
      <div className="mt-4 pt-3 border-t border-border/50 space-y-3">
        {/* Live Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success pulse-glow"></div>
            <span className="text-muted-foreground">Sistema Ativo</span>
          </div>
          <span className="font-mono text-primary">
            {realTime.toLocaleTimeString('pt-BR')}
          </span>
        </div>

        {/* Analysis Button */}
        <GlobalPulseDetails 
          alerts={alerts} 
          trigger={
            <Button variant="outline" size="sm" className="w-full text-sm cyber-glow">
              Ver Análise Detalhada
            </Button>
          } 
        />
      </div>
    </Card>
  );
};