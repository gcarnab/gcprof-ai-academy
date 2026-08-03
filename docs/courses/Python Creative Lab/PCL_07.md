<a id="indice-del-modulo"></a>
# 📘 Modulo 7 — Input e Output: Parliamo con Python!

Benvenuti nel settimo modulo di **Python Creative Lab**!
Finora i nostri programmi hanno fatto tutto da soli: gli davamo delle istruzioni e loro le eseguivano dall'inizio alla fine. Ma cosa succede se vogliamo che il programma ci faccia una domanda? O se vogliamo decidere il colore del disegno *mentre* il programma è in esecuzione?

In questo modulo scopriremo i concetti di **Input** (i dati che entrano nel computer) e **Output** (i dati che escono). Impareremo a creare programmi interattivi che "chiacchierano" con l'utente e si adattano alle sue scelte. 

Siete pronti a dare voce al vostro codice? Iniziamo!

---

## 📑 Indice del Modulo
- [1. Output: Far parlare Python (`print`)](#cap-1)
- [2. Input: Ascoltare l'utente (`input`)](#cap-2)
- [3. Numeri o Parole? La magia di `int()`](#cap-3)
- [4. Input visivo con Terry la Tartaruga](#cap-4)
- [5. 🛠 Mini Progetto: Il Disegnatore Interattivo](#cap-5)
- [6. ❓ Quiz di fine modulo e 🏆 Badge](#cap-6)

---

<a id="cap-1"></a>
## 1. Output: Far parlare Python (`print`)

### 📘 Imparo
L'**Output** è qualsiasi informazione che il computer "sputa fuori" per mostrarla a noi. Abbiamo già visto un tipo di output visivo: i disegni di Terry! Ma se vogliamo far scrivere del testo al computer, usiamo il comando `print()` (che in inglese significa "stampa").

Possiamo usare `print()` per mostrare un messaggio di benvenuto, i risultati di un calcolo, o il contenuto di una variabile.

### 👀 Osservo
```python
nome_giocatore = "Alex"
punteggio = 150

print("Benvenuto nel gioco!")
print("Il giocatore attuale è:")
print(nome_giocatore)
print("Punteggio totale:", punteggio)
```

### 🧠 Capisco
- `print("Benvenuto nel gioco!")` ➔ Mostra esattamente il testo tra virgolette.
- `print(nome_giocatore)` ➔ Python va a cercare la variabile `nome_giocatore` e stampa il suo contenuto (`Alex`).
- `print("Punteggio totale:", punteggio)` ➔ Usando la virgola, possiamo combinare un testo fisso con una variabile sulla stessa riga!

### 🚀 Creo
**Missione:** Crea due variabili, `animale = "Cane"` e `zampe = 4`. Usa il comando `print()` per far scrivere a Python questa frase: `"Il Cane ha 4 zampe"`, combinando il testo e le variabili.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-2"></a>
## 2. Input: Ascoltare l'utente (`input`)

### 📘 Imparo
Se l'output esce, l'**Input** entra! Per chiedere un'informazione a chi sta usando il nostro programma, utilizziamo il comando `input()`. 

Quando Python incontra un `input()`, **mette in pausa il programma**. Aspetta che l'utente scriva qualcosa sulla tastiera e prema il tasto *Invio*. Quello che l'utente ha scritto viene poi salvato dentro una variabile per poterlo riutilizzare.

### 👀 Osservo
```python
print("Ciao! Come ti chiami?")
nome_utente = input()

print("Piacere di conoscerti,", nome_utente)
```
*Esiste anche una scorciatoia per fare la domanda direttamente dentro le parentesi:*
```python
colore_scelto = input("Qual è il tuo colore preferito? ")
print("Ottima scelta, adoro il colore", colore_scelto)
```

### 🧠 Capisco
- `input("Qual è il tuo colore preferito? ")` ➔ Mostra la domanda sullo schermo. Il programma si ferma.
- Se io scrivo `rosso` e premo Invio, la variabile `colore_scelto` diventa `"rosso"`.
- Poi, con il `print`, Python unisce il testo e la variabile creando un messaggio personalizzato!

### 🚀 Creo
**Missione:** Scrivi un mini-programma che ti chiede: `"Qual è il tuo supereroe preferito?"` e poi risponde: `"Wow, [nome_supereroe] è fortissimo!"`

🦉 **Ada racconta:** *Tutte le app che usi, da WhatsApp ai videogiochi, sono basate su Input e Output. Quando tocchi lo schermo per inviare un messaggio (Input), l'app lo mostra nella chat (Output).*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-3"></a>
## 3. Numeri o Parole? La magia di `int()`

### 📘 Imparo
C'è un trabocchetto famosissimo in cui cadono tutti i programmatori alle prime armi! 
Quando usiamo il comando `input()`, **Python trasforma sempre la risposta in un testo (stringa)**, anche se l'utente digita un numero. 

Se l'utente digita `10`, Python lo legge come la parola `"10"`, non come il numero dieci. Se proviamo a fare matematica con una parola, il programma andrà in tilt! Per risolvere il problema, dobbiamo trasformare il testo in un numero intero (Integer) usando il comando `int()`.

### 👀 Osservo
```python
# CHIEDIAMO L'ETA'
eta_testo = input("Quanti anni hai? ")

# TRASFORMIAMO IL TESTO IN UN NUMERO
eta_numero = int(eta_testo)

# ORA POSSIAMO FARE I CALCOLI!
eta_futura = eta_numero + 10
print("Tra dieci anni avrai", eta_futura, "anni!")
```

### 🧠 Capisco
- `int()` prende ciò che c'è tra le parentesi e tenta di convertirlo in un numero vero e proprio.
- Se ci dimenticassimo di usare `int()`, Python proverebbe ad aggiungere 10 alla parola `"10"` e andrebbe in errore, perché non sa come sommare testo e numeri!

🐞 **Bug avvisa:** *Esiste una scorciatoia potentissima. Puoi chiedere e trasformare in numero tutto in una sola riga, mettendo l'input dentro l'int! Così: `numero = int(input("Inserisci un numero: "))`.*

### 🚀 Creo
**Missione:** Chiedi all'utente in che anno è nato usando `int(input(...))`. Poi calcola la sua età sottraendo l'anno di nascita all'anno corrente (es. 2026) e usa un `print` per mostrargli il risultato!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-4"></a>
## 4. Input visivo con Terry la Tartaruga

### 📘 Imparo
Finora abbiamo usato l'input testuale standard. Ma quando lavoriamo con Terry la Tartaruga, abbiamo a disposizione delle comode "finestre a comparsa" (pop-up) grafiche perfette per chiedere informazioni!

- `textinput("Titolo", "Domanda")` ➔ Apre una finestrella per chiedere del testo (es. un nome o un colore).
- `numinput("Titolo", "Domanda")` ➔ Apre una finestrella progettata apposta per chiedere un numero (non serve usare `int()`!).

### 👀 Osservo
```python
# Chiediamo un colore (testo)
colore_penna = textinput("Scegli Colore", "Che colore vuoi usare? (es. red, blue, green)")

# Chiediamo una lunghezza (numero)
lunghezza_lato = numinput("Dimensione", "Quanto deve essere lungo il lato?")

# Usiamo i dati inseriti dall'utente per disegnare!
color(colore_penna)
forward(lunghezza_lato)
```

### 🧠 Capisco
- Quando il programma arriva a `textinput`, lo schermo di disegno si mette in pausa e appare una bella finestrella al centro dello schermo.
- Terry esegue i comandi successivi usando esattamente i dati digitati dall'utente! Questo rende il nostro programma di disegno interattivo e utilizzabile da chiunque!

### 🚀 Creo
**Missione:** Usa `numinput()` per chiedere all'utente lo spessore della penna (`pensize`) e `textinput()` per chiedergli il colore di sfondo (`bgcolor`). Poi fai fare a Terry un giro di 360 gradi (`circle(50)`)!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-5"></a>
## 5. 🛠 Mini Progetto: Il Disegnatore Interattivo

Uniamo le variabili del Modulo 6 e gli input del Modulo 7 per creare un programma fantastico!
Questo programma chiederà all'utente come vuole il suo triangolo e lo disegnerà su misura.

### Il progetto
Il programma aprirà delle finestre di dialogo per chiedere:
1. Il colore del bordo.
2. Il colore di riempimento.
3. La grandezza del triangolo.
Alla fine, userà `print()` nella console per ringraziare l'utente per aver usato il software!

### Codice del Progetto Guidato:
```python
# --- 1. CHIEDIAMO I DATI ALL'UTENTE ---
print("Benvenuto nel Disegnatore Interattivo!")

# Usiamo le finestre di Terry per raccogliere le informazioni
bordo = textinput("Colori", "Scegli il colore del bordo (es. black, blue):")
riempimento = textinput("Colori", "Scegli il colore interno (es. yellow, pink):")
lato = numinput("Grandezza", "Scegli la grandezza del triangolo (da 50 a 300):")

# --- 2. CONFIGURIAMO TERRY ---
speed(3)
pensize(4)
color(bordo, riempimento) # Il primo è il bordo, il secondo il riempimento!

# --- 3. DISEGNIAMO LA FORMA ---
begin_fill()
forward(lato)
left(120)
forward(lato)
left(120)
forward(lato)
left(120)
end_fill()

# --- 4. MESSAGGIO FINALE (OUTPUT) ---
print("Disegno completato con successo!")
print("Hai creato un bellissimo triangolo di colore", riempimento)
```

🐢 **Terry sfida:** *Riesci a modificare questo programma per far disegnare un quadrato invece di un triangolo, chiedendo sempre i colori all'utente? Ricordati di cambiare i gradi degli angoli!*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-6"></a>
## 6. ❓ Quiz e 🏆 Badge

Mettiti alla prova con le 10 domande sugli Input e Output per conquistare il badge del modulo!

1. **A cosa serve il comando `print()`?**
   - [ ] A) A inviare il documento alla stampante di casa
   - [x] B) A mostrare un testo o un valore sullo schermo
   - [ ] C) A far fermare il programma
   - [ ] D) A chiedere informazioni all'utente

2. **Qual è il comando corretto per unire testo e variabili in un output?**
   - [x] A) `print("Ciao", nome)`
   - [ ] B) `print("Ciao" nome)`
   - [ ] C) `print = "Ciao" + nome`
   - [ ] D) `print(nome, = "Ciao")`

3. **Cosa succede quando il programma esegue `input()`?**
   - [ ] A) Il programma termina subito
   - [ ] B) Si cancella lo schermo
   - [x] C) Il programma si mette in pausa e aspetta che l'utente scriva qualcosa
   - [ ] D) Terry disegna una riga

4. **Se uso la riga `risposta = input("Quanti anni hai?")`, di che tipo di dato sarà `risposta`?**
   - [ ] A) Un numero (Integer)
   - [x] B) Un testo (Stringa)
   - [ ] C) Un colore
   - [ ] D) Un comando Turtle

5. **A cosa serve il comando `int()`?**
   - [x] A) A trasformare un testo (come "50") in un numero vero e proprio (50)
   - [ ] B) A interrompere il programma
   - [ ] C) A stampare un numero
   - [ ] D) A chiedere informazioni all'utente

6. **Come scriveresti per chiedere un numero all'utente e convertirlo subito?**
   - [ ] A) `input(int("Inserisci numero: "))`
   - [x] B) `int(input("Inserisci numero: "))`
   - [ ] C) `input_int("Inserisci numero: ")`
   - [ ] D) `numero = input() + int()`

7. **Qual è la differenza tra `textinput` e `numinput` usati con Terry?**
   - [ ] A) `textinput` non funziona su Python, `numinput` sì
   - [ ] B) Sono identici, fanno la stessa cosa
   - [ ] C) `textinput` cambia il colore, `numinput` cambia la dimensione
   - [x] D) `textinput` chiede all'utente una parola o testo, `numinput` chiede un numero

8. **Cosa apparirà a schermo eseguendo: `print("3" + "3")`?**
   - [ ] A) 6
   - [x] B) 33
   - [ ] C) Errore
   - [ ] D) "3" + "3"

9. **Che errore commetto in questo codice: `eta = input("Età?")` seguito da `eta_futura = eta + 5`?**
   - [ ] A) Ho dimenticato le virgolette in eta_futura
   - [ ] B) Manca il comando print
   - [x] C) Sto cercando di sommare un numero (5) a un testo (eta) senza aver usato `int()`
   - [ ] D) Nessun errore, funzionerà

10. **Se volessi chiedere all'utente quanti lati vuole per il suo poligono geometrico grafico, quale comando sarebbe migliore?**
    - [ ] A) `testo = textinput("Lati", "Quanti lati?")`
    - [ ] B) `numero = print("Quanti lati?")`
    - [x] C) `lati = numinput("Poligono", "Quanti lati vuoi?")`
    - [ ] D) `lati = input("Quanti lati?")`

### 🏆 Badge Sbloccato: **🎙️ Comunicatore Python**
Lavoro eccezionale! Hai completato il Modulo 7 e conquistato il badge **Comunicatore Python**, guadagnando **200 XP**! I tuoi programmi ora non sono più chiusi in se stessi, ma possono comunicare col mondo esterno e adattarsi alle risposte degli utenti. 
Nel Modulo 8 faremo un altro grande passo: insegneremo al computer a prendere decisioni intelligenti usando i **Costrutti Condizionali (If / Else)**!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)
