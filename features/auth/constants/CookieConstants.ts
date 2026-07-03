/**
 * Questo file contiene le direttive di configurazione per il posizionamento del cookie 
 * di sessione nel browser dell'utente. Centralizza le opzioni di sicurezza fondamentali 
 * per mitigare gli attacchi di tipo Cross-Site Scripting (XSS) e Cross-Site Request Forgery (CSRF).
 */

/**
 * 🍪 Configurazioni di sicurezza per la gestione del Cookie di Sessione.
 */
export const COOKIE_CONSTANTS = {
  /** Il nome univoco del cookie memorizzato nel browser dell'utente */
  SESSION_NAME: "auth_token",
  
  /** Durata massima di validità del cookie espressa in secondi: 7 giorni (60s * 60m * 24h * 7g) */
  MAX_AGE_SECONDS: 60 * 60 * 24 * 7,
  
  /** Il percorso di validità del cookie. "/" indica che è valido per l'intero dominio dell'Academy */
  PATH: "/",
} as const;