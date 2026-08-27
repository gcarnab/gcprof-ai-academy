# 🧠 M6 — Introduzione a Flowgorithm

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Problem Solving — Il metodo prima del codice

---

> **"Prima di imparare un linguaggio di programmazione è importante imparare a progettare algoritmi. Flowgorithm è lo strumento ideale per iniziare."**

---

## Cosa imparerai in questo modulo

Fino a questo punto abbiamo lavorato solo "su carta": linguaggio naturale, pseudocodice, Flow Chart disegnati a mano. In questo modulo entra in scena il primo vero strumento software del corso — **Flowgorithm** — con cui i tuoi diagrammi smetteranno di essere disegni statici e diventeranno algoritmi realmente **eseguibili**. Imparerai a installare il software, a riconoscere la sua interfaccia, a inserire i simboli fondamentali (Input, Output, Assignment, Declaration) e a eseguire i tuoi primi tre algoritmi, sia in modalità completa (Run) sia passo dopo passo (Step), un modo eccellente per "vedere" come un programma ragiona realmente durante l'esecuzione.

---

<a id="indice-modulo"></a>

## Indice del Modulo 6

- [6.1 Introduzione](#61-introduzione)
- [6.2 Che cos'è Flowgorithm?](#62-che-cose-flowgorithm)
- [6.3 Perché utilizzare Flowgorithm?](#63-perche-utilizzare-flowgorithm)
- [6.4 Il ruolo di Flowgorithm nella roadmap del corso](#64-il-ruolo-di-flowgorithm-nella-roadmap-del-corso)
- [6.5 Installazione](#65-installazione)
- [6.6 L'interfaccia di Flowgorithm](#66-linterfaccia-di-flowgorithm)
- [6.7 I simboli disponibili](#67-i-simboli-disponibili)
- [6.8 Come inserire un simbolo](#68-come-inserire-un-simbolo)
- [6.9 Il primo algoritmo](#69-il-primo-algoritmo)
- [6.10 Eseguire un algoritmo](#610-eseguire-un-algoritmo)
- [6.11 L'esecuzione passo-passo](#611-lesecuzione-passo-passo)
- [6.12 Secondo esempio — Nome e saluto](#612-secondo-esempio-nome-e-saluto)
- [6.13 Terzo esempio — Somma di due numeri](#613-terzo-esempio-somma-di-due-numeri)
- [6.14 Dichiarazione delle variabili](#614-dichiarazione-delle-variabili)
- [6.15 Flowgorithm e Python a confronto](#615-flowgorithm-e-python-a-confronto)
- [6.16 Errori comuni](#616-errori-comuni)
- [Esercizi del Modulo 6](#esercizi-del-modulo-6)
- [Quiz di autovalutazione](#quiz-di-autovalutazione)
- [Riepilogo del Modulo 6](#riepilogo-del-modulo-6)

---

<a id="61-introduzione"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 6.1 Introduzione

Nei moduli precedenti abbiamo imparato a:

- analizzare un problema;
- progettare un algoritmo;
- scrivere lo pseudocodice;
- rappresentare la soluzione mediante un Diagramma di Flusso.

Adesso iniziamo ad utilizzare il primo vero strumento software del corso: **Flowgorithm**.

Flowgorithm permette di trasformare un Diagramma di Flusso in un algoritmo realmente eseguibile. In questo modo possiamo verificare immediatamente il funzionamento della soluzione senza conoscere ancora la sintassi di Python.

---

<a id="62-che-cose-flowgorithm"></a>

## 6.2 Che cos'è Flowgorithm?

Flowgorithm è un software gratuito pensato per l'insegnamento della programmazione.

L'utente non scrive codice. Costruisce invece un algoritmo inserendo simboli grafici. Il programma esegue il diagramma esattamente come farebbe un computer.

Per questo motivo Flowgorithm rappresenta un eccellente strumento didattico: unisce la chiarezza visiva del Flow Chart vista nel Modulo 5 alla concretezza di un vero algoritmo eseguibile.

---

<a id="63-perche-utilizzare-flowgorithm"></a>

## 6.3 Perché utilizzare Flowgorithm?

Molti studenti trovano difficile imparare contemporaneamente:

- la logica di un algoritmo;
- la sintassi di un linguaggio di programmazione.

Flowgorithm elimina questo problema: lo studente può concentrarsi esclusivamente sulla logica. Solo successivamente tradurrà il diagramma in Python, quando la logica sarà già stata verificata e corretta.

> 💡 **Approfondimento** — Questo approccio ha un nome preciso in didattica dell'Informatica: si chiama "separazione tra logica e sintassi". Molti principianti si scoraggiano non perché non capiscono il ragionamento, ma perché commettono errori di sintassi che nascondono un ragionamento in realtà corretto. Flowgorithm rimuove questo ostacolo, permettendoti di sbagliare (e correggere) solo sulla logica.

---

<a id="64-il-ruolo-di-flowgorithm-nella-roadmap-del-corso"></a>

## 6.4 Il ruolo di Flowgorithm nella roadmap del corso

Il percorso didattico seguito durante il corso sarà sempre il seguente.

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

Flowgorithm rappresenta quindi il collegamento tra la progettazione (i moduli 1-5) e la programmazione vera e propria (Python, a partire dal Modulo 17): da qui fino a quel punto, Flowgorithm sarà il nostro ambiente di lavoro principale.

---

<a id="65-installazione"></a>

## 6.5 Installazione

Flowgorithm è disponibile gratuitamente per Windows.

Una volta installato sarà possibile creare nuovi algoritmi scegliendo:

```
File → New
```

Comparirà un diagramma contenente soltanto:

```
START
   ↓
END
```

Questo rappresenta il **diagramma minimo**: il punto di partenza di qualsiasi algoritmo che costruirai da qui in avanti, esattamente come il Terminatore INIZIO/FINE visto nel Modulo 5.

---

<a id="66-linterfaccia-di-flowgorithm"></a>

## 6.6 L'interfaccia di Flowgorithm

L'interfaccia è semplice ed intuitiva. Le principali aree sono:

| Area | Funzione |
|---|---|
| Barra dei menu | Comandi generali (File, Edit, Run...) |
| Barra degli strumenti | Accesso rapido ai simboli |
| Area del Diagramma | Dove costruisci il tuo algoritmo |
| Proprietà dei simboli | Configurazione del simbolo selezionato |
| Console di esecuzione | Dove appaiono input richiesti e output prodotti |

Durante il laboratorio utilizzeremo principalmente l'**area centrale** (il Diagramma) e la **Console**, dove osserveremo l'esito di ogni esecuzione.

---

<a id="67-i-simboli-disponibili"></a>

## 6.7 I simboli disponibili

Flowgorithm mette a disposizione numerosi simboli. Nel corso inizieremo utilizzando solamente quelli fondamentali.

| Simbolo | Utilizzo |
|----------|----------|
| Input | Acquisizione dati |
| Output | Visualizzazione dati |
| Assignment | Elaborazione |
| Declaration | Dichiarazione variabili |
| Comment | Commenti |
| Decision | Scelte (Modulo 11 e 12) |
| Loop | Ripetizioni (Modulo 13) |

Per il momento utilizzeremo soltanto **Input**, **Output**, **Assignment** e **Declaration**: sono sufficienti a costruire qualsiasi algoritmo puramente sequenziale, come quelli che abbiamo visto finora nel corso.

---

<a id="68-come-inserire-un-simbolo"></a>

## 6.8 Come inserire un simbolo

Per aggiungere una nuova istruzione:

1. fare clic sulla freccia del diagramma, nel punto in cui vuoi inserire la nuova istruzione;
2. scegliere il simbolo desiderato dal menu che compare;
3. compilare la finestra di dialogo con i dati richiesti.

Ogni simbolo verrà automaticamente collegato agli altri: non è necessario disegnare manualmente le frecce, a differenza di quando disegnavi i Flow Chart su carta nel Modulo 5.

---

<a id="69-il-primo-algoritmo"></a>

## 6.9 Il primo algoritmo

Realizziamo il nostro primo programma.

### Problema

Visualizzare la scritta:

```
Benvenuto nel corso di Informatica
```

### Analisi

| Input | Output |
|---|---|
| Nessuno | Una frase |

### Pseudocodice

```
INIZIO

SCRIVI "Benvenuto nel corso di Informatica"

FINE
```

### Flow Chart

```
INIZIO
   ↓
Visualizza messaggio
   ↓
FINE
```

### Flowgorithm

```
Start

Output "Benvenuto nel corso di Informatica"

End
```

### Python

```python
print("Benvenuto nel corso di Informatica")
```

Nota che questo è il primo algoritmo del corso senza alcun input: alcuni problemi non richiedono dati dall'utente, e questo va bene — non tutti gli algoritmi hanno bisogno di tutte e tre le fasi Input/Elaborazione/Output.

---

<a id="610-eseguire-un-algoritmo"></a>

## 6.10 Eseguire un algoritmo

Flowgorithm permette di eseguire il diagramma. Premendo il pulsante:

```
Run
```

l'algoritmo viene eseguito nella sua interezza. Il risultato compare nella Console.

---

<a id="611-lesecuzione-passo-passo"></a>

## 6.11 L'esecuzione passo-passo

Una delle funzionalità più utili di Flowgorithm è la modalità:

```
Step
```

Questa modalità esegue un'istruzione alla volta. Lo studente può osservare:

- quale simbolo viene eseguito in quel momento;
- l'ordine reale delle operazioni;
- il contenuto delle variabili istante per istante.

È uno strumento estremamente utile per comprendere il funzionamento degli algoritmi, specialmente quando qualcosa non funziona come previsto: la modalità Step ti permette di individuare esattamente **in quale istruzione** il comportamento si discosta da quello atteso, un'anticipazione delle tecniche di debugging che approfondiremo nel Modulo 16.

---

<a id="612-secondo-esempio-nome-e-saluto"></a>

## 6.12 Secondo esempio — Nome e saluto

### Problema

Leggere il nome dello studente e salutarlo.

### Analisi

| Input | Output |
|---|---|
| nome | Messaggio di saluto |

### Pseudocodice

```
INIZIO

LEGGI nome

SCRIVI "Ciao " + nome

FINE
```

### Flowgorithm

```
Start

Declare nome As String

Input nome

Output "Ciao " + nome

End
```

### Python

```python
nome = input("Come ti chiami? ")

print("Ciao", nome)
```

Nota la nuova istruzione `Declare nome As String`: a differenza del semplice Flow Chart concettuale, Flowgorithm richiede di dichiarare esplicitamente il **tipo** di ogni variabile. Approfondiremo questo concetto tra poco, al paragrafo 6.14, e in modo ancora più completo nel Modulo 7.

---

<a id="613-terzo-esempio-somma-di-due-numeri"></a>

## 6.13 Terzo esempio — Somma di due numeri

### Problema

Leggere due numeri e visualizzare la loro somma.

### Analisi

| Input | Output |
|---|---|
| numero1, numero2 | somma |

### Pseudocodice

```
LEGGI numero1
LEGGI numero2

somma ← numero1 + numero2

SCRIVI somma
```

### Flowgorithm

```
Start

Declare numero1 As Real
Declare numero2 As Real
Declare somma As Real

Input numero1
Input numero2

somma = numero1 + numero2

Output somma

End
```

### Python

```python
numero1 = float(input("Primo numero: "))
numero2 = float(input("Secondo numero: "))

somma = numero1 + numero2

print("Somma =", somma)
```

---

<a id="614-dichiarazione-delle-variabili"></a>

## 6.14 Dichiarazione delle variabili

A differenza del semplice Diagramma di Flusso concettuale visto nel Modulo 5, Flowgorithm richiede normalmente la **dichiarazione** delle variabili, cioè indicare fin da subito che tipo di dato conterranno.

```
Declare eta As Integer

Declare nome As String

Declare altezza As Real

Declare promosso As Boolean
```

Questo passaggio non è una complicazione inutile: ti costringe a riflettere fin da subito su **che tipo di dato** stai maneggiando, un'abitudine che si rivelerà preziosa quando, nel Modulo 7, studieremo formalmente variabili e costanti, e ancora di più quando arriveremo a Python.

---

<a id="615-flowgorithm-e-python-a-confronto"></a>

## 6.15 Flowgorithm e Python a confronto

Confrontiamo i due linguaggi su un nuovo esempio.

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

La logica è identica. Cambiano soltanto la sintassi e le parole chiave: `Input`/`Output` diventano `input()`/`print()`, la dichiarazione esplicita del tipo (`Declare ... As Real`) diventa implicita nella conversione `float(...)`. È un cambio di "vestito", non di ragionamento.

---

<a id="616-errori-comuni"></a>

## 6.16 Errori comuni

### Errore 1 — Confondere Input e Output

Inserire un simbolo Output invece di Input (o viceversa) è uno degli errori più frequenti tra chi inizia: il diagramma "sembra" corretto a colpo d'occhio, ma chiede all'utente di leggere invece di scrivere, o viceversa.

### Errore 2 — Utilizzare una variabile non dichiarata

Flowgorithm richiede che ogni variabile sia dichiarata prima di essere utilizzata: dimenticare questo passaggio genera un errore che, alle prime armi, può risultare poco chiaro.

### Errore 3 — Incoerenza nei nomi delle variabili

```
Numero
```

e

```
numero
```

sono due nomi **differenti** per Flowgorithm (e per Python): questa distinzione si chiama "case sensitivity", e sarà una fonte comune di errori finché non diventerà un'abitudine controllarla.

### Errore 4 — Dimenticare di testare l'algoritmo

Costruire il diagramma senza mai premere Run o Step, "fidandosi" della logica senza verificarla concretamente, vanifica uno dei principali vantaggi di Flowgorithm.

---

## ✅ Best Practice

✅ Salvare frequentemente il diagramma.

✅ Utilizzare nomi di variabili significativi e coerenti.

✅ Provare sempre l'esecuzione passo-passo (Step) almeno una volta per ogni algoritmo nuovo.

✅ Testare più valori diversi, non uno solo.

✅ Correggere prima il diagramma e solo dopo tradurlo in Python.

---

<a id="esercizi-del-modulo-6"></a>

## 🧪 Esercizi del Modulo 6

**Esercizio 1 — Primi algoritmi in Flowgorithm**

Realizza in Flowgorithm i seguenti algoritmi:

1. visualizzare il proprio nome;
2. leggere l'età e visualizzarla;
3. calcolare il doppio di un numero;
4. calcolare il quadrato di un numero.

**Esercizio 2 — Percorso completo**

Per ogni esercizio del punto precedente:

- analizza il problema;
- scrivi lo pseudocodice;
- realizza il diagramma in Flowgorithm;
- esegui almeno cinque test, usando anche la modalità Step;
- traduci il programma in Python.

**Laboratorio**

Realizza in autonomia i seguenti programmi:

- somma di due numeri;
- differenza tra due numeri;
- prodotto di due numeri;
- area del rettangolo;
- perimetro del quadrato;
- media di tre voti.

Per ciascun esercizio completa sempre il percorso:

```
Problema
   ↓
Analisi
   ↓
Pseudocodice
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

**1. Flowgorithm è:**

A. Un compilatore Python.

B. Un ambiente per progettare ed eseguire algoritmi mediante Diagrammi di Flusso.

C. Un database.

D. Un browser.

---

**2. Qual è il principale vantaggio di Flowgorithm?**

A. Scrivere meno codice.

B. Concentrarsi sulla logica dell'algoritmo senza preoccuparsi della sintassi.

C. Aumentare la velocità del computer.

D. Eliminare gli errori di calcolo.

---

**3. Quale modalità permette di eseguire un'istruzione alla volta?**

A. Build.

B. Run.

C. Step.

D. Compile.

---

**4. Dopo aver verificato l'algoritmo in Flowgorithm, quale sarà il passo successivo previsto dalla roadmap?**

A. Studiare i database.

B. Tradurre l'algoritmo in Python.

C. Installare Linux.

D. Studiare le reti.

---

**5. Perché in Flowgorithm è necessario dichiarare le variabili con `Declare`?**

A. Per rallentare volontariamente l'esecuzione.

B. Per indicare fin da subito il tipo di dato che la variabile conterrà.

C. Perché è obbligatorio in tutti i linguaggi di programmazione.

D. Per evitare di dover usare l'Input.

---

<a id="riepilogo-del-modulo-6"></a>

## 📚 Riepilogo del Modulo 6

In questo modulo abbiamo imparato a conoscere **Flowgorithm**, il software che utilizzeremo durante tutto il corso per progettare, eseguire e verificare gli algoritmi.

Abbiamo visto come installarlo, riconoscere la sua interfaccia, creare i primi diagrammi eseguibili con i simboli Input, Output, Assignment e Declaration, eseguirli sia in modalità Run sia passo-passo con Step, e confrontare la rappresentazione grafica con il corrispondente codice Python.

Nel prossimo modulo approfondiremo uno degli elementi fondamentali della programmazione, già intravisto con il comando `Declare`: **le variabili e le costanti**, imparando come i programmi memorizzano e manipolano le informazioni durante l'esecuzione.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*