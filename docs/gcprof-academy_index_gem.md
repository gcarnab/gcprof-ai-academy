# GCPROF-AI-ACADEMY - Indice della Struttura del Progetto

Benvenuto nel repository di **GCPROF-AI-ACADEMY**. Questo file funge da indice e mappa concettuale per comprendere l'organizzazione del codice, le funzionalità dei file e l'architettura scelta per la piattaforma.

---

## 🏗️ Architettura Generale
Il progetto adotta un approccio **Feature-Driven / Clean Architecture** combinato con **Next.js App Router**. La logica è suddivisa in tre macro-livelli principali:
1. **`app/`**: Gestisce esclusivamente il routing, le pagine e gli endpoint API (Delivery Mechanism).
2. **`features/`**: Contiene il cuore pulsante del software (Logica di Business), separata per domini funzionali e organizzata in Azioni (Server Actions), Componenti UI specifici, Servizi, Porte e Repository.
3. **`shared/` / `components/`**: Elementi trasversali riutilizzabili in tutta l'applicazione.

---

## 📂 File di Configurazione della Root (Radice)

| File | Descrizione |
| :--- | :--- |
| `.env.local` | Variabili d'ambiente locali (non tracciate da Git). |
| `.gitignore` | Elenco di file e cartelle da escludere dal controllo versione. |
| `components.json` | Configurazione di **Shadcn/UI** per l'inizializzazione dei componenti. |
| `eslint.config.mjs` | Regole di linting per mantenere la qualità e lo stile del codice JavaScript/TypeScript. |
| `next-env.d.ts` | Dichiarazioni dei tipi TypeScript automatiche per Next.js. |
| `next.config.ts` | Configurazione interna del framework Next.js. |
| `package.json` / `package-lock.json` | Dipendenze del progetto e script di avvio (`dev`, `build`, `start`). |
| `postcss.config.mjs` | Configurazione di PostCSS per l'elaborazione di Tailwind CSS. |
| `proxy.ts` | Configurazione per eventuali proxy di sviluppo o dev-routing. |
| `tsconfig.json` | Configurazione globale del compilatore TypeScript e path alias (es. `@/*`). |
| `tree.txt` | Esportazione testuale della struttura delle directory. |

---

## 🚦 La Cartella `app/` (Routing e API)
Gestisce i percorsi visualizzabili nel browser e i punti di ingresso delle richieste HTTP.

### 🌐 Root File dell'App
*   `favicon.ico`: Icona del sito.
*   `globals.css`: Stili CSS globali (inclusione di Tailwind).
*   `layout.tsx`: Il layout radice dell'applicazione (Navbar/Footer globali e Provider).
*   `page.tsx`: La **Home Page** principale del portale.
*   `robots.ts` / `sitemap.ts`: Configurazioni SEO e indicizzazione per i motori di ricerca.

### 👥 Sezione `/admin` (Pannello di Controllo)
*   `layout.tsx` & `page.tsx`: Layout e schermata di ingresso amministrativa.
*   `dashboard/page.tsx`: Vista d'insieme delle metriche della piattaforma.
*   `enrollments/page.tsx`: Gestione delle iscrizioni degli studenti ai corsi.
*   `quiz/actions.ts`: Server Actions dedicate alla gestione amministrativa dei quiz.
*   `quiz/[id]/analytics/page.tsx`: Statistiche e performance avanzate di un singolo quiz.
*   `quiz/[id]/review/page.tsx`: Interfaccia per la revisione e la correzione manuale dei quiz.

### ⚙️ Sezione `/api` (Backend Endpoints)
*   `admin/quizzes/route.ts`: API per operazioni CRUD sui quiz lato admin.
*   `auth/logout/route.ts` & `session/route.ts`: Endpoint di gestione della sessione utente e disconnessione.
*   `classes/route.ts`: Endpoint per la gestione delle classi/classi virtuali.
*   `docs/route.ts` & `docs/config/route.ts`: API per la gestione/configurazione della documentazione interna.
*   `docs/upload/route.ts`: Endpoint per il caricamento di file di documentazione.
*   `seed-admin/route.ts`: Script/Endpoint per popolare il database con un utente amministratore iniziale.

### 🔐 Sezione `/auth` & Accesso
*   `auth/reset-password/`: Pagine (`page.tsx`) e componenti client (`ResetPasswordClient.tsx`) per il ripristino della password.
*   `login/page.tsx`: Pagina di login.
*   `register/page.tsx` (e `_old`): Pagina di registrazione per i nuovi utenti.

### 📚 Sezione `/courses` (Corsi e Lezioni)
*   `page.tsx`: Catalogo generale dei corsi disponibili.
*   `[slug]/page.tsx`: Pagina dettaglio del singolo corso tramite URL mnemonico (slug).
*   `[slug]/modules/[moduleId]/lessons/[lessonId]/page.tsx`: Il visualizzatore della singola lezione nidificata nel rispettivo modulo.
*   `[slug]/quizzes/[quizId]/page.tsx`: Pagina di svolgimento del quiz per lo studente all'interno del corso.

### 📑 Altre Pagine Utente
*   `contacts/`: Pagina dei contatti (`page.tsx`) e relative `actions.ts` per l'invio di messaggi.
*   `credits/`: Gestione o visualizzazione dei crediti formativi della piattaforma.
*   `dashboard/`: Dashboard generale dello studente/utente autenticato.
*   `profile/page.tsx`: Gestione del profilo utente (dati personali, password).
*   `resources/page.tsx`: Download di materiale didattico aggiuntivo.
*   `students/page.tsx`: Vista o elenco dedicato agli studenti.

---

## 🧠 La Cartella `features/` (Logica Core e Domini)
Qui risiede l'effettiva business logic, divisa per contesti delimitati (Bounded Contexts).

### 🛠️ `features/admin`
*   **`actions/`**: Server Actions per approvare/revocare le iscrizioni (`approveEnrollmentAction.ts`, ecc.).
*   **`courses/`**: Gestione dei corsi. Include form di creazione (`CreateCourseForm.tsx`), l'editor dei contenuti (`CourseContentEditor.tsx`) e servizi database (`adminCourseService.ts`).
*   **`dashboard/`**: Componenti per assemblare il pannello di controllo (`AdminDashboard.tsx`, `QuizzesTab.tsx`).
*   **`mail/`**: Il motore di invio email. Supporta provider multipli (**Gmail**, **Resend**), un motore di template (`MailTemplateEngine.ts`) e interfacce di invio massivo (`MailBulkSender.tsx`).
*   **`stats/`**: Servizi e grafici visuali (BarChart, PieChart, DonutChart) per monitorare l'andamento dell'accademia.
*   **`tracking/`**: Sistema interno per tracciare le visualizzazioni delle pagine e le attività degli utenti (`PageTracker.tsx`, `trackingService.ts`).
*   **`users/`**: Gestione degli account utenti, bulk actions per attivazione o cambio classe rapido.

### 🔐 `features/auth`
Implementazione rigorosa del pattern architetturale a strati:
*   `domain/user.ts`: Definizione delle entità pure dell'utente.
*   `ports/`: Interfacce di astrazione (`IUserRepository.ts`, `ITokenService.ts`, ecc.).
*   `infrastructure/`: Implementazioni concrete (es. `SupabaseUserRepository.ts`, `BcryptPasswordService.ts`, `JoseTokenService.ts`).
*   `services/`: Servizi orchestratori (`AuthService.ts`, `PasswordResetService.ts`).
*   `actions/`: Server Actions per agganciare la UI al servizio (Login, Register, Logout).
*   `context/AuthContext.tsx`: Provider React per lo stato dell'autenticazione in tutta l'app.

### 📖 `features/courses`
Logica lato client/studente per fruire dei corsi.
*   `components/`: Componenti di navigazione dei corsi (`CourseCard.tsx`, `CourseViewer.tsx`, `CategoryFilter.tsx`).
*   `lesson/LessonRenderer.tsx`: Componente specializzato nel rendering dinamico del testo della lezione.
*   `repositories/SupabaseCourseRepository.ts`: Data access layer per i corsi basato su Supabase.

### 🏠 `features/home` & `marketing`
*   `home/components/`: Componenti della pagina pubblica principale (`Navbar.tsx`, `Hero.tsx`, `Footer.tsx`).
*   `marketing/components/`: Sezioni informative per l'acquisizione di utenti (`WhyChoose.tsx`, `HowItWorks.tsx`).

### 📝 `features/quiz`
Il motore dei test e delle verifiche.
*   `domain/`: Entità fondamentali (`Question.ts`, `Quiz.ts`, `QuizAttempt.ts`).
*   `markdown/parser/quizParser.ts`: Componente critico che **analizza e converte file Markdown (.md) in oggetti Quiz strutturati** per il database.
*   `components/`: Interfacce per lo studente (`QuizViewer.tsx`) e per i docenti (`TeacherQuizDashboard.tsx`, `CorrectionForm.tsx`).

### 📦 `features/resources` & `theme`
*   `resources/`: Azioni CRUD e tabelle per la gestione dei materiali scaricabili da parte dell'amministratore.
*   `theme/`: Sistema di gestione del tema (Chiaro/Scuro) tramite Context API e componente `ThemeToggle.tsx`.

---

## 🛠️ Cartelle di Supporto Tecnico

### 🧰 `components/` & `components/ui/`
Contiene la libreria dei componenti atomici e riutilizzabili dell'interfaccia grafica (pulsanti, input, card, dialog, tabelle, ecc.), per lo più generati tramite **Shadcn/UI** e basati su Tailwind CSS.

### 🗂️ `docs/`
Raccolta di documentazione di progetto e file di configurazione dati:
*   Guida allo sviluppo (`gcprof-academy_DEV_GUIDE.md`) e note di consegna (`HANDOVER_PROMPT.md`).
*   `courses/` & `quiz/`: File sorgenti in **Markdown** usati come base per i corsi di programmazione (es. Python Practice) e i quiz.
*   `supabase/`: Script SQL fondamentali (`schema.sql`, `roles.sql`, `data.sql`) per l'inizializzazione e il setup delle tabelle e dei permessi sul database.

### 🧪 `lib/`
*   `logger.ts`: Sistema di logging dell'applicazione.
*   `supabase.ts`: Client inizializzato per la connessione al BaaS Supabase.
*   `utils.ts`: Funzioni di utility globali (es. formattazione classi CSS con `clsx` e `tailwind-merge`).

### 📝 `logs/`
*   `app.log`: File in cui vengono scritti i log di runtime dell'applicazione.

### 📁 `public/`
Contiene gli asset statici accessibili pubblicamente via browser: loghi istituzionali, icone SVG standard e presentazioni PDF nella cartella `showcase/`.

### 🔀 `shared/`
Contiene configurazioni globali condivise:
*   `config/navigation.ts`: Mappe e definizioni delle rotte di navigazione per l'intero sito.
*   `config/navigation/*Navigation.ts`: Viste della barra di navigazione dinamiche basate sul ruolo dell'utente (`admin`, `student`, `public`, `pending`).
*   `ui/`: Layout strutturali comuni come `PageContainer.tsx` o `PublicLayout.tsx`.

### ⚡ `supabase/`
Cartella di configurazione locale della **CLI di Supabase** (`config.toml`) contenente metadati sul progetto collegato, versioni di postgres e impostazioni dell'istanza locale di sviluppo.

### 🗃️ `types/`
*   `database.types.ts`: Definizioni di tipo TypeScript generate automaticamente a partire dallo schema del database Supabase, garantendo la massima stabilità e type-safety nelle query.