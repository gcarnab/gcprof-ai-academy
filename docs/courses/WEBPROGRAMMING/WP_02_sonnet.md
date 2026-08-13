# 🌐 MODULO 2 — HTML: Struttura e Primi Tag

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Web Programming Base — HTML5 & CSS3

---

## Cosa imparerai in questo modulo

In questo modulo entriamo nel vivo di HTML: imparerai cos'è un tag, come è fatto un documento HTML valido, quali sono gli elementi indispensabili di ogni pagina, come creare il tuo primo file con Visual Studio Code e come organizzare un progetto in modo professionale fin dal primo giorno. Nella seconda parte del modulo approfondirai l'anatomia dei tag, la differenza tra tag con e senza chiusura, l'indentazione, i commenti e le regole di nidificazione. Chiuderemo con i tag di titolo e di paragrafo, la formattazione del testo e un esempio pratico completo.

---

<a id="indice-modulo"></a>

## Indice del Modulo 2

- [2.1 Che cos'è HTML](#21-che-cose-html)
- [2.2 I tag HTML](#22-i-tag-html)
- [2.3 Gli elementi HTML](#23-gli-elementi-html)
- [2.4 Gli attributi](#24-gli-attributi)
- [2.5 HTML5 e gli elementi semantici](#25-html5-e-gli-elementi-semantici)
- [2.6 La struttura minima di una pagina HTML](#26-la-struttura-minima-di-una-pagina-html)
- [2.7 Analizziamo il documento](#27-analizziamo-il-documento)
- [2.8 Come creare il primo file](#28-come-creare-il-primo-file)
- [2.9 Organizzazione del progetto](#29-organizzazione-del-progetto)
- [3.1 Che cos'è un tag](#31-che-cose-un-tag)
- [3.2 Anatomia di un tag](#32-anatomia-di-un-tag)
- [3.3 Tag con contenuto](#33-tag-con-contenuto)
- [3.4 Tag senza chiusura (Void Elements)](#34-tag-senza-chiusura-void-elements)
- [3.5 L'indentazione](#35-lindentazione)
- [3.6 I commenti HTML](#36-i-commenti-html)
- [3.7 Errori comuni nei tag](#37-errori-comuni-nei-tag)
- [3.8 Nidificazione dei tag](#38-nidificazione-dei-tag)
- [3.9 Nidificazione errata](#39-nidificazione-errata)
- [4.1 I titoli](#41-i-titoli)
- [4.2 Utilizzo dei titoli](#42-utilizzo-dei-titoli)
- [4.3 Gerarchia dei titoli](#43-gerarchia-dei-titoli)
- [4.4 Il paragrafo](#44-il-paragrafo)
- [4.5 Il tag `<br>`](#45-il-tag-br)
- [4.6 Il tag `<hr>`](#46-il-tag-hr)
- [4.7 Testo importante: `<strong>`](#47-testo-importante-strong)
- [4.8 Testo enfatizzato: `<em>`](#48-testo-enfatizzato-em)
- [4.9 Altri tag di formattazione](#49-altri-tag-di-formattazione)
- [4.10 Esempio completo](#410-esempio-completo)
- [Esercizi del Modulo 2](#esercizi-del-modulo-2)
- [Riepilogo del Modulo 2](#riepilogo-del-modulo-2)

---

<a id="21-che-cose-html"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 2.1 Che cos'è HTML

**HTML** è l'acronimo di **HyperText Markup Language**: è il linguaggio utilizzato per descrivere la struttura di una pagina Web.

Ogni contenuto viene racchiuso all'interno di elementi chiamati **tag**. I tag non "fanno" nulla in senso computazionale: si limitano a dichiarare *cosa rappresenta* un contenuto (un titolo, un paragrafo, un'immagine), lasciando al browser il compito di interpretarlo e visualizzarlo correttamente.

Puoi pensare a HTML come allo **scheletro** di una pagina Web: definisce cosa c'è e in che ordine, ma non si occupa né dell'aspetto grafico (compito del CSS) né del comportamento interattivo (compito di JavaScript).

---

<a id="22-i-tag-html"></a>

## 2.2 I tag HTML

La maggior parte dei tag possiede tre componenti:

- tag di apertura;
- contenuto;
- tag di chiusura.

Esempio:

```html
<p>Questo è un paragrafo.</p>
```

In questo esempio:

- `<p>` è il tag di apertura;
- `</p>` è il tag di chiusura;
- il testo racchiuso rappresenta il contenuto.

> 💡 **Approfondimento** — Il nome del tag descrive il *significato* del contenuto, non il suo aspetto. Un tag `<p>` resterà sempre un paragrafo dal punto di vista semantico, anche se in seguito lo renderemo enorme e colorato con il CSS.

---

<a id="23-gli-elementi-html"></a>

## 2.3 Gli elementi HTML

Un **elemento HTML** è l'insieme completo di tag di apertura, contenuto e tag di chiusura:

```
Tag di apertura
      ↓
  Contenuto
      ↓
Tag di chiusura
```

La distinzione tra "tag" ed "elemento" è sottile ma utile: il tag è il singolo marcatore (`<p>` oppure `</p>`), mentre l'elemento è la struttura completa (`<p>testo</p>`). Nel linguaggio comune i due termini vengono spesso usati come sinonimi, ma conoscerne la differenza ti aiuterà a leggere con più precisione la documentazione ufficiale.

---

<a id="24-gli-attributi"></a>

## 2.4 Gli attributi

Molti tag possono possedere **attributi**, che forniscono informazioni aggiuntive sull'elemento.

Esempio:

```html
<a href="https://www.google.it">Google</a>
```

In questo caso:

- l'attributo è `href`;
- il valore è `https://www.google.it`.

Un attributo è sempre composto da una coppia `nome="valore"` e viene scritto **dentro il tag di apertura**. Un elemento può avere più attributi contemporaneamente:

```html
<a href="https://www.gcprof-academy.com" target="_blank" title="Vai al sito">
  GCPROF Academy
</a>
```

Qui `target="_blank"` apre il link in una nuova scheda, mentre `title` mostra un piccolo tooltip al passaggio del mouse.

---

<a id="25-html5-e-gli-elementi-semantici"></a>

## 2.5 HTML5 e gli elementi semantici

La versione attuale del linguaggio è **HTML5**, che introduce numerosi elementi semantici pensati per descrivere il *ruolo* di una sezione di pagina, non solo il suo contenuto generico. Tra i più importanti:

| Elemento | Ruolo |
| --- | --- |
| `<header>` | intestazione della pagina o di una sezione |
| `<nav>` | area di navigazione |
| `<section>` | sezione tematica di contenuto |
| `<article>` | contenuto autonomo e riutilizzabile |
| `<aside>` | contenuto correlato ma secondario |
| `<footer>` | piè di pagina |

Questi elementi verranno approfonditi nel Modulo 5, dedicato interamente all'HTML semantico. Per ora è sufficiente sapere che esistono e che rappresentano un'evoluzione rispetto al vecchio approccio, in cui tutto veniva racchiuso genericamente in tag `<div>`.

---

<a id="26-la-struttura-minima-di-una-pagina-html"></a>

## 2.6 La struttura minima di una pagina HTML

Ogni documento HTML deve possedere una struttura di base, indipendentemente da quanto sarà complessa la pagina:

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>La mia prima pagina</title>
  </head>

  <body>
    Ciao Mondo!
  </body>
</html>
```

Questa è la struttura minima dalla quale partiremo per **tutti** gli esercizi del corso. Ti consigliamo di memorizzarla e di digitarla per intero almeno le prime volte, senza copiarla e incollarla: è il modo più rapido per fissarla in memoria.

---

<a id="27-analizziamo-il-documento"></a>

## 2.7 Analizziamo il documento

| Elemento | Significato |
| --- | --- |
| `<!DOCTYPE html>` | dichiara che il documento è scritto in HTML5 |
| `<html>` | elemento principale, racchiude l'intera pagina |
| `<head>` | contiene informazioni sulla pagina, non visibili nel corpo |
| `<body>` | contiene il contenuto visibile della pagina |
| `<title>` | titolo mostrato nella scheda del browser |
| `<meta>` | informazioni aggiuntive sul documento |

Due dettagli meritano attenzione particolare:

- l'attributo `lang="it"` sull'elemento `<html>` comunica al browser (e ai motori di ricerca) che la pagina è scritta in italiano: è importante per l'accessibilità e per la corretta pronuncia da parte degli screen reader;
- il tag `<meta name="viewport" ...>` è ciò che permette a una pagina di essere correttamente visualizzata su smartphone e tablet. Lo riprenderemo in dettaglio nel Modulo 9, dedicato al Responsive Design.

---

<a id="28-come-creare-il-primo-file"></a>

## 2.8 Come creare il primo file

Segui questi passaggi per creare la tua prima pagina Web:

1. Crea una cartella chiamata `web-programming`.
2. Aprila con **Visual Studio Code**.
3. Crea un nuovo file chiamato `index.html`.
4. Scrivi al suo interno il codice mostrato al paragrafo 2.6.
5. Salva il file.
6. Avvia l'estensione **Live Server** (tasto destro sul file → *Open with Live Server*).

Se tutto è stato fatto correttamente, il browser si aprirà automaticamente mostrando la scritta "Ciao Mondo!". La tua prima pagina Web è pronta.

> ✅ **Perché index.html?** — I server Web, per convenzione, cercano automaticamente un file chiamato `index.html` quando si visita una cartella o un dominio senza specificare una pagina precisa. Per questo motivo la home page di un sito si chiama quasi sempre così.

---

<a id="29-organizzazione-del-progetto"></a>

## 2.9 Organizzazione del progetto

Una buona organizzazione delle cartelle facilita enormemente lo sviluppo, soprattutto quando il progetto cresce.

```
web-programming/
│
├── index.html
├── css/
│      style.css
├── images/
├── js/
└── assets/
```

Nel corso utilizzeremo sempre questa struttura:

- `css/` conterrà i fogli di stile;
- `images/` conterrà le immagini utilizzate nei progetti;
- `js/` conterrà eventuali script (nei moduli avanzati);
- `assets/` conterrà font, icone o altre risorse.

Abituarti fin da subito a questa organizzazione ti farà risparmiare tempo prezioso quando lavorerai a progetti reali di dimensioni maggiori.

---

## ✅ Best Practice

✔ Utilizzare sempre HTML5.

✔ Mantenere il codice indentato.

✔ Utilizzare nomi di file e cartelle significativi (evitare `pagina1.html`).

✔ Separare HTML, CSS e immagini in cartelle dedicate.

## ❌ Errori comuni

❌ Salvare il file con estensione `.txt` invece di `.html`.

❌ Dimenticare `<!DOCTYPE html>`.

❌ Dimenticare il tag `<body>`.

❌ Scrivere codice senza indentazione.

❌ Inserire CSS direttamente nel file HTML quando non necessario.

---

<a id="31-che-cose-un-tag"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 3.1 Che cos'è un tag

Come abbiamo visto nel paragrafo precedente, HTML utilizza particolari elementi chiamati **tag** per descrivere il contenuto della pagina.

Ogni tag comunica al browser il significato del contenuto racchiuso al suo interno. Ad esempio, il browser sa che un elemento racchiuso nel tag `<h1>` rappresenta un titolo principale, mentre un elemento racchiuso nel tag `<p>` rappresenta un paragrafo.

Questa distinzione è fondamentale perché permette ai browser, ai motori di ricerca e alle tecnologie assistive (come gli screen reader per persone ipovedenti) di comprendere correttamente la struttura del documento, non solo il suo aspetto visivo.

---

<a id="32-anatomia-di-un-tag"></a>

## 3.2 Anatomia di un tag

La maggior parte dei tag HTML possiede la seguente struttura:

```html
<tag>
    contenuto
</tag>
```

Possiamo distinguere tre parti fondamentali:

| Parte | Descrizione |
| --- | --- |
| `<tag>` | Tag di apertura |
| Contenuto | Informazione da visualizzare |
| `</tag>` | Tag di chiusura |

Esempio pratico:

```html
<p>Benvenuti nel corso di Web Programming.</p>
```

---

<a id="33-tag-con-contenuto"></a>

## 3.3 Tag con contenuto

I tag più comuni possiedono sia apertura sia chiusura. Alcuni esempi che utilizzerai fin da subito:

```html
<h1>Corso HTML</h1>

<p>Questo è un paragrafo.</p>

<strong>Testo importante</strong>

<em>Testo enfatizzato</em>
```

---

<a id="34-tag-senza-chiusura-void-elements"></a>

## 3.4 Tag senza chiusura (Void Elements)

Alcuni elementi HTML non contengono testo e sono costituiti esclusivamente dal tag di apertura. Questi elementi vengono chiamati **Void Elements** ("elementi vuoti").

I più utilizzati sono:

| Tag | Descrizione |
| --- | --- |
| `<br>` | Va a capo |
| `<hr>` | Linea orizzontale |
| `<img>` | Immagine |
| `<meta>` | Informazioni sulla pagina |
| `<link>` | Collegamento a file esterni |
| `<input>` | Campo di input |

Esempio:

```html
<p>Prima riga.<br>Seconda riga.</p>

<hr>

<p>Nuova sezione.</p>
```

> 💡 **Approfondimento** — In HTML5 non è obbligatorio chiudere i Void Elements con la barra finale (`<br />`), a differenza di quanto richiedeva lo standard XHTML in passato. Entrambe le forme sono comunque valide: la scelta è spesso una questione di stile del team di sviluppo.

---

<a id="35-lindentazione"></a>

## 3.5 L'indentazione

L'indentazione consiste nello spostare verso destra gli elementi "figli" rispetto ai loro elementi "genitori". Non modifica in alcun modo il funzionamento della pagina: serve esclusivamente a rendere il codice più leggibile per chi lo scrive e per chi lo leggerà in futuro (incluso te stesso, tra qualche mese).

Codice corretto (indentato):

```html
<body>

    <h1>Benvenuti</h1>

    <p>Primo paragrafo.</p>

</body>
```

Codice scorretto (non indentato):

```html
<body>
<h1>Benvenuti</h1>
<p>Primo paragrafo.</p>
</body>
```

Entrambe le versioni funzionano allo stesso identico modo agli occhi del browser, ma la prima è molto più leggibile e professionale. Visual Studio Code ti aiuta automaticamente con l'indentazione: sfruttalo fin da subito.

---

<a id="36-i-commenti-html"></a>

## 3.6 I commenti HTML

Come in tutti i linguaggi, anche HTML permette di inserire commenti. I commenti non vengono visualizzati nella pagina: servono esclusivamente per documentare il codice, lasciare promemoria o disattivare temporaneamente una parte di contenuto.

Sintassi:

```html
<!-- Questo è un commento -->
```

Esempio d'uso:

```html
<body>

    <!-- Titolo principale -->
    <h1>Corso HTML</h1>

    <!-- Primo paragrafo -->
    <p>Benvenuti.</p>

</body>
```

> ✅ **Consiglio pratico** — Usa i commenti per segnalare l'inizio e la fine delle sezioni principali di una pagina complessa (es. `<!-- INIZIO HEADER -->` ... `<!-- FINE HEADER -->`). Diventa un'abitudine preziosissima quando i file crescono oltre le poche decine di righe.

---

<a id="37-errori-comuni-nei-tag"></a>

## 3.7 Errori comuni nei tag

Uno degli errori più frequenti consiste nel dimenticare il tag di chiusura.

Esempio errato:

```html
<p>Primo paragrafo

<p>Secondo paragrafo
```

Versione corretta:

```html
<p>Primo paragrafo</p>

<p>Secondo paragrafo</p>
```

Molti browser sono "tolleranti" e cercano comunque di correggere l'errore mostrando la pagina in modo accettabile, ma questo non significa che il codice sia corretto: un tag non chiuso può causare comportamenti imprevedibili, soprattutto quando la pagina cresce di complessità.

---

<a id="38-nidificazione-dei-tag"></a>

## 3.8 Nidificazione dei tag

I tag possono essere inseriti uno dentro l'altro. Questo prende il nome di **nidificazione** (in inglese *nesting*).

Esempio corretto:

```html
<p>
  Questo testo contiene una parola
  <strong>molto importante</strong>
  per il lettore.
</p>
```

Il browser interpreterà correttamente il codice, perché il tag `<strong>` viene aperto e chiuso interamente **all'interno** del tag `<p>`.

---

<a id="39-nidificazione-errata"></a>

## 3.9 Nidificazione errata

L'ordine di apertura e chiusura deve sempre essere rispettato: l'ultimo tag aperto deve essere il primo a essere chiuso.

Esempio errato:

```html
<p>
<strong>
Testo
</p>
</strong>
```

Versione corretta:

```html
<p>
<strong>
Testo
</strong>
</p>
```

Una regola mnemonica utile: immagina i tag come delle scatole cinesi. Puoi aprire una scatola dentro un'altra, ma devi richiudere prima la scatola più interna prima di richiudere quella più esterna.

---

## ✅ Best Practice

✔ Chiudere sempre i tag.

✔ Utilizzare l'indentazione in modo coerente.

✔ Inserire commenti nelle pagine complesse.

✔ Mantenere il codice ordinato e leggibile.

## ❌ Errori comuni

❌ Tag non chiusi.

❌ Indentazione assente o incoerente.

❌ Tag chiusi nell'ordine sbagliato.

❌ Commenti inseriti in modo errato (es. dimenticare `-->`).

---

<a id="41-i-titoli"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 4.1 I titoli

HTML mette a disposizione **sei livelli di titolo**:

- `<h1>`
- `<h2>`
- `<h3>`
- `<h4>`
- `<h5>`
- `<h6>`

Il numero indica il livello gerarchico: il tag `<h1>` rappresenta il titolo più importante della pagina, mentre `<h6>` rappresenta quello meno importante.

---

<a id="42-utilizzo-dei-titoli"></a>

## 4.2 Utilizzo dei titoli

```html
<h1>Corso HTML</h1>

<h2>Introduzione</h2>

<h3>Cos'è HTML</h3>

<h4>Storia</h4>

<h5>Approfondimento</h5>

<h6>Nota</h6>
```

Il browser applica automaticamente dimensioni differenti a ciascun livello, ma è importante ricordare che questa formattazione predefinita è solo un effetto collaterale: il vero scopo dei titoli è **semantico**, non estetico. Le dimensioni potranno sempre essere personalizzate con il CSS, senza mai cambiare il tag utilizzato.

---

<a id="43-gerarchia-dei-titoli"></a>

## 4.3 Gerarchia dei titoli

Una pagina dovrebbe avere **un solo** `<h1>`, che rappresenta il titolo principale del documento (analogo al titolo di un libro).

Successivamente si utilizzano i livelli in ordine, senza saltarli:

```
H1
 ↓
H2
 ↓
H3
 ↓
H4
```

Saltare continuamente da `<h1>` a `<h5>`, o utilizzare più `<h1>` nella stessa pagina, rende difficile comprendere la struttura del documento sia per un essere umano sia per un motore di ricerca, danneggiando anche la SEO (l'ottimizzazione per i motori di ricerca) del sito.

---

<a id="44-il-paragrafo"></a>

## 4.4 Il paragrafo

Il tag utilizzato per rappresentare un paragrafo è `<p>`.

Esempio:

```html
<p>
  HTML è il linguaggio utilizzato per descrivere la struttura delle pagine Web.
</p>
```

Ogni paragrafo viene automaticamente separato dagli altri con uno spazio verticale predefinito, senza bisogno di aggiungere manualmente righe vuote o tag aggiuntivi.

---

<a id="45-il-tag-br"></a>

## 4.5 Il tag `<br>`

Il tag `<br>` permette di andare a capo **all'interno** dello stesso blocco di testo, senza creare un nuovo paragrafo.

Esempio:

```html
<p>
  Prima riga.<br>
  Seconda riga.<br>
  Terza riga.
</p>
```

⚠️ **Attenzione**: `<br>` non deve mai essere utilizzato per creare spazio verticale tra paragrafi o sezioni. Per quello scopo utilizzeremo le proprietà CSS `margin` e `padding`, che vedremo nel Modulo 7. Usare `<br>` per motivi puramente estetici è uno degli errori più comuni tra i principianti.

---

<a id="46-il-tag-hr"></a>

## 4.6 Il tag `<hr>`

Il tag `<hr>` permette di inserire una linea orizzontale, utile per separare visivamente e semanticamente due sezioni di contenuto tematicamente distinte.

Esempio:

```html
<h2>Capitolo 1</h2>

<hr>

<p>Testo del capitolo...</p>
```

---

<a id="47-testo-importante-strong"></a>

## 4.7 Testo importante: `<strong>`

Per evidenziare parti di testo particolarmente importanti dal punto di vista del significato, si utilizza il tag `<strong>`.

Esempio:

```html
<p>
  Studiare HTML è
  <strong>fondamentale</strong>
  per diventare sviluppatori Web.
</p>
```

Normalmente il browser visualizza il testo racchiuso in `<strong>` in grassetto, ma — come per i titoli — questo è solo un effetto visivo predefinito: il vero significato del tag è comunicare importanza semantica, non semplicemente "rendere il testo in grassetto".

---

<a id="48-testo-enfatizzato-em"></a>

## 4.8 Testo enfatizzato: `<em>`

Per enfatizzare una parte del testo, cambiandone il tono (come faresti alzando leggermente la voce mentre parli), si utilizza il tag `<em>`.

Esempio:

```html
<p>
  Questo concetto è
  <em>molto importante</em>
  per comprendere il funzionamento del Web.
</p>
```

Normalmente viene mostrato in corsivo.

---

<a id="49-altri-tag-di-formattazione"></a>

## 4.9 Altri tag di formattazione

Oltre a `<strong>` ed `<em>`, HTML mette a disposizione altri tag di formattazione semantica del testo:

| Tag | Significato |
| --- | --- |
| `<strong>` | Importanza |
| `<em>` | Enfasi |
| `<mark>` | Testo evidenziato (come con un evidenziatore) |
| `<small>` | Testo di dimensioni ridotte (es. note legali) |
| `<del>` | Testo eliminato (mostrato barrato) |
| `<ins>` | Testo inserito successivamente (mostrato sottolineato) |
| `<sub>` | Pedice (es. formule chimiche: H<sub>2</sub>O) |
| `<sup>` | Apice (es. esponenti: x<sup>2</sup>) |

Questi tag ti permetteranno di arricchire semanticamente i tuoi contenuti testuali ben prima di iniziare a lavorare con il CSS.

---

<a id="410-esempio-completo"></a>

## 4.10 Esempio completo

Mettiamo insieme tutto quello che abbiamo imparato in questo modulo in un unico esempio completo e funzionante:

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esempio Modulo 2</title>
</head>
<body>

    <h1>Corso HTML</h1>
    <h2>Introduzione</h2>

    <p>
        HTML è il linguaggio utilizzato per creare pagine Web.
    </p>

    <p>
        Questo testo contiene una parola
        <strong>importante</strong>
        ed una
        <em>enfatizzata</em>.
    </p>

    <hr>

    <p>
        Fine dell'esempio.
    </p>

</body>
</html>
```

Prova a copiare questo codice in un nuovo file `index.html`, aprilo con Live Server e osserva come ogni tag studiato in questo modulo si traduce in un effetto visivo preciso nella pagina.

---

## ✅ Best Practice

✔ Utilizzare un solo `<h1>` per pagina.

✔ Utilizzare i titoli in ordine gerarchico, senza saltare livelli.

✔ Utilizzare `<strong>` per il significato, non per ottenere semplicemente il grassetto.

✔ Utilizzare `<em>` per l'enfasi, non per ottenere semplicemente il corsivo.

✔ Utilizzare `<br>` soltanto quando realmente necessario, mai per creare spaziature.

## ❌ Errori comuni

❌ Utilizzare più `<h1>` nella stessa pagina.

❌ Saltare continuamente da `<h1>` a `<h5>`.

❌ Utilizzare `<br>` per creare spazi verticali tra sezioni.

❌ Utilizzare `<strong>` o `<em>` soltanto per motivi estetici.

---

<a id="esercizi-del-modulo-2"></a>

## 🧪 Esercizi del Modulo 2

Metti alla prova quanto imparato in questo modulo con i seguenti esercizi pratici. Ti consigliamo di svolgerli in ordine, salvando ogni esercizio in un file `.html` separato dentro la cartella `web-programming` creata al paragrafo 2.9.

1. **Struttura base** — Crea un nuovo file `index.html` con la struttura minima vista al paragrafo 2.6, personalizzando il `<title>` con il tuo nome.
2. **Biglietto da visita testuale** — All'interno del `<body>`, crea un `<h1>` con il tuo nome, un `<h2>` con la dicitura "Studente del corso Web Programming Base", e un paragrafo `<p>` di presentazione di almeno tre righe.
3. **Formattazione** — Nel paragrafo di presentazione, evidenzia con `<strong>` la parola che rappresenti la tua passione principale, e con `<em>` una frase che descriva il tuo obiettivo nello studiare programmazione Web.
4. **Commenti** — Aggiungi un commento HTML prima di ogni sezione della pagina (es. `<!-- Intestazione -->`), per esercitarti con la sintassi vista al paragrafo 3.6.
5. **Sfida finale** — Ricrea da zero, senza copiare e incollare, l'esempio completo del paragrafo 4.10, modificando i contenuti testuali con argomenti a tua scelta, mantenendo intatta la struttura dei tag.

---

<a id="riepilogo-del-modulo-2"></a>

## 📌 Riepilogo del Modulo 2

In questo modulo hai imparato:

- Che cos'è HTML e qual è il suo scopo (descrivere la struttura, non l'aspetto, di una pagina Web).
- Come è composto un tag e la differenza tra tag di apertura, contenuto e tag di chiusura.
- Cosa sono gli attributi e come si usano per arricchire un elemento con informazioni aggiuntive.
- Qual è la struttura minima obbligatoria di ogni documento HTML5.
- Come creare il tuo primo file `.html` e visualizzarlo con Live Server.
- Come organizzare correttamente le cartelle di un progetto Web.
- La differenza tra tag con contenuto e Void Elements.
- L'importanza dell'indentazione, dei commenti e della corretta nidificazione dei tag.
- I sei livelli di titolo (`<h1>`–`<h6>`) e la loro corretta gerarchia.
- Il tag paragrafo `<p>` e i tag di formattazione semantica del testo (`<strong>`, `<em>` e altri).

Nel prossimo modulo — **Modulo 3: Liste, Link e Immagini** — imparerai a strutturare elenchi di contenuti, a collegare tra loro le pagine del tuo sito con gli hyperlink e a inserire immagini in modo corretto e ottimizzato.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*