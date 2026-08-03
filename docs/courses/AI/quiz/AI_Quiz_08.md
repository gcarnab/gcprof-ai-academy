---
title: "Modulo 8: Deep Learning"
description: "Quiz conclusivo per verificare le conoscenze su neuroni artificiali, backpropagation, funzioni di attivazione, CNN e RNN/LSTM/GRU."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa fa una funzione di attivazione in un neurone artificiale?
- [ ] A) Riduce il numero di neuroni della rete.
- [x] B) Introduce non linearità, permettendo alla rete di modellare relazioni complesse.
- [ ] C) Divide il dataset in training e test set.
- [ ] D) Elimina automaticamente i dati mancanti.

# Q2
Cosa fa la Backpropagation?
- [ ] A) Genera nuovi dati di addestramento.
- [x] B) Calcola il contributo di ciascun peso all'errore, propagandolo dall'output layer verso l'input layer.
- [ ] C) Normalizza i dati di input.
- [ ] D) Sceglie automaticamente l'architettura della rete.

# Q3
Quale ottimizzatore è generalmente considerato una scelta robusta di default per la maggior parte dei problemi?
- [ ] A) SGD puro senza varianti.
- [x] B) Adam.
- [ ] C) Softmax.
- [ ] D) ReLU.

# Q4
Perché le CNN sono particolarmente adatte all'elaborazione di immagini?
- [ ] A) Perché ignorano completamente la struttura spaziale dei dati.
- [x] B) Perché usano filtri convoluzionali che riconoscono pattern locali indipendentemente dalla loro posizione nell'immagine.
- [ ] C) Perché non richiedono alcuna funzione di attivazione.
- [ ] D) Perché funzionano solo con immagini in bianco e nero.

# Q5
A cosa serve un livello di pooling in una CNN?
- [ ] A) Ad aumentare il numero di canali colore dell'immagine.
- [x] B) A ridurre la dimensione dei dati elaborati, mantenendo le informazioni più rilevanti.
- [ ] C) A calcolare la funzione di perdita.
- [ ] D) A convertire l'immagine in formato JSON.

# Q6
Cosa distingue una RNN da un MLP tradizionale?
- [ ] A) La RNN non usa funzioni di attivazione.
- [x] B) La RNN mantiene uno stato nascosto che le permette di tenere conto del contesto precedente in una sequenza.
- [ ] C) La RNN funziona solo con immagini.
- [ ] D) La RNN non richiede addestramento.

# Q7
Cos'è il problema del vanishing gradient?
- [ ] A) Il gradiente diventa troppo grande e la rete diverge immediatamente.
- [x] B) Il gradiente diventa troppo piccolo attraversando molti passaggi temporali, rendendo difficile apprendere dipendenze a lungo termine.
- [ ] C) Il dataset di training è troppo piccolo per addestrare la rete.
- [ ] D) La funzione di perdita non converge mai a zero.

# Q8
Perché LSTM e GRU sono state introdotte rispetto alle RNN semplici?
- [ ] A) Per ridurre il numero di parametri del modello a zero.
- [ ] B) Per eliminare completamente la necessità di una funzione di attivazione.
- [x] C) Per gestire meglio le dipendenze a lungo termine tramite meccanismi a "porte" che regolano il flusso delle informazioni.
- [ ] D) Per sostituire completamente il Gradient Descent.

# OPEN
Descrivi un problema reale (della tua scuola, del tuo lavoro o di un contesto a tua scelta) che affronteresti con il Deep Learning invece che con il Machine Learning classico visto nel Modulo 6. Indica quale tipo di dato è coinvolto (immagini, testo, serie temporali, dati tabellari), quale architettura useresti (MLP, CNN o RNN/LSTM/GRU) e spiega perché quella architettura è la più adatta al tipo di dato scelto.