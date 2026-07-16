"use server";

import { getUserRepository } from "@/features/auth/infrastructure/RepositoryFactory";
import { BcryptPasswordService } from "@/features/auth/infrastructure/BcryptPasswordService";
import { EmailService } from "@/features/admin/mail/services/EmailService";
import { MailTemplateService } from "@/features/admin/mail/services/MailTemplateService";
import { MailTemplateEngine } from "@/features/admin/mail/services/MailTemplateEngine";
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";
import { MailTemplateKeys } from "@/features/admin/mail/constants/MailTemplateKeys";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Converte mail_settings in mappa variabili globali
 */
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
      logger.warn(
        `⚠️ Modalità Test: Bypass controllo unicità per l'email ${email}`,
      );
    }

    // Recuperiamo le informazioni della classe selezionata
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

    // Il repository effettua l'inserimento direttamente sulla tabella 'profiles'
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

    // Associazione della classe all'interno della tabella pivot corrente
    const { error: profilePivotError } = await supabaseAdmin
      .from("profile_classes")
      .insert({ profile_id: newUser.id, class_id: classId });

    if (profilePivotError) {
      console.error(
        "Nota/Errore tabella pivot profile_classes:",
        profilePivotError.message,
      );
    }

    // 🎯 FIX CRITICO VERCEL: Aggiunto l'await esplicito per bloccare la chiusura dell'istanza serverless
    // In questo modo costringiamo il server ad attendere l'invio SMTP prima di rispondere al client
    await startEmailDispatches({
      firstName,
      lastName,
      displayName,
      studentEmail: email,
      className: classData.name,
      classSlug: classData.slug,
    });

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

/**
 * Gestisce il caricamento dei template ed il dispatching delle email attendendo il completamento
 */
async function startEmailDispatches(params: {
  firstName: string;
  lastName: string;
  displayName: string;
  studentEmail: string;
  className: string;
  classSlug: string;
}) {
  try {
    const templateService = new MailTemplateService();
    const emailService = new EmailService();

    // 1. Carica le impostazioni globali delle variabili
    const { data: settingsData } = await supabaseAdmin
      .from("mail_settings")
      .select("*");
    const globalVariables = mapMailSettingsToVariables(settingsData ?? []);

    // 2. Unisce le variabili globali con i dati dinamici dello studente corrente
    const contextVariables = {
      ...globalVariables,

      // Variabili utente
      first_name: params.firstName,
      last_name: params.lastName,
      display_name: params.displayName,

      email: params.studentEmail,

      // Variabili classe
      class_name: params.className,
      class_slug: params.classSlug,

      // Stato registrazione
      status: "pending",

      // Timestamp evento
      created_at: new Date().toLocaleString("it-IT"),

      // Alias retrocompatibili
      studentName: params.displayName,
      studentEmail: params.studentEmail,
    };

    const engine = new MailTemplateEngine(contextVariables);

    // --- INVIO EMAIL ALLO STUDENTE (PENDING) ---
    const studentTemplate = await templateService.getTemplate(
      MailTemplateKeys.WELCOME,
    );
    if (studentTemplate && studentTemplate.enabled) {
      const subject = engine.render(
        studentTemplate.subject ?? "Registrazione Ricevuta",
      );
      const title = engine.render(
        studentTemplate.title_override ?? studentTemplate.subject ?? "",
      );
      const body = engine.render(studentTemplate.body_text_override ?? "");

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-bottom: 16px;">${title}</h2>
          <div style="color: #334155; line-height: 1.6;">${body}</div>
          <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">Email generata automaticamente da gcprof-academy.com</p>
        </div>
      `;
      const result = await emailService.sendGenericEmail(
        params.studentEmail,
        subject,
        html,
      );

      if (!result.success) {
        console.error("❌ Invio email di benvenuto fallito:", result.error);
      } else {
        logger.warn("✅ Email di benvenuto inviata:", result.messageId);
      }
    }

    // --- INVIO NOTIFICA ALL'ADMIN ---

    const adminTemplate = await templateService.getTemplate(
      MailTemplateKeys.ADMIN_NEW_REGISTRATION,
    );
    if (adminTemplate && adminTemplate.enabled) {
      const subject = engine.render(
        adminTemplate.subject ?? "Nuovo Studente Registrato",
      );
      const title = engine.render(
        adminTemplate.title_override ?? adminTemplate.subject ?? "",
      );
      const body = engine.render(adminTemplate.body_text_override ?? "");

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #7c3aed; margin-bottom: 16px;">${title}</h2>
          <div style="color: #334155; line-height: 1.6;">${body}</div>
          <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">GCPROF AI Academy Backoffice</p>
        </div>
      `;
      const adminRecipient =
        process.env.GMAIL_SMTP_USER || "gcarnab74@gmail.com";
      await emailService.sendGenericEmail(adminRecipient, subject, html);
    }
  } catch (err) {
    console.error(
      "❌ Errore durante l'elaborazione dei template email dinamici:",
      err,
    );
  }
}
