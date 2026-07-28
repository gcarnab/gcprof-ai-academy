# 🐢 M3 — Muovere la Turtle

## La seconda missione: insegnare a Terry a esplorare il mondo

**Python Creative Lab**

Versione: Luglio 2026

Piattaforma: gcprof-academy.com

Livello: Classe prima scuola secondaria di secondo grado

Prerequisiti:
Aver completato M1 — Google Colab e la prima tartaruga

---
<a id="indice"></a>
## Indice del modulo

- [Missione](#missione)
- [1. Terry impara a muoversi](#1-terry-impara-a-muoversi)
- [2. La direzione della Turtle](#2-la-direzione-della-turtle)
- [3. Il comando forward](#3-il-comando-forward)
- [4. Tornare indietro con backward](#4-tornare-indietro-con-backward)
- [5. Cambiare direzione](#5-cambiare-direzione)
- [6. Girare a destra e sinistra](#6-girare-a-destra-e-sinistra)
- [7. La penna di Terry](#7-la-penna-di-terry)
- [8. Controllare la velocità](#8-controllare-la-velocità)
- [9. Disegnare un percorso](#9-disegnare-un-percorso)
- [10. Analisi del codice](#10-analisi-del-codice)
- [11. Laboratorio guidato](#11-laboratorio-guidato)
- [12. Missione di Terry](#12-missione-di-terry)
- [13. Mini progetto — Il robot esploratore](#13-mini-progetto--il-robot-esploratore)
- [14. Sfida pratica](#14-sfida-pratica)
- [15. Quiz docente](#15-quiz-docente)
- [16. Badge e punti esperienza](#16-badge-e-punti-esperienza)
- [17. Riepilogo finale](#17-riepilogo-finale)

---

[🔙 Torna all'indice](#indice)

---

# Missione

<a id="missione"></a>
[🔙 Torna all'indice](#indice)

## Terry vuole esplorare il mondo

Nel modulo precedente hai fatto muovere Terry per la prima volta.

Hai creato una linea.

Ora però Terry vuole qualcosa di più.

Vuole esplorare.

Vuole:

- camminare avanti;
- tornare indietro;
- cambiare direzione;
- creare percorsi.

La missione di oggi è:

> Imparare a controllare i movimenti di Terry.

---

# 1. Terry impara a muoversi

<a id="1-terry-impara-a-muoversi"></a>

[🔙 Torna all'indice](#indice)

---

Quando programmiamo una Turtle dobbiamo pensare come se fossimo noi a guidarla.

Terry ha:

- una posizione;
- una direzione;
- una penna.

Ogni comando modifica una di queste caratteristiche.

Possiamo immaginare Terry come un robot esploratore.

Il programmatore è il suo navigatore.

---

## 🐢 Terry spiega

Io non so dove andare.

Aspetto sempre le tue istruzioni.

Se scrivi:

```python
forward(100)
```

io avanzo.

Se scrivi:

```python
right(90)
```

io cambio direzione.

---

# 2. La direzione della Turtle

<a id="2-la-direzione-della-turtle"></a>

[🔙 Torna all'indice](#indice)

---

Terry si muove in uno spazio.

Questo spazio può essere immaginato come una mappa.

All'inizio Terry guarda verso l'alto.

La sua direzione iniziale è:

⬆️ Nord

Da questa posizione può:

* avanzare;
* ruotare;
* cambiare percorso.

---

Un programmatore deve sempre sapere:

"Dove si trova il mio oggetto?"

"Dove sta andando?"

Questo modo di ragionare sarà fondamentale quando costruiremo immagini più complesse.

---

# 3. Il comando forward()

<a id="3-il-comando-forward"></a>

[🔙 Torna all'indice](#indice)

---

Abbiamo già incontrato il primo comando:

```python
forward(100)
```

Significa:

"Vai avanti di 100 passi."

---

Proviamo:

```python
from ColabTurtlePlus.Turtle import *

clearscreen()
setup(800,500)

forward(150)
```

---

Risultato:

Terry disegna una linea lunga 150 pixel.

---

## Cambiare distanza

Possiamo modificare il numero:

```python
forward(50)
```

Linea corta.

```python
forward(300)
```

Linea lunga.

---

## 🧠 Capisco

Il numero dentro le parentesi si chiama:

**parametro**

È un valore che modifica il comportamento del comando.

---

# 4. Tornare indietro con backward()

<a id="4-tornare-indietro-con-backward"></a>

[🔙 Torna all'indice](#indice)

---

A volte Terry deve tornare al punto di partenza.

Usiamo:

```python
backward(100)
```

Significa:

"Vai indietro di 100 passi."

---

Esempio:

```python
clearscreen()
setup(800,500)

forward(200)
backward(200)
```

---

Cosa succede?

Terry:

1. avanza;
2. torna indietro;
3. ritorna alla posizione iniziale.

---

# 5. Cambiare direzione

<a id="5-cambiare-direzione"></a>

[🔙 Torna all'indice](#indice)

---

Per costruire disegni non basta andare avanti.

Dobbiamo cambiare direzione.

I comandi principali sono:

```python
right()
```

gira a destra.

---

```python
left()
```

gira a sinistra.

---

Questi comandi modificano solo la direzione.

Non fanno muovere Terry.

---

# 6. Girare a destra e sinistra

<a id="6-girare-a-destra-e-sinistra"></a>

[🔙 Torna all'indice](#indice)

---

Per indicare quanto deve ruotare Terry usiamo i gradi.

Esempio:

```python
right(90)
```

significa:

"Ruota di 90 gradi verso destra."

---

Proviamo:

```python
clearscreen()
setup(800,500)

forward(100)
right(90)
forward(100)
```

---

Abbiamo creato una forma a L.

---

## 🐢 Terry consiglia

Gli angoli più importanti:

| Rotazione | Effetto        |
| --------- | -------------- |
| 90°       | quarto di giro |
| 180°      | mezzo giro     |
| 360°      | giro completo  |

---

# 7. La penna di Terry

<a id="7-la-penna-di-terry"></a>

[🔙 Torna all'indice](#indice)

---

Terry possiede una penna.

Quando si muove:

* penna abbassata → disegna;
* penna alzata → non disegna.

---

Per alzare la penna:

```python
penup()
```

---

Per abbassarla:

```python
pendown()
```

---

Esempio:

```python
clearscreen()
setup(800,500)

forward(100)

penup()

forward(100)

pendown()

forward(100)
```

---

Risultato:

Una linea con uno spazio centrale.

---

## 🐞 Bug ti avvisa

Errore frequente:

Dimenticare `pendown()`.

Se Terry non disegna più, controlla sempre la penna.

---

# 8. Controllare la velocità

<a id="8-controllare-la-velocità"></a>

[🔙 Torna all'indice](#indice)

---

Possiamo controllare quanto velocemente si muove Terry.

Usiamo:

```python
speed()
```

---

Esempio:

```python
speed(1)
```

movimento lento.

---

```python
speed(10)
```

movimento veloce.

---

Durante la creazione di animazioni questa funzione sarà molto importante.

---

# 9. Disegnare un percorso

<a id="9-disegnare-un-percorso"></a>

[🔙 Torna all'indice](#indice)

---

Ora uniamo più comandi.

Obiettivo:

Creare un percorso.

```python
clearscreen()
setup(800,500)

forward(100)
right(90)

forward(150)
left(90)

forward(100)
```

---

Terry ha seguito una piccola strada.

---

# 10. Analisi del codice

<a id="10-analisi-del-codice"></a>

[🔙 Torna all'indice](#indice)

---

Analizziamo:

```python
forward(100)
```

Terry avanza.

---

```python
right(90)
```

Terry ruota.

---

```python
left(90)
```

Terry cambia direzione opposta.

---

La programmazione funziona creando sequenze di istruzioni.

Un comando dopo l'altro.

---

# 11. Laboratorio guidato

<a id="11-laboratorio-guidato"></a>

[🔙 Torna all'indice](#indice)

---

## Esperimento 1

Modifica:

```python
right(90)
```

in:

```python
right(45)
```

Cosa cambia?

---

## Esperimento 2

Prova:

```python
left(180)
```

Prima di eseguire prova a immaginare il risultato.

---

## Esperimento 3

Crea un percorso formato da:

* tre linee;
* due curve;
* un ritorno.

---

# 12. Missione di Terry

<a id="12-missione-di-terry"></a>

[🔙 Torna all'indice](#indice)

---

## Missione: il percorso del robot

Terry deve raggiungere un tesoro.

Il percorso deve avere:

* una linea lunga;
* una curva;
* una linea corta;
* un ritorno.

Progetta prima il percorso su carta.

Poi trasformalo in comandi Python.

---

# 13. Mini progetto — Il robot esploratore

<a id="13-mini-progetto--il-robot-esploratore"></a>

[🔙 Torna all'indice](#indice)

---

## Obiettivo

Creare il primo percorso completo di Terry.

Il progetto deve contenere:

✅ almeno 5 movimenti

✅ almeno 2 rotazioni

✅ almeno un tratto senza disegno usando `penup()`

---

Esempio:

```python
clearscreen()
setup(800,500)

speed(5)

forward(120)

right(90)

forward(80)

penup()

forward(100)

pendown()

left(90)

forward(120)
```

---

Ora personalizza:

* lunghezze;
* direzioni;
* percorso.

---

# 14. Sfida pratica

<a id="14-sfida-pratica"></a>

[🔙 Torna all'indice](#indice)

---

## Sfida livello 🟡

Disegna una strada per Terry.

La strada deve avere:

* almeno 4 cambi di direzione;
* un tratto nascosto;
* un punto finale.

Poi aggiungi un commento:

```python
# Arrivo al tesoro
```

---

# 15. Quiz docente

<a id="15-quiz-docente"></a>

[🔙 Torna all'indice](#indice)

---

## Domanda 1

Quale comando fa avanzare Terry?

A) move()

B) forward()

C) go()

D) walk()

✅ Risposta corretta: B

---

## Domanda 2

Cosa indica il numero dentro:

```python
forward(100)
```

A) Il colore

B) La velocità

C) La distanza

D) La direzione

✅ Risposta corretta: C

---

## Domanda 3

Quale comando ruota Terry?

A) rotate()

B) turn()

C) right()

D) move()

✅ Risposta corretta: C

---

## Domanda 4

Cosa fa:

```python
penup()
```

A) Cambia colore

B) Alza la penna

C) Cancella il disegno

D) Chiude il programma

✅ Risposta corretta: B

---

## Domanda 5

Quale comando permette di disegnare di nuovo?

A) pendown()

B) draw()

C) start()

D) penon()

✅ Risposta corretta: A

---

# 16. Badge e punti esperienza

<a id="16-badge-e-punti-esperienza"></a>

[🔙 Torna all'indice](#indice)

---

Completando M3 ottieni:

🏆 **Badge: 🚶 Esploratore**

XP guadagnati:

⭐ 100 XP

Hai imparato a controllare Terry nello spazio.

---

# 17. Riepilogo finale

<a id="17-riepilogo-finale"></a>

[🔙 Torna all'indice](#indice)

---

In questo modulo hai imparato:

✅ muovere Terry

✅ usare `forward()`

✅ usare `backward()`

✅ cambiare direzione

✅ usare destra e sinistra

✅ controllare la penna

✅ controllare la velocità

✅ creare percorsi

---

## Checklist finale

Prima di passare a M3:

☐ So far avanzare Terry.

☐ So farla ruotare.

☐ So creare un percorso.

☐ So usare `penup()` e `pendown()`.

☐ Ho completato il progetto Robot Esploratore.

---

🚀 **Prossima missione: M4 — Disegnare figure geometriche**

Nel prossimo modulo Terry userà i suoi movimenti per costruire:

* quadrati;
* triangoli;
* poligoni;
* stelle.

Inizieremo a trasformare semplici movimenti in veri disegni.