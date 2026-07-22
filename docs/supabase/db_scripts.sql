----------------------------------------
-- Trigger di Protezione Admin
----------------------------------------


-- 1. Creazione della funzione di controllo
CREATE OR REPLACE FUNCTION prevent_admin_deletion()
RETURNS TRIGGER AS $$
BEGIN
    -- Controlla sia il vecchio campo 'role' che il nuovo 'user_type'
    IF OLD.role = 'admin' OR OLD.user_type = 'ADMIN' THEN
        RAISE EXCEPTION 'OPERAZIONE BLOCCATA: Impossibile eliminare il profilo ADMIN (%)', COALESCE(OLD.email, OLD.id::text);
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 2. Applicazione del Trigger alla tabella profiles
DROP TRIGGER IF EXISTS trg_prevent_admin_deletion ON profiles;

CREATE TRIGGER trg_prevent_admin_deletion
BEFORE DELETE ON profiles
FOR EACH ROW
EXECUTE FUNCTION prevent_admin_deletion();

----------------------------------------
-- Script di Cancellazione Bulk Sicura
----------------------------------------


BEGIN;

-- 1. Pulizia relazioni classi (profile_classes) per gli utenti non-admin
DELETE FROM profile_classes
WHERE profile_id IN (
    SELECT id FROM profiles 
    WHERE (role != 'admin' OR role IS NULL) 
      AND (user_type != 'ADMIN' OR user_type IS NULL)
);

-- 2. Pulizia eventuali relazioni corsi (profile_courses)
DELETE FROM profile_courses
WHERE profile_id IN (
    SELECT id FROM profiles 
    WHERE (role != 'admin' OR role IS NULL) 
      AND (user_type != 'ADMIN' OR user_type IS NULL)
);

-- 3. Cancellazione di tutti i profili tranne gli ADMIN
DELETE FROM profiles
WHERE (role != 'admin' OR role IS NULL) 
  AND (user_type != 'ADMIN' OR user_type IS NULL);

COMMIT;

