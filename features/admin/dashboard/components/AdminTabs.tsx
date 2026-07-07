"use client";

export interface AdminTab {
  id: string;
  label: string;
}

interface Props {
  currentTab: string;
  onChange: (tab: string) => void;
}

const tabs: AdminTab[] = [
  { id: "courses", label: "📚 Corsi" },
  { id: "users", label: "👥 Utenti" },
  { id: "mail", label: "📧 Mail" },
  { id: "analytics", label: "📊 Analytics" },
];

export default function AdminTabs({
  currentTab,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-4 text-sm font-medium transition-colors ${
            currentTab === tab.id
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}