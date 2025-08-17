import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Target, Clock, Users, DollarSign, CheckCircle, AlertTriangle, Calendar, TrendingUp } from "lucide-react";
import { ReactNode, useState } from "react";

interface ActionPlanDialogProps {
  recommendation: {
    type: string;
    title: string;
    description: string;
    priority: string;
  };
  trigger: ReactNode;
}

export const ActionPlanDialog = ({ recommendation, trigger }: ActionPlanDialogProps) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const getRecommendationConfig = (type: string) => {
    switch (type) {
      case "urgent":
        return {
          color: "text-destructive",
          bg: "bg-destructive/10",
          icon: AlertTriangle,
          urgency: "CRÍTICA"
        };
      case "strategic":
        return {
          color: "text-primary",
          bg: "bg-primary/10", 
          icon: Target,
          urgency: "ESTRATÉGICA"
        };
      case "operational":
        return {
          color: "text-warning",
          bg: "bg-warning/10",
          icon: Users,
          urgency: "OPERACIONAL"
        };
      default:
        return {
          color: "text-secondary",
          bg: "bg-secondary/10",
          icon: CheckCircle,
          urgency: "GERAL"
        };
    }
  };

  const config = getRecommendationConfig(recommendation.type);
  const IconComponent = config.icon;

  // Generate action plan based on recommendation type
  const generateActionPlan = () => {
    const basePlan = {
      timeline: recommendation.type === "urgent" ? "48-72h" : "1-2 semanas",
      budget: recommendation.type === "urgent" ? "R$ 50-100K" : "R$ 20-50K",
      team_size: recommendation.type === "urgent" ? "5-8 pessoas" : "3-5 pessoas",
      success_probability: recommendation.type === "urgent" ? 85 : 75
    };

    const tasks = recommendation.type === "urgent" 
      ? [
          {
            id: "1",
            title: "Ativação imediata de equipe de crise",
            description: "Mobilizar equipe especializada para resposta rápida",
            duration: "2-4h", 
            priority: "Critical",
            owner: "Head de Operações",
            dependencies: [],
            resources: ["Equipe de crise", "Sala de comando", "Sistemas de monitoramento"]
          },
          {
            id: "2", 
            title: "Análise detalhada de impacto",
            description: "Quantificar impactos financeiros e operacionais",
            duration: "6-8h",
            priority: "High",
            owner: "Analista Senior",
            dependencies: ["1"],
            resources: ["Dados históricos", "Modelos preditivos", "Ferramentas de análise"]
          },
          {
            id: "3",
            title: "Desenvolvimento de estratégia de resposta",
            description: "Criar plano de ação específico baseado na análise",
            duration: "8-12h",
            priority: "High", 
            owner: "Gerente Estratégico",
            dependencies: ["2"],
            resources: ["Workshop de estratégia", "Stakeholders chave", "Dados de mercado"]
          },
          {
            id: "4",
            title: "Implementação coordenada",
            description: "Executar ações definidas com monitoramento contínuo",
            duration: "24-48h",
            priority: "Critical",
            owner: "Equipe Multidisciplinar",
            dependencies: ["3"],
            resources: ["Recursos operacionais", "Budget aprovado", "Canais de comunicação"]
          }
        ]
      : [
          {
            id: "1",
            title: "Planejamento estratégico detalhado",
            description: "Desenvolver roadmap completo da iniciativa",
            duration: "3-5 dias",
            priority: "High",
            owner: "Gerente de Projetos",
            dependencies: [],
            resources: ["Equipe de planejamento", "Dados de mercado", "Ferramentas de projeto"]
          },
          {
            id: "2",
            title: "Análise de viabilidade",
            description: "Validar aspectos técnicos, financeiros e operacionais",
            duration: "5-7 dias", 
            priority: "High",
            owner: "Analista de Negócios",
            dependencies: ["1"],
            resources: ["Especialistas técnicos", "Dados financeiros", "Benchmarks"]
          },
          {
            id: "3", 
            title: "Aprovação e alocação de recursos",
            description: "Obter aprovações necessárias e alocar recursos",
            duration: "2-3 dias",
            priority: "Medium",
            owner: "Gerente Senior",
            dependencies: ["2"], 
            resources: ["Comitê executivo", "Budget planning", "Recursos humanos"]
          },
          {
            id: "4",
            title: "Execução faseada",
            description: "Implementar solução em fases com marcos definidos",
            duration: "1-2 semanas",
            priority: "High",
            owner: "Equipe de Execução",
            dependencies: ["3"],
            resources: ["Equipe dedicada", "Ferramentas necessárias", "Monitoramento"]
          }
        ];

    return { ...basePlan, tasks };
  };

  const actionPlan = generateActionPlan();

  const milestones = [
    {
      milestone: "Kick-off e mobilização",
      date: "Dia 1",
      status: "pending",
      description: "Início oficial do plano de ação"
    },
    {
      milestone: "Análise e planejamento",
      date: recommendation.type === "urgent" ? "Dia 2" : "Semana 1",
      status: "pending", 
      description: "Conclusão da fase de análise"
    },
    {
      milestone: "Implementação inicial",
      date: recommendation.type === "urgent" ? "Dia 3" : "Semana 2",
      status: "pending",
      description: "Primeiras ações implementadas"
    },
    {
      milestone: "Revisão e ajustes",
      date: recommendation.type === "urgent" ? "Dia 5" : "Semana 3",
      status: "pending",
      description: "Avaliação e ajustes necessários"
    }
  ];

  const risks = [
    {
      risk: "Resistência organizacional",
      probability: 30,
      impact: "Médio",
      mitigation: "Comunicação clara e envolvimento de stakeholders"
    },
    {
      risk: "Limitação de recursos",
      probability: 45,
      impact: "Alto", 
      mitigation: "Priorização de ações e realocação conforme necessário"
    },
    {
      risk: "Mudanças no cenário",
      probability: 25,
      impact: "Alto",
      mitigation: "Monitoramento contínuo e plano de contingência"
    }
  ];

  const toggleTask = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
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
            Plano de Ação: {recommendation.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumo</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="risks">Riscos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className={`p-4 ${config.bg} border-l-4 border-l-current`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className={config.color} variant="outline">
                    {config.urgency}
                  </Badge>
                  <h3 className="font-semibold mt-2">{recommendation.title}</h3>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${config.color}`}>
                    {actionPlan.success_probability}%
                  </div>
                  <div className="text-sm text-muted-foreground">Prob. Sucesso</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-semibold">{actionPlan.timeline}</div>
                <div className="text-sm text-muted-foreground">Prazo</div>
              </Card>

              <Card className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-warning" />
                <div className="font-semibold">{actionPlan.budget}</div>
                <div className="text-sm text-muted-foreground">Orçamento</div>
              </Card>

              <Card className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <div className="font-semibold">{actionPlan.team_size}</div>
                <div className="text-sm text-muted-foreground">Equipe</div>
              </Card>

              <Card className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
                <div className="font-semibold">{actionPlan.tasks.length}</div>
                <div className="text-sm text-muted-foreground">Tarefas</div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="space-y-3">
              {actionPlan.tasks.map((task) => (
                <Card 
                  key={task.id} 
                  className={`p-4 cursor-pointer transition-all ${
                    selectedTasks.includes(task.id) ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedTasks.includes(task.id) 
                          ? 'bg-primary border-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {selectedTasks.includes(task.id) && (
                          <CheckCircle className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-sm">{task.title}</h3>
                        <Badge 
                          variant={task.priority === 'Critical' ? 'destructive' : task.priority === 'High' ? 'secondary' : 'outline'}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Duração: </span>
                          <span className="font-semibold">{task.duration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Responsável: </span>
                          <span className="font-semibold">{task.owner}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Dependências: </span>
                          <span className="font-semibold">
                            {task.dependencies.length > 0 ? task.dependencies.join(', ') : 'Nenhuma'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">Recursos necessários:</div>
                        <div className="flex flex-wrap gap-1">
                          {task.resources.map((resource, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {selectedTasks.length} de {actionPlan.tasks.length} tarefas selecionadas
                </span>
                <Button size="sm" disabled={selectedTasks.length === 0}>
                  Iniciar Tarefas Selecionadas
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Marcos Principais
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${
                        milestone.status === 'completed' ? 'bg-success' :
                        milestone.status === 'active' ? 'bg-primary' : 'bg-muted'
                      }`}></div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-8 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{milestone.milestone}</h4>
                        <Badge variant="outline">{milestone.date}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Equipe Necessária
                </h3>
                <div className="space-y-2">
                  {[...new Set(actionPlan.tasks.map(t => t.owner))].map((owner, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{owner}</span>
                      <Badge variant="outline">
                        {actionPlan.tasks.filter(t => t.owner === owner).length} tarefas
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Breakdown Orçamentário  
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recursos Humanos</span>
                    <span className="font-semibold">60%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tecnologia/Ferramentas</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Comunicação/Marketing</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Contingência</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            <div className="space-y-3">
              {risks.map((risk, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-sm">{risk.risk}</h3>
                    <Badge 
                      variant={risk.impact === 'Alto' ? 'destructive' : risk.impact === 'Médio' ? 'secondary' : 'outline'}
                    >
                      {risk.impact}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">Probabilidade:</span>
                      <Progress value={risk.probability} className="h-2 flex-1" />
                      <span className="text-xs font-semibold">{risk.probability}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Mitigação:</div>
                    <p className="text-sm">{risk.mitigation}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-warning/5 border-warning/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="font-semibold text-warning">Avaliação de Risco</span>
              </div>
              <p className="text-sm">
                Risco geral do projeto: <strong>Médio</strong>. Recomendamos monitoramento próximo 
                dos primeiros marcos e implementação proativa das estratégias de mitigação.
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Button className="flex-1">
            Aprovar e Iniciar Plano
          </Button>
          <Button variant="outline">
            Exportar Plano
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};