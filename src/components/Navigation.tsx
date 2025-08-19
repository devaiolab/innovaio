import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Swords, 
  Lightbulb, 
  Users, 
  Target, 
  Crosshair,
  ArrowRight,
  Activity
} from "lucide-react";

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: "active" | "updating" | "standby";
  alertCount?: number;
  route: string;
}

const dashboards: DashboardItem[] = [
  {
    id: "panorama",
    title: "Panorama Global",
    description: "Visão geral das tendências tecnológicas mundiais",
    icon: Globe,
    status: "active",
    alertCount: 8,
    route: "/panorama-global",
  },
  {
    id: "guerra-competitiva",
    title: "Guerra Competitiva",
    description: "Análise competitiva e movimentos estratégicos",
    icon: Swords,
    status: "updating",
    alertCount: 3,
    route: "/guerra-competitiva",
  },
  {
    id: "fabrica-inovacao",
    title: "Fábrica de Inovação",
    description: "Pipeline de inovações e oportunidades de P&D",
    icon: Lightbulb,
    status: "active",
    alertCount: 12,
    route: "/fabrica-inovacao",
  },
  {
    id: "observador-social",
    title: "Observador Social",
    description: "Tendências sociais e mudanças comportamentais",
    icon: Users,
    status: "standby",
    route: "/observador-social",
  },
  {
    id: "campo-oportunidades",
    title: "Campo de Oportunidades",
    description: "Mapeamento de oportunidades emergentes",
    icon: Target,
    status: "active",
    alertCount: 5,
    route: "/campo-oportunidades",
  },
  {
    id: "linha-fogo",
    title: "Linha de Fogo",
    description: "Ameaças imediatas e riscos disruptivos",
    icon: Crosshair,
    status: "active",
    alertCount: 2,
    route: "/linha-fogo",
  },
];

export const Navigation = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);
  const navigate = useNavigate();

  const getStatusConfig = (status: DashboardItem["status"]) => {
    switch (status) {
      case "active":
        return { color: "success", label: "ATIVO", pulse: true };
      case "updating":
        return { color: "warning", label: "ATUALIZANDO", pulse: false };
      case "standby":
        return { color: "muted", label: "STANDBY", pulse: false };
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-5 w-5 text-primary" fill="none" />
        <h2 className="text-xl font-semibold">Dashboards Inteligentes</h2>
        <Badge variant="outline" className="ml-auto">
          6 Módulos Disponíveis
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {dashboards.map((dashboard) => {
          const IconComponent = dashboard.icon;
          const statusConfig = getStatusConfig(dashboard.status);

          return (
            <Card
              key={dashboard.id}  
              className={`p-3 sm:p-4 cursor-pointer transition-all hover:scale-[1.02] cyber-glow ${
                selectedDashboard === dashboard.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedDashboard(dashboard.id)}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  {dashboard.alertCount && (
                    <Badge 
                      variant="destructive" 
                      className="text-xs h-5 px-2 min-w-[1.5rem] flex items-center justify-center"
                    >
                      {dashboard.alertCount}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    statusConfig.color === 'success' ? 'bg-success' :
                    statusConfig.color === 'warning' ? 'bg-warning' :
                    'bg-muted-foreground'
                  } ${statusConfig.pulse ? 'pulse-glow' : ''}`} />
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      statusConfig.color === 'success' ? 'border-success text-success' :
                      statusConfig.color === 'warning' ? 'border-warning text-warning' :
                      'border-muted text-muted-foreground'
                    }`}
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>

              <h3 className="font-semibold text-sm sm:text-base mb-2 leading-tight">
                {dashboard.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {dashboard.description}
              </p>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs sm:text-sm group"
                onClick={() => navigate(dashboard.route)}
              >
                <span className="hidden sm:inline">Acessar Dashboard</span>
                <span className="sm:hidden">Acessar</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          );
        })}
      </div>

      {selectedDashboard && (
        <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" fill="none" />
            <span className="text-sm font-semibold text-primary">
              Dashboard Selecionado
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {dashboards.find(d => d.id === selectedDashboard)?.title} está pronto para análise detalhada.
          </p>
        </div>
      )}
    </Card>
  );
};