"use client";

import React, { useState } from "react";
import { Course, Lesson, Module } from "../types/course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  PlayCircle,
  FileText,
  HelpCircle,
  GraduationCap,
  Menu,
} from "lucide-react";

interface CourseViewerProps {
  course: Course;
}

export function CourseViewer({ course }: CourseViewerProps) {
  // Imposta la prima lezione del primo modulo come lezione iniziale di default
  const initialLesson = course.modules[0]?.lessons[0] || null;
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(
    initialLesson,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Helper per estrarre l'ID video da un URL YouTube standard o abbreviato
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  // Helper per ripulire l'URL di Google Drive per l'embed in iframe
  const getGoogleDriveEmbedUrl = (url?: string) => {
    if (!url) return "";
    if (url.includes("/view") || url.includes("/edit")) {
      return url
        .replace(/\/edit.*$/, "/preview")
        .replace(/\/view.*$/, "/preview");
    }
    return url;
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background border rounded-xl max-w-7xl mx-auto">
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

      {/* AREA CENTRALE: Visualizzatore Contenuti e Player */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-card">
        {/* Top bar di controllo */}
        <div className="p-4 border-b flex items-center justify-between bg-background">
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
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Docente: {course.teacher}
          </span>
        </div>

        {/* Content Box condizionale basato su Type Guard */}
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
              {/* 1. SEZIONE MULTIMEDIALE (VIDEO O DOCUMENTO) */}
              {currentLesson.contentType === "video" &&
                currentLesson.youtubeUrl && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden border bg-black shadow-sm">
                    <iframe
                      src={getYouTubeEmbedUrl(currentLesson.youtubeUrl)}
                      title={currentLesson.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

              {(currentLesson.contentType === "document" ||
                currentLesson.contentType === "mixed") &&
                currentLesson.googleDriveUrl && (
                  <div className="flex-1 min-h-[480px] w-full rounded-xl overflow-hidden border bg-background shadow-sm">
                    <iframe
                      src={getGoogleDriveEmbedUrl(currentLesson.googleDriveUrl)}
                      className="w-full h-full border-none"
                      allow="autoplay"
                    />
                  </div>
                )}

              {/* 2. AREA INFORMAZIONI E BLOCCO DI SBARRAMENTO (QUIZ) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg font-bold">
                    Descrizione e Note Guida
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Prendi visione completa del materiale didattico sopra
                    riportato prima di procedere. Se la lezione include elementi
                    pratici o codice, esegui i test in locale prima di avviare
                    la verifica.
                  </p>
                </div>

                {/* Box Sbarramento Quiz */}
                <div className="md:col-span-1">
                  {(currentLesson as any).quizId ? (
                    <Card className="border-primary/30 bg-primary/5 h-full flex flex-col justify-between">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-bold flex items-center gap-1.5 text-primary">
                          <HelpCircle className="h-4 w-4" />
                          Test di Sbarramento
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Completa questo quiz per convalidare l'apprendimento.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Button
                          className="w-full font-bold text-xs gap-1"
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/quiz/${(currentLesson as any).quizId}`)
                          }
                        >
                          Esegui Quiz Ora
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-dashed h-full flex items-center justify-center p-4 text-center">
                      <p className="text-xs text-muted-foreground italic">
                        Nessun quiz richiesto per questa lezione.
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
