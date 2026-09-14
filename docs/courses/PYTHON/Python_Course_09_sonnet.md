# 🐍 Modulo 9 — Funzioni: Riutilizzo del Codice e Scope delle Variabili

- **Corso:** Python Master — Dalle Basi al Mondo Reale
- **Piattaforma:** GCProf Academy
- **Livello:** 🟡 Intermedio (Fase 2 — Strutture Dati e Logica di Programmazione)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 5 (strutture di controllo), Modulo 6 (cicli), Modulo 7-8 (liste e dizionari, per parametri più complessi)
- **Obiettivo Didattico:** Scomporre un problema in funzioni piccole e riutilizzabili, gestire correttamente parametri e valori di ritorno, e documentare il proprio codice in modo professionale.

---

<a id="indice"></a>
# 📑 Indice del Modulo 9

1. [Capitolo 1 — Perché Servono le Funzioni](#capitolo-1)
2. [Capitolo 2 — Definire una Funzione con `def`](#capitolo-2)
3. [Capitolo 3 — Parametri: Posizionali, Nominali e di Default](#capitolo-3)
4. [Capitolo 4 — `return`: Restituire un Valore](#capitolo-4)
5. [Capitolo 5 — Scope Locale e Globale](#capitolo-5)
6. [Capitolo 6 — `*args` e `**kwargs`](#capitolo-6)
7. [Capitolo 7 — Docstring e Buone Pratiche di Documentazione](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Perché Servono le Funzioni

Finora, se un calcolo (es. la media di tre voti) serviva in più punti del programma, dovevamo **riscrivere lo stesso codice** ogni volta. Una **funzione** è un blocco di codice a cui diamo un nome, che possiamo **richiamare** quante volte vogliamo, da qualunque punto del programma, evitando ripetizioni.

### 🏭 L'Analogia della Macchina Automatica

```
   INGREDIENTI IN INGRESSO         MACCHINA               RISULTATO IN USCITA
   (parametri)               ──▶  (la funzione)   ──▶     (return)

   Esempio: calcola_media(7, 8, 9)  ──▶  [somma e divide]  ──▶  8.0

   Una volta costruita la "macchina", la riusi con ingredienti
   diversi ogni volta, senza doverla ricostruire da zero.
```

Le funzioni non sono una novità assoluta: hai già usato `print()`, `len()`, `input()`, `int()` — tutte **funzioni predefinite** di Python. Da questo modulo, imparerai a costruire le tue.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Definire una Funzione con `def`

Una funzione si definisce con la parola chiave **`def`**, seguita dal nome della funzione, dai parametri tra parentesi e dai due punti. Il corpo della funzione, come per `if` e i cicli, è **indentato**.

```python
# ==================== ESEMPIO 9.1: LA TUA PRIMA FUNZIONE ====================
"""
def crea la funzione, ma NON la esegue: la funzione viene eseguita
solo quando viene CHIAMATA, con il suo nome seguito da parentesi.
Puoi chiamarla quante volte vuoi, in punti diversi del programma.
"""

def saluta():                      # definizione della funzione (avviene una volta)
    print("Ciao, benvenuto nel corso Python Master!")

saluta()    # prima chiamata: esegue il corpo della funzione
saluta()    # seconda chiamata: lo esegue di nuovo, identico
```

⚠️ **Errore comune:** definire una funzione con `def` e dimenticarsi di **chiamarla**. Se esegui solo il blocco `def saluta(): ...`, non succede nulla di visibile: la funzione viene creata, ma il suo codice non viene mai eseguito finché non la richiami con `saluta()`.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Parametri: Posizionali, Nominali e di Default

Una funzione diventa davvero utile quando può ricevere dati in ingresso, chiamati **parametri**, che modificano il suo comportamento a ogni chiamata.

```python
# ==================== ESEMPIO 9.2: PARAMETRI POSIZIONALI ====================
"""
I PARAMETRI (nome, eta) sono le 'etichette' definite nella funzione.
Gli ARGOMENTI ("Marco", 17) sono i valori reali passati alla chiamata.
Con i parametri POSIZIONALI, l'ordine con cui li passi conta:
il primo argomento va al primo parametro, e così via.
"""

def presenta(nome, eta):
    print(f"Ciao, mi chiamo {nome} e ho {eta} anni")

presenta("Marco", 17)     # nome="Marco", eta=17 -> ordine rispettato
presenta("Giulia", 16)    # una nuova chiamata, con argomenti diversi
```

```python
# ==================== ESEMPIO 9.3: ARGOMENTI NOMINALI E PARAMETRI DI DEFAULT ====================
"""
Gli argomenti NOMINALI (keyword) specificano esplicitamente a quale
parametro assegnare ogni valore: l'ordine, in questo caso, non conta
più. I parametri DI DEFAULT hanno un valore predefinito, usato se
la chiamata non lo specifica.
"""

def presenta(nome, eta, citta="Non specificata"):   # citta ha un valore di default
    print(f"{nome}, {eta} anni, vive a {citta}")

presenta("Marco", 17)                        # citta usa il default: "Non specificata"
presenta("Giulia", eta=16, citta="Milano")   # argomenti nominali: l'ordine non conta più
presenta(citta="Roma", nome="Luca", eta=18)  # funziona comunque, grazie ai nomi espliciti
```

⚠️ **Regola di sintassi:** i parametri con valore di default devono sempre essere collocati **dopo** quelli senza default nella definizione della funzione (es. `def f(a, b=10):` è valido, `def f(a=10, b):` genera un `SyntaxError`).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — `return`: Restituire un Valore

Finora le nostre funzioni si sono limitate a **stampare** un risultato con `print()`. Ma spesso serve che una funzione **restituisca** un valore, in modo da poterlo salvare in una variabile e riutilizzarlo altrove nel programma. Per questo si usa `return`.

```python
# ==================== ESEMPIO 9.4: FUNZIONI CON return ====================
"""
return interrompe IMMEDIATAMENTE l'esecuzione della funzione e
restituisce il valore indicato al punto in cui la funzione è
stata chiamata. Una funzione senza return restituisce sempre None.
"""

def calcola_media(voto1, voto2, voto3):
    media = (voto1 + voto2 + voto3) / 3
    return media          # restituisce il valore calcolato, senza stamparlo

media_marco = calcola_media(7, 8, 9)   # il valore restituito viene salvato in una variabile
print(f"La media di Marco è {media_marco:.2f}")

# Una funzione SENZA return restituisce sempre None
def saluta():
    print("Ciao!")
    # nessun return qui

risultato = saluta()
print(risultato)   # None -> saluta() stampa "Ciao!" ma non restituisce alcun valore utilizzabile
```

⚠️ **Errore comune:** confondere `print()` (mostra un valore a schermo, ma non lo rende riutilizzabile) con `return` (restituisce un valore che **può essere salvato e riutilizzato**). Una funzione che deve fornire un risultato ad altre parti del programma **deve** usare `return`, non solo `print()`.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Scope Locale e Globale

Lo **scope** (ambito di visibilità) di una variabile determina **da dove** quella variabile può essere letta o modificata. Le variabili create **dentro** una funzione sono **locali**: esistono solo all'interno di quella funzione e scompaiono al termine della sua esecuzione.

```python
# ==================== ESEMPIO 9.5: SCOPE LOCALE vs GLOBALE ====================
"""
Le variabili definite DENTRO una funzione (scope locale) non sono
visibili al di FUORI di essa. Le variabili definite fuori da ogni
funzione (scope globale) sono invece visibili ovunque, comprese
dentro le funzioni (in LETTURA).
"""

messaggio_globale = "Sono visibile ovunque"   # variabile globale

def mia_funzione():
    messaggio_locale = "Esisto solo qui dentro"   # variabile locale
    print(messaggio_globale)    # OK: le variabili globali sono leggibili dentro le funzioni
    print(messaggio_locale)     # OK: siamo nel suo stesso scope

mia_funzione()
print(messaggio_globale)        # OK: è globale
# print(messaggio_locale)       # NameError: 'messaggio_locale' non esiste qui fuori!
```

💡 **Best Practice:** evita di modificare variabili globali dall'interno di una funzione (esiste la parola chiave `global` per farlo, ma il suo uso è generalmente sconsigliato: rende il codice più difficile da seguire). Il modo corretto per "far uscire" un dato da una funzione è **sempre** `return`.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — `*args` e `**kwargs`

A volte non si sa in anticipo **quanti** argomenti una funzione dovrà ricevere. Python offre due sintassi speciali per questo scenario.

```python
# ==================== ESEMPIO 9.6: *args ====================
"""
*args (il nome 'args' è una convenzione, non un obbligo) raccoglie
un numero QUALSIASI di argomenti posizionali in una TUPLA, su cui
si può iterare normalmente con un ciclo for.
"""

def somma_tutti(*numeri):
    totale = 0
    for numero in numeri:
        totale += numero
    return totale

print(somma_tutti(1, 2, 3))          # 6
print(somma_tutti(10, 20, 30, 40))   # 100 -> funziona con QUALSIASI numero di argomenti
```

```python
# ==================== ESEMPIO 9.7: **kwargs ====================
"""
**kwargs (keyword arguments) raccoglie un numero qualsiasi di
argomenti NOMINALI in un DIZIONARIO, dove le chiavi sono i nomi
degli argomenti passati alla chiamata.
"""

def presenta_studente(**dati):
    for chiave, valore in dati.items():
        print(f"{chiave}: {valore}")

presenta_studente(nome="Marco", eta=17, scuola="Liceo Scientifico")
# nome: Marco
# eta: 17
# scuola: Liceo Scientifico
```

| Sintassi | Raccoglie | In quale struttura |
| :--- | :--- | :--- |
| `*args` | Argomenti posizionali extra | Una tupla |
| `**kwargs` | Argomenti nominali extra | Un dizionario |

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Docstring e Buone Pratiche di Documentazione

Una **docstring** è una stringa di documentazione, racchiusa tra tripli apici, posta **subito dopo** la riga `def`: descrive cosa fa la funzione, quali parametri accetta e cosa restituisce. È accessibile anche con la funzione `help()`.

```python
# ==================== ESEMPIO 9.8: DOCSTRING PROFESSIONALI ====================
"""
Una buona docstring risponde a tre domande: cosa fa la funzione,
cosa riceve in ingresso, cosa restituisce. Non sostituisce i
commenti nel corpo della funzione, ma ne descrive lo scopo generale.
"""

def calcola_sconto(prezzo, percentuale=10):
    """
    Calcola il prezzo scontato di un prodotto.

    Parametri:
        prezzo (float): il prezzo originale del prodotto
        percentuale (int): la percentuale di sconto da applicare (default: 10)

    Restituisce:
        float: il prezzo finale, dopo lo sconto
    """
    sconto = prezzo * (percentuale / 100)
    return prezzo - sconto

print(calcola_sconto(100, 20))   # 80.0
help(calcola_sconto)              # mostra automaticamente la docstring della funzione
```

💡 **Best Practice:** scrivi sempre una docstring per le funzioni che condividi con altri (compagni, docenti) o che riprenderai dopo molto tempo: un buon nome di funzione aiuta, ma solo la docstring spiega davvero cosa aspettarsi da parametri e valore restituito.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 9

1. Una **funzione** (`def nome():`) racchiude codice riutilizzabile, richiamabile ovunque con il suo nome seguito da parentesi.
2. I **parametri** possono essere posizionali (l'ordine conta), passati per nome (l'ordine non conta) o avere un **valore di default**.
3. `return` restituisce un valore utilizzabile altrove nel programma; una funzione senza `return` restituisce sempre `None`.
4. Le variabili definite dentro una funzione hanno **scope locale** (invisibili fuori); quelle definite fuori hanno **scope globale** (leggibili anche dentro le funzioni).
5. `*args` raccoglie argomenti posizionali extra in una **tupla**; `**kwargs` raccoglie argomenti nominali extra in un **dizionario**.
6. Una **docstring** (tra tripli apici, subito dopo `def`) documenta scopo, parametri e valore restituito di una funzione, ed è consultabile con `help()`.

---

### 🧪 Laboratorio Pratico: "La Cassetta degli Attrezzi Matematici"

**Obiettivo:** Costruire un piccolo insieme di funzioni riutilizzabili, applicando parametri, `return` e docstring.

1. Scrivi una funzione `calcola_area_rettangolo(base, altezza)` che **restituisca** (non stampi) l'area calcolata, con una docstring completa.
2. Scrivi una funzione `calcola_sconto(prezzo, percentuale=10)` (puoi riusare l'Esempio 9.8) e chiamala sia con il valore di default, sia specificando esplicitamente una percentuale diversa.
3. Scrivi una funzione `somma_valori(*numeri)` che, usando `*args`, restituisca la somma di un numero qualsiasi di valori passati.
4. Scrivi una funzione `crea_profilo(**dati)` che, usando `**kwargs`, stampi un profilo formattato a partire da un numero qualsiasi di informazioni nominali (es. `crea_profilo(nome="Marco", scuola="Liceo Scientifico")`).
5. **Sfida finale:** scrivi una funzione `e_numero_pari(numero)` che restituisca `True` o `False`, e usala dentro un ciclo `for` per filtrare, da una lista di numeri a tua scelta, solo quelli pari.

*Suggerimento:* riusa la struttura degli Esempi 9.4, 9.6 e 9.7 di questo modulo.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa succede se definisci una funzione con `def saluta(): ...` ma non la chiami mai nel programma?
- A) Python genera un errore, perché ogni funzione definita deve essere chiamata
- B) Il codice al suo interno non viene mai eseguito
- C) Il codice al suo interno viene eseguito automaticamente una volta
- D) Python la elimina automaticamente dalla memoria

**Domanda 2:** Qual è la differenza tra `print()` e `return` all'interno di una funzione?
- A) Sono equivalenti: fanno esattamente la stessa cosa
- B) `print()` mostra un valore a schermo ma non lo rende riutilizzabile altrove; `return` restituisce un valore che può essere salvato in una variabile
- C) `return` mostra un valore a schermo, `print()` lo restituisce alla chiamata
- D) `print()` può essere usato solo fuori dalle funzioni

**Domanda 3:** Cosa restituisce una funzione che non contiene alcuna istruzione `return`?
- A) Un errore di sintassi
- B) Il valore `0`
- C) `None`
- D) L'ultimo valore stampato con `print()`

**Domanda 4:** Cosa raccoglie il parametro `*args` in una definizione di funzione?
- A) Un numero qualsiasi di argomenti nominali, in un dizionario
- B) Un numero qualsiasi di argomenti posizionali, in una tupla
- C) Un solo argomento obbligatorio
- D) Solo argomenti di tipo stringa

---

[🔙 Torna all'indice](#indice)