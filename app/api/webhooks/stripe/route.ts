import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { StripeGatewayAdapter } from "@/features/payments/adapters/stripe/StripeGatewayAdapter";
import { PaymentService } from "@/features/payments/services/PaymentService";
import { logger } from "@/lib/logger";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: NextRequest) {
  logger.info("[Stripe Webhook] Ricevuta notifica evento Stripe");

  // 1. Verifica presenza delle chiavi Supabase essenziali
  if (!supabaseUrl || !supabaseServiceKey) {
    logger.error("[Stripe Webhook] Variabili Supabase (URL/Service Key) non configurate.");
    return NextResponse.json(
      { error: "Errore di configurazione del server (Supabase Key mancante)." },
      { status: 500 }
    );
  }

  // 2. Lettura dell'intestazione e del body raw per la verifica della firma crittografica
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    logger.warn("[Stripe Webhook] Intestazione stripe-signature mancante.");
    return NextResponse.json(
      { error: "Firma Stripe mancante." },
      { status: 400 }
    );
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (readError) {
    logger.error("[Stripe Webhook] Errore durante la lettura del body della richiesta", { error: readError });
    return NextResponse.json(
      { error: "Impossibile leggere il payload della richiesta." },
      { status: 400 }
    );
  }

  // 3. Inizializzazione dei servizi necessari con privilegio Service Role (bypass RLS)
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const stripeGateway = new StripeGatewayAdapter();
  // Invocazione corretta con 1 solo argomento (supabaseAdmin)
  const paymentService = new PaymentService(supabaseAdmin);

  // 4. Decodifica e validazione dell'evento tramite l'adapter
  let eventPayload;
  try {
    eventPayload = await stripeGateway.constructWebhookEvent(rawBody, signature);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Firma non valida.";
    logger.error("[Stripe Webhook] Verifica firma crittografica fallita", { error: errorMessage });
    return NextResponse.json(
      { error: `Verifica firma Webhook fallita: ${errorMessage}` },
      { status: 400 }
    );
  }

  logger.info("[Stripe Webhook] Evento autenticato con successo", {
    eventId: eventPayload.id,
    eventType: eventPayload.type,
  });

  // 5. Elaborazione dell'evento tramite PaymentService
  try {
    await paymentService.processWebhookEvent(eventPayload);

    logger.info("[Stripe Webhook] Elaborazione evento completata con successo", {
      eventId: eventPayload.id,
      eventType: eventPayload.type,
    });

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (processError) {
    const errorMessage =
      processError instanceof Error ? processError.message : "Errore sconosciuto";

    logger.error("[Stripe Webhook] Errore durante l'elaborazione dell'evento", {
      eventId: eventPayload.id,
      eventType: eventPayload.type,
      error: errorMessage,
    });

    return NextResponse.json(
      { error: `Errore elaborazione webhook: ${errorMessage}` },
      { status: 500 }
    );
  }
}