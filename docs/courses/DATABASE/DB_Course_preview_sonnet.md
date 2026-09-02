<a id="inizio"></a>

# 🗄️ Database con Python: Dai Fogli di Calcolo alle Applicazioni Data-Driven
**Il percorso formativo definitivo di GCProf Academy per imparare a progettare, gestire e interrogare basi di dati con Python.**

Benvenuto nella preview esclusiva del nuovo corso su **Database e Python** di **GCProf Academy**. Non una semplice raccolta di query, ma un vero **percorso professionale, progressivo e modulare**, pensato per portarti da chi salva i dati in un file di testo a chi progetta, interroga e mette in produzione un database relazionale completo.

Che tu debba organizzare i voti di una classe, gestire il budget di un progetto, tracciare i clienti di un'azienda o preparare statistiche per una relazione, questo corso ti insegna a farlo nel modo giusto: con dati **strutturati, affidabili e interrogabili**, e con laboratori eseguiti al 100% su **Google Colab**, senza bisogno di installare nulla.

**Nessuna esperienza pregressa sui database è richiesta**: si parte dal concetto stesso di "dato" e si arriva, passo dopo passo, a costruire applicazioni complete con interfaccia grafica, grafici e report.

**[👉 Iscriviti ora e inizia dal Modulo 1!]**

---

## 🏗️ L'Architettura del Corso

Il corso è strutturato in **4 Macro-fasi** strategiche, ciascuna con un traguardo concreto:

| Fase | Livello | Cosa saprai fare al termine |
|---|---|---|
| **1. Fondamenti dei Dati** | Base | Distinguere dato e informazione, salvare dati su file e CSV, usare Google Sheets come primo database |
| **2. SQL e SQLite** | Intermedio (parte 1) | Progettare tabelle con vincoli, inserire/modificare/cancellare dati e interrogarli con query SQL |
| **3. Relazioni e Architetture** | Intermedio (parte 2) | Collegare più tabelle, calcolare statistiche e scrivere codice Python modulare e riutilizzabile |
| **4. Applicazioni Data-Driven** | Avanzato | Costruire applicazioni complete con interfaccia grafica, grafici, sicurezza e un project work finale |

---

## 👥 A chi è rivolto

* 🎓 Studenti del triennio delle superiori (classi terza, quarta e quinta) di qualsiasi indirizzo: **tecnico informatico**, **AFM** (Amministrazione, Finanza e Marketing), **RIM** (Relazioni Internazionali per il Marketing) e non solo
* 👨‍🏫 Insegnanti di informatica, economia aziendale o discipline affini che vogliono un percorso pronto e modulare da usare in classe
* 💼 Studenti orientati a economia, finanza e marketing che vogliono capire come si organizzano davvero i dati di un'azienda (clienti, spese, magazzino)
* 💻 Chiunque voglia costruire una competenza tecnica spendibile: saper "parlare" con un database è oggi richiesto in quasi ogni professione, non solo in informatica

**Requisiti:** nessuna conoscenza pregressa di database. Non è necessario conoscere già Python: le basi (variabili, liste, cicli) vengono introdotte gradualmente a partire dal Modulo 1, contestualizzate sempre a esempi concreti sui dati.

---

<a id="indice"></a>
## 📑 Indice dei Moduli Navigabile

**FASE 1: Fondamenti dei Dati**
* [Modulo 1: Dal Dato al Database](#modulo-1)
* [Modulo 2: Google Sheets come Database](#modulo-2)

**FASE 2: SQL e SQLite**
* [Modulo 3: Progettare un Database Relazionale](#modulo-3)
* [Modulo 4: Manipolare i Dati (DML)](#modulo-4)
* [Modulo 5: Interrogare i Dati (DQL)](#modulo-5)

**FASE 3: Relazioni e Architetture**
* [Modulo 6: Relazioni tra Tabelle](#modulo-6)
* [Modulo 7: Aggregazione e Statistiche](#modulo-7)
* [Modulo 8: Programmazione ad Oggetti per Database](#modulo-8)

**FASE 4: Applicazioni Data-Driven**
* [Modulo 9: Interfacce Utente Interattive](#modulo-9)
* [Modulo 10: Visualizzazione e Dashboard](#modulo-10)
* [Modulo 11: Sicurezza, Backup e Best Practice](#modulo-11)
* [Modulo 12: Oltre SQLite](#modulo-12)
* [Modulo 13: Project Work Finale](#modulo-13)

---

## 📚 Dettaglio dei Moduli

### FASE 1: Fondamenti dei Dati

<a id="modulo-1"></a>
[🔙 Torna all'indice](#indice)

### Modulo 1: Dal Dato al Database
Il punto di partenza di tutto il corso: capire cos'è davvero un dato, prima ancora di parlare di database.
* **Argomenti:** Dato vs informazione, perché organizzare i dati, l'ambiente Google Colab, le prime variabili in Python, scrittura e lettura di file di testo, creazione e lettura di file CSV.
* **Al termine saprai:** distinguere un dato grezzo da un'informazione utile; salvare e recuperare dati da un file di testo e da un CSV con Python.

---

<a id="modulo-2"></a>
[🔙 Torna all'indice](#indice)

### Modulo 2: Google Sheets come Database
Il primo vero "database" del corso: un foglio di calcolo online, interrogabile da Python.
* **Argomenti:** Concetto di tabella (righe/record, colonne/campi), libreria `gspread`, autenticazione con Google, creazione e popolamento di un foglio, lettura dati, prime operazioni CRUD, introduzione a Pandas e ai `DataFrame`.
* **Al termine saprai:** collegare Python a un Google Sheet e usarlo come archivio dati strutturato, leggendo e scrivendo record da codice.

---

### FASE 2: SQL e SQLite

<a id="modulo-3"></a>
[🔙 Torna all'indice](#indice)

### Modulo 3: Progettare un Database Relazionale
Si lascia il foglio di calcolo per entrare nel mondo dei database veri e propri.
* **Argomenti:** Cos'è un DBMS, il linguaggio SQL, la libreria `sqlite3`, connessione e cursore, comandi DDL (`CREATE TABLE`), vincoli di integrità: `PRIMARY KEY`, `AUTOINCREMENT`, `NOT NULL`, `UNIQUE`.
* **Al termine saprai:** progettare e creare da zero lo schema di un database relazionale, definendo vincoli che garantiscano la qualità dei dati.

---

<a id="modulo-4"></a>
[🔙 Torna all'indice](#indice)

### Modulo 4: Manipolare i Dati (DML)
Le operazioni che ogni sviluppatore deve conoscere per far vivere un database.
* **Argomenti:** Ciclo di vita del dato, comandi `INSERT`, `UPDATE`, `DELETE`, query parametrizzate con `?`, introduzione alla SQL Injection e a come evitarla, `commit()` e gestione delle transazioni.
* **Al termine saprai:** inserire, modificare e cancellare record in sicurezza, senza esporre il database a errori o attacchi.

---

<a id="modulo-5"></a>
[🔙 Torna all'indice](#indice)

### Modulo 5: Interrogare i Dati (DQL)
Il comando più usato in assoluto in SQL, esplorato in ogni sua sfumatura.
* **Argomenti:** Sintassi di `SELECT`, filtri con `WHERE`, ordinamento con `ORDER BY`, `fetchone()` e `fetchall()`, integrazione con Pandas (`read_sql_query`) per report leggibili e professionali.
* **Al termine saprai:** scrivere query per estrarre esattamente i dati che ti servono, e presentarli in tabelle chiare e leggibili.

---

### FASE 3: Relazioni e Architetture

<a id="modulo-6"></a>
[🔙 Torna all'indice](#indice)

### Modulo 6: Relazioni tra Tabelle
Un database diventa davvero potente quando le tabelle iniziano a "parlarsi" tra loro.
* **Argomenti:** Relazioni Uno-a-Molti, ridondanza dei dati e perché evitarla, chiavi esterne (`FOREIGN KEY`), normalizzazione, `INNER JOIN` per interrogare più tabelle insieme.
* **Al termine saprai:** progettare un database "atomico", dove ogni informazione vive nel posto giusto, e recuperare dati incrociando più tabelle.

---

<a id="modulo-7"></a>
[🔙 Torna all'indice](#indice)

### Modulo 7: Aggregazione e Statistiche
Da dati grezzi a informazioni utili per prendere decisioni.
* **Argomenti:** Funzioni di aggregazione (`SUM`, `AVG`, `COUNT`, `MIN`, `MAX`), raggruppamento con `GROUP BY`, modifica dello schema con `ALTER TABLE`, integrità referenziale e `ON DELETE CASCADE`.
* **Al termine saprai:** generare statistiche e riepiloghi (es. medie, totali, conteggi) direttamente dal database, senza dover elaborare i dati "a mano".

---

<a id="modulo-8"></a>
[🔙 Torna all'indice](#indice)

### Modulo 8: Programmazione ad Oggetti per Database
Si passa da script sparsi a codice professionale, organizzato e riutilizzabile.
* **Argomenti:** Progettazione di una classe `DbManager` (Programmazione Orientata agli Oggetti applicata ai database), gestione degli errori con `try/except`, gestione delle transazioni, buone pratiche di struttura del codice.
* **Al termine saprai:** incapsulare la logica di accesso al database in una classe Python riutilizzabile in qualsiasi progetto futuro.

---

### FASE 4: Applicazioni Data-Driven

<a id="modulo-9"></a>
[🔙 Torna all'indice](#indice)

### Modulo 9: Interfacce Utente Interattive
Un database senza un'interfaccia è utile solo a chi sa scrivere query: qui lo si rende accessibile a tutti.
* **Argomenti:** Libreria `ipywidgets`, creazione di form (campi di testo, dropdown, pulsanti) dentro Google Colab, event handling (collegare pulsanti a funzioni Python), aggiornamento dinamico dell'interfaccia.
* **Al termine saprai:** costruire una piccola applicazione con interfaccia grafica, utilizzabile anche da chi non conosce il codice.

---

<a id="modulo-10"></a>
[🔙 Torna all'indice](#indice)

### Modulo 10: Visualizzazione e Dashboard
I numeri in una tabella dicono poco: un grafico racconta una storia.
* **Argomenti:** Da una query SQL a un grafico con Matplotlib e Seaborn, tipologie di grafico più adatte ai dati tabellari (barre, torte, andamenti), costruzione di una mini-dashboard riepilogativa.
* **Al termine saprai:** trasformare i dati estratti dal database in visualizzazioni chiare, utili per una presentazione o una relazione.

---

<a id="modulo-11"></a>
[🔙 Torna all'indice](#indice)

### Modulo 11: Sicurezza, Backup e Best Practice
Un database professionale deve essere anche affidabile e sicuro.
* **Argomenti:** SQL Injection approfondita (perché evitare le stringhe concatenate), transazioni e proprietà ACID, strategie di backup e ripristino, versioning dello schema nel tempo.
* **Al termine saprai:** riconoscere le pratiche rischiose nella scrittura di query e proteggere i dati da perdite o accessi indesiderati.

---

<a id="modulo-12"></a>
[🔙 Torna all'indice](#indice)

### Modulo 12: Oltre SQLite
Uno sguardo a cosa succede quando un progetto cresce oltre un singolo file.
* **Argomenti:** Differenze tra SQLite e database server (MySQL, PostgreSQL), cenni sui database cloud moderni (es. Supabase, Firebase), quando e perché conviene passare da un file locale a un server.
* **Al termine saprai:** orientarti tra le principali soluzioni di database disponibili oggi e capire quale scegliere in base al progetto.

---

<a id="modulo-13"></a>
[🔙 Torna all'indice](#indice)

### Modulo 13: Project Work Finale
Tutto quello che hai imparato, messo insieme in un'unica applicazione completa.
* **Argomenti:** Costruzione guidata, passo dopo passo, di un'applicazione reale a scelta (es. gestionale voti scolastico o budget manager finanziario), che integra database relazionale, interfaccia grafica, grafici e report.
* **Al termine saprai:** progettare e realizzare in autonomia un'applicazione data-driven completa, dal database all'interfaccia utente.

---

## 🛠️ La Nostra Metodologia Formativa

In **GCProf Academy** non crediamo nelle lezioni passive. Ogni modulo segue una **struttura rigorosa di 15 step**, garantendo la massima qualità e completezza:

*Introduzione ➔ Obiettivi ➔ Prerequisiti ➔ Lezioni ➔ Esempi ➔ Laboratorio ➔ Best Practice ➔ Errori comuni ➔ Riepilogo ➔ Glossario ➔ Quiz ➔ Project Work ➔ Materiale scaricabile ➔ Bibliografia ➔ Sitografia*

### Tipologie di Lezione Interattive
Le lezioni sono unità indipendenti e multimediali composte da:
* 📖 **Guida Teorica Markdown:** con indice navigabile integrato.
* 💻 **Laboratorio Pratico:** notebook Python eseguibili **direttamente su Google Colab**.
* 🗃️ **SQL Lab:** esercizi progressivi di scrittura ed esecuzione di query.
* 🧪 **Quiz Markdown:** compatibili con il parser automatico della piattaforma.
* 🧩 **Challenge & Test Finale:** verifica immediata delle competenze.

---

## 🏆 Project Work e Valutazione Finale

Alla fine di ogni fase, dovrai affrontare una sfida reale per dimostrare le competenze acquisite, valutata secondo rigidi criteri di completezza e strutturazione:

* **🏁 Fine Fase 1:** organizzazione di un piccolo archivio dati (CSV o Google Sheet) con operazioni di lettura e scrittura complete.
* **🏁 Fine Fase 2:** database SQLite con almeno una tabella, vincoli di integrità e operazioni CRUD complete via Python.
* **🏁 Fine Fase 3:** database relazionale multi-tabella, con query di aggregazione e codice organizzato in una classe `DbManager`.
* **🏁 Fine Fase 4:** applicazione completa e funzionante, con interfaccia grafica, grafici e report, pronta da presentare come project work finale.

---

### 🚀 Sei pronto a costruire il tuo primo database?
Grazie all'integrazione con l'ecosistema tecnologico di *GCProf Academy* (dashboard docente, tracciamento con Supabase e metadati avanzati per il filtraggio), questo non è solo un corso, ma il tuo percorso guidato per trasformare dati grezzi in applicazioni reali.

**[👉 Iscriviti ora e inizia la Fase 1!]**

[🔙 Torna all'indice](#indice)