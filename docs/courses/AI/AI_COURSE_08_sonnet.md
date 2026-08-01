<a id="top"></a>

# 📘 Modulo 8: Deep Learning
**Livello Avanzato — Master in Intelligenza Artificiale | GCProf Academy**

· 🕒 Tempo stimato: 10-12 ore · 🎯 Difficoltà: Avanzato

---

## 📑 Indice del Modulo

1. [Introduzione](#1-introduzione)
2. [Obiettivi](#2-obiettivi)
3. [Prerequisiti](#3-prerequisiti)
4. [Lezioni](#4-lezioni)
5. [Esempi](#5-esempi)
6. [Laboratorio](#6-laboratorio)
7. [Best Practice](#7-best-practice)
8. [Errori Comuni](#8-errori-comuni)
9. [Riepilogo](#9-riepilogo)
10. [Glossario](#10-glossario)
11. [Quiz](#11-quiz)
12. [Project Work](#12-project-work)
13. [Materiale Scaricabile](#13-materiale-scaricabile)
14. [Bibliografia](#14-bibliografia)
15. [Sitografia](#15-sitografia)

---

<a id="1-introduzione"></a>
## 1. Introduzione

Benvenuto nel Livello Avanzato del Master. Fin qui hai lavorato con il Machine Learning "classico": algoritmi come alberi decisionali o regressione logistica, che funzionano bene su dati tabellari ben strutturati ma raggiungono presto un limite quando i dati diventano più complessi — immagini, audio, testo in linguaggio naturale, sequenze temporali lunghe.

Il **Deep Learning** nasce proprio per superare questo limite. Invece di richiedere che sia un esperto umano a decidere manualmente quali caratteristiche estrarre dai dati (*feature engineering* manuale, come hai fatto nel Modulo 5), le **reti neurali profonde** imparano da sole, strato dopo strato, rappresentazioni sempre più astratte dei dati: da pixel grezzi a contorni, da contorni a forme, da forme a oggetti riconoscibili — un processo che ricorda, per analogia (non per identità biologica), il modo in cui il cervello elabora l'informazione visiva.

In questo modulo entrerai nel cuore matematico e architetturale delle reti neurali: come "impara" un neurone artificiale, come funziona il meccanismo che permette a una rete di correggere i propri errori (Backpropagation), e le architetture specializzate — **CNN** per le immagini, **RNN/LSTM/GRU** per le sequenze — che hanno reso possibile buona parte della rivoluzione AI degli ultimi quindici anni, e che pongono le basi dirette per il Modulo 9 (Transformer), l'architettura su cui sono costruiti gli LLM moderni.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Descrivere la struttura di un **neurone artificiale** e di una rete neurale multistrato (Multi-Layer Perceptron).
- ✅ Spiegare il funzionamento del **Gradient Descent** e della **Backpropagation** come meccanismo di apprendimento.
- ✅ Confrontare le principali **funzioni di attivazione** (ReLU, Sigmoid, Tanh, Softmax) e sapere quando usarle.
- ✅ Confrontare i principali **ottimizzatori** (SGD, Adam, RMSprop).
- ✅ Descrivere il funzionamento delle **CNN (Convolutional Neural Network)** e il loro utilizzo per la visione artificiale.
- ✅ Descrivere il funzionamento delle **RNN, LSTM e GRU** e il loro utilizzo per dati sequenziali.
- ✅ Costruire, addestrare e valutare una rete neurale da zero con **TensorFlow/Keras**, scegliendo l'architettura più adatta al problema.
- ✅ Riconoscere e mitigare fenomeni critici del Deep Learning come il **vanishing gradient**.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato l'intero **Livello Intermedio** (Moduli 4-7): in particolare, familiarità con Python, OOP, Pandas/NumPy e i concetti di train/test split, overfitting e metriche di valutazione (Modulo 6) sono essenziali.
- Un minimo di dimestichezza con concetti matematici di base (funzioni, derivate a livello intuitivo, vettori): il modulo introduce i concetti necessari in modo graduale, privilegiando l'intuizione geometrica rispetto al formalismo matematico completo.
- Ambiente VS Code con Python configurato, come nei moduli precedenti.

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Il neurone artificiale e la rete multistrato

Un **neurone artificiale** riceve uno o più input numerici, li combina con dei **pesi** (che rappresentano l'importanza di ciascun input) e un **bias**, applica una **funzione di attivazione** e produce un output:

```
output = funzione_attivazione(w1*x1 + w2*x2 + ... + wn*xn + bias)
```

Un singolo neurone può risolvere solo problemi molto semplici (linearmente separabili). La potenza del Deep Learning emerge organizzando i neuroni in **strati (layer)**:

- **Input layer**: riceve i dati grezzi (es. i pixel di un'immagine, i valori numerici di un dataset).
- **Hidden layer (strati nascosti)**: uno o più strati intermedi, dove avviene la vera "elaborazione". Più strati nascosti = rete più "profonda" (da qui il nome *deep learning*).
- **Output layer**: produce il risultato finale (es. una probabilità di classe).

Una rete di questo tipo si chiama **Multi-Layer Perceptron (MLP)**, ed è l'architettura più semplice di rete neurale — il punto di partenza concettuale per tutte le architetture più sofisticate che vedrai in questo modulo.

### 4.2 — Funzioni di attivazione

Senza una funzione di attivazione **non lineare**, anche una rete con centinaia di strati si comporterebbe come un singolo strato lineare, perdendo ogni capacità di modellare relazioni complesse. Le funzioni più usate:

| Funzione | Formula (intuitiva) | Uso tipico |
|---|---|---|
| **ReLU** | restituisce il valore se positivo, altrimenti 0 | Standard per gli hidden layer, per la sua efficienza computazionale |
| **Sigmoid** | comprime i valori tra 0 e 1 | Output layer per classificazione binaria |
| **Tanh** | comprime i valori tra -1 e 1 | Storicamente usata negli hidden layer, oggi meno comune di ReLU |
| **Softmax** | trasforma un vettore di valori in una distribuzione di probabilità che somma a 1 | Output layer per classificazione multi-classe |

### 4.3 — Gradient Descent e Backpropagation

**Come impara una rete neurale?** Il processo si basa su due meccanismi complementari:

**1. Funzione di perdita (Loss Function)**: misura quanto le previsioni della rete sono distanti dai valori reali attesi. Più alta la perdita, peggiore la rete.

**2. Gradient Descent (Discesa del Gradiente)**: un algoritmo di ottimizzazione che modifica gradualmente i pesi della rete nella direzione che **riduce** la funzione di perdita — un po' come scendere lungo un pendio scegliendo, a ogni passo, la direzione più ripida verso il basso.

**3. Backpropagation (Retropropagazione dell'errore)**: il meccanismo matematico (basato sulla regola della catena del calcolo differenziale) che permette di calcolare **quanto ogni singolo peso della rete** ha contribuito all'errore finale, propagando l'informazione dall'output layer indietro fino all'input layer — da cui il nome.

Il ciclo di addestramento di una rete neurale è quindi: **forward pass** (i dati attraversano la rete e producono una previsione) → **calcolo della loss** → **backward pass / backpropagation** (calcolo di quanto ogni peso ha contribuito all'errore) → **aggiornamento dei pesi** tramite Gradient Descent → si ripete per molte iterazioni (*epoch*).

### 4.4 — Ottimizzatori

Il Gradient Descent "puro" (detto anche Batch Gradient Descent) è spesso lento o instabile su dataset grandi. Sono nate varianti più sofisticate, dette **ottimizzatori**:

- **SGD (Stochastic Gradient Descent)**: aggiorna i pesi usando piccoli sottoinsiemi casuali di dati (*mini-batch*) invece dell'intero dataset, rendendo l'addestramento più veloce.
- **Adam (Adaptive Moment Estimation)**: combina i vantaggi di più tecniche, adattando automaticamente la "velocità di apprendimento" per ciascun peso. È l'ottimizzatore di default in gran parte dei progetti moderni, per la sua robustezza e velocità di convergenza.
- **RMSprop**: simile ad Adam, spesso usato in architetture ricorrenti.

### 4.5 — CNN: Convolutional Neural Network

Le **CNN** sono l'architettura di riferimento per l'elaborazione di **immagini**. A differenza di un MLP, che tratterebbe ogni pixel come un input indipendente (perdendo ogni informazione spaziale), le CNN usano **filtri convoluzionali** che scorrono sull'immagine per riconoscere pattern locali — bordi, texture, forme — indipendentemente da dove si trovano nell'immagine.

**I componenti chiave:**
- **Livello convoluzionale (Conv2D)**: applica filtri che estraggono feature locali (es. bordi orizzontali, angoli).
- **Livello di pooling (es. MaxPooling)**: riduce la dimensione dell'immagine elaborata, mantenendo le informazioni più rilevanti e riducendo il carico computazionale.
- **Livelli finali densi (fully connected)**: combinano le feature estratte per produrre la classificazione finale.

Strati convoluzionali successivi imparano gerarchie di feature sempre più astratte: i primi strati riconoscono bordi semplici, quelli intermedi forme più complesse, quelli finali oggetti interi (es. "occhio", "volto").

### 4.6 — RNN, LSTM e GRU: reti per dati sequenziali

Le CNN eccellono con dati spazialmente strutturati (immagini); ma per dati **sequenziali** — testo, serie temporali, audio — dove l'ordine conta e ogni elemento dipende dal contesto precedente, servono architetture diverse.

**RNN (Recurrent Neural Network)**: a differenza di un MLP, una RNN mantiene una sorta di "memoria" (stato nascosto) che si aggiorna a ogni elemento della sequenza, permettendo alla rete di tenere conto del contesto precedente.

**Il problema del vanishing gradient**: le RNN "semplici" faticano a mantenere informazioni rilevanti su sequenze lunghe, perché il gradiente calcolato durante la backpropagation tende a "svanire" (diventare vicino a zero) attraversando molti passaggi temporali, rendendo l'apprendimento delle dipendenze a lungo termine molto difficile.

**LSTM (Long Short-Term Memory)** e **GRU (Gated Recurrent Unit)**: varianti delle RNN progettate specificamente per risolvere questo problema, introducendo dei meccanismi a "porte" (*gate*) che regolano esplicitamente quali informazioni mantenere, aggiornare o dimenticare lungo la sequenza. LSTM è la più potente e complessa; GRU è una versione semplificata, spesso altrettanto efficace ma più leggera dal punto di vista computazionale.

> 💡 Le architetture ricorrenti sono state per anni lo standard per l'elaborazione del linguaggio naturale, prima dell'avvento dei **Transformer** (Modulo 9), che le hanno in gran parte sostituite nei moderni LLM grazie alla capacità di elaborare intere sequenze in parallelo invece che elemento per elemento. Conoscerle resta comunque fondamentale per capire *perché* i Transformer hanno rappresentato un salto in avanti così significativo.

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — Funzione di attivazione giusta per il problema**
Una rete che deve classificare un'immagine come "gatto" o "non gatto" userà una Sigmoid nell'output layer (output singolo tra 0 e 1); una rete che deve riconoscere 10 categorie di oggetti userà Softmax (distribuzione di probabilità su 10 classi).

**Esempio 2 — CNN per il riconoscimento di cifre scritte a mano**
Il dataset MNIST (immagini 28x28 di cifre da 0 a 9) è l'esempio didattico per eccellenza: una piccola CNN raggiunge facilmente oltre il 98% di accuratezza, dove un MLP semplice, pur funzionando, richiede più parametri per risultati simili perché non sfrutta la struttura spaziale dell'immagine.

**Esempio 3 — LSTM per la previsione di serie temporali**
Un sistema che prevede il consumo energetico di un edificio ora per ora usa una LSTM proprio perché il consumo attuale dipende fortemente dal pattern delle ore (e dei giorni) precedenti — una relazione che un modello "senza memoria" non potrebbe catturare.

**Esempio 4 — Vanishing gradient in pratica**
Una RNN semplice addestrata a prevedere l'ultima parola di un testo lungo, basandosi su un'informazione fornita nella prima frase, tende a "dimenticare" quell'informazione col progredire della sequenza — è esattamente il problema che LSTM e GRU sono state progettate per risolvere.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** costruire, addestrare e valutare due reti neurali distinte con TensorFlow/Keras: un MLP su dati tabellari e una CNN su immagini.

**Setup:** installa TensorFlow nel tuo ambiente: `pip install tensorflow`, aggiornando `requirements.txt`.

**Parte 1 — MLP (30-40 minuti):**

```python
import tensorflow as tf
from tensorflow import keras

modello = keras.Sequential([
    keras.layers.Dense(64, activation="relu", input_shape=(n_feature,)),
    keras.layers.Dense(32, activation="relu"),
    keras.layers.Dense(1, activation="sigmoid")  # classificazione binaria
])

modello.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

storia = modello.fit(X_train, y_train, epochs=20, validation_split=0.2)
modello.evaluate(X_test, y_test)
```

Usa il dataset preparato nei Moduli 5-6 e confronta le prestazioni dell'MLP con quelle del classificatore scikit-learn del Modulo 6: è sempre migliore la rete neurale? In quali condizioni no?

**Parte 2 — CNN su immagini (40-50 minuti):**

```python
from tensorflow.keras.datasets import mnist

(X_train, y_train), (X_test, y_test) = mnist.load_data()
X_train, X_test = X_train / 255.0, X_test / 255.0  # normalizzazione

modello_cnn = keras.Sequential([
    keras.layers.Reshape((28, 28, 1), input_shape=(28, 28)),
    keras.layers.Conv2D(32, (3, 3), activation="relu"),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation="relu"),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dense(10, activation="softmax")  # 10 classi (cifre 0-9)
])

modello_cnn.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
modello_cnn.fit(X_train, y_train, epochs=5, validation_split=0.1)
modello_cnn.evaluate(X_test, y_test)
```

**Verifica:** traccia il grafico di loss e accuracy per training e validation set (`storia.history`), individuando eventuali segnali di overfitting — un tema già affrontato nel Modulo 6, che qui riprende importanza centrale.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Normalizza sempre i dati di input (es. pixel divisi per 255) prima di addestrare una rete neurale: velocizza e stabilizza l'apprendimento.
- ✅ Parti da architetture semplici (poche unità, pochi strati) e aumenta la complessità solo se necessario, monitorando sempre il rischio di overfitting.
- ✅ Usa Adam come ottimizzatore di default: è una scelta robusta per la maggior parte dei problemi.
- ✅ Traccia sempre l'andamento di loss e accuracy su training **e** validation set durante l'addestramento, non solo il risultato finale.
- ✅ Usa CNN per dati con struttura spaziale (immagini), architetture ricorrenti (o Transformer, Modulo 9) per dati sequenziali: la scelta dell'architettura deve rispecchiare la natura del dato.
- ✅ Usa tecniche come **Dropout** e **Early Stopping** (che approfondirai nel Modulo 10) per contrastare l'overfitting nelle reti profonde.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Dimenticare la normalizzazione dei dati di input**: reti neurali addestrate su dati non normalizzati convergono molto più lentamente, o non convergono affatto.
- ❌ **Usare un MLP per immagini invece di una CNN**: funziona, ma richiede molti più parametri e ignora la struttura spaziale, con prestazioni generalmente peggiori.
- ❌ **Confondere epoch e batch**: un *epoch* è un passaggio completo su tutto il dataset di training; un *batch* è un piccolo sottoinsieme di dati usato per un singolo aggiornamento dei pesi.
- ❌ **Usare Sigmoid negli hidden layer di reti profonde**, favorendo il vanishing gradient: ReLU è quasi sempre la scelta migliore per gli strati intermedi.
- ❌ **Addestrare per troppe epoch senza monitorare la validation loss**, causando overfitting severo — un errore analogo a quello già visto nel Modulo 6 con gli alberi decisionali troppo profondi.
- ❌ **Sottovalutare il tempo di addestramento**: le reti profonde, specie le CNN su immagini, possono richiedere molto più tempo dei modelli scikit-learn del Modulo 6; è normale e va pianificato.

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai aperto il Livello Avanzato del Master entrando nel cuore del Deep Learning: la struttura del **neurone artificiale** e delle reti multistrato, il meccanismo di apprendimento basato su **Gradient Descent** e **Backpropagation**, le **funzioni di attivazione** e gli **ottimizzatori** più diffusi. Hai poi conosciuto due grandi famiglie di architetture specializzate: le **CNN** per dati spazialmente strutturati come le immagini, e le **RNN/LSTM/GRU** per dati sequenziali, comprendendo anche il problema del vanishing gradient e come le architetture "a porte" lo risolvano.

Queste basi sono indispensabili per il prossimo modulo, il **Modulo 9 (Transformer)**, dove scoprirai come un'architettura radicalmente diversa dalle RNN abbia reso possibile l'elaborazione parallela delle sequenze, aprendo la strada ai moderni Large Language Model.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **Neurone artificiale** | Unità di calcolo che combina input pesati e applica una funzione di attivazione |
| **Multi-Layer Perceptron (MLP)** | Rete neurale composta da input layer, uno o più hidden layer e output layer |
| **Funzione di attivazione** | Funzione non lineare applicata all'output di un neurone (es. ReLU, Sigmoid, Softmax) |
| **Funzione di perdita (Loss)** | Misura di quanto le previsioni della rete si discostano dai valori reali |
| **Gradient Descent** | Algoritmo di ottimizzazione che aggiorna i pesi nella direzione che riduce la loss |
| **Backpropagation** | Meccanismo che calcola il contributo di ciascun peso all'errore, propagandolo dall'output verso l'input |
| **Epoch** | Un passaggio completo di addestramento su tutto il dataset di training |
| **Batch** | Un sottoinsieme di dati usato per un singolo aggiornamento dei pesi |
| **Ottimizzatore** | Algoritmo che determina come aggiornare i pesi durante l'addestramento (es. Adam, SGD) |
| **CNN (Convolutional Neural Network)** | Architettura specializzata nell'elaborazione di dati con struttura spaziale, come le immagini |
| **Convoluzione** | Operazione che applica un filtro per estrarre feature locali da un'immagine |
| **Pooling** | Operazione che riduce la dimensione dei dati elaborati, mantenendo le informazioni più rilevanti |
| **RNN (Recurrent Neural Network)** | Architettura per dati sequenziali, dotata di uno stato nascosto che mantiene memoria del contesto |
| **Vanishing gradient** | Fenomeno per cui il gradiente diventa troppo piccolo per aggiornare efficacemente i pesi, specie su sequenze lunghe |
| **LSTM / GRU** | Varianti delle RNN con meccanismi a "porte" per gestire meglio le dipendenze a lungo termine |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. Cosa fa una funzione di attivazione in un neurone artificiale?**
- A) Riduce il numero di neuroni della rete
- B) Introduce non linearità, permettendo alla rete di modellare relazioni complesse ✅
- C) Divide il dataset in training e test set
- D) Elimina automaticamente i dati mancanti

**2. Cosa fa la Backpropagation?**
- A) Genera nuovi dati di addestramento
- B) Calcola il contributo di ciascun peso all'errore, propagandolo dall'output layer verso l'input layer ✅
- C) Normalizza i dati di input
- D) Sceglie automaticamente l'architettura della rete

**3. Quale ottimizzatore è generalmente considerato una scelta robusta di default per la maggior parte dei problemi?**
- A) SGD puro senza varianti
- B) Adam ✅
- C) Softmax
- D) ReLU

**4. Perché le CNN sono particolarmente adatte all'elaborazione di immagini?**
- A) Perché ignorano completamente la struttura spaziale dei dati
- B) Perché usano filtri convoluzionali che riconoscono pattern locali indipendentemente dalla loro posizione nell'immagine ✅
- C) Perché non richiedono alcuna funzione di attivazione
- D) Perché funzionano solo con immagini in bianco e nero

**5. A cosa serve un livello di pooling in una CNN?**
- A) Ad aumentare il numero di canali colore dell'immagine
- B) A ridurre la dimensione dei dati elaborati, mantenendo le informazioni più rilevanti ✅
- C) A calcolare la funzione di perdita
- D) A convertire l'immagine in formato JSON

**6. Cosa distingue una RNN da un MLP tradizionale?**
- A) La RNN non usa funzioni di attivazione
- B) La RNN mantiene uno stato nascosto che le permette di tenere conto del contesto precedente in una sequenza ✅
- C) La RNN funziona solo con immagini
- D) La RNN non richiede addestramento

**7. Cos'è il problema del vanishing gradient?**
- A) Il gradiente diventa troppo grande e la rete diverge immediatamente
- B) Il gradiente diventa troppo piccolo attraversando molti passaggi temporali, rendendo difficile apprendere dipendenze a lungo termine ✅
- C) Il dataset di training è troppo piccolo per addestrare la rete
- D) La funzione di perdita non converge mai a zero

**8. Perché LSTM e GRU sono state introdotte rispetto alle RNN semplici?**
- A) Per ridurre il numero di parametri del modello a zero
- B) Per eliminare completamente la necessità di una funzione di attivazione
- C) Per gestire meglio le dipendenze a lungo termine tramite meccanismi a "porte" che regolano il flusso delle informazioni ✅
- D) Per sostituire completamente il Gradient Descent

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo

**Consegna:** Costruisci e confronta due reti neurali su un problema a tua scelta, documentando il processo in un notebook `deep_learning_lab.ipynb`:

1. Scegli un problema di classificazione con dati **tabellari** (es. il dataset preparato nei Moduli 5-6) e uno con dati **a struttura spaziale o sequenziale** (immagini, testo semplice, o una serie temporale).
2. Per il primo, costruisci un **MLP** con Keras; per il secondo, costruisci una **CNN** o una **rete ricorrente (LSTM/GRU)**, a seconda della natura del dato.
3. Per entrambi i modelli: traccia i grafici di loss e accuracy su training e validation, individua eventuali segnali di overfitting, e confronta le prestazioni finali sul test set.
4. Scrivi una sintesi conclusiva (almeno 10 righe) che confronti le prestazioni ottenute con Deep Learning rispetto al classificatore scikit-learn costruito nel Modulo 6 sullo stesso tipo di dato, motivando quale approccio preferiresti in un contesto reale e perché.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `guida_setup_tensorflow.md` — Guida all'installazione di TensorFlow/Keras (CPU e, se disponibile, GPU) nel tuo ambiente locale
- 📄 `mlp_cnn_soluzione.ipynb` — Notebook soluzione commentato del laboratorio (MLP + CNN)
- 📄 `cheatsheet_keras_layers.md` — Riassunto sintattico dei principali layer Keras (Dense, Conv2D, LSTM, GRU, ecc.)
- 📄 `glossario_visuale_deep_learning.md` — Schemi e diagrammi di riepilogo delle architetture viste nel modulo

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Goodfellow, I., Bengio, Y., Courville, A. — *Deep Learning*, MIT Press
- Géron, A. — *Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow*, O'Reilly Media
- Chollet, F. — *Deep Learning with Python* (creatore di Keras), Manning Publications
- Hochreiter, S., Schmidhuber, J. — *Long Short-Term Memory*, Neural Computation

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale TensorFlow/Keras: keras.io e tensorflow.org
- 3Blue1Brown — serie video sulle reti neurali (spiegazione visiva di Gradient Descent e Backpropagation): 3blue1brown.com
- Distill.pub — articoli interattivi sul funzionamento delle reti neurali: distill.pub
- CS231n (Stanford) — Convolutional Neural Networks for Visual Recognition: cs231n.stanford.edu

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Prosegui con il Modulo 9: Transformer]**
