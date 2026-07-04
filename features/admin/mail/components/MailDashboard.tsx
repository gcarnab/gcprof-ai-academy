"use client";

import { useEffect, useState } from "react";

import { getMailTemplatesAction } from "../actions/mailTemplateActions";

import type { MailTemplate } from "../types/mail";

import MailSettingsCard from "./MailSettingsCard";
import MailTemplateList from "./MailTemplateList";
import MailTemplateEditor from "./MailTemplateEditor";
import MailTestSender from "./MailTestSender";

export default function MailDashboard() {
  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<MailTemplate | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);

      const data = await getMailTemplatesAction();

      setTemplates(data);

      if (data.length > 0) {
        setSelectedTemplate(data[0]);
      } else {
        setSelectedTemplate(null);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleTemplateUpdated() {
    await loadTemplates();
  }

  return (
    <div className="space-y-8">
      <MailSettingsCard />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <MailTemplateList
          templates={templates}
          selectedTemplate={selectedTemplate}
          loading={loading}
          onSelect={setSelectedTemplate}
        />

        <div className="xl:col-span-2">
          <MailTemplateEditor
            template={selectedTemplate}
            onTemplateUpdated={handleTemplateUpdated}
          />
        </div>
      </div>

      <MailTestSender />
    </div>
  );
}