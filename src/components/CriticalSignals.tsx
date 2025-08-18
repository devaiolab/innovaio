import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog } from "./AlertDialog";
import { Zap, Clock, MapPin, AlertTriangle } from "lucide-react";
import { CriticalSignalDetails } from "./CriticalSignalDetails";
import { AlertImpactAnalysis } from "./AlertImpactAnalysis";
interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}
interface CriticalSignalsProps {
  alerts: AlertData[];
}
export const CriticalSignals = ({
  alerts
}: CriticalSignalsProps) => {
  const criticalAlerts = alerts.filter(alert => alert.urgency >= 75);
  const displayedAlerts = criticalAlerts.slice(0, 3);
  const hasMoreAlerts = criticalAlerts.length > 3;
  const getAlertConfig = (type: AlertData["type"]) => {
    switch (type) {
      case "red":
        return {
          color: "border-destructive text-destructive bg-destructive/10",
          label: "CRÍTICO",
          icon: AlertTriangle,
          priority: "Alta"
        };
      case "yellow":
        return {
          color: "border-warning text-warning bg-warning/10",
          label: "ALERTA",
          icon: Zap,
          priority: "Média"
        };
      case "blue":
        return {
          color: "border-primary text-primary bg-primary/10",
          label: "SINAL",
          icon: Zap,
          priority: "Baixa"
        };
      default:
        return {
          color: "border-muted text-muted-foreground",
          label: "INFO",
          icon: Zap,
          priority: "Baixa"
        };
    }
  };
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "< 1h";
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };
  return <Card className="h-fit p-3 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-6">
        <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-destructive pulse-glow" />
        <h2 className="text-sm sm:text-xl font-semibold">Central de Alertas</h2>
        <Badge variant="destructive" className="ml-auto text-xs">
          ATIVO
        </Badge>
      </div>

      <div className="space-y-1.5 sm:space-y-4">
        {displayedAlerts.map((alert, index) => {
        const config = getAlertConfig(alert.type);
        const IconComponent = config.icon;
        return <Card key={alert.id} className={`p-2.5 sm:p-4 border-l-4 ${alert.type === 'red' ? 'border-l-destructive bg-destructive/5' : alert.type === 'yellow' ? 'border-l-warning bg-warning/5' : 'border-l-primary bg-primary/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <Badge className={config.color}>
                  <IconComponent className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                  {config.label}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-2 w-2 sm:h-3 sm:w-3" />
                  {formatTimeAgo(alert.timestamp)}
                </div>
              </div>
              <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2 leading-tight">{alert.title}</h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-tight">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-2 w-2 sm:h-3 sm:w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">{alert.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold">{alert.urgency}%</span>
                    <CriticalSignalDetails signal={alert} trigger={<Button variant="ghost" size="sm" className="text-xs p-1 h-5">
                          Ver
                        </Button>} />
                    <AlertImpactAnalysis alert={alert} trigger={<Button variant="ghost" size="sm" className="text-xs p-1 h-5">
                          Analisar
                        </Button>} />
                  </div>
                </div>
            </Card>;
      })}
        
        {hasMoreAlerts && <div className="flex justify-center pt-3">
            <AlertDialog alerts={alerts} trigger={<Button variant="outline" size="sm" className="cyber-glow text-xs w-full">
                  <span className="sm:hidden">+{criticalAlerts.length - 3}</span>
                  <span className="hidden sm:inline">Ver Mais {criticalAlerts.length - 3} Alertas</span>
                </Button>} />
          </div>}
      </div>
    </Card>;
};