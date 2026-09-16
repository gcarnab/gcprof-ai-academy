# 🔷 Modulo 2 — TypeScript Essenziale: Tipi, Interfacce e Type Safety

- **Corso:** Next.js Master — Dall'App Router alla Piattaforma Full-Stack
- **Piattaforma:** GCProf Academy
- **Livello:** 🟢 Base (Fase 1 — Le Fondamenta di Next.js e TypeScript)
- **Target:** Studenti del quinto anno (indirizzo tecnico/informatico), programmatori esperti in transizione verso il full-stack moderno, docenti di informatica
- **Prerequisiti:** Modulo 1 (concetto di componente React e primo progetto Next.js), buona conoscenza di JavaScript di base
- **Obiettivo Didattico:** Capire perché un progetto professionale sceglie TypeScript invece del solo JavaScript, e saper tipizzare correttamente variabili, funzioni e componenti React con `interface`, `type` e i primi generics.

---

<a id="indice"></a>
# 📑 Indice del Modulo 2

1. [Capitolo 1 — Perché TypeScript e Non Solo JavaScript](#capitolo-1)
2. [Capitolo 2 — Tipi Primitivi e Tipi di Base](#capitolo-2)
3. [Capitolo 3 — Tipi Custom: Union, Array e Oggetti](#capitolo-3)
4. [Capitolo 4 — `interface` e `type`: Definire la Forma dei Dati](#capitolo-4)
5. [Capitolo 5 — Tipizzare Funzioni e Props dei Componenti](#capitolo-5)
6. [Capitolo 6 — I File `*.types.ts` e i Tipi Generati dal Database](#capitolo-6)
7. [Capitolo 7 — Generics di Base](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Perché TypeScript e Non Solo JavaScript

Nel Modulo 1 abbiamo già scritto codice `.tsx` senza soffermarci troppo sul "perché". È il momento di chiarirlo: **TypeScript è JavaScript, con in più un sistema di tipi**. Ogni file `.ts`/`.tsx` valido viene infine "compilato" (più precisamente: trasformato) in normale JavaScript, quello che il browser esegue davvero.

La domanda vera allora è: **perché aggiungere questo passaggio in più?**

### 🐞 Il Problema che TypeScript Risolve

In JavaScript "puro", un errore come questo si scopre solo **eseguendo** il programma — magari con l'utente reale davanti allo schermo:

```javascript
// JavaScript puro: nessun controllo finché il codice non viene eseguito
function calcolaMediaVoti(voti) {
  return voti.reduce((somma, voto) => somma + voto, 0) / voti.length;
}

calcolaMediaVoti("otto, sette, nove"); // 💥 Errore a runtime: non è un array!
// L'errore si scopre SOLO quando questa riga viene effettivamente eseguita.
```

Con TypeScript, lo stesso errore viene segnalato **mentre scrivi il codice**, direttamente nell'editor, prima ancora di premere "salva":

```typescript
// ==================== ESEMPIO 2.1: LO STESSO ERRORE, MA IN TYPESCRIPT ====================
/*
 * ": number[]" dichiara che il parametro "voti" DEVE essere
 * un array di numeri. Se qualcuno prova a passare una stringa,
 * l'editor segnala l'errore SUBITO, senza dover eseguire nulla.
 */

function calcolaMediaVoti(voti: number[]): number {
  return voti.reduce((somma, voto) => somma + voto, 0) / voti.length;
}

calcolaMediaVoti([8, 7, 9]);          // ✅ Corretto
// calcolaMediaVoti("otto, sette, nove"); // ❌ Errore SEGNALATO SUBITO dall'editor
```

### 📊 JavaScript vs TypeScript a Confronto

| Caratteristica | JavaScript | TypeScript |
| :--- | :--- | :--- |
| Controllo dei tipi | Nessuno (a runtime, quando è "troppo tardi") | In fase di scrittura del codice (compile-time) |
| Autocompletamento nell'editor | Limitato | Molto preciso, basato sui tipi reali |
| Documentazione del codice | Manuale (commenti) | I tipi stessi sono documentazione sempre aggiornata |
| Adatto a progetti grandi/in team | Rischioso senza disciplina | Pensato apposta per questo scenario |

💡 **Perché ti serve:** in un progetto come GCPROF-AI-ACADEMY.COM, con decine di componenti, funzioni e chiamate al database che si scambiano dati continuamente, TypeScript è ciò che permette a un team (o anche a te da solo, dopo qualche mese) di modificare il codice **con fiducia**, sapendo che l'editor segnalerà subito se qualcosa non torna.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Tipi Primitivi e Tipi di Base

Partiamo dai mattoni più semplici: i tipi primitivi, che probabilmente riconoscerai subito da JavaScript, ma che ora **dichiariamo esplicitamente**.

```typescript
// ==================== ESEMPIO 2.2: TIPI PRIMITIVI ====================

let nomeCorso: string = "Next.js Master";     // testo
let numeroModuli: number = 19;                // numeri interi E decimali (un solo tipo "number")
let corsoAttivo: boolean = true;               // vero/falso
let dataPubblicazione: Date = new Date();      // oggetto Data

// "let" può cambiare valore, ma NON tipo: questa riga darebbe errore
// nomeCorso = 42; // ❌ Errore: non puoi assegnare un "number" a una variabile "string"
```

### 🧭 Tipi Speciali: `any`, `unknown`, `null`, `undefined`, `void`

| Tipo | Significato | Quando usarlo |
| :--- | :--- | :--- |
| `any` | "Disattiva" il controllo dei tipi per quella variabile | **Da evitare quasi sempre**: annulla i vantaggi di TypeScript |
| `unknown` | Come `any`, ma TypeScript ti obbliga a verificare il tipo prima di usarlo | Alternativa sicura ad `any`, per dati davvero incerti (es. risposta di un'API esterna) |
| `null` | Valore "assente" esplicitamente assegnato | Quando un valore può mancare di proposito (es. utente non ancora loggato) |
| `undefined` | Valore "non ancora assegnato" | Stato di default di una variabile dichiarata ma non inizializzata |
| `void` | "Questa funzione non restituisce nulla" | Funzioni che eseguono un'azione senza `return` (es. stampare un log) |

⚠️ **Attenzione:** nei progetti reali, l'uso di `any` è spesso vietato dalle regole di ESLint (lo vedremo nel Modulo 3), proprio perché reintroduce di nascosto tutti i problemi che TypeScript dovrebbe evitare.

```typescript
// ==================== ESEMPIO 2.3: void, null E undefined IN AZIONE ====================

function stampaBenvenuto(nome: string): void {
  console.log(`Benvenuto, ${nome}!`); // nessun "return": il tipo è void
}

let utenteLoggato: string | null = null; // può essere una stringa OPPURE null
utenteLoggato = "Giuseppe";               // ora è valorizzato
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Tipi Custom: Union, Array e Oggetti

Oltre ai tipi primitivi, TypeScript permette di costruire **tipi su misura**, che descrivono esattamente la forma dei dati della tua applicazione.

### 🔀 Union Types — "Questo Oppure Quello"

```typescript
// ==================== ESEMPIO 2.4: UNION TYPE ====================
/*
 * Il simbolo "|" (pipe) significa "oppure": il ruolo può essere
 * SOLO una di queste tre stringhe esatte, nient'altro.
 */

type RuoloUtente = "admin" | "docente" | "studente";

function verificaAccessoAdmin(ruolo: RuoloUtente): boolean {
  return ruolo === "admin";
}

verificaAccessoAdmin("docente");   // ✅ valore ammesso
// verificaAccessoAdmin("ospite"); // ❌ Errore: "ospite" non è uno dei valori consentiti
```

### 📋 Array Tipizzati

```typescript
// ==================== ESEMPIO 2.5: ARRAY TIPIZZATI ====================

let voti: number[] = [8, 7, 9, 6];                 // array di numeri
let corsi: string[] = ["Python Master", "OOP Explorer"]; // array di stringhe
let ruoli: RuoloUtente[] = ["admin", "studente"];  // array del tipo custom definito sopra
```

### 🧱 Oggetti Tipizzati "al Volo"

```typescript
// ==================== ESEMPIO 2.6: FORMA DI UN OGGETTO TIPIZZATA "AL VOLO" ====================

let corso: { titolo: string; moduli: number; gratuito: boolean } = {
  titolo: "Next.js Master",
  moduli: 19,
  gratuito: false,
};
```

Questa sintassi funziona, ma scritta ripetutamente diventa presto scomoda e difficile da riutilizzare: nel prossimo capitolo vedremo lo strumento pensato apposta per questo — l'`interface`.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — `interface` e `type`: Definire la Forma dei Dati

Invece di ripetere ogni volta la forma di un oggetto "al volo", possiamo **darle un nome** e riutilizzarla ovunque. TypeScript offre due strumenti molto simili per farlo: `interface` e `type`.

```typescript
// ==================== ESEMPIO 2.7: INTERFACE — DEFINIRE LA "FORMA" DI UN CORSO ====================
/*
 * Un'interface descrive quali proprietà deve avere un oggetto,
 * e di che tipo devono essere. Qualsiasi oggetto che rispetti
 * questa "forma" può essere considerato di tipo Corso.
 */

interface Corso {
  titolo: string;
  moduli: number;
  gratuito: boolean;
  descrizione?: string; // il "?" rende la proprietà OPZIONALE
}

const corsoPython: Corso = {
  titolo: "Python Master",
  moduli: 16,
  gratuito: false,
  // "descrizione" può essere omessa, perché è opzionale
};
```

### 🆚 `interface` vs `type`: Quando Usare l'Uno o l'Altro

| Caratteristica | `interface` | `type` |
| :--- | :--- | :--- |
| Descrivere la forma di un oggetto | ✅ Uso naturale e più diffuso | ✅ Funziona altrettanto bene |
| Union types (`"a" \| "b"`) | ❌ Non supportato direttamente | ✅ Pensato apposta per questo |
| Estendere/unire più definizioni | `extends` | `&` (intersection) |
| Convenzione più comune in Next.js/React | Props dei componenti | Alias di tipi semplici, union types |

```typescript
// ==================== ESEMPIO 2.8: ESTENDERE UN'INTERFACE ====================

interface CorsoBase {
  titolo: string;
  moduli: number;
}

// "extends" eredita tutte le proprietà di CorsoBase e ne aggiunge di nuove
interface CorsoPremium extends CorsoBase {
  prezzo: number;
  certificatoFinale: boolean;
}

const corsoNextJs: CorsoPremium = {
  titolo: "Next.js Master",
  moduli: 19,
  prezzo: 89,
  certificatoFinale: true,
};
```

Nella pratica quotidiana su Next.js — e lo vedremo costantemente nei prossimi moduli — la convenzione più diffusa è: **`interface` per la forma di oggetti e props**, **`type` per union types e alias più semplici**. Non è una regola rigida, ma è quella che troverai nella maggior parte dei progetti reali, GCPROF-AI-ACADEMY.COM incluso.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Tipizzare Funzioni e Props dei Componenti

Ricordi le props del Modulo 1? È il momento di collegare i due mondi: TypeScript applicato **esattamente** ai componenti React che già conosci.

```typescript
// ==================== ESEMPIO 2.9: TIPIZZARE UNA FUNZIONE "NORMALE" ====================
/*
 * Sintassi: function nome(parametro: Tipo): TipoDiRitorno
 */

function calcolaPercentualeCompletamento(
  lezioniCompletate: number,
  lezioniTotali: number
): number {
  return Math.round((lezioniCompletate / lezioniTotali) * 100);
}

calcolaPercentualeCompletamento(8, 16); // → 50
```

Ora applichiamo lo stesso principio a un componente React, riprendendo e ampliando l'Esempio 1.2 del Modulo 1:

```tsx
// ==================== ESEMPIO 2.10: PROPS DI UN COMPONENTE, TIPIZZATE COMPLETAMENTE ====================

interface CourseCardProps {
  titolo: string;
  moduli: number;
  gratuito: boolean;
  onIscriviti: () => void; // una FUNZIONE come prop: non riceve nulla, non restituisce nulla (void)
}

function CourseCard({ titolo, moduli, gratuito, onIscriviti }: CourseCardProps) {
  return (
    <div className="course-card">
      <h2>{titolo}</h2>
      <p>{moduli} moduli</p>
      {gratuito ? <span>Gratuito</span> : <span>A pagamento</span>}
      <button onClick={onIscriviti}>Iscriviti ora</button>
    </div>
  );
}
```

💡 **Perché ti serve:** grazie a `CourseCardProps`, se qualcuno tenta di usare `<CourseCard titolo="Python" />` dimenticando `moduli`, `gratuito` o `onIscriviti`, **l'editor segnala l'errore immediatamente** — prima ancora di eseguire l'app. È esattamente questo il "contratto" che rende sicuro lavorare su componenti scritti da altri.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — I File `*.types.ts` e i Tipi Generati dal Database

Nei progetti Next.js reali, i tipi non vengono sparsi ovunque nei singoli componenti: spesso vengono **centralizzati** in file dedicati, riconoscibili dal suffisso `.types.ts`.

```
types/
└── database.types.ts   ← tipi generati AUTOMATICAMENTE dallo schema del database
```

Nella piattaforma GCPROF-AI-ACADEMY.COM, ad esempio, il file `types/database.types.ts` non viene scritto a mano: è **generato automaticamente** a partire dallo schema del database Supabase (lo vedremo nel dettaglio nel Modulo 7). Il vantaggio è enorme: se una tabella del database cambia, i tipi si rigenerano, e TypeScript segnala immediatamente ogni punto del codice che non è più coerente con la nuova struttura dei dati.

```typescript
// ==================== ESEMPIO 2.11: STRUTTURA TIPICA DI UN FILE database.types.ts (SEMPLIFICATO) ====================
/*
 * Questo è un esempio SEMPLIFICATO di come appare, nella sostanza,
 * un tipo generato dal database: una riga della tabella "courses"
 * diventa un'interface TypeScript con le stesse identiche colonne.
 */

export interface CourseRow {
  id: string;
  title: string;
  description: string | null; // "| null" perché nel DB la colonna può essere vuota
  is_free: boolean;
  created_at: string;
}
```

Da qui nasce anche una buona pratica di organizzazione: **i tipi "di dominio" (che riguardano un'unica funzionalità) vivono vicino alla funzionalità stessa; i tipi "condivisi" (come quelli del database) vivono in `types/`**, importabili da qualsiasi punto del progetto.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Generics di Base

Ultimo, fondamentale strumento di questo modulo: i **generics**. Immagina di voler scrivere una funzione che restituisce "il primo elemento di un array" — ma che funzioni sia con array di corsi, sia con array di numeri, sia con qualsiasi altro tipo, **senza perdere il controllo dei tipi**.

```typescript
// ==================== ESEMPIO 2.12: IL PROBLEMA SENZA GENERICS ====================

function primoElemento(lista: any[]): any {
  return lista[0];
}

// Funziona, ma abbiamo perso ogni informazione sul tipo restituito:
// TypeScript non sa più dirci se il risultato è un numero, una stringa o altro.
const primo = primoElemento([8, 7, 9]); // il tipo di "primo" è "any" 😕
```

```typescript
// ==================== ESEMPIO 2.13: LA STESSA FUNZIONE, CON UN GENERIC ====================
/*
 * <T> è un "tipo segnaposto": significa "qualunque tipo sia T,
 * usalo sia per il parametro sia per il valore restituito".
 * TypeScript lo capisce automaticamente da come usiamo la funzione.
 */

function primoElemento<T>(lista: T[]): T {
  return lista[0];
}

const primoVoto = primoElemento([8, 7, 9]);          // TypeScript capisce: è un "number"
const primoCorso = primoElemento(["Python", "OOP"]); // TypeScript capisce: è una "string"
```

I generics sono ovunque nell'ecosistema React/Next.js che useremo nei prossimi moduli: dagli hook come `useState<T>`, alle funzioni che interrogano il database e restituiscono righe tipizzate. Non serve padroneggiarli a fondo subito: **è sufficiente, per ora, riconoscerli e capire l'idea di base** — un tipo "segnaposto" che si adatta a ciò che gli viene passato.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 2

1. **TypeScript** è JavaScript con un sistema di tipi in più: gli errori si scoprono **mentre scrivi il codice**, non solo eseguendolo.
2. I **tipi primitivi** (`string`, `number`, `boolean`, ecc.) vanno dichiarati esplicitamente; `any` va evitato quasi sempre, `unknown` è l'alternativa sicura.
3. Si possono costruire **union types** (`"a" | "b"`), **array tipizzati** e **oggetti tipizzati**.
4. `interface` e `type` permettono di dare un **nome riutilizzabile** alla forma di un dato; convenzione comune: `interface` per oggetti/props, `type` per union types.
5. Le **props dei componenti React** si tipizzano sempre con un'interface dedicata, incluse le funzioni passate come prop.
6. I progetti reali centralizzano i tipi condivisi (come quelli del database) in file `*.types.ts`, spesso **generati automaticamente**.
7. I **generics** (`<T>`) permettono di scrivere funzioni riutilizzabili con qualsiasi tipo, senza perdere la sicurezza dei tipi.

---

### 🧪 Laboratorio Pratico: "Tipizza la Tua Piattaforma"

**Obiettivo:** Applicare interface, union types e props tipizzate a un piccolo modello dati di corsi.

1. Nel progetto creato nel Modulo 1, crea un file `types/corso.types.ts` e definisci un'`interface Corso` con almeno: `titolo: string`, `moduli: number`, `livello` (union type `"base" | "intermedio" | "avanzato" | "esperto"`), `gratuito: boolean`.
2. Crea un array tipizzato `corsi: Corso[]` con almeno 3 corsi di esempio (puoi ispirarti ai corsi reali di GCProf Academy).
3. Scrivi una funzione `contaCorsiPerLivello(corsi: Corso[], livello: string): number` che conta quanti corsi appartengono a un determinato livello, tipizzando correttamente parametri e valore di ritorno.
4. Crea un componente `CourseListItem` con props tipizzate tramite un'interface dedicata (`titolo`, `livello`, `gratuito`), che mostri questi dati e un badge diverso in base al valore di `gratuito`.
5. **Sfida finale:** trasforma la funzione del punto 3 in una funzione generica `contaPerCampo<T>(lista: T[], campo: keyof T, valore: unknown): number`, che possa contare elementi in base a un campo qualsiasi, non solo `livello`.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Qual è il vantaggio principale di TypeScript rispetto a JavaScript puro?
- A) È un linguaggio completamente diverso, incompatibile con JavaScript
- B) Segnala gli errori di tipo mentre scrivi il codice, non solo quando lo esegui
- C) Elimina la necessità di testare l'applicazione
- D) Rende il codice automaticamente più veloce a runtime

**Domanda 2:** Cosa fa il simbolo `?` dopo il nome di una proprietà in un'interface (es. `descrizione?: string`)?
- A) Rende la proprietà obbligatoria
- B) Indica che la proprietà è di tipo `boolean`
- C) Rende la proprietà opzionale
- D) Genera automaticamente un valore di default

**Domanda 3:** Quale tra questi è un esempio corretto di union type?
- A) `type Ruolo = string & number;`
- B) `type Ruolo = "admin" | "studente";`
- C) `type Ruolo = interface { admin: true };`
- D) `type Ruolo = any[];`

**Domanda 4:** Perché è generalmente sconsigliato usare il tipo `any`?
- A) Perché TypeScript non lo supporta più nelle versioni recenti
- B) Perché rallenta l'esecuzione del programma
- C) Perché disattiva il controllo dei tipi, annullando i vantaggi di TypeScript
- D) Perché funziona solo con i numeri

**Domanda 5:** A cosa serve un generic come `<T>` in una funzione?
- A) A rendere la funzione asincrona
- B) A permettere alla funzione di lavorare con qualsiasi tipo, mantenendo comunque il controllo dei tipi
- C) A convertire automaticamente stringhe in numeri
- D) A collegare la funzione al database

---

[🔙 Torna all'indice](#indice)