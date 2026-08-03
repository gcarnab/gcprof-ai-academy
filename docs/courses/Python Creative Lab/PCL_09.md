<a id="indice-del-modulo"></a>
# 📘 Modulo 9 — Coordinate: Navigare nel Piano Cartesiano con Python!

Benvenuti al nono modulo di **Python Creative Lab**!
Fino ad ora abbiamo guidato Terry la Tartaruga dandole comandi relativi alla sua posizione: "vai avanti", "gira a destra", "gira a sinistra". Ma cosa succede se vogliamo che Terry appaia improvvisamente in un punto esatto dello schermo, magari in alto a destra, senza dover calcolare tutti i passi e le rotazioni per arrivarci?

In questo modulo uniremo l'informatica alla matematica, esplorando il **Piano Cartesiano**. Impareremo a usare le coordinate (X e Y) per muovere i nostri elementi grafici con precisione millimetrica. 

Siete pronti a diventare dei veri navigatori digitali? Partiamo!

---

## 📑 Indice del Modulo
- [1. Il Piano Cartesiano: La mappa dello schermo](#cap-1)
- [2. Il Teletrasporto mirato: `goto(x, y)`](#cap-2)
- [3. Volare senza lasciare tracce (`penup` e `pendown`)](#cap-3)
- [4. Trovare la posizione: `xcor()` e `ycor()`](#cap-4)
- [5. 🛠 Mini Progetto: Unisci i Puntini (Costellazione)](#cap-5)
- [6. ❓ Quiz di fine modulo e 🏆 Badge](#cap-6)

---

<a id="cap-1"></a>
## 1. Il Piano Cartesiano: La mappa dello schermo

### 📘 Imparo
Lo schermo su cui disegna Terry non è uno spazio vuoto senza regole, ma un'enorme griglia invisibile chiamata **Piano Cartesiano**.
Questa griglia è formata da due linee principali che si incrociano al centro:
- **L'Asse X (Ascisse):** È la linea orizzontale. Misura la larghezza. Andare verso destra significa andare verso i numeri positivi (+), andare verso sinistra verso i numeri negativi (-).
- **L'Asse Y (Ordinate):** È la linea verticale. Misura l'altezza. Andare verso l'alto significa andare verso i numeri positivi (+), andare verso il basso verso i numeri negativi (-).

Il punto esatto in cui queste due linee si incrociano è il **Centro**, e le sue coordinate sono **(0, 0)**. È proprio qui che Terry nasce ogni volta che avviamo il programma!

### 👀 Osservo
Immagina lo schermo diviso in quattro quadranti:
- In alto a destra: X positiva, Y positiva (es. 100, 100)
- In alto a sinistra: X negativa, Y positiva (es. -100, 100)
- In basso a sinistra: X negativa, Y negativa (es. -100, -100)
- In basso a destra: X positiva, Y negativa (es. 100, -100)

### 🧠 Capisco
Le coordinate ci permettono di identificare *qualsiasi* singolo punto dello schermo usando solo due numeri: prima la X, poi la Y. Questa è la base non solo del modulo Turtle, ma di tutta la programmazione grafica (dai videogiochi allo sviluppo di app, fino alla Computer Vision e al tracciamento degli oggetti!).

### 🚀 Creo
**Missione Mentale:** Se volessi posizionare un oggetto esattamente al centro della metà superiore dello schermo, che tipo di coordinate useresti? (Risposta: X = 0, Y = un numero positivo alto, come 200).

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-2"></a>
## 2. Il Teletrasporto mirato: `goto(x, y)`

### 📘 Imparo
Per dire a Terry di andare in un punto specifico usando le coordinate, usiamo il comando `goto(x, y)` (che in inglese significa *go to*, "vai a").
A differenza di `forward()`, a `goto` non importa da che parte è girata Terry: lei andrà dritta come un fuso verso il punto indicato.

Se invece vogliamo cambiare solo la X (spostamento orizzontale) o solo la Y (spostamento verticale), possiamo usare `setx()` e `sety()`.

### 👀 Osservo
```python
# Terry nasce in (0, 0)

# Vai in alto a destra
goto(150, 150)

# Vai in basso a sinistra (attraversando il centro)
goto(-150, -150)

# Spostati solo orizzontalmente verso destra, mantenendo l'altezza attuale
setx(100)

# Torna a casa (al centro)
home() 
```

### 🧠 Capisco
- `goto(100, 50)` ➔ Sposta Terry alla coordinata X=100 e Y=50.
- `home()` ➔ È una scorciatoia comodissima per dire `goto(0, 0)` e far guardare Terry di nuovo verso destra.
- Se Terry si muove con il `goto`, lascerà comunque una linea dietro di sé a meno che non glielo impediamo!

### 🚀 Creo
**Missione:** Scrivi un programma che faccia disegnare a Terry un grande "X" che attraversa tutto lo schermo, usando solo i comandi `goto()` (suggerimento: parti da un angolo, vai all'angolo opposto, poi spostati in un altro angolo e incrocia).

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-3"></a>
## 3. Volare senza lasciare tracce (`penup` e `pendown`)

### 📘 Imparo
Quando usiamo il teletrasporto `goto`, spesso vogliamo spostare Terry in un'altra zona dello schermo per iniziare un nuovo disegno, senza tirare una linea lunghissima in mezzo al foglio.
Per fare questo dobbiamo alzare la penna dal foglio con `penup()` ("penna su"), muoverci, e poi rimetterla giù con `pendown()` ("penna giù") quando siamo pronti a disegnare di nuovo.

### 👀 Osservo
```python
# Disegniamo un piccolo cerchio al centro
circle(20)

# Alziamo la penna per non lasciare la scia
penup()

# Ci spostiamo in alto a destra
goto(200, 200)

# Rimettiamo giù la penna
pendown()

# Disegniamo un altro cerchio
circle(20)
```

### 🧠 Capisco
- `penup()` ➔ Equivalente a sollevare il pennarello dal foglio. Terry si muove, ma non disegna.
- `pendown()` ➔ Riporta il pennarello sul foglio.
- *Scorciatoie:* I programmatori pigri (e intelligenti!) a volte usano `pu()` al posto di `penup()` e `pd()` al posto di `pendown()`. Funzionano allo stesso modo!

### 🚀 Creo
**Missione:** Disegna due quadrati distanti tra loro. Usa `penup()` e `goto()` per spostarti dal primo al secondo senza collegarli con una linea.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-4"></a>
## 4. Trovare la posizione: `xcor()` e `ycor()`

### 📘 Imparo
A volte, in programmi complessi, Terry si muove in modo casuale o guidata dall'utente, e noi non sappiamo esattamente dove si trovi in un certo momento. 
Python ci permette di "chiedere" a Terry le sue coordinate attuali usando i comandi `xcor()` (che restituisce la X) e `ycor()` (che restituisce la Y).

Questo è utilissimo, ad esempio, per fare "rimbalzare" Terry quando tocca il bordo dello schermo!

### 👀 Osservo
```python
# Facciamo muovere Terry un po' a caso
forward(120)
left(45)
forward(80)

# Chiediamo le coordinate e le salviamo in due variabili
posizione_x = xcor()
posizione_y = ycor()

# Stampiamo le coordinate nella console
print("Terry si trova in X:", posizione_x)
print("Terry si trova in Y:", posizione_y)
```

### 🧠 Capisco
- `xcor()` e `ycor()` restituiscono dei numeri interi (o decimali). Posso usare questi numeri dentro dei controlli (che vedremo presto!) per dire: *Se X è maggiore di 200, allora torna indietro!*
- Esiste anche il comando `position()` (o `pos()`), che ci restituisce la coppia completa di (X, Y) tutta in una volta.

### 🚀 Creo
**Missione:** Fai fare a Terry tre movimenti a tua scelta. Alla fine, usa `print()` per mostrare all'utente in quale punto esatto si è fermata!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-5"></a>
## 5. 🛠 Mini Progetto: Unisci i Puntini (Costellazione)

Usiamo la potenza delle coordinate assolute (`goto`) per creare un programma "Unisci i puntini". Disegneremo una costellazione unendo punti precisi nel cielo cartesiano!

### Il progetto
Il programma alzerà la penna, si piazzerà sulla prima "stella", poi abbasserà la penna e traccerà linee dritte verso coordinate specifiche usando `goto()`. Ad ogni tappa, stamperà a schermo (con Output) la posizione raggiunta.

### Codice del Progetto Guidato:
```python
import time # Usiamo il tempo per rallentare il disegno

bgcolor("darkblue")
color("yellow")
pensize(3)
speed(2)

print("Inizio disegno della Costellazione dell'Orsa Maggiore...")

# Lista delle coordinate delle stelle (X, Y)
# 1: (-200, 100), 2: (-100, 50), 3: (0, 30), 4: (50, -50)
# 5: (150, -30), 6: (200, 50), 7: (50, 80)

# Posizioniamoci sulla prima stella senza disegnare
penup()
goto(-200, 100)
pendown()

# Uniamo i puntini verso le altre coordinate!
goto(-100, 50)
print("Stella 2 raggiunta a:", pos())
time.sleep(0.5)

goto(0, 30)
print("Stella 3 raggiunta a:", pos())
time.sleep(0.5)

goto(50, -50)
print("Stella 4 raggiunta a:", pos())
time.sleep(0.5)

goto(150, -30)
print("Stella 5 raggiunta a:", pos())
time.sleep(0.5)

goto(200, 50)
print("Stella 6 raggiunta a:", pos())
time.sleep(0.5)

goto(50, 80)
print("Stella 7 raggiunta a:", pos())
time.sleep(0.5)

# Chiudiamo la forma del 'carro' tornando alla stella 4
goto(50, -50)

print("Costellazione completata!")
hideturtle()
```

🐢 **Terry sfida:** *Prova ad aggiungere un'altra costellazione o a creare una tua forma geometrica complessa tracciando i punti prima su un foglio a quadretti (che è un vero e proprio piano cartesiano!) e poi riportando le coordinate nel codice.*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-6"></a>
## 6. ❓ Quiz e 🏆 Badge

Dimostra di essere un maestro della navigazione cartesiana rispondendo a queste 10 domande!

1. **Nel piano cartesiano, cosa rappresenta l'Asse X?**
   - [ ] A) La linea verticale (altezza)
   - [x] B) La linea orizzontale (larghezza)
   - [ ] C) Il centro dello schermo
   - [ ] D) Il colore dello sfondo

2. **Quali sono le coordinate del punto centrale dello schermo (origine)?**
   - [x] A) (0, 0)
   - [ ] B) (100, 100)
   - [ ] C) (X, Y)
   - [ ] D) (-1, -1)

3. **Cosa fa il comando `goto(100, -50)`?**
   - [ ] A) Ruota Terry di 100 gradi a destra e 50 a sinistra
   - [ ] B) Muove Terry avanti di 100 passi e indietro di 50
   - [x] C) Sposta Terry nel punto esatto con X=100 e Y=-50
   - [ ] D) Cancella le ultime due righe disegnate

4. **Se voglio che Terry si muova senza lasciare il segno (senza disegnare), cosa devo usare?**
   - [ ] A) `hideturtle()`
   - [ ] B) `pendown()`
   - [x] C) `penup()`
   - [ ] D) `setx(0)`

5. **A cosa serve il comando `home()`?**
   - [ ] A) A spegnere il programma
   - [x] B) A riportare Terry alle coordinate (0,0) facendole guardare verso destra
   - [ ] C) A colorare lo sfondo come una casa
   - [ ] D) A far salvare il file

6. **In quale zona dello schermo mi trovo se ho X e Y entrambi negativi (es. -150, -100)?**
   - [ ] A) In alto a destra
   - [ ] B) In alto a sinistra
   - [x] C) In basso a sinistra
   - [ ] D) In basso a destra

7. **Quale comando restituisce la posizione orizzontale (destra/sinistra) attuale di Terry?**
   - [ ] A) `getx()`
   - [ ] B) `findx()`
   - [ ] C) `pos()`
   - [x] D) `xcor()`

8. **Cosa succede se scrivo `sety(200)`?**
   - [ ] A) Terry si sposta orizzontalmente fino a X = 200
   - [x] B) Terry si sposta verticalmente fino a Y = 200, mantenendo la stessa X di prima
   - [ ] C) Terry ruota di 200 gradi
   - [ ] D) La penna diventa grande 200 pixel

9. **Che differenza c'è tra `forward(50)` e `goto(50, 0)` se Terry si trova già in (10, 10)?**
   - [x] A) `forward` la muove di 50 passi in base a dove sta guardando, `goto` la porta esattamente nel punto (50, 0) indipendentemente dalla direzione
   - [ ] B) Non c'è differenza, fanno la stessa cosa
   - [ ] C) `forward` è più veloce di `goto`
   - [ ] D) `goto` funziona solo se la penna è alzata

10. **Se volessi salvare in una variabile la coordinata verticale di Terry per usarla in seguito, come dovrei scrivere?**
    - [ ] A) `ycor = altezza()`
    - [ ] B) `altezza = goto(Y)`
    - [x] C) `altezza = ycor()`
    - [ ] D) `variabile_y = X()`

### 🏆 Badge Sbloccato: **🗺️ Navigatore Cartesiano**
Bravissimo! Hai completato il Modulo 9 e conquistato il badge **Navigatore Cartesiano**, aggiungendo **200 XP** al tuo profilo! Hai unito la logica matematica della geometria analitica alla programmazione, una competenza fondamentale che ti aprirà le porte per sviluppare giochi o progetti grafici molto complessi.

Nel prossimo modulo, preparati a scoprire le **Liste**: il superpotere di Python per immagazzinare e gestire tantissimi dati tutti in una volta!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)
