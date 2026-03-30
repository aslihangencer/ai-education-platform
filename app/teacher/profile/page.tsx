'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import VoiceRecorder from '@/components/VoiceRecorder';
import { UserCircle, UploadCloud, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function TeacherProfilePage() {
  const { data: session } = useSession();
  const [uploading, setUploading] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const handleBlobReady = (blob: Blob | null) => {
    setRecordedBlob(blob);
  };

  const handleSaveToStorage = async () => {
    if (!recordedBlob) {
      toast.error('Önce bir ses kaydı yapmalısınız.');
      return;
    }

    setUploading(true);
    const supabase = createClient();
    
    try {
      // 1. Eşsiz dosya adı oluştur (Örn: bios/userid-timestamp.webm)
      const fileExt = 'webm';
      const fileName = `bios/${session?.user?.id || 'anon'}-${Date.now()}.${fileExt}`;

      // 2. Supabase Storage'a Yükle (teacher-assets bucket'ı public olmalı)
      const { data, error: uploadError } = await supabase.storage
        .from('teacher-assets')
        .upload(fileName, recordedBlob, {
          contentType: 'audio/webm',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // 3. Public URL'i Al
      const { data: { publicUrl } } = supabase.storage
        .from('teacher-assets')
        .getPublicUrl(fileName);

      // 4. Veritabanını Güncelle (API Çağrısı)
      const res = await fetch('/api/teacher/update-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bioAudioUrl: publicUrl }),
      });

      if (res.ok) {
        toast.success('Duygusal Profil Kaydınız başarıyla yayımlandı! ✨');
        if ('vibrate' in navigator) navigator.vibrate([50, 100, 50]);
      } else {
        toast.error('Veritabanı güncellenemedi.');
      }
    } catch (e: any) {
      console.error('Upload Error:', e);
      toast.error('Hata: ' + (e.message || 'Yükleme başarısız oldu.'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="border-b-8 border-slate-200 pb-8">
        <h1 className="text-5xl font-black text-slate-900 flex items-center gap-6" tabIndex={0}>
          <UserCircle size={64} className="text-blue-700"/>
          Profil ve Karakter Arayüzü
        </h1>
        <p className="text-2xl text-slate-600 font-bold mt-4 italic" tabIndex={0}>
          Öğrencileriniz sizi duyduğunda bir bağ kurar. Görme engelli öğrencileriniz için samimi bir profil sesi bırakın.
        </p>
      </header>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-slate-100 space-y-8">
        <div className="bg-slate-50 p-6 rounded-3xl border-4 border-dashed border-slate-200">
          <p className="text-xl font-bold text-slate-500 mb-4 uppercase tracking-widest text-center">
            Aşama 1: Kaydınızı Gerçekleştirin
          </p>
          <VoiceRecorder onBlobReady={handleBlobReady} />
        </div>

        {recordedBlob && (
          <div className="p-8 bg-blue-50 rounded-[2.5rem] border-4 border-blue-200 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4 text-blue-800">
              <UploadCloud size={40} />
              <h2 className="text-3xl font-black italic">Aşama 2: Yayına Al</h2>
            </div>
            
            <p className="text-xl font-bold text-blue-700">
              Kaydınız hazır. Bu sesi profilinize sabitlemek için aşağıdaki dev butona basın.
            </p>

            <button
              onClick={handleSaveToStorage}
              disabled={uploading}
              className="w-full min-h-[100px] bg-blue-700 text-white text-4xl font-black rounded-[2rem] shadow-2xl hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-6 focus:ring-8 focus:ring-blue-300 outline-none disabled:bg-slate-400"
              aria-label="Sesi Profilime Kaydet ve Yayına Al"
            >
              {uploading ? (
                <span className="flex items-center gap-4 animate-pulse">
                  Yükleniyor...
                </span>
              ) : (
                <>
                  <CheckCircle2 size={48} /> KAYDET VE YAYINLA
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <footer className="bg-slate-900 text-white p-8 rounded-3xl">
        <h3 className="text-xl font-black mb-2 uppercase tracking-widest text-slate-400">Önemli Hatırlatma</h3>
        <p className="text-lg font-bold">
          Kaydınızı yaptıktan sonra "Kaydet ve Yayınla" butonuna basmayı unutmayın. Bu işlem sesinizi bulut sunucularımıza güvenle taşıyacaktır.
        </p>
      </footer>
    </div>
  );
}
