# 🌐 MODULO 9 — CSS Grid e Responsive Design

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Web Programming Base — HTML5 & CSS3

---

## Cosa imparerai in questo modulo

Questo è il modulo conclusivo del corso. Nella prima parte imparerai **CSS Grid**, il secondo grande strumento di layout moderno dopo Flexbox: a differenza di Flexbox, pensato per un solo asse alla volta, Grid è nativamente **bidimensionale** e ti permette di controllare contemporaneamente righe e colonne. Nella seconda parte affronterai il **Responsive Design**: le tecniche, e in particolare le Media Query, che permettono a un sito di adattarsi perfettamente a smartphone, tablet e desktop. Il modulo si chiude con il **Progetto Finale del corso**: renderai completamente responsive, con Flexbox, Grid e Media Query, il sito multipagina costruito nel Modulo 5, portando a termine il percorso "Web Programming Base — HTML5 & CSS3".

---

<a id="indice-modulo"></a>

## Indice del Modulo 9

- [15.1 Perché CSS Grid](#151-perche-css-grid)
- [15.2 Attivare Grid: grid-template-columns e grid-template-rows](#152-attivare-grid-grid-template-columns-e-grid-template-rows)
- [15.3 L'unità fr e la funzione repeat()](#153-lunita-fr-e-la-funzione-repeat)
- [15.4 Lo spazio tra le celle: gap](#154-lo-spazio-tra-le-celle-gap)
- [15.5 Posizionare gli elementi: grid-column e grid-row](#155-posizionare-gli-elementi-grid-column-e-grid-row)
- [15.6 grid-template-areas](#156-grid-template-areas)
- [15.7 Grid o Flexbox: quale scegliere](#157-grid-o-flexbox-quale-scegliere)
- [15.8 Esempio completo](#158-esempio-completo)
- [16.1 Che cos'è il Responsive Design](#161-che-cose-il-responsive-design)
- [16.2 Il meta tag viewport](#162-il-meta-tag-viewport)
- [16.3 Le Media Query: sintassi di base](#163-le-media-query-sintassi-di-base)
- [16.4 Breakpoint comuni e approccio mobile-first](#164-breakpoint-comuni-e-approccio-mobile-first)
- [16.5 Immagini e unità responsive](#165-immagini-e-unita-responsive)
- [16.6 Esempio completo](#166-esempio-completo)
- [Progetto Finale del Corso: Sito Web Responsive Completo](#progetto-finale-del-corso-sito-web-responsive-completo)
- [Esercizi del Modulo 9](#esercizi-del-modulo-9)
- [Riepilogo del Modulo 9](#riepilogo-del-modulo-9)

---

<a id="151-perche-css-grid"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.1 Perché CSS Grid

Nel Modulo 8 hai visto che Flexbox è pensato per distribuire elementi lungo **un solo asse** alla volta, riga oppure colonna. Molti layout reali, però, richiedono di ragionare contemporaneamente su righe **e** colonne: pensa alla struttura tipica di una pagina Web, con intestazione, menu laterale, contenuto principale e piè di pagina, tutti posizionati in una griglia bidimensionale.

**CSS Grid** nasce esattamente per questo: permette di definire una griglia di righe e colonne sul contenitore, e di posizionare gli elementi al suo interno con grande precisione.

> 💡 **Approfondimento** — Come già anticipato nel Modulo 8, Grid e Flexbox non sono in competizione: nella pratica professionale convivono nello stesso progetto. Un caso frequente è usare Grid per la struttura generale della pagina (intestazione, corpo, piè di pagina) e Flexbox per allineare gli elementi più piccoli all'interno di ciascuna area (ad esempio i link di un menu).

---

<a id="152-attivare-grid-grid-template-columns-e-grid-template-rows"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.2 Attivare Grid: grid-template-columns e grid-template-rows

Grid si attiva, come Flexbox, con una dichiarazione sul contenitore:

```css
.contenitore {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```

`grid-template-columns` definisce il numero e la larghezza delle colonne; `grid-template-rows` definisce il numero e l'altezza delle righe. Nell'esempio sopra si ottiene una griglia di 3 colonne da 200px e 2 righe da 100px, per un totale di 6 celle.

```html
<div class="contenitore">
  <div class="cella">1</div>
  <div class="cella">2</div>
  <div class="cella">3</div>
  <div class="cella">4</div>
</div>
```

Gli elementi figli si posizionano automaticamente nelle celle della griglia, riga per riga, senza bisogno di ulteriori indicazioni.

---

<a id="153-lunita-fr-e-la-funzione-repeat"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.3 L'unità fr e la funzione repeat()

Definire ogni colonna con una larghezza fissa in pixel è poco flessibile. Grid introduce l'unità `fr` (*fraction*), che rappresenta una **frazione dello spazio disponibile**:

```css
.contenitore {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

In questo esempio le tre colonne si dividono equamente tutto lo spazio del contenitore, qualunque sia la sua larghezza. Le proporzioni possono anche essere diverse:

```css
.contenitore {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr; /* la prima colonna è larga il doppio delle altre */
}
```

Quando le colonne sono numerose e ripetitive, la funzione `repeat()` evita di scriverle una per una:

```css
.contenitore {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* equivalente a: 1fr 1fr 1fr 1fr */
}
```

---

<a id="154-lo-spazio-tra-le-celle-gap"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.4 Lo spazio tra le celle: gap

Esattamente come in Flexbox, la proprietà `gap` definisce lo spazio tra le celle della griglia, sia in orizzontale sia in verticale:

```css
.contenitore {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

`gap` può anche essere scomposta in `row-gap` e `column-gap`, quando lo spazio tra righe e tra colonne deve essere diverso.

---

<a id="155-posizionare-gli-elementi-grid-column-e-grid-row"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.5 Posizionare gli elementi: grid-column e grid-row

Ogni elemento figlio può essere posizionato manualmente, e persino esteso su più celle, tramite `grid-column` e `grid-row`, indicando le linee della griglia di inizio e fine:

```css
.elemento-largo {
  grid-column: 1 / 3; /* dalla linea 1 alla linea 3: occupa le prime due colonne */
}

.elemento-alto {
  grid-row: 1 / 3; /* occupa le prime due righe */
}
```

> ⚠️ **Attenzione** — In Grid le linee della griglia si numerano a partire da **1**, non da 0, e il valore dopo la barra (`/`) indica la linea **di fine**, non il numero di celle da occupare. `grid-column: 1 / 3` significa "dalla linea 1 alla linea 3", che corrisponde a due colonne, non a tre: è un errore di conteggio molto comune tra chi inizia a usare Grid.

---

<a id="156-grid-template-areas"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.6 grid-template-areas

`grid-template-areas` è probabilmente la funzionalità più elegante di Grid: permette di disegnare l'intero layout della pagina come una mappa testuale, assegnando un nome a ciascuna area e poi richiamandolo sui singoli elementi:

```css
.pagina {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

```html
<div class="pagina">
  <header class="header">Intestazione</header>
  <aside class="sidebar">Barra laterale</aside>
  <main class="main">Contenuto principale</main>
  <footer class="footer">Piè di pagina</footer>
</div>
```

Il risultato è un intero layout di pagina — intestazione a tutta larghezza, barra laterale, contenuto principale e piè di pagina a tutta larghezza — leggibile quasi come un disegno, direttamente dal codice CSS.

---

<a id="157-grid-o-flexbox-quale-scegliere"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.7 Grid o Flexbox: quale scegliere

| Situazione | Strumento consigliato |
| --- | --- |
| Menu di navigazione, gruppo di pulsanti, singola riga o colonna di elementi | Flexbox |
| Struttura generale della pagina (header, sidebar, main, footer) | Grid |
| Layout a card che deve adattarsi senza una griglia rigida | Flexbox (`flex-wrap`) |
| Griglia di elementi con righe e colonne allineate con precisione | Grid |

Come già visto nel paragrafo 15.1, nella pratica i due strumenti si combinano quasi sempre nello stesso progetto, ciascuno applicato dove è più naturale.

---

<a id="158-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 15.8 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>CSS Grid</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="pagina">
        <header class="header">GCProf Academy</header>
        <aside class="sidebar">Menu</aside>
        <main class="main">Contenuto principale</main>
        <footer class="footer">&copy; 2026 GCProf Academy</footer>
    </div>

</body>
</html>
```

```css
/* style.css */

* {
    box-sizing: border-box;
}

.pagina {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    gap: 10px;
    min-height: 100vh;
}

.header  { grid-area: header;  background-color: navy;   color: white; padding: 20px; }
.sidebar { grid-area: sidebar; background-color: #eee;   padding: 20px; }
.main    { grid-area: main;    background-color: #f9f9f9; padding: 20px; }
.footer  { grid-area: footer;  background-color: navy;   color: white; padding: 10px; text-align: center; }
```

---

## ✅ Best Practice

✔ Usare `fr` e `repeat()` invece di larghezze fisse, per griglie che si adattano allo spazio disponibile.

✔ Ricorrere a `grid-template-areas` per i layout di pagina complessi: rende il codice CSS leggibile come una mappa visiva.

✔ Scegliere Grid per la struttura bidimensionale della pagina, Flexbox per l'allineamento all'interno delle singole aree.

## ❌ Errori comuni

❌ Contare le linee di `grid-column`/`grid-row` come se partissero da 0 invece che da 1.

❌ Usare Grid per un semplice allineamento monodimensionale, dove Flexbox sarebbe più semplice e diretto.

❌ Dimenticare `gap`, ottenendo celle della griglia visivamente attaccate tra loro.

---

<a id="161-che-cose-il-responsive-design"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 16.1 Che cos'è il Responsive Design

Il **Responsive Design** è l'insieme di tecniche che permettono a un sito Web di adattare automaticamente il proprio layout alle dimensioni dello schermo su cui viene visualizzato: smartphone, tablet, desktop, e tutte le risoluzioni intermedie.

Esistono due approcci principali:

| Approccio | Descrizione |
| --- | --- |
| **Desktop-first** | si progetta prima la versione desktop, poi si adatta verso il basso per schermi più piccoli |
| **Mobile-first** | si progetta prima la versione mobile, poi si arricchisce il layout per schermi più grandi |

> 💡 **Approfondimento** — L'approccio **mobile-first** è oggi considerato la pratica professionale standard: la maggior parte del traffico Web globale proviene da dispositivi mobili, e progettare partendo dal caso più vincolato (lo schermo più piccolo) costringe a concentrarsi fin da subito sui contenuti davvero essenziali, aggiungendo complessità solo quando lo spazio lo permette.

---

<a id="162-il-meta-tag-viewport"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 16.2 Il meta tag viewport

Prima ancora di scrivere qualunque Media Query, ogni pagina responsive deve includere nel proprio `<head>` il meta tag `viewport`, che indica al browser mobile di utilizzare la larghezza reale del dispositivo, invece di simulare uno schermo desktop rimpicciolito:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

> ⚠️ **Attenzione** — Senza questo meta tag, su moltissimi dispositivi mobili le Media Query che vedrai nel prossimo paragrafo semplicemente **non funzionano come previsto**: il browser continua a renderizzare la pagina come se fosse su uno schermo largo circa 980px, per poi rimpicciolirla otticamente. Questo singolo tag, spesso dimenticato, è il prerequisito assoluto di ogni sito responsive.

---

<a id="163-le-media-query-sintassi-di-base"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 16.3 Le Media Query: sintassi di base

Le **Media Query** permettono di applicare regole CSS **solo** quando lo schermo soddisfa determinate condizioni, tipicamente una larghezza minima o massima:

```css
.contenitore {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .contenitore {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .contenitore {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

In questo esempio, coerente con un approccio mobile-first: sotto i 768px il contenitore mostra una sola colonna; da 768px in su, due colonne; da 1024px in su, tre colonne.

---

<a id="164-breakpoint-comuni-e-approccio-mobile-first"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 16.4 Breakpoint comuni e approccio mobile-first

I punti di rottura (*breakpoint*) più comunemente utilizzati nei progetti professionali sono, indicativamente, i seguenti:

| Breakpoint | Dispositivo indicativo |
| --- | --- |
| fino a 480px | smartphone piccoli |
| da 481px a 767px | smartphone grandi |
| da 768px a 1023px | tablet |
| da 1024px in su | desktop |

Con l'approccio mobile-first, il CSS "di base" (senza alcuna Media Query) descrive sempre la versione mobile; le Media Query, tutte scritte con `min-width`, aggiungono progressivamente le regole per schermi più grandi:

```css
/* stile di base: mobile */
.menu {
  flex-direction: column;
}

/* da tablet in su */
@media (min-width: 768px) {
  .menu {
    flex-direction: row;
  }
}
```

---

<a id="165-immagini-e-unita-responsive"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 16.5 Immagini e unità responsive

Oltre alle Media Query, un sito responsive si basa su alcune abitudini fondamentali già incontrate nei moduli precedenti:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Questa regola, vista per la prima volta nel Modulo 7, garantisce che nessuna immagine superi mai la larghezza del proprio contenitore, adattandosi automaticamente a schermi di qualsiasi dimensione.

Anche le unità relative viste nel Modulo 7 (`%`, `rem`, `vw`, `vh`) contribuiscono in modo determinante alla responsività, spesso ancora prima che sia necessaria una Media Query dedicata.

---

<a id="166-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 16.6 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Design</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="corsi">
        <div class="card">Web Programming Base</div>
        <div class="card">Master in Intelligenza Artificiale</div>
        <div class="card">Master in Blockchain & Web3</div>
    </div>

</body>
</html>
```

```css
/* style.css */

* {
    box-sizing: border-box;
}

.corsi {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
}

.card {
    padding: 20px;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    text-align: center;
}

@media (min-width: 768px) {
    .corsi {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .corsi {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

---

## ✅ Best Practice

✔ Includere sempre il meta tag `viewport` in ogni pagina responsive.

✔ Adottare un approccio mobile-first, scrivendo lo stile di base per il mobile e usando `min-width` per arricchirlo.

✔ Applicare `max-width: 100%` a tutte le immagini del sito.

✔ Testare il sito a più larghezze, non solo sui breakpoint "esatti" della tabella dei breakpoint comuni.

## ❌ Errori comuni

❌ Dimenticare il meta tag `viewport`, vanificando l'effetto di qualunque Media Query.

❌ Scrivere Media Query con valori di breakpoint scelti a caso, senza testare il layout nei punti intermedi.

❌ Fissare larghezze in pixel su elementi chiave del layout, impedendo l'adattamento previsto dalle Media Query.

---

<a id="progetto-finale-del-corso-sito-web-responsive-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 🏆 Progetto Finale del Corso: Sito Web Responsive Completo

**Obiettivo:** questo è il progetto conclusivo dell'intero corso **Web Programming Base — HTML5 & CSS3**. Riprendi il sito multipagina costruito nel Progetto Finale HTML del Modulo 5 (`index.html`, `chi-sono.html`, `competenze.html`, `contatti.html`) e trasformalo in un sito completamente stilizzato e responsive, applicando tutte le competenze acquisite dal Modulo 6 al Modulo 9.

**Requisiti del progetto:**

| Ambito | Requisito |
| --- | --- |
| CSS esterno | Un unico file `style.css` collegato a tutte le pagine (Modulo 6) |
| Tipografia | Font coerente su tutto il sito, con almeno un web font di Google Fonts, dimensioni in `rem` (Modulo 7) |
| Box Model | `box-sizing: border-box` applicato globalmente; card con padding, bordi e margini curati (Modulo 7) |
| Header e menu | Intestazione con logo e menu di navigazione realizzati con Flexbox, allineati con `justify-content` (Modulo 8) |
| Layout a card | La pagina `competenze.html` (o una nuova sezione "Progetti") organizzata a card con Flexbox o Grid, che vada a capo correttamente su schermi stretti (Moduli 8 e 9) |
| Struttura di pagina | Almeno una pagina con layout a `grid-template-areas` (ad esempio header, sidebar, main, footer) (Modulo 9) |
| Responsive | Meta tag `viewport` su tutte le pagine, e almeno due breakpoint (mobile e desktop) che modifichino visibilmente il layout, con approccio mobile-first (Modulo 9) |
| Immagini | Tutte le immagini con `max-width: 100%` (Moduli 7 e 9) |

**Consegna:** al termine del progetto, verifica il sito ridimensionando manualmente la finestra del browser (o usando la modalità dispositivo mobile degli strumenti per sviluppatori) dai 360px circa fino oltre i 1200px, assicurandoti che in ogni fascia di larghezza il layout resti leggibile, ben allineato e privo di elementi tagliati o sovrapposti.

> 🎓 Con questo progetto hai completato l'intero percorso **Web Programming Base — HTML5 & CSS3**: dalla struttura di una pagina HTML fino a un sito Web multipagina moderno, semantico e completamente responsive, costruito con le stesse tecnologie fondamentali su cui si basa, ancora oggi, qualsiasi framework Web professionale.

---

<a id="esercizi-del-modulo-9"></a>

## 🧪 Esercizi del Modulo 9

1. **Prima griglia** — Crea un contenitore con `display: grid`, tre colonne definite con `repeat(3, 1fr)` e `gap: 20px`, e posiziona sei elementi al suo interno.
2. **Layout con aree** — Costruisci una pagina completa (header, sidebar, main, footer) usando `grid-template-areas`, come nell'esempio del paragrafo 15.8.
3. **Card responsive con Grid** — Trasforma il layout a card realizzato nel Modulo 8 con Flexbox in una versione a Grid, con una colonna su mobile, due su tablet e tre su desktop, tramite Media Query.
4. **Verifica del viewport** — Controlla che tutte le pagine del tuo sito personale includano il meta tag `viewport`, aggiungendolo dove manca.
5. **Progetto Finale del Corso** — Completa il Progetto Finale, rendendo il sito multipagina del Modulo 5 completamente stilizzato e responsive secondo i requisiti indicati.

---

<a id="riepilogo-del-modulo-9"></a>

## 📌 Riepilogo del Modulo 9

In questo modulo hai imparato:

- Perché CSS Grid è lo strumento ideale per layout bidimensionali, a differenza di Flexbox.
- Come attivare Grid e definire righe e colonne con `grid-template-columns`/`grid-template-rows`.
- Come usare l'unità `fr` e la funzione `repeat()` per griglie flessibili.
- Come posizionare manualmente gli elementi con `grid-column` e `grid-row`.
- Come disegnare interi layout di pagina con `grid-template-areas`.
- Quando scegliere Grid e quando scegliere Flexbox.
- Che cos'è il Responsive Design e la differenza tra approccio desktop-first e mobile-first.
- Il ruolo indispensabile del meta tag `viewport` e la sintassi di base delle Media Query.
- I breakpoint comuni e come costruire un foglio di stile mobile-first.

Con il Progetto Finale del Corso hai completato l'intero percorso **Web Programming Base — HTML5 & CSS3**, dai fondamenti del Web fino a un sito multipagina completo, semantico e responsive. Questo è il traguardo naturale da cui proseguire, in futuro, verso JavaScript e i framework moderni come React, Angular o Next.js.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*