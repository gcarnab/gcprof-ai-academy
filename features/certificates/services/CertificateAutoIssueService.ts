import { CertificateService } from "./CertificateService";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export interface AutoIssueParams {
  userId: string;
  courseId: string;
  moduleId: string;
  lessonId?: string;
  title: string;
  subtitle?: string;
  completionPercentage?: number;
  score?: number;
  templateId?: string;
  issuedBy?: string;
  studentName?: string;
  studentEmail?: string;
}

export class CertificateAutoIssueService {
  private certificateService: CertificateService;

  constructor() {
    this.certificateService = new CertificateService();
  }

  async processAndIssue(params: AutoIssueParams) {
    try {
      // Guardrail: Blocco immediato se courseId o moduleId non sono definiti
      if (!params.courseId || !params.moduleId) {
        logger.error(
          "❌ [CertificateAutoIssueService] courseId o moduleId mancanti:",
          params,
        );
        throw new Error(
          "Impossibile procedere: il quiz/lezione non è associato ad alcun corso o modulo valido.",
        );
      }

      // 1. Recupera il profilo dello studente per ricavare nome ed email
      const { data: studentProfile } = await getSupabaseAdmin()
        .from("profiles")
        .select("first_name, last_name, display_name, email")
        .eq("id", params.userId)
        .single();

      const studentName =
        params.studentName ||
        `${studentProfile?.first_name || ""} ${studentProfile?.last_name || ""}`.trim() ||
        studentProfile?.display_name ||
        "Studente";

      const studentEmail = params.studentEmail || studentProfile?.email || "";

      const safeScore =
        typeof params.score === "number" ? params.score : undefined;
      const safePercentage =
        typeof params.completionPercentage === "number"
          ? params.completionPercentage
          : 100;

      // 2. Segna il modulo come completato
      await this.certificateService.markModuleCompleted(
        params.userId,
        params.courseId,
        params.moduleId,
        safePercentage,
        safeScore,
      );

      // 3. Genera il certificato
      const certificate = await this.certificateService.generateCertificate({
        userId: params.userId,
        courseId: params.courseId,
        moduleId: params.moduleId,
        lessonId: params.lessonId,
        title: params.title,
        subtitle: params.subtitle,
        completionPercentage: safePercentage,
        score: safeScore,
        templateId: params.templateId,
        issuedBy: params.issuedBy,
      });

      // 4. Genera PDF, esegue l'upload su Storage e invia l'Email
      await this.certificateService.processAutomations(
        certificate,
        studentName,
        studentEmail,
      );

      return { success: true, certificate };
    } catch (error: any) {
      logger.error(
        "❌ Errore durante l'emissione automatica del certificato:",
        error,
      );
      throw error;
    }
  }
}