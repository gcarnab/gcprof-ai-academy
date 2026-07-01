"use client";

import { notFound, useParams } from "next/navigation";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import {
  getCourseBySlug,
  getModule,
  getLesson,
} from "@/features/courses/services/courseService";
import LessonRenderer, { LessonContent } from "@/features/courses/components/lesson/LessonRenderer";
//import { useAuth } from "@/features/auth/context/AuthContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { useAuth } from "@/features/auth/core/context/AuthContext";

export default function LessonPage() {
  const params = useParams();
  const { user } = useAuth();

  const slug = params?.slug as string;
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;

  const course = getCourseBySlug(slug, user);
  const module = getModule(slug, moduleId, user);
  const lesson = getLesson(slug, moduleId, lessonId, user);

  if (!course || !module || !lesson) {
    notFound();
  }

  // 🎯 ADAPTER PATTERN: Convertiamo la struttura piatta di Lesson nel formato richiesto da LessonRenderer
  const formattedContents: LessonContent[] = [];

  if (lesson.contentType === "video") {
    formattedContents.push({
      type: "video",
      title: lesson.title,
      url: lesson.youtubeUrl,
    });
  } else if (lesson.contentType === "document") {
    // Nota: Mappiamo "document" sul tipo "file" o "link" supportato dal tuo LessonRenderer
    formattedContents.push({
      type: "file",
      title: lesson.title,
      url: lesson.googleDriveUrl,
    });
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          
          <p className="text-sm text-gray-500">
            {course.title} {" > "} {module.title}
          </p>
          
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            {lesson.title}
          </h1>
          
          <div className="mt-8">
            {/* 🎯 Ora passiamo l'array formattato correttamente. Zero errori TypeScript! */}
            <LessonRenderer contents={formattedContents} />
          </div>

        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}