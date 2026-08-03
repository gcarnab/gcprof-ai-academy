---
title: "AI - M10: LLM Engineering"
description: "Quiz conclusivo per verificare le conoscenze su quantizzazione, GGUF, Ollama/vLLM/llama.cpp e architetture RAG."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
A cosa serve la quantizzazione di un modello LLM?
- [ ] A) Ad aumentare il numero di parametri del modello.
- [x] B) A ridurre la precisione numerica dei pesi, diminuendo i requisiti di memoria e calcolo.
- [ ] C) A tradurre il modello in un altro linguaggio di programmazione.
- [ ] D) A eliminare completamente la necessità di una GPU.

# Q2
Cos'è il formato GGUF?
- [ ] A) Un protocollo di comunicazione tra agenti AI.
- [x] B) Un formato di file per l'esecuzione efficiente di LLM quantizzati su hardware consumer.
- [ ] C) Un tipo di funzione di attivazione.
- [ ] D) Un algoritmo di ottimizzazione per il Gradient Descent.

# Q3
Quale strumento è generalmente il più adatto per il serving in produzione di un LLM con molti utenti simultanei?
- [ ] A) Ollama.
- [x] B) vLLM.
- [ ] C) Un semplice script Python senza librerie dedicate.
- [ ] D) Un vector database.

# Q4
Cosa permette di fare un'architettura RAG?
- [ ] A) Riaddestrare completamente un modello da zero.
- [x] B) Collegare un LLM a una base di conoscenza esterna e aggiornabile, senza modificarne i pesi.
- [ ] C) Aumentare automaticamente la velocità di generazione del testo.
- [ ] D) Convertire un modello Encoder in un modello Decoder.

# Q5
Qual è la differenza principale tra RAG e fine-tuning?
- [ ] A) Sono esattamente la stessa tecnica con nomi diversi.
- [x] B) Il RAG fornisce contesto esterno al momento della domanda senza modificare il modello, il fine-tuning modifica effettivamente i pesi tramite nuovo addestramento.
- [ ] C) Il fine-tuning si può fare solo con modelli open-weight.
- [ ] D) Il RAG richiede sempre una GPU dedicata, il fine-tuning no.

# Q6
Perché è utile un overlap tra chunk consecutivi nel chunking di un documento?
- [ ] A) Per ridurre lo spazio occupato dal vector database.
- [x] B) Per evitare che informazioni rilevanti vengano spezzate esattamente al confine tra due chunk.
- [ ] C) Per velocizzare il calcolo degli embedding.
- [ ] D) Per eliminare la necessità della fase di retrieval.

# Q7
Cosa fa la fase di "retrieval" in un sistema RAG?
- [ ] A) Genera la risposta finale in linguaggio naturale.
- [x] B) Recupera i chunk più simili semanticamente alla domanda dell'utente dal vector database.
- [ ] C) Quantizza il modello per ridurne i requisiti di memoria.
- [ ] D) Suddivide il documento originale in frammenti.

# Q8
Cosa NON garantisce, da solo, un sistema RAG?
- [ ] A) L'accesso a informazioni non presenti nei dati di addestramento del modello.
- [x] B) L'eliminazione totale del rischio di allucinazioni del modello.
- [ ] C) La possibilità di aggiornare la base di conoscenza senza riaddestrare il modello.
- [ ] D) Un contesto specifico su cui basare la risposta.

# OPEN
Descrivi un caso d'uso reale (della tua scuola, del tuo lavoro o di un contesto a tua scelta) in cui costruiresti un sistema RAG. Indica quali documenti useresti come base di conoscenza, come li suddivideresti in chunk (dimensione e overlap indicativi) e quale vantaggio concreto otterresti rispetto all'uso di un LLM generico senza RAG.