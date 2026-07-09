import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { logger } from "@/lib/logger";

interface ExtendedTokenPayload {
  id: string;
  email: string;
  role: "admin" | "student";
  status?: "active" | "blocked" | "pending";
}

// Inizializzazione del client Supabase con la chiave di servizio per i privilegi di scrittura
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

// Dimensione massima di sicurezza: 1MB in byte
const MAX_FILE_SIZE = 1048576; 
const ALLOWED_EXTENSIONS = ["md", "pdf", "html", "txt"];

export async function POST(request: Request) {
  try {
    // 1. Controllo di Autenticazione e Autorizzazione (Identico a config/route.ts)
    const token = await cookieService.getSession();
    if (!token) {
      logger.warn("Tentativo di upload non autorizzato: Token mancante.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await tokenService.verify(token)) as ExtendedTokenPayload | null;
    if (!payload || payload.role !== "admin") {
      logger.warn(`Tentativo di violazione privilegi di upload da utente: ${payload?.email || "Sconosciuto"}`);
      return NextResponse.json({ error: "Forbidden: Admin privileges required" }, { status: 403 });
    }

    // 2. Parsing del payload FormData inviato dal client
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const channelId = formData.get("channelId") as string | null;

    if (!file || !channelId) {
      return NextResponse.json({ error: "File o Channel ID mancanti nel payload." }, { status: 400 });
    }

    // 3. Validazione di Sicurezza lato Server (Dimensione ed Estensione)
    if (file.size > MAX_FILE_SIZE) {
      logger.warn(`Rifiutato upload file troppo grande: ${file.name} (${file.size} byte)`);
      return NextResponse.json({ error: "Il file supera il limite massimo di 1MB." }, { status: 400 });
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      logger.warn(`Rifiutato upload estensione non consentita: ${file.name}`);
      return NextResponse.json({ error: `Estensione .${fileExtension} non supportata.` }, { status: 400 });
    }

    // Convertiamo il file in un Buffer compatibile con l'SDK di Supabase Storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generiamo un nome file pulito e normalizzato per evitare problemi nell'URL
    const sanitizedFileName = `${channelId}_${Date.now()}.${fileExtension}`;
    const bucketName = "contents";

    logger.info(`Inizio upload su Supabase Storage del file: ${sanitizedFileName} nel bucket ${bucketName}`);

    // 4. Caricamento fisico all'interno del Bucket su Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from(bucketName)
      .upload(sanitizedFileName, buffer, {
        contentType: file.type,
        upsert: true, // Se esiste già lo sovrascrive
      });

    if (storageError) {
      logger.error("Errore durante l'upload su Supabase Storage:", storageError);
      return NextResponse.json({ error: storageError.message }, { status: 500 });
    }

    // 5. Recupero dell'URL pubblico generato dallo Storage
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(sanitizedFileName);

    if (!urlData || !urlData.publicUrl) {
      logger.error("Impossibile generare l'URL pubblico per il file appena caricato.");
      return NextResponse.json({ error: "Errore nella generazione dell'URL del file." }, { status: 500 });
    }

    logger.info(`Upload completato con successo. URL Pubblico: ${urlData.publicUrl}`);

    // Ritorniamo l'URL pubblico al frontend
    return NextResponse.json({ 
      success: true, 
      publicUrl: urlData.publicUrl,
      path: storageData.path 
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error during file upload";
    logger.error("Errore critico intercettato nella rotta di upload:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}