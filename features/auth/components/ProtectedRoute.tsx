"use client";

//import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "student")[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  // 🎯 FIX: Importiamo isLoading dal context per sapere quando la validazione del cookie è terminata
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Se stiamo ancora validando la sessione, non facciamo nulla (aspettiamo)
    if (isLoading) return;

    // 2. 🎯 FIX: Nessun controllo sul localStorage. Se non c'è utente, rimandiamo alla home 
    // (dove si trova il nostro LoginDialog) invece di una rotta "/login" inesistente.
    if (!user) {
      router.push("/");
      return;
    }

    // 3. Se l'utente non ha i permessi per questa rotta, lo buttiamo fuori
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/");
    }
  }, [user, isLoading, allowedRoles, router]);

  // 🔄 UI di Caricamento (Mostrata SOLO mentre Next.js verifica il cookie reale)
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 font-medium text-muted-foreground">Verifica dell'identità in corso...</p>
        </div>
      </div>
    );
  }

  // 🛡️ Sicurezza UI: Evita flash di contenuti protetti se l'utente sta per essere reindirizzato
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }

  // ✅ Tutto in regola: renderizza la pagina Admin
  return <>{children}</>;
}