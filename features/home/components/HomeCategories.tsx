"use client";

import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Brain,
  CodeXml,
  Database,
  Coins,
  Blocks,
  HelpCircle,
  BookOpen,
  Layers,
} from "lucide-react";
import PageContainer from "@/shared/ui/PageContainer";
import { useCourseCategories } from "@/features/courses/hooks/useCourseCategories";
import SectionTitle from "@/shared/ui/SectionTitle";

// Mappatura delle icone Lucide basata su icon_name nel DB
const ICON_MAP: Record<string, React.ElementType> = {
  brain: Brain,
  "code-xml": CodeXml,
  database: Database,
  coin: Coins,
  blockchain: Blocks,
  blockchian: Blocks, // Fallback per il refuso nel DB
  quiz: HelpCircle,
};

// Mappatura immagini 3D/Unsplash per gli slug reali del DB
const CATEGORY_BACKGROUNDS: Record<string, string> = {
  quiz: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop",
  ai: "https://plus.unsplash.com/premium_photo-1725907643701-9ba38affe7bb?q=80&w=1170&auto=format&fit=crop",
  informatica:
    "https://plus.unsplash.com/premium_vector-1711987810156-4793e4aa786e?q=80&w=800&auto=format&fit=crop",
  programmazione:
    "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=800&auto=format&fit=crop",
  finance:
    "https://plus.unsplash.com/premium_photo-1733306583396-8621f2906a82?q=80&w=800&auto=format&fit=crop",
  blockchain:
    "https://plus.unsplash.com/premium_photo-1681400678259-255b10890b08?q=80&w=1179&auto=format&fit=crop",
};

const DEFAULT_IMAGE = "/gcprof-ai-academy_logo_01.png";

export default function HomeCategories() {
  const { categories, isLoading } = useCourseCategories();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ordiniamo le categorie secondo display_order del DB
  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return [...categories]
      .filter((cat) => cat.visibleHome)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const newIndex = Math.round(scrollLeft / clientWidth);
    setActiveIndex(newIndex);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <div className="h-8 w-3/4 bg-muted animate-pulse rounded-lg" />
              <div className="h-16 w-full bg-muted animate-pulse rounded-lg" />
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-muted animate-pulse rounded-3xl"
                />
              ))}
            </div>
          </div>
        </PageContainer>
      </section>
    );
  }

  if (sortedCategories.length === 0) return null;

  return (
    <section className="py-16 bg-background border-b border-border/30 overflow-hidden">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* COLONNA SINISTRA */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>Esplora per Argomento</span>
            </div>
            <SectionTitle
              title="Categorie in evidenza"
              subtitle="Scegli il percorso di apprendimento più adatto ai tuoi obiettivi."
            />

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Acquisisci{" "}
              <span className="italic font-serif font-normal">
                competenze essenziali
              </span>{" "}
              per la carriera e la vita
            </h2>
            {/**             
            <p className="text-muted-foreground text-sm leading-relaxed">
              GCProf AI Academy ti aiuta a sviluppare rapidamente le competenze più richieste e a far progredire la tua carriera in un mercato del lavoro in continua evoluzione.
            </p>
            */}
          </div>

          {/* COLONNA DESTRA: Card Slider */}
          <div className="lg:col-span-8 relative flex flex-col space-y-6">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory py-2 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sortedCategories.map((cat) => {
                const bgImage = CATEGORY_BACKGROUNDS[cat.slug] || DEFAULT_IMAGE;
                const IconComponent =
                  (cat.iconName && ICON_MAP[cat.iconName.toLowerCase()]) ||
                  BookOpen;

                return (
                  <Link
                    key={cat.id}
                    href={`/courses?category=${encodeURIComponent(cat.name)}`}
                    className="group relative flex-shrink-0 w-[230px] sm:w-[260px] aspect-[4/5] rounded-[28px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 snap-start border border-black/5 dark:border-white/10"
                  >
                    {/* Immagine di sfondo */}
                    <Image
                      src={bgImage}
                      alt={cat.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 230px, 260px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Badge / Card bianca fluttuante in basso */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl p-4 shadow-lg flex items-center justify-between border border-white/20 dark:border-zinc-800 transition-all duration-300 group-hover:translate-y-[-2px]">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="p-1.5 rounded-lg bg-muted/60 text-foreground shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                          {cat.name}
                        </span>
                      </div>

                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CONTROLLI SLIDER */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-full border border-border/80 bg-background hover:bg-accent flex items-center justify-center text-foreground transition-all shadow-sm hover:scale-105"
                aria-label="Precedente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({
                  length: Math.max(1, Math.ceil(sortedCategories.length / 2)),
                }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "w-7 bg-purple-600 dark:bg-purple-500"
                        : "w-2 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-full border border-border/80 bg-background hover:bg-accent flex items-center justify-center text-foreground transition-all shadow-sm hover:scale-105"
                aria-label="Successivo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
