---
title: "AI - M12: Sicurezza AI"
description: "Quiz conclusivo per verificare le conoscenze su Prompt Injection, Jailbreak, Prompt Leakage, Data Poisoning, Adversarial Attacks, Deepfake, Watermark e AI Detection."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa distingue la Prompt Injection indiretta da quella diretta?
- [ ] A) La injection indiretta non è mai pericolosa.
- [x] B) La injection indiretta veicola il payload attraverso una fonte esterna (documento, pagina web, output di un tool) invece che tramite l'input diretto dell'utente.
- [ ] C) La injection diretta funziona solo su modelli open source.
- [ ] D) Non esiste alcuna differenza pratica tra le due.

# Q2
Cosa si intende per Jailbreak in un sistema LLM?
- [ ] A) Un errore di rete che blocca le risposte del modello.
- [x] B) Un insieme di tecniche con cui un utente tenta di aggirare le policy di sicurezza del modello per ottenere output normalmente non consentiti.
- [ ] C) Una tecnica di quantizzazione dei pesi del modello.
- [ ] D) Un metodo per velocizzare l'inferenza del modello.

# Q3
Perché il Prompt Leakage rappresenta un rischio per un'applicazione basata su LLM?
- [ ] A) Perché rallenta sempre le risposte del modello.
- [x] B) Perché può esporre istruzioni riservate o dati sensibili contenuti nel system prompt.
- [ ] C) Perché aumenta automaticamente il costo delle API.
- [ ] D) Perché impedisce l'uso di Structured Output.

# Q4
Il Data Poisoning in un sistema RAG riguarda principalmente:
- [ ] A) La velocità di risposta del modello.
- [x] B) L'alterazione intenzionale dei documenti nella base di conoscenza usata per il retrieval.
- [ ] C) Il costo delle API utilizzate.
- [ ] D) La lunghezza del context window.

# Q5
Cos'è un Adversarial Attack?
- [ ] A) Un attacco che disattiva fisicamente il server su cui gira il modello.
- [x] B) Un input costruito appositamente, spesso con perturbazioni impercettibili, per ingannare un modello.
- [ ] C) Una tecnica per aumentare la dimensione del dataset di addestramento.
- [ ] D) Un metodo per comprimere un modello senza perdita di accuratezza.

# Q6
Quale rischio principale è associato ai Deepfake?
- [ ] A) L'aumento dei costi di calcolo per l'addestramento dei modelli.
- [x] B) La possibilità di creare contenuti sintetici (immagini, audio, video) usati per disinformazione o frode.
- [ ] C) La riduzione automatica della qualità dei dataset.
- [ ] D) L'impossibilità di usare tecniche di prompting avanzato.

# Q7
Qual è il principale limite degli strumenti di AI Detection oggi disponibili?
- [ ] A) Non esistono strumenti di questo tipo.
- [ ] B) Funzionano solo su testo, mai su immagini o audio.
- [x] C) Presentano tassi di errore non trascurabili e non dovrebbero essere l'unica prova in decisioni ad alto impatto.
- [ ] D) Sono utilizzabili solo da aziende certificate.

# Q8
Perché il "principio del privilegio minimo" è rilevante per la sicurezza di un'applicazione o di un AI Agent?
- [ ] A) Perché riduce i costi di calcolo del modello.
- [x] B) Perché limita l'impatto potenziale di un'azione malevola o di un errore, concedendo accesso solo a ciò che è strettamente necessario.
- [ ] C) Perché velocizza le risposte generate dal modello.
- [ ] D) Non ha alcuna relazione con la sicurezza del sistema.

# OPEN
Scegli un'applicazione AI (reale o ipotetica) che conosci o che stai sviluppando. Indica quale delle minacce viste nel modulo (Prompt Injection, Jailbreak, Prompt Leakage, Data Poisoning, Adversarial Attack) rappresenta per essa il rischio più concreto, motivando la scelta, e proponi almeno due contromisure difensive applicabili nel breve termine.