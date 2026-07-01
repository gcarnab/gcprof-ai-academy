import { NextResponse } from "next/server";
import { getUserRepository } from "@/features/auth/core/infrastructure/RepositoryFactory";

export async function GET() {
  try {
    // 1. Inizializziamo il repository tramite la Factory (che ora usa Supabase)
    const repo = getUserRepository();

    // 2. Generiamo un'email casuale per evitare conflitti di chiavi UNIQUE
    const testEmail = `studente.test.${Date.now()}@gcprof.it`;

    console.log("🚀 [TEST] Avvio scrittura su Supabase per:", testEmail);

    // 3. Test del metodo CREATE
    const nuovoUtente = await repo.create({
      email: testEmail,
      passwordHash: "$2a$10$X7vH8bHj9K...fintoHashBcrypt...", 
      role: "student",
      displayName: "Studente Gian Luca Test",
      classes: ["1A", "3B"],
    });

    console.log("✅ [TEST] Utente creato con successo. ID:", nuovoUtente.id);

    // 4. Test del metodo LIST
    const registroCompleto = await repo.list();
    console.log(`📊 [TEST] Numero totale utenti nel DB: ${registroCompleto.length}`);

    // 5. Test del metodo FIND_BY_EMAIL
    const utenteTrovato = await repo.findByEmail(testEmail);
    console.log("🔍 [TEST] Verifica findByEmail:", utenteTrovato ? "Trovato!" : "Non trovato ❌");

    return NextResponse.json({
      success: true,
      message: "Grado 2 superato! Supabase risponde correttamente.",
      databaseStats: {
        totalUsers: registroCompleto.length,
        lastCreated: nuovoUtente,
      },
    });

  } catch (error: any) {
    console.error("❌ [TEST FAILED] Errore durante il test di Grado 2:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Errore sconosciuto",
      },
      { status: 500 }
    );
  }
}