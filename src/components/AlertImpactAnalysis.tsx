import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingDown, DollarSign, Users, Clock, Target, Zap, BarChart3 } from "lucide-react";
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

interface AlertImpactAnalysisProps {
  alert: AlertData;
  trigger: ReactNode;
}

export const AlertImpactAnalysis = ({ alert, trigger }: AlertImpactAnalysisProps) => {
  const getAlertConfig = (type: AlertData["type"]) => {
    switch (type) {
      case "red":
        return {
          color: "text-destructive",
          bg: "bg-destructive/10",
          label: "CRÍTICO",
          severity: "Resposta Imediata Necessária"
        };
      case "yellow":
        return {
          color: "text-warning",
          bg: "bg-warning/10", 
          label: "ALERTA",
          severity: "Janela de Ação Aberta"
        };
      case "blue":
        return {
          color: "text-primary",
          bg: "bg-primary/10",
          label: "SINAL",
          severity: "Oportunidade Identificada"
        };
    }
  };

  const config = getAlertConfig(alert.type);

  // Mock impact analysis based on alert type and urgency
  const generateImpactAnalysis = () => {
    const baseImpact = {
      financial: Math.floor((alert.urgency / 100) * 2000000), // Up to R$ 2M impact
      customers: Math.floor((alert.urgency / 100) * 5000), // Up to 5k customers
      market_share: (alert.urgency / 100) * 15, // Up to 15% market share
      operational: alert.urgency >= 80 ? "Alto" : alert.urgency >= 60 ? "Médio" : "Baixo"
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
            <AlertTriangle className={`h-5 w-5 ${config.color}`} />
            Análise de Impacto: {alert.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="impact" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="impact">Impactos</TabsTrigger>
            <TabsTrigger value="scenarios">Cenários</TabsTrigger>
            <TabsTrigger value="correlations">Correlações</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
          </TabsList>

          <TabsContent value="impact" className="space-y-4">
            <Card className={`p-4 ${config.bg} border-l-4 ${
              alert.type === 'red' ? 'border-l-destructive' :
              alert.type === 'yellow' ? 'border-l-warning' : 'border-l-primary'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Badge className={config.color} variant="outline">
                    {config.label}
                  </Badge>
                  <h3 className="font-semibold mt-2">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground">{config.severity}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${config.color}`}>{alert.urgency}%</div>
                  <div className="text-sm text-muted-foreground">Severidade</div>
                </div>
              </div>
              <p className="text-sm">{alert.description}</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-destructive mx-auto mb-2" />
                <div className="text-lg font-bold text-destructive">
                  {formatCurrency(analysis.baseImpact.financial)}
                </div>
                <div className="text-sm text-muted-foreground">Impacto Financeiro</div>
                <Progress value={alert.urgency} className="mt-2" />
              </Card>

              <Card className="p-4 text-center">
                <Users className="h-8 w-8 text-warning mx-auto mb-2" />
                <div className="text-lg font-bold text-warning">
                  {analysis.baseImpact.customers.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-muted-foreground">Clientes Afetados</div>
                <Progress value={alert.urgency * 0.8} className="mt-2" />
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
                <Progress value={alert.urgency} className="mt-2" />
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
              {mitigationActions.map((action, index) => (
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
              <Button className="w-full">
                Ativar Plano de Resposta de Emergência
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};