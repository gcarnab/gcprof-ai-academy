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