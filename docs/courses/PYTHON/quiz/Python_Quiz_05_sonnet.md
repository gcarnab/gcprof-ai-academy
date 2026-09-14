---
title: "Python - M5 - Strutture di Controllo"
description: "Quiz di verifica finale sui concetti chiave del Modulo 5: il tipo bool, il costrutto if/else, elif e l'ordine di valutazione delle condizioni, gli operatori logici and/or/not, gli operatori di appartenenza e identità, le condizioni annidate e l'operatore ternario."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quali sono gli unici due valori che può assumere una variabile di tipo `bool` in Python?
- [ ] A) `"vero"` e `"falso"`
- [ ] B) `1` e `-1`
- [x] C) `True` e `False`
- [ ] D) `Yes` e `No`

# Q2
Come vengono delimitati, in Python, i blocchi di codice appartenenti a un `if`, un `elif` o un `else`?
- [ ] A) Con le parentesi tonde `( )`
- [ ] B) Con le parentesi graffe `{ }`
- [x] C) Con l'indentazione (tipicamente 4 spazi) delle righe successive ai due punti `:`
- [ ] D) Con la parola chiave `end if`

# Q3
Dato il codice `if voto >= 6: ... elif voto >= 9: ...` con `voto = 9`, quale blocco viene eseguito, e perché?
- [ ] A) Il blocco dell'`elif`, perché Python valuta sempre prima le condizioni più specifiche.
- [x] B) Il blocco dell'`if`, perché Python valuta le condizioni in ordine e si ferma alla prima che risulta vera.
- [ ] C) Entrambi i blocchi vengono eseguiti in sequenza.
- [ ] D) Nessun blocco, perché l'ordine delle condizioni genera un errore di sintassi.

# Q4
Quale operatore logico richiede che ENTRAMBE le condizioni siano vere perché l'espressione complessiva sia `True`?
- [ ] A) `or`
- [x] B) `and`
- [ ] C) `not`
- [ ] D) `in`

# Q5
Dato `eta = 70`, cosa restituisce l'espressione `eta >= 65 or eta <= 12`?
- [x] A) `True`, perché almeno una delle due condizioni è vera.
- [ ] B) `False`, perché entrambe le condizioni devono essere vere con `or`.
- [ ] C) Un errore, perché `or` non può essere usato tra due confronti numerici.
- [ ] D) `12`, il valore della seconda condizione.

# Q6
Qual è il modo corretto, secondo la best practice vista nel modulo, per verificare se una variabile `risultato` è `None`?
- [ ] A) `if risultato == None:`
- [x] B) `if risultato is None:`
- [ ] C) `if risultato in None:`
- [ ] D) `if not risultato:`, che è sempre equivalente in ogni caso

# Q7
Cosa verifica l'operatore `in`, applicato a una stringa, come in `"@" in email`?
- [ ] A) Se `email` inizia con il carattere `@`.
- [x] B) Se il carattere `@` è presente all'interno della stringa `email`.
- [ ] C) Se `email` è vuota.
- [ ] D) Quante volte compare `@` nella stringa.

# Q8
Qual è la sintassi corretta dell'operatore ternario per assegnare `"maggiorenne"` o `"minorenne"` alla variabile `stato` in base a `eta >= 18`?
- [ ] A) `stato = if eta >= 18: "maggiorenne" else "minorenne"`
- [x] B) `stato = "maggiorenne" if eta >= 18 else "minorenne"`
- [ ] C) `stato = eta >= 18 ? "maggiorenne" : "minorenne"`
- [ ] D) `stato = "maggiorenne" else "minorenne" if eta >= 18`

# OPEN
Scrivi, con parole tue, un esempio di situazione reale (anche legata al tuo indirizzo di studio) in cui useresti condizioni annidate (un `if` dentro un altro `if`) invece di un'unica condizione con `and`. Spiega perché, in quel caso specifico, le condizioni annidate risultano più chiare o più adatte rispetto a un'unica espressione logica combinata.