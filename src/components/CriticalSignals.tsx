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
    <Card className="h-[250px] sm:h-[400px] lg:h-[500px] p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-6">
        <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-destructive pulse-glow" />
        <h2 className="text-sm sm:text-xl font-semibold">Sinais Críticos</h2>
        <Badge variant="destructive" className="ml-auto text-xs">
          ATIVO
        </Badge>
      </div>

      <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-[140px] sm:max-h-[280px] lg:max-h-[350px]">
        {criticalAlerts.map((alert, index) => (
          <Card 
            key={alert.id}
            className={`p-3 sm:p-4 border-l-4 ${
              alert.type === 'red' ? 'border-l-destructive bg-destructive/5' :
              alert.type === 'yellow' ? 'border-l-warning bg-warning/5' :
              'border-l-primary bg-primary/5'
            } ${index === 0 ? 'alert-pulse' : ''}`}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-1 flex-shrink-0 ${
                alert.type === 'red' ? 'bg-destructive' :
                alert.type === 'yellow' ? 'bg-warning' :
                'bg-primary'
              } pulse-glow`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs w-fit ${
                      alert.type === 'red' ? 'border-destructive text-destructive' :
                      alert.type === 'yellow' ? 'border-warning text-warning' :
                      'border-primary text-primary'
                    }`}
                  >
                    {alert.urgency}%
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">
                    {alert.region}
                  </span>
                </div>
                
                <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 leading-tight">
                  {alert.title}
                </h3>
                
                <p className="text-xs text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {alert.description}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {criticalAlerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 sm:py-12 text-center">
            <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-2 sm:mb-4" />
            <h3 className="font-semibold text-muted-foreground mb-1 sm:mb-2 text-xs sm:text-base">
              Nenhum Sinal Crítico
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Indicadores normais
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 sm:mt-4">
        <Button 
          variant="outline" 
          className="w-full cyber-glow text-xs sm:text-sm"
          size="sm"
        >
          <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Ver Todos os Alertas</span>
          <span className="sm:hidden">Ver Alertas</span>
        </Button>
      </div>
    </Card>
  );
};