# Python Practice: Guida Completa ai Fondamenti

Questa guida offre una panoramica esaustiva e progressiva sui concetti fondamentali di Python, pensata per consolidare la teoria e facilitare la pratica nello sviluppo di algoritmi e script.

---

## **Modulo 1: Valori e Operatori Numerici**

Il primo passo nella programmazione è capire come il computer gestisce i numeri e le operazioni matematiche di base.

* **I Commenti (`#`)**: Fondamentali per la didattica e la manutenzione del codice. Tutto ciò che segue il simbolo `#` sulla stessa riga viene ignorato dall'interprete Python. Servono per spiegare la logica o "spegnere" temporaneamente porzioni di codice.
* **Tipi di Dato Numerici**:
    * `int` (Interi): Numeri senza virgola (es. `10`, `-5`, `0`). Rappresentano quantità indivisibili, come il numero di studenti in una classe o le quote intere di un'azione.
    * `float` (Virgola Mobile): Numeri decimali (es. `3.14`, `-0.01`, `100.50`). Utilizzati per misurazioni, tassi di interesse o prezzi di mercato. *Nota: in Python si usa il punto (.), non la virgola (,).*
* **Operatori Aritmetici**:
    * Base: `+` (addizione), `-` (sottrazione), `*` (moltiplicazione), `/` (divisione, restituisce sempre un `float`).
    * Avanzati:
        * `**` (Potenza): Es. `2 ** 3` restituisce `8`.
        * `//` (Divisione Intera): Restituisce il quoziente senza i decimali. Es. `10 // 3` restituisce `3`.
        * `%` (Modulo): Restituisce il resto della divisione. Es. `10 % 3` restituisce `1`. Utilissimo per capire se un numero è pari o dispari (`numero % 2 == 0`).
* **Funzioni di Ispezione**:
    * `type(valore)`: Rivela il tipo di dato (es. `type(3.14)` restituisce `<class 'float'>`).
    * `isinstance(valore, tipo)`: Verifica se un valore appartiene a una classe, restituendo Vero o Falso (es. `isinstance(5, int)` restituisce `True`).

---

## **Modulo 2: Variabili e Stringhe**

Le variabili sono le fondamenta della gestione della memoria in un programma.

* **Concetto di Variabile**: Immagina una variabile come un'etichetta applicata a una scatola nella memoria RAM del computer. L'operatore di assegnazione `=` inserisce un valore in questa scatola.
    * *Esempio:* `tasso_interesse = 0.05`
* **Regole di Naming (Nomenclatura)**:
    * Sì: `prezzo_unitario`, `studente1`, `_contatore`. (Lo standard in Python è lo *snake_case*, tutto minuscolo con underscore).
    * No: `1studente` (inizia con numero), `prezzo-totale` (contiene il meno, che è un operatore).
* **Tipizzazione Dinamica**: Python è flessibile. Una variabile nata per ospitare un numero può, successivamente, ospitare un testo.
    * `x = 10` (Ora x è un int) -> `x = "Dieci"` (Ora x è una str).
* **Le Stringhe (`str`)**: Sequenze di caratteri racchiuse tra apici singoli (`' '`) o doppi (`" "`).
* **Caratteri di Escape (`\`)**: Permettono di inserire caratteri problematici.
    * Es. `messaggio = 'L\'albero è verde'`.
* **Concatenazione e Formattazione (f-strings)**:
    * Concatenazione classica: `"Ciao " + "Mondo"`
    * **Best Practice (f-strings)**: Anteponendo una `f` alla stringa, possiamo iniettare variabili direttamente tra parentesi graffe: `f"Il tasso attuale è {tasso_interesse}"`.

---

## **Modulo 3: Conversioni tra tipi di dato, funzioni print e input**

Per creare programmi utili, dobbiamo farli comunicare con il mondo esterno.

* **La funzione `input()`**: Mette il programma in pausa e attende che l'utente scriva qualcosa sulla tastiera.
    * **Attenzione:** Il risultato di `input()` è **sempre** una stringa (`str`). Se l'utente digita `50`, Python memorizza `"50"`.
* **Casting (Conversione di tipo)**: Poiché `input()` restituisce stringhe, non possiamo farci dei calcoli direttamente. Dobbiamo convertire (castare) i dati:
    * `int("50")` -> `50`
    * `float("3.14")` -> `3.14`
    * `str(100)` -> `"100"`
    * *Esempio Pratico:* `capitale = float(input("Inserisci il capitale da investire: "))`
* **La funzione `print()`**: Invia dati allo schermo.
    * Può stampare più valori separandoli con una virgola: `print("Il totale è:", totale)`
    * Stringhe multilinea: Usando le triple virgolette `"""Testo..."""` è possibile stampare lunghi blocchi di testo mantenendo gli a capo originali.
    * Caratteri speciali: `\n` inserisce un a capo manuale all'interno del testo, `\t` inserisce una tabulazione.

---

## **Modulo 4: Controllo del Flusso, Algebra Booleana e Operatori di Comparazione**

Un programma lineare esegue istruzioni dall'alto verso il basso. Con il controllo di flusso, diamo al programma la capacità di prendere decisioni.

* **Diagrammi di Flusso (Flowcharts)**: Prima di scrivere il codice, è fondamentale strutturare la logica visivamente. Strumenti dedicati o simulatori didattici come `GC_FLOWGORITHM` permettono di mappare gli algoritmi graficamente, rendendo evidente il percorso decisionale.
* **Tipo di dato Boolean (`bool`)**: Rappresenta la logica binaria. Esistono solo due valori: `True` (Vero) e `False` (Falso).
* **Operatori di Comparazione**:
    * `==` (Uguale a). Da non confondere con `=` (assegnazione).
    * `!=` (Diverso da).
    * `>`, `<`, `>=`, `<=` (Maggiore, Minore, ecc.).
    * *Esempio:* `10 >= 5` restituisce `True`.
* **Operatori Logici (Algebra Booleana)**: Permettono di concatenare più condizioni.
    * `and`: `True` solo se **tutte** le condizioni sono vere.
    * `or`: `True` se **almeno una** condizione è vera.
    * `not`: Inverte il risultato (da `True` a `False` e viceversa).

---

## **Modulo 5: Istruzioni if, elif ed else**

Traduciamo la logica booleana in veri e propri bivi nel codice.

* **Istruzione `if` (Se)**: Esegue il blocco di codice sottostante solo se l'espressione valutata è `True`.
* **L'Indentazione**: In Python le parentesi graffe per delimitare i blocchi non esistono. Si usano i due punti `:` alla fine della condizione e **4 spazi** (indentazione) per tutte le righe che fanno parte di quel blocco decisionale.
* **Istruzione `else` (Altrimenti)**: Si aggancia a un `if`. Cattura tutte le casistiche in cui la condizione dell'`if` si rivela `False`. Non ha bisogno di condizioni.
* **Istruzione `elif` (Altrimenti se)**: Contrazione di *else if*. Permette di valutare scenari a cascata. Se il primo `if` è falso, si valuta l'`elif`. Se anch'esso è falso, si passa al prossimo, o all'`else` finale.
* **Istruzione `pass`**: Un "segnaposto". Se crei la struttura di un `if` ma non sai ancora quale codice inserirvi, metti `pass` per evitare che Python segnali un errore di sintassi (IndentationError).

---

## **Modulo 6: Ciclo while, istruzioni break e continue**

I cicli (loop) servono a ripetere operazioni. Il `while` è legato a una condizione di verità.

* **Il Ciclo `while`**: Legge una condizione (come un `if`); se è `True`, esegue il blocco di codice indentato. Alla fine del blocco, **torna su** e ricalcola la condizione. Continua finché la condizione non diventa `False`.
* **Loop Infiniti**: Il nemico principale del `while`. Se la condizione non cambia mai (es. non aggiorniamo un contatore), il programma si blocca ripetendo l'operazione all'infinito.
    * *Regola d'oro:* Assicurati sempre che esista una via per far diventare `False` la condizione (es. `contatore += 1`).
* **Istruzione `break`**: Un "freno a mano". Interrompe immediatamente e in modo definitivo il ciclo in cui si trova, saltando fuori, a prescindere dalla condizione. Utile se l'utente inserisce un comando di uscita.
* **Istruzione `continue`**: Un "salto del turno". Interrompe l'iterazione *corrente* e rimanda il programma all'inizio del ciclo per valutare nuovamente la condizione e procedere con il giro successivo.

---

## **Modulo 7: Il Ciclo for e la funzione range**

Il ciclo `for` è lo strumento ideale quando sappiamo già quante volte un'operazione deve essere ripetuta o quando dobbiamo scorrere una collezione di elementi.

* **Il Ciclo `for`**: A differenza del `while`, non c'è rischio di loop infiniti (nella maggior parte dei casi), perché itera su una sequenza ben definita e gestisce l'avanzamento automaticamente.
* **La funzione `range()`**: Genera sequenze di numeri interi "al volo", risparmiando memoria. Accetta fino a tre argomenti: `range(start, stop, step)`.
    * `start`: Il numero di partenza (incluso). Se omesso, parte da 0.
    * `stop`: Il numero di fine (**escluso**). `range(5)` genera i numeri 0, 1, 2, 3, 4.
    * `step`: Il passo o incremento. `range(0, 10, 2)` genera 0, 2, 4, 6, 8. Può essere negativo per contare alla rovescia.
* **Variabile di Iterazione**: La variabile scritta dopo il `for` (es. `for anno in range(2024, 2037):`) si "veste" automaticamente del valore corrente della sequenza ad ogni iterazione (ideale per simulare progressioni temporali, ad esempio fino all'anno obiettivo 2036).

---

## **Modulo 8: I Moduli della Standard Library**

Python è famoso per le sue batterie incluse ("batteries included"). La Standard Library è un arsenale di strumenti pronti all'uso, ideali per essere sfruttati immediatamente in ambienti cloud o IDE locali.

* **Cos'è un Modulo**: Un file contenente codice Python (funzioni, variabili, classi) già testato e ottimizzato.
* **Sintassi di Importazione**:
    * `import math`: Importa tutto il modulo. Per usare una funzione serve la dot notation (es. `math.sqrt(16)` per la radice quadrata).
    * `from random import randint`: Importa solo la funzione specifica. Si usa direttamente: `randint(1, 10)`.
* **Moduli Chiave per la didattica e i calcoli**:
    * `math`: Costanti (come `math.pi`) e funzioni avanzate (logaritmi, trigonometria).
    * `random`: Estrazioni casuali. Ottimo per creare giochi, simulatori o scegliere elementi a caso.
    * `datetime`: Fondamentale per gestire serie storiche, scadenze, o semplicemente sapere che giorno è oggi.
    * `platform`: Raccoglie dati sull'hardware e sul sistema operativo su cui gira lo script.
    * `re`: (Regular Expressions) Strumento avanzatissimo per trovare pattern all'interno di grossi blocchi di testo (es. validare un indirizzo email).

---

## **Modulo 9: Funzioni**

Le funzioni permettono di raggruppare un blocco di codice in un "comando personalizzato" riutilizzabile. Rispettano il principio DRY (*Don't Repeat Yourself*).

* **Definizione (`def`)**: Si crea usando la parola chiave `def`, un nome (stesse regole delle variabili) e le parentesi tonde.
* **Parametri e Argomenti**: Le variabili dichiarate tra le parentesi durante la definizione si chiamano *parametri*. I dati reali che passiamo alla funzione quando la chiamiamo si chiamano *argomenti*.
* **Istruzione `return`**: La differenza tra una funzione che "fa qualcosa" e una che "restituisce qualcosa". Il `return` fa uscire un valore dalla funzione affinché il programma principale possa salvarlo e usarlo (es. in un calcolo matematico). Chiude immediatamente la funzione.
* **Parametri di Default**: Possiamo assegnare un valore standard a un parametro (es. `def calcola(valore, iva=0.22):`). Se chi chiama la funzione non specifica l'IVA, Python userà 0.22 automaticamente.
* **Docstring**: Sotto la definizione (con `""" """`), si inserisce una documentazione che spiega cosa fa la funzione, i parametri attesi e cosa restituisce.

---

## **Modulo 10: Variabili Globali e Variabili Locali (Scope)**

Capire lo *Scope* (ambito di visibilità) è fondamentale per non sovrascrivere dati per errore quando si usano le funzioni.

* **Local Scope (Ambito Locale)**: Le variabili create *all'interno* di una funzione sono locali. Esistono solo mentre la funzione sta lavorando e vengono distrutte (pulite dalla memoria) appena viene eseguito il `return`. Non sono accessibili dall'esterno.
* **Global Scope (Ambito Globale)**: Le variabili definite fuori da tutte le funzioni (nel corpo principale del file) sono globali.
* **Accessibilità e la keyword `global`**:
    * Una funzione può "leggere" una variabile globale.
    * Una funzione **non può modificare** direttamente una variabile globale riassegnandola, a meno che non si utilizzi esplicitamente la parola chiave `global nome_variabile` all'inizio della funzione.
* **Best Practice**: Modificare le variabili globali dentro le funzioni rende il codice imprevedibile e difficile da debuggare (i famosi "effetti collaterali" o *side effects*). È sempre preferibile passare i dati tramite i parametri e riottenerli tramite `return`.

---

## **Modulo 11: Le Liste**

Le variabili classiche contengono un solo dato per volta. Le liste sono strutture di dati fondamentali per ospitare intere collezioni di informazioni.

* **Definizione**: Creata usando le parentesi quadre `[]`. Gli elementi sono separati da virgole.
    * *Esempio per serie di dati:* `ticker_portafoglio = ["VWCE", "QDEV", "NUKL", "LCUJ", "EUNK"]`. Possono coesistere tipologie di fondi diversi (es. focus settoriali, geografici specifici sul Giappone come `LCUJ` o varianti ad accumulazione come `EUNK`).
* **Indici In base 0**: L'informatica conta a partire da zero. Il primo elemento è `lista[0]`, il secondo `lista[1]`. Gli indici negativi contano dalla fine (es. `lista[-1]` è l'ultimo elemento).
* **Slicing**: Estrazione di fette di lista usando i due punti `:`. `lista[1:4]` estrae dall'indice 1 fino al 3 (il 4 è escluso).
* **Metodi Principali (Mutations)**:
    * `append(elemento)`: Aggiunge un dato in coda alla lista.
    * `insert(indice, elemento)`: Inserisce un dato in una posizione esatta.
    * `extend(altra_lista)`: Fonde una seconda lista nella prima.
    * `pop(indice)`: Rimuove l'elemento all'indice specificato e lo restituisce. Se vuoto, rimuove l'ultimo.
    * `remove(valore)`: Cerca e rimuove la prima occorrenza di un valore specifico.
    * `sort()`: Ordina la lista in modo alfabetico o crescente (modificando la lista originale).
* **Iterazione**: Il modo più elegante per scorrere una lista è il ciclo `for`. Es: `for ticker in ticker_portafoglio: print(ticker)`.