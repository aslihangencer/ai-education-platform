'use client';

import useSWR from 'swr';
import { UserCircle, Activity } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TeacherStudentsPage() {
  const { data: students, error } = useSWR('/api/students', fetcher);

  if (!students && !error) {
    return <div className="p-12 text-3xl font-black text-slate-400 animate-pulse text-center" aria-live="polite">Öğrenci listesi yükleniyor...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="border-b-4 border-slate-200 pb-6">
        <h1 className="text-4xl font-black text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500 rounded px-1" tabIndex={0}>
          Sınıf ve Öğrenci Takibi
        </h1>
        <p className="text-xl text-slate-600 font-semibold mt-2" tabIndex={0}>Sisteme kayıtlı öğrencilerin erişilebilirlik ayarlarını ve ilerlemelerini izleyin.</p>
      </header>

      {Array.isArray(students) && students.length === 0 && (
         <div className="text-center p-16 bg-white rounded-2xl border-4 border-dashed border-slate-300" tabIndex={0}>
           <p className="text-2xl font-bold text-slate-500">Henüz kayıtlı bir öğrenci bulunmuyor.</p>
        </div>
      )}

      {Array.isArray(students) && students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {students.map((student: any) => {
            const completedCount = student.enrolledLessons?.filter((l: any) => l.completed).length || 0;
            const totalCount = student.enrolledLessons?.length || 0;
            
            return (
              <article key={student.id} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-100 flex flex-col items-center hover:-translate-y-1 transition-transform focus-within:ring-4 focus-within:ring-blue-400">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 mb-6">
                  <UserCircle size={64} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2 truncate w-full text-center" tabIndex={0}>{student.name}</h3>
                <p className="text-lg text-slate-500 font-bold mb-6 truncate w-full text-center">{student.email}</p>
                
                <div className="w-full space-y-3">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl" tabIndex={0} aria-label={`Dinleme hızı: ${student.preferredSpeed}x`}>
                     <span className="font-bold text-slate-600">Ses Dinleme Hızı</span>
                     <span className="font-black text-blue-700 text-xl">{student.preferredSpeed}x</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl" tabIndex={0} aria-label={`Tamamlanan Dersler: ${completedCount} / ${totalCount}`}>
                     <span className="font-bold text-slate-600 flex items-center gap-2"><Activity size={20}/> Aktivite Skoru</span>
                     <span className="font-black text-emerald-600 text-xl">{completedCount}/{totalCount} Ders</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xl py-4 rounded-xl transition-colors focus:ring-4 focus:ring-slate-400 outline-none">
                  Detaylı İncele
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
