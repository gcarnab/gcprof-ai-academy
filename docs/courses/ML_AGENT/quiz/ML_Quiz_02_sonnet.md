---
title: "ML - M2 - Apprendimento Non Supervisionato"
description: "Quiz di verifica finale sui concetti chiave del Modulo 2: clustering, normalizzazione delle feature, k-means, elbow method, silhouette score, clustering gerarchico, dendrogramma, validazione con etichette reali."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la differenza principale tra apprendimento supervisionato e apprendimento non supervisionato?
- [ ] A) Nell'apprendimento non supervisionato non esistono feature numeriche.
- [x] B) Nell'apprendimento non supervisionato i dati non hanno un'etichetta target, e il modello deve scoprire da solo eventuali strutture nei dati.
- [ ] C) Nell'apprendimento supervisionato non è mai possibile visualizzare i dati.
- [ ] D) Non c'è alcuna differenza pratica tra i due approcci.

# Q2
Perché, a differenza del Modulo 1, nel clustering la normalizzazione delle feature non è opzionale?
- [ ] A) Perché scikit-learn non permette di eseguire il clustering su dati non normalizzati.
- [x] B) Perché algoritmi come k-means si basano sulla distanza tra punti, e una feature con scala numerica ampia dominerebbe il calcolo indipendentemente da quanto sia informativa.
- [ ] C) Perché la normalizzazione elimina automaticamente i valori mancanti dal dataset.
- [ ] D) Perché senza normalizzazione non è possibile calcolare il silhouette score.

# Q3
Come procede, passo per passo, l'algoritmo k-means?
- [ ] A) Costruisce un dendrogramma e poi lo taglia a un'altezza scelta dall'utente.
- [x] B) Assegna ogni punto al centroide più vicino, poi ricalcola i centroidi come media dei punti assegnati, ripetendo finché i cluster non si stabilizzano.
- [ ] C) Confronta ogni punto con un'etichetta reale nota per decidere a quale cluster appartiene.
- [ ] D) Ordina i punti in base a un'unica feature e li divide in k gruppi di uguale numerosità.

# Q4
Cos'è, esattamente, un centroide in k-means?
- [ ] A) Il punto del dataset più lontano da tutti gli altri.
- [x] B) Il punto che rappresenta il centro di un cluster, calcolato come media, feature per feature, degli esempi assegnati a quel cluster.
- [ ] C) Il primo punto scelto casualmente all'inizio dell'algoritmo, che non cambia mai durante l'esecuzione.
- [ ] D) Un valore che indica quante volte un cluster è stato unito ad un altro nel dendrogramma.

# Q5
Cosa osserva l'elbow method per aiutare a scegliere il numero di cluster k?
- [ ] A) Il numero di righe con valori mancanti nel dataset.
- [x] B) Come diminuisce l'inerzia (distanza dei punti dai propri centroidi) al crescere di k, cercando il punto in cui il miglioramento diventa marginale.
- [ ] C) La distanza tra le due specie di pinguini più simili tra loro.
- [ ] D) Il tempo di esecuzione dell'algoritmo per ciascun valore di k.

# Q6
Cosa indica un silhouette score vicino a +1 per un punto del dataset?
- [ ] A) Che il punto è probabilmente stato assegnato al cluster sbagliato.
- [ ] B) Che il punto ha valori mancanti in una o più feature.
- [x] C) Che il punto è molto più vicino al proprio cluster rispetto al cluster più vicino tra gli altri, quindi ben assegnato.
- [ ] D) Che il punto corrisponde esattamente al centroide del proprio cluster.

# Q7
Cosa rappresenta un dendrogramma nel clustering gerarchico?
- [ ] A) Il grafico dell'accuratezza del modello al variare del numero di epoche.
- [x] B) Un diagramma ad albero che mostra l'ordine e la distanza a cui i cluster vengono progressivamente uniti, permettendo di scegliere il numero di cluster tagliando l'albero a un'altezza scelta.
- [ ] C) La distribuzione statistica di una singola feature del dataset.
- [ ] D) Una tabella che confronta i cluster trovati con le etichette reali.

# Q8
Nel progetto guidato sui pinguini, a cosa serve confrontare i cluster trovati con la specie reale tramite tabella di contingenza e Adjusted Rand Index?
- [ ] A) A guidare l'algoritmo di clustering durante il suo addestramento.
- [ ] B) A normalizzare le feature prima di applicare k-means.
- [x] C) A validare, solo a posteriori, quanto i cluster trovati senza etichette corrispondano alle specie reali, senza aver mai usato quell'informazione durante il clustering.
- [ ] D) A scegliere il valore ottimale del learning rate per il modello.

# OPEN
Spiega con parole tue perché, nel clustering, le etichette reali (quando disponibili, come la specie dei pinguini) vanno usate solo per validare i risultati e mai per guidare l'algoritmo, e collega questa idea al motivo per cui la normalizzazione delle feature è un passaggio obbligatorio prima di applicare k-means o il clustering gerarchico.