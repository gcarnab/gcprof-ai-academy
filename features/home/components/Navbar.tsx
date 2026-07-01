"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/shared/config/navigation";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { useAuth } from "@/features/auth/core/context/AuthContext";

export default function Navbar() {
  // Sfruttiamo l'autenticazione centralizzata v2
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string): string =>
    `transition-colors duration-200 hover:text-blue-600 ${
      isActive(path) ? "font-semibold text-blue-600" : "text-gray-700"
    }`;

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3 transition-all">
          <Image
            src="/gcprof-ai-academy_logo_small.png"
            alt="Logo GCPROF AI Academy"
            width={46}
            height={46}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-gray-900 group-hover:text-blue-600">
              GCPROF
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
              AI ACADEMY
            </span>
          </div>
        </Link>

        {/* MENU PRINCIPALE */}
        <nav aria-label="Navigazione principale">
          <ul className="flex items-center gap-8 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
            {/* Link dinamico al CMS Visibile solo agli admin */}
            {user?.role === "admin" && (
              <li>
                <Link href="/admin" className={linkClass("/admin")}>
                  CMS Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* AREA UTENTE DINAMICA */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="text-xs text-gray-400 animate-pulse">Verifica sessione...</div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {/* 🎯 FIX v2: Cambiato da user.username a user.displayName */}
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500 uppercase">
                  {user.role === "admin"
                    ? "👨‍🏫 Admin"
                    : `🎓 Classi: ${user.classes?.join(", ")}`} 
                    {/* 🎯 FIX v2: Cambiato da user.class a user.classes.join() */}
                </p>
              </div>
              <button
                onClick={logout}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <LoginDialog />
          )}
        </div>
      </div>
    </header>
  );
}