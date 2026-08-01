"use client";

import React from "react";
import { 
  Brain, 
  CodeXml, 
  Database, 
  Coins, 
  Blocks, 
  HelpCircle,
  BookOpen,
  Layers
} from "lucide-react";
import { CourseCategory } from "@/features/courses/types/CourseCategory";

/**
 * Mappatura icone Lucide basata su icon_name nel DB
 */
const ICON_MAP: Record<string, React.ElementType> = {
  "brain": Brain,
  "code-xml": CodeXml,
  "database": Database,
  "coin": Coins,
  "blockchain": Blocks,
  "blockchian": Blocks, // Tolleranza per refuso sul DB
  "quiz": HelpCircle,
};

/**
 * Props del componente
 */
interface CategoryFilterProps {
  /**
   * Categorie provenienti dal DB (oggetti CourseCategory) o stringhe
   */
  categories: (CourseCategory | string)[];

  /**
   * Categoria attualmente selezionata (nome stringa)
   */
  selected: string;

  /**
   * Callback quando cambia la selezione
   */
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((item) => {
        const isString = typeof item === "string";
        const categoryName = isString ? item : item.name;
        const iconName = isString ? null : item.iconName || (item as any).icon_name;
        
        const isActive = selected.toLowerCase() === categoryName.toLowerCase();
        
        // Icona di default o specifica per "Tutti"
        const IconComponent = categoryName === "Tutti" 
          ? Layers 
          : (iconName && ICON_MAP[iconName.toLowerCase()]) || BookOpen;

        return (
          <button
            key={isString ? item : item.id || item.name}
            onClick={() => onChange(categoryName)}
            className={`
              inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold
              transition-all duration-200 shrink-0 border
              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                  : "bg-card text-muted-foreground border-border/80 hover:bg-accent hover:text-foreground hover:border-border"
              }
            `}
          >
            <IconComponent className={`h-4 w-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
            <span>{categoryName}</span>
          </button>
        );
      })}
    </div>
  );
}