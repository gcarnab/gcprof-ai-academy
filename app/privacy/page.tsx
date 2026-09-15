import { readFile } from "fs/promises";
import path from "path";

import PublicLayout from "@/shared/layout/PublicLayout";
import PageContainer from "@/shared/ui/PageContainer";
import { PrivacyMarkdownRenderer } from "@/features/privacy/components/PrivacyMarkdownRenderer";

export const metadata = {
  title: "Informativa sulla Privacy | GCPROF ACADEMY",
  description:
    "Informativa sul trattamento dei dati personali e sulla gestione dei cookie di GCPROF ACADEMY.",
};

export const dynamic = "force-static";

export default async function PrivacyPage() {
  const policyPath = path.join(
    process.cwd(),
    "public",
    "privacy",
    "gca-policy.md"
  );

  const policyContent = await readFile(policyPath, "utf-8");

  return (
    <PublicLayout>
      <PageContainer className="py-12 max-w-4xl">
        <PrivacyMarkdownRenderer content={policyContent} />
      </PageContainer>
    </PublicLayout>
  );
}