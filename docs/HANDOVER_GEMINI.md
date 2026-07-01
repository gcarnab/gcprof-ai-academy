Agisci come un Esperto Senior Software Architect specializzato in Next.js, React e Clean Architecture. Dobbiamo riprendere il refactoring Enterprise v2 dell'applicazione "gcprof-ai-academy". Il progetto è stato appena aggiornato a Next.js 16.2.9 (con Turbopack abilitato), React 19.2.7 e TypeScript 5. 

L'obiettivo è migrare l'autenticazione da un vecchio sistema sincrono file-based (v1) a un'architettura disaccoppiata basata su Ports & Adapters, Server Actions di React 19 e persistenza reale (v2).

### 🛠️ STATO ATTUALE DELL'ARCHITETTURA (LATO AUTH)
Abbiamo già implementato e stabilizzato con successo i seguenti livelli all'interno di `features/auth/core/`:

1. DOMINIO & PORT (Disaccoppiati):
   - Entità `StudentUser`: contiene `id`, `email`, `passwordHash`, `role` ('admin'|'student'), `displayName`, `classes: string[]`, `createdAt`, `updatedAt`.
   - Interfaccia `IUserRepository`: definisce i contratti asincroni `findByEmail`, `create`, e `list`.
   - Interfaccia `ITokenService` e costanti di configurazione per il JWT.

2. INFRASTRUTTURA & ADAPTERS CORE:
   - `JoseTokenService`: gestisce emissione, verifica e decodifica dei JWT tramite la libreria 'jose' (Edge-ready).
   - `NextCookieService`: incapsula la gestione dei cookie crittografati HTTP-Only tramite le API native `cookies()` di Next.js.

3. SERVER ACTIONS (React 19):
   - `registerAction.ts`: esegue la validazione dell'input con Zod, l'hashing della password con `bcryptjs`, e salva l'utente tramite il repository corrente.
   - `loginAction.ts`: verifica le credenziali, genera il JWT e setta il cookie HTTP-Only.
   - `logoutAction.ts`: rimuove in sicurezza il cookie di sessione.
   - `getSessionAction.ts`: recupera, convalida e decodifica il token lato server per passarlo al client.

4. SICUREZZA ROUTING (Next.js 16):
   - File `proxy.ts` (radice del progetto): sostituisce la vecchia convenzione `middleware.ts`. Intercetta le richieste a livello Edge, convalida il JWT e gestisce i redirect di sicurezza per le rotte protette (`/dashboard`, `/admin`) e per quelle di autenticazione.

5. LAYER CLIENT & REATTIVITÀ:
   - `AuthContext.tsx`: React Context client-side che inizializza lo stato dell'utente tramite `getSessionAction`, esponendo l'hook custom `useAuth()`.
   - `LoginDialog.tsx`: componente Shadcn/UI stabilizzato. Usa `useTransition` di React 19 per invocare asincronamente `loginAction` e, in caso di successo, chiama `refreshSession()` del contesto per aggiornare istantaneamente la UI senza ricaricare la pagina. Include il toggle per mostrare/nascondere la password.
   - `Navbar.tsx`: componente ufficiale aggiornato per consumare i dati reattivi di `useAuth` utilizzando le proprietà v2 (`user.displayName` e l'array `user.classes`).

---

### 🗄️ STATO ATTUALE DELLA PERSISTENZA: MIGRAZIONE VERSO SUPABASE
Abbiamo scartato i database in memoria volatili e abbiamo scelto Supabase (PostgreSQL) come database definitivo per la persistenza reale dell'Academy. 

Abbiamo già completato il "GRADO 1" della migrazione:
1. Abbiamo installato l'SDK ufficiale `@supabase/supabase-js`.
2. Abbiamo configurato il file `.env.local` con `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (utilizziamo la service role perché operiamo esclusivamente in un ambiente server sicuro tramite Server Actions, bypassando le RLS).
3. Abbiamo eseguito nello SQL Editor di Supabase il seguente script DDL per creare lo schema della tabella `public.users`:

```sql
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
    display_name TEXT NOT NULL,
    classes TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_email ON public.users(email);