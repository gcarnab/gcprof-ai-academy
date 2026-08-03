<a id="indice-del-modulo"></a>
# 📘 Modulo 10 — Condizioni: Prendere Decisioni con Python

Benvenuti al decimo modulo di **Python Creative Lab**!
Finora i nostri programmi hanno seguito un percorso lineare: Python leggeva le istruzioni dall'alto verso il basso e le eseguiva tutte, una per una. 
Ma i programmi intelligenti non fanno sempre la stessa cosa! A volte devono prendere delle **decisioni** in base a quello che succede, proprio come facciamo noi ogni giorno (es. *"Se piove, prendo l'ombrello, altrimenti metto gli occhiali da sole"*).

In questo modulo scopriremo come dotare il nostro codice (e la nostra tartaruga Terry) di logica decisionale usando le istruzioni condizionali: `if`, `elif` ed `else`.

Iniziamo a dare un "cervello" al nostro codice!

---

## 📑 Indice del Modulo
- [1. L'istruzione \`if\`: L'arte del "Se..."](#cap-1)
- [2. Gli Operatori di Confronto: Fare le domande giuste](#cap-2)
- [3. L'istruzione \`else\`: Il Piano B ("Altrimenti...")](#cap-3)
- [4. L'istruzione \`elif\`: Molteplici scelte](#cap-4)
- [5. 🛠 Mini Progetto: Il Recinto Magico di Terry](#cap-5)
- [6. ❓ Quiz di fine modulo e 🏆 Badge](#cap-6)

---

<a id="cap-1"></a>
## 1. L'istruzione `if`: L'arte del "Se..."

### 📘 Imparo
In Python, per far prendere una decisione al computer, usiamo la parola chiave **`if`** (che in inglese significa "se"). 
L'`if` controlla se una certa condizione è vera (True). Se lo è, esegue un blocco di codice; se è falsa (False), lo ignora completamente e passa oltre.

**La regola d'oro dell'Indentation (Rientro):** In Python, per far capire al computer quali istruzioni fanno parte dell'`if`, bisogna spostarle un po' verso destra (usando il tasto *Tab* o 4 spazi). Questo spazio si chiama *indentazione*.

### 👀 Osservo
```python
eta = 16

print("Controllo l'età...")

if eta >= 14:
    # Questo blocco ha l'indentazione (spazio all'inizio)
    # Verrà eseguito SOLO se l'età è maggiore o uguale a 14
    print("Puoi guidare il patentino per lo scooter!")
    print("Mettiti sempre il casco.")

# Questa riga non ha l'indentazione, quindi è fuori dall'if.
# Verrà eseguita sempre, a prescindere dall'età.
print("Controllo terminato.")
```

### 🧠 Capisco
La sintassi è rigorosa:
1. Si scrive `if`
2. Si scrive la condizione da controllare (`eta >= 14`)
3. Si mettono i due punti `:` alla fine della riga. **Non dimenticarli, sono fondamentali!**
4. Si va a capo e si indenta il blocco di codice da eseguire.

### 🚀 Creo
**Missione Mentale:** Immagina una variabile `temperatura = 35`. Scrivi mentalmente un `if` che stampi "Fa caldissimo, accendi il condizionatore!" solo se la temperatura è superiore a 30.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-2"></a>
## 2. Gli Operatori di Confronto: Fare le domande giuste

### 📘 Imparo
Per creare le condizioni da mettere vicino all'`if`, dobbiamo "confrontare" dei valori. Python usa dei simboli speciali chiamati **operatori di confronto**:

- `==` : **Uguale a** (Attenzione: sono DUE uguali! Un solo uguale serve per assegnare una variabile, due uguali servono per confrontare).
- `!=` : **Diverso da**
- `>`  : **Maggiore di**
- `<`  : **Minore di**
- `>=` : **Maggiore o uguale a**
- `<=` : **Minore o uguale a**

### 👀 Osservo
```python
password = "Pippo"

if password == "Pippo":
    print("Accesso consentito. Benvenuto!")

if password != "Pippo":
    print("Allarme! Intruso!")
```

### 🧠 Capisco
Un errore comunissimo all'inizio è scrivere `if x = 10:`. Questo darà errore! Python ti dirà che stai cercando di assegnare un valore dentro una condizione. Devi sempre usare `if x == 10:`.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-3"></a>
## 3. L'istruzione `else`: Il Piano B ("Altrimenti...")

### 📘 Imparo
Spesso non ci basta fare qualcosa se la condizione è vera, ma vogliamo anche fare *qualcos'altro* se la condizione è falsa. 
Invece di scrivere due `if` separati, possiamo usare l'istruzione **`else`** (che significa "altrimenti").

L'`else` non ha bisogno di una condizione vicino, perché raccoglie tutti i casi in cui l'`if` precedente è risultato falso.

### 👀 Osservo
```python
punti_gioco = 40

if punti_gioco >= 50:
    print("Hai vinto la medaglia d'oro!")
else:
    # Se punti_gioco NON è >= 50, si esegue questo:
    print("Mi dispiace, non hai raggiunto i punti necessari.")
    print("Riprova la prossima volta.")
```

### 🧠 Capisco
- L'`else` deve essere allineato esattamente sotto al suo `if` (stessa indentazione).
- Anche l'`else` vuole i due punti `:` alla fine!
- Il codice dentro l'`else` deve essere indentato.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-4"></a>
## 4. L'istruzione `elif`: Molteplici scelte

### 📘 Imparo
E se le alternative fossero più di due? Ad esempio: "Se il semaforo è verde passa, se è giallo rallenta, se è rosso fermati".
In questo caso ci viene in aiuto **`elif`** (abbreviazione di *else if*, ovvero "altrimenti se"). 
Possiamo mettere quanti `elif` vogliamo tra il primo `if` e l'ultimo `else`.

### 👀 Osservo
```python
voto = 8

if voto == 10:
    print("Bravissimo! Perfetto.")
elif voto >= 8:
    print("Ottimo lavoro!")
elif voto >= 6:
    print("Sufficiente, sei passato.")
else:
    # Questo scatta per tutti i voti sotto il 6
    print("Devi studiare di più.")
```

### 🧠 Capisco
Python legge la catena dall'alto verso il basso. Appena trova una condizione vera, esegue il suo blocco di codice e **salta tutto il resto** della struttura `if-elif-else`. Non controllerà le condizioni successive, anche se potrebbero essere vere!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-5"></a>
## 5. 🛠 Mini Progetto: Il Recinto Magico di Terry

Applichiamo subito le condizioni alla nostra tartaruga! Nel modulo precedente abbiamo imparato `xcor()` e `ycor()`. Ora li useremo insieme agli `if` per far rimbalzare Terry quando tocca i bordi dello schermo.

### Il progetto
Creeremo un recinto invisibile. Terry si muoverà in avanti, ma dopo ogni passo controllerà la sua posizione. Se la sua coordinata X supera un certo limite (ad esempio 200), le diremo di girarsi e tornare indietro! 

### Codice del Progetto Guidato:
```python
from turtle import *
import random # Per generare numeri casuali

shape("turtle")
color("green")
pensize(4)
speed(0)

# Un semplice recinto disegnato a mano (X da -200 a 200, Y da -200 a 200)
penup()
goto(-200, 200)
pendown()
for i in range(4):
    forward(400)
    right(90)
penup()
home()
pendown()

print("Terry è libera nel recinto. Guarda come rimbalza!")

# Facciamo fare a Terry 100 passi continui
for i in range(100):
    forward(10)
    
    # Preleviamo le coordinate attuali
    x = xcor()
    y = ycor()
    
    # CONDIZIONE 1: Se tocca il bordo destro o sinistro
    if x > 190 or x < -190:
        print("Toccato il bordo orizzontale! Inversione a U.")
        left(180) # Girati di 180 gradi
        
    # CONDIZIONE 2: Se tocca il bordo superiore o inferiore
    elif y > 190 or y < -190:
        print("Toccato il bordo verticale! Inversione a U.")
        left(180)
        
    # Per dare un po' di naturalezza, facciamola girare leggermente a caso
    left(random.randint(-15, 15))
```
*Nota: nel codice abbiamo usato la parola magica `or` (oppure) dentro l'`if`. Significa che la condizione è vera se tocca il bordo di destra OPPURE quello di sinistra!*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-6"></a>
## 6. ❓ Quiz e 🏆 Badge

Dimostra di saper prendere le decisioni giuste rispondendo a queste 10 domande!

1. **Quale parola chiave si usa in Python per iniziare una condizione?**
   - [ ] A) `then`
   - [x] B) `if`
   - [ ] C) `check`
   - [ ] D) `when`

2. **Cosa manca in questa istruzione? `if numero > 10`**
   - [ ] A) Il punto e virgola alla fine
   - [ ] B) Le parentesi attorno alla variabile
   - [x] C) I due punti `:` alla fine
   - [ ] D) La parola chiave `then`

3. **Cosa serve a Python per capire quali istruzioni fanno parte del blocco `if`?**
   - [x] A) L'indentazione (gli spazi all'inizio della riga)
   - [ ] B) Le parentesi graffe `{ }`
   - [ ] C) La parola chiave `end if`
   - [ ] D) I numeri di riga

4. **Quale operatore si usa per controllare se due valori sono ESATTAMENTE UGUALI?**
   - [ ] A) `=`
   - [x] B) `==`
   - [ ] C) `===`
   - [ ] D) `!=`

5. **A cosa serve il comando `else`?**
   - [ ] A) A ripetere un'azione all'infinito
   - [ ] B) A verificare una seconda condizione
   - [x] C) A eseguire codice quando la condizione dell'`if` è falsa
   - [ ] D) A far terminare il programma

6. **Come si scrive "Diverso da" in Python?**
   - [ ] A) `<>`
   - [ ] B) `not=`
   - [ ] C) `! ==`
   - [x] D) `!=`

7. **Qual è il significato di `elif`?**
   - [x] A) Else If (Altrimenti Se - Controlla un'altra condizione)
   - [ ] B) End Line If (Termina la riga dell'if)
   - [ ] C) Evaluate If (Valuta il risultato)
   - [ ] D) Error If (Segnala un errore se...)

8. **In una struttura `if - elif - elif - else`, quanti blocchi di codice possono essere eseguiti al massimo?**
   - [ ] A) Tutti quelli che risultano veri
   - [ ] B) Due
   - [x] C) Solo uno (il primo che risulta vero o l'else finale)
   - [ ] D) Dipende da quante righe di codice ci sono

9. **Che risultato dà questo codice?**
    ```python
    x = 5
    if x > 10:
        print("A")
    else:
        print("B")
    ```
   - [ ] A) A
   - [x] B) B
   - [ ] C) A e B
   - [ ] D) Nessun risultato (Errore)

10. **Se scrivo `if età = 18:`, cosa succederà?**
    - [ ] A) Funzionerà perfettamente
    - [ ] B) Stamperà 18
    - [x] C) Darà errore (SyntaxError) perché per confrontare ci vuole `==`
    - [ ] D) Assegnerà ad "età" un numero casuale

### 🏆 Badge Sbloccato: **🧠 Architetto Logico**
Straordinario! Hai superato il Modulo 10 e ottenuto il badge **Architetto Logico**, guadagnando altri **250 XP**! Ora non sei più solo un dattilografo di comandi, ma stai insegnando al computer a pensare e reagire agli eventi. La capacità di strutturare le condizioni in modo logico ed esauriente è il vero cuore della programmazione. 

Nel prossimo modulo affronteremo uno degli strumenti più potenti di Python: le **Liste**, per imparare a gestire collezioni di dati. Continua così!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)
