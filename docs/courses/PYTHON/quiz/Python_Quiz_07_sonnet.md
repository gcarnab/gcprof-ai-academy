---
title: "Python - M7 - Liste e Tuple: Collezioni Ordinate di Dati"
description: "Quiz di verifica finale sui concetti chiave del Modulo 7: creazione e mutabilità delle liste, indicizzazione e slicing, metodi delle liste (append, insert, remove, pop), differenza tra sort() e sorted(), liste annidate, tuple immutabili e criteri di scelta tra lista e tupla."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la differenza fondamentale tra una lista e una tupla in Python?
- [ ] A) Le liste possono contenere solo numeri, le tuple solo stringhe.
- [x] B) Le liste sono mutabili (si possono modificare dopo la creazione), le tuple sono immutabili.
- [ ] C) Le tuple possono contenere al massimo 3 elementi.
- [ ] D) Non c'è alcuna differenza pratica tra i due tipi.

# Q2
Dato `frutta = ["mela", "banana", "kiwi"]`, cosa succede eseguendo `frutta[0] = "ananas"`?
- [ ] A) Viene generato un `TypeError`, perché le liste sono immutabili come le stringhe.
- [x] B) Il primo elemento della lista viene sostituito con `"ananas"`, perché le liste sono mutabili.
- [ ] C) Viene creata una nuova lista, lasciando `frutta` invariata.
- [ ] D) Viene generato un `IndexError`, perché l'indice 0 non è valido.

# Q3
Quale metodo aggiunge un elemento in fondo a una lista esistente?
- [ ] A) `.insert()`
- [x] B) `.append()`
- [ ] C) `.remove()`
- [ ] D) `.pop()`

# Q4
Qual è la differenza principale tra `.remove(valore)` e `.pop(indice)` su una lista?
- [x] A) `.remove()` cerca e rimuove un valore specifico; `.pop()` rimuove (e restituisce) l'elemento a una posizione specifica.
- [ ] B) Sono due nomi diversi per la stessa identica operazione.
- [ ] C) `.remove()` funziona solo sui numeri, `.pop()` solo sulle stringhe.
- [ ] D) `.pop()` non modifica mai la lista originale, `.remove()` sì.

# Q5
Qual è la differenza tra `lista.sort()` e `sorted(lista)`?
- [ ] A) Sono identici in tutto e per tutto.
- [x] B) `.sort()` modifica la lista originale e non restituisce nulla; `sorted()` non la modifica e restituisce una nuova lista ordinata.
- [ ] C) `sorted()` modifica la lista originale, `.sort()` no.
- [ ] D) `.sort()` funziona solo con numeri, `sorted()` solo con stringhe.

# Q6
Dato `pagella = [["Marco", 7], ["Giulia", 9]]`, quale espressione restituisce correttamente il voto di Giulia (9)?
- [ ] A) `pagella[1]`
- [ ] B) `pagella["Giulia"]`
- [x] C) `pagella[1][1]`
- [ ] D) `pagella[0][1]`

# Q7
Perché `coordinate[0] = 0.0` genera un errore se `coordinate` è una tupla?
- [ ] A) Perché le tuple non possono contenere numeri decimali.
- [x] B) Perché le tuple sono immutabili: una volta create, i loro elementi non possono essere modificati.
- [ ] C) Perché l'indice 0 non è mai valido nelle tuple.
- [ ] D) Perché le tuple richiedono sempre le parentesi quadre, non tonde.

# Q8
Quale, tra le seguenti situazioni, è un caso in cui conviene scegliere una tupla invece di una lista, secondo i criteri visti nel modulo?
- [ ] A) Un carrello della spesa che l'utente riempie progressivamente durante la navigazione.
- [x] B) Le coordinate geografiche fisse di una città, che non devono mai cambiare.
- [ ] C) Un elenco di iscritti a un corso che può crescere nel tempo.
- [ ] D) Una lista di compiti da svolgere, che l'utente aggiorna ogni giorno.

# OPEN
Descrivi, con parole tue, un esempio concreto (anche legato al tuo indirizzo di studio) in cui useresti una lista di liste annidate per rappresentare dei dati reali. Spiega quali due indici useresti per accedere a un singolo valore all'interno della tua struttura, e perché, in quel caso, sceglieresti una lista piuttosto che una tupla.