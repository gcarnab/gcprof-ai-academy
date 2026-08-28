# 🟡 MODULO 4 — La Connessione a Internet: dal Modem all'ADSL e Oltre

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### ICDL Online Essentials · Percorso per il primo biennio (indirizzi LSA, RIM) · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [4.1 Cosa serve per collegarsi a Internet?](#sez-4-1)
2. [4.2 Il modem: modulazione e demodulazione](#sez-4-2)
3. [4.3 Dalla linea telefonica all'ADSL](#sez-4-3)
4. [4.4 Fibra ottica e connessioni mobili](#sez-4-4)
5. [4.5 Come si misura la velocità di una connessione](#sez-4-5)
6. [4.6 Come scegliere (e capire) un'offerta di connessione](#sez-4-6)
7. [🐍 Laboratorio Python 4.1 — Confrontiamo le tecnologie di connessione](#lab-4-1)
8. [🐍 Laboratorio Python 4.2 — Un mini test di velocità simulato](#lab-4-2)
9. [4.7 Glossario del modulo](#sez-4-7)
10. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- elencare gli elementi necessari per collegarsi a Internet;
- spiegare il funzionamento del modem e i concetti di modulazione/demodulazione;
- descrivere l'evoluzione dalla connessione telefonica all'ADSL, fino alla fibra ottica;
- distinguere le tecnologie di connessione mobile (3G, 4G, 5G);
- comprendere come si misura la velocità di una connessione;
- leggere criticamente un'offerta commerciale di connessione Internet;
- utilizzare Python per confrontare i tempi di connessione tra tecnologie diverse e per simulare un piccolo test di velocità.

---

<a id="sez-4-1"></a>
# 4.1 Cosa serve per collegarsi a Internet?

[⬆ Torna all'indice del modulo](#indice-modulo)

Per connettere un dispositivo a Internet servono generalmente:

1. un **dispositivo** (computer, smartphone, tablet...);
2. un **modem/router**, che fa da "ponte" tra la rete domestica e la rete del fornitore;
3. un **contratto con un fornitore di connettività**, detto **ISP** (Internet Service Provider), come le compagnie telefoniche che offrono abbonamenti Internet;
4. un **mezzo trasmissivo** che collega la nostra abitazione alla rete dell'ISP (cavo telefonico, fibra ottica, onde radio...).

> 💡 **Approfondimento**
>
> Ricollegandoci al Modulo 3: il **router** di casa tua è, allo stesso tempo, il nodo centrale della tua rete locale a topologia stella (a cui sono collegati i tuoi dispositivi) e il punto di ingresso verso la rete, molto più grande, del tuo ISP. È l'esempio perfetto di come le reti reali colleghino topologie diverse tra loro su scale diverse.

---

<a id="sez-4-2"></a>
# 4.2 Il modem: modulazione e demodulazione

[⬆ Torna all'indice del modulo](#indice-modulo)

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

<a id="sez-4-3"></a>
# 4.3 Dalla linea telefonica all'ADSL

[⬆ Torna all'indice del modulo](#indice-modulo)

## Il modem dial-up (anni '90)

Le prime connessioni domestiche a Internet avvenivano tramite **modem dial-up**: il computer "chiamava" letteralmente un numero di telefono del provider, occupando l'intera linea telefonica (non si poteva navigare e telefonare insieme!) con velocità massime di circa **56 kbit/s**.

## L'ADSL (Asymmetric Digital Subscriber Line)

Introdotta in Italia agli inizi degli anni 2000, l'**ADSL** ha rivoluzionato l'accesso a Internet, sfruttando la stessa linea telefonica in rame ma con una tecnologia che permette di:

- navigare e telefonare **contemporaneamente**, perché voce e dati viaggiano su bande di frequenza diverse dello stesso cavo;
- raggiungere velocità molto più elevate rispetto al dial-up (fino a circa 20 Mbit/s in download).

> **Perché "Asimmetrica"?**
>
> La "A" di ADSL sta per **Asymmetric**: la velocità di **download** (dati che arrivano verso di noi) è molto più alta della velocità di **upload** (dati che inviamo noi). Questo perché la maggior parte degli utenti scarica molti più dati di quanti ne invii (pagine web, video, file), quindi ha senso privilegiare il download.

## Il "gradino intermedio": il VDSL

Prima di arrivare alla fibra ottica pura, molte case italiane sono passate per una tecnologia intermedia: il **VDSL** (Very high-bit-rate DSL). Funziona in modo simile all'ADSL, sfruttando l'ultimo tratto di cavo in rame verso casa, ma è pensata per operare su distanze più brevi dalla centrale, raggiungendo velocità nettamente superiori (fino a circa 100 Mbit/s). È la tecnologia tipicamente usata nelle connessioni **FTTC**, che vedremo nel prossimo paragrafo.

---

<a id="sez-4-4"></a>
# 4.4 Fibra ottica e connessioni mobili

[⬆ Torna all'indice del modulo](#indice-modulo)

## Fibra ottica: FTTC e FTTH

| Sigla | Significato | Descrizione |
|-------|--------------|-------------|
| **FTTC** | Fiber To The Cabinet | La fibra ottica arriva fino all'armadio stradale, poi l'ultimo tratto verso casa resta in rame (tramite VDSL) |
| **FTTH** | Fiber To The Home | La fibra ottica arriva **direttamente dentro casa**, offrendo le massime prestazioni |

```text
FTTC:  Centrale ══fibra══► Armadio stradale ──rame (VDSL)──► Casa
FTTH:  Centrale ══════════════fibra ottica═══════════════════► Casa
```

> ⚠️ **Attenzione**
>
> Molte offerte commerciali usano genericamente la parola "fibra" anche per connessioni **FTTC**, che in realtà percorrono l'ultimo tratto verso casa ancora su cavo in rame: le prestazioni reali possono quindi variare molto a seconda che si tratti di FTTC o FTTH. Vale sempre la pena verificare quale delle due tecnologie sia effettivamente disponibile al proprio indirizzo.

## Connessioni mobili: 3G, 4G, 5G

| Generazione | Periodo di diffusione | Velocità indicativa | Utilizzo tipico |
|--------------|------------------------|----------------------|-------------------|
| **3G** | Anni 2000-2010 | ~2 Mbit/s | Prime navigazioni web da smartphone |
| **4G / 4G LTE** | Dal 2010 | 20-100 Mbit/s | Streaming video, social, videochiamate |
| **5G** | Dal 2019 | Centinaia di Mbit/s - oltre 1 Gbit/s | Realtà aumentata, IoT, bassissima latenza |

---

<a id="sez-4-5"></a>
# 4.5 Come si misura la velocità di una connessione

[⬆ Torna all'indice del modulo](#indice-modulo)

Ogni connessione Internet si misura principalmente in base a tre parametri:

- **Velocità di download**: quanto velocemente riceviamo dati (es. guardare un video);
- **Velocità di upload**: quanto velocemente inviamo dati (es. caricare un video su YouTube);
- **Latenza (ping)**: il tempo che un dato impiega per andare dal nostro dispositivo a un server e tornare indietro, misurato in millisecondi (ms). Una bassa latenza è fondamentale per attività "in tempo reale" come i videogiochi online.

> ⚠️ **Attenzione**
>
> Una connessione può avere una velocità di download altissima ma una **latenza elevata** (ad esempio nelle connessioni satellitari): per attività come i videogiochi online, spesso la latenza è più importante della semplice velocità massima!

---

<a id="sez-4-6"></a>
# 4.6 Come scegliere (e capire) un'offerta di connessione

[⬆ Torna all'indice del modulo](#indice-modulo)

Quando si confrontano più offerte commerciali di connessione Internet, conviene guardare oltre il semplice "numero grande" pubblicizzato:

- **"Fino a" quanti Mbps?**: quasi tutte le offerte riportano una velocità **massima teorica**, non garantita (ricordi il paragrafo 2.6 del Modulo 2 sulla differenza tra banda teorica e reale?);
- **Tecnologia effettivamente disponibile**: allo stesso indirizzo, "fibra" può significare FTTH (ottime prestazioni) o FTTC (prestazioni intermedie, dipendenti dalla distanza dall'armadio stradale);
- **Velocità di upload**, spesso trascurata nelle pubblicità ma importante se si caricano spesso file, si fanno videochiamate di lavoro o si trasmette in streaming;
- **Eventuali limiti di soglia dati** (soprattutto per le connessioni mobili), oltre i quali la velocità può essere ridotta;
- **Presenza di un contratto SLA** (Service Level Agreement) con garanzie minime di velocità, tipico delle offerte business più che di quelle consumer.

> 💡 **Approfondimento**
>
> Un buon esercizio pratico prima di sottoscrivere un abbonamento è verificare, tramite gli strumenti messi a disposizione dagli operatori o da enti indipendenti, quale tecnologia (ADSL, FTTC, FTTH) è realmente disponibile al proprio indirizzo: la stessa offerta commerciale, allo stesso prezzo, può garantire prestazioni molto diverse da zona a zona.

---

<a id="lab-4-1"></a>
# 🐍 Laboratorio Python 4.1 — Confrontiamo le tecnologie di connessione

[⬆ Torna all'indice del modulo](#indice-modulo)

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
    "FTTC (fibra mista rame/VDSL)": 100,
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

    print(f"  {tecnologia:<30} ({velocita:>7} Mbit/s) -> {testo_tempo}")

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

<a id="lab-4-2"></a>
# 🐍 Laboratorio Python 4.2 — Un mini test di velocità simulato

[⬆ Torna all'indice del modulo](#indice-modulo)

I test di velocità online che conosci (come Speedtest) misurano contemporaneamente **tre** parametri: download, upload e latenza. Simuliamo un piccolo "report" di questo tipo per confrontare più tecnologie su tutti e tre gli assi contemporaneamente, non solo sul download.

```python
# ============================================================
# ESERCIZIO 4.2 - Mini test di velocità simulato
# Obiettivo: confrontare diverse tecnologie di connessione su
#            tre parametri contemporaneamente (download, upload,
#            latenza), per capire perché la "velocità" di una
#            connessione non è un singolo numero, ma un insieme
#            di caratteristiche diverse.
# ============================================================

import matplotlib.pyplot as plt

# Dati indicativi (a scopo didattico) di download (Mbps), upload (Mbps)
# e latenza media (millisecondi) per alcune tecnologie di connessione.
report_connessioni = {
    "ADSL":   {"download": 20,   "upload": 1,    "latenza_ms": 30},
    "FTTC":   {"download": 100,  "upload": 20,   "latenza_ms": 20},
    "FTTH":   {"download": 1000, "upload": 300,  "latenza_ms": 5},
    "4G LTE": {"download": 60,   "upload": 15,   "latenza_ms": 40},
    "5G":     {"download": 1000, "upload": 100,  "latenza_ms": 10},
}

def stampa_report(nome_tecnologia, dati):
    """Stampa un piccolo 'referto' testuale simile a quello di un vero test di velocità."""
    print(f"--- Test di velocità simulato: {nome_tecnologia} ---")
    print(f"  Download : {dati['download']:>6} Mbps")
    print(f"  Upload   : {dati['upload']:>6} Mbps")
    print(f"  Latenza  : {dati['latenza_ms']:>6} ms\n")

for tecnologia, dati in report_connessioni.items():
    stampa_report(tecnologia, dati)

# Visualizziamo i tre parametri fianco a fianco con tre grafici a barre distinti,
# perché hanno unità di misura diverse e non avrebbe senso sovrapporli
# in un unico grafico.
fig, (ax_download, ax_upload, ax_latenza) = plt.subplots(1, 3, figsize=(15, 5))

tecnologie = list(report_connessioni.keys())

ax_download.bar(tecnologie, [d["download"] for d in report_connessioni.values()], color="seagreen")
ax_download.set_title("Download (Mbps)")
ax_download.tick_params(axis="x", rotation=30)

ax_upload.bar(tecnologie, [d["upload"] for d in report_connessioni.values()], color="steelblue")
ax_upload.set_title("Upload (Mbps)")
ax_upload.tick_params(axis="x", rotation=30)

# Per la latenza, un valore PIÙ BASSO è migliore: lo evidenziamo in un colore diverso.
ax_latenza.bar(tecnologie, [d["latenza_ms"] for d in report_connessioni.values()], color="crimson")
ax_latenza.set_title("Latenza (ms) — più basso è meglio")
ax_latenza.tick_params(axis="x", rotation=30)

plt.suptitle("Confronto completo tra tecnologie di connessione", fontsize=13, fontweight="bold")
plt.tight_layout()
plt.show()
```

> 💡 **Approfondimento**
>
> Osserva come **FTTH** e **5G** abbiano lo stesso identico valore di download nel nostro esempio, ma differiscano molto in upload e soprattutto in latenza: è un ottimo promemoria del fatto che, per scegliere la connessione più adatta al proprio uso (streaming, videogiochi online, videochiamate di lavoro), serve guardare **tutti** i parametri insieme, non solo il numero più pubblicizzato.

**Prova tu!** Aggiungi al dizionario `report_connessioni` i dati reali della tua connessione di casa (puoi ricavarli da un test di velocità online) e confrontali con le tecnologie di questo esempio.

---

<a id="sez-4-7"></a>
# 4.7 Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|----------|-------------|
| **ISP** | Internet Service Provider, fornitore dell'accesso a Internet |
| **Modem** | Dispositivo che modula/demodula il segnale tra digitale e analogico |
| **ADSL** | Tecnologia di connessione a banda larga su linea telefonica tradizionale |
| **VDSL** | Evoluzione dell'ADSL su brevi distanze, tipica delle connessioni FTTC |
| **FTTC / FTTH** | Tecnologie di connessione in fibra ottica, parziale o completa |
| **Download / Upload** | Velocità di ricezione / invio dei dati |
| **Latenza (ping)** | Tempo di andata e ritorno di un dato tra dispositivo e server |
| **3G / 4G / 5G** | Generazioni successive di reti di connessione mobile |
| **SLA** | Service Level Agreement, garanzie contrattuali minime sulle prestazioni di una connessione |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo hai imparato:

- quali elementi servono per collegare un dispositivo a Internet;
- come funziona un modem attraverso la modulazione e demodulazione del segnale;
- l'evoluzione storica dal modem dial-up all'ADSL e al VDSL, fino alla fibra ottica (FTTC e FTTH);
- le differenze tra le generazioni di connessione mobile 3G, 4G e 5G;
- come si misura la qualità di una connessione (download, upload, latenza);
- come leggere criticamente un'offerta commerciale di connessione Internet;
- come confrontare in Python i tempi di download su tecnologie di connessione diverse e come simulare un report completo di download, upload e latenza.

Ora che sai come i dispositivi si collegano fisicamente a Internet, è il momento di scoprire **le regole** che permettono a due computer di "capirsi" e scambiarsi dati correttamente: è l'argomento del **Modulo 5 — Il Modello Client-Server e i Protocolli di Comunicazione**.

[⬆ Torna all'indice del modulo](#indice-modulo)