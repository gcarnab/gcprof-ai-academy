<a id="top"></a>

# 📘 Modulo 4: Python per AI
**Livello Intermedio (parte 1) — Master in Intelligenza Artificiale | GCProf Academy**

🕒 Tempo stimato: 8-10 ore · 🎯 Difficoltà: Intermedio

---

## 📑 Indice del Modulo

1. [Introduzione](#1-introduzione)
2. [Obiettivi](#2-obiettivi)
3. [Prerequisiti](#3-prerequisiti)
4. [Lezioni](#4-lezioni)
5. [Esempi](#5-esempi)
6. [Laboratorio](#6-laboratorio)
7. [Best Practice](#7-best-practice)
8. [Errori Comuni](#8-errori-comuni)
9. [Riepilogo](#9-riepilogo)
10. [Glossario](#10-glossario)
11. [Quiz](#11-quiz)
12. [Project Work](#12-project-work)
13. [Materiale Scaricabile](#13-materiale-scaricabile)
14. [Bibliografia](#14-bibliografia)
15. [Sitografia](#15-sitografia)

---

<a id="1-introduzione"></a>
## 1. Introduzione

Hai completato il Livello Base: sai cos'è l'AI, sai scrivere prompt efficaci, conosci i limiti etici e normativi. Da qui in poi cambia registro: **inizi a costruire**.

**Python** è il linguaggio con cui viene scritta la stragrande maggioranza dei sistemi di intelligenza artificiale moderni: dai modelli di ricerca nei laboratori universitari alle pipeline di produzione delle grandi aziende tech. Non è un caso — Python ha una sintassi leggibile, un ecosistema di librerie scientifiche maturo (NumPy, Pandas, scikit-learn, PyTorch, TensorFlow) e una comunità enorme che rende semplice trovare soluzioni e documentazione.

In questo modulo non ti limiterai a "imparare la sintassi": costruirai un **ambiente di sviluppo professionale** su VS Code, esattamente come farebbe un AI Engineer in azienda, e getterai le basi della **Programmazione Orientata agli Oggetti (OOP)**, il paradigma su cui sono costruite tutte le librerie AI che userai nei moduli successivi (uno scikit-learn `Classifier`, un layer di Keras, un `Agent` di LangChain: sono tutti oggetti).

Da qui in avanti, ogni laboratorio del Master si baserà su quanto imparerai in questo modulo. Vale la pena investirci tempo ed esercizio.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Installare e configurare un ambiente Python professionale su **VS Code**, con ambienti virtuali isolati per progetto.
- ✅ Usare **pip** per gestire le dipendenze e un file `requirements.txt` per rendere un progetto riproducibile.
- ✅ Lavorare con i **Jupyter Notebook** direttamente dentro VS Code, alternando codice, output e note testuali.
- ✅ Padroneggiare le basi di **NumPy** (array e operazioni vettoriali), **Pandas** (DataFrame e manipolazione dati) e **Matplotlib** (visualizzazione dati).
- ✅ Scrivere codice Python usando la **Programmazione Orientata agli Oggetti**: classi, oggetti, attributi, metodi, ereditarietà.
- ✅ Usare il **debugger di VS Code** per individuare ed eliminare errori nel codice, senza affidarti solo a `print()`.
- ✅ Applicare le competenze acquisite per costruire una piccola classe Python che rappresenta e manipola un dataset.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato il **Livello Base** (Moduli 1-3).
- Nessuna esperienza di programmazione pregressa richiesta: il modulo parte da zero, ma **il ritmo è sostenuto** — è il primo modulo tecnico del Master.
- Un computer (Windows, macOS o Linux) su cui installare software: VS Code e Python.
- Voglia di scrivere codice e sbagliare: gli errori sono la parte più formativa di questo modulo.

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Impostare l'ambiente di sviluppo: VS Code, Python, Virtualenv

**Perché lavorare in locale e non solo su un notebook cloud?**
Molti corsi introduttivi all'AI usano notebook online (Colab, Kaggle) perché sono comodi per iniziare. Ma un **AI Engineer professionista** lavora quasi sempre in locale (o su server aziendali) con un editor completo, debugging vero, controllo di versione e gestione delle dipendenze. È un salto di maturità tecnica che vale la pena fare fin da subito.

**Gli strumenti:**
- **VS Code**: editor di codice gratuito, leggero ed estensibile, lo standard de facto per lo sviluppo Python oggi.
- **Estensioni fondamentali**: `Python` (Microsoft) e `Jupyter` (Microsoft) — installabili dal Marketplace di VS Code.
- **Virtualenv (ambiente virtuale)**: uno "spazio isolato" dove installare le librerie di un progetto, senza sporcare l'installazione globale di Python o creare conflitti tra progetti diversi.

**Creare un ambiente virtuale (da terminale integrato di VS Code):**

```bash
# Creazione dell'ambiente virtuale nella cartella del progetto
python -m venv venv

# Attivazione (Windows - PowerShell)
venv\Scripts\Activate.ps1

# Attivazione (macOS / Linux)
source venv/bin/activate
```

Quando l'ambiente è attivo, il terminale mostra il prefisso `(venv)`. Da questo momento, qualsiasi libreria installata con `pip` resta confinata a quel progetto.

**Gestire le dipendenze con pip:**

```bash
# Installare una libreria
pip install pandas numpy matplotlib

# Salvare l'elenco delle dipendenze del progetto
pip freeze > requirements.txt

# Ricreare lo stesso ambiente su un altro computer
pip install -r requirements.txt
```

Il file `requirements.txt` è ciò che rende un progetto **riproducibile**: chiunque (un collega, il tuo "io" del futuro, un correttore automatico) può ricreare esattamente lo stesso ambiente con un solo comando.

### 4.2 — Notebook in VS Code

VS Code permette di aprire e lavorare su file `.ipynb` (Jupyter Notebook) senza uscire dall'editor, con tutti i vantaggi del notebook (celle di codice alternate a celle di testo, output visualizzato inline) più quelli di un IDE completo (autocompletamento, debug, integrazione Git).

Un notebook è composto da **celle**:
- **Celle di codice**: eseguibili singolarmente, mantengono lo stato tra un'esecuzione e l'altra.
- **Celle Markdown**: per scrivere spiegazioni, titoli, formule — utilissime per documentare l'analisi mentre la sviluppi.

> 💡 Useremo i notebook soprattutto nei moduli di Data Analysis e Machine Learning, dove l'esplorazione iterativa dei dati è centrale. Per il codice "di produzione" (classi, moduli riutilizzabili) useremo invece file `.py` classici.

### 4.3 — Le librerie fondamentali: NumPy, Pandas, Matplotlib

**NumPy** — calcolo numerico efficiente con array multidimensionali:

```python
import numpy as np

# Un array NumPy è molto più efficiente di una lista Python per il calcolo numerico
voti = np.array([7, 8, 6, 9, 5, 10])

print(voti.mean())     # media
print(voti.std())      # deviazione standard
print(voti[voti > 7])  # filtro vettoriale: solo i voti sopra 7
```

**Pandas** — manipolazione di dati tabellari tramite `DataFrame`:

```python
import pandas as pd

dati = pd.DataFrame({
    "studente": ["Anna", "Luca", "Sara"],
    "voto_matematica": [8, 6, 9],
    "voto_informatica": [9, 7, 10]
})

print(dati.head())
print(dati["voto_matematica"].mean())
dati["media"] = (dati["voto_matematica"] + dati["voto_informatica"]) / 2
print(dati.sort_values("media", ascending=False))
```

**Matplotlib** — visualizzazione dei dati:

```python
import matplotlib.pyplot as plt

plt.bar(dati["studente"], dati["media"])
plt.title("Media voti per studente")
plt.xlabel("Studente")
plt.ylabel("Media")
plt.show()
```

Queste tre librerie sono i "mattoni" su cui si basa quasi ogni progetto di data analysis e machine learning in Python: le ritroverai in ogni modulo successivo.

### 4.4 — Programmazione Orientata agli Oggetti (OOP)

L'OOP organizza il codice attorno a **oggetti**: entità che uniscono **dati** (attributi) e **comportamenti** (metodi). È il paradigma con cui sono costruite tutte le librerie AI che userai: un modello scikit-learn è un oggetto, un layer di rete neurale è un oggetto, un agente AI è un oggetto.

**I concetti fondamentali:**

```python
class Studente:
    """Rappresenta uno studente con i suoi voti."""

    def __init__(self, nome, voti=None):
        # Il costruttore: viene eseguito quando si crea un nuovo oggetto
        self.nome = nome                  # attributo
        self.voti = voti if voti else []  # attributo (lista di voti)

    def aggiungi_voto(self, voto):
        # metodo: comportamento dell'oggetto
        self.voti.append(voto)

    def media(self):
        if not self.voti:
            return 0
        return sum(self.voti) / len(self.voti)

    def __str__(self):
        # rappresentazione testuale dell'oggetto
        return f"{self.nome}: media {self.media():.1f}"


# Creazione di oggetti (istanze della classe)
anna = Studente("Anna")
anna.aggiungi_voto(8)
anna.aggiungi_voto(9)

print(anna)          # Anna: media 8.5
print(anna.media())  # 8.5
```

**Ereditarietà** — creare classi specializzate a partire da una classe generale:

```python
class StudenteConBonus(Studente):
    """Uno studente che partecipa a progetti extra e riceve un bonus sulla media."""

    def __init__(self, nome, voti=None, bonus=0.0):
        super().__init__(nome, voti)  # richiama il costruttore della classe genitore
        self.bonus = bonus

    def media(self):
        # sovrascrive (override) il metodo della classe genitore
        return super().media() + self.bonus


sara = StudenteConBonus("Sara", voti=[7, 8], bonus=0.5)
print(sara)  # Sara: media 8.0
```

Questo esempio introduce quattro pilastri dell'OOP che ritroverai nel resto del Master:
- **Incapsulamento**: i dati (voti) e i comportamenti (aggiungi_voto, media) vivono insieme nell'oggetto.
- **Astrazione**: chi usa `Studente` non deve sapere *come* è calcolata la media, solo *che* esiste un metodo `media()`.
- **Ereditarietà**: `StudenteConBonus` riusa il codice di `Studente` invece di riscriverlo.
- **Polimorfismo**: chiamando `.media()` su un `Studente` o su uno `StudenteConBonus` si ottiene un comportamento diverso, con la stessa interfaccia.

### 4.5 — Debug in VS Code

Affidarsi solo a `print()` per capire cosa succede nel codice funziona per programmi molto semplici, ma diventa presto inefficiente. Il **debugger di VS Code** permette di:
- Impostare **breakpoint** (punti in cui l'esecuzione si ferma) cliccando a sinistra del numero di riga.
- Eseguire il codice riga per riga (`Step Over`, `Step Into`, `Step Out`).
- Ispezionare il valore di ogni variabile nel pannello laterale, in tempo reale.
- Valutare espressioni arbitrarie nella "Debug Console" mentre il programma è in pausa.

Per avviarlo: apri il file `.py`, imposta un breakpoint, premi `F5` (o l'icona "Run and Debug" nella barra laterale) e scegli la configurazione "Python File".

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — Ambiente riproducibile**
Un progetto AI condiviso su GitHub include quasi sempre un file `requirements.txt`. Chi lo clona esegue `python -m venv venv`, attiva l'ambiente e lancia `pip install -r requirements.txt`: in pochi secondi ha l'ambiente identico a quello dell'autore originale, senza conflitti con altri progetti sulla stessa macchina.

**Esempio 2 — Pandas per l'analisi rapida**
Un dataset CSV con migliaia di righe di dati studenteschi può essere caricato con una sola riga (`pd.read_csv("dati.csv")`) e filtrato, aggregato o ordinato con poche istruzioni, senza scrivere cicli manuali.

**Esempio 3 — OOP nel mondo reale dell'AI**
Quando nei prossimi moduli scriverai `modello = RandomForestClassifier()` seguito da `modello.fit(X, y)`, starai usando esattamente gli stessi concetti — costruttore, attributi, metodi — che hai visto con la classe `Studente`. Capire l'OOP oggi ti renderà molto più semplice capire *cosa succede davvero* dietro quelle righe di codice nei moduli di Machine Learning.

**Esempio 4 — Debug pratico**
Un errore `KeyError: 'media'` in un DataFrame Pandas è spesso dovuto a un nome di colonna scritto in modo leggermente diverso (maiuscole, spazi). Con un breakpoint appena prima della riga che genera l'errore, puoi ispezionare `dati.columns` nella Debug Console e scoprire subito la discrepanza, invece di indovinare a colpi di `print()`.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** costruire da zero un progetto Python locale, ben strutturato, che unisce ambiente virtuale, librerie fondamentali e OOP.

**Setup (10 minuti):**
1. Crea una cartella `modulo4_lab` e aprila in VS Code.
2. Crea ed attiva un ambiente virtuale (`python -m venv venv`).
3. Installa le dipendenze: `pip install pandas numpy matplotlib`.
4. Genera il file `requirements.txt` con `pip freeze > requirements.txt`.

**Attività guidata (40-50 minuti):**

Crea un file `classe_dataset.py` e implementa una classe `DatasetVoti` che:

1. Nel costruttore, riceve un percorso a un file CSV con colonne `studente`, `materia`, `voto` e lo carica in un `DataFrame` Pandas.
2. Espone un metodo `media_per_studente()` che restituisce un nuovo DataFrame con la media voti per ciascuno studente.
3. Espone un metodo `studente_migliore()` che restituisce il nome dello studente con la media più alta.
4. Espone un metodo `grafico_medie()` che genera un grafico a barre (Matplotlib) delle medie per studente.
5. Implementa il metodo `__str__` per stampare un riepilogo testuale del dataset (numero di studenti, numero di voti totali).

**Verifica:** crea un file `main.py` che istanzia la classe con un piccolo CSV di prova (puoi crearlo tu stesso con 3-4 studenti e alcune materie), stampa il riepilogo, la classifica delle medie e mostra il grafico. Usa il debugger per impostare un breakpoint dentro `media_per_studente()` e osserva il contenuto del DataFrame passo dopo passo.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Crea **sempre** un nuovo ambiente virtuale per ogni progetto: non installare mai librerie AI "a livello globale".
- ✅ Tieni `requirements.txt` aggiornato ogni volta che installi una nuova libreria.
- ✅ Dai nomi descrittivi a classi (`PascalCase`, es. `DatasetVoti`) e a variabili/metodi (`snake_case`, es. `media_per_studente`), seguendo le convenzioni PEP 8.
- ✅ Scrivi una **docstring** all'inizio di ogni classe e metodo non banale: il tuo "io" tra tre mesi ti ringrazierà.
- ✅ Preferisci il debugger a catene infinite di `print()`: è più veloce e più affidabile.
- ✅ Separa la logica (classi in file `.py`) dall'esplorazione dei dati (notebook `.ipynb`): rende il progetto più manutenibile.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **Installare librerie senza aver attivato l'ambiente virtuale.** Il prefisso `(venv)` nel terminale è il segnale che l'ambiente è attivo: se manca, stai installando globalmente.
- ❌ **Dimenticare `self` nei metodi di una classe.** Ogni metodo di istanza deve avere `self` come primo parametro, oppure Python restituirà un errore di argomenti.
- ❌ **Confondere `=` (assegnazione) con `==` (confronto)** in condizioni `if`.
- ❌ **Modificare un DataFrame Pandas pensando di lavorare su una copia**, quando in realtà si sta operando sull'originale (attenzione a `.copy()` quando serve isolare i dati).
- ❌ **Ignorare i messaggi di errore (traceback).** L'ultima riga del traceback indica quasi sempre la causa reale del problema: leggerla per prima fa risparmiare molto tempo.
- ❌ **Non versionare il file `requirements.txt`** insieme al codice: rende il progetto impossibile da riprodurre per chiunque altro (incluso te stesso, su un altro computer).

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai costruito le fondamenta tecniche su cui poggerà tutto il resto del Master. Hai imparato a impostare un **ambiente di sviluppo professionale** su VS Code con ambienti virtuali isolati e gestione delle dipendenze tramite pip; a lavorare sia con **notebook** che con file `.py` classici; a usare le tre librerie cardine dell'ecosistema dati Python — **NumPy**, **Pandas**, **Matplotlib**; e soprattutto ad applicare i principi della **Programmazione Orientata agli Oggetti**, il paradigma su cui sono costruite tutte le librerie AI che incontrerai da qui in avanti.

Nel prossimo modulo (Data Analysis) userai proprio queste competenze per trasformare dataset grezzi e disordinati in dati pronti per l'addestramento di un modello.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **Virtualenv** | Ambiente Python isolato, con le proprie librerie, separato dall'installazione globale del sistema |
| **pip** | Il gestore di pacchetti ufficiale di Python, usato per installare librerie |
| **requirements.txt** | File che elenca le dipendenze di un progetto, per renderlo riproducibile |
| **Jupyter Notebook** | Formato di file (`.ipynb`) che alterna celle di codice eseguibili e celle di testo Markdown |
| **NumPy** | Libreria Python per il calcolo numerico efficiente su array multidimensionali |
| **Pandas** | Libreria Python per la manipolazione di dati tabellari tramite l'oggetto `DataFrame` |
| **Matplotlib** | Libreria Python per la creazione di grafici e visualizzazioni dati |
| **Classe** | Il "modello" o "stampo" che definisce attributi e metodi di un tipo di oggetto |
| **Oggetto (istanza)** | Un'entità concreta creata a partire da una classe |
| **Attributo** | Un dato associato a un oggetto |
| **Metodo** | Una funzione associata a un oggetto, che ne definisce il comportamento |
| **Ereditarietà** | Meccanismo OOP per cui una classe (figlia) eredita attributi e metodi di un'altra (genitore) |
| **Breakpoint** | Punto del codice in cui il debugger interrompe l'esecuzione per ispezionare lo stato del programma |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. A cosa serve un ambiente virtuale (virtualenv) in Python?**
- A) A velocizzare l'esecuzione del codice
- B) A isolare le librerie di un progetto da quelle globali e da altri progetti ✅
- C) A collegarsi automaticamente a Internet
- D) A sostituire completamente VS Code

**2. Cosa fa il comando `pip freeze > requirements.txt`?**
- A) Cancella tutte le librerie installate
- B) Blocca (freeze) il progetto impedendo ulteriori modifiche
- C) Salva l'elenco delle librerie installate nel file indicato ✅
- D) Aggiorna automaticamente tutte le librerie all'ultima versione

**3. Quale libreria si usa principalmente per manipolare dati tabellari in Python?**
- A) Matplotlib
- B) NumPy
- C) Pandas ✅
- D) Requests

**4. In una classe Python, cosa rappresenta il parametro `self`?**
- A) Il nome della classe
- B) Un riferimento all'istanza (oggetto) corrente ✅
- C) Un metodo speciale sempre obbligatorio da chiamare per primo
- D) Una variabile globale condivisa da tutte le classi

**5. Cosa permette di fare l'ereditarietà in OOP?**
- A) Eliminare una classe esistente
- B) Creare una nuova classe che riusa attributi e metodi di una classe esistente ✅
- C) Eseguire due classi contemporaneamente
- D) Convertire una classe in una funzione

**6. A cosa serve un breakpoint nel debugger di VS Code?**
- A) A interrompere definitivamente l'esecuzione del programma
- B) A fermare l'esecuzione in un punto preciso per ispezionare lo stato del programma ✅
- C) A cancellare automaticamente gli errori dal codice
- D) A creare un nuovo ambiente virtuale

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo

**Consegna:** Estendi il laboratorio del punto 6 trasformandolo in un piccolo progetto completo:

1. Struttura il progetto in più file: `dataset.py` (classe `DatasetVoti`), `main.py` (script di utilizzo), `requirements.txt`.
2. Aggiungi alla classe `DatasetVoti` un metodo `aggiungi_voto(studente, materia, voto)` che permetta di inserire nuovi dati senza dover riscrivere il CSV a mano.
3. Crea una classe `StudenteEccellenza(DatasetVoti)` (o una struttura equivalente) che, ereditando dalla classe base, aggiunga un metodo `studenti_eccellenti(soglia)` per individuare gli studenti con media sopra una certa soglia.
4. Documenta ogni classe e metodo con una docstring chiara.
5. Verifica il funzionamento con almeno un breakpoint testato nel debugger, e allega uno screenshot (facoltativo) della sessione di debug.

Questo progetto sarà la base tecnica su cui costruirai il Project Work di fine Livello Intermedio: il classificatore Machine Learning.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `guida_setup_vscode.md` — Guida passo-passo all'installazione di Python, VS Code e delle estensioni necessarie (Windows/macOS/Linux)
- 📄 `dati_voti_esempio.csv` — Dataset di esempio per il laboratorio
- 📄 `classe_dataset_soluzione.py` — Soluzione commentata del laboratorio (da consultare solo dopo il tentativo autonomo)
- 📄 `cheatsheet_oop_python.md` — Riassunto sintattico di classi, oggetti ed ereditarietà in Python

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Lutz, M. — *Learning Python*, O'Reilly Media
- McKinney, W. — *Python for Data Analysis* (creatore di Pandas), O'Reilly Media
- Ramalho, L. — *Fluent Python*, O'Reilly Media
- PEP 8 — *Style Guide for Python Code* (documento ufficiale Python Software Foundation)

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Python: docs.python.org
- Documentazione ufficiale VS Code Python: code.visualstudio.com/docs/python/python-tutorial
- Documentazione ufficiale NumPy: numpy.org/doc
- Documentazione ufficiale Pandas: pandas.pydata.org/docs
- Documentazione ufficiale Matplotlib: matplotlib.org/stable/index.html

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Prosegui con il Modulo 5: Data Analysis]**
