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
}

export const competitiveService = new CompetitiveService();