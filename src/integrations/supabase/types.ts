export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      action_executions: {
        Row: {
          action_id: string
          alert_id: string | null
          created_at: string
          description: string
          effort: string
          estimated_cost: number | null
          executed_at: string | null
          id: string
          impact: number
          result_details: Json | null
          result_message: string | null
          status: string
          success: boolean | null
          timeframe: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          action_id: string
          alert_id?: string | null
          created_at?: string
          description: string
          effort: string
          estimated_cost?: number | null
          executed_at?: string | null
          id?: string
          impact: number
          result_details?: Json | null
          result_message?: string | null
          status: string
          success?: boolean | null
          timeframe: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          action_id?: string
          alert_id?: string | null
          created_at?: string
          description?: string
          effort?: string
          estimated_cost?: number | null
          executed_at?: string | null
          id?: string
          impact?: number
          result_details?: Json | null
          result_message?: string | null
          status?: string
          success?: boolean | null
          timeframe?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_executions_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "alert_history"
            referencedColumns: ["id"]
          },
        ]
      }
      action_plans: {
        Row: {
          actions_data: Json | null
          alert_id: string | null
          created_at: string
          description: string
          estimated_cost: number | null
          estimated_duration: string | null
          id: string
          plan_id: string
          priority: string
          progress: number | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          actions_data?: Json | null
          alert_id?: string | null
          created_at?: string
          description: string
          estimated_cost?: number | null
          estimated_duration?: string | null
          id?: string
          plan_id: string
          priority: string
          progress?: number | null
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          actions_data?: Json | null
          alert_id?: string | null
          created_at?: string
          description?: string
          estimated_cost?: number | null
          estimated_duration?: string | null
          id?: string
          plan_id?: string
          priority?: string
          progress?: number | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_plans_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "alert_history"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_history: {
        Row: {
          alert_id: string
          analysis_data: Json | null
          created_at: string
          description: string
          id: string
          region: string
          relevance: number | null
          source: string | null
          timestamp: string
          title: string
          type: string
          updated_at: string
          urgency: number
        }
        Insert: {
          alert_id: string
          analysis_data?: Json | null
          created_at?: string
          description: string
          id?: string
          region: string
          relevance?: number | null
          source?: string | null
          timestamp: string
          title: string
          type: string
          updated_at?: string
          urgency: number
        }
        Update: {
          alert_id?: string
          analysis_data?: Json | null
          created_at?: string
          description?: string
          id?: string
          region?: string
          relevance?: number | null
          source?: string | null
          timestamp?: string
          title?: string
          type?: string
          updated_at?: string
          urgency?: number
        }
        Relationships: []
      }
      competitive_intelligence: {
        Row: {
          competitor_id: string
          created_at: string
          funding_millions: number | null
          id: string
          innovation_score: number
          market_share: number
          name: string
          patent_score: number
          recent_moves: Json | null
          sector: string
          threat_level: string
          updated_at: string
        }
        Insert: {
          competitor_id: string
          created_at?: string
          funding_millions?: number | null
          id?: string
          innovation_score: number
          market_share: number
          name: string
          patent_score: number
          recent_moves?: Json | null
          sector: string
          threat_level: string
          updated_at?: string
        }
        Update: {
          competitor_id?: string
          created_at?: string
          funding_millions?: number | null
          id?: string
          innovation_score?: number
          market_share?: number
          name?: string
          patent_score?: number
          recent_moves?: Json | null
          sector?: string
          threat_level?: string
          updated_at?: string
        }
        Relationships: []
      }
      contingency_plans: {
        Row: {
          created_at: string
          estimated_time: string
          id: string
          plan_id: string
          resource_requirements: string
          response_actions: Json
          scenario: string
          success_probability: number
          threat_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          estimated_time: string
          id?: string
          plan_id: string
          resource_requirements: string
          response_actions: Json
          scenario: string
          success_probability: number
          threat_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          estimated_time?: string
          id?: string
          plan_id?: string
          resource_requirements?: string
          response_actions?: Json
          scenario?: string
          success_probability?: number
          threat_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      data_sources_status: {
        Row: {
          created_at: string
          endpoint: string
          error_message: string | null
          id: string
          last_check: string
          metadata: Json | null
          response_time_ms: number | null
          source_name: string
          status: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          error_message?: string | null
          id?: string
          last_check: string
          metadata?: Json | null
          response_time_ms?: number | null
          source_name: string
          status: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          error_message?: string | null
          id?: string
          last_check?: string
          metadata?: Json | null
          response_time_ms?: number | null
          source_name?: string
          status?: string
        }
        Relationships: []
      }
      innovation_opportunities: {
        Row: {
          applications: Json | null
          category: string
          created_at: string
          id: string
          investment_millions: number
          maturity_level: string
          opportunity_id: string
          potential_level: string
          roi_percentage: number
          technologies: Json | null
          time_to_market_months: number
          title: string
          updated_at: string
        }
        Insert: {
          applications?: Json | null
          category: string
          created_at?: string
          id?: string
          investment_millions: number
          maturity_level: string
          opportunity_id: string
          potential_level: string
          roi_percentage: number
          technologies?: Json | null
          time_to_market_months: number
          title: string
          updated_at?: string
        }
        Update: {
          applications?: Json | null
          category?: string
          created_at?: string
          id?: string
          investment_millions?: number
          maturity_level?: string
          opportunity_id?: string
          potential_level?: string
          roi_percentage?: number
          technologies?: Json | null
          time_to_market_months?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      market_threats: {
        Row: {
          created_at: string
          id: string
          impact_area: string
          likelihood: number
          mitigation_status: string
          region: string
          severity_level: string
          threat_id: string
          threat_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          impact_area: string
          likelihood: number
          mitigation_status: string
          region: string
          severity_level: string
          threat_id: string
          threat_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          impact_area?: string
          likelihood?: number
          mitigation_status?: string
          region?: string
          severity_level?: string
          threat_id?: string
          threat_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      regional_trends: {
        Row: {
          coordinates: Json | null
          created_at: string
          growth_percentage: number
          id: string
          impact_level: string
          intensity: number
          market_data: Json | null
          region: string
          technology: string
          trend_id: string
          updated_at: string
        }
        Insert: {
          coordinates?: Json | null
          created_at?: string
          growth_percentage: number
          id?: string
          impact_level: string
          intensity: number
          market_data?: Json | null
          region: string
          technology: string
          trend_id: string
          updated_at?: string
        }
        Update: {
          coordinates?: Json | null
          created_at?: string
          growth_percentage?: number
          id?: string
          impact_level?: string
          intensity?: number
          market_data?: Json | null
          region?: string
          technology?: string
          trend_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      sector_analysis: {
        Row: {
          created_at: string
          id: string
          investment_millions: number
          opportunity_score: number
          patents_count: number
          risk_level: string
          sector_id: string
          sector_name: string
          startups_count: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          investment_millions: number
          opportunity_score: number
          patents_count: number
          risk_level: string
          sector_id: string
          sector_name: string
          startups_count: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          investment_millions?: number
          opportunity_score?: number
          patents_count?: number
          risk_level?: string
          sector_id?: string
          sector_name?: string
          startups_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      social_influencers: {
        Row: {
          business_impact: string
          created_at: string
          engagement_rate: number
          followers: number
          id: string
          influence_score: number
          influencer_id: string
          name: string
          platform: string
          recent_post: string | null
          tier: string
          topics: Json | null
          updated_at: string
        }
        Insert: {
          business_impact: string
          created_at?: string
          engagement_rate: number
          followers: number
          id?: string
          influence_score: number
          influencer_id: string
          name: string
          platform: string
          recent_post?: string | null
          tier: string
          topics?: Json | null
          updated_at?: string
        }
        Update: {
          business_impact?: string
          created_at?: string
          engagement_rate?: number
          followers?: number
          id?: string
          influence_score?: number
          influencer_id?: string
          name?: string
          platform?: string
          recent_post?: string | null
          tier?: string
          topics?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      social_trends: {
        Row: {
          business_relevance: number
          created_at: string
          engagement: number
          growth_rate: number
          id: string
          impact_level: string
          keywords: Json | null
          mentions: number
          platform: string
          region: string
          sentiment: string
          topic: string
          trend_id: string
          updated_at: string
        }
        Insert: {
          business_relevance: number
          created_at?: string
          engagement: number
          growth_rate: number
          id?: string
          impact_level: string
          keywords?: Json | null
          mentions: number
          platform: string
          region: string
          sentiment: string
          topic: string
          trend_id: string
          updated_at?: string
        }
        Update: {
          business_relevance?: number
          created_at?: string
          engagement?: number
          growth_rate?: number
          id?: string
          impact_level?: string
          keywords?: Json | null
          mentions?: number
          platform?: string
          region?: string
          sentiment?: string
          topic?: string
          trend_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      strategic_events: {
        Row: {
          company: string
          created_at: string
          description: string
          event_date: string
          event_id: string
          event_type: string
          financial_value: number | null
          id: string
          impact_score: number
          sector: string
          title: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          event_date: string
          event_id: string
          event_type: string
          financial_value?: number | null
          id?: string
          impact_score: number
          sector: string
          title: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          event_date?: string
          event_id?: string
          event_type?: string
          financial_value?: number | null
          id?: string
          impact_score?: number
          sector?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number
          region: string | null
          source: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value: number
          region?: string | null
          source: string
          timestamp: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number
          region?: string | null
          source?: string
          timestamp?: string
        }
        Relationships: []
      }
      tech_evolution: {
        Row: {
          category: string
          color_code: string | null
          created_at: string
          growth_rate: number
          icon: string | null
          id: string
          month_year: string
          progress_value: number
          tech_id: string
          updated_at: string
        }
        Insert: {
          category: string
          color_code?: string | null
          created_at?: string
          growth_rate: number
          icon?: string | null
          id?: string
          month_year: string
          progress_value: number
          tech_id: string
          updated_at?: string
        }
        Update: {
          category?: string
          color_code?: string | null
          created_at?: string
          growth_rate?: number
          icon?: string | null
          id?: string
          month_year?: string
          progress_value?: number
          tech_id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
