<a id="indice-modulo"></a>
# Modulo 1: Dal Dato al Database
*Fase 1 — Fondamenti dei Dati — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Ogni giorno produciamo dati senza nemmeno accorgercene: un voto scritto sul registro, una spesa segnata su un'app, il nome di un cliente scritto su un foglio. Ma un dato, da solo, non racconta ancora nulla. È solo quando lo organizziamo, lo confrontiamo, lo mettiamo in relazione con altri dati che diventa **informazione utile** — qualcosa su cui si può ragionare e decidere.

Questo primo modulo è il punto di partenza dell'intero corso su Database con Python. Non parleremo ancora di SQL o di database veri e propri: prima costruiamo le fondamenta. Capiremo la differenza tra dato e informazione, vedremo perché — man mano che i dati crescono — un semplice quaderno o un foglio sparso non bastano più, e faremo i primi passi pratici con Python su **Google Colab**, scrivendo e leggendo i nostri primi file di dati.

Che tu stia pensando al registro voti di una classe, alle spese di un progetto o all'elenco clienti di un'azienda, il principio è sempre lo stesso: organizzare bene i dati oggi ti farà risparmiare moltissimo lavoro (ed errori) domani.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare, con parole tue, la differenza tra **dato** e **informazione**.
- Argomentare perché, quando i dati aumentano, serve organizzarli in strutture ordinate.
- Riconoscere i principali modi di archiviare dati (variabili, file di testo, CSV, fogli di calcolo, database) e le differenze tra loro.
- Muoverti con sicurezza in **Google Colab**, incluso il collegamento con Google Drive per salvare i file in modo permanente.
- Creare, scrivere e leggere le prime variabili Python contenenti dati semplici.
- Scrivere e leggere un **file di testo** con Python.
- Creare e leggere un **file CSV**, il primo vero formato "tabellare" che incontrerai nel corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** un account Google (per usare Google Colab e Google Drive) e la voglia di scrivere le prime righe di codice.
- **Non serve:** nessuna conoscenza pregressa di Python o di database. Questo modulo introduce entrambi da zero, con esempi concreti.

> 💡 **Nota per il docente:** questo modulo può essere usato anche come primissimo contatto con Python per classi che non hanno ancora affrontato programmazione, perché ogni concetto tecnico nasce da un problema reale legato ai dati, non da sintassi astratta.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Dato e Informazione: non sono la stessa cosa

Un **dato** è un valore grezzo, non interpretato: `18`, `"Marco"`, `2024`. Da solo, un dato non dice quasi nulla.

Un'**informazione** è un dato inserito in un contesto che gli dà significato: *"Marco ha 18 anni"* è un'informazione, perché unisce più dati e li rende comprensibili e utili.

Questa distinzione sembra banale, ma è il cuore di tutto il corso: **un database esiste proprio per trasformare in modo efficiente grandi quantità di dati grezzi in informazioni pronte all'uso** — che si tratti dei voti di una classe, delle spese di un'azienda o dei contatti di un cliente.

*Perché ti serve: ogni volta che progetterai una tabella di database, ti chiederai "quali dati mi servono?" e "quali informazioni voglio poterne estrarre?". Sono due domande diverse, e tenerle separate ti aiuterà a progettare meglio fin dal Modulo 3.*

### 4.2 Perché organizzare i dati

Finché i dati sono pochi, va bene tenerli a mente o scritti su un foglio di carta. Ma cosa succede quando aumentano?

- Diventa **difficile cercare** un'informazione specifica in mezzo a centinaia di righe.
- Aumentano gli **errori**: dati duplicati, scritti in modo incoerente, dimenticati.
- Si **perde tempo** a fare a mano operazioni che un computer farebbe in un istante (sommare, filtrare, ordinare).
- Diventa impossibile far **collaborare più persone** sugli stessi dati senza fare confusione.

Per questo, con la crescita dei dati, servono **strutture ordinate**: prima semplici file, poi tabelle, infine veri database relazionali — il percorso che faremo in questo corso, modulo dopo modulo.

### 4.3 I principali modi di archiviare i dati

Prima di arrivare ai database, è utile avere una mappa di tutte le opzioni che un programmatore ha a disposizione, dalla più semplice alla più strutturata:

- **Variabili in memoria (Python):** dati che esistono solo mentre il programma è in esecuzione. Spariscono alla chiusura.
- **File di testo (`.txt`):** dati salvati su disco in modo permanente, ma senza nessuna struttura: sono semplicemente righe di testo.
- **File CSV (`.csv`):** un piccolo passo avanti — i dati sono organizzati in **righe** e **colonne** separate da una virgola (o da un punto e virgola), il primo vero formato "tabellare" che incontriamo.
- **Fogli di calcolo (Google Sheets, Excel):** come un CSV, ma con un'interfaccia grafica, formule e (nel caso di Google Sheets) la possibilità di essere interrogati da Python, come vedrai nel Modulo 2.
- **Database relazionali (SQLite, MySQL, PostgreSQL...):** strutture pensate appositamente per gestire grandi quantità di dati, con regole di integrità, relazioni tra tabelle e un linguaggio dedicato (SQL). È il cuore delle Fasi 2 e 3 di questo corso.

*Perché ti serve: ogni formato ha un caso d'uso corretto. Userai un CSV per uno scambio semplice di dati, un database quando la qualità e l'affidabilità dei dati diventano importanti. Capire questa scala ti eviterà di "usare un martello per avvitare una vite" — un errore molto comune anche tra sviluppatori esperti.*

### 4.4 Google Colab come ambiente di lavoro

**Google Colab** è un ambiente online gratuito per scrivere ed eseguire codice Python direttamente dal browser, senza installare nulla sul computer. Useremo Colab per **tutti** i laboratori pratici di questo corso.

Due concetti fondamentali da conoscere fin da subito:

- **Colab è temporaneo:** i file che crei "al volo" in Colab vengono cancellati quando chiudi la sessione. Per questo, in tutto il corso, salveremo i nostri file di dati su **Google Drive**, che è invece permanente.
- **Il collegamento (mount) di Google Drive:** è l'operazione che permette a Colab di leggere e scrivere file dentro il tuo Google Drive personale, in una cartella che resterà a tua disposizione anche il giorno dopo.

### 4.5 Le prime variabili in Python

Una **variabile** è un contenitore a cui diamo un nome, dentro il quale salviamo un valore (un dato). In Python i tipi di dato più semplici che userai da subito sono:

- **Interi (`int`):** numeri senza virgola, es. `18`, `2024`.
- **Numeri decimali (`float`):** numeri con la virgola, es. `7.5`, `19.99`.
- **Stringhe di testo (`str`):** sequenze di caratteri, sempre tra virgolette, es. `"Marco"`.
- **Booleani (`bool`):** valori vero/falso, `True` o `False`.

Ogni colonna di una futura tabella di database corrisponderà, in fondo, a uno di questi tipi di dato: capirli bene ora ti farà risparmiare moltissimi errori più avanti.

### 4.6 Scrivere e leggere un file di testo con Python

Python permette di creare, scrivere e leggere file direttamente da codice, usando la funzione `open()`. È il modo più semplice — anche se il più "grezzo" — per rendere permanente un dato.

*Perché ti serve: è il mattoncino di base su cui si costruisce tutto il resto. Anche un database, "sotto il cofano", altro non è che un file speciale salvato sul disco.*

### 4.7 Creare e leggere un file CSV con Python

Il formato **CSV** (*Comma-Separated Values*, valori separati da virgola) è lo standard più diffuso per scambiare dati tabellari tra programmi diversi (Python, Excel, Google Sheets, database...). Python mette a disposizione il modulo `csv`, pensato apposta per leggere e scrivere questo formato senza errori.

A differenza di un file di testo generico, un CSV ha una **struttura**: la prima riga è di solito l'**intestazione** (i nomi delle colonne), e ogni riga successiva è un **record** (una riga di dati), con i valori separati da virgola.

*Perché ti serve: il CSV è l'anticamera del database. Nel Modulo 2 userai proprio questa logica di righe e colonne per lavorare con Google Sheets, e da lì in avanti sarà il modello mentale di ogni tabella che creerai.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** l'elenco degli studenti di una classe con nome, cognome e voto è un caso perfetto di dati che, disorganizzati su più fogli diversi, diventano presto difficili da consultare — il motivo per cui nasce il registro elettronico.
- **In un'azienda (indirizzo AFM/Finanza):** un elenco di spese con data, importo e categoria, tenuto su un semplice file di testo, diventa rapidamente inutilizzabile quando le spese superano poche decine di righe: servono ordine e struttura per calcolare totali o individuare errori.
- **Nel marketing e nelle relazioni internazionali (indirizzo RIM):** un elenco di contatti clienti con nome, azienda, paese ed email, se tenuto disordinato, porta facilmente a duplicati o dati mancanti — un problema molto concreto per chi lavora con CRM aziendali reali.
- **Dato vs informazione nella pratica:** il numero `9` da solo è solo un dato; "Giulia ha preso 9 in Matematica il 15 settembre" è un'informazione completa, perché unisce più dati in un contesto chiaro.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: dalle variabili al primo file CSV**

Apri un nuovo notebook su Google Colab e prova, in ordine, i seguenti blocchi di codice. Esegui una cella alla volta e osserva sempre l'output prima di passare alla successiva.

**Passo 1 — Colleghiamo Google Drive**

```python
# Importiamo il modulo "drive" per collegare Google Colab al nostro Google Drive
from google.colab import drive
import os

# mount() apre una finestra di autorizzazione: accettando, Colab potrà
# leggere e scrivere file dentro il tuo Google Drive personale
drive.mount('/content/drive')

# Definiamo una cartella dedicata a tutto il corso, per tenere i file in ordine
cartella_progetto = '/content/drive/MyDrive/Colab Notebooks/DATABASE'

# Creiamo la cartella solo se non esiste già, per evitare errori
if not os.path.exists(cartella_progetto):
    os.makedirs(cartella_progetto)
    print(f"Cartella creata: {cartella_progetto}")
else:
    print(f"Cartella già esistente: {cartella_progetto}")
```

**Passo 2 — Le prime variabili: dal dato all'informazione**

```python
# Creiamo alcune variabili con dati semplici (numeri e testo)
nome = "Marco"        # str: stringa di testo
cognome = "Rossi"     # str: stringa di testo
eta = 18               # int: numero intero
media_voti = 7.5       # float: numero decimale

# Un dato da solo dice poco: stampiamo prima i dati "grezzi"
print(nome)
print(eta)

# Combinando più dati in una frase, otteniamo un'informazione completa
print(nome, cognome, "ha", eta, "anni e una media di", media_voti)
```

**Passo 3 — Scriviamo un file di testo su Google Drive**

```python
# Costruiamo il percorso completo del file dentro la cartella del progetto
percorso_file = f"{cartella_progetto}/dati_studente.txt"

# Apriamo il file in modalità scrittura ("w") usando "with":
# così il file viene chiuso automaticamente, anche in caso di errore
with open(percorso_file, "w") as file:
    file.write(f"Nome: {nome}\n")        # \n va a capo, per separare le righe
    file.write(f"Cognome: {cognome}\n")
    file.write(f"Età: {eta}\n")
    file.write(f"Media voti: {media_voti}\n")

print("File di testo salvato correttamente su Google Drive!")
```

**Passo 4 — Leggiamo il file di testo appena creato**

```python
# Riapriamo lo stesso file, questa volta in modalità lettura ("r")
with open(percorso_file, "r") as file:
    contenuto = file.read()   # read() legge tutto il contenuto in un'unica stringa

# Stampiamo il contenuto per verificare che sia stato salvato correttamente
print("Contenuto del file:")
print(contenuto)
```

**Passo 5 — Creiamo il nostro primo file CSV (una vera tabella)**

```python
# Importiamo il modulo csv, pensato apposta per file tabellari
import csv

# Costruiamo il percorso del file CSV
percorso_csv = f"{cartella_progetto}/studenti.csv"

# newline="" evita che vengano inserite righe vuote indesiderate su Windows
with open(percorso_csv, "w", newline="") as file:

    # Creiamo un oggetto "writer" per scrivere righe nel formato CSV
    writer = csv.writer(file)

    # Scriviamo per prima cosa l'intestazione: i nomi delle colonne
    writer.writerow(["Nome", "Cognome", "Età", "Media"])

    # Scriviamo poi i record: ogni riga rappresenta uno studente
    writer.writerow(["Marco", "Rossi", 18, 7.5])
    writer.writerow(["Giulia", "Bianchi", 17, 8.2])
    writer.writerow(["Luca", "Verdi", 16, 6.8])

print("File CSV creato correttamente!")
```

**Passo 6 — Leggiamo il file CSV riga per riga**

```python
# Riapriamo il file CSV in lettura
with open(percorso_csv, "r") as file:

    # Creiamo un oggetto "reader" per leggere il contenuto riga per riga
    reader = csv.reader(file)

    # Ogni "riga" letta dal reader è una lista di valori (stringhe)
    for riga in reader:
        print(riga)
```

Al termine di questo laboratorio avrai sul tuo Google Drive tre file: un `.txt`, un `.csv` e la struttura di cartelle che userai per tutto il resto del corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Usa sempre `with open(...) as file:` invece di `open()` seguito da `file.close()`: il file viene chiuso automaticamente, anche se si verifica un errore nel mezzo.
- ✅ Dai alle variabili **nomi chiari e significativi** (`media_voti`, non `x` o `m`): il codice si legge molto più facilmente, sia per te che per chi lo leggerà dopo di te.
- ✅ Per dati tabellari (righe e colonne), preferisci **sempre** il formato CSV a un semplice file di testo: è più ordinato, standard e leggibile da altri programmi.
- ✅ Organizza fin da subito i tuoi file dentro una **cartella dedicata** su Google Drive: è un'abitudine che ti risparmierà confusione per tutto il corso.
- ✅ Commenta il codice mentre lo scrivi, non dopo: è un promemoria per te stesso e rende il lavoro comprensibile anche a distanza di mesi.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Un dato e un'informazione sono la stessa cosa."* → Un dato è un valore grezzo; un'informazione è un dato inserito in un contesto che gli dà significato.
- ❌ *"Posso salvare i file solo dentro Colab, va bene comunque."* → I file creati direttamente in Colab (fuori da Drive) vengono **cancellati** alla chiusura della sessione: per dati permanenti serve sempre Google Drive.
- ❌ *"Un file di testo qualsiasi va bene anche per dati tabellari."* → Per righe e colonne il formato corretto è il CSV: un file di testo generico non ha una struttura riconoscibile dagli altri programmi.
- ❌ *"Se dimentico `file.close()` non succede nulla di grave."* → Un file non chiuso può non salvare correttamente i dati, oppure restare "bloccato" per altri programmi: per questo si preferisce `with open(...)`.
- ❌ *"Le virgolette attorno al testo in Python sono opzionali."* → Le stringhe richiedono sempre le virgolette (`"Marco"` o `'Marco'`); senza, Python cerca una variabile con quel nome e genera un errore.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| Dato | Valore grezzo, non interpretato (es. `18`) |
| Informazione | Dato inserito in un contesto che gli dà significato |
| Variabile | Contenitore con un nome, usato per salvare un dato in Python |
| File di testo | Dati salvati su disco senza nessuna struttura |
| File CSV | Dati tabellari (righe/colonne) separati da virgola |
| Google Colab | Ambiente online per scrivere ed eseguire Python nel browser |
| Google Drive | Spazio di archiviazione permanente collegabile a Colab |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **CSV (Comma-Separated Values)** — formato di file tabellare in cui i valori di ogni riga sono separati da una virgola.
- **Dato** — valore grezzo e non interpretato.
- **File di testo** — file che contiene solo caratteri, senza alcuna struttura tabellare.
- **Google Colab** — ambiente online gratuito per scrivere ed eseguire codice Python nel browser.
- **Informazione** — dato inserito in un contesto che ne rende comprensibile il significato.
- **Mount (montaggio)** — operazione che collega Google Drive a un notebook Colab, rendendolo accessibile da codice.
- **Record** — una singola riga di dati in una struttura tabellare (es. un CSV).
- **Variabile** — contenitore, identificato da un nome, in cui Python salva un valore.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: un dato e un'informazione sono sempre la stessa cosa.
`Falso — l'informazione è un dato inserito in un contesto che gli dà significato.`

**2.** Quale delle seguenti affermazioni descrive meglio un file CSV?
- a) Un file di testo senza alcuna struttura
- b) Un file tabellare in cui righe e colonne sono separate da virgole ✅
- c) Un tipo di database relazionale
- d) Un formato utilizzabile solo da Google Sheets

**3.** Vero o Falso: i file creati "al volo" dentro Google Colab, senza salvarli su Drive, restano disponibili per sempre.
`Falso — vengono cancellati alla chiusura della sessione: per la persistenza serve Google Drive.`

**4.** Quale istruzione Python è preferibile usare per aprire un file, perché lo chiude automaticamente anche in caso di errore?
`with open(...) as file:`

**5.** In Python, quale tipo di dato useresti per salvare il valore `7.5` (una media voti)?
- a) `int`
- b) `str`
- c) `float` ✅
- d) `bool`

**6.** Vero o Falso: la prima riga di un file CSV contiene di solito l'intestazione, cioè i nomi delle colonne.
`Vero.`

**7.** Perché è preferibile organizzare i propri file in una cartella dedicata su Google Drive fin dall'inizio del corso?
`Per mantenere ordine, evitare di perdere file e ritrovarli facilmente nei moduli successivi.`

**8.** Vero o Falso: un file di testo generico è il formato più adatto per salvare dati organizzati in righe e colonne.
`Falso — per dati tabellari il formato corretto è il CSV.`

**9.** Quale funzione del modulo `csv` si usa per leggere un file CSV riga per riga?
- a) `csv.write()`
- b) `csv.open()`
- c) `csv.reader()` ✅
- d) `csv.load()`

**10.** Metti in ordine, dal meno al più strutturato: File CSV, Variabile in memoria, Database relazionale, File di testo.
`Variabile in memoria → File di testo → File CSV → Database relazionale`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "Il mio primo archivio dati"**

Scegli **uno** dei tre contesti seguenti, in base al tuo indirizzo di studio (o a tua scelta libera):

- 🎓 **Registro scolastico:** un elenco di almeno 5 studenti con Nome, Cognome, Materia e Voto.
- 💰 **Registro spese:** un elenco di almeno 5 spese con Data, Descrizione, Categoria e Importo.
- 📇 **Elenco contatti:** un elenco di almeno 5 contatti/clienti con Nome, Azienda, Paese ed Email.

Per il contesto scelto:

1. Crea, con Python su Google Colab, un file **CSV** con l'intestazione corretta e almeno 5 record, salvato nella cartella `DATABASE` del tuo Google Drive.
2. Scrivi codice Python che **legga** il file CSV appena creato e ne stampi il contenuto in modo leggibile (una riga per ogni record).
3. Aggiungi un **commento** all'inizio del notebook che spiega, in 2-3 righe, perché hai scelto quel formato (CSV) rispetto a un semplice file di testo.

Questo project work, insieme a quello del Modulo 2, costituirà la consegna finale della **Fase 1** del corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet "Dato vs Informazione vs Struttura Dati" (1 pagina, da produrre in PDF)
- 📊 Schema riassuntivo dei formati di archiviazione dati (da produrre come infografica)
- 📝 Template CSV vuoto pronto all'uso per i tre contesti del Project Work

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Downey, A. — *Think Python: How to Think Like a Computer Scientist*
- Date, C. J. — *An Introduction to Database Systems*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Python — modulo `csv`
- Documentazione ufficiale Google Colaboratory
- Guida Google Drive per Google Colab (google.colab.drive)

[🔙 Torna all'indice del modulo](#indice-modulo)