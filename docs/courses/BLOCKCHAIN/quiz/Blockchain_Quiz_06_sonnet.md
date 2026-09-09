---
title: "Blockchain - M6 - Mining e Proof of Work"
description: "Quiz di verifica finale sui concetti chiave del Modulo 6: cos'è il mining, il concetto di target e hash rate, l'aggiustamento automatico della difficoltà, gli incentivi economici (block reward e transaction fee), le mining pool e il rischio di centralizzazione, il dibattito sull'impatto energetico, il collegamento tra mining e sicurezza della rete."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa cerca effettivamente di trovare un miner durante il processo di mining?
- [ ] A) Bitcoin già esistenti nascosti all'interno della Blockchain.
- [x] B) Un valore di nonce che, combinato con i dati del blocco, produca un hash inferiore al target stabilito dal protocollo.
- [ ] C) L'identità di Satoshi Nakamoto.
- [ ] D) La chiave privata di un altro utente della rete.

# Q2
Perché, secondo il modulo, non esiste alcuna "scorciatoia" per trovare un nonce valido, ma solo il tentativo esaustivo?
- [ ] A) Perché il protocollo Bitcoin vieta esplicitamente qualsiasi ottimizzazione del calcolo.
- [x] B) Perché la funzione di hash è unidirezionale: non è possibile calcolare "al contrario" quale nonce produca un hash valido.
- [ ] C) Perché ogni miner utilizza un algoritmo di hash diverso dagli altri.
- [ ] D) Perché il nonce cambia automaticamente ogni 10 minuti indipendentemente dal calcolo.

# Q3
Cosa succede, secondo il concetto di "target" spiegato nel modulo, quando il target diventa più basso (più stringente)?
- [ ] A) Diminuisce il numero di miner necessari per trovare un blocco.
- [x] B) Diminuisce la probabilità che un singolo tentativo casuale lo soddisfi, e aumenta il numero medio di tentativi necessari.
- [ ] C) L'hash rate della rete si azzera automaticamente.
- [ ] D) Il block reward assegnato al miner aumenta proporzionalmente.

# Q4
Cosa garantisce, ogni circa due settimane, l'aggiustamento automatico della difficoltà di rete?
- [ ] A) Un aumento costante e prevedibile della ricompensa dei miner.
- [x] B) Il mantenimento di un ritmo medio stabile di circa 10 minuti per blocco, indipendentemente dall'hash rate complessivo.
- [ ] C) La riduzione automatica del consumo energetico della rete.
- [ ] D) L'eliminazione automatica dei miner meno efficienti.

# Q5
Da cosa è composto il guadagno economico complessivo di un miner per ogni blocco trovato?
- [ ] A) Solo dal block reward.
- [ ] B) Solo dalle transaction fee.
- [x] C) Dalla somma di block reward e transaction fee.
- [ ] D) Da una commissione fissa pagata direttamente da Satoshi Nakamoto.

# Q6
Perché, secondo il modulo, per un miner conviene comportarsi onestamente piuttosto che tentare di includere transazioni fraudolente?
- [ ] A) Perché la rete blocca automaticamente l'hardware dei miner disonesti.
- [x] B) Perché gli altri nodi rifiuterebbero il blocco non valido, vanificando l'investimento energetico sostenuto per trovarlo.
- [ ] C) Perché i miner disonesti perdono automaticamente la propria chiave privata.
- [ ] D) Perché solo i miner onesti possono partecipare a una mining pool.

# Q7
Qual è il principale rischio associato alla crescente diffusione delle mining pool?
- [ ] A) L'impossibilità di trovare mai più nuovi blocchi.
- [x] B) Un possibile rischio di centralizzazione dell'hash rate in poche mani.
- [ ] C) L'aumento incontrollato dell'offerta massima di bitcoin.
- [ ] D) La disattivazione automatica del meccanismo di Proof of Work.

# Q8
Qual è, secondo il modulo, l'approccio corretto al dibattito sull'impatto energetico del mining?
- [ ] A) Ignorare il tema, poiché è irrilevante ai fini tecnici del corso.
- [x] B) Comprendere il meccanismo che genera il consumo energetico per poter valutare autonomamente e criticamente le diverse argomentazioni, senza prendere una posizione netta.
- [ ] C) Accettare senza discussione gli argomenti critici verso Bitcoin, poiché sono gli unici basati su dati verificabili.
- [ ] D) Accettare senza discussione gli argomenti a favore di Bitcoin, poiché il mining utilizza solo energia rinnovabile.

# OPEN
Spiega con parole tue perché il Proof of Work, pur richiedendo un consumo reale di energia, sia proprio questo "costo" a rendere sicura la rete Bitcoin; collega poi questo meccanismo agli incentivi economici del mining e spiega perché, secondo il modulo, imbrogliare risulta sempre meno conveniente che comportarsi onestamente.