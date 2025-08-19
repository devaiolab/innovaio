import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Zap, Clock, MapPin, AlertTriangle } from "lucide-react";
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

interface AlertDialogProps {
  alerts: AlertData[];
  trigger: React.ReactNode;
}

export const AlertDialog = ({ alerts, trigger }: AlertDialogProps) => {
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

  const sortedAlerts = alerts.sort((a, b) => b.urgency - a.urgency);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="text-sm sm:text-base">Todos os Sinais Críticos</span>
            </div>
            <Badge variant="destructive" className="text-xs sm:text-sm w-fit">
              {sortedAlerts.filter(a => a.type === "red").length} CRÍTICOS
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[calc(80vh-120px)] pr-2">
          <div className="space-y-3">
            {sortedAlerts.map((alert) => {
              const config = getAlertConfig(alert.type);
              const IconComponent = config.icon;
              
              return (
                <Card key={alert.id} className={`p-4 border-l-4 ${config.color.replace('bg-', 'border-l-').split(' ')[0]}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <Badge className={config.color}>
                        {config.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {config.priority} Prioridade
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(alert.timestamp)}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{alert.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Urgência:</span>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          alert.urgency >= 90 ? 'bg-destructive' :
                          alert.urgency >= 70 ? 'bg-warning' : 'bg-primary'
                        }`}></div>
                        <span className="text-xs font-medium">{alert.urgency}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ${
                          alert.urgency >= 90 ? 'bg-destructive' :
                          alert.urgency >= 70 ? 'bg-warning' : 'bg-primary'
                        }`}
                        style={{ width: `${alert.urgency}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <CriticalSignalUnifiedDetails signal={alert} trigger={<Button variant="outline" size="sm" className="text-xs">
                          Ver Detalhes
                        </Button>} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Total de {sortedAlerts.length} sinais detectados</span>
            <span>Atualizado em tempo real</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};