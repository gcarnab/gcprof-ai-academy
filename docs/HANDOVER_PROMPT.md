Agisci come un Esperto Senior Software Architect specializzato in Next.js, React e Clean Architecture. Dobbiamo riprendere il refactoring Enterprise v2 dell'applicazione "gcprof-ai-academy". Stiamo lavorando al progetto "GCPROF AI Academy (V2)", una piattaforma LMS avanzata basata su Next.js (App Router, TypeScript, Turbopack) e Supabase (Auth, PostgreSQL, RLS).
Di seguito trovi il contesto completo, lo schema del database e la struttura del progetto "gcprof-ai-academy". Il tuo compito è assorbire queste informazioni e attendere le mie prossime istruzioni operative per continuare lo sviluppo.

### 1. PANORAMICA DEL PROGETTO

Il progetto è una piattaforma Academy ("gcprof-ai-academy") per la gestione di corsi, moduli e lezioni multimediali, con un controllo degli accessi granulare basato sulle classi scolastiche. L'applicazione utilizza Next.js con Server Actions (`"use server"`) e Supabase come backend tramite `supabaseAdmin` (`@supabase/supabase-js`).

CONTESTO :  
1.aggiungiamo nuove features all'app gcprof-ai-academy.
2.ho comprato un dominio su cloudflare gcprof-academy.com già configurato su vercel
dove ho fatto hosting del progetto gcprof-ai-academy.vercel.app

ULTIMI BUG RISCONTRATI :

1. app stabile

ULTIMI FEATURES INTRODOTTE :

- statistiche e grafico con timer per tempo fruizione contenuti studenti
- funzionalità reset password

OBIETTIVO : nella sezione UTENTI della admin/dashboard vorrei

1. adattare la sezione di gestione utenti a gestire un numero
   elevato di studenti aggiungendo un componente datatable (se non già presente)
   che abbia almeno le funzionalità di filtraggio e paginazione
2. creare degli script di popolamento massivo del DB in modo da avere
   un numero di utenti adeguato a fare i test
3. mostrare le email di ogni utente nella tabella dati ed avere un pulsante
   per l'invio di una email di contatto per ogni utente utilizzando uno specifico template
   gestibile nella sezione MAIL della admin/dashboard

VINCOLI:

1. chiedimi quale file attuale visualizzare per sincronizzarti con la situazione attuale e ti mando il codice.
2. ricorda di aspettare sempre la mia conferma per scrivere il codice
3. fai riferimento al tree del filesystem del progetto ed allo schema del DB allegati in questa chat
4. intercetta sempre i punti hardcoded che adrebbero spostati nel file .env come variabili
5. procediamo per gradi senza distruggere il codice integrando le modifiche passo passo
   e testando che non stiamo regredendo

### 📂 2. FILE SYSTEM TREE DEL PROGETTO

Questo è il tree aggiornato della struttura del progetto su cui stiamo lavorando:

GCPROF-AI-ACADEMY
| .env.local
| .gitignore
| components.json
| eslint.config.mjs
| next-env.d.ts
| next.config.ts
| package-lock.json
| package.json
| postcss.config.mjs
| proxy.ts
| README.md
| tree.txt
| tsconfig.json
|  
+---app
| | favicon.ico
| | globals.css
| | layout.tsx
| | page.tsx
| |  
| +---admin
| | | layout.tsx
| | | page.tsx
| | |  
| | \---dashboard
| | page.tsx
| |  
| +---api
| | +---auth
| | | +---logout
| | | | route.ts
| | | |  
| | | \---session
| | | route.ts
| | |  
| | +---classes
| | | route.ts
| | |  
| | +---docs
| | | | route.ts
| | | |  
| | | \---config
| | | route.ts
| | |  
| | \---seed-admin
| | route.ts
| |  
| +---auth
| | \---reset-password
| | page.tsx
| | ResetPasswordClient.tsx
| |  
| +---contacts
| | actions.ts
| | page.tsx
| |  
| +---courses
| | | page.tsx
| | |  
| | \---[slug]
| | | page.tsx
| | |  
| | \---modules
| | \---[moduleId]
| | \---lessons
| | \---[lessonId]
| | page.tsx
| |  
| +---credits
| | CreditsClientWrapper.tsx
| | page.tsx
| |  
| +---dashboard
| | page.tsx
| |  
| +---login
| | page.tsx
| |  
| +---profile
| | page.tsx
| |  
| \---register
| page.tsx
|  
+---components
| | ShowcaseSlides.tsx
| |  
| \---ui
| button.tsx
| card.tsx
| dialog.tsx
| dropdown-menu.tsx
| input.tsx
| label.tsx
| select.tsx
| tabs.tsx
| textarea.tsx
|  
+---docs
| | AUTH_ARCHITECTURE.md
| | credits.md
| | DB_DUMP.sql
| | HANDOVER_PROMPT.md
| | README-DB.md
| | tree.txt
| |  
| \---sql
| 01_mail_center_schema.sql
| 02_seed_mail_settings.sql
| 03_seed_mail_templates.sql
| schema_01.sql
| schema_02.sql
|  
+---features
| +---admin
| | +---courses
| | | +---actions
| | | | assignCourseClassAction.ts
| | | | classActions.ts
| | | | courseActions.ts
| | | | structureActions.ts
| | | |  
| | | +---components
| | | | AssignCourseClassForm.tsx
| | | | CourseContentEditor.tsx
| | | | CoursesTab.tsx
| | | | CreateClassForm.tsx
| | | | CreateCourseForm.tsx
| | | | ManageCategoriesForm.tsx
| | | |  
| | | \---services
| | | adminCourseService.ts
| | | adminStructureService.ts
| | |  
| | +---dashboard
| | | +---actions
| | | | adminActions.ts
| | | |  
| | | \---components
| | | AdminDashboard.tsx
| | | AdminHeader.tsx
| | | AdminTabs.tsx
| | |  
| | +---mail
| | | +---actions
| | | | mailSettingsActions.ts
| | | | mailTemplateActions.ts
| | | | mailTestActions.ts
| | | |  
| | | +---components
| | | | MailDashboard.tsx
| | | | MailSettingsCard.tsx
| | | | MailTab.tsx
| | | | MailTemplateEditor.tsx
| | | | MailTemplateList.tsx
| | | | MailTestSender.tsx
| | | |  
| | | +---constants
| | | | MailTemplateKeys.ts
| | | |  
| | | +---providers
| | | | EmailProvider.ts
| | | | GmailProvider.ts
| | | | ResendProvider.ts
| | | |  
| | | +---services
| | | | EmailService.ts
| | | | MailSettingsService.ts
| | | | MailTemplateEngine.ts
| | | | MailTemplateService.ts
| | | |  
| | | \---types
| | | mail.ts
| | |  
| | +---stats
| | | +---components
| | | | | AdminStatsDashboard.tsx
| | | | | StatsTab.tsx
| | | | |  
| | | | \---charts
| | | | BarChartCard.tsx
| | | | DonutChartCard.tsx
| | | | HorizontalBarChartCard.tsx
| | | | PieChartCard.tsx
| | | | StatsKpiCards.tsx
| | | | StudentsByClassChart.tsx
| | | |  
| | | \---services
| | | adminStatsService.ts
| | |  
| | \---users
| | +---actions
| | | activityActions.ts
| | | bulkActivateUsersAction.ts
| | |  
| | +---components
| | | ActivityTracker.tsx
| | | AdminUsersClassesEditor.tsx
| | | AdminUsersHeader.tsx
| | | AdminUsersRow.tsx
| | | AdminUsersTable.tsx
| | | AdminUsersToolbar.tsx
| | | UsersTab.tsx
| | |  
| | \---services
| | adminService.ts
| |  
| +---auth
| | +---actions
| | | confirmPasswordResetAction.ts
| | | getClassesAction.ts
| | | getSessionAction.ts
| | | loginAction.ts
| | | logoutAction.ts
| | | registerAction.ts
| | | requestPasswordResetAction.ts
| | | validateResetTokenAction.ts
| | |  
| | +---components
| | | LoginDialog.tsx
| | | LoginDialog.tsx_old
| | | ProtectedRoute.tsx
| | |  
| | +---constants
| | | AuthConstants.ts
| | | CookieConstants.ts
| | | TokenConstants.ts
| | |  
| | +---context
| | | AuthContext.tsx
| | |  
| | +---domain
| | | user.ts
| | |  
| | +---dto
| | | AuthDto.ts
| | |  
| | +---errors
| | | AuthError.ts
| | | InvalidCredentialsError.ts
| | | UnauthorizedError.ts
| | | UserAlreadyExistsError.ts
| | |  
| | +---infrastructure
| | | BcryptPasswordService.ts
| | | JoseTokenService.ts
| | | Logger.ts
| | | MemoryUserRepository.ts
| | | NextCookieService.ts
| | | RepositoryFactory.ts
| | | ResendEmailService.ts
| | | supabaseClient.ts
| | | SupabaseUserRepository.ts
| | |  
| | +---ports
| | | ICookieService.ts
| | | IPasswordService.ts
| | | ITokenService.ts
| | | IUserRepository.ts
| | |  
| | +---services
| | | AuthService.ts
| | | PasswordResetService.ts
| | |  
| | \---validators
| | AuthValidators.ts
| |  
| +---courses
| | | index.ts
| | |  
| | +---components
| | | | CategoryFilter.tsx
| | | | CourseCard.tsx
| | | | CourseList.tsx
| | | | CourseSearch.tsx
| | | | CoursesHeader.tsx
| | | |  
| | | \---lesson
| | | LessonRenderer.tsx
| | |  
| | +---hooks
| | | useCourses.ts
| | |  
| | +---queries
| | | getStudentCourses.ts
| | |  
| | +---services
| | | courseActions.ts
| | | courseService.ts
| | |  
| | \---types
| | course.ts
| | lessonContent.ts
| |  
| +---home
| | \---components
| | CoursePreview.tsx
| | Footer.tsx
| | Hero.tsx
| | Navbar.tsx
| |  
| \---profile
| +---components
| | ProfileForm.tsx
| |  
| \---services
| profileActions.ts
|  
+---lib
| supabase.ts
| utils.ts
|  
+---public
| | file.svg
| | gcprof-ai-academy_logo_01.png
| | gcprof-ai-academy_logo_small.png
| | globe.svg
| | next.svg
| | vercel.svg
| | window.svg
| |  
| +---courses
| | gcprof-ai-academy_logo_info_01.png
| | gcprof-ai-academy_logo_info_02.png
| | gcprof-ai-academy_logo_info_03.png
| | gcprof-ai-academy_logo_info_04.png
| |  
| +---docs
| | gcprof-ai-academy-showcase.pdf
| | showcase.txt
| |  
| \---showcase
| index.txt
|  
+---shared
| +---config
| | navigation.ts
| |  
| +---layout
| | PublicLayout.tsx
| |  
| \---ui
| Badge.tsx
| Card.tsx
| PageContainer.tsx
| SectionTitle.tsx
|  
+---supabase
| | .gitignore
| | config.toml
| |  
| \---.temp
| gotrue-version
| linked-project.json
| pooler-url
| postgres-version
| project-ref
| rest-version
| storage-migration
| storage-version
|  
\---types
database.types.ts

### 💾 3. SCRIPT SQL AGGIORNATI DEL DATABASE (SUPABASE)

## Table `academy_classes`

### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `id`          | `uuid`        | Primary     |
| `slug`        | `text`        | Unique      |
| `name`        | `text`        |             |
| `description` | `text`        | Nullable    |
| `created_at`  | `timestamptz` |             |

## Table `profiles`

### Columns

| Name                   | Type          | Constraints     |
| ---------------------- | ------------- | --------------- |
| `id`                   | `uuid`        | Primary         |
| `first_name`           | `varchar`     | Nullable        |
| `last_name`            | `varchar`     | Nullable        |
| `display_name`         | `varchar`     | Nullable        |
| `role`                 | `varchar`     |                 |
| `status`               | `varchar`     |                 |
| `created_at`           | `timestamptz` |                 |
| `updated_at`           | `timestamptz` |                 |
| `email`                | `text`        | Nullable Unique |
| `password_hash`        | `text`        | Nullable        |
| `avatar_url`           | `text`        | Nullable        |
| `total_minutes_active` | `int4`        |                 |

## Table `profile_classes`

### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `profile_id`  | `uuid`        | Primary     |
| `class_id`    | `uuid`        | Primary     |
| `assigned_at` | `timestamptz` |             |

## Table `courses`

### Columns

| Name              | Type          | Constraints |
| ----------------- | ------------- | ----------- |
| `id`              | `uuid`        | Primary     |
| `slug`            | `varchar`     | Unique      |
| `title`           | `varchar`     |             |
| `description`     | `text`        | Nullable    |
| `created_at`      | `timestamptz` |             |
| `updated_at`      | `timestamptz` |             |
| `category`        | `varchar`     | Nullable    |
| `difficulty`      | `varchar`     | Nullable    |
| `teacher`         | `varchar`     | Nullable    |
| `estimated_hours` | `int4`        | Nullable    |
| `cover_image`     | `text`        | Nullable    |
| `published`       | `bool`        | Nullable    |

## Table `course_modules`

### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `id`          | `uuid`        | Primary     |
| `course_id`   | `uuid`        | Nullable    |
| `title`       | `varchar`     |             |
| `order_index` | `int4`        |             |
| `created_at`  | `timestamptz` |             |

## Table `course_lessons`

### Columns

| Name           | Type          | Constraints |
| -------------- | ------------- | ----------- |
| `id`           | `uuid`        | Primary     |
| `module_id`    | `uuid`        | Nullable    |
| `title`        | `varchar`     |             |
| `slug`         | `varchar`     |             |
| `video_url`    | `text`        | Nullable    |
| `content`      | `text`        | Nullable    |
| `order_index`  | `int4`        |             |
| `created_at`   | `timestamptz` |             |
| `content_type` | `varchar`     | Nullable    |
| `duration`     | `int4`        | Nullable    |
| `external_url` | `text`        | Nullable    |

## Table `course_classes`

### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `course_id`   | `uuid`        | Primary     |
| `class_id`    | `uuid`        | Primary     |
| `assigned_at` | `timestamptz` |             |

## Table `course_categories`

### Columns

| Name         | Type          | Constraints |
| ------------ | ------------- | ----------- |
| `id`         | `uuid`        | Primary     |
| `name`       | `varchar`     | Unique      |
| `slug`       | `varchar`     | Unique      |
| `created_at` | `timestamptz` |             |

## Table `document_configs`

### Columns

| Name         | Type          | Constraints |
| ------------ | ------------- | ----------- |
| `id`         | `text`        | Primary     |
| `label`      | `text`        |             |
| `file_path`  | `text`        |             |
| `is_active`  | `bool`        | Nullable    |
| `updated_at` | `timestamptz` |             |

## Table `profile_courses`

### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `profile_id`  | `uuid`        | Primary     |
| `course_id`   | `uuid`        | Primary     |
| `enrolled_at` | `timestamptz` |             |

## Table `mail_settings`

### Columns

| Name         | Type          | Constraints |
| ------------ | ------------- | ----------- |
| `id`         | `text`        | Primary     |
| `value`      | `text`        |             |
| `updated_at` | `timestamptz` |             |

## Table `mail_templates`

### Columns

| Name                 | Type          | Constraints |
| -------------------- | ------------- | ----------- |
| `id`                 | `uuid`        | Primary     |
| `template_key`       | `text`        | Unique      |
| `name`               | `varchar`     |             |
| `description`        | `text`        | Nullable    |
| `subject`            | `varchar`     |             |
| `title_override`     | `varchar`     | Nullable    |
| `body_text_override` | `text`        | Nullable    |
| `enabled`            | `bool`        |             |
| `version`            | `int4`        |             |
| `created_at`         | `timestamptz` |             |
| `updated_at`         | `timestamptz` |             |
| `updated_by`         | `uuid`        | Nullable    |

## Table `mail_logs`

### Columns

| Name            | Type          | Constraints |
| --------------- | ------------- | ----------- |
| `id`            | `uuid`        | Primary     |
| `template_key`  | `text`        |             |
| `recipient`     | `text`        |             |
| `subject`       | `text`        |             |
| `status`        | `text`        |             |
| `provider`      | `text`        |             |
| `provider_id`   | `text`        | Nullable    |
| `error_message` | `text`        | Nullable    |
| `created_at`    | `timestamptz` |             |

## Table `password_reset_tokens`

### Columns

| Name         | Type        | Constraints |
| ------------ | ----------- | ----------- |
| `id`         | `uuid`      | Primary     |
| `user_id`    | `uuid`      |             |
| `token`      | `text`      | Unique      |
| `expires_at` | `timestamp` |             |
| `used`       | `bool`      |             |
| `created_at` | `timestamp` |             |



# 4. ANALISI EFFETTUATA DALLA AI

## FILES RICHIESTI :
- features/admin/users/components/AdminUsersTable.tsx
- features/admin/users/services/adminService.ts

# Analisi dettagliata

## ✅ Aspetto positivo 1

Lo stato è centralizzato.

## ✅ Aspetto positivo 2

Il filtraggio usa `useMemo`.


## ✅ Aspetto positivo 3

Le row sono già componentizzate.

## ⚠️ Primo collo di bottiglia


stai renderizzando **tutti** gli utenti.

Con: 2000 utenti React inizia a soffrire.


## ⚠️ Secondo collo di bottiglia

Il filtraggio è completamente client-side.


## ⚠️ Terzo collo di bottiglia

Manca completamente la paginazione.


## ⚠️ Quarto collo di bottiglia

Nella ricerca manca email che è probabilmente il campo più utilizzato dagli amministratori.


# Problema architetturale

Il componente oggi fa contemporaneamente:

- gestione stato
- filtri
- rendering tabella
- bulk actions
- aggiornamento stato
- aggiornamento classi

Sono **6 responsabilità**.

Per ora va bene.

Fra qualche feature diventeranno 10.

---

# La mia proposta Enterprise

Io NON rifarei il componente.

Lo dividerei in più step.

---

## STEP 1

Zero modifiche funzionali.

Solo introduzione della DataTable.

```
AdminUsersTable

↓

TanStack Table
```

Tutto il resto rimane identico.

---

## STEP 2

Paginazione.

---

## STEP 3

Sorting.

---

## STEP 4

Colonna Email.

---

## STEP 5

Colonna Tempo Attività

(usando `total_minutes_active` che hai già nel DB)

---

## STEP 6

Invio email.

---

## STEP 7

Server Side Pagination.

---

# Un'altra cosa che ho notato

Qui:

```ts
const pendingUsersCount = ...
```

non viene mai usato.

Quindi abbiamo già individuato un piccolo refuso.

---

# Bulk Action

Anche questa parte mi piace.

```
Bulk

↓

Classe

↓

Aggiorna utenti
```

Ma in futuro dovrebbe diventare indipendente dalla tabella.

---

# C'è una cosa IMPORTANTISSIMA

Questa.

```ts
<table>
```

È il punto in cui io **non interverrei direttamente**.

Creerei invece un componente riutilizzabile.

Ad esempio:

```
shared/ui/datatable
```

oppure

```
components/ui/data-table
```

Perché?

Perché sono quasi certo che fra qualche mese vorrai una DataTable anche per:

- Corsi
- Moduli
- Lezioni
- Template Mail
- Classi
- Log Email
- Statistiche

e sarebbe un errore avere sei implementazioni diverse.

---

# La mia proposta architetturale (Enterprise)

Vorrei introdurre una struttura del tipo:

```text
components/ui/data-table/
│
├── DataTable.tsx
├── DataTablePagination.tsx
├── DataTableToolbar.tsx
├── DataTableColumnHeader.tsx
├── DataTableSearch.tsx
├── DataTableEmpty.tsx
└── types.ts
```

e poi ogni feature definirebbe solo le proprie colonne, ad esempio:

```text
features/admin/users/components/

UsersColumns.tsx

↓

DataTable
```

Questo è esattamente il pattern adottato nelle applicazioni enterprise basate su TanStack Table e `shadcn/ui`. Avrebbe diversi vantaggi:

- **riuso** della stessa infrastruttura per utenti, corsi, classi, mail e log;
- **coerenza** dell'interfaccia e dei comportamenti (filtri, paginazione, ordinamento);
- **riduzione della duplicazione** di codice;
- possibilità di aggiungere in futuro funzionalità come esportazione CSV/Excel, selezione multipla, visibilità delle colonne e virtualizzazione senza modificare ogni singola tabella.

## Conclusione

Dopo aver visto questo file, la mia raccomandazione è **non modificare direttamente `AdminUsersTable.tsx`** per trasformarla in una DataTable.

Preferirei costruire prima una **infrastruttura DataTable riutilizzabile** e poi migrare gradualmente il modulo Utenti ad essa. In questo modo l'investimento fatto ora potrà essere riutilizzato in tutto il progetto `gcprof-ai-academy`, evitando di creare una soluzione specifica solo per gli utenti.

Per completare la sincronizzazione prima di proporre il primo refactoring, mi serve ancora un ultimo file chiave:

```text
features/admin/users/services/adminService.ts
```

È lì che verificheremo come vengono recuperati gli utenti da Supabase e potremo decidere se la prima versione della DataTable lavorerà su dati client-side o introdurrà fin da subito una paginazione server-side.
