## **Modulo 1 : Valori e Operatori Numerici**

**Sintesi dei contenuti:**

- **I Commenti**: Utilizzo del simbolo # per annotare il codice e renderlo leggibile o escludere parti di esso dall'esecuzione.

- **Tipi di Dato Numerici**: Distinzione tra numeri interi (int) e numeri a virgola mobile (float).

- **Operatori Aritmetici**: Utilizzo dei simboli per addizione (+), sottrazione (-), moltiplicazione (*), divisione (/), elevamento a potenza (**), divisione intera (//) e modulo (%).

- **Funzioni di Controllo**: Utilizzo di type() per identificare il tipo di dato e isinstance() per verificare l'appartenenza di un valore a una determinata classe.

**Obiettivo Didattico:** Al termine di questa sezione, lo studente sarà in grado di interagire con l'ambiente Python per eseguire calcoli matematici, comprendere la differenza fondamentale tra numeri interi e decimali e saper ispezionare la natura dei dati utilizzando le funzioni integrate del linguaggio.

## **Modulo 2 : Variabili e Stringhe**

**Sintesi dei contenuti:**

- **Concetto di Variabile**: Definizione di variabile come "contenitore" (scatola) in memoria identificato da un nome, creato tramite l'operazione di assegnazione (=).

- **Regole di Naming**: I nomi delle variabili devono contenere solo lettere, numeri e underscore (_), non possono iniziare con un numero e non possono contenere operatori (come il trattino -).

- **Tipizzazione Dinamica**: In Python, una stessa variabile può cambiare il tipo di dato contenuto (es. passare da un numero a una stringa) senza errori.

- **Le Stringhe (str)**: Introduzione al tipo di dato testuale, racchiuso tra singoli apici (' ') o doppi apici (" ").

- **Caratteri di Escape**: Uso della barra rovesciata (\) per inserire caratteri speciali (come apici all'interno di una stringa) senza interrompere la sintassi.

- **Concatenazione**: Unione di più stringhe utilizzando l'operatore +.

**Obiettivo Didattico:** L'obiettivo è imparare a memorizzare e manipolare informazioni testuali e numeriche all'interno dei programmi. Lo studente apprenderà come nominare correttamente gli oggetti, come gestire la flessibilità dei tipi di dato in Python e come costruire frasi complesse combinando diverse stringhe.

## **Modulo 3 : Conversioni tra tipi di dato, funzioni print e input**

**Sintesi dei contenuti:**

- Casting (Conversione di tipo): Uso delle funzioni int(), float() e str() per trasformare i dati da un tipo all'altro, operazione necessaria per evitare errori di tipo (TypeError) durante la concatenazione o i calcoli.

- La funzione print(): Strumento per visualizzare dati in output. Viene approfondito l'uso del carattere speciale \n per andare a capo e delle triple virgolette (""") per testi multilinea.

- La funzione input(): Strumento per l'interazione con l'utente. Concetto fondamentale: tutto ciò che viene inserito tramite input() viene interpretato da Python come una stringa (str), indipendentemente dal contenuto.

- Struttura di un programma: Combinazione di variabili, input, conversioni e output per creare una logica interattiva (il "Primo Programma").

**Obiettivo Didattico:** L'obiettivo è rendere il codice "interattivo" e "dinamico". Lo studente imparerà a far comunicare l'utente con il computer, a gestire correttamente i dati in entrata trasformandoli nel tipo corretto per eseguire operazioni logico-matematiche e a formattare l'output in modo leggibile.

## **Modulo 4 : Controllo del Flusso, Algebra Booleana e Operatori di Comparazione**

**Sintesi dei contenuti:**

- Diagrammi di Flusso (Flowcharts): Rappresentazione visiva della logica di un programma prima della scrittura del codice.

- Tipo di dato Boolean (bool): Introduzione ai valori True (Vero) e False (Falso).

- Operatori di Comparazione: Simboli per confrontare valori (==, !=, >, <, >=, <=). Importanza della differenza tra = (assegnazione) e == (uguaglianza).

- Operatori Logici (Algebra Booleana): Utilizzo di and (entrambi veri), or (almeno uno vero) e not (inversione del valore) per costruire condizioni complesse.

**Obiettivo Didattico: **L'obiettivo è acquisire la capacità di formalizzare il pensiero logico. Lo studente imparerà a valutare la veridicità di un'affermazione informatica, combinando più criteri di confronto per permettere al programma, in futuro, di prendere decisioni autonome.

## **Modulo 5 : Istruzioni if, elif ed else**

**Sintesi dei contenuti:**

- Istruzione if (Se): Esegue un blocco di codice solo se una condizione è vera (True).

- L'Indentazione: Regola fondamentale di Python che usa gli spazi (solitamente 4) per definire quali istruzioni appartengono a un blocco decisionale.

- Istruzione else (Altrimenti): Definisce un blocco di codice alternativo da eseguire quando la condizione dell' if è falsa (False).

- Istruzione elif (Altrimenti se): Permette di verificare più condizioni in sequenza. Si attiva solo se le condizioni precedenti sono fallite.

- Istruzione pass: Un "segnaposto" che non fa nulla, utile per evitare errori di sintassi mentre si pianifica la struttura del codice.

**Obiettivo Didattico:** L'obiettivo è padroneggiare le strutture di controllo condizionale per creare programmi capaci di reagire in modo differenziato a seconda dei dati ricevuti. Lo studente imparerà a gestire la logica a bivi e a rispettare la sintassi basata sull'indentazione.

## **Modulo 6 : Ciclo while, istruzioni break e continue**
**Sintesi dei contenuti:**

- Il Ciclo while: Un costrutto che permette di ripetere un blocco di codice finché una determinata condizione rimane vera (True).

- Loop Infiniti: Analisi delle situazioni in cui una condizione non diventa mai falsa e come gestirle (o evitarle).

- Istruzione break: Permette di interrompere bruscamente il ciclo e uscire dal blocco di iterazione, indipendentemente dalla condizione iniziale.

- Istruzione continue: Permette di saltare il resto del codice contenuto nel ciclo per quella specifica iterazione, facendo ripartire il ciclo dal controllo della condizione.

- Contatori e Aggiornamento: L'importanza di modificare le variabili di controllo (es. counter += 1) per evitare cicli infiniti non voluti.

**Obiettivo Didattico:** L'obiettivo è imparare a gestire la iterazione condizionale. Al termine della lezione, lo studente sarà in grado di creare programmi che ripetono azioni in modo intelligente, sapendo quando forzare l'uscita da un loop o quando saltare passaggi specifici basandosi su eventi dinamici.

## **Modulo 7 : Il Ciclo for e la funzione range**
**Sintesi dei contenuti:**

- Il Ciclo for: Strumento per eseguire un blocco di codice per un numero prefissato di volte. A differenza del while, gestisce automaticamente l'inizializzazione e l'incremento della variabile di controllo.

- La funzione range(): Generatore di sequenze numeriche. Può accettare fino a tre parametri:

- Start: Il punto di inizio (incluso, default 0).

- Stop: Il punto di fine (escluso).

- Step: L'incremento (o decremento) tra un numero e l'altro (default 1).

- Variabile di Iterazione: La variabile definita nel for (spesso chiamata i, n o numero) assume automaticamente il valore corrente della sequenza a ogni giro.

**Obiettivo Didattico:** L'obiettivo è imparare a gestire iterazioni numeriche in modo sintetico e leggibile. Al termine della lezione, lo studente saprà generare intervalli di numeri personalizzati (crescenti, decrescenti o a salti) e automatizzare processi ripetitivi senza dover gestire manualmente i contatori.

## **Modulo 8 : I Moduli della Standard Library**
**Sintesi dei contenuti:**

- Concetto di Modulo: Insieme di funzioni, classi e variabili pre-scritte da esperti per risolvere problemi comuni (matematica, tempo, casualità, etc.).

**Metodi di Importazione:**

- import nome_modulo: Importa tutto, richiede la dot notation (es. math.sqrt()).

- from nome_modulo import funzione: Importa solo ciò che serve, permette l'uso diretto.

- from nome_modulo import *: Importa tutto (sconsigliato in progetti grandi).

**Moduli Principali Analizzati:**

- math: Operazioni matematiche avanzate.
- random: Generazione di numeri e scelte casuali.
- datetime: Gestione di date e orari.
- platform: Informazioni sul sistema operativo in uso.
- re: Espressioni regolari per la ricerca di testo.

**Obiettivo Didattico:** L'obiettivo è imparare a estendere le funzionalità base di Python importando strumenti esterni. Lo studente acquisirà la capacità di consultare la documentazione dei moduli e di applicare funzioni specializzate per rendere i propri programmi più potenti e professionali.

## **Modulo 9 : Funzioni**
**Sintesi dei contenuti:**

- Definizione e Chiamata: Uso della parola chiave def, seguita dal nome della funzione e dalle parentesi.

- Parametri e Argomenti: Come passare dati alle funzioni (parametri sono i nomi nelle parentesi, argomenti sono i valori reali passati).

- Istruzione return: Come far sì che una funzione restituisca un valore utilizzabile dal resto del programma (fondamentale per evitare che i dati rimangano "chiusi" dentro la funzione).

- Docstring: L'uso dei tripli apici """ """ per documentare lo scopo della funzione.

- Parametri di Default: Creare funzioni con valori predefiniti che possono essere omessi durante la chiamata.

- Il tipo None: Cosa succede quando una funzione non restituisce nulla esplicitamente.

**Obiettivo Didattico:** L'obiettivo è imparare a scomporre un problema complesso in sotto-problemi più piccoli e gestibili (funzioni). Al termine della lezione, lo studente sarà in grado di creare i propri "comandi personalizzati", riducendo la duplicazione del codice e migliorando la leggibilità dei propri script.

## **Modulo 10 : Variabili Globali e Variabili Locali**
**Sintesi dei contenuti:**

- Global Scope (Ambito Globale): L'ambiente principale del programma. Le variabili create qui vivono finché il programma è attivo e sono leggibili ovunque.

- Local Scope (Ambito Locale): Un ambiente temporaneo creato ogni volta che viene chiamata una funzione. Le variabili create dentro una funzione "muoiono" quando la funzione termina.

- Accessibilità: Le funzioni possono leggere variabili globali, ma non possono modificarle direttamente senza permessi speciali.

- Istruzione global: La parola chiave necessaria per autorizzare una funzione a modificare una variabile che risiede nello scope globale.

- Best Practice: Perché è meglio preferire le variabili locali (passaggio di parametri e return) rispetto all'uso massiccio di variabili globali.

**Obiettivo Didattico:** L'obiettivo è comprendere il ciclo di vita delle variabili e i confini della loro visibilità. Al termine della lezione, lo studente saprà gestire correttamente il passaggio di dati tra funzioni e il programma principale, evitando conflitti di nomi e spreco di memoria.

## **Modulo 11 : Le Liste**
**Sintesi dei contenuti:**

- Definizione: Una lista è una collezione ordinata di elementi, racchiusi tra parentesi quadre [] e separati da virgole. Può contenere tipi di dato misti (int, string, float, persino altre liste).

- Gli Indici: Fondamentale ricordare che il conteggio parte da 0.

- Slicing: La tecnica per "affettare" le liste ed estrarre porzioni (es. lista[1:4]).

**Metodi Principali:**

- append(): Aggiunge un elemento alla fine.
- extend(): Unisce due liste.
- sort(): Ordina gli elementi.
- pop() e remove(): Rimuovono elementi (per posizione o per valore).

**Iterazione:** Come usare il ciclo for per scorrere ogni singolo elemento di una lista.

**Obiettivo Didattico:** L'obiettivo è imparare a organizzare i dati in gruppi strutturati. Al termine della lezione, lo studente sarà in grado di creare, modificare, ordinare e navigare all'interno di collezioni di dati, gettando le basi per la gestione di database e informazioni complesse.
