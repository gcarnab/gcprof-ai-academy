


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






CREATE OR REPLACE FUNCTION "public"."handle_auto_enrollment_on_new_course"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profile_courses (profile_id, course_id)
  SELECT pc.profile_id, NEW.course_id
  FROM public.profile_classes pc
  JOIN public.profiles p ON pc.profile_id = p.id
  WHERE pc.class_id = NEW.class_id
    AND p.status = 'active'; -- 🌟 Filtra: solo utenti abilitati (es. 'active')
  RETURN NEW;
END;
$$;


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
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."course_modules" OWNER TO "postgres";


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
    "published" boolean DEFAULT true
);


ALTER TABLE "public"."courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."document_configs" (
    "id" "text" NOT NULL,
    "label" "text" NOT NULL,
    "file_path" "text" NOT NULL,
    "is_active" boolean DEFAULT true,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."document_configs" OWNER TO "postgres";


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


CREATE TABLE IF NOT EXISTS "public"."password_reset_tokens" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "token" "text" NOT NULL,
    "expires_at" timestamp without time zone NOT NULL,
    "used" boolean DEFAULT false NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."password_reset_tokens" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profile_classes" (
    "profile_id" "uuid" NOT NULL,
    "class_id" "uuid" NOT NULL,
    "assigned_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."profile_classes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profile_courses" (
    "profile_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "enrolled_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
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
    CONSTRAINT "check_role" CHECK ((("role")::"text" = ANY ((ARRAY['admin'::character varying, 'student'::character varying])::"text"[]))),
    CONSTRAINT "check_status" CHECK ((("status")::"text" = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'blocked'::character varying])::"text"[])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


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



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "courses_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."document_configs"
    ADD CONSTRAINT "document_configs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mail_logs"
    ADD CONSTRAINT "mail_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mail_settings"
    ADD CONSTRAINT "mail_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mail_templates"
    ADD CONSTRAINT "mail_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."mail_templates"
    ADD CONSTRAINT "mail_templates_template_key_key" UNIQUE ("template_key");



ALTER TABLE ONLY "public"."password_reset_tokens"
    ADD CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."password_reset_tokens"
    ADD CONSTRAINT "password_reset_tokens_token_key" UNIQUE ("token");



ALTER TABLE ONLY "public"."profile_classes"
    ADD CONSTRAINT "profile_classes_pkey" PRIMARY KEY ("profile_id", "class_id");



ALTER TABLE ONLY "public"."profile_courses"
    ADD CONSTRAINT "profile_courses_pkey" PRIMARY KEY ("profile_id", "course_id");



ALTER TABLE ONLY "public"."profile_lessons_progress"
    ADD CONSTRAINT "profile_lessons_progress_pkey" PRIMARY KEY ("profile_id", "lesson_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_page_views"
    ADD CONSTRAINT "user_page_views_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_mail_logs_created" ON "public"."mail_logs" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_mail_logs_recipient" ON "public"."mail_logs" USING "btree" ("recipient");



CREATE INDEX "idx_mail_logs_template" ON "public"."mail_logs" USING "btree" ("template_key");



CREATE INDEX "idx_mail_templates_key" ON "public"."mail_templates" USING "btree" ("template_key");



CREATE INDEX "idx_page_views_course_slug" ON "public"."user_page_views" USING "btree" ("course_slug") WHERE ("course_slug" IS NOT NULL);



CREATE INDEX "idx_page_views_profile_id" ON "public"."user_page_views" USING "btree" ("profile_id");



CREATE INDEX "idx_page_views_viewed_at" ON "public"."user_page_views" USING "btree" ("viewed_at");



CREATE INDEX "idx_password_reset_tokens_token" ON "public"."password_reset_tokens" USING "btree" ("token");



CREATE INDEX "idx_password_reset_tokens_user_id" ON "public"."password_reset_tokens" USING "btree" ("user_id");



CREATE INDEX "idx_profile_progress_course_calc" ON "public"."profile_lessons_progress" USING "btree" ("profile_id", "course_id", "is_completed");



CREATE INDEX "idx_profile_progress_last_accessed" ON "public"."profile_lessons_progress" USING "btree" ("profile_id", "last_accessed_at" DESC);



CREATE INDEX "idx_user_sessions_login" ON "public"."user_sessions" USING "btree" ("login_at");



CREATE INDEX "idx_user_sessions_logout" ON "public"."user_sessions" USING "btree" ("logout_at");



CREATE INDEX "idx_user_sessions_profile" ON "public"."user_sessions" USING "btree" ("profile_id");



CREATE OR REPLACE TRIGGER "trg_mail_settings_updated_at" BEFORE UPDATE ON "public"."mail_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_mail_templates_updated_at" BEFORE UPDATE ON "public"."mail_templates" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_auto_enrollment_on_new_course" AFTER INSERT ON "public"."course_classes" FOR EACH ROW EXECUTE FUNCTION "public"."handle_auto_enrollment_on_new_course"();



CREATE OR REPLACE TRIGGER "trigger_auto_enrollment_on_signup" AFTER INSERT ON "public"."profile_classes" FOR EACH ROW EXECUTE FUNCTION "public"."handle_auto_enrollment_on_signup"();



ALTER TABLE ONLY "public"."course_classes"
    ADD CONSTRAINT "course_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."academy_classes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_classes"
    ADD CONSTRAINT "course_classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_lessons"
    ADD CONSTRAINT "course_lessons_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."course_modules"
    ADD CONSTRAINT "course_modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."mail_templates"
    ADD CONSTRAINT "mail_templates_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."password_reset_tokens"
    ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_classes"
    ADD CONSTRAINT "profile_classes_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."academy_classes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profile_classes"
    ADD CONSTRAINT "profile_classes_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



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



CREATE POLICY "Assegnazioni leggibili da autenticati" ON "public"."course_classes" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Corsi leggibili da autenticati" ON "public"."courses" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Gli Admin possono leggere tutte le metriche" ON "public"."user_page_views" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND (("profiles"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "Gli utenti iscritti possono tracciare le proprie visite" ON "public"."user_page_views" FOR INSERT WITH CHECK (("auth"."uid"() = "profile_id"));



CREATE POLICY "Lezioni leggibili da autenticati" ON "public"."course_lessons" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Moduli leggibili da autenticati" ON "public"."course_modules" FOR SELECT TO "authenticated" USING (true);



ALTER TABLE "public"."academy_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_lessons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_modules" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."document_configs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_templates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."password_reset_tokens" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile_courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profile_lessons_progress" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_page_views" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_sessions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































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



GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."academy_classes" TO "anon";
GRANT ALL ON TABLE "public"."academy_classes" TO "authenticated";
GRANT ALL ON TABLE "public"."academy_classes" TO "service_role";



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



GRANT ALL ON TABLE "public"."courses" TO "anon";
GRANT ALL ON TABLE "public"."courses" TO "authenticated";
GRANT ALL ON TABLE "public"."courses" TO "service_role";



GRANT ALL ON TABLE "public"."document_configs" TO "anon";
GRANT ALL ON TABLE "public"."document_configs" TO "authenticated";
GRANT ALL ON TABLE "public"."document_configs" TO "service_role";



GRANT ALL ON TABLE "public"."mail_logs" TO "anon";
GRANT ALL ON TABLE "public"."mail_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."mail_logs" TO "service_role";



GRANT ALL ON TABLE "public"."mail_settings" TO "anon";
GRANT ALL ON TABLE "public"."mail_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."mail_settings" TO "service_role";



GRANT ALL ON TABLE "public"."mail_templates" TO "anon";
GRANT ALL ON TABLE "public"."mail_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."mail_templates" TO "service_role";



GRANT ALL ON TABLE "public"."password_reset_tokens" TO "anon";
GRANT ALL ON TABLE "public"."password_reset_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."password_reset_tokens" TO "service_role";



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































