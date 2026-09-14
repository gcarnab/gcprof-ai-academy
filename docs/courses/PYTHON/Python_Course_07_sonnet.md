# 🐍 Modulo 7 — Liste e Tuple: Collezioni Ordinate di Dati

- **Corso:** Python Master — Dalle Basi al Mondo Reale
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Strutture Dati e Logica di Programmazione)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 3 (indicizzazione e slicing su stringhe), Modulo 6 (cicli `for`)
- **Obiettivo Didattico:** Scegliere tra lista e tupla in base al problema, manipolare collezioni di dati con i metodi appropriati e leggere strutture annidate.

---

<a id="indice"></a>
# 📑 Indice del Modulo 7

1. [Capitolo 1 — Cos'è una Lista e Come si Crea](#capitolo-1)
2. [Capitolo 2 — Indicizzazione e Slicing sulle Liste](#capitolo-2)
3. [Capitolo 3 — I Metodi delle Liste: Aggiungere, Rimuovere, Modificare](#capitolo-3)
4. [Capitolo 4 — Ordinare le Liste: `sort()` e `sorted()`](#capitolo-4)
5. [Capitolo 5 — Liste Annidate](#capitolo-5)
6. [Capitolo 6 — Le Tuple: Collezioni Immutabili](#capitolo-6)
7. [Capitolo 7 — Lista o Tupla? Come Scegliere](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è una Lista e Come si Crea

Finora ogni variabile conteneva **un solo valore**. Una **lista** (`list`) è invece una collezione **ordinata** e **modificabile** di più valori, racchiusa tra parentesi quadre `[]`, con gli elementi separati da virgole.

```python
# ==================== ESEMPIO 7.1: CREARE LISTE ====================
"""
Una lista può contenere elementi dello stesso tipo (il caso più comune)
o anche di tipi diversi mescolati insieme, perché Python non impone
alcun vincolo sul contenuto di una lista.
"""

studenti = ["Marco", "Giulia", "Luca", "Sara"]
voti = [7, 8.5, 6, 9, 7.5]
lista_mista = ["Mario", 17, True, 3.14]    # stringa, int, bool, float insieme

print(studenti)          # ['Marco', 'Giulia', 'Luca', 'Sara']
print(len(studenti))     # 4 -> len() funziona sulle liste esattamente come sulle stringhe
print(type(studenti))    # <class 'list'>

lista_vuota = []          # una lista vuota, da riempire in seguito
print(lista_vuota)        # []
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Indicizzazione e Slicing sulle Liste

Le liste sono sequenze **ordinate**, esattamente come le stringhe: valgono quindi tutte le regole di indicizzazione e slicing viste nel Modulo 3, con l'indice che parte da `0`.

```python
# ==================== ESEMPIO 7.2: INDICIZZAZIONE E SLICING SU LISTE ====================
"""
La sintassi lista[indice] e lista[inizio:fine:passo] funziona
identicamente a quanto visto per le stringhe: unica differenza
fondamentale, a breve, sarà la MUTABILITÀ delle liste.
"""

frutta = ["mela", "banana", "kiwi", "arancia", "pera"]

print(frutta[0])       # 'mela'   -> primo elemento
print(frutta[-1])      # 'pera'   -> ultimo elemento
print(frutta[1:3])     # ['banana', 'kiwi']  -> slicing: indice 3 escluso
print(frutta[::-1])    # lista invertita

# A DIFFERENZA delle stringhe, le liste sono MUTABILI: possiamo
# modificare un elemento direttamente tramite il suo indice.
frutta[0] = "ananas"
print(frutta)           # ['ananas', 'banana', 'kiwi', 'arancia', 'pera']
```

⚠️ **Attenzione, differenza chiave rispetto alle stringhe:** nel Modulo 3 avevi visto che `parola[0] = "C"` generava un `TypeError`, perché le stringhe sono immutabili. Con le liste, invece, `lista[0] = nuovo_valore` funziona perfettamente: è una delle differenze più importanti tra i due tipi di dato.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — I Metodi delle Liste: Aggiungere, Rimuovere, Modificare

| Metodo | Cosa fa | Esempio |
| :--- | :--- | :--- |
| `.append(x)` | Aggiunge `x` **in fondo** alla lista | `lista.append(10)` |
| `.insert(i, x)` | Inserisce `x` **alla posizione** `i` | `lista.insert(0, "primo")` |
| `.remove(x)` | Rimuove la **prima occorrenza** del valore `x` | `lista.remove("mela")` |
| `.pop(i)` | Rimuove e **restituisce** l'elemento alla posizione `i` (l'ultimo, se `i` è omesso) | `lista.pop()` |
| `.extend(altra_lista)` | Aggiunge tutti gli elementi di un'altra lista, in fondo | `lista.extend([1, 2, 3])` |
| `.clear()` | Svuota completamente la lista | `lista.clear()` |

```python
# ==================== ESEMPIO 7.3: METODI DELLE LISTE IN AZIONE ====================
"""
A differenza dei metodi delle stringhe (Modulo 3), i metodi delle
liste modificano la lista ORIGINALE direttamente (perché le liste
sono mutabili): non serve riassegnare il risultato a una variabile.
"""

carrello = ["pane", "latte"]

carrello.append("uova")             # aggiunge in fondo
print(carrello)                      # ['pane', 'latte', 'uova']

carrello.insert(0, "acqua")         # inserisce in prima posizione
print(carrello)                      # ['acqua', 'pane', 'latte', 'uova']

carrello.remove("latte")            # rimuove il primo "latte" trovato
print(carrello)                      # ['acqua', 'pane', 'uova']

ultimo_articolo = carrello.pop()    # rimuove E restituisce l'ultimo elemento
print(ultimo_articolo)               # uova
print(carrello)                      # ['acqua', 'pane']
```

⚠️ **Errore comune:** confondere `.remove(valore)` con `.pop(indice)`. Il primo cerca e rimuove un **valore** specifico (genera `ValueError` se non lo trova); il secondo rimuove l'elemento a una **posizione** specifica (genera `IndexError` se la posizione non esiste).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Ordinare le Liste: `sort()` e `sorted()`

Python offre due modi per ordinare una lista, con una differenza fondamentale da ricordare sempre.

```python
# ==================== ESEMPIO 7.4: sort() vs sorted() ====================
"""
.sort() è un METODO: modifica la lista originale e non restituisce
nulla (restituisce None). sorted() è una FUNZIONE: NON modifica la
lista originale, ma ne restituisce una NUOVA, già ordinata.
"""

voti = [7, 5, 9, 6, 8]

# sorted(): non modifica 'voti', restituisce una nuova lista ordinata
voti_ordinati = sorted(voti)
print(voti_ordinati)   # [5, 6, 7, 8, 9]
print(voti)             # [7, 5, 9, 6, 8]  -> INVARIATA

# .sort(): modifica DIRETTAMENTE 'voti'
voti.sort()
print(voti)             # [5, 6, 7, 8, 9]  -> ora è cambiata

voti.sort(reverse=True)   # ordine decrescente
print(voti)                # [9, 8, 7, 6, 5]
```

| | `.sort()` | `sorted()` |
| :--- | :--- | :--- |
| Tipo | Metodo di lista | Funzione |
| Modifica la lista originale? | Sì | No |
| Restituisce qualcosa? | No (`None`) | Sì, una nuova lista ordinata |

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Liste Annidate

Una lista può contenere **altre liste** come elementi: si parla di **liste annidate** (o *nested list*), spesso usate per rappresentare tabelle, matrici o strutture con più livelli di dettaglio.

```python
# ==================== ESEMPIO 7.5: LISTE ANNIDATE ====================
"""
Per accedere a un elemento dentro una lista annidata, servono DUE
indici consecutivi: il primo seleziona la lista 'interna', il
secondo l'elemento dentro quella lista.
"""

# Ogni sotto-lista rappresenta [nome, voto] di uno studente
pagella = [
    ["Marco", 7],
    ["Giulia", 9],
    ["Luca", 6]
]

print(pagella[0])         # ['Marco', 7]   -> la prima sotto-lista
print(pagella[0][0])      # 'Marco'        -> il primo elemento della prima sotto-lista
print(pagella[1][1])      # 9              -> il voto di Giulia

# Scorrere una lista annidata con un ciclo for (unpacking diretto)
for nome, voto in pagella:
    print(f"{nome}: {voto}")
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Le Tuple: Collezioni Immutabili

Una **tupla** (`tuple`) è una collezione ordinata **come una lista**, ma **immutabile**: una volta creata, non può più essere modificata. Si crea con parentesi tonde `()` invece delle quadre.

```python
# ==================== ESEMPIO 7.6: CREARE E USARE TUPLE ====================
"""
Indicizzazione e slicing funzionano su una tupla ESATTAMENTE come
su una lista. Cambia solo la possibilità di modificarla in seguito.
"""

coordinate = (45.4642, 9.1900)   # latitudine e longitudine di Milano

print(coordinate[0])       # 45.4642
print(len(coordinate))     # 2
print(type(coordinate))    # <class 'tuple'>

# coordinate[0] = 0.0   # TypeError: 'tuple' object does not support item assignment

# Una tupla con un solo elemento richiede una virgola finale
singolo_elemento = (42,)    # senza la virgola, (42) sarebbe solo il numero 42 tra parentesi
print(type(singolo_elemento))   # <class 'tuple'>
```

Le tuple sono spesso usate per rappresentare **dati che non devono cambiare**: coordinate geografiche, giorni della settimana, valori restituiti insieme da una funzione (lo vedremo nel Modulo 9).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Lista o Tupla? Come Scegliere

| Criterio | Scegli **Lista** | Scegli **Tupla** |
| :--- | :--- | :--- |
| I dati cambieranno nel tempo? | Sì (es. un carrello che si riempie) | No (es. le coordinate di una città) |
| Vuoi comunicare che il dato è "fisso"? | — | Sì: la tupla lo garantisce a livello di linguaggio |
| Serve un minimo di efficienza in più? | — | Sì: le tuple sono leggermente più leggere e veloci |
| Servono metodi come `.append()` o `.sort()`? | Sì | No: le tuple non li hanno |

```python
# ==================== ESEMPIO 7.7: LISTA vs TUPLA, LO STESSO DATO ====================
"""
Stessa informazione, due scelte progettuali diverse: una lista
per un elenco che si aggiorna, una tupla per un dato che rappresenta
un valore fisso e immutabile per definizione.
"""

# Lista: l'elenco degli iscritti a un corso PUÒ crescere
iscritti_corso = ["Anna", "Marco"]
iscritti_corso.append("Elena")     # perfettamente legittimo
print(iscritti_corso)

# Tupla: i giorni della settimana NON cambiano mai
giorni_settimana = ("Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica")
# giorni_settimana.append("OttoGiorno")   # AttributeError: le tuple non hanno .append()
print(giorni_settimana[0])
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 7

1. Una **lista** (`[]`) è una collezione ordinata e **mutabile**: si può modificare, allungare o accorciare dopo la creazione.
2. Indicizzazione e slicing su una lista funzionano come sulle stringhe, ma `lista[i] = nuovo_valore` **funziona** (le liste sono mutabili).
3. I metodi principali sono `.append()`, `.insert()`, `.remove()`, `.pop()`, `.extend()`.
4. `.sort()` modifica la lista originale e non restituisce nulla; `sorted()` non la modifica e restituisce una nuova lista ordinata.
5. Le **liste annidate** (liste dentro altre liste) richiedono due indici consecutivi per accedere a un singolo valore.
6. Una **tupla** (`()`) è una collezione ordinata ma **immutabile**: si sceglie quando i dati non devono cambiare nel tempo.

---

### 🧪 Laboratorio Pratico: "Il Gestionale della Classifica"

**Obiettivo:** Applicare metodi delle liste, ordinamento e liste annidate per gestire una piccola classifica.

1. Crea una lista di liste annidate `classifica`, dove ogni elemento è `[nome_giocatore, punteggio]`, con almeno 5 giocatori a tua scelta.
2. Usa un ciclo `for` con *unpacking* (come nell'Esempio 7.5) per stampare la classifica attuale, un giocatore per riga.
3. Aggiungi un nuovo giocatore alla classifica con `.append()`.
4. Ordina la classifica in base al punteggio, dal più alto al più basso (suggerimento: cerca il parametro `key` di `.sort()`, ad esempio `classifica.sort(key=lambda x: x[1], reverse=True)` — lo approfondiremo nel Modulo 11, ma puoi già provarlo).
5. Stampa il **podio** (i primi 3 giocatori) usando lo slicing (`classifica[:3]`).
6. **Sfida finale:** crea una tupla `record_storico` con i 3 punteggi più alti mai registrati (dati fissi, immutabili) e confronta, con un `if`, se il punteggio più alto della classifica attuale ha superato il record.

*Suggerimento:* riusa la struttura degli Esempi 7.3, 7.4 e 7.5 di questo modulo.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Qual è la differenza fondamentale tra una lista e una tupla?
- A) Le liste possono contenere solo numeri, le tuple solo stringhe
- B) Le liste sono mutabili (modificabili), le tuple sono immutabili
- C) Le tuple possono essere più lunghe delle liste
- D) Non c'è alcuna differenza pratica

**Domanda 2:** Cosa restituisce `.pop()` quando chiamato su una lista, senza argomenti?
- A) Il primo elemento della lista, senza rimuoverlo
- B) L'ultimo elemento della lista, dopo averlo rimosso dalla lista
- C) Sempre `None`
- D) La lunghezza della lista

**Domanda 3:** Qual è la differenza principale tra `lista.sort()` e `sorted(lista)`?
- A) Sono identici in tutto e per tutto
- B) `.sort()` modifica la lista originale e non restituisce nulla; `sorted()` non la modifica e restituisce una nuova lista ordinata
- C) `sorted()` funziona solo con i numeri, `.sort()` solo con le stringhe
- D) `.sort()` restituisce una nuova lista, `sorted()` modifica quella originale

**Domanda 4:** Dato `pagella = [["Marco", 7], ["Giulia", 9]]`, come si accede correttamente al voto di Giulia?
- A) `pagella[1]`
- B) `pagella["Giulia"]`
- C) `pagella[1][1]`
- D) `pagella[0][1]`

---

[🔙 Torna all'indice](#indice)