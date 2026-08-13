# 🌐 MODULO 6 — CSS: Fondamenta e Selettori

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Web Programming Base — HTML5 & CSS3

---

## Cosa imparerai in questo modulo

Con questo modulo entri nella seconda grande parte del corso: il **CSS**, il linguaggio che trasforma una pagina HTML "grezza" in un'interfaccia curata graficamente. Imparerai che cos'è il CSS, i tre modi in cui può essere collegato a una pagina HTML, la sintassi di base di una regola CSS, e soprattutto i **selettori**: gli strumenti che permettono di scegliere con precisione quali elementi della pagina stilizzare. Capirai anche come il browser decide, quando più regole CSS entrano in conflitto tra loro, quale applicare: il meccanismo della cascata e della specificità. Alla fine del modulo il sito multipagina costruito nel Modulo 5 comincerà finalmente a prendere una forma visiva.

---

<a id="indice-modulo"></a>

## Indice del Modulo 6

- [11.1 Che cos'è il CSS](#111-che-cose-il-css)
- [11.2 I tre modi per applicare il CSS](#112-i-tre-modi-per-applicare-il-css)
- [11.3 Sintassi di una regola CSS](#113-sintassi-di-una-regola-css)
- [11.4 Selettore di tipo, di classe e di id](#114-selettore-di-tipo-di-classe-e-di-id)
- [11.5 Selettore di gruppo e selettore universale](#115-selettore-di-gruppo-e-selettore-universale)
- [11.6 Selettori combinatori: discendente, figlio diretto, fratello adiacente](#116-selettori-combinatori-discendente-figlio-diretto-fratello-adiacente)
- [11.7 Pseudo-classi](#117-pseudo-classi)
- [11.8 Pseudo-elementi](#118-pseudo-elementi)
- [11.9 Cascata, ereditarietà e specificità](#119-cascata-ereditarieta-e-specificita)
- [11.10 Esempio completo](#1110-esempio-completo)
- [Esercizi del Modulo 6](#esercizi-del-modulo-6)
- [Riepilogo del Modulo 6](#riepilogo-del-modulo-6)

---

<a id="111-che-cose-il-css"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.1 Che cos'è il CSS

**CSS** è l'acronimo di *Cascading Style Sheets*, "fogli di stile a cascata". Se HTML si occupa di **cosa** contiene una pagina (titoli, paragrafi, immagini, tabelle, form), il CSS si occupa di **come** quel contenuto viene visualizzato: colori, caratteri, dimensioni, spaziature, bordi, sfondi, posizionamento, animazioni.

Ricordi la metafora della casa del Modulo 1? HTML costruisce muri e fondamenta; CSS si occupa di pittura, mobili e arredamento. Nessun contenuto cambia: cambia esclusivamente il modo in cui viene presentato.

> 💡 **Approfondimento** — Il termine "a cascata" nel nome CSS non è casuale: descrive esattamente il meccanismo con cui il browser decide quale stile applicare quando più regole si sovrappongono sullo stesso elemento. Torneremo su questo concetto, chiamato *cascata*, nel paragrafo 11.9.

---

<a id="112-i-tre-modi-per-applicare-il-css"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.2 I tre modi per applicare il CSS

Esistono tre modi per collegare il CSS a una pagina HTML:

| Metodo | Dove si scrive | Quando usarlo |
| --- | --- | --- |
| **Inline** | Direttamente nell'attributo `style` del tag HTML | Da evitare, salvo casi eccezionali |
| **Interno** | Nel tag `<style>` dentro `<head>` | Per pagine singole o prove rapide |
| **Esterno** | In un file `.css` separato, collegato con `<link>` | Metodo professionale, sempre da preferire |

**CSS inline:**

```html
<p style="color: blue; font-size: 18px;">Testo blu</p>
```

**CSS interno:**

```html
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>
```

**CSS esterno** (il metodo che utilizzerai per tutto il resto del corso):

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

```css
/* file style.css */
p {
  color: blue;
}
```

> ⚠️ **Attenzione** — Il CSS inline mescola contenuto e presentazione nello stesso file, rendendo il codice difficile da mantenere e impossibile da riutilizzare su più pagine. Va evitato quasi sempre. Il CSS esterno, al contrario, permette di aggiornare lo stile dell'intero sito modificando un solo file `.css`, condiviso da tutte le pagine HTML.

---

<a id="113-sintassi-di-una-regola-css"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.3 Sintassi di una regola CSS

Una regola CSS è composta da un **selettore** (che elemento stilizzare) e un **blocco di dichiarazioni** racchiuso tra graffe (come stilizzarlo):

```css
selettore {
  proprietà: valore;
  proprietà: valore;
}
```

Esempio concreto:

```css
h1 {
  color: darkblue;
  font-size: 32px;
  text-align: center;
}
```

Ogni dichiarazione è composta da una **proprietà** (`color`, `font-size`, `text-align`) e da un **valore** (`darkblue`, `32px`, `center`), separati da due punti, e termina obbligatoriamente con un punto e virgola.

---

<a id="114-selettore-di-tipo-di-classe-e-di-id"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.4 Selettore di tipo, di classe e di id

Il **selettore di tipo** colpisce tutti gli elementi di un certo tag:

```css
p {
  color: gray;
}
```

Il **selettore di classe** (preceduto da un punto) colpisce tutti gli elementi che possiedono un determinato attributo `class`. Una classe può essere riutilizzata su più elementi, anche diversi tra loro:

```css
.evidenziato {
  background-color: yellow;
}
```

```html
<p class="evidenziato">Testo evidenziato</p>
<span class="evidenziato">Anche questo</span>
```

Il **selettore di id** (preceduto da un cancelletto) colpisce l'unico elemento che possiede un determinato attributo `id`. Un `id` deve essere **univoco** nella pagina:

```css
#intestazione {
  background-color: navy;
}
```

```html
<header id="intestazione">...</header>
```

> 💡 **Approfondimento** — Una regola pratica per scegliere tra classe e id: se lo stile deve poter essere riutilizzato su più elementi, usa una classe; se lo stile riguarda un elemento unico e non ripetibile nella pagina (ad esempio l'intestazione principale del sito), puoi usare un id. Nel dubbio, la classe è quasi sempre la scelta più flessibile.

---

<a id="115-selettore-di-gruppo-e-selettore-universale"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.5 Selettore di gruppo e selettore universale

Quando più selettori condividono le stesse dichiarazioni di stile, si possono raggruppare separandoli con una virgola, evitando di ripetere lo stesso blocco più volte:

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
  color: darkslategray;
}
```

Il **selettore universale** (`*`) colpisce **tutti** gli elementi della pagina. È utilizzato tipicamente per azzerare margini e padding predefiniti dei browser:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

<a id="116-selettori-combinatori-discendente-figlio-diretto-fratello-adiacente"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.6 Selettori combinatori: discendente, figlio diretto, fratello adiacente

I selettori combinatori permettono di colpire elementi in base alla loro **posizione** rispetto ad altri elementi nella struttura HTML.

| Selettore | Sintassi | Significato |
| --- | --- | --- |
| Discendente | `nav a` | tutti gli `<a>` contenuti in un `<nav>`, a qualsiasi livello di profondità |
| Figlio diretto | `nav > a` | solo gli `<a>` figli diretti di un `<nav>` |
| Fratello adiacente | `h2 + p` | il primo `<p>` che segue immediatamente un `<h2>` |

```css
nav a {
  text-decoration: none;
}

nav > a {
  font-weight: bold;
}

h2 + p {
  font-style: italic;
}
```

> ⚠️ **Attenzione** — Il selettore discendente (`nav a`) colpisce anche gli `<a>` annidati a più livelli (ad esempio dentro un `<ul>` dentro il `<nav>`), mentre il selettore di figlio diretto (`nav > a`) colpisce solo gli `<a>` posizionati **immediatamente** dentro `<nav>`, senza elementi intermedi. La differenza è sottile ma spesso decisiva nel debug di uno stile che "non si applica".

---

<a id="117-pseudo-classi"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.7 Pseudo-classi

Una **pseudo-classe** seleziona un elemento in base a uno **stato** particolare, non presente esplicitamente nel codice HTML: al passaggio del mouse, alla posizione tra i fratelli, allo stato di un campo di un form.

```css
a:hover {
  color: red;
}

li:first-child {
  font-weight: bold;
}

li:last-child {
  border-bottom: none;
}

input:focus {
  border-color: blue;
}
```

| Pseudo-classe | Attivazione |
| --- | --- |
| `:hover` | quando il mouse è sopra l'elemento |
| `:focus` | quando un campo di input è attivo |
| `:first-child` | primo figlio del proprio genitore |
| `:last-child` | ultimo figlio del proprio genitore |
| `:nth-child(n)` | ennesimo figlio del proprio genitore |

---

<a id="118-pseudo-elementi"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.8 Pseudo-elementi

Un **pseudo-elemento** (introdotto dal doppio due punti `::`) permette di stilizzare una parte specifica di un elemento, o di inserire contenuto generato dal CSS senza modificare l'HTML.

```css
p::first-line {
  font-weight: bold;
}

p::first-letter {
  font-size: 200%;
}

.box::before {
  content: "★ ";
}
```

`::before` e `::after` sono i pseudo-elementi più utilizzati: inseriscono contenuto rispettivamente prima o dopo il contenuto reale dell'elemento, tipicamente per icone decorative o piccoli automatismi grafici, senza dover aggiungere markup HTML aggiuntivo.

---

<a id="119-cascata-ereditarieta-e-specificita"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.9 Cascata, ereditarietà e specificità

Quando più regole CSS puntano allo stesso elemento con dichiarazioni in conflitto, il browser deve decidere quale applicare. Questo meccanismo si chiama **cascata** e si basa su tre fattori, in ordine di importanza crescente:

1. **Ordine nel codice** — a parità di tutto il resto, vince l'ultima regola dichiarata.
2. **Specificità** — un id (`#id`) è più specifico di una classe (`.classe`), che è più specifica di un selettore di tipo (`p`).
3. **`!important`** — forza la priorità di una dichiarazione su qualunque altra regola, ignorando la normale specificità.

```css
p {
  color: black;
}

.testo {
  color: blue;
}

#speciale {
  color: red;
}
```

```html
<p id="speciale" class="testo">Questo testo sarà rosso</p>
```

In questo esempio il testo risulta rosso: il selettore di id ha specificità maggiore rispetto al selettore di classe e al selettore di tipo.

Un concetto collegato è l'**ereditarietà**: alcune proprietà CSS (tipicamente quelle legate al testo, come `color` e `font-family`) vengono automaticamente ereditate dagli elementi figli, anche se non stilizzati esplicitamente. Altre proprietà (come `border` o `margin`) non vengono mai ereditate.

> ⚠️ **Attenzione** — `!important` va usato con grandissima parsimonia: forzando la priorità di una dichiarazione, rende il codice CSS più difficile da mantenere e da debuggare, perché "rompe" il normale meccanismo della cascata. Nella stragrande maggioranza dei casi, un conflitto di stili si risolve meglio organizzando correttamente classi e specificità, non aggiungendo `!important`.

---

<a id="1110-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 11.10 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Selettori CSS</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header id="intestazione">
        <h1>GCProf Academy</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">Corsi</a>
        </nav>
    </header>

    <main>
        <p class="evidenziato">Primo paragrafo evidenziato.</p>
        <p>Secondo paragrafo, normale.</p>
    </main>

</body>
</html>
```

```css
/* style.css */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#intestazione {
    background-color: navy;
    color: white;
    padding: 20px;
}

nav > a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
}

nav > a:hover {
    text-decoration: underline;
}

.evidenziato {
    background-color: yellow;
    font-weight: bold;
}
```

---

## ✅ Best Practice

✔ Preferire sempre un foglio di stile CSS esterno collegato con `<link>`.

✔ Usare classi per stili riutilizzabili, id solo per elementi realmente unici nella pagina.

✔ Raggruppare selettori con dichiarazioni identiche per evitare ripetizioni.

✔ Sfruttare la cascata e la specificità in modo consapevole, invece di ricorrere a `!important`.

## ❌ Errori comuni

❌ Usare il CSS inline per gran parte dello stile della pagina.

❌ Assegnare lo stesso `id` a più elementi della stessa pagina.

❌ Abusare di `!important` per "forzare" uno stile invece di correggere la specificità del selettore.

❌ Confondere selettore discendente (`nav a`) e selettore di figlio diretto (`nav > a`).

---

<a id="esercizi-del-modulo-6"></a>

## 🧪 Esercizi del Modulo 6

1. **Primo foglio di stile** — Crea un file `style.css` e collegalo a una pagina del tuo sito personale con `<link>`. Definisci un colore di sfondo per il `<body>` e un colore diverso per tutti i titoli `<h1>`.
2. **Classi riutilizzabili** — Crea una classe `.evidenziato` e applicala a due elementi diversi della stessa pagina (ad esempio un `<p>` e uno `<span>`).
3. **Selettori combinatori** — Nella pagina con il menu di navigazione (`<nav>`), scrivi una regola CSS che colpisca solo i link figli diretti del `<nav>`, distinguendola da una regola che colpirebbe invece tutti i link discendenti.
4. **Pseudo-classi** — Applica uno stile `:hover` a tutti i link del sito, in modo che cambino colore al passaggio del mouse.
5. **Specificità** — Crea intenzionalmente un conflitto tra un selettore di tipo, uno di classe e uno di id sullo stesso elemento, e verifica nel browser quale regola viene effettivamente applicata.

---

<a id="riepilogo-del-modulo-6"></a>

## 📌 Riepilogo del Modulo 6

In questo modulo hai imparato:

- Che cos'è il CSS e in che modo si differenzia da HTML.
- I tre modi per collegare il CSS a una pagina: inline, interno ed esterno, e perché il metodo esterno è quello professionale.
- La sintassi di base di una regola CSS: selettore, proprietà e valore.
- I selettori di tipo, di classe e di id, e quando preferire l'uno o l'altro.
- Il selettore di gruppo e il selettore universale.
- I selettori combinatori (discendente, figlio diretto, fratello adiacente) per colpire elementi in base alla loro posizione.
- Le pseudo-classi (`:hover`, `:focus`, `:first-child`...) e i pseudo-elementi (`::before`, `::after`...).
- Il meccanismo della cascata, dell'ereditarietà e della specificità, con cui il browser risolve i conflitti tra regole CSS.

Nel prossimo modulo — **Modulo 7: Tipografia e Box Model** — userai questi selettori per controllare nel dettaglio la tipografia del sito e imparerai il Box Model, il concetto alla base di ogni layout CSS.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*