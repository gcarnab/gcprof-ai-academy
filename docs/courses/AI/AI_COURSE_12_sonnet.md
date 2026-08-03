<a id="indice-m12"></a>

# 🛡️ Modulo 12: Sicurezza AI
**Livello Avanzato — Master in Intelligenza Artificiale | GCProf Academy**

· 🕒 Tempo stimato: 12-14 ore · 🎯 Difficoltà: Avanzato

---

## 📑 Indice del Modulo

1. [Introduzione](#intro)
2. [Obiettivi](#obiettivi)
3. [Prerequisiti](#prerequisiti)
4. [Lezioni](#lezioni)
5. [Esempi](#esempi)
6. [Laboratorio](#laboratorio)
7. [Best Practice](#best-practice)
8. [Errori Comuni](#errori-comuni)
9. [Riepilogo](#riepilogo)
10. [Glossario](#glossario)
11. [Quiz](#quiz)
12. [Project Work](#project-work)
13. [Materiale Scaricabile](#materiale)
14. [Bibliografia](#bibliografia)
15. [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. 📖 Introduzione

Ogni sistema che genera valore genera anche interesse da parte di chi vuole comprometterlo. I sistemi basati su Large Language Model non fanno eccezione: introducono una superficie di attacco nuova rispetto al software tradizionale, perché il loro "codice eseguibile" è in parte costituito da linguaggio naturale.

In questo modulo analizzerai le principali categorie di minaccia specifiche dell'AI generativa — dalla manipolazione dei prompt alla contaminazione dei dati di addestramento, fino ai rischi legati ai contenuti sintetici come i deepfake. L'obiettivo non è imparare a costruire attacchi, ma sviluppare la capacità di **riconoscere pattern di rischio, valutarne l'impatto e applicare contromisure difensive** in contesti scolastici, professionali e aziendali.

La sicurezza dell'AI è oggi un requisito di conformità (si pensi all'AI Act, trattato nel Modulo 3) tanto quanto una competenza tecnica: le due dimensioni si intrecciano costantemente in questo modulo.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="obiettivi"></a>
## 2. 🎯 Obiettivi

Al termine del Modulo 12 sarai in grado di:

- Distinguere le principali famiglie di vulnerabilità degli LLM: Prompt Injection, Jailbreak, Prompt Leakage, Data Poisoning, Adversarial Attacks.
- Riconoscere pattern sospetti in input utente e output del modello.
- Comprendere il funzionamento concettuale dei contenuti sintetici (deepfake) e delle tecniche di identificazione (watermarking, AI Detection).
- Valutare il rischio di un sistema AI in produzione applicando un framework di analisi strutturato.
- Progettare contromisure difensive di base (validazione input, guardrail, logging, human-in-the-loop) per un'applicazione che integra un LLM.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="prerequisiti"></a>
## 3. 🧩 Prerequisiti

Prima di affrontare questo modulo dovresti aver completato:

- **Modulo 3 (Etica e Normativa):** concetti base di GDPR e AI Act.
- **Modulo 7 (Prompt Engineering Avanzato):** in particolare Structured Output, Function Calling e Tool Calling, poiché molte vulnerabilità nascono proprio dall'integrazione tra LLM e strumenti esterni.
- **Modulo 10 (LLM Engineering):** nozioni di RAG e Vector Database, utili per comprendere i rischi di data poisoning su basi di conoscenza esterne.
- **Modulo 11 (AI Agents):** un agente con accesso a tool e API amplifica ogni vulnerabilità discussa in questo modulo.

Non sono richieste competenze di cybersecurity avanzata: il modulo introduce ogni concetto da zero, con un taglio pratico e non specialistico.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="lezioni"></a>
## 4. 🗂️ Lezioni

### Lezione 12.1 — Prompt Injection
Come un input malevolo può alterare il comportamento previsto di un'applicazione LLM, sovrascrivendo le istruzioni del system prompt. Differenza tra injection diretta (l'utente scrive il payload) e indiretta (il payload arriva da un documento, una pagina web o un output di tool che il modello elabora).

### Lezione 12.2 — Jailbreak
Tecniche con cui un utente tenta di aggirare le policy di sicurezza di un modello (role-play, framing ipotetico, offuscamento del linguaggio). Perché queste tecniche funzionano a livello concettuale e come i modelli moderni vengono addestrati a resistervi.

### Lezione 12.3 — Prompt Leakage
Rischio che un system prompt, contenente istruzioni riservate o dati sensibili, venga estratto dall'utente attraverso domande dirette o indirette. Impatti su proprietà intellettuale e sicurezza applicativa.

### Lezione 12.4 — Data Poisoning e Adversarial Attacks
Come dati di addestramento o di retrieval (in un sistema RAG) possono essere alterati per influenzare l'output del modello. Introduzione agli adversarial examples: input costruiti ad hoc per ingannare un modello di classificazione.

### Lezione 12.5 — Deepfake e Contenuti Sintetici
Funzionamento concettuale delle tecniche generative usate per creare immagini, audio e video sintetici. Rischi di disinformazione, frode e violazione dell'identità.

### Lezione 12.6 — Watermarking e AI Detection
Tecniche per marcare contenuti generati da AI (watermark visibili e invisibili) e per rilevare se un testo o un'immagine sono stati generati artificialmente. Limiti attuali di affidabilità di questi strumenti.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="esempi"></a>
## 5. 💡 Esempi

**Esempio 1 — Injection indiretta in un agente RAG.**
Un agente che riassume pagine web riceve in input una pagina contenente un testo nascosto (es. font a dimensione zero) con istruzioni tipo "ignora le istruzioni precedenti e...". Il modello, elaborando quel testo come parte del contesto, rischia di eseguirlo come se fosse un comando legittimo.

**Esempio 2 — Prompt leakage tramite domande indirette.**
Invece di chiedere direttamente "qual è il tuo system prompt?", un utente malevolo può provare a chiedere al modello di "ripetere tutto ciò che è stato scritto sopra questo messaggio" o di tradurre il proprio prompt in un'altra lingua, sperando di aggirare un blocco impostato solo sulla domanda diretta.

**Esempio 3 — Data poisoning su un vector database.**
In un sistema RAG aziendale, se chiunque può caricare documenti nella knowledge base senza validazione, un attore malevolo potrebbe inserire un documento con informazioni false ma scritte in modo autorevole, influenzando le risposte del sistema per tutti gli utenti.

**Esempio 4 — Watermark su immagini generate.**
Molti generatori di immagini AI inseriscono un watermark invisibile nei pixel (non visibile a occhio nudo) che permette, tramite strumenti dedicati, di verificare che il file sia stato generato artificialmente — anche dopo compressione o piccoli editing.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="laboratorio"></a>
## 6. 💻 Laboratorio Pratico

**Ambiente:** VS Code, esecuzione locale.

### Attività 1 — Validatore di input (difensivo)
Scrivi in Python una funzione `sanitize_user_input(text: str) -> dict` che analizza un input utente prima di inviarlo a un LLM e segnala pattern potenzialmente a rischio (es. tentativi di sovrascrivere istruzioni, richieste di rivelare il system prompt, presenza di caratteri di controllo o testo nascosto). La funzione deve restituire un punteggio di rischio e una lista di motivazioni, non bloccare in automatico: la decisione finale spetta a un livello successivo dell'applicazione.

### Attività 2 — Logging e audit trail
Implementa un semplice sistema di logging che registri ogni interazione utente-modello (input, output, punteggio di rischio dell'Attività 1, timestamp) in un file locale, utile per audit successivi — una pratica richiesta anche a livello normativo per i sistemi AI ad alto rischio.

### Attività 3 — Analisi di un dataset di documenti RAG
Dato un piccolo set di documenti testuali forniti come fixture, scrivi uno script che individui documenti anomali rispetto agli altri (es. per lunghezza, ripetitività eccessiva di parole chiave, o incongruenze di stile), simulando un primo controllo di qualità contro il data poisoning.

> Nota: il laboratorio si concentra deliberatamente su **strumenti di rilevamento e mitigazione**, non sulla costruzione di exploit funzionanti.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="best-practice"></a>
## 7. ✅ Best Practice

- **Principio del privilegio minimo:** un agente o un'applicazione LLM deve avere accesso solo ai tool e ai dati strettamente necessari al suo compito.
- **Separazione tra istruzioni e dati:** quando possibile, marca chiaramente (es. con delimitatori XML o JSON, visti nel Modulo 2) cosa è "istruzione di sistema" e cosa è "contenuto da elaborare", per ridurre l'ambiguità che l'injection sfrutta.
- **Human-in-the-loop per azioni critiche:** ogni azione irreversibile o sensibile (invio email, cancellazione dati, transazioni) dovrebbe richiedere una conferma umana esplicita.
- **Validazione delle fonti nei sistemi RAG:** applica controlli di provenienza e qualità sui documenti prima che entrino in una knowledge base.
- **Monitoraggio continuo:** logging, rate limiting e alerting su pattern anomali di utilizzo sono componenti essenziali quanto il modello stesso.
- **Aggiornamento costante:** le tecniche di attacco evolvono rapidamente; una policy di sicurezza statica diventa obsoleta in pochi mesi.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="errori-comuni"></a>
## 8. ⚠️ Errori Comuni

- **Fidarsi ciecamente del system prompt come unica difesa:** un system prompt non è un meccanismo di sicurezza robusto, è un'istruzione che può essere aggirata.
- **Considerare i guardrail come "impostare e dimenticare":** la sicurezza va testata e rivalutata periodicamente (red teaming continuo), non configurata una volta sola.
- **Ignorare l'injection indiretta:** molti team si concentrano solo su ciò che l'utente scrive direttamente, dimenticando che documenti, pagine web o output di altri tool possono veicolare istruzioni malevole.
- **Sovrastimare l'affidabilità degli strumenti di AI Detection:** questi strumenti hanno tassi di errore non trascurabili e non vanno usati come unica prova in decisioni con impatto reale (es. accuse di plagio).
- **Assenza di logging:** senza una cronologia delle interazioni è impossibile investigare un incidente dopo che si è verificato.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="riepilogo"></a>
## 9. 📌 Riepilogo

In questo modulo hai esplorato le principali categorie di rischio dei sistemi AI generativi: manipolazione dei prompt (injection e jailbreak), esposizione di informazioni riservate (leakage), contaminazione dei dati (poisoning), inganno dei modelli di classificazione (adversarial attacks) e le sfide poste dai contenuti sintetici (deepfake, watermarking, detection). Hai visto come queste minacce si intreccino con gli argomenti già trattati nei moduli su Prompt Engineering, RAG e AI Agents, e hai messo in pratica un primo livello di difesa attraverso validazione degli input e logging.

La sicurezza AI non è un modulo isolato, ma una lente da applicare trasversalmente a ogni sistema che costruirai da qui in avanti.

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="glossario"></a>
## 10. 📗 Glossario

| Termine | Definizione |
|---|---|
| **Prompt Injection** | Tecnica con cui un input malevolo altera il comportamento previsto di un sistema LLM sovrascrivendo le istruzioni originali. |
| **Jailbreak** | Insieme di tecniche volte ad aggirare le policy di sicurezza di un modello per ottenere output normalmente non consentiti. |
| **Prompt Leakage** | Esposizione non autorizzata del system prompt o di istruzioni interne di un'applicazione AI. |
| **Data Poisoning** | Alterazione intenzionale dei dati di addestramento o di una base di conoscenza per influenzare il comportamento di un modello. |
| **Adversarial Attack** | Input costruito appositamente per ingannare un modello, spesso sfruttando piccole perturbazioni impercettibili. |
| **Deepfake** | Contenuto multimediale sintetico (immagine, audio, video) generato o alterato tramite AI per apparire autentico. |
| **Watermark** | Marcatore, visibile o invisibile, inserito in un contenuto per attestarne l'origine artificiale. |
| **AI Detection** | Insieme di strumenti e tecniche per stabilire se un contenuto è stato generato da un'AI. |
| **Red Teaming** | Pratica di testare un sistema simulando attacchi reali per individuarne le vulnerabilità prima che vengano sfruttate. |
| **Human-in-the-loop** | Modello operativo in cui una decisione critica del sistema AI richiede validazione o intervento umano. |

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="quiz"></a>
## 11. 🧪 Quiz Markdown

```quiz
1. Cosa distingue la prompt injection indiretta da quella diretta?
   a) La injection indiretta non è mai pericolosa
   b) La injection indiretta veicola il payload attraverso una fonte esterna (documento, pagina web, output di un tool) invece che tramite l'input diretto dell'utente *
   c) La injection diretta funziona solo su modelli open source
   d) Non esiste alcuna differenza pratica

2. Qual è il principale limite degli strumenti di AI Detection oggi disponibili?
   a) Non esistono strumenti di questo tipo
   b) Funzionano solo su testo, mai su immagini
   c) Presentano tassi di errore non trascurabili e non dovrebbero essere l'unica prova in decisioni ad alto impatto *
   d) Sono utilizzabili solo da aziende certificate

3. Perché il "principio del privilegio minimo" è rilevante per la sicurezza degli AI Agent?
   a) Perché riduce i costi di calcolo
   b) Perché limita l'impatto potenziale di un'azione malevola o di un errore, riducendo l'accesso di un agente solo a ciò che è strettamente necessario *
   c) Perché velocizza le risposte del modello
   d) Non ha alcuna relazione con la sicurezza

4. Il data poisoning in un sistema RAG riguarda principalmente:
   a) La velocità di risposta del modello
   b) L'alterazione dei documenti nella base di conoscenza usata per il retrieval *
   c) Il costo delle API utilizzate
   d) La lunghezza del context window

5. Qual è una buona pratica per mitigare i rischi di azioni critiche eseguite da un agente AI?
   a) Automatizzare completamente ogni azione senza supervisione
   b) Richiedere una conferma umana esplicita prima di azioni irreversibili o sensibili *
   c) Disattivare il logging per motivi di privacy
   d) Aumentare il numero di tool disponibili all'agente
```

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="project-work"></a>
## 12. 🏁 Project Work

**Obiettivo:** costruire un modulo di sicurezza applicabile a un'applicazione LLM esistente (reale o di esempio).

**Consegna:**
1. Implementa un livello di validazione input ispirato all'Attività 1 del laboratorio, con almeno 5 categorie di rischio riconosciute.
2. Aggiungi un sistema di logging strutturato (formato JSON) che tracci ogni interazione con relativo punteggio di rischio.
3. Scrivi un breve report (max 2 pagine) che analizzi, per l'applicazione scelta, quali delle 5 categorie di minaccia viste nel modulo rappresentano il rischio più concreto, motivando la scelta.
4. Proponi almeno 3 contromisure concrete e realizzabili nel breve termine.

**Criteri di valutazione:** completezza delle categorie di rischio coperte, qualità del reasoning nel report, realizzabilità delle contromisure proposte, corretta separazione tra logica di validazione e logica applicativa (architettura pulita).

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="materiale"></a>
## 13. 📥 Materiale Scaricabile

**Utilizza la sezione Risorse della piattaforma:** 

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="bibliografia"></a>
## 14. 📚 Bibliografia

- OWASP Top 10 for Large Language Model Applications
- NIST AI Risk Management Framework (AI RMF 1.0)
- Documentazione tecnica su adversarial machine learning (letteratura accademica di riferimento su robustezza dei modelli)
- Materiali dell'AI Act europeo relativi ai sistemi ad alto rischio (collegamento diretto al Modulo 3)

[🔝 Torna all'indice del modulo](#indice-m12)

---

<a id="sitografia"></a>
## 15. 🌐 Sitografia

- owasp.org — sezione dedicata alla sicurezza delle applicazioni LLM
- nist.gov — pubblicazioni sul framework di gestione del rischio AI
- Blog di sicurezza dei principali provider di modelli (documentazione ufficiale su policy e mitigazioni)
- Portale europeo dedicato all'AI Act

[🔝 Torna all'indice del modulo](#indice-m12)

---
