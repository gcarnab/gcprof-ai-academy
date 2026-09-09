# 🧩 Modulo 7 — Astrazione: Classi Astratte e Interfacce

- **Corso:** OOP Explorer — Programmazione ad Oggetti con Python e Java
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Gerarchie e Comportamenti)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 5 (Ereditarietà), Modulo 6 (Polimorfismo), conoscenza base di Python (classi, `__init__`, `super()`)
- **Obiettivo Didattico:** Capire cos'è una classe astratta e perché serve, usare il modulo `abc` di Python per definire metodi astratti, comprendere il concetto di "contratto" tra classe madre e sottoclassi, e confrontare l'astrazione Python con le interfacce di Java.

---

<a id="indice"></a>
# 📑 Indice del Modulo 7

1. [Capitolo 1 — Il problema del "contratto mancante"](#capitolo-1)
2. [Capitolo 2 — Cos'è una classe astratta](#capitolo-2)
3. [Capitolo 3 — Il modulo `abc`: `ABC` e `@abstractmethod`](#capitolo-3)
4. [Capitolo 4 — Perché non si può istanziare una classe astratta](#capitolo-4)
5. [Capitolo 5 — Il concetto di "contratto" tra classi](#capitolo-5)
6. [Capitolo 6 — Classi astratte con metodi già implementati](#capitolo-6)
7. [Capitolo 7 — Interfacce in altri linguaggi: uno sguardo a Java](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il problema del "contratto mancante"

Nel Modulo 6 hai visto il **polimorfismo**: oggetti di classi diverse che rispondono allo stesso "comando" (`.area()`, `.muovi()`, ...) ciascuno a modo proprio, grazie all'*override*. Ma c'è un rischio nascosto in questo meccanismo: **nulla obbliga** una sottoclasse a implementare davvero quel metodo.

```python
# ==================== ESEMPIO 7.1: IL PROBLEMA SENZA ASTRAZIONE ====================
"""
Definiamo una gerarchia di forme geometriche in stile "normale" (Modulo 5/6).
Il problema: se un programmatore distratto dimentica di ridefinire area()
in una sottoclasse, il programma NON avvisa nulla finché non ci si accorge
del comportamento sbagliato — magari mesi dopo, in produzione.
"""

class Forma:
    def area(self):
        pass   # "dovrebbe" essere ridefinito, ma nessuno lo impone davvero

class Cerchio(Forma):
    def __init__(self, raggio):
        self.raggio = raggio

    def area(self):
        return 3.14159 * self.raggio ** 2

class Quadrato(Forma):
    def __init__(self, lato):
        self.lato = lato
    # ⚠️ Ci siamo dimenticati di ridefinire area()!

quadrato1 = Quadrato(5)
print(f"Area del quadrato: {quadrato1.area()}")
# Output: None — nessun errore, nessun avviso: solo un risultato sbagliato,
# scoperto solo se qualcuno lo nota "a occhio".
```

Il problema non è la sintassi: è che `Forma` **non ha modo di imporre una regola** alle sue sottoclassi. Serve uno strumento che dica, con la forza di un errore bloccante: *"ogni Forma DEVE avere un metodo area() funzionante, altrimenti non può nemmeno esistere"*. Questo strumento si chiama **classe astratta**.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Cos'è una classe astratta

Una **classe astratta** è una classe che:

* **non può mai essere istanziata direttamente** (non puoi creare un oggetto "generico" da essa);
* serve solo come **modello/progetto** da cui devono derivare altre classi (le sottoclassi);
* può dichiarare uno o più **metodi astratti**: metodi senza un'implementazione completa, che ogni sottoclasse è **obbligata** a ridefinire.

### 📐 L'Analogia del Progetto Architettonico

```
        CLASSE ASTRATTA "Forma"              SOTTOCLASSI CONCRETE
      ┌───────────────────────┐
      │  area()  → OBBLIGATORIO│      ──▶   Cerchio    (area = π·r²)
      │  perimetro() → OBBLIG. │      ──▶   Quadrato   (area = lato²)
      └───────────────────────┘      ──▶   Rettangolo  (area = base·altezza)

   "Forma" non è mai costruibile da sola: è solo la REGOLA
   che ogni forma concreta deve rispettare per poter esistere.
```

Non stai imparando un concetto nuovo dal nulla: è la stessa idea di un modulo obbligatorio in un corso di studi — nessuno "consegue il diploma" restando sul "modulo generico", ma ogni indirizzo (concreto) deve comunque completarlo secondo regole precise.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Il modulo `abc`: `ABC` e `@abstractmethod`

Python offre il modulo built-in **`abc`** (*Abstract Base Classes*) per costruire classi astratte in modo esplicito e sicuro.

```python
# ==================== ESEMPIO 7.2: LA CLASSE ASTRATTA FORMA ====================
"""
Riscriviamo Forma come classe astratta:
1. Eredita da ABC (Abstract Base Class).
2. I metodi che OGNI sottoclasse deve ridefinire vengono marcati
   con il decoratore @abstractmethod, e il loro corpo resta vuoto (pass).
"""
from abc import ABC, abstractmethod

class Forma(ABC):
    """Classe astratta: definisce il 'contratto' di ogni forma geometrica."""

    @abstractmethod
    def area(self):
        """Ogni sottoclasse DEVE fornire la propria formula dell'area."""
        pass

    @abstractmethod
    def perimetro(self):
        """Ogni sottoclasse DEVE fornire la propria formula del perimetro."""
        pass
```

* Ereditare da `ABC` dice a Python: *"questa classe non deve mai essere costruita direttamente"*.
* Il decoratore `@abstractmethod`, applicato a un metodo, dice: *"chi eredita da questa classe deve ridefinire questo metodo, oppure non potrà essere istanziato nemmeno lui"*.

*Perché ti serve: da qui in poi, ogni volta che progetterai una gerarchia in cui tutte le sottoclassi DEVONO condividere un certo comportamento (ma ciascuna a modo proprio), `ABC` e `@abstractmethod` sono lo strumento giusto — non una semplice convenzione, ma una regola che Python fa rispettare.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Perché non si può istanziare una classe astratta

Il punto centrale di questo modulo: se provi a creare un oggetto direttamente dalla classe astratta, o da una sottoclasse che non ha ridefinito *tutti* i metodi astratti, Python **blocca il programma** con un errore esplicito.

```python
# ==================== ESEMPIO 7.3: L'ERRORE (VOLUTO) DELL'ASTRAZIONE ====================
"""
Proviamo a istanziare Forma direttamente, e poi una sottoclasse incompleta.
In entrambi i casi Python impedisce la creazione dell'oggetto: è la
protezione automatica che il Modulo 6 (polimorfismo) da solo non offriva.
"""

# 1) Istanziare la classe astratta direttamente
forma_generica = Forma()
# TypeError: Can't instantiate abstract class Forma with abstract methods area, perimetro

# 2) Una sottoclasse che dimentica un metodo astratto
class QuadratoIncompleto(Forma):
    def __init__(self, lato):
        self.lato = lato

    def area(self):
        return self.lato ** 2
    # perimetro() non è stato ridefinito!

quadrato_rotto = QuadratoIncompleto(5)
# TypeError: Can't instantiate abstract class QuadratoIncompleto
# with abstract method perimetro
```

A confronto con l'Esempio 7.1: lì l'errore restava silenzioso (`None`, scoperto solo "a occhio"); qui il programma **si rifiuta di partire** finché il "contratto" non è rispettato per intero. È l'astrazione che trasforma un bug nascosto in un errore immediato e chiaro.

```python
# ==================== ESEMPIO 7.4: LA SOTTOCLASSE CORRETTA ====================
"""
Ora completiamo davvero il contratto: Cerchio e Rettangolo ridefiniscono
ENTRAMBI i metodi astratti, quindi possono essere istanziati normalmente.
"""

class Cerchio(Forma):
    def __init__(self, raggio):
        self.raggio = raggio

    def area(self):
        return 3.14159 * self.raggio ** 2

    def perimetro(self):
        return 2 * 3.14159 * self.raggio


class Rettangolo(Forma):
    def __init__(self, base, altezza):
        self.base = base
        self.altezza = altezza

    def area(self):
        return self.base * self.altezza

    def perimetro(self):
        return 2 * (self.base + self.altezza)


cerchio1 = Cerchio(4)
rettangolo1 = Rettangolo(3, 5)

print(f"Area cerchio: {cerchio1.area():.2f}")         # 50.27
print(f"Area rettangolo: {rettangolo1.area()}")       # 15

# Il polimorfismo del Modulo 6 ora è "garantito": ogni Forma nella lista
# ha SICURAMENTE un'area() funzionante, senza bisogno di verificarlo.
for forma in [cerchio1, rettangolo1]:
    print(f"{type(forma).__name__} → area: {forma.area():.2f}")
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Il concetto di "contratto" tra classi

Il termine giusto per descrivere ciò che stai imparando è **contratto**: un accordo formale tra la classe astratta e le sue sottoclassi.

| Chi | Cosa promette |
| :--- | :--- |
| **La classe astratta (`Forma`)** | "Ogni forma concreta avrà sicuramente un `area()` e un `perimetro()` funzionanti — puoi contare su questa interfaccia comune." |
| **La sottoclasse (`Cerchio`, `Rettangolo`, ...)** | "Se voglio esistere come oggetto, DEVO rispettare il contratto: implementare tutti i metodi astratti richiesti." |

Questo è utile soprattutto quando **altre parti del programma** — magari scritte da altri sviluppatori, o mesi dopo — devono lavorare con "una qualsiasi Forma" senza sapere quale sarà nello specifico:

```python
# ==================== ESEMPIO 7.5: PERCHÉ IL CONTRATTO CONTA DAVVERO ====================
"""
Questa funzione non sa (e non le interessa) se riceverà un Cerchio,
un Rettangolo o una forma che ancora non esiste. Le basta sapere che,
GRAZIE al contratto imposto da Forma(ABC), ogni oggetto ricevuto avrà
sicuramente un'area() valida. Nessun controllo extra è necessario.
"""

def stampa_area_totale(elenco_forme):
    totale = sum(forma.area() for forma in elenco_forme)
    print(f"Area totale del giardino: {totale:.2f} m²")

stampa_area_totale([cerchio1, rettangolo1])
```

Se domani aggiungerai una classe `Triangolo(Forma)`, questa funzione continuerà a funzionare **senza modifiche**: è il contratto, non il codice della funzione, a garantire che ogni forma sappia calcolare la propria area.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Classi astratte con metodi già implementati

Una classe astratta **non deve essere per forza vuota**: può contenere anche metodi concreti, già completamente implementati, che le sottoclassi ereditano così come sono (esattamente come nell'ereditarietà "normale" del Modulo 5). Astrazione ed ereditarietà, qui, lavorano insieme.

```python
# ==================== ESEMPIO 7.6: METODI ASTRATTI + METODI CONCRETI ====================
"""
Forma può avere ANCHE un metodo già scritto, come descrivi(), che usa
al suo interno il metodo astratto area() — anche se quest'ultimo non è
ancora implementato *in Forma stessa*, sarà sicuramente disponibile
in ogni sottoclasse concreta grazie al contratto.
"""
from abc import ABC, abstractmethod

class Forma(ABC):

    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimetro(self):
        pass

    def descrivi(self):
        """Metodo CONCRETO: già pronto, ereditato da ogni sottoclasse."""
        nome = type(self).__name__
        return f"{nome}: area = {self.area():.2f}, perimetro = {self.perimetro():.2f}"


class Cerchio(Forma):
    def __init__(self, raggio):
        self.raggio = raggio

    def area(self):
        return 3.14159 * self.raggio ** 2

    def perimetro(self):
        return 2 * 3.14159 * self.raggio


cerchio1 = Cerchio(4)
print(cerchio1.descrivi())
# Output: Cerchio: area = 50.27, perimetro = 25.13
# 'descrivi()' non è mai stato scritto in Cerchio: viene ereditato da Forma,
# e usa correttamente area() e perimetro() perché sa che ESISTERANNO.
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Interfacce in altri linguaggi: uno sguardo a Java

Il bisogno di imporre un "contratto" tra classi non è specifico di Python: è un'esigenza universale dell'OOP. Java — che approfondirai nel Modulo 11 — offre due strumenti distinti per questo scopo: le **classi astratte** (`abstract class`, molto simili a quelle Python) e le **interfacce** (`interface`), pensate esclusivamente per definire contratti puri.

```java
// ==================== ESEMPIO 7.7: UN'INTERFACCIA IN JAVA ====================
/*
 * Un'interfaccia Java elenca SOLO le "firme" dei metodi (nome, parametri,
 * tipo restituito), senza alcuna implementazione: è un contratto puro,
 * ancora più rigido della classe astratta Python.
 */

interface Forma {
    double area();       // nessun corpo: solo la promessa che esisterà
    double perimetro();
}

class Cerchio implements Forma {
    private double raggio;

    public Cerchio(double raggio) {
        this.raggio = raggio;
    }

    // 'implements' obbliga a fornire OGNI metodo dell'interfaccia
    public double area() {
        return 3.14159 * raggio * raggio;
    }

    public double perimetro() {
        return 2 * 3.14159 * raggio;
    }
}
```

### Confronto diretto Python ↔ Java

| Aspetto | Python (`abc`) | Java |
| :--- | :--- | :--- |
| Classe astratta | `class Forma(ABC):` | `abstract class Forma { ... }` |
| Metodo astratto | `@abstractmethod` | `abstract double area();` |
| Contratto "puro" (solo firme, nessuna logica condivisa) | Possibile, ma non ha una parola chiave dedicata | `interface Forma { ... }`, implementata con `implements` |
| Istanziazione diretta | Bloccata da Python con `TypeError` | Bloccata dal compilatore, prima ancora dell'esecuzione |
| Ereditarietà multipla di contratti | Una classe può ereditare da più `ABC` | Una classe può implementare più `interface` contemporaneamente |

In Python, `ABC` copre praticamente entrambi i ruoli (classe astratta e interfaccia); in Java i due strumenti sono formalmente distinti, ma **l'idea di fondo — un contratto che le classi concrete devono rispettare — è esattamente la stessa** che hai imparato in questo modulo.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 7

1. Una **classe astratta** è un modello che non può mai essere istanziato direttamente: serve solo come base per altre classi.
2. In Python si costruisce ereditando da **`ABC`** (modulo `abc`) e marcando i metodi obbligatori con **`@abstractmethod`**.
3. Se una sottoclasse non ridefinisce **tutti** i metodi astratti, Python impedisce di istanziarla, sollevando un `TypeError` chiaro e immediato.
4. Il rapporto tra classe astratta e sottoclassi è un **contratto**: la prima garantisce un'interfaccia comune, le seconde si impegnano a rispettarla.
5. Una classe astratta può contenere **anche metodi concreti**, già implementati, che le sottoclassi ereditano normalmente.
6. In Java lo stesso bisogno si esprime con **`abstract class`** (simile a Python) e con le **`interface`** (contratti puri, implementabili in numero multiplo con `implements`).

---

### 🧪 Laboratorio Pratico: "Il Contratto dei Dipendenti"

**Obiettivo:** Applicare da soli `ABC` e `@abstractmethod` su Google Colab.

1. Definisci una classe astratta `Dipendente(ABC)` con due metodi astratti: `calcola_stipendio()` e `descrivi_ruolo()`.
2. Crea due sottoclassi concrete, `DipendenteFisso` e `DipendenteACommissione`, ciascuna con la propria formula per `calcola_stipendio()` (es. stipendio fisso vs. base + percentuale sulle vendite).
3. Prova a istanziare `Dipendente()` direttamente e osserva l'errore che Python restituisce: annota il messaggio esatto.
4. Crea di proposito una terza sottoclasse `DipendenteIncompleto` che dimentica di ridefinire `descrivi_ruolo()`: verifica che anche questa non sia istanziabile.
5. **Sfida finale:** aggiungi a `Dipendente` un metodo concreto `busta_paga()` che usa al suo interno `calcola_stipendio()` (come nell'Esempio 7.6) e chiamalo su entrambe le sottoclassi corrette.

*Suggerimento:* riusa esattamente la struttura degli Esempi 7.2, 7.4 e 7.6 di questo modulo, cambiando solo il nome della classe, dei metodi e degli attributi.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa impedisce, in Python, di istanziare direttamente una classe che eredita da `ABC` e ha almeno un metodo astratto non implementato?
- A) Nulla: Python crea comunque l'oggetto, ma con un attributo mancante
- B) Python solleva un `TypeError` e blocca la creazione dell'oggetto
- C) Il programma si blocca solo se si prova a stampare l'oggetto
- D) Serve un permesso esplicito dell'utente a runtime

**Domanda 2:** Cosa fa esattamente il decoratore `@abstractmethod` applicato a un metodo di una classe che eredita da `ABC`?
- A) Rende il metodo più veloce da eseguire
- B) Obbliga ogni sottoclasse concreta a ridefinire quel metodo, altrimenti non potrà essere istanziata
- C) Elimina il metodo dalla classe
- D) Permette di chiamare il metodo senza creare un oggetto

**Domanda 3:** Una classe astratta può contenere anche metodi già completamente implementati (concreti)?
- A) No, mai: una classe astratta può contenere solo metodi astratti
- B) Sì, e le sottoclassi li ereditano normalmente, come nell'ereditarietà "classica"
- C) Sì, ma solo se la sottoclasse li ridefinisce comunque
- D) No, altrimenti la classe smette di essere astratta

**Domanda 4:** Qual è, secondo il Capitolo 7, la differenza principale tra una classe astratta e un'interfaccia in Java?
- A) Non c'è alcuna differenza: sono sinonimi
- B) L'interfaccia (`interface`) definisce un contratto puro senza implementazioni condivise, mentre la classe astratta può contenere anche logica già scritta
- C) Le interfacce esistono solo in Python, non in Java
- D) Le classi astratte in Java possono essere istanziate direttamente, le interfacce no

---

[🔙 Torna all'indice](#indice)