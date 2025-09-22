-- Create table for competitive intelligence data
CREATE TABLE public.competitive_intelligence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  competitor_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  market_share NUMERIC NOT NULL,
  innovation_score NUMERIC NOT NULL,
  funding_millions NUMERIC,
  patent_score NUMERIC NOT NULL,
  threat_level TEXT NOT NULL,
  sector TEXT NOT NULL,
  recent_moves JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for social influencers
CREATE TABLE public.social_influencers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  followers INTEGER NOT NULL,
  engagement_rate NUMERIC NOT NULL,
  influence_score NUMERIC NOT NULL,
  topics JSONB,
  recent_post TEXT,
  business_impact TEXT NOT NULL,
  tier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for social trends
CREATE TABLE public.social_trends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trend_id TEXT NOT NULL UNIQUE,
  topic TEXT NOT NULL,
  platform TEXT NOT NULL,
  sentiment TEXT NOT NULL,
  engagement INTEGER NOT NULL,
  mentions INTEGER NOT NULL,
  growth_rate NUMERIC NOT NULL,
  impact_level TEXT NOT NULL,
  region TEXT NOT NULL,
  keywords JSONB,
  business_relevance NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for innovation opportunities
CREATE TABLE public.innovation_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  maturity_level TEXT NOT NULL,
  roi_percentage NUMERIC NOT NULL,
  time_to_market_months INTEGER NOT NULL,
  investment_millions NUMERIC NOT NULL,
  potential_level TEXT NOT NULL,
  technologies JSONB,
  applications JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for regional trends
CREATE TABLE public.regional_trends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trend_id TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  technology TEXT NOT NULL,
  impact_level TEXT NOT NULL,
  growth_percentage NUMERIC NOT NULL,
  intensity NUMERIC NOT NULL,
  coordinates JSONB,
  market_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for tech evolution
CREATE TABLE public.tech_evolution (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tech_id TEXT NOT NULL,
  category TEXT NOT NULL,
  month_year TEXT NOT NULL,
  progress_value NUMERIC NOT NULL,
  growth_rate NUMERIC NOT NULL,
  icon TEXT,
  color_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tech_id, category, month_year)
);

-- Create table for sector analysis
CREATE TABLE public.sector_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sector_id TEXT NOT NULL UNIQUE,
  sector_name TEXT NOT NULL,
  investment_millions NUMERIC NOT NULL,
  patents_count INTEGER NOT NULL,
  startups_count INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  opportunity_score NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for strategic events
CREATE TABLE public.strategic_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  event_date DATE NOT NULL,
  company TEXT NOT NULL,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact_score NUMERIC NOT NULL,
  financial_value NUMERIC,
  sector TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for market threats
CREATE TABLE public.market_threats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  threat_id TEXT NOT NULL UNIQUE,
  threat_type TEXT NOT NULL,
  region TEXT NOT NULL,
  severity_level TEXT NOT NULL,
  likelihood NUMERIC NOT NULL,
  impact_area TEXT NOT NULL,
  mitigation_status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for contingency plans
CREATE TABLE public.contingency_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id TEXT NOT NULL UNIQUE,
  scenario TEXT NOT NULL,
  threat_type TEXT NOT NULL,
  response_actions JSONB NOT NULL,
  estimated_time TEXT NOT NULL,
  resource_requirements TEXT NOT NULL,
  success_probability NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.competitive_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.innovation_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_evolution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sector_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategic_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contingency_plans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated users
CREATE POLICY "Authenticated users can view competitive intelligence" ON public.competitive_intelligence FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert competitive intelligence" ON public.competitive_intelligence FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update competitive intelligence" ON public.competitive_intelligence FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete competitive intelligence" ON public.competitive_intelligence FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view social influencers" ON public.social_influencers FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert social influencers" ON public.social_influencers FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update social influencers" ON public.social_influencers FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete social influencers" ON public.social_influencers FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view social trends" ON public.social_trends FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert social trends" ON public.social_trends FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update social trends" ON public.social_trends FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete social trends" ON public.social_trends FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view innovation opportunities" ON public.innovation_opportunities FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert innovation opportunities" ON public.innovation_opportunities FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update innovation opportunities" ON public.innovation_opportunities FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete innovation opportunities" ON public.innovation_opportunities FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view regional trends" ON public.regional_trends FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert regional trends" ON public.regional_trends FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update regional trends" ON public.regional_trends FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete regional trends" ON public.regional_trends FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view tech evolution" ON public.tech_evolution FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert tech evolution" ON public.tech_evolution FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update tech evolution" ON public.tech_evolution FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete tech evolution" ON public.tech_evolution FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view sector analysis" ON public.sector_analysis FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert sector analysis" ON public.sector_analysis FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update sector analysis" ON public.sector_analysis FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete sector analysis" ON public.sector_analysis FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view strategic events" ON public.strategic_events FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert strategic events" ON public.strategic_events FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update strategic events" ON public.strategic_events FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete strategic events" ON public.strategic_events FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view market threats" ON public.market_threats FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert market threats" ON public.market_threats FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update market threats" ON public.market_threats FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete market threats" ON public.market_threats FOR DELETE USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can view contingency plans" ON public.contingency_plans FOR SELECT USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can insert contingency plans" ON public.contingency_plans FOR INSERT WITH CHECK (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can update contingency plans" ON public.contingency_plans FOR UPDATE USING (auth.role() = 'authenticated'::text);
CREATE POLICY "Authenticated users can delete contingency plans" ON public.contingency_plans FOR DELETE USING (auth.role() = 'authenticated'::text);

-- Create triggers for updated_at
CREATE TRIGGER update_competitive_intelligence_updated_at BEFORE UPDATE ON public.competitive_intelligence FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_social_influencers_updated_at BEFORE UPDATE ON public.social_influencers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_social_trends_updated_at BEFORE UPDATE ON public.social_trends FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_innovation_opportunities_updated_at BEFORE UPDATE ON public.innovation_opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_regional_trends_updated_at BEFORE UPDATE ON public.regional_trends FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tech_evolution_updated_at BEFORE UPDATE ON public.tech_evolution FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_sector_analysis_updated_at BEFORE UPDATE ON public.sector_analysis FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_strategic_events_updated_at BEFORE UPDATE ON public.strategic_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_market_threats_updated_at BEFORE UPDATE ON public.market_threats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contingency_plans_updated_at BEFORE UPDATE ON public.contingency_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();