import { supabase } from "@/integrations/supabase/client";

export interface CompetitorData {
  id?: string;
  competitor_id: string;
  name: string;
  market_share: number;
  innovation_score: number;
  funding_millions?: number;
  patent_score: number;
  threat_level: string;
  sector: string;
  recent_moves?: string[];
}

export interface StrategicEvent {
  id?: string;
  event_id: string;
  event_date: string;
  company: string;
  event_type: string;
  title: string;
  description: string;
  impact_score: number;
  financial_value?: number;
  sector: string;
}

class CompetitiveService {
  async getCompetitors(): Promise<CompetitorData[]> {
    const { data, error } = await supabase
      .from('competitive_intelligence')
      .select('*')
      .order('threat_level', { ascending: false });

    if (error) {
      console.error('Error fetching competitors:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      recent_moves: Array.isArray(item.recent_moves) ? item.recent_moves.filter(m => typeof m === 'string') : []
    }));
  }

  async getStrategicEvents(): Promise<StrategicEvent[]> {
    const { data, error } = await supabase
      .from('strategic_events')
      .select('*')
      .order('event_date', { ascending: false });

    if (error) {
      console.error('Error fetching strategic events:', error);
      return [];
    }

    return data;
  }

  async addCompetitor(competitor: Omit<CompetitorData, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('competitive_intelligence')
      .insert({
        ...competitor,
        recent_moves: competitor.recent_moves || []
      });

    if (error) {
      console.error('Error adding competitor:', error);
      throw error;
    }
  }

  async addStrategicEvent(event: Omit<StrategicEvent, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('strategic_events')
      .insert(event);

    if (error) {
      console.error('Error adding strategic event:', error);
      throw error;
    }
  }

  async updateCompetitor(id: string, data: Partial<CompetitorData>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('competitive_intelligence')
      .update({
        ...data,
        recent_moves: data.recent_moves || undefined
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating competitor:', error);
      throw new Error(`Failed to update competitor: ${error.message}`);
    }
  }

  async deleteCompetitor(id: string): Promise<void> {
    const { error } = await supabase
      .from('competitive_intelligence')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting competitor:', error);
      throw new Error(`Failed to delete competitor: ${error.message}`);
    }
  }

  async getCompetitorById(id: string): Promise<CompetitorData | null> {
    const { data, error } = await supabase
      .from('competitive_intelligence')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching competitor:', error);
      throw new Error(`Failed to fetch competitor: ${error.message}`);
    }

    if (!data) return null;

    return {
      ...data,
      recent_moves: Array.isArray(data.recent_moves) ? data.recent_moves.filter(m => typeof m === 'string') : []
    };
  }

  async getCompetitorsBySector(sector: string): Promise<CompetitorData[]> {
    const { data, error } = await supabase
      .from('competitive_intelligence')
      .select('*')
      .eq('sector', sector)
      .order('threat_level', { ascending: false });

    if (error) {
      console.error('Error fetching competitors by sector:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      recent_moves: Array.isArray(item.recent_moves) ? item.recent_moves.filter(m => typeof m === 'string') : []
    }));
  }

  async updateStrategicEvent(id: string, data: Partial<StrategicEvent>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('strategic_events')
      .update(data)
      .eq('id', id);

    if (error) {
      console.error('Error updating strategic event:', error);
      throw new Error(`Failed to update strategic event: ${error.message}`);
    }
  }

  async deleteStrategicEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('strategic_events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting strategic event:', error);
      throw new Error(`Failed to delete strategic event: ${error.message}`);
    }
  }

  async getEventsByCompany(company: string): Promise<StrategicEvent[]> {
    const { data, error } = await supabase
      .from('strategic_events')
      .select('*')
      .eq('company', company)
      .order('event_date', { ascending: false });

    if (error) {
      console.error('Error fetching events by company:', error);
      return [];
    }

    return data;
  }

  async getEventsByDateRange(startDate: string, endDate: string): Promise<StrategicEvent[]> {
    const { data, error } = await supabase
      .from('strategic_events')
      .select('*')
      .gte('event_date', startDate)
      .lte('event_date', endDate)
      .order('event_date', { ascending: false });

    if (error) {
      console.error('Error fetching events by date range:', error);
      return [];
    }

    return data;
  }
}

export const competitiveService = new CompetitiveService();