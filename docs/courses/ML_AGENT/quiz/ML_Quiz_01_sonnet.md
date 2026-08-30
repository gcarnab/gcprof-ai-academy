---
title: "ML - M1 - Apprendimento Supervisionato"
description: "Quiz di verifica finale sui concetti chiave del Modulo 1: classificazione vs regressione, train/test split, stratify, algoritmo k-Nearest Neighbors, overfitting/underfitting, data leakage."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la differenza tra un problema di classificazione e uno di regressione?
- [ ] A) Non c'è alcuna differenza, sono due nomi per lo stesso tipo di problema.
- [x] B) La classificazione prevede un'etichetta tra un insieme finito di categorie, la regressione un valore numerico continuo.
- [ ] C) La classificazione si usa solo con KNN, la regressione solo con le reti neurali.
- [ ] D) La regressione prevede categorie, la classificazione prevede numeri continui.

# Q2
Perché un modello va sempre valutato su un test set che non ha mai visto durante l'addestramento?
- [ ] A) Perché altrimenti il training richiederebbe troppo tempo.
- [ ] B) Non è necessario: valutare sui dati di train dà comunque una stima affidabile.
- [x] C) Perché valutarlo sugli stessi dati di addestramento darebbe una stima illusoriamente alta, che non dice nulla sulla capacità di generalizzare su dati nuovi.
- [ ] D) Perché il test set contiene sempre più esempi del train set.

# Q3
A cosa serve il parametro `stratify` in `train_test_split`?
- [ ] A) Ad aumentare il numero totale di esempi nel dataset.
- [ ] B) A normalizzare automaticamente le feature numeriche.
- [x] C) A garantire che ogni classe sia rappresentata nelle stesse proporzioni sia nel train set sia nel test set.
- [ ] D) A scegliere automaticamente il miglior valore di k per il classificatore.

# Q4
Come classifica un nuovo esempio l'algoritmo k-Nearest Neighbors?
- [ ] A) Costruisce una formula matematica esplicita durante l'addestramento e la applica al nuovo esempio.
- [x] B) Calcola la distanza dal nuovo esempio a tutti gli esempi del train set e assegna la classe più frequente tra i k più vicini.
- [ ] C) Raggruppa tutti gli esempi in cluster e assegna la classe del centroide più vicino.
- [ ] D) Sceglie sempre la classe più frequente nell'intero train set, indipendentemente dal nuovo esempio.

# Q5
Cosa succede scegliendo un valore di k molto piccolo (es. k=1) in un classificatore KNN?
- [ ] A) Il modello diventa troppo semplice e va in underfitting.
- [x] B) Il modello segue troppo da vicino ogni singolo punto del train set (anche gli anomali), con un rischio elevato di overfitting.
- [ ] C) Il modello ignora completamente le feature con scala numerica ampia.
- [ ] D) Il modello non può più essere valutato con `accuracy_score`.

# Q6
Cosa indica, nel grafico dell'esercizio sulla scelta di k, una zona in cui sia l'accuratezza di train sia quella di test scendono insieme a valori bassi?
- [ ] A) Overfitting.
- [x] B) Underfitting: il modello è troppo semplice per catturare i pattern nei dati.
- [ ] C) Data leakage.
- [ ] D) Un errore nel calcolo dello split train/test.

# Q7
In cosa consiste il data leakage descritto nel modulo?
- [ ] A) Nel perdere per errore alcune righe del dataset durante il caricamento.
- [ ] B) Nell'usare un valore di k troppo alto nel classificatore KNN.
- [x] C) Nel far "vedere" al modello, anche indirettamente, informazioni provenienti dal test set (es. calcolando statistiche di normalizzazione su tutto il dataset prima dello split).
- [ ] D) Nel non usare `stratify` durante lo split train/test.

# Q8
Nel progetto guidato del modulo, come viene individuata la feature chimica singolarmente più predittiva della cultivar di vino?
- [ ] A) Osservando quale feature ha i valori numerici più alti nel dataset.
- [x] B) Addestrando un classificatore KNN separato su ciascuna feature singola e confrontando l'accuratezza ottenuta sul test set.
- [ ] C) Calcolando la correlazione tra tutte le feature e ordinandole.
- [ ] D) Applicando il clustering gerarchico alle sole feature chimiche.

# OPEN
Spiega con parole tue perché, lavorando con l'algoritmo k-Nearest Neighbors, è importante prestare attenzione alla scala delle diverse feature numeriche, collegando questo aspetto al problema più generale del data leakage e a come lo eviteresti in un progetto reale.