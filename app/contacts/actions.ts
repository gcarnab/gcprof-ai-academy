"use server";

import { Resend } from "resend";

// 🎯 FIX: Recuperiamo la chiave. Se manca in locale, usiamo una stringa vuota temporanea per non bloccare il server all'avvio
const apiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(apiKey);

export async function sendContactEmail(formData: FormData) {
  // Controlliamo se la chiave è effettivamente presente prima di tentare l'invio
  if (!apiKey) {
    console.error(
      "❌ ERRORE: La variabile RESEND_API_KEY non è configurata nel file .env.local o su Vercel!",
    );
    return {
      success: false,
      error: "Configurazione del server incompleta. Riprova più tardi.",
    };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Tutti i campi sono obbligatori." };
  }

  try {
    await resend.emails.send({
      from: "GCPROF-ACADEMY.COM <noreply@gcprof-academy.com>",
      to: "gcarnab74@gmail.com", // 👈 SOSTITUISCI CON LA TUA GMAIL REALMENTE REGISTRATA SU RESEND
      subject: `✉️ Nuovo messaggio da ${name} - GCPROF-ACADEMY.COM`,
      replyTo: email, // Ti permette di rispondere direttamente all'utente cliccando su "Rispondi" in Gmail
      html: `
        <h2>Nuovo messaggio dal modulo contatti</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email dell'utente:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <div style="padding: 15px; background-color: #f3f4f6; border-radius: 8px; border-left: 4px solid #2563eb;">
          ${message.replace(/\n/g, "<br/>")}
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Errore invio email:", error);
    return {
      success: false,
      error: "Impossibile inviare il messaggio in questo momento.",
    };
  }
}
