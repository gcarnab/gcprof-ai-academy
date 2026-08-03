---
title: "PCL - M3 - Muovere la Turtle"
description: "Quiz di verifica finale sui concetti del Modulo 3: comandi di movimento, direzione, rotazione, gestione della penna e controllo della velocità."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
All'inizio del programma, qual è l'orientamento predefinito di Terry nello schermo?
- [ ] A) Guarda verso destra (Est).
- [x] B) Guarda verso l'alto (Nord).
- [ ] C) Guarda verso il basso (Sud).
- [ ] D) Non ha una direzione finché non si usano i comandi di rotazione.

# Q2
Che cos'è il numero inserito tra parentesi in un comando come `forward(150)`?
- [ ] A) Il numero di volte in cui il comando deve essere ripetuto.
- [ ] B) Il codice identificativo della tartaruga.
- [x] C) Un parametro, cioè un valore che specifica la distanza (in pixel) del movimento.
- [ ] D) La percentuale di velocità impostata per Terry.

# Q3
Se eseguiamo in sequenza i comandi `forward(200)` e `backward(200)`, che cosa fa Terry?
- [ ] A) Disegna un angolo retto di 200 pixel.
- [x] B) Avanza di 200 pixel e poi indietreggia lungo la stessa linea, ritornando al punto di partenza.
- [ ] C) Ruota di 180 gradi e avanza di altri 200 pixel.
- [ ] D) Cancella lo schermo e riposiziona la penna al centro.

# Q4
Qual è l'effetto di un comando di rotazione come `right(90)` o `left(45)`?
- [ ] A) Ruota Terry e la fa spostare subito in avanti di 90 o 45 pixel.
- [x] B) Cambia unicamente la direzione in cui guarda Terry, senza farla spostare nello spazio.
- [ ] C) Alza la penna dallo schermo per fare un salto.
- [ ] D) Aumenta la velocità di spostamento della tartaruga.

# Q5
Se vogliamo che Terry compia un "mezzo giro" invertendo esattamente la sua rotta, di quanti gradi dobbiamo farla ruotare?
- [ ] A) 90°
- [x] B) 180°
- [ ] C) 360°
- [ ] D) 45°

# Q6
A che cosa servono i comandi `penup()` e `pendown()`?
- [ ] A) A cambiare la dimensione del foglio da disegno.
- [x] B) Ad alzare e abbassare la penna, scegliendo se tracciare o meno la linea mentre Terry si muove.
- [ ] C) A salvare e cancellare il codice Python eseguito.
- [ ] D) A modificare la direzione di marcia avanti e indietro.

# Q7
Come funziona il controllo della velocità tramite il comando `speed()`?
- [ ] A) Accetta solo parole come `speed("fast")` o `speed("slow")`.
- [x] B) Accetta parametri numerici, dove valori bassi (es. 1) indicano movimento lento e valori alti (es. 10) movimento veloce.
- [ ] C) Aumenta la lunghezza delle linee tracciate da Terry.
- [ ] D) Serve a misurare il tempo impiegato dal computer per eseguire il programma.

# Q8
Terry esegue i comandi di movimento (`forward`, `right`, ecc.) ma sullo schermo non appare alcuna linea. Qual è l'errore o bug più probabile?
- [ ] A) È stato usato `forward()` con parametri troppo grandi.
- [ ] B) Non è stata installata la libreria `ColabTurtlePlus`.
- [x] C) La penna è stata alzata con `penup()` e ci si è dimenticati di riabbassarla con `pendown()`.
- [ ] D) La velocità è stata impostata su `speed(1)`.

# OPEN
Spiega la differenza tra i comandi che modificano la posizione/direzione di Terry (come `forward` e `right`) e i comandi che ne gestiscono lo stato della penna (`penup` e `pendown`). Scrivi poi una semplice sequenza di comandi Python per far tracciare a Terry un tratto continuo, uno spazio vuoto e un secondo tratto continuo.