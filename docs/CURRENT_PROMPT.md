### PROMPT 

CONTESTO :  
1.aggiungiamo nuove features all'app custom gcprof-academy. 
2.ho comprato un dominio su cloudflare gcprof-academy.com già configurato su vercel 
dove ho fatto hosting del progetto gcprof-ai-academy.vercel.app

ULTIMI BUG RISCONTRATI :
1. app stabile

ULTIMI FEATURES INTRODOTTE :
1. feature in fase di sviluppo

OBIETTIVO : 
Aggiungere la funzionalità di correzione automatica tramite API AI free delle domande aperte dei quiz

1. nella sezione QUIZ della admin dashboard bisogna introdurre la possibilità opzionale di 
correggere automaticamente la domanda aperta di un quiz utilizzando un modello AI tramite API free
2. in fase di correzione della domada aperte l'amministratore può selezionale in massa le risposte
alla domanda aperta dei vari utenti che hanno tentato il quiz
3. admin deve poter far scrivere alla AI la risposta master alla domanda aperta partendo dal testo della
domanda con un prompt configurabile da file .env oppure da db ed anche da UI
4. admin deve poter vedere il rislutato della risposta master della AI ed il punteggio assegnato dalla AI
5. admin devo poter continuare a lavorare manualmente assegnando il punteggio alla domanda aperta ma
inoltre deve visualizzare il punteggio e la descrizione della valutazione data dalla AI


VINCOLI: 
1. fai una analisi approfondita di come si potrebbe trattare e risolvere la richiesta.
2. chiedimi sempre quale file attuale visualizzare per sincronizzarti con la situazione attuale a partire dal tree in allegato. 
3. aspetta sempre la mia conferma per scrivere il codice.
4. fai riferimento al tree del filesystem del progetto ed allo schema del DB allegati in questa chat
5. intercetta sempre i punti hardcoded che adrebbero spostati nel file .env come variabili
6. procedi per gradi senza distruggere il codice integrando le modifiche passo passo e testando in modo da non regredire.
7. usa sempre il logger disponibile nel codice che scrivi. 
