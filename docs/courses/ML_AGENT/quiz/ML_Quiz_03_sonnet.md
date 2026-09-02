---
title: "ML - M3 - Deep Learning con PyTorch"
description: "Quiz di verifica finale sui concetti chiave del Modulo 3: tensori e autograd, preparazione dei dati, architettura di una rete neurale, funzione di loss, backpropagation, ottimizzatore, training loop."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cos'è, in sintesi, un tensore PyTorch rispetto a un array NumPy?
- [ ] A) Sono esattamente la stessa cosa, cambia solo il nome.
- [x] B) È una struttura dati multidimensionale simile a un array NumPy, ma capace di tracciare automaticamente i gradienti delle operazioni e di girare su GPU.
- [ ] C) È una struttura dati che può contenere solo numeri interi.
- [ ] D) È una tabella di sole due dimensioni, a differenza degli array NumPy che ne supportano di più.

# Q2
Nell'esempio con `x.requires_grad=True` e `y = x ** 2`, a cosa serve chiamare `y.backward()`?
- [ ] A) A riportare `y` al suo valore iniziale, annullando l'operazione.
- [x] B) A far calcolare automaticamente a PyTorch il gradiente di `y` rispetto a `x` (autograd).
- [ ] C) A spostare il tensore `y` sulla GPU.
- [ ] D) A convertire `y` in un array NumPy.

# Q3
Perché, nella preparazione dei dati Wine per PyTorch, la normalizzazione viene calcolata (`fit`) solo sul train set?
- [ ] A) Perché `StandardScaler` non funziona su un test set.
- [x] B) Per evitare il data leakage: calcolare statistiche anche sul test set farebbe "trapelare" informazioni che il modello non dovrebbe conoscere durante l'addestramento.
- [ ] C) Perché il test set non contiene feature numeriche.
- [ ] D) Perché altrimenti i tensori avrebbero una forma (shape) diversa da quella richiesta dalla rete.

# Q4
Cosa rappresentano, in un layer lineare (`nn.Linear`), i pesi e i bias?
- [ ] A) Sono valori fissi, decisi dal programmatore e mai modificati durante il training.
- [x] B) Sono i parametri che la rete impara durante l'addestramento, aggiornati a ogni passo per ridurre la loss.
- [ ] C) Sono il numero di epoche e la dimensione del batch usati nel training loop.
- [ ] D) Sono le etichette reali del dataset, convertite in formato numerico.

# Q5
Perché è necessario inserire una funzione di attivazione (come ReLU) tra i layer lineari di una rete?
- [ ] A) Per ridurre il numero di parametri da addestrare.
- [x] B) Perché senza non linearità una sequenza di layer lineari equivarrebbe matematicamente a un unico layer lineare, per quanti strati si aggiungano.
- [ ] C) Per convertire i tensori in array NumPy prima del forward pass.
- [ ] D) Per calcolare automaticamente l'accuratezza del modello a ogni epoca.

# Q6
Cosa misura la funzione di loss durante il training di una rete neurale?
- [ ] A) Il tempo impiegato dalla rete per completare un'epoca.
- [x] B) Quanto le previsioni della rete si discostano dalle etichette reali: più è alta, peggiore è la previsione.
- [ ] C) Il numero di parametri totali della rete.
- [ ] D) La quantità di memoria GPU occupata dal modello.

# Q7
Perché è fondamentale chiamare `ottimizzatore.zero_grad()` prima di ogni `loss.backward()` nel training loop?
- [ ] A) Perché altrimenti il modello non potrebbe essere valutato sul test set.
- [x] B) Perché PyTorch accumula i gradienti per default: senza azzerarli, si sommerebbero a quelli del passo precedente, causando aggiornamenti scorretti dei pesi.
- [ ] C) Perché serve a normalizzare automaticamente le feature in ingresso.
- [ ] D) Perché è il comando che avvia il calcolo della backpropagation.

# Q8
Nel progetto guidato del modulo, cosa emerge dal confronto tra la rete neurale e il classificatore KNN del Modulo 1 sul dataset Wine?
- [ ] A) La rete neurale è sempre e comunque nettamente più accurata del KNN, senza eccezioni.
- [ ] B) Il KNN non può essere applicato agli stessi dati normalizzati usati per la rete.
- [x] C) Su un dataset piccolo come questo, la differenza di accuratezza tra i due modelli è spesso modesta: il vantaggio della rete neurale diventa più evidente su problemi più grandi e complessi.
- [ ] D) La rete neurale, una volta addestrata, è sempre più lenta del KNN nel classificare un nuovo esempio.

# OPEN
Spiega con parole tue cosa succede, passo per passo, in una singola iterazione del training loop di una rete neurale (dal forward pass all'aggiornamento dei pesi), e collega questo processo al motivo per cui è importante monitorare sia la loss di train sia l'accuratezza di test durante l'addestramento.