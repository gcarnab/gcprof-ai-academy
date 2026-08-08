# ⛓️ Modulo 10 — Smart Contract

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟡 Intermedio (Fase 4 — Ethereum e Smart Contract)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 4 — Wallet, chiavi e firme digitali, Modulo 9 — Ethereum  
> **Obiettivo Didattico:** Comprendere cosa sono gli Smart Contract, come vengono creati ed eseguiti sulla EVM, la differenza tra funzioni di lettura e di scrittura, il ruolo degli eventi, ed esplorare casi d'uso reali di automazione senza intermediari, con uno sguardo equilibrato a vantaggi e rischi.

---

<a id="indice"></a>
# 📑 Indice del Modulo 10

1. [Capitolo 1 — Cos'è davvero uno Smart Contract](#capitolo-1)
2. [Capitolo 2 — Anatomia di uno Smart Contract](#capitolo-2)
3. [Capitolo 3 — Il Ciclo di Vita: dal Deploy all'Esecuzione](#capitolo-3)
4. [Capitolo 4 — Funzioni di Lettura e di Scrittura](#capitolo-4)
5. [Capitolo 5 — Eventi: come un contratto "comunica" con il mondo esterno](#capitolo-5)
6. [Capitolo 6 — Casi d'Uso: automazione senza intermediari](#capitolo-6)
7. [Capitolo 7 — Vantaggi e Limiti degli Smart Contract](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Il Contratto di Carta" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è davvero uno Smart Contract

Nel Modulo 9 abbiamo introdotto brevemente gli Smart Contract come codice depositato in un Contract Account, eseguito in modo deterministico dalla EVM. In questo modulo approfondiamo il concetto, capendo cosa li rende così diversi da un normale programma o da un contratto tradizionale.

### Un'idea più vecchia della Blockchain

Il termine "smart contract" non nasce con Ethereum: fu coniato già nel 1994 dal informatico e giurista Nick Szabo, molti anni prima dell'invenzione di Bitcoin. Szabo lo definì come un insieme di promesse, specificate in forma digitale, che includono i protocolli attraverso cui le parti eseguono tali promesse.

### L'analogia del distributore automatico

Szabo stesso usava un'analogia semplice ed efficace, che riprendiamo qui: un **distributore automatico di bevande**. Inserisci le monete corrette, selezioni un prodotto, e la macchina eroga automaticamente ciò che hai richiesto — senza bisogno di un cassiere che verifichi la transazione o decida se accontentarti.

```
Contratto tradizionale                Smart Contract
┌───────────────────────┐             ┌───────────────────────┐
│ Accordo scritto        │             │ Codice eseguibile      │
│ Fiducia nelle parti     │    vs      │ Esecuzione automatica  │
│ Eventuale intervento    │            │ e deterministica        │
│ di un giudice           │            │ (nessun intermediario) │
└───────────────────────┘             └───────────────────────┘
```

### Cosa manca a Szabo negli anni '90, e cosa aggiunge Ethereum

L'idea di Szabo era valida, ma priva di un ingrediente essenziale: un ambiente **condiviso, verificabile e a prova di manomissione** in cui eseguire queste "macchine automatiche digitali". È esattamente ciò che la EVM (Modulo 9) fornisce: uno Smart Contract su Ethereum è un distributore automatico digitale, il cui funzionamento interno è pubblico, verificabile da chiunque, ed eseguito in modo identico su migliaia di nodi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Anatomia di uno Smart Contract

### I tre ingredienti fondamentali

Ogni Smart Contract, per quanto complesso, è costruito a partire da tre elementi di base:

| Elemento | Cosa rappresenta |
|---|---|
| **Codice** | Le funzioni che definiscono cosa il contratto può fare, scritte tipicamente in Solidity (Modulo 11) |
| **Storage** | I dati permanenti che il contratto memorizza sulla Blockchain (es. saldi, proprietari, contatori) |
| **Indirizzo** | Un identificativo univoco, simile a quello di un EOA (Modulo 9), attraverso cui il contratto riceve transazioni |

```
              Contract Account
        ┌───────────────────────────┐
        │  Indirizzo: 0xAbC1...     │
        │                            │
        │  Codice (immutabile)      │
        │  ┌──────────────────┐     │
        │  │ function deposita()│   │
        │  │ function preleva() │   │
        │  └──────────────────┘     │
        │                            │
        │  Storage (mutabile)       │
        │  ┌──────────────────┐     │
        │  │ saldo[Alice] = 5  │     │
        │  │ saldo[Bob]   = 3  │     │
        │  └──────────────────┘     │
        └───────────────────────────┘
```

### Un dettaglio cruciale: codice immutabile, dati mutabili

Una volta pubblicato sulla Blockchain, il **codice** di uno Smart Contract non può più essere modificato: rimane fisso per sempre, esattamente come qualsiasi altra transazione registrata (richiamando l'immutabilità della catena vista nel Modulo 7). I **dati contenuti nello storage**, invece, cambiano continuamente man mano che il contratto viene utilizzato — proprio come i saldi cambiano dentro un canale Lightning (Modulo 8), pur restando la sua apertura sulla catena immutabile.

Questa distinzione, apparentemente tecnica, avrà conseguenze importanti quando parleremo dei limiti degli Smart Contract nel Capitolo 7.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Il Ciclo di Vita: dal Deploy all'Esecuzione

### Fase 1 — Il Deploy

Prima che uno Smart Contract possa essere utilizzato, deve essere **pubblicato** sulla Blockchain attraverso una speciale transazione, chiamata **deploy**. Questa transazione non ha un destinatario: è proprio l'atto di invio del codice a generare un nuovo Contract Account con un proprio indirizzo univoco.

```
EOA (sviluppatore) ──[transazione di deploy, contiene il codice]──► ???
                                                                       │
                                                          nasce un nuovo
                                                          Contract Account
                                                          con indirizzo proprio
```

### Fase 2 — L'Interazione

Una volta deployato, chiunque può interagire con il contratto inviando una transazione al suo indirizzo, esattamente come si invierebbe ETH a un EOA (Modulo 9) — con la differenza che, in questo caso, la transazione specifica anche **quale funzione** del contratto si vuole richiamare, ed eventuali dati necessari.

### Fase 3 — L'Esecuzione

Ricevuta la transazione, ogni nodo della rete esegue localmente, tramite la propria copia della EVM (Modulo 9), esattamente lo stesso codice, con gli stessi dati in ingresso. Se il codice modifica lo storage del contratto, questa modifica diventa parte del nuovo stato della rete, una volta che la transazione è inclusa in un blocco confermato.

```
   DEPLOY              CHIAMATA               ESECUZIONE (EVM)
┌─────────┐        ┌─────────────┐        ┌───────────────────┐
│ Pubblica │  ───►  │ Invia una   │  ───►  │ Ogni nodo esegue    │
│ il codice│        │ transazione │        │ lo stesso codice   │
│          │        │ al contratto│        │ e aggiorna lo state │
└─────────┘        └─────────────┘        └───────────────────┘
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Funzioni di Lettura e di Scrittura

### Perché serve questa distinzione

Non tutte le interazioni con uno Smart Contract sono uguali: alcune si limitano a **leggere** informazioni già presenti sulla Blockchain, altre **modificano** lo stato della rete. Questa differenza ha una conseguenza pratica importante, direttamente collegata al meccanismo del gas visto nel Modulo 9.

### Funzioni di lettura (view / call)

Una funzione di sola **lettura** (spesso indicata come `view` nel codice) interroga semplicemente lo storage del contratto, senza modificarlo. Poiché non produce alcuna variazione permanente dello stato della rete, **non richiede una transazione né il consumo di gas**: può essere eseguita localmente da un singolo nodo, restituendo il risultato pressoché istantaneamente.

### Funzioni di scrittura (transaction)

Una funzione di **scrittura**, al contrario, modifica lo storage del contratto: deve quindi essere inclusa in una vera transazione, propagata a tutta la rete, elaborata da un blocco e **pagata in gas**, esattamente come una transazione di trasferimento ETH.

| Tipo di funzione | Modifica lo storage? | Richiede gas? | Tempo di risposta |
|---|---|---|---|
| Lettura (`view`) | No | No | Quasi istantaneo |
| Scrittura (`transaction`) | Sì | Sì | Tempo di un blocco confermato |

### Un'analogia utile

Pensa alla differenza tra **consultare** il saldo del tuo conto corrente su un'app bancaria (gratuito, immediato, non lascia traccia sul registro ufficiale) ed **effettuare un bonifico** (un'operazione che modifica realmente il registro, richiede una procedura formale e un costo).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Eventi: come un contratto "comunica" con il mondo esterno

### Il problema: la Blockchain non "avvisa" nessuno

Uno Smart Contract esegue il proprio codice e aggiorna il proprio storage, ma di per sé non ha alcun modo diretto di "notificare" un'applicazione esterna (ad esempio, il sito web di uno scambio decentralizzato) che qualcosa è appena successo. La soluzione adottata su Ethereum si chiama **evento** (*event*).

### Cosa sono gli eventi

Un **evento** è un dato speciale che uno Smart Contract può "emettere" durante l'esecuzione di una funzione di scrittura: viene registrato in modo permanente ed economico all'interno dei log della transazione, senza però occupare (e far pagare) lo storage costoso del contratto visto nel Capitolo 2.

```
function deposita() {
    saldo[msg.sender] += importo;      // scrittura nello storage
    emit Deposito(msg.sender, importo); // evento: "notifica" leggera
}
```

### A cosa servono in pratica

Le applicazioni esterne (i frontend delle dApp che costruiremo nel Modulo 24, o gli Ethers.js che vedremo nel Modulo 23) possono **rimanere in ascolto** di questi eventi, aggiornando automaticamente l'interfaccia utente non appena un contratto emette una notifica rilevante — ad esempio, mostrando "Deposito confermato!" nel momento esatto in cui la transazione viene inclusa in un blocco.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Casi d'Uso: automazione senza intermediari

Vediamo ora alcuni esempi concreti che illustrano il valore pratico degli Smart Contract, anticipando argomenti che approfondiremo più avanti nel corso.

### Escrow automatico (deposito a garanzia)

Un venditore e un acquirente possono depositare fondi in uno Smart Contract che li rilascia automaticamente al venditore solo al verificarsi di una condizione prestabilita (ad esempio, la conferma di consegna), eliminando la necessità di un servizio di deposito a garanzia tradizionale gestito da terzi.

### Crowdfunding decentralizzato

Uno Smart Contract può raccogliere contributi da più partecipanti fino a una scadenza prestabilita: se l'obiettivo di raccolta viene raggiunto, i fondi vengono trasferiti automaticamente al progetto; in caso contrario, ogni contributo viene restituito automaticamente ai rispettivi finanziatori, senza intervento discrezionale di alcuna parte.

### Votazioni verificabili

Un contratto può registrare voti in modo trasparente e immutabile, rendendo il conteggio pubblicamente verificabile da chiunque, senza dover riporre fiducia in un singolo ente centrale di scrutinio (un tema che riprenderemo parlando di DAO nel Modulo 14).

### Distribuzione automatica di royalty

Uno Smart Contract collegato a un'opera digitale può suddividere automaticamente i proventi di ogni vendita tra più beneficiari (ad esempio, un artista e una piattaforma), secondo percentuali fissate nel codice, a ogni singola transazione.

```
   Vendita opera digitale
            │
            ▼
   ┌─────────────────────┐
   │   Smart Contract      │
   │  divide 90% / 10%     │
   └─────────────────────┘
       │              │
       ▼              ▼
   Artista        Piattaforma
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Vantaggi e Limiti degli Smart Contract

### I principali vantaggi

* **Automazione affidabile:** L'esecuzione deterministica della EVM (Modulo 9) garantisce che il contratto si comporti esattamente come scritto, senza margine di discrezionalità o intervento umano successivo.
* **Trasparenza:** Il codice di un contratto pubblicato è generalmente consultabile pubblicamente, permettendo a chiunque di verificarne il funzionamento prima di interagirvi.
* **Riduzione degli intermediari:** Molti processi che tradizionalmente richiedono un ente terzo fidato (Capitolo 6) possono essere automatizzati direttamente nel codice.

### Le sfide ancora aperte

* **Immutabilità come arma a doppio taglio:** Come visto nel Capitolo 2, il codice di un contratto non può essere modificato dopo il deploy: un bug scoperto in seguito non può essere semplicemente "corretto", ma richiede soluzioni architetturali più complesse (in alcuni casi, contratti aggiornabili appositamente progettati).
* **Il codice è legge, nel bene e nel male:** Se il codice contiene un errore logico, quell'errore verrà eseguito fedelmente dalla EVM esattamente come qualsiasi altra istruzione corretta — la Blockchain non distingue tra "intenzione" e "codice effettivamente scritto".
* **Limite dell'isolamento:** Come accennato nel Modulo 9, la EVM non può accedere autonomamente a dati esterni al proprio ambiente (prezzi di mercato, risultati sportivi, meteo): un limite che rende necessari gli Oracoli, approfonditi nel Modulo 16.
* **Necessità di audit e revisione del codice:** Data l'immutabilità e il valore economico spesso coinvolto, la revisione approfondita del codice prima del deploy (audit) è una prassi professionale imprescindibile nello sviluppo Blockchain.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Il Contratto di Carta" e Autoverifica

### 💡 Punti Chiave del Modulo 10

1. Uno Smart Contract è un programma pubblicato su un Contract Account (Modulo 9), la cui esecuzione è automatica, deterministica e verificabile da chiunque.
2. Ogni Smart Contract è composto da **codice** (immutabile dopo il deploy), **storage** (dati mutabili) e un **indirizzo** univoco.
3. Il **deploy** è la transazione speciale che pubblica il codice sulla Blockchain, generando un nuovo Contract Account.
4. Le funzioni di **lettura** (`view`) sono gratuite e istantanee; le funzioni di **scrittura** modificano lo stato, richiedono una transazione e consumano gas.
5. Gli **eventi** permettono a un contratto di "notificare" in modo economico le applicazioni esterne, senza usare il costoso storage permanente.
6. Gli Smart Contract abilitano automazione affidabile e trasparente, ma presentano rischi concreti legati a immutabilità del codice, bug e isolamento dai dati esterni.

---

### 🧪 Laboratorio Guidato: "Il Contratto di Carta"

**Obiettivo:** Simulare fisicamente il deploy e l'esecuzione di uno Smart Contract di crowdfunding, senza scrivere alcuna riga di codice.

* **Fase 1 — Il "Deploy":** Un gruppo di studenti scrive su un cartellone le regole del proprio "contratto": un obiettivo di raccolta (es. 100 gettoni) e una scadenza (es. "entro la fine della lezione"). Da questo momento, le regole scritte sul cartellone non possono più essere modificate: rappresentano il codice immutabile del contratto.
* **Fase 2 — Le "Transazioni" (funzioni di scrittura):** Ogni altro studente che desidera contribuire scrive il proprio nome e l'importo donato direttamente sul cartellone, aggiornando così lo "storage" pubblico del contratto.
* **Fase 3 — Le "Letture" (funzioni view):** In qualsiasi momento, chiunque può guardare il cartellone e calcolare il totale raccolto finora, senza dover "scrivere" nulla e senza alcun costo: questa è una funzione di lettura.
* **Fase 4 — L'esecuzione automatica:** Al raggiungimento della scadenza, applicate meccanicamente la regola scritta in Fase 1: se l'obiettivo è stato raggiunto, il "contratto" assegna simbolicamente i fondi al progetto; altrimenti, ogni donatore viene "rimborsato" (segnando la restituzione sul cartellone).
* **Riflessione conclusiva:** Cosa succederebbe se, a metà raccolta, qualcuno si accorgesse che le regole scritte in Fase 1 contenevano un errore (ad esempio, una soglia sbagliata)? Perché questo scenario riflette fedelmente uno dei limiti discussi nel Capitolo 7?

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Da chi e in quale contesto fu coniato per la prima volta il termine "smart contract"?  
- A) Da Satoshi Nakamoto, nel whitepaper di Bitcoin del 2008.  
- B) Da Vitalik Buterin, nel whitepaper di Ethereum del 2013.  
- C) Da Nick Szabo, già nel 1994, ben prima dell'invenzione di Bitcoin.  
- D) Da un consorzio bancario internazionale negli anni 2000.

**Domanda 2:** Cosa succede al codice di uno Smart Contract dopo essere stato pubblicato tramite deploy?  
- A) Può essere modificato liberamente dal suo creatore in qualsiasi momento.  
- B) Diventa immutabile: non può più essere cambiato, mentre lo storage dei dati resta mutabile.  
- C) Viene cancellato automaticamente dopo la prima esecuzione.  
- D) Viene reso privato e visibile solo al creatore del contratto.

**Domanda 3:** Qual è la differenza principale tra una funzione di lettura (`view`) e una di scrittura in uno Smart Contract?  
- A) Non esiste alcuna differenza pratica tra le due.  
- B) Solo le funzioni di lettura richiedono il pagamento di gas.  
- C) Le funzioni di scrittura modificano lo storage, richiedono una transazione e consumano gas; quelle di lettura no.  
- D) Le funzioni di scrittura possono essere eseguite solo dal creatore del contratto.

**Domanda 4:** A cosa servono principalmente gli "eventi" emessi da uno Smart Contract?  
- A) A modificare direttamente il codice del contratto.  
- B) A notificare in modo economico le applicazioni esterne di ciò che è avvenuto, senza usare il costoso storage permanente.  
- C) A sostituire completamente la necessità di funzioni di scrittura.  
- D) A determinare il prezzo del gas per le transazioni successive.

---

[🔙 Torna all'indice](#indice)