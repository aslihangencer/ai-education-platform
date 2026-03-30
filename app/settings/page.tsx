'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import VoiceGuide from '@/components/VoiceGuide';
import BigButton from '@/components/BigButton';
import { Settings, Volume2, Eye, Gauge, Save, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [preferences, setPreferences] = useState({
    highContrast: false,
    preferredSpeed: 1.0,
    isTtsEnabled: true,
  });
  const [loading, setLoading] = useState(false);

  // Initial load from session/DB
  useEffect(() => {
    if (session?.user) {
      setPreferences({
        highContrast: session.user.highContrast || false,
        preferredSpeed: session.user.preferredSpeed || 1.0,
        isTtsEnabled: session.user.isTtsEnabled ?? true,
      });
    }
  }, [session]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (res.ok) {
        toast.success('Ayarlarınız başarıyla kaydedildi! ✨');
        // Update local session
        await update();
        if ('vibrate' in navigator) navigator.vibrate(50);
      } else {
        toast.error('Ayarlar kaydedilemedi.');
      }
    } catch (e) {
      toast.error('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  const announce = (text: string) => {
    if (!preferences.isTtsEnabled) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'tr-TR';
    msg.rate = preferences.preferredSpeed;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className={`max-w-4xl mx-auto p-10 space-y-12 animate-in fade-in duration-500 ${preferences.highContrast ? 'bg-black text-yellow-400' : ''}`}>
      
      <VoiceGuide 
        text={preferences.isTtsEnabled ? "Ayarlar sayfasındasınız. Erişilebilirlik tercihlerinizi buradan kişiselleştirebilirsiniz." : ""} 
      />

      <header className="border-b-8 border-slate-200 pb-8 flex justify-between items-center">
        <div>
          <h1 className="text-6xl font-black flex items-center gap-6">
            <Settings size={64} className="text-blue-600" />
            Tercihlerim
          </h1>
          <p className="text-2xl font-bold text-slate-500 mt-4 italic uppercase tracking-widest">
            Kişiselleştirilmiş Eğitim Deneyimi
          </p>
        </div>
        <button 
          onClick={() => signOut()}
          className="p-6 bg-red-100 text-red-700 rounded-3xl hover:bg-red-200 border-4 border-red-300"
          aria-label="Güvenli Çıkış Yap"
        >
          <LogOut size={48} />
        </button>
      </header>

      <div className={`p-10 rounded-[3rem] shadow-2xl border-8 ${preferences.highContrast ? 'border-yellow-400 bg-slate-900' : 'border-slate-100 bg-white'} space-y-12`}>
        
        {/* 1. YÜKSEK KONTRAST */}
        <section className="flex items-center justify-between p-8 rounded-3xl border-4 border-slate-200">
          <div className="flex items-center gap-6">
            <Eye size={48} className="text-blue-500" />
            <div>
              <h2 className="text-3xl font-black">Yüksek Kontrast</h2>
              <p className="text-xl font-bold opacity-70">Görsel belirginliği artırır (Sarı-Siyah Tema).</p>
            </div>
          </div>
          <button 
            onClick={() => {
              const newVal = !preferences.highContrast;
              setPreferences({...preferences, highContrast: newVal });
              announce(newVal ? "Yüksek kontrast açıldı." : "Yüksek kontrast kapatıldı.");
            }}
            className={`w-32 h-16 rounded-full p-2 transition-colors relative ${preferences.highContrast ? 'bg-green-500' : 'bg-slate-300'}`}
            aria-checked={preferences.highContrast}
            role="switch"
          >
            <div className={`w-12 h-12 bg-white rounded-full transition-transform ${preferences.highContrast ? 'translate-x-16' : 'translate-x-0'}`} />
          </button>
        </section>

        {/* 2. SESLİ BİLDİRİMLER (TTS) */}
        <section className="flex items-center justify-between p-8 rounded-3xl border-4 border-slate-200">
          <div className="flex items-center gap-6">
            <Volume2 size={48} className="text-purple-500" />
            <div>
              <h2 className="text-3xl font-black">Sesli Asistan</h2>
              <p className="text-xl font-bold opacity-70">Sayfa geçişlerinde otomatik bilgilendirme yapar.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              const newVal = !preferences.isTtsEnabled;
              setPreferences({...preferences, isTtsEnabled: newVal });
              if (newVal) announce("Sesli asistan aktifleştirildi.");
            }}
            className={`w-32 h-16 rounded-full p-2 transition-colors relative ${preferences.isTtsEnabled ? 'bg-green-500' : 'bg-slate-300'}`}
            aria-checked={preferences.isTtsEnabled}
            role="switch"
          >
            <div className={`w-12 h-12 bg-white rounded-full transition-transform ${preferences.isTtsEnabled ? 'translate-x-16' : 'translate-x-0'}`} />
          </button>
        </section>

        {/* 3. OKUMA HIZI */}
        <section className="p-8 rounded-3xl border-4 border-slate-200 space-y-6">
          <div className="flex items-center gap-6">
            <Gauge size={48} className="text-orange-500" />
            <h2 className="text-3xl font-black">Okuma Hızı ({preferences.preferredSpeed.toFixed(1)}x)</h2>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="2.0" 
            step="0.1"
            value={preferences.preferredSpeed}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setPreferences({...preferences, preferredSpeed: val});
            }}
            onMouseUp={() => announce(`Hız ${preferences.preferredSpeed.toFixed(1)} katına ayarlandı.`)}
            className="w-full h-8 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            aria-label="Sesli okuma hızı çubuğu"
          />
          <div className="flex justify-between text-xl font-black px-2 uppercase">
            <span>Yavaş</span>
            <span>Normal</span>
            <span>Hızlı</span>
          </div>
        </section>

        {/* KAYDET BUTONU */}
        <div className="pt-8">
          <BigButton 
            label={loading ? "KAYDEDİLİYOR..." : "AYARLARI KAYDET"} 
            onClick={handleSave} 
            primary={true} 
            className="min-h-[100px] text-4xl"
          >
            <Save size={40} className="mr-4" />
          </BigButton>
        </div>

      </div>
    </div>
  );
}
