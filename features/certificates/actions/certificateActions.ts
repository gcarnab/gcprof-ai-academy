"use server";

import { CertificateService } from "../services/CertificateService";
import { Certificate } from "../types";
import { logger } from "@/lib/logger";

const certificateService = new CertificateService();

export async function getUserCertificatesAction(userId: string): Promise<{
  success: boolean;
  certificates?: Certificate[];
  error?: string;
}> {
  try {
    const certificates = await certificateService.getStudentCertificates(userId);
    return { success: true, certificates };
  } catch (error: any) {
    logger.error("Errore nel recupero dei certificati dello studente", error);
    return { success: false, error: error.message || "Impossibile recuperare i certificati." };
  }
}

export async function registerCertificateDownloadAction(certificate: Certificate): Promise<{ success: boolean }> {
  try {
    await certificateService.registerDownload(certificate);
    return { success: true };
  } catch (error: any) {
    logger.error("Errore durante il tracciamento del download del certificato", error);
    return { success: false };
  }
}