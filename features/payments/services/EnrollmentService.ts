/**
 * GCPROF AI ACADEMY - SERVICE: ENROLLMENT SERVICE
 * File: features/payments/services/EnrollmentService.ts
 *
 * Servizio di dominio per l'abilitazione e iscrizione degli studenti ai corsi.
 * Disaccoppiato dai gateway di pagamento, scrive unicamente sulla tabella profile_courses
 * e aggiorna lo stato dell'ordine a FULFILLED.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { OrderItem } from "../types/paymentTypes";

export class EnrollmentService {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Iscrive direttamente un profilo utente ad una lista di corsi.
   * Utilizza l'upsert per garantire l'idempotenza in caso di riesecuzioni.
   */
  public async enrollUserInCourses(
    profileId: string,
    courseIds: string[],
  ): Promise<void> {
    if (!courseIds || courseIds.length === 0) {
      return;
    }

    const enrollments = courseIds.map((courseId) => ({
      profile_id: profileId,
      course_id: courseId,
      enrolled_at: new Date().toISOString(),
      status: "ACTIVE",
      updated_at: new Date().toISOString(),
    }));

    const { error } = await this.supabase
      .from("profile_courses")
      .upsert(enrollments, { onConflict: "profile_id,course_id" });

    if (error) {
      console.error(
        "[EnrollmentService.enrollUserInCourses] Errore durante l'iscrizione ai corsi:",
        error,
      );
      throw new Error(
        `Impossibile completare l'iscrizione ai corsi per l'utente ${profileId}.`,
      );
    }
  }

  /**
   * Evade un ordine pagato: recupera i corsi associati, iscrive lo studente
   * e aggiorna lo stato dell'ordine a FULFILLED.
   */
  public async fulfillOrder(orderId: string): Promise<void> {
    // 1. Recupera l'ordine
    const { data: order, error: orderError } = await this.supabase
      .from("orders")
      .select("id, profile_id, status")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error(
        "[EnrollmentService.fulfillOrder] Ordine non trovato:",
        orderError,
      );
      throw new Error(`Ordine ${orderId} non trovato.`);
    }

    // Se l'ordine è già stato evaso, usciamo in sicurezza per idempotenza
    if (order.status === "FULFILLED") {
      console.log(
        `[EnrollmentService.fulfillOrder] Ordine ${orderId} già evaso.`,
      );
      return;
    }

    // 2. Recupera gli elementi dell'ordine (order_items)
    const { data: items, error: itemsError } = await this.supabase
      .from("order_items")
      .select("course_id")
      .eq("order_id", orderId);

    if (itemsError || !items || items.length === 0) {
      console.error(
        "[EnrollmentService.fulfillOrder] Errore recupero elementi ordine:",
        itemsError,
      );
      throw new Error(`Nessun corso trovato per l'ordine ${orderId}.`);
    }

    const courseIds = (items as Pick<OrderItem, "course_id">[]).map(
      (item) => item.course_id,
    );

    // 3. Iscrive l'utente a tutti i corsi presenti nell'ordine
    await this.enrollUserInCourses(order.profile_id, courseIds);

    // 4. Aggiorna lo stato dell'ordine a FULFILLED
    const { error: updateError } = await this.supabase
      .from("orders")
      .update({
        status: "FULFILLED",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error(
        "[EnrollmentService.fulfillOrder] Errore aggiornamento stato ordine:",
        updateError,
      );
      throw new Error(
        `Impossibile aggiornare lo stato dell'ordine ${orderId} a FULFILLED.`,
      );
    }

    console.log(
      `✅ [EnrollmentService] Ordine ${orderId} evaso con successo. Studente iscritto a ${courseIds.length} corsi.`,
    );
  }
}
