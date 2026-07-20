# ⛓️ Guida Completa alla Blockchain

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Ottimizzata per Google Colab · Aggiornata alle principali tecnologie Blockchain 2026

---

# Come usare questa guida

Ogni modulo è pensato per essere copiato **così com'è** in una cella di testo (Markdown) o di codice di Google Colab.

La guida segue un percorso didattico progressivo: si parte dai concetti fondamentali della Blockchain per arrivare alle principali piattaforme, agli Smart Contract e alle applicazioni nel mondo reale.

Non sono richieste conoscenze pregresse di crittografia, economia o programmazione.

Ogni modulo contiene:

- spiegazioni teoriche;
- esempi pratici;
- tabelle riassuntive;
- schemi esplicativi;
- approfondimenti;
- curiosità;
- riepilogo finale.

---

# Indice dei moduli

- [M0 — Introduzione alla Blockchain](#m0)
- [M1 — Il problema della fiducia](#m1)
- [M2 — Registri distribuiti (Distributed Ledger)](#m2)
- [M3 — Blocchi e Catena dei Blocchi](#m3)
- [M4 — Hash crittografici](#m4)
- [M5 — Crittografia a chiave pubblica e privata](#m5)
- [M6 — Wallet e firme digitali](#m6)
- [M7 — Le transazioni](#m7)
- [M8 — Mining e Proof of Work](#m8)
- [M9 — Proof of Stake](#m9)
- [M10 — Bitcoin](#m10)
- [M11 — Ethereum](#m11)
- [M12 — Smart Contract](#m12)
- [M13 — Token digitali](#m13)
- [M14 — NFT](#m14)
- [M15 — DeFi (Finanza Decentralizzata)](#m15)
- [M16 — DAO (Organizzazioni Autonome Decentralizzate)](#m16)
- [M17 — Layer 1 e Layer 2](#m17)
- [M18 — Sicurezza della Blockchain](#m18)
- [M19 — Scalabilità](#m19)
- [M20 — Blockchain pubbliche, private e permissioned](#m20)
- [M21 — Applicazioni della Blockchain](#m21)
- [M22 — Vantaggi e limiti](#m22)
- [Appendice — Glossario](#appendice)
- [Appendice — Cheat Sheet](#cheatsheet)

---

<a id="m0"></a>

## M0 — Introduzione alla Blockchain

### 0.1 Cos'è la Blockchain

La **Blockchain** è una tecnologia informatica che permette di registrare informazioni in modo **sicuro**, **distribuito**, **trasparente** e **immutabile**.

Il termine deriva dall'inglese:

> **Block** = blocco  
> **Chain** = catena

Una Blockchain è quindi una **catena di blocchi** collegati tra loro mediante algoritmi crittografici.

Ogni blocco contiene informazioni e un riferimento matematico al blocco precedente, formando una sequenza cronologica praticamente impossibile da alterare senza che l'intera rete se ne accorga.

---

### 0.2 Una definizione moderna

Una Blockchain può essere definita come:

> Un registro digitale distribuito, condiviso tra migliaia di nodi della rete, nel quale ogni operazione viene verificata tramite algoritmi crittografici e meccanismi di consenso.

Questa definizione racchiude quattro concetti fondamentali.

| Concetto | Significato |
|----------|-------------|
| Registro | Memorizza dati e transazioni |
| Distribuito | Esiste una copia su molti computer |
| Crittografico | I dati sono protetti matematicamente |
| Consenso | Tutta la rete concorda sulla validità delle operazioni |

---

### 0.3 Perché è nata

Per secoli qualsiasi trasferimento di denaro o proprietà ha richiesto un intermediario fidato.

Tra questi possiamo citare:

- banche;
- notai;
- governi;
- camere di commercio;
- registri catastali;
- società finanziarie.

Questi enti hanno il compito di garantire la correttezza delle operazioni.

La Blockchain nasce con un obiettivo rivoluzionario:

> permettere a persone che non si conoscono di effettuare transazioni sicure senza dover necessariamente affidarsi ad un'autorità centrale.

---

### 0.4 Un semplice esempio

Immaginiamo che Mario debba inviare 100 € a Luca.

Nel sistema bancario tradizionale il flusso è il seguente.

```
Mario
   │
   ▼
Banca di Mario
   │
   ▼
Circuito Bancario
   │
   ▼
Banca di Luca
   │
   ▼
Luca
```

La banca verifica:

- disponibilità del denaro;
- identità del cliente;
- autenticità dell'operazione;
- registrazione del pagamento.

Con una Blockchain il processo diventa molto diverso.

```
Mario
   │
   ▼
Rete Blockchain
   │
   ▼
Luca
```

La verifica viene effettuata dall'intera rete di nodi e non da una singola banca.

---

### 0.5 Le caratteristiche fondamentali

Una Blockchain moderna possiede generalmente le seguenti proprietà.

| Caratteristica | Descrizione |
|---------------|-------------|
| Distribuita | Il registro è copiato su migliaia di computer |
| Decentralizzata | Non esiste un server centrale |
| Trasparente | Le transazioni possono essere verificate |
| Immutabile | I dati non possono essere modificati facilmente |
| Sicura | Utilizza crittografia avanzata |
| Cronologica | Le informazioni sono ordinate temporalmente |

---

### 0.6 Dove viene utilizzata

Oggi la Blockchain viene utilizzata in numerosi settori.

Tra i principali troviamo:

- finanza;
- criptovalute;
- supply chain;
- sanità;
- identità digitale;
- certificazione documentale;
- assicurazioni;
- industria;
- pubblica amministrazione;
- Internet of Things.

---

### 0.7 Blockchain e Bitcoin non sono la stessa cosa

Uno degli errori più comuni consiste nel confondere Blockchain e Bitcoin.

In realtà:

- **Blockchain** è una tecnologia.
- **Bitcoin** è una delle applicazioni che utilizzano tale tecnologia.

Allo stesso modo esistono molte altre Blockchain, tra cui:

- Ethereum;
- Solana;
- Cardano;
- Avalanche;
- Polygon;
- BNB Chain.

---

### 0.8 Un esempio intuitivo

Immaginiamo un grande quaderno condiviso tra migliaia di persone.

Ogni pagina rappresenta un blocco.

Ogni nuova pagina contiene:

- nuovi dati;
- il riferimento alla pagina precedente;
- una firma matematica della pagina precedente.

Se qualcuno modifica una vecchia pagina, tutte le firme delle pagine successive diventano immediatamente non valide.

Questo rende evidente qualsiasi tentativo di manomissione.

---

### 0.9 Perché è considerata rivoluzionaria

Internet ha rivoluzionato lo scambio di informazioni.

La Blockchain rivoluziona lo scambio di valore.

Grazie a questa tecnologia diventa possibile trasferire:

- denaro;
- proprietà;
- certificati;
- identità digitali;
- documenti;
- diritti digitali.

Il tutto senza la necessità di un'autorità centrale che controlli ogni operazione.

---

### 0.10 Concetti chiave

Al termine di questo modulo dovresti conoscere i seguenti termini.

| Termine | Significato |
|----------|-------------|
| Blockchain | Registro distribuito |
| Nodo | Computer della rete |
| Blocco | Insieme di dati e transazioni |
| Hash | Impronta digitale di un blocco |
| Consenso | Accordo della rete |
| Decentralizzazione | Assenza di un'autorità centrale |

---

<a id="m1"></a>

## M1 — Il problema della fiducia

### 1.1 La fiducia nella società

Ogni giorno compiamo centinaia di operazioni basate sulla fiducia.

Ad esempio:

- effettuare un bonifico;
- pagare con carta di credito;
- acquistare online;
- firmare un contratto;
- registrare una proprietà.

In tutti questi casi ci affidiamo ad un intermediario che garantisce la correttezza dell'operazione.

---

### 1.2 Il ruolo degli intermediari

Gli intermediari svolgono funzioni essenziali.

Tra queste:

- verificano l'identità delle persone;
- controllano la disponibilità del denaro;
- impediscono le frodi;
- conservano i registri ufficiali;
- certificano i trasferimenti di proprietà;
- risolvono eventuali controversie.

Senza questi soggetti il sistema economico tradizionale avrebbe enormi difficoltà a funzionare.

---

### 1.3 Gli svantaggi degli intermediari

L'esistenza di un'autorità centrale comporta però alcuni limiti.

| Problema | Conseguenza |
|----------|-------------|
| Commissioni | Costi aggiuntivi |
| Tempi | Operazioni lente |
| Centralizzazione | Punto singolo di guasto |
| Controllo | Elevata concentrazione del potere |
| Disponibilità | Possibili interruzioni del servizio |

---

### 1.4 Il problema del doppio pagamento

Uno dei problemi più importanti dell'informatica è il cosiddetto **Double Spending**.

La domanda è la seguente.

> Come impedire che una persona utilizzi due volte lo stesso denaro digitale?

Ad esempio.

Mario possiede un solo Bitcoin.

Potrebbe tentare di inviarlo contemporaneamente:

- a Luca;
- a Marco.

Quale delle due transazioni deve essere considerata valida?

La soluzione a questo problema rappresenta una delle innovazioni fondamentali introdotte dalla Blockchain e sarà approfondita nei moduli successivi.

---

<a id="m2"></a>

## M2 — Registri distribuiti (Distributed Ledger)

### 2.1 Cos'è un registro

Un **registro** è un archivio nel quale vengono annotate informazioni in ordine cronologico.

Fin dall'antichità i registri sono stati utilizzati per conservare informazioni riguardanti:

- proprietà;
- contratti;
- debiti;
- crediti;
- nascite;
- matrimoni;
- compravendite.

Anche oggi moltissime organizzazioni utilizzano registri digitali.

Ad esempio:

- banche;
- comuni;
- ospedali;
- università;
- aziende.

---

### 2.2 Registro centralizzato

Il modello tradizionale prevede un unico archivio centrale.

```
               Registro Centrale
                      │
     ┌────────────────┼────────────────┐
     │                │                │
 Cliente A       Cliente B       Cliente C
```

Tutti gli utenti devono interrogare il medesimo server.

Questo approccio è semplice da gestire ma presenta alcuni limiti.

---

### 2.3 Limiti della centralizzazione

Quando esiste un solo archivio possono verificarsi diversi problemi.

| Problema | Conseguenza |
|----------|-------------|
| Guasto del server | Tutto il servizio si interrompe |
| Attacco informatico | Possibile perdita dei dati |
| Errore umano | Informazioni compromesse |
| Censura | Alcuni dati possono essere nascosti |
| Controllo centralizzato | Una sola organizzazione decide tutto |

Questo viene definito **Single Point of Failure**, cioè un punto unico il cui malfunzionamento compromette l'intero sistema.

---

### 2.4 Il registro distribuito

La Blockchain introduce un concetto completamente diverso.

Il registro non viene conservato da un solo computer.

Ogni nodo della rete possiede una copia completa dello stesso registro.

```
Nodo A  ◄────────────► Nodo B
  ▲                        ▲
  │                        │
  ▼                        ▼
Nodo C ◄────────────► Nodo D
```

Tutti i nodi collaborano continuamente per mantenere sincronizzate le informazioni.

---

### 2.5 Cos'è un Distributed Ledger

Un **Distributed Ledger** (registro distribuito) è un archivio condiviso tra numerosi computer appartenenti ad una rete.

Ogni modifica viene propagata a tutti i partecipanti.

In questo modo ogni nodo conserva una copia aggiornata del registro.

Le caratteristiche principali sono:

- replica dei dati;
- sincronizzazione continua;
- assenza di un server centrale;
- elevata disponibilità;
- elevata affidabilità.

---

### 2.6 Blockchain e Distributed Ledger

Spesso i due termini vengono confusi.

Non sono però sinonimi.

| Blockchain | Distributed Ledger |
|-------------|--------------------|
| È un particolare tipo di registro distribuito | È la categoria generale |
| I dati sono organizzati in blocchi concatenati | I dati possono essere organizzati in modi differenti |
| Utilizza hash per collegare i blocchi | Non necessariamente usa blocchi concatenati |

Possiamo quindi affermare che:

> Ogni Blockchain è un Distributed Ledger, ma non tutti i Distributed Ledger sono Blockchain.

---

### 2.7 I nodi della rete

Ogni computer che partecipa alla Blockchain prende il nome di **nodo** (*Node*).

Un nodo può svolgere diversi compiti.

Ad esempio:

- conservare una copia della Blockchain;
- verificare le transazioni;
- trasmettere informazioni agli altri nodi;
- partecipare al consenso;
- validare nuovi blocchi.

Più nodi sono presenti, maggiore sarà la resilienza della rete.

---

### 2.8 Replica delle informazioni

Supponiamo che la rete sia composta da quattro nodi.

```
Nodo A
Saldo Mario = 100

Nodo B
Saldo Mario = 100

Nodo C
Saldo Mario = 100

Nodo D
Saldo Mario = 100
```

Quando Mario invia del denaro, tutti i nodi aggiornano il registro.

```
Nodo A
Saldo Mario = 70

Nodo B
Saldo Mario = 70

Nodo C
Saldo Mario = 70

Nodo D
Saldo Mario = 70
```

Ogni copia rimane perfettamente sincronizzata.

---

### 2.9 Perché distribuire i dati

Distribuire le informazioni offre numerosi vantaggi.

| Vantaggio | Descrizione |
|-----------|-------------|
| Ridondanza | Esistono molte copie dei dati |
| Disponibilità | Il servizio continua anche se alcuni nodi si spengono |
| Sicurezza | È molto difficile alterare contemporaneamente tutte le copie |
| Affidabilità | Nessun computer è indispensabile |
| Scalabilità | Nuovi nodi possono essere aggiunti alla rete |

---

### 2.10 Un esempio pratico

Immaginiamo una classe di studenti.

Ogni studente possiede una copia identica del registro dei voti.

Quando il professore assegna un nuovo voto:

- tutti aggiornano contemporaneamente il proprio registro;
- ogni copia rimane identica alle altre.

Se uno studente tenta di modificare soltanto il proprio registro:

```
Registro Studente A = 8

Registro Studente B = 8

Registro Studente C = 10   ❌

Registro Studente D = 8
```

L'errore viene immediatamente individuato confrontando le varie copie.

Questo è uno dei principi fondamentali della Blockchain.

---

### 2.11 Concetti chiave

Al termine di questo modulo dovresti conoscere i seguenti termini.

| Termine | Significato |
|----------|-------------|
| Registro | Archivio delle informazioni |
| Ledger | Registro digitale |
| Distributed Ledger | Registro distribuito tra molti computer |
| Nodo | Computer appartenente alla rete |
| Replica | Copia sincronizzata dei dati |
| Single Point of Failure | Punto unico il cui guasto compromette il sistema |

---

<a id="m3"></a>

## M3 — Blocchi e Catena dei Blocchi

### 3.1 Cos'è un blocco

L'elemento fondamentale della Blockchain è il **blocco**.

Un blocco è una struttura dati che contiene un insieme di informazioni validate dalla rete.

Generalmente un blocco contiene:

- elenco delle transazioni;
- data e ora di creazione;
- hash del blocco precedente;
- hash del blocco corrente;
- altri dati tecnici necessari al funzionamento della rete.

Ogni blocco rappresenta quindi una "pagina" del grande registro distribuito.

---

### 3.2 La struttura logica di un blocco

In modo semplificato possiamo rappresentare un blocco nel seguente modo.

```
+--------------------------------------+
| Numero del blocco                    |
+--------------------------------------+
| Timestamp                            |
+--------------------------------------+
| Elenco delle transazioni             |
+--------------------------------------+
| Hash del blocco precedente           |
+--------------------------------------+
| Hash del blocco corrente             |
+--------------------------------------+
```

Ogni campo svolge un ruolo fondamentale per garantire l'integrità dell'intera Blockchain.

---

### 3.3 Perché si chiamano "blocchi"

Le transazioni non vengono aggiunte una alla volta.

La rete le raccoglie in gruppi.

Ogni gruppo forma un nuovo blocco.

Ad esempio:

```
Blocco 105

Transazione 1
Transazione 2
Transazione 3
Transazione 4
Transazione 5
```

Quando il blocco è completo e validato viene aggiunto alla catena.

---

### 3.4 La catena dei blocchi

Ogni blocco contiene l'hash del blocco precedente.

Questo crea una vera e propria catena.

```
Blocco 1
    │
    ▼
Blocco 2
    │
    ▼
Blocco 3
    │
    ▼
Blocco 4
    │
    ▼
Blocco 5
```

Ogni nuovo blocco dipende matematicamente da quello precedente.

Questa caratteristica rende estremamente difficile alterare la cronologia delle informazioni.

---

### 3.5 Il blocco Genesis

Il primo blocco di ogni Blockchain prende il nome di:

> **Genesis Block**

Il Genesis Block rappresenta l'origine dell'intera catena.

Non possiede alcun blocco precedente e costituisce il punto di partenza della Blockchain.

```
Genesis Block
      │
      ▼
Blocco 1
      │
      ▼
Blocco 2
```

Nel caso di Bitcoin il Genesis Block fu creato il **3 gennaio 2009** da Satoshi Nakamoto.

---

### 3.6 Il collegamento tra i blocchi

Il vero elemento innovativo della Blockchain è il collegamento matematico tra i blocchi.

Ogni blocco contiene infatti l'**hash del blocco precedente**.

Ad esempio.

```
Blocco 1
Hash: A8F92...

        │

        ▼

Blocco 2
Hash precedente: A8F92...
Hash: 5CD71...

        │

        ▼

Blocco 3
Hash precedente: 5CD71...
Hash: E41BF...
```

Questo meccanismo garantisce che ogni blocco dipenda da tutti quelli precedenti.

---

### 3.7 Perché non si possono modificare i blocchi

Supponiamo che un malintenzionato tenti di modificare una transazione presente nel Blocco 2.

Accadrebbe immediatamente quanto segue.

```
Blocco 1 ✓

↓

Blocco 2 ❌ modificato

↓

Blocco 3 ❌ hash non più valido

↓

Blocco 4 ❌ hash non più valido

↓

Blocco 5 ❌ hash non più valido
```

La modifica di un singolo dato cambia completamente l'hash del blocco.

Di conseguenza tutti i blocchi successivi diventano automaticamente non validi.

Questo rende estremamente difficile alterare la cronologia delle informazioni.

---

### 3.8 Aggiunta di un nuovo blocco

L'aggiunta di un nuovo blocco segue una sequenza ben precisa.

1. Gli utenti inviano nuove transazioni.
2. Le transazioni vengono raccolte.
3. I nodi verificano la loro validità.
4. Viene costruito un nuovo blocco.
5. Il blocco viene validato.
6. Il blocco viene aggiunto alla Blockchain.
7. Tutti i nodi aggiornano la propria copia.

Lo schema può essere rappresentato così.

```
Transazioni

      │

      ▼

Verifica

      │

      ▼

Nuovo Blocco

      │

      ▼

Validazione

      │

      ▼

Blockchain aggiornata
```

---

### 3.9 Timestamp

Ogni blocco contiene un'informazione molto importante:

il **Timestamp**.

Il Timestamp rappresenta la data e l'ora di creazione del blocco.

Ad esempio.

| Blocco | Timestamp |
|---------|-----------|
| 102 | 08/03/2026 10:32 |
| 103 | 08/03/2026 10:41 |
| 104 | 08/03/2026 10:53 |

Il Timestamp permette di ricostruire con precisione l'ordine cronologico delle operazioni.

---

### 3.10 Numero del blocco

Ogni blocco possiede anche un identificativo progressivo.

Ad esempio.

| Numero | Contenuto |
|----------|-----------|
| 0 | Genesis Block |
| 1 | Primo blocco |
| 2 | Secondo blocco |
| 3 | Terzo blocco |

Nella pratica il numero del blocco prende il nome di **Block Height**.

Maggiore è il Block Height, maggiore è la lunghezza della Blockchain.

---

### 3.11 Crescita della Blockchain

Una Blockchain non viene mai sovrascritta.

Ogni nuovo blocco viene semplicemente aggiunto alla fine della catena.

```
Genesi

↓

Blocco 1

↓

Blocco 2

↓

Blocco 3

↓

Blocco 4

↓

Blocco 5

↓

...

↓

Blocco 1.000.000
```

La Blockchain cresce continuamente nel tempo.

---

### 3.12 Concetti chiave

Al termine di questo modulo dovresti conoscere i seguenti termini.

| Termine | Significato |
|----------|-------------|
| Blocco | Insieme di transazioni validate |
| Blockchain | Sequenza di blocchi collegati |
| Genesis Block | Primo blocco della catena |
| Timestamp | Data e ora del blocco |
| Block Height | Numero progressivo del blocco |
| Hash precedente | Collegamento matematico con il blocco precedente |

---

<a id="m4"></a>

## M4 — Hash crittografici

### 4.1 Cos'è un hash

Uno degli elementi più importanti della Blockchain è l'**hash crittografico**.

Un hash è una sequenza di caratteri ottenuta applicando una funzione matematica ad un insieme di dati.

L'hash può essere considerato come una vera e propria **impronta digitale** dei dati.

Ogni contenuto produce un hash differente.

---

### 4.2 Un esempio

Supponiamo di calcolare l'hash della parola:

```
Blockchain
```

Il risultato potrebbe essere:

```
4E8A8F7C5B90D1...
```

Se modifichiamo anche una sola lettera.

```
BlockChain
```

otteniamo un risultato completamente diverso.

```
91BC4AEE0D62F3...
```

Questo comportamento prende il nome di **Effetto Valanga (Avalanche Effect)**.

---

### 4.3 Proprietà degli hash

Una buona funzione di hash possiede alcune caratteristiche fondamentali.

| Proprietà | Descrizione |
|------------|-------------|
| Deterministica | Gli stessi dati producono sempre lo stesso hash |
| Veloce | Il calcolo richiede poco tempo |
| Unidirezionale | Non è possibile ricavare i dati originali |
| Sensibile | Basta modificare un bit per ottenere un hash completamente diverso |
| Resistente alle collisioni | È estremamente improbabile ottenere lo stesso hash da dati differenti |

---

### 4.4 L'impronta digitale dei dati

Come ogni persona possiede impronte digitali uniche, anche ogni insieme di dati possiede un hash praticamente unico.

```
Documento A

↓

Hash A

------------------

Documento B

↓

Hash B
```

Se i documenti sono differenti, anche gli hash saranno differenti.

---

### 4.5 SHA-256

Bitcoin utilizza principalmente una funzione chiamata:

**SHA-256**

Il nome significa:

Secure Hash Algorithm 256 bit.

Produce un hash lungo sempre:

**256 bit**

ovvero:

**64 caratteri esadecimali**.

Ad esempio.

```
BA7816BF8F01CFEA414140DE5DAE2223...
```

Qualunque sia la dimensione del file originale, il risultato avrà sempre la stessa lunghezza.

---

### 4.6 Perché l'hash è così importante

Nella Blockchain gli hash vengono utilizzati per:

- identificare i blocchi;
- collegare i blocchi;
- verificare l'integrità dei dati;
- impedire modifiche non autorizzate;
- costruire le Proof of Work;
- garantire l'immutabilità del registro.

Senza gli hash la Blockchain non potrebbe esistere.

---

### 4.7 Come viene calcolato un hash

Una funzione di hash riceve in ingresso un insieme qualsiasi di dati.

Può trattarsi di:

- una parola;
- un documento;
- una fotografia;
- un video;
- un blocco della Blockchain.

Il risultato sarà sempre una stringa di lunghezza fissa.

```
Dati

      │

      ▼

Funzione Hash

      │

      ▼

Hash
```

L'algoritmo non "comprende" il significato dei dati.

Esegue semplicemente una trasformazione matematica.

---

### 4.8 Effetto valanga (Avalanche Effect)

Una delle proprietà più importanti delle funzioni hash è il cosiddetto **Effetto Valanga**.

Significa che basta modificare un solo carattere del testo originale per ottenere un hash completamente differente.

Esempio.

```
Blockchain
```

↓

```
6F8A72...
```

Modificando una sola lettera.

```
Blockchaim
```

↓

```
A19CF4...
```

Non esiste alcuna somiglianza visibile tra i due risultati.

Questa proprietà rende immediatamente individuabili eventuali modifiche ai dati.

---

### 4.9 Collisioni

Una **collisione** si verifica quando due contenuti differenti producono lo stesso hash.

Idealmente ciò non dovrebbe mai accadere.

Le moderne funzioni crittografiche sono progettate affinché la probabilità di collisione sia estremamente bassa.

Per SHA-256 tale probabilità è così ridotta da poter essere considerata trascurabile nelle applicazioni pratiche.

---

### 4.10 Hash nei blocchi

Ogni blocco possiede un proprio hash.

Ad esempio.

```
Blocco 101

Hash

8AFD12...
```

Il blocco successivo memorizza proprio questo valore.

```
Blocco 102

Hash precedente

8AFD12...
```

In questo modo i blocchi risultano concatenati tra loro.

---

### 4.11 Integrità dei dati

Supponiamo di modificare una transazione presente nel blocco.

Prima della modifica.

```
Hash

AB91E7...
```

Dopo la modifica.

```
Hash

6DD41F...
```

L'hash cambia completamente.

La rete si accorge immediatamente che il blocco è stato alterato.

---

### 4.12 Un esempio reale

Immaginiamo un documento PDF contenente un diploma.

L'università calcola il suo hash.

```
Diploma.pdf

↓

Hash

92A3FD7E...
```

Anni dopo sarà sufficiente ricalcolare l'hash del documento.

Se il nuovo hash coincide con quello originale, il documento non è mai stato modificato.

Questo principio viene utilizzato anche nella conservazione digitale dei documenti.

---

### 4.13 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Hash | Impronta digitale dei dati |
| SHA-256 | Funzione hash utilizzata da Bitcoin |
| Collisione | Due dati con lo stesso hash |
| Avalanche Effect | Piccole modifiche producono hash completamente diversi |
| Integrità | Possibilità di verificare che i dati non siano stati alterati |

---

<a id="m5"></a>

# M5 — Crittografia a chiave pubblica e privata

### 5.1 Cos'è la crittografia

La **crittografia** è la disciplina che permette di proteggere le informazioni rendendole leggibili soltanto alle persone autorizzate.

La parola deriva dal greco:

- **Kryptós** → nascosto
- **Graphía** → scrittura

Il suo obiettivo principale è garantire:

- riservatezza;
- autenticità;
- integrità;
- non ripudio.

---

### 5.2 Dalla crittografia classica a quella moderna

In passato venivano utilizzati metodi relativamente semplici.

Tra questi ricordiamo:

- Cifrario di Cesare;
- Scitala spartana;
- Cifrario di Vigenère.

Oggi invece vengono utilizzati algoritmi matematici estremamente complessi, progettati per resistere anche ai moderni supercomputer.

---

### 5.3 Crittografia simmetrica

Nella crittografia simmetrica si utilizza una sola chiave.

```
Messaggio

↓

Chiave Segreta

↓

Messaggio Cifrato

↓

Chiave Segreta

↓

Messaggio Originale
```

Lo stesso segreto viene utilizzato sia per cifrare sia per decifrare.

Il problema principale consiste nel distribuire la chiave in modo sicuro.

---

### 5.4 Crittografia asimmetrica

La Blockchain utilizza prevalentemente la **crittografia asimmetrica**.

In questo modello esistono due chiavi differenti.

```
Chiave Privata

↓

Generazione

↓

Chiave Pubblica
```

Le due chiavi sono matematicamente collegate.

Conoscere la chiave pubblica non permette di ricavare quella privata.

---

### 5.5 La chiave privata

La **Private Key** rappresenta il vero segreto dell'utente.

Essa permette di:

- firmare le transazioni;
- autorizzare i pagamenti;
- dimostrare la proprietà dei fondi.

Chiunque entri in possesso della chiave privata può controllare completamente il relativo wallet.

Per questo motivo deve essere custodita con estrema attenzione.

---

### 5.6 La chiave pubblica

La **Public Key** può invece essere condivisa liberamente.

Serve principalmente a:

- identificare un utente;
- verificare una firma digitale;
- ricevere fondi.

Conoscere la chiave pubblica non comporta alcun rischio diretto.

---

### 5.7 Un esempio intuitivo

Immaginiamo una cassetta postale.

Chiunque può inserire una lettera.

Solo il proprietario possiede la chiave per aprirla.

```
Chiunque

↓

Inserisce la lettera

↓

📮

↓

Solo il proprietario apre la cassetta
```

La chiave pubblica funziona in modo analogo.

Permette di ricevere informazioni.

La chiave privata permette invece di accedervi.

---

### 5.8 Perché la Blockchain usa due chiavi

L'utilizzo della coppia di chiavi offre numerosi vantaggi.

| Vantaggio | Descrizione |
|-----------|-------------|
| Sicurezza | La chiave privata non viene mai condivisa |
| Autenticità | È possibile dimostrare chi ha firmato una transazione |
| Integrità | Le modifiche vengono immediatamente rilevate |
| Scalabilità | Milioni di utenti possono operare contemporaneamente |

---

### 5.9 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Crittografia | Protezione matematica delle informazioni |
| Chiave Privata | Segreto utilizzato per firmare |
| Chiave Pubblica | Identificatore condivisibile |
| Crittografia Simmetrica | Una sola chiave |
| Crittografia Asimmetrica | Coppia di chiavi matematicamente collegate |

---

<a id="m6"></a>

# M6 — Wallet e firme digitali

### 6.1 Cos'è un Wallet

Quando si parla di Blockchain, il termine **Wallet** viene spesso tradotto come "portafoglio digitale".

In realtà un Wallet **non contiene materialmente criptovalute**.

Le criptovalute rimangono sempre registrate sulla Blockchain.

Il Wallet custodisce invece le informazioni necessarie per dimostrarne il possesso.

In particolare conserva:

- la chiave privata;
- la chiave pubblica;
- gli indirizzi della Blockchain.

---

### 6.2 Un concetto importante

È utile ricordare che:

> Le criptovalute non vengono memorizzate nel Wallet.

Esse sono registrate all'interno della Blockchain.

Il Wallet rappresenta semplicemente lo strumento che permette all'utente di autorizzarne l'utilizzo.

---

### 6.3 Come funziona un Wallet

Il funzionamento può essere rappresentato nel seguente schema.

```
Chiave Privata
        │
        ▼
Generazione
        │
        ▼
Chiave Pubblica
        │
        ▼
Indirizzo Blockchain
```

Ogni indirizzo è associato ad una particolare coppia di chiavi crittografiche.

---

### 6.4 Indirizzo Blockchain

L'indirizzo rappresenta l'equivalente dell'IBAN nel sistema bancario tradizionale.

Può essere condiviso pubblicamente.

Ad esempio.

```
1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
```

oppure

```
0x7A250d5630B4CF539739DF2C5DACB4C659F2488D
```

Chiunque può conoscere un indirizzo senza compromettere la sicurezza del proprietario.

---

### 6.5 Chiave privata

La chiave privata è invece il vero segreto.

Essa permette di:

- autorizzare pagamenti;
- firmare transazioni;
- dimostrare la proprietà dei fondi.

Una tipica chiave privata è composta da una lunga sequenza casuale di caratteri.

Ad esempio.

```
5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWvm...
```

Non deve mai essere condivisa.

---

### 6.6 Perché la chiave privata è così importante

Possedere la chiave privata equivale a possedere i fondi.

Se qualcuno entra in possesso della chiave privata può:

- trasferire tutte le criptovalute;
- autorizzare transazioni;
- firmare documenti digitali.

Per questo motivo vale una semplice regola.

> Chi possiede la chiave privata controlla il Wallet.

---

### 6.7 Tipologie di Wallet

Esistono differenti categorie di Wallet.

| Tipo | Caratteristiche |
|------|-----------------|
| Software Wallet | Applicazione installata sul computer o smartphone |
| Hardware Wallet | Dispositivo fisico dedicato |
| Paper Wallet | Chiavi stampate su carta |
| Web Wallet | Accessibile tramite browser |
| Mobile Wallet | Applicazione per smartphone |

Ogni soluzione presenta vantaggi e svantaggi differenti.

---

### 6.8 Hot Wallet

Un **Hot Wallet** è sempre collegato ad Internet.

Vantaggi:

- molto pratico;
- veloce;
- ideale per l'uso quotidiano.

Svantaggi:

- maggiore esposizione agli attacchi informatici.

---

### 6.9 Cold Wallet

Un **Cold Wallet** rimane invece scollegato dalla rete.

Esempi:

- Hardware Wallet;
- Paper Wallet.

Vantaggi:

- elevata sicurezza;
- protezione dagli attacchi online.

Svantaggi:

- utilizzo meno immediato.

---

### 6.10 Seed Phrase

Quando viene creato un Wallet viene generalmente generata una frase di recupero.

Questa prende il nome di:

**Seed Phrase**

È composta normalmente da:

- 12 parole;
- 18 parole;
- 24 parole.

Esempio.

```
apple
river
future
coffee
planet
desk
...
```

La Seed Phrase permette di ricostruire completamente il Wallet in caso di perdita del dispositivo.

---

### 6.11 Regole fondamentali

La Seed Phrase deve essere:

- conservata offline;
- custodita in luogo sicuro;
- mai fotografata;
- mai inviata tramite e-mail;
- mai condivisa con nessuno.

La perdita della Seed Phrase può comportare la perdita definitiva dell'accesso ai propri fondi.

---

### 6.12 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Wallet | Strumento che gestisce le chiavi crittografiche |
| Indirizzo | Identificativo pubblico |
| Private Key | Chiave segreta |
| Public Key | Chiave pubblica |
| Seed Phrase | Frase di recupero del Wallet |
| Cold Wallet | Wallet offline |
| Hot Wallet | Wallet collegato a Internet |

---

<a id="m7"></a>

# M7 — Le transazioni

### 7.1 Cos'è una transazione

Una **transazione** rappresenta un'operazione registrata sulla Blockchain.

Può riguardare:

- trasferimento di criptovalute;
- esecuzione di Smart Contract;
- registrazione di dati;
- emissione di token;
- trasferimento di NFT.

Ogni transazione diventa parte permanente della Blockchain.

---

### 7.2 Componenti di una transazione

Una tipica transazione contiene:

- indirizzo del mittente;
- indirizzo del destinatario;
- importo;
- firma digitale;
- commissione;
- timestamp.

In forma semplificata.

```
Mittente

↓

Destinatario

↓

Importo

↓

Firma Digitale

↓

Commissione
```

---

### 7.3 Creazione della transazione

Quando un utente desidera inviare criptovaluta, il Wallet costruisce automaticamente una nuova transazione.

Il processo è il seguente.

```
Utente

↓

Wallet

↓

Creazione Transazione

↓

Firma Digitale

↓

Invio alla Rete
```

La transazione non viene ancora registrata.

Essa viene semplicemente inviata ai nodi della Blockchain.

---

### 7.4 Verifica

I nodi della rete effettuano numerosi controlli.

Tra questi:

- validità della firma;
- disponibilità dei fondi;
- correttezza del formato;
- assenza di doppia spesa;
- rispetto delle regole del protocollo.

Solo le transazioni corrette possono proseguire.

---

### 7.5 Mempool

Le transazioni valide vengono inserite in una particolare area temporanea chiamata:

**Mempool**

La Mempool rappresenta una sorta di sala d'attesa.

```
Transazioni

↓

Mempool

↓

Nuovo Blocco
```

Quando viene creato un nuovo blocco, le transazioni presenti nella Mempool vengono selezionate e inserite nella Blockchain.

---

### 7.6 Conferme

Una transazione non è considerata immediatamente definitiva.

Ogni nuovo blocco aggiunto dopo quello contenente la transazione costituisce una nuova conferma.

Ad esempio.

```
Blocco 500

↓

Blocco 501

↓

Blocco 502
```

Se la transazione è presente nel Blocco 500:

- dopo il Blocco 501 possiede una conferma;
- dopo il Blocco 502 possiede due conferme;
- e così via.

Maggiore è il numero delle conferme, maggiore è il livello di sicurezza.

---

### 7.7 Commissioni

Per elaborare una transazione è generalmente necessario pagare una commissione.

La commissione serve a:

- remunerare validatori o miner;
- evitare spam sulla rete;
- incentivare il corretto funzionamento della Blockchain.

Ogni Blockchain utilizza un proprio sistema di calcolo delle commissioni.

---

### 7.8 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Transazione | Operazione registrata sulla Blockchain |
| Mempool | Area temporanea delle transazioni in attesa |
| Conferma | Validazione successiva di una transazione |
| Commissione | Costo per elaborare la transazione |
| Firma Digitale | Prova crittografica dell'autore della transazione |

---

<a id="m8"></a>

# M8 — Mining e Proof of Work

### 8.1 Cos'è il Mining

Il termine **Mining** significa letteralmente **estrazione**.

Il nome deriva dal mondo minerario, dove per ottenere un minerale prezioso è necessario svolgere un intenso lavoro.

Nella Blockchain il Mining consiste nel processo mediante il quale nuovi blocchi vengono validati e aggiunti alla catena.

I computer che svolgono questo lavoro prendono il nome di:

**Miner**

---

### 8.2 Perché serve il Mining

Il Mining svolge numerose funzioni fondamentali.

Tra queste:

- verifica le transazioni;
- impedisce il doppio pagamento;
- protegge la rete dagli attacchi;
- mantiene sincronizzata la Blockchain;
- permette la creazione di nuovi blocchi.

Senza il Mining la Blockchain di Bitcoin non potrebbe funzionare.

---

### 8.3 Come lavora un Miner

Ogni Miner riceve le transazioni presenti nella Mempool.

```
Mempool

↓

Miner

↓

Nuovo Blocco
```

Il Miner verifica che tutte le transazioni siano corrette.

Successivamente costruisce un nuovo blocco.

---

### 8.4 La Proof of Work

Bitcoin utilizza un particolare algoritmo di consenso chiamato:

**Proof of Work**

che significa:

> Prova di Lavoro.

L'idea è semplice.

Prima di poter aggiungere un nuovo blocco, il Miner deve dimostrare di aver svolto un notevole lavoro computazionale.

---

### 8.5 Il problema matematico

Il lavoro consiste nel trovare un particolare valore chiamato:

**Nonce**

che produca un hash valido.

In modo semplificato.

```
Dati del blocco

+

Nonce

↓

SHA-256

↓

Hash
```

Se l'hash soddisfa determinate condizioni, il blocco viene accettato.

Altrimenti il Miner deve riprovare.

---

### 8.6 Cos'è il Nonce

Il **Nonce** è un numero che il Miner modifica continuamente.

Ogni nuovo tentativo produce un hash differente.

Ad esempio.

```
Nonce = 1

↓

Hash A
```

```
Nonce = 2

↓

Hash B
```

```
Nonce = 3

↓

Hash C
```

Il processo continua milioni o miliardi di volte fino a trovare una soluzione valida.

---

### 8.7 Perché è difficile

Il Miner non può prevedere quale sarà il Nonce corretto.

L'unico metodo consiste nel provare un enorme numero di combinazioni.

Questo rende la Proof of Work estremamente costosa dal punto di vista computazionale.

---

### 8.8 Un esempio intuitivo

Immaginiamo un lucchetto con milioni di combinazioni.

```
000000

000001

000002

...

845193

...

999999
```

Non esiste una scorciatoia.

Occorre tentare moltissime combinazioni.

Il Mining funziona in modo analogo.

---

### 8.9 Chi trova la soluzione

Migliaia di Miner lavorano contemporaneamente sullo stesso problema.

```
Miner A

Miner B

Miner C

Miner D

Miner E
```

Il primo che trova una soluzione valida:

- trasmette il blocco alla rete;
- riceve la ricompensa prevista dal protocollo.

Gli altri Miner interrompono il lavoro e iniziano a costruire il blocco successivo.

---

### 8.10 Ricompensa

Il Miner vincitore riceve normalmente:

- nuovi Bitcoin;
- commissioni delle transazioni.

Questa ricompensa prende il nome di:

**Block Reward**

Essa rappresenta l'incentivo economico che rende possibile il funzionamento della rete.

---

### 8.11 Difficoltà del Mining

La rete Bitcoin modifica automaticamente la difficoltà del problema matematico.

Se molti Miner partecipano alla rete:

- la difficoltà aumenta.

Se il numero dei Miner diminuisce:

- la difficoltà viene ridotta.

Questo permette di mantenere il tempo medio di generazione dei blocchi intorno ai dieci minuti.

---

### 8.12 Vantaggi della Proof of Work

| Vantaggio | Descrizione |
|-----------|-------------|
| Elevata sicurezza | Molto difficile alterare la Blockchain |
| Decentralizzazione | Chiunque può diventare Miner |
| Robustezza | Resiste agli attacchi informatici |
| Affidabilità | Tecnologia testata per molti anni |

---

### 8.13 Svantaggi della Proof of Work

| Svantaggio | Descrizione |
|-----------|-------------|
| Elevato consumo energetico | Richiede molta energia elettrica |
| Hardware costoso | Servono apparecchiature specializzate |
| Bassa velocità | Numero limitato di transazioni al secondo |
| Impatto ambientale | Consumo significativo di risorse energetiche |

---

### 8.14 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Mining | Processo di creazione dei blocchi |
| Miner | Computer che valida i blocchi |
| Proof of Work | Algoritmo di consenso di Bitcoin |
| Nonce | Numero utilizzato durante il Mining |
| Block Reward | Ricompensa per il Miner vincitore |

---

<a id="m9"></a>

# M9 — Proof of Stake

### 9.1 Perché nasce la Proof of Stake

Con la crescita della Blockchain emerse un problema importante.

La Proof of Work richiede enormi quantità di energia elettrica.

Per questo motivo venne sviluppato un diverso algoritmo di consenso:

**Proof of Stake**

ovvero:

> Prova della Partecipazione.

---

### 9.2 L'idea fondamentale

Nella Proof of Stake non esistono Miner.

Esistono invece i:

**Validatori**

Essi vengono scelti dalla rete per proporre e validare nuovi blocchi.

---

### 9.3 Cos'è lo Stake

Per partecipare alla validazione occorre bloccare una certa quantità di criptovaluta.

Questa operazione prende il nome di:

**Staking**

Le monete depositate rappresentano una garanzia di corretto comportamento.

---

### 9.4 Come funziona

Il processo può essere rappresentato nel seguente modo.

```
Utente

↓

Blocca le proprie monete

↓

Diventa Validatore

↓

Partecipa al consenso

↓

Riceve ricompense
```

---

### 9.5 Come vengono scelti i validatori

Ogni Blockchain utilizza criteri differenti.

Generalmente vengono considerati fattori come:

- quantità di criptovaluta messa in Stake;
- tempo di permanenza;
- affidabilità del nodo;
- comportamento storico.

Il processo è progettato per essere casuale ma equo.

---

### 9.6 Ricompense

I validatori ricevono:

- nuove monete (quando previste);
- commissioni delle transazioni;
- premi per il corretto funzionamento della rete.

---

### 9.7 Penalizzazioni

Se un validatore tenta di comportarsi in modo scorretto può subire una penalizzazione.

Questa procedura prende il nome di:

**Slashing**

Parte delle criptovalute depositate viene confiscata dal protocollo.

Ciò incentiva i partecipanti a comportarsi correttamente.

---

### 9.8 Proof of Work e Proof of Stake a confronto

| Proof of Work | Proof of Stake |
|----------------|----------------|
| Utilizza Miner | Utilizza Validatori |
| Richiede hardware potente | Richiede criptovalute in Stake |
| Elevato consumo energetico | Consumo energetico molto ridotto |
| Competizione computazionale | Selezione dei validatori |
| Bitcoin | Ethereum, Cardano, Solana e molte altre reti |

---

### 9.9 Vantaggi della Proof of Stake

- ridotto consumo energetico;
- maggiore velocità;
- costi inferiori;
- migliore scalabilità;
- minore impatto ambientale.

---

### 9.10 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Proof of Stake | Algoritmo di consenso basato sullo Stake |
| Stake | Criptovalute bloccate come garanzia |
| Validator | Nodo che valida i blocchi |
| Staking | Deposito delle monete |
| Slashing | Penalizzazione dei validatori scorretti |

---

<a id="m10"></a>

# M10 — Bitcoin

### 10.1 La nascita di Bitcoin

Bitcoin rappresenta la prima applicazione pratica di successo della tecnologia Blockchain.

Fu presentato nel 2008 attraverso un documento intitolato:

**Bitcoin: A Peer-to-Peer Electronic Cash System**

L'autore firmò il documento con lo pseudonimo:

**Satoshi Nakamoto**

Ancora oggi la sua vera identità rimane sconosciuta.

---

### 10.2 Il White Paper

Il documento originale, composto da sole nove pagine, descriveva un sistema capace di consentire pagamenti elettronici diretti tra due persone.

L'obiettivo principale era eliminare la necessità di un intermediario centrale.

Le innovazioni introdotte comprendevano:

- Blockchain;
- Proof of Work;
- rete Peer-to-Peer;
- firme digitali;
- prevenzione del Double Spending.

---

### 10.3 Il Genesis Block

Il primo blocco della Blockchain di Bitcoin venne creato il:

**3 gennaio 2009**

ed è conosciuto come:

**Genesis Block**

Al suo interno era presente un celebre messaggio.

> "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"

Questo testo faceva riferimento ad un titolo del quotidiano britannico *The Times*.

Molti interpretano il messaggio come una critica al sistema bancario tradizionale.

---

### 10.4 Caratteristiche principali

Bitcoin possiede alcune caratteristiche distintive.

| Caratteristica | Descrizione |
|----------------|-------------|
| Decentralizzato | Nessuna banca centrale |
| Open Source | Codice pubblico |
| Peer-to-Peer | Comunicazione diretta tra nodi |
| Offerta limitata | Massimo 21 milioni di Bitcoin |
| Sicuro | Basato su Proof of Work |

---

### 10.5 Come circolano i Bitcoin

I Bitcoin non vengono trasferiti fisicamente.

Ciò che cambia è il registro della Blockchain.

```
Prima

Mario → 2 BTC

Luca → 0 BTC

↓

Transazione

↓

Dopo

Mario → 1 BTC

Luca → 1 BTC
```

La Blockchain registra semplicemente il nuovo stato del registro.

---

### 10.6 Offerta massima

Uno degli aspetti più importanti di Bitcoin riguarda la quantità massima di moneta che potrà esistere.

Il protocollo stabilisce un limite di:

**21.000.000 BTC**

Questo valore non può essere modificato senza il consenso della rete.

La scarsità programmata rappresenta una delle principali caratteristiche economiche di Bitcoin.

---

### 10.7 Bitcoin divisibile

Un Bitcoin può essere suddiviso in unità molto piccole.

L'unità minima prende il nome di:

**Satoshi**

In onore del suo creatore.

```
1 BTC

=

100.000.000 Satoshi
```

Ciò rende possibile effettuare anche pagamenti di importo molto ridotto.

---

### 10.8 Halving

Ogni circa quattro anni la ricompensa destinata ai Miner viene dimezzata.

Questo evento prende il nome di:

**Bitcoin Halving**

```
50 BTC

↓

25 BTC

↓

12,5 BTC

↓

6,25 BTC

↓

...
```

L'Halving riduce progressivamente l'emissione di nuovi Bitcoin.

---

### 10.9 Perché Bitcoin ha valore

Bitcoin non possiede un valore imposto da uno Stato.

Il suo valore deriva principalmente da:

- scarsità;
- domanda di mercato;
- fiducia degli utenti;
- sicurezza della rete;
- decentralizzazione.

Come per molti altri beni economici, il prezzo dipende dall'incontro tra domanda e offerta.

---

### 10.10 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Bitcoin | Prima criptovaluta decentralizzata |
| Satoshi Nakamoto | Creatore di Bitcoin |
| Genesis Block | Primo blocco della Blockchain |
| Halving | Dimezzamento della ricompensa |
| Satoshi | Più piccola unità di Bitcoin |

---

<a id="m11"></a>

# M11 — Ethereum

### 11.1 La nascita di Ethereum

Dopo il successo di Bitcoin emerse una nuova esigenza.

La Blockchain poteva essere utilizzata non solo per trasferire denaro, ma anche per eseguire programmi.

Per rispondere a questa esigenza nacque Ethereum.

Il progetto venne proposto nel 2013 da:

**Vitalik Buterin**

e lanciato ufficialmente nel 2015.

---

### 11.2 L'idea rivoluzionaria

Bitcoin è stato progettato principalmente per gestire pagamenti.

Ethereum amplia questo concetto.

La sua Blockchain permette di eseguire programmi distribuiti chiamati:

**Smart Contract**

Questi programmi vengono eseguiti automaticamente dalla rete.

---

### 11.3 Ether

La criptovaluta della rete Ethereum prende il nome di:

**Ether**

abbreviato:

**ETH**

Ether viene utilizzato per:

- pagare le commissioni;
- eseguire Smart Contract;
- partecipare allo Staking;
- trasferire valore.

---

### 11.4 Ethereum Virtual Machine

Il cuore della piattaforma Ethereum è la:

**Ethereum Virtual Machine**

abbreviata:

**EVM**

L'EVM è un ambiente di esecuzione distribuito.

Ogni nodo della rete esegue gli stessi Smart Contract ottenendo gli stessi risultati.

---

### 11.5 Gas

Ogni operazione eseguita sulla rete Ethereum richiede il pagamento di una commissione.

Questa commissione prende il nome di:

**Gas**

Il Gas serve a:

- evitare spam;
- remunerare i validatori;
- limitare il consumo di risorse computazionali.

---

### 11.6 Da Proof of Work a Proof of Stake

Inizialmente Ethereum utilizzava la Proof of Work.

Successivamente è stata introdotta la Proof of Stake.

Questo cambiamento ha permesso di:

- ridurre drasticamente il consumo energetico;
- aumentare l'efficienza;
- migliorare la sostenibilità della rete.

---

### 11.7 Bitcoin ed Ethereum a confronto

| Bitcoin | Ethereum |
|----------|-----------|
| Nato nel 2009 | Nato nel 2015 |
| Creato da Satoshi Nakamoto | Creato da Vitalik Buterin |
| Obiettivo principale: pagamenti | Obiettivo principale: Smart Contract |
| Bitcoin (BTC) | Ether (ETH) |
| Proof of Work | Proof of Stake |

---

### 11.8 Ecosistema Ethereum

Nel corso degli anni Ethereum è diventato il punto di riferimento per numerose applicazioni decentralizzate.

Tra queste troviamo:

- finanza decentralizzata;
- NFT;
- DAO;
- giochi Blockchain;
- token digitali;
- piattaforme di voto;
- marketplace decentralizzati.

---

### 11.9 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Ethereum | Blockchain programmabile |
| Ether | Criptovaluta della rete Ethereum |
| EVM | Ethereum Virtual Machine |
| Gas | Commissione necessaria per eseguire operazioni |
| Vitalik Buterin | Ideatore di Ethereum |

---

<a id="m12"></a>

# M12 — Smart Contract

### 12.1 Cosa sono gli Smart Contract

Uno **Smart Contract** è un programma informatico memorizzato all'interno della Blockchain.

Il programma viene eseguito automaticamente quando si verificano determinate condizioni.

L'idea fondamentale può essere riassunta con la seguente regola.

> **If this, then that.**

Ovvero.

> Se accade una determinata condizione, allora esegui automaticamente l'azione prevista.

---

### 12.2 Un esempio semplice

Immaginiamo un distributore automatico di bevande.

```
Inserisci 2 €

↓

Verifica importo

↓

Prodotto disponibile?

↓

SÌ

↓

Consegna bevanda
```

Il distributore non ha bisogno di un operatore umano.

Lo Smart Contract funziona secondo la stessa logica.

---

### 12.3 Caratteristiche degli Smart Contract

Uno Smart Contract è:

- automatico;
- trasparente;
- immutabile;
- verificabile;
- distribuito.

Una volta pubblicato sulla Blockchain non può essere modificato facilmente.

---

### 12.4 Possibili applicazioni

Gli Smart Contract possono essere utilizzati per:

- assicurazioni;
- mutui;
- compravendite;
- certificazioni;
- voto elettronico;
- gestione della Supply Chain;
- distribuzione di royalties;
- gestione di token digitali.

---

### 12.5 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Smart Contract | Programma eseguito automaticamente sulla Blockchain |
| EVM | Ambiente di esecuzione degli Smart Contract |
| Gas | Commissione necessaria per l'esecuzione |
| DApp | Applicazione decentralizzata basata su Smart Contract |

---

<a id="m13"></a>

# M13 — Token digitali

### 13.1 Cosa sono i Token

Quando si parla di Blockchain è importante distinguere tra:

- criptovalute;
- token.

Un **Token** è una risorsa digitale creata sopra una Blockchain esistente.

A differenza di Bitcoin, un token non possiede una Blockchain propria.

Ad esempio.

```
Ethereum

↓

Smart Contract

↓

Token
```

La maggior parte dei token viene infatti realizzata tramite Smart Contract.

---

### 13.2 Criptovalute e Token

Le due categorie vengono spesso confuse.

Esiste però una differenza fondamentale.

| Criptovaluta | Token |
|---------------|--------|
| Possiede una Blockchain propria | Utilizza una Blockchain esistente |
| BTC | USDT |
| ETH | UNI |
| ADA | LINK |
| SOL | AAVE |

---

### 13.3 A cosa servono i Token

I Token possono rappresentare moltissime tipologie di beni.

Ad esempio:

- denaro digitale;
- punti fedeltà;
- quote societarie;
- certificati;
- opere d'arte;
- diritti di voto;
- immobili;
- licenze software.

La Blockchain permette quindi di digitalizzare praticamente qualsiasi bene.

---

### 13.4 Utility Token

Gli **Utility Token** permettono di utilizzare un determinato servizio.

Ad esempio possono consentire:

- accesso ad una piattaforma;
- utilizzo di un'applicazione;
- pagamento di servizi;
- partecipazione a programmi fedeltà.

---

### 13.5 Governance Token

I **Governance Token** consentono di partecipare alle decisioni di un progetto.

I possessori possono votare su:

- modifiche del protocollo;
- aggiornamenti software;
- utilizzo dei fondi;
- nuove funzionalità.

Il principio è simile a quello delle assemblee degli azionisti.

---

### 13.6 Stablecoin

Le **Stablecoin** sono Token progettati per mantenere un valore stabile.

Generalmente sono collegate ad una valuta tradizionale.

Ad esempio.

```
1 Stablecoin

≈

1 Dollaro USA
```

Tra gli impieghi principali troviamo:

- pagamenti;
- trasferimenti internazionali;
- protezione dalla volatilità.

---

### 13.7 Security Token

I **Security Token** rappresentano strumenti finanziari.

Possono identificare:

- quote societarie;
- obbligazioni;
- fondi di investimento;
- partecipazioni finanziarie.

La loro emissione è spesso soggetta alla normativa dei diversi Paesi.

---

### 13.8 Come nasce un Token

La creazione di un Token avviene generalmente mediante uno Smart Contract.

```
Blockchain

↓

Smart Contract

↓

Creazione Token

↓

Distribuzione agli utenti
```

Non è necessario sviluppare una nuova Blockchain.

---

### 13.9 Standard dei Token

Per garantire la compatibilità tra applicazioni sono stati definiti alcuni standard.

Tra i più diffusi troviamo:

| Standard | Utilizzo |
|-----------|----------|
| ERC-20 | Token fungibili |
| ERC-721 | NFT |
| ERC-1155 | Token multipli |

Questi standard permettono a Wallet ed Exchange di riconoscere automaticamente i Token.

---

### 13.10 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Token | Bene digitale creato su una Blockchain |
| Utility Token | Permette di utilizzare un servizio |
| Governance Token | Consente di votare |
| Stablecoin | Token con valore stabile |
| ERC-20 | Standard per Token fungibili |

---

<a id="m14"></a>

# M14 — NFT (Non Fungible Token)

### 14.1 Cosa significa NFT

NFT significa:

**Non Fungible Token**

ovvero:

**Token Non Fungibile**

La parola "fungibile" indica un bene perfettamente sostituibile con un altro identico.

Una banconota da 10 euro può essere sostituita con un'altra banconota dello stesso valore.

Un NFT invece rappresenta un oggetto unico.

---

### 14.2 Fungibile e Non Fungibile

Vediamo la differenza.

| Bene | Fungibile |
|-------|-----------|
| Moneta | ✔ |
| Bitcoin | ✔ |
| Oro puro | ✔ |
| NFT | ✘ |
| Opera d'arte originale | ✘ |

---

### 14.3 Cosa può rappresentare un NFT

Un NFT può rappresentare:

- immagini;
- fotografie;
- musica;
- video;
- certificati;
- opere d'arte;
- biglietti digitali;
- documenti;
- oggetti di videogiochi.

L'NFT non è necessariamente il file stesso.

Spesso rappresenta il certificato digitale che ne attesta proprietà e autenticità.

---

### 14.4 Come funziona

L'NFT viene creato attraverso uno Smart Contract.

```
File Digitale

↓

Smart Contract

↓

NFT

↓

Blockchain
```

La Blockchain registra:

- proprietario;
- identificativo univoco;
- cronologia dei trasferimenti.

---

### 14.5 Perché gli NFT sono unici

Ogni NFT possiede un identificativo esclusivo.

Due NFT possono rappresentare immagini molto simili.

Tuttavia avranno sempre identificativi differenti.

Questo permette di distinguere in modo univoco ogni oggetto digitale.

---

### 14.6 Esempi di utilizzo

Gli NFT trovano applicazione in numerosi ambiti.

Tra questi:

- arte digitale;
- collezionismo;
- videogiochi;
- certificati universitari;
- brevetti;
- biglietti per eventi;
- certificazioni professionali.

---

### 14.7 Vantaggi

Gli NFT offrono numerosi vantaggi.

- unicità;
- tracciabilità;
- autenticità;
- trasferibilità;
- verificabilità pubblica.

---

### 14.8 Limiti

Nonostante il loro successo, gli NFT presentano anche alcune criticità.

Tra queste:

- forte volatilità del mercato;
- possibili frodi;
- problemi legati al diritto d'autore;
- conservazione dei file digitali;
- speculazione finanziaria.

---

### 14.9 Concetti chiave

| Termine | Significato |
|----------|-------------|
| NFT | Token non fungibile |
| Fungibile | Bene perfettamente sostituibile |
| ERC-721 | Standard per NFT |
| Proprietà Digitale | Possesso certificato tramite Blockchain |

---

<a id="m15"></a>

# M15 — DeFi (Finanza Decentralizzata)

### 15.1 Cos'è la DeFi

**DeFi** significa:

**Decentralized Finance**

ovvero:

**Finanza Decentralizzata**

L'obiettivo della DeFi è offrire servizi finanziari senza intermediari tradizionali.

---

### 15.2 Come funziona

Nella finanza tradizionale.

```
Cliente

↓

Banca

↓

Servizio Finanziario
```

Nella DeFi.

```
Utente

↓

Smart Contract

↓

Servizio Finanziario
```

Lo Smart Contract sostituisce molte delle funzioni normalmente svolte dagli intermediari.

---

### 15.3 Servizi disponibili

Le piattaforme DeFi possono offrire:

- prestiti;
- depositi;
- scambio di criptovalute;
- investimenti;
- assicurazioni;
- gestione patrimoniale.

Tutto avviene tramite Smart Contract.

---

### 15.4 Exchange decentralizzati

Uno degli esempi più noti è rappresentato dai:

**DEX (Decentralized Exchange)**

Essi consentono agli utenti di scambiare Token direttamente tra loro.

Non è necessario affidare i propri fondi ad una società centrale.

---

### 15.5 Lending

Molte piattaforme permettono di concedere in prestito criptovalute.

```
Utente A

↓

Deposita Fondi

↓

Smart Contract

↓

Utente B riceve il prestito
```

Gli interessi vengono calcolati automaticamente.

---

### 15.6 Rischi

La DeFi offre numerose opportunità ma presenta anche alcuni rischi.

Tra questi:

- vulnerabilità degli Smart Contract;
- elevata volatilità;
- errori di programmazione;
- attacchi informatici;
- perdita delle chiavi private.

---

### 15.7 Concetti chiave

| Termine | Significato |
|----------|-------------|
| DeFi | Finanza Decentralizzata |
| DEX | Exchange decentralizzato |
| Lending | Prestito di criptovalute |
| Smart Contract | Programma che gestisce automaticamente il servizio |

---

<a id="m16"></a>

# M16 — DAO (Organizzazioni Autonome Decentralizzate)

### 16.1 Cosa significa DAO

L'acronimo **DAO** significa:

**Decentralized Autonomous Organization**

ovvero:

**Organizzazione Autonoma Decentralizzata**

Una DAO è un'organizzazione gestita attraverso Smart Contract e decisioni prese collettivamente dai partecipanti.

Non esiste un amministratore unico o un consiglio di amministrazione centrale.

Le regole operative sono definite dal codice informatico pubblicato sulla Blockchain.

---

### 16.2 Come funziona una DAO

Una DAO opera seguendo un insieme di regole prestabilite.

Il funzionamento può essere rappresentato così.

```
Comunità

↓

Proposta

↓

Votazione

↓

Smart Contract

↓

Esecuzione automatica
```

Se una proposta ottiene il numero di voti necessario, lo Smart Contract esegue automaticamente quanto previsto.

---

### 16.3 Governance decentralizzata

Le decisioni vengono generalmente prese mediante votazione.

I partecipanti possono esprimersi su:

- aggiornamenti del protocollo;
- utilizzo del tesoro della DAO;
- nuove funzionalità;
- modifiche alle regole;
- finanziamento di nuovi progetti.

Il diritto di voto è spesso proporzionale al numero di Governance Token posseduti.

---

### 16.4 Vantaggi delle DAO

Le DAO offrono numerosi vantaggi.

| Vantaggio | Descrizione |
|-----------|-------------|
| Trasparenza | Le regole sono pubbliche |
| Decentralizzazione | Nessuna autorità centrale |
| Automazione | Gli Smart Contract eseguono automaticamente le decisioni |
| Partecipazione | La comunità contribuisce alle scelte |
| Tracciabilità | Ogni voto è registrato sulla Blockchain |

---

### 16.5 Limiti delle DAO

Le DAO presentano anche alcune criticità.

Tra queste:

- possibili errori negli Smart Contract;
- partecipazione limitata degli utenti;
- concentrazione del potere nei grandi possessori di Token;
- incertezza normativa in molti Paesi.

---

### 16.6 Esempi di utilizzo

Le DAO vengono utilizzate per:

- gestione di protocolli DeFi;
- finanziamento di progetti Open Source;
- investimenti collettivi;
- comunità digitali;
- organizzazioni no-profit;
- gestione di tesorerie decentralizzate.

---

### 16.7 Concetti chiave

| Termine | Significato |
|----------|-------------|
| DAO | Organizzazione Autonoma Decentralizzata |
| Governance | Processo decisionale della comunità |
| Governance Token | Token che attribuisce diritto di voto |
| Smart Contract | Programma che applica automaticamente le decisioni |

---

<a id="m17"></a>

# M17 — Layer 1 e Layer 2

### 17.1 Il problema della scalabilità

Con l'aumento del numero di utenti è emersa una difficoltà importante.

Le Blockchain devono elaborare sempre più transazioni.

Questo può provocare:

- rallentamenti;
- aumento delle commissioni;
- congestione della rete.

Per affrontare questo problema sono stati introdotti i concetti di **Layer 1** e **Layer 2**.

---

### 17.2 Cos'è un Layer 1

Il **Layer 1** rappresenta la Blockchain principale.

È il livello sul quale vengono registrate le transazioni definitive.

Esempi di Layer 1 sono:

- Bitcoin;
- Ethereum;
- Solana;
- Cardano;
- Avalanche.

---

### 17.3 Caratteristiche del Layer 1

Una Blockchain Layer 1 gestisce direttamente:

- consenso;
- sicurezza;
- validazione dei blocchi;
- conservazione del registro distribuito.

Ogni operazione viene verificata dai nodi della rete principale.

---

### 17.4 Cos'è un Layer 2

Un **Layer 2** è una soluzione costruita sopra una Blockchain esistente.

Il suo obiettivo è elaborare molte operazioni al di fuori della rete principale, riducendo il carico sul Layer 1.

Schema semplificato.

```
Utenti

↓

Layer 2

↓

Layer 1
```

---

### 17.5 Vantaggi del Layer 2

Le soluzioni Layer 2 permettono di ottenere:

- maggiore velocità;
- commissioni inferiori;
- migliore scalabilità;
- riduzione della congestione.

---

### 17.6 Alcuni esempi

Tra le principali tecnologie Layer 2 troviamo:

- Lightning Network (Bitcoin);
- Arbitrum;
- Optimism;
- Base;
- Polygon (in alcuni scenari);
- zkSync.

Ognuna utilizza tecniche differenti per migliorare le prestazioni.

---

### 17.7 Layer 1 e Layer 2 a confronto

| Layer 1 | Layer 2 |
|----------|----------|
| Blockchain principale | Livello aggiuntivo |
| Massima sicurezza | Maggiore velocità |
| Commissioni generalmente superiori | Commissioni ridotte |
| Gestisce il consenso | Si appoggia al Layer 1 |

---

### 17.8 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Layer 1 | Blockchain principale |
| Layer 2 | Soluzione costruita sopra una Blockchain |
| Scalabilità | Capacità di gestire molte transazioni |
| Congestione | Eccessivo carico della rete |

---

<a id="m18"></a>

# M18 — Sicurezza della Blockchain

### 18.1 Perché la Blockchain è considerata sicura

La sicurezza della Blockchain non dipende da un singolo elemento.

Essa deriva dalla combinazione di:

- crittografia;
- distribuzione dei dati;
- algoritmi di consenso;
- replica del registro;
- firme digitali.

Ogni componente contribuisce a proteggere il sistema.

---

### 18.2 Immutabilità

Uno dei concetti fondamentali è l'immutabilità.

Una volta confermato, un blocco non può essere modificato facilmente.

Qualsiasi alterazione cambierebbe il suo hash e invaliderebbe tutti i blocchi successivi.

---

### 18.3 Ridondanza

Poiché la Blockchain è distribuita su migliaia di nodi, non esiste un'unica copia dei dati.

```
Nodo A

Nodo B

Nodo C

Nodo D

Nodo E
```

Anche se alcuni nodi vengono spenti, la rete continua normalmente a funzionare.

---

### 18.4 Attacco del 51%

Uno degli attacchi teoricamente più noti è il cosiddetto:

**51% Attack**

Esso si verifica quando un soggetto controlla oltre la metà della potenza di calcolo (Proof of Work) o della capacità di validazione (Proof of Stake).

In tale situazione potrebbe tentare di:

- censurare transazioni;
- riscrivere parte della cronologia recente;
- effettuare attacchi di Double Spending.

Per le grandi Blockchain pubbliche questo tipo di attacco è estremamente difficile e molto costoso.

---

### 18.5 Errori umani

Molti problemi di sicurezza non dipendono dalla Blockchain.

Sono invece causati da errori degli utenti.

Tra gli errori più comuni troviamo:

- perdita della Seed Phrase;
- divulgazione della Private Key;
- truffe di phishing;
- malware;
- falsi Wallet.

---

### 18.6 Buone pratiche

Per utilizzare la Blockchain in modo sicuro è consigliabile:

- conservare offline la Seed Phrase;
- utilizzare Wallet affidabili;
- attivare l'autenticazione a più fattori quando disponibile;
- verificare sempre gli indirizzi di destinazione;
- aggiornare regolarmente il software.

---

### 18.7 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Immutabilità | Difficoltà di modificare dati già registrati |
| Ridondanza | Molte copie della Blockchain |
| 51% Attack | Controllo della maggioranza della rete |
| Phishing | Tentativo di furto delle credenziali |
| Seed Phrase | Frase di recupero del Wallet |

---

<a id="m19"></a>

# M19 — Applicazioni della Blockchain

### 19.1 Oltre le criptovalute

La Blockchain è nata per supportare Bitcoin.

Con il passare degli anni si è dimostrata una tecnologia utilizzabile in moltissimi altri settori.

Oggi viene impiegata per gestire:

- documenti;
- contratti;
- identità digitali;
- certificazioni;
- logistica;
- sanità;
- pubblica amministrazione;
- industria.

La Blockchain rappresenta quindi una tecnologia trasversale.

---

### 19.2 Tracciabilità della Supply Chain

Una delle applicazioni più diffuse riguarda la **Supply Chain**, ovvero la catena di approvvigionamento.

Ogni fase del ciclo produttivo può essere registrata sulla Blockchain.

```
Produzione

↓

Trasporto

↓

Magazzino

↓

Distribuzione

↓

Cliente
```

Ogni passaggio viene memorizzato in modo permanente.

---

### 19.3 Vantaggi nella logistica

L'utilizzo della Blockchain permette di:

- tracciare i prodotti;
- ridurre le frodi;
- verificare l'origine delle merci;
- migliorare la trasparenza;
- semplificare gli audit.

Queste caratteristiche risultano particolarmente utili nei settori alimentare, farmaceutico e del lusso.

---

### 19.4 Certificati digitali

La Blockchain può essere utilizzata per conservare certificati digitali.

Ad esempio:

- diplomi;
- attestati professionali;
- certificazioni linguistiche;
- brevetti;
- certificazioni aziendali.

Chiunque può verificarne l'autenticità senza dover contattare l'ente che li ha emessi.

---

### 19.5 Identità digitale

La Blockchain può supportare sistemi di identità digitale decentralizzata.

L'utente mantiene il controllo delle proprie informazioni personali.

Può decidere quali dati condividere con i diversi servizi.

Questo approccio prende spesso il nome di:

**Self Sovereign Identity (SSI)**

---

### 19.6 Sanità

Nel settore sanitario la Blockchain può essere utilizzata per:

- gestione delle cartelle cliniche;
- condivisione sicura dei dati;
- tracciabilità dei farmaci;
- verifica delle prescrizioni;
- certificazione dei referti.

È comunque necessario rispettare le normative sulla protezione dei dati personali.

---

### 19.7 Pubblica Amministrazione

Anche gli enti pubblici possono beneficiare della Blockchain.

Possibili applicazioni:

- gestione documentale;
- protocolli digitali;
- catasto;
- voto elettronico;
- certificati anagrafici;
- registri pubblici.

---

### 19.8 Proprietà intellettuale

Autori e creatori di contenuti possono utilizzare la Blockchain per dimostrare:

- paternità di un'opera;
- data di creazione;
- cronologia delle modifiche;
- trasferimenti di proprietà.

Questo non sostituisce automaticamente il diritto d'autore, ma costituisce una prova tecnica utile.

---

### 19.9 Internet of Things (IoT)

L'Internet delle Cose collega dispositivi intelligenti alla rete.

La Blockchain può consentire a tali dispositivi di:

- identificarsi;
- scambiarsi dati;
- effettuare pagamenti automatici;
- registrare eventi;
- certificare misurazioni.

---

### 19.10 Industria 4.0

Nel contesto dell'Industria 4.0 la Blockchain viene utilizzata per:

- monitorare la produzione;
- certificare componenti;
- controllare la qualità;
- gestire manutenzioni;
- condividere dati tra aziende.

---

### 19.11 Concetti chiave

| Termine | Significato |
|----------|-------------|
| Supply Chain | Catena di approvvigionamento |
| SSI | Identità digitale decentralizzata |
| IoT | Internet of Things |
| Tracciabilità | Possibilità di seguire la storia di un bene |
| Certificato Digitale | Documento verificabile tramite Blockchain |

---

<a id="m20"></a>

# M20 — Vantaggi, limiti e prospettive future

### 20.1 Perché la Blockchain è importante

La Blockchain rappresenta una delle innovazioni tecnologiche più significative degli ultimi anni.

La sua importanza deriva dalla capacità di creare fiducia tra soggetti che non si conoscono, senza richiedere un'autorità centrale.

---

### 20.2 Principali vantaggi

Tra i principali punti di forza troviamo:

- decentralizzazione;
- trasparenza;
- sicurezza;
- immutabilità;
- tracciabilità;
- disponibilità continua;
- automazione tramite Smart Contract.

---

### 20.3 Limiti attuali

La tecnologia presenta ancora alcune criticità.

| Limite | Descrizione |
|---------|-------------|
| Scalabilità | Alcune reti gestiscono poche transazioni al secondo |
| Commissioni | Possono aumentare nei periodi di congestione |
| Consumo energetico | Alcune Blockchain richiedono molta energia |
| Complessità | Richiede competenze tecniche |
| Normativa | Legislazione ancora in evoluzione |

---

### 20.4 Sfide future

Nei prossimi anni la ricerca sarà orientata verso:

- Blockchain più veloci;
- commissioni ridotte;
- maggiore interoperabilità;
- sostenibilità energetica;
- integrazione con Intelligenza Artificiale;
- maggiore tutela della privacy.

---

### 20.5 Blockchain e Intelligenza Artificiale

Blockchain e Intelligenza Artificiale rappresentano due tecnologie complementari.

L'IA può:

- analizzare grandi quantità di dati;
- supportare decisioni automatiche;
- individuare anomalie.

La Blockchain può invece:

- certificare l'origine dei dati;
- garantire l'integrità delle informazioni;
- tracciare le operazioni effettuate dai sistemi intelligenti.

La combinazione delle due tecnologie è oggetto di intensa ricerca.

---

### 20.6 Blockchain e sostenibilità

Le Blockchain di nuova generazione cercano di ridurre il consumo energetico.

Molte reti hanno adottato algoritmi di consenso più efficienti rispetto alla Proof of Work.

Questo contribuisce a diminuire l'impatto ambientale.

---

### 20.7 Competenze richieste

Le figure professionali che operano nel settore Blockchain possiedono competenze multidisciplinari.

Tra queste:

- programmazione;
- crittografia;
- reti informatiche;
- sicurezza informatica;
- basi di dati;
- diritto digitale;
- economia.

---

### 20.8 Figure professionali

La diffusione della Blockchain ha favorito la nascita di nuove professioni.

Alcuni esempi sono:

- Blockchain Developer;
- Smart Contract Developer;
- Blockchain Architect;
- Security Auditor;
- Consulente Blockchain;
- Web3 Developer;
- Ricercatore in tecnologie decentralizzate.

---

### 20.9 Riepilogo del corso

Nel corso sono stati affrontati i principali concetti della tecnologia Blockchain.

In particolare hai studiato:

- storia della Blockchain;
- registri distribuiti;
- blocchi;
- hash crittografici;
- crittografia asimmetrica;
- Wallet;
- transazioni;
- Mining;
- Proof of Work;
- Proof of Stake;
- Bitcoin;
- Ethereum;
- Smart Contract;
- Token;
- NFT;
- DeFi;
- DAO;
- Layer 1 e Layer 2;
- sicurezza;
- applicazioni reali.

Queste conoscenze costituiscono una solida base per approfondire il mondo del Web3 e delle tecnologie decentralizzate.

---

### 20.10 Glossario essenziale

| Termine | Definizione sintetica |
|----------|-----------------------|
| Blockchain | Registro distribuito composto da blocchi concatenati |
| Nodo | Computer che partecipa alla rete |
| Hash | Impronta digitale dei dati |
| Wallet | Strumento che gestisce le chiavi crittografiche |
| Smart Contract | Programma eseguito automaticamente sulla Blockchain |
| Token | Bene digitale creato su una Blockchain |
| NFT | Token non fungibile |
| DAO | Organizzazione autonoma decentralizzata |
| DeFi | Finanza decentralizzata |
| Layer 2 | Soluzione che migliora scalabilità e prestazioni |

---

# Conclusioni

La Blockchain rappresenta una tecnologia destinata ad avere un ruolo sempre più importante nella trasformazione digitale.

Pur essendo nata per supportare le criptovalute, oggi trova applicazione in numerosi settori, dalla finanza alla logistica, dalla sanità all'industria, fino alla gestione dell'identità digitale.

Comprendere i suoi principi di funzionamento significa acquisire competenze fondamentali per affrontare le sfide dell'economia digitale e del Web3.

Con questa introduzione disponi delle basi necessarie per proseguire lo studio di argomenti più avanzati come la programmazione di Smart Contract, lo sviluppo di applicazioni decentralizzate (DApp), la tokenizzazione degli asset e gli ecosistemi Blockchain di nuova generazione.

---

