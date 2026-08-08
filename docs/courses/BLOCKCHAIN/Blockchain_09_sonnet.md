# ⛓️ Modulo 9 — Ethereum

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟡 Intermedio (Fase 4 — Ethereum e Smart Contract)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 2 — Come funziona una Blockchain, Modulo 5 — Bitcoin dalla A alla Z, Modulo 6 — Mining e Proof of Work  
> **Obiettivo Didattico:** Comprendere le differenze fondamentali tra Bitcoin ed Ethereum, cosa si intende per "computer mondiale" (Ethereum Virtual Machine), come funziona il meccanismo del gas per il pricing computazionale, e l'evoluzione della rete verso il Proof of Stake.

---

<a id="indice"></a>
# 📑 Indice del Modulo 9

1. [Capitolo 1 — Da "moneta digitale" a "computer mondiale": perché nasce Ethereum](#capitolo-1)
2. [Capitolo 2 — Account su Ethereum: EOA e Contract Account](#capitolo-2)
3. [Capitolo 3 — La Ethereum Virtual Machine (EVM)](#capitolo-3)
4. [Capitolo 4 — Lo Stato di Ethereum e gli Smart Contract in anteprima](#capitolo-4)
5. [Capitolo 5 — Gas e Gas Fee: il prezzo del calcolo](#capitolo-5)
6. [Capitolo 6 — The Merge: da Proof of Work a Proof of Stake](#capitolo-6)
7. [Capitolo 7 — Vantaggi, Limiti e l'Ecosistema Ethereum oggi](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Simula il Gas" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Da "moneta digitale" a "computer mondiale": perché nasce Ethereum

Nei moduli precedenti abbiamo esplorato Bitcoin: un registro distribuito, sicuro e decentralizzato, progettato con un obiettivo preciso, trasferire valore senza intermediari. Con Ethereum entriamo in un livello di ambizione diverso.

### Il limite volutamente stretto di Bitcoin

Come visto nel Modulo 5, il linguaggio di scripting di Bitcoin è stato progettato in modo **volutamente limitato**: permette di verificare firme e condizioni semplici, ma non consente cicli, funzioni complesse o programmi arbitrari. Questa scelta non è un difetto, ma una decisione di sicurezza: meno complessità significa meno superficie di attacco per un sistema che deve custodire valore.

### L'idea di Ethereum

Nel 2013 il programmatore Vitalik Buterin pubblicò un whitepaper con un'idea diversa: e se, invece di un registro specializzato nel trasferire moneta, costruissimo una Blockchain capace di eseguire **qualsiasi programma**, in modo altrettanto decentralizzato e verificabile? Ethereum, lanciato nel 2015, nasce da questa domanda.

```
Bitcoin    ──►  "Chi possiede quanti bitcoin?"
                 Un registro specializzato di SALDI

Ethereum   ──►  "Qual è lo stato di ogni programma sulla rete?"
                 Un computer distribuito che esegue CODICE
```

### Un confronto d'insieme

| Caratteristica | Bitcoin | Ethereum |
|---|---|---|
| Obiettivo principale | Trasferire valore senza intermediari | Eseguire programmi decentralizzati (Smart Contract) |
| Linguaggio di scripting | Limitato, non Turing-completo | Turing-completo (tramite l'EVM, Capitolo 3) |
| Modello dei dati | UTXO (Modulo 5) | Account-based (Capitolo 2) |
| Anno di lancio | 2009 | 2015 |
| Consenso originario | Proof of Work | Proof of Work → Proof of Stake dal 2022 (Capitolo 6) |
| Unità di valore nativa | Bitcoin (BTC) | Ether (ETH) |

Ethereum non nasce per sostituire Bitcoin, ma per rispondere a una domanda diversa: non solo "chi possiede cosa", ma **"che programma sta girando, e in che stato si trova"**.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Account su Ethereum: EOA e Contract Account

### Addio UTXO, benvenuto modello ad account

Nel Modulo 5 abbiamo visto che Bitcoin tiene traccia della proprietà tramite **UTXO** (Unspent Transaction Output): frammenti di valore non ancora spesi, un po' come banconote di taglio variabile in un portafoglio. Ethereum adotta invece un modello più simile a un **conto corrente bancario**: ogni indirizzo ha un saldo aggiornato direttamente, senza dover ricostruire la cronologia di frammenti passati.

```
Bitcoin (UTXO)                    Ethereum (Account-based)
┌─────────────────────┐           ┌─────────────────────┐
│ "Banconote" sparse   │           │  Saldo unico         │
│ da ricomporre a ogni │    vs     │  aggiornato ad ogni  │
│ transazione          │           │  transazione         │
└─────────────────────┘           └─────────────────────┘
```

### Due tipi di account, non uno solo

Su Ethereum esistono due categorie di account, entrambe identificate da un indirizzo, ma profondamente diverse nella natura:

| Tipo | Controllato da | Contiene codice? | Esempio d'uso |
|---|---|---|---|
| **EOA** (Externally Owned Account) | Una chiave privata (Modulo 4) | No | Il "wallet" di una persona |
| **Contract Account** | Il proprio codice (nessuna chiave privata) | Sì | Uno Smart Contract (Modulo 10) |

### EOA: l'evoluzione del wallet Bitcoin

Un **EOA** funziona in modo concettualmente simile a un indirizzo Bitcoin: è controllato da una coppia di chiavi crittografiche, come visto nel Modulo 4, e può inviare transazioni firmandole con la propria chiave privata. È l'account che una persona usa quotidianamente tramite un wallet come MetaMask (che approfondiremo nel Modulo 21).

### Contract Account: un account che "vive" tramite codice

Un **Contract Account** è invece un account il cui comportamento è interamente definito da un programma (lo Smart Contract) depositato sulla Blockchain al momento della sua creazione. Non ha una chiave privata: non "decide" nulla autonomamente, ma **reagisce** a ogni transazione ricevuta eseguendo il proprio codice, in modo deterministico e uguale su ogni nodo della rete.

Approfondiremo gli Smart Contract nel dettaglio nel Modulo 10: per ora, è sufficiente ricordare che sono account governati da codice, non da chiavi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — La Ethereum Virtual Machine (EVM)

### Il "computer mondiale"

Se Ethereum deve eseguire programmi in modo decentralizzato, serve un ambiente di esecuzione condiviso, identico su ogni nodo del pianeta. Questo ambiente si chiama **EVM**, *Ethereum Virtual Machine*: una macchina virtuale che ogni nodo della rete replica ed esegue localmente, ottenendo sempre lo stesso identico risultato a partire dagli stessi input.

```
        ┌─────────────────────────────────────────┐
        │              Nodo 1  →  EVM              │
        ├─────────────────────────────────────────┤
        │              Nodo 2  →  EVM              │   Stessa transazione,
        │              Nodo 3  →  EVM              │ ─ stesso codice,
        │                  ...                     │   stesso risultato
        │              Nodo N  →  EVM              │
        └─────────────────────────────────────────┘
```

### Un'analogia utile

Pensa all'EVM come a un unico computer virtuale, condiviso in copia identica da migliaia di partecipanti nel mondo: nessuno lo possiede individualmente, ma chiunque può verificare in autonomia che ogni calcolo eseguito sia stato svolto correttamente, semplicemente rieseguendolo sulla propria copia.

### Determinismo: la proprietà chiave

Perché migliaia di nodi indipendenti possano concordare sullo stesso risultato (raggiungendo consenso, come discusso nel Modulo 2), l'esecuzione dell'EVM deve essere **completamente deterministica**: stesso codice, stesso stato di partenza, stesso input ⟶ sempre e ovunque lo stesso output. Non esiste spazio per numeri casuali "veri", orari di sistema o dati esterni non verificabili all'interno dell'EVM stessa — un limite che renderà necessari gli **Oracoli**, che vedremo nel Modulo 16.

### Turing-completezza: potenza e responsabilità

A differenza dello scripting limitato di Bitcoin (Capitolo 1), l'EVM è **Turing-completa**: può eseguire, in linea di principio, qualsiasi programma esprimibile, inclusi cicli e logiche condizionali arbitrariamente complesse. Questa potenza espressiva, però, introduce un problema pratico non banale: cosa impedisce a un programma malevolo o mal scritto di eseguire un ciclo infinito, bloccando l'intera rete? La risposta, il meccanismo del **gas**, è il cuore del Capitolo 5.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Lo Stato di Ethereum e gli Smart Contract in anteprima

### Ethereum come "macchina a stati"

L'intera rete Ethereum può essere descritta come una gigantesca **macchina a stati**: in ogni istante esiste uno **stato globale** condiviso, che contiene i saldi di ogni account, il codice di ogni Contract Account e i dati che questo codice ha memorizzato. Ogni nuovo blocco applica un insieme di transazioni a questo stato, producendo un nuovo stato aggiornato.

```
  Stato N          +      Blocco di transazioni     =      Stato N+1
┌───────────┐              ┌─────────────────┐            ┌───────────┐
│ Saldi      │              │  Tx 1, Tx 2, ... │            │ Saldi      │
│ Codice     │   ────────►  │  eseguite in     │  ────────► │ aggiornato │
│ Storage    │              │  ordine dall'EVM │            │ Codice     │
│ contratti  │              └─────────────────┘            │ Storage    │
└───────────┘                                              └───────────┘
```

### Cosa sono, in anteprima, gli Smart Contract

Uno **Smart Contract** è, in sostanza, il codice depositato in un Contract Account (Capitolo 2): un programma che vive permanentemente sulla Blockchain, eseguibile da chiunque tramite una transazione, e il cui comportamento — a differenza di un normale accordo scritto su carta — viene **fatto rispettare automaticamente dall'esecuzione deterministica dell'EVM**, senza bisogno di un giudice o di un intermediario che ne verifichi l'applicazione.

Dedicheremo l'intero Modulo 10 a questo argomento: per ora è importante cogliere il collegamento diretto con quanto visto finora — uno Smart Contract non è "magia", ma semplicemente codice che modifica lo stato globale di Ethereum, eseguito allo stesso modo su ogni nodo della rete.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Gas e Gas Fee: il prezzo del calcolo

### Il problema: chi paga per il calcolo?

Ogni nodo della rete Ethereum, eseguendo una transazione tramite l'EVM (Capitolo 3), consuma risorse reali: tempo di calcolo, memoria, spazio di archiviazione. Senza un meccanismo di limitazione, un programma con un ciclo infinito bloccherebbe l'intera rete all'infinito. La soluzione adottata da Ethereum si chiama **gas**.

### Cos'è il gas

Il **gas** è un'unità di misura del "costo computazionale" di ogni singola operazione eseguita dall'EVM: una somma tra due numeri costa pochissimo gas, scrivere un dato permanente nello storage ne costa molto di più, ed è un'operazione tra le più onerose dell'intera EVM.

| Operazione (esempio) | Costo approssimativo in gas |
|---|---|
| Trasferimento semplice di ETH tra due EOA | 21.000 gas |
| Somma o confronto tra due numeri | qualche unità di gas |
| Scrittura di un nuovo dato nello storage permanente | migliaia di gas |
| Chiamata a uno Smart Contract complesso | variabile, spesso decine o centinaia di migliaia di gas |

### Gas Limit e Gas Price: chi decide cosa

Quando un utente invia una transazione, specifica due parametri:

* il **Gas Limit**: la quantità massima di gas che è disposto a far consumare all'operazione (una sorta di budget di sicurezza);
* il **Gas Price**: quanto è disposto a pagare per ogni singola unità di gas, tipicamente espresso in una sotto-unità di ETH chiamata *gwei*.

```
Commissione totale (fee)  =  Gas effettivamente consumato  ×  Gas Price

Esempio:
  21.000 gas consumati  ×  20 gwei per gas  =  420.000 gwei  =  0,00042 ETH
```

### Cosa succede se il gas finisce

Se l'esecuzione consuma tutto il Gas Limit prima di completarsi, la transazione va in stato di **"out of gas"**: viene interrotta, e tutte le eventuali modifiche allo stato vengono annullate (ma il gas già consumato fino a quel momento non viene restituito, come compenso ai nodi per il lavoro comunque svolto). È proprio questo meccanismo a rendere impossibile, in pratica, un ciclo infinito che blocchi la rete: prima o poi, il gas finisce.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — The Merge: da Proof of Work a Proof of Stake

### Il punto di partenza: Proof of Work

Come visto nel Modulo 6, Bitcoin utilizza il **Proof of Work**: i miner competono risolvendo un puzzle crittografico tramite potenza di calcolo, consumando una quantità significativa di energia elettrica. Ethereum, alla sua nascita nel 2015, adottava lo stesso meccanismo di consenso.

### Il cambio di paradigma: Proof of Stake

Nel settembre 2022, con un evento noto come **"The Merge"**, Ethereum ha completato una transizione pianificata da anni verso un meccanismo di consenso alternativo: il **Proof of Stake** (letteralmente, "prova di partecipazione"). Al posto dei miner, la rete è oggi validata da **validatori**, che depositano ("mettono in stake") una quantità di ETH come garanzia della propria onestà, invece di investire in hardware e consumo energetico.

```
PRIMA — Proof of Work                  DOPO — Proof of Stake
┌─────────────────────────┐            ┌─────────────────────────┐
│  Miner competono con     │            │  Validatori depositano   │
│  potenza di calcolo      │   ────►    │  ETH in stake come       │
│  (hardware, energia)     │            │  garanzia di onestà      │
└─────────────────────────┘            └─────────────────────────┘
```

### Perché è avvenuto il cambiamento

Il Proof of Stake elimina la necessità di una competizione basata sul consumo energetico: la sicurezza della rete deriva dal fatto che un validatore disonesto rischia di perdere una parte del proprio ETH depositato (un meccanismo chiamato *slashing*), un incentivo economico diretto a comportarsi correttamente, concettualmente analogo — pur con un meccanismo differente — all'incentivo economico dei miner Bitcoin visto nel Modulo 6.

### L'impatto energetico

Il risultato più citato della transizione è stata una riduzione stimata di circa il **99,95%** del consumo energetico complessivo della rete Ethereum, mantenendo al contempo le proprietà di sicurezza e decentralizzazione della Blockchain.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Vantaggi, Limiti e l'Ecosistema Ethereum oggi

Come per ogni tecnologia analizzata in questo corso, è importante presentare un quadro equilibrato.

### I principali vantaggi

* **Programmabilità:** L'EVM (Capitolo 3) permette di costruire applicazioni ben oltre il semplice trasferimento di valore, dagli Smart Contract (Modulo 10) ai Token personalizzati (Modulo 12).
* **Ecosistema maturo:** Ethereum è la piattaforma su cui sono nati e si sono standardizzati la maggior parte degli strumenti e degli standard che incontreremo nel resto del corso (NFT, DeFi, DAO).
* **Consumo energetico ridotto:** Grazie al Proof of Stake (Capitolo 6), l'impronta energetica della rete è oggi paragonabile a quella di infrastrutture informatiche tradizionali di scala equivalente.

### Le sfide ancora aperte

* **Costi variabili del gas:** Nei momenti di congestione della rete, il Gas Price (Capitolo 5) può salire significativamente, rendendo le transazioni più costose — un problema che ha motivato lo sviluppo dei Layer 2, che approfondiremo nel Modulo 17.
* **Complessità e superficie di attacco:** La stessa potenza espressiva dell'EVM (Turing-completezza, Capitolo 3) rende possibile scrivere Smart Contract con bug, con conseguenze potenzialmente costose se sfruttati.
* **Curva di apprendimento:** Comprendere account, gas e Smart Contract richiede, rispetto al semplice invio di bitcoin, uno sforzo concettuale iniziale maggiore.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Simula il Gas" e Autoverifica

### 💡 Punti Chiave del Modulo 9

1. Ethereum nasce per generalizzare l'idea di Blockchain: non solo trasferire moneta, ma eseguire qualsiasi programma in modo decentralizzato.
2. A differenza del modello UTXO di Bitcoin, Ethereum usa un **modello ad account**: EOA (controllati da chiavi private) e Contract Account (controllati da codice).
3. La **EVM** è la macchina virtuale, identica su ogni nodo, che esegue in modo deterministico e Turing-completo il codice degli Smart Contract.
4. Lo **stato** di Ethereum è una struttura dati globale che viene aggiornata a ogni blocco, applicando le transazioni ricevute.
5. Il **gas** è l'unità che misura il costo computazionale di ogni operazione, ed è il meccanismo che impedisce cicli infiniti e abusi della rete.
6. Con **The Merge** (settembre 2022), Ethereum è passata dal Proof of Work al **Proof of Stake**, riducendo drasticamente il proprio consumo energetico.

---

### 🧪 Laboratorio Guidato: "Simula il Gas"

**Obiettivo:** Comprendere concretamente il meccanismo di Gas Limit, Gas Price e "out of gas" attraverso una simulazione senza codice.

* **Fase 1 — Il listino operazioni:** L'insegnante scrive alla lavagna un piccolo "listino gas", ad esempio: Somma = 3 gas, Confronto = 3 gas, Scrittura su storage = 20 gas, Chiamata a funzione = 40 gas.
* **Fase 2 — Costruire una transazione:** Ogni studente (o gruppo) scrive su un foglio una sequenza di 5-6 operazioni prese dal listino, che rappresentano la logica di un semplice Smart Contract, e calcola il costo totale in gas sommando i valori del listino.
* **Fase 3 — Fissare il Gas Limit:** Prima di "eseguire" la propria sequenza, ogni studente dichiara un Gas Limit di sua scelta, senza conoscere ancora il costo reale totale calcolato al passo precedente.
* **Fase 4 — Esecuzione:** Si confrontano Gas Limit dichiarato e costo reale calcolato: se il Gas Limit è sufficiente, la transazione "va a buon fine"; se il costo reale lo supera, la transazione va "out of gas" e viene annullata (ma il gas consumato fino a quel punto viene comunque "perso", da segnare sul foglio).
* **Riflessione conclusiva:** Perché conviene, per uno sviluppatore, impostare un Gas Limit con un margine di sicurezza rispetto alla stima del costo reale? Cosa succederebbe se tutti gli utenti della rete impostassero un Gas Price molto più alto del necessario nello stesso momento?

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Qual è la differenza fondamentale tra l'obiettivo di Bitcoin e quello di Ethereum?  
- A) Bitcoin usa la crittografia, Ethereum no.  
- B) Bitcoin è specializzato nel trasferimento di valore, Ethereum è progettato per eseguire programmi arbitrari (Smart Contract).  
- C) Ethereum non utilizza affatto la Blockchain.  
- D) Non esiste alcuna differenza sostanziale tra i due progetti.

**Domanda 2:** Cosa distingue un Contract Account da un EOA (Externally Owned Account) su Ethereum?  
- A) Il Contract Account è controllato da codice, non da una chiave privata.  
- B) Solo l'EOA può ricevere ETH.  
- C) Il Contract Account richiede sempre una seed phrase, come un EOA.  
- D) Non esiste alcuna differenza tra i due tipi di account.

**Domanda 3:** A cosa serve principalmente il meccanismo del "gas" su Ethereum?  
- A) Ad aumentare artificialmente il prezzo dell'ETH.  
- B) A misurare il costo computazionale delle operazioni e impedire cicli infiniti o abusi della rete.  
- C) A sostituire completamente il concetto di transazione.  
- D) A determinare il numero massimo di validatori della rete.

**Domanda 4:** Cosa rappresenta l'evento noto come "The Merge", avvenuto nel settembre 2022?  
- A) La fusione di Ethereum con la rete Bitcoin in un'unica Blockchain.  
- B) Il passaggio della rete Ethereum dal Proof of Work al Proof of Stake.  
- C) Il lancio ufficiale della prima versione di Ethereum.  
- D) L'introduzione del meccanismo del gas.

---

[🔙 Torna all'indice](#indice)