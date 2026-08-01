import Link from "next/link";
import React from "react";
import { ArrowRight, Sparkles, Zap, Trophy, Brain } from "lucide-react";
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
  title = process.env.NEXT_PUBLIC_HERO_TITLE ||
    "L'Intelligenza Artificiale al servizio del tuo apprendimento.",
  subtitle = process.env.NEXT_PUBLIC_HERO_SUBTITLE ||
    "GCPROF Academy vuole essere una nuova esperienza di apprendimento che combina didattica tradizionale e Intelligenza Artificiale.",
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
    <section className="relative overflow-hidden bg-background py-20 lg:py-28 border-b border-border/40">
      {/* Background Radial Glow (Apple Style) */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform text-center">
        <div className="h-[320px] w-[600px] sm:w-[800px] rounded-full bg-gradient-to-tr from-blue-500/15 via-purple-500/15 to-pink-500/10 blur-3xl" />
      </div>

      <PageContainer className="flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
          <span>GCPROF AI ACADEMY • Nuova Piattaforma 2.0</span>
        </div>

        {/* Titolo Principale Imponente */}
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Apprendi Crea Evolvi <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Sottotitolo */}
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl leading-relaxed">
          {subtitle}
        </p>

        {/* Pulsanti CTA Dual */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href={primaryAction.href}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-[0.98]"
          >
            {primaryAction.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href={secondaryAction.href}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-border/80 bg-background/50 backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-accent/80 active:scale-[0.98]"
          >
            {secondaryAction.label}
          </Link>
        </div>

        {/* Micro Features Pill Bar */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-muted-foreground w-full max-w-3xl border-t border-border/60 pt-8">
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-card/50 border border-border/40">
            <Brain className="h-4 w-4 text-blue-500" />
            <span>Quiz AI Personalizzati</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-card/50 border border-border/40">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>XP & Livelli Sbloccabili</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-card/50 border border-border/40">
            <Trophy className="h-4 w-4 text-purple-500" />
            <span>Badge & Certificati</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-card/50 border border-border/40">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>Correzioni istantanee</span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}