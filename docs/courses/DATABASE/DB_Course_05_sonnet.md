<a id="indice-modulo"></a>
# Modulo 5: Interrogare i Dati (DQL)
*Fase 2 — SQL e SQLite — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Nei Moduli 3 e 4 hai imparato a progettare uno schema di database e a inserire, modificare e cancellare dati con i comandi DML. Ora il database contiene informazioni — ma per quale motivo raccogliamo dati, se non per poterli poi consultare in modo intelligente?

È qui che entra in gioco il **DQL**, il *Data Query Language*: l'insieme di comandi SQL dedicati esclusivamente a **interrogare** i dati, senza mai modificarli. Il protagonista assoluto di questo modulo è un solo comando — `SELECT` — ma è probabilmente il comando SQL più usato al mondo, e imparerai a padroneggiarlo in tutte le sue sfumature: filtrare righe specifiche, ordinare i risultati, limitarne il numero e trasformarli in tabelle Pandas pronte per un report.

Se il Modulo 4 ti ha insegnato a "far vivere" il database, questo modulo ti insegna a **farlo parlare** — a trasformare, ancora una volta, dati grezzi in informazioni utili, proprio come avevi imparato fin dal Modulo 1.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Scrivere query `SELECT` per estrarre tutte le colonne o solo quelle che ti servono.
- Filtrare i risultati con la clausola `WHERE`, usando operatori di confronto, `AND`/`OR` e `LIKE`.
- Ordinare i risultati con `ORDER BY`, in ordine crescente o decrescente.
- Limitare il numero di righe restituite con `LIMIT`.
- Distinguere e usare correttamente `fetchone()` e `fetchall()` per recuperare i risultati in Python.
- Convertire il risultato di una query SQL direttamente in un **DataFrame Pandas** con `pd.read_sql_query()`, per report chiari e professionali.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** aver completato i Moduli 3 e 4 (creazione dello schema con DDL e comandi DML), oppure avere già un database SQLite con almeno una tabella popolata.
- **Non serve:** conoscenze di SQL avanzato: il modulo introduce ogni clausola con esempi concreti, dalla più semplice alla più articolata.

> 💡 **Nota per il docente:** questo modulo può essere svolto anche in autonomia rispetto ai Moduli 3-4, purché gli studenti dispongano già di un database SQLite con dati di esempio: il Passo 1 del laboratorio predispone comunque una tabella pronta all'uso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Il comando SELECT: la sintassi base

`SELECT` è il comando con cui si chiede al database di restituire dei dati, senza modificarli in alcun modo — per questo si dice che DQL è un linguaggio "di sola lettura". La sintassi minima è:

```sql
SELECT colonna1, colonna2 FROM nome_tabella;
```

Per richiedere **tutte** le colonne di una tabella, senza doverle elencare una per una, si usa l'asterisco `*`:

```sql
SELECT * FROM nome_tabella;
```

*Perché ti serve: selezionare solo le colonne che ti servono davvero (invece di usare sempre `*`) rende le tue query più veloci e i risultati più leggibili — un'abitudine che apprezzerai quando le tabelle avranno decine di colonne.*

### 4.2 Filtrare i risultati con WHERE

La clausola `WHERE` permette di restituire solo le righe che soddisfano una condizione, esattamente come un filtro:

```sql
SELECT * FROM studenti WHERE classe = '3A';
```

Gli operatori di confronto più usati sono `=`, `!=` (o `<>`), `>`, `<`, `>=`, `<=`. Per condizioni multiple si combinano con `AND` (tutte le condizioni devono essere vere) e `OR` (basta che una sia vera):

```sql
SELECT * FROM studenti WHERE classe = '3A' AND media >= 7;
```

Per cercare un testo che contiene una certa sequenza di caratteri (anche parziale), si usa `LIKE` insieme al simbolo jolly `%`:

```sql
SELECT * FROM studenti WHERE cognome LIKE 'R%';  -- cognomi che iniziano per R
```

*Perché ti serve: `WHERE` è la clausola che trasforma un database da semplice archivio a strumento di analisi — è quella che userai più spesso in assoluto, in ogni progetto futuro.*

### 4.3 Ordinare i risultati con ORDER BY

`ORDER BY` ordina le righe restituite in base a una o più colonne. Di default l'ordine è crescente (`ASC`); per invertirlo si usa `DESC`:

```sql
SELECT * FROM studenti ORDER BY media DESC;  -- dal voto più alto al più basso
```

### 4.4 Limitare i risultati con LIMIT

Quando una tabella ha migliaia di righe, spesso interessano solo le prime N (es. la classifica dei primi 3). La clausola `LIMIT` fa esattamente questo, e si combina naturalmente con `ORDER BY`:

```sql
SELECT * FROM studenti ORDER BY media DESC LIMIT 3;  -- i 3 studenti con media più alta
```

### 4.5 fetchone() e fetchall(): recuperare i risultati in Python

Dopo aver eseguito una query con `cursor.execute()`, i risultati non sono ancora "arrivati" in Python: vanno recuperati esplicitamente con uno di questi due metodi:

- **`fetchone()`**: restituisce **una sola riga** (la successiva non ancora letta), oppure `None` se non ce ne sono più. Utile quando ti aspetti un solo risultato.
- **`fetchall()`**: restituisce **tutte** le righe rimanenti come lista di tuple. È il metodo più usato quando si vogliono elaborare più risultati insieme (es. con un ciclo `for`).

*Perché ti serve: capire la differenza tra "eseguire" una query ed "estrarne i risultati" è un concetto chiave del lavorare con database da codice, e vale per qualunque linguaggio di programmazione, non solo Python.*

### 4.6 Da SQL a Pandas: pd.read_sql_query()

Proprio come nel Modulo 2 avevi trasformato i dati di un Google Sheet in un DataFrame, ora puoi fare lo stesso direttamente da una query SQL, con una sola riga di codice:

```python
df = pd.read_sql_query("SELECT * FROM studenti", connessione)
```

Il risultato è un DataFrame Pandas pronto per l'analisi, con tutti i metodi che già conosci (`.mean()`, `.sort_values()`, `.groupby()`...). È il modo più rapido e professionale per passare da una query SQL a un report.

*Perché ti serve: `read_sql_query()` è il ponte tra il mondo dei database relazionali e quello dell'analisi dati in Python, e lo userai moltissimo nei moduli più avanzati del corso, in particolare nel Modulo 7 sulle aggregazioni.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** estrarre solo gli studenti di una classe con media superiore a 7, ordinati dal più bravo al meno bravo, per preparare una classifica di merito.
- **In un'azienda (indirizzo AFM/Finanza):** filtrare le spese superiori a una certa soglia con `WHERE importo > 500`, per individuare rapidamente le voci di spesa più rilevanti.
- **Nel marketing e RIM:** cercare tutti i contatti di un determinato paese con `WHERE paese = 'Germania'`, oppure tutte le aziende il cui nome contiene una parola chiave con `LIKE '%Tech%'`.
- **fetchone() in pratica:** verificare se un'email è già registrata in una tabella clienti, cercando una singola corrispondenza invece di scaricare tutta la tabella.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: dalla query al report Pandas**

Esegui i seguenti blocchi di codice in ordine, su un nuovo notebook Google Colab.

**Passo 1 — Prepariamo un database di esempio (in continuità con i Moduli 3-4)**

```python
# Importiamo il modulo sqlite3, incluso nella libreria standard di Python
import sqlite3
import pandas as pd

# Ci colleghiamo (o creiamo, se non esiste) il database "scuola.db"
connessione = sqlite3.connect("scuola.db")
cursore = connessione.cursor()

# Creiamo la tabella "studenti" solo se non esiste già (IF NOT EXISTS evita errori)
cursore.execute("""
    CREATE TABLE IF NOT EXISTS studenti (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cognome TEXT NOT NULL,
        eta INTEGER,
        classe TEXT,
        media REAL
    )
""")

# Svuotiamo la tabella per ripartire puliti (utile per rieseguire il notebook più volte)
cursore.execute("DELETE FROM studenti")

# Inseriamo alcuni record di esempio con executemany, utile per più righe insieme
studenti_esempio = [
    ("Marco", "Rossi", 16, "3A", 7.2),
    ("Giulia", "Bianchi", 17, "4B", 8.5),
    ("Luca", "Verdi", 15, "2C", 6.1),
    ("Sofia", "Neri", 16, "3A", 9.0),
    ("Alessandro", "Ricci", 17, "4B", 7.8),
    ("Elena", "Romano", 16, "3A", 8.1),
]
cursore.executemany(
    "INSERT INTO studenti (nome, cognome, eta, classe, media) VALUES (?, ?, ?, ?, ?)",
    studenti_esempio
)

# Confermiamo le modifiche sul database
connessione.commit()
print("Database pronto con", len(studenti_esempio), "studenti inseriti.")
```

**Passo 2 — Il primo SELECT: tutte le righe, tutte le colonne**

```python
# Eseguiamo la query più semplice possibile: tutti i dati della tabella
cursore.execute("SELECT * FROM studenti")

# fetchall() restituisce TUTTE le righe rimanenti come lista di tuple
risultati = cursore.fetchall()

# Stampiamo ogni riga: ognuna è una tupla (id, nome, cognome, eta, classe, media)
for riga in risultati:
    print(riga)
```

**Passo 3 — Selezionare solo alcune colonne**

```python
# Chiediamo solo nome, cognome e media, non tutte le colonne
cursore.execute("SELECT nome, cognome, media FROM studenti")

for riga in cursore.fetchall():
    # Spacchettiamo la tupla in tre variabili per un output più leggibile
    nome, cognome, media = riga
    print(f"{nome} {cognome} - Media: {media}")
```

**Passo 4 — Filtrare con WHERE**

```python
# Selezioniamo solo gli studenti della classe 3A con media almeno 8
cursore.execute("SELECT nome, cognome, media FROM studenti WHERE classe = '3A' AND media >= 8")

studenti_filtrati = cursore.fetchall()
print(f"Trovati {len(studenti_filtrati)} studenti:")
for riga in studenti_filtrati:
    print(riga)
```

**Passo 5 — Ordinare e limitare i risultati: la classifica dei primi 3**

```python
# ORDER BY media DESC ordina dal voto più alto al più basso
# LIMIT 3 restituisce solo le prime 3 righe del risultato ordinato
cursore.execute("""
    SELECT nome, cognome, media
    FROM studenti
    ORDER BY media DESC
    LIMIT 3
""")

print("🏆 Classifica dei primi 3 studenti per media:")
for posizione, riga in enumerate(cursore.fetchall(), start=1):
    nome, cognome, media = riga
    print(f"{posizione}. {nome} {cognome} - {media}")
```

**Passo 6 — fetchone() vs fetchall(): cercare un singolo record**

```python
# Cerchiamo un solo studente specifico: fetchone() restituisce una sola riga (o None)
cursore.execute("SELECT * FROM studenti WHERE cognome = 'Verdi'")
studente = cursore.fetchone()

if studente:
    print("Studente trovato:", studente)
else:
    print("Nessuno studente trovato con questo cognome.")
```

**Passo 7 — Dalla query al report Pandas**

```python
# read_sql_query esegue la query e restituisce DIRETTAMENTE un DataFrame Pandas
df = pd.read_sql_query("SELECT * FROM studenti ORDER BY media DESC", connessione)

# display() mostra il DataFrame in formato tabellare, ben leggibile su Colab
display(df)

# Ora possiamo usare tutti i metodi Pandas che già conosciamo dal Modulo 2
print(f"Media generale della scuola: {df['media'].mean():.2f}")
```

Al termine del laboratorio saprai scrivere query SQL mirate e trasformarle, con una sola riga, in report Pandas professionali.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Evita `SELECT *` nelle query definitive: elenca esplicitamente solo le colonne che ti servono, per query più chiare e veloci.
- ✅ Usa sempre le virgolette singole per i valori testuali nelle condizioni `WHERE` (es. `classe = '3A'`), mai per i numeri.
- ✅ Combina `ORDER BY` e `LIMIT` per estrarre in modo efficiente "i migliori N" o "i peggiori N" risultati, senza scaricare l'intera tabella.
- ✅ Usa `fetchone()` quando ti aspetti un solo risultato (es. la ricerca per una chiave unica), `fetchall()` quando ti aspetti più righe.
- ✅ Preferisci `pd.read_sql_query()` quando l'obiettivo finale è un'analisi o un report, invece di iterare manualmente sui risultati con `fetchall()`.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Con `WHERE nome = Marco` (senza virgolette) la query funziona comunque."* → I valori testuali richiedono sempre le virgolette singole (`'Marco'`); senza, SQLite interpreta `Marco` come il nome di una colonna e genera un errore.
- ❌ *"`fetchall()` dopo aver già chiamato `fetchall()` restituisce di nuovo tutti i risultati."* → Una volta letti, i risultati di un cursore non sono più disponibili: una seconda chiamata restituisce una lista vuota. Se servono di nuovo, va rieseguita la query.
- ❌ *"`ORDER BY media` ordina sempre dal valore più alto al più basso."* → Di default `ORDER BY` ordina in modo **crescente** (`ASC`); per il decrescente serve specificare `DESC`.
- ❌ *"`LIMIT` seleziona righe a caso."* → `LIMIT` restituisce sempre le **prime** righe nell'ordine in cui la query le presenta: senza un `ORDER BY`, quell'ordine non è garantito essere significativo.
- ❌ *"`SELECT *` è sempre la scelta più semplice e sicura."* → Selezionare tutte le colonne, anche quelle che non servono, rende le query più lente su tabelle grandi e i risultati meno leggibili.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| `SELECT` | Comando per interrogare (leggere) i dati, senza modificarli |
| `WHERE` | Filtra le righe restituite in base a una condizione |
| `AND` / `OR` | Combinano più condizioni in una clausola `WHERE` |
| `LIKE` + `%` | Cerca un testo che contiene una certa sequenza di caratteri |
| `ORDER BY` | Ordina i risultati (`ASC` crescente di default, `DESC` decrescente) |
| `LIMIT` | Restituisce solo le prime N righe del risultato |
| `fetchone()` | Recupera una sola riga di risultato (o `None`) |
| `fetchall()` | Recupera tutte le righe di risultato rimanenti, come lista di tuple |
| `pd.read_sql_query()` | Esegue una query e restituisce direttamente un DataFrame Pandas |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **DQL (Data Query Language)** — il sottoinsieme di SQL dedicato esclusivamente all'interrogazione (lettura) dei dati.
- **Clausola** — una parte della sintassi SQL con uno scopo specifico (es. `WHERE`, `ORDER BY`).
- **Cursore** — l'oggetto Python che esegue le query SQL e ne recupera i risultati.
- **Operatore di confronto** — simbolo usato per confrontare valori in una condizione (`=`, `>`, `<`, ecc.).
- **Wildcard (carattere jolly)** — simbolo che rappresenta una sequenza di caratteri variabile, come `%` in `LIKE`.
- **Query** — un'istruzione SQL inviata al database per leggere o modificare i dati.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: il comando `SELECT` può modificare i dati contenuti in una tabella.
`Falso — SELECT appartiene al DQL ed è di sola lettura: non modifica mai i dati.`

**2.** Quale clausola SQL useresti per restituire solo gli studenti con media superiore a 8?
- a) `ORDER BY media > 8`
- b) `WHERE media > 8` ✅
- c) `LIMIT media > 8`
- d) `FILTER media > 8`

**3.** Vero o Falso: `ORDER BY media` ordina i risultati dal valore più alto al più basso per impostazione predefinita.
`Falso — l'ordine predefinito è crescente (ASC); per il decrescente serve DESC.`

**4.** Quale metodo Python useresti per recuperare un solo record, ad esempio per verificare se un'email esiste già in una tabella?
- a) `fetchall()`
- b) `fetchmany()`
- c) `fetchone()` ✅
- d) `execute()`

**5.** Cosa fa la clausola `LIKE 'R%'` in una condizione `WHERE`?
`Cerca i valori testuali che iniziano con la lettera R, indipendentemente da cosa segue.`

**6.** Vero o Falso: `LIMIT 3` senza un `ORDER BY` garantisce sempre i 3 valori più alti di una colonna.
`Falso — senza ORDER BY, LIMIT restituisce le prime righe nell'ordine in cui la query le trova, non necessariamente le più alte.`

**7.** Quale funzione permette di trasformare direttamente il risultato di una query SQL in un DataFrame Pandas?
`pd.read_sql_query()`

**8.** Vero o Falso: in una condizione `WHERE`, i valori numerici vanno racchiusi tra virgolette come quelli testuali.
`Falso — le virgolette servono solo per i valori testuali (stringhe), non per i numeri.`

**9.** Come si combinano due condizioni in una clausola `WHERE`, quando entrambe devono essere vere contemporaneamente?
- a) `OR`
- b) `AND` ✅
- c) `LIKE`
- d) `LIMIT`

**10.** Vero o Falso: dopo aver già letto tutti i risultati con `fetchall()`, richiamare `fetchall()` una seconda volta restituisce di nuovo tutti i dati.
`Falso — restituisce una lista vuota: i risultati vanno riletti solo rieseguendo la query.`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "Interroga il tuo database"**

Riprendi il database SQLite costruito nei Moduli 3 e 4 (oppure quello preparato nel Passo 1 del laboratorio di questo modulo) e scrivi, in un unico notebook Colab, **almeno 5 query diverse** che rispondano a domande concrete sui tuoi dati. Ad esempio, in base al tuo contesto:

- 🎓 **Registro scolastico:** "Quali sono gli studenti con media superiore a 8?", "Chi sono i 3 studenti con la media più alta?", "Quanti studenti ci sono nella classe 3A?".
- 💰 **Registro spese:** "Quali spese superano i 100 euro?", "Quali sono le 5 spese più recenti?", "Quali spese riguardano la categoria 'Trasporti'?".
- 📇 **Elenco contatti:** "Quali contatti provengono dalla Francia?", "Quali aziende contengono la parola 'Group' nel nome?", "Chi sono i primi 3 contatti inseriti?".

Per ciascuna query:

1. Scrivi la query SQL commentata, spiegando in una riga cosa restituisce.
2. Esegui la query e stampa i risultati con `fetchall()` **oppure** mostrali come DataFrame con `pd.read_sql_query()`.
3. Includi **almeno una query** con `WHERE` e almeno una con `ORDER BY` + `LIMIT`.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet della sintassi `SELECT` (WHERE, ORDER BY, LIMIT, LIKE)
- 📊 Schema visivo "Dal comando SQL al DataFrame Pandas"
- 📝 Raccolta di query di esempio pronte da adattare ai tre contesti del corso

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Date, C. J. — *An Introduction to Database Systems*
- McKinney, W. — *Python for Data Analysis* (capitoli su integrazione Pandas/SQL)

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Python — modulo `sqlite3`
- Documentazione ufficiale SQLite — sintassi del comando `SELECT`
- Documentazione ufficiale Pandas — funzione `read_sql_query`

[🔙 Torna all'indice del modulo](#indice-modulo)