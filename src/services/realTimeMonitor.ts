// Real-time monitoring service for INNOVAIO system
// Monitors external APIs, system health, and data sources

import { supabase } from "@/integrations/supabase/client";
import { dataService } from "./dataService";

interface MonitoringConfig {
  interval: number; // milliseconds
  sources: string[];
  alertThresholds: {
    responseTime: number;
    errorRate: number;
  };
}

interface HealthStatus {
  source: string;
  status: 'online' | 'offline' | 'degraded';
  responseTime: number;
  lastCheck: Date;
  errorMessage?: string;
}

class RealTimeMonitor {
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private healthStatuses: Map<string, HealthStatus> = new Map();
  
  private config: MonitoringConfig = {
    interval: 60000, // 1 minute
    sources: ['IBGE', 'Banco Central', 'ANATEL'],
    alertThresholds: {
      responseTime: 5000, // 5 seconds
      errorRate: 0.1 // 10%
    }
  };

  // Start real-time monitoring
  async startMonitoring(): Promise<void> {
    if (this.isMonitoring) {
      console.log('⚠️ Monitoring already active');
      return;
    }

    console.log('🔍 Iniciando monitoramento em tempo real...');
    this.isMonitoring = true;

    // Initial health check
    await this.performHealthCheck();

    // Set up recurring health checks
    this.monitoringInterval = setInterval(async () => {
      await this.performHealthCheck();
    }, this.config.interval);

    // Save monitoring start to database
    await this.logSystemMetric('monitoring_status', 1, 'boolean', 'Sistema de monitoramento iniciado');
  }

  // Stop monitoring
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    this.isMonitoring = false;
    console.log('🛑 Monitoramento em tempo real parado');
  }

  // Perform comprehensive health check
  private async performHealthCheck(): Promise<void> {
    console.log('📊 Executando verificação de saúde dos sistemas...');

    const sources = [
      { name: 'IBGE SIDRA', endpoint: 'https://apisidra.ibge.gov.br' },
      { name: 'Banco Central', endpoint: 'https://api.bcb.gov.br' },
      { name: 'ANATEL', endpoint: 'https://www.anatel.gov.br' }
    ];

    for (const source of sources) {
      const startTime = Date.now();
      let status: HealthStatus;

      try {
        const response = await fetch(source.endpoint, { 
          method: 'HEAD'
        });
        
        const responseTime = Date.now() - startTime;
        
        status = {
          source: source.name,
          status: response.ok ? 'online' : 'degraded',
          responseTime,
          lastCheck: new Date()
        };

        if (responseTime > this.config.alertThresholds.responseTime) {
          status.status = 'degraded';
          status.errorMessage = `Alto tempo de resposta: ${responseTime}ms`;
        }

      } catch (error) {
        const responseTime = Date.now() - startTime;
        
        status = {
          source: source.name,
          status: 'offline',
          responseTime,
          lastCheck: new Date(),
          errorMessage: `Erro de conexão: ${error}`
        };
      }

      // Update local status
      this.healthStatuses.set(source.name, status);

      // Save to database
      await this.saveDataSourceStatus(source.name, source.endpoint, status);

      // Log metrics
      await this.logSystemMetric(
        `${source.name.toLowerCase().replace(' ', '_')}_response_time`,
        status.responseTime,
        'milliseconds',
        `Tempo de resposta da API ${source.name}`
      );
    }

    // Check for critical issues and generate alerts
    await this.checkForCriticalIssues();
  }

  // Save data source status to database
  private async saveDataSourceStatus(sourceName: string, endpoint: string, status: HealthStatus): Promise<void> {
    try {
      const { error } = await supabase
        .from('data_sources_status')
        .insert({
          source_name: sourceName,
          endpoint: endpoint,
          status: status.status,
          response_time_ms: status.responseTime,
          last_check: status.lastCheck.toISOString(),
          error_message: status.errorMessage,
          metadata: {
            threshold_response_time: this.config.alertThresholds.responseTime,
            monitoring_interval: this.config.interval
          }
        });

      if (error) {
        console.error('Error saving data source status:', error);
      }
    } catch (error) {
      console.error('Database error in saveDataSourceStatus:', error);
    }
  }

  // Log system metrics to database
  private async logSystemMetric(metricName: string, value: number, unit: string, description: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('system_metrics')
        .insert({
          metric_name: metricName,
          metric_value: value,
          metric_unit: unit,
          source: 'RealTimeMonitor',
          timestamp: new Date().toISOString(),
          metadata: { description }
        });

      if (error) {
        console.error('Error logging system metric:', error);
      }
    } catch (error) {
      console.error('Database error in logSystemMetric:', error);
    }
  }

  // Check for critical issues and generate alerts
  private async checkForCriticalIssues(): Promise<void> {
    const offlineSources = Array.from(this.healthStatuses.values())
      .filter(status => status.status === 'offline');

    const degradedSources = Array.from(this.healthStatuses.values())
      .filter(status => status.status === 'degraded');

    if (offlineSources.length > 0) {
      console.warn('🚨 ALERTA CRÍTICO: Fontes de dados offline:', offlineSources);
      
      // Log critical alert
      await this.logSystemMetric(
        'critical_sources_offline',
        offlineSources.length,
        'count',
        `Fontes de dados críticas offline: ${offlineSources.map(s => s.source).join(', ')}`
      );
    }

    if (degradedSources.length > 0) {
      console.warn('⚠️ ALERTA: Fontes de dados com performance degradada:', degradedSources);
      
      // Log warning alert
      await this.logSystemMetric(
        'degraded_sources',
        degradedSources.length,
        'count',
        `Fontes com performance degradada: ${degradedSources.map(s => s.source).join(', ')}`
      );
    }
  }

  // Get current health status
  getHealthStatus(): HealthStatus[] {
    return Array.from(this.healthStatuses.values());
  }

  // Get system metrics from database
  async getSystemMetrics(metricName?: string, hours: number = 24): Promise<any[]> {
    try {
      const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
      
      let query = supabase
        .from('system_metrics')
        .select('*')
        .gte('timestamp', since)
        .order('timestamp', { ascending: false });

      if (metricName) {
        query = query.eq('metric_name', metricName);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching system metrics:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error in getSystemMetrics:', error);
      return [];
    }
  }

  // Monitor specific alerts
  async monitorAlert(alertId: string): Promise<void> {
    console.log(`🎯 Iniciando monitoramento específico para alerta: ${alertId}`);
    
    // Enhanced monitoring for this specific alert
    const enhancedInterval = setInterval(async () => {
      // Perform more frequent checks for this alert
      await this.performTargetedHealthCheck(alertId);
    }, 15000); // Every 15 seconds

    // Stop enhanced monitoring after 1 hour
    setTimeout(() => {
      clearInterval(enhancedInterval);
      console.log(`⏰ Monitoramento específico finalizado para alerta: ${alertId}`);
    }, 3600000); // 1 hour

    // Log the start of targeted monitoring
    await this.logSystemMetric(
      'targeted_monitoring_started',
      1,
      'boolean',
      `Monitoramento específico iniciado para alerta ${alertId}`
    );
  }

  // Perform targeted health check for specific alert
  private async performTargetedHealthCheck(alertId: string): Promise<void> {
    // This would include more specific checks based on the alert type
    // For now, we'll log that targeted monitoring is active
    await this.logSystemMetric(
      'targeted_monitoring_check',
      1,
      'count',
      `Verificação específica para alerta ${alertId}`
    );
  }

  // Get monitoring statistics
  async getMonitoringStats(): Promise<any> {
    try {
      // Get recent health status from database
      const { data: recentStatus } = await supabase
        .from('data_sources_status')
        .select('*')
        .gte('last_check', new Date(Date.now() - 60 * 60 * 1000).toISOString()) // Last hour
        .order('last_check', { ascending: false });

      // Calculate statistics
      const totalChecks = recentStatus?.length || 0;
      const onlineChecks = recentStatus?.filter(s => s.status === 'online').length || 0;
      const offlineChecks = recentStatus?.filter(s => s.status === 'offline').length || 0;
      const degradedChecks = recentStatus?.filter(s => s.status === 'degraded').length || 0;

      const uptime = totalChecks > 0 ? ((onlineChecks + degradedChecks) / totalChecks) * 100 : 0;
      const avgResponseTime = recentStatus?.reduce((acc, s) => acc + (s.response_time_ms || 0), 0) / totalChecks || 0;

      return {
        totalChecks,
        onlineChecks,
        offlineChecks,
        degradedChecks,
        uptime: uptime.toFixed(2),
        avgResponseTime: Math.round(avgResponseTime),
        isMonitoring: this.isMonitoring,
        lastUpdate: new Date()
      };
    } catch (error) {
      console.error('Error getting monitoring stats:', error);
      return {
        totalChecks: 0,
        onlineChecks: 0,
        offlineChecks: 0,
        degradedChecks: 0,
        uptime: '0.00',
        avgResponseTime: 0,
        isMonitoring: this.isMonitoring,
        lastUpdate: new Date()
      };
    }
  }
}

export const realTimeMonitor = new RealTimeMonitor();
export type { HealthStatus, MonitoringConfig };