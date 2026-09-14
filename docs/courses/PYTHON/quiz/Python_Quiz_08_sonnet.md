---
title: "Python - M8 - Dizionari e Set: Dati Chiave-Valore e Insiemi"
description: "Quiz di verifica finale sui concetti chiave del Modulo 8: creazione e accesso ai dizionari, .get() e KeyError, aggiornamento e rimozione di coppie chiave-valore, i metodi keys()/values()/items(), dizionari annidati, set ed eliminazione dei duplicati, operazioni tra insiemi."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la differenza principale tra un dizionario e una lista, secondo quanto visto nel modulo?
- [ ] A) I dizionari possono contenere solo numeri interi.
- [x] B) I dizionari associano i valori a chiavi descrittive, invece che a posizioni numeriche come nelle liste.
- [ ] C) Le liste non possono mai essere modificate dopo la creazione, i dizionari sì.
- [ ] D) Non esiste alcuna differenza pratica tra i due.

# Q2
Cosa succede eseguendo `studente["scuola"]` se la chiave `"scuola"` non esiste nel dizionario `studente`?
- [ ] A) Viene restituito automaticamente `None`.
- [x] B) Viene generato un `KeyError`.
- [ ] C) La chiave viene creata automaticamente con valore vuoto.
- [ ] D) Viene restituita la prima chiave del dizionario.

# Q3
Qual è il vantaggio principale di `studente.get("scuola", "N/D")` rispetto a `studente["scuola"]`?
- [x] A) Non genera un errore se la chiave non esiste: restituisce invece il valore di default indicato.
- [ ] B) È l'unico modo per leggere un valore da un dizionario.
- [ ] C) Modifica automaticamente il dizionario aggiungendo la chiave mancante.
- [ ] D) Funziona solo con chiavi numeriche.

# Q4
Quale metodo restituisce le coppie (chiave, valore) di un dizionario, pronte per essere scorse con un ciclo `for`?
- [ ] A) `.keys()`
- [ ] B) `.values()`
- [x] C) `.items()`
- [ ] D) `.pop()`

# Q5
Dato `anagrafica = {"marco": {"eta": 17}}`, come si accede correttamente all'età di Marco?
- [ ] A) `anagrafica["eta"]`
- [x] B) `anagrafica["marco"]["eta"]`
- [ ] C) `anagrafica["marco", "eta"]`
- [ ] D) `anagrafica[0]["eta"]`

# Q6
Cosa contiene il set risultante da `set([7, 8, 7, 9, 8, 6])`?
- [ ] A) Tutti gli elementi originali, inclusi i duplicati: `{7, 8, 7, 9, 8, 6}`.
- [x] B) Solo gli elementi unici, senza duplicati: `{6, 7, 8, 9}`.
- [ ] C) Un errore, perché `set()` non accetta liste come argomento.
- [ ] D) Un dizionario vuoto.

# Q7
Cosa crea, in Python, la scrittura `insieme = {}`?
- [x] A) Un dizionario vuoto, non un set vuoto.
- [ ] B) Un set vuoto.
- [ ] C) Una lista vuota.
- [ ] D) Un errore di sintassi.

# Q8
Dati `iscritti_python = {"Marco", "Giulia"}` e `iscritti_web = {"Giulia", "Sara"}`, cosa restituisce `iscritti_python & iscritti_web`?
- [ ] A) `{"Marco", "Giulia", "Sara"}` (unione di tutti gli elementi)
- [x] B) `{"Giulia"}` (solo gli elementi presenti in entrambi i set)
- [ ] C) `{"Marco"}` (solo gli elementi presenti nel primo set ma non nel secondo)
- [ ] D) Un errore, perché `&` non è un operatore valido tra set

# OPEN
Descrivi, con parole tue, un esempio concreto (anche legato al tuo indirizzo di studio, ad esempio un'anagrafica clienti, un catalogo prodotti o un elenco di partecipanti a due eventi diversi) in cui useresti un dizionario invece di una lista, e uno in cui useresti un set invece di una lista. Spiega, per ciascuno dei due casi, perché quella struttura dati è la scelta più adatta rispetto alle altre viste nel corso.