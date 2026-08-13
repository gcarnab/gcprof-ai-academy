# 🌐 MODULO 7 — Tipografia e Box Model

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Web Programming Base — HTML5 & CSS3

---

## Cosa imparerai in questo modulo

In questo modulo approfondirai due pilastri del CSS. Nella prima parte lavorerai sulla **tipografia**: colore, famiglia dei caratteri, dimensione, peso, interlinea, allineamento, e le unità di misura che il CSS mette a disposizione per definirle. Nella seconda parte affronterai il **Box Model**, il concetto secondo cui ogni elemento HTML viene trattato dal browser come un rettangolo composto da contenuto, padding, bordo e margine: è la base concettuale indispensabile per comprendere qualunque layout CSS, compresi Flexbox e Grid che vedrai nei moduli successivi.

---

<a id="indice-modulo"></a>

## Indice del Modulo 7

- [12.1 Colore e famiglia dei caratteri](#121-colore-e-famiglia-dei-caratteri)
- [12.2 Dimensione, peso e stile del testo](#122-dimensione-peso-e-stile-del-testo)
- [12.3 Unità di misura: px, em, rem, %, vw, vh](#123-unita-di-misura-px-em-rem-vw-vh)
- [12.4 Interlinea, allineamento e decorazione del testo](#124-interlinea-allineamento-e-decorazione-del-testo)
- [12.5 Web font e Google Fonts](#125-web-font-e-google-fonts)
- [12.6 Esempio completo](#126-esempio-completo)
- [13.1 Che cos'è il Box Model](#131-che-cose-il-box-model)
- [13.2 Content, padding, border e margin](#132-content-padding-border-e-margin)
- [13.3 box-sizing: content-box e border-box](#133-box-sizing-content-box-e-border-box)
- [13.4 width, height e i valori min/max](#134-width-height-e-i-valori-minmax)
- [13.5 La proprietà display: block, inline, inline-block](#135-la-proprieta-display-block-inline-inline-block)
- [13.6 Esempio completo](#136-esempio-completo)
- [Esercizi del Modulo 7](#esercizi-del-modulo-7)
- [Riepilogo del Modulo 7](#riepilogo-del-modulo-7)

---

<a id="121-colore-e-famiglia-dei-caratteri"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 12.1 Colore e famiglia dei caratteri

La proprietà `color` definisce il colore del testo. Può essere espressa in diversi formati:

| Formato | Esempio |
| --- | --- |
| Nome colore | `color: red;` |
| Esadecimale | `color: #ff0000;` |
| RGB | `color: rgb(255, 0, 0);` |
| RGBA (con trasparenza) | `color: rgba(255, 0, 0, 0.5);` |

La proprietà `font-family` definisce il carattere tipografico. Va sempre indicata come una **lista di alternative**, dalla più specifica alla più generica, nel caso il primo font non sia disponibile sul dispositivo dell'utente:

```css
p {
  font-family: "Segoe UI", Arial, sans-serif;
}
```

> 💡 **Approfondimento** — L'ultimo valore della lista dovrebbe sempre essere una famiglia generica (`sans-serif`, `serif`, `monospace`): è la garanzia che, anche se nessuno dei font specifici indicati è installato, il browser sceglierà comunque un carattere della stessa categoria estetica, invece di un font casuale.

---

<a id="122-dimensione-peso-e-stile-del-testo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 12.2 Dimensione, peso e stile del testo

```css
h1 {
  font-size: 32px;
  font-weight: bold;
  font-style: italic;
}
```

| Proprietà | Valori comuni |
| --- | --- |
| `font-size` | dimensione del testo (con unità di misura, vedi 12.3) |
| `font-weight` | `normal`, `bold`, oppure valori numerici da `100` a `900` |
| `font-style` | `normal`, `italic` |

---

<a id="123-unita-di-misura-px-em-rem-vw-vh"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 12.3 Unità di misura: px, em, rem, %, vw, vh

Il CSS offre diverse unità di misura, ciascuna con un comportamento specifico:

| Unità | Tipo | Comportamento |
| --- | --- | --- |
| `px` | assoluta | dimensione fissa in pixel, non si adatta |
| `%` | relativa | percentuale rispetto all'elemento genitore |
| `em` | relativa | multiplo della dimensione del font dell'elemento genitore |
| `rem` | relativa | multiplo della dimensione del font dell'elemento radice (`<html>`) |
| `vw` / `vh` | relativa alla viewport | percentuale della larghezza/altezza della finestra del browser |

```css
html {
  font-size: 16px;
}

.titolo {
  font-size: 2rem;   /* 32px, sempre relativo a html */
}

.sezione {
  width: 80vw;       /* 80% della larghezza della finestra */
}
```

> ⚠️ **Attenzione** — `em` è relativo al font-size dell'elemento **genitore**, mentre `rem` è sempre relativo al font-size dell'elemento **radice** (`<html>`), indipendentemente da quanto l'elemento sia annidato in profondità. Questa differenza rende `rem` molto più prevedibile in progetti complessi, ed è per questo che, per la dimensione del testo, `rem` è generalmente preferito a `em`.

---

<a id="124-interlinea-allineamento-e-decorazione-del-testo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 12.4 Interlinea, allineamento e decorazione del testo

```css
p {
  line-height: 1.6;
  text-align: justify;
  text-decoration: none;
  text-transform: uppercase;
}
```

| Proprietà | Effetto |
| --- | --- |
| `line-height` | altezza della riga (interlinea); un valore senza unità come `1.6` è generalmente la scelta più sicura |
| `text-align` | allineamento orizzontale: `left`, `right`, `center`, `justify` |
| `text-decoration` | decorazioni come `underline`, `line-through`, `none` |
| `text-transform` | trasformazione del testo: `uppercase`, `lowercase`, `capitalize` |

---

<a id="125-web-font-e-google-fonts"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 12.5 Web font e Google Fonts

I font "di sistema" (Arial, Times New Roman...) sono limitati e spesso poco distintivi. I **web font** permettono di caricare caratteri personalizzati direttamente dal Web, senza che l'utente li abbia installati sul proprio dispositivo. Il servizio gratuito più utilizzato è **Google Fonts**.

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>
```

```css
body {
  font-family: "Poppins", sans-serif;
}
```

---

<a id="126-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 12.6 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Tipografia CSS</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Titolo Principale</h1>
    <p>Testo di esempio per mostrare l'applicazione delle proprietà tipografiche viste in questo capitolo.</p>
</body>
</html>
```

```css
/* style.css */

html {
    font-size: 16px;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: darkslateblue;
    text-align: center;
}

p {
    font-size: 1rem;
    color: #333333;
    text-align: justify;
}
```

---

## ✅ Best Practice

✔ Indicare sempre in `font-family` una lista di alternative, terminando con una famiglia generica.

✔ Preferire `rem` a `em` per la dimensione del testo, per un comportamento più prevedibile.

✔ Impostare un `line-height` di almeno 1.4-1.6 per migliorare la leggibilità dei paragrafi.

## ❌ Errori comuni

❌ Usare solo `px` per ogni dimensione, rendendo il testo poco adattabile alle preferenze di accessibilità dell'utente.

❌ Dimenticare la famiglia generica finale in `font-family`.

❌ Caricare troppi web font diversi nella stessa pagina, rallentando il caricamento del sito.

---

<a id="131-che-cose-il-box-model"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 13.1 Che cos'è il Box Model

Il **Box Model** (modello a scatola) è il principio secondo cui **ogni elemento HTML**, anche il più semplice `<span>`, viene trattato dal browser come un rettangolo composto da quattro livelli concentrici:

```
+-------------------------------+
|            MARGIN             |
|   +-------------------------+ |
|   |         BORDER          | |
|   |   +-------------------+ | |
|   |   |      PADDING      | | |
|   |   |   +-----------+   | | |
|   |   |   |  CONTENT  |   | | |
|   |   |   +-----------+   | | |
|   |   +-------------------+ | |
|   +-------------------------+ |
+-------------------------------+
```

Comprendere questo modello è il prerequisito indispensabile per ogni layout CSS, incluso Flexbox e Grid, che vedrai nei Moduli 8 e 9.

---

<a id="132-content-padding-border-e-margin"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 13.2 Content, padding, border e margin

| Livello | Significato |
| --- | --- |
| **Content** | il contenuto vero e proprio (testo, immagine...) |
| **Padding** | spazio interno, tra il contenuto e il bordo |
| **Border** | il bordo dell'elemento |
| **Margin** | spazio esterno, tra l'elemento e gli elementi vicini |

```css
.box {
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
```

Ciascuna proprietà può essere specificata anche sui singoli lati:

```css
.box {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
}

/* equivalente, in senso orario da top */
.box {
  padding: 10px 20px 10px 20px;
}
```

> 💡 **Approfondimento** — La notazione abbreviata a quattro valori (`padding: 10px 20px 10px 20px;`) segue sempre l'ordine orario a partire dall'alto: top, right, bottom, left. Con due soli valori (`padding: 10px 20px;`) il primo si applica a top/bottom e il secondo a left/right.

---

<a id="133-box-sizing-content-box-e-border-box"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 13.3 box-sizing: content-box e border-box

Per impostazione predefinita, `width` e `height` di un elemento definiscono **solo** la dimensione del content: padding e border si sommano, ingrandendo la scatola oltre le dimensioni dichiarate. Questo comportamento, chiamato `content-box`, è spesso poco intuitivo.

Impostando `box-sizing: border-box`, invece, `width` e `height` includono anche padding e border, rendendo le dimensioni finali dell'elemento esattamente quelle dichiarate:

```css
* {
  box-sizing: border-box;
}
```

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  box-sizing: border-box; /* larghezza totale reale: 200px, non 244px */
}
```

> ⚠️ **Attenzione** — Impostare `box-sizing: border-box` sul selettore universale `*` è una delle prime righe che troverai in quasi ogni foglio di stile professionale: rende i calcoli di layout enormemente più prevedibili, ed è per questo che la userai sistematicamente da qui in avanti nel corso.

---

<a id="134-width-height-e-i-valori-minmax"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 13.4 width, height e i valori min/max

```css
.box {
  width: 300px;
  height: 150px;
  min-width: 200px;
  max-width: 600px;
}
```

| Proprietà | Effetto |
| --- | --- |
| `width` / `height` | dimensione dichiarata |
| `min-width` / `min-height` | dimensione minima, non superabile verso il basso |
| `max-width` / `max-height` | dimensione massima, non superabile verso l'alto |

`max-width` è particolarmente utile per le immagini responsive, che vedrai nel Modulo 9:

```css
img {
  max-width: 100%;
  height: auto;
}
```

---

<a id="135-la-proprieta-display-block-inline-inline-block"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 13.5 La proprietà display: block, inline, inline-block

Ogni elemento HTML ha un comportamento di visualizzazione predefinito, controllato dalla proprietà `display`:

| Valore | Comportamento |
| --- | --- |
| `block` | occupa l'intera larghezza disponibile e va sempre a capo (es. `<div>`, `<p>`, `<h1>`) |
| `inline` | occupa solo lo spazio necessario al contenuto, resta in linea con il testo, **non accetta** `width`/`height` (es. `<span>`, `<a>`) |
| `inline-block` | resta in linea come `inline`, ma **accetta** `width`, `height`, `padding` e `margin` come `block` |

```css
.badge {
  display: inline-block;
  width: 100px;
  padding: 5px;
  background-color: gold;
}
```

> 💡 **Approfondimento** — `display` non è un dettaglio secondario: è la proprietà che dai Moduli 8 e 9 in poi diventerà il punto di partenza di ogni layout, con i valori `flex` e `grid`. Comprendere bene la differenza tra `block`, `inline` e `inline-block` ora renderà molto più naturale l'apprendimento di Flexbox e Grid.

---

<a id="136-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 13.6 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Box Model</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="card">
        <h2>Corso in evidenza</h2>
        <p>Web Programming Base — HTML5 & CSS3</p>
    </div>
</body>
</html>
```

```css
/* style.css */

* {
    box-sizing: border-box;
}

.card {
    width: 300px;
    padding: 20px;
    border: 2px solid navy;
    margin: 30px auto;
    background-color: #f4f4f4;
}

.card h2 {
    margin-bottom: 10px;
    color: navy;
}
```

---

## ✅ Best Practice

✔ Impostare `box-sizing: border-box` sul selettore universale all'inizio di ogni foglio di stile.

✔ Usare `max-width` invece di `width` fisso per elementi che devono adattarsi a schermi diversi.

✔ Scegliere consapevolmente tra `block`, `inline` e `inline-block` in base al comportamento desiderato dell'elemento.

## ❌ Errori comuni

❌ Dimenticare `box-sizing: border-box` e ritrovarsi con elementi più larghi del previsto a causa di padding e border sommati.

❌ Provare ad assegnare `width` e `height` a un elemento con `display: inline`, senza alcun effetto.

❌ Confondere padding (spazio interno) e margin (spazio esterno), invertendone l'uso.

---

<a id="esercizi-del-modulo-7"></a>

## 🧪 Esercizi del Modulo 7

1. **Tipografia del sito** — Applica al tuo sito personale una famiglia di font coerente (con almeno due alternative e una famiglia generica finale), definendo dimensioni in `rem` per titoli e paragrafi.
2. **Web font** — Collega un font di Google Fonts a una pagina del tuo sito e applicalo al `<body>`.
3. **Box con bordo** — Crea un `<div>` con padding, bordo e margine visibili, e verifica come cambia la sua dimensione totale attivando e disattivando `box-sizing: border-box`.
4. **Card responsive** — Costruisci una piccola "card" (come nell'esempio del paragrafo 13.6) con `max-width` invece di `width` fisso, e osserva come si comporta ridimensionando la finestra del browser.
5. **Display a confronto** — Crea tre elementi identici con `display: block`, `display: inline` e `display: inline-block`, applica a tutti `width` e `background-color`, e osserva le differenze di comportamento nel browser.

---

<a id="riepilogo-del-modulo-7"></a>

## 📌 Riepilogo del Modulo 7

In questo modulo hai imparato:

- Come controllare colore, font-family, dimensione, peso e stile del testo.
- Le principali unità di misura del CSS (`px`, `%`, `em`, `rem`, `vw`, `vh`) e quando preferirne una rispetto alle altre.
- Come regolare interlinea, allineamento e decorazione del testo.
- Come caricare e utilizzare web font esterni tramite Google Fonts.
- Che cos'è il Box Model e come sono organizzati content, padding, border e margin.
- La differenza tra `content-box` e `border-box`, e perché `box-sizing: border-box` è una best practice quasi universale.
- Come funzionano `width`, `height` e i relativi valori `min`/`max`.
- La differenza tra `display: block`, `inline` e `inline-block`.

Nel prossimo modulo — **Modulo 8: Layout Moderno: Display e Flexbox** — userai proprio la proprietà `display` per costruire i primi layout moderni a più colonne, con lo strumento oggi più utilizzato per l'allineamento e la distribuzione degli elementi: Flexbox.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*