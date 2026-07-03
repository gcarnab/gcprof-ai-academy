import { getAdminUsersList } from "@/features/admin/services/adminService";
import { getAvailableClassesForCourses } from "@/features/admin/services/adminCourseService";
import { getAllCoursesList } from "@/features/admin/services/adminStructureService";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import AdminUsersTable from "@/features/admin/components/AdminUsersTable";
import CreateCourseForm from "@/features/admin/components/CreateCourseForm";
import CreateClassForm from "@/features/admin/components/CreateClassForm";
import CourseContentEditor from "@/features/admin/components/CourseContentEditor";
import ManageCategoriesForm from "@/features/admin/components/ManageCategoriesForm";
import AssignCourseClassForm from "@/features/admin/components/AssignCourseClassForm";
import AdminStatsDashboard from "@/features/admin/components/AdminStatsDashboard"; // 👈 NUOVO IMPORT

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [users, dbClasses, dbCourses] = await Promise.all([
    getAdminUsersList().catch(() => []),
    getAvailableClassesForCourses().catch(() => []),
    getAllCoursesList().catch(() => []),
  ]);

  const availableClassesNames = (dbClasses || []).map((c) => c.name);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pannello Amministratore
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestisci la struttura dei corsi, le coorti di studenti e i permessi d'accesso.
          </p>
        </div>

        {/* 👈 NUOVA SEZIONE STATS */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <AdminStatsDashboard users={users} />
        </div>

        {/* Gestione Struttura Didattica */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <CreateCourseForm classes={dbClasses} />
          </div>
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <CourseContentEditor courses={dbCourses} />
          </div>
        </div>

        {/* Gestione Classi e Assegnazioni Corsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <CreateClassForm />
          </div>
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <AssignCourseClassForm courses={dbCourses} classes={dbClasses} />
          </div>
        </div>

        {/* Gestione Categorie */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <ManageCategoriesForm />
        </div>

        {/* 👈 TABELLA UTENTI AGGIORNATA CON FILTRI E BULK ACTION */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <AdminUsersTable
            initialUsers={users}
            availableClasses={availableClassesNames}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}