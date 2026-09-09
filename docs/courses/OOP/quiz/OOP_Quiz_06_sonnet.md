---
title: "OOP - M6 - Polimorfismo: Un'Interfaccia, Comportamenti Diversi"
description: "Quiz di verifica finale sui concetti chiave del Modulo 6: il problema dei controlli espliciti sul tipo, il polimorfismo come conseguenza dell'override, funzioni generiche su oggetti diversi, il duck typing, la differenza tra polimorfismo e overloading, il polimorfismo in Java con @Override."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è il problema evidenziato nell'Esempio 6.1, dove la funzione `muovi_veicolo()` usa `isinstance()` e una catena di `if`/`elif`?
- [ ] A) Python non permette di usare `isinstance()` all'interno di una funzione.
- [x] B) Ogni volta che si aggiunge un nuovo tipo di veicolo, bisogna tornare a modificare la funzione aggiungendo un nuovo controllo.
- [ ] C) Le classi `Automobile` e `Moto` non possono avere un attributo `marca`.
- [ ] D) La funzione non può ricevere più di un parametro.

# Q2
Da quale meccanismo, introdotto nel Modulo 5, deriva più comunemente il polimorfismo mostrato in questo modulo?
- [ ] A) Dagli attributi di classe.
- [x] B) Dall'override dei metodi nelle sottoclassi.
- [ ] C) Dal decoratore `@property`.
- [ ] D) Dal costruttore `__init__` della superclasse.

# Q3
Nell'Esempio 6.3 (`raduno_veicoli()`), perché la funzione non ha bisogno di controllare il tipo di ciascun veicolo?
- [x] A) Perché si fida del fatto che ogni oggetto passato abbia un metodo `muovi()`, e lascia che sia l'oggetto stesso a decidere il comportamento.
- [ ] B) Perché tutti i veicoli, per costruzione, sono identici tra loro.
- [ ] C) Perché Python controlla automaticamente il tipo prima di ogni chiamata di metodo.
- [ ] D) Perché la funzione ignora completamente il parametro `lista_veicoli`.

# Q4
Cosa dimostra l'Esempio 6.4, in cui la classe `Bicicletta` non eredita da `Veicolo` ma viene comunque accettata da `raduno_veicoli()`?
- [ ] A) Che in Python è obbligatorio ereditare da una classe comune per usare il polimorfismo.
- [x] B) Il duck typing: a Python basta che l'oggetto abbia il metodo giusto (`muovi()`), indipendentemente da una relazione di ereditarietà.
- [ ] C) Che `Bicicletta` genera automaticamente un errore, essendo priva di una superclasse comune.
- [ ] D) Che `raduno_veicoli()` deve essere riscritta per ogni nuova classe.

# Q5
Secondo la tabella del Capitolo 6, quando viene deciso quale comportamento eseguire nel polimorfismo tramite override?
- [ ] A) A compile-time, prima ancora di eseguire il programma.
- [x] B) A runtime, in base al tipo reale dell'oggetto su cui il metodo viene chiamato.
- [ ] C) Non viene mai deciso: si esegue sempre la versione della superclasse.
- [ ] D) In modo casuale a ogni esecuzione del programma.

# Q6
Cosa succede, secondo l'Esempio 6.5, se in Python si definiscono due metodi con lo stesso nome (`somma`) ma parametri diversi, nella stessa classe?
- [ ] A) Python le mantiene entrambe e sceglie automaticamente quella giusta, come farebbe Java.
- [x] B) La seconda definizione sovrascrive completamente la prima: solo l'ultima versione resta disponibile.
- [ ] C) Il programma genera un errore già alla definizione della classe.
- [ ] D) Vengono unite automaticamente in un unico metodo con parametri opzionali.

# Q7
Qual è il modo "alla Python", mostrato nel modulo, per ottenere un effetto simile all'overloading?
- [x] A) Usare valori di default nei parametri del metodo (es. `def somma(self, a, b, c=0):`).
- [ ] B) Definire più volte lo stesso metodo con lo stesso nome nella classe.
- [ ] C) Usare esclusivamente l'ereditarietà multipla.
- [ ] D) Aggiungere l'annotazione `@Override` sopra il metodo.

# Q8
Secondo il Capitolo 7, quale importante differenza esiste tra Python e Java riguardo al duck typing?
- [ ] A) Sono identici: anche Java non richiede alcuna relazione tra le classi per il polimorfismo.
- [x] B) Java non ha il duck typing: perché una classe possa essere usata al posto di un'altra, serve una relazione esplicita, come l'ereditarietà o un'interfaccia.
- [ ] C) Solo Java supporta il duck typing, Python no.
- [ ] D) In Java il duck typing è obbligatorio per ogni classe.

# OPEN
Riprendi la gerarchia `Forma` → `Quadrato`/`Cerchio` e la classe indipendente `Triangolo` del Laboratorio di questo modulo (o descrivine una analoga a tua scelta) e spiega con parole tue: perché la funzione `stampa_aree()` funziona correttamente su tutte e tre le classi pur non usando mai `isinstance()`; e in che punto preciso questo esempio mostra sia il polimorfismo "classico" (tramite override) sia il duck typing.