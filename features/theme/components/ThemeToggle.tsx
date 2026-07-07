"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambia tema"
      title={
        theme === "light"
          ? "Attiva modalità scura"
          : "Attiva modalità chiara"
      }
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-border
        bg-background
        text-muted-foreground
        shadow-sm
        transition-all
        duration-200
        hover:bg-muted
        dark:border-border
        dark:bg-gray-900
        dark:text-yellow-300
        dark:hover:bg-gray-800
      "
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}