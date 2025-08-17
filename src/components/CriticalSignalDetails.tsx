import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Zap, AlertTriangle, TrendingUp, MapPin, Clock, Target, BarChart3, Eye, Activity } from "lucide-react";
import { ReactNode } from "react";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

interface CriticalSignalDetailsProps {
  signal: AlertData;
  trigger: ReactNode;
}

export const CriticalSignalDetails = ({ signal, trigger }: CriticalSignalDetailsProps) => {
  const getSignalConfig = (type: AlertData["type"]) => {
    switch (type) {
      case "red":
        return {
          color: "text-destructive",
          bg: "bg-destructive/10",
          border: "border-destructive/20",
          label: "CRÍTICO",
          icon: AlertTriangle,
          description: "Sinal de resposta imediata",
          threat_level: "Extremo"
        };
      case "yellow":
        return {
          color: "text-warning", 
          bg: "bg-warning/10",
          border: "border-warning/20",
          label: "ALERTA",
          icon: Zap,
          description: "Sinal de atenção elevada",
          threat_level: "Alto"
        };
      case "blue":
        return {
          color: "text-primary",
          bg: "bg-primary/10", 
          border: "border-primary/20",
          label: "SINAL",
          icon: Zap,
          description: "Sinal de oportunidade",
          threat_level: "Moderado"
        };
    }
  };

  const config = getSignalConfig(signal.type);
  const IconComponent = config.icon;

  // Deep analysis data
  const signalAnalysis = {
    confidence: Math.floor(85 + (signal.urgency / 100) * 15), // 85-100%
    velocity: signal.urgency >= 80 ? "Aceleração" : signal.urgency >= 60 ? "Estável" : "Desaceleração",
    reach: Math.floor((signal.urgency / 100) * 50000), // Up to 50k people affected
    volatility: signal.urgency >= 75 ? "Alta" : signal.urgency >= 50 ? "Média" : "Baixa"
  };

  // Pattern recognition
  const patterns = [
    {
      pattern: "Tendência crescente nas últimas 48h",
      strength: 0.92,
      description: "Intensidade aumentou 35% no período"
    },
    {
      pattern: "Correlação com eventos competitivos",
      strength: 0.78,
      description: "Padrão similar a crises passadas"
    },
    {
      pattern: "Concentração geográfica específica",
      strength: 0.85,
      description: "Epicentro na região ABC"
    }
  ];

  // Monitoring metrics
  const metrics = [
    { label: "Taxa de Propagação", value: "12%/h", trend: "up", critical: signal.urgency >= 80 },
    { label: "Índice de Severidade", value: `${signal.urgency}/100`, trend: "up", critical: signal.urgency >= 75 },
    { label: "Cobertura Geográfica", value: "3 regiões", trend: "stable", critical: false },
    { label: "Duração", value: "6.5h", trend: "up", critical: signal.urgency >= 85 }
  ];

  // Historical context
  const historicalEvents = [
    {
      date: "2024-01-15",
      event: "Evento similar na região Sul",
      outcome: "Resolvido em 72h",
      impact: "Médio"
    },
    {
      date: "2023-11-22", 
      event: "Crise competitiva análoga",
      outcome: "Impacto prolongado",
      impact: "Alto"
    },
    {
      date: "2023-08-08",
      event: "Alerta preventivo similar",
      outcome: "Prevenção bem-sucedida", 
      impact: "Baixo"
    }
  ];

  // Response protocols
  const protocols = [
    {
      level: "Nível 1 - Monitoramento",
      threshold: "< 50%",
      actions: ["Observação contínua", "Relatórios de 4h", "Análise de tendências"],
      active: signal.urgency < 50
    },
    {
      level: "Nível 2 - Alerta",
      threshold: "50-75%",  
      actions: ["Notificação de equipes", "Reunião de situação", "Preparação de respostas"],
      active: signal.urgency >= 50 && signal.urgency < 75
    },
    {
      level: "Nível 3 - Resposta",
      threshold: "75-90%",
      actions: ["Ativação de equipe de crise", "Comunicação externa", "Implementação de medidas"],
      active: signal.urgency >= 75 && signal.urgency < 90
    },
    {
      level: "Nível 4 - Emergência",
      threshold: "> 90%",
      actions: ["Comando de crise ativo", "Resposta coordenada", "Medidas extraordinárias"],
      active: signal.urgency >= 90
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "< 1h";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className={`h-5 w-5 ${config.color}`} />
            Análise Detalhada: {signal.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="patterns">Padrões</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="response">Resposta</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className={`p-4 ${config.bg} ${config.border} border-l-4`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-8 w-8 ${config.color}`} />
                  <div>
                    <Badge className={config.color} variant="outline">
                      {config.label}
                    </Badge>
                    <h3 className="font-semibold mt-1">{signal.title}</h3>
                    <p className="text-sm text-muted-foreground">{config.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${config.color}`}>{signal.urgency}%</div>
                  <div className="text-sm text-muted-foreground">Intensidade</div>
                </div>
              </div>
              
              <p className="text-sm mb-4">{signal.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Confiança</div>
                  <div className="flex items-center gap-2">
                    <Progress value={signalAnalysis.confidence} className="h-2 flex-1" />
                    <span className="text-sm font-semibold">{signalAnalysis.confidence}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Velocidade</div>
                  <div className="text-sm font-semibold">{signalAnalysis.velocity}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Alcance</div>
                  <div className="text-sm font-semibold">{signalAnalysis.reach.toLocaleString('pt-BR')}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Volatilidade</div>
                  <div className="text-sm font-semibold">{signalAnalysis.volatility}</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-semibold">{signal.region}</div>
                <div className="text-sm text-muted-foreground">Epicentro</div>
              </Card>
              <Card className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-warning" />
                <div className="font-semibold">{formatTimeAgo(signal.timestamp)}</div>
                <div className="text-sm text-muted-foreground">Detectado há</div>
              </Card>
              <Card className="p-4 text-center">
                <Activity className="h-6 w-6 mx-auto mb-2 text-destructive" />
                <div className="font-semibold">{config.threat_level}</div>
                <div className="text-sm text-muted-foreground">Nível de Ameaça</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Padrões Identificados
              </h3>
              <div className="space-y-4">
                {patterns.map((pattern, index) => (
                  <div key={index} className="p-3 rounded bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{pattern.pattern}</h4>
                      <Badge variant="outline">
                        {(pattern.strength * 100).toFixed(0)}% match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{pattern.description}</p>
                    <Progress value={pattern.strength * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">Análise de Padrões</span>
              </div>
              <p className="text-sm">
                O sinal atual apresenta {patterns.length} padrões reconhecidos com alta confiança. 
                Baseado em eventos históricos similares, a probabilidade de escalação é de {signalAnalysis.confidence}%.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <Card key={index} className={`p-4 ${metric.critical ? 'bg-destructive/5 border-destructive/20' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{metric.label}</h3>
                    <div className="flex items-center gap-1">
                      {metric.trend === 'up' && <TrendingUp className="h-3 w-3 text-destructive" />}
                      {metric.critical && <AlertTriangle className="h-3 w-3 text-destructive" />}
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${metric.critical ? 'text-destructive' : 'text-primary'}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.critical ? 'Limiar crítico atingido' : 'Dentro dos parâmetros'}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Eventos Históricos Similares
              </h3>
              <div className="space-y-4">
                {historicalEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 p-3 rounded bg-muted/50">
                    <div className="w-16 text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{event.event}</div>
                      <div className="text-xs text-muted-foreground">{event.outcome}</div>
                    </div>
                    <Badge 
                      variant={event.impact === 'Alto' ? 'destructive' : event.impact === 'Médio' ? 'secondary' : 'outline'}
                    >
                      {event.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            <div className="space-y-3">
              {protocols.map((protocol, index) => (
                <Card 
                  key={index} 
                  className={`p-4 ${protocol.active ? 'bg-primary/5 border-primary/20' : 'opacity-60'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">{protocol.level}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{protocol.threshold}</Badge>  
                      {protocol.active && <Badge className="text-primary">ATIVO</Badge>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {protocol.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${protocol.active ? 'bg-primary' : 'bg-muted'}`}></div>
                        {action}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-destructive/5 border-destructive/20">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-destructive" />
                <span className="font-semibold text-destructive">Ação Recomendada</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Com base na intensidade atual de {signal.urgency}%, o protocolo ativo requer resposta coordenada.
              </p>
              <Button className="w-full" variant="destructive">
                Ativar Protocolo de Resposta
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};