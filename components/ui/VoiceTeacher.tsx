'use client';

import React, { useState } from "react";
import { Mic, Volume2, Loader2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface VoiceTeacherProps {
  name: string;
  introText?: string;
  language?: "tr-TR" | "en-US";
  voice?: string;
}

export const VoiceTeacher: React.FC<VoiceTeacherProps> = ({ 
  name, 
  introText, 
  language = "tr-TR", 
  voice 
}) => {
  const [loading, setLoading] = useState(false);

  // Default premium voices for Google
  const defaultVoice = language === "tr-TR" ? "tr-TR-Wavenet-A" : "en-US-Journey-F";
  const selectedVoice = voice || defaultVoice;

  const speak = async () => {
    setLoading(true);
    const text = introText || `${language === "en-US" ? "Hello" : "Merhaba"}! Ben ${name}. Derslerimize hoş geldiniz.`;
    
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text, 
          languageCode: language, 
          voiceName: selectedVoice 
        }),
      });

      if (!res.ok) {
         const err = await res.json();
         throw new Error(err.error || "TTS API Error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audio.onended = () => setLoading(false);
      audio.play();

    } catch (error: any) {
      alert(`Ses hatası: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={speak}
      variant="ghost"
      disabled={loading}
      className="mt-4 w-full h-14 bg-indigo-50 dark:bg-indigo-900/20 text-primary rounded-xl hover:bg-indigo-100 transition-all border-2 border-indigo-100 dark:border-indigo-800 flex items-center gap-3 font-black uppercase italic tracking-tighter"
    >
      {loading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        <Volume2 size={24} />
      )}
      {language === "en-US" ? "Listen Intro" : "Öğretmeni Dinle"}
    </Button>
  );
};

export default VoiceTeacher;
