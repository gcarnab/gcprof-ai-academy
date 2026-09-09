---
title: "DB - M6 - Relazioni tra Tabelle"
description: "Quiz di verifica finale sui concetti chiave del Modulo 6: relazioni Uno-a-Molti, ridondanza dei dati, chiavi esterne (FOREIGN KEY), normalizzazione e query con INNER JOIN."
penalty_enabled: true
negative_mark: 0.25
---

# Q1
Vero o Falso: in una relazione Uno-a-Molti, un singolo record della tabella "Molti" può essere collegato a più record della tabella "Uno".
- [ ] A) Vero, la relazione funziona in entrambe le direzioni allo stesso modo.
- [x] B) Falso, è il contrario: un singolo record della tabella "Uno" può essere collegato a più record della tabella "Molti".
- [ ] C) Vero, ma solo se la tabella "Molti" ha una chiave primaria.
- [ ] D) Falso, in una relazione Uno-a-Molti non esistono record collegati.

# Q2
Che cos'è la ridondanza dei dati?
- [ ] A) Un tipo speciale di chiave primaria.
- [x] B) La ripetizione non necessaria della stessa informazione in più punti del database.
- [ ] C) Un comando SQL per unire due tabelle.
- [ ] D) Un vincolo che impedisce l'inserimento di valori duplicati.

# Q3
Vero o Falso: una chiave esterna (`FOREIGN KEY`) fa riferimento alla chiave primaria di un'altra tabella.
- [x] A) Vero, è proprio questo il collegamento che una chiave esterna formalizza.
- [ ] B) Falso, una chiave esterna fa sempre riferimento a un'altra chiave esterna.
- [ ] C) Vero, ma solo se le due tabelle hanno lo stesso nome di colonna.
- [ ] D) Falso, la chiave esterna non ha alcun collegamento con altre tabelle.

# Q4
In quale delle due tabelle di una relazione Uno-a-Molti va inserita la chiave esterna?
- [ ] A) Nella tabella che rappresenta il lato "Uno" della relazione.
- [x] B) Nella tabella che rappresenta il lato "Molti" della relazione.
- [ ] C) In entrambe le tabelle contemporaneamente.
- [ ] D) Non è mai necessario inserirla in nessuna delle due tabelle.

# Q5
Quale comando SQLite bisogna eseguire per abilitare il controllo delle chiavi esterne?
- [x] A) `PRAGMA foreign_keys = ON;`
- [ ] B) `ENABLE FOREIGN KEYS;`
- [ ] C) `SET foreign_keys = TRUE;`
- [ ] D) Non serve, è attivo per impostazione predefinita in SQLite.

# Q6
Vero o Falso: `INNER JOIN` unisce in modo permanente due tabelle in una sola, modificando la struttura del database.
- [ ] A) Vero, dopo un `INNER JOIN` le due tabelle originali smettono di esistere.
- [x] B) Falso, `INNER JOIN` combina i dati solo temporaneamente, per la durata della query: le tabelle restano distinte nel database.
- [ ] C) Vero, ma solo se si usa anche `CREATE TABLE`.
- [ ] D) Falso, `INNER JOIN` può essere usato solo su una singola tabella.

# Q7
Qual è la regola pratica di base della normalizzazione affrontata in questo modulo?
- [ ] A) Ogni tabella deve avere esattamente cinque colonne.
- [x] B) Ogni informazione dovrebbe vivere in un solo posto del database.
- [ ] C) Ogni colonna deve avere il vincolo `UNIQUE`.
- [ ] D) Ogni tabella deve contenere almeno una chiave esterna.

# Q8
Vero o Falso: con `INNER JOIN`, uno studente che non ha ancora nessun voto registrato comparirà comunque nel risultato, con campi vuoti per i voti.
- [ ] A) Vero, `INNER JOIN` mostra sempre tutti i record di entrambe le tabelle.
- [x] B) Falso, `INNER JOIN` restituisce solo le righe che trovano corrispondenza in entrambe le tabelle: uno studente senza voti non comparirebbe.
- [ ] C) Vero, ma solo se la chiave esterna è impostata come `NOT NULL`.
- [ ] D) Falso, perché `INNER JOIN` non può essere usato con tabelle vuote.

# OPEN
Spiega con parole tue perché "schiacciare" tutte le informazioni (es. dati di uno studente e i suoi voti) in un'unica grande tabella porta a ridondanza, e come la separazione in due tabelle collegate da una chiave esterna risolve questo problema. Porta un esempio concreto (a scuola, in azienda o nel marketing) di un'informazione che, se non separata correttamente, rischierebbe di diventare incoerente nel tempo, e spiega a cosa serve `INNER JOIN` per recuperare comunque quell'informazione in un'unica query.