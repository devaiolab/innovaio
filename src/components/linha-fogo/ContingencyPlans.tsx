import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle, AlertCircle, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";

interface ContingencyPlan {
  id: string;
  name: string;
  status: "ativo" | "standby" | "em_progresso" | "concluido";
  priority: "crítica" | "alta" | "média";
  timeToActivation: string;
  completionRate: number;
  steps: PlanStep[];
  resources: string[];
  responsibleTeam: string;
}

interface PlanStep {
  id: string;
  description: string;
  status: "pendente" | "em_progresso" | "concluído";
  estimatedTime: string;
  dependencies: string[];
}

const contingencyPlans: ContingencyPlan[] = [
  {
    id: "1",
    name: "Resposta Anti-Starlink",
    status: "ativo",
    priority: "crítica",
    timeToActivation: "Imediato",
    completionRate: 75,
    steps: [
      { id: "1", description: "Acelerar deployment FTTH em áreas rurais", status: "concluído", estimatedTime: "30 dias", dependencies: [] },
      { id: "2", description: "Lançar pacotes corporativos com SLA garantido", status: "em_progresso", estimatedTime: "15 dias", dependencies: ["1"] },
      { id: "3", description: "Parcerias com prefeituras para conectividade pública", status: "pendente", estimatedTime: "45 dias", dependencies: ["2"] },
      { id: "4", description: "Marketing agressivo: 'Internet Brasileira'", status: "pendente", estimatedTime: "10 dias", dependencies: [] }
    ],
    resources: ["R$ 2.5M orçamento", "15 técnicos", "3 gerentes comerciais", "1 especialista regulatório"],
    responsibleTeam: "Estratégia Competitiva"
  },
  {
    id: "2", 
    name: "Contingência DDoS Massivo",
    status: "standby",
    priority: "crítica",
    timeToActivation: "15 min",
    completionRate: 90,
    steps: [
      { id: "1", description: "Ativar Cloudflare Enterprise Protection", status: "concluído", estimatedTime: "5 min", dependencies: [] },
      { id: "2", description: "Redirecionar tráfego para data centers backup", status: "concluído", estimatedTime: "10 min", dependencies: ["1"] },
      { id: "3", description: "Comunicação de emergência para clientes", status: "concluído", estimatedTime: "15 min", dependencies: [] },
      { id: "4", description: "Análise forense e relatório Anatel", status: "pendente", estimatedTime: "2 horas", dependencies: ["2"] }
    ],
    resources: ["NOC 24x7", "Cloudflare Enterprise", "3 data centers", "Equipe comunicação"],
    responsibleTeam: "Operações de Rede"
  },
  {
    id: "3",
    name: "Escassez Fibra Óptica",
    status: "em_progresso", 
    priority: "alta",
    timeToActivation: "30 dias",
    completionRate: 60,
    steps: [
      { id: "1", description: "Contratos de longo prazo com Furukawa", status: "concluído", estimatedTime: "7 dias", dependencies: [] },
      { id: "2", description: "Qualificar fornecedores alternativos (Prysmian)", status: "em_progresso", estimatedTime: "21 dias", dependencies: [] },
      { id: "3", description: "Otimizar rotas existentes (reduzir 20% consumo)", status: "em_progresso", estimatedTime: "45 dias", dependencies: [] },
      { id: "4", description: "Negociar pool compartilhado com outros ISPs", status: "pendente", estimatedTime: "30 dias", dependencies: ["2"] }
    ],
    resources: ["R$ 1.2M estoque estratégico", "2 engenheiros de rede", "1 comprador especializado"],
    responsibleTeam: "Supply Chain"
  },
  {
    id: "4",
    name: "Guerra Preços Regional",
    status: "standby",
    priority: "alta", 
    timeToActivation: "7 dias",
    completionRate: 85,
    steps: [
      { id: "1", description: "Ativar planos promocionais 6 meses", status: "concluído", estimatedTime: "1 dia", dependencies: [] },
      { id: "2", description: "Bundling: Internet + TV + Telefone", status: "concluído", estimatedTime: "3 dias", dependencies: [] },
      { id: "3", description: "Programa fidelidade com pontos", status: "concluído", estimatedTime: "5 dias", dependencies: [] },
      { id: "4", description: "Diferenciação: suporte técnico local", status: "pendente", estimatedTime: "14 dias", dependencies: [] }
    ],
    resources: ["R$ 800K margem flexível", "Call center local", "Equipe marketing", "Sistema CRM"],
    responsibleTeam: "Comercial"
  },
  {
    id: "5",
    name: "Migração IPv6 Forçada", 
    status: "em_progresso",
    priority: "média",
    timeToActivation: "120 dias",
    completionRate: 40,
    steps: [
      { id: "1", description: "Auditoria infraestrutura IPv4/IPv6", status: "concluído", estimatedTime: "14 dias", dependencies: [] },
      { id: "2", description: "Treinamento equipe técnica", status: "em_progresso", estimatedTime: "21 dias", dependencies: ["1"] },
      { id: "3", description: "Configuração dual-stack em equipamentos", status: "em_progresso", estimatedTime: "60 dias", dependencies: ["2"] },
      { id: "4", description: "Migração gradual clientes empresariais", status: "pendente", estimatedTime: "90 days", dependencies: ["3"] },
      { id: "5", description: "Comunicação e migração clientes residenciais", status: "pendente", estimatedTime: "120 days", dependencies: ["4"] }
    ],
    resources: ["4 engenheiros de rede", "Consultoria IPv6", "Orçamento equipamentos", "Material treinamento"],
    responsibleTeam: "Engenharia"
  }
];

export const ContingencyPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Static display - no real-time timer needed for ISP context
    const activePlans = contingencyPlans.filter(p => p.status === "em_progresso");
    if (activePlans.length > 0) {
      const initialTimes: {[key: string]: number} = {};
      activePlans.forEach(plan => {
        initialTimes[plan.id] = Math.floor(Math.random() * 300) + 60; // Mock remaining time
      });
      setTimeRemaining(initialTimes);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_progresso": return "border-warning text-warning bg-warning/10";
      case "ativo": return "border-success text-success bg-success/10";
      case "standby": return "border-primary text-primary bg-primary/10";
      case "concluido": return "border-muted text-muted-foreground bg-muted/10";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "crítica": return "border-destructive text-destructive bg-destructive/10";
      case "alta": return "border-warning text-warning bg-warning/10";
      case "média": return "border-primary text-primary bg-primary/10";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "concluído": return CheckCircle;
      case "em_progresso": return Play;
      default: return AlertCircle;
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const selectedData = selectedPlan ? contingencyPlans.find(p => p.id === selectedPlan) : null;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h2 className="text-base sm:text-xl font-semibold gradient-text">Planos de Contingência</h2>
            <Badge variant="outline" className="border-warning text-warning text-xs w-fit">
              {contingencyPlans.filter(p => p.status === "em_progresso").length} EM EXECUÇÃO
            </Badge>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground font-mono">
            Sistema de Resposta Automatizada
          </div>
        </div>

        {/* Plans Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {contingencyPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const timeLeft = timeRemaining[plan.id] || 120; // Mock time
            
            return (
              <div
                key={plan.id}
                className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                  isSelected ? "border-primary bg-primary/5 cyber-glow" : "border-border/50 hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <Badge className={getStatusColor(plan.status)}>
                    {plan.status === "em_progresso" && <Play className="h-3 w-3 mr-1" />}
                    {plan.status === "standby" && <Pause className="h-3 w-3 mr-1" />}
                    {plan.status === "concluido" && <CheckCircle className="h-3 w-3 mr-1" />}
                    <span className="hidden sm:inline">{plan.status.toUpperCase().replace("_", " ")}</span>
                    <span className="sm:hidden">{plan.status.charAt(0).toUpperCase()}</span>
                  </Badge>
                  <Badge className={getPriorityColor(plan.priority)}>
                    <span className="hidden sm:inline">{plan.priority.toUpperCase()}</span>
                    <span className="sm:hidden">{plan.priority.charAt(0).toUpperCase()}</span>
                  </Badge>
                </div>
                
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm line-clamp-2 leading-tight">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 sm:mb-3 truncate">{plan.responsibleTeam}</p>
                
                {plan.status === "em_progresso" && (
                  <div className="mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 text-warning mb-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs font-mono">
                        ETA: {formatTime(timeLeft)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                      <div
                        className="h-1.5 sm:h-2 bg-warning rounded-full transition-all duration-500"
                        style={{ width: `${plan.completionRate}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 text-center">
                      {plan.completionRate}%
                    </div>
                  </div>
                )}
                
                <div className="space-y-1">
                  {plan.steps.slice(0, 2).map((step) => {
                    const StepIcon = getStepStatusIcon(step.status);
                    return (
                      <div key={step.id} className="flex items-center gap-2 text-xs">
                        <StepIcon className={`h-3 w-3 flex-shrink-0 ${
                          step.status === "concluído" ? "text-success" :
                          step.status === "em_progresso" ? "text-warning" : "text-muted-foreground"
                        }`} />
                        <span className="truncate">{step.description}</span>
                      </div>
                    );
                  })}
                  {plan.steps.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{plan.steps.length - 2} etapas
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Executions Timeline */}
        {contingencyPlans.filter(p => p.status === "em_progresso").length > 0 && (
          <Card className="p-3 sm:p-4 border-warning bg-warning/5">
            <h3 className="font-medium mb-2 sm:mb-3 text-warning text-xs sm:text-sm">Execuções Ativas</h3>
            <div className="space-y-2 sm:space-y-3">
              {contingencyPlans
                .filter(p => p.status === "em_progresso")
                .map((plan) => {
                  const activeStep = plan.steps.find(s => s.status === "em_progresso");
                  const timeLeft = timeRemaining[plan.id] || 120; // Mock time
                  
                  return (
                    <div key={plan.id} className="flex items-center justify-between p-2 sm:p-3 bg-background rounded border">
                      <div className="min-w-0 flex-1 mr-3">
                        <div className="font-medium text-xs sm:text-sm truncate">{plan.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {activeStep ? `${activeStep.description}` : "Preparando..."}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs sm:text-sm font-mono text-warning">
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {plan.completionRate}%
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        )}
      </Card>

      {selectedData && (
        <Card className="p-3 sm:p-6 border-primary cyber-glow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 sm:mb-4">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{selectedData.name}</h3>
            <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(selectedData.status)}>
                  {selectedData.status.toUpperCase().replace("_", " ")}
                </Badge>
              <Badge className={getPriorityColor(selectedData.priority)}>
                <span className="hidden sm:inline">PRIORIDADE </span>{selectedData.priority.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <h4 className="font-medium mb-2 text-xs sm:text-sm">Recursos Alocados</h4>
              <ul className="space-y-1">
                {selectedData.resources.map((resource, index) => (
                  <li key={index} className="text-xs sm:text-sm text-muted-foreground">
                    • {resource}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-xs sm:text-sm">Métricas</h4>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Progresso:</span>
                  <span className="font-medium">{selectedData.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo ativ.:</span>
                  <span className="font-medium">{selectedData.timeToActivation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipe:</span>
                  <span className="font-medium truncate">{selectedData.responsibleTeam}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-xs sm:text-sm">Status Geral</h4>
              <div className="w-full bg-muted rounded-full h-3 sm:h-4 mb-2">
                <div
                  className="h-3 sm:h-4 bg-primary rounded-full transition-all duration-1000 flex items-center justify-center"
                  style={{ width: `${selectedData.completionRate}%` }}
                >
                  <span className="text-xs text-white font-medium">
                    {selectedData.completionRate}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {selectedData.steps.filter(s => s.status === "concluído").length} de {selectedData.steps.length} etapas
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-xs sm:text-sm">Etapas do Plano</h4>
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
              {selectedData.steps.map((step, index) => {
                const StepIcon = getStepStatusIcon(step.status);
                const isActive = step.status === "em_progresso";
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg ${
                      isActive ? "border-warning bg-warning/5" : "border-border/50"
                    }`}
                  >
                    <div className={`flex-shrink-0 mt-1 ${
                      isActive ? "animate-pulse" : ""
                    }`}>
                      <StepIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        step.status === "concluído" ? "text-success" :
                        step.status === "em_progresso" ? "text-warning" : "text-muted-foreground"
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <span className="font-medium text-xs sm:text-sm line-clamp-2">
                          Etapa {index + 1}: {step.description}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ~{step.estimatedTime}
                        </span>
                      </div>
                      
                      {step.dependencies.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Depend.: {step.dependencies.join(", ")}
                        </div>
                      )}
                      
                      {isActive && (
                        <div className="mt-1 sm:mt-2">
                          <div className="w-full bg-muted rounded-full h-1">
                            <div className="h-1 bg-warning rounded-full animate-pulse" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};