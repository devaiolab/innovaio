import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target, TrendingUp, Users, Zap } from "lucide-react";
import { ReactNode } from "react";

interface MVNOActionPlanProps {
  trigger: ReactNode;
}

export const MVNOActionPlan = ({ trigger }: MVNOActionPlanProps) => {
  const mvnoStrategy = [
    {
      phase: "Fase 1: Fundação",
      timeframe: "Meses 1-6",
      priority: "CRÍTICO",
      actions: [
        {
          action: "Definir Modelo MVNO",
          description: "Escolher entre MVNO leve (revenda) ou completo (núcleo próprio). Avaliar parceria com Claro, Vivo ou TIM.",
          status: "planejado",
          effort: 90,
          impact: 95
        },
        {
          action: "Compliance e Licenciamento",
          description: "Obter licenças Anatel, adequar sistemas às regulamentações LGPD e marcos telecom.",
          status: "planejado", 
          effort: 85,
          impact: 100
        },
        {
          action: "Desenvolver eSIM + SIM Físico",
          description: "Implementar tecnologia eSIM para ativação digital instantânea e manter SIM físico.",
          status: "planejado",
          effort: 70,
          impact: 80
        }
      ]
    },
    {
      phase: "Fase 2: Produto",
      timeframe: "Meses 4-8", 
      priority: "ALTO",
      actions: [
        {
          action: "Portfolio Simplificado",
          description: "Lançar com 2-3 planos: Básico (20GB), Família (60GB) e Ilimitado. Evitar complexidade inicial.",
          status: "planejado",
          effort: 40,
          impact: 70
        },
        {
          action: "Combos Convergentes",
          description: "Criar pacotes internet fixa + móvel: R$ 89 (100Mb + 20GB) até R$ 149 (500Mb + ilimitado).",
          status: "planejado",
          effort: 60,
          impact: 90
        },
        {
          action: "Onboarding Digital Completo",
          description: "Processo 100% digital: cadastro, análise de crédito, ativação eSIM em até 15 minutos.",
          status: "planejado",
          effort: 80,
          impact: 85
        }
      ]
    },
    {
      phase: "Fase 3: Diferenciação",
      timeframe: "Meses 6-12",
      priority: "MÉDIO",
      actions: [
        {
          action: "Diferenciação por Ecossistema",
          description: "Integrar benefícios locais: parcerias comércio ABC, cashback regional, suporte presencial.",
          status: "planejado",
          effort: 75,
          impact: 85
        },
        {
          action: "Portabilidade Zero Atrito",
          description: "Sistema de portabilidade em 24h com eSIM provisório para não haver interrupção.",
          status: "planejado",
          effort: 85,
          impact: 80
        },
        {
          action: "Experiência Digital-First",
          description: "App nativo com gestão completa: consumo real-time, segunda via, mudança de planos.",
          status: "planejado",
          effort: 90,
          impact: 75
        }
      ]
    },
    {
      phase: "Fase 4: Expansão",
      timeframe: "Meses 12-18",
      priority: "BAIXO",
      actions: [
        {
          action: "Go-to-Market Faseado",
          description: "Soft launch base instalada (6 meses) → São Bernardo (12 meses) → ABC completo (18 meses).",
          status: "futuro",
          effort: 70,
          impact: 95
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido": return "bg-green-500";
      case "em-andamento": return "bg-blue-500";
      case "planejado": return "bg-yellow-500";
      case "futuro": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRÍTICO": return "text-red-600 bg-red-50";
      case "ALTO": return "text-orange-600 bg-orange-50";
      case "MÉDIO": return "text-blue-600 bg-blue-50";
      case "BAIXO": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Plano Estratégico MVNO - Athon Telecom
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Executive Summary */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Resumo Executivo</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold">Oportunidade</div>
                <div className="text-muted-foreground">15% receita adicional via combos convergentes</div>
              </div>
              <div>
                <div className="font-semibold">Timeline</div>
                <div className="text-muted-foreground">18 meses para operação completa</div>
              </div>
              <div>
                <div className="font-semibold">ROI Projetado</div>
                <div className="text-muted-foreground">120% em 24 meses</div>
              </div>
            </div>
          </Card>

          {/* KPIs Target */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Métricas de Sucesso</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">5%</div>
                <div className="text-muted-foreground">Penetração Ano 1</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">15%</div>
                <div className="text-muted-foreground">Receita Mobile</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">70+</div>
                <div className="text-muted-foreground">NPS Target</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">&lt;2%</div>
                <div className="text-muted-foreground">Churn Mensal</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">R$ 120+</div>
                <div className="text-muted-foreground">ARPU Combo</div>
              </div>
            </div>
          </Card>

          {/* Action Plan */}
          <div className="space-y-4">
            {mvnoStrategy.map((phase, phaseIndex) => (
              <Card key={phaseIndex} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{phase.phase}</h3>
                    <Badge className={getPriorityColor(phase.priority)}>{phase.priority}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {phase.timeframe}
                  </div>
                </div>

                <div className="grid gap-3">
                  {phase.actions.map((action, actionIndex) => (
                    <div key={actionIndex} className="border rounded-lg p-3 bg-background/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(action.status)}`} />
                            <h4 className="font-semibold text-sm">{action.action}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{action.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Esforço</span>
                            <span>{action.effort}%</span>
                          </div>
                          <Progress value={action.effort} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Impacto</span>
                            <span>{action.impact}%</span>
                          </div>
                          <Progress value={action.impact} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Aprovar Plano Estratégico
            </Button>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Iniciar Fase 1
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};