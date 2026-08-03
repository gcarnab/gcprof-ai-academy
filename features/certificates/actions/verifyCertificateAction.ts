"use server";

import { CertificateService } from "../services/CertificateService";

const service = new CertificateService();

export async function verifyCertificateAction(
    verificationToken: string
) {

    return service.verifyCertificate(
        verificationToken
    );

}