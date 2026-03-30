'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';

interface AudioPlayerProps {
  base64AudioUrl: string; // Real base64 string directly from DB
  title?: string;
}

export default function AudioPlayer({ base64AudioUrl, title = 'Eğitmen Sesli Notu' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // When audio URL changes, create object
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const syncTime = () => setProgress((audio.currentTime / audio.duration) || 0);
    const setEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('ended', setEnded);

    return () => {
      audio.removeEventListener('timeupdate', syncTime);
      audio.removeEventListener('ended', setEnded);
    };
  }, [base64AudioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    if ('vibrate' in navigator) navigator.vibrate(30);
  };

  return (
    <div className="w-full bg-slate-100 p-8 rounded-3xl border-8 border-slate-300 flex flex-col items-center shadow-lg my-8">
      
      {/* Geri Planda Çalışan Standart Öğretmen Sesi (Görme engelli standartlarını bozmamak için native) */}
      <audio ref={audioRef} src={base64AudioUrl} className="hidden" aria-hidden="true" />

      <h3 className="text-3xl font-black text-slate-800 mb-6 w-full text-center" tabIndex={0}>
        🔊 {title}
      </h3>

      <button
        onClick={togglePlay}
        className={`
          w-full max-w-sm h-32 rounded-[2rem] flex items-center justify-center gap-6 shadow-[0_8px_0_0_rgba(0,0,0,0.2)] focus:ring-8 outline-none transition-all active:scale-95 active:translate-y-2
          ${isPlaying ? 'bg-slate-300 text-slate-700 focus:ring-slate-400' : 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-400'}
        `}
        aria-label={isPlaying ? "Durdur" : "Eğitmenin Sesini Oynat"}
      >
        {isPlaying ? <PauseCircle size={64} /> : <PlayCircle size={64} fill="white" />}
        <span className="text-4xl font-black">{isPlaying ? "Durdur" : "Dinle"}</span>
      </button>

      {/* Progress Bar (Görüntüleme Amaçlı, büyük) */}
      <div className="w-full h-8 bg-slate-300 mt-8 rounded-full overflow-hidden border-2 border-slate-400" aria-label={`Sesli mesaj ilerleme durumu: %${Math.round(progress * 100)}`}>
         <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${progress * 100}%` }}></div>
      </div>
    </div>
  );
}
