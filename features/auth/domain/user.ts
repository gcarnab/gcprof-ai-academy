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
  
  // Campi del profilo utente
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;          // 🎯 NUOVO: URL pubblico della foto del profilo

    // 🎯 Nuovi campi anagrafici scolastici
  userType?: "SCHOOL_STUDENT" | "EXTERNAL_STUDENT" | null;
  schoolTrack?: string;
  schoolSection?: string;
  
  emailVerified?: boolean;
  enrolledCourses?: string[];
}