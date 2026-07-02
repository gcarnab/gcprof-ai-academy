import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"; // Oppure usa il tuo client configurato in src/lib/supabase

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Usiamo il service role lato server per scrivere in sicurezza
);

// Ritorna la configurazione salvata nel DB (Usata da tutti)
export async function GET() {
  const { data, error } = await supabase
    .from("document_configs")
    .select("*")
    .eq("is_active", true)
    .order("updated_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Aggiorna un percorso nel DB (Chiamata dal tasto Salva Modifiche dell'admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, file_path, label } = body;

    const { error } = await supabase
      .from("document_configs")
      .update({ file_path, label, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}