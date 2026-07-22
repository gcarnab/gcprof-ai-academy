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
      course_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
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
          order_index: number
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
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
      course_quizzes: {
        Row: {
          course_id: string
          quiz_id: string
        }
        Insert: {
          course_id: string
          quiz_id: string
        }
        Update: {
          course_id?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "student_courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_quizzes_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          allowed_classes: string[]
          category: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          estimated_hours: number | null
          id: string
          published: boolean | null
          slug: string
          teacher: string | null
          title: string
          updated_at: string
        }
        Insert: {
          allowed_classes?: string[]
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          published?: boolean | null
          slug: string
          teacher?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          allowed_classes?: string[]
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_hours?: number | null
          id?: string
          published?: boolean | null
          slug?: string
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
      lessons: {
        Row: {
          content_type: string
          created_at: string
          duration: number
          google_drive_url: string | null
          id: string
          module_id: string
          quiz_id: string | null
          sort_order: number
          title: string
          youtube_url: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          duration: number
          google_drive_url?: string | null
          id?: string
          module_id: string
          quiz_id?: string | null
          sort_order?: number
          title: string
          youtube_url?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          duration?: number
          google_drive_url?: string | null
          id?: string
          module_id?: string
          quiz_id?: string | null
          sort_order?: number
          title?: string
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
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
          course_id: string | null
          is_completed: boolean
          last_accessed_at: string
          lesson_id: string
          minutes_watched: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          is_completed?: boolean
          last_accessed_at?: string
          lesson_id: string
          minutes_watched?: number
          profile_id: string
          updated_at?: string
        }
        Update: {
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
          updated_at: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
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
          updated_at?: string
          user_type?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
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
          updated_at?: string
          user_type?: string
        }
        Relationships: []
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
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          max_score: number
          negative_mark: number
          passing_score: number
          penalty_enabled: boolean
          status: Database["public"]["Enums"]["quiz_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          max_score?: number
          negative_mark?: number
          passing_score?: number
          penalty_enabled?: boolean
          status?: Database["public"]["Enums"]["quiz_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          max_score?: number
          negative_mark?: number
          passing_score?: number
          penalty_enabled?: boolean
          status?: Database["public"]["Enums"]["quiz_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      increment_profile_minutes: {
        Args: { user_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      attempt_status: "submitted" | "graded"
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
      question_type: ["multiple_choice", "open_ended"],
      quiz_status: ["draft", "active"],
    },
  },
} as const
