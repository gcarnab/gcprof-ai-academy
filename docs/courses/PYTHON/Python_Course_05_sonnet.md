# 🐍 Modulo 5 — Strutture di Controllo: if, elif, else e Logica Booleana

- **Corso:** Python Master — Dalle Basi al Mondo Reale
- **Piattaforma:** GCProf Academy
- **Livello:** 🟢 Base (Fase 1 — Le Fondamenta del Linguaggio)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 2 (operatori di confronto), Modulo 4 (input e conversioni)
- **Obiettivo Didattico:** Scrivere programmi che prendono decisioni in base a condizioni multiple, combinando correttamente operatori logici e di confronto.

---

<a id="indice"></a>
# 📑 Indice del Modulo 5

1. [Capitolo 1 — Il Tipo `bool` e le Espressioni Booleane](#capitolo-1)
2. [Capitolo 2 — Il Costrutto `if` / `else`](#capitolo-2)
3. [Capitolo 3 — `elif`: Gestire Più Condizioni in Sequenza](#capitolo-3)
4. [Capitolo 4 — Operatori Logici: `and`, `or`, `not`](#capitolo-4)
5. [Capitolo 5 — Operatori di Appartenenza e di Identità](#capitolo-5)
6. [Capitolo 6 — Condizioni Annidate](#capitolo-6)
7. [Capitolo 7 — L'Operatore Ternario](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il Tipo `bool` e le Espressioni Booleane

Fino ad ora i nostri programmi hanno eseguito le istruzioni sempre nello stesso ordine, dall'alto verso il basso. Da questo modulo, i programmi iniziano a **decidere**: a eseguire un blocco di codice invece di un altro, in base a una condizione.

Alla base di ogni decisione c'è il tipo **`bool`** (booleano), che può assumere **solo due valori**: `True` o `False`. Li abbiamo già incontrati nel Modulo 2, parlando degli operatori di confronto.

```python
# ==================== ESEMPIO 5.1: ESPRESSIONI BOOLEANE ====================
"""
Qualunque espressione che confronta due valori (==, !=, >, <, >=, <=)
produce SEMPRE un valore booleano: True oppure False. Possiamo salvarlo
in una variabile, esattamente come faremmo con un numero o una stringa.
"""

eta = 17
maggiorenne = eta >= 18     # l'espressione viene VALUTATA e il risultato salvato

print(maggiorenne)          # False
print(type(maggiorenne))    # <class 'bool'>
```

⚠️ **Attenzione:** `True` e `False` in Python iniziano sempre con la lettera maiuscola: `true` e `false` (minuscolo) generano un `NameError`, perché Python li interpreterebbe come nomi di variabili inesistenti.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Il Costrutto `if` / `else`

Il costrutto **`if`** esegue un blocco di codice **solo se** la condizione indicata è `True`. Il blocco **`else`** (opzionale) esegue invece un'alternativa, quando la condizione è `False`.

### 🚦 L'Analogia del Bivio

```
                    condizione True
                   ┌──────────────▶  blocco "if"
   ── PROGRAMMA ──►│
                   └──────────────▶  blocco "else"
                    condizione False

   Il programma imbocca SEMPRE una sola strada, mai entrambe.
```

⚠️ **Regola di sintassi fondamentale:** in Python, a differenza di molti altri linguaggi, i blocchi di codice **non** si delimitano con parentesi graffe `{}`, ma con l'**indentazione** (4 spazi, standard universalmente adottato). Dopo `if condizione:` (nota i due punti `:`), tutte le righe indentate appartengono al blocco.

```python
# ==================== ESEMPIO 5.2: if / else ====================
"""
I due punti ':' dopo la condizione e l'indentazione (4 spazi) delle
righe successive NON sono opzionali: sono sintassi obbligatoria.
"""

eta = int(input("Quanti anni hai? "))

if eta >= 18:
    print("Sei maggiorenne")        # eseguito solo se eta >= 18 è True
else:
    print("Sei minorenne")           # eseguito solo se eta >= 18 è False

print("Grazie per aver risposto")   # eseguito SEMPRE, perché non è indentato
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — `elif`: Gestire Più Condizioni in Sequenza

Quando le alternative possibili sono più di due, si usa `elif` (contrazione di *else if*): Python valuta le condizioni **in ordine**, dall'alto verso il basso, ed esegue il **primo** blocco la cui condizione è `True`, ignorando tutti gli altri.

```python
# ==================== ESEMPIO 5.3: if / elif / else ====================
"""
Python controlla le condizioni IN ORDINE e si ferma alla prima che
risulta True. Anche se più condizioni fossero vere contemporaneamente,
viene eseguito SOLO il primo blocco corrispondente.
"""

voto = 7

if voto >= 9:
    giudizio = "Ottimo"
elif voto >= 7:                 # controllata solo se la precedente è False
    giudizio = "Buono"
elif voto >= 6:
    giudizio = "Sufficiente"
else:
    giudizio = "Insufficiente"

print(f"Giudizio: {giudizio}")   # Buono (voto=7 soddisfa il secondo elif)
```

⚠️ **Errore comune:** invertire l'ordine delle condizioni (es. mettere `voto >= 6` prima di `voto >= 9`). Poiché Python si ferma alla prima condizione vera, un voto di `9` verrebbe erroneamente classificato come "Sufficiente" se `voto >= 6` fosse controllata per prima. **L'ordine delle condizioni conta sempre.**

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Operatori Logici: `and`, `or`, `not`

Gli **operatori logici** permettono di combinare più condizioni in un'unica espressione booleana.

| Operatore | Significato | Vero quando... |
| :--- | :--- | :--- |
| `and` | E logico | **entrambe** le condizioni sono `True` |
| `or` | O logico | **almeno una** delle condizioni è `True` |
| `not` | Negazione | inverte il valore booleano (`True` diventa `False` e viceversa) |

```python
# ==================== ESEMPIO 5.4: OPERATORI LOGICI ====================
"""
and richiede che TUTTE le condizioni siano vere; or ne richiede
ALMENO UNA; not inverte semplicemente il risultato.
"""

eta = 20
ha_patente = True

# and: entrambe le condizioni devono essere vere
puo_guidare = eta >= 18 and ha_patente
print(puo_guidare)     # True

# or: basta che una delle due sia vera
giorno = "sabato"
e_weekend = giorno == "sabato" or giorno == "domenica"
print(e_weekend)        # True

# not: inverte il risultato
print(not ha_patente)   # False

# Le tre condizioni si possono combinare in espressioni più complesse
sconto_valido = (eta >= 65 or eta <= 12) and not ha_patente
print(sconto_valido)    # False (eta non rientra nelle fasce, e comunque ha la patente)
```

💡 **Best Practice:** in espressioni logiche complesse, usa sempre le **parentesi** per rendere esplicito l'ordine di valutazione (Python valuta `not` prima di `and`, e `and` prima di `or` — ma affidarsi a questa precedenza "a memoria" rende il codice più difficile da rileggere).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Operatori di Appartenenza e di Identità

### Appartenenza: `in` e `not in`

Verificano se un valore è presente (o assente) all'interno di una sequenza, come una stringa (le vedremo su liste e dizionari nei Moduli 7-8).

```python
# ==================== ESEMPIO 5.5: in E not in ====================
"""
'in' verifica se un elemento è CONTENUTO in una sequenza; funziona
già ora sulle stringhe (che sono sequenze di caratteri), e sarà
fondamentale con liste, tuple, dizionari e set nei prossimi moduli.
"""

email = "mario.rossi@scuola.it"

print("@" in email)          # True  -> il carattere @ è presente nella stringa
print("gmail" in email)      # False -> "gmail" non è presente
print("scuola" not in email) # False -> "scuola" È presente, quindi "not in" è False
```

### Identità: `is` e `is not`

Verificano se due variabili puntano **esattamente allo stesso oggetto in memoria** (non solo se hanno lo stesso valore). Li avevamo già incontrati, applicati agli oggetti, nel corso *OOP Explorer*: qui li vediamo nel loro uso più comune e sicuro, il confronto con `None`.

```python
# ==================== ESEMPIO 5.6: is E is not (CON None) ====================
"""
None rappresenta 'l'assenza di un valore'. Per confrontare con None,
la convenzione Python (e la best practice) è usare SEMPRE 'is',
non '==': è più corretto concettualmente e più efficiente.
"""

risultato = None

if risultato is None:
    print("Nessun risultato disponibile ancora")   # eseguito

if risultato is not None:
    print("Risultato pronto!")                        # NON eseguito
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Condizioni Annidate

Un blocco `if` può contenerne un altro al suo interno: si parla di **condizioni annidate** (*nested*). È utile quando una seconda decisione ha senso solo **dopo** che la prima condizione è risultata vera.

```python
# ==================== ESEMPIO 5.7: CONDIZIONI ANNIDATE ====================
"""
Il secondo 'if' viene valutato SOLO se il primo è True: è annidato
(nidificato) dentro il blocco del primo, e la sua indentazione lo
dimostra visivamente (due livelli di indentazione, 8 spazi totali).
"""

eta = 20
ha_biglietto = True

if eta >= 18:
    print("Sei maggiorenne")
    if ha_biglietto:
        print("Puoi entrare all'evento")
    else:
        print("Ti serve un biglietto per entrare")
else:
    print("Accesso non consentito ai minorenni")
```

💡 **Nota:** lo stesso risultato dell'Esempio 5.7 si poteva ottenere con un unico `if eta >= 18 and ha_biglietto:`. Le condizioni annidate sono preferibili quando i due livelli richiedono messaggi/azioni **diverse** per ogni combinazione, non solo un "sì/no" finale — altrimenti, combinare le condizioni con `and`/`or` (Capitolo 4) rende spesso il codice più semplice da leggere.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — L'Operatore Ternario

Quando un `if`/`else` serve solo per **assegnare uno tra due valori** a una variabile, Python offre una scorciatoia compatta, chiamata **operatore ternario** (o *espressione condizionale*).

```python
# ==================== ESEMPIO 5.8: L'OPERATORE TERNARIO ====================
"""
Sintassi: valore_se_vero if condizione else valore_se_falso
Utile SOLO per assegnazioni semplici e brevi: se la logica si
complica, un if/else tradizionale resta più leggibile.
"""

eta = 16

# Versione "tradizionale" con if/else (4 righe)
if eta >= 18:
    stato = "maggiorenne"
else:
    stato = "minorenne"

# Versione con operatore ternario (1 riga, stesso risultato)
stato = "maggiorenne" if eta >= 18 else "minorenne"

print(stato)   # minorenne
```

⚠️ **Attenzione a non abusarne:** l'operatore ternario è elegante per casi semplici, ma **annidarne più di uno** in una stessa riga (es. `"A" if x else "B" if y else "C"`) rende il codice molto difficile da leggere. In quei casi, un `if`/`elif`/`else` tradizionale resta la scelta migliore.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 5

1. Il tipo `bool` ha solo due valori possibili: `True` e `False` (sempre con l'iniziale maiuscola).
2. `if condizione:` esegue un blocco solo se la condizione è vera; `else:` gestisce l'alternativa; l'indentazione (non le parentesi graffe) delimita i blocchi.
3. `elif` gestisce condizioni multiple in sequenza: Python esegue il **primo** blocco la cui condizione è vera, e l'ordine delle condizioni è determinante.
4. Gli **operatori logici** `and` (entrambe vere), `or` (almeno una vera) e `not` (negazione) combinano più condizioni.
5. `in`/`not in` verificano l'appartenenza a una sequenza; `is`/`is not` verificano l'identità (usati soprattutto per confrontare con `None`).
6. Le **condizioni annidate** gestiscono decisioni che dipendono da altre decisioni; l'**operatore ternario** (`x if condizione else y`) è una scorciatoia per assegnazioni condizionali semplici.

---

### 🧪 Laboratorio Pratico: "Il Sistema di Accesso Palestra"

**Obiettivo:** Applicare `if`/`elif`/`else`, operatori logici e operatori di appartenenza per simulare un piccolo sistema decisionale realistico.

1. Chiedi all'utente, con `input()`, la sua **età** (intero) e se possiede un **abbonamento attivo** (fai rispondere `"si"` o `"no"`, poi confronta la stringa).
2. Scrivi una struttura `if`/`elif`/`else` che classifichi l'utente in tre fasce: `"junior"` (età minore di 14), `"standard"` (età tra 14 e 64), `"senior"` (età 65 o superiore).
3. Usa l'operatore `and` per stabilire se l'utente **può accedere** alla palestra: deve avere l'abbonamento attivo **e** un'età di almeno 14 anni.
4. Stampa un messaggio finale che combina fascia d'età e accesso consentito o negato, usando una f-string.
5. **Sfida finale:** usa l'operatore `in` per verificare se la fascia calcolata è tra quelle che hanno diritto a uno sconto (es. `["junior", "senior"]`), e stampa un messaggio dedicato in tal caso.

*Suggerimento:* riusa la struttura degli Esempi 5.3, 5.4 e 5.5 di questo modulo.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Quali sono gli unici due valori possibili per una variabile di tipo `bool`?
- A) `"true"` e `"false"`
- B) `1` e `0`
- C) `True` e `False`
- D) `"sì"` e `"no"`

**Domanda 2:** In Python, come si delimita un blocco di codice appartenente a un `if`?
- A) Con le parentesi graffe `{ }`
- B) Con l'indentazione (solitamente 4 spazi)
- C) Con la parola chiave `end`
- D) Con i due punti `:` seguiti dallo stesso livello di indentazione della riga `if`

**Domanda 3:** Dato `voto = 9`, con la sequenza `if voto >= 6: ... elif voto >= 9: ...`, cosa viene eseguito?
- A) Solo il blocco dell'`elif`, perché è la condizione più specifica
- B) Solo il blocco dell'`if`, perché Python si ferma alla prima condizione vera trovata in ordine
- C) Entrambi i blocchi, uno dopo l'altro
- D) Nessuno dei due blocchi, perché l'ordine è scorretto e genera un errore

**Domanda 4:** Qual è, secondo la best practice vista nel modulo, il modo corretto per verificare se una variabile `risultato` è `None`?
- A) `if risultato == None:`
- B) `if risultato is None:`
- C) `if risultato = None:`
- D) `if None in risultato:`

---

[🔙 Torna all'indice](#indice)