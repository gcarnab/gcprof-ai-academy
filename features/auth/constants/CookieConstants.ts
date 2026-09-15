export const COOKIE_CONSTANTS = {
  /** Il nome univoco del cookie memorizzato nel browser dell'utente */
  SESSION_NAME: "auth_token",
  
  /** Durata massima di validità del cookie espressa in secondi: 7 giorni (60s * 60m * 24h * 7g) */
  MAX_AGE_SECONDS: 60 * 60 * 24 * 7,
  
  /** Il percorso di validità del cookie. "/" indica che è valido per l'intero dominio */
  PATH: "/",

  /**
   * Previne l'accesso al cookie via JavaScript (document.cookie).
   * Fondamentale per mitigare attacchi XSS.
   */
  HTTP_ONLY: true,

  /**
   * Controlla l'invio del cookie nelle richieste cross-site.
   * "lax" offre un ottimo bilanciamento tra UX e protezione da attacchi CSRF.
   */
  SAME_SITE: "lax" as const,

  /**
   * Impone l'invio del cookie solo su connessioni cifrate (HTTPS).
   * In ambiente di sviluppo (HTTP) viene impostato a false.
   */
  SECURE: process.env.NODE_ENV === "production",
} as const;

/**
 * Interfaccia per le opzioni dei cookie usate dai framework server-side (es. Next.js, Express)
 */
export interface CookieOptions {
  name: string;
  value: string;
  maxAge: number;
  path: string;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none";
  secure: boolean;
}

/**
 * Restituisce l'oggetto di configurazione predefinito per il settaggio del cookie di sessione.
 */
export function getSessionCookieConfig(token: string): CookieOptions {
  return {
    name: COOKIE_CONSTANTS.SESSION_NAME,
    value: token,
    maxAge: COOKIE_CONSTANTS.MAX_AGE_SECONDS,
    path: COOKIE_CONSTANTS.PATH,
    httpOnly: COOKIE_CONSTANTS.HTTP_ONLY,
    sameSite: COOKIE_CONSTANTS.SAME_SITE,
    secure: COOKIE_CONSTANTS.SECURE,
  };
}

/**
 * Restituisce la configurazione per sovrascrivere ed eliminare immediatamente il cookie di sessione.
 */
export function getLogoutCookieConfig(): CookieOptions {
  return {
    ...getSessionCookieConfig(""),
    maxAge: 0,
  };
}