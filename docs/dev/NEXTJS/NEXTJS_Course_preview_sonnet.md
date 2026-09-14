<a id="inizio"></a>

# ⚛️ Next.js Master: Dall'App Router alla Piattaforma Full-Stack — La Guida Completa allo Sviluppo Moderno
**Il percorso definitivo di GCProf Academy per progettare, costruire e capire davvero una piattaforma web moderna — usando come caso di studio reale la stessa GCPROF-AI-ACADEMY.COM.**

Benvenuto nella preview esclusiva della nuova guida **Next.js Master** di **GCProf Academy**. Non l'ennesimo tutorial isolato su un framework, ma un vero **percorso didattico progressivo e modulare** che ti accompagna dalla prima pagina Next.js fino alla comprensione completa dell'architettura di un'applicazione reale, production-ready, con database, autenticazione, dashboard amministrative e sistemi di quiz automatizzati.

Next.js oggi non è "un framework tra tanti": è lo standard con cui aziende come Netflix, TikTok, Nike e Twitch costruiscono le proprie interfacce web, ed è il framework scelto dalla stragrande maggioranza delle nuove piattaforme full-stack basate su React. Che tu sia uno studente del quinto anno che si affaccia al mondo dello sviluppo web professionale, un programmatore esperto che vuole colmare il salto verso il full-stack moderno, o un docente che vuole insegnare architettura del software con un esempio reale sotto mano, **questa guida ti porta dentro il codice di una piattaforma vera, riga per riga**.

Questo percorso parte dalle basi di Next.js e TypeScript e cresce in modo graduale fino ai principi della **Clean Architecture**, del **Feature-Driven Design** e dei **Ports & Adapters** — gli stessi che governano il codice di GCPROF-AI-ACADEMY.COM. Ogni modulo è arricchito da esempi commentati riga per riga, laboratori pratici e un project work finale in cui costruirai la tua mini-piattaforma e-learning da zero.

**[👉 Iscriviti ora e inizia dal Modulo 1!]**

---

## 🏗️ L'Architettura del Corso

Il corso è strutturato in **4 Macro-fasi** progressive, ciascuna con un traguardo concreto:

| Fase | Livello | Cosa saprai fare al termine |
|---|---|---|
| **1. Le Fondamenta di Next.js e TypeScript** | Base | Comprendere l'App Router, i Server Component, TypeScript e la struttura di un progetto Next.js reale |
| **2. UI, Dati e Autenticazione** | Intermedio | Costruire interfacce con Tailwind e Shadcn/UI, collegarle a Supabase, gestire API, Server Actions e login sicuri |
| **3. Clean Architecture e Dominio** | Avanzato | Strutturare un'applicazione reale con Clean Architecture, Feature-Driven Design, Ports & Adapters e Repository Pattern |
| **4. Funzionalità Full-Stack e Produzione** | Esperto | Implementare funzionalità complesse (parsing di contenuti, dashboard, analytics) e portare l'app in produzione su Vercel |

---

## 👥 A chi è rivolto

* 🎓 Studenti del **quinto anno** e degli **indirizzi tecnici/informatici**, che vogliono capire come funziona davvero una piattaforma web professionale, oltre la teoria da manuale
* 💻 **Programmatori esperti** che conoscono già le basi della programmazione e vogliono colmare il salto verso lo sviluppo full-stack moderno con React/Next.js
* 👨‍🏫 **Docenti di informatica** che cercano un percorso pronto, modulare, con un caso di studio reale (il codice sorgente di GCPROF-AI-ACADEMY.COM) da mostrare in classe
* 🛠️ L'**admin e il team** della piattaforma GCPROF Academy, come guida di riferimento sull'architettura e sulle scelte tecniche del progetto

**Requisiti:** conoscenza di base di HTML, CSS, JavaScript e dei concetti fondamentali di programmazione (variabili, funzioni, cicli). Non è richiesta esperienza precedente con React o Next.js.

---

<a id="indice"></a>
## 📑 Indice dei Moduli Navigabile

**LIVELLO BASE: Le Fondamenta di Next.js e TypeScript**
* [Modulo 1: Introduzione a Next.js e all'Ecosistema React Moderno](#modulo-1)
* [Modulo 2: TypeScript Essenziale — Tipi, Interfacce e Type Safety](#modulo-2)
* [Modulo 3: Anatomia di un Progetto Next.js — Configurazione e Root](#modulo-3)
* [Modulo 4: L'App Router — Pagine, Layout e Routing su File System](#modulo-4)
* [Modulo 5: Server Component vs Client Component — La Nuova Architettura di Rendering](#modulo-5)

**LIVELLO INTERMEDIO: UI, Dati e Autenticazione**
* [Modulo 6: Tailwind CSS e Shadcn/UI — Un Design System Componibile](#modulo-6)
* [Modulo 7: Introduzione a Supabase — Database, Auth e Storage as a Service](#modulo-7)
* [Modulo 8: API Routes e Server Actions — Il Ponte tra Frontend e Backend](#modulo-8)
* [Modulo 9: Autenticazione e Sessioni — Login, Registrazione, Sicurezza](#modulo-9)
* [Modulo 10: Middleware e Route Protette — Controllo degli Accessi](#modulo-10)

**LIVELLO AVANZATO: Clean Architecture e Dominio**
* [Modulo 11: Clean Architecture in Next.js — Principi e Perché Adottarla](#modulo-11)
* [Modulo 12: Feature-Driven Design — Organizzare il Dominio in `features/`](#modulo-12)
* [Modulo 13: Ports & Adapters — Disaccoppiare Logica e Infrastrutture](#modulo-13)
* [Modulo 14: Repository Pattern con Supabase — Il Data Access Layer](#modulo-14)
* [Modulo 15: Form, Validazione e Server Actions Avanzate](#modulo-15)

**LIVELLO ESPERTO: Funzionalità Full-Stack e Produzione**
* [Modulo 16: Parsing di Contenuti — Dal Markdown ai Quiz Strutturati](#modulo-16)
* [Modulo 17: Dashboard, Analytics e Data Visualization](#modulo-17)
* [Modulo 18: Deploy, SEO e Performance — Vercel, Sitemap e Ottimizzazione](#modulo-18)
* [Modulo 19: Project Work Finale — Costruisci la Tua Mini-Piattaforma E-Learning](#modulo-19)

---

## 📚 Dettaglio dei Moduli

### LIVELLO BASE

<a id="modulo-1"></a>
[🔙 Torna all'indice](#indice)

### Modulo 1: Introduzione a Next.js e all'Ecosistema React Moderno
Il punto di partenza: cos'è Next.js, perché nasce sopra React e perché oggi è lo standard per costruire applicazioni web full-stack.
* **Argomenti:** cos'è React e il concetto di componente, perché React da solo non basta per un'app di produzione, cosa aggiunge Next.js (routing, rendering server-side, ottimizzazioni), panoramica dell'ecosistema (Vercel, Turbopack), installazione di un primo progetto con `create-next-app`.
* **Al termine saprai:** spiegare la relazione tra React e Next.js, creare un nuovo progetto Next.js e muoverti con sicurezza nella sua struttura iniziale.

---

<a id="modulo-2"></a>
[🔙 Torna all'indice](#indice)

### Modulo 2: TypeScript Essenziale — Tipi, Interfacce e Type Safety
Il linguaggio che rende il codice di una piattaforma reale affidabile e "autodocumentato".
* **Argomenti:** perché TypeScript e non solo JavaScript, tipi primitivi e tipi custom, `interface` e `type`, tipizzazione di funzioni e props dei componenti, i file `*.types.ts` (come `database.types.ts`), generics di base.
* **Al termine saprai:** scrivere componenti e funzioni Next.js tipizzati correttamente, leggendo ed estendendo interfacce già esistenti in un progetto reale.

---

<a id="modulo-3"></a>
[🔙 Torna all'indice](#indice)

### Modulo 3: Anatomia di un Progetto Next.js — Configurazione e Root
Ogni progetto professionale nasconde le sue regole nei file di configurazione: impariamo a leggerli.
* **Argomenti:** `package.json` e gli script (`dev`, `build`, `start`), `tsconfig.json` e gli alias di percorso (`@/*`), `next.config.ts`, `eslint.config.mjs` per la qualità del codice, `.env.local` e la gestione delle variabili d'ambiente/segreti, `components.json` (Shadcn/UI).
* **Al termine saprai:** orientarti nella root di un progetto Next.js professionale e capire il ruolo di ciascun file di configurazione.

---

<a id="modulo-4"></a>
[🔙 Torna all'indice](#indice)

### Modulo 4: L'App Router — Pagine, Layout e Routing su File System
Il cuore del routing moderno di Next.js: le cartelle diventano URL.
* **Argomenti:** la cartella `app/`, convenzioni `page.tsx` e `layout.tsx`, rotte dinamiche (`[slug]`, `[id]`), rotte annidate multiple (es. `courses/[slug]/modules/[moduleId]/lessons/[lessonId]`), `robots.ts` e `sitemap.ts` per la SEO.
* **Al termine saprai:** progettare la struttura di rotte di un'applicazione complessa e costruire pagine dinamiche e annidate.

---

<a id="modulo-5"></a>
[🔙 Torna all'indice](#indice)

### Modulo 5: Server Component vs Client Component — La Nuova Architettura di Rendering
La distinzione più importante (e spesso più fraintesa) di Next.js moderno.
* **Argomenti:** cosa sono i React Server Component (RSC) e perché esistono, la direttiva `"use client"`, quando scegliere l'uno o l'altro, composizione tra componenti server e client, vantaggi in termini di performance e sicurezza (dati sensibili mai esposti al browser).
* **Al termine saprai:** decidere consapevolmente se un componente deve essere server o client, ed evitare gli errori più comuni di questa architettura.

---

### LIVELLO INTERMEDIO

<a id="modulo-6"></a>
[🔙 Torna all'indice](#indice)

### Modulo 6: Tailwind CSS e Shadcn/UI — Un Design System Componibile
Costruire interfacce coerenti e professionali senza scrivere CSS da zero.
* **Argomenti:** utility-first CSS con Tailwind, configurazione con PostCSS, la libreria di componenti Shadcn/UI (`button`, `card`, `dialog`, `table`, `form`…), come personalizzare e riutilizzare componenti UI di basso livello, dark/light theme con `ThemeContext`.
* **Al termine saprai:** costruire interfacce complete, responsive e tematizzabili componendo Tailwind e componenti Shadcn/UI.

---

<a id="modulo-7"></a>
[🔙 Torna all'indice](#indice)

### Modulo 7: Introduzione a Supabase — Database, Auth e Storage as a Service
Il backend "chiavi in mano" più usato nell'ecosistema Next.js.
* **Argomenti:** cos'è Supabase e il suo database Postgres, il client Supabase (`lib/supabase.ts`), gli script `schema.sql`, `roles.sql` e `data.sql`, Row Level Security (RLS) e policy, generazione automatica dei tipi TypeScript dal database.
* **Al termine saprai:** collegare un progetto Next.js a Supabase, interrogare il database e capire il ruolo delle policy di sicurezza a livello di riga.

---

<a id="modulo-8"></a>
[🔙 Torna all'indice](#indice)

### Modulo 8: API Routes e Server Actions — Il Ponte tra Frontend e Backend
Due modi complementari con cui Next.js fa parlare client e server.
* **Argomenti:** creazione di endpoint in `app/api/.../route.ts`, metodi HTTP e `Request`/`Response`, le **Server Actions** come alternativa moderna alle API tradizionali, quando usare l'una o l'altra, esempio reale: gestione CRUD dei quiz.
* **Al termine saprai:** costruire endpoint API REST e Server Actions per gestire operazioni di lettura/scrittura sul database.

---

<a id="modulo-9"></a>
[🔙 Torna all'indice](#indice)

### Modulo 9: Autenticazione e Sessioni — Login, Registrazione, Sicurezza
Come proteggere un'applicazione e i dati dei suoi utenti.
* **Argomenti:** flusso di login/registrazione, hashing delle password (Bcrypt), token e sessioni con JWT (Jose), gestione dei cookie, reset password con token temporaneo via email (Resend), il pattern `AuthContext` per condividere lo stato di autenticazione lato client.
* **Al termine saprai:** implementare un flusso di autenticazione completo e sicuro, comprendendo il ruolo di ogni tecnologia coinvolta.

---

<a id="modulo-10"></a>
[🔙 Torna all'indice](#indice)

### Modulo 10: Middleware e Route Protette — Controllo degli Accessi
Decidere, prima ancora che una pagina venga renderizzata, chi può vederla.
* **Argomenti:** cos'è un middleware in Next.js e quando viene eseguito, protezione di rotte in base al ruolo (admin, studente, pubblico), navigazione dinamica in base al ruolo utente, gestione centralizzata del logout/validazione sessione.
* **Al termine saprai:** proteggere sezioni intere di un'applicazione in base al ruolo dell'utente autenticato.

---

### LIVELLO AVANZATO

<a id="modulo-11"></a>
[🔙 Torna all'indice](#indice)

### Modulo 11: Clean Architecture in Next.js — Principi e Perché Adottarla
Il salto di qualità che distingue un progetto scolastico da una piattaforma manutenibile nel tempo.
* **Argomenti:** i problemi di un'applicazione senza architettura (accoppiamento, difficoltà di test e manutenzione), i principi della Clean Architecture, la separazione tra logica di business (`features/`) e gestione delle rotte web (`app/`), vantaggi concreti a lungo termine.
* **Al termine saprai:** riconoscere i segnali di un'architettura fragile e spiegare perché disaccoppiare dominio e infrastruttura conviene.

---

<a id="modulo-12"></a>
[🔙 Torna all'indice](#indice)

### Modulo 12: Feature-Driven Design — Organizzare il Dominio in `features/`
Come organizzare un progetto grande per funzionalità, non per tipo di file.
* **Argomenti:** la cartella `features/` come cuore dell'applicazione, esempio reale: i moduli `admin`, `courses`, `quiz`, `home`; ogni feature con le proprie `components/`, `repositories/`, `hooks/`; vantaggi di questo approccio rispetto a una struttura "per tipo" (tutti i componenti insieme, tutti gli hook insieme…).
* **Al termine saprai:** progettare la struttura a cartelle di una nuova funzionalità seguendo un approccio feature-driven.

---

<a id="modulo-13"></a>
[🔙 Torna all'indice](#indice)

### Modulo 13: Ports & Adapters — Disaccoppiare Logica e Infrastrutture
Il pattern architetturale che rende un modulo (es. l'autenticazione) indipendente dalla tecnologia concreta che usa.
* **Argomenti:** cosa sono le interfacce/*ports* (`IUserRepository`, `ITokenService`, `IPasswordService`, `ICookieService`), cosa sono gli *adapters*/infrastructure (`SupabaseUserRepository`, `BcryptPasswordService`, `JoseTokenService`, `ResendEmailService`), i servizi di orchestrazione (`AuthService`), perché questo pattern permette di sostituire una tecnologia (es. cambiare da Resend a un altro provider email) senza toccare la logica di business.
* **Al termine saprai:** progettare un modulo secondo il pattern Ports & Adapters, separando contratti (interfacce) da implementazioni concrete.

---

<a id="modulo-14"></a>
[🔙 Torna all'indice](#indice)

### Modulo 14: Repository Pattern con Supabase — Il Data Access Layer
Come isolare tutte le query al database dietro un'interfaccia pulita.
* **Argomenti:** il pattern Repository, esempio reale (`SupabaseCourseRepository.ts`), vantaggi in termini di testabilità e manutenzione, custom hook (`useCourses.ts`) come livello di consumo dei dati lato client, gestione degli errori nelle query.
* **Al termine saprai:** costruire un repository che isola l'accesso ai dati di Supabase, esponendo un'interfaccia pulita al resto dell'applicazione.

---

<a id="modulo-15"></a>
[🔙 Torna all'indice](#indice)

### Modulo 15: Form, Validazione e Server Actions Avanzate
Gestire dati inseriti dall'utente in modo robusto, dal client al database.
* **Argomenti:** form controllati in React, validazione degli schemi (es. `resourceSchema.ts`), gestione di errori di validazione lato server, upload di documenti (`docs/upload/route.ts`), pattern comune "form → Server Action → repository → database".
* **Al termine saprai:** costruire un form completo, validato sia lato client sia lato server, collegato a una Server Action che scrive in modo sicuro sul database.

---

### LIVELLO ESPERTO

<a id="modulo-16"></a>
[🔙 Torna all'indice](#indice)

### Modulo 16: Parsing di Contenuti — Dal Markdown ai Quiz Strutturati
Una delle funzionalità più originali della piattaforma: trasformare testo in dati strutturati.
* **Argomenti:** il dominio dei quiz (`Question.ts`, `Quiz.ts`, `QuizAttempt.ts`, `QuizReview.ts`), il parser specializzato (`quizParser.ts`) che legge file Markdown e li converte in oggetti pronti per il database, il flusso admin → correzione → analytics, dashboard differenziate per docente e studente.
* **Al termine saprai:** progettare un parser che trasforma contenuti testuali in strutture dati tipizzate, pronte per essere salvate e interrogate.

---

<a id="modulo-17"></a>
[🔙 Torna all'indice](#indice)

### Modulo 17: Dashboard, Analytics e Data Visualization
Trasformare i dati grezzi della piattaforma in informazioni utili per l'admin.
* **Argomenti:** aggregazione dati lato server, componenti di visualizzazione (`BarChartCard`, `DonutChartCard`, `StudentsByClassChart`), il sistema di tracking della navigazione (`PageTracker`, `trackingService`), invio massivo di comunicazioni (`MailBulkSender`, template editor).
* **Al termine saprai:** costruire una dashboard che aggrega dati reali e li presenta con grafici chiari e significativi.

---

<a id="modulo-18"></a>
[🔙 Torna all'indice](#indice)

### Modulo 18: Deploy, SEO e Performance — Vercel, Sitemap e Ottimizzazione
Portare l'applicazione dal computer dello sviluppatore al mondo reale.
* **Argomenti:** deploy su Vercel, variabili d'ambiente in produzione, generazione dinamica di `sitemap.ts` e `robots.ts` per la SEO, logging applicativo (`logger.ts`, `app.log`), best practice di performance (immagini, caching, rendering ottimizzato).
* **Al termine saprai:** portare in produzione un'applicazione Next.js con attenzione a SEO, sicurezza delle variabili d'ambiente e performance.

---

<a id="modulo-19"></a>
[🔙 Torna all'indice](#indice)

### Modulo 19: Project Work Finale — Costruisci la Tua Mini-Piattaforma E-Learning
Il momento in cui tutte le competenze del corso si uniscono in un'applicazione reale, funzionante da capo a fondo.
* **Argomenti:** progettazione di una mini-piattaforma con autenticazione, catalogo contenuti e un modulo funzionale a scelta (quiz, dashboard o sistema di risorse), applicazione dei pattern Clean Architecture/Ports & Adapters/Repository su piccola scala, deploy finale su Vercel.
* **Al termine saprai:** partire da un'idea di applicazione full-stack, progettarne l'architettura e costruirla con Next.js, TypeScript e Supabase, da presentare come progetto di portfolio.

---

## 🛠️ La Nostra Metodologia Formativa

In **GCProf Academy** non crediamo nelle lezioni passive. Ogni modulo segue una **struttura didattica coerente**, pensata per essere affrontata in autonomia o guidata dal docente:

*Introduzione ➔ Obiettivi ➔ Prerequisiti ➔ Lezione teorica ➔ Esempi commentati (codice reale, tratto e adattato dalla piattaforma GCPROF-AI-ACADEMY.COM) ➔ Laboratorio Pratico ➔ Best Practice ➔ Errori Comuni ➔ Quiz ➔ Riepilogo ➔ Glossario*

### Tipologie di Lezione Interattive
Le lezioni sono unità indipendenti e multimediali composte da:
* 📖 **Guida Teorica Markdown:** con indice navigabile integrato, leggibile sia su Google Colab che su Google Docs.
* 💻 **Esempi Commentati in TypeScript/TSX:** codice reale, ogni riga chiave spiegata nei commenti.
* 🧪 **Laboratorio Pratico:** esercizi progressivi, dal livello base a quello avanzato, su ogni modulo.
* 🧩 **Quiz:** verifica immediata delle competenze acquisite, modulo per modulo.

---

## 🏆 Project Work e Valutazione Finale

Alla fine di ogni livello, una sfida concreta mette alla prova le competenze acquisite:

* **🏁 Fine Livello Base:** una piccola applicazione Next.js con più pagine, layout condiviso e routing dinamico, tipizzata correttamente con TypeScript.
* **🏁 Fine Livello Intermedio:** un'applicazione collegata a Supabase con autenticazione funzionante, form validati e almeno una Server Action.
* **🏁 Fine Livello Avanzato:** un modulo applicativo organizzato secondo Clean Architecture, con repository e almeno un'interfaccia (port) disaccoppiata dalla sua implementazione concreta.
* **🏁 Fine Livello Esperto — Project Work Finale:** una mini-piattaforma e-learning completa, con autenticazione, contenuti e un modulo funzionale a scelta, deployata su Vercel.

---

### ⚛️ Pronto a costruire la tua prima, vera piattaforma full-stack?

Grazie all'uso come caso di studio della piattaforma GCPROF-AI-ACADEMY.COM — con la sua dashboard admin, il tracciamento Supabase e i quiz automatizzati — questo non è solo un corso su un framework, ma il tuo percorso guidato per capire come si progetta e si costruisce davvero un'applicazione web moderna.

**[👉 Iscriviti ora e inizia il Livello Base!]**

[🔙 Torna all'indice](#indice)