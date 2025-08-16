import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Target, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface ThreatData {
  id: string;
  name: string;
  category: string;
  probability: number;
  impact: number;
  timeToImpact: number; // in days
  severity: "crítico" | "alto" | "médio" | "baixo";
  region: string;
  description: string;
  countermeasures: string[];
}

const threats: ThreatData[] = [
  {
    id: "1",
    name: "Starlink Aggressive Pricing",
    category: "Competitivo",
    probability: 92,
    impact: 88,
    timeToImpact: 30,
    severity: "crítico",
    region: "Brasil",
    description: "Starlink pode lançar planos residenciais a R$ 99/mês, impactando ISPs regionais drasticamente.",
    countermeasures: ["Acelerar FTTH deployment", "Pacotes empresariais diferenciados", "Parcerias locais estratégicas"]
  },
  {
    id: "2",
    name: "Regulação Anatel 5G FWA",
    category: "Regulatório",
    probability: 85,
    impact: 75,
    timeToImpact: 60,
    severity: "alto",
    region: "Brasil",
    description: "Nova regulamentação pode facilitar entry de operadoras móveis no Fixed Wireless Access.",
    countermeasures: ["Compliance proativo", "Lobby técnico junto à Anatel", "Investimento em licenças"]
  },
  {
    id: "3",
    name: "Aquisição por Big Tech",
    category: "Competitivo",
    probability: 70,
    impact: 92,
    timeToImpact: 90,
    severity: "crítico",
    region: "Nacional",
    description: "Google/Meta podem adquirir ISPs regionais para controle vertical da conectividade.",
    countermeasures: ["Valorização defensiva", "Alianças regionais", "Diferenciação por serviço local"]
  },
  {
    id: "4",
    name: "Escassez de Fibra Óptica",
    category: "Cadeia de Suprimentos",
    probability: 78,
    impact: 82,
    timeToImpact: 45,
    severity: "alto",
    region: "Global",
    description: "Shortage global de cabos de fibra pode atrasar expansões e encarecer CAPEX em 40%.",
    countermeasures: ["Contratos de longo prazo", "Fornecedores alternativos", "Otimização de rotas"]
  },
  {
    id: "5",
    name: "Ciberataque DDoS Massivo",
    category: "Segurança",
    probability: 82,
    impact: 95,
    timeToImpact: 15,
    severity: "crítico",
    region: "Brasil",
    description: "Evidências de preparação para DDoS coordenado contra ISPs durante eventos críticos.",
    countermeasures: ["Cloudflare/Akamai protection", "Peering redundante", "Plano de contingência 24h"]
  },
  {
    id: "6",
    name: "Guerra de Preços Regional",
    category: "Competitivo",
    probability: 88,
    impact: 78,
    timeToImpact: 30,
    severity: "alto",
    region: "Regional",
    description: "Entrada de players nacionais com preços 50% abaixo da média pode forçar guerra de preços.",
    countermeasures: ["Diferenciação por qualidade", "Bundling de serviços", "Fidelização ativa"]
  },
  {
    id: "7",
    name: "Mudança Regulatória LGPD",
    category: "Regulatório",
    probability: 65,
    impact: 70,
    timeToImpact: 120,
    severity: "médio",
    region: "Brasil",
    description: "Novas interpretações da LGPD podem impactar coleta de dados de tráfego e QoS.",
    countermeasures: ["Revisão de políticas", "Consentimento explícito", "Anonimização avançada"]
  },
  {
    id: "8",
    name: "Obsolescência de IPv4",
    category: "Tecnológico",
    probability: 95,
    impact: 65,
    timeToImpact: 180,
    severity: "alto",
    region: "Global",
    description: "Esgotamento de IPv4 e necessidade de migração forçada para IPv6 em 2025.",
    countermeasures: ["Plano de migração IPv6", "Dual-stack deployment", "Treinamento técnico"]
  }
];

export const ThreatHeatmap = () => {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [realTime, setRealTime] = useState(new Date());
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    const timer = setInterval(() => setRealTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = ["all", ...Array.from(new Set(threats.map(t => t.category)))];
  const filteredThreats = filterCategory === "all" 
    ? threats 
    : threats.filter(t => t.category === filterCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "crítico": return "bg-destructive text-destructive-foreground";
      case "alto": return "bg-warning text-warning-foreground";
      case "médio": return "bg-primary text-primary-foreground";
      case "baixo": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskScore = (probability: number, impact: number) => {
    return Math.round((probability * impact) / 100);
  };

  const getUrgencyLevel = (timeToImpact: number) => {
    if (timeToImpact <= 30) return { level: "IMEDIATO", color: "text-destructive" };
    if (timeToImpact <= 90) return { level: "URGENTE", color: "text-warning" };
    return { level: "MONITORAR", color: "text-success" };
  };

  const selectedData = selectedThreat ? threats.find(t => t.id === selectedThreat) : null;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-semibold gradient-text">Mapa de Ameaças em Tempo Real</h2>
            <Badge variant="destructive" className="alert-pulse">
              {filteredThreats.filter(t => t.severity === "crítico").length} CRÍTICAS
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground font-mono">
              {realTime.toLocaleTimeString('pt-BR')}
            </div>
            <div className="flex gap-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className="cyber-glow"
                >
                  {category === "all" ? "Todas" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-10 gap-2 mb-4">
            <div className="text-xs text-muted-foreground col-span-2">Impacto →</div>
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => (
              <div key={val} className="text-xs text-center text-muted-foreground">{val}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-11 gap-2">
            <div className="flex flex-col justify-center">
              <div className="text-xs text-muted-foreground transform -rotate-90 origin-center">
                Probabilidade ↑
              </div>
            </div>
            
            {Array.from({ length: 10 }, (_, rowIndex) => {
              const probabilityRange = [90 - (rowIndex * 10), 100 - (rowIndex * 10)];
              
              return Array.from({ length: 10 }, (_, colIndex) => {
                const impactRange = [(colIndex * 10) + 10, (colIndex * 10) + 20];
                
                // Find threats in this cell
                const cellThreats = filteredThreats.filter(threat => 
                  threat.probability >= probabilityRange[0] && threat.probability < probabilityRange[1] &&
                  threat.impact >= impactRange[0] && threat.impact <= impactRange[1]
                );

                const cellRisk = cellThreats.length > 0 
                  ? Math.max(...cellThreats.map(t => getRiskScore(t.probability, t.impact)))
                  : 0;

                const getCellColor = (risk: number) => {
                  if (risk === 0) return "bg-muted/30";
                  if (risk >= 80) return "bg-destructive";
                  if (risk >= 60) return "bg-warning";
                  if (risk >= 40) return "bg-primary";
                  return "bg-success";
                };

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`h-8 rounded cursor-pointer transition-all duration-300 ${getCellColor(cellRisk)} ${
                      cellThreats.length > 0 ? "hover:scale-110 hover:z-10 pulse-glow" : ""
                    }`}
                    title={cellThreats.map(t => t.name).join(", ")}
                    onClick={() => {
                      if (cellThreats.length > 0) {
                        setSelectedThreat(cellThreats[0].id);
                      }
                    }}
                  >
                    {cellThreats.length > 0 && (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-xs font-bold text-white">
                          {cellThreats.length}
                        </span>
                      </div>
                    )}
                  </div>
                );
              });
            }).flat()}
          </div>
        </div>

        {/* Threats List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredThreats
            .sort((a, b) => getRiskScore(b.probability, b.impact) - getRiskScore(a.probability, a.impact))
            .map((threat) => {
              const riskScore = getRiskScore(threat.probability, threat.impact);
              const urgency = getUrgencyLevel(threat.timeToImpact);
              const isSelected = selectedThreat === threat.id;
              
              return (
                <div
                  key={threat.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                    isSelected ? "border-primary bg-primary/5 cyber-glow" : "border-border/50 hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedThreat(isSelected ? null : threat.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getSeverityColor(threat.severity)}>
                      {threat.severity.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span className="text-xs font-bold">{riskScore}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2 text-sm">{threat.name}</h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoria:</span>
                      <span className="font-medium">{threat.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Região:</span>
                      <span className="font-medium">{threat.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tempo p/ Impacto:</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{threat.timeToImpact}d</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Urgência:</span>
                      <Badge variant="outline" className={`${urgency.color} border-current`}>
                        {urgency.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-muted-foreground mb-1">Probabilidade</div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="h-1.5 bg-warning rounded-full transition-all duration-1000"
                          style={{ width: `${threat.probability}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-1 font-medium">{threat.probability}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Impacto</div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="h-1.5 bg-destructive rounded-full transition-all duration-1000"
                          style={{ width: `${threat.impact}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-1 font-medium">{threat.impact}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>

      {selectedData && (
        <Card className="p-6 border-destructive cyber-glow">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold">{selectedData.name}</h3>
            <Badge className={getSeverityColor(selectedData.severity)}>
              AMEAÇA {selectedData.severity.toUpperCase()}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{selectedData.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{selectedData.probability}%</div>
              <div className="text-xs text-muted-foreground">Probabilidade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{selectedData.impact}%</div>
              <div className="text-xs text-muted-foreground">Impacto</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{getRiskScore(selectedData.probability, selectedData.impact)}</div>
              <div className="text-xs text-muted-foreground">Score de Risco</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{selectedData.timeToImpact}d</div>
              <div className="text-xs text-muted-foreground">Tempo p/ Impacto</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Contramedidas Recomendadas
            </h4>
            <div className="space-y-2">
              {selectedData.countermeasures.map((measure, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>{measure}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};