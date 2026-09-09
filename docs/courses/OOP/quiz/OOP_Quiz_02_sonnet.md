---
title: "OOP - M2 - Classi e Oggetti: Il Progetto e l'Istanza"
description: "Quiz di verifica finale sui concetti chiave del Modulo 2: perché serve una classe, la classe come progetto/stampo, la sintassi Python class, istanziazione di oggetti, type() e isinstance(), indipendenza degli oggetti in memoria, un primo confronto con la sintassi Java."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Nell'Esempio 2.1, qual è il problema evidenziato nel rappresentare più studenti con dizionari scritti a mano, senza una classe comune?
- [ ] A) Python non permette di creare più di un dizionario nello stesso programma.
- [x] B) Nulla garantisce che tutti i dizionari abbiano la stessa struttura: un errore nel nome di una chiave si scopre solo quando il programma va in crash.
- [ ] C) I dizionari occupano troppa memoria per essere usati con gli studenti.
- [ ] D) Le chiavi di un dizionario devono essere obbligatoriamente numeriche.

# Q2
Cosa rappresenta, correttamente, una classe secondo l'analogia dello stampo per biscotti?
- [ ] A) Un singolo biscotto già pronto e consumabile.
- [x] B) Il progetto/modello che definisce la forma comune di tutti gli oggetti creati a partire da essa.
- [ ] C) Un ingrediente specifico usato in un solo oggetto.
- [ ] D) Un errore di programmazione da evitare.

# Q3
Qual è la sintassi corretta, mostrata nel modulo, per definire una classe vuota in Python?
- [ ] A) `def Studente(): pass`
- [x] B) `class Studente: pass`
- [ ] C) `new class Studente {}`
- [ ] D) `Studente = class()`

# Q4
Come si crea correttamente un oggetto (istanza) a partire dalla classe `Studente` in Python?
- [ ] A) `Studente.new()`
- [ ] B) `new Studente()`
- [x] C) `Studente()`
- [ ] D) `class Studente()`

# Q5
Cosa restituisce `type(studente1)`, dove `studente1` è un oggetto creato dalla classe `Studente`?
- [ ] A) Il valore del primo attributo assegnato a `studente1`.
- [x] B) La classe a cui l'oggetto appartiene (es. `<class '__main__.Studente'>`).
- [ ] C) Sempre e solo `True` o `False`.
- [ ] D) Il numero di attributi presenti nell'oggetto.

# Q6
Se `studente1` e `studente2` sono due oggetti diversi creati dalla stessa classe `Studente`, cosa succede modificando un attributo di `studente1`?
- [ ] A) Anche l'attributo corrispondente di `studente2` cambia automaticamente.
- [x] B) Solo `studente1` viene modificato: i due oggetti sono indipendenti in memoria.
- [ ] C) Il programma genera un errore, perché non è permesso modificare un solo oggetto alla volta.
- [ ] D) Entrambi gli oggetti vengono eliminati dalla memoria.

# Q7
Cosa verifica esattamente `studente1 is studente2`?
- [ ] A) Se i due oggetti hanno gli stessi valori negli attributi.
- [x] B) Se i due oggetti sono esattamente la stessa istanza in memoria (identità), non solo se hanno valori uguali.
- [ ] C) Se entrambi gli oggetti appartengono alla stessa classe.
- [ ] D) Se `studente1` è stato creato prima di `studente2`.

# Q8
Secondo il confronto Python↔Java presentato nel modulo, qual è la parola chiave che in Java crea un nuovo oggetto, senza equivalente esplicito in Python?
- [ ] A) `class`
- [ ] B) `public`
- [x] C) `new`
- [ ] D) `void`

# OPEN
Scegli un'entità diversa da "Studente" (a tua scelta, anche legata al tuo indirizzo di studio) e spiega con parole tue: cosa sarebbe, in quel caso, la "classe" e cosa sarebbero gli "oggetti"; come dimostreresti, con un esempio pratico, che due oggetti creati dalla stessa classe restano indipendenti tra loro anche dopo la creazione.