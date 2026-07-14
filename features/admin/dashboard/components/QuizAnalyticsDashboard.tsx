"use client";

import React, { useState } from "react";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  class_name?: string;
}

interface Attempt {
  id: string;
  score: number;
  passed: boolean;
  started_at: string;
  completed_at: string;
  profiles: Profile | null;
}

interface Quiz {
  id: string;
  title: string;
  passing_score: number;
}

interface Props {
  quiz: Quiz;
  attempts: Attempt[];
}

export default function QuizAnalyticsDashboard({ quiz, attempts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  // 📊 Calcolo Statistiche Aggregate
  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((a) => a.passed).length;
  const failedAttempts = totalAttempts - passedAttempts;
  const passRate =
    totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  const averageScore =
    totalAttempts > 0
      ? Math.round(
          (attempts.reduce((acc, curr) => acc + curr.score, 0) /
            totalAttempts) *
            10,
        ) / 10
      : 0;

  // 🔍 Filtro di ricerca
  const query = searchTerm.trim().toLowerCase();

  const [selectedClass, setSelectedClass] = useState("Tutte");

  const filteredAttempts = attempts.filter((attempt) => {
    const name = attempt.profiles?.full_name?.toLowerCase() ?? "";
    const email = attempt.profiles?.email?.toLowerCase() ?? "";
    const className = attempt.profiles?.class_name ?? "";

    const matchesSearch =
      query === "" || name.includes(query) || email.includes(query);
    const matchesClass =
      selectedClass === "Tutte" || className === selectedClass;

    return matchesSearch && matchesClass;
  });

  const availableClasses = [
    "Tutte",
    ...Array.from(
      new Set(attempts.map((a) => a.profiles?.class_name).filter(Boolean)),
    ).sort(),
  ];
  /*
  console.table(
    attempts.map((a) => ({
      studente: a.profiles?.full_name,
      classe: a.profiles?.class_name,
    })),
  );
*/
  return (
    <div className="space-y-8">
      {/* 📈 CARDS DELLE STATISTICHE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Tentativi Totali
          </p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {totalAttempts}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Tasso di Superamento
          </p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            {passRate}%
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Soglia minima: {quiz.passing_score}%
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Punteggio Medio
          </p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {averageScore}%
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Promossi / Respinti
          </p>
          <p className="text-3xl font-bold text-foreground mt-2">
            <span className="text-emerald-500">{passedAttempts}</span>
            <span className="text-muted-foreground font-light mx-1.5">/</span>
            <span className="text-destructive">{failedAttempts}</span>
          </p>
        </div>
      </div>

      {/* 👥 LISTA DETTAGLIATA TENTATIVI */}
      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base text-foreground">
              Registro dei Test
            </h3>

            <p className="text-xs text-muted-foreground">
              {filteredAttempts.length} risultati su {attempts.length}
            </p>
          </div>
          {/*
          <input
            type="search"
            placeholder="🔍 Cerca nome, cognome o email..."
            autoComplete="off"
            spellCheck={false}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
           */}

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="search"
              placeholder="🔍 Cerca nome o email..."
              autoComplete="off"
              spellCheck={false}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 rounded-lg border bg-background px-3 py-2 text-sm"
            />

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            >
              {availableClasses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/20 text-muted-foreground font-medium select-none">
                <th className="p-4">Studente</th>
                <th className="p-4">Classe</th>
                <th className="p-4">Data Completamento</th>
                <th className="p-4 text-center">Punteggio</th>
                <th className="p-4 text-right">Esito</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAttempts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Nessun tentativo trovato.
                  </td>
                </tr>
              ) : (
                filteredAttempts.map((attempt) => {
                  const date = attempt.completed_at
                    ? new Date(attempt.completed_at).toLocaleDateString(
                        "it-IT",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "In corso...";

                  return (
                    <tr
                      key={attempt.id}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-foreground">
                          {attempt.profiles?.full_name || "Utente Anonimo"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {attempt.profiles?.email || "N/D"}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="inline-flex rounded-md border px-2 py-1 text-xs font-medium">
                          {attempt.profiles?.class_name || "-"}
                        </span>
                      </td>

                      <td className="p-4 text-muted-foreground">{date}</td>

                      <td className="p-4 text-center font-mono font-bold text-base">
                        {attempt.score}%
                      </td>

                      <td className="p-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            attempt.passed
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {attempt.passed ? "Superato ✓" : "Fallito ✕"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
