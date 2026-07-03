/**
 * Questo file incapsula la logica di Resend e centralizza i template HTML (Benvenuto/Pending e notifica Admin).
 */

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(apiKey);
const ADMIN_EMAIL = "gcarnab74@gmail.com"; // La tua Gmail verificata su Resend

export class ResendEmailService {
  private checkApiKey(): boolean {
    if (!apiKey) {
      console.error("❌ RESEND_API_KEY non configurata nel file .env!");
      return false;
    }
    return true;
  }

  /**
   * Invia la mail di benvenuto allo studente (Stato PENDING)
   */
  async sendStudentPendingEmail(studentEmail: string, studentName: string) {
    if (!this.checkApiKey()) return;

    try {
      await resend.emails.send({
        from: "GCProf Academy <onboarding@resend.dev>",
        to: studentEmail,
        subject: "⏳ Registrazione ricevuta - In attesa di attivazione",
        html: `
          <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #2563eb;">Benvenuto nell'Academy, ${studentName}!</h2>
            <p>La tua richiesta di registrazione è stata ricevuta con successo.</p>
            <p>Al momento il tuo account è in stato di <strong>Attesa di Attivazione (Pending)</strong>. Il docente verificherà la tua richiesta e attiverà il tuo profilo il prima possibile.</p>
            <p>Riceverai una notifica email non appena l'account sarà abilitato all'accesso dei corsi.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Questa è una mail transazionale automatica inviata da GCProf AI Academy.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Errore invio email pending a studente:", error);
    }
  }

  /**
   * Invia una notifica all'amministratore per richiedere l'approvazione del nuovo studente
   */
  async sendAdminNotificationEmail(studentName: string, studentEmail: string, classSlug: string) {
    if (!this.checkApiKey()) return;

    try {
      await resend.emails.send({
        from: "GCProf Academy <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `🚨 Nuovo studente in attesa di approvazione: ${studentName}`,
        html: `
          <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #7c3aed;">Nuova Iscrizione Studente</h2>
            <p>Un nuovo studente si è registrato sulla piattaforma ed è in attesa di essere attivato:</p>
            <ul style="background-color: #f8fafc; padding: 15px; list-style: none; border-radius: 8px; border-left: 4px solid #7c3aed;">
              <li><strong>Nome Completo:</strong> ${studentName}</li>
              <li><strong>Email:</strong> ${studentEmail}</li>
              <li><strong>Classe Selezionata (Slug):</strong> ${classSlug}</li>
            </ul>
            <p>Puoi gestire l'attivazione direttamente dal tuo <strong>Pannello di Controllo Admin</strong> nella sezione gestione utenti.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">GCProf AI Academy Backoffice</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Errore invio email notifica ad admin:", error);
    }
  }
}