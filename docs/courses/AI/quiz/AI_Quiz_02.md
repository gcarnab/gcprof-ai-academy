---
title: "Modulo 2 - Prompt Engineering (Fondamenti)"
description: "Quiz di verifica finale sui concetti chiave del Modulo 2: tecniche Zero/One/Few Shot, delimitatori, prompting strutturato (XML/Markdown/JSON) e template parametrizzati."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Che cos'è un prompt?
- [ ] A) Un componente hardware che velocizza le risposte di un LLM.
- [x] B) Il testo di istruzione che invii a un LLM per ottenere una risposta.
- [ ] C) Un linguaggio di programmazione usato per addestrare i modelli.
- [ ] D) Un tipo di rete neurale specializzata nel testo.

# Q2
Quale tecnica di prompting NON fornisce alcun esempio al modello prima di chiedergli di eseguire il compito?
- [ ] A) Few Shot.
- [ ] B) One Shot.
- [x] C) Zero Shot.
- [ ] D) Prompt modulare.

# Q3
Quando conviene usare la tecnica Few Shot?
- [ ] A) Solo per compiti molto semplici e comuni.
- [x] B) Per compiti ambigui, sfumati o con un formato di output complesso da spiegare solo a parole.
- [ ] C) Solo quando si vuole una risposta più breve possibile.
- [ ] D) Mai: rallenta inutilmente la risposta del modello.

# Q4
A cosa servono i delimitatori (come virgolette triple o tag) in un prompt?
- [ ] A) A tradurre automaticamente il testo in un'altra lingua.
- [ ] B) A rendere il prompt più lungo e dettagliato.
- [x] C) A separare in modo chiaro istruzioni, contesto e dati, evitando ambiguità.
- [ ] D) A velocizzare il calcolo del modello.

# Q5
Quale affermazione descrive correttamente il formato JSON applicato a un prompt?
- [ ] A) È un formato adatto solo a chi sa già programmare.
- [ ] B) Serve esclusivamente a formattare titoli ed elenchi in modo leggibile.
- [x] C) Usa coppie chiave-valore ed è utile per ottenere un output prevedibile e strutturato.
- [ ] D) Non può contenere parametri variabili.

# Q6
Che cos'è un prompt "modulare e parametrizzato"?
- [ ] A) Un prompt che funziona con un solo modello di AI specifico.
- [x] B) Un template con una struttura fissa e segnaposto variabili, riutilizzabile cambiando solo i parametri.
- [ ] C) Un prompt che non contiene mai esempi.
- [ ] D) Un prompt scritto esclusivamente in linguaggio XML.

# Q7
Dove conviene posizionare le istruzioni principali all'interno di un prompt?
- [ ] A) Sempre e solo alla fine del testo.
- [ ] B) In un file separato, mai nel prompt stesso.
- [x] C) All'inizio, perché il modello dà più peso a ciò che legge per primo (e per ultimo).
- [ ] D) La posizione non ha alcuna influenza sulla risposta.

# Q8
Se un prompt Zero Shot non produce il risultato desiderato, qual è il primo passo consigliato per migliorarlo?
- [ ] A) Cambiare immediatamente modello di AI.
- [ ] B) Rendere il prompt più vago per lasciare più libertà al modello.
- [x] C) Renderlo più specifico o aggiungere uno o più esempi (One Shot / Few Shot).
- [ ] D) Eliminare tutte le istruzioni e ripetere solo la domanda.

# OPEN
Scegli un compito che svolgi spesso (es. riassumere appunti, generare idee per un tema, tradurre una frase) e scrivi un template di prompt modulare e parametrizzato per svolgerlo, indicando almeno due parametri variabili e spiegando perché hai scelto quella struttura.