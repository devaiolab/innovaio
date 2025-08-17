import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, TrendingUp, AlertTriangle, Clock, BarChart3, MapPin, Zap } from "lucide-react";
import { ReactNode } from "react";

interface AlertData {
  id: string;
  type: "blue" | "yellow" | "red";
  title: string;
  description: string;
  region: string;
  urgency: number;
  timestamp: Date;
}

interface GlobalPulseDetailsProps {
  alerts: AlertData[];
  trigger: ReactNode;
}

export const GlobalPulseDetails = ({ alerts, trigger }: GlobalPulseDetailsProps) => {
  const criticalCount = alerts.filter(a => a.type === "red").length;
  const alertCount = alerts.filter(a => a.type === "yellow").length;
  const signalCount = alerts.filter(a => a.type === "blue").length;

  const globalIntensity = Math.round(
    alerts.reduce((acc, alert) => acc + alert.urgency, 0) / alerts.length
  );

  // Regional analysis
  const regions = [...new Set(alerts.map(a => a.region))];
  const regionalAnalysis = regions.map(region => {
    const regionAlerts = alerts.filter(a => a.region === region);
    const avgIntensity = Math.round(
      regionAlerts.reduce((acc, alert) => acc + alert.urgency, 0) / regionAlerts.length
    );
    return {
      region,
      count: regionAlerts.length,
      intensity: avgIntensity,
      critical: regionAlerts.filter(a => a.type === "red").length
    };
  }).sort((a, b) => b.intensity - a.intensity);

  // Historical trends (mock data)
  const historicalData = [
    { time: "00:00", intensity: 45, alerts: 12 },
    { time: "04:00", intensity: 38, alerts: 8 },
    { time: "08:00", intensity: 62, alerts: 18 },
    { time: "12:00", intensity: 78, alerts: 24 },
    { time: "16:00", intensity: globalIntensity, alerts: alerts.length },
    { time: "20:00", intensity: 71, alerts: 22 }
  ];

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 85) return "text-destructive";
    if (intensity >= 70) return "text-warning";
    if (intensity >= 50) return "text-primary";
    return "text-success";
  };

  const getIntensityBg = (intensity: number) => {
    if (intensity >= 85) return "bg-destructive/10";
    if (intensity >= 70) return "bg-warning/10";
    if (intensity >= 50) return "bg-primary/10";
    return "bg-success/10";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Análise Completa do Status Global
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="regions">Análise Regional</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
            <TabsTrigger value="forecast">Projeções</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{alerts.length}</div>
                <div className="text-sm text-muted-foreground">Total de Pulsos</div>
              </Card>
              <Card className="p-4 text-center">
                <div className={`text-2xl font-bold ${getIntensityColor(globalIntensity)}`}>
                  {globalIntensity}%
                </div>
                <div className="text-sm text-muted-foreground">Intensidade Global</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
                <div className="text-sm text-muted-foreground">Alertas Críticos</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{regions.length}</div>
                <div className="text-sm text-muted-foreground">Regiões Ativas</div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Distribuição por Severidade</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-destructive"></div>
                    <span>Críticos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{criticalCount}</span>
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-destructive" 
                        style={{ width: `${(criticalCount / alerts.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-warning"></div>
                    <span>Alertas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{alertCount}</span>
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-warning" 
                        style={{ width: `${(alertCount / alerts.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary"></div>
                    <span>Sinais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{signalCount}</span>
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary" 
                        style={{ width: `${(signalCount / alerts.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <div className="grid gap-3">
              {regionalAnalysis.map((region) => (
                <Card key={region.region} className={`p-4 ${getIntensityBg(region.intensity)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <h3 className="font-semibold">{region.region}</h3>
                    </div>
                    <Badge variant="outline" className={getIntensityColor(region.intensity)}>
                      {region.intensity}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Total</div>
                      <div className="font-semibold">{region.count}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Críticos</div>
                      <div className="font-semibold text-destructive">{region.critical}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Risco</div>
                      <div className={`font-semibold ${getIntensityColor(region.intensity)}`}>
                        {region.intensity >= 85 ? "ALTO" : region.intensity >= 70 ? "MÉDIO" : "BAIXO"}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Intensidade nas Últimas 24h
              </h3>
              <div className="space-y-2">
                {historicalData.map((data, index) => (
                  <div key={data.time} className="flex items-center justify-between">
                    <span className="font-mono text-sm">{data.time}</span>
                    <div className="flex items-center gap-2 flex-1 mx-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            data.intensity >= 85 ? 'bg-destructive' :
                            data.intensity >= 70 ? 'bg-warning' :
                            data.intensity >= 50 ? 'bg-primary' : 'bg-success'
                          }`}
                          style={{ width: `${data.intensity}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className={`font-semibold text-sm ${getIntensityColor(data.intensity)}`}>
                      {data.intensity}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Projeções para as Próximas 6h
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="font-semibold text-warning">Alerta de Tendência</span>
                  </div>
                  <p className="text-sm">Intensidade pode aumentar 15-20% nas próximas 3-4 horas devido a concentração de eventos críticos.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">~{globalIntensity + 18}%</div>
                    <div className="text-sm text-muted-foreground">Pico Projetado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2.5h</div>
                    <div className="text-sm text-muted-foreground">Tempo até Pico</div>
                  </div>
                </div>

                <div className="p-3 rounded bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Recomendação Operacional</span>
                  </div>
                  <p className="text-sm">Ativar protocolo de monitoramento intensivo e preparar equipes de resposta para cenários de alta criticidade.</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};