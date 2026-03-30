"use client";
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";
import { useState } from "react";

export const AntigravityPlayer = ({ audioSrc }: { audioSrc?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      // Antigravity (Süzülme) Efekti
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="max-w-2xl mx-auto mt-20"
    >
      <div className="p-12 bg-white border-[10px] border-black rounded-[60px] shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
        <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter text-center">
          Ders Dinleme Paneli
        </h2>

        {/* Big & Simple UI Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`
            w-40 h-40 rounded-full border-8 border-black flex items-center justify-center transition-all
            ${isPlaying ? "bg-red-500 text-white animate-pulse" : "bg-yellow-400 text-black hover:scale-110 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"}
          `}
          aria-label={isPlaying ? "Dersi Durdur" : "Dersi Başlat"}
        >
          {isPlaying ? <Square size={60} fill="currentColor" /> : <Play size={60} fill="currentColor" className="ml-4" />}
        </button>

        <div className="mt-8 flex gap-4">
          <span className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full font-black text-sm uppercase">
            OpenAI HD Ses Aktif
          </span>
          <span className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-black text-sm uppercase">
            Gemini 1.5 Analizi Hazır
          </span>
        </div>
      </div>
    </motion.div>
  );
};
