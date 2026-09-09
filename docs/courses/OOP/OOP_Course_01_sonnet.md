<a id="indice-modulo"></a>
# Modulo 1: Dal Codice alla Realtà — Pensare a Oggetti
*Livello Base — OOP Explorer, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Guardati intorno. Il tuo smartphone, la carta che usi per pagare, il videogioco a cui hai giocato ieri sera, l'app della scuola che controlla le tue assenze: dietro a tutto questo software, quasi sempre, c'è lo stesso modo di pensare. Non un linguaggio di programmazione in particolare, ma un **paradigma**, cioè un modo di organizzare le idee prima ancora che il codice: la **Programmazione ad Oggetti**, in inglese *Object-Oriented Programming*, abbreviata **OOP**.

Fino ad oggi, probabilmente, hai scritto programmi come una sequenza di istruzioni: prima fai questo, poi quello, poi quell'altro. Funziona, per programmi piccoli. Ma prova a immaginare un sistema bancario con migliaia di conti, un videogioco con centinaia di personaggi, o un CRM che gestisce migliaia di clienti e ordini: a un certo punto, pensare "riga per riga" smette di reggere. Serve un modo diverso di organizzare il problema — e la storia dell'informatica ha risposto con l'OOP.

In questo modulo non scriverai ancora una singola riga di codice a oggetti (arriverà nel Modulo 2): l'obiettivo è cambiare **il modo in cui guardi un problema**, prima di cambiare il modo in cui lo scrivi. È il passaggio più importante di tutto il corso: chi lo salta, impara solo la sintassi dell'OOP senza mai capire perché esiste.

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare con parole tue cos'è la Programmazione ad Oggetti e da quale esigenza nasce.
- Distinguere un approccio procedurale da un approccio a oggetti di fronte allo stesso problema.
- Elencare i vantaggi concreti che l'OOP porta rispetto alla programmazione procedurale.
- Riconoscere, in un contesto reale (anche non informatico: banca, negozio, scuola, gioco), quali potrebbero diventare gli "oggetti" di un futuro programma.
- Avere una prima idea, ancora non tecnica, dei quattro pilastri dell'OOP che approfondirai nei moduli successivi.

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** conoscenza base di Python — variabili, `if`, cicli (`for`/`while`) e funzioni. Se questi concetti non ti sono ancora familiari, ripassali prima di continuare: il corso li dà per acquisiti a partire dal Modulo 2.
- **Non serve:** nessuna esperienza precedente con l'OOP, con le classi o con Java. Questo modulo è concettuale, non tecnico: nessun errore di sintassi ti fermerà qui.

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Cos'è la Programmazione ad Oggetti

La **Programmazione ad Oggetti (OOP)** è un paradigma di programmazione che organizza il codice intorno a **oggetti**, invece che intorno a una sequenza di istruzioni e funzioni separate dai dati.

Un oggetto, nel mondo del software, rappresenta qualcosa che esiste nel problema che stai modellando — reale o astratto — e che ha:

- **caratteristiche** (dati che lo descrivono);
- **comportamenti** (azioni che può compiere, o che si possono compiere su di lui).

*Perché ti serve: da qui in poi, in tutto il corso, "pensare a un oggetto" significherà sempre chiederti "che dati ha?" e "che cosa sa fare?" — è la domanda che guiderà ogni progetto che costruirai.*

### 4.2 Un mondo già fatto di oggetti

Non stai per imparare un modo innaturale di pensare: stai per imparare a **programmare come già pensi**. Il mondo reale, in fondo, è già organizzato in oggetti con caratteristiche e comportamenti:

- Un'**automobile** ha caratteristiche (colore, marca, velocità attuale) e comportamenti (accelerare, frenare, sterzare).
- Uno **studente** ha caratteristiche (nome, classe, media dei voti) e comportamenti (sostenere un esame, calcolare la propria media).
- Un **conto bancario** ha caratteristiche (intestatario, saldo, IBAN) e comportamenti (depositare, prelevare, calcolare gli interessi).
- Un **cliente** di un negozio online ha caratteristiche (nome, indirizzo, carrello) e comportamenti (aggiungere un prodotto al carrello, completare un ordine).
- Una **delegazione diplomatica** ha caratteristiche (paese rappresentato, mandato, obiettivi) e comportamenti (negoziare, firmare un accordo, ritirarsi dal tavolo).

La Programmazione ad Oggetti cerca esattamente questo: **modellare il software come modelli la realtà**, creando rappresentazioni digitali di concetti reali (o anche puramente astratti, come una "Partita" o una "Transazione") con le loro proprietà e le loro azioni.

### 4.3 Programmazione Procedurale vs Programmazione ad Oggetti

Finora, con ogni probabilità, hai scritto codice in stile **procedurale**: una sequenza di istruzioni eseguite dall'alto verso il basso, dove i dati (variabili, liste, dizionari) e le funzioni che li elaborano restano separati.

```python
# ==================== ESEMPIO 1.1: STILE PROCEDURALE ====================
"""
Gestiamo due studenti con il solo stile procedurale:
i dati (dizionari) e le funzioni che li elaborano restano SEPARATI.
Nessun errore di sintassi qui: è codice perfettamente valido e diffuso.
Il punto è capire i suoi limiti quando il programma cresce.
"""

# I dati di ogni studente sono un dizionario indipendente
studente1 = {"nome": "Mario Rossi", "voti": [7, 8, 6]}
studente2 = {"nome": "Giulia Bianchi", "voti": [9, 8, 10]}

# La funzione che calcola la media NON fa parte dello studente:
# è una funzione a sé, che riceve i dati "da fuori"
def calcola_media(studente):
    """Calcola la media dei voti di uno studente (passato come dizionario)."""
    return sum(studente["voti"]) / len(studente["voti"])

# Ogni volta che vuoi fare qualcosa su uno studente,
# devi passare esplicitamente il suo dizionario alla funzione giusta
print(f"Media di {studente1['nome']}: {calcola_media(studente1):.2f}")
print(f"Media di {studente2['nome']}: {calcola_media(studente2):.2f}")

# PROBLEMA: nulla impedisce a un dizionario "studente" di non avere
# la chiave "voti", o di averla scritta in un formato diverso.
# I dati non sono protetti né legati alle funzioni che li usano.
```

Con l'OOP, invece, i dati e le funzioni che li manipolano vengono **raggruppati insieme dentro l'oggetto stesso**. Non vedrai ancora la sintassi (arriva nel Modulo 2), ma osserva come cambia il *modo di pensare* allo stesso identico problema:

```python
# ==================== ESEMPIO 1.2: STILE A OGGETTI (ANTEPRIMA) ====================
"""
STESSA logica dell'esempio 1.1, ma pensata "a oggetti".
Non preoccuparti della sintassi 'class' o 'self': la vedremo nel Modulo 2.
Qui conta SOLO il cambio di prospettiva: la media diventa un comportamento
che lo studente sa fare su se stesso, non più una funzione esterna
a cui va "passato" ogni volta.
"""

class Studente:
    def __init__(self, nome, voti):
        self.nome = nome
        self.voti = voti

    def calcola_media(self):          # il comportamento vive DENTRO l'oggetto
        return sum(self.voti) / len(self.voti)

studente1 = Studente("Mario Rossi", [7, 8, 6])
studente2 = Studente("Giulia Bianchi", [9, 8, 10])

# Ora è lo studente stesso a "sapere" come calcolare la propria media
print(f"Media di {studente1.nome}: {studente1.calcola_media():.2f}")
print(f"Media di {studente2.nome}: {studente2.calcola_media():.2f}")
```

Il risultato numerico è identico. Quello che cambia è **dove vive la logica**: nell'Esempio 1.1 la funzione `calcola_media` è separata dai dati ed è responsabilità del programmatore ricordarsi di collegarle correttamente ogni volta; nell'Esempio 1.2 il comportamento è cucito addosso all'oggetto — uno `Studente` sa calcolare la propria media perché è "cosa sua".

**In sintesi:**

| | Programmazione Procedurale | Programmazione ad Oggetti |
|---|---|---|
| Struttura | Sequenza di istruzioni dall'alto verso il basso | Insieme di oggetti che interagiscono tra loro |
| Dati e funzioni | Separati | Raggruppati dentro lo stesso oggetto |
| Focus | "Cosa deve fare il programma, passo dopo passo" | "Quali entità esistono e come interagiscono" |

### 4.4 I vantaggi della OOP

Perché quasi tutto il software professionale — da un videogioco a un sistema bancario — è costruito con questo paradigma?

- ✅ **Organizzazione**: codice più strutturato e comprensibile, perché ogni oggetto racchiude ciò che gli appartiene.
- ✅ **Riutilizzo**: lo stesso "modello" di oggetto è utilizzabile in contesti diversi, ed è possibile costruire nuovi oggetti a partire da quelli esistenti (lo vedrai con l'ereditarietà, Modulo 5).
- ✅ **Manutenibilità**: è più facile modificare ed estendere il programma, perché un cambiamento in un oggetto tende a restare "contenuto" e non a propagarsi ovunque.
- ✅ **Modularità**: ogni oggetto è indipendente e modificabile separatamente dagli altri.
- ✅ **Astrazione**: nasconde la complessità interna, mostrando all'esterno solo ciò che è necessario per usare l'oggetto.
- ✅ **Modellazione naturale**: il codice riflette concetti del mondo reale, rendendo più facile ragionare sul problema — e spiegarlo a chi non ha scritto quel codice.

### 4.5 Anteprima: i quattro pilastri dell'OOP

Tutta l'OOP, in qualsiasi linguaggio, poggia su quattro idee fondamentali. Le incontrerai una alla volta nei prossimi moduli, ma è utile avere fin da ora la mappa completa:

- 🔒 **Incapsulamento** — proteggere lo stato interno di un oggetto, esponendo solo ciò che serve (Modulo 4).
- 🧬 **Ereditarietà** — costruire nuove classi a partire da classi esistenti, riutilizzando codice (Modulo 5).
- 🎭 **Polimorfismo** — oggetti diversi che rispondono allo stesso "comando" in modi diversi (Modulo 6).
- 🧩 **Astrazione** — definire cosa un oggetto deve saper fare, senza vincolare come lo fa (Modulo 7).

### 4.6 Perché conviene impararla ora

L'OOP non è un argomento "per chi farà l'informatico". È il linguaggio con cui, oggi, si progettano i sistemi gestionali delle banche, i CRM del marketing, le piattaforme di e-commerce e i software diplomatici di analisi geopolitica, tanto quanto i videogiochi. Java — che approfondirai nel Modulo 11 — è OOP fin dalle fondamenta ed è tuttora uno dei linguaggi più usati nel software aziendale. Anche Python, pur essendo multi-paradigma, usa l'OOP ovunque "sotto il cofano": ogni lista, ogni stringa, ogni DataFrame che userai in futuro è, tecnicamente, un oggetto.

---

<a id="esempi"></a>
## 5. Esempi

- **Nel software gestionale:** un sistema bancario modella ogni correntista come un oggetto `Conto`, con i suoi dati (saldo, IBAN) e le sue operazioni (deposito, prelievo) — è esattamente la logica che userai nel Modulo 4.
- **Nel marketing:** un CRM rappresenta ogni cliente come un oggetto `Cliente`, che "sa" qual è il suo storico ordini e può calcolare da solo il proprio valore nel tempo.
- **Nei videogiochi:** ogni personaggio (giocatore, nemico, oggetto raccoglibile) è un oggetto con le proprie caratteristiche (vita, posizione) e i propri comportamenti (muoversi, attaccare) — è il progetto che costruirai nel Project Work finale (Modulo 12).
- **Nelle relazioni internazionali:** una simulazione di negoziato può modellare ogni delegazione come un oggetto capace di proporre, valutare e accettare un accordo, in base ai propri obiettivi interni.

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: "Progetta il tuo primo oggetto — su carta"** (nessun codice richiesto)

1. Scegli un'entità reale legata al tuo indirizzo di studio: uno *Studente* (generico), un *ContoBancario* (Finanza), un *Cliente* o una *CampagnaPubblicitaria* (Marketing), una *Delegazione* o un *Trattato* (Relazioni Internazionali), un *Personaggio* di videogioco (Tecnico).
2. Su un foglio (o in un documento di testo), elenca almeno **4 caratteristiche** (attributi) e almeno **3 azioni** (metodi) che quell'entità dovrebbe avere.
3. Per ciascuna azione, scrivi in una riga cosa dovrebbe succedere ai dati dell'oggetto quando quell'azione viene eseguita (es. "quando prelevo, il saldo diminuisce dell'importo prelevato").
4. Confrontati con un compagno che ha scelto un'entità diversa dalla tua: quali caratteristiche e azioni si somigliano, anche se gli oggetti sono di tipo diverso?

*Obiettivo:* allenare la mente a scomporre un problema in oggetti con attributi e metodi **prima** di scrivere una sola riga di codice — è esattamente ciò che farai, con la sintassi vera, nel Modulo 2.

---

<a id="best-practice"></a>
## 7. Best Practice

- Prima di scrivere codice, prova sempre a descrivere il problema a parole: "quali entità esistono?", "cosa sanno fare?". La sintassi viene dopo.
- Non forzare l'OOP dove non serve: uno script di dieci righe che stampa un messaggio non ha bisogno di una classe. L'OOP dà il meglio quando il problema è composto da più entità che interagiscono.
- Quando descrivi un oggetto, distingui chiaramente cosa è un **dato** (un attributo) da cosa è un'**azione** (un metodo): è la base di ogni progettazione corretta.
- Usa nomi al singolare e chiari per le entità che identifichi (`Studente`, non `dati_studenti`): lo capirai meglio nel Modulo 2, ma è un'abitudine da costruire da subito.

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"L'OOP è solo una sintassi diversa per fare le stesse cose."* → È soprattutto un modo diverso di **organizzare il pensiero** prima ancora del codice; la sintassi (Modulo 2) è solo lo strumento.
- ❌ *"Un oggetto è semplicemente una variabile con un nome più complicato."* → Un oggetto raggruppa dati **e** comportamenti insieme; una variabile, da sola, contiene solo un dato.
- ❌ *"L'OOP serve solo per i videogiochi."* → È il paradigma dominante anche in banche, e-commerce, CRM aziendali e software diplomatici — i videogiochi sono solo l'esempio più visivo.
- ❌ *"La programmazione procedurale è 'sbagliata' e va sempre evitata."* → È perfettamente valida per script semplici; l'OOP mostra i suoi vantaggi quando la complessità cresce, non sempre e comunque.
- ❌ *"Basta pensare a un oggetto, il resto (attributi giusti, metodi giusti) viene da sé."* → Progettare bene un oggetto è un'abilità che si allena, come hai iniziato a fare nel Laboratorio di questo modulo.

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| OOP | Paradigma che organizza il codice intorno a oggetti, non a sequenze di istruzioni |
| Oggetto | Entità con caratteristiche (attributi) e comportamenti (metodi) raggruppati insieme |
| Programmazione Procedurale | Sequenza di istruzioni dall'alto verso il basso, dati e funzioni separati |
| Vantaggio principale dell'OOP | Modellare il software come si modella la realtà, con codice più organizzato e riusabile |
| Incapsulamento, Ereditarietà, Polimorfismo, Astrazione | I quattro pilastri dell'OOP, uno per ciascuno dei prossimi moduli chiave |

---

<a id="glossario"></a>
## 10. Glossario

- **Astrazione** — nascondere la complessità interna di un oggetto, mostrando solo ciò che serve per usarlo (dettagli nel Modulo 7).
- **Attributo** — un dato che descrive le caratteristiche di un oggetto (es. il colore di un'automobile).
- **Ereditarietà** — meccanismo che permette di creare nuove classi a partire da classi esistenti (dettagli nel Modulo 5).
- **Incapsulamento** — protezione dei dati interni di un oggetto, accessibili solo tramite comportamenti controllati (dettagli nel Modulo 4).
- **Metodo** — un'azione che un oggetto può compiere (es. accelerare per un'automobile).
- **Oggetto** — entità che raggruppa attributi e metodi, rappresentazione digitale di un concetto reale o astratto.
- **Paradigma di programmazione** — uno stile fondamentale con cui organizzare la logica di un programma (es. procedurale, a oggetti, funzionale).
- **Polimorfismo** — capacità di oggetti diversi di rispondere allo stesso "comando" in modi diversi (dettagli nel Modulo 6).
- **Programmazione ad Oggetti (OOP)** — paradigma che organizza il codice intorno a oggetti con dati e comportamenti raggruppati.
- **Programmazione Procedurale** — paradigma in cui il programma è una sequenza di istruzioni, con dati e funzioni separati.

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: nella Programmazione ad Oggetti, dati e funzioni che li elaborano vengono raggruppati nello stesso oggetto.
`Vero.`

**2.** Cosa distingue principalmente la Programmazione Procedurale dalla OOP?
- a) La procedurale non può usare le funzioni
- b) Nella procedurale dati e funzioni sono separati, nell'OOP sono raggruppati nell'oggetto ✅
- c) La OOP non permette l'uso di cicli e condizioni
- d) Non c'è nessuna differenza reale, solo di sintassi

**3.** Vero o Falso: un attributo rappresenta un'azione che un oggetto può compiere.
`Falso — un attributo è un dato/caratteristica; l'azione è il metodo.`

**4.** Quale dei seguenti NON è, secondo la lezione, un vantaggio tipico dell'OOP?
- a) Riutilizzo del codice
- b) Manutenibilità
- c) Esecuzione automaticamente più veloce di qualsiasi programma procedurale ✅ (falso vantaggio: non è garantito)
- d) Modularità

**5.** Elenca i quattro pilastri dell'OOP anticipati in questo modulo.
`Incapsulamento, Ereditarietà, Polimorfismo, Astrazione.`

**6.** Vero o Falso: l'OOP è utile solo per lo sviluppo di videogiochi.
`Falso — è ampiamente usata in software bancario, CRM, e-commerce e molti altri ambiti.`

**7.** In un ipotetico oggetto `ContoBancario`, quale delle seguenti è un attributo e quale un metodo? "saldo" e "preleva()".
`"saldo" è un attributo (dato); "preleva()" è un metodo (azione).`

**8.** Perché, secondo la lezione, la programmazione procedurale non è "sbagliata" in assoluto?
- a) Perché è comunque più veloce dell'OOP in ogni caso
- b) Perché resta perfettamente valida per script semplici, mentre l'OOP conviene quando la complessità cresce ✅
- c) Perché l'OOP non esiste davvero in Python
- d) Perché tutti i linguaggi moderni hanno abbandonato la programmazione procedurale

**9.** Vero o Falso: in Python, anche una semplice lista è, tecnicamente, un oggetto.
`Vero.`

**10.** Qual è, secondo il modulo, il primo passo corretto prima di scrivere codice a oggetti per un nuovo problema?
`Descrivere a parole quali entità esistono nel problema, con quali caratteristiche e comportamenti — cioè progettare gli oggetti prima della sintassi.`

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet "Procedurale vs OOP" (1 pagina, da produrre in PDF)
- 📝 Scheda di laboratorio "Progetta il tuo primo oggetto" in formato stampabile
- 📊 Slide riassuntive del modulo (da produrre in formato .pptx)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Downey, A. — *Think Python: How to Think Like a Computer Scientist*
- Booch, G. — *Object-Oriented Analysis and Design with Applications*
- Lutz, M. — *Learning Python*

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Python — sezione "Classes"
- Real Python — guide introduttive alla Programmazione ad Oggetti in Python
- Oracle Java Documentation — introduzione ai concetti OOP in Java (utile in anteprima per il Modulo 11)

[🔙 Torna all'indice del modulo](#indice-modulo)