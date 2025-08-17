import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TrendingUp, Users, Zap, AlertTriangle, Building2 } from "lucide-react";

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
    title: "Topnet Domina Velocidade na Região",
    description: "Topnet lidera ranking com 573Mbps médios em São Bernardo do Campo, estabelecendo novo padrão de qualidade na região ABC.",
    impact: "high",
    urgency: 85,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    source: "MinhaConexao.com.br"
  },
  {
    id: "2",
    type: "competitor",
    title: "K2 Network - Expansão Agressiva",
    description: "K2 Network intensifica marketing como 'Internet 100% Fibra mais rápida de São Bernardo', investindo pesadamente em aquisição de clientes.",
    impact: "high",
    urgency: 80,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    source: "Análise Competitiva"
  },
  {
    id: "3",
    type: "competitor",
    title: "Fibercom - Preços Competitivos",
    description: "Fibercom mantém planos a partir de R$ 120/mês, posicionamento agressivo no segmento de entrada do mercado residencial.",
    impact: "medium",
    urgency: 75,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    source: "Monitoramento de Preços"
  },
  {
    id: "4",
    type: "threat",
    title: "Claro Fibra - Entrada Disruptiva",
    description: "Claro acelera expansão da fibra óptica na região ABC com planos a partir de R$ 49,90, potencial guerra de preços iminente.",
    impact: "high",
    urgency: 90,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    source: "Intel. Mercado"
  },
  {
    id: "5",
    type: "opportunity",
    title: "Demanda Corporativa Crescente",
    description: "Empresas na região ABC aumentam demanda por soluções dedicadas e SDWAN. Setor automotivo (Mercedes, Scania) modernizando infraestrutura.",
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
    title: "Parceria com Construtoras Locais",
    description: "Boom imobiliário na região ABC cria oportunidades de parcerias com construtoras para prédios prontos para fibra.",
    impact: "medium",
    urgency: 65,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    source: "Setor Imobiliário"
  },
  {
    id: "8",
    type: "threat",
    title: "Nio Internet - Nova Marca Agressiva", 
    description: "Nio Internet promete preço fixo até janeiro 2028, estratégia de longo prazo pode pressionar margens da concorrência.",
    impact: "medium",
    urgency: 72,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    source: "Monitoramento Competitivo"
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
    <Card className="p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-primary pulse-glow" />
        <h2 className="text-lg sm:text-xl font-semibold">Mercado Local</h2>
        <Badge variant="outline" className="ml-auto">
          São Bernardo do Campo
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
          <TabsTrigger value="competitor" className="text-xs">Concorrentes</TabsTrigger>
          <TabsTrigger value="threat" className="text-xs">Ameaças</TabsTrigger>
          <TabsTrigger value="opportunity" className="text-xs">Oportunidades</TabsTrigger>
          <TabsTrigger value="regulation" className="text-xs">Regulação</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3">
          {sortedData.slice(0, 6).map((item) => {
            const IconComponent = getTypeIcon(item.type);
            const iconColor = getTypeColor(item.type);
            
            return (
              <Card key={item.id} className="p-3 border-l-4 border-l-primary/20 hover:border-l-primary/60 transition-all">
                <div className="flex items-start gap-3">
                  <IconComponent className={`h-4 w-4 mt-1 ${iconColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{item.title}</h3>
                      <Badge variant={getImpactVariant(item.impact)} className="text-xs">
                        {item.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.source}</span>
                      <span className="text-muted-foreground">
                        {item.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs font-mono">{item.urgency}</span>
                  </div>
                </div>
              </Card>
            );
          })}
          
          {sortedData.length > 6 && (
            <Button variant="outline" className="w-full mt-4">
              Ver Mais ({sortedData.length - 6} itens)
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};