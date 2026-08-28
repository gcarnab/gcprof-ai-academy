# 🟠 MODULO 6 — Il World Wide Web e le Caratteristiche di un Browser

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### ICDL Online Essentials · Percorso per il primo biennio (indirizzi LSA, RIM) · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [6.1 Internet e World Wide Web: non sono la stessa cosa!](#sez-6-1)
2. [6.2 L'URL: l'indirizzo di ogni pagina web](#sez-6-2)
3. [6.3 Ipertesti e cenni sull'HTML](#sez-6-3)
4. [6.4 Che cos'è un browser?](#sez-6-4)
5. [6.5 Le caratteristiche principali di un browser moderno](#sez-6-5)
6. [6.6 I principali browser a confronto](#sez-6-6)
7. [6.7 Motore di ricerca e browser: due cose diverse](#sez-6-7)
8. [6.8 Navigazione sicura: HTTPS, cookie e privacy](#sez-6-8)
9. [🐍 Laboratorio Python 6.1 — Analizziamo un URL](#lab-6-1)
10. [🐍 Laboratorio Python 6.2 — Ispezioniamo una vera richiesta HTTP](#lab-6-2)
11. [🐍 Laboratorio Python 6.3 — Un piccolo controllo di sicurezza HTTPS](#lab-6-3)
12. [6.9 Glossario del modulo](#sez-6-9)
13. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- distinguere con precisione Internet dal World Wide Web;
- comprendere che cos'è un URL e come è strutturato;
- spiegare il concetto di ipertesto e il ruolo dell'HTML;
- descrivere che cos'è un browser e quali sono le sue caratteristiche principali;
- confrontare i browser più diffusi;
- distinguere un browser da un motore di ricerca;
- riconoscere le buone pratiche di navigazione sicura;
- utilizzare Python per analizzare un URL, ispezionare una richiesta HTTP reale e verificare la sicurezza di più siti web.

---

<a id="sez-6-1"></a>
# 6.1 Internet e World Wide Web: non sono la stessa cosa!

[⬆ Torna all'indice del modulo](#indice-modulo)

Iniziamo questo ultimo modulo chiarendo con precisione che cos'è il **World Wide Web**, distinguendolo da Internet.

> **Definizione**
>
> Il **World Wide Web (WWW)**, comunemente chiamato "il Web", è un **servizio** che funziona sopra Internet: è un sistema di documenti (le pagine web) collegati tra loro tramite **collegamenti ipertestuali** (link), accessibili tramite un browser.

```text
INTERNET
  (l'infrastruttura: cavi, protocolli, dispositivi collegati)
        │
        ├── World Wide Web  (pagine web, siti)
        ├── Posta elettronica (e-mail)
        ├── Messaggistica istantanea
        ├── Streaming audio/video
        └── ... e molti altri servizi
```

> ⚠️ **Attenzione**
>
> È un errore molto comune (anche tra adulti!) dire "Internet non funziona" quando in realtà non si riesce a caricare un sito web: potrebbe essere un problema del **Web** o di un singolo servizio, mentre Internet — l'infrastruttura sottostante — potrebbe funzionare perfettamente. Il Web è **uno dei tanti servizi** che viaggiano su Internet, proprio come la posta elettronica o lo streaming.

Il World Wide Web nasce nel **1989** grazie a **Tim Berners-Lee**, ricercatore al CERN di Ginevra, che ideò tre elementi fondamentali ancora oggi alla base del Web:

- **HTML** (HyperText Markup Language): il linguaggio per creare pagine web;
- **HTTP** (HyperText Transfer Protocol): il protocollo per trasferire le pagine (visto nel Modulo 5);
- **URL** (Uniform Resource Locator): l'indirizzo univoco di ogni risorsa sul Web.

---

<a id="sez-6-2"></a>
# 6.2 L'URL: l'indirizzo di ogni pagina web

[⬆ Torna all'indice del modulo](#indice-modulo)

Ogni risorsa sul Web (pagina, immagine, video, file) è identificata da un **URL** univoco. Analizziamo la struttura di un URL tipico:

```text
https://www.icdl.it/moduli-e-certificazioni/online-essentials?lingua=it#dettagli
└─┬──┘   └─────┬────┘└───────────────┬─────────────────────┘└────┬────┘└──┬───┘
protocollo    dominio                percorso                  query   frammento
```

| Componente | Esempio | Descrizione |
|------------|---------|-------------|
| **Protocollo** | `https://` | Il protocollo usato per accedere alla risorsa (Modulo 5) |
| **Dominio (host)** | `www.icdl.it` | Il nome del server che ospita la risorsa |
| **Percorso (path)** | `/moduli-e-certificazioni/...` | La posizione specifica della risorsa sul server |
| **Query string** | `?lingua=it` | Parametri aggiuntivi passati alla pagina |
| **Frammento** | `#dettagli` | Punto specifico all'interno della pagina |

> 💡 **Approfondimento**
>
> Il "dominio" di un URL, a sua volta, ha una struttura gerarchica: in `www.icdl.it`, `.it` è il **dominio di primo livello** (Top-Level Domain, TLD, quello che nel Modulo 1 abbiamo visto essere gestito in Italia dal Registro.it), `icdl` è il **dominio di secondo livello** (registrato dall'organizzazione ICDL), e `www` è un **sottodominio**, tradizionalmente usato per indicare la sezione "World Wide Web" di un sito, anche se oggi molti siti funzionano perfettamente anche senza scriverlo.

---

<a id="sez-6-3"></a>
# 6.3 Ipertesti e cenni sull'HTML

[⬆ Torna all'indice del modulo](#indice-modulo)

> **Definizione**
>
> Un **ipertesto** è un testo che contiene **collegamenti (link)** verso altri documenti o altre parti dello stesso documento, permettendo una lettura non lineare, "a salti", da un contenuto all'altro.

Le pagine web sono scritte in **HTML (HyperText Markup Language)**, un linguaggio a **marcatori (tag)** che descrive la struttura di un documento (titoli, paragrafi, immagini, collegamenti...), lasciando poi ad altri linguaggi come **CSS** (lo stile grafico) e **JavaScript** (l'interattività) il compito di renderlo bello e funzionante.

```html
<!-- Esempio semplicissimo di documento HTML -->
<html>
  <body>
    <h1>Benvenuti nel Web!</h1>
    <p>Questo è un ipertesto: <a href="https://www.icdl.it">clicca qui</a> per un link.</p>
  </body>
</html>
```

| Linguaggio | Ruolo |
|------------|-------|
| **HTML** | Definisce la **struttura** e i contenuti della pagina (titoli, testi, link, immagini) |
| **CSS** | Definisce **l'aspetto grafico** della pagina (colori, font, layout) |
| **JavaScript** | Aggiunge **interattività e comportamenti dinamici** alla pagina |

---

<a id="sez-6-4"></a>
# 6.4 Che cos'è un browser?

[⬆ Torna all'indice del modulo](#indice-modulo)

> **Definizione**
>
> Un **browser** (o navigatore web) è un software che permette di **richiedere, ricevere e visualizzare** pagine web, interpretando il codice HTML, CSS e JavaScript ricevuto dal server.

Quando digiti un indirizzo nel browser, avviene esattamente lo schema che abbiamo studiato nel Modulo 5:

```text
1. Digiti www.icdl.it nel browser
2. Il browser interroga il DNS per ottenere l'indirizzo IP del server
3. Il browser (client) invia una richiesta HTTP/HTTPS al server
4. Il server risponde inviando il codice HTML/CSS/JS della pagina
5. Il browser interpreta ("renderizza") il codice e mostra la pagina
```

---

<a id="sez-6-5"></a>
# 6.5 Le caratteristiche principali di un browser moderno

[⬆ Torna all'indice del modulo](#indice-modulo)

Un browser moderno offre molte funzionalità oltre alla semplice visualizzazione delle pagine:

- **Schede (tab)**: permettono di aprire più pagine web contemporaneamente in un'unica finestra;
- **Cronologia (history)**: tiene traccia dei siti visitati;
- **Preferiti / Segnalibri (bookmark)**: permettono di salvare rapidamente gli indirizzi dei siti preferiti;
- **Gestione delle estensioni/plugin**: piccoli programmi aggiuntivi che estendono le funzionalità del browser;
- **Modalità di navigazione in incognito/privata**: non salva cronologia, cookie e dati di navigazione al termine della sessione;
- **Motore di rendering**: il "motore" interno che interpreta HTML/CSS/JS e disegna la pagina (es. Blink, Gecko, WebKit);
- **Sincronizzazione tra dispositivi**: molti browser permettono di sincronizzare preferiti, password e schede aperte tra computer e smartphone;
- **Gestione della sicurezza e della privacy**: blocco popup, avvisi su siti pericolosi, gestione dei permessi (fotocamera, posizione...).

---

<a id="sez-6-6"></a>
# 6.6 I principali browser a confronto

[⬆ Torna all'indice del modulo](#indice-modulo)

| Browser | Produttore | Motore di rendering |
|---------|-----------|-----------------------|
| **Google Chrome** | Google | Blink |
| **Mozilla Firefox** | Mozilla Foundation | Gecko |
| **Microsoft Edge** | Microsoft | Blink |
| **Safari** | Apple | WebKit |
| **Opera** | Opera Software | Blink |

> 💡 **Approfondimento**
>
> Molti browser oggi condividono lo stesso "motore" interno (Blink), pur avendo un'interfaccia e funzionalità diverse, un po' come diverse automobili che possono montare lo stesso motore ma avere carrozzeria e optional differenti.

---

<a id="sez-6-7"></a>
# 6.7 Motore di ricerca e browser: due cose diverse

[⬆ Torna all'indice del modulo](#indice-modulo)

Un altro equivoco molto comune, specialmente tra i neofiti, è confondere il **browser** con il **motore di ricerca**.

> **Definizione**
>
> Un **motore di ricerca** (come Google, Bing o DuckDuckGo) è un **sito web** che permette di trovare altre pagine web a partire da parole chiave, esplorando e indicizzando continuamente milioni di siti. Il **browser**, invece, è il software che utilizzi per visualizzare quel sito web (e qualsiasi altro sito).

```text
   BROWSER                        MOTORE DI RICERCA
 (il programma che usi        (uno dei tanti siti web che
  per navigare: Chrome,        puoi visitare con il browser,
  Firefox, Edge...)            es. Google, Bing...)
```

| Caratteristica | Browser | Motore di ricerca |
|------------------|---------|----------------------|
| Che cos'è | Un software installato sul dispositivo | Un sito web (un servizio) |
| A cosa serve | Visualizzare qualsiasi pagina web | Trovare pagine web a partire da parole chiave |
| Esempi | Chrome, Firefox, Edge, Safari | Google, Bing, DuckDuckGo |

> ⚠️ **Attenzione**
>
> La "pagina iniziale" del tuo browser (quella che si apre quando lo avvii) spesso mostra proprio un motore di ricerca: questo alimenta la confusione tra i due concetti, ma non sono affatto la stessa cosa. Potresti benissimo usare il browser Chrome per navigare direttamente su siti che non richiedono alcun motore di ricerca, come `www.icdl.it` digitato direttamente nella barra degli indirizzi.

---

<a id="sez-6-8"></a>
# 6.8 Navigazione sicura: HTTPS, cookie e privacy

[⬆ Torna all'indice del modulo](#indice-modulo)

- **HTTPS**: come già visto nel Modulo 5, garantisce che i dati scambiati con il sito siano criptati;
- **Cookie**: piccoli file che i siti web salvano sul nostro dispositivo per "ricordare" informazioni (es. il carrello di un e-commerce, le preferenze di lingua, o dati usati per la pubblicità mirata);
- **Cronologia e cache**: il browser conserva traccia dei siti visitati e salva localmente parte dei loro contenuti per velocizzare le visite successive;
- **Password manager integrato**: molti browser offrono un gestore di password per salvare le credenziali in modo (relativamente) sicuro.

> ⚠️ **Attenzione**
>
> I cookie non sono di per sé "pericolosi", ma è buona pratica **eliminarli periodicamente** e prestare attenzione ai permessi che concediamo ai siti web (fotocamera, microfono, posizione), accettandoli solo quando realmente necessario e da siti di cui ci fidiamo.

---

<a id="lab-6-1"></a>
# 🐍 Laboratorio Python 6.1 — Analizziamo un URL

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 6.1 - Analisi della struttura di un URL
# Obiettivo: scomporre un indirizzo web nei suoi componenti
#            fondamentali (protocollo, dominio, percorso...)
#            usando il modulo urllib della libreria standard.
# ============================================================

from urllib.parse import urlparse

# urlparse() analizza una stringa URL e ne restituisce i componenti
# come oggetto strutturato, senza bisogno di librerie esterne.
url_da_analizzare = "https://www.icdl.it/moduli-e-certificazioni/online-essentials?lingua=it#dettagli"

componenti = urlparse(url_da_analizzare)

print(f"URL analizzato: {url_da_analizzare}\n")
print(f"  Protocollo (scheme) : {componenti.scheme}")
print(f"  Dominio (netloc)    : {componenti.netloc}")
print(f"  Percorso (path)     : {componenti.path}")
print(f"  Query string        : {componenti.query}")
print(f"  Frammento           : {componenti.fragment}")

# Proviamo ora ad analizzare una piccola lista di URL diversi,
# per vedere come cambia la struttura da sito a sito.
altri_url = [
    "http://esempio-scuola.edu.it",
    "https://www.wikipedia.org/wiki/Internet",
    "https://gcprof-academy.com/corsi?categoria=informatica",
]

print("\nAnalisi di altri URL:\n")
for indirizzo in altri_url:
    parti = urlparse(indirizzo)
    print(f"  {indirizzo}")
    print(f"    -> protocollo: {parti.scheme:<6} dominio: {parti.netloc}")
```

---

<a id="lab-6-2"></a>
# 🐍 Laboratorio Python 6.2 — Ispezioniamo una vera richiesta HTTP

[⬆ Torna all'indice del modulo](#indice-modulo)

Usiamo la libreria `requests` (preinstallata su Google Colab) per effettuare una vera richiesta HTTP, esattamente come farebbe un browser, e osserviamo la risposta del server.

```python
# ============================================================
# ESERCIZIO 6.2 - Il modello client-server in azione sul Web
# Obiettivo: inviare una richiesta HTTP reale a un server web
#            e analizzare la risposta ricevuta (status code,
#            header, tipo di contenuto), collegando così tutti
#            i concetti visti nei moduli precedenti.
# ============================================================

import requests  # libreria molto diffusa per effettuare richieste HTTP in Python

# Il nostro programma Python agisce da CLIENT, proprio come un browser,
# inviando una richiesta HTTP GET al server della pagina indicata.
indirizzo = "https://www.python.org"

risposta = requests.get(indirizzo)

print(f"Richiesta HTTP GET verso: {indirizzo}\n")

# Lo "status code" indica l'esito della richiesta: 200 significa
# "OK, richiesta andata a buon fine".
print(f"Codice di stato HTTP : {risposta.status_code}")

# Il tipo di contenuto (Content-Type) indica il formato della risposta:
# per una pagina web è tipicamente 'text/html'.
print(f"Tipo di contenuto    : {risposta.headers.get('Content-Type')}")

# Il server (nome del web server) è spesso indicato negli header di risposta.
print(f"Server               : {risposta.headers.get('Server', 'non specificato')}")

# Misuriamo anche il tempo di risposta del server, espresso in secondi.
print(f"Tempo di risposta    : {risposta.elapsed.total_seconds():.3f} secondi")

# Stampiamo solo i primi 200 caratteri del corpo della risposta (il codice HTML),
# per non riempire l'output con l'intera pagina.
print(f"\nPrimi 200 caratteri della risposta HTML:\n{risposta.text[:200]}...")

# Alcuni codici di stato HTTP comuni, utili da conoscere:
print("\nAlcuni codici di stato HTTP comuni:")
codici_comuni = {
    200: "OK - richiesta andata a buon fine",
    301: "Moved Permanently - la risorsa è stata spostata",
    403: "Forbidden - accesso negato",
    404: "Not Found - risorsa non trovata",
    500: "Internal Server Error - errore lato server",
}
for codice, descrizione in codici_comuni.items():
    print(f"  {codice} -> {descrizione}")
```

> 💡 **Approfondimento**
>
> Questo esercizio mette in pratica **tutto** ciò che hai imparato in questa guida: il tuo codice Python (client) contatta un server tramite il protocollo HTTPS (Modulo 5), passando attraverso Internet (Modulo 1) grazie alla tua connessione (Modulo 4), e riceve indietro un documento ipertestuale (Modulo 6) formattato in HTML!

---

<a id="lab-6-3"></a>
# 🐍 Laboratorio Python 6.3 — Un piccolo controllo di sicurezza HTTPS

[⬆ Torna all'indice del modulo](#indice-modulo)

Mettiamo in pratica quanto visto nel paragrafo 6.8 sulla navigazione sicura: scriviamo un piccolo "controllore" che verifica, per una lista di siti, se usano HTTPS e se il server segnala esplicitamente di volerlo imporre sempre.

```python
# ============================================================
# ESERCIZIO 6.3 - Controllo di sicurezza HTTPS di più siti
# Obiettivo: verificare, per una lista di siti web, se la
#            connessione avviene tramite HTTPS e se il server
#            dichiara di richiedere sempre connessioni sicure,
#            tramite l'header "Strict-Transport-Security".
# ============================================================

import requests
from urllib.parse import urlparse

siti_da_verificare = [
    "https://www.icdl.it",
    "https://www.python.org",
    "https://www.wikipedia.org",
]

print("Controllo di sicurezza HTTPS dei siti web\n")

for sito in siti_da_verificare:
    try:
        risposta = requests.get(sito, timeout=5)
        protocollo = urlparse(risposta.url).scheme  # protocollo EFFETTIVO dopo eventuali redirect

        # Verifichiamo se il server invia l'header HSTS (Strict-Transport-Security),
        # con cui "impone" ai browser di usare sempre e solo HTTPS con quel sito.
        possiede_hsts = "Strict-Transport-Security" in risposta.headers

        print(f"{sito}")
        print(f"  Protocollo effettivo : {protocollo.upper()}")
        print(f"  Connessione sicura   : {'✅ Sì' if protocollo == 'https' else '❌ No'}")
        print(f"  Impone sempre HTTPS (HSTS) : {'✅ Sì' if possiede_hsts else '— Non dichiarato'}\n")

    except requests.exceptions.RequestException as errore:
        # Gestiamo eventuali problemi di connessione senza interrompere il ciclo.
        print(f"{sito}\n  Impossibile verificare il sito: {errore}\n")
```

> ⚠️ **Attenzione**
>
> Questo semplice controllo automatico è un ottimo esercizio didattico, ma **non sostituisce** un vero controllo di sicurezza professionale: verifica solo la presenza del protocollo HTTPS e di un header specifico, non l'intera configurazione di sicurezza di un sito.

**Prova tu!** Aggiungi alla lista `siti_da_verificare` alcuni siti che usi abitualmente e confronta i risultati.

---

<a id="sez-6-9"></a>
# 6.9 Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|----------|-------------|
| **World Wide Web (WWW)** | Servizio di documenti ipertestuali collegati tra loro, basato su Internet |
| **URL** | Indirizzo univoco di una risorsa sul Web |
| **Dominio (TLD)** | Nome che identifica un sito, organizzato in livelli (es. `.it`, `icdl`, `www`) |
| **Ipertesto** | Testo contenente collegamenti verso altri contenuti |
| **HTML** | Linguaggio a marcatori usato per costruire le pagine web |
| **CSS / JavaScript** | Linguaggi che definiscono, rispettivamente, lo stile grafico e l'interattività di una pagina |
| **Browser** | Software che permette di richiedere e visualizzare pagine web |
| **Motore di ricerca** | Sito web che permette di trovare altre pagine web a partire da parole chiave |
| **Motore di rendering** | Componente del browser che interpreta HTML/CSS/JS e disegna la pagina |
| **Cookie** | Piccolo file salvato dal sito sul dispositivo dell'utente |
| **Status code HTTP** | Codice numerico che indica l'esito di una richiesta HTTP |
| **HSTS** | Header HTTP con cui un server impone sempre connessioni HTTPS |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In quest'ultimo modulo hai imparato:

- la differenza fondamentale tra Internet (l'infrastruttura) e il World Wide Web (uno dei suoi servizi);
- come è strutturato un URL e a cosa serve ciascuna delle sue parti, compresa la gerarchia dei domini;
- i concetti di ipertesto e le basi dei linguaggi HTML, CSS e JavaScript;
- che cos'è un browser e quali sono le sue caratteristiche fondamentali;
- come confrontare i principali browser in uso oggi;
- la differenza tra un browser e un motore di ricerca;
- le buone pratiche per una navigazione sicura (HTTPS, cookie, privacy);
- come analizzare un URL, ispezionare una vera richiesta HTTP e verificare la sicurezza HTTPS di più siti con Python.

---

# 🎓 Complimenti: hai completato il percorso ICDL Online Essentials!

Con questo modulo si conclude il percorso completo di **ICDL Online Essentials** di gcprof-academy.com. Hai costruito, passo dopo passo, una comprensione solida di come funziona davvero la rete che usi ogni giorno:

1. **Storia di Internet** — da dove viene e come si è evoluta;
2. **Canali di Comunicazione e Mezzi Trasmissivi** — come viaggiano fisicamente i dati;
3. **Reti Analogiche e Digitali, Topologie di Rete** — come i dispositivi si organizzano in una rete;
4. **La Connessione a Internet** — come le nostre case si collegano al mondo;
5. **Il Modello Client-Server e i Protocolli** — le "regole" che permettono ai dispositivi di capirsi;
6. **Il World Wide Web e i Browser** — come tutto questo si traduce in una pagina web sul tuo schermo.

Non hai solo imparato delle definizioni: hai **visto in azione** ognuno di questi concetti attraverso laboratori Python reali, eseguibili su Google Colab. Continua a sperimentare, modifica gli esempi di codice, prova nuove idee: è il modo migliore per trasformare queste conoscenze in competenze solide e durature. Buon proseguimento con **gcprof-academy.com**! 🚀

[⬆ Torna all'indice del modulo](#indice-modulo)