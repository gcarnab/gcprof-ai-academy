# 🟣 MODULO 3 — Reti Analogiche e Digitali, Topologie di Rete

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### ICDL Online Essentials · Percorso per il primo biennio (indirizzi LSA, RIM) · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [3.1 Segnali analogici e segnali digitali](#sez-3-1)
2. [3.2 Dall'analogico al digitale: campionamento e quantizzazione](#sez-3-2)
3. [3.3 Classificazione delle reti per estensione geografica](#sez-3-3)
4. [3.4 Le topologie di rete](#sez-3-4)
5. [3.5 I dispositivi di interconnessione: hub, switch, router, access point](#sez-3-5)
6. [🐍 Laboratorio Python 3.1 — Simuliamo campionamento e quantizzazione](#lab-3-1)
7. [🐍 Laboratorio Python 3.2 — Disegniamo le topologie di rete](#lab-3-2)
8. [🐍 Laboratorio Python 3.3 — Quanti cavi servono? La scalabilità delle topologie](#lab-3-3)
9. [3.6 Glossario del modulo](#sez-3-6)
10. [Riepilogo del modulo](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- distinguere un segnale analogico da un segnale digitale;
- comprendere i concetti di campionamento e quantizzazione;
- classificare le reti in base alla loro estensione geografica (PAN, LAN, MAN, WAN);
- riconoscere le principali topologie di rete (bus, stella, anello, magliata);
- distinguere i principali dispositivi di interconnessione di una rete (hub, switch, router, access point);
- simulare con Python la conversione di un segnale analogico in digitale e confrontare la scalabilità delle topologie di rete.

---

<a id="sez-3-1"></a>
# 3.1 Segnali analogici e segnali digitali

[⬆ Torna all'indice del modulo](#indice-modulo)

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
- gli stessi dispositivi digitali possono gestire testo, audio, immagini e video con lo stesso linguaggio binario;
- i segnali digitali possono essere **rigenerati perfettamente** durante il trasporto: un ripetitore digitale, a differenza di uno analogico, non amplifica anche il "rumore" accumulato lungo il percorso, ma ricostruisce il segnale originale da zero.

> 💡 **Approfondimento**
>
> Immagina di fotocopiare più volte lo stesso foglio, ogni volta partendo dalla copia precedente: con un documento **analogico** (una fotografia, un disegno a mano), ogni copia perde qualità rispetto all'originale. Con un documento **digitale** (un file di testo), invece, la millesima copia è **identica** alla prima, perché ogni bit può essere ricopiato con precisione assoluta. È lo stesso principio per cui un file musicale digitale non "si consuma" per quanto venga ascoltato o ricopiato.

---

<a id="sez-3-2"></a>
# 3.2 Dall'analogico al digitale: campionamento e quantizzazione

[⬆ Torna all'indice del modulo](#indice-modulo)

Per trasformare un segnale analogico (come il suono) in un segnale digitale si usano due operazioni fondamentali:

1. **Campionamento (sampling)**: si "fotografa" il valore del segnale a intervalli di tempo regolari;
2. **Quantizzazione**: ogni valore campionato viene approssimato al livello discreto più vicino, disponibile nella rappresentazione digitale.

> 💡 **Approfondimento**
>
> Questo è esattamente il principio su cui si basa la qualità dell'audio digitale: un file musicale campionato a 44.100 Hz (come un CD audio) "fotografa" l'onda sonora 44.100 volte al secondo! Più il campionamento è frequente, più la ricostruzione digitale sarà fedele all'originale analogico.

## Quanti bit servono per ogni "fotografia"?

Il numero di livelli disponibili nella quantizzazione dipende da quanti **bit** dedichiamo a ciascun campione. Con *n* bit possiamo rappresentare $2^n$ livelli distinti.

| Bit per campione | Livelli disponibili | Esempio d'uso |
|--------------------|------------------------|----------------|
| 1 bit | 2 livelli | Segnale binario elementare (acceso/spento) |
| 8 bit | 256 livelli | Audio telefonico a bassa qualità |
| 16 bit | 65.536 livelli | Audio CD, qualità "da studio" |
| 24 bit | oltre 16 milioni di livelli | Audio professionale ad altissima fedeltà |

> ⚠️ **Attenzione**
>
> Un errore comune è pensare che "più campionamento" e "più quantizzazione" siano la stessa cosa: il **campionamento** riguarda **quante volte al secondo** misuriamo il segnale (frequenza), mentre la **quantizzazione** riguarda **con quale precisione** rappresentiamo ciascuna misurazione (numero di bit). Servono entrambe per ottenere una buona conversione digitale.

---

<a id="sez-3-3"></a>
# 3.3 Classificazione delle reti per estensione geografica

[⬆ Torna all'indice del modulo](#indice-modulo)

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

> 💡 **Approfondimento**
>
> Internet può essere considerata la **WAN definitiva**: è, di fatto, l'unione di innumerevoli reti LAN, MAN e WAN più piccole, collegate tra loro. La tua scuola, ad esempio, ha una propria LAN interna che, tramite un router, si collega alla WAN del suo provider, che a sua volta si collega alla "rete di reti" globale.

---

<a id="sez-3-4"></a>
# 3.4 Le topologie di rete

[⬆ Torna all'indice del modulo](#indice-modulo)

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

<a id="sez-3-5"></a>
# 3.5 I dispositivi di interconnessione: hub, switch, router, access point

[⬆ Torna all'indice del modulo](#indice-modulo)

Le topologie che abbiamo appena visto prendono vita grazie a dispositivi fisici specifici, che svolgono ruoli diversi all'interno della rete.

## Hub

Il dispositivo più semplice ed elementare: riceve un segnale su una porta e lo **ripete su tutte le altre porte**, senza alcuna "intelligenza". Oggi è quasi completamente in disuso, sostituito dallo switch.

## Switch

Collega tra loro più dispositivi all'interno di una stessa rete locale (LAN), ma a differenza dell'hub è "intelligente": riconosce a quale porta è collegato ciascun dispositivo e invia i dati **solo** al destinatario corretto, riducendo il traffico inutile. È il dispositivo al centro di una tipica topologia a stella cablata.

## Router

Collega **reti diverse** tra loro (ad esempio la tua rete domestica con la rete del tuo provider Internet), scegliendo il percorso migliore per instradare i dati da una rete all'altra. È il dispositivo che, tipicamente, permette a tutta la tua casa di condividere un'unica connessione a Internet.

## Access Point (AP)

Permette a dispositivi Wi-Fi di collegarsi a una rete cablata esistente, facendo da "ponte" tra il mondo wireless e quello via cavo. Nei router domestici moderni, switch, router e access point sono spesso **integrati in un unico apparecchio**.

```text
Internet
   │
 ROUTER  ── funge anche da ACCESS POINT (Wi-Fi) ──►  📱 💻 (dispositivi wireless)
   │
 SWITCH interno
   │
   ├── 🖥️ PC fisso (cavo Ethernet)
   └── 🖨️ Stampante di rete (cavo Ethernet)
```

> 💡 **Approfondimento**
>
> Quando guardi il "modem" che hai in casa, in realtà stai quasi sempre guardando un unico dispositivo che integra **modem + router + switch + access point** tutti insieme: ecco perché è comunemente (anche se impropriamente) chiamato "router Wi-Fi" o semplicemente "modem".

---

<a id="lab-3-1"></a>
# 🐍 Laboratorio Python 3.1 — Simuliamo campionamento e quantizzazione

[⬆ Torna all'indice del modulo](#indice-modulo)

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

<a id="lab-3-2"></a>
# 🐍 Laboratorio Python 3.2 — Disegniamo le topologie di rete

[⬆ Torna all'indice del modulo](#indice-modulo)

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

<a id="lab-3-3"></a>
# 🐍 Laboratorio Python 3.3 — Quanti cavi servono? La scalabilità delle topologie

[⬆ Torna all'indice del modulo](#indice-modulo)

Uno dei motivi per cui la topologia magliata è poco pratica su larga scala è puramente matematico: il numero di collegamenti necessari **cresce molto più velocemente** del numero di dispositivi. Calcoliamolo e visualizziamolo con Python.

```python
# ============================================================
# ESERCIZIO 3.3 - Scalabilità delle topologie di rete
# Obiettivo: calcolare, al crescere del numero di dispositivi,
#            quanti collegamenti fisici servono per realizzare
#            una topologia a bus, a stella e magliata, per
#            capire perché la topologia mesh è impraticabile
#            su reti di grandi dimensioni.
# ============================================================

import matplotlib.pyplot as plt

def collegamenti_bus(numero_nodi):
    """Nel bus, ogni nodo si collega con un solo cavo al bus centrale."""
    return numero_nodi

def collegamenti_stella(numero_nodi):
    """Nella stella, ogni nodo si collega con un solo cavo al nodo centrale."""
    return numero_nodi

def collegamenti_mesh(numero_nodi):
    """
    Nella topologia magliata, OGNI nodo è collegato a TUTTI gli altri.
    Il numero totale di collegamenti si calcola con la formula
    combinatoria n * (n - 1) / 2, cioè tutte le possibili coppie di nodi.
    """
    return numero_nodi * (numero_nodi - 1) // 2

# Simuliamo reti che vanno da 2 a 20 dispositivi.
numeri_nodi = list(range(2, 21))

valori_bus = [collegamenti_bus(n) for n in numeri_nodi]
valori_stella = [collegamenti_stella(n) for n in numeri_nodi]
valori_mesh = [collegamenti_mesh(n) for n in numeri_nodi]

# Stampiamo un confronto diretto per una rete piccola (5 nodi) e una più grande (20 nodi).
for n in [5, 10, 20]:
    print(f"Con {n} dispositivi in rete servono:")
    print(f"  Bus/Stella -> {collegamenti_bus(n)} collegamenti")
    print(f"  Mesh       -> {collegamenti_mesh(n)} collegamenti\n")

# Visualizziamo la crescita dei collegamenti al variare del numero di nodi.
plt.figure(figsize=(9, 5))
plt.plot(numeri_nodi, valori_bus, marker="o", label="Bus / Stella (crescita lineare)")
plt.plot(numeri_nodi, valori_mesh, marker="s", color="crimson", label="Magliata / Mesh (crescita quadratica)")
plt.title("Numero di collegamenti necessari al crescere della rete")
plt.xlabel("Numero di dispositivi nella rete")
plt.ylabel("Numero di collegamenti fisici necessari")
plt.legend()
plt.grid(linestyle="--", alpha=0.5)
plt.tight_layout()
plt.show()
```

> 💡 **Approfondimento**
>
> Con appena 20 dispositivi, una rete a stella richiede 20 cavi, mentre una rete magliata pura ne richiederebbe ben **190**! È proprio per questo motivo che le grandi reti reali, incluse le dorsali di Internet, utilizzano topologie **ibride**: mesh solo tra i nodi più strategici (i grandi router delle dorsali), e stella o bus per collegare i singoli dispositivi finali.

**Prova tu!** Modifica il codice per calcolare quanti collegamenti servirebbero per una rete magliata con 50 o 100 dispositivi, e confronta il risultato con una topologia a stella dello stesso numero di nodi.

---

<a id="sez-3-6"></a>
# 3.6 Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|----------|-------------|
| **Segnale analogico** | Segnale che varia in modo continuo nel tempo |
| **Segnale digitale** | Segnale rappresentato da valori discreti (bit) |
| **Campionamento** | Misurazione del segnale a intervalli di tempo regolari |
| **Quantizzazione** | Approssimazione di un valore campionato al livello discreto più vicino |
| **Nodo** | Ogni dispositivo collegato a una rete |
| **Topologia di rete** | Modo in cui i nodi di una rete sono collegati tra loro |
| **LAN / MAN / WAN** | Classificazione delle reti in base all'estensione geografica |
| **Hub** | Dispositivo che ripete un segnale su tutte le porte, senza intelligenza |
| **Switch** | Dispositivo che smista i dati solo verso la porta del destinatario corretto |
| **Router** | Dispositivo che collega reti diverse tra loro, instradando i dati |
| **Access Point** | Dispositivo che collega dispositivi Wi-Fi a una rete cablata |

---

<a id="riepilogo"></a>
# Riepilogo del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo hai imparato:

- la differenza fondamentale tra segnali analogici e digitali, e perché il digitale si è imposto;
- i concetti di campionamento e quantizzazione, alla base di ogni conversione analogico-digitale;
- come si classificano le reti in base alla loro estensione (PAN, LAN, MAN, WAN);
- le quattro topologie di rete principali: bus, stella, anello e magliata, con i relativi vantaggi e svantaggi;
- il ruolo dei principali dispositivi di interconnessione: hub, switch, router e access point;
- come simulare in Python la conversione di un segnale analogico in digitale, come disegnare le topologie di rete e come confrontarne la scalabilità.

Ora che sai come sono strutturate le reti, è il momento di scoprire **come un singolo dispositivo si collega concretamente a Internet**: dal vecchio modem telefonico fino all'ADSL e alla fibra. Ne parliamo nel **Modulo 4 — La Connessione a Internet: dal Modem all'ADSL e Oltre**.

[⬆ Torna all'indice del modulo](#indice-modulo)