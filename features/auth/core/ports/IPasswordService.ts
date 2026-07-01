/**
 * Definisce il contratto per le operazioni di sicurezza relative alle password, 
 * astraendo l'algoritmo crittografico effettivo.
 */

/**
 * 🔐 Port: Interfaccia per i servizi di hashing e verifica delle password.
 */
export interface IPasswordService {
  /** Trasforma una password in chiaro in una stringa hash crittografata non invertibile */
  hash(password: string): Promise<string>;

  /** Verifica se una password in chiaro corrisponde all'hash memorizzato nel sistema */
  verify(password: string, hash: string): Promise<boolean>;
}