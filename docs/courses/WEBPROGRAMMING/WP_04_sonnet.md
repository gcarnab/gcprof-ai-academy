# 🌐 MODULO 4 — Tabelle e Form

### Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com

### Corso: Web Programming Base — HTML5 & CSS3

---

## Cosa imparerai in questo modulo

In questo modulo imparerai a rappresentare dati tabulari con le tabelle HTML, padroneggiando la struttura corretta con `<thead>`, `<tbody>` e `<tfoot>`, e le tecniche di unione di celle con `colspan` e `rowspan`. Nella seconda parte del modulo imparerai a costruire form completi per raccogliere dati dall'utente: campi di input di ogni tipo, aree di testo, menu a tendina, caselle di controllo, pulsanti di opzione, etichette accessibili e validazione nativa. Al termine del modulo metterai in pratica tutto quanto appreso con due Mini Progetti guidati: un curriculum scolastico realizzato con le tabelle, e un modulo di iscrizione realizzato con i form.

---

<a id="indice-modulo"></a>

## Indice del Modulo 4

- [8.1 Perché utilizzare le tabelle](#81-perche-utilizzare-le-tabelle)
- [8.2 Struttura base: `<table>`, `<tr>`, `<td>`, `<th>`](#82-struttura-base-table-tr-td-th)
- [8.3 Intestazione, corpo e piè di tabella](#83-intestazione-corpo-e-pie-di-tabella)
- [8.4 Unire celle: `colspan` e `rowspan`](#84-unire-celle-colspan-e-rowspan)
- [8.5 Esempio completo](#85-esempio-completo)
- [9.1 Perché utilizzare i form](#91-perche-utilizzare-i-form)
- [9.2 Il tag `<form>` e i suoi attributi](#92-il-tag-form-e-i-suoi-attributi)
- [9.3 Campi di input](#93-campi-di-input)
- [9.4 Area di testo e menu a tendina](#94-area-di-testo-e-menu-a-tendina)
- [9.5 Checkbox e radio button](#95-checkbox-e-radio-button)
- [9.6 Etichette e accessibilità: `<label>`, `<fieldset>`, `<legend>`](#96-etichette-e-accessibilita-label-fieldset-legend)
- [9.7 Validazione HTML nativa](#97-validazione-html-nativa)
- [9.8 Esempio completo](#98-esempio-completo)
- [Mini Progetto: Curriculum Scolastico](#mini-progetto-curriculum-scolastico)
- [Mini Progetto: Modulo di Iscrizione](#mini-progetto-modulo-di-iscrizione)
- [Esercizi del Modulo 4](#esercizi-del-modulo-4)
- [Riepilogo del Modulo 4](#riepilogo-del-modulo-4)

---

<a id="81-perche-utilizzare-le-tabelle"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 8.1 Perché utilizzare le tabelle

Le tabelle HTML servono a rappresentare **dati tabulari**: informazioni che hanno senso logico solo se organizzate in righe e colonne, come un orario scolastico, una pagella o un listino prezzi.

> ⚠️ **Attenzione** — Le tabelle non vanno mai utilizzate per impaginare l'intera pagina Web (posizionare menu, colonne di testo, immagini affiancate). Questo era un errore comune negli anni '90 e 2000: oggi per il layout si usano CSS, Flexbox e Grid, che vedremo nei Moduli 8 e 9 di questo corso. Le tabelle servono esclusivamente per dati realmente tabulari.

---

<a id="82-struttura-base-table-tr-td-th"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 8.2 Struttura base: `<table>`, `<tr>`, `<td>`, `<th>`

Una tabella HTML si costruisce con quattro tag fondamentali:

| Tag | Significato |
| --- | --- |
| `<table>` | contenitore dell'intera tabella |
| `<tr>` | *table row*, una riga |
| `<th>` | *table header*, una cella di intestazione |
| `<td>` | *table data*, una cella di dato |

```html
<table>
  <tr>
    <th>Materia</th>
    <th>Voto</th>
  </tr>
  <tr>
    <td>Matematica</td>
    <td>8</td>
  </tr>
  <tr>
    <td>Informatica</td>
    <td>9</td>
  </tr>
</table>
```

Ogni `<tr>` deve contenere lo stesso numero di celle (`<td>` o `<th>`), altrimenti la tabella risulta sbilanciata e difficile da leggere, sia per l'utente sia per gli screen reader.

---

<a id="83-intestazione-corpo-e-pie-di-tabella"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 8.3 Intestazione, corpo e piè di tabella

Le tabelle professionali dividono la struttura in tre sezioni semantiche:

| Tag | Ruolo |
| --- | --- |
| `<thead>` | intestazione della tabella |
| `<tbody>` | corpo dei dati |
| `<tfoot>` | eventuale riepilogo finale |

```html
<table>
  <thead>
    <tr>
      <th>Prodotto</th>
      <th>Prezzo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Quaderno</td>
      <td>2,50 €</td>
    </tr>
    <tr>
      <td>Penna</td>
      <td>1,20 €</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Totale</td>
      <td>3,70 €</td>
    </tr>
  </tfoot>
</table>
```

> 💡 **Approfondimento** — Suddividere la tabella in `<thead>`, `<tbody>` e `<tfoot>` non cambia l'aspetto visivo di base, ma comunica al browser, ai motori di ricerca e agli screen reader quale porzione di tabella è intestazione e quale è dato. È inoltre il prerequisito per poter applicare stili CSS differenziati alle tre sezioni, come vedremo nei moduli successivi.

---

<a id="84-unire-celle-colspan-e-rowspan"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 8.4 Unire celle: `colspan` e `rowspan`

Quando una cella deve occupare più colonne o più righe si usano gli attributi `colspan` e `rowspan`.

```html
<table>
  <tr>
    <th colspan="2">Orario Lezioni</th>
  </tr>
  <tr>
    <td>Lunedì</td>
    <td>Matematica</td>
  </tr>
</table>
```

`colspan="2"` fa sì che la cella di intestazione occupi lo spazio di due colonne. `rowspan` funziona allo stesso modo, ma in verticale, facendo occupare a una cella lo spazio di più righe.

---

<a id="85-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 8.5 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Tabelle HTML</title>
</head>
<body>

    <h1>Orario Scolastico</h1>

    <table>
        <thead>
            <tr>
                <th>Giorno</th>
                <th>Materia</th>
                <th>Aula</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Lunedì</td>
                <td>Matematica</td>
                <td>12</td>
            </tr>
            <tr>
                <td>Martedì</td>
                <td>Informatica</td>
                <td>Lab 2</td>
            </tr>
        </tbody>
    </table>

</body>
</html>
```

---

## ✅ Best Practice

✔ Utilizzare le tabelle solo per dati realmente tabulari, mai per il layout della pagina.

✔ Suddividere sempre tabelle lunghe con `<thead>`, `<tbody>` e `<tfoot>`.

✔ Verificare che ogni `<tr>` contenga lo stesso numero di celle.

## ❌ Errori comuni

❌ Costruire il layout di una pagina intera con `<table>`.

❌ Dimenticare `<thead>` e `<tbody>` in tabelle lunghe, rendendole meno leggibili e meno accessibili.

❌ Usare `colspan` o `rowspan` senza verificare che il numero totale di celle per riga resti coerente.

---

<a id="91-perche-utilizzare-i-form"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.1 Perché utilizzare i form

Un form (modulo) è lo strumento che permette a una pagina Web di raccogliere dati dall'utente: nome, email, messaggio, preferenze, credenziali di accesso. Ogni volta che ti registri a un sito, invii un messaggio di contatto o effettui un acquisto online, stai compilando un form.

> ⚠️ **Attenzione** — HTML costruisce solo l'interfaccia del form. L'invio effettivo dei dati a un server, la loro elaborazione e il salvataggio richiedono un linguaggio lato server (PHP, Node.js, Python...), che non fa parte di questo corso. Qui impari a costruire correttamente la struttura, che è il prerequisito indispensabile prima di qualunque elaborazione lato server.

---

<a id="92-il-tag-form-e-i-suoi-attributi"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.2 Il tag `<form>` e i suoi attributi

Ogni form comincia con il tag `<form>`, che possiede due attributi principali:

| Attributo | Significato |
| --- | --- |
| `action` | l'indirizzo a cui vengono inviati i dati |
| `method` | il metodo di invio: `get` o `post` |

```html
<form action="/invio.php" method="post">
  <!-- campi del form -->
</form>
```

`get` invia i dati visibili nell'URL (adatto per ricerche), `post` li invia in modo invisibile (adatto per dati sensibili come le password).

---

<a id="93-campi-di-input"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.3 Campi di input

Il tag `<input>` è il cuore dei form. Cambia comportamento in base all'attributo `type`:

| Type | Utilizzo |
| --- | --- |
| `text` | testo libero su una riga |
| `email` | verifica automaticamente il formato email |
| `password` | nasconde i caratteri digitati |
| `number` | accetta solo valori numerici |
| `date` | mostra un selettore di data |
| `tel` | numero di telefono |

```html
<input type="text" name="nome" placeholder="Inserisci il tuo nome">
<input type="email" name="email" placeholder="nome@esempio.it">
<input type="password" name="password">
<input type="date" name="data_nascita">
```

L'attributo `name` è obbligatorio: è l'identificativo con cui il valore del campo verrà trasmesso. L'attributo `placeholder` mostra un testo guida che scompare alla digitazione, ma non sostituisce mai una `<label>`, che vedremo nel paragrafo 9.6.

---

<a id="94-area-di-testo-e-menu-a-tendina"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.4 Area di testo e menu a tendina

Per testi più lunghi si utilizza `<textarea>`; per un elenco di opzioni tra cui scegliere si utilizza `<select>` con i suoi `<option>`.

```html
<textarea name="messaggio" rows="4" cols="30"></textarea>

<select name="corso">
  <option value="html">HTML &amp; CSS</option>
  <option value="ai">Intelligenza Artificiale</option>
  <option value="blockchain">Blockchain &amp; Web3</option>
</select>
```

Gli attributi `rows` e `cols` di `<textarea>` definiscono rispettivamente il numero di righe e la larghezza visibile dell'area di testo.

---

<a id="95-checkbox-e-radio-button"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.5 Checkbox e radio button

Le caselle di controllo (`checkbox`) permettono scelte multiple indipendenti; i pulsanti di opzione (`radio`) permettono una sola scelta all'interno di un gruppo.

```html
<input type="checkbox" name="privacy" id="privacy">
<label for="privacy">Accetto il trattamento dei dati</label>

<input type="radio" name="livello" value="base" id="base">
<label for="base">Base</label>
<input type="radio" name="livello" value="avanzato" id="avanzato">
<label for="avanzato">Avanzato</label>
```

> 💡 **Approfondimento** — Tutti i pulsanti radio che appartengono allo stesso gruppo di scelta devono condividere lo stesso valore di `name` (in questo caso `livello`). È proprio il `name` condiviso a dire al browser "questi pulsanti si escludono a vicenda": se assegni `name` diversi, l'utente potrà selezionarli tutti contemporaneamente, vanificando lo scopo del radio button.

---

<a id="96-etichette-e-accessibilita-label-fieldset-legend"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.6 Etichette e accessibilità: `<label>`, `<fieldset>`, `<legend>`

Un errore diffusissimo tra i principianti è dimenticare il tag `<label>`. La label non è un dettaglio estetico: collega semanticamente un testo a un campo, permettendo a chi usa uno screen reader di capire cosa deve inserire, e rendendo cliccabile l'intera etichetta, non solo il piccolo quadratino del checkbox.

```html
<label for="nome">Nome:</label>
<input type="text" id="nome" name="nome">
```

L'attributo `for` della label deve coincidere esattamente con l'attributo `id` del campo collegato.

Quando un form ha più sezioni logiche, conviene raggrupparle con `<fieldset>` e dare un titolo al gruppo con `<legend>`:

```html
<fieldset>
  <legend>Dati anagrafici</legend>
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome">
</fieldset>
```

---

<a id="97-validazione-html-nativa"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.7 Validazione HTML nativa

HTML5 permette di validare i dati senza scrivere JavaScript, grazie ad alcuni attributi:

| Attributo | Effetto |
| --- | --- |
| `required` | il campo non può essere lasciato vuoto |
| `minlength` / `maxlength` | numero minimo/massimo di caratteri |
| `min` / `max` | valore minimo/massimo (per numeri e date) |
| `pattern` | espressione regolare che il valore deve rispettare |

```html
<input type="text" name="nome" required minlength="2">
<input type="number" name="eta" min="14" max="19">
```

Se un campo obbligatorio viene lasciato vuoto, il browser blocca l'invio del form e mostra automaticamente un messaggio di errore, senza bisogno di scrivere codice aggiuntivo.

---

<a id="98-esempio-completo"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 9.8 Esempio completo

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Form di Contatto</title>
</head>
<body>

    <h1>Contattaci</h1>

    <form action="/invio.php" method="post">

        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="messaggio">Messaggio:</label><br>
        <textarea id="messaggio" name="messaggio" rows="4" cols="30"></textarea><br><br>

        <button type="submit">Invia</button>

    </form>

</body>
</html>
```

---

## ✅ Best Practice

✔ Collegare sempre ogni campo del form a una `<label>` tramite `for` / `id`.

✔ Usare il `type` più corretto per ogni input (`email`, `number`, `date`...): migliora l'esperienza utente e riduce gli errori di inserimento.

✔ Raggruppare campi correlati con `<fieldset>` nei form complessi.

✔ Sfruttare la validazione HTML nativa (`required`, `pattern`, `min`, `max`) prima di pensare a soluzioni più complesse.

## ❌ Errori comuni

❌ Dimenticare l'attributo `name` sui campi input: senza `name` il valore non viene mai inviato.

❌ Usare `placeholder` al posto della `label`: il placeholder scompare alla digitazione e non è accessibile.

❌ Assegnare `name` diversi a pulsanti radio dello stesso gruppo di scelta.

---

<a id="mini-progetto-curriculum-scolastico"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 🛠️ Mini Progetto: Curriculum Scolastico

**Obiettivo:** realizzare, usando esclusivamente HTML e tabelle, la pagina di un curriculum scolastico strutturato in tre sezioni: dati anagrafici, percorso di studi, competenze.

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Curriculum Scolastico</title>
</head>
<body>

  <h1>Curriculum Scolastico</h1>

  <h2>Dati Anagrafici</h2>
  <table>
    <tbody>
      <tr>
        <th>Nome</th>
        <td>Mario Rossi</td>
      </tr>
      <tr>
        <th>Data di nascita</th>
        <td>12/05/2008</td>
      </tr>
      <tr>
        <th>Classe</th>
        <td>4ª Liceo Scientifico</td>
      </tr>
    </tbody>
  </table>

  <h2>Percorso di Studi</h2>
  <table>
    <thead>
      <tr>
        <th>Anno</th>
        <th>Istituto</th>
        <th>Esito</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2021-2024</td>
        <td>Liceo Scientifico Statale</td>
        <td>Promosso</td>
      </tr>
      <tr>
        <td>2024-2025</td>
        <td>Liceo Scientifico Statale</td>
        <td>In corso</td>
      </tr>
    </tbody>
  </table>

  <h2>Competenze</h2>
  <table>
    <thead>
      <tr>
        <th>Competenza</th>
        <th>Livello</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>HTML &amp; CSS</td>
        <td>Base</td>
      </tr>
      <tr>
        <td>Lingua Inglese</td>
        <td>B1</td>
      </tr>
    </tbody>
  </table>

</body>
</html>
```

**Consegna:** amplia il progetto aggiungendo una quarta tabella "Esperienze extrascolastiche", con almeno due righe, e usa `colspan` per un titolo di sezione che occupi l'intera larghezza della tabella.

---

<a id="mini-progetto-modulo-di-iscrizione"></a>

**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

## 🛠️ Mini Progetto: Modulo di Iscrizione

**Obiettivo:** realizzare un form completo di iscrizione a un corso, applicando label, fieldset, validazione nativa e i principali tipi di input visti nel modulo.

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Modulo di Iscrizione</title>
</head>
<body>

  <h1>Modulo di Iscrizione al Corso</h1>

  <form action="/iscrizione.php" method="post">

    <fieldset>
      <legend>Dati Anagrafici</legend>

      <label for="nome">Nome:</label>
      <input type="text" id="nome" name="nome" required minlength="2"><br><br>

      <label for="cognome">Cognome:</label>
      <input type="text" id="cognome" name="cognome" required minlength="2"><br><br>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>

      <label for="data_nascita">Data di nascita:</label>
      <input type="date" id="data_nascita" name="data_nascita" required><br><br>
    </fieldset>

    <fieldset>
      <legend>Corso Scelto</legend>

      <label for="corso">Seleziona un corso:</label>
      <select id="corso" name="corso">
        <option value="html">HTML &amp; CSS</option>
        <option value="ai">Intelligenza Artificiale</option>
        <option value="blockchain">Blockchain &amp; Web3</option>
      </select><br><br>

      <p>Livello di partenza:</p>
      <input type="radio" id="base" name="livello" value="base">
      <label for="base">Base</label><br>
      <input type="radio" id="avanzato" name="livello" value="avanzato">
      <label for="avanzato">Avanzato</label><br><br>
    </fieldset>

    <fieldset>
      <legend>Note</legend>
      <label for="note">Eventuali note:</label><br>
      <textarea id="note" name="note" rows="4" cols="40"></textarea><br><br>

      <input type="checkbox" id="privacy" name="privacy" required>
      <label for="privacy">Accetto il trattamento dei dati personali</label><br><br>
    </fieldset>

    <button type="submit">Invia Iscrizione</button>

  </form>

</body>
</html>
```

**Consegna:** aggiungi al form un campo `tel` per il numero di telefono (opzionale, senza `required`) e un campo `number` per l'età, con `min="14"` e `max="99"`.

---

<a id="esercizi-del-modulo-4"></a>

## 🧪 Esercizi del Modulo 4

Svolgi i seguenti esercizi in ordine, riutilizzando e ampliando il sito personale costruito nei moduli precedenti.

1. **Tabella oraria** — Crea una tabella con 3 colonne (Giorno, Materia, Aula) e 5 righe, usando correttamente `<thead>` e `<tbody>`.
2. **Titolo unito** — Modifica la tabella dell'esercizio 1 aggiungendo una riga superiore con una cella di intestazione che occupi tutta la larghezza tramite `colspan`.
3. **Form di contatto** — Nella pagina `contatti.html` del tuo sito, crea un form con campi Nome, Email, Messaggio e un pulsante di invio, con tutte le label correttamente collegate tramite `for` / `id`.
4. **Validazione** — Aggiungi al form dell'esercizio 3 la validazione nativa: Nome e Email obbligatori, Messaggio con minimo 10 caratteri.
5. **Scelte multiple** — Crea un piccolo form con 3 pulsanti radio (Principiante, Intermedio, Avanzato) correttamente raggruppati con lo stesso `name`, e un checkbox per l'accettazione della privacy.

---

<a id="riepilogo-del-modulo-4"></a>

## 📌 Riepilogo del Modulo 4

In questo modulo hai imparato:

- Come rappresentare dati tabulari con `<table>`, `<tr>`, `<td>` e `<th>`.
- Come strutturare tabelle professionali con `<thead>`, `<tbody>` e `<tfoot>`.
- Come unire celle in orizzontale e in verticale con `colspan` e `rowspan`.
- Come costruire un form con il tag `<form>` e gli attributi `action` e `method`.
- Come utilizzare i principali campi di input (`text`, `email`, `password`, `number`, `date`), le aree di testo, i menu a tendina, i checkbox e i radio button.
- Come rendere un form accessibile con `<label>`, `<fieldset>` e `<legend>`.
- Come validare i dati direttamente in HTML, senza JavaScript, tramite `required`, `minlength`, `min`, `max` e `pattern`.

Nel prossimo modulo — **Modulo 5: HTML Semantico e Progetto Finale HTML** — metterai insieme tutto quanto imparato finora per costruire un sito Web multipagina completo, semantico e ben strutturato.

---
**⬆️ [Torna all'Indice del Modulo](#indice-modulo)**

*Materiale didattico — Prof. Giuseppe Carnabuci per la piattaforma gcprof-academy.com*