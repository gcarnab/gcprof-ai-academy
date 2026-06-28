/**
 * ============================================================================
 * FILE: courses.ts
 * FEATURE: Courses
 * ----------------------------------------------------------------------------
 * SCOPO
 * Contiene un insieme di dati statici (mock) utilizzati durante lo sviluppo.
 *
 * In futuro questi dati verranno recuperati da Supabase tramite un service
 * dedicato.
 * ============================================================================
 */

import type { Course } from "../types/course";

//import { Course } from "@/features/courses/types/course";


export const courses: Course[] = [
  {
    id: 1,
    title: "HTML & CSS",
    description: "Impara a creare siti web moderni partendo dalle basi.",
    level : "Base",
  },
  {
    id: 2,
    title: "Python",
    description: "Programmazione Python con esempi ed esercizi guidati.",
    level : "Base",
  },
  {
    id: 3,
    title: "AI Definitive Guide",
    description: "Scopri i segreti di un uso corretto dell'AI.",
    level : "Base",
  },
]