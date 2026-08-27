# 🧠 M7 — Variabili e Costanti

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Problem Solving — Il metodo prima del codice

---

> **"Le variabili sono la memoria di un programma: permettono di conservare, modificare e utilizzare le informazioni durante l'esecuzione di un algoritmo."**

---

## Cosa imparerai in questo modulo

Nei moduli precedenti abbiamo progettato algoritmi, li abbiamo rappresentati con Flow Chart e li abbiamo realizzati in Flowgorithm, incontrando più volte l'istruzione `Declare` senza però approfondirla davvero. In questo modulo colmiamo questa lacuna: scoprirai che cos'è realmente una **variabile**, in che modo differisce da una **costante**, quali sono i quattro tipi di dato fondamentali (Integer, Real, String, Boolean) e come dichiarare e utilizzare variabili sia in Flowgorithm sia in Python. Imparerai inoltre a "tracciare" l'esecuzione di un algoritmo passo dopo passo, osservando come cambia il contenuto delle variabili, e le regole — tecniche e di buon senso — per scegliere nomi di variabili chiari e significativi.

---

<a id="indice-modulo"></a>

## Indice del Modulo 7

- [7.1 Introduzione](#71-introduzione)
- [7.2 Un esempio nella vita quotidiana](#72-un-esempio-nella-vita-quotidiana)
- [7.3 Che cos'è una variabile?](#73-che-cose-una-variabile)
- [7.4 Perché servono le variabili?](#74-perche-servono-le-variabili)
- [7.5 Le variabili cambiano valore](#75-le-variabili-cambiano-valore)
- [7.6 Che cos'è una costante?](#76-che-cose-una-costante)
- [7.7 Variabile e costante a confronto](#77-variabile-e-costante-a-confronto)
- [7.8 I tipi di dato fondamentali](#78-i-tipi-di-dato-fondamentali)
- [7.9 Dichiarazione delle variabili in Flowgorithm](#79-dichiarazione-delle-variabili-in-flowgorithm)
- [7.10 Variabili in Python](#710-variabili-in-python)
- [7.11 L'assegnazione](#711-lassegnazione)
- [7.12 La traccia dell'esecuzione](#712-la-traccia-dellesecuzione)
- [7.13 Esempio completo — Area del rettangolo](#713-esempio-completo-area-del-rettangolo)
- [7.14 Come scegliere il nome di una variabile](#714-come-scegliere-il-nome-di-una-variabile)
- [7.15 Regole per i nomi delle variabili](#715-regole-per-i-nomi-delle-variabili)
- [7.16 Errori comuni](#716-errori-comuni)
- [Esercizi del Modulo 7](#esercizi-del-modulo-7)
- [Quiz di autovalutazione](#quiz-di-autovalutazione)
- [Riepilogo del Modulo 7](#riepilogo-del-modulo-7)

---

<a id="71-introduzione"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 7.1 Introduzione

Nei moduli precedenti abbiamo imparato a progettare algoritmi, rappresentarli con Flow Chart e implementarli in Flowgorithm. Abbiamo però trascurato finora una domanda fondamentale.

> **Dove vengono memorizzati i dati durante l'esecuzione di un algoritmo?**

La risposta è: nelle **variabili**.

Ogni programma, anche il più semplice tra quelli visti finora, utilizza variabili per memorizzare temporaneamente i dati su cui lavora. Programmi più complessi possono utilizzarne decine, centinaia o addirittura milioni.

---

<a id="72-un-esempio-nella-vita-quotidiana"></a>

## 7.2 Un esempio nella vita quotidiana

Immaginiamo una serie di scatole, ciascuna dotata di:

- un'etichetta;
- uno spazio interno.

```
┌────────────┐
│    ETA     │
│------------│
│     16     │
└────────────┘
```

L'etichetta rappresenta il **nome della variabile**. Il contenuto rappresenta il **valore memorizzato**.

Durante l'esecuzione del programma il contenuto della scatola può cambiare, mentre l'etichetta resta sempre la stessa: è esattamente questo il comportamento di una variabile.

---

<a id="73-che-cose-una-variabile"></a>

## 7.3 Che cos'è una variabile?

Una **variabile** è una zona della memoria del computer identificata da un nome, nella quale è possibile memorizzare un valore. Il valore può essere modificato durante l'esecuzione del programma.

### Definizione

> Una variabile è un contenitore che memorizza un'informazione utilizzata da un algoritmo.

> 💡 **Approfondimento** — Il termine "variabile" può trarre in inganno: non è il *nome* a variare, ma il *contenuto* che quel nome identifica. `eta` rimarrà sempre `eta` per tutta l'esecuzione del programma; ciò che cambierà, eventualmente, è il valore che vi è memorizzato in un dato istante.

---

<a id="74-perche-servono-le-variabili"></a>

## 7.4 Perché servono le variabili?

Senza variabili un programma non potrebbe:

- leggere dati;
- effettuare calcoli;
- memorizzare risultati;
- confrontare valori;
- prendere decisioni.

Le variabili sono quindi uno degli elementi fondamentali della programmazione: senza di esse, un algoritmo potrebbe al massimo visualizzare messaggi fissi, ma non elaborare alcun dato reale.

### Un primo esempio

Problema: calcolare il doppio di un numero. Servono due variabili.

```
numero

doppio
```

Durante l'esecuzione:

```
numero = 8
      ↓
doppio = 16
```

---

<a id="75-le-variabili-cambiano-valore"></a>

## 7.5 Le variabili cambiano valore

Una variabile può assumere valori diversi nel tempo. Esempio:

```
punteggio = 0
      ↓
punteggio = 10
      ↓
punteggio = 35
      ↓
punteggio = 50
```

Il nome della variabile rimane lo stesso. Cambia solamente il valore contenuto: è proprio questa capacità di "aggiornarsi" durante l'esecuzione che distingue una variabile da una costante, come vedremo tra poco.

---

<a id="76-che-cose-una-costante"></a>

## 7.6 Che cos'è una costante?

Una **costante** rappresenta un valore che non cambia durante l'esecuzione del programma. Ad esempio:

```
Numero di mesi dell'anno = 12
```

oppure:

```
Numero di giorni della settimana = 7
```

oppure:

```
π = 3.141592...
```

Sono tutti valori costanti: il loro significato stesso impone che restino invariati per tutta la durata del programma.

> ⚠️ **Attenzione** — Una costante non è "una variabile che per caso non cambia mai": è una scelta di progettazione. Se un valore rappresenta qualcosa che, per definizione del problema, non deve mai cambiare durante l'esecuzione (come il numero di giorni della settimana), è buona pratica trattarlo come costante fin dall'inizio, anche solo mentalmente in fase di analisi.

---

<a id="77-variabile-e-costante-a-confronto"></a>

## 7.7 Variabile e costante a confronto

| Variabile | Costante |
|------------|-----------|
| Può cambiare valore | Rimane invariata |
| Memorizza dati modificabili | Memorizza valori fissi |
| Utilizzata durante i calcoli | Utilizzata come riferimento |

---

<a id="78-i-tipi-di-dato-fondamentali"></a>

## 7.8 I tipi di dato fondamentali

Ogni variabile contiene un determinato tipo di informazione. Come già anticipato nel Modulo 2, i principali tipi di dato che useremo nel corso sono quattro.

### Intero (Integer)

Contiene numeri senza parte decimale.

```
5
18
250
-9
```

### Reale (Real)

Contiene numeri con la parte decimale.

```
3.14
8.75
120.5
```

### Stringa (String)

Contiene testo.

```
"Marco"
"Roma"
"Informatica"
```

### Booleano (Boolean)

Può assumere soltanto due valori.

```
VERO
FALSO
```

In Python:

```
True
False
```

I valori booleani diventeranno particolarmente importanti a partire dal Modulo 11, quando studieremo le strutture di **selezione**: ogni condizione (`SE ... ALLORA`) restituisce infatti un valore booleano.

---

<a id="79-dichiarazione-delle-variabili-in-flowgorithm"></a>

## 7.9 Dichiarazione delle variabili in Flowgorithm

Come già visto nel Modulo 6, Flowgorithm richiede normalmente la dichiarazione delle variabili.

```
Declare nome As String

Declare eta As Integer

Declare altezza As Real

Declare promosso As Boolean
```

La dichiarazione comunica al programma:

- il nome della variabile;
- il tipo di dato che conterrà.

Dichiarare correttamente ogni variabile fin dall'inizio dell'algoritmo è una buona pratica che eviterà molti errori nei moduli successivi, specialmente quando gli algoritmi diventeranno più complessi.

---

<a id="710-variabili-in-python"></a>

## 7.10 Variabili in Python

Python semplifica notevolmente la gestione delle variabili: non è necessario dichiararle esplicitamente. Basta assegnare un valore.

```python
nome = "Marco"

eta = 16

altezza = 1.72

promosso = True
```

Python riconosce automaticamente il tipo di dato, sulla base del valore assegnato.

> 💡 **Approfondimento** — Questa caratteristica di Python si chiama **tipizzazione dinamica**: la stessa variabile potrebbe, in linea teorica, contenere prima un numero e poi una stringa. Non è una buona pratica farlo (rende il codice confuso), ma è bene sapere che Python, a differenza di Flowgorithm con le sue dichiarazioni esplicite, non lo impedisce.

---

<a id="711-lassegnazione"></a>

## 7.11 L'assegnazione

L'operazione più importante sulle variabili è l'**assegnazione**, già introdotta nel Modulo 4. Ad esempio:

```
numero ← 10
```

Significa: memorizza il valore 10 nella variabile `numero`. Successivamente:

```
numero ← 25
```

Il valore precedente viene sostituito: la "scatola" `numero` ora contiene 25, non più 10.

> ⚠️ **Attenzione** — Molti studenti confondono l'assegnazione con l'uguaglianza matematica. In Informatica, un'istruzione come:
> ```
> numero ← numero + 1
> ```
> ha perfettamente senso, mentre in matematica un'equazione `numero = numero + 1` non avrebbe soluzione. In Informatica significa: prendi il valore attualmente contenuto nella variabile, aggiungi uno, e salva il nuovo valore nella stessa variabile.

### Esempio

All'inizio:

```
contatore = 5
```

Dopo:

```
contatore ← contatore + 1
```

il contenuto diventa:

```
6
```

---

<a id="712-la-traccia-dellesecuzione"></a>

## 7.12 La traccia dell'esecuzione

Seguiamo passo passo un semplice algoritmo, osservando come cambia il contenuto delle variabili istruzione dopo istruzione.

```
numero ← 4

doppio ← numero * 2

triplo ← numero * 3
```

| Variabile | Valore |
|------------|--------|
| numero | 4 |
| doppio | 8 |
| triplo | 12 |

Questa tecnica prende il nome di **traccia dell'esecuzione** ed è estremamente utile per comprendere il funzionamento di un algoritmo, e ancora di più — come vedremo nel Modulo 16 — per individuare la causa di un comportamento inatteso durante il debugging.

---

<a id="713-esempio-completo-area-del-rettangolo"></a>

## 7.13 Esempio completo — Area del rettangolo

### Problema

Calcolare l'area di un rettangolo.

### Analisi

| Input | Output |
|---|---|
| base, altezza | area |

### Variabili

```
base
altezza
area
```

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
   ↓
Leggi base
   ↓
Leggi altezza
   ↓
area = base × altezza
   ↓
Visualizza area
   ↓
FINE
```

### Flowgorithm

```
Start

Declare base As Real
Declare altezza As Real
Declare area As Real

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

Nota come, ancora una volta, ogni variabile individuata in fase di analisi (base, altezza, area) attraversi senza modifiche l'intero percorso, dallo pseudocodice fino al codice Python.

---

<a id="714-come-scegliere-il-nome-di-una-variabile"></a>

## 7.14 Come scegliere il nome di una variabile

Il nome dovrebbe descrivere chiaramente il contenuto della variabile.

### Buoni esempi

```
eta
prezzo
media
temperatura
nomeStudente
totaleSpesa
```

### Nomi poco significativi

```
a
x
pippo
dato1
valore2
```

Questi ultimi sono accettati dal computer, ma rendono il programma molto più difficile da leggere e da correggere, sia per te stesso a distanza di tempo, sia per chiunque altro dovesse leggere il tuo codice.

---

<a id="715-regole-per-i-nomi-delle-variabili"></a>

## 7.15 Regole per i nomi delle variabili

In Python, i nomi delle variabili:

✅ possono contenere lettere;

✅ possono contenere numeri;

✅ possono contenere il carattere `_`;

❌ non possono iniziare con un numero;

❌ non devono contenere spazi;

❌ non devono utilizzare parole riservate del linguaggio (come `for`, `while`, `if`).

### Esempi corretti

```
eta
numero1
totale_spesa
mediaClasse
prezzoFinale
```

### Esempi errati

```
2numero
nome studente
media-voti
for
while
```

---

<a id="716-errori-comuni"></a>

## 7.16 Errori comuni

### Errore 1 — Usare una variabile senza inizializzarla

Utilizzare una variabile in un calcolo prima di averle assegnato un valore produce un comportamento inatteso o un errore, sia in Flowgorithm sia in Python.

### Errore 2 — Confondere variabile e costante

Trattare come modificabile un valore che, per il senso del problema, dovrebbe restare fisso (o viceversa) genera algoritmi poco chiari e più difficili da correggere.

### Errore 3 — Utilizzare nomi poco descrittivi

Nomi come `x`, `a` o `dato1` rendono il codice difficile da rileggere, anche a distanza di poche ore.

### Errore 4 — Scrivere nomi diversi per la stessa variabile

```
Numero
numero
NUMERO
```

In Python (e in molti altri linguaggi) queste sono **tre variabili differenti**: questa distinzione si chiama *case sensitivity*, già incontrata nel Modulo 6, ed è una delle fonti di errore più comuni tra chi inizia a programmare.

---

## ✅ Best Practice

✅ Utilizzare nomi significativi.

✅ Dichiarare chiaramente le variabili in Flowgorithm.

✅ Inizializzare le variabili prima dell'uso.

✅ Utilizzare una variabile per ogni informazione distinta.

✅ Evitare abbreviazioni poco comprensibili.

---

<a id="esercizi-del-modulo-7"></a>

## 🧪 Esercizi del Modulo 7

**Esercizio 1 — Individuare le variabili**

Per ciascun problema individua le variabili necessarie e il tipo di dato più adatto (Integer, Real, String o Boolean):

1. calcolare la media di tre voti;
2. calcolare il perimetro di un rettangolo;
3. convertire euro in dollari;
4. calcolare il costo totale di una spesa.

**Esercizio 2 — Dal problema al Python**

Per ogni problema dell'Esercizio 1:

- individua input e output;
- elenca le variabili con il rispettivo tipo;
- scrivi lo pseudocodice;
- realizza il diagramma in Flowgorithm;
- traduci il programma in Python.

**Laboratorio**

Realizza i seguenti programmi, tracciando a mano (come nella tabella del paragrafo 7.12) l'esecuzione di ciascuno con almeno un insieme di valori di prova:

- area del quadrato;
- area del rettangolo;
- perimetro del triangolo;
- media di quattro numeri;
- prezzo finale di due prodotti.

Per ogni esercizio prova almeno cinque insiemi di dati diversi.

---

<a id="quiz-di-autovalutazione"></a>

## 📝 Quiz di autovalutazione

**1. Una variabile è:**

A. Un simbolo del Flow Chart.

B. Una zona di memoria, identificata da un nome, che contiene un valore modificabile.

C. Un compilatore.

D. Un linguaggio di programmazione.

---

**2. Una costante:**

A. Può cambiare valore durante l'esecuzione.

B. Contiene sempre un valore fisso, per tutta la durata del programma.

C. Esiste solo in Python.

D. È uguale a una variabile.

---

**3. Quale dei seguenti è un nome corretto per una variabile Python?**

A. `2numero`

B. `nome studente`

C. `totale_spesa`

D. `for`

---

**4. Quale tipo di dato utilizzeresti per memorizzare una temperatura di 36,5 °C?**

A. Integer

B. Boolean

C. String

D. Real

---

**5. Che cosa produce l'istruzione `contatore ← contatore + 1`, se `contatore` valeva inizialmente 5?**

A. Un errore, perché non è un'equazione valida.

B. Il valore 1, perché sovrascrive completamente `contatore`.

C. Il valore 6, perché al valore precedente viene sommato 1 e il risultato viene salvato nella stessa variabile.

D. Nessun cambiamento, perché `contatore` è una costante.

---

<a id="riepilogo-del-modulo-7"></a>

## 📚 Riepilogo del Modulo 7

In questo modulo abbiamo introdotto le **variabili**, le **costanti** e i principali **tipi di dato** (Integer, Real, String, Boolean), comprendendo come i programmi memorizzano e manipolano le informazioni durante l'esecuzione.

Abbiamo imparato a dichiarare le variabili in **Flowgorithm**, a utilizzarle in **Python**, a distinguere assegnazione e uguaglianza matematica, a tracciare l'esecuzione di un algoritmo e a scegliere nomi chiari e significativi.

Nel prossimo modulo approfondiremo **Input e Output**, studiando nel dettaglio come acquisire dati dall'utente e come presentare i risultati in modo chiaro ed efficace.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*