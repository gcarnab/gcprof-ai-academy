import nodemailer from "nodemailer";
import { EmailProvider, SendEmailOptions } from "./EmailProvider";

export class GmailProvider implements EmailProvider {
  private transporter: nodemailer.Transporter;
  private smtpUser: string;

  constructor() {
    this.smtpUser = process.env.GMAIL_SMTP_USER || "";
    const smtpPass = process.env.GMAIL_SMTP_APP_PASSWORD || "";

    if (!this.smtpUser || !smtpPass) {
      console.warn("⚠️ Attenzione: GMAIL_SMTP_USER o GMAIL_SMTP_APP_PASSWORD non configurati nel .env.local!");
    }

    // Configurazione del transport SMTP usando la porta sicura 465 (SSL)
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true per la porta 465
      auth: {
        user: this.smtpUser,
        pass: smtpPass,
      },
    });
  }

  async sendEmail(options: SendEmailOptions) {
    try {
      const fromName = options.fromName || "GCPROF-ACADEMY.COM";
      
      const mailOptions = {
        from: `"${fromName}" <${this.smtpUser}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error: any) {
      console.error("❌ Errore durante l'invio tramite Gmail SMTP Provider:", error);
      return {
        success: false,
        error: error.message || error,
      };
    }
  }
}