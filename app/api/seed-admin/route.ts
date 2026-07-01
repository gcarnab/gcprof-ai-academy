import { NextResponse } from "next/server";
import { getUserRepository } from "@/features/auth/core/infrastructure/RepositoryFactory";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const repo = getUserRepository();

    // Verifichiamo se l'admin esiste già per evitare duplicati
    const adminEmail = "admin@gcprofaiacademy.vercel.app";
    const existing = await repo.findByEmail(adminEmail);

    if (existing) {
      return NextResponse.json({ message: "L'utente Admin esiste già!" });
    }

    // Generiamo un hash Bcrypt reale per la password "PasswordSegreta2026"
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("PePPiNo2026!", salt);

    const admin = await repo.create({
      email: adminEmail,
      passwordHash,
      role: "admin",
      displayName: "Admin",
      classes: [],
      status: "active",
    } as any); // 🎯 Il cast 'as any' qui garantisce che TypeScript non blocchi la build per questo script

    return NextResponse.json({
      success: true,
      message: "Primo account inserito con successo su Supabase!",
      user: {
        email: admin.email,
        role: admin.role,
        displayName: admin.displayName,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
