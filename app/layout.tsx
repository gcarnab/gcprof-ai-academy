import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/features/auth/context/AuthContext";

// Inizializziamo il font Geist impostando la variabile CSS
const geist = Geist({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: "GCPROF AI Academy",
  description: "Piattaforma LMS del Prof. Giuseppe Carnabuci",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={cn("font-sans", geist.variable)}>
      <body className="bg-white text-gray-900 antialiased">
        {/* L'AuthProvider avvolge l'intera applicazione mantenendo i font intatti */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}