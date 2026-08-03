export interface CertificateTemplate {
  id: string;
  name: string;
  description?: string | null;
  htmlTemplate: string;
  cssTemplate?: string | null;
  logoUrl?: string | null;
  backgroundUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}