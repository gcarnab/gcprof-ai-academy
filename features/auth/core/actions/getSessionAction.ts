/**
 * Il client non può leggere direttamente il cookie HTTP-Only 
 * (perché è blindato contro gli attacchi XSS). Creiamo quindi 
 * un'azione sicura che gira sul server, decodifica il token e 
 * restituisce al client solo i dati essenziali dell'utente.
 */

"use server";

import { NextCookieService } from "../infrastructure/NextCookieService";
import { JoseTokenService } from "../infrastructure/JoseTokenService";
import { ITokenPayload } from "../ports/ITokenService";

export async function getSessionAction(): Promise<ITokenPayload | null> {
  try {
    const cookieService = new NextCookieService();
    const tokenService = new JoseTokenService();
    
    const token = await cookieService.getSession();
    if (!token) return null;

    // Verifichiamo la validità del token prima di passarlo al client
    const isValid = await tokenService.verify(token);
    if (!isValid) return null;

    return tokenService.decode(token);
  } catch (error) {
    return null;
  }
}