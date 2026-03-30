'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import VoiceGuide from '@/components/VoiceGuide';
import BigButton from '@/components/BigButton';
import { FileText, Upload, CheckCircle2, BookOpen, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StudentPdfReaderPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; summary: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Lütfen geçerli bir PDF dökümanı seçin.');
        return;
      }
      setFile(selectedFile);
      toast.success(`${selectedFile.name} başarıyla seçildi.`);
      if ('vibrate' in navigator) navigator.vibrate(50);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Önce bir PDF dökümanı yüklemelisiniz.');
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/materials/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ title: data.title, summary: data.summary });
        toast.success('Ders notunuz başarıyla analiz edildi! 🧠✨');
        if ('vibrate' in navigator) navigator.vibrate([50, 100, 50]);
      } else {
        toast.error(data.error || 'Analiz sırasında bir hata oluştu.');
      }
    } catch (e) {
      console.error('PDF Upload Error:', e);
      toast.error('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 🟢 SESLİ REHBER: Duruma göre öğrenciyi yönlendirir */}
      <VoiceGuide 
        text={
          loading 
            ? "Dosyanız yapay zeka tarafından analiz ediliyor, lütfen bekleyiniz." 
            : result 
              ? `Analiz tamamlandı. ${result.title} dersi için oluşturduğum özeti şimdi okuyorum: ${result.summary}`
              : "Ders notu yükleme sayfasındasınız. Lütfen bir PDF dosyası seçip yükleyiniz."
        } 
      />

      <header className="border-b-8 border-slate-200 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 flex items-center gap-6" tabIndex={0}>
            <FileText size={64} className="text-blue-700"/>
            AI Ders Analizörü
          </h1>
          <p className="text-2xl text-slate-600 font-bold mt-4 italic" tabIndex={0}>
            Her dökümanı senin için erişilebilir bir sesli kitaba dönüştürür.
          </p>
        </div>
      </header>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-slate-100 space-y-8">
        
        {/* 📚 DOSYA SEÇİM ALANI */}
        {!result && (
          <div className="space-y-6">
            <label className="block bg-slate-50 p-12 rounded-[2.5rem] border-8 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group text-center focus-within:ring-8 ring-blue-300">
              <input 
                type="file" 
                className="sr-only" 
                accept="application/pdf" 
                onChange={handleFileChange}
                disabled={loading}
              />
              <div className="flex flex-col items-center gap-6">
                <Upload size={80} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-3xl font-black text-slate-700 group-hover:text-blue-700 transition-colors">
                  {file ? file.name : "PDF Dökümanını Buraya Bırak"}
                </span>
                <span className="text-xl font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  Basmak için dokunun veya tıklayın
                </span>
              </div>
            </label>

            {file && !loading && (
              <BigButton 
                label="ANALİZİ BAŞLAT (AI ÖZET)" 
                onClick={handleUpload} 
                primary={true} 
              />
            )}

            {loading && (
              <div className="p-12 text-center bg-blue-50 rounded-[2.5rem] border-4 border-blue-200 flex flex-col items-center gap-6 animate-pulse">
                <Loader2 size={64} className="animate-spin text-blue-600" />
                <p className="text-3xl font-black text-blue-900 uppercase tracking-widest">
                  Yapay Zeka Analiz Ediyor...
                </p>
              </div>
            )}
          </div>
        )}

        {/* 🧠 ANALİZ SONUCU GÖRÜNÜMÜ */}
        {result && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-6 text-green-700 border-b-4 border-green-100 pb-6">
              <CheckCircle2 size={56} />
              <h2 className="text-4xl font-black">{result.title} - AI Özeti</h2>
            </div>
            
            <article className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl border-8 border-slate-800">
              <p className="text-2xl font-bold leading-[2.5rem] whitespace-pre-wrap tracking-wide" tabIndex={0}>
                {result.summary}
              </p>
            </article>

            <div className="flex flex-col md:flex-row gap-6">
               <BigButton 
                 label="Diğer Notlarıma Bak" 
                 onClick={() => router.push('/student/lessons')} 
                 className="bg-slate-700 hover:bg-slate-800"
               />
               <BigButton 
                 label="Yeni PDF Analiz Et" 
                 onClick={() => {
                   setResult(null);
                   setFile(null);
                 }} 
               />
            </div>
          </div>
        )}
      </div>

      <footer className="bg-blue-900 text-white p-10 rounded-[3rem] border-b-8 border-blue-950">
        <div className="flex items-start gap-6">
          <BookOpen size={48} className="text-blue-300" />
          <div>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-widest text-blue-300 italic">Erişilebilirlik Notu</h3>
            <p className="text-xl font-bold leading-relaxed">
              Yüklediğin döküman metne dökülürken tablolar, formüller ve görsel hiyerarşi "anlamlı bir hikaye" olarak yeniden yazılır. Analiz bittiğinde sonuçlar otomatik olarak seslendirilecektir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
