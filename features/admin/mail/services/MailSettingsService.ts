import { getSupabaseAdmin } from "@/lib/supabase";
import { MailSetting } from "../types/mail";

export class MailSettingsService {
  private db = getSupabaseAdmin();

  async getSettings(): Promise<MailSetting[]> {
    const { data, error } = await this.db

      .from("mail_settings")

      .select("*")

      .order("id");

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }
}
