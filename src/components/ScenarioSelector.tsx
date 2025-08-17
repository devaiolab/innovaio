import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Zap, Target, AlertTriangle, Shield, TrendingDown, TrendingUp, Activity } from "lucide-react";

interface ScenarioSelectorProps {
  scenarios: Record<string, any>;
  onStartScenario: (scenarioId: string, intensity: "low" | "medium" | "high") => void;
  trigger: React.ReactNode;
}

export const ScenarioSelector = ({ scenarios, onStartScenario, trigger }: ScenarioSelectorProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string>("");
  const [selectedIntensity, setSelectedIntensity] = useState<"low" | "medium" | "high">("medium");
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "competition": return Target;
      case "regulation": return AlertTriangle;
      case "technology": return Zap;
      case "security": return Shield;
      default: return Activity;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "competition": return "border-destructive text-destructive bg-destructive/10";
      case "regulation": return "border-warning text-warning bg-warning/10";
      case "technology": return "border-primary text-primary bg-primary/10";
      case "security": return "border-accent text-accent bg-accent/10";
      default: return "border-muted";
    }
  };

  const getIntensityColor = (intensity: "low" | "medium" | "high") => {
    switch (intensity) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
    }
  };

  const handleStartSimulation = () => {
    if (selectedScenario) {
      onStartScenario(selectedScenario, selectedIntensity);
      setIsOpen(false);
    }
  };

  const selectedScenarioData = selectedScenario ? scenarios[selectedScenario] : null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Seletor de Cenários Estratégicos
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scenario List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Cenários Disponíveis</h3>
            <div className="space-y-3">
              {Object.entries(scenarios).map(([id, scenario]) => {
                const IconComponent = getCategoryIcon(scenario.category);
                const isSelected = selectedScenario === id;
                
                return (
                  <Card
                    key={id}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5 cyber-glow' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedScenario(id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(scenario.category)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm truncate">{scenario.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {scenario.category.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-tight line-clamp-2">
                          {scenario.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">Duração:</span>
                          <span className="text-xs font-medium">{scenario.duration}min</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Configuration & Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Configuração</h3>
            
            {selectedScenarioData && (
              <>
                {/* Intensity Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Intensidade do Cenário</label>
                  <Select value={selectedIntensity} onValueChange={(value: "low" | "medium" | "high") => setSelectedIntensity(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success"></div>
                          <span>Baixa</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warning"></div>
                          <span>Média</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-destructive"></div>
                          <span>Alta</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Impact Preview */}
                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold text-sm mb-3">Impactos Projetados</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Receita:</span>
                      <div className="flex items-center gap-1">
                        {selectedScenarioData.impacts.revenue < 0 ? (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-success" />
                        )}
                        <span className={`text-xs font-medium ${
                          selectedScenarioData.impacts.revenue < 0 ? 'text-destructive' : 'text-success'
                        }`}>
                          {selectedScenarioData.impacts.revenue > 0 ? '+' : ''}{Math.round(selectedScenarioData.impacts.revenue * (
                            selectedIntensity === "low" ? 0.5 : selectedIntensity === "medium" ? 1 : 1.5
                          ))}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Market Share:</span>
                      <div className="flex items-center gap-1">
                        {selectedScenarioData.impacts.market_share < 0 ? (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-success" />
                        )}
                        <span className={`text-xs font-medium ${
                          selectedScenarioData.impacts.market_share < 0 ? 'text-destructive' : 'text-success'
                        }`}>
                          {selectedScenarioData.impacts.market_share > 0 ? '+' : ''}{Math.round(selectedScenarioData.impacts.market_share * (
                            selectedIntensity === "low" ? 0.5 : selectedIntensity === "medium" ? 1 : 1.5
                          ))}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Risco Operacional:</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-warning" />
                        <span className="text-xs font-medium text-warning">
                          +{Math.round(selectedScenarioData.impacts.operational_risk * (
                            selectedIntensity === "low" ? 0.5 : selectedIntensity === "medium" ? 1 : 1.5
                          ))}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Satisfação:</span>
                      <div className="flex items-center gap-1">
                        {selectedScenarioData.impacts.customer_satisfaction < 0 ? (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-success" />
                        )}
                        <span className={`text-xs font-medium ${
                          selectedScenarioData.impacts.customer_satisfaction < 0 ? 'text-destructive' : 'text-success'
                        }`}>
                          {selectedScenarioData.impacts.customer_satisfaction > 0 ? '+' : ''}{Math.round(selectedScenarioData.impacts.customer_satisfaction * (
                            selectedIntensity === "low" ? 0.5 : selectedIntensity === "medium" ? 1 : 1.5
                          ))}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Key Events Preview */}
                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold text-sm mb-3">Principais Eventos</h4>
                  <div className="space-y-2">
                    {selectedScenarioData.alerts.slice(0, 2).map((alert: any, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          alert.type === 'red' ? 'bg-destructive' :
                          alert.type === 'yellow' ? 'bg-warning' : 'bg-primary'
                        }`}></div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium line-clamp-1">{alert.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{alert.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* Action Button */}
            <Button 
              onClick={handleStartSimulation}
              disabled={!selectedScenario}
              className="w-full cyber-glow"
              size="lg"
            >
              <Zap className="h-4 w-4 mr-2" />
              Iniciar Simulação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};