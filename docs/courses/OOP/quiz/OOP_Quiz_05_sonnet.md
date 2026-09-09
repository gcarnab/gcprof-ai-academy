---
title: "OOP - M5 - Ereditarietà: Riutilizzare e Specializzare il Codice"
description: "Quiz di verifica finale sui concetti chiave del Modulo 5: il problema del codice duplicato, l'ereditarietà e la relazione is-a, la sintassi class Sottoclasse(Superclasse), super() nel costruttore, l'override dei metodi, le gerarchie a più livelli, l'ereditarietà in Java con extends."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è il problema principale evidenziato nell'Esempio 5.1 (classi `Automobile` e `Moto` scritte senza ereditarietà)?
- [ ] A) Le due classi non possono coesistere nello stesso programma Python.
- [x] B) Gran parte del codice (costruttore, `accelera()`, `frena()`) è duplicato identico in entrambe le classi, con il rischio di doverlo modificare in più punti in futuro.
- [ ] C) Python non permette di creare classi con nomi simili.
- [ ] D) Le classi `Automobile` e `Moto` non possono avere attributi diversi tra loro.

# Q2
Qual è il test logico proposto nel modulo per riconoscere quando conviene usare l'ereditarietà tra due entità?
- [ ] A) La relazione "ha un" (has-a).
- [x] B) La relazione "è un" (is-a): es. "un'Automobile è un Veicolo".
- [ ] C) Il numero di metodi che le due classi condividono, se superiore a 5.
- [ ] D) Non esiste un test: si usa sempre e comunque l'ereditarietà quando possibile.

# Q3
Qual è la sintassi corretta, in Python, per far ereditare la classe `Automobile` dalla classe `Veicolo`?
- [ ] A) `class Automobile extends Veicolo:`
- [x] B) `class Automobile(Veicolo):`
- [ ] C) `class Automobile -> Veicolo:`
- [ ] D) `class Automobile: super Veicolo`

# Q4
A cosa serve `super().__init__(marca, modello)` all'interno del costruttore di una sottoclasse?
- [ ] A) A creare un nuovo oggetto indipendente della superclasse.
- [x] B) A richiamare il costruttore della superclasse, evitando di riscriverne la logica da capo nella sottoclasse.
- [ ] C) A eliminare gli attributi ereditati dalla superclasse.
- [ ] D) A trasformare la sottoclasse in una superclasse.

# Q5
Nell'Esempio 5.4, cosa succede quando si chiama `moto.frena()`, sapendo che la classe `Moto` non ridefinisce (non fa l'override di) `frena()`?
- [ ] A) Il programma genera un errore, perché `Moto` non ha un metodo `frena()` proprio.
- [x] B) Viene eseguita la versione di `frena()` ereditata da `Veicolo`, poiché `Moto` non l'ha ridefinita.
- [ ] C) Viene eseguita automaticamente la versione di `frena()` definita in `Automobile`.
- [ ] D) `Moto` perde tutti gli altri metodi ereditati da `Veicolo`.

# Q6
Cosa significa, esattamente, fare l'"override" di un metodo in una sottoclasse?
- [ ] A) Cancellare il metodo dalla superclasse in modo permanente.
- [x] B) Ridefinire, nella sottoclasse, un metodo con lo stesso nome di uno ereditato, dandogli un comportamento specifico e diverso.
- [ ] C) Creare un metodo completamente nuovo, con un nome diverso da quello ereditato.
- [ ] D) Rendere un metodo accessibile da classi non collegate tra loro da ereditarietà.

# Q7
Nella gerarchia a tre livelli `Veicolo → Automobile → AutomobileElettrica` dell'Esempio 5.5, cosa restituisce `isinstance(tesla, Veicolo)`, dove `tesla` è un oggetto `AutomobileElettrica`?
- [ ] A) `False`, perché `Veicolo` è troppo lontano nella gerarchia.
- [x] B) `True`, perché un oggetto `AutomobileElettrica` è, attraverso la catena di ereditarietà, anche un `Automobile` e un `Veicolo`.
- [ ] C) Un errore, perché `isinstance()` funziona solo con un livello di ereditarietà.
- [ ] D) `True` solo se `tesla` viene convertito esplicitamente in `Veicolo`.

# Q8
Secondo il confronto con Java nel Capitolo 7, cosa deve essere un attributo della superclasse affinché la sottoclasse possa accedervi direttamente?
- [ ] A) `private`
- [x] B) `protected` (o `public`), non `private`
- [ ] C) `static`
- [ ] D) `final`

# OPEN
Riprendi la gerarchia `Dipendente` → `Manager` del Laboratorio di questo modulo (o descrivine una analoga a tua scelta, legata al tuo indirizzo di studio) e spiega con parole tue: perché usare l'ereditarietà in questo caso rispetta la relazione "è un"; cosa fa esattamente `super().__init__()` nel costruttore di `Manager`; e perché l'override di `calcola_stipendio()` è necessario invece di lasciare la versione ereditata da `Dipendente`.