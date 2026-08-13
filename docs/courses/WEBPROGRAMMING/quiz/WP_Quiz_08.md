---
title: "WP - M8 - Layout Moderno: Display e Flexbox"
description: "Quiz di verifica finale sui concetti chiave del Modulo 8: perché Flexbox, attivazione del contenitore flessibile, asse principale e trasversale, justify-content, align-items, flex-wrap, gap, flex-grow/shrink/basis, align-self e order."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quale problema è nato per risolvere Flexbox, rispetto alle tecniche di layout precedenti come `float`?
- [ ] A) Il problema di ridurre il peso delle immagini caricate nella pagina.
- [x] B) Il problema di allineare, distribuire e ridimensionare automaticamente un gruppo di elementi lungo una riga o una colonna.
- [ ] C) Il problema di validare i form senza JavaScript.
- [ ] D) Il problema di collegare un foglio di stile esterno a una pagina HTML.

# Q2
Cosa succede applicando `display: flex` a un contenitore?
- [ ] A) Tutti gli elementi della pagina, non solo i figli diretti, diventano automaticamente flessibili.
- [x] B) Tutti i figli diretti del contenitore diventano automaticamente elementi flessibili e si dispongono affiancati in riga, per impostazione predefinita.
- [ ] C) Il contenitore smette di accettare qualsiasi proprietà CSS aggiuntiva.
- [ ] D) Gli elementi figli vengono nascosti finché non si imposta manualmente `flex-direction`.

# Q3
Quale proprietà, applicata al contenitore, determina quale sia l'asse principale di Flexbox?
- [ ] A) `justify-content`
- [ ] B) `align-items`
- [x] C) `flex-direction`
- [ ] D) `gap`

# Q4
Qual è la differenza corretta tra `justify-content` e `align-items`?
- [ ] A) Sono due proprietà equivalenti, che producono sempre lo stesso identico effetto.
- [x] B) `justify-content` distribuisce gli elementi lungo l'asse principale, `align-items` li allinea lungo l'asse trasversale.
- [ ] C) `justify-content` si applica ai singoli elementi figli, `align-items` solo al contenitore.
- [ ] D) `align-items` funziona solo quando `flex-direction` è impostato su `column`.

# Q5
A cosa serve la proprietà `flex-wrap: wrap`?
- [ ] A) A invertire l'ordine visivo degli elementi flessibili.
- [x] B) A permettere agli elementi di andare a capo su più righe quando lo spazio disponibile non è sufficiente.
- [ ] C) A impedire che gli elementi vengano compressi.
- [ ] D) A trasformare il contenitore da flessibile a griglia.

# Q6
Quale vantaggio offre la proprietà `gap` rispetto all'uso di `margin` sui singoli elementi per creare spazio tra loro?
- [ ] A) `gap` funziona solo con `flex-direction: column`.
- [x] B) `gap` applica lo spazio solo tra gli elementi, senza il margine "in eccesso" sui bordi esterni del contenitore che si otterrebbe con `margin`.
- [ ] C) `gap` è più veloce da caricare per il browser rispetto a `margin`.
- [ ] D) Non c'è alcuna differenza pratica tra `gap` e `margin`.

# Q7
Che cosa controlla la proprietà `flex-grow`, applicata a un elemento figlio?
- [ ] A) Il colore di sfondo dell'elemento.
- [x] B) Quanto l'elemento può crescere per occupare lo spazio in eccesso, rispetto agli altri elementi flessibili.
- [ ] C) L'ordine visivo dell'elemento all'interno del contenitore.
- [ ] D) Se l'elemento debba andare a capo oppure no.

# Q8
Qual è un'affermazione corretta riguardo alla proprietà `order`?
- [ ] A) Cambia sia l'ordine visivo sia l'ordine di lettura nel codice HTML.
- [x] B) Cambia solo l'ordine visivo dell'elemento, senza modificare l'ordine reale nel documento HTML né l'ordine di lettura per uno screen reader.
- [ ] C) Può essere applicata solo al contenitore, mai ai singoli elementi figli.
- [ ] D) Funziona solo se `flex-wrap` è impostato su `wrap`.

# OPEN
Spiega con parole tue perché `justify-content` e `align-items` centrano un elemento sia orizzontalmente sia verticalmente quando usati insieme su un contenitore con `display: flex`. Indica poi cosa cambierebbe, in termini di asse principale e asse trasversale, se il contenitore avesse `flex-direction: column` invece del valore predefinito `row`.