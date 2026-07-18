"use client";

import React, { useState, useMemo } from "react";
import { Search, Bookmark, Layers, Globe, Tag, Star, ExternalLink, BookOpen, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Resource, RESOURCE_TYPES } from "../types/Resource";

interface Props {
  initialResources: Resource[];
}

export function ResourceDashboard({ initialResources }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Tutte");

  const stats = {
    totalResources: initialResources.length,
    totalCategories: new Set(initialResources.map(r => r.type)).size,
    // Gestione provvisoria null: escludiamo i provider vuoti dal conteggio univoco
    totalProviders: new Set(initialResources.map(r => r.provider).filter(Boolean)).size,
    totalTags: new Set(initialResources.flatMap(r => r.tags)).size
  };

  // Generazione dinamica a partire dalla sorgente unica
  const types = ["Tutte", ...RESOURCE_TYPES];
  
  const popularTags = useMemo(() => {
    const tagCounts = initialResources.flatMap(r => r.tags).reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(t => t[0]);
  }, [initialResources]);

  const filteredResources = useMemo(() => {
    let result = initialResources;

    if (selectedType !== "Tutte") {
      result = result.filter((resource) => resource.type === selectedType);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((resource) => {
        const matchTitle = resource.title.toLowerCase().includes(query);
        const matchDescription = resource.description.toLowerCase().includes(query);
        // Protezione contro valori null su provider
        const matchProvider = resource.provider?.toLowerCase().includes(query) ?? false;
        const matchTags = resource.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchTitle || matchDescription || matchProvider || matchTags;
      });
    }

    return result;
  }, [searchQuery, selectedType, initialResources]);

  const handleTagClick = (tag: string) => {
    if (searchQuery.toLowerCase() === tag.toLowerCase()) setSearchQuery("");
    else setSearchQuery(tag);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4">
      
      {/* Header & Descrizione */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <Bookmark className="h-8 w-8 text-primary" /> Knowledge Hub
        </h1>
        <p className="text-muted-foreground mt-1">
          Repository di strumenti, documentazione e riferimenti utili per lo studio.
        </p>
      </div>

      {/* Sezione Statistiche / KPI Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Risorse disponibili", value: stats.totalResources, icon: Bookmark },
          { label: "Macro Categorie", value: stats.totalCategories, icon: Layers },
          { label: "Provider censiti", value: stats.totalProviders, icon: Globe },
          { label: "Tag indicizzati", value: stats.totalTags, icon: Tag }
        ].map((stat, i) => (
          <div 
            key={i} 
            className="p-4 bg-muted/40 rounded-xl border border-border flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold mt-1 text-foreground">{stat.value}</p>
            </div>
            <stat.icon className="h-5 w-5 text-primary/70 shrink-0" />
          </div>
        ))}
      </div>

      {/* Barra di Ricerca Unificata */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cerca per titolo, descrizione, provider, tag o argomento..."
          className="w-full pl-9 pr-10 py-2.5 bg-background border border-input rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filtri a Chip (Tipologia Risorsa) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filtra per Tipo</label>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedType === type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-input hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Chip dei Tag Popolari */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/60">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Tag className="h-3 w-3" /> Tag popolari:
        </span>
        {popularTags.map((tag) => {
          const isActive = searchQuery.toLowerCase() === tag.toLowerCase();
          return (
            <Badge 
              key={tag} 
              variant={isActive ? "default" : "outline"} 
              className={`cursor-pointer text-xs transition-all select-none px-2.5 py-0.5 border-border ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-muted/20 hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          );
        })}
      </div>

      {/* Separatore Conteggio Risorse */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm font-medium text-muted-foreground">
          Mostrate <span className="font-semibold text-foreground">{filteredResources.length}</span> risorse
        </p>
      </div>

      {/* Grid delle Card */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-16 border rounded-xl border-dashed bg-card border-border">
          <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-lg text-foreground">Nessuna risorsa trovata</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Nessun elemento corrisponde ai filtri selezionati. Prova a reimpostare i criteri di ricerca.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card 
              key={resource.id}
              className="flex flex-col h-full border-border bg-card hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <Badge 
                    variant={resource.typeVariant} 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
                  >
                    {resource.type}
                  </Badge>
                  
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index} 
                        className={`h-3.5 w-3.5 ${resource.rating && index < resource.rating ? "fill-current" : "text-muted/40"}`} 
                      />
                    ))}
                  </div>
                </div>

              	<CardTitle className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
                  {resource.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm pt-1 min-h-[60px]">
                  {resource.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-2 pb-4 flex-1 text-xs text-muted-foreground space-y-2 border-t border-border/40 mt-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">🏢 Provider:</span>
                  <span className="font-semibold text-foreground">{resource.provider || "Non specificato"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">🌐 Link:</span>
                  <span className="text-primary truncate max-w-[200px]">{resource.url.replace("https://", "")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">🇬🇧 Lingua:</span>
                  <span className="font-semibold text-foreground">{resource.language}</span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-3 border-t bg-muted/20 flex flex-col gap-3 rounded-b-xl mt-auto">
                <div className="flex flex-wrap gap-1.5 w-full">
                  {resource.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-[9px] font-medium tracking-wide bg-background text-muted-foreground border border-border"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 w-full pt-1">
                  <Button 
                    className="flex-1 font-semibold text-xs h-9 gap-1.5" 
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    Apri <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="font-semibold text-xs h-9 border-input text-muted-foreground hover:text-foreground"
                  >
                    Salva
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
    </div>
  );
}