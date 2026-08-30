<a id="inizio"></a>

# 🤖 Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent
**Il percorso hands-on di GCProf Academy per passare dalla teoria dell'AI alla costruzione di modelli e agenti che funzionano davvero.**

Benvenuto nella preview del **Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent** di **GCProf Academy** — materiale didattico a cura del Prof. Giuseppe Carnabuci, ispirato e ampliato a partire dal percorso "Laboratorio pratico di Machine Learning e sviluppo di AI Agent".

Non è un corso di sola teoria: è un **laboratorio**. Ogni modulo ti mette letteralmente le mani nel codice, con dataset reali, algoritmi che vedi convergere sotto i tuoi occhi e un filo conduttore che dal primo all'ultimo modulo racconta un'unica storia — quella di un modello che impara a **classificare**, poi a **scoprire pattern**, poi a **rappresentare la realtà in profondità**, fino a diventare un vero **agente che percepisce, decide e agisce**.

**[👉 Iscriviti ora e inizia dal Modulo 1!]**

---

## 🧭 Il Filo Conduttore del Corso

> 💡 **Perché "AI Agent" e non solo "Machine Learning"?**
> Un modello classico *predice* un'etichetta a partire da dati statici. Un **agente** *percepisce* uno stato, *decide* un'azione e *agisce* in un ambiente che cambia in risposta alle sue scelte, ricevendo un segnale di rinforzo. Il Reinforcement Learning è il ponte naturale tra "fare previsioni" e "costruire agenti autonomi" — lo stesso schema concettuale (percezione → decisione → azione → memoria) che ritroverai poi negli AI Agent basati su LLM.

Il percorso costruisce questa idea un mattone alla volta, in **4 moduli progressivi**, ciascuno trattabile in autonomia dal docente ma pensato per incastrarsi nel successivo:

| Modulo | Tipo di apprendimento | Cosa saprai fare al termine |
|---|---|---|
| **1. Apprendimento Supervisionato** | Il modello impara da esempi etichettati | Addestrare e valutare un classificatore KNN, riconoscendo overfitting e underfitting |
| **2. Apprendimento Non Supervisionato** | Il modello scopre da solo strutture nei dati | Applicare k-means e clustering gerarchico per trovare pattern nascosti |
| **3. Deep Learning con PyTorch** | Il modello impara rappresentazioni complesse | Costruire e addestrare una rete neurale da zero, capendo pesi, loss e ottimizzazione |
| **4. Reinforcement Learning e AI Agent** | L'agente impara a decidere e ad agire | Addestrare con Q-learning un AI Agent autonomo su un ambiente Gymnasium (Taxi-v3) |

---

## 👥 A chi è rivolto

* 🎓 Studenti delle superiori e universitari che vogliono passare dalla teoria dell'AI alla pratica del codice
* 💻 Sviluppatori e professionisti ICT che vogliono aggiungere il Machine Learning al proprio bagaglio tecnico
* 👨‍🏫 Insegnanti che cercano un laboratorio pronto, modulare e completo di quiz da portare in classe
* 🚀 Chiunque abbia già fatto pratica con i fondamenti di AI e Python e voglia costruire il primo vero progetto ML end-to-end

**Livello:** Intermedio/Avanzato — corso interamente laboratoriale, con esempi eseguibili in **Google Colab**.

**Prerequisiti consigliati:**
* basi di Python (variabili, funzioni, cicli, liste/dizionari);
* utile ma non indispensabile: aver seguito i moduli "Python per AI" e "Data Analysis" del Master AI di GCProf Academy.

---

<a id="indice"></a>
## 📑 Indice dei Moduli Navigabile

* [Introduzione al Percorso, Obiettivi e Setup](#intro-obiettivi-setup)
* [Modulo 1: Apprendimento Supervisionato](#modulo-1)
* [Modulo 2: Apprendimento Non Supervisionato](#modulo-2)
* [Modulo 3: Deep Learning con PyTorch](#modulo-3)
* [Modulo 4: Reinforcement Learning e AI Agent](#modulo-4)
* [Project Work Finale](#project-work)

---

## 📚 Dettaglio dei Moduli

<a id="modulo-1"></a>
[🔙 Torna all'indice](#indice)

### Modulo 1: Apprendimento Supervisionato
Il punto di partenza di ogni percorso di Machine Learning: imparare da esempi già etichettati.
* **Argomenti:** classificazione vs regressione, suddivisione train/test, `train_test_split` e `stratify`, l'algoritmo k-Nearest Neighbors, overfitting e underfitting, scelta dell'iperparametro `k`.
* **Progetto guidato:** *Modellazione predittiva per l'agricoltura* — individuare quale caratteristica del suolo predice meglio, da sola, la coltura ottimale.
* **Al termine saprai:** costruire, addestrare e valutare un classificatore KNN con scikit-learn, evitando gli errori più comuni di data leakage.

---

<a id="modulo-2"></a>
[🔙 Torna all'indice](#indice)

### Modulo 2: Apprendimento Non Supervisionato
Cosa succede quando i dati non hanno etichette? Il modello impara a scoprirle da solo.
* **Argomenti:** clustering, k-means e scelta del numero ottimale di cluster (elbow method, silhouette score), clustering gerarchico e dendrogrammi, normalizzazione delle feature.
* **Progetto guidato:** *Raggruppare le specie di pinguini antartici* — scoprire gruppi naturali in un dataset morfologico senza etichette, poi validarli.
* **Al termine saprai:** applicare k-means e clustering gerarchico con scikit-learn, e capire quando fidarti (e quando no) dei cluster trovati.

---

<a id="modulo-3"></a>
[🔙 Torna all'indice](#indice)

### Modulo 3: Deep Learning con PyTorch
Dal singolo neurone artificiale alla prima rete neurale addestrata con le tue mani.
* **Argomenti:** tensori e operazioni base in PyTorch, costruzione di una rete con layer lineari, pesi e funzioni di attivazione, funzione di loss, backpropagation e ottimizzazione, ciclo di training e valutazione.
* **Al termine saprai:** costruire, addestrare e valutare una rete neurale su un problema di classificazione, comprendendo cosa succede "sotto il cofano" a ogni passo.

---

<a id="modulo-4"></a>
[🔙 Torna all'indice](#indice)

### Modulo 4: Reinforcement Learning e AI Agent
Il modulo che chiude il cerchio: da "prevedere" a "decidere e agire".
* **Argomenti:** framework agente-ambiente-reward, strategia epsilon-greedy, algoritmo Q-learning e Q-table, bilanciamento esplorazione/sfruttamento, l'ambiente Gymnasium.
* **Progetto guidato:** *Ottimizzazione del percorso dei taxi* — addestrare un AI Agent che impara a raccogliere e lasciare un passeggero nel minor numero di mosse possibile sull'ambiente Taxi-v3.
* **Al termine saprai:** implementare un ciclo completo di Reinforcement Learning e addestrare il tuo primo, vero AI Agent autonomo.

---

## 🛠️ La Nostra Metodologia Formativa

Ogni modulo segue le **5 fasi** della metodologia GCProf Academy — **comprendere → visualizzare → analizzare casi reali → applicare → verificare** — ed è internamente strutturato in sezioni ricorrenti, così da poter essere insegnato in autonomia dal docente senza dover consultare gli altri moduli:

*Obiettivi del modulo ➔ Teoria ➔ Esempi di codice commentati ➔ Progetto guidato su dataset reale ➔ Best practice ➔ Errori comuni ➔ Riepilogo ➔ Glossario ➔ Quiz di verifica*

* 📖 **Guida Teorica Markdown:** con indice navigabile, visualizzabile sia in Google Colab sia in Google Docs.
* 💻 **Esempi e Laboratori Pratici:** notebook eseguibili al 100% in **Google Colab**, con codice ampiamente commentato riga per riga.
* 🧪 **Quiz Markdown:** nel formato standard della piattaforma (8 domande chiuse + 1 domanda aperta).

---

<a id="project-work"></a>
## 🏁 Project Work Finale

Al termine del percorso, ogni studente sceglie uno tra due percorsi di consegna (o entrambi, per un progetto più ambizioso):

* **Percorso A — Pipeline ML comparativa:** dataset reale (Kaggle/UCI) → preprocessing → modello supervisionato → clustering esplorativo → rete neurale, con confronto motivato delle performance.
* **Percorso B — AI Agent su ambiente Gymnasium:** un ambiente diverso da Taxi-v3, agente Q-learning addestrato, confronto tra almeno due configurazioni di iperparametri e analisi della convergenza.

---

### 🚀 Pronto a costruire il tuo primo AI Agent?
Quattro moduli, quattro dataset reali, un solo filo conduttore: dal primo classificatore al tuo primo agente autonomo.

**[👉 Iscriviti ora e inizia dal Modulo 1!]**

[🔙 Torna all'indice](#indice)