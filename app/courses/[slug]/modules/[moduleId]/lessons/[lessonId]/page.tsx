"use client";

import { notFound, useParams } from "next/navigation";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import {
  getCourseBySlug,
  getModule,
  getLesson,
} from "@/features/courses/services/courseService";
import LessonRenderer from "@/features/courses/components/lesson/LessonRenderer";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

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
            <LessonRenderer contents={lesson.contents} />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
