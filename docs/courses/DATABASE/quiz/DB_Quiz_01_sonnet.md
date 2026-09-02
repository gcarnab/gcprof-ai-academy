---
title: "DB - M1 - Dal Dato al Database"
description: "Quiz di verifica finale sui concetti chiave del Modulo 1: dato vs informazione, formati di archiviazione dei dati, Google Colab e Google Drive, variabili Python, file di testo e file CSV."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la differenza corretta tra un dato e un'informazione?
- [ ] A) Sono sempre la stessa cosa, solo scritti in modo diverso.
- [x] B) Il dato è un valore grezzo e non interpretato, l'informazione è un dato inserito in un contesto che gli dà significato.
- [ ] C) L'informazione è un dato salvato su file, il dato esiste solo in memoria.
- [ ] D) Il dato riguarda solo i numeri, l'informazione riguarda solo il testo.

# Q2
Perché, quando i dati aumentano, diventa necessario organizzarli in strutture ordinate?
- [ ] A) Perché altrimenti Python non riesce a eseguire il programma.
- [x] B) Perché altrimenti aumentano errori, duplicati e tempi di ricerca, e diventa difficile far collaborare più persone sugli stessi dati.
- [ ] C) Perché un file di testo non può contenere più di dieci righe.
- [ ] D) Perché solo i database possono contenere numeri decimali.

# Q3
Quale delle seguenti affermazioni descrive correttamente il formato CSV?
- [ ] A) Un file di testo privo di qualunque struttura.
- [x] B) Un formato tabellare in cui i dati sono organizzati in righe e colonne, separate da virgola.
- [ ] C) Un tipo di database relazionale con vincoli di integrità.
- [ ] D) Un formato leggibile solo da Google Sheets.

# Q4
Vero o Falso: i file creati "al volo" dentro Google Colab, senza salvarli su Google Drive, restano disponibili anche dopo la chiusura della sessione.
- [ ] A) Vero, Colab salva sempre tutto automaticamente.
- [x] B) Falso, vengono cancellati alla chiusura della sessione: per la persistenza serve collegare Google Drive.
- [ ] C) Vero, ma solo per i file CSV.
- [ ] D) Falso, perché Colab non permette di creare file.

# Q5
Quale tipo di dato Python useresti per salvare il valore `7.5`, ad esempio una media voti?
- [ ] A) `int`
- [ ] B) `str`
- [x] C) `float`
- [ ] D) `bool`

# Q6
Perché è preferibile usare `with open(...) as file:` invece di `open()` seguito da `file.close()`?
- [ ] A) Perché è l'unico modo per leggere un file in Python.
- [x] B) Perché il file viene chiuso automaticamente anche in caso di errore durante la scrittura o la lettura.
- [ ] C) Perché permette di aprire più file contemporaneamente senza limiti.
- [ ] D) Perché evita di dover importare il modulo `csv`.

# Q7
Quale funzione del modulo `csv` di Python si usa per scrivere una riga di dati in un file CSV?
- [ ] A) `csv.reader()`
- [x] B) `csv.writer().writerow()`
- [ ] C) `csv.open()`
- [ ] D) `csv.save()`

# Q8
Che cosa rappresenta, di norma, la prima riga di un file CSV ben strutturato?
- [ ] A) Un record vuoto, da ignorare.
- [x] B) L'intestazione, cioè i nomi delle colonne (campi) della tabella.
- [ ] C) Il numero totale di righe presenti nel file.
- [ ] D) Un commento che il programma non legge mai.

# OPEN
Spiega con parole tue la differenza tra dato e informazione, e descrivi un esempio concreto (a scuola, in azienda o nel marketing) in cui organizzare i dati in un file CSV, invece che in un semplice file di testo, porta un vantaggio reale. Indica anche un limite di questo approccio rispetto a un vero database.