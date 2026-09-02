<a id="indice-modulo"></a>
# Modulo 2: Google Sheets come Database
*Fase 1 — Fondamenti dei Dati — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Nel Modulo 1 hai imparato a salvare dati in file di testo e in CSV: un grande passo avanti, ma con un limite evidente. Un file CSV, da solo, non ha un'interfaccia comoda per essere consultato, modificato o condiviso con altre persone — devi sempre passare da codice Python per leggerlo o aggiornarlo.

In questo modulo facciamo un passo ulteriore: trasformiamo un normale **foglio di calcolo Google (Google Sheets)** nel nostro primo, vero "database". Non sarà ancora un database relazionale come quelli che incontrerai a partire dal Modulo 3, ma condivide già con essi il concetto fondamentale di **tabella**: righe che rappresentano record, colonne che rappresentano campi.

Il bello di Google Sheets è che unisce due mondi: da un lato resta un foglio elettronico leggibile e modificabile a occhio, comodo per un docente, un piccolo team o un'azienda che vuole vedere subito i propri dati; dall'altro, grazie alla libreria Python `gspread`, può essere letto e scritto direttamente da codice, con le stesse logiche che userai più avanti su database più strutturati.

Impareremo anche a conoscere **Pandas**, la libreria Python più usata al mondo per lavorare con dati tabellari, che da qui in avanti accompagnerà praticamente ogni modulo del corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare il concetto di **tabella** in termini di **righe/record** e **colonne/campi**.
- Autenticarti da Google Colab verso il tuo account Google, per poter leggere e scrivere su Google Sheets.
- Usare la libreria `gspread` per creare un nuovo foglio di calcolo e collegarti a uno esistente.
- Popolare un foglio con intestazioni e record, direttamente da codice Python.
- Leggere i dati presenti in un foglio Google e trasformarli in strutture Python utilizzabili.
- Eseguire le prime operazioni **CRUD** (Create, Read, Update, Delete) su un Google Sheet.
- Introdurre la libreria **Pandas** e il concetto di **DataFrame**, per manipolare dati tabellari in modo professionale.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** aver completato il Modulo 1 (variabili Python, file di testo, CSV), un account Google e la cartella `DATABASE` già creata su Google Drive.
- **Non serve:** nessuna conoscenza pregressa di API Google o di fogli di calcolo avanzati: tutto ciò che serve viene spiegato passo dopo passo.

> 💡 **Nota per il docente:** questo modulo è un ottimo punto di raccordo interdisciplinare, specialmente per le classi AFM e RIM, perché Google Sheets è uno strumento già familiare agli studenti in ambito economico-aziendale: qui lo si "reinterpreta" in chiave informatica come primo database.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Il concetto di tabella: righe, colonne, record, campi

Ogni volta che organizziamo dati in righe e colonne, stiamo costruendo una **tabella**, il mattone fondamentale di qualsiasi database — relazionale o no.

- Una **riga** rappresenta un **record**: un singolo elemento completo (es. uno studente, una spesa, un cliente).
- Una **colonna** rappresenta un **campo**: una singola caratteristica che ogni record possiede (es. Nome, Importo, Email).

Questo vocabolario — record e campo — non è specifico di Google Sheets: lo ritroverai identico quando, dal Modulo 3 in poi, lavorerai con vere tabelle SQL. Impararlo bene ora significa non doverlo reimparare più avanti.

*Perché ti serve: pensare fin da subito in termini di "record" e "campi", invece che genericamente di "righe" e "celle", è il primo passo per ragionare come chi progetta database, non solo come chi compila un foglio Excel.*

### 4.2 Perché Google Sheets come primo database

Un Google Sheet non ha i vincoli di integrità né il linguaggio SQL di un database vero, ma ha tre vantaggi che lo rendono perfetto come "ponte" tra il CSV del Modulo 1 e SQLite del Modulo 3:

- È **visibile e modificabile a occhio**, utile per controllare rapidamente cosa contiene un archivio dati.
- È **condivisibile** con altre persone (docente, compagni, colleghi) semplicemente con un link.
- È **interrogabile da Python**, tramite API Google, con logiche di lettura/scrittura molto simili a quelle di un database reale.

### 4.3 Autenticazione: collegare Colab al tuo account Google

Per permettere a un programma Python di leggere e scrivere su Google Sheets a nome tuo, serve un passaggio di **autenticazione**: un meccanismo con cui autorizzi in modo sicuro Colab ad accedere ai tuoi servizi Google (Drive, Sheets), senza mai condividere direttamente la tua password.

In Google Colab questo passaggio è semplificato dal modulo `google.colab.auth`, che apre una finestra di autorizzazione guidata: basta un clic per confermare che è davvero tu a concedere l'accesso.

*Perché ti serve: l'autenticazione è un concetto che ritroverai in quasi ogni servizio online che userai da programmatore. Capirlo bene ora, in un contesto guidato e sicuro, ti sarà utile ben oltre questo corso.*

### 4.4 La libreria `gspread`

`gspread` è la libreria Python più diffusa per interagire con Google Sheets: permette di aprire fogli esistenti, crearne di nuovi, leggere e scrivere celle, righe intere o range di dati, con poche righe di codice.

Una volta autenticati, `gspread` si collega al tuo account tramite la libreria `google.auth`, e da quel momento un foglio Google diventa, a tutti gli effetti, un oggetto Python su cui puoi lavorare come faresti con una lista o un dizionario.

### 4.5 Creare e popolare un foglio da Python

Con `gspread` puoi creare un nuovo foglio di calcolo direttamente da codice (senza aprire il browser), definirne il nome, e scrivere al suo interno l'intestazione (i nomi dei campi) e i record, uno alla volta o tutti insieme.

*Perché ti serve: creare la struttura di un archivio dati via codice, invece che a mano, è un'abitudine che ritroverai identica quando, nel Modulo 3, creerai tabelle SQL con `CREATE TABLE`: anche lì la struttura nascerà da codice, non da un'interfaccia grafica.*

### 4.6 Leggere dati da un foglio Google

`gspread` offre diversi metodi per leggere il contenuto di un foglio: una singola cella, una riga, una colonna, o l'intero contenuto sotto forma di lista di liste (una lista per riga) oppure di lista di dizionari (un dizionario per record, con i nomi dei campi come chiavi).

Quest'ultima forma — lista di dizionari — è particolarmente comoda, perché permette di accedere a un valore con `record["Nome"]` invece di doversi ricordare la posizione numerica della colonna.

### 4.7 Le prime operazioni CRUD

**CRUD** è un acronimo che userai per tutto il corso: **C**reate (creare un nuovo record), **R**ead (leggerne uno o più), **U**pdate (modificarne uno esistente), **D**elete (cancellarne uno). Sono le quattro operazioni fondamentali su cui si basa la gestione di qualunque archivio dati, dal più semplice foglio Google al database aziendale più complesso.

Su Google Sheets queste operazioni si traducono in azioni molto concrete: aggiungere una riga (Create), leggere il contenuto di una riga o dell'intero foglio (Read), sovrascrivere il valore di una cella o di una riga (Update), rimuovere una riga (Delete).

*Perché ti serve: il vocabolario CRUD non cambierà mai, da qui alla fine del corso. Cambierà solo lo strumento con cui lo realizzi: oggi `gspread`, dal Modulo 4 i comandi SQL `INSERT`, `UPDATE`, `DELETE`.*

### 4.8 Introduzione a Pandas e ai DataFrame

**Pandas** è la libreria Python di riferimento per lavorare con dati tabellari: la sua struttura dati principale, il **DataFrame**, rappresenta esattamente una tabella (righe e colonne), con potenti funzioni integrate per filtrare, ordinare, calcolare statistiche e molto altro.

Un Google Sheet letto con `gspread` può essere trasformato in un DataFrame Pandas in una sola riga di codice: da quel momento in poi, tutte le funzioni di Pandas diventano disponibili sui tuoi dati.

*Perché ti serve: da qui fino all'ultimo modulo del corso, Pandas sarà il tuo strumento quotidiano per leggere risultati di query, calcolare statistiche (Modulo 7) e costruire grafici (Modulo 10). Prendere confidenza con i DataFrame fin da ora ti farà risparmiare tempo prezioso più avanti.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** un registro voti condiviso su Google Sheets tra più docenti, dove ogni riga è uno studente e ogni colonna una materia, è un caso d'uso reale e già diffuso di "database" collaborativo basato su foglio di calcolo.
- **In un'azienda (indirizzo AFM/Finanza):** un piccolo registro spese condiviso su Google Sheets tra più collaboratori permette di aggiungere spese da postazioni diverse, mantenendo un unico archivio sempre aggiornato — a differenza di un file CSV locale, che ogni persona modificherebbe per conto proprio.
- **Nel marketing e nelle relazioni internazionali (indirizzo RIM):** un elenco clienti su Google Sheets, aggiornato automaticamente da uno script Python che aggiunge un nuovo contatto ogni volta che arriva una richiesta, è un primo, concreto esempio di automazione dati.
- **CRUD nella pratica:** aggiungere un nuovo studente al registro è una Create; stampare l'elenco degli studenti è una Read; correggere un voto sbagliato è una Update; rimuovere lo studente che ha cambiato scuola è una Delete.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: da Google Sheets a Pandas, passando per il CRUD**

Apri un nuovo notebook su Google Colab (dentro la cartella `DATABASE` di Google Drive che hai creato nel Modulo 1) e prova, in ordine, i seguenti blocchi di codice.

**Passo 1 — Installiamo e importiamo le librerie necessarie**

```python
# gspread è già preinstallato su Colab, ma installiamo/aggiorniamo per sicurezza
!pip install --upgrade gspread google-auth -q

import gspread
from google.colab import auth
from google.auth import default
import pandas as pd

print("Librerie pronte all'uso!")
```

**Passo 2 — Autentichiamoci con il nostro account Google**

```python
# auth.authenticate_user() apre una finestra di autorizzazione:
# accettando, concediamo a Colab il permesso di accedere ai nostri servizi Google
auth.authenticate_user()

# Otteniamo le credenziali autenticate e le usiamo per creare un client gspread
creds, _ = default()
client = gspread.authorize(creds)

print("Autenticazione completata: siamo collegati al nostro account Google!")
```

**Passo 3 — Creiamo un nuovo foglio di calcolo da codice**

```python
# create() crea un nuovo Google Sheet con il nome indicato
foglio = client.create("Registro Studenti - GCProf Academy")

# Un foglio può contenere più "fogli di lavoro" (worksheet): prendiamo il primo
worksheet = foglio.sheet1

print(f"Foglio creato con successo: {foglio.url}")
```

**Passo 4 — Create: scriviamo intestazione e primi record**

```python
# Scriviamo l'intestazione (i nomi dei campi) sulla prima riga
worksheet.append_row(["Nome", "Cognome", "Materia", "Voto"])

# Aggiungiamo alcuni record: ogni append_row() equivale a una operazione Create
worksheet.append_row(["Marco", "Rossi", "Matematica", 7])
worksheet.append_row(["Giulia", "Bianchi", "Italiano", 8])
worksheet.append_row(["Luca", "Verdi", "Inglese", 6])

print("Record inseriti correttamente nel foglio!")
```

**Passo 5 — Read: leggiamo tutti i record come lista di dizionari**

```python
# get_all_records() legge il foglio e restituisce una lista di dizionari:
# la prima riga viene usata automaticamente come chiavi (nomi dei campi)
records = worksheet.get_all_records()

for record in records:
    print(record)

# Accediamo a un singolo campo tramite il nome, non la posizione
print("\nPrimo studente in elenco:", records[0]["Nome"])
```

**Passo 6 — Update: modifichiamo un voto esistente**

```python
# find() cerca la prima cella che contiene esattamente il valore indicato
cella = worksheet.find("Marco")

# La riga trovata (cella.row) è la stessa in cui si trova il voto da correggere:
# la colonna 4 corrisponde al campo "Voto"
worksheet.update_cell(cella.row, 4, 8)

print("Voto di Marco aggiornato a 8!")
```

**Passo 7 — Delete: rimuoviamo un record**

```python
# Cerchiamo la riga corrispondente allo studente da eliminare
cella = worksheet.find("Luca")

# delete_rows() rimuove l'intera riga dal foglio
worksheet.delete_rows(cella.row)

print("Record di Luca rimosso dal foglio!")
```

**Passo 8 — Dal foglio Google a un DataFrame Pandas**

```python
# Rileggiamo i dati aggiornati e li trasformiamo in un DataFrame
records_aggiornati = worksheet.get_all_records()
df = pd.DataFrame(records_aggiornati)

# Un DataFrame si stampa già in forma di tabella leggibile
print(df)

# Con Pandas possiamo subito calcolare statistiche, es. la media dei voti
print("\nMedia voti della classe:", df["Voto"].mean())
```

Al termine di questo laboratorio avrai creato, popolato, modificato e interrogato il tuo primo "database" collaborativo, e avrai trasformato i suoi dati in un DataFrame Pandas pronto per essere analizzato.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Usa sempre `get_all_records()` (lista di dizionari) invece di `get_all_values()` (lista di liste) quando vuoi accedere ai campi per nome: il codice risulta più leggibile e meno soggetto a errori se l'ordine delle colonne cambia.
- ✅ Prima di un'operazione di Update o Delete, verifica sempre di aver trovato la riga corretta (es. stampando `cella.row` a video), per evitare di modificare o cancellare il record sbagliato.
- ✅ Dai ai tuoi fogli Google **nomi descrittivi** (es. "Registro Studenti - Classe 4A"), soprattutto se ne creerai molti nel corso del tempo.
- ✅ Trasforma i dati in DataFrame Pandas il prima possibile: da quel momento avrai a disposizione strumenti molto più potenti di quelli offerti da `gspread` da solo.
- ✅ Ricontrolla sempre l'intestazione del foglio dopo averla scritta: un errore di battitura nel nome di un campo si ripercuote su tutto il codice successivo che userà quel nome.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Posso saltare l'autenticazione se il foglio è già pubblico."* → Anche un foglio pubblico in lettura richiede l'autenticazione per essere letto o scritto da codice tramite `gspread`: è un passaggio di sicurezza obbligatorio, non facoltativo.
- ❌ *"`get_all_records()` e `get_all_values()` restituiscono la stessa cosa."* → Il primo restituisce una lista di **dizionari** (accesso per nome del campo), il secondo una lista di **liste** (accesso per posizione): sono strutture diverse, adatte a usi diversi.
- ❌ *"Posso modificare un foglio Google senza mai controllare cosa contiene."* → Prima di una Update o una Delete conviene sempre fare una Read di verifica: un `find()` che trova la riga sbagliata (es. per un nome duplicato) può causare la modifica del record errato.
- ❌ *"Un DataFrame Pandas e una lista di dizionari sono la stessa cosa."* → Un DataFrame è una struttura specializzata, con funzioni proprie (filtri, medie, ordinamenti); una lista di dizionari è solo il "materiale grezzo" da cui, spesso, si costruisce un DataFrame.
- ❌ *"Google Sheets è già un database relazionale."* → È un ottimo primo passo, ma manca di vincoli di integrità, chiavi e relazioni formali tra tabelle: concetti che introdurremo a partire dal Modulo 3 con SQLite.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| Tabella | Struttura organizzata in righe (record) e colonne (campi) |
| Record | Una singola riga di dati, che rappresenta un elemento completo |
| Campo | Una singola colonna, che rappresenta una caratteristica del record |
| `gspread` | Libreria Python per leggere e scrivere Google Sheets da codice |
| Autenticazione | Processo che autorizza in modo sicuro l'accesso ai servizi Google |
| CRUD | Create, Read, Update, Delete: le quattro operazioni base su un archivio dati |
| Pandas | Libreria Python di riferimento per manipolare dati tabellari |
| DataFrame | Struttura dati di Pandas che rappresenta una tabella |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **API (Application Programming Interface)** — insieme di regole che permette a un programma di comunicare con un servizio esterno, come Google Sheets.
- **Autenticazione** — processo con cui un utente dimostra in modo sicuro la propria identità a un servizio, per ottenerne l'accesso.
- **Campo** — una singola colonna di una tabella, che rappresenta una caratteristica di ogni record.
- **CRUD** — acronimo di Create, Read, Update, Delete: le quattro operazioni fondamentali su un archivio dati.
- **DataFrame** — struttura dati di Pandas che rappresenta una tabella, con righe e colonne indicizzate.
- **`gspread`** — libreria Python per interagire con Google Sheets tramite codice.
- **Pandas** — libreria Python per la manipolazione e l'analisi di dati tabellari.
- **Record** — una singola riga di una tabella, che rappresenta un elemento completo.
- **Worksheet** — un singolo foglio di lavoro all'interno di un file Google Sheets.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: in una tabella, una riga rappresenta un campo e una colonna rappresenta un record.
`Falso — è il contrario: una riga rappresenta un record, una colonna rappresenta un campo.`

**2.** A cosa serve l'autenticazione prima di usare `gspread` da Google Colab?
- a) A velocizzare il caricamento del foglio
- b) A tradurre automaticamente i dati
- c) Ad autorizzare in modo sicuro l'accesso ai servizi Google a nome dell'utente ✅
- d) A creare automaticamente un nuovo account Google

**3.** Vero o Falso: `get_all_records()` restituisce i dati di un foglio Google sotto forma di lista di dizionari.
`Vero.`

**4.** Quale metodo di `gspread` useresti per aggiungere un nuovo record in fondo a un foglio?
`append_row()`

**5.** A quale operazione CRUD corrisponde la cancellazione di una riga da un Google Sheet?
- a) Create
- b) Read
- c) Update
- d) Delete ✅

**6.** Vero o Falso: un Google Sheet, di per sé, garantisce già vincoli di integrità come in un database relazionale.
`Falso — manca di vincoli formali, chiavi e relazioni: concetti introdotti a partire dal Modulo 3.`

**7.** Che cos'è, in una frase, un DataFrame Pandas?
`Una struttura dati di Pandas che rappresenta una tabella, con righe e colonne su cui si possono applicare funzioni di analisi.`

**8.** Vero o Falso: per accedere a un campo di un record letto con `get_all_records()` è necessario conoscere la sua posizione numerica nella riga.
`Falso — si può accedere per nome del campo, come in un dizionario (es. record["Nome"]).`

**9.** Quale metodo di `gspread` si usa per cercare la cella contenente un determinato valore?
- a) `search()`
- b) `find()` ✅
- c) `locate()`
- d) `lookup()`

**10.** Metti in ordine, secondo l'acronimo CRUD, le seguenti operazioni: Delete, Create, Update, Read.
`Create → Read → Update → Delete`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "Il mio primo database su Google Sheets"**

Riprendi il contesto che hai scelto nel Project Work del Modulo 1 (Registro scolastico, Registro spese o Elenco contatti) e realizzalo questa volta come Google Sheet, gestito interamente da codice Python.

Per il contesto scelto:

1. Crea, con `gspread`, un nuovo Google Sheet con un nome descrittivo, e scrivi l'intestazione corretta (i nomi dei campi) come prima riga.
2. Inserisci almeno **5 record** usando `append_row()` (operazione Create).
3. Scrivi codice Python che legga tutti i record con `get_all_records()` e li trasformi in un **DataFrame Pandas**, stampandolo a video (operazione Read).
4. Esegui almeno una operazione di **Update** (modifica di un valore esistente) e una di **Delete** (rimozione di un record), verificando ogni volta il risultato con una nuova lettura.
5. Aggiungi un commento finale nel notebook che spiega, in 2-3 righe, quali vantaggi hai notato usando Google Sheets rispetto al CSV del Modulo 1, e quali limiti pensi che abbia ancora rispetto a un vero database.

Questo project work, insieme a quello del Modulo 1, costituirà la consegna finale della **Fase 1** del corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet dei principali metodi `gspread` (creazione, lettura, scrittura, ricerca, cancellazione)
- 📊 Schema riassuntivo delle operazioni CRUD, con esempio Google Sheets a confronto (da produrre come infografica)
- 📝 Template di notebook Colab con la sequenza di autenticazione già pronta, da riutilizzare in tutto il corso

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- McKinney, W. — *Python for Data Analysis* (Pandas e DataFrame)
- Date, C. J. — *An Introduction to Database Systems*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale della libreria `gspread`
- Documentazione ufficiale di Pandas — sezione `DataFrame`
- Guida Google per l'autenticazione da Google Colab (`google.colab.auth`)

[🔙 Torna all'indice del modulo](#indice-modulo)