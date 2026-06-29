"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { courses } from "@/features/courses/data/courses"; // Importiamo la lista completa per verificare l'esistenza
import { getCourseBySlug, hasCourseAccess } from "@/features/courses/services/courseService";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";

export default function CourseDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const slug = params?.slug as string;

  // Sicurezza al logout
  useEffect(() => {
    if (!localStorage.getItem("session")) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-gray-500">Disconnessione in corso...</p>
      </div>
    );
  }

  // 1. Controlliamo prima se il corso esiste REALMENTE nel database/file
  const courseExists = courses.find((c) => c.slug === slug);
  
  if (!courseExists) {
    // Se il corso non esiste proprio per nessuno, allora è giusto dare 404
    notFound();
  }

  // 2. Se il corso esiste, verifichiamo se l'utente corrente ha l'accesso abilitato
  const isAuthorized = hasCourseAccess(courseExists, user);

  if (!isAuthorized) {
    // 🎯 SCHERMATA ACCESSU NEGATO PERSONALIZZATA (Invece del 404)
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col bg-gray-50">
          <Navbar />
          <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="rounded-full bg-red-100 p-4 text-red-600 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-12 w-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">Accesso Non Autorizzato</h1>
            <p className="mt-3 text-sm text-gray-600">
              Spiacenti, il corso <span className="font-semibold text-gray-800">"{courseExists.title}"</span> è riservato esclusivamente alle classi: 
              <span className="ml-1 inline-block rounded bg-gray-200 px-1.5 py-0.5 text-xs font-bold text-gray-700">{courseExists.allowedClasses?.join(", ")}</span>.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              La tua classe attuale è: <span className="font-semibold">{user.class}</span>
            </p>
            <div className="mt-8">
              <Link href="/courses" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all">
                Torna al Catalogo Corsi
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  // 3. Se l'utente è autorizzato, estraiamo i dati protetti e mostriamo la pagina normale
  const course = getCourseBySlug(slug, user)!;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{course.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-gray-700">
            <div><strong>Categoria:</strong> {course.category}</div>
            <div><strong>Difficoltà:</strong> {course.difficulty}</div>
            <div><strong>Ore stimate:</strong> {course.estimatedHours}</div>
            <div><strong>Docente:</strong> {course.teacher}</div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">Moduli del corso</h2>
            <div className="mt-6 space-y-6">
              {course.modules.map((module) => (
                <div key={module.id} className="rounded-lg border bg-white p-5">
                  <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex justify-between text-sm text-gray-600">
                        <Link
                          href={`/courses/${slug}/modules/${module.id}/lessons/${lesson.id}`}
                          className="hover:text-blue-600 hover:underline transition-colors"
                        >
                          {lesson.title}
                        </Link>
                        <span>{lesson.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}