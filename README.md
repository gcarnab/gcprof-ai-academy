# 🎓 GCProf AI Academy

GCProf AI Academy è una piattaforma LMS (Learning Management System) e CMS leggera, moderna e performante, progettata per la gestione e la fruizione di corsi didattici del Prof. Giuseppe Carnabuci. 

Sviluppata con l'architettura moderna di **Next.js**, la piattaforma offre un'esperienza fluida e sicura sia per gli studenti che per l'amministratore.

🌐 **Sito Live:** [https://gcprof-ai-academy.vercel.app/](https://gcprof-ai-academy.vercel.app/)

---

## 🚀 Funzionalità Principali

- **👥 Autenticazione con Ruoli:** Gestione globale dello stato utente (`Student` e `Admin`) tramite React Context, protetta da route guard per i contenuti privati.
- **📚 Gestione Corsi Integrata:** Un'area Admin dedicata consente di modificare corsi, moduli e lezioni in tempo reale con salvataggio automatico e persistenza selettiva nel `localStorage`.
- **🎬 Engine di Rendering Lezioni (`LessonRenderer`):** Struttura modulare ed estensibile capace di adattare e renderizzare dinamicamente video di YouTube e documenti multimediali da Google Drive.
- **📫 Modulo Contatti con Server Actions:** Un'interfaccia contatti accattivante e integrata con i principali canali social, che sfrutta le **Next.js Server Actions** e il servizio cloud **Resend** per l'invio sicuro di email verso la casella Gmail del docente.
- **⚡ Zero Mismatch di Idratazione:** Struttura HTML semantica ottimizzata per eliminare i conflitti di rendering server/client tipici delle applicazioni SSR complesse.

---

## 🛠️ Stack Tecnologico

- **Framework:** Next.js 15+ (con supporto nativo a Turbopack)
- **Linguaggio:** TypeScript (Tipizzazione forte e rigorosa per evitare errori a runtime)
- **Stile & UI:** Tailwind CSS + Shadcn UI / Radix Primitives
- **E-mail Service:** Resend API (SDK ufficiale per l'invio protetto lato server)
- **Hosting & Deploy:** Vercel (CI/CD automatico ad ogni push)
- **Database** Supabase

---

## 💻 Installazione e Avvio Locale

### 1. Clonare il repository
```bash
git clone [https://github.com/tuo-username/gcprof-ai-academy.git](https://github.com/tuo-username/gcprof-ai-academy.git)
cd gcprof-ai-academy