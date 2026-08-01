<a id="indice-del-modulo"></a>
# 📘 Modulo 4 — Disegnare figure geometriche

Benvenuti nel quarto modulo di **Python Creative Lab**, il corso esclusivo di **gcprof-academy.com**!
Nelle lezioni precedenti abbiamo imparato a far muovere Terry, la nostra tartaruga. Ora è il momento di unire quei movimenti per creare forme chiuse e perfette, fondamentali per i nostri futuri progetti. Inizieremo dalle basi per arrivare a disegnare poligoni, stelle e le nostre prime bandiere.

Siete pronti a trasformare la matematica in grafica? Partiamo!

---

## 📑 Indice del Modulo
- [1. Il Quadrato: la nostra prima vera forma](#cap-1)
- [2. Il Rettangolo: allunghiamo i lati](#cap-2)
- [3. Il Triangolo: la trappola degli angoli](#cap-3)
- [4. Pentagono ed Esagono: la regola del 360](#cap-4)
- [5. La Stella: magia geometrica](#cap-5)
- [6. 🛠 Mini Progetto: Le bandiere geometriche](#cap-6)
- [7. ❓ Quiz di fine modulo e 🏆 Badge](#cap-7)

---

<a id="cap-1"></a>
## 1. Il Quadrato: la nostra prima vera forma

### 📘 Imparo
Un quadrato ha quattro lati di lunghezza uguale e quattro angoli identici, ciascuno di 90 gradi. Per disegnarlo con Python, dobbiamo semplicemente dire a Terry di andare avanti e ruotare di 90 gradi, ripetendo questa sequenza esattamente quattro volte.

### 👀 Osservo
```python
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
```

### 🧠 Capisco
- `forward(100)` ➔ Terry avanza disegnando un lato lungo 100 pixel.
- `right(90)` ➔ Terry ruota su se stessa di 90 gradi verso destra, posizionandosi per il lato successivo.
- Ripetendo questa coppia di comandi quattro volte, chiudiamo la figura geometrica e torniamo al punto di partenza.

### 🚀 Creo
**Missione:** Modifica il codice per disegnare un quadrato gigante con i lati lunghi 250 pixel. Poi, prova a farlo girare verso sinistra usando `left(90)` al posto di `right(90)`. Cosa cambia nel disegno finale?

🐢 **Terry consiglia:** *È un'ottima abitudine far finire sempre la figura con l'ultima rotazione (il quarto `right(90)`). In questo modo, alla fine del disegno mi ritroverò esattamente nella stessa direzione in cui ero partita, pronta per la prossima istruzione!*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-2"></a>
## 2. Il Rettangolo: allunghiamo i lati

### 📘 Imparo
Il rettangolo è molto simile al quadrato, ma i suoi lati sono uguali a due a due. Avremo un lato lungo (la base) e un lato corto (l'altezza). Questo significa che non possiamo ripetere lo stesso comando quattro volte, ma dobbiamo alternare due lunghezze diverse.

### 👀 Osservo
```python
forward(200)
left(90)
forward(80)
left(90)
forward(200)
left(90)
forward(80)
left(90)
```

### 🧠 Capisco
- `forward(200)` disegna la base lunga.
- `left(90)` esegue l'angolo retto.
- `forward(80)` disegna l'altezza più corta.
- L'intera sequenza viene ripetuta due volte per completare la figura.

### 🚀 Creo
**Missione:** Crea il profilo di un grattacielo. Il tuo rettangolo dovrà essere molto più alto che largo (ad esempio, base 50 e altezza 300).

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-3"></a>
## 3. Il Triangolo: la trappola degli angoli

### 📘 Imparo
Disegnare un triangolo equilatero (tre lati e tre angoli uguali) sembra facile, ma nasconde un'insidia comune. In geometria, l'angolo interno di un triangolo equilatero è di 60 gradi. Ma quando programmiamo Terry, dobbiamo farla ruotare! 

🐞 **Bug avvisa:** *Attenzione! Molti studenti sbagliano qui. Pensano: "Il triangolo ha angoli di 60 gradi, quindi scrivo `left(60)`". Errore! Terry non sta disegnando l'angolo interno, ma sta svoltando. Deve compiere una rotazione calcolata sull'angolo ESTERNO. L'operazione corretta è 180 - 60 = 120. Quindi devi farla svoltare di 120 gradi!*

### 👀 Osservo
```python
forward(150)
left(120)
forward(150)
left(120)
forward(150)
left(120)
```

### 🧠 Capisco
- Il comando `left(120)` fa in modo che la tartaruga giri "abbastanza" per richiudere la figura su tre lati.
- Ripetuto tre volte, completa il triangolo perfetto.

### 🚀 Creo
**Missione:** Disegna un triangolo con la punta rivolta verso il basso. (Suggerimento: usa `right(120)` invece di `left(120)`!).

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-4"></a>
## 4. Pentagono ed Esagono: la regola magica del 360

### 📘 Imparo
Ora che abbiamo capito il triangolo e il quadrato, potremmo voler disegnare figure con 5 lati (pentagono), 6 lati (esagono) o anche 10 lati (decagono). Dobbiamo calcolare l'angolo a memoria ogni volta? Assolutamente no. 

🤖 **Byte racconta:** *Noi computer amiamo la matematica perché ci permette di trovare regole universali! Esiste una "regola d'oro" per tutti i poligoni regolari: l'angolo di rotazione è sempre 360 diviso il numero dei lati. Un giro completo su se stessi è di 360 gradi, giusto? Per disegnare la figura, Terry deve completare un intero giro suddiviso in passaggi.*

### 👀 Osservo (L'Esagono)
```python
forward(80)
right(60)  # 360 diviso 6 = 60
forward(80)
right(60)
forward(80)
right(60)
forward(80)
right(60)
forward(80)
right(60)
forward(80)
right(60)
```

### 🧠 Capisco
- Per l'esagono (6 lati), l'angolo è 360 / 6 = 60 gradi.
- Se volessimo un pentagono (5 lati), faremmo 360 / 5 = 72 gradi. Basterebbe usare `right(72)`.

### 🚀 Creo
**Missione:** Trasforma l'esagono in un ottagono (la forma di un segnale di STOP, che ha 8 lati). Ricorda di usare la regola di Byte per trovare l'angolo corretto!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-5"></a>
## 5. La Stella: magia geometrica

### 📘 Imparo
Finora abbiamo disegnato poligoni regolari. Ma cosa succede se modifichiamo drasticamente l'angolo di rotazione? Se usiamo un angolo molto acuto, le linee inizieranno ad incrociarsi, creando figure bellissime come le stelle.

🦉 **Ada racconta:** *Sapevi che il linguaggio Logo, il "nonno" del modulo Turtle che usiamo in Python, fu creato nel lontano 1967? All'inizio non si disegnava su uno schermo, ma si inviavano comandi a un vero e proprio robottino a forma di tartaruga, dotato di un pennarello, che si muoveva su grandi fogli di carta stesi sul pavimento!*

### 👀 Osservo
```python
forward(200)
right(144)
forward(200)
right(144)
forward(200)
right(144)
forward(200)
right(144)
forward(200)
right(144)
```

### 🧠 Capisco
- L'angolo di 144 gradi fa in modo che la linea salti un vertice e si incroci con le altre, creando la classica stella a 5 punte.
- Perché proprio 144? Se moltiplichi 144 per 5 (i lati), ottieni 720. Significa che Terry fa esattamente due giri completi su se stessa (360 x 2 = 720) prima di tornare alla posizione di partenza!

### 🚀 Creo
**Missione:** Disegna due stelle vicine tra loro di grandezze diverse, usando il comando `penup()` e `pendown()` visti nel modulo 2 per spostare Terry senza lasciare la scia tra una e l'altra.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-6"></a>
## 6. 🛠 Mini Progetto: Le bandiere geometriche

Siamo arrivati al momento in cui mettiamo insieme tutto quello che abbiamo imparato!
Le bandiere del mondo sono un insieme di rettangoli, quadrati, stelle e cerchi.

### Il progetto
Oggi progetterai la forma di una bandiera inventata usando almeno un grande rettangolo (il contorno) e due figure geometriche all'interno (es. un quadrato e una stella, oppure due triangoli).

**Passaggi consigliati:**
1. Traccia il rettangolo principale esterno (il tessuto della bandiera).
2. Usa `penup()` per alzare la penna e `forward()` per posizionarti all'interno del rettangolo.
3. Usa `pendown()` e traccia la prima forma (es. un triangolo).
4. Spostati ancora e traccia la seconda forma (es. una stella).

Non preoccuparti per i colori, li impareremo nel prossimo Modulo! 
Per ora, concentrati sulla precisione delle linee e sul calcolo delle distanze.

🐢 **Terry sfida:** *Riesci a disegnare la bandiera con precisione tale che la stella al centro non tocchi i bordi del rettangolo? Mettiti alla prova!*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-7"></a>
## 7. ❓ Quiz e 🏆 Badge

Mettiti alla prova con queste 10 domande per consolidare quanto appreso e conquistare il tuo badge!

1. **Per disegnare un quadrato con Python, quale sequenza ripeti quattro volte?**
   - [ ] A) `forward()` e `left(180)`
   - [x] B) `forward()` e `right(90)`
   - [ ] C) `forward()` e `right(45)`
   - [ ] D) `right(90)` e `left(90)`

2. **Qual è l'angolo esterno corretto per far svoltare la tartaruga e disegnare un triangolo equilatero?**
   - [ ] A) 60
   - [ ] B) 90
   - [x] C) 120
   - [ ] D) 180

3. **Se devi programmare un rettangolo, quanti valori diversi di lunghezza (forward) dovrai usare per i suoi lati?**
   - [ ] A) Nessuno, i lati sono tutti uguali
   - [x] B) Due valori diversi (base e altezza)
   - [ ] C) Tre valori diversi
   - [ ] D) Quattro valori diversi

4. **Come si calcola l'angolo di rotazione (esterno) per un poligono regolare?**
   - [ ] A) Lati diviso 360
   - [ ] B) Lati per 180
   - [x] C) 360 diviso il numero dei lati
   - [ ] D) 90 diviso il numero dei lati

5. **Secondo la regola di Byte, di quanti gradi deve ruotare Terry per disegnare un pentagono (5 lati)?**
   - [x] A) 72 gradi
   - [ ] B) 60 gradi
   - [ ] C) 90 gradi
   - [ ] D) 45 gradi

6. **Quale angolo utilizziamo di solito in questo modulo per creare una perfetta stella a 5 punte?**
   - [ ] A) 90 gradi
   - [ ] B) 120 gradi
   - [x] C) 144 gradi
   - [ ] D) 180 gradi

7. **Perché Terry dice che è una buona abitudine far eseguire l'ultima rotazione alla fine di una figura (es. il quarto right(90) in un quadrato)?**
   - [ ] A) Perché altrimenti il codice dà errore
   - [x] B) Per ritrovare la tartaruga orientata nella direzione di partenza
   - [ ] C) Per farle cambiare colore
   - [ ] D) Perché così la figura diventa più grande

8. **Quali comandi hai usato nel mini progetto per spostare Terry senza lasciare tracce di inchiostro?**
   - [x] A) `penup()` e `pendown()`
   - [ ] B) `hide()` e `show()`
   - [ ] C) `up()` e `stop()`
   - [ ] D) `stop_draw()` e `start_draw()`

9. **Se voglio trasformare l'esagono in un ottagono (8 lati), quanti gradi devo inserire in `right(...)`?**
   - [ ] A) 60 gradi
   - [ ] B) 50 gradi
   - [x] C) 45 gradi
   - [ ] D) 30 gradi

10. **Quanti giri su se stessa fa Terry quando disegna una stella a 5 punte usando l'angolo 144?**
    - [ ] A) 1 giro (360 gradi)
    - [x] B) 2 giri (720 gradi)
    - [ ] C) Mezzo giro (180 gradi)
    - [ ] D) 5 giri

### 🏆 Badge Sbloccato: **📐 Geometra**
Congratulazioni! Hai completato il Modulo 4 e sbloccato il badge **Geometra**, guadagnando **150 XP**. Sei pronto per il prossimo passo? Nel Modulo 5 impareremo a dare vita e **Colori** alle nostre figure geometriche!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)
