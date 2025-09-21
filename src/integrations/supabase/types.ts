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
