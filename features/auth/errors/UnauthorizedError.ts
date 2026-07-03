/**
 * Viene utilizzata quando l'utente è autenticato ma non possiede i privilegi 
 * di ruolo minimi richiesti (es. uno studente che tenta di accedere alla 
 * Dashboard Admin) oppure se l'account è stato esplicitamente disabilitato o bloccato dal docente.
 */

import { AuthError } from "./AuthError";

/**
 * 🛡️ Eccezione sollevata in caso di accesso negato, mancanza di permessi di ruolo o account sospeso.
 */
export class UnauthorizedError extends AuthError {
  constructor(message: string = "Non disponi delle autorizzazioni necessarie per accedere a questa risorsa.") {
    super(message, "UNAUTHORIZED_ACCESS");
  }
}