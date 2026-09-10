---
title: "OOP - M8 - Metodi Speciali: Personalizzare il Comportamento degli Oggetti"
description: "Quiz di verifica finale sui concetti chiave del Modulo 8: il problema degli oggetti illeggibili e non confrontabili di default, i metodi speciali (dunder), __str__ e __repr__, __eq__ e la differenza con is, __len__, __add__ e l'operator overloading, i corrispettivi in Java (toString, equals) e i limiti dell'overloading in Java."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa restituisce, di default, `print(oggetto)` per un oggetto di una classe che non definisce alcun metodo speciale?
- [ ] A) Il valore del primo attributo dell'oggetto.
- [x] B) Una rappresentazione generica e poco leggibile, tipicamente un indirizzo di memoria (es. `<__main__.Studente object at 0x...>`).
- [ ] C) Sempre e solo il testo `"None"`.
- [ ] D) Un errore, perché la stampa richiede sempre `__str__`.

# Q2
Cosa sono i "metodi speciali" (dunder methods) in Python?
- [ ] A) Metodi accessibili solo dalle sottoclassi tramite `super()`.
- [x] B) Metodi chiamati automaticamente da Python in risposta a operazioni built-in come `print()`, `==`, `len()` o `+`.
- [ ] C) Un sinonimo di attributo privato con doppio underscore.
- [ ] D) Metodi che possono essere definiti solo nel costruttore.

# Q3
Qual è la differenza tra `__str__` e `__repr__`, secondo il modulo?
- [ ] A) Sono identici: definirne uno equivale a definire anche l'altro.
- [x] B) `__str__` fornisce una rappresentazione leggibile per l'utente (usata da `print()`); `__repr__` una rappresentazione più tecnica, utile per il debug.
- [ ] C) `__repr__` non può essere usato insieme a `__eq__` nella stessa classe.
- [ ] D) `__str__` funziona solo su numeri, `__repr__` solo su stringhe.

# Q4
Dopo aver definito `__eq__` in una classe `Studente` basandolo sulla matricola, cosa restituisce ancora `studente1 is studente2` se le matricole sono uguali ma sono due oggetti creati separatamente?
- [ ] A) Sempre `True`, perché `is` ora si comporta come `==`.
- [x] B) `False`: `is` continua a verificare l'identità in memoria, un controllo indipendente da `__eq__`.
- [ ] C) Un errore, perché `is` non può essere usato dopo aver definito `__eq__`.
- [ ] D) Dipende dal valore restituito da `__str__`.

# Q5
A cosa serve definire `__len__` in una classe come `Playlist`?
- [ ] A) A impedire che la classe abbia più di un attributo.
- [x] B) A permettere di usare la funzione built-in `len()` direttamente sull'oggetto, restituendo un numero intero significativo (es. il numero di canzoni).
- [ ] C) A contare automaticamente quante volte l'oggetto è stato stampato.
- [ ] D) A definire la lunghezza massima del nome della classe.

# Q6
Cosa dovrebbe fare, correttamente, il metodo `__add__` definito per la classe `Vettore2D` nell'Esempio 8.5?
- [ ] A) Modificare direttamente gli attributi di `self`, sommando i valori dell'altro oggetto.
- [x] B) Restituire un nuovo oggetto `Vettore2D` con il risultato della somma, senza modificare gli oggetti originali.
- [ ] C) Stampare il risultato della somma invece di restituirlo.
- [ ] D) Funzionare solo se i due vettori hanno esattamente gli stessi valori.

# Q7
Qual è l'equivalente Java di `__str__`, secondo il Capitolo 7?
- [ ] A) `equals()`
- [x] B) `toString()`
- [ ] C) `hashCode()`
- [ ] D) `main()`

# Q8
Secondo il confronto Python↔Java del Capitolo 7, cosa NON è possibile fare in Java, a differenza di Python?
- [ ] A) Confrontare due oggetti in base ai loro dati (esiste `equals()`).
- [ ] B) Fornire una rappresentazione testuale personalizzata di un oggetto (esiste `toString()`).
- [x] C) Ridefinire il comportamento dell'operatore `+` per le proprie classi (l'operator overloading matematico non è permesso).
- [ ] D) Definire un costruttore personalizzato.

# OPEN
Riprendi la classe `Portafoglio` del Laboratorio di questo modulo (o descrivine una analoga a tua scelta) e spiega con parole tue: perché definire `__eq__` basandosi solo sul saldo può essere una scelta discutibile in un contesto reale (pensa a cosa succederebbe confrontando due portafogli di persone diverse con lo stesso saldo), e cosa dovrebbe restituire `__add__` per rispettare il comportamento "naturale" dell'operatore `+`.