# GCPROF-AI-ACADEMY

> **Piattaforma LMS/CMS moderna per la gestione di corsi, lezioni, quiz, studenti e attività didattiche**, sviluppata con **Next.js**, **React**, **TypeScript** e **Supabase**, seguendo i principi della **Clean Architecture** e dell'organizzazione **Feature-Driven**.

---

# 📖 Indice

* Introduzione
* Obiettivi del progetto
* Stack tecnologico
* Filosofia architetturale
* Architettura generale
* Convenzioni del repository
* Struttura della Root
* La cartella `app`
* La cartella `features`
* Componenti condivisi
* Database
* Documentazione
* Asset pubblici
* Flussi applicativi
* Principi architetturali
* Convenzioni di sviluppo

---

# 🎯 Introduzione

**GCPROF-AI-ACADEMY** è una piattaforma didattica progettata per istituti scolastici, docenti e studenti con l'obiettivo di centralizzare la gestione dell'attività formativa.

L'applicazione consente di amministrare:

* corsi;
* moduli;
* lezioni;
* quiz;
* classi;
* utenti;
* risorse didattiche;
* statistiche;
* tracciamento delle attività;
* comunicazioni tramite posta elettronica.

L'intero progetto è stato sviluppato privilegiando:

* modularità;
* manutenibilità;
* riutilizzo del codice;
* separazione delle responsabilità;
* elevata scalabilità.

---

# 🚀 Obiettivi del progetto

L'Academy nasce per offrire una piattaforma unica che permetta di:

* gestire corsi strutturati;
* creare percorsi didattici modulari;
* distribuire materiale didattico;
* creare quiz direttamente da file Markdown;
* monitorare l'attività degli studenti;
* raccogliere statistiche;
* amministrare utenti e classi;
* automatizzare comunicazioni tramite email;
* mantenere un'architettura facilmente estendibile.

---

# 🛠 Stack Tecnologico

## Framework

* Next.js (App Router)
* React
* TypeScript

## Frontend

* Tailwind CSS
* Shadcn/UI
* Radix UI
* Lucide Icons

## Backend

* Next.js Server Actions
* API Routes
* Supabase

## Database

* PostgreSQL (Supabase)

## Autenticazione

* JWT (JOSE)
* bcrypt
* Cookie HTTP Only

## Servizi

* Resend
* Gmail SMTP

## Librerie

* Recharts
* clsx
* class-variance-authority
* tailwind-merge

---

# 🏛 Filosofia Architetturale

L'intero progetto segue una struttura **Feature-Driven**, nella quale ogni dominio funzionale possiede tutte le proprie responsabilità.

La logica è organizzata secondo i principi della **Clean Architecture**, evitando dipendenze dirette tra interfaccia grafica, logica di business e persistenza dei dati.

I principali pattern adottati sono:

* Feature Driven Architecture
* Clean Architecture
* Repository Pattern
* Ports & Adapters
* Dependency Injection
* Domain Driven Design
* Server Actions
* Component Based Design

Questa organizzazione rende il progetto facilmente estendibile e permette di sostituire l'infrastruttura (database, servizi esterni, provider email ecc.) senza modificare la logica applicativa.

---

# 🏗 Architettura Generale

```text
                        GCPROF-AI-ACADEMY
                                │
        ┌───────────────────────┼────────────────────────┐
        │                       │                        │
      app/                 features/               shared/
        │                       │                        │
    Routing               Business Logic         Componenti comuni
        │
        │
    API Routes
        │
        ▼
  Services / Repository
        │
        ▼
    Supabase Database
```

L'applicazione può essere suddivisa in tre macro livelli.

## 1. app/

Gestisce esclusivamente:

* routing;
* pagine;
* layout;
* endpoint API;
* Server Actions collegate alle pagine.

Rappresenta il punto di ingresso dell'applicazione.

---

## 2. features/

Costituisce il cuore del software.

Ogni dominio applicativo possiede:

* componenti;
* servizi;
* repository;
* azioni;
* validatori;
* modelli;
* tipi;
* infrastruttura.

Ogni feature è completamente indipendente dalle altre.

---

## 3. shared/

Contiene tutto ciò che può essere riutilizzato da qualsiasi feature:

* layout;
* componenti comuni;
* configurazioni;
* navigazione;
* helper condivisi.

---

## 4. components/

Raccoglie la libreria dei componenti UI riutilizzabili, costruiti principalmente mediante Shadcn/UI.

---

## 5. docs/

Documentazione tecnica del progetto, guide di sviluppo, file Markdown dei corsi, quiz e script SQL.

---

## 6. public/

Asset statici accessibili direttamente dal browser.

---

# 📚 Convenzioni del Repository

Il progetto segue una convenzione molto rigorosa.

## page.tsx

Pagina accessibile tramite routing.

---

## layout.tsx

Layout condiviso da tutte le pagine della cartella.

---

## actions.ts

Server Actions.

Contengono la logica che collega la UI ai servizi.

---

## components/

Componenti React dedicati ad una specifica feature.

---

## services/

Business Logic.

Implementano il comportamento dell'applicazione.

---

## repositories/

Accesso ai dati.

Separano completamente il database dalla logica di business.

---

## domain/

Entità del dominio.

Rappresentano il modello concettuale dell'applicazione.

---

## validators/

Validazione dei dati.

---

## ports/

Interfacce della Clean Architecture.

Permettono di astrarre le implementazioni concrete.

---

## infrastructure/

Implementazioni tecniche.

Ad esempio:

* Supabase
* JWT
* Cookie
* Password Hashing
* Provider Email

---

## context/

Context React condivisi.

Gestiscono lo stato globale dell'applicazione.

---

# 📂 Struttura della Root

La directory principale contiene la configurazione dell'intero progetto.

| File                 | Responsabilità                                                                         |
| -------------------- | -------------------------------------------------------------------------------------- |
| `.env.local`         | Variabili d'ambiente locali utilizzate durante lo sviluppo.                            |
| `.gitignore`         | Elenco di file e cartelle escluse dal controllo versione Git.                          |
| `components.json`    | Configurazione di Shadcn/UI e dei componenti generati.                                 |
| `eslint.config.mjs`  | Regole di analisi statica del codice per garantire qualità e uniformità.               |
| `next-env.d.ts`      | Definizioni TypeScript generate automaticamente da Next.js.                            |
| `next.config.ts`     | Configurazione globale del framework Next.js.                                          |
| `package.json`       | Dipendenze, script e metadati del progetto.                                            |
| `package-lock.json`  | Blocco delle versioni delle dipendenze installate.                                     |
| `postcss.config.mjs` | Configurazione della pipeline PostCSS utilizzata da Tailwind CSS.                      |
| `proxy.ts`           | Configurazioni di proxy, middleware o instradamento dedicato all'ambiente di sviluppo. |
| `README.md`          | Documentazione principale del progetto.                                                |
| `tree.txt`           | Esportazione della struttura completa delle directory.                                 |
| `tsconfig.json`      | Configurazione globale del compilatore TypeScript e dei path alias.                    |

---

# 📂 La Cartella `app/`

La cartella **`app/`** rappresenta il punto di ingresso dell'applicazione secondo il paradigma **Next.js App Router**.

Qui vengono definite:

* le pagine accessibili dagli utenti;
* i layout condivisi;
* gli endpoint API;
* le Server Actions collegate alle pagine;
* il routing dinamico.

In questa cartella **non risiede la logica di business**. Essa è delegata alle rispettive feature presenti nella cartella `features/`.

---

# 🌐 Root dell'Applicazione

| File          | Responsabilità                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `favicon.ico` | Icona visualizzata dal browser.                                                                                     |
| `globals.css` | Foglio di stile globale dell'intera applicazione. Importa Tailwind CSS e gli stili comuni.                          |
| `layout.tsx`  | Layout principale dell'applicazione. Definisce Provider, tema, Navbar, Footer e struttura comune a tutte le pagine. |
| `page.tsx`    | Home Page pubblica dell'Academy.                                                                                    |
| `robots.ts`   | Configurazione SEO per l'indicizzazione dei motori di ricerca.                                                      |
| `sitemap.ts`  | Generazione dinamica della sitemap del sito.                                                                        |

---

# 👨‍💼 Sezione `app/admin`

Raccoglie tutte le pagine dedicate agli amministratori della piattaforma.

Questa sezione rappresenta il pannello di controllo dell'intera Academy.

## Struttura

```text
admin/
│
├── layout.tsx
├── page.tsx
├── dashboard/
├── enrollments/
└── quiz/
```

### layout.tsx

Layout condiviso del pannello amministrativo.

Gestisce:

* autenticazione;
* navigazione;
* sidebar;
* layout comune.

---

### page.tsx

Pagina iniziale dell'area amministrativa.

Generalmente reindirizza verso la Dashboard principale.

---

## dashboard/

Contiene la Dashboard amministrativa.

Responsabilità:

* panoramica generale;
* accesso rapido ai moduli;
* statistiche;
* gestione dell'Academy.

---

## enrollments/

Area dedicata alla gestione delle iscrizioni.

Permette di:

* approvare richieste;
* revocare iscrizioni;
* monitorare gli accessi ai corsi.

---

## quiz/

Gestione amministrativa del motore Quiz.

### actions.ts

Server Actions dedicate a:

* importazione quiz;
* modifica;
* eliminazione;
* assegnazione;
* salvataggio.

---

### quiz/[id]/analytics/

Dashboard analitica di uno specifico quiz.

Visualizza:

* punteggi;
* statistiche;
* andamento;
* distribuzione dei risultati.

---

### quiz/[id]/review/

Interfaccia dedicata alla revisione manuale delle prove svolte dagli studenti.

---

# 🌐 Sezione `app/api`

Contiene gli endpoint HTTP dell'applicazione.

Sono utilizzati per:

* autenticazione;
* integrazioni;
* upload;
* servizi esterni;
* operazioni amministrative.

## admin/

API dedicate alle funzionalità amministrative.

### admin/quizzes

Espone gli endpoint CRUD per la gestione dei quiz.

---

## auth/

Gestione della sessione.

Comprende:

* logout;
* verifica sessione.

---

## classes/

Gestione delle classi scolastiche.

---

## docs/

Gestione della documentazione caricata dall'amministratore.

Comprende:

* configurazione;
* upload;
* consultazione.

---

## seed-admin/

Endpoint utilizzato per inizializzare il database con un amministratore.

---

# 🔐 Sezione `app/auth`

Gestisce il recupero delle credenziali.

Comprende:

* validazione token;
* reimpostazione password;
* interfaccia dedicata.

---

# 📞 Sezione `app/contacts`

Pagina pubblica dei contatti.

Comprende:

* modulo di contatto;
* Server Actions;
* invio email.

---

# 📚 Sezione `app/courses`

Costituisce il punto di accesso ai contenuti didattici.

## page.tsx

Catalogo dei corsi disponibili.

---

## [slug]

Visualizza il dettaglio di un singolo corso.

Ogni corso contiene:

* informazioni;
* moduli;
* lezioni;
* quiz.

---

## modules/

Navigazione dei moduli.

---

## lessons/

Visualizzatore delle lezioni.

Gestisce:

* rendering Markdown;
* avanzamento;
* tracking della consultazione.

---

## quizzes/

Visualizzatore del quiz appartenente al corso.

---

# 🎓 Dashboard Utente

## dashboard/

Dashboard personale dello studente.

Permette di visualizzare:

* corsi disponibili;
* avanzamento;
* attività recenti;
* riepilogo personale.

---

# 👤 profile/

Area dedicata alla gestione del profilo.

Consente di modificare:

* dati personali;
* password;
* preferenze.

---

# 📝 login/

Pagina di autenticazione.

---

# 🆕 register/

Pagina di registrazione.

Comprende:

* validazione dati;
* creazione account;
* assegnazione della classe;
* invio email di benvenuto.

---

# 📦 resources/

Area dedicata al materiale didattico scaricabile.

---

# 👨‍🎓 students/

Pagina destinata alla visualizzazione degli studenti o delle informazioni ad essi dedicate.

---

# 🧠 La Cartella `features/`

La cartella **features** rappresenta il cuore dell'applicazione.

Ogni dominio funzionale è completamente autonomo.

Ogni feature contiene esclusivamente il codice necessario al proprio funzionamento.

Una tipica organizzazione è la seguente:

```text
feature/
│
├── actions/
├── components/
├── services/
├── repositories/
├── domain/
├── ports/
├── validators/
├── infrastructure/
├── hooks/
└── types/
```

Questa struttura permette di mantenere il codice ordinato, facilmente estendibile e indipendente dalle altre funzionalità.

---

# 🛠 features/admin

Contiene tutti gli strumenti dedicati agli amministratori.

## actions/

Server Actions amministrative.

Gestiscono operazioni come:

* approvazione iscrizioni;
* revoca;
* assegnazioni;
* modifiche massive.

---

## courses/

Sistema completo di amministrazione dei corsi.

Comprende:

* creazione corsi;
* gestione categorie;
* modifica contenuti;
* assegnazione alle classi;
* organizzazione della struttura didattica.

---

## dashboard/

Assembla la Dashboard amministrativa.

Include:

* pannello principale;
* gestione quiz;
* richieste utenti;
* widget amministrativi.

---

## mail/

Centro di gestione delle comunicazioni.

Comprende:

### Components

Interfacce per:

* invio singolo;
* invio massivo;
* test email;
* editor template;
* impostazioni.

### Providers

Implementazioni dei provider email.

Supporta:

* Gmail SMTP
* Resend

### Services

Motore completo per:

* rendering template;
* sostituzione placeholder;
* configurazione;
* gestione provider;
* invio email.

---

## stats/

Sistema statistico dell'Academy.

Comprende:

* KPI;
* grafici;
* dashboard;
* analisi utenti;
* distribuzione studenti;
* andamento attività.

---

## tracking/

Sistema interno di monitoraggio.

Registra:

* visite;
* pagine;
* attività;
* navigazione;
* utilizzo della piattaforma.

---

## users/

Sistema completo di amministrazione utenti.

Permette:

* gestione utenti;
* modifica ruoli;
* assegnazione classi;
* attivazioni massive;
* revoca accessi;
* monitoraggio attività.

---

# 🔐 features/auth

Gestisce l'intero sistema di autenticazione.

Segue rigorosamente i principi della Clean Architecture.

## domain/

Modelli di dominio.

---

## ports/

Interfacce che astraggono:

* repository;
* token;
* password;
* cookie.

---

## infrastructure/

Implementazioni concrete.

Comprende:

* Supabase Repository;
* Password Hashing;
* JWT;
* Cookie Service;
* Email Service.

---

## services/

Business Logic dell'autenticazione.

Coordina:

* repository;
* validazione;
* sicurezza;
* sessioni.

---

## actions/

Server Actions.

Espongono i servizi verso l'interfaccia utente.

---

## context/

Gestisce lo stato globale dell'utente autenticato.

---

## validators/

Validazione centralizzata dei dati di autenticazione.

---

# 📚 features/courses

Contiene tutta la logica relativa ai corsi.

Comprende:

* catalogo;
* ricerca;
* visualizzazione;
* rendering lezioni;
* gestione repository;
* interrogazione database;
* mapping del dominio.

---

# 🏠 features/home

Componenti della Home Page.

Comprende:

* Navbar;
* Hero;
* Footer;
* anteprima corsi.

---

# 📢 features/marketing

Componenti dedicati alla presentazione della piattaforma.

Utilizzati nelle pagine pubbliche.

Comprendono:

* Hero Section;
* Why Choose;
* Student Features;
* How It Works.

---

# 📝 features/quiz

Motore completo del sistema Quiz.

Comprende:

* dominio;
* parser Markdown;
* repository;
* validatori;
* dashboard docente;
* dashboard studente;
* visualizzatore;
* correzione;
* statistiche.

Uno degli elementi più importanti è il parser Markdown, che converte file `.md` in strutture dati persistibili nel database.

---

# 📦 features/resources

Gestisce il materiale didattico scaricabile messo a disposizione degli studenti.

Questa feature consente agli amministratori di pubblicare, aggiornare e rimuovere documenti, dispense, file PDF e altre risorse didattiche.

## Struttura

### actions/

Server Actions dedicate alle operazioni CRUD.

Comprendono:

* creazione risorse;
* modifica;
* eliminazione;
* recupero elenco.

---

### components/

Componenti React utilizzati dal pannello amministrativo.

Consentono:

* inserimento nuove risorse;
* modifica;
* consultazione;
* gestione della libreria documentale.

---

### schemas/

Definizione degli schemi di validazione delle risorse.

---

### types/

Tipizzazione TypeScript delle entità.

---

# 🎨 features/theme

Gestisce il tema grafico dell'applicazione.

Comprende:

* Theme Context;
* Theme Toggle;
* gestione modalità Chiara/Scura;
* persistenza delle preferenze utente.

---

# 🧩 Cartella `components`

Contiene componenti React riutilizzabili indipendenti dalle singole feature.

Questi componenti costituiscono la libreria grafica dell'applicazione.

## components/

Componenti comuni utilizzati da più sezioni dell'Academy.

---

## components/ui/

Libreria di componenti atomici realizzata principalmente con **Shadcn/UI** e **Radix UI**.

Comprende:

* Alert
* Badge
* Button
* Card
* Checkbox
* Dialog
* Dropdown
* Form
* Input
* Label
* Progress
* Radio Group
* Select
* Table
* Tabs
* Textarea

Questi componenti rappresentano il livello più basso dell'interfaccia utente e vengono riutilizzati in tutto il progetto.

---

# 🤝 Cartella `shared`

Raccoglie tutto ciò che può essere utilizzato trasversalmente da qualsiasi feature.

L'obiettivo è evitare duplicazioni e centralizzare gli elementi comuni.

## config/

Configurazioni globali dell'applicazione.

Comprende:

* configurazione del sito;
* definizione delle rotte;
* menu di navigazione;
* navigazione dinamica basata sul ruolo dell'utente.

---

## layout/

Layout condivisi.

Permettono di mantenere uniforme l'interfaccia dell'applicazione.

---

## ui/

Componenti strutturali comuni.

Comprendono elementi come:

* contenitori pagina;
* card condivise;
* titoli di sezione;
* badge.

---

# 📚 Cartella `docs`

Contiene tutta la documentazione tecnica e funzionale del progetto.

## Documentazione tecnica

Comprende:

* guide di sviluppo;
* handover;
* documentazione database;
* crediti;
* note progettuali.

---

## docs/courses/

Raccoglie i corsi sorgente scritti in formato Markdown.

Questi documenti rappresentano la base dei contenuti didattici.

---

## docs/quiz/

Contiene i template Markdown dei quiz.

Il parser dell'applicazione trasforma automaticamente tali file in quiz strutturati memorizzabili nel database.

---

## docs/supabase/

Script SQL ufficiali del progetto.

Comprendono:

* schema database;
* ruoli;
* dati iniziali.

---

# ⚙ Cartella `lib`

Raccoglie utility e servizi tecnici condivisi.

## logger.ts

Sistema centralizzato di logging.

---

## supabase.ts

Client inizializzato di Supabase utilizzato dall'intera applicazione.

---

## utils.ts

Funzioni helper condivise.

Comprendono:

* utility CSS;
* helper generici;
* funzioni di supporto.

---

# 📝 Cartella `logs`

Contiene i file di log prodotti dall'applicazione.

Può essere utilizzata durante:

* debugging;
* monitoraggio;
* analisi errori.

---

# 🌍 Cartella `public`

Contiene tutte le risorse statiche accessibili direttamente dal browser.

Comprende:

* loghi;
* immagini;
* icone;
* documentazione PDF;
* showcase;
* asset grafici.

Questi file non vengono elaborati dal framework e sono serviti direttamente dal web server.

---

# 🗄 Cartella `supabase`

Contiene la configurazione locale della CLI di Supabase.

Comprende:

* configurazione del progetto;
* informazioni sull'istanza locale;
* metadati di sviluppo;
* versioni dei servizi.

Questa cartella è utilizzata esclusivamente durante lo sviluppo e non contiene la logica applicativa.

---

# 🧬 Cartella `types`

Contiene le definizioni TypeScript condivise.

In particolare:

* tipi generati automaticamente dal database;
* tipizzazione delle query;
* supporto al type-checking.

L'utilizzo dei tipi generati da Supabase consente di ridurre drasticamente gli errori durante lo sviluppo.

---

# 🔄 Flussi Applicativi Principali

## Autenticazione

```text
Utente
   │
   ▼
Login / Register
   │
   ▼
Server Action
   │
   ▼
AuthService
   │
   ▼
Repository
   │
   ▼
Supabase
   │
   ▼
Cookie HTTP Only
   │
   ▼
Dashboard
```

---

## Fruizione di un Corso

```text
Catalogo
   │
   ▼
Corso
   │
   ▼
Modulo
   │
   ▼
Lezione
   │
   ▼
Tracking
   │
   ▼
Aggiornamento Progressi
```

---

## Sistema Quiz

```text
Markdown
   │
   ▼
Quiz Parser
   │
   ▼
Oggetti Quiz
   │
   ▼
Repository
   │
   ▼
Database
   │
   ▼
Quiz Viewer
   │
   ▼
Correzione
   │
   ▼
Statistiche
```

---

## Gestione Email

```text
Template
   │
   ▼
MailTemplateEngine
   │
   ▼
EmailService
   │
   ▼
Provider
   │
   ├── Gmail
   └── Resend
        │
        ▼
Invio Email
```

---

# 🏛 Principi Architetturali

L'intero progetto è costruito seguendo alcuni principi fondamentali.

* Feature-Driven Architecture
* Clean Architecture
* Repository Pattern
* Ports & Adapters
* Dependency Injection
* Domain Driven Design (DDD)
* Separation of Concerns
* Componentizzazione React
* Server Actions di Next.js
* Strong Typing con TypeScript
* Database Type Safety mediante Supabase

Questi principi rendono il progetto facilmente estendibile, testabile e manutenibile nel tempo.

---

# 📏 Convenzioni di Sviluppo

Per mantenere uniforme il codice, ogni nuova funzionalità dovrebbe rispettare le convenzioni adottate nel progetto.

## Organizzazione

Ogni nuova feature dovrebbe essere autonoma e contenere tutto il necessario al proprio funzionamento.

Quando opportuno, utilizzare la seguente struttura:

```text
feature/
├── actions/
├── components/
├── services/
├── repositories/
├── domain/
├── ports/
├── validators/
├── infrastructure/
├── hooks/
└── types/
```

---

## Linee guida

* Preferire componenti piccoli e riutilizzabili.
* Separare sempre la UI dalla logica di business.
* Centralizzare l'accesso ai dati nei Repository.
* Utilizzare le Server Actions come punto di ingresso della business logic.
* Evitare duplicazioni di codice.
* Riutilizzare i componenti condivisi (`shared/` e `components/`) quando possibile.
* Mantenere la tipizzazione TypeScript completa.
* Documentare le nuove feature e aggiornare questo README quando vengono introdotti nuovi moduli significativi.

---

# 🚀 Evoluzione del Progetto

L'architettura è stata progettata per consentire l'aggiunta di nuove funzionalità senza modificare quelle esistenti.

Nuovi domini funzionali possono essere introdotti semplicemente aggiungendo una nuova cartella in `features/`, mantenendo invariata la struttura dell'applicazione.

Questa impostazione favorisce la scalabilità del progetto, facilita il lavoro collaborativo e riduce l'impatto delle modifiche future.

---

# 📄 Licenza

Questo progetto è sviluppato a scopo didattico e formativo.

L'utilizzo del codice, della documentazione e dei materiali è soggetto alle condizioni stabilite dal proprietario del progetto.

---

# 👨‍💻 Autore

**Prof. Giuseppe Carnabuci**

Ingegnere Informatico • Docente di Informatica

Progetto:

**GCPROF-AI-ACADEMY**

Piattaforma LMS/CMS sviluppata con Next.js, React, TypeScript e Supabase per la gestione completa dell'attività didattica.

---

# ⭐ Conclusione

Questo documento costituisce la mappa concettuale del repository.

Il suo scopo è fornire una panoramica dell'organizzazione del progetto e facilitare l'orientamento di sviluppatori, collaboratori e manutentori.

Per approfondire i singoli moduli è consigliabile consultare la documentazione presente nella cartella `docs/` e il codice sorgente delle rispettive feature.

---



