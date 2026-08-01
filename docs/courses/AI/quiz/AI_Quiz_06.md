---
title: "Modulo 6: Machine Learning"
description: "Quiz conclusivo per verificare le conoscenze su apprendimento supervisionato/non supervisionato, validazione, metriche e overfitting."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la differenza principale tra apprendimento supervisionato e non supervisionato?
- [ ] A) Il supervisionato usa solo numeri, il non supervisionato solo testo.
- [x] B) Il supervisionato apprende da dati etichettati, il non supervisionato cerca pattern in dati privi di etichette.
- [ ] C) Sono esattamente la stessa tecnica con nomi diversi.
- [ ] D) Il non supervisionato richiede sempre reti neurali.

# Q2
Perché è fondamentale dividere il dataset in training set e test set?
- [ ] A) Per velocizzare l'addestramento del modello.
- [x] B) Per valutare il modello su dati mai visti durante l'addestramento, stimando la sua reale capacità di generalizzazione.
- [ ] C) Perché scikit-learn lo richiede obbligatoriamente per ogni algoritmo.
- [ ] D) Per ridurre il numero di feature del dataset.

# Q3
Cosa indica un'accuracy molto alta in training ma molto più bassa in test?
- [ ] A) Underfitting.
- [ ] B) Un errore nella metrica scelta.
- [x] C) Overfitting.
- [ ] D) Che il modello è pronto per la produzione.

# Q4
Cosa misura la metrica "recall" in un problema di classificazione?
- [ ] A) La percentuale di previsioni positive corrette.
- [x] B) La percentuale di casi positivi reali correttamente individuati dal modello.
- [ ] C) Il tempo impiegato dal modello per fare una previsione.
- [ ] D) Il numero di feature usate dal modello.

# Q5
Perché l'accuracy da sola può essere fuorviante su un dataset con classi fortemente sbilanciate?
- [ ] A) Perché l'accuracy non è calcolabile su dataset sbilanciati.
- [x] B) Perché un modello che prevede sempre la classe maggioritaria può ottenere un'accuracy alta senza aver imparato nulla di utile.
- [ ] C) Perché l'accuracy considera solo i falsi positivi.
- [ ] D) Perché l'accuracy richiede sempre un dataset bilanciato per essere calcolata.

# Q6
Cosa permette di fare la cross-validation rispetto a un singolo train/test split?
- [ ] A) Eliminare completamente la necessità di un test set.
- [x] B) Ottenere una stima più robusta delle prestazioni, ripetendo addestramento e valutazione su più suddivisioni dei dati.
- [ ] C) Addestrare il modello più velocemente.
- [ ] D) Sostituire la scelta dell'algoritmo di Machine Learning.

# Q7
Qual è un errore metodologico grave nel preprocessing dei dati per il Machine Learning?
- [x] A) Applicare normalizzazione o standardizzazione calcolando i parametri anche sul test set, causando data leakage.
- [ ] B) Applicare la normalizzazione solo sul training set.
- [ ] C) Usare `random_state` fisso per la riproducibilità.
- [ ] D) Calcolare la matrice di confusione dopo la valutazione.

# Q8
Cosa fa l'algoritmo K-Means?
- [ ] A) Addestra un classificatore supervisionato.
- [x] B) Raggruppa automaticamente le osservazioni in cluster simili, senza etichette predefinite.
- [ ] C) Calcola la matrice di confusione di un modello.
- [ ] D) Divide il dataset in training e test set.

# OPEN
Descrivi un problema reale (della tua scuola, del tuo lavoro o di un contesto a tua scelta) che potresti affrontare con il Machine Learning. Indica se si tratta di classificazione, regressione o clustering, spiega quali feature useresti e quale metrica di valutazione sceglieresti per giudicare se il modello funziona bene, motivando la scelta.