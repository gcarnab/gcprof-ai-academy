# 🐍 Modulo 4 — Input, Output e Conversioni di Tipo

- **Corso:** Python Master — Dalle Basi al Mondo Reale
- **Piattaforma:** GCProf Academy
- **Livello:** 🟢 Base (Fase 1 — Le Fondamenta del Linguaggio)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 2 (variabili, tipi di dato, conversioni numeriche), Modulo 3 (stringhe, f-string)
- **Obiettivo Didattico:** Costruire piccoli programmi interattivi che leggono dati dall'utente, li convertono nel tipo corretto e restituiscono un output ben formattato.

---

<a id="indice"></a>
# 📑 Indice del Modulo 4

1. [Capitolo 1 — La Funzione `input()`: Far Parlare l'Utente al Programma](#capitolo-1)
2. [Capitolo 2 — `input()` Restituisce Sempre una Stringa](#capitolo-2)
3. [Capitolo 3 — Conversioni Esplicite Applicate all'Input](#capitolo-3)
4. [Capitolo 4 — `print()` Avanzato: i Parametri `sep` ed `end`](#capitolo-4)
5. [Capitolo 5 — Costruire un Programma Interattivo Completo](#capitolo-5)
6. [Capitolo 6 — Validare un Input Semplice](#capitolo-6)
7. [Capitolo 7 — Errori Comuni con `input()`](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — La Funzione `input()`: Far Parlare l'Utente al Programma

Finora i nostri programmi hanno sempre lavorato con dati scritti direttamente nel codice. La funzione **`input()`** permette invece di **mettere in pausa** l'esecuzione del programma, mostrare un messaggio (opzionale) e aspettare che l'utente scriva qualcosa da tastiera e prema Invio.

### 💬 L'Analogia del Dialogo

```
  PROGRAMMA:  "Come ti chiami?"   ──────▶   attende...
  UTENTE:     digita "Marco" e preme Invio
  PROGRAMMA:  riprende l'esecuzione, con "Marco" salvato in una variabile
```

```python
# ==================== ESEMPIO 4.1: input() DI BASE ====================
"""
Il testo passato a input() (tra parentesi) è il PROMPT: il messaggio
mostrato all'utente per indicargli cosa scrivere. Il valore digitato
va sempre SALVATO in una variabile, altrimenti va perso.
"""

nome = input("Come ti chiami? ")   # il programma si ferma qui, in attesa
print(f"Ciao, {nome}! Benvenuto nel corso.")
```

💡 **Best Practice:** scrivi sempre un prompt chiaro, che spieghi esattamente cosa ci si aspetta dall'utente (es. `"Inserisci la tua età: "` è molto meglio di `"Età: "` o, peggio, nessun messaggio).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — `input()` Restituisce Sempre una Stringa

Questo è **il concetto più importante** dell'intero modulo, e la causa del 90% degli errori dei principianti: **qualunque cosa scriva l'utente**, anche se digita solo numeri, `input()` restituisce **sempre e solo** un valore di tipo `str`.

```python
# ==================== ESEMPIO 4.2: input() È SEMPRE UNA STRINGA ====================
"""
Anche se l'utente digita '17', Python lo tratta come il TESTO "17",
non come il numero 17. type() ce lo conferma senza ambiguità.
"""

eta = input("Quanti anni hai? ")   # l'utente digita, ad esempio, 17

print(eta)             # 17
print(type(eta))       # <class 'str'>  -> è una STRINGA, non un numero!

# Di conseguenza, questa operazione NON fa quello che ci si aspetterebbe:
# print(eta + 1)   # TypeError: can only concatenate str (not "int") to str
```

⚠️ **Attenzione:** se provi a fare calcoli matematici direttamente su un valore restituito da `input()` senza convertirlo, otterrai un errore (se provi a sommarci un numero) oppure un comportamento inatteso: `"17" * 2` non restituisce `34`, ma la stringa `"1717"` (ricordi l'operatore `*` sulle stringhe del Modulo 3?).

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Conversioni Esplicite Applicate all'Input

La soluzione, che già conosci dal Modulo 2, è convertire esplicitamente il risultato di `input()` con `int()` o `float()`, a seconda del tipo di dato che ti aspetti.

```python
# ==================== ESEMPIO 4.3: CONVERTIRE L'INPUT ====================
"""
La conversione può avvenire in due momenti: SUBITO, incapsulando
input() dentro int()/float() (pratica più comune ed elegante),
oppure IN UN SECONDO MOMENTO, su una variabile già creata.
"""

# Modo 1: conversione "al volo", nella stessa riga
eta = int(input("Quanti anni hai? "))
print(f"Tra un anno avrai {eta + 1} anni")   # ora funziona: eta è un int

# Modo 2: conversione in un secondo momento
prezzo_testo = input("Inserisci il prezzo: ")
prezzo = float(prezzo_testo)
print(f"Il prezzo con IVA è {prezzo * 1.22:.2f} €")
```

| Cosa mi aspetto dall'utente | Conversione da usare |
| :--- | :--- |
| Un numero intero (età, quantità, anno) | `int(input(...))` |
| Un numero decimale (prezzo, media, percentuale) | `float(input(...))` |
| Del testo (nome, indirizzo email) | Nessuna conversione: resta `str` |

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — `print()` Avanzato: i Parametri `sep` ed `end`

`print()` accetta due parametri opzionali molto utili per controllare la formattazione dell'output, oltre ai valori da stampare.

| Parametro | Cosa controlla | Valore di default |
| :--- | :--- | :--- |
| `sep` | Il carattere che separa più valori passati a `print()` | Uno spazio `" "` |
| `end` | Cosa viene aggiunto **dopo** l'output, invece del solito "a capo" | Un a capo `"\n"` |

```python
# ==================== ESEMPIO 4.4: I PARAMETRI sep ED end ====================
"""
Di default, print() separa i valori con uno spazio e termina sempre
con un a capo. Entrambi i comportamenti si possono personalizzare.
"""

print("Mario", "Rossi", "17 anni")                  # Mario Rossi 17 anni (sep di default: spazio)
print("Mario", "Rossi", "17 anni", sep=" | ")        # Mario | Rossi | 17 anni

print("Caricamento", end="")     # NON va a capo dopo questa riga...
print("...")                      # ...quindi questa stampa continua sulla stessa riga
# Output complessivo: Caricamento...

for i in range(5):
    print(i, end=" ")   # stampa tutti i numeri sulla stessa riga, separati da spazio
# Output: 0 1 2 3 4
```

*Perché ti serve: `end=""` è particolarmente utile quando, più avanti, userai i cicli (Modulo 6) per costruire output su un'unica riga, come barre di progresso o elenchi compatti.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Costruire un Programma Interattivo Completo

Mettiamo insieme tutto ciò che abbiamo visto finora in un piccolo programma realistico.

```python
# ==================== ESEMPIO 4.5: PROGRAMMA INTERATTIVO COMPLETO ====================
"""
Un ciclo tipico di un programma interattivo:
1) INPUT: leggo i dati dall'utente, convertendoli nel tipo corretto
2) ELABORAZIONE: eseguo i calcoli necessari
3) OUTPUT: presento il risultato in modo chiaro, con una f-string
"""

# --- 1) INPUT ---
nome = input("Come ti chiami? ")
voto1 = float(input("Primo voto: "))
voto2 = float(input("Secondo voto: "))
voto3 = float(input("Terzo voto: "))

# --- 2) ELABORAZIONE ---
media = (voto1 + voto2 + voto3) / 3

# --- 3) OUTPUT ---
print(f"\nCiao {nome}, la tua media è {media:.2f}")

if media >= 6:
    print("Complimenti, hai la sufficienza!")   # anticipazione: vedremo if nel Modulo 5
```

*Nota: l'ultima riga anticipa il costrutto `if`, che approfondiremo nel prossimo modulo — qui basta capire il flusso generale input → elaborazione → output.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Validare un Input Semplice

Cosa succede se, alla domanda `"Quanti anni hai? "`, l'utente scrive `"diciassette"` invece di `17`? `int("diciassette")` genera un errore che blocca il programma. Non abbiamo ancora gli strumenti per gestire completamente questo problema (lo vedremo nel Modulo 10, con `try`/`except`), ma possiamo già fare un primo controllo **preventivo**, usando il metodo `.isdigit()` delle stringhe.

```python
# ==================== ESEMPIO 4.6: UN PRIMO CONTROLLO PREVENTIVO ====================
"""
.isdigit() restituisce True se la stringa è composta SOLO da cifre
(0-9), False altrimenti. È un controllo semplice, utile per numeri
interi positivi, che vedremo affiancare a try/except nel Modulo 10.
"""

eta_testo = input("Quanti anni hai? ")

if eta_testo.isdigit():           # anticipazione del costrutto if (Modulo 5)
    eta = int(eta_testo)
    print(f"Perfetto, hai {eta} anni")
else:
    print("Attenzione: non hai inserito un numero valido!")
```

⚠️ **Limite di questo approccio:** `.isdigit()` non riconosce i numeri negativi né i numeri decimali (es. `"-5"` e `"3.14"` restituiscono `False`). Per una validazione completa e robusta serviranno gli strumenti del Modulo 10 — qui l'obiettivo è iniziare a ragionare in termini di "e se l'utente sbaglia?".

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Errori Comuni con `input()`

```python
# ==================== ESEMPIO 4.7: ERRORI TIPICI ====================
"""
I due errori più frequenti legati a input(): dimenticare la conversione
di tipo, e dimenticare di salvare il risultato in una variabile.
"""

# ERRORE 1: dimenticare la conversione
eta = input("Età: ")            # eta resta una STRINGA
# print(eta + 5)                # TypeError: can only concatenate str

# ERRORE 2: chiamare input() senza salvarlo in una variabile
input("Come ti chiami? ")       # il valore digitato viene PERSO: non è mai stato salvato!
# print(nome)                   # NameError: 'nome' non esiste, non è mai stata creata
```

| Errore | Causa | Soluzione |
| :--- | :--- | :--- |
| `TypeError: can only concatenate str` | Si usa il risultato di `input()` come numero senza convertirlo | Racchiudere `input()` in `int()` o `float()` |
| `ValueError: invalid literal for int()` | L'utente ha digitato qualcosa che non è un numero valido | Validare con `.isdigit()` (o, più avanti, con `try`/`except`) |
| Il valore digitato "scompare" | `input()` è stato chiamato senza salvarne il risultato in una variabile | Assegnare sempre `input()` a una variabile |

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 4

1. `input("messaggio")` mette in pausa il programma, mostra un prompt e restituisce ciò che l'utente digita.
2. `input()` restituisce **sempre e solo** una stringa (`str`), anche se l'utente digita numeri: va convertita esplicitamente con `int()` o `float()` quando serve fare calcoli.
3. `print()` accetta i parametri opzionali `sep` (separatore tra valori, default: spazio) ed `end` (cosa aggiungere alla fine, default: a capo).
4. Un programma interattivo tipico segue il flusso **Input → Elaborazione → Output**.
5. Il metodo `.isdigit()` permette un primo controllo preventivo sull'input, prima ancora di conoscere `try`/`except` (Modulo 10).
6. Dimenticare la conversione di tipo, o dimenticare di salvare `input()` in una variabile, sono gli errori più comuni per chi inizia.

---

### 🧪 Laboratorio Pratico: "Il Calcolatore di Mance"

**Obiettivo:** Costruire un piccolo programma interattivo completo che legge dati dall'utente, li elabora e restituisce un output formattato.

1. Chiedi all'utente, con `input()`, il **totale del conto** al ristorante (numero decimale) e la **percentuale di mancia** desiderata (numero intero, es. `15` per il 15%).
2. Converti correttamente entrambi i valori nel tipo numerico adeguato.
3. Calcola l'importo della mancia e il totale finale (conto + mancia).
4. Stampa un riepilogo usando una f-string, con i valori arrotondati a 2 cifre decimali, ad esempio:
   `Conto: 45.00 € | Mancia (15%): 6.75 € | Totale: 51.75 €`
5. Usa `print()` con `sep=" | "` per costruire una versione alternativa dello stesso riepilogo, passando i tre valori come argomenti separati invece che in un'unica f-string.
6. **Sfida finale:** aggiungi, prima del calcolo, un controllo con `.isdigit()` sulla percentuale di mancia inserita, stampando un messaggio di attenzione se l'utente non ha digitato un numero valido.

*Suggerimento:* riusa la struttura degli Esempi 4.3, 4.4 e 4.6 di questo modulo.

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Che tipo di dato restituisce sempre la funzione `input()`, indipendentemente da cosa digita l'utente?
- A) `int`
- B) `float`
- C) `str`
- D) Dipende da cosa digita l'utente

**Domanda 2:** Qual è il modo corretto per leggere un numero intero da tastiera e salvarlo già convertito nella variabile `eta`?
- A) `eta = input("Età: ")`
- B) `eta = int(input("Età: "))`
- C) `eta = input(int("Età: "))`
- D) `int(eta) = input("Età: ")`

**Domanda 3:** Cosa fa il parametro `end=""` in `print("Caricamento", end="")`?
- A) Cancella il testo appena stampato.
- B) Impedisce a `print()` di andare a capo dopo aver stampato "Caricamento".
- C) Ripete la parola "Caricamento" all'infinito.
- D) Genera un errore, perché `end` non può essere una stringa vuota.

**Domanda 4:** Perché `eta_testo.isdigit()` restituisce `False` se l'utente digita `"-5"`?
- A) Perché `.isdigit()` funziona solo con stringhe di un carattere.
- B) Perché il simbolo `-` non è una cifra: `.isdigit()` verifica che la stringa contenga solo cifre da 0 a 9.
- C) Perché i numeri negativi non esistono in Python.
- D) Perché `.isdigit()` funziona solo su variabili di tipo `int`.

---

[🔙 Torna all'indice](#indice)