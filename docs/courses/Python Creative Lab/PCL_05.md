<a id="indice-del-modulo"></a>
# 📘 Modulo 5 — Colori e riempimenti

Benvenuti nel quinto modulo di **Python Creative Lab**! 
Fino ad ora, i nostri disegni sono stati precisi e geometrici, ma... un po' spenti, vero? Abbiamo usato solo linee nere su uno sfondo bianco. In questo modulo, la nostra piattaforma si trasformerà in una vera e propria tavolozza digitale. Impareremo a cambiare il colore della penna, a colorare l'interno delle forme, a modificare lo spessore delle linee e persino a decidere la velocità della nostra tartaruga.

Preparate i pennelli digitali, si comincia!

---

## 📑 Indice del Modulo
- [1. Sfondo e Spessore: prepariamo la tela](#cap-1)
- [2. Colore della penna: addio al nero](#cap-2)
- [3. Riempimento: colorare dentro i bordi](#cap-3)
- [4. La velocità di Terry: rallentatore o turbo?](#cap-4)
- [5. 🛠 Mini Progetto: Un giardino colorato](#cap-5)
- [6. ❓ Quiz di fine modulo e 🏆 Badge](#cap-6)

---

<a id="cap-1"></a>
## 1. Sfondo e Spessore: prepariamo la tela

### 📘 Imparo
Prima di iniziare a disegnare, un vero artista prepara la sua tela e sceglie il pennello giusto. In Python, possiamo cambiare il colore dello sfondo dell'area di disegno usando il comando `bgcolor()` (che sta per *background color*). Inoltre, possiamo decidere quanto deve essere spessa la linea lasciata da Terry usando il comando `pensize()`.

### 👀 Osservo
```python
bgcolor("lightblue")
pensize(5)
forward(100)
```

### 🧠 Capisco
- `bgcolor("lightblue")` ➔ Colora l'intero sfondo di azzurro chiaro. Il nome del colore deve essere sempre scritto tra virgolette!
- `pensize(5)` ➔ Imposta lo spessore della penna a 5 pixel. Di default, lo spessore è 1 (una linea molto sottile).
- `forward(100)` ➔ Terry disegna una linea molto marcata (spessa 5) sullo sfondo azzurro.

### 🚀 Creo
**Missione:** Prepara una tela notturna. Imposta lo sfondo su `"black"`, scegli uno spessore della penna di 10 pixel e traccia un paio di linee. 

🐢 **Terry consiglia:** *Esistono tantissimi nomi di colori predefiniti in Python, come `"red"`, `"green"`, `"yellow"`, `"orange"`, `"purple"`, `"pink"`. Ricordati sempre le virgolette, altrimenti il computer penserà che tu stia cercando una variabile (le studieremo nel Modulo 6!).*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-2"></a>
## 2. Colore della penna: addio al nero

### 📘 Imparo
Per cambiare il colore dell'inchiostro della nostra tartaruga, usiamo il comando `color()`. Qualsiasi linea disegnata dopo questo comando prenderà il colore scelto, finché non decideremo di cambiarlo di nuovo. 

🦉 **Ada racconta:** *Sapevi che gli schermi dei computer creano tutti i colori mescolando solo tre luci di base: Rosso, Verde e Blu? Questo sistema si chiama RGB (Red, Green, Blue). Nelle prossime lezioni avanzate vedremo come usare i codici numerici RGB per creare letteralmente milioni di sfumature diverse!*

### 👀 Osservo
```python
pensize(4)

color("red")
forward(100)
right(90)

color("blue")
forward(100)
```

### 🧠 Capisco
- `color("red")` ➔ Terry "intinge" il pennello nella vernice rossa.
- `forward(100)` ➔ Viene disegnata una linea rossa.
- `color("blue")` ➔ Terry cambia il pennello e prende il blu.
- La successiva istruzione `forward(100)` disegnerà una linea blu.

### 🚀 Creo
**Missione:** Riprendi il codice del quadrato (Modulo 4) e fai in modo che Terry disegni ogni lato con un colore diverso: rosso, verde, blu e giallo.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-3"></a>
## 3. Riempimento: colorare dentro i bordi

### 📘 Imparo
Disegnare i contorni è bello, ma colorare l'interno delle figure geometriche è fondamentale per creare disegni realistici. Per farlo, dobbiamo dare a Terry due comandi: uno per dirle "inizia a colorare da qui" (`begin_fill()`) e uno per dirle "ho finito la figura, ora riempi lo spazio!" (`end_fill()`).

🐞 **Bug avvisa:** *Molti si dimenticano di chiudere il colore! Se scrivi `begin_fill()` ma non metti `end_fill()` alla fine della forma, Python non capirà quando la figura è terminata e non colorerà nulla. È come versare vernice senza aver chiuso i bordi!*

### 👀 Osservo
```python
color("green")
begin_fill()

forward(100)
left(120)
forward(100)
left(120)
forward(100)
left(120)

end_fill()
```

### 🧠 Capisco
- `color("green")` ➔ Imposta il colore (sia dei bordi che del riempimento) sul verde.
- `begin_fill()` ➔ Terry si prepara a colorare l'interno della figura che stiamo per tracciare.
- Le istruzioni centrali (i tre `forward` e `left`) disegnano un triangolo chiuso.
- `end_fill()` ➔ Terry riempie l'area del triangolo appena completato con il colore verde.

### 🚀 Creo
**Missione:** Disegna una casa di base: crea un quadrato rosso usando il riempimento.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-4"></a>
## 4. La velocità di Terry: rallentatore o turbo?

### 📘 Imparo
Fino ad ora, Terry si è mossa a una velocità standard. Se stiamo testando un programma, ci fa piacere vederle disegnare tutto passo dopo passo. Ma quando i nostri disegni diventeranno molto complessi (come prati pieni di fiori o intere città), vorremo che finisca il disegno all'istante! Il comando `speed()` ci permette di controllare questo aspetto.

🤖 **Byte racconta:** *Il comando `speed()` accetta numeri da 0 a 10. Attenzione alla logica: 1 è la velocità più lenta, 10 è molto veloce. Ma se inserisci 0, disattivi completamente le animazioni: il disegno apparirà in una frazione di secondo (velocità massima assoluta).*

### 👀 Osservo
```python
speed(1)
color("purple")
forward(150)

speed(0)
color("orange")
right(90)
forward(150)
```

### 🧠 Capisco
- `speed(1)` ➔ Terry si muove al rallentatore, permettendoci di studiare ogni suo passo. Ideale quando cerchiamo un errore nel codice.
- `speed(0)` ➔ L'animazione del movimento viene rimossa. Terry "teletrasporta" l'inchiostro sul foglio in modo istantaneo. Ottimo per disegni giganti.

### 🚀 Creo
**Missione:** Disegna un pentagono riempito di colore `"yellow"`. Usa `speed(1)` per vedere Terry tracciare i bordi con estrema lentezza.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-5"></a>
## 5. 🛠 Mini Progetto: Un giardino colorato

È il momento di applicare tutte le conoscenze accumulate! Nel modulo precedente abbiamo disegnato forme vuote, ora daremo vita a un piccolo paesaggio.

### Il progetto
Crea la scena di un giardino colorato. Devi includere:
1. Uno sfondo azzurro (il cielo).
2. Un grande rettangolo verde riempito in basso (il prato).
3. Un fiore composto da forme geometriche (es. un lungo rettangolo verde per lo stelo e un cerchio o una stella colorata per il fiore).

**Passaggi consigliati:**
- Usa `bgcolor()` per il cielo.
- Vai nell'angolo in basso a sinistra (usando `penup()` e le coordinate, o semplicemente ruotando e avanzando) per tracciare il rettangolo del prato. Usa `begin_fill()` e `end_fill()`.
- Spostati al centro dello schermo, alza la penna, scegli nuovi colori e crea il fiore.
- Usa `speed(0)` se vuoi vedere il risultato apparire all'istante!

🐢 **Terry sfida:** *Aggiungi un sole giallo nell'angolo in alto a destra! Se vuoi fare un cerchio perfetto invece di un poligono, prova il comando segreto `circle(50)`. Sorpresa!*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-6"></a>
## 6. ❓ Quiz e 🏆 Badge

Testa le tue nuove conoscenze artistiche e sblocca il tuo badge!

1. **Quale comando si usa per cambiare il colore dello sfondo dell'intera area di lavoro?**
   - [ ] A) `background()`
   - [x] B) `bgcolor()`
   - [ ] C) `color_back()`
   - [ ] D) `screen_color()`

2. **Cosa succede se scrivo `pensize(10)`?**
   - [ ] A) Terry disegnerà un pentagono di 10 pixel
   - [ ] B) Il disegno verrà ingrandito di 10 volte
   - [x] C) La linea tracciata sarà spessa 10 pixel
   - [ ] D) La tartaruga si muoverà 10 volte più veloce

3. **Come comunico a Python il colore rosso per la penna?**
   - [x] A) `color("red")`
   - [ ] B) `color = red`
   - [ ] C) `color(red)`
   - [ ] D) `pen("red")`

4. **Per colorare l'interno di un quadrato, in quale ordine devo usare i comandi?**
   - [ ] A) Prima faccio il quadrato, poi scrivo `fill()`
   - [ ] B) `end_fill()`, disegno il quadrato, `begin_fill()`
   - [x] C) `begin_fill()`, disegno il quadrato, `end_fill()`
   - [ ] D) Disegno un lato, `fill()`, disegno l'altro lato

5. **Qual è il rischio principale segnalato da Bug quando si colorano le forme?**
   - [ ] A) Scegliere colori che non esistono
   - [ ] B) Dimenticarsi di scrivere il colore prima di iniziare
   - [x] C) Dimenticarsi di inserire il comando `end_fill()` alla fine
   - [ ] D) Usare una penna troppo spessa

6. **Quale valore per il comando `speed()` imposta la tartaruga alla velocità MASSIMA assoluta (animazione istantanea)?**
   - [x] A) 0
   - [ ] B) 1
   - [ ] C) 10
   - [ ] D) 100

7. **Se uso `speed(1)`, cosa succede al disegno?**
   - [ ] A) Il codice dà errore
   - [x] B) Terry si muoverà alla velocità minima (rallentatore)
   - [ ] C) Viene disegnata solo 1 linea
   - [ ] D) Terry smetterà di muoversi

8. **Qual è lo spessore predefinito (di default) della penna se non uso mai il comando `pensize()`?**
   - [ ] A) 0
   - [x] B) 1
   - [ ] C) 5
   - [ ] D) 10

9. **Se voglio disegnare una linea blu e poi una linea gialla, quante volte devo chiamare il comando `color()`?**
   - [ ] A) Una volta sola all'inizio: `color("blue", "yellow")`
   - [x] B) Due volte: `color("blue")` prima della prima linea e `color("yellow")` prima della seconda
   - [ ] C) Non posso, posso usare un solo colore per ogni programma
   - [ ] D) Tre volte

10. **Secondo la curiosità di Ada, cosa significa l'acronimo RGB usato per i colori sugli schermi?**
    - [ ] A) Real Green Blue
    - [x] B) Red Green Blue
    - [ ] C) Red Gray Black
    - [ ] D) Round Graphic Box

### 🏆 Badge Sbloccato: **🎨 Artista**
Complimenti! Hai superato il Modulo 5 e conquistato il badge **Artista**, aggiungendo **150 XP** al tuo punteggio totale! Ora che sai disegnare e colorare forme chiuse, sei pronto per un salto di livello formidabile: nel Modulo 6 scopriremo le **Variabili**, i magici "contenitori" che renderanno il tuo codice intelligente e flessibile.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)
