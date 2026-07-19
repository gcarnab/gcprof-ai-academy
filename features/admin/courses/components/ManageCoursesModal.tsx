"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { syncUserCoursesAction } from "../../actions/approveEnrollmentAction";

// Definisci i tipi in base ai tuoi dati reali
type Course = { id: string; title: string };

interface ManageCoursesModalProps {
  profileId: string;
  studentName: string;
  allCourses: Course[];
  initialSelectedCourseIds: string[];
  onClose: () => void;
}

export default function ManageCoursesModal({
  profileId,
  studentName,
  allCourses,
  initialSelectedCourseIds,
  onClose,
}: ManageCoursesModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Stato locale per le spunte
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedCourseIds);

  const toggleCourse = (courseId: string) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId) // Rimuove se già presente
        : [...prev, courseId] // Aggiunge se non presente
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await syncUserCoursesAction(profileId, selectedIds);
      if (result.success) {
        router.refresh(); // Aggiorna i dati mostrati nella tabella genitore
        onClose(); // Chiude il modale
      } else {
        alert("Errore durante il salvataggio: " + result.error);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Gestisci Corsi</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Modifica i corsi assegnati a <strong>{studentName}</strong>
        </p>

        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
          {allCourses.map((course) => (
            <label key={course.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.includes(course.id)}
                onChange={() => toggleCourse(course.id)}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
              />
              <span className="text-gray-800 dark:text-gray-200">{course.title}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
          >
            Annulla
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50"
          >
            {isPending ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>
      </div>
    </div>
  );
}