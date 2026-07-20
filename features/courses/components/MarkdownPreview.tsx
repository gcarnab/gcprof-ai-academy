import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, href, children, ...props }) => {
            // Gestione ancore interne (es: #m0)
            if (href?.startsWith("#")) {
              return (
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault(); // Blocca il router di Next.js
                    const targetId = href.substring(1);
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                  {...props}
                >
                  {children}
                </a>
              );
            }

            // Gestione link esterni (apertura in nuova scheda)
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}