import { getSupabaseAdmin } from "@/lib/supabase";
import {
  Certificate,
  CertificateEvent,
  CertificateSettings,
  CertificateTemplate,
  ModuleCompletion,
} from "../types";
import { logger } from "@/lib/logger";

export class SupabaseCertificateRepository {
  private get supabase() {
    return getSupabaseAdmin();
  }

  /**
   * Converte in modo sicuro i valori numerici per il DB.
   * Impedisce il passaggio accidentale di valori boolean ("false" / false).
   */
  private safeNum(val: any, fallback: number | null = null): number | null {
    if (typeof val === "number" && !isNaN(val)) return val;
    if (typeof val === "string" && val.trim() !== "" && !isNaN(Number(val))) {
      return Number(val);
    }
    return fallback;
  }

  /**
   * Converte in modo sicuro le stringhe / UUID per il DB.
   */
  private safeStr(val: any): string | null {
    if (typeof val === "string" && val.trim() !== "") return val;
    return null;
  }

  async getUserCertificates(userId: string): Promise<Certificate[]> {
    const { data, error } = await this.supabase
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Errore getUserCertificates:", error);
      return [];
    }

    return (data || []).map(this.mapCertificateFromDb);
  }

  async getCertificateById(id: string): Promise<Certificate | null> {
    const { data, error } = await this.supabase
      .from("certificates")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return this.mapCertificateFromDb(data);
  }

  async getCertificateByVerificationToken(
    token: string,
  ): Promise<Certificate | null> {
    const { data, error } = await this.supabase
      .from("certificates")
      .select("*")
      .eq("verification_token", token)
      .single();

    if (error || !data) return null;
    return this.mapCertificateFromDb(data);
  }

  async createCertificate(data: {
    userId: string;
    courseId: string;
    moduleId: string;
    lessonId?: string;
    templateId?: string;
    issuedBy?: string;
    title: string;
    subtitle?: string;
    completionPercentage?: number;
    score?: number;
    certificateNumber?: string;
    pdfUrl?: string;
    pdfGenerated?: boolean;
    emailSent?: boolean;
    downloadCount?: number;
    status?: string;
  }): Promise<Certificate> {
    const dbPayload: Record<string, any> = {
      user_id: data.userId,
      course_id: data.courseId,
      module_id: data.moduleId,
      lesson_id: this.safeStr(data.lessonId),
      template_id: this.safeStr(data.templateId),
      issued_by: this.safeStr(data.issuedBy),
      certificate_number: data.certificateNumber || `CERT-${Date.now()}`,
      title: data.title,
      subtitle: this.safeStr(data.subtitle),
      completion_percentage: this.safeNum(data.completionPercentage, 100),
      score: this.safeNum(data.score, null),
      pdf_url: this.safeStr(data.pdfUrl),
      pdf_generated: Boolean(data.pdfGenerated),
      email_sent: Boolean(data.emailSent),
      download_count: this.safeNum(data.downloadCount, 0),
      status: data.status || "ACTIVE",
    };

    const { data: created, error } = await this.supabase
      .from("certificates")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      logger.error("Errore createCertificate:", error);
      throw error;
    }

    return this.mapCertificateFromDb(created);
  }

  async updateCertificate(
    id: string,
    data: Partial<Certificate>,
  ): Promise<Certificate> {
    const dbPayload: Record<string, any> = {};

    if (data.title !== undefined) dbPayload.title = data.title;
    if (data.subtitle !== undefined)
      dbPayload.subtitle = this.safeStr(data.subtitle);
    if (data.pdfUrl !== undefined)
      dbPayload.pdf_url = this.safeStr(data.pdfUrl);
    if (data.pdfGenerated !== undefined)
      dbPayload.pdf_generated = Boolean(data.pdfGenerated);
    if (data.emailSent !== undefined)
      dbPayload.email_sent = Boolean(data.emailSent);
    if (data.downloadCount !== undefined)
      dbPayload.download_count = this.safeNum(data.downloadCount, 0);
    if (data.lastDownloadAt !== undefined)
      dbPayload.last_download_at = data.lastDownloadAt;
    if (data.status !== undefined) dbPayload.status = data.status;

    const { data: updated, error } = await this.supabase
      .from("certificates")
      .update(dbPayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      logger.error("Errore updateCertificate:", error);
      throw error;
    }

    return this.mapCertificateFromDb(updated);
  }

  async getModuleCompletion(
    userId: string,
    moduleId: string,
  ): Promise<ModuleCompletion | null> {
    const { data, error } = await this.supabase
      .from("module_completions")
      .select("*")
      .eq("user_id", userId)
      .eq("module_id", moduleId)
      .maybeSingle();

    if (error || !data) return null;
    return this.mapCompletionFromDb(data);
  }

  async createModuleCompletion(data: {
    userId: string;
    courseId: string;
    moduleId: string;
    completionPercentage?: number;
    quizScore?: number;
    completed?: boolean;
    completedAt?: string;
  }): Promise<ModuleCompletion> {
    const dbPayload: Record<string, any> = {
      user_id: data.userId,
      course_id: data.courseId,
      module_id: data.moduleId,
      completion_percentage: this.safeNum(data.completionPercentage, 100),
      quiz_score: this.safeNum(data.quizScore, null),
      completed: data.completed !== undefined ? Boolean(data.completed) : true,
      completed_at: data.completedAt || new Date().toISOString(),
    };

    const { data: created, error } = await this.supabase
      .from("module_completions")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      logger.error("Errore createModuleCompletion:", error);
      throw error;
    }

    return this.mapCompletionFromDb(created);
  }

  async updateModuleCompletion(
    id: string,
    data: Partial<ModuleCompletion>,
  ): Promise<ModuleCompletion> {
    const dbPayload: Record<string, any> = {};

    if (data.completionPercentage !== undefined) {
      dbPayload.completion_percentage = this.safeNum(
        data.completionPercentage,
        100,
      );
    }
    if (data.quizScore !== undefined) {
      dbPayload.quiz_score = this.safeNum(data.quizScore, null);
    }
    if (data.completed !== undefined) {
      dbPayload.completed = Boolean(data.completed);
    }
    if (data.completedAt !== undefined) {
      dbPayload.completed_at = data.completedAt;
    }
    if (data.certificateGenerated !== undefined) {
      dbPayload.certificate_generated = Boolean(data.certificateGenerated);
    }

    const { data: updated, error } = await this.supabase
      .from("module_completions")
      .update(dbPayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      logger.error("Errore updateModuleCompletion:", error);
      throw error;
    }

    return this.mapCompletionFromDb(updated);
  }

  async getSettings(): Promise<CertificateSettings | null> {
    const { data, error } = await this.supabase
      .from("certificate_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    const now = new Date().toISOString();

    if (error || !data) {
      return {
        id: "default",
        autoGeneratePdf: true,
        autoSendEmail: true,
        defaultTemplateId: undefined,
        logoUrl: "/gcprof-ai-academy_logo_01.png",
        certificatePrefix: "CERT",
        enableQrCode: true,
        createdAt: now,
        updatedAt: now,
      };
    }

    return {
      id: data.id,
      autoGeneratePdf: data.auto_generate_pdf ?? true,
      autoSendEmail: data.auto_send_email ?? true,
      defaultTemplateId: data.default_template_id ?? undefined,
      logoUrl: data.logo_url ?? undefined,
      certificatePrefix: data.certificate_prefix ?? "CERT",
      enableQrCode: data.enable_qr_code ?? true,
      createdAt: data.created_at || now,
      updatedAt: data.updated_at || now,
    };
  }

  async getTemplate(templateId: string): Promise<CertificateTemplate | null> {
    const { data, error } = await this.supabase
      .from("certificate_templates")
      .select("*")
      .eq("id", templateId)
      .maybeSingle();

    if (error || !data) return null;

    const now = new Date().toISOString();

    return {
      id: data.id,
      name: data.name,
      htmlTemplate: data.html_template || "",
      cssTemplate: data.css_template || "",
      logoUrl: data.logo_url,
      active: data.active ?? data.is_active ?? true,
      createdAt: data.created_at || now,
      updatedAt: data.updated_at || now,
    };
  }

  async createEvent(event: {
    certificateId: string;
    eventType: string;
  }): Promise<void> {
    const { error } = await this.supabase.from("certificate_events").insert({
      certificate_id: event.certificateId,
      event_type: event.eventType,
    });

    if (error) {
      logger.error("Errore createEvent:", error);
    }
  }

  private mapCertificateFromDb(row: any): Certificate {
    return {
      id: row.id,
      publicId: row.public_id,
      userId: row.user_id,
      courseId: row.course_id,
      moduleId: row.module_id,
      lessonId: row.lesson_id ?? undefined,
      templateId: row.template_id ?? undefined,
      issuedBy: row.issued_by ?? undefined,
      certificateNumber: row.certificate_number,
      title: row.title,
      subtitle: row.subtitle ?? undefined,
      completionPercentage:
        row.completion_percentage != null
          ? Number(row.completion_percentage)
          : 100,
      score: row.score != null ? Number(row.score) : undefined,
      pdfUrl: row.pdf_url ?? undefined,
      pdfGenerated: Boolean(row.pdf_generated),
      emailSent: Boolean(row.email_sent),
      verificationToken: row.verification_token,
      downloadCount:
        row.download_count != null ? Number(row.download_count) : 0,
      lastDownloadAt: row.last_download_at ?? undefined,
      status: row.status || "ACTIVE",
      issuedAt: row.issued_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapCompletionFromDb(row: any): ModuleCompletion {
    const now = new Date().toISOString();
    return {
      id: row.id,
      userId: row.user_id,
      courseId: row.course_id,
      moduleId: row.module_id,
      completionPercentage:
        row.completion_percentage != null
          ? Number(row.completion_percentage)
          : 100,
      quizScore: row.quiz_score != null ? Number(row.quiz_score) : undefined,
      completed: Boolean(row.completed),
      completedAt: row.completed_at,
      certificateGenerated: Boolean(row.certificate_generated),
      xpAwarded: row.xp_awarded != null ? Number(row.xp_awarded) : 0,
      createdAt: row.created_at || now,
      updatedAt: row.updated_at || now,
    };
  }
}
