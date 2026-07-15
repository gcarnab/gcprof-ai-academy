"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { EmailService } from "@/features/admin/mail/services/EmailService";
import { MailTemplateEngine } from "@/features/admin/mail/services/MailTemplateEngine";

/**
 * Converte mail_settings in mappa variabili
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

async function sendTemplateEmail(
  templateKey: string,
  recipient: string,
  variables: Record<string, string>,
): Promise<void> {
  const db = getSupabaseAdmin();

  const { data: template, error: templateError } = await db
    .from("mail_templates")
    .select("*")
    .eq("template_key", templateKey)
    .single();

  if (templateError || !template) {
    throw new Error(`Template ${templateKey} non trovato.`);
  }

  if (!template.enabled) {
    throw new Error(`Template ${templateKey} disabilitato.`);
  }

  const { data: settings } = await db
    .from("mail_settings")
    .select("*");

  const globalVariables = mapMailSettingsToVariables(settings ?? []);

  const engine = new MailTemplateEngine({
    ...globalVariables,
    ...variables,
  });

  const subject = engine.render(template.subject ?? "");

  const title = engine.render(
    template.title_override ?? template.subject ?? "",
  );

  const body = engine.render(
    template.body_text_override ??
      "Template email non configurato correttamente.",
  );

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #ddd;border-radius:12px;">
      <h2>${title}</h2>

      <div>
        ${body}
      </div>

      <hr style="margin:24px 0"/>

      <p style="font-size:12px;color:#777">
        GCProf AI Academy
      </p>
    </div>
  `;

  const mailService = new EmailService();

  const result = await mailService.sendGenericEmail(
    recipient,
    subject,
    html,
    "GCProf AI Academy",
  );

  if (!result.success) {
    throw new Error(result.error ?? "Errore invio email.");
  }
}

/**
 * Email inviata alla consegna del quiz.
 */
export async function sendQuizSubmittedMail(
  recipient: string,
  variables: Record<string, string>,
): Promise<{ success: boolean; error?: string }> {
  try {
    await sendTemplateEmail("QUIZ_SUBMITTED", recipient, variables);
    return { success: true };
  } catch (error: any) {
    console.error("❌ Errore in sendQuizSubmittedMail:", error);
    return { success: false, error: error?.message || "Errore durante l'invio dell'email di conferma quiz." };
  }
}

/**
 * Email inviata al termine della correzione.
 */
/**
 * Email inviata al termine della correzione del quiz.
 * Esegue il wrapping sicuro di sendTemplateEmail per restituire un risultato tipizzato.
 * 
 * @param recipient - L'indirizzo email dello studente (destinatario).
 * @param variables - Le variabili dinamiche da iniettare nel template (es. nome, punteggio, commenti).
 */
export async function sendQuizGradedMail(
  recipient: string,
  variables: Record<string, string>,
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Controllo preventivo di base sull'email
    if (!recipient || !recipient.includes("@")) {
      throw new Error(`Indirizzo email non valido: "${recipient}"`);
    }

    // Invoco la funzione di utilità privata
    await sendTemplateEmail(
      "QUIZ_GRADED",
      recipient,
      variables,
    );

    return {
      success: true,
    };
  } catch (error: any) {
    // Tracciamo l'errore sul server per il debugging
    console.error("❌ [quizMailActions] Errore in sendQuizGradedMail:", error);

    // Restituiamo un errore leggibile al client senza far crashare la Server Action
    return {
      success: false,
      error: error?.message ?? "Errore sconosciuto durante l'invio dell'email di correzione.",
    };
  }
}