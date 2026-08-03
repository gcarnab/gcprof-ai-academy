export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  attachments?: any[];
}

export interface EmailProvider {
  sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: any }>;
}