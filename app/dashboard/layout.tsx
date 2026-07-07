import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { redirect } from "next/navigation";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieService = new NextCookieService();
  const tokenService = new JoseTokenService();
  
  const token = await cookieService.getSession();
  const user = token ? (tokenService.decode(token) as any) : null;

  // 🛡️ SICUREZZA: Se non è loggato, reindirizza alla home
  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070d19]">
      {/* Navbar comune */}
      <Navbar />

      {/* Contenuto centrale: Qui comparirà la griglia dei corsi e i progressi dello studente */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer comune */}
      <Footer />
    </div>
  );
}