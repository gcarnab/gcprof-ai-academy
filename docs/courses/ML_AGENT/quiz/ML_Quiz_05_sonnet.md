---
title: "ML - Project Work Finale"
description: "Quiz di verifica finale sui concetti chiave del Project Work: requisiti dei due percorsi, buone pratiche di consegna, criteri di valutazione."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Qual è l'obiettivo principale del Project Work rispetto ai quattro moduli del corso?
- [ ] A) Ripetere esattamente gli stessi esercizi già svolti nei moduli, sugli stessi dataset.
- [x] B) Applicare in autonomia, su dati o ambienti nuovi, le competenze viste nei moduli, senza una traccia guidata passo per passo.
- [ ] C) Studiare solo teoria, senza scrivere alcun codice.
- [ ] D) Scegliere un unico algoritmo e ripeterlo su più dataset identici.

# Q2
Cosa richiede, come requisito minimo sul dataset, il Percorso A — Pipeline ML comparativa?
- [ ] A) Un dataset già incluso in scikit-learn o seaborn, come quelli usati nei moduli.
- [x] B) Un dataset reale da fonti pubbliche (es. Kaggle, UCI), con almeno 200 esempi e almeno 2 classi target.
- [ ] C) Un dataset privo di qualunque valore mancante, così da evitare la fase di preprocessing.
- [ ] D) Un dataset con una sola feature numerica.

# Q3
Quali fasi deve includere la pipeline del Percorso A?
- [ ] A) Solo un modello supervisionato, senza clustering né rete neurale.
- [x] B) Preprocessing, un modello supervisionato, un clustering esplorativo, una rete neurale, e un confronto motivato tra gli approcci.
- [ ] C) Solo il confronto finale tra modelli, senza implementarli.
- [ ] D) Solo il clustering esplorativo, propedeutico a un futuro modello supervisionato.

# Q4
Nel Percorso B — AI Agent su ambiente Gymnasium, quale requisito riguarda l'ambiente da scegliere?
- [ ] A) Deve essere necessariamente Taxi-v3, lo stesso ambiente visto nel Modulo 4.
- [x] B) Deve essere un ambiente Gymnasium diverso da Taxi-v3, con spazio di stati e azioni discreto, compatibile con una Q-table.
- [ ] C) Deve essere un ambiente con spazio di stati continuo, non rappresentabile con una Q-table.
- [ ] D) Può essere un ambiente qualunque, anche non appartenente a Gymnasium.

# Q5
Cosa significa, nel Percorso B, "confrontare almeno due configurazioni di iperparametri" e "analizzare la convergenza"?
- [ ] A) Addestrare un solo agente e valutarlo due volte con lo stesso codice.
- [x] B) Addestrare agenti separati con combinazioni diverse di parametri (es. α, γ, epsilon decay) e confrontarne le curve di reward medio per capire quale converge più rapidamente o raggiunge risultati migliori.
- [ ] C) Cambiare due volte l'ambiente Gymnasium usato, mantenendo fissi tutti gli iperparametri.
- [ ] D) Eseguire il training una sola volta e riportare solo il reward dell'ultimo episodio.

# Q6
Perché, secondo le best practice del Project Work, è sconsigliato scegliere un dataset o un ambiente troppo simile a quelli già usati nei moduli?
- [ ] A) Perché scikit-learn e Gymnasium impongono un limite al numero di utilizzi di uno stesso dataset o ambiente.
- [x] B) Perché l'obiettivo del Project Work è applicare le competenze a qualcosa di nuovo, non ripetere un laboratorio già svolto.
- [ ] C) Perché i dataset già visti nei moduli contengono errori che ne impediscono il riutilizzo.
- [ ] D) Perché un dataset nuovo richiede sempre meno preprocessing di uno già noto.

# Q7
Quale caratteristica NON è richiesta nella struttura di consegna del Project Work?
- [ ] A) Un notebook eseguibile dall'inizio alla fine senza errori.
- [ ] B) Celle Markdown che separano le fasi del lavoro, con un'introduzione e una conclusione.
- [ ] C) Almeno un grafico per ciascuna fase rilevante del lavoro.
- [x] D) L'uso obbligatorio sia del Percorso A sia del Percorso B da parte di ogni studente.

# Q8
Tra i criteri di valutazione elencati, cosa si intende per "motivazione delle scelte"?
- [ ] A) Il numero totale di celle di codice presenti nel notebook.
- [x] B) Il fatto che ogni scelta tecnica rilevante (algoritmo, iperparametri, preprocessing) sia spiegata, e non solo implementata.
- [ ] C) La velocità di esecuzione complessiva del notebook.
- [ ] D) L'uso di librerie diverse da quelle già viste nei moduli del corso.

# OPEN
Descrivi quale percorso (A, B, o combinato) sceglieresti per il tuo Project Work e perché, indicando almeno un elemento tecnico specifico (un dataset, un algoritmo, un ambiente Gymnasium, un iperparametro) che vorresti approfondire rispetto a quanto già visto nei moduli del corso.