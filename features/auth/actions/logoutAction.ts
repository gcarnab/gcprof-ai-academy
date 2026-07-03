"use server";

import { NextCookieService } from "../infrastructure/NextCookieService";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieService = new NextCookieService();
  await cookieService.clearSession();
  
  // 🎯 FIX: Cambiato da "/auth-test/login" alla rotta di login reale
  redirect("/login");
}