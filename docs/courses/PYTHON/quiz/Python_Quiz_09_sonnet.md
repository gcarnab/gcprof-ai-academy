---
title: "Python - M9 - Funzioni: Riutilizzo del Codice e Scope delle Variabili"
description: "Quiz di verifica finale sui concetti chiave del Modulo 9: definizione di funzioni con def, parametri posizionali/nominali/di default, return e funzioni senza return, scope locale e globale, *args e **kwargs, docstring."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa succede se una funzione viene definita con `def saluta(): ...` ma non viene mai chiamata nel programma?
- [ ] A) Python genera automaticamente un errore, perché ogni funzione deve essere chiamata almeno una volta.
- [x] B) Il codice al suo interno non viene mai eseguito.
- [ ] C) Il codice al suo interno viene eseguito automaticamente, una sola volta, all'avvio del programma.
- [ ] D) La funzione viene eliminata automaticamente dalla memoria.

# Q2
Cosa distingue un parametro passato "per nome" (nominale) da uno passato "per posizione"?
- [x] A) Con gli argomenti nominali, l'ordine con cui vengono passati non conta; con quelli posizionali, sì.
- [ ] B) Gli argomenti nominali sono sempre obbligatori, quelli posizionali no.
- [ ] C) Non c'è alcuna differenza pratica tra i due.
- [ ] D) Gli argomenti posizionali funzionano solo con i numeri.

# Q3
Dove va posizionato, nella definizione di una funzione, un parametro con valore di default rispetto a uno senza?
- [ ] A) Sempre prima dei parametri senza valore di default.
- [x] B) Sempre dopo i parametri senza valore di default.
- [ ] C) La posizione non ha alcuna importanza in Python.
- [ ] D) I parametri con valore di default non possono coesistere con altri parametri.

# Q4
Qual è la differenza principale tra `print()` e `return` in una funzione?
- [ ] A) Sono completamente equivalenti.
- [x] B) `print()` mostra un valore a schermo senza renderlo riutilizzabile; `return` restituisce un valore che può essere salvato in una variabile e riutilizzato altrove.
- [ ] C) `return` mostra sempre un valore a schermo, `print()` lo restituisce alla chiamata della funzione.
- [ ] D) `print()` può essere usato solo all'esterno delle funzioni.

# Q5
Cosa restituisce una funzione Python che non contiene alcuna istruzione `return`?
- [ ] A) Un errore di sintassi al momento della chiamata.
- [ ] B) Il valore `0`.
- [x] C) `None`.
- [ ] D) L'ultimo valore stampato con `print()` al suo interno.

# Q6
Una variabile definita all'interno di una funzione (scope locale) è visibile:
- [ ] A) In tutto il programma, comprese le altre funzioni.
- [x] B) Solo all'interno della funzione in cui è stata definita.
- [ ] C) Solo nelle funzioni definite successivamente nel codice.
- [ ] D) Mai, nemmeno all'interno della funzione stessa.

# Q7
Cosa raccoglie `*args` in una definizione di funzione come `def somma_tutti(*numeri):`?
- [ ] A) Un numero qualsiasi di argomenti nominali, in un dizionario.
- [x] B) Un numero qualsiasi di argomenti posizionali, in una tupla.
- [ ] C) Un unico argomento obbligatorio.
- [ ] D) Solo argomenti di tipo booleano.

# Q8
A cosa serve, principalmente, una docstring inserita subito dopo la riga `def` di una funzione?
- [ ] A) A rendere la funzione eseguibile più velocemente.
- [x] B) A documentare cosa fa la funzione, quali parametri accetta e cosa restituisce, in modo consultabile anche con `help()`.
- [ ] C) A sostituire completamente la necessità di `return`.
- [ ] D) A impedire che la funzione venga chiamata più di una volta.

# OPEN
Scrivi, con parole tue, un esempio di funzione utile in un contesto reale legato al tuo indirizzo di studio (ad esempio un calcolo finanziario, una conversione di unità di misura, o un'elaborazione di dati testuali), spiegando quali parametri riceverebbe e cosa restituirebbe con `return`. Spiega inoltre perché, secondo te, usare `return` invece di un semplice `print()` rende quella funzione più utile all'interno di un programma più grande.