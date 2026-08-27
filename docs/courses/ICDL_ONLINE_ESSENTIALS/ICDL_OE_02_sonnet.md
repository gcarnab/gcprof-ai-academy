# 🟢 MODULO 2 — Canali di Comunicazione e Mezzi Trasmissivi

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### ICDL Online Essentials · Percorso per il primo biennio (indirizzi LSA, RIM) · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [2.1 Che cos'è un canale di comunicazione?](#sez-2-1)
2. [2.2 Comunicazione sincrona e asincrona](#sez-2-2)
3. [2.3 Modalità di trasmissione: simplex, half-duplex, full-duplex](#sez-2-3)
4. [2.4 I mezzi trasmissivi guidati (cablati)](#sez-2-4)
5. [2.5 I mezzi trasmissivi non guidati (wireless)](#sez-2-5)
6. [2.6 Confronto tra i mezzi trasmissivi: banda, velocità, costo](#sez-2-6)
7. [🐍 Laboratorio Python 2.1 — Calcoliamo i tempi di trasferimento dati](#lab-2-1)
8. [🐍 Laboratorio Python 2.2 — La latenza di propagazione del segnale](#lab-2-2)
9. [2.7 Glossario del modulo](#sez-2-7)
10. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- definire che cos'è un canale di comunicazione e riconoscerne gli elementi fondamentali;
- distinguere la comunicazione sincrona da quella asincrona;
- distinguere le modalità di trasmissione simplex, half-duplex e full-duplex;
- conoscere i principali mezzi trasmissivi guidati (doppino, cavo coassiale, fibra ottica) e non guidati (onde radio, microonde, infrarossi);
- confrontare i mezzi trasmissivi in termini di velocità, costo e affidabilità;
- calcolare con Python i tempi di trasferimento dei dati e la latenza di propagazione del segnale su canali diversi.

---

<a id="sez-2-1"></a>
# 2.1 Che cos'è un canale di comunicazione?

[⬆ Torna all'indice del modulo](#indice-modulo)

Nel Modulo 1 abbiamo visto **che cos'è** Internet e **come si è evoluta**. In questo modulo scendiamo un gradino più in basso, e ci chiediamo: quando due dispositivi comunicano, **attraverso che cosa** viaggiano davvero i dati?

> **Definizione**
>
> Un **canale di comunicazione** è il mezzo fisico o logico attraverso cui viaggiano le informazioni tra un **mittente** (*sender*) e un **destinatario** (*receiver*).

Ogni comunicazione, digitale o meno, può essere descritta con uno schema molto semplice, che risale agli studi del matematico Claude Shannon sulla teoria dell'informazione:

```text
Mittente → [Codifica] → Messaggio → Canale di comunicazione → [Decodifica] → Destinatario
                                            ↑
                                        (rumore / disturbo)
```

Nel mondo dell'informatica, il "messaggio" è composto da **dati digitali** (sequenze di 0 e 1), e il "canale" può essere un cavo, una fibra ottica o persino l'aria, attraversata da onde radio.

> 💡 **Approfondimento**
>
> Il termine **rumore** (*noise*) indica qualunque fattore che disturbi il segnale lungo il canale: interferenze elettromagnetiche, attenuazione del segnale sulle lunghe distanze, o semplicemente il "sovraffollamento" di una rete Wi-Fi con troppi dispositivi collegati. Una buona parte dell'ingegneria delle telecomunicazioni si occupa proprio di **progettare canali e protocolli capaci di resistere al rumore**, correggendo o richiedendo il reinvio dei dati danneggiati.

Perché mittente e destinatario si capiscano, entrambi devono usare le stesse regole di **codifica** e **decodifica** dell'informazione: è un po' come parlare la stessa lingua. Approfondiremo questo aspetto — i **protocolli di comunicazione** — nel Modulo 5.

---

<a id="sez-2-2"></a>
# 2.2 Comunicazione sincrona e asincrona

[⬆ Torna all'indice del modulo](#indice-modulo)

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
| Tollera interruzioni della connessione | Poco (la comunicazione si interrompe) | Bene (il messaggio resta in attesa) |

> 💡 **Approfondimento**
>
> Molte app moderne (come WhatsApp o Telegram) sono **ibride**: funzionano in modo asincrono (il messaggio resta lì finché non viene letto) ma permettono anche una comunicazione quasi sincrona, grazie a notifiche istantanee e indicatori "sta scrivendo...". Anche la posta elettronica, storicamente asincrona, può essere resa "quasi sincrona" da app che notificano l'arrivo dei messaggi in tempo reale.

---

<a id="sez-2-3"></a>
# 2.3 Modalità di trasmissione: simplex, half-duplex, full-duplex

[⬆ Torna all'indice del modulo](#indice-modulo)

Oltre a *quando* avviene la comunicazione (sincrona/asincrona), è importante capire *in quali direzioni* può viaggiare il segnale su un canale.

## Simplex

I dati viaggiano in **una sola direzione**, sempre dallo stesso mittente verso lo stesso destinatario. Il destinatario non può "rispondere" utilizzando lo stesso canale.

Esempi: una trasmissione televisiva, la radio, un telecomando (dal telecomando alla TV, mai il contrario).

## Half-duplex

I dati possono viaggiare **in entrambe le direzioni, ma non contemporaneamente**: mentre un dispositivo trasmette, l'altro deve necessariamente ricevere, e viceversa.

Esempio classico: un walkie-talkie, dove bisogna premere il pulsante per parlare e rilasciarlo per ascoltare.

## Full-duplex

I dati possono viaggiare **in entrambe le direzioni contemporaneamente**. È la modalità delle moderne reti dati.

Esempio: una normale telefonata, dove entrambi gli interlocutori possono parlare (e sentirsi) nello stesso istante; oppure una connessione Ethernet moderna, dove il computer può inviare e ricevere dati nello stesso momento.

```text
SIMPLEX        Mittente ────────────────────► Destinatario

HALF-DUPLEX    Dispositivo A ◄──── (a turno) ────► Dispositivo B

FULL-DUPLEX    Dispositivo A ◄──── (contemporaneamente) ────► Dispositivo B
```

> ⚠️ **Attenzione**
>
> Un errore comune è pensare che le prime reti locali basate su cavo Ethernet e **hub** fossero già full-duplex: in realtà, con un hub tutti i dispositivi collegati condividevano lo stesso canale in modalità half-duplex, e potevano verificarsi delle **collisioni** se due dispositivi trasmettevano nello stesso istante. Solo con l'introduzione degli **switch** (che vedremo meglio nel Modulo 3) le reti locali sono diventate realmente full-duplex.

---

<a id="sez-2-4"></a>
# 2.4 I mezzi trasmissivi guidati (cablati)

[⬆ Torna all'indice del modulo](#indice-modulo)

Il **mezzo trasmissivo** è il supporto fisico su cui viaggiano concretamente i segnali. Si divide in due grandi famiglie: **mezzi guidati** (o cablati), in cui il segnale è "incanalato" fisicamente lungo un supporto, e **mezzi non guidati** (wireless), che vedremo nella prossima sezione.

## Doppino telefonico (cavo in rame)

- economico e diffusissimo;
- utilizzato storicamente per la telefonia e le prime connessioni Internet (i vecchi modem analogici e l'ADSL, che approfondiremo nel Modulo 4);
- soggetto a **interferenze elettromagnetiche** e ad **attenuazione** del segnale sulle lunghe distanze.

## Cavo coassiale

- un conduttore centrale in rame, avvolto da uno strato isolante e da una schermatura metallica;
- più resistente alle interferenze rispetto al semplice doppino;
- storicamente usato per la TV via cavo e per le prime reti locali.

## Cavo Ethernet (doppino intrecciato, es. cat.5e / cat.6)

- coppie di fili in rame **intrecciate tra loro** (*twisted pair*), proprio per ridurre le interferenze reciproche tra le coppie (fenomeno noto come **diafonia**, o *crosstalk*);
- è il cavo usato oggi nelle reti locali (LAN) di case, scuole e uffici;
- le categorie più recenti (cat.6, cat.6a, cat.8) supportano velocità sempre più elevate su distanze via via più corte.

## Fibra ottica

- trasmette dati sotto forma di **impulsi luminosi** attraverso sottilissimi filamenti di vetro o plastica, invece che come segnali elettrici;
- velocità **altissime**, bassissima attenuazione sulle lunghe distanze, e **immunità totale alle interferenze elettromagnetiche** (la luce non è influenzata dai campi elettrici o magnetici circostanti);
- è la tecnologia alla base delle moderne dorsali intercontinentali di Internet (i cavi sottomarini citati nel Modulo 1) e delle connessioni domestiche **FTTH** (*Fiber To The Home*), che vedremo nel Modulo 4.

```text
MEZZI TRASMISSIVI GUIDATI (cablati)
│
├── Doppino telefonico (cavo in rame)
├── Cavo coassiale
├── Cavo Ethernet, doppino intrecciato (cat.5e / cat.6 / cat.8)
└── Fibra ottica
```

> 💡 **Approfondimento**
>
> Perché la fibra ottica è così veloce e affidabile? A differenza del rame, dove il segnale è una corrente elettrica soggetta a resistenza e a interferenze, nella fibra il segnale è **luce**, che si propaga con perdite minime anche per centinaia di chilometri prima di dover essere "rigenerata" da un ripetitore. È per questo che i cavi sottomarini che collegano i continenti sono, oggi, quasi esclusivamente in fibra ottica.

> ⚠️ **Attenzione**
>
> Non confondere il **mezzo trasmissivo** (il "tubo" fisico o l'aria attraverso cui viaggiano i dati) con il **protocollo di comunicazione** (le "regole" che permettono a due dispositivi di capirsi). Il primo è hardware, il secondo è un insieme di regole software. Approfondiremo i protocolli nel Modulo 5.

---

<a id="sez-2-5"></a>
# 2.5 I mezzi trasmissivi non guidati (wireless)

[⬆ Torna all'indice del modulo](#indice-modulo)

Nei mezzi **non guidati**, il segnale non è incanalato in un supporto fisico, ma si propaga liberamente nello spazio sotto forma di onde elettromagnetiche.

## Onde radio

- utilizzate da **Wi-Fi**, **Bluetooth** e dalle reti mobili (**3G/4G/5G**);
- attraversano ostacoli come muri e pareti, anche se con attenuazione crescente;
- soggette a **interferenze** da parte di altri dispositivi che trasmettono sulla stessa frequenza (per esempio, molte reti Wi-Fi vicine tra loro, o un forno a microonde acceso in cucina).

## Microonde

- utilizzate per i **ponti radio** (collegamenti punto-punto tra antenne che si "vedono" a vista) e per le comunicazioni **satellitari**;
- richiedono che le antenne siano orientate reciprocamente, senza ostacoli lungo il percorso;
- i satelliti geostazionari orbitano a circa **35.786 km** di quota, mentre le costellazioni di satelliti in **orbita bassa** (LEO, *Low Earth Orbit* — come quella del servizio Starlink) orbitano a poche centinaia di chilometri, riducendo drasticamente i tempi di latenza rispetto ai satelliti geostazionari tradizionali.

## Infrarossi

- utilizzati per comunicazioni a **brevissima distanza** e in linea d'aria diretta (es. telecomandi, alcuni mouse e tastiere di vecchia generazione);
- non attraversano ostacoli solidi: basta un oggetto tra il trasmettitore e il ricevitore per interrompere la comunicazione.

```text
MEZZI TRASMISSIVI NON GUIDATI (wireless)
│
├── Onde radio (Wi-Fi, Bluetooth, reti mobili 3G/4G/5G)
├── Microonde (ponti radio, satelliti GEO e LEO)
└── Infrarossi (telecomandi, comunicazioni a corto raggio)
```

> ⚠️ **Attenzione**
>
> La comodità dei mezzi wireless ha anche un rovescio della medaglia: poiché il segnale si propaga liberamente nell'aria, chiunque si trovi entro il raggio d'azione può, in linea teorica, intercettarlo. Per questo le reti wireless devono sempre essere protette con protocolli di **cifratura** adeguati (come il WPA3 per il Wi-Fi), un tema che ritroveremo parlando di sicurezza online.

---

<a id="sez-2-6"></a>
# 2.6 Confronto tra i mezzi trasmissivi: banda, velocità, costo

[⬆ Torna all'indice del modulo](#indice-modulo)

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

<a id="lab-2-1"></a>
# 🐍 Laboratorio Python 2.1 — Calcoliamo i tempi di trasferimento dati

[⬆ Torna all'indice del modulo](#indice-modulo)

Mettiamo in pratica il concetto di banda calcolando quanto tempo impiega un file a essere trasferito su mezzi trasmissivi diversi, ricordando bene la differenza tra bit e byte vista poco fa.

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

<a id="lab-2-2"></a>
# 🐍 Laboratorio Python 2.2 — La latenza di propagazione del segnale

[⬆ Torna all'indice del modulo](#indice-modulo)

La banda non è tutto: anche se un canale è "largo" (molti bit al secondo), il segnale impiega comunque un po' di tempo a percorrere fisicamente la distanza tra mittente e destinatario. Questo tempo si chiama **latenza di propagazione**, e dipende dalla distanza percorsa e dalla velocità con cui il segnale si muove in quel particolare mezzo trasmissivo.

```python
# ============================================================
# ESERCIZIO 2.2 - La latenza di propagazione del segnale
# Obiettivo: confrontare, per mezzi trasmissivi diversi, il tempo
#            che il segnale impiega a "viaggiare" fisicamente da
#            un capo all'altro del canale (latenza di propagazione),
#            per capire perché una connessione satellitare, pur
#            offrendo banda elevata, può risultare più "lenta" di
#            una in fibra ottica per usi come le videochiamate.
# ============================================================

# Velocità approssimative di propagazione del segnale nei diversi mezzi.
# Nel vuoto/aria le onde elettromagnetiche viaggiano alla velocità
# della luce (~300.000 km/s); nella fibra ottica il segnale luminoso
# rallenta a causa dell'indice di rifrazione del vetro, viaggiando a
# circa i 2/3 della velocità della luce nel vuoto.
velocita_luce_vuoto_km_s = 300_000       # onde radio, microonde, satellite
velocita_segnale_fibra_km_s = 200_000    # fibra ottica (circa 0.67 x c)

def latenza_propagazione_ms(distanza_km, velocita_km_s):
    """Calcola la latenza di propagazione in millisecondi,
    dato un percorso di una certa lunghezza e la velocità del segnale."""
    tempo_secondi = distanza_km / velocita_km_s
    return tempo_secondi * 1000  # conversione in millisecondi


# Definiamo alcuni scenari di collegamento realistici, con la
# distanza approssimativa percorsa dal segnale (solo andata).
scenari = {
    "Fibra ottica, stessa città (~20 km)": (20, velocita_segnale_fibra_km_s),
    "Fibra ottica, Roma-Milano (~600 km)": (600, velocita_segnale_fibra_km_s),
    "Fibra ottica transatlantica (~8.000 km)": (8000, velocita_segnale_fibra_km_s),
    "Satellite geostazionario (~35.786 km di quota)": (35786, velocita_luce_vuoto_km_s),
}

print("Latenza di propagazione (sola andata) per scenario:\n")
for nome_scenario, (distanza, velocita) in scenari.items():
    latenza = latenza_propagazione_ms(distanza, velocita)
    print(f"  {nome_scenario:<45} -> {latenza:.1f} ms")

# Per una connessione satellitare il segnale deve percorrere il tragitto
# Terra-satellite due volte per ogni singolo invio (Terra -> satellite
# -> Terra), sia all'andata che al ritorno della risposta: calcoliamo
# quindi il "tempo di andata e ritorno" (RTT, Round-Trip Time) per il
# caso satellitare, spesso citato come causa dei ritardi percepiti
# nelle videochiamate via satellite geostazionario.
distanza_satellite, velocita_satellite = scenari["Satellite geostazionario (~35.786 km di quota)"]
rtt_satellite_ms = latenza_propagazione_ms(distanza_satellite, velocita_satellite) * 4
print(f"\nRTT stimato di un collegamento satellitare geostazionario: {rtt_satellite_ms:.0f} ms")

# Visualizziamo il confronto con un grafico a barre orizzontali.
import matplotlib.pyplot as plt

nomi = list(scenari.keys())
latenze = [latenza_propagazione_ms(d, v) for d, v in scenari.values()]

plt.figure(figsize=(10, 5))
plt.barh(nomi, latenze, color="cornflowerblue")
plt.xlabel("Latenza di propagazione, sola andata (millisecondi)")
plt.title("Confronto della latenza di propagazione tra mezzi trasmissivi")
plt.tight_layout()
plt.show()
```

> 💡 **Approfondimento**
>
> Nota un aspetto sorprendente: il segnale satellitare viaggia alla **velocità della luce nel vuoto**, più veloce di quello in fibra ottica (che è rallentato dal vetro). Eppure il collegamento satellitare risulta comunque **più lento**, perché la distanza da percorrere (decine di migliaia di km fino al satellite e ritorno) è enormemente maggiore di quella di un cavo terrestre. È un ottimo esempio di come, in informatica, **la distanza fisica conti quanto la velocità del segnale**: proprio per questo motivo le moderne costellazioni di satelliti in orbita bassa (LEO), molto più vicine alla Terra, riducono drasticamente la latenza rispetto ai satelliti geostazionari tradizionali.

**Prova tu!** Aggiungi allo scenario un collegamento satellitare LEO a circa 550 km di quota (l'altitudine tipica delle costellazioni di satelliti in orbita bassa) e confronta la latenza ottenuta con quella del satellite geostazionario.

---

<a id="sez-2-7"></a>
# 2.7 Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|----------|-------------|
| **Canale di comunicazione** | Mezzo attraverso cui viaggiano le informazioni tra mittente e destinatario |
| **Comunicazione sincrona** | Scambio di informazioni in tempo reale |
| **Comunicazione asincrona** | Scambio di informazioni non in tempo reale |
| **Simplex** | Trasmissione dati in una sola direzione |
| **Half-duplex** | Trasmissione dati in entrambe le direzioni, ma non contemporaneamente |
| **Full-duplex** | Trasmissione dati in entrambe le direzioni contemporaneamente |
| **Mezzo guidato** | Mezzo trasmissivo fisico (cavo, fibra) |
| **Mezzo non guidato** | Mezzo trasmissivo senza supporto fisico (wireless) |
| **Diafonia (crosstalk)** | Interferenza reciproca tra coppie di fili adiacenti in un cavo |
| **Banda (bandwidth)** | Quantità massima di dati trasportabili da un canale nell'unità di tempo |
| **Bit / Byte** | Unità di misura dell'informazione digitale (1 Byte = 8 bit) |
| **Latenza di propagazione** | Tempo impiegato dal segnale per percorrere fisicamente il canale |
| **RTT (Round-Trip Time)** | Tempo di andata e ritorno di un segnale tra mittente e destinatario |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo secondo modulo hai imparato:

- che cos'è un canale di comunicazione e i suoi elementi fondamentali, secondo il modello mittente-canale-destinatario;
- la differenza tra comunicazione sincrona e asincrona;
- la differenza tra le modalità di trasmissione simplex, half-duplex e full-duplex;
- quali sono i principali mezzi trasmissivi guidati (doppino, cavo coassiale, Ethernet, fibra ottica) e non guidati (onde radio, microonde, infrarossi);
- come confrontare i mezzi trasmissivi in base a velocità, costo e sensibilità alle interferenze;
- come calcolare in Python il tempo di trasferimento di un file e la latenza di propagazione del segnale su canali diversi.

Nel prossimo modulo scopriremo **come i dati vengono effettivamente rappresentati** all'interno di questi canali, distinguendo tra segnali analogici e digitali, e vedremo come i singoli dispositivi vengono collegati tra loro per formare una rete: è l'argomento del **Modulo 3 — Reti Analogiche e Digitali, Topologie di Rete**.

[⬆ Torna all'indice del modulo](#indice-modulo)