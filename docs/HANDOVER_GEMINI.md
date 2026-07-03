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
|   |   \---seed-admin
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
|   +---profile
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
|       DB_DUMP.sql
|       HANDOVER_GEMINI.md
|       HANDOVER_GPT.md
|       README-DB.md
|       schema_01.sql
|       schema_02.sql
|       tree.txt
|       
+---features
|   +---admin
|   |   +---actions
|   |   |       adminActions.ts
|   |   |       assignCourseClassAction.ts
|   |   |       bulkActivateUsersAction.ts
|   |   |       classActions.ts
|   |   |       courseActions.ts
|   |   |       structureActions.ts
|   |   |       
|   |   +---components
|   |   |       AdminStatsDashboard.tsx
|   |   |       AdminUsersTable.tsx
|   |   |       AssignCourseClassForm.tsx
|   |   |       CourseContentEditor.tsx
|   |   |       CreateClassForm.tsx
|   |   |       CreateCourseForm.tsx
|   |   |       ManageCategoriesForm.tsx
|   |   |       
|   |   \---services
|   |           adminCourseService.ts
|   |           adminService.ts
|   |           adminStructureService.ts
|   |           
|   +---auth
|   |   +---actions
|   |   |       getClassesAction.ts
|   |   |       getSessionAction.ts
|   |   |       loginAction.ts
|   |   |       logoutAction.ts
|   |   |       registerAction.ts
|   |   |       
|   |   +---components
|   |   |       LoginDialog.tsx
|   |   |       ProtectedRoute.tsx
|   |   |       
|   |   +---constants
|   |   |       AuthConstants.ts
|   |   |       CookieConstants.ts
|   |   |       TokenConstants.ts
|   |   |       
|   |   +---context
|   |   |       AuthContext.tsx
|   |   |       
|   |   +---domain
|   |   |       user.ts
|   |   |       
|   |   +---dto
|   |   |       AuthDto.ts
|   |   |       
|   |   +---errors
|   |   |       AuthError.ts
|   |   |       InvalidCredentialsError.ts
|   |   |       UnauthorizedError.ts
|   |   |       UserAlreadyExistsError.ts
|   |   |       
|   |   +---infrastructure
|   |   |       BcryptPasswordService.ts
|   |   |       JoseTokenService.ts
|   |   |       Logger.ts
|   |   |       MemoryUserRepository.ts
|   |   |       NextCookieService.ts
|   |   |       RepositoryFactory.ts
|   |   |       ResendEmailService.ts
|   |   |       supabaseClient.ts
|   |   |       SupabaseUserRepository.ts
|   |   |       
|   |   +---ports
|   |   |       ICookieService.ts
|   |   |       IPasswordService.ts
|   |   |       ITokenService.ts
|   |   |       IUserRepository.ts
|   |   |       
|   |   +---services
|   |   |       AuthService.ts
|   |   |       
|   |   \---validators
|   |           AuthValidators.ts
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
|   |   +---hooks
|   |   |       useCourses.ts
|   |   |       
|   |   +---queries
|   |   |       getStudentCourses.ts
|   |   |       
|   |   +---services
|   |   |       courseActions.ts
|   |   |       courseService.ts
|   |   |       
|   |   \---types
|   |           course.ts
|   |           lessonContent.ts
|   |           
|   +---home
|   |   \---components
|   |           CoursePreview.tsx
|   |           Footer.tsx
|   |           Hero.tsx
|   |           Navbar.tsx
|   |           
|   \---profile
|       +---components
|       |       ProfileForm.tsx
|       |       
|       \---services
|               profileActions.ts
|               
+---lib
|       supabase.ts
|       utils.ts
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
|   +---docs
|   |       gcprof-ai-academy-showcase.pdf
|   |       showcase.txt
|   |       
|   \---showcase
|           index.txt
|           
+---shared
|   +---config
|   |       navigation.ts
|   |       
|   +---layout
|   |       PublicLayout.tsx
|   |       
|   \---ui
|           Badge.tsx
|           Card.tsx
|           PageContainer.tsx
|           SectionTitle.tsx
|           
+---supabase
|   |   .gitignore
|   |   config.toml
|   |   
|   \---.temp
|           gotrue-version
|           linked-project.json
|           pooler-url
|           postgres-version
|           project-ref
|           rest-version
|           storage-migration
|           storage-version
|           
\---types
        database.types.ts
        


### 💾 3. SCRIPT SQL AGGIORNATI DEL DATABASE (SUPABASE)
Il database gestisce ID flessibili (che possono essere stringhe/UUID o interi autoincrementanti). Le relazioni pivot collegano i corsi alle classi abilitate.

## Table `academy_classes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `slug` | `text` |  Unique |
| `name` | `text` |  |
| `description` | `text` |  Nullable |
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
| `email` | `text` |  Nullable Unique |
| `password_hash` | `text` |  Nullable |
| `avatar_url` | `text` |  Nullable |

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

## Table `document_configs`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `label` | `text` |  |
| `file_path` | `text` |  |
| `is_active` | `bool` |  Nullable |
| `updated_at` | `timestamptz` |  |

## Table `profile_courses`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `profile_id` | `uuid` | Primary |
| `course_id` | `uuid` | Primary |
| `enrolled_at` | `timestamptz` |  |


---

