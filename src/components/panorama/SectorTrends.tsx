import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { innovationService } from "@/services/innovationService";

interface SectorData {
  sector: string;
  investment: number;
  patents: number;
  startups: number;
  risk: "baixo" | "médio" | "alto";
  opportunity: number;
}

const sectorData: SectorData[] = [
  { sector: "FTTH Deployment", investment: 4200, patents: 85, startups: 180, risk: "baixo", opportunity: 95 },
  { sector: "5G FWA", investment: 2800, patents: 152, startups: 120, risk: "médio", opportunity: 88 },
  { sector: "Edge Computing", investment: 1600, patents: 98, startups: 85, risk: "alto", opportunity: 82 },
  { sector: "Satellite Internet", investment: 3400, patents: 67, startups: 95, risk: "alto", opportunity: 89 },
  { sector: "Corporate Networks", investment: 2100, patents: 124, startups: 140, risk: "baixo", opportunity: 76 },
];

const investmentDistribution = [
  { name: 'FTTH Deployment', value: 4200, color: '#06b6d4' },
  { name: 'Satellite Internet', value: 3400, color: '#10b981' },
  { name: '5G FWA', value: 2800, color: '#8b5cf6' },
  { name: 'Corporate Networks', value: 2100, color: '#f59e0b' },
  { name: 'Edge Computing', value: 1600, color: '#ef4444' },
];

export const SectorTrends = () => {
  const [selectedMetric, setSelectedMetric] = useState<'investment' | 'patents' | 'startups'>('investment');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSectors = async () => {
      try {
        const data = await innovationService.getSectorAnalysis();
        const mapped: SectorData[] = data.map(s => ({
          sector: s.sector_name,
          investment: s.investment_millions,
          patents: s.patents_count,
          startups: s.startups_count,
          risk: s.risk_level as any,
          opportunity: s.opportunity_score
        }));
        setSectors(mapped.length > 0 ? mapped : sectorData);
      } catch (error) {
        console.error('Error loading sectors:', error);
        setSectors(sectorData);
      } finally {
        setLoading(false);
      }
    };

    loadSectors();
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "alto": return "border-destructive text-destructive bg-destructive/10";
      case "médio": return "border-warning text-warning bg-warning/10";
      case "baixo": return "border-success text-success bg-success/10";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "alto": return AlertTriangle;
      case "médio": return TrendingUp;
      case "baixo": return CheckCircle;
      default: return TrendingUp;
    }
  };

  const formatValue = (value: number, metric: string) => {
    if (metric === 'investment') return `R$${(value / 1000).toFixed(1)}B`;
    if (metric === 'patents') return `${value}`;
    return `${value}`;
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'investment': return 'Investimento (Bilhões R$)';
      case 'patents': return 'Licenças/Autorizações';
      case 'startups': return 'Players Ativos';
      default: return '';
    }
  };

  const chartData = sectors.map(sector => ({
    sector: sector.sector,
    investment: sector.investment,
    patents: sector.patents,
    startups: sector.startups
  }));

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h2 className="text-base sm:text-xl font-semibold gradient-text">Análise Setorial</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'investment', label: 'Invest.' },
              { key: 'patents', label: 'Licenças' },
              { key: 'startups', label: 'Players' }
            ].map((metric) => (
              <Button
                key={metric.key}
                variant={selectedMetric === metric.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric(metric.key as any)}
                className="cyber-glow text-xs"
              >
                {metric.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-muted-foreground">
              {getMetricLabel(selectedMetric)}
            </h3>
            <div className="h-48 sm:h-64 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="sector" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={9}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickFormatter={(value) => formatValue(value, selectedMetric)}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [formatValue(value as number, selectedMetric), getMetricLabel(selectedMetric)]}
                  />
                  <Bar 
                    dataKey={selectedMetric}
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 text-muted-foreground">
              Distribuição de Investimentos
            </h3>
            <div className="h-48 sm:h-64 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={window.innerWidth < 640 ? 60 : 80}
                    dataKey="value"
                    label={({ name, percent }) => window.innerWidth < 640 ? `${(percent * 100).toFixed(0)}%` : `${name}: ${(percent * 100).toFixed(1)}%`}
                    labelLine={false}
                    fontSize={window.innerWidth < 640 ? 10 : 12}
                  >
                    {investmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`R$${(value as number / 1000).toFixed(1)}B`, 'Investimento']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {sectors.map((sector) => {
          const RiskIcon = getRiskIcon(sector.risk);
          const isSelected = selectedSector === sector.sector;
          
          return (
            <Card
              key={sector.sector}
              className={`p-3 sm:p-4 cursor-pointer transition-all duration-300 ${
                isSelected ? "border-primary bg-primary/5 cyber-glow" : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedSector(isSelected ? null : sector.sector)}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <Badge className={getRiskColor(sector.risk)}>
                  <RiskIcon className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">RISCO </span>{sector.risk.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">{sector.opportunity}%</span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2 sm:mb-3 text-xs sm:text-sm line-clamp-2 leading-tight">{sector.sector}</h3>
              
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Invest.:</span>
                  <span className="font-medium">R${(sector.investment / 1000).toFixed(1)}B</span>
                </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">Licenças:</span>
                   <span className="font-medium">{sector.patents}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">Players:</span>
                   <span className="font-medium">{sector.startups}</span>
                 </div>
              </div>
              
              <div className="mt-2 sm:mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Potencial</span>
                  <span>{sector.opportunity}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                  <div
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-1000 ${
                      sector.opportunity >= 85 ? "bg-success" :
                      sector.opportunity >= 70 ? "bg-warning" : "bg-primary"
                    }`}
                    style={{ width: `${sector.opportunity}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};