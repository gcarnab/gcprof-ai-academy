/**
 * GCPROF AI ACADEMY
 * File: features/courses/components/CourseViewer.tsx
 */

"use client";

import React, { useState } from "react";
import { Course, Lesson, Module } from "../types/course";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlayCircle,
  FileText,
  GraduationCap,
  Menu,
} from "lucide-react";
import BadgeUnlockedModal, {
  BadgeUnlockData,
} from "@/features/gamification/components/BadgeUnlockedModal";
import LessonRenderer, {
  LessonContent,
} from "@/features/courses/components/lesson/LessonRenderer";

// 🎯 FIX: Import per il tracciamento dell'attività e l'autenticazione
import ActivityTracker from "@/features/admin/users/components/ActivityTracker";
import { useAuth } from "@/features/auth/context/AuthContext";

interface CourseViewerProps {
  course: Course;
}

export function CourseViewer({ course }: CourseViewerProps) {
  const { user } = useAuth();

  // Imposta la prima lezione del primo modulo come lezione iniziale di default
  const initialLesson = course.modules[0]?.lessons[0] || null;
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(
    initialLesson
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 🏆 Stato per gestire il modal del badge sbloccato
  const [unlockedBadge, setUnlockedBadge] = useState<BadgeUnlockData | null>(
    null
  );

  /**
   * Normalizza i contenuti della lezione per renderli compatibili con LessonRenderer
   */
  const getLessonContents = (lesson: Lesson): LessonContent[] => {
    if ((lesson as any).contents && Array.isArray((lesson as any).contents)) {
      return (lesson as any).contents;
    }

    const contents: LessonContent[] = [];

    if (lesson.contentType === "video" && lesson.youtubeUrl) {
      contents.push({
        type: "video",
        url: lesson.youtubeUrl,
        title: lesson.title,
        quiz_id: (lesson as any).quizId || null,
      });
    }

    if (
      (lesson.contentType === "document" || lesson.contentType === "mixed") &&
      lesson.googleDriveUrl
    ) {
      contents.push({
        type: "document",
        url: lesson.googleDriveUrl,
        title: lesson.title,
        quiz_id: (lesson as any).quizId || null,
      });
    }

    if (contents.length === 0 && (lesson as any).quizId) {
      contents.push({
        type: "markdown",
        title: lesson.title,
        content:
          "Prendi visione dei requisiti e completa il test di verifica sottostante.",
        quiz_id: (lesson as any).quizId,
      });
    }

    return contents;
  };

  return (
    <div className="relative flex h-[calc(100vh-4rem)] overflow-hidden bg-background border rounded-xl max-w-7xl mx-auto">
      {/* 🎯 FIX: Tracker dell'attività per la lezione correntemente selezionata */}
      {user && currentLesson && (
        <ActivityTracker
          key={currentLesson.id}
          courseId={String(course.id)}
          lessonId={String(currentLesson.id)}
        />
      )}

      {/* 🏆 MODAL NOTIFICA BADGE SBLOCCATO */}
      {unlockedBadge && (
        <BadgeUnlockedModal
          badge={unlockedBadge}
          onClose={() => setUnlockedBadge(null)}
        />
      )}

      {/* BARRA LATERALE: Albero dei Moduli e delle Lezioni */}
      <div
        className={`${
          isSidebarOpen ? "w-80" : "w-0 -ml-80"
        } lg:w-80 shrink-0 border-r bg-muted/20 flex flex-col h-full transition-all duration-300 overflow-y-auto z-20`}
      >
        <div className="p-4 border-b bg-card flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span className="font-bold text-sm truncate">{course.title}</span>
        </div>

        <div className="flex-1 p-2 space-y-4 mt-2">
          {course.modules.map((module: Module, modIdx: number) => (
            <div key={module.id} className="space-y-1">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 block">
                Modulo {modIdx + 1}: {module.title}
              </span>

              <div className="space-y-0.5 pt-1">
                {module.lessons.map((lesson: Lesson) => {
                  const isSelected = currentLesson?.id === lesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      }`}
                    >
                      {lesson.contentType === "video" ? (
                        <PlayCircle className="h-4 w-4 shrink-0" />
                      ) : (
                        <FileText className="h-4 w-4 shrink-0" />
                      )}
                      <span className="truncate flex-1">{lesson.title}</span>
                      <span className="text-[10px] opacity-80 shrink-0">
                        {lesson.duration}m
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AREA CENTRALE: Visualizzatore Contenuti con LessonRenderer */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-card">
        {/* Top bar di controllo */}
        <div className="p-4 border-b flex items-center justify-between bg-background">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            {currentLesson && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {currentLesson.contentType}
                </Badge>
                <h2 className="text-sm font-semibold text-foreground truncate max-w-[240px] md:max-w-md">
                  {currentLesson.title}
                </h2>
              </div>
            )}
          </div>

          <span className="text-xs text-muted-foreground hidden sm:inline">
            Docente: {course.teacher}
          </span>
        </div>

        {/* Content Box condizionale */}
        <div className="flex-1 p-6 space-y-6">
          {!currentLesson ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <FileText className="h-12 w-12 text-muted-foreground/40 mb-2" />
              <h3 className="font-medium text-lg">
                Nessuna lezione selezionata
              </h3>
              <p className="text-sm text-muted-foreground">
                Scegli una lezione dalla barra laterale per iniziare a studiare.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto h-full flex flex-col">
              <LessonRenderer
                contents={getLessonContents(currentLesson)}
                unlockedBadge={unlockedBadge}
                onCloseBadge={() => setUnlockedBadge(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}