# 🟩 MODULO 1 — Apprendimento Supervisionato

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent · Percorso ispirato al programma "Laboratorio pratico di Machine Learning e sviluppo di AI Agent" · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [1.1 Dal problema alla predizione: classificazione vs regressione](#sez-1-1)
2. [1.2 Perché dividiamo i dati in train e test](#sez-1-2)
3. [🐍 Laboratorio Python 1.1 — Caricare ed esplorare il dataset Wine](#lab-1-1)
4. [🐍 Laboratorio Python 1.2 — Suddividere in train e test con `stratify`](#lab-1-2)
5. [1.3 L'algoritmo k-Nearest Neighbors](#sez-1-3)
6. [🐍 Laboratorio Python 1.3 — Addestrare e valutare il primo classificatore KNN](#lab-1-3)
7. [1.4 Overfitting, underfitting e la scelta di k](#sez-1-4)
8. [🐍 Laboratorio Python 1.4 — La curva di accuratezza al variare di k](#lab-1-4)
9. [1.5 Data leakage: l'errore da evitare sempre](#sez-1-5)
10. [🍷 Progetto Guidato — Classificare le cultivar di vino dall'analisi chimica](#progetto)
11. [Best Practice del modulo](#best-practice)
12. [Errori comuni](#errori-comuni)
13. [Glossario del modulo](#glossario)
14. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- distinguere un problema di **classificazione** da uno di **regressione**, e riconoscere a quale dei due appartiene un dataset;
- spiegare perché un modello va sempre valutato su dati che non ha mai visto in addestramento;
- usare `train_test_split` con il parametro `stratify` per creare una suddivisione train/test corretta;
- spiegare il funzionamento dell'algoritmo **k-Nearest Neighbors (KNN)** passo per passo;
- addestrare, valutare e interpretare un classificatore KNN con scikit-learn;
- riconoscere **overfitting** e **underfitting** osservando la curva di accuratezza al variare di `k`;
- evitare l'errore più comune nel Machine Learning applicato: il **data leakage**.

---

<a id="sez-1-1"></a>
# 1.1 Dal problema alla predizione: classificazione vs regressione

[⬆ Torna all'indice del modulo](#indice-modulo)

Ogni problema di apprendimento supervisionato parte dalla stessa domanda: *dato un insieme di esempi già etichettati, come faccio a prevedere l'etichetta di un esempio nuovo?* La natura dell'etichetta da prevedere divide il problema in due grandi famiglie.

> **Definizione**
>
> Un problema di **classificazione** prevede un'etichetta appartenente a un insieme finito di categorie (es. "cultivar A / B / C", "spam / non spam"). Un problema di **regressione** prevede invece un valore numerico continuo (es. il prezzo di una casa, la temperatura di domani).

In questo modulo lavoreremo su un problema di classificazione: a partire dall'analisi chimica di un vino, vogliamo prevedere a quale delle tre cultivar appartiene. Il "modello che impara a classificare" è il primo mattone dello schema che hai visto nel Modulo 0.

> 💡 **Approfondimento**
>
> La stessa domanda — "quale algoritmo uso?" — dipende quasi sempre dalla natura dell'etichetta, non dalla complessità del problema. Molti algoritmi (tra cui KNN, che vedremo tra poco) hanno una versione per la classificazione e una per la regressione: la logica di fondo è identica, cambia solo cosa restituisce il modello alla fine.

---

<a id="sez-1-2"></a>
# 1.2 Perché dividiamo i dati in train e test

[⬆ Torna all'indice del modulo](#indice-modulo)

Se addestrassimo un modello e lo valutassimo sugli stessi identici dati usati per l'addestramento, staremmo commettendo un errore simile a farsi correggere un compito da chi ha già visto le soluzioni: il punteggio non ci direbbe nulla sulla capacità del modello di funzionare su casi nuovi.

Per questo, prima di addestrare qualsiasi modello, dividiamo sempre il dataset in due parti:

- **train set**: i dati che il modello vede durante l'addestramento;
- **test set**: i dati che il modello non vede mai fino al momento della valutazione finale.

> ⚠️ **Attenzione**
>
> Una suddivisione casuale può, per sfortuna, sbilanciare le classi tra train e test (es. finire con quasi tutti gli esempi di una cultivar nel test set). Per questo useremo il parametro `stratify`, che garantisce che ogni classe sia rappresentata nelle stesse proporzioni sia nel train che nel test set.

---

<a id="lab-1-1"></a>
# 🐍 Laboratorio Python 1.1 — Caricare ed esplorare il dataset Wine

[⬆ Torna all'indice del modulo](#indice-modulo)

Lavoreremo sul dataset **Wine**, incluso direttamente in scikit-learn: 178 vini italiani, ciascuno descritto da 13 misurazioni chimiche (alcol, acido malico, magnesio, flavonoidi, intensità del colore...) ed etichettato con la cultivar di provenienza (0, 1 o 2). Essendo già integrato nella libreria, non serve alcun upload: è l'esempio concreto di quanto anticipato nel Modulo 0.

```python
# ============================================================
# ESERCIZIO 1.1 - Caricamento ed esplorazione del dataset Wine
# Obiettivo: caricare il dataset, trasformarlo in un DataFrame
#            pandas leggibile ed esplorarne la struttura.
# ============================================================

from sklearn.datasets import load_wine
import pandas as pd

# load_wine() restituisce un oggetto "Bunch": un dizionario con
# i dati (data), le etichette (target) e i nomi delle colonne.
wine = load_wine()

# Costruiamo un DataFrame per lavorare più comodamente
df = pd.DataFrame(wine.data, columns=wine.feature_names)
df["cultivar"] = wine.target

print(f"Numero di esempi: {df.shape[0]}")
print(f"Numero di feature: {len(wine.feature_names)}")
print(f"\nDistribuzione delle cultivar (0, 1, 2):")
print(df["cultivar"].value_counts().sort_index())

df.head()
```

```python
# ============================================================
# ESERCIZIO 1.1 (continua) - Uno sguardo statistico alle feature
# Obiettivo: capire scala e distribuzione delle variabili, per
#            comprendere perché alcune feature "pesano" più di
#            altre in un algoritmo basato sulla distanza come KNN.
# ============================================================

print(df.describe().loc[["mean", "min", "max"]].T)
```

**Prova tu!** Osserva l'output di `describe()`: nota come `proline` arrivi a valori nell'ordine delle migliaia, mentre `hue` resta sotto l'unità. Terremo a mente questa differenza di scala quando parleremo di KNN nella sezione 1.3.

---

<a id="lab-1-2"></a>
# 🐍 Laboratorio Python 1.2 — Suddividere in train e test con `stratify`

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 1.2 - Suddivisione train/test stratificata
# Obiettivo: separare feature (X) ed etichette (y), poi dividere
#            in train e test mantenendo le proporzioni originali
#            delle tre cultivar grazie a stratify=y.
# ============================================================

from sklearn.model_selection import train_test_split

X = df.drop(columns="cultivar")   # tutte le feature chimiche
y = df["cultivar"]                # l'etichetta da prevedere

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.3,       # il 30% dei dati va al test set
    random_state=42,     # riproducibilità (vedi Modulo 0, sezione 0.5)
    stratify=y            # mantiene le proporzioni delle classi
)

print(f"Esempi nel train set: {X_train.shape[0]}")
print(f"Esempi nel test set:  {X_test.shape[0]}")
print(f"\nProporzioni cultivar nel train set:\n{y_train.value_counts(normalize=True).sort_index()}")
print(f"\nProporzioni cultivar nel test set:\n{y_test.value_counts(normalize=True).sort_index()}")
```

**Prova tu!** Rilancia la cella rimuovendo `stratify=y` e confronta le proporzioni: su un dataset piccolo come questo (178 esempi) la differenza tra le due strategie diventa visibile.

---

<a id="sez-1-3"></a>
# 1.3 L'algoritmo k-Nearest Neighbors

[⬆ Torna all'indice del modulo](#indice-modulo)

Il **k-Nearest Neighbors (KNN)** è probabilmente l'algoritmo di classificazione più intuitivo che esista: non costruisce una vera e propria "regola" durante l'addestramento, ma si limita a memorizzare tutti gli esempi del train set. Per classificare un nuovo esempio:

1. calcola la distanza tra il nuovo esempio e **tutti** gli esempi del train set (di solito la distanza euclidea);
2. individua i **k** esempi più vicini (i "vicini");
3. assegna al nuovo esempio la classe **più frequente** tra quei k vicini (voto a maggioranza).

> 💡 **Approfondimento**
>
> Proprio perché KNN si basa sulla distanza tra punti, le feature con scala numerica più ampia (ricordi `proline` nel Laboratorio 1.1?) finiscono per "dominare" il calcolo della distanza, anche se non sono le più informative. Per questo motivo, in un progetto reale, KNN va quasi sempre applicato dopo aver **normalizzato** le feature — una tecnica che approfondiremo nel Modulo 2, dove diventa protagonista assoluta.

---

<a id="lab-1-3"></a>
# 🐍 Laboratorio Python 1.3 — Addestrare e valutare il primo classificatore KNN

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 1.3 - Primo classificatore KNN
# Obiettivo: addestrare un KNN con k=5 sul train set e valutarne
#            l'accuratezza sul test set (dati mai visti prima).
# ============================================================

from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report

# Creiamo il classificatore con k=5 vicini
knn = KNeighborsClassifier(n_neighbors=5)

# "Addestramento": KNN si limita a memorizzare X_train e y_train
knn.fit(X_train, y_train)

# Prevediamo le classi sul test set, mai visto durante il fit
y_pred = knn.predict(X_test)

accuratezza = accuracy_score(y_test, y_pred)
print(f"Accuratezza sul test set: {accuratezza:.2%}\n")
print("Report dettagliato per classe:")
print(classification_report(y_test, y_pred, target_names=wine.target_names))
```

> ⚠️ **Attenzione**
>
> Un'accuratezza che ti sembra "troppo bassa" per questo dataset non è un errore di battitura: è proprio l'effetto della scala delle feature descritto nel box precedente. Lo risolveremo nel Laboratorio 1.4, dove confronteremo diversi valori di `k`, e lo affronteremo in modo sistematico con la normalizzazione nel Modulo 2.

---

<a id="sez-1-4"></a>
# 1.4 Overfitting, underfitting e la scelta di k

[⬆ Torna all'indice del modulo](#indice-modulo)

Il valore di `k` non è un dettaglio tecnico: è la scelta che determina quanto il modello sarà "rigido" o "flessibile".

> **Definizione**
>
> Si ha **overfitting** quando il modello impara troppo nel dettaglio i dati di train (rumore compreso), ottenendo un'accuratezza altissima in train ma bassa in test. Si ha **underfitting** quando il modello è troppo semplice per catturare i pattern nei dati, ottenendo un'accuratezza bassa sia in train che in test.

Con KNN, questo si traduce concretamente così:

- **k molto piccolo** (es. k=1): il modello segue ogni singolo punto del train set, anche quelli anomali → rischio di **overfitting**;
- **k molto grande**: il modello "media" su troppi vicini, appiattendo le differenze tra classi → rischio di **underfitting**.

---

<a id="lab-1-4"></a>
# 🐍 Laboratorio Python 1.4 — La curva di accuratezza al variare di k

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 1.4 - Curva di accuratezza train vs test al variare di k
# Obiettivo: visualizzare overfitting e underfitting confrontando
#            l'accuratezza in train e in test per diversi valori di k.
# ============================================================

import matplotlib.pyplot as plt

valori_k = range(1, 21)
accuratezza_train = []
accuratezza_test = []

for k in valori_k:
    modello = KNeighborsClassifier(n_neighbors=k)
    modello.fit(X_train, y_train)
    accuratezza_train.append(modello.score(X_train, y_train))
    accuratezza_test.append(modello.score(X_test, y_test))

plt.figure(figsize=(8, 5))
plt.plot(valori_k, accuratezza_train, marker="o", label="Accuratezza train")
plt.plot(valori_k, accuratezza_test, marker="o", label="Accuratezza test")
plt.xlabel("k (numero di vicini)")
plt.ylabel("Accuratezza")
plt.title("Overfitting vs underfitting al variare di k")
plt.legend()
plt.grid(alpha=0.3)
plt.show()
```

**Prova tu!** Individua sul grafico il punto in cui la curva di train è molto più alta di quella di test (overfitting, k piccoli) e quello in cui entrambe le curve scendono insieme (underfitting, k grandi). Il "punto giusto" di solito sta nella zona in cui le due curve sono vicine e alte.

---

<a id="sez-1-5"></a>
# 1.5 Data leakage: l'errore da evitare sempre

[⬆ Torna all'indice del modulo](#indice-modulo)

> ⚠️ **Attenzione**
>
> Il **data leakage** (fuga di informazioni) si verifica ogni volta che, in fase di addestramento o di preprocessing, il modello "vede" — anche indirettamente — informazioni provenienti dal test set. L'esempio più comune: calcolare medie, deviazioni standard o altri parametri di normalizzazione su **tutto** il dataset prima dello split, invece che solo sul train set. Il risultato è un modello che sembra funzionare benissimo in fase di valutazione, ma che crolla su dati davvero nuovi.

La regola pratica da ricordare per tutto il corso: **prima si divide, poi si calcola tutto il resto solo sul train set** (e si applicano al test set le stesse trasformazioni, senza mai ricalcolarle su di esso). La rispetteremo rigorosamente anche nel Modulo 2, quando introdurremo la normalizzazione delle feature.

---

<a id="progetto"></a>
# 🍷 Progetto Guidato — Classificare le cultivar di vino dall'analisi chimica

[⬆ Torna all'indice del modulo](#indice-modulo)

Metti insieme quanto visto nel modulo per rispondere a una domanda concreta: **quale caratteristica chimica, da sola, distingue meglio le tre cultivar di vino?**

```python
# ============================================================
# PROGETTO GUIDATO - Confronto tra feature singole
# Obiettivo: addestrare un KNN (k=5) usando una sola feature alla
#            volta, per capire quale variabile chimica è, da sola,
#            la più predittiva della cultivar.
# ============================================================

risultati = {}

for feature in wine.feature_names:
    # Usiamo una sola colonna alla volta (doppie parentesi quadre
    # per ottenere un DataFrame e non una Series)
    X_train_singola = X_train[[feature]]
    X_test_singola = X_test[[feature]]

    modello = KNeighborsClassifier(n_neighbors=5)
    modello.fit(X_train_singola, y_train)
    risultati[feature] = modello.score(X_test_singola, y_test)

# Ordiniamo le feature dalla più alla meno predittiva
classifica = pd.Series(risultati).sort_values(ascending=False)
print("Classifica delle feature per accuratezza (usata singolarmente):\n")
print(classifica)
```

**Prova tu!** Prendi le prime due feature della classifica e addestra un KNN usandole **insieme** (`X_train[[feature_1, feature_2]]`): l'accuratezza migliora rispetto alla singola feature migliore? Prova anche a rifare l'esperimento con `k=1` e `k=15` e confronta i risultati.

---

<a id="best-practice"></a>
# ✅ Best Practice del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

- dividi **sempre** in train e test prima di calcolare qualunque statistica sui dati;
- usa `stratify=y` ogni volta che le classi non sono già garantite in proporzioni simili;
- fissa `random_state` per rendere ogni esperimento riproducibile e confrontabile;
- non fermarti alla sola accuratezza: usa `classification_report` per controllare che il modello non favorisca una classe a scapito delle altre;
- quando scegli `k`, guarda sempre **entrambe** le curve (train e test), non solo quella di test.

---

<a id="errori-comuni"></a>
# ❌ Errori comuni

[⬆ Torna all'indice del modulo](#indice-modulo)

- **Valutare il modello sui dati di train:** produce un'accuratezza illusoriamente alta e non dice nulla sulla capacità di generalizzazione.
- **Dimenticare `stratify`:** su dataset piccoli o con classi sbilanciate può portare a uno split poco rappresentativo.
- **Scegliere k=1 "perché dà l'accuratezza più alta in train":** è il sintomo classico di overfitting, non un buon segno.
- **Ignorare la scala delle feature con KNN:** un algoritmo basato sulla distanza va sempre usato con consapevolezza delle differenze di scala tra variabili (lo risolveremo formalmente nel Modulo 2).

---

<a id="glossario"></a>
# Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|---|---|
| **Classificazione** | Problema di apprendimento supervisionato in cui l'etichetta da prevedere appartiene a un insieme finito di categorie |
| **Regressione** | Problema di apprendimento supervisionato in cui l'etichetta da prevedere è un valore numerico continuo |
| **Train set / Test set** | Rispettivamente, i dati usati per addestrare il modello e quelli, mai visti in addestramento, usati per valutarlo |
| **`stratify`** | Parametro di `train_test_split` che mantiene le proporzioni originali delle classi in entrambi i sottoinsiemi |
| **k-Nearest Neighbors (KNN)** | Algoritmo di classificazione che assegna a un nuovo esempio la classe più frequente tra i suoi k vicini più prossimi |
| **Overfitting** | Il modello impara troppo nel dettaglio i dati di train, perdendo capacità di generalizzare su dati nuovi |
| **Underfitting** | Il modello è troppo semplice per catturare i pattern nei dati, ottenendo prestazioni scarse ovunque |
| **Data leakage** | Fuga di informazioni dal test set (o da dati futuri) verso il processo di addestramento, che falsa la valutazione del modello |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo hai imparato a:

- distinguere problemi di classificazione da problemi di regressione;
- suddividere correttamente un dataset in train e test, con `stratify` per mantenere le proporzioni delle classi;
- costruire, addestrare e valutare un classificatore k-Nearest Neighbors con scikit-learn;
- riconoscere overfitting e underfitting osservando la curva di accuratezza al variare di `k`;
- evitare l'errore del data leakage, la regola d'oro che accompagnerà tutto il resto del corso.

Hai costruito il tuo primo modello che **impara a classificare**. Nel prossimo modulo — **Modulo 2 — Apprendimento Non Supervisionato** — lascerai da parte le etichette: scoprirai come un modello può trovare da solo strutture nascoste nei dati, raggruppando le specie di pinguini antartici senza che nessuno gli dica a quale specie appartengono.

[⬆ Torna all'indice del modulo](#indice-modulo)