import { createClient } from "@supabase/supabase-js";

// 🌐 1. CLIENT PUBBLICO (Per Componenti Client / Browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Mancano le variabili d'ambiente NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Questa istanza è sicura per il browser e protetta da RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// 🔒 2. CLIENT ADMIN (Solo per Server Actions / API Routes - NON usare nel browser)
export const getSupabaseAdmin = () => {
  const adminUrl = process.env.SUPABASE_URL!;
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  if (!adminUrl || !adminKey) {
    throw new Error("Mancano le variabili d'ambiente server-side SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  }
  
  return createClient(adminUrl, adminKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
};

export { createClient };
