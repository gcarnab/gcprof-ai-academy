# 🧠 M5 — I Diagrammi di Flusso (Flow Chart)

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Problem Solving — Il metodo prima del codice

---

> **"Un'immagine vale più di mille parole. Un buon diagramma di flusso vale più di cento righe di codice."**

---

## Cosa imparerai in questo modulo

Nei moduli precedenti abbiamo imparato a descrivere un algoritmo con il linguaggio naturale e con lo pseudocodice. In questo modulo aggiungiamo un terzo strumento, il più visivo di tutti: il **Diagramma di Flusso**, o **Flow Chart**. Imparerai i simboli standard universalmente riconosciuti (Terminatore, Input/Output, Elaborazione, frecce di flusso), le sei regole fondamentali per costruire un diagramma leggibile e corretto, e vedrai come ogni riga di pseudocodice scritta nel Modulo 4 si trasformi, quasi automaticamente, in un simbolo grafico. Al termine del modulo sarai pronto per il grande passo successivo: portare i tuoi Flow Chart dentro **Flowgorithm**, il software con cui inizieremo davvero a "eseguire" i nostri algoritmi.

---

<a id="indice-modulo"></a>

## Indice del Modulo 5

- [5.1 Introduzione](#51-introduzione)
- [5.2 Che cos'è un Flow Chart?](#52-che-cose-un-flow-chart)
- [5.3 Perché utilizzare i Diagrammi di Flusso?](#53-perche-utilizzare-i-diagrammi-di-flusso)
- [5.4 Vantaggi dei Flow Chart](#54-vantaggi-dei-flow-chart)
- [5.5 I simboli fondamentali](#55-i-simboli-fondamentali)
- [5.6 I simboli utilizzati nel corso](#56-i-simboli-utilizzati-nel-corso)
- [5.7 Regole di costruzione](#57-regole-di-costruzione)
- [5.8 Dal problema al Flow Chart](#58-dal-problema-al-flow-chart)
- [5.9 Esempio 1 — Il doppio di un numero](#59-esempio-1-il-doppio-di-un-numero)
- [5.10 Esempio 2 — L'area di un rettangolo](#510-esempio-2-larea-di-un-rettangolo)
- [5.11 Errori comuni nella costruzione del Flow Chart](#511-errori-comuni-nella-costruzione-del-flow-chart)
- [Esercizi del Modulo 5](#esercizi-del-modulo-5)
- [Quiz di autovalutazione](#quiz-di-autovalutazione)
- [Riepilogo del Modulo 5](#riepilogo-del-modulo-5)

---

<a id="51-introduzione"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 5.1 Introduzione

Nei moduli precedenti abbiamo imparato ad analizzare un problema e a descrivere la soluzione mediante:

- linguaggio naturale (Modulo 3);
- pseudocodice (Modulo 4).

Esiste però un altro modo, molto utilizzato in Informatica, per rappresentare un algoritmo: il **Diagramma di Flusso**, chiamato anche **Flow Chart**.

Il Flow Chart rappresenta graficamente le operazioni che un algoritmo deve eseguire. È indipendente dal linguaggio di programmazione e permette di comprendere rapidamente la logica della soluzione, spesso con un solo colpo d'occhio.

---

<a id="52-che-cose-un-flow-chart"></a>

## 5.2 Che cos'è un Flow Chart?

Un **Flow Chart** è una rappresentazione grafica di un algoritmo. Ogni istruzione viene rappresentata mediante un simbolo standard. I simboli sono collegati mediante frecce che indicano l'ordine di esecuzione.

### Definizione

> Un Flow Chart è un diagramma che rappresenta graficamente la sequenza delle operazioni necessarie per risolvere un problema.

> 💡 **Approfondimento** — I simboli dei Flow Chart che studierai in questo modulo seguono lo standard ISO 5807, adottato a livello internazionale fin dagli anni '80. Non è quindi una convenzione inventata per questo corso: sono gli stessi simboli che troveresti in un manuale professionale o in un software aziendale di modellazione dei processi.

---

<a id="53-perche-utilizzare-i-diagrammi-di-flusso"></a>

## 5.3 Perché utilizzare i Diagrammi di Flusso?

I Diagrammi di Flusso permettono di:

- progettare algoritmi in modo visivo;
- verificare la correttezza della logica prima di scrivere codice;
- comunicare facilmente una soluzione, anche a chi non conosce un linguaggio di programmazione;
- individuare errori prima della programmazione, quando correggerli costa molto meno tempo;
- facilitare la manutenzione del software nel tempo.

Per questo motivo vengono ancora oggi utilizzati nella progettazione di sistemi informatici, anche a livello professionale.

---

<a id="54-vantaggi-dei-flow-chart"></a>

## 5.4 Vantaggi dei Flow Chart

L'utilizzo dei diagrammi di flusso offre numerosi vantaggi.

✅ Sono facili da leggere, anche a distanza di tempo.

✅ Rendono immediata la comprensione della logica.

✅ Permettono di individuare errori progettuali prima ancora di aprire un editor di codice.

✅ Sono indipendenti dal linguaggio di programmazione.

✅ Possono essere tradotti facilmente in Flowgorithm e Python, come vedrai tra poco.

---

<a id="55-i-simboli-fondamentali"></a>

## 5.5 I simboli fondamentali

Per rappresentare un algoritmo utilizzeremo sempre gli stessi simboli.

### Terminatore

```
╭────────────╮
│  INIZIO    │
╰────────────╯
```

oppure

```
╭────────────╮
│    FINE    │
╰────────────╯
```

Serve ad indicare l'inizio o la fine dell'algoritmo. Ogni diagramma deve avere **un solo** punto di inizio e **almeno un** punto di fine.

### Elaborazione

```
┌───────────────┐
│ area = b × h  │
└───────────────┘
```

Rappresenta qualsiasi operazione: calcoli, assegnazioni, elaborazioni in generale.

### Input / Output

```
╱──────────────╲
│ Leggi numero │
╲──────────────╱
```

oppure

```
╱────────────────────╲
│ Visualizza media   │
╲────────────────────╱
```

Serve per leggere dati o visualizzare risultati.

### Linee di flusso

Le frecce indicano l'ordine delle operazioni.

```
↓
↓
↓
```

La direzione principale è sempre **dall'alto verso il basso**: una convenzione che rispetteremo in tutto il corso, per rendere ogni diagramma immediatamente leggibile senza dover "cercare" il punto di partenza.

---

<a id="56-i-simboli-utilizzati-nel-corso"></a>

## 5.6 I simboli utilizzati nel corso

| Simbolo | Significato |
|---------|-------------|
| Terminatore (ovale) | Inizio/Fine |
| Parallelogramma | Input / Output |
| Rettangolo | Elaborazione |
| Freccia | Flusso di esecuzione |

Nei moduli successivi introdurremo altri simboli fondamentali:

- **Decisione** (rombo), a partire dal Modulo 11 sulla Selezione;
- **Cicli**, a partire dal Modulo 13;
- **Connettori**, utili nei diagrammi più complessi del Modulo 18.

Per ora questi quattro simboli sono sufficienti a rappresentare qualsiasi algoritmo puramente sequenziale, come quelli che abbiamo incontrato finora.

---

<a id="57-regole-di-costruzione"></a>

## 5.7 Regole di costruzione

Per realizzare un buon Diagramma di Flusso è necessario seguire alcune semplici regole.

| Regola | Descrizione |
|---|---|
| 1 | Un solo punto di inizio. |
| 2 | Almeno un punto di fine. |
| 3 | Le frecce devono essere orientate in modo chiaro. |
| 4 | Ogni simbolo deve contenere una sola operazione. |
| 5 | Evitare incroci inutili delle linee. |
| 6 | Mantenere una disposizione ordinata, di norma verticale. |

Queste sei regole, per quanto semplici, sono la differenza tra un diagramma professionale e uno confuso e difficile da seguire: rispettarle fin da subito ti eviterà di dover "ridisegnare tutto" quando il diagramma diventerà più complesso, a partire dal Modulo 11.

---

<a id="58-dal-problema-al-flow-chart"></a>

## 5.8 Dal problema al Flow Chart

Riprendiamo il metodo utilizzato fin dall'inizio del corso, aggiungendo il nuovo passaggio.

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
```

Il Flow Chart rappresenta quindi il passaggio intermedio tra il progetto (pseudocodice) e il programma (Flowgorithm, poi Python): è il momento in cui la logica astratta diventa una struttura visiva, verificabile a colpo d'occhio.

---

<a id="59-esempio-1-il-doppio-di-un-numero"></a>

## 5.9 Esempio 1 — Il doppio di un numero

### Problema

Calcolare il doppio di un numero.

### Analisi

| Input | Output |
|---|---|
| numero | doppio |

### Pseudocodice

```
INIZIO

LEGGI numero

doppio ← numero × 2

SCRIVI doppio

FINE
```

### Flow Chart

```
            ╭──────────╮
            │ INIZIO   │
            ╰────┬─────╯
                 │
                 ▼
      ╱──────────────────╲
      │ Leggi numero     │
      ╲────────┬─────────╱
               │
               ▼
     ┌────────────────────┐
     │ doppio = numero*2  │
     └─────────┬──────────┘
               │
               ▼
      ╱──────────────────╲
      │ Scrivi doppio    │
      ╲────────┬─────────╱
               │
               ▼
            ╭──────────╮
            │  FINE    │
            ╰──────────╯
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

print("Il doppio è:", doppio)
```

Osserva la corrispondenza perfetta, riga per riga, tra pseudocodice, simboli del Flow Chart, Flowgorithm e Python: è la dimostrazione pratica di quanto ogni strumento di questo corso rappresenti lo stesso identico algoritmo, con un diverso livello di formalità.

---

<a id="510-esempio-2-larea-di-un-rettangolo"></a>

## 5.10 Esempio 2 — L'area di un rettangolo

### Problema

Calcolare l'area di un rettangolo.

### Analisi

| Input | Output |
|---|---|
| base, altezza | area |

### Pseudocodice

```
INIZIO

LEGGI base
LEGGI altezza

area ← base × altezza

SCRIVI area

FINE
```

### Flow Chart

```
            INIZIO
               │
               ▼
         Leggi base
               │
               ▼
       Leggi altezza
               │
               ▼
     area = base × altezza
               │
               ▼
        Visualizza area
               │
               ▼
             FINE
```

### Flowgorithm

```
Start

Input base
Input altezza

area = base * altezza

Output area

End
```

### Python

```python
base = float(input("Base: "))
altezza = float(input("Altezza: "))

area = base * altezza

print("Area =", area)
```

---

<a id="511-errori-comuni-nella-costruzione-del-flow-chart"></a>

## 5.11 Errori comuni nella costruzione del Flow Chart

### Errore 1 — Più operazioni nello stesso simbolo

❌

```
Leggi A
Calcola B
Visualizza C
```

racchiuse in un unico rettangolo. Meglio utilizzare un simbolo per ogni operazione, come previsto dalla Regola 4 del paragrafo 5.7.

### Errore 2 — Dimenticare il simbolo iniziale

Ogni diagramma deve iniziare sempre con **INIZIO**. Senza di esso, non è chiaro da dove partire nella lettura del diagramma.

### Errore 3 — Dimenticare FINE

L'algoritmo deve sempre terminare (ricorda la caratteristica di finitezza vista nel Modulo 3): un diagramma senza un chiaro punto di fine viola questa proprietà fondamentale.

### Errore 4 — Frecce orientate in modo casuale

Le linee devono essere ordinate e facilmente seguibili, senza incroci inutili né percorsi che tornano indietro senza motivo, in un algoritmo puramente sequenziale come quelli visti finora.

---

## ✅ Best Practice

✅ Disegnare prima il diagramma su carta o su una lavagna, prima di digitalizzarlo.

✅ Utilizzare sempre i simboli standard visti al paragrafo 5.5.

✅ Mantenere una disposizione verticale, dall'alto verso il basso.

✅ Inserire una sola operazione per simbolo.

✅ Controllare il diagramma prima di passare a Flowgorithm, verificando che rispetti tutte e sei le regole di costruzione.

---

<a id="esercizi-del-modulo-5"></a>

## 🧪 Esercizi del Modulo 5

**Esercizio 1 — Disegnare il Flow Chart**

Disegna il Flow Chart dei seguenti algoritmi:

1. calcolare il triplo di un numero;
2. calcolare il quadrato di un numero;
3. convertire metri in centimetri;
4. calcolare il costo totale di due prodotti.

**Esercizio 2 — Dal problema al diagramma**

Per ciascun problema:

- individua input e output;
- scrivi lo pseudocodice;
- realizza il Flow Chart, rispettando le sei regole di costruzione;
- confrontalo con quello di un compagno di corso.

**Laboratorio**

Utilizzando carta millimetrata oppure un software di disegno, realizza il Diagramma di Flusso per:

- media di quattro voti;
- area del triangolo;
- perimetro del rettangolo;
- conversione euro-centesimi.

Successivamente implementa ogni diagramma in **Flowgorithm**, argomento centrale del prossimo modulo.

---

<a id="quiz-di-autovalutazione"></a>

## 📝 Quiz di autovalutazione

**1. Il Flow Chart è:**

A. Un linguaggio di programmazione.

B. Un diagramma che rappresenta un algoritmo.

C. Un compilatore.

D. Un editor di testo.

---

**2. Quale simbolo rappresenta un'elaborazione?**

A. Il rettangolo.

B. Il rombo.

C. Il parallelogramma.

D. Il terminatore.

---

**3. Il simbolo di Input/Output serve per:**

A. Eseguire calcoli.

B. Leggere dati o visualizzare risultati.

C. Terminare il programma.

D. Disegnare frecce.

---

**4. Dopo aver realizzato il Flow Chart, secondo la roadmap del corso, quale sarà il passo successivo?**

A. Scrivere subito il programma in Python.

B. Implementare l'algoritmo in Flowgorithm.

C. Creare un database.

D. Studiare le reti.

---

**5. Quale delle seguenti è una violazione delle regole di costruzione viste in questo modulo?**

A. Un diagramma con un solo punto di inizio.

B. Un rettangolo che contiene tre operazioni diverse.

C. Frecce orientate dall'alto verso il basso.

D. Un solo simbolo per ogni operazione.

---

<a id="riepilogo-del-modulo-5"></a>

## 📚 Riepilogo del Modulo 5

In questo modulo abbiamo imparato a rappresentare un algoritmo mediante i **Diagrammi di Flusso (Flow Chart)**.

Abbiamo studiato i simboli fondamentali (Terminatore, Input/Output, Elaborazione, Freccia), le sei regole di costruzione e il metodo per trasformare uno pseudocodice in una rappresentazione grafica chiara e facilmente leggibile.

Nel prossimo modulo entreremo nel laboratorio pratico del corso iniziando ad utilizzare **Flowgorithm**, il software che consente di creare, eseguire e verificare algoritmi mediante Diagrammi di Flusso prima della loro traduzione in Python.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*