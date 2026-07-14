"use client";

import React, { useEffect, useState, useTransition } from "react";
import { getQuizAnalyticsAction } from "../actions/statsActions";
import { QuizAnalyticsSummary } from "../repositories/QuizStatsRepository";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Percent, Award, AlertTriangle, Loader2, TrendingUp } from "lucide-react";

interface QuizStatsDashboardProps {
  quizId: string;
  quizTitle: string;
}

export function QuizStatsDashboard({ quizId, quizTitle }: QuizStatsDashboardProps) {
  const [analytics, setAnalytics] = useState<QuizAnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await getQuizAnalyticsAction(quizId);
      if (response.success && response.data) {
        setAnalytics(response.data);
      } else {
        setError(response.error || "Impossibile caricare i dati analitici del quiz.");
      }
    });
  }, [quizId]);

  if (isPending) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Elaborazione aggregati e calcolo distribuzioni...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive font-medium text-center max-w-xl mx-auto">
        {error}
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Intestazione */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary" />
          Analytics & Insights del Quiz
        </h1>
        <p className="text-muted-foreground mt-1">
          Analisi delle performance globali per: <span className="font-semibold text-foreground">{quizTitle}</span>
        </p>
      </div>

      {/* Grid delle metriche principali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Consegne Totali</span>
              <span className="text-2xl font-black">{analytics.totalAttempts}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Media Voti Nazionale</span>
              <span className="text-2xl font-black">{analytics.averageScore.toFixed(2)} <span className="text-xs text-muted-foreground font-normal">/10</span></span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
              <Percent className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Percentuale Successo</span>
              <span className="text-2xl font-black">{analytics.passingRate.toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-600 dark:text-yellow-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Picco Massimo</span>
              <span className="text-2xl font-black">{analytics.highestScore.toFixed(2)} <span className="text-xs text-muted-foreground font-normal">/10</span></span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuzione dei Voti */}
        <Card className="lg:col-span-1 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Distribuzione Voti</CardTitle>
            <CardDescription>Suddivisione degli studenti per fasce di punteggio finali.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.scoreDistribution.map((dist) => (
              <div key={dist.range} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Fascia {dist.range}</span>
                  <span className="text-muted-foreground">{dist.count} studenti</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: `${(dist.count / analytics.totalAttempts) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Analisi dei Punti Critici / Gap Analitico */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Domande ad Alto Tasso di Errore
            </CardTitle>
            <CardDescription>Quesiti che hanno registrato la maggior percentuale di risposte fallite o penalizzazioni applicate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.criticalQuestions.map((q, idx) => (
              <div key={q.questionId} className="p-3 border rounded-lg bg-muted/40 space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm font-medium leading-relaxed">
                    <span className="font-bold text-destructive mr-1">#{idx + 1}</span> {q.questionText}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:text-red-400 shrink-0 border border-red-500/20">
                    {q.errorRate.toFixed(1)}% Fallimenti
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-destructive" 
                    style={{ width: `${q.errorRate}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}