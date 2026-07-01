/**
 * Astrae i meccanismi di manipolazione dei cookie del browser. 
 * Questo permette al modulo logico di rimanere agnostico rispetto 
 * ai metodi di gestione dei cookie di Next.js (next/headers).
 */

/**
 * 🍪 Port: Interfaccia per l'astrazione e la gestione dei Cookie di sessione sul server.
 */
export interface ICookieService {
  /** Memorizza in modo sicuro il token di sessione nel browser dell'utente */
  setSession(token: string): Promise<void>;

  /** Recupera il token di sessione corrente, se presente */
  getSession(): Promise<string | null>;

  /** Distrugge il cookie di sessione, eseguendo l'operazione di logout a livello infrastrutturale */
  clearSession(): Promise<void>;
}