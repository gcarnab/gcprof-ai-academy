/**
 * GCPROF AI ACADEMY - SERVICE: CART SERVICE
 * File: features/payments/services/CartService.ts
 * 
 * Servizio di dominio per la gestione del carrello persistente DB.
 * Garantisce che il prezzo sia letto ESCLUSIVAMENTE dalla fonte di verità (tabella courses)
 * e gestisce il ciclo di vita del carrello dell'utente.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { CartSummaryDTO, ShoppingCart, ShoppingCartItem } from "../types/paymentTypes";

export class CartService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Recupera il carrello attivo dell'utente o ne crea uno nuovo se non esiste.
   */
  public async getOrCreateCart(profileId: string): Promise<ShoppingCart> {
    // 1. Cerca il carrello attivo
    const { data: existingCart, error } = await this.supabase
      .from("shopping_carts")
      .select("*")
      .eq("profile_id", profileId)
      .eq("status", "ACTIVE")
      .maybeSingle();

    if (error) {
      console.error("[CartService.getOrCreateCart] Errore recupero carrello:", error);
      throw new Error("Impossibile recuperare il carrello dell'utente.");
    }

    if (existingCart) {
      return existingCart as ShoppingCart;
    }

    // 2. Se non esiste, crea un nuovo carrello attivo
    const { data: newCart, error: createError } = await this.supabase
      .from("shopping_carts")
      .insert({
        profile_id: profileId,
        status: "ACTIVE",
      })
      .select()
      .single();

    if (createError) {
      console.error("[CartService.getOrCreateCart] Errore creazione carrello:", createError);
      throw new Error("Impossibile creare il carrello per l'utente.");
    }

    return newCart as ShoppingCart;
  }

  /**
   * Recupera il riepilogo completo del carrello (cart, items arricchiti e calcolo subtotale)
   */
  public async getCartSummary(profileId: string): Promise<CartSummaryDTO> {
    const cart = await this.getOrCreateCart(profileId);

    const { data: items, error } = await this.supabase
      .from("shopping_cart_items")
      .select(`
        *,
        course:courses (
          id,
          title,
          cover_image,
          price
        )
      `)
      .eq("cart_id", cart.id);

    if (error) {
      console.error("[CartService.getCartSummary] Errore recupero elementi carrello:", error);
      throw new Error("Impossibile recuperare gli elementi del carrello.");
    }

    const formattedItems: ShoppingCartItem[] = (items || []).map((item: any) => ({
      id: item.id,
      cart_id: item.cart_id,
      course_id: item.course_id,
      unit_price: Number(item.unit_price),
      quantity: item.quantity,
      created_at: item.created_at,
      updated_at: item.updated_at,
      course: item.course ? {
        id: item.course.id,
        title: item.course.title,
        image_url: item.course.cover_image ?? null,
      } : undefined,
    }));

    const subtotal = formattedItems.reduce(
      (acc, item) => acc + item.unit_price * item.quantity, 
      0
    );

    return {
      cart,
      items: formattedItems,
      subtotal,
      discount: 0,
      total: subtotal,
      applied_coupon: null,
    };
  }

  /**
   * Aggiunge un corso al carrello.
   * Regola di Sicurezza: Il prezzo viene letto unicamente dalla tabella courses sul DB.
   */
  public async addToCart(profileId: string, courseId: string): Promise<CartSummaryDTO> {
    // 1. Verifica che il corso esista e legge il prezzo ufficiale
    const { data: course, error: courseError } = await this.supabase
      .from("courses")
      .select("id, price, is_paid")
      .eq("id", courseId)
      .single();

    if (courseError || !course) {
      throw new Error("Il corso selezionato non è stato trovato.");
    }

    if (!course.is_paid) {
      throw new Error("Il corso selezionato è gratuito. Non è necessario aggiungerlo al carrello.");
    }

    // 2. Recupera/Crea il carrello attivo
    const cart = await this.getOrCreateCart(profileId);

    // 3. Inserisce o aggiorna l'elemento nel carrello (Prezzo certificato DB)
    const { error: insertError } = await this.supabase
      .from("shopping_cart_items")
      .upsert(
        {
          cart_id: cart.id,
          course_id: course.id,
          unit_price: course.price,
          quantity: 1,
        },
        { onConflict: "cart_id,course_id" }
      );

    if (insertError) {
      console.error("[CartService.addToCart] Errore inserimento elemento:", insertError);
      throw new Error("Impossibile aggiungere il corso al carrello.");
    }

    return this.getCartSummary(profileId);
  }

  /**
   * Rimuove un corso dal carrello dell'utente
   */
  public async removeFromCart(profileId: string, courseId: string): Promise<CartSummaryDTO> {
    const cart = await this.getOrCreateCart(profileId);

    const { error } = await this.supabase
      .from("shopping_cart_items")
      .delete()
      .eq("cart_id", cart.id)
      .eq("course_id", courseId);

    if (error) {
      console.error("[CartService.removeFromCart] Errore rimozione elemento:", error);
      throw new Error("Impossibile rimuovere il corso dal carrello.");
    }

    return this.getCartSummary(profileId);
  }

  /**
   * Svuota tutti gli elementi del carrello specificato
   */
  public async clearCart(cartId: string): Promise<void> {
    const { error } = await this.supabase
      .from("shopping_cart_items")
      .delete()
      .eq("cart_id", cartId);

    if (error) {
      console.error("[CartService.clearCart] Errore svuotamento carrello:", error);
      throw new Error("Impossibile svuotare il carrello.");
    }
  }
}