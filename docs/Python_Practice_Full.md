# 🐍 Guida Completa a Python
### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com
### Ottimizzata per Google Colab · Aggiornata a Python 3.13/3.14

---

## Come usare questa guida

Ogni modulo è pensato per essere copiato **così com'è** in una cella di testo (Markdown) o di codice di Google Colab. I blocchi di codice sono eseguibili direttamente: apri un nuovo notebook, incolla, premi `Shift+Invio`.

**Indice dei moduli**

- [M0 — Introduzione a Python e ambiente di lavoro](#m0)
- [M1 — Numeri e operatori](#m1)
- [M2 — Variabili e stringhe](#m2)
- [M3 — Conversioni di tipo, `print()` e `input()`](#m3)
- [M4 — Controllo del flusso, algebra booleana, operatori di confronto](#m4)
- [M5 — `if`, `elif`, `else`](#m5)
- [M6 — Ciclo `while`, `break`, `continue`](#m6)
- [M7 — Ciclo `for`, `range()`, `enumerate()`](#m7)
- [Appendice — Riferimenti rapidi e cheat sheet](#appendice)

---

<a id="m0"></a>
## M0 — Introduzione a Python e ambiente di lavoro

### 0.1 Cos'è Python

Python è un linguaggio di programmazione **interpretato**, **ad alto livello** e **multi-paradigma**, creato da Guido van Rossum e rilasciato per la prima volta nel 1991. Ad oggi è uno dei linguaggi più diffusi al mondo, mantenuto dalla Python Software Foundation, con una release principale circa ogni anno (la serie attuale più recente è Python 3.13, con la 3.14 già disponibile e la 3.15 in sviluppo).

**Perché è così popolare:**

| Caratteristica | Descrizione |
|---|---|
| Leggibilità | Sintassi vicina al linguaggio naturale, basata sull'indentazione |
| Versatilità | Web, data science, intelligenza artificiale, automazione, scripting, didattica |
| Ecosistema | Migliaia di librerie (NumPy, Pandas, Django, PyTorch...) |
| Comunità | Enorme, attiva, con documentazione ufficiale eccellente |

**Caratteristiche tecniche principali:**

1. **Multi-paradigma**: supporta programmazione procedurale, orientata agli oggetti e funzionale.
2. **Tipizzazione dinamica**: non serve dichiarare il tipo di una variabile, viene dedotto a runtime.
3. **Portabilità**: gira su Windows, macOS, Linux senza modifiche al codice.
4. **Interattività**: puoi eseguire istruzioni una alla volta in una shell (REPL) o in notebook come Colab/Jupyter.
5. **Interpretato**: il codice non va compilato manualmente; l'interprete CPython lo esegue direttamente (compilandolo internamente in bytecode).

### 0.2 Ambienti di lavoro: perché Google Colab

Per la didattica, l'ambiente scelto in questo corso è **Google Colab** (colab.research.google.com), un notebook Jupyter gratuito eseguito interamente nel cloud da Google. Vantaggi:

- **Zero installazione**: basta un account Google, nessun setup locale.
- **Celle miste**: testo Markdown e codice eseguibile nello stesso documento.
- **Persistenza su Drive**: i notebook si salvano automaticamente su Google Drive.
- **Hardware gratuito**: CPU (e GPU/TPU se servisse in futuro) senza costi.

In alternativa, per lavorare in locale, si può installare Python da [python.org](https://www.python.org/) e verificare l'installazione con:

```bash
python --version
# oppure, su alcuni sistemi:
python3 --version
```

### 0.3 Il tuo primo programma

```python
# Il classico "Hello, World!" — la prima riga che ogni programmatore scrive
print("Ciao, mondo!")
```

In Colab: crea una nuova cella di codice, incolla la riga, premi `Shift+Invio`. L'output apparirà subito sotto la cella.

---

<a id="m1"></a>
## M1 — Numeri e operatori

### 1.1 I tipi numerici di Python

Python distingue tre tipi numerici built-in:

| Tipo | Descrizione | Esempio |
|---|---|---|
| `int` | Numeri interi, precisione illimitata (limitata solo dalla RAM) | `42`, `-7`, `10**100` |
| `float` | Numeri in virgola mobile (standard IEEE 754, doppia precisione) | `3.14`, `-0.001` |
| `complex` | Numeri complessi, parte reale + immaginaria (suffisso `j`) | `3 + 4j` |

```python
intero = 10
decimale = 3.14
complesso = 2 + 3j

print("Intero:", intero, type(intero))
print("Decimale:", decimale, type(decimale))
print("Complesso:", complesso, type(complesso))
print("Parte reale:", complesso.real)
print("Parte immaginaria:", complesso.imag)
```

> 💡 **Nota moderna**: da Python 3.6 in poi puoi usare il carattere `_` come separatore delle migliaia per rendere leggibili i numeri grandi: `popolazione = 1_234_567` è equivalente a `1234567`.

### 1.2 Operatori aritmetici

| Operatore | Nome | Esempio | Risultato |
|---|---|---|---|
| `+` | Addizione | `5 + 3` | `8` |
| `-` | Sottrazione | `10 - 2` | `8` |
| `*` | Moltiplicazione | `4 * 7` | `28` |
| `/` | Divisione (sempre float) | `15 / 3` | `5.0` |
| `//` | Divisione intera (floor division) | `15 // 2` | `7` |
| `%` | Modulo (resto della divisione) | `15 % 2` | `1` |
| `**` | Potenza | `2 ** 3` | `8` |

```python
print("Addizione:", 5 + 3)
print("Sottrazione:", 10 - 2)
print("Moltiplicazione:", 4 * 7)
print("Divisione:", 15 / 3)          # restituisce sempre un float
print("Divisione intera:", 15 // 2)   # tronca verso il basso
print("Modulo:", 15 % 2)
print("Potenza:", 2 ** 3)
print("Radice quadrata (potenza 0.5):", 16 ** 0.5)
```

⚠️ **Attenzione al floor con i negativi**: `//` arrotonda sempre verso il basso (verso `-∞`), non verso lo zero:

```python
print(-7 // 2)   # -4, non -3!
print(-7 % 2)    # 1 (il segno del resto segue il divisore)
```

### 1.3 Operatori di confronto

Restituiscono sempre un valore booleano (`True`/`False`):

| Operatore | Significato | Esempio | Risultato |
|---|---|---|---|
| `==` | Uguale | `5 == 5` | `True` |
| `!=` | Diverso | `5 != 3` | `True` |
| `<` | Minore | `5 < 10` | `True` |
| `>` | Maggiore | `10 > 5` | `True` |
| `<=` | Minore o uguale | `5 <= 5` | `True` |
| `>=` | Maggiore o uguale | `10 >= 10` | `True` |

Python permette anche il **concatenamento** dei confronti, una comodità che molti altri linguaggi non hanno:

```python
x = 5
print(3 < x < 7)      # True, equivale a (3 < x) and (x < 7)
print(1 < x < 3)      # False
```

### 1.4 Operatori di assegnazione combinata

```python
z = 5
z += 3   # equivale a z = z + 3  -> z diventa 8
z -= 2   # z = z - 2             -> z diventa 6
z *= 2   # z = z * 2             -> z diventa 12
z /= 4   # z = z / 4             -> z diventa 3.0
z //= 1  # divisione intera combinata
z **= 2  # potenza combinata
z %= 5   # modulo combinato
print(z)
```

### 1.5 Precedenza degli operatori (PEMDAS)

L'ordine di valutazione, dal più al meno prioritario:

1. **P**arentesi `( )`
2. **E**sponenti `**`
3. **M**oltiplicazione, **D**ivisione, **D**ivisione intera, Modulo `* / // %`
4. **A**ddizione, **S**ottrazione `+ -`

```python
print(2 + 3 * 4)     # 14 -> prima la moltiplicazione
print((2 + 3) * 4)   # 20 -> prima la parentesi
print(2 ** 3 ** 2)   # 512 -> ** è associativo a destra: 2 ** (3 ** 2)
```

### 1.6 Conversioni tra tipi numerici

```python
numero_intero = 10
numero_decimale = float(numero_intero)   # 10.0 — int -> float, aggiunge precisione
print(numero_decimale)

numero_troncato = int(3.99)              # 3 — float -> int TRONCA (non arrotonda!)
print(numero_troncato)

numero_arrotondato = round(3.99)         # 4 — round() invece arrotonda correttamente
print(numero_arrotondato)

numero_complesso = complex(numero_intero)  # (10+0j)
print(numero_complesso)
```

> ⚠️ Errore comune: `int(3.99)` **non** arrotonda a 4, tronca a 3. Per arrotondare usa sempre `round()`.

### 1.7 Il modulo `math` per operazioni avanzate

Per operazioni matematiche più sofisticate della semplice aritmetica, la libreria standard offre il modulo `math`:

```python
import math

print(math.sqrt(16))     # radice quadrata -> 4.0
print(math.floor(3.7))   # arrotonda per difetto -> 3
print(math.ceil(3.2))    # arrotonda per eccesso -> 4
print(math.pi)            # costante pi greco
print(math.pow(2, 10))    # potenza (restituisce sempre float)
```

---

<a id="m2"></a>
## M2 — Variabili e stringhe

### 2.1 Variabili

Una **variabile** è un nome simbolico associato a un valore in memoria. In Python non serve dichiarare il tipo: viene dedotto automaticamente al momento dell'assegnazione.

```python
x = 5
nome = "Alice"
pi_greco = 3.14
```

**Regole per i nomi delle variabili:**

1. Devono iniziare con una lettera o `_` (mai con una cifra).
2. Possono contenere lettere, numeri e underscore (`_`).
3. Non possono coincidere con parole riservate (`if`, `for`, `class`, `import`, ...).
4. Sono **case-sensitive**: `eta` e `Eta` sono due variabili diverse.

**Convenzioni di stile (PEP 8, lo standard ufficiale di stile Python):**

- `snake_case` per variabili e funzioni: `numero_studenti`.
- `PascalCase` per le classi: `StudenteLiceo`.
- `MAIUSCOLO` per le costanti: `VELOCITA_LUCE = 299792458`.

### 2.2 Dinamicità dei tipi

```python
x = 10          # x è int
print(type(x))
x = "ciao"      # ora x è str — Python lo permette senza errori
print(type(x))
x = 3.14        # ora x è float
print(type(x))
```

Questa flessibilità è comoda ma va usata con giudizio: riassegnare tipi diversi alla stessa variabile può rendere il codice confuso. Buona pratica: usare nomi che riflettano il contenuto, e non "riciclare" variabili per scopi diversi.

### 2.3 Le stringhe

Una stringa (`str`) è una sequenza di caratteri, delimitata da apici singoli, doppi o tripli:

```python
singola = 'Ciao'
doppia = "Ciao"
multilinea = """Questa è una stringa
che occupa più righe"""
```

#### Immutabilità

Le stringhe in Python sono **immutabili**: non si può modificare un carattere al loro interno. Ogni "modifica" in realtà crea una stringa nuova.

```python
s = "Python"
# s[0] = "J"   # ❌ TypeError: 'str' object does not support item assignment
s = "J" + s[1:]  # ✅ si crea una nuova stringa
print(s)  # "Jython"
```

#### Indicizzazione e slicing

Gli indici partono da `0`; gli indici negativi contano dalla fine.

```python
testo = "Python"
print(testo[0])     # 'P' (primo carattere)
print(testo[-1])     # 'n' (ultimo carattere)

# Slicing: testo[inizio:fine:passo] — 'fine' è ESCLUSO
print(testo[0:3])   # 'Pyt'
print(testo[:3])     # 'Pyt' (dall'inizio)
print(testo[3:])     # 'hon' (fino alla fine)
print(testo[::-1])   # 'nohtyP' (stringa invertita, passo -1)
print(testo[::2])    # 'Pto' (un carattere sì e uno no)
```

#### Concatenazione e ripetizione

```python
nome = "Alice"
saluto = "Ciao, " + nome
print(saluto)          # "Ciao, Alice"

eco = "echo! " * 3
print(eco)             # "echo! echo! echo! "
```

#### Escape character

| Sequenza | Significato |
|---|---|
| `\n` | Nuova riga |
| `\t` | Tabulazione |
| `\\` | Barra rovesciata |
| `\'` , `\"` | Apice dentro la stringa |

```python
messaggio = "Ciao\nMondo"   # va a capo
print(messaggio)
```

**Stringhe raw** (`r"..."`): ignorano gli escape, utili per percorsi Windows o espressioni regolari:

```python
percorso = r"C:\Users\Alice\Documenti"
print(percorso)   # stampato esattamente come scritto
```

### 2.4 Interpolazione di stringhe: tre metodi a confronto

```python
nome = "Alice"
eta = 25

# 1) Concatenazione con + (poco pratico, richiede conversioni manuali)
print("Ciao, " + nome + ". Hai " + str(eta) + " anni.")

# 2) .format() (più leggibile, storicamente diffuso)
print("Ciao, {}. Hai {} anni.".format(nome, eta))

# 3) f-string (Python 3.6+, oggi lo STANDARD raccomandato)
print(f"Ciao, {nome}. Hai {eta} anni.")

# Le f-string supportano anche espressioni ed formattazione avanzata:
print(f"Tra un anno avrai {eta + 1} anni.")
prezzo = 19.999
print(f"Prezzo: {prezzo:.2f} €")     # arrotonda a 2 decimali -> 20.00 €
print(f"{eta = }")                    # debug rapido -> "eta = 25" (Python 3.8+)
```

> 💡 Nella didattica moderna si raccomanda di usare **sempre le f-string** per nuovo codice: sono più leggibili, più veloci e supportano formattazione inline.

### 2.5 Metodi utili delle stringhe

| Metodo | Descrizione | Esempio |
|---|---|---|
| `len(s)` | Lunghezza | `len("Python")` → `6` |
| `.lower()` | In minuscolo | `"HELLO".lower()` → `"hello"` |
| `.upper()` | In maiuscolo | `"hello".upper()` → `"HELLO"` |
| `.strip()` | Rimuove spazi iniziali/finali | `" hi ".strip()` → `"hi"` |
| `.replace(a,b)` | Sostituisce occorrenze | `"ciao".replace("a","e")` → `"cieo"` |
| `.split(sep)` | Divide in lista | `"a,b,c".split(",")` → `["a","b","c"]` |
| `.join(iterabile)` | Unisce una lista in stringa | `",".join(["a","b"])` → `"a,b"` |
| `.find(sub)` | Indice prima occorrenza (-1 se assente) | `"ciao".find("a")` → `2` |
| `.startswith(s)` | Verifica prefisso | `"Python".startswith("Py")` → `True` |
| `.endswith(s)` | Verifica suffisso | `"Python".endswith("on")` → `True` |
| `.count(sub)` | Conta le occorrenze | `"banana".count("a")` → `3` |
| `.isdigit()` | Verifica se è tutta numerica | `"123".isdigit()` → `True` |
| `.title()` | Prima lettera maiuscola per parola | `"ciao mondo".title()` → `"Ciao Mondo"` |

```python
frase = "  Programmare in Python è divertente!  "
print(frase.strip())
print(frase.strip().upper())
parole = frase.strip().split(" ")
print(parole)
print(len(parole), "parole trovate")
print("-".join(parole))
```

---

<a id="m3"></a>
## M3 — Conversioni di tipo, `print()` e `input()`

### 3.1 Conversione implicita (coercizione automatica)

Python converte automaticamente i tipi quando non c'è perdita di informazione, ad esempio in operazioni miste `int`/`float`:

```python
a = 10        # int
b = 2.5       # float
c = a + b     # Python converte 'a' in float per fare l'operazione
print(c)      # 12.5
print(type(c))  # <class 'float'>
```

### 3.2 Conversione esplicita

Realizzata con funzioni built-in:

| Funzione | Descrizione | Esempio |
|---|---|---|
| `int(x)` | Converte in intero (tronca i decimali) | `int(3.7)` → `3` |
| `float(x)` | Converte in float | `float(3)` → `3.0` |
| `str(x)` | Converte in stringa | `str(42)` → `"42"` |
| `bool(x)` | Converte in booleano | `bool(0)` → `False` |
| `list(x)` | Converte in lista | `list("abc")` → `['a','b','c']` |
| `tuple(x)` | Converte in tupla | `tuple([1,2,3])` → `(1,2,3)` |
| `set(x)` | Converte in insieme | `set("aab")` → `{'a','b'}` |

```python
numero = "42"
numero_int = int(numero)       # da stringa a intero
print(numero_int + 10)         # 52
```

⚠️ **Errori di conversione**: se il dato non è compatibile, Python solleva un'eccezione:

```python
# print(int("3.14"))   # ValueError: invalid literal for int() with base 10: '3.14'
# Per convertire "3.14" in intero serve un passaggio intermedio:
print(int(float("3.14")))   # 3
```

### 3.3 La funzione `print()`

```python
print(valore1, valore2, sep=" ", end="\n")
```

- `sep`: separatore tra i valori (default: spazio).
- `end`: cosa stampare alla fine (default: newline).

```python
print("Ciao", "Mondo", sep="-", end="!\n")   # Ciao-Mondo!

lista = [1, 2, 3]
print("Lista:", lista)   # stampa direttamente strutture complesse

risultato = 42
print(f"Il risultato è: {risultato}")   # f-string, il metodo consigliato oggi
```

### 3.4 La funzione `input()`

`input()` raccoglie dati da tastiera **sempre come stringa**, anche se l'utente digita un numero.

```python
nome = input("Come ti chiami? ")
print(f"Ciao, {nome}!")

eta = int(input("Quanti anni hai? "))   # conversione esplicita necessaria!
print(f"L'anno prossimo avrai {eta + 1} anni.")
```

⚠️ Se l'utente inserisce del testo non numerico dove ci si aspetta un numero, `int()` genera un `ValueError`.

### 3.5 Validazione degli input con `try` / `except`

```python
try:
    numero = int(input("Inserisci un numero intero: "))
    print(f"Hai inserito {numero}.")
except ValueError:
    print("Errore: devi inserire un numero intero valido.")
```

Per richiedere input finché non è valido, si combina con un ciclo `while` (vedi Modulo 6):

```python
while True:
    valore = input("Inserisci un numero: ")
    if valore.isdigit():
        numero = int(valore)
        print(f"Numero valido: {numero}")
        break
    else:
        print("Non è un numero valido, riprova.")
```

### 3.6 Sintesi delle best practice

1. **Converti sempre** l'output di `input()` prima di fare calcoli.
2. **Messaggi chiari**: guida l'utente su cosa inserire (es. "Inserisci un numero intero: ").
3. **Gestisci gli errori** con `try/except` per evitare che il programma si blocchi.
4. **Formatta l'output** con f-string per messaggi leggibili.

---

<a id="m4"></a>
## M4 — Controllo del flusso, algebra booleana, operatori di confronto

### 4.1 Cos'è il controllo del flusso

Il controllo del flusso permette a un programma di **decidere** quale codice eseguire e **quante volte** ripeterlo, in base a condizioni logiche. I costrutti principali sono:

1. **Condizionali** (`if`, `elif`, `else`) → Modulo 5
2. **Cicli** (`while`, `for`) → Moduli 6 e 7

### 4.2 Algebra booleana

Python valuta le condizioni secondo la logica booleana classica: ogni condizione produce `True` o `False`.

**Valori "falsy" (considerati `False` in un contesto booleano):**

```python
# False, 0, 0.0, "" (stringa vuota), [] (lista vuota),
# {} (dizionario vuoto), set() (insieme vuoto), None

if []:
    print("Non viene mai eseguito")   # lista vuota è falsy
else:
    print("Questo viene eseguito")
```

Tutto il resto (numeri diversi da zero, stringhe non vuote, liste con elementi...) è considerato "truthy" (equivalente a `True`).

### 4.3 Operatori logici

| Operatore | Descrizione | Esempio |
|---|---|---|
| `and` | Vero se entrambe le condizioni sono vere | `True and False` → `False` |
| `or` | Vero se almeno una condizione è vera | `True or False` → `True` |
| `not` | Inverte il valore booleano | `not True` → `False` |

```python
x, y = 10, 5
if x > 5 and y < 10:
    print("Condizione soddisfatta")

# Verifica di condizioni multiple senza ripetere la variabile:
if 5 < x < 15:   # equivalente a (x > 5 and x < 15)
    print("x è compreso tra 5 e 15")
```

### 4.4 Operatori di confronto (riepilogo)

| Operatore | Descrizione | Esempio | Risultato |
|---|---|---|---|
| `==` | Uguale | `5 == 5` | `True` |
| `!=` | Diverso | `5 != 3` | `True` |
| `<` | Minore | `3 < 5` | `True` |
| `<=` | Minore o uguale | `5 <= 5` | `True` |
| `>` | Maggiore | `7 > 3` | `True` |
| `>=` | Maggiore o uguale | `7 >= 7` | `True` |
| `is` | Identità (stesso oggetto in memoria) | `x is y` | dipende |
| `in` | Appartenenza a una sequenza | `"a" in "ciao"` | `True` |

```python
print(5 == "5")   # False: tipi diversi (int vs str), Python non li considera uguali

a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)   # True: stesso contenuto
print(a is b)   # False: sono due oggetti distinti in memoria
c = a
print(a is c)   # True: c punta allo stesso oggetto di a
```

> 💡 **Regola pratica**: usa `==` per confrontare i *valori*, usa `is` solo per confrontare l'*identità* (tipicamente con `None`: `if variabile is None:`).

### 4.5 Precedenza tra operatori logici e di confronto

Dal più al meno prioritario:

1. Parentesi `( )`
2. Operatori di confronto (`<`, `>`, `==`, `!=`, ...)
3. Operatori logici: `not` → `and` → `or`

```python
x, y = 10, 5
if not (x > 5 and y < 10):
    print("Non soddisfa la condizione")
else:
    print("Soddisfa la condizione")
```

### 4.6 Valutazione a corto circuito (short-circuit evaluation)

Python interrompe la valutazione appena il risultato è determinato:

- Con `and`: se la prima condizione è `False`, la seconda non viene nemmeno valutata.
- Con `or`: se la prima condizione è `True`, la seconda non viene valutata.

```python
x = 0
if x != 0 and 10 / x > 2:   # la seconda parte non viene mai eseguita: niente ZeroDivisionError
    print("Non genera errore")
else:
    print("Condizione falsa, divisione evitata")
```

Questo comportamento è molto utile per scrivere codice sicuro, ad esempio controllare che un oggetto non sia `None` prima di usarlo:

```python
dati = None
if dati is not None and len(dati) > 0:
    print("Ci sono dati")
else:
    print("Nessun dato disponibile")
```

### 4.7 Espressioni condizionali inline (operatore ternario)

```python
x = 10
messaggio = "Positivo" if x > 0 else "Negativo"
print(messaggio)
```

### 4.8 Pattern matching con `match` (Python 3.10+)

Per condizioni multiple su un singolo valore, `match` è un'alternativa più leggibile a lunghe catene `if/elif`:

```python
x = 42
match x:
    case 1:
        print("Uno")
    case 42:
        print("La risposta alla vita, l'universo e tutto quanto")
    case _:
        print("Altro valore")
```

`match` supporta anche pattern più complessi (liste, classi, guardie condizionali):

```python
punto = (0, 5)
match punto:
    case (0, 0):
        print("Origine")
    case (0, y):
        print(f"Sull'asse y, altezza {y}")
    case (x, 0):
        print(f"Sull'asse x, larghezza {x}")
    case (x, y) if x == y:
        print("Sulla bisettrice")
    case _:
        print("Punto generico")
```

### 4.9 Best practice

1. Preferisci condizioni semplici e leggibili a espressioni contorte.
2. Evita `if condizione == True:` — scrivi direttamente `if condizione:`.
3. Usa parentesi per chiarire la precedenza anche quando non strettamente necessarie, se migliora la leggibilità.
4. Sfrutta lo short-circuit per evitare errori (es. accessi a `None`, divisioni per zero).

---

<a id="m5"></a>
## M5 — Istruzioni `if`, `elif`, `else`

### 5.1 Struttura di base

```python
if condizione1:
    ...  # eseguito se condizione1 è vera
elif condizione2:
    ...  # eseguito se condizione1 è falsa ma condizione2 è vera
else:
    ...  # eseguito se nessuna condizione precedente è vera
```

Le condizioni sono valutate **in ordine**: appena una risulta vera, il blocco corrispondente viene eseguito e tutte le successive vengono ignorate.

### 5.2 `if` semplice

```python
x = 10
if x > 5:
    print("x è maggiore di 5")
```

### 5.3 `elif`: condizioni multiple

Puoi avere quanti `elif` vuoi; ognuno viene valutato solo se tutti i precedenti sono falsi.

```python
x = 10
if x > 15:
    print("x è maggiore di 15")
elif x > 5:
    print("x è maggiore di 5 ma non di 15")
else:
    print("x è 5 o meno")
```

### 5.4 `else`: il caso residuo

`else` è opzionale e va sempre per ultimo:

```python
x = 3
if x > 5:
    print("x è maggiore di 5")
else:
    print("x non è maggiore di 5")
```

### 5.5 Esempio completo — fasce d'età

```python
eta = 25
if eta < 18:
    categoria = "Minorenne"
elif eta < 65:
    categoria = "Adulto"
else:
    categoria = "Anziano"
print(f"Categoria: {categoria}")
```

### 5.6 Condizioni nidificate

```python
x = 10
if x > 0:
    if x % 2 == 0:
        print("x è positivo e pari")
    else:
        print("x è positivo e dispari")
else:
    print("x è negativo o nullo")
```

⚠️ Nidificazioni troppo profonde rendono il codice difficile da leggere. Meglio spezzare in funzioni o "appiattire" la logica con `elif`.

### 5.7 Operatore ternario (ripasso)

```python
x = 10
messaggio = "Positivo" if x > 0 else "Negativo"
print(messaggio)
```

### 5.8 Best practice

1. **Leggibilità prima di tutto**: usa variabili intermedie per condizioni complesse.

    ```python
    is_pari = (x % 2 == 0)
    if is_pari:
        print("x è pari")
    ```

2. **Evita nidificazioni profonde**: preferisci `elif`, o restituisci subito il risultato in una funzione (*early return*):

    ```python
    def valuta_eta(eta):
        if eta < 18:
            return "Minorenne"
        if eta < 65:
            return "Adulto"
        return "Anziano"

    print(valuta_eta(30))
    ```

3. **Copri tutti i casi possibili**: aggiungi sempre un `else` (o un controllo esplicito) per gli input inattesi.
4. **Rispetta l'indentazione**: in Python è obbligatoria e definisce i blocchi di codice (di norma 4 spazi).
5. Per condizioni multiple su un singolo valore, valuta se `match` (Modulo 4.8) è più leggibile di una lunga catena `elif`.

### 5.9 Differenze rispetto ad altri linguaggi

- Python **non ha `switch`** in senso classico; il pattern matching (`match`, dal 3.10) ne è l'equivalente moderno.
- **Nessuna graffa `{}`**: i blocchi sono delimitati dall'indentazione, non da parentesi.
- Corto circuito automatico in `and`/`or` (vedi Modulo 4.6).

---

<a id="m6"></a>
## M6 — Ciclo `while`, istruzioni `break` e `continue`

### 6.1 Sintassi di base

```python
while condizione:
    ...  # eseguito finché la condizione resta vera
```

Ad ogni iterazione la condizione viene rivalutata: se `True` il blocco viene eseguito, se `False` il ciclo termina.

```python
x = 0
while x < 5:
    print(x)
    x += 1   # fondamentale: senza questo, il ciclo non termina mai!
```

### 6.2 Cicli infiniti

```python
# while True:
#     print("Questo ciclo non finisce mai da solo")
```

Un ciclo infinito è utile solo se combinato con un `break` che lo interrompe in base a una condizione interna (tipico pattern per menu interattivi, server, giochi):

```python
contatore = 0
while True:
    print(f"Iterazione {contatore}")
    contatore += 1
    if contatore == 3:
        break   # esce dal ciclo infinito
```

### 6.3 `break`: uscita anticipata

`break` interrompe **immediatamente** il ciclo più vicino, saltando alla prima riga dopo il ciclo.

```python
numeri = [1, 2, 3, 4, 5, 6]
cerca = 4
indice = 0
while indice < len(numeri):
    if numeri[indice] == cerca:
        print("Trovato!")
        break
    indice += 1
```

### 6.4 `continue`: salta all'iterazione successiva

`continue` interrompe solo l'iterazione corrente e passa alla successiva, senza uscire dal ciclo.

```python
numeri = [1, 2, 3, 4, 5, 6]
for numero in numeri:
    if numero % 2 == 0:
        continue   # salta la stampa per i numeri pari
    print(numero)   # stampa solo i dispari: 1, 3, 5
```

### 6.5 Condizioni composte

```python
x, y = 0, 10
while x < 5 and y > 5:
    print(f"x: {x}, y: {y}")
    x += 1
    y -= 1
```

### 6.6 Evitare cicli infiniti indesiderati

```python
x = 0
while x < 5:
    if x == 3:
        break
    print(x)
    x += 1
```

Regola d'oro: **verifica sempre che la variabile che controlla la condizione venga modificata dentro il ciclo**, altrimenti il ciclo non terminerà mai.

### 6.7 La clausola `else` nei cicli (funzionalità poco nota ma utile)

In Python, sia `while` che `for` possono avere una clausola `else`, eseguita solo se il ciclo termina **senza** un `break`:

```python
numeri = [1, 3, 5, 7]
cerca = 4
indice = 0
while indice < len(numeri):
    if numeri[indice] == cerca:
        print("Trovato!")
        break
    indice += 1
else:
    print("Valore non presente nella lista")   # eseguito perché non c'è stato break
```

### 6.8 Complessità e prestazioni

- La complessità temporale di un ciclo `while` dipende dal numero di iterazioni necessarie a rendere falsa la condizione: se sono `n`, la complessità è `O(n)`.
- Un ciclo la cui condizione non viene mai aggiornata correttamente può bloccare il programma indefinitamente: è uno degli errori più comuni per chi inizia a programmare.

### 6.9 Best practice

1. **Aggiorna sempre** la condizione di uscita all'interno del ciclo.
2. Usa `break` per uscite anticipate, `continue` per saltare casi particolari.
3. Mantieni i cicli `while` semplici; evita nidificazioni eccessive.
4. Se il numero di iterazioni è **noto a priori**, preferisci `for` (Modulo 7): è più leggibile e meno soggetto a errori.

### 6.10 `while` vs `for`: quando usare cosa

| Situazione | Costrutto consigliato |
|---|---|
| Non conosci il numero di iterazioni in anticipo (dipende da una condizione dinamica) | `while` |
| Devi iterare su una sequenza nota (lista, stringa, range) | `for` |

---

<a id="m7"></a>
## M7 — Ciclo `for`, funzione `range()`, `enumerate()`

### 7.1 Sintassi di base

```python
for elemento in sequenza:
    ...  # eseguito per ogni elemento della sequenza
```

`sequenza` può essere una lista, tupla, stringa, dizionario, `range()` o qualunque oggetto iterabile.

```python
numeri = [1, 2, 3, 4, 5]
for numero in numeri:
    print(numero)
```

### 7.2 Iterare su liste, stringhe, tuple

```python
frutta = ["mela", "banana", "ciliegia"]
for item in frutta:
    print(item)

parola = "Python"
for lettera in parola:
    print(lettera)
```

### 7.3 La funzione `range()`

Genera una sequenza di interi, tipicamente usata per ripetere un blocco un numero prefissato di volte.

```python
range(stop)               # da 0 a stop-1
range(start, stop)        # da start a stop-1
range(start, stop, step)  # con passo personalizzato
```

```python
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2): # 2, 4, 6, 8
    print(i)

for i in range(10, 0, -1): # conto alla rovescia: 10, 9, ..., 1
    print(i)
```

### 7.4 Cicli annidati

```python
# Tabellina di moltiplicazione da 1 a 5
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i} * {j} = {i * j}")
```

### 7.5 Iterare su indici: `range(len(...))` vs `enumerate()`

Metodo classico (funzionale ma meno elegante):

```python
frutta = ["mela", "banana", "ciliegia"]
for i in range(len(frutta)):
    print(f"Indice {i}: {frutta[i]}")
```

Metodo consigliato con `enumerate()` — più leggibile e "pythonico":

```python
for indice, elemento in enumerate(frutta):
    print(f"Indice {indice}: {elemento}")

# enumerate() accetta anche un parametro 'start' per iniziare da un numero diverso da 0
for indice, elemento in enumerate(frutta, start=1):
    print(f"Posizione {indice}: {elemento}")
```

### 7.6 Iterare sui dizionari

```python
dizionario = {"a": 1, "b": 2, "c": 3}

for chiave in dizionario:                # itera sulle chiavi
    print(chiave)

for valore in dizionario.values():        # itera sui valori
    print(valore)

for chiave, valore in dizionario.items(): # itera su coppie chiave-valore
    print(f"{chiave}: {valore}")
```

### 7.7 List comprehension: il ciclo `for` in forma compatta

Una delle caratteristiche più distintive e moderne di Python: costruire una lista in un'unica riga.

```python
quadrati = [n ** 2 for n in range(10)]
print(quadrati)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Con condizione: solo i numeri pari
pari = [n for n in range(20) if n % 2 == 0]
print(pari)

# Equivalente "esteso" con ciclo for classico, per confronto:
pari_v2 = []
for n in range(20):
    if n % 2 == 0:
        pari_v2.append(n)
print(pari_v2 == pari)   # True
```

> 💡 Le list comprehension sono più veloci e concise del corrispondente ciclo `for` con `.append()`, e sono lo standard "pythonico" per costruire liste derivate da altre sequenze.

### 7.8 `zip()`: iterare su più sequenze in parallelo

```python
nomi = ["Alice", "Bruno", "Carla"]
voti = [8, 6, 9]

for nome, voto in zip(nomi, voti):
    print(f"{nome}: {voto}")
```

### 7.9 Best practice

1. Usa `for` quando conosci a priori la sequenza da percorrere.
2. Usa `range()` per contare un numero fisso di ripetizioni.
3. Preferisci `enumerate()` a `range(len(...))` quando servono sia indice che valore.
4. Preferisci iterare direttamente sugli elementi piuttosto che sugli indici, quando l'indice non serve.
5. Usa le list comprehension per trasformazioni semplici; per logiche complesse, un ciclo `for` classico resta più leggibile.

### 7.10 `for` vs `while`: riepilogo finale

| Costrutto | Quando usarlo |
|---|---|
| `for` | Sequenza nota o numero di iterazioni prevedibile |
| `while` | Condizione dinamica, numero di iterazioni non noto a priori |

---

<a id="appendice"></a>
## Appendice — Cheat sheet riassuntivo

### Tipi di dato fondamentali

```python
int, float, complex   # numerici
str                    # testo
bool                   # booleano (True/False)
list, tuple, dict, set # strutture dati (contenitori)
```

### Operatori — riepilogo generale

| Categoria | Operatori |
|---|---|
| Aritmetici | `+  -  *  /  //  %  **` |
| Confronto | `==  !=  <  >  <=  >=` |
| Logici | `and  or  not` |
| Identità | `is  is not` |
| Appartenenza | `in  not in` |
| Assegnazione combinata | `+=  -=  *=  /=  //=  %=  **=` |

### Struttura tipica di un programma Python

```python
# 1. Import delle librerie necessarie
import math

# 2. Acquisizione dati (eventuale input utente)
n = int(input("Inserisci un numero: "))

# 3. Elaborazione con controllo del flusso
if n < 0:
    print("Numero negativo, valore assoluto:", abs(n))
elif n == 0:
    print("Il numero è zero")
else:
    radice = math.sqrt(n)
    print(f"La radice quadrata di {n} è {radice:.2f}")

# 4. Output dei risultati
print("Elaborazione completata.")
```

### Errori comuni da evitare

| Errore | Perché succede | Come evitarlo |
|---|---|---|
| `ValueError` con `int(input(...))` | L'utente inserisce testo non numerico | Usa `try/except` |
| Ciclo infinito | La condizione del `while` non cambia mai | Aggiorna sempre la variabile di controllo |
| `TypeError` su stringhe | Si tenta di modificare un carattere: `s[0] = "x"` | Ricorda: le stringhe sono immutabili |
| Confondere `/` e `//` | `/` restituisce sempre float | Usa `//` se serve un intero |
| Confondere `==` e `is` | `is` confronta l'identità, non il valore | Usa `==` per confrontare i contenuti |
| Indentazione inconsistente | Python usa l'indentazione per delimitare i blocchi | Usa sempre lo stesso numero di spazi (4 è lo standard) |

### Note sulle versioni di Python

Questa guida è aggiornata alle versioni moderne del linguaggio (Python 3.10 – 3.14). In particolare vengono usate quando utile:

- **f-string** (dalla 3.6) come metodo standard di formattazione.
- **`match` / `case`** (dalla 3.10) come alternativa al pattern matching multiplo.
- **Separatore `_` nei numeri** (dalla 3.6) per la leggibilità.
- **`{variabile = }`** nelle f-string (dalla 3.8) per il debug rapido.

Per approfondire ulteriormente, la documentazione ufficiale (in italiano) è disponibile su [docs.python.org/it/3](https://docs.python.org/it/3/).

---

*Fine della Guida Completa a Python — Prof. Giuseppe Carnabuci.*