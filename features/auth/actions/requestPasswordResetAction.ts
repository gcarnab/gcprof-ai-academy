"use server";

import { getUserRepository } from "../infrastructure/RepositoryFactory";
import { EmailService } from "@/features/admin/mail/services/EmailService";
import { MailTemplateService } from "@/features/admin/mail/services/MailTemplateService";
import { MailTemplateEngine } from "@/features/admin/mail/services/MailTemplateEngine";
import { PasswordResetService } from "../services/PasswordResetService";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// 🔒 SIMPLE IN-MEMORY RATE LIMIT (per evitare doppio submit in dev/prod serverless)
const requestLock = new Map<string, number>();

function isLocked(email: string): boolean {
  const now = Date.now();
  const last = requestLock.get(email);

  if (last && now - last < 5000) return true; // 5 sec lock
  requestLock.set(email, now);
  return false;
}

function mapMailSettingsToVariables(
  settings: { id: string; value: string }[],
): Record<string, string> {
  return settings.reduce((acc, item) => {
    acc[item.id.toLowerCase()] = item.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function requestPasswordResetAction(
  prevState: any,
  formData: FormData,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, error: "L'indirizzo email è obbligatorio." };
  }

  const normalizedEmail = email.toLowerCase().trim();

  // 🔒 PROTEZIONE DOPPIO SUBMIT
  if (isLocked(normalizedEmail)) {
    return {
      success: true,
      message: "Richiesta già in elaborazione.",
    };
  }

  const successFallbackResponse = {
    success: true,
    message:
      "Se l'indirizzo email è presente nei nostri sistemi, riceverai a breve un link di ripristino.",
  };

  try {
    const repo = getUserRepository();
    const user = await repo.findByEmail(normalizedEmail);

    // 🔒 SECURITY: sempre risposta neutra
    if (!user) {
      return successFallbackResponse;
    }

    // =========================================================
    // 🔐 RESET TOKEN SERVICE
    // =========================================================
    const resetService = new PasswordResetService();

    // ⚠️ evita multi-token per stesso user (cleanup logico)
    await supabaseAdmin
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("user_id", user.id)
      .eq("used", false);

    const token = await resetService.createToken(user.id);

    // 💡 🌐 GENERAZIONE DINAMICA DELL'URL
    // Legge la variabile d'ambiente ed elimina lo slash finale se presente per evitare URL malformati (es. //auth)
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://gcprof-academy.com").replace(/\/$/, "");
    const resetLink = `${baseUrl}/auth/reset-password?token=${token}`;

    // =========================================================
    // 📧 TEMPLATE SYSTEM
    // =========================================================
    const templateService = new MailTemplateService();
    const emailService = new EmailService();

    const { data: settingsData } = await supabaseAdmin
      .from("mail_settings")
      .select("*");

    const globalVariables = mapMailSettingsToVariables(settingsData ?? []);

    const contextVariables = {
      ...globalVariables,
      studentName: user.displayName || "Studente",
      resetLink,
    };

    const engine = new MailTemplateEngine(contextVariables);

    const resetTemplate = await templateService.getTemplate("PASSWORD_RESET");

    if (!resetTemplate || !resetTemplate.enabled) {
      throw new Error("Template PASSWORD_RESET mancante o disabilitato.");
    }

    const subject = engine.render(
      resetTemplate.subject ?? "Ripristino Password - GCProf Academy",
    );

    const title = engine.render(
      resetTemplate.title_override ?? resetTemplate.subject ?? "",
    );

    let body = engine.render(resetTemplate.body_text_override ?? "");

    if (
      !body.includes(resetLink) &&
      !resetTemplate.body_text_override?.includes("{{resetLink}}")
    ) {
      body += `
        <br/><br/>
        <a href="${resetLink}"
           style="display:inline-block;padding:10px 20px;color:#fff;background:#000;text-decoration:none;border-radius:6px;">
          Ripristina la Password
        </a>
      `;
    }

    const html = `
      <div style="font-family: Arial; max-width:600px; margin:auto; padding:24px; border:1px solid #e2e8f0; border-radius:12px;">
        <h2 style="color:#ef4444">${title}</h2>
        <div style="color:#334155; line-height:1.6">${body}</div>
        <hr style="margin:24px 0; border-top:1px solid #e2e8f0;" />
        <p style="font-size:12px; color:#64748b;">
          Reset password request - gcprof-academy.com
        </p>
      </div>
    `;

    await emailService.sendGenericEmail(user.email, subject, html);

    return successFallbackResponse;
  } catch (error: any) {
    console.error("❌ requestPasswordResetAction error:", error);

    return {
      success: false,
      error:
        "Si è verificato un errore durante l'elaborazione della richiesta.",
    };
  }
}