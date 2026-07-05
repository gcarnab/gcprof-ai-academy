export const MailTemplateKeys = {
  WELCOME: "WELCOME",
  PASSWORD_RESET: "PASSWORD_RESET",
  CONTACT_REPLY: "CONTACT_REPLY",
} as const;

export type MailTemplateKey =
  (typeof MailTemplateKeys)[keyof typeof MailTemplateKeys];