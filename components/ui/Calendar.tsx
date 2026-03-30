'use client';

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface CalendarEvent {
  title: string;
  start?: string;
  end?: string;
  accepted?: boolean;
}

interface CalendarProps {
  initialEvents?: CalendarEvent[];
}

export const Calendar: React.FC<CalendarProps> = ({ initialEvents = [] }) => {
  const [localEvents, setLocalEvents] = useState(initialEvents);

  const toggleAccept = (index: number) => {
    setLocalEvents((prev) =>
      prev.map((ev, i) => (i === index ? { ...ev, accepted: !ev.accepted } : ev))
    );
    if (!localEvents[index].accepted) {
       alert(`✅ "${localEvents[index].title}" dersi onaylandı!`);
    }
  };

  return (
    <Card className="p-0 overflow-hidden shadow-premium border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="bg-slate-900 px-8 py-10 text-white flex justify-between items-center group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="flex gap-5 items-center relative z-10">
          <div className="p-4 bg-primary/20 rounded-2xl text-primary">
            <CalendarIcon size={36} />
          </div>
          <div>
            <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-white">
              Sınıf Takvimi
            </h3>
            <p className="text-xl font-bold text-slate-400 mt-2">Derslerini ve randevularını yönet.</p>
          </div>
        </div>
        <div className="flex gap-3 relative z-10">
           <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors"><ChevronLeft size={24} /></button>
           <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors"><ChevronRight size={24} /></button>
        </div>
      </div>

      <ul className="divide-y-2 divide-slate-50 dark:divide-slate-800">
        {(localEvents.length > 0 ? localEvents : [
          { title: "Bugün planlanmış ders yok", start: new Date().toISOString() }
        ]).map((event, i) => {
          const safeStart = event.start ? new Date(event.start) : new Date();
          const timeString = `${safeStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

          return (
            <li 
              key={i} 
              className="p-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <p className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                  {event.title}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="flex items-center gap-2 text-xl font-bold bg-slate-100 dark:bg-slate-800 px-5 py-2 rounded-xl text-slate-500">
                    <Clock size={20} />
                    {timeString}
                  </span>
                  <span className="text-lg font-bold text-slate-300 uppercase tracking-widest">Canlı Yayın</span>
                </div>
              </div>
              
              <div className="shrink-0">
                <Button
                  onClick={() => toggleAccept(i)}
                  variant={event.accepted ? "secondary" : "outline"}
                  className="h-16 px-8 rounded-2xl text-xl font-black shadow-lg"
                >
                  {event.accepted ? (
                    <span className="flex items-center gap-3"><Check size={28} /> ONAYLANDI</span>
                  ) : (
                    "ONAYLA"
                  )}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Calendar;
