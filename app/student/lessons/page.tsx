'use client';

import useSWR from 'swr';
import BigButton from '@/components/BigButton';
import VoiceGuide from '@/components/VoiceGuide';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function StudentLessonsList() {
  const { data, error } = useSWR('/api/lessons', fetcher);
  const router = useRouter();

  // Show loading state if data is missing and there's no error
  if (!data && !error) {
    return <div className="text-4xl font-black text-center p-20 animate-pulse" aria-live="polite">Dersler Aranıyor...</div>;
  }

  // Ensure lessons is ALWAYS an array even if API returns an error object
  const lessons = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <VoiceGuide text="Ders listesi. Açık olan tüm dersleri burada görebilir ve dinleyebilirsiniz." />

      <h1 className="text-4xl md:text-5xl font-black text-center w-full pb-6 border-b-8 border-slate-200 focus:outline-none focus:ring-8 focus:ring-yellow-400 py-4 mb-4" tabIndex={0}>
        Açık Dersler
      </h1>

      {lessons.length === 0 && (
         <div className="w-full text-center p-16 bg-white rounded-3xl border-8 border-dashed border-slate-300" tabIndex={0}>
            <p className="text-2xl font-bold text-slate-500">
               {error || (data && !Array.isArray(data)) 
                 ? "Dersler yüklenirken bir hata oluştu." 
                 : "Şu an atanmış bir ders görünmüyor."}
            </p>
         </div>
      )}

      {lessons.map((lesson: any) => (
        <BigButton 
          key={lesson.id}
          label={`Dersi Aç: ${lesson.title}`}
          onClick={() => router.push(`/student/lessons/${lesson.id}`)}
          primary={true}
        />
      ))}
      
    </div>
  );
}
