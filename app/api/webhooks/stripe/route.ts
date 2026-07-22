/**
 * GCPROF AI ACADEMY - API ROUTE: STRIPE WEBHOOK HANDLER
 * File: app/api/webhooks/stripe/route.ts
 * 
 * Endpoint HTTP POST per la ricezione delle notifiche asincrone da Stripe.
 * Verifica la firma crittografica ed elabora i pagamenti con privilegi Admin (Service Role).
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { StripeGatewayAdapter } from "@/features/payments/adapters/stripe/StripeGatewayAdapter";
import { PaymentService } from "@/features/payments/services/PaymentService";

// Forziamo l'esecuzione dinamica senza caching
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Estrazione dell'header stripe-signature
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("❌ [Webhook Route] Intestazione stripe-signature mancante.");
      return NextResponse.json(
        { error: "Intestazione stripe-signature mancante" },
        { status: 400 }
      );
    }

    // 2. Lettura del corpo della richiesta in formato testo grezzo (Raw Text)
    const rawBody = await req.text();

    // 3. Istanziazione dell'Adapter per la verifica della firma crittografica
    const stripeAdapter = new StripeGatewayAdapter();
    const webhookEvent = await stripeAdapter.constructWebhookEvent(
      rawBody,
      signature
    );

    // 4. Inizializzazione del client Supabase con Service Role Key
    // Necessario perché le chiamate dei Webhook avvengono fuori dalla sessione utente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("❌ [Webhook Route] SUPABASE_SERVICE_ROLE_KEY non configurata.");
      return NextResponse.json(
        { error: "Configurazione del server incompleta" },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // 5. Elaborazione dell'evento di dominio tramite PaymentService
    const paymentService = new PaymentService(supabaseAdmin);
    await paymentService.processWebhookEvent(webhookEvent);

    // 6. Conferma di ricezione con HTTP 200 OK a Stripe
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
    console.error("❌ [Webhook Route] Errore nella gestione del webhook:", errorMessage);

    return NextResponse.json(
      { error: `Webhook Handler Error: ${errorMessage}` },
      { status: 400 }
    );
  }
}