import { NextRequest, NextResponse } from "next/server";
import { SupabaseCertificateRepository } from "@/features/certificates/repositories/SupabaseCertificateRepository";
import { generatePdfFromHtml } from "@/lib/pdfGenerator";
import { getSupabaseAdmin } from "@/lib/supabase";
import fs from "fs";
import path from "path";

/**
 * Converte qualsiasi immagine (file locale in public/, URL HTTPS o Data URL)
 * in una stringa Base64 pronta per Puppeteer.
 */
async function resolveImageAsBase64(
  imagePath: string | null | undefined,
): Promise<string> {
  if (!imagePath) return "";

  try {
    if (imagePath.startsWith("data:")) return imagePath;

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      const response = await fetch(imagePath);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = response.headers.get("content-type") || "image/png";
        return `data:${contentType};base64,${buffer.toString("base64")}`;
      }
    }

    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;
    const fullPath = path.join(process.cwd(), "public", cleanPath);

    if (fs.existsSync(fullPath)) {
      const fileBuffer = fs.readFileSync(fullPath);
      const ext =
        path.extname(fullPath).replace(".", "").toLowerCase() || "png";
      const mimeType = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
      return `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
    }
  } catch (err) {
    console.error("❌ Errore nella conversione dell'immagine in Base64:", err);
  }

  return imagePath;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Parametri dinamici dalla Query String
    const userId =
      searchParams.get("userId") || "ccc07580-f37b-42e3-93e8-9680099fbebe";
    const courseId = searchParams.get("courseId");
    const moduleId = searchParams.get("moduleId");
    const lessonId = searchParams.get("lessonId"); // 👈 Nuova estrazione del parametro lezioni
    const previewMode = searchParams.get("preview") === "true";

    const repo = new SupabaseCertificateRepository();
    const supabaseAdmin = getSupabaseAdmin();

    // 1. Lettura Settings e Template
    const settings = await repo.getSettings();
    if (!settings || !settings.defaultTemplateId) {
      throw new Error("Impostazioni o defaultTemplateId mancanti nel DB.");
    }

    const template = await repo.getTemplate(settings.defaultTemplateId);
    if (!template) {
      throw new Error(
        `Template non trovato con ID ${settings.defaultTemplateId}`,
      );
    }

    // 2. Recupero Dati Utente
    let studentName = "Giuseppe Carnabuci";
    const { data: userData } =
      await supabaseAdmin.auth.admin.getUserById(userId);
    if (userData?.user) {
      studentName =
        userData.user.user_metadata?.full_name ||
        userData.user.user_metadata?.name ||
        userData.user.email ||
        studentName;
    }

    // 3. Recupero Dinamico Titoli (Corso, Modulo, Lezione) e Punteggio Quiz
    let courseTitle = "Corso di Formazione";
    let moduleTitle = "";
    let lessonTitle = "";
    let scoreFormatted = "100";

    // A) Titolo del Corso
    if (courseId) {
      const { data: courseData } = await supabaseAdmin
        .from("courses")
        .select("title")
        .eq("id", courseId)
        .single();
      if (courseData?.title) courseTitle = courseData.title;
    }

    // B) Titolo del Modulo e Punteggio Quiz
    if (moduleId) {
      const { data: moduleData } = await supabaseAdmin
        .from("course_modules")
        .select("title")
        .eq("id", moduleId)
        .single();

      if (moduleData?.title) {
        moduleTitle = moduleData.title;
      }

      // Recupero del punteggio del quiz finale per questo modulo
      const { data: completion } = await supabaseAdmin
        .from("module_completions")
        .select("quiz_score")
        .eq("user_id", userId)
        .eq("module_id", moduleId)
        .single();

      if (completion?.quiz_score != null) {
        scoreFormatted = Number(completion.quiz_score).toFixed(0);
      }
    }

    // C) Titolo della Lezione Specifica
    if (lessonId) {
      // Nota: adatta il nome della tabella se nel tuo DB si chiama 'lessons' invece di 'course_lessons'
      const { data: lessonData } = await supabaseAdmin
        .from("course_lessons")
        .select("title")
        .eq("id", lessonId)
        .single();

      if (lessonData?.title) {
        lessonTitle = lessonData.title;
      }
    }

    // Costruzione titolo completo per il fallback
    let fullCourseTitle = courseTitle;
    if (moduleTitle) fullCourseTitle += ` - ${moduleTitle}`;
    if (lessonTitle) fullCourseTitle += ` (${lessonTitle})`;

    // 4. Risoluzione Logo in Base64
    const rawLogoPath =
      template.logoUrl || settings.logoUrl || "/gcprof-ai-academy_logo_01.png";
    const logoBase64 = await resolveImageAsBase64(rawLogoPath);

    // 5. Compilazione dell'HTML con Sostituzione Placeholders
    const dummyToken = "TEST-VERIFICATION-TOKEN-12345";
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-certificate/${dummyToken}`;

    const compiledHtml = template.htmlTemplate
      .replace(/\{\{logoUrl\}\}/g, logoBase64)
      .replace(/\{\{studentName\}\}/g, studentName)
      .replace(/\{\{courseTitle\}\}/g, fullCourseTitle) // Supporta sia l'intestazione completa...
      .replace(/\{\{moduleTitle\}\}/g, moduleTitle) // ...sia i singoli placeholder dedicati
      .replace(/\{\{lessonTitle\}\}/g, lessonTitle) // 👈 Sostituzione specifica per la lezione
      .replace(/\{\{score\}\}/g, scoreFormatted)
      .replace(/\{\{date\}\}/g, new Date().toLocaleDateString("it-IT"))
      .replace(/\{\{certificateNumber\}\}/g, "CERT-TEST-001")
      .replace(/\{\{verificationUrl\}\}/g, verificationUrl);

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="it">
        <head>
          <meta charset="UTF-8">
          <style>${template.cssTemplate || ""}</style>
        </head>
        <body>${compiledHtml}</body>
      </html>
    `;

    // 6. Generazione PDF via Puppeteer
    const pdfBuffer = await generatePdfFromHtml(fullHtml);

    // 🔍 SE preview=true: Mostra il PDF direttamente nella scheda del browser
    if (previewMode) {
      return new NextResponse(new Uint8Array(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline; filename=certificato-test.pdf",
        },
      });
    }

    // Altrimenti esegui upload di test e restituisci risposta JSON
    const fileName = `test/${Date.now()}.pdf`;
    await supabaseAdmin.storage
      .from("certificates")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("certificates")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      data: {
        studentName,
        courseTitle,
        moduleTitle,
        lessonTitle,
        quizScore: scoreFormatted,
        pdfUrl: publicUrlData.publicUrl,
        previewDirectlyUrl: `/api/test-certificate?userId=${userId}&courseId=${courseId || ""}&moduleId=${moduleId || ""}&lessonId=${lessonId || ""}&preview=true`,
      },
    });
  } catch (error: any) {
    console.error("❌ Errore test certificate:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
