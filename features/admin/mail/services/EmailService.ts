import { EmailProvider } from "../providers/EmailProvider";
import { GmailProvider } from "../providers/GmailProvider";
import { MailTemplateService } from "./MailTemplateService";
import { MailTemplateEngine } from "./MailTemplateEngine";
import { MailTemplateKeys } from "../constants/MailTemplateKeys";

export class EmailService {
  private provider: EmailProvider;
  private adminEmail: string;
  private templateService: MailTemplateService;

  constructor() {
    this.provider = new GmailProvider();
    this.adminEmail = process.env.GMAIL_SMTP_USER || "gcarnab74@gmail.com";
    this.templateService = new MailTemplateService();
  }

  /**
   * Metodo generico per l'invio di email, ora con supporto agli allegati
   */
  async sendGenericEmail(
    to: string,
    subject: string,
    html: string,
    fromName?: string,
    attachments?: any[],
  ) {
    return this.provider.sendEmail({
      to,
      subject,
      html,
      fromName,
      attachments,
    });
  }

  /**
   * Invia l'email con il certificato allo studente
   */
  async sendCertificateEmail(
    studentEmail: string,
    studentName: string,
    courseTitle: string,
    pdfBuffer: Buffer,
    pdfUrl: string,
  ) {
    const subject = `🎉 Congratulazioni! Ecco il tuo certificato per ${courseTitle}`;
    const html = `
      <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2563eb;">Ottimo lavoro, ${studentName}!</h2>
        <p>Hai completato con successo il modulo: <strong>${courseTitle}</strong>.</p>
        <p>In allegato a questa mail trovi il tuo certificato ufficiale in formato PDF.</p>
        <p>Puoi anche scaricarlo in qualsiasi momento dal seguente link oppure dal tuo pannello studente:</p>
        <p><a href="${pdfUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Scarica Certificato</a></p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">GCPROF-ACADEMY.COM Backoffice</p>
      </div>
    `;

    const attachments = [
      {
        filename: `Certificato-${courseTitle.replace(/\s+/g, "-")}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ];

    return this.sendGenericEmail(
      studentEmail,
      subject,
      html,
      "GCProf Academy",
      attachments,
    );
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
  async sendAdminNotificationEmail(
    studentName: string,
    studentEmail: string,
    classSlug: string,
  ) {
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

  /**
   * Invia l'email di attivazione account allo studente
   */
  async sendUserActivatedEmail(studentEmail: string, studentName: string) {
    try {
      const dbTemplate = await this.templateService.getTemplate(
        MailTemplateKeys.USER_ACTIVATED,
      );

      if (dbTemplate && dbTemplate.enabled) {
        const variables = {
          first_name: studentName,
          student_name: studentName,
          student_email: studentEmail,
          academy_name: "GCProf Academy",
        };
        const engine = new MailTemplateEngine(variables);

        const subject = engine.render(dbTemplate.subject);
        const title = dbTemplate.title_override
          ? engine.render(dbTemplate.title_override)
          : "Account Attivato!";
        const bodyText = dbTemplate.body_text_override
          ? engine
              .render(dbTemplate.body_text_override)
              .replace(/\n/g, "<br />")
          : "";

        const html = `
          <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #16a34a;">${title}</h2>
            <div style="font-size: 15px; line-height: 1.6; color: #334155;">
              ${bodyText}
            </div>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Questa è una mail transazionale automatica inviata da GCPROF-ACADEMY.COM.</p>
          </div>
        `;
        return this.sendGenericEmail(
          studentEmail,
          subject,
          html,
          "GCProf Academy",
        );
      }
    } catch {
      // Fallback silenzioso se il DB fallisce
    }

    // Fallback hardcoded se il template non è presente a DB
    const subject = "🎉 Il tuo account su GCProf Academy è stato attivato!";
    const html = `
      <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #16a34a;">Benvenuto a bordo, ${studentName}!</h2>
        <p>Il tuo account è stato verificato ed abilitato dall'amministratore.</p>
        <p>Ora puoi accedere al portale ed usufruire di tutti i corsi e materiali disponibili.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">GCPROF-ACADEMY.COM Backoffice</p>
      </div>
    `;
    return this.sendGenericEmail(studentEmail, subject, html, "GCProf Academy");
  }
}