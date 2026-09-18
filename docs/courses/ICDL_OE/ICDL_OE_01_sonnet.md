# 🔵 MODULO 1 — Storia di Internet e la sua Evoluzione

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### ICDL Online Essentials · Percorso per il primo biennio (indirizzi LSA, RIM) · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [1.1 Che cos'è davvero Internet?](#sez-1-1)
2. [1.2 Le origini: ARPANET e la Guerra Fredda](#sez-1-2)
3. [1.3 Le tappe fondamentali dell'evoluzione di Internet](#sez-1-3)
4. [1.4 Dal Web statico al Web moderno: Web 1.0, 2.0 e 3.0](#sez-1-4)
5. [1.5 Internet in Italia](#sez-1-5)
6. [1.6 Chi "governa" davvero Internet?](#sez-1-6)
7. [🐍 Laboratorio Python 1.1 — Costruiamo una timeline di Internet](#lab-1-1)
8. [🐍 Laboratorio Python 1.2 — La crescita esplosiva degli utenti Internet](#lab-1-2)
9. [1.7 Glossario del modulo](#sez-1-7)
10. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- spiegare che cos'è davvero Internet e perché si chiama "rete di reti";
- conoscere le origini storiche di Internet, nate in piena Guerra Fredda;
- ricostruire le tappe fondamentali dell'evoluzione di Internet fino ad oggi;
- distinguere le fasi Web 1.0, Web 2.0 e Web 3.0;
- collocare la diffusione di Internet in Italia nel contesto storico;
- riconoscere quali organizzazioni internazionali contribuiscono a "governare" Internet, pur senza possederla;
- utilizzare Python per costruire e visualizzare una timeline storica e un grafico di crescita.

---

<a id="sez-1-1"></a>
# 1.1 Che cos'è davvero Internet?

[⬆ Torna all'indice del modulo](#indice-modulo)

Molte persone usano le parole "Internet" e "Web" come sinonimi, ma in realtà sono due cose diverse (lo vedremo bene nel **Modulo 6**, dedicato interamente al World Wide Web).

> **Definizione**
>
> **Internet** è un'enorme **rete di reti**: milioni di computer, server, smartphone e altri dispositivi sparsi in tutto il mondo, collegati tra loro tramite cavi, fibre ottiche e onde radio, capaci di scambiarsi dati seguendo regole comuni (i **protocolli**, che approfondiremo nel Modulo 5).

Immagina Internet come un gigantesco sistema stradale mondiale: ogni casa, scuola o ufficio è collegato a una strada locale, che si collega a strade più grandi, che a loro volta si collegano ad autostrade intercontinentali. Nessuno "possiede" tutta la rete: è un sistema **decentralizzato**, ed è proprio questa caratteristica ad averla resa così resistente e capace di crescere fino a diventare quello che conosciamo oggi.

## Una rete di reti, non un'unica grande rete

Il termine "Internet" nasce proprio dalla contrazione di **INTERconnected NETworks** ("reti interconnesse"). Non esiste, infatti, un'unica infrastruttura centrale: esistono migliaia di reti indipendenti — quella della tua scuola, quella del tuo operatore telefonico, quella di una grande azienda, quella di un governo — che si collegano tra loro attraverso punti di scambio (chiamati **IXP**, *Internet Exchange Point*) e dorsali internazionali in fibra ottica, spesso posate persino sul fondo degli oceani.

> 💡 **Approfondimento**
>
> Sapevi che gran parte del traffico Internet intercontinentale viaggia attraverso **cavi sottomarini in fibra ottica**? Ne esistono centinaia di migliaia di chilometri sul fondo degli oceani, che collegano fisicamente i continenti. Quando invii un messaggio a un amico dall'altra parte del mondo, è molto probabile che quel messaggio passi realmente attraverso uno di questi cavi, a profondità di migliaia di metri!

---

<a id="sez-1-2"></a>
# 1.2 Le origini: ARPANET e la Guerra Fredda

[⬆ Torna all'indice del modulo](#indice-modulo)

La storia di Internet inizia negli **Stati Uniti**, alla fine degli anni '50, in un contesto storico molto particolare: la **Guerra Fredda** tra Stati Uniti e Unione Sovietica.

## Perché nasce Internet?

Nel 1957 l'URSS lancia lo **Sputnik**, il primo satellite artificiale della storia. Gli Stati Uniti, colti di sorpresa, decidono di investire massicciamente nella ricerca tecnologica e militare, fondando nel 1958 l'agenzia **ARPA** (Advanced Research Projects Agency).

> 💡 **Approfondimento**
>
> Uno degli obiettivi (spesso citato, anche se in parte semplificato dalla divulgazione) era progettare una rete di comunicazione **decentralizzata**: se un nodo della rete fosse stato distrutto, le informazioni avrebbero comunque potuto raggiungere destinazione passando per un percorso alternativo. Questa idea di ridondanza è ancora oggi alla base del funzionamento di Internet.

## L'idea chiave: la commutazione di pacchetto

Alla base di questa visione c'è un'intuizione fondamentale, sviluppata in modo indipendente dal ricercatore statunitense **Paul Baran** e dal britannico **Donald Davies**: invece di stabilire un collegamento "dedicato" e continuo tra due punti (come avveniva con le tradizionali linee telefoniche), i dati potevano essere suddivisi in piccoli **pacchetti**, ciascuno instradato autonomamente verso la destinazione, anche seguendo percorsi diversi.

```text
Comunicazione telefonica tradizionale (commutazione di circuito)
Mittente ═══════════ linea dedicata e continua ═══════════ Destinatario

Comunicazione a pacchetto (Internet)
Mittente → [pacchetto 1] → percorso A → 
         → [pacchetto 2] → percorso B →  Destinatario (ricompone i pacchetti)
         → [pacchetto 3] → percorso A →
```

Questa idea — la **commutazione di pacchetto** (*packet switching*) — è tuttora il principio su cui si basa il funzionamento di Internet, e la ritroveremo in dettaglio quando parleremo del protocollo IP nel Modulo 5.

## Nasce ARPANET (1969)

Il **29 ottobre 1969** viene trasmesso il primo messaggio tra due computer collegati in rete: uno all'**Università della California, Los Angeles (UCLA)** e uno allo **Stanford Research Institute**. Nasce **ARPANET**, la rete che possiamo considerare la progenitrice di Internet.

```text
1969 — ARPANET
┌─────────────┐        collegamento        ┌──────────────────┐
│    UCLA     │ ◄─────────────────────────► │  Stanford (SRI)   │
└─────────────┘                             └──────────────────┘
```

> ⚠️ **Attenzione**
>
> Un aneddoto molto citato racconta che il primissimo messaggio inviato doveva essere la parola "LOGIN", ma il sistema si bloccò dopo la trasmissione delle prime due lettere: "**LO**". In un certo senso, il primissimo "messaggio" della storia di Internet fu, per un curioso scherzo del destino, la parola "LO" — come in "Lo and behold" ("Ed ecco che..."). Poche ore dopo, il collegamento completo venne comunque stabilito con successo.

Entro la fine del 1969, altri due nodi si aggiunsero alla rete (Università della California a Santa Barbara e Università dello Utah), dando il via a una crescita che, con il senno di poi, si sarebbe rivelata inarrestabile.

---

<a id="sez-1-3"></a>
# 1.3 Le tappe fondamentali dell'evoluzione di Internet

[⬆ Torna all'indice del modulo](#indice-modulo)

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
| **2019-2022** | Diffusione su larga scala del **5G** e generalizzazione dello smart working |
| **2022-2026** | Diffusione dell'AI generativa integrata nei browser e nei motori di ricerca |

> ⚠️ **Attenzione**
>
> Un errore comune è pensare che Internet sia nata "già finita" negli anni '90. In realtà Internet è un sistema **in continua evoluzione**: nuovi protocolli, nuove tecnologie di connessione e nuovi utilizzi vengono introdotti ogni anno.

---

<a id="sez-1-4"></a>
# 1.4 Dal Web statico al Web moderno: Web 1.0, 2.0 e 3.0

[⬆ Torna all'indice del modulo](#indice-modulo)

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

> 💡 **Approfondimento**
>
> Questa suddivisione in "fasi" è un modello divulgativo utile per capire l'evoluzione del Web, ma non ha confini netti e universalmente condivisi tra gli esperti: molti siti Web 1.0 sono tuttora online, e alcune caratteristiche del "Web 3.0" sono ancora oggetto di dibattito. È più corretto pensarle come **tendenze prevalenti** di ciascuna epoca, piuttosto che come categorie rigide.

---

<a id="sez-1-5"></a>
# 1.5 Internet in Italia

[⬆ Torna all'indice del modulo](#indice-modulo)

- **1986**: primo collegamento italiano a Internet, realizzato dal **CNUCE-CNR di Pisa**;
- **1987**: viene registrato `.it`, il dominio nazionale di primo livello italiano;
- **anni '90**: diffusione dei primi provider italiani e delle connessioni via modem;
- **anni 2000**: arrivo dell'**ADSL** nelle case degli italiani (ne parleremo nel Modulo 4);
- **anni 2010-2020**: diffusione della **fibra ottica** e del **4G/5G**;
- **oggi**: il **Registro.it**, gestito dall'Istituto di Informatica e Telematica del CNR di Pisa, è l'ente responsabile dell'assegnazione dei domini `.it`.

---

<a id="sez-1-6"></a>
# 1.6 Chi "governa" davvero Internet?

[⬆ Torna all'indice del modulo](#indice-modulo)

Se Internet non appartiene a nessuno, chi decide le regole tecniche che permettono a miliardi di dispositivi diversi di "parlare la stessa lingua"? La risposta è: nessun singolo governo o azienda, ma una rete di **organizzazioni internazionali no-profit**, che lavorano per mantenere Internet aperta, interoperabile e funzionante.

| Organizzazione | Ruolo |
|------------------|-------|
| **ICANN** (Internet Corporation for Assigned Names and Numbers) | Coordina l'assegnazione dei nomi a dominio e degli indirizzi IP a livello globale |
| **IETF** (Internet Engineering Task Force) | Sviluppa e standardizza i protocolli tecnici di Internet (come il TCP/IP) |
| **W3C** (World Wide Web Consortium) | Definisce gli standard del World Wide Web, come HTML e CSS (fondato dallo stesso Tim Berners-Lee) |
| **Internet Society (ISOC)** | Promuove lo sviluppo aperto di Internet a livello mondiale |

> 💡 **Approfondimento**
>
> Questo modello di governance "distribuita" e basata sul consenso tecnico, piuttosto che su un'autorità centrale unica, è uno dei motivi per cui Internet è riuscita a rimanere una rete **globale e aperta** per oltre cinquant'anni, pur attraversando enormi cambiamenti tecnologici, politici e sociali.

---

<a id="lab-1-1"></a>
# 🐍 Laboratorio Python 1.1 — Costruiamo una timeline di Internet

[⬆ Torna all'indice del modulo](#indice-modulo)

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
    (2019, "Diffusione del 5G"),
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

<a id="lab-1-2"></a>
# 🐍 Laboratorio Python 1.2 — La crescita esplosiva degli utenti Internet

[⬆ Torna all'indice del modulo](#indice-modulo)

I numeri raccontano meglio di ogni parola quanto Internet sia cresciuta negli ultimi trent'anni. In questo secondo laboratorio visualizziamo la crescita del numero di utenti Internet nel mondo, da poche migliaia di ricercatori a miliardi di persone connesse.

```python
# ============================================================
# ESERCIZIO 1.2 - La crescita degli utenti Internet nel mondo
# Obiettivo: visualizzare, con un grafico a linee, la crescita
#            del numero di utenti Internet nel mondo dal 1995
#            a oggi, per comprendere visivamente la portata
#            del fenomeno di cui abbiamo studiato la storia.
# ============================================================

import matplotlib.pyplot as plt

# Dati approssimativi e a scopo puramente didattico sul numero
# di utenti Internet nel mondo (in miliardi di persone), basati
# su stime storiche di diffusione della rete.
anni_crescita = [1995, 2000, 2005, 2010, 2015, 2020, 2023, 2026]
utenti_miliardi = [0.04, 0.36, 1.02, 2.02, 3.20, 4.66, 5.35, 5.80]

fig, ax = plt.subplots(figsize=(10, 5))

# Disegniamo un grafico a linee con marcatori sui singoli punti,
# così da evidenziare sia l'andamento generale sia i valori esatti
# negli anni che abbiamo scelto di rappresentare.
ax.plot(anni_crescita, utenti_miliardi, marker="o", color="darkorange", linewidth=2)

# Coloriamo l'area sotto la curva per rendere ancora più evidente,
# a colpo d'occhio, la crescita nel tempo.
ax.fill_between(anni_crescita, utenti_miliardi, color="moccasin", alpha=0.5)

ax.set_title("Crescita del numero di utenti Internet nel mondo", fontsize=13, fontweight="bold")
ax.set_xlabel("Anno")
ax.set_ylabel("Utenti Internet (miliardi di persone)")
ax.grid(axis="y", linestyle="--", alpha=0.5)

plt.tight_layout()
plt.show()

# Calcoliamo anche di quante volte è cresciuto il numero di utenti
# tra il primo e l'ultimo anno della nostra serie storica.
crescita_totale = utenti_miliardi[-1] / utenti_miliardi[0]
print(f"Tra il {anni_crescita[0]} e il {anni_crescita[-1]}, il numero di utenti Internet")
print(f"nel mondo è cresciuto di circa {crescita_totale:.0f} volte!")
```

> 💡 **Approfondimento**
>
> Un grafico come questo aiuta a capire perché i protocolli e le infrastrutture che studieremo nei prossimi moduli devono essere progettati per **scalare**: un sistema pensato per poche migliaia di ricercatori negli anni '70 doveva essere in grado di sostenere, decenni dopo, miliardi di dispositivi connessi contemporaneamente.

**Prova tu!** Prova a calcolare, modificando il codice, la crescita percentuale media annua tra due anni della serie a tua scelta.

---

<a id="sez-1-7"></a>
# 1.7 Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|----------|-------------|
| **Internet** | Rete mondiale di reti di computer interconnesse |
| **ARPANET** | Prima rete a commutazione di pacchetto, antenata di Internet |
| **ARPA** | Agenzia statunitense che finanziò la nascita di ARPANET |
| **Commutazione di pacchetto** | Tecnica di trasmissione che suddivide i dati in piccoli pacchetti instradati indipendentemente |
| **TCP/IP** | Insieme di protocolli che regolano la trasmissione dei dati su Internet |
| **World Wide Web** | Sistema di documenti ipertestuali collegati tra loro, accessibile tramite Internet |
| **Web 1.0 / 2.0 / 3.0** | Le tre grandi fasi evolutive del Web |
| **Provider (ISP)** | Fornitore del servizio di accesso a Internet |
| **IXP** | Internet Exchange Point, punto di scambio dati tra reti diverse |
| **ICANN** | Organizzazione che coordina nomi a dominio e indirizzi IP a livello globale |
| **IETF** | Organizzazione che sviluppa gli standard tecnici di Internet |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo primo modulo hai scoperto:

- che cos'è davvero Internet e perché è definita "rete di reti";
- il contesto storico e militare in cui nasce ARPANET nel 1969, e il principio della commutazione di pacchetto;
- le tappe fondamentali che hanno portato Internet a diventare quella che conosciamo oggi;
- l'evoluzione dal Web statico (1.0) al Web collaborativo (2.0) fino al Web intelligente (3.0);
- i momenti chiave della diffusione di Internet in Italia;
- quali organizzazioni internazionali contribuiscono a "governare" Internet senza possederla;
- come rappresentare graficamente una timeline storica e un grafico di crescita con Python.

Ora che conosci la storia di Internet, sei pronto per scoprire **come viaggiano realmente le informazioni** attraverso i canali di comunicazione e i mezzi trasmissivi: è l'argomento del **Modulo 2 — Canali di Comunicazione e Mezzi Trasmissivi**.

[⬆ Torna all'indice del modulo](#indice-modulo)