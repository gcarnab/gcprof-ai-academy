/**
 * Questo assicura che quando l'utente clicca su "Esci", 
 * il cookie venga distrutto fisicamente anche dal browser.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { TrackingService } from "@/features/admin/tracking/services/trackingService";

export async function POST() {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      const tokenService = new JoseTokenService();

      const payload = await tokenService.verify(token);

      if (payload?.id) {
        await TrackingService.closeSession(payload.id);
      }
    }
  } catch (error) {
    console.error("Errore tracking logout:", error);
  }

  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return NextResponse.json({ success: true });
}