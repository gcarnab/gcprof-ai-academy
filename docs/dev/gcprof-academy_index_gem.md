# 📚 GCPROF-AI-ACADEMY — Mappa e Indice del Progetto

**Indice dei moduli**

- [M0 — Visione d'insieme e Architettura](#m0)
- [M1 — Configurazione e Root del Progetto](#m1)
- [M2 — Routing, API e Pagine Web (`app/`)](#m2)
- [M3 — Dominio e Logica di Business (`features/`)](#m3)
- [M4 — Componenti UI e Layout Condivisi (`components/` e `shared/`)](#m4)
- [M5 — Documentazione, Database e Tipi (`docs/`, `supabase/`, `types/`)](#m5)
- [M6 — Utilities, Logging e Asset Statici (`lib/`, `public/`, `logs/`)](#m6)

---

<a id="m0"></a>
## M0 — Visione d'insieme e Architettura

L'applicazione **GCPROF-AI-ACADEMY** è realizzata con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** e **Supabase**. 

Il progetto adotta i principi della **Clean Architecture** combinata a un approccio **Feature-Driven**:
* **Connessione Disaccoppiata**: La logica di business (`features/`) è nettamente separata dalla gestione delle rotte web (`app/`).
* **Architettura a Porti e Adattatori**: Nel modulo di autenticazione e nei servizi principali, le interfacce (*ports*) definiscono i contratti, mentre le infrastrutture connette concretamente i servizi esterni (Supabase, Resend, Bcrypt, Jose).

---

<a id="m1"></a>
## M1 — Configurazione e Root del Progetto

I file posizionati nella radice del progetto gestiscono l'ambiente di build, il linting, i tipi globali e le dipendenze.

| File / Risorsa | Descrizione e Funzionalità |
| :--- | :--- |
| `.env.local` | Variabili d'ambiente locali (chiavi API Supabase, segreti JWT, SMTP/Resend). |
| `.gitignore` | Regole di esclusione per file temporanei, log, dipendenze e secrets. |
| `components.json` | Configurazione del design system basato su **Shadcn/UI**. |
| `eslint.config.mjs` | Regole di linting del codice per mantenere coerenza e qualità. |
| `next.config.ts` | Configurazione runtime e build del framework Next.js. |
| `package.json` / `package-lock.json` | Dipendenze del progetto e script di esecuzione (`dev`, `build`, `start`). |
| `postcss.config.mjs` | Configurazione di PostCSS per la compilazione delle classi Tailwind CSS. |
| `proxy.ts` | Gestione di eventuali proxy di rete o redirect dinamici di sviluppo. |
| `tsconfig.json` | Impostazioni del compilatore TypeScript e alias dei percorsi (`@/*`). |
| `tree.txt` | Mappa testuale della struttura delle directory del repository. |

---

<a id="m2"></a>
## M2 — Routing, API e Pagine Web (`app/`)

Gestisce le rotte accessibili dal browser e gli endpoint HTTP dell'applicazione.

### 🌐 Pagine Pubbliche di Radice
* `page.tsx`: **Home Page** principale della piattaforma academy.
* `layout.tsx`: Layout globale dell'app (fornisce contesti di autenticazione, tema e navbar/footer).
* `robots.ts` & `sitemap.ts`: Generazione dinamica della mappa del sito e regole SEO per i crawler.

### 👥 Sezione Amministrazione (`/admin`)
* `layout.tsx` / `page.tsx`: Struttura base e dashboard principale d'ingresso per amministratori.
* `dashboard/page.tsx`: Panoramica globale con metriche e KPI della piattaforma.
* `enrollments/page.tsx`: Interfaccia di gestione e approvazione delle iscrizioni degli studenti.
* `quiz/`: 
  * `actions.ts`: Server Actions per la gestione dei test.
  * `[id]/analytics/page.tsx`: Analisi dettagliata delle risposte e delle statistiche di un quiz.
  * `[id]/review/page.tsx`: Interfaccia di correzione manuale e revisione del quiz.

### 🔌 Endpoint Backend (`/api`)
* `admin/quizzes/route.ts`: API per la gestione CRUD dei quiz lato backend.
* `auth/logout/route.ts` & `auth/session/route.ts`: Gestione di logout e validazione token di sessione.
* `classes/route.ts`: API per recuperare o modificare le classi degli studenti.
* `docs/` (`route.ts`, `config/route.ts`, `upload/route.ts`): API per l'estrazione, configurazione e caricamento di documenti.
* `seed-admin/route.ts`: Endpoint tecnico per il seeding iniziale del primo utente Administrator.

### 🔒 Autenticazione e Profilo Utente
* `auth/reset-password/`: Pagina (`page.tsx`) e client (`ResetPasswordClient.tsx`) per la reinpostazione della password tramite token.
* `login/page.tsx`: Form d'accesso per gli utenti.
* `register/page.tsx`: Form di registrazione nuovi account.
* `profile/page.tsx`: Gestione dei dati personali e della sicurezza dell'account.

### 📖 Corsi e Contenuti (`/courses`)
* `courses/page.tsx`: Catalogo generale dei corsi.
* `courses/[slug]/page.tsx`: Pagina di dettaglio del singolo corso.
* `courses/[slug]/modules/[moduleId]/lessons/[lessonId]/page.tsx`: Visualizzatore avanzato per la fruizione delle singole lezioni.
* `courses/[slug]/quizzes/[quizId]/page.tsx`: Interfaccia per svolgere i quiz associati al corso.

### 🎯 Altre Pagine
* `contacts/`: Pagina dei contatti con form di invio e relative `actions.ts`.
* `credits/`: Pagina e wrapper client (`CreditsClientWrapper.tsx`) sui crediti e attestati.
* `dashboard/`: Dashboard personalizzata per lo studente.
* `resources/`: Sezione per scaricare materiali e risorse didattiche.
* `students/`: Vista riservata/elenco dedicata al corpo studenti.

---

<a id="m3"></a>
## M3 — Dominio e Logica di Business (`features/`)

Questa cartella racchiude il cuore dell'applicazione suddiviso per moduli funzionali.

### 🛠️ Modulo Admin (`features/admin`)
* **`actions/`**: Server Actions per la gestione delle iscrizioni esterne (`approveEnrollmentAction.ts`, `reactivateExternalEnrollmentAction.ts`, ecc.).
* **`courses/`**: Form e servizi per la creazione di corsi (`CreateCourseForm.tsx`), gestione categorie ed editor dei contenuti (`CourseContentEditor.tsx`).
* **`dashboard/`**: Componenti per la composizione della dashboard amministrativa (`AdminDashboard.tsx`, `RequestsTab.tsx`).
* **`mail/`**: Engine di messaggistica completo. Supporta invii di test e massivi (`MailBulkSender.tsx`), editor dei template (`MailTemplateEditor.tsx`) e provider multipli (**Gmail**, **Resend**).
* **`stats/`**: Servizi di aggregazione e grafici (`BarChartCard.tsx`, `DonutChartCard.tsx`, `StudentsByClassChart.tsx`).
* **`tracking/`**: Sistema interno per tracciare la navigazione degli utenti (`PageTracker.tsx`, `trackingService.ts`).
* **`users/`**: Gestione, tabella e modifiche di gruppo per gli utenti e le relative classi.

### 🔐 Modulo Autenticazione (`features/auth`)
Progettato secondo i canoni della **Clean Architecture**:
* **`domain/`**: Entità `user.ts`.
* **`ports/`**: Interfacce per il disaccoppiamento (`IUserRepository.ts`, `ITokenService.ts`, `IPasswordService.ts`, `ICookieService.ts`).
* **`infrastructure/`**: Implementazioni con tecnologie concrete (`SupabaseUserRepository.ts`, `BcryptPasswordService.ts`, `JoseTokenService.ts`, `ResendEmailService.ts`).
* **`services/`**: Servizi di orchestrazione (`AuthService.ts`, `PasswordResetService.ts`).
* **`actions/`**: Server Actions richiamabili dai form UI (login, register, reset password).
* **`context/`**: `AuthContext.tsx` per condividere lo stato di autenticazione nell'interfaccia client.

### 📚 Modulo Corsi (`features/courses`)
* **`components/`**: Componenti per visualizzare il catalogo, filtrare per categoria (`CategoryFilter.tsx`), cercare corsi (`CourseSearch.tsx`) e renderizzare le lezioni (`LessonRenderer.tsx`).
* **`repositories/`**: `SupabaseCourseRepository.ts` per l'estrazione efficiente dei dati.
* **`hooks/`**: Hook personalizzati come `useCourses.ts`.

### 📝 Modulo Quiz (`features/quiz`)
* **`domain/`**: Definizione delle entità dei test (`Question.ts`, `Quiz.ts`, `QuizAttempt.ts`, `QuizReview.ts`).
* **`markdown/parser/quizParser.ts`**: **Parser specializzato** in grado di convertire i file di test formattati in Markdown direttamente in quiz strutturati per il database.
* **`components/`**: Cruscotti per lo studente (`StudentQuizDashboard.tsx`), per il docente (`TeacherQuizDashboard.tsx`) e form per le correzioni (`CorrectionForm.tsx`).

### 🏠 Modulo Marketing e Landing Page (`features/home` e `features/marketing`)
* `home/`: Componenti della pagina principale pubblica (`Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `CoursePreview.tsx`).
* `marketing/`: Sezioni promozionali per illustrare la piattaforma (`WhyChoose.tsx`, `HowItWorks.tsx`, `StudentFeatures.tsx`).

### 📦 Altri Moduli (`resources`, `profile`, `theme`)
* `resources/`: Gestione dei materiali scaricabili con schemi di validazione (`resourceSchema.ts`) e relative tabelle admin.
* `profile/`: Gestione del form profilo dell'utente e azioni correlate.
* `theme/`: Contesto e pulsante di switch per il tema chiaro/scuro (`ThemeToggle.tsx`, `ThemeContext.tsx`).

---

<a id="m4"></a>
## M4 — Componenti UI e Layout Condivisi (`components/` e `shared/`)

### 🎨 `components/ui/`
Contiene la libreria dei componenti visuali riutilizzabili di basso livello (basati su Tailwind CSS e Shadcn):
* `button.tsx`, `card.tsx`, `dialog.tsx`, `table.tsx`, `input.tsx`, `form.tsx`, `select.tsx`, `badge.tsx`, `progress.tsx`, `tabs.tsx`, ecc.

### 🔀 `shared/`
Elementi trasversali utilizzati su più feature:
* **`config/navigation/`**: Gestione dinamica dei menu di navigazione in base al ruolo dell'utente (`adminNavigation.ts`, `studentNavigation.ts`, `publicNavigation.ts`, `getNavigationForUser.ts`).
* **`layout/`**: Wrapper per i layout pubblici (`PublicLayout.tsx`).
* **`ui/`**: Componenti condivisi di layout (`PageContainer.tsx`, `SectionTitle.tsx`, `Card.tsx`, `Badge.tsx`).

---

<a id="m5"></a>
## M5 — Documentazione, Database e Tipi (`docs/`, `supabase/`, `types/`)

### 📋 Cartella `docs/`
* **Guide**: Guida di sviluppo (`gcprof-academy_DEV_GUIDE.md`), handover di consegna (`HANDOVER_PROMPT.md`) e guida al DB (`README-DB.md`).
* **`courses/`**: File sorgenti in Markdown contenenti le lezioni di programmazione (es. *Python Practice*).
* **`quiz/`**: Repository di test in formato Markdown (es. `quiz_AI_base_01.md`, `quiz_Python_base_01.md`) pronti per essere letti dal `quizParser.ts`.
* **`supabase/`**: Script SQL per l'inizializzazione del database:
  * `schema.sql`: Creazione delle tabelle del database.
  * `roles.sql`: Definizione di permessi, politiche RLS e ruoli.
  * `data.sql`: Dati di test o iniziali.

### ⚙️ Cartella `supabase/`
Contiene la configurazione per la CLI locale di Supabase (`config.toml`) e le informazioni sul progetto collegato (`.temp/linked-project.json`).

### 🏷️ Cartella `types/`
* `database.types.ts`: Tipi TypeScript generati direttamente dallo schema del database Supabase per garantire type-safety assoluta nelle query backend.

---

<a id="m6"></a>
## M6 — Utilities, Logging e Asset Statici (`lib/`, `public/`, `logs/`)

### 🧰 `lib/`
* `supabase.ts`: Inizializzazione e configurazione del client Supabase per la connessione al database.
* `logger.ts`: Utility centralizzata per la gestione dei log applicativi.
* `utils.ts`: Funzioni di supporto generiche (es. `cn` per l'unione condizionale delle classi Tailwind).

### 📝 `logs/`
* `app.log`: File di tracciamento degli eventi di runtime dell'applicazione.

### 📁 `public/`
Contiene le risorse statiche servite direttamente dal server web:
* Loghi ufficiali dell'accademia (`gcprof-ai-academy_logo_01.png`, versioni small e info).
* Icone ed elementi grafici SVG (`file.svg`, `globe.svg`, `next.svg`).
* Materiali informativi e PDF di presentazione (`public/showcase/` e `public/docs/`).