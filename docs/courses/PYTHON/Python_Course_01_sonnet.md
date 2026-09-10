# 🐍 Modulo 1 — Introduzione a Python e Ambiente di Sviluppo

- **Corso:** Python Master — Dalle Basi al Mondo Reale
- **Piattaforma:** GCProf Academy
- **Livello:** 🟢 Base (Fase 1 — Le Fondamenta del Linguaggio)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Nessuno — è il primo modulo del corso
- **Obiettivo Didattico:** Comprendere cos'è Python e perché è così diffuso, muoversi con sicurezza in un notebook Google Colab e scrivere ed eseguire il primo programma.

---

<a id="indice"></a>
# 📑 Indice del Modulo 1

1. [Capitolo 1 — Cos'è la Programmazione e cos'è un Linguaggio Interpretato](#capitolo-1)
2. [Capitolo 2 — Python: Storia, Diffusione e Perché Impararlo Oggi](#capitolo-2)
3. [Capitolo 3 — Le Caratteristiche di Python: Multi-Paradigma e Tipizzazione Dinamica](#capitolo-3)
4. [Capitolo 4 — Google Colab: Il Tuo Ambiente di Lavoro nel Cloud](#capitolo-4)
5. [Capitolo 5 — Celle di Testo e Celle di Codice: Come Funziona un Notebook](#capitolo-5)
6. [Capitolo 6 — Il Tuo Primo Programma: `print()` e "Ciao, mondo!"](#capitolo-6)
7. [Capitolo 7 — Errori Comuni per Chi Inizia (e Come Leggerli)](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è la Programmazione e cos'è un Linguaggio Interpretato

Un computer, da solo, non "sa" fare nulla: esegue soltanto istruzioni, in modo estremamente veloce e preciso, ma cieco. **Programmare** significa scrivere quelle istruzioni in un linguaggio che sia abbastanza preciso da poter essere eseguito da una macchina, ma abbastanza comprensibile da poter essere scritto (e riletto, e corretto) da un essere umano.

Un **linguaggio di programmazione** è esattamente questo: un insieme di regole (sintassi) e parole chiave che permettono di tradurre un'idea — "calcola la media di questi voti", "ordina questa lista di nomi" — in una sequenza di istruzioni eseguibili.

### 🗣️ L'Analogia del Traduttore Simultaneo

```
   TU (in italiano)              INTERPRETE PYTHON           COMPUTER (in binario)
  "stampa 'Ciao'"  ────────▶   traduce riga per riga   ────▶   esegue l'istruzione
                                 MENTRE la legge               immediatamente

        Non serve preparare tutta la traduzione prima:
        ogni riga viene tradotta ed eseguita "al volo".
```

Python appartiene alla categoria dei linguaggi **interpretati**: il codice che scrivi non viene trasformato tutto insieme in un programma eseguibile (come accade invece nei linguaggi **compilati**, es. C o Java), ma viene letto ed eseguito riga per riga da un programma chiamato **interprete** (in Python, l'interprete standard si chiama **CPython**).

| Aspetto | Linguaggio Interpretato (es. Python) | Linguaggio Compilato (es. C, Java) |
| :--- | :--- | :--- |
| Esecuzione | Riga per riga, "al volo", tramite un interprete | Prima tradotto tutto in un file eseguibile (compilazione), poi eseguito |
| Velocità di sviluppo | Molto rapida: scrivi e testi subito | Più lenta: serve ricompilare a ogni modifica |
| Velocità di esecuzione | Generalmente più lenta | Generalmente più veloce |
| Portabilità del codice | Lo stesso file funziona ovunque ci sia l'interprete | Va spesso ricompilato per ogni sistema operativo |

*Nota:* internamente, CPython compila il codice Python in un formato intermedio chiamato **bytecode** prima di eseguirlo — ma questo passaggio è automatico e invisibile a chi programma: dal tuo punto di vista, Python resta un linguaggio interpretato "al volo".

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Python: Storia, Diffusione e Perché Impararlo Oggi

Python è stato creato da **Guido van Rossum** e rilasciato per la prima volta nel **1991**, con un obiettivo dichiarato fin dall'inizio: la **leggibilità del codice**. Il nome, curiosamente, non ha nulla a che fare con il serpente: è un omaggio al gruppo comico britannico *Monty Python*.

Oggi Python è mantenuto dalla **Python Software Foundation**, con una nuova versione principale rilasciata circa ogni anno (al momento la serie più recente è Python 3.13/3.14).

### Perché Python è ovunque

| Ambito | Esempi di utilizzo reale |
| :--- | :--- |
| 🌐 Sviluppo Web | Framework come Django e Flask |
| 📊 Data Science e Analisi Dati | Pandas, NumPy, Jupyter/Colab |
| 🤖 Intelligenza Artificiale | PyTorch, TensorFlow, gran parte della ricerca in ML |
| ⚙️ Automazione e Scripting | Automatizzare compiti ripetitivi, file, report |
| 💰 Finanza Quantitativa | Analisi di mercati, modelli di rischio, backtesting |
| 🎓 Didattica | Linguaggio più usato per insegnare le basi della programmazione |

Non è un caso che Python sia, da diversi anni, uno dei linguaggi più richiesti nel mondo del lavoro: la sua sintassi semplice lo rende perfetto per imparare a "pensare da programmatore" senza scontrarsi subito con dettagli tecnici complessi, mentre la sua potenza reale lo rende lo strumento scelto da aziende come Google, Netflix, Instagram e dalla quasi totalità dei laboratori di Intelligenza Artificiale al mondo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Le Caratteristiche di Python: Multi-Paradigma e Tipizzazione Dinamica

Due caratteristiche tecniche spiegano gran parte del successo di Python.

### 3.1 Multi-paradigma

Python non ti obbliga a programmare in un solo "stile". Puoi scrivere codice:

* **Procedurale**: una sequenza di istruzioni eseguite in ordine (quello che imparerai nei primi moduli di questo corso).
* **Orientato agli oggetti**: organizzando dati e comportamenti in classi e oggetti (lo scoprirai nel Modulo 14, e in modo approfondito nel corso dedicato *OOP Explorer*).
* **Funzionale**: trattando le funzioni come valori da passare in giro (lo vedrai nel Modulo 11).

### 3.2 Tipizzazione dinamica

In molti linguaggi (es. Java) devi dichiarare esplicitamente il tipo di ogni variabile prima di usarla. In Python **non serve**: il tipo di una variabile viene dedotto automaticamente, in base al valore che le assegni, e può persino cambiare durante l'esecuzione del programma.

```python
# ==================== ESEMPIO 1.1: TIPIZZAZIONE DINAMICA ====================
"""
In Python non dichiariamo mai il tipo di una variabile: Python lo capisce
da solo osservando il valore assegnato. La funzione type() ci permette
di chiedere a Python 'di che tipo è, in questo momento, questa variabile?'
"""

valore = 10
print(valore, type(valore))   # 10 <class 'int'> -> Python capisce che è un intero

valore = "adesso sono un testo"
print(valore, type(valore))   # <class 'str'> -> la STESSA variabile ora è una stringa

valore = 3.14
print(valore, type(valore))   # <class 'float'> -> e ora è un numero decimale
```

⚠️ **Attenzione:** questa flessibilità è comoda, ma va usata con consapevolezza. Cambiare "tipo" a una variabile durante il programma, senza un buon motivo, rende il codice più difficile da leggere e da mantenere: è una libertà del linguaggio, non un invito a usarla ovunque.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Google Colab: Il Tuo Ambiente di Lavoro nel Cloud

Per questo corso useremo **Google Colab** (`colab.research.google.com`), un ambiente gratuito, basato su browser, che permette di scrivere ed eseguire codice Python senza installare nulla sul proprio computer.

### Perché Google Colab

| Vantaggio | Descrizione |
| :--- | :--- |
| 🚀 Zero installazione | Basta un account Google: nessun setup, nessuna configurazione |
| 📝 Celle miste | Testo (Markdown) e codice eseguibile nello stesso documento |
| ☁️ Salvataggio automatico | I notebook si salvano su Google Drive |
| 🖥️ Hardware gratuito | CPU (e GPU/TPU, se in futuro servisse per l'Intelligenza Artificiale) senza costi |
| 🤝 Collaborazione | Un notebook si può condividere e modificare in tempo reale, come un Google Doc |

*In alternativa*, per lavorare in locale sul proprio computer, si può installare Python da [python.org](https://www.python.org/) e verificarne l'installazione da terminale:

```bash
python --version
# oppure, su alcuni sistemi:
python3 --version
```

Per tutto questo corso, però, faremo riferimento a Google Colab: è l'ambiente più semplice per iniziare, e quello che useremo insieme in classe.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Celle di Testo e Celle di Codice: Come Funziona un Notebook

Un notebook Colab è organizzato in **celle**, che puoi eseguire una alla volta, nell'ordine che preferisci (anche se normalmente conviene eseguirle dall'alto verso il basso).

### 🧱 L'Analogia del Notebook come Sequenza di "Scatole"

```
  [ Cella di TESTO ]   →   spiegazione, titoli, formule — non viene eseguita
  [ Cella di CODICE ]  →   istruzioni Python — SI esegue con Shift+Invio
  [ Cella di TESTO ]   →   altra spiegazione
  [ Cella di CODICE ]  →   altro codice, che può USARE variabili create sopra
```

* Le **celle di testo** usano il linguaggio Markdown (lo stesso di questa guida): titoli con `#`, grassetto con `**testo**`, elenchi puntati, e così via. Non contengono codice eseguibile.
* Le **celle di codice** contengono istruzioni Python. Si eseguono con `Shift + Invio` (o cliccando sul pulsante ▶️ a sinistra della cella): l'output appare subito sotto.
* Una variabile creata in una cella **resta disponibile** anche nelle celle successive, purché la cella che l'ha creata sia già stata eseguita.

⚠️ **Errore comune per chi inizia:** modificare una cella di codice ma dimenticare di rieseguirla. Colab mostra sempre l'output dell'**ultima esecuzione**, non del codice attualmente scritto: se non rieseguo la cella, vedo ancora il risultato vecchio.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Il Tuo Primo Programma: `print()` e "Ciao, mondo!"

È tradizione, in ogni linguaggio di programmazione, che il primissimo programma scritto da chi impara stampi a schermo un saluto. In Python, questo richiede una sola riga di codice.

```python
# ==================== ESEMPIO 1.2: IL TUO PRIMO PROGRAMMA ====================
"""
print() è una funzione predefinita di Python: prende un valore (qui, del testo
tra virgolette, cioè una stringa) e lo mostra come output sotto la cella.
"""

print("Ciao, mondo!")
```

```python
# ==================== ESEMPIO 1.3: print() CON PIÙ VALORI ====================
"""
print() può ricevere più valori separati da virgola: li stampa tutti
sulla stessa riga, separandoli automaticamente con uno spazio.
"""

nome = "Python"
anno = 1991

print("Il linguaggio", nome, "è nato nel", anno)
# Output: Il linguaggio Python è nato nel 1991
```

```python
# ==================== ESEMPIO 1.4: I COMMENTI ====================
"""
Il carattere # inizia un commento: tutto ciò che segue, sulla stessa riga,
viene IGNORATO da Python. I commenti servono a spiegare il codice a chi
lo legge (compreso te stesso, tra qualche settimana).
"""

# Questo è un commento: Python non lo esegue
print("Questa riga, invece, viene eseguita")  # anche un commento dopo il codice è valido
```

*Perché ti serve: da qui in avanti, `print()` sarà lo strumento che userai costantemente per "vedere cosa succede" dentro un programma — è il primo, indispensabile strumento di ogni programmatore, anche dei più esperti, per controllare che il codice faccia davvero quello che ci si aspetta.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Errori Comuni per Chi Inizia (e Come Leggerli)

Sbagliare, all'inizio, è normale e fa parte dell'apprendimento. Python, quando qualcosa non va, mostra un **messaggio di errore**: imparare a leggerlo è una competenza tanto importante quanto scrivere codice corretto.

```python
# ==================== ESEMPIO 1.5: UN ERRORE DI SINTASSI ====================
"""
Qui manca una virgoletta di chiusura: Python non riesce a capire dove finisce
la stringa e segnala un SyntaxError, indicando (con una freccia ^) il punto
in cui si è "perso".
"""

# print("Ciao, mondo!)   # <-- manca la virgoletta finale: genera SyntaxError
```

| Errore | Causa tipica | Come riconoscerlo |
| :--- | :--- | :--- |
| `SyntaxError` | Sintassi scritta in modo scorretto (virgolette, parentesi mancanti…) | Python segnala la riga e il punto esatto con `^` |
| `NameError` | Si usa una variabile mai creata, o scritta con un nome diverso (maiuscole/minuscole contano!) | `NameError: name 'x' is not defined` |
| `IndentationError` | Spazi/indentazione inconsistenti (Python li usa per delimitare i blocchi) | `IndentationError: unexpected indent` |

💡 **Consiglio pratico:** quando un messaggio di errore appare, **leggilo fino in fondo**, partendo dall'ultima riga (che indica *tipo* di errore e descrizione) per poi risalire a *dove*, nel codice, si è verificato. Non è un ostacolo: è Python che ti sta aiutando a capire cosa correggere.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 1

1. Python è un linguaggio di programmazione **interpretato**: il codice viene letto ed eseguito riga per riga da un interprete (CPython).
2. Python è **multi-paradigma** (procedurale, a oggetti, funzionale) e a **tipizzazione dinamica** (non serve dichiarare il tipo delle variabili).
3. **Google Colab** è l'ambiente di lavoro di questo corso: notebook cloud, gratuito, senza installazione, con celle di testo e celle di codice.
4. Una cella di codice si esegue con `Shift + Invio`; una variabile creata in una cella resta disponibile nelle celle successive già eseguite.
5. `print()` è la funzione base per mostrare un output; `#` introduce un commento, ignorato da Python.
6. I messaggi di errore (`SyntaxError`, `NameError`, `IndentationError`…) vanno letti, non temuti: indicano con precisione cosa correggere.

---

### 🧪 Laboratorio Pratico: "Il Tuo Bigliettino da Visita Digitale"

**Obiettivo:** Prendere confidenza con Google Colab e con `print()` scrivendo il tuo primo, vero mini-programma.

1. Apri un nuovo notebook su Google Colab e rinominalo con il tuo nome (es. `Modulo1_MarioRossi.ipynb`).
2. Crea una cella di testo con un titolo (es. `# Il mio primo notebook Python`).
3. Crea una cella di codice che, usando più istruzioni `print()`, stampi: il tuo nome, la scuola/indirizzo che frequenti e una frase che spieghi perché vuoi imparare Python.
4. Aggiungi almeno un commento (`#`) che spieghi cosa fa una delle righe di codice.
5. **Sfida finale:** prova volontariamente a "rompere" una delle tue righe `print()` (es. togliendo una virgoletta), esegui la cella, leggi il messaggio di errore che Python restituisce e poi correggilo.

*Suggerimento:* riusa esattamente la struttura degli Esempi 1.2, 1.3 e 1.4 di questo modulo, personalizzando i testi.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa significa, correttamente, che Python è un linguaggio "interpretato"?
- A) Che il codice va sempre compilato manualmente prima di essere eseguito
- B) Che il codice viene letto ed eseguito riga per riga da un interprete
- C) Che Python può essere usato solo su Google Colab
- D) Che ogni riga di codice deve essere tradotta in un altro linguaggio dall'utente

**Domanda 2:** Cosa si intende quando si dice che Python ha "tipizzazione dinamica"?
- A) Che le variabili cambiano nome automaticamente durante l'esecuzione
- B) Che bisogna sempre dichiarare il tipo di una variabile prima di usarla
- C) Che il tipo di una variabile viene dedotto automaticamente dal valore assegnato, e può cambiare
- D) Che Python non supporta i numeri decimali

**Domanda 3:** Come si esegue una cella di codice in Google Colab?
- A) Cliccando due volte con il tasto destro
- B) Con la combinazione `Shift + Invio` (o il pulsante ▶️)
- C) Salvando il notebook su Drive
- D) Non serve eseguirla: Colab la esegue da sola

**Domanda 4:** Cosa fa Python quando incontra un carattere `#` in una riga di codice?
- A) Genera sempre un errore
- B) Esegue solo quella riga due volte
- C) Ignora tutto ciò che segue sulla stessa riga: è un commento
- D) Interpreta `#` come un numero

---

[🔙 Torna all'indice](#indice)