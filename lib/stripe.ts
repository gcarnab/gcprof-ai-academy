import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Non specificare apiVersion: l'SDK userà la sua versione nativa corretta
  typescript: true,
});