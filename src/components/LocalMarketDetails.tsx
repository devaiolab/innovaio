import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, Building2, TrendingUp, AlertTriangle, MapPin, Calendar, DollarSign, Target, Clock, Zap } from "lucide-react";
import { ReactNode } from "react";

interface LocalMarketItem {
  id: string;
  type: "competitor" | "regulation" | "opportunity" | "threat";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  urgency: number;
  timestamp: Date;
  source: string;
}

interface LocalMarketDetailsProps {
  item: LocalMarketItem;
  trigger: ReactNode;
}

export const LocalMarketDetails = ({ item, trigger }: LocalMarketDetailsProps) => {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "competitor":
        return {
          icon: Users,
          color: "text-blue-400",
          bg: "bg-blue-400/10",
          label: "Concorrente",
          description: "Análise competitiva detalhada"
        };
      case "regulation":
        return {
          icon: Building2,
          color: "text-purple-400",
          bg: "bg-purple-400/10",
          label: "Regulação",
          description: "Impacto regulatório e compliance"
        };
      case "opportunity":
        return {
          icon: TrendingUp,
          color: "text-green-400",
          bg: "bg-green-400/10",
          label: "Oportunidade",
          description: "Potencial de crescimento e expansão"
        };
      case "threat":
        return {
          icon: AlertTriangle,
          color: "text-red-400",
          bg: "bg-red-400/10",
          label: "Ameaça",
          description: "Risco estratégico identificado"
        };
      default:
        return {
          icon: MapPin,
          color: "text-gray-400",
          bg: "bg-gray-400/10",
          label: "Informação",
          description: "Dados de mercado local"
        };
    }
  };

  const config = getTypeConfig(item.type);
  const IconComponent = config.icon;

  // Mock detailed data based on item type
  const getDetailedAnalysis = () => {
    switch (item.type) {
      case "competitor":
        return {
          marketShare: Math.floor(Math.random() * 25) + 10,
          pricing: "R$ 120-450/mês",
          technology: "Fibra Óptica GPON",
          coverage: "85% da região ABC",
          strengths: ["Velocidade superior", "Preço competitivo", "Marketing agressivo"],
          weaknesses: ["Suporte limitado", "Cobertura parcial", "Marca nova"]
        };
      case "opportunity":
        return {
          marketSize: "R$ 2.5M potencial",
          timeline: "6-12 meses",
          investment: "R$ 800K estimado",
          roi: "35% em 24 meses",
          strengths: ["Demanda crescente", "Baixa concorrência", "Margem alta"],
          weaknesses: ["Investimento inicial", "Risco regulatório", "Tempo de implementação"]
        };
      case "threat":
        return {
          riskLevel: item.urgency,
          timeToImpact: "2-4 semanas",
          potentialLoss: "R$ 500K-1.2M",
          mitigation: "Ação imediata requerida",
          strengths: ["Recursos limitados", "Entrada tardia", "Posicionamento unclear"],
          weaknesses: ["Capital disponível", "Marca forte", "Estratégia agressiva"]
        };
      default:
        return {
          compliance: "95% adequado",
          timeline: "Vigência imediata",
          impact: "Médio prazo",
          cost: "Baixo impacto financeiro",
          strengths: ["Facilita expansão", "Reduz custos", "Acelera processos"],
          weaknesses: ["Mudança de processo", "Treinamento necessário", "Adaptação"]
        };
    }
  };

  const analysis = getDetailedAnalysis();

  // Historical timeline (mock)
  const timeline = [
    { date: "15 dias atrás", event: "Primeiro sinal detectado", type: "info" },
    { date: "10 dias atrás", event: "Confirmação de atividade", type: "warning" },
    { date: "5 dias atrás", event: "Intensificação observada", type: "warning" },
    { date: "Hoje", event: item.title, type: item.impact === "high" ? "critical" : "warning" }
  ];

  const recommendations = item.type === "competitor" 
    ? ["Análise detalhada de preços", "Monitorar campanhas de marketing", "Avaliar resposta competitiva"]
    : item.type === "opportunity"
    ? ["Desenvolver proposta comercial", "Análise de viabilidade técnica", "Cronograma de implementação"]
    : item.type === "threat"
    ? ["Estratégia de retenção de clientes", "Ajuste de preços defensivo", "Acelerar expansão de cobertura"]
    : ["Ajustar processos internos", "Treinamento de equipes", "Compliance checklist"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className={`h-5 w-5 ${config.color}`} />
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className={`p-4 ${config.bg}`}>
              <div className="flex items-start gap-4">
                <IconComponent className={`h-8 w-8 ${config.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={config.color}>
                      {config.label}
                    </Badge>
                    <Badge 
                      variant={item.impact === "high" ? "destructive" : item.impact === "medium" ? "secondary" : "outline"}
                    >
                      Impacto {item.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Urgência</div>
                      <div className="flex items-center gap-2">
                        <Progress value={item.urgency} className="h-2 flex-1" />
                        <span className="text-sm font-semibold">{item.urgency}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Fonte</div>
                      <div className="text-sm font-semibold">{item.source}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Detectado</div>
                      <div className="text-sm font-semibold">
                        {item.timestamp.toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          item.urgency >= 80 ? 'bg-destructive' :
                          item.urgency >= 60 ? 'bg-warning' : 'bg-primary'
                        } pulse-glow`}></div>
                        <span className="text-sm font-semibold">
                          {item.urgency >= 80 ? 'Crítico' : item.urgency >= 60 ? 'Ativo' : 'Monitorando'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Métricas Chave
                </h3>
                <div className="space-y-3">
                  {Object.entries(analysis).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Análise SWOT
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-semibold text-green-600 mb-1">Forças</div>
                    <ul className="text-xs space-y-1">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-green-500"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-red-600 mb-1">Fraquezas</div>
                    <ul className="text-xs space-y-1">
                      {analysis.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-red-500"></div>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Linha do Tempo
              </h3>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        event.type === 'critical' ? 'bg-destructive' :
                        event.type === 'warning' ? 'bg-warning' : 'bg-primary'
                      }`}></div>
                      {index < timeline.length - 1 && <div className="w-px h-8 bg-border mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-sm font-semibold">{event.event}</div>
                      <div className="text-xs text-muted-foreground">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Ações Recomendadas
              </h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{rec}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Prioridade: {index === 0 ? 'Alta' : index === 1 ? 'Média' : 'Baixa'}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Executar
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">Próximos Passos</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Com base na urgência de {item.urgency}%, recomendamos ação imediata nas próximas 24-48h.
              </p>
              <Button className="w-full">
                Criar Plano de Ação Detalhado
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};