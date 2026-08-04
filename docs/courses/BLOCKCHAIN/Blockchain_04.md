<a id="modulo-4"></a>

# 📘 Modulo 4 — Wallet, Chiavi e Firme Digitali
## Come dimostrare di essere il proprietario di una criptovaluta senza rivelare la propria identità

> **Livello:** Base  
> **Durata stimata:** 5 ore  
> **Laboratori:** 2  
> **Quiz:** 15 domande  
> **Challenge:** 1

---

<a id="indice-modulo"></a>

# 📑 Indice del Modulo

1. [Introduzione](#introduzione)
2. [Obiettivi formativi](#obiettivi)
3. [Prerequisiti](#prerequisiti)
4. [Lezione 1 — Cos'è un Wallet](#lezione1)
5. [Lezione 2 — Chiavi pubbliche e chiavi private](#lezione2)
6. [Lezione 3 — Gli indirizzi Blockchain](#lezione3)
7. [Lezione 4 — Le firme digitali](#lezione4)
8. [Lezione 5 — Come avviene una transazione](#lezione5)
9. [Riepilogo Parte 1](#riepilogo1)

---

<a id="introduzione"></a>

# 🌍 Introduzione

Una delle domande che viene posta più spesso quando si parla di Blockchain è:

> **"Dove vengono conservati i Bitcoin?"**

La risposta sorprende quasi tutti.

I Bitcoin, gli Ether e gli altri asset digitali **non vengono conservati all'interno del wallet**.

In realtà rimangono sempre registrati sulla Blockchain.

Il wallet serve a fare una cosa molto diversa.

Serve a dimostrare che sei autorizzato a utilizzare determinati fondi.

Per capire come sia possibile dobbiamo conoscere tre concetti fondamentali:

- le chiavi crittografiche;
- gli indirizzi Blockchain;
- le firme digitali.

Questi strumenti costituiscono il sistema di identificazione della Blockchain e permettono di effettuare transazioni in modo sicuro senza dover mostrare documenti d'identità o password.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>

# 🎯 Obiettivi formativi

Al termine del modulo sarai in grado di:

- spiegare cos'è un wallet;
- distinguere una chiave pubblica da una chiave privata;
- comprendere il ruolo degli indirizzi Blockchain;
- descrivere il funzionamento di una firma digitale;
- spiegare come viene autorizzata una transazione.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>

# 📚 Prerequisiti

Per affrontare questo modulo è consigliato aver completato i Moduli 1, 2 e 3.

È sufficiente comprendere i concetti fondamentali della crittografia introdotti nel modulo precedente.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione1"></a>

# 👛 Lezione 1 — Cos'è un Wallet

Quando sentiamo la parola **wallet**, pensiamo immediatamente a un portafoglio.

Il paragone è utile, ma non è completamente corretto.

Un portafoglio tradizionale contiene:

- banconote;
- monete;
- carte di credito;
- documenti.

Un wallet Blockchain, invece, **non contiene le criptovalute**.

Le criptovalute esistono soltanto come registrazioni all'interno della Blockchain.

Il wallet conserva invece le informazioni necessarie per dimostrare che il proprietario può autorizzare determinate operazioni.

In altre parole:

> Il wallet custodisce le **chiavi crittografiche**, non il denaro.

---

## Un esempio

Immagina una cassaforte custodita in una banca.

L'oro si trova all'interno della cassaforte.

Tu possiedi soltanto la chiave.

La chiave non è l'oro.

Ma senza quella chiave nessuno può aprire la cassaforte.

Il wallet svolge un ruolo molto simile.

---

## A cosa serve un wallet?

Con un wallet puoi:

- ricevere criptovalute;
- inviare criptovalute;
- firmare digitalmente una transazione;
- verificare il saldo del tuo indirizzo;
- interagire con Smart Contract e applicazioni Web3.

---

## Tipologie di wallet

Esistono numerose categorie.

Le più diffuse sono:

### Software Wallet

Applicazioni installate su computer o smartphone.

Esempi:

- MetaMask;
- Trust Wallet;
- Phantom;
- Rabby Wallet.

---

### Hardware Wallet

Dispositivi fisici progettati per conservare le chiavi private in modo estremamente sicuro.

Sono consigliati per custodire importi elevati.

---

### Paper Wallet

In passato era possibile stampare le chiavi su carta.

Oggi questa soluzione è poco utilizzata.

---

### Custodial Wallet

Le chiavi vengono gestite da un intermediario, ad esempio un exchange.

L'utente non possiede direttamente il controllo delle proprie chiavi.

---

### Non-Custodial Wallet

L'utente conserva personalmente le proprie chiavi private.

Questo è il modello preferito nell'ecosistema Web3.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione2"></a>

# 🔑 Lezione 2 — Chiavi pubbliche e chiavi private

Nel modulo precedente abbiamo introdotto la crittografia asimmetrica.

Adesso vediamo come viene utilizzata nella Blockchain.

Ogni wallet genera automaticamente due chiavi.

## La chiave privata

È il segreto più importante.

Può essere immaginata come la firma personale del proprietario.

Chiunque entri in possesso della chiave privata può controllare completamente il wallet.

Per questo motivo:

- non deve mai essere condivisa;
- non deve essere fotografata;
- non deve essere inviata tramite email;
- non deve essere pubblicata online.

Perdere la chiave privata significa perdere l'accesso ai propri asset digitali.

---

## La chiave pubblica

La chiave pubblica può essere condivisa liberamente.

Serve a identificare il proprietario e permette di verificare le firme digitali.

Conoscere una chiave pubblica non consente in alcun modo di ricavare la corrispondente chiave privata.

Questa proprietà è garantita dalla matematica e rende possibile la sicurezza dell'intero sistema.

---

## Un'analogia

Immagina una cassetta delle lettere.

L'indirizzo della casa è pubblico.

Chiunque può utilizzarlo per inviarti una lettera.

La chiave della cassetta postale, invece, è privata.

Solo tu puoi aprirla e leggere il contenuto.

Lo stesso principio viene utilizzato nella Blockchain.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione3"></a>

# 📬 Lezione 3 — Gli indirizzi Blockchain

Gli utenti non inviano criptovalute direttamente alle chiavi pubbliche.

Per praticità viene utilizzato un **indirizzo Blockchain**.

L'indirizzo è una versione semplificata della chiave pubblica.

Ad esempio, un indirizzo Ethereum potrebbe apparire così:

```text
0x4cbe58c50480...
```

Un indirizzo Bitcoin, invece, utilizza un formato differente.

Gli indirizzi sono pubblici.

Chiunque può conoscerli.

Chiunque può inviare fondi a quell'indirizzo.

Questo non rappresenta un rischio.

Infatti per spendere quei fondi è sempre necessaria la chiave privata.

---

## Una caratteristica interessante

Una persona può possedere:

- un solo indirizzo;
- decine di indirizzi;
- migliaia di indirizzi.

Molti wallet generano automaticamente nuovi indirizzi per migliorare la privacy.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione4"></a>

# ✍️ Lezione 4 — Le firme digitali

Come fa la rete a sapere che sei davvero il proprietario di un wallet?

La risposta è semplice.

Attraverso una **firma digitale**.

Quando invii una transazione, il wallet utilizza la chiave privata per creare una firma matematica unica.

La rete riceve:

- la transazione;
- la firma digitale;
- la chiave pubblica.

I nodi della Blockchain verificano automaticamente che la firma sia valida.

Se il controllo viene superato, la transazione può proseguire.

In caso contrario viene rifiutata.

---

## È una firma come quella su carta?

No.

Una firma autografa può essere imitata.

Una firma digitale basata sulla crittografia è praticamente impossibile da falsificare senza conoscere la chiave privata.

Per questo motivo viene utilizzata anche:

- nella Pubblica Amministrazione;
- nei contratti elettronici;
- nella firma di documenti;
- nelle comunicazioni sicure.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione5"></a>

# 💸 Lezione 5 — Come avviene una transazione

Vediamo l'intero processo.

Supponiamo che Alice voglia inviare una piccola quantità di criptovaluta a Marco.

Il wallet di Alice:

1. prepara la transazione;
2. utilizza la chiave privata per firmarla;
3. invia la transazione alla rete Blockchain.

A questo punto i nodi della rete:

- verificano la firma digitale;
- controllano che Alice disponga dei fondi necessari;
- verificano che la transazione non sia già stata utilizzata.

Se tutti i controlli hanno esito positivo, la transazione viene inserita tra quelle in attesa di essere registrate nel blocco successivo.

Tutto questo avviene in pochi secondi.

Senza banche.

Senza intermediari.

Senza autorizzazioni manuali.

Grazie esclusivamente alla crittografia e alla collaborazione dei nodi della rete.

---

<a id="riepilogo1"></a>

# 📌 Riepilogo Parte 1

In questa prima parte hai scoperto che:

- un wallet non conserva le criptovalute ma le chiavi crittografiche;
- ogni utente possiede una chiave privata e una chiave pubblica;
- gli indirizzi Blockchain derivano dalle chiavi pubbliche;
- le firme digitali dimostrano la proprietà di un wallet;
- una transazione viene autorizzata matematicamente prima di essere registrata nella Blockchain.

Nella seconda parte approfondiremo:

- la Seed Phrase;
- il recupero di un wallet;
- gli errori più comuni;
- la sicurezza dei wallet;
- gli attacchi informatici più frequenti e le buone pratiche per proteggere i propri asset digitali.

---

[🔙 Torna all'indice del modulo](#indice-modulo)
