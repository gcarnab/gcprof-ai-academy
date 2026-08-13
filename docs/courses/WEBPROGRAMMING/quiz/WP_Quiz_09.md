---
title: "WP - M9 - CSS Grid e Responsive Design"
description: "Quiz di verifica finale sui concetti chiave del Modulo 9: perché CSS Grid, l'unità fr e repeat(), posizionamento con grid-column/grid-row, grid-template-areas, Grid vs Flexbox, Responsive Design, meta tag viewport, Media Query e approccio mobile-first."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la principale differenza tra CSS Grid e Flexbox?
- [ ] A) Grid funziona solo nei browser mobili, Flexbox solo nei browser desktop.
- [x] B) Grid è pensato per layout bidimensionali (righe e colonne contemporaneamente), Flexbox per layout monodimensionali (una riga o una colonna alla volta).
- [ ] C) Flexbox può essere usato solo per il testo, Grid solo per le immagini.
- [ ] D) Non c'è alcuna differenza pratica tra i due strumenti.

# Q2
Che cosa rappresenta l'unità `fr` in `grid-template-columns`?
- [ ] A) Una dimensione fissa espressa in pixel.
- [x] B) Una frazione dello spazio disponibile nel contenitore.
- [ ] C) Il numero di righe della griglia.
- [ ] D) Il colore di sfondo delle celle della griglia.

# Q3
Osserva questa dichiarazione: `grid-column: 1 / 3;`. Quante colonne occupa correttamente l'elemento?
- [ ] A) Tre colonne, dalla prima alla terza.
- [x] B) Due colonne, perché i numeri indicano le linee della griglia (da 1 a 3), non il numero di celle.
- [ ] C) Una sola colonna, la terza.
- [ ] D) Nessuna colonna, la sintassi non è valida.

# Q4
Qual è il vantaggio principale di `grid-template-areas`?
- [x] A) Permette di disegnare l'intero layout della pagina come una mappa testuale leggibile, assegnando nomi alle aree e richiamandoli sui singoli elementi.
- [ ] B) Sostituisce completamente la necessità di usare `grid-template-columns`.
- [ ] C) Funziona solo se il contenitore ha esattamente due colonne.
- [ ] D) Riduce automaticamente il numero di elementi HTML necessari nella pagina.

# Q5
In quale situazione è generalmente più indicato usare CSS Grid invece di Flexbox?
- [ ] A) Per allineare i link di un singolo menu di navigazione.
- [x] B) Per costruire la struttura generale della pagina, con header, sidebar, main e footer posizionati in una griglia.
- [ ] C) Per centrare un solo elemento all'interno di un contenitore.
- [ ] D) Grid e Flexbox non possono mai essere usati nello stesso progetto.

# Q6
Perché il meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` è indispensabile in un sito responsive?
- [ ] A) Serve solo a migliorare la SEO del sito.
- [x] B) Senza di esso, molti browser mobili renderizzano la pagina come su uno schermo largo circa 980px per poi rimpicciolirla, vanificando l'effetto delle Media Query.
- [ ] C) Attiva automaticamente CSS Grid su tutte le pagine del sito.
- [ ] D) Sostituisce completamente la necessità di scrivere Media Query.

# Q7
In un approccio mobile-first, come vengono tipicamente scritte le Media Query?
- [ ] A) Sempre con `max-width`, per togliere stili man mano che lo schermo si restringe.
- [x] B) Sempre con `min-width`, per aggiungere progressivamente stili quando lo schermo diventa più grande.
- [ ] C) Senza alcuna condizione, applicandosi sempre a qualsiasi larghezza.
- [ ] D) Solo all'interno del tag `<head>`, mai in un file CSS esterno.

# Q8
Quale proprietà CSS, applicata alle immagini, ne impedisce il superamento della larghezza del proprio contenitore su schermi di dimensioni diverse?
- [ ] A) `min-width: 0;`
- [x] B) `max-width: 100%;`
- [ ] C) `width: 100vw;`
- [ ] D) `display: grid;`

# OPEN
Spiega con parole tue perché l'approccio mobile-first è oggi considerato la pratica standard nella progettazione responsive, facendo un esempio concreto di due Media Query scritte in questo approccio (ad esempio per tablet e per desktop). Collega infine questo approccio all'uso di `max-width: 100%` sulle immagini.