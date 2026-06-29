/**
 * ============================================================================
 * MOCK DATA: Courses
 * ----------------------------------------------------------------------------
 * Dataset temporaneo in attesa di Supabase.
 * ============================================================================
 */

import { Course } from "../types/course";

export const courses: Course[] = [

    {
        id: 1,
        slug: "python-base",
        title: "Python Base",
        description: "Impara Python da zero con esempi pratici e semplici.",
        category: "Programmazione",
        difficulty: "Base",
        teacher: "Giuseppe Carnabuci",
        estimatedHours: 20,
        modulesCount: 5,
        lessonsCount: 25,
        coverImage: "/courses/python.jpg",
        published: true,
    },

    {
        id: 2,
        slug: "javascript-moderno",
        title: "JavaScript Moderno",
        description: "Il linguaggio del web moderno spiegato passo passo.",
        category: "Web",
        difficulty: "Base",
        teacher: "Giuseppe Carnabuci",
        estimatedHours: 25,
        modulesCount: 6,
        lessonsCount: 30,
        coverImage: "/courses/javascript.jpg",
        published: true,
    },

    {
        id: 3,
        slug: "react-fundamentals",
        title: "React Fundamentals",
        description: "Componenti, props, state e architettura React moderna.",
        category: "Web",
        difficulty: "Intermedio",
        teacher: "Giuseppe Carnabuci",
        estimatedHours: 30,
        modulesCount: 7,
        lessonsCount: 35,
        coverImage: "/courses/react.jpg",
        published: true,
    },

    {
        id: 4,
        slug: "database-design",
        title: "Database Design",
        description: "Progettazione database relazionali e SQL pratico.",
        category: "Database",
        difficulty: "Intermedio",
        teacher: "Giuseppe Carnabuci",
        estimatedHours: 28,
        modulesCount: 6,
        lessonsCount: 32,
        coverImage: "/courses/database.jpg",
        published: true,
    },

    {
        id: 5,
        slug: "ai-introduction",
        title: "Introduzione all'AI",
        description: "Fondamenti di Intelligenza Artificiale e Machine Learning.",
        category: "AI",
        difficulty: "Avanzato",
        teacher: "Giuseppe Carnabuci",
        estimatedHours: 40,
        modulesCount: 8,
        lessonsCount: 45,
        coverImage: "/courses/ai.jpg",
        published: true,
    },

];