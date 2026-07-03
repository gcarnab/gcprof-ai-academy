"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface UpdateProfileInput {
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

/**
 * Aggiorna i dati testuali del profilo utente (Nome, Cognome, Nome visualizzato)
 */
export async function updateProfileText({ userId, firstName, lastName, displayName }: UpdateProfileInput) {
  if (!userId) {
    throw new Error("ID utente non valido o sessione scaduta.");
  }

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      display_name: displayName.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("❌ Errore Supabase nell'aggiornamento del profilo:", error.message);
    throw new Error(`Impossibile aggiornare i dati del profilo: ${error.message}`);
  }

  revalidatePath("/profile");
  
  return {
    success: true,
    profile: {
      firstName: data.first_name,
      lastName: data.last_name,
      displayName: data.display_name,
    }
  };
}

/**
 * Riceve il file dell'avatar da un Form client, lo valida, lo carica sul bucket 'avatars'
 * e aggiorna il record del profilo utente associato.
 */
export async function uploadAvatar(userId: string, formData: FormData) {
  if (!userId) {
    throw new Error("ID utente non valido o sessione mancante.");
  }

  const file = formData.get("avatar") as File;
  if (!file || file.size === 0) {
    throw new Error("Nessun file selezionato per il caricamento.");
  }

  // 🛡️ Sicurezza: Validazione dei formati immagine consentiti lato server
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Formato file non supportato. Seleziona un'immagine JPEG, PNG, WEBP o GIF.");
  }

  // 🛡️ Sicurezza: Controllo della dimensione massima (2MB)
  const maxBytes = 2 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("L'immagine selezionata è troppo grande. Il limite massimo è di 2MB.");
  }

  try {
    // Trasformiamo il file in un ArrayBuffer/Buffer gestibile da Node.js/Supabase SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generiamo un nome file univoco per evitare sovrascritture accidentali
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${userId}-${Date.now()}.${fileExtension}`;
    const filePath = `uploads/${uniqueFileName}`;

    // 1. Caricamento del file fisico all'interno del bucket 'avatars'
    const { error: uploadError } = await supabaseAdmin.storage
      .from("avatars")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Errore durante l'upload dello storage: ${uploadError.message}`);
    }

    // 2. Estrazione dell'URL pubblico generato da Supabase Storage
    const { data: urlData } = supabaseAdmin.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicAvatarUrl = urlData.publicUrl;

    // 3. Aggiornamento della colonna avatar_url nella tabella 'profiles' dell'utente
    const { error: dbError } = await supabaseAdmin
      .from("profiles")
      .update({
        avatar_url: publicAvatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (dbError) {
      throw new Error(`Errore nel salvataggio dell'URL sul database: ${dbError.message}`);
    }

    // Forza Next.js a rigenerare e aggiornare le componenti legate alla pagina del profilo
    revalidatePath("/profile");

    return { 
      success: true, 
      avatarUrl: publicAvatarUrl 
    };

  } catch (err: any) {
    console.error("💥 Eccezione durante la gestione dell'avatar:", err.message || err);
    throw new Error(err.message || "Si è verificato un errore imprevisto durante il caricamento.");
  }
}