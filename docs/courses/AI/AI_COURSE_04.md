# Modulo 4
# Python per l'Intelligenza Artificiale
### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com
### Ottimizzata per Google Colab · Aggiornata al Luglio 2026

---

**Livello:** 🟡 Intermedio

**Codice Modulo:** M4

**Versione:** 1.0

**Tempo di studio stimato:** 15–20 ore

**Difficoltà:** ★★★☆☆

---

<a id="indice"></a>

# Indice

1. [Introduzione al Modulo](#introduzione)
2. [Installazione di Python, Visual Studio Code e Git](#installazione-python)
3. [Ambienti virtuali, pip e gestione dei pacchetti](#ambienti-virtuali)
4. [Sintassi Python essenziale per l'AI](#sintassi-python)
5. [Programmazione Orientata agli Oggetti (OOP)](#oop)
6. [NumPy: il calcolo numerico](#numpy)
7. [Pandas: analisi e manipolazione dei dati](#pandas)
8. [Matplotlib: visualizzazione dei dati](#matplotlib)
9. [Laboratorio completo: primo progetto di Data Analysis](#laboratorio-m4)
10. [Quiz finale](#quiz)

---

<a id="introduzione"></a>

# Introduzione al Modulo

[⬆️ Torna all'Indice](#indice)

---

# Perché imparare Python?

L'Intelligenza Artificiale moderna si basa su modelli matematici complessi, grandi quantità di dati e potenti librerie software. Per interagire con questi strumenti è necessario utilizzare un linguaggio di programmazione che sia:

- semplice da imparare;
- leggibile;
- potente;
- multipiattaforma;
- supportato dalla comunità scientifica.

Negli ultimi anni **Python** è diventato lo standard de facto per lo sviluppo di applicazioni di Intelligenza Artificiale, Machine Learning, Deep Learning e Data Science.

Oggi praticamente tutte le principali librerie AI sono sviluppate o rese disponibili per Python.

---

# Perché Python è il linguaggio dell'AI?

Python possiede numerose caratteristiche che lo rendono ideale.

## Sintassi semplice

Il codice è molto leggibile e vicino al linguaggio naturale.

```python
print("Ciao Mondo")
```

---

## Grande ecosistema

Python mette a disposizione migliaia di librerie dedicate a:

- Intelligenza Artificiale;
- Machine Learning;
- Deep Learning;
- Data Science;
- Computer Vision;
- Robotica;
- Automazione;
- Cybersecurity.

---

## Comunità enorme

Milioni di sviluppatori contribuiscono ogni giorno allo sviluppo di:

- librerie;
- framework;
- tutorial;
- documentazione;
- strumenti open source.

Questo significa trovare facilmente esempi, soluzioni e supporto.

---

## Compatibilità

Python funziona praticamente ovunque.

```
Windows

Linux

macOS

Cloud

Raspberry Pi

Server

Supercomputer
```

Lo stesso programma può essere eseguito senza modifiche significative su sistemi operativi differenti.

---

# Python nell'ecosistema AI

La quasi totalità delle piattaforme AI utilizza Python come linguaggio principale.

```
             Python

                │

 ┌──────────────┼──────────────┐

 │              │              │

TensorFlow   PyTorch    Scikit-Learn

 │              │              │

 └──────────────┼──────────────┘

                │

      Applicazioni AI Moderne
```

---

# Obiettivi del Modulo

Al termine di questo modulo sarai in grado di:

- installare correttamente Python;
- configurare Visual Studio Code;
- utilizzare Git per il versionamento del codice;
- creare ambienti virtuali;
- installare librerie tramite **pip**;
- comprendere la sintassi fondamentale di Python;
- utilizzare la Programmazione Orientata agli Oggetti;
- lavorare con **NumPy**;
- analizzare dati con **Pandas**;
- creare grafici con **Matplotlib**;
- realizzare un primo progetto completo di Data Analysis.

---

# Prerequisiti

Prima di affrontare questo modulo è consigliato aver completato:

- ✅ Modulo 1 — Fondamenti dell'Intelligenza Artificiale
- ✅ Modulo 2 — Prompt Engineering
- ✅ Modulo 3 — Etica, Privacy e AI Act

Non è richiesta una precedente esperienza professionale di programmazione, ma è utile avere familiarità con:

- utilizzo del computer;
- gestione di file e cartelle;
- navigazione web;
- utilizizzo del terminale (facoltativo).

---

# Materiale necessario

Per seguire tutte le esercitazioni serviranno:

## Hardware

- PC Windows 10/11, Linux o macOS;
- almeno 8 GB di RAM (16 GB consigliati);
- circa 10 GB di spazio libero.

---

## Software

Durante il modulo installeremo:

- Python;
- Visual Studio Code;
- Git;
- Jupyter;
- NumPy;
- Pandas;
- Matplotlib.

Tutti gli strumenti utilizzati sono gratuiti.

---

# Metodo didattico

Ogni argomento seguirà sempre la stessa struttura.

```
Teoria

↓

Dimostrazione

↓

Codice

↓

Laboratorio

↓

Quiz

↓

Competenza acquisita
```

Questo approccio permette di consolidare progressivamente le conoscenze e sviluppare competenze immediatamente spendibili.

---

# Come studiare questo modulo

Per ottenere il massimo beneficio è consigliabile:

1. leggere attentamente la teoria;
2. ricopiare manualmente tutti gli esempi di codice;
3. eseguire ogni programma in locale;
4. sperimentare modificando gli esempi;
5. completare i laboratori proposti;
6. svolgere il quiz finale senza consultare gli appunti.

L'apprendimento della programmazione richiede pratica costante: leggere il codice non è sufficiente, è necessario scriverlo ed eseguirlo.

---

# Struttura del Modulo

```
Parte 1
Introduzione

↓

Parte 2
Installazione ambiente

↓

Parte 3
Ambienti virtuali e pip

↓

Parte 4
Sintassi Python

↓

Parte 5
Programmazione a Oggetti

↓

Parte 6
NumPy

↓

Parte 7
Pandas

↓

Parte 8
Matplotlib

↓

Parte 9
Laboratorio completo

↓

Parte 10
Quiz • Glossario • Riepilogo
```

---

# Competenze che svilupperai

Alla fine del modulo sarai in grado di costruire autonomamente un ambiente professionale di sviluppo Python per l'AI e di utilizzare le principali librerie per l'analisi dei dati.

Queste competenze costituiranno la base indispensabile per il **Modulo 5**, dedicato al Machine Learning.

---

# Cosa NON impareremo ancora

Per mantenere una progressione didattica graduale, in questo modulo non affronteremo ancora:

- reti neurali;
- Deep Learning;
- TensorFlow;
- PyTorch;
- Transformer;
- Large Language Models;
- AI Agent.

Questi argomenti saranno sviluppati approfonditamente nei moduli successivi.

---

# Best Practice

✔ Installa sempre software proveniente da fonti ufficiali.

✔ Mantieni aggiornato l'ambiente di sviluppo.

✔ Organizza il codice in cartelle dedicate.

✔ Commenta il codice quando necessario.

✔ Esegui frequentemente il backup dei progetti.

✔ Utilizza Git fin dai primi esercizi.

✔ Sperimenta modificando gli esempi proposti.

---

# Sintesi della Parte 1

[⬆️ Torna all'Indice](#indice)

In questa prima parte abbiamo:

- compreso il ruolo di Python nell'Intelligenza Artificiale;
- definito gli obiettivi del modulo;
- analizzato il percorso didattico;
- individuato il software necessario;
- presentato il metodo di studio che verrà utilizzato.

Nella prossima parte installeremo tutti gli strumenti necessari per trasformare il computer in una vera workstation professionale per lo sviluppo di applicazioni AI.

---

# Verifica rapida

## Domanda 1

Qual è il linguaggio di programmazione più utilizzato nello sviluppo di applicazioni di Intelligenza Artificiale?

A. Java

B. Python

C. C#

D. PHP

**Risposta corretta:** **B**

---

## Domanda 2

Quale tra questi strumenti NON verrà installato in questo modulo?

A. Visual Studio Code

B. Git

C. NumPy

D. TensorFlow

**Risposta corretta:** **D**

---

## Domanda 3

Qual è l'obiettivo principale del Modulo 4?

A. Costruire una rete neurale

B. Imparare a utilizzare Python e preparare l'ambiente di sviluppo per l'AI

C. Addestrare un Large Language Model

D. Creare un chatbot

**Risposta corretta:** **B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="installazione-python"></a>

# 2. Installazione di Python, Visual Studio Code e Git

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Prima di poter sviluppare applicazioni di **Intelligenza Artificiale**, è necessario predisporre un ambiente di sviluppo professionale.

Un ambiente ben configurato permette di:

- scrivere codice in modo efficiente;
- eseguire programmi Python;
- installare librerie per Machine Learning e Data Science;
- utilizzare strumenti di debugging;
- gestire progetti complessi;
- collaborare con altri sviluppatori.

L'obiettivo di questa parte è trasformare il proprio computer in una **workstation professionale** pronta per affrontare tutti i laboratori del corso.

---

# L'ambiente di sviluppo

Uno sviluppatore AI utilizza normalmente quattro componenti fondamentali.

```
                Workstation AI

        ┌─────────────────────────────┐
        │      Sistema Operativo      │
        └──────────────┬──────────────┘
                       │
      ┌────────────────┼────────────────┐
      │                │                │
      ▼                ▼                ▼

   Python          VS Code            Git

      │                │                │

      └────────────────┼────────────────┘
                       │
                Librerie Python

                       │

      ┌────────────────┼────────────────┐
      │                │                │

    NumPy           Pandas        Matplotlib

                       │

                Machine Learning
```

Ogni componente svolge un ruolo preciso.

---

<a id="python"></a>

# 2.1 Python

[⬆️ Torna all'Indice](#indice)

Python è il linguaggio di programmazione più utilizzato nel settore dell'Intelligenza Artificiale.

La sua diffusione è dovuta a numerosi fattori.

## Sintassi semplice

Python utilizza una sintassi molto leggibile.

Esempio:

```python
print("Benvenuto nel corso di AI")
```

Anche chi non ha mai programmato riesce a comprendere facilmente questo codice.

---

## Ecosistema enorme

Python dispone di migliaia di librerie.

Tra le più importanti troviamo:

| Libreria | Utilizzo |
|----------|----------|
| NumPy | Calcolo numerico |
| Pandas | Analisi dei dati |
| Matplotlib | Grafici |
| Scikit-Learn | Machine Learning |
| TensorFlow | Deep Learning |
| PyTorch | Deep Learning |
| OpenCV | Computer Vision |
| Transformers | Large Language Models |

---

## Comunità mondiale

Milioni di sviluppatori utilizzano Python ogni giorno.

Questo significa:

- enorme documentazione;
- migliaia di esempi;
- forum di supporto;
- aggiornamenti continui.

---

## Compatibilità

Python funziona praticamente su qualsiasi piattaforma.

```
Windows

Linux

macOS

Cloud

Server

Raspberry Pi
```

Lo stesso programma può essere eseguito senza modifiche significative su sistemi operativi differenti.

---

<a id="installazione-python-win"></a>

# 2.2 Installazione di Python

[⬆️ Torna all'Indice](#indice)

Python deve essere scaricato **esclusivamente** dal sito ufficiale.

```
https://www.python.org
```

---

# Versione consigliata

È buona norma utilizzare sempre una versione stabile recente.

Ad esempio:

```
Python 3.13.x
```

oppure la versione stabile più recente disponibile al momento dell'installazione.

---

# Installazione su Windows

Durante il setup è fondamentale selezionare la casella:

```
☑ Add Python to PATH
```

Questa opzione permette di utilizzare Python direttamente dal terminale.

Successivamente scegliere:

```
Install Now
```

---

# Installazione su Linux

Su molte distribuzioni Python è già installato.

Per verificarlo:

```bash
python3 --version
```

Se necessario:

```bash
sudo apt install python3
```

oppure utilizzare il gestore pacchetti della propria distribuzione.

---

# Installazione su macOS

È consigliabile installare Python dal sito ufficiale oppure tramite Homebrew.

```bash
brew install python
```

---

<a id="verifica-python"></a>

# 2.3 Verifica dell'installazione

[⬆️ Torna all'Indice](#indice)

Aprire il terminale.

Digitare:

```bash
python --version
```

oppure

```bash
python3 --version
```

Output atteso:

```
Python 3.13.x
```

---

# Verifica di pip

Python installa automaticamente anche **pip**, il gestore dei pacchetti.

Digitare:

```bash
pip --version
```

oppure

```bash
pip3 --version
```

Output:

```
pip 25.x.x
```

Se entrambi i comandi funzionano correttamente, l'installazione è completata.

---

<a id="vscode"></a>

# 2.4 Visual Studio Code

[⬆️ Torna all'Indice](#indice)

Visual Studio Code è uno degli editor di codice più utilizzati al mondo.

Non è semplicemente un editor di testo.

È un vero e proprio ambiente di sviluppo professionale.

---

# Funzionalità principali

VS Code offre:

- evidenziazione della sintassi;
- completamento automatico;
- debugger;
- terminale integrato;
- controllo di versione Git;
- gestione delle estensioni;
- supporto ai principali linguaggi di programmazione.

---

# Download

Scaricare Visual Studio Code dal sito ufficiale.

```
https://code.visualstudio.com
```

---

# Installazione

Durante il setup è consigliabile selezionare:

```
☑ Add to PATH

☑ Register Code as editor

☑ Add "Open with Code"

☑ Add to context menu
```

---

# Primo avvio

L'interfaccia principale è composta da:

```
Explorer

Search

Source Control

Run & Debug

Extensions

Settings
```

Con il tempo impareremo a utilizzare ciascuna di queste sezioni.

---

<a id="estensioni"></a>

# 2.5 Estensioni consigliate

[⬆️ Torna all'Indice](#indice)

VS Code diventa estremamente potente grazie alle estensioni.

Per il corso installeremo le seguenti.

---

## Python

Autore:

Microsoft

Permette di:

- eseguire programmi Python;
- utilizzare il debugger;
- ottenere suggerimenti automatici.

---

## Pylance

Fornisce:

- IntelliSense avanzato;
- controllo del codice;
- suggerimenti intelligenti.

---

## Jupyter

Consente di aprire ed eseguire notebook:

```
.ipynb
```

direttamente in Visual Studio Code.

---

## Markdown All in One

Molto utile per:

- documentazione;
- README;
- guide in Markdown.

---

## GitLens (facoltativa)

Migliora l'integrazione con Git.

---

## Continue / GitHub Copilot (facoltative)

Assistenti AI per lo sviluppo del codice.

Nel corso verranno mostrati sia strumenti open source sia soluzioni commerciali.

---

<a id="git"></a>

# 2.6 Git

[⬆️ Torna all'Indice](#indice)

Git è il sistema di controllo di versione più utilizzato nel mondo dello sviluppo software.

Permette di:

- salvare la cronologia del progetto;
- recuperare versioni precedenti;
- collaborare con altri programmatori;
- gestire modifiche complesse.

---

# Download

Scaricare Git dal sito ufficiale.

```
https://git-scm.com
```

---

# Verifica

Aprire il terminale.

Digitare:

```bash
git --version
```

Output:

```
git version 2.xx.x
```

---

# Configurazione iniziale

Configurare il nome utente.

```bash
git config --global user.name "Mario Rossi"
```

Configurare l'indirizzo email.

```bash
git config --global user.email "mario@email.it"
```

Visualizzare la configurazione.

```bash
git config --list
```

---

<a id="primo-programma"></a>

# 2.7 Il primo programma Python

[⬆️ Torna all'Indice](#indice)

Creare una nuova cartella:

```
Modulo4
```

All'interno creare il file:

```
hello_ai.py
```

Inserire il seguente codice.

```python
print("Benvenuto nel corso di Intelligenza Artificiale!")
```

Salvare il file.

Aprire il terminale nella cartella del progetto ed eseguire:

```bash
python hello_ai.py
```

Output:

```
Benvenuto nel corso di Intelligenza Artificiale!
```

Congratulazioni!

Hai eseguito il tuo primo programma Python.

---

<a id="errori-comuni"></a>

# 2.8 Errori comuni

[⬆️ Torna all'Indice](#indice)

## Errore

```
python is not recognized...
```

### Possibile causa

Python non è stato aggiunto al PATH.

---

## Errore

```
pip is not recognized...
```

### Possibile causa

Installazione incompleta oppure PATH errato.

---

## Errore

VS Code non trova Python.

### Soluzione

Aprire:

```
CTRL + SHIFT + P
```

Digitare:

```
Python: Select Interpreter
```

e selezionare l'interprete corretto.

---

## Errore

Git non funziona.

Verificare:

```bash
git --version
```

Se il comando non viene riconosciuto, reinstallare Git.

---

# Best Practice

✔ Installare sempre software ufficiale.

✔ Aggiornare periodicamente Python.

✔ Utilizzare Visual Studio Code aggiornato.

✔ Installare solo estensioni realmente necessarie.

✔ Controllare sempre la versione di Python prima di iniziare un nuovo progetto.

✔ Creare una cartella dedicata per ogni progetto.

✔ Utilizzare Git fin dall'inizio dello sviluppo.

---

# Sintesi della Parte 2

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato a:

- installare Python;
- verificare Python e pip;
- installare Visual Studio Code;
- configurare le principali estensioni;
- installare Git;
- creare il primo programma Python;
- risolvere gli errori più frequenti.

Questa configurazione costituirà la base per tutti i laboratori del corso.

---

# Verifica rapida

## Domanda 1

Quale comando permette di verificare la versione di Python?

A. `python --version`

B. `python install`

C. `python update`

D. `python check`

**Risposta corretta:** A

---

## Domanda 2

Quale estensione di Visual Studio Code è indispensabile per sviluppare in Python?

A. Docker

B. Python (Microsoft)

C. SQL Server

D. Java

**Risposta corretta:** B

---

## Domanda 3

A cosa serve Git?

A. Creare database

B. Gestire le versioni del codice

C. Installare Python

D. Creare reti neurali

**Risposta corretta:** B

---

[⬆️ Torna all'Indice](#indice)

---

<a id="ambienti-virtuali"></a>

# 3. Ambienti Virtuali, pip e Gestione Professionale dei Pacchetti

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Man mano che un progetto Python cresce, aumenta anche il numero di librerie necessarie.

Un semplice programma di Machine Learning può richiedere decine di dipendenze, mentre un progetto di Deep Learning può utilizzarne centinaia.

Senza una corretta gestione dei pacchetti, i progetti diventano rapidamente difficili da mantenere.

Per questo motivo, gli sviluppatori professionisti utilizzano gli **ambienti virtuali (Virtual Environment)**.

---

# Perché utilizzare un ambiente virtuale?

Immaginiamo di avere due progetti differenti.

## Progetto A

Richiede:

```
NumPy 2.2

Pandas 2.3

Scikit-Learn 1.7
```

---

## Progetto B

Richiede:

```
NumPy 1.26

TensorFlow 2.18

Pandas 2.1
```

Se entrambe le configurazioni fossero installate globalmente sul computer, nascerebbero inevitabilmente conflitti di versione.

Un aggiornamento di una libreria potrebbe compromettere il funzionamento dell'altro progetto.

Gli ambienti virtuali risolvono completamente questo problema.

---

# Come funziona un Virtual Environment

Ogni progetto dispone di una copia isolata delle librerie Python.

```
                    Computer

                        │

        ┌───────────────┴───────────────┐

        ▼                               ▼

   Progetto AI 1                  Progetto AI 2

        │                               │

      venv                            venv

        │                               │

 NumPy 2.2                       NumPy 1.26

 Pandas 2.3                     TensorFlow 2.18

 Scikit-Learn                  Pandas 2.1
```

Ogni progetto è indipendente dagli altri.

---

<a id="venv"></a>

# 3.1 Cos'è venv

[⬆️ Torna all'Indice](#indice)

Python include già uno strumento ufficiale per creare ambienti virtuali.

Si chiama:

```
venv
```

Non è necessario installare software aggiuntivo.

---

# Vantaggi

L'utilizzo di `venv` permette di:

- isolare le dipendenze;
- evitare conflitti;
- mantenere i progetti ordinati;
- facilitare la collaborazione;
- semplificare il deployment.

Per questi motivi è lo standard adottato nella maggior parte dei progetti Python.

---

<a id="creazione-venv"></a>

# 3.2 Creazione di un ambiente virtuale

[⬆️ Torna all'Indice](#indice)

Creiamo una nuova cartella di progetto.

```bash
mkdir progetto_ai
```

Entriamo nella cartella.

```bash
cd progetto_ai
```

Creiamo l'ambiente virtuale.

```bash
python -m venv .venv
```

oppure, su alcuni sistemi:

```bash
python3 -m venv .venv
```

Verrà creata una cartella chiamata:

```
.venv
```

contenente un'installazione isolata di Python.

---

# Struttura della cartella

```
progetto_ai/

│

├── .venv/

├── main.py

└── README.md
```

La cartella `.venv` contiene:

- interprete Python;
- pip;
- librerie installate;
- file di configurazione.

---

<a id="attivazione-venv"></a>

# 3.3 Attivazione dell'ambiente virtuale

[⬆️ Torna all'Indice](#indice)

L'ambiente deve essere attivato prima di installare librerie.

## Windows

```bash
.venv\Scripts\activate
```

---

## Linux

```bash
source .venv/bin/activate
```

---

## macOS

```bash
source .venv/bin/activate
```

---

Quando l'attivazione è avvenuta correttamente, il terminale mostrerà un prefisso simile a:

```
(.venv)

C:\progetto_ai>
```

oppure

```
(.venv)

utente@computer:~/progetto_ai$
```

---

<a id="disattivazione"></a>

# 3.4 Disattivazione

[⬆️ Torna all'Indice](#indice)

Per uscire dall'ambiente virtuale è sufficiente digitare:

```bash
deactivate
```

Il terminale tornerà allo stato normale.

---

<a id="pip"></a>

# 3.5 Il gestore pacchetti pip

[⬆️ Torna all'Indice](#indice)

Python utilizza **pip** per installare librerie esterne.

Il nome deriva da:

```
Pip Installs Packages
```

Con pip possiamo:

- installare librerie;
- aggiornarle;
- rimuoverle;
- visualizzare quelle installate.

---

# Installazione di una libreria

Ad esempio, installiamo NumPy.

```bash
pip install numpy
```

---

Installiamo Pandas.

```bash
pip install pandas
```

---

Installiamo Matplotlib.

```bash
pip install matplotlib
```

---

È possibile installare più librerie contemporaneamente.

```bash
pip install numpy pandas matplotlib
```

---

<a id="aggiornamento"></a>

# 3.6 Aggiornare una libreria

[⬆️ Torna all'Indice](#indice)

Per aggiornare una libreria:

```bash
pip install --upgrade numpy
```

oppure

```bash
pip install --upgrade pandas
```

---

<a id="disinstallazione"></a>

# 3.7 Disinstallare una libreria

[⬆️ Torna all'Indice](#indice)

Per rimuovere un pacchetto:

```bash
pip uninstall numpy
```

Il sistema chiederà conferma prima della rimozione.

---

<a id="lista-pacchetti"></a>

# 3.8 Visualizzare le librerie installate

[⬆️ Torna all'Indice](#indice)

Per ottenere l'elenco completo:

```bash
pip list
```

Output semplificato:

```
numpy

pandas

matplotlib

pip

setuptools
```

---

Per ottenere maggiori informazioni su un pacchetto:

```bash
pip show pandas
```

---

<a id="requirements"></a>

# 3.9 Il file requirements.txt

[⬆️ Torna all'Indice](#indice)

Uno dei file più importanti di un progetto Python è:

```
requirements.txt
```

Contiene l'elenco delle librerie necessarie.

Esempio:

```text
numpy==2.2.0
pandas==2.3.0
matplotlib==3.10.0
scikit-learn==1.7.0
```

---

# Creazione automatica

Per generarlo:

```bash
pip freeze > requirements.txt
```

---

# Installazione automatica

Un altro sviluppatore potrà ricreare lo stesso ambiente con:

```bash
pip install -r requirements.txt
```

Questa è una pratica fondamentale nello sviluppo professionale.

---

<a id="struttura-progetto"></a>

# 3.10 Organizzazione di un progetto Python

[⬆️ Torna all'Indice](#indice)

Una possibile struttura professionale è la seguente.

```
progetto_ai/

│

├── .venv/

├── data/

├── notebooks/

├── src/

├── tests/

├── requirements.txt

├── README.md

└── main.py
```

Ogni cartella ha una funzione specifica.

| Cartella | Contenuto |
|----------|-----------|
| `.venv` | Ambiente virtuale |
| `data` | Dataset |
| `src` | Codice sorgente |
| `tests` | Test automatici |
| `notebooks` | Notebook Jupyter |
| `README.md` | Documentazione |
| `requirements.txt` | Dipendenze |

---

# Best Practice

✔ Creare un ambiente virtuale per ogni progetto.

✔ Non condividere la cartella `.venv`.

✔ Utilizzare sempre `requirements.txt`.

✔ Installare solo le librerie realmente necessarie.

✔ Aggiornare periodicamente i pacchetti.

✔ Organizzare il codice in cartelle dedicate.

✔ Utilizzare Git insieme agli ambienti virtuali.

---

# Errori comuni

## Installare librerie globalmente

Può generare conflitti tra progetti.

---

## Dimenticare di attivare il Virtual Environment

Le librerie verranno installate nell'ambiente globale.

---

## Eliminare accidentalmente `requirements.txt`

Renderebbe difficile ricostruire l'ambiente di sviluppo.

---

## Versioni differenti delle librerie

Possono produrre risultati diversi o errori difficili da individuare.

---

# Sintesi della Parte 3

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato a:

- comprendere il ruolo degli ambienti virtuali;
- creare un Virtual Environment con `venv`;
- attivarlo e disattivarlo;
- utilizzare `pip`;
- installare, aggiornare e rimuovere librerie;
- creare il file `requirements.txt`;
- organizzare un progetto Python in modo professionale.

Queste competenze saranno utilizzate in tutti i moduli successivi del corso.

---

# Verifica rapida

## Domanda 1

Qual è lo scopo principale di un ambiente virtuale?

A. Velocizzare Python.

B. Isolare le dipendenze di un progetto.

C. Ridurre l'utilizzo della RAM.

D. Compilare il codice.

**Risposta corretta:** **B**

---

## Domanda 2

Quale comando crea un ambiente virtuale?

A.

```bash
python install venv
```

B.

```bash
python -m venv .venv
```

C.

```bash
pip create venv
```

D.

```bash
venv install
```

**Risposta corretta:** **B**

---

## Domanda 3

A cosa serve il file `requirements.txt`?

A. Contiene il codice sorgente.

B. Elenca le librerie necessarie al progetto.

C. Avvia Python.

D. Configura Visual Studio Code.

**Risposta corretta:** **B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="sintassi-python"></a>

# 4. Sintassi Python Essenziale per l'Intelligenza Artificiale

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Dopo aver configurato l'ambiente di sviluppo, è arrivato il momento di imparare il linguaggio con cui realizzeremo tutti i progetti del corso.

In questa parte studieremo la sintassi fondamentale di Python, concentrandoci sugli elementi realmente utilizzati nello sviluppo di applicazioni di **Intelligenza Artificiale**, **Machine Learning** e **Data Science**.

L'obiettivo non è imparare tutto Python, ma acquisire una solida base per comprendere il codice che utilizzeremo nei moduli successivi.

---

# Come viene eseguito un programma Python

Quando eseguiamo un file `.py`, Python interpreta il codice riga per riga.

```
             File Python

                  │

                  ▼

          Interprete Python

                  │

                  ▼

        Istruzioni eseguite

                  │

                  ▼

              Output
```

A differenza di linguaggi compilati come C++, Python è un linguaggio interpretato.

Questo rende lo sviluppo molto più rapido.

---

<a id="variabili"></a>

# 4.1 Variabili

[⬆️ Torna all'Indice](#indice)

Una variabile rappresenta uno spazio di memoria al quale viene associato un nome.

Esempio:

```python
nome = "Giuseppe"

eta = 18

altezza = 1.75
```

Python crea automaticamente il tipo corretto senza bisogno di dichiararlo.

---

## Regole di denominazione

Una variabile:

✔ può contenere lettere;

✔ può contenere numeri (non come primo carattere);

✔ può contenere il carattere `_`;

✔ distingue maiuscole e minuscole.

Esempi corretti:

```python
nome

eta

numero_studenti

media_voti
```

Esempi errati:

```python
2numero

media-voti

class
```

---

# Convenzioni (PEP 8)

La convenzione ufficiale di Python suggerisce di utilizzare:

```python
snake_case
```

Esempio:

```python
numero_studenti

media_esami

modello_ai
```

Questa convenzione migliora la leggibilità del codice.

---

<a id="tipi-dato"></a>

# 4.2 Tipi di dato

[⬆️ Torna all'Indice](#indice)

Python mette a disposizione numerosi tipi di dato.

I principali sono:

| Tipo | Descrizione | Esempio |
|------|-------------|----------|
| int | Numeri interi | `25` |
| float | Numeri decimali | `3.14` |
| str | Testo | `"AI"` |
| bool | Valori logici | `True` |
| list | Collezione ordinata | `[1,2,3]` |
| tuple | Collezione immutabile | `(1,2)` |
| dict | Coppie chiave-valore | `{"nome":"Anna"}` |
| set | Insieme non ordinato | `{1,2,3}` |

---

# Verificare il tipo

Utilizzare la funzione:

```python
type()
```

Esempio:

```python
numero = 10

print(type(numero))
```

Output:

```
<class 'int'>
```

---

<a id="input-output"></a>

# 4.3 Input e Output

[⬆️ Torna all'Indice](#indice)

L'output viene prodotto con:

```python
print()
```

Esempio:

```python
print("Benvenuto!")
```

---

Per acquisire dati dall'utente si utilizza:

```python
input()
```

Esempio:

```python
nome = input("Come ti chiami? ")

print(nome)
```

---

# Conversione dei tipi

L'input restituisce sempre una stringa.

Per ottenere un numero è necessario convertire il valore.

```python
eta = int(input("Età: "))
```

Per un numero decimale:

```python
peso = float(input("Peso: "))
```

---

<a id="operatori"></a>

# 4.4 Operatori

[⬆️ Torna all'Indice](#indice)

## Operatori aritmetici

| Operatore | Significato |
|-----------|-------------|
| + | Somma |
| - | Sottrazione |
| * | Moltiplicazione |
| / | Divisione |
| // | Divisione intera |
| % | Resto |
| ** | Potenza |

---

Esempio:

```python
a = 12

b = 5

print(a + b)

print(a * b)

print(a ** 2)
```

---

## Operatori di confronto

| Operatore | Significato |
|-----------|-------------|
| == | Uguale |
| != | Diverso |
| > | Maggiore |
| < | Minore |
| >= | Maggiore o uguale |
| <= | Minore o uguale |

---

Esempio:

```python
eta = 18

print(eta >= 18)
```

Output:

```
True
```

---

## Operatori logici

| Operatore | Significato |
|-----------|-------------|
| and | E logico |
| or | O logico |
| not | Negazione |

---

Esempio:

```python
studente = True

maggiorenne = True

print(studente and maggiorenne)
```

---

<a id="condizioni"></a>

# 4.5 Strutture condizionali

[⬆️ Torna all'Indice](#indice)

Python utilizza l'istruzione:

```python
if
```

Esempio:

```python
eta = 20

if eta >= 18:
    print("Maggiorenne")
```

---

# if - else

```python
eta = 16

if eta >= 18:
    print("Adulto")
else:
    print("Minorenne")
```

---

# if - elif - else

```python
voto = 27

if voto >= 28:
    print("Ottimo")
elif voto >= 24:
    print("Buono")
else:
    print("Da migliorare")
```

---

# L'indentazione

Python non utilizza parentesi graffe.

Utilizza invece l'indentazione.

Corretto:

```python
if True:
    print("OK")
```

Errato:

```python
if True:
print("OK")
```

L'indentazione è parte integrante della sintassi.

---

<a id="cicli"></a>

# 4.6 Cicli

[⬆️ Torna all'Indice](#indice)

Python mette a disposizione due cicli principali.

## for

```python
for i in range(5):
    print(i)
```

Output:

```
0
1
2
3
4
```

---

## while

```python
contatore = 0

while contatore < 5:
    print(contatore)
    contatore += 1
```

---

# Quando usare for

Il ciclo `for` viene utilizzato quando il numero di iterazioni è noto.

Esempio:

- elaborare un elenco di studenti;
- leggere un dataset;
- visitare una lista di immagini.

---

# Quando usare while

Il ciclo `while` viene utilizzato quando il numero di iterazioni non è noto in anticipo.

Esempio:

- attesa di un input valido;
- simulazioni;
- algoritmi iterativi.

---

<a id="funzioni"></a>

# 4.7 Funzioni

[⬆️ Torna all'Indice](#indice)

Le funzioni permettono di riutilizzare il codice.

Sintassi:

```python
def saluta():
    print("Ciao!")
```

Richiamo:

```python
saluta()
```

---

# Parametri

```python
def saluta(nome):

    print("Ciao", nome)
```

Esecuzione:

```python
saluta("Anna")
```

Output:

```
Ciao Anna
```

---

# Valore restituito

```python
def quadrato(numero):

    return numero ** 2
```

Esempio:

```python
risultato = quadrato(5)

print(risultato)
```

Output:

```
25
```

---

<a id="moduli-python"></a>

# 4.8 Importare moduli

[⬆️ Torna all'Indice](#indice)

Python organizza il codice in moduli.

Per utilizzarli si impiega:

```python
import
```

Esempio:

```python
import math
```

Calcolare una radice quadrata.

```python
print(math.sqrt(49))
```

Output:

```
7.0
```

---

Importare una singola funzione.

```python
from math import sqrt

print(sqrt(81))
```

---

<a id="esempio-ai"></a>

# 4.9 Primo esempio orientato all'AI

[⬆️ Torna all'Indice](#indice)

Supponiamo di voler calcolare la media di alcuni punteggi ottenuti da un modello AI.

```python
punteggi = [91, 88, 95, 90, 87]

media = sum(punteggi) / len(punteggi)

print(media)
```

Output:

```
90.2
```

Questo semplice programma utilizza concetti che verranno applicati continuamente nella Data Science.

---

# Best Practice

✔ Utilizzare nomi significativi per le variabili.

✔ Scrivere codice semplice e leggibile.

✔ Commentare solo quando realmente necessario.

✔ Evitare duplicazioni di codice.

✔ Suddividere il programma in funzioni.

✔ Seguire sempre lo standard **PEP 8**.

✔ Testare frequentemente il codice durante lo sviluppo.

---

# Errori comuni

## Dimenticare i due punti

Errato:

```python
if eta >= 18
```

Corretto:

```python
if eta >= 18:
```

---

## Indentazione errata

L'errore di indentazione è tra i più frequenti nei principianti.

---

## Confondere "=" con "=="

```python
=
```

assegna un valore.

```python
==
```

confronta due valori.

---

## Utilizzare variabili non inizializzate

```python
print(voto)
```

Se `voto` non è stato definito, Python genera un errore.

---

# Sintesi della Parte 4

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato:

- dichiarare variabili;
- utilizzare i principali tipi di dato;
- acquisire input e produrre output;
- utilizzare operatori;
- costruire strutture condizionali;
- creare cicli;
- definire funzioni;
- importare moduli;
- sviluppare i primi programmi orientati all'Intelligenza Artificiale.

Queste competenze rappresentano il nucleo fondamentale del linguaggio Python e saranno utilizzate in tutti i laboratori successivi.

---

# Verifica rapida

## Domanda 1

Quale funzione permette di visualizzare un messaggio sullo schermo?

A. `input()`

B. `show()`

C. `print()`

D. `display()`

**Risposta corretta:** **C**

---

## Domanda 2

Quale struttura viene utilizzata per eseguire ripetutamente un blocco di codice?

A. `if`

B. `for`

C. `print`

D. `import`

**Risposta corretta:** **B**

---

## Domanda 3

Quale parola chiave permette di definire una funzione?

A. `class`

B. `return`

C. `def`

D. `function`

**Risposta corretta:** **C**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="oop"></a>

# 5. Programmazione Orientata agli Oggetti (OOP)

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

La **Programmazione Orientata agli Oggetti** (Object-Oriented Programming, OOP) è uno dei paradigmi più importanti nello sviluppo software moderno.

Python supporta completamente la programmazione a oggetti e molte delle librerie utilizzate nell'Intelligenza Artificiale sono costruite proprio utilizzando questo approccio.

Comprendere la OOP è fondamentale per:

- utilizzare correttamente framework AI;
- comprendere il funzionamento delle librerie Machine Learning;
- progettare codice riutilizzabile;
- costruire applicazioni software complesse.

---

# Perché utilizzare la Programmazione Orientata agli Oggetti?

Nei programmi semplici possiamo utilizzare funzioni e variabili.

Esempio:

```python
nome = "Modello AI"

accuratezza = 0.95

versione = "1.0"
```

Quando però un progetto cresce, questa organizzazione diventa difficile da gestire.

La programmazione a oggetti permette di raggruppare:

```
Dati

+

Funzioni

=

Oggetto
```

---

# Il concetto di Oggetto

Un oggetto rappresenta un'entità reale o astratta.

Esempi nel mondo AI:

```
Modello di Machine Learning

Dataset

Utente

Robot

Agente AI

Neurone artificiale
```

Ogni oggetto possiede:

- caratteristiche;
- comportamenti.

---

# Esempio concettuale

Un modello AI può avere:

## Attributi

```
nome

versione

accuratezza

numero_parametri
```

## Metodi

```
addestra()

prevedi()

valuta()

salva()
```

---

<a id="classe"></a>

# 5.1 Classe: il progetto dell'oggetto

[⬆️ Torna all'Indice](#indice)

Una **classe** è un modello che definisce come creare gli oggetti.

Possiamo immaginarla come un progetto architettonico.

```
Classe

     │

     ▼

Oggetti creati dalla classe
```

---

Esempio:

```python
class ModelloAI:

    pass
```

Abbiamo creato una classe vuota chiamata:

```
ModelloAI
```

---

# Creazione di un oggetto

Per creare un oggetto utilizziamo la classe.

```python
modello = ModelloAI()
```

Ora abbiamo un'istanza della classe.

---

# Classe e istanza

La differenza è:

| Termine | Significato |
|---|---|
| Classe | Modello / struttura |
| Oggetto | Elemento creato dalla classe |
| Istanza | Sinonimo di oggetto |

---

<a id="attributi"></a>

# 5.2 Attributi

[⬆️ Torna all'Indice](#indice)

Gli attributi rappresentano le caratteristiche di un oggetto.

Esempio:

```python
class ModelloAI:

    nome = "Rete Neurale"

    versione = "1.0"
```

Creiamo un oggetto:

```python
modello = ModelloAI()

print(modello.nome)
```

Output:

```
Rete Neurale
```

---

# Il metodo costruttore __init__

Nella pratica gli attributi vengono creati utilizzando il costruttore.

Il metodo:

```python
__init__()
```

viene eseguito automaticamente quando viene creato un oggetto.

---

Esempio:

```python
class ModelloAI:

    def __init__(self, nome, accuratezza):

        self.nome = nome

        self.accuratezza = accuratezza
```

Creazione:

```python
modello = ModelloAI(
    "Classificatore immagini",
    0.95
)
```

Accesso:

```python
print(modello.nome)

print(modello.accuratezza)
```

Output:

```
Classificatore immagini

0.95
```

---

# Il parametro self

Il parametro:

```python
self
```

rappresenta l'oggetto stesso.

Permette di accedere ai suoi dati e ai suoi metodi.

Esempio:

```python
self.nome
```

significa:

"l'attributo nome dell'oggetto corrente".

---

<a id="metodi"></a>

# 5.3 Metodi

[⬆️ Torna all'Indice](#indice)

I metodi sono funzioni appartenenti a una classe.

Rappresentano le azioni che un oggetto può eseguire.

---

Esempio:

```python
class ModelloAI:

    def __init__(self, nome):

        self.nome = nome


    def descrivi(self):

        print(
            "Modello:",
            self.nome
        )
```

Utilizzo:

```python
modello = ModelloAI("GPT")

modello.descrivi()
```

Output:

```
Modello: GPT
```

---

# Metodi applicati all'AI

Un modello Machine Learning potrebbe avere:

```python
class ModelloML:

    def addestra(self):

        print("Training in corso")


    def predici(self, dato):

        return risultato
```

Metodi tipici:

```
train()

predict()

evaluate()

save()

load()
```

---

<a id="incapsulamento"></a>

# 5.4 Incapsulamento

[⬆️ Torna all'Indice](#indice)

L'incapsulamento permette di proteggere i dati interni di un oggetto.

L'obiettivo è evitare modifiche non controllate.

---

Esempio:

```python
class ModelloAI:

    def __init__(self):

        self.__password = "segreta"
```

L'attributo:

```
__password
```

è privato.

---

# Perché è importante nell'AI?

Un modello AI può contenere:

- parametri;
- configurazioni;
- informazioni sensibili;
- credenziali API.

Proteggere questi dati è fondamentale.

---

<a id="ereditarieta"></a>

# 5.5 Ereditarietà

[⬆️ Torna all'Indice](#indice)

L'ereditarietà permette di creare una nuova classe partendo da una classe esistente.

Esempio:

```python
class ModelloAI:

    def descrivi(self):

        print("Modello AI")
```

Creiamo una classe derivata:

```python
class ModelloDeepLearning(ModelloAI):

    pass
```

Ora:

```python
modello = ModelloDeepLearning()

modello.descrivi()
```

Output:

```
Modello AI
```

---

# Esempio nel Machine Learning

Possiamo avere:

```
ModelloAI

      │

      ├── ModelloClassificazione

      │

      ├── ModelloRegressione

      │

      └── ReteNeurale
```

Tutti condividono caratteristiche comuni.

---

<a id="polimorfismo"></a>

# 5.6 Polimorfismo

[⬆️ Torna all'Indice](#indice)

Il polimorfismo permette a oggetti diversi di utilizzare lo stesso metodo con comportamenti differenti.

Esempio:

```python
class ModelloAI:

    def esegui(self):

        pass
```

---

Classe 1:

```python
class ModelloTesto(ModelloAI):

    def esegui(self):

        print("Analisi testo")
```

Classe 2:

```python
class ModelloImmagine(ModelloAI):

    def esegui(self):

        print("Analisi immagini")
```

Stesso metodo:

```
esegui()
```

Comportamenti diversi.

---

<a id="oop-ai"></a>

# 5.7 Esempio completo: classe Modello AI

[⬆️ Torna all'Indice](#indice)

Realizziamo una semplice classe che rappresenta un modello.

```python
class ModelloAI:

    def __init__(self, nome, versione):

        self.nome = nome

        self.versione = versione

        self.accuratezza = None


    def addestra(self):

        print(
            "Addestramento",
            self.nome
        )


    def valuta(self, valore):

        self.accuratezza = valore


    def informazioni(self):

        print(
            "Nome:",
            self.nome
        )

        print(
            "Versione:",
            self.versione
        )

        print(
            "Accuratezza:",
            self.accuratezza
        )
```

Utilizzo:

```python
modello = ModelloAI(
    "Classificatore immagini",
    "1.0"
)

modello.addestra()

modello.valuta(0.96)

modello.informazioni()
```

Output:

```
Addestramento Classificatore immagini

Nome: Classificatore immagini

Versione: 1.0

Accuratezza: 0.96
```

---

<a id="librerie-oop"></a>

# 5.8 La OOP nelle librerie AI

[⬆️ Torna all'Indice](#indice)

Molte librerie professionali utilizzano la programmazione a oggetti.

Esempio con Scikit-Learn:

```python
from sklearn.linear_model import LinearRegression

modello = LinearRegression()
```

Qui:

```
LinearRegression
```

è una classe.

L'istruzione:

```python
LinearRegression()
```

crea un oggetto.

---

Successivamente:

```python
modello.fit(X, y)
```

utilizza un metodo dell'oggetto.

---

# Best Practice

✔ Creare classi con responsabilità chiare.

✔ Evitare classi troppo grandi.

✔ Utilizzare nomi descrittivi.

✔ Riutilizzare il codice tramite ereditarietà quando appropriato.

✔ Preferire composizione quando rende il progetto più semplice.

✔ Documentare classi e metodi importanti.

---

# Errori comuni

## Creare classi inutilmente

Non tutto deve essere trasformato in un oggetto.

---

## Dimenticare self

Errore:

```python
def metodo():

    print("ciao")
```

Corretto:

```python
def metodo(self):

    print("ciao")
```

---

## Confondere classe e oggetto

La classe è il modello.

L'oggetto è l'istanza creata.

---

# Sintesi della Parte 5

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato:

- il concetto di Programmazione Orientata agli Oggetti;
- differenza tra classe e oggetto;
- creazione di attributi;
- utilizzo del costruttore `__init__`;
- definizione dei metodi;
- incapsulamento;
- ereditarietà;
- polimorfismo;
- applicazione della OOP nel mondo AI.

Queste conoscenze saranno fondamentali per comprendere le librerie professionali di Machine Learning.

---

# Verifica rapida

## Domanda 1

Che cosa rappresenta una classe?

A. Un errore di programmazione

B. Un modello per creare oggetti

C. Una libreria Python

D. Un file di configurazione

**Risposta corretta:** **B**

---

## Domanda 2

Quale metodo viene chiamato automaticamente alla creazione di un oggetto?

A. start()

B. create()

C. __init__()

D. main()

**Risposta corretta:** **C**

---

## Domanda 3

Quale concetto permette a una classe di ereditarne un'altra?

A. Ciclo

B. Ereditarietà

C. Variabile

D. Importazione

**Risposta corretta:** **B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="numpy"></a>

# 6. NumPy: Il Calcolo Numerico per l'Intelligenza Artificiale

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

L'Intelligenza Artificiale moderna si basa principalmente sull'elaborazione di grandi quantità di dati numerici.

Immagini, testi, segnali audio e informazioni provenienti da sensori vengono trasformati in valori matematici che possono essere elaborati dai modelli AI.

Per gestire questi dati Python utilizza una delle librerie più importanti dell'intero ecosistema:

```
NumPy
```

---

# Che cos'è NumPy?

NumPy significa:

```
Numerical Python
```

È una libreria Python progettata per:

- calcolo scientifico;
- algebra lineare;
- manipolazione di matrici;
- elaborazione di grandi quantità di dati numerici.

È la base tecnologica su cui sono costruite molte altre librerie AI.

---

# Ecosistema scientifico Python

Molte librerie utilizzate nell'Intelligenza Artificiale dipendono direttamente o indirettamente da NumPy.

```
                 NumPy

                    │

        ┌───────────┼───────────┐

        ▼           ▼           ▼

     Pandas     SciPy     Scikit-Learn

                    │

                    ▼

          Machine Learning

                    │

                    ▼

             Deep Learning
```

---

# Installazione di NumPy

Prima di utilizzare NumPy è necessario installarlo nell'ambiente virtuale.

Attivare il proprio ambiente:

```bash
.venv\Scripts\activate
```

oppure:

```bash
source .venv/bin/activate
```

Installazione:

```bash
pip install numpy
```

Verifica:

```python
import numpy as np

print(np.__version__)
```

---

# Perché NumPy è importante nell'AI?

Un algoritmo di Intelligenza Artificiale lavora principalmente con:

- vettori;
- matrici;
- tensori.

Esempi:

```
Immagine RGB

altezza × larghezza × 3 canali


Testo convertito in embedding

1 × numero_dimensioni


Rete neurale

matrice dei pesi
```

Tutte queste strutture vengono rappresentate numericamente.

---

<a id="array"></a>

# 6.1 Gli array NumPy

[⬆️ Torna all'Indice](#indice)

L'elemento fondamentale di NumPy è:

```
ndarray
```

ovvero:

```
N-dimensional array
```

Un array NumPy è una struttura dati ottimizzata per lavorare con numeri.

---

# Lista Python e array NumPy

Con Python puro possiamo utilizzare le liste.

Esempio:

```python
lista = [1, 2, 3, 4, 5]
```

Con NumPy:

```python
import numpy as np

array = np.array([1,2,3,4,5])
```

---

# Differenze principali

| Lista Python | Array NumPy |
|-|-|
| Generica | Ottimizzata per numeri |
| Più lenta | Molto più veloce |
| Tipi misti possibili | Tipo uniforme |
| Operazioni manuali | Operazioni vettoriali |

---

# Creare un array

```python
import numpy as np

numeri = np.array(
    [10,20,30,40]
)

print(numeri)
```

Output:

```
[10 20 30 40]
```

---

<a id="dimensioni"></a>

# 6.2 Dimensioni degli array

[⬆️ Torna all'Indice](#indice)

Gli array NumPy possono avere una o più dimensioni.

---

# Array monodimensionale

Un vettore:

```python
vettore = np.array(
    [1,2,3,4]
)
```

Rappresentazione:

```
[1 2 3 4]
```

---

# Array bidimensionale

Una matrice:

```python
matrice = np.array(
[
 [1,2,3],
 [4,5,6]
]
)
```

Rappresentazione:

```
1 2 3

4 5 6
```

---

# Array tridimensionale

Utilizzato spesso nella Computer Vision.

Esempio:

```
Immagine RGB

altezza

×

larghezza

×

canali colore
```

---

# Verificare le dimensioni

Utilizziamo:

```python
array.shape
```

Esempio:

```python
immagine.shape
```

Output:

```
(1080,1920,3)
```

Significa:

```
1080 pixel altezza

1920 pixel larghezza

3 canali RGB
```

---

<a id="creazione-array"></a>

# 6.3 Creazione automatica di array

[⬆️ Torna all'Indice](#indice)

NumPy permette di creare rapidamente strutture numeriche.

---

# Array di zeri

```python
zeri = np.zeros(5)

print(zeri)
```

Output:

```
[0. 0. 0. 0. 0.]
```

---

# Array di uno

```python
uni = np.ones(5)
```

---

# Matrice identità

Molto utilizzata nell'algebra lineare.

```python
identita = np.eye(3)
```

Output:

```
1 0 0

0 1 0

0 0 1
```

---

# Sequenze numeriche

```python
sequenza = np.arange(0,10)

print(sequenza)
```

Output:

```
[0 1 2 3 4 5 6 7 8 9]
```

---

# Numeri equidistanti

```python
valori = np.linspace(
    0,
    1,
    5
)
```

Output:

```
[0. 0.25 0.5 0.75 1.]
```

---

<a id="operazioni"></a>

# 6.4 Operazioni vettoriali

[⬆️ Torna all'Indice](#indice)

Uno dei grandi vantaggi di NumPy è la possibilità di eseguire operazioni direttamente sugli array.

---

# Somma di vettori

Python tradizionale:

```python
a = [1,2,3]

b = [4,5,6]
```

Richiederebbe un ciclo.

Con NumPy:

```python
import numpy as np

a = np.array([1,2,3])

b = np.array([4,5,6])

risultato = a + b
```

Output:

```
[5 7 9]
```

---

# Moltiplicazione

```python
risultato = a * 2
```

Output:

```
[2 4 6]
```

---

# Applicazione AI

Queste operazioni sono alla base di:

- elaborazione dei dati;
- trasformazione delle feature;
- calcolo dei pesi nelle reti neurali.

---

<a id="matrici"></a>

# 6.5 Matrici e algebra lineare

[⬆️ Torna all'Indice](#indice)

Le matrici sono fondamentali nei modelli AI.

Una rete neurale contiene milioni o miliardi di parametri organizzati come matrici.

---

Esempio:

```python
A = np.array(
[
[1,2],
[3,4]
]
)
```

---

# Trasposizione

La trasposizione scambia righe e colonne.

```python
A.T
```

---

# Moltiplicazione matriciale

Operazione fondamentale nel Machine Learning.

```python
B = np.array(
[
[5,6],
[7,8]
]
)

risultato = np.matmul(A,B)
```

---

# Perché è importante?

Una rete neurale esegue continuamente operazioni simili:

```
Input

×

Pesi

+

Bias

=

Output
```

---

<a id="statistiche"></a>

# 6.6 Operazioni statistiche

[⬆️ Torna all'Indice](#indice)

NumPy permette di calcolare rapidamente informazioni statistiche.

---

# Media

```python
dati = np.array(
[10,20,30,40]
)

np.mean(dati)
```

Output:

```
25
```

---

# Valore massimo

```python
np.max(dati)
```

---

# Valore minimo

```python
np.min(dati)
```

---

# Deviazione standard

```python
np.std(dati)
```

Utilizzata frequentemente nell'analisi dei dati.

---

<a id="random"></a>

# 6.7 Generazione di dati casuali

[⬆️ Torna all'Indice](#indice)

Durante gli esperimenti di Machine Learning spesso servono dati simulati.

NumPy permette di generarli.

---

Esempio:

```python
dati = np.random.rand(5)

print(dati)
```

Possibile output:

```
[0.23 0.76 0.54 0.11 0.91]
```

---

Applicazioni:

- test degli algoritmi;
- simulazioni;
- creazione dataset artificiali.

---

<a id="esempio-ai-numpy"></a>

# 6.8 Mini progetto AI con NumPy

[⬆️ Torna all'Indice](#indice)

Supponiamo di avere le previsioni di un modello.

```python
import numpy as np


previsioni = np.array(
[
0.90,
0.85,
0.95,
0.80
]
)


accuratezza_media = np.mean(
    previsioni
)


print(
    accuratezza_media
)
```

Output:

```
0.875
```

Il modello ha una accuratezza media dell'87,5%.

---

# Best Practice

✔ Utilizzare NumPy per grandi quantità di dati numerici.

✔ Evitare cicli Python quando esiste una funzione vettorializzata.

✔ Controllare sempre la dimensione degli array.

✔ Utilizzare nomi chiari per vettori e matrici.

✔ Documentare la struttura dei dati.

✔ Verificare sempre il tipo (`dtype`) degli array.

---

# Errori comuni

## Confondere lista e array

Una lista Python non ha le stesse prestazioni di un array NumPy.

---

## Dimensioni incompatibili

Errore:

```text
operands could not be broadcast together
```

significa che gli array non possono essere combinati.

---

## Dimenticare l'importazione

Errore:

```python
np.array()
```

senza:

```python
import numpy as np
```

---

# Sintesi della Parte 6

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato:

- cos'è NumPy;
- perché è fondamentale nell'AI;
- differenza tra liste Python e array NumPy;
- creazione di array;
- gestione delle dimensioni;
- operazioni vettoriali;
- matrici e algebra lineare;
- funzioni statistiche;
- generazione di dati casuali;
- primo esempio applicato all'Intelligenza Artificiale.

NumPy rappresenta la base matematica su cui si costruisce gran parte dell'ecosistema AI Python.

---

# Verifica rapida

## Domanda 1

Che cosa rappresenta un `ndarray`?

A. Un database

B. Un array multidimensionale NumPy

C. Un modello AI

D. Un file Python

**Risposta corretta:** **B**

---

## Domanda 2

Quale libreria Python è alla base del calcolo numerico?

A. Flask

B. Django

C. NumPy

D. Selenium

**Risposta corretta:** **C**

---

## Domanda 3

Perché le matrici sono importanti nell'AI?

A. Per creare interfacce grafiche

B. Per rappresentare dati e parametri dei modelli

C. Per installare Python

D. Per sostituire Git

**Risposta corretta:** **B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="pandas"></a>

# 7. Pandas: Analisi e Manipolazione dei Dati

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Nel mondo dell'Intelligenza Artificiale il dato rappresenta la materia prima su cui vengono costruiti tutti i modelli.

Prima di poter addestrare un algoritmo di Machine Learning è necessario:

- acquisire i dati;
- analizzarli;
- correggere errori;
- eliminare informazioni inutili;
- trasformarli in un formato adatto agli algoritmi.

Questa fase prende il nome di:

```
Data Preparation
```

Una delle librerie Python più utilizzate per questa attività è:

```
Pandas
```

---

# Che cos'è Pandas?

Pandas è una libreria Python progettata per:

- analisi dei dati;
- manipolazione di dataset;
- pulizia delle informazioni;
- trasformazione dei dati;
- analisi statistica.

Il nome deriva da:

```
Panel Data
```

un termine utilizzato nell'analisi statistica.

---

# Dove viene utilizzata Pandas?

Pandas è utilizzata in:

- Data Science;
- Machine Learning;
- Business Intelligence;
- ricerca scientifica;
- analisi finanziaria;
- Intelligenza Artificiale.

---

# Ecosistema Data Science Python

Pandas lavora insieme ad altre librerie fondamentali.

```
                 Dataset

                    │

                    ▼

                 Pandas

                    │

        ┌───────────┴───────────┐

        ▼                       ▼

      NumPy               Matplotlib

        │                       │

        └───────────┬───────────┘

                    ▼

          Machine Learning
```

---

<a id="installazione-pandas"></a>

# 7.1 Installazione di Pandas

[⬆️ Torna all'Indice](#indice)

Prima di utilizzare Pandas è necessario installarla nell'ambiente virtuale.

Comando:

```bash
pip install pandas
```

---

Importazione standard:

```python
import pandas as pd
```

La convenzione:

```python
pd
```

è utilizzata universalmente nella comunità Python.

---

Verifica installazione:

```python
print(pd.__version__)
```

---

<a id="series"></a>

# 7.2 La struttura Series

[⬆️ Torna all'Indice](#indice)

La struttura più semplice di Pandas è:

```
Series
```

Una Series è una sequenza di valori con un indice associato.

---

Esempio:

```python
import pandas as pd


temperature = pd.Series(
[
22,
24,
25,
23
]
)


print(temperature)
```

Output:

```
0    22

1    24

2    25

3    23
```

---

Ogni valore possiede:

- indice;
- contenuto.

---

# Accesso agli elementi

```python
temperature[0]
```

Output:

```
22
```

---

<a id="dataframe"></a>

# 7.3 Il DataFrame

[⬆️ Torna all'Indice](#indice)

Il DataFrame è la struttura più importante di Pandas.

Rappresenta una tabella composta da:

- righe;
- colonne.

È simile a:

- un foglio Excel;
- una tabella database;
- una relazione SQL.

---

Esempio:

```python
import pandas as pd


dati = {

    "Nome":
    [
    "Anna",
    "Marco",
    "Luca"
    ],

    "Voto":
    [
    28,
    30,
    26
    ]

}


studenti = pd.DataFrame(dati)


print(studenti)
```

Output:

```
Nome     Voto

Anna      28

Marco     30

Luca      26
```

---

# Struttura del DataFrame

```
          Colonne

             │

             ▼


Nome     Voto

Anna      28

Marco     30

Luca      26


             ▲

            Righe
```

---

<a id="caricamento-dati"></a>

# 7.4 Importazione dei dataset

[⬆️ Torna all'Indice](#indice)

Nella pratica i dati vengono spesso salvati in file esterni.

I formati più comuni sono:

- CSV;
- Excel;
- JSON;
- database SQL.

---

# Importare un file CSV

Esempio:

```python
dataset = pd.read_csv(
    "studenti.csv"
)
```

---

Visualizzare i primi dati:

```python
dataset.head()
```

Output:

```
Nome    Voto

Anna     28

Marco    30
```

---

Visualizzare le ultime righe:

```python
dataset.tail()
```

---

<a id="esplorazione"></a>

# 7.5 Esplorazione del dataset

[⬆️ Torna all'Indice](#indice)

Prima di utilizzare un dataset è necessario comprenderne la struttura.

---

# Informazioni generali

```python
dataset.info()
```

Mostra:

- numero colonne;
- tipo dei dati;
- valori mancanti.

---

# Dimensione del dataset

```python
dataset.shape
```

Esempio:

```
(1000,10)
```

significa:

```
1000 righe

10 colonne
```

---

# Nomi delle colonne

```python
dataset.columns
```

---

# Statistiche descrittive

```python
dataset.describe()
```

Restituisce:

- media;
- deviazione standard;
- minimo;
- massimo;
- percentili.

---

<a id="selezione"></a>

# 7.6 Selezione dei dati

[⬆️ Torna all'Indice](#indice)

Pandas permette di selezionare facilmente informazioni specifiche.

---

# Selezionare una colonna

```python
dataset["Voto"]
```

---

# Selezionare più colonne

```python
dataset[
[
"Nome",
"Voto"
]
]
```

---

# Selezionare righe

Prima riga:

```python
dataset.iloc[0]
```

---

Prime cinque righe:

```python
dataset.iloc[:5]
```

---

<a id="filtri"></a>

# 7.7 Filtraggio dei dati

[⬆️ Torna all'Indice](#indice)

Uno degli utilizzi più importanti è filtrare dati secondo condizioni.

---

Esempio:

Selezionare studenti con voto maggiore di 27.

```python
studenti_bravi = dataset[
dataset["Voto"] > 27
]
```

---

Risultato:

```
Nome      Voto

Anna       28

Marco      30
```

---

Questa tecnica è fondamentale nella fase di preparazione dei dati.

---

<a id="pulizia"></a>

# 7.8 Pulizia dei dati

[⬆️ Torna all'Indice](#indice)

I dataset reali spesso contengono problemi.

Esempi:

- valori mancanti;
- duplicati;
- errori di formato;
- dati incoerenti.

Questa fase viene chiamata:

```
Data Cleaning
```

---

# Individuare valori mancanti

```python
dataset.isnull()
```

---

Conteggio valori mancanti:

```python
dataset.isnull().sum()
```

---

# Eliminare righe incomplete

```python
dataset.dropna()
```

---

# Sostituire valori mancanti

```python
dataset.fillna(0)
```

---

<a id="trasformazione"></a>

# 7.9 Trasformazione dei dati

[⬆️ Torna all'Indice](#indice)

Prima del Machine Learning spesso è necessario trasformare i dati.

Esempi:

- convertire testo in numeri;
- normalizzare valori;
- creare nuove colonne.

---

# Creare una nuova colonna

```python
dataset["Superato"] = (

dataset["Voto"] >= 18

)
```

---

Risultato:

```
Nome    Voto    Superato

Anna     28       True

Marco    30       True
```

---

<a id="statistiche-pandas"></a>

# 7.10 Analisi statistica

[⬆️ Torna all'Indice](#indice)

Pandas integra molte funzioni statistiche.

---

Media:

```python
dataset["Voto"].mean()
```

---

Massimo:

```python
dataset["Voto"].max()
```

---

Minimo:

```python
dataset["Voto"].min()
```

---

Conteggio:

```python
dataset["Voto"].count()
```

---

<a id="esempio-ai-pandas"></a>

# 7.11 Mini progetto AI: analisi dataset

[⬆️ Torna all'Indice](#indice)

Supponiamo di avere un dataset contenente le prestazioni di un modello.

File:

```
modelli_ai.csv
```

Contenuto:

```csv
Nome,Accuracy,Tempo
ModelloA,0.92,12
ModelloB,0.95,15
ModelloC,0.89,10
```

---

Caricamento:

```python
import pandas as pd


df = pd.read_csv(
"modelli_ai.csv"
)
```

---

Visualizzazione:

```python
print(df.head())
```

---

Calcolo accuratezza media:

```python
media = df["Accuracy"].mean()

print(media)
```

Output:

```
0.92
```

---

# Utilità nel Machine Learning

Pandas viene utilizzato per:

```
Dataset grezzo

      │

      ▼

Pulizia dati

      │

      ▼

Analisi

      │

      ▼

Trasformazione

      │

      ▼

Modello AI
```

---

# Best Practice

✔ Analizzare sempre il dataset prima dell'uso.

✔ Controllare valori mancanti.

✔ Verificare i tipi delle colonne.

✔ Creare copie prima delle modifiche importanti.

✔ Documentare le trasformazioni effettuate.

✔ Evitare di modificare direttamente il dataset originale.

---

# Errori comuni

## Non controllare i dati mancanti

Un modello AI può produrre risultati errati.

---

## Confondere righe e colonne

Le righe rappresentano osservazioni.

Le colonne rappresentano caratteristiche.

---

## Caricare dataset enormi senza controllo

Dataset molto grandi possono richiedere strategie specifiche.

---

# Sintesi della Parte 7

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato:

- cos'è Pandas;
- utilizzo di Series e DataFrame;
- importazione dei dataset;
- esplorazione dei dati;
- selezione e filtraggio;
- pulizia dei dati;
- trasformazione delle informazioni;
- analisi statistica;
- preparazione dei dati per Machine Learning.

Pandas rappresenta uno degli strumenti fondamentali nella fase iniziale di ogni progetto di Intelligenza Artificiale.

---

# Verifica rapida

## Domanda 1

Qual è la struttura principale utilizzata da Pandas?

A. Tensor

B. DataFrame

C. Neurone

D. Classe

**Risposta corretta:** **B**

---

## Domanda 2

Quale funzione permette di leggere un file CSV?

A. read_csv()

B. open_csv()

C. load_csv()

D. import_csv()

**Risposta corretta:** **A**

---

## Domanda 3

Come vengono chiamate le attività di pulizia dei dati?

A. Data Cleaning

B. Data Training

C. Data Rendering

D. Data Coding

**Risposta corretta:** **A**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="matplotlib"></a>

# 8. Matplotlib: Visualizzazione dei Dati per l'Intelligenza Artificiale

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

La visualizzazione dei dati è una fase fondamentale in ogni progetto di **Data Science** e **Intelligenza Artificiale**.

Prima di addestrare un modello è importante comprendere:

- la distribuzione dei dati;
- eventuali anomalie;
- relazioni tra variabili;
- presenza di errori;
- andamento delle informazioni nel tempo.

Un grafico spesso permette di individuare problemi che non sarebbero evidenti osservando solamente numeri e tabelle.

---

# Perché visualizzare i dati nell'AI?

Un modello di Machine Learning apprende dai dati.

Se i dati contengono:

- valori anomali;
- distribuzioni sbilanciate;
- correlazioni inattese;

il modello potrebbe produrre risultati poco affidabili.

La visualizzazione aiuta a:

```
Dataset grezzo

      │

      ▼

Analisi visiva

      │

      ▼

Comprensione dei dati

      │

      ▼

Preparazione modello AI
```

---

# Che cos'è Matplotlib?

Matplotlib è una libreria Python utilizzata per creare grafici e rappresentazioni visive.

Permette di realizzare:

- grafici a linee;
- grafici a barre;
- istogrammi;
- grafici a dispersione;
- grafici scientifici.

---

# Ecosistema della visualizzazione Python

Matplotlib è spesso utilizzata insieme ad altre librerie.

```
                Pandas

                   │

                   ▼

             Dataset Analizzato

                   │

                   ▼

              Matplotlib

                   │

        ┌──────────┴──────────┐

        ▼                     ▼

     Grafici              Analisi AI
```

---

<a id="installazione-matplotlib"></a>

# 8.1 Installazione di Matplotlib

[⬆️ Torna all'Indice](#indice)

Installazione tramite pip:

```bash
pip install matplotlib
```

---

Importazione standard:

```python
import matplotlib.pyplot as plt
```

La convenzione:

```python
plt
```

è utilizzata nella maggior parte dei progetti Python.

---

Verifica installazione:

```python
import matplotlib

print(matplotlib.__version__)
```

---

<a id="grafico-linee"></a>

# 8.2 Grafico a linee

[⬆️ Torna all'Indice](#indice)

Il grafico a linee è utilizzato per rappresentare dati che cambiano nel tempo.

Esempi:

- andamento delle temperature;
- andamento delle prestazioni di un modello;
- perdita durante il training di una rete neurale.

---

Esempio:

```python
import matplotlib.pyplot as plt


epoche = [1,2,3,4,5]

accuratezza = [
0.60,
0.70,
0.78,
0.85,
0.90
]


plt.plot(
    epoche,
    accuratezza
)


plt.xlabel(
    "Epoche"
)


plt.ylabel(
    "Accuratezza"
)


plt.show()
```

---

Risultato:

```
Accuratezza

1.0 │
    │          *
0.8 │       *
    │    *
0.6 │ *
    └────────────
       Epoche
```

---

# Applicazione nell'AI

Durante l'addestramento di un modello possiamo visualizzare:

```
Epoche

 1 ───────────────

 2 ───────────────

 3 ───────────────

 Loss ↓

 Accuracy ↑
```

per capire se il modello sta migliorando.

---

<a id="grafico-barre"></a>

# 8.3 Grafico a barre

[⬆️ Torna all'Indice](#indice)

I grafici a barre permettono di confrontare categorie diverse.

Esempi:

- confronto tra modelli AI;
- numero di dati per categoria;
- risultati di classificazione.

---

Esempio:

```python
modelli = [

"Modello A",

"Modello B",

"Modello C"

]


accuratezza = [

0.85,

0.92,

0.88

]


plt.bar(
    modelli,
    accuratezza
)


plt.ylabel(
    "Accuracy"
)


plt.show()
```

---

Possibile utilizzo:

Confrontare:

```
Modello A → 85%

Modello B → 92%

Modello C → 88%
```

---

<a id="istogramma"></a>

# 8.4 Istogrammi e distribuzione dei dati

[⬆️ Torna all'Indice](#indice)

Gli istogrammi mostrano come sono distribuiti i valori.

Sono molto importanti nel Machine Learning.

---

Esempio:

```python
import numpy as np


dati = np.random.randn(
1000
)


plt.hist(
    dati,
    bins=30
)


plt.show()
```

---

Un istogramma permette di individuare:

- distribuzione normale;
- valori estremi;
- dati sbilanciati.

---

# Applicazione AI

Prima dell'addestramento possiamo controllare:

```
Distribuzione classe A

████████████


Distribuzione classe B

███
```

Se una classe è troppo rappresentata, il modello potrebbe imparare male.

---

<a id="scatter"></a>

# 8.5 Scatter Plot

[⬆️ Torna all'Indice](#indice)

Lo scatter plot rappresenta la relazione tra due variabili.

È utile per individuare:

- correlazioni;
- gruppi;
- separabilità dei dati.

---

Esempio:

```python
x = [

1,2,3,4,5

]


y = [

2,4,6,8,10

]


plt.scatter(
    x,
    y
)


plt.show()
```

---

Interpretazione:

Se i punti seguono una direzione crescente:

```
x aumenta

↓

y aumenta
```

potrebbe esistere una correlazione.

---

<a id="correlazioni"></a>

# 8.6 Correlazione tra variabili

[⬆️ Torna all'Indice](#indice)

Nei dataset reali spesso vogliamo capire se due caratteristiche sono collegate.

Esempio:

```
Ore studio

        │

        ▼

Risultato esame
```

---

Con Pandas:

```python
dataset.corr()
```

restituisce una matrice di correlazione.

Esempio:

```
          X       Y

X       1.0    0.85

Y       0.85   1.0
```

---

Una correlazione vicina a:

```
+1
```

indica relazione positiva.

Una correlazione vicina a:

```
-1
```

indica relazione negativa.

---

<a id="visualizzazione-pandas"></a>

# 8.7 Matplotlib e Pandas insieme

[⬆️ Torna all'Indice](#indice)

Pandas integra direttamente Matplotlib.

Esempio:

```python
import pandas as pd


df = pd.read_csv(
"dati.csv"
)


df["valore"].plot()


plt.show()
```

---

Questa integrazione è molto utilizzata nei progetti Data Science.

---

<a id="dataset-ai"></a>

# 8.8 Mini progetto AI: analisi prestazioni modello

[⬆️ Torna all'Indice](#indice)

Supponiamo di avere i risultati di addestramento.

Dataset:

```python
epoche = [

1,2,3,4,5,6

]


loss = [

0.8,
0.6,
0.5,
0.3,
0.2,
0.1

]
```

---

Visualizzazione:

```python
import matplotlib.pyplot as plt


plt.plot(
    epoche,
    loss
)


plt.xlabel(
"Epoche"
)


plt.ylabel(
"Loss"
)


plt.title(
"Andamento Training"
)


plt.show()
```

---

Interpretazione:

Se la loss diminuisce:

```
0.8

 ↓

0.1
```

il modello sta migliorando.

---

<a id="visualizzazione-avanzata"></a>

# 8.9 Visualizzazione nei progetti AI avanzati

[⬆️ Torna all'Indice](#indice)

Nei progetti professionali la visualizzazione viene utilizzata per:

## Machine Learning

- confronto modelli;
- analisi errori;
- curve di apprendimento.

---

## Deep Learning

- andamento loss;
- andamento accuracy;
- monitoraggio training.

---

## Computer Vision

- visualizzazione immagini;
- bounding box;
- risultati classificazione.

---

## Data Analysis

- individuazione pattern;
- ricerca anomalie;
- esplorazione dataset.

---

# Best Practice

✔ Visualizzare sempre i dati prima del training.

✔ Utilizzare grafici semplici e leggibili.

✔ Dare sempre titolo e nome agli assi.

✔ Evitare grafici inutilmente complessi.

✔ Interpretare il grafico, non solo crearlo.

✔ Collegare sempre la visualizzazione al problema reale.

---

# Errori comuni

## Creare grafici senza analizzare il significato

Un grafico bello non garantisce una buona analisi.

---

## Usare scale scorrette

Una scala errata può falsare l'interpretazione.

---

## Visualizzare troppi dati insieme

Dataset molto grandi richiedono tecniche specifiche.

---

## Ignorare i valori anomali

Gli outlier possono influenzare negativamente il modello.

---

# Sintesi della Parte 8

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato:

- il ruolo della visualizzazione nell'AI;
- installazione e utilizzo di Matplotlib;
- creazione di grafici a linee;
- grafici a barre;
- istogrammi;
- scatter plot;
- analisi delle correlazioni;
- integrazione con Pandas;
- visualizzazione delle prestazioni di modelli AI.

La visualizzazione rappresenta uno strumento fondamentale per comprendere i dati prima di costruire sistemi intelligenti.

---

# Verifica rapida

## Domanda 1

Quale libreria Python viene utilizzata principalmente per creare grafici?

A. NumPy

B. Matplotlib

C. Flask

D. TensorFlow

**Risposta corretta:** **B**

---

## Domanda 2

Quale grafico è utile per analizzare la distribuzione dei dati?

A. Istogramma

B. Tabella HTML

C. Lista Python

D. Classe

**Risposta corretta:** **A**

---

## Domanda 3

Perché visualizzare i dati prima del Machine Learning?

A. Per aumentare la RAM

B. Per comprendere caratteristiche e problemi dei dati

C. Per sostituire il modello AI

D. Per eliminare Python

**Risposta corretta:** **B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="scikit-learn"></a>

# 9. Scikit-Learn: Primo Approccio al Machine Learning

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Dopo aver studiato:

- Python;
- Programmazione Orientata agli Oggetti;
- NumPy;
- Pandas;
- Matplotlib;

siamo pronti per entrare nel mondo del:

```
Machine Learning
```

Il Machine Learning permette ai computer di imparare dai dati senza essere programmati esplicitamente per ogni situazione.

Una delle librerie più importanti per iniziare a sviluppare modelli di Machine Learning con Python è:

```
Scikit-Learn
```

---

# Che cos'è Scikit-Learn?

Scikit-Learn è una libreria Python dedicata al Machine Learning tradizionale.

Permette di realizzare:

- classificazione;
- regressione;
- clustering;
- riduzione della dimensionalità;
- valutazione dei modelli;
- preprocessing dei dati.

---

# Perché utilizzare Scikit-Learn?

Scikit-Learn offre un ambiente semplice e uniforme.

Tutti gli algoritmi principali seguono lo stesso schema:

```
Importazione modello

        │

        ▼

Creazione oggetto

        │

        ▼

Addestramento

        │

        ▼

Predizione

        │

        ▼

Valutazione
```

Questo rende più semplice imparare il Machine Learning.

---

# Installazione

Per installare Scikit-Learn:

```bash
pip install scikit-learn
```

---

Importazione:

```python
import sklearn
```

Verifica versione:

```python
print(sklearn.__version__)
```

---

# Ecosistema Machine Learning Python

```
                Dataset

                   │

                   ▼

                Pandas

                   │

                   ▼

              Preparazione

                   │

                   ▼

            Scikit-Learn

                   │

        ┌──────────┴──────────┐

        ▼                     ▼

  Modello ML              Valutazione

                   │

                   ▼

             Sistema AI
```

---

<a id="concetti-ml"></a>

# 9.1 Concetti fondamentali del Machine Learning

[⬆️ Torna all'Indice](#indice)

Un modello di Machine Learning apprende una relazione tra:

```
Input

↓

Modello

↓

Output
```

---

Esempio:

Prevedere il prezzo di una casa.

Input:

```
metri quadrati

numero stanze

zona

anno costruzione
```

Output:

```
prezzo previsto
```

---

# Feature e Target

Un dataset di Machine Learning contiene generalmente:

## Feature

Sono le caratteristiche utilizzate dal modello.

Esempio:

```
altezza

peso

età
```

---

## Target

È il valore che vogliamo prevedere.

Esempio:

```
diagnosi

prezzo

categoria
```

---

Schema:

```
Feature

X

↓

Modello ML

↓

Target

y
```

---

<a id="dataset"></a>

# 9.2 Preparazione del dataset

[⬆️ Torna all'Indice](#indice)

Prima di addestrare un modello dobbiamo dividere i dati.

La divisione più importante è:

```
Training Set

+

Test Set
```

---

# Training Set

È il gruppo di dati utilizzato per insegnare al modello.

Esempio:

```
80% dei dati
```

---

# Test Set

Serve per verificare il comportamento del modello su dati mai visti.

Esempio:

```
20% dei dati
```

---

Schema:

```
Dataset completo

        │

        ├─────────────┐

        ▼             ▼

   Training        Test

     80%            20%

        │             │

        ▼             ▼

 Addestramento    Valutazione
```

---

<a id="train-test"></a>

# 9.3 Suddivisione Training e Test con Scikit-Learn

[⬆️ Torna all'Indice](#indice)

Scikit-Learn fornisce una funzione specifica:

```python
train_test_split()
```

---

Esempio:

```python
from sklearn.model_selection import train_test_split


X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.2,

    random_state=42

)
```

---

Significato:

```text
X_train

dati input per training


X_test

dati input per test


y_train

risultati associati al training


y_test

risultati associati al test
```

---

<a id="primo-modello"></a>

# 9.4 Primo modello di Machine Learning

[⬆️ Torna all'Indice](#indice)

Realizziamo un semplice modello di regressione.

Obiettivo:

Prevedere un valore numerico.

Esempio:

```
Ore studio

↓

Voto previsto
```

---

Importiamo il modello:

```python
from sklearn.linear_model import LinearRegression
```

---

Creiamo l'oggetto:

```python
modello = LinearRegression()
```

---

Addestriamo:

```python
modello.fit(
    X_train,
    y_train
)
```

---

Effettuiamo una previsione:

```python
previsione = modello.predict(
    X_test
)
```

---

# Il metodo fit()

Il metodo:

```python
fit()
```

significa:

```
impara dai dati
```

Durante questa fase il modello analizza le relazioni presenti nel dataset.

---

# Il metodo predict()

Il metodo:

```python
predict()
```

significa:

```
utilizza ciò che ha imparato
```

per generare nuove previsioni.

---

<a id="classificazione"></a>

# 9.5 Classificazione

[⬆️ Torna all'Indice](#indice)

La classificazione consiste nel prevedere una categoria.

Esempi:

```
Email

↓

Spam / Non Spam


Immagine

↓

Gatto / Cane
```

---

Un algoritmo molto utilizzato è:

```
K-Nearest Neighbors
```

---

Esempio:

```python
from sklearn.neighbors import KNeighborsClassifier


modello = KNeighborsClassifier(
    n_neighbors=3
)


modello.fit(
    X_train,
    y_train
)
```

---

Previsione:

```python
risultato = modello.predict(
X_test
)
```

---

<a id="regressione"></a>

# 9.6 Regressione

[⬆️ Torna all'Indice](#indice)

La regressione viene utilizzata quando il risultato è un numero.

Esempi:

- prezzo;
- temperatura;
- consumo energetico;
- valore finanziario.

---

Esempio:

```python
from sklearn.linear_model import LinearRegression


modello = LinearRegression()


modello.fit(
X_train,
y_train
)
```

---

Output:

```
Valore numerico previsto
```

---

<a id="clustering"></a>

# 9.7 Clustering

[⬆️ Torna all'Indice](#indice)

Il clustering appartiene al Machine Learning non supervisionato.

Il modello cerca automaticamente gruppi nei dati.

---

Esempio:

Un'azienda vuole dividere clienti in categorie.

Input:

```
età

acquisti

interessi
```

Output:

```
Gruppo A

Gruppo B

Gruppo C
```

---

Algoritmo famoso:

```
K-Means
```

---

Esempio:

```python
from sklearn.cluster import KMeans


modello = KMeans(
    n_clusters=3
)


modello.fit(
    dati
)
```

---

<a id="metriche"></a>

# 9.8 Valutazione dei modelli

[⬆️ Torna all'Indice](#indice)

Un modello non deve solo funzionare.

Deve essere valutato.

---

# Accuracy

Misura quante previsioni sono corrette.

Formula concettuale:

```
previsioni corrette

------------------

totale previsioni
```

---

Esempio:

```python
from sklearn.metrics import accuracy_score


accuracy = accuracy_score(
    y_test,
    previsione
)
```

---

# Mean Squared Error

Utilizzato nella regressione.

```python
from sklearn.metrics import mean_squared_error
```

Misura la distanza tra:

```
valore reale

e

valore previsto
```

---

<a id="pipeline"></a>

# 9.9 Pipeline Machine Learning completa

[⬆️ Torna all'Indice](#indice)

Un progetto reale segue generalmente questi passaggi:

```
Raccolta dati

      │

      ▼

Pulizia dati

      │

      ▼

Analisi dati

      │

      ▼

Divisione Training/Test

      │

      ▼

Addestramento modello

      │

      ▼

Valutazione

      │

      ▼

Deploy
```

---

# Esempio completo minimale

```python
import pandas as pd


from sklearn.model_selection import train_test_split


from sklearn.linear_model import LinearRegression



df = pd.read_csv(
"dati.csv"
)



X = df[
["temperatura"]
]


y = df[
"consumo"
]



X_train, X_test, y_train, y_test = train_test_split(

X,

y,

test_size=0.2

)



modello = LinearRegression()



modello.fit(

X_train,

y_train

)



predizioni = modello.predict(

X_test

)
```

---

# Applicazioni reali

Scikit-Learn viene utilizzato per:

## Finanza

- previsione rischio;
- classificazione clienti.

---

## Medicina

- supporto diagnostico;
- analisi dati clinici.

---

## Industria

- manutenzione predittiva;
- controllo qualità.

---

## Marketing

- segmentazione utenti;
- previsione acquisti.

---

# Best Practice

✔ Analizzare sempre i dati prima del training.

✔ Separare sempre training e test.

✔ Non valutare il modello sugli stessi dati usati per imparare.

✔ Controllare la qualità delle feature.

✔ Documentare ogni esperimento.

✔ Salvare configurazioni e risultati.

---

# Errori comuni

## Usare pochi dati

Un modello con pochi esempi può imparare male.

---

## Valutare solo con accuracy

Alcuni problemi richiedono metriche diverse.

---

## Addestrare e testare sugli stessi dati

Produce risultati falsamente ottimistici.

---

## Ignorare il preprocessing

I dati devono essere preparati correttamente.

---

# Sintesi della Parte 9

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato:

- cos'è il Machine Learning;
- differenza tra feature e target;
- divisione training/test;
- utilizzo di Scikit-Learn;
- metodo `fit()`;
- metodo `predict()`;
- regressione;
- classificazione;
- clustering;
- valutazione dei modelli;
- pipeline completa di Machine Learning.

Questa conoscenza rappresenta il primo vero passo nello sviluppo di sistemi intelligenti.

---

# Verifica rapida

## Domanda 1

Quale metodo viene utilizzato per addestrare un modello Scikit-Learn?

A. predict()

B. fit()

C. train_model()

D. learn()

**Risposta corretta:** **B**

---

## Domanda 2

Che cosa rappresentano le feature?

A. Gli errori del modello

B. Le caratteristiche di input del dataset

C. Il risultato finale

D. Il codice Python

**Risposta corretta:** **B**

---

## Domanda 3

Qual è lo scopo del test set?

A. Installare librerie

B. Valutare il modello su dati non utilizzati nel training

C. Creare variabili

D. Sostituire il dataset

**Risposta corretta:** **B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="laboratorio-m4"></a>

# 10. Laboratorio Completo: Primo Progetto Machine Learning in Python

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

In questo laboratorio realizzeremo un primo progetto completo di **Machine Learning utilizzando Python e Scikit-Learn**.

L'obiettivo è applicare tutte le conoscenze acquisite nel Modulo 4:

- gestione ambiente Python;
- utilizzo di VS Code;
- caricamento dataset;
- analisi dati;
- preparazione feature;
- addestramento modello;
- valutazione risultati;
- salvataggio del modello.

Il laboratorio rappresenta il collegamento tra la teoria del Machine Learning e lo sviluppo di applicazioni reali.

---

# Obiettivi del laboratorio

Al termine dell'esercitazione lo studente sarà in grado di:

- creare un progetto Python professionale;
- configurare un ambiente virtuale;
- installare librerie AI;
- utilizzare dataset reali;
- analizzare dati con Pandas;
- visualizzare informazioni con Matplotlib;
- addestrare un modello Scikit-Learn;
- effettuare previsioni;
- valutare le prestazioni.

---

# Prerequisiti

Sono richieste:

- conoscenza base di Python;
- utilizzo di VS Code;
- conoscenza di:
  - NumPy;
  - Pandas;
  - Matplotlib;
  - concetti base Machine Learning.

---

# Scenario del progetto

Realizzeremo un modello capace di prevedere il prezzo di una casa utilizzando alcune caratteristiche.

Il modello utilizzerà:

```
Input

↓

Caratteristiche immobile

↓

Modello Machine Learning

↓

Prezzo previsto
```

---

# Struttura del progetto

Creare una cartella:

```
ML_Primo_Progetto
```

Struttura finale:

```
ML_Primo_Progetto

│

├── .venv

│

├── dataset

│     └── case.csv

│

├── models

│     └── modello_case.pkl

│

├── src

│     ├── analisi_dati.py

│     ├── training.py

│     └── previsione.py

│

└── requirements.txt
```

---

# 10.1 Creazione ambiente Python

[⬆️ Torna all'Indice](#indice)

Aprire il terminale di VS Code.

Creare ambiente virtuale:

```bash
python -m venv .venv
```

---

Attivazione ambiente:

Windows:

```bash
.venv\Scripts\activate
```

Linux/macOS:

```bash
source .venv/bin/activate
```

---

Installazione librerie:

```bash
pip install numpy pandas matplotlib scikit-learn
```

---

Salvataggio dipendenze:

```bash
pip freeze > requirements.txt
```

---

# 10.2 Creazione del dataset

[⬆️ Torna all'Indice](#indice)

Creare il file:

```
dataset/case.csv
```

Contenuto:

```csv
metri_quadri,stanze,eta,prezzo

80,3,20,180000

100,4,10,250000

120,5,5,320000

60,2,40,120000

150,6,2,400000
```

---

Il dataset contiene:

| Colonna | Significato |
|-|-|
| metri_quadri | superficie abitazione |
| stanze | numero locali |
| eta | anni edificio |
| prezzo | valore da prevedere |

---

# 10.3 Analisi iniziale dei dati

[⬆️ Torna all'Indice](#indice)

Creare:

```
src/analisi_dati.py
```

---

Codice:

```python
import pandas as pd

import matplotlib.pyplot as plt


df = pd.read_csv(
    "../dataset/case.csv"
)


print(df.head())


print(df.info())


print(df.describe())
```

---

Eseguendo:

```bash
python analisi_dati.py
```

possiamo controllare:

- struttura dataset;
- valori presenti;
- statistiche principali.

---

# Visualizzazione dati

Aggiungiamo:

```python
plt.scatter(

df["metri_quadri"],

df["prezzo"]

)


plt.xlabel(
"Metri quadri"
)


plt.ylabel(
"Prezzo"
)


plt.show()
```

---

Il grafico permette di osservare la relazione:

```
Superficie maggiore

        ↓

Prezzo maggiore
```

---

# 10.4 Preparazione dei dati

[⬆️ Torna all'Indice](#indice)

Creare:

```
src/training.py
```

---

Importazioni:

```python
import pandas as pd


from sklearn.model_selection import train_test_split


from sklearn.linear_model import LinearRegression


from sklearn.metrics import mean_squared_error
```

---

Caricamento dataset:

```python
df = pd.read_csv(
"../dataset/case.csv"
)
```

---

Separazione feature e target:

```python
X = df[
[
"metri_quadri",
"stanze",
"eta"
]
]


y = df[
"prezzo"
]
```

---

Risultato:

```
X

↓

Caratteristiche casa


y

↓

Prezzo
```

---

# 10.5 Divisione Training/Test

[⬆️ Torna all'Indice](#indice)

Utilizziamo:

```python
train_test_split()
```

---

Codice:

```python
X_train, X_test, y_train, y_test = train_test_split(

X,

y,

test_size=0.2,

random_state=42

)
```

---

Abbiamo creato:

```
80%

Training


20%

Test
```

---

# 10.6 Creazione e addestramento modello

[⬆️ Torna all'Indice](#indice)

Utilizziamo:

```
Linear Regression
```

---

Creazione:

```python
modello = LinearRegression()
```

---

Addestramento:

```python
modello.fit(

X_train,

y_train

)
```

---

Il modello ora ha imparato la relazione:

```
Caratteristiche casa

        ↓

Prezzo
```

---

# 10.7 Valutazione del modello

[⬆️ Torna all'Indice](#indice)

Creiamo previsioni:

```python
predizioni = modello.predict(

X_test

)
```

---

Calcoliamo errore:

```python
errore = mean_squared_error(

y_test,

predizioni

)


print(errore)
```

---

Un errore più basso indica generalmente un modello migliore.

---

# 10.8 Salvataggio del modello

[⬆️ Torna all'Indice](#indice)

Un modello addestrato può essere salvato.

Installiamo:

```bash
pip install joblib
```

---

Aggiungere:

```python
import joblib
```

---

Salvataggio:

```python
joblib.dump(

modello,

"../models/modello_case.pkl"

)
```

---

Ora il modello può essere riutilizzato senza nuovo training.

---

# 10.9 Utilizzo del modello salvato

[⬆️ Torna all'Indice](#indice)

Creare:

```
src/previsione.py
```

---

Codice:

```python
import joblib

import pandas as pd



modello = joblib.load(

"../models/modello_case.pkl"

)



nuova_casa = pd.DataFrame(

{

"metri_quadri":[110],

"stanze":[4],

"eta":[15]

}

)



prezzo = modello.predict(

nuova_casa

)



print(prezzo)
```

---

Output esempio:

```
[280000]
```

---

Il sistema ha prodotto una previsione.

---

# 10.10 Pipeline completa del progetto

[⬆️ Torna all'Indice](#indice)

Il progetto completo segue questa architettura:

```
Dataset CSV

      │

      ▼

Pandas

      │

      ▼

Analisi dati

      │

      ▼

Preparazione feature

      │

      ▼

Training modello

      │

      ▼

Valutazione

      │

      ▼

Salvataggio modello

      │

      ▼

Nuove previsioni
```

---

# Estensioni del laboratorio

Il progetto può essere migliorato introducendo:

## Nuove feature

Aggiungere:

- posizione geografica;
- numero bagni;
- presenza garage;
- classe energetica.

---

## Nuovi modelli

Provare:

- Decision Tree;
- Random Forest;
- Gradient Boosting.

---

## Miglioramento grafico

Aggiungere:

- analisi correlazioni;
- grafici distribuzione;
- confronto modelli.

---

# Troubleshooting

## Errore import librerie

Soluzione:

Controllare ambiente virtuale:

```bash
pip list
```

---

## File dataset non trovato

Controllare il percorso:

```
../dataset/case.csv
```

---

## Risultati poco accurati

Possibili cause:

- pochi dati;
- feature insufficienti;
- dati non rappresentativi.

---

# Best Practice professionali

✔ Separare codice, dati e modelli.

✔ Utilizzare sempre ambienti virtuali.

✔ Salvare le dipendenze.

✔ Documentare gli esperimenti.

✔ Versionare il progetto con Git.

✔ Non modificare manualmente i dataset originali.

---

# Mini Project finale Modulo 4

[⬆️ Torna all'Indice](#indice)

## Obiettivo

Realizzare un modello di Machine Learning completo a scelta.

Esempi:

### Previsione consumi energetici

Input:

- temperatura;
- superficie;
- abitanti.

Output:

- consumo previsto.

---

### Classificazione studenti

Input:

- ore studio;
- frequenza;
- esercitazioni.

Output:

- probabilità successo.

---

### Analisi clienti

Input:

- acquisti;
- frequenza;
- spesa.

Output:

- categoria cliente.

---

# Consegna richiesta

Lo studente deve produrre:

```
progetto_ml/

├── dataset

├── codice Python

├── modello salvato

├── README.md

└── relazione finale
```

---

# Competenze acquisite nel Modulo 4

[⬆️ Torna all'Indice](#indice)

Al termine del modulo lo studente è in grado di:

✔ comprendere il ciclo completo di un progetto AI;

✔ preparare dati per Machine Learning;

✔ utilizzare librerie Python scientifiche;

✔ creare modelli predittivi;

✔ valutare risultati;

✔ sviluppare piccoli sistemi intelligenti.

---

<a id="quiz"></a>
[⬆️ Torna all'Indice](#indice)

# Quiz finale Modulo 4

## Domanda 1

Qual è il ruolo del training set?

A. Valutare il modello

B. Addestrare il modello

C. Salvare file

D. Creare grafici

**Risposta corretta:** B

---

## Domanda 2

Quale libreria viene utilizzata per il Machine Learning?

A. Scikit-Learn

B. Flask

C. Requests

D. Django

**Risposta corretta:** A

---

## Domanda 3

Perché salvare un modello addestrato?

A. Per riutilizzarlo senza nuovo training

B. Per cancellare i dati

C. Per sostituire Python

D. Per aumentare la memoria

**Risposta corretta:** A

---

[⬆️ Torna all'Indice](#indice)

---
