# ⛓️ Modulo 7 — Sicurezza della rete Bitcoin

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟢 Base (Fase 3 — Bitcoin)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 2 — Come funziona una Blockchain, Modulo 6 — Mining e Proof of Work  
> **Obiettivo Didattico:** Comprendere in cosa consiste l'attacco del 51%, perché risulta economicamente proibitivo su una rete come Bitcoin, cosa un simile attacco potrebbe (e non potrebbe) effettivamente fare, e come funziona il meccanismo dei fork per l'evoluzione del protocollo.

---

<a id="indice"></a>
# 📑 Indice del Modulo 7

1. [Capitolo 1 — Ripasso: da cosa dipende la sicurezza di Bitcoin](#capitolo-1)
2. [Capitolo 2 — L'Attacco del 51%: cos'è e come funzionerebbe](#capitolo-2)
3. [Capitolo 3 — Perché l'Attacco del 51% è (oggi) economicamente proibitivo](#capitolo-3)
4. [Capitolo 4 — Cosa Può (e Non Può) Fare un Attacco del 51%](#capitolo-4)
5. [Capitolo 5 — I Fork: come evolve il protocollo Bitcoin](#capitolo-5)
6. [Capitolo 6 — Soft Fork vs Hard Fork: le differenze pratiche](#capitolo-6)
7. [Capitolo 7 — Altri Vettori di Attacco e come la Rete si Difende](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Simula un Attacco del 51%" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Ripasso: da cosa dipende la sicurezza di Bitcoin

Prima di affrontare gli scenari di attacco, è utile riassumere in un unico quadro i meccanismi di sicurezza che abbiamo incontrato separatamente nei moduli precedenti.

### I tre pilastri della sicurezza di Bitcoin

* **Concatenamento crittografico dei blocchi (Modulo 2):** Ogni blocco contiene l'hash del blocco precedente, rendendo qualsiasi manomissione immediatamente rilevabile.
* **Registro distribuito su migliaia di nodi (Modulo 2 e 5):** Non esiste un'unica copia "ufficiale" della Blockchain: ogni full node ne conserva e verifica autonomamente una copia identica.
* **Proof of Work (Modulo 6):** Aggiungere un nuovo blocco richiede un investimento reale e verificabile di energia, rendendo economicamente costoso ogni tentativo di riscrivere la storia della catena.

```
        SICUREZZA DI BITCOIN
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
 Hash      Rete       Proof of
 concatenati distribuita  Work
```

Questi tre elementi, presi singolarmente, non sono sufficienti: è la loro **combinazione** a rendere la Blockchain di Bitcoin estremamente resistente alle manomissioni. In questo modulo analizziamo lo scenario di attacco più celebre, che mette alla prova esattamente questa combinazione.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — L'Attacco del 51%: cos'è e come funzionerebbe

### La regola della catena più lunga

Come accennato nei moduli precedenti, quando la rete Bitcoin si trova temporaneamente di fronte a due versioni concorrenti della Blockchain (ad esempio perché due miner hanno trovato un blocco valido quasi nello stesso istante), il protocollo stabilisce una regola semplice: **vince la catena che richiede la maggiore quantità cumulativa di lavoro computazionale**, generalmente coincidente con quella più lunga.

### Il principio dell'attacco

Un **attacco del 51%** (o *majority attack*) si verifica quando un singolo soggetto, o un gruppo di soggetti coordinati, riesce a controllare **più della metà dell'hash rate totale** della rete (Modulo 6). Con questa maggioranza di potenza di calcolo, l'attaccante potrebbe, in teoria, costruire in segreto una catena alternativa più velocemente del resto della rete onesta, per poi renderla pubblica e farla prevalere secondo la regola della catena più lunga.

```
CATENA ONESTA (resto della rete)
Blocco 1 ─ Blocco 2 ─ Blocco 3 ─ Blocco 4 ─ Blocco 5

CATENA DELL'ATTACCANTE (costruita in segreto, in parallelo)
Blocco 1 ─ Blocco 2' ─ Blocco 3' ─ Blocco 4' ─ Blocco 5' ─ Blocco 6'
                                                             │
                                            Se questa catena diventa più
                                            "pesante" di quella onesta,
                                            la rete la adotta come valida
```

### Perché serve proprio la maggioranza

Con meno del 50% dell'hash rate, un attaccante avrebbe, in media, una probabilità sempre inferiore al 50% di riuscire a "superare" la velocità di produzione di blocchi della rete onesta, rendendo il tentativo statisticamente perdente nel lungo periodo. Superata questa soglia, invece, l'attaccante ottiene un vantaggio statistico che, con tempo e risorse sufficienti, gli permetterebbe teoricamente di avere sempre la meglio.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Perché l'Attacco del 51% è (oggi) economicamente proibitivo

Comprendere la teoria dell'attacco è solo metà del percorso. È altrettanto importante capire perché, nella pratica, un simile attacco risulti oggi estremamente difficile da realizzare su Bitcoin.

### Il costo dell'hardware e dell'energia

Come visto nel Modulo 6, l'hash rate della rete Bitcoin è oggi il risultato dell'investimento collettivo di migliaia di operatori in tutto il mondo, in hardware specializzato (ASIC) ed elettricità. Ottenere più del 50% di questa potenza di calcolo richiederebbe un investimento economico dell'ordine di miliardi di dollari solo in hardware, oltre a un consumo energetico continuo estremamente elevato — risorse non facilmente reperibili né occultabili.

### Un incentivo economico paradossale

Anche disponendo di risorse sufficienti, un attaccante razionale dovrebbe considerare un paradosso interessante: le stesse risorse (ASIC ed energia) investite per attaccare la rete potrebbero, alternativamente, essere utilizzate per **minare onestamente**, ottenendo un guadagno legittimo e prevedibile attraverso il block reward e le transaction fee (Modulo 6). Un attacco riuscito, inoltre, rischierebbe di minare la fiducia nel sistema stesso, facendo crollare il valore di mercato dei bitcoin eventualmente ottenuti in modo fraudolento — danneggiando, in ultima analisi, anche lo stesso attaccante se possiede hardware o riserve legate a quella rete.

```
COSTO dell'attacco (hardware + energia)  vs  BENEFICIO atteso (potenziale double-spend)
        │                                              │
        └──────── quasi sempre COSTO > BENEFICIO ──────┘
                  su una rete della dimensione di Bitcoin
```

### Una precisazione importante

Questo ragionamento economico si applica con forza a reti con un hash rate molto elevato come Bitcoin. Reti Blockchain più piccole, con un hash rate complessivo minore, sono state effettivamente vittime in passato di attacchi del 51% riusciti — un fatto che sottolinea come la sicurezza di una rete Proof of Work sia direttamente proporzionale alle risorse computazionali che la proteggono, e non un dato acquisito una volta per tutte.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Cosa Può (e Non Può) Fare un Attacco del 51%

Un equivoco molto diffuso riguarda la reale portata di un ipotetico attacco del 51% riuscito. È fondamentale chiarire con precisione i suoi limiti intrinseci.

### Cosa un attaccante NON potrebbe mai fare

* **Non può rubare fondi da wallet altrui.** Come visto nel Modulo 4, ogni transazione richiede una firma digitale valida, generabile solo da chi possiede la relativa chiave privata: nessuna potenza di calcolo, per quanto elevata, può falsificare una firma senza conoscere la chiave privata corrispondente.
* **Non può creare bitcoin dal nulla oltre le regole del protocollo.** Le regole di emissione (offerta massima di 21 milioni, Halving) sono verificate indipendentemente da ogni full node della rete (Modulo 5): un blocco che violasse queste regole verrebbe semplicemente rifiutato da tutti gli altri partecipanti onesti.
* **Non può modificare transazioni molto vecchie**, sepolte sotto un numero elevato di blocchi successivi, poiché il costo computazionale per "riscrivere" un tratto sempre più lungo di catena cresce in modo proporzionale.

### Cosa un attaccante potrebbe (teoricamente) fare

* **Effettuare un double-spend a breve termine:** Spendere gli stessi fondi due volte, ad esempio ricevendo un pagamento e poi facendo prevalere una catena alternativa in cui quella transazione non è mai avvenuta.
* **Censurare temporaneamente alcune transazioni**, escludendole deliberatamente dai blocchi che riesce a creare.
* **Impedire ad altri miner onesti di ottenere ricompense**, monopolizzando temporaneamente la creazione di nuovi blocchi.

```
ATTACCO DEL 51% RIUSCITO
        │
        ├── ✅ Possibile: double-spend a breve termine, censura temporanea
        │
        └── ❌ Impossibile: rubare fondi altrui, creare bitcoin extra,
                             riscrivere la storia molto lontana nel tempo
```

Questa distinzione è essenziale: anche nello scenario peggiore, un attacco del 51% non equivale in alcun modo a un controllo totale e illimitato sulla rete.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — I Fork: come evolve il protocollo Bitcoin

Bitcoin, come ogni software, necessita periodicamente di aggiornamenti: correzioni di bug, miglioramenti di efficienza o nuove funzionalità. Ma come si aggiorna un protocollo che, per definizione, non ha un'autorità centrale in grado di imporre un aggiornamento a tutti?

### Cos'è un Fork

Un **fork** (letteralmente "biforcazione") si verifica quando le regole del protocollo vengono modificate, dando origine a una possibile divergenza tra i nodi che adottano le nuove regole e quelli che continuano a seguire le regole precedenti.

```
                     Blocco N (regole originali)
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
    Nodi con regole VECCHIE      Nodi con regole NUOVE
    (continuano su un ramo)      (proseguono su un altro ramo)
```

### Chi decide se un fork ha successo

A differenza di un software tradizionale, dove un'azienda può imporre un aggiornamento obbligatorio, in Bitcoin l'adozione di un fork dipende dal **consenso volontario e distribuito** di miner, sviluppatori, exchange e utenti (Modulo 2). Se la maggioranza della rete non adotta le nuove regole, il fork non ha successo e viene abbandonato; se invece l'adozione è ampia, il fork diventa la nuova versione di riferimento del protocollo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Soft Fork vs Hard Fork: le differenze pratiche

Esistono due categorie principali di fork, con implicazioni molto diverse per la compatibilità della rete.

### Soft Fork: un aggiornamento retrocompatibile

Un **soft fork** introduce regole più restrittive rispetto a quelle precedenti, in modo tale che i blocchi validi secondo le nuove regole risultino **ancora validi** anche secondo le vecchie regole (ma non necessariamente viceversa). Questo permette ai nodi che non hanno ancora aggiornato il proprio software di continuare a riconoscere come valida la catena aggiornata, senza generare una separazione permanente della rete.

### Hard Fork: un aggiornamento non retrocompatibile

Un **hard fork**, al contrario, introduce modifiche che rendono validi blocchi che le vecchie regole avrebbero rifiutato. Se non tutti i partecipanti aggiornano contemporaneamente il proprio software, la rete può **separarsi permanentemente in due catene distinte e indipendenti**, ciascuna con la propria storia condivisa fino al momento della separazione, ma che da quel punto in poi evolvono in modo del tutto autonomo.

| Caratteristica | Soft Fork | Hard Fork |
|---|---|---|
| **Retrocompatibilità** | Sì, i nodi non aggiornati riconoscono comunque i nuovi blocchi come validi | No, richiede l'aggiornamento di tutti i nodi per evitare una separazione |
| **Rischio di separazione della rete** | Basso | Concreto, se l'adozione non è unanime |
| **Esempio storico** | SegWit (Segregated Witness), 2017 | Bitcoin Cash, separatosi da Bitcoin nel 2017 |

### Un esempio storico da conoscere

Nel 2017, un disaccordo all'interno della comunità Bitcoin riguardo a come affrontare i limiti di capacità della rete portò a un hard fork che diede origine a **Bitcoin Cash**, una Blockchain distinta che condivide la storia di Bitcoin fino a quel momento, ma che da allora segue un proprio percorso di sviluppo indipendente, con regole di protocollo differenti.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Altri Vettori di Attacco e come la Rete si Difende

Oltre all'attacco del 51%, esistono altre categorie di attacco teoriche o storicamente osservate, utili per completare il quadro della sicurezza di una rete Blockchain.

### Alcuni vettori rilevanti da conoscere

* **Sybil Attack (già incontrato nel Modulo 2):** Un attaccante crea un numero elevato di identità o nodi fittizi per tentare di influenzare la rete. Il Proof of Work rende questo attacco inefficace, perché il potere decisionale non dipende dal numero di nodi, ma dalla potenza di calcolo effettivamente investita.
* **Eclipse Attack:** Un attaccante tenta di isolare un nodo specifico dal resto della rete onesta, circondandolo esclusivamente di connessioni controllate dall'attaccante stesso, per mostrargli una versione manipolata della Blockchain. La difesa principale consiste in politiche di connessione robuste e nella diversificazione delle connessioni tra i nodi.
* **Attacchi ai wallet e agli exchange (già incontrati nel Modulo 4):** Storicamente, la maggior parte degli incidenti di sicurezza legati a Bitcoin non ha riguardato falle nel protocollo stesso, ma la compromissione di software, servizi centralizzati o comportamenti imprudenti degli utenti — un promemoria importante di quanto discusso nel Modulo 4 sulla sicurezza pratica.

### Il principio di fondo

La stragrande maggioranza dei meccanismi di difesa della rete Bitcoin non deriva da un singolo componente isolato, ma dalla **combinazione ridondante** di crittografia, decentralizzazione ed economia degli incentivi — gli stessi tre pilastri richiamati nel Capitolo 1 di questo modulo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Simula un Attacco del 51%" e Autoverifica

### 💡 Punti Chiave del Modulo 7

1. La sicurezza di Bitcoin si fonda sulla combinazione di **hash concatenati**, **rete distribuita** e **Proof of Work**.
2. Un **attacco del 51%** richiede il controllo della maggioranza dell'hash rate della rete per poter imporre una catena alternativa, secondo la regola della catena con maggior lavoro cumulativo.
3. Su una rete con hash rate elevato come Bitcoin, l'attacco è oggi **economicamente proibitivo**: il costo dell'hardware e dell'energia necessari supera ampiamente il beneficio atteso.
4. Anche in caso di successo, un attacco del 51% **non permette di rubare fondi altrui né di creare bitcoin dal nulla**: consente, al più, un double-spend o una censura temporanea.
5. I **fork** sono il meccanismo con cui il protocollo Bitcoin evolve senza un'autorità centrale, distinguendo tra **soft fork** (retrocompatibili) e **hard fork** (che possono generare catene permanentemente separate, come nel caso storico di Bitcoin Cash).
6. Esistono altri vettori di attacco teorici (Sybil, Eclipse), ma storicamente la maggior parte degli incidenti reali ha riguardato la sicurezza di wallet ed exchange, non il protocollo stesso.

---

### 🧪 Laboratorio Guidato: "Simula un Attacco del 51%"

**Obiettivo:** Comprendere in modo tangibile, attraverso un gioco di ruolo in classe, la dinamica della "regola della catena più lunga" e perché la maggioranza della potenza di calcolo sia determinante.

* **Fase 1 — Divisione dei ruoli:** Dividi la classe in due gruppi di dimensioni molto diverse: un gruppo grande (es. 80% della classe, rappresenta la rete onesta) e un gruppo piccolo (es. 20% della classe, rappresenta l'attaccante).
* **Fase 2 — La gara:** Entrambi i gruppi devono "costruire" una catena di post-it (come nel laboratorio del Modulo 2), aggiungendo un nuovo post-it numerato ogni volta che completano un semplice calcolo assegnato dal docente (ad esempio una piccola operazione aritmetica). Vince chi, in un tempo stabilito, ha costruito la catena più lunga.
* **Fase 3 — Osservazione del risultato:** Con ogni probabilità, il gruppo più numeroso (che rappresenta un hash rate maggiore) costruirà una catena più lunga in meno tempo.
* **Fase 4 — Variante con gruppi invertiti:** Ripeti l'esercizio invertendo le proporzioni dei due gruppi (es. 51% contro 49%) e osserva come il margine di vittoria si riduca sensibilmente, pur rimanendo statisticamente a favore del gruppo maggioritario.
* **Riflessione conclusiva:** Collega il risultato dell'esercizio al Capitolo 3: quali risorse concrete (tempo, persone, "energia mentale") sono state necessarie al gruppo minoritario anche solo per avvicinarsi al risultato del gruppo maggioritario? Cosa suggerisce questo sulla scalabilità del costo di un attacco reale su una rete globale?

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa deve controllare un attaccante per poter tentare un attacco del 51%?  
- A) La maggioranza degli indirizzi wallet registrati sulla rete.  
- B) La maggioranza dell'hash rate complessivo della rete.  
- C) Il codice sorgente ufficiale del software Bitcoin.  
- D) La maggioranza delle chiavi private di tutti gli utenti.

**Domanda 2:** Perché un attacco del 51% è considerato oggi economicamente proibitivo su Bitcoin?  
- A) Perché è tecnicamente impossibile da realizzare.  
- B) Perché il costo in hardware ed energia necessario supera ampiamente il beneficio economico atteso.  
- C) Perché la legge lo vieta esplicitamente in ogni paese del mondo.  
- D) Perché richiederebbe la collaborazione di Satoshi Nakamoto.

**Domanda 3:** Cosa NON può fare, nemmeno in caso di successo, un attacco del 51%?  
- A) Effettuare un double-spend a breve termine.  
- B) Censurare temporaneamente alcune transazioni.  
- C) Rubare fondi da un wallet altrui senza conoscerne la chiave privata.  
- D) Impedire temporaneamente ad altri miner di ottenere ricompense.

**Domanda 4:** Qual è la differenza principale tra un soft fork e un hard fork?  
- A) Il soft fork è retrocompatibile, l'hard fork può generare una separazione permanente della rete.  
- B) Il soft fork richiede sempre la creazione di una nuova criptovaluta.  
- C) L'hard fork non modifica mai le regole del protocollo.  
- D) Non esiste alcuna differenza pratica tra i due.

---

[🔙 Torna all'indice](#indice)