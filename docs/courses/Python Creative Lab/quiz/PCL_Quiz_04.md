---
title: "PCL - M4 - Disegnare figure geometriche"
description: "Quiz di verifica sui concetti del Modulo 4: quadrato, rettangolo, triangolo, regola del 360° per i poligoni e stella."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Perché è un'ottima abitudine far eseguire a Terry l'ultima rotazione di 90° alla fine del disegno di un quadrato?
- [ ] A) Perché altrimenti il codice genera un errore di sintassi.
- [x] B) Per fare in modo che Terry si ritrovi orientata esattamente nella stessa direzione iniziale.
- [ ] C) Perché serve a cambiare automaticamente il colore del tratto.
- [ ] D) Per aumentare la velocità di esecuzione delle istruzioni successive.

# Q2
Come differiscono i comandi per disegnare un rettangolo rispetto a quelli di un quadrato?
- [ ] A) Nel rettangolo gli angoli di rotazione sono di 45 gradi anziché 90 gradi.
- [ ] B) Nel rettangolo si usano quattro lunghezze tutte diverse tra loro.
- [x] C) Nel rettangolo si alternano due lunghezze diverse per la base e l'altezza, mantenendo angoli di 90°.
- [ ] D) Non c'è alcuna differenza nei comandi, cambia solo il tempo di esecuzione.

# Q3
Qual è la causa dell'errore (o "bug") frequente quando si tenta di far tracciare a Terry un triangolo equilatero?
- [ ] A) Usare il comando `right()` anziché `left()`.
- [x] B) Far svoltare Terry dell'angolo interno (60°) invece che dell'angolo esterno di rotazione (120°).
- [ ] C) Dimenticare di impostare la dimensione della finestra di disegno.
- [ ] D) Usare valori di `forward()` diversi per ogni lato.

# Q4
Secondo la "regola del 360°" spiegata da Byte, come si calcola l'angolo di rotazione per un poligono regolare?
- [ ] A) Moltiplicando il numero dei lati per 180 gradi.
- [x] B) Dividendo 360 gradi per il numero totale dei lati.
- [ ] C) Sottraendo 90 gradi al numero dei lati.
- [ ] D) Dividendo il numero dei lati per 360 gradi.

# Q5
Se si vuole programmare Terry per tracciare un ottagono regolare (8 lati), quale valore di rotazione occorre inserire?
- [ ] A) 60 gradi
- [x] B) 45 gradi (360 diviso 8).
- [ ] C) 72 gradi
- [ ] D) 90 gradi

# Q6
Perché si utilizza un angolo di rotazione di 144° per disegnare una stella a 5 punte?
- [ ] A) Perché 144° corrisponde ad esattamente metà giro della tartaruga.
- [x] B) Perché fa sì che le linee saltino i vertici incrociandosi e compiano due giri completi (720°).
- [ ] C) Perché è l'unico angolo con cui la penna non si alza mai dal foglio.
- [ ] D) Perché equivale all'angolo interno di un triangolo rettangolo.

# Q7
Nel mini progetto delle bandiere, quale combinazione di comandi permette di posizionare la stella al centro del rettangolo senza lasciare traccia?
- [ ] A) Usare `speed(10)` e `clear()` prima di disegnare la stella.
- [ ] B) Usare `backward()` fino al punto desiderato.
- [x] C) Usare `penup()` per alzare la penna durante lo spostamento e `pendown()` per riprendere a disegnare.
- [ ] D) Usare il comando `right(180)` seguito da `setup()`.

# Q8
Quanti giri completi su se stessa esegue Terry per completare il disegno di una stella a 5 punte con angoli di 144°?
- [ ] A) 1 giro completo (360°)
- [x] B) 2 giri completi (720°).
- [ ] C) 3 giri completi (1080°)
- [ ] D) Mezzo giro (180°)

# OPEN
Spiega la differenza tra l'angolo interno di una figura geometrica e l'angolo esterno di rotazione della tartaruga, prendendo come esempio il triangolo equilatero. Descrivi poi come calcoleresti l'angolo di rotazione necessario per disegnare un decagono regolare (10 lati) applicando la "regola del 360°".