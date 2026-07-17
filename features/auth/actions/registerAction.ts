"use server";

import { EmailService } from "@/features/admin/mail/services/EmailService";
import { MailTemplateService } from "@/features/admin/mail/services/MailTemplateService";
import { MailTemplateEngine } from "@/features/admin/mail/services/MailTemplateEngine";
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";
import { MailTemplateKeys } from "@/features/admin/mail/constants/MailTemplateKeys";
import { getUserRepository } from "../infrastructure/RepositoryFactory";
import { BcryptPasswordService } from "../infrastructure/BcryptPasswordService";


const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function mapMailSettingsToVariables(
  settings: { id: string; value: string }[],
): Record<string, string> {
  return settings.reduce(
    (acc, item) => {
      acc[item.id.toLowerCase()] = item.value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export async function registerAction(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  
  const userType = (formData.get("userType") as string) || "SCHOOL_STUDENT";
  const classId = formData.get("classId") as string | null;
  const courseId = formData.get("courseId") as string | null;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return { success: false, error: "Tutti i campi generali sono obbligatori." };
  }

  if (userType === "SCHOOL_STUDENT" && !classId) {
    return { success: false, error: "Seleziona una classe scolastica di appartenenza." };
  }
  if (userType === "EXTERNAL_STUDENT" && !courseId) {
    return { success: false, error: "Seleziona il corso a cui intendi iscriverti." };
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
    }

    let className = "Esterno";
    let classSlug = "esterno";
    let requestedCourseTitle = "";

    // 1. Gestione studente scuola
    if (userType === "SCHOOL_STUDENT" && classId) {
      const { data: classData, error: classErr } = await supabaseAdmin
        .from("academy_classes")
        .select("name, slug")
        .eq("id", classId)
        .single();

      if (classErr || !classData) {
        return { success: false, error: "La classe selezionata non è valida." };
      }
      className = classData.name;
      classSlug = classData.slug;
    }

    // 2. Gestione utente esterno
    if (userType === "EXTERNAL_STUDENT" && courseId) {
      const { data: courseData, error: courseErr } = await supabaseAdmin
        .from("courses")
        .select("title")
        .eq("id", courseId)
        .single();

      if (courseErr || !courseData) {
        return { success: false, error: "Il corso selezionato non è valido o inesistente." };
      }
      requestedCourseTitle = courseData.title;
    }

    const passwordService = new BcryptPasswordService();
    const passwordHash = await passwordService.hash(password);
    const displayName = `${firstName} ${lastName}`;

    // 3. Creazione del profilo base tramite Repository
    const newUser = await repo.create({
      email,
      passwordHash,
      role: "student",
      status: "pending",
      displayName,
      firstName,
      lastName,
      classes: userType === "SCHOOL_STUDENT" ? [className] : [],
      enrolledCourses: [],
      emailVerified: false,
    } as any);

    // 🔥 HOTFIX: Forza il salvataggio di user_type sul DB bypassando i limiti del Repository vecchio
    const { error: updateTypeError } = await supabaseAdmin
      .from("profiles")
      .update({ user_type: userType })
      .eq("id", newUser.id);

    if (updateTypeError) {
      logger.error("Errore durante il salvataggio forzato di user_type:", updateTypeError);
    }

    // 4. Salvataggio associazione classe (Solo Scuola)
    if (userType === "SCHOOL_STUDENT" && classId) {
      await supabaseAdmin
        .from("profile_classes")
        .insert({ profile_id: newUser.id, class_id: classId });
    }

    // 5. Salvataggio iscrizione corso in stato "pending" (Solo Esterno)
    if (userType === "EXTERNAL_STUDENT" && courseId) {
      const { error: coursePivotError } = await supabaseAdmin
        .from("profile_courses")
        .insert({
          profile_id: newUser.id,
          course_id: courseId,
          status: "pending",
        });

      if (coursePivotError) {
        console.error("Errore inserimento iscrizione pending:", coursePivotError.message);
      }
    }

    // 6. Invio Email con dettagli
    await startEmailDispatches({
      firstName,
      lastName,
      displayName,
      studentEmail: email,
      className,
      classSlug,
      userType,
      requestedCourseTitle,
    });

    return {
      success: true,
      message: userType === "EXTERNAL_STUDENT"
        ? `Registrazione completata! La tua richiesta di iscrizione al corso "${requestedCourseTitle}" è stata inoltrata all'amministratore per l'approvazione.`
        : "Registrazione completata! Il tuo account scolastico è in attesa di attivazione.",
    };
  } catch (error: any) {
    console.error("Error in registerAction:", error);
    return { success: false, error: "Errore durante la registrazione." };
  }
}

async function startEmailDispatches(params: {
  firstName: string;
  lastName: string;
  displayName: string;
  studentEmail: string;
  className: string;
  classSlug: string;
  userType: string;
  requestedCourseTitle?: string;
}) {
  try {
    const templateService = new MailTemplateService();
    const emailService = new EmailService();

    const { data: settingsData } = await supabaseAdmin.from("mail_settings").select("*");
    const globalVariables = mapMailSettingsToVariables(settingsData ?? []);

    const contextVariables = {
      ...globalVariables,
      first_name: params.firstName,
      last_name: params.lastName,
      display_name: params.displayName,
      email: params.studentEmail,
      class_name: params.className,
      class_slug: params.classSlug,
      user_type: params.userType,
      requested_course: params.requestedCourseTitle || "Nessuno",
      user_type_label: params.userType === "EXTERNAL_STUDENT" ? "Esterno (Commerciale)" : "Studente Scuola",
      status: "pending",
      created_at: new Date().toLocaleString("it-IT"),
      studentName: params.displayName,
      studentEmail: params.studentEmail,
    };

    const engine = new MailTemplateEngine(contextVariables);

    // 1. WELCOME TO STUDENT
    const studentTemplate = await templateService.getTemplate(MailTemplateKeys.WELCOME);
    if (studentTemplate && studentTemplate.enabled) {
      const subject = engine.render(studentTemplate.subject ?? "Registrazione Ricevuta");
      const title = engine.render(studentTemplate.title_override ?? studentTemplate.subject ?? "");
      
      let bodyText = studentTemplate.body_text_override ?? "";
      if (params.userType === "EXTERNAL_STUDENT" && params.requestedCourseTitle) {
        bodyText += `<br/><br/><strong>Corso richiesto:</strong> ${params.requestedCourseTitle}<br/>Riceverai una notifica non appena l'amministratore avrà attivato la tua licenza.`;
      }
      
      const body = engine.render(bodyText);

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-bottom: 16px;">${title}</h2>
          <div style="color: #334155; line-height: 1.6;">${body}</div>
          <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">Email generata automaticamente da gcprof-academy.com</p>
        </div>
      `;
      await emailService.sendGenericEmail(params.studentEmail, subject, html);
    }

    // 2. ADMIN NOTIFICATION
    const adminTemplate = await templateService.getTemplate(MailTemplateKeys.ADMIN_NEW_REGISTRATION);
    if (adminTemplate && adminTemplate.enabled) {
      const subject = engine.render(adminTemplate.subject ?? "Nuovo Studente Registrato");
      const title = engine.render(adminTemplate.title_override ?? adminTemplate.subject ?? "");
      
      let bodyText = adminTemplate.body_text_override ?? "";
      bodyText += `<br/><br/>
        <strong>Tipologia Account:</strong> ${contextVariables.user_type_label}<br/>
        ${params.userType === "EXTERNAL_STUDENT" ? `<strong>Corso da Abilitare:</strong> ${params.requestedCourseTitle}` : `<strong>Classe di appartenenza:</strong> ${params.className}`}
      `;
      const body = engine.render(bodyText);

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #7c3aed; margin-bottom: 16px;">${title}</h2>
          <div style="color: #334155; line-height: 1.6;">${body}</div>
          <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">GCPROF AI Academy Backoffice</p>
        </div>
      `;
      const adminRecipient = process.env.GMAIL_SMTP_USER || "gcarnab74@gmail.com";
      await emailService.sendGenericEmail(adminRecipient, subject, html);
    }
  } catch (err) {
    console.error("❌ Errore durante l'invio delle email di notifica:", err);
  }
}