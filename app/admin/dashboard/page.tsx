import { getAdminDashboardStats } from "@/features/admin/services/adminStatsService";

import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

import AdminUsersTable from "@/features/admin/components/AdminUsersTable";
import CreateCourseForm from "@/features/admin/components/CreateCourseForm";
import CreateClassForm from "@/features/admin/components/CreateClassForm";
import CourseContentEditor from "@/features/admin/components/CourseContentEditor";
import ManageCategoriesForm from "@/features/admin/components/ManageCategoriesForm";
import AssignCourseClassForm from "@/features/admin/components/AssignCourseClassForm";
import AdminStatsDashboard from "@/features/admin/components/AdminStatsDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 🔥 UNICA CHIAMATA CENTRALIZZATA
  const stats = await getAdminDashboardStats();

  // ✅ FIX: classes stanno dentro raw
  const availableClassesNames = (stats.raw.classes || []).map(
    (c: any) => c.name
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Pannello Amministratore
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestisci la struttura dei corsi, le coorti di studenti e i permessi d'accesso.
          </p>
        </div>

        {/* STATS DASHBOARD */}
        <div className="overflow-hidden rounded-xl border bg-white shadow">
          <AdminStatsDashboard stats={stats} />
        </div>

        {/* GESTIONE STRUTTURA DIDATTICA */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border bg-white shadow">
            <CreateCourseForm classes={stats.raw.classes} />
          </div>

          <div className="overflow-hidden rounded-xl border bg-white shadow">
            <CourseContentEditor courses={stats.raw.courses} />
          </div>
        </div>

        {/* CLASSI E ASSEGNAZIONI */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border bg-white shadow">
            <CreateClassForm />
          </div>

          <div className="overflow-hidden rounded-xl border bg-white shadow">
            <AssignCourseClassForm
              courses={stats.raw.courses}
              classes={stats.raw.classes}
            />
          </div>
        </div>

        {/* CATEGORIE */}
        <div className="overflow-hidden rounded-xl border bg-white shadow">
          <ManageCategoriesForm />
        </div>

        {/* TABELLA UTENTI */}
        <div className="overflow-hidden rounded-xl border bg-white shadow">
          <AdminUsersTable
            initialUsers={stats.raw.users}
            availableClasses={availableClassesNames}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}