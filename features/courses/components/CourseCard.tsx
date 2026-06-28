/**
 * ============================================================================
 * COMPONENTE: CourseCard
 * ----------------------------------------------------------------------------
 * Card riutilizzabile per la visualizzazione di un singolo corso.
 *
 * RUOLO:
 * - Mostrare informazioni base di un corso
 *
 * ATTUALMENTE:
 * - Titolo corso
 * - Descrizione breve
 * - Link alla pagina corso
 *
 * FUTURO:
 * - Immagine corso
 * - Badge (novità, popolare)
 * - Stato progresso utente
 *
 * NOTA ARCHITETTURALE:
 * Questo è un componente UI puro e RIUTILIZZABILE.
 * NON deve contenere logica dati.
 * ============================================================================
 */

import Link from "next/link";
import { Course } from "../types/course";
import Card from "@/shared/ui/Card";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: Course;
}

/**
 * Card riutilizzabile per un corso.
 * UI pura: nessuna logica business, riceve i dati via props.
 * Ora è un Link verso la pagina di dettaglio del corso.
 */
export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card>
      <h3 className="text-xl font-semibold">{course.title}</h3>

      <p className="mt-4 text-gray-600">{course.description}</p>

      <Button className="mt-6">Scopri il corso</Button>
    </Card>
  );
}
