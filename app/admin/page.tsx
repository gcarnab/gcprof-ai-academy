"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getMergedCourses, saveCmsCourse } from "@/features/courses/services/courseService";
import type { Course } from "@/features/courses/types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Stati del Form per il nuovo corso
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Informatica");
  const [difficulty, setDifficulty] = useState("Facile");
  const [teacher, setTeacher] = useState("Prof. G. Carnabuci");
  const [estimatedHours, setEstimatedHours] = useState(20);
  const [allowedClassesInput, setAllowedClassesInput] = useState(""); // es: "1A, 1B"

  // Carica i corsi all'avvio
  useEffect(() => {
    setCourses(getMergedCourses());
  }, []);

  // Funzione per rigenerare lo slug in automatico dal titolo
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  // Salvataggio del nuovo corso
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug) return;

    // Parsiamo le classi separate da virgola
    const allowedClasses = allowedClassesInput
      ? allowedClassesInput.split(",").map((c) => c.trim().toUpperCase()).filter(Boolean)
      : [];

    const newCourse: Course = {
      id: courses.length + 1, // ID incrementale temporaneo
      title,
      slug,
      description,
      category,
      difficulty,
      teacher,
      estimatedHours: Number(estimatedHours),
      published: true, // Lo pubblichiamo di default
      allowedClasses,
      modules: [], // Inizialmente senza moduli
    };

    saveCmsCourse(newCourse);
    
    // Aggiorna la UI locale e resetta il form
    const updatedCourses = getMergedCourses();
    setCourses(updatedCourses);
    setIsDialogOpen(false);
    
    // Reset campi
    setTitle("");
    setSlug("");
    setDescription("");
    setAllowedClassesInput("");
  };

  // Funzione magica per esportare il file JSON aggiornato
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(courses, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "courses.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {/* Intestazione Dashboard */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pannello Amministrazione</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestisci il catalogo dei corsi dell'Academy e assegna i permessi alle classi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Bottone Esporta JSON */}
            <Button variant="outline" onClick={handleExportJSON} className="gap-2">
              📦 Esporta JSON Codice
            </Button>

            {/* Modal di Creazione Corso */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Crea Nuovo Corso</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Configura Nuovo Corso</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleCreateCourse} className="space-y-4 py-2">
                  <div className="space-y-1">
                    <Label htmlFor="title">Titolo del Corso</Label>
                    <Input
                      id="title"
                      placeholder="es: Programmazione C++ Base"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="slug">Slug URL (Generato in automatico)</Label>
                    <Input
                      id="slug"
                      placeholder="es: programmazione-cpp-base"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="description">Descrizione Breve</Label>
                    <Textarea
                      id="description"
                      placeholder="Fornisci una panoramica degli obiettivi del corso..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="category">Categoria</Label>
                      <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="difficulty">Difficoltà</Label>
                      <Input id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="teacher">Docente Responsabile</Label>
                      <Input id="teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="hours">Ore Stimate</Label>
                      <Input
                        id="hours"
                        type="number"
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* 🎯 SEZIONE CHIAVE: ABILITAZIONE CLASSI */}
                  <div className="space-y-1 rounded-md bg-blue-50 p-3 border border-blue-200">
                    <Label htmlFor="classes" className="text-blue-900 font-semibold">Classi Abilitate all'Accesso</Label>
                    <Input
                      id="classes"
                      placeholder="es: 1A, 1B, 3A"
                      value={allowedClassesInput}
                      onChange={(e) => setAllowedClassesInput(e.target.value)}
                    />
                    <p className="text-[11px] text-blue-700 mt-1">
                      Separa le classi con una virgola. Lascia vuoto per rendere il corso accessibile a qualunque utente loggato.
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white pt-2">
                    Salva Corso nel Browser
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabella riassuntiva dei corsi gestiti */}
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-3.5">Titolo Corso / Slug</th>
                <th className="px-6 py-3.5">Categoria</th>
                <th className="px-6 py-3.5">Docente</th>
                <th className="px-6 py-3.5">Classi Abilitate</th>
                <th className="px-6 py-3.5 text-right">Stato Moduli</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
              {courses.map((course) => (
                <tr key={course.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{course.title}</div>
                    <div className="text-xs text-gray-400 font-mono">/courses/{course.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{course.teacher}</td>
                  <td className="px-6 py-4">
                    {course.allowedClasses && course.allowedClasses.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {course.allowedClasses.map((cls) => (
                          <span key={cls} className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-bold text-gray-800 border border-gray-200">
                            {cls}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs italic text-green-600 font-medium">🔓 Accesso Libero (Tutti)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-400">
                    {course.modules?.length || 0} moduli inseriti
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}