import { Course } from "../types/course";

export const courses: Course[] = [
  {
    id: 1,
    slug: "programmazione-classi-prime",
    title: "Introduzione all'Informatica",
    description: "Corso base per studenti del primo anno.",
    category: "Informatica",
    difficulty: "Facile",
    teacher: "Prof. Carnabuci",
    estimatedHours: 20,
    published: true,
    modules: [],
    allowedClasses: ["1A", "1B"] // 🎯 Solo user1 (che ha "1A,1B") potrà vederlo e accedervi!
  },
  {
    id: 2,
    slug: "sistemi-classi-seconde",
    title: "Sistemi Operativi",
    description: "Corso per studenti del secondo anno.",
    category: "Sistemi",
    difficulty: "Media",
    teacher: "Prof. Carnabuci",
    estimatedHours: 30,
    published: true,
    modules: [],
    allowedClasses: ["2A", "2B"] // 🎯 Solo user2 potrà vederlo!
  }
];