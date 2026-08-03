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
    // 1. Se è già un Data URL Base64
    if (imagePath.startsWith("data:")) {
      return imagePath;
    }

    // 2. Se è un URL remoto HTTPS/HTTP (es. Supabase Storage o CDN esterna)
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      const response = await fetch(imagePath);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = response.headers.get("content-type") || "image/png";
        return `data:${contentType};base64,${buffer.toString("base64")}`;
      }
    }

    // 3. Se è un percorso relativo locale nella cartella /public
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
    } else {
      logger.warn(
        `⚠️ [CertificateService] File immagine non trovato sul filesystem locale: ${fullPath}`,
      );
    }
  } catch (err) {
    logger.error(
      "❌ [CertificateService] Errore nella conversione dell'immagine in Base64:",
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
      if (lessonId && c.lessonId) {
        return c.moduleId === moduleId && c.lessonId === lessonId;
      }
      return c.moduleId === moduleId;
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
    score?: number;
  }): Promise<Certificate> {
    const alreadyExists = await this.hasCertificate(
      data.userId,
      data.moduleId,
      data.lessonId,
    );

    if (alreadyExists) {
      throw new Error("Certificate already exists.");
    }

    // Sanitizzazione preventiva: evita che undefined/falsy finiscano come "false" su colonne INTEGER o UUID
    const safeScore = typeof data.score === "number" ? data.score : null;
    const safePercentage =
      typeof data.completionPercentage === "number"
        ? data.completionPercentage
        : 100;

    const certificatePayload = {
      userId: data.userId,
      courseId: data.courseId,
      moduleId: data.moduleId,
      lessonId: data.lessonId ?? null,
      templateId: data.templateId ?? null,
      issuedBy: data.issuedBy ?? null,
      title: data.title,
      subtitle: data.subtitle ?? null,
      completionPercentage: safePercentage,
      score: safeScore,
      certificateNumber: `CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    const certificate = await this.repository.createCertificate(
      certificatePayload as any,
    );

    await this.logEvent(certificate.id, "GENERATED");

    const completion = await this.repository.getModuleCompletion(
      data.userId,
      data.moduleId,
    );

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
    const settings = await this.repository.getSettings();
    if (!settings) return;

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

          // Gerarchia logo: Template Logo -> Settings Logo -> Local Fallback Logo
          const rawLogoPath =
            template.logoUrl ||
            settings.logoUrl ||
            "/gcprof-ai-academy_logo_01.png";

          // Conversione automatica in Base64
          const logoBase64 = await resolveImageAsBase64(rawLogoPath);

          // Punteggio formattato
          const scoreFormatted =
            certificate.score != null && typeof certificate.score === "number"
              ? Number(certificate.score).toFixed(0)
              : "100";

          // Sostituzione dei Placeholder nell'HTML
          const compiledHtml = template.htmlTemplate
            .replace(/\{\{logoUrl\}\}/g, logoBase64)
            .replace(/\{\{studentName\}\}/g, studentName)
            .replace(
              /\{\{courseTitle\}\}/g,
              certificate.title || "Corso di Formazione",
            )
            .replace(/\{\{score\}\}/g, scoreFormatted)
            .replace(/\{\{date\}\}/g, new Date().toLocaleDateString("it-IT"))
            .replace(
              /\{\{certificateNumber\}\}/g,
              certificate.certificateNumber || certificate.id,
            )
            .replace(/\{\{verificationUrl\}\}/g, verificationUrl);

          // Documento HTML completo con stili CSS e Meta Tag UTF-8
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

          // Genera il PDF tramite Puppeteer
          pdfBuffer = await generatePdfFromHtml(fullHtml);

          // Upload su Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from("certificates")
            .upload(filePath, pdfBuffer, {
              contentType: "application/pdf",
              upsert: true,
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from("certificates")
              .getPublicUrl(filePath);

            pdfUrl = publicUrlData.publicUrl;

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
        }
      }
    }

    // Fallback invio Email: recupera il PDF dallo Storage se non appena generato in memoria
    if (
      settings.autoSendEmail &&
      !certificate.emailSent &&
      !pdfBuffer &&
      pdfUrl
    ) {
      try {
        const { data: fileData, error: downloadError } = await supabase.storage
          .from("certificates")
          .download(filePath);

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
