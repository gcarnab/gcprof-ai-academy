# Modulo 6
# Deep Learning e Transformer
### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com
### Ottimizzata per Google Colab · Aggiornata al Luglio 2026

---

**Livello:** 🔴 Avanzato

**Codice Modulo:** M6

**Versione:** 1.0

**Tempo di studio stimato:** 20–25 ore

**Difficoltà:** ★★★★☆

---

<a id="indice"></a>

# Indice Modulo 6

1. [Introduzione al Deep Learning](#parte1)
2. [Il neurone artificiale e il modello matematico](#parte2)
3. [Architettura delle reti neurali profonde](#parte3)
4. [Addestramento delle reti neurali](#parte4)
5. [Funzioni di attivazione e ottimizzazione](#parte5)
6. [Convolutional Neural Network (CNN)](#parte6)
7. [Reti ricorrenti RNN, LSTM e GRU](#parte7)
8. [Transformer e meccanismo di Attention](#parte8)
9. [Deep Learning e Large Language Models](#parte9)
10. [Laboratorio finale e valutazione](#parte10)

---

<a id="parte1"></a>

# 1. Introduzione al Deep Learning

Il **Deep Learning** rappresenta oggi una delle tecnologie più rivoluzionarie dell'informatica moderna. Grazie ad esso è stato possibile sviluppare sistemi capaci di riconoscere immagini, comprendere il linguaggio naturale, tradurre testi, generare musica, creare immagini realistiche, guidare automobili autonome e sviluppare assistenti virtuali sempre più sofisticati come ChatGPT, Gemini, Claude e Copilot.

Negli ultimi anni il Deep Learning è passato dall'essere un settore di ricerca riservato a università e laboratori specializzati a diventare una tecnologia utilizzata quotidianamente da milioni di persone.

Ogni volta che utilizziamo uno smartphone per sbloccarlo con il riconoscimento facciale, chiediamo indicazioni ad un assistente vocale, traduciamo automaticamente un documento oppure generiamo un'immagine mediante un prompt testuale, stiamo sfruttando modelli di Deep Learning.

Questo modulo ha l'obiettivo di fornire una comprensione completa dei principi teorici e pratici che rendono possibile tutto questo.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere cosa si intende per Deep Learning;
- distinguerlo dal Machine Learning tradizionale;
- conoscere la sua evoluzione storica;
- identificare i principali campi di applicazione;
- comprenderne vantaggi e limiti;
- utilizzare correttamente la terminologia fondamentale.

---

# Cos'è il Deep Learning?

Il **Deep Learning** è una branca del **Machine Learning** basata sull'utilizzo di **reti neurali artificiali profonde** (Deep Neural Networks).

La parola **Deep** significa *profondo* e si riferisce alla presenza di numerosi livelli (**layer**) all'interno della rete neurale.

Mentre gli algoritmi classici di Machine Learning spesso richiedono un'importante fase di preparazione manuale dei dati e delle caratteristiche (Feature Engineering), il Deep Learning è in grado di apprendere automaticamente rappresentazioni sempre più complesse partendo direttamente dai dati grezzi.

In altre parole:

- il Machine Learning tradizionale richiede spesso che sia l'essere umano a decidere quali caratteristiche siano importanti;
- il Deep Learning impara autonomamente quali informazioni sono realmente significative.

Questa capacità rappresenta il motivo principale del suo enorme successo.

---

# Dall'Intelligenza Artificiale al Deep Learning

Per comprendere correttamente il ruolo del Deep Learning è importante distinguere tre concetti fondamentali.

## Intelligenza Artificiale (Artificial Intelligence)

L'Intelligenza Artificiale è il settore dell'informatica che studia la progettazione di sistemi capaci di simulare comportamenti intelligenti.

Comprende numerose tecniche:

- sistemi esperti;
- logica;
- ricerca;
- pianificazione;
- robotica;
- Machine Learning;
- Deep Learning.

Il Deep Learning rappresenta quindi solo una parte dell'intera disciplina.

---

## Machine Learning

Il Machine Learning costituisce una sotto-disciplina dell'Intelligenza Artificiale.

L'obiettivo è sviluppare algoritmi capaci di imparare dai dati senza essere programmati esplicitamente.

Tra gli algoritmi più noti troviamo:

- Decision Tree
- Random Forest
- Support Vector Machine
- K-Nearest Neighbors
- Naive Bayes
- Regressione Lineare
- Regressione Logistica

Questi algoritmi funzionano molto bene su dataset strutturati e relativamente piccoli.

---

## Deep Learning

Il Deep Learning rappresenta un'evoluzione del Machine Learning.

Le reti neurali profonde permettono di affrontare problemi molto più complessi come:

- riconoscimento immagini;
- riconoscimento vocale;
- elaborazione del linguaggio naturale;
- generazione di testo;
- generazione di immagini;
- sintesi vocale;
- guida autonoma;
- robotica avanzata.

---

# Un esempio intuitivo

Immaginiamo di voler insegnare ad un computer a distinguere un gatto da un cane.

## Machine Learning classico

L'essere umano deve progettare manualmente le caratteristiche da analizzare.

Ad esempio:

- lunghezza delle orecchie;
- colore del mantello;
- forma del muso;
- dimensione della coda.

Il modello utilizzerà queste informazioni per prendere una decisione.

---

## Deep Learning

Nel Deep Learning il sistema riceve direttamente migliaia o milioni di immagini.

Sarà la rete neurale ad imparare autonomamente:

- quali forme osservare;
- quali texture riconoscere;
- quali dettagli siano importanti;
- quali caratteristiche ignorare.

Il programmatore non deve definire esplicitamente queste regole.

Questa capacità di apprendimento automatico delle rappresentazioni è uno dei principali punti di forza del Deep Learning.

---

# Perché si chiama "Deep"?

Una rete neurale è composta da livelli di elaborazione chiamati **layer**.

Ad esempio:

```
Input

↓

Layer nascosto 1

↓

Layer nascosto 2

↓

Layer nascosto 3

↓

Output
```

Nelle reti moderne i livelli nascosti possono essere:

- decine;
- centinaia;
- migliaia.

Maggiore è il numero dei layer, maggiore è la capacità della rete di apprendere rappresentazioni sempre più astratte.

I primi layer imparano caratteristiche semplici.

Ad esempio, osservando immagini:

- bordi;
- linee;
- colori.

I layer successivi riconoscono:

- occhi;
- nasi;
- ruote;
- finestre.

Gli ultimi layer arrivano invece a riconoscere oggetti completi.

Questa elaborazione gerarchica è una delle caratteristiche fondamentali del Deep Learning.

---

# Breve evoluzione storica

## Anni '40

Nascono i primi modelli matematici del neurone artificiale.

---

## 1957

Frank Rosenblatt sviluppa il **Percettrone**, la prima rete neurale realmente funzionante.

---

## Anni '70 - '80

Le reti neurali incontrano enormi difficoltà pratiche.

La limitata potenza di calcolo e la scarsità di dati disponibili rallentano notevolmente la ricerca.

Questo periodo viene spesso definito **AI Winter**.

---

## Anni '90

Si diffondono algoritmi di Machine Learning più efficienti come Support Vector Machine e Random Forest.

---

## 2006

Geoffrey Hinton rilancia la ricerca sulle reti neurali profonde introducendo nuove tecniche di addestramento.

Questo evento segna l'inizio dell'era moderna del Deep Learning.

---

## 2012

Il modello **AlexNet** vince la competizione ImageNet con prestazioni nettamente superiori rispetto a tutti gli altri algoritmi.

Da questo momento il Deep Learning diventa la tecnologia dominante nella Computer Vision.

---

## 2017

Google pubblica il celebre articolo:

**Attention Is All You Need**

Nascono i Transformer.

Questo evento rivoluziona completamente il Natural Language Processing.

---

## Dal 2020 ad oggi

Assistiamo alla diffusione dei Large Language Models.

Tra i più importanti troviamo:

- GPT
- Llama
- Claude
- Gemini
- Mistral
- Gemma
- Qwen

Questi modelli rappresentano oggi lo stato dell'arte dell'Intelligenza Artificiale Generativa.

---

# Principali campi di applicazione

Il Deep Learning viene oggi utilizzato praticamente in ogni settore.

## Computer Vision

- riconoscimento facciale;
- videosorveglianza;
- controllo qualità industriale;
- diagnostica medica;
- veicoli autonomi.

---

## Natural Language Processing

- traduzione automatica;
- chatbot;
- assistenti virtuali;
- analisi del sentiment;
- riassunto automatico.

---

## Generative AI

- generazione di testo;
- immagini;
- video;
- audio;
- codice sorgente.

---

## Robotica

- pianificazione dei movimenti;
- navigazione autonoma;
- manipolazione di oggetti.

---

## Finanza

- previsione dei mercati;
- rilevamento frodi;
- valutazione del rischio.

---

## Sanità

- diagnosi assistita;
- analisi di immagini mediche;
- progettazione di nuovi farmaci.

---

# Vantaggi del Deep Learning

Tra i principali vantaggi troviamo:

- apprendimento automatico delle caratteristiche;
- elevata accuratezza;
- ottima scalabilità;
- capacità di lavorare con enormi quantità di dati;
- prestazioni eccellenti su immagini, testo e audio;
- possibilità di affrontare problemi estremamente complessi.

---

# Limiti del Deep Learning

Il Deep Learning presenta tuttavia alcuni limiti importanti.

Richiede:

- grandi quantità di dati;
- hardware molto potente;
- GPU dedicate;
- tempi di addestramento elevati;
- elevati consumi energetici.

Inoltre i modelli risultano spesso difficili da interpretare.

Per questo motivo vengono spesso definiti **Black Box Models**, cioè modelli il cui processo decisionale interno non è immediatamente comprensibile.

---

# Concetti chiave da ricordare

Al termine di questa prima parte dovresti aver compreso che:

- il Deep Learning è una branca del Machine Learning;
- utilizza reti neurali profonde;
- apprende automaticamente le caratteristiche dei dati;
- rappresenta la tecnologia alla base dei moderni modelli generativi;
- costituisce oggi il principale motore dell'Intelligenza Artificiale moderna.

Nei prossimi capitoli inizieremo a studiare l'elemento fondamentale di ogni rete neurale: **il neurone artificiale**, comprendendone il modello matematico e il funzionamento interno.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte2"></a>

# 2. Il neurone artificiale e il modello matematico

Il neurone artificiale costituisce l'unità fondamentale di ogni rete neurale. Così come il bit rappresenta l'elemento base dell'informatica tradizionale, il neurone rappresenta il mattone con cui vengono costruiti i moderni modelli di Deep Learning.

Anche i modelli più avanzati, come GPT, Llama, Claude o Gemini, sono composti da milioni o addirittura miliardi di neuroni artificiali organizzati in reti estremamente complesse.

Per comprendere realmente il funzionamento del Deep Learning è quindi indispensabile capire come opera un singolo neurone.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere l'ispirazione biologica del neurone artificiale;
- descrivere il modello matematico di McCulloch e Pitts;
- comprendere il ruolo di pesi, bias e funzione di attivazione;
- eseguire il calcolo dell'output di un neurone;
- comprendere il funzionamento del Percettrone.

---

# Il neurone biologico

L'idea delle reti neurali nasce osservando il funzionamento del cervello umano.

Il cervello contiene circa **86 miliardi di neuroni**, collegati tra loro attraverso migliaia di connessioni chiamate **sinapsi**.

Ogni neurone riceve continuamente segnali elettrici da altri neuroni.

Questi segnali vengono:

1. ricevuti;
2. elaborati;
3. eventualmente trasmessi ad altri neuroni.

L'intero processo avviene in pochi millisecondi.

Sebbene il neurone artificiale sia una rappresentazione estremamente semplificata di quello biologico, ne conserva il principio fondamentale: **ricevere informazioni, elaborarle e produrre un'uscita**.

---

# Dal neurone biologico al neurone artificiale

Nel 1943 Warren McCulloch e Walter Pitts proposero il primo modello matematico di neurone artificiale.

L'idea era sorprendentemente semplice.

Un neurone artificiale:

- riceve uno o più valori in ingresso;
- assegna un'importanza diversa a ciascun ingresso;
- somma tutti i contributi;
- applica una funzione matematica;
- produce un valore in uscita.

Questo schema costituisce ancora oggi la base di tutte le reti neurali moderne.

---

# Struttura di un neurone artificiale

Un neurone è composto da cinque elementi fondamentali:

## 1. Input

Sono i dati in ingresso.

Possono rappresentare:

- pixel di un'immagine;
- valori numerici;
- caratteristiche di un cliente;
- parole di una frase;
- misurazioni provenienti da sensori.

Generalmente vengono indicati con:

```
x₁
x₂
x₃
...
xₙ
```

---

## 2. Pesi (Weights)

Non tutti gli input hanno la stessa importanza.

Ogni ingresso viene quindi moltiplicato per un coefficiente chiamato **peso**.

I pesi vengono indicati con:

```
w₁
w₂
w₃
...
wₙ
```

Durante l'addestramento sarà proprio il valore dei pesi a cambiare continuamente.

L'obiettivo dell'apprendimento consiste infatti nel trovare il valore ottimale di ciascun peso.

---

## 3. Somma pesata

Il neurone calcola una combinazione lineare degli ingressi.

Matematicamente:

```
z = x₁·w₁ + x₂·w₂ + ... + xₙ·wₙ
```

Questa operazione prende il nome di **somma pesata**.

---

## 4. Bias

Alla somma viene aggiunto un parametro chiamato **bias**.

Il bias permette al neurone di adattarsi con maggiore flessibilità ai dati.

La nuova espressione diventa:

```
z = x₁·w₁ + x₂·w₂ + ... + xₙ·wₙ + b
```

dove **b** rappresenta il bias.

Il bias può essere interpretato come un termine di regolazione che consente di spostare la soglia di attivazione del neurone.

---

## 5. Funzione di attivazione

L'ultimo passaggio consiste nell'applicare una funzione matematica.

```
Output = f(z)
```

Questa funzione determina il valore finale prodotto dal neurone.

Nel prossimo capitolo analizzeremo in dettaglio le principali funzioni di attivazione.

---

# Il modello matematico completo

Il funzionamento di un neurone può essere riassunto nella seguente sequenza:

```
Input

↓

Moltiplicazione per i pesi

↓

Somma pesata

↓

Bias

↓

Funzione di attivazione

↓

Output
```

La formula completa è:

```
ŷ = f( Σ(xᵢ·wᵢ) + b )
```

dove:

- **x** rappresenta gli input;
- **w** rappresenta i pesi;
- **b** rappresenta il bias;
- **f()** è la funzione di attivazione;
- **ŷ** è l'output del neurone.

Questa semplice equazione costituisce il cuore di tutto il Deep Learning moderno.

---

# Un esempio numerico

Supponiamo di avere:

```
x₁ = 2

x₂ = 4

w₁ = 0.6

w₂ = 0.3

b = 0.5
```

Calcoliamo la somma pesata.

```
z = (2 × 0.6)

  + (4 × 0.3)

  + 0.5

  = 1.2 + 1.2 + 0.5

  = 2.9
```

Il valore ottenuto verrà successivamente elaborato dalla funzione di attivazione.

L'output finale dipenderà quindi dal tipo di funzione utilizzata (Sigmoid, ReLU, Tanh, ecc.).

---

# Il Percettrone

Nel 1957 Frank Rosenblatt sviluppò il **Percettrone (Perceptron)**, considerato la prima vera rete neurale artificiale.

Il Percettrone era composto da:

- input;
- pesi;
- bias;
- funzione di attivazione.

Era in grado di imparare automaticamente modificando i propri pesi durante l'addestramento.

Per problemi semplici rappresentò un enorme passo avanti.

Tuttavia possedeva un limite molto importante.

Poteva risolvere soltanto problemi **linearmente separabili**.

Questo limite venne evidenziato nel 1969 da Marvin Minsky e Seymour Papert, provocando un forte rallentamento della ricerca sulle reti neurali.

La soluzione arriverà molti anni dopo con l'introduzione delle **reti neurali multistrato (Multi Layer Perceptron)**, che studieremo nei prossimi capitoli.

---

# Perché i pesi sono così importanti?

Possiamo immaginare ogni peso come una "manopola" che regola l'importanza di una determinata informazione.

Durante l'addestramento la rete modifica continuamente milioni o miliardi di questi valori.

L'apprendimento consiste proprio nell'individuare la configurazione dei pesi che minimizza l'errore di previsione.

Per questo motivo si dice spesso che:

> **Una rete neurale "impara" modificando i propri pesi.**

L'architettura della rete rimane generalmente invariata; ciò che cambia è il valore dei parametri interni.

---

# Concetti chiave da ricordare

- Il neurone artificiale è l'unità fondamentale del Deep Learning.
- Riceve dati in ingresso, li pesa e produce un output.
- Ogni input possiede un peso che ne determina l'importanza.
- Il bias permette di aumentare la flessibilità del modello.
- La funzione di attivazione introduce la non linearità.
- Il Percettrone rappresenta il primo modello di neurone artificiale.
- L'apprendimento consiste nell'aggiornamento continuo dei pesi.

Nel prossimo capitolo vedremo come migliaia o milioni di neuroni possano essere collegati tra loro per costruire **reti neurali profonde**, capaci di affrontare problemi estremamente complessi.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte3"></a>

# 3. Architettura delle reti neurali profonde

Nella parte precedente abbiamo studiato il funzionamento di un singolo neurone artificiale. Sebbene il suo modello matematico sia relativamente semplice, un neurone isolato è in grado di risolvere soltanto problemi molto elementari.

La vera potenza del Deep Learning emerge quando migliaia o addirittura miliardi di neuroni vengono collegati tra loro formando una **rete neurale artificiale** (Artificial Neural Network - ANN).

Ogni neurone svolge un piccolo compito. La cooperazione tra milioni di neuroni permette invece di riconoscere immagini, comprendere il linguaggio umano, tradurre testi, guidare veicoli autonomi e generare contenuti complessi.

In questo capitolo analizzeremo come vengono costruite le reti neurali profonde e come le informazioni si propagano attraverso i vari livelli della rete.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere la struttura generale di una rete neurale;
- distinguere input layer, hidden layer e output layer;
- comprendere il concetto di profondità (*depth*);
- capire come avviene la propagazione delle informazioni;
- comprendere il ruolo dei parametri di una rete neurale.

---

# Dalla singola cellula alla rete neurale

Un singolo neurone può essere paragonato a una persona che prende una decisione molto semplice.

Una rete neurale può invece essere vista come un'intera organizzazione composta da migliaia di persone, ognuna specializzata in un compito specifico.

Ogni neurone riceve informazioni dai neuroni precedenti, le elabora e trasmette il risultato ai neuroni successivi.

L'intelligenza della rete non nasce quindi da un singolo neurone, ma dalla collaborazione tra milioni di unità computazionali.

---

# Cos'è una rete neurale?

Una rete neurale artificiale è un insieme di neuroni collegati tra loro mediante connessioni pesate.

Ogni connessione trasporta un'informazione numerica.

Durante l'addestramento la rete modifica continuamente il valore dei pesi, migliorando progressivamente la qualità delle proprie previsioni.

La struttura generale può essere rappresentata nel seguente modo.

```text
Input Layer

↓

Hidden Layer

↓

Hidden Layer

↓

Hidden Layer

↓

Output Layer
```

Ogni livello svolge una funzione ben precisa.

---

# Input Layer

L'**Input Layer** rappresenta il punto di ingresso dei dati.

I neuroni di questo livello non effettuano alcuna elaborazione.

Il loro unico compito consiste nel trasferire i dati ai livelli successivi.

Gli input possono rappresentare:

- pixel di un'immagine;
- valori numerici;
- coordinate;
- misurazioni;
- parole trasformate in vettori;
- campioni audio.

### Esempio

Per classificare una fotografia di dimensione 224×224 pixel con tre canali colore (RGB), l'Input Layer dovrà ricevere oltre 150.000 valori numerici.

---

# Hidden Layer

Gli **Hidden Layer** costituiscono il cuore della rete neurale.

È proprio qui che avviene l'apprendimento.

Ogni livello nascosto riceve i dati dal livello precedente, esegue una trasformazione matematica e trasmette il risultato al livello successivo.

La presenza di più livelli consente alla rete di costruire rappresentazioni sempre più astratte.

Ad esempio, durante il riconoscimento di un volto:

Primo livello:

- linee;
- bordi;
- contrasti.

Secondo livello:

- angoli;
- curve;
- texture.

Terzo livello:

- occhi;
- naso;
- bocca.

Ultimi livelli:

- volto completo;
- identità della persona.

Questa elaborazione gerarchica costituisce uno degli aspetti più affascinanti del Deep Learning.

---

# Output Layer

L'ultimo livello della rete prende il nome di **Output Layer**.

Il suo compito consiste nel produrre il risultato finale.

L'output dipende dal tipo di problema.

### Classificazione

L'output rappresenta una probabilità.

Ad esempio:

```
Gatto

0.97
```

```
Cane

0.02
```

```
Coniglio

0.01
```

Il modello classificherà l'immagine come **gatto**, poiché presenta la probabilità maggiore.

---

### Regressione

Nel caso della regressione l'output sarà invece un numero reale.

Ad esempio:

```
Prezzo previsto

327.500 €
```

---

# Cosa significa "Deep"?

Il termine **Deep** non indica una particolare tecnologia.

Indica semplicemente il numero di livelli nascosti presenti nella rete.

Una rete con un solo Hidden Layer viene generalmente considerata una rete neurale "tradizionale".

Quando il numero dei livelli aumenta significativamente si parla invece di **Deep Neural Network**.

Le reti moderne possono contenere:

- decine di layer;
- centinaia di layer;
- migliaia di layer.

Nei Large Language Models il concetto di profondità assume un'importanza ancora maggiore, poiché ogni livello contribuisce a costruire rappresentazioni linguistiche sempre più sofisticate.

---

# Numero di neuroni

Oltre alla profondità, un'altra caratteristica fondamentale è il numero di neuroni presenti in ciascun livello.

Ad esempio:

```text
Input

784 neuroni

↓

Hidden Layer

256 neuroni

↓

Hidden Layer

128 neuroni

↓

Hidden Layer

64 neuroni

↓

Output

10 neuroni
```

Questa configurazione potrebbe essere utilizzata per riconoscere cifre scritte a mano, come nel celebre dataset MNIST.

La scelta del numero di neuroni influenza direttamente:

- capacità di apprendimento;
- velocità di addestramento;
- consumo di memoria;
- rischio di overfitting.

Non esiste una configurazione perfetta valida per tutti i problemi.

La progettazione dell'architettura rappresenta uno degli aspetti più importanti del lavoro di un AI Engineer.

---

# Forward Propagation

Quando un dato entra nella rete avviene un processo chiamato **Forward Propagation**.

L'informazione attraversa tutti i livelli della rete seguendo sempre la stessa direzione:

```text
Input

↓

Hidden Layer 1

↓

Hidden Layer 2

↓

Hidden Layer 3

↓

Output
```

Ogni neurone riceve i valori provenienti dal livello precedente, esegue il proprio calcolo matematico e trasmette il risultato al livello successivo.

Alla fine della propagazione viene prodotta una previsione.

Questa previsione verrà successivamente confrontata con il valore corretto durante la fase di addestramento.

---

# Parametri di una rete neurale

Una rete neurale possiede due categorie principali di parametri.

## Parametri addestrabili

Sono quelli che cambiano durante il training.

Comprendono:

- pesi;
- bias.

Questi valori vengono continuamente aggiornati dall'algoritmo di ottimizzazione.

---

## Iperparametri

Sono invece definiti dal progettista della rete.

Tra i principali troviamo:

- numero di layer;
- numero di neuroni;
- learning rate;
- dimensione del batch;
- numero di epoche;
- funzione di attivazione;
- ottimizzatore.

Gli iperparametri non vengono appresi automaticamente.

La loro scelta influenza profondamente le prestazioni del modello.

---

# Una rete neurale come una squadra

Un'analogia utile consiste nell'immaginare una squadra di specialisti.

Ogni persona svolge un compito molto semplice.

Il risultato finale nasce dalla collaborazione dell'intero gruppo.

Lo stesso accade nelle reti neurali.

Un singolo neurone non "comprende" il significato di un'immagine o di una frase.

È la cooperazione tra milioni di neuroni che permette alla rete di sviluppare comportamenti intelligenti.

Questa proprietà viene definita **intelligenza emergente**, poiché deriva dall'interazione tra un enorme numero di componenti relativamente semplici.

---

# Concetti chiave da ricordare

- Una rete neurale è composta da milioni di neuroni artificiali collegati tra loro.
- Ogni rete è organizzata in Input Layer, Hidden Layer e Output Layer.
- Gli Hidden Layer costituiscono il cuore del processo di apprendimento.
- La Forward Propagation trasporta le informazioni dall'ingresso all'uscita.
- Pesi e bias rappresentano i parametri che vengono appresi durante il training.
- Gli iperparametri vengono invece scelti dal progettista del modello.
- La profondità della rete è uno degli elementi che distingue il Deep Learning dal Machine Learning tradizionale.

Nel prossimo capitolo analizzeremo il processo di **addestramento delle reti neurali**, comprendendo come un modello riesca a migliorare progressivamente le proprie prestazioni modificando milioni o miliardi di parametri.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte4"></a>

# 4. Addestramento delle reti neurali

Nelle sezioni precedenti abbiamo studiato come è costruita una rete neurale e come le informazioni attraversino i vari livelli fino a produrre un risultato. Tuttavia, una rete neurale appena creata non possiede alcuna conoscenza: i suoi pesi vengono inizializzati casualmente e, di conseguenza, le sue previsioni risultano sostanzialmente casuali.

La fase che trasforma una rete neurale in un modello intelligente prende il nome di **addestramento** (*training*).

Durante il training la rete analizza migliaia, milioni o addirittura miliardi di esempi, confronta continuamente le proprie previsioni con i risultati corretti e modifica progressivamente i propri parametri fino a ridurre al minimo l'errore.

L'addestramento rappresenta quindi il cuore del Deep Learning.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere come una rete neurale apprende dai dati;
- conoscere il ciclo completo di addestramento;
- distinguere Forward Propagation e Backpropagation;
- comprendere il concetto di funzione di perdita (*Loss Function*);
- comprendere il ruolo del Gradient Descent;
- conoscere il significato di epoca, batch e learning rate.

---

# L'apprendimento di una rete neurale

Immaginiamo un bambino che sta imparando a riconoscere gli animali.

All'inizio commetterà molti errori.

Potrebbe scambiare un lupo per un cane oppure una tigre per un grosso gatto.

Ogni volta che qualcuno gli corregge l'errore, il bambino modifica gradualmente la propria conoscenza.

Dopo aver osservato centinaia di esempi, inizierà a riconoscere correttamente gli animali.

Una rete neurale apprende in modo molto simile.

1. osserva un esempio;
2. produce una previsione;
3. confronta la previsione con la risposta corretta;
4. calcola l'errore;
5. modifica i propri pesi;
6. ripete il processo migliaia di volte.

Ogni iterazione migliora leggermente il modello.

---

# Il ciclo di addestramento

L'intero processo può essere rappresentato come un ciclo continuo.

```text
Dataset

↓

Forward Propagation

↓

Predizione

↓

Calcolo dell'errore

↓

Backpropagation

↓

Aggiornamento dei pesi

↓

Nuova iterazione
```

Questo ciclo viene ripetuto fino a quando la rete raggiunge prestazioni soddisfacenti.

---

# Fase 1 - Inizializzazione dei pesi

Quando una rete viene creata, nessun neurone possiede conoscenze.

Per questo motivo tutti i pesi vengono inizializzati con piccoli valori casuali.

Ad esempio:

```
w₁ = 0.12

w₂ = -0.31

w₃ = 0.08

w₄ = 0.47
```

Questi valori non hanno alcun significato.

Diventeranno progressivamente più accurati durante il training.

---

# Fase 2 - Forward Propagation

I dati attraversano tutti i layer della rete.

Ogni neurone:

- riceve gli input;
- calcola la somma pesata;
- aggiunge il bias;
- applica la funzione di attivazione;
- trasmette il risultato.

Alla fine viene prodotta una previsione.

Ad esempio:

```
Immagine

↓

Probabilità

Gatto = 0.12

Cane = 0.81

Volpe = 0.07
```

La rete conclude che l'immagine rappresenta un cane.

---

# Fase 3 - Calcolo dell'errore

Supponiamo però che l'immagine fosse realmente un gatto.

La previsione è quindi errata.

La rete deve calcolare quanto ha sbagliato.

Per farlo utilizza una **funzione di perdita**, chiamata anche **Loss Function**.

La Loss misura la distanza tra:

- valore previsto;
- valore corretto.

Maggiore è la Loss, peggiore è il modello.

L'obiettivo dell'intero addestramento consiste nel ridurre progressivamente questo valore.

---

# Loss Function

La Loss Function rappresenta il "termometro" dell'apprendimento.

Se la Loss diminuisce significa che la rete sta imparando.

Se la Loss aumenta significa che qualcosa non sta funzionando.

Tra le funzioni di perdita più utilizzate troviamo:

- Mean Squared Error (MSE);
- Mean Absolute Error (MAE);
- Binary Cross Entropy;
- Categorical Cross Entropy.

La scelta dipende dal tipo di problema affrontato.

---

# Fase 4 - Backpropagation

Una volta calcolato l'errore, la rete deve capire quali pesi siano responsabili della previsione errata.

Questo processo prende il nome di **Backpropagation**.

Il termine significa letteralmente:

> propagazione all'indietro.

L'errore parte dall'Output Layer e viene propagato verso i livelli precedenti.

Durante questo percorso ogni peso viene corretto.

La Backpropagation rappresenta una delle innovazioni più importanti nella storia del Deep Learning.

Senza di essa non sarebbe possibile addestrare reti neurali profonde.

---

# Gradient Descent

Sapere che il modello ha commesso un errore non basta.

Occorre capire **come correggerlo**.

Per questo motivo viene utilizzato un algoritmo chiamato **Gradient Descent**.

L'idea è molto intuitiva.

Immaginiamo di trovarci in cima ad una montagna avvolta dalla nebbia.

L'obiettivo è raggiungere il punto più basso della valle.

Non conoscendo il percorso, ad ogni passo scegliamo la direzione in cui il terreno scende maggiormente.

Ripetendo questo procedimento arriveremo progressivamente verso il minimo.

Nel Deep Learning:

- la montagna rappresenta la Loss Function;
- la valle rappresenta il minimo errore;
- ogni passo rappresenta un aggiornamento dei pesi.

Il Gradient Descent modifica quindi i pesi nella direzione che riduce maggiormente l'errore.

---

# Learning Rate

La velocità con cui vengono aggiornati i pesi prende il nome di **Learning Rate**.

Questo parametro è estremamente importante.

### Learning Rate troppo alto

La rete effettua passi troppo grandi.

Rischia di superare continuamente il punto ottimale senza mai raggiungerlo.

Il training diventa instabile.

---

### Learning Rate troppo basso

La rete procede molto lentamente.

L'apprendimento richiede tempi estremamente lunghi.

In alcuni casi il modello può bloccarsi prima di raggiungere una buona soluzione.

La scelta del Learning Rate rappresenta uno degli aspetti più delicati nella progettazione di una rete neurale.

---

# Epoch

Un'**epoca** (*Epoch*) corrisponde ad un passaggio completo dell'intero dataset attraverso la rete neurale.

Supponiamo di possedere:

```
10.000 immagini
```

Dopo che tutte le immagini sono state elaborate una volta, abbiamo completato:

```
1 Epoch
```

Generalmente una rete viene addestrata per:

- 20 epoche;
- 50 epoche;
- 100 epoche;
- oppure diverse centinaia di epoche.

Più epoche significano generalmente un apprendimento migliore, ma aumentano anche il rischio di overfitting.

---

# Batch

Nei dataset molto grandi sarebbe impossibile elaborare tutti i dati contemporaneamente.

Per questo motivo il dataset viene suddiviso in piccoli gruppi chiamati **Batch**.

Ad esempio:

```
Dataset

50.000 immagini

↓

Batch da 100 immagini
```

La rete aggiornerà i propri pesi ogni 100 immagini invece che attendere l'intero dataset.

Questo rende l'addestramento molto più veloce ed efficiente.

---

# Mini-Batch Gradient Descent

Oggi quasi tutte le reti neurali utilizzano il **Mini-Batch Gradient Descent**.

Esso rappresenta un compromesso tra:

- velocità;
- stabilità;
- consumo di memoria.

Batch troppo piccoli producono aggiornamenti molto rumorosi.

Batch troppo grandi richiedono enormi quantità di memoria GPU.

Per questo motivo vengono spesso utilizzati batch di:

- 32;
- 64;
- 128;
- 256 esempi.

---

# Quando termina il training?

L'addestramento può interrompersi quando:

- viene raggiunto il numero massimo di epoche;
- la Loss smette di diminuire;
- l'accuratezza raggiunge il valore desiderato;
- entra in funzione una tecnica di **Early Stopping**, che analizzeremo nei prossimi capitoli.

Lo scopo non è addestrare il modello il più a lungo possibile, ma ottenere il miglior equilibrio tra accuratezza e capacità di generalizzazione.

---

# Concetti chiave da ricordare

- Una rete neurale apprende modificando continuamente i propri pesi.
- L'addestramento consiste in migliaia o milioni di iterazioni.
- La Forward Propagation produce una previsione.
- La Loss Function misura l'errore della previsione.
- La Backpropagation individua come correggere i pesi.
- Il Gradient Descent aggiorna i parametri nella direzione che riduce la Loss.
- Learning Rate, Epoch e Batch sono tra gli iperparametri più importanti del Deep Learning.

Nel prossimo capitolo studieremo uno degli elementi più importanti di una rete neurale: **le funzioni di attivazione** e gli algoritmi di ottimizzazione, responsabili della capacità delle reti profonde di apprendere relazioni estremamente complesse.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte5"></a>

# 5. Funzioni di attivazione e ottimizzazione

Nei capitoli precedenti abbiamo visto che ogni neurone artificiale riceve degli input, calcola una somma pesata e aggiunge un termine di bias. Se il processo terminasse qui, una rete neurale sarebbe semplicemente una sequenza di operazioni matematiche lineari.

Una rete composta esclusivamente da trasformazioni lineari non sarebbe in grado di risolvere problemi complessi come il riconoscimento delle immagini, la traduzione automatica o la generazione di testo.

L'elemento che rende realmente "intelligente" una rete neurale è la **funzione di attivazione** (*Activation Function*).

Grazie ad essa il modello può apprendere relazioni non lineari, cioè relazioni molto più complesse di una semplice retta.

In questo capitolo analizzeremo le principali funzioni di attivazione e gli algoritmi di ottimizzazione utilizzati durante il processo di addestramento.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere il ruolo delle funzioni di attivazione;
- distinguere le principali Activation Function;
- conoscere vantaggi e limiti di ciascuna funzione;
- comprendere il concetto di ottimizzazione;
- conoscere gli ottimizzatori più utilizzati nel Deep Learning.

---

# Perché servono le funzioni di attivazione?

Consideriamo un esempio molto semplice.

Supponiamo di avere una rete composta da dieci layer.

Se ogni layer eseguisse soltanto somme e moltiplicazioni, l'intera rete sarebbe equivalente ad una sola trasformazione lineare.

In pratica, anche una rete con cento layer si comporterebbe come una semplice regressione lineare.

Ciò renderebbe inutile aumentare la profondità della rete.

Le funzioni di attivazione introducono invece la **non linearità**, permettendo al modello di rappresentare funzioni matematiche estremamente complesse.

È proprio questa caratteristica che rende possibile il Deep Learning moderno.

---

# Come funziona una funzione di attivazione?

Ogni neurone esegue il seguente processo:

```text
Input

↓

Somma pesata

↓

Bias

↓

Funzione di attivazione

↓

Output
```

La funzione di attivazione riceve in ingresso il valore calcolato dal neurone e decide quale sarà il valore trasmesso al livello successivo.

In termini pratici, essa stabilisce quanto il neurone debba "attivarsi" in risposta agli input ricevuti.

---

# Sigmoid

La **Sigmoid** è stata una delle prime funzioni di attivazione utilizzate nelle reti neurali.

Produce sempre valori compresi tra:

```
0

e

1
```

Per questo motivo viene spesso interpretata come una probabilità.

È particolarmente utile nei problemi di classificazione binaria.

Ad esempio:

- spam / non spam;
- malato / sano;
- sì / no.

### Vantaggi

- semplice da comprendere;
- output interpretabile come probabilità;
- molto utilizzata nei modelli storici.

### Svantaggi

- apprendimento lento;
- saturazione per valori molto grandi;
- problema del **Vanishing Gradient**.

Per questi motivi oggi viene utilizzata principalmente nello strato di uscita dei modelli di classificazione binaria.

---

# Tanh (Tangente iperbolica)

La funzione **Tanh** rappresenta un'evoluzione della Sigmoid.

L'output è compreso tra:

```
-1

e

+1
```

Essendo centrata sullo zero, permette spesso un apprendimento più stabile.

Per molti anni è stata la funzione di riferimento nelle reti ricorrenti.

Anche la Tanh soffre però del problema del Vanishing Gradient.

---

# ReLU (Rectified Linear Unit)

La **ReLU** è oggi la funzione di attivazione più utilizzata nel Deep Learning.

Il suo comportamento è estremamente semplice.

Se il valore in ingresso è negativo, restituisce zero.

Se il valore è positivo, restituisce il valore stesso.

Esempi:

```
Input

-8

↓

Output

0
```

```
Input

5

↓

Output

5
```

Questa semplicità rende la ReLU estremamente efficiente dal punto di vista computazionale.

---

# Perché la ReLU ha rivoluzionato il Deep Learning?

Prima della diffusione della ReLU, le reti profonde erano molto difficili da addestrare.

L'introduzione di questa funzione ha consentito di:

- accelerare il training;
- ridurre il Vanishing Gradient;
- costruire reti molto più profonde;
- migliorare le prestazioni generali.

Oggi la maggior parte delle CNN e dei Transformer utilizza varianti della ReLU.

---

# Leaky ReLU

La ReLU presenta un piccolo problema.

Quando il valore è negativo, l'output rimane sempre pari a zero.

Alcuni neuroni possono quindi "morire", smettendo completamente di apprendere.

Questo fenomeno prende il nome di **Dead Neuron Problem**.

Per risolverlo è stata introdotta la **Leaky ReLU**.

Essa permette ai valori negativi di continuare a propagarsi, anche se molto attenuati.

In questo modo il neurone continua ad apprendere.

---

# GELU

Nei moderni Large Language Models viene spesso utilizzata la funzione **GELU (Gaussian Error Linear Unit)**.

Questa funzione offre prestazioni superiori rispetto alla ReLU in molti modelli linguistici.

Tra i modelli che la utilizzano troviamo:

- GPT;
- BERT;
- Gemma;
- Llama;
- Claude.

La GELU rappresenta oggi uno degli standard per i Transformer.

---

# Confronto tra le principali funzioni

| Funzione | Intervallo | Utilizzo principale |
|-----------|------------|--------------------|
| Sigmoid | 0 → 1 | Classificazione binaria |
| Tanh | -1 → +1 | Reti ricorrenti |
| ReLU | 0 → +∞ | CNN e Deep Learning generale |
| Leaky ReLU | valori negativi attenuati | Variante della ReLU |
| GELU | non lineare | Transformer e LLM |

---

# Vanishing Gradient

Uno dei principali problemi storici del Deep Learning è il **Vanishing Gradient**.

Durante la Backpropagation il gradiente viene propagato dall'Output Layer verso gli strati iniziali.

In reti molto profonde il gradiente può diventare sempre più piccolo.

Quando il gradiente si avvicina a zero:

- i pesi non vengono più aggiornati;
- la rete smette di imparare;
- il training rallenta drasticamente.

L'introduzione della ReLU e di architetture più moderne ha ridotto notevolmente questo problema.

---

# Ottimizzazione

Una volta calcolato il gradiente, occorre aggiornare i pesi.

Il compito viene affidato ad un algoritmo chiamato **ottimizzatore** (*Optimizer*).

L'obiettivo dell'ottimizzatore è trovare la configurazione dei pesi che minimizza la Loss Function.

Possiamo immaginare l'ottimizzatore come una guida che conduce la rete verso la soluzione migliore.

---

# Gradient Descent

Il primo ottimizzatore sviluppato è stato il **Gradient Descent**.

Ad ogni iterazione aggiorna tutti i pesi della rete.

Pur essendo molto efficace dal punto di vista teorico, risulta poco efficiente sui dataset di grandi dimensioni.

Per questo motivo oggi viene utilizzato soprattutto a scopo didattico.

---

# Stochastic Gradient Descent (SGD)

Lo **Stochastic Gradient Descent** aggiorna i pesi utilizzando un solo esempio alla volta.

Questo rende il training molto più veloce.

Gli aggiornamenti risultano però più rumorosi.

Lo SGD rappresenta ancora oggi uno degli ottimizzatori più utilizzati nella Computer Vision.

---

# Mini Batch Gradient Descent

Il **Mini Batch Gradient Descent** rappresenta il miglior compromesso.

I dati vengono suddivisi in piccoli gruppi.

Dopo ogni gruppo viene aggiornato il modello.

Questa tecnica garantisce:

- maggiore velocità;
- maggiore stabilità;
- migliore utilizzo della memoria GPU.

È oggi la strategia più diffusa durante l'addestramento.

---

# Adam

L'ottimizzatore **Adam (Adaptive Moment Estimation)** rappresenta attualmente uno degli algoritmi più utilizzati nel Deep Learning.

Adam combina i vantaggi di diversi algoritmi precedenti ed è in grado di adattare automaticamente il Learning Rate durante il training.

Tra i suoi principali vantaggi troviamo:

- convergenza rapida;
- elevata stabilità;
- ottime prestazioni;
- ridotta necessità di regolazione manuale.

Per questo motivo è l'ottimizzatore predefinito in molti framework come TensorFlow e PyTorch.

---

# AdamW

Nei moderni Large Language Models viene spesso utilizzata una variante chiamata **AdamW**.

Essa migliora la regolarizzazione dei pesi e riduce il rischio di overfitting.

Modelli come GPT, Llama e BERT utilizzano comunemente questo algoritmo durante il processo di addestramento.

---

# Quale funzione di attivazione scegliere?

Non esiste una funzione universalmente migliore.

La scelta dipende dal problema.

In generale:

- **Sigmoid** → classificazione binaria.
- **Softmax** → classificazione multiclasse (sarà introdotta nei capitoli dedicati alle reti di classificazione).
- **ReLU** → reti profonde generiche.
- **Leaky ReLU** → quando si vuole evitare il problema dei neuroni inattivi.
- **GELU** → Transformer e Large Language Models.

---

# Concetti chiave da ricordare

- Le funzioni di attivazione introducono la non linearità nelle reti neurali.
- Senza Activation Function una rete profonda si comporterebbe come un semplice modello lineare.
- ReLU rappresenta oggi la funzione più utilizzata nel Deep Learning.
- GELU è lo standard nei moderni Transformer.
- Gli ottimizzatori aggiornano automaticamente i pesi della rete.
- Adam e AdamW costituiscono gli algoritmi di ottimizzazione più diffusi nei moderni modelli di Deep Learning.

Nel prossimo capitolo entreremo nel mondo della **Computer Vision**, studiando le **Convolutional Neural Network (CNN)**, l'architettura che ha rivoluzionato il riconoscimento delle immagini e ha reso possibili applicazioni come il riconoscimento facciale, la guida autonoma e la diagnostica medica assistita dall'Intelligenza Artificiale.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte6"></a>

# 6. Convolutional Neural Network (CNN)

Le **Convolutional Neural Network (CNN)** rappresentano una delle innovazioni più importanti nella storia del Deep Learning. Prima della loro introduzione, il riconoscimento automatico delle immagini richiedeva un'enorme quantità di lavoro manuale: gli sviluppatori dovevano progettare algoritmi specifici per individuare bordi, angoli, forme e altre caratteristiche visive.

Le CNN hanno completamente rivoluzionato questo approccio. Oggi una rete neurale convoluzionale è in grado di apprendere automaticamente le caratteristiche rilevanti direttamente dai dati, senza che sia necessario indicarle esplicitamente.

Questa capacità ha permesso di raggiungere livelli di accuratezza superiori a quelli umani in numerosi compiti di Computer Vision.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere perché sono nate le CNN;
- conoscere la struttura di una rete convoluzionale;
- comprendere il funzionamento delle convoluzioni;
- distinguere kernel, filtri e feature map;
- comprendere il ruolo del pooling;
- conoscere le principali architetture CNN moderne.

---

# Perché non basta una rete neurale tradizionale?

Supponiamo di voler classificare una fotografia RGB con risoluzione:

```
1024 × 1024 pixel
```

Ogni pixel possiede tre componenti colore:

- Rosso (Red)
- Verde (Green)
- Blu (Blue)

Il numero totale di valori da elaborare è:

```
1024 × 1024 × 3

=

3.145.728 valori
```

Se collegassimo direttamente ogni pixel ad un neurone di un layer completamente connesso (**Fully Connected Layer**), il numero di pesi diventerebbe enorme.

Le conseguenze sarebbero:

- memoria elevatissima;
- tempi di addestramento molto lunghi;
- maggiore rischio di overfitting;
- difficoltà nella generalizzazione.

Era quindi necessario trovare un approccio completamente diverso.

---

# L'idea delle convoluzioni

L'osservazione fondamentale è molto semplice.

Quando osserviamo un'immagine, il nostro cervello non analizza tutti i pixel contemporaneamente.

Riconosciamo invece prima elementi semplici:

- linee;
- bordi;
- curve;
- contrasti.

Successivamente combiniamo queste informazioni per riconoscere:

- occhi;
- nasi;
- ruote;
- finestre.

Infine arriviamo a identificare l'intero oggetto.

Le CNN adottano esattamente questa strategia.

Invece di elaborare l'immagine completa, analizzano piccole porzioni locali chiamate **finestre di convoluzione**.

---

# Cos'è una convoluzione?

La **convoluzione** è un'operazione matematica che permette di analizzare una piccola regione dell'immagine alla volta.

L'elemento utilizzato prende il nome di:

- filtro (*Filter*);
- kernel (*Kernel*);
- maschera di convoluzione.

I tre termini vengono spesso utilizzati come sinonimi.

Il kernel è una piccola matrice, ad esempio:

```text
3 × 3
```

oppure

```text
5 × 5
```

che viene fatta scorrere sull'intera immagine.

Durante questo processo vengono evidenziate particolari caratteristiche visive.

---

# Esempio di Kernel

Un semplice kernel potrebbe essere:

```text
-1   0   1

-1   0   1

-1   0   1
```

Questo filtro mette in evidenza i bordi verticali.

Un altro kernel potrebbe invece individuare:

- bordi orizzontali;
- diagonali;
- texture;
- contrasti.

Durante l'addestramento, tuttavia, questi filtri non vengono definiti manualmente.

Sono appresi automaticamente dalla rete neurale.

Questa è una delle principali innovazioni introdotte dalle CNN.

---

# Come lavora una CNN?

Il processo può essere schematizzato nel seguente modo:

```text
Immagine

↓

Convoluzione

↓

Feature Map

↓

Pooling

↓

Nuova Convoluzione

↓

Nuova Feature Map

↓

Fully Connected Layer

↓

Output
```

Ogni livello estrae caratteristiche sempre più complesse.

---

# Feature Map

Dopo l'applicazione del kernel si ottiene una nuova immagine chiamata:

**Feature Map**

La Feature Map evidenzia esclusivamente le informazioni ritenute importanti dal filtro utilizzato.

Una CNN genera normalmente decine o centinaia di Feature Map differenti.

Ognuna specializzata nel riconoscimento di una particolare caratteristica.

---

# Cosa imparano i primi layer?

I primi livelli della rete individuano elementi estremamente semplici.

Ad esempio:

- linee;
- bordi;
- colori;
- gradienti;
- orientamenti.

Queste informazioni rappresentano i "mattoni" fondamentali dell'immagine.

---

# Cosa imparano i layer intermedi?

I layer successivi combinano le caratteristiche precedenti.

Possono riconoscere:

- cerchi;
- curve;
- texture;
- superfici;
- angoli.

La rappresentazione dell'immagine diventa progressivamente più ricca.

---

# Cosa imparano gli ultimi layer?

Negli ultimi livelli vengono riconosciuti oggetti completi.

Ad esempio:

- occhi;
- bocca;
- ruote;
- alberi;
- automobili;
- animali;
- persone.

È proprio negli ultimi layer che la rete acquisisce una comprensione semantica dell'immagine.

---

# Pooling

Dopo alcune convoluzioni viene generalmente applicata un'operazione chiamata **Pooling**.

Il suo obiettivo consiste nel:

- ridurre la dimensione delle Feature Map;
- eliminare informazioni ridondanti;
- diminuire il numero dei parametri;
- velocizzare l'addestramento;
- migliorare la capacità di generalizzazione.

---

# Max Pooling

La tecnica più utilizzata è il **Max Pooling**.

Supponiamo di avere una finestra:

```text
2  5

8  4
```

Il Max Pooling seleziona semplicemente il valore massimo.

Risultato:

```text
8
```

In questo modo vengono conservate le informazioni più significative.

---

# Average Pooling

Un'altra tecnica consiste nel calcolare la media dei valori.

```text
2  5

8  4
```

Risultato:

```text
4.75
```

Oggi il Max Pooling rimane comunque la soluzione più diffusa.

---

# Fully Connected Layer

Dopo numerosi livelli convoluzionali, la rete trasforma le informazioni estratte in un vettore numerico.

Questo vettore viene inviato ai **Fully Connected Layer**, che svolgono la classificazione finale.

È la parte più simile ad una rete neurale tradizionale.

L'output può rappresentare:

- una classe;
- una probabilità;
- un valore numerico.

---

# Principali architetture CNN

Negli ultimi anni sono state sviluppate numerose architetture.

Tra le più importanti troviamo:

## LeNet (1998)

Una delle prime CNN realmente funzionanti.

Utilizzata per il riconoscimento di cifre manoscritte.

---

## AlexNet (2012)

Segna l'inizio dell'era moderna del Deep Learning.

Vince la competizione **ImageNet** con un margine enorme rispetto agli altri algoritmi.

Introduce:

- GPU per l'addestramento;
- ReLU;
- Dropout;
- Data Augmentation.

È considerata una pietra miliare nella storia dell'AI.

---

## VGG

Sviluppata dall'Università di Oxford.

Utilizza una struttura molto semplice composta da numerosi piccoli filtri 3×3.

Ancora oggi viene impiegata come modello di riferimento in numerosi studi.

---

## GoogLeNet (Inception)

Introduce il concetto di **Inception Module**, che permette di analizzare contemporaneamente l'immagine utilizzando filtri di dimensioni differenti.

---

## ResNet

Una delle reti neurali più influenti mai sviluppate.

Introduce le **Skip Connections** (connessioni residue), che consentono di addestrare reti con oltre cento layer senza degradazione delle prestazioni.

Questa innovazione ha rivoluzionato il Deep Learning.

---

## EfficientNet

Propone un metodo sistematico per aumentare:

- profondità;
- larghezza;
- risoluzione;

ottenendo prestazioni elevate con un numero ridotto di parametri.

---

# Applicazioni delle CNN

Le reti convoluzionali vengono utilizzate in moltissimi settori.

## Computer Vision

- classificazione immagini;
- riconoscimento facciale;
- riconoscimento oggetti;
- videosorveglianza.

---

## Medicina

- analisi TAC;
- radiografie;
- risonanze magnetiche;
- diagnosi assistita.

---

## Industria

- controllo qualità;
- individuazione difetti;
- robotica industriale.

---

## Automotive

- guida autonoma;
- riconoscimento segnali;
- rilevamento pedoni;
- assistenza alla guida.

---

## Agricoltura

- monitoraggio colture;
- riconoscimento malattie delle piante;
- analisi satellitare.

---

# Limiti delle CNN

Nonostante l'enorme successo, le CNN presentano alcuni limiti.

Tra i principali:

- elevato consumo di memoria;
- necessità di grandi dataset;
- tempi di addestramento considerevoli;
- scarsa capacità di modellare dipendenze molto lontane nell'immagine.

Per questo motivo, negli ultimi anni, molte applicazioni stanno progressivamente adottando architetture basate sui **Transformer**, capaci di analizzare contemporaneamente relazioni globali tra gli elementi di un'immagine.

---

# Concetti chiave da ricordare

- Le CNN rappresentano lo standard per la Computer Vision.
- Le convoluzioni permettono di analizzare piccole regioni dell'immagine.
- I kernel vengono appresi automaticamente durante il training.
- Le Feature Map rappresentano le caratteristiche estratte dalla rete.
- Il Pooling riduce la dimensionalità preservando le informazioni più importanti.
- AlexNet, ResNet ed EfficientNet hanno segnato alcune delle tappe più importanti nell'evoluzione del Deep Learning.
- Le CNN sono alla base di numerose applicazioni industriali, mediche e scientifiche.

Nel prossimo capitolo studieremo un'altra famiglia fondamentale di reti neurali: le **Reti Ricorrenti (RNN)** e le loro evoluzioni **LSTM** e **GRU**, progettate per elaborare dati sequenziali come testo, audio e serie temporali.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte7"></a>

# 7. Reti ricorrenti: RNN, LSTM e GRU

Fino a questo momento abbiamo studiato reti neurali progettate principalmente per elaborare dati "statici", come immagini o tabelle. Esiste però una vasta categoria di problemi in cui i dati possiedono un ordine temporale e ogni elemento dipende da quelli precedenti.

Pensiamo, ad esempio, a una frase:

> *"Il gatto si è arrampicato sull'albero perché..."*

Quando leggiamo questa frase, comprendiamo il significato di ogni parola grazie a quelle che l'hanno preceduta. Se le parole fossero mescolate casualmente, il significato andrebbe completamente perso.

Lo stesso vale per:

- un dialogo;
- un file audio;
- una registrazione vocale;
- una serie storica finanziaria;
- i dati provenienti da sensori;
- una sequenza di DNA;
- il testo di un libro.

Per affrontare questi problemi sono state sviluppate le **Reti Neurali Ricorrenti (Recurrent Neural Networks - RNN)**.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere cosa sono i dati sequenziali;
- conoscere il funzionamento delle RNN;
- comprendere il concetto di memoria interna;
- conoscere i limiti delle RNN tradizionali;
- comprendere il funzionamento delle reti LSTM;
- conoscere le caratteristiche delle reti GRU;
- capire perché oggi i Transformer stanno sostituendo le reti ricorrenti.

---

# Cosa sono i dati sequenziali?

Un dato sequenziale è un insieme di informazioni in cui **l'ordine degli elementi è fondamentale**.

Ad esempio, consideriamo le parole:

```
Marco

mangia

una

mela
```

La frase ha un significato preciso.

Se invece cambiassimo l'ordine:

```
mela

Marco

una

mangia
```

il significato verrebbe completamente alterato.

Una rete neurale tradizionale considera ogni input indipendente dagli altri.

Una RNN, invece, tiene conto anche delle informazioni elaborate nei passaggi precedenti.

---

# Il concetto di memoria

La caratteristica fondamentale delle RNN è la presenza di una **memoria interna**.

Ogni volta che la rete elabora un nuovo elemento della sequenza:

- utilizza il dato corrente;
- utilizza anche le informazioni memorizzate nei passaggi precedenti.

Possiamo immaginare il processo nel seguente modo:

```text
Parola 1

↓

Memoria

↓

Parola 2

↓

Memoria aggiornata

↓

Parola 3

↓

Memoria aggiornata

↓

...
```

Questa memoria permette alla rete di comprendere il contesto.

---

# Come funziona una RNN?

Una rete ricorrente elabora gli elementi della sequenza uno alla volta.

Per ogni elemento esegue tre operazioni fondamentali:

1. legge il nuovo input;
2. aggiorna il proprio stato interno (*Hidden State*);
3. produce un output.

Il nuovo stato interno verrà utilizzato nell'elaborazione dell'elemento successivo.

Questa caratteristica rende le RNN particolarmente adatte ai problemi temporali.

---

# Hidden State

Lo **Hidden State** rappresenta la memoria della rete.

Possiamo immaginarlo come un piccolo riassunto di tutto ciò che la rete ha osservato fino a quel momento.

Ad ogni nuovo input lo stato viene aggiornato.

```text
Input

↓

Hidden State

↓

Output

↓

Nuovo Hidden State
```

Questo processo continua fino alla fine della sequenza.

---

# Un esempio pratico

Supponiamo di voler prevedere la parola successiva nella frase:

> "Oggi il cielo è..."

La rete elabora:

```
Oggi
```

aggiorna la memoria.

Successivamente legge:

```
il
```

aggiorna nuovamente la memoria.

Poi:

```
cielo
```

e infine:

```
è
```

A questo punto, grazie alle informazioni memorizzate, la rete potrebbe prevedere parole come:

- sereno;
- nuvoloso;
- azzurro;
- coperto.

La previsione dipende dall'intero contesto e non soltanto dall'ultima parola.

---

# Limiti delle RNN

Le RNN rappresentarono un enorme passo avanti, ma mostrarono presto alcuni limiti.

Il principale riguarda la memoria a lungo termine.

Supponiamo di dover elaborare una frase molto lunga.

Le prime informazioni rischiano di essere progressivamente dimenticate.

Questo fenomeno prende il nome di **Long-Term Dependency Problem**.

---

# Vanishing Gradient nelle RNN

Durante la Backpropagation il gradiente deve attraversare l'intera sequenza.

Se questa è molto lunga, il gradiente può diventare estremamente piccolo.

Le conseguenze sono:

- apprendimento lento;
- perdita del contesto;
- incapacità di ricordare informazioni lontane.

Questo problema limitò fortemente le prestazioni delle RNN tradizionali.

---

# Long Short-Term Memory (LSTM)

Per superare questi limiti, nel 1997 Sepp Hochreiter e Jürgen Schmidhuber introdussero le **Long Short-Term Memory (LSTM)**.

Le LSTM rappresentano una delle innovazioni più importanti nella storia del Deep Learning.

A differenza delle RNN classiche, possiedono una memoria molto più sofisticata.

Sono in grado di:

- conservare informazioni importanti;
- eliminare quelle non più utili;
- recuperare dati osservati molto tempo prima.

Per questo motivo vengono definite reti a **memoria lunga**.

---

# La memoria delle LSTM

Le LSTM introducono una struttura chiamata **Cell State**.

Il Cell State rappresenta una sorta di "memoria principale" della rete.

Durante l'elaborazione ogni nuova informazione può essere:

- conservata;
- modificata;
- eliminata.

Questa gestione intelligente della memoria permette di affrontare sequenze molto più lunghe rispetto alle RNN tradizionali.

---

# Le tre porte delle LSTM

Le LSTM prendono decisioni attraverso tre meccanismi chiamati **gate** (porte).

## Forget Gate

Decide quali informazioni possono essere dimenticate.

Non tutto ciò che viene osservato è infatti utile anche in futuro.

---

## Input Gate

Determina quali nuove informazioni devono essere memorizzate.

La rete seleziona soltanto gli elementi realmente importanti.

---

## Output Gate

Stabilisce quali informazioni utilizzare per produrre l'output corrente.

Grazie a queste tre porte la rete riesce a gestire efficacemente la propria memoria.

---

# Vantaggi delle LSTM

Le LSTM hanno permesso di ottenere enormi miglioramenti in numerosi ambiti.

Sono state utilizzate con successo per:

- traduzione automatica;
- riconoscimento vocale;
- chatbot;
- previsione finanziaria;
- analisi di serie temporali;
- elaborazione del linguaggio naturale.

Per molti anni hanno rappresentato lo stato dell'arte del Natural Language Processing.

---

# Gated Recurrent Unit (GRU)

Nel 2014 vennero introdotte le **GRU (Gated Recurrent Unit)**.

Le GRU possono essere considerate una versione semplificata delle LSTM.

Utilizzano meno parametri e risultano:

- più leggere;
- più veloci;
- più semplici da addestrare.

Pur essendo meno complesse, in molti problemi raggiungono prestazioni molto simili.

Per questo motivo sono ancora oggi molto utilizzate.

---

# Differenze tra RNN, LSTM e GRU

| Caratteristica | RNN | LSTM | GRU |
|----------------|-----|------|-----|
| Memoria a lungo termine | ❌ Limitata | ✅ Ottima | ✅ Molto buona |
| Complessità | Bassa | Elevata | Media |
| Velocità | Alta | Inferiore | Alta |
| Numero di parametri | Ridotto | Elevato | Intermedio |
| Gestione del contesto | Limitata | Eccellente | Ottima |

---

# Applicazioni delle reti ricorrenti

Le RNN e le loro evoluzioni sono state utilizzate in moltissimi settori.

## Elaborazione del linguaggio naturale

- traduzione automatica;
- chatbot;
- analisi del sentiment;
- riassunto automatico.

---

## Speech Recognition

- riconoscimento vocale;
- trascrizione automatica;
- assistenti vocali.

---

## Finanza

- previsione dei prezzi;
- analisi delle serie storiche;
- forecasting.

---

## Medicina

- analisi di segnali ECG;
- monitoraggio pazienti;
- analisi di dati biologici.

---

# Perché oggi si usano meno?

Nonostante il loro enorme successo, le RNN, le LSTM e le GRU presentano alcuni limiti.

Tra i principali:

- elaborazione sequenziale;
- difficoltà nel parallelizzare i calcoli;
- tempi di addestramento elevati;
- difficoltà nella gestione di contesti molto lunghi.

Questi limiti hanno spinto la ricerca verso una nuova architettura destinata a rivoluzionare completamente il Deep Learning.

---

# Nascono i Transformer

Nel 2017 Google pubblicò il celebre articolo scientifico:

> **Attention Is All You Need**

L'idea era sorprendentemente semplice.

Invece di elaborare le parole una alla volta, come fanno le RNN, il modello avrebbe analizzato **l'intera sequenza contemporaneamente**, imparando automaticamente quali elementi fossero più importanti.

Questa nuova architettura prese il nome di **Transformer**.

Da quel momento il mondo dell'Intelligenza Artificiale cambiò radicalmente.

Oggi tutti i principali Large Language Models, tra cui ChatGPT, Claude, Gemini, Llama, Mistral e Gemma, sono basati su architetture Transformer.

---

# Concetti chiave da ricordare

- Le RNN sono progettate per elaborare dati sequenziali.
- Lo Hidden State rappresenta la memoria della rete.
- Le RNN tradizionali soffrono del problema delle dipendenze a lungo termine.
- Le LSTM introducono una memoria più sofisticata grazie ai gate.
- Le GRU rappresentano una versione più semplice ed efficiente delle LSTM.
- Oggi le reti ricorrenti sono state in gran parte sostituite dai Transformer, che studieremo nel prossimo capitolo.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte8"></a>

# 8. Transformer e meccanismo di Attention

Nel capitolo precedente abbiamo studiato le Reti Ricorrenti (RNN), le LSTM e le GRU, che per molti anni hanno rappresentato lo stato dell'arte nell'elaborazione del linguaggio naturale. Tuttavia, nonostante i notevoli progressi, queste architetture presentavano alcuni limiti importanti: difficoltà nell'elaborazione di sequenze molto lunghe, scarsa parallelizzazione e tempi di addestramento elevati.

Nel 2017 un gruppo di ricercatori di Google pubblicò un articolo destinato a cambiare radicalmente il mondo dell'Intelligenza Artificiale.

Il titolo era:

> **Attention Is All You Need**

Questo lavoro introdusse una nuova architettura chiamata **Transformer**, oggi alla base di quasi tutti i moderni sistemi di Intelligenza Artificiale Generativa.

ChatGPT, Claude, Gemini, Llama, Mistral, Gemma, Qwen e la maggior parte dei Large Language Models utilizzano infatti varianti dell'architettura Transformer.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere perché sono nati i Transformer;
- conoscere il meccanismo di Attention;
- distinguere Self-Attention e Multi-Head Attention;
- comprendere la struttura generale di un Transformer;
- conoscere Encoder e Decoder;
- comprendere perché i Transformer hanno sostituito le RNN.

---

# Perché serviva una nuova architettura?

Supponiamo di voler analizzare la seguente frase:

> **"Il professore spiegò agli studenti che avrebbero sostenuto l'esame il mese successivo."**

Per comprendere correttamente il significato della parola:

```
avrebbero
```

è necessario ricordare il soggetto della frase, che compare molto prima.

Le RNN elaborano il testo una parola alla volta.

Con sequenze molto lunghe diventa difficile mantenere il contesto.

I Transformer affrontano il problema in maniera completamente diversa.

Invece di leggere le parole in sequenza, osservano **l'intera frase contemporaneamente**.

---

# L'idea rivoluzionaria

L'intuizione fondamentale dei Transformer è estremamente semplice.

Ogni parola della frase può "guardare" tutte le altre parole e decidere autonomamente quali siano le più importanti.

Questa operazione prende il nome di:

## Attention

L'Attention rappresenta il meccanismo che permette al modello di assegnare un diverso livello di importanza a ciascun elemento della sequenza.

---

# Cos'è l'Attention?

Immaginiamo di leggere questa frase.

> **"Marco ha comprato un nuovo computer perché il suo era ormai troppo lento."**

Quando leggiamo la parola:

```
suo
```

comprendiamo immediatamente che si riferisce a:

```
computer
```

Il nostro cervello collega automaticamente le due parole.

L'Attention permette al Transformer di effettuare lo stesso tipo di collegamento.

Ogni parola valuta l'importanza di tutte le altre parole presenti nella frase.

---

# Self-Attention

Il meccanismo utilizzato prende il nome di **Self-Attention**.

"Self" significa che una sequenza presta attenzione a sé stessa.

Per ogni parola il modello calcola quali altri termini siano maggiormente correlati.

Ad esempio:

```
Il

gatto

dorme

sul

divano
```

Quando viene analizzata la parola:

```
dorme
```

la rete attribuisce maggiore importanza a:

- gatto;
- divano.

Piuttosto che a parole meno significative.

In questo modo il modello costruisce una rappresentazione molto più ricca del significato della frase.

---

# Query, Key e Value

Il meccanismo di Self-Attention si basa su tre vettori fondamentali.

## Query (Q)

Rappresenta ciò che una parola sta cercando.

---

## Key (K)

Rappresenta l'identità delle altre parole.

---

## Value (V)

Contiene le informazioni effettive associate ad ogni parola.

Il confronto tra Query e Key determina il livello di attenzione.

Successivamente vengono recuperati i corrispondenti Value.

Questa operazione viene ripetuta per ogni parola della sequenza.

---

# Esempio intuitivo

Consideriamo la frase:

> **"Il cane rincorre il gatto."**

Quando il modello analizza la parola:

```
rincorre
```

attribuisce particolare importanza a:

- cane;
- gatto.

Le parole:

- il;
- il;

ricevono invece un peso molto inferiore.

Il modello comprende quindi automaticamente quali elementi siano semanticamente rilevanti.

---

# Positional Encoding

I Transformer elaborano tutte le parole contemporaneamente.

Nasce quindi un problema.

Come può il modello conoscere l'ordine delle parole?

Per risolvere questo limite viene utilizzato il **Positional Encoding**.

Ad ogni parola viene associata un'informazione numerica che rappresenta la sua posizione all'interno della frase.

In questo modo il Transformer distingue correttamente:

> "Il cane morde il gatto."

da

> "Il gatto morde il cane."

Pur contenendo esattamente le stesse parole.

---

# Multi-Head Attention

Un singolo meccanismo di attenzione non è sufficiente per comprendere tutti gli aspetti di una frase.

Per questo motivo vengono utilizzate più Attention contemporaneamente.

Questa tecnica prende il nome di:

## Multi-Head Attention

Ogni "testa" può concentrarsi su aspetti differenti.

Ad esempio:

Una testa può analizzare:

- la grammatica.

Un'altra:

- il significato.

Una terza:

- le relazioni tra soggetti e verbi.

Una quarta:

- il contesto generale.

I risultati vengono poi combinati.

Questo permette al modello di sviluppare rappresentazioni linguistiche estremamente ricche.

---

# Encoder e Decoder

L'architettura originale dei Transformer è composta da due blocchi principali.

## Encoder

Riceve il testo in ingresso.

Produce una rappresentazione numerica molto ricca del significato della sequenza.

---

## Decoder

Riceve le informazioni prodotte dall'Encoder.

Genera progressivamente il testo in uscita.

Questa architettura è particolarmente adatta ai problemi di traduzione automatica.

---

# Evoluzione dell'architettura

Con il passare degli anni sono nate diverse famiglie di Transformer.

## Solo Encoder

Ad esempio:

- BERT;
- RoBERTa.

Ottimi per:

- classificazione;
- ricerca semantica;
- analisi del testo.

---

## Solo Decoder

Ad esempio:

- GPT;
- Llama;
- Gemma;
- Mistral;
- Claude.

Sono progettati principalmente per la generazione di testo.

---

## Encoder-Decoder

Ad esempio:

- T5;
- BART.

Molto utilizzati per:

- traduzione;
- riassunto automatico;
- trasformazione del testo.

---

# Perché i Transformer sono superiori alle RNN?

I Transformer presentano numerosi vantaggi.

## Elaborazione parallela

Tutte le parole vengono elaborate contemporaneamente.

Questo rende l'addestramento molto più veloce.

---

## Contesto globale

Ogni parola può osservare direttamente tutte le altre.

Non esiste più il problema delle dipendenze molto lunghe.

---

## Scalabilità

I Transformer possono essere estesi fino a contenere:

- miliardi;
- decine di miliardi;
- centinaia di miliardi;
- perfino migliaia di miliardi di parametri.

Questa caratteristica ha reso possibile la nascita dei moderni Large Language Models.

---

# Limiti dei Transformer

Nonostante il loro enorme successo, anche i Transformer presentano alcuni limiti.

Tra i principali:

- elevato consumo di memoria;
- addestramento estremamente costoso;
- necessità di GPU molto potenti;
- grandi quantità di dati.

Per questo motivo soltanto poche organizzazioni al mondo dispongono delle risorse necessarie per addestrare modelli di grandissime dimensioni.

---

# Applicazioni dei Transformer

Oggi vengono utilizzati praticamente ovunque.

## Elaborazione del linguaggio naturale

- chatbot;
- traduzione;
- riassunto;
- ricerca semantica.

---

## Generazione di codice

- assistenti di programmazione;
- completamento automatico;
- debugging.

---

## Computer Vision

Architetture come:

- Vision Transformer (ViT);
- Swin Transformer.

stanno progressivamente sostituendo le CNN in numerose applicazioni.

---

## Audio

- riconoscimento vocale;
- sintesi vocale;
- generazione musicale.

---

## Biologia

- analisi del DNA;
- progettazione di farmaci;
- predizione della struttura delle proteine.

---

# Dall'Attention agli LLM

L'introduzione dei Transformer ha aperto la strada ai moderni Large Language Models.

L'architettura Transformer rappresenta infatti il motore di modelli come:

- GPT;
- Claude;
- Gemini;
- Llama;
- Mistral;
- Gemma;
- Qwen.

Nel prossimo capitolo vedremo come queste reti vengano scalate fino a contenere miliardi di parametri, dando origine agli LLM utilizzati oggi in ambito professionale e nella ricerca.

---

# Concetti chiave da ricordare

- I Transformer hanno rivoluzionato il Deep Learning nel 2017.
- Il meccanismo di Attention consente al modello di valutare l'importanza relativa di ogni elemento della sequenza.
- La Self-Attention permette a ogni parola di analizzare tutte le altre parole del contesto.
- La Multi-Head Attention migliora la capacità del modello di cogliere relazioni linguistiche differenti.
- Il Positional Encoding conserva l'ordine delle parole.
- I Transformer hanno sostituito le RNN nella maggior parte delle applicazioni di Natural Language Processing.
- Tutti i moderni Large Language Models sono basati su architetture Transformer.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte9"></a>

# 9. Deep Learning e Large Language Models

Negli ultimi anni il termine **Large Language Model (LLM)** è diventato uno dei più conosciuti nel mondo dell'Intelligenza Artificiale. Strumenti come ChatGPT, Claude, Gemini, Llama, Mistral e Gemma hanno dimostrato che un modello neurale può comprendere il linguaggio naturale, rispondere a domande, scrivere codice, tradurre testi, creare documenti e assistere gli utenti in moltissime attività.

Ma cosa rende possibile tutto questo?

La risposta è semplice: **i Large Language Models sono enormi reti neurali basate sull'architettura Transformer**, addestrate su quantità immense di dati testuali.

In questo capitolo comprenderemo come sono costruiti gli LLM, come vengono addestrati e quali sono i loro limiti.

---

# Obiettivi della Parte

Al termine di questa sezione sarai in grado di:

- comprendere cosa si intende per Large Language Model;
- conoscere il processo di addestramento di un LLM;
- comprendere il ruolo dei token;
- conoscere il significato di embedding;
- distinguere pre-training e fine-tuning;
- comprendere punti di forza e limiti degli LLM.

---

# Cos'è un Large Language Model?

Un **Large Language Model** è un modello di Deep Learning progettato per elaborare e generare linguaggio naturale.

Il termine **Large** indica principalmente:

- un numero enorme di parametri;
- dataset di addestramento molto estesi;
- elevate capacità di generalizzazione.

I moderni LLM possono contenere:

- miliardi di parametri;
- decine di miliardi;
- centinaia di miliardi.

Maggiore è il numero di parametri, maggiore è generalmente la capacità del modello di rappresentare relazioni linguistiche complesse.

---

# Da testo a numeri

I computer non comprendono direttamente le parole.

Prima di poter elaborare un testo è necessario trasformarlo in una rappresentazione numerica.

Ad esempio:

```
Intelligenza Artificiale
```

non viene memorizzato come testo, ma convertito in una sequenza di numeri.

Questo processo prende il nome di **tokenizzazione**.

---

# I Token

Un **token** rappresenta l'unità elementare elaborata dal modello.

Un token può essere:

- una parola;
- una parte di parola;
- un numero;
- un simbolo;
- un segno di punteggiatura.

Ad esempio:

```
Intelligenza
Artificiale
```

potrebbe essere suddiviso in più token.

La tokenizzazione consente al modello di gestire qualsiasi lingua e qualsiasi tipo di testo.

---

# Gli Embedding

Una volta ottenuti i token, il modello deve trasformarli in vettori numerici.

Questa rappresentazione prende il nome di **Embedding**.

Ogni parola viene convertita in un vettore composto da centinaia o migliaia di valori.

Parole con significati simili avranno embedding vicini nello spazio vettoriale.

Ad esempio:

- medico;
- dottore;
- chirurgo.

avranno rappresentazioni numeriche molto simili.

---

# Il Pre-Training

La fase più costosa nella costruzione di un LLM è il **Pre-Training**.

Durante questa fase il modello legge enormi quantità di documenti provenienti da:

- libri;
- articoli;
- siti web;
- documentazione tecnica;
- codice sorgente;
- pubblicazioni scientifiche.

L'obiettivo non è memorizzare i testi, ma imparare le regolarità statistiche del linguaggio.

---

# L'obiettivo del Pre-Training

Il compito principale durante il pre-training è sorprendentemente semplice:

**prevedere il token successivo.**

Ad esempio:

```
L'Italia ha come capitale...
```

Il modello dovrà prevedere:

```
Roma
```

Ripetendo questa operazione miliardi di volte, la rete impara:

- grammatica;
- sintassi;
- relazioni semantiche;
- conoscenze generali;
- strutture linguistiche.

---

# Fine-Tuning

Terminato il pre-training, il modello può essere specializzato.

Questa fase prende il nome di **Fine-Tuning**.

Durante il Fine-Tuning il modello viene addestrato su dataset molto più piccoli ma altamente specifici.

Ad esempio:

- medicina;
- diritto;
- finanza;
- informatica;
- assistenza clienti.

In questo modo lo stesso LLM può essere adattato a contesti professionali differenti.

---

# Instruction Tuning

Una particolare forma di Fine-Tuning è l'**Instruction Tuning**.

Il modello viene addestrato a seguire istruzioni espresse in linguaggio naturale.

Ad esempio:

```
Scrivi un riassunto.

Traduci questo testo.

Genera codice Python.

Correggi gli errori grammaticali.
```

Questa fase rende il modello molto più utile nelle applicazioni reali.

---

# RLHF

Molti modelli moderni utilizzano una tecnica chiamata:

**RLHF (Reinforcement Learning from Human Feedback).**

Dopo il pre-training, esseri umani valutano le risposte generate dal modello.

Le valutazioni vengono utilizzate per migliorarne il comportamento.

L'obiettivo è ottenere risposte:

- più corrette;
- più utili;
- più sicure;
- più coerenti.

---

# Context Window

Ogni LLM possiede una memoria temporanea chiamata **Context Window**.

Essa rappresenta il numero massimo di token che il modello può analizzare contemporaneamente.

All'interno della finestra di contesto possono essere presenti:

- prompt;
- documenti;
- conversazioni;
- codice;
- istruzioni.

Una finestra più ampia permette di gestire documenti più lunghi e conversazioni più articolate.

---

# Parametri e conoscenza

È importante chiarire un concetto spesso frainteso.

I **parametri** del modello non rappresentano un archivio di fatti memorizzati.

Essi costituiscono invece i pesi della rete neurale, cioè i valori appresi durante il training.

La conoscenza emerge dal comportamento complessivo della rete e non dalla memorizzazione di un database di risposte.

---

# Hallucinations

Uno dei limiti principali degli LLM è il fenomeno delle **allucinazioni** (*Hallucinations*).

In alcune situazioni il modello può generare informazioni:

- inesatte;
- inventate;
- prive di fonti;
- apparentemente plausibili.

Questo accade perché il modello cerca di prevedere il testo più probabile, non di verificare la veridicità delle informazioni.

Per questo motivo è fondamentale verificare sempre le informazioni quando si affrontano argomenti critici o professionali.

---

# Come migliorare le risposte

La qualità delle risposte dipende da numerosi fattori.

Tra i più importanti:

- prompt chiari;
- contesto sufficiente;
- istruzioni precise;
- esempi;
- documentazione di supporto.

Un buon Prompt Engineering può migliorare sensibilmente le prestazioni del modello.

---

# Applicazioni dei Large Language Models

Gli LLM trovano applicazione in moltissimi settori.

## Sviluppo software

- generazione di codice;
- debugging;
- documentazione;
- test automatici.

---

## Istruzione

- tutor virtuali;
- spiegazioni personalizzate;
- creazione di quiz;
- supporto allo studio.

---

## Aziende

- assistenza clienti;
- chatbot;
- analisi documentale;
- automazione dei processi.

---

## Ricerca

- sintesi di articoli;
- analisi bibliografica;
- supporto alla scrittura scientifica.

---

## Creatività

- scrittura;
- brainstorming;
- traduzione;
- generazione di contenuti.

---

# Limiti degli LLM

Nonostante le loro straordinarie capacità, gli LLM presentano ancora diversi limiti.

Tra i principali:

- possibili allucinazioni;
- dipendenza dalla qualità dei dati di addestramento;
- elevato costo computazionale;
- consumo significativo di memoria e GPU;
- conoscenza limitata alla data dell'addestramento, se non integrati con fonti esterne.

Per superare questi limiti vengono utilizzate tecniche come il **Retrieval-Augmented Generation (RAG)**, i database vettoriali e gli AI Agent, che verranno approfonditi nei moduli successivi del corso.

---

# Concetti chiave da ricordare

- I Large Language Models sono reti neurali basate sull'architettura Transformer.
- Il testo viene trasformato in token e successivamente in embedding numerici.
- Il pre-training insegna al modello le regolarità del linguaggio prevedendo il token successivo.
- Il Fine-Tuning specializza il modello per domini specifici.
- L'Instruction Tuning e il RLHF migliorano la capacità del modello di seguire istruzioni e fornire risposte utili.
- Gli LLM sono strumenti estremamente potenti, ma possono generare informazioni errate e devono essere utilizzati con spirito critico.

Nel prossimo e ultimo capitolo metteremo in pratica i concetti appresi attraverso un **laboratorio finale**, seguito da una verifica delle competenze acquisite.

---

⬆️ **[Torna all'Indice](#indice)**

---

<a id="parte10"></a>

# 10. Laboratorio finale e valutazione

In questo capitolo conclusivo metterai in pratica le conoscenze acquisite durante l'intero modulo sul Deep Learning. L'obiettivo non è soltanto verificare la comprensione teorica degli argomenti, ma soprattutto sviluppare la capacità di riconoscere quale architettura utilizzare in base al problema da risolvere.

Al termine delle attività sarai in grado di interpretare i principali concetti del Deep Learning e comprendere il funzionamento delle tecnologie alla base dei moderni sistemi di Intelligenza Artificiale.

---

# Obiettivi del laboratorio

Al termine del laboratorio dovrai essere in grado di:

- distinguere Machine Learning e Deep Learning;
- riconoscere le principali architetture neurali;
- scegliere la rete più adatta ad un determinato problema;
- comprendere il ruolo dei Transformer nei moderni LLM;
- interpretare correttamente la terminologia utilizzata nella documentazione tecnica.

---

# Esercizio 1 - Quale rete utilizzeresti?

Per ciascun problema individua l'architettura più adatta.

### Problema 1

Riconoscere automaticamente se una radiografia mostra una frattura.

**Risposta attesa**

```
Convolutional Neural Network (CNN)
```

---

### Problema 2

Prevedere la parola successiva durante la scrittura di un testo.

**Risposta attesa**

```
Transformer
```

---

### Problema 3

Analizzare il prezzo giornaliero di un'azione in borsa.

**Risposta attesa**

```
LSTM oppure GRU
```

---

### Problema 4

Classificare fotografie di animali.

**Risposta attesa**

```
CNN
```

---

### Problema 5

Realizzare un assistente virtuale conversazionale.

**Risposta attesa**

```
Large Language Model basato su Transformer
```

---

# Esercizio 2 - Completa le definizioni

Completa le seguenti frasi.

### 1

La funzione che introduce la non linearità nella rete neurale è la __________________________.

---

### 2

L'algoritmo che aggiorna i pesi durante il training prende il nome di __________________________.

---

### 3

Le reti progettate per il riconoscimento delle immagini sono chiamate __________________________.

---

### 4

Le reti progettate per elaborare sequenze temporali sono chiamate __________________________.

---

### 5

L'architettura utilizzata dai moderni Large Language Models prende il nome di __________________________.

---

# Soluzioni

1.

```
Funzione di attivazione
```

2.

```
Ottimizzatore
```

oppure

```
Gradient Descent
```

3.

```
CNN
```

4.

```
RNN
```

oppure

```
LSTM

GRU
```

5.

```
Transformer
```

---

# Esercizio 3 - Vero o Falso

Indica se l'affermazione è vera oppure falsa.

### Le CNN vengono utilizzate principalmente per la Computer Vision.

✅ Vero

---

### Le LSTM sono nate dopo i Transformer.

❌ Falso

---

### ReLU è una funzione di attivazione.

✅ Vero

---

### Gli LLM sono basati sull'architettura Transformer.

✅ Vero

---

### Il Deep Learning utilizza reti neurali artificiali.

✅ Vero

---

# Esercizio 4 - Associa correttamente

Collega ogni tecnologia alla relativa applicazione.

| Tecnologia | Applicazione |
|------------|--------------|
| CNN | Classificazione immagini |
| RNN | Elaborazione di sequenze |
| LSTM | Serie temporali e linguaggio |
| Transformer | NLP e Generazione di testo |
| LLM | Assistenti AI conversazionali |

---

# Mini Project

## Titolo

**Analisi delle architetture di Deep Learning**

---

## Obiettivo

Realizzare una breve relazione tecnica (2-4 pagine) in cui confrontare le principali architetture studiate nel modulo.

La relazione dovrà includere:

- descrizione delle CNN;
- descrizione delle RNN;
- caratteristiche delle LSTM;
- funzionamento dei Transformer;
- ruolo degli LLM;
- principali ambiti applicativi;
- vantaggi e limiti di ciascuna architettura.

È consigliabile inserire anche semplici schemi o diagrammi per rendere più chiara l'esposizione.

---

# Competenze acquisite

Al termine del modulo avrai acquisito le seguenti competenze:

- comprendere il funzionamento delle reti neurali profonde;
- conoscere il processo di addestramento dei modelli;
- distinguere le principali funzioni di attivazione;
- comprendere il ruolo degli ottimizzatori;
- riconoscere le differenze tra CNN, RNN, LSTM, GRU e Transformer;
- comprendere l'architettura dei moderni Large Language Models;
- interpretare correttamente la terminologia tecnica utilizzata nella documentazione di Deep Learning.

---

# Riepilogo del Modulo

In questo modulo abbiamo affrontato i concetti fondamentali del Deep Learning, partendo dal neurone artificiale fino ad arrivare ai moderni Large Language Models.

Abbiamo studiato:

- il modello matematico del neurone;
- l'architettura delle reti neurali profonde;
- il processo di addestramento;
- le funzioni di attivazione;
- gli algoritmi di ottimizzazione;
- le Convolutional Neural Network;
- le reti ricorrenti RNN, LSTM e GRU;
- il funzionamento dei Transformer;
- l'architettura dei Large Language Models.

Queste conoscenze costituiscono la base teorica indispensabile per affrontare gli argomenti più avanzati del corso, come **LLM Engineering**, **Retrieval-Augmented Generation (RAG)**, **Vector Database**, **AI Agent**, **Tool Calling** e **Model Context Protocol (MCP)**.

---

# Conclusioni

Il Deep Learning rappresenta oggi una delle tecnologie più influenti dell'Intelligenza Artificiale moderna.

Dalla Computer Vision alla Generazione di Testo, dalla Diagnostica Medica agli Assistenti Virtuali, le reti neurali profonde stanno trasformando il modo in cui interagiamo con i dati e con le macchine.

Comprendere i principi studiati in questo modulo significa possedere le basi teoriche necessarie per progettare, utilizzare e valutare sistemi di AI moderni in modo consapevole e professionale.

---

# Fine del Modulo 6

**Complimenti!** Hai completato il Modulo 6 dedicato al **Deep Learning**.

Nel modulo successivo approfondiremo l'**LLM Engineering**, studiando come distribuire, ottimizzare e utilizzare professionalmente i Large Language Models attraverso tecnologie come Ollama, GGUF, llama.cpp, vLLM, GPU, quantizzazione, Context Window, Embedding, Vector Database e Retrieval-Augmented Generation (RAG).

---

⬆️ **[Torna all'Indice](#indice)**

---