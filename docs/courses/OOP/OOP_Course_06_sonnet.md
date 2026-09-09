# 🧩 Modulo 6 — Polimorfismo: Un'Interfaccia, Comportamenti Diversi

- **Corso:** OOP Explorer — Programmazione ad Oggetti con Python e Java
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Gerarchie e Comportamenti)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 1-4 (Fondamenta dell'OOP), Modulo 5 (Ereditarietà — in particolare l'override dei metodi)
- **Obiettivo Didattico:** Comprendere il polimorfismo come conseguenza dell'override, scrivere codice generico che funziona su oggetti di classi diverse, riconoscere il *duck typing* tipico di Python, distinguere polimorfismo e overloading, e osservare lo stesso principio in Java.

---

<a id="indice"></a>
# 📑 Indice del Modulo 6

1. [Capitolo 1 — Il Problema: Codice Pieno di Controlli sul Tipo](#capitolo-1)
2. [Capitolo 2 — Cos'è il Polimorfismo: Una Forma, Molte Sostanze](#capitolo-2)
3. [Capitolo 3 — Polimorfismo tramite Override: Lo Stesso Metodo, Comportamenti Diversi](#capitolo-3)
4. [Capitolo 4 — Iterare su Oggetti Diversi con la Stessa Interfaccia](#capitolo-4)
5. [Capitolo 5 — Duck Typing: "Se Cammina Come un'Anatra..."](#capitolo-5)
6. [Capitolo 6 — Polimorfismo vs Overloading: Chiarire un Equivoco Frequente](#capitolo-6)
7. [Capitolo 7 — Polimorfismo in Java: `@Override` e i Limiti del Duck Typing](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il Problema: Codice Pieno di Controlli sul Tipo

Riprendiamo la gerarchia `Veicolo → Automobile, Moto` del Modulo 5. Immagina di dover scrivere una funzione che fa muovere una lista di veicoli diversi. Senza polimorfismo, saresti tentato di scrivere così:

```python
# ==================== ESEMPIO 6.1: IL PROBLEMA DEI CONTROLLI ESPLICITI ====================
"""
Questo codice "funziona", ma è fragile: ogni volta che aggiungi un
nuovo tipo di veicolo (Camion, Bicicletta, ...), devi tornare qui
e aggiungere un nuovo elif. Il codice che USA i veicoli deve conoscere
in anticipo TUTTI i tipi possibili: è l'opposto della modularità
di cui hai letto nel Modulo 1.
"""

class Automobile:
    def __init__(self, marca):
        self.marca = marca

class Moto:
    def __init__(self, marca):
        self.marca = marca

def muovi_veicolo(veicolo):
    if isinstance(veicolo, Automobile):
        print(f"{veicolo.marca} avanza sulle quattro ruote.")
    elif isinstance(veicolo, Moto):
        print(f"{veicolo.marca} sfreccia in due ruote.")
    # ...e se domani arriva un Camion? Un altro elif da aggiungere qui.

muovi_veicolo(Automobile("Fiat"))
muovi_veicolo(Moto("Honda"))
```

Ogni nuovo tipo di veicolo richiede di modificare questa funzione. È esattamente il problema che il **polimorfismo** risolve.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Cos'è il Polimorfismo: Una Forma, Molte Sostanze

**Polimorfismo** significa letteralmente "molte forme". In OOP indica la capacità di oggetti di classi diverse di rispondere **allo stesso "comando"** (lo stesso nome di metodo), ciascuno a modo proprio.

### 🎮 L'Analogia del Tasto "Azione"

```
          Tasto "AZIONE"  (stesso comando per tutti)
                 │
   ┌─────────────┼─────────────┬──────────────┐
   ▼              ▼             ▼              ▼
Personaggio    Personaggio   Personaggio    Personaggio
  Guerriero      Mago        Arciere        Ladro
   │              │             │              │
"attacca con   "lancia un    "scocca una   "si intrufola
  la spada"     incantesimo"   freccia"      di soppiatto"

  Lo stesso tasto ("azione"), premuto su personaggi diversi,
  produce un effetto diverso — ma chi preme il tasto non ha
  bisogno di sapere in anticipo QUALE personaggio ha davanti.
```

Non serve conoscere in anticipo il tipo esatto dell'oggetto: basta sapere che **risponde** a un certo metodo. È lo stesso principio che, nei prossimi capitoli, elimina la necessità dei controlli `isinstance()`/`elif` visti nel Capitolo 1.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Polimorfismo tramite Override: Lo Stesso Metodo, Comportamenti Diversi

Il polimorfismo, nella sua forma più comune, è una **conseguenza diretta dell'override** che hai visto nel Modulo 5: se più sottoclassi ridefiniscono lo stesso metodo ereditato, ciascuna a modo proprio, quel metodo diventa polimorfico.

```python
# ==================== ESEMPIO 6.2: POLIMORFISMO TRAMITE OVERRIDE ====================
"""
Automobile e Moto ereditano da Veicolo, ma ciascuna fa l'OVERRIDE
di muovi() a modo proprio. 'veicolo.muovi()' chiama sempre lo stesso
NOME di metodo, ma il comportamento eseguito dipende dal tipo REALE
dell'oggetto — questo è il polimorfismo in azione.
"""

class Veicolo:
    def __init__(self, marca):
        self.marca = marca

    def muovi(self):
        print(f"{self.marca} si muove.")     # comportamento generico di default


class Automobile(Veicolo):
    def muovi(self):                          # override
        print(f"{self.marca} avanza sulle quattro ruote.")


class Moto(Veicolo):
    def muovi(self):                          # override
        print(f"{self.marca} sfreccia in due ruote.")


# Ogni oggetto risponde a .muovi() a modo proprio: NESSUN if/elif necessario
for veicolo in [Automobile("Fiat"), Moto("Honda"), Veicolo("Generico")]:
    veicolo.muovi()

# Output:
# Fiat avanza sulle quattro ruote.
# Honda sfreccia in due ruote.
# Generico si muove.
```

Rispetto all'Esempio 6.1, questa funzione (in realtà il ciclo `for`) non ha bisogno di sapere nulla sul tipo specifico di ciascun veicolo: chiama semplicemente `.muovi()` e lascia che sia **l'oggetto stesso** a decidere come comportarsi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Iterare su Oggetti Diversi con la Stessa Interfaccia

Il vero potere del polimorfismo emerge quando scrivi funzioni **generiche**, capaci di lavorare su qualunque oggetto che "risponda" al metodo giusto — anche se le classi non hanno alcuna relazione tra loro.

```python
# ==================== ESEMPIO 6.3: UNA FUNZIONE VERAMENTE GENERICA ====================
"""
raduno_veicoli() non controlla MAI il tipo di ciascun veicolo:
si fida del fatto che ogni oggetto passato abbia un metodo muovi().
Aggiungere un nuovo tipo di veicolo in futuro (es. Camion) non
richiederà alcuna modifica a questa funzione: basterà che la nuova
classe implementi anch'essa muovi().
"""

def raduno_veicoli(lista_veicoli):
    print("=== Inizio del raduno ===")
    for v in lista_veicoli:
        v.muovi()          # nessun controllo sul tipo: ci si fida dell'interfaccia comune
    print(f"=== {len(lista_veicoli)} veicoli si sono mossi ===")

veicoli = [Automobile("Fiat"), Moto("Honda"), Automobile("Tesla")]
raduno_veicoli(veicoli)
```

Questo stile — scrivere codice che si aspetta "un oggetto che sappia fare X", senza preoccuparsi della sua classe esatta — è così centrale in Python da avere un nome specifico, che vedrai nel prossimo capitolo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Duck Typing: "Se Cammina Come un'Anatra..."

Python porta il polimorfismo un passo oltre rispetto a molti altri linguaggi: **non richiede nemmeno una relazione di ereditarietà comune** tra gli oggetti. Se un oggetto possiede il metodo giusto, funziona — indipendentemente dalla sua classe di origine. Questo comportamento si chiama **duck typing**, da un detto inglese: *"se cammina come un'anatra e starnazza come un'anatra, allora è un'anatra"*.

```python
# ==================== ESEMPIO 6.4: DUCK TYPING ====================
"""
Bicicletta NON eredita da Veicolo: è una classe completamente
indipendente. Eppure ha anch'essa un metodo muovi(), con la stessa
"forma" (stesso nome, nessun parametro oltre self). La funzione
raduno_veicoli() dell'Esempio 6.3, senza alcuna modifica, funziona
perfettamente anche con lei: a Python non interessa la parentela,
solo che l'oggetto "sappia fare" .muovi().
"""

class Bicicletta:              # NOTA: nessuna eredità da Veicolo!
    def __init__(self, marca):
        self.marca = marca

    def muovi(self):
        print(f"{self.marca} pedala silenziosamente.")

# Stessa funzione dell'Esempio 6.3, riusata senza modifiche
veicoli_misti = [Automobile("Fiat"), Bicicletta("Bianchi"), Moto("Honda")]
raduno_veicoli(veicoli_misti)   # funziona: a Python basta che ognuno abbia .muovi()
```

*Perché ti serve: questo è il motivo per cui, in Python, non è sempre necessario costruire una gerarchia di ereditarietà "solo" per ottenere il polimorfismo — a volte basta rispettare la stessa interfaccia. Nel Modulo 7 (Astrazione) vedrai comunque come **imporre** formalmente questa interfaccia, quando serve maggiore rigore.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Polimorfismo vs Overloading: Chiarire un Equivoco Frequente

È facile confondere il polimorfismo con l'**overloading** (letteralmente "sovraccarico"): la possibilità di definire più versioni dello stesso metodo, distinte dal numero o dal tipo di parametri. Sono due concetti diversi:

| | Polimorfismo (override) | Overloading |
| :--- | :--- | :--- |
| Cosa cambia | La classe dell'oggetto che riceve la chiamata | Il numero/tipo di parametri passati allo stesso metodo |
| Quando si decide quale versione eseguire | A runtime, in base al tipo reale dell'oggetto | A compile-time (in linguaggi come Java), in base alla firma |
| Supportato nativamente in Python? | Sì, pienamente (è ciò che hai visto in questo modulo) | No: Python non permette due metodi con lo stesso nome e parametri diversi nella stessa classe — l'ultimo definito sovrascrive il precedente |

```python
# ==================== ESEMPIO 6.5: PYTHON NON SUPPORTA L'OVERLOADING "CLASSICO" ====================
"""
Attenzione: in Python, definire due volte lo STESSO metodo nella
STESSA classe non crea due versioni overloaded. La seconda definizione
sovrascrive semplicemente la prima. Per simulare parametri opzionali,
Python usa i valori di default (già visti nel Modulo 3).
"""

class Calcolatrice:
    def somma(self, a, b):
        return a + b

    def somma(self, a, b, c):     # questa RISCRIVE il metodo somma() sopra!
        return a + b + c

calc = Calcolatrice()
# calc.somma(2, 3)      # TypeError: manca il parametro 'c' — la prima versione non esiste più!
print(calc.somma(2, 3, 4))    # 9 — funziona solo questa versione

# Il modo "Python" per ottenere flessibilità è un valore di default:
class CalcolatriceCorretta:
    def somma(self, a, b, c=0):
        return a + b + c

calc2 = CalcolatriceCorretta()
print(calc2.somma(2, 3))         # 5
print(calc2.somma(2, 3, 4))      # 9
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Polimorfismo in Java: `@Override` e i Limiti del Duck Typing

Anche in Java il polimorfismo esiste tramite override, con la stessa logica di runtime del Capitolo 3 — ma con due differenze importanti rispetto a Python.

```java
// ==================== ESEMPIO 6.6: POLIMORFISMO IN JAVA ====================
class Veicolo {
    protected String marca;

    public Veicolo(String marca) { this.marca = marca; }

    public void muovi() {
        System.out.println(marca + " si muove.");
    }
}

class Automobile extends Veicolo {
    public Automobile(String marca) { super(marca); }

    @Override                              // annotazione: dichiara esplicitamente l'override
    public void muovi() {
        System.out.println(marca + " avanza sulle quattro ruote.");
    }
}

class Moto extends Veicolo {
    public Moto(String marca) { super(marca); }

    @Override
    public void muovi() {
        System.out.println(marca + " sfreccia in due ruote.");
    }
}

// In un metodo main, un array di tipo Veicolo[] può contenere sia
// Automobile che Moto: chiamare .muovi() su ciascuno produce
// output diversi, ESATTAMENTE come nell'Esempio 6.2 in Python.
```

### Differenze chiave rispetto a Python

1. **`@Override`** è un'annotazione facoltativa ma fortemente raccomandata: segnala esplicitamente "questo metodo sta facendo l'override di uno della superclasse", e il compilatore avvisa se, per errore, non lo sta facendo davvero.
2. **Java non ha il duck typing** del Capitolo 5: perché una `Bicicletta` possa essere usata al posto di un `Veicolo`, **deve** ereditare da `Veicolo` (o implementarne un'interfaccia, concetto che approfondirai nel Modulo 7). In Python bastava avere lo stesso metodo; in Java serve una relazione formale dichiarata nel codice.
3. Java **supporta davvero l'overloading** (a differenza di Python): puoi definire più metodi con lo stesso nome nella stessa classe, purché abbiano un numero o un tipo di parametri diversi — il compilatore sceglie la versione giusta in base alla chiamata.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 6

1. Il **polimorfismo** è la capacità di oggetti di classi diverse di rispondere allo stesso nome di metodo, ciascuno con un comportamento proprio.
2. Nella forma più comune, il polimorfismo è una diretta conseguenza dell'**override** (Modulo 5): più sottoclassi ridefiniscono lo stesso metodo.
3. Il polimorfismo permette di scrivere funzioni generiche (es. `raduno_veicoli()`) che non hanno bisogno di controllare il tipo di ciascun oggetto.
4. Il **duck typing** estende il polimorfismo in Python: non serve nemmeno una relazione di ereditarietà comune, basta che l'oggetto abbia il metodo giusto.
5. Polimorfismo e **overloading** sono concetti diversi: Python non supporta l'overloading "classico" (l'ultima definizione di un metodo sovrascrive le precedenti).
6. In Java il polimorfismo si esprime con `@Override`, ma il duck typing non esiste: serve sempre una relazione esplicita (ereditarietà o interfaccia) tra le classi.

---

### 🧪 Laboratorio Pratico: "La Famiglia delle Forme"

**Obiettivo:** Applicare polimorfismo e duck typing su Google Colab.

1. Crea una classe base `Forma` con un metodo `calcola_area()` che restituisce `0` (comportamento di default generico).
2. Crea due sottoclassi, `Quadrato(Forma)` e `Cerchio(Forma)`, ciascuna con il proprio costruttore (`lato` per il quadrato, `raggio` per il cerchio) e il proprio **override** di `calcola_area()`.
3. Crea una classe `Triangolo` **senza farla ereditare da `Forma`**, ma dandole comunque un metodo `calcola_area()` coerente (duck typing).
4. Scrivi una funzione `stampa_aree(lista_forme)` che itera sulla lista e stampa l'area di ciascuna forma, senza mai controllare il tipo con `isinstance()`.
5. Chiama `stampa_aree()` passando una lista mista di `Quadrato`, `Cerchio` e `Triangolo`, e verifica che funzioni per tutti e tre.

*Suggerimento:* riusa esattamente la struttura degli Esempi 6.3 (funzione generica) e 6.4 (duck typing).

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa si intende, in OOP, per "polimorfismo"?
- A) La possibilità di creare più oggetti dalla stessa classe
- B) La capacità di oggetti di classi diverse di rispondere allo stesso nome di metodo, ciascuno con un comportamento proprio
- C) Un sinonimo esatto di ereditarietà
- D) La possibilità di nascondere gli attributi di un oggetto

**Domanda 2:** Da quale meccanismo, visto nel Modulo 5, deriva più comunemente il polimorfismo mostrato in questo modulo?
- A) Dal costruttore `__init__`
- B) Dall'override dei metodi nelle sottoclassi
- C) Dagli attributi di classe
- D) Dal decoratore `@property`

**Domanda 3:** Cosa rende possibile il "duck typing" in Python, secondo il Capitolo 5?
- A) La presenza obbligatoria di una relazione di ereditarietà comune tra le classi
- B) Il fatto che Python si fidi che un oggetto abbia il metodo giusto, indipendentemente dalla sua classe di origine o da una relazione di ereditarietà
- C) L'uso esclusivo di attributi privati
- D) L'annotazione `@Override`, importata anche in Python

**Domanda 4:** Qual è la differenza principale tra polimorfismo e overloading, secondo il Capitolo 6?
- A) Sono esattamente lo stesso concetto, solo con nomi diversi
- B) Il polimorfismo sceglie il comportamento a runtime in base al tipo dell'oggetto; l'overloading (non supportato nativamente in Python) sceglierebbe la versione del metodo in base ai parametri passati
- C) L'overloading esiste solo in Python, il polimorfismo solo in Java
- D) Il polimorfismo riguarda solo gli attributi, mai i metodi

---

[🔙 Torna all'indice](#indice)