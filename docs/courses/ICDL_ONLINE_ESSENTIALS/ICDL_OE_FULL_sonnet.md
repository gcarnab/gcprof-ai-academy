# 🌐 ICDL Online Essentials: Guida Completa alle Basi di Internet e delle Reti

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Percorso per il primo biennio (indirizzi LSA, RIM) · Ottimizzata per Google Colab · Aggiornata ad Agosto 2026

---

## <a id="indice"></a> Indice dei Moduli

1.  [**Modulo 1**: Storia di Internet e la sua Evoluzione](#modulo1)
2.  [**Modulo 2**: Canali di Comunicazione e Mezzi Trasmissivi](#modulo2)
3.  [**Modulo 3**: Reti Analogiche e Digitali, Topologie di Rete](#modulo3)
4.  [**Modulo 4**: La Connessione a Internet: dal Modem all'ADSL e Oltre](#modulo4)
5.  [**Modulo 5**: Il Modello Client-Server e i Protocolli di Comunicazione](#modulo5)
6.  [**Modulo 6**: Il World Wide Web e le Caratteristiche di un Browser](#modulo6)

---

## 👋 Benvenuti, esploratori della Rete!

Ciao! Se stai leggendo questa guida è perché stai per iniziare uno dei viaggi più affascinanti dell'informatica moderna: capire **come funziona davvero Internet**, quella rete invisibile che ogni giorno usiamo per studiare, chattare, guardare video e giocare, ma di cui spesso conosciamo pochissimo il funzionamento interno.

Questa guida segue il programma del modulo **ICDL Online Essentials** ([scheda ufficiale ICDL](https://www.icdl.it/moduli-e-certificazioni/online-essentials)) e ti accompagnerà passo dopo passo, dalla storia di Internet fino ai protocolli che permettono al tuo browser di caricare una pagina web in pochi millisecondi.

**Come è organizzata la guida?**

- Ogni modulo è **indipendente**: puoi affrontarli nell'ordine che preferisci (anche se ti consigliamo l'ordine proposto, perché ogni modulo costruisce sul precedente).
- Ogni modulo contiene **esempi di codice in Python**, pensati per essere eseguiti direttamente su [Google Colab](https://colab.research.google.com/), senza bisogno di installare nulla sul tuo computer.
- Troverai riquadri **💡 Approfondimento** per curiosità ed extra, e riquadri **⚠️ Attenzione** per gli errori più comuni.
- Ogni modulo termina con un **Glossario** e un **Riepilogo** per ripassare i concetti chiave.

Non serve essere già esperti di informatica: basta curiosità e voglia di sperimentare. Pronti? Si parte! 🚀

---

## <a id="modulo1"></a> 🔵 MODULO 1 — Storia di Internet e la sua Evoluzione

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- spiegare che cos'è davvero Internet e perché si chiama "rete di reti";
- conoscere le origini storiche di Internet, nate in piena Guerra Fredda;
- ricostruire le tappe fondamentali dell'evoluzione di Internet fino ad oggi;
- distinguere le fasi Web 1.0, Web 2.0 e Web 3.0;
- collocare la diffusione di Internet in Italia nel contesto storico;
- utilizzare Python per costruire e visualizzare una timeline storica.

---

# 1.1 Che cos'è davvero Internet?

Molte persone usano le parole "Internet" e "Web" come sinonimi, ma in realtà sono due cose diverse (lo vedremo bene nel **Modulo 6**).

> **Definizione**
>
> **Internet** è un'enorme **rete di reti**: milioni di computer, server, smartphone e altri dispositivi sparsi in tutto il mondo, collegati tra loro tramite cavi, fibre ottiche e onde radio, capaci di scambiarsi dati seguendo regole comuni (i **protocolli**, che vedremo nel Modulo 5).

Immagina Internet come un gigantesco sistema stradale mondiale: ogni casa, scuola o ufficio è collegato a una strada locale, che si collega a strade più grandi, che a loro volta si collegano ad autostrade intercontinentali. Nessuno "possiede" tutta la rete: è un sistema **decentralizzato**, ed è proprio questa caratteristica ad averla resa così resistente e capace di crescere fino a diventare quello che conosciamo oggi.

---

# 1.2 Le origini: ARPANET e la Guerra Fredda

La storia di Internet inizia negli **Stati Uniti**, alla fine degli anni '50, in un contesto storico molto particolare: la **Guerra Fredda** tra Stati Uniti e Unione Sovietica.

## Perché nasce Internet?

Nel 1957 l'URSS lancia lo **Sputnik**, il primo satellite artificiale della storia. Gli Stati Uniti, colti di sorpresa, decidono di investire massicciamente nella ricerca tecnologica e militare, fondando nel 1958 l'agenzia **ARPA** (Advanced Research Projects Agency).

> 💡 **Approfondimento**
>
> Uno degli obiettivi (spesso citato, anche se in parte semplificato dalla divulgazione) era progettare una rete di comunicazione **decentralizzata**: se un nodo della rete fosse stato distrutto, le informazioni avrebbero comunque potuto raggiungere destinazione passando per un percorso alternativo. Questa idea di ridondanza è ancora oggi alla base del funzionamento di Internet.

## Nasce ARPANET (1969)

Il **29 ottobre 1969** viene trasmesso il primo messaggio tra due computer collegati in rete: uno all'**Università della California, Los Angeles (UCLA)** e uno allo **Stanford Research Institute**. Nasce **ARPANET**, la rete che possiamo considerare la progenitrice di Internet.

```text
1969 — ARPANET
┌─────────────┐        collegamento        ┌──────────────────┐
│    UCLA     │ ◄─────────────────────────► │  Stanford (SRI)   │
└─────────────┘                             └──────────────────┘
```

---

# 1.3 Le tappe fondamentali dell'evoluzione di Internet

| Anno | Evento |
|------|--------|
| **1969** | Nasce ARPANET, primo collegamento tra due computer |
| **1971** | Ray Tomlinson invia la prima e-mail e introduce il simbolo **@** |
| **1973** | Vengono gettate le basi del protocollo **TCP/IP** |
| **1983** | ARPANET adotta ufficialmente **TCP/IP**: è considerata la nascita di Internet come la intendiamo oggi |
| **1989** | Tim Berners-Lee propone al CERN di Ginevra il **World Wide Web** |
| **1991** | Il World Wide Web diventa pubblico e accessibile a tutti |
| **1993** | Nasce Mosaic, uno dei primi browser grafici di successo |
| **1998** | Nasce Google |
| **2004** | Nascono i grandi social network (Facebook) |
| **2007** | Debutta l'iPhone: inizia l'era della navigazione mobile di massa |
| **2010-2020** | Esplosione dello streaming, del cloud computing e dell'Internet delle Cose (IoT) |
| **2022-2026** | Diffusione dell'AI generativa integrata nei browser e nei motori di ricerca |

> ⚠️ **Attenzione**
>
> Un errore comune è pensare che Internet sia nata "già finita" negli anni '90. In realtà Internet è un sistema **in continua evoluzione**: nuovi protocolli, nuove tecnologie di connessione e nuovi utilizzi vengono introdotti ogni anno.

---

# 1.4 Dal Web statico al Web moderno: Web 1.0, 2.0 e 3.0

L'evoluzione del Web viene spesso descritta in tre grandi fasi.

## Web 1.0 (anni '90 - inizio 2000)

- pagine **statiche**, create da pochi soggetti (aziende, istituzioni);
- gli utenti sono soprattutto **lettori passivi**;
- pochissima interattività.

## Web 2.0 (metà anni 2000 - oggi)

- nasce il Web **collaborativo**: blog, social network, wiki;
- gli utenti diventano anche **creatori di contenuti**;
- piattaforme come YouTube, Wikipedia, Facebook, Instagram.

## Web 3.0 (in evoluzione)

- Web **intelligente e decentralizzato**;
- integrazione con l'**Intelligenza Artificiale**;
- maggiore attenzione a privacy e proprietà dei dati.

```text
Web 1.0                Web 2.0                 Web 3.0
(sola lettura)   →   (lettura e scrittura)  →  (intelligente)
Pagine statiche       Social, blog, wiki        AI, decentralizzazione
```

---

# 1.5 Internet in Italia

- **1986**: primo collegamento italiano a Internet, realizzato dal **CNUCE-CNR di Pisa**;
- **anni '90**: diffusione dei primi provider italiani e delle connessioni via modem;
- **anni 2000**: arrivo dell'**ADSL** nelle case degli italiani (ne parleremo nel Modulo 4);
- **anni 2010-2020**: diffusione della **fibra ottica** e del **4G/5G**.

---

# 🐍 Laboratorio Python — Costruiamo una timeline di Internet

Usiamo Python per rappresentare graficamente le tappe storiche che abbiamo appena studiato. L'esercizio è pensato per essere eseguito su **Google Colab**: basta copiare il codice in una cella e premere Shift+Invio.

```python
# ============================================================
# ESERCIZIO 1.1 - Timeline della storia di Internet
# Obiettivo: rappresentare graficamente le tappe fondamentali
#            della storia di Internet usando la libreria matplotlib
# ============================================================

# matplotlib è la libreria standard di Python per creare grafici;
# è già preinstallata su Google Colab, quindi non serve installarla.
import matplotlib.pyplot as plt

# Creiamo una lista di tuple (anno, evento) con le tappe principali.
# Una tupla è una piccola struttura dati che raggruppa più valori,
# in questo caso un numero (l'anno) e una stringa (la descrizione).
tappe_storiche = [
    (1969, "Nasce ARPANET"),
    (1971, "Prima e-mail (simbolo @)"),
    (1983, "ARPANET adotta TCP/IP"),
    (1989, "Tim Berners-Lee propone il Web"),
    (1991, "Il Web diventa pubblico"),
    (1998, "Nasce Google"),
    (2007, "Debutta l'iPhone"),
    (2026, "AI integrata nel Web"),
]

# Separiamo la lista di tuple in due liste distinte: anni ed eventi.
# La funzione zip(*lista) "spacchetta" le tuple in colonne separate.
anni, eventi = zip(*tappe_storiche)

# Creiamo la figura e gli assi su cui disegnare il grafico.
# figsize=(12, 5) imposta la larghezza e l'altezza in pollici.
fig, ax = plt.subplots(figsize=(12, 5))

# Disegniamo una linea orizzontale (la "linea del tempo") e un
# pallino per ogni evento, usando gli anni come coordinata X
# e un valore costante (0) come coordinata Y.
ax.plot(anni, [0] * len(anni), "o-", color="steelblue", markersize=10)

# Aggiungiamo il testo di ogni evento sopra o sotto il pallino,
# alternando la posizione per evitare che le etichette si sovrappongano.
for indice, (anno, evento) in enumerate(tappe_storiche):
    # Se l'indice è pari, scriviamo il testo sopra la linea; altrimenti sotto.
    posizione_verticale = 0.15 if indice % 2 == 0 else -0.15
    ax.annotate(
        f"{anno}\n{evento}",              # testo mostrato: anno + evento
        xy=(anno, 0),                     # punto a cui si riferisce l'etichetta
        xytext=(anno, posizione_verticale),  # posizione del testo
        ha="center",                      # allineamento orizzontale centrato
        fontsize=9,
        arrowprops=dict(arrowstyle="-", color="gray", lw=0.8),
    )

# Nascondiamo l'asse Y (non ha significato in una timeline)
ax.get_yaxis().set_visible(False)
# Rimuoviamo i bordi superflui del grafico per uno stile più pulito
for lato in ["top", "right", "left"]:
    ax.spines[lato].set_visible(False)

ax.set_title("Le tappe fondamentali della storia di Internet", fontsize=14, fontweight="bold")
ax.set_xlabel("Anno")
ax.set_ylim(-0.3, 0.3)  # limitiamo lo spazio verticale, serve solo per il layout

plt.tight_layout()  # ottimizza automaticamente gli spazi tra gli elementi
plt.show()           # mostra il grafico

# Proviamo anche a stampare le tappe in ordine cronologico come testo,
# utile per chi preferisce una vista tabellare veloce.
print("\nTappe storiche in ordine cronologico:")
for anno, evento in sorted(tappe_storiche):
    print(f"  {anno} -> {evento}")
```

**Prova tu!** Modifica la lista `tappe_storiche` aggiungendo un evento storico di Internet che ti interessa (ad esempio la nascita di un social network o di un servizio che usi ogni giorno) e rilancia il codice: vedrai la timeline aggiornarsi automaticamente.

---

# 1.6 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| **Internet** | Rete mondiale di reti di computer interconnesse |
| **ARPANET** | Prima rete a commutazione di pacchetto, antenata di Internet |
| **ARPA** | Agenzia statunitense che finanziò la nascita di ARPANET |
| **TCP/IP** | Insieme di protocolli che regolano la trasmissione dei dati su Internet |
| **World Wide Web** | Sistema di documenti ipertestuali collegati tra loro, accessibile tramite Internet |
| **Web 1.0 / 2.0 / 3.0** | Le tre grandi fasi evolutive del Web |
| **Provider (ISP)** | Fornitore del servizio di accesso a Internet |

---

# Riepilogo del modulo

In questo primo modulo hai scoperto:

- che cos'è davvero Internet e perché è definita "rete di reti";
- il contesto storico e militare in cui nasce ARPANET nel 1969;
- le tappe fondamentali che hanno portato Internet a diventare quella che conosciamo oggi;
- l'evoluzione dal Web statico (1.0) al Web collaborativo (2.0) fino al Web intelligente (3.0);
- i momenti chiave della diffusione di Internet in Italia;
- come rappresentare graficamente una timeline storica con Python.

Ora che conosci la storia di Internet, sei pronto per scoprire **come viaggiano realmente le informazioni** attraverso i canali di comunicazione e i mezzi trasmissivi: è l'argomento del **Modulo 2**.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo2"></a> 🟢 MODULO 2 — Canali di Comunicazione e Mezzi Trasmissivi

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- definire che cos'è un canale di comunicazione;
- distinguere la comunicazione sincrona da quella asincrona;
- conoscere i principali mezzi trasmissivi (cavo in rame, fibra ottica, wireless);
- confrontare i mezzi trasmissivi in termini di velocità e affidabilità;
- calcolare con Python i tempi di trasferimento dei dati su canali diversi.

---

# 2.1 Che cos'è un canale di comunicazione?

> **Definizione**
>
> Un **canale di comunicazione** è il mezzo fisico o logico attraverso cui viaggiano le informazioni tra un **mittente** (sender) e un **destinatario** (receiver).

Ogni comunicazione, digitale o meno, richiede quattro elementi fondamentali:

```text
Mittente → Messaggio → Canale di comunicazione → Destinatario
```

Nel mondo dell'informatica, il "messaggio" è composto da **dati digitali** (sequenze di 0 e 1), e il "canale" può essere un cavo, una fibra ottica o persino l'aria, attraversata da onde radio.

---

# 2.2 Comunicazione sincrona e asincrona

## Comunicazione sincrona

Mittente e destinatario sono collegati **nello stesso momento** e si scambiano informazioni in tempo reale.

Esempi: una videochiamata, una telefonata, una chat con risposta immediata.

## Comunicazione asincrona

Il messaggio viene inviato e **rimane in attesa** finché il destinatario non lo legge, anche a distanza di ore o giorni.

Esempi: una e-mail, un messaggio lasciato in segreteria, un post pubblicato sui social.

| Caratteristica | Sincrona | Asincrona |
|-----------------|----------|-----------|
| Tempo di risposta | Immediato | Variabile, anche differito |
| Esempio | Videochiamata | E-mail |
| Necessità di essere online insieme | Sì | No |

> 💡 **Approfondimento**
>
> Molte app moderne (come WhatsApp o Telegram) sono **ibride**: funzionano in modo asincrono (il messaggio resta lì finché non viene letto) ma permettono anche una comunicazione quasi sincrona, grazie a notifiche istantanee e indicatori "sta scrivendo...".

---

# 2.3 I mezzi trasmissivi

Il **mezzo trasmissivo** è il supporto fisico su cui viaggiano concretamente i segnali. Si divide in due grandi famiglie: **mezzi guidati** (o cablati) e **mezzi non guidati** (wireless).

## Mezzi guidati (cablati)

### Cavo in rame (doppino telefonico / cavo coassiale)

- economico e diffusissimo;
- utilizzato storicamente per la telefonia e le prime connessioni Internet;
- soggetto a **interferenze elettromagnetiche** e ad attenuazione del segnale sulle lunghe distanze.

### Cavo Ethernet (doppino intrecciato, es. cat.6)

- usato nelle reti locali (LAN) di case, scuole e uffici;
- più performante del semplice doppino telefonico.

### Fibra ottica

- trasmette dati sotto forma di **impulsi luminosi** attraverso sottilissimi filamenti di vetro o plastica;
- velocità **altissime** e immunità alle interferenze elettromagnetiche;
- è la tecnologia alla base delle moderne dorsali di Internet e delle connessioni FTTH (Fiber To The Home).

## Mezzi non guidati (wireless)

- **Onde radio**: Wi-Fi, Bluetooth, reti mobili (3G/4G/5G);
- **Microonde**: collegamenti satellitari e ponti radio;
- **Infrarossi**: utilizzati per comunicazioni a brevissima distanza (es. telecomandi).

```text
MEZZI TRASMISSIVI
│
├── Guidati (cablati)
│      ├── Cavo in rame
│      ├── Cavo coassiale
│      └── Fibra ottica
│
└── Non guidati (wireless)
       ├── Onde radio (Wi-Fi, 4G/5G)
       ├── Microonde (satellite)
       └── Infrarossi
```

> ⚠️ **Attenzione**
>
> Non confondere il **mezzo trasmissivo** (il "tubo" fisico o l'aria attraverso cui viaggiano i dati) con il **protocollo di comunicazione** (le "regole" che permettono a due dispositivi di capirsi). Il primo è hardware, il secondo è un insieme di regole software. Approfondiremo i protocolli nel Modulo 5.

---

# 2.4 Confronto tra i mezzi trasmissivi

| Mezzo trasmissivo | Velocità tipica | Costo | Sensibilità alle interferenze |
|--------------------|------------------|-------|-------------------------------|
| Doppino telefonico | Bassa | Molto basso | Alta |
| Cavo coassiale | Media | Basso | Media |
| Cavo Ethernet (rame) | Alta | Medio | Bassa |
| Fibra ottica | Altissima | Medio-alto | Praticamente nulla |
| Wi-Fi | Medio-alta | Basso | Media (interferenze da altri dispositivi) |
| Rete mobile 5G | Alta | Variabile | Media |

La **banda** (o larghezza di banda, *bandwidth*) misura la quantità massima di dati che un canale può trasportare in un certo intervallo di tempo, ed è tipicamente espressa in **bit al secondo** (bit/s), o nei suoi multipli: kbit/s, Mbit/s, Gbit/s.

> 💡 **Approfondimento**
>
> Attenzione a non confondere **bit** e **byte**! Un byte equivale a 8 bit. Le velocità di connessione si misurano quasi sempre in **Megabit** al secondo (Mbps), mentre la dimensione dei file si misura quasi sempre in **Megabyte** (MB). Per questo un file da 100 MB, su una linea da 100 Mbps, non impiega esattamente 1 secondo a scaricare, ma circa 8!

---

# 🐍 Laboratorio Python — Calcoliamo i tempi di trasferimento dati

Mettiamo in pratica il concetto di banda calcolando quanto tempo impiega un file a essere trasferito su mezzi trasmissivi diversi.

```python
# ============================================================
# ESERCIZIO 2.1 - Calcolatore del tempo di trasferimento dati
# Obiettivo: calcolare quanto tempo serve per trasferire un file
#            su canali di comunicazione con banda diversa,
#            ricordando la differenza tra bit e byte.
# ============================================================

# Dizionario che associa a ogni mezzo trasmissivo la sua velocità
# tipica, espressa in Megabit al secondo (Mbps).
velocita_canali_mbps = {
    "Doppino telefonico (56k)": 0.056,
    "ADSL": 20,
    "Wi-Fi domestico": 100,
    "Fibra ottica FTTH": 1000,
    "Rete mobile 5G": 500,
}

def calcola_tempo_trasferimento(dimensione_file_mb, velocita_mbps):
    """
    Calcola il tempo necessario (in secondi) per trasferire
    un file, dati la sua dimensione in Megabyte e la velocità
    del canale in Megabit al secondo.
    """
    # 1 Byte = 8 bit, quindi convertiamo la dimensione del file
    # da Megabyte (MB) a Megabit (Mb) moltiplicando per 8.
    dimensione_file_mbit = dimensione_file_mb * 8

    # Il tempo (in secondi) è semplicemente: quantità di dati / velocità.
    tempo_secondi = dimensione_file_mbit / velocita_mbps
    return tempo_secondi


# Proviamo a calcolare quanto tempo serve per scaricare
# un video da 500 MB su ciascun canale trasmissivo.
dimensione_video_mb = 500

print(f"Tempo di download di un file da {dimensione_video_mb} MB:\n")
for nome_canale, velocita in velocita_canali_mbps.items():
    tempo = calcola_tempo_trasferimento(dimensione_video_mb, velocita)

    # Se il tempo è molto lungo, lo convertiamo in minuti per leggibilità.
    if tempo > 60:
        print(f"  {nome_canale:<28} -> {tempo/60:.1f} minuti")
    else:
        print(f"  {nome_canale:<28} -> {tempo:.2f} secondi")

# Visualizziamo il confronto anche con un grafico a barre.
import matplotlib.pyplot as plt

canali = list(velocita_canali_mbps.keys())
tempi = [calcola_tempo_trasferimento(dimensione_video_mb, v) for v in velocita_canali_mbps.values()]

plt.figure(figsize=(10, 5))
# Usiamo una scala logaritmica sull'asse Y perché i tempi sono
# molto diversi tra loro (da pochi secondi a diversi minuti).
plt.bar(canali, tempi, color="mediumseagreen")
plt.yscale("log")
plt.ylabel("Tempo di trasferimento (secondi, scala logaritmica)")
plt.title(f"Tempo per scaricare un file da {dimensione_video_mb} MB")
plt.xticks(rotation=20, ha="right")
plt.tight_layout()
plt.show()
```

**Prova tu!** Cambia il valore di `dimensione_video_mb` (ad esempio prova con la dimensione di un film in 4K, circa 10.000 MB) e osserva come cambiano i tempi sui vari canali.

---

# 2.5 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| **Canale di comunicazione** | Mezzo attraverso cui viaggiano le informazioni tra mittente e destinatario |
| **Comunicazione sincrona** | Scambio di informazioni in tempo reale |
| **Comunicazione asincrona** | Scambio di informazioni non in tempo reale |
| **Mezzo guidato** | Mezzo trasmissivo fisico (cavo, fibra) |
| **Mezzo non guidato** | Mezzo trasmissivo senza supporto fisico (wireless) |
| **Banda (bandwidth)** | Quantità massima di dati trasportabili da un canale nell'unità di tempo |
| **Bit / Byte** | Unità di misura dell'informazione digitale (1 Byte = 8 bit) |

---

# Riepilogo del modulo

In questo modulo hai imparato:

- che cos'è un canale di comunicazione e i suoi elementi fondamentali;
- la differenza tra comunicazione sincrona e asincrona;
- quali sono i principali mezzi trasmissivi guidati (cavo, fibra ottica) e non guidati (Wi-Fi, onde radio);
- come confrontare i mezzi trasmissivi in base a velocità, costo e affidabilità;
- come calcolare in Python il tempo di trasferimento di un file su canali diversi.

Nel prossimo modulo scopriremo **come i dati vengono effettivamente rappresentati** all'interno di questi canali, distinguendo tra segnali analogici e digitali, e vedremo come i singoli dispositivi vengono collegati tra loro per formare una rete: è il tema del **Modulo 3**.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo3"></a> 🟣 MODULO 3 — Reti Analogiche e Digitali, Topologie di Rete

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- distinguere un segnale analogico da un segnale digitale;
- comprendere i concetti di campionamento e quantizzazione;
- classificare le reti in base alla loro estensione geografica (PAN, LAN, MAN, WAN);
- riconoscere le principali topologie di rete (bus, stella, anello, magliata);
- simulare con Python la conversione di un segnale analogico in digitale.

---

# 3.1 Segnali analogici e segnali digitali

> **Definizione**
>
> Un **segnale analogico** è un segnale che varia in modo **continuo** nel tempo, potendo assumere infiniti valori intermedi. Un **segnale digitale**, invece, assume solo un numero **finito** di valori discreti, tipicamente rappresentati da sequenze di **0 e 1** (bit).

Un esempio concreto: la nostra voce è un fenomeno analogico (un'onda sonora continua), ma quando parliamo al telefono attraverso un servizio VoIP (come WhatsApp), quella voce viene **convertita in dati digitali** per poter viaggiare su Internet.

```text
Segnale ANALOGICO                    Segnale DIGITALE
      ~                                  █   █
   ~     ~                            █  █   █  █
  ~         ~                         █  █   █  █
 onda continua                     0  1   0  1   0
```

## Perché il digitale ha "vinto"?

- i segnali digitali sono molto più **resistenti al rumore e alle interferenze**: un bit è "0" o "1", senza ambiguità, mentre un segnale analogico degradato è difficile da recuperare con precisione;
- è più facile **comprimere, correggere errori e criptare** dati digitali;
- gli stessi dispositivi digitali possono gestire testo, audio, immagini e video con lo stesso linguaggio binario.

---

# 3.2 Dall'analogico al digitale: campionamento e quantizzazione

Per trasformare un segnale analogico (come il suono) in un segnale digitale si usano due operazioni fondamentali:

1. **Campionamento (sampling)**: si "fotografa" il valore del segnale a intervalli di tempo regolari;
2. **Quantizzazione**: ogni valore campionato viene approssimato al livello discreto più vicino, disponibile nella rappresentazione digitale.

> 💡 **Approfondimento**
>
> Questo è esattamente il principio su cui si basa la qualità dell'audio digitale: un file musicale campionato a 44.100 Hz (come un CD audio) "fotografa" l'onda sonora 44.100 volte al secondo! Più il campionamento è frequente, più la ricostruzione digitale sarà fedele all'originale analogico.

---

# 3.3 Classificazione delle reti per estensione geografica

Una **rete di computer** è un insieme di dispositivi collegati tra loro per scambiarsi dati e risorse. Le reti si classificano in base alla loro **estensione geografica**:

| Sigla | Nome esteso | Estensione | Esempio |
|-------|-------------|------------|---------|
| **PAN** | Personal Area Network | Pochi metri | Collegamento Bluetooth tra smartphone e cuffie |
| **LAN** | Local Area Network | Un edificio, una scuola | Rete Wi-Fi/cablata della tua scuola |
| **MAN** | Metropolitan Area Network | Una città | Rete civica di un comune |
| **WAN** | Wide Area Network | Regione, stato, continenti | Internet stessa, o la rete di una multinazionale |

```text
PAN  <  LAN  <  MAN  <  WAN
(pochi metri)      (mondiale)
```

---

# 3.4 Le topologie di rete

La **topologia di rete** descrive il modo in cui i dispositivi (detti anche **nodi**) sono collegati fisicamente o logicamente tra loro.

## Topologia a Bus

Tutti i dispositivi sono collegati a un unico cavo centrale (il "bus").

```text
   PC1     PC2     PC3     PC4
    │       │       │       │
────┴───────┴───────┴───────┴────  (bus)
```

- ✅ economica e semplice da realizzare;
- ❌ se il cavo centrale si guasta, l'intera rete smette di funzionare.

## Topologia a Stella

Ogni dispositivo è collegato individualmente a un nodo centrale (uno switch o un router).

```text
        PC1
         │
PC2 ── SWITCH ── PC3
         │
        PC4
```

- ✅ è la topologia più diffusa oggi (è quella della tua rete Wi-Fi di casa!);
- ✅ il guasto di un singolo cavo non blocca gli altri dispositivi;
- ❌ se il nodo centrale si guasta, l'intera rete va in blocco.

## Topologia ad Anello

Ogni dispositivo è collegato ad altri due, formando un anello chiuso; i dati viaggiano lungo l'anello passando da un nodo all'altro.

```text
      PC1 ── PC2
       │       │
      PC4 ── PC3
```

- ✅ buone prestazioni con traffico regolare;
- ❌ un solo nodo guasto può interrompere l'intero anello (a meno di soluzioni ridondanti).

## Topologia Magliata (Mesh)

Ogni dispositivo è collegato a più (o a tutti) gli altri dispositivi della rete.

```text
   PC1 ─────── PC2
    │  ╲       ╱  │
    │    ╲   ╱    │
    │      ╳      │
    │    ╱   ╲    │
    │  ╱       ╲  │
   PC4 ─────── PC3
```

- ✅ massima affidabilità: se un collegamento si interrompe, i dati trovano percorsi alternativi;
- ❌ costosa e complessa da realizzare su larga scala (è il principio con cui è costruita Internet stessa, a livello di dorsali).

> ⚠️ **Attenzione**
>
> Nella pratica, molte reti reali (incluso Internet) sono **topologie ibride**, che combinano più modelli insieme: ad esempio la rete della tua scuola può avere una topologia a stella al suo interno, ma essere collegata a Internet — una rete di tipo magliato su scala globale — tramite un unico router.

---

# 🐍 Laboratorio Python — Simuliamo campionamento e quantizzazione

Simuliamo la conversione di un'onda analogica (una sinusoide, che rappresenta ad esempio un suono puro) in un segnale digitale, applicando campionamento e quantizzazione.

```python
# ============================================================
# ESERCIZIO 3.1 - Dall'analogico al digitale
# Obiettivo: simulare la conversione di un segnale analogico
#            (un'onda sinusoidale continua) in un segnale
#            digitale, tramite campionamento e quantizzazione.
# ============================================================

import numpy as np                # per generare e manipolare i dati numerici
import matplotlib.pyplot as plt   # per visualizzare i grafici

# --- 1. Generiamo il segnale ANALOGICO ---
# np.linspace crea 1000 punti equidistanti tra 0 e 1 secondo:
# lo consideriamo un segnale "continuo" perché la risoluzione è altissima.
tempo_analogico = np.linspace(0, 1, 1000)

# Creiamo un'onda sinusoidale con frequenza 5 Hz (5 oscillazioni al secondo),
# che rappresenta il nostro segnale analogico originale (es. un suono puro).
segnale_analogico = np.sin(2 * np.pi * 5 * tempo_analogico)

# --- 2. CAMPIONAMENTO ---
# "Fotografiamo" il segnale analogico a intervalli di tempo regolari.
# Usiamo una frequenza di campionamento di 20 campioni al secondo.
frequenza_campionamento = 20
tempo_campionato = np.linspace(0, 1, frequenza_campionamento)
segnale_campionato = np.sin(2 * np.pi * 5 * tempo_campionato)

# --- 3. QUANTIZZAZIONE ---
# Approssimiamo ogni valore campionato a uno dei livelli discreti
# disponibili. Con "livelli_quantizzazione = 4" simuliamo una codifica
# digitale a soli 2 bit (2^2 = 4 livelli possibili: -1, -0.33, 0.33, 1).
livelli_quantizzazione = 4
livelli_disponibili = np.linspace(-1, 1, livelli_quantizzazione)

# Per ogni valore campionato troviamo il livello discreto più vicino.
segnale_quantizzato = np.array([
    livelli_disponibili[np.argmin(np.abs(livelli_disponibili - valore))]
    for valore in segnale_campionato
])

# --- 4. Visualizziamo i tre segnali a confronto ---
plt.figure(figsize=(11, 6))

plt.plot(tempo_analogico, segnale_analogico, label="Segnale analogico (continuo)", color="gray", linewidth=1.5)
plt.stem(tempo_campionato, segnale_campionato, linefmt="C0-", markerfmt="C0o", basefmt=" ",
         label="Segnale campionato")
plt.step(tempo_campionato, segnale_quantizzato, where="mid", color="crimson", linewidth=2,
         label="Segnale quantizzato (digitale)")

plt.title("Dall'onda analogica al segnale digitale")
plt.xlabel("Tempo (secondi)")
plt.ylabel("Ampiezza")
plt.legend()
plt.tight_layout()
plt.show()

print(f"Il segnale digitale finale è rappresentabile con soli {livelli_quantizzazione} livelli,")
print(f"cioè con {int(np.log2(livelli_quantizzazione))} bit per campione.")
```

**Prova tu!** Aumenta il valore di `frequenza_campionamento` (ad esempio a 100) e osserva come il segnale campionato diventa più fedele all'originale: è lo stesso principio per cui un audio digitale "campionato meglio" suona più naturale.

---

# 🐍 Laboratorio Python — Disegniamo le topologie di rete

```python
# ============================================================
# ESERCIZIO 3.2 - Visualizzare le topologie di rete
# Obiettivo: disegnare graficamente le quattro topologie di rete
#            principali (bus, stella, anello, magliata) usando
#            solo matplotlib, senza librerie esterne aggiuntive.
# ============================================================

import matplotlib.pyplot as plt
import numpy as np

# Creiamo una griglia 2x2 di grafici, uno per ogni topologia.
fig, assi = plt.subplots(2, 2, figsize=(10, 10))

def disegna_nodi(ax, posizioni, colore="steelblue"):
    """Disegna i nodi (dispositivi) come cerchi numerati, date le loro posizioni (x, y)."""
    for indice, (x, y) in enumerate(posizioni):
        ax.scatter(x, y, s=800, color=colore, zorder=3)
        ax.text(x, y, f"PC{indice+1}", ha="center", va="center", color="white", fontweight="bold")

# --- Topologia a BUS ---
ax = assi[0, 0]
posizioni_bus = [(1, 1), (2, 1), (3, 1), (4, 1)]
ax.plot([0.5, 4.5], [1, 1], color="black", linewidth=3, zorder=1)  # il "bus" centrale
disegna_nodi(ax, posizioni_bus)
ax.set_title("Topologia a BUS")

# --- Topologia a STELLA ---
ax = assi[0, 1]
centro = (2.5, 2.5)
posizioni_stella = [(2.5, 4), (1, 3), (4, 3), (2.5, 1)]
for x, y in posizioni_stella:
    ax.plot([centro[0], x], [centro[1], y], color="black", linewidth=2, zorder=1)
disegna_nodi(ax, posizioni_stella)
ax.scatter(*centro, s=1000, color="darkorange", marker="s", zorder=3)
ax.text(*centro, "SW", ha="center", va="center", color="white", fontweight="bold")
ax.set_title("Topologia a STELLA")

# --- Topologia ad ANELLO ---
ax = assi[1, 0]
angoli = np.linspace(0, 2 * np.pi, 5)[:-1]  # 4 punti equidistanti su una circonferenza
posizioni_anello = [(2.5 + 1.5 * np.cos(a), 2.5 + 1.5 * np.sin(a)) for a in angoli]
for i in range(len(posizioni_anello)):
    x1, y1 = posizioni_anello[i]
    x2, y2 = posizioni_anello[(i + 1) % len(posizioni_anello)]
    ax.plot([x1, x2], [y1, y2], color="black", linewidth=2, zorder=1)
disegna_nodi(ax, posizioni_anello)
ax.set_title("Topologia ad ANELLO")

# --- Topologia MAGLIATA (mesh) ---
ax = assi[1, 1]
posizioni_mesh = posizioni_anello  # riusiamo le stesse 4 posizioni
for i in range(len(posizioni_mesh)):
    for j in range(i + 1, len(posizioni_mesh)):
        x1, y1 = posizioni_mesh[i]
        x2, y2 = posizioni_mesh[j]
        ax.plot([x1, x2], [y1, y2], color="black", linewidth=1.5, zorder=1)
disegna_nodi(ax, posizioni_mesh)
ax.set_title("Topologia MAGLIATA")

# Rimuoviamo gli assi numerici da tutti i sottografici: non servono,
# ci interessa solo la disposizione visiva dei nodi.
for riga in assi:
    for ax in riga:
        ax.set_xlim(0, 5)
        ax.set_ylim(0, 5)
        ax.axis("off")

plt.suptitle("Le quattro topologie di rete fondamentali", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.show()
```

---

# 3.5 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| **Segnale analogico** | Segnale che varia in modo continuo nel tempo |
| **Segnale digitale** | Segnale rappresentato da valori discreti (bit) |
| **Campionamento** | Misurazione del segnale a intervalli di tempo regolari |
| **Quantizzazione** | Approssimazione di un valore campionato al livello discreto più vicino |
| **Nodo** | Ogni dispositivo collegato a una rete |
| **Topologia di rete** | Modo in cui i nodi di una rete sono collegati tra loro |
| **LAN / MAN / WAN** | Classificazione delle reti in base all'estensione geografica |

---

# Riepilogo del modulo

In questo modulo hai imparato:

- la differenza fondamentale tra segnali analogici e digitali;
- i concetti di campionamento e quantizzazione, alla base di ogni conversione analogico-digitale;
- come si classificano le reti in base alla loro estensione (PAN, LAN, MAN, WAN);
- le quattro topologie di rete principali: bus, stella, anello e magliata, con i relativi vantaggi e svantaggi;
- come simulare in Python la conversione di un segnale analogico in digitale e come disegnare le topologie di rete.

Ora che sai come sono strutturate le reti, è il momento di scoprire **come un singolo dispositivo si collega concretamente a Internet**: dal vecchio modem telefonico fino all'ADSL e alla fibra. Ne parliamo nel **Modulo 4**.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo4"></a> 🟡 MODULO 4 — La Connessione a Internet: dal Modem all'ADSL e Oltre

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- elencare gli elementi necessari per collegarsi a Internet;
- spiegare il funzionamento del modem e i concetti di modulazione/demodulazione;
- descrivere l'evoluzione dalla connessione telefonica all'ADSL, fino alla fibra ottica;
- distinguere le tecnologie di connessione mobile (3G, 4G, 5G);
- comprendere come si misura la velocità di una connessione;
- utilizzare Python per confrontare i tempi di connessione tra tecnologie diverse.

---

# 4.1 Cosa serve per collegarsi a Internet?

Per connettere un dispositivo a Internet servono generalmente:

1. un **dispositivo** (computer, smartphone, tablet...);
2. un **modem/router**, che fa da "ponte" tra la rete domestica e la rete del fornitore;
3. un **contratto con un fornitore di connettività**, detto **ISP** (Internet Service Provider), come le compagnie telefoniche che offrono abbonamenti Internet;
4. un **mezzo trasmissivo** che collega la nostra abitazione alla rete dell'ISP (cavo telefonico, fibra ottica, onde radio...).

---

# 4.2 Il modem: modulazione e demodulazione

> **Definizione**
>
> Il termine **modem** deriva dall'unione di due parole: **MO**dulatore e **DEM**odulatore. È il dispositivo che converte i segnali **digitali** del nostro computer in segnali **analogici** adatti a viaggiare sulla linea telefonica (modulazione), e viceversa (demodulazione).

```text
Computer (digitale)  →  MODEM  →  segnale analogico  →  linea telefonica
                                                              │
Computer (digitale)  ←  MODEM  ←  segnale analogico  ←───────┘
                     (demodulazione)
```

> 💡 **Approfondimento**
>
> I primi modem degli anni '90 erano famosi per il loro caratteristico "fischio" all'avvio della connessione: quel suono era proprio il segnale analogico di modulazione udibile, prodotto durante la fase di negoziazione della connessione con il provider!

Oggi, con le connessioni in fibra ottica, il termine "modem" viene spesso usato in modo generico per indicare l'apparato che collega la casa a Internet, anche se tecnicamente la conversione modulazione/demodulazione riguarda solo le connessioni su linea telefonica tradizionale.

---

# 4.3 Dalla linea telefonica all'ADSL

## Il modem dial-up (anni '90)

Le prime connessioni domestiche a Internet avvenivano tramite **modem dial-up**: il computer "chiamava" letteralmente un numero di telefono del provider, occupando l'intera linea telefonica (non si poteva navigare e telefonare insieme!) con velocità massime di circa **56 kbit/s**.

## L'ADSL (Asymmetric Digital Subscriber Line)

Introdotta in Italia agli inizi degli anni 2000, l'**ADSL** ha rivoluzionato l'accesso a Internet, sfruttando la stessa linea telefonica in rame ma con una tecnologia che permette di:

- navigare e telefonare **contemporaneamente**, perché voce e dati viaggiano su bande di frequenza diverse dello stesso cavo;
- raggiungere velocità molto più elevate rispetto al dial-up (fino a circa 20 Mbit/s in download).

> **Perché "Asimmetrica"?**
>
> La "A" di ADSL sta per **Asymmetric**: la velocità di **download** (dati che arrivano verso di noi) è molto più alta della velocità di **upload** (dati che inviamo noi). Questo perché la maggior parte degli utenti scarica molti più dati di quanti ne invii (pagine web, video, file), quindi ha senso privilegiare il download.

---

# 4.4 Fibra ottica e connessioni mobili

## Fibra ottica: FTTC e FTTH

| Sigla | Significato | Descrizione |
|-------|--------------|-------------|
| **FTTC** | Fiber To The Cabinet | La fibra ottica arriva fino all'armadio stradale, poi l'ultimo tratto verso casa resta in rame |
| **FTTH** | Fiber To The Home | La fibra ottica arriva **direttamente dentro casa**, offrendo le massime prestazioni |

```text
FTTC:  Centrale ══fibra══► Armadio stradale ──rame──► Casa
FTTH:  Centrale ══════════════fibra ottica═══════════► Casa
```

## Connessioni mobili: 3G, 4G, 5G

| Generazione | Periodo di diffusione | Velocità indicativa | Utilizzo tipico |
|--------------|------------------------|----------------------|-------------------|
| **3G** | Anni 2000-2010 | ~2 Mbit/s | Prime navigazioni web da smartphone |
| **4G / 4G LTE** | Dal 2010 | 20-100 Mbit/s | Streaming video, social, videochiamate |
| **5G** | Dal 2019 | Centinaia di Mbit/s - oltre 1 Gbit/s | Realtà aumentata, IoT, bassissima latenza |

---

# 4.5 Come si misura la velocità di una connessione

Ogni connessione Internet si misura principalmente in base a tre parametri:

- **Velocità di download**: quanto velocemente riceviamo dati (es. guardare un video);
- **Velocità di upload**: quanto velocemente inviamo dati (es. caricare un video su YouTube);
- **Latenza (ping)**: il tempo che un dato impiega per andare dal nostro dispositivo a un server e tornare indietro, misurato in millisecondi (ms). Una bassa latenza è fondamentale per attività "in tempo reale" come i videogiochi online.

> ⚠️ **Attenzione**
>
> Una connessione può avere una velocità di download altissima ma una **latenza elevata** (ad esempio nelle connessioni satellitari): per attività come i videogiochi online, spesso la latenza è più importante della semplice velocità massima!

---

# 🐍 Laboratorio Python — Confrontiamo le tecnologie di connessione

```python
# ============================================================
# ESERCIZIO 4.1 - Confronto tra tecnologie di connessione
# Obiettivo: calcolare e confrontare il tempo di download di
#            un file su diverse generazioni di tecnologie di
#            connessione, dal dial-up al 5G.
# ============================================================

import matplotlib.pyplot as plt

# Dizionario con le velocità di download tipiche (in Mbit/s)
# delle principali tecnologie di connessione viste nel modulo.
tecnologie_connessione = {
    "Dial-up (56k)": 0.056,
    "ADSL": 20,
    "FTTC (fibra mista rame)": 100,
    "FTTH (fibra ottica pura)": 1000,
    "4G LTE": 60,
    "5G": 1000,
}

def tempo_download_secondi(dimensione_mb, velocita_mbps):
    """Restituisce il tempo di download in secondi, dati dimensione file (MB) e velocità (Mbps)."""
    dimensione_mbit = dimensione_mb * 8  # conversione da Megabyte a Megabit
    return dimensione_mbit / velocita_mbps

# Simuliamo il download di un film in alta definizione da 4 GB (4096 MB).
dimensione_film_mb = 4096

print(f"Tempo per scaricare un film da {dimensione_film_mb} MB (4 GB):\n")
risultati = {}
for tecnologia, velocita in tecnologie_connessione.items():
    secondi = tempo_download_secondi(dimensione_film_mb, velocita)
    risultati[tecnologia] = secondi

    # Convertiamo il tempo in una stringa leggibile: ore, minuti o secondi.
    if secondi >= 3600:
        testo_tempo = f"{secondi/3600:.1f} ore"
    elif secondi >= 60:
        testo_tempo = f"{secondi/60:.1f} minuti"
    else:
        testo_tempo = f"{secondi:.1f} secondi"

    print(f"  {tecnologia:<28} ({velocita:>7} Mbit/s) -> {testo_tempo}")

# Rappresentiamo graficamente i risultati con un grafico a barre orizzontali,
# più leggibile quando i nomi delle categorie sono lunghi.
plt.figure(figsize=(9, 5))
plt.barh(list(risultati.keys()), list(risultati.values()), color="darkorange")
plt.xscale("log")  # scala logaritmica: i tempi variano di diversi ordini di grandezza
plt.xlabel("Tempo di download (secondi, scala logaritmica)")
plt.title(f"Confronto tempi di download di un file da {dimensione_film_mb} MB")
plt.tight_layout()
plt.show()
```

**Prova tu!** Aggiungi al dizionario `tecnologie_connessione` una nuova voce con la velocità della tua connessione reale (puoi trovarla facendo un semplice test di velocità online) e confrontala con le altre.

---

# 4.6 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| **ISP** | Internet Service Provider, fornitore dell'accesso a Internet |
| **Modem** | Dispositivo che modula/demodula il segnale tra digitale e analogico |
| **ADSL** | Tecnologia di connessione a banda larga su linea telefonica tradizionale |
| **FTTC / FTTH** | Tecnologie di connessione in fibra ottica, parziale o completa |
| **Download / Upload** | Velocità di ricezione / invio dei dati |
| **Latenza (ping)** | Tempo di andata e ritorno di un dato tra dispositivo e server |
| **3G / 4G / 5G** | Generazioni successive di reti di connessione mobile |

---

# Riepilogo del modulo

In questo modulo hai imparato:

- quali elementi servono per collegare un dispositivo a Internet;
- come funziona un modem attraverso la modulazione e demodulazione del segnale;
- l'evoluzione storica dal modem dial-up all'ADSL, fino alla fibra ottica (FTTC e FTTH);
- le differenze tra le generazioni di connessione mobile 3G, 4G e 5G;
- come si misura la qualità di una connessione (download, upload, latenza);
- come confrontare in Python i tempi di download su tecnologie di connessione diverse.

Ora che sai come i dispositivi si collegano fisicamente a Internet, è il momento di scoprire **le regole** che permettono a due computer di "capirsi" e scambiarsi dati correttamente: è l'argomento del **Modulo 5**, dedicato al modello client-server e ai protocolli di comunicazione.

[⬆ Torna all'indice](#indice)

---

## <a id="modulo5"></a> 🔴 MODULO 5 — Il Modello Client-Server e i Protocolli di Comunicazione

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- descrivere il modello client-server e distinguerlo dal modello peer-to-peer;
- definire che cos'è un protocollo di comunicazione e perché è indispensabile;
- conoscere i protocolli fondamentali di Internet: TCP/IP, HTTP/HTTPS, FTP, SMTP/POP/IMAP;
- comprendere che cosa sono indirizzo IP e DNS e a cosa servono;
- sperimentare in Python una comunicazione client-server e una risoluzione DNS.

---

# 5.1 Il modello client-server

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

---

# 5.2 Il modello Peer-to-Peer (P2P): un confronto

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

# 5.3 Che cos'è un protocollo di comunicazione?

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

# 5.4 I protocolli fondamentali di Internet

## TCP/IP: la base di tutto

**TCP/IP** è in realtà una **famiglia di protocolli** organizzata a livelli (detta anche *stack* o *suite*):

- **IP (Internet Protocol)**: si occupa di indirizzare e instradare i dati verso il destinatario corretto, suddividendo le informazioni in piccoli "pacchetti";
- **TCP (Transmission Control Protocol)**: garantisce che i pacchetti arrivino **tutti**, **nell'ordine corretto** e **senza errori**, richiedendo il reinvio di eventuali pacchetti persi.

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

# 5.5 Indirizzi IP e DNS

## L'indirizzo IP

> **Definizione**
>
> Un **indirizzo IP** è un codice numerico univoco che identifica un dispositivo all'interno di una rete, in modo analogo a come un indirizzo postale identifica una casa.

Un indirizzo IPv4 è composto da quattro numeri (da 0 a 255) separati da punti, ad esempio `192.168.1.10`.

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

# 🐍 Laboratorio Python — Un piccolo server e client in azione

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
> Questo esempio usa `127.0.0.1` (detto anche **localhost**), un indirizzo IP speciale che indica sempre "il computer stesso su cui sto eseguendo il codice". È molto usato per test e sviluppo, perché client e server comunicano senza passare da una rete esterna reale.

---

# 🐍 Laboratorio Python — Come funziona il DNS

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

# 5.6 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| **Client** | Dispositivo o software che richiede un servizio |
| **Server** | Dispositivo o software che fornisce un servizio |
| **Peer-to-Peer (P2P)** | Modello di rete paritario, senza server centrale |
| **Protocollo** | Insieme di regole condivise per la comunicazione tra dispositivi |
| **TCP/IP** | Famiglia di protocolli alla base del funzionamento di Internet |
| **HTTP / HTTPS** | Protocolli per il trasferimento di pagine web (HTTPS = versione sicura) |
| **Indirizzo IP** | Codice numerico che identifica univocamente un dispositivo in rete |
| **DNS** | Sistema che traduce i nomi di dominio in indirizzi IP |

---

# Riepilogo del modulo

In questo modulo hai imparato:

- come funziona il modello client-server e in cosa si differenzia dal modello peer-to-peer;
- che cos'è un protocollo di comunicazione e perché è indispensabile per far "dialogare" dispositivi diversi;
- i protocolli fondamentali di Internet: TCP/IP, HTTP/HTTPS, FTP, SMTP/POP/IMAP;
- il ruolo dell'indirizzo IP e del DNS nel far funzionare la navigazione su Internet;
- come creare in Python una piccola comunicazione client-server e come effettuare una risoluzione DNS.

Nell'ultimo modulo di questa guida metteremo insieme tutti i concetti visti finora per scoprire **il World Wide Web** e le caratteristiche del programma che usi ogni giorno per navigare: il **browser**. Ti aspettiamo nel **Modulo 6**!

[⬆ Torna all'indice](#indice)

---

## <a id="modulo6"></a> 🟠 MODULO 6 — Il World Wide Web e le Caratteristiche di un Browser

[⬆ Torna all'indice](#indice)

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- distinguere con precisione Internet dal World Wide Web;
- comprendere che cos'è un URL e come è strutturato;
- spiegare il concetto di ipertesto e il ruolo dell'HTML;
- descrivere che cos'è un browser e quali sono le sue caratteristiche principali;
- confrontare i browser più diffusi;
- riconoscere le buone pratiche di navigazione sicura;
- utilizzare Python per analizzare un URL e ispezionare una richiesta HTTP reale.

---

# 6.1 Internet e World Wide Web: non sono la stessa cosa!

Abbiamo iniziato questa guida chiarendo che cos'è Internet (Modulo 1); ora possiamo finalmente definire con precisione il **World Wide Web**.

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

# 6.2 L'URL: l'indirizzo di ogni pagina web

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

---

# 6.3 Ipertesti e cenni sull'HTML

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

---

# 6.4 Che cos'è un browser?

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

# 6.5 Le caratteristiche principali di un browser moderno

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

# 6.6 I principali browser a confronto

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

# 6.7 Navigazione sicura: HTTPS, cookie e privacy

- **HTTPS**: come già visto nel Modulo 5, garantisce che i dati scambiati con il sito siano criptati;
- **Cookie**: piccoli file che i siti web salvano sul nostro dispositivo per "ricordare" informazioni (es. il carrello di un e-commerce, le preferenze di lingua, o dati usati per la pubblicità mirata);
- **Cronologia e cache**: il browser conserva traccia dei siti visitati e salva localmente parte dei loro contenuti per velocizzare le visite successive;
- **Password manager integrato**: molti browser offrono un gestore di password per salvare le credenziali in modo (relativamente) sicuro.

> ⚠️ **Attenzione**
>
> I cookie non sono di per sé "pericolosi", ma è buona pratica **eliminarli periodicamente** e prestare attenzione ai permessi che concediamo ai siti web (fotocamera, microfono, posizione), accettandoli solo quando realmente necessario e da siti di cui ci fidiamo.

---

# 🐍 Laboratorio Python — Analizziamo un URL

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

# 🐍 Laboratorio Python — Ispezioniamo una vera richiesta HTTP

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

# 6.8 Glossario del modulo

| Termine | Significato |
|----------|-------------|
| **World Wide Web (WWW)** | Servizio di documenti ipertestuali collegati tra loro, basato su Internet |
| **URL** | Indirizzo univoco di una risorsa sul Web |
| **Ipertesto** | Testo contenente collegamenti verso altri contenuti |
| **HTML** | Linguaggio a marcatori usato per costruire le pagine web |
| **Browser** | Software che permette di richiedere e visualizzare pagine web |
| **Motore di rendering** | Componente del browser che interpreta HTML/CSS/JS e disegna la pagina |
| **Cookie** | Piccolo file salvato dal sito sul dispositivo dell'utente |
| **Status code HTTP** | Codice numerico che indica l'esito di una richiesta HTTP |

---

# Riepilogo del modulo

In quest'ultimo modulo hai imparato:

- la differenza fondamentale tra Internet (l'infrastruttura) e il World Wide Web (uno dei suoi servizi);
- come è strutturato un URL e a cosa serve ciascuna delle sue parti;
- i concetti di ipertesto e le basi del linguaggio HTML;
- che cos'è un browser e quali sono le sue caratteristiche fondamentali;
- come confrontare i principali browser in uso oggi;
- le buone pratiche per una navigazione sicura (HTTPS, cookie, privacy);
- come analizzare un URL e ispezionare una vera richiesta HTTP con Python.

---

# 🎓 Conclusione della guida

Complimenti per aver completato tutti e sei i moduli di questa guida su **ICDL Online Essentials**! Hai costruito un percorso completo che parte dalla storia di Internet, attraversa i canali di comunicazione e le reti, arriva alla connessione a Internet e ai protocolli, fino ad approdare al World Wide Web e ai browser che usi ogni giorno.

Ora possiedi le basi teoriche e pratiche per comprendere **come funziona davvero la rete che usi ogni giorno** — e, soprattutto, hai iniziato a "programmarla" con Python, un'abilità che ti sarà utilissima per tutto il tuo percorso di studi.

Continua a sperimentare, modifica gli esempi di codice, prova nuove idee: è il modo migliore per trasformare queste conoscenze in competenze solide. Buon proseguimento con **gcprof-academy.com**! 🚀

[⬆ Torna all'indice](#indice)

---