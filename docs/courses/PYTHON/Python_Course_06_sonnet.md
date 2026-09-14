# 🐍 Modulo 6 — Cicli: while, for, range() ed enumerate()

- **Corso:** Python Master — Dalle Basi al Mondo Reale
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Strutture Dati e Logica di Programmazione)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 3 (stringhe), Modulo 5 (strutture di controllo, operatori logici)
- **Obiettivo Didattico:** Scegliere il ciclo giusto per ogni situazione, evitare i cicli infiniti e usare `enumerate()` al posto del più macchinoso `range(len(...))`.

---

<a id="indice"></a>
# 📑 Indice del Modulo 6

1. [Capitolo 1 — Perché Servono i Cicli: l'Idea di Ripetizione](#capitolo-1)
2. [Capitolo 2 — Il Ciclo `while`](#capitolo-2)
3. [Capitolo 3 — `break` e `continue`](#capitolo-3)
4. [Capitolo 4 — Il Ciclo `for` e la Funzione `range()`](#capitolo-4)
5. [Capitolo 5 — `for` su Stringhe e Sequenze](#capitolo-5)
6. [Capitolo 6 — `enumerate()`: Indice e Valore Insieme](#capitolo-6)
7. [Capitolo 7 — Cicli Annidati](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Perché Servono i Cicli: l'Idea di Ripetizione

Immagina di dover stampare i numeri da 1 a 1000. Con quello che sai finora, dovresti scrivere 1000 righe di `print()`. I **cicli** (o *loop*) risolvono esattamente questo problema: permettono di **ripetere** un blocco di istruzioni, senza doverlo riscrivere, finché una condizione resta vera oppure per un numero prestabilito di volte.

Python offre due tipi di ciclo, ciascuno pensato per un contesto diverso:

| Ciclo | Quando si usa |
| :--- | :--- |
| `while` | Quando **non si sa in anticipo** quante ripetizioni serviranno: si ripete finché una condizione resta vera |
| `for` | Quando si vuole **scorrere** una sequenza nota (numeri, caratteri di una stringa, elementi di una lista...) |

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Il Ciclo `while`

Il ciclo **`while`** ripete un blocco di codice **finché** la condizione indicata resta `True`. La sintassi ricorda molto quella di `if`, con la differenza fondamentale che, al termine del blocco, Python **torna a controllare la condizione** invece di proseguire.

```python
# ==================== ESEMPIO 6.1: IL CICLO while ====================
"""
Il ciclo while controlla la condizione PRIMA di ogni ripetizione:
se è già False al primo controllo, il blocco non viene eseguito
nemmeno una volta.
"""

contatore = 1

while contatore <= 5:
    print(f"Ripetizione numero {contatore}")
    contatore += 1     # FONDAMENTALE: senza questo aggiornamento, il ciclo non termina mai

print("Ciclo terminato")
```

### ⚠️ Il Rischio dei Cicli Infiniti

Se la condizione del `while` non diventa **mai** falsa, il ciclo continua a girare per sempre, bloccando il programma (e, su Colab, richiedendo l'interruzione manuale dell'esecuzione).

```python
# ==================== ESEMPIO 6.2: UN CICLO INFINITO (DA NON ESEGUIRE!) ====================
"""
Questo codice, se eseguito, non terminerebbe MAI: 'contatore' non
viene mai modificato dentro il ciclo, quindi 'contatore <= 5' resta
sempre True. È commentato apposta: eseguirlo blocca il notebook.
"""

# contatore = 1
# while contatore <= 5:
#     print("Questo messaggio si ripete all'infinito!")
#     # manca contatore += 1 -> ERRORE: ciclo infinito
```

💡 **Best Practice:** prima di eseguire un `while`, chiediti sempre: *"c'è un'istruzione, dentro il ciclo, che prima o poi rende la condizione falsa?"*. Se la risposta è no, hai appena scritto un ciclo infinito.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — `break` e `continue`

Due istruzioni speciali permettono di controllare con precisione il comportamento di un ciclo dall'interno.

| Istruzione | Effetto |
| :--- | :--- |
| `break` | Interrompe **immediatamente** il ciclo, uscendo del tutto (anche se la condizione sarebbe ancora vera) |
| `continue` | Salta il resto delle istruzioni **solo per questa ripetizione**, e passa direttamente alla successiva |

```python
# ==================== ESEMPIO 6.3: break ====================
"""
break è utile per uscire da un ciclo appena si verifica una condizione
speciale, senza dover ridefinire tutta la condizione del while.
Qui simuliamo un tentativo di accesso con password.
"""

tentativi = 0

while tentativi < 3:
    password = input("Inserisci la password: ")
    if password == "python123":
        print("Accesso consentito!")
        break                       # esce subito dal ciclo, senza aspettare tentativi < 3
    tentativi += 1

print("Fine del programma")
```

```python
# ==================== ESEMPIO 6.4: continue ====================
"""
continue salta SOLO l'iterazione corrente: il ciclo prosegue
regolarmente dalla successiva, senza interrompersi del tutto.
"""

numero = 0

while numero < 10:
    numero += 1
    if numero % 2 == 0:      # se il numero è pari...
        continue               # ...salta il print() sottostante e torna all'inizio del ciclo
    print(numero)               # stampa solo i numeri DISPARI: 1, 3, 5, 7, 9
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Il Ciclo `for` e la Funzione `range()`

Il ciclo **`for`** ripete un blocco di codice **una volta per ogni elemento** di una sequenza. Combinato con la funzione **`range()`**, permette di ripetere un blocco per un numero prestabilito di volte — il caso d'uso più comune per i principianti.

```python
# ==================== ESEMPIO 6.5: for CON range() ====================
"""
range(n) genera una sequenza di numeri da 0 a n-1 (n ESCLUSO).
La variabile 'i' (convenzione comune per 'indice') assume, a ogni
ripetizione, il valore successivo generato da range().
"""

for i in range(5):
    print(f"Ripetizione numero {i}")
# Stampa: 0, 1, 2, 3, 4 -> range(5) genera 5 numeri, da 0 a 4
```

`range()` accetta fino a 3 parametri, con la stessa logica dello slicing visto nel Modulo 3:

| Sintassi | Effetto | Esempio | Sequenza generata |
| :--- | :--- | :--- | :--- |
| `range(fine)` | Da 0 a `fine - 1` | `range(5)` | `0, 1, 2, 3, 4` |
| `range(inizio, fine)` | Da `inizio` a `fine - 1` | `range(2, 6)` | `2, 3, 4, 5` |
| `range(inizio, fine, passo)` | Da `inizio` a `fine - 1`, con incremento `passo` | `range(0, 10, 2)` | `0, 2, 4, 6, 8` |

```python
# ==================== ESEMPIO 6.6: range() CON PIÙ PARAMETRI ====================
"""
Un passo negativo permette di contare all'indietro: utile per
conti alla rovescia o cicli che scorrono una sequenza al contrario.
"""

for numero in range(2, 11, 2):    # numeri pari da 2 a 10
    print(numero, end=" ")
print()                            # 2 4 6 8 10

for i in range(5, 0, -1):          # conto alla rovescia da 5 a 1
    print(i, end=" ")
print("Via!")                      # 5 4 3 2 1 Via!
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — `for` su Stringhe e Sequenze

Il ciclo `for` non serve solo con `range()`: può scorrere **qualsiasi sequenza**, incluse le stringhe (che, ricordiamo dal Modulo 3, sono sequenze di caratteri).

```python
# ==================== ESEMPIO 6.7: for SU UNA STRINGA ====================
"""
Quando il 'for' scorre una stringa, la variabile assume, a ogni
ripetizione, UN SINGOLO CARATTERE della stringa, nell'ordine in
cui compaiono.
"""

parola = "PYTHON"

for lettera in parola:
    print(lettera)
# Stampa una lettera per riga: P, Y, T, H, O, N

# Un caso d'uso pratico: contare le vocali di una parola
vocali = "aeiouAEIOU"
frase = "Programmazione a Oggetti"
contatore_vocali = 0

for carattere in frase:
    if carattere in vocali:      # riusa l'operatore 'in' del Modulo 5!
        contatore_vocali += 1

print(f"La frase contiene {contatore_vocali} vocali")
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — `enumerate()`: Indice e Valore Insieme

Quando in un `for` serve conoscere **sia la posizione (indice) sia il valore** di ogni elemento, la soluzione "ingenua" è `range(len(sequenza))`: funziona, ma è poco elegante e più soggetta a errori. La soluzione **pythonica** è la funzione `enumerate()`.

```python
# ==================== ESEMPIO 6.8: range(len(...)) vs enumerate() ====================
"""
enumerate() restituisce, a ogni ripetizione, una COPPIA (indice, valore),
che possiamo 'spacchettare' direttamente in due variabili separate.
È più leggibile e più sicuro di range(len(...)).
"""

materie = ["Italiano", "Matematica", "Informatica"]

# Modo "ingenuo" (funziona, ma è macchinoso)
for i in range(len(materie)):
    print(f"{i}: {materie[i]}")

print("---")

# Modo pythonico, con enumerate()
for indice, materia in enumerate(materie):
    print(f"{indice}: {materia}")
# Stesso identico risultato, codice più chiaro

# enumerate() accetta anche un parametro 'start' per far partire il conteggio da un altro numero
for indice, materia in enumerate(materie, start=1):
    print(f"Materia #{indice}: {materia}")   # Materia #1, #2, #3 invece di #0, #1, #2
```

💡 **Best Practice:** da qui in avanti, preferisci sempre `enumerate()` a `range(len(...))` quando ti serve l'indice insieme al valore: è più leggibile, più "pythonico" e riduce il rischio di errori di calcolo sugli indici.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Cicli Annidati

Esattamente come per le condizioni (Modulo 5), anche i cicli possono contenerne altri al loro interno: si parla di **cicli annidati**. Per ogni singola ripetizione del ciclo **esterno**, il ciclo **interno** viene eseguito per intero.

```python
# ==================== ESEMPIO 6.9: CICLI ANNIDATI ====================
"""
Per ogni valore di 'riga' (ciclo esterno), il ciclo interno su 'colonna'
viene eseguito COMPLETAMENTE, da 1 a 3, prima di passare alla riga
successiva. Risultato: una tabellina a griglia.
"""

for riga in range(1, 4):
    for colonna in range(1, 4):
        print(f"({riga},{colonna})", end=" ")
    print()    # va a capo alla fine di ogni riga

# Output:
# (1,1) (1,2) (1,3)
# (2,1) (2,2) (2,3)
# (3,1) (3,2) (3,3)
```

⚠️ **Attenzione alle prestazioni:** un ciclo `for` dentro un altro `for`, entrambi con `n` ripetizioni, esegue il blocco interno **n × n** volte. Con sequenze molto lunghe, i cicli annidati possono diventare lenti: è un aspetto a cui prestare attenzione quando i programmi iniziano a lavorare su quantità di dati più grandi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 6

1. Il ciclo **`while`** ripete un blocco finché una condizione resta `True`: va sempre garantito un aggiornamento che, prima o poi, la renda falsa, per evitare **cicli infiniti**.
2. **`break`** interrompe del tutto il ciclo; **`continue`** salta solo l'iterazione corrente e prosegue con la successiva.
3. Il ciclo **`for`** scorre gli elementi di una sequenza; combinato con **`range(inizio, fine, passo)`**, ripete un blocco un numero prestabilito di volte.
4. `for` può scorrere direttamente anche le **stringhe**, carattere per carattere.
5. **`enumerate()`** restituisce coppie (indice, valore) ed è la scelta pythonica preferibile a `range(len(...))` quando serve conoscere anche la posizione di ogni elemento.
6. I **cicli annidati** (un `for`/`while` dentro un altro) eseguono il blocco interno per intero a ogni ripetizione del ciclo esterno: attenzione alle prestazioni con sequenze lunghe.

---

### 🧪 Laboratorio Pratico: "Il Generatore di Tabelline"

**Obiettivo:** Applicare `while`, `for`, `range()` e cicli annidati per costruire uno strumento didattico classico: la tabellina.

1. Chiedi all'utente, con `input()`, un numero di cui generare la tabellina (es. `7`).
2. Usa un ciclo `for` con `range()` per stampare la tabellina da `1 x numero` a `10 x numero`, una riga per ogni moltiplicazione (es. `7 x 1 = 7`).
3. Usa `enumerate()` (invece di `range(len(...))`) per numerare ciascuna riga stampata con un indice progressivo che parte da 1 (es. `Riga 1: 7 x 1 = 7`).
4. **Sfida 1:** usando un ciclo `while`, chiedi ripetutamente all'utente se vuole generare un'altra tabellina (`"si"`/`"no"`), uscendo dal ciclo con `break` quando risponde `"no"`.
5. **Sfida finale:** usando due cicli `for` annidati, genera l'intera **tavola pitagorica** da 1 a 10 (una griglia 10×10 di prodotti), stampando ogni riga su una linea separata.

*Suggerimento:* riusa la struttura degli Esempi 6.5, 6.8 e 6.9 di questo modulo.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Perché il seguente codice genera un ciclo infinito?
```python
contatore = 1
while contatore <= 5:
    print(contatore)
```
- A) Perché `while` non può mai essere usato con `<=`
- B) Perché manca un aggiornamento di `contatore` dentro il ciclo, quindi la condizione resta sempre vera
- C) Perché `print()` non può essere usato dentro un `while`
- D) Perché `contatore` dovrebbe partire da 0, non da 1

**Domanda 2:** Qual è la differenza tra `break` e `continue`?
- A) Sono due nomi diversi per la stessa identica istruzione
- B) `break` interrompe del tutto il ciclo, `continue` salta solo l'iterazione corrente e prosegue con la successiva
- C) `break` funziona solo nei cicli `for`, `continue` solo nei cicli `while`
- D) `continue` interrompe del tutto il ciclo, `break` salta solo l'iterazione corrente

**Domanda 3:** Quali numeri genera `range(2, 10, 3)`?
- A) `2, 5, 8`
- B) `2, 3, 4, 5, 6, 7, 8, 9, 10`
- C) `3, 6, 9`
- D) `2, 10, 3`

**Domanda 4:** Perché è preferibile usare `enumerate(materie)` invece di `range(len(materie))` quando si scorre una lista?
- A) `enumerate()` è più veloce a eseguire i calcoli matematici
- B) `range(len(...))` non funziona con le liste
- C) `enumerate()` restituisce direttamente coppie (indice, valore), rendendo il codice più leggibile e meno soggetto a errori
- D) Non c'è alcuna differenza pratica tra i due approcci

---

[🔙 Torna all'indice](#indice)