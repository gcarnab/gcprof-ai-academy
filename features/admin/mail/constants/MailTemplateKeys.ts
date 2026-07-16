export const MailTemplateKeys = {
  WELCOME: "WELCOME",
  PASSWORD_RESET: "PASSWORD_RESET",
  CONTACT_REPLY: "CONTACT_REPLY",
  ADMIN_NEW_REGISTRATION: "ADMIN_NEW_REGISTRATION",
} as const;

export type MailTemplateKey =
  (typeof MailTemplateKeys)[keyof typeof MailTemplateKeys];