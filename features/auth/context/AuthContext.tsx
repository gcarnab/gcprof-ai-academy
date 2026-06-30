"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getSession,
  SessionUser,
  logout as logoutService, // Importiamo la logica di logout dal servizio (se presente)
} from "../services/authService";

// 1. Definizione dell'interfaccia per il contesto di autenticazione
interface AuthContextType {
  user: SessionUser | null;
  login: (userData: SessionUser) => void; // Funzione per effettuare il login nello stato globale
  logout: () => void;                     // Funzione per il logout
}

// 2. Creazione del contesto con valori di fallback predefiniti
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true); // Stato di caricamento iniziale per evitare flash di interfaccia

  // 3. RECUPERO DELLA SESSIONE ALL'AVVIO (Idratazione della sessione)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Recupera i dati dell'utente salvati nel localStorage (gestito tramite authService)
      const activeSession = getSession();
      if (activeSession) {
        setUser(activeSession);
      }
      setLoading(false);
    }
  }, []);

  /**
   * 4. AZIONE DI LOGIN SUCCESSFUL
   * Questa funzione viene chiamata dopo che il form ha validato le credenziali.
   * Aggiorna lo stato globale dell'applicazione.
   */
  const handleLogin = (userData: SessionUser) => {
    // Salviamo i dati dell'utente loggato nel localStorage per persistere la sessione
    localStorage.setItem("auth_user", JSON.stringify(userData));
    
    // Aggiorniamo lo stato React per fare il re-render immediato dell'interfaccia (Navbar, rotte, ecc.)
    setUser(userData);
  };

  /**
   * 5. AZIONE DI LOGOUT
   * Svuota la sessione utente e distrugge selettivamente la cache dei corsi del CMS,
   * forzando il riallineamento dei dati al successivo login.
   */
  const handleLogout = () => {
    // Rimozione mirata dei dati di sessione
    localStorage.removeItem("auth_user"); 
    
    // 🎯 Rimozione della cache dei corsi per scaricare i dati freschi da `courses.ts` al prossimo login
    localStorage.removeItem("cms_courses");
    
    // Eseguiamo eventuali pulizie lato servizio (es. cancellazione cookie se previsti nel backend)
    logoutService();
    
    // Resettiamo lo stato globale di React
    setUser(null);
    
    // Reindirizzamento pulito alla Home Page per resettare lo stato di tutte le pagine
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  // Se l'applicazione sta ancora controllando la presenza di un utente nel localStorage,
  // evitiamo di renderizzare l'app per prevenire disallineamenti visivi (Hydration Flash)
  if (loading) {
    return null; // O un componente di caricamento/spinner minimale
  }

  return (
    // Passiamo le funzioni reali e lo stato aggiornato a tutto l'albero dei componenti di Next.js
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 6. Hook personalizzato per consumare rapidamente l'autenticazione nei componenti Client
export function useAuth() {
  return useContext(AuthContext);
}