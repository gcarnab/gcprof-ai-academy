---
title: "WP - M5 - HTML Semantico e Progetto Finale HTML"
description: "Quiz di verifica finale sui concetti chiave del Modulo 5: perché usare l'HTML semantico, header e nav, main/section/article, aside, footer, quando usare ancora div e span, struttura semantica completa di una pagina."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è il vantaggio principale dell'HTML semantico rispetto all'uso indiscriminato di `<div>`?
- [ ] A) Rende la pagina esteticamente più colorata senza bisogno di CSS.
- [x] B) Comunica il significato delle diverse parti della pagina a browser, screen reader e motori di ricerca, migliorando accessibilità e SEO.
- [ ] C) Elimina completamente la necessità di scrivere CSS.
- [ ] D) Velocizza automaticamente il caricamento della pagina.

# Q2
Quale regola vale per il tag `<main>` all'interno di una pagina HTML?
- [ ] A) Può essere usato più volte, una per ogni sezione della pagina.
- [x] B) Deve comparire una sola volta per pagina, e racchiude il contenuto univoco di quella pagina.
- [ ] C) Va usato solo all'interno del `<footer>`.
- [ ] D) Sostituisce completamente il tag `<body>`.

# Q3
Qual è il criterio corretto per distinguere `<article>` da `<section>`?
- [ ] A) `<article>` va usato solo per le immagini, `<section>` solo per il testo.
- [x] B) `<article>` rappresenta un contenuto autosufficiente, che avrebbe senso anche se estratto e pubblicato altrove; `<section>` ha senso solo nel contesto della pagina che lo circonda.
- [ ] C) Sono due nomi diversi per indicare esattamente lo stesso elemento.
- [ ] D) `<section>` può comparire una sola volta per pagina, `<article>` un numero illimitato di volte.

# Q4
Quando è corretto utilizzare il tag `<nav>`?
- [ ] A) Attorno a qualunque link presente in una pagina, anche isolato dentro un paragrafo.
- [x] B) Solo attorno ai blocchi di navigazione principali, come il menu di testata o il menu di piè di pagina.
- [ ] C) Solo all'interno del tag `<footer>`.
- [ ] D) Solo quando il sito ha più di dieci pagine.

# Q5
Che tipo di contenuto rappresenta correttamente il tag `<aside>`?
- [ ] A) Il contenuto principale e univoco della pagina.
- [ ] B) L'intestazione con il logo e il titolo del sito.
- [x] C) Un contenuto correlato ma secondario rispetto al contenuto principale, come una barra laterale o link correlati.
- [ ] D) Il piè di pagina con copyright e contatti.

# Q6
Qual è il criterio pratico corretto per decidere se usare un elemento semantico oppure `<div>`/`<span>`?
- [ ] A) Usare sempre `<div>`, indipendentemente dal contesto, per semplicità.
- [x] B) Verificare prima se esiste un tag semantico appropriato al ruolo del contenuto; ricorrere a `<div>`/`<span>` solo se la risposta è no.
- [ ] C) Usare `<div>` solo dentro `<header>` e `<span>` solo dentro `<footer>`.
- [ ] D) `<div>` e `<span>` sono ormai obsoleti e non vanno mai utilizzati in HTML5.

# Q7
Cosa contiene tipicamente il tag `<header>` di una pagina?
- [ ] A) Solo il testo del copyright.
- [x] B) Tipicamente il logo, il titolo del sito e il menu di navigazione.
- [ ] C) Esclusivamente immagini decorative.
- [ ] D) I campi di un form di contatto.

# Q8
Osservando lo scheletro semantico completo di una pagina (`<header>`, `<main>`, `<footer>`...), qual è l'affermazione corretta?
- [ ] A) `<footer>` deve sempre trovarsi dentro `<main>`.
- [ ] B) `<header>` e `<nav>` non possono mai comparire insieme nello stesso elemento.
- [x] C) Lo scheletro comunica l'organizzazione logica della pagina ancora prima di leggerne il contenuto testuale.
- [ ] D) `<aside>` deve sempre precedere `<header>` nel codice HTML.

# OPEN
Spiega con parole tue, con un esempio concreto a tua scelta, il criterio per distinguere quando usare `<article>` e quando usare `<section>`. Collega poi questa distinzione a un vantaggio pratico per l'accessibilità o per la SEO di una pagina Web.