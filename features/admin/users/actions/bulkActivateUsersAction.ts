"use server";

import { logger } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { EmailService } from "@/features/admin/mail/services/EmailService";

export async function bulkActivateUsersAction(userIds: string[]) {
  if (!userIds || userIds.length === 0) {
    return { success: false, error: "Nessun utente selezionato." };
  }

  const supabase = getSupabaseAdmin();
  const emailService = new EmailService();

  try {
    // 1. Recupera i dati degli utenti da attivare per l'invio mail
    const { data: usersToActivate, error: fetchError } = await supabase
      .from("profiles")
      .select("id, email, first_name, display_name")
      .in("id", userIds);

    if (fetchError) throw fetchError;

    // 2. Aggiorna lo stato a 'active'
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ status: "active" })
      .in("id", userIds);

    if (updateError) throw updateError;

    // 3. Invia le email di notifica in parallelo senza bloccare l'azione principale
    if (usersToActivate && usersToActivate.length > 0) {
      const emailPromises = usersToActivate
        .filter((u) => u.email)
        .map((u) => {
          const name = u.first_name || u.display_name || "Studente";
          return emailService
            .sendUserActivatedEmail(u.email!, name)
            .catch((err) => {
              logger.error(
                `[BULK ACTIVATE MAIL ERROR] Fallito invio a ${u.email}:`,
                err.message,
              );
            });
        });

      await Promise.allSettled(emailPromises);
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err: any) {
    logger.error("Errore attivazione massiva:", err.message);
    return {
      success: false,
      error: "Errore durante l'attivazione degli utenti.",
    };
  }
}