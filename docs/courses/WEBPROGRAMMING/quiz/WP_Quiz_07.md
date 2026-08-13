---
title: "WP - M7 - Tipografia e Box Model"
description: "Quiz di verifica finale sui concetti chiave del Modulo 7: proprietà tipografiche, unità di misura (px, em, rem, vw, vh), web font, Box Model, box-sizing, width/height/min/max, display block/inline/inline-block."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Perché in `font-family` è buona norma indicare una lista di alternative terminando con una famiglia generica (es. `sans-serif`)?
- [ ] A) Perché il CSS non permette di indicare un solo font.
- [x] B) Perché, se nessuno dei font specifici indicati è disponibile sul dispositivo dell'utente, il browser sceglierà comunque un carattere della stessa categoria estetica.
- [ ] C) Perché la famiglia generica aumenta la velocità di caricamento della pagina.
- [ ] D) Perché senza famiglia generica il testo non verrebbe visualizzato affatto.

# Q2
Qual è la differenza corretta tra le unità `em` e `rem`?
- [ ] A) Sono due nomi diversi per indicare esattamente la stessa unità di misura.
- [x] B) `em` è relativo al font-size dell'elemento genitore, `rem` è sempre relativo al font-size dell'elemento radice (`<html>`).
- [ ] C) `em` è un'unità assoluta, `rem` è un'unità relativa alla viewport.
- [ ] D) `rem` può essere usato solo per i margini, mai per il testo.

# Q3
A cosa serve la proprietà `line-height`?
- [ ] A) A definire la larghezza massima di un paragrafo.
- [x] B) A controllare l'altezza della riga, cioè l'interlinea del testo.
- [ ] C) A definire il colore di sfondo del testo.
- [ ] D) A trasformare il testo in maiuscolo.

# Q4
Che cosa permette di fare un servizio come Google Fonts?
- [ ] A) Ottimizzare automaticamente il peso delle immagini della pagina.
- [x] B) Caricare caratteri personalizzati direttamente dal Web, senza che l'utente li abbia installati sul proprio dispositivo.
- [ ] C) Convertire un sito da desktop a mobile automaticamente.
- [ ] D) Sostituire completamente la necessità di usare `font-family`.

# Q5
Nel Box Model, in quale ordine sono organizzati i quattro livelli concentrici, dal contenuto verso l'esterno?
- [ ] A) Margin, border, padding, content.
- [x] B) Content, padding, border, margin.
- [ ] C) Padding, content, margin, border.
- [ ] D) Border, content, padding, margin.

# Q6
Qual è l'effetto pratico di impostare `box-sizing: border-box` su un elemento?
- [ ] A) Rimuove completamente il bordo dell'elemento.
- [x] B) Fa sì che `width` e `height` includano anche padding e border, mantenendo la dimensione totale dichiarata.
- [ ] C) Impedisce di applicare qualsiasi margine all'elemento.
- [ ] D) Trasforma automaticamente l'elemento in un elemento `inline`.

# Q7
Perché `max-width: 100%` è spesso usato sulle immagini in un contesto responsive?
- [ ] A) Perché ingrandisce sempre l'immagine fino a riempire lo schermo.
- [x] B) Perché impedisce all'immagine di superare la larghezza del proprio contenitore, adattandosi a schermi di dimensioni diverse.
- [ ] C) Perché converte automaticamente l'immagine in formato WebP.
- [ ] D) Perché centra automaticamente l'immagine nella pagina.

# Q8
Che cosa succede se si prova ad assegnare `width` e `height` a un elemento con `display: inline`?
- [ ] A) Le proprietà vengono applicate correttamente, come su un elemento block.
- [ ] B) L'elemento scompare dalla pagina.
- [x] C) Le proprietà non hanno alcun effetto, perché gli elementi inline non accettano width e height.
- [ ] D) Il browser genera automaticamente un errore che blocca il caricamento della pagina.

# OPEN
Spiega con parole tue, con un esempio numerico concreto (ad esempio un box con `width: 200px`, un padding e un bordo a tua scelta), la differenza tra `box-sizing: content-box` (il comportamento predefinito) e `box-sizing: border-box`. Indica infine perché molti sviluppatori professionisti impostano `box-sizing: border-box` su tutti gli elementi della pagina fin dall'inizio di un progetto.