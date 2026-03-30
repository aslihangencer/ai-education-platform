"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/AudioGuideContext";
import { analyzePDFContent } from "@/app/actions/pdf-analysis";

export const PDFReader = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const { speak, stop } = useAudio();

  // Klavye Kontrolü: Space ile Oynat/Durdur
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space" && summary) {
      e.preventDefault();
      if (isReading) {
        stop();
        setIsReading(false);
      } else {
        speak(summary, 0); // Varsayılan rate eklendi
        setIsReading(true);
      }
    }
  }, [summary, isReading, speak, stop]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="p-8">
      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }} // Antigravity Süzülme
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="bg-black text-yellow-400 p-12 rounded-[50px] border-8 border-yellow-400 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-4xl font-black uppercase mb-6 italic">Özet Hazır!</h2>
            <p className="text-xl font-bold mb-8 opacity-90">
              Dinlemek için <span className="bg-white text-black px-3 py-1 rounded-lg italic font-black text-sm">BOŞLUK</span> tuşuna basın.
            </p>
            
            {isReading && (
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-12 h-12 bg-blue-500 rounded-full mx-auto"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
