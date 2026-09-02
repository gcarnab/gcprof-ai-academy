<a id="indice-modulo"></a>
# Modulo 9: Interfacce Utente Interattive
*Fase 4 — Applicazioni Data-Driven — Database con Python, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Project Work](#project-work) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Nel Modulo 8 hai costruito una classe `DbManager`: un componente solido, riutilizzabile, con metodi chiari come `aggiungi_studente()` o `ottieni_studenti()`. C'è però un limite: per usarla, bisogna comunque scrivere codice Python. Chi non sa programmare — un collega, un genitore, un compagno di classe — non potrebbe mai usare il tuo database.

In questo modulo colmiamo questa distanza costruendo una **vera interfaccia grafica**, direttamente dentro un notebook Google Colab, grazie alla libreria **`ipywidgets`**. Vedremo come creare campi di testo, menu a tendina e pulsanti, come "collegare" un pulsante a una funzione Python (in gergo, **gestire un evento**) e come aggiornare l'interfaccia in tempo reale quando i dati cambiano.

Il risultato sarà una piccola applicazione completa, che chiunque potrà usare per aggiungere, visualizzare o cercare dati nel database — senza scrivere una sola riga di codice. È il passo che trasforma il tuo lavoro da "esercizio per programmatori" a "strumento utilizzabile da tutti".

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare la differenza tra un programma pilotato da codice e uno pilotato da un'interfaccia grafica.
- Usare i widget principali della libreria `ipywidgets`: `Text`, `Dropdown`, `Button`, `Output`.
- Costruire un form di inserimento dati con campi di testo e menu a tendina.
- Collegare un pulsante a una funzione Python tramite **event handling** (`on_click`).
- Aggiornare dinamicamente l'interfaccia in risposta alle azioni dell'utente, usando il widget `Output`.
- Collegare l'interfaccia grafica alla classe `DbManager` costruita nel Modulo 8, senza scrivere SQL nei gestori degli eventi.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** la classe `DbManager` costruita nel Modulo 8 (o una classe equivalente con metodi CRUD), e un minimo di familiarità con le funzioni Python.
- **Non serve:** alcuna esperienza pregressa con interfacce grafiche o `ipywidgets`: la libreria viene introdotta da zero, un widget alla volta.

> 💡 **Nota per il docente:** `ipywidgets` è preinstallata su Google Colab: non serve alcuna installazione aggiuntiva, solo l'importazione della libreria.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Perché un'interfaccia grafica

Un database interrogato solo da codice è potente, ma **esclusivo**: lo può usare solo chi sa scrivere query o chiamare metodi Python. Un'interfaccia grafica (GUI, *Graphical User Interface*) nasconde questa complessità dietro elementi visivi familiari a chiunque: campi da compilare, menu da cui scegliere, pulsanti da premere.

*Perché ti serve: è lo stesso principio dell'incapsulamento visto nel Modulo 8 con la classe `DbManager`, applicato questa volta all'esperienza dell'utente finale, non solo al codice.*

### 4.2 I widget principali di ipywidgets

Un **widget** è un elemento interattivo dell'interfaccia. La libreria `ipywidgets` ne mette a disposizione moltissimi; per questo modulo useremo i quattro più importanti:

- **`Text`**: un campo di testo in cui l'utente può digitare un valore (es. il nome di uno studente).
- **`Dropdown`**: un menu a tendina da cui scegliere un valore tra opzioni predefinite (es. la classe).
- **`Button`**: un pulsante che l'utente può premere per attivare un'azione.
- **`Output`**: un'area dell'interfaccia in cui possiamo mostrare (e aggiornare) testo, tabelle o messaggi, senza dover ristampare tutto il notebook.

### 4.3 Costruire un form di inserimento dati

Un **form** è semplicemente un insieme di widget organizzati insieme, ciascuno dedicato a un campo dei dati da inserire. In `ipywidgets`, ogni widget viene creato come un oggetto Python (es. `campo_nome = widgets.Text(description="Nome:")`), e più widget si possono mostrare insieme con la funzione `display()` o organizzandoli in un contenitore come `VBox` (verticale) o `HBox` (orizzontale).

*Perché ti serve: pensare a un form come a un insieme di oggetti, ciascuno con un proprio stato (il valore digitato), è lo stesso modello mentale della Programmazione Orientata agli Oggetti che hai già usato nel Modulo 8.*

### 4.4 Event handling: collegare un pulsante a una funzione

Un pulsante da solo non fa nulla: serve **collegarlo** a una funzione Python che verrà eseguita ogni volta che l'utente lo preme. Questo si chiama **gestione degli eventi** (*event handling*), e in `ipywidgets` si realizza con il metodo `on_click()`:

```python
pulsante.on_click(funzione_da_eseguire)
```

La funzione collegata (spesso chiamata *callback*, cioè "funzione richiamata") riceve automaticamente il widget stesso come parametro, anche se spesso non ci serve usarlo direttamente.

*Perché ti serve: è il meccanismo alla base di ogni interfaccia grafica moderna, dai siti web alle app per smartphone — capirlo qui, in un contesto semplice, ti aiuterà a comprendere interfacce molto più complesse in futuro.*

### 4.5 Aggiornare dinamicamente l'interfaccia

Quando l'utente aggiunge un nuovo record, l'elenco mostrato a schermo deve aggiornarsi **senza dover rieseguire l'intera cella**. Il widget `Output`, insieme al metodo `clear_output()`, permette esattamente questo: possiamo "pulire" un'area dell'interfaccia e ridisegnarla con i dati aggiornati, tutto all'interno della stessa funzione collegata al pulsante.

*Perché ti serve: senza questo meccanismo, l'utente dovrebbe rieseguire manualmente delle celle ogni volta che i dati cambiano — un'esperienza d'uso non professionale e poco intuitiva.*

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** un form con campi Nome, Cognome, Classe (menu a tendina) e Media, con un pulsante "Aggiungi studente", usabile anche da un docente che non ha mai scritto una riga di Python.
- **In un'azienda (indirizzo AFM/Finanza):** un form per registrare una nuova spesa, con un menu a tendina per la categoria (così da evitare errori di battitura come "Trasporto" scritto in modi diversi in righe diverse).
- **Nel marketing e RIM:** un form di inserimento contatti con un pulsante "Cerca per paese", che aggiorna dinamicamente l'elenco mostrato in base al valore scelto in un `Dropdown`.
- **Aggiornamento dinamico:** dopo aver premuto "Aggiungi studente", la tabella sottostante si aggiorna immediatamente mostrando anche il nuovo record, senza bisogno di rieseguire altre celle.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: costruiamo un form completo collegato al database**

Esegui i seguenti blocchi di codice in ordine, su un nuovo notebook Google Colab.

**Passo 1 — Importiamo le librerie e riprendiamo la classe DbManager**

```python
import sqlite3
import ipywidgets as widgets
from IPython.display import display, clear_output

# Riprendiamo la classe DbManager costruita nel Modulo 8
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
                classe TEXT,
                media REAL
            )
        """)
        self.connessione.commit()

    def aggiungi_studente(self, nome, cognome, classe, media):
        try:
            self.cursore.execute(
                "INSERT INTO studenti (nome, cognome, classe, media) VALUES (?, ?, ?, ?)",
                (nome, cognome, classe, media)
            )
            self.connessione.commit()
            return True
        except sqlite3.Error as errore:
            self.connessione.rollback()
            print(f"Errore durante l'inserimento: {errore}")
            return False

    def ottieni_studenti(self):
        self.cursore.execute("SELECT nome, cognome, classe, media FROM studenti")
        return self.cursore.fetchall()

# Creiamo l'oggetto che useremo in tutta l'interfaccia grafica
db = DbManager("scuola_gui.db")
print("Database pronto e collegato all'interfaccia.")
```

**Passo 2 — Creiamo i widget del form**

```python
# Campo di testo per il nome
campo_nome = widgets.Text(description="Nome:", placeholder="Es. Marco")

# Campo di testo per il cognome
campo_cognome = widgets.Text(description="Cognome:", placeholder="Es. Rossi")

# Dropdown per la classe: l'utente sceglie tra opzioni predefinite, senza errori di battitura
campo_classe = widgets.Dropdown(
    description="Classe:",
    options=["2C", "3A", "3B", "4A", "4B", "5A"]
)

# Slider per la media: limita i valori a un intervallo sensato (da 0 a 10)
campo_media = widgets.FloatSlider(
    description="Media:", min=0, max=10, step=0.1, value=6
)

# Pulsante per confermare l'inserimento
pulsante_aggiungi = widgets.Button(
    description="Aggiungi studente",
    button_style="success"   # colora il pulsante di verde
)

# Area di output, in cui mostreremo messaggi e la tabella aggiornata
area_output = widgets.Output()

print("Widget creati correttamente.")
```

**Passo 3 — Colleghiamo il pulsante a una funzione (event handling)**

```python
def mostra_studenti():
    """Ridisegna la tabella con tutti gli studenti presenti nel database."""
    with area_output:
        clear_output()   # puliamo l'output precedente prima di ridisegnarlo
        studenti = db.ottieni_studenti()
        print(f"📋 Elenco studenti ({len(studenti)} totali):")
        print("-" * 40)
        for nome, cognome, classe, media in studenti:
            print(f"{nome} {cognome} - Classe {classe} - Media {media}")

def gestisci_click_aggiungi(pulsante_premuto):
    """Funzione richiamata ogni volta che il pulsante 'Aggiungi studente' viene premuto."""
    successo = db.aggiungi_studente(
        campo_nome.value,
        campo_cognome.value,
        campo_classe.value,
        campo_media.value
    )

    if successo:
        # Svuotiamo i campi di testo, pronti per un nuovo inserimento
        campo_nome.value = ""
        campo_cognome.value = ""

    # Aggiorniamo subito la tabella mostrata, senza rieseguire altre celle
    mostra_studenti()

# Colleghiamo la funzione al pulsante: da questo momento, ogni click la esegue
pulsante_aggiungi.on_click(gestisci_click_aggiungi)

print("Pulsante collegato correttamente alla funzione.")
```

**Passo 4 — Mostriamo l'interfaccia completa**

```python
# VBox organizza i widget uno sotto l'altro, come un vero form verticale
form = widgets.VBox([
    campo_nome,
    campo_cognome,
    campo_classe,
    campo_media,
    pulsante_aggiungi,
    area_output
])

# Visualizziamo il form nel notebook
display(form)

# Mostriamo subito lo stato iniziale della tabella (eventuali studenti già presenti)
mostra_studenti()
```

Prova ora a compilare il form e premere "Aggiungi studente": vedrai la tabella aggiornarsi immediatamente, senza dover eseguire nessun'altra cella.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="best-practice"></a>
## 7. Best Practice

- ✅ Usa un `Dropdown` invece di un `Text` per i campi con un insieme limitato e noto di valori (es. classe, categoria): eviti errori di battitura e dati incoerenti.
- ✅ Racchiudi sempre l'aggiornamento dell'interfaccia dentro `with area_output: clear_output()`, per evitare che i risultati si accumulino uno sotto l'altro.
- ✅ Svuota i campi di testo dopo un inserimento riuscito, per rendere più veloce l'inserimento di più record consecutivi.
- ✅ Dai una **descrizione chiara** a ogni widget (`description="Nome:"`), così l'utente capisce subito cosa inserire, senza bisogno di istruzioni esterne.
- ✅ Mantieni la logica di accesso al database **nella classe `DbManager`**, non dentro le funzioni collegate ai widget: l'interfaccia deve solo chiamare metodi, mai contenere SQL.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Il pulsante fa qualcosa automaticamente, senza bisogno di collegarlo a una funzione."* → Un `Button` da solo non esegue nulla: va sempre collegato con `on_click()` a una funzione che definisce cosa succede al click.
- ❌ *"Posso scrivere query SQL direttamente dentro la funzione collegata al pulsante."* → Meglio richiamare i metodi della classe `DbManager`: mantiene l'interfaccia pulita e riutilizza la logica già scritta e testata nel Modulo 8.
- ❌ *"Se non uso `clear_output()`, l'output si aggiorna comunque in modo pulito."* → Senza `clear_output()`, ogni nuovo inserimento aggiunge testo sotto il precedente, rendendo l'interfaccia disordinata dopo pochi click.
- ❌ *"Un `Text` e un `Dropdown` restituiscono lo stesso tipo di valore in `.value`."* → Restituiscono entrambi un valore, ma il `Dropdown` garantisce che sia sempre uno tra quelli previsti, mentre il `Text` accetta qualsiasi input dell'utente, inclusi errori di battitura.
- ❌ *"Il form funziona solo se lo eseguo su Google Colab."* → `ipywidgets` funziona in qualsiasi ambiente basato su Jupyter Notebook, non solo su Colab, anche se in questo corso lo useremo sempre lì per semplicità.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| Widget | Elemento interattivo dell'interfaccia (campo, menu, pulsante...) |
| `Text` | Widget per l'inserimento libero di testo |
| `Dropdown` | Widget per la scelta tra opzioni predefinite |
| `Button` | Widget che attiva un'azione al click |
| `Output` | Area dell'interfaccia aggiornabile dinamicamente |
| Event handling | Meccanismo che collega un'azione dell'utente (es. click) a una funzione Python |
| `on_click()` | Metodo che collega un pulsante alla funzione da eseguire al click |
| `clear_output()` | Ripulisce un'area `Output` prima di ridisegnarla |

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="glossario"></a>
## 10. Glossario

- **Callback** — funzione richiamata automaticamente in risposta a un evento (es. un click).
- **Evento** — un'azione compiuta dall'utente sull'interfaccia (es. cliccare un pulsante, digitare un testo).
- **Event handling (gestione degli eventi)** — l'insieme delle tecniche per collegare eventi a funzioni Python.
- **Form** — insieme di widget organizzati per raccogliere dati strutturati dall'utente.
- **GUI (Graphical User Interface)** — interfaccia grafica che permette di interagire con un programma senza scrivere codice.
- **Widget** — elemento interattivo dell'interfaccia (campo di testo, menu, pulsante, area di output...).

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: un widget `Button` esegue automaticamente un'azione al click, senza bisogno di essere collegato a una funzione.
`Falso — va sempre collegato con on_click() a una funzione che definisce cosa succede al click.`

**2.** Quale widget useresti per far scegliere all'utente un valore tra un insieme predefinito, evitando errori di battitura?
- a) `Text`
- b) `Dropdown` ✅
- c) `Button`
- d) `Output`

**3.** A cosa serve il metodo `on_click()`?
`A collegare un pulsante a una funzione Python, che verrà eseguita ogni volta che il pulsante viene premuto.`

**4.** Vero o Falso: senza `clear_output()`, ogni nuovo aggiornamento dell'interfaccia si aggiunge sotto il precedente, invece di sostituirlo.
`Vero.`

**5.** Come si chiama, in gergo, la funzione collegata a un evento come il click di un pulsante?
- a) Handler generico
- b) Callback ✅
- c) Trigger
- d) Listener

**6.** Perché è preferibile che la funzione collegata al pulsante chiami i metodi della classe `DbManager`, invece di contenere direttamente query SQL?
`Perché mantiene l'interfaccia pulita e riutilizza la logica già scritta, testata e con gestione degli errori nella classe.`

**7.** Vero o Falso: `VBox` organizza i widget uno accanto all'altro, in orizzontale.
`Falso — VBox li organizza in verticale, uno sotto l'altro; HBox li organizza in orizzontale.`

**8.** Quale proprietà di un widget contiene il valore attualmente inserito o selezionato dall'utente?
`.value`

**9.** Cosa succede se un `Dropdown` per la classe viene sostituito con un semplice `Text`?
`L'utente potrebbe digitare valori incoerenti o con errori di battitura (es. "3a" invece di "3A"), che un Dropdown avrebbe evitato.`

**10.** Vero o Falso: `ipywidgets` richiede un'installazione aggiuntiva su Google Colab prima di poter essere usata.
`Falso — è preinstallata su Google Colab, basta importarla.`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="project-work"></a>
## 12. Project Work

**Consegna: "La mia prima applicazione con interfaccia grafica"**

Riprendi la classe che hai costruito nel Project Work del Modulo 8 (`GestoreSpese`, `GestoreContatti` o equivalente) e costruisci un'interfaccia grafica completa:

1. Crea un **form di inserimento** con almeno 4 widget diversi (almeno un `Text`, un `Dropdown` e un `Button`), coerenti con i campi del tuo dominio.
2. Collega il pulsante a una funzione che richiama il metodo di inserimento della tua classe, gestendo sia il caso di successo sia quello di errore.
3. Aggiungi un widget `Output` che mostri, in tempo reale, l'elenco aggiornato dei record presenti nel database dopo ogni inserimento.
4. **Facoltativo (per chi vuole approfondire):** aggiungi un secondo `Dropdown` o `Button` per **filtrare** l'elenco mostrato (es. solo i record di una certa categoria), aggiornando dinamicamente l'`Output`.

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet dei widget principali di `ipywidgets` (`Text`, `Dropdown`, `Button`, `Output`)
- 📊 Schema visivo del flusso "Click → Callback → Aggiornamento Output"
- 📝 Template di form vuoto, pronto da collegare a qualsiasi classe `DbManager`

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Downey, A. — *Think Python: How to Think Like a Computer Scientist* (capitoli su funzioni e callback)
- Grus, J. — *Data Science from Scratch* (cenni su interfacce interattive per l'analisi dati)

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale del progetto Jupyter Widgets (`ipywidgets`)
- Documentazione ufficiale IPython — modulo `IPython.display`
- Guida Google Colab all'uso dei widget interattivi

[🔙 Torna all'indice del modulo](#indice-modulo)