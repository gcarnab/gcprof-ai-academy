/**
 * Questo endpoint è il cuore pulsante che dice al Client chi è l'utente basandosi sul cookie sicuro:
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose"; // Utilizziamo jose per la decodifica sicura e nativa

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-key-change-me-in-production"
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Decodifica e valida il token JWT emesso al login
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Costruisci l'oggetto utente da restituire al Context
    const user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      displayName: payload.displayName,
      classes: payload.classes || [],
      status: "active"
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[API SESSION ERROR] Token non valido o scaduto:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}