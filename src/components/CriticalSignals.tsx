import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog } from "./AlertDialog";
import { Bot, Clock, MapPin, AlertTriangle, Zap } from "lucide-react";
import { CriticalSignalUnifiedDetails } from "./CriticalSignalUnifiedDetails";
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
  const displayedAlerts = criticalAlerts.slice(0, 4);
  const hasMoreAlerts = criticalAlerts.length > 4;
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
  return <Card className="h-full p-4 sm:p-6 flex flex-col border-primary/20 cyber-glow overflow-hidden my-0 py-[23px] px-[28px]">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" />
        <h2 className="text-base sm:text-xl font-semibold">Alertas Globais</h2>
        <Badge variant="destructive" className="ml-auto text-xs">
          ATIVO
        </Badge>
      </div>

      <div className="space-y-3 flex-1 min-h-0">
        {displayedAlerts.map((alert, index) => {
        const config = getAlertConfig(alert.type);
        const IconComponent = config.icon;
        return <Card key={alert.id} className={`p-3 sm:p-4 border-l-4 ${alert.type === 'red' ? 'border-l-destructive bg-destructive/5' : alert.type === 'yellow' ? 'border-l-warning bg-warning/5' : 'border-l-primary bg-primary/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${config.color} text-xs`}>
                  <IconComponent className="h-3 w-3 mr-1" fill="none" />
                  {config.label}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" fill="none" />
                  {formatTimeAgo(alert.timestamp)}
                </div>
              </div>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight">{alert.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-tight">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" fill="none" />
                    <span className="text-xs text-muted-foreground truncate">{alert.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">{alert.urgency}%</span>
                    <CriticalSignalUnifiedDetails signal={alert} trigger={<Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-6 hover:bg-primary/10">
                          Ver Detalhes
                        </Button>} />
                  </div>
                </div>
            </Card>;
      })}
        
        {hasMoreAlerts && <div className="flex justify-center pt-4 mt-auto">
            <AlertDialog alerts={alerts} trigger={<Button variant="outline" size="sm" className="cyber-glow text-xs w-full h-8">
                  <span className="sm:hidden">+{criticalAlerts.length - 4}</span>
                  <span className="hidden sm:inline">Ver Mais {criticalAlerts.length - 4} Alertas</span>
                </Button>} />
          </div>}
      </div>
    </Card>;
};