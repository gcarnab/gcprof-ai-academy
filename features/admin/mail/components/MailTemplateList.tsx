"use client";

import { MailTemplate } from "../types/mail";

interface Props {
  templates: MailTemplate[];

  selectedTemplate: MailTemplate | null;

  loading: boolean;

  onSelect: (template: MailTemplate) => void;
}

export default function MailTemplateList({
  templates,
  selectedTemplate,
  loading,
  onSelect,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">
      <div className="border-b p-4">
        <h2 className="font-semibold">Template</h2>
      </div>

      {loading && (
        <div className="p-4 text-sm text-gray-500">Caricamento...</div>
      )}

      {!loading &&
        templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`block w-full border-b px-4 py-3 text-left transition

              ${
                selectedTemplate?.id === template.id
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "hover:bg-gray-50"
              }
            `}
          >
            <div>{template.name}</div>

            <div className="text-xs text-gray-500">{template.template_key}</div>
          </button>
        ))}
    </div>
  );
}
