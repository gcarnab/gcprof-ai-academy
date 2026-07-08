"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Client Supabase Client-Side (Anon Key)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const recordPageView = async () => {
      try {
        // 1. Recuperiamo la sessione dell'utente corrente
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return; // Non tracciamo gli utenti anonimi o non loggati

        const profileId = session.user.id;
        
        // 2. Estraiamo in modo intelligente i segmenti dall'URL
        const segments = pathname.split("/").filter(Boolean);
        let course_slug: string | null = null;
        let lesson_slug: string | null = null;

        if (segments[0] === "courses" && segments[1]) {
          course_slug = segments[1];
          if (segments[2] === "lessons" && segments[3]) {
            lesson_slug = segments[3];
          }
        }

        // 3. Salviamo direttamente su DB (rispetta la policy RLS creata in precedenza)
        await supabase.from("user_page_views").insert({
          profile_id: profileId,
          path: pathname,
          course_slug,
          lesson_slug,
          viewed_at: new Date().toISOString()
        });

      } catch (err) {
        console.error("Errore durante il salvataggio della page view:", err);
      }
    };

    recordPageView();
  }, [pathname]); // Si riattiva automaticamente ogni volta che l'utente cambia rotta/pagina

  return null; // È un componente invisibile (provider di eventi)
}