# ⛓️ Modulo 5 — Bitcoin dalla A alla Z

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟢 Base (Fase 3 — Bitcoin)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 1 — Perché nasce la Blockchain, Modulo 2 — Come funziona una Blockchain, Modulo 3 — Crittografia per tutti, Modulo 4 — Wallet, chiavi e firme digitali  
> **Obiettivo Didattico:** Ricostruire la storia e il contesto di nascita di Bitcoin, analizzare i punti chiave del whitepaper originale, comprendere l'architettura della rete, il modello delle transazioni (UTXO) e il meccanismo dell'offerta limitata.

---

<a id="indice"></a>
# 📑 Indice del Modulo 5

1. [Capitolo 1 — Il Contesto Storico: la crisi del 2008 e la nascita di Bitcoin](#capitolo-1)
2. [Capitolo 2 — Il Whitepaper di Satoshi Nakamoto](#capitolo-2)
3. [Capitolo 3 — Chi (o cosa) è Satoshi Nakamoto?](#capitolo-3)
4. [Capitolo 4 — L'Architettura della Rete Bitcoin](#capitolo-4)
5. [Capitolo 5 — Il Modello UTXO: come funzionano davvero le transazioni](#capitolo-5)
6. [Capitolo 6 — L'Offerta Limitata: 21 milioni e l'Halving](#capitolo-6)
7. [Capitolo 7 — Bitcoin Oggi: da esperimento a asset globale](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Esplora una Transazione Reale" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il Contesto Storico: la crisi del 2008 e la nascita di Bitcoin

Nessuna tecnologia nasce nel vuoto. Per comprendere davvero Bitcoin, dobbiamo prima capire il contesto storico ed economico in cui è comparso.

### La crisi finanziaria globale del 2008

Nel 2008 il mondo attraversò una delle crisi finanziarie più gravi della storia moderna, innescata dal collasso del mercato dei mutui subprime statunitensi e dal successivo fallimento di importanti istituzioni bancarie. Governi e banche centrali intervennero massicciamente per salvare banche considerate "troppo grandi per fallire" (*too big to fail*), spesso con denaro pubblico, mentre milioni di cittadini subivano le conseguenze economiche della crisi.

Questo evento alimentò un crescente scetticismo verso i sistemi finanziari centralizzati e le istituzioni che, secondo molti osservatori, avevano concentrato rischi eccessivi senza un'adeguata trasparenza né un vero controllo diffuso.

### Un messaggio nascosto nella storia

Il 3 gennaio 2009, all'interno del primo blocco mai creato sulla rete Bitcoin (il **Blocco Genesis**, già incontrato nel Modulo 2), venne inserito un messaggio permanente, ancora oggi leggibile da chiunque:

> *"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"*

Questa frase, tratta dal titolo di un articolo del quotidiano britannico *The Times* pubblicato proprio quel giorno, viene comunemente interpretata come una dichiarazione d'intenti: da un lato prova pubblicamente che il blocco non poteva essere stato creato prima di quella data, dall'altro sembra sottolineare la motivazione ideologica alla base del progetto — offrire un'alternativa a un sistema finanziario percepito come fragile e non trasparente.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Il Whitepaper di Satoshi Nakamoto

Il 31 ottobre 2008, poche settimane dopo l'apice della crisi finanziaria, venne pubblicato un documento destinato a cambiare la storia della tecnologia: **"Bitcoin: A Peer-to-Peer Electronic Cash System"**.

### Cos'è un whitepaper

Un whitepaper è un documento tecnico che presenta in modo strutturato un progetto, le sue motivazioni e le soluzioni tecniche proposte. Quello di Bitcoin è straordinariamente conciso: appena nove pagine, eppure sufficienti a gettare le basi di un'intera industria.

### I punti chiave del documento

* **Il problema individuato:** I sistemi di pagamento digitale esistenti richiedevano sempre un intermediario finanziario fidato (una banca, un istituto di pagamento) per prevenire il **problema della doppia spesa** (*double spending*) — il rischio che una stessa unità di denaro digitale venga spesa due volte.
* **La soluzione proposta:** Un sistema di **cash elettronico peer-to-peer** che permettesse pagamenti diretti tra due parti, senza passare da un'istituzione finanziaria, risolvendo il problema della doppia spesa attraverso una rete distribuita di nodi e una prova crittografica del consenso (il **Proof of Work**, che approfondiremo nel Modulo 6).
* **I concetti che già conosciamo:** Nel documento sono già presenti, in forma seminale, tutti i concetti affrontati nei moduli precedenti di questo corso: blocchi concatenati tramite hash (Modulo 2), firme digitali basate su crittografia asimmetrica (Modulo 3 e 4) e un registro pubblico condiviso da una rete di nodi.

### Perché è un documento fondativo

Ciò che rende straordinario il whitepaper di Bitcoin non è tanto l'invenzione di tecnologie del tutto nuove — hashing, firme digitali e reti peer-to-peer esistevano già da decenni nella letteratura accademica — quanto la loro **combinazione originale** in un sistema funzionante, capace di risolvere per la prima volta il problema del consenso distribuito (Modulo 2) senza alcuna autorità centrale.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Chi (o cosa) è Satoshi Nakamoto?

Uno degli aspetti più affascinanti — e ancora oggi irrisolti — della storia di Bitcoin riguarda l'identità del suo creatore.

### Un mistero volontario

"Satoshi Nakamoto" è lo pseudonimo utilizzato dalla persona (o dal gruppo di persone) che pubblicò il whitepaper e sviluppò il software originale di Bitcoin. Dopo aver contribuito attivamente al progetto per circa due anni, comunicando attraverso forum e email, Satoshi smise progressivamente di intervenire pubblicamente a partire dal 2010, senza mai rivelare la propria identità.

Nel corso degli anni, diverse persone sono state candidate o si sono autoproclamate come il vero Satoshi Nakamoto, ma nessuna di queste ipotesi ha mai ricevuto una conferma tecnica o giuridica definitiva e universalmente accettata.

### Perché l'anonimato non è un dettaglio marginale

Questo aspetto, lungi dall'essere una semplice curiosità, riflette perfettamente la filosofia di fondo del progetto: **Bitcoin non dipende dalla fiducia in una persona, un'azienda o un'autorità specifica**, ma unicamente dalle regole matematiche e crittografiche incorporate nel suo protocollo, verificabili pubblicamente da chiunque. L'assenza di un leader identificabile ha contribuito, nel tempo, a rafforzare la natura decentralizzata e resiliente del progetto.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — L'Architettura della Rete Bitcoin

Riprendiamo ora i concetti di rete distribuita visti nel Modulo 2, applicandoli nello specifico al funzionamento della rete Bitcoin.

### I diversi tipi di nodo

* **Full Node (Nodo completo):** Scarica, verifica e conserva l'intera storia della Blockchain di Bitcoin (diverse centinaia di gigabyte), controllando autonomamente che ogni transazione e ogni blocco rispettino tutte le regole del protocollo. Chiunque può eseguirne uno gratuitamente su un proprio computer.
* **Miner (Nodo minatore):** Un full node specializzato che partecipa attivamente al meccanismo di **Proof of Work** (Modulo 6), competendo per la creazione di nuovi blocchi e ricevendo una ricompensa economica in cambio.
* **Light Node (SPV Client):** Utilizzato tipicamente dai wallet su smartphone, non scarica l'intera Blockchain ma si affida ai full node della rete per verificare in modo semplificato le proprie transazioni, offrendo un compromesso tra sicurezza e leggerezza.

```
                       RETE BITCOIN (P2P)
   ┌───────────┐    ┌───────────┐    ┌───────────┐
   │ Full Node  │◄──►│  Miner    │◄──►│ Full Node  │
   │ (verifica) │    │ (verifica  │    │ (verifica) │
   │            │    │ + crea blocchi)│            │
   └───────────┘    └───────────┘    └───────────┘
         ▲                                   ▲
         │                                   │
   ┌───────────┐                       ┌───────────┐
   │ Light Node │                       │ Light Node │
   │ (wallet    │                       │ (wallet    │
   │  smartphone)│                       │  smartphone)│
   └───────────┘                       └───────────┘
```

### Una rete davvero globale

A differenza di un servizio centralizzato che dipende da server specifici gestiti da un'unica azienda, la rete Bitcoin è composta da migliaia di nodi indipendenti, gestiti da privati, aziende e organizzazioni sparse in tutto il mondo, senza alcun punto di controllo unico che possa essere spento, censurato o sequestrato nella sua interezza.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Il Modello UTXO: come funzionano davvero le transazioni

Nel Modulo 4 abbiamo visto in modo generale come funziona la firma di una transazione. Bitcoin, in particolare, utilizza un modello contabile specifico e molto diverso da quello a cui siamo abituati con un normale conto bancario: il modello **UTXO**.

### Cos'è uno UTXO

**UTXO** è l'acronimo di *Unspent Transaction Output*, ovvero "output di transazione non speso". A differenza di un conto bancario, dove esiste un singolo saldo aggiornato costantemente, Bitcoin non conserva alcun "saldo" per un indirizzo: il saldo effettivo viene **calcolato al volo** sommando tutti gli UTXO associati a quell'indirizzo.

### Un'analogia con il denaro contante

Il modello UTXO funziona in modo sorprendentemente simile a un portafoglio fisico pieno di banconote di taglio diverso:

* Se possiedi banconote da 20€ e 10€ e vuoi pagare 25€, non puoi "tagliare" una banconota: devi usare entrambe le banconote (30€ di input) e ricevere 5€ di resto come nuova "banconota" (nuovo UTXO).

```
INPUT (UTXO esistenti)              OUTPUT (nuovi UTXO creati)
───────────────────────             ───────────────────────────
UTXO A: 20 BTC  ──┐                 
                    ├──► TRANSAZIONE ──┬──► 25 BTC → Destinatario (nuovo UTXO)
UTXO B: 10 BTC  ──┘                    └──► 5 BTC → "Resto" al mittente (nuovo UTXO)
                                              (al netto della commissione di rete)
```

### Le conseguenze pratiche di questo modello

* Ogni transazione **consuma completamente** uno o più UTXO esistenti come input e **crea** uno o più nuovi UTXO come output: non esistono "modifiche parziali" a un UTXO.
* Il "saldo" di un wallet Bitcoin, mostrato dalle interfacce grafiche per comodità, è in realtà sempre il risultato della somma di tutti gli UTXO non ancora spesi associati ai suoi indirizzi.
* Questo modello, sebbene inizialmente meno intuitivo rispetto a un semplice saldo bancario, offre vantaggi significativi in termini di **verificabilità**, **parallelizzazione** e **privacy**, poiché ogni transazione può essere validata in modo indipendente senza dover ricostruire l'intera cronologia di un account.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — L'Offerta Limitata: 21 milioni e l'Halving

Una delle caratteristiche più distintive di Bitcoin, spesso citata anche al di fuori degli ambienti tecnici, è la sua **offerta massima fissa**.

### Il tetto dei 21 milioni

Il protocollo Bitcoin stabilisce, fin dal codice originale, che non potranno mai essere creati più di **21 milioni di bitcoin** in totale. Questo limite non è una promessa o una policy modificabile a piacimento: è una regola matematica incorporata nel protocollo stesso, che ogni full node verifica e fa rispettare automaticamente (Capitolo 4).

### Il meccanismo dell'Halving

Nuovi bitcoin vengono immessi in circolazione esclusivamente come ricompensa ai miner che creano nuovi blocchi (approfondiremo il meccanismo nel Modulo 6). Circa ogni **quattro anni** (più precisamente, ogni 210.000 blocchi), questa ricompensa viene **dimezzata** attraverso un evento chiamato **Halving**.

```
Anno    Ricompensa per blocco
2009    50 BTC
2012    25 BTC   (1° Halving)
2016    12,5 BTC (2° Halving)
2020    6,25 BTC (3° Halving)
2024    3,125 BTC (4° Halving)
  …     … (il dimezzamento prosegue fino al raggiungimento
            del tetto di 21 milioni, atteso intorno al 2140)
```

### Perché questo meccanismo è rilevante

Questo schema di emissione decrescente e prevedibile è spesso paragonato a quello di risorse naturali scarse (come l'oro), ed è la ragione per cui Bitcoin viene talvolta descritto con l'espressione "**oro digitale**". È importante, da un punto di vista didattico, distinguere con chiarezza tra:

* un **fatto tecnico verificabile**: l'offerta è programmaticamente limitata e l'emissione segue una curva prevedibile e trasparente;
* una **valutazione economica o di investimento**: se e come questa scarsità si traduca in valore di mercato è un tema complesso, dipendente da molteplici fattori (domanda, adozione, contesto macroeconomico) che esula dagli obiettivi tecnici di questo corso.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Bitcoin Oggi: da esperimento a asset globale

A più di 15 anni dalla pubblicazione del whitepaper, il percorso di Bitcoin offre uno spaccato interessante di come una tecnologia possa evolvere nella percezione pubblica.

### Un'evoluzione di percezione

Bitcoin è passato, nel corso degli anni, dall'essere un esperimento noto quasi esclusivamente a piccole comunità di crittografi e sviluppatori, a diventare un argomento discusso da banche centrali, governi, media generalisti e istituzioni finanziarie di primo piano.

### Alcuni sviluppi rilevanti da conoscere

* **Adozione istituzionale:** Diverse aziende quotate in borsa e fondi d'investimento hanno iniziato, nel corso degli anni, a detenere bitcoin nei propri bilanci o a offrire prodotti finanziari regolamentati che ne replicano l'andamento.
* **Riconoscimento normativo:** Diversi paesi hanno sviluppato quadri normativi specifici per disciplinare l'utilizzo, la tassazione e lo scambio di Bitcoin e delle altre criptovalute, con approcci molto diversi tra loro a seconda della giurisdizione.
* **Persistenza tecnica:** Dal blocco Genesis del gennaio 2009, la rete Bitcoin non ha mai smesso di funzionare, elaborando ininterrottamente nuovi blocchi ogni circa dieci minuti — un dato tecnico che, indipendentemente da ogni valutazione economica, rappresenta un caso di studio più unico che raro in termini di continuità operativa di un sistema informatico distribuito su scala globale.

### Uno sguardo critico e bilanciato

Come per ogni tecnologia dirompente, il dibattito pubblico su Bitcoin rimane tuttora aperto e articolato: sostenitori ne sottolineano il potenziale come riserva di valore alternativa e strumento di inclusione finanziaria, mentre critici ne evidenziano la volatilità di prezzo, l'impatto energetico del mining (che approfondiremo nel Modulo 6) e le difficoltà di scalabilità per un uso quotidiano come mezzo di pagamento — un problema a cui, come vedremo nel Modulo 8, la comunità ha risposto sviluppando soluzioni di "secondo livello" come la Lightning Network.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Esplora una Transazione Reale" e Autoverifica

### 💡 Punti Chiave del Modulo 5

1. Bitcoin nasce nel contesto della **crisi finanziaria del 2008**, come risposta alla sfiducia crescente verso i sistemi finanziari centralizzati.
2. Il **whitepaper** di Satoshi Nakamoto (ottobre 2008) descrive per la prima volta un sistema di cash elettronico peer-to-peer capace di risolvere il problema della doppia spesa senza intermediari.
3. L'identità di **Satoshi Nakamoto** rimane tuttora sconosciuta — un fatto coerente con la filosofia di un sistema che non dipende dalla fiducia in una singola persona.
4. La rete Bitcoin è composta da **full node, miner e light node**, distribuiti globalmente senza alcun punto di controllo centrale.
5. Le transazioni Bitcoin seguono il modello **UTXO**: non esiste un saldo memorizzato, ma solo la somma di "output non spesi" associati a un indirizzo.
6. L'offerta di Bitcoin è **limitata a 21 milioni di unità**, con un'emissione decrescente regolata dal meccanismo dell'**Halving** circa ogni quattro anni.

---

### 🧪 Laboratorio Guidato: "Esplora una Transazione Reale"

**Obiettivo:** Utilizzare un **block explorer** (uno strumento pubblico e gratuito che permette di consultare la Blockchain di Bitcoin in tempo reale) per osservare concretamente i concetti teorici di questo modulo applicati a dati reali.

* **Fase 1 — Accesso a un block explorer:** Con la guida del docente, apri un block explorer pubblico per Bitcoin (ne esistono diversi, gratuiti e liberamente consultabili senza necessità di registrazione).
* **Fase 2 — Osserva un blocco recente:** Individua l'ultimo blocco aggiunto alla catena. Annota: quante transazioni contiene, quanto tempo è trascorso dal blocco precedente, e prova a individuare l'hash del blocco e l'hash del blocco precedente (Modulo 2).
* **Fase 3 — Analizza una singola transazione:** Apri il dettaglio di una transazione a scelta e individua: gli **input** (gli UTXO consumati) e gli **output** (i nuovi UTXO creati), inclusa l'eventuale voce di "resto" verso il mittente, come descritto nel Capitolo 5.
* **Fase 4 — Verifica il Blocco Genesis:** Cerca il blocco numero 0 della catena (il Blocco Genesis) e prova a individuare, tra i suoi dati, il celebre messaggio nascosto citato nel Capitolo 1.
* **Riflessione conclusiva:** Nessuno di questi dati è stato "richiesto" a un'autorità centrale: sono tutti pubblicamente e liberamente verificabili da chiunque, in qualunque momento. In cosa questo è diverso dalla possibilità di consultare i movimenti del tuo conto corrente bancario?

---

### ❓ Quiz di Autoverifica

**Domanda 1:** In quale contesto storico venne pubblicato il whitepaper di Bitcoin?  
- A) Durante la crisi finanziaria globale del 2008.  
- B) Subito dopo l'invenzione di Internet, negli anni '90.  
- C) Dopo l'introduzione dell'euro in Europa.  
- D) Durante la pandemia del 2020.

**Domanda 2:** Qual è il problema principale che il whitepaper di Bitcoin si proponeva di risolvere?  
- A) La lentezza delle connessioni Internet.  
- B) Il problema della doppia spesa in un sistema di pagamento digitale senza intermediari.  
- C) La creazione di un nuovo linguaggio di programmazione.  
- D) La sicurezza delle password online.

**Domanda 3:** Cosa rappresenta uno UTXO?  
- A) Il saldo totale memorizzato per un indirizzo Bitcoin.  
- B) Un output di una transazione precedente non ancora speso, utilizzabile come input in una nuova transazione.  
- C) Un tipo di nodo della rete Bitcoin.  
- D) La commissione pagata per una transazione.

**Domanda 4:** Cosa avviene, circa ogni quattro anni, durante l'evento chiamato "Halving"?  
- A) Il numero massimo di bitcoin (21 milioni) viene aumentato.  
- B) La ricompensa in bitcoin assegnata ai miner per ogni nuovo blocco viene dimezzata.  
- C) La rete Bitcoin si ferma per manutenzione.  
- D) Vengono generati automaticamente nuovi wallet per tutti gli utenti.

---

[🔙 Torna all'indice](#indice)