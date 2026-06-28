import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

/**
 * ============================================================================
 * FILE: layout.tsx
 * ----------------------------------------------------------------------------
 * Root Layout dell'applicazione Next.js.
 *
 * Tutte le pagine passano da questo layout.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "GCPROF AI Academy",
  description: "Piattaforma LMS per la didattica dell'informatica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={cn("font-sans", geist.variable)}>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}