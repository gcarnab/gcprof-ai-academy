/**
 * Definisce la struttura dati del payload e i metodi necessari alla 
 * gestione del ciclo di vita dei token di sessione (JWT).
 */

/**
 * 🎟️ Struttura informativa minima contenuta all'interno del Token di autenticazione.
 */
export interface ITokenPayload {
  id: string;
  email: string;
  role: "admin" | "student";
  classes: string[];
  displayName: string;
}

/**
 * 🎫 Port: Interfaccia per la generazione, validazione e decodifica dei token di sicurezza.
 */
export interface ITokenService {
  /** Genera un token firmato partendo da un payload, con una durata personalizzabile */
  generate(payload: ITokenPayload, expiresIn?: string): Promise<string>;

  /** Verifica la firma e l'integrità del token. Restituisce il payload se valido, null altrimenti */
  verify(token: string): Promise<ITokenPayload | null>;

  /** Estrae il contenuto del payload dal token senza verificarne la firma crittografica */
  decode(token: string): ITokenPayload | null;

  /** Controlla in modo rapido se il token ha superato la sua data di scadenza temporale */
  isExpired(token: string): boolean;
}