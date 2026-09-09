# 🧩 Modulo 5 — Ereditarietà: Riutilizzare e Specializzare il Codice

- **Corso:** OOP Explorer — Programmazione ad Oggetti con Python e Java
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Gerarchie e Comportamenti)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 1 (Pensare a Oggetti), Modulo 2 (Classi e Oggetti), Modulo 3 (Attributi, Metodi e Costruttore), Modulo 4 (Incapsulamento)
- **Obiettivo Didattico:** Comprendere il principio dell'ereditarietà, costruire gerarchie di classi in Python con `super()`, effettuare l'override dei metodi, progettare gerarchie a più livelli, e riconoscere lo stesso principio nella sintassi Java con `extends`.

---

<a id="indice"></a>
# 📑 Indice del Modulo 5

1. [Capitolo 1 — Il Problema: Codice Duplicato tra Classi Simili](#capitolo-1)
2. [Capitolo 2 — Cos'è l'Ereditarietà: la Relazione "è un"](#capitolo-2)
3. [Capitolo 3 — La Sintassi in Python: `class Sottoclasse(Superclasse)`](#capitolo-3)
4. [Capitolo 4 — `super()`: Riusare il Costruttore della Classe Madre](#capitolo-4)
5. [Capitolo 5 — Override dei Metodi: Specializzare il Comportamento](#capitolo-5)
6. [Capitolo 6 — Gerarchie a Più Livelli](#capitolo-6)
7. [Capitolo 7 — Ereditarietà in Java: `extends` e `super`](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il Problema: Codice Duplicato tra Classi Simili

Immagina di dover rappresentare, in un programma, sia un'**Automobile** sia una **Moto**. Entrambe sono veicoli: hanno una marca, un modello, una velocità, e sanno accelerare e frenare. Senza uno strumento apposito, saresti costretto a scrivere due classi quasi identiche:

```python
# ==================== ESEMPIO 5.1: IL PROBLEMA DELLA DUPLICAZIONE ====================
"""
Automobile e Moto condividono quasi tutto: marca, modello, velocità,
accelera(), frena(). L'unica vera differenza è il numero di ruote.
Copiare e incollare il codice comune è un errore di progettazione:
se domani cambi la logica di frena(), dovrai ricordarti di modificarla
in OGNI classe che l'ha copiata.
"""

class Automobile:
    def __init__(self, marca, modello):
        self.marca = marca
        self.modello = modello
        self.velocita = 0
        self.ruote = 4

    def accelera(self, incremento):
        self.velocita += incremento

    def frena(self):
        self.velocita = 0

class Moto:
    def __init__(self, marca, modello):     # <-- stesso identico costruttore
        self.marca = marca
        self.modello = modello
        self.velocita = 0
        self.ruote = 2

    def accelera(self, incremento):          # <-- stesso identico metodo
        self.velocita += incremento

    def frena(self):                         # <-- stesso identico metodo
        self.velocita = 0
```

Il problema non è solo "scomodo da scrivere": è un rischio concreto di manutenzione. Serve un modo per dire **"Automobile e Moto sono entrambe un tipo di Veicolo"**, scrivendo la parte comune una volta sola.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Cos'è l'Ereditarietà: la Relazione "è un"

L'**Ereditarietà** è il meccanismo che permette di creare una nuova classe (la **sottoclasse**, o *classe figlia*) a partire da una classe esistente (la **superclasse**, o *classe madre*), ereditandone automaticamente attributi e metodi — e potendone aggiungere o modificare altri.

### 🌳 L'Analogia dell'Albero Genealogico

```
                     Veicolo
                  (marca, modello, velocita)
                  (accelera, frena)
                        │
          ┌─────────────┴─────────────┐
          │                            │
     Automobile                      Moto
   (+ numero_porte)            (+ ha_cavalletto)

  Automobile "eredita" da Veicolo: ha automaticamente marca, modello,
  velocita, accelera() e frena(), SENZA doverli riscrivere.
  In più, aggiunge ciò che la rende specificamente un'Automobile.
```

Il test per riconoscere quando usare l'ereditarietà è la frase **"è un"** (*is-a*, in inglese): un'Automobile **è un** Veicolo; una Moto **è un** Veicolo. Se questa frase ha senso logico tra due entità del tuo problema, l'ereditarietà è probabilmente lo strumento giusto.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — La Sintassi in Python: `class Sottoclasse(Superclasse)`

In Python, per far ereditare una classe da un'altra, basta scrivere il nome della superclasse tra parentesi accanto al nome della sottoclasse:

```python
# ==================== ESEMPIO 5.2: LA PRIMA GERARCHIA ====================
"""
Veicolo è la superclasse: contiene TUTTO ciò che marca, modello,
Automobile e Moto hanno in comune. Automobile e Moto diventano
sottoclassi: ereditano automaticamente __init__, accelera() e frena(),
senza scriverli di nuovo.
"""

class Veicolo:
    def __init__(self, marca, modello):
        self.marca = marca
        self.modello = modello
        self.velocita = 0

    def accelera(self, incremento):
        self.velocita += incremento

    def frena(self):
        self.velocita = 0


class Automobile(Veicolo):    # Automobile EREDITA da Veicolo
    pass                       # per ora non aggiunge nulla di suo


class Moto(Veicolo):          # Moto EREDITA da Veicolo
    pass


auto = Automobile("Fiat", "500")
auto.accelera(50)             # metodo EREDITATO da Veicolo, non riscritto qui
print(f"{auto.marca} {auto.modello} a {auto.velocita} km/h")   # Fiat 500 a 50 km/h

print(isinstance(auto, Veicolo))     # True: Automobile è comunque un Veicolo
print(isinstance(auto, Automobile))  # True
```

Anche se `Automobile` non definisce nulla al suo interno, ha già `__init__`, `accelera()` e `frena()`: li ha **ereditati** da `Veicolo`. E — punto importante, che riprenderai nel Modulo 6 — un oggetto `Automobile` è, a tutti gli effetti, anche un oggetto `Veicolo`: `isinstance()` lo conferma.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — `super()`: Riusare il Costruttore della Classe Madre

Quando una sottoclasse ha bisogno di attributi in più rispetto alla superclasse, non deve riscrivere da capo l'intero costruttore: può richiamare quello della classe madre con `super()`, e poi aggiungere solo ciò che le serve in più.

```python
# ==================== ESEMPIO 5.3: super() NEL COSTRUTTORE ====================
"""
Automobile ora ha un attributo in più: numero_porte.
Invece di riscrivere marca/modello/velocita da zero,
super().__init__(marca, modello) richiama il costruttore di Veicolo,
poi il codice aggiunge solo l'attributo specifico di Automobile.
"""

class Veicolo:
    def __init__(self, marca, modello):
        self.marca = marca
        self.modello = modello
        self.velocita = 0

    def accelera(self, incremento):
        self.velocita += incremento

    def frena(self):
        self.velocita = 0


class Automobile(Veicolo):
    def __init__(self, marca, modello, numero_porte):
        super().__init__(marca, modello)   # riusa il costruttore di Veicolo
        self.numero_porte = numero_porte    # aggiunge SOLO ciò che è nuovo

    def descrivi(self):
        return f"{self.marca} {self.modello}, {self.numero_porte} porte"


auto = Automobile("Fiat", "500", 3)
print(auto.descrivi())         # Fiat 500, 3 porte
print(auto.velocita)           # 0 — attributo ereditato, inizializzato da super()
```

*Perché ti serve: `super()` evita di duplicare codice anche nel costruttore, lo stesso principio che ha motivato l'intero modulo (Capitolo 1) applicato specificamente al momento della creazione dell'oggetto.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Override dei Metodi: Specializzare il Comportamento

Una sottoclasse può anche **ridefinire** (fare l'**override** di) un metodo ereditato, per dargli un comportamento diverso e più specifico. Il nome del metodo resta lo stesso; cambia cosa fa.

```python
# ==================== ESEMPIO 5.4: OVERRIDE DI UN METODO ====================
"""
frena() di Veicolo azzera semplicemente la velocità. Un'Automobile
sportiva, però, potrebbe voler segnalare una frenata più "brusca".
Ridefinendo frena() in Automobile, la NUOVA versione sostituisce
quella ereditata, SOLO per gli oggetti Automobile.
"""

class Veicolo:
    def __init__(self, marca, modello):
        self.marca = marca
        self.modello = modello
        self.velocita = 0

    def accelera(self, incremento):
        self.velocita += incremento

    def frena(self):
        print(f"{self.marca} {self.modello} si ferma.")
        self.velocita = 0


class Automobile(Veicolo):
    def frena(self):                       # OVERRIDE del metodo frena()
        print(f"{self.marca} {self.modello} frena bruscamente, stridendo!")
        self.velocita = 0


class Moto(Veicolo):
    pass    # Moto NON fa l'override: usa la versione ereditata da Veicolo


auto = Automobile("Fiat", "500")
moto = Moto("Honda", "CB500")

auto.frena()    # "Fiat 500 frena bruscamente, stridendo!"     (versione di Automobile)
moto.frena()    # "Honda CB500 si ferma."                       (versione ereditata da Veicolo)
```

L'override è ciò che rende l'ereditarietà davvero potente: non ti obbliga a "prendere tutto in blocco" dalla classe madre, ti permette di **specializzare** esattamente ciò che serve, lasciando invariato il resto.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Gerarchie a Più Livelli

L'ereditarietà non si ferma a un solo livello: una sottoclasse può, a sua volta, diventare la superclasse di un'altra classe ancora più specifica.

```python
# ==================== ESEMPIO 5.5: GERARCHIA A TRE LIVELLI ====================
"""
Veicolo -> Automobile -> AutomobileElettrica
AutomobileElettrica eredita da Automobile (che a sua volta eredita
da Veicolo): ha quindi TUTTO ciò che Veicolo e Automobile offrono,
più i propri attributi specifici (autonomia_km).
"""

class Veicolo:
    def __init__(self, marca, modello):
        self.marca = marca
        self.modello = modello
        self.velocita = 0

    def accelera(self, incremento):
        self.velocita += incremento


class Automobile(Veicolo):
    def __init__(self, marca, modello, numero_porte):
        super().__init__(marca, modello)
        self.numero_porte = numero_porte


class AutomobileElettrica(Automobile):
    def __init__(self, marca, modello, numero_porte, autonomia_km):
        super().__init__(marca, modello, numero_porte)   # richiama Automobile.__init__
        self.autonomia_km = autonomia_km

    def descrivi(self):
        return (f"{self.marca} {self.modello}, {self.numero_porte} porte, "
                f"autonomia {self.autonomia_km} km")


tesla = AutomobileElettrica("Tesla", "Model 3", 4, 500)
tesla.accelera(30)               # ereditato da Veicolo (2 livelli sopra!)
print(tesla.descrivi())          # Tesla Model 3, 4 porte, autonomia 500 km
print(isinstance(tesla, Veicolo))       # True
print(isinstance(tesla, Automobile))    # True
print(isinstance(tesla, AutomobileElettrica))   # True
```

```
   Veicolo  ──────▶  Automobile  ──────▶  AutomobileElettrica
  (livello 1)        (livello 2)              (livello 3)

  Un oggetto AutomobileElettrica È, contemporaneamente,
  un'Automobile E un Veicolo: isinstance() lo conferma per ogni livello.
```

⚠️ Attenzione: gerarchie troppo profonde (4, 5 livelli o più) diventano difficili da seguire e da modificare. Il Modulo 10 (Composizione vs Ereditarietà) ti darà gli strumenti per capire quando è meglio fermarsi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Ereditarietà in Java: `extends` e `super`

Lo stesso principio — sottoclasse che eredita da una superclasse — esiste identico in Java, con la parola chiave `extends`.

```java
// ==================== ESEMPIO 5.6: EREDITARIETÀ IN JAVA ====================
/*
 * Stessa gerarchia Veicolo -> Automobile dell'Esempio 5.3, in Java.
 * 'extends' dichiara l'ereditarietà; 'super(...)' richiama il
 * costruttore della classe madre, esattamente come super().__init__()
 * in Python.
 */

class Veicolo {
    protected String marca;     // 'protected': accessibile dalle sottoclassi
    protected String modello;
    protected int velocita;

    public Veicolo(String marca, String modello) {
        this.marca = marca;
        this.modello = modello;
        this.velocita = 0;
    }

    public void accelera(int incremento) {
        this.velocita += incremento;
    }
}

class Automobile extends Veicolo {     // 'extends' = eredita da Veicolo
    private int numeroPorte;

    public Automobile(String marca, String modello, int numeroPorte) {
        super(marca, modello);          // richiama il costruttore di Veicolo
        this.numeroPorte = numeroPorte;
    }

    public String descrivi() {
        return marca + " " + modello + ", " + numeroPorte + " porte";
    }
}
```

### Confronto diretto Python ↔ Java

| Aspetto | Python | Java |
| :--- | :--- | :--- |
| Dichiarare l'ereditarietà | `class Automobile(Veicolo):` | `class Automobile extends Veicolo {}` |
| Richiamare il costruttore della classe madre | `super().__init__(...)` | `super(...)` |
| Override di un metodo | Si ridefinisce il metodo con lo stesso nome | Uguale, spesso con l'annotazione `@Override` |
| Accesso della sottoclasse agli attributi della madre | Sempre possibile (convenzione) | Richiede `protected` (non `private`) nella superclasse |

Nota l'ultimo punto: in Java, se `marca` fosse stato `private` in `Veicolo` (Modulo 4), `Automobile` non avrebbe potuto accedervi nemmeno tramite ereditarietà — serve il livello intermedio `protected`, pensato apposta per essere condiviso con le sottoclassi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 5

1. L'**ereditarietà** permette a una sottoclasse di riusare automaticamente attributi e metodi di una superclasse, evitando duplicazione di codice.
2. Il test della relazione **"è un"** (is-a) aiuta a riconoscere quando l'ereditarietà è lo strumento giusto.
3. In Python si eredita con `class Sottoclasse(Superclasse):`; `super().__init__(...)` richiama il costruttore della classe madre.
4. L'**override** permette a una sottoclasse di ridefinire un metodo ereditato, specializzandone il comportamento senza toccare la superclasse.
5. Le gerarchie possono avere **più livelli** (`Veicolo → Automobile → AutomobileElettrica`), ma gerarchie troppo profonde vanno usate con cautela.
6. In Java, l'ereditarietà si dichiara con `extends`; per essere accessibili dalle sottoclassi, gli attributi della superclasse devono essere `protected`, non `private`.

---

### 🧪 Laboratorio Pratico: "La Gerarchia Dipendente"

**Obiettivo:** Applicare ereditarietà, `super()` e override su Google Colab, in un contesto aziendale.

1. Crea una classe base `Dipendente` con costruttore `__init__(self, nome, stipendio_base)` e un metodo `calcola_stipendio()` che restituisce semplicemente `stipendio_base`.
2. Crea una sottoclasse `Manager(Dipendente)` che aggiunge un attributo `bonus` nel costruttore (richiamando `super().__init__()` per il resto).
3. In `Manager`, fai l'**override** di `calcola_stipendio()` in modo che restituisca `stipendio_base + bonus`.
4. Crea un oggetto `Dipendente` e un oggetto `Manager`, e stampa lo stipendio di entrambi con `calcola_stipendio()`.
5. **Sfida finale:** verifica con `isinstance()` che un oggetto `Manager` sia sia un `Manager` sia un `Dipendente`.

*Suggerimento:* riusa esattamente la struttura degli Esempi 5.3 (super nel costruttore) e 5.4 (override di un metodo).

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa permette di fare l'ereditarietà, secondo il modulo?
- A) Eliminare completamente la necessità di scrivere metodi
- B) Creare una sottoclasse che riusa automaticamente attributi e metodi di una superclasse
- C) Rendere una classe completamente privata
- D) Trasformare una classe in una funzione

**Domanda 2:** Qual è, secondo il Capitolo 2, il test logico per riconoscere quando usare l'ereditarietà tra due entità?
- A) La relazione "ha un" (has-a)
- B) La relazione "è un" (is-a)
- C) Il numero di attributi in comune, se superiore a 3
- D) Non esiste alcun test: si usa sempre l'ereditarietà quando possibile

**Domanda 3:** A cosa serve `super().__init__(...)` nel costruttore di una sottoclasse?
- A) A eliminare il costruttore della superclasse
- B) A richiamare il costruttore della superclasse, evitando di riscriverne la logica da capo
- C) A creare automaticamente un nuovo oggetto della superclasse
- D) A impedire che la sottoclasse acceda agli attributi della superclasse

**Domanda 4:** Cosa significa fare l'"override" di un metodo?
- A) Eliminare definitivamente un metodo dalla superclasse
- B) Ridefinire, in una sottoclasse, un metodo ereditato, dandogli un comportamento diverso e più specifico
- C) Rendere un metodo accessibile da qualsiasi altra classe del programma
- D) Duplicare un metodo con un nome diverso

---

[🔙 Torna all'indice](#indice)