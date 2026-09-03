import { CertificateService } from "./CertificateService";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export interface AutoIssueParams {
  userId: string;
  courseId: string;
  moduleId?: string;
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
      const supabase = getSupabaseAdmin();

      // 1. Guardrail e Auto-Risoluzione del moduleId se non fornito esplicitamente
      let resolvedModuleId = params.moduleId;

      if (!params.courseId) {
        logger.error("❌ [CertificateAutoIssueService] courseId mancante:", params);
        throw new Error(
          "Impossibile procedere: il quiz/lezione non è associato ad alcun corso valido."
        );
      }

      if (!resolvedModuleId) {
        const { data: moduleData } = await supabase
          .from("course_modules")
          .select("id")
          .eq("course_id", params.courseId)
          .order("order_index", { ascending: true })
          .limit(1)
          .maybeSingle();

        resolvedModuleId = moduleData?.id;
      }

      if (!resolvedModuleId) {
        logger.error("❌ [CertificateAutoIssueService] Impossibile risolvere moduleId:", params);
        throw new Error(
          "Impossibile procedere: modulo di riferimento non trovato per il corso fornito."
        );
      }

      // 2. Recupera il profilo dello studente con gestione difensiva degli errori
      const { data: studentProfile, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, display_name, email")
        .eq("id", params.userId)
        .maybeSingle();

      if (profileError) {
        logger.warn(
          `⚠️ [CertificateAutoIssueService] Errore recupero profilo utente ${params.userId}:`,
          profileError.message
        );
      }

      const firstName = studentProfile?.first_name?.trim() || "";
      const lastName = studentProfile?.last_name?.trim() || "";
      const fullName = `${firstName} ${lastName}`.trim();

      const studentName =
        params.studentName ||
        fullName ||
        studentProfile?.display_name ||
        "Studente";

      const studentEmail = params.studentEmail || studentProfile?.email || "";

      const safeScore =
        typeof params.score === "number" ? params.score : undefined;
      const safePercentage =
        typeof params.completionPercentage === "number"
          ? params.completionPercentage
          : 100;

      // 3. Segna il modulo come completato
      await this.certificateService.markModuleCompleted(
        params.userId,
        params.courseId,
        resolvedModuleId,
        safePercentage,
        safeScore,
      );

      // 4. Genera il certificato con l'eventuale tracciamento della lezione
      const certificate = await this.certificateService.generateCertificate({
        userId: params.userId,
        courseId: params.courseId,
        moduleId: resolvedModuleId,
        lessonId: params.lessonId,
        title: params.title,
        subtitle: params.subtitle,
        completionPercentage: safePercentage,
        score: safeScore,
        templateId: params.templateId,
        issuedBy: params.issuedBy,
      });

      // 5. Genera PDF, upload su Storage e invio email
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