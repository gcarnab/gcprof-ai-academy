"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/shared/config/navigation";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/features/theme/components/ThemeToggle";

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();

  // 🌐 DISACCOPPIAMENTO STRINGHE BRAND (Configurabili da .env)
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "GCPROF";
  const appSubtitle = process.env.NEXT_PUBLIC_APP_SUBTITLE || "ACADEMY";
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "V 1.0";

  const isActive = (path: string): boolean => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string): string =>
    `transition-colors duration-200 text-primary ${
      isActive(path) ? "font-semibold text-blue-600" : "text-gray-700"
    }`;

  // 👤 HELPER: Calcolo intelligente delle iniziali per il fallback dell'avatar
  const getInitials = (): string => {
    if (!user) return "";
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    const parts = user.displayName?.trim().split(/\s+/) || [];
    if (parts.length > 1) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return user.displayName?.substring(0, 2).toUpperCase() || "US";
  };

  return (
    <header className="border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3 transition-all">
          <Image
            src="/gcprof-ai-academy_logo_small.png"
            alt={`Logo ${appName} ${appSubtitle}`}
            width={46}
            height={46}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-foreground group-text-primary">
              {appName}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
              {appSubtitle} ({appVersion})
            </span>
          </div>
        </Link>

        {/* MENU PRINCIPALE */}
        <nav aria-label="Navigazione principale">
          <ul className="flex items-center gap-8 text-sm">
            {/* Nascondiamo i corsi del menu principale se lo studente è ancora pending */}
            {navigation.map((item) => {
              if (item.href.includes("courses") && user?.status === "pending")
                return null;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass(item.href)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            
            {/* Credits */}
            <li>
              <Link
                href="/credits"
                className="text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                🏅 Credits
              </Link>
            </li>

            {/* 🎯 DASHBOARD DINAMICA: Bivio pulito senza regressioni tra Admin e Studente */}
            {user && (
              <li>
                <Link
                  href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                  className={linkClass(user.role === "admin" ? "/admin/dashboard" : "/dashboard")}
                >
                  {user.role === "admin" ? "⚙️ Dashboard" : "⚡ Dashboard"}
                </Link>
              </li>
            )}

            {/* Il link testuale del profilo rimane per compatibilità navigazione standard */}
            {user && (
              <li>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors px-3 py-2 rounded-md hover:bg-accent"
                >
                  👤 Profile
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* AREA UTENTE DINAMICA */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoading ? (
            <div className="text-xs text-gray-400 animate-pulse">
              Verifica sessione...
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              {/* Info Testuali Utente */}
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  {user.displayName}
                </p>
                <div className="text-xs text-gray-500 uppercase flex flex-col items-end gap-0.5">
                  {user.role === "admin" ? (
                    <span className="font-medium text-purple-600">
                      👨‍🏫 Admin
                    </span>
                  ) : (
                    <>
                      {user.status === "pending" ? (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          ⏳ In attesa di attivazione
                        </span>
                      ) : (
                        <span>
                          🎓 Classi: {user.classes?.join(", ") || "Nessuna"}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* MINIATURA AVATAR DINAMICA (Cliccabile verso il profilo) */}
              <Link
                href="/profile"
                className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border shadow-sm hover:opacity-85 transition-opacity duration-200"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={`Avatar di ${user.displayName}`}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-600 text-xs font-bold text-white tracking-wider">
                    {getInitials()}
                  </div>
                )}
              </Link>

              {/* Pulsante di Logout */}
              <button
                onClick={logout}
                className="rounded-md border border-gray-300 bg-background px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-accent transition-all ml-1"
              >
                Logout
              </button>
            </div>
          ) : (
            // Utente non loggato
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className={`text-xs font-medium ${linkClass("/register")}`}
              >
                Registrati
              </Link>
              <div className="h-4 w-[1px] bg-gray-200" />
              <LoginDialog />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}