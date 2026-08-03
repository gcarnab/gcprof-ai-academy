---
title: "PCL - M8 - Le Funzioni"
description: "Quiz di verifica sui concetti del Modulo 8: definizione di funzione con def, chiamata di una funzione, parametri, la parola chiave return e il mini progetto del Cielo Stellato di Terry."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cos'è una funzione in Python e quale parola chiave si usa per definirla?
- [ ] A) Un tipo di variabile che può contenere solo numeri, definita con `var`.
- [x] B) Una "scatola magica" che racchiude un pezzo di codice a cui diamo un nome, definita con `def`.
- [ ] C) Un errore che Python genera quando il codice non è indentato correttamente.
- [ ] D) Un comando riservato di Terry per cambiare colore, definito con `color`.

# Q2
Se scrivo `def saluta_squadra():` seguito da alcune righe di `print`, ma poi eseguo il programma senza mai chiamare `saluta_squadra()`, cosa succede?
- [ ] A) Python stampa automaticamente i messaggi all'avvio del programma.
- [ ] B) Python genera un errore perché la funzione non è stata usata.
- [x] C) Non succede nulla: il codice dentro la funzione non viene mai eseguito, perché è stata solo definita e non chiamata.
- [ ] D) Il computer esegue la funzione una sola volta e poi la cancella.

# Q3
Come si "chiama" (invoca) correttamente una funzione già definita chiamata `avviso_pericolo`?
- [ ] A) `def avviso_pericolo()`, ripetendo la parola chiave `def`.
- [x] B) `avviso_pericolo()`, scrivendo il nome seguito dalle parentesi tonde.
- [ ] C) `call avviso_pericolo`, usando la parola inglese "call".
- [ ] D) `run avviso_pericolo:`, con i due punti finali.

# Q4
Cos'è un "parametro" (o argomento) di una funzione, come `nome` in `def saluta_giocatore(nome):`?
- [ ] A) È il nome della funzione stessa, scritto in un altro modo.
- [x] B) È un'informazione che passiamo alla funzione quando la chiamiamo, così può adattare il suo comportamento.
- [ ] C) È un tipo di errore di sintassi comune tra i principianti.
- [ ] D) È il valore che la funzione stampa sempre, indipendentemente dai dati inseriti.

# Q5
Qual è la differenza principale tra `print` e `return` all'interno di una funzione?
- [ ] A) Sono comandi identici e completamente intercambiabili.
- [ ] B) `return` mostra un testo colorato a schermo, mentre `print` funziona solo con i numeri.
- [x] C) `print` mostra un'informazione a schermo per gli umani, mentre `return` restituisce un valore al programma affinché possa essere riutilizzato.
- [ ] D) `print` può essere usato solo fuori dalle funzioni, `return` solo dentro.

# Q6
Cosa succede esattamente nel momento in cui, dentro una funzione, Python incontra l'istruzione `return`?
- [ ] A) La funzione ricomincia l'esecuzione dall'inizio.
- [x] B) La funzione restituisce il valore indicato e si ferma immediatamente, senza eseguire eventuali righe successive.
- [ ] C) Python chiede automaticamente un `input()` all'utente.
- [ ] D) Il valore viene stampato a schermo e poi ignorato.

# Q7
Nel Mini Progetto del Cielo Stellato, perché è utile aver creato la funzione `disegna_stella(dimensione, colore_stella)` invece di scrivere ogni volta tutti i comandi di movimento di Terry?
- [ ] A) Perché rende Terry più veloce nel muoversi sullo schermo.
- [x] B) Perché permette di disegnare tante stelle diverse per dimensione e colore richiamando semplicemente la funzione con parametri diversi, senza riscrivere il codice del disegno.
- [ ] C) Perché evita di dover usare il comando `color()` per impostare i colori.
- [ ] D) Perché impedisce a Terry di uscire dai bordi della finestra di disegno.

# Q8
Quanti parametri può avere una funzione in Python, secondo quanto visto nel modulo (es. `disegna_poligono(lati, colore)`)?
- [ ] A) Sempre e solo uno.
- [ ] B) Nessuno, le funzioni Python non accettano parametri.
- [ ] C) Al massimo due, separati da una virgola.
- [x] D) Quanti ne servono: zero, uno o più, separati da virgola.

# OPEN
Spiega con parole tue che cos'è una funzione in Python, qual è la differenza tra definire una funzione con `def` e chiamarla, a cosa servono i parametri e in che modo `return` permette a una funzione di restituire un risultato utilizzabile nel resto del programma.