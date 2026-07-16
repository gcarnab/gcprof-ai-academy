// ============================================================================
// FILE: shared/config/site.ts
// ----------------------------------------------------------------------------
// Configurazione centralizzata del sito.
// Tutte le informazioni SEO e di branding devono essere lette da qui.
// ============================================================================

export const siteConfig = {
  // ==========================================================================
  // Branding
  // ==========================================================================

  siteName:
    process.env.NEXT_PUBLIC_SITE_NAME ??
    process.env.NEXT_PUBLIC_APP_NAME ??
    "GCPROF Academy",

  subtitle:
    process.env.NEXT_PUBLIC_APP_SUBTITLE ??
    "ACADEMY",

  version:
    process.env.NEXT_PUBLIC_APP_VERSION ??
    "V 1.0",

  author:
    process.env.NEXT_PUBLIC_AUTHOR ??
    "Prof. Giuseppe Carnabuci",

  // ==========================================================================
  // URL
  // ==========================================================================

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_LOCAL_URL ??
    "http://localhost:3000",

    canonical: "/",
    
  // ==========================================================================
  // SEO
  // ==========================================================================

  description:
    process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION,

  keywords: [
    "LMS",
    "Academy",
    "E-learning",
    "Informatica",
    "Database",
    "Programmazione",
    "AI",
    "Cybersecurity",
    "Networking",
    "Scuola",
    "Docente",
    "Giuseppe Carnabuci",
  ],

  ogImage:
    process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE ??
    "/gcprof-ai-academy_logo_01.png",

  // ==========================================================================
  // Contatti
  // ==========================================================================

  mailFrom:
    process.env.MAIL_FROM ??
    "",

  adminMail:
    process.env.GMAIL_SMTP_USER ??
    "",
} as const;