---
title: "PCL - M10 - Condizioni"
description: "Quiz di verifica sui concetti del Modulo 10: l'istruzione if, gli operatori di confronto, else, elif e il mini progetto del Recinto Magico di Terry."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa fa l'istruzione `if` in Python e quale elemento è obbligatorio alla fine della riga della condizione?
- [ ] A) Ripete un blocco di codice all'infinito, e richiede una parentesi graffa finale.
- [x] B) Controlla se una condizione è vera o falsa ed esegue un blocco di codice solo se è vera; la riga deve terminare con i due punti `:`.
- [ ] C) Definisce una nuova funzione personalizzata, e richiede la parola chiave `def`.
- [ ] D) Chiede un input all'utente, e richiede le parentesi tonde vuote `()`.

# Q2
Cosa permette a Python di capire quali istruzioni fanno parte del blocco dell'`if` e quali invece vengono eseguite sempre?
- [ ] A) Le parentesi graffe `{ }` attorno al blocco di codice.
- [ ] B) La parola chiave `end if` scritta alla fine del blocco.
- [x] C) L'indentazione: le righe spostate a destra appartengono al blocco `if`, quelle non indentate vengono eseguite comunque.
- [ ] D) Il numero di riga in cui si trova l'istruzione.

# Q3
Qual è la differenza tra `=` e `==` in Python, e perché scrivere `if eta = 18:` genera un errore?
- [ ] A) Non c'è alcuna differenza, sono due modi equivalenti di scrivere la stessa cosa.
- [x] B) `=` serve ad assegnare un valore a una variabile, `==` serve a confrontare se due valori sono uguali; usando un solo `=` dentro un `if` Python non capisce se vuoi assegnare o confrontare, e genera un errore di sintassi.
- [ ] C) `=` si usa solo con i numeri, `==` solo con il testo.
- [ ] D) `==` serve ad assegnare un valore, `=` serve a confrontare due valori.

# Q4
A cosa serve l'istruzione `else` e in che rapporto sta con l'indentazione dell'`if` a cui appartiene?
- [ ] A) Serve a controllare una seconda condizione diversa dalla prima, indipendentemente dall'`if`.
- [x] B) Serve a eseguire un blocco di codice quando la condizione dell'`if` risulta falsa, e deve essere allineato esattamente sotto al suo `if`, con gli stessi due punti `:` finali.
- [ ] C) Serve a terminare definitivamente il programma se l'`if` è falso.
- [ ] D) Non richiede indentazione, a differenza del blocco dell'`if`.

# Q5
Cosa significa `elif` e quando conviene usarlo al posto di scrivere tanti `if` separati?
- [ ] A) Significa "End If" e serve a chiudere formalmente il blocco condizionale.
- [x] B) È l'abbreviazione di "else if" (altrimenti se) e permette di controllare più condizioni in sequenza, una dopo l'altra, tra il primo `if` e l'eventuale `else` finale.
- [ ] C) Significa "Error If" e serve a gestire gli errori del programma.
- [ ] D) È un sinonimo esatto di `else`, cambia solo il nome.

# Q6
In una struttura `if - elif - elif - else`, cosa succede appena Python trova la prima condizione vera lungo la catena?
- [ ] A) Esegue tutti i blocchi che risultano veri, uno dopo l'altro.
- [x] B) Esegue solo il blocco di codice corrispondente a quella condizione, e salta completamente il resto della struttura, senza controllare le condizioni successive.
- [ ] C) Esegue quel blocco e poi anche il blocco dell'`else` finale.
- [ ] D) Segnala un errore perché ha trovato più di una condizione vera.

# Q7
Nel Mini Progetto del Recinto Magico, a cosa serve la condizione `if x > 190 or x < -190:`?
- [ ] A) A far cambiare colore a Terry ogni volta che si muove.
- [x] B) A verificare se Terry ha toccato il bordo orizzontale destro oppure quello sinistro del recinto, per farla girare di 180 gradi e tornare indietro.
- [ ] C) A contare quanti passi ha fatto Terry fino a quel momento.
- [ ] D) A far fermare definitivamente il ciclo `for` non appena Terry tocca un bordo.

# Q8
Cosa stampa questo codice?
```python
x = 5
if x > 10:
    print("A")
else:
    print("B")
```
- [ ] A) `A`
- [x] B) `B`
- [ ] C) Sia `A` che `B`
- [ ] D) Nessun risultato, perché il codice genera un errore

# OPEN
Spiega con parole tue a cosa serve l'istruzione `if` in Python, quali sono i principali operatori di confronto (come `==`, `!=`, `>`, `<`), la differenza tra `else` ed `elif`, e come queste istruzioni condizionali sono state usate nel Mini Progetto del Recinto Magico per far rimbalzare Terry sui bordi.