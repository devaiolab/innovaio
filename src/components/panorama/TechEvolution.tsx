import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { innovationService } from "@/services/innovationService";

interface TechData {
  month: string;
  quantum: number;
  ai: number;
  biotech: number;
  nanotech: number;
  energy: number;
}

const evolutionData: TechData[] = [
  { month: 'Jan', quantum: 45, ai: 52, biotech: 78, nanotech: 34, energy: 41 },
  { month: 'Fev', quantum: 52, ai: 58, biotech: 82, nanotech: 38, energy: 46 },
  { month: 'Mar', quantum: 48, ai: 61, biotech: 85, nanotech: 42, energy: 52 },
  { month: 'Abr', quantum: 61, ai: 68, biotech: 88, nanotech: 46, energy: 58 },
  { month: 'Mai', quantum: 68, ai: 74, biotech: 91, nanotech: 51, energy: 65 },
  { month: 'Jun', quantum: 75, ai: 82, biotech: 94, nanotech: 55, energy: 72 },
];

const techCategories = [
  { key: 'quantum', name: '5G/6G Networks', color: '#8b5cf6', icon: Zap, growth: '+87%' },
  { key: 'ai', name: 'AI para ISPs', color: '#06b6d4', icon: Activity, growth: '+156%' },
  { key: 'biotech', name: 'FTTH Deployment', color: '#10b981', icon: TrendingUp, growth: '+134%' },
  { key: 'nanotech', name: 'Edge Computing', color: '#f59e0b', icon: Zap, growth: '+98%' },
  { key: 'energy', name: 'Satellite/FWA', color: '#ef4444', icon: Activity, growth: '+76%' },
];

export const TechEvolution = () => {
  const [techData, setTechData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTechEvolution = async () => {
      try {
        const data = await innovationService.getTechEvolution();
        const grouped = data.reduce((acc: any, curr) => {
          if (!acc[curr.month_year]) {
            acc[curr.month_year] = { month: curr.month_year };
          }
          const key = curr.category.toLowerCase().replace(/[^a-z]/g, '');
          acc[curr.month_year][key] = curr.progress_value;
          return acc;
        }, {});
        setTechData(Object.values(grouped).length > 0 ? Object.values(grouped) : evolutionData);
      } catch (error) {
        console.error('Error loading tech evolution:', error);
        setTechData(evolutionData);
      } finally {
        setLoading(false);
      }
    };

    loadTechEvolution();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-6">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h2 className="text-base sm:text-xl font-semibold gradient-text">Evolução Tecnológica</h2>
          <Badge variant="outline" className="border-success text-success text-xs w-fit">
            CRESCIMENTO ACELERADO
          </Badge>
        </div>
        
        <div className="h-48 sm:h-64 lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={techData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              {techCategories.map((tech) => (
                <Line
                  key={tech.key}
                  type="monotone"
                  dataKey={tech.key}
                  stroke={tech.color}
                  strokeWidth={2}
                  dot={{ fill: tech.color, strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: tech.color, stroke: '#fff', strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-6">
          <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h2 className="text-base sm:text-xl font-semibold gradient-text">Velocidade de Inovação</h2>
          <Badge variant="destructive" className="text-xs w-fit">
            CRÍTICO
          </Badge>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {techCategories.map((tech) => {
            const IconComponent = tech.icon;
            const currentValue = techData.length > 0 ? 75 : evolutionData[evolutionData.length - 1][tech.key as keyof TechData] as number;
            
            return (
              <div key={tech.key} className="p-3 sm:p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" style={{ color: tech.color }} />
                    <span className="font-medium text-xs sm:text-sm truncate">{tech.name}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs"
                      style={{ borderColor: tech.color, color: tech.color }}
                    >
                      {tech.growth}
                    </Badge>
                    <span className="text-xs sm:text-sm font-bold">{currentValue}%</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                    <div
                      className="h-1.5 sm:h-2 rounded-full transition-all duration-1000 cyber-glow"
                      style={{
                        width: `${currentValue}%`,
                        backgroundColor: tech.color,
                      }}
                    ></div>
                  </div>
                  
                  {currentValue > 80 && (
                    <div
                      className="absolute top-0 h-1.5 sm:h-2 rounded-full animate-pulse opacity-50"
                      style={{
                        width: `${currentValue}%`,
                        backgroundColor: tech.color,
                      }}
                    ></div>
                  )}
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Maturidade</span>
                  <span>{currentValue > 80 ? 'Avançada' : currentValue > 60 ? 'Emergente' : 'Inicial'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};