# ⛓️ Modulo 6 — Mining e Proof of Work

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟢 Base (Fase 3 — Bitcoin)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 2 — Come funziona una Blockchain, Modulo 5 — Bitcoin dalla A alla Z  
> **Obiettivo Didattico:** Comprendere in dettaglio il meccanismo del Proof of Work, come viene regolata la difficoltà della rete, quali incentivi economici spingono i miner a comportarsi onestamente, e valutare in modo equilibrato il dibattito sull'impatto energetico del mining.

---

<a id="indice"></a>
# 📑 Indice del Modulo 6

1. [Capitolo 1 — Cos'è il Mining: risolvere un puzzle crittografico](#capitolo-1)
2. [Capitolo 2 — Il Proof of Work in Dettaglio: hash target e nonce](#capitolo-2)
3. [Capitolo 3 — La Difficoltà di Rete: un termostato automatico](#capitolo-3)
4. [Capitolo 4 — Gli Incentivi Economici del Mining](#capitolo-4)
5. [Capitolo 5 — Le Mining Pool: unire le forze](#capitolo-5)
6. [Capitolo 6 — L'Impatto Energetico: un dibattito aperto](#capitolo-6)
7. [Capitolo 7 — Dal Mining alla Sicurezza della Rete](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Il Puzzle del Miner" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è il Mining: risolvere un puzzle crittografico

Nel Modulo 5 abbiamo accennato più volte al ruolo dei **miner** nella creazione di nuovi blocchi. È il momento di aprire nel dettaglio questo meccanismo, che rappresenta il cuore pulsante della sicurezza di Bitcoin.

### Un nome che può trarre in inganno

Il termine "mining" (estrazione mineraria) è un'analogia efficace ma può generare un'idea imprecisa. I miner non "scavano" per trovare bitcoin già esistenti: **competono per risolvere un puzzle crittografico**, e chi lo risolve per primo ottiene il diritto di creare il prossimo blocco della catena, ricevendo in cambio una ricompensa (Capitolo 4).

### Il puzzle in breve

Ricordando quanto visto nel Modulo 2, ogni blocco contiene un campo chiamato **nonce**. Il compito del miner è trovare un valore di nonce tale che, calcolando l'hash dell'intero blocco (dati + nonce), il risultato rispetti una condizione molto specifica: iniziare con un certo numero di zeri.

```
Blocco + Nonce = 8452193  ──hash──►  9c1e4a7f2b... ❌ (non inizia con abbastanza zeri)
Blocco + Nonce = 8452194  ──hash──►  3f8a91c2d4... ❌
Blocco + Nonce = 8452195  ──hash──►  0000a3f9c2... ✅ Trovato!
```

### Perché non esiste una "scorciatoia"

Grazie alla proprietà di **unidirezionalità** delle funzioni di hash (Modulo 2 e 3), non esiste alcun modo per calcolare "al contrario" quale nonce produca un hash valido: l'unica strategia possibile è il **tentativo esaustivo** (*brute force*), provando miliardi di combinazioni al secondo grazie a hardware specializzato. Questo è precisamente il motivo per cui il meccanismo si chiama "Proof of Work" (**prova di lavoro**): l'unico modo per dimostrare di aver trovato un hash valido è aver effettivamente svolto una quantità enorme di calcoli.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Il Proof of Work in Dettaglio: hash target e nonce

Approfondiamo ora con maggiore precisione tecnica il concetto di "target" (bersaglio) introdotto nel capitolo precedente.

### Il concetto di Target

Più che di "un certo numero di zeri iniziali" in senso stretto, tecnicamente i miner devono trovare un hash che sia **numericamente inferiore** a un valore soglia chiamato **target**, definito dal protocollo. Poiché gli hash SHA-256 (l'algoritmo usato da Bitcoin) sono distribuiti in modo del tutto imprevedibile, più il target è basso (cioè più stringente), minore è la probabilità che un singolo tentativo casuale lo soddisfi, e maggiore sarà il numero medio di tentativi necessari.

```
Target ALTO (facile)     ──►  Molti hash validi possibili   ──► Blocco trovato velocemente
Target BASSO (difficile) ──►  Pochissimi hash validi possibili ──► Servono moltissimi tentativi
```

### Il ruolo dell'hash rate

La velocità con cui un miner (o l'intera rete) riesce a calcolare hash al secondo viene chiamata **hash rate**, misurata oggi in unità come TH/s (terahash al secondo) o addirittura EH/s (exahash al secondo) a livello di intera rete globale. Un hash rate più elevato significa semplicemente più tentativi al secondo — non un modo "intelligente" per indovinare la soluzione, dato che, come visto nel Capitolo 1, non esiste alcuna scorciatoia matematica.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — La Difficoltà di Rete: un termostato automatico

Se l'hash rate della rete Bitcoin cambia costantemente (nuovi miner entrano, altri escono, l'hardware migliora), come fa il protocollo a garantire che, in media, un nuovo blocco venga creato ogni **10 minuti circa**, indipendentemente da quanta potenza di calcolo sia connessa alla rete in un dato momento?

### Il meccanismo di auto-regolazione

Il protocollo Bitcoin include un meccanismo automatico di **aggiustamento della difficoltà** (*difficulty adjustment*): ogni 2016 blocchi (circa ogni due settimane, dato il ritmo di 10 minuti a blocco), la rete confronta il tempo effettivamente impiegato per creare quei blocchi con il tempo teorico atteso, e regola di conseguenza il target visto nel Capitolo 2.

```
Se i blocchi sono stati creati PIÙ VELOCEMENTE del previsto:
    ──► la difficoltà AUMENTA (target più basso, più difficile)

Se i blocchi sono stati creati PIÙ LENTAMENTE del previsto:
    ──► la difficoltà DIMINUISCE (target più alto, più facile)
```

### Un'analogia utile: il termostato

Questo meccanismo funziona in modo molto simile a un termostato che regola automaticamente il riscaldamento di una stanza: non richiede alcun intervento umano né alcuna decisione centralizzata, ma si adatta automaticamente e in modo prevedibile alle condizioni reali della rete, mantenendo stabile e prevedibile il ritmo di creazione dei blocchi — un elemento cruciale, come vedremo nel Modulo 8, anche per la prevedibilità del meccanismo di Halving.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Gli Incentivi Economici del Mining

Il Proof of Work non è soltanto un meccanismo tecnico: è, prima di tutto, un sistema di **incentivi economici** progettato per rendere l'onestà la scelta più razionale e conveniente.

### Le due fonti di guadagno di un miner

* **Block Reward (ricompensa del blocco):** Una quantità di bitcoin di nuova creazione, assegnata esclusivamente al miner che risolve per primo il puzzle crittografico. Come visto nel Modulo 5, questa ricompensa si dimezza periodicamente attraverso il meccanismo dell'Halving.
* **Transaction Fee (commissioni di transazione):** Ogni utente che invia una transazione può includere una piccola commissione, che va interamente al miner che include quella transazione nel blocco. Con il progressivo dimezzarsi del block reward nel tempo, le commissioni sono destinate a diventare, in prospettiva, una componente sempre più rilevante del guadagno complessivo dei miner.

```
GUADAGNO TOTALE DEL MINER (per blocco)
        │
        ├── Block Reward (nuovi bitcoin, si dimezza ogni ~4 anni)
        │
        └── Somma delle Transaction Fee di tutte le transazioni incluse nel blocco
```

### Perché conviene essere onesti

Trovare un blocco richiede un investimento reale e significativo in hardware ed elettricità. Se un miner tentasse di includere transazioni fraudolente o blocchi non validi, gli altri nodi della rete (Capitolo 4 del Modulo 5) rifiuterebbero semplicemente quel blocco, vanificando l'intero investimento energetico sostenuto per trovarlo. Il sistema è costruito in modo che **imbrogliare costi più di quanto renda**, mentre comportarsi onestamente garantisce un guadagno certo e prevedibile.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Le Mining Pool: unire le forze

Con la crescita dell'hash rate globale della rete Bitcoin nel corso degli anni, la probabilità che un singolo miner individuale riesca a trovare un blocco da solo è diventata, in pratica, estremamente bassa.

### Cos'è una Mining Pool

Una **mining pool** è un gruppo di miner che uniscono la propria potenza di calcolo, condividendo la ricompensa ottenuta ogni volta che uno dei partecipanti del gruppo trova un blocco valido, in proporzione al contributo di calcolo fornito da ciascuno.

```
Miner A (piccolo hash rate) ──┐
Miner B (piccolo hash rate) ──┼──► MINING POOL ──► Blocco trovato! ──► Ricompensa
Miner C (piccolo hash rate) ──┘                                       ripartita
                                                                        proporzionalmente
```

### Il vantaggio e il rischio delle Pool

* **Vantaggio:** Trasformano un guadagno estremamente raro ma potenzialmente alto (l'intero block reward) in un flusso di guadagni piccoli ma costanti e prevedibili nel tempo.
* **Rischio — Centralizzazione:** Se poche mining pool arrivano a controllare collettivamente una quota troppo elevata dell'hash rate globale, si crea un rischio di concentrazione di potere che va in una certa tensione con l'ideale di decentralizzazione alla base di Bitcoin — un tema che riprenderemo nel Modulo 7 parlando dell'attacco del 51%.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — L'Impatto Energetico: un dibattito aperto

Nessun modulo sul mining sarebbe completo senza affrontare uno degli argomenti più discussi — e talvolta più semplificati — riguardo a Bitcoin: il suo consumo energetico.

### Perché il Proof of Work consuma energia

Come visto nel Capitolo 1, il Proof of Work richiede, per sua stessa natura, un consumo reale e significativo di elettricità: è proprio questo "costo" fisico e verificabile a rendere il sistema sicuro, rendendo economicamente svantaggioso ogni tentativo di manomissione (Capitolo 4).

### Un dibattito con argomenti da entrambe le parti

* **Argomenti critici:** Il consumo energetico complessivo della rete Bitcoin è paragonabile, secondo diverse stime, a quello di intere nazioni di medie dimensioni; alcuni osservatori evidenziano l'impatto ambientale di questo consumo, specialmente laddove l'energia utilizzata proviene da fonti fossili.
* **Argomenti a favore:** Diversi studi e rapporti di settore indicano una crescente quota di energia rinnovabile o comunque non sfruttata altrimenti (come il gas naturale che verrebbe altrimenti bruciato in torcia nei siti di estrazione petrolifera) nel mix energetico utilizzato dal mining; viene inoltre sottolineato come i miner tendano a localizzarsi dove l'energia è più economica, spesso coincidente con surplus di energia rinnovabile difficile da immagazzinare o trasportare altrove.

### Un approccio didattico equilibrato

Questo corso non ha l'obiettivo di prendere posizione in un dibattito che coinvolge dati in continua evoluzione, interessi economici contrapposti e valutazioni valoriali differenti. L'obiettivo è fornirti gli strumenti tecnici per **comprendere il meccanismo** che genera questo consumo energetico, in modo che tu possa valutare autonomamente le diverse fonti e argomentazioni che incontrerai al di fuori di questo corso, mantenendo un approccio critico verso dati e cifre spesso citati senza un adeguato contesto.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Dal Mining alla Sicurezza della Rete

Concludiamo questo modulo collegando quanto appreso al tema che affronteremo nel dettaglio nel prossimo modulo.

### Il mining come guardiano della rete

Ogni volta che un miner "spende" energia reale per trovare un blocco valido, sta contribuendo a rendere sempre più costoso, per un ipotetico attaccante, riscrivere la storia della Blockchain (come già anticipato nel Modulo 2, Capitolo 4). Più è alto l'hash rate complessivo della rete, più diventa proibitivo, in termini di risorse economiche e hardware necessarie, tentare di sovvertirla.

### Uno sguardo in avanti

Nel **Modulo 7 — Sicurezza della rete Bitcoin** approfondiremo cosa succederebbe se un singolo soggetto (o un gruppo coordinato) riuscisse a controllare la maggioranza dell'hash rate della rete — il celebre **attacco del 51%** — e per quale motivo, nonostante sia teoricamente possibile, risulti oggi economicamente proibitivo su una rete della dimensione e della sicurezza di Bitcoin.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Il Puzzle del Miner" e Autoverifica

### 💡 Punti Chiave del Modulo 6

1. Il **mining** consiste nel competere per trovare, tramite tentativi esaustivi, un valore di nonce che produca un hash del blocco inferiore a un target stabilito dal protocollo.
2. Non esiste alcuna scorciatoia matematica per trovare la soluzione: l'unico metodo è il **tentativo esaustivo**, reso possibile da un elevato **hash rate**.
3. La **difficoltà di rete** si auto-regola automaticamente ogni 2016 blocchi, mantenendo stabile il ritmo di circa 10 minuti per blocco indipendentemente dall'hash rate complessivo connesso.
4. I miner sono motivati da due incentivi economici: il **block reward** (nuovi bitcoin) e le **transaction fee**, un sistema progettato affinché l'onestà sia sempre la scelta più conveniente.
5. Le **mining pool** permettono ai piccoli miner di ottenere guadagni costanti, ma comportano un rischio di centralizzazione dell'hash rate.
6. L'**impatto energetico** del mining è oggetto di un dibattito articolato, con argomenti validi sia da parte dei critici sia dei sostenitori.

---

### 🧪 Laboratorio Guidato: "Il Puzzle del Miner"

**Obiettivo:** Simulare manualmente, con carta e penna (o con una semplice calcolatrice), il concetto di ricerca esaustiva del nonce alla base del Proof of Work.

* **Fase 1 — Definizione del "blocco" e del target:**
  * Scegli una breve frase che rappresenti i "dati" del tuo blocco (ad esempio, il tuo nome).
  * Definisci una regola semplificata di "hash": ad esempio, somma il valore numerico (posizione nell'alfabeto) di ogni lettera della frase, poi aggiungi il valore di un "nonce" che partirà da 0.
  * Stabilisci un target semplificato: ad esempio, "il risultato deve essere un multiplo di 7".

* **Fase 2 — Ricerca esaustiva:**
  * Prova il calcolo con nonce = 0, poi nonce = 1, poi nonce = 2, e così via, fino a trovare un risultato che soddisfi il target stabilito.
  * Annota quanti tentativi sono stati necessari per trovare la soluzione.

* **Fase 3 — Cambia la difficoltà:**
  * Ripeti l'esercizio rendendo il target più stringente (ad esempio, "multiplo di 49" invece che "di 7") e osserva come aumenta drasticamente il numero medio di tentativi necessari.
  * *Riflessione:* Collega questa osservazione al concetto di aggiustamento automatico della difficoltà (Capitolo 3): cosa succederebbe alla velocità di risoluzione del puzzle se, improvvisamente, il doppio dei tuoi compagni di classe iniziasse a fare lo stesso calcolo in parallelo?

* **Fase 4 — Discussione in classe:** Confronta con i compagni il numero di tentativi necessari nei due scenari (target facile e target difficile) e collega l'osservazione al concetto di **hash rate** e al relativo consumo di "energia" (in questo caso, il tempo e lo sforzo mentale impiegato) discusso nel Capitolo 6.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa cerca effettivamente di trovare un miner durante il processo di mining?  
- A) Bitcoin già esistenti nascosti all'interno della Blockchain.  
- B) Un valore di nonce che, combinato con i dati del blocco, produca un hash inferiore al target stabilito dal protocollo.  
- C) L'identità di Satoshi Nakamoto.  
- D) La chiave privata di un altro utente della rete.

**Domanda 2:** Cosa garantisce, ogni circa due settimane, l'aggiustamento automatico della difficoltà di rete?  
- A) Un aumento costante e prevedibile della ricompensa dei miner.  
- B) Il mantenimento di un ritmo medio stabile di circa 10 minuti per blocco, indipendentemente dall'hash rate complessivo.  
- C) La riduzione automatica del consumo energetico della rete.  
- D) L'eliminazione automatica dei miner meno efficienti.

**Domanda 3:** Da cosa è composto il guadagno economico complessivo di un miner per ogni blocco trovato?  
- A) Solo dal block reward.  
- B) Solo dalle transaction fee.  
- C) Dalla somma di block reward e transaction fee.  
- D) Da una commissione fissa pagata direttamente da Satoshi Nakamoto.

**Domanda 4:** Qual è il principale rischio associato alla crescente diffusione delle mining pool?  
- A) L'impossibilità di trovare mai più nuovi blocchi.  
- B) Un possibile rischio di centralizzazione dell'hash rate in poche mani.  
- C) L'aumento incontrollato dell'offerta massima di bitcoin.  
- D) La disattivazione automatica del meccanismo di Proof of Work.

---

[🔙 Torna all'indice](#indice)