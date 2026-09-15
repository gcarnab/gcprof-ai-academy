"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface PrivacyMarkdownRendererProps {
  content: string;
}

export function PrivacyMarkdownRenderer({
  content,
}: PrivacyMarkdownRendererProps) {
  if (!content) return null;

  const cleanedContent = content
    .replace(/^\uFEFF/, "")
    .trim()
    .replace(/\\n/g, "\n");

  const sanitizedContent = cleanedContent.replace(
    /^(#{1,6})([^\s#])/gm,
    "$1 $2"
  );

  return (
    <div
      className="
        prose prose-slate max-w-none dark:prose-invert
        prose-headings:font-bold
        prose-h1:text-3xl
        prose-h2:text-2xl
        prose-h3:text-xl
        prose-p:text-base
        prose-li:text-base
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ href, children, ...props }) => {
            if (href?.startsWith("#")) {
              return (
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();

                    const targetId = href.substring(1);
                    const element = document.getElementById(targetId);

                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="cursor-pointer text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  {...props}
                >
                  {children}
                </a>
              );
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
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