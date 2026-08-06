# ⛓️ Modulo 4 — Wallet, chiavi e firme digitali

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟢 Base (Fase 2 — Crittografia e Sicurezza Digitale)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 3 — Crittografia per tutti  
> **Obiettivo Didattico:** Comprendere cos'è realmente un wallet, come vengono generate e collegate chiavi private, chiavi pubbliche e seed phrase, come funziona la firma digitale di una transazione e quali sono le best practice di sicurezza fondamentali per proteggere i propri fondi.

---

<a id="indice"></a>
# 📑 Indice del Modulo 4

1. [Capitolo 1 — Cos'è (davvero) un Wallet](#capitolo-1)
2. [Capitolo 2 — Dalla Chiave Privata all'Indirizzo: il ripasso](#capitolo-2)
3. [Capitolo 3 — La Seed Phrase: la chiave madre di tutte le chiavi](#capitolo-3)
4. [Capitolo 4 — Tipi di Wallet: Hot, Cold, Custodial e Non-Custodial](#capitolo-4)
5. [Capitolo 5 — La Firma Digitale di una Transazione, passo dopo passo](#capitolo-5)
6. [Capitolo 6 — Best Practice di Sicurezza](#capitolo-6)
7. [Capitolo 7 — Errori Comuni e Rischi da Conoscere](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Il Mio Primo Wallet" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è (davvero) un Wallet

Il termine "wallet" (portafoglio) è probabilmente uno dei più fraintesi in ambito Blockchain. È il momento di chiarire subito un equivoco fondamentale.

### Un wallet non "contiene" criptovalute

A differenza di un portafoglio fisico, che contiene fisicamente banconote e monete, un **wallet digitale non contiene alcuna criptovaluta al suo interno**. Come abbiamo visto nel Modulo 2, i fondi esistono soltanto come registrazioni all'interno del registro distribuito, condiviso tra tutti i nodi della rete.

### Cosa contiene davvero un wallet, allora?

Un wallet è, più precisamente, uno strumento che **genera, custodisce e utilizza le tue chiavi crittografiche** (Modulo 3), permettendoti di:

* dimostrare la proprietà dei fondi associati a un determinato indirizzo;
* **firmare digitalmente** le transazioni, autorizzandole;
* consultare il saldo e la cronologia delle transazioni, interrogando la Blockchain.

```
                    ┌───────────────────┐
                    │       WALLET       │
                    │                     │
                    │  🔑 Chiave Privata  │  ← il vero "tesoro" da proteggere
                    │  🔓 Chiave Pubblica │
                    │  📍 Indirizzo       │  ← derivato dalla chiave pubblica (Modulo 3)
                    └───────────────────┘
                              │
                              ▼
             I fondi NON sono qui dentro: esistono
             solo come voci nel registro distribuito
                     (la Blockchain stessa)
```

Una metafora efficace: il wallet è più simile a un **mazzo di chiavi di casa** che a una cassaforte. La casa (i tuoi fondi) esiste altrove — nel registro pubblico — ma solo chi possiede le chiavi giuste può entrarci e disporne.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Dalla Chiave Privata all'Indirizzo: il ripasso

Nel Modulo 3 abbiamo già incontrato questo percorso. Lo riprendiamo qui in modo più operativo, perché è esattamente ciò che avviene "dietro le quinte" ogni volta che crei un wallet.

### La catena di generazione

```
① Generazione casuale        ② Derivazione matematica       ③ Funzione di Hash
   CHIAVE PRIVATA      ────►     CHIAVE PUBBLICA       ────►    INDIRIZZO WALLET
   (numero segreto                (curva ellittica,             (es. 0x71C7656E...)
    enorme e casuale)               Modulo 3)                    pubblico e condivisibile
```

* **Passo 1:** Un generatore di numeri casuali crittograficamente sicuro produce la chiave privata: un numero enorme, praticamente impossibile da indovinare per tentativi (parliamo di probabilità paragonabili a vincere la lotteria miliardi di miliardi di volte di fila).
* **Passo 2:** Attraverso un algoritmo di derivazione (basato sulla crittografia a curve ellittiche), la chiave privata genera in modo deterministico la corrispondente chiave pubblica. Questo passaggio è **irreversibile**: dalla chiave pubblica non si può mai risalire alla chiave privata.
* **Passo 3:** La chiave pubblica viene ulteriormente elaborata tramite funzioni di hash (Modulo 2 e 3) per ottenere l'indirizzo del wallet, la stringa che condividi con altri per ricevere fondi.

### Un punto essenziale da fissare

Ogni volta che qualcuno ti chiede il tuo indirizzo per inviarti fondi, **stai condividendo solo l'ultimo anello della catena**. La chiave privata, il vero elemento che garantisce il controllo dei fondi, non deve mai lasciare le tue mani. Questo principio sarà centrale in tutto il resto del modulo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — La Seed Phrase: la chiave madre di tutte le chiavi

Se un wallet moderno gestisse una singola coppia di chiavi per ogni indirizzo, ricordare e mettere al sicuro decine di chiavi private diverse diventerebbe rapidamente impraticabile. È qui che entra in gioco una delle invenzioni più importanti nella storia dei wallet: la **seed phrase**.

### Cos'è una Seed Phrase

Una seed phrase (detta anche *frase mnemonica* o *recovery phrase*) è una sequenza di **12 o 24 parole**, scelte da un elenco standardizzato di 2048 parole in lingua inglese (lo standard tecnico si chiama **BIP-39**), che rappresenta in modo leggibile per l'essere umano un unico grande numero casuale: il **seed**, ovvero il "seme" da cui vengono derivate **tutte** le chiavi private del wallet.

```
"witch collapse practice feed shame open despair creek road again ice least"
                              │
                              ▼  (algoritmo di derivazione gerarchica, standard BIP-32/BIP-44)
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
       Chiave privata    Chiave privata   Chiave privata
        Indirizzo 1        Indirizzo 2      Indirizzo 3
              …                …                …
```

### Perché è un'innovazione fondamentale

* **Un solo backup per infiniti indirizzi:** Un wallet "gerarchico deterministico" (*HD Wallet*) può generare un numero praticamente illimitato di coppie di chiavi a partire da un'unica seed phrase, semplificando enormemente il backup.
* **Portabilità:** La stessa seed phrase può essere reinserita in un wallet diverso (anche di un produttore diverso, se compatibile con lo standard BIP-39) per recuperare l'accesso completo a tutti i fondi, ad esempio in caso di smarrimento o rottura del dispositivo originale.

### Un'equivalenza da comprendere bene

Conoscere la seed phrase di qualcuno equivale a conoscere **tutte** le sue chiavi private, presenti e future. Per questo la seed phrase è, senza esagerazione, **l'informazione più sensibile dell'intero ecosistema Blockchain** — un concetto su cui torneremo con forza nel Capitolo 6.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Tipi di Wallet: Hot, Cold, Custodial e Non-Custodial

Non tutti i wallet offrono lo stesso livello di sicurezza e comodità. È importante conoscere le principali categorie per fare scelte consapevoli.

### Prima distinzione: Hot Wallet vs Cold Wallet

| Caratteristica | 🔥 Hot Wallet | ❄️ Cold Wallet |
|---|---|---|
| **Connessione a Internet** | Sempre connesso (app mobile, estensione browser) | Offline, scollegato dalla rete |
| **Comodità d'uso** | Molto elevata, ideale per operazioni frequenti | Più macchinoso, pensato per la custodia a lungo termine |
| **Esposizione al rischio** | Più vulnerabile ad attacchi informatici (malware, phishing) | Praticamente immune agli attacchi da remoto |
| **Esempio tipico** | Wallet da browser o smartphone | Hardware wallet (dispositivo fisico dedicato) |

### Seconda distinzione: Custodial vs Non-Custodial

* **Wallet Custodial:** La chiave privata è generata e custodita da un soggetto terzo (tipicamente un exchange centralizzato). È più semplice da usare per un principiante, ma introduce un elemento di fiducia: "*Not your keys, not your coins*" (se non possiedi tu le chiavi, non possiedi davvero i fondi) è un principio molto diffuso in ambito Blockchain.
* **Wallet Non-Custodial:** La chiave privata è generata e custodita esclusivamente dall'utente, senza alcun intermediario. Offre il pieno controllo, ma anche piena responsabilità: **non esiste alcun servizio clienti in grado di recuperare una chiave privata perduta**.

```
                    CUSTODIA DELLE CHIAVI
   ┌─────────────────────┬─────────────────────────┐
   │      Custodial       │      Non-Custodial       │
   │  (terze parti gestiscono│  (l'utente gestisce     │
   │   le chiavi per te)     │   le proprie chiavi)     │
   │                       │                          │
   │  ✅ Più semplice       │  ✅ Pieno controllo       │
   │  ⚠️ Devi fidarti        │  ⚠️ Piena responsabilità  │
   │     di un terzo         │     personale             │
   └─────────────────────┴─────────────────────────┘
```

Questa scelta — comodità contro controllo assoluto — è uno dei primi grandi compromessi (*trade-off*) che ogni utente Blockchain deve imparare a valutare consapevolmente.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — La Firma Digitale di una Transazione, passo dopo passo

Uniamo ora tutti i concetti visti finora per capire cosa accade realmente quando invii una transazione su una Blockchain.

### Il flusso completo di una transazione

```
① COSTRUZIONE                ② FIRMA                    ③ TRASMISSIONE
Il wallet costruisce   ──►  Il wallet firma la     ──►  La transazione firmata
un messaggio con:            transazione usando           viene inviata alla rete
- Mittente                   la CHIAVE PRIVATA             P2P (Modulo 2)
- Destinatario                dell'utente
- Importo
- Commissione (fee)


④ VERIFICA                              ⑤ INCLUSIONE NEL BLOCCO
I nodi della rete verificano   ──►     Se la firma è valida, la transazione
la firma usando la CHIAVE               viene inclusa in un nuovo blocco
PUBBLICA del mittente (nota            (meccanismo di consenso, Modulo 6-7)
a tutti, Modulo 3)
```

### Perché questo sistema è affidabile

* Solo chi possiede la chiave privata corrispondente può produrre una firma valida per quell'indirizzo: è **matematicamente impossibile** falsificarla senza conoscere la chiave privata.
* Chiunque, in qualunque parte del mondo, può verificare autonomamente la validità della firma usando solamente la chiave pubblica (pubblica per definizione), **senza bisogno di fidarsi di nessuno**.
* Una volta firmata, la transazione non può essere alterata: qualsiasi modifica ai dati (importo, destinatario) invaliderebbe immediatamente la firma, esattamente come l'effetto valanga visto nel Modulo 2 per gli hash dei blocchi.

Questo è il motivo per cui, in ambito Blockchain, si dice spesso che **"il codice è legge"**: non serve un giudice o un notaio per stabilire se una transazione è autentica, basta verificarne la firma crittografica.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Best Practice di Sicurezza

Dopo aver compreso il funzionamento tecnico, è il momento di tradurlo in regole pratiche di comportamento. In ambito Blockchain, **la sicurezza è quasi interamente responsabilità dell'utente**.

### Le regole d'oro

* **Non condividere mai la seed phrase con nessuno.** Nessun servizio, exchange o "supporto tecnico" legittimo la chiederà mai. Chiunque la richieda è, con certezza, un tentativo di truffa.
* **Non digitare mai la seed phrase su un sito web o in un documento digitale connesso a Internet.** Il metodo più sicuro resta la trascrizione su carta (o su supporti metallici resistenti al fuoco e all'acqua, per una custodia più duratura), conservata in un luogo fisico sicuro.
* **Diffida di ogni messaggio urgente.** Le truffe più diffuse (*phishing*) fanno leva sulla fretta ("il tuo wallet sarà bloccato entro 24 ore!") per spingere la vittima ad agire senza riflettere.
* **Verifica sempre gli indirizzi prima di inviare fondi.** Alcuni malware sono progettati per sostituire silenziosamente l'indirizzo copiato negli appunti con uno controllato dall'attaccante.
* **Usa un cold wallet per importi significativi destinati alla custodia a lungo termine**, riservando un hot wallet solo alle operazioni quotidiane con importi limitati.

### Un principio guida

> *"Be your own bank"* (sii la tua stessa banca) è una delle promesse più affascinanti della Blockchain — ma comporta anche le stesse responsabilità di sicurezza che, normalmente, sono delegate a un istituto bancario regolamentato.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Errori Comuni e Rischi da Conoscere

Conoscere i rischi più diffusi è il modo migliore per imparare a riconoscerli in anticipo.

### I rischi più frequenti

* **Phishing:** Siti web o email che imitano perfettamente un servizio legittimo, con l'unico scopo di indurre l'utente a inserire la propria seed phrase su una pagina falsa.
* **Wallet Drainer:** Applicazioni o siti malevoli che, una volta ottenuta un'autorizzazione (spesso concessa distrattamente dall'utente), possono svuotare automaticamente il wallet collegato.
* **Screenshot e cloud storage:** Salvare una fotografia della seed phrase sul proprio smartphone o caricarla su un servizio cloud espone quell'informazione a chiunque violi quell'account.
* **Social engineering:** Tecniche di manipolazione psicologica (false vincite, finti recuperi urgenti, falsi profili di "supporto") progettate per convincere la vittima a rivelare volontariamente le proprie chiavi.

### Una regola pratica per riconoscere una truffa

```
Qualcuno ti chiede la seed phrase o la chiave privata?
                    │
                    ▼
        È SEMPRE un tentativo di truffa.
        Nessuna eccezione, nessun caso legittimo.
```

Questo principio, per quanto ripetitivo possa sembrare, è la singola regola di sicurezza più importante dell'intero ecosistema Blockchain, e verrà richiamata più volte anche nei moduli dedicati alla DeFi e agli Smart Contract.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Il Mio Primo Wallet" e Autoverifica

### 💡 Punti Chiave del Modulo 4

1. Un **wallet** non contiene fondi: genera e custodisce le chiavi crittografiche che permettono di dimostrarne la proprietà e di firmare le transazioni.
2. La catena **chiave privata → chiave pubblica → indirizzo** è irreversibile: solo l'ultimo anello va condiviso pubblicamente.
3. La **seed phrase** (12 o 24 parole, standard BIP-39) è il "seme" da cui derivano tutte le chiavi di un wallet gerarchico deterministico: conoscerla equivale a possedere l'intero wallet.
4. Esistono diverse categorie di wallet: **hot/cold** (in base alla connessione a Internet) e **custodial/non-custodial** (in base a chi detiene le chiavi).
5. Ogni transazione viene **firmata digitalmente** con la chiave privata del mittente e **verificata pubblicamente** tramite la sua chiave pubblica.
6. La sicurezza dei fondi è responsabilità quasi esclusiva dell'utente: **nessuno chiederà mai legittimamente la tua seed phrase.**

---

### 🧪 Laboratorio Guidato: "Il Mio Primo Wallet"

**Obiettivo:** Comprendere in modo concreto, passo dopo passo, il processo di creazione di un wallet — **senza depositare né movimentare denaro reale**. Questo laboratorio è puramente dimostrativo e concettuale.

> ⚠️ **Avvertenza importante:** In questa fase del corso non utilizziamo ancora un wallet reale collegato a fondi veri. L'obiettivo è comprendere il *processo*, non operare con criptovalute. Approfondiremo l'uso pratico e sicuro di strumenti come MetaMask nei moduli dedicati a Ethereum (Fase 4).

* **Fase 1 — Simulazione della generazione della seed phrase:**
  * Su un foglio, annota 12 parole a caso scelte insieme al resto della classe (per la simulazione, non serve rispettare l'elenco ufficiale BIP-39). Questo rappresenta la tua "seed phrase dimostrativa".
  * Numera ogni parola nell'ordine esatto in cui è stata scelta: nella seed phrase reale, **l'ordine delle parole è determinante** quanto le parole stesse.

* **Fase 2 — Derivazione simbolica delle chiavi:**
  * Assegna a ogni parola un numero (posizione nell'alfabeto della prima lettera) e sommali tutti: il risultato rappresenta, in modo semplificato, la tua "chiave privata dimostrativa".
  * Applica una regola concordata in classe (ad esempio, raddoppia il numero ottenuto) per ricavare la tua "chiave pubblica dimostrativa".

* **Fase 3 — Simulazione della firma di una transazione:**
  * Scrivi su un foglio una transazione fittizia: "Invio 10 punti a [nome di un compagno]".
  * "Firma" il messaggio scrivendo accanto la tua chiave privata dimostrativa.
  * Un compagno, senza conoscere la tua chiave privata ma conoscendo solo la tua chiave pubblica dimostrativa, prova a "verificare" se la firma sembra plausibile, seguendo la stessa regola concordata nella Fase 2.
  * *Riflessione:* Cosa succederebbe se qualcuno conoscesse le tue 12 parole iniziali? Quali delle informazioni scritte sul foglio dovrebbero rimanere assolutamente segrete, anche dopo la fine del laboratorio?

* **Fase 4 — Discussione conclusiva:** Distruggi (strappa o cancella) il foglio con la seed phrase dimostrativa e la chiave privata al termine dell'esercizio, per interiorizzare fisicamente il gesto di protezione di un'informazione sensibile.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa contiene effettivamente un wallet?  
- A) Le criptovalute vere e proprie del proprietario.  
- B) Le chiavi crittografiche che permettono di dimostrare la proprietà dei fondi e firmare le transazioni.  
- C) Una copia completa dell'intera Blockchain.  
- D) I dati personali e anagrafici del proprietario.

**Domanda 2:** Cos'è una seed phrase?  
- A) Una password temporanea valida solo per una singola transazione.  
- B) Una sequenza di parole (standard BIP-39) da cui derivano tutte le chiavi private di un wallet gerarchico deterministico.  
- C) L'indirizzo pubblico del wallet.  
- D) Il nome scelto dall'utente per il proprio wallet.

**Domanda 3:** Qual è la differenza principale tra un wallet custodial e uno non-custodial?  
- A) Il custodial è sempre più sicuro del non-custodial.  
- B) Nel custodial le chiavi sono gestite da terzi, nel non-custodial dall'utente stesso.  
- C) Il non-custodial non può ricevere fondi.  
- D) Non c'è alcuna differenza pratica tra i due.

**Domanda 4:** Se ricevi un messaggio che ti chiede urgentemente la tua seed phrase per "verificare il tuo account", cosa dovresti fare?  
- A) Inviarla immediatamente per evitare il blocco dell'account.  
- B) Riconoscerlo come un tentativo di truffa e non condividerla mai, in nessun caso.  
- C) Inviarla solo se il messaggio proviene da un indirizzo email ufficiale.  
- D) Condividerla solo parzialmente, ad esempio le prime 6 parole.

---

[🔙 Torna all'indice](#indice)