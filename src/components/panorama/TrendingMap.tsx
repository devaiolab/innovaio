import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, MapPin, Filter } from "lucide-react";
import { useState } from "react";

interface TrendData {
  id: string;
  region: string;
  technology: string;
  intensity: number;
  growth: number;
  impact: "high" | "medium" | "low";
}

const mockTrends: TrendData[] = [
  { id: "1", region: "São Paulo", technology: "FTTH (Fibra Óptica)", intensity: 95, growth: 45, impact: "high" },
  { id: "2", region: "Rio de Janeiro", technology: "5G FWA", intensity: 88, growth: 156, impact: "high" },
  { id: "3", region: "Brasília", technology: "WiFi 6E", intensity: 82, growth: 89, impact: "medium" },
  { id: "4", region: "Minas Gerais", technology: "Edge Computing", intensity: 78, growth: 134, impact: "medium" },
  { id: "5", region: "Sul (RS/SC/PR)", technology: "Private Networks", intensity: 71, growth: 98, impact: "medium" },
  { id: "6", region: "Nordeste", technology: "Satellite Internet", intensity: 69, growth: 187, impact: "high" },
  { id: "7", region: "Centro-Oeste", technology: "SD-WAN", intensity: 65, growth: 76, impact: "medium" },
  { id: "8", region: "Norte", technology: "LEO Constellation", intensity: 58, growth: 245, impact: "high" },
];

export const TrendingMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredTrends = mockTrends.filter(trend => 
    filter === "all" || trend.impact === filter
  );

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "border-destructive text-destructive bg-destructive/10";
      case "medium": return "border-warning text-warning bg-warning/10";
      case "low": return "border-success text-success bg-success/10";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 90) return "bg-destructive/20 border-destructive";
    if (intensity >= 75) return "bg-warning/20 border-warning";
    return "bg-success/20 border-success";
  };

  return (
    <Card className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h2 className="text-base sm:text-xl font-semibold gradient-text">Mapa Global de Tendências</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="cyber-glow text-xs"
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Todos
          </Button>
          {["high", "medium", "low"].map((level) => (
            <Button
              key={level}
              variant={filter === level ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(level as any)}
              className="cyber-glow text-xs"
            >
              {level === "high" ? "Alto" : level === "medium" ? "Médio" : "Baixo"}
            </Button>
          ))}
        </div>
      </div>

      {/* World Map Visualization */}
      <div className="relative h-40 sm:h-48 md:h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20 mb-4 sm:mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse"></div>
        {filteredTrends.map((trend, index) => (
          <div
            key={trend.id}
            className={`absolute animate-pulse cursor-pointer transition-all duration-300 ${
              selectedRegion === trend.region ? "scale-150 z-10" : "hover:scale-125"
            }`}
            style={{
              left: `${(index * 15) + 10}%`,
              top: `${(index * 12) + 20}%`,
            }}
            onClick={() => setSelectedRegion(selectedRegion === trend.region ? null : trend.region)}
          >
            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${getIntensityColor(trend.intensity)} pulse-glow`}></div>
            <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap hidden sm:block">
              {trend.region}
            </div>
          </div>
        ))}
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className={`p-3 sm:p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
              selectedRegion === trend.region
                ? "border-primary bg-primary/5 cyber-glow"
                : "border-border/50 hover:border-primary/50"
            }`}
            onClick={() => setSelectedRegion(selectedRegion === trend.region ? null : trend.region)}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge className={getImpactColor(trend.impact)}>
                {trend.impact === "high" ? "ALTO" : trend.impact === "medium" ? "MÉDIO" : "BAIXO"}
              </Badge>
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">+{trend.growth}%</span>
              </div>
            </div>
            <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2 leading-tight">{trend.technology}</h3>
            <p className="text-xs text-muted-foreground mb-2 truncate">{trend.region}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Intensidade</span>
              <span className="text-xs sm:text-sm font-bold">{trend.intensity}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1 sm:h-2 mt-2">
              <div
                className={`h-1 sm:h-2 rounded-full transition-all duration-500 ${
                  trend.intensity >= 90 ? "bg-destructive" :
                  trend.intensity >= 75 ? "bg-warning" : "bg-success"
                }`}
                style={{ width: `${trend.intensity}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};