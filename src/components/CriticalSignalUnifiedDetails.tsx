import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingDown, DollarSign, Users, Clock, Target, Zap, BarChart3, Eye, Activity, TrendingUp, MapPin, ExternalLink, FileText, Lightbulb } from "lucide-react";
import { ReactNode } from "react";
import { alertEvidence, standardActions } from "@/data/alertEvidence";
import { MVNOActionPlan } from "./MVNOActionPlan";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

interface CriticalSignalUnifiedDetailsProps {
  signal: AlertData;
  trigger: ReactNode;
}

export const CriticalSignalUnifiedDetails = ({ signal, trigger }: CriticalSignalUnifiedDetailsProps) => {
  // Get evidence data for this signal if available
  const evidenceData = alertEvidence[signal.id];
  
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
          threat_level: "Extremo",
          severity: "Resposta Imediata Necessária"
        };
      case "yellow":
        return {
          color: "text-warning", 
          bg: "bg-warning/10",
          border: "border-warning/20",
          label: "ALERTA",
          icon: Zap,
          description: "Sinal de atenção elevada",
          threat_level: "Alto",
          severity: "Janela de Ação Aberta"
        };
      case "blue":
        return {
          color: "text-primary",
          bg: "bg-primary/10", 
          border: "border-primary/20",
          label: "SINAL",
          icon: Zap,
          description: "Sinal de oportunidade",
          threat_level: "Moderado",
          severity: "Oportunidade Identificada"
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

  // Impact analysis
  const generateImpactAnalysis = () => {
    const baseImpact = {
      financial: Math.floor((signal.urgency / 100) * 2000000), // Up to R$ 2M impact
      customers: Math.floor((signal.urgency / 100) * 5000), // Up to 5k customers
      market_share: (signal.urgency / 100) * 15, // Up to 15% market share
      operational: signal.urgency >= 80 ? "Alto" : signal.urgency >= 60 ? "Médio" : "Baixo"
    };

    const scenarios = {
      immediate: {
        probability: 85,
        revenue_impact: -baseImpact.financial * 0.3,
        customer_impact: -baseImpact.customers * 0.2,
        timeframe: "24-48h"
      },
      short_term: {
        probability: 70,
        revenue_impact: -baseImpact.financial * 0.6,
        customer_impact: -baseImpact.customers * 0.5,
        timeframe: "1-2 semanas"
      },
      long_term: {
        probability: 55,
        revenue_impact: -baseImpact.financial,
        customer_impact: -baseImpact.customers,
        timeframe: "1-3 meses"
      }
    };

    return { baseImpact, scenarios };
  };

  const analysis = generateImpactAnalysis();

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

  // Sources and correlated events
  const correlatedEvents = [
    {
      title: "Aumento na atividade competitiva",
      correlation: 0.85,
      impact: "Amplifica o risco atual"
    },
    {
      title: "Mudanças regulatórias regionais",
      correlation: 0.62,
      impact: "Pode acelerar impactos"
    },
    {
      title: "Tendência de mercado negativa",
      correlation: 0.78,
      impact: "Confirma direção do alerta"
    }
  ];

  const mitigationActions = [
    {
      action: "Ativar protocolo de resposta rápida",
      effort: "Alto",
      impact: "85%",
      timeframe: "Imediato"
    },
    {
      action: "Comunicação proativa com clientes",
      effort: "Médio", 
      impact: "70%",
      timeframe: "24h"
    },
    {
      action: "Ajuste estratégico de posicionamento",
      effort: "Alto",
      impact: "90%",
      timeframe: "1 semana"
    },
    {
      action: "Monitoramento intensivo",
      effort: "Baixo",
      impact: "60%",
      timeframe: "Contínuo"
    }
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "< 1h";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact'
    }).format(Math.abs(value));
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
            Detalhes Completos: {signal.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className={`grid w-full ${evidenceData ? 'grid-cols-7' : 'grid-cols-6'}`}>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="patterns">Padrões</TabsTrigger>
            <TabsTrigger value="impacts">Impactos</TabsTrigger>
            <TabsTrigger value="scenarios">Cenários</TabsTrigger>
            <TabsTrigger value="correlations">Correlações</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
            {evidenceData && <TabsTrigger value="sources">Fontes</TabsTrigger>}
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

          <TabsContent value="impacts" className="space-y-4">
            <Card className={`p-4 ${config.bg} border-l-4 ${
              signal.type === 'red' ? 'border-l-destructive' :
              signal.type === 'yellow' ? 'border-l-warning' : 'border-l-primary'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Badge className={config.color} variant="outline">
                    {config.label}
                  </Badge>
                  <h3 className="font-semibold mt-2">{signal.title}</h3>
                  <p className="text-sm text-muted-foreground">{config.severity}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${config.color}`}>{signal.urgency}%</div>
                  <div className="text-sm text-muted-foreground">Severidade</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-destructive mx-auto mb-2" />
                <div className="text-lg font-bold text-destructive">
                  {formatCurrency(analysis.baseImpact.financial)}
                </div>
                <div className="text-sm text-muted-foreground">Impacto Financeiro</div>
                <Progress value={signal.urgency} className="mt-2" />
              </Card>

              <Card className="p-4 text-center">
                <Users className="h-8 w-8 text-warning mx-auto mb-2" />
                <div className="text-lg font-bold text-warning">
                  {analysis.baseImpact.customers.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-muted-foreground">Clientes Afetados</div>
                <Progress value={signal.urgency * 0.8} className="mt-2" />
              </Card>

              <Card className="p-4 text-center">
                <TrendingDown className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-lg font-bold text-primary">
                  {analysis.baseImpact.market_share.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Market Share</div>
                <Progress value={analysis.baseImpact.market_share * 6.67} className="mt-2" />
              </Card>

              <Card className="p-4 text-center">
                <Zap className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-lg font-bold text-secondary">
                  {analysis.baseImpact.operational}
                </div>
                <div className="text-sm text-muted-foreground">Risco Operacional</div>
                <Progress value={signal.urgency} className="mt-2" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="space-y-4">
              {Object.entries(analysis.scenarios).map(([key, scenario]) => (
                <Card key={key} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold capitalize">
                      {key.replace('_', ' ')} ({scenario.timeframe})
                    </h3>
                    <Badge variant="outline">
                      {scenario.probability}% probabilidade
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Impacto na Receita</div>
                      <div className="text-lg font-bold text-destructive">
                        {formatCurrency(scenario.revenue_impact)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Perda de Clientes</div>
                      <div className="text-lg font-bold text-warning">
                        {Math.abs(scenario.customer_impact).toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Probabilidade</div>
                      <div className="flex items-center gap-2">
                        <Progress value={scenario.probability} className="flex-1" />
                        <span className="text-sm font-semibold">{scenario.probability}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="correlations" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Eventos Correlacionados
              </h3>
              <div className="space-y-3">
                {correlatedEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded bg-muted/50">
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.impact}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={event.correlation * 100} className="w-20" />
                      <span className="text-sm font-semibold">
                        {(event.correlation * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-warning/5 border-warning/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="font-semibold text-warning">Análise de Correlação</span>
              </div>
              <p className="text-sm">
                Este alerta está fortemente correlacionado com {correlatedEvents.length} outros eventos. 
                A combinação pode amplificar os impactos em até 40%.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid gap-3">
              {(evidenceData?.actions || standardActions).map((action, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{action.action}</h3>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Esforço: {action.effort}</span>
                        <span>Prazo: {action.timeframe}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{action.impact}</div>
                      <div className="text-xs text-muted-foreground">eficácia</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Progress value={parseInt(action.impact)} className="flex-1" />
                    <Button size="sm" variant="outline">
                      Executar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">Recomendação Estratégica</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Com base na análise, recomendamos execução imediata das 2 primeiras ações 
                para mitigar {analysis.scenarios.immediate.probability}% do risco identificado.
              </p>
              <div className="space-y-2">
                <Button className="w-full">
                  Ativar Plano de Resposta de Emergência
                </Button>
                {(signal.id === 'nc-1' || signal.id === 'nc-4') && (
                  <MVNOActionPlan 
                    trigger={
                      <Button variant="outline" className="w-full">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Ver Plano Estratégico MVNO Completo
                      </Button>
                    }
                  />
                )}
              </div>
            </Card>
          </TabsContent>

          {evidenceData && (
            <TabsContent value="sources" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Fontes e Evidências</h3>
              </div>
              
              <div className="grid gap-4">
                {evidenceData.sources.map((source, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{source.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {source.type === 'official' && 'Oficial'}
                            {source.type === 'news' && 'Notícia'}
                            {source.type === 'research' && 'Pesquisa'}
                            {source.type === 'regulatory' && 'Regulatório'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{source.url}</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Abrir
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};