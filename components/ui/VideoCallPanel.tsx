'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Maximize, UserCheck, MessageSquare, Settings } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const VideoCallPanel = () => {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  const handleEnd = () => {
    if (confirm("Dersten ayrılmak istediğinize emin misiniz?")) {
      alert("Dersten başarıyla ayrıldınız.");
      window.location.reload();
    }
  };

  return (
    <Card className="p-0 overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-premium rounded-premium bg-slate-900 group relative flex flex-col h-[500px]">
       {/* Video Feed Placeholder */}
       <div className="flex-1 w-full relative bg-slate-950 flex items-center justify-center overflow-hidden">
          {cam ? (
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-slate-950 to-purple-500/10 flex flex-col items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-primary/20 blur-[100px] animate-pulse absolute" />
                <div className="z-10 text-center space-y-4">
                   <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-900 shadow-2xl">
                      <UserCheck size={48} />
                   </div>
                   <h3 className="font-black text-white text-4xl tracking-widest uppercase italic shadow-black drop-shadow-xl">Öğretmen Yayında</h3>
                   <span className="bg-indigo-600/30 text-indigo-300 font-black tracking-widest uppercase px-6 py-2 rounded-full border border-indigo-500/30">Fizik: Dinamik Giriş</span>
                </div>
             </div>
          ) : (
             <div className="flex flex-col items-center gap-6 text-slate-700">
                <div className="bg-slate-900 p-8 rounded-full border-4 border-slate-800">
                   <VideoOff size={64} />
                </div>
                <span className="font-black text-3xl tracking-widest uppercase italic opacity-20">Kamera Kapalı</span>
             </div>
          )}
          
          {/* Top right badges */}
          <div className="absolute top-8 right-8 flex gap-3 items-center z-10">
             <div className="bg-red-500 animate-pulse w-4 h-4 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)]" />
             <span className="text-white text-sm font-black bg-black/50 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20">CANLI YAYIN: 12:45</span>
          </div>

          <button className="absolute top-8 left-8 p-4 bg-black/30 hover:bg-black/50 text-white rounded-2xl transition-colors backdrop-blur-md" aria-label="Tam Ekran">
            <Maximize size={24} />
          </button>
       </div>

       {/* Controls */}
       <div className="p-8 bg-slate-950 flex justify-center gap-6 items-center shrink-0 border-t-4 border-slate-900">
          <button 
             onClick={() => { setMic(!mic); alert(`Mikrofon ${!mic ? 'Açıldı' : 'Kapatıldı'}`); }}
             className={`p-6 rounded-full transition-all border-4 ${mic ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-500/30'}`}
             aria-label={mic ? "Mikrofonu Kapat" : "Mikrofonu Aç"}
          >
             {mic ? <Mic size={32} /> : <MicOff size={32} />}
          </button>
          
          <button 
             onClick={() => { setCam(!cam); alert(`Kamera ${!cam ? 'Açıldı' : 'Kapatıldı'}`); }}
             className={`p-6 rounded-full transition-all border-4 ${cam ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-500/30'}`}
             aria-label={cam ? "Kamerayı Kapat" : "Kamerayı Aç"}
          >
             {cam ? <Video size={32} /> : <VideoOff size={32} />}
          </button>

          <button className="p-6 rounded-full bg-slate-900 border-4 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
             <Settings size={32} />
          </button>

          <Button 
            onClick={handleEnd}
            variant="danger" 
            className="h-20 px-10 rounded-full font-black text-2xl tracking-widest flex items-center gap-4 ml-6 shadow-2xl active:scale-95 transition-all uppercase italic"
          >
             <PhoneOff size={32} /> AYRIL
          </Button>
       </div>
    </Card>
  );
};

export default VideoCallPanel;
