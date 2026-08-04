<a id="modulo-2"></a>

# 📘 Modulo 2 — Come funziona una Blockchain
## Alla scoperta del registro distribuito

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
4. [Lezione 1 — Cos'è una Blockchain](#lezione1)
5. [Lezione 2 — Il registro distribuito](#lezione2)
6. [Lezione 3 — I blocchi](#lezione3)
7. [Lezione 4 — Le transazioni](#lezione4)
8. [Lezione 5 — Come nasce un blocco](#lezione5)
9. [Riepilogo Parte 1](#riepilogo1)

---

<a id="introduzione"></a>

# 🌍 Introduzione

Nel modulo precedente abbiamo scoperto **perché** è nata la Blockchain.

Adesso è arrivato il momento di capire **come funziona**.

Molti immaginano la Blockchain come qualcosa di misterioso o estremamente complicato.

In realtà l'idea alla base è sorprendentemente semplice.

Immagina un enorme quaderno.

Ogni pagina contiene un elenco di operazioni.

Quando una pagina è piena viene chiusa definitivamente.

Successivamente se ne apre una nuova.

Ogni pagina contiene anche un riferimento alla precedente.

Se qualcuno provasse a modificare una pagina vecchia, tutte le pagine successive diventerebbero immediatamente incoerenti.

Questa semplice idea costituisce il cuore della Blockchain.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>

# 🎯 Obiettivi formativi

Al termine del modulo saprai:

- definire correttamente una Blockchain;
- distinguere blocchi e transazioni;
- comprendere il concetto di registro distribuito;
- spiegare perché la Blockchain è difficile da modificare;
- descrivere come vengono aggiunti nuovi blocchi.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>

# 📚 Prerequisiti

Per affrontare questo modulo è sufficiente aver completato il Modulo 1.

Non sono richieste conoscenze di matematica avanzata o programmazione.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione1"></a>

# 📦 Lezione 1 — Cos'è una Blockchain

La parola **Blockchain** è composta da due termini inglesi.

- **Block** = blocco
- **Chain** = catena

Letteralmente significa:

> **Catena di blocchi**

Ogni blocco contiene informazioni.

Quando il blocco è completo viene collegato al precedente.

Successivamente ne viene creato uno nuovo.

Nel tempo si forma una lunga catena.

```text
┌──────────┐
│ Blocco 1 │
└────┬─────┘
     │
┌────▼─────┐
│ Blocco 2 │
└────┬─────┘
     │
┌────▼─────┐
│ Blocco 3 │
└────┬─────┘
     │
┌────▼─────┐
│ Blocco 4 │
└──────────┘
```

Ogni blocco conosce quello precedente.

Per questo motivo tutta la struttura rimane collegata.

---

## Un esempio della vita quotidiana

Immagina un registro di classe.

Ogni giorno il docente scrive:

- presenze;
- assenze;
- voti;
- annotazioni.

Una volta terminata la pagina, non viene più modificata.

Si passa alla successiva.

La Blockchain funziona con un principio molto simile.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione2"></a>

# 🌐 Lezione 2 — Il registro distribuito

La vera novità della Blockchain non è rappresentata dai blocchi.

La vera rivoluzione è il fatto che **non esiste una sola copia del registro**.

Esistono migliaia di copie identiche.

Ogni computer partecipante conserva il proprio registro.

```text
Nodo A
   │
Nodo B
   │
Nodo C
   │
Nodo D
   │
Nodo E
```

Ogni nodo possiede la stessa cronologia.

Quando arriva una nuova operazione, tutti aggiornano il proprio registro.

Per questo motivo si parla di:

## Registro Distribuito

oppure

## Distributed Ledger

---

### Perché è importante?

Se un computer si rompe...

...gli altri continuano a funzionare.

Se un nodo viene spento...

...la rete continua normalmente.

Non esiste un unico punto di controllo.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione3"></a>

# 🧱 Lezione 3 — I blocchi

Ogni blocco può essere immaginato come una scatola.

All'interno vengono inserite numerose informazioni.

Tra queste troviamo:

- elenco delle transazioni;
- data e ora;
- riferimento al blocco precedente;
- identificatore del blocco.

Quando il blocco raggiunge la capacità prevista, viene chiuso definitivamente.

Successivamente ne viene creato uno nuovo.

```text
+------------------------+
| BLOCCO                 |
|------------------------|
| Transazione 1          |
| Transazione 2          |
| Transazione 3          |
| ...                    |
| Hash blocco precedente |
+------------------------+
```

Ogni blocco rappresenta una fotografia dello stato della rete in un determinato momento.

---

### Curiosità

Nel caso di Bitcoin viene creato mediamente un nuovo blocco ogni circa 10 minuti.

Altre Blockchain utilizzano tempi molto più rapidi.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione4"></a>

# 💸 Lezione 4 — Le transazioni

Una Blockchain registra eventi.

Nel caso di Bitcoin questi eventi sono principalmente trasferimenti di denaro.

Ogni trasferimento prende il nome di:

## Transazione

Una transazione contiene informazioni come:

- mittente;
- destinatario;
- importo;
- data;
- firma digitale.

Esempio:

```text
Marco → Laura → 0,50 BTC
```

oppure

```text
Alice → Bob → 25 Token
```

Le transazioni vengono raccolte.

Quando sono sufficienti vengono inserite nel blocco successivo.

---

### Importante

Le transazioni non vengono aggiunte immediatamente alla Blockchain.

Prima vengono controllate.

Solo successivamente entreranno a far parte di un nuovo blocco.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione5"></a>

# ⚙️ Lezione 5 — Come nasce un blocco

Immagina una sala d'attesa.

Le nuove transazioni arrivano continuamente.

All'inizio rimangono in attesa.

Successivamente vengono controllate.

Infine vengono inserite in un nuovo blocco.

Il processo può essere rappresentato così.

```text
Nuove Transazioni

        │

        ▼

Verifica

        │

        ▼

Nuovo Blocco

        │

        ▼

Blockchain
```

Questo processo si ripete continuamente.

24 ore al giorno.

365 giorni all'anno.

Da oltre quindici anni.

Milioni di computer collaborano per mantenere aggiornato il registro.

---

<a id="riepilogo1"></a>

# 📌 Riepilogo Parte 1

In questa prima parte hai imparato che:

- una Blockchain è una catena di blocchi;
- ogni blocco contiene numerose transazioni;
- tutti i computer conservano una copia del registro;
- il registro è distribuito e non centralizzato;
- nuovi blocchi vengono aggiunti continuamente;
- ogni blocco è collegato al precedente.

Nella seconda parte entreremo ancora più in profondità studiando:

- l'hash;
- il collegamento tra i blocchi;
- l'immutabilità;
- perché modificare una Blockchain è così difficile.

---

[🔙 Torna all'indice del modulo](#indice-modulo)
