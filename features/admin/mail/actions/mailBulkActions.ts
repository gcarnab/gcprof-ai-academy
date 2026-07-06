"use server";

import { createClient } from "@supabase/supabase-js";
import { MailTemplateService } from "../services/MailTemplateService";
import { GmailProvider } from "../providers/GmailProvider";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl!, serviceRoleKey!);
const templateService = new MailTemplateService();
const gmailProvider = new GmailProvider();

interface BulkMailResult {
  success: boolean;
  processedCount: number;
  error?: string;
}

export async function sendBulkMailAction(
  templateKey: string,
  targetClass: string
): Promise<BulkMailResult> {
  try {
    // 1. Recupera il template dal servizio
    const template = await templateService.getTemplate(templateKey);
    if (!template) {
      return { success: false, processedCount: 0, error: "Template non trovato." };
    }

    // 2. Query per estrarre gli utenti associati alla classe
    const { data: records, error: dbError } = await supabaseAdmin
      .from("profiles")
      .select(`
        email,
        display_name,
        profile_classes!inner(academy_classes!inner(name))
      `)
      .eq("profile_classes.academy_classes.name", targetClass)
      .eq("status", "active");

    if (dbError) throw new Error(`Errore estrazione destinatari: ${dbError.message}`);
    if (!records || records.length === 0) {
      return { success: true, processedCount: 0, error: `Nessun utente attivo trovato nella classe '${targetClass}'.` };
    }

    // 🛡️ DE-DUPLICAZIONE: Raggruppiamo per email per evitare invii multipli
    const uniqueUsersMap = new Map<string, { email: string; display_name: string | null }>();
    for (const rec of records) {
      if (rec.email) {
        uniqueUsersMap.set(rec.email, {
          email: rec.email,
          display_name: rec.display_name
        });
      }
    }
    const uniqueUsers = Array.from(uniqueUsersMap.values());

    let sentCounter = 0;

    // 3. 🎯 MAPPATURA REALE DELLE COLONNE (Allineate al log di debug)
    const t = template as any;
    const rawBody = t.body_text_override || ""; 
    const rawSubject = t.subject || "Comunicazione da GCPROF-ACADEMY";

    if (!rawBody) {
      return { 
        success: false, 
        processedCount: 0, 
        error: "Il campo 'body_text_override' del template risulta vuoto nel DB." 
      };
    }

    // 4. Ciclo di invio sugli utenti unici
    for (const user of uniqueUsers) {
      const displayName = user.display_name || "Studente";
      const academyName = "GCPROF-ACADEMY";

      // Sostituzione globale dei tag reali presenti nel database
      let compiledBody = rawBody
        .replace(/{{first_name}}/gi, displayName)     // 👈 Gestisce il tag del tuo DB
        .replace(/{{display_name}}/gi, displayName)   // Fallback di sicurezza
        .replace(/{{academy_name}}/gi, academyName);

      let compiledSubject = rawSubject
        .replace(/{{first_name}}/gi, displayName)
        .replace(/{{display_name}}/gi, displayName)
        .replace(/{{academy_name}}/gi, academyName);

      // Converte i ritorni a capo (\r\n) in tag HTML <br/> per preservare la formattazione
      const finalHtml = compiledBody.includes("<p>") || compiledBody.includes("<div>") 
        ? compiledBody 
        : compiledBody.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>");

      // Invia tramite il tuo Gmail SMTP Provider
      const result = await gmailProvider.sendEmail({
        to: user.email,
        subject: compiledSubject.trim(),
        html: finalHtml,
        fromName: "GCPROF ACADEMY"
      });

      if (result.success) {
        sentCounter++;
        console.log(`[Gmail SMTP Success] Inviata singolarmente a: ${user.email}`);
      } else {
        console.error(`[Gmail SMTP Error] Fallito invio per ${user.email}:`, result.error);
      }
    }

    return {
      success: true,
      processedCount: sentCounter,
    };

  } catch (err: any) {
    return {
      success: false,
      processedCount: 0,
      error: err.message || "Errore sconosciuto nel broadcast SMTP.",
    };
  }
}