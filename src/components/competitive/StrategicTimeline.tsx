import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Users, DollarSign, FileText } from "lucide-react";
import { useState } from "react";

interface TimelineEvent {
  id: string;
  date: string;
  company: string;
  type: "aquisicao" | "investimento" | "patente" | "produto" | "parceria";
  title: string;
  description: string;
  impact: number;
  value?: number;
  sector: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2024-01-15",
    company: "TechCorp Alpha",
    type: "aquisicao",
    title: "Aquisição da StartupX",
    description: "Compra da startup de IA conversacional por $500M, fortalecendo posição no mercado de chatbots empresariais.",
    impact: 85,
    value: 500,
    sector: "IA Generativa"
  },
  {
    id: "2",
    date: "2024-01-22",
    company: "Quantum Dynamics",
    type: "patente",
    title: "Breakthrough em Correção de Erros",
    description: "Registro de patente revolucionária para correção de erros quânticos, reduzindo taxa de erro em 99.9%.",
    impact: 92,
    sector: "Computação Quântica"
  },
  {
    id: "3",
    date: "2024-02-01",
    company: "BioInnovate Labs",
    type: "produto",
    title: "Aprovação FDA para Terapia Genética",
    description: "Primeira terapia genética aprovada para tratamento de doenças raras, mercado potencial de $2B.",
    impact: 78,
    value: 2000,
    sector: "Biotecnologia"
  },
  {
    id: "4",
    date: "2024-02-10",
    company: "CyberShield Inc",
    type: "investimento",
    title: "Série C de $300M",
    description: "Rodada liderada por governo americano para desenvolvimento de IA de cibersegurança nacional.",
    impact: 71,
    value: 300,
    sector: "Cibersegurança"
  },
  {
    id: "5",
    date: "2024-02-18",
    company: "NanoTech Solutions",
    type: "parceria",
    title: "Joint Venture com Intel",
    description: "Parceria estratégica para desenvolver chips quânticos de próxima geração com arquitetura híbrida.",
    impact: 88,
    sector: "Nanotecnologia"
  },
  {
    id: "6",
    date: "2024-02-25",
    company: "GreenEnergy Co",
    type: "produto",
    title: "Maior Parque Solar das Américas",
    description: "Inauguração de complexo solar de 2GW com tecnologia de armazenamento avançado.",
    impact: 65,
    value: 1800,
    sector: "Energia Limpa"
  }
];

export const StrategicTimeline = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const eventTypes = [
    { key: "all", label: "Todos", icon: Clock },
    { key: "aquisicao", label: "Aquisições", icon: Users },
    { key: "investimento", label: "Investimentos", icon: DollarSign },
    { key: "patente", label: "Patentes", icon: FileText },
    { key: "produto", label: "Produtos", icon: TrendingUp },
    { key: "parceria", label: "Parcerias", icon: Users },
  ];

  const filteredEvents = selectedType === "all" 
    ? timelineEvents 
    : timelineEvents.filter(e => e.type === selectedType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "aquisicao": return "border-destructive text-destructive bg-destructive/10";
      case "investimento": return "border-success text-success bg-success/10";
      case "patente": return "border-warning text-warning bg-warning/10";
      case "produto": return "border-primary text-primary bg-primary/10";
      case "parceria": return "border-accent text-accent bg-accent/10";
      default: return "border-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "aquisicao": return Users;
      case "investimento": return DollarSign;
      case "patente": return FileText;
      case "produto": return TrendingUp;
      case "parceria": return Users;
      default: return Clock;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 85) return "text-destructive";
    if (impact >= 70) return "text-warning";
    return "text-success";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold gradient-text">Timeline Estratégica</h2>
          <Badge variant="outline" className="border-warning text-warning">
            ÚLTIMOS 30 DIAS
          </Badge>
        </div>
        <div className="flex gap-1 flex-wrap">
          {eventTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Button
                key={type.key}
                variant={selectedType === type.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.key)}
                className="cyber-glow"
              >
                <IconComponent className="h-3 w-3 mr-1" />
                {type.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-50"></div>
        
        <div className="space-y-6">
          {filteredEvents
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((event, index) => {
              const TypeIcon = getTypeIcon(event.type);
              const isSelected = selectedEvent === event.id;
              
              return (
                <div
                  key={event.id}
                  className={`relative flex items-start gap-6 cursor-pointer transition-all duration-300 ${
                    isSelected ? "bg-primary/5 -mx-4 px-4 py-4 rounded-lg border border-primary" : ""
                  }`}
                  onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                >
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-primary bg-primary/20 cyber-glow" : "border-border bg-background"
                    }`}>
                      <TypeIcon className="h-5 w-5 text-primary" />
                    </div>
                    {index < filteredEvents.length - 1 && (
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary/50 to-transparent"></div>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-muted-foreground font-mono">
                        {formatDate(event.date)}
                      </span>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type.toUpperCase()}
                      </Badge>
                      <div className={`text-sm font-bold ${getImpactColor(event.impact)}`}>
                        Impacto: {event.impact}%
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.company} • {event.sector}</p>
                    </div>
                    
                    <p className="text-sm leading-relaxed mb-3">{event.description}</p>
                    
                    {event.value && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          ${event.value}M
                        </span>
                      </div>
                    )}

                    {/* Impact Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Impacto Estratégico</span>
                        <span>{event.impact}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            event.impact >= 85 ? "bg-destructive" :
                            event.impact >= 70 ? "bg-warning" : "bg-success"
                          }`}
                          style={{ width: `${event.impact}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">Nenhum evento encontrado para o filtro selecionado.</p>
          </div>
        )}
      </div>
    </Card>
  );
};