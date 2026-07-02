import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Risolve il percorso in modo cross-platform (Root -> docs -> credits.md)
    const filePath = path.join(process.cwd(), "docs", "credits.md");
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ content: "# Errore\nFile `docs/credits.md` non trovato nella root." });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ content: fileContent });
  } catch (error: any) {
    return NextResponse.json({ content: `# Errore di lettura\n${error.message}` });
  }
}