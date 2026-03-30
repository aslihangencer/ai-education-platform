"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Square, Volume2, Keyboard, Headphones } from "lucide-react";

/**
 * VoiceAssistant Component:
 * Core accessibility feature for visually impaired students.
 * Utilizes the Web Speech API and keyboard shortcuts (Space/Enter) 
 * to provide a natural, hands-free interaction with AI-generated textbook analysis.
 */
export const VoiceAssistant = ({ text }: { text: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Cancel previous playback to prevent overlapping
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "tr-TR"; // Optimized for Turkish students
      utterance.rate = 0.95;    // Accessible pacing
      utterance.pitch = 1.0;
      
      utterance.onstart = () => {
          setIsPlaying(true);
          setIsSynthesizing(false);
      };
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (e) => {
          console.error("SpeechSynthesis Error:", e);
          setIsPlaying(false);
          setIsSynthesizing(false);
      };

      utteranceRef.current = utterance;
      setIsSynthesizing(true);
      window.speechSynthesis.speak(utterance);
    }
  }, [text]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      speak();
    }
  }, [isPlaying, speak, stop]);

  // Global Keyboard Navigation (Space bar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        togglePlayback();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayback]);

  return (
    <div className="mt-12 p-8 bg-slate-900 border-[12px] border-blue-600 rounded-[3.5rem] shadow-3xl text-center space-y-10 animate-in zoom-in duration-500">
      <header className="flex flex-col items-center gap-6">
        <div className="bg-blue-600/20 text-blue-400 p-6 rounded-full animate-pulse">
           <Headphones size={48} />
        </div>
        <div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Sesli Ders Asistanı</h2>
          <p className="text-xl font-bold text-slate-400 mt-2 uppercase tracking-widest flex items-center justify-center gap-3">
             <span className="w-3 h-3 bg-blue-500 rounded-full" /> {isPlaying ? "Dinleniyor..." : "Başlatılmaya Hazır"}
          </p>
        </div>
      </header>

      <button
        onClick={togglePlayback}
        className={`w-full py-20 text-5xl font-black uppercase tracking-[0.1em] rounded-[2.5rem] transition-all transform active:scale-95 shadow-2xl flex flex-col items-center justify-center gap-6
          ${isPlaying 
            ? "bg-red-600 hover:bg-red-700 text-white border-8 border-red-500" 
            : "bg-blue-600 hover:bg-black text-white border-8 border-blue-500"}`}
        aria-label={isPlaying ? "Dersi durdur (Kısa yol: Boşluk tuşu)" : "Dersi sesli dinlemeye başla (Kısa yol: Boşluk tuşu)"}
      >
        {isSynthesizing ? (
          "Ses Hazırlanıyor..."
        ) : isPlaying ? (
          <>
            <Square size={80} fill="currentColor" />
            <span>DURDUR (Space)</span>
          </>
        ) : (
          <>
            <Play size={80} fill="currentColor" className="ml-4" />
            <span>DERSİ DİNLE (Space)</span>
          </>
        )}
      </button>

      <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 border-t-2 border-white/10">
         <div className="flex items-center gap-3 text-slate-400 font-bold bg-white/5 p-4 rounded-3xl justify-center">
            <Keyboard size={24} /> <span className="text-sm">Boşluk Tuşu: Kontrol</span>
         </div>
         <div className="flex items-center gap-3 text-slate-400 font-bold bg-white/5 p-4 rounded-3xl justify-center">
            <Volume2 size={24} /> <span className="text-sm">Dil: Türkçe (v1.0)</span>
         </div>
      </footer>
    </div>
  );
};

export default VoiceAssistant;
