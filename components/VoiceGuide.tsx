'use client';

import { useEffect, useState } from 'react';
import { speak, stopSpeaking } from '@/lib/tts';
import { Ear } from 'lucide-react';

export default function VoiceGuide({ text }: { text: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Announce when mounted
    speak(text);
    setIsSpeaking(true);

    return () => {
       stopSpeaking();
    };
  }, [text]);

  const handleRepeat = () => {
    speak(text);
  };

  return (
    <button 
      onClick={handleRepeat}
      className="w-full flex items-center justify-center gap-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-2xl py-6 rounded-3xl mb-8 focus:ring-8 focus:ring-slate-900 border-4 border-black transition-transform active:scale-95"
      aria-label={`Geçerli metni tekrar dinle: ${text}`}
    >
      <Ear size={36} />
      <span>Tekrar Seslendir</span>
    </button>
  );
}
