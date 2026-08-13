# 🌐 MODULO 5 — HTML Semantico e Progetto Finale HTML

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Web Programming Base — HTML5 & CSS3

---

## Cosa imparerai in questo modulo

In questo modulo imparerai a superare l'uso indiscriminato del tag `<div>` per abbracciare l'**HTML semantico**: gli elementi introdotti da HTML5 che descrivono il significato delle diverse parti di una pagina — intestazione, menu di navigazione, contenuto principale, sezioni, articoli, contenuti secondari e piè di pagina. Capirai perché la semantica non è un vezzo stilistico, ma un requisito concreto per l'accessibilità e per il posizionamento sui motori di ricerca. Il modulo si chiude con il primo grande traguardo del corso: il **Progetto Finale HTML**, un sito Web multipagina completo che mette insieme tutto quanto imparato dal Modulo 1 al Modulo 5, prima di passare, dal Modulo 6 in poi, alla parte dedicata interamente al CSS.

---

<a id="indice-modulo"></a>

## Indice del Modulo 5

- [10.1 Perché l'HTML semantico](#101-perche-lhtml-semantico)
- [10.2 `<header>` e `<nav>`](#102-header-e-nav)
- [10.3 `<main>`, `<section>` e `<article>`](#103-main-section-e-article)
- [10.4 `<aside>`](#104-aside)
- [10.5 `<footer>`](#105-footer)
- [10.6 `<div>` e `<span>`: quando usarli ancora](#106-div-e-span-quando-usarli-ancora)
- [10.7 Struttura semantica completa di una pagina](#107-struttura-semantica-completa-di-una-pagina)
- [10.8 Esempio completo](#108-esempio-completo)
- [Progetto Finale HTML: Sito Web Multipagina Completo](#progetto-finale-html-sito-web-multipagina-completo)
- [Esercizi del Modulo 5](#esercizi-del-modulo-5)
- [Riepilogo del Modulo 5](#riepilogo-del-modulo-5)

---

<a id="101-perche-lhtml-semantico"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.1 Perché l'HTML semantico

Fino a HTML4, chi costruiva pagine Web utilizzava quasi esclusivamente il tag `<div>` per ogni tipo di contenitore: intestazioni, menu, colonne, piè di pagina. Il codice funzionava, ma non comunicava **alcun significato**: un `<div>` con `id="header"` è comprensibile per un umano che legge il codice sorgente, ma resta un contenitore generico e privo di significato per un browser, per uno screen reader o per un motore di ricerca.

HTML5 ha introdotto un insieme di **elementi semantici**: tag che, oltre a contenere elementi come farebbe un `<div>`, ne dichiarano esplicitamente il ruolo all'interno della pagina.

| Vantaggio | Descrizione |
| --- | --- |
| Accessibilità | Gli screen reader possono "saltare" direttamente al menu di navigazione o al contenuto principale |
| SEO | I motori di ricerca comprendono meglio quale parte della pagina è il contenuto rilevante |
| Manutenibilità | Il codice risulta più leggibile: un `<footer>` si riconosce a colpo d'occhio, un `<div class="footer">` no |

> 💡 **Approfondimento** — La semantica non cambia in alcun modo l'aspetto visivo della pagina: un `<header>` non ha, di per sé, uno stile diverso da un `<div>`. Il vantaggio è interamente strutturale e di significato: sarà il CSS, a partire dal Modulo 6, a occuparsi dell'aspetto grafico.

---

<a id="102-header-e-nav"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.2 `<header>` e `<nav>`

Il tag `<header>` rappresenta l'intestazione di una pagina o di una sezione: tipicamente contiene il logo, il titolo del sito e il menu di navigazione.

Il tag `<nav>` racchiude i collegamenti di navigazione principali del sito.

```html
<header>
  <h1>GCProf Academy</h1>
  <nav>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="corsi.html">Corsi</a></li>
      <li><a href="contatti.html">Contatti</a></li>
    </ul>
  </nav>
</header>
```

> ⚠️ **Attenzione** — `<nav>` non va usato per qualunque gruppo di link presente in pagina, ma solo per i blocchi di navigazione principali (menu di testata, menu di piè di pagina, indice di un articolo). Un singolo link isolato dentro il testo di un paragrafo resta un normale `<a>`, non va racchiuso in `<nav>`.

---

<a id="103-main-section-e-article"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.3 `<main>`, `<section>` e `<article>`

Il tag `<main>` racchiude il contenuto principale della pagina, quello univoco per quella specifica pagina (esclude quindi header, nav, footer e contenuti ripetuti su più pagine). **Deve comparire una sola volta per pagina.**

Il tag `<section>` rappresenta una sezione tematica autonoma, generalmente introdotta da un titolo.

Il tag `<article>` rappresenta un contenuto **autosufficiente**, che avrebbe senso anche se estratto e pubblicato altrove: un post di blog, una notizia, una scheda prodotto, un commento.

```html
<main>
  <section>
    <h2>I nostri corsi</h2>
    <article>
      <h3>Web Programming Base</h3>
      <p>Impara HTML5 e CSS3 da zero.</p>
    </article>
    <article>
      <h3>Master in Intelligenza Artificiale</h3>
      <p>Un percorso completo su AI, Machine Learning e sistemi agentici.</p>
    </article>
  </section>
</main>
```

> 💡 **Approfondimento** — Un buon criterio pratico per distinguere `<section>` da `<article>`: chiediti "questo contenuto avrebbe ancora senso compiuto se lo estraessi dalla pagina e lo pubblicassi da solo?". Se la risposta è sì (una notizia, una recensione, un post), è un `<article>`. Se invece ha senso solo all'interno del contesto della pagina che lo circonda, è una `<section>`.

---

<a id="104-aside"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.4 `<aside>`

Il tag `<aside>` rappresenta un contenuto correlato ma secondario rispetto al contenuto principale: una barra laterale, un box di approfondimento, pubblicità, link correlati.

```html
<aside>
  <h3>Corsi correlati</h3>
  <ul>
    <li><a href="ai.html">Master in Intelligenza Artificiale</a></li>
    <li><a href="blockchain.html">Master in Blockchain & Web3</a></li>
  </ul>
</aside>
```

---

<a id="105-footer"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.5 `<footer>`

Il tag `<footer>` rappresenta il piè di pagina di una pagina o di una sezione: tipicamente contiene copyright, link legali, contatti, e a volte un secondo menu di navigazione.

```html
<footer>
  <p>&copy; 2026 GCProf Academy. Tutti i diritti riservati.</p>
  <nav>
    <a href="privacy.html">Privacy</a>
    <a href="contatti.html">Contatti</a>
  </nav>
</footer>
```

---

<a id="106-div-e-span-quando-usarli-ancora"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.6 `<div>` e `<span>`: quando usarli ancora

L'introduzione degli elementi semantici non rende `<div>` e `<span>` obsoleti: restano indispensabili quando serve un contenitore **puramente strutturale o grafico**, privo di un significato semantico specifico da comunicare (ad esempio un wrapper per applicare uno stile CSS a un gruppo di elementi che non corrisponde a nessuna delle categorie semantiche viste finora).

| Situazione | Tag consigliato |
| --- | --- |
| Menu di navigazione | `<nav>` |
| Contenuto principale unico della pagina | `<main>` |
| Contenitore generico solo per motivi di stile o layout | `<div>` |
| Porzione di testo in linea da stilizzare | `<span>` |

La regola pratica è semplice: **prima chiediti se esiste un tag semantico appropriato**; solo se la risposta è no, ricorri a `<div>` o `<span>`.

---

<a id="107-struttura-semantica-completa-di-una-pagina"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.7 Struttura semantica completa di una pagina

Mettendo insieme tutti gli elementi visti, la struttura semantica "tipo" di una pagina Web moderna è la seguente:

```
<body>
  <header>
    <nav>...</nav>
  </header>

  <main>
    <section>
      <article>...</article>
      <article>...</article>
    </section>
    <aside>...</aside>
  </main>

  <footer>...</footer>
</body>
```

Questo scheletro, da solo, comunica immediatamente — a chi legge il codice, a uno screen reader e a un motore di ricerca — l'organizzazione logica dell'intera pagina, ancora prima di leggerne il contenuto testuale.

---

<a id="108-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 10.8 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>GCProf Academy</title>
</head>
<body>

    <header>
        <h1>GCProf Academy</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="corsi.html">Corsi</a></li>
                <li><a href="contatti.html">Contatti</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>I nostri corsi</h2>
            <article>
                <h3>Web Programming Base</h3>
                <p>Impara HTML5 e CSS3 da zero.</p>
            </article>
        </section>

        <aside>
            <h3>Corsi correlati</h3>
            <p><a href="ai.html">Master in Intelligenza Artificiale</a></p>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 GCProf Academy. Tutti i diritti riservati.</p>
    </footer>

</body>
</html>
```

---

## ✅ Best Practice

✔ Utilizzare sempre un solo `<main>` per pagina.

✔ Usare `<article>` solo per contenuti realmente autosufficienti.

✔ Ricorrere a `<div>` e `<span>` solo quando non esiste un elemento semantico appropriato.

✔ Mantenere una gerarchia di titoli coerente (`<h1>` → `<h2>` → `<h3>`) all'interno di ogni sezione semantica.

## ❌ Errori comuni

❌ Usare più di un `<main>` nella stessa pagina.

❌ Racchiudere in `<nav>` singoli link isolati nel testo, invece dei soli blocchi di navigazione principali.

❌ Continuare a costruire l'intera pagina con `<div>` annidati, ignorando gli elementi semantici disponibili.

❌ Confondere `<section>` e `<article>`: usare `<article>` per contenuti che hanno senso solo nel contesto della pagina che li circonda.

---

<a id="progetto-finale-html-sito-web-multipagina-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 🏆 Progetto Finale HTML: Sito Web Multipagina Completo

**Obiettivo:** questo è il progetto conclusivo dell'intera parte HTML del corso (Moduli 1-5). Dovrai costruire un sito Web multipagina completo, semanticamente corretto, che riutilizzi e combini **tutto** quanto imparato finora: struttura di base, liste, link, immagini, tabelle, form ed elementi semantici. Il progetto è volutamente ancora privo di stile grafico (il CSS arriva dal Modulo 6 in avanti): l'obiettivo qui è una struttura HTML pulita, corretta e ben organizzata.

**Struttura del progetto:**

```
sito-portfolio/
│
├── index.html
├── chi-sono.html
├── competenze.html
├── contatti.html
└── images/
      foto-profilo.jpg
      progetto1.jpg
```

**Requisiti del progetto:**

Il sito dovrà essere composto da **quattro pagine collegate tra loro**, tutte con la stessa intestazione (`<header>` con `<nav>`) e lo stesso piè di pagina (`<footer>`), e dovrà includere:

| Pagina | Contenuto richiesto |
| --- | --- |
| `index.html` | `<header>` con `<nav>` verso le altre 3 pagine; `<main>` con una sezione di benvenuto e un'immagine con `<figure>`/`<figcaption>`; `<footer>` |
| `chi-sono.html` | Testo biografico in `<article>`, una lista non ordinata delle proprie competenze, un `<aside>` con link correlati |
| `competenze.html` | Una tabella (con `<thead>`/`<tbody>`) che elenca competenze e livello di padronanza |
| `contatti.html` | Un form completo (nome, email, messaggio) con `<label>`, `<fieldset>` e validazione nativa; un link `mailto:` e un link `tel:` |

**Consegna:** costruisci le quattro pagine rispettando la struttura semantica vista nel paragrafo 10.7 (`<header>`, `<main>`, `<footer>`, e `<section>`/`<article>`/`<aside>` dove pertinente), assicurandoti che la navigazione tra le pagine funzioni correttamente in tutte le direzioni e che ogni immagine abbia un `alt` descrittivo. Questo sito costituirà la base su cui, dal Modulo 6 in poi, applicherai progressivamente il CSS.

---

<a id="esercizi-del-modulo-5"></a>

## 🧪 Esercizi del Modulo 5

1. **Trasforma i div** — Riprendi una pagina del tuo sito personale creata nei moduli precedenti e sostituisci i `<div>` generici con gli elementi semantici appropriati (`<header>`, `<nav>`, `<main>`, `<footer>`).
2. **Sezioni e articoli** — In una pagina a scelta, crea una `<section>` con titolo che contenga almeno due `<article>`, ciascuno con un proprio titolo e un breve testo.
3. **Barra laterale** — Aggiungi a una pagina un `<aside>` con almeno tre link correlati al contenuto principale.
4. **Verifica semantica** — Analizza una pagina di un sito reale che visiti abitualmente: prova a individuare, osservando il codice sorgente (tasto destro → "Visualizza sorgente pagina"), quali elementi semantici HTML5 utilizza.
5. **Progetto Finale HTML** — Completa il Progetto Finale del modulo, realizzando le quattro pagine del sito multipagina secondo i requisiti indicati.

---

<a id="riepilogo-del-modulo-5"></a>

## 📌 Riepilogo del Modulo 5

In questo modulo hai imparato:

- Perché l'HTML semantico è preferibile all'uso indiscriminato di `<div>`, per accessibilità, SEO e manutenibilità del codice.
- Come strutturare una pagina con `<header>` e `<nav>` per l'intestazione e la navigazione.
- Come organizzare il contenuto principale con `<main>`, `<section>` e `<article>`, distinguendo correttamente i tre elementi.
- Come rappresentare contenuti secondari con `<aside>` e il piè di pagina con `<footer>`.
- Quando `<div>` e `<span>` restano comunque strumenti utili e legittimi.
- Come comporre lo scheletro semantico completo di una pagina Web moderna.

Con il Progetto Finale HTML hai completato l'intera parte del corso dedicata alla struttura delle pagine Web. Da qui in avanti il percorso cambia decisamente marcia: dal **Modulo 6 — CSS: Fondamenta e Selettori**, il sito che hai appena costruito comincerà a prendere vita graficamente.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*