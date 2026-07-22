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
  initialResources: Resource[];
  paymentsTab?: React.ReactNode;
}

const tabs = [
  { id: "courses", label: "📚 Corsi" },
  { id: "quizzes", label: "📝 Quiz" },
  { id: "users", label: "👥 Utenti" },
  { id: "requests", label: "🔔 Richieste esterni" },
  { id: "mail", label: "📧 Mail" },
  { id: "stats", label: "📊 Stats" },
  { id: "tracking", label: "🛰 Tracking" },
  { id: "resources", label: "🔗 Risorse" },
  { id: "payments", label: "💳 Payments" },
];

export default function AdminDashboard({
  stats,
  currentTab,
  trackingStats,
  initialResources,
  paymentsTab,
}: Props) {
  const router = useRouter();

  const availableClassesNames = (stats.raw?.classes || []).map(
    (c: any) => c.name
  );
  const availableQuizzes = stats.raw?.quizzes || [];

  function changeTab(tab: string) {
    router.push(`/admin/dashboard?tab=${tab}`);
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Pannello Amministratore
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          Gestisci la struttura dei corsi, gli utenti, i quiz di sbarramento e
          tutte le funzionalità amministrative della piattaforma.
        </p>
      </div>

      {/* TAB BAR E CONTENUTO */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        {/* Scroll orizzontale su mobile per evitare il collasso visivo delle tab */}
        <div className="flex overflow-x-auto border-b no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`
                  whitespace-nowrap px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2
                  ${
                    isActive
                      ? "border-blue-600 dark:border-violet-500 text-blue-600 dark:text-violet-400 bg-blue-50/50 dark:bg-violet-500/10"
                      : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-border"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 
          Area Contenuto con animazione fade-in allo switch delle tab.
        */}
        <div
          key={currentTab}
          className="p-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
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
              users={stats.raw?.users || []}
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

          {/* RESOURCES */}
          {currentTab === "resources" && (
            <ResourceAdminTable resources={initialResources} />
          )}

          {/* PAYMENTS */}
          {currentTab === "payments" && paymentsTab}
        </div>
      </div>
    </div>
  );
}