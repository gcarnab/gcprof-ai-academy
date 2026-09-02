<a id="indice-modulo"></a>
# Modulo 8: Programmazione ad Oggetti per Database
*Fase 3 — Relazioni e Architetture — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Fino a questo punto del corso abbiamo scritto codice "a script": una sequenza di istruzioni Python, una dopo l'altra, dentro le celle di un notebook. Funziona bene per imparare ed esplorare, ma cosa succede quando lo stesso codice per collegarsi al database, inserire uno studente o interrogare una tabella serve in dieci punti diversi del programma? Copiarlo e incollarlo ogni volta è fonte sicura di errori, duplicazioni e codice difficile da mantenere.

In questo modulo facciamo il salto verso il codice **professionale**, applicando ai database la **Programmazione Orientata agli Oggetti (OOP)** che probabilmente hai già incontrato in altri contesti. Costruiremo una classe `DbManager`: un unico punto di accesso al database, che incapsula al suo interno la connessione, le query e la gestione degli errori, offrendo all'esterno metodi semplici e riutilizzabili come `aggiungi_studente()` o `ottieni_studenti()`.

È un cambio di prospettiva importante: da qui in avanti, non scriverai più query SQL sparse nel codice, ma costruirai **componenti riutilizzabili**, pronti per essere usati in qualunque applicazione — dalle interfacce grafiche del Modulo 9 fino a qualsiasi progetto futuro che vorrai realizzare.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare perché organizzare il codice di accesso al database in una classe migliora leggibilità, manutenibilità e riuso.
- Progettare una classe `DbManager` con un costruttore (`__init__`) che apre e mantiene la connessione al database.
- Scrivere metodi dedicati per le operazioni CRUD (Create, Read, Update, Delete), incapsulando al loro interno le query SQL.
- Gestire gli errori con blocchi `try/except`, evitando che un problema imprevisto blocchi l'intero programma.
- Usare correttamente `commit()` e `rollback()` per garantire la coerenza dei dati anche in presenza di errori.
- Chiudere in modo corretto la connessione al database quando non serve più.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** dimestichezza con SQLite e Python maturata nei Moduli 3-5 (connessione, cursore, `SELECT`, `INSERT`), e conoscenze di base di Programmazione Orientata agli Oggetti (classi, `__init__`, `self`, metodi).
- **Non serve:** aver già progettato una classe per gestire un database: è esattamente l'obiettivo pratico di questo modulo, costruito passo dopo passo.

> 💡 **Nota per il docente:** se la classe non è stata ancora affrontata in altri moduli/corsi di programmazione, è consigliabile un breve richiamo ai concetti di `self`, costruttore e metodo prima di iniziare il Laboratorio.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Perché organizzare il codice in una classe

Finora, ogni volta che volevamo interrogare il database, abbiamo scritto codice simile a questo: aprire la connessione, creare il cursore, eseguire la query, gestire il risultato. Ripetere questi passaggi in ogni cella del notebook funziona per un esercizio, ma **non è sostenibile** in un progetto reale: se cambia il nome del database, o va corretto un errore nella query di inserimento, bisognerebbe modificare il codice in decine di punti diversi.

Una **classe** risolve questo problema: raccoglie in un unico posto tutta la logica di accesso al database, e la espone al resto del programma attraverso pochi metodi chiari. È lo stesso principio dell'**incapsulamento** che avrai incontrato studiando l'OOP: i dettagli tecnici (query SQL, connessione, cursore) restano "nascosti" dentro la classe, mentre chi la usa si limita a chiamare metodi con nomi comprensibili.

*Perché ti serve: questo è il salto di qualità che separa uno script scolastico da un componente software riutilizzabile — la stessa classe che costruirai oggi potrà essere riusata, senza modifiche, in qualsiasi progetto futuro che abbia bisogno dello stesso database.*

### 4.2 Progettare la classe DbManager: costruttore e attributi

Il **costruttore** di una classe Python è il metodo speciale `__init__`, eseguito automaticamente ogni volta che si crea un nuovo oggetto. Per la nostra classe `DbManager`, il costruttore è il posto giusto per aprire la connessione al database e salvarla come **attributo** dell'oggetto (`self.connessione`), in modo che tutti gli altri metodi della classe possano riutilizzarla senza doverla riaprire ogni volta.

```python
class DbManager:
    def __init__(self, percorso_db):
        # self.connessione è un attributo: resta "vivo" per tutta la vita dell'oggetto
        self.connessione = sqlite3.connect(percorso_db)
        self.cursore = self.connessione.cursor()
```

*Perché ti serve: mantenere la connessione aperta come attributo, invece di aprirla e chiuderla a ogni operazione, è molto più efficiente ed è l'approccio usato nel codice professionale.*

### 4.3 I metodi CRUD della classe

Ogni operazione CRUD diventa un **metodo** della classe, con un nome chiaro che descrive cosa fa (non come lo fa). Ad esempio, un metodo `aggiungi_studente(nome, cognome, eta, classe, media)` nasconde al suo interno la query `INSERT` con i parametri, restituendo all'esterno solo il risultato dell'operazione.

Questo porta un vantaggio enorme: chi usa la classe non ha bisogno di conoscere SQL, gli basta chiamare `db.aggiungi_studente("Marco", "Rossi", 16, "3A", 7.2)`. È lo stesso principio che userai, nel Modulo 9, per collegare un'interfaccia grafica al database senza scrivere SQL nei gestori degli eventi.

### 4.4 Gestione degli errori con try/except

In un programma reale, qualcosa può sempre andare storto: un valore mancante, un tipo di dato sbagliato, un vincolo di integrità violato (es. un `UNIQUE` duplicato). Senza gestione degli errori, uno di questi problemi **blocca l'intero programma** con un messaggio tecnico poco comprensibile.

Il blocco `try/except` permette di "provare" un'operazione rischiosa e di gestire in modo controllato un eventuale errore, senza interrompere l'esecuzione:

```python
try:
    # Codice che potrebbe generare un errore
    self.cursore.execute("INSERT INTO studenti (...) VALUES (...)", valori)
    self.connessione.commit()
except sqlite3.Error as errore:
    # Gestiamo l'errore in modo controllato, con un messaggio comprensibile
    print(f"Errore durante l'inserimento: {errore}")
```

*Perché ti serve: un'applicazione che si blocca al primo errore è inutilizzabile nella pratica; saper gestire gli errori è ciò che distingue un prototipo da un software affidabile.*

### 4.5 Transazioni: commit e rollback

Una **transazione** è un insieme di operazioni sul database che deve essere completato **tutto o niente**: se una parte fallisce, è importante poter annullare anche le modifiche già effettuate, per non lasciare il database in uno stato incoerente.

- **`commit()`**: rende permanenti le modifiche fatte fino a quel momento.
- **`rollback()`**: annulla tutte le modifiche non ancora confermate con `commit()`, riportando il database allo stato precedente.

Combinando `try/except` con `rollback()` nel blocco `except`, possiamo garantire che un errore durante un'operazione non lasci il database "a metà":

```python
try:
    self.cursore.execute(...)
    self.connessione.commit()
except sqlite3.Error as errore:
    self.connessione.rollback()   # annulliamo eventuali modifiche parziali
    print(f"Operazione annullata: {errore}")
```

### 4.6 Chiudere correttamente la connessione

Una connessione al database aperta e mai chiusa consuma risorse inutilmente e, in alcuni contesti, può impedire ad altri programmi di accedere allo stesso file. È buona norma aggiungere alla classe un metodo dedicato, ad esempio `chiudi_connessione()`, da chiamare esplicitamente quando il database non serve più.

*Perché ti serve: è la stessa logica del `with open(...)` visto nel Modulo 1 per i file di testo — ogni risorsa che apri (file, connessione, rete) andrebbe sempre chiusa correttamente quando hai finito di usarla.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** una classe `DbManager` per il registro voti, con metodi `aggiungi_voto()`, `media_studente()` e `elimina_voto()`, usata sia da un notebook di analisi sia da un'eventuale interfaccia grafica (Modulo 9), senza duplicare il codice SQL.
- **In un'azienda (indirizzo AFM/Finanza):** una classe `GestoreSpese` con un metodo `aggiungi_spesa()` che, in caso di importo negativo o categoria mancante, solleva un errore controllato invece di inserire un dato non valido.
- **Nel marketing e RIM:** una classe `GestoreContatti` con un metodo `aggiungi_contatto()` che usa `try/except` per gestire in modo elegante il tentativo di inserire due volte la stessa email, protetta da un vincolo `UNIQUE`.
- **Transazioni nella pratica:** l'iscrizione di uno studente a un corso che richiede sia l'inserimento in una tabella `iscrizioni` sia l'aggiornamento di un contatore in un'altra tabella: se la seconda operazione fallisce, `rollback()` garantisce che anche la prima venga annullata.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: costruiamo la classe DbManager**

Esegui i seguenti blocchi di codice in ordine, su un nuovo notebook Google Colab.

**Passo 1 — Definiamo la classe e il costruttore**

```python
# Importiamo il modulo sqlite3, necessario per lavorare con il database
import sqlite3

class DbManager:
    """Classe che incapsula tutte le operazioni sul database degli studenti."""

    def __init__(self, percorso_db):
        # Apriamo la connessione UNA SOLA VOLTA, quando l'oggetto viene creato
        self.connessione = sqlite3.connect(percorso_db)
        self.cursore = self.connessione.cursor()

        # Creiamo la tabella se non esiste già, così la classe è "pronta all'uso"
        self.cursore.execute("""
            CREATE TABLE IF NOT EXISTS studenti (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                cognome TEXT NOT NULL,
                eta INTEGER,
                classe TEXT,
                media REAL
            )
        """)
        self.connessione.commit()
        print("DbManager pronto: connessione aperta e tabella verificata.")
```

**Passo 2 — Aggiungiamo il metodo per inserire uno studente (con gestione errori)**

```python
    def aggiungi_studente(self, nome, cognome, eta, classe, media):
        """Inserisce un nuovo studente, gestendo eventuali errori in modo controllato."""
        try:
            self.cursore.execute(
                "INSERT INTO studenti (nome, cognome, eta, classe, media) VALUES (?, ?, ?, ?, ?)",
                (nome, cognome, eta, classe, media)
            )
            # commit() conferma l'inserimento in modo permanente
            self.connessione.commit()
            print(f"Studente {nome} {cognome} aggiunto con successo.")
            return True

        except sqlite3.Error as errore:
            # In caso di errore, annulliamo eventuali modifiche parziali
            self.connessione.rollback()
            print(f"Errore durante l'inserimento: {errore}")
            return False

# Aggiungiamo il metodo alla classe già definita (in Colab, ridefiniamo la classe per intero)
```

> 💻 **Nota:** in un notebook Colab conviene scrivere la classe completa in un'unica cella, con tutti i suoi metodi. I metodi sono separati qui solo a scopo didattico: nel Passo 5 troverai la classe completa e pronta all'uso.

**Passo 3 — Aggiungiamo i metodi di lettura, aggiornamento ed eliminazione**

```python
    def ottieni_studenti(self, classe=None):
        """Restituisce tutti gli studenti, oppure solo quelli di una classe specifica."""
        if classe:
            self.cursore.execute("SELECT * FROM studenti WHERE classe = ?", (classe,))
        else:
            self.cursore.execute("SELECT * FROM studenti")
        return self.cursore.fetchall()

    def aggiorna_media(self, id_studente, nuova_media):
        """Aggiorna la media di uno studente identificato dal suo id."""
        try:
            self.cursore.execute(
                "UPDATE studenti SET media = ? WHERE id = ?",
                (nuova_media, id_studente)
            )
            self.connessione.commit()
            print(f"Media aggiornata per lo studente con id {id_studente}.")
        except sqlite3.Error as errore:
            self.connessione.rollback()
            print(f"Errore durante l'aggiornamento: {errore}")

    def elimina_studente(self, id_studente):
        """Elimina uno studente identificato dal suo id."""
        try:
            self.cursore.execute("DELETE FROM studenti WHERE id = ?", (id_studente,))
            self.connessione.commit()
            print(f"Studente con id {id_studente} eliminato.")
        except sqlite3.Error as errore:
            self.connessione.rollback()
            print(f"Errore durante l'eliminazione: {errore}")

    def chiudi_connessione(self):
        """Chiude la connessione al database quando non serve più."""
        self.connessione.close()
        print("Connessione al database chiusa correttamente.")
```

**Passo 4 — La classe completa, pronta da eseguire in un'unica cella**

```python
import sqlite3

class DbManager:
    """Classe che incapsula tutte le operazioni CRUD sul database degli studenti."""

    def __init__(self, percorso_db):
        self.connessione = sqlite3.connect(percorso_db)
        self.cursore = self.connessione.cursor()
        self.cursore.execute("""
            CREATE TABLE IF NOT EXISTS studenti (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                cognome TEXT NOT NULL,
                eta INTEGER,
                classe TEXT,
                media REAL
            )
        """)
        self.connessione.commit()

    def aggiungi_studente(self, nome, cognome, eta, classe, media):
        try:
            self.cursore.execute(
                "INSERT INTO studenti (nome, cognome, eta, classe, media) VALUES (?, ?, ?, ?, ?)",
                (nome, cognome, eta, classe, media)
            )
            self.connessione.commit()
            return True
        except sqlite3.Error as errore:
            self.connessione.rollback()
            print(f"Errore durante l'inserimento: {errore}")
            return False

    def ottieni_studenti(self, classe=None):
        if classe:
            self.cursore.execute("SELECT * FROM studenti WHERE classe = ?", (classe,))
        else:
            self.cursore.execute("SELECT * FROM studenti")
        return self.cursore.fetchall()

    def aggiorna_media(self, id_studente, nuova_media):
        try:
            self.cursore.execute(
                "UPDATE studenti SET media = ? WHERE id = ?", (nuova_media, id_studente)
            )
            self.connessione.commit()
        except sqlite3.Error as errore:
            self.connessione.rollback()
            print(f"Errore durante l'aggiornamento: {errore}")

    def elimina_studente(self, id_studente):
        try:
            self.cursore.execute("DELETE FROM studenti WHERE id = ?", (id_studente,))
            self.connessione.commit()
        except sqlite3.Error as errore:
            self.connessione.rollback()
            print(f"Errore durante l'eliminazione: {errore}")

    def chiudi_connessione(self):
        self.connessione.close()

print("Classe DbManager definita correttamente.")
```

**Passo 5 — Usiamo la classe: creare un oggetto e chiamare i suoi metodi**

```python
# Creiamo un oggetto DbManager: __init__ apre la connessione automaticamente
db = DbManager("scuola_oop.db")

# Aggiungiamo alcuni studenti usando il metodo dedicato, senza scrivere SQL qui fuori
db.aggiungi_studente("Marco", "Rossi", 16, "3A", 7.2)
db.aggiungi_studente("Giulia", "Bianchi", 17, "4B", 8.5)
db.aggiungi_studente("Luca", "Verdi", 15, "2C", 6.1)

# Leggiamo tutti gli studenti della classe 3A
studenti_3a = db.ottieni_studenti(classe="3A")
print("\nStudenti della 3A:")
for studente in studenti_3a:
    print(studente)

# Aggiorniamo la media del primo studente (id 1)
db.aggiorna_media(1, 7.8)

# Verifichiamo l'aggiornamento leggendo tutti gli studenti
print("\nTutti gli studenti dopo l'aggiornamento:")
for studente in db.ottieni_studenti():
    print(studente)
```

**Passo 6 — Testiamo la gestione degli errori**

```python
# Proviamo a chiamare aggiorna_media con un tipo di dato non valido (una stringa al posto di un numero)
# NOT NULL/tipo non sono forzati rigidamente da SQLite, ma simuliamo un errore reale con un id inesistente
successo = db.aggiungi_studente(None, "Cognome", 16, "3A", 7.0)  # nome mancante: viola NOT NULL

if not successo:
    print("L'inserimento non è andato a buon fine: il database non è stato modificato in modo incoerente.")

# Chiudiamo correttamente la connessione al termine del lavoro
db.chiudi_connessione()
```

Al termine del laboratorio avrai costruito e usato una classe `DbManager` completa, riutilizzabile in qualsiasi progetto futuro con lo stesso schema di dati.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Apri la connessione al database **una sola volta**, nel costruttore, e riutilizzala in tutti i metodi della classe.
- ✅ Dai ai metodi nomi che descrivono **cosa fanno** (`aggiungi_studente`), non **come** lo fanno: chi usa la classe non deve conoscere SQL.
- ✅ Avvolgi sempre le operazioni di scrittura (`INSERT`, `UPDATE`, `DELETE`) in un blocco `try/except`, con `rollback()` nel caso di errore.
- ✅ Restituisci un valore (es. `True`/`False`) dai metodi che modificano i dati, così chi chiama il metodo può sapere se l'operazione è andata a buon fine.
- ✅ Ricordati sempre di chiudere la connessione con un metodo dedicato quando il lavoro con il database è concluso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Va bene aprire una nuova connessione a ogni metodo della classe."* → È inefficiente e rischia di lasciare connessioni aperte inutilmente: la connessione va aperta una sola volta nel costruttore.
- ❌ *"Se non gestisco l'errore con `try/except`, il programma continua comunque."* → Senza gestione, un errore SQL interrompe l'esecuzione dell'intero programma con un traceback tecnico poco comprensibile all'utente finale.
- ❌ *"`rollback()` serve solo se ho già chiamato `commit()`."* → `rollback()` annulla tutte le modifiche non ancora confermate con `commit()`, proprio per evitare che vengano salvate per errore.
- ❌ *"I metodi della classe possono contenere query SQL diverse ogni volta che servono, senza uno schema fisso."* → Query duplicate e leggermente diverse tra loro sono una fonte comune di bug: meglio un metodo dedicato e ben testato per ogni operazione.
- ❌ *"Non è necessario chiudere la connessione, tanto Python la chiude da solo alla fine."* → Anche se Python la chiude eventualmente, è buona pratica chiuderla esplicitamente appena il lavoro è concluso, per liberare subito le risorse.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| Classe `DbManager` | Incapsula connessione, cursore e query in un unico componente riutilizzabile |
| `__init__` | Costruttore: apre la connessione una sola volta, alla creazione dell'oggetto |
| Metodo CRUD | Funzione della classe che nasconde una query SQL dietro un nome chiaro |
| `try/except` | Gestisce in modo controllato eventuali errori, senza bloccare il programma |
| `commit()` | Conferma in modo permanente le modifiche effettuate |
| `rollback()` | Annulla le modifiche non ancora confermate, in caso di errore |
| `chiudi_connessione()` | Metodo dedicato per rilasciare correttamente la connessione al database |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **Attributo** — variabile associata a un oggetto, accessibile tramite `self` all'interno della classe.
- **Costruttore (`__init__`)** — metodo speciale eseguito automaticamente alla creazione di un oggetto.
- **Incapsulamento** — principio OOP che nasconde i dettagli implementativi dietro un'interfaccia semplice.
- **Metodo** — funzione definita dentro una classe, che opera sugli attributi dell'oggetto.
- **Rollback** — operazione che annulla le modifiche non ancora confermate su un database.
- **Transazione** — insieme di operazioni sul database che deve completarsi interamente o essere annullato.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: è buona pratica aprire una nuova connessione al database a ogni metodo della classe.
`Falso — la connessione va aperta una sola volta nel costruttore e riutilizzata in tutti i metodi.`

**2.** Quale metodo speciale di una classe Python viene eseguito automaticamente alla creazione di un oggetto?
- a) `__init__` ✅
- b) `__main__`
- c) `__self__`
- d) `__new__`

**3.** A cosa serve `rollback()`?
`Ad annullare le modifiche al database non ancora confermate con commit(), riportandolo allo stato precedente.`

**4.** Vero o Falso: un blocco `try/except` interrompe comunque l'intero programma in caso di errore.
`Falso — permette di gestire l'errore in modo controllato, senza bloccare il resto del programma.`

**5.** Perché è utile che un metodo come `aggiungi_studente()` restituisca `True` o `False`?
`Perché chi chiama il metodo può sapere se l'operazione è andata a buon fine, senza dover leggere l'output stampato.`

**6.** Quale principio OOP descrive il fatto di nascondere i dettagli SQL dietro metodi con nomi chiari come `ottieni_studenti()`?
- a) Ereditarietà
- b) Polimorfismo
- c) Incapsulamento ✅
- d) Astrazione dei dati primitivi

**7.** Vero o Falso: `self` all'interno di una classe fa riferimento all'oggetto specifico su cui il metodo è stato chiamato.
`Vero.`

**8.** In quale momento è corretto chiudere la connessione aperta da un oggetto `DbManager`?
`Quando il lavoro con il database è concluso, chiamando un metodo dedicato come chiudi_connessione().`

**9.** Cosa succede se un metodo esegue un `INSERT` senza avvolgerlo in un `try/except`?
`Se la query genera un errore, il programma si interrompe con un traceback tecnico, senza gestione controllata.`

**10.** Vero o Falso: organizzare il codice di accesso al database in una classe riduce la duplicazione del codice.
`Vero — la logica di connessione e le query vengono scritte una sola volta, dentro la classe, e riutilizzate ovunque serva.`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "La mia classe DbManager"**

Riprendi il contesto scelto nei moduli precedenti (registro scolastico, registro spese o elenco contatti) e costruisci una classe dedicata (es. `GestoreSpese`, `GestoreContatti`), seguendo lo schema del laboratorio:

1. Scrivi il **costruttore** (`__init__`) che apre la connessione e crea la tabella se non esiste già.
2. Implementa **almeno quattro metodi**: uno per ciascuna operazione CRUD (Create, Read, Update, Delete), con nomi chiari e coerenti con il tuo dominio.
3. Avvolgi **tutte** le operazioni di scrittura in blocchi `try/except`, con `rollback()` in caso di errore.
4. Aggiungi un metodo `chiudi_connessione()` e usalo correttamente al termine del notebook.
5. Dimostra il funzionamento della classe con almeno 5 chiamate ai suoi metodi, inclusa **una situazione di errore gestita correttamente** (es. un dato obbligatorio mancante).

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet "Dallo script alla classe: la struttura di un DbManager"
- 📊 Schema visivo del ciclo `try / except / commit / rollback`
- 📝 Template di classe `DbManager` vuota, pronta da completare con i propri metodi

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Downey, A. — *Think Python: How to Think Like a Computer Scientist* (capitoli su classi e oggetti)
- Date, C. J. — *An Introduction to Database Systems* (capitoli su transazioni e integrità)

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Python — Classi (tutorial ufficiale)
- Documentazione ufficiale Python — modulo `sqlite3`, gestione delle eccezioni e delle transazioni

[🔙 Torna all'indice del modulo](#indice-modulo)