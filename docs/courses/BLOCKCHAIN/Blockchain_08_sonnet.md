# ⛓️ Modulo 8 — Lightning Network

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟢 Base (Fase 3 — Bitcoin)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 5 — Bitcoin dalla A alla Z, Modulo 6 — Mining e Proof of Work  
> **Obiettivo Didattico:** Comprendere il problema della scalabilità di Bitcoin, cosa si intende per soluzione "Layer 2", come funzionano i canali di pagamento e il routing multi-hop della Lightning Network, e valutarne in modo equilibrato vantaggi e limiti attuali.

---

<a id="indice"></a>
# 📑 Indice del Modulo 8

1. [Capitolo 1 — Il Problema della Scalabilità di Bitcoin](#capitolo-1)
2. [Capitolo 2 — Cos'è un Layer 2 e perché serve](#capitolo-2)
3. [Capitolo 3 — I Canali di Pagamento: aprire una "corsia preferenziale"](#capitolo-3)
4. [Capitolo 4 — La Chiusura di un Canale: tornare on-chain](#capitolo-4)
5. [Capitolo 5 — Il Routing Multi-Hop: pagare chi non conosci](#capitolo-5)
6. [Capitolo 6 — Gli HTLC: la sicurezza del routing](#capitolo-6)
7. [Capitolo 7 — Vantaggi e Limiti Attuali della Lightning Network](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Costruisci una Rete Lightning" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il Problema della Scalabilità di Bitcoin

Nei moduli precedenti abbiamo celebrato la sicurezza e la decentralizzazione della rete Bitcoin. Ma questi stessi punti di forza comportano un compromesso tecnico importante, che affrontiamo in apertura di questo modulo.

### I numeri della scalabilità on-chain

Come visto nel Modulo 6, la rete Bitcoin produce, in media, un nuovo blocco ogni **10 minuti circa**, e ogni blocco ha una dimensione limitata. Questo si traduce in una capacità di elaborazione di poche transazioni al secondo a livello dell'intera rete globale — un numero enormemente inferiore rispetto ai circuiti di pagamento elettronico tradizionali, capaci di gestire migliaia di transazioni al secondo.

```
Bitcoin (Layer 1, "on-chain")   ──►  poche transazioni al secondo
Circuiti di pagamento tradizionali ──►  migliaia di transazioni al secondo
```

### Perché questo limite è, in parte, una scelta consapevole

Come discusso nel Modulo 7, aumentare eccessivamente la dimensione dei blocchi (per elaborare più transazioni contemporaneamente) comporterebbe un maggiore carico di dati per ogni full node, rendendo più difficile per un normale cittadino gestire un proprio nodo — con il rischio di favorire, nel tempo, una maggiore centralizzazione della rete (esattamente il compromesso al centro del disaccordo storico che portò all'hard fork di Bitcoin Cash, già citato nel Modulo 7). Il compromesso adottato dalla comunità Bitcoin ha privilegiato la **sicurezza e la decentralizzazione** rispetto alla velocità pura, spostando il problema della scalabilità verso una soluzione complementare: i **Layer 2**.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Cos'è un Layer 2 e perché serve

### Il concetto di "livello" applicato ai pagamenti

Un **Layer 2** (letteralmente "secondo livello") è un protocollo costruito **sopra** una Blockchain principale (detta **Layer 1**), progettato per elaborare la maggior parte delle transazioni al di fuori della catena principale ("**off-chain**"), appoggiandosi ad essa solo occasionalmente per garantire sicurezza e finalità.

```
        ┌────────────────────────────────────┐
        │     LAYER 2 (Lightning Network)     │
        │  Migliaia di transazioni istantanee │
        │        ed economiche, off-chain      │
        └────────────────────────────────────┘
                          │
                 si appoggia a
                          │
                          ▼
        ┌────────────────────────────────────┐
        │      LAYER 1 (Blockchain Bitcoin)    │
        │   Poche transazioni, ma massima      │
        │      sicurezza e decentralizzazione   │
        └────────────────────────────────────┘
```

### Un'analogia utile

Pensa al Layer 1 come al sistema bancario di compensazione tra le grandi banche centrali — lento ma estremamente sicuro e definitivo — e al Layer 2 come al circuito di pagamento con carta che usi ogni giorno per acquisti quotidiani: veloce e comodo, ma che si affida periodicamente al sistema bancario sottostante per regolare i saldi complessivi in modo definitivo.

### La Lightning Network

La **Lightning Network**, proposta per la prima volta in un whitepaper del 2015, è la principale implementazione di Layer 2 sviluppata specificamente per Bitcoin, progettata per abilitare **pagamenti istantanei e con commissioni minime**, anche per importi molto piccoli (**micropagamenti**), altrimenti poco pratici da gestire direttamente sulla catena principale.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — I Canali di Pagamento: aprire una "corsia preferenziale"

Il mattone fondamentale su cui si costruisce l'intera Lightning Network è il **canale di pagamento** (*payment channel*), talvolta chiamato anche **canale di stato** (*state channel*).

### L'apertura di un canale

Immagina che Alice voglia effettuare frequenti pagamenti a Bob. Invece di registrare ogni singola transazione sulla Blockchain di Bitcoin (Layer 1), i due possono aprire un canale di pagamento dedicato:

1. Alice e Bob creano insieme **un'unica transazione on-chain**, depositando una certa quantità di bitcoin in un indirizzo condiviso, controllato da entrambi (tecnicamente, un indirizzo che richiede la firma di entrambe le parti).
2. Questa transazione, l'unica registrata sulla Blockchain in questa fase, apre ufficialmente il canale.

```
Layer 1 (Blockchain): UNA SOLA transazione
   Alice + Bob  ──►  Deposito condiviso: 0,01 BTC totali
                     (es. 0,006 BTC di Alice + 0,004 BTC di Bob)
```

### Gli scambi all'interno del canale

Una volta aperto il canale, Alice e Bob possono scambiarsi **un numero praticamente illimitato di pagamenti** semplicemente aggiornando, ogni volta, un saldo condiviso firmato da entrambi — senza mai toccare la Blockchain principale. Ogni aggiornamento è, in sostanza, un accordo crittograficamente firmato su "chi possiede quanto" all'interno del deposito condiviso.

```
Layer 2 (dentro il canale): centinaia di micro-transazioni istantanee
Saldo iniziale:  Alice 0,006 | Bob 0,004
Dopo pagamento 1: Alice 0,0055 | Bob 0,0045   (istantaneo, nessuna fee di rete)
Dopo pagamento 2: Alice 0,0057 | Bob 0,0043   (istantaneo, nessuna fee di rete)
                          … e così via, migliaia di volte
```

Ognuno di questi aggiornamenti avviene istantaneamente e senza commissioni di rete significative, proprio perché **non richiede alcuna interazione con la Blockchain principale** né alcun processo di mining (Modulo 6).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — La Chiusura di un Canale: tornare on-chain

### La chiusura cooperativa

Quando Alice e Bob decidono di non aver più bisogno del canale, effettuano una **seconda e ultima transazione on-chain**, che registra sulla Blockchain di Bitcoin il saldo finale concordato tra le parti, restituendo a ciascuno la propria quota effettiva.

```
Layer 1 (Blockchain): SECONDA (e ultima) transazione
   Chiusura canale  ──►  Alice riceve 0,0057 BTC | Bob riceve 0,0043 BTC
```

### Il risultato complessivo

Il risultato è sorprendente se confrontato con un utilizzo puramente on-chain: a fronte di **migliaia di pagamenti** scambiati tra Alice e Bob, la Blockchain di Bitcoin ha dovuto registrare soltanto **due transazioni complessive** — quella di apertura e quella di chiusura del canale.

```
       APERTURA (on-chain)
             │
             ▼
   ┌───────────────────────┐
   │  Migliaia di pagamenti │
   │   istantanei off-chain │
   └───────────────────────┘
             │
             ▼
        CHIUSURA (on-chain)

  Totale transazioni su Blockchain: SOLO 2
```

### Cosa succede in caso di disaccordo

Un aspetto fondamentale, che approfondiremo nel Capitolo 6, è che ogni parte conserva sempre la possibilità di chiudere unilateralmente il canale utilizzando l'**ultimo saldo firmato da entrambi**, pubblicandolo sulla Blockchain principale come prova crittografica, anche se l'altra parte non collabora o è irraggiungibile. Questo garantisce che nessuno dei due partecipanti possa mai "rubare" i fondi dell'altro semplicemente sparendo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Il Routing Multi-Hop: pagare chi non conosci

Fin qui abbiamo descritto un canale diretto tra due persone che si conoscono. Ma il vero punto di forza della Lightning Network emerge quando si vuole pagare qualcuno con cui **non si ha alcun canale diretto aperto**.

### L'idea del routing

Se Alice ha un canale aperto con Bob, e Bob ha a sua volta un canale aperto con Carlo, Alice può inviare un pagamento a Carlo **facendolo transitare attraverso il canale di Bob**, senza dover aprire un nuovo canale diretto né effettuare alcuna transazione on-chain aggiuntiva.

```
   Alice ──canale──► Bob ──canale──► Carlo

   Alice invia un pagamento a Carlo, instradato
   automaticamente attraverso il canale con Bob,
   che agisce da "nodo intermedio" della rete
```

### Una rete di canali, non solo canali isolati

Moltiplicando questo principio su scala globale, con migliaia di nodi che aprono canali tra loro, si forma una vera e propria **rete di canali interconnessi** — la Lightning Network, appunto — in cui è spesso possibile trovare un percorso (*route*) tra due persone qualsiasi, anche se non hanno mai aperto un canale diretto tra loro, attraversando uno o più nodi intermedi.

### Un incentivo anche per i nodi intermedi

Bob, agendo da intermediario nel nostro esempio, può trattenere una piccola commissione di routing per il servizio offerto, generando così un ulteriore modello di incentivo economico, distinto da quello dei miner visto nel Modulo 6, ma altrettanto centrale per il funzionamento e la sostenibilità dell'intera rete.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Gli HTLC: la sicurezza del routing

Una domanda sorge spontanea a questo punto: come può Alice fidarsi che Bob, il nodo intermedio, inoltri effettivamente il pagamento a Carlo invece di trattenerlo per sé?

### Il meccanismo HTLC

La risposta si chiama **HTLC**, acronimo di *Hashed Timelock Contract* (contratto con blocco temporale basato su hash). Senza entrare nei dettagli implementativi più avanzati (che troverai nei moduli dedicati agli Smart Contract), il principio di fondo è elegante e si appoggia direttamente ai concetti di hashing già visti nel Modulo 2 e 3.

### Come funziona, in sintesi

1. Carlo genera un segreto casuale e ne condivide con Alice solo il suo **hash** (non il segreto stesso).
2. Alice invia il pagamento a Bob con una condizione crittografica: *"Questo importo può essere sbloccato solo da chi conosce il segreto che genera questo specifico hash."*
3. Bob, per poter inoltrare il pagamento a Carlo e ottenere la propria commissione, deve creare un impegno equivalente verso Carlo.
4. Solo quando Carlo rivela il segreto per riscuotere il pagamento, quello stesso segreto permette automaticamente anche a Bob di riscuotere l'importo dovutogli da Alice.

```
Alice ──"pagherò se conosci il segreto di hash X"──► Bob
                                                        │
Bob ──"pagherò se conosci il segreto di hash X"──► Carlo
                                                        │
                                        Carlo rivela il segreto
                                        per riscuotere da Bob
                                                        │
                            Bob usa lo stesso segreto rivelato
                              per riscuotere da Alice
```

### Perché questo meccanismo è sicuro

Il segreto si "propaga a ritroso" lungo tutta la catena solo nel momento in cui il destinatario finale lo rivela per riscuotere il pagamento: questo garantisce che **nessun nodo intermedio possa trattenere i fondi senza inoltrare correttamente il pagamento**, poiché altrimenti non riuscirebbe a sua volta a riscuotere l'importo dovutogli dal nodo precedente. Il componente "timelock" (blocco temporale) aggiunge inoltre una scadenza di sicurezza, garantendo che i fondi tornino automaticamente al mittente se il pagamento non viene completato entro un tempo stabilito.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Vantaggi e Limiti Attuali della Lightning Network

Come per ogni tecnologia, è importante presentare un quadro equilibrato, che comprenda sia i punti di forza sia le sfide ancora aperte.

### I principali vantaggi

* **Istantaneità:** I pagamenti vengono confermati in una frazione di secondo, senza dover attendere la creazione di un nuovo blocco (Modulo 6).
* **Commissioni minime:** Rende economicamente sensato anche l'invio di importi molto piccoli (micropagamenti), altrimenti penalizzati dalle commissioni delle transazioni on-chain.
* **Scalabilità:** Sposta il carico della maggior parte delle transazioni fuori dalla catena principale, senza compromettere la sicurezza e la decentralizzazione del Layer 1 (Capitolo 1).

### Le sfide ancora aperte

* **Gestione della liquidità:** Un canale può instradare pagamenti solo fino all'ammontare dei fondi effettivamente depositati al suo interno in quella direzione; una gestione efficiente della liquidità distribuita nella rete resta una sfida tecnica non banale.
* **Necessità di essere online:** Per ricevere pagamenti in modo affidabile, un nodo Lightning deve generalmente essere connesso e disponibile, un requisito diverso rispetto alla semplice ricezione di una transazione on-chain.
* **Complessità per l'utente finale:** Sebbene le interfacce si siano evolute molto nel tempo, il concetto di apertura e gestione dei canali rimane, per un principiante, più articolato rispetto a un semplice invio di transazione on-chain.
* **Adozione ancora in crescita:** Come per molte infrastrutture di rete, l'utilità della Lightning Network cresce insieme al numero di partecipanti e canali attivi, ed è un ecosistema tuttora in fase di sviluppo e consolidamento.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Costruisci una Rete Lightning" e Autoverifica

### 💡 Punti Chiave del Modulo 8

1. Bitcoin (Layer 1) privilegia sicurezza e decentralizzazione a scapito della velocità, elaborando poche transazioni al secondo a livello dell'intera rete.
2. Un **Layer 2** come la Lightning Network sposta la maggior parte delle transazioni "off-chain", appoggiandosi al Layer 1 solo per l'apertura e la chiusura dei canali.
3. Un **canale di pagamento** richiede solo due transazioni on-chain (apertura e chiusura), permettendo un numero praticamente illimitato di scambi istantanei ed economici al suo interno.
4. Il **routing multi-hop** permette di inviare pagamenti anche a chi non si ha un canale diretto, attraversando una rete di canali interconnessi.
5. Gli **HTLC** garantiscono che nessun nodo intermedio possa trattenere fraudolentemente i fondi durante l'inoltro di un pagamento instradato.
6. La Lightning Network offre vantaggi concreti in termini di velocità e costi, ma presenta ancora sfide aperte legate alla liquidità, alla disponibilità dei nodi e alla semplicità d'uso.

---

### 🧪 Laboratorio Guidato: "Costruisci una Rete Lightning"

**Obiettivo:** Simulare fisicamente in classe l'apertura di canali di pagamento e il routing multi-hop, senza utilizzare alcun software o fondo reale.

* **Fase 1 — Apertura dei canali:** Dividetevi in gruppi di 4-5 studenti. Ogni coppia di studenti che desidera avere un "canale" tra loro scrive su un foglio condiviso un saldo iniziale (ad esempio, "Canale Alice-Bob: Alice 60 gettoni, Bob 40 gettoni"), rappresentando gettoni di carta o segnaposto come unità di conto. Questo foglio condiviso rappresenta la transazione di apertura on-chain.
* **Fase 2 — Pagamenti diretti:** All'interno di ogni coppia con un canale aperto, effettuate alcuni pagamenti aggiornando semplicemente i numeri sul foglio condiviso (nessun nuovo foglio, nessuna nuova "transazione on-chain").
* **Fase 3 — Routing multi-hop:** Scegli uno studente (es. Carlo) con cui non hai un canale diretto, ma che è collegato a te tramite un compagno comune (es. Bob). Prova a "inviargli" un pagamento aggiornando in sequenza prima il foglio Alice-Bob, poi il foglio Bob-Carlo, simulando l'inoltro descritto nel Capitolo 5.
* **Fase 4 — Chiusura dei canali:** Al termine dell'esercizio, ogni coppia annota il saldo finale sul proprio foglio: questo rappresenta la transazione di chiusura on-chain.
* **Riflessione conclusiva:** Contate quanti "fogli on-chain" (aperture + chiusure) sono stati effettivamente necessari rispetto al numero totale di pagamenti scambiati durante l'intero esercizio. Cosa succederebbe alla rete se uno dei nodi intermedi (come Bob) si rifiutasse improvvisamente di inoltrare un pagamento?

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa si intende, in questo contesto, per soluzione "Layer 2"?  
- A) Una seconda Blockchain completamente indipendente da Bitcoin.  
- B) Un protocollo costruito sopra la Blockchain principale, che elabora la maggior parte delle transazioni off-chain.  
- C) Un nuovo algoritmo di consenso alternativo al Proof of Work.  
- D) Un tipo di wallet hardware particolarmente sicuro.

**Domanda 2:** Quante transazioni on-chain sono generalmente necessarie per gestire un intero canale di pagamento Lightning, dall'apertura alla chiusura?  
- A) Una per ogni singolo pagamento scambiato all'interno del canale.  
- B) Solamente due: una di apertura e una di chiusura del canale.  
- C) Nessuna, il canale non richiede mai transazioni on-chain.  
- D) Esattamente dieci, indipendentemente dal numero di pagamenti.

**Domanda 3:** Cosa permette il "routing multi-hop" all'interno della Lightning Network?  
- A) Di inviare un pagamento a qualcuno con cui non si ha un canale diretto, instradandolo attraverso altri canali collegati.  
- B) Di velocizzare il processo di mining sulla Blockchain principale.  
- C) Di aumentare l'offerta massima di bitcoin disponibili.  
- D) Di aprire automaticamente nuovi canali senza alcuna transazione on-chain.

**Domanda 4:** Qual è la funzione principale degli HTLC nel routing di un pagamento?  
- A) Aumentare le commissioni per i nodi intermedi.  
- B) Garantire che nessun nodo intermedio possa trattenere fraudolentemente i fondi senza inoltrare correttamente il pagamento.  
- C) Sostituire completamente la necessità di aprire un canale di pagamento.  
- D) Ridurre la sicurezza del canale a favore della velocità.

---

[🔙 Torna all'indice](#indice)