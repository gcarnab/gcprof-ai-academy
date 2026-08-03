export type CertificateStatus =
  | "ACTIVE"
  | "REVOKED"
  | "EXPIRED";

export interface Certificate {
  id: string;
  publicId: string;
  certificateNumber: string;
  verificationToken: string;
  userId: string;
  courseId: string;
  moduleId?: string | null;
  lessonId?: string;
  templateId?: string | null;
  issuedBy?: string | null;
  title: string;
  subtitle?: string | null;
  score?: number | null;
  completionPercentage?: number | null;
  pdfUrl?: string | null;
  pdfGenerated: boolean;
  emailSent: boolean;
  downloadCount: number;
  lastDownloadAt?: string | null;
  issuedAt: string;
  expiresAt?: string | null;
  status: CertificateStatus;
  createdAt: string;
  updatedAt: string;
}