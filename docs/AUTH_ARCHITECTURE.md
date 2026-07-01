# 🏛️ Enterprise Authentication Module Architecture

Questo documento descrive l'architettura di autenticazione di seconda generazione (v2) implementata in `features/auth/core/`. Il sistema abbandona completamente il `localStorage` in favore di un approccio decentralizzato basato su Clean Architecture e disaccoppiamento infrastrutturale.

## 🎯 Principi Guida

1. **Single Responsibility Principle (SRP):** Ogni classe o servizio ha un'unica ragione di cambiamento. L'unione di stato, storage e routing nel vecchio Context è stata scissa.
2. **Dependency Inversion Principle (DIP):** I servizi ad alto livello (`AuthService`) non dipendono da moduli a basso livello (database o librerie di crittografia), ma dipendono da astrazioni (`ports/`).
3. **Storage Agnosticism:** L'applicazione è agnostica rispetto a dove risiedono i dati. Lo switch da memoria volatile a Vercel KV o PostgreSQL richiede la modifica esclusiva della `RepositoryFactory`.

## 🔄 Flusso dei Dati (Data Flow)

```text
[Client UI Form] 
       │ (Dati Grezzi)
       ▼
[Server Action Controller] ──► (Validazione Perimetrale tramite Zod)
       │
       ▼ (DTO Validato)
[AuthService (Core)] ◄───────► [Ports / Interfaces]
       │                               │
       ▼                               ▼
[Infrastruttura Concreta]     [Adattatori Core]
(Cookie HTTP-Only, JWT)       (Memory, Bcrypt, KV)