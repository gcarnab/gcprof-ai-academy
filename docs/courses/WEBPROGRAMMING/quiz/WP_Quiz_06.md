---
title: "WP - M6 - CSS: Fondamenta e Selettori"
description: "Quiz di verifica finale sui concetti chiave del Modulo 6: che cos'è il CSS, i tre modi per applicarlo, sintassi delle regole, selettori di tipo/classe/id, selettori combinatori, pseudo-classi e pseudo-elementi, cascata ed ereditarietà."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è, in modo corretto, lo scopo del CSS rispetto a HTML?
- [ ] A) Il CSS definisce la struttura del contenuto, l'HTML si occupa dell'aspetto grafico.
- [x] B) Il CSS definisce come il contenuto HTML viene visualizzato (colori, dimensioni, layout), non il contenuto stesso.
- [ ] C) Il CSS e l'HTML svolgono esattamente la stessa funzione.
- [ ] D) Il CSS serve solo a gestire il comportamento interattivo della pagina.

# Q2
Perché il CSS esterno, collegato con `<link>`, è generalmente preferibile rispetto al CSS inline?
- [ ] A) Perché è l'unico metodo che i browser moderni riconoscono.
- [x] B) Perché permette di aggiornare lo stile dell'intero sito modificando un solo file, condiviso da tutte le pagine.
- [ ] C) Perché il CSS inline non permette di usare colori.
- [ ] D) Perché il CSS esterno non richiede il tag `<head>`.

# Q3
Qual è la differenza corretta tra selettore di classe e selettore di id?
- [ ] A) Sono due sintassi diverse per ottenere esattamente lo stesso risultato, senza alcuna differenza pratica.
- [x] B) La classe può essere riutilizzata su più elementi diversi, mentre l'id deve essere univoco e riferirsi a un solo elemento nella pagina.
- [ ] C) L'id può essere usato su più elementi, la classe solo su uno.
- [ ] D) La classe si scrive con il cancelletto (`#`), l'id con il punto (`.`).

# Q4
Qual è la differenza tra il selettore `nav a` e il selettore `nav > a`?
- [ ] A) Sono equivalenti, non c'è alcuna differenza.
- [x] B) `nav a` colpisce tutti gli `<a>` discendenti a qualsiasi livello, `nav > a` colpisce solo gli `<a>` figli diretti di `<nav>`.
- [ ] C) `nav > a` colpisce tutti gli `<a>` della pagina, `nav a` solo quelli dentro `<nav>`.
- [ ] D) `nav a` funziona solo con le classi, `nav > a` solo con gli id.

# Q5
Che cosa fa la pseudo-classe `:hover`?
- [ ] A) Seleziona il primo figlio di un elemento genitore.
- [x] B) Applica uno stile quando il mouse si trova sopra l'elemento.
- [ ] C) Seleziona un elemento in base al suo attributo `id`.
- [ ] D) Inserisce contenuto generato prima dell'elemento.

# Q6
A cosa servono i pseudo-elementi `::before` e `::after`?
- [ ] A) A cambiare colore del testo al passaggio del mouse.
- [x] B) A inserire contenuto generato dal CSS rispettivamente prima o dopo il contenuto reale di un elemento, senza modificare l'HTML.
- [ ] C) A selezionare il primo e l'ultimo figlio di un elemento.
- [ ] D) A definire lo stato attivo di un campo di input.

# Q7
Considerando la specificità del CSS, quale tra i seguenti selettori ha la priorità maggiore su uno stesso elemento?
- [ ] A) Un selettore di tipo, come `p`.
- [ ] B) Un selettore di classe, come `.testo`.
- [x] C) Un selettore di id, come `#speciale`.
- [ ] D) Il selettore universale `*`.

# Q8
Perché `!important` va usato con grande parsimonia in un progetto CSS?
- [ ] A) Perché non è supportato dai browser moderni.
- [ ] B) Perché rallenta il caricamento della pagina.
- [x] C) Perché forza la priorità di una dichiarazione ignorando la normale specificità, rendendo il codice più difficile da mantenere e debuggare.
- [ ] D) Perché può essere usato solo con i selettori di id.

# OPEN
Spiega con parole tue che cos'è la cascata in CSS e come interagisce con la specificità dei selettori, facendo un esempio concreto (anche breve) di conflitto tra un selettore di tipo, uno di classe e uno di id sullo stesso elemento. Indica infine quale sarebbe, secondo te, un'alternativa preferibile all'uso di `!important` per risolvere un conflitto di stili.