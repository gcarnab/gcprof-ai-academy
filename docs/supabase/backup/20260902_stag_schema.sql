


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




ALTER SCHEMA "public" OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."award_module_badge"("p_user_id" "uuid", "p_lesson_id" "uuid") RETURNS TABLE("awarded" boolean, "badge_code" "text", "badge_title" character varying, "xp_reward" integer, "course_xp" integer, "course_level" integer, "global_total_xp" integer, "global_level" integer)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$

DECLARE
    -- ------------------------------------------------------------------------
    -- Modulo / corso
    -- ------------------------------------------------------------------------
    v_module_id uuid;
    v_course_id uuid;
    v_module_code text;

    -- ------------------------------------------------------------------------
    -- Badge
    -- ------------------------------------------------------------------------
    v_badge_id uuid;
    v_badge_code text;
    v_badge_title varchar(100);
    v_xp_reward integer := 0;

    -- ------------------------------------------------------------------------
    -- Completamento modulo
    -- ------------------------------------------------------------------------
    v_total_lessons integer := 0;
    v_completed_lessons integer := 0;

    -- ------------------------------------------------------------------------
    -- Stato badge
    -- ------------------------------------------------------------------------
    v_badge_exists boolean := false;

    -- ------------------------------------------------------------------------
    -- Risultato XP
    -- ------------------------------------------------------------------------
    v_course_xp integer := 0;
    v_course_level integer := 1;
    v_global_total_xp integer := 0;
    v_global_level integer := 1;

BEGIN

    -- ========================================================================
    -- 1. VALIDAZIONE PARAMETRI
    -- ========================================================================

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION
            'award_module_badge(): user_id mancante';
    END IF;

    IF p_lesson_id IS NULL THEN
        RAISE EXCEPTION
            'award_module_badge(): lesson_id mancante';
    END IF;


    -- ========================================================================
    -- 2. IDENTIFICAZIONE MODULO / CORSO / MODULE CODE
    -- ========================================================================

    SELECT
        cl.module_id,
        cm.course_id,
        cm.module_code
    INTO
        v_module_id,
        v_course_id,
        v_module_code
    FROM public.course_lessons AS cl
    INNER JOIN public.course_modules AS cm
        ON cm.id = cl.module_id
    WHERE cl.id = p_lesson_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION
            'Lezione % non trovata o non associata ad alcun modulo',
            p_lesson_id;
    END IF;


    -- ========================================================================
    -- 3. CONTEGGIO LEZIONI DEL MODULO
    -- ========================================================================

    SELECT COUNT(*)
    INTO v_total_lessons
    FROM public.course_lessons AS cl
    WHERE cl.module_id = v_module_id;


    -- ========================================================================
    -- 4. CONTEGGIO LEZIONI COMPLETATE DALL'UTENTE
    -- ========================================================================

    SELECT COUNT(*)
    INTO v_completed_lessons
    FROM public.course_lessons AS cl
    INNER JOIN public.profile_lessons_progress AS plp
        ON plp.lesson_id = cl.id
       AND plp.profile_id = p_user_id
    WHERE cl.module_id = v_module_id
      AND plp.is_completed = TRUE;


    -- ========================================================================
    -- 5. MODULO NON COMPLETATO
    -- ========================================================================
    --
    -- Nessun badge.
    -- Nessun XP.
    --
    -- Restituiamo semplicemente lo stato XP attuale dell'utente.
    -- ========================================================================

    IF v_total_lessons = 0
       OR v_completed_lessons < v_total_lessons
    THEN

        SELECT
            COALESCE(ucs.course_xp, 0),
            COALESCE(ucs.course_level, 1)
        INTO
            v_course_xp,
            v_course_level
        FROM public.user_course_stats AS ucs
        WHERE ucs.profile_id = p_user_id
          AND ucs.course_id = v_course_id;


        SELECT
            COALESCE(p.total_xp, 0),
            COALESCE(p.current_level, 1)
        INTO
            v_global_total_xp,
            v_global_level
        FROM public.profiles AS p
        WHERE p.id = p_user_id;


        RETURN QUERY
        SELECT
            FALSE,
            v_module_code,
            NULL::varchar(100),
            0,
            COALESCE(v_course_xp, 0),
            COALESCE(v_course_level, 1),
            COALESCE(v_global_total_xp, 0),
            COALESCE(v_global_level, 1);

        RETURN;

    END IF;


    -- ========================================================================
    -- 6. RECUPERO BADGE DEL MODULO
    -- ========================================================================
    --
    -- Il badge deve avere:
    --
    --   badges.code = course_modules.module_code
    --   badges.badge_type = 'module'
    --
    -- ========================================================================

    SELECT
        b.id,
        b.code,
        b.title,
        COALESCE(b.xp_reward, 0)
    INTO
        v_badge_id,
        v_badge_code,
        v_badge_title,
        v_xp_reward
    FROM public.badges AS b
    WHERE b.code = v_module_code
      AND b.badge_type = 'module'
    LIMIT 1;


    -- ========================================================================
    -- 7. BADGE NON CONFIGURATO
    -- ========================================================================

    IF NOT FOUND THEN

        SELECT
            COALESCE(ucs.course_xp, 0),
            COALESCE(ucs.course_level, 1)
        INTO
            v_course_xp,
            v_course_level
        FROM public.user_course_stats AS ucs
        WHERE ucs.profile_id = p_user_id
          AND ucs.course_id = v_course_id;


        SELECT
            COALESCE(p.total_xp, 0),
            COALESCE(p.current_level, 1)
        INTO
            v_global_total_xp,
            v_global_level
        FROM public.profiles AS p
        WHERE p.id = p_user_id;


        RETURN QUERY
        SELECT
            FALSE,
            v_module_code,
            NULL::varchar(100),
            0,
            COALESCE(v_course_xp, 0),
            COALESCE(v_course_level, 1),
            COALESCE(v_global_total_xp, 0),
            COALESCE(v_global_level, 1);

        RETURN;

    END IF;


    -- ========================================================================
    -- 8. VERIFICA BADGE GIÀ ASSEGNATO
    -- ========================================================================
    --
    -- Per un badge modulo:
    --
    --   profile_id = utente
    --   badge_id   = badge modulo
    --   course_id  = corso corrente
    --   quiz_id    = NULL
    --
    -- ========================================================================

    SELECT EXISTS (
        SELECT 1
        FROM public.user_badges AS ub
        WHERE ub.profile_id = p_user_id
          AND ub.badge_id = v_badge_id
          AND ub.course_id = v_course_id
          AND ub.quiz_id IS NULL
    )
    INTO v_badge_exists;


    -- ========================================================================
    -- 9. BADGE GIÀ PRESENTE
    -- ========================================================================

    IF v_badge_exists THEN

        SELECT
            COALESCE(ucs.course_xp, 0),
            COALESCE(ucs.course_level, 1)
        INTO
            v_course_xp,
            v_course_level
        FROM public.user_course_stats AS ucs
        WHERE ucs.profile_id = p_user_id
          AND ucs.course_id = v_course_id;


        SELECT
            COALESCE(p.total_xp, 0),
            COALESCE(p.current_level, 1)
        INTO
            v_global_total_xp,
            v_global_level
        FROM public.profiles AS p
        WHERE p.id = p_user_id;


        RETURN QUERY
        SELECT
            FALSE,
            v_badge_code,
            v_badge_title,
            0,
            COALESCE(v_course_xp, 0),
            COALESCE(v_course_level, 1),
            COALESCE(v_global_total_xp, 0),
            COALESCE(v_global_level, 1);

        RETURN;

    END IF;


    -- ========================================================================
    -- 10. INSERIMENTO BADGE
    -- ========================================================================

    INSERT INTO public.user_badges (
        profile_id,
        badge_id,
        awarded_at,
        course_id,
        quiz_id
    )
    VALUES (
        p_user_id,
        v_badge_id,
        NOW(),
        v_course_id,
        NULL
    );


    -- ========================================================================
    -- 11. CENTRALIZZAZIONE XP
    -- ========================================================================
    --
    -- IMPORTANTE:
    --
    -- award_module_badge() NON aggiorna direttamente:
    --
    --   profiles.total_xp
    --   profiles.current_level
    --   user_course_stats.course_xp
    --   user_course_stats.course_level
    --
    -- Tutta la responsabilità viene delegata a award_xp().
    --
    -- award_xp() è l'unica routine responsabile dell'aggiornamento
    -- contabile dell'XP.
    --
    -- Il SELECT INTO consente di recuperare direttamente il risultato
    -- prodotto da award_xp().
    -- ========================================================================

    SELECT
        axp.course_xp,
        axp.course_level,
        axp.global_total_xp,
        axp.global_level
    INTO
        v_course_xp,
        v_course_level,
        v_global_total_xp,
        v_global_level
    FROM public.award_xp(
        p_user_id,
        v_xp_reward,
        v_course_id
    ) AS axp;


    -- ========================================================================
    -- 12. RISULTATO
    -- ========================================================================

    RETURN QUERY
    SELECT
        TRUE,
        v_badge_code,
        v_badge_title,
        v_xp_reward,
        v_course_xp,
        v_course_level,
        v_global_total_xp,
        v_global_level;

END;

$$;


ALTER FUNCTION "public"."award_module_badge"("p_user_id" "uuid", "p_lesson_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."award_quiz_badge"("p_user_id" "uuid", "p_quiz_code" "text", "p_score" numeric DEFAULT 0, "p_max_score" numeric DEFAULT 10) RETURNS TABLE("already_unlocked" boolean, "badge_title" character varying, "badge_icon" character varying, "xp_gained" integer, "new_total_xp" integer, "new_level" integer)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$

DECLARE

    -- ------------------------------------------------------------------------
    -- Quiz / corso
    -- ------------------------------------------------------------------------

    v_quiz_id uuid := NULL;
    v_course_id uuid := NULL;

    v_quiz_max_score numeric := 0;
    v_quiz_passing_score numeric := 0;

    -- ------------------------------------------------------------------------
    -- Tentativo
    -- ------------------------------------------------------------------------

    v_attempt_id uuid := NULL;
    v_final_score numeric := NULL;
    v_attempt_status text := NULL;

    v_quiz_passed boolean := FALSE;
    v_perfect_score boolean := FALSE;

    -- ------------------------------------------------------------------------
    -- Badge
    -- ------------------------------------------------------------------------

    v_badge public.badges%ROWTYPE;

    v_target_badge_code text := NULL;

    v_badge_exists boolean := FALSE;
    v_inserted_count integer := 0;

    -- ------------------------------------------------------------------------
    -- Statistiche quiz
    -- ------------------------------------------------------------------------

    v_completed_count integer := 0;

    -- ------------------------------------------------------------------------
    -- XP
    -- ------------------------------------------------------------------------

    v_xp_result record;

    v_xp_gained integer := 0;
    v_new_total_xp integer := 0;
    v_new_level integer := 1;

BEGIN

    -- ========================================================================
    -- 1. VALIDAZIONE
    -- ========================================================================

    IF p_user_id IS NULL THEN

        RAISE EXCEPTION
            'award_quiz_badge(): user_id mancante';

    END IF;


    IF p_quiz_code IS NULL
       OR BTRIM(p_quiz_code) = ''
    THEN

        RAISE EXCEPTION
            'award_quiz_badge(): quiz_code mancante';

    END IF;


    -- ========================================================================
    -- 2. VERIFICA PROFILO
    -- ========================================================================

    IF NOT EXISTS (
        SELECT 1
        FROM public.profiles AS p
        WHERE p.id = p_user_id
    )
    THEN

        RAISE EXCEPTION
            'Profilo utente % inesistente',
            p_user_id;

    END IF;


    -- ========================================================================
    -- 3. IDENTIFICAZIONE QUIZ
    -- ========================================================================
    --
    -- Compatibilità:
    --
    --   p_quiz_code può essere:
    --
    --   - UUID del quiz
    --   - titolo del quiz
    --
    -- Il course_id viene ricavato direttamente dal quiz.
    --
    -- Il fallback su quiz_assignments viene mantenuto per compatibilità
    -- con eventuali dati/strutture legacy.
    -- ========================================================================

    SELECT
        q.id,

        COALESCE(
            q.course_id,
            qa.course_id
        ),

        COALESCE(
            q.max_score,
            0
        ),

        COALESCE(
            q.passing_score,
            0
        )

    INTO
        v_quiz_id,
        v_course_id,
        v_quiz_max_score,
        v_quiz_passing_score

    FROM public.quizzes AS q

    LEFT JOIN public.quiz_assignments AS qa
        ON qa.quiz_id = q.id

    WHERE
        q.id::text = p_quiz_code
        OR q.title = p_quiz_code

    LIMIT 1;


    IF NOT FOUND THEN

        RAISE EXCEPTION
            'Quiz "%" non trovato',
            p_quiz_code;

    END IF;


    -- ========================================================================
    -- 4. RECUPERO ULTIMO TENTATIVO GRADED
    -- ========================================================================
    --
    -- È fondamentale non utilizzare i parametri p_score / p_max_score come
    -- prova dell'effettivo completamento.
    --
    -- La fonte autorevole è quiz_attempts.
    --
    -- Viene considerato l'ultimo tentativo graded dell'utente per il quiz.
    -- ========================================================================

    SELECT
        qa.id,
        qa.status,
        qa.final_score

    INTO
        v_attempt_id,
        v_attempt_status,
        v_final_score

    FROM public.quiz_attempts AS qa

    WHERE qa.quiz_id = v_quiz_id
      AND qa.student_id = p_user_id
      AND qa.status = 'graded'

    ORDER BY qa.created_at DESC

    LIMIT 1;


    -- ========================================================================
    -- 5. QUIZ NON ANCORA CORRETTO / COMPLETATO
    -- ========================================================================

    IF v_attempt_id IS NULL THEN

        RETURN QUERY
        SELECT
            FALSE,
            NULL::varchar,
            NULL::varchar,
            0,
            COALESCE(
                (
                    SELECT p.total_xp
                    FROM public.profiles AS p
                    WHERE p.id = p_user_id
                ),
                0
            ),
            COALESCE(
                (
                    SELECT p.current_level
                    FROM public.profiles AS p
                    WHERE p.id = p_user_id
                ),
                1
            );

        RETURN;

    END IF;


    -- ========================================================================
    -- 6. DETERMINAZIONE SUPERAMENTO
    -- ========================================================================
    --
    -- passing_score nel database è espresso come percentuale.
    --
    -- Esempio:
    --
    --   max_score     = 10
    --   passing_score = 60
    --   final_score   = 7
    --
    -- 7 / 10 * 100 = 70%
    --
    -- quindi:
    --
    --   quiz superato = TRUE
    --
    -- ========================================================================

    IF v_quiz_max_score > 0
       AND v_final_score IS NOT NULL
       AND (
            (v_final_score / v_quiz_max_score) * 100
       ) >= v_quiz_passing_score
    THEN

        v_quiz_passed := TRUE;

    ELSE

        v_quiz_passed := FALSE;

    END IF;


    -- ========================================================================
    -- 7. PERFECT SCORE
    -- ========================================================================
    --
    -- Il PERFECT_SCORE viene assegnato esclusivamente se il tentativo
    -- effettivamente corretto ha raggiunto il punteggio massimo.
    --
    -- NON utilizziamo p_score come fonte autorevole.
    -- ========================================================================

    IF v_quiz_passed
       AND v_quiz_max_score > 0
       AND v_final_score >= v_quiz_max_score
    THEN

        v_perfect_score := TRUE;

    END IF;


    -- ========================================================================
    -- 8. CONTEGGIO QUIZ SUPERATI
    -- ========================================================================
    --
    -- Contiamo soltanto quiz con almeno un tentativo graded che soddisfa
    -- la soglia di superamento.
    --
    -- Ogni quiz viene contato una sola volta.
    -- ========================================================================

    SELECT COUNT(*)

    INTO v_completed_count

    FROM (

        SELECT
            qa.quiz_id

        FROM public.quiz_attempts AS qa

        INNER JOIN public.quizzes AS q
            ON q.id = qa.quiz_id

        WHERE qa.student_id = p_user_id
          AND qa.status = 'graded'
          AND q.max_score > 0
          AND (
                (
                    qa.final_score / q.max_score
                ) * 100
              ) >= q.passing_score

        GROUP BY
            qa.quiz_id

    ) AS completed_quizzes;


    -- ========================================================================
    -- 9. BADGE SPECIFICO QUIZ
    -- ========================================================================
    --
    -- Se esiste un badge il cui code coincide con p_quiz_code, viene
    -- considerato il badge specifico del quiz.
    --
    -- Tuttavia viene assegnato soltanto dopo il reale superamento.
    -- ========================================================================

    SELECT b.code

    INTO v_target_badge_code

    FROM public.badges AS b

    WHERE b.code = p_quiz_code
      AND b.badge_type = 'quiz'

    LIMIT 1;


    -- ========================================================================
    -- 10. NESSUN BADGE SPECIFICO -> BADGE MILESTONE
    -- ========================================================================

    IF v_target_badge_code IS NULL
       AND v_quiz_passed
    THEN

        -- --------------------------------------------------------------------
        -- PERFECT SCORE
        -- --------------------------------------------------------------------

        IF v_perfect_score
           AND NOT EXISTS (
                SELECT 1
                FROM public.user_badges AS ub
                INNER JOIN public.badges AS b
                    ON b.id = ub.badge_id
                WHERE ub.profile_id = p_user_id
                  AND b.code = 'PERFECT_SCORE'
           )
        THEN

            v_target_badge_code := 'PERFECT_SCORE';


        -- --------------------------------------------------------------------
        -- FIRST QUIZ
        -- --------------------------------------------------------------------

        ELSIF v_completed_count >= 1
           AND NOT EXISTS (
                SELECT 1
                FROM public.user_badges AS ub
                INNER JOIN public.badges AS b
                    ON b.id = ub.badge_id
                WHERE ub.profile_id = p_user_id
                  AND b.code = 'FIRST_QUIZ'
           )
        THEN

            v_target_badge_code := 'FIRST_QUIZ';


        -- --------------------------------------------------------------------
        -- QUIZ 10
        -- --------------------------------------------------------------------

        ELSIF v_completed_count >= 10
           AND NOT EXISTS (
                SELECT 1
                FROM public.user_badges AS ub
                INNER JOIN public.badges AS b
                    ON b.id = ub.badge_id
                WHERE ub.profile_id = p_user_id
                  AND b.code = 'QUIZ_10'
           )
        THEN

            v_target_badge_code := 'QUIZ_10';


        -- --------------------------------------------------------------------
        -- QUIZ 25
        -- --------------------------------------------------------------------

        ELSIF v_completed_count >= 25
           AND NOT EXISTS (
                SELECT 1
                FROM public.user_badges AS ub
                INNER JOIN public.badges AS b
                    ON b.id = ub.badge_id
                WHERE ub.profile_id = p_user_id
                  AND b.code = 'QUIZ_25'
           )
        THEN

            v_target_badge_code := 'QUIZ_25';


        -- --------------------------------------------------------------------
        -- QUIZ 50
        -- --------------------------------------------------------------------

        ELSIF v_completed_count >= 50
           AND NOT EXISTS (
                SELECT 1
                FROM public.user_badges AS ub
                INNER JOIN public.badges AS b
                    ON b.id = ub.badge_id
                WHERE ub.profile_id = p_user_id
                  AND b.code = 'QUIZ_50'
           )
        THEN

            v_target_badge_code := 'QUIZ_50';


        -- --------------------------------------------------------------------
        -- QUIZ MASTER
        -- --------------------------------------------------------------------

        ELSIF v_completed_count >= 100
           AND NOT EXISTS (
                SELECT 1
                FROM public.user_badges AS ub
                INNER JOIN public.badges AS b
                    ON b.id = ub.badge_id
                WHERE ub.profile_id = p_user_id
                  AND b.code = 'QUIZ_MASTER'
           )
        THEN

            v_target_badge_code := 'QUIZ_MASTER';

        END IF;

    END IF;


    -- ========================================================================
    -- 11. QUIZ NON SUPERATO / NESSUN BADGE DA ASSEGNARE
    -- ========================================================================

    IF v_target_badge_code IS NULL THEN

        SELECT
            COALESCE(p.total_xp, 0),
            COALESCE(p.current_level, 1)

        INTO
            v_new_total_xp,
            v_new_level

        FROM public.profiles AS p

        WHERE p.id = p_user_id;


        RETURN QUERY
        SELECT
            FALSE,
            NULL::varchar,
            NULL::varchar,
            0,
            v_new_total_xp,
            v_new_level;

        RETURN;

    END IF;


    -- ========================================================================
    -- 12. CARICAMENTO BADGE
    -- ========================================================================

    SELECT *

    INTO v_badge

    FROM public.badges AS b

    WHERE b.code = v_target_badge_code
      AND b.badge_type = 'quiz'

    LIMIT 1;


    IF NOT FOUND THEN

        RAISE EXCEPTION
            'Badge quiz "%" non configurato',
            v_target_badge_code;

    END IF;


    -- ========================================================================
    -- 13. VERIFICA DUPLICATO
    -- ========================================================================

    SELECT EXISTS (

        SELECT 1

        FROM public.user_badges AS ub

        WHERE ub.profile_id = p_user_id
          AND ub.badge_id = v_badge.id

    )

    INTO v_badge_exists;


    IF v_badge_exists THEN

        SELECT
            COALESCE(p.total_xp, 0),
            COALESCE(p.current_level, 1)

        INTO
            v_new_total_xp,
            v_new_level

        FROM public.profiles AS p

        WHERE p.id = p_user_id;


        RETURN QUERY
        SELECT
            TRUE,
            v_badge.title,
            v_badge.icon,
            0,
            v_new_total_xp,
            v_new_level;

        RETURN;

    END IF;


    -- ========================================================================
    -- 14. INSERIMENTO BADGE
    -- ========================================================================
    --
    -- Il badge viene inserito prima dell'assegnazione XP.
    --
    -- In questo modo l'XP viene assegnato soltanto quando il badge è realmente
    -- nuovo.
    -- ========================================================================

    INSERT INTO public.user_badges
    (
        profile_id,
        badge_id,
        course_id,
        quiz_id,
        awarded_at
    )
    VALUES
    (
        p_user_id,
        v_badge.id,
        v_course_id,
        v_quiz_id,
        NOW()
    )
    ON CONFLICT DO NOTHING;


    GET DIAGNOSTICS
        v_inserted_count = ROW_COUNT;


    -- ========================================================================
    -- 15. RACE CONDITION
    -- ========================================================================

    IF v_inserted_count = 0 THEN

        SELECT
            COALESCE(p.total_xp, 0),
            COALESCE(p.current_level, 1)

        INTO
            v_new_total_xp,
            v_new_level

        FROM public.profiles AS p

        WHERE p.id = p_user_id;


        RETURN QUERY
        SELECT
            TRUE,
            v_badge.title,
            v_badge.icon,
            0,
            v_new_total_xp,
            v_new_level;

        RETURN;

    END IF;


    -- ========================================================================
    -- 16. XP CENTRALIZZATA
    -- ========================================================================
    --
    -- award_xp() è l'unica funzione responsabile dell'aggiornamento:
    --
    --   profiles.total_xp
    --   profiles.current_level
    --   user_course_stats.course_xp
    --   user_course_stats.course_level
    --
    -- award_quiz_badge() non modifica direttamente nessuna di queste
    -- strutture.
    -- ========================================================================

    SELECT *

    INTO v_xp_result

    FROM public.award_xp(
        p_user_id,
        v_badge.xp_reward,
        v_course_id
    );


    v_xp_gained :=
        COALESCE(
            v_xp_result.xp_gained,
            0
        );

    v_new_total_xp :=
        COALESCE(
            v_xp_result.global_total_xp,
            0
        );

    v_new_level :=
        COALESCE(
            v_xp_result.global_level,
            1
        );


    -- ========================================================================
    -- 17. OUTPUT
    -- ========================================================================

    RETURN QUERY
    SELECT
        FALSE,
        v_badge.title,
        v_badge.icon,
        v_xp_gained,
        v_new_total_xp,
        v_new_level;

END;

$$;


ALTER FUNCTION "public"."award_quiz_badge"("p_user_id" "uuid", "p_quiz_code" "text", "p_score" numeric, "p_max_score" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."award_xp"("p_user_id" "uuid", "p_xp" integer, "p_course_id" "uuid" DEFAULT NULL::"uuid") RETURNS TABLE("xp_gained" integer, "course_xp" integer, "course_level" integer, "global_total_xp" integer, "global_level" integer)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
    v_course_xp integer := 0;
    v_course_level integer := 1;
    v_global_total_xp integer := 0;
    v_global_level integer := 1;
BEGIN

    --------------------------------------------------------------------------
    -- 1. VALIDAZIONE
    --------------------------------------------------------------------------

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'award_xp(): user_id mancante';
    END IF;

    IF p_xp IS NULL OR p_xp < 0 THEN
        RAISE EXCEPTION 'award_xp(): xp deve essere >= 0';
    END IF;

    IF p_xp = 0 THEN

        SELECT
            COALESCE(p.total_xp, 0),
            COALESCE(p.current_level, 1)
        INTO
            v_global_total_xp,
            v_global_level
        FROM public.profiles p
        WHERE p.id = p_user_id;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Profilo utente % inesistente', p_user_id;
        END IF;

        IF p_course_id IS NOT NULL THEN

            SELECT
                COALESCE(ucs.course_xp, 0),
                COALESCE(ucs.course_level, 1)
            INTO
                v_course_xp,
                v_course_level
            FROM public.user_course_stats AS ucs
            WHERE ucs.profile_id = p_user_id
              AND ucs.course_id = p_course_id;

        END IF;

        RETURN QUERY
        SELECT
            0,
            v_course_xp,
            v_course_level,
            v_global_total_xp,
            v_global_level;

        RETURN;
    END IF;

    --------------------------------------------------------------------------
    -- 2. XP GLOBALE
    --
    -- L'UPDATE atomico evita di perdere XP in caso di richieste concorrenti.
    --------------------------------------------------------------------------

    UPDATE public.profiles AS p
    SET
        total_xp = COALESCE(p.total_xp, 0) + p_xp,
        current_level = public.calculate_level(
            COALESCE(p.total_xp, 0) + p_xp
        ),
        updated_at = NOW()
    WHERE p.id = p_user_id
    RETURNING
        p.total_xp,
        p.current_level
    INTO
        v_global_total_xp,
        v_global_level;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Profilo utente % inesistente', p_user_id;
    END IF;

    --------------------------------------------------------------------------
    -- 3. XP DEL CORSO
    --
    -- Viene aggiornato soltanto quando il contesto corso è disponibile.
    --------------------------------------------------------------------------

    IF p_course_id IS NOT NULL THEN

        INSERT INTO public.user_course_stats (
            profile_id,
            course_id,
            course_xp,
            course_level,
            created_at,
            updated_at
        )
        VALUES (
            p_user_id,
            p_course_id,
            p_xp,
            public.calculate_level(p_xp),
            NOW(),
            NOW()
        )
        ON CONFLICT (profile_id, course_id)
        DO UPDATE
        SET
            course_xp =
                user_course_stats.course_xp + EXCLUDED.course_xp,

            course_level =
                public.calculate_level(
                    user_course_stats.course_xp + EXCLUDED.course_xp
                ),

            updated_at = NOW()

        RETURNING
            user_course_stats.course_xp,
            user_course_stats.course_level
        INTO
            v_course_xp,
            v_course_level;

    END IF;

    --------------------------------------------------------------------------
    -- 4. OUTPUT
    --------------------------------------------------------------------------

    RETURN QUERY
    SELECT
        p_xp,
        v_course_xp,
        v_course_level,
        v_global_total_xp,
        v_global_level;

END;
$$;


ALTER FUNCTION "public"."award_xp"("p_user_id" "uuid", "p_xp" integer, "p_course_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_level"("p_xp" integer) RETURNS integer
    LANGUAGE "sql" IMMUTABLE PARALLEL SAFE
    AS $$
    SELECT LEAST(
        100,
        GREATEST(
            1,
            1 + (COALESCE(p_xp, 0) / 500)
        )
    );
$$;


ALTER FUNCTION "public"."calculate_level"("p_xp" integer) OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."generate_certificate_number"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    seq_number BIGINT;
BEGIN

    seq_number := nextval('public.certificate_number_seq');

    NEW.certificate_number :=
        'CERT-' ||
        EXTRACT(YEAR FROM NOW()) ||
        '-' ||
        LPAD(seq_number::TEXT,6,'0');

    RETURN NEW;

END;
$$;


ALTER FUNCTION "public"."generate_certificate_number"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_admin_courses_gamification_stats"() RETURNS TABLE("course_id" "text", "course_title" "text", "total_students_active" bigint, "total_xp_awarded" bigint, "total_badges_awarded" bigint, "avg_xp_per_student" numeric)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id::text AS course_id,
        c.title::text AS course_title,
        COALESCE(COUNT(DISTINCT ucs.profile_id), 0)::bigint AS total_students_active,
        COALESCE(SUM(ucs.course_xp), 0)::bigint AS total_xp_awarded,
        (
            SELECT COUNT(*)::bigint 
            FROM public.user_badges ub 
            WHERE ub.course_id = c.id
        ) AS total_badges_awarded,
        CASE 
            WHEN COUNT(DISTINCT ucs.profile_id) > 0 
            THEN ROUND((COALESCE(SUM(ucs.course_xp), 0)::numeric / COUNT(DISTINCT ucs.profile_id)::numeric), 2)
            ELSE 0 
        END AS avg_xp_per_student
    FROM public.courses c
    LEFT JOIN public.user_course_stats ucs ON ucs.course_id = c.id
    GROUP BY c.id, c.title
    ORDER BY total_xp_awarded DESC;
END;
$$;


ALTER FUNCTION "public"."get_admin_courses_gamification_stats"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_gamification_overview"("p_user_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_global_profile JSONB;
    v_courses_stats JSONB;
BEGIN
    -- 1. Info Globali Utente
    SELECT jsonb_build_object(
        'total_xp', COALESCE(p.total_xp, 0),
        'global_level', COALESCE(p.current_level, 1),
        'total_badges_count', (SELECT COUNT(*) FROM public.user_badges WHERE profile_id = p_user_id)
    ) INTO v_global_profile
    FROM public.profiles p
    WHERE p.id = p_user_id;

    -- 2. Dettaglio per Singolo Corso
    SELECT jsonb_agg(
        jsonb_build_object(
            'course_id', c.id,
            'course_title', c.title,
            'course_xp', COALESCE(ucs.course_xp, 0),
            'course_level', COALESCE(ucs.course_level, 1),
            'badges', COALESCE((
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'badge_id', b.id,
                        'code', b.code,
                        'title', b.title,
                        'icon', b.icon,
                        'awarded_at', ub.awarded_at
                    )
                )
                FROM public.user_badges ub
                JOIN public.badges b ON b.id = ub.badge_id
                WHERE ub.profile_id = p_user_id AND ub.course_id = c.id
            ), '[]'::jsonb)
        )
    ) INTO v_courses_stats
    FROM public.courses c
    LEFT JOIN public.user_course_stats ucs 
        ON ucs.course_id = c.id AND ucs.profile_id = p_user_id;

    RETURN jsonb_build_object(
        'global', v_global_profile,
        'courses', COALESCE(v_courses_stats, '[]'::jsonb)
    );
END;
$$;


ALTER FUNCTION "public"."get_user_gamification_overview"("p_user_id" "uuid") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."increment_coupon_redemptions"("coupon_id_param" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.coupons
  SET current_redemptions = current_redemptions + 1,
      updated_at = NOW()
  WHERE id = coupon_id_param;
END;
$$;


ALTER FUNCTION "public"."increment_coupon_redemptions"("coupon_id_param" "uuid") OWNER TO "postgres";


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


CREATE OR REPLACE FUNCTION "public"."set_course_categories_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_course_categories_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."track_lesson_activity"("p_user_id" "uuid", "p_course_id" "uuid", "p_lesson_id" "uuid", "p_minutes_to_add" integer, "p_completion_threshold" integer DEFAULT NULL::integer) RETURNS TABLE("minutes_watched" integer, "is_completed" boolean, "total_minutes_active" integer, "last_accessed_at" timestamp with time zone, "updated_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$

DECLARE
    -- ------------------------------------------------------------------------
    -- Tracking
    -- ------------------------------------------------------------------------
    v_minutes_to_add integer;
    v_new_minutes integer;
    v_is_completed boolean;

    v_total_minutes integer;
    v_last_accessed timestamptz;
    v_updated timestamptz;

    -- ------------------------------------------------------------------------
    -- Configurazione
    -- ------------------------------------------------------------------------
    v_dynamic_threshold integer;
    v_max_batch integer;
    v_xp_per_lesson integer;

    -- ------------------------------------------------------------------------
    -- Stato precedente
    -- ------------------------------------------------------------------------
    v_was_completed_before boolean := false;

    -- ------------------------------------------------------------------------
    -- XP
    -- ------------------------------------------------------------------------
    v_xp_to_add integer := 0;

BEGIN

    -- ========================================================================
    -- 1. VALIDAZIONE
    -- ========================================================================

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION
            'track_lesson_activity(): user_id mancante';
    END IF;

    IF p_course_id IS NULL THEN
        RAISE EXCEPTION
            'track_lesson_activity(): course_id mancante';
    END IF;

    IF p_lesson_id IS NULL THEN
        RAISE EXCEPTION
            'track_lesson_activity(): lesson_id mancante';
    END IF;

    IF p_minutes_to_add IS NULL
       OR p_minutes_to_add < 0
    THEN
        RAISE EXCEPTION
            'track_lesson_activity(): minutes_to_add deve essere >= 0';
    END IF;


    -- ========================================================================
    -- 2. AUTORIZZAZIONE
    -- ========================================================================

    IF auth.uid() IS NOT NULL
       AND auth.uid() <> p_user_id
       AND (auth.jwt() ->> 'role') IS DISTINCT FROM 'service_role'
    THEN
        RAISE EXCEPTION
            'Non sei autorizzato a modificare i progressi di un altro utente';
    END IF;


    -- ========================================================================
    -- 3. CONFIGURAZIONE
    -- ========================================================================

    -- ------------------------------------------------------------------------
    -- Soglia completamento lezione
    -- ------------------------------------------------------------------------

    IF p_completion_threshold IS NOT NULL THEN

        v_dynamic_threshold :=
            GREATEST(p_completion_threshold, 1);

    ELSE

        SELECT
            COALESCE(
                NULLIF(s.value, '')::integer,
                1
            )
        INTO v_dynamic_threshold
        FROM public.system_settings AS s
        WHERE s.key = 'LESSON_COMPLETION_MINUTES';

        IF v_dynamic_threshold IS NULL
           OR v_dynamic_threshold < 1
        THEN
            v_dynamic_threshold := 1;
        END IF;

    END IF;


    -- ------------------------------------------------------------------------
    -- Massimo batch
    -- ------------------------------------------------------------------------

    SELECT
        COALESCE(
            NULLIF(s.value, '')::integer,
            30
        )
    INTO v_max_batch
    FROM public.system_settings AS s
    WHERE s.key = 'TRACKING_MAX_BATCH';

    IF v_max_batch IS NULL
       OR v_max_batch < 1
    THEN
        v_max_batch := 30;
    END IF;


    -- ------------------------------------------------------------------------
    -- XP completamento lezione
    -- ------------------------------------------------------------------------

    SELECT
        COALESCE(
            NULLIF(s.value, '')::integer,
            10
        )
    INTO v_xp_per_lesson
    FROM public.system_settings AS s
    WHERE s.key = 'LESSON_COMPLETION_XP';

    IF v_xp_per_lesson IS NULL
       OR v_xp_per_lesson < 0
    THEN
        v_xp_per_lesson := 10;
    END IF;


    -- ========================================================================
    -- 4. SANITIZZAZIONE BATCH
    -- ========================================================================

    v_minutes_to_add :=
        LEAST(
            GREATEST(p_minutes_to_add, 0),
            v_max_batch
        );


    -- ========================================================================
    -- 5. STATO PRECEDENTE DELLA LEZIONE
    -- ========================================================================

    SELECT
        COALESCE(plp.is_completed, FALSE)
    INTO v_was_completed_before
    FROM public.profile_lessons_progress AS plp
    WHERE plp.profile_id = p_user_id
      AND plp.lesson_id = p_lesson_id;


    -- ========================================================================
    -- 6. AGGIORNAMENTO MINUTI PROFILO
    -- ========================================================================

    IF v_minutes_to_add > 0 THEN

        UPDATE public.profiles AS p
        SET
            total_minutes_active =
                COALESCE(p.total_minutes_active, 0)
                + v_minutes_to_add,

            updated_at = NOW()

        WHERE p.id = p_user_id

        RETURNING
            p.total_minutes_active
        INTO
            v_total_minutes;

    ELSE

        SELECT
            COALESCE(p.total_minutes_active, 0)
        INTO v_total_minutes
        FROM public.profiles AS p
        WHERE p.id = p_user_id;

    END IF;


    IF v_total_minutes IS NULL THEN
        RAISE EXCEPTION
            'Profilo utente % inesistente',
            p_user_id;
    END IF;


    -- ========================================================================
    -- 7. UPSERT PROGRESSO LEZIONE
    -- ========================================================================

    INSERT INTO public.profile_lessons_progress
    (
        profile_id,
        course_id,
        lesson_id,
        minutes_watched,
        is_completed,
        last_accessed_at,
        updated_at,
        completed_at
    )
    VALUES
    (
        p_user_id,
        p_course_id,
        p_lesson_id,

        v_minutes_to_add,

        (
            v_minutes_to_add >= v_dynamic_threshold
        ),

        NOW(),
        NOW(),

        CASE
            WHEN v_minutes_to_add >= v_dynamic_threshold
            THEN NOW()
            ELSE NULL
        END
    )

    ON CONFLICT (
        profile_id,
        lesson_id
    )

    DO UPDATE
    SET
        course_id =
            EXCLUDED.course_id,

        minutes_watched =
            profile_lessons_progress.minutes_watched
            + EXCLUDED.minutes_watched,

        is_completed =
            CASE

                WHEN profile_lessons_progress.is_completed
                THEN TRUE

                WHEN (
                    profile_lessons_progress.minutes_watched
                    + EXCLUDED.minutes_watched
                ) >= v_dynamic_threshold
                THEN TRUE

                ELSE FALSE

            END,

        last_accessed_at =
            NOW(),

        updated_at =
            NOW(),

        completed_at =
            CASE

                WHEN profile_lessons_progress.is_completed
                THEN profile_lessons_progress.completed_at

                WHEN (
                    profile_lessons_progress.minutes_watched
                    + EXCLUDED.minutes_watched
                ) >= v_dynamic_threshold
                THEN COALESCE(
                    profile_lessons_progress.completed_at,
                    NOW()
                )

                ELSE NULL

            END

    RETURNING
        profile_lessons_progress.minutes_watched,
        profile_lessons_progress.is_completed,
        profile_lessons_progress.last_accessed_at,
        profile_lessons_progress.updated_at

    INTO
        v_new_minutes,
        v_is_completed,
        v_last_accessed,
        v_updated;


    -- ========================================================================
    -- 8. DETERMINAZIONE XP LEZIONE
    -- ========================================================================
    --
    -- L'XP viene generato esclusivamente sulla transizione:
    --
    --       FALSE  --->  TRUE
    --
    -- Se la lezione era già completata:
    --
    --       TRUE   --->  TRUE
    --
    -- non viene generato alcun XP.
    --
    -- IMPORTANTE:
    -- qui NON viene modificato né profiles né user_course_stats.
    -- ========================================================================

    IF v_is_completed
       AND NOT v_was_completed_before
    THEN
        v_xp_to_add := v_xp_per_lesson;
    END IF;


    -- ========================================================================
    -- 9. CENTRALIZZAZIONE XP
    -- ========================================================================
    --
    -- Tutta la responsabilità dell'aggiornamento XP è delegata a award_xp().
    --
    -- award_xp() aggiorna:
    --
    --   profiles.total_xp
    --   profiles.current_level
    --   user_course_stats.course_xp
    --   user_course_stats.course_level
    --
    -- track_lesson_activity() non aggiorna più direttamente tali strutture.
    -- ========================================================================

    IF v_xp_to_add > 0 THEN

        PERFORM public.award_xp(
            p_user_id,
            v_xp_to_add,
            p_course_id
        );

    END IF;


    -- ========================================================================
    -- 10. OUTPUT
    -- ========================================================================

    RETURN QUERY
    SELECT
        v_new_minutes,
        v_is_completed,
        v_total_minutes,
        v_last_accessed,
        v_updated;

END;
$$;


ALTER FUNCTION "public"."track_lesson_activity"("p_user_id" "uuid", "p_course_id" "uuid", "p_lesson_id" "uuid", "p_minutes_to_add" integer, "p_completion_threshold" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trg_cleanup_courses_on_class_change"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    DELETE FROM profile_courses pc
    WHERE pc.profile_id = OLD.profile_id
    -- CONDIZIONE 1: Il corso NON fa parte delle classi attuali dell'utente
    AND NOT EXISTS (
        SELECT 1
        FROM course_classes cc
        JOIN profile_classes p_class ON cc.class_id = p_class.class_id
        WHERE p_class.profile_id = OLD.profile_id
        AND cc.course_id = pc.course_id
    )
    -- CONDIZIONE 2: Il corso NON è stato acquistato (Ordine = PAID)
    AND NOT EXISTS (
        SELECT 1
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        WHERE o.profile_id = OLD.profile_id
        AND oi.course_id = pc.course_id
        AND o.status = 'PAID' 
    );
    
    RETURN OLD;
END;
$$;


ALTER FUNCTION "public"."trg_cleanup_courses_on_class_change"() OWNER TO "postgres";


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
    AS $$
BEGIN
    NEW.updated_at = NOW();
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


CREATE TABLE IF NOT EXISTS "public"."ai_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "provider" character varying(50) DEFAULT 'openrouter'::character varying NOT NULL,
    "model" character varying(100) DEFAULT 'deepseek/deepseek-chat'::character varying NOT NULL,
    "master_model" character varying(100) DEFAULT 'deepseek/deepseek-chat'::character varying,
    "grading_model" character varying(100) DEFAULT 'deepseek/deepseek-chat'::character varying,
    "temperature" numeric(3,2) DEFAULT 0.20 NOT NULL,
    "max_tokens" integer DEFAULT 2048 NOT NULL,
    "timeout_ms" integer DEFAULT 30000 NOT NULL,
    "system_prompt" "text" NOT NULL,
    "master_prompt" "text" NOT NULL,
    "grading_prompt" "text" NOT NULL,
    "enabled" boolean DEFAULT true NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."ai_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."badges" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "code" "text" NOT NULL,
    "title" character varying(100) NOT NULL,
    "description" "text",
    "icon" character varying(10) NOT NULL,
    "xp_reward" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "badge_type" character varying(20) DEFAULT 'module'::character varying NOT NULL,
    CONSTRAINT "badges_badge_type_check" CHECK ((("badge_type")::"text" = ANY (ARRAY[('module'::character varying)::"text", ('quiz'::character varying)::"text"]))),
    CONSTRAINT "badges_xp_reward_check" CHECK (("xp_reward" >= 0))
);


ALTER TABLE "public"."badges" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."certificate_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "certificate_id" "uuid" NOT NULL,
    "event_type" character varying(30) NOT NULL,
    "ip_address" "text",
    "user_agent" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "certificate_event_check" CHECK ((("event_type")::"text" = ANY (ARRAY[('GENERATED'::character varying)::"text", ('DOWNLOADED'::character varying)::"text", ('EMAILED'::character varying)::"text", ('VERIFIED'::character varying)::"text", ('REVOKED'::character varying)::"text", ('REGENERATED'::character varying)::"text"])))
);


ALTER TABLE "public"."certificate_events" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."certificate_number_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."certificate_number_seq" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."certificate_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "default_template_id" "uuid",
    "organization_name" character varying(255),
    "director_name" character varying(255),
    "director_title" character varying(255),
    "signature_url" "text",
    "logo_url" "text",
    "certificate_prefix" character varying(20) DEFAULT 'CERT'::character varying,
    "enable_qrcode" boolean DEFAULT true,
    "auto_generate_pdf" boolean DEFAULT true,
    "auto_send_email" boolean DEFAULT true,
    "verification_base_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."certificate_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."certificate_templates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" "text",
    "html_template" "text" NOT NULL,
    "css_template" "text",
    "logo_url" "text",
    "background_url" "text",
    "primary_color" character varying(20),
    "secondary_color" character varying(20),
    "active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."certificate_templates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."certificates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "public_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "certificate_number" character varying(30) NOT NULL,
    "verification_token" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "module_id" "uuid",
    "template_id" "uuid",
    "issued_by" "uuid",
    "title" character varying(255) NOT NULL,
    "subtitle" "text",
    "score" numeric(5,2),
    "completion_percentage" numeric(5,2),
    "pdf_url" "text",
    "pdf_generated" boolean DEFAULT false NOT NULL,
    "email_sent" boolean DEFAULT false NOT NULL,
    "download_count" integer DEFAULT 0 NOT NULL,
    "last_download_at" timestamp with time zone,
    "issued_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "expires_at" timestamp with time zone,
    "status" character varying(20) DEFAULT 'ACTIVE'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "lesson_id" "uuid",
    CONSTRAINT "certificate_status_check" CHECK ((("status")::"text" = ANY (ARRAY[('ACTIVE'::character varying)::"text", ('REVOKED'::character varying)::"text", ('EXPIRED'::character varying)::"text"])))
);


ALTER TABLE "public"."certificates" OWNER TO "postgres";


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
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "description" "text",
    "icon_name" character varying(100),
    "color_theme" character varying(30) DEFAULT 'blue'::character varying,
    "display_order" integer DEFAULT 0 NOT NULL,
    "visible_home" boolean DEFAULT true NOT NULL,
    "is_featured" boolean DEFAULT false NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
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
    CONSTRAINT "course_lessons_content_type_check" CHECK ((("content_type")::"text" = ANY (ARRAY[('video'::character varying)::"text", ('document'::character varying)::"text", ('colab'::character varying)::"text", ('markdown'::character varying)::"text", ('sandbox'::character varying)::"text", ('text'::character varying)::"text", ('file'::character varying)::"text", ('link'::character varying)::"text"])))
);


ALTER TABLE "public"."course_lessons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."course_modules" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "course_id" "uuid",
    "title" character varying(255) NOT NULL,
    "order_index" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "is_preview" boolean DEFAULT false NOT NULL,
    "module_code" character varying(255) NOT NULL
);


ALTER TABLE "public"."course_modules" OWNER TO "postgres";


COMMENT ON COLUMN "public"."course_modules"."is_preview" IS 'Modulo visibile anche agli utenti non iscritti al corso.';



COMMENT ON COLUMN "public"."course_modules"."module_code" IS 'Codice logico del modulo utilizzato dalla gamification (es. MODULE_01).';



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


CREATE TABLE IF NOT EXISTS "public"."module_completions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "module_id" "uuid" NOT NULL,
    "completion_percentage" numeric(5,2) DEFAULT 0 NOT NULL,
    "quiz_score" numeric(5,2),
    "xp_awarded" integer DEFAULT 0 NOT NULL,
    "completed" boolean DEFAULT false NOT NULL,
    "completed_at" timestamp with time zone,
    "certificate_generated" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."module_completions" OWNER TO "postgres";


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
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "completed_at" timestamp with time zone DEFAULT "now"()
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
    "total_xp" integer DEFAULT 0,
    "current_level" integer DEFAULT 1,
    CONSTRAINT "check_role" CHECK ((("role")::"text" = ANY (ARRAY[('admin'::character varying)::"text", ('student'::character varying)::"text"]))),
    CONSTRAINT "check_status" CHECK ((("status")::"text" = ANY (ARRAY[('pending'::character varying)::"text", ('active'::character varying)::"text", ('blocked'::character varying)::"text"]))),
    CONSTRAINT "check_user_type" CHECK ((("user_type")::"text" = ANY (ARRAY[('SCHOOL_STUDENT'::character varying)::"text", ('EXTERNAL_STUDENT'::character varying)::"text", ('TEACHER'::character varying)::"text", ('ADMIN'::character varying)::"text"]))),
    CONSTRAINT "profiles_current_level_check" CHECK (("current_level" >= 1)),
    CONSTRAINT "profiles_total_xp_check" CHECK (("total_xp" >= 0))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_ai_reviews" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "attempt_id" "uuid" NOT NULL,
    "question_id" "uuid" NOT NULL,
    "student_answer" "text" NOT NULL,
    "master_answer" "text",
    "suggested_score" numeric(4,2) NOT NULL,
    "max_score" numeric(4,2) DEFAULT 6.00 NOT NULL,
    "feedback" "text" NOT NULL,
    "confidence" numeric(5,2),
    "provider" character varying(50) NOT NULL,
    "model" character varying(100) NOT NULL,
    "system_prompt" "text",
    "grading_prompt" "text",
    "prompt_tokens" integer,
    "completion_tokens" integer,
    "elapsed_ms" integer,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."quiz_ai_reviews" OWNER TO "postgres";


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
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "xp_awarded" boolean DEFAULT false
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
    "passing_score" numeric(5,2) DEFAULT 60.00 NOT NULL,
    "course_id" "uuid",
    "module_id" "uuid"
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


CREATE TABLE IF NOT EXISTS "public"."system_settings" (
    "key" character varying(100) NOT NULL,
    "value" "text" NOT NULL,
    "description" "text",
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."system_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_badges" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "badge_id" "uuid" NOT NULL,
    "awarded_at" timestamp with time zone DEFAULT "now"(),
    "course_id" "uuid",
    "quiz_id" "uuid"
);


ALTER TABLE "public"."user_badges" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_course_stats" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "course_id" "uuid" NOT NULL,
    "course_xp" integer DEFAULT 0 NOT NULL,
    "course_level" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "user_course_stats_course_level_check" CHECK (("course_level" >= 1)),
    CONSTRAINT "user_course_stats_course_xp_check" CHECK (("course_xp" >= 0))
);


ALTER TABLE "public"."user_course_stats" OWNER TO "postgres";


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



ALTER TABLE ONLY "public"."ai_settings"
    ADD CONSTRAINT "ai_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."badges"
    ADD CONSTRAINT "badges_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."badges"
    ADD CONSTRAINT "badges_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."certificate_events"
    ADD CONSTRAINT "certificate_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."certificate_settings"
    ADD CONSTRAINT "certificate_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."certificate_templates"
    ADD CONSTRAINT "certificate_templates_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."certificate_templates"
    ADD CONSTRAINT "certificate_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_certificate_number_key" UNIQUE ("certificate_number");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_public_id_key" UNIQUE ("public_id");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_verification_token_key" UNIQUE ("verification_token");



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
    ADD CONSTRAINT "course_modules_course_module_code_unique" UNIQUE ("course_id", "module_code");



ALTER TABLE ONLY "public"."course_modules"
    ADD CONSTRAINT "course_modules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."course_modules"
    ADD CONSTRAINT "course_modules_unique_title" UNIQUE ("course_id", "title");



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



ALTER TABLE ONLY "public"."module_completions"
    ADD CONSTRAINT "module_completion_unique" UNIQUE ("user_id", "module_id");



ALTER TABLE ONLY "public"."module_completions"
    ADD CONSTRAINT "module_completions_pkey" PRIMARY KEY ("id");



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



ALTER TABLE ONLY "public"."quiz_ai_reviews"
    ADD CONSTRAINT "quiz_ai_reviews_attempt_id_question_id_key" UNIQUE ("attempt_id", "question_id");



ALTER TABLE ONLY "public"."quiz_ai_reviews"
    ADD CONSTRAINT "quiz_ai_reviews_pkey" PRIMARY KEY ("id");



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



ALTER TABLE ONLY "public"."system_settings"
    ADD CONSTRAINT "system_settings_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "uq_cart_course" UNIQUE ("cart_id", "course_id");



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "uq_cart_profile" UNIQUE ("profile_id");



ALTER TABLE ONLY "public"."coupon_redemptions"
    ADD CONSTRAINT "uq_coupon_order" UNIQUE ("coupon_id", "order_id");



ALTER TABLE ONLY "public"."user_badges"
    ADD CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_badges"
    ADD CONSTRAINT "user_badges_unique_reward" UNIQUE ("profile_id", "badge_id", "course_id", "quiz_id");



ALTER TABLE ONLY "public"."user_course_stats"
    ADD CONSTRAINT "user_course_stats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_course_stats"
    ADD CONSTRAINT "user_course_stats_unique" UNIQUE ("profile_id", "course_id");



ALTER TABLE ONLY "public"."user_page_views"
    ADD CONSTRAINT "user_page_views_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_answers_attempt" ON "public"."quiz_answers" USING "btree" ("attempt_id");



CREATE INDEX "idx_answers_question" ON "public"."quiz_answers" USING "btree" ("question_id");



CREATE INDEX "idx_attempt_quiz" ON "public"."quiz_attempts" USING "btree" ("quiz_id");



CREATE INDEX "idx_attempt_student" ON "public"."quiz_attempts" USING "btree" ("student_id");



CREATE INDEX "idx_badges_type" ON "public"."badges" USING "btree" ("badge_type");



CREATE INDEX "idx_cart_items_cart" ON "public"."shopping_cart_items" USING "btree" ("cart_id");



CREATE INDEX "idx_cart_items_course" ON "public"."shopping_cart_items" USING "btree" ("course_id");



CREATE INDEX "idx_certificate_events_certificate" ON "public"."certificate_events" USING "btree" ("certificate_id");



CREATE INDEX "idx_certificates_course" ON "public"."certificates" USING "btree" ("course_id");



CREATE INDEX "idx_certificates_lesson" ON "public"."certificates" USING "btree" ("lesson_id");



CREATE INDEX "idx_certificates_module" ON "public"."certificates" USING "btree" ("module_id");



CREATE INDEX "idx_certificates_public" ON "public"."certificates" USING "btree" ("public_id");



CREATE INDEX "idx_certificates_user" ON "public"."certificates" USING "btree" ("user_id");



CREATE INDEX "idx_certificates_verification" ON "public"."certificates" USING "btree" ("verification_token");



CREATE INDEX "idx_coupon_active" ON "public"."coupons" USING "btree" ("is_active");



CREATE INDEX "idx_coupon_code" ON "public"."coupons" USING "btree" ("code");



CREATE INDEX "idx_coupon_redemptions_coupon" ON "public"."coupon_redemptions" USING "btree" ("coupon_id");



CREATE INDEX "idx_coupon_redemptions_profile" ON "public"."coupon_redemptions" USING "btree" ("profile_id");



CREATE INDEX "idx_course_categories_featured" ON "public"."course_categories" USING "btree" ("is_featured", "display_order");



CREATE INDEX "idx_course_categories_home" ON "public"."course_categories" USING "btree" ("visible_home", "display_order");



CREATE INDEX "idx_course_modules_course" ON "public"."course_modules" USING "btree" ("course_id");



CREATE INDEX "idx_course_modules_module_code" ON "public"."course_modules" USING "btree" ("module_code");



CREATE INDEX "idx_courses_slug" ON "public"."courses" USING "btree" ("slug");



CREATE INDEX "idx_mail_logs_created" ON "public"."mail_logs" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_mail_logs_recipient" ON "public"."mail_logs" USING "btree" ("recipient");



CREATE INDEX "idx_mail_logs_template" ON "public"."mail_logs" USING "btree" ("template_key");



CREATE INDEX "idx_mail_templates_key" ON "public"."mail_templates" USING "btree" ("template_key");



CREATE INDEX "idx_module_completion_completed" ON "public"."module_completions" USING "btree" ("completed");



CREATE INDEX "idx_module_completion_module" ON "public"."module_completions" USING "btree" ("module_id");



CREATE INDEX "idx_module_completion_user" ON "public"."module_completions" USING "btree" ("user_id");



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



CREATE INDEX "idx_quiz_ai_reviews_attempt_question" ON "public"."quiz_ai_reviews" USING "btree" ("attempt_id", "question_id");



CREATE INDEX "idx_quiz_ai_reviews_question" ON "public"."quiz_ai_reviews" USING "btree" ("question_id");



CREATE INDEX "idx_quiz_options_question" ON "public"."quiz_options" USING "btree" ("question_id");



CREATE INDEX "idx_quiz_questions_quiz" ON "public"."quiz_questions" USING "btree" ("quiz_id");



CREATE INDEX "idx_quizzes_course_id" ON "public"."quizzes" USING "btree" ("course_id");



CREATE INDEX "idx_quizzes_module_id" ON "public"."quizzes" USING "btree" ("module_id");



CREATE INDEX "idx_shopping_carts_profile" ON "public"."shopping_carts" USING "btree" ("profile_id");



CREATE INDEX "idx_user_badges_profile" ON "public"."user_badges" USING "btree" ("profile_id");



CREATE INDEX "idx_user_badges_profile_quiz" ON "public"."user_badges" USING "btree" ("profile_id", "quiz_id");



CREATE INDEX "idx_user_badges_quiz" ON "public"."user_badges" USING "btree" ("quiz_id");



CREATE INDEX "idx_user_course_stats_course" ON "public"."user_course_stats" USING "btree" ("course_id");



CREATE INDEX "idx_user_course_stats_profile" ON "public"."user_course_stats" USING "btree" ("profile_id");



CREATE INDEX "idx_user_sessions_login" ON "public"."user_sessions" USING "btree" ("login_at");



CREATE INDEX "idx_user_sessions_logout" ON "public"."user_sessions" USING "btree" ("logout_at");



CREATE INDEX "idx_user_sessions_profile" ON "public"."user_sessions" USING "btree" ("profile_id");



CREATE CONSTRAINT TRIGGER "on_profile_class_removed" AFTER DELETE ON "public"."profile_classes" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION "public"."trg_cleanup_courses_on_class_change"();



CREATE OR REPLACE TRIGGER "trg_cart_items_updated_at" BEFORE UPDATE ON "public"."shopping_cart_items" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_cart_updated_at" BEFORE UPDATE ON "public"."shopping_carts" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_certificate_settings_updated" BEFORE UPDATE ON "public"."certificate_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_certificate_templates_updated" BEFORE UPDATE ON "public"."certificate_templates" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_certificates_updated" BEFORE UPDATE ON "public"."certificates" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_coupon_updated_at" BEFORE UPDATE ON "public"."coupons" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_course_categories_updated_at" BEFORE UPDATE ON "public"."course_categories" FOR EACH ROW EXECUTE FUNCTION "public"."set_course_categories_updated_at"();



CREATE OR REPLACE TRIGGER "trg_courses_updated_at" BEFORE UPDATE ON "public"."courses" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_generate_certificate_number" BEFORE INSERT ON "public"."certificates" FOR EACH ROW WHEN (("new"."certificate_number" IS NULL)) EXECUTE FUNCTION "public"."generate_certificate_number"();



CREATE OR REPLACE TRIGGER "trg_generate_order_number" BEFORE INSERT ON "public"."orders" FOR EACH ROW EXECUTE FUNCTION "public"."fn_generate_order_number"();



CREATE OR REPLACE TRIGGER "trg_mail_settings_updated_at" BEFORE UPDATE ON "public"."mail_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_mail_templates_updated_at" BEFORE UPDATE ON "public"."mail_templates" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_module_completions_updated" BEFORE UPDATE ON "public"."module_completions" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trg_orders_updated_at" BEFORE UPDATE ON "public"."orders" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_payment_settings_updated_at" BEFORE UPDATE ON "public"."payment_settings" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_payments_updated_at" BEFORE UPDATE ON "public"."payments" FOR EACH ROW EXECUTE FUNCTION "public"."fn_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_prevent_admin_deletion" BEFORE DELETE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_admin_deletion"();



CREATE OR REPLACE TRIGGER "trg_prevent_duplicate_webhook" BEFORE INSERT ON "public"."payment_logs" FOR EACH ROW EXECUTE FUNCTION "public"."fn_prevent_duplicate_webhook"();



CREATE OR REPLACE TRIGGER "trg_sync_order_status" AFTER UPDATE OF "status" ON "public"."payments" FOR EACH ROW WHEN (("old"."status" IS DISTINCT FROM "new"."status")) EXECUTE FUNCTION "public"."fn_sync_order_status"();



CREATE OR REPLACE TRIGGER "trigger_auto_enrollment_on_new_course" AFTER INSERT ON "public"."course_classes" FOR EACH ROW EXECUTE FUNCTION "public"."handle_auto_enrollment_on_new_course"();



CREATE OR REPLACE TRIGGER "trigger_auto_enrollment_on_signup" AFTER INSERT ON "public"."profile_classes" FOR EACH ROW EXECUTE FUNCTION "public"."handle_auto_enrollment_on_signup"();



ALTER TABLE ONLY "public"."certificate_events"
    ADD CONSTRAINT "certificate_events_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "public"."certificates"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."certificate_settings"
    ADD CONSTRAINT "certificate_settings_default_template_id_fkey" FOREIGN KEY ("default_template_id") REFERENCES "public"."certificate_templates"("id");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_issued_by_fkey" FOREIGN KEY ("issued_by") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."course_lessons"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."certificate_templates"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



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



ALTER TABLE ONLY "public"."mail_templates"
    ADD CONSTRAINT "mail_templates_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."module_completions"
    ADD CONSTRAINT "module_completions_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."module_completions"
    ADD CONSTRAINT "module_completions_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."module_completions"
    ADD CONSTRAINT "module_completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



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



ALTER TABLE ONLY "public"."quiz_ai_reviews"
    ADD CONSTRAINT "quiz_ai_reviews_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_ai_reviews"
    ADD CONSTRAINT "quiz_ai_reviews_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE CASCADE;



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
    ADD CONSTRAINT "quizzes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."quizzes"
    ADD CONSTRAINT "quizzes_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."shopping_carts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_cart_items"
    ADD CONSTRAINT "shopping_cart_items_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."shopping_carts"
    ADD CONSTRAINT "shopping_carts_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_badges"
    ADD CONSTRAINT "user_badges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_badges"
    ADD CONSTRAINT "user_badges_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_badges"
    ADD CONSTRAINT "user_badges_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_badges"
    ADD CONSTRAINT "user_badges_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_course_stats"
    ADD CONSTRAINT "user_course_stats_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_course_stats"
    ADD CONSTRAINT "user_course_stats_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



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



CREATE POLICY "Admin lettura totale progressi lezioni" ON "public"."profile_lessons_progress" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND (("profiles"."role")::"text" = 'admin'::"text")))));



CREATE POLICY "Admins can do everything" ON "public"."resources" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "Allow system/admin write on certificates" ON "public"."certificates" USING (true) WITH CHECK (true);



CREATE POLICY "Allow system/admin write on module_completions" ON "public"."module_completions" USING (true) WITH CHECK (true);



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



CREATE POLICY "Utenti gestiscono proprio progresso lezioni" ON "public"."profile_lessons_progress" TO "authenticated" USING (("auth"."uid"() = "profile_id")) WITH CHECK (("auth"."uid"() = "profile_id"));



CREATE POLICY "Utenti possono leggere le proprie iscrizioni" ON "public"."profile_courses" FOR SELECT USING (("auth"."uid"() = "profile_id"));



ALTER TABLE "public"."academy_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ai_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."badges" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."certificate_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."certificate_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."certificate_templates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."certificates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupon_redemptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_classes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_lessons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."course_modules" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."document_configs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."mail_templates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."module_completions" ENABLE ROW LEVEL SECURITY;


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


ALTER TABLE "public"."quiz_ai_reviews" ENABLE ROW LEVEL SECURITY;


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



ALTER TABLE "public"."system_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_badges" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_course_stats" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_page_views" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_sessions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO PUBLIC;
GRANT ALL ON SCHEMA "public" TO "anon";
GRANT ALL ON SCHEMA "public" TO "authenticated";
GRANT ALL ON SCHEMA "public" TO "service_role";






















































































































































GRANT ALL ON FUNCTION "public"."award_module_badge"("p_user_id" "uuid", "p_lesson_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."award_module_badge"("p_user_id" "uuid", "p_lesson_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."award_module_badge"("p_user_id" "uuid", "p_lesson_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."award_quiz_badge"("p_user_id" "uuid", "p_quiz_code" "text", "p_score" numeric, "p_max_score" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."award_quiz_badge"("p_user_id" "uuid", "p_quiz_code" "text", "p_score" numeric, "p_max_score" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."award_quiz_badge"("p_user_id" "uuid", "p_quiz_code" "text", "p_score" numeric, "p_max_score" numeric) TO "service_role";



GRANT ALL ON FUNCTION "public"."award_xp"("p_user_id" "uuid", "p_xp" integer, "p_course_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."award_xp"("p_user_id" "uuid", "p_xp" integer, "p_course_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."award_xp"("p_user_id" "uuid", "p_xp" integer, "p_course_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."calculate_level"("p_xp" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_level"("p_xp" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_level"("p_xp" integer) TO "service_role";



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



GRANT ALL ON FUNCTION "public"."generate_certificate_number"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_certificate_number"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_certificate_number"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_admin_courses_gamification_stats"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_admin_courses_gamification_stats"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_admin_courses_gamification_stats"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_gamification_overview"("p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_gamification_overview"("p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_gamification_overview"("p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_new_course"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_new_course"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_new_course"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_signup"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_signup"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_auto_enrollment_on_signup"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_coupon_redemptions"("coupon_id_param" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_coupon_redemptions"("coupon_id_param" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_coupon_redemptions"("coupon_id_param" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_profile_minutes"("user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_admin_deletion"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_admin_deletion"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_admin_deletion"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_course_categories_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_course_categories_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_course_categories_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."track_lesson_activity"("p_user_id" "uuid", "p_course_id" "uuid", "p_lesson_id" "uuid", "p_minutes_to_add" integer, "p_completion_threshold" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."track_lesson_activity"("p_user_id" "uuid", "p_course_id" "uuid", "p_lesson_id" "uuid", "p_minutes_to_add" integer, "p_completion_threshold" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."track_lesson_activity"("p_user_id" "uuid", "p_course_id" "uuid", "p_lesson_id" "uuid", "p_minutes_to_add" integer, "p_completion_threshold" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."trg_cleanup_courses_on_class_change"() TO "anon";
GRANT ALL ON FUNCTION "public"."trg_cleanup_courses_on_class_change"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trg_cleanup_courses_on_class_change"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_set_timestamp"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."academy_classes" TO "anon";
GRANT ALL ON TABLE "public"."academy_classes" TO "authenticated";
GRANT ALL ON TABLE "public"."academy_classes" TO "service_role";



GRANT ALL ON TABLE "public"."ai_settings" TO "anon";
GRANT ALL ON TABLE "public"."ai_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_settings" TO "service_role";



GRANT ALL ON TABLE "public"."badges" TO "anon";
GRANT ALL ON TABLE "public"."badges" TO "authenticated";
GRANT ALL ON TABLE "public"."badges" TO "service_role";



GRANT ALL ON TABLE "public"."certificate_events" TO "anon";
GRANT ALL ON TABLE "public"."certificate_events" TO "authenticated";
GRANT ALL ON TABLE "public"."certificate_events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."certificate_number_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."certificate_number_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."certificate_number_seq" TO "service_role";



GRANT ALL ON TABLE "public"."certificate_settings" TO "anon";
GRANT ALL ON TABLE "public"."certificate_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."certificate_settings" TO "service_role";



GRANT ALL ON TABLE "public"."certificate_templates" TO "anon";
GRANT ALL ON TABLE "public"."certificate_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."certificate_templates" TO "service_role";



GRANT ALL ON TABLE "public"."certificates" TO "anon";
GRANT ALL ON TABLE "public"."certificates" TO "authenticated";
GRANT ALL ON TABLE "public"."certificates" TO "service_role";



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



GRANT ALL ON TABLE "public"."module_completions" TO "anon";
GRANT ALL ON TABLE "public"."module_completions" TO "authenticated";
GRANT ALL ON TABLE "public"."module_completions" TO "service_role";



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



GRANT ALL ON TABLE "public"."quiz_ai_reviews" TO "anon";
GRANT ALL ON TABLE "public"."quiz_ai_reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."quiz_ai_reviews" TO "service_role";



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



GRANT ALL ON TABLE "public"."system_settings" TO "anon";
GRANT ALL ON TABLE "public"."system_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."system_settings" TO "service_role";



GRANT ALL ON TABLE "public"."user_badges" TO "anon";
GRANT ALL ON TABLE "public"."user_badges" TO "authenticated";
GRANT ALL ON TABLE "public"."user_badges" TO "service_role";



GRANT ALL ON TABLE "public"."user_course_stats" TO "anon";
GRANT ALL ON TABLE "public"."user_course_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."user_course_stats" TO "service_role";



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




























