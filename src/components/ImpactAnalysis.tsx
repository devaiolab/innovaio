import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Users, Shield, Heart } from "lucide-react";

interface ImpactAnalysisProps {
  scenarioMetrics: {
    scenario: any;
    runtime: number;
    speed: number;
  } | null;
}

export const ImpactAnalysis = ({ scenarioMetrics }: ImpactAnalysisProps) => {
  if (!scenarioMetrics) return null;

  const { scenario } = scenarioMetrics;
  const impacts = scenario.impacts;

  const impactCategories = [
    {
      key: "revenue",
      label: "Impacto na Receita",
      value: impacts.revenue,
      icon: DollarSign,
      description: "Variação percentual estimada na receita mensal",
    },
    {
      key: "market_share",
      label: "Market Share",
      value: impacts.market_share,
      icon: Users,
      description: "Alteração na participação de mercado regional",
    },
    {
      key: "operational_risk",
      label: "Risco Operacional",
      value: impacts.operational_risk,
      icon: Shield,
      description: "Nível de risco para operações críticas",
    },
    {
      key: "customer_satisfaction",
      label: "Satisfação do Cliente",
      value: impacts.customer_satisfaction,
      icon: Heart,
      description: "Impacto na satisfação e retenção de clientes",
    },
  ];

  const getImpactColor = (value: number) => {
    if (value >= 20) return "text-destructive";
    if (value >= 10) return "text-warning";
    if (value >= -10) return "text-primary";
    if (value >= -20) return "text-warning";
    return "text-destructive";
  };

  const getImpactSeverity = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 30) return { level: "CRÍTICO", color: "destructive" };
    if (absValue >= 20) return { level: "ALTO", color: "warning" };
    if (absValue >= 10) return { level: "MODERADO", color: "primary" };
    return { level: "BAIXO", color: "success" };
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (impacts.revenue < -15) {
      recommendations.push({
        type: "urgent",
        title: "Ação Imediata Necessária",
        description: "Impacto severo na receita requer resposta estratégica urgente",
      });
    }
    
    if (impacts.operational_risk > 40) {
      recommendations.push({
        type: "critical",
        title: "Ativar Plano de Contingência",
        description: "Risco operacional elevado - implementar protocolos de emergência",
      });
    }
    
    if (impacts.market_share < -10) {
      recommendations.push({
        type: "strategic",
        title: "Estratégia Competitiva",
        description: "Desenvolver resposta competitiva para minimizar perda de mercado",
      });
    }
    
    if (impacts.customer_satisfaction < -20) {
      recommendations.push({
        type: "customer",
        title: "Gestão de Relacionamento",
        description: "Intensificar comunicação com clientes e programas de retenção",
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-4">
      {/* Impact Metrics */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Análise de Impactos</h3>
          <Badge variant="outline" className="text-xs ml-auto">
            PROJEÇÃO
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {impactCategories.map((category) => {
            const IconComponent = category.icon;
            const severity = getImpactSeverity(category.value);
            
            return (
              <div key={category.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-muted">
                      <IconComponent className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-medium">{category.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {category.value < 0 ? (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-success" />
                    )}
                    <span className={`text-sm font-bold ${getImpactColor(category.value)}`}>
                      {category.value > 0 ? '+' : ''}{category.value}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Severidade:</span>
                    <Badge variant="outline" className={`text-xs border-${severity.color} text-${severity.color}`}>
                      {severity.level}
                    </Badge>
                  </div>
                  <Progress 
                    value={Math.min(Math.abs(category.value), 50) * 2} 
                    className="h-1.5"
                  />
                  <p className="text-xs text-muted-foreground leading-tight">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-accent" />
            <h3 className="font-semibold text-sm">Recomendações Estratégicas</h3>
          </div>
          
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  rec.type === 'urgent' ? 'border-l-destructive bg-destructive/5' :
                  rec.type === 'critical' ? 'border-l-warning bg-warning/5' :
                  rec.type === 'strategic' ? 'border-l-primary bg-primary/5' :
                  'border-l-accent bg-accent/5'
                }`}
              >
                <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                <p className="text-xs text-muted-foreground leading-tight">
                  {rec.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Summary */}
      <Card className="p-4 bg-muted/30">
        <div className="text-center space-y-2">
          <div className="text-xs text-muted-foreground">Resumo do Cenário</div>
          <h4 className="font-semibold text-sm">{scenario.name}</h4>
          <p className="text-xs text-muted-foreground leading-tight">
            {scenario.description}
          </p>
          <Badge className={`${
            scenario.intensity === 'high' ? 'bg-destructive text-destructive-foreground' :
            scenario.intensity === 'medium' ? 'bg-warning text-warning-foreground' :
            'bg-success text-success-foreground'
          }`}>
            INTENSIDADE {scenario.intensity.toUpperCase()}
          </Badge>
        </div>
      </Card>
    </div>
  );
};