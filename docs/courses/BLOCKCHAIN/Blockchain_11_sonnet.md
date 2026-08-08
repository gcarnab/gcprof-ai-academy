# ⛓️ Modulo 11 — Solidity

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟡 Intermedio (Fase 4 — Ethereum e Smart Contract)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 9 — Ethereum, Modulo 10 — Smart Contract  
> **Obiettivo Didattico:** Muovere i primi passi con Solidity, il linguaggio più diffuso per scrivere Smart Contract su Ethereum: comprendere la struttura di un contratto, i principali tipi di dato, variabili, funzioni, modificatori ed eventi, con esempi di codice commentati passo per passo.

---

<a id="indice"></a>
# 📑 Indice del Modulo 11

1. [Capitolo 1 — Cos'è Solidity e perché serve un linguaggio dedicato](#capitolo-1)
2. [Capitolo 2 — Anatomia di un Contratto Solidity](#capitolo-2)
3. [Capitolo 3 — Tipi di Dato: Value Type e Reference Type](#capitolo-3)
4. [Capitolo 4 — Variabili di Stato e Visibilità](#capitolo-4)
5. [Capitolo 5 — Funzioni: parametri, valori di ritorno, view e pure](#capitolo-5)
6. [Capitolo 6 — Modificatori (Modifier): riusare le condizioni di accesso](#capitolo-6)
7. [Capitolo 7 — Eventi in Solidity: la sintassi concreta](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Il Mio Primo Contratto" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è Solidity e perché serve un linguaggio dedicato

Nel Modulo 10 abbiamo visto cosa fanno gli Smart Contract e come vengono eseguiti dalla EVM (Modulo 9). In questo modulo iniziamo a scrivere codice vero e proprio, usando **Solidity**, il linguaggio più diffuso per programmare Smart Contract su Ethereum.

### Perché non un linguaggio "generico"

Potrebbe sorprendere che, invece di riutilizzare un linguaggio già esistente come Python o JavaScript, la comunità Ethereum abbia sviluppato un linguaggio dedicato. La ragione è legata proprio ai vincoli di esecuzione discussi nel Modulo 9 e nel Modulo 10: un linguaggio pensato per la EVM deve gestire in modo esplicito e sicuro concetti come il consumo di gas, l'immutabilità del codice dopo il deploy, e la gestione del denaro reale.

### Le caratteristiche principali di Solidity

| Caratteristica | Descrizione |
|---|---|
| **Tipizzazione statica** | Ogni variabile deve dichiarare il proprio tipo, verificato prima ancora dell'esecuzione (Capitolo 3) |
| **Compilato in bytecode** | Il codice sorgente Solidity viene tradotto in bytecode eseguibile dalla EVM (Modulo 9) |
| **Orientato ai contratti** | L'unità fondamentale non è la "classe" ma il **contract**, che raggruppa dati e funzioni (Capitolo 2) |
| **Sintassi familiare** | Prende ispirazione da linguaggi come JavaScript e C++, per risultare relativamente accessibile |

```
Codice Solidity (.sol)
        │
        │  compilazione
        ▼
Bytecode EVM
        │
        │  deploy (Modulo 10)
        ▼
Contract Account eseguibile sulla rete
```

Nei moduli successivi (a partire dal Modulo 18) installeremo un vero ambiente di sviluppo; in questo modulo ci concentriamo sui concetti fondamentali del linguaggio, leggibili anche senza eseguire nulla sul proprio computer.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Anatomia di un Contratto Solidity

### Lo scheletro minimo

Ogni file Solidity segue una struttura ricorrente. Osserviamo lo scheletro più semplice possibile:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SalutoBase {
    // il corpo del contratto vive qui
}
```

### Riga per riga

* **`// SPDX-License-Identifier: MIT`** — Un commento standard che dichiara la licenza del codice: una convenzione ormai richiesta dagli strumenti di compilazione moderni.
* **`pragma solidity ^0.8.20;`** — Indica quale versione del compilatore Solidity deve essere usata per compilare questo file, garantendo che il comportamento del codice non cambi inaspettatamente con versioni future del linguaggio.
* **`contract SalutoBase { ... }`** — La parola chiave `contract` apre la definizione di uno Smart Contract, il cui nome (qui `SalutoBase`) sarà anche il nome della classe di bytecode che verrà pubblicata sulla Blockchain al momento del deploy (Modulo 10).

### Un'analogia utile

Se hai familiarità con altri linguaggi di programmazione, un `contract` in Solidity è concettualmente simile a una **classe**: definisce dati (variabili di stato, Capitolo 4) e comportamenti (funzioni, Capitolo 5). La differenza fondamentale è che, una volta deployata sulla Blockchain, una singola "istanza" di questo contratto vive permanentemente a un proprio indirizzo pubblico (Modulo 10), invece di esistere temporaneamente nella memoria di un solo computer.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Tipi di Dato: Value Type e Reference Type

Solidity, essendo staticamente tipizzato (Capitolo 1), richiede di dichiarare esplicitamente il tipo di ogni dato. I tipi si dividono in due grandi famiglie.

### Value Type: dati "semplici"

I **value type** rappresentano valori singoli, copiati per intero ogni volta che vengono assegnati o passati a una funzione.

| Tipo | Descrizione | Esempio |
|---|---|---|
| `uint` | Numero intero positivo (es. `uint256`, il più comune) | `uint256 eta = 25;` |
| `int` | Numero intero con segno | `int256 temperatura = -5;` |
| `bool` | Valore booleano | `bool attivo = true;` |
| `address` | Indirizzo Ethereum (un EOA o un Contract Account, Modulo 9) | `address proprietario;` |
| `bytes32` | Sequenza di byte a lunghezza fissa | `bytes32 hash;` |

### Reference Type: dati "strutturati"

I **reference type** rappresentano strutture dati più complesse, che occupano uno spazio variabile.

| Tipo | Descrizione | Esempio |
|---|---|---|
| `string` | Testo di lunghezza variabile | `string nome = "Ethereum";` |
| `array` | Elenco ordinato di elementi dello stesso tipo | `uint256[] numeri;` |
| `mapping` | Struttura chiave → valore, come un dizionario | `mapping(address => uint256) saldo;` |

### Il `mapping`, un tipo speciale da conoscere subito

Il tipo `mapping` merita un'attenzione particolare: è la struttura dati più usata per rappresentare associazioni tra un indirizzo e un valore, come i saldi che abbiamo visto nell'esempio del Modulo 10 (`saldo[msg.sender]`). Concettualmente, corrisponde esattamente al concetto di dizionario o hash map presente nella maggior parte dei linguaggi di programmazione moderni.

```
mapping(address => uint256) saldo;

saldo[0xAlice...] = 5;
saldo[0xBob...]   = 3;
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Variabili di Stato e Visibilità

### Variabili di stato vs variabili locali

Ricordando la distinzione tra storage e codice introdotta nel Modulo 10, in Solidity distinguiamo:

* le **variabili di stato**, dichiarate direttamente dentro il `contract` (fuori da ogni funzione): vengono salvate permanentemente nello storage del contratto;
* le **variabili locali**, dichiarate dentro una funzione: esistono solo durante l'esecuzione di quella funzione, e vengono perse subito dopo.

```solidity
contract Esempio {
    uint256 public contatore; // variabile di stato: persistente

    function incrementa() public {
        uint256 passo = 1;    // variabile locale: temporanea
        contatore += passo;
    }
}
```

### La visibilità: chi può vedere cosa

Ogni variabile di stato (e ogni funzione, come vedremo nel Capitolo 5) può dichiarare un livello di **visibilità**, che determina chi può accedervi:

| Visibilità | Accessibile da |
|---|---|
| `public` | Chiunque, sia dall'interno del contratto sia dall'esterno; genera automaticamente una funzione di lettura (Modulo 10, Capitolo 4) |
| `private` | Solo dall'interno dello stesso contratto |
| `internal` | Dal contratto stesso e da eventuali contratti che ne ereditano il codice |
| `external` | (Solo per le funzioni) Richiamabile esclusivamente dall'esterno del contratto |

Un dettaglio importante da ricordare, che riprenderemo nel Capitolo 7 sulla trasparenza: dichiarare una variabile `private` **non la nasconde realmente**. Impedisce ad altri contratti di leggerla direttamente tramite codice, ma l'intero storage della Blockchain resta comunque pubblicamente consultabile da chiunque analizzi i dati grezzi — un principio coerente con la trasparenza della Blockchain vista fin dal Modulo 2.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Funzioni: parametri, valori di ritorno, view e pure

### La struttura di base

```solidity
function nomeFunzione(uint256 parametro) public returns (uint256) {
    return parametro * 2;
}
```

Una funzione Solidity dichiara, nell'ordine: il proprio nome, i parametri in ingresso con il rispettivo tipo (Capitolo 3), la visibilità (Capitolo 4), ed eventualmente il tipo del valore restituito tramite `returns`.

### Richiamando la distinzione read/write del Modulo 10

Nel Modulo 10 abbiamo distinto le funzioni di lettura da quelle di scrittura. In Solidity, questa distinzione si esprime con parole chiave specifiche:

| Parola chiave | Significato | Costa gas? |
|---|---|---|
| *(nessuna)* | Funzione di scrittura: può modificare lo storage | Sì |
| `view` | Funzione di sola lettura: può leggere lo storage, ma non modificarlo | No, se chiamata dall'esterno |
| `pure` | Non legge né modifica lo storage: lavora solo con i dati ricevuti come parametro | No, se chiamata dall'esterno |

```solidity
uint256 public contatore;

function leggiContatore() public view returns (uint256) {
    return contatore;             // legge lo storage, non lo modifica
}

function somma(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;                 // non tocca affatto lo storage
}

function incrementa() public {
    contatore += 1;               // modifica lo storage: funzione di scrittura
}
```

Dichiarare correttamente `view` o `pure` non è solo una buona pratica stilistica: è un'informazione che il compilatore verifica attivamente, impedendo di scrivere per errore nello storage all'interno di una funzione dichiarata di sola lettura.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Modificatori (Modifier): riusare le condizioni di accesso

### Il problema: condizioni ripetute

Immaginiamo di voler permettere solo al proprietario di un contratto di eseguire alcune funzioni specifiche. Senza un meccanismo dedicato, dovremmo ripetere lo stesso controllo in ogni singola funzione:

```solidity
function preleva() public {
    require(msg.sender == proprietario, "Non sei il proprietario");
    // ... logica della funzione
}

function cambiaProprietario(address nuovo) public {
    require(msg.sender == proprietario, "Non sei il proprietario");
    // ... logica della funzione
}
```

### La soluzione: i modifier

Un **modifier** permette di estrarre questa condizione ripetuta in un unico blocco riutilizzabile, applicabile a più funzioni semplicemente nominandolo nella loro dichiarazione:

```solidity
address public proprietario;

modifier soloProprietario() {
    require(msg.sender == proprietario, "Non sei il proprietario");
    _;   // qui viene inserito il corpo della funzione originale
}

function preleva() public soloProprietario {
    // ... logica della funzione
}

function cambiaProprietario(address nuovo) public soloProprietario {
    proprietario = nuovo;
}
```

### Il simbolo `_;`: un dettaglio da non dimenticare

Il simbolo speciale `_;` all'interno del modifier indica esattamente il punto in cui verrà eseguito il corpo della funzione a cui il modifier è applicato. Se il controllo tramite `require` fallisce, l'esecuzione si interrompe prima di raggiungere quel punto, e l'intera funzione non viene mai eseguita.

### Un'analogia utile

Un modifier funziona come un **buttafuori all'ingresso di più eventi diversi**: applica la stessa regola di controllo (ad esempio, "solo chi ha il pass VIP entra") a ogni evento che lo richieda, senza dover riscrivere il controllo dell'identità a ogni singola porta.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Eventi in Solidity: la sintassi concreta

Nel Modulo 10 abbiamo introdotto gli eventi concettualmente: sono notifiche economiche che un contratto può emettere per comunicare con applicazioni esterne. Vediamo ora la sintassi Solidity concreta.

### Dichiarazione ed emissione

```solidity
contract Portafoglio {
    mapping(address => uint256) public saldo;

    event Deposito(address indexed mittente, uint256 importo);

    function deposita() public payable {
        saldo[msg.sender] += msg.value;
        emit Deposito(msg.sender, msg.value);
    }
}
```

* La parola chiave **`event`** dichiara la struttura della notifica, con nome e parametri tipizzati, esattamente come una funzione (Capitolo 5).
* La parola chiave **`emit`**, usata dentro una funzione di scrittura, "spara" effettivamente l'evento durante l'esecuzione, registrandolo nei log della transazione.

### La parola chiave `indexed`

Nell'esempio, il parametro `mittente` è marcato come **`indexed`**: questo permette alle applicazioni esterne di **filtrare** rapidamente gli eventi passati in base a quel valore (ad esempio, "mostrami tutti i depositi fatti da questo specifico indirizzo"), senza dover scandire manualmente ogni singolo evento registrato sulla catena. Solidity permette di marcare come `indexed` fino a tre parametri per ogni evento.

### `payable`: una parola chiave che abbiamo incontrato di sfuggita

Avrai notato la parola chiave `payable` nella dichiarazione di `deposita()`: indica che questa funzione può ricevere ETH insieme alla chiamata. Il valore ricevuto è accessibile tramite la variabile speciale `msg.value`, mentre `msg.sender` (già incontrata nel Modulo 10) contiene sempre l'indirizzo di chi ha inviato la transazione.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Il Mio Primo Contratto" e Autoverifica

### 💡 Punti Chiave del Modulo 11

1. Solidity è un linguaggio staticamente tipizzato, compilato in bytecode eseguibile dalla EVM (Modulo 9), progettato specificamente per gestire in modo sicuro denaro e logica immutabile.
2. Un contratto Solidity ha una struttura ricorrente: pragma di versione, parola chiave `contract`, variabili di stato e funzioni.
3. I tipi di dato si dividono in **value type** (`uint`, `bool`, `address`...) e **reference type** (`string`, `array`, `mapping`).
4. Le **variabili di stato** sono permanenti (storage), le **variabili locali** sono temporanee; la visibilità (`public`, `private`, `internal`, `external`) ne regola l'accesso.
5. Le funzioni possono essere di scrittura, `view` (sola lettura) o `pure` (nessun accesso allo storage), collegandosi direttamente alla distinzione read/write del Modulo 10.
6. I **modifier** permettono di riutilizzare condizioni di accesso comuni a più funzioni, come nel classico pattern `soloProprietario`.
7. Gli **eventi**, dichiarati con `event` ed emessi con `emit`, notificano in modo economico le applicazioni esterne; il parametro `indexed` ne permette il filtraggio efficiente.

---

### 🧪 Laboratorio Guidato: "Il Mio Primo Contratto"

**Obiettivo:** Consolidare i concetti del modulo leggendo e completando un contratto Solidity, senza necessariamente eseguirlo (l'ambiente di sviluppo verrà introdotto nel Modulo 18).

* **Fase 1 — Lettura guidata:** Analizza il contratto seguente riga per riga, individuando: la variabile di stato, il modifier, la funzione di scrittura, la funzione `view` e l'evento.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SalvadanaioDigitale {
    address public proprietario;
    uint256 public totaleRisparmiato;

    event Risparmio(address indexed chi, uint256 importo);

    constructor() {
        proprietario = msg.sender;
    }

    modifier soloProprietario() {
        require(msg.sender == proprietario, "Non sei il proprietario");
        _;
    }

    function risparmia() public payable {
        totaleRisparmiato += msg.value;
        emit Risparmio(msg.sender, msg.value);
    }

    function leggiTotale() public view returns (uint256) {
        return totaleRisparmiato;
    }
}
```

* **Fase 2 — Individua la funzione mancante:** Il contratto non permette ancora al proprietario di prelevare i fondi risparmiati. Prova a scrivere, su carta, la firma (nome, parametri, visibilità, modifier da applicare) di una funzione `preleva()`, riutilizzando il modifier `soloProprietario` già definito.
* **Fase 3 — Discussione:** Perché è importante che `leggiTotale()` sia dichiarata `view`? Cosa cambierebbe, in termini di costo e comportamento, se venisse dichiarata come una normale funzione di scrittura?

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Perché Ethereum utilizza un linguaggio dedicato come Solidity invece di un linguaggio generico già esistente?  
- A) Perché Solidity è più veloce da digitare rispetto a Python o JavaScript.  
- B) Perché un linguaggio dedicato può gestire in modo più sicuro ed esplicito vincoli specifici come gas, immutabilità del codice e gestione del denaro.  
- C) Perché la EVM non è in grado di eseguire alcun tipo di bytecode.  
- D) Non esiste alcuna ragione tecnica: è stata una scelta puramente casuale.

**Domanda 2:** Qual è la differenza fondamentale tra una variabile di stato e una variabile locale in Solidity?  
- A) Non esiste alcuna differenza pratica tra le due.  
- B) La variabile di stato è salvata permanentemente nello storage del contratto, quella locale esiste solo durante l'esecuzione della funzione.  
- C) Solo le variabili locali possono essere lette dall'esterno del contratto.  
- D) Le variabili di stato possono contenere solo numeri, quelle locali solo testo.

**Domanda 3:** A cosa serve un `modifier` in Solidity, come ad esempio `soloProprietario`?  
- A) A dichiarare un nuovo tipo di dato personalizzato.  
- B) A riutilizzare una condizione di accesso comune, applicabile a più funzioni senza ripeterne il codice.  
- C) A emettere automaticamente un evento a ogni chiamata di funzione.  
- D) A impedire in modo assoluto e permanente qualsiasi modifica al contratto.

**Domanda 4:** Qual è il ruolo della parola chiave `indexed` applicata a un parametro di un evento?  
- A) Rende il parametro obbligatoriamente di sola lettura.  
- B) Permette alle applicazioni esterne di filtrare in modo efficiente gli eventi passati in base a quel parametro.  
- C) Aumenta automaticamente il valore del parametro a ogni chiamata.  
- D) Trasforma la funzione in una funzione `view`.

---

[🔙 Torna all'indice](#indice)