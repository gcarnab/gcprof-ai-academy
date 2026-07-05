"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { EmailService } from "@/features/admin/mail/services/EmailService"; // 🎯 AGGIORNATO: Import del nuovo servizio basato su Gmail SMTP
import { MailTemplateEngine } from "../services/MailTemplateEngine";

/**
 * Converte mail_settings in mappa variabili
 */
function mapMailSettingsToVariables(
  settings: { id: string; value: string }[],
): Record<string, string> {
  return settings.reduce(
    (acc, item) => {
      acc[item.id] = item.value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export async function sendTestMailAction(
  templateKey: string,
  recipient: string,
): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    const db = getSupabaseAdmin();

    // 1. FETCH TEMPLATE
    const { data: template, error: templateError } = await db
      .from("mail_templates")
      .select("*")
      .eq("template_key", templateKey)
      .single();

    if (templateError || !template) {
      throw new Error("Template non trovato");
    }

    if (!template.enabled) {
      throw new Error("Template disabilitato");
    }

    // 2. FETCH SETTINGS (VARIABILI GLOBALI)
    const { data: settings, error: settingsError } = await db
      .from("mail_settings")
      .select("*");

    if (settingsError) {
      throw new Error("Errore caricamento mail_settings");
    }

    const globalVariables = mapMailSettingsToVariables(settings ?? []);

    const variables = {
      ...globalVariables,

      // Variabili demo per il rendering dei template
      first_name: "Mario",
      last_name: "Rossi",
      display_name: "Mario Rossi",

      email: recipient,

      class_name: "Classe Demo",
      class_slug: "classe-demo",

      // Alias retrocompatibili
      studentName: "Mario Rossi",
      studentEmail: recipient,
    };

    // 3. TEMPLATE ENGINE (SAFE RENDER)
    const engine = new MailTemplateEngine(variables);

    const subject = engine.render(template.subject ?? "");

    const title = engine.render(
      template.title_override ?? template.subject ?? "",
    );

    const body = engine.render(
      template.body_text_override ??
        "Template email non configurato correttamente",
    );

    // 4. HTML COMPOSITION
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #1e293b; margin-bottom: 16px;">${title}</h2>
        <div style="color: #334155; line-height: 1.6;">${body}</div>
        <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #64748b;">
          Email di test — GCProf AI Academy (gcprof-academy.com)
        </p>
      </div>
    `;

    // 5. SEND EMAIL VIA GMAIL SMTP
    const mailService = new EmailService();

    // Inviamo usando il metodo generico dell'EmailService che chiama il GmailProvider
    const result = await mailService.sendGenericEmail(
      recipient,
      subject,
      html,
      "GCProf Academy Test",
    );

    if (!result.success) {
      throw new Error(result.error || "Invio email fallito tramite Gmail SMTP");
    }

    // 6. SUCCESS RESPONSE (TYPE SAFE)
    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error: any) {
    console.error("❌ sendTestMailAction error:", error);

    return {
      success: false,
      error: error?.message ?? "Errore sconosciuto durante l'invio del test",
    };
  }
}
