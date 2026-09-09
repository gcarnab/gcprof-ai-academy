# 🧩 Modulo 4 — Incapsulamento: Proteggere lo Stato degli Oggetti

- **Corso:** OOP Explorer — Programmazione ad Oggetti con Python e Java
- **Piattaforma:** GCProf Academy
- **Livello:** 🟢 Base (Fase 1 — Le Fondamenta dell'OOP)
- **Target:** Studenti del triennio delle superiori (indirizzo tecnico, finanza e marketing, relazioni internazionali), docenti, appassionati
- **Prerequisiti:** Modulo 1 (Pensare a Oggetti), Modulo 2 (Classi e Oggetti), Modulo 3 (Attributi, Metodi e Costruttore)
- **Obiettivo Didattico:** Comprendere il principio dell'incapsulamento, usare le convenzioni Python per attributi protetti e privati, scrivere getter e setter con il decoratore `@property`, validare i dati in ingresso, e riconoscere lo stesso principio nella sintassi Java.

---

<a id="indice"></a>
# 📑 Indice del Modulo 4

1. [Capitolo 1 — Il Problema: Stato Esposto e Vulnerabile](#capitolo-1)
2. [Capitolo 2 — Cos'è l'Incapsulamento: la Scatola Nera](#capitolo-2)
3. [Capitolo 3 — Convenzioni Python: Attributi Protetti e Privati](#capitolo-3)
4. [Capitolo 4 — Getter e Setter: Accesso Controllato](#capitolo-4)
5. [Capitolo 5 — Il Decoratore `@property`: Getter e Setter Eleganti](#capitolo-5)
6. [Capitolo 6 — Validare i Dati nel Setter](#capitolo-6)
7. [Capitolo 7 — Incapsulamento in Java: `private`, `public` e Metodi d'Accesso](#capitolo-7)
8. [Capitolo 8 — Sintesi, Laboratorio e Autoverifica](#capitolo-8)

---

<a id="capitolo-1"></a>
## 1. Capitolo 1 — Il Problema: Stato Esposto e Vulnerabile

Nel Modulo 3 hai imparato a costruire oggetti completi grazie al costruttore. C'è però un problema che, finora, hai ignorato: **ogni attributo che hai scritto è completamente accessibile e modificabile dall'esterno**, senza alcun controllo.

```python
# ==================== ESEMPIO 4.1: IL PROBLEMA DELLO STATO ESPOSTO ====================
"""
Una classe ContoBancario "ingenua": il saldo è un attributo pubblico,
modificabile liberamente da chiunque abbia un riferimento all'oggetto.
Nessun controllo impedisce operazioni assurde o pericolose.
"""

class ContoBancario:
    def __init__(self, intestatario, saldo):
        self.intestatario = intestatario
        self.saldo = saldo

conto = ContoBancario("Mario Rossi", 1000)

# PROBLEMA 1: chiunque può azzerare o alterare il saldo senza passare
# da nessuna operazione di deposito o prelievo
conto.saldo = -500          # un conto con saldo negativo, creato dal nulla!
print(f"Saldo di {conto.intestatario}: {conto.saldo} €")   # -500 €

# PROBLEMA 2: chiunque può assegnare un valore che non ha alcun senso
conto.saldo = "un milione di euro"   # una stringa al posto di un numero!
print(conto.saldo)
```

Un saldo negativo creato dal nulla, o addirittura una stringa al posto di un numero: in un sistema reale, errori come questi non sono solo fastidiosi, sono **pericolosi**. Serve un modo per proteggere lo stato interno di un oggetto, permettendo di modificarlo solo attraverso operazioni controllate.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-2"></a>
## 2. Capitolo 2 — Cos'è l'Incapsulamento: la Scatola Nera

L'**Incapsulamento** è il principio dell'OOP che nasconde i dati interni di un oggetto, esponendo verso l'esterno solo ciò che è necessario per usarlo in modo sicuro — tipicamente attraverso metodi dedicati.

### 📺 L'Analogia del Telecomando

```
              ┌─────────────────────────────┐
              │        TELECOMANDO           │
              │                               │
     tu premi │   [ VOL+ ]   [ VOL- ]         │  ← interfaccia pubblica
              │   [ CH+ ]    [ CH- ]          │     (quello che puoi usare)
              │                               │
              │   ▓▓▓ circuiti interni ▓▓▓    │  ← stato interno NASCOSTO
              │   ▓▓▓ segnali infrarossi ▓▓▓  │     (non lo tocchi mai
              │   ▓▓▓ frequenze  ▓▓▓          │      direttamente)
              └─────────────────────────────┘

  Premi VOL+ e il volume aumenta: non hai bisogno di sapere COME,
  a livello di circuiti, questo avvenga. Il telecomando espone
  solo i bottoni; nasconde tutto il resto.
```

Allo stesso modo, un oggetto ben incapsulato espone metodi come `deposita()` o `preleva()` (i "bottoni"), ma nasconde e protegge l'attributo `saldo` (i "circuiti"): nessuno può modificarlo direttamente, solo passando dai metodi previsti — che possono controllare che l'operazione abbia senso.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-3"></a>
## 3. Capitolo 3 — Convenzioni Python: Attributi Protetti e Privati

A differenza di Java (che vedrai nel Capitolo 7), Python non impedisce *tecnicamente* di accedere a un attributo dall'esterno: usa invece delle **convenzioni di nomenclatura**, rispettate per disciplina da chi scrive codice Python.

| Prefisso | Significato | Convenzione |
| :--- | :--- | :--- |
| `nome` | Pubblico | Accessibile liberamente da chiunque |
| `_nome` | Protetto | "Per uso interno": accessibile tecnicamente, ma da non toccare dall'esterno per convenzione |
| `__nome` | Privato | Python applica il *name mangling* (vedi sotto), rendendolo scomodo da accedere dall'esterno |

```python
# ==================== ESEMPIO 4.2: ATTRIBUTI PROTETTI E PRIVATI ====================
"""
Confrontiamo i tre livelli. Nota: nessuno di questi impedisce DAVVERO
l'accesso dall'esterno — sono convenzioni, non barriere assolute
(a differenza di Java). Il Capitolo 5 mostrerà lo strumento che rende
questa protezione davvero efficace: @property.
"""

class ContoBancario:
    def __init__(self, intestatario, saldo):
        self.intestatario = intestatario   # pubblico
        self._saldo = saldo                # protetto (convenzione: "non toccare da fuori")
        self.__pin = "1234"                # privato (name mangling)

conto = ContoBancario("Mario Rossi", 1000)

print(conto._saldo)          # funziona ancora, ma è una violazione della convenzione
# print(conto.__pin)         # AttributeError! Il nome è stato "rinominato" internamente

# Il name mangling rinomina __pin in _ContoBancario__pin:
print(conto._ContoBancario__pin)   # funziona, ma nessuno dovrebbe scrivere così
```

Il **name mangling** (letteralmente "storpiamento del nome") è il meccanismo con cui Python rinomina internamente ogni attributo `__privato` in `_NomeClasse__privato`, rendendolo scomodo — non impossibile — da raggiungere dall'esterno per errore.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-4"></a>
## 4. Capitolo 4 — Getter e Setter: Accesso Controllato

Il modo classico (comune a tutti i linguaggi OOP, Java compreso) per esporre in modo controllato un attributo protetto è scrivere due metodi dedicati:

* un **getter**, per leggere il valore;
* un **setter**, per modificarlo — con la possibilità di controllare che il nuovo valore sia valido.

```python
# ==================== ESEMPIO 4.3: GETTER E SETTER "CLASSICI" ====================
"""
Il saldo diventa protetto (_saldo). L'unico modo per leggerlo o
modificarlo dall'esterno è passare dai metodi get_saldo() e set_saldo(),
che possono controllare la richiesta prima di eseguirla.
"""

class ContoBancario:
    def __init__(self, intestatario, saldo):
        self.intestatario = intestatario
        self._saldo = saldo

    def get_saldo(self):          # getter: legge il valore
        return self._saldo

    def set_saldo(self, nuovo_saldo):   # setter: modifica il valore, CON CONTROLLO
        if nuovo_saldo < 0:
            print("Operazione rifiutata: il saldo non può essere negativo.")
        else:
            self._saldo = nuovo_saldo

conto = ContoBancario("Mario Rossi", 1000)

print(conto.get_saldo())      # 1000 — lettura controllata
conto.set_saldo(1500)         # scrittura valida
print(conto.get_saldo())      # 1500
conto.set_saldo(-200)         # scrittura rifiutata dal controllo interno
print(conto.get_saldo())      # 1500 — invariato
```

Funziona, ma la sintassi `conto.get_saldo()` / `conto.set_saldo(...)` è più scomoda di un semplice `conto.saldo`. Python offre uno strumento per avere il meglio di entrambi i mondi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-5"></a>
## 5. Capitolo 5 — Il Decoratore `@property`: Getter e Setter Eleganti

Il decoratore `@property` permette di scrivere getter e setter che si comportano, dall'esterno, **come se fossero semplici attributi** — con tutta la protezione dei metodi, ma con la sintassi pulita di `conto.saldo`.

```python
# ==================== ESEMPIO 4.4: @property IN AZIONE ====================
"""
Stessa logica dell'Esempio 4.3, ma con @property: chi usa la classe
scrive 'conto.saldo' come se fosse un attributo normale, senza sapere
che, dietro le quinte, sta chiamando un metodo controllato.
"""

class ContoBancario:
    def __init__(self, intestatario, saldo):
        self.intestatario = intestatario
        self._saldo = saldo

    @property
    def saldo(self):              # getter: si "traveste" da attributo
        """Restituisce il saldo attuale."""
        return self._saldo

    @saldo.setter
    def saldo(self, nuovo_saldo):  # setter: stesso nome, decoratore diverso
        if nuovo_saldo < 0:
            print("Operazione rifiutata: il saldo non può essere negativo.")
        else:
            self._saldo = nuovo_saldo

conto = ContoBancario("Mario Rossi", 1000)

print(conto.saldo)     # 1000 — sembra un attributo, ma passa dal getter!
conto.saldo = 1500     # sembra un'assegnazione diretta, ma passa dal setter!
print(conto.saldo)     # 1500

conto.saldo = -200     # il setter rifiuta l'operazione
print(conto.saldo)     # 1500 — invariato
```

```
   conto.saldo               conto.saldo = 1500
        │                            │
        ▼                            ▼
  chiama il GETTER            chiama il SETTER
  (metodo con @property)      (metodo con @saldo.setter)
        │                            │
        ▼                            ▼
  restituisce self._saldo    controlla e poi assegna self._saldo

     Dall'esterno sembra un attributo. Dentro, è tutto controllato.
```

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-6"></a>
## 6. Capitolo 6 — Validare i Dati nel Setter

Il vero valore dell'incapsulamento emerge quando il setter applica **regole di validazione** legate al significato reale del dato, non solo controlli generici.

```python
# ==================== ESEMPIO 4.5: VALIDAZIONE COMPLETA CON @property ====================
"""
Una classe Studente che valida sia l'età (deve essere un numero
ragionevole per uno studente) sia il nome (non può essere vuoto).
Il costruttore stesso, assegnando self.eta = eta, passa AUTOMATICAMENTE
dal setter: la validazione si applica anche alla creazione dell'oggetto.
"""

class Studente:
    def __init__(self, nome, eta):
        self.nome = nome     # passa dal setter 'nome' qui sotto
        self.eta = eta       # passa dal setter 'eta' qui sotto

    @property
    def nome(self):
        return self._nome

    @nome.setter
    def nome(self, valore):
        if not valore.strip():
            raise ValueError("Il nome non può essere vuoto.")
        self._nome = valore

    @property
    def eta(self):
        return self._eta

    @eta.setter
    def eta(self, valore):
        if not (5 <= valore <= 100):
            raise ValueError("L'età inserita non è plausibile per uno studente.")
        self._eta = valore

studente1 = Studente("Mario Rossi", 16)
print(f"{studente1.nome}, {studente1.eta} anni")   # creazione valida

# studente2 = Studente("Giulia Bianchi", 200)   # ValueError: età non plausibile!
```

*Perché ti serve: questo pattern — validare i dati dentro il setter, sollevando un errore quando qualcosa non va — è il ponte diretto verso il Modulo 9 (Eccezioni), dove imparerai a creare eccezioni personalizzate invece di usare quelle generiche come `ValueError`.*

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-7"></a>
## 7. Capitolo 7 — Incapsulamento in Java: `private`, `public` e Metodi d'Accesso

In Java, a differenza di Python, l'incapsulamento non è una convenzione: è imposto dal linguaggio attraverso i **modificatori di accesso**.

```java
// ==================== ESEMPIO 4.6: INCAPSULAMENTO IN JAVA ====================
/*
 * In Java 'private' impedisce DAVVERO l'accesso diretto dall'esterno:
 * non è una convenzione come in Python, è una regola del compilatore.
 * getSaldo()/setSaldo() sono i getter/setter "espliciti", equivalenti
 * al pattern dell'Esempio 4.3 in Python.
 */

class ContoBancario {
    private String intestatario;
    private double saldo;          // 'private': NESSUNO fuori dalla classe può leggerlo/scriverlo direttamente

    public ContoBancario(String intestatario, double saldo) {
        this.intestatario = intestatario;
        this.saldo = saldo;
    }

    public double getSaldo() {     // getter pubblico
        return saldo;
    }

    public void setSaldo(double nuovoSaldo) {   // setter pubblico, con validazione
        if (nuovoSaldo < 0) {
            System.out.println("Operazione rifiutata: saldo non può essere negativo.");
        } else {
            this.saldo = nuovoSaldo;
        }
    }
}
```

### Confronto diretto Python ↔ Java

| Aspetto | Python | Java |
| :--- | :--- | :--- |
| Protezione reale? | Convenzione (`_`, `__` + name mangling) | Imposta dal compilatore (`private`) |
| Sintassi di accesso controllato | `@property` / `@nome.setter` (sembra un attributo) | Metodi `getX()` / `setX()` (sintassi esplicita) |
| Possibilità di "bypassare" | Tecnicamente sì (Python si fida del programmatore) | Praticamente no, dall'esterno della classe |

In Python, l'incapsulamento è una questione di **disciplina e buone pratiche**; in Java è una **regola del linguaggio**. Il risultato che vuoi ottenere — proteggere lo stato dell'oggetto — è però identico in entrambi i casi.

[🔙 Torna all'indice](#indice)

---

<a id="capitolo-8"></a>
## 8. Capitolo 8 — Sintesi, Laboratorio e Autoverifica

### 💡 Punti Chiave del Modulo 4

1. L'**incapsulamento** protegge lo stato interno di un oggetto, esponendo solo ciò che serve attraverso metodi controllati.
2. In Python, `_protetto` e `__privato` sono **convenzioni**, non barriere assolute; `__privato` subisce il *name mangling*.
3. Getter e setter "classici" (`get_saldo()` / `set_saldo()`) permettono un accesso controllato, ma con sintassi scomoda.
4. Il decoratore `@property` permette di scrivere getter e setter che si comportano come normali attributi (`conto.saldo`), mantenendo il controllo interno.
5. Un setter può validare i dati in ingresso, rifiutando valori privi di senso (anche durante il costruttore).
6. In Java l'incapsulamento è imposto dal compilatore tramite `private`, con getter e setter espliciti (`getSaldo()`, `setSaldo()`).

---

### 🧪 Laboratorio Pratico: "La Classe Prodotto"

**Obiettivo:** Applicare incapsulamento e validazione con `@property` su Google Colab.

1. Definisci una classe `Prodotto` con costruttore `__init__(self, nome, prezzo, quantita)`.
2. Rendi `prezzo` un attributo protetto (`_prezzo`), accessibile tramite `@property`, con un setter che rifiuta valori negativi o pari a zero.
3. Rendi `quantita` un attributo protetto, con un setter che rifiuta valori negativi (un prodotto non può avere quantità negativa in magazzino).
4. Scrivi un metodo `valore_totale()` che restituisce `prezzo * quantita`, riusando `self.prezzo` e `self.quantita` (non gli attributi protetti direttamente).
5. Crea un oggetto `Prodotto`, dimostra che assegnare un prezzo negativo viene rifiutato, e stampa il valore totale.

*Suggerimento:* riusa esattamente la struttura dell'Esempio 4.5 (validazione con `@property` applicata a più attributi nella stessa classe).

---

### ❓ Quiz di Autoverifica

**Domanda 1:** Cosa protegge principalmente il principio dell'incapsulamento?
- A) La velocità di esecuzione del programma
- B) Lo stato interno di un oggetto, esponendo solo ciò che serve attraverso metodi controllati
- C) Il nome della classe da eventuali errori di battitura
- D) La memoria occupata da un oggetto

**Domanda 2:** In Python, cosa succede tecnicamente a un attributo `__privato` grazie al name mangling?
- A) Viene reso completamente inaccessibile, in ogni caso
- B) Viene rinominato internamente in `_NomeClasse__privato`, rendendolo scomodo da raggiungere dall'esterno
- C) Viene automaticamente convertito in un attributo di classe
- D) Genera sempre un errore se usato nel costruttore

**Domanda 3:** Qual è il vantaggio principale di `@property` rispetto ai getter/setter "classici" (`get_saldo()`/`set_saldo()`)?
- A) `@property` è più veloce da eseguire
- B) `@property` permette di scrivere `conto.saldo` come un normale attributo, mantenendo però il controllo interno del setter
- C) `@property` elimina la necessità di un costruttore
- D) `@property` funziona solo con i numeri, non con le stringhe

**Domanda 4:** Qual è, secondo il Capitolo 7, la differenza principale tra l'incapsulamento in Python e in Java?
- A) Java non supporta l'incapsulamento
- B) In Python la protezione è una convenzione; in Java è imposta dal compilatore tramite `private`
- C) In Python bisogna sempre usare `new` per creare un oggetto incapsulato
- D) Non c'è alcuna differenza reale tra i due linguaggi

---

[🔙 Torna all'indice](#indice)