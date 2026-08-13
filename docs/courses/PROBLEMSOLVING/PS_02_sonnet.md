# 🧠 M2 — Dati, Informazioni e Conoscenza

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Problem Solving — Il metodo prima del codice

---

> **"Un computer elabora dati, ma è l'essere umano che attribuisce loro un significato."**

---

## Cosa imparerai in questo modulo

Negli algoritmi che abbiamo iniziato a costruire in M0 e M1 abbiamo sempre parlato di "input" e "output" senza soffermarci davvero su cosa siano, nel profondo, questi dati. In questo modulo colmiamo questa lacuna: imparerai a distinguere con precisione **dato**, **informazione** e **conoscenza** — tre concetti che sembrano sinonimi nel linguaggio comune, ma che in Informatica hanno significati molto diversi e strettamente collegati. Vedrai come un computer "vede" i numeri che elabora, come riconoscere input e output in qualsiasi problema, quali tipologie di dati incontrerai lungo tutto il corso, e perché la **qualità** e la **validazione** dei dati sono un prerequisito indispensabile per qualsiasi algoritmo corretto.

---

<a id="indice-modulo"></a>

## Indice del Modulo 2

- [2.1 Perché è importante parlare di dati?](#21-perche-e-importante-parlare-di-dati)
- [2.2 Che cos'è un dato?](#22-che-cose-un-dato)
- [2.3 Che cos'è un'informazione?](#23-che-cose-uninformazione)
- [2.4 Che cos'è la conoscenza?](#24-che-cose-la-conoscenza)
- [2.5 Dalla piramide dato-informazione-conoscenza](#25-dalla-piramide-dato-informazione-conoscenza)
- [2.6 Il ruolo del computer](#26-il-ruolo-del-computer)
- [2.7 I dati in un algoritmo: Input e Output](#27-i-dati-in-un-algoritmo-input-e-output)
- [2.8 Esempio guidato — Area del rettangolo](#28-esempio-guidato-area-del-rettangolo)
- [2.9 Tipologie di dati](#29-tipologie-di-dati)
- [2.10 Dati semplici e dati composti](#210-dati-semplici-e-dati-composti)
- [2.11 Qualità dei dati](#211-qualita-dei-dati)
- [2.12 L'importanza della validazione](#212-limportanza-della-validazione)
- [2.13 Esempio completo — Costo totale di due prodotti](#213-esempio-completo-costo-totale-di-due-prodotti)
- [Esercizi del Modulo 2](#esercizi-del-modulo-2)
- [Quiz di autovalutazione](#quiz-di-autovalutazione)
- [Riepilogo del Modulo 2](#riepilogo-del-modulo-2)

---

<a id="21-perche-e-importante-parlare-di-dati"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 2.1 Perché è importante parlare di dati?

Ogni programma, dal più semplice al più complesso, lavora elaborando dati. Pensiamo ad alcuni esempi.

- Un bancomat elabora importi e codici PIN.
- Un videogioco elabora punteggi e posizioni dei personaggi.
- Un navigatore satellitare elabora coordinate geografiche.
- Un registro elettronico elabora voti, assenze e note disciplinari.

L'algoritmo rappresenta il **procedimento**. I dati rappresentano la **materia prima** su cui l'algoritmo lavora.

Un algoritmo perfetto applicato a dati sbagliati produrrà comunque un risultato sbagliato: per questo motivo, prima ancora di progettare l'elaborazione, un buon informatico dedica tempo a capire *con che tipo di dati* avrà a che fare.

---

<a id="22-che-cose-un-dato"></a>

## 2.2 Che cos'è un dato?

Un **dato** è un valore elementare che descrive un fatto, una misura o una caratteristica. Da solo, un dato ha spesso un significato limitato.

Esempi di dati:

- `25`
- `Roma`
- `18,5`
- `Verde`
- `VERO`
- `A12345`

Sono tutti dati, ma senza un contesto è difficile comprenderne il significato reale.

### Esempio

Il numero

```
28
```

può rappresentare:

- l'età di una persona;
- il voto di un esame universitario;
- la temperatura esterna;
- il numero di studenti di una classe;
- il giorno del mese.

Lo stesso dato può assumere significati completamente diversi. Serve quindi il **contesto**.

> 💡 **Approfondimento** — Questa ambiguità non è un difetto del dato, ma la sua natura stessa: un dato è "grezzo" per definizione. È compito di chi progetta l'algoritmo (tu) attribuirgli un nome e un significato chiaro fin dalla fase di analisi, così che non ci sia più ambiguità nel resto del programma.

---

<a id="23-che-cose-uninformazione"></a>

## 2.3 Che cos'è un'informazione?

Un'**informazione** nasce quando uno o più dati vengono interpretati all'interno di un contesto.

Dato:

```
28
```

Informazione:

```
La temperatura esterna è di 28 °C.
```

Oppure, con lo stesso identico valore:

```
La classe è composta da 28 studenti.
```

Il valore è identico. Ciò che cambia è il **significato**, dato dal contesto in cui il dato viene inserito.

---

<a id="24-che-cose-la-conoscenza"></a>

## 2.4 Che cos'è la conoscenza?

La **conoscenza** nasce quando utilizziamo una o più informazioni per prendere decisioni.

Informazione:

```
La temperatura è di 38 °C.
```

Conoscenza:

```
È consigliabile evitare attività sportive nelle ore più calde.
```

La conoscenza deriva quindi dall'esperienza, dal ragionamento e dall'interpretazione delle informazioni: non è più un dato "grezzo", né una semplice informazione contestualizzata, ma il risultato di un ragionamento applicato a quell'informazione.

---

<a id="25-dalla-piramide-dato-informazione-conoscenza"></a>

## 2.5 Dalla piramide dato-informazione-conoscenza

Possiamo rappresentare il processo che unisce i tre concetti visti finora nel seguente modo.

```
       DATI
        │
        ▼
   Elaborazione
        │
        ▼
   INFORMAZIONI
        │
        ▼
  Interpretazione
        │
        ▼
   CONOSCENZA
```

| Livello | Domanda a cui risponde | Esempio |
|---|---|---|
| Dato | "Che valore ho?" | `28` |
| Informazione | "Che cosa significa questo valore?" | "La temperatura è di 28 °C" |
| Conoscenza | "Che cosa devo fare, sapendo questo?" | "Posso uscire senza giacca" |

Questa distinzione è molto importante anche in ambiti che studierai più avanti nel tuo percorso, come l'Intelligenza Artificiale: un modello che elabora enormi quantità di dati non "sa" nulla finché quei dati non vengono trasformati in informazioni, e le informazioni non diventano davvero utili finché non vengono interpretate per prendere una decisione.

---

<a id="26-il-ruolo-del-computer"></a>

## 2.6 Il ruolo del computer

Il computer **non comprende** il significato dei dati. Esso esegue semplicemente operazioni sui valori memorizzati.

```
15 + 12 = 27
```

Per il computer sono solamente numeri. Sarà l'utente ad attribuire loro un significato: potrebbero rappresentare euro, chilometri, studenti, punti, chilogrammi.

> ⚠️ **Attenzione** — È proprio per questo motivo che, come abbiamo visto nel Modulo 0, "il computer non ragiona": non distingue un dato sensato da uno privo di senso, a meno che non sia l'algoritmo stesso — cioè tu, chi lo progetta — a inserire un controllo esplicito. Approfondiremo questo aspetto tra poco, parlando di validazione dei dati.

---

<a id="27-i-dati-in-un-algoritmo-input-e-output"></a>

## 2.7 I dati in un algoritmo: Input e Output

Ogni algoritmo utilizza generalmente due categorie di dati.

### Input

Sono i dati forniti dall'utente o da altri sistemi. Esempi: nome, età, prezzo, voto, temperatura.

### Output

Sono i risultati prodotti dall'algoritmo. Esempi: media dei voti, area del rettangolo, importo finale, messaggio visualizzato.

Riconoscere correttamente quali dati sono input e quali sono output è, come già visto in M1, uno dei primi passi di ogni analisi: un errore comune tra i principianti è confondere un dato che dovrebbe essere calcolato (output) con un dato che si presume già disponibile (input).

---

<a id="28-esempio-guidato-area-del-rettangolo"></a>

## 2.8 Esempio guidato — Area del rettangolo

### Problema

Calcolare l'area di un rettangolo.

### Input

- base
- altezza

### Elaborazione

```
area = base × altezza
```

### Output

Area del rettangolo.

### Schema

```
Base
   │
Altezza
   │
   ▼
Calcolo
   │
   ▼
 Area
```

Nota come questo schema sia già, di fatto, una versione semplificata del Flow Chart che studieremo formalmente nel Modulo 5: input a sinistra, elaborazione al centro, output in fondo.

---

<a id="29-tipologie-di-dati"></a>

## 2.9 Tipologie di dati

Durante il corso utilizzeremo principalmente quattro categorie di dati.

| Tipo | Esempio |
|------|----------|
| Numerici interi | 15, -8, 250 |
| Numerici reali | 3.14, 18.5 |
| Testo | "Mario", "Roma" |
| Logici | VERO, FALSO |

Questi tipi saranno approfonditi formalmente quando studieremo le variabili, nel Modulo 7: per ora è sufficiente saperli riconoscere all'interno di un testo di problema, così da poterli annotare correttamente in fase di analisi.

> 💡 **Approfondimento** — In Python questi quattro tipi corrisponderanno rispettivamente a `int`, `float`, `str` e `bool`: da qui la scelta di introdurli fin da ora, in modo che quando li incontrerai nel codice non saranno concetti nuovi, ma semplicemente nomi diversi per idee che già conosci.

---

<a id="210-dati-semplici-e-dati-composti"></a>

## 2.10 Dati semplici e dati composti

Un dato può essere costituito da un solo valore oppure da più valori collegati tra loro.

### Dato semplice

```
Età = 16
```

Un unico valore, un unico significato.

### Dato composto

Uno studente può essere descritto mediante più dati collegati:

- nome;
- cognome;
- età;
- classe;
- media.

In questo caso non abbiamo un singolo valore isolato, ma un insieme coerente di dati che, tutti insieme, descrivono un'unica entità: lo studente.

> 💡 **Approfondimento** — I dati composti diventeranno particolarmente rilevanti quando, in percorsi più avanzati di programmazione, incontrerai strutture come liste, dizionari o classi. Per ora è sufficiente imparare a riconoscerli in fase di analisi: "quanti dati distinti descrivono questa entità?".

---

<a id="211-qualita-dei-dati"></a>

## 2.11 Qualità dei dati

Un algoritmo produce risultati corretti solo se riceve dati corretti. Per questo motivo i dati devono essere:

- completi;
- corretti;
- coerenti;
- aggiornati;
- affidabili.

### Esempio

Problema: calcolare la media di tre voti.

Input:

```
8
9
A
```

Il terzo dato non è corretto: non è un numero. L'algoritmo non può eseguire il calcolo.

Questo mostra quanto sia importante controllare i dati in ingresso **prima** di elaborarli, non dopo aver già ottenuto un errore o un risultato privo di senso.

---

<a id="212-limportanza-della-validazione"></a>

## 2.12 L'importanza della validazione

Prima di utilizzare un dato è buona norma verificarne la correttezza.

Età:

```
-12
```

non rappresenta un valore valido: un'età non può essere negativa.

Voto:

```
35
```

non è ammesso se la scala dei voti va da 1 a 10.

Questa operazione prende il nome di **validazione dei dati**. Nei moduli successivi — in particolare M11 e M12, dedicati alla Selezione — impareremo come realizzarla concretamente mediante strutture di controllo, capaci di verificare una condizione ed eventualmente rifiutare o segnalare un dato non valido prima che l'algoritmo prosegua.

---

<a id="213-esempio-completo-costo-totale-di-due-prodotti"></a>

## 2.13 Esempio completo — Costo totale di due prodotti

### Problema

Calcolare il costo totale di due prodotti.

### Analisi

**Input**

- prezzo1
- prezzo2

**Elaborazione**

```
totale = prezzo1 + prezzo2
```

**Output**

Totale della spesa.

### Flow Chart (concettuale)

```
      ┌─────────┐
      │ INIZIO  │
      └────┬────┘
           │
           ▼
  Leggi prezzo1
           │
           ▼
  Leggi prezzo2
           │
           ▼
Totale = prezzo1 + prezzo2
           │
           ▼
 Visualizza totale
           │
           ▼
      ┌─────────┐
      │  FINE   │
      └─────────┘
```

### Flowgorithm

```
Start

Input prezzo1
Input prezzo2

totale = prezzo1 + prezzo2

Output totale

End
```

### Python

```python
prezzo1 = float(input("Prezzo primo prodotto: "))
prezzo2 = float(input("Prezzo secondo prodotto: "))

totale = prezzo1 + prezzo2

print("Totale =", totale)
```

Osserva come, ancora una volta, l'intero percorso — dall'analisi dei dati fino al codice Python — segua esattamente lo stesso schema visto in M0 e M1: individuare i dati (questo modulo), progettare l'algoritmo, rappresentarlo con Flow Chart e Flowgorithm, tradurlo in Python.

---

## ✅ Best Practice

✔ Individuare sempre input e output prima di scrivere qualsiasi algoritmo.

✔ Controllare che i dati siano corretti prima di elaborarli.

✔ Dare un nome significativo ai dati (`prezzo1`, non `x`).

✔ Distinguere chiaramente dati, informazioni e risultati.

✔ Annotare i vincoli sui dati già durante la fase di analisi.

## ❌ Errori comuni

❌ Confondere dato e informazione.

❌ Utilizzare dati senza verificarli.

❌ Ignorare il contesto in cui un dato assume significato.

❌ Non distinguere input e output.

❌ Assegnare nomi poco significativi ai dati.

---

<a id="esercizi-del-modulo-2"></a>

## 🧪 Esercizi del Modulo 2

**Esercizio 1 — Individuare input, elaborazione e output**

Per ciascuna situazione individua dati di ingresso, elaborazione e dati di uscita:

1. Calcolare lo stipendio mensile.
2. Calcolare il perimetro di un quadrato.
3. Calcolare la media di quattro voti.
4. Convertire euro in dollari.

**Esercizio 2 — Dato, informazione o conoscenza?**

Indica se i seguenti esempi rappresentano un dato, un'informazione o una conoscenza:

1. `36`
2. "L'automobile viaggia a 130 km/h."
3. "Con il serbatoio quasi vuoto è opportuno fare rifornimento."
4. "Mario ha ottenuto 9 nella verifica di Informatica."
5. `VERO`

**Esercizio 3 — Laboratorio guidato**

Per ciascuno dei problemi dell'Esercizio 1:

1. individua input e output;
2. descrivi l'elaborazione necessaria;
3. disegna il Flow Chart;
4. realizza l'algoritmo in Flowgorithm;
5. traducilo in Python;
6. verifica il corretto funzionamento con almeno tre casi di prova, includendo un caso limite (es. un dato non valido).

---

<a id="quiz-di-autovalutazione"></a>

## 📝 Quiz di autovalutazione

**1. Che cos'è un dato?**

A. Un algoritmo.

B. Un valore elementare.

C. Un programma.

D. Una variabile.

---

**2. Quando un dato diventa informazione?**

A. Quando viene cancellato.

B. Quando viene interpretato in un contesto.

C. Quando viene stampato.

D. Quando viene memorizzato.

---

**3. Gli input rappresentano:**

A. I risultati finali.

B. I dati iniziali.

C. Gli errori.

D. I commenti.

---

**4. Perché è importante validare i dati?**

A. Per rendere il programma più lungo.

B. Per evitare elaborazioni su valori non corretti.

C. Per aumentare la memoria disponibile.

D. Per velocizzare il computer.

---

**5. Quale delle seguenti affermazioni descrive meglio la "conoscenza", rispetto a dato e informazione?**

A. È lo stesso valore memorizzato nel computer, senza alcuna interpretazione.

B. È un'informazione interpretata e utilizzata per prendere una decisione.

C. È un valore numerico privo di contesto.

D. È l'output diretto di un'operazione aritmetica.

---

<a id="riepilogo-del-modulo-2"></a>

## 📚 Riepilogo del Modulo 2

In questo modulo abbiamo imparato a distinguere **dato**, **informazione** e **conoscenza**, comprendendo il ruolo centrale dei dati nella progettazione degli algoritmi.

Abbiamo inoltre visto come identificare gli **input**, gli **output** e l'elaborazione necessaria per risolvere un problema, quali sono le principali tipologie di dati che incontreremo nel corso, e perché la **qualità** e la **validazione** dei dati sono un prerequisito indispensabile per ottenere risultati corretti.

Nel prossimo modulo inizieremo a studiare uno degli strumenti fondamentali dell'Informatica: **gli algoritmi**, imparando quali caratteristiche devono possedere e come descrivere correttamente, con precisione e senza ambiguità, una procedura risolutiva.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*