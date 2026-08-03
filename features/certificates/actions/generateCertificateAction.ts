"use server";

import { revalidatePath } from "next/cache";
import {
  CertificateAutoIssueService,
  AutoIssueParams,
} from "../services/CertificateAutoIssueService";
import { logger } from "@/lib/logger";

export interface GenerateCertificateResponse {
  success: boolean;
  certificate?: any;
  error?: string;
}

export async function generateCertificateAction(
  params: AutoIssueParams
): Promise<GenerateCertificateResponse> {
  try {
    const autoIssueService = new CertificateAutoIssueService();

    // Esegue il flusso completo: completamento modulo -> DB record -> PDF -> Storage -> Email
    const result = await autoIssueService.processAndIssue(params);

    if (!result?.success) {
      return {
        success: false,
        error: "Impossibile generare il certificato.",
      };
    }

    // Invalida le route per riflettere immediatamente i nuovi certificati nella UI
    revalidatePath("/dashboard", "layout");
    revalidatePath("/profile", "layout");
    revalidatePath("/admin", "layout");

    return {
      success: true,
      certificate: result.certificate,
    };
  } catch (error: any) {
    logger.error("Errore critico in generateCertificateAction:", error);
    return {
      success: false,
      error:
        error?.message ||
        "Errore imprevisto durante la generazione del certificato.",
    };
  }
}