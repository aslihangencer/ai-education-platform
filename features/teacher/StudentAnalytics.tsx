"use client";

import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, AreaChart, Area, Cell
} from 'recharts';
import { TrendingUp, Users, BookOpen, Clock, Star, Award, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';

/**
 * StudentAnalytics:
 * A high-density, professional analytics dashboard for teachers.
 * Optimized for "Accessible Academy" aesthetics: High Contrast + Premium Data.
 */
export const StudentAnalytics = ({ 
  data = [], 
  globalStats = { totalMaterialsAnalyzed: 12450, totalExamsTaken: 450, totalMentorshipHours: 850 } 
}: { 
  data?: any[], 
  globalStats?: any 
}) => {
  // 1. Identify "Veteran" Status for Social Proof
  const isVeteran = data.length > 5; // Simplified for demo

  // 2. Prep Chart Data with Professional Polish
  const chartData = useMemo(() => {
    if (data.length === 0) {
      return [
        { name: 'Hafta 1', questionsSolved: 400 },
        { name: 'Hafta 2', questionsSolved: 600 },
        { name: 'Hafta 3', questionsSolved: 800 },
        { name: 'Hafta 4', questionsSolved: 1250 },
      ];
    }
    return data;
  }, [data]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* 1. LAYER: KPI CARDS (THE SPIN) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* KPI: TOTAL SOLVED */}
        <Card className="p-8 bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={64} fill="currentColor" />
          </div>
          <p className="text-xl font-black uppercase text-slate-400 tracking-widest italic mb-2">Toplam Soru Çözümü</p>
          <div className="flex items-baseline gap-3">
             <h3 className="text-6xl font-black text-blue-600 tracking-tighter">
               {globalStats.totalMaterialsAnalyzed.toLocaleString()}
             </h3>
             <TrendingUp className="text-green-500" size={32} />
          </div>
          {isVeteran && (
            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-tighter">
              <Award size={14} /> LEGACY ACADEMY ACCOUNT
            </div>
          )}
        </Card>

        {/* KPI: MENTORSHIP HOURS */}
        <Card className="p-8 bg-slate-900 border-4 border-slate-900 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
          <div className="absolute -bottom-4 -right-4 p-6 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
            <Clock size={120} />
          </div>
          <p className="text-xl font-black uppercase text-slate-500 tracking-widest italic mb-2">Mentorluk Süresi</p>
          <h3 className="text-6xl font-black text-white tracking-tighter">
             +{globalStats.totalMentorshipHours} <span className="text-2xl text-slate-500">Saat</span>
          </h3>
        </Card>

        {/* KPI: ACTIVE STUDENTS */}
        <Card className="p-8 bg-blue-600 border-4 border-blue-600 rounded-[2.5rem] shadow-xl text-white">
          <p className="text-xl font-black uppercase text-blue-200 tracking-widest italic mb-2">Aktif Öğrenci</p>
          <div className="flex items-center gap-4">
            <h3 className="text-7xl font-black text-white tracking-tighter">42</h3>
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-blue-600 bg-slate-200" />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-blue-600 bg-blue-900 flex items-center justify-center text-xs font-black">+39</div>
            </div>
          </div>
        </Card>

      </div>

      {/* 2. LAYER: VISUAL TRENDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* WEEKLY PROGRESS CHART */}
        <Card className="lg:col-span-8 p-10 bg-white border-4 border-slate-100 rounded-[3rem] shadow-premium">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Haftalık Gelişim Trendi</h4>
              <p className="text-lg font-bold text-slate-400">Öğrenci etkileşim ve soru çözüm oranları (EduPro Analytics)</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-2xl flex gap-2">
               <button className="px-6 py-2 bg-white shadow-sm rounded-xl font-black text-sm uppercase italic">Haftalık</button>
               <button className="px-6 py-2 text-slate-400 rounded-xl font-black text-sm uppercase italic">Aylık</button>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: '4px solid #1e293b', 
                    fontWeight: '900',
                    fontStyle: 'italic',
                    padding: '20px'
                  }} 
                  cursor={{stroke: '#2563eb', strokeWidth: 4}}
                />
                <Area 
                  type="monotone" 
                  dataKey="questionsSolved" 
                  stroke="#2563eb" 
                  strokeWidth={8}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* TOP PERFORMERS */}
        <Card className="lg:col-span-4 p-8 bg-slate-50 border-none rounded-[3rem] space-y-8">
           <h4 className="text-2xl font-black text-slate-900 uppercase italic">Günün Yıldızları</h4>
           <div className="space-y-6">
             {[
               { name: "Ali Yılmaz", score: 98, color: "blue" },
               { name: "Selin Can", score: 95, color: "indigo" },
               { name: "Murat Han", score: 92, color: "purple" }
             ].map((u, i) => (
               <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm hover:border-blue-500 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-slate-900 text-white rounded-2xl font-black text-lg">{i+1}</div>
                     <span className="font-black text-xl text-slate-800">{u.name}</span>
                  </div>
                  <div className="text-2xl font-black text-blue-600">%{u.score}</div>
               </div>
             ))}
           </div>
           <button className="w-full py-4 text-blue-600 font-black uppercase italic tracking-widest hover:underline transition-all">Tüm Öğrencileri Gör</button>
        </Card>
      </div>

      {/* 3. LAYER: DATA TABLE (A11Y OPTIMIZED) */}
      <Card className="border-4 border-slate-900 rounded-[3rem] overflow-hidden bg-white shadow-2xl">
         <div className="bg-slate-900 px-10 py-8 flex justify-between items-center text-white">
            <h4 className="text-3xl font-black uppercase italic tracking-tighter">Detaylı Aktivite Dökümü</h4>
            <div className="flex items-center gap-4">
               <span className="text-sm font-bold opacity-50 uppercase tracking-widest">Filtrele: </span>
               <select className="bg-white/10 border-none rounded-xl px-4 py-2 text-white font-black uppercase">
                 <option>Tüm Kitaplar</option>
                 <option>Matematik</option>
               </select>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left" aria-describedby="analytics-table-summary">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-8 uppercase font-black italic text-slate-500 tracking-widest border-b-2 border-slate-100">Kitap / Seans</th>
                  <th className="p-8 uppercase font-black italic text-slate-500 tracking-widest border-b-2 border-slate-100">Öğrenci</th>
                  <th className="p-8 uppercase font-black italic text-slate-500 tracking-widest border-b-2 border-slate-100">Sayfa</th>
                  <th className="p-8 uppercase font-black italic text-slate-500 tracking-widest border-b-2 border-slate-100">Soru</th>
                  <th className="p-8 uppercase font-black italic text-slate-500 tracking-widest border-b-2 border-slate-100">Başarı</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                  {[
                    { book: "YKS Matematik Analiz", student: "Ali Y.", pages: 12, solved: 45, success: 98 },
                    { book: "TYT Türkçe Pratik", student: "Ayşe K.", pages: 8, solved: 30, success: 85 },
                    { book: "Kuantum Fiziği d.1", student: "Murat C.", pages: 15, solved: 10, success: 92 },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="p-8">
                         <div className="flex items-center gap-4">
                           <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <BookOpen size={24} />
                           </div>
                           <span className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{row.book}</span>
                         </div>
                      </td>
                      <td className="p-8 font-bold text-xl text-slate-500">{row.student}</td>
                      <td className="p-8 text-2xl font-black text-slate-400">{row.pages}</td>
                      <td className="p-8 text-2xl font-black text-slate-400">{row.solved}</td>
                      <td className="p-8">
                         <div className="flex items-center gap-3">
                            <div className="w-16 h-4 bg-slate-100 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-600" style={{ width: `${row.success}%` }} />
                            </div>
                            <span className="text-2xl font-black text-blue-600">%{row.success}</span>
                         </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="p-8 bg-slate-50 border-t-2 border-slate-100 flex justify-center">
               <button className="text-lg font-black text-slate-400 hover:text-slate-900 transition-all uppercase italic tracking-widest">Daha Fazla Kayıt Yükle...</button>
            </div>
         </div>
      </Card>

    </div>
  );
};

export default StudentAnalytics;
