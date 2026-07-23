/**
 * GCPROF AI ACADEMY - SERVICE: COURSE PRICING SERVICE
 * File: features/payments/services/CoursePricingService.ts
 * 
 * Servizio di dominio per la gestione del listino corsi,
 * configurazione prezzi e visibilità commerciale.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { CurrencyEnum } from "../types/paymentTypes";

export interface CoursePricing {
  course_id: string;
  slug: string;
  title: string;
  price: number;
  currency: CurrencyEnum;
  is_paid: boolean;
  stripe_product_id?: string | null;
  stripe_price_id?: string | null;
}

export interface UpdateCoursePricingDTO {
  price?: number;
  currency?: CurrencyEnum;
  is_paid?: boolean;
  stripe_product_id?: string | null;
  stripe_price_id?: string | null;
}

export class CoursePricingService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Recupera le informazioni di prezzo per un singolo corso.
   */
  public async getCoursePricing(courseId: string): Promise<CoursePricing> {
    const { data, error } = await this.supabase
      .from("courses")
      .select("id, slug, title, price, currency, is_paid, stripe_product_id, stripe_price_id")
      .eq("id", courseId)
      .single();

    if (error || !data) {
      console.error("[CoursePricingService] Errore recupero prezzo corso:", error);
      throw new Error("Impossibile recuperare le informazioni di prezzo del corso.");
    }

    return {
      course_id: data.id,
      slug: data.slug,
      title: data.title,
      price: Number(data.price),
      currency: data.currency as CurrencyEnum,
      is_paid: data.is_paid,
      stripe_product_id: data.stripe_product_id,
      stripe_price_id: data.stripe_price_id,
    };
  }

  /**
   * Recupera il listino completo dei corsi con i dettagli commerciali.
   */
  public async getAllCoursePricings(): Promise<CoursePricing[]> {
    const { data, error } = await this.supabase
      .from("courses")
      .select("id, slug, title, price, currency, is_paid, stripe_product_id, stripe_price_id")
      .order("title", { ascending: true });

    if (error) {
      console.error("[CoursePricingService] Errore recupero listino corsi:", error);
      throw new Error("Impossibile caricare il listino corsi.");
    }

    return (data || []).map((c) => ({
      course_id: c.id,
      slug: c.slug,
      title: c.title,
      price: Number(c.price),
      currency: c.currency as CurrencyEnum,
      is_paid: c.is_paid,
      stripe_product_id: c.stripe_product_id,
      stripe_price_id: c.stripe_price_id,
    }));
  }

  /**
   * Aggiorna i dettagli commerciali e il prezzo di un corso (Admin).
   */
  public async updateCoursePricing(
    courseId: string,
    dto: UpdateCoursePricingDTO
  ): Promise<CoursePricing> {
    // Se il prezzo viene azzerato, imposta automaticamente is_paid a false
    const isPaid = dto.price !== undefined && dto.price === 0 ? false : dto.is_paid;

    const payloadToUpdate: Record<string, unknown> = {};
    if (dto.price !== undefined) payloadToUpdate.price = dto.price;
    if (dto.currency !== undefined) payloadToUpdate.currency = dto.currency;
    if (isPaid !== undefined) payloadToUpdate.is_paid = isPaid;
    if (dto.stripe_product_id !== undefined) payloadToUpdate.stripe_product_id = dto.stripe_product_id;
    if (dto.stripe_price_id !== undefined) payloadToUpdate.stripe_price_id = dto.stripe_price_id;

    const { data, error } = await this.supabase
      .from("courses")
      .update(payloadToUpdate)
      .eq("id", courseId)
      .select("id, slug, title, price, currency, is_paid, stripe_product_id, stripe_price_id")
      .single();

    if (error || !data) {
      console.error("[CoursePricingService] Errore aggiornamento prezzo corso:", error);
      throw new Error("Impossibile aggiornare il listino per questo corso.");
    }

    return {
      course_id: data.id,
      slug: data.slug,
      title: data.title,
      price: Number(data.price),
      currency: data.currency as CurrencyEnum,
      is_paid: data.is_paid,
      stripe_product_id: data.stripe_product_id,
      stripe_price_id: data.stripe_price_id,
    };
  }

  /**
   * Helper rapido per verificare se un corso è gratuito.
   */
  public async isCourseFree(courseId: string): Promise<boolean> {
    const pricing = await this.getCoursePricing(courseId);
    return !pricing.is_paid || pricing.price === 0;
  }
}