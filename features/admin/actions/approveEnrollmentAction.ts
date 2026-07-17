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
      logger.warn(
        "Tentativo approvazione iscrizione senza sessione valida",
      );
      return false;
    }


    const payload = await tokenService.verify(token);

    if (!payload) {
      logger.warn(
        "Tentativo approvazione iscrizione con token non valido",
      );
      return false;
    }


    return payload.role === "admin";

  } catch (error) {

    logger.error(
      "Errore verifica ruolo amministratore:",
      error,
    );

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
    const { error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .update({
          status: "active",
        })
        .eq("id", profileId);



    if (profileError) {

      logger.error(
        "Errore aggiornamento stato profilo:",
        profileError,
      );

      throw new Error(
        profileError.message,
      );
    }



    /*
     * 2. Attivazione relazione corso
     */
    const { error: courseError } =
      await supabaseAdmin
        .from("profile_courses")
        .update({
          status: "active",
        })
        .eq("profile_id", profileId)
        .eq("course_id", courseId);



    if (courseError) {

      logger.error(
        "Errore aggiornamento stato iscrizione corso:",
        courseError,
      );

      throw new Error(
        courseError.message,
      );
    }



    /*
     * 3. Recupero dati email
     */
    const { data: profileData, error: profileFetchError } =
      await supabaseAdmin
        .from("profiles")
        .select(
          "email, display_name",
        )
        .eq("id", profileId)
        .single();



    const { data: courseData, error: courseFetchError } =
      await supabaseAdmin
        .from("courses")
        .select(
          "title",
        )
        .eq("id", courseId)
        .single();



    if (profileFetchError || courseFetchError) {

      logger.error(
        "Errore recupero dati notifica email:",
        {
          profileFetchError,
          courseFetchError,
        },
      );

    }



    /*
     * 4. Invio email conferma
     */
    if (
      profileData?.email &&
      courseData?.title
    ) {

      const emailService = new EmailService();


      const appUrl =
        process.env.NEXT_PUBLIC_APP_URL;


      if (!appUrl) {

        logger.warn(
          "NEXT_PUBLIC_APP_URL non configurata",
        );

      }


      const subject =
        `Iscrizione Approvata: ${courseData.title}`;



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



      await emailService.sendGenericEmail(
        profileData.email,
        subject,
        html,
      );


      logger.info(
        `Email approvazione inviata a ${profileData.email}`,
      );

    }



    /*
     * Refresh dashboard admin
     */
    revalidatePath(
      "/admin/dashboard",
    );


    return {
      success: true,
      message:
        "Iscrizione approvata con successo e notifica inviata!",
    };



  } catch (error: any) {


    logger.error(
      "Errore in approveEnrollmentAction:",
      error,
    );


    return {
      success:false,
      error:
        error.message ||
        "Errore durante l'approvazione.",
    };

  }
}