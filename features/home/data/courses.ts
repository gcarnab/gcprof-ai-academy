/**
 * ============================================================================
 * DATI DI ESEMPIO
 * ----------------------------------------------------------------------------
 * In questa prima versione i corsi sono statici.
 *
 * In futuro questo file verrà sostituito da una chiamata a Supabase.
 * ============================================================================
 */

export interface Course {
  id: number
  title: string
  description: string
}

export const courses: Course[] = [
  {
    id: 1,
    title: "HTML & CSS",
    description: "Impara a creare siti web moderni partendo dalle basi.",
  },
  {
    id: 2,
    title: "Python",
    description: "Programmazione Python con esempi ed esercizi guidati.",
  },
  {
    id: 3,
    title: "AI Definitive Guide",
    description: "Scopri i segreti di un uso corretto dell'AI.",
  },
]