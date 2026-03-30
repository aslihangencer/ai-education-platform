"use client";

import React from "react";
import { Activity, Clock, Book, CheckCircle, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";

/**
 * ActivityFeed:
 * A "Live" activity stream component for teachers to monitor 
 * student progress and AI interactions in real-time.
 * Gives the platform an "Active" and "Living" atmosphere.
 */
export const ActivityFeed = ({ activities = [] }: { activities?: any[] }) => {
  // Demo activities for the "Living App" feel
  const demoActivities = [
    { 
      id: 1, 
      student: "Ali Yılmaz", 
      action: "Kuantum Fiziği d.1", 
      type: "read", 
      time: "2 dakika önce" 
    },
    { 
      id: 2, 
      student: "Ayşe Kaya", 
      action: "TYT Matematik Sınavı", 
      type: "exam", 
      time: "15 dakika önce",
      detail: "Skor: %92" 
    },
    { 
      id: 3, 
      student: "Sistem", 
      action: "Analiz Tamamlandı", 
      type: "system", 
      time: "1 saat önce",
      detail: "YKS Edebiyat Notları seslendirildi." 
    },
  ];

  const displayActivities = activities.length > 0 ? activities : demoActivities;

  const getIcon = (type: string) => {
    switch (type) {
      case 'read': return <Book size={20} className="text-blue-500" />;
      case 'exam': return <CheckCircle size={20} className="text-green-500" />;
      case 'message': return <MessageSquare size={20} className="text-indigo-500" />;
      default: return <Activity size={20} className="text-slate-400" />;
    }
  };

  return (
    <Card className="p-8 border-none bg-slate-50 rounded-[3rem] space-y-8">
      <header className="flex items-center gap-4 border-b-2 border-slate-200 pb-6">
        <Activity className="text-slate-900" size={32} />
        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Aktivite Akışı</h2>
      </header>
      
      <div className="space-y-6 relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-200 rounded-full" />
        
        {displayActivities.map((act) => (
          <div key={act.id} className="relative z-10 flex items-start gap-6 group">
             <div className="bg-white p-3 rounded-full shadow-sm border-2 border-slate-100 group-hover:scale-110 transition-transform">
                {getIcon(act.type)}
             </div>
             <div className="flex-1 space-y-1">
                <p className="text-lg font-black text-slate-900 leading-tight">
                  <span className="text-blue-600">{act.student}</span> {act.type === 'read' ? 'şu an okuyor:' : 'işlem yaptı:'}
                </p>
                <p className="text-xl font-bold text-slate-700 italic">{act.action}</p>
                {act.detail && <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{act.detail}</p>}
                <div className="flex items-center gap-2 text-sm text-slate-400 font-bold uppercase mt-2">
                   <Clock size={14} /> {act.time}
                </div>
             </div>
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-white rounded-2xl text-slate-400 font-black uppercase italic tracking-widest hover:text-slate-900 transition-all border-2 border-transparent hover:border-slate-200">
         Tüm Arşivi Gör
      </button>
    </Card>
  );
};

export default ActivityFeed;
