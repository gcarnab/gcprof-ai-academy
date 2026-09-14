---
title: "Python - M6 - Cicli: while, for, range() ed enumerate()"
description: "Quiz di verifica finale sui concetti chiave del Modulo 6: il ciclo while e il rischio dei cicli infiniti, break e continue, il ciclo for, la funzione range() con i suoi parametri, for su stringhe, enumerate(), cicli annidati."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa distingue un ciclo `while` da un ciclo `for`, secondo quanto spiegato nel modulo?
- [ ] A) `while` può essere usato solo con i numeri, `for` solo con le stringhe.
- [x] B) `while` ripete finché una condizione resta vera (utile quando non si sa in anticipo quante ripetizioni serviranno), `for` scorre gli elementi di una sequenza nota.
- [ ] C) Sono completamente equivalenti e intercambiabili in ogni situazione.
- [ ] D) `for` può generare cicli infiniti, `while` no.

# Q2
Cosa causa, tipicamente, un ciclo `while` infinito?
- [ ] A) L'uso della funzione `print()` dentro il ciclo.
- [ ] B) L'assenza del blocco `else`.
- [x] C) L'assenza, dentro il ciclo, di un'istruzione che prima o poi renda falsa la condizione controllata.
- [ ] D) L'uso dell'operatore `<=` invece di `<`.

# Q3
Qual è la differenza tra `break` e `continue` in un ciclo?
- [ ] A) Sono sinonimi: fanno esattamente la stessa cosa.
- [x] B) `break` interrompe completamente il ciclo, `continue` salta solo l'iterazione corrente e prosegue con la successiva.
- [ ] C) `continue` interrompe completamente il ciclo, `break` salta solo l'iterazione corrente.
- [ ] D) `break` funziona solo con `for`, `continue` solo con `while`.

# Q4
Quali numeri genera l'istruzione `range(3, 12, 3)`?
- [ ] A) `3, 6, 9, 12`
- [x] B) `3, 6, 9`
- [ ] C) `3, 4, 5, ..., 11`
- [ ] D) `12, 9, 6, 3`

# Q5
Cosa succede quando un ciclo `for` scorre direttamente una stringa, ad esempio `for lettera in "CIAO":`?
- [ ] A) Genera un errore, perché `for` funziona solo con `range()`.
- [x] B) La variabile `lettera` assume, a ogni ripetizione, un singolo carattere della stringa, nell'ordine in cui compaiono.
- [ ] C) La variabile `lettera` assume l'intera stringa in un'unica ripetizione.
- [ ] D) Il ciclo viene eseguito esattamente una volta, indipendentemente dalla lunghezza della stringa.

# Q6
Cosa restituisce `enumerate(materie)`, dove `materie` è una lista di stringhe?
- [ ] A) Solo gli indici degli elementi della lista.
- [ ] B) Solo i valori degli elementi della lista.
- [x] C) Coppie (indice, valore) per ogni elemento della lista.
- [ ] D) La lunghezza totale della lista.

# Q7
Perché, secondo la best practice vista nel modulo, `enumerate(materie)` è generalmente preferibile a `range(len(materie))` quando serve conoscere anche la posizione di ogni elemento?
- [x] A) Perché restituisce direttamente indice e valore insieme, rendendo il codice più leggibile e meno soggetto a errori.
- [ ] B) Perché è l'unico modo per accedere agli elementi di una lista.
- [ ] C) Perché `range(len(...))` non funziona con le liste di stringhe.
- [ ] D) Perché è più veloce nell'esecuzione dei calcoli aritmetici.

# Q8
Dato il seguente ciclo annidato:
```python
for riga in range(1, 3):
    for colonna in range(1, 3):
        print(f"{riga}-{colonna}", end=" ")
```
Quante volte viene eseguita l'istruzione `print()` in totale?
- [ ] A) 2 volte
- [ ] B) 3 volte
- [x] C) 4 volte
- [ ] D) 6 volte

# OPEN
Descrivi, con parole tue, una situazione pratica (anche legata al tuo indirizzo di studio, ad esempio un elenco di clienti, prodotti, o Paesi) in cui useresti un ciclo `for` con `enumerate()` invece di un ciclo `while`. Spiega perché, in quel caso specifico, il ciclo `for` è la scelta più adatta.