'use client';

import { useState, useRef } from 'react';
import BigButton from '@/components/BigButton';
import VoiceGuide from '@/components/VoiceGuide';
import { describeImage } from '@/lib/aiVision';
import { speak } from '@/lib/tts';
import { Camera, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VisionPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosya Yükleme (Kamera veya Galeri) Olayı
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
    
    setLoading(true);
    setResult('Lütfen bekleyin, yapay zeka görüntüyü inceliyor...');
    speak('Lütfen bekleyin, yapay zeka görüntüyü inceliyor...');
    toast('Görsel Analiz Ediliyor...', { icon: '🤖' });

    try {
      const desc = await describeImage(file);
      setResult(desc);
      speak(desc); // Ekran okuyucu seslendirir
    } catch (err) {
      const errText = 'Sistem hatası. Lütfen tekrar deneyin.';
      setResult(errText);
      speak(errText);
    } finally {
      setLoading(false);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <VoiceGuide text="Görsel Betimleme Sayfası. Kamerayı aç butonuna tıklayıp fotoğraf çekerseniz, yapay zeka ne olduğunu size anlatacaktır." />

      <h1 className="text-4xl md:text-5xl font-black text-center w-full pb-6 border-b-8 border-slate-200" tabIndex={0}>
        Çevreyi Seslendir
      </h1>

      {/* Hidden input to directly open mobile camera */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" // Forces the mobile back camera explicitly
        ref={fileInputRef} 
        onChange={handleUpload} 
        className="hidden" 
        aria-hidden="true" 
      />

      <button 
        onClick={triggerCamera}
        disabled={loading}
        className={`
          w-full 
          min-h-[120px] 
          text-3xl 
          font-black 
          rounded-3xl 
          my-4
          px-8
          flex flex-col items-center justify-center gap-4 text-center
          focus:outline-none focus:ring-8 focus:ring-yellow-400 focus:ring-offset-4
          transition-transform active:scale-95 shadow-[0_8px_0_0_rgba(0,0,0,0.2)]
          ${loading ? 'bg-slate-300 text-slate-500' : 'bg-slate-900 hover:bg-black text-white'}
        `}
        aria-label={loading ? "Lütfen bekleyin, fotoğraf analiz ediliyor..." : "Kamerayı Aç ve Algıla"}
      >
        {loading ? (
          <RefreshCw size={56} className="animate-spin" />
        ) : (
          <Camera size={56} />
        )}
        <span>{loading ? "Analiz Ediliyor..." : "Kamerayı Aç"}</span>
      </button>

      {/* Sonuç Alanı */}
      {result && (
        <div 
          className="w-full mt-8 p-8 border-8 border-yellow-400 bg-yellow-50 rounded-3xl"
          tabIndex={0} 
          aria-live="polite"
        >
          <h2 className="text-3xl font-black mb-4">Görselin Anlamı:</h2>
          <p className="text-2xl font-bold leading-relaxed">{result}</p>
        </div>
      )}

      {/* Tekrar Oku Butonu */}
      {result && !loading && (
        <BigButton 
          label="Tekrar Oku" 
          onClick={() => speak(result)} 
          primary={false} 
          className="mt-8 border-yellow-400 bg-yellow-100"
        />
      )}
    </div>
  );
}
