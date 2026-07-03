import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { createClient } from "@supabase/supabase-js";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-key-change-me-in-production"
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.id as string;

    // 1. 🎯 AGGIORNATO: Leggiamo tutti i dati del profilo in tempo reale dal DB (compresi i nuovi campi)
    const { data: profile, error: dbError } = await supabaseAdmin
      .from("profiles")
      .select("status, role, display_name, first_name, last_name, avatar_url")
      .eq("id", userId)
      .maybeSingle();

    if (dbError || !profile) {
      console.error("[API SESSION] Profilo non trovato su DB profiles:", dbError?.message);
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const finalStatus = profile.role === "admin" ? "active" : profile.status;

    // 2. CORREZIONE SCHEMA: Join esatta tra profile_classes e academy_classes
    const { data: relations, error: relError } = await supabaseAdmin
      .from("profile_classes")
      .select(`
        academy_classes ( name )
      `)
      .eq("profile_id", userId);

    if (relError) {
      console.error("[API SESSION] Errore nel recupero delle academy_classes:", relError.message);
    }

    // Estraiamo l'array dei nomi (es. ["Informatica 1°"])
    const currentClasses = (relations || [])
      .map((r: any) => r.academy_classes?.name)
      .filter(Boolean);

    // Mappatura finale dell'oggetto utente da inviare al front-end Context
    const user = {
      id: userId,
      email: payload.email,
      role: profile.role || payload.role,
      displayName: profile.display_name || payload.displayName, // 🎯 Prende il valore fresco dal DB
      classes: currentClasses,
      status: finalStatus,
      firstName: profile.first_name || undefined,   // 🎯 NUOVO: Mappato in camelCase
      lastName: profile.last_name || undefined,     // 🎯 NUOVO: Mappato in camelCase
      avatarUrl: profile.avatar_url || undefined,   // 🎯 NUOVO: Mappato in camelCase
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[API SESSION ERROR] Token non valido o scaduto:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}