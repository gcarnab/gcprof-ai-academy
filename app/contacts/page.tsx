"use client";

import { useState } from "react";
import { sendContactEmail } from "./actions";
import Navbar from "@/features/home/components/Navbar";
import Footer from "@/features/home/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactsPage() {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const result = await sendContactEmail(formData);

    setIsPending(false);
    if (result.success) {
      setStatus({ success: true, message: "Messaggio inviato con successo! Ti risponderò al più presto." });
      (event.target as HTMLFormElement).reset(); // Svuota il form
    } else {
      setStatus({ success: false, message: result.error || "Qualcosa è andato storto." });
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* COLONNA SINISTRA: INFO E SOCIAL */}
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                📫 Mettiti in contatto
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Parliamo del tuo <span className="text-blue-600">Futuro Digitale</span>
              </h1>
              <p className="mt-4 text-lg text-gray-500">
                Hai domande sui nostri corsi? Vuoi proporre una collaborazione o chiedere supporto didattico? Scrivimi direttamente tramite il modulo o connettiti sui social.
              </p>
            </div>

            {/* BOX SOCIAL ACCATTIVANTI */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">I miei canali ufficiali</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                
                <a 
                  href="https://www.youtube.com/@GiuseppeCarnabuci" // 👈 Inserisci il tuo link reale
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:border-red-200 hover:bg-red-50/30 group"
                >
                  <span className="text-2xl">📺</span>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">YouTube</div>
                    <div className="text-xs text-gray-400">Video & Tutorial</div>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/giuseppecarnabuci/" // 👈 Inserisci il tuo link reale
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/30 group"
                >
                  <span className="text-2xl">💼</span>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">LinkedIn</div>
                    <div className="text-xs text-gray-400">Profilo professionale</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/gcarnab" // 👈 Inserisci il tuo link reale
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition hover:border-gray-900 hover:bg-gray-50 group"
                >
                  <span className="text-2xl">🐙</span>
                  <div>
                    <div className="font-semibold text-gray-900 transition-colors">GitHub</div>
                    <div className="text-xs text-gray-400">Repository & Progetti</div>
                  </div>
                </a>
{/*
                <div className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="font-semibold text-gray-900">Ricevimento studenti</div>
                    <div className="text-xs text-gray-400">Classi prime e seconde</div>
                  </div>
                </div>
 */}
              </div>
            </div>
          </div>

          {/* COLONNA DESTRA: MODULO DI INVIO EMAIL */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Invia un messaggio rapido</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">Il tuo Nome</Label>
                <Input id="name" name="name" type="text" placeholder="Mario Rossi" required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Indirizzo Email</Label>
                <Input id="email" name="email" type="email" placeholder="mario.rossi@scuola.it" required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Come posso aiutarti?</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Scrivi qui il tuo messaggio..." 
                  rows={5} 
                  required 
                />
              </div>

              {/* Messaggi di feedback sull'invio */}
              {status && (
                <div className={`p-4 rounded-lg text-sm font-medium border ${
                  status.success 
                    ? "bg-green-50 text-green-800 border-green-200" 
                    : "bg-red-50 text-red-800 border-red-200"
                }`}>
                  {status.message}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 transition-all"
                disabled={isPending}
              >
                {isPending ? "Invio in corso... ⏳" : "Invia Messaggio 🚀"}
              </Button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}