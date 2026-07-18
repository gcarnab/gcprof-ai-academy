"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Star, XCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { resourceSchema, type ResourceFormValues } from "../schemas/resourceSchema";
import { createResourceAction } from "../actions/createResourceAction";
import { updateResourceAction } from "../actions/updateResourceAction";
import { Resource, RESOURCE_TYPES } from "../types/Resource";

interface Props {
  initialData?: Resource | null;
  onSuccess?: () => void;
}

export function ResourceCreateForm({ initialData, onSuccess }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEditMode = !!initialData;

  const form = useForm<ResourceFormValues>({
    // Forziamo il resolver a combaciare esattamente con il tipo atteso dal form
    resolver: zodResolver(resourceSchema) as Resolver<ResourceFormValues>,
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      url: initialData?.url || "",
      type: initialData?.type || "",
      provider: initialData?.provider || "",
      language: initialData?.language || "IT",
      tags: initialData?.tags ? initialData.tags.join(", ") : "",
      rating: initialData?.rating ?? null,
    },
  });

  async function onSubmit(data: ResourceFormValues) {
    setIsPending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = isEditMode
        ? await updateResourceAction(initialData.id, data)
        : await createResourceAction(data);

      if (!result.success) {
        setErrorMessage(result.error || "Si è verificato un errore durante il salvataggio.");
        return;
      }

      setSuccessMessage(
        isEditMode 
          ? "Risorsa aggiornata con successo!" 
          : "Risorsa creata con successo! Ora è disponibile nel Knowledge Hub."
      );
      
      if (!isEditMode) form.reset();
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    } catch (error) {
      setErrorMessage("Impossibile comunicare con il server. Controlla la tua connessione.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {errorMessage && (
          <div className="p-3 text-sm font-medium text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 text-sm font-medium text-green-800 bg-green-100 border border-green-200 rounded-md dark:text-green-300 dark:bg-green-900/30 dark:border-green-900">
            {successMessage}
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titolo della Risorsa</FormLabel>
              <FormControl>
                <Input placeholder="Es. React Hook Form Masterclass" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrizione</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A cosa serve questa risorsa? Perché è utile?"
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL (Link)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipologia</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RESOURCE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider / Autore (Opzionale)</FormLabel>
                <FormControl>
                  <Input placeholder="Es. YouTube, Vercel (vuoto se nessuno)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lingua</FormLabel>
                <FormControl>
                  <Input placeholder="IT o EN" maxLength={2} className="uppercase" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="react, frontend (separati da virgola)" {...field} />
                </FormControl>
                <FormDescription>
                  Parole chiave separate da virgola.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="pb-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Valutazione Docente (Opzionale)</FormLabel>
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => field.onChange(null)}
                      className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                    >
                      <XCircle className="h-3 w-3" /> Rimuovi voto
                    </button>
                  )}
                </div>
                <FormControl>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          field.onChange(field.value === star ? null : star);
                        }}
                        className="text-amber-500 hover:scale-110 active:scale-95 transition-all focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            field.value && star <= field.value 
                              ? "fill-current text-amber-500" 
                              : "text-muted-foreground/30 dark:text-muted-foreground/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending || !!successMessage} className="w-full md:w-auto">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvataggio in corso...
              </>
            ) : (
              isEditMode ? "Aggiorna Risorsa" : "Salva Risorsa"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}