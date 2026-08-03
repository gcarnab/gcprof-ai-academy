"use server";

import { CertificateService } from "../services/CertificateService";

const service = new CertificateService();

export async function downloadCertificateAction(
    certificateId: string
) {

    const certificate =
        await service.getCertificate(
            certificateId
        );

    if (!certificate) {

        throw new Error(
            "Certificate not found."
        );

    }

    await service.registerDownload(
        certificate
    );

    return certificate;

}