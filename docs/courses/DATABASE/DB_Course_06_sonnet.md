<a id="indice-modulo"></a>
# Modulo 6: Relazioni tra Tabelle
*Fase 3 — Relazioni e Architetture — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Fino a questo punto del corso hai lavorato con **tabelle singole**: studenti, spese, clienti. Ma il mondo reale raramente si lascia descrivere da una tabella isolata. Uno studente frequenta più materie; una materia è frequentata da più studenti. Un cliente effettua più ordini; un ordine appartiene a un solo cliente. Questi legami tra informazioni diverse sono **relazioni**, ed è proprio da qui che i database relazionali prendono il loro nome.

In questo modulo scoprirai perché provare a "schiacciare" tutte queste informazioni dentro un'unica, grande tabella porta inevitabilmente a **ridondanza** — dati ripetuti inutilmente, con il rischio di incoerenze — e come, invece, dividere le informazioni in più tabelle collegate tra loro renda il database più solido, più facile da mantenere e più fedele alla realtà che rappresenta.

Il collegamento tra tabelle avviene attraverso le **chiavi esterne** (`FOREIGN KEY`), e per recuperare informazioni che vivono in tabelle diverse ma collegate useremo il comando più potente incontrato finora: `INNER JOIN`. È il modulo che, più di ogni altro finora, ti farà "pensare relazionale".

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Riconoscere e progettare una relazione **Uno-a-Molti** tra due tabelle.
- Spiegare che cos'è la **ridondanza dei dati** e perché va evitata.
- Definire una **chiave esterna** (`FOREIGN KEY`) per collegare due tabelle tra loro.
- Descrivere, a un livello introduttivo, il concetto di **normalizzazione**.
- Scrivere query con `INNER JOIN` per interrogare più tabelle collegate contemporaneamente.
- Progettare un database "atomico", in cui ogni informazione vive nel posto giusto, senza duplicazioni inutili.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** aver completato i Moduli 3, 4 e 5 (creazione di tabelle con vincoli, `INSERT`/`UPDATE`/`DELETE`, e `SELECT` con `WHERE`/`ORDER BY`), e avere già un database SQLite funzionante con almeno una tabella popolata.
- **Non serve:** nessuna conoscenza pregressa di teoria delle basi di dati: i concetti di relazione e normalizzazione vengono introdotti in modo graduale e concreto.

> 💡 **Nota per il docente:** questo modulo apre la Fase 3 del corso ed è, dal punto di vista concettuale, il più delicato finora: è consigliabile insistere sugli esempi pratici (in particolare quello del Laboratorio) prima di formalizzare la terminologia, per far emergere il problema della ridondanza in modo naturale, prima ancora di nominarlo.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Relazioni Uno-a-Molti

Una relazione **Uno-a-Molti** (*one-to-many*) descrive una situazione in cui un singolo record di una tabella può essere collegato a **molti** record di un'altra tabella, ma non viceversa. È, di gran lunga, il tipo di relazione più comune nei database reali.

Esempio: un singolo studente può avere **molti** voti (uno per ogni materia, o più nel tempo), ma ogni singolo voto appartiene a **un solo** studente. La tabella "studenti" e la tabella "voti" sono quindi legate da una relazione Uno-a-Molti: uno studente, molti voti.

*Perché ti serve: individuare correttamente la direzione "uno" e la direzione "molti" di una relazione è il primo passo per capire in quale delle due tabelle inserire la chiave esterna, come vedrai al punto 4.4.*

### 4.2 Ridondanza dei dati e perché evitarla

Immagina di voler registrare, in un'unica tabella "voti", anche il nome e il cognome dello studente, ripetuti su ogni riga:

| id | nome | cognome | materia | voto |
|---|---|---|---|---|
| 1 | Marco | Rossi | Matematica | 7 |
| 2 | Marco | Rossi | Italiano | 8 |
| 3 | Marco | Rossi | Inglese | 6 |

Il nome e il cognome di Marco sono ripetuti su tre righe diverse: questa è **ridondanza dei dati**. Il problema non è solo lo spreco di spazio, ma la **fragilità**: se Marco cambiasse cognome (es. per un errore di trascrizione da correggere), bisognerebbe aggiornare **tutte** le righe che lo riguardano, con il rischio concreto di dimenticarne qualcuna e ottenere dati incoerenti tra loro.

*Perché ti serve: la ridondanza non è solo un problema "estetico": è la causa più comune di dati incoerenti in un database reale. Riconoscerla è il primo passo per evitarla fin dalla fase di progettazione.*

### 4.3 Separare le tabelle: la soluzione relazionale

La soluzione è dividere le informazioni in due tabelle distinte: una tabella `studenti`, dove ogni studente compare **una sola volta**, e una tabella `voti`, che fa riferimento allo studente non ripetendo nome e cognome, ma tramite il suo identificativo univoco (`id`):

```sql
-- Tabella studenti: ogni studente compare una sola volta
CREATE TABLE studenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cognome TEXT NOT NULL
);

-- Tabella voti: fa riferimento allo studente tramite il suo id
CREATE TABLE voti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materia TEXT NOT NULL,
    voto INTEGER NOT NULL,
    id_studente INTEGER
);
```

Ora il nome "Marco Rossi" esiste in un unico punto del database: se cambia, basta aggiornare una sola riga.

### 4.4 Chiavi esterne (`FOREIGN KEY`)

Una **chiave esterna** (`FOREIGN KEY`) è un campo che, in una tabella, fa riferimento alla **chiave primaria** di un'altra tabella, formalizzando così il collegamento tra le due. Nell'esempio precedente, il campo `id_studente` della tabella `voti` diventa una chiave esterna verso l'`id` della tabella `studenti`:

```sql
CREATE TABLE voti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materia TEXT NOT NULL,
    voto INTEGER NOT NULL,
    id_studente INTEGER NOT NULL,
    FOREIGN KEY (id_studente) REFERENCES studenti(id)
);
```

Da questo momento, il database stesso può rifiutare l'inserimento di un voto collegato a uno studente inesistente: è un ulteriore, potente vincolo di integrità, che si aggiunge a quelli già visti nel Modulo 3.

> ⚠️ **Nota tecnica:** in SQLite, il controllo delle chiavi esterne non è attivo per impostazione predefinita. Va abilitato a ogni connessione con il comando `PRAGMA foreign_keys = ON;`, come vedrai nel Laboratorio.

*Perché ti serve: la chiave esterna è il "filo" che tiene insieme un database relazionale. Da qui fino al project work finale, ogni volta che progetterai due tabelle collegate, ti chiederai: dove va la chiave esterna, e verso quale chiave primaria punta?*

### 4.5 Un primo sguardo alla normalizzazione

La **normalizzazione** è il processo con cui si organizza uno schema di database per minimizzare la ridondanza e massimizzare la coerenza dei dati, seguendo un insieme di regole progressive chiamate *forme normali*. È un argomento che, nella teoria completa, richiederebbe un intero corso a sé; in questo modulo ne cogliamo il principio guida essenziale, sufficiente per progettare bene database di media complessità.

La regola pratica più utile a questo livello è: **ogni informazione dovrebbe vivere in un solo posto**. Se ti accorgi di dover scrivere lo stesso dato (un nome, un prezzo, un indirizzo) su più righe della stessa tabella, è quasi sempre il segnale che quell'informazione andrebbe spostata in una tabella propria, collegata tramite chiave esterna.

*Perché ti serve: non useremo la terminologia formale delle forme normali (1NF, 2NF, 3NF) in questo corso, ma il principio "ogni informazione in un solo posto" ti guiderà in ogni progettazione futura, compreso il project work finale del Modulo 13.*

### 4.6 Interrogare più tabelle con `INNER JOIN`

Separare i dati in più tabelle risolve il problema della ridondanza, ma introduce una nuova domanda: come recupero, in un'unica query, il nome dello studente **insieme** ai suoi voti, se vivono in due tabelle diverse?

La risposta è il comando **`INNER JOIN`**, che unisce righe di due tabelle sulla base di una condizione di corrispondenza — tipicamente, l'uguaglianza tra chiave primaria e chiave esterna:

```sql
SELECT studenti.nome, studenti.cognome, voti.materia, voti.voto
FROM voti
INNER JOIN studenti ON voti.id_studente = studenti.id;
```

Questa query restituisce righe che combinano informazioni della tabella `studenti` e della tabella `voti`, come se fossero, temporaneamente, un'unica grande tabella — ma senza che i dati siano realmente duplicati nel database.

*Perché ti serve: `INNER JOIN` è probabilmente il comando SQL più usato in assoluto nei database relazionali reali, perché la maggior parte delle informazioni utili nasce proprio dall'incrocio di più tabelle collegate. Lo ritroverai in quasi ogni query del Modulo 7 in poi.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** una tabella `classi` e una tabella `studenti`, collegate da una chiave esterna `id_classe`, evitano di dover riscrivere il nome della classe su ogni singolo studente: se una classe cambia denominazione, si aggiorna una sola riga.
- **In un'azienda (indirizzo AFM/Finanza):** una tabella `categorie_spesa` (es. Trasporti, Materiali, Utenze) collegata a una tabella `spese` tramite `id_categoria` evita di ripetere il nome della categoria su ogni spesa, e permette in seguito (Modulo 7) di calcolare facilmente il totale speso per categoria.
- **Nel marketing e nelle relazioni internazionali (indirizzo RIM):** una tabella `clienti` e una tabella `ordini`, collegate da `id_cliente`, riflettono esattamente la realtà: un cliente può effettuare molti ordini nel tempo, ma ogni ordine appartiene a un solo cliente — un classico esempio di relazione Uno-a-Molti.
- **`INNER JOIN` nella pratica:** un report che elenca "nome cliente + prodotto ordinato + data" richiede quasi sempre un `INNER JOIN` tra almeno due tabelle: senza di esso, servirebbero query separate e un lavoro manuale di ricomposizione dei dati in Python.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: dalla ridondanza a un database relazionale con `INNER JOIN`**

Apri un nuovo notebook su Google Colab, dentro la cartella `DATABASE` del tuo Google Drive, e prova, in ordine, i seguenti blocchi di codice.

**Passo 1 — Colleghiamoci a un nuovo database e abilitiamo le chiavi esterne**

```python
from google.colab import drive
import sqlite3

drive.mount('/content/drive')

percorso_db = '/content/drive/MyDrive/Colab Notebooks/DATABASE/scuola_relazionale.db'
connessione = sqlite3.connect(percorso_db)
cursore = connessione.cursor()

# In SQLite il controllo delle chiavi esterne va abilitato esplicitamente, a ogni connessione
cursore.execute("PRAGMA foreign_keys = ON;")

print("Connessi, con controllo delle chiavi esterne attivo!")
```

**Passo 2 — Creiamo la tabella "principale" (il lato "Uno" della relazione)**

```python
cursore.execute("""
CREATE TABLE IF NOT EXISTS studenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cognome TEXT NOT NULL
);
""")
connessione.commit()

print("Tabella 'studenti' creata!")
```

**Passo 3 — Creiamo la tabella "collegata" (il lato "Molti"), con la chiave esterna**

```python
cursore.execute("""
CREATE TABLE IF NOT EXISTS voti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materia TEXT NOT NULL,
    voto INTEGER NOT NULL,
    id_studente INTEGER NOT NULL,
    FOREIGN KEY (id_studente) REFERENCES studenti(id)
);
""")
connessione.commit()

print("Tabella 'voti' creata, collegata a 'studenti' tramite chiave esterna!")
```

**Passo 4 — Popoliamo le due tabelle**

```python
studenti_da_inserire = [("Marco", "Rossi"), ("Giulia", "Bianchi")]
cursore.executemany(
    "INSERT INTO studenti (nome, cognome) VALUES (?, ?)",
    studenti_da_inserire
)
connessione.commit()

# Recuperiamo gli id appena assegnati automaticamente, leggendoli dalla tabella
cursore.execute("SELECT id, nome FROM studenti;")
print("Studenti inseriti:", cursore.fetchall())

# Inseriamo voti collegati a studenti esistenti (id 1 = Marco, id 2 = Giulia)
voti_da_inserire = [
    ("Matematica", 7, 1),
    ("Italiano", 8, 1),
    ("Inglese", 9, 2),
]
cursore.executemany(
    "INSERT INTO voti (materia, voto, id_studente) VALUES (?, ?, ?)",
    voti_da_inserire
)
connessione.commit()

print("Voti inseriti correttamente!")
```

**Passo 5 — Proviamo a violare la chiave esterna (solo a scopo didattico)**

```python
# ⚠️ Proviamo a inserire un voto per uno studente con id inesistente (es. 99)
try:
    cursore.execute(
        "INSERT INTO voti (materia, voto, id_studente) VALUES (?, ?, ?)",
        ("Storia", 6, 99)
    )
    connessione.commit()
except sqlite3.IntegrityError as errore:
    print("Inserimento rifiutato dal database:", errore)
```

**Passo 6 — Interroghiamo le due tabelle insieme con `INNER JOIN`**

```python
cursore.execute("""
SELECT studenti.nome, studenti.cognome, voti.materia, voti.voto
FROM voti
INNER JOIN studenti ON voti.id_studente = studenti.id
ORDER BY studenti.cognome;
""")

print("Report voti per studente:")
for riga in cursore.fetchall():
    nome, cognome, materia, voto = riga
    print(f"{nome} {cognome} — {materia}: {voto}")

connessione.close()
```

Al termine di questo laboratorio avrai costruito un database a due tabelle correttamente collegate, avrai visto il database rifiutare un dato incoerente grazie alla chiave esterna, e avrai recuperato informazioni "incrociate" con `INNER JOIN`.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Attiva sempre `PRAGMA foreign_keys = ON;` subito dopo aver aperto la connessione: in SQLite non è attivo per impostazione predefinita, ed è facile dimenticarlo.
- ✅ Prima di progettare le tabelle, chiediti sempre: "questa informazione può ripetersi identica su più righe?" Se sì, è quasi sempre un segnale che va spostata in una tabella propria.
- ✅ Dai alla chiave esterna un nome che ne renda esplicito il ruolo, come `id_studente` o `id_cliente`, invece di un generico `riferimento` o `fk1`.
- ✅ Quando scrivi un `INNER JOIN`, specifica sempre esplicitamente da quale tabella provengono i campi selezionati (es. `studenti.nome`), soprattutto se due tabelle hanno campi con lo stesso nome.
- ✅ Gestisci con `try/except sqlite3.IntegrityError` i casi in cui un inserimento potrebbe violare una chiave esterna, invece di lasciare che il programma si interrompa in modo brusco.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Ripetere nome e cognome su ogni riga della tabella voti è più comodo, tanto funziona lo stesso."* → Funziona nell'immediato, ma introduce ridondanza: un solo aggiornamento dimenticato basta a creare dati incoerenti tra loro.
- ❌ *"In SQLite, definire `FOREIGN KEY` nella tabella basta a farla rispettare automaticamente."* → Serve anche abilitare esplicitamente `PRAGMA foreign_keys = ON;` a ogni connessione: senza, il vincolo viene ignorato silenziosamente.
- ❌ *"`INNER JOIN` unisce fisicamente due tabelle in una sola, in modo permanente."* → `INNER JOIN` combina i dati solo temporaneamente, per la durata della query: le tabelle originarie restano distinte e separate nel database.
- ❌ *"La chiave esterna va sempre messa nella tabella 'principale'."* → Va messa nella tabella che rappresenta il lato "Molti" della relazione: nel nostro esempio, `id_studente` sta nella tabella `voti`, non nella tabella `studenti`.
- ❌ *"Con `INNER JOIN`, se uno studente non ha ancora nessun voto, comparirà comunque nel risultato."* → `INNER JOIN` restituisce solo le righe che trovano corrispondenza in **entrambe** le tabelle: uno studente senza voti non comparirebbe in questo risultato (una limitazione che si supera con `LEFT JOIN`, non trattato in questo modulo).

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| Relazione Uno-a-Molti | Un record di una tabella collegato a molti record di un'altra |
| Ridondanza dei dati | Ripetizione inutile della stessa informazione su più righe |
| `FOREIGN KEY` | Campo che fa riferimento alla chiave primaria di un'altra tabella |
| Normalizzazione | Processo di organizzazione dello schema che minimizza la ridondanza |
| `INNER JOIN` | Comando che combina righe di due tabelle in base a una condizione di corrispondenza |
| `PRAGMA foreign_keys = ON` | Comando che abilita il controllo delle chiavi esterne in SQLite |
| Database atomico | Database in cui ogni informazione vive in un solo posto |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **Chiave esterna (`FOREIGN KEY`)** — campo di una tabella che fa riferimento alla chiave primaria di un'altra tabella, formalizzando un collegamento tra le due.
- **`INNER JOIN`** — comando SQL che combina righe di due (o più) tabelle sulla base di una condizione di corrispondenza tra i campi.
- **Normalizzazione** — processo di organizzazione dello schema di un database, volto a minimizzare la ridondanza e massimizzare la coerenza dei dati.
- **`PRAGMA`** — comando speciale di SQLite che permette di leggere o modificare impostazioni di configurazione del database (es. l'attivazione delle chiavi esterne).
- **Relazione** — legame logico tra due tabelle di un database, tipicamente rappresentato tramite una chiave esterna.
- **Relazione Uno-a-Molti** — tipo di relazione in cui un record di una tabella può essere collegato a più record di un'altra tabella.
- **Ridondanza dei dati** — ripetizione non necessaria della stessa informazione in più punti di un database.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: in una relazione Uno-a-Molti, un singolo record della tabella "Molti" può essere collegato a più record della tabella "Uno".
`Falso — è il contrario: un singolo record della tabella "Uno" può essere collegato a più record della tabella "Molti", non viceversa.`

**2.** Che cos'è la ridondanza dei dati?
- a) Un tipo speciale di chiave primaria
- b) La ripetizione non necessaria della stessa informazione in più punti del database ✅
- c) Un comando SQL per unire due tabelle
- d) Un vincolo che impedisce valori duplicati

**3.** Vero o Falso: una chiave esterna fa riferimento alla chiave primaria di un'altra tabella.
`Vero.`

**4.** In quale delle due tabelle di una relazione Uno-a-Molti va inserita la chiave esterna?
`Nella tabella che rappresenta il lato "Molti" della relazione.`

**5.** Quale comando SQLite bisogna eseguire per abilitare il controllo delle chiavi esterne?
- a) `PRAGMA foreign_keys = ON;` ✅
- b) `ENABLE FOREIGN KEYS;`
- c) `SET foreign_keys = TRUE;`
- d) Non serve, è attivo per impostazione predefinita

**6.** Vero o Falso: `INNER JOIN` unisce in modo permanente due tabelle in una sola, modificando la struttura del database.
`Falso — combina i dati solo temporaneamente, per la durata della query; le tabelle restano distinte nel database.`

**7.** Qual è la regola pratica di base della normalizzazione affrontata in questo modulo?
`Ogni informazione dovrebbe vivere in un solo posto del database.`

**8.** Vero o Falso: con `INNER JOIN`, un record che non trova corrispondenza nell'altra tabella compare comunque nel risultato, con campi vuoti.
`Falso — INNER JOIN restituisce solo le righe che trovano corrispondenza in entrambe le tabelle.`

**9.** Quale problema risolve, principalmente, la separazione di dati in più tabelle collegate?
- a) La lentezza delle query
- b) La ridondanza dei dati ✅
- c) Il numero massimo di righe consentite
- d) La dimensione del file di database

**10.** Metti in ordine logico i seguenti passaggi nella progettazione di due tabelle collegate: Creare la tabella "Molti" con chiave esterna, Popolare le tabelle, Creare la tabella "Uno", Interrogare con `INNER JOIN`.
`Creare la tabella "Uno" → Creare la tabella "Molti" con chiave esterna → Popolare le tabelle → Interrogare con INNER JOIN`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "Il mio database diventa relazionale"**

Riprendi il contesto scelto nelle Fasi precedenti (Registro scolastico, Registro spese o Elenco contatti) e trasformalo in un database a **due tabelle collegate**, eliminando ogni ridondanza individuata.

Per il contesto scelto:

1. Individua, nel tuo database esistente, un'informazione ripetuta su più righe (es. il nome di uno studente ripetuto per ogni voto, o il nome di un cliente ripetuto per ogni ordine), che sia candidata a diventare una tabella a sé.
2. Progetta ed esegui il `CREATE TABLE` per la nuova tabella "principale" (lato "Uno"), con una propria chiave primaria.
3. Modifica (o ricrea) la tabella "collegata" (lato "Molti"), aggiungendo un campo `FOREIGN KEY` che punti alla nuova tabella.
4. Popola entrambe le tabelle con **almeno 4 record** nella tabella "Uno" e **almeno 8 record** nella tabella "Molti", assicurandoti che ogni record collegato faccia riferimento a un id realmente esistente.
5. Scrivi almeno **due query con `INNER JOIN`** che rispondano a domande concrete sul tuo contesto (es. "tutti i voti di uno studente specifico", "tutte le spese di una categoria specifica"), e stampa i risultati in modo leggibile.

Questo project work sarà la base su cui, nel Modulo 7, calcolerai statistiche e aggregazioni sui dati collegati; costituirà un passaggio intermedio della **Fase 3** del corso.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet della sintassi `FOREIGN KEY` e `INNER JOIN`, con esempi commentati
- 📊 Schema visivo "tabella con ridondanza vs tabelle relazionate", a confronto (da produrre come infografica)
- 📝 Template di notebook Colab con due tabelle collegate e query `INNER JOIN` già pronte, da adattare al proprio contesto

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

- Documentazione ufficiale SQLite — sezione *Foreign Key Support*
- Documentazione ufficiale SQLite — sezione *Query Language: JOIN*
- Documentazione ufficiale SQLite — sezione *PRAGMA Statements*

[🔙 Torna all'indice del modulo](#indice-modulo)