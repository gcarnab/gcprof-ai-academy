# 🌐 MODULO 8 — Layout Moderno: Display e Flexbox

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Web Programming Base — HTML5 & CSS3

---

## Cosa imparerai in questo modulo

Questo modulo segna un punto di svolta nel corso: fino ad ora hai imparato a formattare singoli elementi (testo, colori, box), ora imparerai a **organizzare interi layout**. Partirai dalla proprietà `display`, che determina come ogni elemento si comporta nel flusso della pagina, per poi entrare nel vivo di **Flexbox**, il sistema più utilizzato al mondo per allineare, distribuire e ordinare elementi lungo una riga o una colonna. Alla fine del modulo saprai costruire barre di navigazione perfettamente allineate, card responsive che si adattano allo spazio disponibile, ed elementi centrati sia orizzontalmente che verticalmente — uno dei problemi storicamente più ostici del CSS, oggi risolto in poche righe.

---

<a id="indice-modulo"></a>

## Indice del Modulo 8

- [17.1 Introduzione alla proprietà display](#171-introduzione-alla-proprieta-display)
- [17.2 Il valore block](#172-il-valore-block)
- [17.3 Il valore inline](#173-il-valore-inline)
- [17.4 Il valore inline-block](#174-il-valore-inline-block)
- [17.5 Tabella comparativa](#175-tabella-comparativa)
- [17.6 Il valore none e la proprietà visibility](#176-il-valore-none-e-la-proprieta-visibility)
- [17.7 Il display predefinito degli elementi HTML](#177-il-display-predefinito-degli-elementi-html)
- [17.8 Cambiare il display di un elemento](#178-cambiare-il-display-di-un-elemento)
- [17.9 Uno sguardo a display: flex e display: grid](#179-uno-sguardo-a-display-flex-e-display-grid)
- [17.10 Esempio pratico completo](#1710-esempio-pratico-completo)
- [18.1 Introduzione a Flexbox](#181-introduzione-a-flexbox)
- [18.2 Attivare Flexbox: contenitore e item](#182-attivare-flexbox-contenitore-e-item)
- [18.3 L'asse principale e l'asse trasversale](#183-lasse-principale-e-lasse-trasversale)
- [18.4 flex-direction](#184-flex-direction)
- [18.5 flex-wrap](#185-flex-wrap)
- [18.6 flex-flow](#186-flex-flow)
- [18.7 justify-content](#187-justify-content)
- [18.8 align-items](#188-align-items)
- [18.9 align-content](#189-align-content)
- [18.10 La proprietà gap](#1810-la-proprieta-gap)
- [18.11 Le proprietà applicate ai flex item](#1811-le-proprieta-applicate-ai-flex-item)
- [18.12 Riepilogo: proprietà del container e degli item](#1812-riepilogo-proprieta-del-container-e-degli-item)
- [18.13 Esempio pratico completo](#1813-esempio-pratico-completo)
- [Esercizi del Modulo 8](#esercizi-del-modulo-8)
- [Riepilogo del Modulo 8](#riepilogo-del-modulo-8)

---

<a id="171-introduzione-alla-proprieta-display"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.1 Introduzione alla proprietà display

La proprietà `display` è una delle proprietà CSS più importanti in assoluto. Determina **come** un elemento viene disposto all'interno della pagina, influenzando il modo in cui occupa spazio e si relaziona con gli elementi circostanti.

Ogni elemento HTML possiede un valore di `display` predefinito, ma questo valore può sempre essere modificato tramite CSS. Questo modulo analizza i valori fondamentali di `display`, preparando il terreno per Flexbox (che studieremo nella seconda metà di questo stesso modulo) e per CSS Grid, argomento del Modulo 9.

---

<a id="172-il-valore-block"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.2 Il valore block

Un elemento con `display: block` possiede le seguenti caratteristiche:

- occupa sempre tutta la larghezza disponibile del genitore;
- inizia sempre su una nuova riga;
- accetta `width`, `height`, `margin` e `padding` su tutti i lati.

```css
div {
  display: block;
}
```

Molti tag HTML sono di tipo block per impostazione predefinita, come `<div>`, `<p>`, `<h1>`...`<h6>`, `<ul>`, `<li>`, `<section>`, `<article>`, `<header>`, `<footer>`.

---

<a id="173-il-valore-inline"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.3 Il valore inline

Un elemento con `display: inline` possiede caratteristiche opposte rispetto al block:

- occupa solo lo spazio necessario al proprio contenuto;
- non inizia su una nuova riga, ma scorre insieme al testo;
- ignora `width` e `height`;
- il padding e il margin verticali non influenzano gli elementi circostanti come ci si aspetterebbe.

```css
span {
  display: inline;
}
```

Tag come `<span>`, `<a>`, `<strong>`, `<em>` e `<mark>` sono inline per impostazione predefinita.

---

<a id="174-il-valore-inline-block"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.4 Il valore inline-block

Il valore `inline-block` unisce alcune caratteristiche di entrambi i comportamenti precedenti:

- non inizia su una nuova riga, come un elemento inline;
- accetta `width`, `height`, `margin` e `padding` su tutti i lati, come un elemento block.

```css
.pulsante {
  display: inline-block;
  width: 150px;
  padding: 10px;
}
```

Questo valore è molto utilizzato per creare pulsanti ed elementi di navigazione disposti in orizzontale, ma con dimensioni pienamente controllabili — cosa impossibile con un semplice `display: inline`.

---

<a id="175-tabella-comparativa"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.5 Tabella comparativa

| Caratteristica | block | inline | inline-block |
| --- | --- | --- | --- |
| Nuova riga | Sì | No | No |
| Accetta width/height | Sì | No | Sì |
| Accetta margin verticale | Sì | No (non influenza il layout) | Sì |
| Accetta padding verticale | Sì | Sì (visivamente, ma non sposta gli altri elementi) | Sì |
| Esempio di tag predefinito | div, p, h1 | span, a, strong | Nessuno (va impostato) |

> 💡 **Consiglio pratico** — Quando un `width` o un `padding` verticale che hai applicato "non funziona", la prima cosa da controllare è sempre il valore di `display` dell'elemento: è l'errore più comune tra chi inizia a lavorare con il CSS.

---

<a id="176-il-valore-none-e-la-proprieta-visibility"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.6 Il valore none e la proprietà visibility

Il valore `display: none` rimuove completamente l'elemento dal flusso della pagina:

```css
.nascosto {
  display: none;
}
```

L'elemento non viene visualizzato, e lo spazio che avrebbe occupato viene recuperato dagli elementi circostanti, come se non esistesse nel documento.

Una proprietà diversa, `visibility: hidden`, nasconde l'elemento **mantenendo però lo spazio occupato**:

| Proprietà | Elemento visibile | Spazio occupato |
| --- | --- | --- |
| `display: none` | No | No |
| `visibility: hidden` | No | Sì |

```css
.invisibile {
  visibility: hidden;
}
```

La scelta tra le due proprietà dipende dal risultato visivo desiderato: usa `display: none` quando vuoi che il layout "si richiuda" attorno all'elemento nascosto, `visibility: hidden` quando vuoi che il "vuoto" resti visibile.

---

<a id="177-il-display-predefinito-degli-elementi-html"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.7 Il display predefinito degli elementi HTML

Ogni browser applica automaticamente un valore di `display` predefinito a ciascun tag HTML, definito da un foglio di stile interno chiamato **user agent stylesheet**.

| Tag | Display predefinito |
| --- | --- |
| div, p, h1-h6, ul, li, section | block |
| span, a, strong, em, img | inline |
| table | table |
| li (all'interno di ul) | list-item |

È importante ricordare che questi valori sono solamente predefiniti, e possono sempre essere modificati liberamente tramite CSS.

---

<a id="178-cambiare-il-display-di-un-elemento"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.8 Cambiare il display di un elemento

È del tutto legittimo, e molto comune, modificare il valore di `display` predefinito di un tag:

```css
li {
  display: inline-block;
}
```

Questa tecnica viene spesso utilizzata per trasformare un elenco verticale, come un menu di navigazione, in un elenco disposto orizzontalmente:

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Corsi</a></li>
    <li><a href="#">Contatti</a></li>
  </ul>
</nav>
```

```css
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  display: inline-block;
  margin-right: 15px;
}
```

---

<a id="179-uno-sguardo-a-display-flex-e-display-grid"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.9 Uno sguardo a display: flex e display: grid

Oltre ai valori già analizzati, CSS mette a disposizione due valori di `display` particolarmente potenti: `flex` e `grid`.

```css
.contenitore {
  display: flex;
}
```

```css
.contenitore {
  display: grid;
}
```

Questi due valori trasformano l'elemento in un **contenitore di layout**, modificando radicalmente il comportamento dei suoi elementi figli. A differenza dei valori visti finora, `flex` e `grid` non descrivono il comportamento del singolo elemento, ma introducono un intero sistema di regole per organizzare gli elementi al suo interno.

Per questo motivo meritano una trattazione dedicata: `flex` occupa la seconda parte di questo stesso modulo, mentre `grid` sarà l'argomento centrale del Modulo 9.

---

<a id="1710-esempio-pratico-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 17.10 Esempio pratico completo

File `index.html`:

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Display</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Corsi</a></li>
            <li><a href="#">Contatti</a></li>
        </ul>
    </nav>

    <p>
        Questo è un paragrafo con <span class="evidenzia">un testo evidenziato</span> al suo interno.
    </p>

    <a href="#" class="pulsante">Scopri di più</a>

</body>
</html>
```

File `css/style.css`:

```css
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  display: inline-block;
  margin-right: 15px;
}

.evidenzia {
  display: inline;
  background-color: yellow;
  font-weight: bold;
}

.pulsante {
  display: inline-block;
  padding: 10px 20px;
  background-color: darkblue;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
```

Questo esempio mostra un menu orizzontale, uno `span` inline evidenziato e un collegamento trasformato in pulsante tramite `inline-block`.

---

## ✅ Best Practice

✔ Conoscere il display predefinito di ogni tag prima di modificarlo.

✔ Utilizzare `inline-block` per pulsanti e collegamenti con dimensioni controllate.

✔ Preferire `display: none` quando l'elemento non deve occupare spazio.

✔ Preferire `visibility: hidden` quando lo spazio deve essere mantenuto.

✔ Valutare `flex` o `grid` quando è necessario organizzare più elementi in un layout complesso.

## ❌ Errori comuni

❌ Applicare `width` o `height` a un elemento inline, aspettandosi un effetto che non si verifica.

❌ Confondere `display: none` con `visibility: hidden`.

❌ Utilizzare `<div>` per elementi che dovrebbero essere semanticamente inline, o viceversa.

❌ Dimenticare che `<li>` possiede un display predefinito `list-item`, con il proprio marcatore.

❌ Usare margin e padding verticali su elementi inline aspettandosi che spostino gli elementi circostanti.

---

### 💭 Curiosità

Prima della diffusione di Flexbox e Grid, la disposizione orizzontale di elementi come i menu di navigazione veniva realizzata quasi esclusivamente tramite `display: inline-block` oppure tramite la proprietà `float`, oggi utilizzata molto raramente per la costruzione di layout.

---

<a id="181-introduzione-a-flexbox"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.1 Introduzione a Flexbox

Nel paragrafo 17.9 abbiamo accennato a `display: flex`, definendolo come un valore capace di trasformare un elemento in un **contenitore di layout**.

**Flexbox**, abbreviazione di *Flexible Box Layout*, è un sistema pensato per disporre elementi lungo una singola direzione, orizzontale o verticale, distribuendo automaticamente lo spazio disponibile tra di essi.

Prima di Flexbox, ottenere layout come menu orizzontali perfettamente allineati, colonne di uguale altezza o elementi centrati verticalmente richiedeva tecniche complesse e poco affidabili (basate su `float`, `position` o addirittura tabelle usate impropriamente). Flexbox risolve questi problemi in modo semplice e prevedibile, ed è oggi uno degli strumenti più utilizzati nello sviluppo Web moderno.

---

<a id="182-attivare-flexbox-contenitore-e-item"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.2 Attivare Flexbox: contenitore e item

Flexbox coinvolge sempre due livelli distinti:

| Ruolo | Descrizione |
| --- | --- |
| Flex container | L'elemento genitore, su cui si applica `display: flex` |
| Flex item | Ognuno degli elementi figli diretti del container |

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex;
}
```

Nel momento in cui si applica `display: flex` al contenitore, tutti i suoi figli diretti diventano automaticamente flex item, disponendosi per impostazione predefinita in riga, uno accanto all'altro.

---

<a id="183-lasse-principale-e-lasse-trasversale"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.3 L'asse principale e l'asse trasversale

Il concetto più importante da comprendere in Flexbox è la presenza di **due assi**:

| Asse | Descrizione |
| --- | --- |
| Asse principale (*main axis*) | La direzione lungo cui si dispongono gli item |
| Asse trasversale (*cross axis*) | La direzione perpendicolare all'asse principale |

Per impostazione predefinita, l'asse principale è orizzontale e l'asse trasversale è verticale. Come vedremo tra poco, la proprietà `flex-direction` permette di invertire questa relazione.

> 🎯 **Punto chiave del modulo** — Comprendere quale proprietà agisce su quale asse è la chiave per non confondersi con Flexbox. Tieni sempre a mente questa distinzione mentre studi i prossimi paragrafi.

---

<a id="184-flex-direction"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.4 flex-direction

La proprietà `flex-direction`, applicata al container, stabilisce la direzione dell'asse principale:

```css
.container {
  display: flex;
  flex-direction: row;
}
```

| Valore | Effetto |
| --- | --- |
| row | Da sinistra a destra (valore predefinito) |
| row-reverse | Da destra a sinistra |
| column | Dall'alto verso il basso |
| column-reverse | Dal basso verso l'alto |

```css
.menu-verticale {
  display: flex;
  flex-direction: column;
}
```

Quando `flex-direction` è impostato su `column`, l'asse principale diventa verticale, e l'asse trasversale diventa orizzontale: tutte le proprietà che vedremo nei prossimi paragrafi "seguono" questo scambio.

---

<a id="185-flex-wrap"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.5 flex-wrap

Per impostazione predefinita, Flexbox cerca di disporre tutti gli item su un'unica riga (o colonna), anche a costo di restringerli eccessivamente. La proprietà `flex-wrap` permette di consentire agli item di andare a capo quando lo spazio non è sufficiente:

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

| Valore | Effetto |
| --- | --- |
| nowrap | Nessun a capo (valore predefinito) |
| wrap | Gli item vanno a capo se necessario |
| wrap-reverse | Gli item vanno a capo in ordine inverso |

---

<a id="186-flex-flow"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.6 flex-flow

La proprietà `flex-flow` è la forma abbreviata che riunisce `flex-direction` e `flex-wrap` in un'unica dichiarazione:

```css
.container {
  display: flex;
  flex-flow: row wrap;
}
```

---

<a id="187-justify-content"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.7 justify-content

La proprietà `justify-content`, applicata al container, controlla l'allineamento degli item lungo l'**asse principale**:

```css
.container {
  display: flex;
  justify-content: center;
}
```

| Valore | Effetto |
| --- | --- |
| flex-start | Item allineati all'inizio (valore predefinito) |
| flex-end | Item allineati alla fine |
| center | Item centrati |
| space-between | Spazio uguale tra gli item, nessuno spazio ai bordi |
| space-around | Spazio uguale attorno a ciascun item |
| space-evenly | Spazio perfettamente uniforme tra tutti gli item e i bordi |

```css
nav {
  display: flex;
  justify-content: space-between;
}
```

Questa proprietà è probabilmente una delle più utilizzate in assoluto, ad esempio per distribuire logo e collegamenti alle due estremità di una barra di navigazione.

---

<a id="188-align-items"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.8 align-items

La proprietà `align-items`, applicata al container, controlla l'allineamento degli item lungo l'**asse trasversale**:

```css
.container {
  display: flex;
  align-items: center;
}
```

| Valore | Effetto |
| --- | --- |
| stretch | Gli item si allungano per riempire il container (valore predefinito) |
| flex-start | Allineati all'inizio dell'asse trasversale |
| flex-end | Allineati alla fine dell'asse trasversale |
| center | Centrati sull'asse trasversale |
| baseline | Allineati in base alla linea di base del testo |

Combinando `justify-content: center` e `align-items: center`, è possibile centrare perfettamente un elemento sia orizzontalmente che verticalmente, uno dei problemi storicamente più complessi in CSS:

```css
.centrato {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

---

<a id="189-align-content"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.9 align-content

Quando è attivo `flex-wrap: wrap` e sono presenti più righe di item, la proprietà `align-content` controlla la distribuzione delle righe lungo l'asse trasversale:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

Questa proprietà accetta valori simili a `justify-content`, ma agisce sulle righe nel loro insieme, non sui singoli item. Se è presente una sola riga di item, `align-content` non produce alcun effetto visibile.

---

<a id="1810-la-proprieta-gap"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.10 La proprietà gap

La proprietà `gap` permette di distanziare gli item senza dover applicare `margin` su ciascuno di essi singolarmente:

```css
.container {
  display: flex;
  gap: 20px;
}
```

È possibile specificare separatamente lo spazio tra righe e tra colonne:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 10px;
}
```

A differenza del margin, `gap` non genera spazio prima del primo o dopo l'ultimo elemento, ed è oggi il metodo raccomandato per distanziare i flex item.

---

<a id="1811-le-proprieta-applicate-ai-flex-item"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.11 Le proprietà applicate ai flex item

Le proprietà viste finora si applicano al **container**. Esistono inoltre proprietà che si applicano direttamente ai singoli **flex item**.

**18.11.1 — order**

La proprietà `order` permette di modificare l'ordine visivo di un item, senza modificare l'ordine nel codice HTML:

```css
.item-primo {
  order: -1;
}
```

Tutti gli item possiedono un valore `order` predefinito pari a 0; valori più bassi vengono visualizzati prima, valori più alti dopo.

**18.11.2 — flex-grow**

La proprietà `flex-grow` stabilisce quanto un item debba espandersi per occupare lo spazio disponibile in eccesso:

```css
.item {
  flex-grow: 1;
}
```

Se tutti gli item possiedono `flex-grow: 1`, lo spazio disponibile viene distribuito in parti uguali. Se un item possiede `flex-grow: 2`, occuperà il doppio dello spazio in eccesso rispetto agli altri.

**18.11.3 — flex-shrink**

La proprietà `flex-shrink` stabilisce quanto un item debba restringersi quando lo spazio disponibile non è sufficiente:

```css
.item {
  flex-shrink: 0;
}
```

Un valore di `flex-shrink: 0` impedisce all'item di restringersi, anche quando gli altri item vengono compressi.

**18.11.4 — flex-basis**

La proprietà `flex-basis` stabilisce la dimensione di partenza di un item, prima che vengano applicati `flex-grow` o `flex-shrink`:

```css
.item {
  flex-basis: 200px;
}
```

`flex-basis` si comporta in modo simile a `width` (o `height`, se l'asse principale è verticale), ma possiede una priorità specifica all'interno del sistema Flexbox.

**18.11.5 — La forma abbreviata flex**

Le tre proprietà precedenti possono essere riunite nella forma abbreviata `flex`:

```css
.item {
  flex: 1 1 200px;
  /* flex-grow flex-shrink flex-basis */
}
```

Una combinazione molto comune è `flex: 1`, equivalente a `flex: 1 1 0%`, che fa sì che tutti gli item con questa dichiarazione occupino uno spazio uguale, indipendentemente dal loro contenuto.

**18.11.6 — align-self**

La proprietà `align-self` permette di sovrascrivere, per un singolo item, il valore di `align-items` impostato sul container:

```css
.item-speciale {
  align-self: flex-end;
}
```

---

<a id="1812-riepilogo-proprieta-del-container-e-degli-item"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.12 Riepilogo: proprietà del container e degli item

| Proprietà | Applicata a | Effetto |
| --- | --- | --- |
| display: flex | Container | Attiva Flexbox |
| flex-direction | Container | Direzione dell'asse principale |
| flex-wrap | Container | Consente l'andare a capo |
| justify-content | Container | Allineamento sull'asse principale |
| align-items | Container | Allineamento sull'asse trasversale |
| align-content | Container | Allineamento delle righe multiple |
| gap | Container | Spaziatura tra gli item |
| order | Item | Ordine visivo dell'item |
| flex-grow | Item | Capacità di espansione |
| flex-shrink | Item | Capacità di restringimento |
| flex-basis | Item | Dimensione di partenza |
| align-self | Item | Allineamento individuale sull'asse trasversale |

---

<a id="1813-esempio-pratico-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 18.13 Esempio pratico completo

File `index.html`:

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Flexbox</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header class="navbar">
        <div class="logo">GCPROF Academy</div>
        <nav>
            <a href="#">Home</a>
            <a href="#">Corsi</a>
            <a href="#">Contatti</a>
        </nav>
    </header>

    <main class="corsi">
        <div class="card">Corso HTML</div>
        <div class="card">Corso CSS</div>
        <div class="card">Corso JavaScript</div>
    </main>

</body>
</html>
```

File `css/style.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: darkblue;
  color: white;
}

.navbar nav {
  display: flex;
  gap: 20px;
}

.navbar nav a {
  color: white;
  text-decoration: none;
}

.corsi {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
}

.card {
  flex: 1 1 200px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  text-align: center;
}
```

Questo esempio riunisce una barra di navigazione con `justify-content: space-between` e una griglia flessibile di card che si adatta automaticamente allo spazio disponibile, restringendosi e andando a capo su schermi più piccoli grazie a `flex-wrap: wrap` e `flex: 1 1 200px`.

---

## ✅ Best Practice

✔ Utilizzare Flexbox per layout monodimensionali, ovvero disposti su una sola riga o colonna.

✔ Preferire `gap` a `margin` per distanziare gli item.

✔ Utilizzare `flex: 1` per far occupare spazio uguale a più item.

✔ Combinare `justify-content` e `align-items` per centrare elementi in entrambe le direzioni.

✔ Utilizzare `flex-wrap: wrap` quando il numero di item non è prevedibile a priori.

## ❌ Errori comuni

❌ Confondere l'asse principale con l'asse trasversale dopo aver cambiato `flex-direction`.

❌ Dimenticare `display: flex` sul container, aspettandosi che le proprietà Flexbox funzionino comunque.

❌ Applicare proprietà come `justify-content` direttamente sugli item, invece che sul container.

❌ Utilizzare Flexbox per layout bidimensionali complessi, dove Grid, trattato nel Modulo 9, risulta più adatto.

❌ Dimenticare `flex-wrap: wrap`, causando item eccessivamente compressi su schermi piccoli.

---

### 💭 Curiosità

Flexbox è stato pubblicato come raccomandazione ufficiale del **W3C** nel 2017, ma la sua adozione diffusa da parte degli sviluppatori è avvenuta molto rapidamente, tanto da renderlo oggi uno degli strumenti CSS più utilizzati al mondo, insieme a Grid, argomento del prossimo modulo.

---

<a id="esercizi-del-modulo-8"></a>

## 🧪 Esercizi del Modulo 8

1. **Menu orizzontale** — Trasforma un menu di navigazione verticale (`<ul>`/`<li>`) in un menu orizzontale usando `display: flex` sul contenitore `<ul>`, con `gap` per distanziare le voci.
2. **Card responsive** — Crea tre `<div class="card">` dentro un contenitore flex con `flex-wrap: wrap` e `gap: 20px`, assegnando a ciascuna card `flex: 1 1 200px`. Restringi la finestra del browser e osserva come le card vanno a capo automaticamente.
3. **Barra di navigazione professionale** — Ricrea l'esempio del paragrafo 18.13: una barra `<header>` con logo a sinistra e menu a destra, usando `justify-content: space-between` e `align-items: center`.
4. **Centratura perfetta** — Crea un `<div>` a tutta altezza (`height: 100vh`) contenente un unico riquadro centrato sia orizzontalmente che verticalmente, usando `display: flex`, `justify-content: center` e `align-items: center`.
5. **Sfida: ordina senza toccare l'HTML** — Crea tre elementi in un contenitore flex e, usando solo CSS, cambia l'ordine visivo del secondo elemento in modo che appaia per primo, usando la proprietà `order`.

---

<a id="riepilogo-del-modulo-8"></a>

## 📌 Riepilogo del Modulo 8

In questo modulo hai imparato:

- Come funziona la proprietà `display` e i suoi valori fondamentali: `block`, `inline`, `inline-block`, `none`.
- La differenza tra `display: none` e `visibility: hidden`.
- Quali valori di `display` possiedono i principali tag HTML per impostazione predefinita, e come modificarli.
- Che cos'è Flexbox e perché ha rivoluzionato la costruzione dei layout Web moderni.
- Il concetto di asse principale e asse trasversale, alla base di ogni proprietà Flexbox.
- Come controllare direzione (`flex-direction`), andare a capo (`flex-wrap`) e allineamento (`justify-content`, `align-items`, `align-content`) di un flex container.
- Come distanziare gli item con `gap`, senza dover ricorrere a `margin`.
- Le proprietà applicate ai singoli flex item: `order`, `flex-grow`, `flex-shrink`, `flex-basis` (e la forma abbreviata `flex`), `align-self`.
- Come costruire barre di navigazione e griglie di card completamente responsive con Flexbox.

Nel prossimo modulo — **Modulo 9: CSS Grid e Responsive Design** — completerai le tue competenze di layout con CSS Grid, il sistema bidimensionale complementare a Flexbox, e imparerai a rendere i tuoi siti perfettamente fruibili su qualsiasi dispositivo grazie al Responsive Design e alle Media Query — l'ultimo, decisivo passo prima del sito Web multipagina completo che chiuderà il corso.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*