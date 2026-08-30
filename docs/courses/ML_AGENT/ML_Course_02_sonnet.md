# 🟦 MODULO 2 — Apprendimento Non Supervisionato

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent · Percorso ispirato al programma "Laboratorio pratico di Machine Learning e sviluppo di AI Agent" · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [2.1 Cosa cambia senza etichette](#sez-2-1)
2. [2.2 Perché normalizzare le feature prima del clustering](#sez-2-2)
3. [🐍 Laboratorio Python 2.1 — Caricare ed esplorare il dataset Penguins](#lab-2-1)
4. [🐍 Laboratorio Python 2.2 — Normalizzare le feature con `StandardScaler`](#lab-2-2)
5. [2.3 L'algoritmo k-means](#sez-2-3)
6. [🐍 Laboratorio Python 2.3 — Primo clustering con k-means](#lab-2-3)
7. [2.4 Quanti cluster? Elbow method e silhouette score](#sez-2-4)
8. [🐍 Laboratorio Python 2.4 — Trovare il numero ottimale di cluster](#lab-2-4)
9. [2.5 Clustering gerarchico e dendrogrammi](#sez-2-5)
10. [🐍 Laboratorio Python 2.5 — Clustering gerarchico e lettura del dendrogramma](#lab-2-5)
11. [🐧 Progetto Guidato — Raggruppare le specie di pinguini antartici](#progetto)
12. [Best Practice del modulo](#best-practice)
13. [Errori comuni](#errori-comuni)
14. [Glossario del modulo](#glossario)
15. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- spiegare la differenza tra apprendimento supervisionato e non supervisionato in termini di dati disponibili e obiettivo del modello;
- motivare perché, a differenza del Modulo 1, qui la normalizzazione delle feature non è opzionale ma indispensabile;
- applicare l'algoritmo **k-means** per raggruppare dati privi di etichetta;
- scegliere in modo motivato il numero di cluster tramite **elbow method** e **silhouette score**;
- applicare il **clustering gerarchico** e interpretare un **dendrogramma**;
- validare i cluster trovati confrontandoli, solo a posteriori, con eventuali etichette reali disponibili.

---

<a id="sez-2-1"></a>
# 2.1 Cosa cambia senza etichette

[⬆ Torna all'indice del modulo](#indice-modulo)

Nel Modulo 1 ogni esempio del dataset Wine portava con sé un'etichetta (la cultivar), e il compito del modello era imparare a prevederla. Da qui in avanti la situazione cambia radicalmente: **le etichette non ci sono**. Il modello ha a disposizione solo le feature, e deve scoprire da solo se esistono gruppi naturali nei dati.

> **Definizione**
>
> L'**apprendimento non supervisionato** è la famiglia di algoritmi che cerca strutture, pattern o raggruppamenti nei dati **senza** l'ausilio di un'etichetta target. Il compito più comune di questa famiglia è il **clustering**: suddividere gli esempi in gruppi (cluster) tali per cui gli esempi dello stesso gruppo si somiglino tra loro più di quanto si somiglino a esempi di gruppi diversi.

> 💡 **Approfondimento**
>
> Non avere etichette cambia anche il modo in cui valutiamo il modello. Nel Modulo 1 bastava confrontare le previsioni con la verità nota (`accuracy_score`). Qui, in generale, la "verità" non esiste: dovremo usare metriche interne al dataset stesso (come il silhouette score, sezione 2.4) per giudicare la qualità di un raggruppamento — e solo quando disponibile, come nel nostro progetto guidato, potremo confrontare i cluster trovati con etichette reali usate esclusivamente per la validazione finale, mai per l'addestramento.

---

<a id="sez-2-2"></a>
# 2.2 Perché normalizzare le feature prima del clustering

[⬆ Torna all'indice del modulo](#indice-modulo)

Nel Modulo 1 avevamo accennato che KNN, basandosi sulla distanza tra punti, risente della scala delle feature. Il k-means, che vedremo tra poco, si basa esattamente sullo stesso principio: raggruppa i punti in base alla loro distanza reciproca. Se una feature è espressa in grammi (valori nell'ordine delle migliaia) e un'altra in centimetri (valori a due cifre), la prima "detterà legge" nel calcolo della distanza, indipendentemente da quanto sia davvero informativa.

> ⚠️ **Attenzione**
>
> A differenza del Modulo 1, qui la normalizzazione non è un accorgimento facoltativo: **senza normalizzare, il clustering è quasi sempre fuorviante.** È la prima regola pratica di questo modulo, e la applicheremo fin dal primo laboratorio.

---

<a id="lab-2-1"></a>
# 🐍 Laboratorio Python 2.1 — Caricare ed esplorare il dataset Penguins

[⬆ Torna all'indice del modulo](#indice-modulo)

Lavoreremo sul dataset **Penguins**, raccolto dalla Palmer Station in Antartide e incluso tra i dataset di esempio della libreria `seaborn`: 344 pinguini di tre specie diverse, ciascuno descritto da misurazioni morfologiche (lunghezza e profondità del becco, lunghezza delle pinne, massa corporea). Per tutto il modulo faremo finta di non conoscere la specie, e la useremo solo alla fine, nel progetto guidato, per validare i cluster trovati.

```python
# ============================================================
# ESERCIZIO 2.1 - Caricamento ed esplorazione del dataset Penguins
# Obiettivo: caricare il dataset via seaborn, rimuovere i valori
#            mancanti e isolare le sole feature numeriche che
#            useremo per il clustering.
# ============================================================

import seaborn as sns
import pandas as pd

# load_dataset scarica il csv direttamente dal repository di seaborn:
# non serve alcun upload manuale.
penguins = sns.load_dataset("penguins")

print(f"Righe totali (con eventuali valori mancanti): {penguins.shape[0]}")
print(f"\nValori mancanti per colonna:\n{penguins.isna().sum()}")

# Rimuoviamo le righe con valori mancanti: il clustering non
# gestisce i NaN, e qui sono una minoranza trascurabile dei dati.
penguins = penguins.dropna().reset_index(drop=True)
print(f"\nRighe dopo la pulizia: {penguins.shape[0]}")

# Isoliamo le sole feature numeriche morfologiche per il clustering.
# Conserviamo "species" a parte: la useremo solo per la validazione finale.
feature_numeriche = [
    "bill_length_mm", "bill_depth_mm",
    "flipper_length_mm", "body_mass_g"
]
X = penguins[feature_numeriche]
specie_reali = penguins["species"]

X.describe().loc[["mean", "min", "max"]].T
```

**Prova tu!** Guarda la scala di `body_mass_g` (migliaia di grammi) rispetto a `bill_depth_mm` (poche decine di millimetri): è esattamente la situazione descritta nella sezione 2.2.

---

<a id="lab-2-2"></a>
# 🐍 Laboratorio Python 2.2 — Normalizzare le feature con `StandardScaler`

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 2.2 - Normalizzazione delle feature
# Obiettivo: riportare tutte le feature sulla stessa scala, così
#            che nessuna domini il calcolo delle distanze usato
#            dagli algoritmi di clustering.
# ============================================================

from sklearn.preprocessing import StandardScaler

# StandardScaler trasforma ogni feature in modo che abbia
# media 0 e deviazione standard 1 ("standardizzazione").
scaler = StandardScaler()
X_scalato = scaler.fit_transform(X)

# Il risultato è un array numpy: lo trasformiamo di nuovo in
# DataFrame solo per comodità di lettura.
X_scalato = pd.DataFrame(X_scalato, columns=feature_numeriche)

print("Statistiche dopo la normalizzazione (media ≈ 0, dev. std ≈ 1):")
print(X_scalato.describe().loc[["mean", "std"]].round(2))
```

> 💡 **Approfondimento**
>
> Qui non esiste uno split train/test: stiamo esplorando la struttura dell'intero dataset, non prevedendo su dati futuri. La regola del Modulo 1 su "calcolare le statistiche solo sul train set" tornerà centrale più avanti nel percorso, quando normalizzazione e split si incontreranno di nuovo (ad esempio nel Modulo 3). In un contesto puramente esplorativo come questo, standardizzare l'intero dataset è la pratica corretta.

---

<a id="sez-2-3"></a>
# 2.3 L'algoritmo k-means

[⬆ Torna all'indice del modulo](#indice-modulo)

Il **k-means** è l'algoritmo di clustering più diffuso. L'idea di fondo è semplice e iterativa:

1. si scelgono **k** punti iniziali a caso, chiamati **centroidi**;
2. ogni esempio viene assegnato al centroide più vicino, formando k gruppi;
3. ogni centroide viene ricalcolato come la **media** degli esempi assegnati al suo gruppo;
4. si ripetono i passi 2–3 finché i centroidi (e quindi i gruppi) smettono di cambiare in modo significativo.

> **Definizione**
>
> Un **centroide** è il punto che rappresenta il "centro" di un cluster: le sue coordinate sono la media, feature per feature, di tutti gli esempi assegnati a quel cluster.

> ⚠️ **Attenzione**
>
> A differenza di KNN, qui **k** non è il numero di vicini da consultare, ma il **numero di cluster** che vogliamo trovare — e va deciso *prima* di lanciare l'algoritmo. È lo stesso simbolo, ma un significato completamente diverso: la sezione 2.4 ti mostrerà come sceglierlo in modo motivato, invece che a caso.

---

<a id="lab-2-3"></a>
# 🐍 Laboratorio Python 2.3 — Primo clustering con k-means

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 2.3 - Primo clustering con k-means
# Obiettivo: applicare k-means alle feature normalizzate,
#            ipotizzando (per ora "a occhio") k=3 cluster.
# ============================================================

from sklearn.cluster import KMeans

# n_init=10: k-means viene rilanciato 10 volte con centroidi
# iniziali diversi, tenendo il risultato migliore (più stabile).
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
etichette_cluster = kmeans.fit_predict(X_scalato)

penguins["cluster_kmeans"] = etichette_cluster

print("Numero di pinguini per cluster trovato:")
print(penguins["cluster_kmeans"].value_counts().sort_index())
```

```python
# ============================================================
# ESERCIZIO 2.3 (continua) - Visualizzare i cluster trovati
# Obiettivo: rappresentare graficamente i cluster su due delle
#            quattro feature, per farsi un'idea visiva del risultato.
# ============================================================

import matplotlib.pyplot as plt

plt.figure(figsize=(7, 5))
scatter = plt.scatter(
    penguins["flipper_length_mm"], penguins["bill_length_mm"],
    c=penguins["cluster_kmeans"], cmap="viridis", alpha=0.7
)
plt.xlabel("Lunghezza pinne (mm)")
plt.ylabel("Lunghezza becco (mm)")
plt.title("Cluster trovati da k-means (k=3)")
plt.colorbar(scatter, label="Cluster")
plt.grid(alpha=0.3)
plt.show()
```

**Prova tu!** Rilancia il codice con `n_clusters=2` e con `n_clusters=5`: osserva come cambia la forma dei gruppi nel grafico. Nella prossima sezione vedremo come scegliere k senza doverlo indovinare a occhio.

---

<a id="sez-2-4"></a>
# 2.4 Quanti cluster? Elbow method e silhouette score

[⬆ Torna all'indice del modulo](#indice-modulo)

Nella sezione precedente abbiamo scelto k=3 "a occhio". Esistono due metodi quantitativi per motivare questa scelta.

> **Definizione**
>
> L'**elbow method** ("metodo del gomito") osserva come diminuisce l'**inerzia** (la somma delle distanze al quadrato tra ogni punto e il proprio centroide) al crescere di k. L'inerzia diminuisce sempre aggiungendo cluster, ma dopo un certo punto il miglioramento diventa marginale: quel "gomito" nel grafico indica un buon compromesso.
>
> Il **silhouette score** misura, per ogni punto, quanto è più vicino al proprio cluster rispetto al cluster più vicino tra gli altri. Va da -1 a +1: valori vicini a +1 indicano cluster ben separati e compatti, valori vicini a 0 indicano cluster sovrapposti, valori negativi indicano punti probabilmente assegnati al cluster sbagliato.

---

<a id="lab-2-4"></a>
# 🐍 Laboratorio Python 2.4 — Trovare il numero ottimale di cluster

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 2.4 - Elbow method e silhouette score
# Obiettivo: calcolare inerzia e silhouette score per diversi
#            valori di k, per scegliere k in modo motivato.
# ============================================================

from sklearn.metrics import silhouette_score

valori_k = range(2, 9)   # la silhouette richiede almeno 2 cluster
inerzie = []
punteggi_silhouette = []

for k in valori_k:
    modello = KMeans(n_clusters=k, random_state=42, n_init=10)
    etichette = modello.fit_predict(X_scalato)

    inerzie.append(modello.inertia_)
    punteggi_silhouette.append(silhouette_score(X_scalato, etichette))

fig, assi = plt.subplots(1, 2, figsize=(12, 4.5))

assi[0].plot(valori_k, inerzie, marker="o")
assi[0].set_xlabel("Numero di cluster (k)")
assi[0].set_ylabel("Inerzia")
assi[0].set_title("Elbow method")
assi[0].grid(alpha=0.3)

assi[1].plot(valori_k, punteggi_silhouette, marker="o", color="darkorange")
assi[1].set_xlabel("Numero di cluster (k)")
assi[1].set_ylabel("Silhouette score")
assi[1].set_title("Silhouette score al variare di k")
assi[1].grid(alpha=0.3)

plt.tight_layout()
plt.show()

k_migliore = valori_k[punteggi_silhouette.index(max(punteggi_silhouette))]
print(f"k con silhouette score più alto: {k_migliore}")
```

> ⚠️ **Attenzione**
>
> I due metodi non sempre concordano perfettamente su un unico valore di k "corretto": è normale, e fa parte del lavoro dell'analista incrociare i due segnali con la conoscenza del dominio (qui, ad esempio, sappiamo — ma solo perché lo verificheremo nel progetto guidato — che esistono davvero tre specie). Nella pratica, un silhouette score più alto è generalmente un'indicazione più affidabile di un gomito ambiguo.

---

<a id="sez-2-5"></a>
# 2.5 Clustering gerarchico e dendrogrammi

[⬆ Torna all'indice del modulo](#indice-modulo)

Il **clustering gerarchico agglomerativo** costruisce i cluster con una logica diversa da k-means: parte considerando **ogni punto come un cluster a sé**, poi unisce ripetutamente i due cluster più vicini, fino a ottenere un unico grande cluster. Il risultato di questo processo si visualizza con un **dendrogramma**.

> **Definizione**
>
> Un **dendrogramma** è un diagramma ad albero che mostra l'ordine in cui i cluster vengono uniti e la "distanza" a cui avviene ogni unione. Tagliando l'albero a un'altezza scelta, si ottiene un numero di cluster corrispondente al numero di rami tagliati.

> 💡 **Approfondimento**
>
> A differenza di k-means, il clustering gerarchico non richiede di scegliere k in anticipo: il dendrogramma mostra l'intera "storia" delle unioni, e il numero di cluster si decide **dopo**, semplicemente scegliendo dove tagliare l'albero. Questo lo rende particolarmente utile in fase esplorativa, quando non si ha ancora un'ipotesi precisa sul numero di gruppi.

---

<a id="lab-2-5"></a>
# 🐍 Laboratorio Python 2.5 — Clustering gerarchico e lettura del dendrogramma

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 2.5 - Clustering gerarchico e dendrogramma
# Obiettivo: costruire il dendrogramma sulle feature normalizzate
#            e tagliarlo per ottenere 3 cluster, da confrontare
#            con quelli trovati da k-means.
# ============================================================

from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.cluster import AgglomerativeClustering

# "ward" minimizza la varianza interna a ogni cluster a ogni unione:
# è il criterio di linkage più usato in pratica.
matrice_linkage = linkage(X_scalato, method="ward")

plt.figure(figsize=(10, 5))
# Mostriamo solo gli ultimi 30 livelli di unione, altrimenti il
# dendrogramma con 333 pinguini diventerebbe illeggibile.
dendrogram(matrice_linkage, truncate_mode="lastp", p=30)
plt.title("Dendrogramma del clustering gerarchico (troncato)")
plt.xlabel("Cluster (o punti) uniti")
plt.ylabel("Distanza di unione")
plt.axhline(y=20, color="red", linestyle="--", label="Taglio a 3 cluster")
plt.legend()
plt.show()

# Applichiamo il clustering gerarchico chiedendo esplicitamente 3 cluster
agglomerativo = AgglomerativeClustering(n_clusters=3, linkage="ward")
penguins["cluster_gerarchico"] = agglomerativo.fit_predict(X_scalato)

print("Numero di pinguini per cluster gerarchico:")
print(penguins["cluster_gerarchico"].value_counts().sort_index())
```

**Prova tu!** Cambia `y=20` nella linea tratteggiata rossa con un valore più basso: il taglio produrrà più cluster. Osserva come il dendrogramma renda visibile, in un solo grafico, l'intera gamma di soluzioni possibili — da 1 a n cluster.

---

<a id="progetto"></a>
# 🐧 Progetto Guidato — Raggruppare le specie di pinguini antartici

[⬆ Torna all'indice del modulo](#indice-modulo)

Ora che hai due metodi di clustering e due criteri per scegliere k, è il momento di rispondere alla domanda che ci siamo posti fin dall'inizio del modulo: **i cluster trovati corrispondono davvero alle tre specie reali di pinguini?**

```python
# ============================================================
# PROGETTO GUIDATO - Validare i cluster con le specie reali
# Obiettivo: confrontare, solo ora, i cluster trovati da k-means
#            e dal clustering gerarchico con la specie reale di
#            ogni pinguino (mai usata finora nel clustering stesso).
# ============================================================

import pandas as pd

# Tabella di contingenza: incrocia cluster trovato e specie reale
tabella_confronto = pd.crosstab(
    penguins["cluster_kmeans"], specie_reali,
    rownames=["Cluster k-means"], colnames=["Specie reale"]
)
print("Confronto tra cluster k-means e specie reali:\n")
print(tabella_confronto)

print("\nConfronto tra cluster gerarchico e specie reali:\n")
print(pd.crosstab(
    penguins["cluster_gerarchico"], specie_reali,
    rownames=["Cluster gerarchico"], colnames=["Specie reale"]
))
```

```python
# ============================================================
# PROGETTO GUIDATO (continua) - Misurare l'accordo con l'ARI
# Obiettivo: quantificare con una singola metrica quanto i cluster
#            trovati (senza etichette) corrispondano alle specie
#            reali, usando l'Adjusted Rand Index.
# ============================================================

from sklearn.metrics import adjusted_rand_score

ari_kmeans = adjusted_rand_score(specie_reali, penguins["cluster_kmeans"])
ari_gerarchico = adjusted_rand_score(specie_reali, penguins["cluster_gerarchico"])

print(f"Adjusted Rand Index (k-means):      {ari_kmeans:.3f}")
print(f"Adjusted Rand Index (gerarchico):   {ari_gerarchico:.3f}")
print("\n(1.0 = accordo perfetto con le specie reali, 0.0 = accordo casuale)")
```

**Prova tu!** Guarda la tabella di contingenza: c'è una specie che il clustering fatica a separare dalle altre? Prova a rifare l'esercizio 2.3 usando solo `bill_length_mm` e `bill_depth_mm` (le due misure del becco): il risultato migliora o peggiora rispetto a usare tutte e quattro le feature?

---

<a id="best-practice"></a>
# ✅ Best Practice del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

- normalizza sempre le feature prima di un clustering basato sulla distanza (k-means, gerarchico);
- non fermarti a un solo criterio per scegliere k: incrocia elbow method e silhouette score;
- usa etichette reali (quando disponibili) solo per **validare** i cluster a posteriori, mai per guidare l'algoritmo;
- visualizza sempre i cluster, anche solo su due feature alla volta: un grafico rivela problemi che una tabella di numeri nasconde;
- ricorda che k-means assume cluster di forma tendenzialmente sferica: su strutture dati diverse può essere il clustering gerarchico a comportarsi meglio.

---

<a id="errori-comuni"></a>
# ❌ Errori comuni

[⬆ Torna all'indice del modulo](#indice-modulo)

- **Applicare k-means su feature non normalizzate:** una singola feature con scala ampia può dominare completamente il risultato.
- **Scegliere k guardando solo l'inerzia:** l'inerzia diminuisce sempre all'aumentare di k, per costruzione; senza il silhouette score (o altre metriche) si rischia di scegliere un k eccessivo.
- **Interpretare un cluster come se fosse una classe "vera":** un cluster è un raggruppamento statistico, non garantisce automaticamente di corrispondere a una categoria reale e significativa.
- **Usare le etichette reali durante il clustering:** se sono disponibili, vanno usate solo in fase di validazione finale (come nel progetto guidato), altrimenti si sta facendo apprendimento supervisionato sotto mentite spoglie.

---

<a id="glossario"></a>
# Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|---|---|
| **Apprendimento non supervisionato** | Famiglia di algoritmi che cerca strutture nei dati senza etichette target |
| **Clustering** | Compito di raggruppare esempi simili tra loro in gruppi (cluster) |
| **Centroide** | Punto che rappresenta il centro di un cluster, calcolato come media dei suoi esempi |
| **k-means** | Algoritmo di clustering che assegna iterativamente i punti al centroide più vicino, ricalcolandolo a ogni passo |
| **Elbow method** | Tecnica che sceglie k osservando il punto in cui la diminuzione dell'inerzia rallenta bruscamente |
| **Silhouette score** | Metrica (da -1 a +1) che misura quanto un punto sia più vicino al proprio cluster rispetto agli altri |
| **Clustering gerarchico** | Metodo che unisce iterativamente i cluster più vicini, rappresentabile con un dendrogramma |
| **Dendrogramma** | Diagramma ad albero che mostra l'ordine e la distanza delle unioni nel clustering gerarchico |
| **Adjusted Rand Index (ARI)** | Metrica che misura l'accordo tra i cluster trovati e un'etichetta reale nota, usata solo in fase di validazione |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo hai imparato a:

- lavorare senza etichette, affidandoti alla struttura interna dei dati invece che a una verità nota;
- normalizzare le feature come passaggio obbligatorio prima di qualunque clustering basato sulla distanza;
- applicare k-means, scegliendo k in modo motivato tramite elbow method e silhouette score;
- applicare il clustering gerarchico e leggere un dendrogramma;
- validare (mai guidare) i cluster trovati confrontandoli con etichette reali, quando disponibili.

Hai costruito un modello che **impara a scoprire pattern** da solo. Nel prossimo modulo — **Modulo 3 — Deep Learning con PyTorch** — farai un salto concettuale: dalle distanze tra punti alle prime reti neurali, costruite pesando e ottimizzando ogni singola connessione con le tue mani.

[⬆ Torna all'indice del modulo](#indice-modulo)