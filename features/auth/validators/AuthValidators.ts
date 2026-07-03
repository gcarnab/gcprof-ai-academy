/**
 * Il file definisce gli schemi immutabili per la registrazione e il login. 
 * Sfrutta le funzionalità di Zod per ripulire le stringhe (trim()), 
 * normalizzare le email (toLowerCase()) e imporre vincoli di complessità 
 * sulle password per motivi di sicurezza applicativa.
 */

import { z } from "zod";

/**
 * 📝 Schema di validazione per i dati di registrazione di un nuovo studente.
 * Controlla la correttezza formale dei dati e impone regole sulla complessità della password.
 */
export const registerStudentSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Il nome deve contenere almeno 2 caratteri." })
    .max(50, { message: "Il nome non può superare i 50 caratteri." })
    .trim(),
    
  lastName: z
    .string()
    .min(2, { message: "Il cognome deve contenere almeno 2 caratteri." })
    .max(50, { message: "Il cognome non può superare i 50 caratteri." })
    .trim(),
    
  email: z
    .string()
    .email({ message: "Inserisci un indirizzo email valido." })
    .toLowerCase()
    .trim(),
    
  passwordRaw: z
    .string()
    .min(8, { message: "La password deve contenere almeno 8 caratteri." })
    .regex(/[A-Z]/, { message: "La password deve contenere almeno una lettera maiuscola." })
    .regex(/[0-9]/, { message: "La password deve contenere almeno un numero." }),
    
  studentClass: z
    .string()
    .min(2, { message: "La classe selezionata non è valida." })
    .max(10, { message: "La classe non può superare i 10 caratteri." })
    .toUpperCase()
    .trim(),
});

/**
 * 🔑 Schema di validazione per le credenziali di Login.
 * Impedisce l'invio di form vuoti o email strutturalmente non valide.
 */
export const loginCredentialsSchema = z.object({
  email: z
    .string()
    .email({ message: "Inserisci un indirizzo email valido." })
    .toLowerCase()
    .trim(),
    
  passwordRaw: z
    .string()
    .min(1, { message: "La password è obbligatoria." }),
});

// Inferiamo e definiamo i tipi TypeScript statici derivati direttamente dagli schemi Zod.
// Questo garantisce l'allineamento automatico tra convalida a runtime e controllo di tipo in compilazione.
export type RegisterStudentInput = z.infer<typeof registerStudentSchema>;
export type LoginCredentialsInput = z.infer<typeof loginCredentialsSchema>;