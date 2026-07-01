/**
 * Viene sollevata dall'AuthService quando l'indirizzo email non è presente nel database o 
 * quando la password inserita non corrisponde all'hash crittografato.
 * 
 */

import { AuthError } from "./AuthError";

/**
 * 🔑 Eccezione sollevata in caso di fallimento delle credenziali (Email o Password errate).
 * Utilizza un messaggio volutamente generico per evitare vulnerabilità di enumerazione degli utenti.
 */
export class InvalidCredentialsError extends AuthError {
  constructor(message: string = "L'indirizzo email o la password inseriti non sono corretti.") {
    super(message, "INVALID_CREDENTIALS");
  }
}