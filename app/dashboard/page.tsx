'use client';

import React, { useMemo, useEffect, useState } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { VideoCallPanel } from "@/components/ui/VideoCallPanel";
import { ChatPanel } from "@/components/ui/ChatPanel";
import { Calendar } from "@/components/ui/Calendar";
import { AIPanel } from "@/components/ui/AIPanel";
import { Zap, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { getStudentAnalytics } from "@/app/actions/analytics";
import { DataManagement } from "@/features/teacher/DataManagement";
import { WeeklyTrendChart } from "@/features/teacher/WeeklyTrendChart";
import { StudentActionList } from "@/features/teacher/StudentActionList";
import { ActivityFeed } from "@/components/teacher/ActivityFeed";
import { StatsCards } from "@/features/teacher/StatsCards";

export default function DashboardPage() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch real analytics data from Server Action (with fallback for demo)
  useEffect(() => {
    async function loadData() {
      try {
        const result = await getStudentAnalytics("teacher-1");
        setAnalyticsData(result);
      } catch (e) {
        console.warn("Using demo data due to db push pending");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 2. Memoize suggestions
  const suggestions = useMemo(() => {
    return [
       "Haftalık performans %15 arttı. Harika!",
       "Yeni Excel verisini kontrol et.",
       "Ali için Meet randevusu oluştur."
    ].map((label, index) => ({
      id: `dashboard-suggest-${index}`,
      label,
      action: () => console.log(`AI Action: ${label}`)
    }));
  }, []);

  return (
    <div className="flex h-screen bg-bg-light dark:bg-bg-dark overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 ml-80 p-12 overflow-y-auto space-y-16 animate-in fade-in duration-1000">
        
        {/* HERO HEADER */}
        <header className="flex justify-between items-end border-b-8 border-slate-100 dark:border-slate-800 pb-12">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-2 rounded-full font-black uppercase italic tracking-widest text-lg">
                <Zap size={24} className="fill-current" /> SİSTEM AKTİF: EDUPRO v2.5
             </div>
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
                HOŞ GELDİNİZ, <br /> <span className="text-primary">EĞİTMEN</span> MODU
             </h1>
          </div>
          <div className="flex gap-6 pb-2">
             <div className="text-right">
                <p className="text-4xl font-black text-slate-900 dark:text-white leading-none">42</p>
                <p className="text-lg font-bold text-slate-400 uppercase tracking-widest italic">Öğrenci</p>
             </div>
             <div className="text-right border-l-4 border-slate-100 dark:border-slate-800 pl-6">
                <p className="text-4xl font-black text-slate-900 dark:text-white leading-none">4.9</p>
                <p className="text-lg font-bold text-slate-400 uppercase tracking-widest italic">Puan</p>
             </div>
          </div>
        </header>

        {/* TOP STATUS ROW (LIVING ACADEMY 2.5) */}
        {!loading && <StatsCards stats={analyticsData?.stats} />}

        {/* 1. DATA MANAGEMENT HUB */}
        <section className="space-y-12">
            <header className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-xl">
                   <Zap size={32} />
                </div>
                <div>
                   <h2 className="text-5xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white">VERİ MERKEZİ & ENTEGRASYON</h2>
                   <p className="text-xl font-bold text-slate-400 mt-2 italic uppercase">Excel ders kayıtlarını sisteme aktar ve yönet.</p>
                </div>
            </header>
            <DataManagement />
        </section>

        {/* 2. ANALYTICS & MONITORING ROW */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <div className="xl:col-span-8">
               <section className="space-y-12">
                  <header className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl">
                        <TrendingUp size={36} />
                     </div>
                     <div>
                        <h2 className="text-5xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white">GELİŞİM TRENDİ</h2>
                        <p className="text-xl font-bold text-slate-400 mt-2 italic uppercase">Son 3 aylık detaylı performans analizi.</p>
                     </div>
                  </header>
                  {loading ? (
                    <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-[3rem]" />
                  ) : (
                    <WeeklyTrendChart />
                  )}
               </section>
            </div>
            
            <div className="xl:col-span-4">
               <ActivityFeed />
            </div>
        </div>

        {/* 3. STUDENT ACTION LIST */}
        <section className="space-y-12">
           <StudentActionList students={analyticsData?.students || []} />
        </section>

        {/* 4. CALENDAR & LIVE MODULE */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <div className="xl:col-span-4">
               <h2 className="text-4xl font-black tracking-tight uppercase italic mb-8">TAKVİM</h2>
               <Calendar initialEvents={[]} />
            </div>
            <div className="xl:col-span-8 flex flex-col gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-10 h-10 bg-red-500 rounded-full animate-pulse" />
                  <h2 className="text-4xl font-black uppercase italic">CANLI YAYIN MODÜLÜ</h2>
               </div>
               <VideoCallPanel />
            </div>
        </div>

        <AIPanel suggestions={suggestions} isLoading={false} />

        <footer className="pt-20 pb-10 border-t-4 border-slate-100 text-center">
            <p className="text-xl font-black text-slate-300 uppercase italic tracking-widest">EDU PRO v2.5 INTERACTIVE SaaS ENVIRONMENT</p>
        </footer>

      </main>
    </div>
  );
}
