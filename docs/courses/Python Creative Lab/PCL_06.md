# 📘 Modulo 6 — Variabili

<a id="indice-del-modulo"></a>

Benvenuti nel sesto modulo di **Python Creative Lab**!
Finora abbiamo scritto codici con numeri "fissi" (come `forward(100)` o `right(90)`). Ma cosa succede se vogliamo cambiare la dimensione del nostro disegno? Dovremmo modificare manualmente ogni singolo numero nel programma! 

In questo modulo scopriremo uno degli strumenti più potenti della programmazione: le **variabili**. Impareremo a creare "scatole magiche" in cui memorizzare valori, riutilizzarli e modificarli per rendere il nostro codice incredibilmente flessibile, intelligente e facile da gestire.

Siete pronti a diventare maestri dei dati? Iniziamo!

---

## 📑 Indice del Modulo
- [1. Cos'è una variabile: la scatola magica](#cap-1)
- [2. Creare e usare variabili con Terry](#cap-2)
- [3. Calcoli con le variabili: la matematica diventa comoda](#cap-3)
- [4. Variabili per forme perfette e flessibili](#cap-4)
- [5. Le regole per i nomi delle variabili: evitare i trabocchetti](#cap-5)
- [6. 🛠 Mini Progetto: Una casa ridimensionabile](#cap-6)
- [7. ❓ Quiz di fine modulo e 🏆 Badge](#cap-7)

---

<a id="cap-1"></a>
## 1. Cos'è una variabile: la scatola magica

### 📘 Imparo
Immagina una variabile come una **scatola etichettata**. 
Sulla scatola incolliamo un'etichetta con un **nome** (ad esempio `dimensione`), e all'interno della scatola inseriamo un **valore** (ad esempio il numero `100`).

Ogni volta che nel nostro programma scriveremo il nome `dimensione`, Python andrà a guardare dentro la scatola e userà il valore `100`. Se domani vorremo ingrandire tutto il nostro disegno, ci basterà cambiare solo il numero contenuto nella scatola, senza dover toccare il resto del codice!

### 👀 Osservo
```python
dimensione = 150
forward(dimensione)
```

### 🧠 Capisco
- `dimensione = 150` ➔ Creiamo la variabile chiamata `dimensione` e le assegniamo il valore `150`. Il simbolo `=` si legge *"diventa uguale a"* oppure *"assegna"*.
- `forward(dimensione)` ➔ Terry non avanza di una parola, ma guarda dentro la scatola `dimensione`, trova `150` e avanza di 150 pixel!

### 🚀 Creo
**Missione:** Crea una variabile chiamata `passi` con valore `200`. Fai avanzare Terry usando la variabile `passi`. Poi cambia il valore della variabile a `50` e riesegui il codice per vedere la differenza!

🐢 **Terry consiglia:** *In Python le variabili possono contenere numeri (come `100`), testo (come `"red"`) o persino valori di vero e falso. L'importante è dare loro nomi chiari che ti ricordino subito cosa c'è dentro!*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-2"></a>
## 2. Creare e usare variabili con Terry

### 📘 Imparo
Possiamo usare le variabili per controllare qualsiasi parametro dei comandi di Terry: la lunghezza dei lati, il colore della penna, lo spessore e la velocità!

🤖 **Byte racconta:** *Quando scrivete `lato = 100`, la memoria del computer crea un piccolo spazio dedicato a quell'informazione. Se dopo scrivete `lato = 200`, il vecchio valore `100` viene sovrascritto e sostituito con `200`. Le variabili si chiamano "variabili" proprio perché il loro contenuto può variare durante l'esecuzione del programma!*

### 👀 Osservo
```python
lunghezza = 120
colore_preferito = "blue"
spessore_linea = 6

bgcolor("lightyellow")
pensize(spessore_linea)
color(colore_preferito)

forward(lunghezza)
right(90)
forward(lunghezza)
```

### 🧠 Capisco
- Definiamo tre variabili all'inizio: `lunghezza`, `colore_preferito` e `spessore_linea`.
- Quando chiamiamo `pensize(spessore_linea)`, Python usa il valore `6`.
- Quando chiamiamo `color(colore_preferito)`, Python passa la stringa `"blue"`.
- I due comandi `forward(lunghezza)` faranno avanzare Terry di 120 pixel ciascuno.

### 🚀 Creo
**Missione:** Cambia solo i valori delle variabili all'inizio del programma dell'esempio (es. metti `lunghezza = 50` e `colore_preferito = "purple"`) ed esegui nuovamente. Nota come l'intero disegno si adatta istantaneamente senza modificare i comandi di movimento!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-3"></a>
## 3. Calcoli con le variabili: la matematica diventa comoda

### 📘 Imparo
Le variabili numeriche non servono solo a conservare numeri, ma possono essere usate per fare calcoli matematici! Possiamo usare gli operatori standard:
- `+` per addizionare
- `-` per sottrarre
- `*` per moltiplicare
- `/` per dividere

Questo ci permette di creare proporzioni perfette tra gli elementi dei nostri disegni.

### 👀 Osservo
```python
lato_base = 100
lato_doppio = lato_base * 2

forward(lato_base)
right(90)
forward(lato_doppio)
right(90)
forward(lato_base)
right(90)
forward(lato_doppio)
right(90)
```

### 🧠 Capisco
- `lato_base = 100` ➔ La base misura 100 pixel.
- `lato_doppio = lato_base * 2` ➔ Python calcola `100 * 2` e memorizza `200` nella variabile `lato_doppio`.
- Disegniamo un rettangolo le cui proporzioni rimarranno sempre identiche: l'altezza sarà sempre il doppio della base! Se cambiamo `lato_base` in `50`, `lato_doppio` diventerà automaticamente `100`.

### 🚀 Creo
**Missione:** Prova a definire `lato_base = 80`. Crea una variabile `lato_metà = lato_base / 2` e disegna un rettangolo usando `lato_base` e `lato_metà`.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-4"></a>
## 4. Variabili per forme perfette e flessibili

### 📘 Imparo
Nel Modulo 4 abbiamo visto come disegnare quadrati, triangoli e poligoni. Usando le variabili, possiamo scrivere un codice per un quadrato che può essere ridimensionato cambiando **una sola riga di codice**!

🦉 **Ada racconta:** *Nei videogiochi moderni e nei software di grafica professionale, ogni oggetto 3D o 2D è definito da variabili di dimensione e posizione. Quando ridimensioni una finestra sullo schermo del tuo telefono o computer, il sistema operativo sta semplicemente ricalcolando le variabili dei bordi!*

### 👀 Osservo
```python
lato = 150

# Disegniamo un quadrato flessibile
forward(lato)
right(90)
forward(lato)
right(90)
forward(lato)
right(90)
forward(lato)
right(90)
```

### 🧠 Capisco
- Sostituendo tutti i valori fissi con la variabile `lato`, abbiamo slegato la forma geometrica dalle sue dimensioni rigide.
- Se vogliamo un quadrato da 20 pixel o da 300 pixel, basta modificare la primissima riga `lato = ...`. Il resto del disegno si adatterà da solo!

### 🚀 Creo
**Missione:** Disegna un triangolo equilatero usando la variabile `lato = 120` e la variabile `angolo = 120`.

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-5"></a>
## 5. Le regole per i nomi delle variabili: evitare i trabocchetti

### 📘 Imparo
In Python possiamo scegliere quasi qualsiasi nome per le nostre variabili, ma ci sono alcune regole rigide da rispettare per non far arrabbiare il computer!

🐞 **Bug avvisa:** *Attenzione a questi errori comunissimi!*
1. **Niente spazi:** Non puoi scrivere `dimensione casa = 100`. Usa il trattino basso (underscore): `dimensione_casa = 100`.
2. **Niente numeri all'inizio:** Non puoi chiamare una variabile `1lato = 50`. Ma puoi scrivere `lato1 = 50`.
3. **Attenzione alle maiuscole e minuscole:** `Lato`, `LATO` e `lato` per Python sono **tre variabili completamente diverse**!
4. **Niente parole chiave riservate:** Non puoi chiamare una variabile con i nomi dei comandi Python (come `forward`, `print`, `import`).

### 👀 Osservo
```python
# Nomi di variabili CORRETTI e ben scritti:
dimensione_finestra = 40
colore_tetto = "red"
numero_lati = 4

# Nomi SCORRETTI (generano errore!):
# 1a_misura = 10       -> Inizia con un numero!
# colore casa = "red"  -> Contiene uno spazio!
# forward = 100        -> È una parola riservata di Python!
```

### 🧠 Capisco
- Usare nomi chiari e descrittivi in italiano con il trattino basso (`_`) rende il codice leggibile per chiunque lo guardi, compreso te stesso quando riaprirai il programma tra un mese!

### 🚀 Creo
**Missione:** Trova l'errore! Guarda questo codice e correggi i nomi delle variabili sbagliate:
```python
miacolore = "green"
spessore linea = 5
1lato = 100
```

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-6"></a>
## 6. 🛠 Mini Progetto: Una casa ridimensionabile

È ora di mettere a frutto il potere delle variabili con un progetto spettacolare!

### Il progetto
Costruirai una casa (composta da un quadrato per le mura e un triangolo per il tetto). La magia sta nel fatto che l'intera casa dipenderà da **un'unica variabile principale**: `dimensione_casa`. 

Se modifichi `dimensione_casa`, sia le mura che il tetto si ingrandiranno o rimpiccioliranno in modo perfettamente proporzionato!

### Codice del Progetto Guidato:
```python
# --- PARAMETRI DELLA CASA ---
dimensione_casa = 120
colore_mura = "lightblue"
colore_tetto = "darkred"

speed(3)
pensize(3)

# --- DISEGNO MURA (Quadrato) ---
color(colore_mura)
begin_fill()
forward(dimensione_casa)
left(90)
forward(dimensione_casa)
left(90)
forward(dimensione_casa)
left(90)
forward(dimensione_casa)
left(90)
end_fill()

# --- SPOSTAMENTO SUL TETTO ---
forward(dimensione_casa)
left(90)

# --- DISEGNO TETTO (Triangolo Equilatero) ---
color(colore_tetto)
begin_fill()
right(30)
forward(dimensione_casa)
left(120)
forward(dimensione_casa)
left(120)
forward(dimensione_casa)
end_fill()
```

🐢 **Terry sfida:** *Prova a modificare la variabile `dimensione_casa = 200` all'inizio del programma ed eseguilo. Poi prova con `dimensione_casa = 50`. Noti come la casa rimane sempre perfetta e proporzionata senza dover cambiare una singola riga del disegno?*

[🔙 Torna all'indice del Modulo](#indice-del-modulo)

---

<a id="cap-7"></a>
## 7. ❓ Quiz e 🏆 Badge

Mettiti alla prova con le 10 domande sulle variabili per conquistare il badge del modulo!

1. **Cos'è una variabile in programmazione?**
   - [ ] A) Un comando per far ruotare la tartaruga
   - [x] B) Un contenitore dotato di nome che conserva un valore nella memoria
   - [ ] C) Un errore nel codice causato da un bug
   - [ ] D) Un colore speciale per lo sfondo

2. **Qual è il simbolo utilizzato in Python per assegnare un valore a una variabile?**
   - [x] A) `=`
   - [ ] B) `==`
   - [ ] C) `->`
   - [ ] D) `:`

3. **Se eseguo `lato = 100` e subito dopo `lato = 50`, quale valore conterrà la variabile `lato`?**
   - [ ] A) 100
   - [x] B) 50
   - [ ] C) 150
   - [ ] D) Nessuno, Python darà errore

4. **Quale tra i seguenti nomi di variabile è CORRETTO secondo le regole di Python?**
   - [ ] A) `dimensione casa`
   - [ ] B) `2lato`
   - [x] C) `dimensione_casa`
   - [ ] D) `forward`

5. **Cosa succede se scrivo `lato_grande = lato_base * 3` quando `lato_base` vale 30?**
   - [ ] A) `lato_grande` conterrà il valore 30
   - [ ] B) `lato_grande` conterrà la parola `"lato_base * 3"`
   - [x] C) `lato_grande` conterrà il valore 90
   - [ ] D) Il programma si blocca

6. **Perché per Python le variabili `colore` e `Colore` NON sono identiche?**
   - [ ] A) Perché una è un testo e l'altra è un numero
   - [x] B) Perché Python è un linguaggio "case-sensitive" (distingue maiuscole e minuscole)
   - [ ] C) Perché la prima è una parola riservata
   - [ ] D) In realtà sono identiche

7. **Qual è il principale vantaggio nell'usare le variabili nei disegni geometrici?**
   - [ ] A) Rende la tartaruga più veloce
   - [x] B) Permette di modificare le dimensioni del disegno cambiando un solo valore
   - [ ] C) Permette di disegnare senza usare la tastiera
   - [ ] D) Cancella gli errori in automatico

8. **Quale errore segnala Bug se scrivi `nome del colore = "red"`?**
   - [ ] A) Non si possono usare i colori
   - [x] B) Ci sono degli spazi nel nome della variabile
   - [ ] C) Manca il punto e virgola
   - [ ] D) La parola "red" deve essere scritta in maiuscolo

9. **In Python, se `A = 10` e `B = A / 2`, quanto vale `B`?**
   - [x] A) 5
   - [ ] B) 20
   - [ ] C) 12
   - [ ] D) 2

10. **Se all'inizio di un programma definisco `colore_penna = "green"`, come lo passo al comando `color()`?**
    - [ ] A) `color("colore_penna")`
    - [x] B) `color(colore_penna)`
    - [ ] C) `color = "green"`
    - [ ] D) `color("green" = colore_penna)`

### 🏆 Badge Sbloccato: **📦 Custode delle Variabili**
Fantastico lavoro! Hai completato il Modulo 6 e conquistato il badge **Custode delle Variabili**, guadagnando ben **200 XP**! Ora che sai come memorizzare e manipolare i dati con le variabili, sei pronto per rendere i tuoi programmi interattivi: nel Modulo 7 impareremo a fare domande all'utente con gli **Input e Output**!

[🔙 Torna all'indice del Modulo](#indice-del-modulo)
