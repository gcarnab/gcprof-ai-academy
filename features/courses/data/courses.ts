import { Course } from "../types/course";

export const courses: Course[] = [
  {
    id: 1782803208645,
    title: "Informatica 1°",
    slug: "info1",
    description: "Corso per gli studenti della classe prima",
    category: "Informatica",
    difficulty: "Facile",
    teacher: "Prof. G. Carnabuci",
    estimatedHours: 50,
    coverImage: "/courses/gcprof-ai-academy_logo_info_01.png",
    published: true,
    allowedClasses: ["1A", "1B", "1C"],
    modules: [
      {
        id: "mod-1782803103468",
        title: "Guida didattica",
        lessons: [
          {
            id: "les-1782803128392",
            title: "Guida didattica",
            duration: 15,
            contentType: "document",
            googleDriveUrl:
              "https://docs.google.com/document/d/1C6E-r8kusgvMhoRriN78nJ6E6K0rTCGJrLa734vGAvY/edit?usp=sharing",
          },
        ],
      },
      {
        id: "mod-1782803155679",
        title: "Google Sheets",
        lessons: [
          {
            id: "les-1782803203834",
            title: "Sheets Tutorial",
            duration: 15,
            contentType: "document",
            googleDriveUrl:
              "https://docs.google.com/spreadsheets/d/1ZYh58cZHtJOJWEX1_HyjqgqvVIojHyDTBBRqU2CAv6M/edit?usp=sharing",
          },
        ],
      },
      {
        id: "mod-1782803731277",
        title: "Video",
        lessons: [
          {
            id: "les-1782803744829",
            title: "GOOGLE FOGLI tutorial 1: Le basi di Google Sheets e differenze da Excel",
            duration: 15,
            contentType: "video",
            youtubeUrl: "https://youtu.be/DVi2dTn6nTc?si=CMTvhHQKdjfADRN4",
          },
          {
            id: "les-1782804320328",
            title: "GOOGLE FOGLI tutorial 2: Sintassi e formule aritmetiche in Google Sheets",
            duration: 15,
            contentType: "video",
            youtubeUrl: "https://youtu.be/hTpOAIHYvvc?si=sBI7sKTcGEV0AlkA",
          },
          {
            id: "les-1782804376751",
            title:
              "GOOGLE FOGLI tutorial 3: Selezionare e gestire gli intervalli in Google Sheets",
            duration: 15,
            contentType: "video",
            youtubeUrl: "https://youtu.be/iUeB2vHHJL4?si=9zGL0R0Mf8JJ_GUW",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "python-intermedio",
    title: "Python intermedio",
    description: "Corso per studenti del secondo anno.",
    category: "Programmazione",
    difficulty: "Media",
    teacher: "Prof. Carnabuci",
    estimatedHours: 30,
    published: true,
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",

    allowedClasses: ["2A", "2B", "2C"],
    modules: [
      {
        id: "1",
        title: "Intro",
        lessons: [
          {
            id: "1",
            title: "video",
            duration: 15,
            contentType: "video",
            youtubeUrl: "https://youtu.be/QhcNQmfnwmk?si=YgT3JSIJiTxtL-xH",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Blockchain base",
    slug: "blockchain-base",
    description: "Blockchain base",
    category: "Blockchain",
    difficulty: "Facile",
    teacher: "Prof. G. Carnabuci",
    estimatedHours: 20,
    published: true,
    coverImage:
      "https://png.pngtree.com/png-vector/20230112/ourmid/pngtree-blockchain-vector-transparent-image-png-image_6560354.png",
    allowedClasses: [],
    modules: [
      {
        id: "1",
        title: "Intro",
        lessons: [
          {
            id: "1",
            title: "video",
            duration: 15,
            contentType: "video",
            youtubeUrl: "https://youtu.be/QhcNQmfnwmk?si=YgT3JSIJiTxtL-xH",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Blockchain Intermedio",
    slug: "blockchain-intermedio",
    description: "Blockchain Intermedio",
    category: "Blockchain",
    difficulty: "Intermedio",
    teacher: "Prof. G. Carnabuci",
    estimatedHours: 20,
    coverImage:
      "https://png.pngtree.com/png-vector/20230112/ourmid/pngtree-blockchain-vector-transparent-image-png-image_6560354.png",
    published: true,
    allowedClasses: [],
    modules: [
      {
        id: "1",
        title: "Intro",
        lessons: [
          {
            id: "1",
            title: "video",
            duration: 15,
            contentType: "video",
            youtubeUrl: "https://youtu.be/QhcNQmfnwmk?si=YgT3JSIJiTxtL-xH",
          },
        ],
      },
    ],
  },
];
