Agisci come un Esperto Senior Software Architect specializzato in Next.js, React e Clean Architecture. Dobbiamo riprendere il refactoring Enterprise v2 dell'applicazione "gcprof-ai-academy". Il progetto è stato appena aggiornato a Next.js 16.2.9 (con Turbopack abilitato), React 19.2.7 e TypeScript 5. 

Stiamo lavorando al progetto "GCPROF AI Academy (V2)", una piattaforma LMS avanzata basata su Next.js (App Router, TypeScript, Turbopack) e Supabase (Auth, PostgreSQL, RLS). 

---

## 🎯 1. BUSINESS LOGIC & STATO DEL PROGETTO (V2)

### 🛠️ STATO ATTUALE DELL'ARCHITETTURA (LATO AUTH)
Abbiamo già implementato e stabilizzato con successo i seguenti livelli all'interno di `features/auth/core/`:

1. DOMINIO & PORT (Disaccoppiati):
   - Entità `StudentUser`: contiene `id`, `email`, `passwordHash`, `role` ('admin'|'student'), `displayName`, `classes: string[]`, `createdAt`, `updatedAt`.
   - Interfaccia `IUserRepository`: definisce i contratti asincroni `findByEmail`, `create`, e `list`.
   - Interfaccia `ITokenService` e costanti di configurazione per il JWT.

2. INFRASTRUTTURA & ADAPTERS CORE:
   - `JoseTokenService`: gestisce emissione, verifica e decodifica dei JWT tramite la libreria 'jose' (Edge-ready).
   - `NextCookieService`: incapsula la gestione dei cookie crittografati HTTP-Only tramite le API native `cookies()` di Next.js.

3. SERVER ACTIONS (React 19):
   - `registerAction.ts`: esegue la validazione dell'input con Zod, l'hashing della password con `bcryptjs`, e salva l'utente tramite il repository corrente.
   - `loginAction.ts`: verifica le credenziali, genera il JWT e setta il cookie HTTP-Only.
   - `logoutAction.ts`: rimuove in sicurezza il cookie di sessione.
   - `getSessionAction.ts`: recupera, convalida e decodifica il token lato server per passarlo al client.

4. SICUREZZA ROUTING (Next.js 16):
   - File `proxy.ts` (radice del progetto): sostituisce la vecchia convenzione `middleware.ts`. Intercetta le richieste a livello Edge, convalida il JWT e gestisce i redirect di sicurezza per le rotte protette (`/dashboard`, `/admin`) e per quelle di autenticazione.

5. LAYER CLIENT & REATTIVITÀ:
   - `AuthContext.tsx`: React Context client-side che inizializza lo stato dell'utente tramite `getSessionAction`, esponendo l'hook custom `useAuth()`.
   - `LoginDialog.tsx`: componente Shadcn/UI stabilizzato. Usa `useTransition` di React 19 per invocare asincronamente `loginAction` e, in caso di successo, chiama `refreshSession()` del contesto per aggiornare istantaneamente la UI senza ricaricare la pagina. Include il toggle per mostrare/nascondere la password.
   - `Navbar.tsx`: componente ufficiale aggiornato per consumare i dati reattivi di `useAuth` utilizzando le proprietà v2 (`user.displayName` e l'array `user.classes`).


Abbiamo architettato e blindato un sistema RBAC (Role-Based Access Control) basato su relazioni reali e stati approvativi:
1. **Registrazione & Stato:** I nuovi utenti si registrano scegliendo una classe di appartenenza dal DB. Il loro profilo viene creato nativamente su Supabase Auth e specchiato in `public.profiles` con stato iniziale 'pending'.
2. **Sicurezza Navbar:** La Navbar si adatta dinamicamente: mostra un badge ambrato "⏳ In attesa di attivazione" per i 'pending', un badge accademico "🎓 Classi: ..." per gli 'active', e "👨‍🏫 Admin" per gli amministratori.
3. **Flusso dei Corsi (No Falsi 404):** Nel file `page.tsx` di dettaglio corso (`app/courses/[slug]/page.tsx`), il sistema lancia un 404 reale SOLO se lo slug del corso non esiste nel sistema. Se il corso esiste, ma uno studente attivo di un'altra classe (es. Studente di 1° su Corso di 2°) tenta l'accesso, la pagina si carica regolarmente ma oscura i moduli mostrando un box rosso di "Accesso Riservato". 
4. **Variabili d'ambiente:** Configurate nel file `.env.local` come `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` lato server, gestite tramite un'inizializzazione sicura nel client centralizzato.

---

## 📂 2. FILE SYSTEM TREE DEL PROGETTO
Questo è il tree aggiornato della struttura del progetto su cui stiamo lavorando:

GCPROF-AI-ACADEMY
|   .env.local
|   .gitignore
|   components.json
|   eslint.config.mjs
|   next-env.d.ts
|   next.config.ts
|   package-lock.json
|   package.json
|   postcss.config.mjs
|   proxy.ts
|   README.md
|   tree.txt
|   tsconfig.json
|   
+---app
|   |   favicon.ico
|   |   globals.css
|   |   layout.tsx
|   |   page.tsx
|   |   
|   +---admin
|   |   |   layout.tsx
|   |   |   page.tsx
|   |   |   
|   |   \---dashboard
|   |           page.tsx
|   |           page.tsx_old
|   |           page.tsx_old2
|   |           
|   +---api
|   |   +---auth
|   |   |   +---logout
|   |   |   |       route.ts
|   |   |   |       
|   |   |   \---session
|   |   |           route.ts
|   |   |           
|   |   +---classes
|   |   |       route.ts
|   |   |       
|   |   +---docs
|   |   |   |   route.ts
|   |   |   |   
|   |   |   \---config
|   |   |           route.ts
|   |   |           
|   |   +---seed-admin
|   |   |       route.ts
|   |   |       
|   |   \---test-db
|   |           route.ts
|   |           
|   +---contacts
|   |       actions.ts
|   |       page.tsx
|   |       
|   +---courses
|   |   |   page.tsx
|   |   |   
|   |   \---[slug]
|   |       |   page.tsx
|   |       |   
|   |       \---modules
|   |           \---[moduleId]
|   |               \---lessons
|   |                   \---[lessonId]
|   |                           page.tsx
|   |                           
|   +---credits
|   |       CreditsClientWrapper.tsx
|   |       page.tsx
|   |       
|   +---dashboard
|   |       page.tsx
|   |       
|   +---login
|   |       page.tsx
|   |       
|   \---register
|           page.tsx
|           
+---components
|   |   ShowcaseSlides.tsx
|   |   
|   \---ui
|           button.tsx
|           card.tsx
|           dialog.tsx
|           dropdown-menu.tsx
|           input.tsx
|           label.tsx
|           tabs.tsx
|           textarea.tsx
|           
+---docs
|       AUTH_ARCHITECTURE.md
|       credits.md
|       HANDOVER_GEMINI.md
|       HANDOVER_GPT.md
|       README-DB.md
|       schema_01.sql
|       schema_02.sql
|       tree_full.txt
|       
+---features
|   +---admin
|   |   +---components
|   |   |       AdminUsersTable.tsx
|   |   |       CourseContentEditor.tsx
|   |   |       CreateClassForm.tsx
|   |   |       CreateCourseForm.tsx
|   |   |       ManageCategoriesForm.tsx
|   |   |       
|   |   +---core
|   |   |   \---actions
|   |   |           adminActions.ts
|   |   |           classActions.ts
|   |   |           courseActions.ts
|   |   |           structureActions.ts
|   |   |           
|   |   \---services
|   |           adminCourseService.ts
|   |           adminService.ts
|   |           adminStructureService.ts
|   |           
|   +---auth
|   |   +---components
|   |   |       LoginDialog.tsx
|   |   |       ProtectedRoute.tsx
|   |   |       
|   |   \---core
|   |       +---actions
|   |       |       getClassesAction.ts
|   |       |       getSessionAction.ts
|   |       |       loginAction.ts
|   |       |       logoutAction.ts
|   |       |       registerAction.ts
|   |       |       
|   |       +---constants
|   |       |       AuthConstants.ts
|   |       |       CookieConstants.ts
|   |       |       TokenConstants.ts
|   |       |       
|   |       +---context
|   |       |       AuthContext.tsx
|   |       |       
|   |       +---domain
|   |       |       user.ts
|   |       |       
|   |       +---dto
|   |       |       AuthDto.ts
|   |       |       
|   |       +---errors
|   |       |       AuthError.ts
|   |       |       InvalidCredentialsError.ts
|   |       |       UnauthorizedError.ts
|   |       |       UserAlreadyExistsError.ts
|   |       |       
|   |       +---infrastructure
|   |       |       BcryptPasswordService.ts
|   |       |       JoseTokenService.ts
|   |       |       Logger.ts
|   |       |       MemoryUserRepository.ts
|   |       |       NextCookieService.ts
|   |       |       RepositoryFactory.ts
|   |       |       supabaseClient.ts
|   |       |       SupabaseUserRepository.ts
|   |       |       
|   |       +---ports
|   |       |       ICookieService.ts
|   |       |       IPasswordService.ts
|   |       |       ITokenService.ts
|   |       |       IUserRepository.ts
|   |       |       
|   |       +---services
|   |       |       AuthService.ts
|   |       |       
|   |       \---validators
|   |               AuthValidators.ts
|   |               
|   +---courses
|   |   |   index.ts
|   |   |   
|   |   +---components
|   |   |   |   CategoryFilter.tsx
|   |   |   |   CourseCard.tsx
|   |   |   |   CourseList.tsx
|   |   |   |   CourseSearch.tsx
|   |   |   |   CoursesHeader.tsx
|   |   |   |   
|   |   |   \---lesson
|   |   |           LessonRenderer.tsx
|   |   |           
|   |   +---data
|   |   |       categories.ts
|   |   |       courses.ts
|   |   |       
|   |   +---hooks
|   |   |       useCourses.ts
|   |   |       
|   |   +---services
|   |   |       courseActions.ts
|   |   |       courseService.ts
|   |   |       
|   |   \---types
|   |           course.ts
|   |           lessonContent.ts
|   |           
|   \---home
|       \---components
|               CoursePreview.tsx
|               Footer.tsx
|               Hero.tsx
|               Navbar.tsx
|               
+---lib
|       supabase.ts
|       utils.ts
|       
|               
+---public
|   |   file.svg
|   |   gcprof-ai-academy_logo_01.png
|   |   gcprof-ai-academy_logo_small.png
|   |   globe.svg
|   |   next.svg
|   |   vercel.svg
|   |   window.svg
|   |   
|   +---courses
|   |       gcprof-ai-academy_logo_info_01.png
|   |       gcprof-ai-academy_logo_info_02.png
|   |       gcprof-ai-academy_logo_info_03.png
|   |       gcprof-ai-academy_logo_info_04.png
|   |       
|   \---docs
|           gcprof-ai-academy-showcase.pdf
|           showcase.txt
|           
\---shared
    +---config
    |       navigation.ts
    |       
    +---layout
    |       PublicLayout.tsx
    |       
    \---ui
            Badge.tsx
            Card.tsx
            PageContainer.tsx
            SectionTitle.tsx

---

## 💾 3. SCRIPT SQL AGGIORNATI DEL DATABASE (SUPABASE)
Le tabelle e le politiche di sicurezza (RLS) attive su Supabase sono state generate ed eseguite con questo script:

```sql
BEGIN;

-- 1. Tabella Classi
CREATE TABLE IF NOT EXISTS public.academy_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabella Profili (Estensione di auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    display_name VARCHAR(510),
    role VARCHAR(50) DEFAULT 'student'::character varying NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'::character varying NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT check_role CHECK (role IN ('admin', 'student')),
    CONSTRAINT check_status CHECK (status IN ('pending', 'active', 'blocked'))
);

-- 3. Tabella di Giunzione Molti-a-Molti (Utenti <-> Classi)
CREATE TABLE IF NOT EXISTS public.profile_classes (
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES public.academy_classes(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (profile_id, class_id)
);

-- 4. Trigger calcolo Display Name automatico
CREATE OR REPLACE FUNCTION public.set_display_name()
RETURNS TRIGGER AS $$
BEGIN
    NEW.display_name := TRIM(COALESCE(NEW.first_name, '') || ' ' || COALESCE(NEW.last_name, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_set_display_name
BEFORE INSERT OR UPDATE OF first_name, last_name ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_display_name();

-- 5. Row Level Security (RLS)
ALTER TABLE public.academy_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Classi leggibili da utenti autenticati" ON public.academy_classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Classi modificabili solo dagli Admin" ON public.academy_classes FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Gli utenti possono leggere il proprio profilo" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Gli Admin hanno controllo totale sui profili" ON public.profiles FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

COMMIT;


Di seguito gli script SQL aggiornati che definiscono la struttura del nostro DB, le policy RLS e i trigger:

## Table `users`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `email` | `text` |  Unique |
| `password_hash` | `text` |  |
| `role` | `text` |  |
| `display_name` | `text` |  |
| `classes` | `_text` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `status` | `text` |  |
| `emailVerified` | `bool` |  |

## Table `academy_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `slug` | `text` |  Unique |
| `name` | `text` |  |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `user_classes_pivot`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `user_id` | `uuid` | Primary |
| `class_id` | `uuid` | Primary |
| `created_at` | `timestamptz` |  |

## Table `profiles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `first_name` | `varchar` |  Nullable |
| `last_name` | `varchar` |  Nullable |
| `display_name` | `varchar` |  Nullable |
| `role` | `varchar` |  |
| `status` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `profile_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `profile_id` | `uuid` | Primary |
| `class_id` | `uuid` | Primary |
| `assigned_at` | `timestamptz` |  |

## Table `courses`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `slug` | `varchar` |  Unique |
| `title` | `varchar` |  |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `category` | `varchar` |  Nullable |
| `difficulty` | `varchar` |  Nullable |
| `teacher` | `varchar` |  Nullable |
| `estimated_hours` | `int4` |  Nullable |
| `cover_image` | `text` |  Nullable |
| `published` | `bool` |  Nullable |

## Table `course_modules`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `course_id` | `uuid` |  Nullable |
| `title` | `varchar` |  |
| `order_index` | `int4` |  |
| `created_at` | `timestamptz` |  |

## Table `course_lessons`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `module_id` | `uuid` |  Nullable |
| `title` | `varchar` |  |
| `slug` | `varchar` |  |
| `video_url` | `text` |  Nullable |
| `content` | `text` |  Nullable |
| `order_index` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `content_type` | `varchar` |  Nullable |
| `duration` | `int4` |  Nullable |
| `external_url` | `text` |  Nullable |

## Table `course_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `course_id` | `uuid` | Primary |
| `class_id` | `uuid` | Primary |
| `assigned_at` | `timestamptz` |  |

## Table `course_categories`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `varchar` |  Unique |
| `slug` | `varchar` |  Unique |
| `created_at` | `timestamptz` |  |

## Table `school_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `varchar` |  Unique |
| `description` | `varchar` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `document_configs`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `label` | `text` |  |
| `file_path` | `text` |  |
| `is_active` | `bool` |  Nullable |
| `updated_at` | `timestamptz` |  |



