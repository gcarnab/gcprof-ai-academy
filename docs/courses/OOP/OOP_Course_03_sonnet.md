# 🧩 Modulo 3 — Attributi, Metodi e il Costruttore

- **Corso:** OOP Explorer — Programmazione ad Oggetti con Python e Java
- **Piattaforma:** GCProf Academy
- **Livello:** 🟢 Base (Fase 1 — Le Fondamenta dell'OOP)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 2 Classi e Oggetti: Il Progetto e l'Istanza

---
<a id="indice"></a>
# 📑 Indice del Modulo 2

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Nel Modulo 2 hai imparato a creare oggetti "vuoti" a partire da una classe, riempendoli di attributi **dall'esterno**, uno alla volta, con la notazione punto (`studente1.nome = "Mario"`). Funziona, ma ha un difetto evidente: nulla garantisce che chi crea un nuovo oggetto si ricordi di assegnare *tutti* gli attributi necessari, né che li assegni nell'ordine e nel formato giusti.

In questo modulo risolvi definitivamente il problema, imparando lo strumento che rende un oggetto **completo fin dal momento in cui nasce**: il **costruttore**. Scoprirai anche cosa significa davvero `self`, come i metodi permettono a un oggetto di "agire su se stesso", e la differenza — spesso fonte di errori anche per programmatori esperti — tra un attributo che appartiene al singolo oggetto e uno condiviso da tutti gli oggetti della stessa classe.

Da qui in avanti, ogni classe che scriverai nel corso avrà questa forma: costruttore, attributi, metodi. È lo scheletro di ogni oggetto professionale.

[🔙 Torna all'indice](#indice)

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Scrivere un costruttore `__init__` che crea oggetti completi, con tutti gli attributi già impostati al momento della creazione.
- Spiegare perché `self` è necessario in ogni metodo e cosa rappresenta esattamente.
- Distinguere un metodo (azione) da un attributo (dato), e farli interagire correttamente all'interno della stessa classe.
- Distinguere un attributo di istanza (proprio di un singolo oggetto) da un attributo di classe (condiviso da tutti gli oggetti).
- Usare valori di default nei parametri del costruttore, evitando l'errore classico dei parametri di default mutabili.

[🔙 Torna all'indice](#indice)

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** Modulo 1 e Modulo 2 di questo corso — in particolare saper definire una classe con `class` e istanziarla.
- **Serve:** conoscenza base delle funzioni Python (definizione con `def`, parametri, valori di ritorno).
- **Non serve:** nessuna conoscenza pregressa di costruttori o di programmazione a oggetti in altri linguaggi.

[🔙 Torna all'indice](#indice)

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Il costruttore `__init__`: dare vita a un oggetto già completo

Il **costruttore** è un metodo speciale, chiamato automaticamente da Python ogni volta che un oggetto viene creato. In Python si chiama sempre `__init__` (da *initialize*, "inizializzare") ed è il posto giusto per assegnare tutti gli attributi che l'oggetto deve avere fin dalla nascita.

```python
# ==================== ESEMPIO 3.1: IL COSTRUTTORE __init__ ====================
"""
Confrontiamo il "vecchio" modo (Modulo 2, attributi assegnati dall'esterno)
con il modo corretto e professionale: il costruttore.
"""

class Studente:
    def __init__(self, nome, matricola, eta):
        # Ogni riga qui dentro assegna un attributo all'oggetto che sta nascendo
        self.nome = nome
        self.matricola = matricola
        self.eta = eta

# Ora un oggetto Studente nasce GIA' completo: basta passare i dati a Studente(...)
studente1 = Studente("Mario Rossi", "12345", 16)
studente2 = Studente("Giulia Bianchi", "54321", 17)

print(f"{studente1.nome}, matricola {studente1.matricola}, {studente1.eta} anni")
print(f"{studente2.nome}, matricola {studente2.matricola}, {studente2.eta} anni")

# Non è più possibile dimenticarsi un attributo: se manca un parametro
# richiesto, Python segnala subito un errore al momento della creazione,
# non in un punto imprecisato del programma più avanti.
```

*Perché ti serve: `__init__` è il posto in cui puoi anche validare i dati in ingresso (es. rifiutare un'età negativa) — lo approfondirai nel Modulo 9 con le eccezioni personalizzate.*

### 4.2 `self`: perché ogni oggetto deve conoscere se stesso

`self` è il primo parametro di **ogni** metodo di una classe (costruttore compreso) e rappresenta **l'oggetto stesso su cui il metodo viene chiamato**. Non lo passi mai esplicitamente: è Python a farlo per te, automaticamente, quando chiami `oggetto.metodo(...)`.

```python
# ==================== ESEMPIO 3.2: COSA FA DAVVERO self ====================
"""
Dimostriamo che 'self' è semplicemente un riferimento all'oggetto
su cui il metodo è stato chiamato. studente1.saluta() e
Studente.saluta(studente1) fanno ESATTAMENTE la stessa cosa:
la prima forma è solo una scorciatoia più leggibile della seconda.
"""

class Studente:
    def __init__(self, nome):
        self.nome = nome

    def saluta(self):
        # 'self' qui dentro E' lo specifico oggetto che ha chiamato il metodo
        return f"Ciao, sono {self.nome}!"

studente1 = Studente("Mario Rossi")

print(studente1.saluta())            # forma normale, quella che userai sempre
print(Studente.saluta(studente1))    # forma equivalente: rende esplicito 'self'
```

Senza `self`, un metodo non avrebbe modo di sapere *quale* oggetto, tra i tanti creati dalla stessa classe, deve usare per leggere o modificare i propri attributi.

### 4.3 Metodi: azioni che vivono dentro l'oggetto, e che collaborano tra loro

Un metodo è una funzione definita dentro una classe. Come ogni funzione può fare calcoli, restituire valori — e, cosa preziosa, **può chiamare altri metodi dello stesso oggetto** attraverso `self`.

```python
# ==================== ESEMPIO 3.3: METODI CHE COLLABORANO TRA LORO ====================
"""
La classe Rettangolo che hai iniziato a costruire nel Laboratorio del Modulo 2,
ora completa: il costruttore imposta base e altezza, e un metodo può
richiamarne un altro con self.nome_metodo() per riusare la logica già scritta.
"""

class Rettangolo:
    def __init__(self, base, altezza):
        self.base = base
        self.altezza = altezza

    def calcola_area(self):
        return self.base * self.altezza

    def calcola_perimetro(self):
        return 2 * (self.base + self.altezza)

    def descrivi(self):
        # descrivi() riusa calcola_area() e calcola_perimetro() tramite self,
        # invece di riscrivere i calcoli da capo
        return (f"Rettangolo {self.base}x{self.altezza}: "
                f"area={self.calcola_area()}, perimetro={self.calcola_perimetro()}")

rett1 = Rettangolo(4, 5)
print(rett1.descrivi())    # Rettangolo 4x5: area=20, perimetro=18
```

### 4.4 Attributi di istanza vs attributi di classe

Fino ad ora hai usato solo **attributi di istanza**: dati propri di ciascun oggetto (`self.nome`), diversi da un oggetto all'altro. Esiste anche un secondo tipo, l'**attributo di classe**: un dato condiviso da **tutti** gli oggetti creati da quella classe, definito direttamente dentro la classe ma fuori da `__init__`.

```python
# ==================== ESEMPIO 3.4: ATTRIBUTI DI ISTANZA VS DI CLASSE ====================
"""
'scuola' è un attributo di CLASSE: è lo stesso valore per ogni Studente,
quindi ha senso definirlo una sola volta, condiviso.
'numero_studenti' è anch'esso di classe, ma lo usiamo in modo speciale:
lo incrementiamo a ogni nuovo oggetto creato, per contare le istanze.
'nome' ed 'eta' restano attributi di ISTANZA: cambiano da studente a studente.
"""

class Studente:
    scuola = "Liceo Scientifico Scienze Applicate"   # attributo di CLASSE
    numero_studenti = 0                               # attributo di CLASSE (contatore)

    def __init__(self, nome, eta):
        self.nome = nome     # attributo di ISTANZA
        self.eta = eta       # attributo di ISTANZA
        Studente.numero_studenti += 1   # modifica l'attributo di CLASSE

studente1 = Studente("Mario Rossi", 16)
studente2 = Studente("Giulia Bianchi", 17)

print(studente1.scuola)              # "Liceo Scientifico Scienze Applicate"
print(studente2.scuola)              # stesso identico valore: è condiviso
print(f"Studenti creati finora: {Studente.numero_studenti}")   # 2
```

```
              class Studente:
              ┌─────────────────────────────┐
              │  scuola = "..."              │  ← 1 SOLA copia, condivisa
              │  numero_studenti = 0         │  ← 1 SOLA copia, condivisa
              └─────────────────────────────┘
                    ▲                    ▲
        studente1.nome="Mario"   studente2.nome="Giulia"
              (copia propria)         (copia propria)
```

⚠️ Attenzione: se assegni un valore a `self.scuola = "..."` su un singolo oggetto, non stai modificando l'attributo di classe condiviso — ne stai creando uno di istanza con lo stesso nome, che "nasconde" quello di classe solo per quell'oggetto. Per modificare davvero l'attributo condiviso, agisci sulla classe (`Studente.numero_studenti += 1`, come nell'esempio).

### 4.5 Valori di default nei parametri del costruttore

Come per qualsiasi funzione Python, i parametri di `__init__` possono avere un valore di default, reso opzionale al momento della creazione dell'oggetto.

```python
# ==================== ESEMPIO 3.5: VALORI DI DEFAULT (E UNA TRAPPOLA CLASSICA) ====================
"""
'voti' ha un default: se non lo passiamo, l'oggetto parte con una lista vuota.
ATTENZIONE alla trappola: il default NON deve mai essere una lista scritta
direttamente nella firma (def __init__(self, voti=[])), perché in Python
quella lista verrebbe CONDIVISA da tutti gli oggetti creati senza passare 'voti'!
Il modo corretto è usare None come sentinella e creare la lista dentro il metodo.
"""

class Studente:
    def __init__(self, nome, voti=None):
        self.nome = nome
        self.voti = voti if voti is not None else []   # lista NUOVA per ogni oggetto

studente1 = Studente("Mario Rossi")             # nasce con voti = []
studente2 = Studente("Giulia Bianchi", [8, 9])  # nasce già con due voti

studente1.voti.append(7)

print(f"{studente1.nome}: {studente1.voti}")    # [7]
print(f"{studente2.nome}: {studente2.voti}")    # [8, 9] — non influenzato!
```

### 4.6 Il costruttore in Java: un primo confronto

L'idea di costruttore esiste, identica nel concetto, anche in Java — cambia solo la sintassi. Lo approfondirai nel Modulo 11; per ora osserva il parallelo diretto:

```java
// ==================== ESEMPIO 3.6: COSTRUTTORE IN JAVA ====================
class Studente {
    String nome;      // attributo tipizzato
    int eta;

    // Il costruttore in Java ha lo STESSO NOME della classe (non __init__)
    // e NON ha bisogno di 'self': l'equivalente si chiama 'this' ed è implicito
    public Studente(String nome, int eta) {
        this.nome = nome;   // 'this' = l'equivalente Java di 'self'
        this.eta = eta;
    }
}
```

| | Python | Java |
|---|---|---|
| Nome del costruttore | Sempre `__init__` | Uguale al nome della classe |
| Riferimento all'oggetto | `self` (esplicito in ogni metodo) | `this` (implicito, si può omettere se non c'è ambiguità) |
| Creazione oggetto | `Studente("Mario", 16)` | `new Studente("Mario", 16)` |

### 4.7 Il ciclo di vita di un oggetto

Ogni oggetto attraversa, concettualmente, tre fasi: **nascita** (il costruttore viene eseguito e l'oggetto prende forma in memoria), **vita** (i suoi metodi vengono chiamati, i suoi attributi letti o modificati) e **fine** (quando nessuna variabile fa più riferimento all'oggetto, Python lo elimina automaticamente dalla memoria — un processo chiamato *garbage collection*, di cui non dovrai occuparti direttamente).

[🔙 Torna all'indice](#indice)

---

<a id="esempi"></a>
## 5. Esempi

- **In banca:** un oggetto `ContoBancario` nasce già con IBAN e saldo iniziale impostati dal costruttore — mai un conto "a metà", senza saldo definito. Lo riprenderai nel Modulo 4 con l'incapsulamento.
- **Nel marketing:** un oggetto `Cliente` può avere un attributo di classe `azienda = "GCProf Store"`, condiviso da tutti i clienti, e un attributo di istanza `nome` diverso per ciascuno.
- **Nei videogiochi:** un `Personaggio` nasce con vita piena grazie al costruttore (`vita = 100`), e un attributo di classe come `numero_giocatori_attivi` può tenere il conto di quanti personaggi sono in gioco contemporaneamente.
- **A scuola:** un oggetto `Classe3A` potrebbe avere un attributo di classe `anno_scolastico`, uguale per tutti gli studenti che vi appartengono.

[🔙 Torna all'indice](#indice)

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: "Completa la classe `ContoBancario`"** (su Google Colab)

1. Scrivi una classe `ContoBancario` con un costruttore `__init__` che accetta `intestatario` e un `saldo_iniziale` con valore di default `0`.
2. Aggiungi un attributo di classe `banca = "GCProf Bank"`, condiviso da tutti i conti.
3. Aggiungi un attributo di classe `numero_conti_aperti`, che si incrementa di 1 a ogni nuovo conto creato (come nell'Esempio 3.4).
4. Scrivi un metodo `mostra_saldo()` che stampa `"Conto di {intestatario} — saldo: {saldo} €"`, usando `self`.
5. Scrivi un metodo `riepilogo()` che richiama `mostra_saldo()` al proprio interno tramite `self`, e stampa anche `banca` e `numero_conti_aperti`.
6. Crea 3 oggetti `ContoBancario` diversi e stampa, per ciascuno, il riepilogo — verifica che `numero_conti_aperti` sia coerente.

*Suggerimento:* riusa la struttura dell'Esempio 3.3 (metodi che collaborano tra loro) e dell'Esempio 3.4 (contatore condiviso).

[🔙 Torna all'indice](#indice)

---

<a id="best-practice"></a>
## 7. Best Practice

- Inizializza **sempre** tutti gli attributi di istanza dentro `__init__`: un oggetto non dovrebbe mai esistere in uno stato "a metà".
- Non usare mai una lista, un dizionario o un altro oggetto mutabile come valore di default diretto in `__init__` (vedi Esempio 3.5): usa `None` e crea l'oggetto mutabile dentro il metodo.
- Usa un attributo di classe solo per dati davvero condivisi da tutti gli oggetti; se un dato può variare da oggetto a oggetto, è un attributo di istanza.
- Fai collaborare i metodi tra loro tramite `self` (Esempio 3.3) invece di ripetere la stessa logica di calcolo in più punti della classe.

[🔙 Torna all'indice](#indice)

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Posso dimenticare `self` come primo parametro di un metodo, tanto Python capisce lo stesso."* → No: senza `self`, Python solleva un errore (o, peggio, un comportamento sbagliato) non appena il metodo viene chiamato su un oggetto.
- ❌ *"Un attributo di classe e uno di istanza con lo stesso nome sono la stessa cosa."* → Assegnare `self.attributo = valore` crea sempre un attributo di istanza nuovo, che nasconde quello di classe solo per quell'oggetto (vedi il box ⚠️ nell'Esempio 3.4).
- ❌ *"Posso usare `def __init__(self, voti=[])` senza problemi."* → È l'errore più insidioso di questo modulo: quella lista viene creata **una sola volta** e condivisa da tutti gli oggetti che non passano `voti` esplicitamente (vedi Esempio 3.5).
- ❌ *"Il costruttore serve solo a 'salvare' i parametri ricevuti."* → Può fare molto di più: calcolare valori derivati, impostare attributi di classe, e (dal Modulo 9) validare i dati in ingresso.
- ❌ *"`self` è una parola riservata di Python, come `class`."* → Non lo è: è solo una convenzione (fortissima, da rispettare sempre) — tecnicamente potresti chiamarlo diversamente, ma nessun programmatore Python lo fa mai.

[🔙 Torna all'indice](#indice)

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| Costruttore `__init__` | Metodo speciale eseguito automaticamente alla creazione dell'oggetto, per inizializzarne gli attributi |
| `self` | Riferimento all'oggetto specifico su cui il metodo è stato chiamato |
| Metodo | Funzione definita dentro una classe, che può leggere/modificare attributi e chiamare altri metodi tramite `self` |
| Attributo di istanza | Dato proprio di un singolo oggetto (`self.attributo`), diverso da oggetto a oggetto |
| Attributo di classe | Dato condiviso da tutti gli oggetti della classe, definito fuori da `__init__` |
| Default mutabile | Errore classico da evitare: mai una lista/dizionario come valore di default diretto in `__init__` |

[🔙 Torna all'indice](#indice)

---

<a id="glossario"></a>
## 10. Glossario

- **Attributo di classe** — dato condiviso da tutti gli oggetti di una classe, definito direttamente nel corpo della classe.
- **Attributo di istanza** — dato proprio di un singolo oggetto, assegnato tipicamente in `__init__` con `self.`.
- **Costruttore** — metodo speciale (`__init__` in Python) eseguito automaticamente alla creazione di un oggetto.
- **Garbage collection** — meccanismo automatico con cui Python elimina dalla memoria gli oggetti non più referenziati da nessuna variabile.
- **Metodo** — funzione definita dentro una classe, che opera sull'oggetto tramite `self`.
- **`self`** — parametro implicito di ogni metodo, che rappresenta l'oggetto su cui il metodo è stato chiamato.
- **`this`** — equivalente Java di `self`, spesso implicito.

[🔙 Torna all'indice](#indice)

---

<a id="quiz"></a>
## 11. Quiz

Il quiz di verifica di questo modulo è disponibile nella apposita sezione.

[🔙 Torna all'indice](#indice)

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet "Costruttore, self e attributi: istanza vs classe" (1 pagina, da produrre in PDF)
- 📝 Scheda di laboratorio "Completa la classe ContoBancario" in formato stampabile
- 📊 Slide riassuntive del modulo (da produrre in formato .pptx)

[🔙 Torna all'indice](#indice)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Downey, A. — *Think Python: How to Think Like a Computer Scientist*
- Lutz, M. — *Learning Python*
- Ramalho, L. — *Fluent Python*

[🔙 Torna all'indice](#indice)

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale Python — sezione "Classes" (in particolare `__init__` e attributi di classe)
- Real Python — guide su costruttori e attributi di istanza/classe in Python
- Oracle Java Documentation — costruttori e la parola chiave `this` (utile in anteprima per il Modulo 11)

[🔙 Torna all'indice](#indice)