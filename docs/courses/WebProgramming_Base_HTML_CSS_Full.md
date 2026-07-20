# 🌐 Guida Completa al Web Programming Base

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Ottimizzata per Visual Studio Code · Aggiornata a HTML5 e CSS3 (2026)

---

# Come usare questa guida

Questa guida è stata progettata per accompagnare passo dopo passo lo studente nello studio delle principali tecnologie utilizzate per la realizzazione di siti Web moderni.

L'obiettivo non è soltanto imparare la sintassi di HTML e CSS, ma comprendere il funzionamento del Web e acquisire le corrette metodologie di sviluppo.

Ogni modulo contiene:

- spiegazione teorica;
- esempi completi;
- approfondimenti;
- esercizi suggeriti;
- best practice;
- errori comuni;
- riepilogo finale.

Per ottenere il massimo beneficio è consigliabile:

1. installare Visual Studio Code;
2. installare l'estensione **Live Server**;
3. creare una cartella dedicata agli esercizi;
4. riscrivere personalmente tutti gli esempi;
5. sperimentare modifiche al codice.

L'apprendimento della programmazione Web richiede pratica costante: leggere il codice non basta, è fondamentale scriverlo.

---

# Indice dei moduli

- [M0 — Introduzione al Web](#m0)
- [M1 — Come funziona Internet](#m1)
- [M2 — HTML: struttura di una pagina Web](#m2)
- [M3 — I primi tag HTML](#m3)
- [M4 — Titoli, paragrafi e formattazione del testo](#m4)
- [M5 — Liste](#m5)
- [M6 — Collegamenti ipertestuali](#m6)
- [M7 — Immagini](#m7)
- [M8 — Tabelle](#m8)
- [M9 — Form HTML](#m9)
- [M10 — HTML Semantico](#m10)
- [M11 — Introduzione ai CSS](#m11)
- [M12 — Selettori CSS](#m12)
- [M13 — Colori e sfondi](#m13)
- [M14 — Testo e font](#m14)
- [M15 — Il Box Model](#m15)
- [M16 — Margin, Padding e Border](#m16)
- [M17 — Display](#m17)
- [M18 — Flexbox](#m18)
- [M19 — CSS Grid](#m19)
- [M20 — Responsive Design](#m20)
- [M21 — Media Queries](#m21)
- [M22 — Progetto completo](#m22)
- [Appendice — Cheat Sheet HTML e CSS](#appendice)

---

<a id="m0"></a>

# M0 — Introduzione al Web

## 0.1 Che cos'è il Web

Quando utilizziamo un browser per visitare un sito Internet, inviare un messaggio o guardare un video su YouTube stiamo utilizzando una delle più grandi infrastrutture informatiche mai realizzate: il **World Wide Web**, comunemente chiamato semplicemente **Web**.

Il Web è un sistema di documenti collegati tra loro mediante collegamenti ipertestuali (hyperlink) e accessibili attraverso Internet.

È importante distinguere due concetti spesso confusi:

| Termine        | Significato                                                   |
| -------------- | ------------------------------------------------------------- |
| Internet       | Rete mondiale di computer collegati tra loro                  |
| World Wide Web | Servizio che permette la consultazione di pagine ipertestuali |

Internet rappresenta l'infrastruttura di comunicazione.

Il Web è uno dei servizi che utilizzano tale infrastruttura.

---

## 0.2 Una semplice analogia

Possiamo immaginare Internet come una gigantesca rete autostradale.

Le automobili che percorrono le strade rappresentano i dati.

Le città rappresentano i server.

Le abitazioni rappresentano gli utenti.

Il Web è invece il sistema che permette alle automobili di trasportare documenti da una città all'altra.

---

## 0.3 Breve storia del Web

Nel 1989 il ricercatore britannico **Tim Berners-Lee**, che lavorava presso il CERN di Ginevra, propose un sistema per condividere documenti scientifici attraverso Internet.

Nel 1991 pubblicò il primo sito Web della storia.

Da quel momento il Web ha conosciuto uno sviluppo straordinario.

Oggi miliardi di pagine vengono consultate quotidianamente.

---

## 0.4 Le tecnologie fondamentali del Web

Ogni sito Web moderno nasce dalla collaborazione di tre tecnologie principali.

| Tecnologia | Compito                             |
| ---------- | ----------------------------------- |
| HTML       | Definisce la struttura della pagina |
| CSS        | Definisce la grafica della pagina   |
| JavaScript | Definisce il comportamento dinamico |

Questa guida è dedicata ai primi due linguaggi.

JavaScript verrà affrontato successivamente.

---

## 0.5 Una metafora molto utilizzata

Per comprendere meglio il ruolo dei tre linguaggi immaginiamo di costruire una casa.

| Parte della casa                 | Tecnologia |
| -------------------------------- | ---------- |
| Muri e fondamenta                | HTML       |
| Pittura, mobili e arredamento    | CSS        |
| Impianto elettrico e automazioni | JavaScript |

HTML costruisce.

CSS abbellisce.

JavaScript rende la pagina intelligente.

---

## 0.6 HTML non è un linguaggio di programmazione

Uno degli errori più frequenti consiste nel considerare HTML un linguaggio di programmazione.

In realtà HTML è un **linguaggio di marcatura**.

La sua funzione consiste nel descrivere il contenuto di una pagina.

Con HTML possiamo definire:

- titoli;
- paragrafi;
- immagini;
- collegamenti;
- tabelle;
- moduli.

HTML non possiede:

- variabili;
- cicli;
- funzioni;
- condizioni;
- algoritmi.

---

## 0.7 CSS non è un linguaggio di programmazione

Anche CSS è un linguaggio dichiarativo.

Il suo scopo consiste nel descrivere come gli elementi HTML devono essere visualizzati.

Con CSS possiamo modificare:

- colori;
- caratteri;
- dimensioni;
- sfondi;
- bordi;
- animazioni;
- layout;
- responsive design.

---

## 0.8 Browser

Il browser è il programma che interpreta HTML, CSS e JavaScript.

I browser più diffusi sono:

| Browser         |
| --------------- |
| Google Chrome   |
| Microsoft Edge  |
| Mozilla Firefox |
| Safari          |
| Opera           |

Il browser legge il codice sorgente e genera la pagina visualizzata sul monitor.

---

## 0.9 Perché studiare HTML e CSS

HTML e CSS rappresentano ancora oggi il punto di partenza di qualsiasi sviluppatore Web.

Anche framework moderni come:

- React
- Angular
- Vue
- Next.js

generano comunque codice HTML e CSS.

Per questo motivo è fondamentale comprenderne il funzionamento prima di affrontare tecnologie più avanzate.

---

## Best Practice

✔ Imparare prima HTML.

✔ Successivamente studiare CSS.

✔ Solo dopo affrontare JavaScript.

✔ Non utilizzare strumenti visuali prima di conoscere il codice.

---

## Errori comuni

❌ Pensare che HTML sia un linguaggio di programmazione.

❌ Pensare che CSS serva soltanto a cambiare i colori.

❌ Copiare codice senza comprenderlo.

---

<a id="m1"></a>

# M1 — Come funziona Internet

## 1.1 Client e Server

Quando apriamo una pagina Web entrano in gioco due computer.

Il primo è il **Client**.

Il secondo è il **Server**.

Il Client richiede una pagina.

Il Server la invia.

```
+-----------------+
|     CLIENT      |
| (Browser Web)   |
+-----------------+
         |
         | Richiesta HTTP
         |
         V
+-----------------+
|     SERVER      |
|  Web Server     |
+-----------------+
         |
         | Risposta HTTP
         |
         V
+-----------------+
|     CLIENT      |
| Visualizza HTML |
+-----------------+
```

---

## 1.2 Il Browser

Il browser è un programma capace di:

- leggere HTML;
- interpretare CSS;
- eseguire JavaScript;
- mostrare la pagina.

Tra i browser più diffusi troviamo:

- Chrome;
- Edge;
- Firefox;
- Safari.

---

## 1.3 Il Web Server

Un Web Server è un computer sempre acceso che ospita i siti Internet.

Può contenere:

- pagine HTML;
- immagini;
- video;
- fogli di stile CSS;
- file JavaScript;
- documenti PDF.

Quando riceve una richiesta invia il file richiesto.

---

## 1.4 Indirizzo IP

Ogni dispositivo collegato ad Internet possiede un indirizzo numerico chiamato **IP Address**.

Esempio:

```
142.250.184.78
```

Memorizzare questi numeri sarebbe impossibile.

Per questo motivo vengono utilizzati i nomi di dominio.

---

## 1.5 DNS

Il DNS (Domain Name System) è un enorme archivio distribuito che traduce un nome di dominio nel corrispondente indirizzo IP.

Ad esempio:

```
www.google.it
```

diventa

```
142.250.184.78
```

Il DNS può essere paragonato ad una rubrica telefonica.

---

## 1.6 URL

Ogni pagina Web possiede un indirizzo chiamato URL.

Esempio:

```
https://www.gcprof-academy.com/corsi/html/index.html
```

Analizziamolo.

| Parte                  | Significato   |
| ---------------------- | ------------- |
| https                  | protocollo    |
| www.gcprof-academy.com | dominio       |
| corsi                  | cartella      |
| html                   | sottocartella |
| index.html             | pagina        |

---

## 1.7 HTTP e HTTPS

HTTP significa:

**HyperText Transfer Protocol**

HTTPS è la versione sicura del protocollo.

La lettera S indica:

Secure.

HTTPS utilizza la crittografia SSL/TLS per proteggere i dati trasmessi.

---

## 1.8 Hosting

Per essere visibile su Internet un sito deve essere ospitato su un server.

Questo servizio prende il nome di Hosting.

Alcuni servizi molto diffusi sono:

- GitHub Pages
- Vercel
- Netlify
- Aruba
- Register
- OVH

---

## 1.9 Il ciclo di una richiesta Web

Ogni volta che clicchiamo su un collegamento avvengono le seguenti operazioni:

```
Utente

↓

Browser

↓

DNS

↓

Server

↓

Invio pagina HTML

↓

Browser

↓

Visualizzazione
```

Tutto questo avviene normalmente in pochi millisecondi.

---

## Best Practice

✔ Utilizzare sempre HTTPS.

✔ Utilizzare nomi di dominio semplici.

✔ Organizzare correttamente il sito.

---

## Errori comuni

❌ Confondere Internet con il Web.

❌ Pensare che il browser contenga il sito.

❌ Confondere URL e dominio.

---

<a id="m2"></a>

# M2 — HTML: struttura di una pagina Web

## 2.1 Che cos'è HTML

HTML significa:

**HyperText Markup Language**

È il linguaggio utilizzato per descrivere la struttura di una pagina Web.

Ogni contenuto viene racchiuso all'interno di elementi chiamati **tag**.

---

## 2.2 I tag HTML

La maggior parte dei tag possiede:

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
- il testo rappresenta il contenuto.

---

## 2.3 Gli elementi HTML

Un elemento HTML è costituito dall'insieme di:

```
Tag di apertura

↓

Contenuto

↓

Tag di chiusura
```

---

## 2.4 Gli attributi

Molti tag possono possedere attributi.

Gli attributi forniscono informazioni aggiuntive.

Esempio:

```html
<a href="https://www.google.it"> Google </a>
```

L'attributo è:

```
href
```

Il valore è:

```
https://www.google.it
```

---

## 2.5 HTML5

La versione attuale del linguaggio è HTML5.

HTML5 introduce numerosi nuovi elementi semantici.

Tra questi:

- header
- nav
- section
- article
- aside
- footer

Li studieremo nei moduli successivi.

---

## 2.6 La struttura minima di una pagina HTML

Ogni documento HTML deve possedere una struttura di base.

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

Questa rappresenta la struttura minima dalla quale partiremo per tutti gli esercizi.

---

## 2.7 Analizziamo il documento

| Elemento        | Significato                              |
| --------------- | ---------------------------------------- |
| <!DOCTYPE html> | indica HTML5                             |
| html            | elemento principale                      |
| head            | contiene informazioni sulla pagina       |
| body            | contiene il contenuto visibile           |
| title           | titolo mostrato nella scheda del browser |
| meta            | informazioni aggiuntive                  |

---

## 2.8 Come creare il primo file

1. Creare una cartella chiamata:

```
web-programming
```

2. Aprirla con Visual Studio Code.

3. Creare un nuovo file.

```
index.html
```

4. Scrivere il codice precedente.

5. Salvare.

6. Avviare Live Server.

La prima pagina Web è pronta.

---

## 2.9 Organizzazione del progetto

Una buona organizzazione delle cartelle facilita enormemente lo sviluppo.

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

Nel corso utilizzeremo sempre questa struttura.

---

## Best Practice

✔ Utilizzare sempre HTML5.

✔ Mantenere il codice indentato.

✔ Utilizzare nomi significativi.

✔ Separare HTML, CSS e immagini.

---

## Errori comuni

❌ Salvare il file come `.txt`.

❌ Dimenticare `<!DOCTYPE html>`.

❌ Dimenticare il tag `body`.

❌ Scrivere codice senza indentazione.

❌ Inserire CSS direttamente nel file HTML quando non necessario.

---

<a id="m3"></a>

# M3 — I primi tag HTML

## 3.1 Che cos'è un tag

Come abbiamo visto nel modulo precedente, HTML utilizza particolari elementi chiamati **tag** per descrivere il contenuto della pagina.

Ogni tag comunica al browser il significato del contenuto racchiuso al suo interno.

Ad esempio, il browser sa che un elemento racchiuso nel tag `<h1>` rappresenta un titolo principale, mentre un elemento racchiuso nel tag `<p>` rappresenta un paragrafo.

Questa distinzione è fondamentale perché permette ai browser, ai motori di ricerca e alle tecnologie assistive di comprendere la struttura del documento.

---

## 3.2 Anatomia di un tag

La maggior parte dei tag HTML possiede la seguente struttura:

```html
<tag>
    contenuto
</tag>
```

Possiamo distinguere tre parti fondamentali.

| Parte | Descrizione |
|--------|-------------|
| `<tag>` | Tag di apertura |
| Contenuto | Informazione da visualizzare |
| `</tag>` | Tag di chiusura |

Ad esempio:

```html
<p>Benvenuti nel corso di Web Programming.</p>
```

---

## 3.3 Tag con contenuto

I tag più comuni possiedono un'apertura e una chiusura.

Esempi:

```html
<h1>Corso HTML</h1>

<p>Questo è un paragrafo.</p>

<strong>Testo importante</strong>

<em>Testo enfatizzato</em>
```

---

## 3.4 Tag senza chiusura

Alcuni elementi HTML non contengono testo e sono costituiti esclusivamente dal tag di apertura.

Questi elementi vengono chiamati **Void Elements**.

I più utilizzati sono:

| Tag | Descrizione |
|------|-------------|
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

---

## 3.5 L'indentazione

L'indentazione consiste nello spostare verso destra gli elementi figli.

Non modifica il funzionamento della pagina.

Serve esclusivamente a rendere il codice più leggibile.

Codice corretto:

```html
<body>

    <h1>Benvenuti</h1>

    <p>Primo paragrafo.</p>

</body>
```

Codice scorretto:

```html
<body>
<h1>Benvenuti</h1>
<p>Primo paragrafo.</p>
</body>
```

Entrambi funzionano, ma il primo è molto più leggibile.

---

## 3.6 I commenti HTML

Come in tutti i linguaggi, anche HTML permette di inserire commenti.

I commenti non vengono visualizzati nella pagina.

Servono per documentare il codice.

Sintassi:

```html
<!-- Questo è un commento -->
```

Esempio:

```html
<body>

    <!-- Titolo principale -->

    <h1>Corso HTML</h1>

    <!-- Primo paragrafo -->

    <p>Benvenuti.</p>

</body>
```

---

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

---

## 3.8 Nidificazione dei tag

I tag possono essere inseriti uno dentro l'altro.

Questo prende il nome di **nidificazione**.

Esempio corretto:

```html
<p>

Questo testo contiene una parola

<strong>molto importante</strong>

per il lettore.

</p>
```

Il browser interpreterà correttamente il codice.

---

## 3.9 Nidificazione errata

L'ordine di apertura e chiusura deve sempre essere rispettato.

Errore:

```html
<p>

<strong>

Testo

</p>

</strong>
```

Corretto:

```html
<p>

<strong>

Testo

</strong>

</p>
```

---

## Best Practice

✔ Chiudere sempre i tag.

✔ Utilizzare l'indentazione.

✔ Inserire commenti nelle pagine complesse.

✔ Mantenere il codice ordinato.

---

## Errori comuni

❌ Tag non chiusi.

❌ Indentazione assente.

❌ Tag chiusi nell'ordine sbagliato.

❌ Commenti inseriti in modo errato.

---

<a id="m4"></a>

# M4 — Titoli, paragrafi e formattazione del testo

## 4.1 I titoli

HTML mette a disposizione sei livelli di titolo.

Essi sono:

- h1
- h2
- h3
- h4
- h5
- h6

Il numero indica il livello gerarchico.

Il tag `<h1>` rappresenta il titolo più importante.

Il tag `<h6>` il meno importante.

---

## 4.2 Utilizzo dei titoli

```html
<h1>Corso HTML</h1>

<h2>Introduzione</h2>

<h3>Cos'è HTML</h3>

<h4>Storia</h4>

<h5>Approfondimento</h5>

<h6>Nota</h6>
```

Il browser applica automaticamente dimensioni differenti.

---

## 4.3 Gerarchia dei titoli

Una pagina dovrebbe avere un solo `<h1>`.

Successivamente si utilizzano:

```
H1

↓

H2

↓

H3

↓

H4
```

Saltare continuamente da H1 a H5 rende difficile comprendere la struttura del documento.

---

## 4.4 Il paragrafo

Il tag utilizzato per rappresentare un paragrafo è:

```html
<p>
```

Esempio:

```html
<p>

HTML è il linguaggio utilizzato per descrivere la struttura delle pagine Web.

</p>
```

Ogni paragrafo viene separato automaticamente dagli altri.

---

## 4.5 Il tag `<br>`

Il tag `<br>` permette di andare a capo.

Esempio:

```html
<p>

Prima riga.<br>

Seconda riga.<br>

Terza riga.

</p>
```

Attenzione:

`<br>` non deve essere utilizzato per creare spazio verticale tra paragrafi.

Per quello utilizzeremo CSS.

---

## 4.6 Il tag `<hr>`

Permette di inserire una linea orizzontale.

Esempio:

```html
<h2>Capitolo 1</h2>

<hr>

<p>Testo...</p>
```

---

## 4.7 Testo importante

Per evidenziare parti importanti utilizziamo:

```html
<strong>
```

Esempio:

```html
<p>

Studiare HTML è

<strong>fondamentale</strong>

per diventare sviluppatori Web.

</p>
```

Normalmente il browser visualizza il testo in grassetto.

---

## 4.8 Testo enfatizzato

Per enfatizzare una parte del testo utilizziamo:

```html
<em>
```

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

## 4.9 Altri tag di formattazione

| Tag | Significato |
|------|-------------|
| `<strong>` | Importanza |
| `<em>` | Enfasi |
| `<mark>` | Evidenziato |
| `<small>` | Testo piccolo |
| `<del>` | Testo eliminato |
| `<ins>` | Testo inserito |
| `<sub>` | Pedice |
| `<sup>` | Apice |

---

## 4.10 Esempio completo

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Esempio</title>

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

---

## Best Practice

✔ Utilizzare un solo H1.

✔ Utilizzare i titoli in ordine gerarchico.

✔ Utilizzare `<strong>` per il significato e non per ottenere il grassetto.

✔ Utilizzare `<em>` per l'enfasi.

✔ Utilizzare `<br>` soltanto quando realmente necessario.

---

## Errori comuni

❌ Utilizzare molti H1.

❌ Saltare continuamente da H1 a H5.

❌ Utilizzare `<br>` per creare spazi.

❌ Utilizzare `<strong>` soltanto per motivi estetici.

---

<a id="m5"></a>

# M5 — Le liste

## 5.1 Perché utilizzare le liste

Le liste permettono di organizzare le informazioni in maniera ordinata e facilmente leggibile.

HTML mette a disposizione tre tipologie di liste:

- liste non ordinate;
- liste ordinate;
- liste di definizione.

---

## 5.2 Liste non ordinate

Le liste non ordinate utilizzano il tag:

```html
<ul>
```

Ogni elemento viene inserito mediante:

```html
<li>
```

Esempio:

```html
<ul>

<li>HTML</li>

<li>CSS</li>

<li>JavaScript</li>

</ul>
```

Il browser visualizza un elenco puntato.

---

## 5.3 Liste ordinate

Quando è importante mantenere una sequenza si utilizza il tag:

```html
<ol>
```

Esempio:

```html
<ol>

<li>Aprire Visual Studio Code.</li>

<li>Creare index.html.</li>

<li>Scrivere il codice.</li>

<li>Salvare.</li>

</ol>
```

Il browser numererà automaticamente gli elementi.

---

## 5.4 Elementi della lista

Ogni elemento viene rappresentato dal tag:

```html
<li>
```

Non importa se la lista è ordinata o non ordinata.

Gli elementi vengono sempre creati mediante `<li>`.

---

## 5.5 Liste annidate

È possibile inserire una lista all'interno di un'altra.

Esempio:

```html
<ul>

<li>

Programmazione

<ul>

<li>HTML</li>

<li>CSS</li>

<li>JavaScript</li>

</ul>

</li>

<li>Database</li>

</ul>
```

Le liste annidate vengono spesso utilizzate per rappresentare menu e strutture gerarchiche.

---

## 5.6 Liste di definizione

Le liste di definizione vengono utilizzate per rappresentare termini e relative definizioni.

Tag utilizzati:

| Tag | Descrizione |
|------|-------------|
| `<dl>` | Lista di definizione |
| `<dt>` | Termine |
| `<dd>` | Definizione |

Esempio:

```html
<dl>

<dt>HTML</dt>

<dd>Linguaggio di marcatura.</dd>

<dt>CSS</dt>

<dd>Foglio di stile.</dd>

</dl>
```

---

## 5.7 Esempio completo

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Liste HTML</title>

</head>

<body>

<h1>Tecnologie Web</h1>

<ul>

<li>HTML</li>

<li>CSS</li>

<li>JavaScript</li>

</ul>

<h2>Ordine di studio</h2>

<ol>

<li>HTML</li>

<li>CSS</li>

<li>JavaScript</li>

</ol>

</body>

</html>
```

---

## Best Practice

✔ Utilizzare le liste quando gli elementi sono correlati.

✔ Preferire le liste ordinate per rappresentare procedure.

✔ Utilizzare le liste annidate solo quando necessario.

---

## Errori comuni

❌ Inserire testo direttamente dentro `<ul>`.

❌ Dimenticare il tag `<li>`.

❌ Utilizzare liste per creare impaginazioni.

---

<a id="m6"></a>

# M6 — Collegamenti ipertestuali (Hyperlink)

## 6.1 Che cos'è un collegamento ipertestuale

Una delle caratteristiche fondamentali del Web è la possibilità di collegare tra loro documenti differenti.

Questi collegamenti prendono il nome di **Hyperlink** oppure semplicemente **Link**.

Quando l'utente fa clic su un collegamento, il browser richiede una nuova risorsa al server e la visualizza.

L'elemento HTML utilizzato per creare un collegamento è:

```html
<a>
```

La lettera **a** deriva dalla parola inglese **anchor** (ancora).

---

## 6.2 Il tag `<a>`

La sintassi generale è la seguente.

```html
<a href="destinazione">
    Testo del collegamento
</a>
```

L'attributo fondamentale è:

```text
href
```

che indica la destinazione del collegamento.

---

## 6.3 Collegamento ad un sito Web

Esempio:

```html
<a href="https://www.google.it">
    Vai su Google
</a>
```

Visualizzazione:

```
Vai su Google
```

Facendo clic sul testo il browser aprirà il sito indicato.

---

## 6.4 Collegamento ad una pagina interna

Supponiamo di avere la seguente struttura.

```
sito/

│

├── index.html

├── contatti.html

└── chi-siamo.html
```

Da **index.html** possiamo collegare la pagina **contatti.html**.

```html
<a href="contatti.html">
    Contatti
</a>
```

---

## 6.5 Percorsi relativi

Quando il file si trova nella stessa cartella è sufficiente indicarne il nome.

```html
<a href="pagina.html">
```

Se invece si trova in una sottocartella:

```
sito/

│

├── index.html

└── pagine/

      contatti.html
```

scriveremo:

```html
<a href="pagine/contatti.html">
```

---

## 6.6 Tornare alla cartella precedente

Per tornare alla cartella superiore utilizziamo:

```text
..
```

Esempio.

```
sito/

│

├── index.html

└── pagine/

      contatti.html
```

Dal file **contatti.html** possiamo tornare alla home.

```html
<a href="../index.html">
    Home
</a>
```

---

## 6.7 Percorsi assoluti

I percorsi assoluti iniziano con:

```
https://
```

Esempio:

```html
<a href="https://www.wikipedia.org">
Wikipedia
</a>
```

---

## 6.8 Aprire una nuova scheda

L'attributo:

```text
target
```

permette di scegliere dove aprire il collegamento.

Nuova scheda:

```html
<a href="https://www.google.it"
   target="_blank">

Google

</a>
```

---

## 6.9 Sicurezza dei link esterni

Quando utilizziamo:

```html
target="_blank"
```

è buona norma aggiungere anche:

```html
rel="noopener noreferrer"
```

Esempio completo.

```html
<a href="https://www.google.it"

target="_blank"

rel="noopener noreferrer">

Google

</a>
```

---

## 6.10 Collegamento ad una e-mail

Possiamo aprire automaticamente il programma di posta elettronica.

```html
<a href="mailto:info@gcprof-academy.com">

Scrivici

</a>
```

---

## 6.11 Collegamento telefonico

Molto utilizzato nei siti responsive.

```html
<a href="tel:+390612345678">

Chiama

</a>
```

---

## 6.12 Collegamento ad un file

È possibile scaricare un documento.

```html
<a href="documenti/regolamento.pdf">

Scarica il regolamento

</a>
```

---

## 6.13 Il pulsante Download

L'attributo:

```text
download
```

suggerisce al browser di scaricare il file.

```html
<a href="dispensa.pdf"

download>

Scarica PDF

</a>
```

---

## 6.14 Link all'interno della stessa pagina

È possibile creare collegamenti interni.

Si assegna un identificatore.

```html
<h2 id="capitolo1">

Introduzione

</h2>
```

Successivamente:

```html
<a href="#capitolo1">

Vai all'introduzione

</a>
```

---

## 6.15 Esempio completo

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Link HTML</title>

</head>

<body>

<h1>I miei collegamenti</h1>

<p>

<a href="https://www.google.it">

Google

</a>

</p>

<p>

<a href="contatti.html">

Pagina Contatti

</a>

</p>

<p>

<a href="mailto:info@gcprof-academy.com">

Invia una mail

</a>

</p>

</body>

</html>
```

---

## Best Practice

✔ Utilizzare testi significativi.

✔ Evitare "clicca qui".

✔ Utilizzare `target="_blank"` solo per siti esterni.

✔ Utilizzare percorsi relativi per pagine interne.

---

## Errori comuni

❌ Dimenticare `href`.

❌ Utilizzare URL sbagliati.

❌ Aprire tutto in nuove schede.

❌ Utilizzare spazi nei nomi dei file.

---

<a id="m7"></a>

# M7 — Inserire immagini

## 7.1 Perché utilizzare le immagini

Le immagini migliorano la comprensione dei contenuti e rendono il sito più gradevole.

HTML utilizza il tag:

```html
<img>
```

---

## 7.2 Il tag `<img>`

Sintassi generale.

```html
<img

src="immagine.jpg"

alt="Descrizione immagine">
```

Il tag `<img>` non possiede il tag di chiusura.

---

## 7.3 L'attributo `src`

L'attributo:

```text
src
```

indica dove si trova il file.

Esempio.

```html
<img src="logo.png">
```

---

## 7.4 L'attributo `alt`

È uno degli attributi più importanti.

```html
<img

src="logo.png"

alt="Logo della scuola">
```

Il testo alternativo viene utilizzato:

- dagli screen reader;
- quando l'immagine non viene caricata;
- dai motori di ricerca.

---

## 7.5 Dimensioni dell'immagine

Possiamo specificare larghezza e altezza.

```html
<img

src="logo.png"

width="300"

height="200">
```

---

## 7.6 Cartella immagini

È buona norma creare una cartella dedicata.

```
progetto/

│

├── index.html

└── images/

      logo.png
```

Il codice diventa.

```html
<img

src="images/logo.png"

alt="Logo">
```

---

## 7.7 Formati più comuni

| Formato | Utilizzo |
|----------|----------|
| JPG | Fotografie |
| PNG | Immagini con trasparenza |
| SVG | Loghi e icone |
| WebP | Immagini ottimizzate per il Web |
| GIF | Animazioni semplici |

---

## 7.8 Immagini esterne

È possibile utilizzare immagini presenti online.

```html
<img

src="https://example.com/logo.png"

alt="Logo">
```

Tuttavia è preferibile utilizzare immagini ospitate nel proprio sito.

---

## 7.9 Didascalie

HTML5 introduce gli elementi:

```html
<figure>

<figcaption>
```

Esempio.

```html
<figure>

<img

src="images/laboratorio.jpg"

alt="Laboratorio">

<figcaption>

Laboratorio di Informatica

</figcaption>

</figure>
```

---

## 7.10 Esempio completo

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Immagini</title>

</head>

<body>

<h1>La nostra scuola</h1>

<figure>

<img

src="images/scuola.jpg"

alt="Edificio scolastico"

width="500">

<figcaption>

Ingresso principale

</figcaption>

</figure>

</body>

</html>
```

---

## Best Practice

✔ Utilizzare sempre `alt`.

✔ Ridurre il peso delle immagini.

✔ Organizzare tutte le immagini nella cartella `images`.

✔ Preferire WebP quando possibile.

---

## Errori comuni

❌ Dimenticare `alt`.

❌ Inserire immagini enormi.

❌ Utilizzare spazi nel nome del file.

❌ Salvare immagini direttamente nella cartella principale.

---

<a id="m8"></a>

# M8 — Tabelle HTML

## 8.1 Quando utilizzare una tabella

Le tabelle servono a rappresentare dati organizzati in righe e colonne.

Non devono essere utilizzate per impaginare una pagina Web.

---

## 8.2 Struttura di una tabella

Gli elementi principali sono:

| Tag | Descrizione |
|------|-------------|
| `<table>` | Tabella |
| `<tr>` | Riga |
| `<th>` | Intestazione |
| `<td>` | Cella |

---

## 8.3 Prima tabella

```html
<table>

<tr>

<th>Nome</th>

<th>Età</th>

</tr>

<tr>

<td>Mario</td>

<td>18</td>

</tr>

</table>
```

---

## 8.4 Intestazioni

Le intestazioni vengono create con:

```html
<th>
```

Il browser normalmente le visualizza in grassetto.

---

## 8.5 Celle

Le celle vengono create con:

```html
<td>
```

Ogni riga può contenere un numero qualsiasi di celle.

---

## 8.6 Didascalia della tabella

Possiamo aggiungere un titolo.

```html
<table>

<caption>

Studenti classe 2A

</caption>

...
```

---

## 8.7 Unire colonne

L'attributo:

```text
colspan
```

permette di unire più colonne.

```html
<td colspan="2">

Totale

</td>
```

---

## 8.8 Unire righe

L'attributo:

```text
rowspan
```

permette di unire più righe.

```html
<td rowspan="2">

Laboratorio

</td>
```

---

## 8.9 Esempio completo

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Tabelle</title>

</head>

<body>

<h1>Voti</h1>

<table>

<caption>

Primo Quadrimestre

</caption>

<tr>

<th>Studente</th>

<th>Informatica</th>

<th>Matematica</th>

</tr>

<tr>

<td>Mario</td>

<td>8</td>

<td>7</td>

</tr>

<tr>

<td>Anna</td>

<td>9</td>

<td>8</td>

</tr>

</table>

</body>

</html>
```

---

## 8.10 Struttura avanzata delle tabelle

HTML5 introduce tre sezioni logiche.

```html
<thead>

<tbody>

<tfoot>
```

Questa suddivisione migliora l'organizzazione del codice.

---

## Best Practice

✔ Utilizzare le tabelle solo per dati tabellari.

✔ Inserire sempre le intestazioni.

✔ Utilizzare `<caption>`.

✔ Mantenere tutte le righe della stessa lunghezza.

---

## Errori comuni

❌ Utilizzare tabelle per impaginare il sito.

❌ Dimenticare `<th>`.

❌ Utilizzare celle con numero differente di colonne.

❌ Inserire testo senza utilizzare `<td>`.

---

# Mini Progetto 1 — Curriculum scolastico

Realizzare una pagina HTML denominata `index.html` contenente:

- un titolo principale;
- un breve paragrafo di presentazione;
- una fotografia;
- un elenco puntato dei propri hobby;
- un elenco numerato delle materie preferite;
- una tabella con almeno cinque materie scolastiche e il numero di ore settimanali;
- un collegamento al sito della scuola;
- un collegamento ad una seconda pagina denominata `contatti.html`.

L'obiettivo del progetto è utilizzare tutti gli elementi HTML studiati finora in un'unica pagina.

---

<a id="m9"></a>

# M9 — I Form HTML

## 9.1 Introduzione

Fino a questo momento abbiamo imparato a creare pagine Web che mostrano informazioni.

Molto spesso, però, un sito Web deve anche **ricevere informazioni dall'utente**.

Pensiamo ad esempio a:

- una pagina di login;
- un modulo di registrazione;
- un motore di ricerca;
- una richiesta di informazioni;
- un questionario;
- un ordine online.

Per raccogliere dati si utilizzano i **Form HTML**.

Un form rappresenta un contenitore all'interno del quale vengono inseriti uno o più controlli (campi di input).

---

## 9.2 Il tag `<form>`

Ogni modulo inizia con il tag:

```html
<form>
```

Struttura minima:

```html
<form>

</form>
```

Tutti gli elementi che permettono l'inserimento dei dati devono trovarsi all'interno del form.

---

## 9.3 Gli attributi principali del form

Il tag `<form>` possiede numerosi attributi.

I più importanti sono:

| Attributo | Significato |
|-----------|-------------|
| action | Pagina che riceverà i dati |
| method | Metodo di invio |
| autocomplete | Attiva/disattiva il completamento automatico |
| enctype | Tipo di codifica dei dati |

Esempio:

```html
<form

action="registrazione.php"

method="post">

</form>
```

---

## 9.4 L'attributo `action`

L'attributo `action` indica dove devono essere inviati i dati.

```html
<form

action="contatti.php">

</form>
```

Quando l'utente premerà il pulsante di invio, il browser trasmetterà tutti i dati alla pagina indicata.

---

## 9.5 L'attributo `method`

I due metodi principali sono:

| Metodo | Utilizzo |
|---------|----------|
| GET | Dati visibili nell'URL |
| POST | Dati inviati nel corpo della richiesta |

Esempio GET:

```html
<form

action="ricerca.php"

method="get">
```

Esempio POST:

```html
<form

action="login.php"

method="post">
```

Per password e dati sensibili si utilizza normalmente **POST**.

---

## 9.6 Il controllo `<input>`

L'elemento più importante di un form è:

```html
<input>
```

Questo elemento può assumere molti comportamenti differenti grazie all'attributo:

```text
type
```

---

## 9.7 Campo di testo

```html
<input

type="text">
```

Visualizza una casella nella quale l'utente può digitare del testo.

---

## 9.8 Placeholder

Il placeholder suggerisce cosa inserire.

```html
<input

type="text"

placeholder="Inserisci il tuo nome">
```

Il testo scompare automaticamente quando l'utente inizia a scrivere.

---

## 9.9 Campo password

```html
<input

type="password">
```

I caratteri digitati vengono nascosti.

---

## 9.10 Campo e-mail

```html
<input

type="email">
```

Il browser verifica automaticamente che l'indirizzo inserito abbia un formato valido.

---

## 9.11 Campo numerico

```html
<input

type="number">
```

Possiamo limitare i valori.

```html
<input

type="number"

min="1"

max="100">
```

---

## 9.12 Campo data

```html
<input

type="date">
```

Il browser mostra automaticamente un calendario.

---

## 9.13 Campo ora

```html
<input

type="time">
```

---

## 9.14 Campo colore

```html
<input

type="color">
```

Viene aperto un selettore di colori.

---

## 9.15 Campo file

```html
<input

type="file">
```

Permette di selezionare un file dal computer.

---

## 9.16 Campo nascosto

```html
<input

type="hidden"

value="123">
```

Non viene visualizzato ma viene inviato al server.

---

## 9.17 Casella di controllo (Checkbox)

```html
<input

type="checkbox">
```

L'utente può selezionare più opzioni contemporaneamente.

Esempio:

```html
<input type="checkbox">

HTML

<br>

<input type="checkbox">

CSS

<br>

<input type="checkbox">

JavaScript
```

---

## 9.18 Pulsanti di scelta (Radio Button)

```html
<input

type="radio">
```

A differenza delle checkbox, è possibile scegliere una sola opzione.

```html
<input

type="radio"

name="sesso">

Maschio

<br>

<input

type="radio"

name="sesso">

Femmina
```

L'attributo `name` deve essere uguale per tutti i pulsanti appartenenti allo stesso gruppo.

---

## 9.19 Pulsante di invio

```html
<input

type="submit"

value="Invia">
```

Premendo il pulsante il browser invia i dati.

---

## 9.20 Pulsante di reset

```html
<input

type="reset"

value="Cancella">
```

Ripristina tutti i campi del form.

---

## 9.21 Il tag `<label>`

Ogni campo dovrebbe essere accompagnato da una descrizione.

```html
<label>

Nome

</label>

<input

type="text">
```

Versione consigliata:

```html
<label for="nome">

Nome

</label>

<input

id="nome"

type="text">
```

---

## 9.22 Il tag `<textarea>`

Serve per inserire testi lunghi.

```html
<textarea>

</textarea>
```

Esempio:

```html
<textarea

rows="6"

cols="40">

</textarea>
```

---

## 9.23 Menu a tendina

Il tag utilizzato è:

```html
<select>
```

Gli elementi vengono definiti mediante:

```html
<option>
```

Esempio:

```html
<select>

<option>Prima</option>

<option>Seconda</option>

<option>Terza</option>

</select>
```

---

## 9.24 Gruppi di opzioni

È possibile raggruppare le opzioni.

```html
<select>

<optgroup label="Biennio">

<option>Prima</option>

<option>Seconda</option>

</optgroup>

<optgroup label="Triennio">

<option>Terza</option>

<option>Quarta</option>

<option>Quinta</option>

</optgroup>

</select>
```

---

## 9.25 Campo obbligatorio

L'attributo:

```text
required
```

obbliga l'utente a compilare il campo.

```html
<input

type="email"

required>
```

---

## 9.26 Valore iniziale

```html
<input

type="text"

value="Mario Rossi">
```

---

## 9.27 Campo disabilitato

```html
<input

type="text"

disabled>
```

---

## 9.28 Campo in sola lettura

```html
<input

type="text"

readonly>
```

---

## 9.29 Esempio completo

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Modulo di registrazione</title>

</head>

<body>

<h1>Registrazione</h1>

<form

action="#"

method="post">

<label for="nome">

Nome

</label>

<br>

<input

id="nome"

type="text"

required>

<br><br>

<label for="email">

E-mail

</label>

<br>

<input

id="email"

type="email"

required>

<br><br>

<label for="password">

Password

</label>

<br>

<input

id="password"

type="password"

required>

<br><br>

<label>

Classe

</label>

<br>

<select>

<option>1A</option>

<option>2A</option>

<option>3A</option>

<option>4A</option>

<option>5A</option>

</select>

<br><br>

<label>

Note

</label>

<br>

<textarea

rows="6"

cols="40">

</textarea>

<br><br>

<input

type="submit"

value="Registrati">

<input

type="reset"

value="Cancella">

</form>

</body>

</html>
```

---

## Best Practice

✔ Associare sempre una `<label>` ad ogni controllo.

✔ Utilizzare `required` quando necessario.

✔ Utilizzare il tipo di input corretto.

✔ Utilizzare `POST` per dati sensibili.

✔ Scrivere placeholder chiari.

---

## Errori comuni

❌ Utilizzare sempre `type="text"`.

❌ Dimenticare il tag `<form>`.

❌ Non inserire etichette.

❌ Utilizzare GET per password.

❌ Non validare i dati.

---

## 9.30 Validazione automatica dei Form

Uno dei grandi vantaggi di HTML5 consiste nella possibilità di effettuare una prima validazione dei dati direttamente nel browser.

Questa validazione avviene prima dell'invio del modulo e permette di intercettare molti errori senza utilizzare JavaScript.

Ad esempio, se un campo e-mail contiene un valore non valido, il browser mostrerà automaticamente un messaggio di errore.

```html
<input
    type="email"
    required>
```

Se l'utente scrive:

```
mario.rossi
```

il browser impedirà l'invio del modulo.

---

## 9.31 L'attributo `required`

L'attributo `required` indica che un campo è obbligatorio.

```html
<input
    type="text"
    required>
```

Se il campo viene lasciato vuoto il browser mostrerà un messaggio simile a:

```
Compila questo campo.
```

---

## 9.32 Lunghezza minima

Possiamo imporre una lunghezza minima.

```html
<input
    type="password"
    minlength="8">
```

L'utente dovrà inserire almeno otto caratteri.

---

## 9.33 Lunghezza massima

```html
<input
    type="text"
    maxlength="30">
```

Il browser impedirà l'inserimento di ulteriori caratteri.

---

## 9.34 Pattern

L'attributo `pattern` permette di definire un'espressione regolare.

Esempio.

```html
<input

type="text"

pattern="[A-Za-z]{3,20}">
```

In questo caso saranno accettate soltanto lettere.

---

## 9.35 Campo URL

```html
<input
    type="url">
```

Il browser controllerà che il testo inserito rappresenti un URL valido.

Esempio corretto:

```
https://www.gcprof-academy.com
```

---

## 9.36 Campo telefono

```html
<input
    type="tel">
```

HTML non verifica automaticamente il formato del numero telefonico.

Se necessario è possibile utilizzare anche l'attributo `pattern`.

---

## 9.37 Campo ricerca

```html
<input
    type="search">
```

È un normale campo di testo ottimizzato per le ricerche.

Molti browser visualizzano automaticamente un pulsante per cancellare rapidamente il contenuto.

---

## 9.38 Campo Range

Permette di selezionare un valore mediante un cursore.

```html
<input
    type="range"
    min="0"
    max="100">
```

Esempio.

```
0 ------------------------ 100
             ▲
```

---

## 9.39 Campo Month

```html
<input
    type="month">
```

Permette di scegliere mese ed anno.

---

## 9.40 Campo Week

```html
<input
    type="week">
```

Permette di selezionare una settimana dell'anno.

---

## 9.41 Campo DateTime Local

```html
<input
    type="datetime-local">
```

Consente di scegliere contemporaneamente data e ora.

---

## 9.42 Campo Hidden

Un campo nascosto viene inviato al server ma non viene visualizzato.

```html
<input

type="hidden"

name="id"

value="125">
```

Viene spesso utilizzato per memorizzare identificativi interni.

---

## 9.43 Attributo `name`

Ogni controllo dovrebbe possedere un nome.

```html
<input

type="text"

name="nome">
```

Quando il form viene inviato, il server riceverà:

```
nome=Mario
```

Senza l'attributo `name` il valore non verrà inviato.

---

## 9.44 Attributo `id`

L'attributo `id` identifica in modo univoco un elemento.

```html
<input

id="email"

type="email">
```

L'identificatore viene utilizzato da:

- label;
- CSS;
- JavaScript.

---

## 9.45 Differenza tra `id` e `name`

È importante non confondere questi due attributi.

| Attributo | Utilizzo |
|-----------|----------|
| id | Identifica l'elemento nella pagina |
| name | Nome del dato inviato al server |

Molto spesso hanno lo stesso valore.

```html
<input

id="email"

name="email"

type="email">
```

---

## 9.46 Il tag `<fieldset>`

Quando un modulo contiene molte informazioni è consigliabile raggrupparle.

Per questo esiste il tag:

```html
<fieldset>
```

Esempio.

```html
<fieldset>

</fieldset>
```

---

## 9.47 Il tag `<legend>`

Il tag `<legend>` assegna un titolo al gruppo.

```html
<fieldset>

<legend>

Dati personali

</legend>

...

</fieldset>
```

Visualizzazione.

```
+------------------------------------+

 Dati personali

 Nome

 Cognome

 E-mail

+------------------------------------+
```

---

## 9.48 Il tag `<datalist>`

HTML permette di suggerire alcuni valori.

```html
<input

list="classi">
```

```html
<datalist

id="classi">

<option value="1A">

<option value="2A">

<option value="3A">

<option value="4A">

<option value="5A">

</datalist>
```

L'utente può scegliere uno dei valori suggeriti oppure inserirne uno nuovo.

---

## 9.49 Esempio professionale

```html
<form

action="#"

method="post">

<fieldset>

<legend>

Registrazione Studente

</legend>

<label for="nome">

Nome

</label>

<br>

<input

id="nome"

name="nome"

type="text"

required>

<br><br>

<label for="cognome">

Cognome

</label>

<br>

<input

id="cognome"

name="cognome"

type="text"

required>

<br><br>

<label for="email">

E-mail

</label>

<br>

<input

id="email"

name="email"

type="email"

required>

<br><br>

<label for="classe">

Classe

</label>

<br>

<input

id="classe"

list="classi"

name="classe">

<datalist

id="classi">

<option value="1A">

<option value="2A">

<option value="3A">

<option value="4A">

<option value="5A">

</datalist>

<br><br>

<label>

Osservazioni

</label>

<br>

<textarea

rows="5"

cols="40"

name="note">

</textarea>

<br><br>

<input

type="submit"

value="Invia iscrizione">

</fieldset>

</form>
```

---

## 9.50 Riepilogo dei principali controlli

| Controllo | Tag |
|------------|-----|
| Testo | input type="text" |
| Password | input type="password" |
| Email | input type="email" |
| Numero | input type="number" |
| Data | input type="date" |
| Ora | input type="time" |
| Ricerca | input type="search" |
| Telefono | input type="tel" |
| URL | input type="url" |
| Range | input type="range" |
| Checkbox | input type="checkbox" |
| Radio | input type="radio" |
| Menu | select |
| Testo lungo | textarea |
| Pulsante | input type="submit" |

---

## Approfondimento

HTML è in grado di verificare automaticamente molti errori comuni.

Tuttavia questa validazione **non sostituisce** quella effettuata dal server.

Un utente esperto potrebbe infatti modificare il codice HTML o inviare direttamente richieste HTTP, aggirando i controlli del browser.

Per questo motivo qualsiasi applicazione Web professionale effettua sempre una doppia validazione:

1. Validazione lato client (HTML5 e JavaScript).
2. Validazione lato server (PHP, Node.js, Python, Java, ASP.NET, ecc.).

Questa doppia verifica aumenta la sicurezza dell'applicazione e garantisce l'integrità dei dati memorizzati.

---

## Best Practice

✔ Utilizzare sempre l'attributo `name`.

✔ Associare ogni campo ad una `label`.

✔ Raggruppare i campi mediante `fieldset`.

✔ Utilizzare `required` solo quando realmente necessario.

✔ Scegliere il tipo di input più appropriato.

✔ Validare sempre anche sul server.

---

## Errori comuni

❌ Dimenticare l'attributo `name`.

❌ Utilizzare solo `text` per tutti i campi.

❌ Non utilizzare `label`.

❌ Utilizzare `GET` per password.

❌ Affidarsi esclusivamente alla validazione HTML.

---

# Mini Progetto 2 — Modulo di Iscrizione

Realizzare un modulo di iscrizione composto dai seguenti campi:

- Nome
- Cognome
- Data di nascita
- E-mail
- Password
- Classe
- Indirizzo
- Numero di telefono
- Materia preferita
- Hobby (checkbox)
- Sesso (radio button)
- Note aggiuntive (textarea)

Il modulo dovrà utilizzare:

- `fieldset`
- `legend`
- `required`
- `placeholder`
- `label`
- `select`
- `textarea`
- `checkbox`
- `radio`
- `submit`
- `reset`

L'obiettivo è consolidare l'utilizzo di tutti gli elementi HTML studiati nel modulo dedicato ai Form.

---

<a id="m10"></a>

# M10 — HTML Semantico

## 10.1 Introduzione

Con HTML5 sono stati introdotti nuovi elementi che permettono di descrivere il significato delle diverse parti di una pagina Web.

Questi elementi prendono il nome di **elementi semantici**.

Prima di HTML5 gli sviluppatori utilizzavano quasi esclusivamente il tag:

```html
<div>
```

per costruire qualsiasi parte del sito.

Il browser, però, non era in grado di capire quale fosse:

- l'intestazione;
- il menu;
- il contenuto principale;
- il piè di pagina.

Con HTML5 questo problema è stato risolto grazie agli elementi semantici.

---

## 10.2 Che cosa significa "Semantico"

La parola **semantica** deriva dal greco e significa:

> attribuire un significato.

Un elemento semantico non descrive il suo aspetto grafico.

Descrive invece il **ruolo** che ricopre nella pagina.

Ad esempio:

```html
<header>
```

indica chiaramente che quel blocco rappresenta l'intestazione del sito.

---

## 10.3 Perché utilizzare HTML Semantico

L'utilizzo degli elementi semantici offre numerosi vantaggi.

### Migliore leggibilità

Un altro sviluppatore comprenderà immediatamente la struttura del documento.

### Migliore accessibilità

I software utilizzati dalle persone con disabilità visive riescono a interpretare più facilmente il contenuto.

### Migliore indicizzazione

I motori di ricerca comprendono meglio l'organizzazione della pagina.

### Codice più ordinato

Ogni sezione ha uno scopo ben definito.

---

## 10.4 Confronto tra HTML tradizionale e HTML5

Prima di HTML5.

```html
<div id="header">

...

</div>

<div id="menu">

...

</div>

<div id="content">

...

</div>

<div id="footer">

...

</div>
```

Con HTML5.

```html
<header>

...

</header>

<nav>

...

</nav>

<main>

...

</main>

<footer>

...

</footer>
```

Il secondo esempio è decisamente più leggibile.

---

## 10.5 I principali elementi semantici

| Elemento | Significato |
|----------|-------------|
| header | Intestazione |
| nav | Menu di navigazione |
| main | Contenuto principale |
| section | Sezione |
| article | Articolo |
| aside | Contenuto secondario |
| footer | Piè di pagina |

Questi elementi costituiscono la base della maggior parte dei siti Web moderni.

---

## 10.6 Il tag `<header>`

Il tag `<header>` rappresenta la parte iniziale della pagina.

Generalmente contiene:

- logo;
- titolo;
- sottotitolo;
- menu principale.

Esempio.

```html
<header>

<h1>

Corso di Web Programming

</h1>

<p>

Guida introduttiva ad HTML e CSS

</p>

</header>
```

---

## 10.7 Il tag `<nav>`

Il tag `<nav>` identifica una zona dedicata alla navigazione.

Normalmente contiene un elenco di collegamenti.

```html
<nav>

<ul>

<li>

<a href="index.html">

Home

</a>

</li>

<li>

<a href="corsi.html">

Corsi

</a>

</li>

<li>

<a href="contatti.html">

Contatti

</a>

</li>

</ul>

</nav>
```

---

## 10.8 Il tag `<main>`

Il tag `<main>` contiene il contenuto principale della pagina.

Ogni documento dovrebbe avere un solo elemento `<main>`.

```html
<main>

<h2>

Benvenuti

</h2>

<p>

Questo è il contenuto principale.

</p>

</main>
```

---

## 10.9 Il tag `<section>`

Una sezione rappresenta un gruppo di contenuti correlati.

Ad esempio.

```html
<section>

<h2>

Chi siamo

</h2>

<p>

...

</p>

</section>
```

Oppure.

```html
<section>

<h2>

I nostri corsi

</h2>

...

</section>
```

Ogni sezione dovrebbe possedere un proprio titolo.

---

## 10.10 Il tag `<article>`

Un articolo rappresenta un contenuto indipendente.

Ad esempio:

- una notizia;
- un post;
- un articolo di giornale;
- una recensione.

```html
<article>

<h2>

HTML5

</h2>

<p>

HTML5 introduce numerosi nuovi elementi...

</p>

</article>
```

Ogni articolo dovrebbe poter essere letto anche separatamente dal resto della pagina.

---

## 10.11 Differenza tra Section e Article

Questa è una delle domande più frequenti.

| Section | Article |
|----------|----------|
| Raggruppa contenuti | Contenuto autonomo |
| Fa parte della pagina | Può vivere anche da solo |
| Organizza il documento | Rappresenta un documento |

In pratica.

Una pagina può contenere numerose sezioni.

Ogni sezione può contenere uno o più articoli.

---

## 10.12 Il tag `<aside>`

L'elemento `<aside>` contiene informazioni complementari.

Può contenere:

- pubblicità;
- collegamenti;
- articoli correlati;
- menu secondari;
- informazioni sull'autore.

```html
<aside>

<h3>

Articoli correlati

</h3>

<ul>

<li>

Introduzione ad HTML

</li>

<li>

Guida CSS

</li>

</ul>

</aside>
```

---

## 10.13 Il tag `<footer>`

Il footer rappresenta la parte finale della pagina.

Generalmente contiene:

- copyright;
- contatti;
- privacy;
- cookie policy;
- social network.

```html
<footer>

<p>

© 2026 gcprof-academy

</p>

</footer>
```

---

## 10.14 Schema di una pagina HTML5

Una tipica pagina moderna può essere rappresentata così.

```
+--------------------------------------+

HEADER

+--------------------------------------+

NAV

+--------------------------------------+

MAIN

    SECTION

        ARTICLE

    SECTION

        ARTICLE

+----------------------+---------------+

MAIN                   ASIDE

+----------------------+---------------+

FOOTER

+--------------------------------------+
```

---

## 10.15 Esempio completo

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>HTML Semantico</title>

</head>

<body>

<header>

<h1>

GCPROF Academy

</h1>

</header>

<nav>

<ul>

<li><a href="#">Home</a></li>

<li><a href="#">Corsi</a></li>

<li><a href="#">Contatti</a></li>

</ul>

</nav>

<main>

<section>

<h2>

Presentazione

</h2>

<p>

Benvenuti nella nostra Academy.

</p>

</section>

<section>

<h2>

Ultime News

</h2>

<article>

<h3>

Nuovo corso HTML

</h3>

<p>

Sono aperte le iscrizioni.

</p>

</article>

</section>

</main>

<aside>

<h3>

Link utili

</h3>

<ul>

<li>Calendario</li>

<li>Materiale didattico</li>

</ul>

</aside>

<footer>

<p>

© 2026 GCPROF Academy

</p>

</footer>

</body>

</html>
```

---

## Best Practice

✔ Utilizzare un solo `<main>`.

✔ Inserire sempre un titolo nelle sezioni.

✔ Utilizzare `<article>` solo per contenuti autonomi.

✔ Utilizzare `<nav>` esclusivamente per la navigazione.

✔ Organizzare la pagina in maniera logica.

---

## Errori comuni

❌ Utilizzare solo `<div>`.

❌ Inserire più elementi `<main>`.

❌ Utilizzare `<article>` per qualsiasi contenuto.

❌ Creare sezioni prive di titolo.

❌ Confondere `<section>` con `<div>`.

---

## Curiosità

Molti framework moderni come React, Next.js, Angular e Vue generano automaticamente pagine che utilizzano gli elementi semantici di HTML5.

Imparare ad utilizzarli correttamente significa scrivere codice più professionale, accessibile e facilmente manutenibile.

---

**Fine prima parte del Modulo M10**

La parte successiva completerà il Modulo M10 con:

- elementi semantici avanzati (`figure`, `figcaption`, `time`, `address`, `details`, `summary`, `mark`);
- accessibilità (ARIA e buone pratiche introduttive);
- struttura completa di un sito multipagina;
- **Mini Progetto 3 — Realizzazione della struttura HTML completa di un sito Web**, ultimo progetto della sezione HTML prima dell'inizio del **Modulo M11 — Introduzione ai CSS**.