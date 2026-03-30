'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video 
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Adjust firstDay (JS Sunday=0, we start at Monday=1)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1));

  return (
    <div className="space-y-12">
      
      <div className="flex flex-col xl:flex-row gap-12">
        
        {/* 📅 CALENDAR GRID SECTION */}
        <section className="flex-1 space-y-8">
           <header className="flex items-center justify-between pb-4 border-b-2 border-slate-100">
              <div className="flex items-center gap-6">
                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                    {MONTHS[month]} <span className="text-blue-600">{year}</span>
                 </h3>
                 <div className="flex gap-2">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-3 bg-white border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95"
                      aria-label="Önceki Ay"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-3 bg-white border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95"
                      aria-label="Sonraki Ay"
                    >
                      <ChevronRight size={24} />
                    </button>
                 </div>
              </div>
              <Button variant="secondary" icon={Plus}>RANDEVU EKLE</Button>
           </header>

           <Card variant="white" padding="none" className="shadow-2xl overflow-hidden border-none">
              <div className="grid grid-cols-7 border-b-2 border-slate-50">
                 {DAYS.map(day => (
                   <div key={day} className="p-6 text-center text-sm font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                      {day}
                   </div>
                 ))}
              </div>

              <div className="grid grid-cols-7">
                 {/* Empty days before first day of month */}
                 {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                   <div key={`empty-${i}`} className="p-10 border-r-2 border-b-2 border-slate-50 opacity-20 bg-slate-50/10" />
                 ))}

                 {/* Days of current month */}
                 {Array.from({ length: daysInMonth }).map((_, i) => {
                   const day = i + 1;
                   const isToday = day === new Date().getDate() && month === new Date().getMonth();
                   const isSelected = selectedDay === day;

                   return (
                     <button 
                        key={day} 
                        onClick={() => setSelectedDay(day)}
                        className={`
                          p-10 border-r-2 border-b-2 border-slate-50 text-3xl font-black transition-all relative group
                          ${isSelected ? 'bg-blue-600 text-white z-10 scale-105 shadow-xl shadow-blue-200' : 'hover:bg-blue-50 hover:text-blue-600'}
                          ${isToday && !isSelected ? 'text-blue-600' : ''}
                        `}
                     >
                       <span className="relative z-10">{day}</span>
                       {day % 5 === 0 && !isSelected && (
                          <span className="absolute bottom-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                       )}
                     </button>
                   );
                 })}
              </div>
           </Card>
        </section>

        {/* 📋 DAY DETAILS / EVENTS SIDEBAR */}
        <aside className="w-full xl:w-96 space-y-8 animate-in slide-in-from-right-8 duration-500">
           <header className="flex justify-between items-center">
              <h4 className="text-2xl font-black text-slate-900 uppercase italic">Günün Özeti</h4>
              <p className="text-lg font-bold text-blue-600 underline underline-offset-4">{selectedDay} {MONTHS[month]}</p>
           </header>

           <div className="space-y-6">
              <EventCard 
                title="Matematik Dersi" 
                teacher="Dr. Ahmet Yılmaz" 
                time="14:00 - 15:30" 
                type="video" 
              />
              <EventCard 
                title="Edebiyat Mentorluğu" 
                teacher="Selin Gökçe" 
                time="18:00 - 19:00" 
                type="link" 
              />
              <Card variant="glass" padding="md" className="border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center py-12">
                 <div className="p-4 bg-slate-50 rounded-full mb-4 text-slate-300">
                    <Plus size={32} />
                 </div>
                 <p className="text-xl font-bold text-slate-400">Başka randevu yok.</p>
                 <Button variant="ghost" size="sm" className="mt-4 text-blue-600">YENİ OLUŞTUR</Button>
              </Card>
           </div>
        </aside>

      </div>

    </div>
  );
}

function EventCard({ title, teacher, time, type }: any) {
  return (
    <Card variant="white" padding="md" className="relative group overflow-hidden hover:scale-[1.02]">
       <div className={`absolute left-0 top-0 w-3 h-full ${type === 'video' ? 'bg-blue-600' : 'bg-indigo-600'}`} />
       <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
             <h5 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h5>
             {type === 'video' ? <Video className="text-blue-600" size={24} /> : <CalendarIcon className="text-indigo-600" size={24} />}
          </div>
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-slate-500 font-bold">
                <User size={18} />
                <span>{teacher}</span>
             </div>
             <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                <Clock size={16} />
                <span>{time}</span>
             </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-2 font-black">DERSE KATIL</Button>
       </div>
    </Card>
  );
}
