import type { ReactNode } from "react";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  );
}