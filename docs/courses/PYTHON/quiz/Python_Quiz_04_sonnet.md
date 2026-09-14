---
title: "Python - M4 - Input, Output e Conversioni di Tipo"
description: "Quiz di verifica finale sui concetti chiave del Modulo 4: la funzione input() e il tipo di dato che restituisce, conversioni esplicite dell'input, i parametri sep ed end di print(), il flusso input-elaborazione-output, un primo controllo di validazione con isdigit(), errori comuni."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa fa esattamente l'istruzione `nome = input("Come ti chiami? ")`?
- [ ] A) Stampa a schermo il testo "Come ti chiami?" e termina subito il programma.
- [x] B) Mostra il messaggio "Come ti chiami?", mette in pausa il programma finché l'utente non scrive e preme Invio, poi salva il valore digitato in `nome`.
- [ ] C) Crea una variabile `nome` vuota, senza chiedere nulla all'utente.
- [ ] D) Esegue automaticamente una conversione a numero intero del valore digitato.

# Q2
Se l'utente, alla richiesta `input("Quanti anni hai? ")`, digita `17`, che tipo avrà il valore restituito?
- [ ] A) `int`
- [x] B) `str`
- [ ] C) `float`
- [ ] D) `bool`

# Q3
Qual è il modo corretto per leggere un prezzo decimale da tastiera e salvarlo già come numero nella variabile `prezzo`?
- [ ] A) `prezzo = input("Prezzo: ")`
- [ ] B) `prezzo = str(input("Prezzo: "))`
- [x] C) `prezzo = float(input("Prezzo: "))`
- [ ] D) `float(prezzo) = input("Prezzo: ")`

# Q4
Cosa controlla il parametro `sep` della funzione `print()`?
- [x] A) Il carattere usato per separare più valori passati a `print()` nella stessa chiamata.
- [ ] B) Cosa viene stampato dopo l'ultimo valore, al posto dell'a capo.
- [ ] C) Il numero massimo di valori che si possono stampare.
- [ ] D) Se `print()` deve andare a capo oppure no.

# Q5
Qual è l'effetto di `print("Caricamento", end="")` seguito da `print("completato")`?
- [ ] A) Le due stringhe vengono stampate su due righe separate, come di consueto.
- [x] B) Le due stringhe vengono stampate sulla stessa riga, una di seguito all'altra, senza andare a capo tra la prima e la seconda.
- [ ] C) Viene generato un errore, perché `end` non può essere vuoto.
- [ ] D) Solo la seconda stringa viene effettivamente stampata.

# Q6
Qual è il flusso tipico di un programma interattivo, come descritto nel modulo?
- [ ] A) Output → Input → Elaborazione
- [x] B) Input → Elaborazione → Output
- [ ] C) Elaborazione → Output → Input
- [ ] D) Non esiste un ordine consigliato: è indifferente.

# Q7
Cosa restituisce `"abc".isdigit()`?
- [ ] A) `True`, perché è una stringa valida.
- [x] B) `False`, perché la stringa non è composta solo da cifre.
- [ ] C) Genera un errore, perché `.isdigit()` funziona solo sui numeri.
- [ ] D) Il numero di cifre presenti nella stringa.

# Q8
Cosa succede, tipicamente, se si scrive `input("Come ti chiami? ")` in una riga senza assegnarlo a nessuna variabile?
- [ ] A) Python genera automaticamente una variabile chiamata `input`.
- [ ] B) Il programma si blocca con un errore immediato.
- [x] C) Il valore digitato dall'utente viene letto ma va perso: non è possibile riutilizzarlo in seguito.
- [ ] D) Il valore digitato viene salvato automaticamente in una variabile chiamata `nome`.

# OPEN
Spiega con parole tue perché `input()` restituisce sempre una stringa, anche quando l'utente digita solo cifre, e quali problemi concreti può causare dimenticarsi di convertirla. Porta un esempio pratico (anche legato al tuo indirizzo di studio, ad esempio un calcolo con dati inseriti da un cliente o da un utente) in cui questa conversione è indispensabile per ottenere il risultato corretto.