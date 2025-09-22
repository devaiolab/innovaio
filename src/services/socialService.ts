import { supabase } from "@/integrations/supabase/client";

export interface SocialInfluencer {
  id?: string;
  influencer_id: string;
  name: string;
  platform: string;
  followers: number;
  engagement_rate: number;
  influence_score: number;
  topics: string[];
  recent_post?: string;
  business_impact: string;
  tier: string;
}

export interface SocialTrend {
  id?: string;
  trend_id: string;
  topic: string;
  platform: string;
  sentiment: "positivo" | "neutro" | "negativo";
  engagement: number;
  mentions: number;
  growth_rate: number;
  impact_level: "alto" | "médio" | "baixo";
  region: string;
  keywords: string[];
  business_relevance: number;
}

class SocialService {
  async getInfluencers(): Promise<SocialInfluencer[]> {
    const { data, error } = await supabase
      .from('social_influencers')
      .select('*')
      .order('influence_score', { ascending: false });

    if (error) {
      console.error('Error fetching influencers:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      topics: Array.isArray(item.topics) ? item.topics.filter(t => typeof t === 'string') : []
    }));
  }

  async getSocialTrends(): Promise<SocialTrend[]> {
    const { data, error } = await supabase
      .from('social_trends')
      .select('*')
      .order('growth_rate', { ascending: false });

    if (error) {
      console.error('Error fetching social trends:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      keywords: Array.isArray(item.keywords) ? item.keywords.filter(k => typeof k === 'string') : [],
      sentiment: item.sentiment as "positivo" | "neutro" | "negativo",
      impact_level: item.impact_level as "alto" | "médio" | "baixo"
    }));
  }

  async addInfluencer(influencer: Omit<SocialInfluencer, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('social_influencers')
      .insert({
        ...influencer,
        topics: influencer.topics || []
      });

    if (error) {
      console.error('Error adding influencer:', error);
      throw error;
    }
  }

  async addSocialTrend(trend: Omit<SocialTrend, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('social_trends')
      .insert({
        ...trend,
        keywords: trend.keywords || []
      });

    if (error) {
      console.error('Error adding social trend:', error);
      throw error;
    }
  }
}

export const socialService = new SocialService();