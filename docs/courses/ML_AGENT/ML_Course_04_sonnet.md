# 🟥 MODULO 4 — Reinforcement Learning e AI Agent

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Laboratorio Pratico di Machine Learning e Sviluppo di AI Agent · Percorso ispirato al programma "Laboratorio pratico di Machine Learning e sviluppo di AI Agent" · Ottimizzato per Google Colab · Aggiornato ad Agosto 2026

---

## <a id="indice-modulo"></a> Indice del Modulo

1. [4.1 Dal prevedere al decidere: il framework agente-ambiente-reward](#sez-4-1)
2. [🐍 Laboratorio Python 4.1 — Esplorare l'ambiente Gymnasium Taxi-v3](#lab-4-1)
3. [4.2 La Q-table: come l'agente rappresenta ciò che ha imparato](#sez-4-2)
4. [🐍 Laboratorio Python 4.2 — Inizializzare la Q-table](#lab-4-2)
5. [4.3 Strategia epsilon-greedy: bilanciare esplorazione e sfruttamento](#sez-4-3)
6. [🐍 Laboratorio Python 4.3 — Implementare la scelta epsilon-greedy dell'azione](#lab-4-3)
7. [4.4 L'algoritmo Q-learning: l'equazione di aggiornamento](#sez-4-4)
8. [🐍 Laboratorio Python 4.4 — Implementare l'aggiornamento Q-learning](#lab-4-4)
9. [4.5 Il ciclo di training completo](#sez-4-5)
10. [🐍 Laboratorio Python 4.5 — Training loop completo su Taxi-v3](#lab-4-5)
11. [🚕 Progetto Guidato — L'agente addestrato contro l'agente casuale](#progetto)
12. [Best Practice del modulo](#best-practice)
13. [Errori comuni](#errori-comuni)
14. [Glossario del modulo](#glossario)
15. [Riepilogo del modulo e del corso](#riepilogo)

---

# Obiettivi del modulo

Al termine di questo modulo sarai in grado di:

- spiegare il framework **agente-ambiente-reward** e come si differenzia dagli schemi predittivi visti nei moduli precedenti;
- interagire con un ambiente **Gymnasium**, leggendone stato, azioni possibili e segnale di reward;
- rappresentare la conoscenza di un agente tramite una **Q-table**;
- implementare la strategia **epsilon-greedy** per bilanciare esplorazione e sfruttamento;
- spiegare e implementare l'**equazione di aggiornamento del Q-learning**;
- scrivere un ciclo di training completo che addestri un agente su un ambiente Taxi-v3;
- valutare un agente addestrato confrontandolo in modo motivato con un agente che agisce a caso.

---

<a id="sez-4-1"></a>
# 4.1 Dal prevedere al decidere: il framework agente-ambiente-reward

[⬆ Torna all'indice del modulo](#indice-modulo)

Nei moduli precedenti abbiamo sempre lavorato con dati **statici**: un dataset fisso, da cui il modello impara a prevedere un'etichetta (Modulo 1) o a scoprire pattern (Modulo 2) o a costruire rappresentazioni via via più complesse (Modulo 3). Il Reinforcement Learning cambia radicalmente lo scenario: non c'è più un dataset da guardare, ma un **ambiente** con cui interagire nel tempo.

> **Definizione**
>
> Nel **Reinforcement Learning (apprendimento per rinforzo)**, un **agente** osserva lo **stato** corrente di un **ambiente**, sceglie un'**azione** tra quelle disponibili, e riceve dall'ambiente un **reward** (ricompensa, positiva o negativa) insieme al nuovo stato in cui si trova. L'obiettivo dell'agente non è prevedere un'etichetta, ma imparare una **policy** — una strategia di scelta delle azioni — che massimizzi il reward totale accumulato nel tempo.

> 💡 **Approfondimento**
>
> Questo schema — percezione → decisione → azione → nuovo stato — è esattamente quello richiamato nell'introduzione del corso: è il ponte concettuale tra "fare previsioni" e "costruire agenti autonomi". Un modello KNN o una rete neurale (Moduli 1 e 3) ricevono un input e restituiscono un output, senza che le loro scelte modifichino il mondo in cui operano. Un agente di Reinforcement Learning, al contrario, **agisce dentro un ambiente che cambia in risposta alle sue scelte** — la stessa logica, semplificata, di un vero AI Agent basato su LLM che pianifica ed esegue passi in autonomia.

---

<a id="lab-4-1"></a>
# 🐍 Laboratorio Python 4.1 — Esplorare l'ambiente Gymnasium Taxi-v3

[⬆ Torna all'indice del modulo](#indice-modulo)

Lavoreremo sull'ambiente **Taxi-v3** della libreria **Gymnasium**: un taxi si muove su una griglia 5×5, deve raccogliere un passeggero in una delle quattro posizioni colorate e lasciarlo nella destinazione corretta, nel minor numero di mosse possibile.

```python
# ============================================================
# ESERCIZIO 4.1 - Creare ed esplorare l'ambiente Taxi-v3
# Obiettivo: familiarizzare con l'interfaccia standard di
#            Gymnasium: stato, azioni possibili, reward.
# ============================================================

!pip install gymnasium -q

import gymnasium as gym

# render_mode="ansi" permette di stampare l'ambiente come testo,
# comodo per Google Colab senza bisogno di una finestra grafica
ambiente = gym.make("Taxi-v3", render_mode="ansi")

# reset() avvia un nuovo episodio e restituisce lo stato iniziale
stato_iniziale, info = ambiente.reset(seed=42)
print(f"Stato iniziale (numero intero che codifica l'intera griglia): {stato_iniziale}")
print(f"Numero totale di stati possibili: {ambiente.observation_space.n}")
print(f"Numero di azioni possibili: {ambiente.action_space.n}")

print("\nVista testuale dell'ambiente:")
print(ambiente.render())
```

```python
# ============================================================
# ESERCIZIO 4.1 (continua) - Un singolo passo casuale nell'ambiente
# Obiettivo: osservare cosa restituisce l'ambiente dopo aver
#            eseguito un'azione, tramite il metodo step().
# ============================================================

# Le 6 azioni possibili in Taxi-v3: 0=Sud, 1=Nord, 2=Est, 3=Ovest,
# 4=Raccogli passeggero, 5=Lascia passeggero
azione_casuale = ambiente.action_space.sample()

nuovo_stato, reward, terminato, troncato, info = ambiente.step(azione_casuale)

print(f"Azione eseguita: {azione_casuale}")
print(f"Nuovo stato: {nuovo_stato}")
print(f"Reward ricevuto: {reward}")
print(f"Episodio terminato (obiettivo raggiunto): {terminato}")
print(f"Episodio troncato (limite di passi superato): {troncato}")
```

**Prova tu!** Esegui più volte la cella dell'azione casuale (senza richiamare `reset()`) e osserva come cambiano stato e reward a ogni passo. Nota che un reward di -1 è il costo standard di ogni mossa in Taxi-v3: è il segnale che spinge l'agente a trovare il percorso più breve.

---

<a id="sez-4-2"></a>
# 4.2 La Q-table: come l'agente rappresenta ciò che ha imparato

[⬆ Torna all'indice del modulo](#indice-modulo)

Come fa un agente a "ricordare" quali azioni funzionano bene in quali stati? Nel Q-learning, questa conoscenza viene memorizzata in una tabella.

> **Definizione**
>
> La **Q-table** è una tabella con una riga per ogni stato possibile dell'ambiente e una colonna per ogni azione possibile. Ogni cella `Q(stato, azione)` contiene una stima di quanto reward totale l'agente si aspetta di ottenere, nel lungo periodo, eseguendo quell'azione in quello stato e comportandosi in modo ottimale da lì in poi.

> ⚠️ **Attenzione**
>
> All'inizio dell'addestramento la Q-table è inizializzata a zero (o a valori casuali piccoli): l'agente non sa ancora nulla dell'ambiente. È esattamente lo stesso ruolo giocato dai pesi casuali di una rete neurale non addestrata nel Modulo 3 — solo che qui, invece di pesi di una rete, la conoscenza appresa vive dentro i valori di questa tabella.

---

<a id="lab-4-2"></a>
# 🐍 Laboratorio Python 4.2 — Inizializzare la Q-table

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 4.2 - Inizializzazione della Q-table
# Obiettivo: creare una Q-table di zeri, con una riga per ogni
#            stato e una colonna per ogni azione dell'ambiente.
# ============================================================

import numpy as np

n_stati = ambiente.observation_space.n
n_azioni = ambiente.action_space.n

q_table = np.zeros((n_stati, n_azioni))

print(f"Forma della Q-table: {q_table.shape}")
print(f"({n_stati} stati possibili × {n_azioni} azioni possibili)")
print(f"\nRiga corrispondente allo stato iniziale (tutti zeri, per ora):")
print(q_table[stato_iniziale])
```

**Prova tu!** Calcola quante celle contiene in totale la Q-table (`n_stati * n_azioni`). È un numero grande ma gestibile: vedremo nel Modulo che completa idealmente questo percorso — quello sugli AI Agent basati su LLM — perché un approccio a tabella smette di essere praticabile quando gli stati possibili diventano innumerevoli (ad esempio, tutte le possibili conversazioni in linguaggio naturale).

---

<a id="sez-4-3"></a>
# 4.3 Strategia epsilon-greedy: bilanciare esplorazione e sfruttamento

[⬆ Torna all'indice del modulo](#indice-modulo)

Se l'agente scegliesse sempre l'azione con il valore Q più alto conosciuto finora, rischierebbe di rimanere bloccato su una strategia mediocre, senza mai scoprire azioni migliori non ancora provate. Serve un compromesso.

> **Definizione**
>
> La strategia **epsilon-greedy** fa scegliere all'agente, con probabilità **epsilon (ε)**, un'azione completamente casuale (**esplorazione**), e con probabilità **1-ε** l'azione con il valore Q più alto conosciuto per lo stato corrente (**sfruttamento**). Diminuendo gradualmente ε durante il training (**epsilon decay**), l'agente esplora molto all'inizio, quando non sa ancora nulla, e sfrutta sempre di più la conoscenza accumulata man mano che procede.

> 💡 **Approfondimento**
>
> Questo compromesso non è un dettaglio implementativo secondario: è uno dei problemi centrali di tutto il Reinforcement Learning. Un agente che esplora troppo poco può convergere rapidamente su una soluzione subottimale; uno che esplora troppo impiega più tempo a sfruttare ciò che ha già imparato. Lo stesso compromesso, in forme più sofisticate, si ritrova in qualunque sistema che debba imparare agendo nel mondo — dai motori di raccomandazione ai veri AI Agent.

---

<a id="lab-4-3"></a>
# 🐍 Laboratorio Python 4.3 — Implementare la scelta epsilon-greedy dell'azione

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 4.3 - Funzione di scelta epsilon-greedy dell'azione
# Obiettivo: implementare la logica descritta in sezione 4.3,
#            da riutilizzare nel training loop completo.
# ============================================================

def scegli_azione(stato, q_table, epsilon, ambiente):
    """Sceglie un'azione bilanciando esplorazione e sfruttamento."""
    numero_casuale = np.random.random()

    if numero_casuale < epsilon:
        # ESPLORAZIONE: azione completamente casuale
        return ambiente.action_space.sample()
    else:
        # SFRUTTAMENTO: l'azione con il valore Q più alto per questo stato
        return np.argmax(q_table[stato])


# Verifichiamo il comportamento con due valori estremi di epsilon
np.random.seed(42)
print("Con epsilon=1.0 (esplorazione totale), 10 azioni scelte:")
print([scegli_azione(stato_iniziale, q_table, epsilon=1.0, ambiente=ambiente) for _ in range(10)])

print("\nCon epsilon=0.0 (sfruttamento totale, Q-table ancora a zero):")
print([scegli_azione(stato_iniziale, q_table, epsilon=0.0, ambiente=ambiente) for _ in range(10)])
```

**Prova tu!** Con `epsilon=0.0` e la Q-table ancora a zero, l'azione scelta è sempre la stessa (la prima in caso di parità, per come `argmax` risolve i pareggi): è un comportamento atteso, perché nessuna azione risulta ancora "migliore" delle altre agli occhi dell'agente.

---

<a id="sez-4-4"></a>
# 4.4 L'algoritmo Q-learning: l'equazione di aggiornamento

[⬆ Torna all'indice del modulo](#indice-modulo)

Dopo ogni azione, l'agente aggiorna il valore `Q(stato, azione)` appena usato, sulla base del reward ricevuto e della sua stima del valore del nuovo stato in cui si trova.

> **Definizione**
>
> L'**equazione di aggiornamento del Q-learning** è:
>
> `Q(s, a) ← Q(s, a) + α · [r + γ · max(Q(s', a')) − Q(s, a)]`
>
> dove **α** (alpha) è il **learning rate** (quanto "peso" dare al nuovo aggiornamento rispetto a ciò che si sapeva già), **γ** (gamma, il **discount factor**) determina quanto contano i reward futuri rispetto a quelli immediati, **r** è il reward appena ricevuto, e `max(Q(s', a'))` è la stima del miglior valore ottenibile dal nuovo stato **s'** in poi.

> 💡 **Approfondimento**
>
> Il termine tra parentesi quadre, `r + γ · max(Q(s', a')) − Q(s, a)`, si chiama **errore di predizione temporale (TD error)**: misura quanto la stima precedente di `Q(s, a)` era "sbagliata" alla luce di ciò che è appena successo. È concettualmente lo stesso ruolo giocato dalla funzione di loss nel Modulo 3: una misura dell'errore che guida l'aggiornamento — solo che qui, invece di aggiornare i pesi di una rete tramite backpropagation, si aggiorna direttamente una cella della Q-table.

---

<a id="lab-4-4"></a>
# 🐍 Laboratorio Python 4.4 — Implementare l'aggiornamento Q-learning

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 4.4 - Funzione di aggiornamento Q-learning
# Obiettivo: implementare l'equazione della sezione 4.4 come
#            funzione riutilizzabile nel training loop completo.
# ============================================================

def aggiorna_q_table(q_table, stato, azione, reward, nuovo_stato, alpha, gamma):
    """Applica un singolo aggiornamento Q-learning a Q(stato, azione)."""
    valore_attuale = q_table[stato, azione]
    miglior_valore_futuro = np.max(q_table[nuovo_stato])

    td_error = reward + gamma * miglior_valore_futuro - valore_attuale
    q_table[stato, azione] = valore_attuale + alpha * td_error

    return q_table


# Verifichiamo l'effetto di un singolo aggiornamento "a mano"
stato_iniziale, info = ambiente.reset(seed=42)
azione_di_prova = 1  # muoviti a Nord
nuovo_stato, reward, terminato, troncato, info = ambiente.step(azione_di_prova)

print(f"Q(stato, azione) PRIMA dell'aggiornamento: {q_table[stato_iniziale, azione_di_prova]:.4f}")

q_table = aggiorna_q_table(
    q_table, stato_iniziale, azione_di_prova, reward, nuovo_stato,
    alpha=0.1, gamma=0.99
)

print(f"Q(stato, azione) DOPO l'aggiornamento:    {q_table[stato_iniziale, azione_di_prova]:.4f}")
```

**Prova tu!** Il reward di un singolo passo in Taxi-v3 è quasi sempre -1: per questo il valore Q aggiornato è leggermente negativo dopo un solo passo. Solo ripetendo questo aggiornamento su migliaia di episodi (sezione 4.5) i valori della Q-table inizieranno a riflettere davvero quali azioni portano, nel lungo periodo, a completare la corsa più velocemente.

---

<a id="sez-4-5"></a>
# 4.5 Il ciclo di training completo

[⬆ Torna all'indice del modulo](#indice-modulo)

Il training loop del Q-learning ripete, per un gran numero di **episodi**, la stessa sequenza: scegliere un'azione (epsilon-greedy), eseguirla nell'ambiente, aggiornare la Q-table, finché l'episodio non termina (passeggero consegnato o limite di passi superato).

> **Definizione**
>
> Un **episodio** è una sequenza completa di interazioni tra agente e ambiente, dal `reset()` iniziale fino al raggiungimento dell'obiettivo o al superamento del limite massimo di passi. È l'equivalente, nel Reinforcement Learning, di una singola "partita" giocata dall'agente.

---

<a id="lab-4-5"></a>
# 🐍 Laboratorio Python 4.5 — Training loop completo su Taxi-v3

[⬆ Torna all'indice del modulo](#indice-modulo)

```python
# ============================================================
# ESERCIZIO 4.5 - Training loop completo del Q-learning
# Obiettivo: addestrare l'agente per migliaia di episodi,
#            con epsilon decrescente nel tempo, monitorando il
#            reward totale ottenuto episodio per episodio.
# ============================================================

ambiente = gym.make("Taxi-v3")  # senza render, per un training veloce
q_table = np.zeros((ambiente.observation_space.n, ambiente.action_space.n))

# Iperparametri del training
n_episodi = 5000
alpha = 0.1          # learning rate
gamma = 0.99         # discount factor
epsilon = 1.0        # probabilità di esplorazione iniziale
epsilon_min = 0.05
epsilon_decay = 0.999  # epsilon si riduce di questo fattore a ogni episodio

storico_reward = []

for episodio in range(n_episodi):
    stato, info = ambiente.reset()
    reward_totale_episodio = 0
    terminato = troncato = False

    while not (terminato or troncato):
        azione = scegli_azione(stato, q_table, epsilon, ambiente)
        nuovo_stato, reward, terminato, troncato, info = ambiente.step(azione)

        q_table = aggiorna_q_table(
            q_table, stato, azione, reward, nuovo_stato, alpha, gamma
        )

        stato = nuovo_stato
        reward_totale_episodio += reward

    storico_reward.append(reward_totale_episodio)
    epsilon = max(epsilon_min, epsilon * epsilon_decay)  # decadimento di epsilon

    if (episodio + 1) % 1000 == 0:
        reward_medio_recente = np.mean(storico_reward[-1000:])
        print(f"Episodio {episodio + 1:5d}/{n_episodi} | "
              f"Reward medio (ultimi 1000 episodi): {reward_medio_recente:.2f} | "
              f"Epsilon: {epsilon:.3f}")
```

```python
# ============================================================
# ESERCIZIO 4.5 (continua) - Visualizzare la curva di apprendimento
# Obiettivo: osservare graficamente il reward totale per episodio
#            migliorare nel tempo, segno che l'agente sta imparando.
# ============================================================

import matplotlib.pyplot as plt

# Media mobile per rendere leggibile una curva altrimenti molto rumorosa
finestra = 100
reward_medio_mobile = [
    np.mean(storico_reward[max(0, i - finestra):i + 1])
    for i in range(len(storico_reward))
]

plt.figure(figsize=(9, 5))
plt.plot(reward_medio_mobile)
plt.xlabel("Episodio")
plt.ylabel(f"Reward medio (media mobile su {finestra} episodi)")
plt.title("Curva di apprendimento dell'agente Q-learning su Taxi-v3")
plt.grid(alpha=0.3)
plt.show()
```

**Prova tu!** Riduci `n_episodi` a 500 e rilancia il training: la curva fa in tempo a stabilizzarsi su valori alti? Poi prova a impostare `epsilon_decay = 0.99` (decadimento più rapido): l'agente converge prima o rischia di sfruttare troppo presto una conoscenza ancora incompleta?

---

<a id="progetto"></a>
# 🚕 Progetto Guidato — L'agente addestrato contro l'agente casuale

[⬆ Torna all'indice del modulo](#indice-modulo)

Per capire davvero cosa ha imparato l'agente, confrontiamolo con un punto di riferimento onesto: un agente che sceglie sempre azioni casuali, senza alcuna Q-table.

```python
# ============================================================
# PROGETTO GUIDATO - Valutazione dell'agente addestrato
# Obiettivo: eseguire l'agente in modalità di solo sfruttamento
#            (epsilon=0) su un certo numero di episodi di test,
#            registrando reward totale e numero di passi impiegati.
# ============================================================

def valuta_agente(q_table, ambiente, n_episodi_test=100, usa_q_table=True):
    """Valuta un agente (con Q-table o casuale) su più episodi, senza esplorazione."""
    reward_per_episodio = []
    passi_per_episodio = []

    for _ in range(n_episodi_test):
        stato, info = ambiente.reset()
        reward_totale = 0
        n_passi = 0
        terminato = troncato = False

        while not (terminato or troncato):
            if usa_q_table:
                azione = np.argmax(q_table[stato])   # solo sfruttamento
            else:
                azione = ambiente.action_space.sample()  # agente casuale

            stato, reward, terminato, troncato, info = ambiente.step(azione)
            reward_totale += reward
            n_passi += 1

        reward_per_episodio.append(reward_totale)
        passi_per_episodio.append(n_passi)

    return np.mean(reward_per_episodio), np.mean(passi_per_episodio)


ambiente_test = gym.make("Taxi-v3")

reward_medio_addestrato, passi_medi_addestrato = valuta_agente(
    q_table, ambiente_test, usa_q_table=True
)
reward_medio_casuale, passi_medi_casuale = valuta_agente(
    q_table, ambiente_test, usa_q_table=False
)

print("Confronto su 100 episodi di test (nessuna esplorazione, solo valutazione):\n")
print(f"Agente addestrato (Q-learning) → reward medio: {reward_medio_addestrato:.1f}  |  passi medi: {passi_medi_addestrato:.1f}")
print(f"Agente casuale                 → reward medio: {reward_medio_casuale:.1f}  |  passi medi: {passi_medi_casuale:.1f}")
```

**Prova tu!** Il divario tra i due agenti è netto: l'agente casuale raramente completa la corsa entro il limite di passi consentito, mentre l'agente addestrato la porta a termine quasi sempre in poche mosse. Prova a rifare la valutazione dopo aver addestrato l'agente per sole 500 epoche invece di 5000: il divario si riduce?

---

<a id="best-practice"></a>
# ✅ Best Practice del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

- fai sempre decadere epsilon nel tempo: esplorazione totale all'inizio, sfruttamento crescente man mano che la Q-table diventa affidabile;
- valuta l'agente addestrato con `epsilon=0` (o comunque molto basso): durante la valutazione vuoi misurare cosa l'agente ha davvero imparato, non quanto è fortunato nell'esplorazione casuale;
- monitora il reward medio su una finestra di episodi (media mobile), non il singolo episodio: il segnale grezzo è troppo rumoroso per giudicare la convergenza;
- confronta sempre l'agente addestrato con un punto di riferimento semplice (come l'agente casuale del progetto guidato): senza un termine di paragone, un "reward medio di -50" non dice nulla da solo;
- tieni traccia sia del reward totale sia del numero di passi per episodio: su Taxi-v3 sono due facce della stessa medaglia (ogni passo costa reward), ma su altri ambienti possono raccontare storie diverse.

---

<a id="errori-comuni"></a>
# ❌ Errori comuni

[⬆ Torna all'indice del modulo](#indice-modulo)

- **Non far decadere epsilon:** un agente che continua a esplorare con alta probabilità anche a fine training non sfrutta mai davvero ciò che ha imparato.
- **Valutare l'agente con epsilon ancora alto:** mescolare esplorazione e valutazione rende impossibile capire se i risultati riflettono la policy appresa o solo il caso.
- **Learning rate (α) troppo alto:** ogni nuovo aggiornamento "cancella" quasi del tutto la conoscenza precedente, rendendo il training instabile — lo stesso problema visto per il learning rate delle reti neurali nel Modulo 3.
- **Discount factor (γ) troppo basso:** un γ vicino a 0 rende l'agente miope, concentrato solo sul reward immediato e incapace di pianificare verso un obiettivo più lontano nel tempo (come raccogliere il passeggero prima di poterlo lasciare).
- **Confondere il numero di episodi con il numero di passi:** un training "lungo" in termini di episodi può comunque essere insufficiente se ogni episodio termina troppo rapidamente (ad esempio per troncamento) prima che l'agente scopra azioni utili.

---

<a id="glossario"></a>
# Glossario del modulo

[⬆ Torna all'indice del modulo](#indice-modulo)

| Termine | Significato |
|---|---|
| **Reinforcement Learning** | Famiglia di algoritmi in cui un agente impara a decidere azioni interagendo con un ambiente, guidato da un segnale di reward |
| **Agente / Ambiente** | Chi decide le azioni / il sistema con cui l'agente interagisce, che restituisce nuovo stato e reward |
| **Stato / Azione / Reward** | La situazione osservata dall'agente / la scelta possibile in quello stato / il segnale numerico ricevuto dopo l'azione |
| **Policy** | La strategia, appresa o da apprendere, che l'agente usa per scegliere le azioni |
| **Q-table** | Tabella stato × azione che stima il reward atteso a lungo termine di ogni coppia stato-azione |
| **Epsilon-greedy** | Strategia che bilancia esplorazione (azioni casuali) e sfruttamento (azione con Q più alto) tramite la probabilità ε |
| **Epsilon decay** | Riduzione progressiva di ε nel tempo, per esplorare molto all'inizio e sfruttare sempre di più in seguito |
| **Q-learning** | Algoritmo che aggiorna i valori della Q-table sulla base del reward ricevuto e della stima del miglior valore futuro |
| **Learning rate (α) / Discount factor (γ)** | Quanto peso dare al nuovo aggiornamento / quanto contano i reward futuri rispetto a quelli immediati |
| **Episodio** | Una sequenza completa di interazioni agente-ambiente, dal reset iniziale al termine (obiettivo raggiunto o limite di passi superato) |

---

<a id="riepilogo"></a>
# Riepilogo del modulo e del corso

[⬆ Torna all'indice del modulo](#indice-modulo)

In questo modulo hai imparato a:

- ragionare in termini di agente, ambiente, stato, azione e reward, invece che di dataset statico ed etichette;
- interagire con un ambiente Gymnasium, leggendone stato, azioni possibili e segnale di reward;
- rappresentare la conoscenza di un agente tramite una Q-table;
- bilanciare esplorazione e sfruttamento con la strategia epsilon-greedy, facendo decadere ε nel tempo;
- implementare l'equazione di aggiornamento del Q-learning e un ciclo di training completo;
- valutare un agente addestrato confrontandolo in modo motivato con un punto di riferimento casuale.

Hai costruito il tuo primo, vero **agente autonomo**, capace di percepire, decidere e agire per raggiungere un obiettivo. Guardando indietro all'intero percorso: nel Modulo 1 hai costruito un modello che **impara a classificare**, nel Modulo 2 uno che **scopre pattern** da solo, nel Modulo 3 uno che **rappresenta la realtà in profondità**, e ora, nel Modulo 4, uno che **decide e agisce**. È lo stesso schema — percezione, decisione, azione, apprendimento dall'esperienza — che ritroverai negli AI Agent basati su LLM, dove la Q-table lascia il posto a un modello linguistico e l'ambiente diventa un compito complesso da portare a termine in autonomia.

Non ti resta che affrontare il **Project Work Finale**, scegliendo tra la pipeline ML comparativa (Percorso A) o un nuovo ambiente Gymnasium da padroneggiare con il Q-learning (Percorso B) — o entrambi, per un progetto conclusivo davvero completo.

[⬆ Torna all'indice del modulo](#indice-modulo)