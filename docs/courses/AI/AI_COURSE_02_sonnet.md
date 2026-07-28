<a id="indice-modulo"></a>
# Modulo 2: Prompt Engineering (Fondamenti)
*Livello Base — Master in Intelligenza Artificiale, GCProf Academy*

📑 [Introduzione](#intro) · [Obiettivi](#obiettivi) · [Prerequisiti](#prerequisiti) · [Lezioni](#lezioni) · [Esempi](#esempi) · [Laboratorio](#laboratorio) · [Best Practice](#best-practice) · [Errori comuni](#errori) · [Riepilogo](#riepilogo) · [Glossario](#glossario) · [Quiz](#quiz) · [Materiale scaricabile](#materiale) · [Bibliografia](#bibliografia) · [Sitografia](#sitografia)

---

<a id="intro"></a>
## 1. Introduzione

Hai mai chiesto qualcosa a un LLM e ottenuto una risposta deludente, generica, o completamente fuori bersaglio? Il problema, quasi sempre, non è l'AI: è **come** gliel'hai chiesto.

Un LLM non legge nella tua mente. Risponde solo a ciò che gli scrivi — parola per parola. Cambiare il modo in cui formuli una richiesta può trasformare una risposta mediocre in una eccellente, senza toccare il modello stesso.

Questa disciplina si chiama **Prompt Engineering**: l'arte (e in parte la scienza) di scrivere istruzioni efficaci per un'AI. In questo modulo impari le tecniche di base, quelle che userai ogni giorno, prima di passare — nel Modulo 7 — alle tecniche avanzate.

---

<a id="obiettivi"></a>
## 2. Obiettivi

Al termine di questo modulo saprai:

- Spiegare cos'è un prompt e perché la sua formulazione cambia radicalmente la qualità della risposta.
- Applicare le tecniche Zero Shot, One Shot e Few Shot a seconda del compito.
- Usare i delimitatori per separare istruzioni, contesto e dati in un prompt.
- Scrivere prompt strutturati in formato XML, Markdown e JSON.
- Costruire un template di prompt modulare, riutilizzabile e parametrizzato.

---

<a id="prerequisiti"></a>
## 3. Prerequisiti

- **Serve:** aver completato il Modulo 1 (sapere cos'è un LLM è indispensabile per capire perché queste tecniche funzionano).
- **Non serve:** nessuna competenza di programmazione. I formati XML/JSON che vedremo qui si scrivono a mano, come si scrive un testo formattato.

---

<a id="lezioni"></a>
## 4. Lezioni

### 4.1 Cos'è un prompt, e perché la formulazione conta così tanto

Un **prompt** è il testo che invii a un LLM per ottenere una risposta. Ricordi, dal Modulo 1, che un LLM genera la parola più probabile in base al contesto che gli dai? Ecco perché il prompt conta: è l'unico contesto che il modello ha. Se è vago, la risposta sarà vaga; se è preciso, la risposta sarà precisa.

Confronta questi due prompt:
- *"Parlami dell'Italia."* → risposta generica, potrebbe andare in mille direzioni diverse.
- *"Scrivi 5 righe sull'economia italiana negli anni '90, per una presentazione scolastica di terza superiore."* → risposta mirata, con lunghezza, argomento e pubblico definiti.

*Perché ti serve: prima ancora di conoscere le tecniche che seguono, il principio base è questo — più contesto specifico dai, meno il modello deve "indovinare".*

### 4.2 Zero Shot, One Shot, Few Shot: quanti esempi servono?

Queste tre tecniche si distinguono per **quanti esempi** fornisci al modello prima di chiedergli di eseguire il compito:

- **Zero Shot** — nessun esempio, solo l'istruzione diretta. *"Classifica questa recensione come positiva o negativa: 'Il film mi è piaciuto molto.'"* Funziona bene per compiti semplici e comuni.
- **One Shot** — un solo esempio, per mostrare il formato che vuoi. *"Esempio: 'Bellissimo!' → Positiva. Ora classifica: 'Non lo consiglio a nessuno.'"* Utile quando vuoi che il modello segua un formato specifico di risposta.
- **Few Shot** — più esempi (di solito 3-5), utile per compiti ambigui, sfumati, o con un formato di output complesso da spiegare solo a parole.

Regola pratica: più il compito è insolito o soggettivo, più esempi conviene dare.

### 4.3 Delimitatori: separare istruzioni, contesto e dati

Quando un prompt contiene più parti (istruzioni + un testo da analizzare, ad esempio), mescolare tutto in un unico blocco confonde il modello — e spesso anche te, quando rileggi il prompt.

I **delimitatori** sono simboli che separano chiaramente le parti del prompt: virgolette triple (`"""`), trattini (`---`), o tag come `<testo>...</testo>`.

Esempio senza delimitatori (confuso):
```
Riassumi questo testo in 3 punti il testo è oggi in Italia si è verificato un evento importante...
```

Esempio con delimitatori (chiaro):
```
Riassumi il testo seguente in 3 punti.

Testo:
"""
Oggi in Italia si è verificato un evento importante...
"""
```

### 4.4 Prompting strutturato: XML, Markdown, JSON

Quando un prompt diventa complesso (più istruzioni, più sezioni), i formati strutturati aiutano il modello a distinguere ogni parte senza ambiguità.

- **XML** — usa tag che si aprono e chiudono, utilissimi per separare sezioni lunghe: `<istruzioni>...</istruzioni>`, `<contesto>...</contesto>`, `<domanda>...</domanda>`.
- **Markdown** — usa `#` per i titoli, `-` per gli elenchi, `**grassetto**` per enfatizzare: è leggero e va benissimo per prompt di media complessità (lo stesso formato di questo modulo!).
- **JSON** — usa coppie chiave-valore tra parentesi graffe: `{"compito": "riassumi", "lunghezza": "3 righe"}`. È perfetto quando vuoi anche che l'output sia in un formato preciso e prevedibile (ne riparleremo nel Modulo 7 con lo Structured Output).

Non esiste un formato "giusto" in assoluto: XML è ottimo per separare blocchi di testo lunghi, Markdown per leggibilità umana, JSON per output prevedibili e parametri.

### 4.5 Prompt modulari, riutilizzabili e parametrizzati

Un prompt scritto una volta e mai più riadattato è un'occasione persa. Un **prompt modulare** separa la struttura fissa (che riusi sempre) dalle parti variabili (che cambiano ogni volta), dette **parametri** — segnaposto che sostituisci di volta in volta.

Esempio di template parametrizzato:
```
Sei un assistente che scrive riassunti per studenti di scuola superiore.

Argomento: {argomento}
Lunghezza richiesta: {numero_righe} righe
Livello: {livello_scolastico}

Testo da riassumere:
"""
{testo}
"""
```

Ogni volta che ti serve un riassunto, cambi solo i segnaposto tra parentesi graffe: il resto del template resta identico. Questo è il primo passo verso i **template professionali**, veri e propri strumenti di lavoro che costruirai nel Laboratorio e userai come base per il Project Work di fine livello (Modulo 3).

---

<a id="esempi"></a>
## 5. Esempi

- **A scuola:** un prompt Few Shot per far generare a un LLM domande di verifica nello stesso stile di quelle che il tuo insegnante scrive di solito, fornendo 3 esempi delle sue domande.
- **Per uno studio individuale:** un prompt con delimitatori per chiedere "spiega solo il contenuto tra i delimitatori, ignorando il resto" quando incolli un capitolo intero da un libro digitale.
- **In un contesto lavorativo:** un template JSON parametrizzato che un'azienda usa per generare automaticamente descrizioni prodotto, cambiando solo nome, categoria e caratteristiche.

---

<a id="laboratorio"></a>
## 6. Laboratorio

**Attività: "Costruisci il tuo primo template di prompt"** (nessun codice richiesto)

1. Scegli un compito che ripeti spesso (es. riassumere appunti, tradurre una frase, generare idee per un tema).
2. Scrivi prima una versione Zero Shot del prompt e testala su un LLM a tua scelta.
3. Riscrivi lo stesso prompt in versione Few Shot, con 2-3 esempi, e confronta le due risposte.
4. Trasforma il prompt migliore in un **template parametrizzato**, con almeno 2 segnaposto tra parentesi graffe.
5. Testa il template cambiando i parametri 3 volte, senza toccare il resto del testo.

*Obiettivo:* passare da "chiedo qualcosa a caso" a "costruisco uno strumento riutilizzabile" — la mentalità che userai per tutto il resto del Master.

---

<a id="best-practice"></a>
## 7. Best Practice

- Metti sempre le istruzioni principali **all'inizio** del prompt: il modello dà più peso a ciò che legge per primo e per ultimo.
- Usa i delimitatori ogni volta che nel prompt compare un testo lungo da analizzare: evita ambiguità su cosa è istruzione e cosa è contenuto.
- Sii specifico su formato, lunghezza e tono desiderato della risposta: non dare per scontato che il modello "capisca" cosa intendi per "breve" o "professionale".
- Quando un prompt Zero Shot non funziona bene, il primo tentativo di correzione è aggiungere un esempio (One Shot), non riscrivere tutto da capo.

---

<a id="errori"></a>
## 8. Errori comuni

- ❌ *"Se il prompt non funziona, il problema è il modello."* → Il primo sospettato è quasi sempre il prompt: prova a renderlo più specifico prima di cambiare modello.
- ❌ *"Più lungo è il prompt, meglio è."* → Un prompt lungo ma disordinato è peggio di uno breve e chiaro. Conta la struttura, non la lunghezza.
- ❌ *"Zero Shot va bene sempre, gli esempi sono solo per principianti."* → Il contrario: gli esempi sono spesso la tecnica più potente per compiti ambigui o con formato specifico.
- ❌ *"XML, Markdown e JSON servono solo ai programmatori."* → Sono semplici sistemi di formattazione: chiunque può scriverli a mano in un prompt.

---

<a id="riepilogo"></a>
## 9. Riepilogo

| Concetto | In una riga |
|---|---|
| Prompt | Il testo che invii a un LLM per ottenere una risposta |
| Zero Shot | Istruzione senza esempi |
| One Shot | Istruzione con un esempio |
| Few Shot | Istruzione con più esempi |
| Delimitatori | Simboli che separano istruzioni, contesto e dati nel prompt |
| XML prompting | Uso di tag per separare sezioni lunghe del prompt |
| Markdown prompting | Uso di titoli/elenchi per leggibilità del prompt |
| JSON prompting | Uso di chiave-valore per parametri e output prevedibili |
| Prompt modulare | Template con parti fisse e segnaposto variabili (parametri) |

---

<a id="glossario"></a>
## 10. Glossario

- **Delimitatore** — simbolo (virgolette triple, tag, trattini) che separa parti diverse di un prompt.
- **Few Shot** — tecnica di prompting con più esempi forniti al modello prima del compito.
- **JSON** — formato dati a coppie chiave-valore, usato anche per strutturare prompt e output.
- **One Shot** — tecnica di prompting con un solo esempio fornito al modello.
- **Parametro** (in un prompt) — segnaposto variabile in un template, sostituito di volta in volta con un valore specifico.
- **Prompt** — testo di istruzione inviato a un LLM.
- **Prompt Engineering** — disciplina che studia come scrivere prompt efficaci.
- **Template** — struttura di prompt riutilizzabile, con parti fisse e parti parametrizzate.
- **XML** — linguaggio a tag (apertura/chiusura) usato per strutturare sezioni di un prompt.
- **Zero Shot** — tecnica di prompting senza esempi, solo istruzione diretta.

---

<a id="quiz"></a>
## 11. Quiz

**1.** Vero o Falso: un LLM capisce le tue intenzioni anche se il prompt è vago.
`Falso — risponde solo al contesto scritto nel prompt, più è vago più la risposta sarà generica.`

**2.** Quale tecnica useresti per un compito ambiguo o con un formato di output complesso?
- a) Zero Shot
- b) One Shot
- c) Few Shot ✅
- d) Nessuna delle precedenti

**3.** A cosa servono i delimitatori in un prompt?
- a) A rendere il prompt più lungo
- b) A separare chiaramente istruzioni, contesto e dati ✅
- c) A tradurre il prompt in un'altra lingua
- d) A velocizzare la risposta del modello

**4.** Vero o Falso: JSON è utile quando vuoi un output prevedibile e strutturato.
`Vero.`

**5.** Cosa distingue un prompt "modulare" da un prompt scritto una tantum?
- a) È più corto
- b) Separa parti fisse e parametri variabili, per essere riutilizzato ✅
- c) Funziona solo con un modello specifico
- d) Non contiene istruzioni

**6.** Dove conviene posizionare le istruzioni principali in un prompt?
`All'inizio (e opzionalmente ripetute alla fine).`

**7.** Vero o Falso: se un prompt Zero Shot non funziona, il primo tentativo di correzione è cambiare modello AI.
`Falso — prima si prova ad aggiungere un esempio (One Shot) o a rendere il prompt più specifico.`

**8.** Quale formato useresti per separare in modo leggibile titoli, elenchi e testo in grassetto in un prompt?
`Markdown.`

**9.** Vero o Falso: XML, Markdown e JSON possono essere scritti a mano senza saper programmare.
`Vero.`

**10.** Qual è il vantaggio principale di un template parametrizzato rispetto a riscrivere il prompt ogni volta da capo?
`Permette di riutilizzare la stessa struttura cambiando solo i valori (parametri) tra parentesi graffe, risparmiando tempo ed errori.`

---

<a id="materiale"></a>
## 13. Materiale scaricabile

- 📄 Cheat-sheet "Zero/One/Few Shot: quando usarli" (1 pagina, da produrre in PDF)
- 📝 Raccolta di 5 template di prompt parametrizzati pronti all'uso (da produrre come file di testo)
- 📊 Slide riassuntive del modulo (da produrre in formato .pptx)

---

<a id="bibliografia"></a>
## 14. Bibliografia

- Brown, T. et al. — *Language Models are Few-Shot Learners* (paper GPT-3, 2020)
- White, J. et al. — *A Prompt Pattern Catalog to Enhance Prompt Engineering*

---

<a id="sitografia"></a>
## 15. Sitografia

- Documentazione ufficiale sul prompt engineering di OpenAI, Google, Anthropic
- Prompt Engineering Guide (risorsa open-source di riferimento)

[🔙 Torna all'indice del modulo](#indice-modulo)