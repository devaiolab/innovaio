import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, TrendingUp, AlertTriangle, MapPin, Zap } from "lucide-react";
import { ReactNode } from "react";
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

interface LocalMarketDialogProps {
  items: LocalMarketItem[];
  trigger: ReactNode;
}

export const LocalMarketDialog = ({ items, trigger }: LocalMarketDialogProps) => {
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "competitor":
        return "Concorrentes";
      case "regulation":
        return "Regulação";
      case "opportunity":
        return "Oportunidades";
      case "threat":
        return "Ameaças";
      default:
        return "Todos";
    }
  };

  const sortedItems = items.sort((a, b) => b.urgency - a.urgency);
  const competitors = items.filter(item => item.type === "competitor");
  const threats = items.filter(item => item.type === "threat");
  const opportunities = items.filter(item => item.type === "opportunity");
  const regulations = items.filter(item => item.type === "regulation");

  const renderItems = (itemsList: LocalMarketItem[]) => (
    <div className="space-y-3">
      {itemsList.map((item) => {
        const IconComponent = getTypeIcon(item.type);
        const iconColor = getTypeColor(item.type);
        
        return (
          <Card key={item.id} className="p-3 border-l-4 border-l-primary/20 hover:border-l-primary/60 transition-all">
            <div className="flex items-start gap-3">
              <IconComponent className={`h-4 w-4 mt-1 flex-shrink-0 ${iconColor}`} fill="none" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-sm truncate">{item.title}</h3>
                  <Badge variant={getImpactVariant(item.impact)} className="text-xs flex-shrink-0">
                    {item.impact}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-3 leading-relaxed">
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
                  <Zap className="h-3 w-3 text-yellow-400" fill="none" />
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
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Mercado Local - Análise Completa
            <Badge variant="outline" className="ml-auto text-xs">
              SBC • Grajaú • Franco da Rocha
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todos ({items.length})</TabsTrigger>
            <TabsTrigger value="competitor">Concorrentes ({competitors.length})</TabsTrigger>
            <TabsTrigger value="threat">Ameaças ({threats.length})</TabsTrigger>
            <TabsTrigger value="opportunity">Oportunidades ({opportunities.length})</TabsTrigger>
            <TabsTrigger value="regulation">Regulação ({regulations.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Todas as Notícias</h3>
              <Badge variant="secondary">{items.length} itens</Badge>
            </div>
            {renderItems(sortedItems)}
          </TabsContent>

          <TabsContent value="competitor" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-400">Concorrentes</h3>
              <Badge variant="secondary">{competitors.length} itens</Badge>
            </div>
            {renderItems(competitors.sort((a, b) => b.urgency - a.urgency))}
          </TabsContent>

          <TabsContent value="threat" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-red-400">Ameaças</h3>
              <Badge variant="secondary">{threats.length} itens</Badge>
            </div>
            {renderItems(threats.sort((a, b) => b.urgency - a.urgency))}
          </TabsContent>

          <TabsContent value="opportunity" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-400">Oportunidades</h3>
              <Badge variant="secondary">{opportunities.length} itens</Badge>
            </div>
            {renderItems(opportunities.sort((a, b) => b.urgency - a.urgency))}
          </TabsContent>

          <TabsContent value="regulation" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-400">Regulação</h3>
              <Badge variant="secondary">{regulations.length} itens</Badge>
            </div>
            {renderItems(regulations.sort((a, b) => b.urgency - a.urgency))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};