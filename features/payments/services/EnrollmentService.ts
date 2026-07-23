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
import { logger } from "@/lib/logger";

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
      logger.info("[EnrollmentService.enrollUserInCourses] Nessun corso fornito per l'iscrizione.");
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
      logger.error("[EnrollmentService.enrollUserInCourses] Errore durante l'iscrizione ai corsi", {
        profileId,
        courseIds,
        error: error.message,
      });
      throw new Error(
        `Impossibile completare l'iscrizione ai corsi per l'utente ${profileId}.`
      );
    }

    logger.info("[EnrollmentService.enrollUserInCourses] Iscrizione completata con successo", {
      profileId,
      coursesCount: courseIds.length,
    });
  }

  /**
   * Evade un ordine pagato: recupera i corsi associati, iscrive lo studente
   * e aggiorna lo stato dell'ordine a FULFILLED.
   */
  public async fulfillOrder(orderId: string): Promise<void> {
    logger.info("[EnrollmentService.fulfillOrder] Avvio evasione ordine", { orderId });

    // 1. Recupera l'ordine
    const { data: order, error: orderError } = await this.supabase
      .from("orders")
      .select("id, profile_id, status")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      logger.error("[EnrollmentService.fulfillOrder] Ordine non trovato", { orderId, error: orderError?.message });
      throw new Error(`Ordine ${orderId} non trovato.`);
    }

    // Se l'ordine è già stato evaso, usciamo in sicurezza per idempotenza
    if (order.status === "FULFILLED") {
      logger.info("[EnrollmentService.fulfillOrder] Ordine già evaso in precedenza.", { orderId });
      return;
    }

    // 2. Recupera gli elementi dell'ordine (order_items)
    const { data: items, error: itemsError } = await this.supabase
      .from("order_items")
      .select("course_id")
      .eq("order_id", orderId);

    if (itemsError || !items || items.length === 0) {
      logger.error("[EnrollmentService.fulfillOrder] Errore recupero elementi ordine", { orderId, error: itemsError?.message });
      throw new Error(`Nessun corso trovato per l'ordine ${orderId}.`);
    }

    const courseIds = (items as Pick<OrderItem, "course_id">[]).map(
      (item) => item.course_id
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
      logger.error("[EnrollmentService.fulfillOrder] Errore aggiornamento stato ordine a FULFILLED", {
        orderId,
        error: updateError.message,
      });
      throw new Error(
        `Impossibile aggiornare lo stato dell'ordine ${orderId} a FULFILLED.`
      );
    }

    logger.info("[EnrollmentService.fulfillOrder] Ordine evaso con successo", {
      orderId,
      profileId: order.profile_id,
      coursesCount: courseIds.length,
    });
  }
}