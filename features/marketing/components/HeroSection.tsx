import Link from "next/link";
import React from "react";

import {
  ArrowRight,
  BrainCircuit,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import PageContainer from "@/shared/ui/PageContainer";

interface HeroAction {
  label: string;
  href: string;
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
}

export default function HeroSection({
  title = "Impara Informatica con l'AI",
  subtitle = "GCPROF AI Academy unisce corsi strutturati, quiz interattivi, correzione intelligente e dashboard evolute per studenti e docenti, in un'unica piattaforma moderna.",
  primaryAction = {
    label: "Inizia gratuitamente",
    href: "/register",
  },
  secondaryAction = {
    label: "Esplora i corsi",
    href: "/courses",
  },
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-150px] top-[-150px] h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute right-[-180px] bottom-[-180px] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <PageContainer className="py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ===========================
              COLONNA SINISTRA
          ============================ */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Piattaforma didattica intelligente
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-foreground md:text-6xl xl:text-7xl">
              {title}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              {subtitle}
            </p>

            {/* Feature List */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Feature
                icon={<BrainCircuit className="h-5 w-5" />}
                title="Quiz Intelligenti"
              />

              <Feature
                icon={<BookOpen className="h-5 w-5" />}
                title="Corsi Interattivi"
              />

              <Feature
                icon={<GraduationCap className="h-5 w-5" />}
                title="Dashboard Docente"
              />

              <Feature
                icon={<CheckCircle2 className="h-5 w-5" />}
                title="Correzione Automatica"
              />
            </div>

            {/* CTA */}

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3 text-white font-semibold shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-700"
              >
                {primaryAction.label}

                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href={secondaryAction.href}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-7 py-3 font-semibold transition hover:bg-accent"
              >
                {secondaryAction.label}
              </Link>
            </div>
          </div>
          {/* ===========================
              COLONNA DESTRA
          ============================ */}

          <div className="relative">
            <div className="rounded-3xl border bg-card shadow-2xl overflow-hidden">
              <div className="border-b bg-muted/40 px-6 py-4">
                <h3 className="font-bold text-lg">
                  Dashboard GCPROF AI Academy
                </h3>

                <p className="text-sm text-muted-foreground">
                  Anteprima della piattaforma
                </p>
              </div>

              <div className="space-y-5 p-6">
                <MockCard title="Quiz AI" value="Mixed" color="bg-blue-500" />

                <MockCard
                  title="Progresso Corso"
                  value="82%"
                  color="bg-green-500"
                />

                <MockCard
                  title="Voto Medio"
                  value="8.7 / 10"
                  color="bg-violet-500"
                />

                <MockCard
                  title="Tempo di Studio"
                  value="18h"
                  color="bg-orange-500"
                />
              </div>
            </div>

            {/* Floating cards */}

            <div className="absolute -left-6 top-10 rounded-2xl border bg-card px-4 py-3 shadow-xl">
              <div className="text-xs text-muted-foreground">Studenti</div>

              <div className="text-2xl font-bold">+150</div>
            </div>

            <div className="absolute -right-5 bottom-10 rounded-2xl border bg-card px-4 py-3 shadow-xl">
              <div className="text-xs text-muted-foreground">
                Quiz completati
              </div>

              <div className="text-2xl font-bold">1K</div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <div className="text-blue-600">{icon}</div>

      <span className="font-medium">{title}</span>
    </div>
  );
}

function MockCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
      <div>
        <div className="text-sm text-muted-foreground">{title}</div>

        <div className="mt-1 text-xl font-bold">{value}</div>
      </div>

      <div className={`h-12 w-12 rounded-xl ${color}`} />
    </div>
  );
}
