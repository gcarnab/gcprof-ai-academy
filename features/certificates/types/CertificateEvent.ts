export type CertificateEventType =
  | "GENERATED"
  | "DOWNLOADED"
  | "EMAILED"
  | "VERIFIED"
  | "REVOKED"
  | "REGENERATED";

export interface CertificateEvent {
  id: string;
  certificateId: string;
  eventType: CertificateEventType;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}