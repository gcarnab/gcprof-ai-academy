--================ PULIZIA DB ================

TRUNCATE TABLE 
  quiz_answers,
  quiz_attempts,
  certificates,
  user_badges,
  module_completions,
  profile_lessons_progress,
  user_course_stats,
  user_page_views,
  user_sessions
RESTART IDENTITY CASCADE;


-- 1. Tabelle figlie / dipendenti da tentativi quiz
DELETE FROM quiz_answers;

-- 2. Tentativi quiz e certificati
DELETE FROM quiz_attempts;
DELETE FROM certificates;

-- 3. Gamification e progresso
DELETE FROM user_badges;
DELETE FROM module_completions;
DELETE FROM profile_lessons_progress;
DELETE FROM user_course_stats;

-- 4. Tracciamento utenti e sessioni
DELETE FROM user_page_views;
DELETE FROM user_sessions;




SELECT pg_get_functiondef('public.track_lesson_activity'::regproc);


SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_course_stats';


-- 1. Rimuovi tutti i badge assegnati all'utente
DELETE FROM public.user_badges 
WHERE profile_id = '3da0e5b9-ff82-4850-b194-9b3c6034536b';

-- 2. Reset degli XP e del Livello nel profilo dell'utente
UPDATE public.profiles 
SET 
    total_xp = 0, 
    current_level = 1,
    updated_at = NOW()
WHERE id = '3da0e5b9-ff82-4850-b194-9b3c6034536b';

-- 3. Rimuovi i progressi e i minuti tracciati dalla RPC track_lesson_activity
-- (Adatta il nome della tabella se nel tuo schema si chiama diversamente, es. lesson_progress o user_activity)
DELETE FROM public.user_lesson_progress 
WHERE profile_id = '3da0e5b9-ff82-4850-b194-9b3c6034536b';



DO $$
DECLARE
    v_user_id UUID := '3da0e5b9-ff82-4850-b194-9b3c6034536b'; -- Inserisci qui il tuo USER_UUID
BEGIN
    -- 1. Eliminazione badge assegnati all'utente
    DELETE FROM public.user_badges 
    WHERE profile_id = v_user_id;

    -- 2. Eliminazione statistiche XP/Livello per corso
    DELETE FROM public.user_course_stats 
    WHERE profile_id = v_user_id;

    -- 3. Azzeramento XP e Livello globale nel profilo
    UPDATE public.profiles 
    SET 
        total_xp = 0, 
        current_level = 1,
        updated_at = NOW()
    WHERE id = v_user_id;

    -- 4. Azzeramento del tracciamento e completamento lezioni
    DELETE FROM public.user_lesson_progress 
    WHERE profile_id = v_user_id;

    RAISE NOTICE 'Pulizia completata con successo per l''utente %', v_user_id;
END $$;


-- =====================================================
-- BADGE COMPLETAMENTO MODULI
-- =====================================================

INSERT INTO public.badges (code, title, description, icon, xp_reward)
VALUES
('MODULE_00','Modulo 0 Completato','Hai completato il Modulo 0','⭐',100),
('MODULE_01','Modulo 1 Completato','Hai completato il Modulo 1','⭐',100),
('MODULE_02','Modulo 2 Completato','Hai completato il Modulo 2','⭐',100),
('MODULE_03','Modulo 3 Completato','Hai completato il Modulo 3','⭐',100),
('MODULE_04','Modulo 4 Completato','Hai completato il Modulo 4','⭐',100),
('MODULE_05','Modulo 5 Completato','Hai completato il Modulo 5','⭐',100),
('MODULE_06','Modulo 6 Completato','Hai completato il Modulo 6','⭐',100),
('MODULE_07','Modulo 7 Completato','Hai completato il Modulo 7','⭐',100),
('MODULE_08','Modulo 8 Completato','Hai completato il Modulo 8','⭐',100),
('MODULE_09','Modulo 9 Completato','Hai completato il Modulo 9','⭐',100),
('MODULE_10','Modulo 10 Completato','Hai completato il Modulo 10','⭐',100)
ON CONFLICT (code) DO NOTHING;


-- =====================================================
-- BADGE QUIZ
-- =====================================================

INSERT INTO public.badges (code, title, description, icon, xp_reward)
VALUES

('FIRST_QUIZ',
 'Primo Quiz Superato',
 'Hai superato il tuo primo quiz.',
 '📝',
 50),

('QUIZ_10',
 '10 Quiz Superati',
 'Hai completato con successo 10 quiz.',
 '🥉',
 100),

('QUIZ_25',
 '25 Quiz Superati',
 'Hai completato con successo 25 quiz.',
 '🥈',
 200),

('QUIZ_50',
 '50 Quiz Superati',
 'Hai completato con successo 50 quiz.',
 '🥇',
 350),

('QUIZ_MASTER',
 'Quiz Master',
 'Hai completato con successo 100 quiz.',
 '🏆',
 500),

('PERFECT_SCORE',
 'Punteggio Perfetto',
 'Hai ottenuto il punteggio massimo in un quiz.',
 '💯',
 250)

ON CONFLICT (code) DO NOTHING;


-- ===========================================
-- AGGIORNAMENTO XP BADGE MODULI
-- ===========================================

UPDATE public.badges
SET xp_reward = CASE code
    WHEN 'MODULE_00' THEN 50
    WHEN 'MODULE_01' THEN 75
    WHEN 'MODULE_02' THEN 100
    WHEN 'MODULE_03' THEN 125
    WHEN 'MODULE_04' THEN 150
    WHEN 'MODULE_05' THEN 175
    WHEN 'MODULE_06' THEN 200
    WHEN 'MODULE_07' THEN 225
    WHEN 'MODULE_08' THEN 250
    WHEN 'MODULE_09' THEN 300
    WHEN 'MODULE_10' THEN 400
END
WHERE code IN (
    'MODULE_00',
    'MODULE_01',
    'MODULE_02',
    'MODULE_03',
    'MODULE_04',
    'MODULE_05',
    'MODULE_06',
    'MODULE_07',
    'MODULE_08',
    'MODULE_09',
    'MODULE_10'
);

-- Verifica finale
SELECT
    code,
    title,
    xp_reward
FROM public.badges
WHERE code LIKE 'MODULE_%'
ORDER BY code;