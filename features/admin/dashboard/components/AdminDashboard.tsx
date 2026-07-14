"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react"; // 🎯 Importato useState per gestire il caricamento dell'importazione
import { Button } from "@/components/ui/button";
import CoursesTab from "../../courses/components/CoursesTab";
import UsersTab from "../../users/components/UsersTab";
import MailTab from "../../mail/components/MailTab";
import StatsTab from "../../stats/components/StatsTab";
import TrackingTab from "../../tracking/components/TrackingTab";
import {
  importQuizFromMarkdownAction,
  updateQuizStatusAction,
} from "@/features/quiz/actions/quizActions";

interface Props {
  stats: any;
  currentTab: string;
  trackingStats: any;
}

const tabs = [
  {
    id: "courses",
    label: "📚 Corsi",
  },
  {
    id: "quizzes",
    label: "📝 Quiz",
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

export default function AdminDashboard({
  stats,
  currentTab,
  trackingStats,
}: Props) {
  const router = useRouter();
  const [isImporting, setIsImporting] = useState(false); // 🎯 Stato di caricamento dell'import

  const availableClassesNames = (stats.raw.classes || []).map(
    (c: any) => c.name,
  );

  const availableQuizzes = stats.raw?.quizzes || [];

  function changeTab(tab: string) {
    router.push(`/admin/dashboard?tab=${tab}`);
  }

  // 🎯 FUNZIONE DI IMPORTAZIONE: Legge il file .md lato client e lo prepara per il parser/action
  const handleMarkdownImport = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;

        // =========================================================================
        // 🛠 DA CONNETTERE: Incolla qui la chiamata alla tua Server Action o API
        const result = await uploadQuizFromMarkdown(content);
        // =========================================================================
        console.log("File caricato con successo. Contenuto:", content);

        // Simulazione fine operazione e aggiornamento della pagina server-side
        setTimeout(() => {
          router.refresh();
          setIsImporting(false);
          e.target.value = ""; // Resetta l'input file
        }, 1000);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Errore durante la lettura del file Markdown:", error);
      setIsImporting(false);
    }
  };

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
                    ? "border-b-2 border-blue-600 text-blue-600"
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

          {/* RENDER DELLA TAB QUIZ AGGIORNATA */}
          {currentTab === "quizzes" && (
            <div className="space-y-4">
              <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Gestione Quiz di Sbarramento
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Seleziona un quiz per monitorare le performance degli
                    studenti o importane uno nuovo.
                  </p>
                </div>

                {/* 🎯 NUOVO: Pulsante di importazione rapida nell'header del tab */}
                <div>
                  <label
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer ${
                      isImporting
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <span>
                      {isImporting
                        ? "⌛ Elaborazione..."
                        : "📥 Importa da Markdown (.md)"}
                    </span>
                    <input
                      type="file"
                      accept=".md"
                      className="hidden"
                      disabled={isImporting}
                      onChange={handleMarkdownImport}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-xl border bg-background overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
                      <th className="p-4 text-left">Titolo del Quiz</th>
                      <th className="p-4 text-center">Stato</th>
                      <th className="p-4 text-center">Soglia Minima</th>
                      <th className="p-4 text-center">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {availableQuizzes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="p-12 text-center text-muted-foreground"
                        >
                          {/* 🎯 NUOVO: Interfaccia di inserimento dedicata allo stato vuoto */}
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <p className="text-base font-medium text-foreground">
                              Nessun quiz registrato nel database.
                            </p>
                            <p className="text-xs max-w-md mx-auto text-muted-foreground">
                              I quiz vengono estratti e strutturati partendo dai
                              tuoi file di testo. Carica subito un file di
                              pratica per iniziare.
                            </p>
                            <label
                              className={`mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                                isImporting
                                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                                  : "text-blue-600 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100"
                              }`}
                            >
                              <span>
                                {isImporting
                                  ? "Parsing in corso..."
                                  : "Scegli il file .md ora"}
                              </span>
                              <input
                                type="file"
                                accept=".md"
                                className="hidden"
                                disabled={isImporting}
                                onChange={handleMarkdownImport}
                              />
                            </label>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      availableQuizzes.map((quiz: any) => (
                        <tr
                          key={quiz.id}
                          className="hover:bg-muted/10 transition-colors"
                        >
                          <td className="p-4 font-semibold text-foreground">
                            {quiz.title}
                          </td>

                          <td className="p-4 text-center">

                            {quiz.status === "active" ? (
                              <span className="rounded bg-green-100 text-green-700 px-2 py-1 text-xs font-semibold">
                                Pubblicato
                              </span>
                            ) : (
                              <span className="rounded bg-yellow-100 text-yellow-700 px-2 py-1 text-xs font-semibold">
                                Draft
                              </span>
                            )}

                          </td>

                          <td className="p-4 text-center font-mono text-muted-foreground">
                            {quiz.passing_score
                              ? `${quiz.passing_score}%`
                              : "—"}
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="default"
                                disabled={quiz.status === "active"}
                                onClick={async () => {
                                  console.log("===> PUBBLICAZIONE QUIZ");
                                  await updateQuizStatusAction(
                                    quiz.id,
                                    "active",
                                  );

                                  router.refresh();
                                }}
                              >
                                Pubblica
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={async () => {
                                  console.log("===> RITIRO DEL QUIZ");
                                  await updateQuizStatusAction(
                                    quiz.id,
                                    "draft",
                                  );
                                  router.refresh();
                                }}
                                disabled={quiz.status === "draft"}
                              >
                                Ritira
                              </Button>

                              <Link
                                href={`/admin/quiz/${quiz.id}/analytics`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                              >
                                📊 Analizza Risultati
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
        </div>
      </div>
    </>
  );
}

async function uploadQuizFromMarkdown(content: string) {
  try {
    // 1. Invochiamo la Server Action passandogli il testo Markdown
    const result = await importQuizFromMarkdownAction(content);

    if (!result.success) {
      // Gestisci l'errore restituito dal parser o da Supabase
      console.error("Errore durante l'importazione del quiz:", result.error);
      alert(`Impossibile importare il quiz: ${result.error}`);
      return;
    }

    // 2. Successo!
    alert("Quiz importato e salvato nel database con successo!");

    // Se nel tuo componente hai a disposizione 'router' da 'next/navigation',
    // sbloccalo qui per aggiornare la tabella all'istante:
    // router.refresh();
  } catch (error: any) {
    console.error("Errore di rete o imprevisto:", error);
    alert(
      `Si è verificato un errore imprevisto: ${error.message || "Riprova più tardi."}`,
    );
  }
}
