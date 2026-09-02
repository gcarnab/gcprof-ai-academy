<a id="indice-modulo"></a>
# Modulo 4: Manipolare i Dati (DML)
*Fase 2 — SQL e SQLite — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Nel Modulo 3 hai progettato lo **schema** del tuo primo database SQLite: tabelle con campi ben definiti e vincoli che ne garantiscono la qualità. Ma una tabella appena creata è vuota: uno scheletro pronto ad accogliere dati, ma senza ancora contenuto reale.

Questo modulo è dedicato al **DML** (*Data Manipulation Language*), il sottolinguaggio SQL che fa "vivere" un database: i comandi `INSERT`, `UPDATE` e `DELETE`, che inseriscono, modificano e cancellano record. Sono, in altre parole, la versione SQL delle operazioni CRUD che hai già incontrato nel Modulo 2 con Google Sheets — solo che ora, grazie ai vincoli definiti nel Modulo 3, il database stesso si rifiuterà di accettare dati scorretti.

Affronteremo anche un tema cruciale per qualunque sviluppatore, a prescindere dal linguaggio: la **sicurezza** delle query, imparando a riconoscere ed evitare la **SQL Injection**, uno degli errori di programmazione più diffusi e pericolosi nella storia del software. E chiuderemo il modulo comprendendo cosa significa davvero "salvare" una modifica su un database, attraverso il concetto di **transazione**.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Descrivere il **ciclo di vita del dato** all'interno di un database, dall'inserimento alla cancellazione.
- Scrivere ed eseguire comandi `INSERT` per aggiungere nuovi record.
- Scrivere ed eseguire comandi `UPDATE` per modificare record esistenti, in modo mirato e sicuro.
- Scrivere ed eseguire comandi `DELETE` per rimuovere record, evitando cancellazioni indesiderate.
- Usare le **query parametrizzate** con il segnaposto `?`, invece di costruire comandi SQL concatenando stringhe.
- Spiegare che cos'è la **SQL Injection** e perché le query parametrizzate la prevengono.
- Usare correttamente `commit()` e comprendere il concetto di **transazione**.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** aver completato il Modulo 3 (connessione, cursore, `CREATE TABLE`, vincoli di integrità) e avere già un database SQLite con almeno una tabella, come quello creato nel relativo project work.
- **Non serve:** nessuna conoscenza pregressa di sicurezza informatica: il concetto di SQL Injection viene introdotto da zero, con un esempio pratico e concreto.

> 💡 **Nota per il docente:** la parte sulla SQL Injection è un ottimo spunto interdisciplinare con l'educazione civica digitale: mostra, con un esempio concreto e alla portata di uno studente, perché la sicurezza informatica riguardi scelte di programmazione quotidiane, non solo esperti di cybersecurity.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Il ciclo di vita del dato

Ogni informazione conservata in un database attraversa, tipicamente, quattro fasi: viene **creata** (inserita per la prima volta), viene **letta** più volte nel tempo, può essere **aggiornata** quando cambia, e infine — quando non serve più — viene **cancellata**. Questo percorso è esattamente il CRUD già incontrato nel Modulo 2, ma qui lo affrontiamo con gli strumenti nativi di SQL, molto più potenti e sicuri di una semplice API come `gspread`.

Capire questo ciclo aiuta a progettare codice più consapevole: sapere fin da subito che un dato oggi inserito potrà, in futuro, dover essere corretto o rimosso, ti porta a scrivere query mirate (che agiscono su un solo record alla volta, individuato con precisione) invece che generiche.

*Perché ti serve: nei prossimi moduli, e soprattutto nel project work finale, ogni funzionalità che costruirai (aggiungere uno studente, correggere un voto, eliminare una spesa) sarà, in fondo, una tappa di questo stesso ciclo.*

### 4.2 Il comando `INSERT`

Il comando `INSERT INTO` aggiunge un nuovo record a una tabella, specificando i campi da valorizzare e i rispettivi valori:

```sql
INSERT INTO studenti (nome, cognome, email, eta)
VALUES ('Marco', 'Rossi', 'marco.rossi@email.it', 18);
```

Nota che il campo `id`, definito come `PRIMARY KEY AUTOINCREMENT` nel Modulo 3, non va indicato: sarà SQLite stesso a generarlo automaticamente.

### 4.3 Il comando `UPDATE`

Il comando `UPDATE` modifica il valore di uno o più campi in record già esistenti. È **fondamentale** accompagnarlo sempre a una clausola `WHERE`, che indica *quali* record modificare:

```sql
UPDATE studenti
SET eta = 19
WHERE id = 1;
```

*Perché ti serve: un `UPDATE` senza `WHERE` modifica **tutti** i record della tabella, senza eccezioni — uno degli errori più pericolosi e comuni in assoluto, che approfondiremo nella sezione Errori comuni.*

### 4.4 Il comando `DELETE`

Il comando `DELETE FROM` rimuove uno o più record da una tabella, anch'esso quasi sempre accompagnato da una clausola `WHERE`, per evitare di cancellare l'intero contenuto della tabella per errore:

```sql
DELETE FROM studenti
WHERE id = 3;
```

A differenza di `DROP TABLE` (che vedrai più avanti nel corso e che elimina l'intera tabella, struttura compresa), `DELETE` rimuove solo i record indicati, lasciando intatta la struttura della tabella.

### 4.5 Query parametrizzate con `?`

Fino a questo punto abbiamo scritto i valori direttamente dentro la stringa SQL. Questo approccio funziona per esempi statici, ma diventa **pericoloso** non appena i valori provengono da un input esterno (una casella di testo, un form, un file caricato dall'utente).

La soluzione è la **query parametrizzata**: nella stringa SQL si inserisce un segnaposto `?` al posto del valore, e si passa il valore vero separatamente, come secondo argomento di `execute()`:

```python
cursore.execute(
    "INSERT INTO studenti (nome, cognome, email, eta) VALUES (?, ?, ?, ?)",
    ("Giulia", "Bianchi", "giulia.bianchi@email.it", 17)
)
```

`sqlite3` si occupa da solo di inserire il valore nella query, in modo sicuro, "sanificando" automaticamente qualunque carattere pericoloso possa contenere.

*Perché ti serve: da questo momento in poi, in tutto il corso, ogni valore che proviene da una variabile Python (specialmente se inserito da un utente tramite interfaccia, come vedrai nel Modulo 9) andrà sempre passato con `?`, mai concatenato direttamente nella stringa SQL.*

### 4.6 SQL Injection: che cos'è e perché evitarla

La **SQL Injection** è una tecnica con cui un utente malintenzionato inserisce, in un campo di input pensato per un valore normale (es. un nome), del codice SQL vero e proprio, con l'obiettivo di alterare il comportamento della query originale.

Un esempio classico: se un programma costruisse una query concatenando direttamente il testo inserito dall'utente...

```python
# ⚠️ ESEMPIO DI CODICE NON SICURO — solo a scopo didattico, da non usare mai
nome_inserito = "Marco'; DELETE FROM studenti; --"
query_pericolosa = f"SELECT * FROM studenti WHERE nome = '{nome_inserito}'"
```

...il testo inserito potrebbe "rompere" la struttura prevista della query e far eseguire al database comandi non voluti, come la cancellazione di un'intera tabella.

Le **query parametrizzate** viste al punto 4.5 prevengono completamente questo problema: il valore passato con `?` viene sempre trattato come un semplice dato, mai come codice SQL da eseguire.

*Perché ti serve: la SQL Injection è tra le vulnerabilità più sfruttate nella storia dell'informatica, ancora oggi. Adottare fin da ora, per abitudine, le query parametrizzate ti mette al riparo da questo problema in ogni progetto futuro, non solo in questo corso.*

### 4.7 `commit()` e il concetto di transazione

Quando esegui un comando `INSERT`, `UPDATE` o `DELETE`, la modifica non viene salvata immediatamente e in modo permanente sul file di database: resta inizialmente "in sospeso", in una **transazione** aperta. Solo chiamando `connessione.commit()` la modifica diventa definitiva.

Questo comportamento non è un dettaglio tecnico marginale: è ciò che garantisce che un gruppo di operazioni collegate tra loro (es. scalare una quantità da un magazzino *e* registrare una vendita) vada a buon fine **insieme**, oppure non venga applicato affatto — evitando che il database resti in uno stato incoerente a metà tra le due operazioni.

Se, per qualunque motivo, si vuole annullare tutte le modifiche non ancora confermate, si usa `connessione.rollback()`, che riporta il database allo stato dell'ultimo `commit()`.

*Perché ti serve: capire la differenza tra "eseguire" un comando ed "eseguire e confermare" un comando è ciò che distingue chi sa solo scrivere SQL da chi sa gestire dati in modo affidabile. Approfondiremo le transazioni e le proprietà ACID nel Modulo 11.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** correggere il voto di uno studente dopo un ricorso è un `UPDATE` mirato su un singolo record (`WHERE id = ...`); inserire un nuovo studente trasferito è un `INSERT`; rimuovere uno studente che ha cambiato scuola è un `DELETE`.
- **In un'azienda (indirizzo AFM/Finanza):** registrare una nuova spesa aziendale è un `INSERT`; correggere l'importo di una spesa inserita per errore è un `UPDATE`; eliminare una spesa duplicata è un `DELETE` — tutte operazioni quotidiane in qualunque gestionale contabile.
- **Nel marketing e nelle relazioni internazionali (indirizzo RIM):** un modulo web di contatto che inserisce un nuovo cliente nel database è un caso reale in cui, senza query parametrizzate, un utente malintenzionato potrebbe tentare una SQL Injection scrivendo codice SQL invece del proprio nome.
- **Transazione nella pratica:** un trasferimento tra due conti bancari richiede due operazioni collegate (sottrarre da un conto, aggiungere all'altro): se una delle due fallisse senza una transazione a proteggerle, il denaro potrebbe "sparire" o "duplicarsi" — da qui l'importanza del `commit()` di gruppo.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: inserire, modificare e cancellare dati in sicurezza**

Apri il notebook del Modulo 3 (o creane uno nuovo collegato allo stesso file `scuola.db`) e prova, in ordine, i seguenti blocchi di codice.

**Passo 1 — Ricolleghiamoci al database esistente**

```python
from google.colab import drive
import sqlite3

drive.mount('/content/drive')

percorso_db = '/content/drive/MyDrive/Colab Notebooks/DATABASE/scuola.db'
connessione = sqlite3.connect(percorso_db)
cursore = connessione.cursor()

print("Ricollegati al database 'scuola.db'!")
```

**Passo 2 — Inseriamo record con `INSERT` e query parametrizzate**

```python
# Definiamo una lista di studenti da inserire, come lista di tuple
nuovi_studenti = [
    ("Marco", "Rossi", "marco.rossi@email.it", 18),
    ("Giulia", "Bianchi", "giulia.bianchi@email.it", 17),
    ("Luca", "Verdi", "luca.verdi@email.it", 16),
]

# executemany() esegue lo stesso comando per ogni tupla della lista: comodo per inserimenti multipli
cursore.executemany(
    "INSERT INTO studenti (nome, cognome, email, eta) VALUES (?, ?, ?, ?)",
    nuovi_studenti
)

# Confermiamo le modifiche in modo permanente
connessione.commit()

print(f"{cursore.rowcount} studenti inseriti correttamente!")
```

**Passo 3 — Leggiamo i record appena inseriti (anticipazione del Modulo 5)**

```python
cursore.execute("SELECT * FROM studenti;")
for riga in cursore.fetchall():
    print(riga)
```

**Passo 4 — Modifichiamo un record con `UPDATE`, sempre con `WHERE`**

```python
nuova_eta = 19
id_da_modificare = 1

# Anche qui usiamo query parametrizzate, anche per il valore usato nel WHERE
cursore.execute(
    "UPDATE studenti SET eta = ? WHERE id = ?",
    (nuova_eta, id_da_modificare)
)
connessione.commit()

print(f"Righe modificate: {cursore.rowcount}")
```

**Passo 5 — Verifichiamo l'effetto di un `WHERE` mancante (solo a scopo didattico)**

```python
# ⚠️ Eseguiamo questo comando SOLO per capire il rischio, non come buona pratica.
# Aggiungiamo prima una colonna "note" di prova per non toccare dati già usati
cursore.execute("ALTER TABLE studenti ADD COLUMN note TEXT;")
connessione.commit()

# UPDATE senza WHERE: modifica TUTTI i record della tabella
cursore.execute("UPDATE studenti SET note = 'controllato';")
connessione.commit()

cursore.execute("SELECT id, nome, note FROM studenti;")
print("Tutti i record ora hanno la stessa nota, perché mancava il WHERE:")
for riga in cursore.fetchall():
    print(riga)
```

**Passo 6 — Cancelliamo un record con `DELETE`, con `WHERE` mirato**

```python
id_da_cancellare = 3

cursore.execute(
    "DELETE FROM studenti WHERE id = ?",
    (id_da_cancellare,)
)
connessione.commit()

print(f"Righe cancellate: {cursore.rowcount}")

# Verifichiamo il risultato finale
cursore.execute("SELECT * FROM studenti;")
for riga in cursore.fetchall():
    print(riga)

connessione.close()
```

Al termine di questo laboratorio avrai inserito, modificato e cancellato dati reali nel tuo database SQLite, avrai toccato con mano il rischio di un `UPDATE` senza `WHERE`, e avrai usato in modo sistematico le query parametrizzate.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Usa **sempre** query parametrizzate con `?` per qualsiasi valore che proviene da una variabile Python, mai concatenazione di stringhe: è la difesa principale contro la SQL Injection.
- ✅ Accompagna **sempre** `UPDATE` e `DELETE` con una clausola `WHERE` mirata (tipicamente sulla chiave primaria), a meno che tu non voglia intenzionalmente agire su tutta la tabella.
- ✅ Prima di eseguire un `UPDATE` o `DELETE` "a rischio", esegui prima una `SELECT` con la stessa condizione `WHERE`, per verificare quali record verrebbero coinvolti.
- ✅ Usa `executemany()` quando devi inserire più record con la stessa struttura: è più efficiente e leggibile di un ciclo con `execute()` ripetuto.
- ✅ Chiama `commit()` subito dopo un gruppo di operazioni collegate tra loro, non alla fine di lunghe sequenze di comandi scollegati: rende più facile ragionare su cosa è stato effettivamente salvato.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Costruire la query con f-string o `+` è comodo, va bene comunque."* → È proprio questa pratica ad aprire la porta alla SQL Injection: qualunque valore che proviene dall'esterno va sempre passato con `?`, mai concatenato nella stringa SQL.
- ❌ *"Un `UPDATE` o `DELETE` senza `WHERE` agisce solo sull'ultimo record inserito."* → Senza `WHERE`, il comando agisce su **tutti** i record della tabella, senza eccezioni: è uno degli errori più distruttivi e comuni tra chi inizia con SQL.
- ❌ *"Dopo `execute()`, la modifica è già salvata in modo permanente."* → Senza una successiva chiamata a `commit()`, la modifica resta in una transazione aperta e può andare persa se la connessione si chiude prima.
- ❌ *"Le query parametrizzate rallentano il codice, meglio evitarle per query semplici."* → Il costo in termini di prestazioni è trascurabile, mentre il beneficio in sicurezza è enorme: non esiste un caso in cui valga la pena rinunciarvi.
- ❌ *"`DELETE FROM tabella` e `DROP TABLE tabella` fanno la stessa cosa."* → `DELETE` rimuove i record ma lascia intatta la struttura della tabella; `DROP TABLE` elimina l'intera tabella, struttura compresa: sono comandi molto diversi.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| DML | Sottolinguaggio SQL per inserire, modificare e cancellare dati |
| `INSERT` | Comando che aggiunge un nuovo record a una tabella |
| `UPDATE` | Comando che modifica uno o più campi di record esistenti |
| `DELETE` | Comando che rimuove uno o più record da una tabella |
| Query parametrizzata | Query SQL con segnaposto `?`, valori passati separatamente |
| SQL Injection | Tecnica di attacco che inserisce codice SQL in un input non protetto |
| `commit()` | Rende permanenti, sul file di database, le modifiche eseguite |
| `rollback()` | Annulla le modifiche non ancora confermate con `commit()` |
| Transazione | Gruppo di operazioni che va a buon fine insieme, oppure per niente |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **`commit()`** — metodo della connessione che rende permanenti, sul file di database, le modifiche eseguite.
- **DML (Data Manipulation Language)** — sottolinguaggio SQL che comprende i comandi `INSERT`, `UPDATE`, `DELETE`.
- **`executemany()`** — metodo del cursore che esegue lo stesso comando SQL per più insiemi di valori.
- **Query parametrizzata** — query SQL in cui i valori vengono passati separatamente tramite segnaposto (`?`), invece di essere scritti direttamente nella stringa.
- **`rollback()`** — metodo della connessione che annulla le modifiche non ancora confermate con `commit()`.
- **`rowcount`** — attributo del cursore che indica quante righe sono state coinvolte dall'ultimo comando eseguito.
- **SQL Injection** — tecnica con cui un utente malintenzionato inserisce codice SQL in un campo di input non protetto, per alterare il comportamento di una query.
- **Transazione** — gruppo di una o più operazioni sul database che deve essere applicato interamente, oppure non essere applicato affatto.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: il comando `INSERT` richiede sempre di specificare anche il valore del campo `PRIMARY KEY AUTOINCREMENT`.
`Falso — quel valore viene generato automaticamente da SQLite e non va indicato.`

**2.** Quale comando SQL useresti per correggere l'importo di una spesa già registrata?
- a) `INSERT`
- b) `UPDATE` ✅
- c) `DELETE`
- d) `CREATE`

**3.** Vero o Falso: eseguire un `UPDATE` senza clausola `WHERE` modifica soltanto il primo record trovato nella tabella.
`Falso — modifica tutti i record della tabella, senza eccezioni.`

**4.** Che cosa si usa, all'interno di una query SQL eseguita da Python, per evitare di concatenare direttamente i valori nella stringa?
`Il segnaposto ? (query parametrizzata).`

**5.** Che cos'è la SQL Injection?
- a) Un comando SQL per inserire più record contemporaneamente
- b) Una tecnica di attacco che inserisce codice SQL in un input non protetto ✅
- c) Un errore di sintassi comune nei comandi `INSERT`
- d) Un tipo di vincolo di integrità

**6.** Vero o Falso: dopo aver eseguito `execute()` per un `INSERT`, la modifica è già salvata in modo permanente sul file di database.
`Falso — resta in sospeso in una transazione aperta finché non si chiama commit().`

**7.** Che differenza c'è tra `DELETE FROM tabella` e `DROP TABLE tabella`?
`DELETE rimuove i record ma lascia intatta la struttura della tabella; DROP TABLE elimina l'intera tabella, struttura compresa.`

**8.** Vero o Falso: `rollback()` rende permanenti le modifiche non ancora confermate.
`Falso — rollback() le annulla, riportando il database all'ultimo commit().`

**9.** Quale metodo del cursore useresti per inserire più record con la stessa struttura in un'unica chiamata?
- a) `insertmany()`
- b) `executemany()` ✅
- c) `bulk_insert()`
- d) `multi_execute()`

**10.** Metti in ordine cronologico corretto le seguenti fasi del ciclo di vita del dato: Aggiornamento, Creazione, Cancellazione, Lettura.
`Creazione → Lettura → Aggiornamento → Cancellazione`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "Il mio database prende vita"**

Riprendi il database SQLite progettato nel project work del Modulo 3 e popolalo con dati reali, usando esclusivamente comandi DML sicuri.

Per il contesto scelto:

1. Inserisci **almeno 6 record** nella tabella principale, usando `INSERT` con query parametrizzate (a scelta, con `execute()` ripetuto o `executemany()`).
2. Esegui **almeno due operazioni di `UPDATE`** su record diversi, ciascuna con una clausola `WHERE` mirata sulla chiave primaria, e verifica il risultato con una lettura.
3. Esegui **almeno una operazione di `DELETE`**, anch'essa con `WHERE` mirato, e verifica che il record sia stato effettivamente rimosso.
4. Scrivi una funzione Python che riceva i dati di un nuovo record come parametri e lo inserisca nella tabella in modo sicuro, gestendo la connessione e il `commit()` al suo interno.
5. Aggiungi un commento finale nel notebook che spiega, in 2-3 righe, perché le query parametrizzate sono importanti in questo contesto, anche se il progetto è solo didattico.

Questo project work, insieme a quello dei Moduli 3 e 5, costituirà la consegna finale della **Fase 2** del corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet dei comandi DML (`INSERT`, `UPDATE`, `DELETE`) con sintassi ed esempi
- 📊 Schema riassuntivo "query sicura vs query pericolosa", a confronto (da produrre come infografica)
- 📝 Template di funzioni Python riutilizzabili per inserimento, modifica e cancellazione sicura di record

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Date, C. J. — *An Introduction to Database Systems*
- OWASP Foundation — *OWASP Top Ten* (sezione sulle vulnerabilità di tipo Injection)

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Python — modulo `sqlite3` (sezione su query parametrizzate)
- OWASP — pagina dedicata alla SQL Injection
- Documentazione ufficiale SQLite — sezione *INSERT*, *UPDATE*, *DELETE*

[🔙 Torna all'indice del modulo](#indice-modulo)