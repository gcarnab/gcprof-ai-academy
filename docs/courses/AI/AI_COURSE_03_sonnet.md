<a id="top"></a>

# 📘 Modulo 3: Etica e Normativa
**Livello Base — Master in Intelligenza Artificiale | GCProf Academy**

🕒 Tempo stimato: 4-5 ore · 🎯 Difficoltà: Base

---

## 📑 Indice del Modulo

1. [Introduzione](#1-introduzione)
2. [Obiettivi](#2-obiettivi)
3. [Prerequisiti](#3-prerequisiti)
4. [Lezioni](#4-lezioni)
5. [Esempi](#5-esempi)
6. [Laboratorio](#6-laboratorio)
7. [Best Practice](#7-best-practice)
8. [Errori Comuni](#8-errori-comuni)
9. [Riepilogo](#9-riepilogo)
10. [Glossario](#10-glossario)
11. [Quiz](#11-quiz)
12. [Project Work](#12-project-work)
13. [Materiale Scaricabile](#13-materiale-scaricabile)
14. [Bibliografia](#14-bibliografia)
15. [Sitografia](#15-sitografia)

---

<a id="1-introduzione"></a>
## 1. Introduzione

Nei primi due moduli hai imparato **cos'è** l'Intelligenza Artificiale e **come comunicare** efficacemente con un LLM tramite il prompting. Ma sapere *come si usa* uno strumento non basta: bisogna sapere anche **quando, come e con quali limiti** è giusto usarlo.

L'AI non è un territorio senza regole. È un ambito in rapidissima evoluzione normativa: proprio mentre studi questo modulo, l'Unione Europea sta completando l'applicazione del **Regolamento (UE) 2024/1689**, meglio noto come **AI Act** — la prima legge organica al mondo sull'intelligenza artificiale. Conoscerne i principi non è un esercizio teorico: è una competenza professionale richiesta oggi da scuole, aziende e pubbliche amministrazioni.

In questo modulo affronterai quattro grandi aree:
- **Copyright**: chi possiede i contenuti generati dall'AI, e quali rischi corri usando materiale protetto per addestrare o alimentare un modello.
- **Privacy e GDPR**: come i tuoi dati (e quelli dei tuoi studenti, colleghi o clienti) vengono trattati quando usi un chatbot o un servizio AI.
- **AI Act europeo**: il quadro normativo che classifica i sistemi AI in base al rischio e stabilisce obblighi diversi per chi li sviluppa e chi li utilizza.
- **Linee guida pratiche**: come impostare un uso responsabile dell'AI a scuola e in azienda, con policy chiare e sostenibili.

Alla fine del modulo non sarai un avvocato, ma saprai **riconoscere i rischi**, **fare le domande giuste** e **muoverti con consapevolezza** in un ecosistema che cambia mese dopo mese.

[🔝 Torna all'indice del modulo](#top)

---

<a id="2-obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo sarai in grado di:

- ✅ Spiegare le principali problematiche di **copyright** legate a contenuti generati dall'AI e al training dei modelli.
- ✅ Descrivere i principi fondamentali del **GDPR** e come si applicano quando usi strumenti di intelligenza artificiale.
- ✅ Riconoscere la **classificazione del rischio** prevista dall'AI Act (rischio inaccettabile, alto, limitato, minimo) e collocarvi esempi concreti.
- ✅ Distinguere il ruolo di **provider** (chi sviluppa un sistema AI) da quello di **deployer** (chi lo utilizza).
- ✅ Individuare le **scadenze normative** rilevanti dell'AI Act e il loro stato di applicazione.
- ✅ Redigere una checklist essenziale per un uso etico dell'AI a scuola o sul lavoro.
- ✅ Valutare in autonomia se un caso d'uso AI rientra in una "zona rossa" da evitare.

[🔝 Torna all'indice del modulo](#top)

---

<a id="3-prerequisiti"></a>
## 3. Prerequisiti

- Aver completato **Modulo 1 (Fondamenti di AI)** e **Modulo 2 (Prompt Engineering)**.
- Nessuna conoscenza giuridica pregressa richiesta.
- Nessuna competenza di programmazione richiesta (questo modulo è ancora Livello Base).
- Curiosità verso il funzionamento delle istituzioni europee: aiuta, ma non è obbligatoria.

[🔝 Torna all'indice del modulo](#top)

---

<a id="4-lezioni"></a>
## 4. Lezioni

### 4.1 — Copyright e Intelligenza Artificiale

L'AI generativa pone due problemi distinti, spesso confusi tra loro:

**A) Il problema "a monte" — i dati di addestramento**
I grandi modelli linguistici vengono addestrati su enormi quantità di testo, immagini e codice raccolti dal web. Buona parte di questo materiale è protetto da copyright. Editori, autori e artisti in tutto il mondo hanno avviato cause legali contro le principali aziende AI, sostenendo che l'addestramento senza autorizzazione violi i loro diritti. Non esiste ancora una posizione giuridica unanime: alcuni ordinamenti (come gli USA) valutano caso per caso se si tratti di *fair use*, altri (come l'UE) prevedono eccezioni specifiche per il *text and data mining*, con la possibilità per i titolari dei diritti di "riservarsi" l'uso dei propri contenuti (opt-out).

**B) Il problema "a valle" — i contenuti generati**
Chi possiede i diritti su un testo, un'immagine o un codice generato da un'AI? La risposta cambia da paese a paese:
- Negli **Stati Uniti**, l'ufficio copyright (US Copyright Office) ha più volte affermato che un'opera priva di un contributo creativo umano sostanziale non è tutelabile da copyright.
- In **Italia e nell'UE**, il diritto d'autore tutela le opere dell'ingegno "creative": un output puramente generato da una macchina, senza intervento creativo umano, si trova in una zona grigia non ancora del tutto definita dalla giurisprudenza.
- Il consiglio pratico, valido ovunque: se un output AI riproduce in modo riconoscibile uno stile, un personaggio o un'opera protetta e specifica (un brano musicale, un personaggio Disney, il codice sorgente di un progetto con licenza restrittiva), **trattalo come materiale protetto**, anche se generato da un'AI.

> 💡 Perché ti riguarda da insegnante: se usi materiale generato dall'AI nelle tue lezioni o lo fai produrre ai tuoi studenti, è buona norma dichiararne l'origine e verificare che non riproduca opere esistenti in modo troppo simile.

### 4.2 — Privacy e GDPR: le basi

Il **GDPR** (Regolamento Generale sulla Protezione dei Dati, Regolamento UE 2016/679) è la legge europea che disciplina il trattamento dei dati personali. Non è nato per l'AI, ma si applica pienamente a essa, perché ogni volta che un dato personale (nome, email, foto, voce, comportamento) entra in un sistema AI, quel trattamento deve rispettarne i principi.

I principi chiave da conoscere:

| Principio | Cosa significa in pratica |
|---|---|
| **Liceità e trasparenza** | Le persone devono sapere che i loro dati vengono trattati da un sistema AI, e su quale base giuridica |
| **Minimizzazione** | Si raccolgono solo i dati strettamente necessari, non "tutto quello che si può" |
| **Limitazione della finalità** | Un dato raccolto per uno scopo non può essere riusato liberamente per un altro |
| **Esattezza** | I dati devono essere corretti e aggiornati — un problema serio con i modelli AI, che possono "allucinare" informazioni false su persone reali |
| **Diritto all'oblio e accesso** | Le persone possono chiedere la cancellazione o la consultazione dei propri dati, anche quelli usati per addestrare o alimentare un modello |

**Un caso pratico per la scuola**: se carichi elaborati, foto o dati di studenti minorenni su un servizio AI online (anche solo per "farli correggere"), stai effettuando un trattamento di dati personali di minori, categoria particolarmente protetta. Serve sempre attenzione: leggere l'informativa privacy del servizio, capire dove sono conservati i dati, evitare di caricare dati identificativi non necessari.

### 4.3 — L'AI Act europeo: architettura e stato dell'arte

Il **Regolamento (UE) 2024/1689**, noto come **AI Act**, è la prima normativa organica al mondo sull'intelligenza artificiale. È entrato in vigore il 1° agosto 2024 e, trattandosi di un regolamento (non di una direttiva), si applica direttamente in tutti gli Stati membri, Italia compresa, senza bisogno di leggi nazionali di recepimento.

L'impianto si basa su un **approccio basato sul rischio** (*risk-based approach*): più un sistema AI può incidere sui diritti fondamentali delle persone, più stringenti sono gli obblighi.

**Le quattro fasce di rischio:**

1. 🔴 **Rischio inaccettabile — vietato.** Include social scoring, manipolazione subliminale o ingannevole delle persone, sorveglianza biometrica di massa in tempo reale in spazi pubblici (salvo eccezioni molto limitate). Divieto in vigore dal **2 febbraio 2025**.
2. 🟠 **Alto rischio — fortemente regolamentato.** Sistemi usati in ambiti come selezione del personale, accesso al credito, istruzione (es. valutazione automatica di esami), dispositivi medici, infrastrutture critiche. Richiedono documentazione tecnica, gestione del rischio, supervisione umana, registrazione in un database europeo.
3. 🟡 **Rischio limitato — obblighi di trasparenza.** Riguarda ad esempio i chatbot: l'utente deve sapere che sta parlando con un'AI, e i contenuti generati o manipolati dall'AI (deepfake, testi, audio, video sintetici) devono essere dichiarati come tali.
4. 🟢 **Rischio minimo — nessun obbligo specifico.** La maggior parte delle applicazioni AI attuali (filtri antispam, videogiochi con AI, ecc.) rientra qui.

**Due ruoli fondamentali da distinguere:**
- **Provider**: chi sviluppa e immette sul mercato un sistema AI (es. le aziende che creano i grandi modelli).
- **Deployer**: chi utilizza un sistema AI nella propria organizzazione (es. una scuola che usa un chatbot AI per gli studenti, un'azienda che integra un LLM nei propri processi).

Gli obblighi cambiano a seconda del ruolo: un deployer ha responsabilità più leggere di un provider, ma non ne è comunque esente.

**Il calendario di applicazione (aggiornato a luglio 2026):**

| Data | Cosa entra in vigore |
|---|---|
| 2 febbraio 2025 | Divieto dei sistemi a rischio inaccettabile |
| 2 agosto 2025 | Obblighi per i modelli di AI per finalità generale (GPAI) — riguarda direttamente chi usa LLM come Claude, GPT o Gemini in produzione |
| 2 agosto 2026 | Applicazione generale del regolamento e obblighi di trasparenza (art. 50): dichiarare quando un contenuto testuale, audio, video o un'interazione conversazionale è generato o manipolato dall'AI |
| 2 dicembre 2026 | Obbligo di etichettatura dei contenuti generati dall'AI; nuovi divieti assoluti su deepfake sessuali non consensuali e materiale di abuso su minori generato con l'AI |
| 2 dicembre 2027 / 2 agosto 2028 | Obblighi completi per i sistemi ad **alto rischio** (documentazione tecnica, valutazione di conformità, registrazione, monitoraggio) — date posticipate rispetto al calendario originario a seguito del pacchetto **AI Omnibus**, entrato in vigore il 27 luglio 2026 con l'obiettivo di semplificare gli adempimenti e dare più tempo agli standard tecnici di essere pronti |

> ⚠️ **Nota per il docente/formatore**: le scadenze sull'alto rischio sono state posticipate dal pacchetto di semplificazione "Digital Omnibus/AI Omnibus" nel corso del 2026. Le date qui riportate riflettono lo stato a luglio 2026, ma trattandosi di una normativa in evoluzione attiva, è buona pratica verificare periodicamente eventuali aggiornamenti sul sito ufficiale della Commissione Europea prima di ogni erogazione del corso.

Resta invece già pienamente in vigore, e non toccato dai rinvii, l'obbligo di **AI literacy** (alfabetizzazione all'AI): le organizzazioni che sviluppano o utilizzano sistemi AI devono promuovere una adeguata competenza e consapevolezza tra il proprio personale — la ragione stessa per cui esiste, non a caso, questo Master.

### 4.4 — Linee guida per un uso responsabile a scuola e in azienda

Non basta conoscere la norma: serve tradurla in comportamenti quotidiani. Alcuni principi guida trasversali:

- **Trasparenza dichiarata**: se un contenuto (testo, immagine, presentazione) è stato prodotto con l'aiuto dell'AI, dichiaralo. Vale per un docente che prepara materiali, per uno studente che consegna un elaborato, per un'azienda che pubblica contenuti.
- **Verifica umana (human-in-the-loop)**: non fidarti mai ciecamente di un output AI, specialmente su fatti, numeri, citazioni o decisioni che riguardano persone (es. valutazioni, selezioni, diagnosi).
- **Minimizzazione dei dati**: prima di caricare qualsiasi documento o dato su un servizio AI, chiediti se contiene informazioni personali o sensibili non necessarie.
- **Policy scritta**: sia a scuola che in azienda, è buona pratica avere una policy interna semplice che indichi quali strumenti AI sono ammessi, per quali usi, e quali dati non vanno mai condivisi.
- **Formazione continua**: la normativa e gli strumenti cambiano rapidamente; una policy scritta una volta e mai aggiornata è già superata.

[🔝 Torna all'indice del modulo](#top)

---

<a id="5-esempi"></a>
## 5. Esempi

**Esempio 1 — Copyright**
Uno studente chiede a un LLM di "scrivere una storia nello stile di Harry Potter, con Hermione come protagonista". Anche se il testo è tecnicamente "nuovo", riproduce personaggi e ambientazione protetti da copyright: non va pubblicato o diffuso come se fosse un'opera originale libera da diritti.

**Esempio 2 — Privacy in classe**
Un docente vuole usare un chatbot AI per correggere automaticamente i compiti in classe. Prima di farlo dovrebbe: verificare l'informativa privacy del servizio, evitare di caricare nome e cognome completi degli studenti (usare codici numerici), controllare se il fornitore usa i dati caricati per riaddestrare i propri modelli.

**Esempio 3 — Classificazione del rischio AI Act**
Un sistema AI che seleziona automaticamente i CV per un colloquio di lavoro rientra nella categoria **alto rischio** (impatto sull'accesso al lavoro): richiede documentazione, supervisione umana e trasparenza verso i candidati. Un filtro AI che suggerisce prodotti simili in un e-commerce rientra invece nel **rischio minimo**.

**Esempio 4 — Trasparenza**
Un'azienda pubblica un video promozionale con un testimonial generato tramite AI. In base agli obblighi di trasparenza dell'AI Act, il contenuto deve essere chiaramente etichettato come generato o manipolato artificialmente.

[🔝 Torna all'indice del modulo](#top)

---

<a id="6-laboratorio"></a>
## 6. Laboratorio Pratico

**Obiettivo:** applicare la classificazione del rischio dell'AI Act a casi reali.

**Attività (individuale o a coppie, 30-40 minuti):**

1. Ti viene fornita una lista di 10 casi d'uso AI (vedi materiale scaricabile: `casi_uso_ai_act.md`).
2. Per ciascun caso, assegna la fascia di rischio corretta (inaccettabile / alto / limitato / minimo) motivando la scelta in 2-3 righe.
3. Per ogni caso classificato come "alto rischio" o "inaccettabile", indica chi ricopre il ruolo di **provider** e chi di **deployer** nello scenario descritto.
4. Confronta le tue risposte con un compagno o in plenaria: dove sono emerse divergenze? Perché?

**Estensione (facoltativa):** scrivi una bozza di **policy AI** di una pagina per la tua scuola o il tuo contesto di lavoro, includendo almeno: strumenti ammessi, dati mai condivisibili, obbligo di dichiarazione dell'uso AI, referente per eventuali dubbi.

[🔝 Torna all'indice del modulo](#top)

---

<a id="7-best-practice"></a>
## 7. Best Practice

- ✅ Prima di usare un nuovo servizio AI, leggi (almeno in sintesi) l'informativa privacy e i termini di servizio.
- ✅ Preferisci, quando possibile, strumenti AI con sede o server nell'UE se tratti dati sensibili di minori.
- ✅ Documenta sempre quando un contenuto è stato generato o assistito dall'AI, anche internamente.
- ✅ Mantieni sempre un controllo umano finale sulle decisioni che impattano le persone.
- ✅ Aggiorna periodicamente la tua conoscenza della normativa: l'AI Act è in evoluzione attiva, come dimostra il pacchetto di semplificazione "AI Omnibus" del 2026.
- ✅ In ambito scolastico, coinvolgi sempre la dirigenza e, se necessario, il DPO (Responsabile della Protezione dei Dati) dell'istituto prima di adottare strumenti AI su larga scala.

[🔝 Torna all'indice del modulo](#top)

---

<a id="8-errori-comuni"></a>
## 8. Errori Comuni

- ❌ **"L'AI Act non mi riguarda, non sono un'azienda tech."** Falso: se usi sistemi AI nella tua organizzazione (scuola, PMI, studio professionale), sei comunque un *deployer* con specifici obblighi.
- ❌ **"Se lo genera l'AI, è automaticamente libero da copyright."** Falso: dipende da cosa riproduce l'output, non da come è stato creato.
- ❌ **"Il GDPR riguarda solo i dati finanziari o sanitari."** Falso: qualsiasi dato che identifica una persona (nome, foto, voce, comportamento) è dato personale.
- ❌ **"Le scadenze normative sono fisse e definitive."** Attenzione: come mostra il rinvio degli obblighi sull'alto rischio deciso nel 2026, il calendario dell'AI Act può cambiare; verifica sempre lo stato aggiornato prima di decisioni importanti.
- ❌ **Confondere "rischio inaccettabile" con "alto rischio".** Il primo è vietato per legge, il secondo è permesso ma fortemente regolamentato.

[🔝 Torna all'indice del modulo](#top)

---

<a id="9-riepilogo"></a>
## 9. Riepilogo

In questo modulo hai imparato che l'uso dell'AI non è solo una questione tecnica, ma anche **etica e giuridica**. Hai visto come il copyright si applichi sia ai dati usati per addestrare i modelli sia ai contenuti che generano; come il GDPR regoli ogni trattamento di dati personali effettuato tramite sistemi AI; come l'**AI Act europeo** classifichi i sistemi in quattro fasce di rischio, con obblighi diversi per *provider* e *deployer* e un calendario di applicazione tuttora in evoluzione. Infine, hai visto come tradurre questi principi in comportamenti concreti attraverso linee guida pratiche per scuola e azienda.

Questa consapevolezza normativa è il terzo e ultimo pilastro del Livello Base, insieme ai fondamenti di AI (Modulo 1) e al prompt engineering (Modulo 2). Nel Project Work di fine livello, unirai tutte e tre le competenze per costruire una raccolta di prompt professionali pronta per l'uso aziendale.

[🔝 Torna all'indice del modulo](#top)

---

<a id="10-glossario"></a>
## 10. Glossario

| Termine | Definizione |
|---|---|
| **AI Act** | Regolamento (UE) 2024/1689: prima legge organica al mondo sull'intelligenza artificiale, basata su un approccio per livelli di rischio |
| **GDPR** | Regolamento (UE) 2016/679 sulla protezione dei dati personali |
| **Provider** | Soggetto che sviluppa e immette sul mercato un sistema AI |
| **Deployer** | Soggetto che utilizza un sistema AI nella propria organizzazione |
| **Rischio inaccettabile** | Categoria di usi AI vietati per legge (es. social scoring) |
| **Alto rischio** | Categoria di sistemi AI ammessi ma soggetti a obblighi stringenti |
| **GPAI** | *General Purpose AI*: modelli di intelligenza artificiale per finalità generale (es. i grandi LLM) |
| **Human-in-the-loop** | Principio per cui una decisione automatizzata resta sempre soggetta a supervisione e verifica umana |
| **AI literacy** | Alfabetizzazione all'AI: obbligo di promuovere competenza e consapevolezza sull'uso dei sistemi AI |
| **Text and data mining** | Estrazione automatizzata di informazioni da grandi quantità di testo o dati, rilevante per l'addestramento dei modelli |
| **Opt-out (riserva dei diritti)** | Facoltà per un titolare di diritti d'autore di escludere i propri contenuti dall'uso per addestramento AI |

[🔝 Torna all'indice del modulo](#top)

---

<a id="11-quiz"></a>
## 11. Quiz di Autovalutazione

*(Formato compatibile con il parser Quiz Markdown della piattaforma)*

**1. Qual è la base giuridica dell'AI Act?**
- A) Direttiva UE, da recepire in ogni Stato membro
- B) Regolamento UE, direttamente applicabile senza recepimento nazionale ✅
- C) Trattato internazionale volontario
- D) Legge italiana adottata autonomamente

**2. In quale fascia di rischio rientra un sistema di social scoring?**
- A) Rischio minimo
- B) Rischio limitato
- C) Alto rischio
- D) Rischio inaccettabile (vietato) ✅

**3. Chi è il "deployer" secondo l'AI Act?**
- A) Chi sviluppa il sistema AI
- B) Chi utilizza il sistema AI nella propria organizzazione ✅
- C) Chi ne vieta l'uso
- D) L'organo di controllo europeo

**4. Il GDPR si applica a un sistema AI solo se tratta dati sanitari o finanziari.**
- A) Vero
- B) Falso: si applica a qualsiasi dato che identifica una persona ✅

**5. Un contenuto generato da un'AI è automaticamente libero da copyright.**
- A) Vero
- B) Falso: dipende da cosa l'output riproduce, non da come è stato creato ✅

**6. Cosa richiede l'obbligo di trasparenza per i chatbot previsto dall'AI Act?**
- A) Nulla, i chatbot sono a rischio minimo
- B) Che l'utente sappia di star interagendo con un sistema AI ✅
- C) Il divieto assoluto dei chatbot
- D) Una licenza governativa

**7. Cosa si intende per "AI literacy" nell'AI Act?**
- A) Un esame obbligatorio per usare l'AI
- B) L'obbligo di promuovere competenza e consapevolezza sull'AI nelle organizzazioni ✅
- C) Un certificato rilasciato solo alle aziende tech
- D) Un divieto di formazione sull'AI

[🔝 Torna all'indice del modulo](#top)

---

<a id="12-project-work"></a>
## 12. Project Work del Modulo

**Consegna:** Scegli un contesto reale (la tua scuola, il tuo posto di lavoro, o un'attività immaginaria coerente con il tuo settore) e produci un documento di 1-2 pagine intitolato **"Linee Guida per l'Uso Responsabile dell'AI"**, che includa:

1. Un elenco degli strumenti AI ammessi e per quali usi.
2. Una sezione su quali dati non vanno mai condivisi con servizi AI esterni.
3. Un riferimento esplicito ad almeno due principi del GDPR applicati al contesto scelto.
4. Una classificazione del rischio (secondo l'AI Act) di almeno un caso d'uso concreto del tuo contesto.
5. Una procedura semplice per dichiarare quando un contenuto è stato generato con l'AI.

Questo documento confluirà, insieme ai lavori dei Moduli 1 e 2, nel **Project Work di fine Livello Base**: la raccolta di prompt professionali.

[🔝 Torna all'indice del modulo](#top)

---

<a id="13-materiale-scaricabile"></a>
## 13. Materiale Scaricabile

- 📄 `casi_uso_ai_act.md` — I 10 casi d'uso per il laboratorio di classificazione del rischio
- 📄 `template_policy_ai.md` — Template vuoto per la policy AI (scuola/azienda)
- 📄 `checklist_privacy_ai.md` — Checklist rapida GDPR prima di usare un servizio AI
- 📊 `tabella_scadenze_ai_act.md` — Tabella riepilogativa delle scadenze normative, aggiornabile

*(I file sono disponibili nella sezione risorse del modulo sulla piattaforma)*

[🔝 Torna all'indice del modulo](#top)

---

<a id="14-bibliografia"></a>
## 14. Bibliografia

- Regolamento (UE) 2024/1689 del Parlamento europeo e del Consiglio del 13 giugno 2024 (AI Act)
- Regolamento (UE) 2016/679 del Parlamento europeo e del Consiglio del 27 aprile 2016 (GDPR)
- Floridi, L. — *Etica dell'Intelligenza Artificiale*, Raffaello Cortina Editore
- Pizzetti, F. — *Intelligenza artificiale, protezione dei dati personali e regolazione*, Giappichelli

[🔝 Torna all'indice del modulo](#top)

---

<a id="15-sitografia"></a>
## 15. Sitografia

- Commissione Europea — Sito ufficiale AI Act: digital-strategy.ec.europa.eu
- Garante per la Protezione dei Dati Personali (Italia): garanteprivacy.it
- European Data Protection Board: edpb.europa.eu
- EUR-Lex (testo integrale dei regolamenti UE): eur-lex.europa.eu

> ⚠️ Ricorda: la normativa AI è in continua evoluzione. Verifica sempre le fonti ufficiali per gli aggiornamenti più recenti prima di prendere decisioni operative.

[🔝 Torna all'indice del modulo](#top)

---

**[👉 Prosegui con il Livello Successivo]**
