import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TrendingUp, Users, Zap, AlertTriangle, Building2 } from "lucide-react";
import { LocalMarketDetails } from "./LocalMarketDetails";

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

const localMarketData: LocalMarketItem[] = [
  {
    id: "1",
    type: "competitor",
    title: "Topnet Domina São Bernardo do Campo",
    description: "Topnet lidera ranking com 573Mbps médios em São Bernardo do Campo, estabelecendo novo padrão de qualidade na região da Athon Telecom.",
    impact: "high",
    urgency: 85,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    source: "MinhaConexao.com.br"
  },
  {
    id: "2",
    type: "competitor",
    title: "K2 Network - Expansão no Grajaú",
    description: "K2 Network intensifica marketing no Grajaú como 'Internet 100% Fibra mais rápida', ameaçando posição da Athon na região sul.",
    impact: "high",
    urgency: 80,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    source: "Análise Competitiva"
  },
  {
    id: "3",
    type: "competitor",
    title: "Fibercom - Preços Agressivos Franco da Rocha",
    description: "Fibercom oferece planos a partir de R$ 120/mês em Franco da Rocha, pressionando margens na região norte da Grande SP.",
    impact: "medium",
    urgency: 75,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    source: "Monitoramento de Preços"
  },
  {
    id: "4",
    type: "threat",
    title: "Claro Fibra - Entrada Disruptiva ABC",
    description: "Claro acelera expansão da fibra óptica em São Bernardo do Campo com planos a partir de R$ 49,90, potencial guerra de preços iminente.",
    impact: "high",
    urgency: 90,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    source: "Intel. Mercado"
  },
  {
    id: "5",
    type: "opportunity",
    title: "Demanda Corporativa - SBC Industrial",
    description: "Empresas do polo industrial de São Bernardo aumentam demanda por soluções dedicadas. Mercedes-Benz e Scania modernizando infraestrutura.",
    impact: "high",
    urgency: 70,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    source: "Análise Setorial"
  },
  {
    id: "6",
    type: "regulation",
    title: "Prefeitura SBC - Facilitação para Fibra",
    description: "Prefeitura de São Bernardo do Campo simplifica processos para instalação de fibra óptica, reduzindo tempo de licenciamento em 40%.",
    impact: "medium",
    urgency: 60,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    source: "Diário Oficial SBC"
  },
  {
    id: "7",
    type: "opportunity",
    title: "Expansão Residencial - Grajaú",
    description: "Crescimento habitacional no Grajaú com novos condomínios residenciais. Oportunidade para parcerias estratégicas com construtoras.",
    impact: "medium",
    urgency: 65,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    source: "Setor Imobiliário"
  },
  {
    id: "8",
    type: "threat",
    title: "Net Virtua - Pressão Franco da Rocha", 
    description: "Net Virtua intensifica marketing em Franco da Rocha com promoções agressivas, mirando base de clientes residenciais da Athon.",
    impact: "medium",
    urgency: 72,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    source: "Monitoramento Competitivo"
  },
  {
    id: "9",
    type: "opportunity",
    title: "5G Corporate - Todas as Regiões",
    description: "Demanda crescente por soluções 5G corporativas em São Bernardo, Grajaú e Franco da Rocha. Athon bem posicionada com infraestrutura existente.",
    impact: "high",
    urgency: 68,
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
    source: "Análise de Mercado"
  },
  {
    id: "10",
    type: "regulation",
    title: "ANATEL - Expansão Rural Franco da Rocha",
    description: "Edital ANATEL para expansão de banda larga rural favorece Franco da Rocha. Athon pode participar de programas de incentivo governamental.",
    impact: "medium",
    urgency: 58,
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
    source: "ANATEL"
  }
];

export const LocalMarketData = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "competitor": return Users;
      case "regulation": return Building2;
      case "opportunity": return TrendingUp;
      case "threat": return AlertTriangle;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "competitor": return "text-blue-400";
      case "regulation": return "text-purple-400";
      case "opportunity": return "text-green-400";
      case "threat": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getImpactVariant = (impact: string) => {
    switch (impact) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const filteredData = activeTab === "all" 
    ? localMarketData 
    : localMarketData.filter(item => item.type === activeTab);

  const sortedData = filteredData.sort((a, b) => b.urgency - a.urgency);

  return (
    <Card className="p-4 sm:p-6 h-full flex flex-col border-primary/20 cyber-glow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary pulse-glow" />
          <h2 className="text-base sm:text-xl font-semibold">Mercado Local</h2>
        </div>
        <Badge variant="outline" className="text-xs w-fit sm:ml-auto">
          SBC • Grajaú • Franco da Rocha
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1 min-h-0">
        <TabsList className="grid w-full grid-cols-5 mb-4 h-8">
          <TabsTrigger value="all" className="text-xs px-2">Todos</TabsTrigger>
          <TabsTrigger value="competitor" className="text-xs px-1">Concorrentes</TabsTrigger>
          <TabsTrigger value="threat" className="text-xs px-2">Ameaças</TabsTrigger>
          <TabsTrigger value="opportunity" className="text-xs px-1">Oportunidades</TabsTrigger>
          <TabsTrigger value="regulation" className="text-xs px-2">Regulação</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3 flex-1 min-h-0">
          <div className="space-y-3">
            {sortedData.slice(0, 4).map((item) => {
              const IconComponent = getTypeIcon(item.type);
              const iconColor = getTypeColor(item.type);
              
              return (
                <Card key={item.id} className="p-3 border-l-4 border-l-primary/20 hover:border-l-primary/60 transition-all">
                  <div className="flex items-start gap-3">
                    <IconComponent className={`h-4 w-4 mt-1 flex-shrink-0 ${iconColor}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-sm truncate">{item.title}</h3>
                        <Badge variant={getImpactVariant(item.impact)} className="text-xs flex-shrink-0">
                          {item.impact}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
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
                    <div className="flex flex-col gap-2 items-end flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs font-mono text-primary">{item.urgency}</span>
                      </div>
                      <LocalMarketDetails 
                        item={item}
                        trigger={
                          <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-6 hover:bg-primary/10">
                            Detalhes
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {sortedData.length > 4 && (
            <div className="flex justify-center pt-4 mt-auto">
              <Button variant="outline" className="w-full h-8 text-xs cyber-glow">
                Ver Mais ({sortedData.length - 4} itens)
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};