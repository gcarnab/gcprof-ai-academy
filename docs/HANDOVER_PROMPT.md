Agisci come un Esperto Senior Software Architect specializzato in Next.js, React e Clean Architecture. Dobbiamo riprendere il refactoring Enterprise v2 dell'applicazione "gcprof-ai-academy". Stiamo lavorando al progetto "GCPROF Academy", una piattaforma LMS avanzata basata su Next.js (App Router, TypeScript, Turbopack) e Supabase (Auth, PostgreSQL, RLS).
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
|   vitest.config.ts
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
|   |   +---enrollments
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
|   |   +---seed-admin
|   |   |       route.ts
|   |   |       
|   |   \---webhooks
|   |       \---stripe
|   |               route.ts
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
|   |   |   page.tsx_old
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
|   |       page.tsx_old
|   |       
|   +---login
|   |       page.tsx
|   |       
|   +---profile
|   |       page.tsx
|   |       
|   +---register
|   |       page.tsx
|   |       page.tsx_old
|   |       
|   +---resources
|   |       page.tsx
|   |       
|   \---students
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
|           form.tsx
|           input.tsx
|           label.tsx
|           progress.tsx
|           radio-group.tsx
|           select.tsx
|           table.tsx
|           tabs.tsx
|           textarea.tsx
|           
+---docs
|   |   credits.md
|   |   gcprof-academy_DEV_GUIDE.md
|   |   gcprof-academy_index_gpt.md
|   |   HANDOVER_PROMPT.md
|   |   README-DB.md
|   |   
|   +---courses
|   |   |   Blockchain_Guide_Full.md
|   |   |   ProblemSolving_Guide_Full.md
|   |   |   Python_Practice_Full.md
|   |   |   WebProgramming_Base_HTML_CSS_Full.md
|   |   |   
|   |   \---preview
|   |           Blockchain_01_preview.md
|   |           ProbleSolving_01_preview.md
|   |           
|   +---dev
|   |       gcprof-academy_index_gem.md
|   |       
|   +---quiz
|   |       quiz_AI_base_01.md
|   |       quiz_AI_Fondamenti_ML.md
|   |       quiz_DB_Fondamenti_DB_SQL_01.md
|   |       quiz_FINANCE_base_01.md
|   |       quiz_INFO_Sheets_01.md
|   |       quiz_Python_base_01.md
|   |       
|   \---supabase
|       |   db_scripts.sql
|       |   payments_schema.sql
|       |   
|       \---backup
|           +---payments
|           \---stable_before_payments
|                   20260721_data.sql
|                   20260721_roles.sql
|                   20260721_schema.sql
|                   
+---e2e
|   +---admin
|   +---auth
|   |       adminGuard.spec.ts
|   |       
|   +---courses
|   \---quiz
+---features
|   +---admin
|   |   +---actions
|   |   |       approveEnrollmentAction.ts
|   |   |       getActiveExternalEnrollmentsAction.ts
|   |   |       getCoursesForEnrollmentAction.ts
|   |   |       getPendingEnrollmentsAction.ts
|   |   |       getRevokedExternalEnrollmentsAction.ts
|   |   |       reactivateExternalEnrollmentAction.ts
|   |   |       
|   |   +---courses
|   |   |   +---actions
|   |   |   |       assignCourseClassAction.ts
|   |   |   |       bulkDissociateAction.ts
|   |   |   |       classActions.ts
|   |   |   |       courseActions.ts
|   |   |   |       structureActions.ts
|   |   |   |       
|   |   |   +---components
|   |   |   |       ActiveAssociationsList.tsx
|   |   |   |       AssignCourseClassForm.tsx
|   |   |   |       CourseContentEditor.tsx
|   |   |   |       CoursesTab.tsx
|   |   |   |       CoursesTab.tsx_old
|   |   |   |       CreateClassForm.tsx
|   |   |   |       CreateCourseForm.tsx
|   |   |   |       ManageCategoriesForm.tsx
|   |   |   |       ManageCoursesModal.tsx
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
|   |   |           QuizzesTab.tsx
|   |   |           RequestsTab.tsx
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
|   |   |   |   |   AdminStatsDashboard.tsx_old
|   |   |   |   |   StatsTab.tsx
|   |   |   |   |   
|   |   |   |   \---charts
|   |   |   |           BarChartCard.tsx
|   |   |   |           DonutChartCard.tsx
|   |   |   |           HorizontalBarChartCard.tsx
|   |   |   |           PieChartCard.tsx
|   |   |   |           ProgressChartCard.tsx
|   |   |   |           StatsKpiCards.tsx
|   |   |   |           StudentsByClassChart.tsx
|   |   |   |           
|   |   |   \---services
|   |   |           adminStatsService.ts
|   |   |           
|   |   +---tracking
|   |   |   +---actions
|   |   |   |       trackingActions.ts
|   |   |   |       trackPageViewAction.ts
|   |   |   |       
|   |   |   +---components
|   |   |   |       PageTracker.tsx
|   |   |   |       TrackingDashboard.tsx
|   |   |   |       TrackingDashboard.tsx_old
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
|   |       |       bulkUpdateUsersClassAction.ts
|   |       |       revokeCourseAccessAction.ts
|   |       |       seedUsersAction.ts
|   |       |       
|   |       +---components
|   |       |       ActivityTracker.tsx
|   |       |       AdminUsersClassesEditor.tsx
|   |       |       AdminUsersHeader.tsx
|   |       |       AdminUsersRow.tsx
|   |       |       AdminUsersRow.tsx_old
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
|   |   |       registerAction.ts_old
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
|   |   |   |   MarkdownPreview.tsx_old
|   |   |   |   
|   |   |   \---lesson
|   |   |           LessonRenderer.tsx
|   |   |           
|   |   +---domain
|   |   |       CourseMapper.ts
|   |   |       
|   |   +---hooks
|   |   |       useCourses.ts
|   |   |       useCourses.ts_old
|   |   |       
|   |   +---queries
|   |   |       getStudentCourses.ts
|   |   |       
|   |   +---repositories
|   |   |       SupabaseCourseRepository.ts
|   |   |       
|   |   +---services
|   |   |       checkExternalCourseAccessAction.ts
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
|   |           Navbar.tsx_old
|   |           
|   +---marketing
|   |   \---components
|   |           HeroSection.tsx
|   |           HowItWorks.tsx
|   |           StudentFeatures.tsx
|   |           WhyChoose.tsx
|   |           
|   +---payments
|   |   +---actions
|   |   |       paymentActions.ts
|   |   |       
|   |   +---adapters
|   |   |   \---stripe
|   |   |           StripeGatewayAdapter.ts
|   |   |           
|   |   +---components
|   |   |       AddToCartButton.tsx
|   |   |       CartBadge.tsx
|   |   |       CartDrawer.tsx
|   |   |       PaymentFeedbackBanner.tsx
|   |   |       
|   |   +---constants
|   |   |       paymentConstants.ts
|   |   |       
|   |   +---factories
|   |   |       PaymentGatewayFactory.ts
|   |   |       
|   |   +---ports
|   |   |       IPaymentGateway.ts
|   |   |       
|   |   +---services
|   |   |       CartService.ts
|   |   |       CheckoutService.ts
|   |   |       EnrollmentService.ts
|   |   |       PaymentService.ts
|   |   |       
|   |   \---types
|   |           paymentTypes.ts
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
|   |   |       quizMailActions.ts
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
|   |   |       StudentQuizDashboard.tsx
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
|   +---resources
|   |   +---actions
|   |   |       createResourceAction.ts
|   |   |       deleteResourceAction.ts
|   |   |       resourcesActions.ts
|   |   |       updateResourceAction.ts
|   |   |       
|   |   +---components
|   |   |       ResourceAdminTable.tsx
|   |   |       ResourceCreateForm.tsx
|   |   |       ResourceDashboard.tsx
|   |   |       
|   |   +---schemas
|   |   |       resourceSchema.ts
|   |   |       
|   |   \---types
|   |           Resource.ts
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
|       stripe.ts
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
|   |       gcprof-ai-academy_logo_01.png
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
|   |   |   site.ts
|   |   |   
|   |   \---navigation
|   |           adminNavigation.ts
|   |           getNavigationForUser.ts
|   |           index.ts
|   |           NavigationItem.ts
|   |           pendingNavigation.ts
|   |           publicNavigation.ts
|   |           studentNavigation.ts
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
+---test-results
|   \---e2e-auth-adminGuard-Auth-G-641ce-tando-di-accedere-all-admin
|           error-context.md
|           trace.zip
|           
+---tests
|   |   setupTests.ts
|   |   
|   +---admin
|   +---auth
|   +---courses
|   +---mail
|   +---quiz
|   |       quizParser.test.ts
|   |       
|   +---resources
|   +---shared
|   |       smoke.test.ts
|   |       
|   \---tracking
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
| `user_type` | `varchar` |  |
| `school_track` | `text` |  Nullable |
| `school_section` | `text` |  Nullable |

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
| `price` | `numeric` |  |
| `currency` | `currency_enum` |  |
| `is_paid` | `bool` |  |
| `stripe_product_id` | `text` |  Nullable |
| `stripe_price_id` | `text` |  Nullable |

## Table `course_modules`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `course_id` | `uuid` |  Nullable |
| `title` | `varchar` |  |
| `order_index` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `is_preview` | `bool` |  |

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
| `status` | `varchar` |  |
| `approved_at` | `timestamptz` |  Nullable |
| `approved_by` | `uuid` |  Nullable |
| `updated_at` | `timestamptz` |  |

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

## Table `resources`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `text` |  |
| `description` | `text` |  |
| `url` | `text` |  |
| `provider` | `text` |  Nullable |
| `type` | `text` |  |
| `typeVariant` | `text` |  |
| `rating` | `int2` |  Nullable |
| `tags` | `_text` |  |
| `language` | `text` |  |
| `is_visible` | `bool` |  |
| `created_at` | `timestamptz` |  |

## Table `shopping_carts`

Carrello persistente dello studente

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  Unique |
| `status` | `cart_status_enum` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `shopping_cart_items`

Snapshot dei corsi presenti nel carrello

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `cart_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `unit_price` | `numeric` |  |
| `quantity` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `coupons`

Coupon promozionali

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `code` | `varchar` |  Unique |
| `description` | `text` |  Nullable |
| `discount_type` | `discount_type_enum` |  |
| `discount_value` | `numeric` |  |
| `valid_from` | `timestamptz` |  |
| `valid_to` | `timestamptz` |  Nullable |
| `max_redemptions` | `int4` |  Nullable |
| `current_redemptions` | `int4` |  |
| `is_active` | `bool` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `payment_settings`

Configurazione funzionale della feature Payments

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `provider` | `payment_provider_enum` |  |
| `sandbox_enabled` | `bool` |  |
| `default_currency` | `currency_enum` |  |
| `vat_percentage` | `numeric` |  |
| `allow_coupons` | `bool` |  |
| `academy_country` | `varchar` |  |
| `checkout_session_expire_minutes` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `orders`

Ordini generati dal checkout

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_number` | `varchar` |  Unique |
| `profile_id` | `uuid` |  |
| `status` | `order_status_enum` |  |
| `subtotal` | `numeric` |  |
| `discount` | `numeric` |  |
| `tax` | `numeric` |  |
| `total` | `numeric` |  |
| `currency` | `currency_enum` |  |
| `payment_provider` | `payment_provider_enum` |  |
| `payment_provider_order_id` | `text` |  Nullable |
| `coupon_id` | `uuid` |  Nullable |
| `metadata` | `jsonb` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `order_items`

Snapshot dei corsi acquistati

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `course_title_snapshot` | `text` |  |
| `unit_price` | `numeric` |  |
| `quantity` | `int4` |  |
| `line_total` | `numeric` |  |
| `metadata` | `jsonb` |  |
| `created_at` | `timestamptz` |  |

## Table `coupon_redemptions`

Storico utilizzo coupon

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `coupon_id` | `uuid` |  |
| `profile_id` | `uuid` |  |
| `order_id` | `uuid` |  |
| `redeemed_at` | `timestamptz` |  |

## Table `payments`

Transazioni economiche

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_id` | `uuid` |  |
| `provider` | `payment_provider_enum` |  |
| `provider_payment_id` | `text` |  Nullable Unique |
| `provider_checkout_session_id` | `text` |  Nullable Unique |
| `provider_event_id` | `text` |  Nullable |
| `status` | `payment_status_enum` |  |
| `amount` | `numeric` |  |
| `currency` | `currency_enum` |  |
| `transaction_reference` | `text` |  Nullable |
| `failure_reason` | `text` |  Nullable |
| `paid_at` | `timestamptz` |  Nullable |
| `raw_response` | `jsonb` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `payment_logs`

Audit trail dei webhook ricevuti

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `provider` | `payment_provider_enum` |  |
| `provider_event_id` | `text` |  Nullable Unique |
| `event` | `varchar` |  |
| `payload` | `jsonb` |  |
| `processed` | `bool` |  |
| `processed_at` | `timestamptz` |  Nullable |
| `error` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Custom Types / Enums

### `quiz_status`

`draft` | `active`

### `question_type`

`multiple_choice` | `open_ended`

### `attempt_status`

`submitted` | `graded`

### `order_status_enum`

`PENDING` | `CHECKOUT_CREATED` | `PAYMENT_PROCESSING` | `PAID` | `FULFILLED` | `FAILED` | `EXPIRED` | `CANCELLED` | `REFUNDED`

### `payment_status_enum`

`CREATED` | `AUTHORIZED` | `CAPTURED` | `FAILED` | `REFUNDED`

### `discount_type_enum`

`PERCENTAGE` | `FIXED`

### `payment_provider_enum`

`STRIPE` | `PAYPAL` | `MOLLIE`

### `currency_enum`

`EUR` | `USD` | `GBP`

### `cart_status_enum`

`ACTIVE` | `CHECKOUT` | `ABANDONED` | `EXPIRED`

## RLS Policies

### `courses`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Corsi leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale corsi` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `course_modules`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Moduli leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale moduli` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `course_lessons`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Lezioni leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale lezioni` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `course_classes`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Assegnazioni leggibili da autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |
| `Admin controllo totale assegnazioni` | ALL | authenticated | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `mail_settings`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Admin Full Access Mail Settings` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `mail_templates`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Admin Full Access Mail Templates` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `mail_logs`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Admin Full Access Mail Logs` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `user_page_views`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Gli utenti iscritti possono tracciare le proprie visite` | INSERT | public | PERMISSIVE | — | `(auth.uid() = profile_id)` |
| `Gli Admin possono leggere tutte le metriche` | SELECT | public | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `resources`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Public profiles are viewable by everyone.` | SELECT | public | PERMISSIVE | `(is_visible = true)` | — |
| `Admins can do everything` | ALL | public | PERMISSIVE | `((auth.jwt() ->> 'role'::text) = 'admin'::text)` | — |

### `shopping_carts`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_cart` | ALL | authenticated | PERMISSIVE | `(profile_id = auth.uid())` | `(profile_id = auth.uid())` |
| `payments_admin_shopping_carts` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `shopping_cart_items`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_cart_items` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM shopping_carts c   WHERE ((c.id = shopping_cart_items.cart_id) AND (c.profile_id = auth.uid()))))` | — |
| `payments_admin_cart_items` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `orders`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_orders` | SELECT | authenticated | PERMISSIVE | `(profile_id = auth.uid())` | — |
| `payments_admin_orders` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `order_items`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_order_items` | SELECT | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM orders o   WHERE ((o.id = order_items.order_id) AND (o.profile_id = auth.uid()))))` | — |
| `payments_admin_order_items` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `coupon_redemptions`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_coupon_redemptions` | SELECT | authenticated | PERMISSIVE | `(profile_id = auth.uid())` | — |
| `payments_admin_coupon_redemptions` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `payments`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `student_payments` | SELECT | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM orders o   WHERE ((o.id = payments.order_id) AND (o.profile_id = auth.uid()))))` | — |
| `payments_admin_payments` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `payment_logs`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `payments_admin_logs` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `coupons`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `payments_admin_coupons` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |

### `payment_settings`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `payments_admin_settings` | ALL | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles p   WHERE ((p.id = auth.uid()) AND ((p.role)::text = 'admin'::text))))` | — |




### PROMPT 

CONTESTO :  
1.aggiungiamo nuove features all'app custom gcprof-ai-academy. 
2.ho comprato un dominio su cloudflare gcprof-academy.com già configurato su vercel 
dove ho fatto hosting del progetto gcprof-ai-academy.vercel.app

OBIETTIVO : 
sono loggato con utente esterno abilitato già da admin. vado nella sezione corsi vedo correttamente solo i corsi che hanno un modulo di preview. quando faccio click su un qualsiasi corso non vedo il modulo di preview ma vedo il blocco : Accesso Riservato Non risulti attualmente iscritto a questo corso. Aggiungilo al carrello per completare l'iscrizione. se provo a premere sul pulsante di pagamento a €0 ottengo : Il corso selezionato è gratuito. Non è necessario aggiungerlo al carrello.

SITUAZIONE ATTUALE :
0. feature in fase di svilippo (app stabile) 

VINCOLI: 
1. chiedimi quale file attuale visualizzare per sincronizzarti con la situazione attuale e ti mando il codice. 
2. ricorda di aspettare sempre la mia conferma per scrivere il codice
3. fai riferimento al tree del filesystem del progetto ed allo schema del DB allegati in questa chat
4. intercetta sempre i punti hardcoded che adrebbero spostati nel file .env come variabili
5. procediamo per gradi senza distruggere il codice integrando le modifiche passo passo e testando che non stiamo regredendo
6. ricorda di predisporre i nomi delle classi per la feature già abilitata theme light/dark
7. usa sempre il logger disponibile nel codice che scrivi 
8. fare il refactoring essenziale e puntare a risolvere il problema mantenendo quanto più possibile la logica attuale senza regredire
9. adotta sempre il metodo di spezzare i file (part1, part2...) quando sono troppo grandi per riscriverli per intero non darmi le modifiche puntuali che mi fanno perdere più tempo



