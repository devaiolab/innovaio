import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Target, DollarSign, Clock, Zap, TrendingUp } from "lucide-react";
import { innovationService } from "@/services/innovationService";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  impact: number;
  feasibility: number;
  urgency: number;
  revenue: number;
  timeframe: string;
  category: "5G" | "IoT" | "MVNO" | "Digital" | "Infrastructure";
  quadrant: "high-impact-high-feasibility" | "high-impact-low-feasibility" | "low-impact-high-feasibility" | "low-impact-low-feasibility";
  roi: number;
  risks: string[];
  nextSteps: string[];
}

const mockOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "5G Enterprise Solutions",
    description: "Soluções 5G privadas para indústrias com edge computing integrado",
    impact: 95,
    feasibility: 78,
    urgency: 85,
    revenue: 25000000,
    timeframe: "12-18 meses",
    category: "5G",
    quadrant: "high-impact-high-feasibility",
    roi: 340,
    risks: ["Competição intensa", "Investimento inicial alto"],
    nextSteps: ["Estudo de viabilidade", "Parcerias tecnológicas", "Piloto com cliente âncora"]
  },
  {
    id: "opp-2",
    title: "MVNO Regional Premium",
    description: "MVNO focado em região ABC com serviços diferenciados e suporte local",
    impact: 82,
    feasibility: 88,
    urgency: 92,
    revenue: 18000000,
    timeframe: "6-9 meses",
    category: "MVNO", 
    quadrant: "high-impact-high-feasibility",
    roi: 285,
    risks: ["Regulação", "Concorrência NuCel"],
    nextSteps: ["Negociação com operadora", "Análise regulatória", "Plano de marketing"]
  },
  {
    id: "opp-3",
    title: "IoT Platform as a Service",
    description: "Plataforma unificada para gestão de dispositivos IoT corporativos",
    impact: 88,
    feasibility: 65,
    urgency: 70,
    revenue: 12000000,
    timeframe: "18-24 meses",
    category: "IoT",
    quadrant: "high-impact-low-feasibility",
    roi: 220,
    risks: ["Complexidade técnica", "Padronização"],
    nextSteps: ["MVP desenvolvimento", "Validação mercado", "Parcerias integração"]
  },
  {
    id: "opp-4",
    title: "Digital Banking Telecom",
    description: "Serviços financeiros integrados com produtos de telecom",
    impact: 76,
    feasibility: 45,
    urgency: 60,
    revenue: 8000000,
    timeframe: "24+ meses",
    category: "Digital",
    quadrant: "high-impact-low-feasibility",
    roi: 180,
    risks: ["Regulação financeira", "Licenças necessárias"],
    nextSteps: ["Estudo regulatório", "Análise de licenças", "Benchmark mercado"]
  },
  {
    id: "opp-5",
    title: "Fiber Expansion ABC",
    description: "Expansão de fibra óptica em regiões não atendidas do ABC",
    impact: 65,
    feasibility: 92,
    urgency: 75,
    revenue: 15000000,
    timeframe: "9-12 meses",
    category: "Infrastructure",
    quadrant: "low-impact-high-feasibility",
    roi: 195,
    risks: ["Investimento CAPEX", "Licenças municipais"],
    nextSteps: ["Mapeamento áreas", "Análise investimento", "Licenças prefeitura"]
  }
];

const categoryColors = {
  "5G": "bg-primary text-primary-foreground",
  "IoT": "bg-secondary text-secondary-foreground", 
  "MVNO": "bg-destructive text-destructive-foreground",
  "Digital": "bg-warning text-warning-foreground",
  "Infrastructure": "bg-success text-success-foreground"
};

const quadrantConfig = {
  "high-impact-high-feasibility": {
    title: "Quick Wins",
    description: "Alto impacto, alta viabilidade",
    color: "border-success bg-success/5"
  },
  "high-impact-low-feasibility": {
    title: "Major Projects", 
    description: "Alto impacto, baixa viabilidade",
    color: "border-warning bg-warning/5"
  },
  "low-impact-high-feasibility": {
    title: "Fill-ins",
    description: "Baixo impacto, alta viabilidade", 
    color: "border-muted bg-muted/5"
  },
  "low-impact-low-feasibility": {
    title: "Thankless Tasks",
    description: "Baixo impacto, baixa viabilidade",
    color: "border-destructive bg-destructive/5"
  }
};

export const OpportunityMatrix = () => {
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const opportunityData = await innovationService.getOpportunities();
        // Transform data to match component format
        const transformedOpportunities = opportunityData.map(opp => ({
          id: opp.opportunity_id,
          title: opp.title,
          description: `Oportunidade de inovação na categoria ${opp.category}`,
          impact: 85, // Mock impact score
          feasibility: 75, // Mock feasibility score  
          urgency: 80, // Mock urgency score
          revenue: opp.investment_millions * 1000000, // Convert to revenue estimate
          timeframe: `${opp.time_to_market_months} meses`,
          category: opp.category as "5G" | "IoT" | "MVNO" | "Digital" | "Infrastructure",
          quadrant: "high-impact-high-feasibility" as any,
          roi: opp.roi_percentage,
          risks: ["Competição", "Investimento"], // Mock risks
          nextSteps: ["Análise detalhada", "Estudo de viabilidade"] // Mock steps
        }));
        
        // If no data from DB, use mock data
        setOpportunities(transformedOpportunities.length > 0 ? transformedOpportunities : mockOpportunities);
      } catch (error) {
        console.error('Error loading opportunities:', error);
        setOpportunities(mockOpportunities);
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact'
    }).format(value);
  };

  const getQuadrant = (impact: number, feasibility: number): Opportunity["quadrant"] => {
    if (impact >= 75 && feasibility >= 75) return "high-impact-high-feasibility";
    if (impact >= 75 && feasibility < 75) return "high-impact-low-feasibility";
    if (impact < 75 && feasibility >= 75) return "low-impact-high-feasibility";
    return "low-impact-low-feasibility";
  };

  const groupedOpportunities = opportunities.reduce((acc, opp) => {
    const quadrant = getQuadrant(opp.impact, opp.feasibility);
    if (!acc[quadrant]) acc[quadrant] = [];
    acc[quadrant].push(opp);
    return acc;
  }, {} as Record<string, Opportunity[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Carregando matriz de oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="font-semibold">Oportunidades</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {opportunities.length}
          </div>
          <div className="text-sm text-muted-foreground">
            Identificadas e analisadas
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="font-semibold">Receita Potencial</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {formatCurrency(opportunities.reduce((acc, opp) => acc + opp.revenue, 0))}
          </div>
          <div className="text-sm text-muted-foreground">
            Total estimado
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-semibold">ROI Médio</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {Math.round(opportunities.reduce((acc, opp) => acc + opp.roi, 0) / opportunities.length)}%
          </div>
          <div className="text-sm text-muted-foreground">
            Retorno esperado
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold">Quick Wins</span>
          </div>
          <div className="text-2xl font-bold gradient-text">
            {groupedOpportunities["high-impact-high-feasibility"]?.length || 0}
          </div>
          <div className="text-sm text-muted-foreground">
            Prontas para execução
          </div>
        </Card>
      </div>

      {/* Opportunity Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(quadrantConfig).map(([quadrant, config]) => (
          <Card key={quadrant} className={`p-4 ${config.color}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{config.title}</h3>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
              <Badge variant="outline">
                {groupedOpportunities[quadrant]?.length || 0}
              </Badge>
            </div>

            <div className="space-y-3">
              {groupedOpportunities[quadrant]?.map((opp) => (
                <Card 
                  key={opp.id} 
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedOpp(opp)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{opp.title}</h4>
                    <Badge className={categoryColors[opp.category]}>
                      {opp.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {opp.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Impacto</span>
                      <span>{opp.impact}%</span>
                    </div>
                    <Progress value={opp.impact} className="h-1" />
                    
                    <div className="flex items-center justify-between text-xs">
                      <span>Viabilidade</span>
                      <span>{opp.feasibility}%</span>
                    </div>
                    <Progress value={opp.feasibility} className="h-1" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="font-medium text-success">{formatCurrency(opp.revenue)}</span>
                    <span className="text-muted-foreground">{opp.timeframe}</span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedOpp && (
        <Card className="p-6 border-primary/20 bg-primary/5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{selectedOpp.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedOpp.description}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedOpp(null)}
            >
              Fechar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Impacto</span>
                <span>{selectedOpp.impact}%</span>
              </div>
              <Progress value={selectedOpp.impact} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Viabilidade</span>
                <span>{selectedOpp.feasibility}%</span>
              </div>
              <Progress value={selectedOpp.feasibility} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Urgência</span>
                <span>{selectedOpp.urgency}%</span>
              </div>
              <Progress value={selectedOpp.urgency} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Próximos Passos</h4>
              <ul className="space-y-2">
                {selectedOpp.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Riscos Identificados</h4>
              <ul className="space-y-2">
                {selectedOpp.risks.map((risk, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex gap-4 text-sm">
              <span><strong>ROI:</strong> {selectedOpp.roi}%</span>
              <span><strong>Receita:</strong> {formatCurrency(selectedOpp.revenue)}</span>
              <span><strong>Prazo:</strong> {selectedOpp.timeframe}</span>
            </div>
            <Button className="cyber-glow">
              Iniciar Projeto
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};