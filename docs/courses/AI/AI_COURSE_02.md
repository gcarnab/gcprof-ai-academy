# MODULO 2
# Prompt Engineering e Comunicazione Professionale con l'Intelligenza Artificiale
### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com
### Ottimizzata per Google Colab · Aggiornata al Luglio 2026

<a id="indice"></a>

# Indice Modulo 2

1. [Introduzione al Modulo](#introduzione-modulo)
2. [Come gli LLM interpretano il linguaggio umano](#llm-linguaggio)
3. [Token, Context Window ed Embedding](#token-context-embedding)
4. [Anatomia di un Prompt Professionale](#anatomia-prompt)
5. [Tecniche fondamentali di Prompt Engineering](#tecniche-base-prompting)
6. [Prompt Engineering avanzato](#prompt-engineering-avanzato)
7. [Utilizzo degli LLM per Coding e Data Analysis](#llm-coding-data-analysis)
8. [Laboratorio pratico](#laboratorio-pratico)
9. [Prompt Challenge](#prompt-challenge)
10. [Quiz finale](#quiz-finale)
11. [Glossario](#glossario)
12. [Riepilogo Modulo 2](#riepilogo-modulo2)

---

# Informazioni del Modulo

| Campo | Valore |
|-|-|
| Livello | Base |
| Modulo | M2 |
| Titolo | Prompt Engineering e Comunicazione Professionale con l'AI |
| Difficoltà | Base → Intermedio |
| Prerequisiti | Fondamenti di Intelligenza Artificiale |
| Durata stimata | 8-12 ore |
| Tipologia | Teoria + esercitazioni + laboratorio |

---

<a id="introduzione-modulo"></a>

# 1. Introduzione al Modulo

[⬆️ Torna all'Indice](#indice)

---

# Perché nasce il Prompt Engineering

L'evoluzione dell'Intelligenza Artificiale Generativa ha modificato profondamente il rapporto tra uomo e macchina.

Per decenni l'interazione con il computer è stata basata su istruzioni rigide:

- comandi;
- menu;
- interfacce grafiche;
- linguaggi di programmazione.

Il modello tradizionale era:

```
Utente

↓

Comando preciso

↓

Software

↓

Risultato
```

Con i moderni Large Language Models (LLM) nasce un nuovo paradigma:

```
Utente

↓

Linguaggio naturale

↓

Modello AI

↓

Risultato generato
```

Il linguaggio umano diventa una nuova interfaccia per comunicare con il software.

---

# Obiettivi del Modulo

Al termine del Modulo 2 lo studente sarà in grado di:

- comprendere il funzionamento generale degli LLM;
- capire come una AI interpreta una richiesta;
- progettare prompt professionali;
- migliorare la qualità delle risposte generate;
- utilizzare tecniche di prompting progressivo;
- applicare l'AI in contesti scolastici, tecnici e professionali.

---

# Definizione di Prompt

Un **prompt** è un insieme di istruzioni fornite a un modello di Intelligenza Artificiale per ottenere un determinato risultato.

Un prompt può contenere:

- una domanda;
- una richiesta operativa;
- un contesto;
- un ruolo;
- vincoli;
- esempi;
- formato di output.

---

# Dal Prompt semplice al Prompt professionale

## Prompt semplice

Esempio:

```text
Spiegami Python.
```

Il modello può rispondere, ma deve decidere autonomamente:

- livello tecnico;
- quantità di informazioni;
- struttura;
- destinatario.

---

## Prompt professionale

Esempio:

```text
Agisci come un docente di Informatica.

Spiega il linguaggio Python a studenti del secondo anno delle scuole superiori.

Obiettivo:
comprendere variabili, condizioni e cicli.

Utilizza:
- spiegazione teorica;
- esempi pratici;
- codice commentato;
- tabella finale riepilogativa.

Livello:
principiante.
```

---

# Gli elementi di un prompt efficace

| Elemento | Funzione |
|-|-|
| Ruolo | Definisce il comportamento dell'AI |
| Contesto | Fornisce informazioni necessarie |
| Obiettivo | Specifica il risultato desiderato |
| Vincoli | Definisce limiti e condizioni |
| Formato | Stabilisce come presentare l'output |

---

# Il Prompt come nuova forma di programmazione

Il Prompt Engineering può essere considerato una forma di programmazione attraverso il linguaggio naturale.

Programmazione tradizionale:

```
Programmatore

↓

Codice

↓

Computer

↓

Risultato
```

Prompt Engineering:

```
Utente

↓

Istruzione naturale

↓

Modello AI

↓

Risultato
```

---

# Confronto tra codice e prompt

| Programmazione tradizionale | Prompt Engineering |
|-|-|
| Linguaggio formale | Linguaggio naturale |
| Sintassi rigida | Struttura comunicativa |
| Algoritmo definito | Obiettivo dichiarato |
| Output deterministico | Output probabilistico |
| Debug del codice | Miglioramento del prompt |

---

# Il nuovo ruolo dell'utilizzatore AI

L'utente moderno non è più soltanto un utilizzatore di software.

Diventa un:

## AI Problem Solver

che deve essere capace di:

1. definire il problema;
2. descrivere l'obiettivo;
3. fornire informazioni corrette;
4. guidare il modello;
5. valutare criticamente il risultato.

---

# Prompt Engineering e Pensiero Critico

Il Prompt Engineering migliora la qualità della comunicazione con l'AI, ma non elimina la necessità di controllo umano.

Un buon prompt non garantisce automaticamente:

- verità;
- correttezza;
- completezza.

L'utente deve sempre verificare:

- fonti;
- dati;
- risultati;
- conclusioni.

---

# Errori comuni nei prompt

## Errore 1: Prompt troppo generico

Esempio:

```text
Parlami dell'intelligenza artificiale.
```

Problemi:

- manca il destinatario;
- manca il livello;
- manca lo scopo.

---

## Errore 2: Mancanza di contesto

Esempio:

```text
Scrivi un programma.
```

Informazioni mancanti:

- linguaggio;
- ambiente;
- funzionalità;
- vincoli.

---

## Errore 3: Nessun formato richiesto

Esempio:

```text
Analizza questi dati.
```

Versione migliorata:

```text
Analizza questi dati.

Restituisci:
- tabella riepilogativa;
- principali risultati;
- conclusioni operative.
```

---

# Attività di riflessione

Prova a trasformare il seguente prompt:

```text
Spiegami l'AI.
```

in un prompt professionale indicando:

- ruolo;
- destinatario;
- obiettivo;
- formato.

---

# Verifica rapida

## Domanda 1

Un prompt è:

A. Un programma compilato  
B. Una richiesta strutturata verso un modello AI  
C. Un database  
D. Un componente hardware  

**Risposta corretta: B**

---

## Domanda 2

Quale elemento rende più efficace un prompt?

A. Eliminare il contesto  
B. Specificare obiettivo e vincoli  
C. Scrivere meno informazioni possibile  
D. Utilizzare solo parole tecniche  

**Risposta corretta: B**

---

## Domanda 3

Il Prompt Engineering serve principalmente a:

A. Creare computer più potenti  
B. Migliorare la comunicazione con sistemi AI  
C. Sostituire completamente i programmatori  
D. Eliminare la necessità di verifica umana  

**Risposta corretta: B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="llm-linguaggio"></a>

# 2. Come gli LLM interpretano il linguaggio umano

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

I moderni sistemi di Intelligenza Artificiale Generativa sono basati principalmente su una tecnologia chiamata:

# Large Language Model (LLM)

Un LLM è un modello di Intelligenza Artificiale progettato per comprendere e generare testo attraverso l'analisi di enormi quantità di dati linguistici.

Esempi di applicazioni basate su LLM:

- chatbot conversazionali;
- assistenti virtuali;
- sistemi di traduzione;
- generazione automatica di contenuti;
- supporto alla programmazione.

---

# 2.1 Che cosa sono i Large Language Models

<a id="large-language-model"></a>

[⬆️ Torna all'Indice](#indice)

Un **Large Language Model** è un modello matematico che apprende le caratteristiche del linguaggio attraverso l'analisi di grandi quantità di testo.

Durante il processo di addestramento il modello analizza:

- libri;
- articoli;
- documentazione;
- codice sorgente;
- conversazioni;
- contenuti disponibili nei dataset utilizzati.

L'obiettivo non è memorizzare semplicemente frasi, ma imparare:

- strutture linguistiche;
- relazioni tra parole;
- schemi concettuali;
- regolarità statistiche.

---

# Un LLM non "legge" come un essere umano

Un errore comune è immaginare un modello AI come una persona che legge e comprende un testo.

In realtà il funzionamento è differente.

Un essere umano:

```
Testo

↓

Comprensione del significato

↓

Pensiero

↓

Risposta
```

Un LLM:

```
Testo

↓

Conversione numerica

↓

Elaborazione matematica

↓

Generazione del risultato
```

---

# 2.2 Dal linguaggio ai numeri

<a id="linguaggio-numeri"></a>

[⬆️ Torna all'Indice](#indice)

I computer non elaborano direttamente parole o frasi.

Per questo motivo il linguaggio viene trasformato in rappresentazioni numeriche.

Il processo generale è:

```
Testo

↓

Tokenizzazione

↓

Token numerici

↓

Elaborazione del modello

↓

Output generato
```

---

# 2.3 Il concetto di Token

<a id="token"></a>

[⬆️ Torna all'Indice](#indice)

Un **token** è una piccola unità di testo utilizzata dal modello per elaborare il linguaggio.

Un token può corrispondere a:

- una parola;
- una parte di parola;
- un carattere speciale;
- un simbolo.

Esempio semplificato:

Frase:

```
L'intelligenza artificiale è potente
```

Può essere suddivisa in:

```
[L'] [intelligenza] [artificiale] [è] [potente]
```

oppure in unità più piccole.

La suddivisione reale dipende dal sistema di tokenizzazione utilizzato.

---

# Perché utilizzare i token?

I token permettono di trasformare il linguaggio umano in dati elaborabili matematicamente.

Il modello non lavora direttamente con:

```
"Buongiorno come stai?"
```

ma con una rappresentazione numerica simile a:

```
[15482, 8932, 241]
```

---

# 2.4 Il principio della previsione del token successivo

<a id="next-token"></a>

[⬆️ Torna all'Indice](#indice)

Il funzionamento fondamentale di molti LLM può essere descritto come:

> Prevedere quale token è più probabile dopo una sequenza di token precedenti.

Esempio:

Input:

```
Il cielo è
```

Il modello calcola probabilità:

| Token candidato | Probabilità |
|-|-|
| blu | Alta |
| verde | Bassa |
| rosso | Bassa |
| quadrato | Molto bassa |

Il modello sceglie il risultato più probabile considerando:

- contesto;
- dati appresi;
- parametri interni.

---

# Generazione passo dopo passo

La risposta viene costruita progressivamente.

Esempio:

Input:

```
La capitale d'Italia è
```

Il modello produce:

```
Roma
```

Poi continua analizzando il nuovo contesto:

```
La capitale d'Italia è Roma e...
```

e genera il token successivo.

Questo processo viene ripetuto moltissime volte.

---

# 2.5 Perché gli LLM sembrano comprendere?

<a id="comprensione-llm"></a>

[⬆️ Torna all'Indice](#indice)

Gli LLM possono produrre risposte molto simili al ragionamento umano.

Questo accade perché durante l'addestramento apprendono:

- relazioni linguistiche;
- strutture sintattiche;
- associazioni concettuali;
- schemi ricorrenti.

Tuttavia è importante distinguere:

## Simulazione della comprensione

da

## Comprensione umana reale

---

# Comprensione umana

Un essere umano possiede:

- esperienza personale;
- emozioni;
- memoria autobiografica;
- intenzioni;
- coscienza.

---

# Modello linguistico

Un LLM possiede:

- parametri matematici;
- rappresentazioni statistiche;
- capacità predittive.

---

# 2.6 Il ruolo del contesto

<a id="ruolo-contesto"></a>

[⬆️ Torna all'Indice](#indice)

Un elemento fondamentale nella comunicazione con gli LLM è il contesto.

La stessa frase può avere significati diversi.

Esempio:

```
Spiegami Java.
```

Può significare:

- linguaggio di programmazione Java;
- isola di Java;
- caffè Java.

Aggiungendo contesto:

```
Spiegami Java come linguaggio di programmazione
per studenti del terzo anno.
```

il modello riceve informazioni più precise.

---

# Il principio fondamentale del Prompt Engineering

Più informazioni rilevanti vengono fornite al modello, maggiore sarà la probabilità di ottenere una risposta utile.

Schema:

```
Prompt generico

↓

Molte interpretazioni possibili

↓

Risposta generica
```

mentre:

```
Prompt strutturato

↓

Meno ambiguità

↓

Risposta più precisa
```

---

# 2.7 Limiti degli LLM

<a id="limiti-llm"></a>

[⬆️ Torna all'Indice](#indice)

Nonostante le loro capacità, gli LLM presentano alcuni limiti.

---

## Mancanza di conoscenza reale

Un modello non possiede esperienza diretta del mondo.

---

## Possibili allucinazioni

Può generare informazioni:

- inesatte;
- inventate;
- non verificabili.

---

## Dipendenza dai dati

La qualità del modello dipende dai dati utilizzati durante l'addestramento.

---

## Mancanza di intenzionalità

Un LLM non possiede:

- obiettivi personali;
- volontà;
- coscienza.

---

# Applicazione pratica

<a id="esercizio-llm"></a>

[⬆️ Torna all'Indice](#indice)

Confronta questi due prompt:

## Prompt A

```text
Spiegami la blockchain.
```

---

## Prompt B

```text
Agisci come un docente universitario.

Spiega la blockchain a studenti
del quarto anno di scuola superiore.

Utilizza:
- definizione iniziale;
- esempio pratico;
- schema del funzionamento;
- vantaggi e limiti.
```

Rispondi:

1. Quale prompt produrrà probabilmente una risposta migliore?
2. Quali elementi rendono il secondo prompt più efficace?

---

# Sintesi della Parte 2

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato che:

- gli LLM sono modelli matematici che elaborano linguaggio;
- il testo viene trasformato in token;
- il modello genera risposte prevedendo sequenze successive;
- gli LLM non comprendono il linguaggio come gli esseri umani;
- il contesto è fondamentale per ottenere risultati migliori;
- un buon prompt riduce l'ambiguità della richiesta.

---

# Verifica rapida

## Domanda 1

Un token è:

A. Un computer dedicato all'AI  
B. Un'unità utilizzata dal modello per rappresentare testo  
C. Un algoritmo di sicurezza  
D. Un database

**Risposta corretta: B**

---

## Domanda 2

Molti LLM generano testo principalmente attraverso:

A. Copia di frasi memorizzate  
B. Previsione del token successivo  
C. Ricerca casuale su Internet  
D. Regole scritte manualmente

**Risposta corretta: B**

---

## Domanda 3

Perché il contesto è importante?

A. Per aumentare la velocità del computer  
B. Per ridurre l'ambiguità della richiesta  
C. Per eliminare tutti gli errori  
D. Per sostituire il modello AI

**Risposta corretta: B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="token-context-embedding"></a>

# 3. Token, Context Window ed Embedding

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Nel funzionamento degli LLM tre concetti sono fondamentali per comprendere come l'Intelligenza Artificiale elabora il linguaggio:

- **Token**
- **Context Window**
- **Embedding**

Questi elementi rappresentano il collegamento tra:

```
Linguaggio umano

↓

Rappresentazione matematica

↓

Elaborazione del modello AI

↓

Risposta generata
```

Comprendere questi concetti permette di utilizzare gli strumenti AI in modo più efficace e consapevole.

---

<a id="tokenizzazione"></a>

# 3.1 Tokenizzazione: trasformare il linguaggio in dati

[⬆️ Torna all'Indice](#indice)

I computer non elaborano direttamente parole e frasi.

Prima che un testo venga analizzato da un LLM deve essere convertito in una sequenza di elementi numerici chiamati:

# Token

La procedura che realizza questa trasformazione viene chiamata:

# Tokenizzazione

---

# Esempio semplificato

Frase:

```text
L'intelligenza artificiale è rivoluzionaria
```

Può essere suddivisa in:

```
[L'intelligenza]

[artificiale]

[è]

[rivoluzionaria]
```

Ogni elemento viene associato a un identificativo numerico.

Esempio:

```
L'intelligenza → 15284

artificiale → 8921

è → 421

rivoluzionaria → 7623
```

Il modello lavora quindi con numeri e non direttamente con parole.

---

# Perché non utilizzare direttamente le parole?

Le parole del linguaggio umano sono:

- ambigue;
- variabili;
- dipendenti dal contesto.

Una rappresentazione numerica permette al modello di:

- calcolare relazioni;
- confrontare sequenze;
- individuare schemi.

---

# Token e lunghezza del testo

Ogni modello AI possiede un limite massimo di token elaborabili.

Esempio:

Un documento molto lungo può superare la capacità del modello.

Schema:

```
Testo breve

↓

Elaborazione completa

```

mentre:

```
Documento enorme

↓

Superamento limite token

↓

Perdita di informazioni
```

---

<a id="token-vs-parole"></a>

# 3.2 Differenza tra token e parole

[⬆️ Torna all'Indice](#indice)

Un errore frequente è pensare:

> 1 token = 1 parola

Non è sempre vero.

Un token può essere:

- una parola intera;
- una parte di parola;
- un simbolo;
- un carattere.

---

# Esempio

Parola semplice:

```
casa
```

potrebbe essere:

```
[casa]
```

Parola complessa:

```
internazionalizzazione
```

potrebbe diventare:

```
[inter]

[nazional]

[izzazione]
```

---

# Perché usare sottoparti delle parole?

Perché permette al modello di gestire:

- parole nuove;
- termini tecnici;
- lingue diverse;
- variazioni linguistiche.

---

<a id="context-window"></a>

# 3.3 Context Window: la memoria temporanea del modello

[⬆️ Torna all'Indice](#indice)

La **Context Window** rappresenta la quantità massima di informazioni che un modello può considerare contemporaneamente durante una conversazione.

Può essere vista come:

> La memoria di lavoro temporanea dell'AI.

---

# Esempio pratico

Immaginiamo una conversazione:

```
Messaggio 1

↓

Messaggio 2

↓

Messaggio 3

↓

Domanda finale
```

Il modello utilizza il contesto precedente per formulare la risposta.

---

# Limite della Context Window

Se una conversazione supera il limite massimo:

```
Vecchie informazioni

↓

Possono essere eliminate

↓

Il modello perde parte del contesto
```

---

# Importanza nel Prompt Engineering

La Context Window influenza:

- quantità di informazioni inseribili;
- lunghezza dei documenti analizzabili;
- complessità delle attività;
- gestione di progetti lunghi.

---

# Esempio

Prompt:

```text
Analizza questo documento di 500 pagine
e produci un riassunto completo.
```

Possibili problemi:

- documento troppo grande;
- superamento limite token;
- perdita di informazioni.

Strategia migliore:

```
Documento

↓

Analisi per sezioni

↓

Sintesi progressiva

↓

Risultato finale
```

---

<a id="embedding"></a>

# 3.4 Embedding: rappresentare il significato

[⬆️ Torna all'Indice](#indice)

Gli embedding sono una delle tecnologie più importanti degli LLM.

Un embedding è una rappresentazione numerica del significato di una parola, frase o documento.

---

# Dal testo al vettore

Una parola può essere trasformata in una sequenza numerica:

Esempio:

```
"gatto"

↓

[0.21, 0.54, -0.13, 0.87]
```

Questa sequenza è chiamata:

# Vettore

---

# Spazio semantico

Gli embedding permettono di rappresentare le relazioni tra concetti.

Esempio:

```
gatto

        vicino a

animale
```

mentre:

```
gatto

        lontano da

automobile
```

---

# Esempio concettuale

In uno spazio matematico:

```
        cane

          *

       *

gatto           animale

          *

       *

        lupo
```

Parole con significato simile tendono ad avere posizioni vicine.

---

# Perché gli embedding sono importanti?

Permettono funzionalità come:

- ricerca semantica;
- sistemi RAG;
- classificazione automatica;
- raccomandazioni;
- confronto tra documenti.

---

<a id="ricerca-semantica"></a>

# 3.5 Ricerca semantica

[⬆️ Torna all'Indice](#indice)

La ricerca tradizionale utilizza principalmente parole chiave.

Esempio:

Ricerca:

```text
auto elettrica
```

cerca documenti contenenti quelle parole.

---

La ricerca semantica cerca invece il significato.

Esempio:

Domanda:

```text
Come funziona un veicolo senza carburante?
```

Può trovare:

```
Auto elettrica

Macchina a batteria

Mobilità sostenibile
```

anche se le parole esatte non coincidono.

---

# Applicazione: sistemi RAG

Gli embedding sono alla base dei sistemi:

# Retrieval Augmented Generation

(RAG)

Un sistema RAG funziona così:

```
Domanda utente

↓

Ricerca documenti rilevanti

↓

Recupero informazioni

↓

LLM

↓

Risposta contestualizzata
```

---

# 3.6 Relazione tra Token, Context Window ed Embedding

[⬆️ Torna all'Indice](#indice)

I tre concetti lavorano insieme.

Schema completo:

```
Testo umano

↓

Tokenizzazione

↓

Token numerici

↓

Embedding

↓

Modello AI

↓

Output generato
```

---

# Tabella riepilogativa

| Concetto | Funzione |
|-|-|
| Token | Divide il testo in unità elaborabili |
| Context Window | Determina quante informazioni il modello può considerare |
| Embedding | Rappresenta il significato matematico del testo |

---

# Attività pratica

[⬆️ Torna all'Indice](#indice)

Analizza il seguente prompt:

```text
Spiegami la rete.
```

Individua:

1. Possibili significati diversi.
2. Quale contesto manca.
3. Come migliorare il prompt.

Esempio:

```text
Spiegami una rete informatica LAN
a studenti del quarto anno
di un istituto tecnico informatico.
```

---

# Sintesi della Parte 3

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato che:

- gli LLM trasformano il linguaggio in token;
- i token sono unità matematiche elaborate dal modello;
- la Context Window determina la quantità di informazioni utilizzabili;
- gli embedding rappresentano il significato attraverso vettori;
- la ricerca semantica permette di trovare informazioni anche senza corrispondenza esatta delle parole.

---

# Verifica rapida

## Domanda 1

Un token è:

A. Una scheda video  
B. Una unità di elaborazione del testo  
C. Un database  
D. Un algoritmo

**Risposta corretta: B**

---

## Domanda 2

La Context Window rappresenta:

A. La memoria RAM del computer  
B. La quantità di contesto che il modello può elaborare  
C. La velocità della GPU  
D. Il numero di utenti

**Risposta corretta: B**

---

## Domanda 3

Gli embedding servono a:

A. Spegnere il modello AI  
B. Rappresentare matematicamente il significato  
C. Creare immagini hardware  
D. Eliminare i dati

**Risposta corretta: B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="anatomia-prompt"></a>

# 4. Anatomia di un Prompt Professionale

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Un prompt professionale non è una semplice domanda rivolta all'AI.

È una vera e propria **specifica di progetto** che guida il modello verso un risultato desiderato.

Un prompt efficace permette di controllare:

- il comportamento dell'AI;
- il livello di approfondimento;
- lo stile della risposta;
- il formato dell'output;
- i criteri di qualità.

---

# La struttura di un Prompt Professionale

Un prompt completo può essere costruito utilizzando cinque elementi fondamentali:

```
RUOLO

↓

CONTESTO

↓

OBIETTIVO

↓

VINCOLI

↓

FORMATO OUTPUT
```

Questi elementi costituiscono la base del Prompt Engineering professionale.

---

<a id="ruolo"></a>

# 4.1 Il Ruolo (Role)

[⬆️ Torna all'Indice](#indice)

Il primo elemento di un prompt professionale è definire il ruolo che il modello deve assumere.

Esempio:

```text
Agisci come un docente universitario di Informatica.
```

oppure:

```text
Agisci come un esperto di cybersecurity.
```

---

# Perché definire un ruolo?

Senza un ruolo specifico il modello deve scegliere autonomamente:

- livello tecnico;
- stile comunicativo;
- prospettiva;
- profondità dell'analisi.

Il ruolo riduce l'ambiguità.

---

# Esempio confronto

## Prompt senza ruolo

```text
Spiega le reti neurali.
```

Possibile risposta:

- troppo semplice;
- troppo tecnica;
- non adatta al destinatario.

---

## Prompt con ruolo

```text
Agisci come un docente di Intelligenza Artificiale.

Spiega le reti neurali
a studenti del quinto anno
di un istituto tecnico.
```

Risultato:

- livello più adeguato;
- linguaggio più coerente;
- maggiore efficacia didattica.

---

<a id="contesto"></a>

# 4.2 Il Contesto (Context)

[⬆️ Torna all'Indice](#indice)

Il contesto fornisce al modello le informazioni necessarie per comprendere la situazione.

Un AI senza contesto deve fare supposizioni.

---

# Esempio

Prompt:

```text
Scrivi una relazione.
```

Informazioni mancanti:

- argomento;
- destinatario;
- lunghezza;
- stile;
- obiettivo.

---

Prompt migliorato:

```text
Scrivi una relazione tecnica
sulla sicurezza informatica.

Destinatari:
studenti del quarto anno.

Lunghezza:
circa 1000 parole.

Stile:
didattico.
```

---

# Tipologie di contesto

Il contesto può includere:

| Tipo | Esempio |
|-|-|
| Utente | Studente, docente, professionista |
| Ambiente | Scuola, azienda, laboratorio |
| Obiettivo | Imparare, analizzare, creare |
| Vincoli | Tempo, formato, strumenti disponibili |
| Conoscenze iniziali | Principiante, esperto |

---

<a id="obiettivo"></a>

# 4.3 L'Obiettivo (Task)

[⬆️ Torna all'Indice](#indice)

L'obiettivo definisce chiaramente cosa deve produrre il modello.

Un errore comune è fornire solo un argomento senza indicare l'attività.

---

# Esempio

Richiesta debole:

```text
Machine Learning.
```

Non specifica:

- cosa fare;
- quale risultato ottenere.

---

Richiesta efficace:

```text
Spiega i concetti fondamentali del Machine Learning.

Obiettivo:
preparare una lezione introduttiva
per studenti principianti.
```

---

# Verbi utili nei prompt

Utilizzare verbi precisi migliora il risultato.

Esempi:

- spiega;
- confronta;
- analizza;
- riassumi;
- genera;
- correggi;
- traduci;
- ottimizza;
- progetta;
- valuta.

---

<a id="vincoli"></a>

# 4.4 I Vincoli (Constraints)

[⬆️ Torna all'Indice](#indice)

I vincoli indicano al modello quali condizioni rispettare.

Sono fondamentali per ottenere risposte controllate.

---

# Esempi di vincoli

## Lunghezza

```text
Massimo 500 parole.
```

---

## Stile

```text
Utilizza uno stile professionale.
```

---

## Pubblico

```text
Scrivi per studenti delle scuole superiori.
```

---

## Tecnologia

```text
Utilizza Python 3.12.
```

---

## Formato

```text
Restituisci il risultato in formato Markdown.
```

---

<a id="formato-output"></a>

# 4.5 Il Formato dell'Output

[⬆️ Torna all'Indice](#indice)

Un elemento spesso sottovalutato è specificare il formato della risposta.

L'AI può produrre:

- testo;
- tabelle;
- codice;
- JSON;
- liste;
- schemi;
- procedure.

---

# Esempio

Prompt:

```text
Spiega il protocollo TCP/IP.
```

Output possibile:

```
Testo descrittivo
```

---

Prompt migliorato:

```text
Spiega il protocollo TCP/IP.

Formato richiesto:

1. Introduzione.
2. Tabella dei livelli.
3. Esempio pratico.
4. Riepilogo finale.
```

Output:

```
Struttura organizzata
```

---

# 4.6 Il Prompt Framework Professionale

<a id="framework"></a>

[⬆️ Torna all'Indice](#indice)

Un modello molto utilizzato per costruire prompt professionali è:

# RCTFO

```
R → Role      (Ruolo)

C → Context   (Contesto)

T → Task      (Obiettivo)

F → Format    (Formato)

O → Output    (Risultato atteso)
```

---

# Esempio completo RCTFO

```text
RUOLO:
Agisci come un docente di Informatica.

CONTESTO:
Devi preparare materiale per studenti
del terzo anno.

TASK:
Spiega il funzionamento dei database relazionali.

VINCOLI:
Utilizza linguaggio semplice,
inserisci esempi pratici.

FORMATO OUTPUT:
Markdown con:
- titoli;
- tabelle;
- codice SQL;
- riepilogo finale.
```

---

# Dal Prompt Base al Prompt Professionale

<a id="trasformazione"></a>

[⬆️ Torna all'Indice](#indice)

## Versione iniziale

```text
Spiegami Python.
```

---

## Miglioramento 1: aggiunta ruolo

```text
Agisci come un docente di Python.
```

---

## Miglioramento 2: aggiunta contesto

```text
Agisci come un docente di Python
per studenti principianti.
```

---

## Miglioramento 3: aggiunta obiettivo

```text
Spiega Python per permettere
agli studenti di creare i primi programmi.
```

---

## Miglioramento 4: aggiunta formato

```text
Fornisci:
- spiegazione teorica;
- esempi;
- esercizi;
- soluzione commentata.
```

---

# Errori frequenti nella progettazione dei prompt

<a id="errori-prompt"></a>

[⬆️ Torna all'Indice](#indice)

## Errore 1

Richiesta troppo breve:

```text
Fammi un progetto.
```

Problema:

Il modello non conosce:

- tipo di progetto;
- destinatario;
- strumenti;
- obiettivi.

---

## Errore 2

Troppe richieste confuse:

```text
Spiegami AI, crea un sito,
scrivi codice, fai un corso
e prepara un quiz.
```

Problema:

Manca una struttura gerarchica.

---

## Errore 3

Nessuna verifica:

Un buon prompt deve prevedere:

```text
Controlla eventuali errori
prima della risposta finale.
```

---

# Esercitazione pratica

<a id="esercizio-prompt"></a>

[⬆️ Torna all'Indice](#indice)

Trasforma questo prompt:

```text
Fammi una presentazione sull'AI.
```

in un prompt professionale inserendo:

- ruolo;
- contesto;
- obiettivo;
- vincoli;
- formato.

---

# Sintesi della Parte 4

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato che:

- un prompt professionale è strutturato;
- il ruolo guida il comportamento dell'AI;
- il contesto riduce l'ambiguità;
- l'obiettivo definisce il risultato;
- i vincoli controllano la risposta;
- il formato determina la presentazione finale.

---

# Verifica rapida

## Domanda 1

Quale elemento definisce il comportamento dell'AI?

A. Token  
B. Ruolo  
C. Database  
D. Hardware  

**Risposta corretta: B**

---

## Domanda 2

I vincoli servono a:

A. Limitare e controllare il risultato  
B. Eliminare il modello  
C. Aumentare la memoria RAM  
D. Creare nuovi dati

**Risposta corretta: A**

---

## Domanda 3

Un formato di output permette di:

A. Stabilire come deve essere presentata la risposta  
B. Cambiare il modello AI  
C. Aumentare la velocità Internet  
D. Modificare la GPU

**Risposta corretta: A**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="tecniche-base-prompting"></a>

# 5. Tecniche fondamentali di Prompt Engineering

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Dopo aver analizzato la struttura di un prompt professionale, è necessario comprendere le principali tecniche utilizzate per migliorare la qualità delle risposte generate dagli LLM.

Le strategie fondamentali sono:

- Zero-Shot Prompting;
- One-Shot Prompting;
- Few-Shot Prompting;
- Role Prompting;
- Instruction Prompting;
- Structured Output Prompting.

Queste tecniche permettono di passare da una comunicazione generica a una comunicazione controllata.

---

<a id="zero-shot"></a>

# 5.1 Zero-Shot Prompting

[⬆️ Torna all'Indice](#indice)

Il **Zero-Shot Prompting** consiste nel fornire una richiesta senza esempi precedenti.

Il modello deve risolvere il problema utilizzando solamente:

- le istruzioni ricevute;
- le conoscenze acquisite durante l'addestramento.

---

# Struttura

Schema:

```
Istruzione

↓

Modello AI

↓

Risultato
```

---

# Esempio

Prompt:

```text
Classifica il seguente testo come positivo o negativo:

"Il prodotto è arrivato velocemente
ed è molto soddisfacente."
```

Output atteso:

```text
Positivo
```

---

# Vantaggi dello Zero-Shot

| Vantaggio | Descrizione |
|-|-|
| Semplicità | Non richiede esempi |
| Velocità | Prompt più brevi |
| Flessibilità | Utilizzabile in molti contesti |

---

# Limiti

Lo Zero-Shot può essere meno efficace quando:

- il compito è complesso;
- il formato richiesto è particolare;
- servono criteri specifici.

---

# Esempio problematico

Prompt:

```text
Analizza questo documento.
```

Problemi:

- quale tipo di analisi?
- quale formato?
- quali aspetti considerare?

---

<a id="one-shot"></a>

# 5.2 One-Shot Prompting

[⬆️ Torna all'Indice](#indice)

Il **One-Shot Prompting** consiste nel fornire un singolo esempio che mostra al modello il comportamento desiderato.

Schema:

```
Istruzione

↓

Esempio

↓

Nuovo caso

↓

Risposta
```

---

# Esempio

Prompt:

```text
Classifica le recensioni.

Esempio:

Testo:
"Servizio eccellente e personale disponibile."

Classificazione:
Positiva


Ora analizza:

"Il prodotto funziona ma la consegna è stata lenta."
```

Output:

```text
Leggermente negativa
```

---

# Perché funziona?

L'esempio fornisce al modello:

- stile;
- struttura;
- criterio decisionale.

---

# Applicazioni

Il One-Shot è utile per:

- classificazioni;
- formattazione dati;
- trasformazioni testuali;
- generazione di contenuti coerenti.

---

<a id="few-shot"></a>

# 5.3 Few-Shot Prompting

[⬆️ Torna all'Indice](#indice)

Il **Few-Shot Prompting** utilizza più esempi per guidare il comportamento del modello.

È una delle tecniche più importanti nella progettazione professionale dei prompt.

---

# Struttura

```
Istruzione

↓

Esempio 1

↓

Esempio 2

↓

Esempio 3

↓

Nuovo problema

↓

Risposta
```

---

# Esempio

```text
Classifica il tipo di richiesta.


Esempio 1:

Richiesta:
"Non riesco ad accedere al mio account."

Categoria:
Problema tecnico


Esempio 2:

Richiesta:
"Vorrei modificare il mio piano."

Categoria:
Informazioni commerciali


Ora analizza:

"Come posso recuperare la password?"
```

Risultato:

```text
Problema tecnico
```

---

# Quando usare Few-Shot

È particolarmente utile quando:

- il formato è complesso;
- serve coerenza;
- esistono regole personalizzate.

---

# Applicazioni professionali

Esempi:

## Analisi documentale

```
Documento

↓

Classificazione automatica
```

---

## Supporto clienti

```
Messaggio cliente

↓

Categoria richiesta
```

---

## Data Processing

```
Testo grezzo

↓

Formato strutturato
```

---

<a id="confronto-shot"></a>

# 5.4 Confronto tra Zero-Shot, One-Shot e Few-Shot

[⬆️ Torna all'Indice](#indice)

| Tecnica | Numero esempi | Complessità | Precisione |
|-|-|-|-|
| Zero-Shot | Nessuno | Bassa | Media |
| One-Shot | Uno | Media | Buona |
| Few-Shot | Molti | Alta | Elevata |

---

# Regola pratica

Utilizzare:

```
Zero-Shot

↓

quando il compito è semplice
```

```
One-Shot

↓

quando serve un modello di risposta
```

```
Few-Shot

↓

quando servono precisione e coerenza
```

---

<a id="role-prompting"></a>

# 5.5 Role Prompting

[⬆️ Torna all'Indice](#indice)

Il **Role Prompting** consiste nell'assegnare un ruolo specifico al modello.

È una tecnica fondamentale vista anche nell'anatomia del prompt.

---

# Esempio

Prompt:

```text
Agisci come un esperto di reti informatiche.

Spiega il protocollo TCP.
```

---

# Possibili ruoli

| Ruolo | Utilizzo |
|-|-|
| Docente | Spiegazioni didattiche |
| Programmatore | Generazione codice |
| Analista | Studio dati |
| Revisore | Correzione contenuti |
| Consulente | Analisi strategiche |

---

<a id="instruction-prompting"></a>

# 5.6 Instruction Prompting

[⬆️ Torna all'Indice](#indice)

L'Instruction Prompting consiste nel fornire istruzioni precise sulle operazioni da eseguire.

---

# Prompt debole

```text
Analizza questo testo.
```

---

# Prompt con istruzioni

```text
Analizza questo testo.

Esegui:

1. Riassunto iniziale.
2. Individuazione dei concetti principali.
3. Elenco dei punti critici.
4. Conclusioni finali.
```

---

# Vantaggi

Permette di ottenere:

- risposte organizzate;
- risultati ripetibili;
- maggiore controllo.

---

<a id="structured-output"></a>

# 5.7 Structured Output Prompting

[⬆️ Torna all'Indice](#indice)

Questa tecnica consiste nel richiedere un formato preciso per la risposta.

Formati comuni:

- Markdown;
- JSON;
- Tabelle;
- Liste;
- CSV.

---

# Esempio JSON

Prompt:

```text
Analizza questo prodotto.

Restituisci il risultato in formato JSON:

{
 nome:
 categoria:
 vantaggi:
 svantaggi:
}
```

---

# Perché è importante?

Gli output strutturati possono essere utilizzati direttamente da:

- software;
- database;
- API;
- applicazioni web.

---

# Applicazione nella programmazione

Esempio:

```
Utente

↓

Prompt

↓

LLM

↓

JSON

↓

Applicazione
```

---

# 5.8 Combinare più tecniche

<a id="combinazione-tecniche"></a>

[⬆️ Torna all'Indice](#indice)

I migliori risultati si ottengono combinando diverse strategie.

---

# Esempio avanzato

```text
RUOLO:

Agisci come un docente Python.


CONTESTO:

Devi preparare una lezione
per studenti principianti.


ESEMPI:

Utilizza il seguente stile...


TASK:

Spiega le funzioni Python.


OUTPUT:

Restituisci:

- teoria;
- esempi;
- esercizi;
- soluzioni.
```

Tecniche utilizzate:

- Role Prompting;
- Few-Shot;
- Instruction Prompting;
- Structured Output.

---

# Laboratorio mentale

<a id="laboratorio-shot"></a>

[⬆️ Torna all'Indice](#indice)

Trasforma il seguente prompt:

```text
Scrivi una mail.
```

Applicando:

1. Role Prompting.
2. Context.
3. Few-Shot.
4. Structured Output.

---

# Sintesi della Parte 5

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato che:

- Zero-Shot utilizza solo istruzioni;
- One-Shot utilizza un esempio guida;
- Few-Shot utilizza più esempi;
- Role Prompting definisce il comportamento dell'AI;
- Instruction Prompting migliora il controllo;
- Structured Output permette integrazioni professionali.

---

# Verifica rapida

## Domanda 1

Il Few-Shot Prompting utilizza:

A. Nessun esempio  
B. Un solo esempio  
C. Più esempi guida  
D. Nessuna istruzione

**Risposta corretta: C**

---

## Domanda 2

Il Role Prompting serve a:

A. Definire il ruolo dell'AI  
B. Aumentare la RAM  
C. Modificare il modello hardware  
D. Eliminare il contesto

**Risposta corretta: A**

---

## Domanda 3

Lo Structured Output serve per:

A. Richiedere formati organizzati  
B. Spegnere il modello  
C. Ridurre i dati  
D. Creare GPU

**Risposta corretta: A**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="prompt-engineering-avanzato"></a>

# 6. Prompt Engineering Avanzato

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Le tecniche fondamentali di Prompt Engineering permettono di ottenere risposte migliori, ma nei contesti professionali spesso è necessario un livello superiore di controllo.

Il Prompt Engineering avanzato introduce strategie che consentono di:

- affrontare problemi complessi;
- suddividere attività articolate;
- migliorare l'affidabilità delle risposte;
- guidare il processo generativo;
- integrare gli LLM nei flussi di lavoro professionali.

Le principali tecniche avanzate sono:

- Chain of Thought;
- Prompt Chaining;
- Self-Consistency;
- Reflection Prompting;
- Iterative Prompting;
- Role-Based Multi-Step Prompting.

---

<a id="chain-of-thought"></a>

# 6.1 Chain of Thought (CoT)

[⬆️ Torna all'Indice](#indice)

La tecnica **Chain of Thought** consiste nel guidare il modello verso una soluzione attraverso una sequenza logica di passaggi.

L'idea fondamentale è:

> Un problema complesso può essere risolto meglio suddividendolo in passaggi intermedi.

---

# Ragionamento diretto

Esempio:

```text
Quanto fa 23 × 17?
```

Il modello deve produrre direttamente il risultato.

---

# Ragionamento strutturato

Prompt:

```text
Risolvi il problema analizzando
prima i passaggi necessari.
```

Schema:

```
Problema

↓

Analisi

↓

Passaggi intermedi

↓

Soluzione
```

---

# Applicazioni della Chain of Thought

La tecnica è utile per:

- problemi matematici;
- analisi tecniche;
- progettazione software;
- debugging;
- pianificazione.

---

# Esempio applicativo

Prompt:

```text
Analizza questo problema informatico.

Prima identifica:

1. Causa possibile.
2. Dati disponibili.
3. Soluzioni alternative.
4. Soluzione consigliata.
```

---

# Vantaggi

| Vantaggio | Descrizione |
|-|-|
| Maggiore accuratezza | Riduce errori nei problemi complessi |
| Maggiore trasparenza | Rende il processo più controllabile |
| Migliore organizzazione | Produce risposte strutturate |

---

# Attenzione

La Chain of Thought non significa che l'AI "pensa" come un essere umano.

Il modello:

- genera sequenze linguistiche;
- utilizza pattern appresi;
- produce una soluzione coerente.

---

<a id="prompt-chaining"></a>

# 6.2 Prompt Chaining

[⬆️ Torna all'Indice](#indice)

Il **Prompt Chaining** consiste nel dividere un'attività complessa in una sequenza di prompt collegati.

Invece di chiedere tutto in un'unica richiesta:

```
Problema complesso

↓

Un solo prompt

↓

Risultato
```

si utilizza:

```
Problema

↓

Prompt 1

↓

Risultato intermedio

↓

Prompt 2

↓

Risultato migliorato

↓

Output finale
```

---

# Esempio: creazione di un corso

## Prompt 1

```text
Analizza gli argomenti fondamentali
di un corso di Intelligenza Artificiale.
```

Output:

```
Struttura del corso
```

---

## Prompt 2

```text
Organizza gli argomenti
in moduli e lezioni.
```

Output:

```
Piano didattico
```

---

## Prompt 3

```text
Scrivi il contenuto
della prima lezione.
```

Output:

```
Materiale didattico
```

---

# Vantaggi del Prompt Chaining

Permette di:

- controllare ogni fase;
- correggere errori intermedi;
- migliorare la qualità finale;
- lavorare su progetti complessi.

---

# Applicazioni professionali

Esempi:

- sviluppo software;
- analisi dati;
- produzione documentazione;
- creazione contenuti;
- ricerca.

---

<a id="self-consistency"></a>

# 6.3 Self-Consistency Prompting

[⬆️ Torna all'Indice](#indice)

La tecnica **Self-Consistency** consiste nel chiedere al modello di produrre più soluzioni e confrontarle.

L'obiettivo è aumentare l'affidabilità.

---

# Processo

```
Problema

↓

Soluzione 1

Soluzione 2

Soluzione 3

↓

Confronto

↓

Risultato più coerente
```

---

# Esempio

Prompt:

```text
Trova tre strategie diverse
per migliorare la sicurezza
di una rete aziendale.

Confrontale e indica
la soluzione migliore.
```

---

# Applicazioni

Utilizzabile per:

- decision making;
- progettazione;
- analisi strategiche;
- valutazione alternative.

---

<a id="reflection-prompting"></a>

# 6.4 Reflection Prompting

[⬆️ Torna all'Indice](#indice)

Il **Reflection Prompting** chiede al modello di analizzare e migliorare una propria risposta precedente.

Schema:

```
Generazione risposta

↓

Analisi critica

↓

Correzione

↓

Versione migliorata
```

---

# Esempio

Prima richiesta:

```text
Scrivi una funzione Python
per ordinare una lista.
```

Seconda richiesta:

```text
Analizza il codice precedente.

Controlla:

- errori;
- efficienza;
- leggibilità.

Proponi una versione migliorata.
```

---

# Utilità

È particolarmente efficace per:

- codice;
- testi professionali;
- documentazione;
- analisi tecniche.

---

<a id="iterative-prompting"></a>

# 6.5 Iterative Prompting

[⬆️ Torna all'Indice](#indice)

Il Prompt Engineering professionale raramente utilizza un singolo prompt perfetto.

Normalmente il processo è iterativo.

Schema:

```
Prima richiesta

↓

Prima risposta

↓

Analisi risultato

↓

Miglioramento prompt

↓

Nuova risposta
```

---

# Esempio

Prima versione:

```text
Crea un piano marketing.
```

Seconda versione:

```text
Crea un piano marketing
per una startup tecnologica.

Inserisci:

- target clienti;
- budget;
- canali;
- KPI.
```

---

# Il principio del miglioramento continuo

Un buon utilizzatore AI non cerca:

> Il prompt perfetto al primo tentativo.

Cerca:

> Un processo continuo di miglioramento della comunicazione.

---

<a id="multi-step"></a>

# 6.6 Multi-Step Prompting

[⬆️ Torna all'Indice](#indice)

Nei problemi complessi è utile definire una sequenza di attività.

---

# Esempio sviluppo software

Obiettivo:

Creare una web application.

Approccio errato:

```text
Crea tutta l'applicazione.
```

---

Approccio professionale:

Step 1:

```text
Analizza i requisiti.
```

Step 2:

```text
Definisci l'architettura.
```

Step 3:

```text
Progetta il database.
```

Step 4:

```text
Scrivi il codice.
```

Step 5:

```text
Esegui test e revisione.
```

---

<a id="best-practice-avanzate"></a>

# 6.7 Best Practice del Prompt Engineering Avanzato

[⬆️ Torna all'Indice](#indice)

## 1. Definire sempre l'obiettivo

Un modello deve sapere:

- cosa produrre;
- perché produrlo;
- per chi.

---

## 2. Suddividere problemi complessi

Meglio:

```
5 prompt semplici

```

che:

```
1 prompt enorme e ambiguo
```

---

## 3. Verificare sempre l'output

L'AI può produrre:

- errori;
- informazioni incomplete;
- dati inventati.

---

## 4. Utilizzare formati strutturati

Esempi:

- Markdown;
- JSON;
- Tabelle;
- Checklist.

---

# Esempio completo di Prompt Avanzato

```text
RUOLO:

Agisci come un Software Architect.


CONTESTO:

Devi progettare una piattaforma LMS
per corsi online.


OBIETTIVO:

Definire l'architettura tecnica.


PROCESSO:

1. Analizza requisiti.
2. Proponi componenti.
3. Valuta alternative.
4. Evidenzia rischi.


OUTPUT:

Restituisci:

- diagramma testuale;
- tabella componenti;
- raccomandazioni finali.
```

---

# Esercitazione pratica

<a id="esercizio-avanzato"></a>

[⬆️ Torna all'Indice](#indice)

Trasforma questo obiettivo:

```text
Creare un'applicazione web.
```

in un processo Prompt Chaining:

1. Analisi requisiti.
2. Architettura.
3. Database.
4. Implementazione.
5. Test.

---

# Sintesi della Parte 6

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato che:

- Chain of Thought aiuta a strutturare problemi complessi;
- Prompt Chaining divide attività articolate;
- Self-Consistency confronta più soluzioni;
- Reflection Prompting migliora gli output;
- Iterative Prompting permette miglioramenti progressivi;
- i migliori risultati derivano da un processo strutturato.

---

# Verifica rapida

## Domanda 1

Il Prompt Chaining consiste nel:

A. Usare un solo prompt molto lungo  
B. Dividere un problema in più passaggi collegati  
C. Eliminare il contesto  
D. Ridurre le istruzioni

**Risposta corretta: B**

---

## Domanda 2

Il Reflection Prompting serve a:

A. Analizzare e migliorare una risposta precedente  
B. Creare hardware  
C. Eliminare i dati  
D. Modificare il modello

**Risposta corretta: A**

---

## Domanda 3

L'Iterative Prompting si basa su:

A. Un solo tentativo  
B. Miglioramento progressivo delle richieste  
C. Nessun controllo umano  
D. Risposte casuali

**Risposta corretta: B**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="llm-coding-data-analysis"></a>

# 7. Utilizzo degli LLM per Coding e Data Analysis

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Gli LLM non sono strumenti utilizzati solamente per generare testo.

Uno degli ambiti più importanti dell'Intelligenza Artificiale Generativa è il supporto alle attività tecniche:

- programmazione;
- analisi dati;
- progettazione software;
- documentazione;
- automazione dei processi.

L'AI diventa quindi un:

# Assistente Cognitivo per il Professionista

che affianca l'utente nelle diverse fasi del lavoro.

---

<a id="llm-programmazione"></a>

# 7.1 Gli LLM come assistenti di programmazione

[⬆️ Torna all'Indice](#indice)

Gli LLM possono supportare lo sviluppo software in molte attività:

- generazione di codice;
- spiegazione di codice esistente;
- individuazione degli errori;
- ottimizzazione;
- refactoring;
- creazione di documentazione.

---

# Nuovo paradigma dello sviluppo software

Programmazione tradizionale:

```
Programmatore

↓

Scrittura codice

↓

Compilazione

↓

Test

↓

Correzione errori
```

Con supporto AI:

```
Programmatore

↓

Definizione problema

↓

LLM Assistant

↓

Generazione soluzione

↓

Revisione umana

↓

Test
```

---

# L'AI non sostituisce il programmatore

Un principio fondamentale:

> L'LLM genera proposte, ma la responsabilità finale rimane dello sviluppatore.

Il programmatore deve verificare:

- correttezza logica;
- sicurezza;
- prestazioni;
- compatibilità;
- qualità del codice.

---

<a id="generazione-codice"></a>

# 7.2 Generazione automatica di codice

[⬆️ Torna all'Indice](#indice)

Un LLM può generare codice partendo da una descrizione in linguaggio naturale.

---

# Prompt semplice

```text
Scrivi una funzione Python
per calcolare la media di una lista.
```

---

# Prompt professionale

```text
Agisci come uno sviluppatore Python esperto.

Crea una funzione che calcoli
la media degli elementi di una lista.

Requisiti:

- utilizza Python 3.12;
- inserisci type hint;
- gestisci lista vuota;
- aggiungi commenti;
- fornisci esempio di utilizzo.
```

---

# Differenza

Il secondo prompt specifica:

- ruolo;
- tecnologia;
- vincoli;
- comportamento atteso.

Il risultato sarà generalmente più vicino alle necessità reali.

---

<a id="debugging-ai"></a>

# 7.3 Debugging assistito dall'AI

[⬆️ Torna all'Indice](#indice)

Uno degli utilizzi più efficaci degli LLM è l'analisi degli errori.

---

# Approccio tradizionale

```
Errore

↓

Ricerca manuale

↓

Forum/documentazione

↓

Tentativi
```

---

# Approccio con AI

```
Errore

↓

Invio codice + messaggio errore

↓

Analisi AI

↓

Possibile causa

↓

Soluzione proposta
```

---

# Esempio prompt

```text
Analizza questo errore Python.

Codice:

[incolla codice]

Errore:

[incolla messaggio]

Indica:

1. causa del problema;
2. soluzione;
3. versione corretta del codice.
```

---

# Best Practice nel debugging

Fornire sempre:

- codice completo;
- messaggio di errore;
- ambiente utilizzato;
- versione software;
- comportamento atteso.

---

<a id="code-review"></a>

# 7.4 Code Review con gli LLM

[⬆️ Torna all'Indice](#indice)

Gli LLM possono simulare una revisione del codice.

---

# Obiettivi della Code Review

Analizzare:

- leggibilità;
- efficienza;
- sicurezza;
- manutenzione;
- qualità dello stile.

---

# Esempio prompt

```text
Agisci come Software Architect.

Analizza il seguente codice.

Valuta:

- qualità;
- possibili bug;
- sicurezza;
- miglioramenti consigliati.

Restituisci una tabella.
```

---

# Output possibile

| Aspetto | Valutazione |
|-|-|
| Struttura | Buona |
| Sicurezza | Da migliorare |
| Performance | Ottimizzabile |

---

<a id="llm-data-analysis"></a>

# 7.5 Utilizzo degli LLM per Data Analysis

[⬆️ Torna all'Indice](#indice)

Gli LLM possono supportare l'analisi dei dati trasformando informazioni grezze in conoscenza.

---

# Processo tradizionale Data Analysis

```
Dataset

↓

Pulizia dati

↓

Analisi

↓

Grafici

↓

Interpretazione
```

---

# Processo con supporto AI

```
Dataset

↓

LLM Assistant

↓

Analisi automatizzata

↓

Interpretazione

↓

Decisioni
```

---

# Attività supportate

Gli LLM possono aiutare in:

- descrizione dataset;
- individuazione anomalie;
- generazione query;
- spiegazione statistiche;
- creazione report.

---

<a id="analisi-csv"></a>

# 7.6 Analisi di dataset CSV

[⬆️ Torna all'Indice](#indice)

Un esempio comune è l'analisi di un file CSV.

Prompt:

```text
Analizza questo dataset CSV.

Obiettivi:

1. Descrivi le colonne.
2. Individua valori mancanti.
3. Calcola statistiche principali.
4. Evidenzia anomalie.
5. Suggerisci visualizzazioni.
```

---

# Possibile output

## Struttura dati

| Campo | Tipo |
|-|-|
| Nome | Testo |
| Età | Numero |
| Valore | Decimale |

---

## Problemi rilevati

- valori mancanti;
- duplicati;
- valori fuori scala.

---

<a id="output-strutturati"></a>

# 7.7 Output strutturati: Markdown, JSON e Tabelle

[⬆️ Torna all'Indice](#indice)

Nel mondo professionale gli output devono spesso essere utilizzabili da altri strumenti.

Gli LLM possono generare:

- Markdown;
- JSON;
- CSV;
- Tabelle;
- codice.

---

# Markdown

Utilizzato per:

- documentazione;
- guide;
- report.

Esempio:

```markdown
# Analisi

## Risultati

- Punto 1
- Punto 2
```

---

# JSON

Utilizzato per:

- API;
- applicazioni web;
- database.

Esempio:

```json
{
 "nome": "Mario",
 "ruolo": "Studente"
}
```

---

# Tabelle

Utili per:

- confronti;
- classificazioni;
- riepiloghi.

---

<a id="ai-e-vscode"></a>

# 7.8 LLM e ambiente VS Code

[⬆️ Torna all'Indice](#indice)

Gli LLM possono essere integrati nei normali ambienti di sviluppo.

Esempio:

```
VS Code

↓

Estensione AI

↓

Modello linguistico

↓

Assistenza sviluppo
```

---

# Attività supportate

- completamento codice;
- spiegazione funzioni;
- generazione test;
- documentazione;
- refactoring.

---

# Approccio professionale

Un flusso corretto è:

```
Problema

↓

Progettazione

↓

Supporto AI

↓

Revisione umana

↓

Test

↓

Produzione
```

---

<a id="limiti-coding"></a>

# 7.9 Limiti degli LLM nel Coding

[⬆️ Torna all'Indice](#indice)

Gli LLM possono commettere errori anche generando codice.

Problemi comuni:

- librerie inesistenti;
- API obsolete;
- errori logici;
- vulnerabilità;
- soluzioni inefficienti.

---

# Regola fondamentale

Mai utilizzare codice generato senza:

1. comprenderlo;
2. verificarlo;
3. testarlo.

---

# Laboratorio pratico

<a id="esercizio-coding-data"></a>

[⬆️ Torna all'Indice](#indice)

## Parte A - Coding

Richiedere all'AI:

```text
Crea una funzione Python
che analizzi una lista di numeri.

Inserisci:

- type hint;
- gestione errori;
- test automatici.
```

---

## Parte B - Data Analysis

Fornire un dataset CSV e chiedere:

```text
Analizza il dataset.

Produci:

- statistiche;
- anomalie;
- grafici consigliati;
- conclusioni.
```

---

# Sintesi della Parte 7

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo imparato che:

- gli LLM sono strumenti potenti per il coding;
- possono supportare debugging e revisione;
- aiutano nell'analisi dei dati;
- gli output strutturati permettono integrazioni professionali;
- il controllo umano rimane fondamentale.

---

# Verifica rapida

## Domanda 1

Gli LLM nel coding possono:

A. Sostituire completamente il programmatore  
B. Generare e analizzare codice come assistenti  
C. Eliminare tutti gli errori  
D. Creare hardware

**Risposta corretta: B**

---

## Domanda 2

Prima di utilizzare codice generato dall'AI bisogna:

A. Pubblicarlo subito  
B. Verificarlo e testarlo  
C. Eliminarlo  
D. Nasconderlo

**Risposta corretta: B**

---

## Domanda 3

JSON è utile perché:

A. È un formato strutturato utilizzabile dai software  
B. Aumenta la memoria del modello  
C. Sostituisce Python  
D. Elimina il database

**Risposta corretta: A**

---

[⬆️ Torna all'Indice](#indice)

---

<a id="laboratorio-pratico"></a>

# 8. Laboratorio pratico

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Il laboratorio rappresenta la fase applicativa del Modulo 2.

L'obiettivo è trasformare le conoscenze teoriche di Prompt Engineering in competenze operative.

Lo studente dovrà imparare a:

- analizzare un problema;
- progettare un prompt professionale;
- migliorare progressivamente il risultato;
- valutare la qualità della risposta prodotta dall'LLM.

---

# Obiettivi del laboratorio

Al termine dell'attività lo studente sarà in grado di:

- creare prompt strutturati;
- applicare tecniche Zero-Shot, One-Shot e Few-Shot;
- utilizzare Role Prompting;
- definire output strutturati;
- applicare Prompt Chaining;
- valutare criticamente una risposta AI.

---

# Prerequisiti

Sono richieste:

- conoscenza dei concetti fondamentali di AI;
- conoscenza della struttura di un prompt;
- utilizzo base di un LLM.

Strumenti consigliati:

- ChatGPT;
- Gemini;
- Claude;
- modelli open source locali.

---

<a id="laboratorio-1"></a>

# 8.1 Laboratorio 1 - Miglioramento progressivo di un Prompt

[⬆️ Torna all'Indice](#indice)

## Scenario

Un docente vuole creare materiale didattico sull'Intelligenza Artificiale.

Prompt iniziale:

```text
Crea una lezione sull'AI.
```

---

# Analisi del problema

Il prompt presenta diverse criticità:

| Problema | Conseguenza |
|-|-|
| Nessun destinatario | Livello non definito |
| Nessun obiettivo | Risultato generico |
| Nessun formato | Struttura imprevedibile |
| Nessun vincolo | Contenuto non controllato |

---

# Miglioramento 1

Aggiunta del ruolo:

```text
Agisci come un docente di Informatica.

Crea una lezione sull'AI.
```

---

# Miglioramento 2

Aggiunta del contesto:

```text
Agisci come un docente di Informatica.

Prepara una lezione sull'AI
per studenti del quinto anno
di scuola superiore.
```

---

# Miglioramento 3

Aggiunta dell'obiettivo:

```text
Agisci come un docente di Informatica.

Prepara una lezione sull'AI
per studenti del quinto anno.

Obiettivo:
spiegare i concetti fondamentali
e sviluppare consapevolezza critica.
```

---

# Miglioramento finale

```text
RUOLO:

Agisci come un docente esperto
di Intelligenza Artificiale.


CONTESTO:

Devi preparare una lezione
per studenti del quinto anno
di un istituto tecnico.


OBIETTIVO:

Spiegare i fondamenti dell'AI
e introdurre il Prompt Engineering.


VINCOLI:

Utilizza linguaggio didattico.

Inserisci:
- esempi pratici;
- immagini concettuali;
- esercizi;
- riepilogo finale.


OUTPUT:

Produci un documento Markdown
con sezioni organizzate.
```

---

<a id="laboratorio-2"></a>

# 8.2 Laboratorio 2 - Few-Shot Prompting

[⬆️ Torna all'Indice](#indice)

## Obiettivo

Creare un classificatore automatico di richieste.

---

# Prompt senza esempi

```text
Classifica questa richiesta:

"Non riesco ad entrare nel mio account."
```

Possibile problema:

Il modello potrebbe scegliere categorie diverse.

---

# Prompt Few-Shot

```text
Classifica le richieste degli utenti.


Esempio 1:

Richiesta:
"Ho dimenticato la password."

Categoria:
Accesso account


Esempio 2:

Richiesta:
"Vorrei cambiare il metodo di pagamento."

Categoria:
Gestione pagamento


Esempio 3:

Richiesta:
"L'applicazione restituisce un errore."

Categoria:
Problema tecnico


Ora analizza:

"Non riesco ad entrare nel mio account."
```

---

# Risultato atteso

```text
Categoria:
Accesso account
```

---

# Obiettivo didattico

Lo studente comprende che:

- gli esempi guidano il comportamento;
- pochi esempi possono modificare significativamente l'output.

---

<a id="laboratorio-3"></a>

# 8.3 Laboratorio 3 - Prompt Chaining

[⬆️ Torna all'Indice](#indice)

## Scenario

Creare un mini corso online.

---

# Approccio errato

```text
Crea un corso completo di AI.
```

Problema:

Attività troppo ampia.

---

# Approccio Prompt Chaining

## Step 1

```text
Definisci gli argomenti fondamentali
di un corso di AI.
```

---

## Step 2

```text
Organizza questi argomenti
in moduli progressivi.
```

---

## Step 3

```text
Sviluppa la prima lezione
del modulo 1.
```

---

## Step 4

```text
Crea esercizi e quiz
per verificare l'apprendimento.
```

---

# Risultato

Il progetto viene costruito progressivamente.

---

<a id="prompt-challenge"></a>

# 9. Prompt Challenge

[⬆️ Torna all'Indice](#indice)

La Prompt Challenge rappresenta la prova pratica finale del modulo.

---

# Obiettivo

Realizzare un prompt professionale completo.

---

# Scenario

Un'azienda vuole creare un sistema AI per analizzare automaticamente le richieste dei clienti.

---

# Prompt iniziale

```text
Analizza le richieste dei clienti.
```

---

# Compito dello studente

Trasformare il prompt applicando:

## Obbligatorio

✅ Role Prompting

✅ Context

✅ Task Definition

✅ Vincoli

✅ Output strutturato

---

# Soluzione esempio

```text
RUOLO:

Agisci come un analista
di customer support.


CONTESTO:

Devi analizzare messaggi
provenienti dai clienti
di una piattaforma digitale.


TASK:

Classifica ogni richiesta
secondo categoria e priorità.


VINCOLI:

Considera:

- urgenza;
- sentimento cliente;
- problema tecnico.


OUTPUT:

Restituisci JSON:

{
 categoria:"",
 priorita:"",
 sentimento:"",
 motivazione:""
}
```

---

<a id="quiz-finale"></a>

# 10. Quiz finale Modulo 2

[⬆️ Torna all'Indice](#indice)

---

## Domanda 1

Un prompt professionale contiene generalmente:

A. Solo una domanda

B. Ruolo, contesto, obiettivo e vincoli

C. Solo parole chiave

D. Solo codice

**Risposta corretta: B**

---

## Domanda 2

Zero-Shot significa:

A. Utilizzare molti esempi

B. Utilizzare nessun esempio

C. Utilizzare immagini

D. Utilizzare database

**Risposta corretta: B**

---

## Domanda 3

Few-Shot Prompting utilizza:

A. Esempi guida

B. Hardware dedicato

C. Reti neurali locali

D. Database relazionali

**Risposta corretta: A**

---

## Domanda 4

Prompt Chaining significa:

A. Unire più modelli

B. Dividere un problema in più passaggi

C. Eliminare istruzioni

D. Ridurre il contesto

**Risposta corretta: B**

---

## Domanda 5

Un output JSON è utile perché:

A. È facilmente utilizzabile dai software

B. Aumenta la GPU

C. Sostituisce l'AI

D. Elimina gli errori

**Risposta corretta: A**

---

<a id="glossario"></a>

# 11. Glossario Modulo 2

[⬆️ Torna all'Indice](#indice)

| Termine | Definizione |
|-|-|
| Prompt | Istruzione fornita al modello AI |
| Prompt Engineering | Progettazione professionale dei prompt |
| Token | Unità elementare del testo elaborata dal modello |
| Context Window | Quantità massima di informazioni considerate |
| Embedding | Rappresentazione matematica del significato |
| Zero-Shot | Prompt senza esempi |
| One-Shot | Prompt con un esempio |
| Few-Shot | Prompt con più esempi |
| Chain of Thought | Strategia basata su passaggi logici |
| Prompt Chaining | Sequenza di prompt collegati |
| Reflection Prompting | Revisione e miglioramento dell'output |
| Structured Output | Risposta in formato organizzato |

---

<a id="riepilogo-modulo2"></a>

# 12. Riepilogo Modulo 2

[⬆️ Torna all'Indice](#indice)

Nel Modulo 2 lo studente ha acquisito le basi fondamentali per comunicare professionalmente con gli LLM.

---

# Competenze acquisite

Lo studente è ora in grado di:

✅ comprendere come gli LLM elaborano il linguaggio;

✅ conoscere token, context window ed embedding;

✅ progettare prompt professionali;

✅ utilizzare Zero-Shot, One-Shot e Few-Shot Prompting;

✅ applicare tecniche avanzate;

✅ utilizzare gli LLM per coding e analisi dati;

✅ progettare workflow basati su Prompt Chaining;

✅ valutare criticamente gli output generati.

---

[⬆️ Torna all'Indice](#indice)

---


