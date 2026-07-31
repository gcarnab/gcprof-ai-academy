### PROMPT 

CONTESTO :  
1.aggiungiamo nuove features all'app custom gcprof-ai-academy. 
2.ho comprato un dominio su cloudflare gcprof-academy.com già configurato su vercel 
dove ho fatto hosting del progetto gcprof-ai-academy.vercel.app

OBIETTIVO : 
aggiungiamo la possibilità di inserire un banner in home page per comunicazioni varie.
la configurazione del contenuto e degli altri parametri utili come la durata dovrà essere contenuta 
nella tabella system_settings. verifica se tra i file forniti nel tree esiste qualcosa di già implementato

SITUAZIONE ATTUALE :
0. feature in fase di svilippo (app stabile) 

VINCOLI: 
1. chiedimi sempre quale file attuale visualizzare per sincronizzarti con la situazione attuale e ti mando il codice. 
2. ricorda di aspettare sempre la mia conferma per scrivere il codice
3. fai riferimento al tree del filesystem del progetto ed allo schema del DB allegati in questa chat
4. intercetta sempre i punti hardcoded che adrebbero spostati nel file .env come variabili
5. procediamo per gradi senza distruggere il codice integrando le modifiche passo passo e testando che non stiamo regredendo
6. ricorda di predisporre i nomi delle classi per la feature già abilitata theme light/dark
7. usa sempre il logger disponibile nel codice che scrivi 
8. fare il refactoring essenziale e puntare a risolvere il problema mantenendo quanto più possibile la logica attuale senza regredire
9. se non puoi riscriverli per intero adotta sempre il metodo di spezzare i file (part1, part2...) quando sono troppo grandi scegliendo tu la grandezza e il numero delle parti
