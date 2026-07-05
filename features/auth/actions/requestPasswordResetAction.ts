"use server";

import { getUserRepository } from "../infrastructure/RepositoryFactory";
import { EmailService } from "@/features/admin/mail/services/EmailService";
import { MailTemplateService } from "@/features/admin/mail/services/MailTemplateService";
import { MailTemplateEngine } from "@/features/admin/mail/services/MailTemplateEngine";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function mapMailSettingsToVariables(
  settings: { id: string; value: string }[],
): Record<string, string> {
  return settings.reduce((acc, item) => {
    acc[item.id.toLowerCase()] = item.value;
    return acc;
  }, {} as Record<string, string>);
}

// 🎯 AGGIORNATO: Definita una firma di ritorno univoca e non discriminata per evitare errori in build
export async function requestPasswordResetAction(
  prevState: any, 
  formData: FormData
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, error: "L'indirizzo email è obbligatorio." };
  }

  const successFallbackResponse = {
    success: true,
    message: "Se l'indirizzo email è presente nei nostri sistemi, riceverai a breve un link di ripristino.",
  };

  try {
    const repo = getUserRepository();
    const user = await repo.findByEmail(email);

    if (!user) {
      return successFallbackResponse;
    }

    // 1. Generazione del link di reset tramite Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email: user.email.toLowerCase().trim(),
      options: {
        redirectTo: "https://gcprof-academy.com/auth/callback?next=/dashboard/reset-password",
      },
    });

    if (authError) {
      console.warn(`⚠️ Supabase Auth non ha trovato credenziali per ${user.email}: ${authError.message}`);
      return successFallbackResponse;
    }

    if (!authData?.properties?.action_link) {
      throw new Error("Impossibile generare il link di recupero password.");
    }

    const resetLink = authData.properties.action_link;

    // 2. Caricamento impostazioni globali e template dedicato dal DB
    const templateService = new MailTemplateService();
    const emailService = new EmailService();

    const { data: settingsData } = await supabaseAdmin.from("mail_settings").select("*");
    const globalVariables = mapMailSettingsToVariables(settingsData ?? []);

    const contextVariables = {
      ...globalVariables,
      studentName: user.displayName || "Studente",
      resetLink: resetLink,
    };

    const engine = new MailTemplateEngine(contextVariables);
    const resetTemplate = await templateService.getTemplate("password_reset");

    if (!resetTemplate || !resetTemplate.enabled) {
      throw new Error("Il template per il recupero password è disattivato o mancante.");
    }

    // 3. Renderizzazione sicura dei testi ed HTML Composition
    const subject = engine.render(resetTemplate.subject ?? "Ripristino Password - GCProf Academy");
    const title = engine.render(resetTemplate.title_override ?? resetTemplate.subject ?? "");
    let body = engine.render(resetTemplate.body_text_override ?? "");

    if (!body.includes(resetLink) && !resetTemplate.body_text_override?.includes("{{resetLink}}")) {
      body += `<br/><br/><a href="${resetLink}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #000; text-decoration: none; border-radius: 6px;">Ripristina la Password</a>`;
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #ef4444; margin-bottom: 16px;">${title}</h2>
        <div style="color: #334155; line-height: 1.6;">${body}</div>
        <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #64748b;">
          Hai ricevuto questo messaggio perché è stata inoltrata una richiesta di reset password per l'account associato a questa email.
        </p>
      </div>
    `;

    // 4. Invio effettivo della mail su SMTP Gmail
    await emailService.sendGenericEmail(user.email, subject, html);

    return successFallbackResponse;

  } catch (error: any) {
    console.error("❌ Errore critico in requestPasswordResetAction:", error);
    return {
      success: false,
      error: "Si è verificato un errore durante l'elaborazione della richiesta. Riprova più tardi.",
    };
  }
}