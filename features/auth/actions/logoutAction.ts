"use server";

import { NextCookieService } from "../infrastructure/NextCookieService";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieService = new NextCookieService();
  await cookieService.clearSession();
  
  redirect("/");
}