"use client";

import React, { useEffect, useState, useTransition } from "react";
import { getAvailableCoursesAction } from "../actions/courseActions";
import { Course } from "../types/course";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  BookOpen,
  Clock,
  GraduationCap,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Link from "next/link";

export function CourseDashboard() {
  const [courses, setCourses] = useState<Omit<Course, "modules">[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<
    Omit<Course, "modules">[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Stati per i filtri di ricerca
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  useEffect(() => {
    startTransition(async () => {
      const response = await getAvailableCoursesAction();
      if (response.success && response.data) {
        setCourses(response.data);
        setFilteredCourses(response.data);
      } else {
        setError(
          response.error || "Impossibile caricare il catalogo dei corsi.",
        );
      }
    });
  }, []);

  // Logica di filtraggio combinata client-side
  useEffect(() => {
    let result = courses;

    if (searchQuery.trim() !== "") {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      result = result.filter((c) => c.difficulty === selectedDifficulty);
    }

    setFilteredCourses(result);
  }, [searchQuery, selectedCategory, selectedDifficulty, courses]);

  // Estrae le categorie uniche per generare i filtri dinamici
  const categories = [
    "all",
    ...Array.from(new Set(courses.map((c) => c.category))),
  ];
  const difficulties = ["all", "Facile", "Intermedio", "Avanzato"];

  if (isPending) {
    return (
      <div className="h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">
          Caricamento catalogo formativo personalizzato...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive font-medium text-center max-w-xl mx-auto mt-8">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4">
      {/* Header Sezione */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />I Tuoi Corsi
          Abilitati
        </h1>
        <p className="text-muted-foreground mt-1">
          Sfoglia e fruisci dei percorsi didattici e dei moduli di verifica
          assegnati alla tua classe.
        </p>
      </div>

      {/* Barra dei Filtri */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/40 p-4 rounded-xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca un corso o argomento..."
            className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
          {/* Filtro Categoria */}
          <div className="flex items-center gap-1.5 text-sm">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              className="bg-background border border-input rounded-lg px-2.5 py-1.5 text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Tutte le Categorie" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Difficoltà */}
          <select
            className="bg-background border border-input rounded-lg px-2.5 py-1.5 text-sm"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff === "all" ? "Tutte le Difficoltà" : diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid dei Corsi */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 border rounded-xl border-dashed bg-card">
          <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Nessun corso trovato</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Modifica i parametri di ricerca o i filtri selezionati.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="flex flex-col h-full border-border bg-card hover:shadow-md transition-all"
            >
              {course.coverImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted border-b">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="p-5 pb-2">
                <div className="flex gap-2 mb-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-bold uppercase tracking-wider"
                  >
                    {course.category}
                  </Badge>
                  <Badge
                    variant={
                      course.difficulty === "Avanzato"
                        ? "destructive"
                        : course.difficulty === "Intermedio"
                          ? "default"
                          : "outline"
                    }
                    className="text-[10px] font-bold"
                  >
                    {course.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold line-clamp-1">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm pt-1">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-2 pb-4 flex-1 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary/70" />
                  <span>
                    Durata stimata:{" "}
                    <span className="font-semibold text-foreground">
                      {course.estimatedHours} ore
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 shrink-0 text-primary/70" />
                  <span>
                    Docente:{" "}
                    <span className="font-semibold text-foreground">
                      {course.teacher}
                    </span>
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 border-t mt-auto bg-muted/20 rounded-b-xl">
                <Button
                  className="w-full mt-4 font-semibold"
                  onClick={() =>
                    (window.location.href = `/courses/${course.slug}`)
                  }
                >
                  Accedi alle Lezioni
                </Button>
                <Link href={`/courses-v2/${course.slug}`} className="w-full">
                  <Button className="w-full mt-4 font-semibold">
                    Accedi alle Lezioni V2
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Icona utente inline per brevità
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
