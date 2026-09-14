# 🏆 PROJECT WORK FINALE

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent · Percorso ispirato al programma "Laboratorio pratico di Machine Learning e sviluppo di AI Agent" · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [Obiettivo del Project Work](#sez-pw-1)
2. [Come scegliere il percorso giusto per te](#sez-pw-2)
3. [🅰️ Percorso A — Pipeline ML comparativa](#percorso-a)
4. [🅱️ Percorso B — AI Agent su ambiente Gymnasium](#percorso-b)
5. [🅰️🅱️ Percorso combinato (facoltativo, per chi vuole di più)](#percorso-combinato)
6. [Struttura e formato di consegna](#consegna)
7. [Criteri di valutazione](#valutazione)
8. [Best Practice del Project Work](#best-practice)
9. [Errori comuni](#errori-comuni)
10. [Glossario del Project Work](#glossario)
11. [Riepilogo del corso](#riepilogo)

---

# Obiettivi del Project Work

Al termine del Project Work sarai in grado di:

- affrontare un problema di Machine Learning **end-to-end**, dalla scelta del dataset alla valutazione finale, senza una traccia guidata passo per passo come nei moduli precedenti;
- applicare in autonomia, su dati nuovi, le tecniche viste nei quattro moduli del corso (o un sottoinsieme motivato di esse);
- **documentare e motivare** le proprie scelte tecniche, non solo scrivere codice che funziona;
- confrontare criticamente approcci diversi allo stesso problema, come hai già iniziato a fare nei progetti guidati dei singoli moduli;
- presentare un lavoro completo, riproducibile e leggibile anche da chi non l'ha scritto.

---

<a id="sez-pw-1"></a>
# Obiettivo del Project Work

[⬆ Torna all'indice del modulo](#indice-modulo)

I quattro moduli del corso ti hanno guidato passo per passo attraverso quattro modi diversi di far imparare un modello: da esempi etichettati (Modulo 1), da dati senza etichette (Modulo 2), attraverso rappresentazioni via via più complesse (Modulo 3), e agendo dentro un ambiente che risponde alle proprie scelte (Modulo 4). Il Project Work chiude il percorso chiedendoti di applicare queste competenze **senza una traccia guidata**, su un problema che sceglierai (in parte) tu stesso.

> 💡 **Approfondimento**
>
> Non è un caso che il Project Work non fornisca un dataset già pronto come nei moduli precedenti. Il lavoro più prezioso in un progetto reale di Machine Learning avviene spesso *prima* di scrivere il primo modello: capire i dati a disposizione, decidere cosa preprocessare, scegliere quale domanda ha senso porsi. È esattamente questa la competenza che il Project Work vuole farti esercitare.

Scegli **uno** dei due percorsi descritti di seguito (A o B), oppure entrambi se vuoi affrontare un progetto più ambizioso (sezione "Percorso combinato").

---

<a id="sez-pw-2"></a>
# Come scegliere il percorso giusto per te

[⬆ Torna all'indice del modulo](#indice-modulo)

| | Percorso A — Pipeline ML comparativa | Percorso B — AI Agent su Gymnasium |
|---|---|---|
| **Moduli richiamati** | Modulo 1, Modulo 2, Modulo 3 | Modulo 4 |
| **Cosa produci** | Un confronto motivato tra più modelli sullo stesso dataset | Un agente addestrato che impara a risolvere un compito |
| **Punto di forza se...** | ...ti interessa il ciclo classico "dati → modello → valutazione" e vuoi vedere le stesse tecniche applicate a un problema nuovo | ...ti ha appassionato l'idea di un modello che "agisce" e vuoi approfondire il compromesso esplorazione/sfruttamento |
| **Difficoltà principale** | Trovare e pulire un dataset reale adatto | Configurare correttamente un ambiente Gymnasium diverso da quello già visto |

> ⚠️ **Attenzione**
>
> Non esiste un percorso "più facile" in assoluto: entrambi richiedono lo stesso livello di autonomia. Scegli in base a cosa vuoi approfondire, non in base a cosa ti sembra richiedere meno lavoro — il criterio di valutazione (sezione "Criteri di valutazione") è calibrato allo stesso modo per entrambi i percorsi.

---

<a id="percorso-a"></a>
# 🅰️ Percorso A — Pipeline ML comparativa

[⬆ Torna all'indice del modulo](#indice-modulo)

**Obiettivo:** dato un dataset reale a tua scelta, costruire una pipeline che applichi in sequenza un modello supervisionato (Modulo 1), un'analisi di clustering esplorativo (Modulo 2) e una rete neurale (Modulo 3), confrontandone le performance in modo motivato.

### Requisiti minimi

1. **Scegli un dataset reale** con almeno 200 esempi e almeno 2 classi target, da fonti pubbliche come Kaggle o UCI Machine Learning Repository. Non deve essere un dataset già incluso in scikit-learn o seaborn come quelli usati nei moduli.
2. **Preprocessing**: gestisci valori mancanti, encoding di eventuali variabili categoriche, split train/test stratificato, normalizzazione — applicando le stesse regole anti data-leakage viste nel Modulo 1 (sezione 1.5) e richiamate nel Modulo 3.
3. **Modello supervisionato**: addestra e valuta un classificatore (KNN o un altro algoritmo di classificazione a tua scelta), motivando la scelta degli iperparametri come nel Modulo 1.
4. **Clustering esplorativo**: applica k-means o clustering gerarchico sulle sole feature (ignorando temporaneamente il target), e verifica se i cluster trovati corrispondono in una certa misura alle classi reali — come nel progetto guidato del Modulo 2.
5. **Rete neurale**: costruisci e addestra una rete neurale con PyTorch sullo stesso problema, seguendo la struttura del Modulo 3 (training loop, monitoraggio di loss e accuratezza).
6. **Confronto motivato**: una sezione finale che confronti le performance dei diversi approcci, spiegando **perché**, secondo te, un modello si comporta meglio o peggio degli altri su questo specifico dataset.

```python
# ============================================================
# SCHELETRO DI PARTENZA - Percorso A
# Adatta ogni sezione al tuo dataset specifico.
# ============================================================

# 1. Caricamento e preprocessing -------------------------------
# import pandas as pd
# df = pd.read_csv("il_tuo_dataset.csv")
# ... gestione valori mancanti, encoding, split, normalizzazione ...

# 2. Modello supervisionato --------------------------------------
# from sklearn.neighbors import KNeighborsClassifier
# ... addestramento e valutazione, come nel Modulo 1 ...

# 3. Clustering esplorativo ----------------------------------------
# from sklearn.cluster import KMeans
# ... clustering sulle sole feature, confronto con le classi reali ...

# 4. Rete neurale con PyTorch ---------------------------------------
# import torch.nn as nn
# ... stessa struttura del Modulo 3: training loop, loss, accuratezza ...

# 5. Confronto motivato -----------------------------------------------
# Tabella o grafico che confronta le performance, seguito da un commento
# scritto (in una cella Markdown) che ne spiega le ragioni.
```

**Idee di dataset per iniziare la ricerca:** classificazione di malattie cardiache, previsione dell'abbandono clienti (customer churn), classificazione di specie vegetali o animali, previsione della qualità di un prodotto alimentare. Non limitarti a questi esempi: qualunque dataset reale, etichettato e di dimensione adeguata, va bene.

---

<a id="percorso-b"></a>
# 🅱️ Percorso B — AI Agent su ambiente Gymnasium

[⬆ Torna all'indice del modulo](#indice-modulo)

**Obiettivo:** addestrare un agente Q-learning su un ambiente Gymnasium **diverso** da Taxi-v3, confrontando almeno due configurazioni di iperparametri e analizzandone la convergenza.

### Requisiti minimi

1. **Scegli un ambiente Gymnasium diverso da Taxi-v3**, con uno spazio di stati e azioni discreto (compatibile con una Q-table, come visto nel Modulo 4).
2. **Implementa il ciclo di training** completo — Q-table, strategia epsilon-greedy con decadimento, equazione di aggiornamento Q-learning — seguendo la stessa struttura del Modulo 4.
3. **Confronta almeno due configurazioni di iperparametri** (ad esempio due valori diversi di learning rate α, o di discount factor γ, o due diverse strategie di epsilon decay), addestrando un agente separato per ciascuna.
4. **Analizza la convergenza**: per ciascuna configurazione, rappresenta graficamente il reward medio per episodio (media mobile, come nel Modulo 4) e commenta quale configurazione converge più rapidamente o raggiunge un reward finale più alto.
5. **Valuta gli agenti addestrati** confrontandoli con un agente casuale, come nel progetto guidato del Modulo 4.

```python
# ============================================================
# SCHELETRO DI PARTENZA - Percorso B
# Adatta ogni sezione all'ambiente Gymnasium che hai scelto.
# ============================================================

# 1. Creazione dell'ambiente -------------------------------------
# import gymnasium as gym
# ambiente = gym.make("NomeAmbiente-vX")
# ... verifica che observation_space e action_space siano discreti ...

# 2. Funzioni riutilizzate dal Modulo 4 -----------------------------
# scegli_azione(), aggiorna_q_table()  →  puoi riprenderle
# direttamente dal Laboratorio 4.3 e 4.4, sono generiche.

# 3. Training loop per ciascuna configurazione di iperparametri -----
# configurazioni = [
#     {"alpha": 0.1, "gamma": 0.99, "epsilon_decay": 0.999},
#     {"alpha": 0.3, "gamma": 0.9,  "epsilon_decay": 0.995},
# ]
# ... addestra un agente per ciascuna configurazione, salvando lo
#     storico dei reward per il confronto ...

# 4. Grafico comparativo di convergenza --------------------------------
# Una figura che sovrappone le curve di reward medio delle diverse
# configurazioni, con legenda.

# 5. Valutazione finale contro un agente casuale -------------------------
# valuta_agente(), come nel progetto guidato del Modulo 4.
```

**Ambienti Gymnasium candidati (elenco indicativo, da verificare per compatibilità e licenza al momento della scelta):** `FrozenLake-v1` (griglia con buche da evitare), `CliffWalking-v0` (percorso lungo un dirupo), o altri ambienti discreti della libreria `gymnasium.envs.toy_text`.

---

<a id="percorso-combinato"></a>
# 🅰️🅱️ Percorso combinato (facoltativo, per chi vuole di più)

[⬆ Torna all'indice del modulo](#indice-modulo)

Chi desidera un progetto più ambizioso può svolgere **entrambi** i percorsi, aggiungendo una breve sezione conclusiva che metta in relazione le due esperienze: cosa hanno in comune, nel processo di lavoro, un progetto di apprendimento supervisionato/non supervisionato/deep learning e uno di reinforcement learning? Dove, invece, le due logiche si allontanano di più?

> 💡 **Approfondimento**
>
> Questa domanda non ha una risposta univoca: è pensata per farti riflettere sul filo conduttore dell'intero corso, richiamato anche alla fine del Modulo 4 — dal "prevedere" al "decidere e agire" — con parole tue, alla luce del lavoro che hai appena svolto in prima persona.

---

<a id="consegna"></a>
# Struttura e formato di consegna

[⬆ Torna all'indice del modulo](#indice-modulo)

Indipendentemente dal percorso scelto, la consegna deve rispettare questa struttura:

1. **Notebook Google Colab** unico, eseguibile dall'inizio alla fine senza errori (`Runtime → Esegui tutte`), condiviso con accesso in visualizzazione.
2. **Introduzione** (cella Markdown): una o due frasi su quale percorso hai scelto, quale dataset o ambiente hai usato, e perché.
3. **Codice organizzato per sezioni**, con celle Markdown che separano le fasi (come nello scheletro di partenza), non un unico blocco di codice indistinto.
4. **Almeno un grafico** per ciascuna fase rilevante del lavoro (esplorazione dei dati, confronto tra modelli o tra configurazioni).
5. **Conclusione** (cella Markdown finale): un breve commento sui risultati ottenuti e su cosa faresti diversamente con più tempo a disposizione.

---

<a id="valutazione"></a>
# Criteri di valutazione

[⬆ Torna all'indice del modulo](#indice-modulo)

| Criterio | Cosa viene valutato |
|---|---|
| **Correttezza tecnica** | Il codice funziona, segue le best practice dei moduli (split corretto, niente data leakage, normalizzazione adeguata) |
| **Completezza** | Tutti i requisiti minimi del percorso scelto sono presenti |
| **Motivazione delle scelte** | Ogni scelta tecnica rilevante (algoritmo, iperparametri, preprocessing) è spiegata, non solo implementata |
| **Qualità del confronto finale** | Il confronto tra modelli (Percorso A) o configurazioni (Percorso B) è supportato da grafici e da un commento critico, non solo da numeri elencati |
| **Chiarezza espositiva** | Il notebook è leggibile e comprensibile anche da chi non lo ha scritto, grazie a celle Markdown e commenti nel codice |

---

<a id="best-practice"></a>
# ✅ Best Practice del Project Work

[⬆ Torna all'indice del modulo](#indice-modulo)

- inizia esplorando il dataset o l'ambiente scelto **prima** di scrivere qualunque codice di modellazione: la qualità delle scelte successive dipende da quanto conosci i dati o l'ambiente di partenza;
- riutilizza il codice dei laboratori dei moduli come base, adattandolo — non serve reinventare da zero funzioni come `scegli_azione()` o `aggiorna_q_table()`;
- documenta gli iperparametri scelti e il perché, non limitarti a riportare i valori finali;
- se un risultato ti sorprende (un'accuratezza inaspettatamente bassa, un agente che non converge), commentalo esplicitamente invece di ignorarlo: è spesso la parte più interessante da leggere per chi valuta il lavoro;
- rileggi il tuo notebook dall'inizio prima della consegna, verificando che sia eseguibile senza errori in ordine, dall'alto verso il basso.

---

<a id="errori-comuni"></a>
# ❌ Errori comuni

[⬆ Torna all'indice del modulo](#indice-modulo)

- **Scegliere un dataset o un ambiente troppo simile a quelli già visti nei moduli:** l'obiettivo del Project Work è applicare le competenze a qualcosa di nuovo, non ripetere un laboratorio già svolto.
- **Consegnare un notebook che genera errori se eseguito dall'inizio:** un notebook che funziona solo "a pezzi", eseguendo le celle fuori ordine, non soddisfa il requisito di riproducibilità.
- **Limitarsi a implementare senza motivare:** un confronto tra modelli fatto di soli numeri, senza un commento che ne spieghi il significato, non soddisfa il criterio "Qualità del confronto finale".
- **Ripetere gli stessi errori anti data-leakage già segnalati nei moduli precedenti:** calcolare statistiche di normalizzazione su tutto il dataset prima dello split resta un errore, anche in un progetto nuovo.
- **Sottovalutare la fase di preprocessing (Percorso A) o la scelta dell'ambiente (Percorso B):** sono spesso la parte più time-consuming del lavoro, e vanno messe in conto fin dall'inizio.

---

<a id="glossario"></a>
# Glossario del Project Work

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|---|---|
| **Pipeline** | La sequenza organizzata di fasi (preprocessing, modellazione, valutazione) che porta dai dati grezzi al risultato finale |
| **Dataset reale** | Un dataset raccolto da una fonte pubblica esterna al corso (es. Kaggle, UCI), non incluso nelle librerie usate nei moduli |
| **Confronto motivato** | Un confronto tra approcci diversi accompagnato da una spiegazione delle ragioni dei risultati osservati, non solo dai numeri |
| **Analisi di convergenza** | La valutazione di quanto rapidamente e stabilmente un agente di Reinforcement Learning raggiunge buone prestazioni durante il training |
| **Riproducibilità** | La proprietà di un notebook di produrre lo stesso risultato (o un risultato coerente) se eseguito nuovamente dall'inizio alla fine |

---

<a id="riepilogo"></a>
# Riepilogo del corso

[⬆ Torna all'indice del modulo](#indice-modulo)

Con il Project Work si chiude il percorso del **Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent**. Nei quattro moduli hai costruito, con le tue mani, un modello che impara a **classificare** (Modulo 1), uno che **scopre pattern** da solo (Modulo 2), uno che **rappresenta la realtà in profondità** (Modulo 3), e infine un vero **agente autonomo** che percepisce, decide e agisce (Modulo 4). Il Project Work ti ha chiesto di mettere in pratica queste competenze senza una traccia guidata — esattamente il tipo di autonomia che serve per affrontare, fuori da questo corso, un problema reale di Machine Learning dall'inizio alla fine.

[⬆ Torna all'indice del modulo](#indice-modulo)