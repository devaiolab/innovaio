-- Update RLS policies to require authentication instead of unrestricted access

-- Drop existing policies that allow unrestricted access
DROP POLICY IF EXISTS "Allow all operations on alert_history" ON public.alert_history;
DROP POLICY IF EXISTS "Allow all operations on action_executions" ON public.action_executions;
DROP POLICY IF EXISTS "Allow all operations on action_plans" ON public.action_plans;
DROP POLICY IF EXISTS "Allow all operations on data_sources_status" ON public.data_sources_status;
DROP POLICY IF EXISTS "Allow all operations on system_metrics" ON public.system_metrics;

-- Create secure authentication-based policies for alert_history
CREATE POLICY "Authenticated users can view alert history" ON public.alert_history
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert alert history" ON public.alert_history
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update alert history" ON public.alert_history
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete alert history" ON public.alert_history
FOR DELETE USING (auth.role() = 'authenticated');

-- Create secure authentication-based policies for action_executions
CREATE POLICY "Authenticated users can view action executions" ON public.action_executions
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert action executions" ON public.action_executions
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update action executions" ON public.action_executions
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete action executions" ON public.action_executions
FOR DELETE USING (auth.role() = 'authenticated');

-- Create secure authentication-based policies for action_plans
CREATE POLICY "Authenticated users can view action plans" ON public.action_plans
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert action plans" ON public.action_plans
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update action plans" ON public.action_plans
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete action plans" ON public.action_plans
FOR DELETE USING (auth.role() = 'authenticated');

-- Create secure authentication-based policies for data_sources_status
CREATE POLICY "Authenticated users can view data sources status" ON public.data_sources_status
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert data sources status" ON public.data_sources_status
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update data sources status" ON public.data_sources_status
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete data sources status" ON public.data_sources_status
FOR DELETE USING (auth.role() = 'authenticated');

-- Create secure authentication-based policies for system_metrics
CREATE POLICY "Authenticated users can view system metrics" ON public.system_metrics
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert system metrics" ON public.system_metrics
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update system metrics" ON public.system_metrics
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete system metrics" ON public.system_metrics
FOR DELETE USING (auth.role() = 'authenticated');