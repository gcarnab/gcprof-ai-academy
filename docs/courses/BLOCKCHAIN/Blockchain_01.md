<a id="modulo-1"></a>

# 📘 Modulo 1 — Perché nasce la Blockchain
## Comprendere il problema prima della soluzione

> **Livello:** Base  
> **Durata stimata:** 4-5 ore  
> **Laboratori:** 2  
> **Quiz:** 15 domande  
> **Challenge:** 1  
> **Project Work:** No

---

<a id="indice-modulo"></a>

# 📑 Indice del Modulo

1. [Introduzione](#introduzione)
2. [Obiettivi formativi](#obiettivi)
3. [Prerequisiti](#prerequisiti)
4. [Lezione 1 — Viviamo in un mondo digitale](#lezione1)
5. [Lezione 2 — La fiducia nell'era di Internet](#lezione2)
6. [Lezione 3 — I sistemi centralizzati](#lezione3)
7. [Lezione 4 — I limiti dei sistemi tradizionali](#lezione4)
8. [Riepilogo della Parte 1](#riepilogo1)

---

<a id="introduzione"></a>

# 🌍 Introduzione

Quando senti parlare di **Blockchain**, probabilmente pensi subito a Bitcoin o alle criptovalute.

In realtà, queste rappresentano soltanto una piccola parte di un universo molto più ampio.

La Blockchain è prima di tutto una tecnologia.

Una tecnologia nata per risolvere un problema che accompagna Internet fin dalla sua nascita: **la fiducia**.

Ogni volta che utilizziamo un servizio online dobbiamo fidarci di qualcuno.

Ci fidiamo della banca quando effettuiamo un bonifico.

Ci fidiamo di Google quando salviamo un documento su Drive.

Ci fidiamo della scuola quando consultiamo il registro elettronico.

Ci fidiamo di Amazon quando effettuiamo un acquisto.

Ci fidiamo di Instagram quando pubblichiamo una fotografia.

La domanda è semplice.

**Possiamo costruire un sistema che funzioni anche senza doverci fidare di un'autorità centrale?**

Questa domanda ha cambiato la storia dell'informatica.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="obiettivi"></a>

# 🎯 Obiettivi formativi

Al termine di questo modulo sarai in grado di:

- comprendere perché è nata la Blockchain;
- distinguere un sistema centralizzato da uno decentralizzato;
- spiegare il concetto di fiducia digitale;
- riconoscere i limiti dei sistemi tradizionali;
- comprendere il problema del doppio pagamento;
- descrivere il contesto storico che ha portato alla nascita di Bitcoin.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="prerequisiti"></a>

# 📚 Prerequisiti

Per affrontare questo modulo non sono richieste competenze specifiche.

È sufficiente:

- saper utilizzare un computer;
- conoscere i principali servizi Internet;
- avere curiosità verso le nuove tecnologie.

Non è necessario conoscere:

- programmazione;
- reti informatiche;
- crittografia;
- economia;
- criptovalute.

Ogni argomento verrà introdotto gradualmente durante il corso.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione1"></a>

# 🖥️ Lezione 1 — Viviamo in un mondo digitale

Prova a pensare alla tua giornata.

Molto probabilmente hai già utilizzato Internet decine di volte.

Hai controllato WhatsApp.

Hai aperto Instagram.

Hai consultato il registro elettronico.

Hai cercato qualcosa su Google.

Hai visto un video su YouTube.

Hai ascoltato musica su Spotify.

Hai utilizzato ChatGPT.

Forse hai perfino effettuato un pagamento elettronico.

La nostra vita è diventata digitale.

Anche molte attività che fino a pochi anni fa richiedevano documenti cartacei oggi vengono svolte completamente online.

Pensiamo ad esempio a:

- bonifici bancari;
- acquisti online;
- certificati scolastici;
- cartelle cliniche;
- prenotazioni sanitarie;
- firme digitali;
- identità digitale;
- dichiarazioni fiscali.

Ogni informazione viene salvata all'interno di enormi database.

Ma dove si trovano questi dati?

Chi li controlla?

Chi decide chi può modificarli?

Queste domande sono il punto di partenza per comprendere la Blockchain.

---

## Osserviamo la realtà

Completa la seguente tabella.

| Servizio | Dove vengono salvati i dati? |
|----------|------------------------------|
| Instagram | |
| WhatsApp | |
| Google Drive | |
| Registro elettronico | |
| Amazon | |
| Netflix | |

Noterai che esiste sempre un'azienda che possiede i server e controlla il servizio.

---

### Rifletti

Se domani un'azienda decidesse di chiudere i propri server, cosa accadrebbe ai dati degli utenti?

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione2"></a>

# 🤝 Lezione 2 — La fiducia nell'era di Internet

Ogni volta che utilizziamo un servizio online stiamo compiendo un atto di fiducia.

Quando invii una fotografia su Instagram, dai per scontato che venga salvata correttamente.

Quando utilizzi il cloud, credi che nessuno modifichi i tuoi documenti.

Quando effettui un pagamento elettronico, sei convinto che il denaro arrivi al destinatario.

Nella maggior parte dei casi tutto funziona perfettamente.

Ma questo avviene perché esiste qualcuno che controlla l'intero sistema.

In informatica questo soggetto prende il nome di **Trusted Third Party**, cioè una **terza parte fidata**.

Può essere:

- una banca;
- un'azienda;
- un ente pubblico;
- una scuola;
- un'organizzazione.

Il suo compito consiste nel garantire il corretto funzionamento del servizio.

Noi utenti non possiamo verificare ogni singola operazione.

Dobbiamo fidarci.

La Blockchain nasce proprio con l'obiettivo di ridurre questa dipendenza dalla fiducia.

---

### Esempio

Quando invii un bonifico:

1. la banca verifica la tua identità;
2. controlla il saldo;
3. autorizza il pagamento;
4. aggiorna i conti;
5. registra la transazione.

Senza banca, il sistema tradizionale non potrebbe funzionare.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione3"></a>

# 🏢 Lezione 3 — I sistemi centralizzati

Un sistema è definito **centralizzato** quando tutte le informazioni vengono gestite da un unico soggetto.

Immagina una biblioteca.

Tutti i libri sono custoditi nello stesso edificio.

Esiste un unico archivio.

Un unico responsabile.

Un unico regolamento.

La maggior parte dei servizi digitali funziona nello stesso modo.

```text
Utente A
          \
Utente B ---> SERVER CENTRALE ---> Database
          /
Utente C
```

Il server rappresenta il cuore del sistema.

Ogni richiesta passa da lui.

Ogni modifica passa da lui.

Ogni controllo passa da lui.

Questo modello ha enormi vantaggi.

Ad esempio:

- semplicità di gestione;
- aggiornamenti rapidi;
- maggiore controllo;
- manutenzione più semplice.

Ma possiede anche alcuni punti deboli.

Ed è proprio qui che entra in gioco la Blockchain.

---

[🔙 Torna all'indice del modulo](#indice-modulo)

---

<a id="lezione4"></a>

# ⚠️ Lezione 4 — I limiti dei sistemi tradizionali

Vediamo i principali problemi dei sistemi centralizzati.

## 1. Punto di guasto unico

Se il server principale smette di funzionare, tutto il servizio diventa inutilizzabile.

---

## 2. Bersaglio ideale per gli hacker

Con tutti i dati concentrati nello stesso punto, un attacco informatico può avere conseguenze molto gravi.

---

## 3. Necessità di fidarsi

Gli utenti non possono controllare direttamente ciò che accade.

Devono confidare nella correttezza del gestore.

---

## 4. Possibilità di censura

Chi controlla il sistema può:

- eliminare dati;
- bloccare utenti;
- modificare informazioni;
- impedire alcune operazioni.

---

## 5. Costi elevati

Mantenere grandi infrastrutture centralizzate richiede investimenti significativi.

---

## Una domanda rivoluzionaria

Alla fine degli anni '90 molti ricercatori iniziarono a chiedersi:

> È possibile costruire un sistema sicuro anche senza un'autorità centrale?

Per molti anni la risposta sembrò essere negativa.

Poi arrivò una soluzione completamente nuova.

La Blockchain.

---

<a id="riepilogo1"></a>

# 📌 Riepilogo della Parte 1

In questa prima parte hai scoperto che:

- viviamo in una società completamente digitale;
- quasi tutti i servizi online sono centralizzati;
- ogni sistema richiede un soggetto di cui fidarsi;
- i sistemi centralizzati presentano vantaggi ma anche importanti limiti;
- la Blockchain nasce proprio per risolvere questi problemi.

Nella prossima parte entreremo nel cuore della questione affrontando il problema del **Double Spending**, la figura di **Satoshi Nakamoto** e la nascita di **Bitcoin**.

---

[🔙 Torna all'indice del modulo](#indice-modulo)
