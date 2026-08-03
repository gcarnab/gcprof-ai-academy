Agisci come un Esperto Senior Software Architect specializzato in Next.js, React e Clean Architecture. Dobbiamo riprendere il refactoring Enterprise v2 dell'applicazione "gcprof-ai-academy". Stiamo lavorando al progetto "GCPROF Academy", una piattaforma LMS avanzata basata su Next.js (App Router, TypeScript, Turbopack) e Supabase (Auth, PostgreSQL, RLS).
Di seguito trovi il contesto completo, lo schema del database e la struttura del progetto "gcprof-ai-academy". 
Il tuo compito è assorbire queste informazioni e attendere le mie prossime istruzioni operative per continuare lo sviluppo.

### 1. PANORAMICA DEL PROGETTO

Il progetto è una piattaforma LMS ("gcprof-ai-academy") per la gestione di corsi, moduli e lezioni multimediali, con un controllo degli accessi granulare basato sulle classi scolastiche. L'applicazione utilizza Next.js con Server Actions e Supabase come backend. utilizza github e Vercel per il deploy ed un dominio su cloudflare gcprof-academy.com 

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
|   |   |       page.tsx_old
|   |   |       
|   |   +---enrollments
|   |   |       page.tsx
|   |   |       
|   |   +---payments
|   |   |       actions.ts
|   |   |       layout.tsx
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
|   |   +---test-certificate
|   |   |       route.ts
|   |   |       route.ts_old
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
|   |   |   
|   |   \---[slug]
|   |       |   page.tsx
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
|   |   |   layout.tsx
|   |   |   page.tsx
|   |   |   
|   |   \---gamification
|   |           page.tsx
|   |           
|   +---login
|   |       page.tsx
|   |       
|   +---profile
|   |       page.tsx
|   |       
|   +---register
|   |       page.tsx
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
|   |   CURRENT_PROMPT.md
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
|   |   +---AI
|   |   |   |   AI_COURSE_01_sonnet.md
|   |   |   |   AI_COURSE_02_sonnet.md
|   |   |   |   AI_COURSE_03_sonnet.md
|   |   |   |   AI_COURSE_04_sonnet.md
|   |   |   |   AI_COURSE_05_sonnet.md
|   |   |   |   AI_COURSE_06_sonnet.md
|   |   |   |   AI_COURSE_07_sonnet.md
|   |   |   |   AI_COURSE_08_sonnet.md
|   |   |   |   AI_COURSE_09_sonnet.md
|   |   |   |   AI_COURSE_10_sonnet.md
|   |   |   |   AI_COURSE_11_sonnet.md
|   |   |   |   AI_COURSE_MASTER.md
|   |   |   |   AI_COURSE_preview.md
|   |   |   |   AI_Guide_FULL.md
|   |   |   |   AI_GUIDE_STYLE.md
|   |   |   |   
|   |   |   \---quiz
|   |   |           AI_Quiz_01.md
|   |   |           AI_Quiz_02.md
|   |   |           AI_Quiz_03.md
|   |   |           AI_Quiz_04.md
|   |   |           AI_Quiz_05.md
|   |   |           AI_Quiz_06.md
|   |   |           AI_Quiz_07.md
|   |   |           AI_Quiz_08.md
|   |   |           AI_Quiz_09.md
|   |   |           AI_Quiz_10.md
|   |   |           AI_Quiz_11.md
|   |   |           quiz_AI_base_01.md
|   |   |           quiz_AI_Fondamenti_ML.md
|   |   |           
|   |   +---BLOCKCHAIN
|   |   |   |   Blockchain_COURSE_01.md
|   |   |   |   Blockchain_COURSE_02.md
|   |   |   |   Blockchain_COURSE_03.md
|   |   |   |   Blockchain_COURSE_04.md
|   |   |   |   Blockchain_COURSE_05.md
|   |   |   |   Blockchain_COURSE_06.md
|   |   |   |   Blockchain_COURSE_preview.md
|   |   |   |   
|   |   |   \---quiz
|   |   +---preview
|   |   |       DataBase_01_preview.md
|   |   |       Finance_01_preview.md
|   |   |       OOP_01_preview.md
|   |   |       ProbleSolving_01_preview.md
|   |   |       Python_01_preview.md
|   |   |       WebProgramming_01_preview.md
|   |   |       
|   |   \---Python Creative Lab
|   |           PCL_01.md
|   |           PCL_02.md
|   |           PCL_03.md
|   |           PCL_04.md
|   |           PCL_05.md
|   |           PCL_MASTER_PLAN.md
|   |           PCL_PREVIEW.md
|   |           
|   +---dev
|   |       gcprof-academy_index_gem.md
|   |       
|   +---quiz
|   |       quiz_DB_Fondamenti_DB_SQL_01.md
|   |       quiz_FINANCE_base_01.md
|   |       quiz_INFO_Sheets_01.md
|   |       quiz_Python_base_01.md
|   |       
|   \---supabase
|       |   utility_scripts.sql
|       |   
|       \---backup
|               20260731_data.sql
|               20260731_roles.sql
|               20260731_schema.sql
|               20260802_certificates_data.sql
|               20260802_certificates_roles.sql
|               20260802_certificates_schema.sql
|               20260803_certificates_data.sql
|               20260803_certificates_roles.sql
|               20260803_certificates_schema.sql
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
|   |   |           AdminDashboard.tsx_old
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
|   |   |   |       GmailProvider.ts_old
|   |   |   |       ResendProvider.ts
|   |   |   |       
|   |   |   +---services
|   |   |   |       EmailService.ts
|   |   |   |       EmailService.ts_old
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
|   |   |   |           ProgressChartCard.tsx
|   |   |   |           StatsKpiCards.tsx
|   |   |   |           StudentsByClassChart.tsx
|   |   |   |           
|   |   |   +---services
|   |   |   |       adminStatsService.ts
|   |   |   |       
|   |   |   \---types
|   |   |           AdminStats.ts
|   |   |           
|   |   +---tracking
|   |   |   +---actions
|   |   |   |       trackingActions.ts
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
|   |       |       bulkUpdateUsersClassAction.ts
|   |       |       revokeCourseAccessAction.ts
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
|   +---certificates
|   |   +---actions
|   |   |       certificateActions.ts
|   |   |       downloadCertificateAction.ts
|   |   |       generateCertificateAction.ts
|   |   |       verifyCertificateAction.ts
|   |   |       
|   |   +---components
|   |   |       StudentCertificatesDashboard.tsx
|   |   |       
|   |   +---repositories
|   |   |       SupabaseCertificateRepository.ts
|   |   |       
|   |   +---services
|   |   |       CertificateAutoIssueService.ts
|   |   |       CertificateService.ts
|   |   |       
|   |   +---templates
|   |   \---types
|   |           Certificate.ts
|   |           CertificateEvent.ts
|   |           CertificateSettings.ts
|   |           CertificateTemplate.ts
|   |           index.ts
|   |           ModuleCompletion.ts
|   |           
|   +---courses
|   |   |   index.ts
|   |   |   
|   |   +---actions
|   |   |       courseActions.ts
|   |   |       getCourseCategoriesAction.ts
|   |   |       
|   |   +---components
|   |   |   |   AccessNoticeBanner.tsx
|   |   |   |   CategoryFilter.tsx
|   |   |   |   CourseCard.tsx
|   |   |   |   CourseCard.tsx_old
|   |   |   |   CourseCTA.tsx
|   |   |   |   CourseDashboard.tsx
|   |   |   |   CourseList.tsx
|   |   |   |   CourseSearch.tsx
|   |   |   |   CoursesHeader.tsx
|   |   |   |   CourseSidebar.tsx
|   |   |   |   CourseViewer.tsx
|   |   |   |   CourseViewer.tsx_old
|   |   |   |   LessonRow.tsx
|   |   |   |   MarkdownPreview.tsx
|   |   |   |   
|   |   |   \---lesson
|   |   |           LessonRenderer.tsx
|   |   |           LessonRenderer.tsx_old
|   |   |           
|   |   +---domain
|   |   |       CourseMapper.ts
|   |   |       
|   |   +---hooks
|   |   |       useCourseCategories.ts
|   |   |       useCourses.ts
|   |   |       
|   |   +---queries
|   |   |       getStudentCourses.ts
|   |   |       
|   |   +---repositories
|   |   |       SupabaseCourseCategoryRepository.ts
|   |   |       SupabaseCourseRepository.ts
|   |   |       
|   |   +---services
|   |   |       checkExternalCourseAccessAction.ts
|   |   |       courseActions.ts
|   |   |       courseService.ts
|   |   |       
|   |   \---types
|   |           course.ts
|   |           CourseCategory.ts
|   |           lessonContent.ts
|   |           
|   +---gamification
|   |   +---actions
|   |   |       awardXpAction.ts
|   |   |       badgeActions.ts
|   |   |       gamification.ts
|   |   |       
|   |   \---components
|   |           AdminGamificationDashboard.tsx
|   |           BadgeGrid.tsx
|   |           BadgeUnlockedModal.tsx
|   |           GamificationBar.tsx
|   |           GamificationTestButton.tsx
|   |           StudentGamificationDashboard.tsx
|   |           
|   +---home
|   |   \---components
|   |           CoursePreview.tsx
|   |           Footer.tsx
|   |           Hero.tsx
|   |           HomeCategories.tsx
|   |           Navbar.tsx
|   |           
|   +---marketing
|   |   \---components
|   |           HeroSection.tsx
|   |           HeroSection.tsx_old
|   |           HowItWorks.tsx
|   |           StudentFeatures.tsx
|   |           WhyChoose.tsx
|   |           
|   +---payments
|   |   +---actions
|   |   |       getPaymentsDashboardAction.ts
|   |   |       orderActions.ts
|   |   |       paymentActions.ts
|   |   |       paymentSettingsActions.ts
|   |   |       
|   |   +---adapters
|   |   |   \---stripe
|   |   |           StripeGatewayAdapter.ts
|   |   |           
|   |   +---components
|   |   |       AddToCartButton.tsx
|   |   |       CartBadge.tsx
|   |   |       CartDrawer.tsx
|   |   |       CouponManager.tsx
|   |   |       CoursePricingManager.tsx
|   |   |       OrderDetailDrawer.tsx
|   |   |       OrdersList.tsx
|   |   |       OrdersTabContent.tsx
|   |   |       OverviewComponents.tsx
|   |   |       PaymentFeedbackBanner.tsx
|   |   |       PaymentSettingsForm.tsx
|   |   |       PaymentsNav.tsx
|   |   |       PaymentsTabContent.tsx
|   |   |       SettingsTabContent.tsx
|   |   |       
|   |   +---constants
|   |   |       paymentConstants.ts
|   |   |       
|   |   +---dto
|   |   |       OrderDetailDTO.ts
|   |   |       PaymentDashboardDTO.ts
|   |   |       
|   |   +---factories
|   |   |       PaymentGatewayFactory.ts
|   |   |       
|   |   +---ports
|   |   |       IPaymentGateway.ts
|   |   |       
|   |   +---repositories
|   |   |       PaymentRepository.ts
|   |   |       PaymentSettingsRepository.ts
|   |   |       
|   |   +---services
|   |   |       CartService.ts
|   |   |       CheckoutService.ts
|   |   |       CouponService.ts
|   |   |       CoursePricingService.ts
|   |   |       EnrollmentService.ts
|   |   |       PaymentDashboardService.ts
|   |   |       PaymentService.ts
|   |   |       PaymentSettingsService.ts
|   |   |       StripeWebhookService.ts
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
|   |   |       quizActions.ts_old
|   |   |       quizMailActions.ts
|   |   |       statsActions.ts
|   |   |       teacherActions.ts
|   |   |       
|   |   +---components
|   |   |       AdminQuizPanel.tsx
|   |   |       AssignQuizButton.tsx
|   |   |       AssignQuizModal.tsx
|   |   |       AssignQuizModal.tsx_old
|   |   |       CorrectionForm.tsx
|   |   |       QuizStatsDashboard.tsx
|   |   |       QuizViewer.tsx
|   |   |       QuizViewer.tsx_old
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
|   |           quizValidators.ts_old
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
|   +---system
|   |   +---actions
|   |   |       getSystemConfigurationAction.ts
|   |   |       HomeBannerAdminForm.tsx
|   |   |       updateHomeBannerAction.ts
|   |   |       
|   |   +---components
|   |   |       HomeBanner.tsx
|   |   |       HomeBannerView.tsx
|   |   |       
|   |   +---ports
|   |   |       ISystemSettingsRepository.ts
|   |   |       
|   |   +---repositories
|   |   |       SupabaseSystemSettingsRepository.ts
|   |   |       
|   |   +---services
|   |   |       SystemSettingsService.ts
|   |   |       
|   |   \---types
|   |           SystemConfiguration.ts
|   |           
|   \---theme
|       +---components
|       |       ThemeToggle.tsx
|       |       
|       \---context
|               ThemeContext.tsx
|               
+---lib
|       auth-guard.ts
|       logger.ts
|       pdfGenerator.ts
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
        

### 💾 SCRIPT SQL AGGIORNATI DEL DATABASE (SUPABASE)

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
| `total_xp` | `int4` |  Nullable |
| `current_level` | `int4` |  Nullable |

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
| `module_code` | `varchar` |  |

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
| `description` | `text` |  Nullable |
| `icon_name` | `varchar` |  Nullable |
| `color_theme` | `varchar` |  Nullable |
| `display_order` | `int4` |  |
| `visible_home` | `bool` |  |
| `is_featured` | `bool` |  |
| `updated_at` | `timestamptz` |  |

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
| `completed_at` | `timestamptz` |  Nullable |

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
| `course_id` | `uuid` |  Nullable |
| `module_id` | `uuid` |  Nullable |

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
| `xp_awarded` | `bool` |  Nullable |

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

## Table `system_settings`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `key` | `varchar` | Primary |
| `value` | `text` |  |
| `description` | `text` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `badges`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `code` | `varchar` |  Unique |
| `title` | `varchar` |  |
| `description` | `text` |  Nullable |
| `icon` | `varchar` |  |
| `xp_reward` | `int4` |  |
| `created_at` | `timestamptz` |  Nullable |
| `badge_type` | `varchar` |  |

## Table `user_badges`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  |
| `badge_id` | `uuid` |  |
| `awarded_at` | `timestamptz` |  Nullable |
| `course_id` | `uuid` |  Nullable |
| `quiz_id` | `uuid` |  Nullable |

## Table `user_course_stats`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `profile_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `course_xp` | `int4` |  |
| `course_level` | `int4` |  |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `profile_course_xp`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `user_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `xp` | `int4` |  |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `certificate_templates`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `varchar` |  Unique |
| `description` | `text` |  Nullable |
| `html_template` | `text` |  |
| `css_template` | `text` |  Nullable |
| `logo_url` | `text` |  Nullable |
| `background_url` | `text` |  Nullable |
| `primary_color` | `varchar` |  Nullable |
| `secondary_color` | `varchar` |  Nullable |
| `active` | `bool` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `module_completions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `user_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `module_id` | `uuid` |  |
| `completion_percentage` | `numeric` |  |
| `quiz_score` | `numeric` |  Nullable |
| `xp_awarded` | `int4` |  |
| `completed` | `bool` |  |
| `completed_at` | `timestamptz` |  Nullable |
| `certificate_generated` | `bool` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `certificates`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `public_id` | `uuid` |  Unique |
| `certificate_number` | `varchar` |  Unique |
| `verification_token` | `uuid` |  Unique |
| `user_id` | `uuid` |  |
| `course_id` | `uuid` |  |
| `module_id` | `uuid` |  Nullable |
| `template_id` | `uuid` |  Nullable |
| `issued_by` | `uuid` |  Nullable |
| `title` | `varchar` |  |
| `subtitle` | `text` |  Nullable |
| `score` | `numeric` |  Nullable |
| `completion_percentage` | `numeric` |  Nullable |
| `pdf_url` | `text` |  Nullable |
| `pdf_generated` | `bool` |  |
| `email_sent` | `bool` |  |
| `download_count` | `int4` |  |
| `last_download_at` | `timestamptz` |  Nullable |
| `issued_at` | `timestamptz` |  |
| `expires_at` | `timestamptz` |  Nullable |
| `status` | `varchar` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |
| `lesson_id` | `uuid` |  Nullable |

## Table `certificate_events`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `certificate_id` | `uuid` |  |
| `event_type` | `varchar` |  |
| `ip_address` | `text` |  Nullable |
| `user_agent` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `certificate_settings`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `default_template_id` | `uuid` |  Nullable |
| `organization_name` | `varchar` |  Nullable |
| `director_name` | `varchar` |  Nullable |
| `director_title` | `varchar` |  Nullable |
| `signature_url` | `text` |  Nullable |
| `logo_url` | `text` |  Nullable |
| `certificate_prefix` | `varchar` |  Nullable |
| `enable_qrcode` | `bool` |  Nullable |
| `auto_generate_pdf` | `bool` |  Nullable |
| `auto_send_email` | `bool` |  Nullable |
| `verification_base_url` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

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

### `profile_courses`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Utenti possono leggere le proprie iscrizioni` | SELECT | public | PERMISSIVE | `(auth.uid() = profile_id)` | — |
| `Service role può gestire tutte le iscrizioni` | ALL | public | PERMISSIVE | `true` | — |

### `profile_lessons_progress`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Utenti gestiscono proprio progresso lezioni` | ALL | authenticated | PERMISSIVE | `(auth.uid() = profile_id)` | `(auth.uid() = profile_id)` |
| `Admin lettura totale progressi lezioni` | SELECT | authenticated | PERMISSIVE | `(EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND ((profiles.role)::text = 'admin'::text))))` | — |

### `profile_course_xp`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Permetti lettura agli utenti autenticati` | SELECT | authenticated | PERMISSIVE | `true` | — |

### `module_completions`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow system/admin write on module_completions` | ALL | public | PERMISSIVE | `true` | `true` |

### `certificates`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Allow system/admin write on certificates` | ALL | public | PERMISSIVE | `true` | `true` |

