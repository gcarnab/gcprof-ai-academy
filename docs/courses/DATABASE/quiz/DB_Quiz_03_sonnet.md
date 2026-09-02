---
title: "DB - M3 - Progettare un Database Relazionale"
description: "Quiz di verifica finale sui concetti chiave del Modulo 3: DBMS, linguaggio SQL, libreria sqlite3, connessione e cursore, CREATE TABLE e vincoli di integrità (PRIMARY KEY, AUTOINCREMENT, NOT NULL, UNIQUE)."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Che cos'è un DBMS (Database Management System)?
- [ ] A) Un linguaggio di programmazione alternativo a Python.
- [x] B) Un software specializzato nella creazione, gestione e interrogazione di database.
- [ ] C) Un tipo particolare di file CSV.
- [ ] D) Una libreria per creare interfacce grafiche.

# Q2
Quale sottolinguaggio SQL si occupa di definire la struttura di una tabella, ad esempio con `CREATE TABLE`?
- [ ] A) DML
- [ ] B) DQL
- [x] C) DDL
- [ ] D) DCL

# Q3
Vero o Falso: SQLite richiede l'installazione di un server dedicato per poter funzionare.
- [ ] A) Vero, senza server SQLite non può salvare alcun dato.
- [x] B) Falso, SQLite salva l'intero database in un singolo file e non richiede alcun server.
- [ ] C) Vero, ma solo per database con più di una tabella.
- [ ] D) Falso, ma solo se si utilizza Google Colab.

# Q4
Qual è la differenza corretta tra connessione e cursore in `sqlite3`?
- [ ] A) Sono due nomi diversi per lo stesso identico oggetto.
- [x] B) La connessione rappresenta il collegamento aperto verso il file di database, il cursore esegue i comandi SQL attraverso di essa.
- [ ] C) Il cursore rappresenta il collegamento al database, la connessione esegue i comandi SQL.
- [ ] D) La connessione serve solo per leggere dati, il cursore solo per scriverli.

# Q5
Quale vincolo garantisce che ogni record di una tabella abbia un identificativo univoco?
- [ ] A) `NOT NULL`
- [ ] B) `UNIQUE`
- [x] C) `PRIMARY KEY`
- [ ] D) `TEXT`

# Q6
Che cosa fa l'opzione `AUTOINCREMENT`, se aggiunta a una chiave primaria di tipo `INTEGER`?
- [ ] A) Impedisce che il campo venga lasciato vuoto.
- [x] B) Genera automaticamente un identificativo numerico crescente a ogni nuovo inserimento.
- [ ] C) Impedisce che due record abbiano lo stesso valore in quel campo.
- [ ] D) Converte automaticamente il campo da testo a numero.

# Q7
Qual è la differenza principale tra i vincoli `NOT NULL` e `UNIQUE`?
- [ ] A) Sono due modi diversi per scrivere lo stesso identico vincolo.
- [x] B) `NOT NULL` impedisce che un campo resti vuoto, `UNIQUE` impedisce che il suo valore si ripeta in due record diversi.
- [ ] C) `NOT NULL` si applica solo ai numeri, `UNIQUE` solo al testo.
- [ ] D) `UNIQUE` può essere usato solo insieme a `PRIMARY KEY`.

# Q8
Quale metodo del cursore si usa per inviare un comando SQL (come `CREATE TABLE`) al database?
- [ ] A) `run()`
- [ ] B) `send()`
- [x] C) `execute()`
- [ ] D) `query()`

# OPEN
Spiega con parole tue perché un database relazionale progettato con vincoli di integrità (chiave primaria, `NOT NULL`, `UNIQUE`) sia più affidabile rispetto a un semplice file CSV o Google Sheet visti nella Fase 1. Porta un esempio concreto (a scuola, in azienda o nel marketing) di un errore che questi vincoli permettono di evitare, e indica anche un limite o uno svantaggio nell'introdurre vincoli troppo rigidi su una tabella.