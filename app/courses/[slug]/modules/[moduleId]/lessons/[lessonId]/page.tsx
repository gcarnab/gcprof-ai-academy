"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { getLiveCourses } from "@/features/courses/services/courseActions";
import LessonRenderer, { LessonContent } from "@/features/courses/components/lesson/LessonRenderer";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export default function LessonPage() {
  const params = useParams();

  const slug = params?.slug as string;
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;

  const [data, setData] = useState<{ course: any; module: any; lesson: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLessonData() {
      setIsLoading(true);
      const liveCourses = await getLiveCourses();
      
      const course = liveCourses.find((c) => c.slug === slug);
      const module = course?.modules?.find((m: any) => m.id === moduleId);
      const lesson = module?.lessons?.find((l: any) => l.id === lessonId);

      if (course && module && lesson) {
        setData({ course, module, lesson });
      } else {
        setData(null);
      }
      setIsLoading(false);
    }
    if (slug && moduleId && lessonId) {
      loadLessonData();
    }
  }, [slug, moduleId, lessonId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-sm animate-pulse">Caricamento risorsa didattica...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  const { course, module, lesson } = data;

  // ADAPTER PATTERN
  const formattedContents: LessonContent[] = [];

  if (lesson.contentType === "video") {
    formattedContents.push({
      type: "video",
      title: lesson.title,
      url: lesson.youtubeUrl,
    });
  } else if (lesson.contentType === "document") {
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
            <LessonRenderer contents={formattedContents} />
          </div>

        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}