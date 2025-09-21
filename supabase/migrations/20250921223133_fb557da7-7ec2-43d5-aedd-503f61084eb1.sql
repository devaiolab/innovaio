-- Create tables for INNOVAIO system data persistence

-- 1. Alert history table for storing all alerts and their analysis
CREATE TABLE public.alert_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('red', 'yellow', 'blue')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  region TEXT NOT NULL,
  urgency INTEGER NOT NULL CHECK (urgency >= 0 AND urgency <= 100),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source TEXT,
  relevance INTEGER,
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Action executions table for tracking executed actions
CREATE TABLE public.action_executions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('immediate', 'strategic', 'monitoring', 'communication')),
  effort TEXT NOT NULL CHECK (effort IN ('low', 'medium', 'high')),
  impact INTEGER NOT NULL CHECK (impact >= 0 AND impact <= 100),
  timeframe TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'executing', 'completed', 'failed')),
  success BOOLEAN,
  result_message TEXT,
  result_details JSONB,
  estimated_cost DECIMAL(15,2),
  alert_id UUID REFERENCES public.alert_history(id),
  executed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Action plans table for storing comprehensive action plans
CREATE TABLE public.action_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('urgent', 'high', 'medium', 'low')),
  estimated_duration TEXT,
  estimated_cost DECIMAL(15,2),
  status TEXT NOT NULL CHECK (status IN ('pending', 'executing', 'completed', 'failed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  alert_id UUID REFERENCES public.alert_history(id),
  actions_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. System metrics table for storing performance data
CREATE TABLE public.system_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(15,4) NOT NULL,
  metric_unit TEXT,
  region TEXT,
  source TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Data sources status table for monitoring external APIs
CREATE TABLE public.data_sources_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('online', 'offline', 'degraded')),
  response_time_ms INTEGER,
  last_check TIMESTAMP WITH TIME ZONE NOT NULL,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for all tables
ALTER TABLE public.alert_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_sources_status ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allowing all operations for now since this is an internal system)
-- In production, these would be more restrictive based on user roles

-- Alert history policies
CREATE POLICY "Allow all operations on alert_history" 
ON public.alert_history 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Action executions policies
CREATE POLICY "Allow all operations on action_executions" 
ON public.action_executions 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Action plans policies
CREATE POLICY "Allow all operations on action_plans" 
ON public.action_plans 
FOR ALL 
USING (true)
WITH CHECK (true);

-- System metrics policies
CREATE POLICY "Allow all operations on system_metrics" 
ON public.system_metrics 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Data sources status policies
CREATE POLICY "Allow all operations on data_sources_status" 
ON public.data_sources_status 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_alert_history_timestamp ON public.alert_history(timestamp);
CREATE INDEX idx_alert_history_type ON public.alert_history(type);
CREATE INDEX idx_alert_history_region ON public.alert_history(region);
CREATE INDEX idx_action_executions_status ON public.action_executions(status);
CREATE INDEX idx_action_executions_alert_id ON public.action_executions(alert_id);
CREATE INDEX idx_action_plans_status ON public.action_plans(status);
CREATE INDEX idx_action_plans_priority ON public.action_plans(priority);
CREATE INDEX idx_system_metrics_timestamp ON public.system_metrics(timestamp);
CREATE INDEX idx_system_metrics_metric_name ON public.system_metrics(metric_name);
CREATE INDEX idx_data_sources_status_source_name ON public.data_sources_status(source_name);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_alert_history_updated_at
  BEFORE UPDATE ON public.alert_history
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_action_executions_updated_at
  BEFORE UPDATE ON public.action_executions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_action_plans_updated_at
  BEFORE UPDATE ON public.action_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();