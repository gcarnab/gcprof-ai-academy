"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { ResendEmailService } from "@/features/auth/infrastructure/ResendEmailService";
import { MailTemplateEngine } from "../services/MailTemplateEngine";

/**
 * Converte mail_settings in mappa variabili
 */
function mapMailSettingsToVariables(
  settings: { id: string; value: string }[],
): Record<string, string> {
  return settings.reduce((acc, item) => {
    acc[item.id] = item.value;
    return acc;
  }, {} as Record<string, string>);
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

    const variables = mapMailSettingsToVariables(settings ?? []);

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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2>${title}</h2>
        <div>${body}</div>
        <hr style="margin: 24px 0;" />
        <p style="font-size: 12px; color: #666;">
          Email di test — GCProf AI Academy
        </p>
      </div>
    `;

    // 5. SEND EMAIL
    const mailService = new ResendEmailService();

    const result = await mailService.sendGenericEmail(
      recipient,
      subject,
      html,
    );

    if (!result?.id) {
      throw new Error("Invio email fallito: nessun messageId restituito");
    }

    // 6. SUCCESS RESPONSE (TYPE SAFE)
    return {
      success: true,
      messageId: result.id,
    };
  } catch (error: any) {
    console.error("❌ sendTestMailAction error:", error);

    return {
      success: false,
      error: error?.message ?? "Errore sconosciuto",
    };
  }
}