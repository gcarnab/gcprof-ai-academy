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
  return await service.updateTemplate(
    templateKey,

    payload,
  );
}
