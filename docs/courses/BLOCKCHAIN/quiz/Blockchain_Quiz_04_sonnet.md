---
title: "Blockchain - M4 - Wallet, chiavi e firme digitali"
description: "Quiz di verifica finale sui concetti chiave del Modulo 4: cosa contiene davvero un wallet, catena chiave privata → chiave pubblica → indirizzo, seed phrase e standard BIP-39, tipi di wallet (hot/cold, custodial/non-custodial), flusso di firma digitale di una transazione, best practice di sicurezza e rischi comuni (phishing, wallet drainer, social engineering)."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa contiene effettivamente un wallet?
- [ ] A) Le criptovalute vere e proprie del proprietario.
- [x] B) Le chiavi crittografiche che permettono di dimostrare la proprietà dei fondi e firmare le transazioni.
- [ ] C) Una copia completa dell'intera Blockchain.
- [ ] D) I dati personali e anagrafici del proprietario.

# Q2
Nella catena di generazione chiave privata → chiave pubblica → indirizzo, quale elemento è corretto condividere pubblicamente per ricevere fondi?
- [ ] A) La chiave privata, poiché senza di essa nessuno potrebbe inviare fondi.
- [ ] B) Sia la chiave privata sia la chiave pubblica, insieme.
- [x] C) Solo l'indirizzo, l'ultimo anello della catena, derivato dalla chiave pubblica.
- [ ] D) Nessuno dei tre elementi va mai condiviso.

# Q3
Cos'è una seed phrase?
- [ ] A) Una password temporanea valida solo per una singola transazione.
- [x] B) Una sequenza di parole (standard BIP-39) da cui derivano tutte le chiavi private di un wallet gerarchico deterministico.
- [ ] C) L'indirizzo pubblico del wallet.
- [ ] D) Il nome scelto dall'utente per il proprio wallet.

# Q4
Perché la seed phrase viene definita, nel modulo, "l'informazione più sensibile dell'intero ecosistema Blockchain"?
- [ ] A) Perché senza di essa non è possibile ricevere fondi da altri utenti.
- [x] B) Perché conoscerla equivale a conoscere tutte le chiavi private, presenti e future, generate dal wallet.
- [ ] C) Perché deve essere rinnovata a ogni transazione effettuata.
- [ ] D) Perché è l'unico dato richiesto dagli exchange per aprire un conto.

# Q5
Qual è la differenza principale tra un Hot Wallet e un Cold Wallet?
- [ ] A) L'Hot Wallet è sempre più sicuro perché aggiornato costantemente.
- [x] B) L'Hot Wallet è connesso a Internet e più esposto ad attacchi, il Cold Wallet è offline e pensato per la custodia a lungo termine.
- [ ] C) Solo il Cold Wallet può generare un indirizzo pubblico.
- [ ] D) L'Hot Wallet non richiede alcuna chiave privata.

# Q6
Qual è la differenza principale tra un wallet custodial e uno non-custodial?
- [ ] A) Il custodial è sempre più sicuro del non-custodial.
- [x] B) Nel custodial le chiavi sono gestite da terzi, nel non-custodial dall'utente stesso.
- [ ] C) Il non-custodial non può ricevere fondi.
- [ ] D) Non c'è alcuna differenza pratica tra i due.

# Q7
Nel flusso di una transazione descritto nel modulo, cosa avviene nella fase di "Verifica" da parte dei nodi della rete?
- [ ] A) I nodi contattano il mittente per una conferma via email.
- [x] B) I nodi verificano la firma della transazione usando la chiave pubblica del mittente, nota a tutti.
- [ ] C) I nodi decifrano la chiave privata del mittente per autorizzare l'operazione.
- [ ] D) I nodi confrontano l'indirizzo IP del mittente con un elenco autorizzato.

# Q8
Perché, secondo il modulo, è matematicamente impossibile falsificare la firma digitale di una transazione senza conoscere la chiave privata corrispondente?
- [ ] A) Perché la firma viene generata da un'autorità centrale che la certifica.
- [x] B) Perché solo chi possiede la chiave privata può produrre una firma valida per quell'indirizzo, e la firma è verificabile da chiunque tramite la sola chiave pubblica.
- [ ] C) Perché ogni transazione viene firmata due volte da nodi diversi.
- [ ] D) Perché la firma digitale coincide sempre con l'indirizzo del wallet.

# OPEN
Spiega con parole tue perché un wallet "non contiene" davvero le criptovalute, collegando questo concetto al ruolo della seed phrase e al principio "Not your keys, not your coins"; indica poi quali comportamenti di sicurezza adotteresti concretamente per proteggere i tuoi fondi in un caso reale.