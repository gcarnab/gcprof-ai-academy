import fs from "fs";
import path from "path";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import CreditsClientWrapper from "./CreditsClientWrapper";
import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { logger } from "@/lib/logger";

export const metadata: Metadata = {
  title: "Credits",
  description: `Scopri il progetto ${siteConfig.siteName ?? "GCPROF Academy"}, le tecnologie utilizzate e i riconoscimenti.`,
};

export const dynamic = "force-dynamic";

export default async function CreditsPage() {
  // Punti Hardcoded estratti in variabile d'ambiente (Vincolo 4)
  const source = process.env.CREDITS_CONTENT_SOURCE || "docs/credits.md";
  let markdownRawContent = "# Documentazione\nFile non trovato.";

  try {
    if (source.startsWith("http://") || source.startsWith("https://")) {
      logger.info(`Caricamento credits da sorgente remota: ${source}`);
      const res = await fetch(source, { cache: "no-store" });
      if (res.ok) {
        markdownRawContent = await res.text();
      } else {
        logger.warn(`Sorgente remota credits restituito status: ${res.status}`);
        markdownRawContent = "# Errore di caricamento remoto.";
      }
    } else {
      logger.info(`Caricamento credits da file system locale: ${source}`);
      const filePath = path.isAbsolute(source) 
        ? source 
        : path.join(process.cwd(), source);

      if (fs.existsSync(filePath)) {
        markdownRawContent = fs.readFileSync(filePath, "utf-8");
      }
    }
  } catch (err: any) {
    logger.error("Errore critico durante il fetch/lettura dei credits:", err);
    markdownRawContent = `# Errore di caricamento dei contenuti.\n${err.message || ""}`;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
        <CreditsClientWrapper initialMarkdown={markdownRawContent} />
      </main>
      <Footer />
    </div>
  );
}