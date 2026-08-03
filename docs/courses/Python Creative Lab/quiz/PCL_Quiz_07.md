---
title: "PCL - M7 - Input e Output"
description: "Quiz di verifica sui concetti del Modulo 7: output con print(), input dell'utente, conversione con int(), input visivo con textinput()/numinput() e il mini progetto del Disegnatore Interattivo."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Che cos'è l'Output in un programma e quale comando abbiamo imparato per generarlo a schermo?
- [ ] A) È l'informazione che l'utente digita sulla tastiera, generata con il comando `input()`.
- [x] B) È qualsiasi informazione che il computer mostra all'utente, generata con il comando `print()`.
- [ ] C) È un errore di sintassi che blocca l'esecuzione del programma.
- [ ] D) È il colore di sfondo del disegno di Terry, impostato con `bgcolor()`.

# Q2
Cosa succede esattamente quando Python, durante l'esecuzione, incontra il comando `input()`?
- [ ] A) Il programma si chiude immediatamente senza salvare nulla.
- [ ] B) Lo schermo si cancella e Terry torna alla posizione iniziale.
- [x] C) Il programma si mette in pausa e aspetta che l'utente scriva qualcosa e prema Invio.
- [ ] D) Python stampa automaticamente la parola "input" sullo schermo.

# Q3
Se eseguo `risposta = input("Quanti anni hai? ")` e l'utente digita `12`, che tipo di dato conterrà la variabile `risposta`?
- [ ] A) Un numero intero (Integer), pronto per essere usato nei calcoli.
- [x] B) Un testo (stringa), anche se l'utente ha digitato solo cifre.
- [ ] C) Un valore booleano (Vero/Falso).
- [ ] D) Un errore, perché `input()` accetta solo lettere.

# Q4
A cosa serve il comando `int()` e perché è fondamentale usarlo dopo un `input()` se vogliamo fare calcoli matematici?
- [ ] A) Serve a interrompere il programma in caso di errore di digitazione.
- [x] B) Serve a trasformare un testo numerico (es. `"10"`) in un vero numero intero, altrimenti Python non può sommarlo o moltiplicarlo.
- [ ] C) Serve a colorare di blu il testo stampato a schermo.
- [ ] D) Serve a chiedere automaticamente un secondo input all'utente.

# Q5
Qual è la scorciatoia mostrata da Bug per chiedere un numero all'utente e convertirlo subito, tutto in una sola riga di codice?
- [ ] A) `input(int("Inserisci un numero: "))`
- [x] B) `numero = int(input("Inserisci un numero: "))`
- [ ] C) `numero = input() + int()`
- [ ] D) `int + input("Inserisci un numero: ")`

# Q6
Lavorando con Terry la Tartaruga, qual è la differenza principale tra `textinput()` e `numinput()`?
- [ ] A) Sono comandi identici e intercambiabili, cambia solo il nome.
- [ ] B) `textinput()` funziona solo con i colori, `numinput()` solo con le lunghezze dei lati.
- [x] C) `textinput()` apre una finestrella per chiedere del testo, mentre `numinput()` ne apre una pensata per chiedere un numero, senza bisogno di `int()`.
- [ ] D) `numinput()` mette in pausa il programma, mentre `textinput()` no.

# Q7
Nel Mini Progetto "Disegnatore Interattivo", a cosa servono le tre richieste iniziali fatte con `textinput()` e `numinput()`?
- [ ] A) Servono solo a rallentare il programma prima di iniziare a disegnare.
- [x] B) Servono a raccogliere dall'utente il colore del bordo, il colore di riempimento e la grandezza, per poi usare quei valori nel disegno del triangolo.
- [ ] C) Servono a scegliere la velocità della tartaruga (`speed`).
- [ ] D) Servono a stampare un messaggio di errore se l'utente non risponde.

# Q8
Cosa mostrerebbe a schermo l'istruzione `print("4" + "4")`, sapendo che le due cifre sono racchiuse tra virgolette?
- [ ] A) `8`, perché Python somma automaticamente i numeri.
- [x] B) `44`, perché trattandosi di due testi (stringhe) il simbolo `+` li unisce invece di sommarli.
- [ ] C) Un messaggio di errore, perché non si possono usare i numeri tra virgolette.
- [ ] D) `"4" + "4"`, perché Python stampa il codice così come è scritto.

# OPEN
Spiega con parole tue la differenza tra Input e Output in Python, perché è necessario usare `int()` dopo un `input()` quando si vuole fare un calcolo, e descrivi come `textinput()` e `numinput()` permettono di creare disegni interattivi con Terry la Tartaruga.