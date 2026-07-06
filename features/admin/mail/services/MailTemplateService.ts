import { getSupabaseAdmin } from "@/lib/supabase";
import { MailTemplate, UpdateMailTemplateDto } from "../types/mail";

export class MailTemplateService {
  private db = getSupabaseAdmin();

  /**
   * Recupera tutti i template email memorizzati nel database, ordinati per nome.
   */
  async getTemplates(): Promise<MailTemplate[]> {
    const { data, error } = await this.db
      .from("mail_templates")
      .select("*")
      .order("name");

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  /**
   * Recupera un singolo template partendo dalla sua chiave identificativa unica (es. 'WELCOME').
   */
  async getTemplate(templateKey: string): Promise<MailTemplate | null> {
    const { data, error } = await this.db
      .from("mail_templates")
      .select("*")
      .eq("template_key", templateKey)
      .maybeSingle(); // Usiamo maybeSingle per evitare eccezioni rumorose se non trova nulla

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Aggiorna un template esistente e incrementa automaticamente la versione sul database.
   */
  async updateTemplate(
    templateKey: string,
    payload: UpdateMailTemplateDto,
  ): Promise<MailTemplate> {
    // 1. Recuperiamo la versione corrente per fare un incremento atomico sicuro
    const current = await this.getTemplate(templateKey);
    const nextVersion = current ? (current.version || 1) + 1 : 1;

    const { data, error } = await this.db
      .from("mail_templates")
      .update({
        subject: payload.subject,
        title_override: payload.title_override,
        body_text_override: payload.body_text_override,
        enabled: payload.enabled,
        version: nextVersion, // Aggiorna la versione ad ogni modifica salvata
        updated_at: new Date().toISOString(),
      })
      .eq("template_key", templateKey)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * 🆕 Inserisce un nuovo template email all'interno della tabella del database
   */
  async createTemplate(payload: {
    template_key: string;
    name: string;
    description: string;
    subject: string;
    title_override: string | null;
    body_text_override: string | null;
    enabled: boolean;
  }): Promise<MailTemplate> {
    const { data, error } = await this.db
      .from("mail_templates")
      .insert([
        {
          template_key: payload.template_key.toUpperCase().trim(),
          name: payload.name.trim(),
          description: payload.description.trim(),
          subject: payload.subject.trim(),
          title_override: payload.title_override,
          body_text_override: payload.body_text_override,
          enabled: payload.enabled,
          version: 1, // Impostazione iniziale della versione del template di default
        },
      ])
      .select()
      .single();

    if (error) {
      // Gestione dell'errore di chiave duplicata (Violazione del vincolo UNIQUE)
      if (error.code === "23505") {
        throw new Error(
          `La chiave template '${payload.template_key}' esiste già a sistema.`,
        );
      }
      throw new Error(error.message);
    }

    return data;
  }
}
