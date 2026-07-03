/**
 * Questo file definisce gli stati dell'account e i ruoli utente ammessi nel sistema. 
 * Utilizziamo l'operatore di TypeScript as const per trasformare gli oggetti in tipi 
 * letterali immutabili e di sola lettura (Readonly).
 */

/**
 * 👥 Ruoli di sistema supportati dall'applicazione.
 * Definiscono i livelli di accesso alle risorse e alle rotte protette.
 */
export const AUTH_ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
} as const;

/**
 * 🔄 Stati possibili di un account utente.
 * Permettono all'amministratore di bloccare l'accesso o gestire l'approvazione manuale.
 */
export const ACCOUNT_STATUS = {
  PENDING: "pending", // Registrato ma in attesa di verifica (es. email)
  ACTIVE: "active",   // Account pienamente operativo
  BLOCKED: "blocked",  // Account sospeso dall'amministratore (impedisce il login)
} as const;

// Esportazione dei tipi derivati per la tipizzazione forte nel dominio
export type AuthRole = typeof AUTH_ROLES[keyof typeof AUTH_ROLES];
export type AccountStatus = typeof ACCOUNT_STATUS[keyof typeof ACCOUNT_STATUS];