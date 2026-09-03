---
title: "DB - M5 - Interrogare i Dati (DQL)"
description: "Quiz di verifica finale sui concetti chiave del Modulo 5: comando SELECT, clausola WHERE, ORDER BY, LIMIT, fetchone/fetchall e integrazione con Pandas tramite read_sql_query."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Vero o Falso: il comando `SELECT` può modificare i dati contenuti in una tabella.
- [ ] A) Vero, se accompagnato da una clausola `WHERE`.
- [x] B) Falso, `SELECT` appartiene al DQL ed è di sola lettura: non modifica mai i dati.
- [ ] C) Vero, ma solo se usato insieme a `ORDER BY`.
- [ ] D) Falso, ma solo per le tabelle senza vincoli.

# Q2
Quale clausola SQL useresti per restituire solo gli studenti con media superiore a 8?
- [ ] A) `ORDER BY media > 8`
- [x] B) `WHERE media > 8`
- [ ] C) `LIMIT media > 8`
- [ ] D) `FILTER media > 8`

# Q3
Vero o Falso: `ORDER BY media` ordina i risultati dal valore più alto al più basso per impostazione predefinita.
- [ ] A) Vero, è il comportamento predefinito di `ORDER BY`.
- [x] B) Falso, l'ordine predefinito è crescente (`ASC`); per il decrescente serve specificare `DESC`.
- [ ] C) Vero, ma solo se combinato con `LIMIT`.
- [ ] D) Falso, `ORDER BY` non ha un ordine predefinito e genera un errore se non specificato.

# Q4
Quale metodo Python useresti per verificare se un'email è già registrata in una tabella, aspettandoti al massimo un solo risultato?
- [ ] A) `fetchall()`
- [ ] B) `fetchmany()`
- [x] C) `fetchone()`
- [ ] D) `execute()`

# Q5
Cosa fa la condizione `WHERE cognome LIKE 'R%'`?
- [ ] A) Restituisce solo i cognomi composti da un'unica lettera R.
- [x] B) Restituisce i cognomi che iniziano con la lettera R, indipendentemente da cosa segue.
- [ ] C) Restituisce i cognomi che contengono il simbolo %.
- [ ] D) Restituisce tutti i cognomi, ordinati alfabeticamente a partire da R.

# Q6
Vero o Falso: `LIMIT 3` senza un `ORDER BY` garantisce sempre i 3 valori più alti di una colonna.
- [ ] A) Vero, `LIMIT` ordina automaticamente i risultati prima di restituirli.
- [x] B) Falso, senza `ORDER BY` `LIMIT` restituisce le prime righe nell'ordine in cui la query le trova, non necessariamente le più alte.
- [ ] C) Vero, ma solo se la colonna è numerica.
- [ ] D) Falso, `LIMIT` senza `ORDER BY` genera sempre un errore.

# Q7
Quale funzione permette di trasformare direttamente il risultato di una query SQL in un DataFrame Pandas?
- [ ] A) `pd.to_sql()`
- [x] B) `pd.read_sql_query()`
- [ ] C) `cursore.to_dataframe()`
- [ ] D) `connessione.read_pandas()`

# Q8
Come si combinano due condizioni in una clausola `WHERE`, quando entrambe devono essere vere contemporaneamente?
- [ ] A) `OR`
- [x] B) `AND`
- [ ] C) `LIKE`
- [ ] D) `LIMIT`

# OPEN
Spiega con parole tue la differenza tra "eseguire" una query con `cursore.execute()` e "recuperarne i risultati" con `fetchone()` o `fetchall()`. Porta un esempio concreto (a scuola, in azienda o nel marketing) in cui useresti `ORDER BY` combinato con `LIMIT` per rispondere a una domanda specifica sui dati, e spiega perché in quel caso preferiresti usare `pd.read_sql_query()` invece di iterare manualmente sui risultati con un ciclo `for`.