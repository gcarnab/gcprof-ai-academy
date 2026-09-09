---
title: "OOP - M3 - Attributi, Metodi e il Costruttore"
description: "Quiz di verifica finale sui concetti chiave del Modulo 3: il costruttore __init__, il ruolo di self, i metodi che collaborano tra loro, attributi di istanza vs attributi di classe, valori di default nei parametri e la trappola dei default mutabili, il ciclo di vita di un oggetto."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è la funzione principale del costruttore `__init__` in Python?
- [ ] A) Eliminare un oggetto dalla memoria quando non serve più.
- [x] B) Inizializzare automaticamente gli attributi di un oggetto nel momento in cui viene creato.
- [ ] C) Definire i metodi di classe condivisi da tutti gli oggetti.
- [ ] D) Convertire una classe in una funzione.

# Q2
Cosa rappresenta `self` all'interno di un metodo?
- [ ] A) Il nome della classe a cui il metodo appartiene.
- [x] B) Un riferimento all'oggetto specifico su cui il metodo è stato chiamato.
- [ ] C) Un valore numerico che identifica l'ordine di creazione dell'oggetto.
- [ ] D) Una parola riservata obbligatoria di Python, non modificabile in alcun caso.

# Q3
Nella classe `Rettangolo` dell'Esempio 3.3, il metodo `descrivi()` richiama `self.calcola_area()`. Cosa dimostra questo?
- [ ] A) Che due metodi diversi non possono mai essere chiamati nello stesso oggetto.
- [x] B) Che un metodo può riusare la logica di un altro metodo dello stesso oggetto, tramite `self`.
- [ ] C) Che `calcola_area()` deve essere necessariamente definito fuori dalla classe.
- [ ] D) Che `descrivi()` sostituisce automaticamente `calcola_area()`.

# Q4
Qual è la differenza tra un attributo di istanza e un attributo di classe?
- [ ] A) Non c'è alcuna differenza: sono due nomi per lo stesso concetto.
- [x] B) L'attributo di istanza è proprio di un singolo oggetto; l'attributo di classe è condiviso da tutti gli oggetti della classe.
- [ ] C) Gli attributi di classe possono essere usati solo dentro `__init__`.
- [ ] D) Gli attributi di istanza non possono mai cambiare valore dopo la creazione dell'oggetto.

# Q5
Cosa succede se, su un singolo oggetto, si assegna un valore a un attributo che ha lo stesso nome di un attributo di classe già esistente (es. `studente1.scuola = "Nuova Scuola"`)?
- [ ] A) Viene generato un errore, perché non è permesso.
- [x] B) Viene creato un nuovo attributo di istanza che nasconde, solo per quell'oggetto, il valore dell'attributo di classe.
- [ ] C) L'attributo di classe cambia valore per tutti gli oggetti della classe.
- [ ] D) Il programma ignora silenziosamente l'assegnazione.

# Q6
Perché scrivere `def __init__(self, voti=[]):` è considerato un errore pericoloso, secondo il modulo?
- [ ] A) Perché Python non permette liste vuote come valore di default.
- [x] B) Perché quella lista verrebbe creata una sola volta e condivisa da tutti gli oggetti che non passano esplicitamente il parametro `voti`.
- [ ] C) Perché rallenta significativamente l'esecuzione del programma.
- [ ] D) Perché impedisce di creare più di un oggetto della stessa classe.

# Q7
Qual è il modo corretto, mostrato nel modulo, per gestire un parametro con valore di default mutabile (es. una lista)?
- [ ] A) Usare direttamente `voti=[]` nella firma del costruttore.
- [x] B) Usare `voti=None` come default, e creare una nuova lista dentro il costruttore se `voti` non è stato passato.
- [ ] C) Vietare del tutto i valori di default nei costruttori.
- [ ] D) Dichiarare `voti` come attributo di classe anziché di istanza.

# Q8
Nel confronto con Java presentato nel modulo, qual è l'equivalente Java di `self`?
- [ ] A) `new`
- [x] B) `this`
- [ ] C) `init`
- [ ] D) `void`

# OPEN
Scrivi in Python (o descrivi passo dopo passo) una classe a tua scelta legata al tuo indirizzo di studio, che abbia: un costruttore con almeno due parametri, di cui uno con valore di default gestito correttamente; almeno un attributo di classe condiviso; e almeno due metodi, di cui uno che richiama l'altro tramite `self`. Spiega poi perché hai scelto quel particolare attributo come attributo di classe e non di istanza.