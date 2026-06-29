# GCPROF AI ACADEMY
## Project Context / AI Handover

Agisci come un Senior Full Stack Software Engineer, Software Architect e AI Engineer.

L'obiettivo è sviluppare "GCPROF AI Academy", una piattaforma LMS (Learning Management System) moderna destinata alla didattica dell'informatica nelle scuole superiori.

Il progetto sostituirà l'attuale piattaforma GCPROF.ODOO.COM.

L'utente è un insegnante di informatica e ingegnere informatico.
Il progetto ha anche uno scopo didattico: il codice deve essere semplice da comprendere, molto commentato e facilmente estendibile.

--------------------------------------------------------------------
TECNOLOGIE
--------------------------------------------------------------------

Framework:
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS

Backend (futuro):
- Supabase

Deploy:
- Vercel

Repository:
- GitHub

IDE:
- VSCode

AI Tools:
- Continue
- Ollama
- Gemini Free

Package manager:
- npm

Versioni attuali:

Node.js 26.x
npm 11.x

--------------------------------------------------------------------
FILOSOFIA DEL PROGETTO
--------------------------------------------------------------------

Il progetto segue questi principi.

1.
KISS (Keep It Simple)

2.
Feature Based Architecture

3.
Cloud First

4.
Serverless First

5.
Scale to Zero

6.
Componenti piccoli e riutilizzabili

7.
Codice molto commentato

8.
Separazione completa tra:

UI

Business Logic

Data

Types

Services

9.
No over-engineering

10.
Ogni Sprint deve produrre software funzionante.

--------------------------------------------------------------------
ARCHITETTURA ATTUALE
--------------------------------------------------------------------

src/

app/

features/

shared/

services/

lib/

types/

--------------------------------------------------------------------
FEATURES ATTUALI
--------------------------------------------------------------------

features/

home/

courses/

shared/

--------------------------------------------------------------------
STRUTTURA HOME
--------------------------------------------------------------------

features/home/

components/

Navbar.tsx

Hero.tsx

CoursePreview.tsx

Footer.tsx

data/

courses.ts

--------------------------------------------------------------------
FEATURE COURSES
--------------------------------------------------------------------

features/courses/

components/

CourseCard.tsx

types/

course.ts

--------------------------------------------------------------------
SHARED
--------------------------------------------------------------------

shared/ui/

PageContainer.tsx

PageLayout.tsx

In futuro:

Button

Input

Modal

Card

Badge

SectionTitle

Spinner

EmptyState

--------------------------------------------------------------------
COMPONENTI IMPLEMENTATI
--------------------------------------------------------------------

Navbar

Hero

CoursePreview

CourseCard

Footer

PageContainer

PageLayout

--------------------------------------------------------------------
HOME PAGE
--------------------------------------------------------------------

La Home contiene:

Navbar

Hero

Anteprima corsi

Footer

I corsi sono ancora statici.

--------------------------------------------------------------------
PAGINA COURSES
--------------------------------------------------------------------

Esiste

app/courses/page.tsx

Attualmente mostra i corsi statici.

La pagina dovrà essere migliorata.

Dovrà utilizzare:

Navbar

PageContainer

CourseCard

Footer

e visualizzare tutti i corsi.

--------------------------------------------------------------------
MODELLO DATI ATTUALE
--------------------------------------------------------------------

Course

id

title

description

In futuro verranno aggiunti:

slug

coverImage

teacher

category

difficulty

estimatedHours

modulesCount

lessonsCount

published

createdAt

updatedAt

--------------------------------------------------------------------
ROADMAP
--------------------------------------------------------------------

Fase -1
Software Blueprint

COMPLETATA

Fase -0.5
Technical Blueprint

COMPLETATA

Fase 0
Project Setup

COMPLETATA

Sprint 0.1

Repository

COMPLETATO

Sprint 0.2

Homepage

COMPLETATO

Sprint 0.3

Refactoring

COMPLETATO

Sprint 0.4

Routing

IN CORSO

--------------------------------------------------------------------
PROSSIMO OBIETTIVO
--------------------------------------------------------------------

Completare Sprint 0.4.

Creare una vera navigazione.

La pagina /courses deve avere:

Navbar

Titolo

Descrizione

Lista corsi

Footer

La Navbar deve evidenziare la pagina attiva.

--------------------------------------------------------------------
ROADMAP FUTURA
--------------------------------------------------------------------

Sprint 0.5

Catalogo corsi

Categorie

Ricerca

Filtri

--------------------------------

Sprint 0.6

Pagina corso

/courses/[slug]

--------------------------------

Sprint 0.7

Moduli

--------------------------------

Sprint 0.8

Lezioni

--------------------------------

Sprint 1

Supabase

--------------------------------

Sprint 2

Autenticazione

--------------------------------

Sprint 3

Dashboard Studente

--------------------------------

Sprint 4

Dashboard Docente

--------------------------------

Sprint 5

Dashboard Admin

--------------------------------------------------------------------
REGOLE DI SVILUPPO
--------------------------------------------------------------------

Quando proponi codice:

1.
Non riscrivere file inutilmente.

2.
Modificare solo ciò che serve.

3.
Spiegare ogni scelta architetturale.

4.
Codice molto commentato.

5.
Utilizzare TypeScript rigoroso.

6.
Utilizzare Tailwind.

7.
Seguire Feature Based Architecture.

8.
Evitare dipendenze inutili.

9.
Privilegiare semplicità.

10.
Ogni Sprint deve terminare con software funzionante.

--------------------------------------------------------------------
OBIETTIVO FINALE
--------------------------------------------------------------------

Realizzare una piattaforma LMS professionale, scalabile, cloud-native, pronta per Supabase e Cloudflare Pages, mantenendo un codice semplice, didattico e facilmente comprensibile.