import { EmailProvider } from "../providers/EmailProvider";
import { GmailProvider } from "../providers/GmailProvider";

export class EmailService {
  private provider: EmailProvider;
  private adminEmail: string;

  constructor() {
    // Inizializziamo il provider SMTP di Gmail appena creato
    this.provider = new GmailProvider();
    // Email dell'amministratore per le notifiche di sistema
    this.adminEmail = process.env.GMAIL_SMTP_USER || "gcarnab74@gmail.com";
  }

  /**
   * Metodo generico per l'invio di email
   */
  async sendGenericEmail(to: string, subject: string, html: string, fromName?: string) {
    return this.provider.sendEmail({ to, subject, html, fromName });
  }

  /**
   * Invia la mail di benvenuto allo studente (Stato PENDING) tramite Gmail SMTP
   */
  async sendStudentPendingEmail(studentEmail: string, studentName: string) {
    const subject = "⏳ Registrazione ricevuta - In attesa di attivazione";
    const html = `
      <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2563eb;">Benvenuto nell'Academy del Prof. Carnabuci, ${studentName}!</h2>
        <p>La tua richiesta di registrazione è stata ricevuta con successo con il dominio personalizzato <strong>gcprof-academy.com</strong>.</p>
        <p>Al momento il tuo account è in stato di <strong>Attesa di Attivazione (Pending)</strong>. Il docente verificherà la tua richiesta e attiverà il tuo profilo il prima possibile.</p>
        <p>Riceverai una notifica email non appena l'account sarà abilitato all'accesso dei corsi.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">Questa è una mail transazionale automatica inviata da GCPROF-ACADEMY.COM.</p>
      </div>
    `;
    return this.sendGenericEmail(studentEmail, subject, html);
  }

  /**
   * Invia una notifica all'amministratore per richiedere l'approvazione del nuovo studente
   */
  async sendAdminNotificationEmail(studentName: string, studentEmail: string, classSlug: string) {
    const subject = `🚨 Nuovo studente in attesa di approvazione: ${studentName}`;
    const html = `
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
        <p style="font-size: 12px; color: #64748b;">GCPROF-ACADEMY.COM Backoffice</p>
      </div>
    `;
    return this.sendGenericEmail(this.adminEmail, subject, html);
  }
}