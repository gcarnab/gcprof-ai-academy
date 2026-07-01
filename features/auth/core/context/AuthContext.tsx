"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Definiamo il tipo dell'utente nel contesto (allineato alla v2)
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: "admin" | "student";
  status: "active" | "blocked" | "pending"; // 🎯 Aggiungi questa riga
  classes: string[];
  // ... altri campi
}

// 🎯 AGGIORNAMENTO CONTRATTO: Definiamo l'interfaccia esatta esposta dall'hook
export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;     // 🌟 Mancava questa riga
  logout: () => Promise<void>;          // 🌟 Assicuriamoci ci sia anche il logout
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Forza il recupero della sessione al boot dell'app
  const refreshSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  // 🎯 Implementazione della funzione login richiesta dal LoginDialog
  const login = (newUser: AuthUser) => {
    setUser(newUser);
  };

  // 🎯 Implementazione della funzione logout
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Errore durante il logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve essere utilizzato all'interno di un AuthProvider");
  }
  return context;
}