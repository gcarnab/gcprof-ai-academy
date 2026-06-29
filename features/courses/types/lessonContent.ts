/**
 * ============================================================================
 * TYPE: Lesson Content
 * ----------------------------------------------------------------------------
 * Definisce la struttura dei contenuti di una lezione.
 *
 * Ogni lezione può contenere più blocchi:
 *
 * - video YouTube
 * - testo
 * - file Google Drive
 * - link esterni
 *
 * La UI visualizzerà ogni blocco in modo diverso.
 * ============================================================================
 */

/**
 * Tipi di contenuto supportati.
 */
export type LessonContentType =
  | "video"
  | "text"
  | "file"
  | "link";

/**
 * Singolo blocco di contenuto.
 */
export interface LessonContent {

  /**
   * Tipo del blocco.
   */
  type: LessonContentType;

  /**
   * Titolo visualizzato nella UI.
   */
  title?: string;

  /**
   * URL del contenuto.
   *
   * Utilizzato per:
   * - YouTube
   * - Google Drive
   * - Link esterni
   */
  url?: string;

  /**
   * Testo della lezione.
   */
  content?: string;
}

/**
 * Contenuto completo di una lezione.
 */
export interface LessonData {

  courseSlug: string;

  moduleId: string;

  lessonId: string;

  title: string;

  contents: LessonContent[];
}