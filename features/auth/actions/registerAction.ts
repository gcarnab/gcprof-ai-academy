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
  const schoolTrack = (formData.get("schoolTrack") as string) || "";
  const schoolSection = (formData.get("schoolSection") as string) || "";
  const classId = formData.get("classId") as string | null;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return {
      success: false,
      error: "Tutti i campi generali sono obbligatori.",
    };
  }

  if (userType === "SCHOOL_STUDENT" && !classId) {
    return {
      success: false,
      error: "Seleziona una classe scolastica di appartenenza.",
    };
  }

  if (userType === "SCHOOL_STUDENT") {
    if (!schoolTrack) {
      return {
        success: false,
        error: "Seleziona l'indirizzo di studi.",
      };
    }

    if (!schoolSection) {
      return {
        success: false,
        error: "Seleziona la sezione.",
      };
    }
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
      userType,
      schoolTrack: userType === "SCHOOL_STUDENT" ? schoolTrack : undefined,
      schoolSection: userType === "SCHOOL_STUDENT" ? schoolSection : undefined,
      classes: userType === "SCHOOL_STUDENT" ? [className] : [],
      enrolledCourses: [],
      emailVerified: false,
    } as any);

    // 4. Salvataggio associazione classe (Solo Scuola)
    if (userType === "SCHOOL_STUDENT" && classId) {
      await supabaseAdmin
        .from("profile_classes")
        .insert({ profile_id: newUser.id, class_id: classId });
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
    });

    return {
      success: true,
      message:
        "Registrazione completata! Il tuo account è in attesa di attivazione da parte dell'amministratore.",
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
}) {
  try {
    const templateService = new MailTemplateService();
    const emailService = new EmailService();

    const { data: settingsData } = await supabaseAdmin
      .from("mail_settings")
      .select("*");
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
      user_type_label:
        params.userType === "EXTERNAL_STUDENT"
          ? "Esterno (Commerciale)"
          : "Studente Scuola",
      status: "pending",
      created_at: new Date().toLocaleString("it-IT"),
      studentName: params.displayName,
      studentEmail: params.studentEmail,
    };

    const engine = new MailTemplateEngine(contextVariables);

    // 1. WELCOME TO STUDENT
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

      let bodyText = studentTemplate.body_text_override ?? "";

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

      let bodyText = adminTemplate.body_text_override ?? "";
      bodyText += `<br/><br/>
        <strong>Tipologia Account:</strong> ${contextVariables.user_type_label}<br/>
      ${
        params.userType === "SCHOOL_STUDENT"
          ? `<strong>Classe di appartenenza:</strong> ${params.className}`
          : `<strong>Account esterno registrato.</strong>`
      } `;

      const body = engine.render(bodyText);

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #7c3aed; margin-bottom: 16px;">${title}</h2>
          <div style="color: #334155; line-height: 1.6;">${body}</div>
          <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">GCPROF Academy Backoffice</p>
        </div>
      `;
      const adminRecipient =
        process.env.GMAIL_SMTP_USER || "gcarnab74@gmail.com";
      await emailService.sendGenericEmail(adminRecipient, subject, html);
    }
  } catch (err) {
    console.error("❌ Errore durante l'invio delle email di notifica:", err);
  }
}
