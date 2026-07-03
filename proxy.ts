import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { COOKIE_CONSTANTS } from "./features/auth/constants/CookieConstants";
import { TOKEN_CONSTANTS } from "./features/auth/constants/TokenConstants";

const PROTECTED_ROUTES = ["/dashboard", "/admin", "/profilo", "/corsi"];
const AUTH_ROUTES = ["/auth-test/login", "/auth-test/register", "/login"];

// 🎯 FIX: La funzione ora si chiama proxy coerentemente con la convenzione di Next.js 16
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = request.cookies.get(COOKIE_CONSTANTS.SESSION_NAME);
  const token = sessionCookie?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  let isTokenValid = false;
  let userPayload = null;

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error("[PROXY CRITICAL] JWT_SECRET non configurato!");
        return NextResponse.next();
      }
      const secretKey = new TextEncoder().encode(secret);

      const { payload } = await jwtVerify(token, secretKey, {
        issuer: TOKEN_CONSTANTS.ISSUER,
      });
      
      isTokenValid = true;
      userPayload = payload;
    } catch (error) {
      isTokenValid = false;
    }
  }

  if (isProtectedRoute && !isTokenValid) {
    const loginUrl = new URL("/auth-test/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_CONSTANTS.SESSION_NAME);
    return response;
  }

  if (isAuthRoute && isTokenValid && userPayload) {
    const targetRoute = userPayload.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(targetRoute, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};