"use client";

import { useRouter } from "next/navigation";
import CoursesTab from "../../courses/components/CoursesTab";
import UsersTab from "../../users/components/UsersTab";
import MailTab from "../../mail/components/MailTab";
import StatsTab from "../../stats/components/StatsTab";
import TrackingTab from "../../tracking/components/TrackingTab";
import RequestsTab from "./RequestsTab";
import QuizzesTab from "./QuizzesTab";
import ResourceAdminTable from "@/features/resources/components/ResourceAdminTable";
import { Resource } from "@/features/resources/types/Resource";

interface Props {
  stats: any;
  currentTab: string;
  trackingStats: any;
  initialResources: Resource[]; // <-- Prop aggiunta
}

const tabs = [
  { id: "courses", label: "📚 Corsi" },
  { id: "quizzes", label: "📝 Quiz" },
  { id: "users", label: "👥 Utenti" },
  { id: "requests", label: "🔔 Richieste esterni" },
  { id: "mail", label: "📧 Mail" },
  { id: "stats", label: "📊 Stats" },
  { id: "tracking", label: "🛰 Tracking" },
  // STEP 6: Aggiunto nuovo tab per il Knowledge Hub
  { id: "resources", label: "🔗 Risorse" },
];

export default function AdminDashboard({
  stats,
  currentTab,
  trackingStats,
  initialResources, // <-- Estratta dalle props
}: Props) {
  const router = useRouter();

  const availableClassesNames = (stats.raw.classes || []).map(
    (c: any) => c.name,
  );
  const availableQuizzes = stats.raw?.quizzes || [];

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
          Gestisci la struttura dei corsi, gli utenti, i quiz di sbarramento e
          tutte le funzionalità amministrative della piattaforma.
        </p>
      </div>

      {/* TAB BAR */}
      <div className="rounded-xl border bg-background shadow mt-6">
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={`
                px-6 py-4 text-sm font-medium transition-colors
                ${
                  currentTab === tab.id
                    ? "border-b-2 border-blue-600 dark:border-violet-500 text-blue-600 dark:text-violet-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* COURSES */}
          {currentTab === "courses" && <CoursesTab stats={stats} />}

          {/* QUIZZES */}
          {currentTab === "quizzes" && (
            <QuizzesTab availableQuizzes={availableQuizzes} />
          )}

          {/* REQUESTS */}
          {currentTab === "requests" && <RequestsTab />}

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
            <TrackingTab trackingStats={trackingStats} />
          )}

          {/* RESOURCES (STEP 6) */}
          {/* Passaggio delle resources alla tabella */}
          {currentTab === "resources" && <ResourceAdminTable resources={initialResources} />}
        </div>
      </div>
    </>
  );
}