import { ICookieService } from "../ports/ICookieService";
import { cookies } from "next/headers";

// Definiamo il nome definitivo e centralizzato per evitare disallineamenti infrastrutturali
const AUTH_TOKEN_NAME = "auth_token";
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export class NextCookieService implements ICookieService {
  /**
   * 🎯 Salva il token emesso in un cookie HttpOnly cifrato lato server
   */
  async setSession(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN_NAME, token, {
      httpOnly: true, // Protezione totale da XSS (JavaScript non può leggerlo)
      secure: process.env.NODE_ENV === "production", // Viaggia solo su HTTPS in produzione
      sameSite: "lax",
      maxAge: ONE_WEEK_SECONDS,
      path: "/",
    });
  }

  /**
   * 🔍 Recupera il valore del token direttamente dalle intestazioni della richiesta
   */
  async getSession(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(AUTH_TOKEN_NAME);
    return cookie ? cookie.value : null;
  }

  /**
   * 🚪 Rimuove fisicamente il cookie invalidando la sessione client-server
   */
  async clearSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_TOKEN_NAME);
  }
}