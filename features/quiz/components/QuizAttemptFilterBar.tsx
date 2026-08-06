import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface QuizAttemptFilterBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  userTypeFilter: string;
  onUserTypeFilterChange: (type: string) => void;
  sectionFilter: string;
  onSectionFilterChange: (section: string) => void;
  availableSections: string[];
}

export function QuizAttemptFilterBar({
  searchQuery,
  onSearchQueryChange,
  userTypeFilter,
  onUserTypeFilterChange,
  sectionFilter,
  onSectionFilterChange,
  availableSections,
}: QuizAttemptFilterBarProps) {
  return (
    <div className="space-y-2 bg-muted/40 p-3 rounded-lg border">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca studente, email..."
          className="pl-9 h-9 text-xs"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Select
          value={userTypeFilter}
          onValueChange={onUserTypeFilterChange}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Tipo Utente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tutti gli Utenti</SelectItem>
            <SelectItem value="SCHOOL_STUDENT">Scolastici</SelectItem>
            <SelectItem value="EXTERNAL_STUDENT">Esterni</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sectionFilter}
          onValueChange={onSectionFilterChange}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Sezione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tutte le Sezioni</SelectItem>
            {availableSections.map((sec) => (
              <SelectItem key={sec} value={sec}>
                Sezione {sec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}