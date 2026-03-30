'use client';

import React from "react";
import { BrainCircuit, Sparkles, Loader2 } from "lucide-react";

export interface Suggestion {
  id: string;
  label: string;
  action?: () => void;
}

interface AIPanelProps {
  suggestions: Suggestion[];
  isLoading?: boolean;
}

/**
 * AIPanel: A presentational component optimized for accessibility.
 * Standardized to match 'Senior Developer' patterns with externalized actions and memoized data.
 */
export const AIPanel: React.FC<AIPanelProps> = ({ suggestions, isLoading = false }) => {
  return (
    <section 
      aria-label="Yapay Zeka Çalışma Önerileri" 
      className="fixed bottom-12 right-12 z-50 w-[450px] bg-slate-900 text-white rounded-[2.5rem] shadow-2xl border-4 border-slate-800 p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-500"
    >
      <header className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20">
          <BrainCircuit size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight">AI Mentor İpuçları</h2>
          <p className="text-blue-400 font-bold text-sm uppercase tracking-widest opacity-80">
            {isLoading ? "Öneriler Hazırlanıyor..." : " Senin için Önerilenler"}
          </p>
        </div>
        <div className="ml-auto">
          <Sparkles size={24} className="text-blue-400 animate-pulse" />
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 gap-4 text-blue-400 font-black uppercase italic animate-pulse">
            <Loader2 size={32} className="animate-spin" /> Veriler optimize ediliyor...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {suggestions.length > 0 ? (
              suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={s.action}
                  className="w-full text-left p-5 bg-slate-800 hover:bg-blue-600 border-2 border-slate-700 hover:border-white rounded-3xl cursor-pointer transition-all flex gap-4 items-center group focus:ring-4 focus:ring-blue-500 outline-none"
                  aria-label={`Yapay Zekaya Sor: ${s.label}`}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-white" />
                  <span className="text-lg font-bold leading-snug">{s.label}</span>
                </button>
              ))
            ) : (
              <p className="text-slate-500 font-bold italic py-4 text-center">Henüz öneri bulunamadı.</p>
            )}
          </div>
        )}
      </div>

      <footer className="pt-4 border-t border-slate-800">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
          Accessible Academy • AI powered tutoring
        </p>
      </footer>
    </section>
  );
};

export default AIPanel;
