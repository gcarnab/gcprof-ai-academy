"use client";

import type { Lesson } from "@/features/courses/types/course";

const CONTENT_TYPES: Record<
  string,
  { icon: string; label: string; textStyle: string; badgeStyle: string }
> = {
  video: { icon: "📺", label: "Video YouTube", textStyle: "text-blue-600 hover:text-blue-800", badgeStyle: "text-blue-600 bg-blue-50 border-blue-200" },
  colab: { icon: "🚀", label: "Google Colab", textStyle: "text-emerald-600 hover:text-emerald-800", badgeStyle: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  quiz: { icon: "📝", label: "Quiz di Verifica", textStyle: "text-purple-600 hover:text-purple-800", badgeStyle: "text-purple-600 bg-purple-50 border-purple-200" },
  default: { icon: "📄", label: "Google Drive", textStyle: "text-slate-600 hover:text-slate-800", badgeStyle: "text-slate-500 bg-slate-50 border-slate-200" },
};

interface LessonRowProps {
  lesson: Lesson;
  moduleId: string | number;
  courseSlug: string;
  hasAccess: boolean;
  onNavigate: (path: string) => void;
}

export function LessonRow({
  lesson,
  moduleId,
  courseSlug,
  hasAccess,
  onNavigate,
}: LessonRowProps) {
  const rawType = (lesson.contentType || (lesson as any).content_type) as string;
  const config = CONTENT_TYPES[rawType] || CONTENT_TYPES.default;
  const isPreview = Boolean((lesson as any).is_preview);
  const canAccess = hasAccess || isPreview;

  const targetPath =
    rawType === "quiz"
      ? `/courses/${courseSlug}/modules/${moduleId}/quizzes/${lesson.id}`
      : `/courses/${courseSlug}/modules/${moduleId}/lessons/${lesson.id}`;

  return (
    <li>
      <button
        onClick={() => canAccess && onNavigate(targetPath)}
        disabled={!canAccess}
        className={`w-full flex justify-between items-center text-sm p-3 rounded-xl transition-all ${
          canAccess ? "hover:bg-muted group cursor-pointer" : "opacity-60 cursor-not-allowed bg-muted/20"
        }`}
      >
        <div className={`font-medium text-left flex items-center gap-3 ${canAccess ? config.textStyle : "text-muted-foreground"}`}>
          <span className="text-lg bg-background shadow-sm rounded-md p-1 group-hover:scale-110 transition-transform select-none">
            {canAccess ? config.icon : "🔒"}
          </span>
          <span className={canAccess ? "group-hover:underline underline-offset-4" : ""}>
            {lesson.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isPreview && !hasAccess && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Anteprima
            </span>
          )}
          <span className={`text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border ${config.badgeStyle}`}>
            {config.label}
          </span>
        </div>
      </button>
    </li>
  );
}