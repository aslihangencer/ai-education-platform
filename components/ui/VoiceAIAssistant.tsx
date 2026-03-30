'use client';

import React, { useState } from "react";
import { Mic, Volume2, Loader2, PlayCircle, Sparkles, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const VoiceAIAssistant = () => {
  const [text, setText] = useState("Merhaba! Ben Edu AI Asistan. Size nasıl yardımcı olabilirim?");
  const [language, setLanguage] = useState<"tr-TR" | "en-US">("tr-TR");
  const [loading, setLoading] = useState(false);

  const speak = async (msg: string, lang: "tr-TR" | "en-US") => {
    setLoading(true);
    const voiceName = lang === "tr-TR" ? "tr-TR-Wavenet-B" : "en-US-Journey-F";
    
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: msg, 
          languageCode: lang, 
          voiceName 
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
      alert(`AI Ses hatası: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-premium relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/20 p-4 rounded-2xl text-primary">
           <Volume2 size={32} />
        </div>
        <div>
           <h4 className="text-3xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white leading-none">AI Voice Assistant</h4>
           <p className="text-lg font-bold text-slate-400 mt-2 uppercase tracking-widest italic">Sesli Yapay Zeka Deneyimi</p>
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          className="w-full h-32 p-6 bg-slate-50 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 rounded-[1.5rem] text-xl font-bold text-slate-800 dark:text-white focus:border-primary focus:ring-8 ring-primary/10 transition-all resize-none outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Konuşmak istediğiniz metni yazın..."
        />
        
        <div className="flex flex-wrap gap-4 pt-2">
          <Button 
            onClick={() => { setLanguage("tr-TR"); speak(text, "tr-TR"); }}
            disabled={loading}
            className="flex-1 h-18 text-xl font-black gap-3 bg-secondary hover:bg-secondary-hover shadow-secondary/20"
          >
            {loading && language === "tr-TR" ? <Loader2 className="animate-spin" /> : <PlayCircle />}
            TÜRKÇE KONUŞTUR
          </Button>
          <Button 
            onClick={() => { setLanguage("en-US"); speak(text, "en-US"); }}
            disabled={loading}
            variant="outline"
            className="flex-1 h-18 text-xl font-black gap-3 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            {loading && language === "en-US" ? <Loader2 className="animate-spin" /> : <PlayCircle />}
            SPEAK ENGLISH
          </Button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t-2 border-slate-100 dark:border-slate-700 flex items-center gap-4">
         <div className="flex -space-x-3">
            {[1,2,3].map(i => (
               <div key={i} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900" />
            ))}
         </div>
         <span className="text-lg font-bold text-slate-400">Google Cloud Journey-F ses kalitesi</span>
      </div>
    </Card>
  );
};

export default VoiceAIAssistant;
