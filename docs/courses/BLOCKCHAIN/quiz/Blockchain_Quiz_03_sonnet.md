---
title: "Blockchain - M3 - Crittografia per tutti"
description: "Quiz di verifica finale sui concetti chiave del Modulo 3: le tre funzioni della crittografia (integrità, riservatezza, autenticità), hashing come funzione one-way, crittografia simmetrica e il problema dello scambio delle chiavi, crittografia asimmetrica (coppia di chiavi), cifratura vs firma digitale, generazione dell'indirizzo wallet."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quale delle tre domande fondamentali, secondo il modulo, trova risposta nella crittografia asimmetrica attraverso la firma digitale?
- [ ] A) Integrità.
- [ ] B) Riservatezza.
- [x] C) Autenticità e proprietà.
- [ ] D) Velocità di calcolo.

# Q2
Qual è la funzione principale dell'hashing all'interno della crittografia?
- [ ] A) Nascondere completamente il contenuto di un messaggio.
- [x] B) Verificare l'integrità di un dato, rilevando eventuali modifiche.
- [ ] C) Generare automaticamente le chiavi private degli utenti.
- [ ] D) Velocizzare la trasmissione dei dati in rete.

# Q3
Perché è un errore pensare che l'hash di un documento sia una "versione cifrata" del documento stesso?
- [ ] A) Perché l'hash, a differenza della cifratura, permette sempre di risalire al documento originale.
- [x] B) Perché l'hash è un'impronta che certifica l'integrità del dato, non uno strumento pensato per nasconderne il contenuto.
- [ ] C) Perché l'hash cambia ogni volta che viene calcolato, anche a parità di input.
- [ ] D) Perché l'hash può essere calcolato solo da chi possiede la chiave privata.

# Q4
In cosa consiste il principio della crittografia simmetrica?
- [ ] A) Nell'uso di due chiavi distinte, una pubblica e una privata.
- [x] B) Nell'uso di un'unica chiave condivisa, impiegata sia per cifrare sia per decifrare il messaggio.
- [ ] C) Nell'assenza totale di qualsiasi chiave, poiché la sicurezza dipende solo dall'algoritmo.
- [ ] D) Nell'uso di una chiave diversa per ogni singola lettera del messaggio.

# Q5
Qual è il principale problema pratico della crittografia simmetrica in un sistema aperto come la Blockchain?
- [ ] A) È troppo lenta per essere utilizzata su larga scala.
- [x] B) Richiede uno scambio sicuro della chiave segreta tra utenti sconosciuti tra loro.
- [ ] C) Non permette di cifrare messaggi più lunghi di poche parole.
- [ ] D) Non è compatibile con gli algoritmi di hashing.

# Q6
Qual è il principio rivoluzionario alla base della crittografia asimmetrica?
- [ ] A) L'uso di un'unica chiave, ma cambiata ogni giorno.
- [x] B) Ogni utente genera una coppia di chiavi matematicamente collegate: una pubblica, condivisibile liberamente, e una privata, segreta.
- [ ] C) L'eliminazione totale del bisogno di qualsiasi chiave crittografica.
- [ ] D) L'uso della stessa chiave pubblica per tutti gli utenti della rete.

# Q7
Cosa si ottiene cifrando un messaggio con la chiave pubblica del destinatario?
- [x] A) Un messaggio leggibile solo dal possessore della corrispondente chiave privata: riservatezza.
- [ ] B) Una firma digitale verificabile da chiunque.
- [ ] C) Un hash del messaggio originale.
- [ ] D) Nessun effetto, poiché la chiave pubblica non può essere usata per cifrare.

# Q8
Quando Alice firma digitalmente una transazione con la propria chiave privata, cosa possono fare gli altri nodi della rete?
- [ ] A) Risalire alla chiave privata di Alice a partire dalla firma.
- [x] B) Verificare l'autenticità della firma usando la chiave pubblica di Alice, senza conoscerne la chiave privata.
- [ ] C) Modificare la transazione mantenendo valida la firma originale.
- [ ] D) Firmare a loro volta transazioni a nome di Alice.

# OPEN
Spiega con parole tue perché la crittografia simmetrica da sola non è adatta a un sistema aperto come la Blockchain, e come la crittografia asimmetrica risolve questo limite; illustra poi, con parole tue, la differenza tra usare la coppia di chiavi per ottenere riservatezza e usarla per ottenere una firma digitale.