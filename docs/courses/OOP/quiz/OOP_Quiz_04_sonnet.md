---
title: "OOP - M4 - Incapsulamento: Proteggere lo Stato degli Oggetti"
description: "Quiz di verifica finale sui concetti chiave del Modulo 4: il problema dello stato esposto, l'incapsulamento come principio, convenzioni Python per attributi protetti e privati, name mangling, getter e setter classici, il decoratore @property, validazione dei dati nel setter, incapsulamento in Java con private/public."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Secondo il modulo, qual è il problema principale di una classe con attributi completamente pubblici, come nell'Esempio 4.1?
- [ ] A) Python impedisce di creare classi con attributi pubblici.
- [x] B) Chiunque può modificare liberamente lo stato dell'oggetto, anche assegnando valori privi di senso o pericolosi (es. un saldo negativo).
- [ ] C) Gli attributi pubblici occupano più memoria di quelli protetti.
- [ ] D) Un attributo pubblico non può mai essere letto dall'esterno della classe.

# Q2
Cosa indica, per convenzione, un attributo scritto con un singolo underscore iniziale (es. `_saldo`)?
- [ ] A) Che l'attributo è completamente inaccessibile dall'esterno.
- [x] B) Che l'attributo è "protetto": per convenzione, non dovrebbe essere modificato direttamente dall'esterno, anche se tecnicamente è ancora accessibile.
- [ ] C) Che l'attributo è un attributo di classe, condiviso da tutti gli oggetti.
- [ ] D) Che l'attributo deve obbligatoriamente essere un numero.

# Q3
Cosa fa esattamente il "name mangling" applicato a un attributo `__privato`?
- [ ] A) Elimina definitivamente l'attributo dalla memoria dell'oggetto.
- [x] B) Rinomina internamente l'attributo in `_NomeClasse__privato`, rendendolo scomodo (ma non impossibile) da raggiungere dall'esterno.
- [ ] C) Lo trasforma automaticamente in un metodo.
- [ ] D) Impedisce di usarlo anche all'interno della classe stessa.

# Q4
Qual è il limite pratico dei getter e setter "classici" (`get_saldo()` / `set_saldo()`) mostrati nel modulo, rispetto a `@property`?
- [ ] A) Non permettono alcun tipo di validazione dei dati.
- [x] B) Hanno una sintassi più scomoda: bisogna chiamare esplicitamente i metodi invece di scrivere semplicemente `conto.saldo`.
- [ ] C) Non possono essere usati insieme al costruttore `__init__`.
- [ ] D) Funzionano solo con attributi numerici.

# Q5
Cosa permette di fare il decoratore `@property` in Python?
- [ ] A) Rendere un attributo completamente immutabile per sempre.
- [x] B) Scrivere un getter (e, con `@nome.setter`, un setter) che si comporta dall'esterno come un normale attributo, mantenendo però il controllo interno.
- [ ] C) Eliminare la necessità di scrivere un costruttore.
- [ ] D) Convertire automaticamente una classe in una funzione.

# Q6
Nell'Esempio 4.5 (classe `Studente` con validazione), perché l'età passata al costruttore viene comunque controllata, anche se il controllo è scritto solo nel setter?
- [ ] A) Perché il costruttore ha una validazione separata e duplicata.
- [x] B) Perché `self.eta = eta` dentro `__init__` passa automaticamente dal setter decorato con `@eta.setter`.
- [ ] C) Perché Python controlla automaticamente tutti i numeri interi.
- [ ] D) Non viene controllata: il costruttore bypassa sempre i setter.

# Q7
Qual è, secondo il Capitolo 7, la differenza principale tra l'incapsulamento in Python e in Java?
- [ ] A) Java non permette in alcun modo di nascondere i dati di un oggetto.
- [x] B) In Python la protezione è una convenzione (basata su `_` e `__`); in Java è imposta dal compilatore tramite il modificatore `private`.
- [ ] C) In Python bisogna sempre scrivere `getSaldo()` e `setSaldo()`, come in Java.
- [ ] D) Non esiste alcuna differenza pratica tra i due linguaggi.

# Q8
Se in Java un attributo è dichiarato `private`, cosa succede se si prova ad accedervi direttamente da fuori la classe?
- [ ] A) Funziona normalmente, esattamente come un attributo pubblico.
- [x] B) Il compilatore impedisce l'accesso diretto: è necessario passare da un metodo pubblico come un getter.
- [ ] C) Viene automaticamente reso pubblico al primo utilizzo.
- [ ] D) L'attributo viene eliminato dalla classe.

# OPEN
Riprendi la classe `Prodotto` che hai costruito nel Laboratorio di questo modulo (o descrivine una analoga a tua scelta) e spiega, con parole tue: perché rendere `prezzo` e `quantita` attributi protetti con validazione nel setter è più sicuro che lasciarli come semplici attributi pubblici, portando almeno un esempio concreto di valore "assurdo" che il setter dovrebbe rifiutare.