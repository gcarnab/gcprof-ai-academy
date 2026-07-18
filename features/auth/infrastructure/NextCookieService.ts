import { cookies } from "next/headers";

import { COOKIE_CONSTANTS } from "../constants/CookieConstants";
import { ICookieService } from "../ports/ICookieService";

/**
 * Adapter Next.js per la gestione del cookie di autenticazione.
 *
 * Incapsula completamente l'API `cookies()` di Next.js mantenendo
 * l'applicazione indipendente dai dettagli dell'infrastruttura.
 */
export class NextCookieService implements ICookieService {
  /**
   * Salva il JWT in un cookie HttpOnly.
   */
  async setSession(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_CONSTANTS.SESSION_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_CONSTANTS.MAX_AGE_SECONDS,
      path: COOKIE_CONSTANTS.PATH,
    });
  }

  /**
   * Restituisce il JWT memorizzato nel cookie di sessione.
   */
  async getSession(): Promise<string | null> {
    const cookieStore = await cookies();

    const cookie = cookieStore.get(COOKIE_CONSTANTS.SESSION_NAME);

    return cookie?.value ?? null;
  }

  /**
   * Elimina il cookie di sessione.
   */
  async clearSession(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_CONSTANTS.SESSION_NAME);
  }
}