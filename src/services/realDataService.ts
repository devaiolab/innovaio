import { supabase } from "@/integrations/supabase/client";
import { dataService } from "./dataService";

export interface RealTimeDataConfig {
  autoSync: boolean;
  syncInterval: number; // minutes
  alertThresholds: {
    urgency: number;
    relevance: number;
  };
}

export class RealDataService {
  private config: RealTimeDataConfig = {
    autoSync: true,
    syncInterval: 30, // 30 minutes
    alertThresholds: {
      urgency: 70,
      relevance: 75
    }
  };

  private syncTimer: NodeJS.Timeout | null = null;

  async startAutoSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    // Initial sync
    await this.performFullSync();

    // Set up recurring sync
    this.syncTimer = setInterval(async () => {
      await this.performFullSync();
    }, this.config.syncInterval * 60 * 1000);

    console.log(`✅ Auto-sync started - interval: ${this.config.syncInterval} minutes`);
  }

  stopAutoSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
      console.log('⏹️ Auto-sync stopped');
    }
  }

  async performFullSync() {
    try {
      console.log('🔄 Starting full data sync...');
      
      // Sync external data
      const [marketAlerts, regionalTrends, economicData] = await Promise.all([
        dataService.getMarketAlerts(),
        dataService.getRegionalTrends(),
        dataService.getEconomicIndicators()
      ]);

      // Process and save alerts
      await this.processAndSaveAlerts(marketAlerts);
      
      // Update system metrics
      await this.updateSystemMetrics(regionalTrends, economicData);
      
      // Update data sources status
      await this.updateDataSourcesStatus();

      console.log('✅ Full sync completed');
      return { success: true, timestamp: new Date().toISOString() };
    } catch (error) {
      console.error('❌ Full sync failed:', error);
      return { success: false, error: error.message };
    }
  }

  private async processAndSaveAlerts(alerts: any[]) {
    for (const alert of alerts) {
      // Check if alert already exists
      const { data: existing } = await supabase
        .from('alert_history')
        .select('id')
        .eq('alert_id', alert.id)
        .maybeSingle();

      if (!existing) {
        // Create new alert with correct type mapping
        const alertData = {
          alert_id: alert.id,
          type: this.mapAlertType(alert.type),
          title: alert.title,
          description: alert.description,
          region: alert.region,
          urgency: typeof alert.urgency === 'string' ? 
            this.urgencyToNumber(alert.urgency) : alert.urgency,
          timestamp: alert.timestamp || new Date().toISOString(),
          source: alert.source || 'External API',
          relevance: alert.relevance || 50,
          analysis_data: alert.analysis_data || {}
        };

        const { error } = await supabase
          .from('alert_history')
          .insert([alertData]);

        if (error) {
          console.error('Error saving alert:', error);
        } else {
          console.log(`💾 Saved new alert: ${alert.title}`);
          
          // Auto-generate action plan for high urgency alerts
          if (alertData.urgency >= this.config.alertThresholds.urgency) {
            await this.generateActionPlan(alertData);
          }
        }
      }
    }
  }

  private async updateSystemMetrics(regionalData: any[], economicData: any) {
    const timestamp = new Date().toISOString();
    const metrics = [];

    // Process regional data into metrics
    if (regionalData && regionalData.length > 0) {
      const avgIntensity = regionalData.reduce((sum, region) => sum + region.intensity, 0) / regionalData.length;
      const avgGrowth = regionalData.reduce((sum, region) => sum + region.growth, 0) / regionalData.length;
      const avgConnectivity = regionalData.reduce((sum, region) => sum + (region.connectivity || 0), 0) / regionalData.length;

      metrics.push(
        {
          metric_name: 'regional_tech_intensity',
          metric_value: avgIntensity,
          metric_unit: 'index',
          source: 'Regional Analysis',
          region: 'Nacional',
          timestamp,
          metadata: { sample_size: regionalData.length }
        },
        {
          metric_name: 'regional_growth_rate',
          metric_value: avgGrowth,
          metric_unit: 'percent',
          source: 'Regional Analysis',
          region: 'Nacional',
          timestamp,
          metadata: { trend: avgGrowth > 15 ? 'positive' : 'stable' }
        },
        {
          metric_name: 'connectivity_index',
          metric_value: avgConnectivity,
          metric_unit: 'percent',
          source: 'Regional Analysis',
          region: 'Nacional',
          timestamp,
          metadata: { target: 95, gap: 95 - avgConnectivity }
        }
      );
    }

    // Process economic data into metrics
    if (economicData) {
      if (economicData.selic) {
        metrics.push({
          metric_name: 'selic_rate',
          metric_value: economicData.selic,
          metric_unit: 'percent',
          source: 'Banco Central',
          region: 'Nacional',
          timestamp,
          metadata: { impact_on_tech: economicData.selic > 12 ? 'negative' : 'positive' }
        });
      }

      if (economicData.tech_investment) {
        metrics.push({
          metric_name: 'tech_investment',
          metric_value: economicData.tech_investment,
          metric_unit: 'billion_brl',
          source: 'Economic Indicators',
          region: 'Nacional',
          timestamp,
          metadata: { sector: 'telecommunications' }
        });
      }
    }

    // Save metrics to database
    if (metrics.length > 0) {
      const { error } = await supabase
        .from('system_metrics')
        .insert(metrics);

      if (error) {
        console.error('Error saving system metrics:', error);
      } else {
        console.log(`💾 Saved ${metrics.length} system metrics`);
      }
    }
  }

  private async updateDataSourcesStatus() {
    const sources = await dataService.getDataSourceStatus();
    
    for (const source of sources) {
      const { error } = await supabase
        .from('data_sources_status')
        .upsert({
          source_name: source.name,
          endpoint: source.endpoint,
          status: this.mapSourceStatus(source.status),
          last_check: new Date().toISOString(),
          response_time_ms: source.responseTime,
          error_message: source.error || null,
          metadata: source.metadata || {}
        }, {
          onConflict: 'source_name'
        });

      if (error) {
        console.error('Error updating data source status:', error);
      }
    }
  }

  private async generateActionPlan(alertData: any) {
    try {
      const { actionService } = await import('./actionService');
      await actionService.createDetailedActionPlan(alertData.alert_id, alertData);
      console.log(`🎯 Generated action plan for critical alert: ${alertData.title}`);
    } catch (error) {
      console.error('Error generating action plan:', error);
    }
  }

  private mapAlertType(type: string): string {
    const mapping = {
      'critical': 'red',
      'trending': 'yellow',
      'emerging': 'blue',
      'red': 'red',
      'yellow': 'yellow',
      'blue': 'blue'
    };
    return mapping[type.toLowerCase()] || 'yellow';
  }

  private mapSourceStatus(status: string): string {
    const mapping = {
      'online': 'online',
      'offline': 'degraded',
      'partial': 'degraded',
      'degraded': 'degraded'
    };
    return mapping[status.toLowerCase()] || 'degraded';
  }

  private urgencyToNumber(urgency: string): number {
    const mapping = {
      low: 25,
      medium: 50,
      high: 75,
      critical: 95
    };
    return mapping[urgency.toLowerCase()] || 50;
  }

  // Database query methods
  async getAlertsFromDatabase(filters?: {
    type?: string;
    region?: string;
    minUrgency?: number;
    limit?: number;
  }) {
    let query = supabase
      .from('alert_history')
      .select('*')
      .order('timestamp', { ascending: false });

    if (filters) {
      if (filters.type) query = query.eq('type', filters.type);
      if (filters.region) query = query.eq('region', filters.region);
      if (filters.minUrgency) query = query.gte('urgency', filters.minUrgency);
      if (filters.limit) query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching alerts from database:', error);
      return [];
    }

    return data || [];
  }

  async getSystemMetricsFromDatabase(metricName?: string, region?: string) {
    let query = supabase
      .from('system_metrics')
      .select('*')
      .order('timestamp', { ascending: false });

    if (metricName) query = query.eq('metric_name', metricName);
    if (region) query = query.eq('region', region);

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching system metrics:', error);
      return [];
    }

    return data || [];
  }

  async getDataSourcesFromDatabase() {
    const { data, error } = await supabase
      .from('data_sources_status')
      .select('*')
      .order('last_check', { ascending: false });

    if (error) {
      console.error('Error fetching data sources:', error);
      return [];
    }

    return data || [];
  }

  // Configuration methods
  updateConfig(newConfig: Partial<RealTimeDataConfig>) {
    this.config = { ...this.config, ...newConfig };
    
    if (newConfig.syncInterval && this.syncTimer) {
      this.stopAutoSync();
      this.startAutoSync();
    }
  }

  getConfig() {
    return { ...this.config };
  }
}

export const realDataService = new RealDataService();