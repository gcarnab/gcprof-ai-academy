---
title: "AI - M11: AI Agents"
description: "Quiz conclusivo per verificare le conoscenze su architettura degli agenti, planning, memoria, tool use, MCP e sistemi multi-agent."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quali sono le quattro fasi del ciclo di un AI Agent?
- [ ] A) Login, ricerca, output, logout.
- [x] B) Percezione, pianificazione, azione, osservazione.
- [ ] C) Tokenizzazione, embedding, attenzione, generazione.
- [ ] D) Training, validazione, test, deploy.

# Q2
A cosa serve la fase di Planning in un AI Agent?
- [x] A) A scomporre un obiettivo complesso in sotto-task più piccoli e gestibili.
- [ ] B) A calcolare la funzione di perdita del modello.
- [ ] C) A tradurre il testo in più lingue.
- [ ] D) A quantizzare i pesi del modello.

# Q3
Qual è la differenza tra memoria a breve termine e a lungo termine in un agente?
- [ ] A) Non c'è alcuna differenza pratica.
- [x] B) La memoria a breve termine riguarda la sessione corrente, quella a lungo termine è persistente tra sessioni diverse.
- [ ] C) La memoria a lungo termine esiste solo nei modelli Encoder.
- [ ] D) La memoria a breve termine richiede sempre un vector database.

# Q4
Cosa permette di fare il Tool Use in un agente?
- [ ] A) Ridurre il numero di parametri del modello.
- [x] B) Invocare funzioni o API esterne per eseguire azioni concrete nel mondo reale.
- [ ] C) Comprimere il testo prima della tokenizzazione.
- [ ] D) Eliminare la necessità di un ciclo ReAct.

# Q5
A cosa serve la Browser Automation in un agente?
- [ ] A) A velocizzare l'addestramento del modello.
- [x] B) A permettere all'agente di interagire direttamente con pagine web reali, anche senza API dedicate.
- [ ] C) A sostituire completamente il protocollo MCP.
- [ ] D) A ridurre la dimensione del vector database.

# Q6
Qual è il vantaggio principale dell'integrazione MCP in un sistema agentico?
- [ ] A) Elimina completamente la necessità di strumenti esterni.
- [x] B) Offre un modo standardizzato per esporre e scoprire strumenti, rendendo l'agente più modulare e riutilizzabile.
- [ ] C) Aumenta automaticamente la context window del modello.
- [ ] D) Sostituisce la necessità di un ciclo di planning.

# Q7
Perché in un sistema Multi-Agent si preferisce spesso avere più agenti specializzati invece di uno solo generalista?
- [ ] A) Perché è obbligatorio per legge.
- [x] B) Perché ogni agente più focalizzato su un compito specifico tende a essere più affidabile.
- [ ] C) Perché riduce sempre i costi computazionali totali.
- [ ] D) Perché elimina la necessità di un orchestratore.

# Q8
Perché è importante limitare il numero massimo di iterazioni del ciclo ReAct di un agente?
- [ ] A) Per ridurre il numero di strumenti disponibili.
- [x] B) Per evitare che l'agente entri in un loop infinito senza mai fornire una risposta finale.
- [ ] C) Perché il protocollo MCP lo richiede obbligatoriamente.
- [ ] D) Per aumentare automaticamente la memoria a lungo termine.

# OPEN
Descrivi un AI Agent che potresti costruire per la tua scuola o il tuo lavoro. Indica quale obiettivo dovrebbe raggiungere, quali strumenti (tool) gli daresti a disposizione, se avrebbe bisogno di memoria a lungo termine e perché, e in quale punto del processo inseriresti un passaggio di conferma umana prima di un'azione irreversibile.