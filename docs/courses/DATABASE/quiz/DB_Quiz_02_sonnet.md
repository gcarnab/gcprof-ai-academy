---
title: "DB - M2 - Google Sheets come Database"
description: "Quiz di verifica finale sui concetti chiave del Modulo 2: struttura di una tabella, libreria gspread, autenticazione, creazione e lettura di un Google Sheet, integrazione con Pandas."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
In una tabella, cosa rappresenta una singola colonna?
- [ ] A) Un record.
- [x] B) Un campo, cioè un tipo di informazione.
- [ ] C) Un worksheet.
- [ ] D) Un DataFrame.

# Q2
A cosa serve la libreria `gspread` in Python?
- [ ] A) A creare grafici a partire da dati numerici.
- [x] B) A creare, leggere e modificare fogli Google Sheets direttamente da codice Python.
- [ ] C) A convertire file CSV in file di testo.
- [ ] D) A gestire database SQLite.

# Q3
Vero o Falso: `auth.authenticate_user()` va richiamato a ogni sessione Google Colab, anche se si è già effettuato il login nel browser.
- [x] A) Vero, l'autenticazione va concessa esplicitamente a ogni nuova sessione del notebook.
- [ ] B) Falso, il login nel browser è sufficiente e sostituisce questo passaggio.
- [ ] C) Vero, ma solo se si usa un account Google diverso da quello del browser.
- [ ] D) Falso, l'autenticazione serve solo per creare fogli, non per leggerli.

# Q4
Quale metodo useresti per creare un nuovo Google Sheet direttamente da codice Python?
- [ ] A) `gc.open('NomeFoglio')`
- [x] B) `gc.create('NomeFoglio')`
- [ ] C) `worksheet.update_title('NomeFoglio')`
- [ ] D) `gc.authorize('NomeFoglio')`

# Q5
Perché è importante che l'ordine dei valori in una lista da inserire in un foglio Google corrisponda all'ordine delle colonne dell'intestazione?
- [ ] A) Non è importante, gspread riconosce automaticamente il significato di ogni valore.
- [x] B) Perché gspread inserisce i valori in base alla posizione, non al nome della colonna: un ordine sbagliato inserisce i dati nelle colonne sbagliate.
- [ ] C) Perché altrimenti il foglio Google non si crea correttamente.
- [ ] D) Perché altrimenti Pandas non riesce a leggere il foglio.

# Q6
Qual è la differenza principale tra `get_all_values()` e `get_all_records()`?
- [ ] A) Sono due nomi diversi per lo stesso identico metodo.
- [x] B) `get_all_values()` restituisce liste di liste (dati grezzi), `get_all_records()` restituisce liste di dizionari con le intestazioni come chiavi.
- [ ] C) `get_all_values()` funziona solo su Google Colab, `get_all_records()` no.
- [ ] D) `get_all_records()` restituisce solo la prima riga del foglio.

# Q7
Perché `get_all_records()` è preferibile a `get_all_values()` quando si vuole creare un DataFrame Pandas?
- [ ] A) Perché è l'unico dei due metodi che funziona con Pandas.
- [x] B) Perché restituisce già dizionari con le intestazioni come chiavi, direttamente compatibili con `pd.DataFrame()`.
- [ ] C) Perché è più veloce da eseguire in ogni caso.
- [ ] D) Perché non richiede l'autenticazione a differenza dell'altro metodo.

# Q8
Vero o Falso: un Google Sheet aggiornato da Python è visibile e modificabile anche manualmente dal browser, in tempo reale.
- [x] A) Vero, è lo stesso documento sia che venga modificato da codice sia manualmente.
- [ ] B) Falso, un foglio creato da Python è visibile solo da codice.
- [ ] C) Vero, ma solo dopo aver riavviato il notebook.
- [ ] D) Falso, serve esportare il foglio in CSV per vederlo nel browser.

# OPEN
Spiega con parole tue perché Google Sheets rappresenta un passo avanti rispetto al semplice file CSV del Modulo 1, e descrivi un esempio concreto (a scuola, in azienda o nel marketing) in cui la possibilità di leggere i dati con `get_all_records()` e analizzarli con Pandas porta un vantaggio reale. Indica anche un limite di questo approccio rispetto a un vero database relazionale.