"use server";

import { MailTemplateService } from "../services/MailTemplateService";
import { UpdateMailTemplateDto } from "../types/mail";

const service = new MailTemplateService();

export async function getMailTemplatesAction() {
  return await service.getTemplates();
}

export async function getMailTemplateAction(templateKey: string) {
  return await service.getTemplate(templateKey);
}

export async function updateMailTemplateAction(
  templateKey: string,
  payload: UpdateMailTemplateDto,
) {
  return await service.updateTemplate(templateKey, payload);
}

// 🆕 Azione per inserire un nuovo template
export async function createMailTemplateAction(payload: {
  template_key: string;
  name: string;
  description: string;
  subject: string;
  title_override: string | null;
  body_text_override: string | null;
  enabled: boolean;
}) {
  return await service.createTemplate(payload);
}