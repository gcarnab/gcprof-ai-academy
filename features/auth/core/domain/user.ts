export interface StudentUser {
  id: string;
  email: string;
  displayName: string;
  role: "admin" | "student";
  status: "active" | "blocked" | "pending"; // 🎯 AGGIORNATO: Aggiunto 'pending' per la gestione iscrizioni
  createdAt: string;
  updatedAt: string;
  passwordHash: string;
  
  // 🎯 UNIFORMITÀ DEI CAMPI (Risolve TS2339)
  classes: string[];          // Array richiesto dall'adapter Supabase v2
  allowedClasses?: string[];   // Compatibilità per logiche legacy v1
  class?: string;              // Stringa d'appoggio per la UI dei moduli
  
  // Altri campi opzionali del tuo dominio
  firstName?: string;
  lastName?: string;
  emailVerified?: boolean;
  enrolledCourses?: string[];
}