/**
 * ============================================================================
 * MOCK DATABASE: Courses
 * ----------------------------------------------------------------------------
 * Questo file rappresenta il "database" temporaneo dell'applicazione.
 *
 * FILOSOFIA
 * ----------------------------------------------------------------------------
 * Fino all'introduzione di Supabase, TUTTI i dati dell'LMS sono contenuti qui.
 *
 * Gerarchia dei dati:
 *
 * Course
 * └── Modules
 *      └── Lessons
 *           └── Contents
 *
 * In questo modo abbiamo:
 *
 * ✔ una sola sorgente dati
 * ✔ codice semplice
 * ✔ architettura KISS
 * ✔ facile migrazione futura a Supabase
 * ============================================================================
 */

import { Course } from "../types/course";

export const courses: Course[] = [
  /**
   * ========================================================================
   * CORSO 1
   * ========================================================================
   */

  {
    id: 1,

    slug: "python-base",

    title: "Python Base",

    description: "Impara Python da zero con esempi pratici e semplici.",

    category: "Programmazione",

    difficulty: "Base",

    teacher: "Giuseppe Carnabuci",

    estimatedHours: 20,

    coverImage: "/courses/python.jpg",

    published: true,

    modules: [
      /**
       * --------------------------------------------------------------------
       * MODULO 1
       * --------------------------------------------------------------------
       */

      {
        id: "m1",

        title: "Introduzione a Python",

        lessons: [
          /**
           * --------------------------------------------------------------
           * LEZIONE 1
           * --------------------------------------------------------------
           */

          {
            id: "l1",

            title: "Cos'è Python",

            duration: 20,

            contents: [
              {
                type: "video",

                title: "Video introduttivo",

                url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
              },

              {
                type: "text",

                title: "Introduzione",

                content:
                  "Python è un linguaggio di programmazione interpretato, semplice da imparare e molto utilizzato nel mondo dell'informatica, dell'Intelligenza Artificiale e dell'automazione.",
              },

              {
                type: "file",

                title: "Slide della lezione",

                url: "https://drive.google.com/file/d/INSERISCI_ID/view",
              },

              {
                type: "link",

                title: "Sito ufficiale Python",

                url: "https://www.python.org",
              },
            ],
          },

          /**
           * --------------------------------------------------------------
           * LEZIONE 2
           * --------------------------------------------------------------
           */

          {
            id: "l2",

            title: "Installazione di Python",

            duration: 15,

            contents: [
              {
                type: "text",

                title: "Installazione",

                content:
                  "In questa lezione vedremo come installare Python e verificare il corretto funzionamento dell'ambiente di sviluppo.",
              },
            ],
          },
        ],
      },
    ],
  },

  /**
   * ========================================================================
   * CORSO 2
   * ========================================================================
   */

  {
    id: 2,

    slug: "javascript-moderno",

    title: "JavaScript Moderno",

    description: "Il linguaggio del web moderno spiegato passo passo.",

    category: "Web",

    difficulty: "Base",

    teacher: "Giuseppe Carnabuci",

    estimatedHours: 25,

    coverImage: "/courses/javascript.jpg",

    published: true,

    modules: [],
  },

  /**
   * ========================================================================
   * CORSO 3
   * ========================================================================
   */

  {
    id: 3,

    slug: "react-fundamentals",

    title: "React Fundamentals",

    description: "Componenti, props, state e architettura React moderna.",

    category: "Web",

    difficulty: "Intermedio",

    teacher: "Giuseppe Carnabuci",

    estimatedHours: 30,

    coverImage: "/courses/react.jpg",

    published: true,

    modules: [],
  },

  /**
   * ========================================================================
   * CORSO 4
   * ========================================================================
   */

  {
    id: 4,

    slug: "database-design",

    title: "Database Design",

    description: "Progettazione database relazionali e SQL pratico.",

    category: "Database",

    difficulty: "Intermedio",

    teacher: "Giuseppe Carnabuci",

    estimatedHours: 28,

    coverImage: "/courses/database.jpg",

    published: true,

    modules: [],
  },

  /**
   * ========================================================================
   * CORSO 5
   * ========================================================================
   */

  {
    id: 5,

    slug: "ai-introduction",

    title: "Introduzione all'AI",

    description: "Fondamenti di Intelligenza Artificiale e Machine Learning.",

    category: "AI",

    difficulty: "Avanzato",

    teacher: "Giuseppe Carnabuci",

    estimatedHours: 40,

    coverImage: "/courses/ai.jpg",

    published: true,

    modules: [],
  },
];
