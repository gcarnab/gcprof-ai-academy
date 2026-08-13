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

<a id="indice"></a>

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
- [Mini Progetto 3 — Sito Web multipagina completo](#mini3)
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
**⬆️ [Torna all'Indice](#indice)**

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
**⬆️ [Torna all'Indice](#indice)**

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
**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

**⬆️ [Torna all'Indice](#indice)**

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

## 10.16 L'elemento `<figure>` e `<figcaption>`

Il tag `<figure>` viene utilizzato per raggruppare un contenuto autonomo, come un'immagine, un grafico o un diagramma, insieme alla sua didascalia.

Il tag `<figcaption>` contiene la descrizione del contenuto racchiuso in `<figure>`.

```html
<figure>

<img src="laboratorio.jpg" alt="Laboratorio di informatica">

<figcaption>

Gli studenti durante il laboratorio di informatica.

</figcaption>

</figure>
```

L'uso di `<figure>` è preferibile rispetto ad un semplice `<div>` quando l'immagine e la didascalia formano un'unica unità di contenuto.

---

## 10.17 Il tag `<time>`

Il tag `<time>` permette di rappresentare date e orari in un formato leggibile sia dagli utenti sia dalle macchine.

L'attributo `datetime` fornisce il valore in formato standard, mentre il testo visibile può essere scritto liberamente.

```html
<p>

Il corso inizierà il <time datetime="2026-09-15">15 settembre 2026</time>.

</p>
```

Questo tag è particolarmente utile per i motori di ricerca e per gli screen reader.

---

## 10.18 Il tag `<address>`

Il tag `<address>` viene utilizzato per racchiudere le informazioni di contatto relative all'autore o al proprietario del documento o della sezione.

```html
<address>

Scritto da <a href="mailto:info@gcprof-academy.com">GCPROF Academy</a>.

<br>

Via Roma, 10 — Milano

</address>
```

Il tag `<address>` non deve essere utilizzato per indirizzi generici presenti nel contenuto, come l'indirizzo di un negozio elencato in un catalogo.

---

## 10.19 I tag `<details>` e `<summary>`

I tag `<details>` e `<summary>` permettono di creare un blocco di contenuto che può essere mostrato o nascosto dall'utente, senza l'utilizzo di JavaScript.

```html
<details>

<summary>

Domande frequenti

</summary>

<p>

Il corso è adatto anche ai principianti assoluti.

</p>

</details>
```

Il tag `<summary>` rappresenta l'intestazione sempre visibile, mentre il contenuto di `<details>` viene mostrato solo dopo il click.

---

## 10.20 Il tag `<mark>`

Il tag `<mark>` permette di evidenziare una porzione di testo, in modo simile ad un evidenziatore su un libro cartaceo.

```html
<p>

Il termine <mark>HTML</mark> significa HyperText Markup Language.

</p>
```

Il browser applica automaticamente uno sfondo giallo al testo racchiuso in `<mark>`, sebbene sia possibile modificarne l'aspetto tramite CSS.

---

## 10.21 Accessibilità e ARIA: concetti introduttivi

L'accessibilità è la disciplina che si occupa di rendere un sito Web utilizzabile dal maggior numero possibile di persone, comprese quelle con disabilità visive, motorie o cognitive.

Molti utenti navigano il Web tramite **screen reader**, programmi che leggono ad alta voce il contenuto della pagina.

Utilizzare correttamente gli elementi semantici studiati in questo modulo rappresenta già un primo, fondamentale passo verso l'accessibilità.

Quando gli elementi HTML nativi non sono sufficienti, è possibile ricorrere agli attributi **ARIA** (Accessible Rich Internet Applications).

| Attributo | Utilizzo |
| --------- | -------- |
| aria-label | Fornisce un'etichetta descrittiva |
| aria-hidden | Nasconde un elemento agli screen reader |
| role | Specifica il ruolo di un elemento |

```html
<button aria-label="Chiudi il menu di navigazione">

X

</button>
```

La regola generale è: preferire sempre l'elemento HTML semantico corretto, e ricorrere ad ARIA solo quando strettamente necessario.

---

## 10.22 Struttura completa di un sito multipagina

Un sito Web reale è quasi sempre composto da più pagine collegate tra loro.

Una struttura tipica di progetto può essere organizzata in questo modo.

```
progetto/

├── index.html

├── corsi.html

├── contatti.html

├── css/

│   └── style.css

└── img/

    └── logo.png
```

Ogni pagina condivide generalmente la stessa struttura di `<header>`, `<nav>` e `<footer>`, mentre il contenuto di `<main>` cambia da pagina a pagina.

Questo approccio garantisce coerenza grafica e facilita la navigazione dell'utente.

---

## Best Practice

✔ Utilizzare `<figure>` e `<figcaption>` per immagini con didascalia.

✔ Utilizzare `<time>` per date e orari, specificando sempre `datetime`.

✔ Utilizzare `<address>` solo per i contatti reali dell'autore o del sito.

✔ Preferire `<details>` e `<summary>` a soluzioni JavaScript quando possibile.

✔ Verificare sempre l'accessibilità della pagina.

✔ Mantenere una struttura di header, nav e footer coerente su tutte le pagine.

---

## Errori comuni

❌ Utilizzare `<mark>` per scopi puramente decorativi.

❌ Dimenticare l'attributo `datetime` nel tag `<time>`.

❌ Utilizzare `<address>` per indirizzi generici non riferiti all'autore.

❌ Abusare degli attributi ARIA quando esiste già un tag semantico adeguato.

❌ Creare pagine con strutture di navigazione differenti tra loro.

---

## Curiosità

Gli screen reader più diffusi, come **NVDA**, **JAWS** e **VoiceOver**, si basano proprio sulla corretta struttura semantica della pagina per permettere una navigazione efficace agli utenti non vedenti.

Una pagina scritta con `<div>` non semantici risulta molto più difficile da navigare per questi strumenti.

---

<a id="mini3"></a>

# Mini Progetto 3 — Sito Web multipagina completo

Realizzare un piccolo sito Web composto da tre pagine collegate tra loro: `index.html`, `corsi.html` e `contatti.html`.

Ogni pagina dovrà condividere:

- lo stesso `<header>` con logo e titolo;
- lo stesso `<nav>` con i collegamenti alle tre pagine;
- lo stesso `<footer>` con copyright.

La pagina `index.html` dovrà contenere:

- una sezione di presentazione;
- una sezione "Ultime News" con almeno due `<article>`.

La pagina `corsi.html` dovrà contenere:

- un elenco dei corsi disponibili, organizzato con `<section>`;
- un'immagine con `<figure>` e `<figcaption>` per ciascun corso.

La pagina `contatti.html` dovrà contenere:

- un modulo di contatto realizzato con i tag studiati nel Modulo M9;
- un `<address>` con i recapiti dell'Academy.

Ogni pagina dovrà utilizzare esclusivamente elementi HTML semantici, evitando l'uso di `<div>` non necessari.

L'obiettivo del progetto è consolidare l'intera sezione HTML della guida, in preparazione allo studio dei CSS.

---

<a id="m11"></a>

# M11 — Introduzione ai CSS
**⬆️ [Torna all'Indice](#indice)**

## 11.1 Che cos'è CSS

CSS significa:

**Cascading Style Sheets**

In italiano: fogli di stile a cascata.

CSS è il linguaggio che si occupa dell'aspetto grafico di una pagina Web.

Mentre HTML definisce **che cosa** viene mostrato, CSS definisce **come** viene mostrato.

Riprendendo la metafora della casa introdotta nel Modulo M0: se HTML costruisce i muri, CSS sceglie i colori, i mobili e l'arredamento.

---

## 11.2 Perché usare CSS

Senza CSS, una pagina HTML viene visualizzata dal browser con uno stile predefinito, molto semplice e poco curato.

CSS permette di controllare:

- colori;
- font e dimensioni del testo;
- spaziature;
- sfondi;
- bordi;
- posizionamento degli elementi;
- layout della pagina;
- comportamento responsive;
- animazioni.

Un ulteriore vantaggio fondamentale di CSS è la **separazione tra contenuto e presentazione**.

Questo significa che è possibile modificare completamente l'aspetto di un sito senza toccare il codice HTML.

---

## 11.3 La sintassi di base

Una regola CSS è composta da tre elementi.

```
selettore {

proprietà: valore;

}
```

| Elemento | Significato |
| -------- | ----------- |
| Selettore | Indica a quale elemento HTML si applica la regola |
| Proprietà | Indica quale caratteristica si vuole modificare |
| Valore | Indica il valore da assegnare alla proprietà |

Esempio.

```css
p {

color: blue;

font-size: 18px;

}
```

In questo esempio, tutti i paragrafi della pagina verranno visualizzati con testo di colore blu e dimensione 18 pixel.

Ogni dichiarazione termina con un punto e virgola.

---

## 11.4 I tre modi per inserire CSS

Esistono tre metodi principali per collegare CSS ad una pagina HTML.

| Metodo | Descrizione |
| ------ | ----------- |
| Inline | Stile scritto direttamente nell'attributo `style` di un tag |
| Interno | Stile scritto all'interno del tag `<style>`, nell'`<head>` |
| Esterno | Stile scritto in un file `.css` separato, collegato con `<link>` |

---

### 11.4.1 CSS Inline

```html
<p style="color: red; font-weight: bold;">

Testo di esempio.

</p>
```

Lo stile inline si applica esclusivamente al singolo elemento in cui viene scritto.

---

### 11.4.2 CSS Interno

```html
<head>

<style>

p {

color: green;

}

</style>

</head>
```

Lo stile interno si applica a tutta la pagina in cui viene inserito.

---

### 11.4.3 CSS Esterno

File `style.css`.

```css
p {

color: purple;

}
```

File `index.html`.

```html
<head>

<link rel="stylesheet" href="css/style.css">

</head>
```

Lo stile esterno si applica a tutte le pagine collegate al medesimo file `.css`.

---

## 11.5 Confronto tra i tre metodi

| Metodo | Vantaggi | Svantaggi |
| ------ | -------- | --------- |
| Inline | Effetto immediato | Codice difficile da mantenere |
| Interno | Utile per pagine singole | Non riutilizzabile su altre pagine |
| Esterno | Riutilizzabile, mantenibile, consigliato | Richiede un file aggiuntivo |

Nella pratica professionale, il metodo **esterno** è quello universalmente preferito.

Lo stile inline dovrebbe essere evitato, salvo casi eccezionali.

---

## 11.6 Struttura di un progetto con CSS esterno

Riprendendo la struttura di progetto introdotta nel Modulo M10, il file CSS viene generalmente collocato in una cartella dedicata.

```
progetto/

├── index.html

├── css/

│   └── style.css

└── img/

    └── logo.png
```

Il collegamento avviene sempre all'interno dell'`<head>` del documento HTML.

```html
<link rel="stylesheet" href="css/style.css">
```

---

## 11.7 I commenti in CSS

Anche in CSS è possibile inserire commenti, non visibili nella pagina finale.

```css
/* Questo è un commento */

p {

color: black;

}
```

I commenti sono utili per documentare il codice e per disattivare temporaneamente alcune regole durante i test.

---

## 11.8 Il concetto di cascata

La parola "Cascading" nel nome CSS non è casuale.

Quando più regole si applicano allo stesso elemento, il browser deve stabilire quale regola applicare.

Questa decisione avviene seguendo un ordine preciso, chiamato **cascata**, basato su tre fattori principali.

| Fattore | Descrizione |
| ------- | ----------- |
| Origine | CSS del browser, dello sviluppatore, dell'utente |
| Specificità | Quanto è "preciso" un selettore |
| Ordine nel codice | L'ultima regola scritta prevale, a parità di specificità |

Il concetto di specificità verrà approfondito nel Modulo M12, dedicato ai selettori CSS.

Per ora è sufficiente ricordare una regola pratica.

```css
p {

color: blue;

}

p {

color: red;

}
```

In questo esempio, il testo dei paragrafi risulterà rosso, poiché la seconda regola viene scritta dopo la prima.

---

## 11.9 Il concetto di ereditarietà

Alcune proprietà CSS, se applicate ad un elemento, vengono automaticamente ereditate dai suoi elementi figli.

```css
body {

color: darkblue;

font-family: Arial;

}
```

In questo caso, tutto il testo della pagina erediterà il colore e il font impostati sul tag `<body>`, salvo diversa indicazione.

Non tutte le proprietà CSS sono ereditabili: proprietà come `color` e `font-family` lo sono, mentre proprietà come `border` o `margin` non lo sono.

---

## 11.10 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Primo esempio CSS</title>

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<h1>

Benvenuti su GCPROF Academy

</h1>

<p>

Questa pagina utilizza un foglio di stile esterno.

</p>

</body>

</html>
```

File `css/style.css`.

```css
body {

font-family: Arial, sans-serif;

background-color: #f4f4f4;

}

h1 {

color: darkblue;

}

p {

color: #333333;

font-size: 16px;

}
```

Salvando entrambi i file e aprendo `index.html` con Live Server, sarà possibile osservare come il CSS modifichi completamente l'aspetto della pagina, senza alterare il codice HTML.

---

## 11.11 Gli strumenti di sviluppo del browser

Ogni browser moderno mette a disposizione gli **strumenti per sviluppatori** (DevTools), utili per analizzare e modificare in tempo reale il CSS di una pagina.

Per aprirli è generalmente sufficiente premere il tasto **F12**, oppure il tasto destro del mouse seguito da "Ispeziona".

I DevTools permettono di:

- visualizzare il CSS applicato ad ogni elemento;
- individuare da quale regola proviene un determinato stile;
- modificare temporaneamente i valori per fare esperimenti;
- individuare errori di sintassi.

L'utilizzo costante dei DevTools è una delle abitudini più importanti da acquisire fin dai primi passi con CSS.

---

## Best Practice

✔ Preferire sempre il CSS esterno.

✔ Collegare il file CSS all'interno dell'`<head>`.

✔ Organizzare i file CSS in una cartella dedicata.

✔ Commentare il codice CSS più complesso.

✔ Utilizzare i DevTools del browser per sperimentare.

✔ Scrivere selettori chiari e leggibili.

---

## Errori comuni

❌ Utilizzare esclusivamente lo stile inline.

❌ Dimenticare il punto e virgola alla fine di una dichiarazione.

❌ Dimenticare una delle due parentesi graffe.

❌ Collegare il file CSS con un percorso errato.

❌ Pensare che l'ordine delle regole CSS non abbia importanza.

---

## Curiosità

Il primo standard CSS (CSS1) venne pubblicato dal **W3C** nel 1996, pochi anni dopo la nascita del Web.

Da allora CSS si è evoluto attraverso CSS2, CSS3, fino ad arrivare ai moduli indipendenti utilizzati oggi, come Flexbox e Grid, che verranno affrontati nei moduli successivi di questa guida.

---

<a id="m12"></a>

# M12 — Selettori CSS
**⬆️ [Torna all'Indice](#indice)**

## 12.1 Che cosa sono i selettori

Nel Modulo M11 abbiamo imparato che una regola CSS è composta da un selettore, una o più proprietà e i relativi valori.

Il **selettore** è la parte della regola che indica a quali elementi HTML si applica lo stile.

Conoscere bene i selettori significa poter controllare con precisione ogni singolo elemento della pagina, senza dover intervenire sul codice HTML.

Questo modulo raccoglie tutti i principali tipi di selettore utilizzati in CSS.

---

## 12.2 Il selettore universale

Il selettore universale, rappresentato dal simbolo `*`, applica lo stile a **tutti** gli elementi della pagina.

```css
* {

margin: 0;

padding: 0;

}
```

Questo selettore viene spesso utilizzato all'inizio di un foglio di stile per azzerare i margini e i padding predefiniti impostati dal browser.

---

## 12.3 Il selettore di elemento

Il selettore di elemento (o selettore di tag) applica lo stile a tutti gli elementi HTML di un determinato tipo.

```css
p {

color: darkblue;

}

h2 {

font-size: 24px;

}
```

In questo esempio, tutti i paragrafi della pagina diventeranno blu scuro, e tutti i titoli `<h2>` avranno dimensione 24 pixel.

---

## 12.4 Il selettore di classe

Il selettore di classe permette di applicare uno stile a uno o più elementi specifici, indipendentemente dal tipo di tag.

Una classe viene definita nell'HTML tramite l'attributo `class`, e richiamata in CSS anteponendo un punto al nome della classe.

```html
<p class="evidenziato">

Testo importante.

</p>
```

```css
.evidenziato {

background-color: yellow;

font-weight: bold;

}
```

Uno stesso elemento HTML può possedere più classi contemporaneamente, separate da uno spazio.

```html
<p class="evidenziato centrato">

Testo importante e centrato.

</p>
```

Una classe, inoltre, può essere riutilizzata su più elementi diversi all'interno della stessa pagina.

---

## 12.5 Il selettore di id

Il selettore di id permette di applicare uno stile ad un **singolo elemento univoco** della pagina.

Un id viene definito nell'HTML tramite l'attributo `id`, e richiamato in CSS anteponendo un cancelletto al nome dell'id.

```html
<div id="intestazione">

Contenuto dell'intestazione.

</div>
```

```css
#intestazione {

background-color: black;

color: white;

}
```

A differenza della classe, un id deve essere **unico** all'interno dell'intera pagina HTML.

---

## 12.6 Differenza tra classe e id

| Caratteristica | Classe | Id |
| --------------- | ------ | -- |
| Simbolo CSS | `.` | `#` |
| Riutilizzabile | Sì, su più elementi | No, deve essere unico |
| Uso tipico | Stili ripetuti | Elemento singolo e specifico |
| Specificità | Più bassa | Più alta |

Nella pratica professionale, le classi vengono utilizzate molto più frequentemente degli id, proprio grazie alla loro riutilizzabilità.

Gli id vengono generalmente riservati a casi particolari, come l'ancoraggio di collegamenti interni o l'integrazione con JavaScript.

---

## 12.7 Raggruppare più selettori

Quando più selettori condividono le stesse proprietà, è possibile raggrupparli separandoli con una virgola.

```css
h1, h2, h3 {

font-family: Arial, sans-serif;

color: darkblue;

}
```

Questa tecnica evita di ripetere inutilmente le stesse dichiarazioni per ogni selettore.

---

## 12.8 I selettori combinati

I selettori combinati permettono di selezionare elementi in base alla loro posizione rispetto ad altri elementi nella struttura HTML.

### 12.8.1 Combinatore discendente (spazio)

Seleziona tutti gli elementi discendenti, a qualsiasi livello di profondità.

```css
nav a {

color: white;

}
```

In questo esempio, verranno selezionati tutti i collegamenti `<a>` presenti all'interno di un `<nav>`, indipendentemente dal livello di annidamento.

### 12.8.2 Combinatore figlio diretto (`>`)

Seleziona solamente gli elementi figli diretti, escludendo i discendenti più profondi.

```css
ul > li {

list-style: none;

}
```

### 12.8.3 Combinatore fratello adiacente (`+`)

Seleziona l'elemento che si trova immediatamente dopo un altro elemento, allo stesso livello.

```css
h2 + p {

font-style: italic;

}
```

In questo esempio, verrà selezionato soltanto il paragrafo che segue immediatamente un `<h2>`.

### 12.8.4 Combinatore fratelli generali (`~`)

Seleziona tutti gli elementi fratelli successivi, non solamente il primo.

```css
h2 ~ p {

color: gray;

}
```

---

## 12.9 I selettori di attributo

I selettori di attributo permettono di selezionare elementi in base alla presenza o al valore di un attributo HTML.

```css
input[type="text"] {

border: 1px solid gray;

}

a[target="_blank"] {

color: red;

}
```

Questa tecnica è particolarmente utile per stilizzare i form, come studiato nel Modulo M9.

---

## 12.10 Le pseudo-classi

Una pseudo-classe permette di applicare uno stile in base ad uno **stato particolare** dell'elemento.

| Pseudo-classe | Descrizione |
| -------------- | ----------- |
| `:hover` | Quando il mouse è sopra l'elemento |
| `:focus` | Quando l'elemento è selezionato (es. un campo di input) |
| `:active` | Durante il click sull'elemento |
| `:first-child` | Il primo elemento figlio del suo genitore |
| `:last-child` | L'ultimo elemento figlio del suo genitore |
| `:nth-child(n)` | L'ennesimo elemento figlio |
| `:not(selettore)` | Tutti gli elementi che non corrispondono al selettore indicato |

```css
a:hover {

color: red;

}

input:focus {

border-color: blue;

}

li:nth-child(2) {

font-weight: bold;

}
```

Le pseudo-classi sono uno strumento fondamentale per rendere una pagina interattiva senza ricorrere a JavaScript.

---

## 12.11 I pseudo-elementi

Un pseudo-elemento permette di selezionare una **parte specifica** di un elemento, oppure di generare contenuto aggiuntivo non presente nell'HTML.

| Pseudo-elemento | Descrizione |
| ---------------- | ----------- |
| `::before` | Inserisce contenuto prima dell'elemento |
| `::after` | Inserisce contenuto dopo l'elemento |
| `::first-line` | Seleziona la prima riga di testo |
| `::first-letter` | Seleziona la prima lettera del testo |

```css
p::first-letter {

font-size: 200%;

font-weight: bold;

}

.box::before {

content: "★ ";

}
```

I pseudo-elementi `::before` e `::after` richiedono sempre la proprietà `content`, anche se vuota.

---

## 12.12 Un approfondimento sulla specificità

Nel Modulo M11 abbiamo introdotto il concetto di cascata e di specificità.

Ora che conosciamo i diversi tipi di selettore, possiamo comprendere meglio come viene calcolata la specificità.

| Tipo di selettore | Peso |
| ------------------ | ---- |
| Elemento (es. `p`) | Basso |
| Classe, pseudo-classe, attributo (es. `.evidenziato`, `:hover`) | Medio |
| Id (es. `#intestazione`) | Alto |
| Stile inline | Molto alto |

```css
p {

color: blue;

}

.testo {

color: green;

}

#titolo {

color: red;

}
```

Se un elemento possiede contemporaneamente un tag `p`, la classe `testo` e l'id `titolo`, il colore applicato sarà rosso, poiché il selettore di id possiede la specificità più alta.

A parità di specificità, come già visto nel Modulo M11, prevale sempre l'ultima regola scritta nel codice.

---

## 12.13 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Selettori CSS</title>

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

<h1 id="titolo-principale">

Selettori CSS

</h1>

<p class="intro">

Benvenuti nel modulo dedicato ai selettori.

</p>

<p>

Questo è un paragrafo normale.

</p>

</body>

</html>
```

File `css/style.css`.

```css
* {

margin: 0;

padding: 0;

}

nav a {

color: white;

text-decoration: none;

}

nav a:hover {

color: yellow;

}

#titolo-principale {

color: darkblue;

}

.intro {

font-style: italic;

}

p::first-letter {

font-size: 150%;

}
```

Questo esempio riunisce selettori di elemento, classe, id, combinatori, pseudo-classi e pseudo-elementi in un unico foglio di stile.

---

## Best Practice

✔ Preferire le classi agli id per gli stili riutilizzabili.

✔ Riservare gli id a casi realmente unici nella pagina.

✔ Utilizzare nomi di classe descrittivi e coerenti.

✔ Raggruppare i selettori che condividono le stesse proprietà.

✔ Utilizzare i combinatori per evitare classi superflue.

✔ Tenere sempre presente la specificità durante la scrittura del CSS.

---

## Errori comuni

❌ Utilizzare troppi id al posto delle classi.

❌ Creare selettori eccessivamente complessi e poco leggibili.

❌ Dimenticare il punto prima del nome della classe o il cancelletto prima dell'id.

❌ Dimenticare la proprietà `content` nei pseudo-elementi `::before` e `::after`.

❌ Sottovalutare l'effetto della specificità, causando stili che non si applicano come previsto.

---

## Curiosità

Gli sviluppatori professionisti utilizzano spesso metodologie di naming come **BEM** (Block, Element, Modifier) per organizzare le classi CSS in progetti di grandi dimensioni, riducendo i conflitti di specificità e migliorando la manutenibilità del codice.

---

<a id="m13"></a>

# M13 — Colori e sfondi
**⬆️ [Torna all'Indice](#indice)**

## 13.1 Introduzione

Uno degli aspetti più immediati di CSS riguarda la gestione dei colori.

I colori vengono utilizzati per il testo, per gli sfondi, per i bordi e per moltissime altre proprietà che incontreremo nei prossimi moduli.

CSS mette a disposizione diversi modi per specificare un colore.

Conoscerli tutti permette di scegliere, di volta in volta, il formato più adatto alla situazione.

---

## 13.2 I nomi di colore predefiniti

Il modo più semplice per indicare un colore consiste nell'utilizzare uno dei nomi predefiniti dal linguaggio CSS.

```css
p {

color: red;

}

h1 {

color: darkblue;

}
```

CSS mette a disposizione oltre 140 nomi di colore predefiniti, tra cui:

- red;
- blue;
- green;
- black;
- white;
- gray;
- orange;
- purple.

Questo metodo è semplice e leggibile, ma offre un numero limitato di colori.

---

## 13.3 Il formato esadecimale

Il formato esadecimale è il metodo più utilizzato in ambito professionale.

Un colore esadecimale è composto dal simbolo `#` seguito da sei cifre, che rappresentano rispettivamente la componente rossa, verde e blu del colore.

```css
h1 {

color: #003366;

}

p {

color: #ff0000;

}
```

| Codice | Colore |
| ------ | ------ |
| #000000 | Nero |
| #ffffff | Bianco |
| #ff0000 | Rosso |
| #00ff00 | Verde |
| #0000ff | Blu |

Esiste anche una versione abbreviata a tre cifre, valida quando ogni coppia di cifre è ripetuta.

```css
p {

color: #f00;

}
```

`#f00` equivale a `#ff0000`.

---

## 13.4 Il formato RGB

Il formato RGB permette di indicare un colore specificando separatamente le componenti rossa, verde e blu, con valori compresi tra 0 e 255.

```css
p {

color: rgb(255, 0, 0);

}

h1 {

color: rgb(0, 51, 102);

}
```

Questo formato risulta spesso più leggibile rispetto al codice esadecimale, poiché ogni componente è chiaramente separata.

---

## 13.5 Il formato RGBA e la trasparenza

Il formato RGBA estende RGB aggiungendo un quarto valore, chiamato **canale alpha**, che controlla la trasparenza del colore.

Il valore alpha varia da 0 (completamente trasparente) a 1 (completamente opaco).

```css
div {

background-color: rgba(0, 0, 0, 0.5);

}
```

In questo esempio, lo sfondo sarà nero al 50% di trasparenza.

Il formato RGBA è particolarmente utile per creare sovrapposizioni ed effetti di leggerezza visiva.

---

## 13.6 I formati HSL e HSLA

Il formato HSL descrive un colore attraverso tre valori: tonalità (Hue), saturazione (Saturation) e luminosità (Lightness).

| Componente | Descrizione | Intervallo |
| ----------- | ----------- | ---------- |
| Hue | Tonalità del colore | 0 – 360 gradi |
| Saturation | Intensità del colore | 0% – 100% |
| Lightness | Chiarezza del colore | 0% – 100% |

```css
p {

color: hsl(210, 100%, 20%);

}
```

Come per RGBA, esiste anche la variante HSLA, che aggiunge il canale di trasparenza.

```css
div {

background-color: hsla(210, 100%, 20%, 0.3);

}
```

Il formato HSL risulta particolarmente utile quando si desidera modificare solamente la luminosità o la saturazione di un colore, mantenendone invariata la tonalità.

---

## 13.7 La proprietà `color`

La proprietà `color` controlla il colore del testo di un elemento.

```css
p {

color: darkgreen;

}
```

Come studiato nel Modulo M11, la proprietà `color` è una proprietà **ereditabile**: se applicata al `<body>`, verrà trasmessa a tutti gli elementi discendenti, salvo diversa indicazione.

---

## 13.8 La proprietà `background-color`

La proprietà `background-color` imposta il colore di sfondo di un elemento.

```css
body {

background-color: #f4f4f4;

}

header {

background-color: darkblue;

}
```

A differenza di `color`, la proprietà `background-color` **non è ereditabile**.

---

## 13.9 La proprietà `background-image`

La proprietà `background-image` permette di impostare un'immagine come sfondo di un elemento.

```css
body {

background-image: url("img/sfondo.jpg");

}
```

Il percorso dell'immagine può essere relativo, come nell'esempio, oppure assoluto.

---

## 13.10 Il posizionamento dello sfondo

Diverse proprietà permettono di controllare la posizione e il comportamento di un'immagine di sfondo.

| Proprietà | Descrizione |
| --------- | ----------- |
| background-repeat | Controlla la ripetizione dell'immagine |
| background-position | Controlla la posizione dell'immagine |
| background-size | Controlla la dimensione dell'immagine |
| background-attachment | Controlla se lo sfondo scorre con la pagina |

```css
body {

background-image: url("img/sfondo.jpg");

background-repeat: no-repeat;

background-position: center;

background-size: cover;

background-attachment: fixed;

}
```

| Valore di background-repeat | Effetto |
| ----------------------------- | ------- |
| repeat | Ripete l'immagine (valore predefinito) |
| no-repeat | Non ripete l'immagine |
| repeat-x | Ripete solo in orizzontale |
| repeat-y | Ripete solo in verticale |

| Valore di background-size | Effetto |
| --------------------------- | ------- |
| cover | Copre l'intero elemento, ritagliando l'immagine se necessario |
| contain | Adatta l'immagine senza ritagliarla |
| 100% 100% | Deforma l'immagine per riempire l'elemento |

---

## 13.11 La proprietà abbreviata `background`

Le singole proprietà dello sfondo possono essere riunite in un'unica dichiarazione abbreviata.

```css
body {

background: url("img/sfondo.jpg") no-repeat center / cover fixed;

}
```

L'uso della proprietà abbreviata rende il codice più compatto, ma può risultare meno leggibile per chi è alle prime armi.

Nella fase di apprendimento è consigliabile utilizzare inizialmente le proprietà singole.

---

## 13.12 I gradienti

Oltre ai colori pieni e alle immagini, CSS permette di creare sfondi sfumati chiamati **gradienti**, generati direttamente dal browser senza l'utilizzo di immagini.

```css
div {

background: linear-gradient(to right, #003366, #66ccff);

}
```

Esiste anche il gradiente radiale, che si sviluppa a partire da un punto centrale.

```css
div {

background: radial-gradient(circle, #ffffff, #003366);

}
```

I gradienti sono particolarmente utilizzati per pulsanti, intestazioni e sezioni decorative.

---

## 13.13 La proprietà `opacity`

La proprietà `opacity` controlla la trasparenza dell'intero elemento, incluso il suo contenuto.

```css
div {

opacity: 0.5;

}
```

È importante non confondere `opacity` con `rgba`.

| Proprietà | Effetto sulla trasparenza |
| --------- | -------------------------- |
| opacity | Rende trasparente l'intero elemento, contenuto compreso |
| rgba / hsla | Rende trasparente solo il colore specificato |

---

## 13.14 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Colori e sfondi</title>

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<header>

<h1>

GCPROF Academy

</h1>

</header>

<main>

<p>

Benvenuti nella sezione dedicata ai colori e agli sfondi.

</p>

</main>

</body>

</html>
```

File `css/style.css`.

```css
body {

background-color: #f4f4f4;

color: #333333;

}

header {

background: linear-gradient(to right, #003366, #0066cc);

color: white;

padding: 20px;

}

main {

background-color: rgba(255, 255, 255, 0.8);

padding: 20px;

}
```

Questo esempio combina colori esadecimali, RGBA e un gradiente lineare all'interno della stessa pagina.

---

## Best Practice

✔ Preferire il formato esadecimale o RGB nei progetti professionali.

✔ Utilizzare RGBA o HSLA quando è necessaria la trasparenza.

✔ Verificare sempre il contrasto tra testo e sfondo, per garantire la leggibilità.

✔ Utilizzare `background-size: cover` per adattare correttamente le immagini di sfondo.

✔ Preferire inizialmente le proprietà singole rispetto alla forma abbreviata `background`.

---

## Errori comuni

❌ Utilizzare colori con scarso contrasto rispetto allo sfondo.

❌ Confondere `opacity` con `rgba`.

❌ Dimenticare `background-repeat: no-repeat` quando non desiderato.

❌ Utilizzare immagini di sfondo troppo pesanti, rallentando il caricamento della pagina.

❌ Abusare dei gradienti, appesantendo graficamente la pagina.

---

## Curiosità

Il contrasto tra testo e sfondo non è soltanto una questione estetica: le linee guida internazionali sull'accessibilità **WCAG** stabiliscono rapporti minimi di contrasto obbligatori, proprio per garantire la leggibilità del testo anche agli utenti con difficoltà visive.

---

<a id="m14"></a>

# M14 — Testo e font
**⬆️ [Torna all'Indice](#indice)**

## 14.1 Introduzione

Il testo rappresenta il contenuto principale della maggior parte delle pagine Web.

CSS mette a disposizione numerose proprietà per controllare l'aspetto del testo: il tipo di carattere, la dimensione, lo spessore, l'allineamento e molto altro.

Questo modulo raccoglie le proprietà più importanti per lavorare in modo professionale con il testo.

---

## 14.2 La proprietà `font-family`

La proprietà `font-family` indica il tipo di carattere da utilizzare.

```css
p {

font-family: Arial;

}
```

È buona norma indicare più font in sequenza, chiamata **font stack**, in modo che il browser utilizzi il primo disponibile sul dispositivo dell'utente.

```css
body {

font-family: "Segoe UI", Arial, sans-serif;

}
```

L'ultimo valore dovrebbe sempre essere una famiglia generica.

| Famiglia generica | Descrizione |
| ------------------- | ----------- |
| serif | Caratteri con grazie (es. Times New Roman) |
| sans-serif | Caratteri senza grazie (es. Arial) |
| monospace | Caratteri a larghezza fissa (es. Courier New) |
| cursive | Caratteri corsivi decorativi |
| fantasy | Caratteri decorativi |

I nomi composti da più parole, come "Segoe UI", devono essere racchiusi tra virgolette.

---

## 14.3 La proprietà `font-size`

La proprietà `font-size` controlla la dimensione del testo.

```css
h1 {

font-size: 32px;

}

p {

font-size: 16px;

}
```

Oltre ai pixel, CSS offre altre unità di misura per la dimensione del testo, che verranno approfondite nel Modulo M15 dedicato al Box Model.

| Unità | Descrizione |
| ----- | ----------- |
| px | Valore fisso, espresso in pixel |
| em | Relativo alla dimensione del font dell'elemento genitore |
| rem | Relativo alla dimensione del font dell'elemento radice (`html`) |
| % | Percentuale rispetto al valore ereditato |

```css
html {

font-size: 16px;

}

h2 {

font-size: 1.5rem;

}
```

In questo esempio, `1.5rem` corrisponde a 24 pixel, poiché il valore di riferimento sull'elemento `html` è 16 pixel.

---

## 14.4 La proprietà `font-weight`

La proprietà `font-weight` controlla lo spessore del testo.

```css
p {

font-weight: bold;

}

span {

font-weight: 300;

}
```

| Valore | Descrizione |
| ------ | ----------- |
| normal | Spessore normale (equivalente a 400) |
| bold | Spessore grassetto (equivalente a 700) |
| 100 – 900 | Valori numerici, in incrementi di 100 |

Non tutti i font supportano l'intera gamma di valori numerici.

---

## 14.5 La proprietà `font-style`

La proprietà `font-style` controlla l'inclinazione del testo.

```css
em {

font-style: italic;

}
```

| Valore | Effetto |
| ------ | ------- |
| normal | Testo normale |
| italic | Testo in corsivo |
| oblique | Testo obliquo, simile al corsivo |

---

## 14.6 La proprietà abbreviata `font`

Le proprietà relative al font possono essere riunite in un'unica dichiarazione abbreviata.

```css
p {

font: italic bold 16px/1.5 Arial, sans-serif;

}
```

L'ordine consigliato è: stile, spessore, dimensione, altezza di riga e famiglia di font.

Come già osservato nel Modulo M13 a proposito della proprietà `background`, la forma abbreviata è più compatta ma meno immediata da leggere per chi è alle prime armi.

---

## 14.7 La proprietà `text-align`

La proprietà `text-align` controlla l'allineamento orizzontale del testo.

```css
h1 {

text-align: center;

}
```

| Valore | Effetto |
| ------ | ------- |
| left | Allineato a sinistra (valore predefinito) |
| right | Allineato a destra |
| center | Centrato |
| justify | Giustificato |

---

## 14.8 La proprietà `text-decoration`

La proprietà `text-decoration` controlla la presenza di linee decorative sul testo.

```css
a {

text-decoration: none;

}

.importante {

text-decoration: underline;

}
```

| Valore | Effetto |
| ------ | ------- |
| none | Nessuna decorazione |
| underline | Sottolineato |
| overline | Linea sopra il testo |
| line-through | Testo barrato |

Rimuovere la sottolineatura predefinita dei collegamenti, come nell'esempio, è una pratica molto comune nei siti moderni.

---

## 14.9 La proprietà `text-transform`

La proprietà `text-transform` controlla la capitalizzazione del testo, senza modificare il contenuto HTML originale.

```css
h2 {

text-transform: uppercase;

}
```

| Valore | Effetto |
| ------ | ------- |
| none | Nessuna trasformazione |
| uppercase | Tutto maiuscolo |
| lowercase | Tutto minuscolo |
| capitalize | Prima lettera di ogni parola maiuscola |

---

## 14.10 La proprietà `line-height`

La proprietà `line-height` controlla l'altezza della riga di testo, incidendo sulla leggibilità complessiva del paragrafo.

```css
p {

line-height: 1.6;

}
```

Un valore senza unità di misura, come `1.6`, viene interpretato come moltiplicatore della dimensione del font.

Un valore di `line-height` compreso tra 1.4 e 1.6 è generalmente considerato ottimale per la leggibilità di un testo di paragrafo.

---

## 14.11 La proprietà `letter-spacing` e `word-spacing`

Queste due proprietà controllano rispettivamente la spaziatura tra le lettere e tra le parole.

```css
h1 {

letter-spacing: 2px;

}

p {

word-spacing: 4px;

}
```

Un utilizzo moderato di queste proprietà può migliorare la leggibilità dei titoli, mentre un uso eccessivo tende a peggiorarla.

---

## 14.12 Le Web Font: Google Fonts

I font disponibili di default sui dispositivi degli utenti sono limitati.

Per utilizzare font personalizzati, è possibile ricorrere a servizi come **Google Fonts**, gratuito e ampiamente utilizzato.

Il collegamento avviene tramite un tag `<link>`, da inserire nell'`<head>` del documento, prima del collegamento al proprio file CSS.

```html
<head>

<link rel="preconnect" href="https://fonts.googleapis.com">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="css/style.css">

</head>
```

Nel file CSS, il font viene richiamato come qualsiasi altro font.

```css
body {

font-family: "Poppins", sans-serif;

}
```

---

## 14.13 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Testo e font</title>

<link rel="preconnect" href="https://fonts.googleapis.com">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<h1>

GCPROF Academy

</h1>

<p>

Benvenuti nella sezione dedicata al testo e ai font.

</p>

<a href="#">

Scopri di più

</a>

</body>

</html>
```

File `css/style.css`.

```css
body {

font-family: "Poppins", sans-serif;

line-height: 1.6;

}

h1 {

font-size: 2.5rem;

font-weight: 700;

text-align: center;

text-transform: uppercase;

letter-spacing: 1px;

}

p {

font-size: 1rem;

color: #333333;

}

a {

text-decoration: none;

font-weight: bold;

color: darkblue;

}
```

Questo esempio combina un Web Font esterno con le principali proprietà del testo studiate nel modulo.

---

## Best Practice

✔ Indicare sempre un font stack con una famiglia generica finale.

✔ Preferire `rem` per la dimensione del testo, per garantire coerenza e accessibilità.

✔ Impostare un `line-height` adeguato per migliorare la leggibilità.

✔ Utilizzare `text-transform` invece di scrivere il testo direttamente in maiuscolo nell'HTML.

✔ Caricare i Web Font prima del proprio foglio di stile.

---

## Errori comuni

❌ Dimenticare la famiglia generica finale nel font stack.

❌ Utilizzare troppi font diversi nella stessa pagina.

❌ Impostare un `line-height` troppo basso, penalizzando la leggibilità.

❌ Abusare di `letter-spacing` e `word-spacing`.

❌ Caricare Web Font non necessari, rallentando il caricamento della pagina.

---

## Curiosità

Il font **Poppins**, utilizzato nell'esempio di questo modulo, è uno dei font più popolari su Google Fonts, apprezzato per la sua forma geometrica e la buona leggibilità sia su schermo che su dispositivi mobili.

---

<a id="m15"></a>

# M15 — Il Box Model
**⬆️ [Torna all'Indice](#indice)**

## 15.1 Introduzione

Il **Box Model** (modello a scatola) è uno dei concetti più importanti dell'intero linguaggio CSS.

Ogni elemento HTML, nessuno escluso, viene rappresentato dal browser come un **rettangolo**, indipendentemente dal suo contenuto.

Comprendere il Box Model significa comprendere come vengono calcolati lo spazio, le dimensioni e il posizionamento di ogni elemento della pagina.

Questo modulo rappresenta le fondamenta necessarie per affrontare, nei moduli successivi, argomenti come Flexbox, Grid e il Responsive Design.

---

## 15.2 Le quattro aree del Box Model

Ogni elemento è composto da quattro aree concentriche, disposte dall'interno verso l'esterno.

```
+-----------------------------------+

|              MARGIN                |

|   +---------------------------+   |

|   |          BORDER            |   |

|   |   +-------------------+   |   |

|   |   |      PADDING       |   |   |

|   |   |   +-----------+   |   |   |

|   |   |   |  CONTENT   |   |   |   |

|   |   |   +-----------+   |   |   |

|   |   +-------------------+   |   |

|   +---------------------------+   |

+-----------------------------------+
```

| Area | Descrizione |
| ---- | ----------- |
| Content | Il contenuto vero e proprio dell'elemento (testo, immagine, ecc.) |
| Padding | Lo spazio interno, tra il contenuto e il bordo |
| Border | Il bordo dell'elemento |
| Margin | Lo spazio esterno, tra l'elemento e gli elementi circostanti |

---

## 15.3 Il Content

Il **content** rappresenta l'area occupata dal contenuto dell'elemento.

Le sue dimensioni vengono controllate tramite le proprietà `width` e `height`.

```css
div {

width: 300px;

height: 150px;

}
```

Per impostazione predefinita, `width` e `height` si riferiscono esclusivamente all'area di contenuto, senza includere padding, border e margin.

---

## 15.4 Il Padding

Il **padding** rappresenta lo spazio interno tra il contenuto e il bordo dell'elemento.

```css
div {

padding: 20px;

}
```

È possibile specificare valori differenti per ciascun lato.

```css
div {

padding-top: 10px;

padding-right: 20px;

padding-bottom: 10px;

padding-left: 20px;

}
```

La proprietà abbreviata `padding` permette di specificare fino a quattro valori in un'unica dichiarazione.

```css
div {

padding: 10px 20px 10px 20px;

}
```

L'ordine dei valori segue il senso orario: sopra, destra, sotto, sinistra.

| Numero di valori | Significato |
| ------------------ | ----------- |
| 1 valore | Applicato a tutti i lati |
| 2 valori | Sopra/sotto, sinistra/destra |
| 3 valori | Sopra, sinistra/destra, sotto |
| 4 valori | Sopra, destra, sotto, sinistra |

Il padding, a differenza del margin, eredita sempre il colore di sfondo dell'elemento.

---

## 15.5 Il Border

Il **border** rappresenta il bordo dell'elemento, posizionato tra il padding e il margin.

```css
div {

border-width: 2px;

border-style: solid;

border-color: black;

}
```

Anche in questo caso è disponibile una proprietà abbreviata.

```css
div {

border: 2px solid black;

}
```

| Valore di border-style | Effetto |
| ------------------------ | ------- |
| solid | Linea continua |
| dashed | Linea tratteggiata |
| dotted | Linea puntinata |
| double | Doppia linea |
| none | Nessun bordo (valore predefinito) |

È possibile applicare il bordo anche ad un solo lato.

```css
div {

border-bottom: 1px solid gray;

}
```

---

## 15.6 Il border-radius

La proprietà `border-radius` permette di arrotondare gli angoli di un elemento.

```css
div {

border-radius: 10px;

}
```

Un valore molto elevato, combinato con un elemento quadrato, produce un cerchio perfetto.

```css
.avatar {

width: 100px;

height: 100px;

border-radius: 50%;

}
```

---

## 15.7 Il Margin

Il **margin** rappresenta lo spazio esterno tra l'elemento e gli elementi circostanti.

```css
div {

margin: 20px;

}
```

Come per il padding, è possibile specificare valori differenti per ciascun lato, ed è disponibile la medesima sintassi abbreviata a uno, due, tre o quattro valori.

```css
div {

margin: 10px 20px;

}
```

Un valore particolarmente utile per centrare orizzontalmente un elemento a larghezza fissa è `margin: 0 auto`.

```css
.contenitore {

width: 800px;

margin: 0 auto;

}
```

---

## 15.8 Il collasso dei margin (Margin Collapsing)

Quando due elementi con margin verticale si trovano uno di seguito all'altro, i due margin non si sommano, ma **collassano**, ovvero viene applicato il valore più grande tra i due.

```css
p {

margin-bottom: 20px;

margin-top: 30px;

}
```

Nell'esempio, tra due paragrafi consecutivi lo spazio effettivo sarà di 30 pixel, e non di 50 pixel.

Il collasso dei margin si verifica solo in direzione verticale, e solo in determinate condizioni; non riguarda invece i margin orizzontali.

---

## 15.9 Differenza tra Margin e Padding

Questa è una delle domande più frequenti tra chi inizia a studiare CSS.

| Margin | Padding |
| ------ | ------- |
| Spazio esterno all'elemento | Spazio interno all'elemento |
| Non eredita lo sfondo | Eredita lo sfondo dell'elemento |
| Può collassare | Non collassa mai |
| Utile per distanziare elementi tra loro | Utile per distanziare il contenuto dal bordo |

---

## 15.10 La proprietà `box-sizing`

Per impostazione predefinita, le proprietà `width` e `height` controllano esclusivamente l'area di contenuto.

Questo significa che padding e border vengono **aggiunti** alle dimensioni impostate, aumentando la dimensione reale dell'elemento.

```css
div {

width: 300px;

padding: 20px;

border: 2px solid black;

/* larghezza reale: 300 + 20 + 20 + 2 + 2 = 344px */

}
```

Per evitare questo comportamento, spesso poco intuitivo, CSS mette a disposizione la proprietà `box-sizing`.

```css
div {

box-sizing: border-box;

}
```

| Valore | Comportamento |
| ------ | -------------- |
| content-box | Valore predefinito; padding e border si aggiungono a width/height |
| border-box | Padding e border sono inclusi in width/height |

Con `box-sizing: border-box`, un elemento con `width: 300px`, padding e border manterrà una larghezza totale di 300 pixel.

---

## 15.11 Il reset universale del box-sizing

Data l'importanza di questa proprietà, è pratica comune applicarla a tutti gli elementi della pagina tramite il selettore universale, studiato nel Modulo M12.

```css
* {

box-sizing: border-box;

}
```

Questa regola viene generalmente inserita all'inizio di ogni foglio di stile professionale.

---

## 15.12 Le unità di misura

Oltre ai pixel, già incontrati nei moduli precedenti, CSS mette a disposizione numerose unità di misura.

| Unità | Tipo | Descrizione |
| ----- | ---- | ----------- |
| px | Assoluta | Valore fisso in pixel |
| % | Relativa | Percentuale rispetto all'elemento genitore |
| em | Relativa | Relativa alla dimensione del font dell'elemento |
| rem | Relativa | Relativa alla dimensione del font dell'elemento radice |
| vw | Relativa | 1% della larghezza della finestra del browser |
| vh | Relativa | 1% dell'altezza della finestra del browser |

```css
.contenitore {

width: 80%;

padding: 2em;

}

.hero {

height: 100vh;

}
```

Le unità relative sono particolarmente importanti per la progettazione responsive, che verrà approfondita nei Moduli M20 e M21.

---

## 15.13 L'outline

La proprietà `outline` disegna un contorno attorno all'elemento, visivamente simile al border, ma con una differenza fondamentale.

```css
input:focus {

outline: 2px solid blue;

}
```

A differenza del border, l'outline **non occupa spazio** nel Box Model e non influisce sulle dimensioni dell'elemento.

Per questo motivo, l'outline viene spesso utilizzato per evidenziare lo stato di focus di un elemento, senza alterarne il layout.

---

## 15.14 Ispezionare il Box Model con i DevTools

Come già accennato nel Modulo M11, i DevTools del browser permettono di analizzare in tempo reale ogni elemento della pagina.

Selezionando un elemento, i DevTools mostrano una rappresentazione grafica del suo Box Model, con i valori esatti di content, padding, border e margin.

Questo strumento è estremamente utile per individuare la causa di spaziature inattese o comportamenti anomali del layout.

---

## 15.15 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Box Model</title>

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<div class="card">

<h2>

Corso di CSS

</h2>

<p>

Un corso completo dedicato al linguaggio CSS.

</p>

</div>

</body>

</html>
```

File `css/style.css`.

```css
* {

box-sizing: border-box;

}

body {

margin: 0;

padding: 40px;

background-color: #f4f4f4;

}

.card {

width: 300px;

margin: 0 auto;

padding: 20px;

border: 2px solid darkblue;

border-radius: 10px;

background-color: white;

}

.card h2 {

margin-bottom: 10px;

color: darkblue;

}
```

Questo esempio applica in un unico elemento tutte le aree del Box Model, insieme al reset universale di `box-sizing`.

---

## Best Practice

✔ Applicare sempre `box-sizing: border-box` all'inizio del foglio di stile.

✔ Utilizzare `margin: 0 auto` per centrare orizzontalmente elementi a larghezza fissa.

✔ Preferire le unità relative (`%`, `rem`, `vw`, `vh`) per un layout più flessibile.

✔ Utilizzare i DevTools per verificare le dimensioni reali di ogni elemento.

✔ Tenere presente il collasso dei margin quando si distanziano elementi verticali.

---

## Errori comuni

❌ Dimenticare l'impostazione di `box-sizing: border-box`.

❌ Confondere margin e padding.

❌ Sorprendersi del collasso dei margin senza comprenderne la causa.

❌ Rimuovere l'outline senza fornire un'alternativa visiva per il focus, penalizzando l'accessibilità.

❌ Utilizzare esclusivamente pixel, senza considerare unità relative.

---

## Curiosità

Prima dell'introduzione diffusa di `box-sizing: border-box`, i CSS Reset come **Reset CSS** e **Normalize.css** erano ampiamente utilizzati proprio per uniformare il comportamento del Box Model tra i diversi browser.

---

<a id="m16"></a>

# M16 — Margin, Padding e Border
**⬆️ [Torna all'Indice](#indice)**

## 16.1 Introduzione

Nel Modulo M15 abbiamo introdotto il Box Model e le quattro aree fondamentali di ogni elemento: content, padding, border e margin.

Questo modulo non ripete quei concetti di base, ma li **approfondisce**, mostrando tecniche, varianti e casi pratici che si incontrano frequentemente nello sviluppo reale.

Se alcuni concetti risultano poco chiari, è consigliabile rivedere prima il Modulo M15.

---

## 16.2 Ripasso rapido della sintassi abbreviata

Prima di procedere, ricordiamo brevemente la sintassi a quattro valori, già vista in M15, che riguarda sia `margin` sia `padding`.

```css
div {

margin: 10px 20px 10px 20px;

/* sopra destra sotto sinistra */

}
```

Questa sintassi verrà utilizzata frequentemente negli esempi successivi.

---

## 16.3 I margini negativi

A differenza del padding, che accetta solo valori positivi, il margin può assumere anche **valori negativi**.

```css
.sovrapposto {

margin-top: -20px;

}
```

Un margin negativo avvicina l'elemento ai suoi vicini, fino a farlo sovrapporre parzialmente.

Questa tecnica viene utilizzata, ad esempio, per creare effetti di sovrapposizione tra immagini e testo, oppure per correggere piccoli disallineamenti.

L'uso dei margini negativi va comunque dosato con attenzione, poiché può rendere il layout più fragile e difficile da mantenere.

---

## 16.4 Il margin auto avanzato

Nel Modulo M15 abbiamo visto come `margin: 0 auto` permetta di centrare orizzontalmente un elemento a larghezza fissa.

Il valore `auto` può però essere applicato anche ad un solo lato, per ottenere effetti di allineamento molto utili.

```css
nav {

display: flex;

}

.logo {

margin-right: auto;

}
```

In questo esempio, il logo verrà spinto verso sinistra, mentre lo spazio rimanente verrà "assorbito" dal margin destro impostato su `auto`, spingendo gli altri elementi verso destra.

Questa tecnica, che richiede la proprietà `display: flex`, verrà approfondita nel Modulo M18 dedicato a Flexbox.

---

## 16.5 Spaziatura tra elementi: margin o gap

Per distanziare più elementi tra loro, è possibile utilizzare il margin su ciascun elemento.

```css
.card {

margin-bottom: 20px;

}
```

Questo approccio, tuttavia, richiede attenzione al collasso dei margin, già studiato in M15, e può risultare poco pratico quando gli elementi sono disposti con Flexbox o Grid.

In quei contesti, come vedremo nei Moduli M18 e M19, è generalmente preferibile la proprietà `gap`, che distanzia automaticamente gli elementi senza margini da gestire manualmente su ciascuno di essi.

```css
.contenitore {

display: flex;

gap: 20px;

}
```

Per ora è sufficiente sapere che questa alternativa esiste; la utilizzeremo attivamente più avanti.

---

## 16.6 Bordi differenziati per lato

Nel Modulo M15 abbiamo visto la sintassi di base di `border`.

È possibile applicare stili completamente diversi a ciascun lato di un elemento.

```css
div {

border-top: 4px solid darkblue;

border-right: 1px dashed gray;

border-bottom: 4px solid darkblue;

border-left: 1px dashed gray;

}
```

Questa tecnica viene spesso utilizzata per creare effetti grafici, come schede evidenziate o elementi con un bordo di accento su un solo lato.

```css
.avviso {

border-left: 5px solid orange;

padding-left: 15px;

}
```

---

## 16.7 Il border-image

Oltre ai colori pieni, CSS permette di utilizzare un'immagine come bordo di un elemento, tramite la proprietà `border-image`.

```css
div {

border: 10px solid transparent;

border-image: url("img/bordo.png") 30 round;

}
```

Questa proprietà è avanzata e poco utilizzata nei progetti didattici, ma è utile sapere che esiste per progetti grafici particolarmente elaborati.

---

## 16.8 Le ombre con box-shadow

La proprietà `box-shadow` permette di aggiungere un'ombra attorno all'elemento, spesso utilizzata insieme al bordo per aumentare la profondità visiva.

```css
.card {

box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

}
```

I valori, nell'ordine, rappresentano: spostamento orizzontale, spostamento verticale, sfocatura e colore dell'ombra.

| Parametro | Descrizione |
| ---------- | ----------- |
| offset-x | Spostamento orizzontale dell'ombra |
| offset-y | Spostamento verticale dell'ombra |
| blur-radius | Grado di sfocatura |
| color | Colore dell'ombra, spesso in RGBA |

È possibile applicare anche un'ombra interna, tramite la parola chiave `inset`.

```css
input {

box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);

}
```

---

## 16.9 Bordi e spaziatura nelle tabelle

Come studiato nel Modulo M8, le tabelle HTML possiedono un comportamento particolare per quanto riguarda i bordi.

Per impostazione predefinita, ogni cella possiede un proprio bordo separato, generando un doppio bordo tra celle adiacenti.

```css
table {

border-collapse: collapse;

}

th, td {

border: 1px solid black;

}
```

La proprietà `border-collapse: collapse` unisce i bordi adiacenti in un'unica linea, ottenendo un aspetto più pulito.

In alternativa, `border-spacing` permette di controllare lo spazio tra le celle quando i bordi non sono uniti.

```css
table {

border-collapse: separate;

border-spacing: 8px;

}
```

---

## 16.10 L'outline e il focus-visible

Nel Modulo M15 abbiamo visto che l'outline non occupa spazio nel Box Model.

Questa caratteristica lo rende ideale per evidenziare lo stato di focus di elementi interattivi, come i campi di un form.

```css
button:focus-visible {

outline: 3px solid orange;

outline-offset: 2px;

}
```

La pseudo-classe `:focus-visible`, più moderna rispetto a `:focus`, applica lo stile solamente quando il focus è generato da tastiera, evitando di mostrarlo inutilmente durante un semplice click del mouse.

La proprietà `outline-offset` permette inoltre di allontanare l'outline dal bordo dell'elemento.

---

## 16.11 Un pattern pratico: la scheda (card)

Combinando margin, padding, border, border-radius e box-shadow, è possibile realizzare uno dei componenti più utilizzati nel Web design moderno: la **card**.

```css
.card {

padding: 20px;

margin: 20px auto;

border: 1px solid #dddddd;

border-radius: 8px;

box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

transition: box-shadow 0.3s;

}

.card:hover {

box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);

}
```

La proprietà `transition`, che verrà approfondita in un modulo successivo, permette in questo caso di animare dolcemente il cambiamento dell'ombra al passaggio del mouse.

---

## 16.12 Debug delle spaziature

Una tecnica molto diffusa tra gli sviluppatori per individuare rapidamente problemi di spaziatura consiste nell'applicare temporaneamente un outline a tutti gli elementi della pagina.

```css
* {

outline: 1px solid red;

}
```

Poiché, come visto in M15, l'outline non altera il layout, questa tecnica permette di visualizzare i confini di ogni elemento senza modificare le dimensioni della pagina.

Questa regola va naturalmente rimossa prima della pubblicazione del sito.

---

## 16.13 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>Margin, Padding e Border</title>

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<div class="avviso">

Attenzione: leggere attentamente le istruzioni del corso.

</div>

<div class="card">

<h2>

Modulo M16

</h2>

<p>

Margin, Padding e Border applicati insieme.

</p>

</div>

</body>

</html>
```

File `css/style.css`.

```css
* {

box-sizing: border-box;

}

body {

font-family: Arial, sans-serif;

padding: 40px;

background-color: #f4f4f4;

}

.avviso {

border-left: 5px solid orange;

background-color: #fff8e1;

padding: 15px 20px;

margin-bottom: 30px;

}

.card {

max-width: 400px;

margin: 0 auto;

padding: 20px;

border: 1px solid #dddddd;

border-radius: 8px;

box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

transition: box-shadow 0.3s;

}

.card:hover {

box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);

}
```

Questo esempio riunisce un box di avviso con bordo di accento e una card con ombra, entrambi costruiti a partire dalle proprietà studiate in questo modulo.

---

## Best Practice

✔ Usare i margini negativi con parsimonia e solo quando necessario.

✔ Preferire `gap` a `margin` per distanziare elementi in Flexbox o Grid.

✔ Utilizzare `border-collapse: collapse` per tabelle dall'aspetto pulito.

✔ Preferire `:focus-visible` a `:focus` per uno stile più coerente con l'interazione da tastiera.

✔ Rimuovere sempre eventuali regole di debug, come l'outline universale, prima della pubblicazione.

---

## Errori comuni

❌ Abusare dei margini negativi, rendendo il layout fragile.

❌ Dimenticare `border-collapse` in una tabella con bordi doppi indesiderati.

❌ Confondere `box-shadow` con `border` come strumento di delimitazione visiva.

❌ Rimuovere completamente l'outline senza fornire un'alternativa per il focus da tastiera.

❌ Lasciare regole di debug, come l'outline rosso universale, nel codice pubblicato.

---

## Curiosità

La tecnica della "card", introdotta in questo modulo, è diventata talmente diffusa nel Web design moderno da essere considerata uno dei componenti fondamentali del **Material Design**, il linguaggio visivo sviluppato da Google e adottato da moltissime applicazioni e siti Web.

---

<a id="m17"></a>

# M17 — Display
**⬆️ [Torna all'Indice](#indice)**

## 17.1 Introduzione

La proprietà `display` è una delle proprietà CSS più importanti in assoluto.

Determina **come** un elemento viene disposto all'interno della pagina, influenzando il modo in cui occupa spazio e si relaziona con gli elementi circostanti.

Ogni elemento HTML possiede un valore di `display` predefinito, ma questo valore può sempre essere modificato tramite CSS.

Questo modulo analizza i valori fondamentali di `display`, preparando il terreno per Flexbox e Grid, argomenti dei Moduli M18 e M19.

---

## 17.2 Il valore block

Un elemento con `display: block` possiede le seguenti caratteristiche.

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

## 17.3 Il valore inline

Un elemento con `display: inline` possiede caratteristiche opposte rispetto al block.

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

## 17.4 Il valore inline-block

Il valore `inline-block` unisce alcune caratteristiche di entrambi i comportamenti precedenti.

- non inizia su una nuova riga, come un elemento inline;
- accetta `width`, `height`, `margin` e `padding` su tutti i lati, come un elemento block.

```css
.pulsante {

display: inline-block;

width: 150px;

padding: 10px;

}
```

Questo valore è molto utilizzato per creare pulsanti ed elementi di navigazione disposti in orizzontale, ma con dimensioni controllabili.

---

## 17.5 Tabella comparativa

| Caratteristica | block | inline | inline-block |
| --------------- | ----- | ------ | ------------- |
| Nuova riga | Sì | No | No |
| Accetta width/height | Sì | No | Sì |
| Accetta margin verticale | Sì | No (non influenza il layout) | Sì |
| Accetta padding verticale | Sì | Sì (visivamente, ma non sposta gli altri elementi) | Sì |
| Esempio di tag predefinito | div, p, h1 | span, a, strong | Nessuno (va impostato) |

---

## 17.6 Il valore none e la proprietà visibility

Il valore `display: none` rimuove completamente l'elemento dal flusso della pagina.

```css
.nascosto {

display: none;

}
```

L'elemento non viene visualizzato, e lo spazio che avrebbe occupato viene recuperato dagli elementi circostanti.

Una proprietà diversa, `visibility: hidden`, nasconde l'elemento mantenendo però lo spazio occupato.

| Proprietà | Elemento visibile | Spazio occupato |
| --------- | ------------------- | ----------------- |
| display: none | No | No |
| visibility: hidden | No | Sì |

```css
.invisibile {

visibility: hidden;

}
```

La scelta tra le due proprietà dipende dal risultato visivo desiderato.

---

## 17.7 Il display predefinito degli elementi HTML

Ogni browser applica automaticamente un valore di `display` predefinito a ciascun tag HTML, definito da un foglio di stile interno chiamato **user agent stylesheet**.

| Tag | Display predefinito |
| --- | --------------------- |
| div, p, h1-h6, ul, li, section | block |
| span, a, strong, em, img | inline |
| table | table |
| li (all'interno di ul) | list-item |

È importante ricordare che questi valori sono solamente predefiniti, e possono sempre essere modificati tramite CSS.

---

## 17.8 Cambiare il display di un elemento

È del tutto legittimo, e molto comune, modificare il valore di `display` predefinito di un tag.

```css
li {

display: inline-block;

}
```

Questa tecnica viene spesso utilizzata per trasformare un elenco verticale, come un menu di navigazione, in un elenco disposto orizzontalmente.

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

Questi due valori trasformano l'elemento in un **contenitore di layout**, modificando radicalmente il comportamento dei suoi elementi figli.

A differenza dei valori visti finora, `flex` e `grid` non descrivono il comportamento del singolo elemento, ma introducono un intero sistema di regole per organizzare gli elementi al suo interno.

Per questo motivo meritano una trattazione dedicata, che troverai rispettivamente nei Moduli M18 e M19.

---

## 17.10 Esempio pratico completo

File `index.html`.

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

<a href="#" class="pulsante">

Scopri di più

</a>

</body>

</html>
```

File `css/style.css`.

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

## Best Practice

✔ Conoscere il display predefinito di ogni tag prima di modificarlo.

✔ Utilizzare `inline-block` per pulsanti e collegamenti con dimensioni controllate.

✔ Preferire `display: none` quando l'elemento non deve occupare spazio.

✔ Preferire `visibility: hidden` quando lo spazio deve essere mantenuto.

✔ Valutare `flex` o `grid` quando è necessario organizzare più elementi in un layout complesso.

---

## Errori comuni

❌ Applicare `width` o `height` ad un elemento inline, aspettandosi un effetto che non si verifica.

❌ Confondere `display: none` con `visibility: hidden`.

❌ Utilizzare `<div>` per elementi che dovrebbero essere semanticamente inline, o viceversa.

❌ Dimenticare che `<li>` possiede un display predefinito `list-item`, con il proprio marcatore.

❌ Usare margin e padding verticali su elementi inline aspettandosi che spostino gli elementi circostanti.

---

## Curiosità

Prima della diffusione di Flexbox e Grid, la disposizione orizzontale di elementi come i menu di navigazione veniva realizzata quasi esclusivamente tramite `display: inline-block` oppure tramite la proprietà `float`, oggi utilizzata molto raramente per la costruzione di layout.

---

<a id="m18"></a>

# M18 — Flexbox
**⬆️ [Torna all'Indice](#indice)**

## 18.1 Introduzione

Nel Modulo M17 abbiamo accennato a `display: flex`, definendolo come un valore capace di trasformare un elemento in un **contenitore di layout**.

Flexbox, abbreviazione di **Flexible Box Layout**, è un sistema pensato per disporre elementi lungo una singola direzione, orizzontale o verticale, distribuendo automaticamente lo spazio disponibile tra di essi.

Prima di Flexbox, ottenere layout come menu orizzontali perfettamente allineati, colonne di uguale altezza o elementi centrati verticalmente richiedeva tecniche complesse e poco affidabili.

Flexbox risolve questi problemi in modo semplice e prevedibile, ed è oggi uno degli strumenti più utilizzati nello sviluppo Web moderno.

---

## 18.2 Attivare Flexbox: contenitore e item

Flexbox coinvolge sempre due livelli distinti.

| Ruolo | Descrizione |
| ----- | ----------- |
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

Nel momento in cui si applica `display: flex` al contenitore, tutti i suoi figli diretti diventano automaticamente flex item, disponendosi di default in riga, uno accanto all'altro.

---

## 18.3 L'asse principale e l'asse trasversale

Il concetto più importante da comprendere in Flexbox è la presenza di **due assi**.

| Asse | Descrizione |
| ----- | ----------- |
| Asse principale (main axis) | La direzione lungo cui si dispongono gli item |
| Asse trasversale (cross axis) | La direzione perpendicolare all'asse principale |

Per impostazione predefinita, l'asse principale è orizzontale, e l'asse trasversale è verticale.

Come vedremo tra poco, la proprietà `flex-direction` permette di invertire questa relazione.

Comprendere quale proprietà agisce su quale asse è la chiave per non confondersi con Flexbox.

---

## 18.4 flex-direction

La proprietà `flex-direction`, applicata al container, stabilisce la direzione dell'asse principale.

```css
.container {

display: flex;

flex-direction: row;

}
```

| Valore | Effetto |
| ------ | ------- |
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

Quando `flex-direction` è impostato su `column`, l'asse principale diventa verticale, e l'asse trasversale diventa orizzontale.

---

## 18.5 flex-wrap

Per impostazione predefinita, Flexbox cerca di disporre tutti gli item su un'unica riga (o colonna), anche a costo di restringerli eccessivamente.

La proprietà `flex-wrap` permette di consentire agli item di andare a capo quando lo spazio non è sufficiente.

```css
.container {

display: flex;

flex-wrap: wrap;

}
```

| Valore | Effetto |
| ------ | ------- |
| nowrap | Nessun a capo (valore predefinito) |
| wrap | Gli item vanno a capo se necessario |
| wrap-reverse | Gli item vanno a capo in ordine inverso |

---

## 18.6 flex-flow

La proprietà `flex-flow` è la forma abbreviata che riunisce `flex-direction` e `flex-wrap` in un'unica dichiarazione.

```css
.container {

display: flex;

flex-flow: row wrap;

}
```

---

## 18.7 justify-content

La proprietà `justify-content`, applicata al container, controlla l'allineamento degli item lungo l'**asse principale**.

```css
.container {

display: flex;

justify-content: center;

}
```

| Valore | Effetto |
| ------ | ------- |
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

Questa proprietà è probabilmente una delle più utilizzate in assoluto, ad esempio per distribuire logo e collegamenti in una barra di navigazione.

---

## 18.8 align-items

La proprietà `align-items`, applicata al container, controlla l'allineamento degli item lungo l'**asse trasversale**.

```css
.container {

display: flex;

align-items: center;

}
```

| Valore | Effetto |
| ------ | ------- |
| stretch | Gli item si allungano per riempire il container (valore predefinito) |
| flex-start | Allineati all'inizio dell'asse trasversale |
| flex-end | Allineati alla fine dell'asse trasversale |
| center | Centrati sull'asse trasversale |
| baseline | Allineati in base alla linea di base del testo |

Combinando `justify-content: center` e `align-items: center`, è possibile centrare perfettamente un elemento sia orizzontalmente che verticalmente, uno dei problemi storicamente più complessi in CSS.

```css
.centrato {

display: flex;

justify-content: center;

align-items: center;

height: 100vh;

}
```

---

## 18.9 align-content

Quando è attivo `flex-wrap: wrap` e sono presenti più righe di item, la proprietà `align-content` controlla la distribuzione delle righe lungo l'asse trasversale.

```css
.container {

display: flex;

flex-wrap: wrap;

align-content: space-between;

}
```

Questa proprietà accetta valori simili a `justify-content`, ma agisce sulle righe nel loro insieme, non sui singoli item.

Se è presente una sola riga di item, `align-content` non produce alcun effetto visibile.

---

## 18.10 La proprietà gap

Come anticipato nel Modulo M16, la proprietà `gap` permette di distanziare gli item senza dover applicare margin su ciascuno di essi singolarmente.

```css
.container {

display: flex;

gap: 20px;

}
```

È possibile specificare separatamente lo spazio tra righe e tra colonne.

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

## 18.11 Le proprietà applicate ai flex item

Le proprietà viste finora si applicano al container.

Esistono inoltre proprietà che si applicano direttamente ai singoli flex item.

### 18.11.1 order

La proprietà `order` permette di modificare l'ordine visivo di un item, senza modificare l'ordine nel codice HTML.

```css
.item-primo {

order: -1;

}
```

Tutti gli item possiedono un valore `order` predefinito pari a 0; valori più bassi vengono visualizzati prima, valori più alti dopo.

### 18.11.2 flex-grow

La proprietà `flex-grow` stabilisce quanto un item debba espandersi per occupare lo spazio disponibile in eccesso.

```css
.item {

flex-grow: 1;

}
```

Se tutti gli item possiedono `flex-grow: 1`, lo spazio disponibile viene distribuito in parti uguali.

Se un item possiede `flex-grow: 2`, occuperà il doppio dello spazio in eccesso rispetto agli altri.

### 18.11.3 flex-shrink

La proprietà `flex-shrink` stabilisce quanto un item debba restringersi quando lo spazio disponibile non è sufficiente.

```css
.item {

flex-shrink: 0;

}
```

Un valore di `flex-shrink: 0` impedisce all'item di restringersi, anche quando gli altri item vengono compressi.

### 18.11.4 flex-basis

La proprietà `flex-basis` stabilisce la dimensione di partenza di un item, prima che vengano applicati `flex-grow` o `flex-shrink`.

```css
.item {

flex-basis: 200px;

}
```

`flex-basis` si comporta in modo simile a `width` (o `height`, se l'asse principale è verticale), ma possiede una priorità specifica all'interno del sistema Flexbox.

### 18.11.5 La forma abbreviata flex

Le tre proprietà precedenti possono essere riunite nella forma abbreviata `flex`.

```css
.item {

flex: 1 1 200px;

/* flex-grow flex-shrink flex-basis */

}
```

Una combinazione molto comune è `flex: 1`, equivalente a `flex: 1 1 0%`, che fa sì che tutti gli item con questa dichiarazione occupino uno spazio uguale, indipendentemente dal loro contenuto.

### 18.11.6 align-self

La proprietà `align-self` permette di sovrascrivere, per un singolo item, il valore di `align-items` impostato sul container.

```css
.item-speciale {

align-self: flex-end;

}
```

---

## 18.12 Riepilogo: proprietà del container e degli item

| Proprietà | Applicata a | Effetto |
| --------- | ------------ | ------- |
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

## 18.13 Esempio pratico completo

File `index.html`.

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

<div class="logo">

GCPROF Academy

</div>

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

File `css/style.css`.

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

Questo esempio riunisce una barra di navigazione con `justify-content: space-between` e una griglia flessibile di card che si adatta automaticamente allo spazio disponibile.

---

## Best Practice

✔ Utilizzare Flexbox per layout monodimensionali, ovvero disposti su una sola riga o colonna.

✔ Preferire `gap` a `margin` per distanziare gli item.

✔ Utilizzare `flex: 1` per far occupare spazio uguale a più item.

✔ Combinare `justify-content` e `align-items` per centrare elementi in entrambe le direzioni.

✔ Utilizzare `flex-wrap: wrap` quando il numero di item non è prevedibile a priori.

---

## Errori comuni

❌ Confondere l'asse principale con l'asse trasversale dopo aver cambiato `flex-direction`.

❌ Dimenticare `display: flex` sul container, aspettandosi che le proprietà Flexbox funzionino comunque.

❌ Applicare proprietà come `justify-content` direttamente sugli item, invece che sul container.

❌ Utilizzare Flexbox per layout bidimensionali complessi, dove Grid, trattato nel Modulo M19, risulta più adatto.

❌ Dimenticare `flex-wrap: wrap`, causando item eccessivamente compressi su schermi piccoli.

---

## Curiosità

Flexbox è stato pubblicato come raccomandazione ufficiale del **W3C** nel 2017, ma la sua adozione diffusa da parte degli sviluppatori è avvenuta molto rapidamente, tanto da renderlo oggi uno degli strumenti CSS più utilizzati al mondo, insieme a Grid, argomento del prossimo modulo.

---

<a id="m19"></a>

# M19 — CSS Grid
**⬆️ [Torna all'Indice](#indice)**

## 19.1 Introduzione

Nel Modulo M18 abbiamo studiato Flexbox, un sistema pensato per disporre elementi lungo una **singola direzione**.

CSS Grid, al contrario, è un sistema pensato per costruire layout **bidimensionali**, controllando contemporaneamente righe e colonne.

Grazie a Grid è possibile definire l'intera struttura di una pagina, o di una sezione complessa, con poche righe di codice, senza dover ricorrere a soluzioni artificiose.

Flexbox e Grid non sono in competizione: nella pratica professionale vengono spesso utilizzati insieme, ciascuno per lo scopo più adatto, come vedremo alla fine del modulo.

---

## 19.2 Attivare Grid: contenitore e item

Come per Flexbox, anche Grid coinvolge un container ed i suoi item.

```html
<div class="griglia">

<div class="cella">1</div>

<div class="cella">2</div>

<div class="cella">3</div>

<div class="cella">4</div>

</div>
```

```css
.griglia {

display: grid;

}
```

A differenza di Flexbox, applicare `display: grid` senza ulteriori proprietà non produce ancora un effetto visibile evidente: è necessario definire esplicitamente la struttura della griglia.

---

## 19.3 grid-template-columns

La proprietà `grid-template-columns` definisce il numero e la larghezza delle colonne della griglia.

```css
.griglia {

display: grid;

grid-template-columns: 200px 200px 200px;

}
```

In questo esempio la griglia possiede tre colonne, ciascuna larga 200 pixel.

---

## 19.4 grid-template-rows

In modo analogo, `grid-template-rows` definisce l'altezza delle righe della griglia.

```css
.griglia {

display: grid;

grid-template-columns: 200px 200px;

grid-template-rows: 100px 100px;

}
```

Se `grid-template-rows` non viene specificato, le righe vengono generate automaticamente in base al contenuto, come vedremo nella sezione dedicata alla griglia implicita.

---

## 19.5 La funzione repeat()

Scrivere manualmente lo stesso valore più volte, come nell'esempio precedente, risulta poco pratico con un numero elevato di colonne.

La funzione `repeat()` permette di semplificare la sintassi.

```css
.griglia {

display: grid;

grid-template-columns: repeat(3, 200px);

}
```

Questa dichiarazione è perfettamente equivalente a `grid-template-columns: 200px 200px 200px`.

---

## 19.6 L'unità fr

Grid introduce una nuova unità di misura, `fr` (fraction), che rappresenta una **frazione dello spazio disponibile** all'interno del container.

```css
.griglia {

display: grid;

grid-template-columns: 1fr 1fr 1fr;

}
```

In questo esempio, lo spazio disponibile viene suddiviso in tre colonne di uguale larghezza.

È possibile assegnare proporzioni differenti.

```css
.griglia {

display: grid;

grid-template-columns: 2fr 1fr 1fr;

}
```

In questo caso, la prima colonna occuperà il doppio dello spazio rispetto alle altre due.

L'unità `fr` può inoltre essere combinata con valori fissi.

```css
.griglia {

display: grid;

grid-template-columns: 250px 1fr;

}
```

Questa combinazione è molto comune per creare layout con una barra laterale a larghezza fissa e un contenuto principale flessibile.

---

## 19.7 La proprietà gap in Grid

Come già visto per Flexbox nel Modulo M18, anche in Grid la proprietà `gap` permette di distanziare gli elementi, in questo caso righe e colonne.

```css
.griglia {

display: grid;

grid-template-columns: repeat(3, 1fr);

gap: 20px;

}
```

È possibile specificare separatamente lo spazio tra righe e tra colonne.

```css
.griglia {

row-gap: 20px;

column-gap: 10px;

}
```

---

## 19.8 grid-template-areas e grid-area

Una delle caratteristiche più potenti di Grid è la possibilità di **nominare** le aree della griglia, per poi posizionare gli elementi facendo riferimento al nome anziché a numeri di riga o colonna.

```css
.pagina {

display: grid;

grid-template-columns: 200px 1fr;

grid-template-rows: auto 1fr auto;

grid-template-areas:

"header header"

"sidebar main"

"footer footer";

}
```

Ogni elemento figlio viene quindi associato ad un'area tramite la proprietà `grid-area`.

```css
header {

grid-area: header;

}

aside {

grid-area: sidebar;

}

main {

grid-area: main;

}

footer {

grid-area: footer;

}
```

Questa tecnica rende il codice CSS estremamente leggibile, poiché la struttura della pagina è visibile direttamente nella dichiarazione di `grid-template-areas`.

---

## 19.9 Posizionare gli item con le linee della griglia

In alternativa alle aree nominate, è possibile posizionare gli item facendo riferimento alle **linee numerate** della griglia.

```css
.griglia {

display: grid;

grid-template-columns: repeat(4, 1fr);

}

.elemento-largo {

grid-column: 1 / 3;

}
```

In questo esempio, `grid-column: 1 / 3` indica che l'elemento deve estendersi dalla prima linea verticale alla terza, occupando quindi due colonne.

La stessa logica si applica alle righe, tramite `grid-row`.

```css
.elemento-alto {

grid-row: 1 / 3;

}
```

È inoltre possibile utilizzare la parola chiave `span`, per indicare quante colonne o righe un elemento deve occupare, senza specificare le linee esatte.

```css
.elemento-largo {

grid-column: span 2;

}
```

---

## 19.10 justify-items e align-items in Grid

Come in Flexbox, anche Grid offre proprietà per l'allineamento, ma con un significato leggermente diverso, poiché in Grid si lavora su due assi contemporaneamente.

```css
.griglia {

display: grid;

justify-items: center;

align-items: center;

}
```

| Proprietà | Effetto |
| --------- | ------- |
| justify-items | Allinea il contenuto di ogni cella sull'asse orizzontale |
| align-items | Allinea il contenuto di ogni cella sull'asse verticale |

I valori accettati sono simili a quelli già visti in Flexbox: `start`, `end`, `center`, `stretch`.

---

## 19.11 justify-content e align-content in Grid

Quando la griglia occupa uno spazio inferiore rispetto al container, `justify-content` e `align-content` controllano la posizione dell'**intera griglia** all'interno del container.

```css
.griglia {

display: grid;

grid-template-columns: repeat(3, 100px);

justify-content: center;

}
```

Questa proprietà è concettualmente simile a `justify-content` in Flexbox, ma agisce sull'insieme delle colonne o delle righe, non sui singoli item.

---

## 19.12 justify-self e align-self

Le proprietà `justify-self` e `align-self`, applicate al singolo item, permettono di sovrascrivere per quell'elemento il valore impostato da `justify-items` e `align-items` sul container.

```css
.elemento-speciale {

justify-self: end;

align-self: start;

}
```

---

## 19.13 minmax() e auto-fit/auto-fill

Uno degli utilizzi più efficaci di Grid consiste nella creazione di griglie **responsive** senza l'uso di Media Query, argomento del Modulo M21.

La funzione `minmax()` definisce un intervallo di dimensioni accettabili per una colonna.

```css
.griglia {

display: grid;

grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

gap: 20px;

}
```

In questo esempio, il browser calcola automaticamente quante colonne di almeno 200 pixel possono essere disposte nello spazio disponibile, distribuendo poi lo spazio in eccesso tra di esse.

| Valore | Comportamento |
| ------ | -------------- |
| auto-fill | Crea tutte le colonne possibili, anche se vuote |
| auto-fit | Crea solo le colonne necessarie, espandendo quelle esistenti |

Questa tecnica è estremamente diffusa per griglie di card o prodotti che devono adattarsi automaticamente a schermi di dimensioni diverse.

---

## 19.14 La griglia implicita

Quando il numero di elementi supera il numero di righe o colonne esplicitamente definite, Grid genera automaticamente righe o colonne aggiuntive, chiamate **griglia implicita**.

La proprietà `grid-auto-rows` permette di controllare l'altezza di queste righe generate automaticamente.

```css
.griglia {

display: grid;

grid-template-columns: repeat(3, 1fr);

grid-auto-rows: 150px;

}
```

La proprietà `grid-auto-flow` controlla invece la direzione in cui vengono generati automaticamente nuovi elementi.

```css
.griglia {

grid-auto-flow: row;

/* oppure: column */

}
```

---

## 19.15 Flexbox o Grid: quale scegliere

Questa è una delle domande più frequenti tra chi studia il layout CSS.

| Situazione | Strumento consigliato |
| ----------- | ------------------------ |
| Disposizione su una sola riga o colonna | Flexbox |
| Layout bidimensionale (righe e colonne insieme) | Grid |
| Menu di navigazione | Flexbox |
| Struttura generale della pagina | Grid |
| Contenuto di lunghezza variabile e imprevedibile | Flexbox |
| Griglia di elementi di dimensione regolare | Grid |

Nella pratica, è molto comune utilizzare Grid per la struttura generale della pagina, e Flexbox per organizzare il contenuto all'interno delle singole aree.

---

## 19.16 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>CSS Grid</title>

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<div class="pagina">

<header>

GCPROF Academy

</header>

<aside>

Menu laterale

</aside>

<main>

<div class="griglia-corsi">

<div class="card">HTML</div>

<div class="card">CSS</div>

<div class="card">JavaScript</div>

<div class="card">Python</div>

</div>

</main>

<footer>

© 2026 GCPROF Academy

</footer>

</div>

</body>

</html>
```

File `css/style.css`.

```css
* {

box-sizing: border-box;

}

body {

margin: 0;

font-family: Arial, sans-serif;

}

.pagina {

display: grid;

grid-template-columns: 200px 1fr;

grid-template-rows: auto 1fr auto;

grid-template-areas:

"header header"

"sidebar main"

"footer footer";

min-height: 100vh;

}

header {

grid-area: header;

background-color: darkblue;

color: white;

padding: 15px 30px;

}

aside {

grid-area: sidebar;

background-color: #f0f0f0;

padding: 20px;

}

main {

grid-area: main;

padding: 20px;

}

footer {

grid-area: footer;

background-color: #333333;

color: white;

text-align: center;

padding: 10px;

}

.griglia-corsi {

display: grid;

grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

gap: 20px;

}

.card {

background-color: #e8e8e8;

padding: 20px;

border-radius: 8px;

text-align: center;

}
```

Questo esempio utilizza Grid per la struttura generale della pagina, tramite `grid-template-areas`, e nuovamente Grid con `auto-fit` e `minmax()` per una griglia responsive di card, mostrando concretamente la potenza di questo strumento.

---

## Best Practice

✔ Utilizzare Grid per la struttura generale della pagina.

✔ Utilizzare `grid-template-areas` per layout leggibili e facilmente modificabili.

✔ Preferire l'unità `fr` a percentuali o pixel fissi per colonne flessibili.

✔ Utilizzare `auto-fit` con `minmax()` per griglie responsive senza Media Query.

✔ Combinare Grid per la struttura e Flexbox per il contenuto interno.

---

## Errori comuni

❌ Dimenticare di definire `grid-template-columns` o `grid-template-rows`, ottenendo un risultato inaspettato.

❌ Utilizzare Grid anche per semplici disposizioni monodimensionali, dove Flexbox sarebbe più adatto.

❌ Scrivere `grid-template-areas` con un numero di celle non coerente con `grid-template-columns`.

❌ Confondere `justify-content` (posizione dell'intera griglia) con `justify-items` (allineamento dentro le celle).

❌ Dimenticare le virgolette attorno a ciascuna riga in `grid-template-areas`.

---

## Curiosità

CSS Grid è considerato uno dei sistemi di layout più avanzati mai introdotti nel Web, tanto da essere descritto dallo stesso W3C come il primo vero sistema di layout **bidimensionale nativo** del linguaggio CSS, a differenza di tutte le tecniche precedenti, comprese le tabelle e Flexbox.

---

<a id="m20"></a>

# M20 — Responsive Design
**⬆️ [Torna all'Indice](#indice)**

## 20.1 Introduzione

Fino a pochi anni fa, la maggior parte dei siti Web veniva progettata pensando esclusivamente allo schermo di un computer.

Oggi, invece, uno stesso sito viene visitato da smartphone, tablet, notebook, monitor desktop e persino televisori, ciascuno con dimensioni dello schermo molto diverse tra loro.

Il **Responsive Design** è l'insieme di tecniche che permette ad un sito Web di adattarsi automaticamente a qualsiasi dimensione di schermo, garantendo una buona esperienza d'uso a tutti gli utenti.

Questo modulo introduce i principi e le tecniche fondamentali del Responsive Design, mentre il Modulo M21 approfondirà nello specifico le Media Query.

---

## 20.2 Perché il Responsive Design è indispensabile

Secondo le statistiche più recenti sul traffico Web, la maggioranza degli utenti naviga da dispositivi mobili.

Un sito non responsive, su uno smartphone, obbliga l'utente a zoomare continuamente e a scorrere orizzontalmente il contenuto, con un'esperienza d'uso decisamente negativa.

Per questo motivo, oggi il Responsive Design non è più considerato un'opzione, ma un requisito indispensabile di qualsiasi progetto Web professionale.

---

## 20.3 Il viewport meta tag

Il primo passo fondamentale per realizzare un sito responsive avviene già in HTML, tramite un tag inserito nell'`<head>` del documento.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Senza questo tag, i browser mobili tendono a visualizzare la pagina come se fosse su un desktop, per poi ridurla proporzionalmente, rendendo di fatto inefficace qualsiasi tecnica responsive applicata in CSS.

| Parametro | Significato |
| ---------- | ----------- |
| width=device-width | La larghezza della pagina corrisponde alla larghezza reale del dispositivo |
| initial-scale=1.0 | Il livello di zoom iniziale è impostato al 100% |

Questo tag dovrebbe essere presente in **ogni** pagina HTML realizzata da questo momento in poi.

---

## 20.4 Layout fisso e layout fluido

Un **layout fisso** utilizza dimensioni espresse in valori assoluti, come i pixel.

```css
.contenitore {

width: 960px;

}
```

Un layout fisso mantiene sempre la stessa larghezza, indipendentemente dalle dimensioni dello schermo, risultando inadeguato sui dispositivi più piccoli.

Un **layout fluido**, al contrario, utilizza unità relative, adattandosi automaticamente allo spazio disponibile.

```css
.contenitore {

width: 90%;

max-width: 960px;

margin: 0 auto;

}
```

In questo esempio, il contenitore occupa il 90% della larghezza disponibile, ma non supera mai i 960 pixel, garantendo un buon equilibrio tra flessibilità e leggibilità.

---

## 20.5 Le unità relative come base del Responsive Design

Come già visto nel Modulo M15, le unità relative sono uno degli strumenti principali per realizzare layout adattabili.

| Unità | Utilizzo tipico nel Responsive Design |
| ----- | ---------------------------------------- |
| % | Larghezze fluide rispetto al genitore |
| rem | Dimensioni di testo coerenti in tutta la pagina |
| vw / vh | Elementi proporzionati alla finestra del browser |

```css
.hero {

height: 100vh;

padding: 5vw;

}
```

L'uso sistematico di unità relative, al posto dei soli pixel, rappresenta il primo passo concreto verso un sito realmente responsive.

---

## 20.6 Immagini responsive

Un'immagine con dimensioni fisse rischia di traboccare dal proprio contenitore su schermi piccoli.

La regola più semplice ed efficace per rendere un'immagine responsive è la seguente.

```css
img {

max-width: 100%;

height: auto;

}
```

In questo modo, l'immagine non supererà mai la larghezza del proprio contenitore, mantenendo automaticamente le proporzioni originali grazie a `height: auto`.

---

## 20.7 L'attributo srcset

Per progetti più avanzati, HTML mette a disposizione l'attributo `srcset`, che permette di offrire al browser diverse versioni della stessa immagine, in modo che venga scaricata solamente quella più adatta alle dimensioni dello schermo dell'utente.

```html
<img

src="img/corso-small.jpg"

srcset="img/corso-small.jpg 480w, img/corso-large.jpg 1200w"

sizes="(max-width: 600px) 100vw, 50vw"

alt="Corso di Web Programming">
```

Questa tecnica, sebbene più complessa rispetto alla semplice regola `max-width: 100%`, migliora significativamente le prestazioni del sito, evitando di scaricare immagini inutilmente pesanti sui dispositivi mobili.

---

## 20.8 Tipografia fluida con clamp()

Oltre alle dimensioni dei contenitori, anche il testo dovrebbe adattarsi allo schermo.

La funzione CSS `clamp()` permette di definire un valore minimo, un valore preferito e un valore massimo per una proprietà.

```css
h1 {

font-size: clamp(1.5rem, 4vw, 3rem);

}
```

In questo esempio, la dimensione del titolo non sarà mai inferiore a `1.5rem` né superiore a `3rem`, e varierà in modo fluido in base alla larghezza della finestra, espressa da `4vw`.

Questa tecnica, chiamata **tipografia fluida**, evita bruschi cambi di dimensione ed è oggi molto apprezzata nei progetti moderni.

---

## 20.9 Approccio Mobile-First e Desktop-First

Esistono due filosofie principali per progettare un sito responsive.

| Approccio | Descrizione |
| ---------- | ----------- |
| Desktop-first | Si progetta prima la versione desktop, poi si adatta ai dispositivi più piccoli |
| Mobile-first | Si progetta prima la versione mobile, poi si arricchisce per gli schermi più grandi |

L'approccio **Mobile-first** è oggi considerato la pratica raccomandata, per due motivi principali.

- la maggior parte del traffico Web proviene da dispositivi mobili;
- partire da un layout semplice e poi aggiungere complessità è generalmente più semplice del percorso inverso.

Il Modulo M21 mostrerà concretamente come implementare l'approccio Mobile-first tramite le Media Query.

---

## 20.10 Il concetto di breakpoint

Un **breakpoint** è una larghezza di schermo in corrispondenza della quale il layout del sito cambia struttura, per adattarsi meglio allo spazio disponibile.

```
Smartphone -----|-------- Tablet --------|-------- Desktop
              576px                    992px
```

I breakpoint più comuni, sebbene non esistano valori universali obbligatori, sono generalmente collocati attorno a queste larghezze.

| Dispositivo indicativo | Larghezza indicativa |
| ------------------------ | ------------------------ |
| Smartphone | fino a 576px |
| Tablet | 576px – 992px |
| Desktop | oltre 992px |

La definizione tecnica dei breakpoint, tramite la regola `@media`, verrà trattata nel dettaglio nel Modulo M21.

---

## 20.11 Flexbox e Grid come strumenti responsive nativi

Come accennato nei Moduli M18 e M19, Flexbox e Grid non richiedono necessariamente le Media Query per adattarsi allo spazio disponibile.

```css
.griglia-corsi {

display: grid;

grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

gap: 20px;

}
```

Questa tecnica, già vista nel Modulo M19, permette alla griglia di riorganizzarsi automaticamente in un numero variabile di colonne, senza scrivere alcuna Media Query.

Allo stesso modo, `flex-wrap: wrap`, studiato nel Modulo M18, consente agli item di andare a capo automaticamente quando lo spazio si riduce.

Questi strumenti rappresentano un primo livello di responsività, spesso sufficiente per layout semplici, prima di ricorrere alle Media Query per adattamenti più specifici.

---

## 20.12 Testare la responsività

I DevTools del browser, già introdotti nel Modulo M11, includono uno strumento specifico per testare il Responsive Design, generalmente chiamato **Device Toolbar** o **modalità responsive**.

Questo strumento permette di:

- simulare le dimensioni di smartphone e tablet reali;
- ridimensionare liberamente la finestra del browser;
- verificare il comportamento del sito a diverse larghezze.

Testare regolarmente il proprio sito con questo strumento, durante lo sviluppo e non solo alla fine, è una delle abitudini più importanti da acquisire.

---

## 20.13 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Responsive Design</title>

<link rel="stylesheet" href="css/style.css">

</head>

<body>

<header>

<h1>

GCPROF Academy

</h1>

</header>

<main>

<div class="griglia-corsi">

<div class="card">

<img src="img/html.jpg" alt="Corso HTML">

<h2>HTML</h2>

</div>

<div class="card">

<img src="img/css.jpg" alt="Corso CSS">

<h2>CSS</h2>

</div>

<div class="card">

<img src="img/javascript.jpg" alt="Corso JavaScript">

<h2>JavaScript</h2>

</div>

</div>

</main>

</body>

</html>
```

File `css/style.css`.

```css
* {

box-sizing: border-box;

}

body {

margin: 0;

font-family: Arial, sans-serif;

}

header {

padding: 5vw;

background-color: darkblue;

color: white;

text-align: center;

}

header h1 {

font-size: clamp(1.5rem, 5vw, 3rem);

margin: 0;

}

main {

padding: 20px;

}

.griglia-corsi {

display: grid;

grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

gap: 20px;

}

.card {

padding: 15px;

background-color: #f4f4f4;

border-radius: 8px;

text-align: center;

}

.card img {

max-width: 100%;

height: auto;

border-radius: 4px;

}
```

Questo esempio riunisce viewport meta tag, tipografia fluida con `clamp()`, immagini responsive e una griglia con `auto-fit`, senza ricorrere ad alcuna Media Query.

---

## Best Practice

✔ Inserire sempre il viewport meta tag in ogni pagina.

✔ Costruire il layout con unità relative fin dall'inizio del progetto.

✔ Applicare `max-width: 100%` a tutte le immagini della pagina.

✔ Adottare un approccio Mobile-first, quando possibile.

✔ Sfruttare le capacità responsive native di Flexbox e Grid prima di ricorrere a soluzioni più complesse.

✔ Testare regolarmente il sito con la Device Toolbar dei DevTools.

---

## Errori comuni

❌ Dimenticare il viewport meta tag.

❌ Costruire l'intero layout con valori fissi in pixel.

❌ Utilizzare immagini di dimensioni eccessive rispetto allo spazio realmente occupato sullo schermo.

❌ Progettare esclusivamente per desktop, testando la versione mobile solo alla fine del progetto.

❌ Affidarsi esclusivamente alle Media Query, ignorando le capacità responsive native di Flexbox e Grid.

---

## Curiosità

Il termine "Responsive Web Design" venne coniato nel 2010 dal designer statunitense **Ethan Marcotte**, in un celebre articolo pubblicato sul sito *A List Apart*, considerato ancora oggi uno dei testi fondativi di questa disciplina.

---

<a id="m21"></a>

# M21 — Media Queries
**⬆️ [Torna all'Indice](#indice)**

## 21.1 Introduzione

Nel Modulo M20 abbiamo introdotto i principi del Responsive Design, insieme al concetto di **breakpoint**.

Le **Media Query** sono lo strumento CSS che permette di applicare regole di stile differenti in base alle caratteristiche del dispositivo che sta visualizzando la pagina, prima fra tutte la larghezza dello schermo.

Grazie alle Media Query, uno stesso foglio di stile può adattare completamente l'aspetto del sito a seconda che venga consultato da uno smartphone, da un tablet o da un monitor desktop.

Questo modulo mostra la sintassi e le tecniche pratiche per utilizzarle correttamente.

---

## 21.2 La sintassi di base

Una Media Query si scrive tramite la regola `@media`, seguita da una condizione e da un blocco di regole CSS.

```css
@media (max-width: 600px) {

body {

background-color: lightyellow;

}

}
```

In questo esempio, lo sfondo della pagina diventerà giallo chiaro solamente quando la larghezza della finestra del browser sarà pari o inferiore a 600 pixel.

Le regole scritte all'interno di una Media Query si applicano **in aggiunta** a quelle già presenti nel foglio di stile, seguendo le normali regole di cascata e specificità già studiate nei Moduli M11 e M12.

---

## 21.3 min-width e max-width

Le due condizioni più utilizzate nelle Media Query riguardano la larghezza dello schermo.

| Condizione | Significato |
| ----------- | ----------- |
| max-width | Si applica quando lo schermo è pari o inferiore al valore indicato |
| min-width | Si applica quando lo schermo è pari o superiore al valore indicato |

```css
@media (min-width: 768px) {

.griglia-corsi {

grid-template-columns: repeat(2, 1fr);

}

}
```

```css
@media (max-width: 767px) {

.griglia-corsi {

grid-template-columns: 1fr;

}

}
```

È possibile combinare `min-width` e `max-width` per definire un intervallo preciso.

```css
@media (min-width: 576px) and (max-width: 991px) {

.sidebar {

display: none;

}

}
```

---

## 21.4 Breakpoint comuni

Riprendendo la tabella introdotta nel Modulo M20, ecco come tradurre quei valori indicativi in vere Media Query.

| Dispositivo indicativo | Larghezza indicativa | Media Query |
| ------------------------ | ------------------------ | ------------- |
| Smartphone | fino a 576px | `@media (max-width: 576px)` |
| Tablet | 576px – 992px | `@media (min-width: 577px) and (max-width: 992px)` |
| Desktop | oltre 992px | `@media (min-width: 993px)` |

È importante ribadire che questi valori sono indicativi, e non regole fisse imposte dal linguaggio CSS.

Il criterio corretto per scegliere un breakpoint non è "a quale larghezza corrisponde un iPhone", ma **a quale larghezza il layout smette di funzionare bene**.

---

## 21.5 L'approccio Mobile-first in pratica

Come anticipato nel Modulo M20, l'approccio Mobile-first consiste nello scrivere prima lo stile base per i dispositivi più piccoli, per poi aggiungere progressivamente regole con `min-width` man mano che lo schermo si allarga.

```css
.griglia-corsi {

display: grid;

grid-template-columns: 1fr;

gap: 15px;

}

@media (min-width: 576px) {

.griglia-corsi {

grid-template-columns: repeat(2, 1fr);

}

}

@media (min-width: 992px) {

.griglia-corsi {

grid-template-columns: repeat(3, 1fr);

gap: 20px;

}

}
```

In questo esempio, la griglia parte da una singola colonna, per poi diventare a due colonne oltre i 576px, e a tre colonne oltre i 992px.

Questo approccio, basato esclusivamente su `min-width`, è oggi considerato la pratica raccomandata nello sviluppo professionale.

---

## 21.6 L'approccio Desktop-first, per confronto

L'approccio opposto, meno raccomandato ma ancora diffuso in alcuni progetti, parte dallo stile desktop e utilizza `max-width` per adattarsi verso il basso.

```css
.griglia-corsi {

display: grid;

grid-template-columns: repeat(3, 1fr);

gap: 20px;

}

@media (max-width: 992px) {

.griglia-corsi {

grid-template-columns: repeat(2, 1fr);

}

}

@media (max-width: 576px) {

.griglia-corsi {

grid-template-columns: 1fr;

}

}
```

Il risultato visivo può essere identico all'esempio precedente, ma l'ordine logico con cui viene scritto e ragionato il codice è invertito.

---

## 21.7 Combinare più condizioni con and

L'operatore `and` permette di unire più condizioni all'interno della stessa Media Query, come già visto per l'intervallo `min-width`/`max-width`.

```css
@media (min-width: 768px) and (orientation: landscape) {

.hero {

height: 60vh;

}

}
```

Tutte le condizioni collegate da `and` devono essere vere contemporaneamente affinché le regole vengano applicate.

---

## 21.8 Condizioni alternative con la virgola

Quando invece è sufficiente che **una qualsiasi** delle condizioni sia vera, è possibile separarle con una virgola, che in questo contesto si comporta come un "oppure".

```css
@media (max-width: 576px), (orientation: portrait) {

.sidebar {

display: none;

}

}
```

In questo esempio, la sidebar verrà nascosta se lo schermo è stretto, oppure se il dispositivo è orientato in verticale, indipendentemente dalla sua larghezza.

---

## 21.9 La condizione orientation

La condizione `orientation` permette di distinguere tra dispositivo in verticale e in orizzontale, indipendentemente dalla larghezza effettiva in pixel.

```css
@media (orientation: portrait) {

.galleria {

grid-template-columns: 1fr;

}

}

@media (orientation: landscape) {

.galleria {

grid-template-columns: repeat(3, 1fr);

}

}
```

Questa condizione è particolarmente utile per tablet e smartphone, il cui orientamento può cambiare in qualsiasi momento durante la navigazione.

---

## 21.10 prefers-color-scheme: la modalità scura

Le Media Query non si limitano alle dimensioni dello schermo, ma permettono di rilevare anche alcune **preferenze di sistema** dell'utente.

La condizione `prefers-color-scheme` rileva se l'utente ha attivato la modalità scura a livello di sistema operativo o browser.

```css
body {

background-color: white;

color: black;

}

@media (prefers-color-scheme: dark) {

body {

background-color: #121212;

color: #f0f0f0;

}

}
```

Questa tecnica permette di offrire automaticamente una versione scura del sito, senza richiedere alcuna azione esplicita da parte dell'utente.

---

## 21.11 Media Query per la stampa

Oltre al tipo `screen`, implicito nella maggior parte degli esempi precedenti, esiste anche il tipo `print`, utilizzato per definire uno stile specifico per la stampa della pagina.

```css
@media print {

nav, footer, .pulsante {

display: none;

}

body {

color: black;

font-size: 12pt;

}

}
```

Questa tecnica è utile per nascondere elementi di navigazione e pulsanti non necessari quando l'utente stampa una pagina, ad esempio un articolo o un attestato.

---

## 21.12 Dove scrivere le Media Query

Esistono due approcci principali per organizzare le Media Query all'interno di un progetto.

| Approccio | Descrizione |
| ---------- | ----------- |
| Per componente | Ogni Media Query viene scritta subito dopo lo stile base dell'elemento a cui si riferisce |
| In fondo al file | Tutte le Media Query vengono raggruppate alla fine del foglio di stile |

```css
.card {

padding: 20px;

}

@media (max-width: 576px) {

.card {

padding: 10px;

}

}
```

L'approccio "per componente" è generalmente preferibile nei progetti didattici e di piccole-medie dimensioni, poiché mantiene vicino nel codice tutto ciò che riguarda uno stesso elemento, facilitando la manutenzione.

---

## 21.13 Esempio pratico completo

File `index.html`.

```html
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Media Queries</title>

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

<main class="griglia-corsi">

<div class="card">HTML</div>

<div class="card">CSS</div>

<div class="card">JavaScript</div>

</main>

</body>

</html>
```

File `css/style.css`.

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

flex-direction: column;

padding: 15px;

background-color: darkblue;

color: white;

}

.navbar nav {

display: flex;

flex-direction: column;

gap: 10px;

margin-top: 10px;

}

.navbar nav a {

color: white;

text-decoration: none;

}

.griglia-corsi {

display: grid;

grid-template-columns: 1fr;

gap: 15px;

padding: 20px;

}

.card {

padding: 20px;

background-color: #f4f4f4;

border-radius: 8px;

text-align: center;

}

@media (min-width: 576px) {

.navbar {

flex-direction: row;

justify-content: space-between;

align-items: center;

}

.navbar nav {

flex-direction: row;

margin-top: 0;

}

.griglia-corsi {

grid-template-columns: repeat(2, 1fr);

}

}

@media (min-width: 992px) {

.griglia-corsi {

grid-template-columns: repeat(3, 1fr);

gap: 20px;

}

}
```

Questo esempio applica l'approccio Mobile-first: la navbar e la griglia partono impilate su una colonna, per poi trasformarsi in una disposizione orizzontale e in una griglia a più colonne man mano che la larghezza dello schermo aumenta.

---

## Best Practice

✔ Adottare un approccio Mobile-first, utilizzando prevalentemente `min-width`.

✔ Scegliere i breakpoint in base al contenuto, non in base a dispositivi specifici.

✔ Mantenere le Media Query vicine allo stile del componente a cui si riferiscono.

✔ Utilizzare `prefers-color-scheme` per offrire una modalità scura automatica.

✔ Prevedere uno stile dedicato per la stampa nei documenti destinati anche alla stampa.

---

## Errori comuni

❌ Mescolare senza criterio `min-width` e `max-width` nello stesso progetto.

❌ Definire troppi breakpoint, complicando inutilmente la manutenzione del codice.

❌ Scegliere breakpoint basati su modelli di smartphone specifici, presto superati.

❌ Dimenticare il viewport meta tag, vanificando l'effetto delle Media Query.

❌ Scrivere Media Query duplicate o in conflitto tra loro nello stesso foglio di stile.

---

## Curiosità

Le Media Query CSS3, alla base di tutto questo modulo, sono state formalizzate come raccomandazione del **W3C** nel 2012, pochi anni prima della definitiva affermazione del paradigma Mobile-first come standard dell'industria del Web.

---