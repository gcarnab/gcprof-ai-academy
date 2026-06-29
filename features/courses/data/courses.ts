import { Course } from "../types/course";

export const courses: Course[] = [
    {
    "id": 1,
    "slug": "python-base",
    "title": "Python base",
    "description": "Corso base per studenti del primo anno.",
    "category": "Programmazione",
    "difficulty": "Facile",
    "teacher": "Prof. Carnabuci",
    "estimatedHours": 30,
    "published": true,
    "coverImage": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    "modules": [],
    "allowedClasses": [
      "1A",
      "1B",
      "1C"
    ]
  },
  {
    "id": 2,
    "slug": "python-intermedio",
    "title": "Python intermedio",
    "description": "Corso per studenti del secondo anno.",
    "category": "Programmazione",
    "difficulty": "Media",
    "teacher": "Prof. Carnabuci",
    "estimatedHours": 30,
    "published": true,
    "coverImage": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    "modules": [],
    "allowedClasses": [
      "2A",
      "2B",
      "2C"
    ]
  },
  {
    "id": 3,
    "title": "Blockchain base",
    "slug": "blockchain-base",
    "description": "Blockchain base",
    "category": "Blockchain",
    "difficulty": "Facile",
    "teacher": "Prof. G. Carnabuci",
    "estimatedHours": 20,
    "published": true,
    "coverImage": "https://png.pngtree.com/png-vector/20230112/ourmid/pngtree-blockchain-vector-transparent-image-png-image_6560354.png",
    "allowedClasses": [],
    "modules": []
  }
];