---
title: "DB - M4 - Manipolare i Dati (DML)"
description: "Quiz di verifica finale sui concetti chiave del Modulo 4: ciclo di vita del dato, comandi INSERT, UPDATE e DELETE, query parametrizzate, SQL Injection, commit e transazioni."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Vero o Falso: il comando `INSERT` richiede sempre di specificare anche il valore del campo `PRIMARY KEY AUTOINCREMENT`.
- [ ] A) Vero, altrimenti il record non viene inserito.
- [x] B) Falso, quel valore viene generato automaticamente da SQLite e non va indicato.
- [ ] C) Vero, ma solo per la prima riga inserita nella tabella.
- [ ] D) Falso, ma solo se la tabella non ha vincoli.

# Q2
Quale comando SQL useresti per correggere l'importo di una spesa già registrata nel database?
- [ ] A) `INSERT`
- [x] B) `UPDATE`
- [ ] C) `DELETE`
- [ ] D) `CREATE`

# Q3
Vero o Falso: eseguire un `UPDATE` senza clausola `WHERE` modifica soltanto il primo record trovato nella tabella.
- [ ] A) Vero, SQLite si ferma automaticamente al primo record.
- [x] B) Falso, modifica tutti i record della tabella, senza eccezioni.
- [ ] C) Vero, ma solo se la tabella ha una chiave primaria.
- [ ] D) Falso, non modifica nessun record senza WHERE.

# Q4
Che cosa si usa, in una query SQL eseguita da Python, per evitare di concatenare direttamente i valori dentro la stringa?
- [ ] A) Il simbolo `%`.
- [x] B) Il segnaposto `?`, tipico delle query parametrizzate.
- [ ] C) Le parentesi quadre `[]`.
- [ ] D) Il comando `SAFE INSERT`.

# Q5
Che cos'è la SQL Injection?
- [ ] A) Un comando SQL per inserire più record contemporaneamente.
- [x] B) Una tecnica di attacco che inserisce codice SQL in un campo di input non protetto, per alterare il comportamento di una query.
- [ ] C) Un errore di sintassi comune nei comandi `INSERT`.
- [ ] D) Un tipo di vincolo di integrità applicato ai campi di testo.

# Q6
Vero o Falso: dopo aver eseguito `execute()` per un `INSERT`, la modifica è già salvata in modo permanente sul file di database.
- [ ] A) Vero, `execute()` salva sempre in automatico.
- [x] B) Falso, resta in sospeso in una transazione aperta finché non si chiama `commit()`.
- [ ] C) Vero, ma solo se si usa `executemany()`.
- [ ] D) Falso, serve chiudere e riaprire la connessione per salvarla.

# Q7
Qual è la differenza tra `DELETE FROM tabella` e `DROP TABLE tabella`?
- [ ] A) Sono due comandi equivalenti, con sintassi diversa.
- [x] B) `DELETE` rimuove i record ma lascia intatta la struttura della tabella; `DROP TABLE` elimina l'intera tabella, struttura compresa.
- [ ] C) `DROP TABLE` rimuove solo i record, `DELETE` elimina l'intera tabella.
- [ ] D) `DELETE` funziona solo con clausola `WHERE`, `DROP TABLE` no.

# Q8
A cosa serve il metodo `rollback()` della connessione?
- [ ] A) A rendere permanenti le modifiche non ancora confermate.
- [x] B) Ad annullare le modifiche non ancora confermate con `commit()`, riportando il database allo stato precedente.
- [ ] C) A eliminare definitivamente una tabella dal database.
- [ ] D) A ricreare automaticamente lo schema di una tabella cancellata.

# OPEN
Spiega con parole tue perché le query parametrizzate (con il segnaposto `?`) sono importanti per la sicurezza di un'applicazione, collegandole al concetto di SQL Injection. Porta un esempio concreto (a scuola, in azienda o nel marketing) di un dato inserito da un utente che, se non gestito correttamente, potrebbe causare problemi, e indica anche perché è comunque importante chiamare `commit()` dopo ogni operazione di scrittura andata a buon fine.