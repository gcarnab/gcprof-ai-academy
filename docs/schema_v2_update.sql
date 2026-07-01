-- ============================================================================
-- SCRIPT SQL: AGGIORNAMENTO SCHEMA ACADEMY V2
-- AUTORE: Gemini AI Collaborator
-- DESCRIZIONE: Gestione relazionale delle classi, profili utente estesi
--              e politiche di sicurezza (RLS) su Supabase.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- 1. TABELLA CLASSI (ACADEMY CLASSES)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academy_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Commenti descrittivi per il dizionario dati di Supabase
COMMENT ON TABLE public.academy_classes IS 'Contiene le classi ufficiali dell''Academy a cui gli studenti possono iscriversi.';
COMMENT ON COLUMN public.academy_classes.name IS 'Nome univoco della classe (es. "Classe AI Avanzata 2026").';

-- ----------------------------------------------------------------------------
-- 2. TABELLA PROFILI UTENTE (PROFILES)
-- ----------------------------------------------------------------------------
-- Nota: Questa tabella estende la tabella nativa auth.users di Supabase
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    display_name VARCHAR(510),
    role VARCHAR(50) DEFAULT 'student'::character varying NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'::character varying NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Vincoli di validità sui domini applicativi
    CONSTRAINT check_role CHECK (role IN ('admin', 'student')),
    CONSTRAINT check_status CHECK (status IN ('pending', 'active', 'blocked'))
);

COMMENT ON TABLE public.profiles IS 'Estensione dei dati utente sincronizzati con l''autenticazione nativa di Supabase.';
COMMENT ON COLUMN public.profiles.status IS 'Stato di approvazione: pending (in attesa), active (attivo), blocked (bloccato).';

-- ----------------------------------------------------------------------------
-- 3. TABELLA DI GIUNZIONE N:M (USER CLASSES INTERSECTION)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile_classes (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES public.academy_classes(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (profile_id, class_id)
);

COMMENT ON TABLE public.profile_classes IS 'Tabella di giunzione per la relazione Molti-a-Molti tra profili utenti e classi.';

-- ----------------------------------------------------------------------------
-- 4. TRIGGER PER IL CALCOLO DEL DISPLAY NAME
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_display_name()
RETURNS TRIGGER AS $$
BEGIN
    NEW.display_name := COALESCE(NEW.first_name, '') || ' ' || COALESCE(NEW.last_name, '');
    -- Rimuove spazi vuoti superflui ai lati
    NEW.display_name := TRIM(NEW.display_name);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_set_display_name
BEFORE INSERT OR UPDATE OF first_name, last_name ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_display_name();

-- ----------------------------------------------------------------------------
-- 5. ABILITAZIONE SICUREZZA (ROW LEVEL SECURITY - RLS)
-- ----------------------------------------------------------------------------
ALTER TABLE public.academy_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_classes ENABLE ROW LEVEL SECURITY;

-- Politiche di lettura/scrittura per ACADEMY_CLASSES
CREATE POLICY "Classi leggibili da utenti autenticati" 
    ON public.academy_classes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Classi modificabili solo dagli Admin" 
    ON public.academy_classes FOR ALL TO authenticated 
    USING (auth.jwt() ->> 'role' = 'admin');

-- Politiche di lettura/scrittura per PROFILES
CREATE POLICY "Gli utenti possono leggere il proprio profilo" 
    ON public.profiles FOR SELECT TO authenticated 
    USING (auth.uid() = id);

CREATE POLICY "Gli Admin hanno controllo totale sui profili" 
    ON public.profiles FOR ALL TO authenticated 
    USING (auth.jwt() ->> 'role' = 'admin');

COMMIT;