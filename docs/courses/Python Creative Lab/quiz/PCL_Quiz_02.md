---
title: "PCL - M2 — Google Colab e la prima tartaruga"
description: "Quiz di verifica sui concetti del Modulo 2: ambiente Google Colab, notebook, celle, installazione di librerie e primi comandi di movimento per Terry."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Che cos'è Google Colab (Colaboratory) e qual è il suo vantaggio principale?
- [ ] A) Un programma da scaricare sul computer per modificare file di testo offline.
- [x] B) Un ambiente gratuito online per programmare in Python direttamente dal browser senza installare software.
- [ ] C) Un sistema operativo sviluppato per controllare robot fisici a distanza.
- [ ] D) Un motore di ricerca per scaricare videogiochi.

# Q2
Come è organizzato un "notebook" di Google Colab?
- [ ] A) È un unico blocco di testo indivisibile che viene stampato su carta.
- [ ] B) È diviso esclusivamente in immagini statiche e tracce audio.
- [x] C) È un documento digitale formato da celle di testo per le spiegazioni e celle di codice per le istruzioni Python.
- [ ] D) È una cartella compressa contenente solo i risultati dei calcoli.

# Q3
Come funziona l'esecuzione del codice all'interno di un notebook Colab?
- [ ] A) Il computer esegue automaticamente l'intero notebook non appena viene aperto.
- [ ] B) Il codice viene eseguito solo quando si riavvia la macchina.
- [x] C) Il computer esegue solamente le celle che l'utente sceglie di eseguire premendo il pulsante ▶.
- [ ] D) Tutte le celle vengono eseguite contemporaneamente all'avvio del browser.

# Q4
Che cos'è una "libreria" in Python (come *ColabTurtlePlus*)?
- [ ] A) Un manuale cartaceo che spiega le regole di sintassi del linguaggio.
- [x] B) Una raccolta di strumenti e funzioni già pronti che ampliano le capacità di Python.
- [ ] C) Un archivio di bug ed errori di sistema.
- [ ] D) Un database contenente solo immagini e grafica 3D.

# Q5
Nel comando `!pip install ColabTurtlePlus`, qual è la funzione del punto esclamativo (`!`) iniziale?
- [ ] A) Indica a Python di ignorare l'istruzione successiva.
- [x] B) Comunica a Colab di eseguire un comando del sistema per installare una libreria.
- [ ] C) Serve a cancellare lo schermo del notebook.
- [ ] D) Modifica la velocità di movimento di Terry.

# Q6
Qual è la funzione dell'istruzione `from ColabTurtlePlus.Turtle import *`?
- [ ] A) Salva il notebook sul Google Drive dell'utente.
- [ ] B) Installa un nuovo browser per far girare il programma.
- [x] C) Permette al programma di importare e utilizzare tutti i comandi della Turtle.
- [ ] D) Chiude la sessione attiva su Google Colab.

# Q7
Che cosa imposta l'istruzione `setup(800,500)`?
- [ ] A) Sposta Terry in avanti di 800 pixel e in alto di 500 pixel.
- [ ] B) Imposta il tempo di attesa a 800 millisecondi e la velocità a 500.
- [x] C) Imposta le dimensioni della finestra di disegno (800 pixel di larghezza e 500 pixel di altezza).
- [ ] D) Crea un notebook con 800 celle di testo e 500 celle di codice.

# Q8
Quale delle seguenti affermazioni descrive correttamente il comando `forward(100)`?
- [ ] A) Cambia il colore della linea portandolo al valore 100.
- [x] B) Segue la struttura `comando(valore)` e dice a Terry di avanzare di 100 pixel.
- [ ] C) Cancella 100 pixel dallo schermo prima di terminare il programma.
- [ ] D) Ruota la tartaruga Terry di 100 gradi verso destra.

# OPEN
Spiega la differenza tra celle di testo e celle di codice in Google Colab. Descrivi poi la sequenza di comandi necessari per preparare l'ambiente di lavoro con Terry (dall'importazione della libreria fino al disegno) e farle tracciare una linea avanti di 150 pixel, spiegando cosa indica il numero inserito tra parentesi.