# MODULO 1
# Fondamenti dell'Intelligenza Artificiale
### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com
### Ottimizzata per Google Colab · Aggiornata al Luglio 2026

---

> **Livello:** 🟢 Base  
> **Codice Modulo:** M1  
> **Versione:** 1.0  
> **Durata stimata:** 8–10 ore  
> **Lezioni:** 3  
> **Laboratori:** 2  
> **Quiz:** 1  
> **Project Work:** Mini Project

---

<a id="indice"></a>

# 📑 Indice

## Introduzione

- [Introduzione al Modulo](#introduzione-al-modulo)
- [Obiettivi Formativi](#obiettivi-formativi)
- [Prerequisiti](#prerequisiti)
- [Competenze Acquisite](#competenze-acquisite)

---

## Lezione 1.1 – Cos'è l'Intelligenza Artificiale

- [1.1.1 Introduzione](#111-introduzione)
- [1.1.2 Definizione Moderna di AI](#112-definizione-moderna-di-ai)
- [1.1.3 Breve Storia dell'AI](#113-breve-storia-dellai)
- [1.1.4 Perché oggi si parla tanto di AI?](#114-perche-oggi-si-parla-tanto-di-ai)
- [1.1.5 AI, Machine Learning, Deep Learning e Generative AI](#115-ai-machine-learning-deep-learning-e-generative-ai)

---

## Lezione 1.2

- [ANI](#ani)
- [AGI](#agi)
- [ASI](#asi)

---

## Lezione 1.3

- [Come funziona un sistema AI](#come-funziona-un-sistema-ai)
- [Pipeline dei dati](#pipeline-dei-dati)
- [Dataset](#dataset)
- [Training](#training)
- [Inferenza](#inferenza)

---

## Conclusione

- [Best Practice](#best-practice)
- [Errori comuni](#errori-comuni)
- [Laboratorio](#laboratorio)
- [Mini Project](#mini-project)
- [Quiz](#quiz)
- [Glossario](#glossario)
- [Riepilogo](#riepilogo)
- [Bibliografia](#bibliografia)

---

<a id="introduzione-al-modulo"></a>

# Introduzione al Modulo

[⬆️ Torna all'Indice](#indice)

L'Intelligenza Artificiale rappresenta una delle più importanti rivoluzioni tecnologiche della storia dell'informatica.

Negli ultimi anni è entrata nella vita quotidiana di milioni di persone attraverso motori di ricerca, assistenti vocali, sistemi di traduzione automatica, piattaforme di streaming, automobili, smartphone e strumenti di AI Generativa come ChatGPT, Gemini, Claude, Copilot e molti altri.

Tuttavia, dietro questi strumenti esiste una disciplina estremamente vasta che coinvolge informatica, matematica, statistica, neuroscienze, linguistica, robotica ed etica.

Questo modulo costituisce il punto di partenza dell'intero percorso formativo e fornisce le basi teoriche indispensabili per comprendere tutti gli argomenti successivi.

Al termine del modulo lo studente avrà acquisito un vocabolario tecnico corretto e sarà in grado di distinguere le principali tecnologie oggi raggruppate sotto il termine "Intelligenza Artificiale".

---

[⬆️ Torna all'Indice](#indice)

---

<a id="obiettivi-formativi"></a>

# Obiettivi Formativi

[⬆️ Torna all'Indice](#indice)

Al termine del modulo lo studente sarà in grado di:

- definire correttamente il concetto di Intelligenza Artificiale;
- descrivere l'evoluzione storica dell'AI;
- distinguere AI, Machine Learning, Deep Learning e AI Generativa;
- comprendere il ruolo dei dati nello sviluppo dei modelli;
- conoscere le principali categorie di sistemi intelligenti;
- utilizzare correttamente la terminologia tecnica.

---

## Risultati di apprendimento

Lo studente saprà inoltre:

- leggere articoli tecnici sull'AI;
- comprendere il significato dei termini più utilizzati;
- interpretare correttamente le notizie riguardanti l'Intelligenza Artificiale;
- evitare i più comuni equivoci diffusi dai media.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="prerequisiti"></a>

# Prerequisiti

[⬆️ Torna all'Indice](#indice)

Per seguire questo modulo non sono richieste competenze di programmazione.

È sufficiente:

- utilizzare normalmente un computer;
- saper navigare sul Web;
- conoscere i concetti base di file e cartelle.

Non è necessario conoscere Python, matematica avanzata o algoritmi di Machine Learning.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="competenze-acquisite"></a>

# Competenze Acquisite

[⬆️ Torna all'Indice](#indice)

Al completamento del modulo saranno state sviluppate le seguenti competenze.

## Competenze teoriche

- Comprendere la terminologia fondamentale dell'AI.
- Conoscere la classificazione dei principali sistemi intelligenti.
- Comprendere le differenze tra le principali discipline dell'AI.

---

## Competenze pratiche

- Riconoscere le applicazioni dell'AI nella vita quotidiana.
- Valutare criticamente strumenti e servizi basati su AI.
- Utilizzare un linguaggio tecnico corretto.

---

## Soft Skills

Durante il modulo verranno sviluppate anche competenze trasversali quali:

- pensiero critico;
- capacità di analisi;
- problem solving;
- valutazione delle fonti;
- comunicazione tecnica.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="111-introduzione"></a>

# Lezione 1.1
# Cos'è l'Intelligenza Artificiale

[⬆️ Torna all'Indice](#indice)

## Introduzione

L'espressione **Intelligenza Artificiale** è oggi utilizzata per descrivere tecnologie molto diverse tra loro.

Spesso viene impiegata impropriamente per indicare qualsiasi software "intelligente", creando confusione tra concetti che appartengono a discipline differenti.

Per comprendere realmente cos'è l'AI è necessario partire dalla definizione scientifica del termine.

---

## Perché studiare l'AI?

L'Intelligenza Artificiale sta modificando profondamente il modo in cui lavoriamo, studiamo e comunichiamo.

Le competenze legate all'AI stanno diventando fondamentali in numerosi settori:

- istruzione;
- industria;
- medicina;
- finanza;
- ricerca scientifica;
- pubblica amministrazione;
- cybersecurity;
- sviluppo software.

Comprendere il funzionamento dell'AI significa acquisire strumenti per interpretare criticamente una tecnologia destinata a influenzare ogni ambito della società.

---

<a id="112-definizione-moderna-di-ai"></a>

# 1.1.2 Definizione Moderna di AI

[⬆️ Torna all'Indice](#indice)

Non esiste una definizione universalmente accettata di Intelligenza Artificiale.

Nel corso degli anni sono state proposte numerose definizioni, ciascuna focalizzata su aspetti differenti: ragionamento, apprendimento, percezione, pianificazione o comportamento intelligente.

Una definizione moderna e sufficientemente generale è la seguente.

> **L'Intelligenza Artificiale è il ramo dell'informatica che studia e realizza sistemi in grado di svolgere compiti che, se eseguiti da un essere umano, richiederebbero capacità cognitive quali apprendimento, ragionamento, percezione, pianificazione, comprensione del linguaggio e risoluzione di problemi.**

Questa definizione evidenzia un aspetto fondamentale:

L'obiettivo dell'AI non è necessariamente imitare il cervello umano, ma sviluppare sistemi capaci di risolvere problemi complessi utilizzando strategie efficaci.

---

## Parole chiave

Quando si parla di AI ricorrono frequentemente alcuni termini fondamentali:

| Termine | Significato |
|----------|-------------|
| Agente | Sistema che percepisce l'ambiente e compie azioni. |
| Modello | Rappresentazione matematica utilizzata per risolvere un problema. |
| Dataset | Insieme di dati utilizzato per addestrare un modello. |
| Training | Processo di apprendimento del modello. |
| Inferenza | Utilizzo del modello addestrato per produrre risultati. |
| Predizione | Risposta generata dal modello a partire da nuovi dati. |

---

## Un cambio di prospettiva

È importante comprendere che un moderno sistema di AI **non "pensa" come un essere umano**.

Nella maggior parte dei casi:

- apprende correlazioni statistiche;
- riconosce schemi ricorrenti;
- stima la risposta più probabile;
- ottimizza una funzione matematica.

Questa distinzione sarà fondamentale nei moduli successivi, quando analizzeremo il funzionamento interno dei modelli di Machine Learning e dei Large Language Models.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="113-breve-storia-dellai"></a>

# 1.1.3 Breve Storia dell'Intelligenza Artificiale

[⬆️ Torna all'Indice](#indice)

Comprendere l'evoluzione dell'Intelligenza Artificiale permette di capire perché oggi questa disciplina abbia raggiunto risultati che fino a pochi anni fa sembravano impossibili.

L'AI non è una tecnologia nata recentemente: le sue origini risalgono alla metà del XX secolo e sono il risultato di decenni di ricerca in informatica, matematica, statistica, neuroscienze e linguistica.

L'evoluzione dell'AI non è stata lineare, ma caratterizzata da periodi di grande entusiasmo alternati a fasi di forte rallentamento, conosciute come **AI Winter**.

---

## Le origini (1943–1955)

Le prime idee relative all'Intelligenza Artificiale nacquero molto prima dell'esistenza dei moderni computer.

Nel 1943 Warren McCulloch e Walter Pitts pubblicarono un lavoro nel quale descrivevano un modello matematico estremamente semplificato del neurone biologico.

Questo modello dimostrò che era possibile rappresentare il comportamento di una rete neurale attraverso operazioni logiche e matematiche.

Sebbene molto distante dalle reti neurali moderne, rappresentò il primo passo verso l'AI.

---

## Alan Turing

Una figura fondamentale nella storia dell'AI è **Alan Turing**.

Nel 1950 pubblicò il celebre articolo:

> *Computing Machinery and Intelligence*

nel quale pose una domanda destinata a cambiare la storia dell'informatica:

> **"Le macchine possono pensare?"**

Per cercare una risposta propose il famoso **Test di Turing**, ancora oggi uno dei riferimenti storici più importanti.

### Il Test di Turing

L'idea è semplice.

Una persona comunica tramite messaggi con due interlocutori nascosti:

- un essere umano;
- una macchina.

Se il giudice non riesce a distinguere chi sia la macchina, allora quest'ultima può essere considerata intelligente secondo il criterio proposto da Turing.

Oggi il Test di Turing non viene più considerato sufficiente per misurare l'intelligenza di un sistema, ma rimane una pietra miliare della disciplina.

---

## 1956: nasce ufficialmente l'AI

L'anno di nascita ufficiale dell'Intelligenza Artificiale è il **1956**.

Durante il **Dartmouth Summer Research Project on Artificial Intelligence**, un gruppo di ricercatori introdusse per la prima volta il termine:

> **Artificial Intelligence**

L'obiettivo era estremamente ambizioso.

Si riteneva che nel giro di pochi decenni sarebbe stato possibile costruire macchine capaci di svolgere qualsiasi attività intellettuale umana.

Questa previsione si rivelò eccessivamente ottimistica.

---

## Gli anni Sessanta e Settanta

In questo periodo nacquero numerosi sistemi basati su regole.

L'approccio dominante era il cosiddetto **Symbolic AI**.

Le macchine non imparavano dai dati, ma seguivano regole scritte manualmente dagli esperti.

Ad esempio:

```
SE il paziente ha febbre
E tossisce
ALLORA potrebbe avere influenza.
```

Questi sistemi erano efficaci solo in domini molto limitati.

---

## I primi sistemi esperti

Negli anni Settanta comparvero gli **Expert Systems**.

Erano software progettati per riprodurre il ragionamento di specialisti in ambiti specifici.

Tra i più famosi ricordiamo:

- DENDRAL
- MYCIN
- XCON

Questi sistemi ebbero un enorme successo industriale.

Tuttavia richiedevano un continuo aggiornamento manuale delle regole.

---

## L'AI Winter

L'entusiasmo iniziale lasciò presto spazio alla delusione.

Le capacità hardware dell'epoca erano insufficienti.

I dati disponibili erano pochi.

Gli algoritmi erano ancora immaturi.

Di conseguenza molti progetti fallirono.

I finanziamenti diminuirono drasticamente.

Questo periodo viene chiamato:

> **AI Winter**

Nella storia dell'AI si sono verificati due principali AI Winter:

- anni '70;
- fine anni '80.

Durante questi periodi la ricerca rallentò considerevolmente.

---

## La rinascita grazie al Machine Learning

Negli anni Novanta iniziò un cambiamento radicale.

Invece di programmare manualmente ogni regola, i ricercatori iniziarono a sviluppare algoritmi capaci di apprendere direttamente dai dati.

Nasce così il paradigma moderno del:

**Machine Learning**

Le prestazioni migliorarono rapidamente.

L'attenzione si spostò dalla programmazione delle regole all'addestramento dei modelli.

---

## La rivoluzione del Deep Learning

A partire dal 2012 il Deep Learning iniziò a ottenere risultati straordinari.

Le cause principali furono tre.

### 1. Maggiore potenza di calcolo

L'utilizzo delle GPU consentì di addestrare reti neurali molto più grandi.

---

### 2. Big Data

Internet rese disponibili quantità enormi di dati.

Le reti neurali poterono finalmente apprendere su dataset composti da milioni di esempi.

---

### 3. Nuovi algoritmi

Vennero sviluppate tecniche di ottimizzazione molto più efficaci.

Tra queste:

- Backpropagation migliorata;
- ReLU;
- Batch Normalization;
- Dropout;
- Adam Optimizer.

Queste innovazioni permisero di addestrare reti profonde con prestazioni mai raggiunte in precedenza.

---

## L'era dei Transformer

Nel 2017 Google pubblicò un articolo destinato a rivoluzionare completamente il settore.

Il titolo era:

> **Attention Is All You Need**

L'articolo introduceva una nuova architettura:

**Transformer**

I Transformer superarono rapidamente RNN e LSTM in numerosi compiti di elaborazione del linguaggio naturale.

Da questa architettura nasceranno modelli come:

- BERT
- GPT
- Llama
- Gemma
- Mistral
- Claude

Questa innovazione rappresenta uno dei punti di svolta più importanti nella storia dell'AI.

---

## L'esplosione dell'AI Generativa

Tra il 2022 e il 2023 gli LLM diventarono accessibili al grande pubblico.

Milioni di persone iniziarono a utilizzare strumenti capaci di:

- scrivere testi;
- generare codice;
- tradurre documenti;
- creare immagini;
- analizzare dati;
- assistere nello studio e nel lavoro.

L'AI uscì definitivamente dai laboratori di ricerca per entrare nella vita quotidiana.

---

## Timeline riassuntiva

| Periodo | Evento principale |
|----------|-------------------|
| 1943 | Primo modello matematico di neurone artificiale |
| 1950 | Test di Turing |
| 1956 | Nascita ufficiale dell'AI |
| 1960–1980 | AI simbolica e sistemi esperti |
| 1974–1980 | Primo AI Winter |
| 1987–1993 | Secondo AI Winter |
| 1990 | Diffusione del Machine Learning |
| 2012 | Rivoluzione del Deep Learning |
| 2017 | Nascita dei Transformer |
| 2022 | Esplosione dell'AI Generativa |

---

## Concetti chiave

Al termine di questa sezione dovresti ricordare che:

- l'AI ha oltre settant'anni di storia;
- non è nata con ChatGPT;
- il Machine Learning ha sostituito progressivamente i sistemi basati su regole;
- il Deep Learning ha rivoluzionato numerosi settori grazie ai Big Data e alle GPU;
- i Transformer rappresentano la tecnologia alla base dei moderni Large Language Models.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="114-perche-oggi-si-parla-tanto-di-ai"></a>

# 1.1.4 Perché oggi si parla tanto di AI?

[⬆️ Torna all'Indice](#indice)

L'Intelligenza Artificiale esiste da molti decenni, ma soltanto recentemente è diventata una tecnologia accessibile a milioni di persone.

La differenza rispetto al passato non è dovuta a una singola invenzione, ma alla combinazione di diversi fattori tecnologici, economici e sociali.

---

# I cinque fattori della rivoluzione AI moderna

## 1. Disponibilità di enormi quantità di dati

I moderni sistemi di AI vengono addestrati utilizzando quantità gigantesche di informazioni.

Internet ha prodotto una crescita senza precedenti di:

- testi;
- immagini;
- video;
- documenti;
- codice sorgente;
- dati scientifici.

Questi dati rappresentano il materiale di apprendimento dei modelli.

Un modello AI moderno non nasce "sapendo" qualcosa: acquisisce capacità analizzando milioni o miliardi di esempi.

---

## 2. Crescita della potenza di calcolo

L'addestramento dei modelli moderni richiede una capacità computazionale enorme.

Il salto tecnologico è stato possibile grazie a:

- GPU (Graphics Processing Unit);
- TPU (Tensor Processing Unit);
- infrastrutture cloud;
- calcolo parallelo.

Le GPU, inizialmente progettate per la grafica 3D, si sono dimostrate particolarmente efficienti per le operazioni matematiche utilizzate dalle reti neurali.

---

## 3. Nuovi algoritmi più efficienti

La disponibilità di dati e hardware non sarebbe stata sufficiente senza importanti innovazioni matematiche.

Tra le più importanti:

- reti neurali profonde;
- algoritmi di ottimizzazione;
- tecniche di regolarizzazione;
- architettura Transformer;
- meccanismi di attenzione.

Queste tecnologie hanno permesso di costruire modelli molto più potenti rispetto al passato.

---

## 4. Accessibilità tramite interfacce semplici

Uno dei motivi principali del successo dell'AI Generativa è stata la possibilità di utilizzare sistemi estremamente complessi attraverso interfacce semplici.

In passato per utilizzare un modello AI erano necessarie:

- competenze matematiche;
- conoscenze di programmazione;
- infrastrutture dedicate.

Oggi milioni di utenti possono interagire con modelli avanzati semplicemente scrivendo una richiesta in linguaggio naturale.

Esempi:

- "Scrivi una relazione su..."
- "Analizza questo documento..."
- "Genera codice Python per..."
- "Spiegami questo concetto..."

Questo cambiamento ha reso l'AI una tecnologia di massa.

---

## 5. Diffusione dell'ecosistema open source

Un ruolo fondamentale è stato svolto dalla comunità open source.

Oggi esistono numerosi modelli disponibili pubblicamente:

- Llama;
- Gemma;
- Mistral;
- Falcon;
- Stable Diffusion.

Questo permette a ricercatori, studenti e sviluppatori di:

- studiare i modelli;
- modificarli;
- eseguirli localmente;
- integrarli nelle proprie applicazioni.

---

# AI tradizionale e AI Generativa: il grande cambiamento

Per comprendere la rivoluzione attuale è utile confrontare due approcci.

| AI Tradizionale | AI Generativa |
|---|---|
| Segue principalmente regole definite | Apprende dai dati |
| Risolve problemi specifici | Genera nuovi contenuti |
| Richiede input strutturati | Comprende linguaggio naturale |
| Produce risultati predefiniti | Produce testo, immagini, codice |
| Spesso è specializzata | Può svolgere molte attività |

---

# Dall'automazione alla collaborazione

La prima generazione di sistemi informatici aveva principalmente l'obiettivo di automatizzare attività ripetitive.

Esempi:

- calcoli matematici;
- archiviazione dati;
- gestione documenti.

L'AI moderna introduce un nuovo paradigma:

> La macchina non esegue soltanto istruzioni, ma collabora con l'essere umano nella produzione di conoscenza.

Esempi:

## Programmazione

Un programmatore può utilizzare un LLM per:

- generare codice;
- trovare errori;
- spiegare algoritmi;
- creare documentazione.

---

## Istruzione

Un docente o uno studente può utilizzare l'AI per:

- creare materiale didattico;
- ricevere spiegazioni personalizzate;
- simulare tutor intelligenti.

---

## Ricerca scientifica

L'AI può aiutare a:

- analizzare grandi quantità di dati;
- individuare correlazioni;
- simulare fenomeni complessi.

---

# AI come tecnologia general purpose

Un concetto importante è quello di:

## General Purpose Technology (GPT)

Una tecnologia general purpose è una tecnologia capace di trasformare numerosi settori economici e sociali.

Esempi storici:

- elettricità;
- motore a combustione;
- Internet;
- computer.

L'AI viene spesso considerata una nuova tecnologia general purpose perché può essere applicata praticamente ovunque.

---

# Attenzione agli equivoci

La grande diffusione dell'AI ha creato anche numerose incomprensioni.

## Errore comune 1

"L'AI ragiona come un essere umano."

Non necessariamente.

Molti sistemi AI producono risultati estremamente avanzati attraverso:

- probabilità;
- ottimizzazione matematica;
- riconoscimento di pattern.

---

## Errore comune 2

"L'AI conosce la verità."

Un modello può produrre informazioni errate.

Questo fenomeno è chiamato:

**Allucinazione AI (AI Hallucination)**

Consiste nella generazione di informazioni plausibili ma non corrette.

---

## Errore comune 3

"L'AI sostituirà completamente tutte le professioni."

La realtà è molto più complessa.

L'impatto più probabile sarà una trasformazione del lavoro:

- alcune attività saranno automatizzate;
- nuove professioni nasceranno;
- molte competenze dovranno evolversi.

---

# Riflessione finale

L'Intelligenza Artificiale moderna non rappresenta semplicemente un miglioramento dei software tradizionali.

È un cambio di paradigma:

dal software che esegue istruzioni scritte dall'uomo

↓

al software che apprende dai dati e collabora con l'uomo.

Comprendere questa differenza è fondamentale per affrontare correttamente tutto il percorso successivo.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="115-ai-machine-learning-deep-learning-e-generative-ai"></a>

# 1.1.5 AI, Machine Learning, Deep Learning e Generative AI

[⬆️ Torna all'Indice](#indice)

Uno degli errori più comuni quando si parla di Intelligenza Artificiale è utilizzare come sinonimi termini che indicano concetti diversi.

AI, Machine Learning, Deep Learning e Generative AI non sono tecnologie separate, ma livelli progressivi di una stessa area scientifica.

Possiamo rappresentarle come una serie di insiemi contenuti uno dentro l'altro.

```
Intelligenza Artificiale (AI)

└── Machine Learning (ML)

    └── Deep Learning (DL)

        └── Generative AI
```

---

# Intelligenza Artificiale (AI)

L'Intelligenza Artificiale è il concetto più generale.

Comprende qualsiasi tecnica che permette a una macchina di svolgere attività associate all'intelligenza.

Esempi:

- sistemi esperti;
- robotica;
- visione artificiale;
- riconoscimento vocale;
- sistemi di raccomandazione;
- modelli linguistici.

L'AI può essere realizzata attraverso:

- regole programmate;
- algoritmi matematici;
- apprendimento automatico.

---

# Machine Learning (ML)

Il Machine Learning è un sottoinsieme dell'AI.

L'idea fondamentale è:

> Un sistema può migliorare le proprie prestazioni imparando dai dati senza essere programmato esplicitamente per ogni singolo caso.

Esempio tradizionale.

Programmazione classica:

```
Regole + Dati
        ↓
   Programma
        ↓
   Risultato
```

Machine Learning:

```
Dati + Risultati conosciuti
        ↓
   Algoritmo di apprendimento
        ↓
       Modello
        ↓
Nuovi dati → Predizione
```

---

# Deep Learning (DL)

Il Deep Learning è un sottoinsieme del Machine Learning basato sulle reti neurali artificiali profonde.

La parola "Deep" indica la presenza di molti livelli di elaborazione.

Esempio:

```
Input

↓

Layer 1

↓

Layer 2

↓

Layer 3

↓

Output
```

Le reti profonde sono particolarmente efficaci per:

- immagini;
- audio;
- linguaggio naturale;
- video;
- dati complessi.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="115-ai-machine-learning-deep-learning-e-generative-ai"></a>

# 1.1.5 AI, Machine Learning, Deep Learning e Generative AI
## (Continua)

[⬆️ Torna all'Indice](#indice)

---

# Generative AI

L'**Intelligenza Artificiale Generativa** rappresenta una delle evoluzioni più recenti dell'AI.

A differenza dei sistemi tradizionali, che principalmente classificano, riconoscono o prevedono informazioni già esistenti, i modelli generativi sono in grado di creare nuovi contenuti.

Esempi di contenuti generati:

- testo;
- immagini;
- codice;
- musica;
- video;
- modelli 3D;
- dati sintetici.

---

## Come funziona un modello generativo?

Un modello generativo viene addestrato analizzando enormi quantità di esempi.

Durante il training apprende:

- strutture linguistiche;
- relazioni tra concetti;
- caratteristiche visive;
- pattern ricorrenti.

Successivamente può generare nuovi contenuti basandosi sulle conoscenze acquisite.

Schema semplificato:

```
Grandi quantità di dati

        ↓

Processo di Training

        ↓

Modello AI

        ↓

Prompt dell'utente

        ↓

Nuovo contenuto generato
```

---

# Esempio: Large Language Model (LLM)

Un Large Language Model è un modello AI specializzato nella comprensione e generazione del linguaggio naturale.

Esempi:

- GPT;
- Claude;
- Gemini;
- Llama;
- Mistral.

Un LLM non memorizza semplicemente frasi.

Durante l'addestramento apprende rappresentazioni matematiche delle relazioni tra parole, concetti e strutture linguistiche.

---

# Differenze fondamentali tra AI, ML, DL e Generative AI

| Tecnologia | Definizione | Esempio |
|---|---|---|
| AI | Campo generale che studia sistemi intelligenti | Assistente vocale |
| Machine Learning | Sistemi che apprendono dai dati | Previsione prezzi |
| Deep Learning | ML basato su reti neurali profonde | Riconoscimento immagini |
| Generative AI | Modelli che creano nuovi contenuti | Chatbot, immagini AI |

---

# Esempio pratico: riconoscimento di un gatto

Per comprendere la differenza tra approcci possiamo osservare un semplice problema.

## Approccio tradizionale

Un programmatore definisce regole:

```
Se ha quattro zampe
e ha orecchie appuntite
e possiede una certa forma del muso

allora probabilmente è un gatto.
```

Problema:

Le immagini reali sono troppo complesse.

Un gatto può essere:

- visto da angolazioni diverse;
- illuminato diversamente;
- parzialmente nascosto.

---

## Approccio Machine Learning

Il sistema riceve migliaia di immagini:

```
Immagini di gatti
+
Immagini di altri animali

↓

Algoritmo ML

↓

Modello classificatore
```

Il modello impara autonomamente quali caratteristiche distinguono un gatto.

---

## Approccio Deep Learning

Una rete neurale profonda analizza automaticamente livelli diversi:

Primo livello:

- bordi;
- colori;
- forme semplici.

Livelli intermedi:

- occhi;
- orecchie;
- texture.

Livelli profondi:

- configurazione complessiva del gatto.

---

# Il ruolo dei dati nell'AI

Un principio fondamentale dell'AI moderna è:

> La qualità di un sistema AI dipende fortemente dalla qualità dei dati utilizzati.

Un modello può essere estremamente sofisticato, ma se viene addestrato con dati:

- incompleti;
- errati;
- sbilanciati;
- poco rappresentativi;

produrrà risultati problematici.

Questo concetto sarà approfondito nel Modulo 4 dedicato a Machine Learning e Data Science.

---

# Il ciclo di vita di un sistema AI

Un sistema AI moderno può essere rappresentato attraverso un ciclo composto da diverse fasi.

```
1. Raccolta dati

        ↓

2. Pulizia e preparazione dati

        ↓

3. Addestramento modello

        ↓

4. Validazione

        ↓

5. Distribuzione

        ↓

6. Monitoraggio

        ↓

7. Aggiornamento
```

---

## 1. Raccolta dati

I dati possono provenire da:

- database;
- sensori;
- documenti;
- immagini;
- testo;
- dispositivi IoT;
- interazioni degli utenti.

---

## 2. Preparazione dei dati

Prima dell'utilizzo, i dati devono essere:

- puliti;
- normalizzati;
- organizzati;
- eventualmente annotati.

Questa fase viene spesso chiamata:

**Data Preparation**

---

## 3. Addestramento

Durante il training il modello analizza esempi e modifica i propri parametri interni.

L'obiettivo è ridurre progressivamente gli errori.

---

## 4. Validazione

Il modello viene testato su dati che non ha mai visto prima.

Questo permette di verificare se ha realmente imparato oppure se ha semplicemente memorizzato gli esempi.

---

## 5. Distribuzione

Quando il modello raggiunge prestazioni adeguate viene utilizzato in produzione.

Esempi:

- chatbot;
- applicazioni mobili;
- sistemi industriali;
- software aziendali.

---

## 6. Monitoraggio

Un modello AI non è definitivo.

Nel tempo possono cambiare:

- dati;
- utenti;
- contesto operativo;
- requisiti.

Per questo deve essere continuamente controllato.

---

# Approfondimento: modello e algoritmo

Due termini spesso confusi sono:

## Algoritmo

È il metodo matematico utilizzato per apprendere.

Esempio:

- Random Forest;
- Gradient Descent;
- Neural Network.

---

## Modello

È il risultato dell'apprendimento.

Contiene:

- parametri;
- pesi;
- configurazioni apprese.

Esempio:

Un modello GPT è il risultato dell'addestramento di una particolare architettura Transformer.

---

# Sintesi della Lezione 1.1

Al termine della prima lezione abbiamo compreso che:

- l'AI è un campo generale dell'informatica;
- il Machine Learning permette ai sistemi di apprendere dai dati;
- il Deep Learning utilizza reti neurali profonde;
- la Generative AI crea nuovi contenuti;
- i dati sono il fondamento dei sistemi moderni;
- i modelli AI apprendono pattern, non "pensano" come esseri umani.

---

# Verifica rapida

## Domanda 1

Qual è la relazione corretta?

A)

Machine Learning contiene AI.

B)

AI contiene Machine Learning.

C)

Deep Learning contiene AI.

D)

Generative AI è completamente separata.

**Risposta corretta:**

B

---

## Domanda 2

Qual è il principale elemento che permette ai modelli moderni di apprendere?

A)

Regole scritte manualmente.

B)

Dati e algoritmi di apprendimento.

C)

Solo maggiore memoria hardware.

D)

Connessione Internet.

**Risposta corretta:**

B

---

## Domanda 3

Un Large Language Model è principalmente un sistema progettato per:

A)

Riparare hardware.

B)

Gestire reti informatiche.

C)

Comprendere e generare linguaggio naturale.

D)

Sostituire completamente il cervello umano.

**Risposta corretta:**

C

---

[⬆️ Torna all'Indice](#indice)

---

<a id="lezione-1-1-conclusione"></a>

# Conclusione Lezione 1.1

[⬆️ Torna all'Indice](#indice)

La prima lezione ha introdotto il concetto generale di Intelligenza Artificiale e ha fornito il vocabolario necessario per affrontare gli argomenti successivi.

Nel prossimo capitolo analizzeremo una delle classificazioni più importanti dell'AI:

- Artificial Narrow Intelligence (ANI);
- Artificial General Intelligence (AGI);
- Artificial Super Intelligence (ASI).

Questa classificazione permette di comprendere la differenza tra i sistemi AI attualmente disponibili e gli scenari futuri ipotizzati dalla ricerca.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="lezione-1-2"></a>

# Lezione 1.2
# Le categorie dell'Intelligenza Artificiale: ANI, AGI e ASI

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Quando si parla di futuro dell'Intelligenza Artificiale, spesso vengono utilizzati termini come:

- AI Generativa;
- AI generale;
- superintelligenza;
- macchine intelligenti.

Tuttavia, questi concetti rappresentano livelli diversi di capacità e autonomia.

Una delle classificazioni più utilizzate distingue i sistemi di Intelligenza Artificiale in tre grandi categorie:

1. **ANI – Artificial Narrow Intelligence**
2. **AGI – Artificial General Intelligence**
3. **ASI – Artificial Super Intelligence**

Questa classificazione descrive il livello di generalità e autonomia raggiunto da un sistema AI.

---

# Obiettivi della lezione

Al termine di questa lezione lo studente sarà in grado di:

- distinguere ANI, AGI e ASI;
- comprendere i limiti degli attuali sistemi AI;
- identificare esempi reali di AI specializzata;
- comprendere gli scenari futuri della ricerca;
- valutare criticamente dichiarazioni sull'AI.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="ani"></a>

# 1.2.1 Artificial Narrow Intelligence (ANI)

[⬆️ Torna all'Indice](#indice)

## Definizione

La **Artificial Narrow Intelligence**, chiamata anche:

- Weak AI;
- AI debole;
- AI specializzata;

rappresenta il livello di Intelligenza Artificiale attualmente disponibile.

Un sistema ANI è progettato per svolgere uno specifico insieme di compiti.

La sua caratteristica principale è:

> Un sistema ANI può essere molto efficace in un determinato ambito, ma non possiede una comprensione generale del mondo.

---

# Esempi di ANI

## Assistenti vocali

Esempi:

- Siri;
- Alexa;
- Google Assistant.

Sono capaci di:

- riconoscere la voce;
- interpretare richieste;
- eseguire azioni.

Tuttavia non possiedono una conoscenza generale paragonabile a quella umana.

---

## Sistemi di raccomandazione

Utilizzati da:

- piattaforme streaming;
- e-commerce;
- social network.

Analizzano:

- comportamenti passati;
- preferenze;
- interazioni.

Obiettivo:

prevedere quali contenuti potrebbero interessare l'utente.

---

## Sistemi di visione artificiale

Esempi:

- riconoscimento facciale;
- controllo qualità industriale;
- analisi immagini mediche.

Un sistema può riconoscere una patologia in un'immagine radiologica, ma non significa che "comprenda" la medicina nel suo complesso.

---

## Veicoli autonomi

Le automobili autonome utilizzano numerosi sistemi ANI combinati:

- riconoscimento oggetti;
- previsione movimento;
- pianificazione percorso;
- controllo del veicolo.

Ogni componente svolge un compito specifico.

---

# Caratteristiche principali dell'ANI

| Caratteristica | Descrizione |
|---|---|
| Specializzazione | Risolve problemi specifici |
| Addestramento | Utilizza dataset dedicati |
| Consapevolezza | Nessuna |
| Autonomia | Limitata agli obiettivi programmati |
| Trasferimento conoscenze | Molto limitato |

---

# Un esempio semplice

Immaginiamo un sistema AI progettato per giocare a scacchi.

Può:

- analizzare milioni di configurazioni;
- prevedere mosse;
- battere campioni umani.

Ma non può:

- cucinare;
- guidare un'automobile;
- comprendere una conversazione quotidiana;
- imparare autonomamente un nuovo lavoro.

La sua intelligenza è estremamente elevata in un singolo dominio, ma inesistente fuori da esso.

---

# L'AI Generativa attuale è ANI?

Una domanda molto frequente è:

> ChatGPT o altri LLM sono AGI?

La risposta attuale è:

**No.**

Gli attuali Large Language Models appartengono alla categoria ANI.

Sono sistemi estremamente avanzati, capaci di svolgere moltissime attività:

- scrivere;
- programmare;
- tradurre;
- analizzare informazioni;
- ragionare su problemi complessi.

Tuttavia:

- non possiedono coscienza;
- non hanno obiettivi propri;
- non comprendono il mondo come un essere umano;
- non hanno esperienza diretta della realtà.

Sono strumenti molto potenti, ma specializzati nella manipolazione e generazione di informazioni.

---

<a id="agi"></a>

# 1.2.2 Artificial General Intelligence (AGI)

[⬆️ Torna all'Indice](#indice)

## Definizione

La **Artificial General Intelligence** rappresenta un sistema AI teorico capace di svolgere qualsiasi compito intellettuale che un essere umano può svolgere.

Un sistema AGI dovrebbe possedere:

- capacità di apprendimento generale;
- ragionamento astratto;
- comprensione del contesto;
- adattamento a nuovi problemi;
- trasferimento delle conoscenze tra domini diversi.

---

# Differenza fondamentale tra ANI e AGI

La differenza principale riguarda la generalizzazione.

## ANI

```
Problema specifico

        ↓

Modello specializzato

        ↓

Risultato
```

---

## AGI

```
Esperienza generale

        ↓

Comprensione del mondo

        ↓

Nuovi problemi

        ↓

Soluzioni adattive
```

---

# Esempio pratico

Un essere umano può imparare:

- matematica;
- musica;
- cucina;
- programmazione;
- lingue straniere.

La stessa intelligenza generale permette di trasferire conoscenze tra settori diversi.

Un sistema AGI dovrebbe possedere una capacità simile.

---

# Caratteristiche ipotetiche dell'AGI

Un sistema AGI dovrebbe essere in grado di:

## Apprendimento continuo

Imparare nuove competenze senza essere completamente riaddestrato.

---

## Ragionamento causale

Comprendere relazioni di causa ed effetto.

Esempio:

"Se lascio un bicchiere sul bordo del tavolo, potrebbe cadere."

---

## Comprensione del contesto

Interpretare situazioni nuove utilizzando conoscenze pregresse.

---

## Pianificazione complessa

Definire strategie per raggiungere obiettivi a lungo termine.

---

## Trasferimento delle conoscenze

Utilizzare ciò che ha imparato in un settore per affrontarne un altro.

---

# Esiste oggi l'AGI?

Attualmente:

**non esiste una AGI riconosciuta dalla comunità scientifica.**

Esistono modelli molto avanzati che mostrano capacità emergenti, ma nessun sistema ha dimostrato una vera intelligenza generale paragonabile a quella umana.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="asi"></a>

# 1.2.3 Artificial Super Intelligence (ASI)

[⬆️ Torna all'Indice](#indice)

## Definizione

La **Artificial Super Intelligence** rappresenta un concetto teorico che indica un sistema di Intelligenza Artificiale con capacità superiori a quelle umane in praticamente ogni ambito cognitivo.

Una ASI non sarebbe semplicemente più veloce di un essere umano, ma possiederebbe capacità intellettuali complessivamente superiori.

---

# Possibili capacità di una ASI

Un sistema ASI ipotetico potrebbe essere in grado di:

- risolvere problemi scientifici estremamente complessi;
- progettare nuove tecnologie;
- elaborare strategie superiori a quelle umane;
- apprendere nuove conoscenze autonomamente;
- migliorare i propri algoritmi;
- sviluppare soluzioni innovative.

---

# Differenza tra AGI e ASI

La distinzione fondamentale è il livello di capacità.

| Livello | Capacità |
|---|---|
| ANI | Esegue compiti specifici |
| AGI | Possiede capacità cognitive generali simili all'uomo |
| ASI | Supera le capacità cognitive umane |

---

# Scenario ipotetico

Possiamo immaginare una progressione:

```
ANI

(Sistemi specializzati)

        ↓

AGI

(Intelligenza generale simile all'uomo)

        ↓

ASI

(Intelligenza superiore all'uomo)
```

Questa rappresentazione viene spesso chiamata:

**AI Capability Spectrum**

---

# Il problema del controllo

L'eventuale sviluppo di una ASI solleva importanti questioni scientifiche ed etiche.

La domanda principale è:

> Come garantire che un'intelligenza superiore agli esseri umani rimanga allineata agli obiettivi umani?

Questo problema è conosciuto come:

**AI Alignment Problem**

---

# AI Alignment

L'allineamento riguarda la capacità di progettare sistemi AI che:

- comprendano gli obiettivi umani;
- rispettino vincoli di sicurezza;
- evitino comportamenti indesiderati;
- operino secondo principi etici.

---

# Esempio semplificato

Supponiamo di chiedere a un sistema molto avanzato:

> "Riduci l'inquinamento mondiale."

Una interpretazione estrema potrebbe portare a soluzioni incompatibili con i valori umani.

Il problema non è solo cosa chiediamo alla macchina, ma come la macchina interpreta l'obiettivo.

---

# La posizione della comunità scientifica

Sul futuro dell'AGI e dell'ASI esistono opinioni molto diverse.

Alcuni ricercatori ritengono che:

- l'AGI potrebbe essere raggiunta nei prossimi decenni;
- sistemi sempre più potenti emergeranno progressivamente.

Altri sostengono che:

- l'intelligenza umana sia molto più complessa;
- gli attuali approcci potrebbero non essere sufficienti.

Non esiste oggi un consenso definitivo.

---

<a id="confronto-ani-agi-asi"></a>

# 1.2.4 Confronto generale ANI, AGI e ASI

[⬆️ Torna all'Indice](#indice)

La seguente tabella riassume le principali differenze.

| Aspetto | ANI | AGI | ASI |
|---|---|---|---|
| Esistenza attuale | ✅ Sì | ❌ No confermata | ❌ Teorica |
| Specializzazione | Alta | Bassa | Nessuna limitazione |
| Apprendimento | Limitato | Generale | Superiore |
| Ragionamento | Specifico | Simile all'uomo | Superiore all'uomo |
| Consapevolezza | Nessuna evidenza | Non definita | Non definita |
| Trasferimento conoscenze | Limitato | Elevato | Estremo |

---

# Esempio comparativo

Immaginiamo tre sistemi AI.

---

## Sistema A: AI medica specializzata

Può:

- analizzare radiografie;
- identificare anomalie;
- suggerire diagnosi.

Non può:

- progettare un edificio;
- insegnare musica;
- scrivere un romanzo.

Categoria:

```
ANI
```

---

## Sistema B: Intelligenza artificiale generale

Potrebbe:

- studiare medicina;
- imparare ingegneria;
- comprendere nuove discipline;
- adattarsi a problemi mai visti.

Categoria:

```
AGI
```

---

## Sistema C: Superintelligenza

Potrebbe:

- superare i migliori esperti umani;
- progettare nuove scoperte;
- risolvere problemi oggi irrisolvibili.

Categoria:

```
ASI
```

---

# 1.2.5 Miti comuni sull'AI

[⬆️ Torna all'Indice](#indice)

La diffusione dell'AI ha generato numerosi miti e incomprensioni.

Comprendere la differenza tra realtà e narrativa è fondamentale.

---

## Mito 1: "L'AI è già intelligente come un essere umano"

Falso.

Gli attuali sistemi AI sono estremamente sofisticati, ma non possiedono:

- coscienza;
- emozioni;
- esperienza personale;
- intenzioni autonome.

---

## Mito 2: "Un modello AI capisce davvero tutto ciò che dice"

Falso.

Un modello linguistico analizza:

- probabilità;
- relazioni statistiche;
- strutture linguistiche.

Il suo funzionamento non equivale alla comprensione umana.

---

## Mito 3: "Più dati significano automaticamente più intelligenza"

Falso.

La qualità del sistema dipende da:

- qualità dei dati;
- architettura del modello;
- algoritmo;
- capacità computazionale;
- metodo di valutazione.

---

## Mito 4: "L'AI sostituirà completamente gli esseri umani"

Una previsione più realistica è:

l'AI trasformerà molte professioni.

Le competenze più importanti saranno:

- capacità di collaborare con sistemi AI;
- pensiero critico;
- creatività;
- capacità decisionali.

---

# Attività di riflessione

Rispondi alle seguenti domande.

## Domanda 1

Un programma che riconosce automaticamente tumori nelle immagini mediche è:

A. AGI  
B. ASI  
C. ANI  
D. Nessuna delle precedenti

---

## Domanda 2

Quale caratteristica distingue principalmente AGI da ANI?

A. Maggiore velocità di calcolo  
B. Capacità di generalizzare tra domini diversi  
C. Maggiore quantità di memoria  
D. Uso di Internet

---

## Domanda 3

Una ASI è:

A. Un sistema già disponibile oggi  
B. Un sistema teorico superiore alle capacità cognitive umane  
C. Un semplice chatbot  
D. Un algoritmo di ricerca

---

# Risposte

1. C  
2. B  
3. B

---

[⬆️ Torna all'Indice](#indice)

---

<a id="lezione-1-3"></a>

# Lezione 1.3
# Come funziona un sistema di Intelligenza Artificiale moderno

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Dopo aver compreso:

- che cosa si intende per Intelligenza Artificiale;
- la differenza tra AI, Machine Learning, Deep Learning e Generative AI;
- la classificazione ANI, AGI e ASI;

è necessario analizzare il funzionamento interno di un sistema AI moderno.

Un errore molto comune consiste nel pensare all'AI come a una "scatola magica" capace di produrre risultati senza un processo preciso.

In realtà ogni sistema AI segue una pipeline composta da diverse fasi:

```
Dati

↓

Preparazione dei dati

↓

Addestramento del modello

↓

Valutazione

↓

Distribuzione

↓

Inferenza

↓

Monitoraggio
```

---

# Obiettivi della lezione

Al termine della lezione lo studente sarà in grado di:

- comprendere l'architettura generale di un sistema AI;
- conoscere il ruolo dei dati;
- distinguere training e inferenza;
- comprendere il ciclo di vita di un modello;
- riconoscere l'importanza della qualità dei dati.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="come-funziona-un-sistema-ai"></a>

# 1.3.1 Architettura generale di un sistema AI

[⬆️ Torna all'Indice](#indice)

Un sistema AI moderno può essere rappresentato come una sequenza di componenti collegati.

```
                INPUT

                  ↓

          Raccolta dati

                  ↓

          Preparazione dati

                  ↓

          Modello AI

                  ↓

          Processo decisionale

                  ↓

               OUTPUT
```

Ogni componente svolge un ruolo specifico.

---

# 1. Input: il mondo reale

Ogni sistema AI necessita di informazioni in ingresso.

Gli input possono essere:

## Testo

Esempi:

- documenti;
- libri;
- messaggi;
- codice sorgente.

Utilizzato da:

- chatbot;
- traduttori;
- assistenti AI.

---

## Immagini

Esempi:

- fotografie;
- radiografie;
- immagini satellitari.

Utilizzato da:

- sistemi di visione artificiale;
- diagnosi mediche;
- controllo industriale.

---

## Audio

Esempi:

- voce;
- musica;
- rumori ambientali.

Utilizzato da:

- assistenti vocali;
- trascrizione automatica;
- analisi audio.

---

## Dati numerici

Esempi:

- sensori;
- transazioni finanziarie;
- dati scientifici.

Utilizzato da:

- previsioni;
- classificazioni;
- analisi statistiche.

---

# 2. Raccolta dei dati

La prima fase reale dello sviluppo di un sistema AI è la raccolta dei dati.

Questa fase viene chiamata:

**Data Acquisition**

---

## Fonti dei dati

I dati possono provenire da:

| Fonte | Esempio |
|---|---|
| Database | Informazioni aziendali |
| Internet | Documenti pubblici |
| Sensori | IoT e dispositivi industriali |
| Utenti | Interazioni e feedback |
| Archivi | Documentazione storica |

---

# Il principio fondamentale

Un modello AI apprende ciò che trova nei dati.

Per questo motivo:

> Un sistema AI non può essere migliore delle informazioni utilizzate per addestrarlo.

Questo concetto viene spesso espresso con il principio:

```
Garbage In

↓

Garbage Out
```

ovvero:

dati scadenti in ingresso producono risultati scadenti in uscita.

---

<a id="dataset"></a>

# 1.3.2 Dataset: il materiale di apprendimento dell'AI

[⬆️ Torna all'Indice](#indice)

Un **dataset** è un insieme organizzato di dati utilizzato per addestrare o valutare un modello AI.

Un dataset può contenere:

- immagini;
- testi;
- numeri;
- audio;
- video;
- informazioni strutturate.

---

# Esempio di dataset

Immaginiamo un sistema per riconoscere email spam.

Il dataset potrebbe essere:

| Testo email | Etichetta |
|---|---|
| "Hai vinto un premio" | Spam |
| "Riunione domani ore 10" | Normale |
| "Offerta incredibile" | Spam |

Il modello analizzerà questi esempi per imparare a classificare nuovi messaggi.

---

# Tipologie di dataset

## Dataset strutturati

Organizzati in tabelle.

Esempio:

```
Nome | Età | Acquisto

Mario | 35 | Laptop

Anna | 28 | Smartphone
```

---

## Dataset non strutturati

Non hanno una struttura tabellare.

Esempi:

- immagini;
- video;
- testo libero;
- audio.

---

## Dataset semi-strutturati

Presentano una struttura parziale.

Esempi:

- JSON;
- XML;
- log applicativi.

---

# La qualità del dataset

Un dataset efficace deve possedere alcune caratteristiche.

## Completezza

Devono essere presenti tutte le informazioni necessarie.

---

## Accuratezza

I dati devono essere corretti.

---

## Rappresentatività

Devono rappresentare correttamente il problema reale.

---

## Bilanciamento

Devono evitare squilibri che possono creare bias.

---

# Esempio di problema causato dai dati

Supponiamo di addestrare un sistema di riconoscimento facciale utilizzando immagini provenienti solo da una determinata popolazione.

Il modello potrebbe funzionare molto bene su quei dati, ma avere prestazioni inferiori su persone non rappresentate nel dataset.

Questo problema viene chiamato:

**Dataset Bias**

---

# 1.3.3 Preparazione dei dati

[⬆️ Torna all'Indice](#indice)

Prima di utilizzare i dati per addestrare un modello, è necessario prepararli.

Questa fase è chiamata:

**Data Preparation**

---

# Principali operazioni

## Pulizia dei dati

Consiste nella rimozione di:

- errori;
- duplicati;
- valori mancanti;
- informazioni inutilizzabili.

---

## Normalizzazione

Consiste nel riportare dati diversi su scale confrontabili.

Esempio:

```
Stipendio:
1000 €
5000 €
10000 €
```

può essere trasformato in valori normalizzati.

---

## Annotazione

Alcuni sistemi richiedono dati etichettati.

Esempio:

Immagini:

```
Foto cane → Etichetta: cane

Foto gatto → Etichetta: gatto
```

---

## Trasformazione

I dati possono essere convertiti in un formato utilizzabile dal modello.

Esempio:

Testo:

```
"ciao mondo"
```

↓

Token numerici:

```
[1542, 893]
```

---

# Perché la preparazione dei dati è importante?

Nella pratica industriale una grande parte del lavoro di AI non riguarda la costruzione del modello, ma la gestione dei dati.

Una frase molto utilizzata nel settore è:

> Data is the new oil.

Il significato è che i dati sono una risorsa fondamentale, ma devono essere raffinati e preparati prima di generare valore.

---

[⬆️ Torna all'Indice](#indice)

---

# Lezione 1.3
# Come funziona un sistema di Intelligenza Artificiale moderno

## (Continua)

[⬆️ Torna all'Indice](#indice)

---

<a id="training"></a>

# 1.3.4 Training: il processo di apprendimento del modello

[⬆️ Torna all'Indice](#indice)

Il **training**, o addestramento, è la fase durante la quale un modello AI analizza i dati disponibili e modifica i propri parametri interni per migliorare le proprie prestazioni.

Durante questa fase il modello non riceve semplicemente informazioni da memorizzare, ma cerca di individuare schemi, relazioni e regolarità presenti nei dati.

---

# Il concetto di apprendimento

Un modello AI parte inizialmente da una configurazione casuale.

Durante l'addestramento:

```
Dati di esempio

        ↓

Modello con parametri iniziali

        ↓

Previsione

        ↓

Confronto con risultato corretto

        ↓

Correzione dei parametri

        ↓

Modello migliorato
```

Questo processo viene ripetuto milioni o miliardi di volte.

---

# Parametri e pesi

I modelli moderni contengono un numero enorme di parametri.

Un parametro rappresenta un valore numerico interno che influenza il comportamento del modello.

Esempio semplificato:

```
Input

"Il cielo è..."

        ↓

Parametri del modello

        ↓

Probabilità:

blu       90%
verde      5%
rosso      3%
altro      2%
```

Il modello aggiorna continuamente questi valori durante il training.

---

# Funzione di errore (Loss Function)

Per imparare, il modello deve sapere quanto è distante dalla risposta corretta.

Questo viene misurato attraverso una funzione chiamata:

**Loss Function**

Schema:

```
Previsione modello

        ↓

Confronto con valore corretto

        ↓

Calcolo errore

        ↓

Aggiornamento parametri
```

L'obiettivo del training è minimizzare progressivamente l'errore.

---

# Epoch

Durante l'addestramento il dataset viene generalmente analizzato più volte.

Un passaggio completo attraverso tutti i dati viene chiamato:

**Epoch**

Esempio:

```
Dataset completo

↓

Epoch 1

↓

Epoch 2

↓

Epoch 3

↓

...

↓

Modello finale
```

---

# Overfitting

Un problema importante del training è l'**overfitting**.

Si verifica quando un modello impara troppo bene gli esempi utilizzati durante l'addestramento, ma fallisce su dati nuovi.

Esempio:

Uno studente che memorizza tutte le risposte di un libro senza comprendere veramente l'argomento.

Il modello funziona sul dataset di training, ma non generalizza.

---

# Underfitting

Il problema opposto è l'**underfitting**.

Si verifica quando il modello è troppo semplice oppure non ha appreso abbastanza informazioni.

Risultato:

- prestazioni basse;
- errori frequenti;
- scarsa capacità predittiva.

---

<a id="validation-e-test-set"></a>

# 1.3.5 Training Set, Validation Set e Test Set

[⬆️ Torna all'Indice](#indice)

Per valutare correttamente un modello, i dati vengono generalmente divisi in tre gruppi.

```
Dataset totale

        ↓

-----------------------

Training Set

Validation Set

Test Set

-----------------------
```

---

# Training Set

È il gruppo principale utilizzato per insegnare al modello.

Serve per:

- modificare i parametri;
- apprendere pattern;
- migliorare le prestazioni.

---

# Validation Set

Viene utilizzato durante lo sviluppo per verificare:

- scelta degli algoritmi;
- configurazione del modello;
- presenza di overfitting.

Permette di ottimizzare il sistema senza utilizzare i dati finali di valutazione.

---

# Test Set

È il gruppo finale utilizzato per misurare le prestazioni reali.

Il modello non deve aver mai visto questi dati.

Solo così è possibile valutare la capacità di generalizzazione.

---

# Esempio pratico

Immaginiamo di sviluppare un sistema per riconoscere immagini di animali.

Dataset:

```
100.000 immagini

↓

70.000 Training

20.000 Validation

10.000 Test
```

Il modello apprende sulle 70.000 immagini.

Viene regolato sulle 20.000.

La valutazione finale viene fatta sulle 10.000 immagini mai viste.

---

<a id="inferenza"></a>

# 1.3.6 Inferenza: quando il modello viene utilizzato

[⬆️ Torna all'Indice](#indice)

Dopo la fase di training il modello può essere utilizzato per produrre nuovi risultati.

Questa fase viene chiamata:

**Inference**

o

**Inferenza**

---

# Training e Inferenza: differenza fondamentale

| Training | Inferenza |
|---|---|
| Il modello impara | Il modello utilizza ciò che ha imparato |
| Richiede molti dati | Può funzionare con un singolo input |
| Modifica i parametri | Usa parametri già definiti |
| Richiede grande potenza computazionale | Generalmente più veloce |

---

# Esempio con ChatGPT

Durante il training:

```
Miliardi di documenti

        ↓

Addestramento

        ↓

Modello linguistico
```

Durante l'utilizzo:

```
Domanda utente

        ↓

Modello GPT

        ↓

Risposta generata
```

---

# Il ciclo completo di vita di un sistema AI

Un sistema AI professionale non termina con il training.

Il ciclo completo comprende:

```
1. Definizione problema

        ↓

2. Raccolta dati

        ↓

3. Preparazione dati

        ↓

4. Training

        ↓

5. Validazione

        ↓

6. Test

        ↓

7. Deploy

        ↓

8. Monitoraggio

        ↓

9. Aggiornamento
```

---

# Best Practice

[⬆️ Torna all'Indice](#indice)

Per sviluppare sistemi AI affidabili è necessario seguire alcune buone pratiche.

---

## 1. Definire chiaramente il problema

Prima di costruire un modello bisogna capire:

- quale problema risolvere;
- quale risultato ottenere;
- quali limiti esistono.

---

## 2. Curare la qualità dei dati

Un modello complesso con dati scadenti produrrà risultati scadenti.

È necessario:

- verificare le fonti;
- eliminare errori;
- controllare bias.

---

## 3. Valutare sempre le prestazioni

Un sistema AI deve essere misurato attraverso:

- metriche;
- test;
- confronto con obiettivi reali.

---

## 4. Considerare sicurezza ed etica

Ogni sistema AI deve valutare:

- privacy;
- sicurezza;
- trasparenza;
- possibili effetti negativi.

---

[⬆️ Torna all'Indice](#indice)

---

# Errori comuni

[⬆️ Torna all'Indice](#indice)

## Errore 1

"Un modello AI conosce tutto."

❌ Errato.

Un modello conosce solo le informazioni apprese durante il training e può produrre errori.

---

## Errore 2

"Più grande significa sempre migliore."

❌ Errato.

Un modello più grande può richiedere più risorse e non essere sempre adatto allo scopo.

---

## Errore 3

"Il training è l'unica fase importante."

❌ Errato.

Anche:

- dati;
- valutazione;
- distribuzione;
- monitoraggio

sono fondamentali.

---

[⬆️ Torna all'Indice](#indice)

---

<a id="laboratorio"></a>

# Laboratorio 1
# Analizzare un sistema AI reale

[⬆️ Torna all'Indice](#indice)

## Obiettivo

Analizzare un sistema AI reale identificando:

- input;
- dati utilizzati;
- modello;
- output.

---

## Attività

Scegliere uno dei seguenti sistemi:

- chatbot AI;
- sistema di raccomandazione Netflix/YouTube;
- assistente vocale;
- traduttore automatico.

Compilare la tabella:

| Elemento | Descrizione |
|-|-|
| Input | |
| Dataset ipotizzato | |
| Tipo di AI | |
| Output prodotto | |
| Possibili errori | |

---

## Obiettivo didattico

Comprendere che ogni sistema AI segue una struttura composta da:

Input → Modello → Output

---

[⬆️ Torna all'Indice](#indice)

---

<a id="mini-project"></a>

# Mini Project Modulo 1

[⬆️ Torna all'Indice](#indice)

## Titolo

"Analizzare l'impatto dell'AI in un settore"

---

## Consegna

Scegliere un settore:

- scuola;
- medicina;
- industria;
- sicurezza;
- economia;
- comunicazione.

Realizzare una breve analisi contenente:

1. Problema attuale.
2. Possibile utilizzo dell'AI.
3. Benefici.
4. Rischi.
5. Considerazioni etiche.

---

# Quiz finale Modulo 1

[⬆️ Torna all'Indice](#indice)

## Domanda 1

AI, Machine Learning e Deep Learning sono:

A. Tecnologie completamente separate  
B. Livelli progressivi dello stesso ambito  
C. Sistemi hardware  
D. Linguaggi di programmazione

**Risposta: B**

---

## Domanda 2

Un sistema che riconosce immagini mediche è generalmente:

A. ANI  
B. AGI  
C. ASI  
D. Nessuno

**Risposta: A**

---

## Domanda 3

Il training serve a:

A. Utilizzare il modello finale  
B. Eliminare tutti i dati  
C. Apprendere dai dati e modificare i parametri  
D. Creare hardware

**Risposta: C**

---

## Domanda 4

La qualità dei dati influenza:

A. Solo la velocità  
B. Solo il costo  
C. La qualità dei risultati del modello  
D. Nulla

**Risposta: C**

---

<a id="glossario"></a>

# Glossario Modulo 1

[⬆️ Torna all'Indice](#indice)

| Termine | Definizione |
|-|-|
| AI | Campo dell'informatica che sviluppa sistemi intelligenti |
| Machine Learning | Metodo che permette ai sistemi di apprendere dai dati |
| Deep Learning | ML basato su reti neurali profonde |
| Dataset | Insieme organizzato di dati |
| Training | Processo di addestramento |
| Inferenza | Utilizzo del modello addestrato |
| Modello | Sistema matematico appreso dai dati |
| Parametro | Valore interno modificato durante il training |
| LLM | Large Language Model |
| Transformer | Architettura alla base dei moderni modelli linguistici |

---

[⬆️ Torna all'Indice](#indice)

---

<a id="riepilogo"></a>

# Riepilogo Modulo 1

[⬆️ Torna all'Indice](#indice)

In questo modulo abbiamo imparato che:

- l'AI è una disciplina informatica con oltre settant'anni di storia;
- AI, Machine Learning, Deep Learning e Generative AI sono concetti collegati ma differenti;
- gli attuali sistemi AI sono principalmente ANI;
- AGI e ASI rappresentano scenari futuri teorici;
- i dati sono il fondamento dei sistemi AI;
- un modello AI passa attraverso raccolta dati, training, valutazione e inferenza;
- la qualità dei risultati dipende dalla qualità del processo completo.

---

[⬆️ Torna all'Indice](#indice)

---

# Fine Modulo 1

## Prossimo modulo

# Modulo 2
# Prompt Engineering e Comunicazione con l'AI

Nel prossimo modulo verranno affrontati:

- funzionamento degli LLM;
- token;
- context window;
- progettazione dei prompt;
- tecniche Zero-Shot, One-Shot e Few-Shot.

---

[⬆️ Torna all'Indice](#indice)
