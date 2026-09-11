import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

import { COOKIE_CONSTANTS } from "./features/auth/constants/CookieConstants";
import { TOKEN_CONSTANTS } from "./features/auth/constants/TokenConstants";
import { isMaintenanceModeEnabled } from "./features/system/guards/maintenanceGuard";
import { logger } from "./lib/logger";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/admin",
  "/profile",
  "/students",
];

const AUTH_ROUTES = [
  "/login",
  "/register",
];

const MAINTENANCE_ALLOWED_ROUTES = [
  "/maintenance",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isMaintenancePage = MAINTENANCE_ALLOWED_ROUTES.some(
    (route) => pathname === route,
  );

  if (isMaintenancePage) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(
    COOKIE_CONSTANTS.SESSION_NAME,
  );

  const token = sessionCookie?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  let isTokenValid = false;
  let userPayload: import("jose").JWTPayload | null = null;

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        logger.error("[PROXY CRITICAL] JWT_SECRET non configurato!");
      } else {
        const secretKey = new TextEncoder().encode(secret);

        const { payload } = await jwtVerify(token, secretKey, {
          issuer: TOKEN_CONSTANTS.ISSUER,
        });

        isTokenValid = true;
        userPayload = payload;
      }
    } catch {
      isTokenValid = false;
      userPayload = null;
    }
  }

  // ============================================================
  // MAINTENANCE MODE
  // ============================================================

  const maintenanceEnabled = await isMaintenanceModeEnabled();

  if (maintenanceEnabled) {
    const isAdmin =
      isTokenValid && userPayload?.role === "admin";

    // Gli amministratori possono continuare a utilizzare il sito
    // e il pannello amministrativo durante la manutenzione.
    if (isAdmin) {
      return NextResponse.next();
    }

    // /login deve rimanere raggiungibile:
    // loginAction verificherà successivamente il ruolo e consentirà
    // il completamento del login solo agli amministratori.
    if (pathname === "/login" || pathname.startsWith("/login/")) {
      return NextResponse.next();
    }

    // La registrazione è esplicitamente bloccata.
    // Tutte le altre pagine vengono indirizzate alla pagina
    // di manutenzione.
    return NextResponse.redirect(
      new URL("/maintenance", request.url),
    );
  }

  // ============================================================
  // AUTH FLOW ESISTENTE
  // ============================================================

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute && !isTokenValid) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname,
    );

    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete(
      COOKIE_CONSTANTS.SESSION_NAME,
    );

    return response;
  }

  if (isAuthRoute && isTokenValid && userPayload) {
    const targetRoute =
      userPayload.role === "admin"
        ? "/admin"
        : "/dashboard";

    return NextResponse.redirect(
      new URL(targetRoute, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};