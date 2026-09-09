---
title: "Blockchain - M2 - Come funziona una Blockchain"
description: "Quiz di verifica finale sui concetti chiave del Modulo 2: anatomia di un blocco, funzione di hash e sue proprietà, concatenamento e immutabilità, effetto valanga in caso di manomissione, registro distribuito, problema del consenso e Sybil Attack, panoramica su Proof of Work e Proof of Stake."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quale dei seguenti elementi NON fa parte della struttura di un blocco, come descritto nel modulo?
- [ ] A) L'hash del blocco corrente.
- [ ] B) L'hash del blocco precedente.
- [x] C) La chiave privata del proprietario dei fondi.
- [ ] D) Il nonce.

# Q2
Quale elemento, contenuto in ogni blocco, permette fisicamente di "concatenare" un blocco a quello precedente?
- [ ] A) Il timestamp.
- [ ] B) Il nonce.
- [x] C) L'hash del blocco precedente.
- [ ] D) L'indirizzo IP del nodo che lo ha creato.

# Q3
Quale, tra le seguenti, NON è una delle tre proprietà della funzione di hash descritte nel modulo?
- [ ] A) Deterministica: lo stesso input produce sempre lo stesso output.
- [ ] B) Effetto valanga: una minima modifica dell'input cambia completamente l'output.
- [ ] C) Unidirezionalità: è impossibile risalire all'input partendo dall'hash.
- [x] D) Reversibilità: è sempre possibile ricostruire l'input originale a partire dall'hash.

# Q4
Cosa si intende per "effetto valanga" (avalanche effect) in una funzione di hash?
- [ ] A) La velocità con cui la rete elabora le transazioni.
- [x] B) Il fatto che una minima modifica dell'input produca un hash completamente diverso.
- [ ] C) L'aumento del numero di nodi nel tempo.
- [ ] D) La perdita di dati durante il calcolo dell'hash.

# Q5
Perché la modifica di un blocco "vecchio" nella catena viene rilevata dagli altri partecipanti della rete?
- [ ] A) Perché ogni transazione è firmata da un notaio digitale.
- [x] B) Perché il nuovo hash del blocco modificato non corrisponde più all'"hash precedente" registrato nel blocco successivo.
- [ ] C) Perché i nodi comunicano via email ogni modifica.
- [ ] D) Perché la Blockchain invia una notifica automatica a tutti gli utenti.

# Q6
Perché, nella pratica, risulta estremamente difficile per un attaccante "riparare" la catena ricalcolando anche gli hash di tutti i blocchi successivi a quello manomesso?
- [ ] A) Perché la legge lo vieta esplicitamente.
- [ ] B) Perché il nonce non può mai essere modificato una volta scritto.
- [x] C) Perché la rete possiede migliaia di copie identiche della catena distribuite nel mondo, rendendo l'operazione computazionalmente troppo onerosa.
- [ ] D) Perché ogni blocco può essere modificato una sola volta nella sua esistenza.

# Q7
Quale, tra i seguenti, è un vantaggio della natura distribuita del registro (ogni nodo possiede una copia completa) illustrato nel modulo?
- [ ] A) Riduce drasticamente lo spazio di archiviazione necessario complessivamente.
- [ ] B) Permette a un solo nodo di modificare la catena per tutti gli altri.
- [x] C) Elimina il punto unico di guasto e rende la rete resistente alla censura, perché non esiste un'unica copia da attaccare o bloccare.
- [ ] D) Garantisce automaticamente che tutte le transazioni siano gratuite.

# Q8
Cosa rappresenta, in sintesi, il "Problema del Consenso" descritto nel modulo?
- [ ] A) Come scegliere il colore dell'interfaccia grafica di un wallet.
- [x] B) Come far accordare nodi sconosciuti e potenzialmente disonesti su un'unica versione valida del registro, senza autorità centrale.
- [ ] C) Come velocizzare la connessione Internet dei nodi.
- [ ] D) Come stabilire il prezzo di una criptovaluta.

# OPEN
Spiega con parole tue in che modo le proprietà della funzione di hash (in particolare l'effetto valanga) rendono possibile l'immutabilità della Blockchain, e collega questo meccanismo al problema del consenso: perché non basta che la catena sia "immutabile e concatenata" se poi migliaia di nodi sconosciuti devono comunque accordarsi su quale sia la versione valida da considerare?