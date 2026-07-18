import * as z from "zod";

export const resourceSchema = z.object({
  title: z.string().min(3, "Il titolo deve contenere almeno 3 caratteri."),
  description: z.string().min(10, "La descrizione deve contenere almeno 10 caratteri."),
  url: z.string().url("Inserisci un URL valido (es. https://...)."),
  type: z.string().min(1, "Seleziona la tipologia di risorsa."),
  language: z.string().min(2, "Inserisci la lingua (es. IT, EN).").max(2),
  tags: z.string().optional(),
  
  // Trasforma la stringa vuota del form in undefined rendendo il campo opzionale
  provider: z.string()
    .optional()
    .transform(val => val === "" ? undefined : val),
    
  // Permette al rating di essere indefinito o nullo
  rating: z.number()
    .min(1)
    .max(5)
    .optional()
    .nullable(),
});

export type ResourceFormValues = z.infer<typeof resourceSchema>;