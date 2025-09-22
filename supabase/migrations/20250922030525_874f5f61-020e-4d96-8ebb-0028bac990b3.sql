-- Create local_market_intel table for LocalMarketData component
CREATE TABLE public.local_market_intel (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  market_id TEXT NOT NULL,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  operator TEXT NOT NULL,
  technology TEXT NOT NULL,
  market_share NUMERIC NOT NULL,
  revenue_millions NUMERIC NOT NULL,
  growth_rate NUMERIC NOT NULL,
  subscriber_base INTEGER NOT NULL,
  network_coverage NUMERIC NOT NULL,
  investment_millions NUMERIC,
  regulatory_status TEXT NOT NULL,
  competitive_position TEXT NOT NULL,
  key_partnerships JSONB,
  market_challenges JSONB,
  opportunities JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.local_market_intel ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can view local market intel" 
ON public.local_market_intel 
FOR SELECT 
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can insert local market intel" 
ON public.local_market_intel 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can update local market intel" 
ON public.local_market_intel 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can delete local market intel" 
ON public.local_market_intel 
FOR DELETE 
USING (auth.role() = 'authenticated'::text);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_local_market_intel_updated_at
BEFORE UPDATE ON public.local_market_intel
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();