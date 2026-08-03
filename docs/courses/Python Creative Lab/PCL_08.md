<a id="indice-del-modulo"></a>
# 📘 Modulo 8 — Le Funzioni: Insegna nuovi trucchi a Python!

Benvenuti all'ottavo modulo di **Python Creative Lab**!
Immaginate di dover scrivere lo stesso codice per disegnare un quadrato, o per calcolare un punteggio, decine di volte all'interno del vostro programma. Che noia, vero? Oltre a sprecare tempo, il vostro codice diventerebbe lunghissimo e difficile da leggere.

Ecco che entrano in gioco le **Funzioni**! Una funzione è come una "scatola magica" in cui impacchettiamo un pezzo di codice e gli diamo un nome. Ogni volta che ci serve quel codice, invece di riscriverlo, ci basta "chiamare" il nome della scatola. È il modo in cui insegniamo a Python (e a Terry!) nuovi comandi personalizzati.

Pronti a dare i superpoteri al vostro codice? Cominciamo!

---

## 📑 Indice del Modulo
- [1. Creare una Funzione (`def`)](#cap-1)
- [2. Chiamare una Funzione](#cap-2)
- [3. I Parametri: Dare istruzioni precise](#cap-3)
- [4. Il Ritorno: Ricevere una risposta (`return`)](#cap-4)
- [5. 🛠 Mini Progetto: Il Cielo Stellato di Terry](#cap-5)
- [6. ❓ Quiz di fine modulo e 🏆 Badge](#cap-6)

---

<a id="cap-1"></a>
## 1. Creare una Funzione (`def`)

### 📘 Imparo
Per creare una funzione in Python, usiamo una parola chiave speciale: `def` (che sta per *define*, "definire"). 
Dopo `def`, scriviamo il **nome** che vogliamo dare alla nostra funzione, seguito da parentesi tonde `()` e dai due punti `:`.
Tutto il codice che fa parte della funzione deve essere **indentato** (spostato a destra con uno spazio o il tasto Tab).

### 👀 Osservo
```python
# DEFINIAMO LA FUNZIONE
def saluta_squadra():
    print("Benvenuti al torneo!")
    print("Preparatevi a giocare!")
    print("Che vinca il migliore!")
```

### 🧠 Capisco
- `def saluta_squadra():` ➔ Stiamo insegnando a Python un nuovo comando chiamato `saluta_squadra`.
- Le tre righe di `print` sono indentate: questo fa capire a Python che sono *dentro* la scatola magica della funzione.
- **Attenzione:** Se eseguite solo questo codice, non succederà nulla! Abbiamo solo *creato* la funzione, ma non le abbiamo ancora detto di mettersi al lavoro.

### 🚀 Creo
**Missione:** Definisci una funzione chiamata `fai_il_tifo()`. Al suo interno, scrivi tre `print` che stampano cori di incoraggiamento (es. "Forza ragazzi!", "Non mollate mai!").

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-2"></a>
## 2. Chiamare una Funzione

### 📘 Imparo
Dopo aver "insegnato" la funzione a Python (definendola con `def`), per farle eseguire il codice dobbiamo **chiamarla** (o *invocarla*). 
Per chiamare una funzione, basta scrivere il suo nome seguito dalle parentesi tonde `()`.

### 👀 Osservo
```python
def avviso_pericolo():
    print("⚠️ ATTENZIONE!")
    print("Livello di energia basso!")

# IL PROGRAMMA VERO E PROPRIO INIZIA QUI
print("Inizio esplorazione...")

avviso_pericolo() # <-- Chiamata della funzione!

print("Esplorazione continuata...")

avviso_pericolo() # <-- La richiamiamo!
```

### 🧠 Capisco
- Il programma inizia dalle righe non indentate.
- Quando Python legge `avviso_pericolo()`, "salta" dentro la funzione, esegue i due print di pericolo, e poi torna esattamente dove si era interrotto.
- Il grande vantaggio? Abbiamo stampato l'avviso due volte, ma abbiamo scritto il codice interno una volta sola!

### 🚀 Creo
**Missione:** Usa la funzione `fai_il_tifo()` che hai creato prima e "chiamala" 3 volte di fila nel tuo programma principale per fare un tifo da stadio!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-3"></a>
## 3. I Parametri: Dare istruzioni precise

### 📘 Imparo
Le funzioni diventano davvero potenti quando possono adattarsi. Immaginate di voler salutare giocatori diversi. Invece di creare mille funzioni (`saluta_alex()`, `saluta_sara()`), possiamo creare una sola funzione e passarle un'informazione in ingresso, chiamata **Parametro** (o Argomento).
Il parametro si inserisce tra le parentesi tonde.

### 👀 Osservo
```python
def saluta_giocatore(nome):
    print("Ciao", nome, "! Benvenuto nel livello 2.")

# Chiamiamo la funzione passando valori diversi
saluta_giocatore("Alex")
saluta_giocatore("Sara")
saluta_giocatore("Leo")
```

### 🧠 Capisco
- `nome` è come una variabile vuota che aspetta di essere riempita.
- Quando scriviamo `saluta_giocatore("Alex")`, Python mette `"Alex"` dentro `nome` ed esegue il print.
- Possiamo passare anche più di un parametro separandoli con la virgola: `def disegna_poligono(lati, colore):`

### 🚀 Creo
**Missione:** Crea una funzione chiamata `presentazione(nome, eta)`. La funzione deve stampare la frase: `"Mi chiamo [nome] e ho [eta] anni"`. Poi chiamala due volte passando dati diversi (es. i dati tuoi e del tuo compagno di banco).

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-4"></a>
## 4. Il Ritorno: Ricevere una risposta (`return`)

### 📘 Imparo
Finora le nostre funzioni hanno fatto qualcosa di visibile (stampare a schermo). Ma spesso vogliamo che una funzione faccia un calcolo "dietro le quinte" e ci restituisca il risultato per poterlo usare dopo.
Per fare questo, usiamo la parola chiave `return` (restituisci). Quando una funzione incontra `return`, sputa fuori il risultato e si ferma immediatamente.

### 👀 Osservo
```python
def calcola_doppio(numero):
    risultato = numero * 2
    return risultato

# Salviamo la risposta della funzione in una variabile
punti_bonus = calcola_doppio(50)

print("Hai ottenuto", punti_bonus, "punti bonus!")
```

### 🧠 Capisco
- La funzione `calcola_doppio(50)` calcola 100, e con `return` passa questo 100 al programma principale.
- Il valore 100 viene salvato nella variabile `punti_bonus` che poi stampiamo.
- **Importante:** Il `print` mostra le cose a noi umani; il `return` passa i dati al computer affinché li usi in altre parti del programma!

### 🚀 Creo
**Missione:** Scrivi una funzione `somma(a, b)` che prende due numeri, li somma e restituisce il risultato con `return`. Salva il risultato in una variabile chiamata `totale` e stampalo.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-5"></a>
## 5. 🛠 Mini Progetto: Il Cielo Stellato di Terry

Applichiamo la magia delle funzioni e dei parametri per insegnare a Terry la Tartaruga a disegnare una stella. Una volta che Terry saprà farlo, riempiremo il cielo di stelle con pochissime righe di codice!

### Il progetto
Creeremo una funzione `disegna_stella(dimensione, colore_stella)` che insegna a Terry i movimenti esatti. Poi chiameremo la funzione più volte spostando Terry qua e là.

### Codice del Progetto Guidato:
```python
import random # Ci servirà per posizioni casuali!

# --- 1. INSEGNIAMO A TERRY A FARE UNA STELLA ---
def disegna_stella(dimensione, colore_stella):
    color(colore_stella)
    begin_fill()
    
    # Ciclo per fare le 5 punte della stella
    for i in range(5):
        forward(dimensione)
        right(144)
        
    end_fill()

# --- 2. PREPARIAMO IL CIELO ---
bgcolor("black")
speed(0) # Velocità massima!
hideturtle()

# --- 3. DISEGNIAMO LE STELLE CHIAMANDO LA FUNZIONE ---

# Stella 1
penup()
goto(-100, 150) # Spostiamoci
pendown()
disegna_stella(50, "yellow") # Chiamiamo la funzione!

# Stella 2
penup()
goto(150, 100)
pendown()
disegna_stella(30, "white") # Stella più piccola e bianca!

# Stella 3
penup()
goto(-150, -100)
pendown()
disegna_stella(80, "gold") # Stella grande e dorata!
```

🐢 **Terry sfida:** *Ora che Terry sa come si fa una stella in automatico, riesci a usare un ciclo `for` nel programma principale per disegnare 20 stelle in posizioni casuali usando `random.randint(-200, 200)` per le coordinate X e Y?*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-6"></a>
## 6. ❓ Quiz e 🏆 Badge

Testa le tue nuove abilità sulle funzioni con queste 10 domande!

1. **Quale parola chiave si usa in Python per creare una nuova funzione?**
   - [ ] A) `function`
   - [ ] B) `create`
   - [x] C) `def`
   - [ ] D) `fun`

2. **Cosa indica a Python che un blocco di codice fa parte di una funzione?**
   - [ ] A) È scritto in maiuscolo
   - [ ] B) È racchiuso tra parentesi quadre
   - [x] C) È indentato (spostato a destra)
   - [ ] D) Si trova alla fine del file

3. **Cosa succede se definisco una funzione ma non la "chiamo" mai nel programma?**
   - [ ] A) Python segnala un errore
   - [ ] B) La funzione viene eseguita alla fine del programma
   - [x] C) Il codice dentro la funzione non viene mai eseguito
   - [ ] D) Il computer si blocca

4. **Come si chiama la funzione `calcola_punti()`?**
   - [ ] A) `call calcola_punti`
   - [x] B) `calcola_punti()`
   - [ ] C) `run calcola_punti()`
   - [ ] D) `def calcola_punti()`

5. **Cos'è un "parametro" di una funzione?**
   - [ ] A) Un errore nel codice
   - [x] B) Una variabile (un dato) che passiamo alla funzione quando la chiamiamo
   - [ ] C) Il nome della funzione stessa
   - [ ] D) Il tempo massimo di esecuzione

6. **Nel codice `def saluta(nome):`, cosa rappresenta `nome`?**
   - [ ] A) Il nome della funzione
   - [x] B) Il parametro della funzione
   - [ ] C) Un comando per stampare
   - [ ] D) Un tipo di dato numerico

7. **Qual è la differenza principale tra `print` e `return` in una funzione?**
   - [ ] A) Sono la stessa identica cosa
   - [ ] B) `return` stampa a colori, `print` in bianco e nero
   - [x] C) `print` mostra un testo a schermo, `return` restituisce un valore al programma dietro le quinte
   - [ ] D) `print` funziona solo con i numeri, `return` solo con i testi

8. **Se una funzione contiene `return`, cosa succede subito dopo che quella riga viene eseguita?**
   - [x] A) La funzione si ferma immediatamente e torna al programma principale
   - [ ] B) La funzione ricomincia da capo
   - [ ] C) Python chiede un input all'utente
   - [ ] D) La funzione esegue le righe successive (se ci sono)

9. **Che vantaggio mi dà usare le funzioni con Terry la Tartaruga (es. `disegna_quadrato()`)?**
   - [ ] A) Terry si muove più velocemente
   - [ ] B) I colori diventano più brillanti
   - [x] C) Posso disegnare quella forma molte volte senza dover riscrivere tutti i comandi di movimento
   - [ ] D) Nessuno, Terry non supporta le funzioni

10. **Quanti parametri può avere una funzione?**
    - [ ] A) Esattamente uno
    - [ ] B) Nessuno
    - [ ] C) Massimo tre
    - [x] D) Quanti ne servono (zero, uno o molti separati da virgola)

### 🏆 Badge Sbloccato: **⚙️ Ingegnere del Codice**
Congratulazioni! Hai completato il Modulo 8 e ottenuto il badge **Ingegnere del Codice**, portandoti a casa ben **250 XP**! 
Ora non scrivi più il codice riga per riga in modo ripetitivo, ma costruisci blocchi intelligenti, riutilizzabili e strutturati. Il tuo codice sta diventando sempre più professionale.

Nel Modulo 9 esploreremo un altro potentissimo strumento: le **Liste**, per insegnare al computer a gestire enormi quantità di dati tutti insieme!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)
