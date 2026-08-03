<a id="top"></a>

# 📘 Modulo 10: LLM Engineering
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

Nel Modulo 9 hai capito **come funziona** un Transformer. In questo modulo impari **come portarlo in produzione**: come eseguire un LLM sul tuo computer invece che tramite un'API cloud, come renderlo più leggero senza comprometterne troppo le prestazioni, e soprattutto come costruire un sistema **RAG (Retrieval-Augmented Generation)** — la tecnica che permette a un LLM di rispondere basandosi su documenti specifici e aggiornati, invece che sulla sola conoscenza "congelata" acquisita durante l'addestramento.

Un LLM di grandi dimensioni può occupare decine o centinaia di gigabyte di memoria: eseguirlo in locale, su un normale computer, richiede tecniche specifiche di ottimizzazione. È qui che entrano in gioco concetti come **quantizzazione** e formati come **GGUF**, insieme a strumenti come **Ollama**, **llama.cpp** e **vLLM**, che rendono possibile eseguire modelli open-weight (come Llama o Mistral, visti nel Modulo 9) direttamente sul proprio hardware, con pieno controllo su privacy, costi e personalizzazione.

Nella seconda parte del modulo affronterai le architetture **RAG**: come collegare un LLM a una base di conoscenza esterna (documenti aziendali, materiali scolastici, manuali) tramite **vector database**, **embedding** e tecniche di **chunking e retrieval** — competenza fondamentale per qualsiasi applicazione AI che debba rispondere in modo affidabile su informazioni specifiche e non pubbliche.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Spiegare cos'è la **quantizzazione** e come riduce i requisiti di memoria di un LLM.
- ✅ Descrivere il formato **GGUF** e il suo ruolo nell'esecuzione locale dei modelli.
- ✅ Installare, configurare ed eseguire modelli LLM in locale con **Ollama**.
- ✅ Comprendere le differenze e i casi d'uso di **Ollama**, **llama.cpp** e **vLLM**.
- ✅ Ottimizzare l'utilizzo di **GPU/VRAM** e gestire correttamente la **context window** di un modello.
- ✅ Spiegare il funzionamento di un'architettura **RAG** end-to-end.
- ✅ Implementare **chunking**, **embedding** e **retrieval** su documenti reali.
- ✅ Costruire e interrogare un **vector database** (es. FAISS o Chroma).
- ✅ Assemblare un sistema RAG completo, dal caricamento dei documenti alla risposta generata dal modello.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato il **Modulo 9 (Transformer)**: sono richiesti i concetti di tokenizzazione, embedding e context window.
- Ambiente Python funzionante (Moduli 4, 8, 9).
- Almeno 8-16 GB di RAM disponibili sul proprio computer per eseguire modelli locali di dimensioni contenute (le indicazioni precise sono nel materiale scaricabile); in alternativa, è possibile seguire la parte di esecuzione locale su una macchina con risorse limitate usando i modelli più piccoli indicati nel laboratorio.

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Quantizzazione: rendere i modelli più leggeri

I pesi di un LLM sono, di default, numeri in virgola mobile a 32 o 16 bit (FP32, FP16). Un modello con 7 miliardi di parametri in FP16 occupa già circa 14 GB — troppo per molti computer consumer. La **quantizzazione** riduce la precisione numerica dei pesi (es. a 8, 4 o anche meno bit), diminuendo drasticamente lo spazio occupato e i requisiti di calcolo, con una perdita di qualità generalmente contenuta se applicata con criterio.

| Precisione | Spazio (modello 7B, indicativo) | Qualità |
|---|---|---|
| FP16 (16 bit) | ~14 GB | Riferimento (massima qualità) |
| INT8 (8 bit) | ~7 GB | Perdita di qualità minima |
| INT4 (4 bit) | ~3.5-4 GB | Perdita di qualità percepibile ma spesso accettabile |

La quantizzazione è ciò che rende possibile eseguire modelli con miliardi di parametri su un normale laptop, sacrificando una parte marginale di precisione in cambio di un'accessibilità enormemente maggiore.

### 4.2 — Il formato GGUF

**GGUF (GPT-Generated Unified Format)** è un formato di file pensato specificamente per l'esecuzione efficiente di LLM quantizzati su hardware consumer (CPU e GPU comuni), sviluppato nell'ambito del progetto **llama.cpp**. Un file GGUF contiene i pesi del modello già quantizzati, insieme ai metadati necessari per l'esecuzione (tokenizer, configurazione architetturale), in un unico pacchetto facilmente distribuibile e caricabile.

Quando scarichi un modello per eseguirlo con Ollama o llama.cpp, nella maggior parte dei casi stai scaricando un file `.gguf` — spesso disponibile in più varianti quantizzate (es. `Q4_K_M`, `Q8_0`), tra cui scegliere in base al compromesso desiderato tra qualità e requisiti hardware.

### 4.3 — Ollama, llama.cpp, vLLM: strumenti a confronto

| Strumento | Cosa fa | Quando usarlo |
|---|---|---|
| **Ollama** | Interfaccia semplificata per scaricare, gestire ed eseguire modelli GGUF in locale, con comandi essenziali e un'API REST integrata | Sperimentazione rapida, prototipazione, uso didattico e personale — è lo strumento più accessibile per iniziare |
| **llama.cpp** | Motore di inferenza C++ ad alte prestazioni, alla base tecnica di Ollama stesso, con controllo molto più granulare sui parametri | Quando serve il massimo controllo su ottimizzazioni specifiche dell'hardware |
| **vLLM** | Motore di inferenza pensato per il **serving in produzione**, ottimizzato per gestire molte richieste simultanee con throughput elevato | Applicazioni in produzione con più utenti contemporanei, tipicamente su server con GPU dedicate |

Per gli scopi di questo Master, e per la maggior parte dei progetti didattici o di prototipazione, **Ollama** è lo strumento di riferimento: semplice da installare, con un solo comando per scaricare ed eseguire un modello.

```bash
# Installazione (macOS/Linux) — vedi materiale scaricabile per Windows
curl -fsSL https://ollama.com/install.sh | sh

# Scaricare ed eseguire un modello
ollama run llama3.2

# Elenco dei modelli scaricati
ollama list
```

Ollama espone anche un'**API REST locale**, utilizzabile direttamente da Python, esattamente come faresti con un'API cloud (Modulo 7):

```python
import requests

risposta = requests.post("http://localhost:11434/api/generate", json={
    "model": "llama3.2",
    "prompt": "Spiega in una frase cos'è il Machine Learning.",
    "stream": False
})

print(risposta.json()["response"])
```

### 4.4 — Ottimizzazione GPU/VRAM e gestione della Context Window

Quando un modello viene eseguito, sia i pesi che la **cache dell'attenzione** (i valori Key e Value calcolati per ogni token già elaborato, vedi Modulo 9) devono risiedere in memoria — idealmente nella VRAM di una GPU, molto più veloce della RAM di sistema.

**Alcune leve di ottimizzazione pratiche:**
- **Scegliere il livello di quantizzazione** più adatto alla VRAM disponibile (es. Q4 su GPU con poca memoria).
- **Limitare la context window** effettivamente usata: più token nel contesto, più memoria richiesta per la cache di attenzione — un costo che cresce, come visto nel Modulo 9, con la lunghezza della sequenza.
- **Offloading CPU/GPU**: strumenti come Ollama e llama.cpp permettono di distribuire alcuni strati del modello sulla GPU e altri sulla CPU, quando la VRAM non è sufficiente per l'intero modello.
- **Batch size**: nella fase di sviluppo di applicazioni con più richieste, la dimensione dei batch elaborati insieme incide fortemente su throughput e uso di memoria (rilevante soprattutto con vLLM in scenari di produzione).

### 4.5 — Architetture RAG: la teoria

**RAG (Retrieval-Augmented Generation)** risolve un problema fondamentale: un LLM conosce solo ciò che ha "visto" durante l'addestramento, con una data di cutoff fissa, e non conosce documenti privati, aziendali o scolastici. Il RAG collega il modello a una base di conoscenza esterna **aggiornabile**, senza dover riaddestrare il modello stesso.

**Il flusso RAG, passo per passo:**

1. **Ingestione**: i documenti (PDF, pagine web, appunti, manuali) vengono caricati e suddivisi in **chunk** (frammenti di testo di dimensione gestibile).
2. **Embedding**: ogni chunk viene trasformato in un vettore numerico tramite un modello di embedding (concetto visto nel Modulo 9).
3. **Indicizzazione**: i vettori vengono salvati in un **vector database**, una struttura dati ottimizzata per la ricerca per similarità.
4. **Retrieval**: quando l'utente fa una domanda, la domanda stessa viene trasformata in un embedding, e il vector database restituisce i chunk più simili (semanticamente rilevanti).
5. **Generazione aumentata**: i chunk recuperati vengono inseriti nel prompt insieme alla domanda originale, e l'LLM genera la risposta basandosi su quel contesto specifico, non solo sulla propria conoscenza pregressa.

```
Domanda utente → Embedding della domanda → Ricerca nel vector DB
              → Chunk più rilevanti recuperati
              → Prompt = domanda + chunk rilevanti
              → LLM genera risposta basata sul contesto fornito
```

### 4.6 — Chunking: come dividere i documenti

La dimensione e la strategia di suddivisione dei documenti in chunk incide fortemente sulla qualità del RAG:

- **Chunk troppo piccoli**: rischiano di perdere il contesto necessario per essere comprensibili da soli.
- **Chunk troppo grandi**: diluiscono l'informazione rilevante, rendendo la ricerca per similarità meno precisa, e occupano più spazio nel prompt finale.
- **Overlap (sovrapposizione)**: far sovrapporre leggermente chunk consecutivi (es. le ultime 50 parole di un chunk ripetute all'inizio del successivo) evita che informazioni rilevanti vengano "spezzate" esattamente al confine tra due chunk.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,      # caratteri per chunk
    chunk_overlap=50     # sovrapposizione tra chunk consecutivi
)
chunk_list = splitter.split_text(testo_documento)
```

### 4.7 — Vector Database e Retrieval

Un **vector database** è una struttura dati specializzata nella ricerca per **similarità semantica** (tipicamente basata sulla distanza coseno tra vettori, vista nel laboratorio del Modulo 9), invece della ricerca esatta per parole chiave usata da un database tradizionale.

```python
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

modello_embedding = SentenceTransformer("all-MiniLM-L6-v2")
chunk_embeddings = modello_embedding.encode(chunk_list)

# Creazione dell'indice FAISS
indice = faiss.IndexFlatL2(chunk_embeddings.shape[1])
indice.add(np.array(chunk_embeddings))

# Retrieval: trovare i chunk più simili a una domanda
domanda = "Qual è la scadenza per gli obblighi ad alto rischio dell'AI Act?"
embedding_domanda = modello_embedding.encode([domanda])
distanze, indici_chunk = indice.search(np.array(embedding_domanda), k=3)  # top 3 chunk

chunk_rilevanti = [chunk_list[i] for i in indici_chunk[0]]
```

**FAISS** (Facebook AI Similarity Search) è una delle librerie più diffuse per questo scopo; alternative popolari includono **Chroma**, **Pinecone** e **Qdrant**, ciascuna con compromessi diversi tra semplicità d'uso, scalabilità e funzionalità.

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — Quantizzazione in pratica**
Un docente vuole eseguire un modello da 7 miliardi di parametri sul proprio laptop con 16 GB di RAM: la versione FP16 (14 GB) rischia di saturare la memoria disponibile per il sistema operativo; una versione quantizzata a 4 bit (circa 4 GB) gira in modo molto più fluido, con una qualità di risposta ancora pienamente utilizzabile per la maggior parte dei compiti.

**Esempio 2 — RAG su materiale scolastico**
Una scuola vuole un assistente AI capace di rispondere a domande sul proprio regolamento d'istituto, aggiornato ogni anno. Un LLM generico non conosce quel documento specifico; un sistema RAG che indicizza il regolamento (ingestione, chunking, embedding) permette al modello di rispondere basandosi sul testo reale e aggiornato, invece di "inventare" risposte plausibili ma potenzialmente sbagliate.

**Esempio 3 — Chunking mal progettato**
Un manuale tecnico diviso in chunk da 100 caratteri senza overlap rischia di spezzare una singola istruzione procedurale a metà, rendendo quel chunk incomprensibile se recuperato isolatamente — un problema che un chunk più ampio (es. 500-800 caratteri) con overlap ridurrebbe sensibilmente.

**Esempio 4 — Ollama per prototipazione rapida**
Uno sviluppatore vuole testare rapidamente diverse idee di prompt senza costi API: eseguendo un modello open-weight in locale con Ollama può sperimentare illimitatamente, pagando solo in tempo di calcolo del proprio computer, prima di eventualmente passare a un modello più potente via API per la versione finale del progetto.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** eseguire un LLM in locale con Ollama e costruire un sistema RAG minimo ma funzionante su documenti reali.

**Parte 1 — Esecuzione locale (20-30 minuti):**
1. Installa Ollama seguendo la guida per il tuo sistema operativo (materiale scaricabile).
2. Scarica ed esegui un modello leggero: `ollama run llama3.2` (o un modello ancora più compatto se il tuo hardware è limitato).
3. Interroga il modello sia da terminale che tramite l'API REST in Python (vedi 4.3), confrontando i tempi di risposta.

**Parte 2 — RAG completo (60-90 minuti):**
1. Installa le librerie necessarie: `pip install langchain sentence-transformers faiss-cpu`, aggiornando `requirements.txt`.
2. Prepara 2-3 documenti di testo a tua scelta (es. i moduli di questo Master, dispense di classe, un manuale).
3. Implementa il flusso completo: caricamento → chunking → embedding → indicizzazione FAISS.
4. Scrivi una funzione `rispondi(domanda)` che: trasforma la domanda in embedding, recupera i 3 chunk più rilevanti, costruisce un prompt che include quei chunk, e lo invia al modello locale (via Ollama) per generare la risposta finale.
5. Testa il sistema con almeno 5 domande diverse sui tuoi documenti, verificando che le risposte siano effettivamente basate sui chunk recuperati.

**Verifica:** per almeno una domanda, stampa esplicitamente i chunk recuperati insieme alla risposta finale, per verificare la coerenza tra ciò che il sistema ha "trovato" e ciò che ha effettivamente risposto.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Scegli il livello di quantizzazione in base al compromesso qualità/hardware disponibile: parti da Q4 e sali solo se necessario.
- ✅ Testa sempre più dimensioni e strategie di chunking sullo stesso documento: non esiste una configurazione universale valida per ogni tipo di testo.
- ✅ Usa sempre un **overlap** tra chunk consecutivi per ridurre il rischio di spezzare informazioni rilevanti.
- ✅ Verifica sempre quali chunk vengono effettivamente recuperati da un sistema RAG, non fidarti solo della risposta finale: è il modo più efficace per fare debug quando le risposte sono imprecise.
- ✅ Per applicazioni con più utenti simultanei, valuta strumenti pensati per la produzione (vLLM) invece di Ollama, pensato principalmente per uso singolo/locale.
- ✅ Documenta sempre la fonte dei chunk recuperati nella risposta finale (citazione della sezione/documento), per rendere il sistema RAG verificabile dall'utente.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Scegliere un modello troppo grande per l'hardware disponibile**, causando esecuzione estremamente lenta o blocchi del sistema: verifica sempre i requisiti minimi prima di scaricare un modello.
- ❌ **Confondere RAG con il fine-tuning**: il RAG fornisce contesto esterno al momento della domanda, senza modificare i pesi del modello; il fine-tuning (non trattato in dettaglio in questo modulo) modifica effettivamente il modello con nuovo addestramento — sono tecniche complementari, non equivalenti.
- ❌ **Usare chunk troppo grandi "per sicurezza"**, riempiendo il prompt di testo poco rilevante e superando inutilmente la context window disponibile.
- ❌ **Non normalizzare o pulire il testo dei documenti prima del chunking** (formattazione, intestazioni ripetute, numeri di pagina), introducendo rumore che peggiora la qualità del retrieval.
- ❌ **Aspettarsi che il RAG "corregga" un LLM che allucina sempre**: il RAG riduce le allucinazioni fornendo contesto verificabile, ma non le elimina del tutto — il modello può comunque ignorare o interpretare male i chunk forniti.
- ❌ **Ignorare la licenza dei modelli open-weight**: non tutte le licenze permettono lo stesso tipo di uso (didattico, commerciale, di ricerca) — verificarla sempre prima dell'adozione in un progetto reale.

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai acquisito competenze pratiche di ingegneria degli LLM: la **quantizzazione** e il formato **GGUF** per rendere eseguibili modelli di grandi dimensioni su hardware comune, gli strumenti **Ollama**, **llama.cpp** e **vLLM** per l'esecuzione locale e in produzione, e le strategie di ottimizzazione di **GPU/VRAM** e **context window**. Nella seconda parte hai costruito, passo dopo passo, un'architettura **RAG** completa: ingestione, **chunking**, **embedding**, indicizzazione in un **vector database** e **retrieval**, fino alla generazione di risposte basate su documenti reali.

Queste competenze ti preparano direttamente al **Modulo 11 (AI Agents)**, dove il RAG diventerà uno degli strumenti a disposizione di agenti autonomi capaci di pianificare, agire e recuperare informazioni in modo indipendente.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **Quantizzazione** | Riduzione della precisione numerica dei pesi di un modello per diminuirne i requisiti di memoria e calcolo |
| **GGUF** | Formato di file per l'esecuzione efficiente di LLM quantizzati su hardware consumer |
| **Ollama** | Strumento per scaricare, gestire ed eseguire modelli LLM in locale in modo semplificato |
| **llama.cpp** | Motore di inferenza C++ ad alte prestazioni per modelli LLM, alla base tecnica di Ollama |
| **vLLM** | Motore di inferenza ottimizzato per il serving in produzione di LLM con più utenti simultanei |
| **VRAM** | Memoria della scheda grafica (GPU), dove risiedono idealmente i pesi del modello durante l'inferenza |
| **RAG (Retrieval-Augmented Generation)** | Architettura che collega un LLM a una base di conoscenza esterna aggiornabile |
| **Chunk** | Frammento di testo di dimensione gestibile, unità base dell'indicizzazione in un sistema RAG |
| **Chunking** | Processo di suddivisione di un documento in chunk |
| **Overlap** | Sovrapposizione parziale tra chunk consecutivi, per preservare il contesto ai confini |
| **Vector Database** | Struttura dati ottimizzata per la ricerca per similarità semantica tra vettori di embedding |
| **Retrieval** | Fase in cui vengono recuperati i chunk più rilevanti rispetto a una domanda |
| **Fine-tuning** | Tecnica che modifica i pesi di un modello tramite ulteriore addestramento, distinta dal RAG |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. A cosa serve la quantizzazione di un modello LLM?**
- A) Ad aumentare il numero di parametri del modello
- B) A ridurre la precisione numerica dei pesi, diminuendo i requisiti di memoria e calcolo ✅
- C) A tradurre il modello in un altro linguaggio di programmazione
- D) A eliminare completamente la necessità di una GPU

**2. Cos'è il formato GGUF?**
- A) Un protocollo di comunicazione tra agenti AI
- B) Un formato di file per l'esecuzione efficiente di LLM quantizzati su hardware consumer ✅
- C) Un tipo di funzione di attivazione
- D) Un algoritmo di ottimizzazione per il Gradient Descent

**3. Quale strumento è generalmente il più adatto per il serving in produzione di un LLM con molti utenti simultanei?**
- A) Ollama
- B) vLLM ✅
- C) Un semplice script Python senza librerie dedicate
- D) Un vector database

**4. Cosa permette di fare un'architettura RAG?**
- A) Riaddestrare completamente un modello da zero
- B) Collegare un LLM a una base di conoscenza esterna e aggiornabile, senza modificarne i pesi ✅
- C) Aumentare automaticamente la velocità di generazione del testo
- D) Convertire un modello Encoder in un modello Decoder

**5. Qual è la differenza principale tra RAG e fine-tuning?**
- A) Sono esattamente la stessa tecnica con nomi diversi
- B) Il RAG fornisce contesto esterno al momento della domanda senza modificare il modello, il fine-tuning modifica effettivamente i pesi tramite nuovo addestramento ✅
- C) Il fine-tuning si può fare solo con modelli open-weight
- D) Il RAG richiede sempre una GPU dedicata, il fine-tuning no

**6. Perché è utile un overlap tra chunk consecutivi nel chunking di un documento?**
- A) Per ridurre lo spazio occupato dal vector database
- B) Per evitare che informazioni rilevanti vengano spezzate esattamente al confine tra due chunk ✅
- C) Per velocizzare il calcolo degli embedding
- D) Per eliminare la necessità della fase di retrieval

**7. Cosa fa la fase di "retrieval" in un sistema RAG?**
- A) Genera la risposta finale in linguaggio naturale
- B) Recupera i chunk più simili semanticamente alla domanda dell'utente dal vector database ✅
- C) Quantizza il modello per ridurne i requisiti di memoria
- D) Suddivide il documento originale in frammenti

**8. Cosa NON garantisce, da solo, un sistema RAG?**
- A) L'accesso a informazioni non presenti nei dati di addestramento del modello
- B) L'eliminazione totale del rischio di allucinazioni del modello ✅
- C) La possibilità di aggiornare la base di conoscenza senza riaddestrare il modello
- D) Un contesto specifico su cui basare la risposta

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo

**Consegna:** Estendi il laboratorio del punto 6 in un sistema RAG completo e documentato, strutturato come progetto Python:

1. Organizza il progetto in più file: `ingestion.py` (caricamento e chunking), `vectorstore.py` (embedding e indicizzazione FAISS), `rag.py` (retrieval e generazione), `main.py` (interfaccia da riga di comando).
2. Applica i principi OOP del Modulo 4: crea una classe `SistemaRAG` che incapsula l'intero flusso (ingestione, indicizzazione, interrogazione).
3. Usa almeno 3 documenti reali del tuo contesto (dispense, appunti, materiale scolastico o lavorativo).
4. Sperimenta con **almeno due configurazioni diverse di chunking** (dimensione e overlap) sullo stesso set di documenti, confrontando la qualità delle risposte ottenute.
5. Documenta, in un file `README.md`, l'architettura del sistema, le scelte di configurazione fatte e almeno 3 esempi di domanda/risposta con i relativi chunk recuperati.

Questo sistema RAG sarà uno dei componenti riutilizzabili nel Modulo 11, dove diventerà uno degli "strumenti" a disposizione di un AI Agent completo.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `guida_installazione_ollama.md` — Guida all'installazione di Ollama su Windows/macOS/Linux, con requisiti hardware indicativi
- 📄 `sistema_rag_soluzione.py` — Soluzione commentata del Project Work, con classe `SistemaRAG`
- 📄 `cheatsheet_ollama_comandi.md` — Riassunto dei comandi Ollama più usati
- 📄 `guida_scelta_quantizzazione.md` — Tabella di riferimento per scegliere il livello di quantizzazione in base all'hardware disponibile

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Lewis, P. et al. — *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, NeurIPS (il paper originale del RAG)
- Dettmers, T. et al. — *QLoRA: Efficient Finetuning of Quantized LLMs*
- Johnson, J., Douze, M., Jégou, H. — *Billion-scale similarity search with GPUs* (paper alla base di FAISS)
- Gerganov, G. — Documentazione tecnica del progetto llama.cpp (repository ufficiale GitHub)

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Ollama: ollama.com
- Repository ufficiale llama.cpp: github.com/ggerganov/llama.cpp
- Documentazione ufficiale vLLM: docs.vllm.ai
- Documentazione ufficiale FAISS: github.com/facebookresearch/faiss
- LangChain — Documentazione su text splitting e RAG: python.langchain.com/docs

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Prosegui con il prossimo modulo!]**
