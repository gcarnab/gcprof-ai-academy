<a id="top"></a>

# 📘 Modulo 11: AI Agents
**Livello Avanzato — Master in Intelligenza Artificiale | GCProf Academy**

· 🕒 Tempo stimato: 12-14 ore · 🎯 Difficoltà: Avanzato

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

Sei arrivato al modulo che dà forma concreta a tutto ciò che hai costruito finora. Nei moduli precedenti hai imparato a far *ragionare* un LLM in modo più efficace (Modulo 7), a farlo *rispondere* basandosi su documenti reali tramite RAG (Modulo 10), e a farlo *eseguire in locale* con pieno controllo (Modulo 10). Un **AI Agent** unisce tutte queste capacità in un unico sistema autonomo: un'entità software che non si limita a rispondere a una domanda, ma **pianifica** una sequenza di passi, **usa strumenti** per interagire con il mondo esterno, **ricorda** il contesto delle proprie azioni precedenti, e **si corregge** quando qualcosa non va come previsto.

È la differenza tra un chatbot che risponde "non posso prenotare voli per te" e un sistema che, effettivamente, cerca voli disponibili, confronta i prezzi, verifica la disponibilità e prepara la prenotazione — chiedendo conferma solo per il passo finale. Il pattern **ReAct** che hai visto nel Modulo 7 (Reasoning + Acting) è il cuore pulsante di ogni agente moderno: qui lo trasformerai da concetto teorico a sistema funzionante.

Questo modulo ti guiderà nella costruzione di un AI Agent completo, integrando **RAG** (Modulo 10), **memoria conversazionale**, **tool use** tramite API esterne, il protocollo **MCP** (introdotto nel Modulo 7), fino ai sistemi **multi-agent**, dove più agenti specializzati collaborano su un compito complesso, coordinati da un meccanismo di **orchestrazione**.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Descrivere l'**architettura di un AI Agent**: percezione, pianificazione, azione, osservazione.
- ✅ Implementare un ciclo di **Planning** che scompone un obiettivo complesso in sotto-task eseguibili.
- ✅ Gestire la **memoria** di un agente, distinguendo memoria a breve termine (conversazionale) e a lungo termine (persistente).
- ✅ Implementare il **Tool Use**: collegare un agente a funzioni Python, API esterne e strumenti reali.
- ✅ Automatizzare interazioni con un browser web (**Browser Automation**) tramite un agente.
- ✅ Integrare strumenti esterni tramite il protocollo **MCP**.
- ✅ Progettare un sistema **Multi-Agent**, con più agenti specializzati coordinati da un **orchestratore**.
- ✅ Costruire un AI Agent completo con **smolagents** o **LangGraph**, che integra RAG, memoria e strumenti esterni.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato **Modulo 7 (Prompt Engineering Avanzato)**: in particolare ReAct, Function Calling e MCP.
- Aver completato **Modulo 10 (LLM Engineering)**: il sistema RAG costruito in quel modulo verrà riutilizzato come uno degli strumenti dell'agente.
- Ambiente Python funzionante con accesso a un'API LLM (cloud o locale via Ollama).

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Architettura di un AI Agent

Un AI Agent è organizzato attorno a un ciclo continuo di quattro fasi, che estende direttamente il pattern ReAct visto nel Modulo 7:

1. **Percezione**: l'agente riceve un obiettivo (dall'utente) e osserva lo stato attuale del proprio ambiente (risultati di azioni precedenti, dati disponibili).
2. **Pianificazione (Planning)**: l'agente ragiona su quali passi intermedi sono necessari per raggiungere l'obiettivo.
3. **Azione**: l'agente esegue un'azione concreta — chiama uno strumento, interroga un'API, effettua una ricerca.
4. **Osservazione**: l'agente valuta il risultato dell'azione e decide se procedere, correggersi o considerare il compito concluso.

Questo ciclo si ripete finché l'obiettivo non è raggiunto o non viene raggiunta una condizione di terminazione esplicita — un tema già anticipato, come errore comune da evitare, nel Modulo 7.

### 4.2 — Planning: scomporre un obiettivo complesso

Un obiettivo ampio ("organizza una gita scolastica a Firenze per 25 studenti") non può essere affrontato con una sola azione. Il **Planning** consiste nello scomporre l'obiettivo in **sotto-task** più piccoli e gestibili:

```
Obiettivo: Organizza una gita scolastica a Firenze per 25 studenti

Piano generato dall'agente:
1. Cerca strutture ricettive disponibili per 25 persone
2. Cerca mezzi di trasporto (pullman/treno) e relativi costi
3. Cerca musei/attrazioni con tariffe scolastiche
4. Calcola il costo totale per studente
5. Prepara un riepilogo con tutte le opzioni trovate
```

Esistono due approcci principali:
- **Planning esplicito**: l'agente genera l'intero piano all'inizio, poi lo esegue passo dopo passo.
- **Planning dinamico (tipico di ReAct)**: l'agente decide un solo passo alla volta, osservando i risultati prima di pianificare il successivo — più flessibile e robusto quando l'ambiente è imprevedibile.

### 4.3 — Gestione della Memoria

Un agente senza memoria "dimentica" tutto a ogni interazione, ripetendo errori o richiedendo continuamente le stesse informazioni. Si distinguono tipicamente due livelli:

- **Memoria a breve termine (conversazionale)**: la cronologia della conversazione/sessione corrente, che permette all'agente di mantenere coerenza all'interno di un singolo compito.
- **Memoria a lungo termine (persistente)**: informazioni salvate tra sessioni diverse (es. in un database o vector store, riusando le tecniche del Modulo 10), che permettono all'agente di "ricordare" preferenze, fatti o esperienze passate anche dopo il riavvio.

```python
class MemoriaAgente:
    def __init__(self):
        self.storico_conversazione = []   # memoria a breve termine
        self.fatti_persistenti = {}       # memoria a lungo termine (semplificata)

    def aggiungi_scambio(self, ruolo, contenuto):
        self.storico_conversazione.append({"ruolo": ruolo, "contenuto": contenuto})

    def salva_fatto(self, chiave, valore):
        self.fatti_persistenti[chiave] = valore
```

In sistemi più sofisticati, la memoria a lungo termine viene spesso implementata proprio con un **vector database** (Modulo 10): l'agente può "cercare" tra le proprie esperienze passate per similarità semantica, esattamente come un sistema RAG cerca tra i documenti.

### 4.4 — Tool Use: collegare l'agente al mondo reale

Il **Tool Use** è l'applicazione pratica del Function Calling visto nel Modulo 7: si definiscono funzioni Python che l'agente può invocare, ciascuna con una descrizione chiara di cosa fa e quali parametri richiede.

```python
def cerca_meteo(citta: str) -> str:
    """Restituisce le condizioni meteo attuali per una città."""
    # implementazione reale: chiamata a un'API meteo
    return f"A {citta}: 21°C, cielo sereno"

def calcola_distanza(citta_a: str, citta_b: str) -> str:
    """Calcola la distanza approssimativa in km tra due città."""
    # implementazione reale: chiamata a un'API di mappe
    return "280 km"

strumenti_disponibili = [cerca_meteo, calcola_distanza]
```

Framework come **smolagents** (Hugging Face) e **LangChain/LangGraph** offrono astrazioni che semplificano notevolmente la definizione degli strumenti e la gestione del ciclo ReAct, evitando di dover scrivere manualmente tutta la logica di parsing delle risposte del modello.

### 4.5 — Browser Automation

Alcuni compiti richiedono che l'agente interagisca direttamente con pagine web reali — compilare form, cliccare pulsanti, estrarre informazioni da siti senza un'API dedicata. La **Browser Automation** collega l'agente a strumenti come **Playwright** o **Selenium**, che permettono di controllare un browser programmaticamente:

```python
from playwright.sync_api import sync_playwright

def cerca_su_web(query: str) -> str:
    """Effettua una ricerca web e restituisce i primi risultati."""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        pagina = browser.new_page()
        pagina.goto(f"https://www.esempio-motore-ricerca.it/search?q={query}")
        risultati = pagina.inner_text("#risultati")
        browser.close()
        return risultati
```

Questo tipo di strumento amplia enormemente le capacità di un agente, permettendogli di interagire con qualsiasi sito web, non solo con servizi dotati di API pubbliche — con la dovuta attenzione a termini di servizio e limiti d'uso dei siti interessati.

### 4.6 — Integrazione MCP negli agenti

Come introdotto nel Modulo 7, il **Model Context Protocol** offre un modo standardizzato per esporre strumenti a un agente. Invece di definire manualmente ogni funzione Python per ogni servizio (email, calendario, database), un **server MCP** può esporre un intero set di strumenti pronti all'uso, che l'agente scopre e utilizza dinamicamente:

```
Agente ──(protocollo MCP)──► Server MCP Calendario ──► Google Calendar
       ──(protocollo MCP)──► Server MCP Email       ──► Gmail
       ──(protocollo MCP)──► Server MCP RAG         ──► Documenti scolastici
```

Questo approccio rende un agente molto più **modulare e riutilizzabile**: aggiungere un nuovo strumento significa collegare un nuovo server MCP, senza riscrivere la logica dell'agente stesso.

### 4.7 — Sistemi Multi-Agent e Orchestrazione

Per compiti particolarmente complessi, un singolo agente "generalista" può diventare inefficiente o poco affidabile. I sistemi **Multi-Agent** distribuiscono il lavoro tra più agenti **specializzati**, ciascuno esperto in un sotto-compito specifico, coordinati da un **orchestratore**:

```
Orchestratore
    ├── Agente Ricerca (cerca informazioni, usa RAG e web search)
    ├── Agente Analisi (elabora e sintetizza le informazioni trovate)
    └── Agente Scrittura (produce il documento finale)
```

L'orchestratore decide quale agente attivare in ciascuna fase, passa le informazioni tra un agente e l'altro, e valuta quando il compito complessivo può dirsi concluso. Framework come **LangGraph** e **CrewAI** offrono astrazioni specifiche per costruire questo tipo di **workflow multi-agente**, modellando l'intero processo come un grafo di stati e transizioni.

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — Planning in un assistente scolastico**
Un agente a cui viene chiesto "prepara un piano di studio per l'esame di maturità" scompone l'obiettivo in sotto-task: verifica il programma delle materie, calcola i giorni disponibili, distribuisce gli argomenti su un calendario, genera un riepilogo — invece di rispondere con un piano generico e poco personalizzato.

**Esempio 2 — Memoria a lungo termine in un tutor AI**
Un tutor AI che ricorda, da una sessione all'altra, che uno studente fatica particolarmente con le equazioni di secondo grado può proporre esercizi mirati fin dall'inizio della sessione successiva, senza dover "riscoprire" il problema ogni volta.

**Esempio 3 — Tool use combinato con RAG**
Un agente aziendale che deve rispondere a "quanti giorni di ferie mi restano, secondo il regolamento aziendale?" combina due strumenti: un tool RAG (Modulo 10) per consultare il regolamento aziendale, e un tool API per interrogare il sistema HR con i dati specifici del dipendente.

**Esempio 4 — Sistema multi-agent per la creazione di contenuti**
Per generare un report di mercato, un sistema multi-agent può assegnare la ricerca dati a un agente specializzato in web search, l'analisi statistica a un agente con accesso a strumenti di calcolo, e la stesura finale a un agente ottimizzato per la scrittura — ciascuno più efficace nel proprio compito specifico rispetto a un unico agente generalista.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** costruire un AI Agent funzionante con ciclo ReAct, memoria conversazionale e almeno due strumenti reali.

**Setup:** installa smolagents (o, in alternativa, LangChain/LangGraph): `pip install smolagents`, aggiornando `requirements.txt`.

**Attività (90-120 minuti):**

1. Definisci almeno **tre strumenti** Python realistici per il tuo contesto (es. `cerca_orario_lezioni()`, `calcola_media_voti()`, `cerca_definizione(termine)`), ciascuno con una docstring chiara.
2. Costruisci un agente base con smolagents che utilizza questi strumenti:

```python
from smolagents import CodeAgent, tool

@tool
def calcola_media_voti(voti: list[float]) -> float:
    """Calcola la media di una lista di voti.

    Args:
        voti: lista di voti numerici
    """
    return sum(voti) / len(voti)

agente = CodeAgent(tools=[calcola_media_voti], model=il_tuo_modello)
risultato = agente.run("Qual è la media tra i voti 7, 8, 6 e 9?")
print(risultato)
```

3. Aggiungi una classe `MemoriaAgente` (vedi 4.3) e integra lo storico della conversazione nel ciclo dell'agente, verificando che l'agente possa fare riferimento a scambi precedenti nella stessa sessione.
4. Integra il **sistema RAG** costruito nel Modulo 10 come ulteriore strumento dell'agente, così che possa rispondere anche a domande basate sui tuoi documenti.
5. Testa l'agente con almeno 5 richieste diverse, alcune che richiedono un solo strumento, altre che richiedono la combinazione di più strumenti in sequenza (planning multi-step).

**Verifica:** documenta, per almeno due richieste, la sequenza completa di Pensiero → Azione → Osservazione generata dall'agente, per verificare che il ciclo ReAct funzioni correttamente.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Definisci strumenti con **descrizioni chiare e specifiche**: un agente sceglie lo strumento giusto solo se ne comprende bene lo scopo dalla descrizione fornita.
- ✅ Limita sempre il numero massimo di iterazioni del ciclo ReAct, per evitare loop infiniti in caso di comportamento imprevisto.
- ✅ Valida sempre gli output degli strumenti prima di passarli al modello, specialmente per strumenti che interagiscono con sistemi esterni critici.
- ✅ Per compiti complessi, preferisci un approccio multi-agent specializzato a un singolo agente "tuttofare": ogni agente più focalizzato tende a essere più affidabile.
- ✅ Registra (logga) ogni azione e osservazione dell'agente: è indispensabile per il debug e per capire perché un agente ha preso una determinata decisione.
- ✅ Quando un agente interagisce con sistemi reali (email, prenotazioni, pagamenti), prevedi sempre un passaggio di **conferma umana** prima di azioni irreversibili.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Dare all'agente troppi strumenti simili o ridondanti**, aumentando la probabilità che scelga quello sbagliato.
- ❌ **Non gestire il fallimento di uno strumento** (es. un'API che restituisce un errore): l'agente deve saper riconoscere l'errore e adattare il proprio piano, non bloccarsi o "inventare" un risultato.
- ❌ **Confondere memoria a breve e lungo termine**: salvare tutta la cronologia in memoria persistente senza filtri porta rapidamente a un sistema lento e a un contesto sovraccarico (ricorda il limite di context window, Modulo 9-10).
- ❌ **Concedere a un agente permessi di azione più ampi del necessario** (es. accesso di scrittura quando basterebbe la lettura), aumentando il rischio in caso di comportamento imprevisto.
- ❌ **Costruire sistemi multi-agent senza un orchestratore chiaro**, con agenti che si scambiano informazioni in modo caotico e senza una condizione di terminazione condivisa.
- ❌ **Non testare l'agente su richieste ambigue o mal formulate**: un buon agente deve gestire con robustezza anche input imperfetti, non solo casi "da manuale".

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai costruito, componente dopo componente, un **AI Agent completo**: l'architettura a ciclo (percezione, planning, azione, osservazione), la gestione della **memoria** a breve e lungo termine, il **Tool Use** per interagire con funzioni e API esterne, la **Browser Automation** per interagire con il web, l'integrazione tramite protocollo **MCP**, fino ai sistemi **Multi-Agent** orchestrati per compiti complessi. Hai messo in pratica tutto questo con un laboratorio che integra direttamente il sistema RAG costruito nel Modulo 10, dimostrando come i moduli del Master si combinino in un sistema AI reale e funzionante.

Nei prossimi due moduli (Sicurezza e Future Tech) completerai il quadro con la consapevolezza dei rischi specifici di questi sistemi e uno sguardo alle tecnologie emergenti — prima del Project Work conclusivo del Livello Avanzato, che ti chiederà di portare l'agente costruito qui a un livello di completezza professionale.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **AI Agent** | Sistema software basato su LLM capace di pianificare, agire autonomamente e correggersi in base ai risultati osservati |
| **Agent Architecture** | Struttura a ciclo di un agente: percezione, pianificazione, azione, osservazione |
| **Planning** | Fase in cui l'agente scompone un obiettivo complesso in sotto-task eseguibili |
| **Memoria a breve termine** | Cronologia della conversazione/sessione corrente di un agente |
| **Memoria a lungo termine** | Informazioni persistenti tra sessioni diverse, spesso implementate con un vector database |
| **Tool Use** | Capacità di un agente di invocare funzioni o API esterne per eseguire azioni concrete |
| **Browser Automation** | Controllo programmato di un browser web da parte di un agente (es. con Playwright, Selenium) |
| **MCP (Model Context Protocol)** | Protocollo standardizzato per esporre strumenti e risorse a un agente AI |
| **Sistema Multi-Agent** | Architettura in cui più agenti specializzati collaborano su un compito complesso |
| **Orchestratore** | Componente che coordina più agenti in un sistema multi-agent, decidendo chi agisce e quando |
| **Workflow** | Sequenza strutturata di passi (spesso modellata come grafo) che un sistema agentico esegue |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. Quali sono le quattro fasi del ciclo di un AI Agent?**
- A) Login, ricerca, output, logout
- B) Percezione, pianificazione, azione, osservazione ✅
- C) Tokenizzazione, embedding, attenzione, generazione
- D) Training, validazione, test, deploy

**2. A cosa serve la fase di Planning in un AI Agent?**
- A) A scomporre un obiettivo complesso in sotto-task più piccoli e gestibili ✅
- B) A calcolare la funzione di perdita del modello
- C) A tradurre il testo in più lingue
- D) A quantizzare i pesi del modello

**3. Qual è la differenza tra memoria a breve termine e a lungo termine in un agente?**
- A) Non c'è alcuna differenza pratica
- B) La memoria a breve termine riguarda la sessione corrente, quella a lungo termine è persistente tra sessioni diverse ✅
- C) La memoria a lungo termine esiste solo nei modelli Encoder
- D) La memoria a breve termine richiede sempre un vector database

**4. Cosa permette di fare il Tool Use in un agente?**
- A) Ridurre il numero di parametri del modello
- B) Invocare funzioni o API esterne per eseguire azioni concrete nel mondo reale ✅
- C) Comprimere il testo prima della tokenizzazione
- D) Eliminare la necessità di un ciclo ReAct

**5. A cosa serve la Browser Automation in un agente?**
- A) A velocizzare l'addestramento del modello
- B) A permettere all'agente di interagire direttamente con pagine web reali, anche senza API dedicate ✅
- C) A sostituire completamente il protocollo MCP
- D) A ridurre la dimensione del vector database

**6. Qual è il vantaggio principale dell'integrazione MCP in un sistema agentico?**
- A) Elimina completamente la necessità di strumenti esterni
- B) Offre un modo standardizzato per esporre e scoprire strumenti, rendendo l'agente più modulare e riutilizzabile ✅
- C) Aumenta automaticamente la context window del modello
- D) Sostituisce la necessità di un ciclo di planning

**7. Perché in un sistema Multi-Agent si preferisce spesso avere più agenti specializzati invece di uno solo generalista?**
- A) Perché è obbligatorio per legge
- B) Perché ogni agente più focalizzato su un compito specifico tende a essere più affidabile ✅
- C) Perché riduce sempre i costi computazionali totali
- D) Perché elimina la necessità di un orchestratore

**8. Perché è importante limitare il numero massimo di iterazioni del ciclo ReAct di un agente?**
- A) Per ridurre il numero di strumenti disponibili
- B) Per evitare che l'agente entri in un loop infinito senza mai fornire una risposta finale ✅
- C) Perché il protocollo MCP lo richiede obbligatoriamente
- D) Per aumentare automaticamente la memoria a lungo termine

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo — Verso il Project Work di Fine Livello Avanzato

**Consegna:** Estendi l'agente costruito nel laboratorio in un sistema più completo, che costituirà la base diretta del Project Work conclusivo del Livello Avanzato (Modulo 13):

1. Struttura il progetto in più file (`strumenti.py`, `memoria.py`, `agente.py`, `main.py`), seguendo i principi OOP consolidati nei moduli precedenti.
2. Integra almeno **quattro strumenti**, incluso il sistema RAG del Modulo 10 e almeno un'interazione con un'API esterna reale (o simulata, se non disponibile).
3. Implementa sia memoria a breve termine (conversazionale) che una forma semplice di memoria a lungo termine persistente (es. salvataggio su file JSON o vector database).
4. Configura l'agente per funzionare sia con un modello via API cloud sia con un modello locale via **Ollama** (Modulo 10), documentando le differenze di prestazioni osservate.
5. Scrivi un `README.md` che descriva l'architettura del sistema, gli strumenti disponibili, e almeno 3 scenari d'uso completi documentati (richiesta → piano generato → azioni eseguite → risposta finale).

Questo agente sarà ulteriormente esteso nei Moduli 12-13 con considerazioni di sicurezza e, nel Project Work di fine Livello Avanzato, con un'interfaccia web dedicata.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `agente_base_soluzione.py` — Soluzione commentata del laboratorio con smolagents
- 📄 `cheatsheet_smolagents_langgraph.md` — Confronto sintattico tra i due framework agentici principali
- 📄 `guida_playwright_browser_automation.md` — Guida introduttiva alla Browser Automation con Playwright
- 📄 `template_multi_agent.py` — Template di partenza per un sistema multi-agent con orchestratore

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Yao, S. et al. — *ReAct: Synergizing Reasoning and Acting in Language Models*, ICLR
- Wooldridge, M. — *An Introduction to MultiAgent Systems*, Wiley
- Russell, S., Norvig, P. — *Artificial Intelligence: A Modern Approach* (capitoli su agenti intelligenti), Pearson
- Park, J. S. et al. — *Generative Agents: Interactive Simulacra of Human Behavior*

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale smolagents (Hugging Face): huggingface.co/docs/smolagents
- Documentazione ufficiale LangGraph: langchain-ai.github.io/langgraph
- Documentazione ufficiale CrewAI: docs.crewai.com
- Specifica ufficiale del Model Context Protocol: modelcontextprotocol.io
- Documentazione ufficiale Playwright per Python: playwright.dev/python

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Prosegui con il prossimo modulo!]**

