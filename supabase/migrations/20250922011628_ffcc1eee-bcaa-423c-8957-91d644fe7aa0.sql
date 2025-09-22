-- Add unique constraint to data_sources_status.source_name to prevent duplicates
ALTER TABLE public.data_sources_status 
ADD CONSTRAINT unique_source_name UNIQUE (source_name);