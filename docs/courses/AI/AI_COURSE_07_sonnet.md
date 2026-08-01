<a id="top"></a>

# 📘 Modulo 7: Prompt Engineering Avanzato
**Livello Intermedio (parte 1) — Master in Intelligenza Artificiale | GCProf Academy**

· 🕒 Tempo stimato: 8-10 ore · 🎯 Difficoltà: Intermedio-Avanzato

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

Nel Modulo 2 hai imparato le basi del prompt engineering: zero/one/few-shot, delimitatori, template riutilizzabili. Quelle tecniche funzionano bene per compiti diretti — riassumere, tradurre, classificare un testo. Ma cosa succede quando il problema richiede **ragionamento in più passaggi**, o quando vuoi che il modello **usi strumenti esterni** invece di rispondere solo con testo?

È qui che entra il Prompt Engineering Avanzato. In questo modulo affronterai le tecniche che permettono agli LLM di affrontare problemi complessi in modo più affidabile — **Chain of Thought**, **Tree of Thought**, **ReAct**, **Self-Consistency**, **Reflection**, **Prompt Chaining** — e le tecniche che trasformano un LLM da "generatore di testo" a **componente di un sistema software**: **Structured Output**, **Function Calling**, il protocollo **MCP** e il **Tool Calling**.

Non è un caso che questo modulo chiuda il Livello Intermedio, subito prima del Livello Avanzato dedicato a Deep Learning, LLM Engineering e AI Agent: le tecniche che imparerai qui sono il ponte concettuale tra "sapere usare bene un chatbot" e "costruire sistemi AI agentici", l'obiettivo finale del Master.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Applicare la tecnica **Chain of Thought (CoT)** per migliorare l'accuratezza del modello su problemi che richiedono ragionamento.
- ✅ Distinguere Chain of Thought da **Tree of Thought (ToT)** e sapere quando l'esplorazione di più percorsi di ragionamento è utile.
- ✅ Comprendere il pattern **ReAct** (Reasoning + Acting) e la sua importanza per gli AI Agent.
- ✅ Applicare **Self-Consistency** e **Reflection** per aumentare l'affidabilità delle risposte.
- ✅ Costruire un **Prompt Chaining**: una sequenza di prompt collegati, dove l'output di uno diventa l'input del successivo.
- ✅ Generare **output strutturato** (JSON Mode) da un LLM, per integrarlo in un'applicazione software.
- ✅ Comprendere il funzionamento del **Function Calling** e del **Tool Calling**.
- ✅ Descrivere cos'è il protocollo **MCP (Model Context Protocol)** e perché sta diventando uno standard per collegare gli LLM a strumenti esterni.
- ✅ Progettare un **Agentic Prompt** di base, propedeutico al Modulo 11 (AI Agents).

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato **Modulo 2 (Prompt Engineering — Fondamenti)**: questo modulo presuppone familiarità con zero/few-shot prompting, delimitatori e template.
- Aver completato **Modulo 4 (Python per AI)**: alcuni esempi di questo modulo usano chiamate API in Python per mostrare Function Calling e JSON Mode in pratica.
- Un account API di un provider LLM (es. Anthropic, OpenAI, o un provider gratuito come Groq) per gli esercizi pratici — le istruzioni di configurazione sono nel materiale scaricabile.

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Chain of Thought (CoT)

Gli LLM, se interrogati direttamente su problemi complessi (calcoli, ragionamenti logici a più passaggi), tendono a sbagliare più spesso di quanto ci si aspetterebbe. La tecnica **Chain of Thought** consiste nell'istruire il modello a **ragionare esplicitamente passo dopo passo** prima di dare la risposta finale, invece di "sparare" direttamente una conclusione.

```
Prompt senza CoT:
"Se un negozio vende 3 magliette a 15€ l'una con uno sconto del 20%
sul totale, quanto paga il cliente?"

Prompt con CoT:
"Se un negozio vende 3 magliette a 15€ l'una con uno sconto del 20%
sul totale, quanto paga il cliente?
Ragiona passo dopo passo prima di dare la risposta finale."
```

Aggiungere semplicemente "ragiona passo dopo passo" (o fornire un esempio di ragionamento nel few-shot) migliora sensibilmente l'accuratezza su problemi matematici, logici e multi-step, perché costringe il modello a "mostrare il lavoro" invece di indovinare la risposta finale in un solo passaggio.

### 4.2 — Tree of Thought (ToT)

Il Chain of Thought segue **un solo percorso di ragionamento**. Il **Tree of Thought** estende l'idea facendo esplorare al modello **più percorsi alternativi** in parallelo, valutandoli e scegliendo (o combinando) il migliore — un po' come un giocatore di scacchi che valuta diverse mosse possibili prima di decidere.

```
"Devi risolvere questo problema di pianificazione oraria.
Genera 3 possibili soluzioni diverse, ciascuna con un ragionamento
separato. Poi valuta i pro e i contro di ciascuna soluzione,
e scegli quella più efficiente motivando la scelta."
```

ToT è più costoso (richiede più "pensiero" e spesso più chiamate al modello) ma è utile per problemi con più soluzioni plausibili, dove la prima idea generata non è necessariamente la migliore.

### 4.3 — ReAct: Reasoning + Acting

**ReAct** è il pattern alla base della maggior parte degli AI Agent moderni (che approfondirai nel Modulo 11). Alterna esplicitamente due fasi:
- **Reasoning (Pensiero)**: il modello ragiona su cosa fare.
- **Acting (Azione)**: il modello esegue un'azione concreta (es. una ricerca, una chiamata a uno strumento), osserva il risultato, e ricomincia il ciclo.

```
Pensiero: Per rispondere devo sapere il meteo di oggi a Milano, che non conosco.
Azione: cerca_meteo("Milano")
Osservazione: 22°C, soleggiato
Pensiero: Ora ho l'informazione necessaria per rispondere.
Risposta finale: Oggi a Milano ci sono 22°C e cielo sereno.
```

Questo ciclo Pensiero → Azione → Osservazione, ripetuto quante volte necessario, è esattamente il meccanismo che rende un LLM capace di usare strumenti esterni in modo autonomo, invece di rispondere solo sulla base della propria conoscenza pregressa.

### 4.4 — Self-Consistency e Reflection

**Self-Consistency**: invece di generare una sola risposta con Chain of Thought, si genera **più volte** la stessa catena di ragionamento (con un minimo di casualità) e si sceglie la risposta più frequente tra quelle ottenute — un principio simile al "voto di maggioranza": se il modello arriva alla stessa conclusione seguendo percorsi di ragionamento diversi, la risposta è probabilmente più affidabile.

**Reflection**: si chiede esplicitamente al modello di **rivedere criticamente la propria risposta** prima di considerarla definitiva.

```
"Scrivi una soluzione al problema. Poi, in una sezione separata,
rivedi criticamente la tua soluzione: ci sono errori, casi limite
non considerati o assunzioni sbagliate? Se sì, correggi la soluzione
finale."
```

La Reflection è particolarmente efficace per compiti di scrittura, codice e ragionamento logico, dove un "secondo passaggio" critico riduce sensibilmente errori ed omissioni.

### 4.5 — Prompt Chaining

Il **Prompt Chaining** consiste nello scomporre un compito complesso in **una sequenza di prompt più semplici**, dove l'output di un prompt diventa l'input del successivo — invece di affidare tutto a un unico prompt monolitico.

```
Prompt 1: "Estrai i punti chiave da questo testo: [testo lungo]"
   ↓ (output usato come input)
Prompt 2: "Trasforma questi punti chiave in una scaletta per una
           presentazione di 5 slide: [punti chiave da Prompt 1]"
   ↓ (output usato come input)
Prompt 3: "Per ciascun punto della scaletta, scrivi 2 frasi di
           approfondimento: [scaletta da Prompt 2]"
```

Questo approccio ha diversi vantaggi: ogni singolo passaggio è più semplice e affidabile, è più facile individuare *dove* un errore si è introdotto, e ogni fase intermedia può essere ispezionata o corretta prima di proseguire.

### 4.6 — Structured Output (JSON Mode)

Quando un LLM deve alimentare un'applicazione software (non un essere umano che legge testo), serve un output in un **formato strutturato e prevedibile**, tipicamente JSON.

```
"Estrai dal seguente testo nome, email e ruolo della persona
menzionata. Rispondi SOLO con un oggetto JSON valido, nel formato:
{"nome": "", "email": "", "ruolo": ""}
Non aggiungere testo prima o dopo il JSON.

Testo: Il progetto è seguito da Maria Rossi (maria.rossi@example.com),
responsabile del reparto AI."
```

Molti provider LLM (incluso Claude tramite l'API Anthropic) offrono anche una modalità nativa per **forzare** l'output in un formato JSON valido secondo uno schema definito, riducendo il rischio che il modello aggiunga testo extra o produca JSON malformato — un tema che approfondirai anche negli esempi pratici del laboratorio di questo modulo.

### 4.7 — Function Calling e Tool Calling

Il **Function Calling** (o Tool Calling) permette a un LLM di **richiedere l'esecuzione di una funzione esterna** invece di provare a rispondere da solo. Il flusso tipico è:

1. Definisci al modello quali funzioni sono disponibili, con nome, descrizione e parametri (es. `cerca_meteo(città: str)`).
2. L'utente fa una domanda (es. "che tempo fa a Roma?").
3. Il modello, invece di "indovinare" una risposta, restituisce una richiesta strutturata: *"vorrei chiamare `cerca_meteo(città="Roma")`"*.
4. Il tuo codice esegue realmente quella funzione e restituisce il risultato al modello.
5. Il modello usa il risultato per formulare la risposta finale in linguaggio naturale.

Questo meccanismo è ciò che permette a un LLM di **agire nel mondo reale** — cercare informazioni aggiornate, eseguire calcoli precisi, interagire con database o API — superando il limite della sola conoscenza "congelata" al momento dell'addestramento.

### 4.8 — Il protocollo MCP (Model Context Protocol)

Man mano che gli LLM vengono collegati a sempre più strumenti esterni (calendari, database, servizi cloud, applicazioni aziendali), è emersa l'esigenza di uno **standard comune** per descrivere ed esporre questi strumenti, invece di implementare un'integrazione diversa per ogni combinazione di modello e servizio.

Il **Model Context Protocol (MCP)** è un protocollo aperto pensato esattamente per questo: definisce un modo standardizzato con cui un'applicazione ("server MCP") espone strumenti, dati o risorse, e con cui un modello AI ("client MCP") può scoprirli e utilizzarli — un po' come una "presa universale" tra LLM e strumenti esterni, indipendente dal provider del modello. Lo ritroverai in modo pratico nel Modulo 11 (AI Agents), dove costruirai un agente in grado di usare strumenti reali tramite questo protocollo.

### 4.9 — Agentic Prompting

L'**Agentic Prompting** è l'insieme di tecniche di prompt design pensate specificamente per sistemi che devono **pianificare, agire e correggersi autonomamente** su compiti composti da più passaggi, combinando molte delle tecniche viste in questo modulo:

- Un ciclo **ReAct** per alternare ragionamento e azione.
- **Reflection** per autovalutare i risultati intermedi.
- **Structured Output** per comunicare in modo affidabile con gli strumenti esterni.
- Istruzioni esplicite su **quando fermarsi** (condizione di terminazione), per evitare che l'agente continui a "pensare" o "agire" indefinitamente.

```
"Sei un assistente che pianifica un viaggio. Hai a disposizione gli
strumenti: cerca_voli(), cerca_hotel(), calcola_budget().
Procedi in questo modo: (1) ragiona su quali informazioni ti servono,
(2) usa uno strumento alla volta, (3) dopo ogni risultato valuta se
hai già abbastanza informazioni per rispondere, (4) fermati e dai la
risposta finale solo quando il budget totale è stato calcolato."
```

Questo è solo un assaggio: il Modulo 11 dedicherà un intero percorso alla progettazione di AI Agent completi.

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — CoT in ambito scolastico**
Un docente che chiede a un LLM di correggere un problema di matematica ottiene risultati molto più affidabili chiedendo esplicitamente "risolvi passo dopo passo, mostrando ogni calcolo" piuttosto che "dammi solo il risultato".

**Esempio 2 — ReAct in un assistente aziendale**
Un assistente AI aziendale a cui viene chiesto "qual è lo stato dell'ordine #4521?" non può rispondere dalla sola conoscenza pregressa: deve *agire* (interrogare il database ordini tramite una funzione), *osservare* il risultato, e solo allora rispondere.

**Esempio 3 — Structured Output per l'automazione**
Un'azienda usa un LLM per leggere centinaia di email in entrata e classificarle automaticamente. Solo un output JSON rigoroso (`{"categoria": "reclamo", "urgenza": "alta"}`) può essere elaborato automaticamente da un sistema a valle; una risposta discorsiva richiederebbe un ulteriore passaggio di interpretazione umana o software.

**Esempio 4 — Prompt Chaining per contenuti didattici**
Per generare un intero modulo del Master (come quelli che stai leggendo in questo corso), un approccio efficace è a catena: un primo prompt genera la struttura degli argomenti, un secondo sviluppa ciascuna lezione, un terzo genera esempi e quiz coerenti con il contenuto già prodotto — invece di chiedere tutto in un unico prompt monolitico.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** applicare in pratica CoT, Structured Output e Function Calling tramite chiamate API in Python.

**Setup:** riutilizza l'ambiente virtuale del Modulo 4; installa il SDK del provider LLM scelto (es. `pip install anthropic` oppure `pip install groq`), seguendo la guida di configurazione nel materiale scaricabile.

**Attività (60-90 minuti):**

1. **Chain of Thought**: scrivi uno script Python che invia allo stesso modello due versioni dello stesso problema logico (senza e con istruzione CoT) e confronta le risposte ottenute.
2. **Structured Output**: scrivi un prompt che istruisce il modello a restituire **solo** un JSON valido (es. estrazione di dati da un testo), poi in Python effettua il parsing (`json.loads()`) e gestisci il caso in cui il modello non rispetti perfettamente il formato richiesto.
3. **Function Calling simulato**: definisci in Python due funzioni finte (es. `cerca_meteo(città)` e `converti_valuta(importo, da, a)`), descrivile al modello in un prompt strutturato, e verifica che il modello richieda correttamente la funzione giusta con i parametri corretti in base alla domanda dell'utente.
4. **Prompt Chaining**: costruisci una catena di almeno 2 prompt collegati (l'output del primo diventa parte del prompt del secondo) per un compito a tua scelta (es. riassunto → domande di verifica).

**Verifica:** documenta in un breve report (anche in celle Markdown di un notebook) le differenze osservate tra le risposte con e senza le tecniche applicate.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Usa Chain of Thought quando il compito richiede calcoli o ragionamento a più passaggi; evitalo per compiti semplici, dove aggiunge solo lunghezza inutile.
- ✅ Specifica **sempre** il formato esatto atteso quando chiedi output strutturato, incluso un esempio dello schema JSON.
- ✅ In un sistema con Function Calling, valida sempre lato codice i parametri ricevuti dal modello prima di eseguire la funzione reale: non fidarti ciecamente dell'input generato dall'AI.
- ✅ Nei sistemi agentici, definisci sempre una condizione di terminazione esplicita, per evitare cicli di ragionamento/azione senza fine.
- ✅ Usa il Prompt Chaining per compiti complessi: è più facile da debuggare di un unico prompt monolitico.
- ✅ Usa Self-Consistency o Reflection per compiti ad alto rischio di errore (calcoli critici, decisioni importanti), accettando il costo computazionale aggiuntivo.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Chiedere Chain of Thought su compiti banali**, allungando inutilmente risposta e costo computazionale senza benefici reali.
- ❌ **Fidarsi ciecamente di un output JSON senza validarlo**: anche con istruzioni chiare, un LLM può occasionalmente produrre JSON malformato o incompleto.
- ❌ **Eseguire una funzione richiesta dal modello senza controllarne i parametri**: un LLM può generare parametri plausibili ma sbagliati (es. un ID inventato).
- ❌ **Non impostare un limite al numero di cicli ReAct**, rischiando che l'agente continui a "ragionare" senza mai arrivare a una risposta.
- ❌ **Confondere Prompt Chaining con un semplice prompt più lungo**: il valore della tecnica sta nella possibilità di ispezionare e correggere ogni fase intermedia, non solo nello spezzare il testo.
- ❌ **Ignorare i costi**: tecniche come Tree of Thought e Self-Consistency moltiplicano il numero di chiamate al modello, con impatto diretto su costi e tempi di risposta.

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai ampliato in modo significativo il tuo repertorio di prompt engineering, passando da tecniche "statiche" (Modulo 2) a tecniche capaci di gestire **ragionamento complesso** (Chain of Thought, Tree of Thought, Self-Consistency, Reflection) e **interazione con il mondo esterno** (ReAct, Function Calling, Structured Output, protocollo MCP). Hai anche avuto un primo assaggio di Agentic Prompting, la base concettuale su cui costruirai gli AI Agent nel Modulo 11.

Con questo modulo si chiude ufficialmente il **Livello Intermedio** del Master. Il prossimo passo è il **Livello Avanzato**, che parte dalle fondamenta matematiche e architetturali del Deep Learning per arrivare, moduli dopo modulo, alla costruzione di sistemi AI completi e autonomi.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **Chain of Thought (CoT)** | Tecnica che istruisce il modello a ragionare esplicitamente passo dopo passo prima della risposta finale |
| **Tree of Thought (ToT)** | Estensione del CoT che esplora più percorsi di ragionamento alternativi, valutandoli |
| **ReAct** | Pattern che alterna Reasoning (ragionamento) e Acting (azione), alla base degli AI Agent |
| **Self-Consistency** | Tecnica che genera più risposte con ragionamenti diversi e sceglie quella più frequente |
| **Reflection** | Tecnica in cui il modello rivede criticamente la propria risposta prima di considerarla definitiva |
| **Prompt Chaining** | Scomposizione di un compito complesso in una sequenza di prompt collegati |
| **Structured Output / JSON Mode** | Tecnica per ottenere output in un formato dati prevedibile (tipicamente JSON) |
| **Function Calling / Tool Calling** | Meccanismo che permette a un LLM di richiedere l'esecuzione di funzioni esterne |
| **MCP (Model Context Protocol)** | Protocollo aperto e standardizzato per collegare modelli AI a strumenti e risorse esterne |
| **Agentic Prompting** | Insieme di tecniche di prompt design per sistemi che pianificano, agiscono e si correggono autonomamente |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. A cosa serve la tecnica Chain of Thought?**
- A) A ridurre la lunghezza delle risposte del modello
- B) A istruire il modello a ragionare esplicitamente passo dopo passo prima della risposta finale ✅
- C) A collegare il modello a strumenti esterni
- D) A generare automaticamente codice JSON

**2. Qual è la differenza principale tra Chain of Thought e Tree of Thought?**
- A) Non c'è alcuna differenza, sono sinonimi
- B) Il Tree of Thought esplora più percorsi di ragionamento alternativi, il Chain of Thought ne segue uno solo ✅
- C) Il Chain of Thought funziona solo con immagini
- D) Il Tree of Thought non richiede alcun ragionamento

**3. Cosa alterna il pattern ReAct?**
- A) Domande e risposte casuali
- B) Ragionamento (Reasoning) e Azione (Acting) ✅
- C) Testo e immagini
- D) Training e inferenza del modello

**4. A cosa serve la tecnica di Self-Consistency?**
- A) A generare più risposte con ragionamenti diversi e scegliere quella più frequente, aumentando l'affidabilità ✅
- B) A velocizzare la generazione delle risposte
- C) A ridurre il numero di parametri del modello
- D) A collegare il modello a un database esterno

**5. Cosa permette di fare il Function Calling (Tool Calling)?**
- A) Cambiare il linguaggio di programmazione del modello
- B) Permettere al modello di richiedere l'esecuzione di funzioni esterne per ottenere informazioni o eseguire azioni ✅
- C) Aumentare automaticamente la lunghezza massima del contesto
- D) Addestrare nuovamente il modello su nuovi dati

**6. Perché è importante validare i parametri quando un LLM richiede l'esecuzione di una funzione?**
- A) Non è necessario, il modello genera sempre parametri corretti
- B) Perché il modello può generare parametri plausibili ma errati, e il codice deve verificarli prima di eseguire l'azione reale ✅
- C) Perché altrimenti la funzione non verrebbe mai eseguita
- D) Perché i parametri vengono sempre generati in un formato non testuale

**7. Cos'è il Model Context Protocol (MCP)?**
- A) Un algoritmo di ottimizzazione per l'addestramento dei modelli
- B) Un protocollo aperto e standardizzato per collegare modelli AI a strumenti e risorse esterne ✅
- C) Un formato di file per salvare i pesi di una rete neurale
- D) Una tecnica di data augmentation

**8. Perché nei sistemi agentici è importante definire una condizione di terminazione esplicita?**
- A) Per evitare che l'agente continui a ragionare o agire indefinitamente, senza mai fornire una risposta finale ✅
- B) Perché altrimenti il modello si spegne automaticamente dopo pochi secondi
- C) Perché è richiesto obbligatoriamente dal protocollo MCP
- D) Per ridurre il numero di parametri del modello

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo — Raccolta di Prompt Professionali Avanzati

**Consegna:** Il Livello Intermedio si chiude con l'estensione della Raccolta di Prompt Professionali avviata nel Livello Base (Modulo 2), arricchendola con le tecniche avanzate di questo modulo:

1. Aggiungi alla tua raccolta **almeno 4 nuovi prompt professionali**, uno per ciascuna delle seguenti categorie:
   - Un prompt che applica **Chain of Thought** a un problema reale del tuo ambito (didattico, lavorativo, personale).
   - Un prompt che richiede **Structured Output (JSON)**, con schema definito esplicitamente.
   - Un prompt che descrive un **Function Calling** con almeno due funzioni disponibili, applicato a un caso d'uso concreto.
   - Un **Prompt Chaining** di almeno 2 passaggi collegati, con l'output intermedio documentato.
2. Per ciascun prompt, documenta: obiettivo, tecnica applicata, motivazione della scelta, esempio di output ottenuto.
3. (Facoltativo, per chi vuole sperimentare) Implementa in Python almeno uno dei quattro prompt come script funzionante, riutilizzando l'ambiente e le competenze del Modulo 4.

Questa raccolta arricchita costituisce, insieme al lavoro svolto nei Moduli 4-6, il portfolio completo di competenze del tuo Livello Intermedio.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `guida_setup_api_llm.md` — Guida alla configurazione di una chiave API (Anthropic, OpenAI o Groq) in Python
- 📄 `esempi_cot_tot_react.md` — Raccolta di prompt di esempio per CoT, ToT e ReAct
- 📄 `template_function_calling.py` — Script Python di partenza per il laboratorio sul Function Calling
- 📄 `cheatsheet_tecniche_prompting_avanzato.md` — Tabella riassuntiva di tutte le tecniche del modulo, con quando usarle

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Wei, J. et al. — *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*, NeurIPS
- Yao, S. et al. — *Tree of Thoughts: Deliberate Problem Solving with Large Language Models*, NeurIPS
- Yao, S. et al. — *ReAct: Synergizing Reasoning and Acting in Language Models*, ICLR
- Wang, X. et al. — *Self-Consistency Improves Chain of Thought Reasoning in Language Models*, ICLR

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale prompt engineering Anthropic: docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview
- Prompting Guide (risorsa community aggiornata sulle tecniche di prompting): promptingguide.ai
- Specifica ufficiale del Model Context Protocol: modelcontextprotocol.io
- OpenAI — Guida al Function Calling: platform.openai.com/docs/guides/function-calling

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Hai completato il Livello Intermedio! Prosegui con il Livello Avanzato — Modulo 8: Deep Learning]**
