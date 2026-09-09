---
title: "OOP - M7 - Astrazione: Classi Astratte e Interfacce"
description: "Quiz di verifica finale sui concetti chiave del Modulo 7: il problema del contratto mancante nel polimorfismo, classi astratte, il modulo abc con ABC e @abstractmethod, l'errore di istanziazione, il concetto di contratto tra classi, metodi concreti dentro classi astratte, interfacce in Java."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Nell'Esempio 7.1, qual è il problema evidenziato quando `Quadrato` eredita da `Forma` senza ridefinire `area()`?
- [ ] A) Python impedisce subito la creazione dell'oggetto `Quadrato`.
- [x] B) Il programma non genera alcun errore: `area()` restituisce semplicemente `None`, e l'errore passa inosservato.
- [ ] C) `Quadrato` viene automaticamente convertito in una classe astratta.
- [ ] D) Il programma calcola comunque l'area corretta usando `Cerchio` come riferimento.

# Q2
Cosa caratterizza, secondo il modulo, una classe astratta?
- [ ] A) È una classe che può essere istanziata solo una volta.
- [x] B) Non può mai essere istanziata direttamente e serve come modello da cui devono derivare altre classi.
- [ ] C) È una classe priva di attributi, ma con metodi liberi da vincoli.
- [ ] D) È una classe che esiste solo in Java, non in Python.

# Q3
Quale coppia di strumenti Python permette di definire una classe astratta con metodi obbligatori per le sottoclassi?
- [ ] A) `class` e `pass`
- [x] B) `ABC` (da importare da `abc`) e il decoratore `@abstractmethod`
- [ ] C) `def` e `return`
- [ ] D) `try` e `except`

# Q4
Cosa succede, secondo l'Esempio 7.3, se si prova a istanziare direttamente la classe astratta `Forma`, oppure una sottoclasse che non ha ridefinito tutti i metodi astratti?
- [ ] A) Python crea comunque l'oggetto, ignorando i metodi mancanti.
- [x] B) Python solleva un `TypeError` e impedisce la creazione dell'oggetto.
- [ ] C) Il programma si blocca solo alla prima chiamata del metodo mancante, non alla creazione dell'oggetto.
- [ ] D) L'oggetto viene creato ma senza alcun metodo disponibile.

# Q5
Secondo il Capitolo 5, cosa rappresenta il "contratto" tra una classe astratta e le sue sottoclassi?
- [ ] A) Un documento legale richiesto per pubblicare il codice.
- [x] B) L'accordo per cui la classe astratta garantisce un'interfaccia comune, e le sottoclassi si impegnano a implementare tutti i metodi astratti richiesti.
- [ ] C) Un file di configurazione separato dal codice Python.
- [ ] D) Una regola valida solo per le classi che ereditano da `int` o `str`.

# Q6
Una classe astratta in Python può contenere anche metodi già completamente implementati (concreti), oltre ai metodi astratti?
- [ ] A) No, una classe astratta può contenere solo metodi astratti.
- [x] B) Sì, come mostrato nell'Esempio 7.6 con il metodo `descrivi()`, ereditato normalmente dalle sottoclassi.
- [ ] C) Sì, ma solo se vengono ridefiniti anche loro in ogni sottoclasse.
- [ ] D) No, altrimenti Python genera un errore di sintassi.

# Q7
Perché, nell'Esempio 7.5, la funzione `stampa_area_totale()` può accettare "una qualsiasi Forma" senza controlli espliciti sul tipo?
- [ ] A) Perché la funzione ignora eventuali errori durante l'esecuzione.
- [x] B) Perché il contratto imposto da `Forma(ABC)` garantisce che ogni oggetto ricevuto abbia sicuramente un `area()` funzionante.
- [ ] C) Perché tutte le forme condividono automaticamente lo stesso oggetto in memoria.
- [ ] D) Perché `area()` è un metodo predefinito di Python, disponibile su ogni oggetto.

# Q8
Secondo il confronto Python↔Java del Capitolo 7, qual è la differenza principale tra un'interfaccia Java (`interface`) e una classe astratta?
- [ ] A) Sono esattamente la stessa cosa, solo con un nome diverso.
- [x] B) L'interfaccia definisce un contratto puro, con sole firme di metodi senza implementazione condivisa, mentre la classe astratta può contenere anche logica già scritta.
- [ ] C) Le interfacce possono essere istanziate direttamente, le classi astratte no.
- [ ] D) In Java una classe può implementare una sola interfaccia alla volta, mai più di una.

# OPEN
Riprendendo l'esempio della gerarchia `Forma` (con `Cerchio` e `Rettangolo`) spiegato nel modulo, spiega con parole tue perché una classe astratta con `@abstractmethod` risolve il problema del "contratto mancante" mostrato nell'Esempio 7.1, e descrivi cosa succederebbe concretamente — in termini di errore prodotto da Python — se aggiungessi una nuova sottoclasse `Triangolo(Forma)` dimenticando di implementare il metodo `perimetro()`.