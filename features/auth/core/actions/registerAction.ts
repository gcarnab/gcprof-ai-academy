"use server";

import { getUserRepository } from "@/features/auth/core/infrastructure/RepositoryFactory";
import { BcryptPasswordService } from "@/features/auth/core/infrastructure/BcryptPasswordService";
// Se usi un client supabase custom per operazioni dirette/relazionali, importalo, altrimenti la logica passa dal repository o client.
// Qui assumiamo l'utilizzo di una transazione o del client integrato per gestire la tabella pivot Many-to-Many.
import { createClient } from "@supabase/supabase-js"; 

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function registerAction(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const classId = formData.get("classId") as string; // 🎯 Riceve l'ID della classe dal Form

  if (!firstName || !lastName || !email || !password || !confirmPassword || !classId) {
    return { success: false, error: "Tutti i campi sono obbligatori, inclusa la classe." };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Le password non coincidono." };
  }

  try {
    const repo = getUserRepository();

    // 1. Verifica se l'utente esiste già
    const existingUser = await repo.findByEmail(email);
    if (existingUser) {
      return { success: false, error: "Questa email è già registrata." };
    }

    // 2. Recupera i dettagli della classe per popolare l'array testuale locale (denormalizzazione per compatibilità V2)
    const { data: classData, error: classErr } = await supabaseAdmin
      .from("academy_classes")
      .select("slug")
      .eq("id", classId)
      .single();

    if (classErr || !classData) {
      return { success: false, error: "La classe selezionata non è valida." };
    }

    // 3. Hash della password
    const passwordService = new BcryptPasswordService();
    const passwordHash = await passwordService.hash(password);

    // 4. Creazione utente principale (Stato PENDING)
    const newUser = await repo.create({
      email,
      passwordHash,
      role: "student",
      status: "pending",
      displayName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      classes: [classData.slug], // Allineato al tipo string[] della V2 per compatibilità immediata
      enrolledCourses: [],
      emailVerified: false,
    } as any);

    // 5. Inserimento nella tabella relazionale pivot per robustezza DB
    const { error: pivotError } = await supabaseAdmin
      .from("user_classes_pivot")
      .insert({ user_id: newUser.id, class_id: classId });

    if (pivotError) {
      console.error("Errore nell'inserimento della tabella pivot:", pivotError);
      // Logica opzionale di rollback se necessaria
    }

    return {
      success: true,
      message: "Registrazione completata! Il tuo account è in attesa di attivazione da parte dell'amministratore.",
    };
  } catch (error: any) {
    console.error("Error in registerAction:", error);
    return { success: false, error: "Errore durante la registrazione. Riprova più tardi." };
  }
}