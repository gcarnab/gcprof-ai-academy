# 🐍 Modulo 8 — Dizionari e Set: Dati Chiave-Valore e Insiemi

- **Corso:** Python Master — Dalle Basi al Mondo Reale
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Strutture Dati e Logica di Programmazione)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 6 (cicli `for`), Modulo 7 (liste, indicizzazione)
- **Obiettivo Didattico:** Modellare dati reali (anagrafiche, cataloghi, configurazioni) con i dizionari e usare i set per operazioni di confronto rapide tra collezioni.

---

<a id="indice"></a>
# 📑 Indice del Modulo 8

1. [Capitolo 1 — Cos'è un Dizionario e Perché Serve](#capitolo-1)
2. [Capitolo 2 — Creare e Accedere ai Dizionari](#capitolo-2)
3. [Capitolo 3 — Aggiornare, Aggiungere e Rimuovere Coppie Chiave-Valore](#capitolo-3)
4. [Capitolo 4 — I Metodi `keys()`, `values()`, `items()`](#capitolo-4)
5. [Capitolo 5 — Dizionari Annidati](#capitolo-5)
6. [Capitolo 6 — I Set: Collezioni di Elementi Unici](#capitolo-6)
7. [Capitolo 7 — Operazioni tra Insiemi](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Cos'è un Dizionario e Perché Serve

Nel Modulo 7 abbiamo rappresentato uno studente come una lista annidata: `["Marco", 7]`. Funziona, ma ha un limite: per sapere cosa rappresenta ogni posizione (`[0]` è il nome? il voto?), dobbiamo **ricordarlo a memoria**. Un **dizionario** (`dict`) risolve questo problema: invece di posizioni numeriche, usa **chiavi** descrittive per accedere ai valori.

### 🗂️ L'Analogia del Vocabolario

```
   LISTA:                          DIZIONARIO:
   ["Marco", 7]                    {"nome": "Marco", "voto": 7}
    ↑        ↑                          ↑              ↑
  posizione 0  posizione 1          chiave "nome"   chiave "voto"

   Per leggere il voto in una lista devo ricordare che è
   in posizione [1]. In un dizionario, chiedo direttamente ["voto"].
```

Un dizionario si crea con parentesi graffe `{}`, con coppie **chiave: valore** separate da virgola.

```python
# ==================== ESEMPIO 8.1: CREARE UN DIZIONARIO ====================
"""
Le chiavi sono tipicamente stringhe (ma possono essere anche numeri
o altri tipi immutabili); i valori possono essere di QUALSIASI tipo,
anche diversi tra loro nello stesso dizionario.
"""

studente = {
    "nome": "Marco",
    "cognome": "Bianchi",
    "eta": 17,
    "media": 7.8
}

print(studente)          # {'nome': 'Marco', 'cognome': 'Bianchi', 'eta': 17, 'media': 7.8}
print(type(studente))    # <class 'dict'>
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Creare e Accedere ai Dizionari

Per leggere un valore, si usa la chiave corrispondente tra parentesi quadre — la stessa sintassi delle liste, ma con una chiave al posto di un indice numerico.

```python
# ==================== ESEMPIO 8.2: ACCEDERE AI VALORI ====================
"""
studente["chiave"] genera un KeyError se la chiave non esiste.
.get("chiave") è un'alternativa più sicura: restituisce None
(o un valore di default a scelta) invece di generare un errore.
"""

studente = {"nome": "Marco", "eta": 17}

print(studente["nome"])         # 'Marco'
# print(studente["scuola"])     # KeyError: 'scuola' -> la chiave non esiste

print(studente.get("scuola"))              # None -> nessun errore, restituisce None
print(studente.get("scuola", "N/D"))       # 'N/D' -> restituisce un valore di default a scelta
```

💡 **Best Practice:** quando non sei certo che una chiave esista sempre nel dizionario, usa `.get()` invece dell'accesso diretto `["chiave"]`: evita crash imprevisti del programma.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Aggiornare, Aggiungere e Rimuovere Coppie Chiave-Valore

I dizionari, come le liste, sono **mutabili**: si possono modificare liberamente dopo la creazione.

```python
# ==================== ESEMPIO 8.3: MODIFICARE UN DIZIONARIO ====================
"""
Per aggiungere una NUOVA chiave o modificare una chiave ESISTENTE si
usa la STESSA identica sintassi: dizionario["chiave"] = valore.
Python capisce da solo se la chiave esiste già oppure no.
"""

studente = {"nome": "Marco", "eta": 17}

studente["eta"] = 18              # modifica una chiave esistente
studente["scuola"] = "Liceo Scientifico"   # aggiunge una nuova chiave
print(studente)   # {'nome': 'Marco', 'eta': 18, 'scuola': 'Liceo Scientifico'}

del studente["scuola"]            # rimuove la chiave "scuola" (e il suo valore)
print(studente)                    # {'nome': 'Marco', 'eta': 18}

eta_rimossa = studente.pop("eta") # rimuove la chiave E restituisce il valore rimosso
print(eta_rimossa)                 # 18
print(studente)                    # {'nome': 'Marco'}
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — I Metodi `keys()`, `values()`, `items()`

Per scorrere un dizionario con un ciclo `for`, servono tre metodi fondamentali:

| Metodo | Restituisce |
| :--- | :--- |
| `.keys()` | Tutte le chiavi del dizionario |
| `.values()` | Tutti i valori del dizionario |
| `.items()` | Tutte le coppie (chiave, valore), come tuple |

```python
# ==================== ESEMPIO 8.4: SCORRERE UN DIZIONARIO ====================
"""
.items() è il metodo più usato in un ciclo for, perché permette di
ottenere direttamente sia la chiave sia il valore in un solo passaggio,
tramite unpacking (come già visto per le liste annidate nel Modulo 7).
"""

studente = {"nome": "Marco", "eta": 17, "media": 7.8}

print(list(studente.keys()))     # ['nome', 'eta', 'media']
print(list(studente.values()))   # ['Marco', 17, 7.8]

for chiave in studente.keys():          # equivalente a: for chiave in studente:
    print(chiave)

for chiave, valore in studente.items():  # il modo più comune e leggibile
    print(f"{chiave}: {valore}")
```

⚠️ **Nota:** scorrere direttamente `for chiave in studente:` (senza `.keys()`) produce lo stesso risultato di `.keys()`: Python, per convenzione, itera sulle chiavi di un dizionario quando non è specificato altro.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Dizionari Annidati

Come le liste, anche i dizionari possono contenere altri dizionari (o liste) come valori: una struttura molto comune per rappresentare dati reali, complessi e organizzati su più livelli.

```python
# ==================== ESEMPIO 8.5: DIZIONARI ANNIDATI ====================
"""
Ogni valore di 'anagrafica_classe' è, a sua volta, un dizionario:
per accedere a un dato specifico, servono DUE chiavi consecutive,
esattamente come i due indici delle liste annidate del Modulo 7.
"""

anagrafica_classe = {
    "marco": {"cognome": "Bianchi", "eta": 17, "media": 7.8},
    "giulia": {"cognome": "Verdi", "eta": 16, "media": 9.1}
}

print(anagrafica_classe["marco"])            # {'cognome': 'Bianchi', 'eta': 17, 'media': 7.8}
print(anagrafica_classe["marco"]["cognome"]) # 'Bianchi'
print(anagrafica_classe["giulia"]["media"])  # 9.1

# Scorrere una struttura annidata con for e .items()
for nome, dati in anagrafica_classe.items():
    print(f"{nome.title()}: media {dati['media']}")
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — I Set: Collezioni di Elementi Unici

Un **set** (`set`) è una collezione **non ordinata** di elementi **unici**: se provi ad aggiungere due volte lo stesso valore, il set lo conserva **una sola volta**. Si crea con parentesi graffe `{}` (come i dizionari, ma senza coppie chiave-valore) o con la funzione `set()`.

```python
# ==================== ESEMPIO 8.6: CREARE E USARE SET ====================
"""
I set sono utilissimi quando serve eliminare automaticamente i
duplicati da una collezione di dati, o verificare rapidamente
l'appartenenza di un elemento (l'operatore 'in' è molto più
efficiente su un set che su una lista lunga).
"""

materie_marco = {"Matematica", "Italiano", "Informatica", "Matematica"}   # duplicato ignorato
print(materie_marco)      # {'Matematica', 'Italiano', 'Informatica'} -> solo 3 elementi

# Convertire una lista con duplicati in un set: modo rapido per "ripulirla"
voti_con_duplicati = [7, 8, 7, 9, 8, 6]
voti_unici = set(voti_con_duplicati)
print(voti_unici)          # {6, 7, 8, 9} -> i duplicati sono spariti

print("Italiano" in materie_marco)   # True -> verifica di appartenenza, molto efficiente

set_vuoto = set()          # ATTENZIONE: {} crea un dizionario vuoto, NON un set vuoto!
```

⚠️ **Attenzione, insidia comune:** `{}` crea sempre un **dizionario vuoto**, mai un set vuoto. Per creare un set vuoto serve obbligatoriamente la funzione `set()`.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Operazioni tra Insiemi

I set supportano le classiche operazioni matematiche sugli insiemi, utilissime per confrontare due collezioni di dati.

| Operazione | Simbolo/Metodo | Significato |
| :--- | :--- | :--- |
| Unione | `\|` o `.union()` | Tutti gli elementi presenti in almeno uno dei due set |
| Intersezione | `&` o `.intersection()` | Solo gli elementi presenti in **entrambi** i set |
| Differenza | `-` o `.difference()` | Elementi presenti nel primo set ma **non** nel secondo |

```python
# ==================== ESEMPIO 8.7: OPERAZIONI TRA INSIEMI ====================
"""
Caso d'uso reale: confrontare gli studenti iscritti a due corsi
diversi, per trovare chi è iscritto a entrambi, solo al primo,
o a uno qualsiasi dei due.
"""

iscritti_python = {"Marco", "Giulia", "Luca"}
iscritti_web = {"Giulia", "Sara", "Luca"}

print(iscritti_python | iscritti_web)   # unione: tutti gli iscritti ad almeno un corso
print(iscritti_python & iscritti_web)   # intersezione: {'Giulia', 'Luca'} -> iscritti a ENTRAMBI
print(iscritti_python - iscritti_web)   # differenza: {'Marco'} -> solo al corso Python
print(iscritti_web - iscritti_python)   # differenza: {'Sara'} -> solo al corso Web
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 8

1. Un **dizionario** (`{chiave: valore}`) associa dati a **chiavi** descrittive, invece che a posizioni numeriche: più leggibile delle liste per dati strutturati.
2. Si accede a un valore con `dizionario["chiave"]` (genera `KeyError` se assente) o, più sicuro, con `.get("chiave", default)`.
3. I dizionari sono **mutabili**: `dizionario["chiave"] = valore` aggiunge o modifica; `del` e `.pop()` rimuovono.
4. `.keys()`, `.values()` e `.items()` permettono di scorrere rispettivamente chiavi, valori, o coppie chiave-valore con un ciclo `for`.
5. I **dizionari annidati** (dizionari dentro dizionari) modellano dati reali complessi, con accesso tramite chiavi consecutive.
6. Un **set** è una collezione non ordinata di elementi **unici**: utile per eliminare duplicati e per operazioni di **unione** (`|`), **intersezione** (`&`) e **differenza** (`-`) tra collezioni.

---

### 🧪 Laboratorio Pratico: "L'Anagrafica della Classe"

**Obiettivo:** Applicare dizionari, dizionari annidati e set per gestire e confrontare dati strutturati.

1. Crea un dizionario annidato `classe` con almeno 4 studenti, dove ogni studente è rappresentato da un dizionario con le chiavi `"cognome"`, `"eta"` e `"media"`.
2. Usa un ciclo `for` con `.items()` per stampare, per ogni studente, un riepilogo formattato con una f-string.
3. Calcola la **media della classe**, sommando tutte le medie individuali (scorrendo i valori con `.values()` sul dizionario "interno" appropriato) e dividendo per il numero di studenti.
4. Crea due set, `iscritti_teatro` e `iscritti_musica`, con alcuni nomi degli studenti della classe (con qualche sovrapposizione intenzionale).
5. Usa le operazioni tra insiemi per stampare: chi è iscritto a **entrambe** le attività, chi è iscritto **solo** al teatro, e l'insieme di **tutti** gli iscritti ad almeno un'attività.
6. **Sfida finale:** usando `.get()`, prova a cercare uno studente che non esiste nel dizionario `classe`, gestendo il caso con un valore di default invece di generare un `KeyError`.

*Suggerimento:* riusa la struttura degli Esempi 8.4, 8.5 e 8.7 di questo modulo.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa distingue principalmente un dizionario da una lista, secondo quanto visto nel modulo?
- A) I dizionari possono contenere solo numeri
- B) I dizionari accedono ai valori tramite chiavi descrittive, non tramite posizioni numeriche
- C) Le liste non possono essere modificate, i dizionari sì
- D) Non c'è alcuna differenza pratica

**Domanda 2:** Qual è il vantaggio di usare `.get("chiave", "N/D")` invece di `dizionario["chiave"]`?
- A) È più veloce in ogni circostanza
- B) Restituisce sempre `"N/D"`, indipendentemente dal contenuto del dizionario
- C) Evita un `KeyError` se la chiave non esiste, restituendo invece il valore di default indicato
- D) Funziona solo con dizionari annidati

**Domanda 3:** Cosa restituisce il metodo `.items()` applicato a un dizionario?
- A) Solo le chiavi del dizionario
- B) Solo i valori del dizionario
- C) Le coppie (chiave, valore) del dizionario
- D) Il numero totale di elementi nel dizionario

**Domanda 4:** Cosa succede creando un set a partire da `[7, 8, 7, 9, 8, 6]` con `set([7, 8, 7, 9, 8, 6])`?
- A) Viene generato un errore, perché i set non accettano liste come argomento
- B) Il set contiene tutti gli elementi, inclusi i duplicati
- C) Il set contiene solo gli elementi unici: `{6, 7, 8, 9}`
- D) Il set resta vuoto

---

[🔙 Torna all'indice](#indice)