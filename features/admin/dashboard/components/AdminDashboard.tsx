"use client";

import { useSearchParams, useRouter } from "next/navigation";
import CoursesTab from "../../courses/components/CoursesTab";
import UsersTab from "../../users/components/UsersTab";
import MailTab from "../../mail/components/MailTab";
import StatsTab from "../../stats/components/StatsTab";

interface Props {
  stats: any;
}

const tabs = [
  {
    id: "courses",
    label: "📚 Corsi",
  },
  {
    id: "users",
    label: "👥 Utenti",
  },
  {
    id: "mail",
    label: "📧 Mail",
  },
  {
    id: "stats",
    label: "📊 Stats",
  },
  {
    id: "tracking",
    label: "🛰 Tracking",
  },
];

export default function AdminDashboard({ stats }: Props) {
  const availableClassesNames = (stats.raw.classes || []).map(
    (c: any) => c.name,
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") ?? "courses";

  function changeTab(tab: string) {
    router.push(`/admin/dashboard?tab=${tab}`);
  }
  return (
    <>
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Pannello Amministratore
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Gestisci la struttura dei corsi, gli utenti e tutte le funzionalità
          amministrative della piattaforma.
        </p>
      </div>

      {/* TAB BAR */}
      <div className="rounded-xl border bg-background shadow">
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                currentTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* COURSES */}
          {currentTab === "courses" && <CoursesTab stats={stats} />}

          {/* USERS */}
          {currentTab === "users" && (
            <UsersTab
              users={stats.raw.users}
              availableClasses={availableClassesNames}
            />
          )}

          {/* MAIL */}
          {currentTab === "mail" && (
            <MailTab availableClasses={availableClassesNames} />
          )}

          {/* STATS */}
          {currentTab === "stats" && <StatsTab stats={stats} />}

          {/* TRACKING */}
          {currentTab === "tracking" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">🛰 Tracking Accessi</h2>

              <p className="text-muted-foreground">
                Sezione tracking in sviluppo.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
