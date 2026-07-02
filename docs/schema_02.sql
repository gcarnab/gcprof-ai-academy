BEGIN;

-- ==========================================
-- 1. DISATTIVAZIONE TRIGGER E PULIZIA TABELLE
-- ==========================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ==========================================
-- 2. CREAZIONE TABELLE ANAGRAFICHE E STRUTTURA
-- ==========================================

-- A. Classi Accademiche (Coorti)
CREATE TABLE IF NOT EXISTS public.academy_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- B. Profili Utenti (Estensione di auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    first_name CHARACTER VARYING,
    last_name CHARACTER VARYING,
    display_name CHARACTER VARYING,
    role CHARACTER VARYING NOT NULL DEFAULT 'student'::character varying CHECK (role::text = ANY (ARRAY['admin'::text, 'student'::text])),
    status CHARACTER VARYING NOT NULL DEFAULT 'pending'::character varying CHECK (status::text = ANY (ARRAY['pending'::text, 'active'::text, 'blocked'::text])),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- C. Catalogo Corsi
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 3. CREAZIONE TABELLE GERARCHICHE (CMS)
-- ==========================================

-- D. Moduli dei Corsi
CREATE TABLE IF NOT EXISTS public.course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- E. Lezioni dei Moduli
CREATE TABLE IF NOT EXISTS public.course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    video_url TEXT,
    content TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 4. CREAZIONE TABELLE PIVOT (RELAZIONI M:N)
-- ==========================================

-- F. Associazione Studenti -> Classi
CREATE TABLE IF NOT EXISTS public.profile_classes (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES public.academy_classes(id) ON DELETE CASCADE NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (profile_id, class_id)
);

-- G. Associazione Corsi -> Classi (Chi sblocca cosa)
CREATE TABLE IF NOT EXISTS public.course_classes (
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES public.academy_classes(id) ON DELETE CASCADE NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (course_id, class_id)
);

-- ==========================================
-- 5. SICUREZZA (ROW LEVEL SECURITY - RLS)
-- ==========================================
ALTER TABLE public.academy_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_classes ENABLE ROW LEVEL SECURITY;

-- Politiche Generiche di Lettura per utenti Autenticati
CREATE POLICY "Lettura classi consentita" ON public.academy_classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lettura profili consentita" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lettura corsi consentita" ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lettura moduli consentita" ON public.course_modules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lettura lezioni consentita" ON public.course_lessons FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lettura relazioni classi consentita" ON public.profile_classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lettura sblocchi corsi consentita" ON public.course_classes FOR SELECT TO authenticated USING (true);

-- Politiche di Scrittura Totale (Riservate agli Admin) via JWT Role Check
CREATE POLICY "Admin controllo totale classi" ON public.academy_classes FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin controllo totale profili" ON public.profiles FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin controllo totale corsi" ON public.courses FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin controllo totale moduli" ON public.course_modules FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin controllo totale lezioni" ON public.course_lessons FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin controllo totale rel_classi" ON public.profile_classes FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin controllo totale sblocchi" ON public.course_classes FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- ==========================================
-- 6. AUTOMAZIONE: TRIGGER NUOVI UTENTI AUTH
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, display_name, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'Student'),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'student',
    'pending'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMIT;