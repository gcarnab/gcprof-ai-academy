---
title: "Python - M2 - Variabili, Tipi di Dato e Operatori Aritmetici"
description: "Quiz di verifica finale sui concetti chiave del Modulo 2: creazione e regole di naming delle variabili, i tipi numerici int/float/complex, operatori aritmetici e precedenza PEMDAS, operatori di confronto, assegnazione combinata, conversioni esplicite e implicite, il modulo math."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Quale, tra le seguenti, è una regola corretta per i nomi delle variabili in Python, secondo quanto visto nel modulo?
- [ ] A) Un nome di variabile può iniziare con un numero.
- [ ] B) Un nome di variabile può contenere spazi, se racchiuso tra virgolette.
- [x] C) Python distingue tra maiuscole e minuscole: `Eta` ed `eta` sono due variabili diverse.
- [ ] D) Un nome di variabile può coincidere con una parola riservata come `for` o `if`.

# Q2
Quale operatore in Python restituisce il resto di una divisione intera?
- [ ] A) `//`
- [x] B) `%`
- [ ] C) `**`
- [ ] D) `/`

# Q3
Seguendo la regola PEMDAS, qual è il risultato dell'espressione `10 - 2 * 3`?
- [ ] A) `24`
- [x] B) `4`
- [ ] C) `8`
- [ ] D) Un errore, perché servono obbligatoriamente le parentesi

# Q4
Qual è la differenza fondamentale tra l'operatore `=` e l'operatore `==` in Python?
- [ ] A) Sono due modi equivalenti per assegnare un valore a una variabile.
- [x] B) `=` assegna un valore a una variabile, mentre `==` confronta due valori e restituisce `True` o `False`.
- [ ] C) `=` si usa solo con i numeri, `==` solo con il testo.
- [ ] D) `==` assegna un valore, `=` lo confronta.

# Q5
Cosa fa esattamente l'istruzione `totale *= 2`?
- [ ] A) Confronta `totale` con `2`.
- [ ] B) Crea una nuova variabile `totale2`.
- [x] C) Moltiplica il valore attuale di `totale` per `2` e riassegna il risultato a `totale`.
- [ ] D) Divide `totale` per `2`.

# Q6
Qual è il risultato di `int(9.8)` in Python?
- [ ] A) `10`, perché `int()` arrotonda al valore più vicino.
- [x] B) `9`, perché `int()` tronca la parte decimale senza arrotondare.
- [ ] C) `9.8`, perché `int()` non modifica i numeri decimali.
- [ ] D) Un errore, perché `int()` non accetta valori decimali.

# Q7
Cosa succede quando in una stessa espressione si combinano un valore `int` e un valore `float` (es. `5 + 2.5`)?
- [ ] A) Python genera sempre un errore di tipo.
- [x] B) Python converte automaticamente il risultato in `float`, per non perdere precisione.
- [ ] C) Python converte automaticamente il risultato in `int`, arrotondando per difetto.
- [ ] D) Il risultato resta di tipo `int`.

# Q8
Dopo aver eseguito `import math`, quale istruzione calcola correttamente la radice quadrata di 25?
- [ ] A) `math.pow(25)`
- [x] B) `math.sqrt(25)`
- [ ] C) `math.ceil(25)`
- [ ] D) `25 ** math`

# OPEN
Scrivi, con parole tue, la differenza tra l'operatore `/` e l'operatore `//` in Python, portando un esempio numerico a tua scelta per ciascuno dei due. Spiega inoltre in quale situazione pratica, secondo te, avrebbe senso usare `//` invece di `/` (ad esempio in un problema legato al tuo indirizzo di studio).