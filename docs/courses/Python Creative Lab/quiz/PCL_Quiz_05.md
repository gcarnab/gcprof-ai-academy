---
title: "PCL - M5 - Colori e riempimenti"
description: "Quiz di verifica finale sui concetti del Modulo 5: personalizzazione della tela, colori della penna, riempimento delle forme, velocità e sistema RGB."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quale comando permette di cambiare il colore dello sfondo dell'area di lavoro e come deve essere specificato il nome del colore?
- [ ] A) `background("blue")` senza virgolette.
- [x] B) `bgcolor("lightblue")`, inserendo il nome del colore sempre tra virgolette.
- [ ] C) `set_canvas("lightblue")` usando solo numeri.
- [ ] D) `color_bg(lightblue)` senza virgolette.

# Q2
Che cosa fa il comando `pensize(5)` e qual è lo spessore predefinito (default) della penna?
- [ ] A) Imposta la velocità a 5 e lo spessore di default è 0.
- [x] B) Imposta lo spessore della linea a 5 pixel, mentre lo spessore predefinito è 1 pixel.
- [ ] C) Disegna una linea lunga 5 pixel e lo spessore predefinito è 10.
- [ ] D) Modifica la trasparenza della penna con valore predefinito 5.

# Q3
Secondo Ada, che cosa rappresenta l'acronimo RGB utilizzato dagli schermi dei computer per creare i colori?
- [ ] A) Real Graphic Board.
- [x] B) Red, Green, Blue (Rosso, Verde, Blu).
- [ ] C) Round Grid Background.
- [ ] D) Red, Gray, Black.

# Q4
Qual è la procedura corretta per riempire di colore l'interno di una figura geometrica?
- [ ] A) Disegnare la figura e poi eseguire il comando `fill("color")`.
- [x] B) Invocare `begin_fill()`, tracciare le linee della figura chiusa e infine chiamare `end_fill()`.
- [ ] C) Usare `color()` prima di ogni singolo movimento senza mai chiudere la figura.
- [ ] D) Attivare `speed(0)` durante il disegno della forma.

# Q5
Qual è il rischio evidenziato da Bug se ci si dimentica di inserire il comando `end_fill()` alla fine di una forma?
- [ ] A) Il programma si interrompe immediatamente con un errore di sintassi.
- [ ] B) Lo sfondo dello schermo diventa nero.
- [x] C) Python non comprende dove termina la figura e non applica alcun colore di riempimento.
- [ ] D) La penna della tartaruga si spezza e non disegna più.

# Q6
Cosa succede quando si imposta la velocità di Terry con il comando `speed(0)`?
- [ ] A) Terry si ferma completamente e non esegue più alcun comando.
- [x] B) L'animazione del movimento viene rimossa e il disegno appare in modo istantaneo alla massima velocità.
- [ ] C) Terry si muove alla velocità più lenta possibile (rallentatore).
- [ ] D) Viene cancellato lo schermo di lavoro.

# Q7
Come si comportano i valori numerici compresi tra 1 e 10 nel comando `speed()`?
- [ ] A) 1 rappresenta la velocità massima e 10 la velocità minima.
- [x] B) 1 indica il movimento più lento, mentre 10 indica un movimento molto veloce.
- [ ] C) Indicano il numero di volte in cui la figura viene ripetuta.
- [ ] D) Modificano lo spessore della penna da 1 a 10 pixel.

# Q8
Quale comando speciale suggerisce Terry nella sfida finale per tracciare un cerchio perfetto?
- [ ] A) `round(50)`
- [ ] B) `draw_circle(50)`
- [x] C) `circle(50)`
- [ ] D) `shape("circle")`

# OPEN
Spiega come funziona il processo di riempimento di una figura geometrica in Python descrivendo il ruolo di `color()`, `begin_fill()` e `end_fill()`, specificando cosa accade se quest'ultimo viene omesso. Descrivi inoltre la differenza di comportamento della tartaruga tra l'uso di `speed(1)` e `speed(0)`.