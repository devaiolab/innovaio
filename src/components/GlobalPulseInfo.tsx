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

export const GlobalPulseInfo = ({ alerts }: GlobalPulseInfoProps) => {
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

  const globalIntensity = Math.round(
    alerts.reduce((acc, alert) => acc + alert.urgency, 0) / alerts.length
  );

  const getIntensityLevel = (intensity: number) => {
    if (intensity >= 85) return { level: "EXTREMA", color: "text-destructive" };
    if (intensity >= 70) return { level: "ALTA", color: "text-warning" };
    if (intensity >= 50) return { level: "MODERADA", color: "text-primary" };
    return { level: "BAIXA", color: "text-success" };
  };

  const intensityInfo = getIntensityLevel(globalIntensity);

  const recentAlerts = alerts
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 3);

  return (
    <Card className="p-4 border-primary/20 cyber-glow h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary pulse-glow" />
            <h3 className="font-semibold text-base sm:text-lg">Status Regional</h3>
          </div>
          <Badge variant="outline" className="text-xs w-fit sm:ml-auto">
            SÃO PAULO
          </Badge>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-xl sm:text-2xl font-bold text-primary">{alerts.length}</div>
            <div className="text-xs text-muted-foreground">Pulsos Ativos</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className={`text-xl sm:text-2xl font-bold ${intensityInfo.color}`}>
              {globalIntensity}%
            </div>
            <div className="text-xs text-muted-foreground">Intensidade</div>
          </div>
        </div>

        {/* Alert Distribution */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              <span>Críticos</span>
            </div>
            <span className="font-medium">{criticalCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <span>Alertas</span>
            </div>
            <span className="font-medium">{alertCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Sinais</span>
            </div>
            <span className="font-medium">{signalCount}</span>
          </div>
        </div>

        {/* Intensity Level */}
        <div className="p-3 rounded-lg bg-muted/50 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Nível Regional:</span>
            <Badge 
              variant="outline" 
              className={`text-xs ${intensityInfo.color} border-current`}
            >
              {intensityInfo.level}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
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

        {/* Recent Activity */}
        <div className="flex-1 min-h-0">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Atividade Recente</span>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  alert.type === 'red' ? 'bg-destructive' :
                  alert.type === 'yellow' ? 'bg-warning' : 'bg-primary'
                }`}></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{alert.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{alert.region}</div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{Math.floor((realTime.getTime() - alert.timestamp.getTime()) / (1000 * 60 * 60))}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Status */}
        <div className="mt-6 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success pulse-glow"></div>
              <span>Sistema Ativo</span>
            </div>
            <span className="font-mono">
              {realTime.toLocaleTimeString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Analysis Button */}
        <div className="mt-4">
          <GlobalPulseDetails 
            alerts={alerts}
            trigger={
              <Button variant="outline" size="sm" className="w-full text-xs h-8 cyber-glow">
                Ver Análise Completa
              </Button>
            }
          />
        </div>
      </Card>
  );
};