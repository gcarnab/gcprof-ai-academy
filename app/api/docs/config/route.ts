import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";

interface ExtendedTokenPayload {
  id: string;
  email: string;
  role: "admin" | "student";
  status?: "active" | "blocked" | "pending"; // Reso opzionale per evitare crash se manca nel JWT
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const tokenService = new JoseTokenService();
const cookieService = new NextCookieService();

// GET: Ritorna la configurazione salvata nel DB se l'utente è autenticato e autorizzato
// GET pubblica e sicura (nessuna mutazione di dati)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("document_configs")
      .select("*")
      .eq("is_active", true)
      .order("updated_at", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST: Aggiorna un percorso nel DB - Riservato esclusivamente agli Admin
export async function POST(request: Request) {
  try {
    const token = await cookieService.getSession();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = (await tokenService.verify(token)) as ExtendedTokenPayload | null;
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin privileges required" }, { status: 403 });
    }

    const body = await request.json();
    const { id, file_path, label } = body;

    if (!id || !file_path) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabase
      .from("document_configs")
      .update({ 
        file_path, 
        label, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}