import matter from "gray-matter";
import { remark } from "remark";

import {
  ParsedQuiz,
  ParsedQuizSchema,
} from "../../validators/quizValidators";

/**
 * Estrattore ricorsivo dei valori testuali dai nodi dell'AST di remark.
 *
 * Garantisce l'estrazione pulita del testo anche in presenza
 * di nodi annidati.
 */
function extractTextFromNode(node: any): string {
  if (!node) return "";

  if (typeof node.value === "string") {
    return node.value;
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("");
  }

  return "";
}

/**
 * Analizza il testo grezzo di una singola opzione Markdown.
 *
 * Supporta:
 * - [ ] Opzione
 * - [x] Opzione
 * - [X] Opzione
 *
 * e, per compatibilità con eventuali contenuti precedenti:
 * - **[** **]** Opzione
 * - **[**x**]** Opzione
 *
 * Restituisce il testo pulito e lo stato della risposta.
 */
function parseOptionText(
  rawText: string,
  checked: boolean | null | undefined
): {
  text: string;
  is_correct: boolean;
} | null {
  let optionText = rawText.trim();

  // Primo livello: utilizza l'eventuale valore checked
  // esposto direttamente dal nodo AST di remark.
  let isChecked = checked === true;

  /**
   * Formato Markdown standard:
   *
   * [ ] testo
   * [x] testo
   * [X] testo
   *
   * Senza remark-gfm, remark può lasciare la checkbox
   * all'interno del testo del paragraph. La riconosciamo
   * quindi esplicitamente come fallback.
   */
  const standardCheckboxMatch = optionText.match(
    /^\[\s*([xX]?)\s*\]\s*/
  );

  if (standardCheckboxMatch) {
    if (standardCheckboxMatch[1]) {
      isChecked = true;
    }

    optionText = optionText.replace(
      /^\[\s*[xX]?\s*\]\s*/,
      ""
    );
  }

  /**
   * Compatibilità con l'eventuale formato trasformato
   * presente in versioni precedenti del parser/contenuto.
   */
  const legacyCheckboxMatch = optionText.match(
    /^\*\*\[\*\*([xX]?)\*\*\]\*\*\s*/
  );

  if (legacyCheckboxMatch) {
    if (legacyCheckboxMatch[1]) {
      isChecked = true;
    }

    optionText = optionText.replace(
      /^\*\*\[\*\*[xX]?\*\*\]\*\*\s*/,
      ""
    );
  }

  /**
   * Rimozione opzionale del prefisso:
   *
   * A) testo
   * B) testo
   * C) testo
   * D) testo
   */
  optionText = optionText
    .replace(/^([A-Za-z]\)\s*)/, "")
    .trim();

  if (!optionText) {
    return null;
  }

  return {
    text: optionText,
    is_correct: isChecked,
  };
}

/**
 * Riceve la stringa grezza di un file Markdown,
 * ne analizza l'albero sintattico (AST),
 * mappa le domande chiuse ed aperte
 * e convalida la struttura tramite lo schema Zod centralizzato.
 */
export async function parseQuizMarkdown(
  rawMarkdown: string
): Promise<ParsedQuiz> {
  // 1. Estrazione del blocco YAML iniziale delimitato
  //    da --- e del corpo del testo.
  const { data, content } = matter(rawMarkdown);

  // 2. Generazione dell'Abstract Syntax Tree (AST)
  //    tramite remark.
  //
  //    NON viene utilizzato remark-gfm o qualsiasi altro
  //    pacchetto aggiuntivo.
  const ast = remark.parse(content);

  const rawQuestions: any[] = [];
  let currentQuestion: any = null;

  // 3. Scansione lineare dei nodi dell'albero sintattico.
  ast.children.forEach((node: any) => {
    /**
     * Intercettazione dell'intestazione di livello 1:
     *
     * # Q1
     * # Q2
     * ...
     * # Q8
     * # OPEN
     */
    if (node.type === "heading" && node.depth === 1) {
      const headingText = extractTextFromNode(node).trim();

      const is_open =
        headingText.toUpperCase() === "OPEN";

      currentQuestion = {
        text: "",
        type: is_open
          ? "open_ended"
          : "multiple_choice",
        order_index: rawQuestions.length + 1,
        points: is_open ? 6.00 : 0.50,
        options: is_open ? undefined : [],
      };

      rawQuestions.push(currentQuestion);

      return;
    }

    /**
     * Intercettazione del testo della domanda.
     *
     * Il primo paragraph successivo all'intestazione
     * viene considerato il testo della domanda.
     */
    if (
      node.type === "paragraph" &&
      currentQuestion &&
      !currentQuestion.text
    ) {
      currentQuestion.text =
        extractTextFromNode(node).trim();

      return;
    }

    /**
     * Intercettazione delle opzioni della domanda chiusa.
     */
    if (
      node.type === "list" &&
      currentQuestion &&
      currentQuestion.type === "multiple_choice"
    ) {
      node.children.forEach((listItem: any) => {
        const paragraphNode =
          listItem.children?.find(
            (child: any) =>
              child.type === "paragraph"
          );

        const rawOptionText = paragraphNode
          ? extractTextFromNode(paragraphNode).trim()
          : "";

        if (!rawOptionText) {
          return;
        }

        /**
         * remark, senza remark-gfm, normalmente non
         * garantisce listItem.checked per le task list.
         *
         * Per questo passiamo comunque il valore,
         * ma parseOptionText riconosce direttamente
         * anche [x] / [ ] nel testo.
         */
        const parsedOption = parseOptionText(
          rawOptionText,
          listItem.checked
        );

        if (
          parsedOption &&
          currentQuestion.options
        ) {
          currentQuestion.options.push({
            text: parsedOption.text,
            is_correct: parsedOption.is_correct,
          });
        }
      });
    }
  });

  /**
   * 4. Normalizzazione dei metadati YAML.
   *
   * Supporto sia camelCase sia snake_case,
   * mantenendo i fallback già presenti.
   */
  const normalizedMetadata = {
    title: data.title ?? "",

    description: data.description ?? "",

    status: data.status ?? "draft",

    penalty_enabled:
      data.penalty_enabled ??
      data.penaltyEnabled ??
      false,

    negative_mark: Number(
      data.negative_mark ??
        data.negativeMark ??
        0.25
    ),

    courseId:
      data.courseId ??
      data.course_id ??
      undefined,

    moduleId:
      data.moduleId ??
      data.module_id ??
      undefined,

    lessonId:
      data.lessonId ??
      data.lesson_id ??
      undefined,
  };

  /**
   * 5. Costruzione del payload grezzo.
   */
  const rawQuizPayload = {
    metadata: normalizedMetadata,
    questions: rawQuestions,
  };

  /**
   * 6. Validazione atomica tramite Zod.
   *
   * ParsedQuizSchema verifica:
   * - esattamente 8 domande chiuse
   * - esattamente 1 domanda aperta
   * - esattamente 4 opzioni per domanda chiusa
   * - esattamente 1 risposta corretta
   * - 0.50 punti per ogni domanda chiusa
   * - 6.00 punti per la domanda aperta
   * - validità dei metadati
   */
  const validatedQuiz: ParsedQuiz =
    ParsedQuizSchema.parse(rawQuizPayload);

  return validatedQuiz;
}
