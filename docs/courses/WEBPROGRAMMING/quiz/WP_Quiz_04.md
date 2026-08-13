---
title: "WP - M4 - Tabelle e Form"
description: "Quiz di verifica finale sui concetti chiave del Modulo 4: struttura delle tabelle HTML, thead/tbody/tfoot, colspan e rowspan, il tag form, campi di input, label e fieldset, validazione HTML nativa."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Per quale scopo dovrebbero essere utilizzate le tabelle HTML?
- [ ] A) Per impaginare l'intera struttura grafica di una pagina Web.
- [x] B) Per rappresentare dati realmente tabulari, organizzati in righe e colonne.
- [ ] C) Per creare menu di navigazione a più colonne.
- [ ] D) Per affiancare immagini e testo nella pagina.

# Q2
Qual è la funzione di `<thead>`, `<tbody>` e `<tfoot>` in una tabella?
- [ ] A) Cambiano il colore delle celle della tabella.
- [x] B) Suddividono la tabella in intestazione, corpo dei dati ed eventuale riepilogo finale, con un significato semantico preciso.
- [ ] C) Servono a unire più celle della stessa riga.
- [ ] D) Sono obbligatori solo nelle tabelle con meno di tre righe.

# Q3
Quale attributo permette a una cella di tabella di occupare lo spazio di più colonne contemporaneamente?
- [ ] A) `rowspan`
- [x] B) `colspan`
- [ ] C) `width`
- [ ] D) `merge`

# Q4
Qual è la funzione dell'attributo `action` nel tag `<form>`?
- [ ] A) Indica il metodo di invio dei dati, `get` oppure `post`.
- [x] B) Indica l'indirizzo a cui vengono inviati i dati del form.
- [ ] C) Attiva la validazione automatica dei campi.
- [ ] D) Determina il colore del pulsante di invio.

# Q5
Perché l'attributo `name` è indispensabile su un campo `<input>`?
- [ ] A) Serve solo a mostrare un testo guida nel campo.
- [ ] B) Determina il tipo di validazione applicata al campo.
- [x] C) È l'identificativo con cui il valore del campo viene trasmesso: senza `name`, il valore non viene mai inviato.
- [ ] D) Serve solo per collegare il campo a una `<label>`.

# Q6
Perché due pulsanti radio che devono escludersi a vicenda (una sola scelta possibile) devono avere lo stesso valore di `name`?
- [ ] A) Non è vero: ogni pulsante radio deve avere un `name` diverso per funzionare.
- [x] B) Perché è proprio il `name` condiviso a dire al browser che quei pulsanti appartengono allo stesso gruppo di scelta esclusiva.
- [ ] C) Perché altrimenti il form non potrebbe essere inviato.
- [ ] D) Il valore di `name` sui radio button è puramente estetico e non ha alcun effetto funzionale.

# Q7
Come si collega correttamente una `<label>` al proprio campo di input?
- [ ] A) Scrivendo il testo della label subito prima del campo, senza alcun attributo.
- [x] B) Facendo coincidere l'attributo `for` della label con l'attributo `id` del campo.
- [ ] C) Inserendo il campo `<input>` dentro l'attributo `placeholder`.
- [ ] D) Non è possibile collegare in modo esplicito una label a un campo.

# Q8
Quale, tra i seguenti, è un attributo di validazione HTML nativa che blocca l'invio del form se il campo è vuoto?
- [ ] A) `placeholder`
- [x] B) `required`
- [ ] C) `readonly`
- [ ] D) `disabled`

# OPEN
Spiega con parole tue perché la `<label>` non va mai sostituita dal solo `placeholder` in un form accessibile, e collega questo concetto alla validazione HTML nativa (`required`, `minlength`, `pattern`...): indica un vantaggio pratico della validazione nativa e un suo possibile limite.