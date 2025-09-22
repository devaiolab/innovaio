-- Clean database tables to fix constraint violations
DELETE FROM alert_history;
DELETE FROM data_sources_status; 
DELETE FROM system_metrics;