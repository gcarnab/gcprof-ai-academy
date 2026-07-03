"use server";

import { getUserRepository } from "@/features/auth/infrastructure/RepositoryFactory";
import { BcryptPasswordService } from "@/features/auth/infrastructure/BcryptPasswordService";
import { ResendEmailService } from "@/features/auth/infrastructure/ResendEmailService";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function registerAction(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const classId = formData.get("classId") as string;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !classId
  ) {
    return {
      success: false,
      error: "Tutti i campi sono obbligatori, inclusa la classe.",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Le password non coincidono." };
  }

  try {
    const repo = getUserRepository();

    const isTestEmail = email.includes("+test");
    if (!isTestEmail) {
      const existingUser = await repo.findByEmail(email);
      if (existingUser) {
        return { success: false, error: "Questa email è già registrata." };
      }
    } else {
      console.log(
        `⚠️ Modalità Test: Bypass controllo unicità per l'email ${email}`,
      );
    }
   
    // 🎯 FISSATO: Selezioniamo sia 'name' che 'slug' per risolvere il disallineamento
    const { data: classData, error: classErr } = await supabaseAdmin
      .from("academy_classes")
      .select("name, slug")
      .eq("id", classId)
      .single();

    if (classErr || !classData) {
      return { success: false, error: "La classe selezionata non è valida." };
    }

    const passwordService = new BcryptPasswordService();
    const passwordHash = await passwordService.hash(password);

    const displayName = `${firstName} ${lastName}`;
    
    // 🎯 FISSATO: Salviamo classData.name nell'array classes (es. "PRIMA") coerentemente con getLiveCourses()
    // 💡 NOTA TEST: Se vuoi l'accesso immediato senza approvazione admin, cambia status in "active"
    const newUser = await repo.create({
      email,
      passwordHash,
      role: "student",
      status: "pending", 
      displayName,
      firstName,
      lastName,
      classes: [classData.name], 
      enrolledCourses: [],
      emailVerified: false,
    } as any);

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: newUser.id,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
        role: "student",
        status: "pending", // Deve matchare lo status dell'oggetto utente superiore
        created_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error(
        "Nota/Errore inserimento profili diretti:",
        profileError.message,
      );
    }

    const { error: profilePivotError } = await supabaseAdmin
      .from("profile_classes")
      .insert({ profile_id: newUser.id, class_id: classId });

    if (profilePivotError) {
      console.error(
        "Nota/Errore tabella pivot profile_classes:",
        profilePivotError.message,
      );
    }

    const { error: oldPivotError } = await supabaseAdmin
      .from("user_classes_pivot")
      .insert({ user_id: newUser.id, class_id: classId });

    if (oldPivotError) {
      console.error(
        "Nota/Errore tabella pivot obsoleta user_classes_pivot:",
        oldPivotError.message,
      );
    }

    const emailService = new ResendEmailService();
    startEmailDispatches(emailService, email, displayName, classData.slug);

    return {
      success: true,
      message:
        "Registrazione completata! Il tuo account è in attesa di attivazione da parte dell'amministratore.",
    };
  } catch (error: any) {
    console.error("Error in registerAction:", error);
    return {
      success: false,
      error: "Errore durante la registrazione. Riprova più tardi.",
    };
  }
}

function startEmailDispatches(
  service: ResendEmailService,
  studentEmail: string,
  studentName: string,
  classSlug: string,
) {
  Promise.all([
    service.sendStudentPendingEmail(studentEmail, studentName),
    service.sendAdminNotificationEmail(studentName, studentEmail, classSlug),
  ]).catch((err) => console.error("Errore invio email in background:", err));
}