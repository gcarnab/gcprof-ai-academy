<a id="top"></a>

# 📘 Modulo 6: Machine Learning
**Livello Intermedio (parte 2) — Master in Intelligenza Artificiale | GCProf Academy**

· 🕒 Tempo stimato: 10-12 ore · 🎯 Difficoltà: Intermedio-Avanzato

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

Sei arrivato al modulo che dà il nome a gran parte di questo settore: il **Machine Learning**. Tutto quello che hai costruito finora — l'ambiente Python professionale (Modulo 4) e il dataset pulito e arricchito (Modulo 5) — converge qui, nel momento in cui un algoritmo impara autonomamente un pattern dai dati, invece di seguire regole scritte a mano da un programmatore.

È una differenza concettuale enorme rispetto alla programmazione "tradizionale". Se dovessi scrivere un programma classico per riconoscere se uno studente è a rischio di abbandono scolastico, dovresti codificare a mano decine di regole ("se le assenze superano X e la media è sotto Y, allora..."). Con il Machine Learning, invece, mostri all'algoritmo migliaia di casi passati (con l'esito reale) e lascia che sia lui a scoprire i pattern — spesso più sottili e accurati di quanto un essere umano riuscirebbe a formalizzare esplicitamente.

In questo modulo userai **scikit-learn**, la libreria Python più diffusa per il Machine Learning "classico" (non basato su reti neurali profonde, che affronterai nel Livello Avanzato). Imparerai le due grandi famiglie di apprendimento — supervisionato e non supervisionato —, il reinforcement learning, e soprattutto imparerai a **validare correttamente** un modello: costruire un classificatore che sembra funzionare è facile, costruirne uno che funzioni davvero anche su dati mai visti prima è la vera competenza da acquisire qui.

Questo modulo chiude il Livello Intermedio: il Project Work finale ti chiederà di costruire, con approccio OOP, un classificatore ML completo e funzionante.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Distinguere **apprendimento supervisionato, non supervisionato e per rinforzo**, riconoscendo a quale categoria appartiene un dato problema.
- ✅ Dividere correttamente un dataset in **training set e test set** (e capire perché non farlo è un errore grave).
- ✅ Addestrare un modello di **classificazione** e uno di **regressione** con scikit-learn.
- ✅ Applicare tecniche di **validation**, inclusa la **cross-validation**, per stimare in modo affidabile le prestazioni di un modello.
- ✅ Calcolare e interpretare le principali **metriche di valutazione** (accuracy, precision, recall, F1-score, RMSE).
- ✅ Riconoscere e prevenire **overfitting e underfitting**.
- ✅ Applicare almeno un algoritmo di **clustering** non supervisionato (K-Means).
- ✅ Incapsulare un intero flusso di Machine Learning in una classe Python, riutilizzando le competenze OOP del Modulo 4.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato **Modulo 4 (Python per AI)** e **Modulo 5 (Data Analysis)**: questo modulo presuppone piena familiarità con Pandas, NumPy e OOP, e riutilizza direttamente il dataset preparato nel Modulo 5.
- Nessuna conoscenza pregressa di statistica avanzata o algebra lineare è obbligatoria, ma un minimo di dimestichezza con concetti come media, percentuale e proporzione aiuta a interpretare le metriche.

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Le tre grandi famiglie del Machine Learning

**Apprendimento Supervisionato (Supervised Learning)**
Il modello impara da esempi **etichettati**: per ogni input, conosciamo già l'output corretto (es. per ogni studente, sappiamo se ha superato o meno l'esame). Si divide in:
- **Classificazione**: l'output è una categoria (es. "promosso" / "non promosso").
- **Regressione**: l'output è un valore numerico continuo (es. il voto finale previsto).

**Apprendimento Non Supervisionato (Unsupervised Learning)**
Il modello lavora su dati **senza etichette**, cercando pattern o strutture nascoste da solo. L'esempio più comune è il **clustering**: raggruppare automaticamente osservazioni simili tra loro (es. raggruppare studenti in base a stile di studio e rendimento, senza sapere a priori quali gruppi esistano).

**Apprendimento per Rinforzo (Reinforcement Learning)**
Un **agente** impara interagendo con un ambiente, ricevendo **ricompense** o **penalità** in base alle azioni compiute, con l'obiettivo di massimizzare la ricompensa cumulativa nel tempo. È il paradigma dietro sistemi che giocano a scacchi o Go a livello sovraumano, e dietro molte tecniche moderne di allineamento degli LLM. In questo modulo lo trattiamo solo concettualmente; lo riprenderai nei moduli avanzati del Master.

### 4.2 — Train/Test Split: la regola d'oro della validazione

L'errore più grave (e più comune tra chi inizia) nel Machine Learning è **valutare un modello sugli stessi dati con cui è stato addestrato**. Un modello può "memorizzare" i dati di training e sembrare perfetto, per poi fallire completamente su dati nuovi.

La soluzione è dividere il dataset:

```python
from sklearn.model_selection import train_test_split

X = df.drop(columns=["promosso"])  # feature (variabili indipendenti)
y = df["promosso"]                 # target (variabile da predire)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

- `X_train`, `y_train` (tipicamente 70-80% dei dati): usati per **addestrare** il modello.
- `X_test`, `y_test` (il restante 20-30%): usati **solo alla fine**, per valutare come il modello si comporta su dati mai visti.
- `random_state`: fissa la casualità della divisione, per rendere l'esperimento riproducibile.

### 4.3 — Addestrare un modello con scikit-learn

Tutti i modelli di scikit-learn seguono la stessa interfaccia OOP, coerente con quanto visto nel Modulo 4:

```python
from sklearn.tree import DecisionTreeClassifier

modello = DecisionTreeClassifier(max_depth=4, random_state=42)  # costruttore
modello.fit(X_train, y_train)                                   # addestramento
previsioni = modello.predict(X_test)                             # inferenza
```

Un modello di **regressione** segue esattamente la stessa logica, cambiando solo l'algoritmo:

```python
from sklearn.linear_model import LinearRegression

modello_reg = LinearRegression()
modello_reg.fit(X_train, y_train)
previsioni_voto = modello_reg.predict(X_test)
```

> 💡 Nota come questa interfaccia (`__init__`, `.fit()`, `.predict()`) sia esattamente il concetto di classe/oggetto/metodo che hai visto nel Modulo 4: `modello` è un oggetto, `fit` e `predict` sono metodi.

### 4.4 — Metriche di valutazione

**Per la classificazione:**

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

accuracy_score(y_test, previsioni)   # % di previsioni corrette
precision_score(y_test, previsioni)  # tra i "promossi" previsti, quanti lo erano davvero
recall_score(y_test, previsioni)     # tra i "promossi" reali, quanti sono stati individuati
f1_score(y_test, previsioni)         # media armonica tra precision e recall
confusion_matrix(y_test, previsioni) # tabella dettagliata veri/falsi positivi e negativi
```

| Metrica | Domanda a cui risponde |
|---|---|
| **Accuracy** | Su tutte le previsioni, quante sono corrette? |
| **Precision** | Quando il modello dice "sì", quanto è affidabile? |
| **Recall** | Il modello riesce a trovare tutti i casi positivi reali? |
| **F1-score** | Bilanciamento tra precision e recall in un unico numero |

⚠️ L'accuracy da sola può ingannare: in un dataset dove il 95% degli studenti è promosso, un modello che prevede sempre "promosso" ottiene il 95% di accuracy senza aver imparato nulla di utile. Per questo, in problemi con classi sbilanciate, precision, recall e F1 sono spesso più informative.

**Per la regressione:**

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

mae = mean_absolute_error(y_test, previsioni_voto)
rmse = np.sqrt(mean_squared_error(y_test, previsioni_voto))
r2 = r2_score(y_test, previsioni_voto)
```

- **MAE**: errore medio assoluto, nella stessa unità del target (es. punti voto).
- **RMSE**: penalizza maggiormente gli errori grandi.
- **R²**: quanta della variabilità del target è "spiegata" dal modello (1 = perfetto, 0 = non meglio di una media costante).

### 4.5 — Overfitting, Underfitting e Cross-Validation

- **Overfitting**: il modello impara "a memoria" i dati di training (incluso il rumore), ottenendo ottime prestazioni sul training set ma pessime sul test set. Sintomo tipico: accuracy training molto alta, accuracy test molto più bassa.
- **Underfitting**: il modello è troppo semplice per catturare i pattern nei dati, ottenendo prestazioni scarse sia su training che su test.

**La cross-validation** è una tecnica più robusta del semplice train/test split: divide i dati in *k* parti (fold), addestra e valuta il modello *k* volte, usando ogni volta un fold diverso come test, e restituisce la media delle prestazioni — una stima molto più affidabile.

```python
from sklearn.model_selection import cross_val_score

punteggi = cross_val_score(modello, X, y, cv=5, scoring="accuracy")
print(punteggi)
print("Accuracy media:", punteggi.mean())
```

**Strategie per prevenire l'overfitting:**
- Limitare la complessità del modello (es. `max_depth` in un albero decisionale).
- Aumentare la quantità di dati di training, quando possibile.
- Usare tecniche di **regolarizzazione** (approfondite nel Livello Avanzato).
- Verificare sempre le prestazioni con cross-validation, non con un singolo split.

### 4.6 — Un assaggio di apprendimento non supervisionato: K-Means

```python
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3, random_state=42)
df["cluster"] = kmeans.fit_predict(X)
```

K-Means raggruppa automaticamente le osservazioni in *k* cluster, basandosi sulla loro somiglianza (distanza) nello spazio delle feature — utile, ad esempio, per segmentare studenti o clienti senza avere etichette predefinite.

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — Classificazione**
Un istituto scolastico vuole prevedere, a metà anno, quali studenti sono a rischio di non essere ammessi all'esame, in base a assenze, media parziale e partecipazione. È un problema di **classificazione binaria supervisionata**.

**Esempio 2 — Regressione**
Un'agenzia immobiliare vuole stimare il prezzo di vendita di un appartamento in base a metratura, posizione e numero di stanze: è un problema di **regressione**, perché il target è un valore continuo (il prezzo).

**Esempio 3 — Overfitting reale**
Un albero decisionale senza limiti di profondità (`max_depth=None`) può crescere fino a "memorizzare" ogni singolo esempio del training set, ottenendo il 100% di accuracy in training ma solo il 60% in test: un classico segnale di overfitting da correggere limitando la profondità dell'albero.

**Esempio 4 — Clustering**
Una scuola vuole individuare gruppi naturali di studenti in base a stile di apprendimento e orario di studio preferito, senza avere categorie predefinite: è un caso tipico di **clustering non supervisionato**.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** costruire, addestrare e valutare correttamente un modello di classificazione, riutilizzando il dataset preparato nel Modulo 5.

**Setup:** installa scikit-learn nel tuo ambiente: `pip install scikit-learn`, aggiornando `requirements.txt`.

**Attività (in notebook `.ipynb`, 60-90 minuti):**

1. Carica `dataset_pronto_ml.csv` (prodotto nel Modulo 5) o un dataset equivalente a tua scelta.
2. Definisci chiaramente feature (X) e target (y) — se il tuo dataset non ha ancora una colonna target adatta a un problema di classificazione, creane una con `pd.cut()` o una condizione logica (es. `promosso = media_generale >= 6`).
3. Esegui il **train/test split** (80/20).
4. Addestra **due modelli diversi** di classificazione (es. `DecisionTreeClassifier` e `LogisticRegression`), confrontandone le prestazioni.
5. Calcola per entrambi **accuracy, precision, recall, F1-score** e la **matrice di confusione**.
6. Esegui una **cross-validation a 5 fold** sul modello migliore e confronta il risultato con il singolo train/test split.
7. Verifica la presenza di overfitting confrontando l'accuracy sul training set e sul test set.

**Verifica:** il notebook deve concludersi con una breve valutazione (in Markdown) di quale modello preferiresti in produzione e perché, motivando la scelta con le metriche calcolate.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ **Non valutare mai** un modello sugli stessi dati usati per addestrarlo.
- ✅ Usa `random_state` fisso per rendere gli esperimenti riproducibili e confrontabili.
- ✅ Preferisci la cross-validation a un singolo split quando il dataset non è enorme.
- ✅ Scegli la metrica in base al problema reale: in ambito medico un falso negativo può essere molto più grave di un falso positivo (privilegia il recall); in altri contesti vale il contrario.
- ✅ Parti sempre da un modello semplice (es. regressione logistica, albero decisionale) come baseline, prima di provare modelli più complessi.
- ✅ Confronta sempre le prestazioni su training e test set: è il modo più rapido per accorgersi di overfitting.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Applicare normalizzazione/standardizzazione su tutto il dataset prima dello split** (calcolando media e deviazione standard anche sul test set): è una forma di *data leakage* che falsa la valutazione. Il preprocessing va "imparato" solo sul training set e poi applicato al test set.
- ❌ **Fidarsi della sola accuracy** su dataset con classi sbilanciate.
- ❌ **Confondere overfitting e underfitting**: prestazioni scarse sia in training che in test indicano underfitting, non overfitting.
- ❌ **Scegliere un modello complesso "perché suona più avanzato"**, senza confrontarlo con una baseline semplice: spesso un modello semplice ben validato batte uno complesso mal regolarizzato.
- ❌ **Ignorare la matrice di confusione**: due modelli con la stessa accuracy possono commettere errori molto diversi (es. uno favorisce falsi positivi, l'altro falsi negativi).
- ❌ **Non fissare `random_state`**, ottenendo risultati diversi (e non confrontabili) a ogni esecuzione.

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai costruito le competenze fondamentali del Machine Learning "classico": la distinzione tra apprendimento **supervisionato**, **non supervisionato** e **per rinforzo**; la regola d'oro del **train/test split**; l'addestramento di modelli di **classificazione** e **regressione** con scikit-learn; il calcolo e l'interpretazione delle principali **metriche di valutazione**; il riconoscimento e la prevenzione di **overfitting** tramite **cross-validation**; un primo assaggio di **clustering** non supervisionato con K-Means.

Con questo modulo si chiude il Livello Intermedio del Master. Nel Project Work finale metterai insieme tutto il percorso — dall'ambiente Python (Modulo 4), alla preparazione dati (Modulo 5), fino al modello stesso (questo modulo) — in un unico classificatore ML completo e orientato agli oggetti.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **Apprendimento supervisionato** | Paradigma ML in cui il modello impara da dati etichettati (input + output corretto) |
| **Apprendimento non supervisionato** | Paradigma ML in cui il modello trova pattern in dati privi di etichette |
| **Reinforcement Learning** | Paradigma ML in cui un agente impara tramite ricompense e penalità interagendo con un ambiente |
| **Classificazione** | Problema supervisionato in cui il target è una categoria discreta |
| **Regressione** | Problema supervisionato in cui il target è un valore numerico continuo |
| **Train/Test Split** | Divisione del dataset in una parte per l'addestramento e una per la valutazione del modello |
| **Overfitting** | Fenomeno per cui il modello "memorizza" i dati di training, perdendo capacità di generalizzazione |
| **Underfitting** | Fenomeno per cui il modello è troppo semplice per catturare i pattern nei dati |
| **Cross-validation** | Tecnica di validazione che ripete addestramento e valutazione su più suddivisioni (fold) del dataset |
| **Accuracy** | Percentuale di previsioni corrette sul totale |
| **Precision** | Percentuale di previsioni positive che sono effettivamente corrette |
| **Recall** | Percentuale di casi positivi reali correttamente individuati dal modello |
| **F1-score** | Media armonica tra precision e recall |
| **Clustering** | Tecnica non supervisionata per raggruppare osservazioni simili tra loro |
| **Data leakage** | Situazione in cui informazioni del test set influenzano indebitamente la fase di addestramento |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. Qual è la differenza principale tra apprendimento supervisionato e non supervisionato?**
- A) Il supervisionato usa solo numeri, il non supervisionato solo testo
- B) Il supervisionato apprende da dati etichettati, il non supervisionato cerca pattern in dati privi di etichette ✅
- C) Sono esattamente la stessa tecnica con nomi diversi
- D) Il non supervisionato richiede sempre reti neurali

**2. Perché è fondamentale dividere il dataset in training set e test set?**
- A) Per velocizzare l'addestramento del modello
- B) Per valutare il modello su dati mai visti durante l'addestramento, stimando la sua reale capacità di generalizzazione ✅
- C) Perché scikit-learn lo richiede obbligatoriamente per ogni algoritmo
- D) Per ridurre il numero di feature del dataset

**3. Cosa indica un'accuracy molto alta in training ma molto più bassa in test?**
- A) Underfitting
- B) Un errore nella metrica scelta
- C) Overfitting ✅
- D) Che il modello è pronto per la produzione

**4. Cosa misura la metrica "recall" in un problema di classificazione?**
- A) La percentuale di previsioni positive corrette
- B) La percentuale di casi positivi reali correttamente individuati dal modello ✅
- C) Il tempo impiegato dal modello per fare una previsione
- D) Il numero di feature usate dal modello

**5. Perché l'accuracy da sola può essere fuorviante su un dataset con classi fortemente sbilanciate?**
- A) Perché l'accuracy non è calcolabile su dataset sbilanciati
- B) Perché un modello che prevede sempre la classe maggioritaria può ottenere un'accuracy alta senza aver imparato nulla di utile ✅
- C) Perché l'accuracy considera solo i falsi positivi
- D) Perché l'accuracy richiede sempre un dataset bilanciato per essere calcolata

**6. Cosa permette di fare la cross-validation rispetto a un singolo train/test split?**
- A) Eliminare completamente la necessità di un test set
- B) Ottenere una stima più robusta delle prestazioni, ripetendo addestramento e valutazione su più suddivisioni dei dati ✅
- C) Addestrare il modello più velocemente
- D) Sostituire la scelta dell'algoritmo di Machine Learning

**7. Qual è un errore metodologico grave nel preprocessing dei dati per il Machine Learning?**
- A) Applicare normalizzazione o standardizzazione calcolando i parametri anche sul test set, causando data leakage ✅
- B) Applicare la normalizzazione solo sul training set
- C) Usare `random_state` fisso per la riproducibilità
- D) Calcolare la matrice di confusione dopo la valutazione

**8. Cosa fa l'algoritmo K-Means?**
- A) Addestra un classificatore supervisionato
- B) Raggruppa automaticamente le osservazioni in cluster simili, senza etichette predefinite ✅
- C) Calcola la matrice di confusione di un modello
- D) Divide il dataset in training e test set

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo — Project Work di Fine Livello Intermedio

**Consegna:** Costruisci un **Classificatore ML completo**, sviluppato in Python con approccio a oggetti, che rappresenta la sintesi di tutto il Livello Intermedio.

Requisiti minimi:

1. **Struttura del progetto** (coerente con il Modulo 4): ambiente virtuale, `requirements.txt`, codice organizzato in più file (`preprocessing.py`, `modello.py`, `main.py`).
2. **Dataset**: riutilizza `dataset_pronto_ml.csv` prodotto nel Modulo 5, oppure un dataset equivalente a tua scelta, con un problema di classificazione chiaro.
3. **Classe `ClassificatoreML`** (o nome equivalente) che, seguendo i principi OOP del Modulo 4:
   - riceve il dataset nel costruttore;
   - espone un metodo `prepara_dati()` che applica lo split train/test e il preprocessing necessario;
   - espone un metodo `addestra(algoritmo)` che addestra il modello scelto;
   - espone un metodo `valuta()` che calcola e restituisce almeno accuracy, precision, recall, F1-score e matrice di confusione;
   - espone un metodo `valida_incrociata(k=5)` che esegue la cross-validation.
4. **Confronto tra almeno due algoritmi** di classificazione, con una motivazione scritta (in un file `README.md` o in celle Markdown) della scelta finale.
5. **Verifica esplicita di overfitting**, confrontando le prestazioni su training e test set.

Questo classificatore rappresenta la chiusura del Livello Intermedio del Master: dimostra la capacità di portare un progetto AI dall'ambiente di sviluppo, alla preparazione dei dati, fino a un modello validato correttamente — competenza professionale richiesta a qualsiasi AI Engineer junior.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `dataset_pronto_ml.csv` — Dataset di esempio già pulito e arricchito (continuità con il Modulo 5)
- 📄 `classificatore_ml_soluzione.py` — Soluzione commentata del Project Work, con classe `ClassificatoreML`
- 📄 `cheatsheet_sklearn.md` — Riassunto sintattico delle funzioni scikit-learn più usate (split, modelli, metriche, cross-validation)
- 📄 `tabella_metriche_guida.md` — Guida rapida a quale metrica scegliere in base al problema

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Géron, A. — *Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow*, O'Reilly Media
- Bishop, C. M. — *Pattern Recognition and Machine Learning*, Springer
- James, G., Witten, D., Hastie, T., Tibshirani, R. — *An Introduction to Statistical Learning*, Springer
- Pedregosa, F. et al. — *Scikit-learn: Machine Learning in Python*, Journal of Machine Learning Research

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale scikit-learn: scikit-learn.org/stable
- Scikit-learn — Guida alla scelta del modello (Choosing the right estimator): scikit-learn.org/stable/machine_learning_map.html
- Kaggle Learn — corsi introduttivi gratuiti su ML: kaggle.com/learn
- Google Machine Learning Crash Course: developers.google.com/machine-learning/crash-course

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Hai completato il Livello Intermedio! Prosegui con il Livello Avanzato — Modulo 7: Prompt Engineering Avanzato]**
