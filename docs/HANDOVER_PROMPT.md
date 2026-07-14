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
|   |   +---dashboard
|   |   |       page.tsx
|   |   |       
|   |   \---quiz
|   |       |   actions.ts
|   |       |   
|   |       \---[id]
|   |           +---analytics
|   |           |       page.tsx
|   |           |       
|   |           \---review
|   |                   page.tsx
|   |                   
|   +---api
|   |   +---admin
|   |   |   \---quizzes
|   |   |           route.ts
|   |   |           
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
|   |   |   +---config
|   |   |   |       route.ts
|   |   |   |       
|   |   |   \---upload
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
|   |       |   page.tsx_old
|   |       |   
|   |       +---modules
|   |       |   \---[moduleId]
|   |       |       \---lessons
|   |       |           \---[lessonId]
|   |       |                   page.tsx
|   |       |                   page.tsx_old
|   |       |                   
|   |       \---quizzes
|   |           \---[quizId]
|   |                   page.tsx
|   |                   
|   +---credits
|   |       CreditsClientWrapper.tsx
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
|           alert.tsx
|           badge.tsx
|           button.tsx
|           card.tsx
|           checkbox.tsx
|           dialog.tsx
|           dropdown-menu.tsx
|           input.tsx
|           label.tsx
|           radio-group.tsx
|           select.tsx
|           table.tsx
|           tabs.tsx
|           textarea.tsx
|           
+---docs
|   |   credits.md
|   |   gcprof-academy_DEV_GUIDE.md
|   |   HANDOVER_PROMPT.md
|   |   Python_Practice.md
|   |   Python_Practice_Full.md
|   |   Python_Practice_Gem.md
|   |   Python_Practice_GPT.md
|   |   Python_Practice_LM.md
|   |   README-DB.md
|   |   
|   +---quiz
|   |       quiz_AI_base_01.md
|   |       template.md
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
|   |   |           QuizAnalyticsDashboard.tsx
|   |   |           
|   |   +---mail
|   |   |   +---actions
|   |   |   |       mailBulkActions.ts
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
|   |   |   +---actions
|   |   |   |       trackPageViewAction.ts
|   |   |   |       
|   |   |   +---components
|   |   |   |       PageTracker.tsx
|   |   |   |       TrackingDashboard.tsx
|   |   |   |       TrackingTab.tsx
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
|   |   |       MemoryUserRepository.ts
|   |   |       NextCookieService.ts
|   |   |       RepositoryFactory.ts
|   |   |       ResendEmailService.ts
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
|   |   +---actions
|   |   |       courseActions.ts
|   |   |       
|   |   +---components
|   |   |   |   CategoryFilter.tsx
|   |   |   |   CourseCard.tsx
|   |   |   |   CourseDashboard.tsx
|   |   |   |   CourseList.tsx
|   |   |   |   CourseSearch.tsx
|   |   |   |   CoursesHeader.tsx
|   |   |   |   CourseViewer.tsx
|   |   |   |   MarkdownPreview.tsx
|   |   |   |   
|   |   |   \---lesson
|   |   |           LessonRenderer.tsx
|   |   |           
|   |   +---domain
|   |   |       CourseMapper.ts
|   |   |       
|   |   +---hooks
|   |   |       useCourses.ts
|   |   |       
|   |   +---queries
|   |   |       getStudentCourses.ts
|   |   |       getStudentCourses.ts_old
|   |   |       
|   |   +---repositories
|   |   |       SupabaseCourseRepository.ts
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
|   +---quiz
|   |   +---actions
|   |   |       getQuizAction.ts
|   |   |       quizActions.ts
|   |   |       statsActions.ts
|   |   |       teacherActions.ts
|   |   |       
|   |   +---components
|   |   |       AdminQuizPanel.tsx
|   |   |       AssignQuizButton.tsx
|   |   |       AssignQuizModal.tsx
|   |   |       CorrectionForm.tsx
|   |   |       QuizStatsDashboard.tsx
|   |   |       QuizViewer.tsx
|   |   |       TeacherQuizDashboard.tsx
|   |   |       
|   |   +---domain
|   |   |       Question.ts
|   |   |       Quiz.ts
|   |   |       QuizAnswer.ts
|   |   |       QuizAttempt.ts
|   |   |       QuizReview.ts
|   |   |       
|   |   +---markdown
|   |   |   \---parser
|   |   |           quizParser.ts
|   |   |           
|   |   +---ports
|   |   |       IQuizRepository.ts
|   |   |       
|   |   +---repositories
|   |   |       QuizRepositoryFactory.ts
|   |   |       QuizStatsRepository.ts
|   |   |       SupabaseQuizRepository.ts
|   |   |       
|   |   \---validators
|   |           quizValidators.ts
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
| `allowed_classes` | `_text` |  |

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

## Table `user_page_views`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  Nullable |
| `path` | `text` |  |
| `course_slug` | `text` |  Nullable |
| `lesson_slug` | `text` |  Nullable |
| `viewed_at` | `timestamptz` |  |

## Table `quizzes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `varchar` |  |
| `description` | `text` |  Nullable |
| `status` | `quiz_status` |  |
| `penalty_enabled` | `bool` |  |
| `negative_mark` | `numeric` |  |
| `max_score` | `numeric` |  |
| `created_by` | `uuid` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `passing_score` | `numeric` |  |

## Table `quiz_questions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `quiz_id` | `uuid` |  |
| `type` | `question_type` |  |
| `order_index` | `int4` |  |
| `text` | `text` |  |
| `points` | `numeric` |  |
| `created_at` | `timestamptz` |  |

## Table `quiz_options`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `question_id` | `uuid` |  |
| `text` | `text` |  |
| `is_correct` | `bool` |  |

## Table `course_quizzes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `course_id` | `uuid` | Primary |
| `quiz_id` | `uuid` | Primary |

## Table `quiz_attempts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `quiz_id` | `uuid` |  |
| `student_id` | `uuid` |  |
| `started_at` | `timestamptz` |  |
| `completed_at` | `timestamptz` |  Nullable |
| `auto_score` | `numeric` |  |
| `teacher_score` | `numeric` |  |
| `final_score` | `numeric` |  |
| `status` | `attempt_status` |  |
| `created_at` | `timestamptz` |  |

## Table `quiz_answers`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `attempt_id` | `uuid` |  |
| `question_id` | `uuid` |  |
| `selected_option_id` | `uuid` |  Nullable |
| `open_answer_text` | `text` |  Nullable |
| `is_correct` | `bool` |  Nullable |
| `score` | `numeric` |  |
| `created_at` | `timestamptz` |  |

## Table `quiz_reviews`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `attempt_id` | `uuid` |  |
| `teacher_id` | `uuid` |  Nullable |
| `question_id` | `uuid` |  |
| `score` | `numeric` |  |
| `comment` | `text` |  Nullable |
| `reviewed_at` | `timestamptz` |  |

## Table `lessons`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `module_id` | `uuid` |  |
| `title` | `text` |  |
| `duration` | `int4` |  |
| `content_type` | `text` |  |
| `youtube_url` | `text` |  Nullable |
| `google_drive_url` | `text` |  Nullable |
| `quiz_id` | `uuid` |  Nullable |
| `sort_order` | `int4` |  |
| `created_at` | `timestamptz` |  |

## Table `quiz_assignments`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `quiz_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `assigned_at` | `timestamptz` |  |
| `due_at` | `timestamptz` |  Nullable |
| `is_visible` | `bool` |  |




### PROMPT 

CONTESTO :  
1.aggiungiamo nuove features all'app custom gcprof-ai-academy. 
2.ho comprato un dominio su cloudflare gcprof-academy.com già configurato su vercel 
dove ho fatto hosting del progetto gcprof-ai-academy.vercel.app

ULTIMI BUG RISCONTRATI :
1. app stabile

ULTIMI FEATURES INTRODOTTE :
1. feature in fase di sviluppo

OBIETTIVO : 
Migliorare la funzionalità gestione QUIZ attualmente in fase di sviluppo. Capire lo stato dell'arte attuale.
Fare refactoring e mantenere un flusso univoco e stabile sfoltendo il codice doppio o inutile o orfano a causa di 
livelli diversi di analisi effettuati con diversi modelli AI.

Le seguenti sono le caratteristiche minime che un quiz deve possedere:

1. Deve contenere 8 domande chiuse a risposta multipla ognuna con quattro alternative non ambigue di cui solo una giusta.
2. Deve contenere 1 domanda aperta
3. La domanda aperta deve essere validata dal docente che può assegnare un punteggio da 0 a 6
4. Ogni domanda chiusa vale 0.5 punti per un totale di 4 punti massimi su 8 domande 
5. Le risposte errate delle domande chiuse possono essere penalizzate di 0.25 punti ognuna. La penalizzazione deve essere impostabile ed abilitabile dal creatore del quiz.
6. L'unico a creare i quiz è l'utente admin. 
7. Il punteggio massimo ottenibile dallo studente è 10/10
8. Ogni quiz creato sarà in modalità draft fino a quando l'amministratore deciderà di associarlo allo specifico corso e renderlo attivo.
9. Ogni corso può avere più quiz associati 
10. Il template che caricherà automaticamente la struttura di un particolare quiz sarà in formato markdown.
11. Dovrai creare tu la struttura del template necessario per generare un quiz commentando il markdown generato.
12. In fase di creazione del quiz il sistema prevede il caricamento del template markdown ed automaticamente verrà generato il quiz.
13. Gli argomenti e le domande dei quiz saranno a carico del creatore che le inserirà nel template al posto giusto usando l'intelligenza artificiale per creare il contenuto del quiz fornendo il template da seguire.
14. Bisogna predisporre tutta la struttura del DB adeguata in modo che lo specifico quiz sarà disponibile per gli studenti iscritti allo specifico corso al quale è assegnato il quiz.
15. Sarà presente una sezione dedicata nella dashboard di amministrazione chiamata QUIZ all'interno della quale sarà possibile gestire per intero i quiz e le domande di ogni quiz(CRUD) 
16. Nella sezione QUIZ sarà possibile effettuare le correzioni del quiz per ogni studente iscritto allo specifico corso.
17. La sotto sezione QUIZ sarà presente anche nella sezione STATS della dashboard all'interno della quale ci saranno i grafici relativi ai quiz. 

per non andare fuori obiettivo ti descrivo la situazione attuale :
1. faccio login come admin
2. vado nella sezione QUIZ della admin/dashboard
3. uso il tasto importa da markdown e seleziono un template di quiz valido
4. il sistema processa correttamente e mostra Quiz importato e salvato nel database con successo!
5. il nuovo quiz viene mostrato nella lista sottostante co il seguenti campi di intestazione : titolo del quiz, soglia minima, Azioni
6. faccio click sul tasto "Analizza risultati" del quiz appena creato
7. atterro su una pagina "Admin Analytics" in questa sezione ho due pulsanti "Assegna al corso", "Correggi Quiz" 
oltre che una lista che rappresenta il registro dei test
RICHIESTE :
- la lista registro test deve essere predisposta a gestire un numero elevato di record deve avere funzionalità di ricerca per 
poter individuare con precisione i quiz da analizzare
- introdurre il filtraggio per corso e per classi
- la pagina deve avere un abreadcrumb per tornare alla sezione di partenza della dashboard admin 
- la pagina deve dare la possibilità di modificare la correzione della domanda aperto e quindi cambiare di conseguenza il punteggio

8. faccio click sul pulsante "Assegna al corso"
9. uso il popup per assegnare il quiz ad un corso ottengo : 🎉 Quiz assegnato con successo! 
sul db viene popolata la tabella quiz_assignments
10. vado nella sezione corsi seleziono il corso al quale ho assegnato il quiz e vedo il quiz come link
11. faccio click sul link del quiz eseguo il quiz compilando tutte le risposte
12. faccio click sul tasto "Analizza risultati" atterro su una pagina "Admin Analytics" in questa sezione ho due pulsanti "Assegna al corso", "Correggi Quiz"
13. faccio click su "Correggi Quiz" ed eseguo la correzione del quiz nella sezione Registro Correzioni Quiz
RICHIESTE :
- la pagina deve avere un abreadcrumb per tornare alla sezione di partenza della dashboard admin 
- la pagina deve avere navbar e footer



VINCOLI: 
1. chiedimi quale file attuale visualizzare per sincronizzarti con la situazione attuale e ti mando il codice. 
2. ricorda di aspettare sempre la mia conferma per scrivere il codice
3. fai riferimento al tree del filesystem del progetto ed allo schema del DB allegati in questa chat
4. intercetta sempre i punti hardcoded che adrebbero spostati nel file .env come variabili
5. procediamo per gradi senza distruggere il codice integrando le modifiche passo passo e testando che non stiamo regredendo
6. ricorda di predisporre i nomi delle classi per la feature già abilitata theme light/dark
7. usa sempre il logger disponibile nel codice che scrivi 
8. fare il refactoring essenziale e puntare a risolvere il problema mantenendo quanto più possibile la logica attuale senza regredire