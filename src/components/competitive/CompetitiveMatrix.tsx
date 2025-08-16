import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Target, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { useState } from "react";

interface CompetitorData {
  id: string;
  name: string;
  marketShare: number;
  innovation: number;
  funding: number;
  patentScore: number;
  threatLevel: "baixo" | "médio" | "alto" | "crítico";
  sector: string;
  recentMoves: string[];
}

const competitors: CompetitorData[] = [
  {
    id: "1",
    name: "TechCorp Alpha",
    marketShare: 25,
    innovation: 85,
    funding: 2400,
    patentScore: 92,
    threatLevel: "crítico",
    sector: "IA Generativa",
    recentMoves: ["Aquisição da StartupX por $500M", "Lançamento de API revolucionária", "Parceria com Microsoft"]
  },
  {
    id: "2", 
    name: "Quantum Dynamics",
    marketShare: 15,
    innovation: 95,
    funding: 800,
    patentScore: 78,
    threatLevel: "alto",
    sector: "Computação Quântica",
    recentMoves: ["Breakthrough em correção de erros", "Contrato militar $200M", "IPO previsto para 2024"]
  },
  {
    id: "3",
    name: "BioInnovate Labs",
    marketShare: 18,
    innovation: 72,
    funding: 1200,
    patentScore: 85,
    threatLevel: "médio",
    sector: "Biotecnologia",
    recentMoves: ["Aprovação FDA para novo tratamento", "Expansão para Europa", "Joint venture com BigPharma"]
  },
  {
    id: "4",
    name: "NanoTech Solutions",
    marketShare: 8,
    innovation: 88,
    funding: 400,
    patentScore: 71,
    threatLevel: "médio",
    sector: "Nanotecnologia",
    recentMoves: ["Prototótipo de chip quântico", "Investimento Series C", "Parceria com Intel"]
  },
  {
    id: "5",
    name: "GreenEnergy Co",
    marketShare: 22,
    innovation: 65,
    funding: 3200,
    patentScore: 68,
    threatLevel: "baixo",
    sector: "Energia Limpa",
    recentMoves: ["Maior parque solar da América", "IPO bilionário", "Aquisições estratégicas"]
  },
  {
    id: "6",
    name: "CyberShield Inc",
    marketShare: 12,
    innovation: 78,
    funding: 600,
    patentScore: 89,
    threatLevel: "alto",
    sector: "Cibersegurança",
    recentMoves: ["Contrato governamental $300M", "IA para detecção de ameaças", "Expansão global"]
  }
];

export const CompetitiveMatrix = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [filterSector, setFilterSector] = useState<string>("all");

  const sectors = ["all", ...Array.from(new Set(competitors.map(c => c.sector)))];
  const filteredCompetitors = filterSector === "all" 
    ? competitors 
    : competitors.filter(c => c.sector === filterSector);

  const getThreatColor = (level: string) => {
    switch (level) {
      case "crítico": return "#ef4444";
      case "alto": return "#f59e0b";
      case "médio": return "#06b6d4";
      case "baixo": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getThreatBadgeClass = (level: string) => {
    switch (level) {
      case "crítico": return "border-destructive text-destructive bg-destructive/10";
      case "alto": return "border-warning text-warning bg-warning/10";
      case "médio": return "border-primary text-primary bg-primary/10";
      case "baixo": return "border-success text-success bg-success/10";
      default: return "border-muted text-muted-foreground";
    }
  };

  const selectedData = selectedCompetitor 
    ? competitors.find(c => c.id === selectedCompetitor)
    : null;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold gradient-text">Matriz Competitiva 3D</h2>
            <Badge variant="destructive" className="alert-pulse">
              6 AMEAÇAS ATIVAS
            </Badge>
          </div>
          <div className="flex gap-2">
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={filterSector === sector ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterSector(sector)}
                className="cyber-glow"
              >
                {sector === "all" ? "Todos" : sector}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">
              Market Share vs Nível de Inovação
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="marketShare"
                  name="Market Share"
                  unit="%"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  dataKey="innovation"
                  name="Inovação"
                  unit=""
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value, name) => [
                    name === "marketShare" ? `${value}%` : value,
                    name === "marketShare" ? "Market Share" : "Inovação"
                  ]}
                />
                <ReferenceLine x={15} stroke="hsl(var(--warning))" strokeDasharray="5 5" />
                <ReferenceLine y={75} stroke="hsl(var(--warning))" strokeDasharray="5 5" />
                {filteredCompetitors.map((competitor) => (
                  <Scatter
                    key={competitor.id}
                    data={[competitor]}
                    fill={getThreatColor(competitor.threatLevel)}
                    onClick={() => setSelectedCompetitor(competitor.id)}
                    className="cursor-pointer"
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Ranking por Ameaça</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {competitors
                .sort((a, b) => {
                  const threatOrder = { "crítico": 4, "alto": 3, "médio": 2, "baixo": 1 };
                  return threatOrder[b.threatLevel] - threatOrder[a.threatLevel];
                })
                .map((competitor) => (
                  <div
                    key={competitor.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedCompetitor === competitor.id
                        ? "border-primary bg-primary/5 cyber-glow"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCompetitor(
                      selectedCompetitor === competitor.id ? null : competitor.id
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{competitor.name}</span>
                      <Badge className={getThreatBadgeClass(competitor.threatLevel)}>
                        {competitor.threatLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{competitor.sector}</div>
                    <div className="flex justify-between text-xs">
                      <span>Market: {competitor.marketShare}%</span>
                      <span>Inovação: {competitor.innovation}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>

      {selectedData && (
        <Card className="p-6 border-primary cyber-glow">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{selectedData.name}</h3>
            <Badge className={getThreatBadgeClass(selectedData.threatLevel)}>
              <AlertTriangle className="h-3 w-3 mr-1" />
              AMEAÇA {selectedData.threatLevel.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{selectedData.marketShare}%</div>
              <div className="text-xs text-muted-foreground">Market Share</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{selectedData.innovation}</div>
              <div className="text-xs text-muted-foreground">Inovação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">${selectedData.funding}M</div>
              <div className="text-xs text-muted-foreground">Funding</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{selectedData.patentScore}</div>
              <div className="text-xs text-muted-foreground">Patent Score</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Movimentos Estratégicos Recentes
            </h4>
            <div className="space-y-2">
              {selectedData.recentMoves.map((move, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>{move}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};