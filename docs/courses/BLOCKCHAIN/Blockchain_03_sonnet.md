# ⛓️ Modulo 3 — Crittografia per tutti

> **Corso:** Master in Blockchain & Web3: Da Zero a Blockchain Developer  
> **Piattaforma:** GCProf Academy  
> **Livello:** 🟢 Base (Fase 2 — Crittografia e Sicurezza Digitale)  
> **Target:** Studenti delle scuole superiori, universitari, docenti, sviluppatori e appassionati  
> **Prerequisiti:** Modulo 1 — Perché nasce la Blockchain, Modulo 2 — Come funziona una Blockchain  
> **Obiettivo Didattico:** Comprendere in modo intuitivo e senza formule intimidatorie i concetti di hashing, crittografia simmetrica e crittografia asimmetrica, e capire perché queste tecnologie costituiscono il fondamento matematico della sicurezza in Blockchain.

---

<a id="indice"></a>
# 📑 Indice del Modulo 3

1. [Capitolo 1 — Perché la Crittografia è il Cuore della Blockchain](#capitolo-1)
2. [Capitolo 2 — L'Hashing come Funzione One-Way: un ripasso formale](#capitolo-2)
3. [Capitolo 3 — Crittografia Simmetrica: una chiave per tutto](#capitolo-3)
4. [Capitolo 4 — Il Limite della Crittografia Simmetrica: lo scambio delle chiavi](#capitolo-4)
5. [Capitolo 5 — Crittografia Asimmetrica: la coppia di chiavi](#capitolo-5)
6. [Capitolo 6 — Cifratura e Firma Digitale: due usi della crittografia asimmetrica](#capitolo-6)
7. [Capitolo 7 — La Crittografia Asimmetrica nella Blockchain](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio "Lucchetto e Cassetta Postale" e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Perché la Crittografia è il Cuore della Blockchain

Nei moduli precedenti abbiamo usato più volte parole come "hash", "firma" e "chiave" senza soffermarci troppo sul loro significato tecnico. È arrivato il momento di aprire questa "scatola nera" e comprendere davvero cosa rende sicura una Blockchain.

### La crittografia non è un dettaglio tecnico: è il fondamento

Se togliessimo la crittografia da una Blockchain, rimarrebbe soltanto un database distribuito senza alcuna garanzia di sicurezza: chiunque potrebbe fingersi qualcun altro, spendere fondi non suoi o alterare la storia delle transazioni senza essere scoperto.

La crittografia risponde a tre domande fondamentali, a cui dedicheremo questo modulo:

* **Integrità:** Come possiamo verificare che un dato non sia stato alterato? *(→ Hashing)*
* **Riservatezza:** Come possiamo proteggere un'informazione affinché solo il destinatario legittimo possa leggerla? *(→ Crittografia simmetrica e asimmetrica)*
* **Autenticità e Proprietà:** Come possiamo dimostrare di essere davvero i proprietari di un fondo digitale, senza rivelare informazioni segrete? *(→ Firma digitale, che vedremo nel dettaglio anche nel Modulo 4)*

Non servirà alcuna formula matematica complessa: ogni concetto verrà spiegato attraverso analogie visive ed esempi pratici, così come promesso nella presentazione del corso.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — L'Hashing come Funzione One-Way: un ripasso formale

Nel Modulo 2 abbiamo già incontrato la funzione di hash come strumento per concatenare i blocchi. Ora la inquadriamo più precisamente all'interno della famiglia delle tecniche crittografiche.

### Hashing: integrità, non segretezza

È importante chiarire subito un equivoco molto comune: **l'hashing non serve a nascondere un'informazione**, ma a **certificarne l'integrità**. L'hash di un documento non è una versione "cifrata" del documento: è un'impronta digitale che permette di verificare se il documento originale è rimasto invariato.

```
DOCUMENTO ORIGINALE ──────► FUNZIONE DI HASH ──────► IMPRONTA (hash)
"Contratto di vendita"                                a3f9c2...

Se anche solo una virgola cambia nel documento, l'impronta
cambia COMPLETAMENTE e in modo imprevedibile.
```

### Un'analogia: l'impronta digitale umana

Così come l'impronta digitale di una persona è unica e non permette di "ricostruire" il volto del proprietario, l'hash di un dato è unico (con probabilità di collisione trascurabile) e non permette di risalire al contenuto originale. Per questo motivo, l'hashing viene utilizzato in Blockchain non solo per concatenare i blocchi, ma anche per:

* generare gli **indirizzi dei wallet** a partire dalle chiavi pubbliche (Modulo 4);
* verificare l'**integrità di un intero blocco** di transazioni;
* costruire strutture dati avanzate come il **Merkle Tree**, che approfondiremo nei moduli dedicati a Bitcoin.

Con questo ripasso completato, possiamo ora affrontare il secondo grande pilastro della crittografia: la protezione della riservatezza di un'informazione.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Crittografia Simmetrica: una chiave per tutto

La **crittografia** (a differenza dell'hashing) serve a rendere un'informazione illeggibile a chiunque non possieda la chiave corretta per "riaprirla". La forma più antica e intuitiva di crittografia è quella **simmetrica**.

### Il principio della crittografia simmetrica

Nella crittografia simmetrica esiste **un'unica chiave**, condivisa tra mittente e destinatario, utilizzata sia per **cifrare** (rendere illeggibile) sia per **decifrare** (rendere nuovamente leggibile) il messaggio.

```
MITTENTE                                          DESTINATARIO
   │                                                    │
"Ciao Bob"                                              │
   │                                                    │
   ▼  Cifratura con CHIAVE SEGRETA "X7k9"                │
"h#94kd..."  ────────► (canale insicuro) ────────►  "h#94kd..."
                                                          │
                                                          ▼ Decifratura con la STESSA chiave "X7k9"
                                                     "Ciao Bob"
```

### Un esempio storico e intuitivo: il Cifrario di Cesare

Uno degli esempi più semplici di crittografia simmetrica risale all'antica Roma: il **Cifrario di Cesare**, in cui ogni lettera del messaggio viene sostituita con quella che si trova un numero fisso di posizioni più avanti nell'alfabeto (ad esempio, spostando di 3 posizioni, la "A" diventa "D").

Chi conosce il numero di posizioni (la "chiave") può facilmente cifrare e decifrare il messaggio. Gli algoritmi moderni di crittografia simmetrica (come l'**AES**, *Advanced Encryption Standard*) sono incomparabilmente più complessi e sicuri, ma condividono lo stesso principio di fondo: un'unica chiave condivisa.

### Il grande vantaggio: la velocità

La crittografia simmetrica è estremamente rapida dal punto di vista computazionale, ed è per questo tuttora ampiamente utilizzata (ad esempio per cifrare interi dischi rigidi o il traffico di una connessione Wi-Fi). Tuttavia, presenta un problema strutturale che la rende inadatta, da sola, a un sistema aperto come la Blockchain.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Il Limite della Crittografia Simmetrica: lo scambio delle chiavi

### Il problema: come condividere la chiave in sicurezza?

Immagina che Alice voglia inviare un messaggio cifrato a Bob usando la crittografia simmetrica. Prima di tutto, Alice deve trovare un modo per comunicare a Bob **quale sia la chiave segreta**. Ma come può farlo in modo sicuro?

* Se invia la chiave via email o messaggio, chiunque intercetti quella comunicazione potrà leggere anche tutti i messaggi cifrati successivi.
* Se i due si incontrano di persona per scambiarsi la chiave, il sistema funziona, ma diventa **impraticabile su scala globale**, con milioni di utenti sconosciuti che non si sono mai incontrati.

```
   Alice                                    Bob
     │                                       │
     │  "La chiave segreta è X7k9"           │
     └───────────► (canale intercettabile) ──┘
                          │
                    👁️ Un attaccante (Eve)
                    intercetta la chiave e può
                    leggere tutti i messaggi futuri
```

### Perché questo è un problema critico per la Blockchain

Una Blockchain pubblica, come Bitcoin o Ethereum, coinvolge milioni di partecipanti sconosciuti tra loro, sparsi in tutto il mondo, che non hanno mai avuto occasione di incontrarsi né di scambiarsi in modo sicuro alcuna chiave segreta condivisa. Serviva quindi un approccio completamente diverso, che eliminasse la necessità di condividere un segreto comune.

La soluzione a questo problema, formulata per la prima volta negli anni '70 da ricercatori come Whitfield Diffie, Martin Hellman e successivamente dal team Rivest-Shamir-Adleman (RSA), prende il nome di **crittografia asimmetrica** — ed è la tecnologia su cui si fonda l'intera sicurezza della Blockchain.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Crittografia Asimmetrica: la coppia di chiavi

### Il principio rivoluzionario: due chiavi, non una

La crittografia asimmetrica (o **crittografia a chiave pubblica**) si basa su un'idea elegante: invece di un'unica chiave condivisa, ogni utente genera una **coppia di chiavi matematicamente collegate**:

* **Chiave Pubblica:** Può essere condivisa liberamente con chiunque, esattamente come un indirizzo email o un numero di conto corrente. Non è un segreto.
* **Chiave Privata:** Deve rimanere strettamente segreta e conosciuta solo dal proprietario. È l'equivalente digitale di una firma autografa unica e non falsificabile.

```
              ┌─────────────────────────┐
              │   Coppia di Chiavi      │
              │   (generate insieme)    │
              └─────────────────────────┘
                    │              │
          ┌─────────┘              └─────────┐
          ▼                                   ▼
   🔑 CHIAVE PRIVATA                   🔓 CHIAVE PUBBLICA
   Segreta, mai condivisa              Condivisibile liberamente
   Custodita dal proprietario          Visibile a tutti
```

### La proprietà matematica alla base del sistema

Le due chiavi sono generate attraverso funzioni matematiche particolari (basate, ad esempio, sulla fattorizzazione di numeri primi molto grandi o sulla crittografia a curve ellittiche, utilizzata proprio da Bitcoin ed Ethereum) tali che:

* ciò che viene cifrato con la chiave pubblica può essere decifrato **solo** con la corrispondente chiave privata;
* è computazionalmente impossibile risalire dalla chiave pubblica alla chiave privata, anche conoscendo esattamente l'algoritmo utilizzato.

Grazie a questa proprietà, Alice può condividere pubblicamente la propria chiave pubblica senza alcun timore: nessuno, nemmeno conoscendola, potrà mai risalire alla sua chiave privata né decifrare i messaggi a lei destinati.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Cifratura e Firma Digitale: due usi della crittografia asimmetrica

La coppia di chiavi pubblica/privata può essere utilizzata in due modi complementari, a seconda di quale chiave venga usata per cifrare.

### Uso 1 — Cifratura di un messaggio riservato

Se Alice vuole inviare un messaggio segreto a Bob, lo cifra utilizzando la **chiave pubblica di Bob**. Solo Bob, possessore della corrispondente chiave privata, potrà decifrarlo.

```
Alice cifra "Ciao Bob" con la CHIAVE PUBBLICA di Bob
        │
        ▼
   Messaggio cifrato ────────► Bob
                                 │
                                 ▼
                Bob decifra con la sua CHIAVE PRIVATA
                                 │
                                 ▼
                           "Ciao Bob"
```

### Uso 2 — La Firma Digitale: dimostrare la propria identità

Il caso d'uso più importante per la Blockchain, che approfondiremo nel dettaglio nel Modulo 4, è l'opposto: Alice utilizza la **propria chiave privata** per "firmare" un'informazione (ad esempio, una transazione). Chiunque possieda la **chiave pubblica di Alice** può verificare che quella firma sia autentica, senza però poterla replicare né conoscere la chiave privata.

```
Alice firma la transazione con la SUA CHIAVE PRIVATA
        │
        ▼
Transazione + Firma ────────► Rete Blockchain (nodi)
                                 │
                                 ▼
        Chiunque verifica la firma con la CHIAVE
          PUBBLICA di Alice (nota a tutti)
                                 │
                                 ▼
       ✅ Firma valida → la transazione è autentica
       ❌ Firma non valida → transazione rifiutata
```

Questo meccanismo è ciò che permette a una Blockchain di stabilire con certezza matematica **chi ha autorizzato una transazione**, senza che nessuna banca o autorità centrale debba verificare un documento d'identità.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — La Crittografia Asimmetrica nella Blockchain

### Dalle chiavi agli indirizzi wallet

Nel Modulo 4 vedremo nel dettaglio come si genera un wallet, ma possiamo già anticipare il collegamento tra i concetti di questo modulo: un **indirizzo wallet** (l'equivalente di un IBAN in ambito bancario) non è altro che il risultato dell'applicazione di una funzione di hash (Capitolo 2) alla chiave pubblica dell'utente (Capitolo 5).

```
Chiave Privata ──► genera ──► Chiave Pubblica ──► hash ──► Indirizzo Wallet
   (segreta)                    (condivisibile)              (pubblico, es. 0x71C...)
```

### Perché questo sistema è rivoluzionario per la Blockchain

Grazie alla combinazione di hashing e crittografia asimmetrica, una Blockchain pubblica può garantire simultaneamente:

* **Pseudonimia:** Le transazioni sono associate a indirizzi (derivati da chiavi pubbliche), non a nomi o documenti d'identità.
* **Verificabilità pubblica:** Chiunque può verificare che una transazione sia stata autorizzata dal legittimo proprietario, semplicemente controllando la firma digitale con la chiave pubblica associata.
* **Nessuna autorità centrale necessaria:** Non serve una banca che confermi l'identità delle parti: la matematica stessa garantisce l'autenticità.

Questo è il motivo per cui, come vedremo nel prossimo modulo, **la sicurezza dei tuoi fondi dipende interamente dalla custodia della tua chiave privata**: chiunque la conosca può firmare transazioni a tuo nome, e nessuna banca potrà "recuperare la password" al posto tuo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio "Lucchetto e Cassetta Postale" e Autoverifica

### 💡 Punti Chiave del Modulo 3

1. L'**hashing** garantisce l'integrità di un dato (rilevare modifiche), non la sua riservatezza: è una funzione one-way, deterministica e sensibile a ogni variazione dell'input.
2. La **crittografia simmetrica** utilizza un'unica chiave condivisa per cifrare e decifrare: è veloce, ma soffre del problema critico dello **scambio sicuro della chiave**.
3. La **crittografia asimmetrica** risolve questo problema introducendo una **coppia di chiavi** matematicamente collegate: una pubblica (condivisibile) e una privata (segreta).
4. Cifrando con la chiave pubblica del destinatario si ottiene **riservatezza**; firmando con la propria chiave privata si ottiene **autenticità** (firma digitale).
5. In Blockchain, l'**indirizzo wallet** deriva dall'hash della chiave pubblica, e la sicurezza dei fondi dipende interamente dalla protezione della chiave privata.

---

### 🧪 Laboratorio Concettuale: "Il Lucchetto e la Cassetta Postale"

**Obiettivo:** Comprendere in modo tangibile la differenza tra crittografia simmetrica e asimmetrica, senza usare alcun computer.

* **Fase 1 — Simulazione della Crittografia Simmetrica (una sola chiave):**
  * In coppia, uno studente (Alice) scrive un messaggio segreto in una scatola e la chiude con un lucchetto.
  * Per far leggere il messaggio a Bob, Alice deve consegnargli **anche la chiave** del lucchetto (magari facendola scivolare in una busta separata).
  * *Riflessione:* Se qualcuno intercetta la busta con la chiave durante il tragitto, potrà aprire la scatola anche in futuro. Come si può risolvere questo problema senza incontrarsi mai di persona?

* **Fase 2 — Simulazione della Crittografia Asimmetrica (cassetta postale):**
  * Immagina una cassetta postale con una fessura per inserire lettere (aperta a tutti, rappresenta la **chiave pubblica**) e uno sportello posteriore apribile solo con una chiave unica in possesso del solo proprietario (rappresenta la **chiave privata**).
  * Chiunque può imbucare una lettera nella fessura (cifrare con la chiave pubblica), ma solo il proprietario della cassetta può aprirla e leggerla (decifrare con la chiave privata).
  * *Riflessione:* In questo scenario, non è mai stato necessario scambiarsi alcuna chiave segreta. Perché questo elimina il problema riscontrato nella Fase 1?

* **Fase 3 — Simulazione della Firma Digitale:**
  * Uno studente scrive un breve messaggio e appone un "sigillo" personale unico e riconoscibile (rappresenta la firma con la chiave privata), noto a tutta la classe grazie a un catalogo condiviso di sigilli (rappresenta le chiavi pubbliche note a tutti).
  * Gli altri studenti confrontano il sigillo ricevuto con quello ufficialmente registrato per quello studente, verificando così l'autenticità del messaggio senza che l'autore debba rivelare alcun segreto.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Qual è la funzione principale dell'hashing all'interno della crittografia?  
- A) Nascondere completamente il contenuto di un messaggio.  
- B) Verificare l'integrità di un dato, rilevando eventuali modifiche.  
- C) Generare automaticamente le chiavi private degli utenti.  
- D) Velocizzare la trasmissione dei dati in rete.

**Domanda 2:** Qual è il principale problema pratico della crittografia simmetrica in un sistema aperto come la Blockchain?  
- A) È troppo lenta per essere utilizzata su larga scala.  
- B) Richiede uno scambio sicuro della chiave segreta tra utenti sconosciuti tra loro.  
- C) Non permette di cifrare messaggi più lunghi di poche parole.  
- D) Non è compatibile con gli algoritmi di hashing.

**Domanda 3:** Cosa si ottiene cifrando un messaggio con la chiave pubblica del destinatario?  
- A) Un messaggio leggibile solo dal possessore della corrispondente chiave privata: riservatezza.  
- B) Una firma digitale verificabile da chiunque.  
- C) Un hash del messaggio originale.  
- D) Nessun effetto, poiché la chiave pubblica non può essere usata per cifrare.

**Domanda 4:** Da cosa deriva, in una Blockchain, l'indirizzo pubblico di un wallet?  
- A) Da un numero assegnato casualmente da un'autorità centrale.  
- B) Dall'hash della chiave pubblica dell'utente.  
- C) Dall'indirizzo IP del dispositivo utilizzato.  
- D) Dal nome utente scelto in fase di registrazione.

---

[🔙 Torna all'indice](#indice)