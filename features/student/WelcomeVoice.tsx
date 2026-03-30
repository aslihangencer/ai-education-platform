"use client";

import { useEffect, useState, useRef } from "react";
import { getStudentAchievementStory } from "@/app/actions/get-achievement-story";
import { Volume2, Trophy, Loader2, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";

/**
 * WelcomeVoice:
 * A premium Student Greeting component that uses the 
 * Web Speech API to read out personalized AI achievement stories.
 * Designed for high accessibility and motivational student engagement.
 */
export const WelcomeVoice = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }

    const fetchAndSpeak = async () => {
      try {
        const result = await getStudentAchievementStory();
        setData(result);
        
        if (result.success && result.story) {
           speak(result.story);
        }
      } catch (err) {
        console.error("WelcomeVoice Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSpeak();

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel(); // Stop ongoing speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  return (
    <Card className="p-10 bg-gradient-to-br from-blue-700 to-indigo-900 text-white rounded-[4rem] border-8 border-slate-900 shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group animate-in fade-in zoom-in duration-700">
      
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all pointer-events-none transform group-hover:scale-110">
         <Trophy size={200} />
      </div>
      <div className="absolute bottom-0 left-0 p-8 opacity-5">
         <Sparkles size={80} />
      </div>

      <div className="relative z-10 space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className={`p-5 rounded-3xl bg-white/10 backdrop-blur-lg border-2 border-white/20 ${isSpeaking ? 'animate-pulse' : ''}`}>
                 {loading ? <Loader2 className="animate-spin" size={32} /> : <Volume2 size={32} />}
              </div>
              <div>
                 <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">HAFTALIK BAŞARI HİKAYEN</h2>
                 <p className="text-xl font-bold opacity-60 italic mt-1">Seni gururlandıracak bir özetimiz var!</p>
              </div>
           </div>
           
           {!loading && (
             <button 
               onClick={() => data?.story && speak(data.story)}
               className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all border-2 border-white/20"
               aria-label="Tekrar Oynat"
             >
                <TrendingUp size={24} />
             </button>
           )}
        </header>

        {/* Content */}
        <div className="min-h-[100px] flex items-center">
           {loading ? (
             <div className="space-y-4 w-full">
                <div className="h-4 bg-white/20 rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-white/20 rounded-full w-1/2 animate-pulse" />
             </div>
           ) : (
             <p className="text-3xl font-black leading-tight italic tracking-tight drop-shadow-lg">
                "{data?.story || "Haftalık başarıların hesaplanıyor..."}"
             </p>
           )}
        </div>

        {/* Dynamic Badges */}
        {!loading && data?.stats && (
           <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest italic shadow-xl">
                 SESLİ ÖZET AKTİF
              </div>
              {data.stats.totalSolved > 0 && (
                <div className="bg-indigo-500 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest italic shadow-xl border-2 border-indigo-400">
                   {data.stats.totalSolved} SORU ÇÖZÜLDÜ
                </div>
              )}
           </div>
        )}
      </div>

    </Card>
  );
};

export default WelcomeVoice;
