# 🤖 AI Masterclass : Guida Avanzata all'Intelligenza Artificiale

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Ottimizzata per Google Colab · Aggiornata al Luglio 2026

---

## <a id="indice"></a> Indice dei Moduli
1.  [**Modulo 1**: Epistemologia e Architetture dell'AI Moderna](#modulo1)
2.  [**Modulo 2**: Machine Learning & Advanced Analytics](#modulo2)
3.  [**Modulo 3**: Reti Neurali, Deep Learning e Multimodalità](#modulo3)
4.  [**Modulo 4**: Strategic Prompt Engineering](#modulo4)
5.  [**Modulo 5**: Frontiere Tecnologiche: Quantum AI e Neuromorphic Computing](#modulo5)
6.  [**Modulo 6**: Etica, Governance e Regolamentazione (EU AI Act 2.0)](#modulo6)

---

## <a id="modulo1"></a> 🔵 MODULO 1 — Epistemologia, Fondamenti e Architetture dell'Intelligenza Artificiale Moderna

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- comprendere cosa si intende realmente per Intelligenza Artificiale;
- distinguere AI, Machine Learning, Deep Learning e Generative AI;
- conoscere l'evoluzione storica dell'AI e le principali tappe tecnologiche;
- comprendere il funzionamento generale di un moderno sistema di AI;
- distinguere le diverse tipologie di AI oggi disponibili;
- comprendere il ruolo dei Large Language Models (LLM) e degli AI Agent;
- acquisire il lessico tecnico indispensabile per affrontare i moduli successivi.

---

# 1.1 Che cos'è realmente l'Intelligenza Artificiale?

L'**Intelligenza Artificiale (Artificial Intelligence - AI)** è il ramo dell'informatica che progetta sistemi capaci di eseguire attività che normalmente richiedono l'intelligenza umana.

Tra queste attività troviamo:

- apprendere dall'esperienza;
- ragionare;
- prendere decisioni;
- comprendere il linguaggio naturale;
- riconoscere immagini e suoni;
- pianificare attività;
- risolvere problemi complessi;
- generare nuovi contenuti.

> **Definizione moderna**
>
> Un sistema di AI è un sistema software (e talvolta hardware) che utilizza modelli matematici per estrarre conoscenza dai dati e produrre decisioni, previsioni o contenuti con un certo grado di autonomia.

L'intelligenza artificiale non "pensa" come un essere umano.

Essa elabora enormi quantità di dati mediante algoritmi statistici, modelli probabilistici e reti neurali, producendo risultati che spesso appaiono intelligenti.

---

# 1.2 AI, Machine Learning, Deep Learning e Generative AI

Molto spesso questi termini vengono utilizzati come sinonimi, ma rappresentano livelli differenti della stessa disciplina.

```text
Intelligenza Artificiale (AI)
│
├── Machine Learning (ML)
│      │
│      ├── Deep Learning (DL)
│      │       │
│      │       ├── Large Language Models (LLM)
│      │       ├── Vision Models
│      │       ├── Audio Models
│      │       └── Multimodal Models
│      │
│      └── Reinforcement Learning
│
└── Sistemi Esperti
```

| Tecnologia | Descrizione |
|------------|-------------|
| **AI** | Insieme delle tecniche che permettono alle macchine di simulare capacità cognitive. |
| **Machine Learning** | L'algoritmo apprende automaticamente dai dati. |
| **Deep Learning** | Utilizza reti neurali profonde con milioni o miliardi di parametri. |
| **Generative AI** | Produce nuovi contenuti (testo, immagini, audio, video, codice). |

---

# 1.3 Breve storia dell'Intelligenza Artificiale

## 1943

McCulloch e Pitts descrivono il primo modello matematico di neurone artificiale.

## 1950

Alan Turing pubblica *Computing Machinery and Intelligence* introducendo il celebre **Test di Turing**.

## 1956

Alla Conferenza di Dartmouth nasce ufficialmente il termine **Artificial Intelligence**.

## Anni '60-'70

Si sviluppano i primi sistemi esperti.

## Anni '80

Boom dei sistemi basati su regole.

## Anni '90

L'aumento della potenza di calcolo rilancia il Machine Learning.

## 1997

Deep Blue sconfigge Garry Kasparov.

## 2012

AlexNet rivoluziona il riconoscimento delle immagini grazie al Deep Learning.

## 2017

Google pubblica il paper **Attention Is All You Need**, introducendo i Transformer.

Questa architettura rappresenta una delle più grandi rivoluzioni della storia dell'AI.

## 2022

La diffusione dei Large Language Models rende l'AI generativa accessibile al grande pubblico.

## 2024–2026

Si affermano:

- AI multimodale
- AI Agent
- Reasoning Models
- sistemi autonomi collaborativi
- integrazione dell'AI in quasi tutti i software professionali.

---

# 1.4 Le grandi categorie dell'AI

## Artificial Narrow Intelligence (ANI)

È l'unica forma realmente esistente oggi.

È progettata per svolgere compiti specifici.

Esempi:

- ChatGPT
- sistemi di guida assistita
- riconoscimento facciale
- traduzione automatica
- motori di raccomandazione.

---

## Artificial General Intelligence (AGI)

Una futura AI capace di svolgere qualsiasi attività intellettuale umana.

Caratteristiche attese:

- ragionamento generale;
- apprendimento continuo;
- trasferimento della conoscenza;
- pianificazione autonoma;
- comprensione interdisciplinare.

Ad oggi **non esiste una AGI universalmente riconosciuta**, anche se alcuni modelli mostrano capacità sempre più vicine a forme di ragionamento generale.

---

## Artificial Super Intelligence (ASI)

Ipotesi teorica di un'intelligenza superiore a quella umana in ogni ambito.

È attualmente oggetto di ricerca filosofica, scientifica ed etica.

---

# 1.5 Il Teorema di Tesler

Larry Tesler formulò una celebre osservazione:

> **"L'AI è tutto ciò che non è ancora stato risolto."**

Quando una tecnologia diventa comune, smette di essere percepita come intelligenza artificiale.

Esempi:

- OCR
- correttore ortografico
- GPS intelligente
- filtri antispam
- riconoscimento vocale.

Questi sistemi oggi sono considerati normali funzionalità software, pur essendo nati come applicazioni di AI.

---

# 1.6 Come funziona un moderno sistema di AI

Ogni sistema di AI può essere visto come una pipeline composta da diverse fasi.

```text
Dati
   │
   ▼
Pre-processing
   │
   ▼
Embedding
   │
   ▼
Modello AI
   │
   ▼
Inferenza
   │
   ▼
Output
   │
   ▼
Feedback
```

## 1. Acquisizione dei dati

I dati possono essere:

- testo
- immagini
- video
- audio
- sensori
- dati industriali
- database
- Internet
- documenti.

---

## 2. Pulizia e normalizzazione

Prima dell'addestramento i dati vengono:

- puliti;
- normalizzati;
- deduplicati;
- etichettati;
- trasformati in formato numerico.

La qualità dei dati influenza direttamente la qualità del modello.

> **Garbage In → Garbage Out (GIGO)**  
> Dati scadenti producono modelli scadenti.

---

## 3. Addestramento (Training)

Durante questa fase il modello apprende i pattern statistici presenti nei dati modificando progressivamente miliardi di parametri interni.

L'obiettivo è ridurre l'errore di previsione.

---

## 4. Inferenza

Terminato l'addestramento, il modello viene utilizzato per produrre risposte.

Questa fase prende il nome di **Inference**.

È la modalità utilizzata quando interagiamo con un chatbot.

---

## 5. Feedback

Le prestazioni vengono monitorate nel tempo.

Nuovi dati consentono di:

- migliorare il modello;
- correggere errori;
- ridurre bias;
- aumentare accuratezza e robustezza.

---

# 1.7 I Large Language Models (LLM)

Gli LLM sono reti neurali basate sull'architettura Transformer.

Sono addestrati su quantità enormi di testo.

Non memorizzano semplicemente informazioni.

Apprendono le relazioni statistiche tra parole, concetti e contesti.

Sono in grado di:

- rispondere a domande;
- tradurre;
- programmare;
- sintetizzare documenti;
- ragionare;
- scrivere codice;
- produrre contenuti creativi.

Tra le caratteristiche più importanti troviamo:

- contesto conversazionale;
- ragionamento multi-step;
- comprensione del linguaggio naturale;
- capacità multimodale;
- utilizzo di strumenti esterni (Tool Use);
- memoria contestuale;
- pianificazione.

---

# 1.8 Dall'LLM agli AI Agent

Una delle principali evoluzioni del biennio 2025–2026 è rappresentata dagli **AI Agent**.

Un agente non si limita a generare testo.

Può:

- pianificare attività;
- usare strumenti;
- leggere documenti;
- consultare database;
- navigare sul Web;
- scrivere codice;
- eseguire workflow;
- collaborare con altri agenti.

Schema semplificato:

```text
Utente
   │
   ▼
AI Agent
   │
 ┌─┴───────────────────────────────┐
 │                                │
Web Search                    Database
 │                                │
Documenti                     API
 │                                │
Calcoli                     Strumenti
```

Gli AI Agent rappresentano una delle direzioni più promettenti dell'evoluzione dell'AI moderna.

---

# 1.9 Le principali architetture moderne

Nel panorama attuale convivono numerose architetture.

| Architettura | Applicazione principale |
|--------------|------------------------|
| CNN | Visione artificiale |
| RNN | Dati sequenziali |
| LSTM | Serie temporali |
| GRU | Elaborazione sequenze |
| Transformer | Linguaggio naturale |
| Diffusion Models | Generazione immagini |
| Vision Transformer (ViT) | Computer Vision |
| Multimodal Transformer | Testo + immagini + audio |

---

# 1.10 Limiti dell'AI moderna

Anche i modelli più avanzati presentano limiti significativi.

Tra i principali:

- allucinazioni;
- bias nei dati;
- scarsa interpretabilità;
- elevato consumo energetico;
- dipendenza dalla qualità del dataset;
- difficoltà nel ragionamento perfettamente simbolico;
- problemi di privacy e copyright;
- costi computazionali elevati.

Comprendere questi limiti è essenziale per utilizzare l'AI in modo critico e responsabile.

---

# 1.11 Glossario essenziale

| Termine | Significato |
|----------|-------------|
| AI | Artificial Intelligence |
| ML | Machine Learning |
| DL | Deep Learning |
| LLM | Large Language Model |
| Prompt | Istruzione fornita al modello |
| Token | Unità elementare elaborata dal modello |
| Dataset | Insieme di dati utilizzato per l'addestramento |
| Training | Processo di apprendimento del modello |
| Inference | Utilizzo del modello addestrato |
| Transformer | Architettura alla base degli LLM moderni |
| Embedding | Rappresentazione numerica del significato di un dato |
| Fine-Tuning | Riaddestramento specializzato di un modello |
| RAG | Retrieval-Augmented Generation |
| AI Agent | Sistema autonomo capace di utilizzare strumenti e pianificare attività |

---

# Riepilogo del modulo

Al termine di questo primo modulo hai acquisito una visione completa dell'ecosistema dell'Intelligenza Artificiale moderna:

- evoluzione storica dell'AI;
- differenze tra AI, ML, DL e Generative AI;
- classificazione ANI, AGI e ASI;
- funzionamento interno di un sistema di AI;
- architettura generale degli LLM;
- nascita degli AI Agent;
- principali architetture neurali;
- limiti e sfide dell'AI contemporanea;
- lessico tecnico fondamentale.

Queste conoscenze costituiscono le basi teoriche indispensabili per affrontare il **Modulo 2**, dedicato al Machine Learning, all'analisi dei dati e ai processi di addestramento dei modelli.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo2"></a> 🟢 MODULO 2 — Machine Learning, Data Science e Advanced Analytics

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- comprendere il funzionamento del Machine Learning;
- distinguere i principali paradigmi di apprendimento automatico;
- conoscere il workflow professionale di un progetto di Data Science;
- comprendere il ruolo dei dati nell'addestramento dei modelli;
- riconoscere i problemi più comuni durante il training;
- valutare le prestazioni di un modello mediante le principali metriche;
- comprendere il collegamento tra Machine Learning, Deep Learning e AI Generativa.

---

# 2.1 Che cos'è il Machine Learning?

Il **Machine Learning (ML)** è una disciplina dell'Intelligenza Artificiale che permette ai computer di **imparare automaticamente dai dati**, senza che ogni regola venga programmata esplicitamente.

In un software tradizionale il programmatore definisce tutte le regole.

Nel Machine Learning, invece, il sistema **ricava autonomamente tali regole osservando grandi quantità di esempi**.

## Programmazione tradizionale

```text
Dati + Regole
        │
        ▼
    Risultato
```

## Machine Learning

```text
Dati + Risultati corretti
          │
          ▼
      Algoritmo
          │
          ▼
      Modello
```

Una volta addestrato, il modello sarà in grado di produrre nuove previsioni su dati mai visti.

---

# 2.2 Perché il Machine Learning è diventato così importante?

Negli ultimi anni il Machine Learning è diventato il paradigma dominante grazie a tre fattori fondamentali.

## 1. Disponibilità dei dati (Big Data)

Internet produce ogni giorno enormi quantità di informazioni:

- social network;
- immagini;
- video;
- documenti;
- sensori IoT;
- transazioni finanziarie;
- cartelle cliniche;
- dati industriali.

Più dati sono disponibili, maggiore è il potenziale di apprendimento del modello.

---

## 2. Potenza di calcolo

GPU, TPU e cloud computing permettono oggi di addestrare modelli con miliardi di parametri.

Un addestramento che vent'anni fa avrebbe richiesto mesi oggi può richiedere poche ore o pochi giorni.

---

## 3. Evoluzione degli algoritmi

Le moderne tecniche di ottimizzazione hanno reso possibile l'addestramento di reti neurali profonde con prestazioni prima impensabili.

Tra gli algoritmi più importanti troviamo:

- Gradient Descent
- Stochastic Gradient Descent
- Adam
- AdamW
- RMSProp
- AdaGrad

---

# 2.3 Il ciclo di vita di un progetto di Machine Learning

Un progetto professionale segue normalmente il seguente workflow.

```text
Definizione del problema
          │
          ▼
 Raccolta dei dati
          │
          ▼
 Pulizia e preparazione
          │
          ▼
 Feature Engineering
          │
          ▼
 Addestramento
          │
          ▼
 Validazione
          │
          ▼
 Test
          │
          ▼
 Deployment
          │
          ▼
 Monitoraggio continuo
```

Ogni fase è fondamentale.

Un modello eccellente non può compensare dati di bassa qualità.

---

# 2.4 I dati: il vero carburante dell'AI

Il Machine Learning dipende principalmente dalla qualità dei dati.

Le principali tipologie sono:

## Dati strutturati

Organizzati in tabelle.

Esempi:

- database SQL;
- fogli Excel;
- CSV.

---

## Dati semi-strutturati

Presentano una struttura flessibile.

Esempi:

- JSON;
- XML;
- YAML.

---

## Dati non strutturati

Sono la categoria più numerosa.

Comprendono:

- immagini;
- audio;
- video;
- PDF;
- email;
- documenti;
- pagine web.

Oggi oltre l'80% dei dati prodotti nel mondo appartiene a questa categoria.

---

# 2.5 I paradigmi fondamentali del Machine Learning

## Supervised Learning

Nel **Supervised Learning** ogni esempio contiene sia l'input sia la risposta corretta (label).

```text
Input → Output corretto
```

Il modello impara la relazione tra le due informazioni.

### Applicazioni

- riconoscimento email spam;
- diagnosi medica;
- riconoscimento immagini;
- valutazione rischio bancario;
- previsione vendite;
- riconoscimento vocale.

---

### Classificazione

La classificazione produce una categoria.

Esempi:

- Spam / Non Spam
- Cane / Gatto
- Cliente affidabile / Cliente rischioso

---

### Regressione

La regressione produce un valore numerico continuo.

Esempi:

- prezzo di una casa;
- temperatura;
- fatturato;
- consumi energetici.

---

## Unsupervised Learning

In questo caso il dataset **non contiene etichette**.

L'obiettivo è individuare automaticamente strutture nascoste.

### Applicazioni

- segmentazione clienti;
- rilevazione anomalie;
- compressione dati;
- marketing;
- recommendation system.

---

### Clustering

Il clustering raggruppa automaticamente elementi simili.

Algoritmi principali:

- K-Means
- DBSCAN
- Hierarchical Clustering
- Mean Shift

---

### Riduzione della dimensionalità

Serve a ridurre il numero di variabili mantenendo l'informazione principale.

Tecniche più utilizzate:

- PCA
- t-SNE
- UMAP

---

## Semi-Supervised Learning

Combina pochi dati etichettati con grandi quantità di dati non etichettati.

È molto utilizzato in ambito medico e industriale.

---

## Self-Supervised Learning

È la tecnica che ha rivoluzionato gli LLM.

Il modello crea automaticamente i propri esempi di addestramento.

Per esempio:

> "Indovina la parola successiva."

oppure

> "Ricostruisci la parte mancante del testo."

Questa tecnica permette di sfruttare enormi quantità di dati presenti su Internet.

---

## Reinforcement Learning

Nel Reinforcement Learning un agente interagisce con un ambiente.

Riceve:

- osservazioni;
- ricompense;
- penalità.

L'obiettivo è massimizzare la ricompensa nel lungo periodo.

```text
Agente
   │
   ▼
 Ambiente
   │
   ▼
 Ricompensa
   ▲
   │
Decisione
```

Applicazioni:

- robotica;
- videogiochi;
- guida autonoma;
- trading;
- ottimizzazione industriale;
- AI Agent.

---

# 2.6 Feature Engineering

Una **feature** è una caratteristica significativa dei dati.

Esempio:

Per prevedere il prezzo di una casa:

- superficie;
- numero stanze;
- piano;
- città;
- anno costruzione;
- classe energetica.

Il Feature Engineering consiste nel:

- selezionare le variabili migliori;
- crearne di nuove;
- eliminare quelle inutili;
- trasformarle per migliorarne il potere predittivo.

Spesso questa fase determina oltre il 70% delle prestazioni finali del modello.

---

# 2.7 Addestramento del modello

Durante il training il modello modifica continuamente i propri parametri.

Il processo può richiedere:

- minuti;
- ore;
- giorni;
- settimane.

Dipende da:

- numero di dati;
- numero di parametri;
- potenza hardware;
- complessità dell'algoritmo.

---

# 2.8 Training, Validation e Test Set

Per evitare valutazioni ingannevoli il dataset viene suddiviso.

| Dataset | Scopo |
|----------|-------|
| Training | Apprendimento |
| Validation | Ottimizzazione iperparametri |
| Test | Valutazione finale |

Una divisione tipica è:

- 70% Training
- 15% Validation
- 15% Test

---

# 2.9 Overfitting e Underfitting

## Underfitting

Il modello è troppo semplice.

Non riesce ad apprendere correttamente.

Prestazioni:

- scarse sul training;
- scarse sul test.

---

## Overfitting

Il modello memorizza il dataset.

Non generalizza.

Prestazioni:

- ottime sul training;
- pessime sul test.

---

## Come ridurre l'Overfitting

- più dati;
- Data Augmentation;
- regolarizzazione;
- Dropout;
- Early Stopping;
- Cross Validation;
- semplificazione del modello.

---

# 2.10 Cross Validation

La Cross Validation permette di ottenere una stima molto più affidabile delle prestazioni.

La tecnica più diffusa è la **K-Fold Cross Validation**.

```text
Fold 1
Fold 2
Fold 3
Fold 4
Fold 5
```

Ogni fold diventa, a turno, il dataset di validazione.

Il risultato finale è la media delle prestazioni.

---

# 2.11 Metriche di valutazione

Una buona Accuratezza non basta.

Le metriche cambiano in funzione del problema.

## Accuracy

Percentuale di previsioni corrette.

---

## Precision

Quanto sono affidabili le previsioni positive.

---

## Recall

Quanti casi positivi vengono realmente individuati.

---

## F1-Score

Media armonica tra Precision e Recall.

Molto utilizzata nei dataset sbilanciati.

---

## ROC-AUC

Misura la capacità discriminante del modello.

Valori vicini a 1 indicano ottime prestazioni.

---

## MAE

Errore assoluto medio.

---

## MSE

Errore quadratico medio.

---

## RMSE

Radice quadrata del MSE.

Penalizza maggiormente gli errori elevati.

---

# 2.12 Confusion Matrix

La matrice di confusione rappresenta il comportamento del classificatore.

| | Predetto Positivo | Predetto Negativo |
|---|---:|---:|
| Reale Positivo | TP | FN |
| Reale Negativo | FP | TN |

Da questa matrice derivano quasi tutte le metriche di classificazione.

---

# 2.13 Hyperparameter Tuning

Gli **iperparametri** non vengono appresi automaticamente.

Sono impostati dal progettista.

Esempi:

- Learning Rate;
- Batch Size;
- Numero di Layer;
- Numero di Epoche;
- Dropout;
- Numero di neuroni.

Tecniche comuni:

- Grid Search;
- Random Search;
- Bayesian Optimization;
- Optuna;
- Hyperband.

---

# 2.14 MLOps

Quando un modello entra in produzione è necessario gestirne l'intero ciclo di vita.

L'MLOps integra:

- DevOps;
- Data Engineering;
- Machine Learning;
- Monitoraggio;
- CI/CD.

Le attività comprendono:

- versionamento modelli;
- monitoraggio delle prestazioni;
- rilevazione del Data Drift;
- riaddestramento automatico;
- auditing;
- sicurezza.

---

# 2.15 Le principali librerie del Machine Learning

## Python

Le librerie più utilizzate sono:

- NumPy
- Pandas
- Scikit-Learn
- TensorFlow
- Keras
- PyTorch
- XGBoost
- LightGBM
- CatBoost

---

# 2.16 Applicazioni reali del Machine Learning

Il Machine Learning è ormai presente in quasi tutti i settori.

## Sanità

- diagnosi assistita;
- analisi TAC;
- scoperta farmaci.

## Finanza

- antifrode;
- trading;
- credit scoring.

## Industria

- manutenzione predittiva;
- controllo qualità;
- robotica.

## Marketing

- customer segmentation;
- recommendation system;
- previsione churn.

## Automotive

- ADAS;
- guida autonoma;
- predictive maintenance.

## Cybersecurity

- rilevazione malware;
- intrusion detection;
- analisi comportamentale.

---

# 2.17 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| Feature | Variabile utilizzata dal modello |
| Label | Risposta corretta |
| Dataset | Insieme dei dati |
| Training | Addestramento |
| Validation | Ottimizzazione |
| Test | Verifica finale |
| Epoch | Passaggio completo sul dataset |
| Batch | Gruppo di esempi elaborati insieme |
| Learning Rate | Velocità di apprendimento |
| Overfitting | Memorizzazione dei dati |
| Underfitting | Modello troppo semplice |
| Inference | Utilizzo del modello addestrato |
| MLOps | Gestione del ciclo di vita dei modelli |

---

# Riepilogo del modulo

In questo modulo hai approfondito il funzionamento del Machine Learning e il processo con cui i sistemi di Intelligenza Artificiale apprendono dai dati.

Hai studiato:

- il ruolo centrale dei dati;
- i paradigmi di apprendimento supervisionato, non supervisionato, semi-supervisionato, self-supervised e reinforcement learning;
- il ciclo di vita di un progetto di Data Science;
- il Feature Engineering;
- il training dei modelli;
- le tecniche di validazione;
- le principali metriche di valutazione;
- il problema dell'overfitting;
- l'MLOps e la gestione dei modelli in produzione.

Queste competenze costituiscono le basi necessarie per affrontare il **Modulo 3**, dedicato alle reti neurali artificiali, al Deep Learning, ai Transformer e ai moderni modelli multimodali.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo3"></a> 🟠 MODULO 3 — Reti Neurali Artificiali, Deep Learning, Transformer e AI Multimodale

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- comprendere il funzionamento di una rete neurale artificiale;
- conoscere il processo di addestramento di un modello Deep Learning;
- distinguere le principali architetture neurali moderne;
- comprendere il funzionamento dei Transformer e del meccanismo di Attention;
- conoscere il principio di funzionamento dei Large Language Models (LLM);
- comprendere la multimodalità e la Generative AI;
- conoscere le principali applicazioni industriali del Deep Learning.

---

# 3.1 Dal Machine Learning al Deep Learning

Il **Deep Learning (DL)** rappresenta un'evoluzione del Machine Learning.

Mentre gli algoritmi tradizionali richiedono spesso un intenso lavoro di **Feature Engineering**, le reti neurali profonde sono in grado di apprendere automaticamente le caratteristiche più significative direttamente dai dati.

```text
Artificial Intelligence
        │
        ▼
Machine Learning
        │
        ▼
Deep Learning
        │
        ▼
Generative AI
```

Il Deep Learning ha rivoluzionato numerosi settori grazie alla disponibilità di:

- Big Data;
- GPU e TPU ad alte prestazioni;
- algoritmi di ottimizzazione evoluti;
- architetture neurali sempre più profonde.

Oggi costituisce la base tecnologica di:

- ChatGPT;
- Gemini;
- Claude;
- Copilot;
- Midjourney;
- Stable Diffusion;
- sistemi di guida autonoma;
- riconoscimento vocale;
- computer vision.

---

# 3.2 Il neurone artificiale

L'unità fondamentale di una rete neurale è il **neurone artificiale**, ispirato in maniera semplificata al funzionamento del neurone biologico.

Ogni neurone:

- riceve uno o più valori in ingresso (input);
- associa un peso (weight) ad ogni ingresso;
- aggiunge un termine di bias;
- applica una funzione di attivazione;
- produce un valore in uscita (output).

Schema semplificato:

```text
Input
 x1 ---- w1 \
 x2 ---- w2  \
 x3 ---- w3   > Somma Pesata + Bias
 xn ---- wn  /
             /
            ▼
   Funzione di Attivazione
            │
            ▼
          Output
```

Formula matematica:

```text
z = Σ(xᵢ · wᵢ) + b

Output = f(z)
```

dove:

- **xᵢ** = input;
- **wᵢ** = peso associato all'input;
- **b** = bias;
- **f()** = funzione di attivazione.

---

# 3.3 Pesi, Bias e Funzioni di Attivazione

Durante l'addestramento il modello modifica continuamente pesi e bias per ridurre l'errore.

Le principali funzioni di attivazione sono:

| Funzione | Caratteristiche | Utilizzo |
|-----------|-----------------|-----------|
| Sigmoid | Valori tra 0 e 1 | Classificazione binaria |
| Tanh | Valori tra -1 e 1 | Reti ricorrenti |
| ReLU | Elimina i valori negativi | Standard nelle reti profonde |
| Leaky ReLU | Riduce il problema dei neuroni "morti" | Deep Learning moderno |
| GELU | Attivazione più morbida della ReLU | Transformer e LLM |
| Softmax | Produce probabilità normalizzate | Classificazione multiclasse |

Oggi **ReLU** e **GELU** rappresentano le funzioni maggiormente utilizzate.

---

# 3.4 Architettura di una Rete Neurale

Una rete neurale è composta da livelli (layer).

```text
Input Layer
      │
      ▼
Hidden Layer 1
      │
      ▼
Hidden Layer 2
      │
      ▼
Hidden Layer 3
      │
      ▼
Output Layer
```

## Input Layer

Riceve i dati.

Esempi:

- pixel di un'immagine;
- parole di un testo;
- valori numerici;
- campioni audio.

---

## Hidden Layer

Elaborano progressivamente informazioni sempre più astratte.

Maggiore è il numero di layer, maggiore è la capacità del modello di apprendere pattern complessi.

Da qui deriva il termine **Deep Learning**.

---

## Output Layer

Produce il risultato finale:

- classe;
- probabilità;
- testo;
- immagine;
- valore numerico.

---

# 3.5 Forward Propagation

La **Forward Propagation** rappresenta il processo di elaborazione dei dati.

Ogni layer riceve l'output del layer precedente.

```text
Input
   │
   ▼
Layer 1
   │
   ▼
Layer 2
   │
   ▼
Layer 3
   │
   ▼
Predizione
```

Alla fine della propagazione il modello produce una previsione.

---

# 3.6 Loss Function

Per sapere quanto la previsione sia corretta viene calcolata una **Loss Function**.

La Loss rappresenta l'errore tra:

- valore previsto;
- valore reale.

Più la Loss è piccola, migliore è il modello.

Le principali funzioni di perdita sono:

| Loss Function | Applicazione |
|--------------|-------------|
| Mean Squared Error (MSE) | Regressione |
| Mean Absolute Error (MAE) | Regressione |
| Binary Cross Entropy | Classificazione binaria |
| Categorical Cross Entropy | Classificazione multiclasse |
| Hinge Loss | Support Vector Machine |
| Focal Loss | Dataset sbilanciati |

---

# 3.7 Backpropagation

La **Backpropagation** rappresenta uno degli algoritmi fondamentali del Deep Learning.

Il suo obiettivo consiste nel propagare l'errore all'indietro attraverso la rete per aggiornare i pesi.

Workflow:

```text
Forward Propagation
          │
          ▼
 Calcolo della Loss
          │
          ▼
Backpropagation
          │
          ▼
Aggiornamento Pesi
```

Questo processo viene ripetuto milioni di volte durante l'addestramento.

---

# 3.8 Gradient Descent e Ottimizzatori

L'aggiornamento dei pesi avviene mediante algoritmi di ottimizzazione.

L'idea consiste nel trovare il minimo della funzione di errore.

Principali ottimizzatori:

- Gradient Descent;
- Stochastic Gradient Descent (SGD);
- Mini Batch Gradient Descent;
- Momentum;
- AdaGrad;
- RMSProp;
- Adam;
- AdamW.

Oggi **AdamW** rappresenta uno degli ottimizzatori più utilizzati nei modelli Transformer.

---

# 3.9 Batch, Epoch e Learning Rate

Durante il training ricorrono alcuni termini fondamentali.

| Termine | Significato |
|----------|-------------|
| Batch | Gruppo di esempi elaborati insieme |
| Mini Batch | Batch di dimensioni ridotte |
| Epoch | Passaggio completo sul dataset |
| Iteration | Elaborazione di un singolo batch |
| Learning Rate | Intensità dell'aggiornamento dei pesi |

Un Learning Rate troppo elevato può impedire la convergenza del modello.

Uno troppo piccolo rende il training molto lento.

---

# 3.10 Convolutional Neural Networks (CNN)

Le **CNN** sono reti neurali progettate per elaborare immagini e video.

Sono basate su:

- convoluzioni;
- filtri;
- pooling;
- mappe delle caratteristiche (Feature Maps).

Pipeline semplificata:

```text
Immagine
    │
    ▼
Convolution
    │
    ▼
Activation
    │
    ▼
Pooling
    │
    ▼
Feature Maps
    │
    ▼
Classificazione
```

Applicazioni:

- riconoscimento facciale;
- diagnostica medica;
- videosorveglianza;
- guida autonoma;
- controllo qualità industriale.

---

# 3.11 Reti Ricorrenti (RNN, LSTM e GRU)

Le reti ricorrenti elaborano dati sequenziali mantenendo memoria degli eventi precedenti.

Applicazioni:

- linguaggio naturale;
- traduzione;
- riconoscimento vocale;
- serie temporali;
- previsione finanziaria.

Le architetture più importanti sono:

- RNN;
- LSTM (Long Short-Term Memory);
- GRU (Gated Recurrent Unit).

Le LSTM hanno risolto il problema del **gradiente evanescente**, permettendo di ricordare informazioni anche a lunga distanza.

Oggi sono state in gran parte sostituite dai Transformer nei modelli linguistici.

---

# 3.12 La rivoluzione dei Transformer

Nel 2017 Google pubblica il paper:

> **Attention Is All You Need**

Nasce così l'architettura **Transformer**, che ha rivoluzionato l'AI moderna.

I principali vantaggi sono:

- elaborazione parallela;
- maggiore velocità;
- migliore comprensione del contesto;
- elevata scalabilità;
- capacità di gestire sequenze molto lunghe.

Oggi praticamente tutti gli LLM utilizzano architetture Transformer.

---

# 3.13 Il meccanismo di Self-Attention

La Self-Attention permette al modello di valutare l'importanza di ogni parola rispetto alle altre presenti nella frase.

Esempio:

```text
"Il gatto mangia il pesce perché è affamato."
```

Il modello comprende che:

- "è affamato" si riferisce al gatto;
- non al pesce.

La Self-Attention costituisce il cuore dei moderni modelli linguistici.

---

# 3.14 Positional Encoding

Poiché il Transformer elabora tutte le parole in parallelo, è necessario indicarne la posizione.

Questo viene fatto tramite il **Positional Encoding**, che aggiunge informazioni sulla sequenza.

In questo modo il modello distingue:

```text
Marco ama Luca
```

da

```text
Luca ama Marco
```

pur contenendo le stesse parole.

---

# 3.15 Large Language Models (LLM)

Gli LLM sono enormi reti neurali basate sui Transformer.

Sono addestrati su:

- libri;
- articoli;
- codice sorgente;
- documentazione tecnica;
- pagine Web;
- contenuti multimediali.

Durante il training apprendono relazioni statistiche tra token.

Non memorizzano semplicemente il testo, ma costruiscono rappresentazioni numeriche del linguaggio.

Le loro capacità comprendono:

- conversazione;
- sintesi;
- traduzione;
- generazione di codice;
- ragionamento;
- analisi documentale;
- pianificazione;
- utilizzo di strumenti esterni.

---

# 3.16 Embedding e Spazio Latente

Prima di essere elaborati, i dati vengono convertiti in vettori numerici chiamati **Embedding**.

Gli embedding rappresentano il significato semantico delle informazioni.

Parole con significato simile avranno vettori vicini nello spazio multidimensionale.

Questo concetto è fondamentale anche nei sistemi:

- RAG (Retrieval-Augmented Generation);
- ricerca semantica;
- recommendation system;
- database vettoriali.

---

# 3.17 AI Multimodale

La nuova generazione di modelli è **multimodale**.

Ciò significa che può comprendere simultaneamente:

- testo;
- immagini;
- audio;
- video;
- documenti PDF;
- tabelle;
- codice.

Schema:

```text
Testo
Immagini
Audio
Video
PDF
Codice
     │
     ▼
Multimodal Transformer
     │
     ▼
Risposta Integrata
```

Questa capacità rende possibile un'interazione molto più naturale con i sistemi AI.

---

# 3.18 Generative AI

La Generative AI è una branca del Deep Learning dedicata alla creazione di nuovi contenuti.

Può generare:

- testi;
- immagini;
- musica;
- video;
- codice;
- modelli 3D;
- simulazioni.

Le principali famiglie di modelli sono:

| Modello | Applicazione |
|----------|-------------|
| LLM | Testo e codice |
| Diffusion Models | Immagini e video |
| GAN | Generazione di dati sintetici |
| Variational Autoencoder (VAE) | Compressione e generazione |
| Autoregressive Models | Testo e audio |

---

# 3.19 Tecniche di addestramento degli LLM

Lo sviluppo di un moderno LLM avviene generalmente in più fasi.

1. **Pre-training**
   - apprendimento auto-supervisionato su enormi quantità di dati.

2. **Fine-Tuning**
   - specializzazione del modello per domini specifici.

3. **Instruction Tuning**
   - addestramento per seguire istruzioni in linguaggio naturale.

4. **RLHF (Reinforcement Learning from Human Feedback)**
   - utilizzo del feedback umano per migliorare qualità, sicurezza e allineamento.

5. **Reasoning e Tool Use**
   - integrazione con strumenti esterni, API, browser, database e agenti AI.

---

# 3.20 Hardware per il Deep Learning

L'addestramento di modelli di grandi dimensioni richiede hardware altamente specializzato.

Le principali piattaforme sono:

- GPU NVIDIA;
- TPU Google;
- acceleratori AI dedicati;
- cluster HPC;
- cloud computing distribuito.

Tecnologie software fondamentali:

- CUDA;
- cuDNN;
- TensorRT;
- PyTorch;
- TensorFlow;
- JAX.

---

# 3.21 Principali Framework di Deep Learning

| Framework | Caratteristiche |
|-----------|----------------|
| PyTorch | Standard per ricerca e sviluppo |
| TensorFlow | Produzione e deployment |
| Keras | API ad alto livello |
| JAX | Calcolo differenziabile ad alte prestazioni |
| ONNX | Interoperabilità tra framework |

---

# 3.22 Applicazioni del Deep Learning

Le reti neurali profonde sono ormai utilizzate in quasi tutti i settori.

## Sanità

- diagnosi assistita;
- analisi di immagini radiologiche;
- scoperta di nuovi farmaci;
- medicina personalizzata.

## Industria

- manutenzione predittiva;
- controllo qualità;
- robotica collaborativa.

## Finanza

- rilevazione frodi;
- credit scoring;
- previsione dei mercati;
- gestione del rischio.

## Automotive

- ADAS;
- guida autonoma;
- riconoscimento di ostacoli.

## Cybersecurity

- analisi comportamentale;
- rilevazione malware;
- intrusion detection.

## Creatività Digitale

- generazione immagini;
- video AI;
- musica;
- doppiaggio;
- animazione;
- game development.

---

# 3.23 Limiti del Deep Learning

Nonostante gli straordinari risultati ottenuti, il Deep Learning presenta ancora numerose criticità.

Tra le principali:

- elevati costi computazionali;
- forte dipendenza dalla qualità dei dati;
- elevato consumo energetico;
- limitata interpretabilità (Black Box);
- rischio di overfitting;
- bias nei dataset;
- allucinazioni nei modelli generativi;
- problematiche di privacy e copyright.

Comprendere questi limiti è fondamentale per progettare sistemi affidabili e responsabili.

---

# 3.24 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| Neurone artificiale | Unità fondamentale di una rete neurale |
| Peso (Weight) | Parametro appreso durante il training |
| Bias | Termine costante del neurone |
| Forward Propagation | Propagazione in avanti |
| Backpropagation | Aggiornamento dei pesi tramite errore |
| Loss Function | Misura dell'errore |
| Epoch | Passaggio completo sul dataset |
| Batch | Gruppo di esempi elaborati insieme |
| CNN | Convolutional Neural Network |
| RNN | Recurrent Neural Network |
| LSTM | Long Short-Term Memory |
| Transformer | Architettura basata sulla Self-Attention |
| Self-Attention | Meccanismo che valuta le relazioni tra token |
| Embedding | Rappresentazione vettoriale del significato |
| LLM | Large Language Model |
| Multimodalità | Capacità di elaborare più tipi di dati |
| RLHF | Reinforcement Learning from Human Feedback |
| Fine-Tuning | Specializzazione di un modello pre-addestrato |

---

# Riepilogo del modulo

In questo modulo hai acquisito una conoscenza approfondita delle tecnologie che costituiscono il cuore dell'Intelligenza Artificiale moderna.

Hai studiato:

- il funzionamento del neurone artificiale;
- la struttura delle reti neurali profonde;
- il processo di addestramento tramite Backpropagation;
- le principali architetture (CNN, RNN, LSTM, GRU e Transformer);
- il meccanismo di Self-Attention;
- il funzionamento dei Large Language Models;
- gli Embedding e lo spazio latente;
- la multimodalità;
- la Generative AI;
- il ciclo di addestramento degli LLM;
- l'hardware e i framework utilizzati nel Deep Learning;
- le principali applicazioni industriali e i limiti delle reti neurali.

Queste competenze costituiscono la base teorica indispensabile per affrontare il **Modulo 4**, dedicato al **Prompt Engineering Strategico**, alla progettazione di istruzioni efficaci e alle tecniche avanzate di interazione con i moderni modelli di Intelligenza Artificiale.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo4"></a> 🔵 MODULO 4 — Strategic Prompt Engineering

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- comprendere come un Large Language Model interpreta un prompt;
- progettare prompt chiari, completi ed efficaci;
- distinguere le principali tecniche di Prompt Engineering;
- utilizzare correttamente ruolo, contesto, task e vincoli;
- ridurre errori, ambiguità e allucinazioni;
- progettare prompt professionali per studio, sviluppo software e analisi dei dati;
- comprendere il Prompt Engineering come nuova forma di programmazione in linguaggio naturale.

---

# 4.1 Cos'è il Prompt Engineering?

Il **Prompt Engineering** è la disciplina che studia come progettare istruzioni efficaci per ottenere risultati accurati, coerenti e riproducibili dai modelli di Intelligenza Artificiale.

Un **prompt** rappresenta l'insieme delle informazioni fornite al modello affinché possa comprendere:

- il problema da risolvere;
- il contesto;
- il comportamento atteso;
- il formato della risposta.

Più il prompt è preciso, maggiore sarà la qualità dell'output.

Oggi il Prompt Engineering è considerato una competenza trasversale utilizzata in numerosi ambiti:

- sviluppo software;
- data analysis;
- marketing;
- ricerca;
- progettazione;
- formazione;
- automazione dei processi;
- AI Agent.

---

# 4.2 Come "ragiona" un Large Language Model

Un LLM non possiede conoscenza nel senso umano del termine.

Durante l'inferenza il modello:

- interpreta il prompt;
- analizza il contesto disponibile;
- calcola le probabilità statistiche dei token successivi;
- genera progressivamente la risposta.

Schema semplificato:

```text
Prompt
   │
   ▼
Tokenizzazione
   │
   ▼
Embedding
   │
   ▼
Transformer
(Self-Attention)
   │
   ▼
Predizione del token successivo
   │
   ▼
Risposta finale
```

Il modello non recupera una risposta da un database.

Costruisce la risposta **token dopo token**, utilizzando le conoscenze apprese durante il training e il contesto fornito dall'utente.

Per questo motivo la qualità del prompt influenza direttamente la qualità della risposta.

---

# 4.3 Token, Context Window e Memoria Contestuale

Prima di essere elaborato, il prompt viene suddiviso in **token**.

Un token può rappresentare:

- una parola;
- una parte di parola;
- un numero;
- un simbolo;
- un carattere speciale.

Esempio:

```text
"Artificial Intelligence"

↓

Artificial
Intelligence
```

oppure

```text
programmazione

↓

program
mazione
```

I modelli elaborano migliaia di token contemporaneamente.

L'insieme massimo dei token gestibili prende il nome di **Context Window**.

Essa comprende:

- prompt dell'utente;
- conversazione precedente;
- documenti caricati;
- risposta che il modello sta generando.

Quando il limite viene superato, le informazioni meno recenti possono essere eliminate dal contesto.

È importante distinguere:

| Tipo di memoria | Descrizione |
|----------------|-------------|
| Memoria contestuale | Disponibile solo durante la conversazione corrente |
| Memoria permanente | Informazioni eventualmente salvate per conversazioni future |
| Conoscenza del modello | Appresa durante il training |

---

# 4.4 Anatomia di un Prompt Professionale

Un prompt efficace è composto da diversi elementi.

```text
Ruolo
   │
Contesto
   │
Compito
   │
Vincoli
   │
Formato di Output
```

Ogni componente contribuisce a ridurre l'ambiguità e ad aumentare la qualità della risposta.

---

## Ruolo (Role)

Definisce il comportamento che il modello deve assumere.

Esempi:

- insegnante;
- sviluppatore senior;
- consulente finanziario;
- medico;
- project manager.

Esempio:

```text
Agisci come un Data Scientist esperto di Machine Learning.
```

---

## Contesto

Fornisce tutte le informazioni necessarie per comprendere il problema.

Esempio:

```text
Il documento è destinato a studenti universitari di Informatica.
```

Più il contesto è completo, minore sarà il rischio di interpretazioni errate.

---

## Task

Specifica l'attività da svolgere.

Ad esempio:

- spiegare;
- confrontare;
- riassumere;
- tradurre;
- generare codice;
- analizzare dati;
- progettare un database.

È preferibile utilizzare verbi chiari e specifici.

---

## Vincoli

Limitano il comportamento del modello.

Possono riguardare:

- lunghezza;
- linguaggio;
- stile;
- tecnologie;
- formato;
- pubblico di riferimento.

Esempio:

```text
Non utilizzare librerie esterne.

Scrivi codice compatibile con Python 3.12.

Mantieni un linguaggio tecnico ma semplice.
```

---

## Formato di Output

Specifica come deve essere organizzata la risposta.

Ad esempio:

- elenco puntato;
- tabella;
- Markdown;
- JSON;
- XML;
- codice;
- report.

Un formato ben definito rende l'output più facilmente riutilizzabile.

---

# 4.5 Le principali tecniche di Prompting

Nel tempo sono state sviluppate numerose strategie per migliorare le prestazioni dei modelli.

Le più utilizzate sono:

- Zero-Shot Prompting;
- One-Shot Prompting;
- Few-Shot Prompting;
- Chain of Thought;
- Prompt Chaining;
- Structured Prompting.

La scelta dipende dal problema da risolvere.

---

# 4.6 Zero-Shot, One-Shot e Few-Shot Prompting

## Zero-Shot Prompting

Il modello riceve soltanto l'istruzione.

```text
Spiega il funzionamento del protocollo HTTP.
```

È la tecnica più semplice.

Funziona bene per attività comuni.

---

## One-Shot Prompting

Viene fornito un singolo esempio.

```text
Domanda:
Che cos'è SQL?

Risposta:
...

Ora rispondi alla seguente domanda...
```

L'esempio aiuta il modello a comprendere lo stile desiderato.

---

## Few-Shot Prompting

Si forniscono più esempi.

```text
Input → Output

Input → Output

Input → Output

Nuovo Input → ?
```

È particolarmente utile quando:

- si desidera uno stile preciso;
- occorre seguire regole specifiche;
- bisogna classificare informazioni;
- si vogliono ottenere risposte uniformi.

---

# 4.7 Chain of Thought

La tecnica **Chain of Thought (CoT)** invita il modello a sviluppare il ragionamento in più passaggi prima di produrre la risposta finale.

Schema:

```text
Problema
    │
    ▼
Analisi
    │
    ▼
Scomposizione
    │
    ▼
Ragionamento
    │
    ▼
Conclusione
```

Questa tecnica migliora soprattutto:

- problemi matematici;
- algoritmi;
- debugging;
- pianificazione;
- analisi complesse;
- decision making.

È consigliabile utilizzarla quando il problema richiede più fasi logiche.

---

# 4.8 Prompt Chaining

Un singolo prompt non è sempre sufficiente.

Nei workflow professionali è spesso preferibile suddividere il problema in più richieste consecutive.

Schema:

```text
Prompt 1
   │
   ▼
Risposta
   │
   ▼
Prompt 2
   │
   ▼
Risposta
   │
   ▼
Prompt 3
   │
   ▼
Output Finale
```

Questo approccio prende il nome di **Prompt Chaining**.

Vantaggi:

- maggiore controllo del processo;
- riduzione degli errori;
- migliore qualità dell'output;
- possibilità di verificare ogni fase del lavoro.

Il Prompt Chaining è alla base di molti sistemi AI Agent e dei workflow automatizzati, nei quali ogni risposta diventa l'input della fase successiva.

[⬆ Torna all'indice](#indice)

---

# 4.9 Structured Prompting

Uno dei principi fondamentali del Prompt Engineering consiste nel richiedere risposte ben strutturate.

Un prompt che definisce il formato dell'output produce generalmente risultati:

- più leggibili;
- più coerenti;
- facilmente riutilizzabili;
- integrabili in workflow automatici.

I formati più utilizzati sono:

| Formato | Utilizzo |
|----------|-----------|
| Markdown | Documentazione e report |
| JSON | API e applicazioni software |
| XML | Scambio dati |
| Tabelle | Analisi comparative |
| CSV | Dataset e fogli di calcolo |
| Codice | Programmazione |

Esempio:

```text
Restituisci la risposta come tabella Markdown con
le colonne:

Tecnologia
Vantaggi
Svantaggi
Applicazioni
```

Specificare il formato riduce le ambiguità e rende l'output immediatamente utilizzabile.

---

# 4.10 Prompt Engineering per il Coding

I moderni LLM sono strumenti estremamente efficaci nello sviluppo software.

Possono supportare:

- scrittura di codice;
- debugging;
- refactoring;
- documentazione;
- generazione di test;
- conversione tra linguaggi;
- spiegazione di algoritmi.

Un buon prompt dovrebbe specificare:

- linguaggio di programmazione;
- versione;
- framework;
- architettura;
- vincoli tecnici;
- formato dell'output.

Esempio:

```text
Agisci come uno sviluppatore Senior Next.js.

Utilizza TypeScript.

Genera codice compatibile con App Router.

Commenta soltanto le parti più complesse.

Evita librerie esterne.
```

Più informazioni vengono fornite, maggiore sarà la qualità del codice generato.

---

# 4.11 Prompt per Data Analysis

L'AI rappresenta un valido supporto anche nell'analisi dei dati.

Può:

- interpretare dataset;
- individuare anomalie;
- costruire dashboard;
- generare grafici;
- eseguire statistiche descrittive;
- suggerire visualizzazioni.

Workflow tipico:

```text
Dataset
    │
    ▼
Pulizia dati
    │
    ▼
Analisi
    │
    ▼
Visualizzazione
    │
    ▼
Interpretazione
```

È consigliabile specificare sempre:

- formato dei dati;
- obiettivo dell'analisi;
- indicatori richiesti;
- livello di dettaglio.

---

# 4.12 Prompt per Documenti, Ricerca e Studio

Gli LLM sono particolarmente efficaci nella gestione della documentazione.

Possono:

- riassumere testi;
- confrontare documenti;
- estrarre informazioni;
- creare schemi;
- generare quiz;
- spiegare concetti complessi.

Esempio:

```text
Analizza il documento.

Riassumi i concetti principali.

Evidenzia definizioni, formule e parole chiave.

Genera infine 10 domande di ripasso.
```

Un prompt ben strutturato consente di trasformare rapidamente grandi quantità di informazioni in materiale didattico.

---

# 4.13 Prompt per AI Multimodale e AI Agent

I moderni modelli AI non elaborano soltanto testo.

Possono comprendere:

- immagini;
- PDF;
- audio;
- video;
- codice;
- fogli elettronici.

Schema:

```text
Testo
Immagini
Audio
PDF
Codice
     │
     ▼
Prompt
     │
     ▼
LLM Multimodale
     │
     ▼
Risposta
```

Nei sistemi più avanzati il modello può inoltre utilizzare strumenti esterni.

Ad esempio:

- browser Web;
- database;
- API;
- motori di ricerca;
- interpreti Python;
- file system.

Questa capacità costituisce la base degli **AI Agent**, sistemi in grado di pianificare ed eseguire autonomamente sequenze di operazioni.

---

# 4.14 Errori comuni e Hallucinations

Non tutti gli errori dipendono dal modello.

Molto spesso sono causati da prompt poco chiari.

Gli errori più frequenti sono:

| Errore | Descrizione |
|----------|-------------|
| Prompt troppo generico | Produce risposte vaghe |
| Contesto insufficiente | Il modello deve fare ipotesi |
| Richieste multiple | L'output può risultare incompleto |
| Vincoli mancanti | Risposte non coerenti |
| Formato non specificato | Output difficile da riutilizzare |

Occorre inoltre considerare il fenomeno delle **Hallucinations**.

Una hallucination è una risposta apparentemente corretta ma contenente informazioni inesatte o inventate.

Per ridurne il rischio è opportuno:

- fornire contesto completo;
- richiedere fonti quando necessario;
- verificare i risultati;
- suddividere problemi complessi in più prompt.

Un'altra minaccia è la **Prompt Injection**, tecnica con cui istruzioni malevole cercano di modificare il comportamento previsto del modello.

---

# 4.15 Best Practices 2026

Le principali raccomandazioni per progettare prompt efficaci sono:

1. Definire chiaramente il ruolo.
2. Fornire sempre il contesto.
3. Descrivere il compito in modo preciso.
4. Specificare i vincoli.
5. Indicare il formato dell'output.
6. Suddividere problemi complessi.
7. Utilizzare esempi quando opportuno.
8. Verificare criticamente le risposte.
9. Iterare migliorando progressivamente il prompt.
10. Considerare il Prompt Engineering come un processo incrementale.

Schema riassuntivo:

```text
Ruolo
   │
Contesto
   │
Task
   │
Vincoli
   │
Formato
   │
Verifica
   │
Miglioramento
```

Un prompt efficace raramente nasce perfetto al primo tentativo: nella pratica professionale viene raffinato attraverso successive iterazioni.

---

# 4.16 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| Prompt | Insieme delle istruzioni fornite al modello |
| Prompt Engineering | Progettazione di prompt efficaci |
| Role | Comportamento richiesto al modello |
| Context | Informazioni necessarie alla comprensione del problema |
| Task | Attività richiesta |
| Constraint | Vincolo imposto al modello |
| Zero-Shot | Nessun esempio fornito |
| One-Shot | Un solo esempio |
| Few-Shot | Più esempi |
| Chain of Thought | Ragionamento guidato in più passaggi |
| Prompt Chaining | Sequenza di prompt collegati |
| Structured Prompt | Prompt con formato di output definito |
| Hallucination | Risposta plausibile ma non corretta |
| Prompt Injection | Tentativo di alterare il comportamento del modello |
| AI Agent | Sistema AI capace di utilizzare strumenti esterni |

---

# Riepilogo del modulo

In questo modulo hai approfondito il **Prompt Engineering**, la disciplina che consente di comunicare in modo efficace con i moderni modelli di Intelligenza Artificiale.

Hai studiato:

- il funzionamento di un prompt;
- come un LLM interpreta le istruzioni;
- tokenizzazione e context window;
- la struttura di un prompt professionale;
- le principali tecniche di prompting;
- il Prompt Chaining;
- gli output strutturati;
- l'utilizzo dell'AI nel coding e nella data analysis;
- la multimodalità e gli AI Agent;
- gli errori più comuni e le hallucinations;
- le best practice per ottenere risultati affidabili.

Le competenze acquisite costituiscono la base operativa per utilizzare l'Intelligenza Artificiale in modo professionale, progettando prompt chiari, riproducibili e ottimizzati per differenti contesti applicativi.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo5"></a> 🟣 MODULO 5 — Frontiere Tecnologiche: Quantum AI e Neuromorphic Computing

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- comprendere i limiti fisici ed energetici della computazione classica applicata all'Intelligenza Artificiale;
- definire i principi fondamentali dell'informatica quantistica, quali Qubit, Sovrapposizione ed Entanglement[cite: 1];
- esplorare le potenzialità e le applicazioni del Quantum Machine Learning (QML);
- distinguere l'architettura tradizionale di Von Neumann dall'approccio hardware neuromorfico[cite: 1];
- comprendere il paradigma di elaborazione event-driven e le Spiking Neural Networks (SNN)[cite: 1];
- valutare l'impatto di queste architetture per l'Edge AI e per la sostenibilità computazionale[cite: 1].

---

# 5.1 Oltre i limiti della computazione classica

I modelli di Deep Learning moderni richiedono enormi quantità di memoria ed energia. 
L'addestramento e l'inferenza degli LLM su larga scala si scontrano oggi con due limiti fondamentali:

1.  **Limiti fisici del silicio:** la Legge di Moore sta rallentando, rendendo sempre più difficile e costoso miniaturizzare ulteriormente i transistor.
2.  **Collo di bottiglia di Von Neumann:** nelle architetture classiche, il trasferimento continuo di dati tra la memoria (RAM) e l'unità di elaborazione (CPU/GPU) consuma gran parte del tempo e dell'energia del sistema[cite: 1].

Per superare queste barriere, la ricerca ingegneristica si sta concentrando su due paradigmi radicalmente diversi: l'**AI Quantistica** e il **Neuromorphic Computing**.

---

# 5.2 AI Quantistica: Il salto esponenziale

L'AI Quantistica (o Quantum AI) sfrutta i principi della meccanica quantistica per superare i limiti intrinseci della computazione binaria classica[cite: 1].

## Dal Bit al Qubit

Nella computazione classica, l'unità fondamentale è il **Bit**, che può trovarsi in un solo stato alla volta (0 oppure 1).
Nell'informatica quantistica, l'unità di base è il **Qubit** (Quantum Bit). 
Grazie al principio di **sovrapposizione**, un qubit può esistere in una combinazione lineare di 0 e 1 simultaneamente, permettendo al sistema di eseguire calcoli paralleli massivi[cite: 1].

```text
Stato Classico (Bit)        Stato Quantistico (Qubit)
       
      [ 0 ]                       [ 0 ]
        O                           |
      [ 1 ]                       [ 1 ]
  (Solo uno stato)        (Sovrapposizione di stati)

```

## Entanglement e Interferenza

Oltre alla sovrapposizione, i computer quantistici sfruttano altre due proprietà fondamentali:

* **Entanglement:** permette di correlare in modo indissolubile qubit distanti; l'alterazione di uno stato si riflette istantaneamente sull'altro, accelerando esponenzialmente il trasferimento e l'elaborazione dell'informazione.


* **Interferenza:** algoritmicamente utilizzata per amplificare le probabilità delle soluzioni corrette e annullare (interferenza distruttiva) i percorsi di calcolo errati.



---

# 5.3 Quantum Machine Learning (QML)

Il **Quantum Machine Learning** è l'intersezione tra algoritmi di ML classici e calcolo quantistico.
Non sostituisce le reti neurali classiche, ma utilizza le QPU (Quantum Processing Unit) come acceleratori per compiti matematicamente complessi.

Applicazioni del QML includono:

* **Quantum Support Vector Machines (QSVM):** elaborazione di dataset ad altissima dimensionalità.
* **Quantum Neural Networks (QNN):** reti neurali i cui pesi sono rappresentati da circuiti quantistici parametrizzati.
* **Ottimizzazione combinatoria:** risoluzione rapida di problemi NP-completi.

### Lo stato dell'arte (2026)

Siamo entrati nell'era della cosiddetta **Utilità Quantistica**.
I processori quantistici attuali superano la soglia dei 1000 qubit e, pur lavorando spesso in sistemi ibridi (accoppiati a supercomputer classici), dimostrano vantaggi computazionali reali in ambiti critici come:

* la simulazione molecolare per la scoperta di nuovi farmaci;


* l'ottimizzazione di portafogli finanziari complessi;


* lo sviluppo di nuovi materiali per le batterie e l'energia pulita.

---

# 5.4 Neuromorphic Computing: Hardware "Brain-Like"

Il Neuromorphic Computing rappresenta un paradigma ingegneristico che mira a replicare fedelmente a livello hardware l'efficienza energetica e la struttura fisica del cervello umano.

Il cervello umano elabora informazioni con una straordinaria capacità di generalizzazione consumando circa **20 Watt**, un abisso rispetto ai Megawatt richiesti dagli attuali data center dedicati all'AI.

## Superare l'architettura di Von Neumann

I chip neuromorfici abbandonano la tradizionale separazione tra memoria e calcolo.
In questi sistemi l'elaborazione avviene attraverso un'**architettura distribuita**: elaborazione (logica) e memorizzazione (pesi sinaptici) sono integrate all'interno dello stesso "neurone artificiale" hardware.

Spesso questo si ottiene tramite componenti fisici chiamati **Memristori** (resistenze con memoria), che variano la loro resistenza elettrica in base ai segnali passati, imitando esattamente la plasticità sinaptica biologica.

```text
Architettura Von Neumann         Architettura Neuromorfica

  [ CPU/GPU ] <---> [ RAM ]       [ Neurone (Calcolo + Memoria) ]
(Spostamento dati dispendioso)      (Nessuno spostamento dati)

```

---

# 5.5 Spiking Neural Networks (SNN)

Dal punto di vista del software, l'hardware neuromorfico esegue una tipologia speciale di reti neurali: le **Spiking Neural Networks (SNN)**.

A differenza delle tradizionali reti neurali (ANN), in cui i neuroni scambiano continuamente valori numerici continui, le SNN utilizzano una **comunicazione Event-Driven**.
Il circuito non consuma energia costantemente. Un neurone neuromorfico si attiva, accumula carica elettrica e invia un segnale (uno "spike") solo quando la carica supera una certa soglia di attivazione.

Il calore e il consumo energetico vengono così ridotti drasticamente, poiché le uniche parti del processore attive sono quelle che stanno attivamente elaborando uno spike in un determinato istante.

---

# 5.6 Edge AI e Applicazioni Pratiche

L'estrema efficienza energetica delle architetture neuromorfiche ha aperto la strada a una diffusione capillare dell'**Edge AI** avanzata.

Le applicazioni di punta nel 2026 includono:

* **Sensori IoT intelligenti:** dispositivi in grado di monitorare ed elaborare dati in loco per anni con una singola batteria.
* **Robotica autonoma e droni:** sistemi di navigazione reattivi in tempo reale a bassissima latenza.
* **Dispositivi mobili e wearable:** capacità di apprendimento continuo *on-device*, che permette al sistema di adattarsi all'utente senza dover mai inviare dati personali ai server cloud, garantendo massima privacy.


* **Protesi mediche intelligenti:** decodifica dei segnali neurali in tempo reale con consumi irrisori.

---

# 5.7 Sfide e limiti tecnologici

Nonostante le enormi potenzialità, entrambe le tecnologie affrontano sfide significative.

| Tecnologia | Limiti attuali |
| --- | --- |
| **Quantum AI** | Elevata **decoerenza quantistica** (sensibilità ai disturbi termici/elettromagnetici), necessità di raffreddamento criogenico, estrema complessità nella correzione degli errori (QEC - Quantum Error Correction). |
| **Neuromorphic** | Mancanza di algoritmi di backpropagation nativi efficienti per le SNN, assenza di framework software standardizzati e di alto livello, costi di fabbricazione elevati per chip non convenzionali. |

---

# 5.8 Glossario del modulo

| Termine | Significato |
| --- | --- |
| **Qubit** | L'unità fondamentale dell'informazione quantistica. |
| **Sovrapposizione** | Capacità del qubit di esistere in stati multipli simultaneamente. |
| **Entanglement** | Correlazione quantistica che lega gli stati di due o più particelle. |
| **QML** | Quantum Machine Learning, l'uso di acceleratori quantistici per modelli di ML. |
| **Utilità Quantistica** | La fase in cui i computer quantistici iniziano a risolvere problemi economicamente rilevanti meglio delle controparti classiche. |
| **Neuromorphic Computing** | Progettazione hardware ispirata al sistema nervoso biologico. |
| **Von Neumann Bottleneck** | Limite prestazionale causato dalla separazione tra CPU e Memoria. |
| **SNN** | Spiking Neural Networks, reti neurali asincrone basate su eventi (spike). |
| **Memristore** | Componente hardware che memorizza le informazioni come resistenza elettrica. |
| **Edge AI** | Elaborazione dei modelli di Intelligenza Artificiale direttamente sui dispositivi locali. |

---

# Riepilogo del modulo

In questo modulo hai esplorato le due principali frontiere tecnologiche destinate a ridefinire il futuro dell'Intelligenza Artificiale:

* le limitazioni termiche ed energetiche della computazione classica;
* le basi dell'informatica quantistica (Qubit, Entanglement, Interferenza);
* i vantaggi del Quantum Machine Learning per problemi ad altissima complessità;
* il paradigma Neuromorfico, in grado di superare il collo di bottiglia di Von Neumann;
* il funzionamento event-driven delle Spiking Neural Networks (SNN);
* l'applicazione del computing neuromorfico per scalare l'Edge AI garantendo efficienza estrema.

Queste innovazioni hardware rappresentano la base su cui poggeranno i modelli del futuro, introducendo nuove dinamiche e nuovi rischi. Questo ci porta direttamente al **Modulo 6**, dedicato all'Etica, alla Governance e al quadro normativo dell'AI Act europeo.

[Torna all'indice](#indice)

---

## <a id="modulo6"></a> 🟠 MODULO 6 — Etica, Governance e Regolamentazione (EU AI Act 2.0)

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- comprendere i concetti di equità algoritmica (Fairness) e le dinamiche dei Bias nei modelli AI;
- conoscere le principali vulnerabilità legate alla privacy e le tecniche di mitigazione moderne;
- comprendere la classificazione dei rischi introdotta dall'EU AI Act 2.0, pienamente operativo nel 2026[cite: 1];
- valutare le implicazioni sul diritto d'autore e sulla proprietà intellettuale legate all'AI generativa;
- riconoscere i rischi di sicurezza, tra cui Deepfake, disinformazione e attacchi ai modelli (es. Prompt Injection);
- definire le catene di responsabilità legale nell'utilizzo di sistemi AI complessi.

---

# 6.1 Algorithmic Bias e Mitigazione

Una delle concezioni errate più comuni è considerare l'Intelligenza Artificiale come un'entità puramente oggettiva e imparziale. In realtà, l'AI non è neutrale; essa riflette inevitabilmente i pregiudizi (storici, sociali o cognitivi) presenti nei dati di addestramento o derivanti dalle scelte dei programmatori[cite: 1].

## Tipologie di Bias

- **Bias di Rappresentazione:** si verifica quando il dataset di addestramento non rappresenta fedelmente la popolazione reale. Se i dati sono sbilanciati, ad esempio nel caso di un sistema di riconoscimento facciale addestrato quasi esclusivamente su profili caucasici, l'accuratezza del modello calerà drasticamente quando applicato a minoranze etniche[cite: 1].
- **Bias Storico:** i modelli linguistici appresi da testi storici possono replicare o amplificare stereotipi di genere, razza o classe sociale.
- **Bias di Conferma Algoritmico:** i sistemi di raccomandazione (social media, piattaforme video) tendono a mostrare agli utenti solo contenuti in linea con le loro convinzioni, polarizzando le opinioni pubbliche.

## Strategie di Difesa e Fairness

Per sviluppare sistemi equi, l'industria adotta oggi diverse metodologie:
-   esecuzione di audit algoritmici regolari[cite: 1];
-   diversificazione dei team di sviluppo per includere prospettive multiple[cite: 1];
-   applicazione di tecniche matematiche di **de-biasing** durante la fase di training[cite: 1], per penalizzare statisticamente le correlazioni discriminatorie.

---

# 6.2 Privacy, Profilazione e Sorveglianza Algoritmica

L'enorme capacità analitica dell'AI moderna solleva questioni critiche sulla tutela dei dati personali. I modelli attuali possono inferire informazioni sensibili (come lo stato di salute o l'orientamento politico) analizzando semplici pattern comportamentali, anche se l'utente non ha mai fornito esplicitamente tali dati[cite: 1].

Nel 2026, la difesa della privacy non è più solo una questione legale, ma si basa sul principio della **Privacy by Design**, ovvero l'integrazione della tutela dei dati direttamente nell'architettura del software[cite: 1].

Le principali tecnologie a supporto includono:

-   **Federated Learning:** permette di addestrare i modelli di machine learning distribuendo il calcolo sui dispositivi locali (es. smartphone), senza la necessità di centralizzare o trasferire i dati degli utenti sui server cloud[cite: 1].
-   **Differential Privacy:** aggiunge "rumore" matematico ai dataset in modo che sia impossibile risalire all'identità del singolo individuo, pur mantenendo valida l'analisi statistica generale.

---

# 6.3 Governance e Regolamentazione: EU AI Act 2.0

L'Unione Europea ha tracciato lo standard globale per la regolamentazione dell'Intelligenza Artificiale. Nel 2026, il quadro normativo dell'EU AI Act 2.0 è pienamente operativo[cite: 1]. 

L'approccio della normativa europea è strettamente "basato sul rischio" e classifica i sistemi AI in diverse categorie[cite: 1]:

## 1. Rischio Inaccettabile (Sistemi Vietati)
Sono categoricamente proibite le tecnologie che minacciano i diritti fondamentali dell'individuo.
Tra queste rientrano[cite: 1]:
- i sistemi di social scoring (attribuzione di punteggi sociali ai cittadini da parte dei governi)[cite: 1];
- le tecniche di manipolazione cognitiva e comportamentale subliminale[cite: 1];
- i sistemi di identificazione biometrica remota in tempo reale in spazi pubblici (salvo eccezioni estreme per le forze dell'ordine).

## 2. Sistemi ad Alto Rischio
Applicazioni utilizzate in settori critici come la medicina, il sistema giudiziario, l'istruzione, il reclutamento del personale o la gestione di infrastrutture critiche[cite: 1].
Questi sistemi sono soggetti a requisiti estremamente rigidi:
- documentazione dettagliata dei log e dei dataset;
- supervisione umana obbligatoria (Human-in-the-loop);
- alti standard di **trasparenza e spiegabilità (XAI - Explainable AI)**, affinché le decisioni algoritmiche possano essere comprese e contestate dagli utenti[cite: 1].

## 3. General Purpose AI (GPAI) e Modelli di Fondazione
In questa categoria rientrano gli LLM e i grandi modelli generativi in grado di svolgere una vasta gamma di compiti[cite: 1]. 
I fornitori di GPAI devono:
- rispettare stringenti obblighi in materia di diritto d'autore e copyright[cite: 1];
- fornire documentazione tecnica trasparente su come il modello è stato addestrato e sulle valutazioni di sicurezza effettuate[cite: 1].

---

# 6.4 Responsabilità Legale e "Black Box"

Uno dei problemi più complessi dell'etica AI riguarda la cosiddetta "Black Box" algoritmica: spesso, a causa dell'opacità delle reti neurali profonde, nemmeno i progettisti sanno esattamente *come* il modello sia giunto a una determinata conclusione.

La giurisprudenza attuale nel 2026 si muove verso la definizione di catene di responsabilità chiare, stabilendo chi debba rispondere legalmente ed economicamente in caso di danni causati dalle decisioni di un'AI[cite: 1]. La responsabilità può ricadere sullo sviluppatore originario, sull'azienda che ha implementato (fine-tuning) il sistema o sull'utente finale, a seconda del livello di controllo esercitato sul modello.

---

# 6.5 Proprietà Intellettuale e Copyright nell'Era Generativa

La capacità dell'AI di generare testo, immagini, codice e musica ha generato forti conflitti legati al diritto d'autore. 

I nodi principali riguardano:
- **L'addestramento sui dati protetti (Scraping):** l'utilizzo massivo di opere artistiche e giornalistiche coperte da copyright per addestrare i modelli di fondazione senza il consenso esplicito o una remunerazione per i creatori.
- **La titolarità degli output:** l'impossibilità legale (nella maggior parte delle giurisdizioni) di brevettare o registrare il copyright di un'opera generata esclusivamente da una macchina senza un sostanziale contributo creativo umano.

I nuovi obblighi normativi impongono ai produttori di AI di rendere pubblici i riassunti dei dati protetti da diritto d'autore utilizzati durante l'addestramento, permettendo ai creatori di esercitare il diritto di opt-out.

---

# 6.6 Sicurezza e Uso Malevolo dell'AI

Il potenziale trasformativo dell'AI porta con sé nuove minacce alla sicurezza pubblica e informatica:

- **Deepfake e Disinformazione:** la generazione di media sintetici (video, audio e immagini iperrealistiche) utilizzati per truffe finanziarie, manipolazione politica e danni d'immagine. L'AI Act impone oggi la marchiatura digitale (watermarking) dei contenuti generati artificialmente.
- **Adversarial Attacks:** tecniche in cui si inseriscono piccole perturbazioni invisibili all'occhio umano nei dati di input per ingannare i modelli di classificazione (es. alterare un segnale stradale per confondere la guida autonoma).
- **Prompt Injection:** attacchi diretti agli LLM e agli AI Agent in cui un utente malintenzionato fornisce istruzioni nascoste per bypassare i filtri di sicurezza e costringere il modello a eseguire azioni non autorizzate (es. esfiltrare dati sensibili).

---

# 6.7 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| **Algorithmic Bias** | Errore sistematico e ingiusto prodotto da un sistema informatico, spesso a danno di minoranze. |
| **Privacy by Design** | Approccio che integra la protezione della privacy fin dalle prime fasi di progettazione software. |
| **Federated Learning** | Tecnica per addestrare modelli in modo decentralizzato senza spostare i dati privati degli utenti. |
| **EU AI Act** | Il principale regolamento dell'Unione Europea relativo all'intelligenza artificiale. |
| **XAI (Explainable AI)** | Branca dell'AI dedicata a rendere i processi decisionali dei modelli comprensibili agli esseri umani. |
| **GPAI (General Purpose AI)** | Sistemi di intelligenza artificiale adattabili a un'ampia gamma di scopi differenti (es. GPT, Claude). |
| **Black Box** | Modello il cui funzionamento interno e processo decisionale risultano opachi e non interpretabili. |
| **Deepfake** | Contenuto multimediale sintetico (audio/video) altamente realistico creato per ingannare l'utente. |
| **Prompt Injection** | Attacco di sicurezza informatica volto a manipolare le istruzioni di un modello linguistico. |

---

# Riepilogo del modulo

In questo modulo conclusivo hai analizzato l'impatto dell'Intelligenza Artificiale sulla società, sull'etica e sul diritto. 

Hai studiato:
- come i bias algoritmici (in particolare quelli di rappresentazione) possano generare discriminazioni e quali strategie (de-biasing, audit) vengano usate per mitigarli;
- i rischi legati alla profilazione e le moderne soluzioni di privacy come il Federated Learning;
- l'infrastruttura normativa europea (EU AI Act 2.0), che classifica le applicazioni in base al rischio (inaccettabile, alto rischio, sistemi generali);
- i requisiti di trasparenza (Explainable AI) per le applicazioni critiche e le nuove catene di responsabilità legale per i sistemi "Black Box";
- le complessità relative al diritto d'autore (copyright scraping e titolarità dell'output generativo);
- le minacce alla sicurezza informatica, inclusi i Deepfake, gli attacchi avversari e le tecniche di Prompt Injection.

Queste competenze completano il profilo professionale necessario per sviluppare, implementare e gestire soluzioni AI che siano non solo tecnologicamente avanzate, ma anche etiche, sicure e conformi alle normative vigenti.

[⬆ Torna all'indice](#indice)

---
