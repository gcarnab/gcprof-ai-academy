"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/auth/context/AuthContext";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import LoginDialog from "@/features/auth/components/LoginDialog";
import { getCourseBySlug } from "@/features/courses/services/courseService";

export default function CourseDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const slug = params?.slug as string;

  const course = getCourseBySlug(slug, user);

  if (!course) {
    notFound();
  }

  // Verifica se l'utente loggato ha la classe corretta
  const userClasses = user?.class?.split(",").map((c) => c.trim()) || [];
  const isClassAuthorized =
    !course.allowedClasses ||
    course.allowedClasses.length === 0 ||
    user?.role === "admin" ||
    course.allowedClasses.some((ac) => userClasses.includes(ac));

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        {/* Intestazione Corso con Logo/Immagine opzionale */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {course.coverImage ? (
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border bg-white p-2 shadow-sm flex items-center justify-center text-4xl">
              {course.coverImage.startsWith("http") ? (
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span>{course.coverImage}</span> // Supporta anche emoji come logo temporaneo (es: "🐍", "⚛️")
              )}
            </div>
          ) : (
            <div className="h-32 w-32 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shadow-sm">
              📚 LMS
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{course.description}</p>
          </div>
        </div>

        {/* METADATI PUBBLICI */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-lg border bg-white p-5 text-sm text-gray-700 shadow-sm sm:grid-cols-4">
          <div>
            <strong>Categoria:</strong>{" "}
            <p className="text-gray-900 mt-0.5">{course.category}</p>
          </div>
          <div>
            <strong>Difficoltà:</strong>{" "}
            <p className="text-gray-900 mt-0.5">{course.difficulty}</p>
          </div>
          <div>
            <strong>Ore stimate:</strong>{" "}
            <p className="text-gray-900 mt-0.5">{course.estimatedHours} ore</p>
          </div>
          <div>
            <strong>Docente:</strong>{" "}
            <p className="text-gray-900 mt-0.5">{course.teacher}</p>
          </div>
        </div>

        {/* CONTROLLO ACCESSO AI MODULI */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">Moduli del corso</h2>

          {!user ? (
            /* 🎯 CASO 1: UTENTE NON AUTENTICATO (Regola 1) */
            <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center shadow-sm">
              <span className="text-3xl">🔒</span>
              <h3 className="mt-2 text-lg font-bold text-yellow-800">
                Autenticazione Richiesta
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                Per visualizzare le lezioni e accedere ai materiali di questo
                corso devi prima effettuare il login.
              </p>
              <div className="mt-4 inline-block">
                <LoginDialog />
              </div>
            </div>
          ) : !isClassAuthorized ? (
            /* 🎯 CASO 2: LOGGATO MA CLASSE NON ABILITATA */
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6 text-center shadow-sm">
              <span className="text-3xl">🚫</span>
              <h3 className="mt-2 text-lg font-bold text-red-800">
                Accesso Riservato
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Il tuo utente (Classe:{" "}
                <span className="font-bold">{user.class}</span>) non è abilitato
                a questo corso. L'accesso è consentito solo alle classi:{" "}
                <span className="font-bold">
                  {course.allowedClasses?.join(", ")}
                </span>
                .
              </p>
            </div>
          ) : (
            /* CASO 3: AUTORIZZATO -> MOSTRA LEZIONI */
            <div className="mt-6 space-y-6">
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((module) => (
                  <div
                    key={module.id}
                    className="rounded-lg border bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {module.title}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <Link
                            href={`/courses/${slug}/modules/${module.id}/lessons/${lesson.id}`}
                            className="text-blue-600 hover:underline font-medium transition-colors"
                          >
                            {lesson.title}
                          </Link>
                          <span>{lesson.duration} min</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-sm italic text-gray-500">
                  Nessun modulo ancora inserito in questo corso.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
