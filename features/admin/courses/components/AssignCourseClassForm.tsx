"use client";

import { useState } from "react";
import { assignCourseClassAction } from "@/features/admin/courses/actions/assignCourseClassAction";

interface Course {
  id: string;
  title: string;
}

interface Class {
  id: string;
  name: string;
}

interface Props {
  courses: Course[];
  classes: Class[];
}

export default function AssignCourseClassForm({ courses, classes }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await assignCourseClassAction(formData);

    if (result.success) {
      setMessage({ text: "Corso assegnato alla classe con successo! Gli studenti sono stati iscritti.", type: "success" });
      (e.target as HTMLFormElement).reset(); // Resetta il form
    } else {
      setMessage({ text: result.error || "Errore sconosciuto", type: "error" });
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Assegna Corso a Classe</h2>
        <p className="text-sm text-gray-500">
          Associa un corso esistente a una classe. Gli studenti abilitati verranno iscritti automaticamente.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="course_id" className="block text-sm font-medium text-gray-700 mb-1">
            Seleziona Corso
          </label>
          <select
            name="course_id"
            id="course_id"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">-- Scegli un corso --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="class_id" className="block text-sm font-medium text-gray-700 mb-1">
            Seleziona Classe
          </label>
          <select
            name="class_id"
            id="class_id"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">-- Scegli una classe --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Assegnazione in corso..." : "Assegna Corso"}
        </button>

        {message && (
          <div
            className={`p-3 rounded-md text-sm font-medium ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}