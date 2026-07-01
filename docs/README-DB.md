# 📘 Documentazione Database: GCPROF AI Academy (V2)

Il database di **GCPROF AI Academy** è ospitato su PostgreSQL tramite l'infrastruttura **Supabase**. Lo schema si basa su un'architettura ibrida: autenticazione centralizzata accoppiata a un sistema di permessi basato su Classi Relazionali e Stati Approvativi (`pending`, `active`, `blocked`).

---

## 🗺️ Schema Concettuale e Relazioni

[ auth.users ] (Supabase Nativo)
│
▼ (Estensione 1:1)
[ public.profiles ]
│
▼ (Relazione N:M)
[ public.profile_classes ] ◄─── [ public.academy_classes ]

### Elenco Relazioni:
* **`auth.users` ─── `public.profiles` (1:1):** Ogni utente registrato genera automaticamente un profilo esteso all'interno dello schema pubblico tramite Foreign Key vincolata.
* **`public.profiles` ─── `public.profile_classes` (1:N):** Un profilo può essere associato a più record di giunzione.
* **`public.academy_classes` ─── `public.profile_classes` (1:N):** Una classe accoglie al suo interno molteplici record di studenti.

---

## 🗂️ Dizionario dei Dati (Tabelle)

### 1. `public.academy_classes`
Memorizza le classi o le coorti di studenti attive nell'Academy.

| Campo | Tipo | Vincoli | Descrizione |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY`, Default `gen_random_uuid()` | Identificativo univoco della classe. |
| `name` | `VARCHAR(255)` | `NOT NULL`, `UNIQUE` | Nome commerciale della classe. |
| `description` | `TEXT` | `NULL` | Note aggiuntive o programma della classe. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL`, Default `now()` | Timestamp di creazione. |

### 2. `public.profiles`
Estende l'anagrafica utente e ne traccia lo stato operativo e i ruoli nel sistema.

| Campo | Tipo | Vincoli | Descrizione |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY`, `REFERENCES auth.users` | Collegamento diretto all'utente di autenticazione. |
| `first_name` | `VARCHAR(255)` | `NULL` | Nome dello studente/admin. |
| `last_name` | `VARCHAR(255)` | `NULL` | Cognome dello studente/admin. |
| `display_name` | `VARCHAR(510)` | `NULL` | Campo calcolato automaticamente dal trigger (`Nome + Cognome`). |
| `role` | `VARCHAR(50)` | `NOT NULL`, Check (`admin`, `student`) | Ruolo d'accesso al portale. |
| `status` | `VARCHAR(50)` | `NOT NULL`, Check (`pending`, `active`, `blocked`) | Stato approvazione iscrizione (Default: `pending`). |

### 3. `public.profile_classes`
Tabella pivot d'intersezione per implementare la struttura Molti-a-Molti (un utente può appartenere a più classi contemporaneamente).

| Campo | Tipo | Vincoli | Descrizione |
| :--- | :--- | :--- | :--- |
| `profile_id` | `UUID` | `PRIMARY KEY`, `REFERENCES profiles` | ID dell'utente. |
| `class_id` | `UUID` | `PRIMARY KEY`, `REFERENCES academy_classes` | ID della classe assegnata. |
| `assigned_at` | `TIMESTAMPTZ` | `NOT NULL`, Default `now()` | Data di assegnazione o iscrizione alla classe. |

---

## 🔒 Livello di Sicurezza (RLS)

Tutte le tabelle adottano regole di **Row Level Security (RLS)** per garantire l'isolamento dei dati:
1. **Anonimi:** Nessun diritto di lettura o scrittura sulle tabelle relazionali.
2. **Studenti (`status = active`):** Possono visualizzare l'elenco delle classi disponibili e hanno l'accesso esclusivo in lettura al proprio ed unico profilo utente.
3. **Studenti (`status = pending`):** Accesso limitato alle sole schede pubbliche; respinti dalle Server Action dei corsi protetti.
4. **Admin:** Superano i controlli RLS tramite validazione dell'attributo nel JWT di Supabase (`auth.jwt() ->> 'role' = 'admin'`), ottenendo permessi completi di `SELECT`, `INSERT`, `UPDATE` e `DELETE`.