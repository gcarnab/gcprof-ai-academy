---
title: "Python - M3 - Stringhe: Manipolazione e Formattazione del Testo"
description: "Quiz di verifica finale sui concetti chiave del Modulo 3: creazione e concatenazione di stringhe, indicizzazione, slicing, metodi principali delle stringhe, f-string, stringhe multilinea e caratteri di escape, errori comuni legati all'immutabilità."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa fa l'operatore `+` quando è applicato a due stringhe, ad esempio `"Ciao" + "Mondo"`?
- [ ] A) Somma il numero di caratteri delle due stringhe.
- [x] B) Concatena (unisce) le due stringhe in una nuova stringa.
- [ ] C) Genera sempre un errore, perché `+` funziona solo con i numeri.
- [ ] D) Confronta le due stringhe carattere per carattere.

# Q2
Dato `parola = "PYTHON"`, da quale indice parte il conteggio dei caratteri in Python?
- [ ] A) Da 1, come nel linguaggio comune.
- [x] B) Da 0.
- [ ] C) Da -1.
- [ ] D) Dipende dalla lunghezza della stringa.

# Q3
Dato `testo = "PROGRAMMAZIONE"`, cosa restituisce `testo[0:4]`?
- [x] A) `'PROG'`
- [ ] B) `'PROGR'`
- [ ] C) `'ROGR'`
- [ ] D) Un errore, perché manca il terzo parametro dello slicing.

# Q4
Quale metodo delle stringhe divide un testo in una lista di sottostringhe, in base a un separatore indicato?
- [ ] A) `.join()`
- [ ] B) `.replace()`
- [x] C) `.split()`
- [ ] D) `.strip()`

# Q5
Qual è la sintassi corretta per creare una f-string che inserisce il valore della variabile `nome` in un messaggio?
- [ ] A) `print("Ciao {nome}")`
- [x] B) `print(f"Ciao {nome}")`
- [ ] C) `print(f"Ciao (nome)")`
- [ ] D) `print("Ciao" + f"{nome}")`

# Q6
Cosa rappresenta la sequenza di escape `\n` all'interno di una stringa Python?
- [ ] A) Un carattere di tabulazione.
- [x] B) Un a capo (nuova riga).
- [ ] C) Una virgoletta doppia letterale.
- [ ] D) Un backslash letterale.

# Q7
Perché eseguire `parola[0] = "C"` su una stringa genera un `TypeError` in Python?
- [ ] A) Perché `parola` non è stata dichiarata come stringa.
- [ ] B) Perché l'indice `0` non esiste mai in una stringa.
- [x] C) Perché le stringhe in Python sono immutabili: non si può modificare un carattere direttamente.
- [ ] D) Perché `"C"` non è un carattere valido in Python.

# Q8
Dato `frase = "Ciao Mondo"`, cosa restituisce `frase[::-1]`?
- [ ] A) `'Ciao Mondo'` (invariata)
- [x] B) `'odnoM oaiC'` (la stringa invertita)
- [ ] C) Un errore, perché lo slicing non accetta valori negativi come passo.
- [ ] D) `'CM'`

# OPEN
Spiega con parole tue cosa significa che le stringhe in Python sono "immutabili", facendo un esempio pratico di un'operazione che sembra "modificare" una stringa ma in realtà ne crea una nuova. Racconta poi, con un esempio concreto legato a un contesto reale (es. pulizia di un nome utente, di un indirizzo email, o di un dato inserito da un modulo online), a cosa servono in pratica i metodi `.strip()` e `.lower()` usati insieme.