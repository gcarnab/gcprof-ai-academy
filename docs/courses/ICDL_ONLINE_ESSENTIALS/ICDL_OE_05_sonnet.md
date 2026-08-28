# 🔴 MODULO 5 — Il Modello Client-Server e i Protocolli di Comunicazione

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### ICDL Online Essentials · Percorso per il primo biennio (indirizzi LSA, RIM) · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [5.1 Il modello client-server](#sez-5-1)
2. [5.2 Il modello Peer-to-Peer (P2P): un confronto](#sez-5-2)
3. [5.3 Che cos'è un protocollo di comunicazione?](#sez-5-3)
4. [5.4 Il modello a livelli: come si organizzano i protocolli](#sez-5-4)
5. [5.5 I protocolli fondamentali di Internet](#sez-5-5)
6. [5.6 Indirizzi IP, porte e DNS](#sez-5-6)
7. [🐍 Laboratorio Python 5.1 — Un piccolo server e client in azione](#lab-5-1)
8. [🐍 Laboratorio Python 5.2 — Come funziona il DNS](#lab-5-2)
9. [5.7 Glossario del modulo](#sez-5-7)
10. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- descrivere il modello client-server e distinguerlo dal modello peer-to-peer;
- definire che cos'è un protocollo di comunicazione e perché è indispensabile;
- comprendere come i protocolli di Internet siano organizzati in livelli, ciascuno con un compito specifico;
- conoscere i protocolli fondamentali di Internet: TCP/IP, HTTP/HTTPS, FTP, SMTP/POP/IMAP;
- comprendere che cosa sono indirizzo IP, porta e DNS e a cosa servono;
- sperimentare in Python una comunicazione client-server e una risoluzione DNS.

---

<a id="sez-5-1"></a>
# 5.1 Il modello client-server

[⬆ Torna all'indice del modulo](#indice-modulo)

> **Definizione**
>
> Il **modello client-server** è un'architettura di rete in cui un dispositivo, il **client**, richiede un servizio o una risorsa, mentre un altro dispositivo, il **server**, fornisce quella risorsa rispondendo alla richiesta.

```text
   CLIENT                          SERVER
 (es. il tuo browser)          (es. i server di un sito web)

     richiesta  ─────────────────────►
                                      elabora
     risposta   ◄─────────────────────
```

Ogni volta che apri una pagina web, il tuo browser agisce da **client**: invia una richiesta a un **server** web, che risponde inviando indietro la pagina richiesta (testo, immagini, video...).

## Caratteristiche del modello client-server

- il server è generalmente **sempre acceso** e in ascolto di richieste;
- un singolo server può rispondere a **moltissimi client** contemporaneamente;
- è il modello alla base della maggior parte dei servizi Internet: siti web, posta elettronica, streaming, giochi online.

> 💡 **Approfondimento**
>
> "Client" e "server" non descrivono un tipo di dispositivo, ma un **ruolo** all'interno di una specifica comunicazione. Lo stesso identico computer può comportarsi da server (ad esempio se ospita un piccolo sito web) e, un istante dopo, da client (quando naviga su un sito diverso). Il nostro laboratorio Python di questo modulo lo dimostrerà proprio così: lo stesso ambiente Colab ospiterà sia il ruolo di client sia quello di server.

---

<a id="sez-5-2"></a>
# 5.2 Il modello Peer-to-Peer (P2P): un confronto

[⬆ Torna all'indice del modulo](#indice-modulo)

In alternativa al modello client-server esiste il modello **Peer-to-Peer (P2P)**, in cui **ogni dispositivo (peer)** ha lo stesso ruolo: può funzionare sia da client che da server, condividendo direttamente risorse con gli altri peer, senza un server centrale.

```text
   Client-Server                    Peer-to-Peer

  Client 1 ──┐                    Peer 1 ── Peer 2
             ▼                       │  ╲   ╱  │
  Client 2 ─ SERVER ─ Client 3       │   ╲ ╱   │
             ▲                       │   ╱ ╲   │
  Client 4 ──┘                    Peer 4 ── Peer 3
```

| Caratteristica | Client-Server | Peer-to-Peer |
|------------------|----------------|----------------|
| Ruolo dei dispositivi | Distinto (client / server) | Paritario (ogni nodo è client e server) |
| Punto singolo di guasto | Sì, il server | No, la rete è distribuita |
| Esempio | Un sito web, la posta elettronica | Condivisione file diretta tra dispositivi |

---

<a id="sez-5-3"></a>
# 5.3 Che cos'è un protocollo di comunicazione?

[⬆ Torna all'indice del modulo](#indice-modulo)

> **Definizione**
>
> Un **protocollo di comunicazione** è un insieme di **regole condivise** che permettono a due o più dispositivi di scambiarsi correttamente informazioni, indipendentemente dal produttore, dal sistema operativo o dal linguaggio usato.

Un protocollo definisce, ad esempio:

- come deve essere formattato un messaggio;
- come i dispositivi si "presentano" tra loro all'inizio della comunicazione;
- come si gestiscono errori o dati mancanti;
- quando la comunicazione può considerarsi conclusa.

> 💡 **Approfondimento**
>
> Pensa a un protocollo come alle regole di un gioco da tavolo: se due persone giocano seguendo regole diverse, il gioco non funziona, anche se entrambe conoscono perfettamente le "loro" regole. Allo stesso modo, due computer devono seguire lo **stesso protocollo** per potersi capire.

---

<a id="sez-5-4"></a>
# 5.4 Il modello a livelli: come si organizzano i protocolli

[⬆ Torna all'indice del modulo](#indice-modulo)

Su Internet non esiste **un solo** protocollo che fa tutto: esistono molti protocolli diversi, ciascuno specializzato in un compito preciso, organizzati in **livelli (layer)** che collaborano tra loro. È un po' come una catena di montaggio, dove ogni "reparto" si occupa di un aspetto specifico del prodotto finale.

Una versione semplificata, comunemente usata per descrivere Internet, prevede **quattro livelli**:

```text
┌─────────────────────────────────────────────┐
│ 4. LIVELLO APPLICAZIONE                       │  HTTP, HTTPS, FTP, SMTP...
│    (i programmi che usiamo: browser, e-mail)  │  → "che cosa" vogliamo scambiarci
├─────────────────────────────────────────────┤
│ 3. LIVELLO TRASPORTO                          │  TCP, UDP
│    (garantisce la consegna dei dati)          │  → "come" i dati arrivano integri
├─────────────────────────────────────────────┤
│ 2. LIVELLO RETE (Internet)                    │  IP
│    (instrada i dati verso il destinatario)    │  → "dove" i dati devono arrivare
├─────────────────────────────────────────────┤
│ 1. LIVELLO ACCESSO ALLA RETE                  │  Ethernet, Wi-Fi...
│    (trasmissione fisica del segnale)          │  → "su cosa" viaggiano i dati
└─────────────────────────────────────────────┘
```

Quando invii un messaggio, i dati "scendono" attraverso questi livelli sul tuo dispositivo (dall'applicazione fino al cavo o all'antenna), viaggiano fisicamente fino al destinatario, e lì "risalgono" gli stessi livelli in ordine inverso, fino ad arrivare all'applicazione corretta.

> ⚠️ **Attenzione**
>
> Non è necessario memorizzare a memoria questo schema per superare un esame ICDL, ma è molto utile per **capire** perché, ad esempio, il protocollo HTTP (livello Applicazione) si appoggia sempre al protocollo TCP (livello Trasporto), che a sua volta si appoggia al protocollo IP (livello Rete): ogni livello risolve un problema diverso, e nessuno potrebbe funzionare da solo.

---

<a id="sez-5-5"></a>
# 5.5 I protocolli fondamentali di Internet

[⬆ Torna all'indice del modulo](#indice-modulo)

## TCP/IP: la base di tutto

**TCP/IP** è in realtà una **famiglia di protocolli** organizzata a livelli (come abbiamo appena visto):

- **IP (Internet Protocol)**: si occupa di indirizzare e instradare i dati verso il destinatario corretto, suddividendo le informazioni in piccoli "pacchetti" (livello Rete);
- **TCP (Transmission Control Protocol)**: garantisce che i pacchetti arrivino **tutti**, **nell'ordine corretto** e **senza errori**, richiedendo il reinvio di eventuali pacchetti persi (livello Trasporto).

```text
Dati originali
      │
      ▼
 suddivisione in pacchetti (IP)
      │
      ▼
 invio in rete, controllo e riordino (TCP)
      │
      ▼
 ricostruzione del messaggio originale
```

## TCP contro UDP: affidabilità contro velocità

Accanto al TCP esiste un altro protocollo di trasporto, l'**UDP** (User Datagram Protocol), che fa una scelta opposta: **non** garantisce che tutti i pacchetti arrivino o che arrivino nell'ordine giusto, ma in cambio è molto più **veloce**, perché non deve gestire conferme e reinvii.

| Caratteristica | TCP | UDP |
|------------------|-----|-----|
| Affidabilità | Alta (verifica e reinvia i pacchetti persi) | Bassa (nessuna verifica) |
| Velocità | Più lento | Più veloce |
| Utilizzo tipico | Pagine web, e-mail, trasferimento file | Videochiamate, streaming live, videogiochi online |

> 💡 **Approfondimento**
>
> Per una videochiamata, perdere per un istante un singolo pacchetto (magari un millisecondo di audio) è un fastidio minore rispetto al ritardo che si accumulerebbe se il sistema dovesse fermarsi ogni volta a richiedere il reinvio dei dati persi: ecco perché tanti servizi di streaming e videochiamata preferiscono l'UDP, sacrificando un po' di affidabilità in cambio di fluidità.

## I protocolli applicativi più importanti

| Protocollo | Nome esteso | A cosa serve |
|------------|-------------|----------------|
| **HTTP** | HyperText Transfer Protocol | Trasferire pagine web tra server e browser |
| **HTTPS** | HTTP Secure | Come HTTP, ma con dati **criptati** per maggiore sicurezza |
| **FTP** | File Transfer Protocol | Trasferire file tra computer in rete |
| **SMTP** | Simple Mail Transfer Protocol | Inviare e-mail |
| **POP3 / IMAP** | Post Office Protocol / Internet Message Access Protocol | Ricevere e organizzare e-mail |

> ⚠️ **Attenzione**
>
> Verifica sempre che i siti su cui inserisci dati personali o di pagamento utilizzino **HTTPS** (riconoscibile dal lucchetto nella barra degli indirizzi del browser): significa che i dati scambiati sono **criptati** e molto più difficili da intercettare.

---

<a id="sez-5-6"></a>
# 5.6 Indirizzi IP, porte e DNS

[⬆ Torna all'indice del modulo](#indice-modulo)

## L'indirizzo IP

> **Definizione**
>
> Un **indirizzo IP** è un codice numerico univoco che identifica un dispositivo all'interno di una rete, in modo analogo a come un indirizzo postale identifica una casa.

Un indirizzo IPv4 è composto da quattro numeri (da 0 a 255) separati da punti, ad esempio `192.168.1.10`.

## Le porte: non basta l'indirizzo, serve anche "l'appartamento"

Un singolo dispositivo esegue quasi sempre **più servizi contemporaneamente**: magari sta ospitando un piccolo sito web e, allo stesso tempo, gestendo la posta elettronica. Come fa a distinguere a quale servizio è destinato ciascun dato in arrivo? Attraverso le **porte**.

> **Definizione**
>
> Una **porta** è un numero (da 0 a 65.535) che, insieme all'indirizzo IP, identifica **uno specifico servizio o applicazione** in esecuzione su un dispositivo.

Se l'indirizzo IP è come l'indirizzo di un condominio, la porta è come il numero dell'appartamento al suo interno.

| Protocollo | Porta standard |
|------------|------------------|
| HTTP | 80 |
| HTTPS | 443 |
| FTP | 21 |
| SMTP | 25 |

```text
192.168.1.10 : 443
└────┬──────┘  └┬─┘
  indirizzo IP  porta   →  identifica il servizio HTTPS su quel preciso dispositivo
```

## Il DNS: la "rubrica" di Internet

Ricordare l'indirizzo IP di ogni sito web sarebbe scomodissimo: per questo esiste il **DNS (Domain Name System)**, un sistema che funziona come un'enorme rubrica, traducendo i nomi "leggibili" dei siti (es. `www.icdl.it`) nei corrispondenti indirizzi IP numerici.

```text
Tu scrivi:        www.icdl.it
                       │
                       ▼
                  Server DNS
                       │
                       ▼
Il browser usa:   93.xxx.xxx.xxx   (indirizzo IP reale del server)
```

---

<a id="lab-5-1"></a>
# 🐍 Laboratorio Python 5.1 — Un piccolo server e client in azione

[⬆ Torna all'indice del modulo](#indice-modulo)

Sperimentiamo dal vivo il modello client-server, creando un semplicissimo server che risponde ai messaggi di un client, entrambi sulla stessa macchina virtuale di Google Colab.

```python
# ============================================================
# ESERCIZIO 5.1 - Simulazione di un modello client-server
# Obiettivo: creare un piccolissimo server "echo" (che restituisce
#            il messaggio ricevuto) e un client che gli invia una
#            richiesta, usando il modulo socket della libreria
#            standard di Python.
# ============================================================

import socket    # modulo della libreria standard per la comunicazione di rete
import threading # per eseguire il server "in background" mentre il client lo contatta
import time

def avvia_server(host="127.0.0.1", porta=65432):
    """
    Avvia un semplice server 'echo': riceve un messaggio dal client
    e lo rimanda indietro preceduto da un prefisso.
    """
    # Creiamo un socket TCP (SOCK_STREAM) su indirizzo IPv4 (AF_INET).
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, porta))   # associamo il socket a un indirizzo e una porta
    server_socket.listen(1)             # mettiamo il server in ascolto di 1 connessione

    connessione, indirizzo_client = server_socket.accept()  # attendiamo un client
    with connessione:
        dati_ricevuti = connessione.recv(1024).decode()  # riceviamo il messaggio (max 1024 byte)
        print(f"[SERVER] Ricevuto dal client: '{dati_ricevuti}'")

        risposta = f"Messaggio ricevuto correttamente: '{dati_ricevuti}'"
        connessione.sendall(risposta.encode())  # inviamo la risposta al client

    server_socket.close()

def avvia_client(messaggio, host="127.0.0.1", porta=65432):
    """Si connette al server e invia un messaggio, stampando la risposta ricevuta."""
    time.sleep(0.5)  # piccola pausa per essere sicuri che il server sia già in ascolto

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((host, porta))       # il client si connette al server (richiesta)
    client_socket.sendall(messaggio.encode())  # invia il messaggio

    risposta = client_socket.recv(1024).decode()  # attende ed elabora la risposta (comunicazione)
    print(f"[CLIENT] Risposta dal server: '{risposta}'")

    client_socket.close()

# Avviamo il server in un "thread" separato, così può restare in ascolto
# mentre nel programma principale eseguiamo il client, proprio come
# accadrebbe con due dispositivi reali distinti in una rete.
thread_server = threading.Thread(target=avvia_server)
thread_server.start()

# Il client invia una richiesta al server, simulando ad esempio
# un browser che contatta un sito web.
avvia_client("Ciao server, sono il client!")

thread_server.join()  # attendiamo che il server abbia finito il suo lavoro
```

> 💡 **Approfondimento**
>
> Questo esempio usa `127.0.0.1` (detto anche **localhost**), un indirizzo IP speciale che indica sempre "il computer stesso su cui sto eseguendo il codice", e la porta `65432`, scelta arbitrariamente tra quelle libere. Insieme, indirizzo IP e porta identificano in modo univoco il nostro piccolo server "echo", esattamente come spiegato nel paragrafo 5.6.

---

<a id="lab-5-2"></a>
# 🐍 Laboratorio Python 5.2 — Come funziona il DNS

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 5.2 - Risoluzione DNS
# Obiettivo: usare Python per chiedere a un server DNS di
#            "tradurre" un nome di dominio nel corrispondente
#            indirizzo IP, proprio come fa un browser.
# ============================================================

import socket

# Lista di alcuni nomi di dominio che vogliamo "tradurre" in indirizzo IP.
domini_da_risolvere = ["www.icdl.it", "www.google.com", "www.wikipedia.org"]

print("Risoluzione DNS: da nome di dominio a indirizzo IP\n")

for dominio in domini_da_risolvere:
    try:
        # socket.gethostbyname() interroga il sistema DNS configurato
        # sul dispositivo (esattamente ciò che fa un browser prima di
        # contattare un sito web).
        indirizzo_ip = socket.gethostbyname(dominio)
        print(f"  {dominio:<22} -> {indirizzo_ip}")
    except socket.gaierror:
        # Gestiamo eventuali errori di rete o di dominio non trovato,
        # per evitare che il programma si interrompa bruscamente.
        print(f"  {dominio:<22} -> Impossibile risolvere il dominio (verifica la connessione)")
```

**Prova tu!** Aggiungi alla lista `domini_da_risolvere` il sito della tua scuola o di un servizio che usi spesso, ed esegui di nuovo il codice per scoprire il suo indirizzo IP reale.

---

<a id="sez-5-7"></a>
# 5.7 Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|----------|-------------|
| **Client** | Dispositivo o software che richiede un servizio |
| **Server** | Dispositivo o software che fornisce un servizio |
| **Peer-to-Peer (P2P)** | Modello di rete paritario, senza server centrale |
| **Protocollo** | Insieme di regole condivise per la comunicazione tra dispositivi |
| **Modello a livelli** | Organizzazione dei protocolli in strati, ciascuno con un compito specifico |
| **TCP/IP** | Famiglia di protocolli alla base del funzionamento di Internet |
| **UDP** | Protocollo di trasporto veloce ma non affidabile, usato per streaming e videochiamate |
| **HTTP / HTTPS** | Protocolli per il trasferimento di pagine web (HTTPS = versione sicura) |
| **Indirizzo IP** | Codice numerico che identifica univocamente un dispositivo in rete |
| **Porta** | Numero che identifica uno specifico servizio su un dispositivo |
| **DNS** | Sistema che traduce i nomi di dominio in indirizzi IP |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo hai imparato:

- come funziona il modello client-server e in cosa si differenzia dal modello peer-to-peer;
- che cos'è un protocollo di comunicazione e perché è indispensabile per far "dialogare" dispositivi diversi;
- come i protocolli di Internet siano organizzati in un modello a livelli, ciascuno con un compito preciso;
- i protocolli fondamentali di Internet: TCP/IP (e la differenza tra TCP e UDP), HTTP/HTTPS, FTP, SMTP/POP/IMAP;
- il ruolo dell'indirizzo IP, delle porte e del DNS nel far funzionare la navigazione su Internet;
- come creare in Python una piccola comunicazione client-server e come effettuare una risoluzione DNS.

Nell'ultimo modulo di questa guida metteremo insieme tutti i concetti visti finora per scoprire **il World Wide Web** e le caratteristiche del programma che usi ogni giorno per navigare: il **browser**. Ti aspettiamo nel **Modulo 6 — Il World Wide Web e le Caratteristiche di un Browser**.

[⬆ Torna all'indice del modulo](#indice-modulo)