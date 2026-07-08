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
|   |   robots.ts
|   |   sitemap.ts
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
|   +---auth
|   |   \---reset-password
|   |           page.tsx
|   |           ResetPasswordClient.tsx
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
|   |       CreditsClientWrapper.tsx_old
|   |       page.tsx
|   |       
|   +---dashboard
|   |       layout.tsx
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
|           checkbox.tsx
|           dialog.tsx
|           dropdown-menu.tsx
|           input.tsx
|           label.tsx
|           select.tsx
|           table.tsx
|           tabs.tsx
|           textarea.tsx
|           
+---docs
|   |   credits.md
|   |   HANDOVER_PROMPT.md
|   |   Python_Practice.md
|   |   Python_Practice_Full.md
|   |   Python_Practice_Gem.md
|   |   Python_Practice_GPT.md
|   |   Python_Practice_LM.md
|   |   README-DB.md
|   |   
|   \---supabase
|           data.sql
|           roles.sql
|           schema.sql
|           
+---features
|   +---admin
|   |   +---courses
|   |   |   +---actions
|   |   |   |       assignCourseClassAction.ts
|   |   |   |       classActions.ts
|   |   |   |       courseActions.ts
|   |   |   |       structureActions.ts
|   |   |   |       
|   |   |   +---components
|   |   |   |       ActiveAssociationsList.tsx
|   |   |   |       AssignCourseClassForm.tsx
|   |   |   |       CourseContentEditor.tsx
|   |   |   |       CoursesTab.tsx
|   |   |   |       CreateClassForm.tsx
|   |   |   |       CreateCourseForm.tsx
|   |   |   |       ManageCategoriesForm.tsx
|   |   |   |       
|   |   |   \---services
|   |   |           adminCourseService.ts
|   |   |           adminStructureService.ts
|   |   |           
|   |   +---dashboard
|   |   |   +---actions
|   |   |   |       adminActions.ts
|   |   |   |       
|   |   |   \---components
|   |   |           AdminDashboard.tsx
|   |   |           AdminHeader.tsx
|   |   |           
|   |   +---mail
|   |   |   +---actions
|   |   |   |       mailBulkActions.ts
|   |   |   |       mailBulkActions.ts_resend
|   |   |   |       mailSettingsActions.ts
|   |   |   |       mailTemplateActions.ts
|   |   |   |       mailTestActions.ts
|   |   |   |       
|   |   |   +---components
|   |   |   |       MailBulkSender.tsx
|   |   |   |       MailDashboard.tsx
|   |   |   |       MailSettingsCard.tsx
|   |   |   |       MailTab.tsx
|   |   |   |       MailTemplateEditor.tsx
|   |   |   |       MailTemplateList.tsx
|   |   |   |       MailTestSender.tsx
|   |   |   |       
|   |   |   +---constants
|   |   |   |       MailTemplateKeys.ts
|   |   |   |       
|   |   |   +---providers
|   |   |   |       EmailProvider.ts
|   |   |   |       GmailProvider.ts
|   |   |   |       ResendProvider.ts
|   |   |   |       
|   |   |   +---services
|   |   |   |       EmailService.ts
|   |   |   |       MailSettingsService.ts
|   |   |   |       MailTemplateEngine.ts
|   |   |   |       MailTemplateService.ts
|   |   |   |       
|   |   |   \---types
|   |   |           mail.ts
|   |   |           
|   |   +---stats
|   |   |   +---components
|   |   |   |   |   AdminStatsDashboard.tsx
|   |   |   |   |   StatsTab.tsx
|   |   |   |   |   
|   |   |   |   \---charts
|   |   |   |           BarChartCard.tsx
|   |   |   |           DonutChartCard.tsx
|   |   |   |           HorizontalBarChartCard.tsx
|   |   |   |           PieChartCard.tsx
|   |   |   |           StatsKpiCards.tsx
|   |   |   |           StudentsByClassChart.tsx
|   |   |   |           
|   |   |   \---services
|   |   |           adminStatsService.ts
|   |   |           
|   |   +---tracking
|   |   |   +---components
|   |   |   |       TrackingDashboard.tsx
|   |   |   |       TrackingTab.tsx
|   |   |   |       
|   |   |   +---infrastructure
|   |   |   |       TrackingRepository.ts
|   |   |   |       
|   |   |   \---services
|   |   |           trackingQueries.ts
|   |   |           trackingService.ts
|   |   |           
|   |   \---users
|   |       +---actions
|   |       |       activityActions.ts
|   |       |       adminUserActions.ts
|   |       |       bulkActivateUsersAction.ts
|   |       |       seedUsersAction.ts
|   |       |       
|   |       +---components
|   |       |       ActivityTracker.tsx
|   |       |       AdminUsersClassesEditor.tsx
|   |       |       AdminUsersHeader.tsx
|   |       |       AdminUsersRow.tsx
|   |       |       AdminUsersTable.tsx
|   |       |       AdminUsersToolbar.tsx
|   |       |       UsersTab.tsx
|   |       |       
|   |       \---services
|   |               adminService.ts
|   |               
|   +---auth
|   |   +---actions
|   |   |       confirmPasswordResetAction.ts
|   |   |       getClassesAction.ts
|   |   |       getSessionAction.ts
|   |   |       loginAction.ts
|   |   |       logoutAction.ts
|   |   |       registerAction.ts
|   |   |       requestPasswordResetAction.ts
|   |   |       validateResetTokenAction.ts
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
|   |   |       PasswordResetService.ts
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
|   |   |   |   MarkdownPreview.tsx
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
|   +---profile
|   |   +---components
|   |   |       ProfileForm.tsx
|   |   |       
|   |   \---services
|   |           profileActions.ts
|   |           
|   \---theme
|       +---components
|       |       ThemeToggle.tsx
|       |       
|       \---context
|               ThemeContext.tsx
|               
+---lib
|       logger.ts
|       supabase.ts
|       utils.ts
|       
+---logs
|       app.log
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
|   |       gcprof-academy-showcase.pdf
|   |       
|   \---showcase
|           gcprof-academy-showcase_gemini.pdf
|           index.html
|           
+---shared
|   +---config
|   |       navigation.ts
|   |       site.ts
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
| `total_minutes_active` | `int4` |  |

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

## Table `mail_settings`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `text` | Primary |
| `value` | `text` |  |
| `updated_at` | `timestamptz` |  |

## Table `mail_templates`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `template_key` | `text` |  Unique |
| `name` | `varchar` |  |
| `description` | `text` |  Nullable |
| `subject` | `varchar` |  |
| `title_override` | `varchar` |  Nullable |
| `body_text_override` | `text` |  Nullable |
| `enabled` | `bool` |  |
| `version` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `updated_by` | `uuid` |  Nullable |

## Table `mail_logs`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `template_key` | `text` |  |
| `recipient` | `text` |  |
| `subject` | `text` |  |
| `status` | `text` |  |
| `provider` | `text` |  |
| `provider_id` | `text` |  Nullable |
| `error_message` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `password_reset_tokens`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `user_id` | `uuid` |  |
| `token` | `text` |  Unique |
| `expires_at` | `timestamp` |  |
| `used` | `bool` |  |
| `created_at` | `timestamp` |  |

## Table `profile_lessons_progress`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `profile_id` | `uuid` | Primary |
| `lesson_id` | `uuid` | Primary |
| `course_id` | `uuid` |  Nullable |
| `is_completed` | `bool` |  |
| `minutes_watched` | `int4` |  |
| `last_accessed_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `user_sessions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  |
| `login_at` | `timestamptz` |  |
| `logout_at` | `timestamptz` |  Nullable |
| `session_duration_seconds` | `int4` |  Nullable |
| `ip_address` | `text` |  Nullable |
| `user_agent` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |


### PROMPT 

CONTESTO :  
1.aggiungiamo nuove features all'app custom gcprof-ai-academy. 
2.ho comprato un dominio su cloudflare gcprof-academy.com già configurato su vercel 
dove ho fatto hosting del progetto gcprof-ai-academy.vercel.app

ULTIMI BUG RISCONTRATI :
1. app stabile

ULTIMI FEATURES INTRODOTTE :
1. feature in fase di sviluppo ma stabile

OBIETTIVO : 
1. migliorare il sistema di tracking accessi degli utenti completo su DB

VINCOLI: 
1. chiedimi quale file attuale visualizzare per sincronizzarti con la situazione attuale e ti mando il codice. 
2. ricorda di aspettare sempre la mia conferma per scrivere il codice
3. fai riferimento al tree del filesystem del progetto ed allo schema del DB allegati in questa chat
4. intercetta sempre i punti hardcoded che adrebbero spostati nel file .env come variabili
5. procediamo per gradi senza distruggere il codice integrando le modifiche passo passo 
e testando che non stiamo regredendo
6. ricorda di predisporre i nomi delle classi per la feature già abilitata theme light/dark
7. usa il logger disponibile nel codice per poterlo utilizzare e risolvere più facilmente i bug
8. non fare troppo refactoring e punta a risolvere il problema mantenendo la logica attuale