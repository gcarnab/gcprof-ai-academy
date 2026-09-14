# ⚛️ Modulo 1 — Introduzione a Next.js e all'Ecosistema React Moderno

- **Corso:** Next.js Master — Dall'App Router alla Piattaforma Full-Stack
- **Piattaforma:** GCProf Academy
- **Livello:** 🟢 Base (Fase 1 — Le Fondamenta di Next.js e TypeScript)
- **Target:** Studenti del quinto anno (indirizzo tecnico/informatico), programmatori esperti in transizione verso il full-stack moderno, docenti di informatica
- **Prerequisiti:** Conoscenza di base di HTML, CSS e JavaScript (variabili, funzioni, cicli). Non serve conoscere già React
- **Obiettivo Didattico:** Comprendere cos'è React e perché Next.js nasce sopra di esso, riconoscere cosa aggiunge concretamente al lavoro di uno sviluppatore, e creare ed eseguire il tuo primo progetto Next.js.

---

<a id="indice"></a>
# 📑 Indice del Modulo 1

1. [Capitolo 1 — Cos'è React e il Concetto di Componente](#capitolo-1)
2. [Capitolo 2 — Perché React da Solo Non Basta per un'App di Produzione](#capitolo-2)
3. [Capitolo 3 — Cosa Aggiunge Next.js: Panoramica delle Funzionalità Chiave](#capitolo-3)
4. [Capitolo 4 — L'Ecosistema Next.js: Vercel, Turbopack e gli Strumenti di Sviluppo](#capitolo-4)
5. [Capitolo 5 — Installare il Primo Progetto con `create-next-app`](#capitolo-5)
6. [Capitolo 6 — Esplorare la Struttura Generata e il Tuo Primo "Hello World"](#capitolo-6)
7. [Capitolo 7 — Errori Comuni per Chi Inizia con Next.js](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è React e il Concetto di Componente

Prima di parlare di Next.js, dobbiamo fare un passo indietro: Next.js **non è un linguaggio a sé** e non sostituisce React, lo **estende**. Per capire Next.js dobbiamo prima capire, almeno nelle sue idee di base, React.

**React** è una libreria JavaScript (creata da Meta/Facebook) per costruire interfacce utente. La sua idea centrale è semplice da enunciare ma potentissima nella pratica: **un'interfaccia è una composizione di componenti**, e ogni componente è responsabile di una piccola porzione di schermo, riutilizzabile ovunque serva.

### 🧩 L'Analogia dei Mattoncini

```
   PAGINA WEB COMPLETA
   ┌─────────────────────────────────┐
   │  <Navbar />                      │  ← componente riutilizzato su ogni pagina
   ├─────────────────────────────────┤
   │  <CourseCard />  <CourseCard />  │  ← stesso componente, dati diversi
   │  <CourseCard />  <CourseCard />  │
   ├─────────────────────────────────┤
   │  <Footer />                      │  ← componente riutilizzato su ogni pagina
   └─────────────────────────────────┘

   Non scriviamo HTML ripetuto: componiamo blocchi riutilizzabili,
   ciascuno con la propria logica e il proprio stato.
```

Un componente React è, tecnicamente, una **funzione JavaScript che restituisce dell'interfaccia** descritta con una sintassi chiamata **JSX** (JavaScript + XML): un modo di scrivere HTML direttamente dentro il codice JavaScript/TypeScript.

```tsx
// ==================== ESEMPIO 1.1: IL TUO PRIMO COMPONENTE REACT ====================
/*
 * Un componente React è una funzione che restituisce JSX.
 * Il nome del componente inizia sempre con la lettera MAIUSCOLA
 * (convenzione obbligatoria: React distingue così un componente
 * da un normale tag HTML).
 */

function CourseCard() {
  // "return" restituisce la porzione di interfaccia da mostrare
  return (
    <div className="course-card">
      <h2>Python Master</h2>
      <p>Dalle basi al mondo reale.</p>
    </div>
  );
}
```

Il vantaggio immediato: se ho bisogno di mostrare 20 corsi diversi, non scrivo 20 volte lo stesso HTML — riutilizzo `<CourseCard />` passandogli dati diversi tramite le **props** (i "parametri" di un componente).

```tsx
// ==================== ESEMPIO 1.2: PROPS — PASSARE DATI A UN COMPONENTE ====================
/*
 * Le props sono l'equivalente dei parametri di una funzione: permettono
 * di riutilizzare lo STESSO componente con dati DIVERSI ogni volta.
 * In TypeScript, tipizziamo sempre la forma delle props con un'interface.
 */

interface CourseCardProps {
  titolo: string;
  descrizione: string;
}

function CourseCard({ titolo, descrizione }: CourseCardProps) {
  return (
    <div className="course-card">
      <h2>{titolo}</h2>       {/* le graffe {} inseriscono una variabile JS dentro il JSX */}
      <p>{descrizione}</p>
    </div>
  );
}

// Uso del componente, con dati diversi ogni volta:
// <CourseCard titolo="Python Master" descrizione="Dalle basi al mondo reale." />
// <CourseCard titolo="OOP Explorer" descrizione="Programmazione ad oggetti con Python e Java." />
```

💡 **Perché ti serve:** ogni singolo file `.tsx` che incontrerai in un progetto Next.js reale (compresi quelli della piattaforma GCPROF Academy, come `Hero.tsx`, `Navbar.tsx` o `CourseCard`-like components) è, alla base, esattamente questo pattern: una funzione che riceve props e restituisce JSX.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Perché React da Solo Non Basta per un'App di Produzione

React risolve benissimo un problema: **come organizzare l'interfaccia in componenti riutilizzabili**. Ma un'applicazione web reale, come una piattaforma e-learning con centinaia di studenti, ha bisogno di molto altro — cose che React, di per sé, **non fornisce**.

### 🕳️ I Vuoti che React Lascia Aperti

| Esigenza reale | React "puro" cosa fa? |
| :--- | :--- |
| **Routing** (più pagine, URL diversi) | Niente: serve una libreria esterna (es. React Router) configurata a mano |
| **Rendering lato server** (SEO, velocità al primo caricamento) | Niente: di default React renderizza tutto nel browser dell'utente (Client-Side Rendering) |
| **Organizzazione dei file** | Nessuna convenzione: ogni team/progetto inventa la propria struttura |
| **Ottimizzazione di immagini, font, script** | Nessuna: va gestita manualmente o con tool aggiuntivi |
| **API/backend** | Niente: React è solo frontend, serve un server separato |

Il problema del solo Client-Side Rendering merita un esempio concreto: quando un utente apre una pagina costruita con React "puro", il browser riceve inizialmente un HTML quasi vuoto, poi scarica ed esegue tutto il JavaScript, e **solo a quel punto** l'interfaccia compare. Per un motore di ricerca che analizza la pagina, o per un utente con una connessione lenta, questo è un problema reale.

```
   REACT "PURO" (Client-Side Rendering)          NEXT.JS (Server-Side Rendering)
   ─────────────────────────────────────         ─────────────────────────────────
   1. Browser riceve HTML quasi vuoto            1. Browser riceve HTML GIÀ COMPLETO
   2. Scarica ed esegue tutto il JS               2. La pagina è visibile SUBITO
   3. React "disegna" la pagina                   3. React si "aggancia" dopo, per
   4. SOLO ORA la pagina è visibile                  rendere la pagina interattiva
   ⏱️ Utente vede una pagina bianca per un po'    ⏱️ Utente vede contenuto immediato
```

Ecco perché è nato **Next.js**: non per sostituire React, ma per colmare esattamente questi vuoti, fornendo in un unico framework tutto ciò che serve per portare un'applicazione React in produzione, in modo standardizzato e senza dover assemblare a mano dieci librerie diverse.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Cosa Aggiunge Next.js: Panoramica delle Funzionalità Chiave

Next.js è descritto spesso come un **"framework full-stack basato su React"**: prende React come motore per l'interfaccia e ci costruisce sopra tutto ciò che serve per un'applicazione reale.

### 🎁 Le Funzionalità Principali di Next.js

| Funzionalità | Cosa risolve concretamente |
| :--- | :--- |
| 🗂️ **File-system Routing** (App Router) | Ogni cartella dentro `app/` diventa automaticamente una rotta — niente configurazione manuale del routing |
| 🖥️ **Rendering ibrido** (Server + Client Component) | Il server prepara l'HTML iniziale già pronto; il client si occupa solo dell'interattività |
| ⚡ **Ottimizzazioni automatiche** | Immagini, font e script vengono ottimizzati "di serie", senza configurazione |
| 🔌 **API Routes / Server Actions** | Si possono scrivere endpoint di backend nello stesso progetto, senza un server separato |
| 📦 **Convenzioni chiare** | Ogni progetto Next.js condivide la stessa struttura di base (`app/`, `components/`, ecc.), rendendo più facile entrare in un progetto altrui |

Un modo utile di pensarci: **React ti dà i mattoncini (i componenti); Next.js ti dà la casa già progettata** — fondamenta, impianto elettrico, tetto — dentro cui quei mattoncini si incastrano secondo regole precise.

Non è un caso che la piattaforma che studieremo come caso reale in questo corso, **GCPROF-AI-ACADEMY.COM**, sia costruita esattamente su questa combinazione: **Next.js (App Router) + TypeScript + Tailwind CSS + Supabase**. Nei prossimi moduli entreremo via via più a fondo in ciascuna di queste funzionalità; per ora ci basta avere la mappa d'insieme.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — L'Ecosistema Next.js: Vercel, Turbopack e gli Strumenti di Sviluppo

Next.js non vive da solo: è circondato da un ecosistema di strumenti pensati per rendere lo sviluppo e la messa in produzione più semplici.

### 🌐 Vercel — La Piattaforma "Naturale" per il Deploy

**Vercel** è l'azienda che sviluppa Next.js, e offre anche la piattaforma di hosting più diretta per pubblicarlo online. Il collegamento tra i due non è casuale: un'app Next.js su Vercel sfrutta automaticamente molte ottimizzazioni pensate su misura (build veloci, distribuzione globale dei contenuti, deploy automatico ad ogni modifica del codice).

*Nota:* Next.js **non è vincolato** a Vercel — può essere ospitato anche su altri servizi — ma Vercel resta l'ambiente in cui l'esperienza è più immediata, ed è quello che useremo come riferimento in questo corso (lo approfondiremo nel Modulo 18).

### 🚀 Turbopack — Il Motore di Build di Nuova Generazione

Ogni volta che salvi un file durante lo sviluppo, qualcosa deve ricompilare il tuo codice e aggiornare la pagina nel browser. **Turbopack** è il bundler (scritto in Rust) che Next.js usa per farlo in modo molto più veloce rispetto agli strumenti precedenti, specialmente su progetti grandi con centinaia di file — esattamente lo scenario di una piattaforma e-learning con decine di corsi e funzionalità.

### 🛠️ Gli Altri Strumenti dell'Ecosistema

| Strumento | Ruolo nell'ecosistema |
| :--- | :--- |
| **ESLint** | Analizza il codice e segnala errori/incoerenze prima ancora di eseguirlo |
| **npm / npx** | Gestore di pacchetti: installa librerie esterne e comandi come `create-next-app` |
| **VS Code** | Editor più diffuso per Next.js/TypeScript, grazie al supporto nativo ai tipi |
| **Git/GitHub** | Versionamento del codice, indispensabile per lavorare in team e per il deploy automatico su Vercel |

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Installare il Primo Progetto con `create-next-app`

È il momento di passare dalla teoria alla pratica: creiamo il nostro primo progetto Next.js.

### ✅ Prerequisiti Tecnici

Prima di iniziare, serve avere installato **Node.js** (versione 18 o superiore), che include anche `npm`, il gestore di pacchetti che useremo.

```bash
# Verifica che Node.js e npm siano installati correttamente
node --version
npm --version
```

### 📦 Creazione del Progetto

```bash
# ==================== COMANDO: CREAZIONE DI UN NUOVO PROGETTO NEXT.JS ====================
# npx scarica ed esegue lo strumento ufficiale "create-next-app", senza doverlo
# installare in modo permanente sul computer.

npx create-next-app@latest gcprof-demo
```

Durante l'esecuzione, il tool farà alcune domande di configurazione: ecco cosa significano e quale risposta useremo in questo corso (per restare coerenti con l'architettura di GCPROF-AI-ACADEMY.COM).

| Domanda | Risposta consigliata per questo corso | Perché |
| :--- | :--- | :--- |
| Would you like to use **TypeScript**? | ✅ Sì | Type safety fin dal primo giorno (Modulo 2) |
| Would you like to use **ESLint**? | ✅ Sì | Qualità del codice fin dall'inizio |
| Would you like to use **Tailwind CSS**? | ✅ Sì | Lo useremo per lo styling (Modulo 6) |
| Would you like your code inside a `src/` directory? | A scelta (in questo corso: No, `app/` in root) | Coerente con la struttura del progetto reale (M1 dell'indice piattaforma) |
| Would you like to use **App Router**? | ✅ Sì (è l'unica opzione nelle versioni recenti) | È il routing moderno che studieremo in tutto il corso |
| Would you like to use **Turbopack** for `next dev`? | ✅ Sì | Sviluppo più veloce |

Al termine, entriamo nella cartella creata e avviamo il server di sviluppo:

```bash
# ==================== COMANDO: AVVIO DEL SERVER DI SVILUPPO ====================
cd gcprof-demo

# "dev" avvia un server locale che si aggiorna automaticamente
# ogni volta che salviamo una modifica al codice (hot reload)
npm run dev
```

Aprendo il browser su `http://localhost:3000`, vedrai la pagina di benvenuto generata automaticamente da Next.js: il tuo primo progetto è online, in locale, in meno di un minuto.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Esplorare la Struttura Generata e il Tuo Primo "Hello World"

Apriamo ora il progetto in un editor di codice e osserviamo cosa `create-next-app` ha generato per noi.

```
gcprof-demo/
├── app/
│   ├── favicon.ico
│   ├── globals.css        ← stili globali (con le direttive Tailwind)
│   ├── layout.tsx         ← layout condiviso da TUTTE le pagine
│   └── page.tsx           ← la Home Page (rotta "/")
├── public/                ← file statici (immagini, icone…)
├── node_modules/          ← librerie installate (non si modifica mai a mano)
├── package.json           ← dipendenze e script del progetto
├── tsconfig.json          ← configurazione di TypeScript
├── next.config.ts         ← configurazione di Next.js
└── eslint.config.mjs      ← regole di linting
```

Questa struttura minimale è, in scala ridotta, esattamente la stessa logica che troveremo — molto più ricca — nella piattaforma reale GCPROF-AI-ACADEMY.COM, che approfondiremo nel Modulo 3.

Modifichiamo ora `app/page.tsx` per scrivere il nostro primo "Hello World" personalizzato:

```tsx
// ==================== ESEMPIO 1.3: LA TUA PRIMA PAGINA NEXT.JS ====================
/*
 * Questo file, per convenzione, rappresenta la pagina raggiungibile
 * all'indirizzo "/" (la Home). Non serve configurare nessuna rotta:
 * la posizione del file DENTRO app/ definisce automaticamente l'URL.
 *
 * "export default" indica che questa è l'UNICA cosa che questo file
 * esporta: il componente-pagina che Next.js deve renderizzare.
 */

export default function Home() {
  return (
    <main>
      <h1>Ciao, GCProf Academy! 🎓</h1>
      <p>Questo è il mio primo progetto Next.js.</p>
    </main>
  );
}
```

Salvando il file, grazie a Turbopack e all'hot reload, il browser si aggiorna **da solo**, senza bisogno di ricaricare manualmente la pagina: è uno dei motivi per cui lo sviluppo con Next.js risulta così immediato fin dal primo minuto.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Errori Comuni per Chi Inizia con Next.js

| Errore | Causa tipica | Come riconoscerlo/evitarlo |
| :--- | :--- | :--- |
| Confondere `export default` con `export` semplice | Ogni file `page.tsx` o `layout.tsx` **deve** avere un `export default`: è la convenzione che Next.js si aspetta | Se la pagina risulta vuota o dà errore, controlla prima questo dettaglio |
| Nominare un file `Page.tsx` invece di `page.tsx` | Next.js richiede nomi di file **in minuscolo** per le convenzioni speciali (`page`, `layout`, ecc.) | Il file system fa distinzione tra maiuscole/minuscole su alcuni sistemi operativi (Linux, e i server di produzione) |
| Dimenticare che il componente deve iniziare con la **maiuscola** | `function home()` non verrà riconosciuto come componente da JSX | React tratta i nomi minuscoli come tag HTML nativi (es. `<div>`), non come componenti |
| Modificare `package.json` a mano in modo errato | Cancellare virgole o parentesi rompe l'intero progetto | Preferire sempre `npm install <pacchetto>` invece di scrivere a mano le dipendenze |

⚠️ **Attenzione:** se il server di sviluppo (`npm run dev`) non si avvia, il primo passo è sempre leggere con attenzione il messaggio di errore nel terminale: Next.js, come Python, restituisce quasi sempre un'indicazione precisa di file e riga del problema.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 1

1. **React** è una libreria per costruire interfacce a componenti: funzioni che ricevono props e restituiscono JSX.
2. React da solo **non gestisce** routing, rendering lato server, ottimizzazioni e backend: sono vuoti che un'app di produzione deve colmare in qualche modo.
3. **Next.js** è un framework full-stack costruito sopra React che fornisce, con convenzioni standard, tutto ciò che manca: routing su file system, rendering ibrido server/client, ottimizzazioni automatiche, API integrate.
4. **Vercel** è la piattaforma di deploy "naturale" per Next.js (ma non l'unica); **Turbopack** è il motore che rende lo sviluppo veloce anche su progetti grandi.
5. `npx create-next-app@latest` crea un nuovo progetto Next.js con TypeScript, ESLint, Tailwind CSS e App Router già configurati.
6. `npm run dev` avvia il server di sviluppo locale con hot reload automatico.

---

### 🧪 Laboratorio Pratico: "La Tua Prima Home Page"

**Obiettivo:** Creare un progetto Next.js da zero e personalizzare la sua Home Page.

1. Installa un nuovo progetto con `npx create-next-app@latest modulo1-nometuo`, scegliendo TypeScript, ESLint, Tailwind CSS e App Router.
2. Avvia il server di sviluppo con `npm run dev` e verifica che la pagina di default sia visibile su `http://localhost:3000`.
3. Modifica `app/page.tsx` seguendo la struttura dell'Esempio 1.3: sostituisci il contenuto con un titolo (il tuo nome o il nome del tuo progetto) e un breve paragrafo che spieghi cosa vuoi imparare in questo corso.
4. Crea un secondo componente in un nuovo file `app/CardBenvenuto.tsx`, sul modello dell'Esempio 1.2 (una funzione che riceve props tipizzate con un'`interface` e restituisce JSX), e importalo/usalo dentro `app/page.tsx`.
5. **Sfida finale:** prova volontariamente a rinominare il file `page.tsx` in `Page.tsx` (con la maiuscola), esegui di nuovo il progetto e osserva cosa succede; poi ripristina il nome corretto.

*Suggerimento:* riusa esattamente la struttura degli Esempi 1.1, 1.2 e 1.3 di questo modulo, personalizzando testi e nomi.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Qual è la relazione corretta tra React e Next.js?
- A) Sono due linguaggi di programmazione alternativi tra loro
- B) Next.js è un framework che estende React aggiungendo routing, rendering server-side e altre funzionalità
- C) React sostituisce completamente Next.js nelle versioni più recenti
- D) Next.js è solo un tema grafico per applicazioni React

**Domanda 2:** Cosa restituisce, tipicamente, un componente React?
- A) Un file CSS
- B) Una stringa di puro testo senza formattazione
- C) JSX, cioè una descrizione dell'interfaccia da mostrare
- D) Una query al database

**Domanda 3:** Quale problema del solo "React puro" risolve principalmente il rendering lato server di Next.js?
- A) La gestione dei tipi TypeScript
- B) Il fatto che il browser riceverebbe inizialmente una pagina quasi vuota, prima che React la "disegni"
- C) L'installazione di Node.js
- D) La scrittura dei file CSS

**Domanda 4:** Quale comando crea un nuovo progetto Next.js?
- A) `npm start next`
- B) `node create-next.js`
- C) `npx create-next-app@latest`
- D) `next install app`

**Domanda 5:** Perché il file della Home Page deve chiamarsi esattamente `page.tsx` (minuscolo)?
- A) È solo una preferenza stilistica, senza effetti pratici
- B) Next.js riconosce questo nome come convenzione speciale per definire una rotta; un nome diverso o con maiuscole non verrebbe riconosciuto allo stesso modo
- C) I file TypeScript devono sempre essere minuscoli, senza eccezioni
- D) Serve per l'ottimizzazione delle immagini

---

[🔙 Torna all'indice](#indice)