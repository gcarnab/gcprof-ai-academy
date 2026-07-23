/**
 * GCPROF AI ACADEMY - SERVICE: COUPON SERVICE
 * File: features/payments/services/CouponService.ts
 * 
 * Servizio di dominio per la validazione, il calcolo e il riscatto
 * dei codici sconto (Coupon).
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { Coupon, DiscountTypeEnum } from "../types/paymentTypes";

export interface CouponValidationResult {
  isValid: boolean;
  coupon: Coupon | null;
  discountAmount: number;
  reason?: string;
}

export class CouponService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Recupera i dettagli di un coupon tramite codice.
   */
  public async getCouponByCode(code: string): Promise<Coupon | null> {
    const { data, error } = await this.supabase
      .from("coupons")
      .select("*")
      .eq("code", code.trim().toUpperCase())
      .single();

    if (error || !data) {
      return null;
    }

    return data as Coupon;
  }

  /**
   * Valida un coupon rispetto a un importo d'ordine e ne calcola lo sconto.
   */
  public async validateCoupon(
    code: string,
    subtotal: number
  ): Promise<CouponValidationResult> {
    const coupon = await this.getCouponByCode(code);

    if (!coupon) {
      return { isValid: false, coupon: null, discountAmount: 0, reason: "Codice promozionale non valido." };
    }

    if (!coupon.is_active) {
      return { isValid: false, coupon: null, discountAmount: 0, reason: "Questo codice promozionale è disattivato." };
    }

    const now = new Date();

    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
      return { isValid: false, coupon: null, discountAmount: 0, reason: "Il codice promozionale non è ancora attivo." };
    }

    if (coupon.valid_to && new Date(coupon.valid_to) < now) {
      return { isValid: false, coupon: null, discountAmount: 0, reason: "Il codice promozionale è scaduto." };
    }

    if (
      coupon.max_redemptions !== null &&
      coupon.current_redemptions >= coupon.max_redemptions
    ) {
      return { isValid: false, coupon: null, discountAmount: 0, reason: "Questo codice promozionale ha raggiunto il limite massimo di utilizzi." };
    }

    const discountAmount = this.calculateDiscount(coupon, subtotal);

    return {
      isValid: true,
      coupon,
      discountAmount,
    };
  }

  /**
   * Calcola l'importo effettivo dello sconto in base al tipo (PERCENTAGE o FIXED).
   */
  public calculateDiscount(coupon: Coupon, subtotal: number): number {
    if (subtotal <= 0) return 0;

    let calculatedDiscount = 0;

    if (coupon.discount_type === "PERCENTAGE") {
      calculatedDiscount = (subtotal * coupon.discount_value) / 100;
    } else if (coupon.discount_type === "FIXED") {
      calculatedDiscount = coupon.discount_value;
    }

    // Lo sconto non può mai superare il subtotale
    return Math.min(Math.round(calculatedDiscount * 100) / 100, subtotal);
  }

  /**
   * Registra il riscatto del coupon a fronte di un ordine completato.
   * Incrementa il contatore `current_redemptions` e crea la riga in `coupon_redemptions`.
   */
  public async redeemCoupon(
    couponId: string,
    orderId: string,
    profileId: string
  ): Promise<void> {
    // 1. Registra il riscatto
    const { error: redemptionError } = await this.supabase
      .from("coupon_redemptions")
      .insert({
        coupon_id: couponId,
        order_id: orderId,
        profile_id: profileId,
        redeemed_at: new Date().toISOString(),
      });

    if (redemptionError) {
      console.error("[CouponService] Errore salvataggio redemption:", redemptionError);
      throw new Error("Impossibile registrare l'utilizzo del coupon.");
    }

    // 2. Incrementa il contatore di utilizzi
    const { error: updateError } = await this.supabase.rpc("increment_coupon_redemptions", {
      coupon_id_param: couponId,
    });

    // Fallback con query diretta se la stored procedure RPC non è definita
    if (updateError) {
      const { data: currentCoupon } = await this.supabase
        .from("coupons")
        .select("current_redemptions")
        .eq("id", couponId)
        .single();

      if (currentCoupon) {
        await this.supabase
          .from("coupons")
          .update({ current_redemptions: currentCoupon.current_redemptions + 1 })
          .eq("id", couponId);
      }
    }
  }
}