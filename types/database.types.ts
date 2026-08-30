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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      academy_classes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      ai_settings: {
        Row: {
          enabled: boolean
          grading_model: string | null
          grading_prompt: string
          id: string
          master_model: string | null
          master_prompt: string
          max_tokens: number
          model: string
          provider: string
          system_prompt: string
          temperature: number
          timeout_ms: number
          updated_at: string
        }
        Insert: {
          enabled?: boolean
          grading_model?: string | null
          grading_prompt: string
          id?: string
          master_model?: string | null
          master_prompt: string
          max_tokens?: number
          model?: string
          provider?: string
          system_prompt: string
          temperature?: number
          timeout_ms?: number
          updated_at?: string
        }
        Update: {
          enabled?: boolean
          grading_model?: string | null
          grading_prompt?: string
          id?: string
          master_model?: string | null
          master_prompt?: string
          max_tokens?: number
          model?: string
          provider?: string
          system_prompt?: string
          temperature?: number
          timeout_ms?: number
          updated_at?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          badge_type: string
          code: string
          created_at: string | null
          description: string | null
          icon: string
          id: string
          title: string
          xp_reward: number
        }
        Insert: {
          badge_type?: string
          code: string
          created_at?: string | null
          description?: string | null
          icon: string
          id?: string
          title: string
          xp_reward: number
        }
        Update: {
          badge_type?: string
          code?: string
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: string
          title?: string
          xp_reward?: number
        }
        Relationships: []
      }
      certificate_events: {
        Row: {
          certificate_id: string
          created_at: string
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          certificate_id: string
          created_at?: string
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          certificate_id?: string
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificate_events_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      certificate_settings: {
        Row: {
          auto_generate_pdf: boolean | null
          auto_send_email: boolean | null
          certificate_prefix: string | null
          created_at: string
          default_template_id: string | null
          director_name: string | null
          director_title: string | null
          enable_qrcode: boolean | null
          id: string
          logo_url: string | null
          organization_name: string | null
          signature_url: string | null
          updated_at: string
          verification_base_url: string | null
        }
        Insert: {
          auto_generate_pdf?: boolean | null
          auto_send_email?: boolean | null
          certificate_prefix?: string | null
          created_at?: string
          default_template_id?: string | null
          director_name?: string | null
          director_title?: string | null
          enable_qrcode?: boolean | null
          id?: string
          logo_url?: string | null
          organization_name?: string | null
          signature_url?: string | null
          updated_at?: string
          verification_base_url?: string | null
        }
        Update: {
          auto_generate_pdf?: boolean | null
          auto_send_email?: boolean | null
          certificate_prefix?: string | null
          created_at?: string
          default_template_id?: string | null
          director_name?: string | null
          director_title?: string | null
          enable_qrcode?: boolean | null
          id?: string
          logo_url?: string | null
          organization_name?: string | null
          signature_url?: string | null
          updated_at?: string
          verification_base_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificate_settings_default_template_id_fkey"
            columns: ["default_template_id"]
            isOneToOne: false
            referencedRelation: "certificate_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      certificate_templates: {
        Row: {
          active: boolean
          background_url: string | null
          created_at: string
          css_template: string | null
          description: string | null
          html_template: string
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          background_url?: string | null
          created_at?: string
          css_template?: string | null
          description?: string | null
          html_template: string
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          background_url?: string | null
          created_at?: string
          css_template?: string | null
          description?: string | null
          html_template?: string
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_number: string
          completion_percentage: number | null
          course_id: string
          created_at: string
          download_count: number
          email_sent: boolean
          expires_at: string | null
          id: string
          issued_at: string
          issued_by: string | null
          last_download_at: string | null
          lesson_id: string | null
          module_id: string | null
          pdf_generated: boolean
          pdf_url: string | null
          public_id: string
          score: number | null
          status: string
          subtitle: string | null
          template_id: string | null
          title: string
          updated_at: string
          user_id: string
          verification_token: string
        }
        Insert: {
          certificate_number: string
          completion_percentage?: number | null
          course_id: string
          created_at?: string
          download_count?: number
          email_sent?: boolean
          expires_at?: string | null
          id?: string
          issued_at?: string
          issued_by?: string | null
          last_download_at?: string | null
          lesson_id?: string | null
          module_id?: string | null
          pdf_generated?: boolean
          pdf_url?: string | null
          public_id?: string
          score?: number | null
          status?: string
          subtitle?: string | null
          template_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          verification_token?: string
        }
        Update: {
          certificate_number?: string
          completion_percentage?: number | null
          course_id?: string
          created_at?: string
          download_count?: number
          email_sent?: boolean
          expires_at?: string | null
          id?: string
          issued_at?: string
          issued_by?: string | null
          last_download_at?: string | null
          lesson_id?: string | null
          module_id?: string | null
          pdf_generated?: boolean
          pdf_url?: string | null
          public_id?: string
          score?: number | null
          status?: string
          subtitle?: string | null
          template_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          verification_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "certificates_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "certificate_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coupon_redemptions: {
        Row: {
          coupon_id: string
          id: string
          order_id: string
          profile_id: string
          redeemed_at: string
        }
        Insert: {
          coupon_id: string
          id?: string
          order_id: string
          profile_id: string
          redeemed_at?: string
        }
        Update: {
          coupon_id?: string
          id?: string
          order_id?: string
          profile_id?: string
          redeemed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_redemptions_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_redemptions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_redemptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string
          current_redemptions: number
          description: string | null
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          discount_value: number
          id: string
          is_active: boolean
          max_redemptions: number | null
          updated_at: string
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          code: string
          created_at?: string
          current_redemptions?: number
          description?: string | null
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          discount_value: number
          id?: string
          is_active?: boolean
          max_redemptions?: number | null
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          current_redemptions?: number
          description?: string | null
          discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          discount_value?: number
          id?: string
          is_active?: boolean
          max_redemptions?: number | null
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          color_theme: string | null
          created_at: string
          description: string | null
          display_order: number
          icon_name: string | null
          id: string
          is_featured: boolean
          name: string
          slug: string
          updated_at: string
          visible_home: boolean
        }
        Insert: {
          color_theme?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          is_featured?: boolean
          name: string
          slug: string
          updated_at?: string
          visible_home?: boolean
        }
        Update: {
          color_theme?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          icon_name?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          slug?: string
          updated_at?: string
          visible_home?: boolean
        }
        Relationships: []
      }
      course_classes: {
        Row: {
          assigned_at: string
          class_id: string
          course_id: string
        }
        Insert: {
          assigned_at?: string
          class_id: string
          course_id: string
        }
        Update: {
          assigned_at?: string
          class_id?: string
          course_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "academy_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_classes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_classes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          content: string | null
          content_type: string | null
          created_at: string
          duration: number | null
          external_url: string | null
          id: string
          module_id: string | null
          order_index: number
          slug: string
          title: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          content_type?: string | null
          created_at?: string
          duration?: number | null
          external_url?: string | null
          id?: string
          module_id?: string | null
          order_index?: number
          slug: string
          title: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          content_type?: string | null
          created_at?: string
          duration?: number | null
          external_url?: string | null
          id?: string
          module_id?: string | null
          order_index?: number
          slug?: string
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          is_preview: boolean
          module_code: string
          order_index: number
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          is_preview?: boolean
          module_code: string
          order_index?: number
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          is_preview?: boolean
          module_code?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      courses: {
        Row: {
          allowed_classes: string[]
          category: string | null
          cover_image: string | null
          created_at: string
          currency: Database["public"]["Enums"]["currency_enum"]
          description: string | null
          difficulty: string | null
          estimated_hours: number | null
          id: string
          is_paid: boolean
          price: number
          published: boolean | null
          slug: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          teacher: string | null
          title: string
          updated_at: string
        }
        Insert: {
          allowed_classes?: string[]
          category?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_enum"]
          description?: string | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          is_paid?: boolean
          price?: number
          published?: boolean | null
          slug: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          teacher?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          allowed_classes?: string[]
          category?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_enum"]
          description?: string | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          is_paid?: boolean
          price?: number
          published?: boolean | null
          slug?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          teacher?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      document_configs: {
        Row: {
          file_path: string
          id: string
          is_active: boolean | null
          label: string
          updated_at: string
        }
        Insert: {
          file_path: string
          id: string
          is_active?: boolean | null
          label: string
          updated_at?: string
        }
        Update: {
          file_path?: string
          id?: string
          is_active?: boolean | null
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      mail_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          provider: string
          provider_id: string | null
          recipient: string
          status: string
          subject: string
          template_key: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          provider?: string
          provider_id?: string | null
          recipient: string
          status: string
          subject: string
          template_key: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          provider?: string
          provider_id?: string | null
          recipient?: string
          status?: string
          subject?: string
          template_key?: string
        }
        Relationships: []
      }
      mail_settings: {
        Row: {
          id: string
          updated_at: string
          value: string
        }
        Insert: {
          id: string
          updated_at?: string
          value: string
        }
        Update: {
          id?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      mail_templates: {
        Row: {
          body_text_override: string | null
          created_at: string
          description: string | null
          enabled: boolean
          id: string
          name: string
          subject: string
          template_key: string
          title_override: string | null
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          body_text_override?: string | null
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          name: string
          subject: string
          template_key: string
          title_override?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          body_text_override?: string | null
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          name?: string
          subject?: string
          template_key?: string
          title_override?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "mail_templates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      module_completions: {
        Row: {
          certificate_generated: boolean
          completed: boolean
          completed_at: string | null
          completion_percentage: number
          course_id: string
          created_at: string
          id: string
          module_id: string
          quiz_score: number | null
          updated_at: string
          user_id: string
          xp_awarded: number
        }
        Insert: {
          certificate_generated?: boolean
          completed?: boolean
          completed_at?: string | null
          completion_percentage?: number
          course_id: string
          created_at?: string
          id?: string
          module_id: string
          quiz_score?: number | null
          updated_at?: string
          user_id: string
          xp_awarded?: number
        }
        Update: {
          certificate_generated?: boolean
          completed?: boolean
          completed_at?: string | null
          completion_percentage?: number
          course_id?: string
          created_at?: string
          id?: string
          module_id?: string
          quiz_score?: number | null
          updated_at?: string
          user_id?: string
          xp_awarded?: number
        }
        Relationships: [
          {
            foreignKeyName: "module_completions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_completions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "module_completions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          course_id: string
          course_title_snapshot: string
          created_at: string
          id: string
          line_total: number
          metadata: Json
          order_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          course_id: string
          course_title_snapshot: string
          created_at?: string
          id?: string
          line_total: number
          metadata?: Json
          order_id: string
          quantity?: number
          unit_price: number
        }
        Update: {
          course_id?: string
          course_title_snapshot?: string
          created_at?: string
          id?: string
          line_total?: number
          metadata?: Json
          order_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          coupon_id: string | null
          created_at: string
          currency: Database["public"]["Enums"]["currency_enum"]
          discount: number
          id: string
          metadata: Json
          order_number: string
          payment_provider: Database["public"]["Enums"]["payment_provider_enum"]
          payment_provider_order_id: string | null
          profile_id: string
          status: Database["public"]["Enums"]["order_status_enum"]
          subtotal: number
          tax: number
          total: number
          updated_at: string
        }
        Insert: {
          coupon_id?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_enum"]
          discount?: number
          id?: string
          metadata?: Json
          order_number: string
          payment_provider?: Database["public"]["Enums"]["payment_provider_enum"]
          payment_provider_order_id?: string | null
          profile_id: string
          status?: Database["public"]["Enums"]["order_status_enum"]
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
        }
        Update: {
          coupon_id?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_enum"]
          discount?: number
          id?: string
          metadata?: Json
          order_number?: string
          payment_provider?: Database["public"]["Enums"]["payment_provider_enum"]
          payment_provider_order_id?: string | null
          profile_id?: string
          status?: Database["public"]["Enums"]["order_status_enum"]
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      password_reset_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token: string
          used: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          token: string
          used?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
          used?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "password_reset_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_logs: {
        Row: {
          created_at: string
          error: string | null
          event: string
          id: string
          payload: Json
          processed: boolean
          processed_at: string | null
          provider: Database["public"]["Enums"]["payment_provider_enum"]
          provider_event_id: string | null
        }
        Insert: {
          created_at?: string
          error?: string | null
          event: string
          id?: string
          payload?: Json
          processed?: boolean
          processed_at?: string | null
          provider?: Database["public"]["Enums"]["payment_provider_enum"]
          provider_event_id?: string | null
        }
        Update: {
          created_at?: string
          error?: string | null
          event?: string
          id?: string
          payload?: Json
          processed?: boolean
          processed_at?: string | null
          provider?: Database["public"]["Enums"]["payment_provider_enum"]
          provider_event_id?: string | null
        }
        Relationships: []
      }
      payment_settings: {
        Row: {
          academy_country: string
          allow_coupons: boolean
          checkout_session_expire_minutes: number
          created_at: string
          default_currency: Database["public"]["Enums"]["currency_enum"]
          id: string
          provider: Database["public"]["Enums"]["payment_provider_enum"]
          sandbox_enabled: boolean
          updated_at: string
          vat_percentage: number
        }
        Insert: {
          academy_country?: string
          allow_coupons?: boolean
          checkout_session_expire_minutes?: number
          created_at?: string
          default_currency?: Database["public"]["Enums"]["currency_enum"]
          id?: string
          provider?: Database["public"]["Enums"]["payment_provider_enum"]
          sandbox_enabled?: boolean
          updated_at?: string
          vat_percentage?: number
        }
        Update: {
          academy_country?: string
          allow_coupons?: boolean
          checkout_session_expire_minutes?: number
          created_at?: string
          default_currency?: Database["public"]["Enums"]["currency_enum"]
          id?: string
          provider?: Database["public"]["Enums"]["payment_provider_enum"]
          sandbox_enabled?: boolean
          updated_at?: string
          vat_percentage?: number
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: Database["public"]["Enums"]["currency_enum"]
          failure_reason: string | null
          id: string
          order_id: string
          paid_at: string | null
          provider: Database["public"]["Enums"]["payment_provider_enum"]
          provider_checkout_session_id: string | null
          provider_event_id: string | null
          provider_payment_id: string | null
          raw_response: Json
          status: Database["public"]["Enums"]["payment_status_enum"]
          transaction_reference: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_enum"]
          failure_reason?: string | null
          id?: string
          order_id: string
          paid_at?: string | null
          provider?: Database["public"]["Enums"]["payment_provider_enum"]
          provider_checkout_session_id?: string | null
          provider_event_id?: string | null
          provider_payment_id?: string | null
          raw_response?: Json
          status?: Database["public"]["Enums"]["payment_status_enum"]
          transaction_reference?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: Database["public"]["Enums"]["currency_enum"]
          failure_reason?: string | null
          id?: string
          order_id?: string
          paid_at?: string | null
          provider?: Database["public"]["Enums"]["payment_provider_enum"]
          provider_checkout_session_id?: string | null
          provider_event_id?: string | null
          provider_payment_id?: string | null
          raw_response?: Json
          status?: Database["public"]["Enums"]["payment_status_enum"]
          transaction_reference?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_classes: {
        Row: {
          assigned_at: string
          class_id: string
          profile_id: string
        }
        Insert: {
          assigned_at?: string
          class_id: string
          profile_id: string
        }
        Update: {
          assigned_at?: string
          class_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "academy_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_classes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_courses: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          course_id: string
          enrolled_at: string
          profile_id: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          course_id: string
          enrolled_at?: string
          profile_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          course_id?: string
          enrolled_at?: string
          profile_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_courses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "profile_courses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_lessons_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          is_completed: boolean
          last_accessed_at: string
          lesson_id: string
          minutes_watched: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          is_completed?: boolean
          last_accessed_at?: string
          lesson_id: string
          minutes_watched?: number
          profile_id: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          is_completed?: boolean
          last_accessed_at?: string
          lesson_id?: string
          minutes_watched?: number
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_lessons_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_lessons_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "profile_lessons_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_lessons_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_level: number | null
          display_name: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          password_hash: string | null
          role: string
          school_section: string | null
          school_track: string | null
          status: string
          total_minutes_active: number
          total_xp: number | null
          updated_at: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_level?: number | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          password_hash?: string | null
          role?: string
          school_section?: string | null
          school_track?: string | null
          status?: string
          total_minutes_active?: number
          total_xp?: number | null
          updated_at?: string
          user_type?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_level?: number | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          password_hash?: string | null
          role?: string
          school_section?: string | null
          school_track?: string | null
          status?: string
          total_minutes_active?: number
          total_xp?: number | null
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
      quiz_ai_reviews: {
        Row: {
          attempt_id: string
          completion_tokens: number | null
          confidence: number | null
          created_at: string
          elapsed_ms: number | null
          feedback: string
          grading_prompt: string | null
          id: string
          master_answer: string | null
          max_score: number
          model: string
          prompt_tokens: number | null
          provider: string
          question_id: string
          student_answer: string
          suggested_score: number
          system_prompt: string | null
        }
        Insert: {
          attempt_id: string
          completion_tokens?: number | null
          confidence?: number | null
          created_at?: string
          elapsed_ms?: number | null
          feedback: string
          grading_prompt?: string | null
          id?: string
          master_answer?: string | null
          max_score?: number
          model: string
          prompt_tokens?: number | null
          provider: string
          question_id: string
          student_answer: string
          suggested_score: number
          system_prompt?: string | null
        }
        Update: {
          attempt_id?: string
          completion_tokens?: number | null
          confidence?: number | null
          created_at?: string
          elapsed_ms?: number | null
          feedback?: string
          grading_prompt?: string | null
          id?: string
          master_answer?: string | null
          max_score?: number
          model?: string
          prompt_tokens?: number | null
          provider?: string
          question_id?: string
          student_answer?: string
          suggested_score?: number
          system_prompt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_ai_reviews_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_ai_reviews_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_answers: {
        Row: {
          attempt_id: string
          created_at: string
          id: string
          is_correct: boolean | null
          open_answer_text: string | null
          question_id: string
          score: number
          selected_option_id: string | null
        }
        Insert: {
          attempt_id: string
          created_at?: string
          id?: string
          is_correct?: boolean | null
          open_answer_text?: string | null
          question_id: string
          score?: number
          selected_option_id?: string | null
        }
        Update: {
          attempt_id?: string
          created_at?: string
          id?: string
          is_correct?: boolean | null
          open_answer_text?: string | null
          question_id?: string
          score?: number
          selected_option_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_answers_selected_option_id_fkey"
            columns: ["selected_option_id"]
            isOneToOne: false
            referencedRelation: "quiz_options"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_assignments: {
        Row: {
          assigned_at: string
          course_id: string
          due_at: string | null
          id: string
          is_visible: boolean
          quiz_id: string
        }
        Insert: {
          assigned_at?: string
          course_id: string
          due_at?: string | null
          id?: string
          is_visible?: boolean
          quiz_id: string
        }
        Update: {
          assigned_at?: string
          course_id?: string
          due_at?: string | null
          id?: string
          is_visible?: boolean
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_assignments_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          auto_score: number
          completed_at: string | null
          created_at: string
          final_score: number
          id: string
          quiz_id: string
          started_at: string
          status: Database["public"]["Enums"]["attempt_status"]
          student_id: string
          teacher_score: number
          xp_awarded: boolean | null
        }
        Insert: {
          auto_score?: number
          completed_at?: string | null
          created_at?: string
          final_score?: number
          id?: string
          quiz_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["attempt_status"]
          student_id: string
          teacher_score?: number
          xp_awarded?: boolean | null
        }
        Update: {
          auto_score?: number
          completed_at?: string | null
          created_at?: string
          final_score?: number
          id?: string
          quiz_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["attempt_status"]
          student_id?: string
          teacher_score?: number
          xp_awarded?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_options: {
        Row: {
          id: string
          is_correct: boolean
          question_id: string
          text: string
        }
        Insert: {
          id?: string
          is_correct?: boolean
          question_id: string
          text: string
        }
        Update: {
          id?: string
          is_correct?: boolean
          question_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          created_at: string
          id: string
          order_index: number
          points: number
          quiz_id: string
          text: string
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          order_index: number
          points: number
          quiz_id: string
          text: string
          type: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          created_at?: string
          id?: string
          order_index?: number
          points?: number
          quiz_id?: string
          text?: string
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_reviews: {
        Row: {
          attempt_id: string
          comment: string | null
          id: string
          question_id: string
          reviewed_at: string
          score: number
          teacher_id: string | null
        }
        Insert: {
          attempt_id: string
          comment?: string | null
          id?: string
          question_id: string
          reviewed_at?: string
          score?: number
          teacher_id?: string | null
        }
        Update: {
          attempt_id?: string
          comment?: string | null
          id?: string
          question_id?: string
          reviewed_at?: string
          score?: number
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_reviews_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_reviews_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_reviews_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          course_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          max_score: number
          module_id: string | null
          negative_mark: number
          passing_score: number
          penalty_enabled: boolean
          status: Database["public"]["Enums"]["quiz_status"]
          title: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          max_score?: number
          module_id?: string | null
          negative_mark?: number
          passing_score?: number
          penalty_enabled?: boolean
          status?: Database["public"]["Enums"]["quiz_status"]
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          max_score?: number
          module_id?: string | null
          negative_mark?: number
          passing_score?: number
          penalty_enabled?: boolean
          status?: Database["public"]["Enums"]["quiz_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "quizzes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          created_at: string
          description: string
          id: string
          is_visible: boolean
          language: string
          provider: string | null
          rating: number | null
          tags: string[]
          title: string
          type: string
          typeVariant: string
          url: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_visible?: boolean
          language?: string
          provider?: string | null
          rating?: number | null
          tags?: string[]
          title: string
          type: string
          typeVariant?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_visible?: boolean
          language?: string
          provider?: string | null
          rating?: number | null
          tags?: string[]
          title?: string
          type?: string
          typeVariant?: string
          url?: string
        }
        Relationships: []
      }
      shopping_cart_items: {
        Row: {
          cart_id: string
          course_id: string
          created_at: string
          id: string
          quantity: number
          unit_price: number
          updated_at: string
        }
        Insert: {
          cart_id: string
          course_id: string
          created_at?: string
          id?: string
          quantity?: number
          unit_price: number
          updated_at?: string
        }
        Update: {
          cart_id?: string
          course_id?: string
          created_at?: string
          id?: string
          quantity?: number
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "shopping_carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_cart_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_cart_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      shopping_carts: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          status: Database["public"]["Enums"]["cart_status_enum"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          status?: Database["public"]["Enums"]["cart_status_enum"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["cart_status_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_carts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string | null
          badge_id: string
          course_id: string | null
          id: string
          profile_id: string
          quiz_id: string | null
        }
        Insert: {
          awarded_at?: string | null
          badge_id: string
          course_id?: string | null
          id?: string
          profile_id: string
          quiz_id?: string | null
        }
        Update: {
          awarded_at?: string | null
          badge_id?: string
          course_id?: string | null
          id?: string
          profile_id?: string
          quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "user_badges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_course_stats: {
        Row: {
          course_id: string
          course_level: number
          course_xp: number
          created_at: string | null
          id: string
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          course_id: string
          course_level?: number
          course_xp?: number
          created_at?: string | null
          id?: string
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          course_level?: number
          course_xp?: number
          created_at?: string | null
          id?: string
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_course_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_course_stats_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "user_course_stats_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_page_views: {
        Row: {
          course_slug: string | null
          id: string
          lesson_slug: string | null
          path: string
          profile_id: string | null
          viewed_at: string
        }
        Insert: {
          course_slug?: string | null
          id?: string
          lesson_slug?: string | null
          path: string
          profile_id?: string | null
          viewed_at?: string
        }
        Update: {
          course_slug?: string | null
          id?: string
          lesson_slug?: string | null
          path?: string
          profile_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_page_views_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          login_at: string
          logout_at: string | null
          profile_id: string
          session_duration_seconds: number | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          login_at?: string
          logout_at?: string | null
          profile_id: string
          session_duration_seconds?: number | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          login_at?: string
          logout_at?: string | null
          profile_id?: string
          session_duration_seconds?: number | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      student_courses: {
        Row: {
          category: string | null
          class_id: string | null
          class_name: string | null
          course_assigned_at: string | null
          course_description: string | null
          course_id: string | null
          course_slug: string | null
          course_title: string | null
          cover_image: string | null
          difficulty: string | null
          estimated_hours: number | null
          profile_id: string | null
          published: boolean | null
          teacher: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "academy_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_classes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      award_module_badge: {
        Args: { p_lesson_id: string; p_user_id: string }
        Returns: {
          awarded: boolean
          badge_code: string
          badge_title: string
          course_level: number
          course_xp: number
          global_level: number
          global_total_xp: number
          xp_reward: number
        }[]
      }
      award_quiz_badge: {
        Args: {
          p_max_score?: number
          p_quiz_code: string
          p_score?: number
          p_user_id: string
        }
        Returns: {
          already_unlocked: boolean
          badge_icon: string
          badge_title: string
          new_level: number
          new_total_xp: number
          xp_gained: number
        }[]
      }
      calculate_level: { Args: { p_xp: number }; Returns: number }
      get_admin_courses_gamification_stats: {
        Args: never
        Returns: {
          avg_xp_per_student: number
          course_id: string
          course_title: string
          total_badges_awarded: number
          total_students_active: number
          total_xp_awarded: number
        }[]
      }
      get_user_gamification_overview: {
        Args: { p_user_id: string }
        Returns: Json
      }
      increment_coupon_redemptions: {
        Args: { coupon_id_param: string }
        Returns: undefined
      }
      increment_profile_minutes: {
        Args: { user_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
      track_lesson_activity: {
        Args: {
          p_completion_threshold?: number
          p_course_id: string
          p_lesson_id: string
          p_minutes_to_add: number
          p_user_id: string
        }
        Returns: {
          is_completed: boolean
          last_accessed_at: string
          minutes_watched: number
          total_minutes_active: number
          updated_at: string
        }[]
      }
    }
    Enums: {
      attempt_status: "submitted" | "graded"
      cart_status_enum: "ACTIVE" | "CHECKOUT" | "ABANDONED" | "EXPIRED"
      currency_enum: "EUR" | "USD" | "GBP"
      discount_type_enum: "PERCENTAGE" | "FIXED"
      order_status_enum:
        | "PENDING"
        | "CHECKOUT_CREATED"
        | "PAYMENT_PROCESSING"
        | "PAID"
        | "FULFILLED"
        | "FAILED"
        | "EXPIRED"
        | "CANCELLED"
        | "REFUNDED"
      payment_provider_enum: "STRIPE" | "PAYPAL" | "MOLLIE"
      payment_status_enum:
        | "CREATED"
        | "AUTHORIZED"
        | "CAPTURED"
        | "FAILED"
        | "REFUNDED"
      question_type: "multiple_choice" | "open_ended"
      quiz_status: "draft" | "active"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      attempt_status: ["submitted", "graded"],
      cart_status_enum: ["ACTIVE", "CHECKOUT", "ABANDONED", "EXPIRED"],
      currency_enum: ["EUR", "USD", "GBP"],
      discount_type_enum: ["PERCENTAGE", "FIXED"],
      order_status_enum: [
        "PENDING",
        "CHECKOUT_CREATED",
        "PAYMENT_PROCESSING",
        "PAID",
        "FULFILLED",
        "FAILED",
        "EXPIRED",
        "CANCELLED",
        "REFUNDED",
      ],
      payment_provider_enum: ["STRIPE", "PAYPAL", "MOLLIE"],
      payment_status_enum: [
        "CREATED",
        "AUTHORIZED",
        "CAPTURED",
        "FAILED",
        "REFUNDED",
      ],
      question_type: ["multiple_choice", "open_ended"],
      quiz_status: ["draft", "active"],
    },
  },
} as const
