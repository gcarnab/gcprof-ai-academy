<a id="indice-modulo"></a>
# Modulo 7: Aggregazione e Statistiche
*Fase 3 — Relazioni e Architetture — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Nel Modulo 5 hai imparato a interrogare un database per estrarre righe specifiche. Ma spesso la domanda che ci interessa davvero non è "quali sono i record che soddisfano una condizione", bensì "quanti sono", "qual è la media", "qual è il totale". Sono domande di **sintesi**, e SQL ha una famiglia di strumenti dedicata proprio a questo: le **funzioni di aggregazione**.

In questo modulo imparerai a calcolare somme, medie, conteggi e valori estremi direttamente all'interno del database, senza dover scaricare tutti i dati in Python per elaborarli — un'operazione molto più efficiente, soprattutto su tabelle con migliaia di righe. Vedrai anche come **raggruppare** i dati con `GROUP BY` per ottenere statistiche per categoria (es. la media voti per ogni classe), come modificare lo schema di una tabella già esistente con `ALTER TABLE`, e come SQLite può garantire automaticamente la coerenza dei dati tra tabelle collegate grazie all'**integrità referenziale**.

Al termine di questo modulo, il tuo database non sarà più solo un archivio da consultare riga per riga: diventerà uno strumento capace di rispondere a domande di analisi, proprio come un vero cruscotto direzionale.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Usare le funzioni di aggregazione `COUNT`, `SUM`, `AVG`, `MIN` e `MAX` per calcolare statistiche di sintesi.
- Raggruppare i dati per categoria con `GROUP BY`, ottenendo una statistica per ciascun gruppo.
- Filtrare i gruppi ottenuti con `HAVING`, distinguendolo dal filtro `WHERE` sulle singole righe.
- Modificare lo schema di una tabella già esistente con `ALTER TABLE`, ad esempio aggiungendo una nuova colonna.
- Spiegare il concetto di integrità referenziale e usare `ON DELETE CASCADE` per mantenere coerenti dati collegati tra più tabelle.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** aver completato il Modulo 5 (interrogazione dei dati con `SELECT` e `WHERE`) e avere familiarità con la creazione di tabelle vista nel Modulo 3.
- **Non serve:** conoscere già in dettaglio le relazioni tra tabelle: in questo modulo introduciamo una semplice chiave esterna solo per l'esempio sull'integrità referenziale; l'argomento verrà approfondito nel Modulo 6.

> 💡 **Nota per il docente:** in SQLite, il controllo delle chiavi esterne non è attivo per impostazione predefinita: va abilitato esplicitamente con `PRAGMA foreign_keys = ON`, come mostrato nel Laboratorio.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Le funzioni di aggregazione: COUNT, SUM, AVG, MIN, MAX

Le **funzioni di aggregazione** prendono in input molte righe e restituiscono **un solo valore di sintesi**:

- **`COUNT(*)`**: conta il numero di righe.
- **`SUM(colonna)`**: somma i valori di una colonna numerica.
- **`AVG(colonna)`**: calcola la media dei valori di una colonna numerica.
- **`MIN(colonna)` / `MAX(colonna)`**: restituiscono il valore più piccolo/più grande di una colonna.

```sql
SELECT COUNT(*) FROM studenti;             -- quanti studenti ci sono in totale
SELECT AVG(media) FROM studenti;           -- la media generale della scuola
SELECT MAX(media) FROM studenti;           -- la media più alta registrata
```

*Perché ti serve: sono le stesse operazioni che faresti con Pandas (`.mean()`, `.sum()`...), ma calcolate direttamente dal motore del database, che è ottimizzato per farlo in modo molto più efficiente su grandi quantità di dati.*

### 4.2 Raggruppare i dati con GROUP BY

Spesso una statistica non interessa sull'intera tabella, ma **per categoria**: la media voti di ogni singola classe, il totale spese per ciascuna categoria, il numero di contatti per ogni paese. La clausola `GROUP BY` fa esattamente questo: divide le righe in gruppi in base al valore di una colonna, e applica la funzione di aggregazione a ciascun gruppo separatamente.

```sql
SELECT classe, AVG(media) FROM studenti GROUP BY classe;
-- restituisce una riga per ogni classe, con la sua media
```

*Perché ti serve: `GROUP BY` è probabilmente la clausola più potente per trasformare dati grezzi in report utili — pensa alla differenza tra "conosco tutti i voti" e "so qual è la classe con la media più alta".*

### 4.3 Filtrare i gruppi con HAVING

`WHERE`, come visto nel Modulo 5, filtra le **singole righe prima** di essere raggruppate. Se invece vogliamo filtrare in base al risultato dell'aggregazione (es. "solo le classi con più di 5 studenti"), serve la clausola `HAVING`, che agisce **dopo** il raggruppamento:

```sql
SELECT classe, COUNT(*) AS numero_studenti
FROM studenti
GROUP BY classe
HAVING COUNT(*) > 5;
```

*Perché ti serve: è un errore comune confondere `WHERE` e `HAVING` — capire quando si applicano (prima o dopo il raggruppamento) evita bug difficili da individuare nelle query più complesse.*

### 4.4 Modificare uno schema esistente con ALTER TABLE

Un database, come un progetto software, evolve nel tempo: capita spesso di dover aggiungere una nuova colonna a una tabella già esistente e già popolata di dati. Il comando `ALTER TABLE` permette di farlo senza dover ricreare la tabella da zero:

```sql
ALTER TABLE studenti ADD COLUMN email TEXT;
-- aggiunge una nuova colonna "email", inizialmente vuota (NULL) per le righe esistenti
```

*Perché ti serve: nella pratica, i requisiti di un progetto cambiano quasi sempre in corsa; sapere come far evolvere uno schema esistente, senza perdere i dati già presenti, è un'abilità fondamentale.*

### 4.5 Integrità referenziale e ON DELETE CASCADE

Quando due tabelle sono collegate da una chiave esterna (come vedrai in dettaglio nel Modulo 6), si pone un problema: cosa deve succedere ai record collegati quando il record "principale" viene cancellato? Ad esempio, se elimino uno studente, cosa succede ai suoi voti registrati in un'altra tabella?

SQLite offre alcune strategie, la più comune è `ON DELETE CASCADE`: cancellando un record nella tabella principale, vengono automaticamente cancellati **a cascata** anche tutti i record collegati nella tabella secondaria, mantenendo il database sempre coerente, senza lasciare "record orfani".

```sql
FOREIGN KEY (studente_id) REFERENCES studenti(id) ON DELETE CASCADE
```

*Perché ti serve: senza questa garanzia, un database può facilmente riempirsi di dati "orfani" (voti collegati a studenti che non esistono più), un problema di integrità molto comune e difficile da individuare in progetti reali.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** calcolare, con un'unica query `GROUP BY classe`, la media voti di ogni classe dell'istituto, invece di scaricare tutti i voti e calcolarla a mano in Python.
- **In un'azienda (indirizzo AFM/Finanza):** sommare le spese `GROUP BY categoria` per ottenere in un colpo solo il totale speso per "Trasporti", "Materiali", "Marketing", pronto per un report di bilancio.
- **Nel marketing e RIM:** contare i contatti `GROUP BY paese` per capire da quali mercati arriva la maggior parte dei lead raccolti a una fiera internazionale.
- **`ALTER TABLE` nella pratica:** un registro contatti nato senza il campo "telefono" a cui, mesi dopo, va aggiunta questa colonna senza perdere i contatti già inseriti.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: dalle statistiche di base all'integrità referenziale**

Esegui i seguenti blocchi di codice in ordine, su un nuovo notebook Google Colab.

**Passo 1 — Prepariamo il database di esempio**

```python
import sqlite3
import pandas as pd

# Ci colleghiamo al database (creandolo se non esiste)
connessione = sqlite3.connect("scuola_aggregazioni.db")
cursore = connessione.cursor()

# Abilitiamo il controllo delle chiavi esterne: in SQLite NON è attivo di default
cursore.execute("PRAGMA foreign_keys = ON")

# Creiamo la tabella studenti, se non esiste già
cursore.execute("""
    CREATE TABLE IF NOT EXISTS studenti (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cognome TEXT NOT NULL,
        classe TEXT,
        media REAL
    )
""")

# Ripartiamo puliti per poter rieseguire il notebook più volte
cursore.execute("DELETE FROM studenti")

studenti_esempio = [
    ("Marco", "Rossi", "3A", 7.2),
    ("Giulia", "Bianchi", "4B", 8.5),
    ("Luca", "Verdi", "3A", 6.1),
    ("Sofia", "Neri", "3A", 9.0),
    ("Alessandro", "Ricci", "4B", 7.8),
    ("Elena", "Romano", "4B", 8.1),
    ("Davide", "Ferrari", "2C", 6.5),
]
cursore.executemany(
    "INSERT INTO studenti (nome, cognome, classe, media) VALUES (?, ?, ?, ?)",
    studenti_esempio
)
connessione.commit()
print("Database pronto con", len(studenti_esempio), "studenti.")
```

**Passo 2 — Le prime funzioni di aggregazione**

```python
# COUNT(*): quanti studenti ci sono in totale
cursore.execute("SELECT COUNT(*) FROM studenti")
totale_studenti = cursore.fetchone()[0]   # fetchone() restituisce una tupla: prendiamo il primo valore
print(f"Numero totale di studenti: {totale_studenti}")

# AVG(media): la media generale della scuola
cursore.execute("SELECT AVG(media) FROM studenti")
media_generale = cursore.fetchone()[0]
print(f"Media generale: {media_generale:.2f}")

# MIN e MAX in un'unica query
cursore.execute("SELECT MIN(media), MAX(media) FROM studenti")
minimo, massimo = cursore.fetchone()
print(f"Media più bassa: {minimo} - Media più alta: {massimo}")
```

**Passo 3 — Raggruppare con GROUP BY: la media per ogni classe**

```python
# Una riga di risultato per ogni classe, con conteggio e media calcolati automaticamente
cursore.execute("""
    SELECT classe, COUNT(*) AS numero_studenti, AVG(media) AS media_classe
    FROM studenti
    GROUP BY classe
    ORDER BY media_classe DESC
""")

print("Statistiche per classe:")
for riga in cursore.fetchall():
    classe, numero, media = riga
    print(f"Classe {classe}: {numero} studenti, media {media:.2f}")
```

**Passo 4 — Filtrare i gruppi con HAVING**

```python
# Vogliamo solo le classi con ALMENO 3 studenti: il filtro si applica DOPO il raggruppamento
cursore.execute("""
    SELECT classe, COUNT(*) AS numero_studenti
    FROM studenti
    GROUP BY classe
    HAVING COUNT(*) >= 3
""")

print("Classi con almeno 3 studenti:")
for riga in cursore.fetchall():
    print(riga)
```

**Passo 5 — Modificare lo schema con ALTER TABLE**

```python
# Aggiungiamo una nuova colonna "email" alla tabella già esistente e popolata
# Usiamo try/except perché ALTER TABLE genera un errore se la colonna esiste già
try:
    cursore.execute("ALTER TABLE studenti ADD COLUMN email TEXT")
    connessione.commit()
    print("Colonna 'email' aggiunta con successo.")
except sqlite3.OperationalError as errore:
    print(f"La colonna probabilmente esiste già: {errore}")

# Verifichiamo con Pandas che la nuova colonna sia presente (sarà vuota/NULL per i record esistenti)
df = pd.read_sql_query("SELECT * FROM studenti", connessione)
display(df)
```

**Passo 6 — Integrità referenziale: ON DELETE CASCADE in azione**

```python
# Creiamo una seconda tabella "voti", collegata a "studenti" tramite chiave esterna
# ON DELETE CASCADE: se uno studente viene eliminato, i suoi voti vengono eliminati automaticamente
cursore.execute("""
    CREATE TABLE IF NOT EXISTS voti (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studente_id INTEGER,
        materia TEXT,
        voto REAL,
        FOREIGN KEY (studente_id) REFERENCES studenti(id) ON DELETE CASCADE
    )
""")
connessione.commit()

# Inseriamo un voto collegato allo studente con id 1 (Marco Rossi)
cursore.execute(
    "INSERT INTO voti (studente_id, materia, voto) VALUES (?, ?, ?)",
    (1, "Matematica", 7.5)
)
connessione.commit()

# Verifichiamo che il voto sia presente
print("Voti prima della cancellazione:")
cursore.execute("SELECT * FROM voti")
print(cursore.fetchall())

# Eliminiamo lo studente con id 1: grazie a ON DELETE CASCADE, anche il suo voto sparisce
cursore.execute("DELETE FROM studenti WHERE id = 1")
connessione.commit()

print("\nVoti dopo la cancellazione dello studente collegato:")
cursore.execute("SELECT * FROM voti")
print(cursore.fetchall())   # la lista sarà vuota: il voto è stato eliminato automaticamente
```

Al termine del laboratorio saprai calcolare statistiche direttamente nel database, far evolvere uno schema esistente e garantire la coerenza dei dati tra tabelle collegate.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Calcola le statistiche direttamente in SQL (`COUNT`, `AVG`, `SUM`...) invece di scaricare tutti i dati e calcolarle in Python: è molto più efficiente, soprattutto su tabelle grandi.
- ✅ Ricorda sempre `PRAGMA foreign_keys = ON` all'inizio di ogni sessione SQLite: senza questa istruzione le chiavi esterne non vengono controllate.
- ✅ Usa `WHERE` per filtrare le righe **prima** del raggruppamento, `HAVING` per filtrare i gruppi **dopo** l'aggregazione.
- ✅ Prima di un `ALTER TABLE` su un database già in uso, valuta sempre l'impatto sulle applicazioni che leggono quella tabella.
- ✅ Usa `ON DELETE CASCADE` con consapevolezza: è comodo, ma cancella automaticamente dati collegati — assicurati che sia davvero il comportamento desiderato.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"`WHERE` e `HAVING` fanno la stessa cosa e sono intercambiabili."* → `WHERE` filtra le singole righe prima del raggruppamento; `HAVING` filtra i gruppi già aggregati. Usare `WHERE` con una funzione di aggregazione genera un errore.
- ❌ *"Le chiavi esterne in SQLite sono sempre controllate automaticamente."* → In SQLite il controllo va abilitato esplicitamente con `PRAGMA foreign_keys = ON` a ogni connessione.
- ❌ *"`ALTER TABLE` permette di modificare o rimuovere facilmente una colonna esistente."* → SQLite supporta pienamente l'aggiunta di colonne, ma la modifica o rimozione è limitata e più delicata: va pianificata con attenzione.
- ❌ *"`COUNT(*)` e `COUNT(colonna)` restituiscono sempre lo stesso risultato."* → `COUNT(*)` conta tutte le righe; `COUNT(colonna)` conta solo le righe in cui quella colonna non è `NULL`: possono differire.
- ❌ *"`ON DELETE CASCADE` è il comportamento predefinito quando si crea una chiave esterna."* → Senza specificarlo esplicitamente, il comportamento predefinito impedisce (o lascia invariata, a seconda dei casi) la cancellazione di un record con dati collegati, invece di propagarla.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| `COUNT(*)` | Conta il numero di righe |
| `SUM(colonna)` | Somma i valori di una colonna numerica |
| `AVG(colonna)` | Calcola la media di una colonna numerica |
| `MIN` / `MAX` | Restituiscono il valore minimo/massimo di una colonna |
| `GROUP BY` | Raggruppa le righe per categoria, applicando l'aggregazione a ciascun gruppo |
| `HAVING` | Filtra i gruppi già aggregati (a differenza di `WHERE`, che filtra le righe) |
| `ALTER TABLE` | Modifica lo schema di una tabella già esistente (es. aggiunta colonna) |
| `ON DELETE CASCADE` | Elimina automaticamente i record collegati quando il record principale viene cancellato |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **Funzione di aggregazione** — funzione SQL che sintetizza più righe in un unico valore (es. `AVG`, `SUM`).
- **`GROUP BY`** — clausola che raggruppa le righe in base al valore di una o più colonne.
- **`HAVING`** — clausola che filtra i gruppi ottenuti da `GROUP BY`, in base al risultato dell'aggregazione.
- **Integrità referenziale** — insieme di regole che garantiscono la coerenza dei dati collegati tra tabelle diverse.
- **`ON DELETE CASCADE`** — regola che propaga automaticamente la cancellazione ai record collegati da una chiave esterna.
- **Record orfano** — riga che fa riferimento, tramite chiave esterna, a un record che non esiste più.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: `AVG(media)` calcola la somma dei valori della colonna `media`, non la media.
`Falso — AVG calcola la media aritmetica; per la somma si usa SUM.`

**2.** Quale clausola raggruppa le righe di una tabella per categoria, applicando una funzione di aggregazione a ciascun gruppo?
- a) `WHERE`
- b) `ORDER BY`
- c) `GROUP BY` ✅
- d) `LIMIT`

**3.** Qual è la differenza principale tra `WHERE` e `HAVING`?
`WHERE filtra le singole righe prima del raggruppamento; HAVING filtra i gruppi già aggregati, dopo il GROUP BY.`

**4.** Vero o Falso: in SQLite, il controllo delle chiavi esterne è attivo per impostazione predefinita.
`Falso — va abilitato esplicitamente con PRAGMA foreign_keys = ON.`

**5.** Quale comando useresti per aggiungere una nuova colonna a una tabella già esistente?
- a) `UPDATE TABLE`
- b) `ALTER TABLE ... ADD COLUMN` ✅
- c) `CREATE COLUMN`
- d) `INSERT COLUMN`

**6.** Cosa succede a un record nella tabella `voti` collegato a uno studente eliminato, se la chiave esterna usa `ON DELETE CASCADE`?
`Viene eliminato automaticamente insieme allo studente, per mantenere la coerenza dei dati.`

**7.** Vero o Falso: `COUNT(*)` e `COUNT(colonna)` restituiscono sempre lo stesso risultato.
`Falso — COUNT(colonna) esclude le righe in cui quella colonna è NULL, COUNT(*) le conta tutte.`

**8.** Quale query restituisce solo le classi con più di 5 studenti?
`SELECT classe, COUNT(*) FROM studenti GROUP BY classe HAVING COUNT(*) > 5;`

**9.** Cosa rappresenta un "record orfano" in un database relazionale?
- a) Una riga senza valori nella colonna chiave primaria
- b) Una riga che fa riferimento, tramite chiave esterna, a un record che non esiste più ✅
- c) Una riga duplicata rispetto a un'altra
- d) Una riga con tutti i campi vuoti

**10.** Vero o Falso: le statistiche calcolate con `COUNT`, `SUM` e `AVG` direttamente in SQL sono generalmente più efficienti che scaricare tutti i dati e calcolarle in Python.
`Vero — il motore del database è ottimizzato per questo tipo di calcoli, specialmente su grandi quantità di dati.`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "Il cruscotto statistico del mio database"**

Riprendi il database costruito nei moduli precedenti (registro scolastico, registro spese o elenco contatti) e realizza un notebook che calcoli e presenti almeno **5 statistiche di sintesi** sui tuoi dati:

1. Almeno **due statistiche generali** (es. totale record, media/somma di una colonna numerica) usando `COUNT`, `SUM` o `AVG` senza raggruppamento.
2. Almeno **una statistica raggruppata** con `GROUP BY` su una colonna categorica del tuo dominio (es. classe, categoria di spesa, paese).
3. Almeno **un filtro sui gruppi** con `HAVING`, per isolare solo i gruppi rilevanti (es. categorie con più di N spese).
4. Aggiungi, con `ALTER TABLE`, **una nuova colonna** utile al tuo contesto (es. "note", "telefono") e verifica con una query che sia stata aggiunta correttamente.
5. **Facoltativo (per chi vuole approfondire):** crea una seconda tabella collegata con una chiave esterna e `ON DELETE CASCADE`, e dimostra il comportamento a cascata con un inserimento e una cancellazione.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet delle funzioni di aggregazione (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)
- 📊 Schema visivo "WHERE vs HAVING: dove si applica il filtro"
- 📝 Esempi pronti di `ALTER TABLE` e di chiavi esterne con `ON DELETE CASCADE`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Date, C. J. — *An Introduction to Database Systems* (capitoli su integrità referenziale)
- McKinney, W. — *Python for Data Analysis* (capitoli su aggregazione e `groupby`)

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale SQLite — funzioni di aggregazione
- Documentazione ufficiale SQLite — `ALTER TABLE`
- Documentazione ufficiale SQLite — vincoli di chiave esterna (`Foreign Key Support`)

[🔙 Torna all'indice del modulo](#indice-modulo)