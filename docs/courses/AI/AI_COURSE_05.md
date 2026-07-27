# Modulo 5
# Prompt Engineering Avanzato e Utilizzo Professionale degli LLM
### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com
### Ottimizzata per Google Colab · Aggiornata al Luglio 2026

---

**Livello:** 🟡 Intermedio

**Codice Modulo:** M5

**Versione:** 1.0

**Tempo di studio stimato:** 15–20 ore

**Difficoltà:** ★★★☆☆

---

<a id="indice"></a>

# Indice

1. [Introduzione al Modulo](#introduzione)
2. [Evoluzione del Prompt Engineering](#evoluzione)
3. [Chain of Thought e Reasoning Prompting](#cot)
4. [Prompt Chaining e Workflow AI](#chaining)
5. [Structured Output: Markdown, JSON e Tabelle](#structured)
6. [Role Prompting e Context Engineering](#context)
7. [LLM come Assistente per Coding Python](#coding)
8. [LLM per Data Analysis e Problem Solving](#m8)
9. [Laboratorio pratico avanzato](#laboratorio)
10. [Prompt Challenge e Quiz finale](#prompt-challenge)

---

<a id="introduzione"></a>

# 1. Introduzione al Modulo

[⬆️ Torna all'Indice](#indice)

---

# Dal Prompt Base al Prompt Professionale

Nel Modulo 2 abbiamo introdotto i fondamenti del **Prompt Engineering**, imparando a costruire richieste efficaci attraverso:

- ruolo;
- contesto;
- obiettivo;
- vincoli;
- formato dell'output.

Queste competenze rappresentano il primo livello di interazione con un Large Language Model.

Tuttavia, utilizzare un modello AI in modo professionale richiede un approccio più evoluto.

---

Un utente principiante utilizza un LLM come un motore di ricerca:

```
Domanda

↓

Risposta AI
```

---

Un utente avanzato utilizza un LLM come un collaboratore:

```
Obiettivo

↓

Analisi del problema

↓

Definizione strategia

↓

Prompt strutturato

↓

Verifica risultato

↓

Ottimizzazione
```

---

# Obiettivo del Modulo 5

Questo modulo introduce le tecniche avanzate necessarie per utilizzare gli LLM come strumenti professionali nei seguenti ambiti:

- sviluppo software;
- analisi dati;
- progettazione didattica;
- automazione dei processi;
- problem solving;
- progettazione di workflow basati su AI.

---

# Competenze sviluppate

Al termine del modulo lo studente sarà in grado di:

✔ progettare prompt complessi;

✔ migliorare la qualità delle risposte generate;

✔ utilizzare tecniche di ragionamento guidato;

✔ creare sequenze di prompt;

✔ definire output strutturati;

✔ utilizzare LLM come assistente nello sviluppo software;

✔ integrare AI nei propri processi lavorativi.

---

# Prerequisiti

Per affrontare il modulo sono consigliate:

## Conoscenze teoriche

- concetti base di Intelligenza Artificiale;
- funzionamento generale degli LLM;
- token e context window;
- struttura base di un prompt.

---

## Competenze pratiche

- utilizzo di chatbot AI;
- conoscenza base Markdown;
- conoscenza base Python.

---

# Perché il Prompt Engineering è diventato fondamentale?

Gli LLM moderni sono sistemi estremamente potenti, ma la qualità del risultato dipende fortemente dal modo in cui vengono utilizzati.

Un modello AI non conosce automaticamente:

- il nostro obiettivo;
- il nostro pubblico;
- il livello di dettaglio richiesto;
- i vincoli del progetto.

Queste informazioni devono essere fornite attraverso il prompt.

---

# Il prompt come specifica tecnica

Nel mondo dello sviluppo software un programmatore non scrive:

```
crea un programma
```

ma definisce:

- requisiti;
- funzionalità;
- vincoli;
- struttura;
- comportamento atteso.

Lo stesso principio vale per gli LLM.

---

Un prompt professionale diventa quindi una specifica:

```
Problema

↓

Requisiti

↓

Prompt

↓

Output AI

↓

Controllo qualità
```

---

# Evoluzione dell'interazione uomo-AI

## Prima generazione

Utilizzo semplice:

```
Utente

↓

Domanda

↓

Risposta
```

---

## Seconda generazione

Prompt Engineering:

```
Utente

↓

Prompt strutturato

↓

Risposta migliorata
```

---

## Terza generazione

AI Workflow:

```
Obiettivo

↓

Pianificazione

↓

Prompt multipli

↓

Strumenti AI

↓

Verifica

↓

Risultato finale
```

---

# Applicazioni professionali

## Sviluppo software

Gli LLM possono supportare:

- progettazione architettura;
- generazione codice;
- analisi errori;
- refactoring;
- documentazione.

---

## Data Analysis

Gli LLM possono aiutare a:

- comprendere dataset;
- generare query;
- creare report;
- interpretare risultati.

---

## Formazione

Gli LLM possono essere utilizzati per:

- creare materiale didattico;
- generare esercizi;
- costruire tutor personalizzati.

---

## Business

Applicazioni:

- analisi documentale;
- automazione procedure;
- supporto decisionale.

---

# Prompt Engineering e qualità dell'output

La qualità della risposta dipende principalmente da:

## Precisione del contesto

Un contesto insufficiente produce risposte generiche.

---

## Chiarezza dell'obiettivo

L'AI deve sapere cosa deve produrre.

---

## Vincoli definiti

Esempi:

- lunghezza;
- formato;
- stile;
- destinatario.

---

## Iterazione

Un buon risultato spesso nasce da più passaggi:

```
Prima risposta

↓

Analisi

↓

Correzione prompt

↓

Risultato finale
```

---

# Esempio confronto

## Prompt semplice

```
Spiegami Python
```

Risultato:

- generico;
- poco personalizzato;
- adatto solo a una panoramica.

---

## Prompt avanzato

```
Agisci come docente di Informatica in una scuola superiore.

Spiega Python a studenti del secondo anno.

Organizza la risposta in:

1. concetti teorici;
2. esempi di codice;
3. esercizi guidati;
4. verifica finale.

Utilizza un linguaggio semplice ma tecnicamente corretto.
```

Risultato:

- più preciso;
- più coerente;
- più utilizzabile.

---

# Il nuovo ruolo del professionista AI

Il professionista non è colui che semplicemente "usa ChatGPT".

È colui che sa:

- definire problemi;
- progettare richieste;
- valutare risultati;
- integrare strumenti;
- migliorare processi.

---

# Sintesi della Parte 1

[⬆️ Torna all'Indice](#indice)

In questa prima parte abbiamo introdotto:

- il significato del Prompt Engineering avanzato;
- la differenza tra utilizzo base e professionale degli LLM;
- il prompt come specifica tecnica;
- l'evoluzione verso workflow AI;
- gli ambiti applicativi professionali.

---

# Verifica rapida

## Domanda 1

Un prompt professionale deve contenere principalmente:

A. Solo una domanda breve

B. Contesto, obiettivo e vincoli

C. Solo codice Python

D. Solo parole chiave

**Risposta corretta:** B

---

## Domanda 2

Il Prompt Engineering avanzato serve principalmente a:

A. Programmare direttamente il modello AI

B. Migliorare qualità e precisione degli output

C. Sostituire completamente il programmatore

D. Eliminare la necessità di verifiche

**Risposta corretta:** B

---

## Domanda 3

Un workflow AI è:

A. Una sequenza organizzata di attività con strumenti AI

B. Un nuovo linguaggio di programmazione

C. Un database

D. Un sistema operativo

**Risposta corretta:** A

---

[⬆️ Torna all'Indice](#indice)

---

<a id="evoluzione"></a>

# 2. Evoluzione del Prompt Engineering

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Il Prompt Engineering nasce dalla necessità di comunicare in modo efficace con i Large Language Model.

Nelle prime fasi dell'utilizzo dell'AI generativa molti utenti utilizzavano gli LLM attraverso richieste semplici:

```
Scrivi un articolo sull'Intelligenza Artificiale
```

oppure:

```
Crea un programma Python
```

Questi approcci producevano risultati spesso corretti, ma non sempre:

- precisi;
- coerenti;
- personalizzati;
- utilizzabili professionalmente.

---

L'evoluzione del Prompt Engineering segue quindi un percorso:

```
Prompt semplice

        ↓

Prompt strutturato

        ↓

Prompt professionale

        ↓

Context Engineering

        ↓

AI Workflow Design
```

---

# 2.1 Il limite del Prompt tradizionale

[⬆️ Torna all'Indice](#indice)

Un Large Language Model non "comprende" realmente il problema come farebbe un essere umano.

Il modello genera una risposta sulla base di:

- probabilità linguistiche;
- informazioni presenti nel contesto;
- istruzioni ricevute.

---

Un prompt troppo generico produce:

```
Input poco definito

        ↓

Interpretazioni multiple

        ↓

Output generico
```

---

Esempio:

## Prompt

```
Spiega il Machine Learning
```

---

Possibili interpretazioni:

- spiegazione scolastica;
- spiegazione universitaria;
- tutorial tecnico;
- articolo divulgativo;
- guida per sviluppatori.

Il modello deve scegliere autonomamente.

---

# Miglioramento del prompt

Un prompt professionale riduce l'ambiguità.

Esempio:

```
Agisci come docente universitario di Intelligenza Artificiale.

Spiega il Machine Learning a studenti del quarto anno delle superiori.

Utilizza:

- definizione teorica;
- esempi pratici;
- diagrammi testuali;
- esercizi finali.

Mantieni un linguaggio chiaro ma tecnicamente corretto.
```

---

Risultato:

```
Maggiore contesto

        ↓

Minore ambiguità

        ↓

Output più utile
```

---

# 2.2 Dal Prompt Engineering al Context Engineering

[⬆️ Torna all'Indice](#indice)

Il Prompt Engineering tradizionale si concentra sulla scrittura della richiesta.

Il **Context Engineering** amplia il concetto.

Non riguarda solo:

```
Che cosa chiedo?
```

ma anche:

```
Quali informazioni fornisco al modello
per permettergli di lavorare meglio?
```

---

# Cos'è il Context Engineering?

Il Context Engineering consiste nella progettazione dell'ambiente informativo fornito all'AI.

Include:

- ruolo;
- obiettivo;
- dati disponibili;
- documentazione;
- esempi;
- vincoli;
- regole operative.

---

Schema:

```
              CONTEXTO AI

                    │

        ┌───────────┼───────────┐

        ▼           ▼           ▼

    Ruolo       Dati        Regole

        │           │           │

        └───────────┼───────────┘

                    ▼

                LLM

                    ▼

              Output migliore
```

---

# Esempio pratico

## Prompt base

```
Analizza questo documento.
```

---

Problemi:

- quale obiettivo?
- quale tipo di analisi?
- quale destinatario?
- quale formato?

---

## Prompt con Context Engineering

```
Agisci come analista aziendale.

Devi analizzare il documento allegato.

Obiettivo:

individuare rischi, opportunità e punti critici.

Produci un report con:

1. sintesi iniziale;
2. analisi dettagliata;
3. tabella rischi/opportunità;
4. conclusioni operative.

Destinatario:
direzione aziendale.
```

---

Il contesto guida il modello verso un risultato specifico.

---

# 2.3 Prompt Template: creare prompt riutilizzabili

[⬆️ Torna all'Indice](#indice)

Un professionista AI non scrive sempre nuovi prompt da zero.

Crea dei:

```
Prompt Template
```

ovvero modelli riutilizzabili.

---

Esempio:

## Template Analisi Documento

```
RUOLO:

Agisci come [esperto]


CONTESTO:

Devi analizzare [documento]


OBIETTIVO:

Devi ottenere [risultato]


VINCOLI:

Rispetta queste regole:

- [vincolo 1]
- [vincolo 2]


OUTPUT:

Produci:

[formato richiesto]
```

---

Questo permette di:

- risparmiare tempo;
- mantenere qualità costante;
- standardizzare i processi.

---

# 2.4 Prompt Iterativo

[⬆️ Torna all'Indice](#indice)

Un errore comune è pensare che il primo prompt debba produrre subito il risultato perfetto.

Nella pratica professionale si lavora per iterazioni.

---

Processo:

```
Prima richiesta

        ↓

Analisi risposta

        ↓

Correzione prompt

        ↓

Nuova richiesta

        ↓

Ottimizzazione finale
```

---

Esempio:

## Primo Prompt

```
Crea una guida Python.
```

---

Risultato:

Troppo generale.

---

Secondo Prompt:

```
Rendi la guida adatta a studenti principianti.

Aggiungi:

- esempi;
- esercizi;
- quiz.
```

---

Terzo Prompt:

```
Trasforma il contenuto in formato Markdown modulare con indice navigabile.
```

---

Risultato:

Documento professionale.

---

# 2.5 Prompt Versioning

[⬆️ Torna all'Indice](#indice)

Nei sistemi professionali i prompt devono essere gestiti come codice.

Un prompt può avere versioni:

```
prompt_v1

        ↓

prompt_v2

        ↓

prompt_v3
```

---

Esempio:

```
AI_Report_Generator_v1.md

AI_Report_Generator_v2.md

AI_Report_Generator_v3.md
```

---

Vantaggi:

- confronto risultati;
- tracciabilità modifiche;
- miglioramento continuo.

---

# 2.6 Prompt come componente software

[⬆️ Torna all'Indice](#indice)

Nei moderni sistemi AI il prompt diventa una componente del software.

Esempio:

Applicazione:

```
Frontend

    │

    ▼

Backend

    │

    ▼

Prompt Template

    │

    ▼

LLM

    │

    ▼

Output
```

---

Questo approccio viene utilizzato in:

- chatbot aziendali;
- assistenti virtuali;
- sistemi RAG;
- AI Agent.

---

# 2.7 Best Practice Prompt Engineering

[⬆️ Torna all'Indice](#indice)

## Definire sempre il ruolo

Esempio:

```
Agisci come esperto di cybersecurity.
```

---

## Specificare il destinatario

Esempio:

```
Spiega a studenti del terzo anno.
```

---

## Definire il formato

Esempio:

```
Rispondi utilizzando una tabella Markdown.
```

---

## Inserire criteri di qualità

Esempio:

```
Verifica eventuali errori prima della risposta.
```

---

## Separare dati e istruzioni

Esempio:

```
ISTRUZIONI:

Analizza il testo seguente.


DATI:

[contenuto]
```

---

# Errori comuni

[⬆️ Torna all'Indice](#indice)

## Prompt troppo breve

Problema:

```
Genera codice
```

Soluzione:

aggiungere:

- linguaggio;
- obiettivo;
- vincoli;
- formato.

---

## Mancanza di contesto

Problema:

L'AI deve immaginare informazioni mancanti.

---

## Nessuna verifica

Problema:

L'output viene accettato senza controllo.

---

## Nessuna iterazione

Problema:

Si utilizza solo il primo risultato.

---

# Applicazioni nella piattaforma gcprof-academy

[⬆️ Torna all'Indice](#indice)

Nel contesto della piattaforma educativa, il Prompt Engineering avanzato può essere utilizzato per:

## Generazione contenuti

Creazione automatica di:

- lezioni Markdown;
- esercizi;
- quiz;
- laboratori.

---

## Tutor AI

Personalizzazione:

```
Studente

↓

Livello

↓

Difficoltà

↓

Materiale personalizzato
```

---

## Supporto docenti

Creazione di:

- verifiche;
- rubriche valutative;
- spiegazioni alternative.

---

# Sintesi della Parte 2

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo approfondito:

- limiti dei prompt tradizionali;
- evoluzione verso prompt professionali;
- Context Engineering;
- Prompt Template;
- Prompt Iterativo;
- Prompt Versioning;
- utilizzo dei prompt come componenti software.

Il Prompt Engineering moderno non è più solo scrivere domande migliori, ma progettare sistemi di comunicazione efficaci con l'Intelligenza Artificiale.

---

# Verifica rapida

## Domanda 1

Che cosa migliora principalmente un prompt professionale?

A. La velocità del computer

B. La qualità e precisione dell'output AI

C. La memoria RAM

D. Il sistema operativo

**Risposta corretta:** B

---

## Domanda 2

Il Context Engineering riguarda:

A. Solo la lunghezza del prompt

B. La progettazione delle informazioni fornite al modello

C. La programmazione del processore

D. La grafica dell'interfaccia

**Risposta corretta:** B

---

## Domanda 3

Perché utilizzare Prompt Template?

A. Per creare prompt riutilizzabili e standardizzati

B. Per eliminare completamente l'AI

C. Per sostituire Python

D. Per aumentare la memoria del PC

**Risposta corretta:** A

---

[⬆️ Torna all'Indice](#indice)

---

<a id="cot"></a>

# 3. Chain of Thought e Reasoning Prompting

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Uno dei principali limiti dei primi utilizzi degli LLM era la difficoltà nel gestire problemi complessi che richiedevano:

- più passaggi logici;
- analisi progressive;
- pianificazione;
- confronto tra alternative;
- risoluzione di problemi articolati.

Per affrontare questi scenari sono nate tecniche di prompting avanzate basate sul concetto di:

```
Reasoning Prompting
```

ovvero la capacità di guidare il modello verso una risposta più strutturata.

---

# 3.1 Dal Prompt diretto al Reasoning Prompting

[⬆️ Torna all'Indice](#indice)

Un prompt semplice richiede direttamente un risultato.

Esempio:

```
Risolvi questo problema matematico.
```

---

Il modello deve:

- comprendere il problema;
- individuare il metodo;
- eseguire i passaggi;
- produrre la soluzione.

---

Nei problemi complessi questo può portare a:

- errori logici;
- salti nei passaggi;
- risposte incomplete.

---

Il Reasoning Prompting introduce invece una fase intermedia:

```
Comprensione

↓

Analisi

↓

Pianificazione

↓

Esecuzione

↓

Verifica
```

---

# 3.2 Che cos'è il Chain of Thought (CoT)

[⬆️ Torna all'Indice](#indice)

Il **Chain of Thought** (Catena del Pensiero) è una tecnica che invita il modello a considerare un problema attraverso una sequenza di passaggi logici.

L'idea fondamentale è:

```
Problema complesso

↓

Scomposizione in sotto-problemi

↓

Risoluzione progressiva

↓

Risultato finale
```

---

Esempio concettuale:

Problema:

```
Un'azienda vuole ridurre i costi energetici.
Come può intervenire?
```

---

Approccio diretto:

```
Installare pannelli solari.
```

---

Approccio ragionato:

```
1. Analizzare consumi attuali.

2. Identificare sprechi.

3. Valutare interventi possibili.

4. Stimare costi e benefici.

5. Proporre piano operativo.
```

---

Il secondo approccio produce una risposta più completa.

---

# 3.3 Perché il ragionamento strutturato migliora gli output?

[⬆️ Torna all'Indice](#indice)

Gli LLM sono particolarmente efficaci quando ricevono:

- obiettivi chiari;
- problemi suddivisi;
- criteri di valutazione;
- vincoli espliciti.

---

Un problema complesso può essere rappresentato come:

```
Problema globale

        │

        ├── Analisi dati

        │

        ├── Individuazione cause

        │

        ├── Generazione soluzioni

        │

        └── Scelta finale
```

---

La suddivisione riduce la probabilità di errori.

---

# 3.4 Tecniche di Reasoning Prompting

[⬆️ Torna all'Indice](#indice)

Esistono diverse tecniche per guidare il ragionamento.

---

# Step-by-Step Prompting

Consiste nel chiedere una soluzione organizzata in passaggi.

Esempio:

```
Analizza il problema.

Dividi la soluzione in passaggi.

Spiega ogni fase.

Alla fine fornisci il risultato.
```

---

Utilizzo:

- matematica;
- programmazione;
- analisi tecnica.

---

# Problem Decomposition

[⬆️ Torna all'Indice](#indice)

La decomposizione consiste nel dividere un problema grande in parti più semplici.

---

Esempio:

Obiettivo:

```
Creare una piattaforma e-learning AI
```

---

Suddivisione:

```
1. Analisi requisiti

2. Progettazione database

3. Backend

4. Frontend

5. Testing

6. Deploy
```

---

L'AI può lavorare su ogni componente separatamente.

---

# Self-Consistency Prompting

[⬆️ Torna all'Indice](#indice)

La tecnica Self-Consistency consiste nel generare più possibili ragionamenti e confrontare i risultati.

Schema:

```
Problema

      │

      ├── Soluzione A

      │

      ├── Soluzione B

      │

      └── Soluzione C

             │

             ▼

       Scelta migliore
```

---

Applicazioni:

- problemi matematici;
- analisi decisionale;
- progettazione.

---

# 3.5 Chain of Thought e sviluppo software

[⬆️ Torna all'Indice](#indice)

Nel coding il ragionamento strutturato è particolarmente utile.

---

Prompt semplice:

```
Scrivi una funzione Python.
```

---

Prompt avanzato:

```
Analizza il problema.

Definisci prima l'algoritmo.

Individua casi limite.

Scrivi il codice Python.

Aggiungi test automatici.

Spiega il funzionamento.
```

---

Risultato:

- codice più affidabile;
- migliore documentazione;
- meno errori.

---

# Esempio sviluppo software

Problema:

```
Creare un sistema di login.
```

---

Approccio strutturato:

## Analisi

Necessità:

- gestione utenti;
- autenticazione;
- sicurezza password.

---

## Progettazione

Componenti:

```
Database

↓

API

↓

Frontend

↓

Gestione sessione
```

---

## Implementazione

Creazione codice.

---

## Verifica

Test:

- login corretto;
- password errata;
- utente inesistente.

---

# 3.6 Chain of Thought e Data Analysis

[⬆️ Torna all'Indice](#indice)

Nell'analisi dati il ragionamento strutturato permette di seguire una metodologia.

---

Esempio:

Dataset vendite.

Obiettivo:

```
Capire perché sono diminuite le vendite.
```

---

Approccio corretto:

```
1. Analizzare periodo temporale.

2. Confrontare categorie prodotto.

3. Cercare anomalie.

4. Individuare correlazioni.

5. Proporre strategie.
```

---

L'AI diventa un supporto analitico.

---

# 3.7 Limiti del Chain of Thought

[⬆️ Torna all'Indice](#indice)

Il Chain of Thought non significa che l'AI "pensa" come un essere umano.

Gli LLM:

- non possiedono coscienza;
- non comprendono realmente il mondo;
- generano sequenze linguistiche plausibili.

---

Il ragionamento prodotto deve sempre essere verificato.

---

Possibili problemi:

## Allucinazioni

Il modello può produrre informazioni inesistenti.

---

## Errori logici

Un percorso apparentemente corretto può contenere errori.

---

## Eccessiva sicurezza

Una risposta può sembrare convincente ma essere sbagliata.

---

# 3.8 Approccio professionale al Reasoning Prompting

[⬆️ Torna all'Indice](#indice)

Un professionista utilizza il reasoning come strumento di organizzazione.

Non chiede semplicemente:

```
Dammi la risposta.
```

---

Ma:

```
Analizza il problema.

Definisci criteri.

Confronta alternative.

Verifica il risultato.

Fornisci la soluzione finale.
```

---

# Template Reasoning Professionale

[⬆️ Torna all'Indice](#indice)

Esempio riutilizzabile:

```
RUOLO:

Agisci come esperto di [campo].


OBIETTIVO:

Devi risolvere [problema].


METODO:

1. Analizza il contesto.

2. Identifica problemi principali.

3. Proponi alternative.

4. Valuta vantaggi e svantaggi.

5. Fornisci soluzione finale.


OUTPUT:

Organizza la risposta in sezioni Markdown.
```

---

# Applicazioni nella piattaforma gcprof-academy

[⬆️ Torna all'Indice](#indice)

Il Reasoning Prompting può essere utilizzato per:

## Generazione lezioni

Processo:

```
Argomento

↓

Analisi competenze

↓

Struttura modulo

↓

Lezione Markdown
```

---

## Creazione quiz

Processo:

```
Obiettivi didattici

↓

Concetti chiave

↓

Domande

↓

Soluzioni
```

---

## Tutor AI studenti

Processo:

```
Domanda studente

↓

Analisi livello

↓

Spiegazione personalizzata

↓

Esercizio adattivo
```

---

# Best Practice

[⬆️ Torna all'Indice](#indice)

✔ Utilizzare il ragionamento per problemi complessi.

✔ Dividere problemi grandi in parti più piccole.

✔ Richiedere criteri di valutazione.

✔ Verificare sempre il risultato.

✔ Non considerare l'output AI automaticamente corretto.

---

# Errori comuni

[⬆️ Torna all'Indice](#indice)

## Chiedere direttamente la soluzione

Problema:

```
Risolvi tutto.
```

---

Soluzione:

guidare il processo.

---

## Mancanza di obiettivo

Problema:

L'AI non conosce il risultato atteso.

---

## Nessuna verifica finale

Problema:

Possibili errori non individuati.

---

# Sintesi della Parte 3

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo studiato:

- Chain of Thought;
- Reasoning Prompting;
- decomposizione dei problemi;
- Self-Consistency;
- applicazioni nel coding;
- applicazioni nella Data Analysis;
- limiti del ragionamento generato dagli LLM.

Il Reasoning Prompting rappresenta un passaggio fondamentale verso un utilizzo professionale dell'Intelligenza Artificiale.

---

# Verifica rapida

## Domanda 1

Il Chain of Thought serve principalmente a:

A. Aumentare la memoria del computer

B. Guidare la risoluzione di problemi complessi attraverso passaggi strutturati

C. Sostituire Python

D. Eliminare il bisogno di verifica

**Risposta corretta:** B

---

## Domanda 2

La decomposizione di un problema consiste nel:

A. Eliminare parti del problema

B. Dividere un problema complesso in parti più semplici

C. Copiare codice

D. Ridurre il numero di dati

**Risposta corretta:** B

---

## Domanda 3

Gli output generati con Reasoning Prompting devono essere:

A. Sempre considerati corretti

B. Verificati criticamente

C. Ignorati

D. Eliminati

**Risposta corretta:** B

---

[⬆️ Torna all'Indice](#indice)

---

<a id="chaining"></a>

# 4. Prompt Chaining e Workflow AI

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Nel Prompt Engineering avanzato un singolo prompt spesso non è sufficiente per risolvere problemi complessi.

Le attività professionali richiedono frequentemente:

- analisi preliminare;
- raccolta informazioni;
- trasformazione dei dati;
- generazione contenuti;
- verifica finale.

Per questo motivo nasce il concetto di:

```
Prompt Chaining
```

ovvero la progettazione di una sequenza organizzata di prompt collegati tra loro.

---

# 4.1 Che cos'è il Prompt Chaining

[⬆️ Torna all'Indice](#indice)

Il Prompt Chaining consiste nel suddividere un obiettivo complesso in una serie di attività più semplici.

Ogni prompt produce un risultato che diventa l'input del prompt successivo.

Schema:

```
Prompt 1

↓

Output 1

↓

Prompt 2

↓

Output 2

↓

Prompt 3

↓

Risultato finale
```

---

Invece di chiedere:

```
Crea un corso completo di Intelligenza Artificiale.
```

si costruisce un processo:

```
Analizza destinatari

↓

Definisci obiettivi

↓

Crea struttura moduli

↓

Scrivi lezioni

↓

Genera esercizi

↓

Crea quiz
```

---

# 4.2 Perché utilizzare il Prompt Chaining

[⬆️ Torna all'Indice](#indice)

I problemi complessi presentano generalmente:

- molte informazioni;
- molte decisioni;
- diversi livelli di controllo.

Un singolo prompt può diventare:

- troppo lungo;
- poco controllabile;
- difficile da correggere.

---

Il Prompt Chaining permette:

## Maggiore controllo

Ogni fase può essere verificata.

---

## Maggiore precisione

Ogni prompt ha un obiettivo specifico.

---

## Maggiore riutilizzabilità

Le singole fasi possono essere utilizzate in altri progetti.

---

# Confronto tra approccio semplice e chaining

[⬆️ Torna all'Indice](#indice)

## Approccio tradizionale

```
Richiesta completa

↓

LLM

↓

Risposta finale
```

Problemi:

- difficile correggere errori;
- poco controllo;
- risultato variabile.

---

## Approccio con Prompt Chaining

```
Analisi

↓

Progettazione

↓

Produzione

↓

Controllo qualità

↓

Output finale
```

Vantaggi:

- processo verificabile;
- maggiore qualità;
- facile manutenzione.

---

# 4.3 Tipologie di Prompt Chain

[⬆️ Torna all'Indice](#indice)

Esistono diverse architetture di concatenazione.

---

# Sequential Chain

È il modello più semplice.

Ogni fase utilizza il risultato della precedente.

Schema:

```
A

↓

B

↓

C

↓

D
```

---

Esempio:

Creazione articolo:

```
Ricerca argomento

↓

Creazione struttura

↓

Scrittura contenuto

↓

Revisione finale
```

---

# Parallel Chain

Più attività vengono eseguite contemporaneamente.

Schema:

```
             ┌── Analisi dati

Input

             ├── Analisi mercato

             └── Analisi utenti
```

---

Successivamente i risultati vengono combinati.

---

Utilizzo:

- report aziendali;
- analisi complesse;
- raccolta informazioni.

---

# Iterative Chain

Il risultato viene migliorato attraverso cicli successivi.

Schema:

```
Prima versione

↓

Analisi

↓

Correzione

↓

Nuova versione

↓

Ottimizzazione
```

---

È molto utilizzato per:

- scrittura;
- programmazione;
- progettazione.

---

# 4.4 Workflow AI

[⬆️ Torna all'Indice](#indice)

Un Workflow AI è un processo organizzato dove l'intelligenza artificiale interviene in più fasi.

Non rappresenta solo una conversazione con un chatbot.

È un sistema operativo basato su:

- obiettivi;
- strumenti;
- dati;
- controlli.

---

Schema generale:

```
Input

↓

Analisi

↓

Elaborazione AI

↓

Verifica

↓

Output

↓

Azione
```

---

# Esempio Workflow AI per produzione didattica

[⬆️ Torna all'Indice](#indice)

Obiettivo:

Creare una nuova unità didattica.

---

Workflow:

```
Input:

Argomento corso


↓

AI 1:

Analisi competenze


↓

AI 2:

Creazione struttura modulo


↓

AI 3:

Generazione lezioni Markdown


↓

AI 4:

Creazione quiz


↓

AI 5:

Controllo qualità
```

---

Risultato:

Materiale pronto per caricamento LMS.

---

# 4.5 Prompt Chaining nello sviluppo software

[⬆️ Torna all'Indice](#indice)

Nel coding il Prompt Chaining permette di trasformare l'AI in un assistente di sviluppo.

---

Esempio:

Obiettivo:

Creare una nuova funzionalità software.

---

## Fase 1 — Analisi requisiti

Prompt:

```
Analizza questi requisiti software.

Identifica:

- funzionalità;
- vincoli;
- possibili problemi.
```

---

Output:

Documento analisi.

---

## Fase 2 — Progettazione

Prompt:

```
Utilizzando l'analisi precedente,
progetta:

- struttura file;
- componenti;
- database;
- API.
```

---

Output:

Architettura.

---

## Fase 3 — Implementazione

Prompt:

```
Genera il codice rispettando
l'architettura definita.
```

---

Output:

Codice sorgente.

---

## Fase 4 — Testing

Prompt:

```
Analizza il codice.

Genera:

- test;
- casi limite;
- possibili errori.
```

---

Output:

Piano verifica.

---

# 4.6 Prompt Chaining e RAG

[⬆️ Torna all'Indice](#indice)

Nei sistemi moderni basati su LLM viene spesso utilizzato insieme al:

```
RAG

Retrieval Augmented Generation
```

---

Schema:

```
Domanda utente

↓

Ricerca documenti

↓

Recupero informazioni

↓

Prompt arricchito

↓

LLM

↓

Risposta
```

---

Il Prompt Chaining permette di organizzare:

- ricerca;
- selezione;
- analisi;
- generazione.

---

# 4.7 Workflow AI con strumenti esterni

[⬆️ Torna all'Indice](#indice)

Gli AI Agent moderni possono utilizzare strumenti esterni.

Esempio:

```
LLM

↓

Decisione

↓

Tool

↓

Risultato

↓

Nuova elaborazione
```

---

Gli strumenti possono essere:

- database;
- API;
- motori di ricerca;
- sistemi aziendali;
- file locali.

---

# 4.8 Progettare un Workflow AI professionale

[⬆️ Torna all'Indice](#indice)

Un workflow efficace deve definire:

---

## Obiettivo

Che cosa deve essere ottenuto?

---

## Input

Quali dati sono disponibili?

---

## Processo

Quali fasi deve seguire l'AI?

---

## Controllo

Come viene verificato il risultato?

---

## Output

Quale formato deve essere prodotto?

---

Schema:

```
Obiettivo

↓

Input

↓

Prompt Chain

↓

Validazione

↓

Output finale
```

---

# 4.9 Errori comuni nel Prompt Chaining

[⬆️ Torna all'Indice](#indice)

## Catena troppo lunga

Problema:

Troppi passaggi aumentano complessità.

Soluzione:

mantenere solo le fasi necessarie.

---

## Mancanza di verifica

Problema:

Un errore iniziale viene propagato.

Soluzione:

inserire controlli intermedi.

---

## Prompt poco definiti

Problema:

Ogni fase produce risultati incoerenti.

Soluzione:

definire chiaramente:

- input;
- output;
- formato.

---

# Applicazioni nella piattaforma gcprof-academy

[⬆️ Torna all'Indice](#indice)

Il Prompt Chaining può essere integrato nella piattaforma per:

---

## Creazione automatica corsi

Workflow:

```
Idea corso

↓

Programma

↓

Moduli

↓

Lezioni Markdown

↓

Quiz

↓

Pubblicazione
```

---

## Tutor AI personalizzato

Workflow:

```
Domanda studente

↓

Analisi livello

↓

Recupero materiale corso

↓

Spiegazione personalizzata

↓

Esercizio
```

---

## Generazione verifiche

Workflow:

```
Obiettivi modulo

↓

Concetti chiave

↓

Domande

↓

Soluzioni

↓

Valutazione
```

---

# Best Practice

[⬆️ Torna all'Indice](#indice)

✔ Suddividere problemi complessi.

✔ Definire obiettivi per ogni fase.

✔ Controllare gli output intermedi.

✔ Riutilizzare catene efficaci.

✔ Documentare i workflow creati.

---

# Sintesi della Parte 4

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo approfondito:

- significato del Prompt Chaining;
- differenza tra prompt singolo e workflow;
- Sequential, Parallel e Iterative Chain;
- progettazione di Workflow AI;
- utilizzo nel coding;
- utilizzo nei sistemi RAG;
- applicazioni educative.

Il Prompt Chaining rappresenta il passaggio fondamentale dal semplice utilizzo degli LLM alla progettazione di processi AI completi.

---

# Verifica rapida

## Domanda 1

Il Prompt Chaining consiste nel:

A. Eliminare i prompt

B. Collegare più prompt in un processo organizzato

C. Sostituire il modello AI

D. Aumentare la RAM

**Risposta corretta:** B

---

## Domanda 2

Un Workflow AI contiene generalmente:

A. Solo un prompt

B. Obiettivi, dati, processi e controlli

C. Solo codice

D. Solo immagini

**Risposta corretta:** B

---

## Domanda 3

Perché inserire controlli intermedi?

A. Per individuare errori prima del risultato finale

B. Per rallentare il sistema

C. Per eliminare i dati

D. Per sostituire l'utente

**Risposta corretta:** A

---

[⬆️ Torna all'Indice](#indice)

---

<a id="structured"></a>

# 5. Structured Output: Markdown, JSON e Tabelle

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Nei primi approcci agli LLM l'attenzione era concentrata principalmente sulla qualità del testo generato.

In ambito professionale, però, non è sufficiente ottenere una risposta corretta.

Un sistema AI deve spesso produrre risultati:

- leggibili dagli esseri umani;
- elaborabili automaticamente dai software;
- compatibili con database;
- integrabili tramite API;
- facilmente archiviabili.

Per questo motivo diventa fondamentale il concetto di:

```
Structured Output
```

ovvero la capacità di guidare l'AI verso un formato di risposta preciso.

---

# 5.1 Che cos'è uno Structured Output

[⬆️ Torna all'Indice](#indice)

Uno Structured Output è una risposta generata secondo una struttura predefinita.

Esempio:

Prompt generico:

```
Analizza questo prodotto.
```

Output:

```
Il prodotto è interessante...
```

---

Prompt strutturato:

```
Analizza questo prodotto.

Restituisci il risultato nel seguente formato:

Nome:
Categoria:
Punti di forza:
Punti deboli:
Valutazione finale:
```

Output:

```
Nome:
Smartphone X

Categoria:
Tecnologia

Punti di forza:
...

Punti deboli:
...

Valutazione:
...
```

---

La seconda risposta è più facile da:

- leggere;
- confrontare;
- elaborare.

---

# 5.2 Perché il formato dell'output è importante

[⬆️ Torna all'Indice](#indice)

Un LLM produce testo, ma molte applicazioni richiedono dati organizzati.

Esempi:

## Applicazione web

Necessita di:

```
JSON

↓

Frontend

↓

Visualizzazione dati
```

---

## Database

Necessita di:

```
Campi strutturati

↓

Record

↓

Archiviazione
```

---

## Documentazione

Necessita di:

```
Markdown

↓

Titoli

↓

Tabelle

↓

Codice
```

---

Il formato diventa quindi parte del progetto.

---

# 5.3 Markdown come formato professionale

[⬆️ Torna all'Indice](#indice)

Markdown è uno dei formati più utilizzati per:

- documentazione tecnica;
- corsi online;
- repository GitHub;
- knowledge base.

---

Esempio:

```markdown
# Titolo

## Introduzione

Testo descrittivo.

## Esempio

```python
print("Hello AI")
```
```

---

Vantaggi:

✔ semplice;

✔ leggibile;

✔ versionabile con Git;

✔ compatibile con molte piattaforme.

---

# Utilizzo Markdown nella gcprof-academy

[⬆️ Torna all'Indice](#indice)

La piattaforma può utilizzare Markdown per:

- lezioni;
- guide;
- esercizi;
- quiz;
- documentazione tecnica.

---

Workflow:

```
Prompt AI

↓

Documento Markdown

↓

Parser

↓

Database Supabase

↓

Lezione LMS
```

---

# 5.4 Tabelle strutturate

[⬆️ Torna all'Indice](#indice)

Le tabelle sono utili quando bisogna confrontare informazioni.

---

Esempio prompt:

```
Confronta tre modelli AI.

Utilizza una tabella Markdown con:

- nome;
- caratteristiche;
- vantaggi;
- limiti.
```

---

Output:

| Modello | Caratteristiche | Vantaggi | Limiti |
|---|---|---|---|
| Modello A | Testo | Velocità | Meno preciso |
| Modello B | Multimodale | Versatile | Maggiore costo |

---

Applicazioni:

- analisi comparative;
- report;
- valutazioni.

---

# 5.5 JSON come formato per applicazioni software

[⬆️ Torna all'Indice](#indice)

JSON:

```
JavaScript Object Notation
```

è un formato molto utilizzato per lo scambio dati.

---

Esempio:

```json
{
  "nome": "Mario",
  "corso": "Intelligenza Artificiale",
  "livello": "Intermedio"
}
```

---

Rispetto al testo libero:

Testo:

```
Mario frequenta il corso AI livello intermedio.
```

---

JSON:

```json
{
 "nome":"Mario",
 "corso":"AI",
 "livello":"Intermedio"
}
```

---

Il secondo formato può essere utilizzato direttamente da un programma.

---

# 5.6 Prompt per generare JSON

[⬆️ Torna all'Indice](#indice)

Esempio:

```
Genera un oggetto JSON valido.

Utilizza questa struttura:

{
 nome:"",
 categoria:"",
 descrizione:"",
 livello:""
}

Non aggiungere testo esterno.
```

---

Output:

```json
{
 "nome":"Machine Learning",
 "categoria":"AI",
 "descrizione":"Studio degli algoritmi che apprendono dai dati",
 "livello":"Intermedio"
}
```

---

Questo approccio è fondamentale nello sviluppo software.

---

# 5.7 JSON e API

[⬆️ Torna all'Indice](#indice)

Le moderne applicazioni comunicano attraverso API.

Schema:

```
Frontend

↓

API

↓

Backend

↓

Database
```

---

I dati viaggiano spesso in formato JSON.

---

Esempio:

Richiesta:

```json
{
 "utente":"123",
 "azione":"iscrizione"
}
```

---

Risposta:

```json
{
 "status":"success",
 "corso":"AI Base"
}
```

---

Gli LLM possono essere utilizzati per generare, analizzare e trasformare questi dati.

---

# 5.8 Structured Output e Database

[⬆️ Torna all'Indice](#indice)

Un database relazionale necessita di dati organizzati.

---

Esempio:

Tabella studenti:

| id | nome | corso | livello |
|-|-|-|-|
|1|Anna|AI|Base|

---

Un LLM può trasformare:

```
Testo libero

↓

JSON

↓

Record database
```

---

Workflow:

```
Documento

↓

LLM

↓

Estrazione dati

↓

JSON

↓

Database
```

---

Applicazioni:

- gestione studenti;
- cataloghi;
- questionari;
- report automatici.

---

# 5.9 Output strutturati per Quiz AI

[⬆️ Torna all'Indice](#indice)

Nella piattaforma gcprof-academy i quiz possono essere generati in formato strutturato.

---

Esempio:

```json
{
 "domanda":"Cos'è un LLM?",
 "opzioni":[
  "Un database",
  "Un modello linguistico",
  "Un sistema operativo"
 ],
 "risposta_corretta":2
}
```

---

Vantaggi:

- importazione automatica;
- validazione;
- archiviazione database.

---

# 5.10 Structured Output e AI Agent

[⬆️ Torna all'Indice](#indice)

Gli AI Agent necessitano di risposte prevedibili.

Un agente non può lavorare efficacemente con testo casuale.

---

Esempio:

Un agente deve decidere un'azione.

Output libero:

```
Forse sarebbe meglio inviare una mail.
```

---

Output strutturato:

```json
{
 "azione":"send_email",
 "destinatario":"utente",
 "priorita":"alta"
}
```

---

Il software può eseguire automaticamente l'azione.

---

# 5.11 Best Practice

[⬆️ Torna all'Indice](#indice)

✔ Specificare sempre il formato desiderato.

✔ Definire campi obbligatori.

✔ Evitare testo aggiuntivo quando serve JSON.

✔ Validare sempre gli output.

✔ Utilizzare strutture standardizzate.

---

# Errori comuni

[⬆️ Torna all'Indice](#indice)

## Output non definito

Problema:

Risposte diverse ad ogni richiesta.

---

## JSON non valido

Problema:

Il software non riesce a interpretarlo.

---

## Mancanza di schema

Problema:

Dati incompleti.

---

# Applicazioni nella piattaforma gcprof-academy

[⬆️ Torna all'Indice](#indice)

Gli Structured Output permettono di creare:

## Generatore automatico lezioni

```
Prompt

↓

Markdown

↓

CMS corso
```

---

## Generatore quiz

```
Prompt

↓

JSON

↓

Database quiz
```

---

## Analisi studenti

```
Dati studenti

↓

AI

↓

Report strutturato
```

---

# Sintesi della Parte 5

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo studiato:

- Structured Output;
- importanza del formato;
- Markdown;
- Tabelle;
- JSON;
- integrazione con API;
- database;
- AI Agent.

La capacità di ottenere output strutturati rappresenta uno degli elementi fondamentali per trasformare un LLM da semplice chatbot a componente software professionale.

---

# Verifica rapida

## Domanda 1

Uno Structured Output serve principalmente a:

A. Rendere casuale la risposta

B. Organizzare l'output in un formato utilizzabile

C. Eliminare il prompt

D. Aumentare la RAM

**Risposta corretta:** B

---

## Domanda 2

JSON viene utilizzato principalmente per:

A. Disegnare immagini

B. Scambiare dati tra applicazioni

C. Sostituire il sistema operativo

D. Creare hardware

**Risposta corretta:** B

---

## Domanda 3

Perché gli AI Agent richiedono output strutturati?

A. Per poter interpretare automaticamente le informazioni

B. Per evitare Internet

C. Per sostituire il database

D. Per eliminare il codice

**Risposta corretta:** A

---

[⬆️ Torna all'Indice](#indice)

---

<a id="context"></a>

# 6. Role Prompting e Context Engineering

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Uno degli aspetti più importanti del Prompt Engineering avanzato riguarda la capacità di definire correttamente:

- il ruolo dell'AI;
- il contesto operativo;
- gli obiettivi;
- le regole di comportamento.

Queste tecniche permettono di trasformare un Large Language Model generico in un assistente specializzato.

---

Un modello AI senza contesto può essere rappresentato come:

```
Utente

↓

Domanda

↓

LLM

↓

Risposta generica
```

---

Un modello con Role Prompting e Context Engineering diventa:

```
Utente

↓

Ruolo

↓

Contesto

↓

Obiettivo

↓

Vincoli

↓

LLM

↓

Risposta specializzata
```

---

# 6.1 Che cos'è il Role Prompting

[⬆️ Torna all'Indice](#indice)

Il **Role Prompting** consiste nell'assegnare all'LLM un ruolo specifico prima di formulare la richiesta.

---

Esempio:

Prompt generico:

```
Spiega il Machine Learning.
```

---

Prompt con ruolo:

```
Agisci come docente universitario
di Intelligenza Artificiale.

Spiega il Machine Learning.
```

---

Il secondo prompt fornisce:

- livello professionale;
- stile comunicativo;
- punto di vista;
- criteri di risposta.

---

# 6.2 Perché il ruolo migliora la risposta

[⬆️ Torna all'Indice](#indice)

Gli LLM sono modelli generalisti.

Sono stati addestrati su enormi quantità di testi:

- libri;
- articoli;
- documentazione;
- codice;
- conversazioni.

---

Quando assegniamo un ruolo, riduciamo lo spazio delle possibili risposte.

Schema:

```
Modello generale

        ↓

Ruolo definito

        ↓

Risposta più coerente
```

---

Esempio:

Stessa domanda:

```
Come posso migliorare il codice?
```

---

Ruolo 1:

```
Agisci come senior software engineer.
```

Risultato:

- qualità codice;
- architettura;
- sicurezza.

---

Ruolo 2:

```
Agisci come docente per studenti principianti.
```

Risultato:

- spiegazione didattica;
- esempi semplici;
- esercizi.

---

# 6.3 Tipologie di ruolo

[⬆️ Torna all'Indice](#indice)

Un ruolo può essere definito in base allo scopo.

---

## Ruolo tecnico

Esempio:

```
Agisci come sviluppatore Python senior.
```

Utilizzo:

- coding;
- debugging;
- progettazione software.

---

## Ruolo educativo

Esempio:

```
Agisci come insegnante di Informatica.
```

Utilizzo:

- lezioni;
- esercizi;
- verifiche.

---

## Ruolo analitico

Esempio:

```
Agisci come data analyst.
```

Utilizzo:

- dataset;
- report;
- statistiche.

---

## Ruolo creativo

Esempio:

```
Agisci come content designer.
```

Utilizzo:

- testi;
- campagne;
- storytelling.

---

# 6.4 Template Role Prompting professionale

[⬆️ Torna all'Indice](#indice)

Un modello riutilizzabile:

```text
RUOLO:

Agisci come [professionista]


COMPETENZE:

Hai esperienza in:

- competenza 1
- competenza 2


OBIETTIVO:

Devi aiutarmi a:


VINCOLI:

Rispetta queste regole:


OUTPUT:

Produci la risposta in formato:
```

---

Questo schema permette di creare assistenti specializzati.

---

# 6.5 Che cos'è il Context Engineering

[⬆️ Torna all'Indice](#indice)

Il Context Engineering rappresenta un'evoluzione del Prompt Engineering.

Non riguarda solo:

```
Cosa chiedo all'AI?
```

ma:

```
Quali informazioni devo fornire
per ottenere il miglior risultato?
```

---

Il contesto comprende:

- ruolo;
- informazioni iniziali;
- documenti;
- esempi;
- dati;
- vincoli;
- memoria della conversazione.

---

# 6.6 La finestra di contesto (Context Window)

[⬆️ Torna all'Indice](#indice)

Ogni LLM possiede una quantità massima di informazioni che può elaborare contemporaneamente.

Questa capacità viene chiamata:

```
Context Window
```

---

Schema:

```
Context Window

┌─────────────────────┐
│ Istruzioni          │
│ Dati                │
│ Conversazione       │
│ Documenti           │
│ Prompt              │
└─────────────────────┘

          ↓

         LLM
```

---

Se il contesto supera il limite:

- alcune informazioni possono essere ignorate;
- la qualità può diminuire;
- il modello può perdere riferimenti precedenti.

---

# 6.7 Context Engineering e documenti

[⬆️ Torna all'Indice](#indice)

Nei sistemi professionali l'AI viene spesso alimentata con documentazione esterna.

Esempio:

Un assistente aziendale riceve:

```
Manuale aziendale

+

Regolamenti

+

Procedure

+

Database
```

---

Il modello può quindi rispondere basandosi su informazioni specifiche.

---

Questo principio è alla base dei sistemi:

```
RAG

Retrieval Augmented Generation
```

---

# 6.8 Context Engineering e RAG

[⬆️ Torna all'Indice](#indice)

Un sistema RAG funziona attraverso:

```
Domanda utente

↓

Ricerca informazioni

↓

Recupero documenti rilevanti

↓

Creazione contesto

↓

LLM

↓

Risposta
```

---

Vantaggi:

- informazioni aggiornate;
- maggiore precisione;
- riduzione delle allucinazioni.

---

# 6.9 Memoria e personalizzazione

[⬆️ Torna all'Indice](#indice)

Un assistente AI può utilizzare informazioni precedenti per migliorare l'interazione.

---

Esistono diversi tipi di memoria:

## Memoria della sessione

Informazioni presenti nella conversazione corrente.

---

## Memoria persistente

Informazioni salvate per utilizzi futuri.

---

## Knowledge Base

Documentazione esterna consultabile.

---

Schema:

```
Utente

↓

Memoria

↓

Contesto

↓

LLM

↓

Risposta personalizzata
```

---

# 6.10 Progettare un Assistente AI specializzato

[⬆️ Torna all'Indice](#indice)

Un assistente professionale richiede:

---

## Identità

Chi è?

Esempio:

```
Tutor di programmazione Python.
```

---

## Competenze

Cosa conosce?

Esempio:

```
Python, algoritmi, database.
```

---

## Obiettivo

Cosa deve fare?

Esempio:

```
Aiutare studenti principianti.
```

---

## Regole

Come deve rispondere?

Esempio:

```
Spiega prima la teoria,
poi fornisci esempi.
```

---

## Formato

Come deve produrre l'output?

Esempio:

```
Markdown con codice evidenziato.
```

---

# 6.11 Applicazioni nella gcprof-academy

[⬆️ Torna all'Indice](#indice)

Il Role Prompting e il Context Engineering sono fondamentali per creare:

---

## Tutor AI personale

Configurazione:

```
Ruolo:

Tutor Informatica


Contesto:

Materiale corso


Obiettivo:

Supportare studenti


Output:

Spiegazioni + esercizi
```

---

## Assistente docente

Funzioni:

- preparazione lezioni;
- creazione quiz;
- correzione esercizi;
- suggerimenti didattici.

---

## Generatore contenuti LMS

Workflow:

```
Programma corso

↓

Contesto didattico

↓

LLM

↓

Modulo Markdown
```

---

# 6.12 Best Practice

[⬆️ Torna all'Indice](#indice)

✔ Definire sempre il ruolo.

✔ Fornire contesto sufficiente.

✔ Separare istruzioni e dati.

✔ Specificare formato output.

✔ Aggiornare il contesto quando necessario.

✔ Verificare le informazioni prodotte.

---

# Errori comuni

[⬆️ Torna all'Indice](#indice)

## Ruolo troppo generico

Problema:

```
Agisci come esperto.
```

Soluzione:

specificare settore e competenze.

---

## Contesto insufficiente

Problema:

L'AI deve fare supposizioni.

---

## Troppo contesto inutile

Problema:

Informazioni irrilevanti riducono efficacia.

---

## Mancanza di regole

Problema:

Risposte incoerenti.

---

# Sintesi della Parte 6

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo approfondito:

- Role Prompting;
- Context Engineering;
- Context Window;
- memoria;
- RAG;
- progettazione di assistenti AI specializzati.

La combinazione tra ruolo e contesto rappresenta uno dei principali strumenti per trasformare un LLM generico in un sistema AI professionale.

---

# Verifica rapida

## Domanda 1

Il Role Prompting serve a:

A. Modificare fisicamente il modello AI

B. Assegnare un comportamento e una prospettiva al modello

C. Aumentare la memoria RAM

D. Creare un database

**Risposta corretta:** B

---

## Domanda 2

Il Context Engineering riguarda:

A. Solo la domanda iniziale

B. La progettazione delle informazioni fornite al modello

C. La velocità della CPU

D. La grafica

**Risposta corretta:** B

---

## Domanda 3

Un sistema RAG utilizza:

A. Solo il modello AI

B. Documenti esterni per arricchire il contesto

C. Nessun dato

D. Solo immagini

**Risposta corretta:** B

---

[⬆️ Torna all'Indice](#indice)

---

<a id="coding"></a>

# 7. LLM come Assistente per Coding Python

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Uno degli utilizzi più importanti degli Large Language Model riguarda il supporto allo sviluppo software.

Gli LLM possono essere utilizzati come:

- assistenti alla programmazione;
- strumenti di analisi del codice;
- generatori di documentazione;
- supporto al debugging;
- strumenti per apprendere nuovi linguaggi.

Questo approccio viene spesso definito:

```
AI Pair Programming
```

ovvero programmazione collaborativa tra sviluppatore e Intelligenza Artificiale.

---

# 7.1 Il concetto di AI Pair Programming

[⬆️ Torna all'Indice](#indice)

Nel modello tradizionale:

```
Programmatore

↓

Scrive codice

↓

Test

↓

Correzione errori
```

---

Con un assistente AI:

```
Programmatore

↓

Descrive obiettivo

↓

LLM propone soluzione

↓

Analisi codice

↓

Test

↓

Miglioramento
```

---

L'AI non sostituisce lo sviluppatore.

Diventa uno strumento per:

- aumentare produttività;
- ridurre errori;
- velocizzare apprendimento.

---

# 7.2 Il ruolo corretto dell'LLM nello sviluppo

[⬆️ Torna all'Indice](#indice)

Un errore comune è considerare l'AI come un semplice generatore automatico di codice.

Un approccio professionale prevede invece:

```
Analisi

↓

Progettazione

↓

Implementazione

↓

Verifica

↓

Ottimizzazione
```

---

L'LLM deve essere utilizzato come:

## Assistente tecnico

Aiuta nelle decisioni.

---

## Revisore del codice

Individua problemi.

---

## Tutor

Spiega concetti.

---

## Generatore di soluzioni

Propone implementazioni.

---

# 7.3 Prompt Engineering per il Coding

[⬆️ Torna all'Indice](#indice)

Un prompt generico produce spesso codice poco affidabile.

---

Prompt debole:

```
Scrivi una funzione Python.
```

---

Problemi:

- manca obiettivo;
- manca contesto;
- manca gestione errori;
- manca formato.

---

Prompt professionale:

```
Agisci come sviluppatore Python senior.

Devi creare una funzione che analizzi
un file CSV contenente dati finanziari.

Requisiti:

- utilizza Python 3;
- utilizza pandas;
- gestisci file mancanti;
- aggiungi controlli sugli errori;
- inserisci commenti nel codice.

Produci:

1. spiegazione;
2. codice;
3. esempio di utilizzo;
4. test.
```

---

Risultato:

- codice più coerente;
- maggiore qualità;
- migliore manutenzione.

---

# 7.4 LLM per progettazione software

[⬆️ Torna all'Indice](#indice)

Prima di scrivere codice è spesso utile utilizzare l'AI per progettare la soluzione.

---

Esempio:

Obiettivo:

```
Creare un'applicazione gestione studenti.
```

---

Prompt:

```
Analizza il progetto.

Definisci:

- requisiti funzionali;
- architettura software;
- database necessario;
- componenti principali;
- possibili problemi.
```

---

Output:

```
Analisi requisiti

↓

Architettura

↓

Piano sviluppo
```

---

Questo riduce gli errori nelle fasi successive.

---

# 7.5 Generazione codice Python

[⬆️ Torna all'Indice](#indice)

Gli LLM possono generare codice per:

- funzioni;
- classi;
- script;
- algoritmi;
- notebook;
- automazioni.

---

Esempio:

Richiesta:

```
Crea una classe Python per gestire studenti.
```

---

Possibile struttura:

```python
class Student:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def show_info(self):
        return f"{self.name} - {self.age}"
```

---

Tuttavia il codice generato deve sempre essere:

- letto;
- compreso;
- testato.

---

# 7.6 Debugging assistito dall'AI

[⬆️ Torna all'Indice](#indice)

Uno degli utilizzi più efficaci degli LLM è l'analisi degli errori.

---

Workflow:

```
Errore

↓

Invio codice

↓

Analisi AI

↓

Spiegazione problema

↓

Correzione

↓

Test
```

---

Esempio prompt:

```
Analizza questo errore Python.

Spiega:

1. causa del problema;
2. riga interessata;
3. soluzione;
4. come evitare l'errore in futuro.
```

---

L'AI diventa un debugger didattico.

---

# 7.7 Refactoring del codice

[⬆️ Torna all'Indice](#indice)

Il refactoring consiste nel migliorare codice esistente senza modificarne il comportamento.

---

L'LLM può aiutare a:

- migliorare leggibilità;
- eliminare duplicazioni;
- ottimizzare struttura;
- applicare principi SOLID.

---

Prompt esempio:

```
Analizza questo codice Python.

Proponi un refactoring migliorando:

- leggibilità;
- modularità;
- manutenibilità.

Mantieni lo stesso comportamento.
```

---

# 7.8 Generazione di test automatici

[⬆️ Torna all'Indice](#indice)

Un codice professionale deve essere verificato.

Gli LLM possono generare:

- test unitari;
- casi limite;
- dati di prova.

---

Esempio:

Codice:

```python
def divide(a,b):
    return a/b
```

---

Prompt:

```
Genera test automatici per questa funzione.

Considera:

- valori normali;
- divisione per zero;
- input errati.
```

---

Output:

Test più completi.

---

# 7.9 LLM e ambiente VS Code

[⬆️ Torna all'Indice](#indice)

Un ambiente moderno di sviluppo può integrare:

- VS Code;
- estensioni AI;
- modelli locali;
- repository Git.

---

Workflow:

```
VS Code

↓

Assistente AI

↓

Codice locale

↓

Git

↓

Test
```

---

Nel contesto didattico questo permette agli studenti di:

- sviluppare localmente;
- comprendere il codice;
- sperimentare senza dipendenze cloud.

---

# 7.10 Utilizzo di modelli locali

[⬆️ Torna all'Indice](#indice)

Un'alternativa ai servizi cloud è l'utilizzo di LLM locali.

Esempio:

```
Computer locale

↓

Modello AI

↓

VS Code

↓

Sviluppo software
```

---

Vantaggi:

✔ privacy dei dati;

✔ nessuna dipendenza esterna;

✔ possibilità di sperimentare.

---

Svantaggi:

- richiesta hardware adeguato;
- modelli meno potenti rispetto ai migliori servizi cloud.

---

# 7.11 Workflow professionale Coding + AI

[⬆️ Torna all'Indice](#indice)

Un processo consigliato:

```
1. Definizione problema

↓

2. Analisi requisiti

↓

3. Progettazione soluzione

↓

4. Generazione codice

↓

5. Revisione umana

↓

6. Testing

↓

7. Ottimizzazione
```

---

Il controllo umano rimane fondamentale.

---

# 7.12 Errori comuni nell'utilizzo dell'AI per Coding

[⬆️ Torna all'Indice](#indice)

## Copiare codice senza comprenderlo

Problema:

Lo sviluppatore non conosce il funzionamento.

---

## Fidarsi completamente dell'output

Problema:

Il codice può contenere errori.

---

## Mancanza di test

Problema:

Il codice non verificato può fallire.

---

## Prompt troppo generici

Problema:

Risultati poco affidabili.

---

# 7.13 Applicazioni nella gcprof-academy

[⬆️ Torna all'Indice](#indice)

L'utilizzo degli LLM per coding può supportare:

---

## Laboratori Python

Workflow:

```
Spiegazione

↓

Esempio codice

↓

Esercizio

↓

Correzione
```

---

## Sviluppo LMS

Supporto per:

- componenti React;
- API;
- database;
- testing.

---

## Tutor programmazione

L'AI può:

- spiegare errori;
- proporre esercizi;
- adattare difficoltà.

---

# Best Practice

[⬆️ Torna all'Indice](#indice)

✔ Descrivere sempre il contesto.

✔ Definire requisiti chiari.

✔ Richiedere spiegazioni oltre al codice.

✔ Verificare ogni soluzione.

✔ Utilizzare Git per tracciare modifiche.

✔ Considerare l'AI un collaboratore, non un sostituto.

---

# Sintesi della Parte 7

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo approfondito:

- AI Pair Programming;
- progettazione software con LLM;
- generazione codice Python;
- debugging;
- refactoring;
- test automatici;
- integrazione con VS Code;
- utilizzo di modelli locali.

L'uso professionale degli LLM nello sviluppo software richiede una combinazione di:

```
Competenze programmazione

+

Prompt Engineering

+

Verifica umana
```

---

# Verifica rapida

## Domanda 1

Un LLM nello sviluppo software dovrebbe essere considerato:

A. Un sostituto completo del programmatore

B. Un assistente collaborativo

C. Un sistema operativo

D. Un database

**Risposta corretta:** B

---

## Domanda 2

Prima di generare codice è consigliabile:

A. Definire requisiti e contesto

B. Copiare immediatamente il codice

C. Eliminare i test

D. Evitare spiegazioni

**Risposta corretta:** A

---

## Domanda 3

Il codice generato dall'AI deve essere:

A. Sempre accettato

B. Verificato e testato

C. Ignorato

D. Usato senza modifiche

**Risposta corretta:** B

---

[⬆️ Torna all'Indice](#indice)

---

<a id="m8"></a>

# 8. LLM per Data Analysis e Problem Solving

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

L'Intelligenza Artificiale generativa sta modificando profondamente il modo in cui vengono analizzati i dati.

Tradizionalmente il processo di analisi richiede:

- conoscenza degli strumenti;
- capacità di programmazione;
- competenze statistiche;
- interpretazione manuale dei risultati.

Con l'utilizzo degli LLM è possibile creare un ambiente collaborativo dove l'intelligenza artificiale supporta l'analista nelle diverse fasi del processo.

---

Il nuovo paradigma diventa:

```
Dati

↓

Analisi umana

+

Supporto AI

↓

Insight

↓

Decisioni
```

---

# 8.1 Il ruolo degli LLM nella Data Analysis

[⬆️ Torna all'Indice](#indice)

Un LLM può essere utilizzato come:

---

## Assistente analitico

Supporta:

- esplorazione dati;
- identificazione pattern;
- formulazione ipotesi.

---

## Assistente alla programmazione

Genera codice per:

- Python;
- SQL;
- notebook;
- automazioni.

---

## Interprete dei risultati

Aiuta a trasformare:

```
Numeri

↓

Informazioni

↓

Decisioni
```

---

# 8.2 Ciclo completo della Data Analysis

[⬆️ Torna all'Indice](#indice)

Un processo professionale di analisi dati segue generalmente queste fasi:

```
1. Raccolta dati

↓

2. Pulizia dati

↓

3. Esplorazione

↓

4. Analisi

↓

5. Visualizzazione

↓

6. Interpretazione

↓

7. Decisione
```

---

Gli LLM possono intervenire in ogni fase.

---

# 8.3 Data Understanding con gli LLM

[⬆️ Torna all'Indice](#indice)

Prima di analizzare un dataset è necessario comprenderne la struttura.

---

Esempio:

Dataset:

```
studenti.csv
```

Contiene:

- nome;
- classe;
- voto;
- frequenza;
- risultati test.

---

Prompt:

```
Analizza questo dataset.

Descrivi:

- numero colonne;
- significato dei campi;
- possibili problemi;
- informazioni ottenibili.
```

---

Output:

Documento di analisi preliminare.

---

# 8.4 Data Cleaning assistito dall'AI

[⬆️ Torna all'Indice](#indice)

La pulizia dei dati è una delle fasi più importanti.

Problemi comuni:

- valori mancanti;
- duplicati;
- formati errati;
- dati incoerenti.

---

Esempio:

Dataset:

| Nome | Età |
|-|-|
|Mario|18|
|Anna|diciassette|
|Luca| |

---

L'LLM può suggerire:

- strategie di normalizzazione;
- codice Python;
- controlli qualità.

---

# 8.5 Utilizzo di Python per Data Analysis

[⬆️ Torna all'Indice](#indice)

Python è uno degli strumenti principali della Data Science.

Librerie fondamentali:

---

## Pandas

Utilizzata per:

- gestione tabelle;
- trasformazione dati;
- analisi dataset.

---

## NumPy

Utilizzata per:

- calcolo numerico;
- matrici;
- operazioni matematiche.

---

## Matplotlib

Utilizzata per:

- grafici;
- visualizzazioni.

---

Esempio:

```python
import pandas as pd

data = pd.read_csv("studenti.csv")

print(data.head())
```

---

L'LLM può aiutare a:

- generare codice;
- spiegare funzioni;
- correggere errori.

---

# 8.6 Prompt Engineering per Data Analysis

[⬆️ Torna all'Indice](#indice)

Un prompt efficace deve definire:

---

## Ruolo

```
Agisci come Data Analyst senior.
```

---

## Contesto

```
Sto analizzando dati relativi agli studenti.
```

---

## Obiettivo

```
Identifica fattori che influenzano il rendimento.
```

---

## Output

```
Produci:

- analisi;
- grafici suggeriti;
- conclusioni.
```

---

Template completo:

```text
Agisci come Data Analyst.

Contesto:

[descrizione dati]

Obiettivo:

[domanda analitica]

Vincoli:

[regole]

Output:

[formato desiderato]
```

---

# 8.7 Generazione automatica di report

[⬆️ Torna all'Indice](#indice)

Gli LLM possono trasformare analisi tecniche in documenti leggibili.

---

Workflow:

```
Dataset

↓

Analisi Python

↓

Risultati

↓

LLM

↓

Report Markdown
```

---

Esempio:

Input:

```
Statistiche classe:

media 7.2

deviazione standard 1.4

assenze elevate
```

---

Output:

```
Analisi rendimento classe

Punti positivi:

...

Criticità:

...

Azioni consigliate:

...
```

---

# 8.8 Visualizzazione dati con AI

[⬆️ Torna all'Indice](#indice)

La visualizzazione aiuta a comprendere fenomeni complessi.

---

L'LLM può suggerire:

- quale grafico utilizzare;
- quali variabili confrontare;
- come interpretare risultati.

---

Esempi:

## Grafico a barre

Utilizzo:

confronto categorie.

---

## Grafico lineare

Utilizzo:

andamento temporale.

---

## Scatter plot

Utilizzo:

relazioni tra variabili.

---

# 8.9 Problem Solving assistito dall'AI

[⬆️ Torna all'Indice](#indice)

Gli LLM possono essere utilizzati anche come strumenti di ragionamento strutturato.

---

Processo:

```
Problema

↓

Analisi

↓

Alternative

↓

Valutazione

↓

Soluzione
```

---

Esempio:

Problema:

```
Ridurre gli abbandoni di un corso online.
```

---

L'AI può aiutare a:

- analizzare dati studenti;
- individuare cause;
- proporre strategie.

---

# 8.10 Framework di Problem Solving con LLM

[⬆️ Torna all'Indice](#indice)

Un metodo efficace:

---

## 1. Definizione problema

Domanda:

```
Qual è il problema reale?
```

---

## 2. Raccolta informazioni

Dati:

- quantitativi;
- qualitativi.

---

## 3. Analisi

Individuazione:

- cause;
- correlazioni;
- anomalie.

---

## 4. Soluzioni

Generazione:

- alternative;
- vantaggi;
- rischi.

---

## 5. Decisione

Scelta basata su:

- dati;
- obiettivi;
- vincoli.

---

# 8.11 LLM e Database

[⬆️ Torna all'Indice](#indice)

Gli LLM possono supportare l'interazione con database.

---

Esempio:

Richiesta naturale:

```
Mostrami gli studenti
con voto superiore a 8.
```

---

Conversione:

```
Linguaggio naturale

↓

SQL

↓

Database

↓

Risultato
```

---

Esempio SQL:

```sql
SELECT *
FROM studenti
WHERE voto > 8;
```

---

# 8.12 LLM e SQL

[⬆️ Torna all'Indice](#indice)

Gli LLM possono aiutare a:

- scrivere query;
- ottimizzare interrogazioni;
- spiegare database.

---

Prompt:

```
Genera una query SQL.

Database:

studenti

Campi:

nome, classe, voto

Obiettivo:

media voti per classe.
```

---

Output:

```sql
SELECT classe, AVG(voto)
FROM studenti
GROUP BY classe;
```

---

# 8.13 Applicazioni nella gcprof-academy

[⬆️ Torna all'Indice](#indice)

La Data Analysis con LLM può essere utilizzata per:

---

## Analisi progressi studenti

```
Dati quiz

↓

AI

↓

Report apprendimento
```

---

## Dashboard formative

Analisi:

- completamento corsi;
- risultati;
- difficoltà.

---

## Tutor personalizzato

```
Prestazioni studente

↓

AI

↓

Percorso consigliato
```

---

# 8.14 Best Practice

[⬆️ Torna all'Indice](#indice)

✔ Verificare sempre i dati.

✔ Non confondere correlazione e causalità.

✔ Utilizzare dataset puliti.

✔ Validare i risultati AI.

✔ Conservare il processo analitico.

✔ Documentare ipotesi e conclusioni.

---

# Errori comuni

[⬆️ Torna all'Indice](#indice)

## Analizzare dati incompleti

Problema:

Risultati poco affidabili.

---

## Fidarsi senza verificare

Problema:

L'AI può interpretare male i dati.

---

## Mancanza di contesto

Problema:

L'analisi perde significato.

---

# Sintesi della Parte 8

[⬆️ Torna all'Indice](#indice)

In questa parte abbiamo approfondito:

- utilizzo degli LLM nella Data Analysis;
- ciclo completo di analisi dati;
- Python e librerie Data Science;
- generazione report;
- visualizzazione;
- SQL;
- Problem Solving assistito dall'AI.

Gli LLM diventano strumenti potenti quando vengono integrati con dati, metodo analitico e competenze umane.

---

# Verifica rapida

## Domanda 1

La prima fase della Data Analysis è:

A. Creazione grafici

B. Raccolta e comprensione dati

C. Eliminazione dati

D. Pubblicazione risultati

**Risposta corretta:** B

---

## Domanda 2

Pandas viene utilizzato principalmente per:

A. Creare videogiochi

B. Analizzare e manipolare dati

C. Gestire hardware

D. Creare reti neurali fisiche

**Risposta corretta:** B

---

## Domanda 3

Un LLM nella Data Analysis deve:

A. Sostituire completamente l'analista

B. Supportare analisi e interpretazione

C. Eliminare la verifica

D. Generare dati casuali

**Risposta corretta:** B

---

[⬆️ Torna all'Indice](#indice)

---

<a id="laboratorio"></a>

# 9. Laboratorio Pratico: AI Coding e Data Analysis con Python

[⬆️ Torna all'Indice](#indice)

---

# Introduzione al Laboratorio

Questo laboratorio rappresenta la fase applicativa del Modulo 5.

L'obiettivo è mettere in pratica le tecniche studiate:

- Prompt Engineering avanzato;
- utilizzo degli LLM per il coding;
- analisi dati con Python;
- generazione automatica di report;
- verifica dei risultati prodotti dall'AI.

---

Il laboratorio segue il principio:

```
Descrivi

↓

Genera

↓

Analizza

↓

Verifica

↓

Migliora
```

---

# 9.1 Obiettivi del laboratorio

[⬆️ Torna all'Indice](#indice)

Al termine dell'attività lo studente sarà in grado di:

- configurare un ambiente Python locale;
- utilizzare VS Code per lo sviluppo;
- collaborare con un LLM;
- generare codice Python;
- analizzare un dataset;
- creare grafici;
- produrre un report strutturato.

---

# 9.2 Scenario applicativo

[⬆️ Torna all'Indice](#indice)

Scenario:

Una scuola vuole analizzare i risultati degli studenti per individuare:

- andamento generale;
- studenti in difficoltà;
- differenze tra classi;
- possibili interventi didattici.

---

Dati disponibili:

```
studenti.csv
```

Struttura:

| Campo | Descrizione |
|-|-|
| nome | Nome studente |
| classe | Classe frequentata |
| voto | Media voti |
| assenze | Numero assenze |
| completamento | Percentuale corso completato |

---

# 9.3 Configurazione ambiente locale

[⬆️ Torna all'Indice](#indice)

Il laboratorio viene eseguito localmente utilizzando:

- Python 3;
- Visual Studio Code;
- ambiente virtuale;
- librerie Data Science.

---

Struttura progetto:

```
AI_Data_Analysis_Lab/

│
├── data/
│   └── studenti.csv
│
├── src/
│   ├── analysis.py
│   └── report.py
│
├── output/
│   └── report.md
│
└── requirements.txt
```

---

# 9.4 Creazione ambiente Python

[⬆️ Torna all'Indice](#indice)

Creazione ambiente virtuale:

```bash
python -m venv .venv
```

---

Attivazione ambiente:

Windows:

```bash
.venv\Scripts\activate
```

Linux/Mac:

```bash
source .venv/bin/activate
```

---

Installazione librerie:

```bash
pip install pandas matplotlib numpy
```

---

File:

```
requirements.txt
```

contenente:

```
pandas
numpy
matplotlib
```

---

# 9.5 Utilizzo dell'LLM come assistente

[⬆️ Torna all'Indice](#indice)

Prima di scrivere codice si utilizza il Prompt Engineering.

---

Prompt iniziale:

```
Agisci come sviluppatore Python senior
specializzato in Data Analysis.

Devi creare uno script che analizzi
un file CSV studenti.

Utilizza:

- pandas;
- matplotlib.

Richiedo:

- caricamento dati;
- analisi statistiche;
- grafici;
- report finale.
```

---

L'output generato deve essere:

- analizzato;
- compreso;
- eventualmente modificato.

---

# 9.6 Analisi preliminare del dataset

[⬆️ Torna all'Indice](#indice)

Primo obiettivo:

caricare e comprendere i dati.

---

Esempio:

```python
import pandas as pd

df = pd.read_csv(
    "data/studenti.csv"
)

print(df.head())

print(df.info())
```

---

Operazioni:

- visualizzazione prime righe;
- controllo colonne;
- verifica tipi dati.

---

# 9.7 Pulizia dei dati

[⬆️ Torna all'Indice](#indice)

Prima dell'analisi è necessario verificare:

- valori mancanti;
- duplicati;
- errori.

---

Esempio:

```python
print(df.isnull().sum())
```

---

Rimozione duplicati:

```python
df = df.drop_duplicates()
```

---

Normalizzazione:

```python
df["classe"] = df["classe"].str.upper()
```

---

# 9.8 Analisi statistica

[⬆️ Torna all'Indice](#indice)

Calcolo statistiche principali:

```python
print(df.describe())
```

---

Possibili indicatori:

- media voti;
- valore minimo;
- valore massimo;
- distribuzione risultati.

---

Esempio:

```python
media = df["voto"].mean()

print(media)
```

---

# 9.9 Analisi per gruppo

[⬆️ Torna all'Indice](#indice)

Confronto tra classi:

```python
risultato = (
    df.groupby("classe")
    ["voto"]
    .mean()
)

print(risultato)
```

---

Possibili domande:

- quale classe ha rendimento migliore?
- dove sono presenti difficoltà?
- quali fattori incidono?

---

# 9.10 Visualizzazione dei dati

[⬆️ Torna all'Indice](#indice)

Creazione grafico:

```python
import matplotlib.pyplot as plt

df.groupby("classe")["voto"].mean().plot(
    kind="bar"
)

plt.title(
    "Media voti per classe"
)

plt.show()
```

---

Obiettivo:

trasformare dati numerici in informazioni visive.

---

# 9.11 Generazione report con LLM

[⬆️ Torna all'Indice](#indice)

Dopo l'analisi Python vengono prodotti risultati.

Esempio:

```
Media generale: 7.4

Classe migliore: 3A

Studenti sotto media: 5

Completamento medio corso: 82%
```

---

Prompt:

```
Agisci come analista educativo.

Trasforma questi risultati
in un report Markdown.

Inserisci:

- sintesi;
- criticità;
- suggerimenti.
```

---

Output:

```markdown
# Report Analisi Studenti

## Sintesi

...

## Criticità

...

## Azioni consigliate

...
```

---

# 9.12 Validazione dei risultati

[⬆️ Torna all'Indice](#indice)

L'utilizzo dell'AI richiede sempre controllo umano.

Verificare:

✔ correttezza dati;

✔ correttezza formule;

✔ interpretazione risultati;

✔ coerenza conclusioni.

---

Principio:

```
AI suggerisce

↓

Umano verifica

↓

Decisione finale
```

---

# 9.13 Variante avanzata: integrazione database

[⬆️ Torna all'Indice](#indice)

Il dataset CSV può essere sostituito da un database.

Schema:

```
Database

↓

Query SQL

↓

Python

↓

LLM

↓

Report
```

---

Possibili tecnologie:

- PostgreSQL;
- Supabase;
- SQLite.

---

Applicazione gcprof-academy:

```
Supabase

↓

Dati studenti

↓

Analisi AI

↓

Dashboard docente
```

---

# 9.14 Variante avanzata: AI Tutor personalizzato

[⬆️ Torna all'Indice](#indice)

Utilizzando i dati analizzati è possibile creare un sistema adattivo.

Esempio:

Input:

```
Studente:

Media 6.2

Completamento 55%

Difficoltà Python
```

---

Output AI:

```
Percorso consigliato:

1. Ripasso basi Python

2. Esercizi guidati

3. Verifica finale
```

---

# 9.15 Consegna laboratorio

[⬆️ Torna all'Indice](#indice)

Lo studente deve produrre:

## File Python

```
analysis.py
```

contenente:

- caricamento dati;
- analisi;
- grafici.

---

## Report Markdown

```
report.md
```

contenente:

- descrizione dataset;
- risultati;
- conclusioni.

---

## Prompt utilizzati

Documento:

```
prompts.md
```

con:

- prompt iniziale;
- miglioramenti;
- versione finale.

---

# 9.16 Criteri di valutazione

[⬆️ Torna all'Indice](#indice)

Valutazione:

| Area | Punteggio |
|-|-|
| Qualità codice Python | 30% |
| Uso corretto LLM | 20% |
| Analisi dati | 25% |
| Report finale | 15% |
| Documentazione | 10% |

---

# Best Practice

[⬆️ Torna all'Indice](#indice)

✔ Utilizzare sempre ambienti virtuali.

✔ Salvare i prompt migliori.

✔ Versionare il codice con Git.

✔ Commentare il codice.

✔ Verificare ogni risultato.

✔ Documentare il processo.

---

# Errori comuni

[⬆️ Torna all'Indice](#indice)

## Copiare codice AI senza capire

Problema:

assenza di competenze reali.

---

## Dataset non analizzato

Problema:

risultati errati.

---

## Mancanza di verifica

Problema:

report non affidabile.

---

# Sintesi della Parte 9

[⬆️ Torna all'Indice](#indice)

Nel laboratorio abbiamo applicato:

- Prompt Engineering;
- Python;
- Data Analysis;
- Visualizzazione dati;
- Generazione report;
- Validazione risultati.

Questo laboratorio rappresenta il collegamento tra teoria e sviluppo professionale di applicazioni AI.

---

# Verifica rapida

## Domanda 1

Prima di analizzare un dataset è necessario:

A. Creare grafici subito

B. Comprendere e pulire i dati

C. Eliminare tutte le colonne

D. Generare un modello AI

**Risposta corretta:** B

---

## Domanda 2

L'LLM durante il laboratorio deve essere:

A. Un sostituto dello studente

B. Un assistente tecnico

C. Un database

D. Un compilatore

**Risposta corretta:** B

---

## Domanda 3

Un report generato dall'AI deve essere:

A. Accettato senza verifica

B. Controllato e validato

C. Eliminato

D. Ignorato

**Risposta corretta:** B

---

[⬆️ Torna all'Indice](#indice)

---

<a id="prompt-challenge"></a>

# 10. Prompt Challenge e Valutazione Finale Modulo 5

[⬆️ Torna all'Indice](#indice)

---

# Introduzione

Questa sezione conclude il Modulo 5 dedicato a:

```
Sviluppo Pratico e Prompt Engineering Avanzato
```

Durante il modulo lo studente ha acquisito competenze su:

- progettazione avanzata dei prompt;
- utilizzo professionale degli LLM;
- Chain of Thought;
- Prompt Chaining;
- Structured Output;
- Role Prompting;
- Context Engineering;
- Coding assistito dall'AI;
- Data Analysis con Python.

---

L'obiettivo finale è verificare la capacità dello studente di utilizzare un LLM come strumento professionale integrato nei processi di sviluppo e analisi.

---

# 10.1 Obiettivi della Prompt Challenge

[⬆️ Torna all'Indice](#indice)

La Prompt Challenge ha lo scopo di valutare la capacità di:

- analizzare un problema;
- progettare un prompt efficace;
- migliorare progressivamente l'output AI;
- verificare il risultato prodotto;
- documentare il processo.

---

Il focus non è:

```
ottenere una risposta veloce
```

ma:

```
progettare una collaborazione efficace
con il modello AI.
```

---

# 10.2 Scenario della Challenge

[⬆️ Torna all'Indice](#indice)

Scenario:

Una scuola vuole realizzare un assistente AI per supportare studenti e docenti.

Il sistema deve essere in grado di:

- spiegare argomenti informatici;
- generare esercizi;
- analizzare errori di codice;
- creare quiz;
- produrre report.

---

Lo studente deve progettare il sistema attraverso una sequenza di prompt.

---

# 10.3 Challenge 1: Prompt Base

[⬆️ Torna all'Indice](#indice)

Obiettivo:

Creare una prima richiesta semplice.

---

Prompt iniziale:

```
Spiega Python.
```

---

Analizzare:

- qualità risposta;
- livello tecnico;
- completezza;
- chiarezza.

---

Problema:

Il prompt non definisce:

- destinatario;
- obiettivo;
- formato.

---

# 10.4 Challenge 2: Miglioramento con ruolo e contesto

[⬆️ Torna all'Indice](#indice)

Trasformare il prompt precedente.

---

Esempio:

```
Agisci come docente di Informatica
per studenti del secondo anno
della scuola superiore.

Spiega Python partendo dalle basi.

Utilizza:

- esempi pratici;
- codice commentato;
- esercizi finali.
```

---

Miglioramenti introdotti:

✔ ruolo;

✔ pubblico;

✔ obiettivo;

✔ formato.

---

# 10.5 Challenge 3: Prompt con Chain of Thought

[⬆️ Torna all'Indice](#indice)

Obiettivo:

Guidare il modello nella risoluzione di problemi complessi.

---

Esempio:

```
Analizza il problema.

Procedi attraverso:

1. identificazione requisiti;
2. analisi soluzione;
3. proposta algoritmo;
4. implementazione Python;
5. verifica finale.
```

---

L'obiettivo è ottenere:

```
Analisi

↓

Piano

↓

Soluzione

↓

Controllo
```

---

# 10.6 Challenge 4: Prompt Chaining

[⬆️ Torna all'Indice](#indice)

Un problema complesso può essere diviso in più richieste.

---

Approccio singolo:

```
Crea un corso completo di AI.
```

---

Approccio professionale:

## Prompt 1

```
Definisci struttura corso.
```

---

## Prompt 2

```
Sviluppa modulo teorico.
```

---

## Prompt 3

```
Crea laboratorio pratico.
```

---

## Prompt 4

```
Genera quiz finale.
```

---

Vantaggio:

maggiore controllo del risultato.

---

# 10.7 Challenge 5: Structured Output

[⬆️ Torna all'Indice](#indice)

Obiettivo:

Creare output utilizzabile da software.

---

Richiesta:

```
Genera una scheda studente
in formato JSON.

Campi:

- nome;
- livello;
- difficoltà;
- percorso consigliato.
```

---

Output atteso:

```json
{
 "nome":"Mario",
 "livello":"Intermedio",
 "difficolta":"Python",
 "percorso":"Esercizi guidati"
}
```

---

Competenze valutate:

- precisione;
- struttura;
- integrazione software.

---

# 10.8 Challenge 6: AI Coding Assistant

[⬆️ Torna all'Indice](#indice)

Scenario:

Uno studente fornisce un programma Python con errori.

---

Richiesta:

```
Analizza questo codice.

Individua:

- errori;
- motivazione;
- soluzione;
- miglioramenti possibili.
```

---

Valutazione:

- capacità debugging;
- qualità spiegazione;
- correttezza soluzione.

---

# 10.9 Challenge 7: Data Analysis

[⬆️ Torna all'Indice](#indice)

Scenario:

Dataset studenti:

```
studenti.csv
```

---

Obiettivo:

Creare un prompt per ottenere:

- analisi dati;
- grafici consigliati;
- conclusioni;
- report finale.

---

Prompt esempio:

```
Agisci come Data Analyst.

Analizza il dataset.

Produci:

1. statistiche principali;
2. anomalie;
3. visualizzazioni;
4. report Markdown.
```

---

# 10.10 Progetto finale del Modulo 5

[⬆️ Torna all'Indice](#indice)

Il progetto finale consiste nella creazione di un:

```
AI Assistant Specialistico
```

---

Lo studente deve progettare:

## Identità

Esempio:

```
Tutor Python AI.
```

---

## Contesto

```
Materiale didattico del corso.
```

---

## Obiettivo

```
Supportare studenti principianti.
```

---

## Regole

```
Spiegare teoria,
fornire esempi,
proporre esercizi.
```

---

## Output

```
Markdown strutturato.
```

---

# 10.11 Consegna finale

[⬆️ Torna all'Indice](#indice)

Lo studente deve produrre:

---

## Documento Prompt

File:

```
prompt_finale.md
```

Contenente:

- versione iniziale;
- miglioramenti;
- versione finale.

---

## Codice Python

File:

```
assistant_demo.py
```

Contenente:

- esempio utilizzo AI;
- gestione input;
- output strutturato.

---

## Report

File:

```
report_finale.md
```

Contenente:

- obiettivo;
- metodologia;
- risultati;
- considerazioni personali.

---

# 10.12 Rubrica di valutazione

[⬆️ Torna all'Indice](#indice)

| Competenza | Peso |
|-|-|
| Qualità Prompt Engineering | 30% |
| Utilizzo corretto LLM | 20% |
| Capacità analitica | 20% |
| Codice Python | 15% |
| Documentazione | 15% |

---

# 10.13 Quiz finale Modulo 5

[⬆️ Torna all'Indice](#indice)

## Domanda 1

Il Prompt Engineering serve principalmente a:

A. Programmare il modello AI

B. Comunicare efficacemente con il modello

C. Aumentare la memoria del computer

D. Creare hardware

**Risposta corretta:** B

---

## Domanda 2

Il Role Prompting permette di:

A. Definire il comportamento dell'AI

B. Modificare i pesi del modello

C. Eliminare il contesto

D. Ridurre i dati

**Risposta corretta:** A

---

## Domanda 3

Il Context Engineering riguarda:

A. La progettazione delle informazioni fornite al modello

B. La velocità Internet

C. Il sistema operativo

D. La scheda video

**Risposta corretta:** A

---

## Domanda 4

Un codice generato dall'AI deve essere:

A. Sempre copiato

B. Verificato e testato

C. Ignorato

D. Eliminato

**Risposta corretta:** B

---

## Domanda 5

Un output JSON è utile perché:

A. È facilmente elaborabile dai software

B. È un'immagine

C. Sostituisce Python

D. Elimina i database

**Risposta corretta:** A

---

# 10.14 Competenze acquisite nel Modulo 5

[⬆️ Torna all'Indice](#indice)

Al termine del modulo lo studente sa:

✔ progettare prompt professionali;

✔ utilizzare tecniche avanzate di prompting;

✔ controllare il contesto;

✔ creare output strutturati;

✔ utilizzare LLM per coding;

✔ analizzare dati con Python;

✔ creare workflow AI assistiti;

✔ valutare criticamente i risultati.

---

# 10.15 Collegamento al Modulo 6

[⬆️ Torna all'Indice](#indice)

Il Modulo 5 conclude la parte dedicata all'utilizzo professionale degli LLM.

Il percorso prosegue verso:

```
Modulo 6

Deep Learning e Transformer
```

dove verranno analizzati:

- reti neurali artificiali;
- apprendimento profondo;
- architetture CNN;
- RNN;
- Transformer;
- meccanismi interni degli LLM.

---

# Riepilogo finale Modulo 5

[⬆️ Torna all'Indice](#indice)

Il Modulo 5 ha trasformato lo studente da utilizzatore occasionale di AI a:

```
Utilizzatore professionale
di sistemi AI generativi
```

attraverso:

```
Prompt Engineering

+

Coding

+

Data Analysis

+

Metodo scientifico
```

---

[⬆️ Torna all'Indice](#indice)
