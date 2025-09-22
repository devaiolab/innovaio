import { supabase } from "@/integrations/supabase/client";

export interface InnovationOpportunity {
  id?: string;
  opportunity_id: string;
  title: string;
  category: string;
  maturity_level: string;
  roi_percentage: number;
  time_to_market_months: number;
  investment_millions: number;
  potential_level: string;
  technologies: string[];
  applications: string[];
}

export interface TechEvolution {
  id?: string;
  tech_id: string;
  category: string;
  month_year: string;
  progress_value: number;
  growth_rate: number;
  icon?: string;
  color_code?: string;
}

export interface SectorData {
  id?: string;
  sector_id: string;
  sector_name: string;
  investment_millions: number;
  patents_count: number;
  startups_count: number;
  risk_level: string;
  opportunity_score: number;
}

class InnovationService {
  async getOpportunities(): Promise<InnovationOpportunity[]> {
    const { data, error } = await supabase
      .from('innovation_opportunities')
      .select('*')
      .order('roi_percentage', { ascending: false });

    if (error) {
      console.error('Error fetching innovation opportunities:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      technologies: Array.isArray(item.technologies) ? item.technologies.filter(t => typeof t === 'string') : [],
      applications: Array.isArray(item.applications) ? item.applications.filter(a => typeof a === 'string') : []
    }));
  }

  async getTechEvolution(): Promise<TechEvolution[]> {
    const { data, error } = await supabase
      .from('tech_evolution')
      .select('*')
      .order('month_year', { ascending: true });

    if (error) {
      console.error('Error fetching tech evolution:', error);
      return [];
    }

    return data;
  }

  async getSectorAnalysis(): Promise<SectorData[]> {
    const { data, error } = await supabase
      .from('sector_analysis')
      .select('*')
      .order('opportunity_score', { ascending: false });

    if (error) {
      console.error('Error fetching sector analysis:', error);
      return [];
    }

    return data;
  }

  async addOpportunity(opportunity: Omit<InnovationOpportunity, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('innovation_opportunities')
      .insert({
        ...opportunity,
        technologies: opportunity.technologies || [],
        applications: opportunity.applications || []
      });

    if (error) {
      console.error('Error adding innovation opportunity:', error);
      throw error;
    }
  }

  async addTechEvolution(tech: Omit<TechEvolution, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('tech_evolution')
      .insert(tech);

    if (error) {
      console.error('Error adding tech evolution:', error);
      throw error;
    }
  }

  async addSectorData(sector: Omit<SectorData, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('sector_analysis')
      .insert(sector);

    if (error) {
      console.error('Error adding sector data:', error);
      throw error;
    }
  }
}

export const innovationService = new InnovationService();