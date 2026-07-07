import fs from "fs";
import path from "path";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import CreditsClientWrapper from "./CreditsClientWrapper";
import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Credits",
  description: `Scopri il progetto ${siteConfig.siteName ?? "GCPROF Academy"}, le tecnologie utilizzate e i riconoscimenti.`,
};

export const dynamic = "force-dynamic";

export default async function CreditsPage() {
  const markdownPath = path.join(process.cwd(), "docs", "credits.md");
  let markdownRawContent = "# Documentazione\nFile non trovato.";

  try {
    if (fs.existsSync(markdownPath)) {
      markdownRawContent = fs.readFileSync(markdownPath, "utf-8");
    }
  } catch (err) {
    markdownRawContent = "# Errore di caricamento file system.";
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
        <CreditsClientWrapper initialMarkdown={markdownRawContent} />
      </main>
      <Footer />
    </div>
  );
}