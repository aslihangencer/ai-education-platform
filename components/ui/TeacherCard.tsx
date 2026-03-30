'use client';

import React from 'react';
import { Star, Calendar, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TeacherCardProps {
  id?: string;
  name: string;
  subject?: string;
  rating?: number;
  studentsCount?: number;
  bio?: string;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ 
  name, 
  subject = "Eğitmen", 
  rating = 0, 
  studentsCount = 0, 
  bio = "Öğrenci gelişimine odaklanmış deneyimli bir eğitmen." 
}) => {
  const [booked, setBooked] = React.useState(false);

  const handleBook = () => {
    setBooked(true);
    // Instant feedback for demo
    alert(`📅 ${name} ile randevu başarıyla oluşturuldu!`);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div 
      className="p-8 bg-white rounded-premium shadow-premium border-2 border-slate-100 hover:border-primary transition-all group relative overflow-hidden flex flex-col"
      tabIndex={0}
      aria-label={`${name}, Branş: ${subject}, Puan: ${rating?.toFixed(1) ?? '0.0'}`}
    >
      <div className="flex justify-between items-start gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 p-4 rounded-3xl text-primary">
            <User size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">
              {name}
            </h3>
            <p className="text-xl font-bold text-primary italic">
              {subject}
            </p>
          </div>
        </div>
        
        {/* Güven Puanı Rozeti */}
        <div className="bg-yellow-50 text-yellow-700 px-6 py-3 rounded-full flex items-center gap-2 font-black text-2xl shadow-sm border-2 border-yellow-100">
          <Star size={24} className="fill-yellow-500 text-yellow-500" />
          {rating?.toFixed(1) ?? "0.0"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-1 items-center justify-center border-2 border-slate-100">
            <span className="text-3xl font-black text-slate-800">{studentsCount}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Öğrenci</span>
         </div>
         <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-1 items-center justify-center border-2 border-slate-100">
            <span className="text-3xl font-black text-slate-800">100%</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Başarı</span>
         </div>
      </div>

      <p className="text-xl text-slate-600 font-medium line-clamp-2 leading-relaxed mb-8 flex-1">
        {bio}
      </p>
      
      <Button 
        onClick={handleBook}
        variant={booked ? "secondary" : "primary"}
        className="w-full h-18 text-2xl"
        aria-label={booked ? "Randevu Alındı" : "Randevu Al"}
      >
        {booked ? (
          <span className="flex items-center gap-3"><CheckCircle size={28} /> ONAYLANDI</span>
        ) : (
          <span className="flex items-center gap-3"><Calendar size={28} /> RANDEVU AL</span>
        )}
      </Button>

      {/* Hover micro-animation line */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </div>
  );
};

export default TeacherCard;
