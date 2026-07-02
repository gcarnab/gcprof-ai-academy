import fs from "fs";
import path from "path";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import CreditsClientWrapper from "./CreditsClientWrapper";

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
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
        <CreditsClientWrapper initialMarkdown={markdownRawContent} />
      </main>
      <Footer />
    </div>
  );
}