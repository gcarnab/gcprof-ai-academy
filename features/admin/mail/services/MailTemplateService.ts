import { getSupabaseAdmin } from "@/lib/supabase";
import { MailTemplate, UpdateMailTemplateDto } from "../types/mail";

export class MailTemplateService {
  private db = getSupabaseAdmin();

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

  async getTemplate(templateKey: string): Promise<MailTemplate | null> {
    const { data, error } = await this.db

      .from("mail_templates")

      .select("*")

      .eq("template_key", templateKey)

      .single();

    if (error) {
      return null;
    }

    return data;
  }

  async updateTemplate(
    templateKey: string,
    payload: UpdateMailTemplateDto,
  ): Promise<MailTemplate> {
    const { data, error } = await this.db

      .from("mail_templates")

      .update({
        subject: payload.subject,

        title_override: payload.title_override,

        body_text_override: payload.body_text_override,

        enabled: payload.enabled,
      })

      .eq("template_key", templateKey)

      .select()

      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
