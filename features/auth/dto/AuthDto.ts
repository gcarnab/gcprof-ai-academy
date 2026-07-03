import { StudentUser } from "../domain/user";

/**
 * 📝 DTO per l'input del caso d'uso di Registrazione Studente
 */
export interface RegisterStudentInputDto {
  email: string;
  passwordRaw: string;
  firstName: string;
  lastName: string;
  studentClass: string; // Es: "5A", "3B"
}

/**
 * 🔑 DTO per l'input del caso d'uso di Login Utente
 */
export interface LoginCredentialsDto {
  email: string;
  passwordRaw: string;
}

/**
 * 🛡️ DTO Sicuro dell'Utente (Modello di Dominio privato del PasswordHash)
 */
export type PublicUserDto = Omit<StudentUser, "passwordHash">;

/**
 * 📦 DTO di output aggregato restituito a seguito di un Login con successo
 */
export interface AuthResultDto {
  user: PublicUserDto;
  token: string;
}