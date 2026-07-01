/**
 * Questo assicura che quando l'utente clicca su "Esci", 
 * il cookie venga distrutto fisicamente anche dal browser.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  
  // Cancella il cookie di sessione impostando la scadenza al passato
  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return NextResponse.json({ success: true });
}