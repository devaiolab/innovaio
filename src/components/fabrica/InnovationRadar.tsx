import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, Star, Clock } from "lucide-react";
import { useState } from "react";

interface InnovationOpportunity {
  id: string;
  title: string;
  category: string;
  maturity: number;
  roi: number;
  timeToMarket: number; // meses
  investment: number; // milhares
  potential: "alto" | "médio" | "baixo";
  technologies: string[];
  applications: string[];
}

const opportunities: InnovationOpportunity[] = [
  {
    id: "ai-network",
    title: "IA para Otimização de Rede",
    category: "Inteligência Artificial",
    maturity: 75,
    roi: 340,
    timeToMarket: 8,
    investment: 850,
    potential: "alto",
    technologies: ["Machine Learning", "Network Analytics", "Predictive Algorithms"],
    applications: ["QoS Otimizado", "Prevenção de Falhas", "Capacity Planning"]
  },
  {
    id: "edge-processing",
    title: "Edge Computing Distribuído",
    category: "Infraestrutura",
    maturity: 65,
    roi: 280,
    timeToMarket: 12,
    investment: 1200,
    potential: "alto",
    technologies: ["Edge Servers", "Container Orchestration", "5G Integration"],
    applications: ["Gaming", "IoT Processing", "CDN Local"]
  },
  {
    id: "blockchain-billing",
    title: "Blockchain para Billing",
    category: "Fintech",
    maturity: 45,
    roi: 180,
    timeToMarket: 18,
    investment: 650,
    potential: "médio",
    technologies: ["Smart Contracts", "Distributed Ledger", "Crypto Payments"],
    applications: ["Billing Transparente", "Micro-pagamentos", "Revenue Sharing"]
  }
];

export const InnovationRadar = () => {
  const [selectedOpp, setSelectedOpp] = useState<string | null>(null);

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case "alto": return "border-success text-success bg-success/10";
      case "médio": return "border-warning text-warning bg-warning/10";
      case "baixo": return "border-muted text-muted-foreground bg-muted/10";
      default: return "border-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold gradient-text">Radar de Inovação</h2>
        <Badge className="border-success text-success bg-success/10">
          {opportunities.filter(o => o.potential === "alto").length} OPORTUNIDADES
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedOpp === opp.id ? "border-primary bg-primary/5 cyber-glow" : "border-border/50 hover:border-primary/50"
            }`}
            onClick={() => setSelectedOpp(selectedOpp === opp.id ? null : opp.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <Badge className={getPotentialColor(opp.potential)}>
                {opp.potential.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-warning" />
                <span className="text-xs font-medium">{opp.roi}% ROI</span>
              </div>
            </div>

            <h3 className="font-semibold mb-2 text-sm">{opp.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">{opp.category}</p>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Maturidade:</span>
                  <span className="font-medium">{opp.maturity}%</span>
                </div>
                <Progress value={opp.maturity} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Investimento:</div>
                  <div className="font-medium">R$ {opp.investment}K</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Time to Market:</div>
                  <div className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {opp.timeToMarket}m
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};