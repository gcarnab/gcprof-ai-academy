# 🧠 M3 — Gli Algoritmi

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Problem Solving — Il metodo prima del codice

---

> **"Un algoritmo è una ricetta: se i passaggi sono corretti e ordinati, il risultato sarà sempre lo stesso."**

---

## Cosa imparerai in questo modulo

Nei moduli precedenti abbiamo imparato ad analizzare un problema, individuando input, output ed elaborazione. Ora rispondiamo a una domanda che finora abbiamo solo sfiorato: **come descriviamo con precisione la soluzione di un problema?** In questo modulo definiamo formalmente il concetto di **algoritmo**, distinguendolo con chiarezza da problema e programma, e scopriamo le cinque caratteristiche che ogni algoritmo corretto deve possedere: finitezza, ordine, non ambiguità, efficacia e capacità di produrre un risultato. Vedrai numerosi esempi — dalla vita quotidiana a problemi numerici — e imparerai il processo in otto passi che useremo per progettare **ogni** algoritmo da qui fino alla fine del corso.

---

<a id="indice-modulo"></a>

## Indice del Modulo 3

- [3.1 Introduzione](#31-introduzione)
- [3.2 Che cos'è un algoritmo?](#32-che-cose-un-algoritmo)
- [3.3 Algoritmi nella vita quotidiana](#33-algoritmi-nella-vita-quotidiana)
- [3.4 Problema, algoritmo e programma](#34-problema-algoritmo-e-programma)
- [3.5 Le caratteristiche di un algoritmo](#35-le-caratteristiche-di-un-algoritmo)
- [3.6 Le istruzioni elementari](#36-le-istruzioni-elementari)
- [3.7 Esempio 1 — Il quadrato di un numero](#37-esempio-1-il-quadrato-di-un-numero)
- [3.8 Esempio 2 — Costo totale di tre prodotti](#38-esempio-2-costo-totale-di-tre-prodotti)
- [3.9 Algoritmi e precisione](#39-algoritmi-e-precisione)
- [3.10 Dal linguaggio naturale all'algoritmo](#310-dal-linguaggio-naturale-allalgoritmo)
- [3.11 Esempio completo — Perimetro del quadrato](#311-esempio-completo-perimetro-del-quadrato)
- [3.12 Come progettare un algoritmo: il processo in 8 passi](#312-come-progettare-un-algoritmo-il-processo-in-8-passi)
- [Esercizi del Modulo 3](#esercizi-del-modulo-3)
- [Quiz di autovalutazione](#quiz-di-autovalutazione)
- [Riepilogo del Modulo 3](#riepilogo-del-modulo-3)

---

<a id="31-introduzione"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 3.1 Introduzione

Nei moduli precedenti abbiamo imparato ad analizzare un problema e ad individuare:

- dati di ingresso;
- dati di uscita;
- elaborazione.

Ora dobbiamo rispondere ad una domanda fondamentale.

> **Come descriviamo con precisione la soluzione di un problema?**

La risposta è: **mediante un algoritmo.**

L'algoritmo rappresenta il cuore di qualsiasi programma informatico: tutto ciò che abbiamo costruito finora — analisi, input, output — confluisce ora in un'unica procedura precisa e ordinata.

---

<a id="32-che-cose-un-algoritmo"></a>

## 3.2 Che cos'è un algoritmo?

Un algoritmo è una **sequenza ordinata, finita e non ambigua di istruzioni** che permette di risolvere un problema o raggiungere un determinato obiettivo.

In altre parole:

> Un algoritmo descrive **come** risolvere un problema.

Non è ancora un programma. È il **progetto** del programma.

### Definizione

Possiamo definire un algoritmo come:

> Una procedura composta da una successione di istruzioni eseguite in un preciso ordine.

Ogni istruzione deve essere:

- semplice;
- comprensibile;
- eseguibile;
- priva di ambiguità.

> 💡 **Approfondimento** — Il termine "algoritmo" deriva dal nome del matematico persiano Al-Khwarizmi (IX secolo), autore di uno dei primi trattati sistematici di procedure di calcolo. Il concetto, quindi, è molto più antico dei computer: un algoritmo esiste indipendentemente dal linguaggio con cui lo si esegue, umano o informatico.

---

<a id="33-algoritmi-nella-vita-quotidiana"></a>

## 3.3 Algoritmi nella vita quotidiana

Anche senza rendercene conto utilizziamo continuamente algoritmi.

### Preparare un tè

```
Prendere una tazza
      ↓
Scaldare l'acqua
      ↓
Versare l'acqua
      ↓
Inserire la bustina
      ↓
Attendere
      ↓
Togliere la bustina
      ↓
Bere
```

### Lavarsi i denti

```
Prendere lo spazzolino
      ↓
Mettere il dentifricio
      ↓
Spazzolare
      ↓
Risciacquare
      ↓
Riporre lo spazzolino
```

### Accendere il computer

```
Premere il pulsante
      ↓
Attendere l'avvio
      ↓
Inserire la password
      ↓
Aprire il desktop
```

Tutte queste procedure sono esempi di algoritmi: sequenze finite, ordinate e non ambigue di istruzioni. La differenza rispetto a un algoritmo informatico non è nella struttura, ma nel fatto che quest'ultimo verrà eseguito da un computer, che — come sappiamo dal Modulo 0 — non tollera imprecisioni.

---

<a id="34-problema-algoritmo-e-programma"></a>

## 3.4 Problema, algoritmo e programma

Questi tre concetti vengono spesso confusi. È importante distinguerli con precisione.

| Concetto | Significato |
|----------|-------------|
| Problema | Situazione da risolvere |
| Algoritmo | Procedura risolutiva |
| Programma | Traduzione dell'algoritmo in un linguaggio di programmazione |

Possiamo rappresentare il processo così:

```
Problema
   ↓
Algoritmo
   ↓
Flow Chart
   ↓
Flowgorithm
   ↓
Python
   ↓
Programma
```

> ⚠️ **Attenzione** — Uno stesso algoritmo può essere tradotto in infiniti programmi diversi: in Python, in Java, in C++, o persino descritto a parole a un'altra persona. È l'algoritmo, non il linguaggio, a contenere davvero la soluzione del problema. Per questo il corso dedica così tanto spazio alla progettazione, prima ancora di arrivare a Python.

---

<a id="35-le-caratteristiche-di-un-algoritmo"></a>

## 3.5 Le caratteristiche di un algoritmo

Affinché un algoritmo sia corretto deve possedere cinque caratteristiche fondamentali.

### 1. Deve essere finito

Ogni algoritmo deve terminare dopo un numero limitato di operazioni.

```
Conta fino a 10.
```

è un algoritmo finito. Invece:

```
Conta per sempre.
```

non termina mai, e quindi non è un algoritmo valido.

### 2. Deve essere ordinato

Le istruzioni devono essere eseguite nell'ordine corretto.

```
Versa il latte
    ↓
Scalda il latte
```

produce un risultato diverso rispetto a:

```
Scalda il latte
    ↓
Versa il latte
```

L'ordine è fondamentale, esattamente come avevamo già osservato in M1 e M2 a proposito della sequenza delle istruzioni.

### 3. Deve essere non ambiguo

Ogni istruzione deve avere un solo significato possibile.

```
Aggiungi un po' di zucchero.
```

è ambiguo: "un po'" non è una quantità precisa. Meglio scrivere:

```
Aggiungi due cucchiaini di zucchero.
```

### 4. Deve essere efficace

Ogni istruzione deve poter essere realmente eseguita.

```
Calcola il quadrato di un numero.
```

è possibile. Mentre:

```
Indovina il numero pensato da una persona.
```

non rappresenta un algoritmo, perché non esiste una procedura eseguibile che garantisca di ottenere quel risultato.

### 5. Deve produrre un risultato

L'algoritmo deve raggiungere l'obiettivo prefissato. Se il problema è:

```
Calcolare l'area di un rettangolo.
```

il risultato finale dovrà essere proprio l'area del rettangolo: non un valore diverso, non un messaggio generico, ma esattamente ciò che il problema richiede.

> 💡 **Approfondimento** — Queste cinque proprietà (finitezza, ordine, non ambiguità, efficacia, presenza di un risultato) sono note in letteratura informatica come le **proprietà fondamentali degli algoritmi**. Le ritroverai, con lo stesso identico significato, in qualsiasi manuale universitario di Fondamenti di Informatica: non è una semplificazione didattica, ma la definizione formalmente riconosciuta.

---

<a id="36-le-istruzioni-elementari"></a>

## 3.6 Le istruzioni elementari

Ogni algoritmo è composto da istruzioni elementari.

```
Leggi il numero
      ↓
Calcola il doppio
      ↓
Visualizza il risultato
```

Le istruzioni devono essere semplici e facilmente eseguibili: ogni riga rappresenta un'unica azione precisa, mai un insieme confuso di più operazioni implicite.

---

<a id="37-esempio-1-il-quadrato-di-un-numero"></a>

## 3.7 Esempio 1 — Il quadrato di un numero

### Problema

Calcolare il quadrato di un numero.

### Analisi

| Input | Output |
|---|---|
| numero | quadrato |

### Algoritmo

```
Leggi numero

quadrato = numero × numero

Visualizza quadrato
```

Tre istruzioni, ciascuna precisa e non ambigua: leggere, calcolare, visualizzare. È lo schema di base che ritroveremo in praticamente ogni algoritmo del corso.

---

<a id="38-esempio-2-costo-totale-di-tre-prodotti"></a>

## 3.8 Esempio 2 — Costo totale di tre prodotti

### Problema

Calcolare il costo totale di tre prodotti.

### Input

- prezzo1
- prezzo2
- prezzo3

### Algoritmo

```
Leggi prezzo1
Leggi prezzo2
Leggi prezzo3

totale = prezzo1 + prezzo2 + prezzo3

Visualizza totale
```

---

<a id="39-algoritmi-e-precisione"></a>

## 3.9 Algoritmi e precisione

Consideriamo il seguente algoritmo.

```
Leggi un numero
      ↓
Fai un calcolo
      ↓
Visualizza il risultato
```

Non è corretto. Perché?

Perché l'istruzione

```
Fai un calcolo
```

non specifica quale operazione eseguire: viola direttamente la caratteristica di non ambiguità vista al paragrafo 3.5.

Un algoritmo deve essere **preciso**: ogni istruzione deve poter essere eseguita senza dover indovinare cosa intendesse l'autore.

---

<a id="310-dal-linguaggio-naturale-allalgoritmo"></a>

## 3.10 Dal linguaggio naturale all'algoritmo

All'inizio del corso utilizzeremo il **linguaggio naturale**, cioè l'italiano scritto in modo ordinato e preciso.

```
Leggere due numeri.
Sommarli.
Visualizzare la somma.
```

Successivamente tradurremo lo stesso identico algoritmo:

- in Flow Chart (Modulo 5);
- in Flowgorithm (Modulo 6 e successivi);
- in Python (dal Modulo 17 in poi).

Questo approccio permette di concentrarsi prima sulla **logica** e solo dopo sulla **sintassi**: è lo stesso principio che guida l'intero impianto del corso fin dal Modulo 0.

---

<a id="311-esempio-completo-perimetro-del-quadrato"></a>

## 3.11 Esempio completo — Perimetro del quadrato

### Problema

Calcolare il perimetro di un quadrato.

### Analisi

| Input | Output |
|---|---|
| lato | perimetro |

### Algoritmo

```
Leggi lato

perimetro = lato × 4

Visualizza perimetro
```

### Flow Chart (concettuale)

```
      ┌─────────┐
      │ INIZIO  │
      └────┬────┘
           │
           ▼
    Leggi lato
           │
           ▼
Perimetro = lato × 4
           │
           ▼
 Visualizza perimetro
           │
           ▼
      ┌─────────┐
      │  FINE   │
      └─────────┘
```

### Flowgorithm

```
Start

Input lato

perimetro = lato * 4

Output perimetro

End
```

### Python

```python
lato = float(input("Lato: "))

perimetro = lato * 4

print("Perimetro =", perimetro)
```

Anche in questo caso il percorso è sempre lo stesso: problema, analisi, algoritmo, Flow Chart, Flowgorithm, Python. Da qui in avanti lo vedrai ripetersi decine di volte, fino a diventare completamente automatico.

---

<a id="312-come-progettare-un-algoritmo-il-processo-in-8-passi"></a>

## 3.12 Come progettare un algoritmo: il processo in 8 passi

Per ogni esercizio del corso utilizzeremo sempre questa procedura.

| Passo | Domanda guida |
|---|---|
| 1. Comprendere il problema | Cosa viene richiesto? |
| 2. Individuare gli input | Quali dati servono? |
| 3. Individuare gli output | Qual è il risultato? |
| 4. Scrivere l'algoritmo | Come descrivere, passo dopo passo, la soluzione? |
| 5. Disegnare il Flow Chart | Come rappresentare graficamente l'algoritmo? |
| 6. Realizzare il progetto in Flowgorithm | L'algoritmo funziona davvero? |
| 7. Tradurre in Python | Come scrivere il programma? |
| 8. Testare il programma | Il risultato è corretto con valori diversi? |

Questo processo in otto passi non è una formalità: è il metodo che, applicato con costanza, trasforma la teoria vista in questo modulo in una competenza pratica e riutilizzabile per ogni verifica ed esercizio del corso.

---

## ✅ Best Practice

✔ Pensare prima alla soluzione, non al codice.

✔ Scrivere istruzioni semplici, una per riga.

✔ Utilizzare nomi significativi per input e output.

✔ Verificare sempre l'ordine delle operazioni.

✔ Testare l'algoritmo con esempi diversi, non uno solo.

## ❌ Errori comuni

❌ Saltare la fase di analisi.

❌ Scrivere istruzioni ambigue ("fai un calcolo", "aggiungi un po'").

❌ Dimenticare input o output.

❌ Confondere algoritmo e programma.

❌ Iniziare direttamente da Python, senza progettare prima.

---

<a id="esercizi-del-modulo-3"></a>

## 🧪 Esercizi del Modulo 3

**Esercizio 1 — Scrivere l'algoritmo**

Scrivi l'algoritmo (in linguaggio naturale) per:

1. calcolare il triplo di un numero;
2. calcolare l'età tra dieci anni;
3. convertire centimetri in metri;
4. calcolare il costo totale di quattro prodotti.

**Esercizio 2 — Dal problema al Python**

Per ogni algoritmo scritto nell'Esercizio 1:

- individua input e output;
- disegna il relativo Flow Chart;
- implementalo in Flowgorithm;
- traducilo in Python.

**Laboratorio**

Progetta gli algoritmi per:

- calcolare la media di cinque voti;
- calcolare il perimetro di un rettangolo;
- calcolare il costo totale di una spesa;
- convertire minuti in ore e minuti.

Non scrivere subito il codice. Segui rigorosamente il metodo in 8 passi visto al paragrafo 3.12:

```
Problema
   ↓
Analisi
   ↓
Algoritmo
   ↓
Flow Chart
   ↓
Flowgorithm
   ↓
Python
```

---

<a id="quiz-di-autovalutazione"></a>

## 📝 Quiz di autovalutazione

**1. Un algoritmo è:**

A. Un linguaggio di programmazione.

B. Una sequenza ordinata di istruzioni.

C. Un compilatore.

D. Un editor di testo.

---

**2. Quale caratteristica deve possedere un algoritmo?**

A. Essere infinito.

B. Essere ambiguo.

C. Essere finito.

D. Essere casuale.

---

**3. L'algoritmo viene realizzato prima di:**

A. Analizzare il problema.

B. Disegnare il Flow Chart.

C. Comprendere il problema.

D. Individuare gli input.

---

**4. Flowgorithm serve principalmente per:**

A. Navigare in Internet.

B. Realizzare ed eseguire algoritmi tramite diagrammi di flusso.

C. Scrivere pagine Web.

D. Gestire database.

---

**5. Perché l'istruzione "Fai un calcolo" non è valida in un algoritmo?**

A. Perché è troppo breve.

B. Perché viola la caratteristica di non ambiguità: non specifica quale operazione eseguire.

C. Perché non è scritta in inglese.

D. Perché non contiene numeri.

---

<a id="riepilogo-del-modulo-3"></a>

## 📚 Riepilogo del Modulo 3

In questo modulo abbiamo introdotto il concetto di **algoritmo**, comprendendo che rappresenta la descrizione precisa della soluzione di un problema, distinta sia dal problema stesso sia dal programma finale.

Abbiamo studiato le cinque caratteristiche che ogni algoritmo deve possedere — finitezza, ordine, non ambiguità, efficacia, capacità di produrre un risultato — e abbiamo imparato a progettarlo utilizzando il linguaggio naturale, seguendo il processo in 8 passi che useremo per tutto il resto del corso.

Nel prossimo modulo studieremo lo **pseudocodice**, una tecnica intermedia tra il linguaggio naturale e il linguaggio di programmazione che ci consentirà di descrivere algoritmi in modo ancora più rigoroso e vicino al codice, prima di passare ai diagrammi di flusso e a Flowgorithm.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*