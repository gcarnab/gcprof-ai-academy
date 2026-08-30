# 🟢 MODULO 0 — Introduzione al Percorso, Obiettivi e Setup

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent · Percorso ispirato al programma "Laboratorio pratico di Machine Learning e sviluppo di AI Agent"· Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [0.1 Il filo conduttore del percorso: da "prevedere" ad "agire"](#sez-0-1)
2. [0.2 A chi è rivolto il corso e prerequisiti](#sez-0-2)
3. [0.3 Perché lavoreremo su Google Colab](#sez-0-3)
4. [🐍 Laboratorio Python 0.1 — Verifica dell'ambiente e installazione di Gymnasium](#lab-0-1)
5. [🐍 Laboratorio Python 0.2 — Attivare (e verificare) la GPU](#lab-0-2)
6. [0.4 Organizzare i tuoi file: upload diretto o Google Drive](#sez-0-4)
7. [0.5 Convenzioni di codice che useremo in tutto il corso](#sez-0-5)
8. [0.6 Glossario del modulo](#sez-0-6)
9. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- spiegare qual è il filo conduttore dell'intero percorso e come si collegano tra loro i quattro moduli successivi;
- riconoscere la differenza concettuale tra un modello che "predice" e un **AI Agent** che "decide e agisce";
- sapere a chi è rivolto il corso e verificare di possederne i prerequisiti;
- aprire un notebook Google Colab, verificare le librerie preinstallate e installare quelle mancanti;
- attivare la GPU quando serve, e verificarne la disponibilità da codice;
- caricare un dataset in Colab, sia tramite upload diretto sia tramite Google Drive;
- riconoscere le convenzioni di scrittura del codice che ritroverai in ogni modulo del corso.

---

<a id="sez-0-1"></a>
# 0.1 Il filo conduttore del percorso: da "prevedere" ad "agire"

[⬆ Torna all'indice del modulo](#indice-modulo)

Benvenuto! Stai per iniziare un laboratorio che non si limita a *spiegare* il Machine Learning: te lo fa **costruire con le tue mani**, un modulo alla volta. Il percorso riprende e amplia il progetto originale "Laboratorio pratico di Machine Learning e sviluppo di AI Agent" (12 ore, 4 sessioni), trasformandolo in un corso completo per gcprof-academy.com. Ogni sessione originale diventa qui un **modulo indipendente**, con teoria, esempi commentati, un progetto guidato su dati reali, best practice, errori comuni e glossario — così da poter essere insegnato in classe anche singolarmente, senza dover dipendere dagli altri moduli.

Il filo conduttore che attraversa tutto il corso è la costruzione, passo dopo passo, di **agenti che imparano**:

```text
Modulo 1                Modulo 2                 Modulo 3                Modulo 4
Il modello impara   →   Il modello impara    →   Il modello impara   →   L'agente impara
a CLASSIFICARE           a SCOPRIRE PATTERN         a RAPPRESENTARE         a DECIDERE E AGIRE
(supervised)              (unsupervised)             (deep learning)         (reinforcement learning)
```

> **Definizione**
>
> Un modello di Machine Learning classico (es. un classificatore KNN) *predice* un'etichetta a partire da dati statici, già fermi lì, immutabili. Un **AI Agent**, invece, *percepisce* uno stato, *decide* un'azione e *agisce* in un ambiente che cambia in risposta alle sue scelte, ricevendo un segnale di rinforzo (reward). Il Reinforcement Learning — il cuore del Modulo 4 — è il ponte naturale tra "fare previsioni" e "costruire agenti autonomi".

> 💡 **Approfondimento**
>
> Lo stesso schema concettuale che vedrai nel Modulo 4 — percezione → decisione → azione → memoria — è quello che ritroverai, in forma molto più sofisticata, negli AI Agent basati sui moderni Large Language Model (il tema del Modulo 11 del Master in Intelligenza Artificiale di GCProf Academy). L'agente Taxi-v3 che costruirai a fine corso è, a tutti gli effetti, il tuo primo vero "AI Agent": piccolo, tabellare, ma concettualmente identico nella struttura a sistemi molto più complessi.

Ogni modulo segue le **5 fasi** della metodologia GCProf Academy: **comprendere → visualizzare → analizzare casi reali → applicare → verificare**. Non ti chiediamo mai di eseguire codice che non hai capito: prima la teoria, poi la visualizzazione del concetto, poi un caso reale, poi l'applicazione pratica.

---

<a id="sez-0-2"></a>
# 0.2 A chi è rivolto il corso e prerequisiti

[⬆ Torna all'indice del modulo](#indice-modulo)

**Livello:** Intermedio/Avanzato — corso interamente laboratoriale, con notebook eseguibili al 100% in **Google Colab**, senza bisogno di installare nulla sul proprio computer.

**Il corso è pensato per:**

- studenti delle superiori e universitari che vogliono passare dalla teoria dell'AI alla pratica del codice;
- sviluppatori e professionisti ICT che vogliono aggiungere il Machine Learning al proprio bagaglio tecnico;
- insegnanti che cercano un laboratorio pronto, modulare e indipendente da portare in classe, modulo per modulo.

**Prerequisiti consigliati:**

- basi di Python (variabili, funzioni, cicli, liste/dizionari);
- utile ma non indispensabile: aver seguito i moduli "Python per AI" e "Data Analysis" del Master in Intelligenza Artificiale di gcprof-academy.com.

> ⚠️ **Attenzione**
>
> Non è richiesta alcuna competenza pregressa di Machine Learning: è proprio quello che costruiremo insieme, modulo dopo modulo. Serve però una base di Python già solida, perché da qui in poi il codice è protagonista di ogni lezione.

---

<a id="sez-0-3"></a>
# 0.3 Perché lavoreremo su Google Colab

[⬆ Torna all'indice del modulo](#indice-modulo)

Per tutto il corso lavoreremo su **Google Colab**: un ambiente Jupyter gratuito, che gira interamente nel browser sui server di Google, senza bisogno di installare Python, librerie o driver GPU sul proprio PC.

È la scelta ideale per un laboratorio didattico per tre motivi concreti:

- **azzera i problemi di setup:** niente conflitti di versione, niente "sul mio computer funzionava";
- mette a disposizione **GPU gratuite**, utili in particolare nel Modulo 3 (Deep Learning con PyTorch) per velocizzare l'addestramento delle reti neurali;
- ogni notebook è **condivisibile con un semplice link**, comodo sia per il docente che deve distribuire il materiale, sia per lo studente che vuole conservare il proprio lavoro.

**Come iniziare:** vai su [colab.research.google.com](https://colab.research.google.com), accedi con un account Google e crea un nuovo notebook (`File → Nuovo blocco note`). Ti consigliamo di crearne uno nuovo a ogni modulo (es. `Modulo1_Supervised.ipynb`, `Modulo2_Unsupervised.ipynb`...), così da mantenere il lavoro ordinato e facilmente ritrovabile.

---

<a id="lab-0-1"></a>
# 🐍 Laboratorio Python 0.1 — Verifica dell'ambiente e installazione di Gymnasium

[⬆ Torna all'indice del modulo](#indice-modulo)

Google Colab include già preinstallate quasi tutte le librerie che useremo nel corso: `pandas`, `numpy`, `matplotlib`, `seaborn`, `scikit-learn` e `torch`. L'unica libreria non inclusa di default, necessaria solo nel Modulo 4, è `gymnasium`. In questo primo laboratorio verifichiamo tutto l'ambiente in un colpo solo.

```python
# ============================================================
# ESERCIZIO 0.1 - Verifica dell'ambiente di lavoro
# Obiettivo: controllare che tutte le librerie del corso siano
#            disponibili e funzionanti, stampandone la versione.
#            Nessuna di queste librerie va installata "a mano":
#            sono già pronte nell'ambiente Google Colab.
# ============================================================

import sklearn
import pandas as pd
import numpy as np
import matplotlib
import torch

print("Librerie già preinstallate in Google Colab:")
print(f"  scikit-learn : {sklearn.__version__}")
print(f"  pandas       : {pd.__version__}")
print(f"  numpy        : {np.__version__}")
print(f"  matplotlib   : {matplotlib.__version__}")
print(f"  torch        : {torch.__version__}")
```

```python
# ============================================================
# ESERCIZIO 0.1 (continua) - Installazione di Gymnasium
# Obiettivo: installare l'unica libreria del corso non inclusa
#            di default in Colab, necessaria per il Modulo 4
#            (Reinforcement Learning e AI Agent).
# ============================================================

# Il punto esclamativo iniziale dice a Colab: "esegui questo come
# comando di terminale", non come istruzione Python.
# -q (quiet) riduce l'output della cella a schermo.
!pip install -q gymnasium

# Verifichiamo che l'installazione sia andata a buon fine
import gymnasium as gym
print(f"\ngymnasium installato correttamente, versione {gym.__version__}")
```

> 💡 **Approfondimento**
>
> Ogni volta che apri (o riavvii) un notebook Colab, la macchina virtuale che lo esegue riparte da zero: le librerie installate con `!pip install` vanno **reinstallate**. Per questo motivo, nel Modulo 4 troverai di nuovo la riga `!pip install -q gymnasium` come prima cella: eseguila sempre, anche se pensi di averlo già fatto in una sessione precedente.

---

<a id="lab-0-2"></a>
# 🐍 Laboratorio Python 0.2 — Attivare (e verificare) la GPU

[⬆ Torna all'indice del modulo](#indice-modulo)

Per addestrare la rete neurale del Modulo 3 più velocemente, conviene attivare l'acceleratore hardware del notebook: `Runtime → Cambia tipo di runtime → Acceleratore hardware → GPU (T4)`. Il codice del Modulo 3 funziona comunque anche senza GPU attiva, semplicemente in modo un po' più lento — quindi questo passaggio è consigliato ma non bloccante.

```python
# ============================================================
# ESERCIZIO 0.2 - Verifica della disponibilità della GPU
# Obiettivo: controllare via codice se il notebook ha una GPU
#            attiva, in modo da sapere già ora se il Modulo 3
#            girerà su GPU o su CPU.
# ============================================================

import torch

# torch.cuda.is_available() restituisce True solo se è stata
# attivata una GPU dal menu Runtime del notebook.
device = "cuda" if torch.cuda.is_available() else "cpu"

print(f"Dispositivo di calcolo disponibile in questo notebook: {device}")

if device == "cuda":
    # Se la GPU è attiva, stampiamo anche il suo nome commerciale
    print(f"GPU rilevata: {torch.cuda.get_device_name(0)}")
else:
    print("Nessuna GPU attiva: il codice funzionerà comunque, solo un po' più lentamente.")
```

**Prova tu!** Attiva la GPU dal menu `Runtime` come indicato sopra, poi rilancia questa stessa cella: il messaggio stampato dovrebbe cambiare da `cpu` a `cuda`.

---

<a id="sez-0-4"></a>
# 0.4 Organizzare i tuoi file: upload diretto o Google Drive

[⬆ Torna all'indice del modulo](#indice-modulo)

Nella maggior parte dei moduli useremo dataset già inclusi nelle librerie che utilizziamo (come vedrai già nel Modulo 1), quindi non dovrai caricare alcun file. Quando invece un modulo richiederà di caricare un dataset esterno (es. un file `.csv`), avrai due strade possibili:

```python
# ------------------------------------------------------------
# Opzione A - Caricamento diretto di un file dal tuo computer
# Comodo per un uso rapido, ma il file va ricaricato a ogni
# nuova sessione di Colab (la macchina virtuale "dimentica" tutto).
# ------------------------------------------------------------
from google.colab import files
uploaded = files.upload()   # apre una finestra per scegliere il file dal PC
```

```python
# ------------------------------------------------------------
# Opzione B - Collegamento al proprio Google Drive
# Più comodo per dataset riutilizzati in più moduli: monta Drive
# una sola volta e poi leggi i file come se fossero su disco locale.
# ------------------------------------------------------------
from google.colab import drive
drive.mount('/content/drive')

# Da questo momento puoi leggere un file così, ad esempio:
# df = pd.read_csv('/content/drive/MyDrive/dataset.csv')
```

> ⚠️ **Attenzione**
>
> Nei moduli in cui è richiesto un dataset esterno, indicheremo sempre da dove ottenerlo. Quando possibile, preferiamo caricare i dati direttamente via URL con `pandas.read_csv()`, oppure usare dataset già integrati nelle librerie (come nel Modulo 1): è il metodo più semplice da riprodurre in aula, perché non richiede upload manuali né account Drive condivisi tra studenti.

---

<a id="sez-0-5"></a>
# 0.5 Convenzioni di codice che useremo in tutto il corso

[⬆ Torna all'indice del modulo](#indice-modulo)

Per rendere il corso coerente da un modulo all'altro, manteniamo sempre queste convenzioni:

- ogni cella di codice è **commentata nei punti concettualmente rilevanti**: l'obiettivo è che tu capisca *perché* si scrive una riga, non solo *cosa* fa;
- i nomi di variabili, funzioni e commenti sono in **italiano**, per restare coerenti con il resto del materiale didattico;
- vedrai spesso `random_state=42` (o valori equivalenti): serve a rendere gli esperimenti **riproducibili**, così che il tuo output numerico corrisponda sempre a quello atteso;
- le celle di codice vanno eseguite **in ordine, dall'alto verso il basso**, esattamente come sono presentate nel modulo;
- ogni laboratorio pratico ti invita, dove possibile, a "provare tu" modificando qualche parametro: è il modo migliore per trasformare il codice letto in una competenza davvero acquisita.

---

<a id="sez-0-6"></a>
# 0.6 Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|---|---|
| **Notebook** | Documento interattivo che alterna celle di testo (Markdown) e celle di codice eseguibile, tipico degli ambienti Jupyter/Colab |
| **Runtime** | La macchina virtuale su cui Colab esegue il tuo codice; può essere riavviata o disconnessa, facendo perdere variabili e librerie installate manualmente |
| **GPU (Graphics Processing Unit)** | Processore specializzato in calcoli paralleli, particolarmente efficace nell'addestramento di reti neurali |
| **Riproducibilità** | Proprietà di un esperimento che, a parità di condizioni (es. stesso `random_state`), produce sempre lo stesso risultato |
| **AI Agent** | Sistema che percepisce uno stato, decide un'azione e agisce in un ambiente per raggiungere un obiettivo, migliorando nel tempo grazie a un segnale di ricompensa |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo introduttivo hai scoperto:

- il filo conduttore dell'intero percorso: quattro moduli progressivi che raccontano il passaggio da "modello che predice" ad "agente che decide e agisce";
- a chi è rivolto il corso e quali prerequisiti servono per affrontarlo con profitto;
- perché lavoreremo su Google Colab, e come verificare da codice librerie, GPU e installazioni;
- come caricare un dataset esterno quando necessario, tramite upload diretto o Google Drive;
- le convenzioni di scrittura del codice che ritroverai identiche in ogni modulo successivo.

Ambiente pronto, obiettivi chiari: ora si comincia a scrivere modelli veri. Nel prossimo modulo — **Modulo 1 — Apprendimento Supervisionato** — costruirai il tuo primo classificatore, imparando a distinguere overfitting e underfitting su un dataset reale di analisi chimiche di vini.

[⬆ Torna all'indice del modulo](#indice-modulo)