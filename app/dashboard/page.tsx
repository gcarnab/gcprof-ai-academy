import { NextCookieService } from "@/features/auth/infrastructure/NextCookieService";
import { JoseTokenService } from "@/features/auth/infrastructure/JoseTokenService";
import { getStudentCoursesAction } from "@/features/courses/queries/getStudentCourses";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieService = new NextCookieService();
  const tokenService = new JoseTokenService();
  
  const token = await cookieService.getSession();
  
  // Decodifichiamo in sicurezza sul server il payload per mostrare i dati personalizzati
  const user = token ? (tokenService.decode(token) as any) : null;

  // Se non c'è una sessione valida, reindirizziamo al login
  if (!user) {
    redirect("/auth-test/login");
  }

  // Recuperiamo i corsi associati alla classe dello studente in tempo reale
  // Nota: adatta 'user.id' o 'user.sub' in base a come viene chiamato l'identificativo dell'utente nel tuo JWT
  const userId = user.id || user.sub;
  const coursesResult = await getStudentCoursesAction(userId);
  const courses = coursesResult.success && coursesResult.data ? coursesResult.data : [];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
      {/* HEADER DELLA DASHBOARD */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Academy Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Area Studente Protetta da Middleware v2</p>
        </div>
        
        <form action={async () => {
          "use server";
          const cs = new NextCookieService();
          await cs.clearSession();
          redirect("/");
        }}>
          <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition-colors">
            Disconnetti
          </button>
        </form>
      </div>

      {/* INFORMAZIONI UTENTE */}
      <div className="bg-slate-800 p-4 rounded-lg space-y-2 font-mono text-sm mb-8">
        <p className="text-green-400 font-bold">// Dati estratti dal JWT Session Cookie:</p>
        <p><span className="text-slate-400">Nome:</span> {user?.displayName}</p>
        <p><span className="text-slate-400">Email:</span> {user?.email}</p>
        <p><span className="text-slate-400">Ruolo:</span> <span className="px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded text-xs">{user?.role}</span></p>
        <p><span className="text-slate-400">Classi Abilitate:</span> {user?.classes?.join(", ") || "Nessuna classe"}</p>
      </div>

      {/* SEZIONE CORSI DINAMICI */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-200 border-b border-slate-800 pb-2">
          I Miei Corsi Attivi
        </h2>

        {!coursesResult.success && (
          <p className="text-red-400 text-sm font-mono">
            ⚠ Errore durante il caricamento dinamico dei corsi.
          </p>
        )}

        {coursesResult.success && courses.length === 0 ? (
          <p className="text-slate-500 italic text-sm font-mono">
            // Nessun corso associato alla tua classe al momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course: any) => (
              <div 
                key={course.course_id} 
                className="p-5 bg-slate-800/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-blue-300 line-clamp-1">
                      {course.course_title}
                    </h3>
                    {course.difficulty && (
                      <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded uppercase tracking-wider font-mono">
                        {course.difficulty}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {course.course_description || "Nessuna descrizione disponibile per questo corso."}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 font-mono border-t border-slate-800/60 pt-3">
                  <span>Docente: {course.teacher || "N/D"}</span>
                  {course.estimated_hours && (
                    <span>⏳ {course.estimated_hours}h stimate</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}