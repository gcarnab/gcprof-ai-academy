/**
 * È la classe base astratta per tutti gli errori del modulo di autenticazione. 
 * Definisce la struttura comune inserendo un codice di errore (code) utile per 
 * tracciamenti futuri o internazionalizzazione dei messaggi, e ripulisce lo stack 
 * trace per non esporre file interni nei log di Vercel.
 */

/**
 * 🛑 Classe base per tutte le eccezioni del modulo di autenticazione.
 * Estende l'oggetto nativo Error per garantire la conformità con gli standard di runtime.
 */
export class AuthError extends Error {
  /** Codice identificativo univoco dell'errore (es. 'INVALID_CREDENTIALS') */
  public readonly code: string;

  constructor(message: string, code: string = "AUTH_GENERAL_ERROR") {
    super(message);
    this.name = this.constructor.name;
    this.code = code;

    // Cattura lo stack trace corretto isolando il costruttore corrente (specifico di Node.js/Vercel)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}