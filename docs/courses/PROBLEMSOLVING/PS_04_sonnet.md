# 🧠 M4 — Lo Pseudocodice

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Problem Solving — Il metodo prima del codice

---

> **"Lo pseudocodice permette di descrivere un algoritmo in modo chiaro, senza preoccuparsi della sintassi di un linguaggio di programmazione."**

---

## Cosa imparerai in questo modulo

Nel Modulo 3 abbiamo scritto i nostri primi algoritmi in linguaggio naturale, scoprendo però che l'italiano "libero" può essere ambiguo o troppo generico ("fai un calcolo"). In questo modulo introduciamo uno strumento intermedio fondamentale: lo **pseudocodice**, un modo di scrivere algoritmi che è già strutturato come un programma, ma resta indipendente da qualsiasi linguaggio reale. Imparerai le parole chiave standard che useremo per tutto il corso (LEGGI, SCRIVI, l'operatore di assegnazione ←), scoprirai come ogni istruzione in pseudocodice corrisponda direttamente a un simbolo del Flow Chart e a una riga di Python, e chiuderai il modulo scrivendo pseudocodice per problemi via via più articolati.

---

<a id="indice-modulo"></a>

## Indice del Modulo 4

- [4.1 Introduzione](#41-introduzione)
- [4.2 Che cos'è lo pseudocodice?](#42-che-cose-lo-pseudocodice)
- [4.3 Perché utilizzare lo pseudocodice?](#43-perche-utilizzare-lo-pseudocodice)
- [4.4 Algoritmo, pseudocodice e programma](#44-algoritmo-pseudocodice-e-programma)
- [4.5 Regole di scrittura](#45-regole-di-scrittura)
- [4.6 Le istruzioni fondamentali](#46-le-istruzioni-fondamentali)
- [4.7 Esempio 1 — Il doppio di un numero](#47-esempio-1-il-doppio-di-un-numero)
- [4.8 Esempio 2 — La media di tre voti](#48-esempio-2-la-media-di-tre-voti)
- [4.9 Dallo pseudocodice al Flow Chart](#49-dallo-pseudocodice-al-flow-chart)
- [4.10 Dallo pseudocodice a Python](#410-dallo-pseudocodice-a-python)
- [4.11 Errori comuni nello pseudocodice](#411-errori-comuni-nello-pseudocodice)
- [4.12 Buone pratiche](#412-buone-pratiche)
- [4.13 Esempio completo — Costo totale di quattro prodotti](#413-esempio-completo-costo-totale-di-quattro-prodotti)
- [Esercizi del Modulo 4](#esercizi-del-modulo-4)
- [Quiz di autovalutazione](#quiz-di-autovalutazione)
- [Riepilogo del Modulo 4](#riepilogo-del-modulo-4)

---

<a id="41-introduzione"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 4.1 Introduzione

Nel modulo precedente abbiamo imparato che un algoritmo è una sequenza ordinata di istruzioni. Tuttavia, descrivere un algoritmo utilizzando il linguaggio naturale può creare alcuni problemi.

Ad esempio, la frase:

> "Calcola il risultato."

non specifica come effettuare il calcolo: la abbiamo già incontrata al Modulo 3 come esempio di istruzione ambigua.

Allo stesso tempo, iniziare direttamente a programmare in Python può essere difficile per chi sta imparando: la sintassi del linguaggio rischia di distrarre dalla logica della soluzione.

Serve quindi uno strumento intermedio. Questo strumento è lo **pseudocodice**.

---

<a id="42-che-cose-lo-pseudocodice"></a>

## 4.2 Che cos'è lo pseudocodice?

Lo pseudocodice è una rappresentazione testuale di un algoritmo. Utilizza un linguaggio semplice, vicino all'italiano, ma organizzato **come un programma**.

Tre caratteristiche fondamentali:

- non appartiene ad alcun linguaggio di programmazione;
- non può essere eseguito da un computer;
- serve esclusivamente per progettare la soluzione.

### Definizione

> Lo pseudocodice è una descrizione strutturata di un algoritmo, indipendente da qualsiasi linguaggio di programmazione.

> 💡 **Approfondimento** — Non esiste uno "pseudocodice ufficiale" riconosciuto a livello internazionale: ogni libro di testo, ogni docente, ogni azienda può adottare convenzioni leggermente diverse. Ciò che conta davvero non è la sintassi esatta, ma la chiarezza e la coerenza con cui viene utilizzata. In questo corso adotteremo uno stile fisso, che vedrai tra poco, e lo manterremo identico dall'inizio alla fine.

---

<a id="43-perche-utilizzare-lo-pseudocodice"></a>

## 4.3 Perché utilizzare lo pseudocodice?

Lo pseudocodice presenta numerosi vantaggi. Permette di:

- concentrarsi sulla logica, non sulla sintassi;
- evitare errori di sintassi tipici di un linguaggio reale;
- comunicare facilmente un algoritmo ad altre persone, anche non programmatori;
- modificare rapidamente una soluzione, senza dover "rompere" codice funzionante;
- preparare la traduzione in Flow Chart e Python in modo quasi automatico.

---

<a id="44-algoritmo-pseudocodice-e-programma"></a>

## 4.4 Algoritmo, pseudocodice e programma

È importante distinguere questi tre concetti.

| Concetto | Scopo |
|----------|-------|
| Algoritmo | Descrive la procedura risolutiva |
| Pseudocodice | Rappresenta l'algoritmo in forma strutturata |
| Programma | Implementa l'algoritmo in un linguaggio reale |

Possiamo rappresentare il processo nel seguente modo, arricchendo lo schema già visto nei moduli precedenti con un nuovo passaggio:

```
Problema
   ↓
Analisi
   ↓
Algoritmo
   ↓
Pseudocodice
   ↓
Flow Chart
   ↓
Flowgorithm
   ↓
Python
   ↓
Programma
```

---

<a id="45-regole-di-scrittura"></a>

## 4.5 Regole di scrittura

Lo pseudocodice non possiede una sintassi ufficiale. Durante questo corso utilizzeremo sempre uno **stile uniforme**, con le seguenti parole chiave:

```
INIZIO
LEGGI
SCRIVI
ASSEGNA
SE
ALLORA
ALTRIMENTI
MENTRE
RIPETI
FINE
```

Questo renderà molto semplice la traduzione nei moduli successivi: quando incontreremo la Selezione (M11-M12) e i Cicli (M13), ritroverai esattamente queste stesse parole chiave, ormai familiari.

---

<a id="46-le-istruzioni-fondamentali"></a>

## 4.6 Le istruzioni fondamentali

### Input

```
LEGGI numero
```

Significa: acquisisci un valore dall'utente.

### Output

```
SCRIVI risultato
```

Significa: visualizza il contenuto della variabile.

### Assegnazione

```
somma ← numero1 + numero2
```

oppure, più semplicemente:

```
somma = numero1 + numero2
```

Nel corso utilizzeremo prevalentemente il simbolo `←` per distinguere chiaramente l'**assegnazione** (memorizzare un valore in una variabile) dall'**uguaglianza matematica** (un confronto tra due valori), due concetti che in Python condividono lo stesso simbolo `=` ma hanno significati profondamente diversi.

> ⚠️ **Attenzione** — Questa distinzione sembra un dettaglio, ma è una delle fonti di confusione più comuni quando si affrontano per la prima volta le strutture di selezione, nel Modulo 11: `x ← 5` assegna il valore 5 alla variabile x, mentre `x = 5`, come vedremo, sarà un confronto che risponde vero o falso. Abituarsi fin da ora a leggere `←` come "diventa uguale a" ti eviterà questo errore in futuro.

---

<a id="47-esempio-1-il-doppio-di-un-numero"></a>

## 4.7 Esempio 1 — Il doppio di un numero

### Problema

Calcolare il doppio di un numero.

### Pseudocodice

```
INIZIO

LEGGI numero

doppio ← numero × 2

SCRIVI doppio

FINE
```

### Flowgorithm

```
Start

Input numero

doppio = numero * 2

Output doppio

End
```

### Python

```python
numero = float(input("Numero: "))

doppio = numero * 2

print(doppio)
```

Osserva quanto sia diretta la traduzione: ogni riga di pseudocodice corrisponde a una riga di Flowgorithm e a una riga di Python. Cambia solo il modo di scriverla, non la logica.

---

<a id="48-esempio-2-la-media-di-tre-voti"></a>

## 4.8 Esempio 2 — La media di tre voti

### Problema

Calcolare la media di tre voti.

### Pseudocodice

```
INIZIO

LEGGI voto1
LEGGI voto2
LEGGI voto3

somma ← voto1 + voto2 + voto3
media ← somma / 3

SCRIVI media

FINE
```

### Osservazione

Lo pseudocodice è già molto simile al futuro programma Python. Cambierà soltanto la sintassi: i due punti al posto di `INIZIO`/`FINE`, le parentesi di `input()` e `print()`, il simbolo `=` al posto di `←`. La struttura logica, invece, resta identica.

---

<a id="49-dallo-pseudocodice-al-flow-chart"></a>

## 4.9 Dallo pseudocodice al Flow Chart

Ogni istruzione dello pseudocodice corrisponde ad un simbolo del diagramma di flusso.

| Pseudocodice | Flow Chart |
|--------------|------------|
| INIZIO | Terminatore |
| LEGGI | Input |
| SCRIVI | Output |
| Assegnazione | Elaborazione |
| FINE | Terminatore |

Questa corrispondenza renderà molto semplice il Modulo 5, interamente dedicato ai Diagrammi di Flusso: non dovrai imparare una nuova logica, solo un nuovo modo di rappresentarla graficamente.

---

<a id="410-dallo-pseudocodice-a-python"></a>

## 4.10 Dallo pseudocodice a Python

Confrontiamo i tre livelli su un nuovo esempio.

**Pseudocodice**

```
LEGGI numero

quadrato ← numero × numero

SCRIVI quadrato
```

**Flowgorithm**

```
Input numero

quadrato = numero * numero

Output quadrato
```

**Python**

```python
numero = float(input())

quadrato = numero * numero

print(quadrato)
```

La logica è identica. Cambia solamente il modo di scriverla: è esattamente questo il valore dello pseudocodice come "ponte" tra il ragionamento umano e il codice eseguibile.

---

<a id="411-errori-comuni-nello-pseudocodice"></a>

## 4.11 Errori comuni nello pseudocodice

### Errore 1 — Istruzioni troppo generiche

```
Calcola qualcosa
```

Troppo generico: non specifica né i dati coinvolti né l'operazione. Meglio:

```
somma ← numero1 + numero2
```

### Errore 2 — Operazione non specificata

```
Fai il conto.
```

Non specifica quale operazione eseguire: è lo stesso problema già incontrato nel Modulo 3.

### Errore 3 — Saltare alcuni passaggi

```
SCRIVI media
```

scritto senza aver prima calcolato la media, è un errore logico grave: l'output fa riferimento a un dato che non esiste ancora nel flusso dell'algoritmo.

---

<a id="412-buone-pratiche"></a>

## 4.12 Buone pratiche

Uno pseudocodice dovrebbe essere:

- semplice;
- ordinato;
- leggibile;
- completo;
- indipendente dal linguaggio di programmazione.

Uno pseudocodice scritto bene si legge quasi come un elenco puntato di istruzioni, senza bisogno di ulteriori spiegazioni: se hai bisogno di aggiungere un commento per spiegare cosa fa una riga, probabilmente quella riga andrebbe riscritta in modo più chiaro.

---

<a id="413-esempio-completo-costo-totale-di-quattro-prodotti"></a>

## 4.13 Esempio completo — Costo totale di quattro prodotti

### Problema

Calcolare il costo totale di quattro prodotti.

### Analisi

| Input | Output |
|---|---|
| prezzo1, prezzo2, prezzo3, prezzo4 | totale |

### Pseudocodice

```
INIZIO

LEGGI prezzo1
LEGGI prezzo2
LEGGI prezzo3
LEGGI prezzo4

totale ← prezzo1 + prezzo2 + prezzo3 + prezzo4

SCRIVI totale

FINE
```

### Flow Chart (concettuale)

```
      ┌─────────┐
      │ INIZIO  │
      └────┬────┘
           │
           ▼
   Leggi prezzo1
           │
           ▼
   Leggi prezzo2
           │
           ▼
   Leggi prezzo3
           │
           ▼
   Leggi prezzo4
           │
           ▼
   Calcola totale
           │
           ▼
 Visualizza totale
           │
           ▼
      ┌─────────┐
      │  FINE   │
      └─────────┘
```

### Flowgorithm

```
Start

Input prezzo1
Input prezzo2
Input prezzo3
Input prezzo4

totale = prezzo1 + prezzo2 + prezzo3 + prezzo4

Output totale

End
```

### Python

```python
prezzo1 = float(input())
prezzo2 = float(input())
prezzo3 = float(input())
prezzo4 = float(input())

totale = prezzo1 + prezzo2 + prezzo3 + prezzo4

print("Totale =", totale)
```

Nota come, ancora una volta, ogni riga di pseudocodice si traduca in modo pressoché diretto in Flowgorithm e in Python: è la prova concreta di quanto lavoro "difficile" venga già svolto nella fase di progettazione, rendendo la scrittura del codice quasi una formalità.

---

## ✅ Best Practice

✔ Scrivere un'istruzione per ogni operazione.

✔ Utilizzare nomi significativi per le variabili.

✔ Mantenere sempre lo stesso stile (le stesse parole chiave, sempre).

✔ Curare l'ordine delle istruzioni.

✔ Controllare che input e output siano sempre presenti.

## ❌ Errori comuni

❌ Scrivere direttamente codice Python, saltando lo pseudocodice.

❌ Utilizzare frasi troppo generiche ("fai un calcolo", "elabora i dati").

❌ Dimenticare l'input.

❌ Dimenticare l'output.

❌ Mescolare linguaggio naturale e codice nella stessa riga.

---

<a id="esercizi-del-modulo-4"></a>

## 🧪 Esercizi del Modulo 4

**Esercizio 1 — Scrivere lo pseudocodice**

Scrivi lo pseudocodice, seguendo lo stile visto in questo modulo, per:

1. calcolare il triplo di un numero;
2. calcolare il perimetro di un quadrato;
3. convertire ore in minuti;
4. calcolare il prezzo totale di cinque prodotti.

**Esercizio 2 — Dal problema al Python**

Per ogni problema:

- individua input e output;
- scrivi lo pseudocodice;
- confrontalo con un compagno di corso;
- realizzalo in Flowgorithm;
- traducilo in Python.

**Laboratorio**

Progetta lo pseudocodice dei seguenti problemi:

- calcolare la media di quattro numeri;
- calcolare l'area di un triangolo;
- convertire chilometri in metri;
- calcolare il costo di una pizza aggiungendo il prezzo della bibita.

Successivamente:

1. disegna il Flow Chart;
2. implementalo in Flowgorithm;
3. traducilo in Python;
4. verifica il corretto funzionamento con almeno tre casi di prova.

---

<a id="quiz-di-autovalutazione"></a>

## 📝 Quiz di autovalutazione

**1. Lo pseudocodice è:**

A. Un linguaggio di programmazione.

B. Una rappresentazione testuale di un algoritmo.

C. Un compilatore.

D. Un editor.

---

**2. Lo pseudocodice può essere eseguito dal computer?**

A. Sempre.

B. Solo con Python.

C. No.

D. Solo con Flowgorithm.

---

**3. Qual è il principale vantaggio dello pseudocodice?**

A. È più veloce di Python.

B. Permette di concentrarsi sulla logica senza preoccuparsi della sintassi.

C. Occupa meno memoria.

D. Produce programmi più piccoli.

---

**4. Dopo aver scritto lo pseudocodice, quale sarà il prossimo passo previsto dalla roadmap del corso?**

A. Creare un database.

B. Disegnare il Flow Chart.

C. Studiare le reti.

D. Installare Visual Studio Code.

---

**5. A cosa serve il simbolo `←` nello pseudocodice di questo corso?**

A. A indicare un ciclo.

B. A rappresentare l'assegnazione di un valore a una variabile, distinguendola dall'uguaglianza matematica.

C. A separare due istruzioni.

D. A indicare la fine dell'algoritmo.

---

<a id="riepilogo-del-modulo-4"></a>

## 📚 Riepilogo del Modulo 4

In questo modulo abbiamo imparato ad utilizzare lo **pseudocodice** per descrivere gli algoritmi in maniera chiara, ordinata e indipendente dal linguaggio di programmazione, adottando uno stile fisso (INIZIO, LEGGI, SCRIVI, assegnazione con `←`, FINE) che useremo per tutto il resto del corso.

Abbiamo visto come ogni istruzione dello pseudocodice possa essere tradotta quasi automaticamente in **Flow Chart**, **Flowgorithm** e successivamente in **Python**.

Nel prossimo modulo studieremo i **Diagrammi di Flusso (Flow Chart)**, imparando il significato dei simboli standard, le regole di costruzione e le tecniche per rappresentare graficamente qualsiasi algoritmo prima della sua implementazione.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*