export interface MailSetting {
  id: string;
  value: string;
}

export interface MailTemplate {
  id: string;

  template_key: string;

  name: string;

  description: string | null;

  subject: string;

  title_override: string | null;

  body_text_override: string | null;

  enabled: boolean;

  version: number;

  updated_at: string;
}

export interface MailLog {
  id: string;

  template_key: string;

  recipient: string;

  subject: string;

  status: string;

  provider: string;

  provider_id: string | null;

  error_message: string | null;

  created_at: string;
}

export interface UpdateMailTemplateDto {
  subject: string;
  title_override: string | null;
  body_text_override: string | null;
  enabled: boolean;
}
