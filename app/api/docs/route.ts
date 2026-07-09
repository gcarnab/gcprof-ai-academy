import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { logger } from "@/lib/logger";

export async function GET() {
  const source = process.env.CREDITS_CONTENT_SOURCE || "docs/credits.md";

  try {
    if (source.startsWith("http://") || source.startsWith("https://")) {
      logger.info(`API Docs: Caricamento remoto da ${source}`);
      const res = await fetch(source, { cache: "no-store" });
      if (!res.ok) {
        return NextResponse.json({ content: `# Errore\nImpossibile recuperare il file remoto. Status: ${res.status}` });
      }
      const fileContent = await res.text();
      return NextResponse.json({ content: fileContent });
    } else {
      logger.info(`API Docs: Caricamento locale da ${source}`);
      const filePath = path.isAbsolute(source) 
        ? source 
        : path.join(process.cwd(), source);
      
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ content: `# Errore\nFile \`${source}\` non trovato nella root.` });
      }

      const fileContent = fs.readFileSync(filePath, "utf-8");
      return NextResponse.json({ content: fileContent });
    }
  } catch (error: any) {
    logger.error("API Docs: Errore di lettura nella route:", error);
    return NextResponse.json({ content: `# Errore di lettura\n${error.message}` });
  }
}