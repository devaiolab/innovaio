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

  async updateInfluencer(id: string, data: Partial<SocialInfluencer>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('social_influencers')
      .update({
        ...data,
        topics: data.topics || undefined
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating influencer:', error);
      throw new Error(`Failed to update influencer: ${error.message}`);
    }
  }

  async deleteInfluencer(id: string): Promise<void> {
    const { error } = await supabase
      .from('social_influencers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting influencer:', error);
      throw new Error(`Failed to delete influencer: ${error.message}`);
    }
  }

  async getInfluencersByPlatform(platform: string): Promise<SocialInfluencer[]> {
    const { data, error } = await supabase
      .from('social_influencers')
      .select('*')
      .eq('platform', platform)
      .order('influence_score', { ascending: false });

    if (error) {
      console.error('Error fetching influencers by platform:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      topics: Array.isArray(item.topics) ? item.topics.filter(t => typeof t === 'string') : []
    }));
  }

  async getInfluencersByTier(tier: string): Promise<SocialInfluencer[]> {
    const { data, error } = await supabase
      .from('social_influencers')
      .select('*')
      .eq('tier', tier)
      .order('influence_score', { ascending: false });

    if (error) {
      console.error('Error fetching influencers by tier:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      topics: Array.isArray(item.topics) ? item.topics.filter(t => typeof t === 'string') : []
    }));
  }

  async updateSocialTrend(id: string, data: Partial<SocialTrend>): Promise<void> {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    const { error } = await supabase
      .from('social_trends')
      .update({
        ...data,
        keywords: data.keywords || undefined
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating social trend:', error);
      throw new Error(`Failed to update social trend: ${error.message}`);
    }
  }

  async deleteSocialTrend(id: string): Promise<void> {
    const { error } = await supabase
      .from('social_trends')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting social trend:', error);
      throw new Error(`Failed to delete social trend: ${error.message}`);
    }
  }

  async getTrendsByRegion(region: string): Promise<SocialTrend[]> {
    const { data, error } = await supabase
      .from('social_trends')
      .select('*')
      .eq('region', region)
      .order('growth_rate', { ascending: false });

    if (error) {
      console.error('Error fetching trends by region:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      keywords: Array.isArray(item.keywords) ? item.keywords.filter(k => typeof k === 'string') : [],
      sentiment: item.sentiment as "positivo" | "neutro" | "negativo",
      impact_level: item.impact_level as "alto" | "médio" | "baixo"
    }));
  }

  async getTrendsBySentiment(sentiment: "positivo" | "neutro" | "negativo"): Promise<SocialTrend[]> {
    const { data, error } = await supabase
      .from('social_trends')
      .select('*')
      .eq('sentiment', sentiment)
      .order('growth_rate', { ascending: false });

    if (error) {
      console.error('Error fetching trends by sentiment:', error);
      return [];
    }

    return data.map(item => ({
      ...item,
      keywords: Array.isArray(item.keywords) ? item.keywords.filter(k => typeof k === 'string') : [],
      sentiment: item.sentiment as "positivo" | "neutro" | "negativo",
      impact_level: item.impact_level as "alto" | "médio" | "baixo"
    }));
  }
}

export const socialService = new SocialService();