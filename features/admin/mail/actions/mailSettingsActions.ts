"use server";

import { MailSettingsService } from "../services/MailSettingsService";

const service = new MailSettingsService();

export async function getMailSettingsAction() {

    return await service.getSettings();

}