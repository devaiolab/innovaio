import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Zap } from "lucide-react";

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

export const CriticalSignals = ({ alerts }: CriticalSignalsProps) => {
  const criticalAlerts = alerts.filter(alert => alert.urgency >= 75).slice(0, 3);

  return (
    <Card className="h-[500px] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-destructive pulse-glow" />
        <h2 className="text-xl font-semibold">Sinais Críticos Hoje</h2>
        <Badge variant="destructive" className="ml-auto">
          ATIVO
        </Badge>
      </div>

      <div className="space-y-4">
        {criticalAlerts.map((alert, index) => (
          <Card 
            key={alert.id}
            className={`p-4 border-l-4 ${
              alert.type === 'red' ? 'border-l-destructive bg-destructive/5' :
              alert.type === 'yellow' ? 'border-l-warning bg-warning/5' :
              'border-l-primary bg-primary/5'
            } ${index === 0 ? 'alert-pulse' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-3 h-3 rounded-full mt-1 ${
                alert.type === 'red' ? 'bg-destructive' :
                alert.type === 'yellow' ? 'bg-warning' :
                'bg-primary'
              } pulse-glow`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      alert.type === 'red' ? 'border-destructive text-destructive' :
                      alert.type === 'yellow' ? 'border-warning text-warning' :
                      'border-primary text-primary'
                    }`}
                  >
                    {alert.urgency}% URGÊNCIA
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {alert.region}
                  </span>
                </div>
                
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {alert.title}
                </h3>
                
                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                  {alert.description}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {criticalAlerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-muted-foreground mb-2">
              Nenhum Sinal Crítico
            </h3>
            <p className="text-sm text-muted-foreground">
              Todos os indicadores estão dentro dos parâmetros normais
            </p>
          </div>
        )}

        <Button 
          variant="outline" 
          className="w-full mt-4 cyber-glow"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Ver Todos os Alertas
        </Button>
      </div>
    </Card>
  );
};