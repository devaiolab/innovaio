import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MapPin, TrendingUp } from "lucide-react";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

interface AlertPanelProps {
  alerts: AlertData[];
}

const getAlertConfig = (type: AlertData["type"]) => {
  switch (type) {
    case "red":
      return {
        color: "destructive",
        label: "RESPOSTA IMEDIATA",
        icon: AlertTriangle,
        priority: "CRÍTICO",
      };
    case "yellow":
      return {
        color: "warning",
        label: "JANELA DE AÇÃO",
        icon: Clock,
        priority: "MODERADO",
      };
    case "blue":
      return {
        color: "primary",
        label: "OPORTUNIDADE",
        icon: TrendingUp,
        priority: "OBSERVAÇÃO",
      };
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "< 1h";
  if (diffInHours < 24) return `${diffInHours}h`;
  return `${Math.floor(diffInHours / 24)}d`;
};

export const AlertPanel = ({ alerts }: AlertPanelProps) => {
  const sortedAlerts = [...alerts].sort((a, b) => b.urgency - a.urgency);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Centro de Alertas Inteligentes</h2>
        <Badge variant="outline" className="ml-auto">
          {alerts.length} Sinais Ativos
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAlerts.map((alert) => {
          const config = getAlertConfig(alert.type);
          const IconComponent = config.icon;

          return (
            <Card 
              key={alert.id} 
              className={`p-4 border-l-4 transition-all hover:scale-105 cyber-glow ${
                alert.type === 'red' ? 'border-l-destructive alert-pulse' : 
                alert.type === 'yellow' ? 'border-l-warning' : 
                'border-l-primary'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-4 w-4 ${
                    alert.type === 'red' ? 'text-destructive' :
                    alert.type === 'yellow' ? 'text-warning' :
                    'text-primary'
                  }`} />
                  <Badge 
                    variant="outline"
                    className={`text-xs ${
                      alert.type === 'red' ? 'border-destructive text-destructive' :
                      alert.type === 'yellow' ? 'border-warning text-warning' :
                      'border-primary text-primary'
                    }`}
                  >
                    {config.priority}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatTimeAgo(alert.timestamp)}
                </div>
              </div>

              <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                {alert.title}
              </h3>

              <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                {alert.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {alert.region}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.type === 'red' ? 'bg-destructive' :
                    alert.type === 'yellow' ? 'bg-warning' :
                    'bg-primary'
                  } pulse-glow`} />
                  <span className="text-xs font-mono">
                    {alert.urgency}%
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 text-xs"
              >
                Analisar Impacto
              </Button>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};