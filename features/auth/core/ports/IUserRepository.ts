/**
 * Definisce il contratto di persistenza dei dati utente. 
 * Isola completamente il core del sistema dallo storage reale 
 * (memoria, database SQL, NoSQL o API di terze parti).
 */

import { StudentUser } from "../domain/user";


/**
 * 🏛️ Port: Interfaccia per l'accesso e la persistenza dei dati utente.
 */
export interface IUserRepository {
  /** Cerca un utente nel sistema tramite il suo indirizzo email (case-insensitive) */
  findByEmail(email: string): Promise<StudentUser | null>;

  /** Cerca un utente nel sistema tramite il suo identificativo univoco */
  findById(id: string): Promise<StudentUser | null>;

  /** Salva un nuovo utente escludendo i campi generati automaticamente dall'infrastruttura */
  create(user: Omit<StudentUser, "id" | "createdAt" | "updatedAt">): Promise<StudentUser>;

  /** Aggiorna i campi specificati di un utente esistente, preservando l'immutabilità di id e data di creazione */
  update(id: string, user: Partial<Omit<StudentUser, "id" | "createdAt">>): Promise<StudentUser>;

  /** Elimina definitivamente un utente dal sistema tramite ID */
  delete(id: string): Promise<boolean>;

  /** Restituisce l'elenco completo di tutti gli utenti registrati */
  list(): Promise<StudentUser[]>;
}