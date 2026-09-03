import fs from "fs";
import path from "path";

import { Certificate, CertificateEventType, ModuleCompletion } from "../types";
import { generatePdfFromHtml } from "@/lib/pdfGenerator";
import { getSupabaseAdmin } from "@/lib/supabase";
import { EmailService } from "@/features/admin/mail/services/EmailService";
import { SupabaseCertificateRepository } from "../repositories/SupabaseCertificateRepository";
import { logger } from "@/lib/logger";

/**
 * Converte qualsiasi immagine (file locale in public/, URL remoto HTTPS Supabase, o data: URL)
 * in un Data URL Base64 supportato nativamente da Puppeteer senza chiamate di rete HTTP.
 */
async function resolveImageAsBase64(
  imagePath: string | null | undefined,
): Promise<string> {
  if (!imagePath) return "";

  try {
    if (imagePath.startsWith("data:")) {
      return imagePath;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      const response = await fetch(imagePath);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = response.headers.get("content-type") || "image/png";
        return `data:${contentType};base64,${buffer.toString("base64")}`;
      }
    }

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;
    const fullPath = path.join(process.cwd(), "public", cleanPath);

    if (fs.existsSync(fullPath)) {
      const fileBuffer = fs.readFileSync(fullPath);
      const ext =
        path.extname(fullPath).replace(".", "").toLowerCase() || "png";
      const mimeType = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
      return `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
    }
  } catch (err) {
    logger.error(
      "❌ [CertificateService] Errore conversione immagine Base64:",
      err,
    );
  }

  return imagePath;
}

export class CertificateService {
  private emailService: EmailService;

  constructor(private repository = new SupabaseCertificateRepository()) {
    this.emailService = new EmailService();
  }

  /**
   * Helper privato per estrarre il voto percentuale dal testo del sottotitolo se omesso
   * Es: "Modulo superato (Voto: 8.00 / 10)" -> 80
   */
  private parseScoreFromSubtitle(subtitle?: string | null): number | null {
    if (!subtitle) return null;
    const voteMatch = subtitle.match(/Voto:\s*([\d.]+)\s*\/\s*10/i);
    if (voteMatch && voteMatch[1]) {
      const vote10 = parseFloat(voteMatch[1]);
      if (!isNaN(vote10)) {
        return vote10 <= 10 ? vote10 * 10 : vote10;
      }
    }
    const percentMatch = subtitle.match(/([\d.]+)\s*%/);
    if (percentMatch && percentMatch[1]) {
      const val = parseFloat(percentMatch[1]);
      if (!isNaN(val)) return val;
    }
    return null;
  }

  async getStudentCertificates(userId: string): Promise<Certificate[]> {
    return this.repository.getUserCertificates(userId);
  }

  async getCertificate(certificateId: string): Promise<Certificate | null> {
    return this.repository.getCertificateById(certificateId);
  }

  async verifyCertificate(
    verificationToken: string,
  ): Promise<Certificate | null> {
    return this.repository.getCertificateByVerificationToken(verificationToken);
  }

  async markModuleCompleted(
    userId: string,
    courseId: string,
    moduleId: string,
    completionPercentage: number = 100,
    quizScore?: number,
  ): Promise<ModuleCompletion> {
    if (!moduleId) {
      throw new Error(
        "❌ [CertificateService] markModuleCompleted invocato senza moduleId.",
      );
    }
    const safePercentage =
      typeof completionPercentage === "number" ? completionPercentage : 100;
    const safeScore = typeof quizScore === "number" ? quizScore : undefined;

    const existing = await this.repository.getModuleCompletion(
      userId,
      moduleId,
    );

    if (existing) {
      await this.repository.updateModuleCompletion(existing.id, {
        completed: true,
        completedAt: new Date().toISOString(),
        completionPercentage: safePercentage,
        quizScore: safeScore,
      });

      return {
        ...existing,
        completed: true,
        completedAt: new Date().toISOString(),
        completionPercentage: safePercentage,
        quizScore: safeScore,
      };
    }

    return this.repository.createModuleCompletion({
      userId,
      courseId,
      moduleId,
      completionPercentage: safePercentage,
      quizScore: safeScore,
      completed: true,
      completedAt: new Date().toISOString(),
    });
  }

  async hasCertificate(
    userId: string,
    moduleId: string,
    lessonId?: string,
  ): Promise<boolean> {
    const certificates = await this.repository.getUserCertificates(userId);
    return certificates.some((c) => {
      if (lessonId) {
        return c.moduleId === moduleId && c.lessonId === lessonId;
      }
      return c.moduleId === moduleId && !c.lessonId;
    });
  }

  async generateCertificate(data: {
    userId: string;
    courseId: string;
    moduleId: string;
    lessonId?: string;
    templateId?: string;
    issuedBy?: string;
    title: string;
    subtitle?: string;
    completionPercentage?: number;
    score?: number | string;
  }): Promise<Certificate> {
    if (!data.moduleId) {
      throw new Error(
        "❌ [CertificateService] generateCertificate invocato senza moduleId.",
      );
    }

    // 1. Lettura diretta da module_completions per dare priorità a quiz_score dal DB
    const completion = await this.repository.getModuleCompletion(
      data.userId,
      data.moduleId,
    );

    let rawScore: number | null = null;

    if (completion?.quizScore != null && !isNaN(Number(completion.quizScore))) {
      rawScore = Number(completion.quizScore);
    } else if (data.score != null && !isNaN(Number(data.score))) {
      rawScore = Number(data.score);
    } else {
      rawScore = this.parseScoreFromSubtitle(data.subtitle);
    }

    // Normalizzazione scala: se <= 10 (es. 8.00 o 8.50), converte in percentuale (80 o 85)
    const finalScore =
      rawScore != null ? (rawScore <= 10 ? rawScore * 10 : rawScore) : 100;

    // Generazione o mantenimento del sottotitolo sincronizzato
    const voteOutOfTen = (finalScore / 10).toFixed(2);
    const finalSubtitle =
      data.subtitle ||
      `Modulo superato con esito positivo (Voto: ${voteOutOfTen} / 10)`;

    const safePercentage =
      data.completionPercentage != null &&
      !isNaN(Number(data.completionPercentage))
        ? Number(data.completionPercentage)
        : 100;

    // Recupero preventivo delle impostazioni di sistema per risolvere il template_id predefinito
    const settings = await this.repository.getSettings();
    const effectiveTemplateId =
      data.templateId || settings?.defaultTemplateId || null;

    const userCertificates = await this.repository.getUserCertificates(
      data.userId,
    );

    // Ricerca puntuale per evitare collisioni tra attestati di lezione e attestati di modulo
    const existingCertificate = userCertificates.find((c) => {
      if (data.lessonId) {
        return c.moduleId === data.moduleId && c.lessonId === data.lessonId;
      }
      return c.moduleId === data.moduleId && !c.lessonId;
    });

    if (existingCertificate) {
      const currentScore =
        existingCertificate.score != null
          ? Number(existingCertificate.score)
          : null;

      const scoreChanged = currentScore !== finalScore;
      const subtitleChanged =
        data.subtitle !== undefined &&
        data.subtitle !== existingCertificate.subtitle;
      const titleChanged =
        data.title !== undefined && data.title !== existingCertificate.title;
      const templateChanged =
        effectiveTemplateId !== null &&
        existingCertificate.templateId !== effectiveTemplateId;
      const issuedByChanged =
        data.issuedBy !== undefined &&
        data.issuedBy !== existingCertificate.issuedBy;

      if (
        scoreChanged ||
        subtitleChanged ||
        titleChanged ||
        templateChanged ||
        issuedByChanged
      ) {
        logger.info(
          `🔄 [CertificateService] Aggiornamento certificato ${existingCertificate.id} con nuovi dati...`,
        );

        const updatedCertificate = await this.repository.updateCertificate(
          existingCertificate.id,
          {
            score: finalScore,
            completionPercentage: safePercentage,
            title: data.title ?? existingCertificate.title,
            subtitle: finalSubtitle,
            templateId: effectiveTemplateId ?? existingCertificate.templateId,
            issuedBy: data.issuedBy ?? existingCertificate.issuedBy,
            pdfGenerated: false,
            emailSent: false,
          },
        );

        return updatedCertificate;
      }

      return existingCertificate;
    }

    // Creazione nuovo certificato
    const certificatePayload = {
      userId: data.userId,
      courseId: data.courseId,
      moduleId: data.moduleId,
      lessonId: data.lessonId ?? null,
      templateId: effectiveTemplateId,
      issuedBy: data.issuedBy ?? null,
      title: data.title,
      subtitle: finalSubtitle,
      completionPercentage: safePercentage,
      score: finalScore,
      certificateNumber: `CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    const certificate = await this.repository.createCertificate(
      certificatePayload as any,
    );

    await this.logEvent(certificate.id, "GENERATED");

    if (completion) {
      await this.repository.updateModuleCompletion(completion.id, {
        certificateGenerated: true,
      });
    }

    return certificate;
  }

  async processAutomations(
    certificate: Certificate,
    studentName: string,
    studentEmail: string,
  ): Promise<void> {
    try {
      const settings = await this.repository.getSettings();

      if (!settings) {
        logger.warn(
          `⚠️ [CertificateService] Impostazioni certificato mancanti.`,
        );
        return;
      }

      let pdfBuffer: Buffer | null = null;
      let pdfUrl = certificate.pdfUrl;
      const supabase = getSupabaseAdmin();
      const filePath = `${certificate.userId}/${certificate.id}.pdf`;

      if (settings.autoGeneratePdf && !certificate.pdfGenerated) {
        const templateId = certificate.templateId || settings.defaultTemplateId;
        if (templateId) {
          const template = await this.repository.getTemplate(templateId);
          if (template) {
            const appUrl =
              process.env.NEXT_PUBLIC_APP_URL || "https://gcprof-academy.com";
            const verificationUrl = `${appUrl}/verify-certificate/${certificate.verificationToken || certificate.id}`;

            const rawLogoPath =
              template.logoUrl ||
              settings.logoUrl ||
              "/gcprof-ai-academy_logo_01.png";

            const logoBase64 = await resolveImageAsBase64(rawLogoPath);

            const numericScore =
              certificate.score != null ? Number(certificate.score) : NaN;
            const scoreFormatted = !isNaN(numericScore)
              ? numericScore.toFixed(0)
              : "100";

            const compiledHtml = template.htmlTemplate
              .replace(/\{\{logoUrl\}\}/g, logoBase64)
              .replace(/\{\{studentName\}\}/g, studentName)
              .replace(
                /\{\{courseTitle\}\}/g,
                certificate.title || "Corso di Formazione",
              )
              .replace(/\{\{subtitle\}\}/g, certificate.subtitle || "")
              .replace(/\{\{score\}\}/g, scoreFormatted)
              .replace(/\{\{date\}\}/g, new Date().toLocaleDateString("it-IT"))
              .replace(
                /\{\{certificateNumber\}\}/g,
                certificate.certificateNumber || certificate.id,
              )
              .replace(/\{\{verificationUrl\}\}/g, verificationUrl);

            const fullHtml = `
              <!DOCTYPE html>
              <html lang="it">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    ${template.cssTemplate || ""}
                  </style>
                </head>
                <body>
                  ${compiledHtml}
                </body>
              </html>
            `;

            try {
              pdfBuffer = await generatePdfFromHtml(fullHtml);

              const { error: uploadError } = await supabase.storage
                .from("certificates")
                .upload(filePath, pdfBuffer, {
                  contentType: "application/pdf",
                  upsert: true,
                  cacheControl: "0",
                });

              if (!uploadError) {
                const { data: publicUrlData } = supabase.storage
                  .from("certificates")
                  .getPublicUrl(filePath);

                pdfUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

                await this.repository.updateCertificate(certificate.id, {
                  pdfUrl: pdfUrl,
                  pdfGenerated: true,
                });

                certificate.pdfUrl = pdfUrl;
                certificate.pdfGenerated = true;
              } else {
                logger.error(
                  "❌ Errore durante l'upload del PDF nello Storage:",
                  uploadError,
                );
              }
            } catch (pdfErr) {
              logger.error("❌ Errore durante la generazione del PDF:", pdfErr);
            }
          } else {
            logger.warn(
              `⚠️ Template con ID ${templateId} non trovato per il certificato ${certificate.id}`,
            );
          }
        }
      }

      if (
        settings.autoSendEmail &&
        !certificate.emailSent &&
        !pdfBuffer &&
        pdfUrl
      ) {
        try {
          const { data: fileData, error: downloadError } =
            await supabase.storage.from("certificates").download(filePath);

          if (!downloadError && fileData) {
            const arrayBuffer = await fileData.arrayBuffer();
            pdfBuffer = Buffer.from(arrayBuffer);
          }
        } catch (err) {
          logger.error("Impossibile recuperare il PDF dallo Storage:", err);
        }
      }

      if (
        settings.autoSendEmail &&
        !certificate.emailSent &&
        pdfBuffer &&
        pdfUrl
      ) {
        try {
          await this.emailService.sendCertificateEmail(
            studentEmail,
            studentName,
            certificate.title || "Corso",
            pdfBuffer,
            pdfUrl,
          );
          await this.markEmailSent(certificate.id);
        } catch (error) {
          logger.error("Errore durante l'invio dell'email certificato:", error);
        }
      }
    } catch (err) {
      logger.error("❌ Errore generale in processAutomations:", err);
    }
  }

  async registerDownload(certificate: Certificate): Promise<void> {
    const currentCount =
      typeof certificate.downloadCount === "number"
        ? certificate.downloadCount
        : 0;
    await this.repository.updateCertificate(certificate.id, {
      downloadCount: currentCount + 1,
      lastDownloadAt: new Date().toISOString(),
    });

    await this.logEvent(certificate.id, "DOWNLOADED");
  }

  async markEmailSent(certificateId: string): Promise<void> {
    await this.repository.updateCertificate(certificateId, {
      emailSent: true,
    });

    await this.logEvent(certificateId, "EMAILED");
  }

  async revokeCertificate(certificateId: string): Promise<void> {
    await this.repository.updateCertificate(certificateId, {
      status: "REVOKED",
    });

    await this.logEvent(certificateId, "REVOKED");
  }

  async logEvent(
    certificateId: string,
    type: CertificateEventType,
  ): Promise<void> {
    await this.repository.createEvent({
      certificateId,
      eventType: type,
    });
  }
}