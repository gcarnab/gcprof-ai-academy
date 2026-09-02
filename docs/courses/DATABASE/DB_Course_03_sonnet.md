<a id="indice-modulo"></a>
# Modulo 3: Progettare un Database Relazionale
*Fase 2 — SQL e SQLite — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Con la Fase 1 alle spalle, hai già archiviato dati in file di testo, CSV e persino su Google Sheets. Ma tutti questi strumenti condividono un limite: nessuno di loro impone davvero delle **regole** su cosa può essere salvato. Puoi inserire un'età negativa, lasciare un nome vuoto, duplicare per errore lo stesso studente due volte — e nulla te lo impedisce.

Con questo modulo entriamo nel mondo dei **database relazionali** veri e propri, e lo facciamo attraverso **SQLite**, un motore di database leggero, gratuito e già integrato in Python: non richiede installazioni, server o configurazioni complesse, ed è per questo lo strumento ideale per imparare — pur essendo, allo stesso tempo, usato in produzione in innumerevoli applicazioni reali, da app mobile a piccoli siti web.

Imparerai il linguaggio **SQL** (Structured Query Language), lo standard universale per parlare con qualsiasi database relazionale, e scoprirai come progettare lo **schema** di una tabella definendo con precisione quali dati sono ammessi, grazie ai **vincoli di integrità**. È il passaggio che trasforma un archivio "che accetta tutto" in un database affidabile, su cui puoi davvero fare conto.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare che cos'è un **DBMS** (Database Management System) e perché si usa al posto di file o fogli di calcolo.
- Riconoscere il ruolo del linguaggio **SQL** e la differenza tra i suoi principali sottolinguaggi (DDL, DML, DQL).
- Usare la libreria `sqlite3`, integrata in Python, per creare e collegarti a un database.
- Distinguere e usare correttamente **connessione** e **cursore**.
- Scrivere comandi **DDL** (`CREATE TABLE`) per definire lo schema di una tabella.
- Applicare i principali vincoli di integrità: `PRIMARY KEY`, `AUTOINCREMENT`, `NOT NULL`, `UNIQUE`.
- Progettare da zero lo schema di un piccolo database relazionale, scegliendo consapevolmente tipi di dato e vincoli.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** aver completato la Fase 1 (variabili Python, file, CSV, Google Sheets, concetto di record/campo), e la cartella `DATABASE` già pronta su Google Drive.
- **Non serve:** nessuna conoscenza pregressa di SQL: il linguaggio viene introdotto da zero, un comando alla volta.

> 💡 **Nota per il docente:** questo modulo segna il vero ingresso nella Fase 2 del corso. È consigliabile dedicargli tempo extra rispetto agli altri moduli, perché i concetti di schema e vincolo sono la base logica su cui poggiano tutti i moduli successivi, fino al project work finale.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Che cos'è un DBMS

Un **DBMS** (*Database Management System*, sistema di gestione di basi di dati) è un software specializzato nella creazione, gestione e interrogazione di database. A differenza di un file CSV o di un foglio Google, un DBMS si occupa "sotto il cofano" di garantire regole, coerenza e velocità di accesso, anche quando i dati crescono a milioni di righe.

Esistono molti DBMS diversi (li conoscerai meglio nel Modulo 12): in questo corso useremo **SQLite**, perché non richiede un server separato — l'intero database è contenuto in un unico file, gestibile interamente da codice Python.

*Perché ti serve: capire che "database" e "DBMS" sono concetti collegati ma distinti — il database è l'insieme organizzato di dati, il DBMS è lo strumento che lo gestisce — ti aiuterà a orientarti in qualsiasi discussione tecnica futura, anche al di fuori di questo corso.*

### 4.2 Il linguaggio SQL

**SQL** (*Structured Query Language*) è il linguaggio standard con cui, da decenni, si comunica con i database relazionali. Non è un linguaggio di programmazione generico come Python: è un linguaggio **dichiarativo**, pensato per descrivere *cosa* si vuole ottenere dal database, non *come* ottenerlo passo per passo.

SQL si divide in famiglie di comandi, che incontrerai progressivamente in questo corso:

- **DDL** (*Data Definition Language*): definisce la struttura del database (es. `CREATE TABLE`) — il protagonista di questo modulo.
- **DML** (*Data Manipulation Language*): inserisce, modifica e cancella dati (es. `INSERT`, `UPDATE`, `DELETE`) — lo vedrai nel Modulo 4.
- **DQL** (*Data Query Language*): interroga i dati esistenti (es. `SELECT`) — lo vedrai nel Modulo 5.

*Perché ti serve: sapere fin da subito che SQL non è un blocco unico, ma un insieme di "famiglie" con scopi diversi, ti aiuterà a orientarti nei prossimi moduli, capendo perché certi comandi si somigliano e altri no.*

### 4.3 La libreria `sqlite3` in Python

Python include, già pronta all'uso e senza bisogno di installazioni, la libreria `sqlite3`, che permette di creare database SQLite, eseguire comandi SQL ed elaborarne i risultati direttamente da codice.

Con `sqlite3.connect("nomefile.db")` si crea (o si apre, se esiste già) un file di database: da quel momento, quel singolo file conterrà l'intero database, tabelle comprese, ed è pienamente portabile — puoi copiarlo, spostarlo, condividerlo come un qualsiasi altro file.

### 4.4 Connessione e cursore

Per lavorare con `sqlite3` servono sempre due oggetti distinti:

- La **connessione** (`Connection`): rappresenta il collegamento aperto tra Python e il file di database. È l'oggetto che, alla fine, si occupa di salvare le modifiche (`commit()`, che vedrai nel Modulo 4) e di chiudere il collegamento (`close()`).
- Il **cursore** (`Cursor`): è lo strumento che esegue effettivamente i comandi SQL sulla connessione, tramite il metodo `execute()`, e che permette di recuperare eventuali risultati.

Una buona analogia: la connessione è la "porta aperta" verso il database, il cursore è la "penna" con cui scrivi e leggi al suo interno.

*Perché ti serve: connessione e cursore sono i due oggetti che aprirai in ogni singolo notebook da qui alla fine del corso: capirne bene il ruolo distinto evita moltissimi errori comuni tra chi inizia con SQL.*

### 4.5 Il comando DDL `CREATE TABLE`

Il comando `CREATE TABLE` definisce lo **schema** di una tabella: il suo nome, i suoi campi (colonne) e, per ciascun campo, il tipo di dato che può contenere. In SQLite i tipi principali sono `INTEGER` (numeri interi), `REAL` (numeri decimali), `TEXT` (testo) e `BLOB` (dati binari generici).

```sql
CREATE TABLE studenti (
    id INTEGER,
    nome TEXT,
    cognome TEXT,
    eta INTEGER
);
```

Da Python, questo comando viene passato come una semplice stringa al metodo `execute()` del cursore.

*Perché ti serve: progettare bene una tabella con `CREATE TABLE` è la base su cui si costruisce tutto il resto del database. Uno schema pensato male fin dall'inizio (campi mancanti, tipi sbagliati) si ripercuote su ogni comando successivo, dall'inserimento dati alle query più complesse.*

### 4.6 Vincoli di integrità: `PRIMARY KEY` e `AUTOINCREMENT`

Una **chiave primaria** (`PRIMARY KEY`) è il campo (o l'insieme di campi) che identifica in modo **univoco** ogni record di una tabella: non possono esistere due righe con la stessa chiave primaria. È il concetto più importante di tutta la progettazione dei database, e lo ritroverai in ogni tabella che creerai da qui in avanti.

Aggiungendo `AUTOINCREMENT` a una chiave primaria di tipo `INTEGER`, si delega a SQLite il compito di generare automaticamente un nuovo identificativo numerico crescente a ogni inserimento, senza doverlo calcolare manualmente da codice.

```sql
CREATE TABLE studenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cognome TEXT,
    eta INTEGER
);
```

### 4.7 Vincoli di integrità: `NOT NULL` e `UNIQUE`

Due ulteriori vincoli permettono di rendere una tabella ancora più affidabile:

- **`NOT NULL`**: impedisce che un campo venga lasciato vuoto (senza valore) al momento dell'inserimento di un record. Utile per i campi che devono sempre essere presenti, come il nome di uno studente.
- **`UNIQUE`**: impedisce che due record diversi abbiano lo stesso valore in quel campo, anche se il campo non è la chiave primaria. Utile, ad esempio, per un indirizzo email, che non ha senso duplicare tra due clienti diversi.

```sql
CREATE TABLE studenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cognome TEXT NOT NULL,
    email TEXT UNIQUE,
    eta INTEGER
);
```

*Perché ti serve: i vincoli sono la vera differenza tra un "archivio di dati" e un "database affidabile". Da qui in avanti, ogni volta che progetterai una tabella (anche nel project work finale), ti chiederai sempre: questo campo può restare vuoto? Questo valore deve essere unico?*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** in un registro voti, il campo "numero di matricola" dello studente è un candidato naturale a `PRIMARY KEY`, perché identifica in modo univoco ogni studente, anche in presenza di due studenti con nome e cognome identici.
- **In un'azienda (indirizzo AFM/Finanza):** in una tabella spese, un vincolo `NOT NULL` sul campo "importo" evita che venga registrata per errore una spesa senza valore, un problema che renderebbe inutilizzabile qualsiasi calcolo di totale.
- **Nel marketing e nelle relazioni internazionali (indirizzo RIM):** in una tabella clienti, un vincolo `UNIQUE` sul campo "email" evita di inserire per errore lo stesso cliente due volte con indirizzi di contatto duplicati, un problema molto comune nei CRM aziendali reali.
- **DBMS nella pratica:** un'azienda che gestisce migliaia di ordini al giorno non potrebbe affidarsi a un singolo foglio Google: avrebbe bisogno delle garanzie di velocità, coerenza e accesso concorrente offerte da un DBMS vero e proprio.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: dal primo database SQLite alla tabella con vincoli**

Apri un nuovo notebook su Google Colab, dentro la cartella `DATABASE` del tuo Google Drive, e prova, in ordine, i seguenti blocchi di codice.

**Passo 1 — Colleghiamo Google Drive e importiamo `sqlite3`**

```python
from google.colab import drive
import sqlite3
import os

# Colleghiamo Google Drive per salvare il database in modo permanente
drive.mount('/content/drive')

cartella_progetto = '/content/drive/MyDrive/Colab Notebooks/DATABASE'
if not os.path.exists(cartella_progetto):
    os.makedirs(cartella_progetto)

print("Ambiente pronto!")
```

**Passo 2 — Creiamo la connessione e il cursore**

```python
# Il percorso del file di database: se non esiste, sqlite3 lo crea automaticamente
percorso_db = f"{cartella_progetto}/scuola.db"

# connect() apre (o crea) il file di database e restituisce l'oggetto Connection
connessione = sqlite3.connect(percorso_db)

# Dalla connessione ricaviamo un cursore, lo strumento con cui eseguiremo i comandi SQL
cursore = connessione.cursor()

print("Connessione e cursore creati correttamente!")
```

**Passo 3 — Creiamo la nostra prima tabella con `CREATE TABLE`**

```python
# Il comando SQL viene scritto come una stringa, spesso su più righe per leggibilità.
# IF NOT EXISTS evita un errore se il comando viene eseguito più di una volta.
comando_ddl = """
CREATE TABLE IF NOT EXISTS studenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cognome TEXT NOT NULL,
    email TEXT UNIQUE,
    eta INTEGER
);
"""

# execute() invia il comando al database attraverso il cursore
cursore.execute(comando_ddl)

# commit() salva le modifiche in modo permanente sul file di database
connessione.commit()

print("Tabella 'studenti' creata con successo!")
```

**Passo 4 — Verifichiamo la struttura della tabella**

```python
# PRAGMA table_info è un comando speciale di SQLite che descrive lo schema di una tabella
cursore.execute("PRAGMA table_info(studenti);")
schema = cursore.fetchall()

print("Struttura della tabella 'studenti':")
for colonna in schema:
    print(colonna)
```

**Passo 5 — Creiamo una seconda tabella con vincoli diversi**

```python
comando_ddl_spese = """
CREATE TABLE IF NOT EXISTS spese (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descrizione TEXT NOT NULL,
    importo REAL NOT NULL,
    categoria TEXT
);
"""

cursore.execute(comando_ddl_spese)
connessione.commit()

print("Tabella 'spese' creata con successo!")
```

**Passo 6 — Elenchiamo tutte le tabelle presenti nel database**

```python
# sqlite_master è una tabella "di sistema" che SQLite mantiene automaticamente,
# contenente informazioni su tutte le tabelle del database
cursore.execute("SELECT name FROM sqlite_master WHERE type='table';")
tabelle = cursore.fetchall()

print("Tabelle presenti nel database:")
for tabella in tabelle:
    print(tabella[0])

# Chiudiamo la connessione al termine del lavoro
connessione.close()
```

Al termine di questo laboratorio avrai creato, sul tuo Google Drive, un vero file di database SQLite (`scuola.db`) con due tabelle, ciascuna progettata con vincoli di integrità appropriati.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Usa sempre `IF NOT EXISTS` in `CREATE TABLE`: eseguire più volte lo stesso notebook non genererà errori se la tabella esiste già.
- ✅ Assegna sempre una **chiave primaria** a ogni tabella, anche quando sembra "non necessaria": ti servirà quasi sempre, a partire dal Modulo 4, per identificare in modo univoco i record da modificare o cancellare.
- ✅ Ragiona sui vincoli **prima** di scrivere `CREATE TABLE`, chiedendoti per ogni campo: "può restare vuoto?", "deve essere unico?". Progettare bene lo schema all'inizio evita di doverlo modificare più avanti.
- ✅ Chiudi sempre la connessione con `connessione.close()` al termine del lavoro, per liberare correttamente le risorse.
- ✅ Scegli nomi di tabelle e campi in **minuscolo**, senza spazi (usa l'underscore `_` se necessario, es. `numero_telefono`): è una convenzione diffusa che rende il codice SQL più leggibile e coerente.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Un database SQLite richiede un server da installare e configurare."* → SQLite non richiede alcun server: l'intero database è contenuto in un singolo file, gestito direttamente dalla libreria `sqlite3` di Python.
- ❌ *"Connessione e cursore sono la stessa cosa."* → La connessione è il collegamento al file di database; il cursore è lo strumento che esegue i comandi SQL attraverso quella connessione: servono entrambi, con ruoli distinti.
- ❌ *"Se non uso `commit()`, i dati vengono comunque salvati sul file."* → Senza `commit()`, le modifiche restano solo temporanee, in memoria: se la connessione si chiude senza salvare, si perdono (approfondiremo questo concetto nel Modulo 4).
- ❌ *"Una tabella senza `PRIMARY KEY` va bene comunque."* → Senza una chiave primaria diventa molto più difficile, e a volte impossibile, identificare in modo univoco un record da modificare o cancellare in sicurezza.
- ❌ *"`NOT NULL` e `UNIQUE` fanno la stessa cosa."* → `NOT NULL` impedisce che un campo resti vuoto; `UNIQUE` impedisce che il suo valore si ripeta in due record diversi: sono vincoli complementari, spesso usati insieme ma con scopi diversi.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| DBMS | Software che crea, gestisce e interroga un database |
| SQL | Linguaggio standard per comunicare con i database relazionali |
| `sqlite3` | Libreria Python integrata per lavorare con database SQLite |
| Connessione | Collegamento aperto tra Python e il file di database |
| Cursore | Strumento che esegue i comandi SQL attraverso la connessione |
| `CREATE TABLE` | Comando DDL che definisce lo schema di una tabella |
| `PRIMARY KEY` | Vincolo che identifica in modo univoco ogni record |
| `AUTOINCREMENT` | Genera automaticamente un identificativo crescente |
| `NOT NULL` | Vincolo che impedisce a un campo di restare vuoto |
| `UNIQUE` | Vincolo che impedisce la ripetizione dello stesso valore |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **`AUTOINCREMENT`** — opzione che genera automaticamente un valore numerico crescente per la chiave primaria.
- **Chiave primaria (`PRIMARY KEY`)** — campo (o insieme di campi) che identifica in modo univoco ogni record di una tabella.
- **Connessione (`Connection`)** — oggetto Python che rappresenta il collegamento aperto verso un file di database.
- **Cursore (`Cursor`)** — oggetto che esegue i comandi SQL su una connessione e ne recupera i risultati.
- **DBMS (Database Management System)** — software specializzato nella gestione di basi di dati.
- **DDL (Data Definition Language)** — sottolinguaggio SQL che definisce la struttura del database (es. `CREATE TABLE`).
- **Schema** — la struttura di una tabella: nome, campi e relativi tipi di dato e vincoli.
- **SQL (Structured Query Language)** — linguaggio standard per interrogare e gestire database relazionali.
- **SQLite** — motore di database leggero, senza server, che salva l'intero database in un singolo file.
- **Vincolo di integrità** — regola imposta su un campo per garantire la qualità e la coerenza dei dati inseriti.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: SQLite richiede l'installazione di un server dedicato per funzionare.
`Falso — SQLite salva l'intero database in un singolo file e non richiede alcun server.`

**2.** Quale sottolinguaggio SQL si occupa di definire la struttura di una tabella?
- a) DML
- b) DQL
- c) DDL ✅
- d) DCL

**3.** Vero o Falso: il cursore è l'oggetto che rappresenta il collegamento tra Python e il file di database.
`Falso — è la connessione a rappresentare il collegamento; il cursore esegue i comandi SQL attraverso di essa.`

**4.** Quale comando SQL si usa per definire lo schema di una nuova tabella?
`CREATE TABLE`

**5.** Quale vincolo garantisce che ogni record di una tabella abbia un identificativo univoco?
- a) `NOT NULL`
- b) `UNIQUE`
- c) `PRIMARY KEY` ✅
- d) `AUTOINCREMENT`

**6.** Vero o Falso: `AUTOINCREMENT` genera automaticamente un identificativo numerico crescente per ogni nuovo record inserito.
`Vero.`

**7.** Qual è la differenza principale tra i vincoli `NOT NULL` e `UNIQUE`?
`NOT NULL impedisce che un campo resti vuoto; UNIQUE impedisce che il suo valore si ripeta in due record diversi.`

**8.** Vero o Falso: senza `commit()`, le modifiche fatte a un database SQLite vengono comunque salvate in modo permanente sul file.
`Falso — senza commit() le modifiche restano temporanee e possono andare perse.`

**9.** Quale metodo del cursore si usa per inviare un comando SQL al database?
- a) `run()`
- b) `send()`
- c) `execute()` ✅
- d) `query()`

**10.** Metti in ordine, dal più generale al più specifico, i seguenti concetti: Vincolo di integrità, DBMS, Database, Tabella.
`DBMS → Database → Tabella → Vincolo di integrità`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "Il mio primo database SQLite"**

Riprendi il contesto scelto nella Fase 1 (Registro scolastico, Registro spese o Elenco contatti) e progettalo questa volta come vero database relazionale con SQLite.

Per il contesto scelto:

1. Crea, con Python su Google Colab, un file di database SQLite nella cartella `DATABASE` del tuo Google Drive.
2. Progetta ed esegui il comando `CREATE TABLE` per la tabella principale del tuo contesto, includendo **almeno 4 campi**, con tipi di dato appropriati.
3. Applica consapevolmente almeno questi vincoli: una **chiave primaria** con `AUTOINCREMENT`, almeno un campo `NOT NULL` e almeno un campo `UNIQUE`.
4. Verifica lo schema creato con `PRAGMA table_info(...)` e stampa il risultato a video.
5. Aggiungi un commento nel notebook che spiega, in 2-3 righe, perché hai scelto proprio quei vincoli per quei campi specifici.

Questo project work sarà la base su cui, nel Modulo 4, inserirai i primi dati reali; costituirà la consegna di apertura della **Fase 2** del corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet dei tipi di dato SQLite (`INTEGER`, `REAL`, `TEXT`, `BLOB`) con esempi d'uso
- 📊 Schema riassuntivo dei vincoli di integrità, con esempi positivi e negativi (da produrre come infografica)
- 📝 Template di notebook Colab con connessione, cursore e `CREATE TABLE` già impostati, da riutilizzare nei moduli successivi

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Date, C. J. — *An Introduction to Database Systems*
- Elmasri, R.; Navathe, S. B. — *Fundamentals of Database Systems*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale SQLite — sezione *Data Types*
- Documentazione ufficiale Python — modulo `sqlite3`
- SQLite.org — sezione *SQL As Understood By SQLite*

[🔙 Torna all'indice del modulo](#indice-modulo)