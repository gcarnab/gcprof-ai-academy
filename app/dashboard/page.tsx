import { cookies } from "next/headers";
import { NextCookieService } from "@/features/auth/core/infrastructure/NextCookieService";
import { JoseTokenService } from "@/features/auth/core/infrastructure/JoseTokenService";
import { logoutAction } from "@/features/auth/core/actions/logoutAction";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieService = new NextCookieService();
  const tokenService = new JoseTokenService();
  
  const token = await cookieService.getSession();
  
  // Decodifichiamo in sicurezza sul server il payload per mostrare i dati personalizzati
  const user = token ? tokenService.decode(token) : null;

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Academy Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Area Studente Protetta da Middleware v2</p>
        </div>
        
        <form action={async () => {
          "use server";
          const cs = new NextCookieService();
          await cs.clearSession();
          redirect("/auth-test/login");
        }}>
          <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition-colors">
            Disconnetti
          </button>
        </form>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg space-y-2 font-mono text-sm">
        <p className="text-green-400 font-bold">// Dati estratti dal JWT Session Cookie:</p>
        <p><span className="text-slate-400">Nome:</span> {user?.displayName}</p>
        <p><span className="text-slate-400">Email:</span> {user?.email}</p>
        <p><span className="text-slate-400">Ruolo:</span> <span className="px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded text-xs">{user?.role}</span></p>
        <p><span className="text-slate-400">Classi Abilitate:</span> {user?.classes?.join(", ")}</p>
      </div>
    </div>
  );
}