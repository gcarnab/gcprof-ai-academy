# 🐍 Python Masterclass: La Guida Definitiva

Benvenuto in questo percorso di apprendimento. Questa guida è strutturata in moduli progressivi. Che tu stia iniziando da zero o cercando di consolidare le tue basi, troverai spiegazioni teoriche rigorose accompagnate da esempi pratici pronti all'uso.

---

## 📦 Modulo 1: Introduzione e Fondamenti

### 1.1 Cos'è Python?
Python è un linguaggio di programmazione creato da Guido van Rossum nel 1991. È diventato uno dei linguaggi più popolari al mondo grazie alla sua curva di apprendimento morbida e alla sua immensa potenza. 

Le sue caratteristiche principali includono:
*   **Alto livello:** Si astrae dalla gestione complessa dell'hardware (come la memoria).
*   **Interpretato:** Il codice viene eseguito riga per riga da un interprete, facilitando il debugging.
*   **Tipizzazione dinamica:** Non è necessario dichiarare il tipo di una variabile; Python lo capisce a runtime.
*   **Multi-paradigma:** Supporta la programmazione procedurale, orientata agli oggetti (OOP) e funzionale.

### 1.2 La Filosofia di Python (The Zen of Python)
Python premia la leggibilità. Il codice viene letto molto più spesso di quanto venga scritto. Per questo motivo, Python utilizza l'**indentazione** (spazi bianchi all'inizio della riga) per definire i blocchi di codice, eliminando la necessità di parentesi graffe `{}` presenti in altri linguaggi.

---

## 🗃️ Modulo 2: Variabili e Tipi di Dato

### 2.1 Variabili
Una variabile è un'etichetta che diamo a uno spazio in memoria dove è conservato un dato. In Python, l'assegnazione avviene con il simbolo `=`.

```python
eta = 25              # Intero
nome = "Leonardo"     # Stringa
is_online = True      # Booleano
```
**Regole di Nomenclatura (Snake Case):**
I nomi delle variabili devono essere descrittivi, scritti in minuscolo e con le parole separate da underscore (es. `tasso_di_conversione`). Non possono iniziare con un numero o usare parole riservate (`if`, `for`, `class`, ecc.).

### 2.2 Tipi Numerici
Python gestisce i numeri in modo estremamente efficiente.
*   **Interi (`int`):** Numeri interi. In Python 3, la grandezza di un intero è limitata solo dalla RAM del computer.
*   **Virgola Mobile (`float`):** Numeri decimali (es. `3.14`). Utilizzano lo standard IEEE 754.
*   **Numeri Complessi (`complex`):** Molto usati in ambito scientifico (es. `3 + 4j`).

### 2.3 Gestione delle Stringhe (`str`)
Le stringhe sono sequenze **immutabili** di caratteri. Possono essere racchiuse tra apici singoli (`'...'`), doppi (`"..."`) o tripli (`"""..."""` per testi su più righe).

**Indicizzazione e Slicing (Taglio)**
Python utilizza un indice a base 0. Puoi estrarre parti di stringa usando la sintassi `[inizio:fine:passo]`.

```python
testo = "Programmazione"
print(testo[0])      # Output: 'P' (Primo carattere)
print(testo[-1])     # Output: 'e' (Ultimo carattere)
print(testo[0:4])    # Output: 'Prog' (L'indice 4 è escluso)
print(testo[::-1])   # Output: 'enoizamargorP' (Inverte la stringa)
```

**F-Strings (Il modo moderno di formattare, Python 3.6+)**
Il modo più elegante per inserire variabili nelle stringhe è usare la lettera `f` prima delle virgolette:

```python
nome = "Alice"
anni = 30
print(f"Ciao, mi chiamo {nome} e ho {anni} anni.")
```

**Metodi essenziali delle stringhe:**
*   `.upper()` / `.lower()`: Converte in maiuscolo/minuscolo.
*   `.strip()`: Rimuove gli spazi bianchi all'inizio e alla fine.
*   `.replace(old, new)`: Sostituisce porzioni di testo.
*   `.split(separatore)`: Divide la stringa creando una lista.

---

## 🧮 Modulo 3: Operatori, Input e Type Casting

### 3.1 Type Casting (Conversione di Tipo)
Spesso è necessario trasformare un tipo di dato in un altro.
*   **Conversione Implicita:** Python converte automaticamente i tipi quando non c'è perdita di dati (es. `int + float = float`).
*   **Conversione Esplicita:** Richiesta dal programmatore tramite funzioni come `int()`, `float()`, `str()`.

### 3.2 Interazione con l'Utente
La funzione `input()` riceve dati dall'utente. **Attenzione:** `input()` restituisce *sempre* una stringa!

```python
eta_utente = input("Quanti anni hai? ") # L'utente digita 20
eta_calcolabile = int(eta_utente)       # Cast da "20" a 20
print(f"L'anno prossimo avrai {eta_calcolabile + 1} anni.")
```
> 💡 *Best Practice:* Utilizzare blocchi `try-except` (che vedremo in concetti avanzati) per gestire errori se l'utente digita testo invece di numeri.

### 3.3 Operatori Aritmetici e Precedenza
Oltre ai classici `+`, `-`, `*`, `/`, Python offre:
*   `//` (Divisione Intera): Restituisce il quoziente troncato (es. `10 // 3` dà `3`).
*   `%` (Modulo): Restituisce il resto della divisione (es. `10 % 3` dà `1`. Ottimo per capire se un numero è pari).
*   `**` (Potenza): Es. `2 ** 3` restituisce `8`.

**Regola PEMDAS:** Python segue le rigide regole matematiche di precedenza: Parentesi, Esponenti, Moltiplicazione/Divisione, Addizione/Sottrazione.

---

## ⚖️ Modulo 4: Controllo del Flusso e Logica

Il codice generalmente viene eseguito dall'alto verso il basso. Il controllo del flusso permette di "deviare" questo percorso in base a condizioni specifiche.

### 4.1 Algebra Booleana e Operatori Logici
In Python, le espressioni possono essere `True` (Vero) o `False` (Falso).
*   **Confronto:** `==` (uguale), `!=` (diverso), `>`, `<`, `>=`, `<=`.
*   **Identità (`is`):** Verifica se due variabili puntano allo *stesso oggetto* nella memoria, non solo se hanno lo stesso valore.
*   **Logici (`and`, `or`, `not`):**
    *   **Cortocircuito (Short-circuit):** Python è intelligente. In `A and B`, se `A` è falso, Python non valuta nemmeno `B`. In `A or B`, se `A` è vero, Python non valuta `B`.

### 4.2 L'Istruzione if, elif, else
Le istruzioni condizionali permettono di prendere decisioni. L'indentazione è obbligatoria per definire cosa appartiene al blocco.

```python
punteggio = 85

if punteggio >= 90:
    print("Voto: A")
elif punteggio >= 80:
    print("Voto: B")
elif punteggio >= 70:
    print("Voto: C")
else:
    print("Bocciato")
```

### 4.3 Operatore Ternario (Condizioni Inline)
Per assegnazioni rapide basate su una condizione, usa l'operatore ternario per scrivere codice più pulito:
```python
stato = "Maggiorenne" if eta >= 18 else "Minorenne"
```

### 4.4 Pattern Matching Strutturale (`match-case`)
Introdotto in Python 3.10, è l'equivalente "potenziato" dello `switch` di altri linguaggi. È eccellente per sostituire lunghe catene di `if-elif`.

```python
comando = "salva"

match comando:
    case "carica":
        print("Caricamento in corso...")
    case "salva":
        print("Salvataggio completato.")
    case "esci":
        print("Uscita dal programma.")
    case _:
        print("Comando non riconosciuto.") # L'underscore _ agisce da blocco di default
```

---

## 🔄 Modulo 5: Iterazioni e Cicli

I cicli servono a ripetere operazioni. Python ne possiede due tipi principali: `while` e `for`.

### 5.1 Il Ciclo `while`
Il ciclo `while` esegue un blocco di codice *fintanto che* una condizione rimane `True`.

```python
conta = 5
while conta > 0:
    print(f"Lancio tra {conta}...")
    conta -= 1 # Operatore di assegnazione combinata (conta = conta - 1)
print("Partenza!")
```
> ⚠️ **Attenzione ai Loop Infiniti:** Se dimentichi di aggiornare la variabile della condizione (in questo caso `conta`), il ciclo non si fermerà mai.

### 5.2 Il Ciclo `for`
In Python, il `for` non è un semplice contatore numerico come in C o Java, ma un iteratore di collezioni (si comporta come un `foreach`).

```python
frutti = ["Mela", "Banana", "Ciliegia"]
for frutto in frutti:
    print(frutto)
```

**La potenza di `range()`**
Se hai bisogno di iterare un numero esatto di volte, usi la funzione integrata `range(start, stop, step)`. Il parametro `stop` è sempre esclusivo.

```python
# Stampa i numeri pari da 2 a 8
for i in range(2, 10, 2):
    print(i)
```

### 5.3 Modificare l'esecuzione dei cicli (`break` e `continue`)
A volte devi interrompere un ciclo o saltare un'iterazione:
*   `break`: Distrugge il ciclo e fa passare il programma alle istruzioni successive.
*   `continue`: Interrompe l'iterazione corrente e passa immediatamente al ciclo successivo.

```python
for numero in range(1, 10):
    if numero == 3:
        continue  # Salta il numero 3
    if numero == 7:
        break     # Termina tutto il ciclo quando arriva a 7
    print(numero)
# Output: 1, 2, 4, 5, 6
```

### 5.4 Iterazioni Avanzate: `enumerate()` e Dizionari
Una delle pratiche meno "pythoniche" è usare `range(len(lista))` per ottenere gli indici. La via corretta e professionale è usare `enumerate()`, che restituisce contemporaneamente sia l'indice che il valore.

```python
studenti = ["Mario", "Luigi", "Peach"]

for indice, studente in enumerate(studenti):
    print(f"Studente {indice + 1}: {studente}")
```

Quando si itera sui dizionari (collezioni chiave-valore), si consiglia l'uso del metodo `.items()`:

```python
inventario = {"Spade": 5, "Pozioni": 10}
for oggetto, quantita in inventario.items():
    print(f"Hai {quantita} unità di {oggetto}")
```

---

## 🎯 Best Practices Generali (Il "Pythonic Way")

Per concludere questa guida fondamentale, ecco le regole d'oro per scrivere codice Python a livello professionale:

1.  **La leggibilità prima di tutto:** Codice complesso non significa codice migliore. Riduci l'annidamento profondo (nested code) e preferisci funzioni separate.
2.  **Naming Convention:** Non risparmiare lettere. `calcola_tasse_annuali()` è infinitamente meglio di `calc_ta()`.
3.  **Usa le funzionalità moderne:** Abbandona vecchi metodi come `+` per concatenare variabili e usa le **F-strings**. Sostituisci catene enormi di `if/elif` con il **Pattern Matching**.
4.  **Gestisci le eccezioni:** Non fidarti mai dell'input dell'utente. Prima di manipolare stringhe o numeri complessi, assicurati che i tipi siano corretti.