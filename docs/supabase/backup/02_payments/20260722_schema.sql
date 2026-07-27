


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."attempt_status" AS ENUM (
    'submitted',
    'graded'
);


ALTER TYPE "public"."attempt_status" OWNER TO "postgres";


CREATE TYPE "public"."cart_status_enum" AS ENUM (
    'ACTIVE',
    'CHECKOUT',
    'ABANDONED',
    'EXPIRED'
);


ALTER TYPE "public"."cart_status_enum" OWNER TO "postgres";


CREATE TYPE "public"."currency_enum" AS ENUM (
    'EUR',
    'USD',
    'GBP'
);


ALTER TYPE "public"."currency_enum" OWNER TO "postgres";


CREATE TYPE "public"."discount_type_enum" AS ENUM (
    'PERCENTAGE',
    'FIXED'
);


ALTER TYPE "public"."discount_type_enum" OWNER TO "postgres";


CREATE TYPE "public"."order_status_enum" AS ENUM (
    'PENDING',
    'CHECKOUT_CREATED',
    'PAYMENT_PROCESSING',
    'PAID',
    'FULFILLED',
    'FAILED',
    'EXPIRED',
    'CANCELLED',
    'REFUNDED'
);


ALTER TYPE "public"."order_status_enum" OWNER TO "postgres";


CREATE TYPE "public"."payment_provider_enum" AS ENUM (
    'STRIPE',
    'PAYPAL',
    'MOLLIE'
);


ALTER TYPE "public"."payment_provider_enum" OWNER TO "postgres";


CREATE TYPE "public"."payment_status_enum" AS ENUM (
    'CREATED',
    'AUTHORIZED',
    'CAPTURED',
    'FAILED',
    'REFUNDED'
);


ALTER TYPE "public"."payment_status_enum" OWNER TO "postgres";


CREATE TYPE "public"."question_type" AS ENUM (
    'multiple_choice',
    'open_ended'
);


ALTER TYPE "public"."question_type" OWNER TO "postgres";


CREATE TYPE "public"."quiz_status" AS ENUM (
    'draft',
    'active'
);


ALTER TYPE "public"."quiz_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fn_generate_order_number"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN

    IF NEW.order_number IS NULL
    THEN

        NEW.order_number :=
            'ORD-' ||
            TO_CHAR(NOW(),'YYYY') ||
            '-' ||
            LPAD(nextval('public.order_number_seq')::TEXT,6,'0');

    END IF;

    RETURN NEW;

END;
$$;


ALTER FUNCTION "public"."fn_generate_order_number"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fn_prevent_duplicate_webhook"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN

    IF EXISTS
    (
        SELECT 1

        FROM public.payment_logs

        WHERE provider_event_id = NEW.provider_event_id
    )
    THEN

        RAISE EXCEPTION
        'Webhook event already processed: %',
        NEW.provider_event_id;

    END IF;

    RETURN NEW;

END;
$$;


ALTER FUNCTION "public"."fn_prevent_duplicate_webhook"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fn_set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN

    NEW.updated_at := NOW();

    RETURN NEW;

END;
$$;


ALTER FUNCTION "public"."fn_set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fn_sync_order_status"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN

    IF NEW.status = 'CAPTURED'
    THEN

        UPDATE public.orders

        SET

            status='PAID'

        WHERE

            id=NEW.order_id;

    END IF;

    RETURN NEW;

END;
$$;


ALTER FUNCTION "public"."fn_sync_order_status"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_auto_enrollment_on_new_course"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  INSERT INTO public.profile_courses (profile_id, course_id)
  SELECT pc.profile_id, NEW.course_id
  FROM public.profile_classes pc
  JOIN public.profiles p ON pc.profile_id = p.id
  WHERE pc.class_id = NEW.class_id
    AND p.status = 'active' -- 🌟 Filtra: solo utenti abilitati (es. 'active')
  ON CONFLICT (profile_id, course_id) DO NOTHING; -- 🛡️ Safe guard: ignora chi è già iscritto senza far fallire l'azione

  RETURN NEW;
END;$$;


ALTER FUNCTION "public"."handle_auto_enrollment_on_new_course"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_auto_enrollment_on_signup"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profile_courses (profile_id, course_id)
  SELECT NEW.profile_id, cc.course_id
  FROM public.course_classes cc
  WHERE cc.class_id = NEW.class_id
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_auto_enrollment_on_signup"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'JM'),
    'student',
    'pending'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.profiles
  SET total_minutes_active = total_minutes_active + 1
  WHERE id = user_id;
END;
$$;


ALTER FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") IS 'Incrementa in modo atomico di 1 minuto il tempo di attività dello studente';



CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_admin_deletion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    -- Controlla sia il vecchio campo 'role' che il nuovo 'user_type'
    IF OLD.role = 'admin' OR OLD.user_type = 'ADMIN' THEN
        RAISE EXCEPTION 'OPERAZIONE BLOCCATA: Impossibile eliminare il profilo ADMIN (%)', COALESCE(OLD.email, OLD.id::text);
    END IF;
    RETURN OLD;
END;
$$;


ALTER FUNCTION "public"."prevent_admin_deletion"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_set_timestamp"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."trigger_set_timestamp"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."academy_classes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."academy_classes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."coupon_redemptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "coupon_id" "uuid" NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "order_id" "uuid" NOT NULL,
    "redeemed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."coupon_redemptions" OWNER TO "postgres";


COMMENT ON TABLE "public"."coupon_redemptions" IS 'Storico utilizzo coupon';



CREATE TABLE IF NOT EXISTS "public"."coupons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "code" character varying(50) NOT NULL,
    "description" "text",
    "discount_type" "public"."discount_type_enum" NOT NULL,
    "discount_value" numeric(10,2) NOT NULL,
    "valid_from" timestamp with time zone DEFAULT "now"() NOT NULL,
    "valid_to" timestamp with time zone,
    "max_redemptions" integer,
    "current_redemptions" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."coupons" OWNER TO "postgres";


COMMENT ON TABLE "public"."coupons" IS 'Coupon promozionali';



CREATE TABLE IF NOT EXISTS "public"."course_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(255) NOT NULL,
    "slug" character varying(255) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."course_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."course_classes" (
    "course_id" "uuid" NOT NULL,
    "class_id" "uuid" NOT NULL,
    "assigned_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."course_classes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."course_lessons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "module_id" "uuid",
    "title" character varying(255) NOT NULL,
    "slug" character varying(255) NOT NULL,
    "video_url" "text",
    "content" "text",
    "order_index" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "content_type" character varying(50) DEFAULT 'video'::character varying,
    "duration" integer DEFAULT 15,
    "external_url" "text",
    CONSTRAINT "course_lessons_content_type_check" CHECK ((("content_type")::"text" = ANY ((ARRAY['video'::character varying, 'document'::character varying, 'colab'::character varying, 'markdown'::character varying, 'sandbox'::character varying, 'text'::character varying, 'file'::character varying, 'link'::character varying])::"text"[])))
);


ALTER TABLE "public"."course_lessons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."course_modules" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "course_id" "uuid",
    "title" character varying(255) NOT NULL,
    "order_index" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "is_preview" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."course_modules" OWNER TO "postgres";


COMMENT ON COLUMN "public"."course_modules"."is_preview" IS 'Modulo visibile anche agli utenti non iscritti al corso.';



CREATE TABLE IF NOT EXISTS "public"."course_quizzes" (
    "course_id" "uuid" NOT NULL,
    "quiz_id" "uuid" NOT NULL
);


ALTER TABLE "public"."course_quizzes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."courses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" character varying(255) NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "category" character varying(100) DEFAULT 'Informatica'::character varying,
    "difficulty" character varying(50) DEFAULT 'Facile'::character varying,
    "teacher" character varying(255) DEFAULT 'Prof. G. Carnabuci'::character varying,
    "estimated_hours" integer DEFAULT 50,
    "cover_image" "text",
    "published" boolean DEFAULT true,
    "allowed_classes" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "price" numeric(10,2) DEFAULT 0.00 NOT NULL,
    "currency" "public"."currency_enum" DEFAULT 'EUR'::"public"."currency_enum" NOT NULL,
    "is_paid" boolean DEFAULT false NOT NULL,
    "stripe_product_id" "text",
    "stripe_price_id" "text"
);


ALTER TABLE "public"."courses" OWNER TO "postgres";


COMMENT ON COLUMN "public"."courses"."price" IS 'Prezzo del corso';



COMMENT ON COLUMN "public"."courses"."currency" IS 'Valuta del corso';



COMMENT ON COLUMN "public"."courses"."is_paid" IS 'TRUE se il corso è acquistabile';



COMMENT ON COLUMN "public"."courses"."stripe_product_id" IS 'Stripe Product ID';



COMMENT ON COLUMN "public"."courses"."stripe_price_id" IS 'Stripe Price ID';



CREATE TABLE IF NOT EXISTS "public"."document_configs" (
    "id" "text" NOT NULL,
    "label" "text" NOT NULL,
    "file_path" "text" NOT NULL,
    "is_active" boolean DEFAULT true,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."document_configs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."lessons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "module_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "duration" integer NOT NULL,
    "content_type" "text" NOT NULL,
    "youtube_url" "text",
    "google_drive_url" "text",
    "quiz_id" "uuid",
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "lessons_content_type_check" CHECK (("content_type" = ANY (ARRAY['video'::"text", 'document'::"text", 'mixed'::"text"])))
);


ALTER TABLE "public"."lessons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."mail_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "template_key" "text" NOT NULL,
    "recipient" "text" NOT NULL,
    "subject" "text" NOT NULL,
    "status" "text" NOT NULL,
    "provider" "text" DEFAULT 'RESEND'::"text" NOT NULL,
    "provider_id" "text",
    "error_message" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."mail_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."mail_settings" (
    "id" "text" NOT NULL,
    "value" "text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."mail_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."mail_templates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "template_key" "text" NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" "text",
    "subject" character varying(255) NOT NULL,
    "title_override" character varying(255),
    "body_text_override" "text",
    "enabled" boolean DEFAULT true NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_by" "uuid"
);


ALTER TABLE "public"."mail_templates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."order_items" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "course_title_snapshot" "text" NOT NULL,
    "unit_price" numeric(10,2) NOT NULL,
    "quantity" integer DEFAULT 1 NOT NULL,
    "line_total" numeric(10,2) NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."order_items" OWNER TO "postgres";


COMMENT ON TABLE "public"."order_items" IS 'Snapshot dei corsi acquistati';



COMMENT ON COLUMN "public"."order_items"."course_title_snapshot" IS 'Titolo del corso al momento dell''acquisto';



COMMENT ON COLUMN "public"."order_items"."metadata" IS 'Snapshot estendibile del corso';



CREATE SEQUENCE IF NOT EXISTS "public"."order_number_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."order_number_seq" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_number" character varying(50) NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "status" "public"."order_status_enum" DEFAULT 'PENDING'::"public"."order_status_enum" NOT NULL,
    "subtotal" numeric(10,2) DEFAULT 0.00 NOT NULL,
    "discount" numeric(10,2) DEFAULT 0.00 NOT NULL,
    "tax" numeric(10,2) DEFAULT 0.00 NOT NULL,
    "total" numeric(10,2) DEFAULT 0.00 NOT NULL,
    "currency" "public"."currency_enum" DEFAULT 'EUR'::"public"."currency_enum" NOT NULL,
    "payment_provider" "public"."payment_provider_enum" DEFAULT 'STRIPE'::"public"."payment_provider_enum" NOT NULL,
    "payment_provider_order_id" "text",
    "coupon_id" "uuid",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."orders" OWNER TO "postgres";


COMMENT ON TABLE "public"."orders" IS 'Ordini generati dal checkout';



COMMENT ON COLUMN "public"."orders"."order_number" IS 'Numero ordine leggibile (es. ORD-2026-000001)';



COMMENT ON COLUMN "public"."orders"."payment_provider_order_id" IS 'Identificativo restituito dal provider';



COMMENT ON COLUMN "public"."orders"."metadata" IS 'Informazioni aggiuntive (browser, IP, user agent, note...)';



CREATE TABLE IF NOT EXISTS "public"."password_reset_tokens" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "token" "text" NOT NULL,
    "expires_at" timestamp without time zone NOT NULL,
    "used" boolean DEFAULT false NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."password_reset_tokens" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."payment_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "provider" "public"."payment_provider_enum" DEFAULT 'STRIPE'::"public"."payment_provider_enum" NOT NULL,
    "provider_event_id" "text",
    "event" character varying(120) NOT NULL,
    "payload" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "processed" boolean DEFAULT false NOT NULL,
    "processed_at" timestamp with time zone,
    "error" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."payment_logs" OWNER TO "postgres";


COMMENT ON TABLE "public"."payment_logs" IS 'Audit trail dei webhook ricevuti';



COMMENT ON COLUMN "public"."payment_logs"."provider_event_id" IS 'Evento univoco del provider';



COMMENT ON COLUMN "public"."payment_logs"."payload" IS 'Payload originale ricevuto dal provider';



COMMENT ON COLUMN "public"."payment_logs"."processed" IS 'TRUE se il webhook è stato elaborato';



COMMENT ON COLUMN "public"."payment_logs"."processed_at" IS 'Timestamp di elaborazione';



CREATE TABLE IF NOT EXISTS "public"."payment_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "provider" "public"."payment_provider_enum" DEFAULT 'STRIPE'::"public"."payment_provider_enum" NOT NULL,
    "sandbox_enabled" boolean DEFAULT true NOT NULL,
    "default_currency" "public"."currency_enum" DEFAULT 'EUR'::"public"."currency_enum" NOT NULL,
    "vat_percentage" numeric(5,2) DEFAULT 0.00 NOT NULL,
    "allow_coupons" boolean DEFAULT true NOT NULL,
    "academy_country" character varying(2) DEFAULT 'IT'::character varying NOT NULL,
    "checkout_session_expire_minutes" integer DEFAULT 30 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."payment_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."payment_settings" IS 'Configurazione funzionale della feature Payments';



COMMENT ON COLUMN "public"."payment_settings"."provider" IS 'Provider attualmente attivo';



COMMENT ON COLUMN "public"."payment_settings"."sandbox_enabled" IS 'TRUE = ambiente di test';



COMMENT ON COLUMN "public"."payment_settings"."default_currency" IS 'Valuta predefinita';



COMMENT ON COLUMN "public"."payment_settings"."vat_percentage" IS 'IVA applicata agli ordini';



COMMENT ON COLUMN "public"."payment_settings"."allow_coupons" IS 'Abilita/disabilita i coupon';



COMMENT ON COLUMN "public"."payment_settings"."checkout_session_expire_minutes" IS 'Durata massima della checkout session';



CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_id" "uuid" NOT NULL,
    "provider" "public"."payment_provider_enum" DEFAULT 'STRIPE'::"public"."payment_provider_enum" NOT NULL,
    "provider_payment_id" "text",
    "provider_checkout_session_id" "text",
    "provider_event_id" "text",
    "status" "public"."payment_status_enum" DEFAULT 'CREATED'::"public"."payment_status_enum" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "currency" "public"."currency_enum" DEFAULT 'EUR'::"public"."currency_enum" NOT NULL,
    "transaction_reference" "text",
    "failure_reason" "text",
    "paid_at" timestamp with time zone,
    "raw_response" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."payments" OWNER TO "postgres";


COMMENT ON TABLE "public"."payments" IS 'Transazioni economiche';



COMMENT ON COLUMN "public"."payments"."provider_payment_id" IS 'Payment Intent / Charge ID';



COMMENT ON COLUMN "public"."payments"."provider_checkout_session_id" IS 'Checkout Session ID';



COMMENT ON COLUMN "public"."payments"."provider_event_id" IS 'Ultimo evento webhook associato';



COMMENT ON COLUMN "public"."payments"."failure_reason" IS 'Motivo dell''eventuale fallimento';



COMMENT ON COLUMN "public"."payments"."raw_response" IS 'Payload completo restituito dal provider';



CREATE TABLE IF NOT EXISTS "public"."profile_classes" (
    "profile_id" "uuid" NOT NULL,
    "class_id" "uuid" NOT NULL,
    "assigned_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."profile_classes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profile_courses" (
    "profile_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "enrolled_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "status" character varying DEFAULT 'pending'::character varying NOT NULL,
    "approved_at" timestamp with time zone,
    "approved_by" "uuid",
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."profile_courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profile_lessons_progress" (
    "profile_id" "uuid" NOT NULL,
    "lesson_id" "uuid" NOT NULL,
    "course_id" "uuid",
    "is_completed" boolean DEFAULT false NOT NULL,
    "minutes_watched" integer DEFAULT 0 NOT NULL,
    "last_accessed_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."profile_lessons_progress" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "first_name" character varying(255),
    "last_name" character varying(255),
    "display_name" character varying(510),
    "role" character varying(50) DEFAULT 'student'::character varying NOT NULL,
    "status" character varying(50) DEFAULT 'pending'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "email" "text",
    "password_hash" "text",
    "avatar_url" "text",
    "total_minutes_active" integer DEFAULT 0 NOT NULL,
    "user_type" character varying DEFAULT 'SCHOOL_STUDENT'::character varying NOT NULL,
    "school_track" "text",
    "school_section" "text",
    CONSTRAINT "check_role" CHECK ((("role")::"text" = ANY ((ARRAY['admin'::character varying, 'student'::character varying])::"text"[]))),
    CONSTRAINT "check_status" CHECK ((("status")::"text" = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'blocked'::character varying])::"text"[]))),
    CONSTRAINT "check_user_type" CHECK ((("user_type")::"text" = ANY ((ARRAY['SCHOOL_STUDENT'::character varying, 'EXTERNAL_STUDENT'::character varying, 'TEACHER'::character varying, 'ADMIN'::character varying])::"text"[])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_answers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "attempt_id" "uuid" NOT NULL,
    "question_id" "uuid" NOT NULL,
    "selected_option_id" "uuid",
    "open_answer_text" "text",
    "is_correct" boolean,
    "score" numeric(4,2) DEFAULT 0.00 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."quiz_answers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_assignments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "quiz_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "assigned_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "due_at" timestamp with time zone,
    "is_visible" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."quiz_assignments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_attempts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "quiz_id" "uuid" NOT NULL,
    "student_id" "uuid" NOT NULL,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "completed_at" timestamp with time zone,
    "auto_score" numeric(4,2) DEFAULT 0.00 NOT NULL,
    "teacher_score" numeric(3,1) DEFAULT 0.00 NOT NULL,
    "final_score" numeric(4,2) DEFAULT 0.00 NOT NULL,
    "status" "public"."attempt_status" DEFAULT 'submitted'::"public"."attempt_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."quiz_attempts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_options" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "question_id" "uuid" NOT NULL,
    "text" "text" NOT NULL,
    "is_correct" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."quiz_options" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_questions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "quiz_id" "uuid" NOT NULL,
    "type" "public"."question_type" NOT NULL,
    "order_index" integer NOT NULL,
    "text" "text" NOT NULL,
    "points" numeric(3,2) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."quiz_questions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_reviews" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "attempt_id" "uuid" NOT NULL,
    "teacher_id" "uuid",
    "question_id" "uuid" NOT NULL,
    "score" numeric(3,1) DEFAULT 0.0 NOT NULL,
    "comment" "text",
    "reviewed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."quiz_reviews" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quizzes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text",
    "status" "public"."quiz_status" DEFAULT 'draft'::"public"."quiz_status" NOT NULL,
    "penalty_enabled" boolean DEFAULT false NOT NULL,
    "negative_mark" numeric(3,2) DEFAULT 0.25 NOT NULL,
    "max_score" numeric(4,2) DEFAULT 10.00 NOT NULL,
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "passing_score" numeric(5,2) DEFAULT 60.00 NOT NULL
);


ALTER TABLE "public"."quizzes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resources" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "url" "text" NOT NULL,
    "provider" "text",
    "type" "text" NOT NULL,
    "typeVariant" "text" DEFAULT 'default'::"text" NOT NULL,
    "rating" smallint DEFAULT 5,
    "tags" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "language" "text" DEFAULT 'English'::"text" NOT NULL,
    "is_visible" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."resources" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."shopping_cart_items" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "cart_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "unit_price" numeric(10,2) NOT NULL,
    "quantity" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."shopping_cart_items" OWNER TO "postgres";


COMMENT ON TABLE "public"."shopping_cart_items" IS 'Snapshot dei corsi presenti nel carrello';



CREATE TABLE IF NOT EXISTS "public"."shopping_carts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "status" "public"."cart_status_enum" DEFAULT 'ACTIVE'::"public"."cart_status_enum" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."shopping_carts" OWNER TO "postgres";


COMMENT ON TABLE "public"."shopping_carts" IS 'Carrello persistente dello studente';



CREATE OR REPLACE VIEW "public"."student_courses" WITH ("security_invoker"='true') AS
 SELECT "pc"."profile_id",
    "pc"."class_id",
    "ac"."name" AS "class_name",
    "c"."id" AS "course_id",
    "c"."slug" AS "course_slug",
    "c"."title" AS "course_title",
    "c"."description" AS "course_description",
    "c"."category",
    "c"."difficulty",
    "c"."teacher",
    "c"."estimated_hours",
    "c"."cover_image",
    "c"."published",
    "cc"."assigned_at" AS "course_assigned_at"
   FROM ((("public"."profile_classes" "pc"
     JOIN "public"."academy_classes" "ac" ON (("pc"."class_id" = "ac"."id")))
     JOIN "public"."course_classes" "cc" ON (("pc"."class_id" = "cc"."class_id")))
     JOIN "public"."courses" "c" ON (("cc"."course_id" = "c"."id")));


ALTER VIEW "public"."student_courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_page_views" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid",
    "path" "text" NOT NULL,
    "course_slug" "text",
    "lesson_slug" "text",
    "viewed_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."user_page_views" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "login_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "logout_at" timestamp with time zone,
    "session_duration_seconds" integer,
    "ip_address" "text",
    "user_agent" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_sessions" OWNER TO "postgres";


ALTER TABLE ONLY "public"."academy_classes"
    ADD CONSTRAINT "academy_classes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."academy_classes"
    ADD CONSTRAINT "academy_classes_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."coupon_redemptions"
    ADD CONSTRAINT "coupon_redemptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."course_categories"
    ADD CONSTRAINT "course_categories_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."course_categories"
    ADD CONSTRAINT "course_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."course_categories"
    ADD CONSTRAINT "course_categories_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."course_classes"
    ADD CONSTRAINT "course_classes_pkey" PRIMARY KEY ("course_id", "class_id");



ALTER TABLE ONLY "public"."course_lessons"
    ADD CONSTRAINT "course_lessons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."course_modules"
    ADD CONSTRAINT "course_modules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."course_modules"
    ADD CONSTRAINT "course_modules_unique_title" UNIQUE ("course_id", "title");



ALTER TABLE ONLY "public"."course_quizzes"
    ADD CONSTRAINT "course_quizzes_pkey" PRIMARY KEY ("course_id", "quiz_id");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "courses_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."document_configs"
    ADD CONSTRAINT "document_configs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_unique_sort" UNIQUE ("module_id", "sort_order");



ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_unique_title" UNIQUE ("module_id", "title");



ALTER TABLE ONLY "public"."mail_logs"
    ADD CONSTRAINT "mail_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mail_settings"
    ADD CONSTRAINT "mail_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mail_templates"
    ADD CONSTRAINT "mail_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mail_templates"
    ADD CONSTRAINT "mail_templates_template_key_key" UNIQUE ("template_key");



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_order_number_key" UNIQUE ("order_number");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."password_reset_tokens"
    ADD CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."password_reset_tokens"
    ADD CONSTRAINT "password_reset_tokens_token_key" UNIQUE ("token");



ALTER TABLE ONLY "public"."payment_logs"
    ADD CONSTRAINT "payment_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payment_logs"
    ADD CONSTRAINT "payment_logs_provider_event_id_key" UNIQUE ("provider_event_id");



ALTER TABLE ONLY "public"."payment_settings"
    ADD CONSTRAINT "payment_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_provider_checkout_session_id_key" UNIQUE ("provider_checkout_session_id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_provider_payment_id_key" UNIQUE ("provider_payment_id");



ALTER TABLE ONLY "public"."profile_classes"
    ADD CONSTRAINT "profile_classes_pkey" PRIMARY KEY ("profile_id", "class_id");



ALTER TABLE ONLY "public"."profile_courses"
    ADD CONSTRAINT "profile_courses_pkey" PRIMARY KEY ("profile_id", "course_id");



ALTER TABLE ONLY "public"."profile_courses"
    ADD CONSTRAINT "profile_courses_profile_course_unique" UNIQUE ("profile_id", "course_id");



ALTER TABLE ONLY "public"."profile_lessons_progress"
    ADD CONSTRAINT "profile_lessons_progress_pkey" PRIMARY KEY ("profile_id", "lesson_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_assignments"
    ADD CONSTRAINT "quiz_assignments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_options"
    ADD CONSTRAINT "quiz_options_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_questions"
    ADD CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_assignments"
    ADD CONSTRAINT "quiz_quiz_course_unique" UNIQUE ("quiz_id", "course_id");



ALTER TABLE ONLY "public"."quiz_reviews"
    ADD CONSTRAINT "quiz_reviews_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resources"
    ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "uq_cart_course" UNIQUE ("cart_id", "course_id");



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "uq_cart_profile" UNIQUE ("profile_id");



ALTER TABLE ONLY "public"."coupon_redemptions"
    ADD CONSTRAINT "uq_coupon_order" UNIQUE ("coupon_id", "order_id");



ALTER TABLE ONLY "public"."user_page_views"
    ADD CONSTRAINT "user_page_views_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_answers_attempt" ON "public"."quiz_answers" USING "btree" ("attempt_id");



CREATE INDEX "idx_answers_question" ON "public"."quiz_answers" USING "btree" ("question_id");



CREATE INDEX "idx_attempt_quiz" ON "public"."quiz_attempts" USING "btree" ("quiz_id");



CREATE INDEX "idx_attempt_student" ON "public"."quiz_attempts" USING "btree" ("student_id");



CREATE INDEX "idx_cart_items_cart" ON "public"."shopping_cart_items" USING "btree" ("cart_id");



CREATE INDEX "idx_cart_items_course" ON "public"."shopping_cart_items" USING "btree" ("course_id");



CREATE INDEX "idx_coupon_active" ON "public"."coupons" USING "btree" ("is_active");



CREATE INDEX "idx_coupon_code" ON "public"."coupons" USING "btree" ("code");



CREATE INDEX "idx_coupon_redemptions_coupon" ON "public"."coupon_redemptions" USING "btree" ("coupon_id");



CREATE INDEX "idx_coupon_redemptions_profile" ON "public"."coupon_redemptions" USING "btree" ("profile_id");



CREATE INDEX "idx_course_modules_course" ON "public"."course_modules" USING "btree" ("course_id");



CREATE INDEX "idx_course_quizzes_course" ON "public"."course_quizzes" USING "btree" ("course_id");



CREATE INDEX "idx_course_quizzes_quiz" ON "public"."course_quizzes" USING "btree" ("quiz_id");



CREATE INDEX "idx_courses_slug" ON "public"."courses" USING "btree" ("slug");



CREATE INDEX "idx_lessons_module" ON "public"."lessons" USING "btree" ("module_id");



CREATE INDEX "idx_lessons_quiz" ON "public"."lessons" USING "btree" ("quiz_id");



CREATE INDEX "idx_mail_logs_created" ON "public"."mail_logs" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_mail_logs_recipient" ON "public"."mail_logs" USING "btree" ("recipient");



CREATE INDEX "idx_mail_logs_template" ON "public"."mail_logs" USING "btree" ("template_key");



CREATE INDEX "idx_mail_templates_key" ON "public"."mail_templates" USING "btree" ("template_key");



CREATE INDEX "idx_order_items_course" ON "public"."order_items" USING "btree" ("course_id");



CREATE INDEX "idx_order_items_order" ON "public"."order_items" USING "btree" ("order_id");



CREATE INDEX "idx_orders_created" ON "public"."orders" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_orders_number" ON "public"."orders" USING "btree" ("order_number");



CREATE INDEX "idx_orders_profile" ON "public"."orders" USING "btree" ("profile_id");



CREATE INDEX "idx_orders_status" ON "public"."orders" USING "btree" ("status");



CREATE INDEX "idx_page_views_course_slug" ON "public"."user_page_views" USING "btree" ("course_slug") WHERE ("course_slug" IS NOT NULL);



CREATE INDEX "idx_page_views_profile_id" ON "public"."user_page_views" USING "btree" ("profile_id");



CREATE INDEX "idx_page_views_viewed_at" ON "public"."user_page_views" USING "btree" ("viewed_at");



CREATE INDEX "idx_password_reset_tokens_token" ON "public"."password_reset_tokens" USING "btree" ("token");



CREATE INDEX "idx_password_reset_tokens_user_id" ON "public"."password_reset_tokens" USING "btree" ("user_id");



CREATE INDEX "idx_payment_logs_created" ON "public"."payment_logs" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_payment_logs_event" ON "public"."payment_logs" USING "btree" ("provider_event_id");



CREATE INDEX "idx_payment_logs_processed" ON "public"."payment_logs" USING "btree" ("processed");



CREATE INDEX "idx_payments_checkout" ON "public"."payments" USING "btree" ("provider_checkout_session_id");



CREATE INDEX "idx_payments_order" ON "public"."payments" USING "btree" ("order_id");



CREATE INDEX "idx_payments_provider_event" ON "public"."payments" USING "btree" ("provider_event_id");



CREATE INDEX "idx_payments_provider_payment" ON "public"."payments" USING "btree" ("provider_payment_id");



CREATE INDEX "idx_payments_status" ON "public"."payments" USING "btree" ("status");



CREATE INDEX "idx_profile_progress_course_calc" ON "public"."profile_lessons_progress" USING "btree" ("profile_id", "course_id", "is_completed");



CREATE INDEX "idx_profile_progress_last_accessed" ON "public"."profile_lessons_progress" USING "btree" ("profile_id", "last_accessed_at" DESC);



CREATE INDEX "idx_quiz_options_question" ON "public"."quiz_options" USING "btree" ("question_id");



CREATE INDEX "idx_quiz_questions_quiz" ON "public"."quiz_questions" USING "btree" ("quiz_id");



CREATE INDEX "idx_shopping_carts_profile" ON "public"."shopping_carts" USING "btree" ("profile_id");



CREATE INDEX "idx_user_sessions_login" ON "public"."user_sessions" USING "btree" ("login_at");



CREATE INDEX "idx_user_sessions_logout" ON "public"."user_sessions" USING "btree" ("logout_at");



CREATE INDEX "idx_user_sessions_profile" ON "public"."user_sessions" USING "btree" ("profile_id");



CREATE OR REPLACE TRIGGER "trg_cart_items_updated_at" BEFORE UPDATE ON "public"."shopping_cart_items" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_cart_updated_at" BEFORE UPDATE ON "public"."shopping_carts" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_coupon_updated_at" BEFORE UPDATE ON "public"."coupons" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_courses_updated_at" BEFORE UPDATE ON "public"."courses" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_generate_order_number" BEFORE INSERT ON "public"."orders" FOR EACH ROW EXECUTE FUNCTION "public"."fn_generate_order_number"();



CREATE OR REPLACE TRIGGER "trg_mail_settings_updated_at" BEFORE UPDATE ON "public"."mail_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_mail_templates_updated_at" BEFORE UPDATE ON "public"."mail_templates" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_orders_updated_at" BEFORE UPDATE ON "public"."orders" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_payment_settings_updated_at" BEFORE UPDATE ON "public"."payment_settings" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_payments_updated_at" BEFORE UPDATE ON "public"."payments" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_prevent_admin_deletion" BEFORE DELETE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_admin_deletion"();



CREATE OR REPLACE TRIGGER "trg_prevent_duplicate_webhook" BEFORE INSERT ON "public"."payment_logs" FOR EACH ROW EXECUTE FUNCTION "public"."fn_prevent_duplicate_webhook"();



CREATE OR REPLACE TRIGGER "trg_sync_order_status" AFTER UPDATE OF "status" ON "public"."payments" FOR EACH ROW WHEN (("old"."status" IS DISTINCT FROM "new"."status")) EXECUTE FUNCTION "public"."fn_sync_order_status"();



CREATE OR REPLACE TRIGGER "trigger_auto_enrollment_on_new_course" AFTER INSERT ON "public"."course_classes" FOR EACH ROW EXECUTE FUNCTION "public"."handle_auto_enrollment_on_new_course"();



CREATE OR REPLACE TRIGGER "trigger_auto_enrollment_on_signup" AFTER INSERT ON "public"."profile_classes" FOR EACH ROW EXECUTE FUNCTION "public"."handle_auto_enrollment_on_signup"();



ALTER TABLE ONLY "public"."coupon_redemptions"
    ADD CONSTRAINT "coupon_redemptions_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."coupon_redemptions"
    ADD CONSTRAINT "coupon_redemptions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."coupon_redemptions"
    ADD CONSTRAINT "coupon_redemptions_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."course_classes"
    ADD CONSTRAINT "course_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."academy_classes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_classes"
    ADD CONSTRAINT "course_classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_lessons"
    ADD CONSTRAINT "course_lessons_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_modules"
    ADD CONSTRAINT "course_modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_quizzes"
    ADD CONSTRAINT "course_quizzes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_quizzes"
    ADD CONSTRAINT "course_quizzes_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."mail_templates"
    ADD CONSTRAINT "mail_templates_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."password_reset_tokens"
    ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_classes"
    ADD CONSTRAINT "profile_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."academy_classes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_classes"
    ADD CONSTRAINT "profile_classes_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_courses"
    ADD CONSTRAINT "profile_courses_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."profile_courses"
    ADD CONSTRAINT "profile_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_courses"
    ADD CONSTRAINT "profile_courses_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_lessons_progress"
    ADD CONSTRAINT "profile_lessons_progress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_lessons_progress"
    ADD CONSTRAINT "profile_lessons_progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."course_lessons"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_lessons_progress"
    ADD CONSTRAINT "profile_lessons_progress_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_selected_option_id_fkey" FOREIGN KEY ("selected_option_id") REFERENCES "public"."quiz_options"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."quiz_assignments"
    ADD CONSTRAINT "quiz_assignments_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_options"
    ADD CONSTRAINT "quiz_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_questions"
    ADD CONSTRAINT "quiz_questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_reviews"
    ADD CONSTRAINT "quiz_reviews_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_reviews"
    ADD CONSTRAINT "quiz_reviews_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_reviews"
    ADD CONSTRAINT "quiz_reviews_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."shopping_carts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_items_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "shopping_carts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_page_views"
    ADD CONSTRAINT "user_page_views_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



CREATE POLICY "Admin Full Access Mail Logs" ON "public"."mail_logs" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND (("profiles"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "Admin Full Access Mail Settings" ON "public"."mail_settings" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND (("profiles"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "Admin Full Access Mail Templates" ON "public"."mail_templates" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND (("profiles"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "Admin controllo totale assegnazioni" ON "public"."course_classes" TO "authenticated" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admin controllo totale corsi" ON "public"."courses" TO "authenticated" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admin controllo totale lezioni" ON "public"."course_lessons" TO "authenticated" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admin controllo totale moduli" ON "public"."course_modules" TO "authenticated" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Admins can do everything" ON "public"."resources" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Assegnazioni leggibili da autenticati" ON "public"."course_classes" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Corsi leggibili da autenticati" ON "public"."courses" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Gli Admin possono leggere tutte le metriche" ON "public"."user_page_views" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND (("profiles"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "Gli utenti iscritti possono tracciare le proprie visite" ON "public"."user_page_views" FOR INSERT WITH CHECK (("auth"."uid"() = "profile_id"));



CREATE POLICY "Lezioni leggibili da autenticati" ON "public"."course_lessons" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Moduli leggibili da autenticati" ON "public"."course_modules" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."resources" FOR SELECT USING (("is_visible" = true));



CREATE POLICY "Service role può gestire tutte le iscrizioni" ON "public"."profile_courses" USING (true);



CREATE POLICY "Utenti possono leggere le proprie iscrizioni" ON "public"."profile_courses" FOR SELECT USING (("auth"."uid"() = "profile_id"));



ALTER TABLE "public"."academy_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupon_redemptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_lessons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_modules" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_quizzes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."document_configs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."lessons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_templates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."order_items" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."password_reset_tokens" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payment_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payment_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "payments_admin_cart_items" ON "public"."shopping_cart_items" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_coupon_redemptions" ON "public"."coupon_redemptions" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_coupons" ON "public"."coupons" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_logs" ON "public"."payment_logs" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_order_items" ON "public"."order_items" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_orders" ON "public"."orders" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_payments" ON "public"."payments" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_settings" ON "public"."payment_settings" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "payments_admin_shopping_carts" ON "public"."shopping_carts" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."role")::"text" = 'admin'::"text")))));



ALTER TABLE "public"."profile_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile_courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile_lessons_progress" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quiz_answers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quiz_assignments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quiz_attempts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quiz_options" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quiz_questions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quiz_reviews" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quizzes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."resources" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."shopping_cart_items" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."shopping_carts" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "student_cart" ON "public"."shopping_carts" TO "authenticated" USING (("profile_id" = "auth"."uid"())) WITH CHECK (("profile_id" = "auth"."uid"()));



CREATE POLICY "student_cart_items" ON "public"."shopping_cart_items" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."shopping_carts" "c"
  WHERE (("c"."id" = "shopping_cart_items"."cart_id") AND ("c"."profile_id" = "auth"."uid"())))));



CREATE POLICY "student_coupon_redemptions" ON "public"."coupon_redemptions" FOR SELECT TO "authenticated" USING (("profile_id" = "auth"."uid"()));



CREATE POLICY "student_order_items" ON "public"."order_items" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."orders" "o"
  WHERE (("o"."id" = "order_items"."order_id") AND ("o"."profile_id" = "auth"."uid"())))));



CREATE POLICY "student_orders" ON "public"."orders" FOR SELECT TO "authenticated" USING (("profile_id" = "auth"."uid"()));



CREATE POLICY "student_payments" ON "public"."payments" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."orders" "o"
  WHERE (("o"."id" = "payments"."order_id") AND ("o"."profile_id" = "auth"."uid"())))));



ALTER TABLE "public"."user_page_views" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_sessions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































GRANT ALL ON FUNCTION "public"."fn_generate_order_number"() TO "anon";
GRANT ALL ON FUNCTION "public"."fn_generate_order_number"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_generate_order_number"() TO "service_role";



GRANT ALL ON FUNCTION "public"."fn_prevent_duplicate_webhook"() TO "anon";
GRANT ALL ON FUNCTION "public"."fn_prevent_duplicate_webhook"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_prevent_duplicate_webhook"() TO "service_role";



GRANT ALL ON FUNCTION "public"."fn_set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."fn_set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_set_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."fn_sync_order_status"() TO "anon";
GRANT ALL ON FUNCTION "public"."fn_sync_order_status"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fn_sync_order_status"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_new_course"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_new_course"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_new_course"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_signup"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_signup"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_signup"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_admin_deletion"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_admin_deletion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_admin_deletion"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."academy_classes" TO "anon";
GRANT ALL ON TABLE "public"."academy_classes" TO "authenticated";
GRANT ALL ON TABLE "public"."academy_classes" TO "service_role";



GRANT ALL ON TABLE "public"."coupon_redemptions" TO "anon";
GRANT ALL ON TABLE "public"."coupon_redemptions" TO "authenticated";
GRANT ALL ON TABLE "public"."coupon_redemptions" TO "service_role";



GRANT ALL ON TABLE "public"."coupons" TO "anon";
GRANT ALL ON TABLE "public"."coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."coupons" TO "service_role";



GRANT ALL ON TABLE "public"."course_categories" TO "anon";
GRANT ALL ON TABLE "public"."course_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."course_categories" TO "service_role";



GRANT ALL ON TABLE "public"."course_classes" TO "anon";
GRANT ALL ON TABLE "public"."course_classes" TO "authenticated";
GRANT ALL ON TABLE "public"."course_classes" TO "service_role";



GRANT ALL ON TABLE "public"."course_lessons" TO "anon";
GRANT ALL ON TABLE "public"."course_lessons" TO "authenticated";
GRANT ALL ON TABLE "public"."course_lessons" TO "service_role";



GRANT ALL ON TABLE "public"."course_modules" TO "anon";
GRANT ALL ON TABLE "public"."course_modules" TO "authenticated";
GRANT ALL ON TABLE "public"."course_modules" TO "service_role";



GRANT ALL ON TABLE "public"."course_quizzes" TO "anon";
GRANT ALL ON TABLE "public"."course_quizzes" TO "authenticated";
GRANT ALL ON TABLE "public"."course_quizzes" TO "service_role";



GRANT ALL ON TABLE "public"."courses" TO "anon";
GRANT ALL ON TABLE "public"."courses" TO "authenticated";
GRANT ALL ON TABLE "public"."courses" TO "service_role";



GRANT ALL ON TABLE "public"."document_configs" TO "anon";
GRANT ALL ON TABLE "public"."document_configs" TO "authenticated";
GRANT ALL ON TABLE "public"."document_configs" TO "service_role";



GRANT ALL ON TABLE "public"."lessons" TO "anon";
GRANT ALL ON TABLE "public"."lessons" TO "authenticated";
GRANT ALL ON TABLE "public"."lessons" TO "service_role";



GRANT ALL ON TABLE "public"."mail_logs" TO "anon";
GRANT ALL ON TABLE "public"."mail_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."mail_logs" TO "service_role";



GRANT ALL ON TABLE "public"."mail_settings" TO "anon";
GRANT ALL ON TABLE "public"."mail_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."mail_settings" TO "service_role";



GRANT ALL ON TABLE "public"."mail_templates" TO "anon";
GRANT ALL ON TABLE "public"."mail_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."mail_templates" TO "service_role";



GRANT ALL ON TABLE "public"."order_items" TO "anon";
GRANT ALL ON TABLE "public"."order_items" TO "authenticated";
GRANT ALL ON TABLE "public"."order_items" TO "service_role";



GRANT ALL ON SEQUENCE "public"."order_number_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."order_number_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."order_number_seq" TO "service_role";



GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";



GRANT ALL ON TABLE "public"."password_reset_tokens" TO "anon";
GRANT ALL ON TABLE "public"."password_reset_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."password_reset_tokens" TO "service_role";



GRANT ALL ON TABLE "public"."payment_logs" TO "anon";
GRANT ALL ON TABLE "public"."payment_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_logs" TO "service_role";



GRANT ALL ON TABLE "public"."payment_settings" TO "anon";
GRANT ALL ON TABLE "public"."payment_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_settings" TO "service_role";



GRANT ALL ON TABLE "public"."payments" TO "anon";
GRANT ALL ON TABLE "public"."payments" TO "authenticated";
GRANT ALL ON TABLE "public"."payments" TO "service_role";



GRANT ALL ON TABLE "public"."profile_classes" TO "anon";
GRANT ALL ON TABLE "public"."profile_classes" TO "authenticated";
GRANT ALL ON TABLE "public"."profile_classes" TO "service_role";



GRANT ALL ON TABLE "public"."profile_courses" TO "anon";
GRANT ALL ON TABLE "public"."profile_courses" TO "authenticated";
GRANT ALL ON TABLE "public"."profile_courses" TO "service_role";



GRANT ALL ON TABLE "public"."profile_lessons_progress" TO "anon";
GRANT ALL ON TABLE "public"."profile_lessons_progress" TO "authenticated";
GRANT ALL ON TABLE "public"."profile_lessons_progress" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_answers" TO "anon";
GRANT ALL ON TABLE "public"."quiz_answers" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_answers" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_assignments" TO "anon";
GRANT ALL ON TABLE "public"."quiz_assignments" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_assignments" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_attempts" TO "anon";
GRANT ALL ON TABLE "public"."quiz_attempts" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_attempts" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_options" TO "anon";
GRANT ALL ON TABLE "public"."quiz_options" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_options" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_questions" TO "anon";
GRANT ALL ON TABLE "public"."quiz_questions" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_questions" TO "service_role";



GRANT ALL ON TABLE "public"."quiz_reviews" TO "anon";
GRANT ALL ON TABLE "public"."quiz_reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_reviews" TO "service_role";



GRANT ALL ON TABLE "public"."quizzes" TO "anon";
GRANT ALL ON TABLE "public"."quizzes" TO "authenticated";
GRANT ALL ON TABLE "public"."quizzes" TO "service_role";



GRANT ALL ON TABLE "public"."resources" TO "anon";
GRANT ALL ON TABLE "public"."resources" TO "authenticated";
GRANT ALL ON TABLE "public"."resources" TO "service_role";



GRANT ALL ON TABLE "public"."shopping_cart_items" TO "anon";
GRANT ALL ON TABLE "public"."shopping_cart_items" TO "authenticated";
GRANT ALL ON TABLE "public"."shopping_cart_items" TO "service_role";



GRANT ALL ON TABLE "public"."shopping_carts" TO "anon";
GRANT ALL ON TABLE "public"."shopping_carts" TO "authenticated";
GRANT ALL ON TABLE "public"."shopping_carts" TO "service_role";



GRANT ALL ON TABLE "public"."student_courses" TO "anon";
GRANT ALL ON TABLE "public"."student_courses" TO "authenticated";
GRANT ALL ON TABLE "public"."student_courses" TO "service_role";



GRANT ALL ON TABLE "public"."user_page_views" TO "anon";
GRANT ALL ON TABLE "public"."user_page_views" TO "authenticated";
GRANT ALL ON TABLE "public"."user_page_views" TO "service_role";



GRANT ALL ON TABLE "public"."user_sessions" TO "anon";
GRANT ALL ON TABLE "public"."user_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."user_sessions" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































