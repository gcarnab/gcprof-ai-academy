---
title: "WP - M3 - Liste, Link e Immagini"
description: "Quiz di verifica finale sui concetti chiave del Modulo 3: liste ordinate, non ordinate e di definizione, collegamenti ipertestuali, percorsi relativi e assoluti, sicurezza dei link esterni, ancore interne, immagini e didascalie semantiche."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quale tag va utilizzato quando l'ordine degli elementi di un elenco ha importanza logica, come in una procedura passo-passo?
- [ ] A) `<ul>`
- [x] B) `<ol>`
- [ ] C) `<dl>`
- [ ] D) `<li>`

# Q2
In una lista annidata, dove va inserito correttamente il tag `<ul>` (o `<ol>`) della lista interna?
- [ ] A) Subito dopo il tag `</li>` dell'elemento padre.
- [x] B) Dentro il tag `<li>` dell'elemento padre, prima della sua chiusura.
- [ ] C) Prima dell'apertura dell'intera lista `<ul>` esterna.
- [ ] D) Non è possibile inserire una lista dentro un'altra lista in HTML.

# Q3
Qual è l'attributo indispensabile del tag `<a>`, senza il quale il collegamento non porta da nessuna parte?
- [ ] A) `target`
- [ ] B) `rel`
- [x] C) `href`
- [ ] D) `title`

# Q4
Qual è il criterio corretto per scegliere tra percorso relativo e percorso assoluto in un link?
- [ ] A) Il percorso assoluto va usato sempre, anche per i link interni al proprio sito.
- [x] B) Il percorso relativo va usato per le pagine interne al proprio sito, il percorso assoluto per i siti esterni.
- [ ] C) Il percorso relativo va usato solo per le immagini, mai per i link.
- [ ] D) Non c'è alcuna differenza pratica tra i due tipi di percorso.

# Q5
Perché è buona norma aggiungere `rel="noopener noreferrer"` a un link con `target="_blank"`?
- [ ] A) Perché altrimenti il link non si aprirebbe in una nuova scheda.
- [ ] B) Perché è obbligatorio per la validità del codice HTML5.
- [x] C) Perché, senza questo attributo, la nuova pagina aperta potrebbe in teoria accedere ad alcune informazioni della pagina di origine tramite JavaScript.
- [ ] D) Perché rende il testo del link visibile anche agli screen reader.

# Q6
Come si crea correttamente un'ancora interna che porti a una sezione specifica della stessa pagina?
- [x] A) Assegnando un `id` alla sezione di destinazione, e facendo puntare `href` a quell'id preceduto da `#`.
- [ ] B) Utilizzando l'attributo `target="_self"` sul link.
- [ ] C) Racchiudendo la sezione di destinazione in un tag `<anchor>`.
- [ ] D) Non è possibile creare collegamenti interni alla stessa pagina in HTML.

# Q7
Perché l'attributo `alt` del tag `<img>` è così importante?
- [ ] A) Serve solo a mostrare un tooltip al passaggio del mouse.
- [x] B) Viene letto dagli screen reader, sostituisce l'immagine se non si carica, ed è utile per l'indicizzazione da parte dei motori di ricerca.
- [ ] C) Determina la larghezza e l'altezza dell'immagine.
- [ ] D) È necessario solo per le immagini in formato PNG.

# Q8
A cosa servono, in modo specifico, i tag `<figure>` e `<figcaption>`?
- [ ] A) A ridurre automaticamente il peso del file immagine.
- [ ] B) A sostituire l'attributo `alt` nelle immagini.
- [x] C) Ad associare in modo semantico un'immagine (o altro contenuto multimediale) a una didascalia.
- [ ] D) A trasformare un'immagine in un collegamento ipertestuale.

# OPEN
Spiega con parole tue la differenza tra un percorso relativo e un percorso assoluto in un link HTML, facendo un esempio concreto per ciascuno dei due casi. Collega poi questa distinzione a un vantaggio pratico dell'uso dei percorsi relativi per i link interni al proprio sito.