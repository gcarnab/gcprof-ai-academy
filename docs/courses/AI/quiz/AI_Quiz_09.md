---
title: "AI - M9: Transformer"
description: "Quiz conclusivo per verificare le conoscenze su tokenizzazione, embedding, self-attention, multi-head attention e architetture Encoder/Decoder."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Cosa elabora effettivamente un LLM, a livello tecnico, quando riceve un testo?
- [ ] A) Lettere singole, una alla volta.
- [x] B) Token, unità che possono essere parole intere o parti di parola.
- [ ] C) Interi paragrafi come blocco unico e indivisibile.
- [ ] D) Solo suoni fonetici.

# Q2
Cos'è un embedding?
- [ ] A) Un algoritmo di compressione dei file di testo.
- [x] B) Una rappresentazione numerica vettoriale del significato di un token.
- [ ] C) Un tipo di funzione di attivazione.
- [ ] D) Il nome di un ottimizzatore usato nel Deep Learning.

# Q3
Perché è necessario il Positional Encoding in un Transformer?
- [x] A) Perché il Transformer elabora i token in parallelo e non conosce naturalmente il loro ordine, a differenza di una RNN.
- [ ] B) Perché altrimenti il modello non potrebbe calcolare la funzione di perdita.
- [ ] C) Perché serve a comprimere il testo prima della tokenizzazione.
- [ ] D) Perché è richiesto solo nei modelli di tipo Encoder.

# Q4
Cosa permette di fare il meccanismo di Self-Attention?
- [ ] A) Ridurre il numero di parametri del modello.
- [x] B) Permettere a ogni token di "pesare" quanto ogni altro token della sequenza è rilevante per interpretarlo correttamente.
- [ ] C) Convertire il testo in immagini.
- [ ] D) Eliminare automaticamente gli errori grammaticali.

# Q5
Qual è il vantaggio della Multi-Head Attention rispetto a una singola attenzione?
- [ ] A) Riduce drasticamente il numero di token da elaborare.
- [x] B) Permette di catturare in parallelo diversi tipi di relazioni linguistiche tra i token.
- [ ] C) Elimina la necessità del Positional Encoding.
- [ ] D) Rende il modello di tipo solo-Encoder.

# Q6
A quale famiglia architetturale appartiene un modello come BERT?
- [ ] A) Solo Decoder.
- [x] B) Solo Encoder.
- [ ] C) Encoder-Decoder.
- [ ] D) Nessuna delle precedenti, è un modello non basato su Transformer.

# Q7
A quale famiglia architetturale appartengono modelli come GPT, Llama, Gemma e Mistral?
- [ ] A) Solo Encoder.
- [x] B) Solo Decoder (autoregressivi).
- [ ] C) Encoder-Decoder.
- [ ] D) Reti convoluzionali.

# Q8
Perché la self-attention comporta un costo computazionale che cresce rapidamente con la lunghezza della sequenza?
- [x] A) Perché ogni token viene confrontato con tutti gli altri token della sequenza.
- [ ] B) Perché ogni token richiede una nuova funzione di attivazione.
- [ ] C) Perché il positional encoding raddoppia il numero di parametri.
- [ ] D) Perché la tokenizzazione diventa più lenta con testi lunghi.

# OPEN
Scegli due dei modelli pillar presentati nel modulo (BERT, GPT, Llama, Gemma, Mistral) e confrontali indicando: a quale famiglia architetturale appartengono (solo Encoder, solo Decoder o Encoder-Decoder), per quale tipo di compito sono più adatti, e in quale contesto reale (scolastico, lavorativo o di ricerca) sceglieresti l'uno piuttosto che l'altro.