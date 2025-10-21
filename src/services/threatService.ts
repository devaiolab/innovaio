import { supabase } from "@/integrations/supabase/client";

export interface MarketThreat {
  id?: string;
  threat_id: string;
  threat_type: string;
  region: string;
  severity_level: string;
  likelihood: number;
  impact_area: string;
  mitigation_status: string;
}

export interface ContingencyPlan {
  id?: string;
  plan_id: string;
  scenario: string;
  threat_type: string;
  response_actions: string[];
  estimated_time: string;
  resource_requirements: string;
  success_probability: number;
}

export interface RegionalTrend {
  id?: string;
  trend_id: string;
  region: string;
  technology: string;
  impact_level: string;
  growth_percentage: number;
  intensity: number;
  coordinates?: { lat: number; lng: number };
  market_data?: any;
}

class ThreatService {
  async getMarketThreats(): Promise<MarketThreat[]> {
    const { data, error } = await supabase
      .from('market_threats')
      .select('*')
      .order('likelihood', { ascending: false });

    if (error) {
      console.error('Error fetching market threats:', error);
      return [];
    }

    return data;
  }

  async getContingencyPlans(): Promise<ContingencyPlan[]> {
    const { data, error } = await supabase
      .from('contingency_plans')
      .select('*')
      .order('success_probability', { ascending: false });

    if (error) {
      console.error('Error fetching contingency plans:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      response_actions: Array.isArray(item.response_actions) ? item.response_actions.filter(a => typeof a === 'string') : []
    }));
  }

  async getRegionalTrends(): Promise<RegionalTrend[]> {
    const { data, error } = await supabase
      .from('regional_trends')
      .select('*')
      .order('intensity', { ascending: false });

    if (error) {
      console.error('Error fetching regional trends:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      coordinates: (item.coordinates && typeof item.coordinates === 'object' && 'lat' in item.coordinates) 
        ? item.coordinates as { lat: number; lng: number } 
        : null,
      market_data: item.market_data || null
    }));
  }

  async addMarketThreat(threat: Omit<MarketThreat, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('market_threats')
      .insert(threat);

    if (error) {
      console.error('Error adding market threat:', error);
      throw error;
    }
  }

  async addContingencyPlan(plan: Omit<ContingencyPlan, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('contingency_plans')
      .insert({
        ...plan,
        response_actions: plan.response_actions || []
      });

    if (error) {
      console.error('Error adding contingency plan:', error);
      throw error;
    }
  }

  async addRegionalTrend(trend: Omit<RegionalTrend, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('regional_trends')
      .insert({
        ...trend,
        coordinates: trend.coordinates || null,
        market_data: trend.market_data || null
      });

    if (error) {
      console.error('Error adding regional trend:', error);
      throw error;
    }
  }

  async updateMarketThreat(id: string, data: Partial<MarketThreat>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('market_threats')
      .update(data)
      .eq('id', id);

    if (error) {
      console.error('Error updating market threat:', error);
      throw new Error(`Failed to update market threat: ${error.message}`);
    }
  }

  async deleteMarketThreat(id: string): Promise<void> {
    const { error } = await supabase
      .from('market_threats')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting market threat:', error);
      throw new Error(`Failed to delete market threat: ${error.message}`);
    }
  }

  async getThreatsByRegion(region: string): Promise<MarketThreat[]> {
    const { data, error } = await supabase
      .from('market_threats')
      .select('*')
      .eq('region', region)
      .order('likelihood', { ascending: false });

    if (error) {
      console.error('Error fetching threats by region:', error);
      return [];
    }

    return data;
  }

  async getActiveThreats(minLikelihood: number = 80): Promise<MarketThreat[]> {
    const { data, error } = await supabase
      .from('market_threats')
      .select('*')
      .gte('likelihood', minLikelihood)
      .order('likelihood', { ascending: false });

    if (error) {
      console.error('Error fetching active threats:', error);
      return [];
    }

    return data;
  }

  async updateContingencyPlan(id: string, data: Partial<ContingencyPlan>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('contingency_plans')
      .update({
        ...data,
        response_actions: data.response_actions || undefined
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating contingency plan:', error);
      throw new Error(`Failed to update contingency plan: ${error.message}`);
    }
  }

  async deleteContingencyPlan(id: string): Promise<void> {
    const { error } = await supabase
      .from('contingency_plans')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contingency plan:', error);
      throw new Error(`Failed to delete contingency plan: ${error.message}`);
    }
  }

  async getPlansByThreatType(threatType: string): Promise<ContingencyPlan[]> {
    const { data, error } = await supabase
      .from('contingency_plans')
      .select('*')
      .eq('threat_type', threatType)
      .order('success_probability', { ascending: false });

    if (error) {
      console.error('Error fetching plans by threat type:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      response_actions: Array.isArray(item.response_actions) ? item.response_actions.filter(a => typeof a === 'string') : []
    }));
  }

  async updateRegionalTrend(id: string, data: Partial<RegionalTrend>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('regional_trends')
      .update({
        ...data,
        coordinates: data.coordinates || undefined,
        market_data: data.market_data || undefined
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating regional trend:', error);
      throw new Error(`Failed to update regional trend: ${error.message}`);
    }
  }

  async deleteRegionalTrend(id: string): Promise<void> {
    const { error } = await supabase
      .from('regional_trends')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting regional trend:', error);
      throw new Error(`Failed to delete regional trend: ${error.message}`);
    }
  }
}

export const threatService = new ThreatService();