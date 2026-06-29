"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "student")[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Nota: usiamo un controllo per verificare se la sessione è stata caricata da localStorage
    // Se user è null e il caricamento iniziale è terminato, reindirizziamo.
    const sessionExists = localStorage.getItem("session");

    if (!sessionExists) {
      router.push("/login");
      return;
    }

    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/"); // Ruolo non autorizzato (es: studente che prova ad andare su /admin)
    }
  }, [user, allowedRoles, router]);

  // Stato di caricamento mentre AuthContext recupera i dati dal localStorage
  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Verifica dell'identità in corso...</p>
        </div>
      </div>
    );
  }

  // Se l'utente ha il ruolo corretto, renderizza i figli
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null; 
  }

  return <>{children}</>;
}