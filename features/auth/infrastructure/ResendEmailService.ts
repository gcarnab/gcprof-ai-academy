import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("❌ RESEND_API_KEY non configurata");
}

const resend = new Resend(apiKey);

const ADMIN_EMAIL = process.env.MAIL_ADMIN!;

const DEFAULT_FROM =
`${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM}>`;

type SendResult = {
  success: boolean;
  id: string;
};

export class ResendEmailService {
  private validate(): void {
    if (!apiKey) {
      throw new Error("RESEND_API_KEY mancante");
    }
  }

  private assertResult(result: any): string {
    if (result?.error) {
      throw new Error(`Resend error: ${result.error.message}`);
    }

    if (!result?.data?.id) {
      throw new Error(
        `Invio email fallito: risposta Resend non valida -> ${JSON.stringify(result)}`
      );
    }

    return result.data.id;
  }

  async sendStudentPendingEmail(
    studentEmail: string,
    studentName: string,
  ): Promise<SendResult> {
    this.validate();

    const result = await resend.emails.send({
      from: DEFAULT_FROM,
      to: studentEmail,
      subject:
        "⏳ Registrazione ricevuta - In attesa di attivazione",
      html: `<p>Benvenuto ${studentName}</p>`,
    });

    const id = this.assertResult(result);

    return { success: true, id };
  }

  async sendAdminNotificationEmail(
    studentName: string,
    studentEmail: string,
    classSlug: string,
  ): Promise<SendResult> {
    this.validate();

    const result = await resend.emails.send({
      from: DEFAULT_FROM,
      to: ADMIN_EMAIL,
      subject: `Nuovo studente: ${studentName}`,
      html: `
        <p><strong>${studentName}</strong></p>
        <p>${studentEmail}</p>
        <p>${classSlug}</p>
      `,
    });

    const id = this.assertResult(result);

    return { success: true, id };
  }

  async sendGenericEmail(
    to: string,
    subject: string,
    html: string,
  ): Promise<SendResult> {
    this.validate();

    // 🔍 DEBUG SOLO PER MAIL TEST (puoi rimuoverlo in prod)
    console.log("📨 EMAIL PAYLOAD:", {
      to,
      subject,
      htmlLength: html?.length,
    });

    const result = await resend.emails.send({
      from: DEFAULT_FROM,
      to,
      subject,
      html,
    });

    const id = this.assertResult(result);

    console.log("📨 EMAIL SENT SUCCESS:", { id });

    return { success: true, id };
  }
}