import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TrendingUp, Users, Zap, AlertTriangle, Building2 } from "lucide-react";
import { LocalMarketDetails } from "./LocalMarketDetails";
import { LocalMarketDialog } from "./LocalMarketDialog";
import { marketService, LocalMarketAlert } from "@/services/marketService";

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
export const LocalMarketData = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [localMarketData, setLocalMarketData] = useState<LocalMarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // For now, use mock alerts until we implement real-time market alerts
        const alerts = marketService.generateMockAlerts();
        setLocalMarketData(alerts);
      } catch (error) {
        console.error('Error loading market data:', error);
        // Fallback to empty array if there's an error
        setLocalMarketData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "competitor":
        return Users;
      case "regulation":
        return Building2;
      case "opportunity":
        return TrendingUp;
      case "threat":
        return AlertTriangle;
      default:
        return MapPin;
    }
  };
  const getTypeColor = (type: string) => {
    switch (type) {
      case "competitor":
        return "text-blue-400";
      case "regulation":
        return "text-purple-400";
      case "opportunity":
        return "text-green-400";
      case "threat":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
  const getImpactVariant = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };
  const filteredData = activeTab === "all" ? localMarketData : localMarketData.filter(item => item.type === activeTab);
  const sortedData = filteredData.sort((a, b) => b.urgency - a.urgency);

  if (loading) {
    return (
      <div className="p-4 h-[600px] flex items-center justify-center border-primary/20 cyber-glow overflow-hidden bg-card text-card-foreground shadow-sm rounded-lg border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Carregando dados do mercado...</p>
        </div>
      </div>
    );
  }
  return <div className="p-4 h-[600px] flex flex-col border-primary/20 cyber-glow overflow-hidden bg-card text-card-foreground shadow-sm rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" fill="none" />
          <h2 className="text-base sm:text-xl font-semibold">Mercado Local</h2>
        </div>
        <Badge variant="outline" className="text-xs w-fit sm:ml-auto">
          SBC • Grajaú • Franco da Rocha
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1 min-h-0">
        <TabsList className="grid w-full grid-cols-5 mb-4 h-8 py-0">
          <TabsTrigger value="all" className="text-xs px-2">Todos</TabsTrigger>
          <TabsTrigger value="competitor" className="text-xs px-1">Concorrentes</TabsTrigger>
          <TabsTrigger value="threat" className="text-xs px-2">Ameaças</TabsTrigger>
          <TabsTrigger value="opportunity" className="text-xs px-1">Oportunidades</TabsTrigger>
          <TabsTrigger value="regulation" className="text-xs px-2">Regulação</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-2 flex-1 flex flex-col min-h-0">
          <div className="space-y-2 flex-1 overflow-y-auto my-0 py-[4px]">
            {sortedData.slice(0, 3).map((item, index) => {
            const IconComponent = getTypeIcon(item.type);
            const iconColor = getTypeColor(item.type);
            return <Card key={item.id} className="p-3 border-l-4 border-l-primary/20 hover:border-l-primary/60 transition-all py-[16px]">
                  <div className="flex items-start gap-3">
                    <IconComponent className={`h-3 w-3 mt-1 flex-shrink-0 ${iconColor}`} fill="none" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-xs truncate">{item.title}</h3>
                        <Badge variant={getImpactVariant(item.impact)} className="text-xs flex-shrink-0">
                          {item.impact}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground truncate">{item.source}</span>
                        <span className="text-muted-foreground flex-shrink-0 ml-2">
                          {item.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-400" fill="none" />
                        <span className="text-xs font-mono text-primary">{item.urgency}</span>
                      </div>
                      <LocalMarketDetails item={item} trigger={<Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-6 hover:bg-primary/10">
                            Detalhes
                          </Button>} />
                    </div>
                  </div>
                </Card>;
          })}
          </div>
          
          {sortedData.length > 3 && <div className="pt-2 mt-auto">
              <LocalMarketDialog items={sortedData} trigger={<Button variant="outline" className="w-full h-8 text-xs cyber-glow">
                    Ver Mais ({sortedData.length - 3} itens)
                  </Button>} />
            </div>}
        </TabsContent>
      </Tabs>
    </div>;
};