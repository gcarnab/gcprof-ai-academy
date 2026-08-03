export interface CertificateSettings {
  id: string;
  defaultTemplateId?: string | null;
  organizationName?: string | null;
  directorName?: string | null;
  directorTitle?: string | null;
  signatureUrl?: string | null;
  logoUrl?: string | null;
  certificatePrefix: string;
  enableQrCode: boolean;
  autoGeneratePdf: boolean;
  autoSendEmail: boolean;
  verificationBaseUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}