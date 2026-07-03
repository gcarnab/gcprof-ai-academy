Agisci come un Esperto Senior Software Architect specializzato in Next.js, React e Clean Architecture. Dobbiamo riprendere il refactoring Enterprise v2 dell'applicazione "gcprof-ai-academy". Stiamo lavorando al progetto "GCPROF AI Academy (V2)", una piattaforma LMS avanzata basata su Next.js (App Router, TypeScript, Turbopack) e Supabase (Auth, PostgreSQL, RLS). 
Di seguito trovi il contesto completo, lo schema del database e la struttura del progetto "gcprof-ai-academy". Il tuo compito è assorbire queste informazioni e attendere le mie prossime istruzioni operative per continuare lo sviluppo.

### 1. PANORAMICA DEL PROGETTO
Il progetto è una piattaforma Academy ("gcprof-ai-academy") per la gestione di corsi, moduli e lezioni multimediali, con un controllo degli accessi granulare basato sulle classi scolastiche. L'applicazione utilizza Next.js con Server Actions (`"use server"`) e Supabase come backend tramite `supabaseAdmin` (`@supabase/supabase-js`).

### 📂 2. FILE SYSTEM TREE DEL PROGETTO
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




### 💾 3. SCRIPT SQL AGGIORNATI DEL DATABASE (SUPABASE)
Il database gestisce ID flessibili (che possono essere stringhe/UUID o interi autoincrementanti). Le relazioni pivot collegano i corsi alle classi abilitate.

```sql
-- Anagrafica Classi
CREATE TABLE academy_classes (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Anagrafica Categorie Corsi
CREATE TABLE course_categories (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella Corsi
CREATE TABLE courses (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    category VARCHAR(255) DEFAULT 'Informatica',
    difficulty VARCHAR(50) DEFAULT 'Facile',
    teacher VARCHAR(255) DEFAULT 'Prof. G. Carnabuci',
    estimated_hours INT DEFAULT 0,
    cover_image VARCHAR(255) DEFAULT '/courses/gcprof-ai-academy_logo_info_01.png',
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relazione Pivot autonoma: Corsi <-> Classi Abilitate
CREATE TABLE course_classes (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    class_id BIGINT REFERENCES academy_classes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(course_id, class_id)
);

-- Tabella Moduli (collegati ai Corsi)
CREATE TABLE course_modules (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella Lezioni (collegate ai Moduli)
CREATE TABLE course_lessons (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    module_id BIGINT REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) NOT NULL, -- 'video' | 'document'
    external_url TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    duration INT DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

create table public.document_configs (
  id text not null,
  label text not null,
  file_path text not null,
  is_active boolean null default true,
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  constraint document_configs_pkey primary key (id)
) TABLESPACE pg_default;

---

