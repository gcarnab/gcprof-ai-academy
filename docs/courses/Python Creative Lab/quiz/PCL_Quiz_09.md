---
title: "PCL - M9 - Coordinate"
description: "Quiz di verifica sui concetti del Modulo 9: il piano cartesiano, il comando goto(x, y), penup()/pendown(), xcor()/ycor() e il mini progetto della Costellazione."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cos'è il Piano Cartesiano e da quali due elementi principali è formato secondo il modulo?
- [ ] A) È una funzione di Python che serve a colorare lo sfondo dello schermo.
- [x] B) È la griglia invisibile su cui si muove Terry, formata dall'Asse X (orizzontale) e dall'Asse Y (verticale), che si incrociano nel Centro (0, 0).
- [ ] C) È il nome del linguaggio grafico usato al posto di `turtle`.
- [ ] D) È un errore che si verifica quando Terry esce dai bordi dello schermo.

# Q2
Se un punto ha coordinate (-150, 100), in quale quadrante dello schermo si trova?
- [ ] A) In basso a destra, perché la X è positiva.
- [x] B) In alto a sinistra, perché la X è negativa e la Y è positiva.
- [ ] C) Esattamente al centro dello schermo.
- [ ] D) In basso a sinistra, perché entrambi i valori sono negativi.

# Q3
Qual è la differenza principale tra il comando `forward(50)` e il comando `goto(50, 0)`?
- [ ] A) Sono comandi identici, cambia solo il nome.
- [x] B) `forward(50)` muove Terry di 50 passi nella direzione verso cui è girata, mentre `goto(50, 0)` la sposta esattamente in quel punto del piano, indipendentemente da come è girata.
- [ ] C) `goto()` funziona solo se la penna è sollevata con `penup()`.
- [ ] D) `forward()` può essere usato solo dopo aver chiamato `home()`.

# Q4
A cosa serve il comando `home()` visto nel modulo?
- [ ] A) A cancellare tutto il disegno fatto fino a quel momento.
- [ ] B) A salvare il programma su file.
- [x] C) A riportare Terry alle coordinate (0, 0), facendola tornare a guardare verso destra.
- [ ] D) A impostare lo sfondo su un colore predefinito.

# Q5
Perché è utile usare `penup()` prima di uno spostamento con `goto()` e poi richiamare `pendown()`?
- [ ] A) Perché senza `penup()` il comando `goto()` non funziona affatto.
- [x] B) Perché così Terry si può spostare in un'altra zona dello schermo senza lasciare una linea indesiderata lungo il tragitto.
- [ ] C) Perché `penup()` aumenta la velocità di Terry durante il movimento.
- [ ] D) Perché `pendown()` cambia automaticamente il colore della penna.

# Q6
Quali comandi permettono di conoscere, rispettivamente, la posizione orizzontale e verticale attuale di Terry?
- [ ] A) `getx()` e `gety()`
- [ ] B) `posx()` e `posy()`
- [x] C) `xcor()` e `ycor()`
- [ ] D) `findx()` e `findy()`

# Q7
Cosa fa esattamente il comando `sety(150)`?
- [ ] A) Sposta Terry orizzontalmente fino a X = 150, senza cambiare la Y.
- [x] B) Sposta Terry verticalmente fino a Y = 150, mantenendo invariata la X attuale.
- [ ] C) Ruota Terry di 150 gradi rispetto alla sua direzione attuale.
- [ ] D) Imposta la dimensione della penna a 150 pixel.

# Q8
Nel Mini Progetto della Costellazione, a cosa serve la sequenza di chiamate a `goto()` verso le coordinate delle varie stelle?
- [ ] A) A far cambiare colore alla penna ad ogni stella raggiunta.
- [x] B) A tracciare linee dritte da un punto preciso all'altro del piano cartesiano, unendo i puntini per disegnare la forma della costellazione.
- [ ] C) A far ruotare Terry di 360 gradi su ogni stella.
- [ ] D) A nascondere Terry (`hideturtle()`) dopo ogni spostamento.

# OPEN
Spiega con parole tue cos'è il piano cartesiano e come si usano le coordinate X e Y per posizionare Terry, la differenza tra muoversi con `forward()`/`left()`/`right()` e muoversi con `goto()`, e perché sono utili i comandi `penup()`, `pendown()`, `xcor()` e `ycor()` per creare disegni precisi come quello della Costellazione.