/**
 * L'UNICA sorgente di verità per le tipologie del Knowledge Hub.
 * Modifica questo array per aggiungere o rimuovere categorie ovunque.
 */
export const RESOURCE_TYPES = [
  "AI",
  "Blockchain",  
  "Didattica",
  "Finance",
  "Programming",
  "Video",
] as const;

/**
 * Tipo TypeScript auto-generato dall'array soprastante.
 * Diventa l'unione letterale: "Documentazione" | "Video" | ...
 */
export type ResourceType = typeof RESOURCE_TYPES[number];

/**
 * Varianti grafiche compatibili con il componente Badge di shadcn/ui.
 */
export type ResourceBadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline";

/**
 * Modello dati principale di una risorsa del Knowledge Hub.
 */
export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  provider: string | null;
  type: ResourceType;
  typeVariant: ResourceBadgeVariant;
  rating: number | null;
  tags: string[];
  language: string;
}