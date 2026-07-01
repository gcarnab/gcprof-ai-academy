/**
 * Viene sollevata in fase di registrazione se l'indirizzo email inserito dallo studente 
 * è già associato a un account attivo all'interno del repository.
 */

import { AuthError } from "./AuthError";

/**
 * 👥 Eccezione sollevata quando si tenta di registrare un'email già presente nel sistema.
 */
export class UserAlreadyExistsError extends AuthError {
  constructor(email: string) {
    super(
      `L'indirizzo email '${email}' è già associato a un account esistente.`, 
      "USER_ALREADY_EXISTS"
    );
  }
}