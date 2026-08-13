# 🧠 M1 — Il processo di risoluzione dei problemi

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Problem Solving — Il metodo prima del codice

---

> **"Un problema ben analizzato è già a metà della sua soluzione."**

---

## Cosa imparerai in questo modulo

In M0 abbiamo scoperto che il Problem Solving è la capacità di affrontare un problema in modo razionale, prima ancora di scrivere codice. In questo modulo trasformiamo quell'idea generale in un **processo operativo**, fatto di fasi precise e ripetibili, che userai per ogni singolo esercizio da qui fino all'ultimo modulo del corso. Vedrai perché seguire un metodo riduce drasticamente gli errori, imparerai a distinguere comprensione, analisi, progettazione e implementazione, e scoprirai come riconoscere input, output e vincoli in qualsiasi problema ti venga proposto. Chiuderemo il modulo con un esempio guidato completo, dal testo del problema fino al programma Python funzionante, e con il ciclo iterativo che ogni informatico applica quando la prima soluzione non è ancora quella giusta.

---

<a id="indice-modulo"></a>

## Indice del Modulo 1

- [1.1 Perché seguire un metodo?](#11-perche-seguire-un-metodo)
- [1.2 Le fasi del Problem Solving](#12-le-fasi-del-problem-solving)
- [1.3 Fase 1 — Comprendere il problema](#13-fase-1-comprendere-il-problema)
- [1.4 Fase 2 — Analizzare il problema](#14-fase-2-analizzare-il-problema)
- [1.5 Fase 3 — Individuare la strategia](#15-fase-3-individuare-la-strategia)
- [1.6 Fase 4 — Scrivere l'algoritmo](#16-fase-4-scrivere-lalgoritmo)
- [1.7 Fase 5 — Disegnare il Flow Chart](#17-fase-5-disegnare-il-flow-chart)
- [1.8 Fase 6 — Implementare in Flowgorithm](#18-fase-6-implementare-in-flowgorithm)
- [1.9 Fase 7 — Tradurre in Python](#19-fase-7-tradurre-in-python)
- [1.10 Fase 8 — Verificare la soluzione](#110-fase-8-verificare-la-soluzione)
- [1.11 Il ciclo del Problem Solving](#111-il-ciclo-del-problem-solving)
- [1.12 Esempio guidato completo](#112-esempio-guidato-completo)
- [Esercizi del Modulo 1](#esercizi-del-modulo-1)
- [Quiz di autovalutazione](#quiz-di-autovalutazione)
- [Riepilogo del Modulo 1](#riepilogo-del-modulo-1)

---

<a id="11-perche-seguire-un-metodo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 1.1 Perché seguire un metodo?

Quando affrontiamo un problema possiamo agire in due modi molto diversi.

Il primo consiste nel **procedere per tentativi**: si prova a scrivere qualcosa, si osserva se funziona, si corregge, si riprova. È il modo in cui molti principianti affrontano i primi esercizi.

Il secondo consiste nell'**adottare un metodo preciso**: prima si comprende il problema, poi lo si analizza, poi si progetta una soluzione, e solo alla fine si scrive codice.

L'Informatica — quella professionale, non quella "improvvisata" dei tutorial copiati senza capire — utilizza sempre il secondo approccio.

Seguire un metodo permette di:

- ridurre gli errori;
- organizzare meglio il lavoro;
- individuare rapidamente eventuali problemi;
- realizzare soluzioni riutilizzabili;
- facilitare il lavoro in gruppo.

> 💡 **Approfondimento** — Procedere per tentativi non è "sbagliato" in assoluto: anche gli informatici esperti a volte sperimentano. La differenza è che lo fanno *dopo* aver capito il problema, non al posto dell'analisi. Il metodo che costruiamo in questo modulo non elimina la sperimentazione: le dà una base solida su cui appoggiarsi.

---

<a id="12-le-fasi-del-problem-solving"></a>

## 1.2 Le fasi del Problem Solving

Ogni problema può essere affrontato seguendo una sequenza di fasi ben definite. Questa procedura verrà utilizzata per **tutti** gli esercizi del corso, dal più semplice al progetto finale del Modulo 18.

```
Comprendere il problema
        ↓
Analizzare il problema
        ↓
Progettare la soluzione
        ↓
Scrivere l'algoritmo
        ↓
Disegnare il Flow Chart
        ↓
Implementare con Flowgorithm
        ↓
Tradurre in Python
        ↓
Testare la soluzione
        ↓
Correggere gli errori
        ↓
Versione finale
```

Nei paragrafi che seguono analizziamo ciascuna fase singolarmente, applicandola sempre allo stesso filo conduttore: il calcolo del costo totale di alcuni prodotti, per poi arrivare a un esempio guidato completo diverso, in modo che tu possa vedere il metodo applicato due volte.

---

<a id="13-fase-1-comprendere-il-problema"></a>

## 1.3 Fase 1 — Comprendere il problema

La prima attività consiste nel leggere **attentamente** il testo del problema, meglio se più di una volta.

Molti errori nascono dal fatto che si inizia subito a programmare senza aver compreso cosa viene realmente richiesto.

Occorre chiedersi:

- Qual è il problema?
- Qual è l'obiettivo?
- Cosa devo ottenere?

### Esempio

Problema:

> Calcolare il costo totale di tre prodotti.

Prima di pensare al programma dobbiamo capire cosa ci viene richiesto.

L'obiettivo è ottenere il costo complessivo.

Non ci viene chiesto di calcolare IVA, sconti o resto: aggiungere operazioni non richieste è un errore comune tanto quanto dimenticarne una necessaria.

> ⚠️ **Attenzione** — Un problema "semplice" letto in fretta genera più errori di un problema complesso letto con calma. La velocità nella comprensione del testo non è mai un vantaggio: lo è solo la precisione.

---

<a id="14-fase-2-analizzare-il-problema"></a>

## 1.4 Fase 2 — Analizzare il problema

Dopo aver compreso il problema occorre individuare gli elementi fondamentali:

- dati di ingresso (**Input**);
- dati di uscita (**Output**);
- eventuali **vincoli**.

### Input

Gli input sono le informazioni necessarie per risolvere il problema.

Esempio — calcolare l'area di un rettangolo:

| Input |
|---|
| base |
| altezza |

### Output

Gli output rappresentano il risultato finale.

Nell'esempio precedente:

| Output |
|---|
| area |

### Vincoli

Alcuni problemi impongono delle condizioni che i dati devono rispettare. Ad esempio:

- un voto deve essere compreso tra 1 e 10;
- l'età non può essere negativa;
- il divisore non può essere zero.

Riconoscere i vincoli è fondamentale per evitare errori: un algoritmo che ignora i vincoli può produrre risultati numericamente "corretti" ma privi di senso nella realtà (una media voto pari a 47, un'età di −3 anni).

> 💡 **Approfondimento** — Nei moduli dedicati alla Selezione (M11 e M12) imparerai a tradurre questi vincoli in vere e proprie condizioni di controllo, capaci di intercettare un dato non valido prima che l'algoritmo prosegua.

---

<a id="15-fase-3-individuare-la-strategia"></a>

## 1.5 Fase 3 — Individuare la strategia

Ora dobbiamo capire **come** ottenere il risultato. In questa fase non si scrive ancora codice: si descrive semplicemente il procedimento, anche solo a parole.

Problema:

> Calcolare la media di tre voti.

Strategia:

1. leggere i tre voti;
2. calcolare la somma;
3. dividere per tre;
4. mostrare il risultato.

Una strategia descritta a parole, per quanto informale, è già un piccolo passo verso l'algoritmo vero e proprio, che formalizzeremo nella fase successiva.

---

<a id="16-fase-4-scrivere-lalgoritmo"></a>

## 1.6 Fase 4 — Scrivere l'algoritmo

L'algoritmo rappresenta la descrizione precisa della soluzione. Ogni istruzione deve essere:

- semplice;
- chiara;
- ordinata;
- non ambigua.

### Algoritmo dell'esempio

```
Leggi voto1
Leggi voto2
Leggi voto3

somma = voto1 + voto2 + voto3
media = somma / 3

Visualizza media
```

Nota come ogni riga corrisponda a un'unica azione precisa: leggere un dato, eseguire un calcolo, visualizzare un risultato. Non esistono passaggi impliciti o sottintesi: è proprio questa precisione che permetterà, nei prossimi moduli, di tradurre l'algoritmo in Flow Chart, Flowgorithm e infine Python, senza sorprese.

---

<a id="17-fase-5-disegnare-il-flow-chart"></a>

## 1.7 Fase 5 — Disegnare il Flow Chart

Prima di programmare rappresentiamo l'algoritmo mediante un **diagramma di flusso**.

```
INIZIO
   ↓
Leggi voto1
   ↓
Leggi voto2
   ↓
Leggi voto3
   ↓
Somma
   ↓
Media
   ↓
Visualizza media
   ↓
FINE
```

Il Flow Chart permette di controllare la logica dell'algoritmo **senza preoccuparsi della sintassi di un linguaggio**: è uno strumento universale, comprensibile a chiunque, indipendentemente dal linguaggio di programmazione che utilizzerà in seguito.

> 💡 **Approfondimento** — I simboli standard usati nei Flow Chart (ovale per Inizio/Fine, parallelogramma per Input/Output, rettangolo per l'elaborazione, rombo per le decisioni) verranno presentati nel dettaglio nel Modulo 5, con tanto di cheat sheet riassuntiva in Appendice A.

---

<a id="18-fase-6-implementare-in-flowgorithm"></a>

## 1.8 Fase 6 — Implementare in Flowgorithm

**Flowgorithm** consente di trasformare il Flow Chart in un algoritmo realmente eseguibile, senza scrivere ancora codice testuale.

Schema delle operazioni:

```
Start

Input voto1
Input voto2
Input voto3

somma = voto1 + voto2 + voto3
media = somma / 3

Output media

End
```

Durante il corso utilizzeremo Flowgorithm per **verificare il corretto funzionamento** degli algoritmi prima della traduzione in Python: è un passaggio intermedio che ti permette di individuare errori logici in un ambiente grafico, molto più semplice da leggere rispetto al codice puro.

---

<a id="19-fase-7-tradurre-in-python"></a>

## 1.9 Fase 7 — Tradurre in Python

Solo **dopo** aver verificato la correttezza dell'algoritmo passiamo al linguaggio di programmazione.

```python
voto1 = float(input("Primo voto: "))
voto2 = float(input("Secondo voto: "))
voto3 = float(input("Terzo voto: "))

somma = voto1 + voto2 + voto3
media = somma / 3

print("Media =", media)
```

Noterai che il programma Python è quasi identico all'algoritmo scritto in italiano al paragrafo 1.6. Questo non è un caso: dimostra quanto sia importante **progettare prima di programmare**. Chi salta le fasi precedenti, in genere, arriva a un codice Python molto più confuso e pieno di tentativi corretti "a occhio".

---

<a id="110-fase-8-verificare-la-soluzione"></a>

## 1.10 Fase 8 — Verificare la soluzione

Terminato il programma bisogna eseguire diversi **test**, non uno solo.

| Input | Output atteso |
|--------|---------------|
| 6, 6, 6 | 6 |
| 8, 7, 9 | 8 |
| 10, 10, 10 | 10 |

I test permettono di verificare il corretto funzionamento del programma su casi diversi, comprese eventuali situazioni limite (voti tutti uguali, voti molto diversi tra loro, e — nei moduli più avanzati — anche dati non validi).

> ⚠️ **Attenzione** — Testare un programma con un solo caso ("ho provato e funziona!") è uno degli errori più diffusi tra chi inizia a programmare. Un algoritmo che funziona con un solo input non è ancora un algoritmo verificato.

---

<a id="111-il-ciclo-del-problem-solving"></a>

## 1.11 Il ciclo del Problem Solving

La risoluzione di un problema raramente termina al primo tentativo. Normalmente il processo è **iterativo**: si progetta, si testa, si corregge, si testa di nuovo.

```
Problema
   ↓
Analisi
   ↓
Algoritmo
   ↓
Programma
   ↓
Test
   ↓
Errore? ── SI ──► Correggi ──┐
   │                          │
   NO                    (si ripete il test)
   ↓                          │
Soluzione finale ◄────────────┘
```

Ogni errore rappresenta un'**occasione per migliorare** il progetto, non un fallimento. Nel Modulo 16, interamente dedicato al Debugging, approfondiremo tecniche precise per individuare e correggere questi errori in modo sistematico, invece di procedere "a caso" finché il programma non funziona per fortuna.

---

<a id="112-esempio-guidato-completo"></a>

## 1.12 Esempio guidato completo

Mettiamo ora in pratica **tutte le otto fasi** viste in questo modulo, su un problema nuovo.

### Problema

Calcolare il perimetro di un rettangolo.

### Analisi

**Input**

| Dato |
|---|
| base |
| altezza |

**Output**

| Dato |
|---|
| perimetro |

**Formula**

```
Perimetro = 2 × (base + altezza)
```

### Algoritmo

```
Leggi base
Leggi altezza

perimetro = 2 * (base + altezza)

Visualizza perimetro
```

### Flowgorithm

```
Start

Input base
Input altezza

perimetro = 2 * (base + altezza)

Output perimetro

End
```

### Python

```python
base = float(input("Base: "))
altezza = float(input("Altezza: "))

perimetro = 2 * (base + altezza)

print("Perimetro =", perimetro)
```

Prova a percorrere tu stesso, con carta e penna, le otto fasi di questo modulo su un problema simile — ad esempio il calcolo del perimetro di un quadrato — prima di passare agli esercizi.

---

## ✅ Best Practice

✔ Leggere più volte il testo del problema.

✔ Evidenziare input e output prima di qualsiasi altra cosa.

✔ Individuare eventuali vincoli.

✔ Scrivere prima l'algoritmo, poi il Flow Chart, poi Flowgorithm, e solo alla fine il codice Python.

✔ Verificare la logica con Flowgorithm prima di tradurre in Python.

✔ Testare la soluzione con più di un caso.

## ❌ Errori comuni

❌ Programmare senza aver analizzato il problema.

❌ Confondere input e output.

❌ Ignorare i vincoli.

❌ Non eseguire test, o eseguirne uno solo.

❌ Correggere il codice "a tentativi", senza aver individuato la causa reale dell'errore.

---

<a id="esercizi-del-modulo-1"></a>

## 🧪 Esercizi del Modulo 1

Ti consigliamo di svolgere ogni esercizio applicando per intero le otto fasi viste nel modulo, annotando su un foglio (o in un file di testo) input, output, vincoli e algoritmo prima ancora di aprire Flowgorithm.

**Esercizio 1 — Individuare input, output e vincoli**

Per ciascun problema individua input, output ed eventuali vincoli:

1. Calcolare l'area di un quadrato.
2. Calcolare il prezzo finale di un prodotto con IVA.
3. Convertire una temperatura da Celsius a Fahrenheit.
4. Calcolare il consumo medio di un'automobile.

**Esercizio 2 — Dal problema al Python**

Per ciascuno dei seguenti problemi, scrivi l'algoritmo, il Flow Chart, realizzalo in Flowgorithm e infine traducilo in Python:

- calcolare il triplo di un numero;
- calcolare il quadrato di un numero;
- convertire minuti in ore e minuti.

**Esercizio 3 — Progettare i test**

Per l'esercizio "calcolare il quadrato di un numero" svolto al punto precedente, costruisci una tabella di almeno tre test (input / output atteso), includendo anche un caso con un numero negativo.

---

<a id="quiz-di-autovalutazione"></a>

## 📝 Quiz di autovalutazione

**1. Qual è la prima fase del Problem Solving?**

A. Scrivere il codice

B. Disegnare il Flow Chart

C. Comprendere il problema

D. Aprire Flowgorithm

---

**2. Gli input rappresentano:**

A. I risultati

B. I dati iniziali necessari per risolvere il problema

C. Gli errori

D. I commenti

---

**3. Quando è consigliabile iniziare a programmare?**

A. Subito

B. Dopo aver progettato l'algoritmo

C. Prima dell'analisi

D. Dopo il debugging

---

**4. A cosa serve testare una soluzione con più input diversi?**

A. A rendere il programma più lungo

B. A verificare che l'algoritmo funzioni correttamente in casi diversi

C. A rallentare il programma

D. Non serve, un solo test è sufficiente

---

**5. Perché il processo di Problem Solving viene definito "iterativo"?**

A. Perché va ripetuto da capo ogni volta senza motivo

B. Perché prevede cicli di analisi, test e correzione fino alla soluzione corretta

C. Perché deve essere svolto da più persone contemporaneamente

D. Perché riguarda solo i cicli in Python

---

<a id="riepilogo-del-modulo-1"></a>

## 📚 Riepilogo del Modulo 1

In questo modulo hai imparato:

- perché seguire un metodo riduce gli errori rispetto a procedere per tentativi;
- le otto fasi del processo di Problem Solving, dalla comprensione del problema fino alla verifica della soluzione;
- come distinguere e individuare input, output e vincoli in un problema;
- come passare dalla strategia descritta a parole all'algoritmo formale;
- come lo stesso algoritmo attraversi, senza cambiare logica, Flow Chart, Flowgorithm e Python;
- perché il Problem Solving è un processo iterativo, fatto di test e correzioni successive.

Nei prossimi moduli approfondiremo il concetto di **dato**, imparando a distinguere dati, informazioni e conoscenza: elementi fondamentali per progettare qualsiasi algoritmo con precisione, a partire dal Modulo 2.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*