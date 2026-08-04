<a id="modulo-3"></a>

# 📘 Modulo 3 — La crittografia spiegata in modo semplice
## Come la matematica protegge la Blockchain

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
4. [Lezione 1 — Cos'è la crittografia](#lezione1)
5. [Lezione 2 — Perché nasce la crittografia](#lezione2)
6. [Lezione 3 — Dalla crittografia classica a quella moderna](#lezione3)
7. [Lezione 4 — Cifratura simmetrica e asimmetrica](#lezione4)
8. [Lezione 5 — Perché la Blockchain utilizza la crittografia](#lezione5)
9. [Riepilogo Parte 1](#riepilogo1)

---

<a id="introduzione"></a>

# 🌍 Introduzione

La Blockchain viene spesso descritta come una tecnologia sicura.

Ma da dove nasce questa sicurezza?

Molti pensano che dipenda da computer potentissimi o da software segreti.

In realtà il vero protagonista è un ramo della matematica chiamato **crittografia**.

Ogni volta che effettui un pagamento online, accedi al registro elettronico, invii un messaggio su WhatsApp oppure utilizzi lo SPID, la crittografia lavora dietro le quinte.

Anche la Blockchain esiste grazie ad essa.

In questo modulo scopriremo come funziona la crittografia senza utilizzare formule complicate, comprendendo i principi che permettono di proteggere dati, identità e transazioni.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>

# 🎯 Obiettivi formativi

Al termine del modulo sarai in grado di:

- comprendere cos'è la crittografia;
- distinguere un messaggio cifrato da uno in chiaro;
- conoscere le principali tecniche di cifratura;
- distinguere la crittografia simmetrica da quella asimmetrica;
- capire perché la Blockchain utilizza la crittografia.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>

# 📚 Prerequisiti

È consigliato aver completato i Moduli 1 e 2.

Non sono richieste conoscenze matematiche avanzate.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione1"></a>

# 🔐 Lezione 1 — Cos'è la crittografia

Immagina di voler inviare un messaggio molto importante a un tuo amico.

Non vuoi che altre persone possano leggerlo.

Come puoi fare?

Potresti inventare un linguaggio segreto.

Oppure sostituire ogni lettera con un simbolo.

Solo chi conosce la regola riuscirà a leggere il messaggio.

Questo è esattamente ciò che fa la crittografia.

La parola deriva dal greco:

- **Kryptós** = nascosto
- **Graphía** = scrittura

La crittografia è quindi l'arte di trasformare un messaggio leggibile in un messaggio incomprensibile per chi non possiede le informazioni necessarie per decifrarlo.

---

## Un esempio

Messaggio originale:

```text
CIAO MARCO
```

Messaggio cifrato:

```text
FLDR#PDUFR
```

Per chi osserva il testo sembra una sequenza casuale di caratteri.

Chi possiede la chiave corretta può invece ricostruire il messaggio originale.

---

## Due concetti fondamentali

### Testo in chiaro

È il messaggio leggibile.

Esempio:

```text
Domani verifica di Informatica.
```

---

### Testo cifrato

È il messaggio trasformato.

Chi non possiede la chiave non può comprenderne il contenuto.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione2"></a>

# 🏛️ Lezione 2 — Perché nasce la crittografia

La crittografia è molto più antica dei computer.

Già migliaia di anni fa i popoli cercavano modi per proteggere i messaggi militari.

Durante una guerra era fondamentale evitare che il nemico potesse leggere gli ordini destinati ai generali.

Per questo motivo vennero sviluppate numerose tecniche di cifratura.

Una delle più famose è il **Cifrario di Cesare**.

---

## Il cifrario di Cesare

Giulio Cesare sostituiva ogni lettera con quella successiva di tre posizioni.

Ad esempio:

| Lettera | Diventa |
|----------|----------|
| A | D |
| B | E |
| C | F |
| D | G |

La parola:

```text
ROMA
```

diventa:

```text
URPD
```

Chi non conosce la regola vede soltanto lettere apparentemente senza significato.

---

## Era davvero sicuro?

Per l'epoca sì.

Oggi assolutamente no.

Un computer moderno riuscirebbe a decifrarlo in una frazione di secondo.

Questo ci insegna una lezione importante.

La sicurezza evolve insieme alla tecnologia.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione3"></a>

# 💻 Lezione 3 — Dalla crittografia classica a quella moderna

Con l'arrivo dei computer tutto cambia.

I messaggi diventano digitali.

Non si tratta più di lettere scritte su carta.

Si tratta di milioni di bit che viaggiano attraverso Internet.

Proteggerli diventa molto più difficile.

Nascono così algoritmi matematici estremamente sofisticati.

Questi algoritmi non si limitano a sostituire lettere.

Utilizzano:

- numeri molto grandi;
- operazioni matematiche;
- proprietà dei numeri primi;
- funzioni difficili da invertire.

La sicurezza moderna non dipende dal segreto dell'algoritmo.

Dipende dalla difficoltà matematica del problema.

---

## Dove utilizzi già la crittografia?

Probabilmente molto più spesso di quanto immagini.

Ad esempio quando utilizzi:

- HTTPS;
- WhatsApp;
- Telegram;
- SPID;
- Carta di credito;
- Bancomat;
- Home Banking;
- Firma digitale;
- Carta d'identità elettronica;
- Blockchain.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione4"></a>

# 🔑 Lezione 4 — Cifratura simmetrica e asimmetrica

Esistono due grandi famiglie di algoritmi crittografici.

## Crittografia simmetrica

Si utilizza **una sola chiave**.

La stessa chiave serve sia per cifrare sia per decifrare il messaggio.

```text
Messaggio

   │

Chiave Segreta

   │

Messaggio Cifrato

   │

Stessa Chiave

   │

Messaggio Originale
```

È molto veloce.

Ha però un problema.

Come facciamo a consegnare la chiave all'altra persona senza farcela rubare?

---

## Crittografia asimmetrica

Per risolvere questo problema viene inventata una nuova idea.

Ogni utente possiede due chiavi.

- una pubblica;
- una privata.

La chiave pubblica può essere conosciuta da tutti.

La chiave privata deve rimanere segreta.

È proprio questo sistema che renderà possibile il funzionamento della Blockchain.

Ne parleremo approfonditamente nel prossimo modulo.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione5"></a>

# ⛓️ Lezione 5 — Perché la Blockchain utilizza la crittografia

La Blockchain non utilizza la crittografia per nascondere tutte le informazioni.

Al contrario.

Molte Blockchain sono completamente trasparenti.

La crittografia serve principalmente per:

- dimostrare l'identità del proprietario di un wallet;
- garantire che una transazione sia autentica;
- impedire modifiche ai dati;
- collegare tra loro i blocchi;
- verificare l'integrità delle informazioni.

Senza la crittografia sarebbe impossibile costruire una Blockchain sicura.

Nei prossimi moduli vedremo come vengono utilizzati:

- hash crittografici;
- chiavi pubbliche;
- chiavi private;
- firme digitali.

Questi strumenti costituiscono le fondamenta dell'intero ecosistema Blockchain.

---

<a id="riepilogo1"></a>

# 📌 Riepilogo Parte 1

In questa prima parte hai scoperto che:

- la crittografia protegge le informazioni;
- esiste fin dall'antichità;
- oggi viene utilizzata praticamente ovunque;
- esistono algoritmi simmetrici e asimmetrici;
- la Blockchain basa la propria sicurezza sulla matematica e sulla crittografia.

Nella seconda parte approfondiremo:

- gli hash crittografici;
- le funzioni hash;
- SHA-256;
- l'integrità dei dati;
- il collegamento tra i blocchi della Blockchain.

---

[🔙 Torna all'indice del modulo](#indice-modulo)
