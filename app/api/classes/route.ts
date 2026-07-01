// Esempio di correzione all'interno della Route API

import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("academy_classes") // 🎯 Assicurati che punti alla NUOVA tabella
    .select("id, name")
    .order("name", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
