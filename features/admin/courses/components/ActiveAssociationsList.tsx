"use client";

import { dissociateCourseFromClass } from "@/features/courses/services/courseActions";
import { useState } from "react";


interface Association {
  course_id: string;
  course_title: string;
  class_id: string;
  class_name: string;
}

interface ActiveAssociationsListProps {
  associations: Association[];
  onRefresh: () => void; // Funzione per ricaricare i dati dopo la cancellazione
}

export function ActiveAssociationsList({ associations, onRefresh }: ActiveAssociationsListProps) {
  const [isRemoving, setIsRemoving] = useState<string | null>(null); // Salva la chiave composta 'courseId-classId'

  const handleDissociate = async (courseId: string, classId: string) => {
    const confirmId = `${courseId}-${classId}`;
    if (!confirm("Sei sicuro di voler dissociare questo corso da questa classe? Gli studenti perderanno l'accesso.") ) return;

    setIsRemoving(confirmId);
    const result = await dissociateCourseFromClass(courseId, classId);
    
    if (result.success) {
      onRefresh(); // Ricarica la lista aggiornata dalla dashboard
    } else {
      alert(result.error);
    }
    setIsRemoving(null);
  };

  if (associations.length === 0) {
    return <p className="text-sm text-gray-500 italic">Nessun corso attualmente associato alle classi.</p>;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">Classe</th>
            <th className="px-6 py-3">Corso Assegnato</th>
            <th className="px-6 py-3 text-right">Azione</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600">
          {associations.map((assoc) => {
            const currentKey = `${assoc.course_id}-${assoc.class_id}`;
            return (
              <tr key={currentKey} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{assoc.class_name}</td>
                <td className="px-6 py-4">{assoc.course_title}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDissociate(assoc.course_id, assoc.class_id)}
                    disabled={isRemoving === currentKey}
                    className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-600/10 hover:bg-red-100 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isRemoving === currentKey ? "Rimozione..." : "Dissocia"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}