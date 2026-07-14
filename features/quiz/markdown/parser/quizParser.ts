import matter from "gray-matter";
import { remark } from "remark";
import { ParsedQuiz, ParsedQuizSchema } from "../../validators/quizValidators";

/**
 * Estrattore ricorsivo dei valori testuali dai nodi dell'AST di remark.
 * Garantisce l'estrazione pulita del testo anche in presenza di nodi annidati.
 */
function extractTextFromNode(node: any): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("");
  }
  return "";
}

/**
 * Riceve la stringa grezza di un file Markdown, ne analizza l'albero sintattico (AST),
 * mappa le domande chiuse ed aperte e convalida la struttura tramite lo schema Zod centralizzato.
 */
export async function parseQuizMarkdown(rawMarkdown: string): Promise<ParsedQuiz> {
  // 1. Estrazione del blocco YAML iniziale delimitato da --- e del corpo del testo
  const { data, content } = matter(rawMarkdown);

  // 2. Generazione dell'Abstract Syntax Tree (AST) tramite remark
  const ast = remark.parse(content);
  
  const rawQuestions: any[] = [];
  let currentQuestion: any = null;

  // 3. Scansione lineare dei nodi dell'albero sintattico
  ast.children.forEach((node) => {
    // Intercettazione dell'intestazione di livello 1 (# Q1, # Q2, ..., # OPEN)
    if (node.type === "heading" && node.depth === 1) {
      const headingText = extractTextFromNode(node).trim();
      const is_open = headingText.toUpperCase() === "OPEN";

      currentQuestion = {
        text: "",
        type: is_open ? "open_ended" : "multiple_choice",
        order_index: rawQuestions.length + 1,
        points: is_open ? 6.00 : 0.50,
        options: is_open ? undefined : [],
      };
      
      rawQuestions.push(currentQuestion);
    } 
    // Intercettazione del testo della domanda
    else if (node.type === "paragraph" && currentQuestion && !currentQuestion.text) {
      currentQuestion.text = extractTextFromNode(node).trim();
    } 
    // Intercettazione delle opzioni della domanda chiusa
    else if (node.type === "list" && currentQuestion && currentQuestion.type === "multiple_choice") {
      node.children.forEach((listItem: any) => {
        const paragraphNode = listItem.children.find((c: any) => c.type === "paragraph");
        let optionText = paragraphNode ? extractTextFromNode(paragraphNode).trim() : "";

        // 🎯 FALLBACK STRINGA: Se remark non espone listItem.checked, leggiamo il testo grezzo
        let isChecked = !!listItem.checked;
        if (!isChecked && /^\[x\]/i.test(optionText)) {
          isChecked = true;
        }

        // Pulizia dei residui di formattazione in ordine: prima il tag [ ] o [x], poi la lettera A) B) C) D)
        optionText = optionText
          .replace(/^\[[ xX]\]\s*/, "")
          .replace(/^([A-Za-z]\)\s*)/, "")
          .trim();

        if (optionText && currentQuestion.options) {
          currentQuestion.options.push({
            text: optionText,
            is_correct: isChecked,
          });
        }
      });
    }
  });

  // 4. Assemblaggio del payload DTO grezzo
  const rawQuizPayload = {
    metadata: data,
    questions: rawQuestions,
  };

  // 5. Validazione atomica e globale tramite Zod
  const validatedQuiz: ParsedQuiz = ParsedQuizSchema.parse(rawQuizPayload);

  return validatedQuiz;
}