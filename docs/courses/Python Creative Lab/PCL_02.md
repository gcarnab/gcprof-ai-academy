# 🐢 M2 — Google Colab e la prima tartaruga

## La tua prima esperienza con Python

**Python Creative Lab**

* **Versione:** Luglio 2026
* **Piattaforma:** gcprof-academy.com
* **Livello:** Classe prima scuola secondaria di secondo grado
* **Prerequisiti:** Aver completato M0 — Benvenuti nel laboratorio di Python

---

<a id="indice"></a>
## Indice del modulo

- [Missione](#missione)
- [1. Il laboratorio del programmatore](#1)
- [2. Che cos'è Google Colab](#2)
- [3. Il concetto di notebook](#3)
- [4. Le celle di Colab](#4)
- [5. Prepariamo il nostro laboratorio](#5)
- [6. Installiamo ColabTurtlePlus](#6)
- [7. Conosciamo Terry](#7)
- [8. Il primo comando Python](#8)
- [9. Il primo disegno](#9)
- [10. Analizziamo il codice](#10)
- [11. Laboratorio guidato](#11)
- [12. Missione di Terry](#12)
- [13. Mini progetto](#13)
- [14. Sfida pratica](#14)
- [15. Quiz docente](#15)
- [16. Badge e punti esperienza](#16)
- [17. Riepilogo finale](#17)

---

[🔙 Torna all'indice](#indice)

---

# Missione

<a id="missione"></a>

## Aprire la porta del laboratorio digitale

Nel modulo precedente hai scoperto che cosa significa programmare.

Ora inizierai a farlo davvero.

La tua prima missione è preparare il tuo ambiente di lavoro.

Un programmatore ha bisogno di uno spazio dove:

- scrivere codice;
- eseguire programmi;
- controllare i risultati;
- modificare le proprie idee.

Il nostro laboratorio sarà:

## Google Colab

Qui incontrerai Terry per la prima volta.

---

# 1. Il laboratorio del programmatore

<a id="1"></a>

[🔙 Torna all'indice](#indice)

---

Quando uno scrittore usa un quaderno per scrivere storie, un programmatore usa un ambiente di sviluppo per scrivere programmi.

Durante questo corso utilizzeremo Google Colab.

È uno strumento online che permette di programmare senza installare software complessi.

Questo significa che potrai lavorare:

- a scuola;
- a casa;
- da qualsiasi computer collegato a Internet.

---

## 🐢 Terry consiglia

Non pensare al codice come a qualcosa di misterioso.

Un programma nasce sempre da piccoli passi.

Oggi non costruiremo un paesaggio.

Oggi faremo il primo passo:

far muovere Terry.

---

# 2. Che cos'è Google Colab

<a id="2"></a>

[🔙 Torna all'indice](#indice)

---

Google Colab è un ambiente gratuito per scrivere ed eseguire programmi Python direttamente dal browser.

Il nome deriva da:

**Colaboratory**

cioè:

"laboratorio collaborativo".

Con Colab puoi:

- creare documenti di codice;
- eseguire programmi;
- salvare il lavoro;
- condividere esperimenti.

---

## Perché utilizziamo Colab?

Perché permette di concentrarsi sulla programmazione senza preoccuparsi dell'installazione.

Il nostro obiettivo è imparare Python.

Non perdere tempo nella configurazione del computer.

---

# 3. Che cos'è un notebook

<a id="3"></a>

[🔙 Torna all'indice](#indice)

---

Un notebook è un documento digitale formato da celle.

Puoi immaginarlo come un quaderno interattivo.

Un quaderno normale contiene:

- pagine;
- testi;
- disegni.

Un notebook contiene:

- testo;
- codice;
- risultati.

---

Un notebook Python permette di:

1. scrivere un comando;
2. eseguirlo;
3. vedere immediatamente il risultato.

Questo rende l'apprendimento molto più semplice.

---

# 4. Le celle di Colab

<a id="4"></a>

[🔙 Torna all'indice](#indice)

---

Un notebook è formato da celle.

Esistono principalmente due tipi di celle.

---

## Celle di testo

Servono per scrivere spiegazioni.

Esempio:

```
Questo è il mio primo programma Python.
```

---

## Celle di codice

Servono per scrivere istruzioni Python.

Esempio:

```python
print("Ciao Python")
```

Quando premi il pulsante ▶ la cella viene eseguita.

---

## 🧠 Byte spiega

Il computer non esegue tutto il notebook automaticamente.

Esegue solamente le celle che gli chiedi di eseguire.

Se una cella contiene un errore, puoi correggere solo quella.

---

# 5. Prepariamo il nostro laboratorio

<a id="5"></a>

[🔙 Torna all'indice](#indice)

---

Per iniziare servono:

✅ un account Google

✅ un browser aggiornato

✅ una connessione Internet

Apriremo un nuovo notebook.

Il nome consigliato sarà:

```
PythonCreativeLab_M2_PrimaTurtle
```

---

## Regola del programmatore

Un buon programmatore organizza sempre i propri lavori.

Un nome chiaro aiuta a ritrovare facilmente i propri progetti.

---

# 6. Installiamo ColabTurtlePlus

<a id="6"></a>

[🔙 Torna all'indice](#indice)

---

Python può essere ampliato con librerie.

Una libreria è una raccolta di strumenti già pronti.

Per disegnare utilizzeremo:

## ColabTurtlePlus

È una versione adattata della classica Turtle per funzionare dentro Google Colab.

---

Nella prima cella di codice scrivi:

```python
!pip install ColabTurtlePlus
```

Poi premi ▶.

---

## Analizziamo il comando

```python
!
```

Dice a Colab di eseguire un comando del sistema.

---

```python
pip install
```

Significa:

"installa una libreria Python".

---

```python
ColabTurtlePlus
```

È il nome dello strumento che useremo.

---

## 🐞 Bug ti avvisa

Se compare un messaggio rosso durante l'installazione non sempre significa che c'è un problema.

Aspetta che Colab termini l'esecuzione.

Molti messaggi sono semplicemente informazioni tecniche.

---

# 7. Conosciamo Terry

<a id="7"></a>

[🔙 Torna all'indice](#indice)

---

Ora possiamo importare gli strumenti necessari.

Scriviamo:

```python
from ColabTurtlePlus.Turtle import *
```

---

Questa istruzione permette al nostro programma di utilizzare i comandi della Turtle.

Da questo momento Python conosce Terry.

---

## 🐢 Terry racconta

La Turtle nasce negli anni '60 come strumento educativo.

È stata creata per aiutare gli studenti a capire la programmazione attraverso il movimento.

Ancora oggi viene utilizzata perché trasforma il codice in qualcosa di visibile.

---

# 8. Il primo comando Python

<a id="8"></a>

[🔙 Torna all'indice](#indice)

---

Prima di disegnare prepariamo lo spazio.

Scriviamo:

```python
clearscreen()
```

---

Questo comando pulisce il foglio.

È come prendere un foglio bianco prima di iniziare un disegno.

---

Ora impostiamo la finestra:

```python
setup(800,500)
```

---

Significa:

* larghezza: 800 pixel
* altezza: 500 pixel

---

# 9. Il primo disegno

<a id="9"></a>

[🔙 Torna all'indice](#indice)

---

Finalmente Terry è pronta.

Scriviamo:

```python
forward(100)
```

Esegui la cella.

Dovresti vedere una linea.

🎉 Hai appena creato il tuo primo disegno con Python.

---

# 10. Analizziamo il codice

<a id="10"></a>

[🔙 Torna all'indice](#indice)

---

## `forward()`

È un comando di movimento.

Dice a Terry:

"Vai avanti."

---

## Il numero 100

Indica la distanza.

```python
forward(100)
```

significa:

"Avanza di 100 pixel."

---

La struttura generale è:

```python
comando(valore)
```

Molti comandi Python funzionano in questo modo.

---

# 11. Laboratorio guidato

<a id="11"></a>

[🔙 Torna all'indice](#indice)

---

## Esperimento 1

Modifica:

```python
forward(100)
```

in:

```python
forward(50)
```

Cosa cambia?

---

## Esperimento 2

Prova:

```python
forward(200)
```

Osserva la differenza.

---

## Esperimento 3

Prova a prevedere il risultato prima di eseguire.

Questa è una capacità fondamentale del programmatore.

---

# 12. Missione di Terry

<a id="12"></a>

[🔙 Torna all'indice](#indice)

---

## Missione: la prima passeggiata

Terry vuole fare una passeggiata.

Crea tre programmi diversi:

🟢 corto

```python
forward(50)
```

🟡 medio

```python
forward(150)
```

🔴 lungo

```python
forward(300)
```

Confronta i risultati.

---

# 13. Mini progetto

<a id="13"></a>

[🔙 Torna all'indice](#indice)

---

## Il diario di Terry

Crea un notebook chiamato:

```
Diario_di_Terry
```

Inserisci:

* un titolo;
* una cella con il primo comando;
* una cella con le tue prove.

Questo sarà il tuo primo progetto personale.

---

# 14. Sfida pratica

<a id="14"></a>

[🔙 Torna all'indice](#indice)

---

## Sfida livello 🟢

Disegna tre linee diverse:

* una corta;
* una media;
* una lunga.

Poi rispondi:

Quale valore rende la linea più lunga?

---

# 15. Quiz docente

<a id="15"></a>

[🔙 Torna all'indice](#indice)

---

## Domanda 1

Google Colab è:

A) Un videogioco

B) Un ambiente online per programmare

C) Un linguaggio di programmazione

D) Un sistema operativo

✅ Risposta corretta: B

---

## Domanda 2

Una cella di codice serve per:

A) Scrivere ed eseguire programmi

B) Disegnare immagini manualmente

C) Salvare fotografie

D) Navigare su Internet

✅ Risposta corretta: A

---

## Domanda 3

Cosa installa il comando?

```python
!pip install ColabTurtlePlus
```

A) Un browser

B) Una libreria Python

C) Un gioco

D) Un sistema operativo

✅ Risposta corretta: B

---

## Domanda 4

Cosa significa:

```python
forward(100)
```

A) Cambia colore

B) Avanza di 100 pixel

C) Cancella lo schermo

D) Chiude Python

✅ Risposta corretta: B

---

## Domanda 5

La Turtle permette di:

A) Disegnare programmando

B) Creare documenti Word

C) Navigare online

D) Modificare foto

✅ Risposta corretta: A

---

# 16. Badge e punti esperienza

<a id="16"></a>

[🔙 Torna all'indice](#indice)

---

Completando M2 ottieni:

🏆 **Badge: 🐢 Primo Passo**

XP guadagnati:

⭐ 100 XP

Hai aperto il laboratorio e fatto muovere Terry per la prima volta.

---

# 17. Riepilogo finale

<a id="17"></a>

[🔙 Torna all'indice](#indice)

---

In questo modulo hai imparato:

✅ cos'è Google Colab

✅ cos'è un notebook

✅ cosa sono le celle

✅ cosa sono le librerie Python

✅ come installare ColabTurtlePlus

✅ come importare Turtle

✅ il primo comando di movimento

---

## Checklist finale

Prima di passare a M2:

☐ So aprire un notebook Colab.

☐ So eseguire una cella.

☐ So installare una libreria.

☐ So utilizzare `forward()`.

☐ Ho creato il mio primo disegno.

---

🚀 **Prossima missione: M3 — Muovere la Turtle**

Nel prossimo modulo Terry imparerà a:

* cambiare direzione;
* girare a destra e sinistra;
* controllare la penna;
* costruire i primi percorsi.