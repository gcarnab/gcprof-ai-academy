import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content) return null;

  // Pulizia profonda per evitare che i caratteri invisibili del DB rompano la prima riga
  const cleanedContent = content
    .replace(/^\uFEFF/, "") // Rimuove il BOM invisibile
    .trim()                 // Rimuove spazi/invii iniziali e finali
    .replace(/\\n/g, "\n"); // Converte eventuali stringhe "\n" in veri a capo

  // Forza lo spazio dopo i cancelletti (#TITOLO -> # TITOLO)
  const sanitizedContent = cleanedContent.replace(/^(#{1,6})([^\s#])/gm, "$1 $2");

  return (
    <div className="prose prose-slate max-w-none dark:prose-invert 
                    prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-base prose-li:text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}