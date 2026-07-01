import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "[SUPABASE CRITICAL] Variabili d'ambiente SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY mancanti nel file .env.local"
  );
}

// Inizializzazione sicura per ambienti Server-Side / Serverless
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false, // Disabilita il salvataggio dei token nel local storage (non presente sul server)
    autoRefreshToken: false,
  },
});