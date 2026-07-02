import { getAdminUsersList } from "@/features/admin/services/adminService";
import { getAvailableClassesForCourses } from "@/features/admin/services/adminCourseService";
import { getAllCoursesList } from "@/features/admin/services/adminStructureService";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import AdminUsersTable from "@/features/admin/components/AdminUsersTable";
import CreateCourseForm from "@/features/admin/components/CreateCourseForm";
import CreateClassForm from "@/features/admin/components/CreateClassForm";
import CourseContentEditor from "@/features/admin/components/CourseContentEditor";

// Forziamo Next.js a non usare la cache per questa pagina amministrativa
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Eseguiamo tutte le query in parallelo lato server per ottimizzare le performance
  const [users, dbClasses, dbCourses] = await Promise.all([
    getAdminUsersList().catch(() => []),
    getAvailableClassesForCourses().catch(() => []),
    getAllCoursesList().catch(() => []),
  ]);

  // Estraiamo in sicurezza i nomi delle classi controllando che dbClasses esista
  const availableClassesNames = (dbClasses || []).map((c) => c.name);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />
      
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 space-y-10">
        
        {/* Sezione Introduttiva Dashboard */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pannello Amministratore</h1>
          <p className="text-sm text-gray-500 mt-1">Gestisci la struttura dei corsi, le coorti di studenti e i permessi d'accesso.</p>
        </div>

        {/* Gestione Struttura Didattica (Corsi e Moduli) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <CreateCourseForm classes={dbClasses} />
          </div>
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <CourseContentEditor courses={dbCourses} />
          </div>
        </div>

        {/* Gestione Classi Accademiche */}
        <div className="bg-white rounded-xl shadow border overflow-hidden max-w-md">
          <CreateClassForm />
        </div>

        {/* Tabella Controllo Utenti e Ruoli */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <AdminUsersTable initialUsers={users} availableClasses={availableClassesNames} />
        </div>

      </main>

      <Footer />
    </div>
  );
}