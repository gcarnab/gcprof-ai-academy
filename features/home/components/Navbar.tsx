"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/features/theme/components/ThemeToggle";
import { getNavigationForUser } from "@/shared/config/navigation/getNavigationForUser";
import { logger } from "@/lib/logger";

// 🛒 MODIFICA 1: Import del sistema Carrello e Pagamenti
import { CartBadge } from "@/features/payments/components/CartBadge";
import { CartDrawer } from "@/features/payments/components/CartDrawer";
import { getCartSummaryAction } from "@/features/payments/actions/paymentActions";

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🛒 MODIFICA 2: Stato e gestione apertura Drawer e conteggio Carrello
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = useCallback(async () => {
    try {
      const res = await getCartSummaryAction();
      if (res.success && res.data) {
        setCartCount(res.data.items?.length || 0);
      }
    } catch {
      // Ignora silenziosamente se il modulo pagamenti non è attivo
    }
  }, []);

  // Aggiorna il conteggio carrello al cambio utente
  useEffect(() => {
    if (user) {
      refreshCartCount();
    } else {
      setCartCount(0);
    }
  }, [user, refreshCartCount]);

  useEffect(() => {
    const handleCartUpdated = () => {
      refreshCartCount();
    };

    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
    };
  }, [refreshCartCount]);

  // =====================================================
  // CONFIGURAZIONI DA AMBIENTE (.env)
  // =====================================================
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "GCPROF";
  const appSubtitle = process.env.NEXT_PUBLIC_APP_SUBTITLE || "ACADEMY";
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "V 1.0";

  // Top Bar Variables
  const isTopBarEnabled = process.env.NEXT_PUBLIC_TOPBAR_ENABLED === "true";
  const topBarText =
    process.env.NEXT_PUBLIC_TOPBAR_TEXT || "🚀 Benvenuto in GCPROF Academy!";

  // =====================================================
  // SCROLL DETECTION
  // =====================================================
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    logger.info("Navbar montata correttamente", {
      userId: user?.id || "anonimo",
      role: user?.role || "pubblico",
      status: user?.status || null,
    });
  }, [user]);

  // =====================================================
  // NAVIGATION HELPERS
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
        ? "font-semibold text-blue-600 dark:text-blue-400"
        : "text-muted-foreground hover:text-foreground"
    }`;

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

  const handleLogout = async () => {
    try {
      logger.info("Tentativo di logout avviato dall'utente", {
        userId: user?.id,
      });
      await logout();
      setMobileMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      logger.error("Errore durante la disconnessione", { error });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      {/* TOP BAR PROMOZIONALE */}
      {isTopBarEnabled && (
        <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white text-center py-1.5 px-4 text-xs font-medium tracking-wide shadow-inner">
          {topBarText}
        </div>
      )}

      {/* HEADER GLASSMORPHISM */}
      <header
        className={`w-full border-b border-border transition-all duration-300 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-md shadow-md"
            : "bg-background shadow-sm"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
            isScrolled ? "h-14" : "h-16"
          } max-w-7xl`}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/gcprof-ai-academy_logo_small.png"
              alt={`${appName} ${appSubtitle}`}
              width={isScrolled ? 38 : 44}
              height={isScrolled ? 38 : 44}
              priority
              className="transition-transform duration-300 group-hover:scale-105"
            />

            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                {appName}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                {appSubtitle} ({appVersion})
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
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
                <li>
                  <Link
                    href="/credits"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Credits
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* USER AREA DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {/* 🛒 MODIFICA 3: Badge Carrello per Desktop */}
            <CartBadge
              itemCount={cartCount}
              onClick={() => setIsCartOpen(true)}
            />

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
                      <span className="font-medium text-purple-600 dark:text-purple-400">
                        👨‍🏫 Admin
                      </span>
                    ) : user.status === "pending" ? (
                      <span className="font-medium text-amber-600 dark:text-amber-400">
                        ⏳ In attesa
                      </span>
                    ) : (
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        🎓 {user.classes?.join(", ") || "Studente"}
                      </span>
                    )}
                  </div>
                </div>

                {/* AVATAR */}
                <Link
                  href="/profile"
                  className="relative flex h-9 w-9 overflow-hidden rounded-full border border-border shadow-sm hover:scale-105 transition-transform"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-600 dark:bg-blue-500 text-xs font-bold text-white">
                      {getInitials()}
                    </div>
                  )}
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-accent text-foreground transition-colors"
                >
                  🚪 Esci
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <LoginDialog />
                <Link
                  href="/register"
                  className="rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  Registrati
                </Link>
              </div>
            )}
          </div>

          {/* 🛒 MODIFICA 4: Controls Mobile (Carrello sempre accessibile + Menu Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <CartBadge
              itemCount={cartCount}
              onClick={() => setIsCartOpen(true)}
            />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex rounded-md p-2 hover:bg-accent text-foreground"
              aria-label="Apri menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden transition-all duration-300">
            <nav className="flex flex-col space-y-2 p-4">
              {user && (
                <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-accent/40 border border-border">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border shadow-sm">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-600 dark:bg-blue-500 text-xs font-bold text-white">
                        {getInitials()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.role === "admin"
                        ? "👨‍🏫 Admin"
                        : user.status === "pending"
                          ? "⏳ In attesa di attivazione"
                          : `🎓 ${user.classes?.join(", ") || "Studente"}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Voci Navigazione Mobile */}
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-border pt-4 flex items-center justify-between px-3">
                <span className="text-xs text-muted-foreground">
                  Cambia tema:
                </span>
                <ThemeToggle />
              </div>

              {user ? (
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    👤 Profilo Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-left hover:bg-accent text-foreground transition-colors"
                  >
                    🚪 Esci dall'Academy
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <LoginDialog />
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-center text-white px-3 py-2.5 text-sm font-semibold shadow-sm transition-all"
                  >
                    Registrati
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* 🛒 MODIFICA 5: Componente Drawer del Carrello (Montato globalmente nell'Header) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCartUpdated={refreshCartCount}
      />
    </div>
  );
}
