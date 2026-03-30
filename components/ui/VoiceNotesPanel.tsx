'use client';

import React, { useState } from 'react';
import { Play, Pause, Trash2, Mic, AudioLines, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface VoiceNote {
  title: string;
  duration: string;
}

export const VoiceNotesPanel = ({ notes }: { notes: VoiceNote[] }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const togglePlay = (idx: number) => {
    if (playingId === idx) {
       setPlayingId(null);
       alert(`⏯️ "${notes[idx].title}" duraklatıldı.`);
    } else {
       setPlayingId(idx);
       alert(`🎵 "${notes[idx].title}" oynatılıyor...`);
    }
  };

  const handleDelete = (idx: number) => {
    if (confirm(`"${notes[idx].title}" sesli notunu silmek istiyor musunuz?`)) {
       alert("Sesli not başarıyla silindi (Simülasyon).");
    }
  };

  return (
    <Card className="p-10 bg-slate-900 border-none shadow-2xl rounded-[3rem] text-white overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-full h-2 bg-purple-500 animate-pulse" />
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
         <div className="flex items-center gap-4">
            <div className="bg-purple-500/20 text-purple-400 p-4 rounded-2xl border border-purple-500/30"><Mic size={32} /></div>
            <div>
               <h3 className="text-3xl font-black uppercase italic tracking-tight">Sesli Notlarım</h3>
               <p className="text-slate-500 font-bold text-lg uppercase tracking-widest mt-1 italic">Yapay Zeka Destekli Kayıtlar</p>
            </div>
         </div>
         <Volume2 size={32} className="text-slate-700" />
      </div>

      <div className="space-y-4">
         {(notes.length > 0 ? notes : [
           { title: "Henüz sesli not bulunmuyor", duration: "0:00" }
         ]).map((note, i) => {
           const isPlaying = playingId === i;
           return (
             <div 
               key={i} 
               className={`p-6 rounded-[2rem] transition-all border-4 flex items-center justify-between ${
                 isPlaying 
                 ? 'bg-purple-600 border-purple-500 shadow-xl shadow-purple-500/20' 
                 : 'bg-slate-800 border-slate-700 hover:border-slate-500 cursor-pointer'
               }`}
               onClick={() => togglePlay(i)}
             >
                <div className="flex items-center gap-6">
                   <button 
                     className={`p-5 rounded-full transition-all active:scale-90 ${isPlaying ? 'bg-white text-purple-600 scale-110 shadow-lg' : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 shadow-inner'}`}
                     aria-label={isPlaying ? "Durdur" : "Oynat"}
                   >
                     {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current" />}
                   </button>
                   <div>
                      <p className="font-black text-2xl leading-tight mb-1">{note.title}</p>
                      <p className={`text-lg tracking-widest font-extrabold uppercase ${isPlaying ? 'text-purple-200' : 'text-slate-500'}`}>{note.duration}</p>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                  {isPlaying && <AudioLines className="text-white animate-pulse" size={32} />}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(i); }}
                    className="p-4 text-slate-500 hover:text-red-500 transition-colors hover:bg-slate-900 rounded-2xl" 
                    aria-label="Sil"
                  >
                     <Trash2 size={24} />
                  </button>
                </div>
             </div>
           );
         })}
      </div>
    </Card>
  );
};

export default VoiceNotesPanel;
