<a id="indice-modulo"></a>
# Modulo 1: Fondamenti di AI
*Livello Base — Master in Intelligenza Artificiale, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Ogni volta che chiedi qualcosa a ChatGPT, che Instagram ti suggerisce un video, o che il tuo telefono riconosce il tuo viso per sbloccarsi, c'è dell'Intelligenza Artificiale al lavoro. Ma cos'è, davvero? E perché tutti — scuole, aziende, governi — ne parlano come della tecnologia che cambierà il prossimo decennio?

In questo modulo non ti chiediamo di credere sulla parola che l'AI sia importante: ti diamo gli strumenti per capirla dall'interno. Partiamo dalla sua storia (che è più lunga e più altalenante di quanto immagini), passiamo per la differenza — spesso confusa — tra AI, Machine Learning e Deep Learning, e arriviamo fino agli AI Agent, la frontiera più recente.

Non serve alcuna competenza pregressa: è il punto di partenza dell'intero Master.

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare, con parole tue, cos'è l'Intelligenza Artificiale e perché non è "magia" ma matematica e dati.
- Ricostruire le tappe principali della storia dell'AI, incluso il perché di due lunghi periodi di stallo (gli "AI Winter").
- Distinguere con chiarezza AI, Machine Learning e Deep Learning, e collocarli l'uno dentro l'altro correttamente.
- Descrivere a grandi linee come funziona una rete neurale, senza ancora entrare nella matematica (arriverà nel Modulo 8).
- Riconoscere cosa sono i Large Language Model (LLM) e perché GPT ha rappresentato una svolta.
- Capire cosa sono gli AI Agent e come si differenziano da un semplice chatbot.

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** curiosità e nessuna paura della tecnologia. Aver usato almeno una volta un chatbot (ChatGPT, Gemini, Copilot o simili) aiuta ma non è obbligatorio.
- **Non serve:** nessuna conoscenza di programmazione, matematica avanzata o statistica. Questo modulo è concettuale al 100%.

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Cos'è l'Intelligenza Artificiale

L'**Intelligenza Artificiale (AI)** è la capacità di un sistema informatico di svolgere compiti che, normalmente, richiederebbero intelligenza umana: capire un testo, riconoscere un'immagine, prendere una decisione, generare contenuti nuovi.

Attenzione a un'idea sbagliata molto diffusa: l'AI non "pensa" come un essere umano. Un sistema di AI riconosce **pattern** (schemi ricorrenti) in enormi quantità di dati, e usa quei pattern per fare previsioni o generare risposte. Quando un LLM scrive una frase, in realtà sta calcolando, parola dopo parola, quale sia la parola statisticamente più probabile da mettere dopo, dato tutto il contesto — non sta "capendo" nel senso in cui lo capiresti tu.

*Perché ti serve: distinguere "l'AI simula un comportamento intelligente" da "l'AI è intelligente come un umano" ti protegge dal fidarti ciecamente delle sue risposte — un tema che approfondiremo nel Modulo 3 (Etica).*

### 4.2 Breve storia dell'AI: tra entusiasmo e inverni

- **1950 — Alan Turing** propone il celebre "test di Turing": una macchina può dirsi intelligente se una persona non riesce a distinguere le sue risposte da quelle di un umano.
- **1956 — Conferenza di Dartmouth**: nasce ufficialmente il termine "Artificial Intelligence". Gli scienziati presenti erano convinti che in pochi anni le macchine avrebbero eguagliato l'intelligenza umana. Non andò così.
- **Anni '70 e fine anni '80 — gli "AI Winter"**: due periodi in cui i finanziamenti alla ricerca sull'AI crollarono, perché le tecnologie dell'epoca non riuscivano a mantenere le promesse fatte. È una lezione importante: l'entusiasmo tecnologico, se non sostenuto dai risultati, si sgonfia.
- **Anni 2000-2012 — rinascita silenziosa**: più dati disponibili (grazie a internet) e computer più potenti (le GPU, nate per i videogiochi, si rivelano perfette anche per l'AI) pongono le basi per la rinascita.
- **2012 — il Deep Learning esplode**: una rete neurale (AlexNet) stravince una gara di riconoscimento immagini, dimostrando la potenza delle reti "profonde". Da qui in avanti l'AI non si ferma più.
- **2017 — nasce l'architettura Transformer** (ne parleremo nel dettaglio nel Modulo 9): è la base tecnica di tutti i moderni chatbot.
- **2022-2023 — il momento GPT**: il lancio di ChatGPT porta l'AI generativa fuori dai laboratori e dentro le case, le scuole, gli uffici di centinaia di milioni di persone in pochi mesi.
- **2024-2026 — l'era degli AI Agent**: si passa da sistemi che *rispondono* a sistemi che *agiscono*: pianificano compiti, usano strumenti esterni (browser, calendari, codice) ed eseguono processi complessi in autonomia, spesso coordinando più agenti specializzati insieme.

*Perché ti serve: capire che l'AI di oggi è il risultato di 70 anni di alti e bassi ti aiuta a guardare con senso critico anche gli annunci di "rivoluzione" che leggi ogni settimana.*

### 4.3 AI, Machine Learning, Deep Learning: tre cerchi, non tre sinonimi

Sono tre termini che spesso vengono usati come se significassero la stessa cosa. Non è così — sono uno dentro l'altro, come scatole cinesi:

- **Intelligenza Artificiale (AI)**: il cerchio più grande. Ogni sistema che simula un comportamento intelligente, anche con regole scritte a mano da un programmatore (senza nessun apprendimento dai dati).
- **Machine Learning (ML)**: un sottoinsieme dell'AI. Qui il sistema non segue regole scritte da un umano, ma **impara dai dati**: gli mostri migliaia di esempi ed è il sistema stesso a trovare i pattern (lo vedrai in pratica nel Modulo 6).
- **Deep Learning (DL)**: un sottoinsieme del Machine Learning. Usa le **reti neurali artificiali**, strutture ispirate (in modo molto approssimativo) al funzionamento dei neuroni biologici, organizzate in molti "strati" (layer) — da qui il nome "profondo" (deep).

Gli LLM come GPT, Gemini o Claude sono un prodotto del Deep Learning.

### 4.4 Reti neurali: un'idea semplice, non ancora la matematica

Una **rete neurale artificiale** è composta da unità semplici, chiamate **neuroni artificiali**, collegate tra loro in strati. Ogni neurone riceve numeri in ingresso, li combina secondo un peso (un'importanza), e produce un numero in uscita che passa al neurone successivo.

Immagina una catena di montaggio dove ogni operaio (neurone) fa una piccola trasformazione al pezzo che riceve prima di passarlo al collega successivo. Nessun singolo operaio "capisce" l'oggetto finale — ma la catena nel suo insieme sì.

Durante l'addestramento, la rete regola questi "pesi" milioni di volte, confrontando le proprie risposte con la risposta corretta, fino a ridurre l'errore. Il come questo avvenga nel dettaglio (Gradient Descent, Backpropagation) lo vedrai passo passo nel Modulo 8: qui basta l'idea generale.

### 4.5 AI Generativa e Large Language Model (LLM)

L'**AI Generativa** è quella branca dell'AI capace di creare contenuti nuovi — testo, immagini, audio, video — invece di limitarsi a classificare o prevedere.

Un **Large Language Model (LLM)** è un modello di Deep Learning addestrato su enormi quantità di testo, capace di generare linguaggio naturale. "Large" si riferisce sia alla mole di dati di addestramento sia al numero di parametri (i "pesi" di cui parlavamo sopra) — spesso centinaia di miliardi.

ChatGPT (basato sui modelli GPT di OpenAI), Gemini (Google) e Claude (Anthropic) sono tutti LLM, anche se costruiti e addestrati in modo diverso da aziende diverse.

### 4.6 Dai chatbot agli AI Agent

Un **chatbot** classico risponde a una domanda e si ferma lì: tu chiedi, lui risponde, la conversazione finisce.

Un **AI Agent** va oltre: riceve un obiettivo (non solo una domanda), lo scompone in passaggi, decide quali strumenti usare (una ricerca sul web, una calcolatrice, un file, un altro programma) ed esegue quei passaggi in autonomia, verificando i risultati man mano. È la differenza tra chiedere a qualcuno "che tempo fa domani?" e chiedergli "organizzami il viaggio di domani tenendo conto del meteo, del traffico e del mio budget".

Sempre più spesso, oggi, più agenti specializzati lavorano insieme come una piccola squadra — uno che cerca informazioni, uno che le analizza, uno che scrive il risultato finale — coordinati da un agente "capo progetto". Approfondiremo questa architettura nel Modulo 11.

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** un LLM che ti aiuta a riassumere un capitolo di storia è AI Generativa; un sistema che segnala automaticamente gli studenti a rischio di abbandono scolastico analizzando le assenze è Machine Learning "classico" (classificazione).
- **Sui social:** l'algoritmo che decide quale video mostrarti su TikTok o Instagram è Machine Learning che ha imparato dai tuoi comportamenti passati (Deep Learning, in gran parte).
- **Nei videogiochi:** un nemico che si muove seguendo regole fisse scritte dal programmatore è AI "classica" senza apprendimento; un nemico che migliora la sua strategia giocando migliaia di partite contro se stesso è Reinforcement Learning (lo vedrai nel Modulo 6).
- **Nel lavoro quotidiano:** un assistente che, da solo, ti prenota un viaggio confrontando voli, hotel e budget è un esempio concreto di AI Agent.

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: "Riconosci il tipo di AI"** (nessun codice richiesto)

1. Apri un LLM a tua scelta (ChatGPT, Gemini, Claude, Copilot).
2. Chiedigli di descrivere il funzionamento di 3 tecnologie che usi ogni giorno (es. filtro antispam email, assistente vocale, sistema di raccomandazione di uno store online).
3. Per ciascuna, prova a classificarla tu: è AI "a regole", Machine Learning o Deep Learning? Motiva la risposta in 2-3 righe.
4. Chiedi poi all'LLM di verificare la tua classificazione e confronta le argomentazioni.

*Obiettivo:* allenarti a distinguere le tre categorie in casi reali, non solo in teoria — e iniziare a usare un LLM in modo critico, non come oracolo infallibile.

---

<a id="best-practice"></a>
## 7. Best Practice

- Quando leggi che "l'AI ha deciso X", chiediti sempre: su quali dati è stata addestrata? Dati distorti producono decisioni distorte.
- Non confondere la scala del modello (quanti parametri ha) con la sua qualità: un modello più grande non è automaticamente più adatto al tuo compito.
- Tieni distinti i tre livelli (AI, ML, DL): userai questo linguaggio in tutto il resto del Master.
- Segui l'evoluzione dell'AI Agent con occhio critico: nel 2026 la maturità di questi sistemi varia molto a seconda dell'ambito applicativo — non tutto ciò che si definisce "agente" è già affidabile per compiti critici.

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"L'AI capisce quello che scrive."* → In realtà predice la parola statisticamente più probabile, dato il contesto: non ha una comprensione del significato come la tua.
- ❌ *"Machine Learning e Intelligenza Artificiale sono la stessa cosa."* → Il Machine Learning è un sottoinsieme dell'AI, non un sinonimo.
- ❌ *"Le reti neurali funzionano esattamente come il cervello umano."* → Sono ispirate al cervello in modo molto astratto, ma i meccanismi reali sono profondamente diversi.
- ❌ *"Un AI Agent è solo un chatbot più elaborato."* → La differenza chiave è l'autonomia: pianifica e agisce su più passaggi verso un obiettivo, non risponde a un singolo prompt.
- ❌ *"Più un'AI è recente, più è affidabile per qualsiasi compito."* → Dipende dal dominio di applicazione e da come è stata addestrata e validata.

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| AI | Sistemi che simulano comportamenti intelligenti |
| Machine Learning | Sottoinsieme dell'AI: impara dai dati invece che da regole scritte |
| Deep Learning | Sottoinsieme del ML: usa reti neurali a più strati |
| Rete neurale | Neuroni artificiali collegati in strati, con pesi regolabili |
| AI Generativa | Branca dell'AI che crea contenuti nuovi |
| LLM | Modello di Deep Learning addestrato su testo, alla base dei chatbot moderni |
| AI Agent | Sistema che pianifica ed esegue compiti in autonomia verso un obiettivo |
| AI Winter | Periodi storici di stallo nella ricerca e nei finanziamenti sull'AI |

---

<a id="glossario"></a>
## 10. Glossario

- **AI Agent** — sistema di AI capace di pianificare ed eseguire in autonomia più passaggi verso un obiettivo, usando strumenti esterni.
- **AI Generativa** — branca dell'AI che crea contenuti nuovi (testo, immagini, audio, video).
- **AI Winter** — periodo storico di forte rallentamento della ricerca e degli investimenti in AI.
- **Deep Learning** — sottoinsieme del Machine Learning basato su reti neurali con molti strati.
- **GPU** — processore originariamente pensato per la grafica dei videogiochi, oggi fondamentale per addestrare modelli di AI.
- **LLM (Large Language Model)** — modello di Deep Learning addestrato su grandi quantità di testo per generare linguaggio naturale.
- **Machine Learning** — sottoinsieme dell'AI in cui il sistema impara pattern dai dati invece di seguire regole scritte da un programmatore.
- **Parametro** — valore numerico interno a un modello (peso), regolato durante l'addestramento.
- **Rete neurale artificiale** — struttura computazionale a strati, ispirata in modo astratto al cervello, alla base del Deep Learning.
- **Test di Turing** — criterio proposto da Alan Turing per valutare se una macchina mostra un comportamento indistinguibile da quello umano.
- **Transformer** — architettura di rete neurale, introdotta nel 2017, alla base dei moderni LLM (dettagli nel Modulo 9).

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: il Machine Learning è un sinonimo di Intelligenza Artificiale.
`Falso — è un sottoinsieme dell'AI.`

**2.** Cosa fu la Conferenza di Dartmouth (1956)?
- a) La prima gara di robotica
- b) L'evento in cui nacque ufficialmente il termine "Artificial Intelligence" ✅
- c) Il lancio del primo chatbot
- d) La nascita del Deep Learning

**3.** Vero o Falso: gli "AI Winter" furono periodi di forte crescita degli investimenti in AI.
`Falso — furono periodi di forte rallentamento.`

**4.** Metti in ordine corretto, dal più grande al più piccolo: Deep Learning, Intelligenza Artificiale, Machine Learning.
`AI → Machine Learning → Deep Learning`

**5.** Cosa distingue principalmente un AI Agent da un chatbot tradizionale?
- a) Usa più parametri
- b) Genera immagini oltre al testo
- c) Pianifica ed esegue più passaggi in autonomia verso un obiettivo ✅
- d) Risponde più velocemente

**6.** Vero o Falso: un LLM "capisce" il significato delle parole esattamente come un essere umano.
`Falso — predice la parola più probabile dato il contesto, senza comprensione umana.`

**7.** Le GPU sono diventate importanti per l'AI perché:
- a) Sono state inventate apposta per il Deep Learning
- b) Erano già diffuse nei videogiochi e si sono rivelate adatte anche al calcolo delle reti neurali ✅
- c) Costano meno delle CPU
- d) Servono solo per la grafica

**8.** In quale anno viene introdotta l'architettura Transformer, base dei moderni LLM?
`2017`

**9.** Vero o Falso: un modello di AI più recente è sempre più affidabile di uno precedente, in ogni ambito.
`Falso — l'affidabilità dipende dal dominio applicativo e dalla validazione.`

**10.** Perché più agenti AI specializzati vengono oggi spesso coordinati insieme invece di usarne uno solo?
`Per dividere un compito complesso in parti (ricerca, analisi, esecuzione) gestite ciascuna dall'agente più adatto, coordinate da un agente "capo progetto".`

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet "AI vs ML vs DL" (1 pagina, da produrre in PDF)
- 📊 Timeline illustrata della storia dell'AI (da produrre come infografica)
- 📝 Slide riassuntive del modulo (da produrre in formato .pptx)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Russell, S., Norvig, P. — *Artificial Intelligence: A Modern Approach*
- Goodfellow, I., Bengio, Y., Courville, A. — *Deep Learning*
- Turing, A. — *Computing Machinery and Intelligence* (1950)

---

<a id="sitografia"></a>
## 15. Sitografia

- IBM Think — approfondimenti sull'evoluzione degli AI Agent
- Documentazione ufficiale OpenAI, Google DeepMind, Anthropic sui rispettivi modelli
- AI Office dell'Unione Europea — definizioni istituzionali su AI e AI Agent

[🔙 Torna all'indice del modulo](#indice-modulo)