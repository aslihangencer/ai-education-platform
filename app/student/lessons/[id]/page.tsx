'use client';

import useSWR from 'swr';
import BigButton from '@/components/BigButton';
import VoiceGuide from '@/components/VoiceGuide';
import AudioPlayer from '@/components/AudioPlayer';
import { useRouter } from 'next/navigation';
import { speak, stopSpeaking } from '@/lib/tts';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function StudentLessonDetailPage({ params }: { params: { id: string } }) {
  const { data: lesson, error } = useSWR(`/api/lessons/${params.id}`, fetcher);
  const router = useRouter();

  if (!lesson && !error) {
    return <div className="text-4xl font-black text-center p-20 animate-pulse" aria-live="polite">Ders Yükleniyor...</div>;
  }

  if (error || !lesson || lesson.error) {
    return (
      <div className="w-full text-center p-16 bg-white rounded-3xl border-8 border-dashed border-red-300">
         <p className="text-3xl font-black text-red-600 mb-4 tracking-tight">Ders yüklenemedi.</p>
         <p className="text-xl font-bold text-slate-500 mb-8">{lesson?.error || 'Silinmiş veya hatalı olabilir.'}</p>
         <BigButton label="Geri Dön" onClick={() => router.back()} primary={true} />
      </div>
    );
  }

  const handleManualPlay = () => {
    speak(`${lesson.title}. ${lesson.content}`);
  };

  const handleStop = () => {
    stopSpeaking();
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Otomatik ders okuma */}
      <VoiceGuide text={`${lesson.title} dersine girdiniz. Okumayı dilediğiniz an durdurabilir veya alttaki büyük butonlarla kontrol edebilirsiniz.`} />

      <h1 className="text-4xl md:text-5xl font-black text-center w-full pb-6 border-b-8 border-slate-200 focus:outline-none focus:ring-8 focus:ring-yellow-400 py-4 mb-4" tabIndex={0}>
        {lesson.title}
      </h1>

      <div className="w-full bg-white p-8 md:p-12 rounded-3xl border-4 border-slate-300 shadow-xl mb-12">
         <p className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-800" tabIndex={0}>
            {lesson.content}
         </p>
      </div>

      {lesson.audioUrl && (
         <div className="w-full mb-8">
            <AudioPlayer base64AudioUrl={lesson.audioUrl} title="Öğretmeninizin Özel Sesli Notu" />
         </div>
      )}

      <BigButton 
        label="Dersi Boydan Boya Seslendir"
        onClick={handleManualPlay}
        primary={true}
        className="bg-blue-700 hover:bg-blue-800"
      />

      <BigButton 
        label="Sesi Durdur"
        onClick={handleStop}
        primary={false}
        className="border-red-600 text-red-600 hover:bg-red-50"
      />

      <BigButton 
        label="Dersleri Öğrendim, Geri Dön"
        onClick={() => {
          stopSpeaking();
          router.push('/student/lessons');
        }}
        primary={false}
      />
      
    </div>
  );
}
