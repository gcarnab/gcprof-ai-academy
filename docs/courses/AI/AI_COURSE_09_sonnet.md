<a id="top"></a>

# 📘 Modulo 9: Transformer
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

Nel 2017, un gruppo di ricercatori Google pubblicò un paper dal titolo, con il senno di poi, quasi profetico: *"Attention Is All You Need"*. Proponeva un'architettura di rete neurale — il **Transformer** — che abbandonava completamente la ricorrenza delle RNN viste nel Modulo 8, sostituendola con un meccanismo chiamato **self-attention**. Quella scelta, apparentemente tecnica, ha reso possibile addestrare modelli linguistici su scale mai viste prima, ed è alla base diretta di ChatGPT, Claude, Gemini, Llama e praticamente ogni LLM moderno.

Questo modulo — il più corposo del Master, con oltre 150 pagine di materiale dedicato — ti porterà a comprendere **esattamente** cosa succede "dentro" un LLM quando genera una risposta: come un testo viene spezzato in **token**, trasformato in vettori numerici (**embedding**), come il modello sa "dove" si trova ogni parola nella frase (**positional encoding**), e soprattutto come funziona il meccanismo di **attenzione** che permette al modello di capire quali parole di una frase sono rilevanti per interpretarne altre — anche a grande distanza tra loro.

Non è un capitolo puramente teorico: capire l'architettura Transformer ti renderà un utilizzatore e uno sviluppatore di sistemi AI molto più consapevole, capace di comprendere perché certi prompt funzionano meglio di altri (i moduli 2 e 7 acquisiranno più senso), perché esistono limiti di context window, e come si differenziano tra loro le famiglie di modelli che userai nei moduli successivi.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Spiegare il processo di **tokenizzazione** e perché gli LLM non "leggono" parole ma token.
- ✅ Descrivere cos'è un **embedding** e perché rappresenta il significato di un token in uno spazio vettoriale.
- ✅ Spiegare la funzione del **positional encoding** e perché è necessario in un'architettura priva di ricorrenza.
- ✅ Descrivere il meccanismo di **Self-Attention** e calcolarne intuitivamente il funzionamento (query, key, value).
- ✅ Spiegare il vantaggio della **Multi-Head Attention** rispetto a un singolo meccanismo di attenzione.
- ✅ Distinguere l'architettura **Encoder**, **Decoder** ed **Encoder-Decoder**, e collocarvi modelli reali.
- ✅ Confrontare le famiglie di modelli pillar: **BERT**, **GPT**, **Llama**, **Gemma**, **Mistral**.
- ✅ Sperimentare praticamente con tokenizzazione ed embedding usando librerie Python.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato il **Modulo 8 (Deep Learning)**: in particolare i concetti di rete neurale, funzione di attivazione e il limite delle RNN (vanishing gradient) sono il punto di partenza concettuale di questo modulo.
- Familiarità con vettori e operazioni matriciali di base (il modulo introduce i concetti necessari in modo graduale e intuitivo).
- Ambiente Python funzionante (Moduli 4 e 8).

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Tokenizzazione: da testo a numeri

Un LLM non elabora direttamente lettere o parole: elabora **token**, unità che possono essere parole intere, parti di parola, o singoli caratteri, a seconda dell'algoritmo di tokenizzazione usato. La tecnica più diffusa è il **Byte-Pair Encoding (BPE)** e le sue varianti, che imparano dai dati quali sequenze di caratteri ricorrono più frequentemente, creando un vocabolario efficiente.

```
Testo:    "L'intelligenza artificiale è affascinante"
Token:    ["L'", "intelligen", "za", " artificiale", " è", " affascin", "ante"]
```

Parole comuni diventano spesso un singolo token; parole rare o inventate vengono spezzate in più sotto-unità. Questo spiega, ad esempio, perché gli LLM a volte faticano con compiti come contare le lettere in una parola: non "vedono" le singole lettere, ma i token.

> 💡 Perché questo importa a livello pratico: il costo di utilizzo di molti servizi AI (incluse le API) è calcolato in base al numero di token elaborati, non al numero di parole o caratteri — un concetto che tornerà utile nel Modulo 10 quando parlerai di context window e ottimizzazione.

### 4.2 — Embedding: dare un significato numerico ai token

Ogni token viene convertito in un **vettore di embedding**: una sequenza di centinaia o migliaia di numeri che rappresenta il suo "significato" in uno spazio matematico multidimensionale. Questi vettori vengono appresi durante l'addestramento in modo che **token con significato simile abbiano vettori vicini** in questo spazio.

```python
# Concettualmente (semplificato):
embedding("gatto")  ≈ [0.21, -0.45, 0.88, ...]
embedding("cane")   ≈ [0.19, -0.42, 0.85, ...]   # vicino a "gatto" (entrambi animali domestici)
embedding("banana") ≈ [-0.71, 0.33, -0.12, ...]  # lontano da "gatto" e "cane"
```

Una proprietà celebre (e affascinante) degli embedding è che catturano anche relazioni semantiche tramite operazioni vettoriali: il vettore risultante da `re - uomo + donna` è, negli spazi di embedding ben addestrati, molto vicino al vettore di `regina`.

### 4.3 — Positional Encoding

Le RNN (Modulo 8) elaborano una sequenza un elemento alla volta, quindi "sanno" naturalmente l'ordine delle parole. Il Transformer, invece, elabora **tutti i token contemporaneamente** (in parallelo) — un vantaggio enorme per la velocità di addestramento, ma che fa perdere l'informazione sull'ordine delle parole, fondamentale per il significato di una frase ("il cane morde l'uomo" ≠ "l'uomo morde il cane").

Il **Positional Encoding** risolve il problema aggiungendo a ogni embedding un secondo vettore che codifica **la posizione** del token nella sequenza, tipicamente tramite funzioni matematiche periodiche (seno e coseno a frequenze diverse). In questo modo, il modello riceve sia l'informazione sul "cosa" (l'embedding del token) sia sul "dove" (la sua posizione), pur mantenendo la possibilità di elaborare l'intera sequenza in parallelo.

### 4.4 — Self-Attention: il cuore del Transformer

La **Self-Attention** è il meccanismo che permette a ogni token di "guardare" tutti gli altri token della sequenza e decidere **quanto ciascuno di essi è rilevante** per interpretare correttamente il proprio significato nel contesto.

**Un esempio intuitivo:**
```
"La banca ha aumentato i tassi di interesse."
"Mi sono seduto sulla banca del fiume."
```
La parola "banca" ha lo stesso embedding iniziale in entrambe le frasi, ma un significato completamente diverso. La self-attention permette al modello di "guardare" le parole circostanti ("tassi", "interesse" vs "seduto", "fiume") e aggiornare la rappresentazione di "banca" in modo contestuale — un vantaggio enorme rispetto a un embedding statico e fisso.

**Il meccanismo, in sintesi (Query, Key, Value):**
Per ogni token, il modello calcola tre vettori derivati dall'embedding:
- **Query (Q)**: "cosa sto cercando?"
- **Key (K)**: "cosa posso offrire?"
- **Value (V)**: "quale informazione porto effettivamente, se vengo scelto come rilevante?"

Il modello confronta la Query di ogni token con la Key di tutti gli altri token (tramite un prodotto scalare), ottenendo un **punteggio di attenzione**: quanto ogni token dovrebbe influenzare la rappresentazione del token corrente. Questi punteggi vengono normalizzati (tramite la funzione Softmax vista nel Modulo 8) e usati per calcolare una media pesata dei vettori Value — il risultato è una nuova rappresentazione del token, arricchita dal contesto.

### 4.5 — Multi-Head Attention

Un singolo meccanismo di attenzione cattura un solo "tipo" di relazione tra i token (es. relazioni sintattiche). La **Multi-Head Attention** esegue **più meccanismi di self-attention in parallelo** ("teste" multiple), ciascuno capace di specializzarsi su aspetti diversi del linguaggio: una testa può concentrarsi su relazioni grammaticali (soggetto-verbo), un'altra su relazioni semantiche a lungo raggio, un'altra ancora su riferimenti pronominali ("lui", "questo" → a cosa si riferiscono?). I risultati delle diverse teste vengono poi combinati, offrendo al modello una comprensione del testo molto più ricca e sfaccettata di quanto potrebbe ottenere una singola testa di attenzione.

### 4.6 — Architetture Encoder, Decoder ed Encoder-Decoder

Il Transformer originale era composto da due blocchi: un **Encoder** (che elabora l'intero input e ne produce una rappresentazione contestuale ricca) e un **Decoder** (che genera l'output un token alla volta, basandosi sulla rappresentazione dell'Encoder e sui token già generati). Da questa architettura originaria sono nate tre famiglie:

| Architettura | Funzionamento | Adatta a | Esempio |
|---|---|---|---|
| **Solo Encoder** | Elabora l'intero testo bidirezionalmente (guarda sia a sinistra che a destra di ogni token) | Comprensione del testo: classificazione, analisi del sentiment, ricerca semantica | **BERT** |
| **Solo Decoder** | Genera testo un token alla volta, guardando solo ai token precedenti (autoregressivo) | Generazione di testo: chat, scrittura, completamento | **GPT**, **Llama**, **Gemma**, **Mistral** |
| **Encoder-Decoder** | Combina entrambi i blocchi | Compiti di trasformazione input→output, come la traduzione automatica | **T5**, i modelli di traduzione |

La stragrande maggioranza degli LLM conversazionali moderni (incluso Claude) appartiene alla famiglia **solo-Decoder**, ottimizzata per generare testo in modo fluido e coerente token dopo token.

### 4.7 — Uno sguardo ai modelli pillar

**BERT (Bidirectional Encoder Representations from Transformers)** — Google, 2018. Architettura solo-Encoder, pensata per comprendere il testo piuttosto che generarlo. Ha rivoluzionato compiti come la ricerca (Google lo integra nel proprio motore di ricerca) e la classificazione del testo.

**GPT (Generative Pre-trained Transformer)** — OpenAI. Architettura solo-Decoder, progettata per la generazione di testo. Le versioni successive (GPT-3, GPT-4 e oltre) hanno mostrato come l'aumento della scala (parametri, dati, calcolo) porti a capacità emergenti sorprendenti.

**Llama** — Meta. Famiglia di modelli solo-Decoder rilasciati con pesi apribili (*open-weight*), che hanno permesso alla comunità di ricerca e agli sviluppatori indipendenti di sperimentare ed eseguire LLM in locale — un tema che riprenderai nel Modulo 10 (LLM Engineering).

**Gemma** — Google. Famiglia di modelli open-weight, "fratelli minori" più leggeri della famiglia Gemini, pensati per essere eseguiti anche su hardware con risorse limitate.

**Mistral** — Mistral AI. Famiglia di modelli europei, noti per l'efficienza architetturale (incluse tecniche come il *Mixture of Experts*, che attiva solo una parte dei parametri del modello per ciascun token, riducendo il costo computazionale).

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — Tokenizzazione e parole inventate**
Chiedendo a un LLM di lavorare con una parola inesistente (es. un neologismo tecnico), il modello la spezzerà in più token conosciuti, cercando di "ricostruirne" il significato per composizione — comportamento diverso, e talvolta meno affidabile, rispetto a una parola comune presente per intero nel vocabolario.

**Esempio 2 — Self-attention e ambiguità pronominale**
Nella frase "Il professore ha dato il compito allo studente perché era in ritardo con il programma", la self-attention aiuta il modello a capire (nella maggior parte dei casi) che "era in ritardo" si riferisce al programma didattico, non a una persona — un'inferenza che richiede di collegare parole distanti nella frase.

**Esempio 3 — BERT vs GPT nel mondo reale**
Un motore di ricerca che deve capire l'intento di una query userà tipicamente un'architettura simile a BERT (comprensione); un chatbot che deve generare una risposta articolata userà un'architettura simile a GPT/Llama (generazione).

**Esempio 4 — Perché la context window ha un limite**
Il meccanismo di self-attention confronta ogni token con tutti gli altri: il costo computazionale cresce quindi in modo più che proporzionale rispetto alla lunghezza della sequenza. È uno dei motivi tecnici per cui la "finestra di contesto" di un LLM ha un limite massimo — argomento che approfondirai nel Modulo 10.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** sperimentare concretamente con tokenizzazione ed embedding, per rendere tangibili i concetti teorici del modulo.

**Setup:** installa la libreria `transformers` di Hugging Face: `pip install transformers torch`, aggiornando `requirements.txt`.

**Attività (60-90 minuti, in notebook `.ipynb`):**

1. **Tokenizzazione pratica:**
```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-multilingual-cased")

testo = "L'intelligenza artificiale sta cambiando il mondo."
token = tokenizer.tokenize(testo)
id_token = tokenizer.encode(testo)

print("Token:", token)
print("Numero di token:", len(token))
print("ID numerici:", id_token)
```
Prova con frasi diverse (parole comuni, tecniche, straniere, neologismi) e osserva come cambia la tokenizzazione.

2. **Visualizzare la similarità tra embedding:**
```python
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

modello = SentenceTransformer("all-MiniLM-L6-v2")
frasi = ["Il gatto dorme sul divano", "Un felino riposa sul sofà", "La borsa ha chiuso in ribasso"]

embeddings = modello.encode(frasi)
similarita = cosine_similarity(embeddings)
print(similarita)
```
Osserva come le prime due frasi (semanticamente simili, pur con parole diverse) abbiano una similarità molto più alta rispetto alla terza.

3. **Esplorazione guidata**: usa lo strumento interattivo online "Tensor2Tensor" o "The Illustrated Transformer" (link in sitografia) per visualizzare graficamente i pesi di attenzione su una frase a tua scelta.

**Verifica:** documenta in celle Markdown le osservazioni fatte, in particolare su come la tokenizzazione tratta parole rare o composte, e su cosa rivela la matrice di similarità tra embedding.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Quando scrivi prompt (Moduli 2 e 7), ricorda che il modello ragiona per token, non per parole: questo aiuta a capire meglio i limiti di context window e i costi di utilizzo delle API.
- ✅ Per compiti di ricerca semantica o similarità tra testi, usa modelli specializzati in embedding (come `sentence-transformers`), non modelli generativi: sono ottimizzati per quel compito specifico.
- ✅ Quando scegli un modello per un progetto, valuta l'architettura in base al compito: comprensione/classificazione → modelli tipo Encoder; generazione → modelli tipo Decoder.
- ✅ Approfondisci sempre la "scheda tecnica" (model card) di un modello prima di adottarlo: architettura, numero di parametri, dati di addestramento e licenza sono informazioni cruciali.
- ✅ Usa le risorse visive suggerite in sitografia (The Illustrated Transformer, 3Blue1Brown) per consolidare l'intuizione geometrica dei concetti più astratti, come self-attention e positional encoding.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Pensare che un LLM "legga" lettera per lettera**: elabora token, e questo spiega errori apparentemente strani (es. difficoltà a contare lettere in una parola).
- ❌ **Confondere embedding statici e contestuali**: l'embedding iniziale di un token è fisso, ma grazie alla self-attention la sua rappresentazione **cambia in base al contesto** della frase — è proprio questo il salto qualitativo rispetto alle tecniche pre-Transformer.
- ❌ **Credere che più "teste" di attenzione (Multi-Head) significhino semplicemente "più potenza di calcolo"**: il valore sta nella capacità di catturare **tipi diversi** di relazioni linguistiche in parallelo, non solo nella quantità di calcolo.
- ❌ **Confondere architettura Encoder e Decoder**: un modello come BERT non è pensato per generare testo fluente, un modello come GPT non è ottimizzato per compiti di classificazione bidirezionale.
- ❌ **Sottovalutare il costo computazionale della self-attention** su sequenze molto lunghe: è uno dei motivi tecnici, non arbitrari, dietro i limiti di context window.

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai smontato, pezzo per pezzo, l'architettura che ha reso possibili i moderni LLM: dalla **tokenizzazione** del testo grezzo, agli **embedding** che ne rappresentano il significato in uno spazio vettoriale, al **positional encoding** che preserva l'informazione sull'ordine in un'architettura non ricorrente. Hai poi compreso il meccanismo centrale del Transformer — la **Self-Attention**, potenziata dalla **Multi-Head Attention** — e le tre grandi famiglie architetturali (**Encoder**, **Decoder**, **Encoder-Decoder**), con un confronto concreto tra i modelli pillar del settore: **BERT**, **GPT**, **Llama**, **Gemma**, **Mistral**.

Questa comprensione approfondita ti prepara al prossimo modulo, **LLM Engineering**, dove userai questi stessi concetti per eseguire, ottimizzare e integrare modelli linguistici in applicazioni reali, incluse le architetture RAG.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **Token** | Unità minima di testo elaborata da un LLM (parola, sotto-parola o carattere) |
| **Tokenizzazione** | Processo di scomposizione del testo in token |
| **Embedding** | Rappresentazione numerica (vettoriale) del significato di un token |
| **Positional Encoding** | Informazione aggiunta agli embedding per codificare la posizione di un token nella sequenza |
| **Self-Attention** | Meccanismo che permette a ogni token di "pesare" la rilevanza di tutti gli altri token della sequenza |
| **Query, Key, Value (Q, K, V)** | I tre vettori derivati da ogni token, usati per calcolare l'attenzione |
| **Multi-Head Attention** | Esecuzione parallela di più meccanismi di self-attention, ciascuno specializzato su aspetti diversi |
| **Encoder** | Blocco del Transformer che elabora l'intero input in modo bidirezionale |
| **Decoder** | Blocco del Transformer che genera l'output in modo autoregressivo (un token alla volta) |
| **Modello autoregressivo** | Modello che genera l'output un elemento alla volta, basandosi sugli elementi già generati |
| **Context window** | Numero massimo di token che un modello può elaborare in un'unica interazione |
| **Model card** | Documento tecnico che descrive architettura, dati e licenza di un modello |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. Cosa elabora effettivamente un LLM, a livello tecnico, quando riceve un testo?**
- A) Lettere singole, una alla volta
- B) Token, unità che possono essere parole intere o parti di parola ✅
- C) Interi paragrafi come blocco unico e indivisibile
- D) Solo suoni fonetici

**2. Cos'è un embedding?**
- A) Un algoritmo di compressione dei file di testo
- B) Una rappresentazione numerica vettoriale del significato di un token ✅
- C) Un tipo di funzione di attivazione
- D) Il nome di un ottimizzatore usato nel Deep Learning

**3. Perché è necessario il Positional Encoding in un Transformer?**
- A) Perché il Transformer elabora i token in parallelo e non conosce naturalmente il loro ordine, a differenza di una RNN ✅
- B) Perché altrimenti il modello non potrebbe calcolare la funzione di perdita
- C) Perché serve a comprimere il testo prima della tokenizzazione
- D) Perché è richiesto solo nei modelli di tipo Encoder

**4. Cosa permette di fare il meccanismo di Self-Attention?**
- A) Ridurre il numero di parametri del modello
- B) Permettere a ogni token di "pesare" quanto ogni altro token della sequenza è rilevante per interpretarlo correttamente ✅
- C) Convertire il testo in immagini
- D) Eliminare automaticamente gli errori grammaticali

**5. Qual è il vantaggio della Multi-Head Attention rispetto a una singola attenzione?**
- A) Riduce drasticamente il numero di token da elaborare
- B) Permette di catturare in parallelo diversi tipi di relazioni linguistiche tra i token ✅
- C) Elimina la necessità del Positional Encoding
- D) Rende il modello di tipo solo-Encoder

**6. A quale famiglia architetturale appartiene un modello come BERT?**
- A) Solo Decoder
- B) Solo Encoder ✅
- C) Encoder-Decoder
- D) Nessuna delle precedenti, è un modello non basato su Transformer

**7. A quale famiglia architetturale appartengono modelli come GPT, Llama, Gemma e Mistral?**
- A) Solo Encoder
- B) Solo Decoder (autoregressivi) ✅
- C) Encoder-Decoder
- D) Reti convoluzionali

**8. Perché la self-attention comporta un costo computazionale che cresce rapidamente con la lunghezza della sequenza?**
- A) Perché ogni token viene confrontato con tutti gli altri token della sequenza ✅
- B) Perché ogni token richiede una nuova funzione di attivazione
- C) Perché il positional encoding raddoppia il numero di parametri
- D) Perché la tokenizzazione diventa più lenta con testi lunghi

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo

**Consegna:** Costruisci un notebook `esplorazione_transformer.ipynb` che documenti, con esempi concreti, il funzionamento dei concetti chiave del modulo:

1. Confronta la tokenizzazione di almeno 3 frasi diverse (una con parole comuni, una tecnica/specialistica, una con un neologismo o termine straniero), commentando le differenze osservate.
2. Calcola la similarità semantica (cosine similarity) tra almeno 5 coppie di frasi, includendo sia coppie semanticamente simili con parole diverse, sia coppie con parole simili ma significato diverso (come l'esempio "banca" delle lezioni). Commenta i risultati.
3. Scrivi una sintesi (almeno 15 righe) che spieghi, con parole tue e senza formule, come un Transformer "legge" e comprende una frase, dalla tokenizzazione fino alla self-attention.
4. Scegli due modelli pillar (tra BERT, GPT, Llama, Gemma, Mistral) e confrontane architettura, uso tipico e licenza, consultando le rispettive model card ufficiali.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `esplorazione_transformer_soluzione.ipynb` — Notebook soluzione commentato del laboratorio
- 📄 `cheatsheet_architetture_transformer.md` — Tabella riassuntiva Encoder/Decoder/Encoder-Decoder con modelli di riferimento
- 📄 `confronto_modelli_pillar.md` — Scheda comparativa BERT, GPT, Llama, Gemma, Mistral
- 📊 `diagrammi_self_attention.pdf` — Diagrammi esplicativi del meccanismo di attenzione passo-passo

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Vaswani, A. et al. — *Attention Is All You Need*, NeurIPS 2017 (il paper originale del Transformer)
- Devlin, J. et al. — *BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding*, NAACL
- Radford, A. et al. — *Improving Language Understanding by Generative Pre-Training* (GPT), OpenAI
- Touvron, H. et al. — *LLaMA: Open and Efficient Foundation Language Models*, Meta AI

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- The Illustrated Transformer (spiegazione visiva di riferimento): jalammar.github.io/illustrated-transformer
- Hugging Face — Documentazione libreria Transformers: huggingface.co/docs/transformers
- 3Blue1Brown — serie video su attention e Transformer: 3blue1brown.com
- Hugging Face Model Hub (model card dei modelli pillar): huggingface.co/models

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Prosegui con il prossimo modulo!]**

