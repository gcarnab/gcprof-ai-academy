# 📖 Guida Operativa di Sviluppo: gcprof-ai-academy

Benvenuto nel motore di sviluppo dell'Academy. Questa guida mappa i punti chiave dell'applicazione, descrivendo l'interazione tra i moduli per consentire interventi rapidi, sicuri e senza regressioni anche a chi non conosce l'applicazione.

---

## 🛠️ 1. Architettura di Sistema e Flusso Dati

L'applicazione è un ecosistema moderno basato su **Next.js (App Router)**, ottimizzato per infrastrutture serverless ed elaborazioni dati rapide.

* **Dominio & Hosting:** Il codice è ospitato su **Vercel** (`gcprof-ai-academy.vercel.app`) ed è associato al dominio acquistato su **Cloudflare** (`gcprof-academy.com`).
* **Database & Auth:** Gestiti interamente tramite **Supabase**. Le operazioni amministrative lato server utilizzano il client privato `supabaseAdmin` configurato con la chiave di sistema `SUPABASE_SERVICE_ROLE_KEY`.
* **Logging:** Centralizzato ed effimero in produzione. In locale scrive su file system (`/logs/app.log`), mentre su Vercel si appoggia allo `stdout` standard (catturato nella dashboard dei log di Vercel) per preservare le performance serverless ed evitare eccezioni di sola lettura.

---

## 📂 2. Mappatura Modulare del Codice (FileSystem Insight)

Il progetto adotta un'architettura suddivisa per **Features** (funzionalità verticali isolate e autocontenute):

### 📊 Area Amministrazione & Statistiche (`@/features/admin/stats`)
* `services/adminStatsService.ts`  
    Il motore di aggregazione del backend. Esegue query parallele via Supabase su `user_sessions`, `user_page_views`, `users` e `courses`. Normalizza i dati trasformandoli in **oggetti piatti di tipo chiave-valore** (`Record<string, number>`) pronti per i grafici.
* `components/charts/`  
    Contiene i moduli visuali basati su **Recharts**, tutti integrati con le legende e protetti da deprecazioni:
    * `DonutChartCard.tsx` & `PieChartCard.tsx`: Grafici circolari flessibili. Non utilizzano il tag deprecato `<Cell />`; i colori vengono associati nativamente nell'array dati (`fill`).
    * `BarChartCard.tsx`: Grafico a barre verticali per l'andamento del traffico orario.
    * `HorizontalBarChartCard.tsx`: Grafico a barre orizzontali avanzato per il tempo di studio degli studenti, con supporto dinamico alle classi di appartenenza sia nell'asse Y che nel Tooltip custom.

### 🛡️ Servizi di Supporto e Infrastruttura (`@/lib`)
* `lib/logger.ts`  
    Fornisce l'istanza globale `logger` (utilizzare rigorosamente l'iniziale minuscola). Gestisce i livelli `DEBUG`, `INFO`, `WARN`, `ERROR` e blocca autonomamente la scrittura su disco in ambiente di produzione.

---

## 🌓 3. Linee Guida per lo Sviluppo (Standard del Progetto)

Ogni sviluppatore deve attenersi alle seguenti regole tassative per mantenere il codice pulito e coerente:

### 1. Gestione del Tema (Light/Dark)
Tutti i componenti visuali devono supportare il double-theme senza colori esadecimali hardcoded nei testi o nei bordi. Usare le utilità di Tailwind o le variabili CSS globali dell'app:
* Sfondi e Bordi: `bg-background`, `border-border`
* Testi e Titoli: `text-foreground`, `text-muted-foreground`
* In Recharts: Usare `var(--border)`, `var(--background)`, `var(--foreground)` all'interno delle proprietà degli assi o dei tooltip.

### 2. Variabili d'Ambiente (`.env`)
Nessun parametro numerico, di configurazione o soglia deve essere hardcoded nel codice. Estrarre sempre i valori da `process.env` fornendo un fallback di sicurezza.  
*Esempio logistica log:* `process.env.LOG_LEVEL`, `process.env.ENABLE_FILE_LOGGING`.

### 3. Tracciamento e Logging
I `console.log` tradizionali vanno sostituiti o affiancati dal logger di sistema per garantire uniformità nei log distribuiti su Vercel:
```typescript
import { logger } from "@/lib/logger";

logger.info("Statistiche elaborate correttamente per la dashboard.");
logger.error("Errore durante il recupero dei dati di sessione:", error);