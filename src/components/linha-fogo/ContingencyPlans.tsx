import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle, AlertCircle, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";

interface ContingencyPlan {
  id: string;
  name: string;
  threatId: string;
  status: "ativo" | "standby" | "executando" | "concluido";
  priority: "crítica" | "alta" | "média";
  timeToActivation: number; // minutes
  completionRate: number;
  steps: PlanStep[];
  resources: string[];
  responsibleTeam: string;
}

interface PlanStep {
  id: string;
  description: string;
  status: "pendente" | "executando" | "concluido";
  estimatedTime: number; // minutes
  dependencies: string[];
}

const contingencyPlans: ContingencyPlan[] = [
  {
    id: "1",
    name: "Protocolo Criptografia Quântica",
    threatId: "1",
    status: "executando",
    priority: "crítica",
    timeToActivation: 15,
    completionRate: 65,
    responsibleTeam: "CyberSec Alpha",
    resources: ["Equipe de 15 especialistas", "Budget emergencial $2M", "Acesso laboratório Q-Labs"],
    steps: [
      { id: "1-1", description: "Avaliar vulnerabilidades atuais", status: "concluido", estimatedTime: 30, dependencies: [] },
      { id: "1-2", description: "Implementar criptografia pós-quântica", status: "executando", estimatedTime: 120, dependencies: ["1-1"] },
      { id: "1-3", description: "Teste de penetração avançado", status: "pendente", estimatedTime: 60, dependencies: ["1-2"] },
      { id: "1-4", description: "Deploy em produção", status: "pendente", estimatedTime: 45, dependencies: ["1-3"] }
    ]
  },
  {
    id: "2",
    name: "Conformidade IA Europa",
    threatId: "2",
    status: "ativo",
    priority: "alta",
    timeToActivation: 45,
    completionRate: 25,
    responsibleTeam: "Legal Tech",
    resources: ["5 advogados especializados", "Consultoria Ernst & Young", "Budget $500K"],
    steps: [
      { id: "2-1", description: "Análise de gap regulatório", status: "executando", estimatedTime: 80, dependencies: [] },
      { id: "2-2", description: "Redesign de algoritmos", status: "pendente", estimatedTime: 200, dependencies: ["2-1"] },
      { id: "2-3", description: "Documentação de conformidade", status: "pendente", estimatedTime: 60, dependencies: ["2-2"] },
      { id: "2-4", description: "Certificação externa", status: "pendente", estimatedTime: 90, dependencies: ["2-3"] }
    ]
  },
  {
    id: "3",
    name: "Resposta Ciberataque",
    threatId: "5",
    status: "standby",
    priority: "crítica",
    timeToActivation: 5,
    completionRate: 0,
    responsibleTeam: "CSIRT",
    resources: ["Team de resposta 24/7", "Backup systems", "Forensics tools"],
    steps: [
      { id: "3-1", description: "Isolamento de sistemas críticos", status: "pendente", estimatedTime: 10, dependencies: [] },
      { id: "3-2", description: "Ativação de backups offline", status: "pendente", estimatedTime: 30, dependencies: ["3-1"] },
      { id: "3-3", description: "Análise forense", status: "pendente", estimatedTime: 120, dependencies: ["3-2"] },
      { id: "3-4", description: "Restauração controlada", status: "pendente", estimatedTime: 180, dependencies: ["3-3"] }
    ]
  }
];

export const ContingencyPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const updated = { ...prev };
        contingencyPlans.forEach(plan => {
          if (plan.status === "executando" && updated[plan.id] > 0) {
            updated[plan.id] = Math.max(0, (updated[plan.id] || plan.timeToActivation * 60) - 1);
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "executando": return "border-warning text-warning bg-warning/10";
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
      case "concluido": return CheckCircle;
      case "executando": return Play;
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
              {contingencyPlans.filter(p => p.status === "executando").length} EM EXECUÇÃO
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
            const timeLeft = timeRemaining[plan.id] || plan.timeToActivation * 60;
            
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
                    {plan.status === "executando" && <Play className="h-3 w-3 mr-1" />}
                    {plan.status === "standby" && <Pause className="h-3 w-3 mr-1" />}
                    {plan.status === "concluido" && <CheckCircle className="h-3 w-3 mr-1" />}
                    <span className="hidden sm:inline">{plan.status.toUpperCase()}</span>
                    <span className="sm:hidden">{plan.status.charAt(0).toUpperCase()}</span>
                  </Badge>
                  <Badge className={getPriorityColor(plan.priority)}>
                    <span className="hidden sm:inline">{plan.priority.toUpperCase()}</span>
                    <span className="sm:hidden">{plan.priority.charAt(0).toUpperCase()}</span>
                  </Badge>
                </div>
                
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm line-clamp-2 leading-tight">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 sm:mb-3 truncate">{plan.responsibleTeam}</p>
                
                {plan.status === "executando" && (
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
                          step.status === "concluido" ? "text-success" :
                          step.status === "executando" ? "text-warning" : "text-muted-foreground"
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
        {contingencyPlans.filter(p => p.status === "executando").length > 0 && (
          <Card className="p-3 sm:p-4 border-warning bg-warning/5">
            <h3 className="font-medium mb-2 sm:mb-3 text-warning text-xs sm:text-sm">Execuções Ativas</h3>
            <div className="space-y-2 sm:space-y-3">
              {contingencyPlans
                .filter(p => p.status === "executando")
                .map((plan) => {
                  const activeStep = plan.steps.find(s => s.status === "executando");
                  const timeLeft = timeRemaining[plan.id] || plan.timeToActivation * 60;
                  
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
                {selectedData.status.toUpperCase()}
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
                  <span className="font-medium">{selectedData.timeToActivation}min</span>
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
                {selectedData.steps.filter(s => s.status === "concluido").length} de {selectedData.steps.length} etapas
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-xs sm:text-sm">Etapas do Plano</h4>
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
              {selectedData.steps.map((step, index) => {
                const StepIcon = getStepStatusIcon(step.status);
                const isActive = step.status === "executando";
                
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
                        step.status === "concluido" ? "text-success" :
                        step.status === "executando" ? "text-warning" : "text-muted-foreground"
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <span className="font-medium text-xs sm:text-sm line-clamp-2">
                          Etapa {index + 1}: {step.description}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ~{step.estimatedTime}min
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