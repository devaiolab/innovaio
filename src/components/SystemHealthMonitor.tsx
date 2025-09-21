// System Health Monitor Component
// Displays real-time system health and data source status

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Wifi, 
  WifiOff,
  Zap,
  BarChart3
} from "lucide-react";
import { realTimeMonitor, type HealthStatus } from "@/services/realTimeMonitor";
import { toast } from "sonner";

export const SystemHealthMonitor = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus[]>([]);
  const [monitoringStats, setMonitoringStats] = useState<any>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Load initial data
    loadMonitoringData();

    // Set up periodic updates
    const interval = setInterval(() => {
      loadMonitoringData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadMonitoringData = async () => {
    try {
      const [status, stats] = await Promise.all([
        Promise.resolve(realTimeMonitor.getHealthStatus()),
        realTimeMonitor.getMonitoringStats()
      ]);

      setHealthStatus(status);
      setMonitoringStats(stats);
      setIsMonitoring(stats.isMonitoring);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading monitoring data:', error);
      toast.error('Erro ao carregar dados de monitoramento');
    }
  };

  const handleStartMonitoring = async () => {
    try {
      await realTimeMonitor.startMonitoring();
      setIsMonitoring(true);
      toast.success('🔍 Monitoramento em tempo real iniciado');
      loadMonitoringData();
    } catch (error) {
      console.error('Error starting monitoring:', error);
      toast.error('Erro ao iniciar monitoramento');
    }
  };

  const handleStopMonitoring = () => {
    realTimeMonitor.stopMonitoring();
    setIsMonitoring(false);
    toast.info('🛑 Monitoramento em tempo real parado');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-destructive" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Wifi className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-success border-success';
      case 'offline':
        return 'text-destructive border-destructive';
      case 'degraded':
        return 'text-warning border-warning';
      default:
        return 'text-muted-foreground border-muted-foreground';
    }
  };

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <Card className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Status do Sistema</h3>
          {isMonitoring && (
            <Badge variant="outline" className="border-success text-success">
              <Activity className="h-3 w-3 mr-1" />
              Ativo
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
          </span>
          {!isMonitoring ? (
            <Button 
              size="sm" 
              onClick={handleStartMonitoring}
              className="h-8 text-xs"
            >
              <Zap className="h-3 w-3 mr-1" />
              Iniciar
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleStopMonitoring}
              className="h-8 text-xs"
            >
              Parar
            </Button>
          )}
        </div>
      </div>

      {/* Overall Stats */}
      {monitoringStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-success">
              {monitoringStats.uptime}%
            </div>
            <div className="text-xs text-muted-foreground">Disponibilidade</div>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-primary">
              {formatResponseTime(monitoringStats.avgResponseTime)}
            </div>
            <div className="text-xs text-muted-foreground">Tempo Médio</div>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-success">
              {monitoringStats.onlineChecks}
            </div>
            <div className="text-xs text-muted-foreground">Online</div>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-destructive">
              {monitoringStats.offlineChecks}
            </div>
            <div className="text-xs text-muted-foreground">Offline</div>
          </Card>
        </div>
      )}

      {/* Individual Source Status */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Status das Fontes de Dados
        </h4>
        
        {healthStatus.length > 0 ? (
          <div className="space-y-2">
            {healthStatus.map((source) => (
              <Card key={source.source} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(source.status)}
                    <span className="font-medium text-sm">{source.source}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(source.status)}`}
                    >
                      {source.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatResponseTime(source.responseTime)}
                  </div>
                </div>
                
                {/* Response Time Bar */}
                <div className="mt-2">
                  <Progress 
                    value={Math.min((source.responseTime / 5000) * 100, 100)} 
                    className="h-1"
                  />
                </div>
                
                {/* Error Message */}
                {source.errorMessage && (
                  <div className="mt-2 text-xs text-destructive">
                    {source.errorMessage}
                  </div>
                )}
                
                <div className="mt-1 text-xs text-muted-foreground">
                  Última verificação: {source.lastCheck.toLocaleTimeString('pt-BR')}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Database className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {isMonitoring ? 'Carregando status das fontes...' : 'Monitoramento inativo'}
            </p>
            {!isMonitoring && (
              <p className="text-xs mt-1">
                Clique em "Iniciar" para ativar o monitoramento
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {isMonitoring && (
        <div className="flex items-center gap-2 pt-2 border-t">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={loadMonitoringData}
            className="h-8 text-xs"
          >
            Atualizar Agora
          </Button>
          <span className="text-xs text-muted-foreground">
            Próxima atualização automática em 30s
          </span>
        </div>
      )}
    </Card>
  );
};