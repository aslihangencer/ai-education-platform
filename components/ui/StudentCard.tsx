'use client';

import React from 'react';
import { GraduationCap, Award, BookOpen, ChevronRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface StudentCardProps {
  id?: string;
  name: string;
  completedLessons?: number;
  averageScore?: number;
}

export const StudentCard: React.FC<StudentCardProps> = ({ 
  name, 
  completedLessons = 0, 
  averageScore = 0 
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleJoin = () => {
    setLoading(true);
    // Instant feedback for demo
    alert(`🚀 ${name} için DERSE KATILIM başlatılıyor...`);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div 
      className="p-8 bg-white rounded-premium shadow-premium border-2 border-slate-100 hover:border-secondary transition-all group relative overflow-hidden flex flex-col h-full"
      tabIndex={0}
      aria-label={`${name}, Tamamlanan: ${completedLessons}, Puan: ${averageScore.toFixed(1)}`}
    >
      <div className="flex justify-between items-start gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 p-4 rounded-3xl text-secondary">
            <GraduationCap size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 group-hover:text-secondary transition-colors uppercase tracking-tight line-clamp-1">
              {name}
            </h3>
            <p className="text-xl font-bold text-slate-400 italic">
              Aktif Öğrenci
            </p>
          </div>
        </div>
        
        {/* Başarı Rozeti */}
        <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full flex items-center gap-2 font-black text-2xl shadow-sm border-2 border-emerald-100">
          <Award size={24} className="text-emerald-500" />
          {averageScore.toFixed(1)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 flex-1">
         <div className="bg-indigo-50/30 p-4 rounded-2xl flex flex-col gap-1 items-center justify-center border-2 border-indigo-100/50">
            <BookOpen size={24} className="text-secondary" />
            <span className="text-3xl font-black text-slate-800">{completedLessons}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Ders</span>
         </div>
         <div className="bg-indigo-50/30 p-4 rounded-2xl flex flex-col gap-1 items-center justify-center border-2 border-indigo-100/50">
            <Award size={24} className="text-secondary" />
            <span className="text-3xl font-black text-slate-800">{averageScore > 85 ? 'Pekiyi' : 'İyi'}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Durum</span>
         </div>
      </div>
      
      <Button 
        onClick={handleJoin}
        variant="secondary"
        className="w-full h-18 text-2xl font-black flex items-center justify-center rounded-2xl shadow-indigo-200 shadow-xl"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-pulse">BAĞLANILIYOR...</span>
        ) : (
          <span className="flex items-center gap-3 italic tracking-tighter uppercase">
             <PlayCircle size={28} /> DERSE KATIL
          </span>
        )}
      </Button>

      {/* Hover micro-animation line */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-secondary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </div>
  );
};

export default StudentCard;
