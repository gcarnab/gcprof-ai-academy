# ⛓️ Modulo 12 — Token e Standard ERC

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟡 Intermedio (Fase 4 — Ethereum e Smart Contract)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 10 — Smart Contract, Modulo 11 — Solidity  
> **Obiettivo Didattico:** Comprendere cos'è un token su Ethereum, la differenza tra fungibilità e non-fungibilità, i tre standard ERC più diffusi (ERC-20, ERC-721, ERC-1155), perché l'adozione di uno standard condiviso è cruciale per l'interoperabilità, e come impostare concettualmente la creazione di un token personalizzato.

---

<a id="indice"></a>
# 📑 Indice del Modulo 12

1. [Capitolo 1 — Cos'è davvero un Token su Ethereum](#capitolo-1)
2. [Capitolo 2 — Fungibilità vs Non-Fungibilità](#capitolo-2)
3. [Capitolo 3 — ERC-20: lo Standard dei Token Fungibili](#capitolo-3)
4. [Capitolo 4 — ERC-721: lo Standard degli NFT](#capitolo-4)
5. [Capitolo 5 — ERC-1155: lo Standard Multi-Token](#capitolo-5)
6. [Capitolo 6 — Perché uno Standard Condiviso: il Valore dell'Interoperabilità](#capitolo-6)
7. [Capitolo 7 — Creare un Token Personalizzato: l'approccio concettuale](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Progetta il Tuo Token" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è davvero un Token su Ethereum

### Un errore comune da chiarire subito

Chi si avvicina per la prima volta al mondo Blockchain spesso pensa che creare un nuovo "token" richieda di costruire una Blockchain propria, con tanto di nodi, mining e consenso (Modulo 2, Modulo 6). Non è così: su Ethereum, un **token è semplicemente uno Smart Contract** (Modulo 10), scritto in Solidity (Modulo 11), che tiene traccia di saldi e trasferimenti seguendo alcune regole condivise.

### Il ruolo del `mapping`, già visto nel Modulo 11

Ricordi il tipo `mapping` introdotto nel Modulo 11? Un token, nella sua essenza più semplice, è quasi interamente costruito attorno a una struttura come questa:

```solidity
mapping(address => uint256) private saldo;
```

```
   Contratto "MioToken"
┌─────────────────────────────┐
│  saldo[Alice]  = 100         │
│  saldo[Bob]    = 50          │
│  saldo[Carlo]  = 0           │
└─────────────────────────────┘
```

Non esiste alcuna moneta "fisica" che si sposta: esiste solo un registro di numeri, aggiornato da funzioni di scrittura (Modulo 10), esattamente come i saldi discussi negli esempi dei moduli precedenti.

### Perché servono gli standard

Se ogni sviluppatore scrivesse questo registro a modo proprio — con nomi di funzione diversi, comportamenti leggermente differenti — nessun wallet, exchange o applicazione esterna saprebbe come interagirvi in modo affidabile. Nasce così l'esigenza di **standard condivisi**, chiamati **ERC** (*Ethereum Request for Comment*): specifiche pubbliche che definiscono un insieme minimo di funzioni ed eventi che un token deve implementare per essere riconosciuto e utilizzato universalmente. In questo modulo esploriamo i tre standard più diffusi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Fungibilità vs Non-Fungibilità

### Cosa significa "fungibile"

Un bene è **fungibile** quando ogni sua unità è perfettamente intercambiabile con qualsiasi altra unità dello stesso tipo, senza alcuna differenza di valore o identità. Una banconota da 10 euro, o un bitcoin (Modulo 5), sono fungibili: non importa "quale" specifica unità possiedi, ma solo "quanta" ne possiedi.

### Cosa significa "non-fungibile"

Un bene è invece **non-fungibile** quando ogni unità è unica e non intercambiabile: un biglietto nominativo per un concerto, un'opera d'arte originale, o il certificato di proprietà di un immobile specifico. Non ha senso chiedersi "quanti" ne possiedi, ma piuttosto "quale, esattamente" possiedi.

```
FUNGIBILE                          NON-FUNGIBILE
┌───┐ ┌───┐ ┌───┐                  ┌─────────┐
│ 5 │=│ 5 │=│ 5 │  (interscambiabili) │ Opera #7 │  ≠  altre opere,
└───┘ └───┘ └───┘                  └─────────┘     ognuna unica
```

### La tabella di riepilogo

| Caratteristica | Token Fungibile | Token Non-Fungibile (NFT) |
|---|---|---|
| Unità intercambiabili? | Sì, tutte identiche | No, ognuna unica |
| Domanda tipica | "Quanti ne possiedo?" | "Quale, esattamente, possiedo?" |
| Standard Ethereum | ERC-20 (Capitolo 3) | ERC-721 (Capitolo 4) |
| Esempi concettuali | Valuta, punti fedeltà, azioni | Opera d'arte digitale, biglietto nominativo, certificato |

Questa distinzione, apparentemente semplice, è il criterio principale che determina quale standard ERC utilizzare per un dato progetto — un tema che riprenderemo nel Capitolo 5, parlando dello standard "ibrido" ERC-1155.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — ERC-20: lo Standard dei Token Fungibili

### L'interfaccia minima richiesta

Lo standard **ERC-20**, proposto nel 2015, definisce l'insieme minimo di funzioni ed eventi che un token fungibile deve implementare per essere considerato "compatibile ERC-20":

| Funzione / Evento | Cosa fa |
|---|---|
| `totalSupply()` | Restituisce la quantità totale di token esistenti |
| `balanceOf(address)` | Restituisce il saldo di un indirizzo specifico |
| `transfer(address, uint256)` | Trasferisce token dal chiamante a un altro indirizzo |
| `approve(address, uint256)` | Autorizza un terzo indirizzo a spendere una quantità limitata dei propri token |
| `transferFrom(address, address, uint256)` | Permette a un terzo precedentemente autorizzato di trasferire token per conto del proprietario |
| `event Transfer` | Notifica ogni trasferimento avvenuto (Modulo 11, Capitolo 7) |
| `event Approval` | Notifica ogni autorizzazione concessa tramite `approve` |

### Perché `approve` e `transferFrom` sono così importanti

A prima vista, potrebbe sembrare che basti la funzione `transfer` per gestire ogni scambio. Ma pensiamo a un caso concreto: uno Smart Contract di scambio decentralizzato (che approfondiremo nel Modulo 15) deve poter prelevare token dal tuo saldo **per tuo conto**, in un momento successivo, senza che tu debba inviargli manualmente i fondi in anticipo. Il meccanismo `approve` + `transferFrom` risolve esattamente questo problema: prima autorizzi un limite di spesa, poi il contratto autorizzato esegue il trasferimento quando necessario.

```
   Passo 1: approve(Exchange, 100)     Passo 2: transferFrom(Tu, Destinatario, 100)
┌──────┐  "puoi spendere fino     ┌──────────┐  esegue il trasferimento
│  Tu   │   a 100 dei miei token"  │ Exchange  │  per tuo conto, entro il limite
└──────┘ ───────────────────────► └──────────┘  concesso in precedenza
```

### Un dettaglio pratico: i decimali

I token ERC-20 sono contati internamente come numeri interi (`uint256`, Modulo 11), ma la maggior parte dei token dichiara un numero di **decimali** (tipicamente 18) puramente a scopo di visualizzazione: un saldo interno di `1000000000000000000` corrisponde, mostrato all'utente, a "1 token", esattamente come 100 centesimi corrispondono a 1 euro.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — ERC-721: lo Standard degli NFT

### Cosa cambia rispetto a ERC-20

Lo standard **ERC-721**, proposto nel 2018, definisce i token **non fungibili** (Capitolo 2), universalmente noti come **NFT**. La differenza fondamentale rispetto a ERC-20 è che, invece di tracciare semplicemente "quanti token possiede ogni indirizzo", ERC-721 traccia **quale specifico token** (identificato da un `tokenId` univoco) appartiene a ogni indirizzo.

| Funzione principale | Cosa fa |
|---|---|
| `ownerOf(uint256 tokenId)` | Restituisce l'indirizzo proprietario di uno specifico token |
| `balanceOf(address)` | Restituisce quanti NFT distinti possiede un indirizzo (non un "saldo" in senso ERC-20) |
| `transferFrom(address, address, uint256 tokenId)` | Trasferisce un token specifico da un proprietario a un altro |
| `tokenURI(uint256 tokenId)` | Restituisce un indirizzo (tipicamente un link) ai metadati associati a quello specifico token |

### Il ruolo cruciale di `tokenURI`

La funzione `tokenURI` merita un chiarimento importante, spesso frainteso: **un NFT non "contiene" l'immagine o il file digitale al suo interno**. Contiene, tipicamente, solo un riferimento (un URI) che punta a dove trovare quei metadati — spesso un file JSON che descrive nome, descrizione e collegamento all'immagine associata.

```
Token ERC-721 #42
┌─────────────────────────┐
│ owner: 0xAlice...         │
│ tokenURI: "ipfs://Qm..." │──────► JSON metadati ──────► immagine
└─────────────────────────┘
```

Questo dettaglio tecnico ha implicazioni pratiche reali: se il contenuto puntato da `tokenURI` non viene conservato in modo permanente (ad esempio tramite IPFS, un sistema di archiviazione distribuita), l'NFT può in teoria "sopravvivere" sulla Blockchain anche se il contenuto a cui punta non è più raggiungibile. Approfondiremo usi concreti degli NFT oltre il collezionismo digitale nel Modulo 13.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — ERC-1155: lo Standard Multi-Token

### Il problema che risolve

Immaginiamo un videogioco che debba gestire centinaia di oggetti diversi: monete di gioco (fungibili, come nel Capitolo 3), ma anche armi ed equipaggiamenti unici (non fungibili, come nel Capitolo 4). Con gli standard visti finora, servirebbero **contratti separati** per ogni categoria di oggetto — una soluzione dispendiosa in termini di gas (Modulo 9) e complessità di gestione.

### La soluzione: un solo contratto, molti token

Lo standard **ERC-1155** permette di gestire, all'interno di un **singolo contratto**, sia token fungibili sia non fungibili, distinguendoli tramite un identificativo (`id`) associato a ciascuna categoria di token.

```
              Contratto ERC-1155 "InventarioGioco"
┌───────────────────────────────────────────────────────┐
│  id 1  → "Monete d'Oro"     (fungibile, quantità: 500)  │
│  id 2  → "Spada Leggendaria" (non fungibile, quantità: 1)│
│  id 3  → "Pozione Cura"      (fungibile, quantità: 20)   │
└───────────────────────────────────────────────────────┘
```

### Il vantaggio pratico: le transazioni in batch

Oltre alla flessibilità di gestire più tipi di token in un solo contratto, ERC-1155 introduce funzioni per il **trasferimento in batch**: è possibile spostare più tipi di token diversi in un'unica transazione, invece di doverne inviare una per ciascuno, con un risparmio di gas significativo rispetto a operazioni equivalenti eseguite separatamente.

| Caratteristica | ERC-20 | ERC-721 | ERC-1155 |
|---|---|---|---|
| Fungibile | Sì | No | Sì e No, nello stesso contratto |
| Un contratto per categoria | Sì | Sì | No, un solo contratto per più categorie |
| Trasferimenti in batch nativi | No | No | Sì |
| Caso d'uso tipico | Valuta, punti | Opera unica, certificato | Inventari di gioco, collezioni miste |

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Perché uno Standard Condiviso: il Valore dell'Interoperabilità

### Il problema che uno standard risolve concretamente

Come accennato nel Capitolo 1, il valore reale di ERC-20, ERC-721 ed ERC-1155 non sta soltanto nella loro eleganza tecnica, ma nel fatto che **ogni applicazione dell'ecosistema Ethereum sa già, in anticipo, come interagire con qualsiasi token conforme**.

```
   Nuovo token ERC-20 pubblicato
              │
   ┌──────────┼──────────┬─────────────┐
   ▼          ▼          ▼             ▼
Wallet     Exchange   Explorer     dApp di terzi
riconosce  può        mostra       possono integrarlo
il saldo   scambiarlo il saldo     senza codice custom
```

### Un'analogia utile

Pensa a uno standard ERC come alla **presa elettrica di casa**: qualunque elettrodomestico costruito secondo lo standard può essere collegato, senza bisogno di adattatori personalizzati o accordi specifici con il produttore della presa. Allo stesso modo, un wallet come MetaMask (che approfondiremo nel Modulo 21) può mostrare correttamente il saldo di qualsiasi token ERC-20 esistente, semplicemente perché sa già quali funzioni chiamare.

### Le conseguenze pratiche

Questa interoperabilità è ciò che rende possibile, ad esempio, che un exchange decentralizzato (Modulo 15) possa scambiare token creati da sviluppatori completamente indipendenti, o che un marketplace di NFT possa mostrare opere provenienti da migliaia di collezioni diverse, senza dover integrare manualmente ciascuna di esse.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Creare un Token Personalizzato: l'approccio concettuale

### Non si riparte mai da zero

Un principio fondamentale nello sviluppo Blockchain professionale: **non si riscrive quasi mai uno standard da zero**. Esistono librerie di codice ampiamente verificate e riutilizzabili — la più diffusa è quella di **OpenZeppelin** — che forniscono implementazioni già pronte, testate e riviste degli standard ERC visti in questo modulo.

### Come si presenta, concettualmente, un token personalizzato

Grazie all'ereditarietà, un concetto della programmazione orientata agli oggetti disponibile anche in Solidity (Modulo 11), è possibile costruire un token personalizzato **estendendo** un'implementazione già pronta:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GcprofToken is ERC20 {
    constructor(uint256 fornituraIniziale) ERC20("GCProf Token", "GCP") {
        _mint(msg.sender, fornituraIniziale);
    }
}
```

### Cosa succede in questo esempio

* La riga `import` recupera l'implementazione già pronta e verificata dello standard ERC-20 fornita da OpenZeppelin.
* `contract GcprofToken is ERC20` dichiara che il nostro contratto **eredita** tutte le funzioni standard viste nel Capitolo 3 (`transfer`, `balanceOf`, `approve`...), senza doverle riscrivere manualmente.
* Il `constructor` — una funzione speciale eseguita una sola volta, al momento del deploy (Modulo 10) — imposta il nome (`"GCProf Token"`) e il simbolo (`"GCP"`) del token, e conia (`_mint`) la fornitura iniziale, assegnandola a chi effettua il deploy.

Questo approccio non è solo più rapido: riduce drasticamente il rischio di introdurre bug di sicurezza in una parte di codice — la gestione di saldi e trasferimenti — particolarmente delicata, richiamando quanto discusso a proposito dei rischi degli Smart Contract nel Modulo 10.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Progetta il Tuo Token" e Autoverifica

### 💡 Punti Chiave del Modulo 12

1. Un token su Ethereum non richiede una Blockchain propria: è uno Smart Contract che segue uno standard condiviso, chiamato ERC.
2. La distinzione fondamentale è tra beni **fungibili** (unità intercambiabili) e **non-fungibili** (unità uniche, gli NFT).
3. **ERC-20** è lo standard dei token fungibili, basato su funzioni come `transfer`, `balanceOf`, e sul meccanismo `approve` / `transferFrom`.
4. **ERC-721** è lo standard degli NFT, dove ogni `tokenId` è unico e associato, tramite `tokenURI`, a metadati esterni.
5. **ERC-1155** permette di gestire, in un solo contratto, sia token fungibili sia non fungibili, con il vantaggio dei trasferimenti in batch.
6. L'adozione di uno standard condiviso rende i token automaticamente compatibili con wallet, exchange e applicazioni di terzi, senza integrazioni personalizzate.
7. Nella pratica professionale, un token personalizzato si costruisce quasi sempre **estendendo** un'implementazione già verificata (come quella di OpenZeppelin), piuttosto che riscrivendo lo standard da zero.

---

### 🧪 Laboratorio Guidato: "Progetta il Tuo Token"

**Obiettivo:** Applicare la distinzione tra fungibile e non-fungibile a un caso pratico, scegliendo consapevolmente lo standard ERC più adatto.

* **Fase 1 — Il caso di studio:** In piccoli gruppi, scegliete uno di questi tre scenari (o proponetene uno originale): (a) un sistema di punti fedeltà per un negozio online; (b) una collezione di 500 illustrazioni digitali uniche create da un artista; (c) un gioco con monete di gioco, pozioni ripetibili e tre armi leggendarie uniche.
* **Fase 2 — Scelta motivata dello standard:** Per lo scenario scelto, individuate quale standard tra ERC-20, ERC-721 ed ERC-1155 sia più adatto, motivando la scelta con i criteri visti nei Capitoli 2-5 (fungibilità, numero di categorie di token, necessità di trasferimenti in batch).
* **Fase 3 — Definizione dei parametri di base:** Definite, sempre su carta, nome e simbolo del token (se rilevante, come per ERC-20), e — se avete scelto uno scenario con NFT — descrivete cosa conterrebbe idealmente il `tokenURI` di un singolo token.
* **Riflessione conclusiva:** Confrontate le scelte fatte dai diversi gruppi per lo stesso scenario: sono emerse motivazioni diverse per lo stesso standard, o standard diversi per lo stesso scenario? Cosa rivela questo confronto sulla natura "di design" — e non puramente tecnica — della scelta dello standard?

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cos'è, tecnicamente, un token su Ethereum?  
- A) Una Blockchain indipendente creata appositamente per quel token.  
- B) Uno Smart Contract che tiene traccia di saldi e trasferimenti seguendo uno standard condiviso.  
- C) Un file immagine caricato direttamente sulla Blockchain.  
- D) Una funzionalità nativa dell'EVM, non implementabile tramite codice.

**Domanda 2:** Qual è la differenza fondamentale tra un token fungibile e uno non-fungibile?  
- A) Il token fungibile può essere trasferito, quello non-fungibile no.  
- B) Nel token fungibile ogni unità è intercambiabile con le altre; nel non-fungibile ogni unità è unica.  
- C) Solo i token non-fungibili possono avere un simbolo, come "ETH" o "GCP".  
- D) Non esiste alcuna differenza sostanziale tra i due.

**Domanda 3:** A cosa serve il meccanismo `approve` + `transferFrom` nello standard ERC-20?  
- A) A distruggere permanentemente una quantità di token.  
- B) A permettere a un terzo indirizzo, precedentemente autorizzato, di trasferire token per conto del proprietario entro un limite concordato.  
- C) A cambiare il nome del token dopo il deploy.  
- D) A convertire automaticamente un token ERC-20 in un NFT.

**Domanda 4:** Qual è il principale vantaggio dello standard ERC-1155 rispetto a usare contratti ERC-20 ed ERC-721 separati?  
- A) Permette di gestire, in un solo contratto, sia token fungibili sia non fungibili, con trasferimenti in batch più efficienti.  
- B) È l'unico standard che supporta la funzione `transfer`.  
- C) Elimina completamente la necessità di pagare gas per ogni transazione.  
- D) È l'unico standard compatibile con i wallet come MetaMask.

---

[🔙 Torna all'indice](#indice)