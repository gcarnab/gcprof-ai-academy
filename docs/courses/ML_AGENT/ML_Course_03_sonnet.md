# 🟧 MODULO 3 — Deep Learning con PyTorch

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent · Percorso ispirato al programma "Laboratorio pratico di Machine Learning e sviluppo di AI Agent" · Ottimizzato per Google Colab (consigliata GPU) · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [3.1 Cos'è un tensore](#sez-3-1)
2. [🐍 Laboratorio Python 3.1 — Tensori in PyTorch: creazione e operazioni base](#lab-3-1)
3. [3.2 Dai dati di scikit-learn ai dati di PyTorch](#sez-3-2)
4. [🐍 Laboratorio Python 3.2 — Preparare il dataset Wine per PyTorch](#lab-3-2)
5. [3.3 L'architettura di una rete neurale: layer, pesi, attivazioni](#sez-3-3)
6. [🐍 Laboratorio Python 3.3 — Costruire la rete con `nn.Module`](#lab-3-3)
7. [3.4 Funzione di loss, backpropagation e ottimizzazione](#sez-3-4)
8. [🐍 Laboratorio Python 3.4 — Un singolo passo di training, passo per passo](#lab-3-4)
9. [3.5 Il ciclo di training completo](#sez-3-5)
10. [🐍 Laboratorio Python 3.5 — Training loop e valutazione](#lab-3-5)
11. [🍷 Progetto Guidato — La rete neurale contro il KNN del Modulo 1](#progetto)
12. [Best Practice del modulo](#best-practice)
13. [Errori comuni](#errori-comuni)
14. [Glossario del modulo](#glossario)
15. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- creare e manipolare **tensori** PyTorch, comprendendone la relazione con gli array NumPy;
- preparare un dataset tabellare (feature e target) nel formato richiesto da PyTorch;
- costruire una rete neurale con **layer lineari** e **funzioni di attivazione** usando `nn.Module`;
- spiegare cosa rappresentano i **pesi** di una rete e come vengono aggiornati durante l'addestramento;
- spiegare il ruolo della **funzione di loss**, della **backpropagation** e dell'**ottimizzatore**;
- scrivere ed eseguire un **ciclo di training** completo, monitorando loss e accuratezza su train e test;
- confrontare in modo motivato una rete neurale con un modello più semplice come il KNN del Modulo 1.

---

<a id="sez-3-1"></a>
# 3.1 Cos'è un tensore

[⬆ Torna all'indice del modulo](#indice-modulo)

Negli scorsi moduli abbiamo lavorato con array NumPy e DataFrame pandas. PyTorch introduce una propria struttura dati, il **tensore**, che a prima vista sembra un semplice array multidimensionale ma nasconde due capacità fondamentali per il deep learning.

> **Definizione**
>
> Un **tensore** è la struttura dati fondamentale di PyTorch: un array multidimensionale (scalare, vettore, matrice o oltre) che, a differenza di un array NumPy, può calcolare automaticamente i **gradienti** delle operazioni che subisce (tramite `autograd`) e può essere spostato sulla **GPU** per accelerare i calcoli.

> 💡 **Approfondimento**
>
> Non è un caso che il nome della libreria contenga "torch": ogni rete neurale che costruiremo in questo modulo non è altro che una sequenza di operazioni matematiche su tensori. Capire bene come si comportano i tensori — la loro forma (`shape`), il loro tipo di dato (`dtype`) e come tracciano i gradienti — è la base indispensabile per capire cosa succede davvero "sotto il cofano" quando una rete si addestra.

---

<a id="lab-3-1"></a>
# 🐍 Laboratorio Python 3.1 — Tensori in PyTorch: creazione e operazioni base

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 3.1 - Creazione e operazioni base sui tensori
# Obiettivo: prendere confidenza con la sintassi dei tensori
#            PyTorch e con la loro somiglianza (voluta) con NumPy.
# ============================================================

import torch
import numpy as np

# Un tensore si può creare da una lista, esattamente come un array NumPy
vettore = torch.tensor([1.0, 2.0, 3.0])
matrice = torch.tensor([[1.0, 2.0], [3.0, 4.0]])

print(f"Vettore: {vettore}")
print(f"Forma (shape) del vettore: {vettore.shape}")
print(f"\nMatrice:\n{matrice}")
print(f"Forma (shape) della matrice: {matrice.shape}")

# Le operazioni elemento-per-elemento funzionano come ci si aspetta
somma = vettore + 10
prodotto = matrice * 2
print(f"\nVettore + 10: {somma}")
print(f"Matrice * 2:\n{prodotto}")

# Conversione da/verso NumPy: i due mondi comunicano facilmente
array_numpy = np.array([5.0, 6.0, 7.0])
da_numpy = torch.from_numpy(array_numpy)
tornato_a_numpy = da_numpy.numpy()
print(f"\nDa NumPy a tensore: {da_numpy}")
```

```python
# ============================================================
# ESERCIZIO 3.1 (continua) - Il gradiente automatico (autograd)
# Obiettivo: osservare, su un esempio minimo, come PyTorch calcoli
#            automaticamente la derivata di un'espressione rispetto
#            a un tensore, il meccanismo alla base del training.
# ============================================================

# requires_grad=True dice a PyTorch: "tieni traccia delle operazioni
# su questo tensore, mi servirà calcolarne il gradiente"
x = torch.tensor(3.0, requires_grad=True)

# y = x^2 => la derivata dy/dx, calcolata "a mano", vale 2x
y = x ** 2

# backward() calcola automaticamente il gradiente di y rispetto a x
y.backward()

print(f"x = {x.item()}")
print(f"y = x^2 = {y.item()}")
print(f"Gradiente calcolato da PyTorch (dy/dx): {x.grad.item()}")
print(f"Gradiente atteso (2 * x): {2 * x.item()}")
```

**Prova tu!** Cambia `y = x ** 2` in `y = x ** 3` e rilancia la cella: il gradiente stampato corrisponde alla derivata di x³, cioè 3x²? Questo stesso meccanismo, applicato a migliaia di pesi contemporaneamente, è ciò che rende possibile addestrare una rete neurale.

---

<a id="sez-3-2"></a>
# 3.2 Dai dati di scikit-learn ai dati di PyTorch

[⬆ Torna all'indice del modulo](#indice-modulo)

Riprendiamo il dataset **Wine** già usato nel Modulo 1. I passaggi preparatori che conosci — split train/test con `stratify`, normalizzazione delle feature — restano identici: cambia solo il formato finale in cui i dati devono arrivare al modello.

> ⚠️ **Attenzione**
>
> A differenza del Modulo 2, qui la normalizzazione **deve** essere calcolata solo sul train set e poi applicata (mai ricalcolata) sul test set: siamo di nuovo in un contesto predittivo, con split train/test, esattamente come nel Modulo 1. È la stessa regola anti data-leakage della sezione 1.5, applicata ora anche a una rete neurale.

Un'altra differenza pratica: le reti neurali si addestrano tipicamente non su tutto il train set in un colpo solo, ma su piccoli sottoinsiemi chiamati **batch**, ripetuti più volte sull'intero dataset (le **epoche**).

> **Definizione**
>
> Un **batch** è un piccolo sottoinsieme del train set usato per calcolare un singolo aggiornamento dei pesi. Un'**epoca** è un intero passaggio della rete su tutti i batch del train set. Addestrare per più epoche significa mostrare alla rete gli stessi dati più volte, permettendole di migliorare progressivamente.

---

<a id="lab-3-2"></a>
# 🐍 Laboratorio Python 3.2 — Preparare il dataset Wine per PyTorch

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 3.2 - Preparazione dei dati Wine per PyTorch
# Obiettivo: ripetere split e normalizzazione come nel Modulo 1,
#            poi convertire tutto in tensori pronti per la rete.
# ============================================================

from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import torch

wine = load_wine()
X, y = wine.data, wine.target

# Stesso split stratificato del Modulo 1
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# Normalizzazione: fit SOLO sul train set, transform su entrambi
# (la stessa regola anti data-leakage della sezione 1.5)
scaler = StandardScaler()
X_train_scalato = scaler.fit_transform(X_train)
X_test_scalato = scaler.transform(X_test)

# Conversione in tensori PyTorch: le feature sono float32,
# le etichette di classificazione sono interi (long)
X_train_tensor = torch.tensor(X_train_scalato, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train, dtype=torch.long)
X_test_tensor = torch.tensor(X_test_scalato, dtype=torch.float32)
y_test_tensor = torch.tensor(y_test, dtype=torch.long)

print(f"Forma X_train_tensor: {X_train_tensor.shape}")
print(f"Forma y_train_tensor: {y_train_tensor.shape}")
```

```python
# ============================================================
# ESERCIZIO 3.2 (continua) - DataLoader per l'addestramento a batch
# Obiettivo: incapsulare i tensori in un DataLoader, che si occupa
#            di suddividere automaticamente i dati in batch a ogni
#            epoca (mescolandoli, per evitare pattern indesiderati).
# ============================================================

from torch.utils.data import TensorDataset, DataLoader

train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)

# Verifichiamo la forma di un singolo batch
primo_batch_X, primo_batch_y = next(iter(train_loader))
print(f"Forma di un batch di feature: {primo_batch_X.shape}")
print(f"Forma di un batch di etichette: {primo_batch_y.shape}")
```

**Prova tu!** Cambia `batch_size=16` in `batch_size=8` e osserva come cambia la forma del batch restituito. Con 124 esempi di train, quanti batch compongono un'intera epoca in ciascuno dei due casi?

---

<a id="sez-3-3"></a>
# 3.3 L'architettura di una rete neurale: layer, pesi, attivazioni

[⬆ Torna all'indice del modulo](#indice-modulo)

Una rete neurale semplice (una **rete feed-forward** o **multilayer perceptron**) è una sequenza di trasformazioni applicate ai dati in ingresso, organizzate in **layer**.

> **Definizione**
>
> Un **layer lineare** (`nn.Linear` in PyTorch) applica ai dati in ingresso una trasformazione del tipo `y = Wx + b`, dove **W** è la matrice dei **pesi** e **b** è il vettore dei **bias**: sono questi i numeri che la rete "impara" durante l'addestramento. Una **funzione di attivazione** (come `ReLU`) viene applicata dopo ogni layer lineare per introdurre **non linearità**: senza di essa, una sequenza di layer lineari equivarrebbe matematicamente a un unico layer lineare, per quanti strati si aggiungano.

> 💡 **Approfondimento**
>
> Puoi pensare ai pesi come alle "manopole" della rete: all'inizio dell'addestramento sono impostati a valori casuali, e il compito dell'intero processo di training (sezioni 3.4 e 3.5) è regolarli progressivamente fino a che la rete produce previsioni sempre più accurate. Una rete con più layer e più neuroni per layer ha semplicemente più manopole da regolare — da qui il termine "deep" (profondo) quando i layer diventano numerosi.

La nostra rete per il dataset Wine avrà un'architettura semplice:

- **layer di ingresso**: 13 neuroni, uno per ciascuna feature chimica;
- **layer nascosto**: un numero di neuroni a scelta (useremo 16), seguito da attivazione `ReLU`;
- **layer di uscita**: 3 neuroni, uno per ciascuna cultivar possibile.

---

<a id="lab-3-3"></a>
# 🐍 Laboratorio Python 3.3 — Costruire la rete con `nn.Module`

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 3.3 - Costruzione della rete neurale
# Obiettivo: definire l'architettura descritta in sezione 3.3
#            come sottoclasse di nn.Module, lo standard PyTorch.
# ============================================================

import torch.nn as nn

class ReteWine(nn.Module):
    def __init__(self, n_feature_ingresso=13, n_neuroni_nascosti=16, n_classi=3):
        super().__init__()
        # Layer 1: dalle 13 feature chimiche ai neuroni nascosti
        self.layer_nascosto = nn.Linear(n_feature_ingresso, n_neuroni_nascosti)
        # Funzione di attivazione: introduce la non linearità
        self.attivazione = nn.ReLU()
        # Layer 2: dai neuroni nascosti alle 3 classi di uscita
        self.layer_uscita = nn.Linear(n_neuroni_nascosti, n_classi)

    def forward(self, x):
        # Il "forward pass": come i dati attraversano la rete
        x = self.layer_nascosto(x)
        x = self.attivazione(x)
        x = self.layer_uscita(x)
        return x  # valori grezzi (logits), non ancora probabilità

# Istanziamo la rete
modello = ReteWine()
print(modello)

# Contiamo quanti parametri (pesi + bias) la rete deve imparare
n_parametri = sum(p.numel() for p in modello.parameters())
print(f"\nNumero totale di parametri da addestrare: {n_parametri}")
```

```python
# ============================================================
# ESERCIZIO 3.3 (continua) - Un forward pass "a freddo"
# Obiettivo: osservare l'output della rete PRIMA di qualunque
#            addestramento: pesi casuali, previsioni casuali.
# ============================================================

# Passiamo un batch di esempi non ancora addestrata alla rete
with torch.no_grad():  # non ci serve calcolare gradienti, solo osservare
    output_grezzo = modello(X_test_tensor[:5])

print("Output grezzo (logits) per i primi 5 esempi di test:")
print(output_grezzo)
print("\nClasse prevista per ciascun esempio (argmax dei logits):")
print(torch.argmax(output_grezzo, dim=1))
print(f"Classi reali corrispondenti: {y_test_tensor[:5]}")
```

**Prova tu!** Le previsioni della rete non addestrata coincidono con le classi reali? È normale: i pesi sono ancora casuali. Le sezioni 3.4 e 3.5 mostrano come farli convergere verso valori utili.

---

<a id="sez-3-4"></a>
# 3.4 Funzione di loss, backpropagation e ottimizzazione

[⬆ Torna all'indice del modulo](#indice-modulo)

Per insegnare alla rete a migliorare, servono tre ingredienti che lavorano insieme a ogni passo di addestramento.

> **Definizione**
>
> La **funzione di loss** misura quanto le previsioni della rete si discostano dalle etichette reali: più è alta, peggiore è la previsione. La **backpropagation** è l'algoritmo che calcola, tramite `autograd` (visto in sezione 3.1), il gradiente della loss rispetto a **ogni singolo peso** della rete — cioè quanto e in che direzione ciascun peso dovrebbe cambiare per ridurre la loss. L'**ottimizzatore** usa questi gradienti per aggiornare effettivamente i pesi, di una piccola quantità regolata dal **learning rate**.

> ⚠️ **Attenzione**
>
> Un learning rate troppo alto può far "saltare" l'ottimizzatore oltre il punto ottimale, impedendo alla loss di scendere in modo stabile; uno troppo basso rende l'addestramento estremamente lento. Non esiste un valore universalmente corretto: nel nostro laboratorio partiremo da un valore comune (0.01) come punto di partenza ragionevole.

Per un problema di classificazione multi-classe come il nostro, la funzione di loss standard è la **cross-entropy**, e l'ottimizzatore che useremo è **Adam**, una delle scelte più diffuse in pratica.

---

<a id="lab-3-4"></a>
# 🐍 Laboratorio Python 3.4 — Un singolo passo di training, passo per passo

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 3.4 - Un singolo passo di training, scomposto
# Obiettivo: eseguire "a mano" un solo aggiornamento dei pesi,
#            per vedere separatamente ogni fase del processo che
#            nella sezione 3.5 automatizzeremo in un ciclo.
# ============================================================

import torch.optim as optim

# Ricreiamo un modello "pulito" per questo esperimento isolato
modello_demo = ReteWine()

funzione_loss = nn.CrossEntropyLoss()
ottimizzatore = optim.Adam(modello_demo.parameters(), lr=0.01)

# Prendiamo un solo batch di esempio
batch_X, batch_y = next(iter(train_loader))

# --- FASE 1: forward pass -----------------------------------
previsioni = modello_demo(batch_X)
loss = funzione_loss(previsioni, batch_y)
print(f"Loss PRIMA dell'aggiornamento: {loss.item():.4f}")

# --- FASE 2: azzerare i gradienti dell'iterazione precedente -
# (PyTorch accumula i gradienti per default: vanno azzerati
#  esplicitamente a ogni passo, altrimenti si sommerebbero)
ottimizzatore.zero_grad()

# --- FASE 3: backpropagation ---------------------------------
loss.backward()

# --- FASE 4: aggiornamento dei pesi ---------------------------
ottimizzatore.step()

# Verifichiamo l'effetto: stessa batch, pesi aggiornati una volta
with torch.no_grad():
    nuove_previsioni = modello_demo(batch_X)
    nuova_loss = funzione_loss(nuove_previsioni, batch_y)
print(f"Loss DOPO un solo aggiornamento: {nuova_loss.item():.4f}")
```

**Prova tu!** Esegui più volte la cella `ottimizzatore.zero_grad() → loss.backward() → ottimizzatore.step()` sullo stesso batch (senza ricreare `modello_demo`) e osserva la loss scendere progressivamente. È esattamente il meccanismo che, ripetuto su tutti i batch e per molte epoche, costituisce il training loop della prossima sezione.

---

<a id="sez-3-5"></a>
# 3.5 Il ciclo di training completo

[⬆ Torna all'indice del modulo](#indice-modulo)

Il **training loop** non è altro che le quattro fasi appena viste (forward pass → azzeramento gradienti → backpropagation → aggiornamento pesi), ripetute per ogni batch, per un certo numero di epoche — con l'aggiunta di una fase di **valutazione** periodica sul test set, per monitorare se la rete sta davvero imparando a generalizzare o sta andando in overfitting (lo stesso concetto visto nel Modulo 1, sezione 1.4).

> 💡 **Approfondimento**
>
> Durante la valutazione sul test set, la rete va messa in modalità "senza gradienti" (`torch.no_grad()`, già usata in sezione 3.3): non stiamo addestrando, solo misurando le prestazioni, quindi non ha senso (e sarebbe solo dispendioso) calcolare gradienti in quella fase.

---

<a id="lab-3-5"></a>
# 🐍 Laboratorio Python 3.5 — Training loop e valutazione

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 3.5 - Ciclo di training completo
# Obiettivo: addestrare la rete per più epoche, monitorando loss
#            di train e accuratezza di test a ogni epoca.
# ============================================================

modello = ReteWine()
funzione_loss = nn.CrossEntropyLoss()
ottimizzatore = optim.Adam(modello.parameters(), lr=0.01)

n_epoche = 60
storico_loss = []
storico_accuratezza_test = []

for epoca in range(n_epoche):
    # --- Fase di addestramento su tutti i batch dell'epoca ---
    modello.train()  # modalità training
    loss_epoca = 0.0

    for batch_X, batch_y in train_loader:
        previsioni = modello(batch_X)
        loss = funzione_loss(previsioni, batch_y)

        ottimizzatore.zero_grad()
        loss.backward()
        ottimizzatore.step()

        loss_epoca += loss.item()

    loss_media = loss_epoca / len(train_loader)
    storico_loss.append(loss_media)

    # --- Fase di valutazione sul test set (senza gradienti) ---
    modello.eval()
    with torch.no_grad():
        previsioni_test = modello(X_test_tensor)
        classi_previste = torch.argmax(previsioni_test, dim=1)
        accuratezza_test = (classi_previste == y_test_tensor).float().mean().item()
    storico_accuratezza_test.append(accuratezza_test)

    if (epoca + 1) % 10 == 0:
        print(f"Epoca {epoca + 1:3d}/{n_epoche} | "
              f"Loss train: {loss_media:.4f} | "
              f"Accuratezza test: {accuratezza_test:.2%}")
```

```python
# ============================================================
# ESERCIZIO 3.5 (continua) - Visualizzare l'andamento del training
# Obiettivo: rappresentare graficamente loss e accuratezza durante
#            l'addestramento, per verificarne la convergenza.
# ============================================================

import matplotlib.pyplot as plt

fig, assi = plt.subplots(1, 2, figsize=(12, 4.5))

assi[0].plot(storico_loss)
assi[0].set_xlabel("Epoca")
assi[0].set_ylabel("Loss (train)")
assi[0].set_title("Andamento della loss durante il training")
assi[0].grid(alpha=0.3)

assi[1].plot(storico_accuratezza_test, color="darkorange")
assi[1].set_xlabel("Epoca")
assi[1].set_ylabel("Accuratezza (test)")
assi[1].set_title("Accuratezza sul test set durante il training")
assi[1].grid(alpha=0.3)

plt.tight_layout()
plt.show()

print(f"Accuratezza finale sul test set: {storico_accuratezza_test[-1]:.2%}")
```

**Prova tu!** Riduci `n_epoche` a 10 e rilancia l'intero esercizio: la loss fa in tempo a stabilizzarsi? Poi prova ad aumentare `lr` da 0.01 a 0.1: cosa succede alla curva della loss (ricorda l'avvertenza della sezione 3.4)?

---

<a id="progetto"></a>
# 🍷 Progetto Guidato — La rete neurale contro il KNN del Modulo 1

[⬆ Torna all'indice del modulo](#indice-modulo)

Nel Modulo 1 avevi addestrato un classificatore KNN sullo stesso dataset Wine. È il momento di rispondere a una domanda concreta: **su un dataset piccolo come questo, una rete neurale offre davvero un vantaggio rispetto a un algoritmo molto più semplice?**

```python
# ============================================================
# PROGETTO GUIDATO - Confronto tra rete neurale e KNN
# Obiettivo: riaddestrare un KNN (k=5, come nel Modulo 1) sugli
#            stessi dati normalizzati, e confrontarne l'accuratezza
#            con quella della rete neurale appena addestrata.
# ============================================================

from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# KNN sugli stessi dati normalizzati usati per la rete
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train_scalato, y_train)
accuratezza_knn = accuracy_score(y_test, knn.predict(X_test_scalato))

print(f"Accuratezza KNN (k=5):        {accuratezza_knn:.2%}")
print(f"Accuratezza rete neurale:     {storico_accuratezza_test[-1]:.2%}")
```

```python
# ============================================================
# PROGETTO GUIDATO (continua) - Tempo di "decisione" a confronto
# Obiettivo: osservare una differenza pratica tra i due approcci,
#            oltre alla sola accuratezza: la quantità di calcolo
#            necessaria per classificare un nuovo esempio.
# ============================================================

import time

nuovo_esempio = X_test_tensor[:1]

inizio = time.perf_counter()
with torch.no_grad():
    _ = modello(nuovo_esempio)
tempo_rete = time.perf_counter() - inizio

inizio = time.perf_counter()
_ = knn.predict(X_test_scalato[:1])
tempo_knn = time.perf_counter() - inizio

print(f"Tempo rete neurale (dopo l'addestramento): {tempo_rete*1000:.3f} ms")
print(f"Tempo KNN (deve confrontarsi con tutto il train set): {tempo_knn*1000:.3f} ms")
```

**Prova tu!** Su un dataset con solo 178 esempi e 13 feature, la differenza di accuratezza tra i due modelli è spesso modesta — a volte KNN vince. Rifletti: quali caratteristiche di un problema (dimensione del dataset, numero di feature, complessità dei pattern da catturare) renderebbero il vantaggio di una rete neurale molto più evidente?

---

<a id="best-practice"></a>
# ✅ Best Practice del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

- normalizza sempre le feature prima di addestrare una rete neurale: senza normalizzazione il training converge più lentamente o non converge affatto;
- calcola i parametri di normalizzazione **solo** sul train set, esattamente come nel Modulo 1;
- ricordati sempre di chiamare `ottimizzatore.zero_grad()` prima di ogni `loss.backward()`: PyTorch accumula i gradienti per default;
- usa `modello.eval()` e `torch.no_grad()` in fase di valutazione: risparmi calcolo e riduci il rischio di comportamenti indesiderati di alcuni layer (rilevante soprattutto con architetture più avanzate);
- monitora sempre sia la loss di train sia l'accuratezza di test durante l'addestramento: una loss di train che scende mentre l'accuratezza di test peggiora è un segnale di overfitting, come nel Modulo 1.

---

<a id="errori-comuni"></a>
# ❌ Errori comuni

[⬆ Torna all'indice del modulo](#indice-modulo)

- **Dimenticare `zero_grad()`:** i gradienti si sommano a quelli del passo precedente, portando ad aggiornamenti dei pesi scorretti e a un training instabile.
- **Confondere `nn.Module.forward()` con una chiamata diretta:** in PyTorch si chiama il modello come una funzione (`modello(x)`), mai `modello.forward(x)` direttamente, per non bypassare meccanismi interni della libreria.
- **Learning rate scelto senza criterio:** un valore troppo alto o troppo basso può far sembrare "rotta" un'architettura che in realtà è corretta.
- **Valutare in modalità `train()`:** dimenticare `modello.eval()` prima della valutazione può alterare i risultati in architetture più complesse di quella vista in questo modulo.
- **Interpretare i logits come probabilità:** l'output grezzo di `layer_uscita` (sezione 3.3) non è una probabilità; per ottenerla servirebbe applicare una funzione come `softmax`, che `CrossEntropyLoss` applica internamente ma che l'`argmax` usato per la previsione non richiede esplicitamente.

---

<a id="glossario"></a>
# Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|---|---|
| **Tensore** | Struttura dati multidimensionale di PyTorch, capace di tracciare gradienti e di girare su GPU |
| **Autograd** | Il motore di PyTorch che calcola automaticamente i gradienti delle operazioni sui tensori |
| **Batch / Epoca** | Un sottoinsieme di dati usato per un aggiornamento dei pesi / un intero passaggio su tutto il train set |
| **Layer lineare** | Trasformazione `y = Wx + b` applicata ai dati, i cui pesi (W) e bias (b) vengono appresi durante il training |
| **Funzione di attivazione** | Funzione (es. ReLU) applicata dopo un layer lineare per introdurre non linearità nella rete |
| **Funzione di loss** | Misura di quanto le previsioni del modello si discostano dalle etichette reali |
| **Backpropagation** | Algoritmo che calcola il gradiente della loss rispetto a ogni peso della rete |
| **Ottimizzatore** | Componente che aggiorna i pesi della rete usando i gradienti calcolati dalla backpropagation |
| **Learning rate** | Iperparametro che regola l'ampiezza di ogni aggiornamento dei pesi |
| **Training loop** | Il ciclo, ripetuto su batch ed epoche, che alterna forward pass, calcolo della loss, backpropagation e aggiornamento dei pesi |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo hai imparato a:

- lavorare con i tensori PyTorch e a comprendere il meccanismo di calcolo automatico dei gradienti (autograd);
- preparare un dataset tabellare per l'addestramento di una rete neurale, riutilizzando le regole di split e normalizzazione del Modulo 1;
- costruire un'architettura di rete neurale con layer lineari e funzioni di attivazione tramite `nn.Module`;
- comprendere il ruolo di funzione di loss, backpropagation e ottimizzatore nell'aggiornamento dei pesi;
- scrivere ed eseguire un ciclo di training completo, monitorando convergenza e rischio di overfitting;
- confrontare criticamente una rete neurale con un modello più semplice, invece di darne per scontata la superiorità.

Hai costruito un modello che **impara rappresentazioni complesse** dai dati, pesando e ottimizzando ogni connessione con le tue mani. Nel prossimo modulo — **Modulo 4 — Reinforcement Learning e AI Agent** — chiuderai il cerchio del corso: da "prevedere" a "decidere e agire", addestrando il tuo primo vero agente autonomo su un ambiente Gymnasium.

[⬆ Torna all'indice del modulo](#indice-modulo)