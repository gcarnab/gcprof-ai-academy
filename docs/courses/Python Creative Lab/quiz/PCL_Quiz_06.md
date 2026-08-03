---
title: "PCL - M6 - Variabili"
description: "Quiz di verifica sui concetti del Modulo 6: definizione di variabile, operatore di assegnazione, calcoli matematici, regole sui nomi e ridimensionamento dinamico."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Che cos'è una variabile in Python e quale simbolo si usa per assegnarle un valore?
- [ ] A) Un comando per far ruotare la tartaruga nello spazio usando il simbolo `==`.
- [x] B) Un contenitore memorizzato nella memoria del computer identificato da un nome, a cui si assegna un valore tramite l'operatore `=`.
- [ ] C) Un tipo di errore che si verifica quando si scelgono troppi colori nel notebook.
- [ ] D) Una funzione riservata per stampare figure geometriche sullo schermo usando il simbolo `:`.

# Q2
Cosa succede nella memoria del computer se eseguiamo in sequenza le istruzioni `lato = 100` e subito dopo `lato = 200`?
- [ ] A) Python genera un errore di sintassi perché il valore di una variabile non può mai cambiare.
- [ ] B) Viene creata una seconda variabile autonoma conservando entrambi i valori.
- [x] C) Il vecchio valore `100` viene sovrascritto e sostituito con il nuovo valore `200`.
- [ ] D) Il valore contenuto nella variabile diventa la somma dei due numeri (`300`).

# Q3
Se definiamo la variabile `colore_preferito = "blue"`, come dobbiamo passarla correttamente al comando `color()` per impostare la penna di Terry?
- [ ] A) `color("colore_preferito")` racchiudendo il nome tra virgolette.
- [x] B) `color(colore_preferito)` senza virgolette, affinché Python legga il contenuto della variabile.
- [ ] C) `color = "blue"` per sovrascrivere direttamente la funzione di sistema.
- [ ] D) `color("blue" = colore_preferito)` inserendo l'operatore al contrario.

# Q4
Se impostiamo `lato_base = 100` e creiamo `lato_doppio = lato_base * 2`, quale valore conterrà `lato_doppio` e qual è il vantaggio di questo calcolo?
- [ ] A) Conterrà `100` e servirà solo ad raddoppiare la velocità di movimento.
- [x] B) Conterrà `200` e permetterà al disegno di mantenere proporzioni perfette anche cambiando `lato_base`.
- [ ] C) Conterrà il testo `"lato_base * 2"` senza eseguire calcoli matematici.
- [ ] D) Genererà un errore perché non si possono eseguire moltiplicazioni con le variabili.

# Q5
Quale tra i seguenti nomi di variabile rispetta correttamente tutte le regole di sintassi di Python?
- [ ] A) `dimensione casa` (con lo spazio tra le due parole).
- [ ] B) `1lato_casa` (iniziando con un numero).
- [x] C) `dimensione_casa` (utilizzando il trattino basso/underscore per separare le parole).
- [ ] D) `forward` (usando una parola chiave riservata del sistema).

# Q6
Perché in Python le tre variabili `lato`, `Lato` e `LATO` vengono considerate tre entità completamente distinte?
- [ ] A) Perché una contiene numeri interi e le altre contengono testo.
- [x] B) Perché Python è un linguaggio "case-sensitive", cioè sensibile alle lettere maiuscole e minuscole.
- [ ] C) Perché solo le variabili scritte in maiuscolo possono essere usate nei calcoli.
- [ ] D) In realtà Python le considera la stessa identica variabile.

# Q7
Quale problema evidenzia Bug quando si tenta di chiamare una variabile con il nome di un comando come `print` o `forward`?
- [ ] A) La variabile si cancella automaticamente dopo pochi secondi.
- [x] B) Si utilizzano parole chiave riservate di Python, sovrascrivendo o danneggiando le funzioni di sistema.
- [ ] C) Il colore dello sfondo dello schermo diventa automaticamente nero.
- [ ] D) La velocità della tartaruga viene impostata al valore minimo.

# Q8
Qual è il vantaggio principale di aver strutturato il mini progetto della casa attorno alla variabile `dimensione_casa`?
- [ ] A) Permette di eseguire il programma senza dover importare la libreria grafica.
- [x] B) Consente di ingrandire o rimpicciolire l'intero disegno (mura e tetto) modificando un solo numero all'inizio del codice.
- [ ] C) Impedisce a Terry di uscire dai limiti della finestra di lavoro.
- [ ] D) Imposta lo sfondo su una modalità notturna automatica.

# OPEN
Spiega con parole tue che cos'è una variabile in Python, quali sono le regole principali evidenziate da Bug per assegnarle un nome valido, e descrivi il vantaggio di usare variabili e calcoli matematici per creare disegni o forme ridimensionabili.