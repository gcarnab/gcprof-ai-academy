"use client";

import type { Course } from "@/features/courses/types/course";
import { CourseCTA } from "./CourseCTA";

interface CourseSidebarProps {
  course: Course;
  hasAccess: boolean;
  coursePrice: number | string;
  isEnrolling: boolean;
  onFreeEnroll: () => void;
}

export function CourseSidebar({
  course,
  hasAccess,
  coursePrice,
  isEnrolling,
  onFreeEnroll,
}: CourseSidebarProps) {

  console.log("🔍 DATI RICEVUTI NEL SIDEBAR:", { coursePrice, coursePriceType: typeof coursePrice, course });
  
  // Parsing e conversione sicura del prezzo
  const numericPrice =
    typeof coursePrice === "number"
      ? coursePrice
      : parseFloat(String(coursePrice || (course as any)?.price || 0));

  // Verifica se il corso è a pagamento (controlla il flag is_paid o il prezzo)
  const isPaidCourse =
    (course as any)?.is_paid ??
    (course as any)?.isPaid ??
    (!isNaN(numericPrice) && numericPrice > 0);

  const isFree = !isPaidCourse;

  return (
    <div className="relative">
      <div className="space-y-6 rounded-2xl border border-border bg-background p-6 shadow-sm sticky top-6">
        <h3 className="font-bold text-lg text-foreground border-b border-border pb-3 flex items-center gap-2">
          <span>ℹ️</span> Info Corso
        </h3>

        <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
          <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
            Sintesi
          </h4>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {course.description
              ? course.description.length > 160
                ? `${course.description.substring(0, 160).trim()}...`
                : course.description
              : "Nessuna sintesi disponibile per questo corso."}
          </p>
        </div>

        <div className="space-y-1 text-sm pt-2">
          <div className="flex justify-between items-center py-2.5 border-b border-border/40">
            <span className="text-muted-foreground">Categoria</span>
            <span className="font-medium text-foreground text-right">
              {course.category || "Generale"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-border/40">
            <span className="text-muted-foreground">Livello</span>
            <span className="font-medium text-foreground text-right">
              {course.difficulty || "Non specificato"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-border/40">
            <span className="text-muted-foreground">Durata stimata</span>
            <span className="font-medium text-foreground text-right">
              {course.estimatedHours ? `${course.estimatedHours} ore` : "N/D"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="text-muted-foreground">Docente</span>
            <span className="font-medium text-foreground text-right">
              {course.teacher || "Team Academy"}
            </span>
          </div>
        </div>

        {!hasAccess && (
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Prezzo Iscrizione
              </span>
              <span className="text-2xl font-extrabold text-foreground">
                {isFree ? "Gratuito" : `€${numericPrice.toFixed(2)}`}
              </span>
            </div>
            <CourseCTA
              courseId={String(course.id)}
              price={numericPrice}
              isPaid={isPaidCourse}
              isEnrolling={isEnrolling}
              onFreeEnroll={onFreeEnroll}
            />
          </div>
        )}
      </div>
    </div>
  );
}