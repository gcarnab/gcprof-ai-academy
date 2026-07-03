/**
 * Questo file definisce i parametri crittografici utilizzati dal servizio di 
 * emissione dei JSON Web Tokens (JWT). Mantiene i parametri allineati agli 
 * standard industriali di firma e convalida dei token.
 */

/**
 * 🎟️ Parametri crittografici e di configurazione per i JSON Web Tokens (JWT).
 */
export const TOKEN_CONSTANTS = {
  /** L'algoritmo di firma simmetrica utilizzato (HMAC con SHA-256) */
  ALGORITHM: "HS256",
  
  /** Durata di validità del token prima della scadenza naturale (7 giorni) */
  DEFAULT_EXPIRATION: "7d",
  
  /** La stringa dell'emittente (Issuer) per verificare che il token provenga esclusivamente da questo sistema */
  ISSUER: "gcprof-ai-academy-auth-v2",
} as const;