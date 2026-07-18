"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Resource } from "../types/Resource";
import { ResourceCreateForm } from "./ResourceCreateForm";
import { deleteResourceAction } from "../actions/deleteResourceAction";

interface Props {
  resources: Resource[];
}

export default function ResourceAdminTable({ resources }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingResource(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (resource: Resource) => {
    setEditingResource(resource);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Sei sicuro di voler eliminare definitivamente la risorsa "${title}"?`);
    if (!confirmed) return;

    setDeletingId(id);
    setGlobalError(null);

    try {
      const result = await deleteResourceAction(id);
      if (!result.success) {
        setGlobalError(result.error || "Si è verificato un errore durante l'eliminazione.");
      }
    } catch (error) {
      setGlobalError("Errore di connessione durante l'eliminazione della risorsa.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Tabella */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Gestione Risorse
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aggiungi, modifica o rimuovi i materiali dal Knowledge Hub.
          </p>
        </div>
        <Button className="gap-2" onClick={handleOpenCreate}>
          <Plus className="h-4 w-4" /> Nuova Risorsa
        </Button>
      </div>

      {globalError && (
        <div className="p-3 text-sm font-medium text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
          {globalError}
        </div>
      )}

      {/* Tabella Dati */}
      <div className="rounded-md border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">Titolo & Provider</th>
              <th className="px-4 py-3 font-medium">Tipologia</th>
              <th className="px-4 py-3 font-medium">Stato</th>
              <th className="px-4 py-3 font-medium text-right">Azioni</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {resources.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Nessuna risorsa trovata. Clicca su "Nuova Risorsa" per iniziare.
                </td>
              </tr>
            )}

            {resources.map((resource) => (
              <tr
                key={resource.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="font-semibold text-foreground line-clamp-1">
                    {resource.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {resource.provider}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={resource.typeVariant}
                    className="text-[10px] uppercase"
                  >
                    {resource.type}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {(resource as any).is_visible !== false ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900 gap-1"
                    >
                      <Eye className="h-3 w-3" /> Visibile
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-muted text-muted-foreground gap-1"
                    >
                      <EyeOff className="h-3 w-3" /> Nascosto
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
                      onClick={() => handleOpenEdit(resource)}
                      disabled={deletingId === resource.id}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                      onClick={() => handleDelete(resource.id, resource.title)}
                      disabled={deletingId !== null}
                    >
                      {deletingId === resource.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale Polimorfica (Inserimento / Modifica) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingResource ? "Modifica Risorsa" : "Aggiungi Nuova Risorsa"}
            </DialogTitle>
            <DialogDescription>
              {editingResource 
                ? "Modifica i campi desiderati per aggiornare le informazioni nel database." 
                : "Compila i campi sottostanti per aggiungere una nuova risorsa al Knowledge Hub."}
            </DialogDescription>
          </DialogHeader>
          
          <ResourceCreateForm 
            initialData={editingResource} 
            onSuccess={() => setIsModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}