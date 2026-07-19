"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { EmailService } from "@/features/admin/mail/services/EmailService";

import { logger } from "@/lib/logger";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

/**
 * Verifica autorizzazione amministratore
 */
async function isAdmin(): Promise<boolean> {
  try {
    const token = await cookieService.getSession();

    if (!token) {
      logger.warn("Tentativo approvazione iscrizione senza sessione valida");
      return false;
    }

    const payload = await tokenService.verify(token);

    if (!payload) {
      logger.warn("Tentativo approvazione iscrizione con token non valido");
      return false;
    }

    return payload.role === "admin";
  } catch (error) {
    logger.error("Errore verifica ruolo amministratore:", error);

    return false;
  }
}

/**
 * Approva richiesta iscrizione corso utente esterno
 *
 * Workflow:
 * pending -> active
 *
 * profiles.status
 * profile_courses.status
 */
export async function approveEnrollmentAction(
  profileId: string,
  courseId: string,
) {
  const authorized = await isAdmin();

  if (!authorized) {
    return {
      success: false,
      error:
        "Non autorizzato. Solo gli amministratori possono approvare le iscrizioni.",
    };
  }

  try {
    logger.info(
      `Approvazione iscrizione corso. Profile=${profileId} Course=${courseId}`,
    );

    /*
     * 1. Attivazione account utente
     */
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        status: "active",
      })
      .eq("id", profileId);

    if (profileError) {
      logger.error("Errore aggiornamento stato profilo:", profileError);

      throw new Error(profileError.message);
    }

    /*
     * 2. Attivazione relazione corso
     */
    const { error: courseError } = await supabaseAdmin
      .from("profile_courses")
      .update({
        status: "active",
      })
      .eq("profile_id", profileId)
      .eq("course_id", courseId);

    if (courseError) {
      logger.error("Errore aggiornamento stato iscrizione corso:", courseError);

      throw new Error(courseError.message);
    }

    /*
     * 3. Recupero dati email
     */
    const { data: profileData, error: profileFetchError } = await supabaseAdmin
      .from("profiles")
      .select("email, display_name")
      .eq("id", profileId)
      .single();

    const { data: courseData, error: courseFetchError } = await supabaseAdmin
      .from("courses")
      .select("title")
      .eq("id", courseId)
      .single();

    if (profileFetchError || courseFetchError) {
      logger.error("Errore recupero dati notifica email:", {
        profileFetchError,
        courseFetchError,
      });
    }

    /*
     * 4. Invio email conferma
     */
    if (profileData?.email && courseData?.title) {
      const emailService = new EmailService();

      const appUrl = process.env.NEXT_PUBLIC_APP_URL;

      if (!appUrl) {
        logger.warn("NEXT_PUBLIC_APP_URL non configurata");
      }

      const subject = `Iscrizione Approvata: ${courseData.title}`;

      const html = `
      <div style="
        font-family: Arial, sans-serif;
        max-width:600px;
        margin:0 auto;
        padding:24px;
        border:1px solid #e2e8f0;
        border-radius:12px;
      ">

        <h2 style="
          color:#2563eb;
          margin-bottom:16px;
        ">
          Ciao ${profileData.display_name}!
        </h2>


        <p style="
          color:#334155;
          line-height:1.6;
        ">
          La tua richiesta di iscrizione al corso
          <strong>${courseData.title}</strong>
          è stata approvata dall'amministratore.
        </p>


        <p style="
          color:#334155;
          line-height:1.6;
        ">
          Ora puoi effettuare il login e accedere ai contenuti didattici.
        </p>


        <div style="margin-top:24px">

          <a href="${appUrl}/login"
             style="
             background:#2563eb;
             color:white;
             padding:12px 24px;
             border-radius:8px;
             text-decoration:none;
             font-weight:bold;
             display:inline-block;
             ">
             Accedi alla Academy
          </a>

        </div>


        <hr style="
          margin:24px 0;
          border:0;
          border-top:1px solid #e2e8f0;
        "/>


        <p style="
          font-size:12px;
          color:#64748b;
        ">
          Email generata automaticamente da gcprof-academy.com
        </p>

      </div>
      `;

      await emailService.sendGenericEmail(profileData.email, subject, html);

      logger.info(`Email approvazione inviata a ${profileData.email}`);
    }

    /*
     * Refresh dashboard admin
     */
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Iscrizione approvata con successo e notifica inviata!",
    };
  } catch (error: any) {
    logger.error("Errore in approveEnrollmentAction:", error);

    return {
      success: false,
      error: error.message || "Errore durante l'approvazione.",
    };
  }
}

export async function syncUserCoursesAction(
  profileId: string,
  newCourseIds: string[],
) {
  // 1. Controllo di sicurezza fondamentale
  const authorized = await isAdmin();

  if (!authorized) {
    return {
      success: false,
      error:
        "Non autorizzato. Solo gli amministratori possono modificare le iscrizioni.",
    };
  }

  try {
    logger.info(
      `Sincronizzazione corsi. Profile=${profileId} Nuovi Corsi=[${newCourseIds.join(",")}]`,
    );

    // 2. Attiva il profilo utente (indispensabile per le nuove approvazioni)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ status: "active" })
      .eq("id", profileId);

    if (profileError) throw profileError;

    // 3. Recupera i corsi attualmente assegnati all'utente
    const { data: currentCourses, error: fetchError } = await supabaseAdmin
      .from("profile_courses")
      .select("course_id")
      .eq("profile_id", profileId);

    if (fetchError) throw fetchError;

    const currentCourseIds = currentCourses.map((c) => c.course_id);

    // 4. Calcola le differenze
    const coursesToAdd = newCourseIds.filter(
      (id) => !currentCourseIds.includes(id),
    );
    const coursesToRemove = currentCourseIds.filter(
      (id) => !newCourseIds.includes(id),
    );
    const coursesToKeep = currentCourseIds.filter((id) =>
      newCourseIds.includes(id),
    ); // <-- NUOVO: Corsi già presenti

    // 5. Rimuovi i corsi deselezionati
    if (coursesToRemove.length > 0) {
      const { error: deleteError } = await supabaseAdmin
        .from("profile_courses")
        .delete()
        .eq("profile_id", profileId)
        .in("course_id", coursesToRemove);

      if (deleteError) throw deleteError;
    }

    // 6. Aggiungi i nuovi corsi
    if (coursesToAdd.length > 0) {
      const insertData = coursesToAdd.map((courseId) => ({
        profile_id: profileId,
        course_id: courseId,
        status: "active", // <-- Imposta i nuovi ad active
      }));

      const { error: insertError } = await supabaseAdmin
        .from("profile_courses")
        .insert(insertData);

      if (insertError) throw insertError;
    }

    // 6.5. ATTIVA I CORSI PREESISTENTI (Il fix per il tuo bug)
    if (coursesToKeep.length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from("profile_courses")
        .update({ status: "active" }) // <-- Sblocca il corso in "pending"
        .eq("profile_id", profileId)
        .in("course_id", coursesToKeep);

      if (updateError) throw updateError;
    }

    // --- 7. INVIO EMAIL DI CONFERMA ---
    // Procediamo solo se ci sono corsi assegnati
    if (newCourseIds.length > 0) {
      // A. Recupero dati utente
      const { data: profileData, error: profileFetchError } =
        await supabaseAdmin
          .from("profiles")
          .select("email, display_name")
          .eq("id", profileId)
          .single();

      // B. Recupero titoli dei corsi assegnati
      const { data: coursesData, error: coursesFetchError } =
        await supabaseAdmin
          .from("courses")
          .select("title")
          .in("id", newCourseIds);

      if (profileFetchError || coursesFetchError) {
        logger.error("Errore recupero dati per email cumulativa:", {
          profileFetchError,
          coursesFetchError,
        });
      } else if (profileData?.email && coursesData && coursesData.length > 0) {
        const emailService = new EmailService();
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;

        if (!appUrl) logger.warn("NEXT_PUBLIC_APP_URL non configurata");

        const subject = "Il tuo account è attivo - Corsi assegnati";

        // Genera la lista HTML dei corsi
        const coursesListHtml = coursesData
          .map(
            (c) =>
              `<li style="margin-bottom: 8px;"><strong>${c.title}</strong></li>`,
          )
          .join("");

        const html = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; padding:24px; border:1px solid #e2e8f0; border-radius:12px;">
          <h2 style="color:#2563eb; margin-bottom:16px;">
            Ciao ${profileData.display_name}!
          </h2>

          <p style="color:#334155; line-height:1.6;">
            Siamo felici di comunicarti che il tuo account nella Academy è stato <strong>attivato</strong> dall'amministratore.
          </p>

          <p style="color:#334155; line-height:1.6;">
            Ti confermiamo inoltre che sei stato iscritto con successo ai seguenti corsi:
          </p>

          <ul style="color:#334155; line-height:1.6; background-color:#f8fafc; padding:16px 16px 16px 40px; border-radius:8px;">
            ${coursesListHtml}
          </ul>

          <p style="color:#334155; line-height:1.6;">
            Ora puoi effettuare il login e iniziare subito a studiare.
          </p>

          <div style="margin-top:24px">
            <a href="${appUrl}/login"
               style="background:#2563eb; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; display:inline-block;">
               Accedi alla Academy
            </a>
          </div>

          <hr style="margin:24px 0; border:0; border-top:1px solid #e2e8f0; "/>

          <p style="font-size:12px; color:#64748b;">
            Email generata automaticamente da gcprof-academy.com
          </p>
        </div>
        `;

        await emailService.sendGenericEmail(profileData.email, subject, html);
        logger.info(
          `Email di attivazione e riepilogo inviata a ${profileData.email}`,
        );
      }
    }

    // 8. Aggiorna la cache della dashboard admin
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error: any) {
    logger.error("Errore in syncUserCoursesAction:", error);
    return { success: false, error: error.message };
  }
}
