'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface VoiceRecorderProps {
  onSave?: (base64Str: string | null) => void;
  onBlobReady?: (blob: Blob | null) => void;
  maxDurationSeconds?: number;
}

export default function VoiceRecorder({ onSave, onBlobReady, maxDurationSeconds = 45 }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Süre Sınırı Kontrolü (Veritabanı şişmesin diye)
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          if (prev >= maxDurationSeconds) {
            stopRecording();
            toast.success(`Maksimum süre (${maxDurationSeconds}s) doldu. Kayıt durduruldu.`);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, maxDurationSeconds]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setBlob(audioBlob);
        
        // Sesi (Blob) Base64 String'ine (Geriye Dönük Uyumluluk için) çeviriyoruz
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob); 
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setAudioURL(base64String); // Önizleme için setle
          onSave?.(base64String); // Eğer varsa eski API için ilet
          onBlobReady?.(audioBlob); // Yeni Storage API için ham dosyayı ilet
        };

        // Mikrofonu kapat
        stream.getTracks().forEach((track) => track.stop());
      };

      setTimeElapsed(0);
      setIsRecording(true);
      mediaRecorder.current.start();
      
      // Haptic Titreşim (Erişilebilirlik)
      if ('vibrate' in navigator) navigator.vibrate(50);
    } catch (err) {
      toast.error('Mikrofon erişimi reddedildi veya bulunamadı.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
      // Haptic Titreşim
      if ('vibrate' in navigator) navigator.vibrate([20, 50, 20]);
    }
  };

  const resetRecording = () => {
    setAudioURL(null);
    setBlob(null);
    setTimeElapsed(0);
    audioChunks.current = [];
    onSave?.(null);
    onBlobReady?.(null);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="p-8 border-4 border-slate-300 rounded-3xl flex flex-col gap-6 bg-white shadow-sm">
      <h3 className="text-2xl font-black text-slate-800">Sesli Notunu Kaydet</h3>
      
      {!audioURL && (
        <div className="flex flex-col md:flex-row items-center gap-6">
          {!isRecording ? (
            <button 
              type="button"
              onClick={startRecording}
              className="w-full md:w-auto bg-blue-700 text-white min-h-[80px] px-10 text-2xl font-black rounded-[2rem] hover:bg-blue-800 transition-all active:scale-95 focus:outline-none focus:ring-8 focus:ring-blue-300 shadow-xl flex items-center justify-center gap-4"
              aria-label="Kaydı Başlat"
            >
              <Mic size={36} /> Kayda Başla
            </button>
          ) : (
            <button 
              type="button"
              onClick={stopRecording}
              className="w-full md:w-auto bg-red-600 text-white min-h-[80px] px-10 text-2xl font-black rounded-[2rem] hover:bg-red-700 transition-all active:scale-95 focus:outline-none focus:ring-8 focus:ring-red-300 shadow-xl animate-pulse flex items-center justify-center gap-4"
              aria-label="Kaydı Durdur"
            >
              <Square size={36} fill="white" /> Kaydı Durdur ({formatTime(timeElapsed)})
            </button>
          )}
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
             <span className="text-lg font-bold text-slate-500">
               {isRecording ? 'Dinliyorum...' : `Maksimum ${maxDurationSeconds} saniye süreniz bulunmaktadır.`}
             </span>
             {isRecording && <span className="text-3xl font-black text-red-600">{formatTime(timeElapsed)}</span>}
          </div>
        </div>
      )}

      {audioURL && (
        <div className="mt-4 flex flex-col gap-4 bg-slate-50 p-6 rounded-2xl border-4 border-slate-200">
          <div className="flex items-center gap-4 text-green-700">
             <CheckCircle2 size={32} />
             <p className="text-xl font-bold mb-1">Önizleme (Kayıt Hazır):</p>
          </div>
          
          <div className="flex items-center gap-4">
             <audio src={audioURL} controls className="w-full h-16 rounded-xl" aria-label="Kaydedilen ses önizlemesi" />
             <button
                type="button"
                onClick={resetRecording}
                className="bg-red-100 text-red-700 hover:bg-red-200 p-4 rounded-xl border-4 border-red-300 transition-colors focus:ring-4 outline-none active:scale-95"
                aria-label="Kaydı Silip Yeniden Başla"
             >
               <Trash2 size={28} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
