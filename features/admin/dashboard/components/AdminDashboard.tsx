"use client";

import { useState } from "react";
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
import {
  HomeBannerSettings,
  MaintenanceSettings,
} from "@/features/system/types/SystemConfiguration";
import HomeBannerAdminForm from "@/features/system/components/HomeBannerAdminForm";
import MaintenanceAdminForm from "@/features/system/components/MaintenanceAdminForm";
import AiSettingsForm from "@/features/ai/components/AiSettingsForm";

interface Props {
  stats: any;
  currentTab: string;
  trackingStats: any;
  initialResources: Resource[];
  initialSystemSettings?: HomeBannerSettings;
  initialMaintenanceSettings?: MaintenanceSettings;
  initialAiSettings?: any;
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
  { id: "settings", label: "⚙️ Impostazioni" },
];

export default function AdminDashboard({
  stats,
  currentTab,
  trackingStats,
  initialResources,
  initialSystemSettings,
  initialMaintenanceSettings,
  initialAiSettings,
  paymentsTab,
}: Props) {
  const router = useRouter();

  const [settingsSubTab, setSettingsSubTab] = useState<
    "system" | "ai"
  >("system");

  const availableClassesNames = (stats.raw?.classes || []).map(
    (c: any) => c.name,
  );

  const availableQuizzes = stats.raw?.quizzes || [];
  const availableCourses = stats.courseStats || [];

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

        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Gestisci la struttura dei corsi, gli utenti, i quiz di
          sbarramento e tutte le funzionalità amministrative della
          piattaforma.
        </p>
      </div>

      {/* TAB BAR E CONTENUTO */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="no-scrollbar flex overflow-x-auto border-b">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`
                  whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "border-blue-600 bg-blue-50/50 text-blue-600 dark:border-violet-500 dark:bg-violet-500/10 dark:text-violet-400"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          key={currentTab}
          className="animate-in slide-in-from-bottom-2 p-6 fade-in duration-300"
        >
          {currentTab === "courses" && (
            <CoursesTab stats={stats} />
          )}

          {currentTab === "quizzes" && (
            <QuizzesTab
              availableQuizzes={availableQuizzes}
              availableCourses={availableCourses}
            />
          )}

          {currentTab === "requests" && <RequestsTab />}

          {currentTab === "users" && (
            <UsersTab
              users={stats.raw?.users || []}
              availableClasses={availableClassesNames}
            />
          )}

          {currentTab === "mail" && (
            <MailTab availableClasses={availableClassesNames} />
          )}

          {currentTab === "stats" && (
            <StatsTab stats={stats} />
          )}

          {currentTab === "tracking" && (
            <TrackingTab trackingStats={trackingStats} />
          )}

          {currentTab === "resources" && (
            <ResourceAdminTable resources={initialResources} />
          )}

          {currentTab === "payments" && paymentsTab}

          {currentTab === "settings" && (
            <div className="space-y-6">
              {/* SETTINGS SUB TABS */}
              <div className="flex gap-2 border-b border-border pb-3">
                <button
                  type="button"
                  onClick={() => setSettingsSubTab("system")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    settingsSubTab === "system"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  🎨 Banner Home & Sistema
                </button>

                <button
                  type="button"
                  onClick={() => setSettingsSubTab("ai")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    settingsSubTab === "ai"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  🤖 Configurazione IA
                </button>
              </div>

              {settingsSubTab === "system" && (
                <div className="space-y-6">
                  {initialSystemSettings && (
                    <HomeBannerAdminForm
                      initialSettings={initialSystemSettings}
                    />
                  )}

                  {initialMaintenanceSettings && (
                    <MaintenanceAdminForm
                      initialSettings={initialMaintenanceSettings}
                    />
                  )}
                </div>
              )}

              {settingsSubTab === "ai" && (
                <AiSettingsForm
                  initialSettings={initialAiSettings}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}