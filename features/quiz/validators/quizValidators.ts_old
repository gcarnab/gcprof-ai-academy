import { z } from "zod";

// 1. Validazione del FrontMatter YAML (Rimosso max_score poiché costante di dominio)
export const QuizFrontMatterSchema = z.object({
  title: z.string().min(3, "Il titolo del quiz deve contenere almeno 3 caratteri"),
  description: z.string().optional(),
  status: z.enum(["draft", "active"]).default("draft"),
  penalty_enabled: z.boolean().default(false),
  negative_mark: z.number().nonnegative().default(0.25),
});

// 2. Validazione della singola opzione per le risposte chiuse
export const QuizOptionSchema = z.object({
  text: z.string().min(1, "Il testo dell'opzione non può essere vuoto"),
  is_correct: z.boolean(),
});

// 3. Validazione della singola domanda con controlli contestuali (superRefine)
export const ParsedQuestionSchema = z
  .object({
    text: z.string().min(5, "Il testo della domanda deve contenere almeno 5 caratteri"),
    type: z.enum(["multiple_choice", "open_ended"]),
    order_index: z.number().int().positive("L'indice d'ordine deve essere un intero positivo"),
    points: z.number().positive("Il punteggio della domanda deve essere maggiore di zero"),
    options: z
      .array(QuizOptionSchema)
      .length(4, "Ogni domanda chiusa deve avere esattamente 4 opzioni")
      .optional(),
  })
  .superRefine((question, ctx) => {
    // Vincoli per le domande a risposta multipla
    if (question.type === "multiple_choice") {
      const correct = question.options?.filter((o) => o.is_correct).length ?? 0;
      if (correct !== 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["options"],
          message: `La domanda chiusa (Ordine: ${question.order_index}) deve avere esattamente una sola risposta corretta. Rilevate: ${correct}`,
        });
      }
    }

    // Vincoli per la domanda aperta
    if (question.type === "open_ended") {
      if (question.options && question.options.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["options"],
          message: "La domanda aperta non deve contenere alcuna opzione di risposta.",
        });
      }
    }
  });

// 4. Schema Globale del Quiz (Controlli aggregati su tutto il pacchetto dati)
export const ParsedQuizSchema = z
  .object({
    metadata: QuizFrontMatterSchema,
    questions: z.array(ParsedQuestionSchema),
  })
  .superRefine((quiz, ctx) => {
    const closedQuestions = quiz.questions.filter((q) => q.type === "multiple_choice");
    const openQuestions = quiz.questions.filter((q) => q.type === "open_ended");

    // Vincolo sul numero esatto di domande chiuse
    if (closedQuestions.length !== 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["questions"],
        message: `Il quiz deve contenere esattamente 8 domande chiuse. Rilevate: ${closedQuestions.length}`,
      });
    }

    // Vincolo sul numero esatto di domande aperte
    if (openQuestions.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["questions"],
        message: `Il quiz deve contenere esattamente 1 domanda aperta. Rilevate: ${openQuestions.length}`,
      });
    }

    // Verifica la consistenza dei punteggi totali assegnati (4 punti chiuse + 6 punti aperta = 10 totali)
    const totalClosedPoints = closedQuestions.reduce((acc, q) => acc + q.points, 0);
    const totalOpenPoints = openQuestions.reduce((acc, q) => acc + q.points, 0);

    if (totalClosedPoints !== 4.00) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["questions"],
        message: `La somma dei punti delle domande chiuse deve essere esattamente 4.00. Rilevato: ${totalClosedPoints}`,
      });
    }

    if (totalOpenPoints !== 6.00) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["questions"],
        message: `Il punteggio della domanda aperta deve essere esattamente 6.00. Rilevato: ${totalOpenPoints}`,
      });
    }
  });

// Esportazione dei Tipi inferiti da Zod per l'utilizzo nel dominio e nell'applicazione
export type QuizFrontMatter = z.infer<typeof QuizFrontMatterSchema>;
export type ParsedQuestion = z.infer<typeof ParsedQuestionSchema>;
export type ParsedQuiz = z.infer<typeof ParsedQuizSchema>;