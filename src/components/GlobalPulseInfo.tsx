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
  return <Card className="p-4 border-primary/20 cyber-glow h-full my-0 px-[28px] py-[23px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-4 w-4 text-primary" fill="none" />
          <h3 className="font-semibold text-sm">Status Regional</h3>
          <Badge variant="outline" className="ml-auto text-xs">
            TEMPO REAL
          </Badge>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{alerts.length}</div>
            <div className="text-xs text-muted-foreground">Pulsos Regionais</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${intensityInfo.color}`}>
              {globalIntensity}%
            </div>
            <div className="text-xs text-muted-foreground">Intensidade Regional</div>
          </div>
        </div>

        {/* Alert Distribution */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              <span>Críticos</span>
            </div>
            <span className="font-medium">{criticalCount}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <span>Alertas</span>
            </div>
            <span className="font-medium">{alertCount}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Sinais</span>
            </div>
            <span className="font-medium">{signalCount}</span>
          </div>
        </div>

        {/* Intensity Level */}
        <div className="p-2 rounded-lg bg-muted/50 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Nível Regional:</span>
            <Badge variant="outline" className={`text-xs ${intensityInfo.color} border-current`}>
              {intensityInfo.level}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className={`h-2 rounded-full transition-all duration-1000 ${globalIntensity >= 85 ? 'bg-destructive' : globalIntensity >= 70 ? 'bg-warning' : globalIntensity >= 50 ? 'bg-primary' : 'bg-success'}`} style={{
          width: `${globalIntensity}%`
        }}></div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-3 w-3 text-muted-foreground" fill="none" />
            <span className="text-xs text-muted-foreground">Atividade Regional</span>
          </div>
          <div className="space-y-2">
            {recentAlerts.map(alert => <div key={alert.id} className="flex items-start gap-2 text-xs">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${alert.type === 'red' ? 'bg-destructive' : alert.type === 'yellow' ? 'bg-warning' : 'bg-primary'}`}></div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{alert.title}</div>
                  <div className="text-muted-foreground truncate">{alert.region}</div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-2 w-2" fill="none" />
                  <span>{Math.floor((realTime.getTime() - alert.timestamp.getTime()) / (1000 * 60 * 60))}h</span>
                </div>
              </div>)}
          </div>
        </div>

        {/* Live Status */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success pulse-glow"></div>
              <span>Monitoramento Regional</span>
            </div>
            <span className="font-mono">
              {realTime.toLocaleTimeString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Analysis Button */}
        <div className="mt-4">
          <GlobalPulseDetails alerts={alerts} trigger={<Button variant="outline" size="sm" className="w-full text-xs">
                Ver Análise Completa
              </Button>} />
        </div>
      </Card>;
};