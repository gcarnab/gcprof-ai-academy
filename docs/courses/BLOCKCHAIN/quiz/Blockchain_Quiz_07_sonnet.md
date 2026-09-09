---
title: "Blockchain - M7 - Sicurezza della rete Bitcoin"
description: "Quiz di verifica finale sui concetti chiave del Modulo 7: i tre pilastri della sicurezza di Bitcoin, l'attacco del 51% e la regola della catena più lunga, perché è economicamente proibitivo, cosa può e non può fare un attacco del 51% riuscito, i fork e il consenso volontario, differenze tra soft fork e hard fork, altri vettori di attacco (Sybil, Eclipse) e sicurezza pratica di wallet/exchange."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quali sono, secondo il modulo, i tre pilastri combinati su cui si fonda la sicurezza di Bitcoin?
- [ ] A) Il whitepaper, la seed phrase e l'Halving.
- [x] B) Il concatenamento crittografico dei blocchi, il registro distribuito su migliaia di nodi e il Proof of Work.
- [ ] C) La crittografia simmetrica, il modello UTXO e le mining pool.
- [ ] D) L'anonimato di Satoshi Nakamoto, il block explorer e il target.

# Q2
Cosa deve controllare un attaccante per poter tentare un attacco del 51%?
- [ ] A) La maggioranza degli indirizzi wallet registrati sulla rete.
- [x] B) La maggioranza dell'hash rate complessivo della rete.
- [ ] C) Il codice sorgente ufficiale del software Bitcoin.
- [ ] D) La maggioranza delle chiavi private di tutti gli utenti.

# Q3
Perché un attacco del 51% è considerato oggi economicamente proibitivo su Bitcoin?
- [ ] A) Perché è tecnicamente impossibile da realizzare.
- [x] B) Perché il costo in hardware ed energia necessario supera ampiamente il beneficio economico atteso.
- [ ] C) Perché la legge lo vieta esplicitamente in ogni paese del mondo.
- [ ] D) Perché richiederebbe la collaborazione di Satoshi Nakamoto.

# Q4
Perché, secondo il modulo, reti Blockchain più piccole di Bitcoin sono state effettivamente vittime in passato di attacchi del 51% riusciti?
- [ ] A) Perché usano un algoritmo di hash diverso da SHA-256.
- [x] B) Perché la sicurezza di una rete Proof of Work è proporzionale alle risorse computazionali che la proteggono, e un hash rate complessivo minore rende l'attacco più economicamente sostenibile.
- [ ] C) Perché quelle reti non utilizzano affatto il Proof of Work.
- [ ] D) Perché quelle reti non hanno mai adottato il modello UTXO.

# Q5
Cosa NON può fare, nemmeno in caso di successo, un attacco del 51%?
- [ ] A) Effettuare un double-spend a breve termine.
- [ ] B) Censurare temporaneamente alcune transazioni.
- [x] C) Rubare fondi da un wallet altrui senza conoscerne la chiave privata.
- [ ] D) Impedire temporaneamente ad altri miner di ottenere ricompense.

# Q6
Chi decide, in ultima analisi, se un fork del protocollo Bitcoin ha successo e viene adottato dalla rete?
- [ ] A) Esclusivamente il team originario di sviluppatori del software Bitcoin.
- [x] B) Il consenso volontario e distribuito di miner, sviluppatori, exchange e utenti.
- [ ] C) Un'votazione formale gestita da un'autorità di regolamentazione internazionale.
- [ ] D) Il miner che ha trovato il blocco più recente prima del fork.

# Q7
Qual è la differenza principale tra un soft fork e un hard fork?
- [x] A) Il soft fork è retrocompatibile, l'hard fork può generare una separazione permanente della rete.
- [ ] B) Il soft fork richiede sempre la creazione di una nuova criptovaluta.
- [ ] C) L'hard fork non modifica mai le regole del protocollo.
- [ ] D) Non esiste alcuna differenza pratica tra i due.

# Q8
Perché, secondo il modulo, il Proof of Work rende inefficace un Sybil Attack su Bitcoin?
- [ ] A) Perché il Sybil Attack richiede la conoscenza della chiave privata di tutti gli utenti.
- [x] B) Perché il potere decisionale non dipende dal numero di identità o nodi creati, ma dalla potenza di calcolo effettivamente investita.
- [ ] C) Perché ogni nodo della rete può creare un numero illimitato di identità senza alcuna conseguenza.
- [ ] D) Perché il Sybil Attack è stato reso impossibile dallo standard BIP-39.

# OPEN
Spiega con parole tue perché un attacco del 51% riuscito, per quanto costoso, non equivale a un controllo totale e illimitato sulla rete Bitcoin, collegando i suoi limiti intrinseci (cosa può e non può fare) ai meccanismi di sicurezza visti nei moduli precedenti (firma digitale, regole di emissione verificate dai full node); indica infine perché, storicamente, la maggior parte degli incidenti reali di sicurezza ha riguardato wallet ed exchange piuttosto che il protocollo stesso.