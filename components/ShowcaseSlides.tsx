"use client";

import { useState } from "react";

export default function ShowcaseSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "Presentazione Ufficiale",
      title: <>gcprof-ai-academy<br /><span className="text-[#deff9a]">L'E-Learning</span> del Futuro</>,
      desc: "Architettura scalabile, Server Actions e Supabase Realtime.",
      content: null
    },
    {
      badge: "Architettura Core",
      title: <>Il Nostro <span>Tech Stack</span></>,
      desc: "Tecnologie moderne selezionate per la massima efficienza.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4 text-left">
          <div className="bg-[#161616] p-6 rounded-xl border border-slate-800">
            <h4 className="text-[#deff9a] font-bold text-lg mb-2">🚀 Next.js 15 & React 19</h4>
            <p className="text-slate-300 text-sm">Utilizzo intensivo di Server Components e useTransition per una UX fulminea senza refresh di pagina.</p>
          </div>
          <div className="bg-[#161616] p-6 rounded-xl border border-slate-800">
            <h4 className="text-[#deff9a] font-bold text-lg mb-2">⚡ Supabase DB</h4>
            <p className="text-slate-300 text-sm">PostgreSQL relazionale robusto con chiamate amministrative protette lato server (bypass dei limiti TypeScript).</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0c0c0c] font-sans text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Sfondo decorativo */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-radial from-[#deff9a]/5 to-transparent pointer-events-none" />

      {/* Slide Header */}
      <div className="z-10 text-left">
        <span className="bg-[#deff9a]/10 text-[#deff9a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {slides[currentSlide].badge}
        </span>
      </div>

      {/* Slide Body */}
      <div className="z-10 my-auto space-y-4 max-w-3xl text-left">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          {slides[currentSlide].title}
        </h2>
        <p className="text-slate-400 text-base md:text-lg">
          {slides[currentSlide].desc}
        </p>
        {slides[currentSlide].content}
      </div>

      {/* Slide Footer / Controlli */}
      <div className="z-10 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-xs text-slate-500 font-mono">
          Slide {currentSlide + 1} di {slides.length}
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(prev => prev - 1)}
            className="px-3 py-1 bg-muted hover:bg-secondary disabled:opacity-30 rounded text-xs font-bold transition-all"
          >
            ◀ Indietro
          </button>
          <button
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide(prev => prev + 1)}
            className="px-3 py-1 bg-[#purple-600] bg-purple-600 hover:bg-purple-700 disabled:opacity-30 rounded text-xs font-bold transition-all"
          >
            Avanti ▶
          </button>
        </div>
      </div>
    </div>
  );
}