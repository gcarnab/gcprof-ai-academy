# 🧩 Modulo 8 — Metodi Speciali: Personalizzare il Comportamento degli Oggetti

- **Corso:** OOP Explorer — Programmazione ad Oggetti con Python e Java
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Gerarchie e Comportamenti)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 1-6 (Fondamenta dell'OOP, Ereditarietà, Polimorfismo)
- **Obiettivo Didattico:** Riconoscere i metodi speciali ("dunder") di Python, rendere le proprie classi leggibili con `__str__`/`__repr__`, confrontabili con `__eq__`, dotate di una "lunghezza" con `__len__`, e utilizzabili con operatori come `+` tramite `__add__`, riconoscendo l'equivalente (e i limiti) in Java.

---

<a id="indice"></a>
# 📑 Indice del Modulo 8

1. [Capitolo 1 — Il Problema: Oggetti Illeggibili e Non Confrontabili](#capitolo-1)
2. [Capitolo 2 — Cosa Sono i Metodi Speciali (i "Dunder")](#capitolo-2)
3. [Capitolo 3 — `__str__` e `__repr__`: Rappresentare un Oggetto come Testo](#capitolo-3)
4. [Capitolo 4 — `__eq__`: Confrontare Oggetti con `==`](#capitolo-4)
5. [Capitolo 5 — `__len__`: Dare una "Lunghezza" a un Oggetto](#capitolo-5)
6. [Capitolo 6 — `__add__` e l'Operator Overloading](#capitolo-6)
7. [Capitolo 7 — Metodi Speciali in Java: `toString()`, `equals()` e i Limiti dell'Overloading](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il Problema: Oggetti Illeggibili e Non Confrontabili

Prova a stampare, o a confrontare, un oggetto creato con le classi che hai scritto finora:

```python
# ==================== ESEMPIO 8.1: IL PROBLEMA DEGLI OGGETTI "GREZZI" ====================
"""
Senza personalizzazione, Python non sa come mostrare un oggetto in
modo leggibile, né come confrontarne due in modo sensato: usa un
comportamento generico, poco utile, uguale per ogni classe che non
lo personalizza.
"""

class Studente:
    def __init__(self, nome, matricola):
        self.nome = nome
        self.matricola = matricola

studente1 = Studente("Mario Rossi", "12345")
studente2 = Studente("Mario Rossi", "12345")   # stessi identici dati!

print(studente1)                       # <__main__.Studente object at 0x7f3a1c0a9d90>
print(studente1 == studente2)          # False — anche se i dati sono identici!
```

Due problemi evidenti: `print(studente1)` restituisce un indirizzo di memoria illeggibile invece del nome dello studente, e `studente1 == studente2` restituisce `False` anche se rappresentano, concettualmente, lo **stesso** studente. Python, di default, confronta l'**identità** (sono lo stesso oggetto in memoria?), non i valori.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Cosa Sono i Metodi Speciali (i "Dunder")

I **metodi speciali** (informalmente chiamati **"dunder methods"**, da *Double UNDERscore*, per via del doppio underscore che li racchiude, come `__init__` che già conosci) sono metodi che Python chiama **automaticamente** in risposta a operazioni built-in: stampare un oggetto, confrontarlo con `==`, misurarne la "lunghezza" con `len()`, sommarlo con `+`, e molte altre.

```
   Operazione che scrivi          Metodo speciale chiamato da Python
   ────────────────────           ──────────────────────────────────
   print(oggetto)          ────▶  oggetto.__str__()
   oggetto1 == oggetto2     ────▶  oggetto1.__eq__(oggetto2)
   len(oggetto)             ────▶  oggetto.__len__()
   oggetto1 + oggetto2      ────▶  oggetto1.__add__(oggetto2)

   Tu non chiami MAI questi metodi direttamente con la loro sintassi
   "dunder": scrivi solo print(), ==, len(), + — Python fa il resto.
```

Definendo questi metodi nelle tue classi, personalizzi il comportamento degli operatori e delle funzioni built-in di Python **per i tuoi oggetti**, rendendoli naturali da usare quanto un `int` o una `list`.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — `__str__` e `__repr__`: Rappresentare un Oggetto come Testo

`__str__` definisce cosa viene mostrato quando l'oggetto viene passato a `print()` o convertito con `str()`. Esiste anche `__repr__`, pensato per una rappresentazione più tecnica (utile per il debug), usata quando digiti il nome di una variabile nella console.

```python
# ==================== ESEMPIO 8.2: __str__ E __repr__ ====================
"""
__str__ risponde a print(studente): pensala come la versione
"per l'utente finale", leggibile.
__repr__ risponde quando l'oggetto viene ispezionato direttamente
(es. dentro una lista, o scrivendo solo 'studente1' in Colab):
pensala come la versione "per chi programma", che aiuta nel debug.
"""

class Studente:
    def __init__(self, nome, matricola):
        self.nome = nome
        self.matricola = matricola

    def __str__(self):
        return f"Studente: {self.nome}"                     # versione leggibile

    def __repr__(self):
        return f"Studente(nome='{self.nome}', matricola='{self.matricola}')"  # versione tecnica

studente1 = Studente("Mario Rossi", "12345")

print(studente1)          # Studente: Mario Rossi                 (usa __str__)
print([studente1])        # [Studente(nome='Mario Rossi', matricola='12345')]   (usa __repr__)
```

*Best practice diffusa: se definisci solo uno dei due, definisci `__repr__` — è quello che Python usa come "riserva" anche al posto di `__str__`, se quest'ultimo manca.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — `__eq__`: Confrontare Oggetti con `==`

Per far sì che `==` confronti i **dati** di due oggetti invece della loro identità in memoria, si definisce `__eq__`.

```python
# ==================== ESEMPIO 8.3: __eq__ PER UN CONFRONTO SENSATO ====================
"""
Definiamo l'uguaglianza tra due Studenti come "stessa matricola":
in un contesto scolastico ha senso, perché la matricola identifica
univocamente lo studente, a differenza del nome (che potrebbe ripetersi).
"""

class Studente:
    def __init__(self, nome, matricola):
        self.nome = nome
        self.matricola = matricola

    def __eq__(self, altro):
        return self.matricola == altro.matricola   # uguaglianza basata sul dato chiave

studente1 = Studente("Mario Rossi", "12345")
studente2 = Studente("Mario Rossi", "12345")     # stessa matricola
studente3 = Studente("Mario Rossi", "99999")     # stesso nome, matricola diversa!

print(studente1 == studente2)    # True  — ora confronta i DATI, non l'identità
print(studente1 == studente3)    # False — matricole diverse
print(studente1 is studente2)    # False — restano comunque due oggetti diversi in memoria!
```

⚠️ Attenzione, un punto sottile ma importante: `==` (che ora usa `__eq__`) e `is` (Modulo 2, identità in memoria) restano due cose diverse. `__eq__` decide cosa significhi "essere uguali" per la tua classe; `is` continua a chiedersi "sono letteralmente lo stesso oggetto?".

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — `__len__`: Dare una "Lunghezza" a un Oggetto

Se una tua classe rappresenta, concettualmente, una **collezione** di elementi, puoi farla funzionare con la funzione built-in `len()` definendo `__len__`.

```python
# ==================== ESEMPIO 8.4: __len__ PER UNA PLAYLIST ====================
"""
Una Playlist "contiene" canzoni: ha senso chiedersi len(playlist).
__len__ deve restituire un numero intero: qui, il numero di canzoni.
"""

class Playlist:
    def __init__(self, nome):
        self.nome = nome
        self.canzoni = []

    def aggiungi(self, titolo_canzone):
        self.canzoni.append(titolo_canzone)

    def __len__(self):
        return len(self.canzoni)   # riusa il len() built-in sulla lista interna

playlist = Playlist("Studiando con GCProf")
playlist.aggiungi("Lo-fi Beats")
playlist.aggiungi("Piano Focus")
playlist.aggiungi("Ambient Study")

print(len(playlist))          # 3 — funziona come su una lista o una stringa!
print(f"La playlist ha {len(playlist)} canzoni.")
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — `__add__` e l'Operator Overloading

Definendo `__add__`, puoi far sì che l'operatore `+` faccia qualcosa di sensato anche tra due tuoi oggetti. Questo si chiama **operator overloading**: lo stesso simbolo (`+`) assume un significato diverso a seconda del tipo di dato (già lo sperimenti quando `+` somma numeri, ma concatena stringhe).

```python
# ==================== ESEMPIO 8.5: __add__ PER UN VETTORE2D ====================
"""
Un Vettore2D rappresenta uno spostamento nel piano (x, y) — utile
in un videogioco per muovere un personaggio, o in fisica.
Sommare due vettori significa sommare le rispettive componenti:
__add__ deve restituire un NUOVO oggetto Vettore2D con il risultato.
"""

class Vettore2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, altro):
        return Vettore2D(self.x + altro.x, self.y + altro.y)   # nuovo oggetto!

    def __str__(self):
        return f"({self.x}, {self.y})"

spostamento1 = Vettore2D(3, 4)
spostamento2 = Vettore2D(1, -2)

risultato = spostamento1 + spostamento2   # chiama spostamento1.__add__(spostamento2)
print(f"{spostamento1} + {spostamento2} = {risultato}")   # (3, 4) + (1, -2) = (4, 2)
```

```
   spostamento1.x=3, y=4        spostamento2.x=1, y=-2
              │                          │
              └──────── __add__ ─────────┘
                          │
                          ▼
               Vettore2D(3+1, 4-2)  =  (4, 2)   ← NUOVO oggetto
```

⚠️ Attenzione: `__add__` dovrebbe **restituire un nuovo oggetto**, non modificare `self` — proprio come `3 + 4` non modifica il numero `3`, ma produce un nuovo valore `7`.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Metodi Speciali in Java: `toString()`, `equals()` e i Limiti dell'Overloading

Java offre equivalenti diretti per rappresentazione testuale e confronto, ma **non permette** di ridefinire il comportamento degli operatori matematici come `+` sulle proprie classi.

```java
// ==================== ESEMPIO 8.6: toString() E equals() IN JAVA ====================
class Studente {
    String nome;
    String matricola;

    public Studente(String nome, String matricola) {
        this.nome = nome;
        this.matricola = matricola;
    }

    @Override
    public String toString() {                 // equivalente di __str__
        return "Studente: " + nome;
    }

    @Override
    public boolean equals(Object altro) {       // equivalente di __eq__
        if (!(altro instanceof Studente)) return false;
        Studente s = (Studente) altro;
        return this.matricola.equals(s.matricola);
    }
}

// System.out.println(studente1);          // chiama automaticamente toString()
// studente1.equals(studente2)              // NON si usa "==" per confrontare i DATI in Java!
```

### Confronto diretto Python ↔ Java

| Operazione | Python | Java |
| :--- | :--- | :--- |
| Rappresentazione testuale | `__str__` (chiamato da `print()`) | `toString()` (chiamato da `System.out.println()`) |
| Confronto per valore | `__eq__` (chiamato da `==`) | `equals()` — **attenzione**: in Java, `==` tra oggetti confronta sempre l'identità, mai il valore, a meno di ridefinire `equals()` e chiamarlo esplicitamente |
| Overloading di `+` tra oggetti propri | Possibile con `__add__` | **Non possibile**: Java non permette di ridefinire il comportamento degli operatori matematici sulle proprie classi |

Questa è una differenza filosofica importante: Python si fida del programmatore e gli dà piena libertà di ridefinire il comportamento degli operatori; Java preferisce regole più rigide e prevedibili, sacrificando questa flessibilità.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 8

1. I **metodi speciali** ("dunder", dal doppio underscore) sono chiamati automaticamente da Python in risposta a operazioni built-in come `print()`, `==`, `len()`, `+`.
2. `__str__` (e `__repr__`) personalizzano come un oggetto viene rappresentato come testo.
3. `__eq__` personalizza cosa significhi "uguaglianza" (`==`) tra due oggetti della classe, basandola sui dati invece che sull'identità in memoria.
4. `__len__` permette di usare `len()` su un oggetto che rappresenta concettualmente una collezione.
5. `__add__` implementa l'**operator overloading**: dà un significato a `+` tra due oggetti della tua classe, restituendo sempre un nuovo oggetto.
6. In Java gli equivalenti sono `toString()` ed `equals()`; l'overloading degli operatori matematici, invece, non è permesso sulle classi definite dal programmatore.

---

### 🧪 Laboratorio Pratico: "La Classe Portafoglio"

**Obiettivo:** Applicare i metodi speciali su Google Colab, in un contesto economico-finanziario.

1. Crea una classe `Portafoglio` con costruttore `__init__(self, intestatario, saldo)`.
2. Implementa `__str__`, in modo che `print(portafoglio)` mostri qualcosa come `"Portafoglio di Mario Rossi: 150.00 €"`.
3. Implementa `__eq__`, in modo che due portafogli siano considerati uguali se hanno lo **stesso saldo** (indipendentemente dall'intestatario).
4. Implementa `__add__`, in modo che sommare due portafogli (`portafoglio1 + portafoglio2`) restituisca un **nuovo** `Portafoglio` con saldo pari alla somma dei due, e intestatario `"Portafoglio combinato"`.
5. Crea due o tre oggetti `Portafoglio`, stampali, confrontali con `==`, e sommane almeno due, stampando il risultato.

*Suggerimento:* riusa esattamente la struttura degli Esempi 8.2 (`__str__`), 8.3 (`__eq__`) e 8.5 (`__add__` che restituisce un nuovo oggetto).

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa sono i "metodi speciali" (dunder) in Python?
- A) Metodi che si possono chiamare solo dentro il costruttore
- B) Metodi chiamati automaticamente da Python in risposta a operazioni built-in come `print()`, `==`, `len()`, `+`
- C) Metodi accessibili solo dalle sottoclassi
- D) Un sinonimo di attributo privato

**Domanda 2:** Qual è la differenza tra `__str__` e `__repr__`?
- A) Sono esattamente lo stesso metodo, con due nomi diversi
- B) `__str__` fornisce una rappresentazione leggibile (usata da `print()`); `__repr__` una rappresentazione più tecnica, utile per il debug
- C) `__repr__` funziona solo con i numeri
- D) `__str__` può essere usato solo nelle sottoclassi

**Domanda 3:** Dopo aver definito `__eq__` in una classe basandolo sulla matricola, cosa restituisce ancora `studente1 is studente2`, anche se `studente1 == studente2` è `True`?
- A) Sempre `True`, perché `is` ora si comporta come `==`
- B) Dipende: `is` continua a verificare l'identità in memoria, indipendente da `__eq__`
- C) Un errore, perché `is` non può essere usato dopo aver definito `__eq__`
- D) Lo stesso valore booleare restituito da `__eq__`

**Domanda 4:** Cosa dovrebbe fare correttamente `__add__`, secondo l'Esempio 8.5?
- A) Modificare direttamente `self`, sommando i valori dell'altro oggetto
- B) Restituire un nuovo oggetto con il risultato della somma, senza modificare gli oggetti originali
- C) Stampare il risultato invece di restituirlo
- D) Funzionare solo se i due oggetti sono identici

---

[🔙 Torna all'indice](#indice)