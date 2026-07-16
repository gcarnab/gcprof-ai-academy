"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/features/theme/components/ThemeToggle";
import { getNavigationForUser } from "@/shared/config/navigation/getNavigationForUser";

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();

  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // =====================================================
  // BRAND
  // =====================================================

  const appName = process.env.NEXT_PUBLIC_APP_NAME || "GCPROF";

  const appSubtitle = process.env.NEXT_PUBLIC_APP_SUBTITLE || "ACADEMY";

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "V 1.0";

  // =====================================================
  // NAVIGATION
  // =====================================================

  const navigationItems = getNavigationForUser(user);

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(path);
  };

  const linkClass = (path: string): string =>
    `transition-colors duration-200 ${
      isActive(path)
        ? "font-semibold text-blue-600"
        : "text-muted-foreground hover:text-foreground"
    }`;

  // =====================================================
  // USER HELPERS
  // =====================================================

  const getInitials = (): string => {
    if (!user) return "";

    if (user.firstName && user.lastName) {
      return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    }

    const parts = user.displayName?.trim().split(/\s+/) || [];

    if (parts.length > 1) {
      return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }

    return user.displayName?.substring(0, 2).toUpperCase() || "US";
  };

  return (
    <header className="border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/gcprof-ai-academy_logo_small.png"
            alt={`${appName} ${appSubtitle}`}
            width={46}
            height={46}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />

          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              {appName}
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
              {appSubtitle} ({appVersion})
            </span>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav aria-label="Navigazione principale" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={linkClass(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {!user && (
              <>
                <li>
                  <Link
                    href="/credits"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Credits
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {/* =====================================================
            USER AREA DESKTOP
        ===================================================== */}

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {isLoading ? (
            <div className="text-xs text-muted-foreground animate-pulse">
              Verifica sessione...
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              {/* USER INFO */}

              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {user.displayName}
                </p>

                <div className="text-xs text-muted-foreground">
                  {user.role === "admin" ? (
                    <span className="font-medium text-purple-600">
                      👨‍🏫 Admin
                    </span>
                  ) : user.status === "pending" ? (
                    <span className="font-medium text-amber-600">
                      ⏳ In attesa di attivazione
                    </span>
                  ) : (
                    <span>
                      🎓 {user.classes?.join(", ") || "Nessuna classe"}
                    </span>
                  )}
                </div>
              </div>

              {/* AVATAR */}

              <Link
                href="/profile"
                className="relative flex h-9 w-9 overflow-hidden rounded-full border shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-600 text-xs font-bold text-white">
                    {getInitials()}
                  </div>
                )}
              </Link>

              {/* LOGOUT */}

              <button
                onClick={logout}
                className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/register" className={linkClass("/register")}>
                Registrati
              </Link>

              <LoginDialog />
            </div>
          )}
        </div>

        {/* =====================================================
            MOBILE BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex rounded-md p-2 hover:bg-accent md:hidden"
          aria-label="Apri menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-md px-3 py-2 ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t pt-4">
              <ThemeToggle />
            </div>

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 hover:bg-accent"
                >
                  👤 Profilo
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="rounded-md border px-3 py-2 text-left hover:bg-accent"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2 hover:bg-accent"
                >
                  Registrati
                </Link>

                <LoginDialog />
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
