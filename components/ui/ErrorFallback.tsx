"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useAudio } from "@/context/AudioGuideContext";

export const ErrorFallback = ({ message }: { message: string }) => {
  const { speak } = useAudio();

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
      transition={{ y: { duration: 2, repeat: Infinity } }}
      onMouseEnter={() => speak(`Hata oluştu: ${message}`)}
      className="p-8 bg-red-100 border-[6px] border-red-600 rounded-[30px] flex items-center gap-6 cursor-help"
    >
      <div className="bg-red-600 p-4 rounded-full text-white">
        <AlertTriangle size={40} />
      </div>
      <div>
        <h3 className="text-2xl font-black text-red-700 uppercase">Sistem Duraksadı</h3>
        <p className="font-bold text-red-600 italic">{message}</p>
      </div>
    </motion.div>
  );
};
