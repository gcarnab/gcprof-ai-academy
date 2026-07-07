"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "gcprof-theme";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  // ==========================================================
  // Caricamento preferenza salvata
  // ==========================================================

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(STORAGE_KEY) as Theme | null;

    const initialTheme =
      savedTheme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(initialTheme);

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark",
    );
  }, []);

  // ==========================================================
  // Cambio tema
  // ==========================================================

  const toggleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    localStorage.setItem(STORAGE_KEY, nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark",
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme deve essere utilizzato all'interno di ThemeProvider",
    );
  }

  return context;
}