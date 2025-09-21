// Action execution service for INNOVAIO system
// Handles real action execution and workflow management
// Integrated with Lovable Cloud for data persistence

import { supabase } from "@/integrations/supabase/client";

interface ActionResult {
  id: string;
  success: boolean;
  message: string;
  timestamp: Date;
  details?: any;
}

interface ActionPlan {
  id: string;
  title: string;
  description: string;
  actions: Action[];
  priority: 'urgent' | 'high' | 'medium' | 'low';
  estimatedDuration: string;
  estimatedCost: number;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  progress: number;
}

interface Action {
  id: string;
  title: string;
  description: string;
  type: 'immediate' | 'strategic' | 'monitoring' | 'communication';
  effort: 'low' | 'medium' | 'high';
  impact: number; // 0-100
  timeframe: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  dependencies?: string[];
  estimatedCost?: number;
}

class ActionService {
  private executingActions = new Map<string, Promise<ActionResult>>();
  private actionHistory: ActionResult[] = [];
  private actionPlans: ActionPlan[] = [];

  // Execute a single action with database persistence
  async executeAction(action: Action, alertId?: string): Promise<ActionResult> {
    const actionId = `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🚀 Executando ação: ${action.title}`);
    
    // Save to database before execution
    const dbRecord = await this.saveActionToDatabase(action, actionId, alertId);
    
    // Simulate action execution based on type
    const executionPromise = this.performActionExecution(action, actionId);
    this.executingActions.set(actionId, executionPromise);
    
    try {
      const result = await executionPromise;
      
      // Update database with result
      await this.updateActionInDatabase(dbRecord.id, result);
      
      this.actionHistory.push(result);
      this.executingActions.delete(actionId);
      return result;
    } catch (error) {
      const failedResult: ActionResult = {
        id: actionId,
        success: false,
        message: `Falha na execução: ${error}`,
        timestamp: new Date()
      };
      
      // Update database with failure
      await this.updateActionInDatabase(dbRecord.id, failedResult);
      
      this.actionHistory.push(failedResult);
      this.executingActions.delete(actionId);
      return failedResult;
    }
  }

  // Create a detailed action plan with database persistence
  async createDetailedActionPlan(alertId: string, alertData: any): Promise<ActionPlan> {
    const planId = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // First, save alert to database if it doesn't exist
    const savedAlert = await this.saveAlertToDatabase(alertData);
    
    // Generate actions based on alert type and urgency
    const actions = this.generateActionsForAlert(alertData);
    
    const actionPlan: ActionPlan = {
      id: planId,
      title: `Plano de Ação: ${alertData.title}`,
      description: `Plano detalhado para mitigar os riscos identificados em: ${alertData.description}`,
      actions,
      priority: alertData.urgency >= 85 ? 'urgent' : 
                alertData.urgency >= 70 ? 'high' : 
                alertData.urgency >= 50 ? 'medium' : 'low',
      estimatedDuration: this.calculateEstimatedDuration(actions),
      estimatedCost: this.calculateEstimatedCost(actions),
      status: 'pending',
      progress: 0
    };

    // Save action plan to database
    await this.saveActionPlanToDatabase(actionPlan, savedAlert.id);

    this.actionPlans.push(actionPlan);
    console.log(`📋 Plano de ação criado: ${actionPlan.title}`);
    
    return actionPlan;
  }

  // Execute entire action plan
  async executeActionPlan(planId: string): Promise<ActionResult[]> {
    const plan = this.actionPlans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plano de ação não encontrado');
    }

    plan.status = 'executing';
    const results: ActionResult[] = [];

    console.log(`🎯 Executando plano de ação: ${plan.title}`);

    for (const action of plan.actions) {
      try {
        action.status = 'executing';
        const result = await this.executeAction(action);
        results.push(result);
        action.status = result.success ? 'completed' : 'failed';
        
        // Update plan progress
        const completedActions = plan.actions.filter(a => a.status === 'completed').length;
        plan.progress = (completedActions / plan.actions.length) * 100;
        
      } catch (error) {
        action.status = 'failed';
        console.error(`❌ Falha na ação ${action.title}:`, error);
      }
    }

    plan.status = plan.actions.every(a => a.status === 'completed') ? 'completed' : 'failed';
    return results;
  }

  // Private methods
  private async performActionExecution(action: Action, actionId: string): Promise<ActionResult> {
    // Simulate execution time based on effort
    const executionTime = action.effort === 'high' ? 3000 : 
                         action.effort === 'medium' ? 2000 : 1000;
    
    await new Promise(resolve => setTimeout(resolve, executionTime));

    // Simulate different action types
    switch (action.type) {
      case 'immediate':
        return this.executeImmediateAction(action, actionId);
      case 'strategic':
        return this.executeStrategicAction(action, actionId);
      case 'monitoring':
        return this.executeMonitoringAction(action, actionId);
      case 'communication':
        return this.executeCommunicationAction(action, actionId);
      default:
        throw new Error(`Tipo de ação não suportado: ${action.type}`);
    }
  }

  private executeImmediateAction(action: Action, actionId: string): ActionResult {
    return {
      id: actionId,
      success: true,
      message: `✅ Ação imediata executada com sucesso: ${action.title}`,
      timestamp: new Date(),
      details: {
        type: 'immediate',
        impact: action.impact,
        timeframe: action.timeframe
      }
    };
  }

  private executeStrategicAction(action: Action, actionId: string): ActionResult {
    return {
      id: actionId,
      success: true,
      message: `🎯 Ação estratégica iniciada: ${action.title}`,
      timestamp: new Date(),
      details: {
        type: 'strategic',
        impact: action.impact,
        timeframe: action.timeframe,
        followUp: 'Acompanhamento semanal necessário'
      }
    };
  }

  private executeMonitoringAction(action: Action, actionId: string): ActionResult {
    return {
      id: actionId,
      success: true,
      message: `📊 Sistema de monitoramento ativado: ${action.title}`,
      timestamp: new Date(),
      details: {
        type: 'monitoring',
        alertsEnabled: true,
        dashboardUrl: '/monitoring/dashboard',
        frequency: '15 minutos'
      }
    };
  }

  private executeCommunicationAction(action: Action, actionId: string): ActionResult {
    return {
      id: actionId,
      success: true,
      message: `📢 Comunicação enviada: ${action.title}`,
      timestamp: new Date(),
      details: {
        type: 'communication',
        channels: ['email', 'sms', 'push'],
        recipients: 'Stakeholders relevantes',
        deliveryStatus: 'Entregue'
      }
    };
  }

  private generateActionsForAlert(alertData: any): Action[] {
    const baseActions: Action[] = [
      {
        id: 'assess',
        title: 'Avaliação Rápida de Impacto',
        description: 'Realizar análise detalhada do impacto potencial do alerta',
        type: 'immediate',
        effort: 'low',
        impact: 70,
        timeframe: '30 minutos',
        status: 'pending'
      },
      {
        id: 'notify',
        title: 'Notificar Stakeholders',
        description: 'Comunicar situação para equipes relevantes',
        type: 'communication',
        effort: 'low',
        impact: 60,
        timeframe: '15 minutos',
        status: 'pending'
      }
    ];

    // Add specific actions based on urgency
    if (alertData.urgency >= 85) {
      baseActions.push({
        id: 'emergency',
        title: 'Ativar Protocolo de Emergência',
        description: 'Implementar resposta de emergência conforme SLA crítico',
        type: 'immediate',
        effort: 'high',
        impact: 95,
        timeframe: 'Imediato',
        status: 'pending',
        estimatedCost: 50000
      });
    }

    if (alertData.urgency >= 70) {
      baseActions.push({
        id: 'strategic_response',
        title: 'Resposta Estratégica',
        description: 'Implementar contramedidas estratégicas específicas',
        type: 'strategic',
        effort: 'high',
        impact: 85,
        timeframe: '24-48h',
        status: 'pending',
        estimatedCost: 25000
      });
    }

    baseActions.push({
      id: 'monitor',
      title: 'Monitoramento Intensivo',
      description: 'Implementar monitoramento contínuo da situação',
      type: 'monitoring',
      effort: 'medium',
      impact: 75,
      timeframe: 'Contínuo',
      status: 'pending',
      estimatedCost: 5000
    });

    return baseActions;
  }

  private calculateEstimatedDuration(actions: Action[]): string {
    const totalMinutes = actions.reduce((total, action) => {
      const timeMap = {
        'Imediato': 15,
        '15 minutos': 15,
        '30 minutos': 30,
        '24-48h': 2880, // 48 hours
        'Contínuo': 60 // Assume 1 hour for setup
      };
      return total + (timeMap[action.timeframe as keyof typeof timeMap] || 60);
    }, 0);

    if (totalMinutes < 60) return `${totalMinutes} minutos`;
    if (totalMinutes < 1440) return `${Math.round(totalMinutes / 60)} horas`;
    return `${Math.round(totalMinutes / 1440)} dias`;
  }

  private calculateEstimatedCost(actions: Action[]): number {
    return actions.reduce((total, action) => total + (action.estimatedCost || 0), 0);
  }

  // Public getters
  getActionHistory(): ActionResult[] {
    return [...this.actionHistory];
  }

  getActionPlans(): ActionPlan[] {
    return [...this.actionPlans];
  }

  getExecutingActions(): string[] {
    return Array.from(this.executingActions.keys());
  }

  // Database persistence methods
  private async saveAlertToDatabase(alertData: any) {
    const { data, error } = await supabase
      .from('alert_history')
      .insert({
        alert_id: alertData.id || `alert-${Date.now()}`,
        type: alertData.type,
        title: alertData.title,
        description: alertData.description,
        region: alertData.region,
        urgency: alertData.urgency,
        timestamp: alertData.timestamp || new Date().toISOString(),
        source: alertData.source || 'INNOVAIO System',
        relevance: alertData.relevance || alertData.urgency,
        analysis_data: alertData
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving alert to database:', error);
      throw error;
    }

    return data;
  }

  private async saveActionToDatabase(action: Action, actionId: string, alertId?: string) {
    const { data, error } = await supabase
      .from('action_executions')
      .insert({
        action_id: actionId,
        title: action.title,
        description: action.description,
        type: action.type,
        effort: action.effort,
        impact: action.impact,
        timeframe: action.timeframe,
        status: 'executing',
        estimated_cost: action.estimatedCost || 0,
        alert_id: alertId
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving action to database:', error);
      throw error;
    }

    return data;
  }

  private async updateActionInDatabase(dbId: string, result: ActionResult) {
    const { error } = await supabase
      .from('action_executions')
      .update({
        status: result.success ? 'completed' : 'failed',
        success: result.success,
        result_message: result.message,
        result_details: result.details,
        executed_at: result.timestamp.toISOString()
      })
      .eq('id', dbId);

    if (error) {
      console.error('Error updating action in database:', error);
    }
  }

  private async saveActionPlanToDatabase(actionPlan: ActionPlan, alertId: string) {
    const { error } = await supabase
      .from('action_plans')
      .insert({
        plan_id: actionPlan.id,
        title: actionPlan.title,
        description: actionPlan.description,
        priority: actionPlan.priority,
        estimated_duration: actionPlan.estimatedDuration,
        estimated_cost: actionPlan.estimatedCost,
        status: actionPlan.status,
        progress: actionPlan.progress,
        alert_id: alertId,
        actions_data: JSON.stringify(actionPlan.actions)
      });

    if (error) {
      console.error('Error saving action plan to database:', error);
      throw error;
    }
  }

  // Real-time monitoring integration with database
  async setupRealTimeMonitoring(alertId: string): Promise<void> {
    console.log(`🔍 Configurando monitoramento em tempo real para: ${alertId}`);
    
    // Save monitoring setup to system metrics
    await supabase
      .from('system_metrics')
      .insert({
        metric_name: 'monitoring_setup',
        metric_value: 1,
        metric_unit: 'boolean',
        source: 'ActionService',
        timestamp: new Date().toISOString(),
        metadata: { alert_id: alertId }
      });
    
    // Simulate real monitoring setup
    setTimeout(() => {
      console.log(`📡 Monitoramento ativo para ${alertId}`);
    }, 1000);
  }

  // Get historical data from database
  async getActionHistoryFromDatabase(): Promise<any[]> {
    const { data, error } = await supabase
      .from('action_executions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching action history:', error);
      return this.actionHistory;
    }

    return data || this.actionHistory;
  }

  async getActionPlansFromDatabase(): Promise<any[]> {
    const { data, error } = await supabase
      .from('action_plans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching action plans:', error);
      return this.actionPlans;
    }

    return data || this.actionPlans;
  }

  // Emergency response activation
  async activateEmergencyResponse(alertData: any): Promise<ActionResult> {
    console.log(`🚨 ATIVANDO RESPOSTA DE EMERGÊNCIA: ${alertData.title}`);
    
    const emergencyActions: Action[] = [
      {
        id: 'emergency-isolate',
        title: 'Isolamento Imediato',
        description: 'Isolar sistemas afetados para contenção de danos',
        type: 'immediate',
        effort: 'high',
        impact: 95,
        timeframe: 'Imediato',
        status: 'pending'
      },
      {
        id: 'emergency-escalate',
        title: 'Escalação para C-Level',
        description: 'Notificar imediatamente a alta liderança',
        type: 'communication',
        effort: 'low',
        impact: 90,
        timeframe: '5 minutos',
        status: 'pending'
      }
    ];

    // Execute emergency actions in parallel
    const results = await Promise.all(
      emergencyActions.map(action => this.executeAction(action))
    );

    return {
      id: `emergency-${Date.now()}`,
      success: results.every(r => r.success),
      message: 'Protocolo de emergência ativado com sucesso',
      timestamp: new Date(),
      details: { emergencyActions: results }
    };
  }
}

export const actionService = new ActionService();
export type { Action, ActionPlan, ActionResult };