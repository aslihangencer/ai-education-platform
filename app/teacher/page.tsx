'use client';

import React from 'react';
import DashboardShell from '@/components/DashboardShell';
import { StudentCard } from '@/components/ui/StudentCard';
import { NotificationCard } from '@/components/ui/NotificationCard';
import { Calendar } from '@/components/ui/Calendar';
import { AIPanel } from '@/components/ui/AIPanel';
import { FileCard } from '@/components/ui/FileCard';
import { VoiceNotesPanel } from '@/components/ui/VoiceNotesPanel';
import { Users, Bell, Calendar as CalendarIcon, ClipboardList, PenTool, CheckCircle, FolderOpen, UploadCloud, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const demoStudents = [
  { name: "Ali Yılmaz", completedLessons: 12, averageScore: 92.5 },
  { name: "Ayşe Kaya", completedLessons: 8 }, 
  { name: "Mehmet Tepe", averageScore: 65.0 }, 
  { name: "Zeynep Çelik" } 
];

const demoNotifications: {title: string, message: string, priority: any}[] = [
  { title: "Ders Hatırlatması", message: "Yarınki Matematik dersi için hazırlık yapmalısınız.", priority: "medium" },
  { title: "Yeni Kayıt", message: "Zeynep Çelik dersinize kayıt oldu.", priority: "low" },
  { title: "Ödev Testi Bekliyor", message: "Ali Yılmaz, Türev testini gönderdi. Değerlendirme bekliyor.", priority: "high" }
];

const demoEvents = [
  { title: "Fizik Sınıfı: Dinamik", start: new Date().toISOString() }, 
  { 
    title: "Özel Ders (Ayşe)", 
    start: new Date(Date.now() + 86400000).toISOString(), 
    end: new Date(Date.now() + 90000000).toISOString() 
  },
];

const demoFiles = [
  { name: "Dinamik Calisma Sorulari.pdf", type: "pdf" },
  { name: "Fizik Ders Plani.docx", type: "docx" },
];

const demoVoiceNotes = [
  { title: "Bölüm 1 - Formül İpuçları", duration: "2:30" },
  { title: "Bölüm 2 - Özet Anlatım", duration: "3:15" },
];

const demoAISuggestions = [
  "Öğrencilerin haftalık başarı performans analizlerini görüntüle.",
  "Ders planlarını sisteme otomatik yükle.",
  "Zeynep'e hoşgeldin mesajı gönder."
];

export default function TeacherDashboard() {
  return (
    <DashboardShell role="teacher">
      <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700 fade-in pb-20">
        
        {/* HERO SECTION */}
        <section className="relative">
           <Card className="bg-slate-900 border-none rounded-[3rem] p-10 md:p-16 overflow-hidden flex flex-col md:flex-row gap-10 items-center shadow-2xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[100px] opacity-30 pointer-events-none translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 flex-1 space-y-6 text-center md:text-left">
                 <div className="inline-flex items-center gap-3 bg-indigo-500/20 text-indigo-300 font-black tracking-widest uppercase italic px-6 py-2 rounded-full mb-2">
                    <Star size={20} className="fill-current text-indigo-400" /> SİSTEME GİRİŞ YAPILDI
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                   Öğrencilerinize <br /> <span className="text-indigo-400">İlham Vermeye</span> Hazır Mısınız?
                 </h1>
                 <p className="text-2xl font-bold text-slate-400 max-w-2xl">
                   Sınıfınız büyüyor ve yapay zeka asistanınız ders materyallerini hazırlamanızda size destek olmaya hazır. 
                 </p>
                 <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button size="lg" className="h-16 px-10 text-xl bg-indigo-600 hover:bg-indigo-700 text-white"><CheckCircle className="mr-3" /> SINIFI KONTROL ET</Button>
                    <Button variant="outline" className="h-16 px-10 text-xl border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 border-2">
                      <PenTool className="mr-3" /> ÖDEV OLUŞTUR
                    </Button>
                 </div>
              </div>
           </Card>
        </section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
           
           {/* LEFT COLUMN: SCHEDULE & NOTIFICATIONS (Spans 8 cols) */}
           <div className="xl:col-span-8 space-y-12">
              
              {/* SCHEDULE / CALENDAR */}
              <section className="space-y-8">
                 <header className="flex items-end justify-between border-b-2 border-slate-200 pb-4">
                    <div>
                       <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-4">
                          <CalendarIcon size={36} className="text-blue-600" /> EĞİTMEN TAKVİMİ
                       </h2>
                       <p className="text-xl font-bold text-slate-400 mt-2">Ders ve randevularınızı kolayca yönetin.</p>
                    </div>
                 </header>
                 <Calendar events={demoEvents} />
              </section>

              {/* FILES & VOICE NOTES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* FILES (DRAG & DROP SIMULATION) */}
                 <section className="space-y-6">
                   <header className="flex items-end justify-between border-b-2 border-slate-200 pb-4">
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-3">
                          <FolderOpen size={30} className="text-emerald-500" /> DOSYALAR
                       </h2>
                   </header>
                   <div className="border-4 border-dashed border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/50 p-6 rounded-3xl transition-all space-y-4 relative group cursor-pointer">
                      <div className="flex flex-col items-center justify-center p-4 text-slate-400 group-hover:text-emerald-600 transition-colors">
                         <UploadCloud size={40} className="mb-2" />
                         <span className="font-bold text-lg">Dosya sürükleyip bırakın</span>
                      </div>
                      <div className="space-y-3 z-10 relative">
                        {demoFiles.map((f, i) => (
                          <FileCard key={i} {...f} />
                        ))}
                      </div>
                   </div>
                 </section>

                 {/* VOICE NOTES */}
                 <section className="space-y-6">
                   <VoiceNotesPanel notes={demoVoiceNotes} />
                 </section>
              </div>

              {/* NOTIFICATIONS */}
              <section className="space-y-8">
                 <header className="flex items-end justify-between border-b-2 border-slate-200 pb-4">
                    <div>
                       <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-4">
                          <Bell size={36} className="text-yellow-500" /> EĞİTMEN BİLDİRİMLERİ
                       </h2>
                    </div>
                 </header>
                 <div className="flex flex-col gap-6">
                   {demoNotifications.map((n, i) => (
                     <NotificationCard key={i} title={n.title} message={n.message} priority={n.priority} />
                   ))}
                 </div>
              </section>

           </div>

           {/* RIGHT COLUMN: STUDENTS & CONTENT (Spans 4 cols) */}
           <div className="xl:col-span-4 space-y-12">
              
              {/* STUDENTS ROSTER */}
              <section className="space-y-8">
                 <header className="flex items-end justify-between border-b-2 border-slate-200 pb-4">
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-3">
                          <Users size={32} className="text-indigo-600" /> ÖĞRENCİLERİM
                       </h2>
                    </div>
                 </header>
                 <div className="flex flex-col gap-8">
                   {demoStudents.map((s, idx) => (
                     <StudentCard key={idx} student={s} />
                   ))}
                 </div>
                 <Button variant="outline" className="w-full text-xl h-16 border-2 flex items-center justify-center">
                    <ClipboardList className="mr-3" /> TÜM LİSTEYİ GÖR
                 </Button>
              </section>

           </div>

        </div>

      </div>

      {/* FLOATING AI ASSISTANT PANEL */}
      <AIPanel suggestions={demoAISuggestions} />

    </DashboardShell>
  );
}
