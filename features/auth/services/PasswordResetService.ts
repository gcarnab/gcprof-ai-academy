import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export class PasswordResetService {
  private TABLE = "password_reset_tokens";

  async createToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    const { error } = await supabaseAdmin.from(this.TABLE).insert({
      user_id: userId,
      token,
      expires_at: expiresAt.toISOString(),
      used: false,
    });

    if (error) {
      console.error("[PASSWORD RESET CREATE ERROR]", error.message);
      throw new Error("Errore nella creazione del token.");
    }

    return token;
  }

  async validateToken(token: string): Promise<string | null> {
    const { data, error } = await supabaseAdmin
      .from(this.TABLE)
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (error || !data) return null;

    if (data.used) return null;

    // 💡 RISOLUZIONE TIMEOUT/TIMEZONE:
    // Poiché la colonna DB è 'timestamp' (senza fuso orario), Postgres scarta la 'Z'.
    // Appendendo 'Z' forziamo JavaScript a interpretare la data come UTC puro,
    // allineandola perfettamente con il Date.now() locale del server Node.js.
    const expiresAtUtc = data.expires_at.endsWith("Z")
      ? data.expires_at
      : `${data.expires_at}Z`;

    if (new Date(expiresAtUtc) < new Date()) {
      console.warn(
        `[PASSWORD RESET] Token trovato ma scaduto UTC. Scadenza: ${expiresAtUtc}`,
      );
      return null;
    }

    return data.user_id;
  }

  async markAsUsed(token: string): Promise<void> {
    await supabaseAdmin
      .from(this.TABLE)
      .update({ used: true })
      .eq("token", token);
  }
}
