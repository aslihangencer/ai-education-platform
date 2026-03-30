'use client';

import React from "react";
import DashboardShell from "@/components/DashboardShell";
import { TeacherCard } from "@/components/ui/TeacherCard";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { Calendar } from "@/components/ui/Calendar";
import { AIPanel } from "@/components/ui/AIPanel";
import { 
  Users, 
  Bell, 
  Calendar as CalendarIcon, 
  Play, 
  Search, 
  Stars as StarsIcon, 
  TrendingUp, 
  Trophy, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { WelcomeVoice } from "@/features/student/WelcomeVoice";
import { useAudio } from "@/context/AudioGuideContext";
import { StatCard } from "@/features/student/StatCard";
import { AchievementBadge } from "@/components/ui/AchievementBadge";
import { WeeklyTrendChart } from "@/features/teacher/WeeklyTrendChart";

const demoTeachers = [
  { 
     id: "t1",
     name: "Dr. Ahmet Yılmaz", 
     subject: "Matematik Analiz",
     rating: 4.9,
     studentsCount: 120,
     bio: "YKS hazırlığında vizyoner bir yaklaşım."
  },
  { 
     id: "t2",
     name: "Selin Gökçe",
     subject: "Edebiyat",
     rating: 4.5,
     studentsCount: 85,
     bio: "Edebiyatı sevdiren modern teknikler."
  }, 
  { 
     id: "t3",
     name: "Murat Can",
     subject: "Fizik",
     rating: 4.7,
     studentsCount: 95,
     bio: "Deneylerle fizik öğrenimi."
  } 
];

const demoNotifications: {title: string, message: string, priority: "high" | "medium" | "low"}[] = [
  { title: "Yeni Ödev", message: "Matematik - Türev testi sisteme eklendi.", priority: "high" },
  { title: "Ders Hatırlatıcısı", message: "Edebiyat dersiniz 30 dakika sonra başlayacak.", priority: "medium" },
  { title: "Sistem Mesajı", message: "Yeni erişilebilirlik ayarları paneli aktif edildi.", priority: "low" }
];

const demoEvents = [
  { title: "Matematik: Türev Soru Çözümü", start: new Date().toISOString() },
  { 
    title: "Edebiyat: Tanzimat Dönemi", 
    start: new Date(Date.now() + 86400000).toISOString(), 
    end: new Date(Date.now() + 90000000).toISOString() 
  },
];

const demoAISuggestions = [
  "Son Edebiyat dersinin önemli notlarını dinle.",
  "Türev ödevini saat 17:00'den önce sisteme yükle.",
  "Günün sorusunu çözmeye hazır mısın?"
];

export default function StudentDashboard() {
  const { speak, stop } = useAudio();

  // Memoize suggestions to prevent redundant re-renders
  const suggestions = React.useMemo(() => {
    return demoAISuggestions.map((label, index) => ({
      id: `student-suggest-${index}`,
      label,
      action: () => console.log(`AI Action: ${label}`)
    }));
  }, []);

  return (
    <DashboardShell role="student">
      <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700 fade-in pb-20">
        
        {/* PERSONALIZED AI GREETING (LIVING ACADEMY) */}
        <WelcomeVoice />

        {/* HERO SECTION (LIVING ACADEMY) */}
        <section 
          className="relative"
          onMouseEnter={() => speak("Hoş geldiniz! Öğrenmeye kaldığınız yerden devam edebilirsiniz. Akıllı takvimin güncellendi ve yeni başarı rozetlerin seni bekliyor.")}
          onMouseLeave={stop}
        >
           <Card className="bg-slate-900 border-none rounded-[3rem] p-10 md:p-16 overflow-hidden flex flex-col md:flex-row gap-10 items-center border-b-[16px] border-blue-600 shadow-2xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px] opacity-30 pointer-events-none translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 flex-1 space-y-6 text-center md:text-left">
                 
                 <div className="flex flex-wrap gap-4 mb-4">
                    <AchievementBadge label="VETERAN" description="2024'ten beri bizimle" type="veteran" />
                    <AchievementBadge label="EXPERT" description="500+ Soru Çözüldü" type="expert" />
                 </div>

                 <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter italic">
                   Öğrenmeye <br /> <span className="text-blue-400 font-black">Kaldığın Yerden</span> Devam Et!
                 </h1>
                 <p className="text-2xl font-bold text-slate-400 max-w-2xl italic">
                   Akıllı takvimin güncelendi, bildirimlerin seni bekliyor. İster hemen derslerine katıl, ister yapay zeka asistanıyla pratik yap. 
                 </p>
                 <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button size="lg" className="h-20 px-12 text-2xl font-black italic bg-blue-600 hover:bg-blue-700 rounded-3xl shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all hover:translate-y-1 hover:shadow-none"><Play className="mr-3 fill-current" /> DERSE KATIL</Button>
                    <Button variant="outline" className="h-20 px-12 text-2xl font-black italic border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 border-4 rounded-3xl">
                      <Search className="mr-3" /> MATERYAL ARA
                    </Button>
                 </div>
              </div>
           </Card>
        </section>

        {/* INTERACTIVE STATS ROW (SMART AUDIO GUIDE) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <StatCard title="Haftalık Soru" value={210} unit="Adet" icon={<HelpCircle size={80} />} />
           <StatCard title="Okunan Sayfa" value={45} unit="Sayfa" icon={<BookOpen size={80} />} color="bg-blue-50" />
           <StatCard title="Başarı Puanı" value={92} unit="Puan" icon={<Trophy size={80} />} color="bg-yellow-50" />
        </section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
           
           {/* LEFT COLUMN: SCHEDULE & NOTIFICATIONS */}
           <div className="xl:col-span-8 space-y-12">
              
              {/* SCHEDULE / CALENDAR */}
              <section className="space-y-8">
                 <header className="flex items-end justify-between border-b-2 border-slate-200 pb-4">
                    <div>
                       <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-4">
                          <CalendarIcon size={36} className="text-blue-600" /> AKILLI TAKVİM
                       </h2>
                       <p className="text-xl font-bold text-slate-400 mt-2">Derslerini asla kaçırma.</p>
                    </div>
                 </header>
                 <Calendar initialEvents={demoEvents} />
              </section>

              {/* NOTIFICATIONS */}
              <section className="space-y-8">
                 <header className="flex items-end justify-between border-b-2 border-slate-200 pb-4">
                    <div>
                       <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-4">
                          <Bell size={36} className="text-yellow-500" /> BİLDİRİMLER
                       </h2>
                    </div>
                 </header>
                 <div className="flex flex-col gap-8">
                   {demoNotifications.map((n, i) => (
                     <NotificationCard key={i} title={n.title} message={n.message} priority={n.priority} />
                   ))}
                 </div>
              </section>

              {/* ANALYTICS TREND (Gelişim Grafiği) */}
              <section className="space-y-8">
                 <header className="pb-6">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-6">
                       <TrendingUp size={48} className="text-green-600" /> GELİŞİM ANALİZİ
                    </h2>
                 </header>
                 <WeeklyTrendChart />
              </section>

           </div>

           {/* RIGHT COLUMN: TEACHERS & CONTENT */}
           <div className="xl:col-span-4 space-y-12">
              
              {/* TEACHERS ROSTER */}
              <section className="space-y-8">
                 <header className="flex items-end justify-between border-b-2 border-slate-200 pb-4">
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic flex items-center gap-3">
                          <Users size={32} className="text-indigo-600" /> EĞİTMENLERİM
                       </h2>
                    </div>
                 </header>
                 <div className="flex flex-col gap-8">
                    {demoTeachers.map((teacher, idx) => (
                       <TeacherCard key={idx} {...teacher} />
                    ))}
                 </div>
              </section>

           </div>

        </div>

      </div>
      
      {/* FLOATING AI ASSISTANT PANEL */}
      <AIPanel suggestions={suggestions} isLoading={false} />

    </DashboardShell>
  );
}
