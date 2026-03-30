'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AudioRecorderProps {
  onAudioReady: (base64Str: string | null) => void;
  maxDurationSeconds?: number;
}

export default function AudioRecorder({ onAudioReady, maxDurationSeconds = 45 }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          if (prev >= maxDurationSeconds) {
            stopRecording();
            toast.success(`Maksimum süre (${maxDurationSeconds}s) doldu. Kayıt tamamlandı.`);
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
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const objUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(objUrl);

        // Convert Blob to Base64 String
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onAudioReady(base64data);
        };

        // Stop all tracks to release mic
        stream.getTracks().forEach((track) => track.stop());
      };

      setTimeElapsed(0);
      setIsRecording(true);
      mediaRecorder.start();
      
      if ('vibrate' in navigator) navigator.vibrate(50);
    } catch (err) {
      toast.error('Mikrofon erişimi reddedildi veya hata oluştu.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if ('vibrate' in navigator) navigator.vibrate([20, 50, 20]);
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setTimeElapsed(0);
    chunksRef.current = [];
    onAudioReady(null);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-slate-50 border-4 border-slate-200 p-6 rounded-2xl w-full">
      <div className="flex flex-col gap-6">
        
        {/* State 1: Ready to Record or Recording */}
        {!audioUrl && (
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`
                w-24 h-24 rounded-full flex items-center justify-center transition-all focus:ring-8 outline-none shadow-lg
                ${isRecording ? 'bg-red-600 hover:bg-red-700 focus:ring-red-200 animate-pulse' : 'bg-slate-900 hover:bg-black focus:ring-slate-300 text-white'}
              `}
              aria-label={isRecording ? "Kaydı Durdur" : "Sesli Not Kaydetmeye Başla"}
            >
              {isRecording ? <Square size={36} className="text-white" fill="white" /> : <Mic size={48} />}
            </button>
            <div className="flex flex-col">
               <span className="text-3xl font-black text-slate-800">{formatTime(timeElapsed)} <span className="text-lg text-slate-500">/ {formatTime(maxDurationSeconds)}</span></span>
               <span className="text-lg font-bold text-slate-600 mt-1">
                 {isRecording ? 'Kayıt Devam Ediyor...' : 'Öğrencileriniz için sesli bir mesaj bırakın.'}
               </span>
            </div>
          </div>
        )}

        {/* State 2: Recorded */}
        {audioUrl && (
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 bg-green-50 text-green-800 p-4 border-4 border-green-200 rounded-xl mb-2">
                <CheckCircle2 size={32} />
                <span className="text-xl font-bold">Sesli Not Başarıyla Hazırlandı ({formatTime(timeElapsed)})</span>
             </div>
             
             <div className="flex items-center gap-4">
               {/* Standart A11y Audio Element */}
               <audio src={audioUrl} controls className="w-full h-16 rounded-lg bg-slate-100" aria-label="Kaydınızı dinleyin" />
               <button
                  type="button"
                  onClick={resetRecording}
                  className="bg-red-100 text-red-700 hover:bg-red-200 p-4 rounded-xl border-4 border-red-300 transition-colors focus:ring-4 outline-none"
                  aria-label="Kaydı Silip Yeniden Başla"
               >
                 <Trash2 size={28} />
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
