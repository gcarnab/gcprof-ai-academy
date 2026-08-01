---
title: "Modulo 7: Prompt Engineering Avanzato"
description: "Quiz conclusivo per verificare le conoscenze su Chain of Thought, ReAct, Structured Output, Function Calling e MCP."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
A cosa serve la tecnica Chain of Thought?
- [ ] A) A ridurre la lunghezza delle risposte del modello.
- [x] B) A istruire il modello a ragionare esplicitamente passo dopo passo prima della risposta finale.
- [ ] C) A collegare il modello a strumenti esterni.
- [ ] D) A generare automaticamente codice JSON.

# Q2
Qual è la differenza principale tra Chain of Thought e Tree of Thought?
- [ ] A) Non c'è alcuna differenza, sono sinonimi.
- [x] B) Il Tree of Thought esplora più percorsi di ragionamento alternativi, il Chain of Thought ne segue uno solo.
- [ ] C) Il Chain of Thought funziona solo con immagini.
- [ ] D) Il Tree of Thought non richiede alcun ragionamento.

# Q3
Cosa alterna il pattern ReAct?
- [ ] A) Domande e risposte casuali.
- [x] B) Ragionamento (Reasoning) e Azione (Acting).
- [ ] C) Testo e immagini.
- [ ] D) Training e inferenza del modello.

# Q4
A cosa serve la tecnica di Self-Consistency?
- [x] A) A generare più risposte con ragionamenti diversi e scegliere quella più frequente, aumentando l'affidabilità.
- [ ] B) A velocizzare la generazione delle risposte.
- [ ] C) A ridurre il numero di parametri del modello.
- [ ] D) A collegare il modello a un database esterno.

# Q5
Cosa permette di fare il Function Calling (Tool Calling)?
- [ ] A) Cambiare il linguaggio di programmazione del modello.
- [x] B) Permettere al modello di richiedere l'esecuzione di funzioni esterne per ottenere informazioni o eseguire azioni.
- [ ] C) Aumentare automaticamente la lunghezza massima del contesto.
- [ ] D) Addestrare nuovamente il modello su nuovi dati.

# Q6
Perché è importante validare i parametri quando un LLM richiede l'esecuzione di una funzione?
- [ ] A) Non è necessario, il modello genera sempre parametri corretti.
- [x] B) Perché il modello può generare parametri plausibili ma errati, e il codice deve verificarli prima di eseguire l'azione reale.
- [ ] C) Perché altrimenti la funzione non verrebbe mai eseguita.
- [ ] D) Perché i parametri vengono sempre generati in un formato non testuale.

# Q7
Cos'è il Model Context Protocol (MCP)?
- [ ] A) Un algoritmo di ottimizzazione per l'addestramento dei modelli.
- [x] B) Un protocollo aperto e standardizzato per collegare modelli AI a strumenti e risorse esterne.
- [ ] C) Un formato di file per salvare i pesi di una rete neurale.
- [ ] D) Una tecnica di data augmentation.

# Q8
Perché nei sistemi agentici è importante definire una condizione di terminazione esplicita?
- [x] A) Per evitare che l'agente continui a ragionare o agire indefinitamente, senza mai fornire una risposta finale.
- [ ] B) Perché altrimenti il modello si spegne automaticamente dopo pochi secondi.
- [ ] C) Perché è richiesto obbligatoriamente dal protocollo MCP.
- [ ] D) Per ridurre il numero di parametri del modello.

# OPEN
Scegli una delle tecniche presentate in questo modulo (Chain of Thought, Tree of Thought, ReAct, Self-Consistency, Reflection, Prompt Chaining, Structured Output o Function Calling) e descrivi un caso d'uso reale in cui la applicheresti, nel tuo contesto scolastico o lavorativo. Spiega perché quella tecnica specifica è più adatta di un prompt semplice per risolvere il problema che hai scelto.