<a id="top"></a>

# 📘 Modulo 5: Data Analysis
**Livello Intermedio (parte 1) — Master in Intelligenza Artificiale | GCProf Academy**

· 🕒 Tempo stimato: 8-10 ore · 🎯 Difficoltà: Intermedio

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

C'è un principio che ogni AI Engineer impara presto, spesso a sue spese: **"garbage in, garbage out"**. Un modello di Machine Learning, per quanto sofisticato, non potrà mai produrre risultati migliori della qualità dei dati con cui viene addestrato. Le statistiche più citate nel settore stimano che un data scientist trascorra tra il 60% e l'80% del proprio tempo non a costruire modelli, ma a **trovare, pulire e preparare i dati**.

Questo modulo è interamente dedicato a quella fase, spesso sottovalutata ma decisiva: la **Data Analysis**. Partendo dalle basi di Pandas che hai acquisito nel Modulo 4, imparerai a trasformare un dataset grezzo — pieno di valori mancanti, duplicati, formati incoerenti — in un dataset pulito, coerente e pronto per l'addestramento di un modello. Imparerai anche a "far parlare" i dati attraverso la visualizzazione, uno strumento tanto analitico quanto comunicativo: un buon grafico rivela pattern che una tabella di numeri nasconde.

Le competenze di questo modulo non servono solo al Machine Learning: sono trasferibili a qualunque contesto — scolastico, aziendale, di ricerca — in cui serva prendere decisioni basate sui dati.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Reperire e caricare dataset da fonti diverse (CSV, Excel, API, repository pubblici come Kaggle).
- ✅ Effettuare un'**esplorazione iniziale** (Exploratory Data Analysis, EDA) per capire struttura, tipi e qualità di un dataset.
- ✅ Identificare e gestire **valori mancanti, duplicati e outlier**.
- ✅ Applicare tecniche di **preprocessing**: normalizzazione, standardizzazione, encoding delle variabili categoriche.
- ✅ Applicare tecniche di **feature engineering** per creare nuove variabili utili a un modello.
- ✅ Costruire **visualizzazioni avanzate** (istogrammi, boxplot, scatterplot, heatmap di correlazione) con Matplotlib e Seaborn.
- ✅ Documentare un intero flusso di data analysis in un notebook chiaro e riproducibile.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato il **Modulo 4 (Python per AI)**: è richiesta familiarità con Pandas, NumPy, Matplotlib e ambienti virtuali.
- Un ambiente VS Code funzionante con Python e le librerie del Modulo 4 installate.
- Nessuna nozione statistica avanzata è richiesta: i concetti statistici necessari (media, deviazione standard, correlazione, distribuzione) vengono introdotti nel modulo stesso.

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Trovare e caricare dataset

Prima di analizzare dati, servono dati da analizzare. Le fonti più comuni:

- **Repository pubblici**: Kaggle, UCI Machine Learning Repository, Google Dataset Search — ottimi per esercitarsi su dataset reali e ben documentati.
- **API pubbliche**: molti enti (ISTAT, Eurostat, OpenWeatherMap) espongono dati tramite API interrogabili direttamente da Python.
- **File aziendali/scolastici**: CSV o Excel esportati da gestionali, registri elettronici, sistemi di sondaggio.

```python
import pandas as pd

# Da file CSV locale
df = pd.read_csv("dati.csv")

# Da file Excel
df = pd.read_excel("dati.xlsx", sheet_name="Foglio1")

# Da URL diretto (es. dataset pubblico)
df = pd.read_csv("https://esempio.org/dataset.csv")
```

Un primo controllo, sempre:

```python
df.shape          # (righe, colonne)
df.head()         # prime 5 righe
df.info()         # tipi di dato e valori non nulli per colonna
df.describe()     # statistiche riassuntive delle colonne numeriche
```

### 4.2 — Exploratory Data Analysis (EDA)

L'EDA è la fase in cui "conosci" il tuo dataset prima di intervenire: quali colonne ci sono, che tipo di dato contengono, quanti valori mancano, che range assumono i valori numerici, quali categorie esistono nelle colonne testuali.

```python
df.dtypes                      # tipo di dato per colonna
df.isnull().sum()              # numero di valori mancanti per colonna
df["categoria"].value_counts() # frequenza delle categorie in una colonna testuale
df.duplicated().sum()          # numero di righe duplicate
```

Una buona EDA risponde sempre a tre domande: *cosa contiene* il dataset, *quanto è pulito*, *cosa mi aspetto di trovarci* in base al dominio del problema.

### 4.3 — Gestione di valori mancanti, duplicati e outlier

**Valori mancanti (missing values):**

```python
# Rimuovere le righe con almeno un valore mancante
df_pulito = df.dropna()

# Riempire i valori mancanti con la media della colonna
df["voto"] = df["voto"].fillna(df["voto"].mean())

# Riempire i valori mancanti in una colonna categorica con la moda
df["categoria"] = df["categoria"].fillna(df["categoria"].mode()[0])
```

Non esiste una regola unica: eliminare righe è semplice ma fa perdere informazione; riempire (*imputazione*) preserva i dati ma introduce un'assunzione. La scelta dipende da quanti dati mancano e da quanto sono importanti per l'analisi.

**Duplicati:**

```python
df = df.drop_duplicates()
```

**Outlier (valori anomali)** — un metodo comune è l'IQR (Interquartile Range):

```python
Q1 = df["voto"].quantile(0.25)
Q3 = df["voto"].quantile(0.75)
IQR = Q3 - Q1

limite_basso = Q1 - 1.5 * IQR
limite_alto = Q3 + 1.5 * IQR

df_senza_outlier = df[(df["voto"] >= limite_basso) & (df["voto"] <= limite_alto)]
```

### 4.4 — Preprocessing: normalizzazione, standardizzazione, encoding

Molti algoritmi di Machine Learning (che affronterai nel Modulo 6) lavorano meglio — o funzionano correttamente — solo se i dati numerici sono su scale comparabili e le variabili categoriche sono convertite in numeri.

**Normalizzazione (Min-Max Scaling)** — porta i valori in un intervallo [0, 1]:

```python
df["voto_norm"] = (df["voto"] - df["voto"].min()) / (df["voto"].max() - df["voto"].min())
```

**Standardizzazione (Z-score)** — porta i valori a media 0 e deviazione standard 1:

```python
df["voto_std"] = (df["voto"] - df["voto"].mean()) / df["voto"].std()
```

**Encoding delle variabili categoriche** — i modelli lavorano con numeri, non con stringhe:

```python
# One-Hot Encoding: crea una colonna binaria per ciascuna categoria
df_encoded = pd.get_dummies(df, columns=["materia"])

# Label Encoding: assegna un numero intero a ciascuna categoria
df["materia_cod"] = df["materia"].astype("category").cat.codes
```

> 💡 One-Hot Encoding è preferibile quando le categorie non hanno un ordine naturale (es. "Matematica", "Storia", "Arte"); Label Encoding può avere senso quando esiste un ordine (es. "Basso", "Medio", "Alto").

### 4.5 — Feature Engineering

La *feature engineering* è l'arte di creare nuove variabili (feature) a partire da quelle esistenti, per rendere più evidenti al modello i pattern rilevanti.

```python
# Creare una feature combinata
df["media_generale"] = (df["voto_matematica"] + df["voto_italiano"] + df["voto_scienze"]) / 3

# Estrarre informazioni da una data
df["data_iscrizione"] = pd.to_datetime(df["data_iscrizione"])
df["anno_iscrizione"] = df["data_iscrizione"].dt.year
df["mese_iscrizione"] = df["data_iscrizione"].dt.month

# Creare una feature categorica a partire da una numerica (binning)
df["fascia_voto"] = pd.cut(df["media_generale"], bins=[0, 6, 8, 10], labels=["Sufficiente", "Buono", "Ottimo"])
```

Una buona feature engineering, spesso, incide sulle prestazioni finali di un modello molto più della scelta dell'algoritmo stesso — un tema che riprenderemo nel Modulo 6.

### 4.6 — Visualizzazione avanzata: Matplotlib e Seaborn

Oltre ai grafici base visti nel Modulo 4, per l'analisi dati si usano visualizzazioni più specifiche, spesso con **Seaborn** (libreria costruita sopra Matplotlib, pensata per l'analisi statistica):

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Istogramma: distribuzione di una variabile numerica
sns.histplot(df["media_generale"], bins=10, kde=True)
plt.title("Distribuzione della media generale")
plt.show()

# Boxplot: individuare outlier e confrontare gruppi
sns.boxplot(x="materia", y="voto", data=df)
plt.title("Distribuzione dei voti per materia")
plt.show()

# Scatterplot: relazione tra due variabili numeriche
sns.scatterplot(x="ore_studio", y="voto", data=df)
plt.title("Relazione tra ore di studio e voto")
plt.show()

# Heatmap di correlazione: relazioni tra tutte le variabili numeriche
corr = df.select_dtypes(include="number").corr()
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("Matrice di correlazione")
plt.show()
```

La heatmap di correlazione è particolarmente utile in fase di preparazione al Machine Learning: aiuta a capire quali variabili sono legate tra loro (e quindi potenzialmente ridondanti) e quali sembrano più collegate alla variabile che si vuole predire.

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — EDA su un dataset scolastico**
Un registro elettronico esportato in CSV mostra `df.isnull().sum()` con 15 valori mancanti nella colonna "voto_scienze": prima di procedere, è necessario capire *perché* mancano (assenze? errore di importazione?) prima di decidere se eliminarli o sostituirli con la media.

**Esempio 2 — Outlier reali vs errori di inserimento**
Un dataset di voti mostra un valore "110" nella colonna "voto" (scala 1-10): non è un outlier statistico nel senso di un valore raro ma plausibile, è quasi certamente un errore di inserimento (forse confuso con la scala universitaria) da correggere o rimuovere, non da "normalizzare" insieme agli altri.

**Esempio 3 — Feature engineering efficace**
In un dataset di iscrizioni a un corso online, la data di iscrizione da sola dice poco; ma calcolando "giorni trascorsi dall'iscrizione all'ultimo accesso" si ottiene una feature molto più predittiva dell'abbandono del corso.

**Esempio 4 — Heatmap per capire un dataset**
In un dataset con voti in più materie, una heatmap di correlazione può rivelare che "voto_matematica" e "voto_fisica" sono fortemente correlati (studenti bravi in una tendono a esserlo anche nell'altra), un'informazione utile sia per l'analisi sia per evitare ridondanze nel modello.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** applicare l'intero flusso di data analysis — dal caricamento alla visualizzazione — su un dataset reale.

**Setup:** nel tuo ambiente del Modulo 4, installa Seaborn: `pip install seaborn`, aggiornando `requirements.txt`.

**Attività (in notebook `.ipynb`, 60-90 minuti):**

1. Scarica un dataset pubblico a tua scelta da Kaggle (es. un dataset sulla qualità del sonno, sul rendimento scolastico, sui prezzi immobiliari — qualsiasi tema ti interessi) oppure usa il file `studenti_grezzo.csv` fornito nel materiale scaricabile.
2. Esegui un'EDA completa: shape, tipi, valori mancanti, duplicati, statistiche descrittive.
3. Individua e gestisci almeno **due problemi di qualità dei dati** (valori mancanti, duplicati o outlier), motivando per iscritto la scelta fatta (eliminazione vs imputazione).
4. Applica almeno **una tecnica di encoding** su una colonna categorica e **una di normalizzazione o standardizzazione** su una colonna numerica.
5. Crea almeno **due nuove feature** tramite feature engineering.
6. Produci almeno **quattro visualizzazioni** (istogramma, boxplot, scatterplot, heatmap) e scrivi, in celle Markdown, un breve commento su cosa rivela ciascun grafico.

**Verifica:** il notebook finale deve raccontare, dall'inizio alla fine, la "storia" del dataset: da grezzo a pronto per un modello.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Fai sempre l'EDA **prima** di intervenire sui dati: non pulire "alla cieca".
- ✅ Documenta ogni decisione di pulizia (perché hai eliminato una riga, perché hai scelto la media e non la mediana per l'imputazione): rende l'analisi riproducibile e giustificabile.
- ✅ Distingui outlier "veri" (valori estremi ma plausibili) da errori di inserimento: richiedono trattamenti diversi.
- ✅ Applica normalizzazione/standardizzazione **dopo** aver diviso i dati in train/test (concetto che approfondirai nel Modulo 6), per evitare data leakage.
- ✅ Preferisci grafici semplici e leggibili a grafici "spettacolari" ma poco chiari: l'obiettivo è comunicare, non impressionare.
- ✅ Conserva sempre una copia del dataset originale, non sovrascriverlo mai direttamente.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Eliminare valori mancanti senza chiedersi il perché.** A volte l'assenza di un dato è essa stessa un'informazione rilevante.
- ❌ **Usare la media per l'imputazione su dati fortemente asimmetrici o con outlier**, dove la mediana sarebbe più robusta.
- ❌ **Applicare One-Hot Encoding a colonne con centinaia di categorie diverse**, generando un numero enorme di nuove colonne poco utili (spesso serve prima raggruppare le categorie meno frequenti).
- ❌ **Confondere normalizzazione e standardizzazione**: producono scale diverse e sono adatte a contesti diversi.
- ❌ **Interpretare correlazione come causalità**: due variabili correlate nella heatmap non implicano che una "causi" l'altra.
- ❌ **Creare grafici senza titolo, etichette degli assi o unità di misura**: rendono l'analisi incomprensibile a chi la legge dopo di te.

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai attraversato l'intero ciclo di vita dei dati prima dell'addestramento di un modello: dal **reperimento** di un dataset alla sua **esplorazione (EDA)**, dalla **pulizia** (valori mancanti, duplicati, outlier) al **preprocessing** (normalizzazione, standardizzazione, encoding), fino alla **feature engineering** e alla **visualizzazione avanzata** con Matplotlib e Seaborn. Hai visto come ogni decisione presa in questa fase — spesso silenziosa e poco visibile nel prodotto finale — influenzi in modo determinante la qualità di qualsiasi modello costruito a valle.

Nel prossimo modulo (Machine Learning) userai esattamente il dataset che hai imparato a preparare qui per addestrare, validare e valutare il tuo primo modello predittivo.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **EDA (Exploratory Data Analysis)** | Fase di esplorazione iniziale di un dataset, per comprenderne struttura e qualità |
| **Missing value** | Valore mancante in una colonna del dataset |
| **Imputazione** | Tecnica per sostituire valori mancanti con un valore stimato (media, mediana, moda, ecc.) |
| **Outlier** | Valore anomalo, molto distante dalla maggior parte delle osservazioni |
| **IQR (Interquartile Range)** | Intervallo tra il 25° e il 75° percentile, usato per individuare outlier |
| **Normalizzazione** | Trasformazione dei dati numerici in un intervallo definito, tipicamente [0, 1] |
| **Standardizzazione (Z-score)** | Trasformazione dei dati numerici a media 0 e deviazione standard 1 |
| **Encoding** | Conversione di variabili categoriche in valori numerici |
| **One-Hot Encoding** | Tecnica di encoding che crea una colonna binaria per ciascuna categoria |
| **Feature Engineering** | Creazione di nuove variabili a partire da quelle esistenti, per migliorare l'informazione disponibile a un modello |
| **Correlazione** | Misura statistica della relazione lineare tra due variabili numeriche |
| **Data leakage** | Situazione in cui informazioni dal set di test "trapelano" nel processo di addestramento, falsando la valutazione del modello |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. Cosa si intende con l'acronimo EDA?**
- A) Enhanced Data Algorithm
- B) Exploratory Data Analysis ✅
- C) External Data Access
- D) Encoded Data Array

**2. Qual è una possibile strategia per gestire i valori mancanti in una colonna numerica?**
- A) Ignorarli sempre, tanto il modello li gestisce da solo
- B) Sostituirli con un valore stimato, ad esempio la media della colonna ✅
- C) Convertirli automaticamente in zero senza ulteriori valutazioni
- D) Duplicare le righe con valori mancanti

**3. Cosa misura l'IQR (Interquartile Range)?**
- A) La media di una colonna numerica
- B) Il numero totale di righe di un dataset
- C) L'intervallo tra il 25° e il 75° percentile, utile per individuare outlier ✅
- D) Il numero di valori mancanti in una colonna

**4. Qual è la differenza principale tra normalizzazione e standardizzazione?**
- A) Sono esattamente la stessa tecnica con nomi diversi
- B) La normalizzazione porta i dati in un intervallo definito (es. [0,1]), la standardizzazione li porta a media 0 e deviazione standard 1 ✅
- C) La normalizzazione si applica solo alle variabili categoriche
- D) La standardizzazione elimina automaticamente gli outlier

**5. A cosa serve il One-Hot Encoding?**
- A) A eliminare le variabili categoriche dal dataset
- B) A convertire una variabile categorica in più colonne binarie ✅
- C) A normalizzare una variabile numerica
- D) A trovare valori duplicati

**6. Cos'è la feature engineering?**
- A) La progettazione dell'interfaccia grafica di un'applicazione AI
- B) La creazione di nuove variabili a partire da quelle esistenti, per migliorare l'analisi o il modello ✅
- C) La scrittura di test automatici per il codice
- D) L'installazione delle librerie necessarie a un progetto

**7. Cosa mostra tipicamente una heatmap di correlazione?**
- A) La distribuzione geografica dei dati
- B) Il grado di relazione lineare tra tutte le coppie di variabili numeriche di un dataset ✅
- C) Il numero di righe duplicate nel dataset
- D) L'andamento temporale di una singola variabile

**8. Perché correlazione non implica causalità?**
- A) Perché due variabili correlate sono sempre indipendenti tra loro
- B) Perché una correlazione osservata potrebbe dipendere da altri fattori o essere casuale, senza che una variabile "causi" l'altra ✅
- C) Perché la correlazione si può calcolare solo su variabili categoriche
- D) Perché la correlazione misura solo la media di una variabile

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo

**Consegna:** Trasforma il laboratorio del punto 6 in un progetto documentato e riutilizzabile:

1. Organizza il lavoro in un notebook `analisi_dataset.ipynb` con una struttura chiara: EDA → Pulizia → Preprocessing → Feature Engineering → Visualizzazione → Conclusioni.
2. Scrivi, nella sezione conclusioni (cella Markdown), una sintesi di **almeno 10 righe** su: quali problemi di qualità hai riscontrato nel dataset, come li hai risolti e perché, quali pattern interessanti emergono dalle visualizzazioni.
3. Esporta il dataset pulito e arricchito in un nuovo file `dataset_pronto_ml.csv`, che userai come punto di partenza nel Modulo 6 (Machine Learning).
4. (Facoltativo, per chi vuole approfondire) Applica la classe OOP costruita nel Modulo 4 come base, estendendola con i metodi di pulizia e feature engineering visti in questo modulo.

Il dataset preparato in questo project work sarà riutilizzato direttamente nel Project Work di fine Livello Intermedio.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `studenti_grezzo.csv` — Dataset scolastico "sporco" per il laboratorio (valori mancanti, duplicati, outlier inseriti intenzionalmente)
- 📄 `analisi_dataset_soluzione.ipynb` — Notebook soluzione commentato del laboratorio
- 📄 `cheatsheet_pandas_pulizia.md` — Riassunto sintattico dei comandi Pandas per pulizia e preprocessing
- 📄 `cheatsheet_seaborn_grafici.md` — Riassunto dei principali grafici Seaborn con relativa sintassi

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- McKinney, W. — *Python for Data Analysis*, O'Reilly Media
- VanderPlas, J. — *Python Data Science Handbook*, O'Reilly Media
- Waskom, M. — *Seaborn: statistical data visualization* (paper ufficiale della libreria, Journal of Open Source Software)
- Kelleher, J. D., Tierney, B. — *Data Science*, MIT Press

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Pandas: pandas.pydata.org/docs
- Documentazione ufficiale Seaborn: seaborn.pydata.org
- Kaggle Datasets: kaggle.com/datasets
- UCI Machine Learning Repository: archive.ics.uci.edu

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Prosegui con il Modulo 6: Machine Learning]**
