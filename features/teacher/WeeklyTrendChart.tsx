"use client";

import React from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card } from "@/components/ui/Card";
import { Calendar, TrendingUp, Filter } from "lucide-react";
import { useAudio } from "@/context/AudioGuideContext";

/**
 * WeeklyTrendChart:
 * A high-performance, professional visualization of student performance 
 * over the last 3 months (January - March 2026).
 * Features smooth animations and custom tooltips for 'Living Academy' UX.
 */
export const WeeklyTrendChart = () => {
  // Detailed Weekly Data for Q1 2026 (Living App Social Proof)
  const demoTrendData = [
    { label: 'Oca 1', solved: 120, target: 150 },
    { label: 'Oca 2', solved: 180, target: 150 },
    { label: 'Oca 3', solved: 140, target: 150 },
    { label: 'Oca 4', solved: 210, target: 150 },
    { label: 'Şub 1', solved: 250, target: 200 },
    { label: 'Şub 2', solved: 190, target: 200 },
    { label: 'Şub 3', solved: 310, target: 200 },
    { label: 'Şub 4', solved: 280, target: 200 },
    { label: 'Mar 1', solved: 400, target: 300 }, 
    { label: 'Mar 2', solved: 450, target: 300 },
    { label: 'Mar 3', solved: 520, target: 350 },
    { label: 'Mar 4', solved: 490, target: 350 },
  ];

  const { speak } = useAudio();

  // Custom Audio-Enabled Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    React.useEffect(() => {
      if (active && payload && payload.length) {
        const value = payload[0].value;
        speak(`${label} haftasında çözülen toplam soru sayısı: ${value}`, 100);
      }
    }, [active, payload, label]);

    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-6 rounded-[32px] border-8 border-white shadow-[16px_16px_0px_rgba(0,0,0,1)] font-black">
          <p className="text-blue-400 italic mb-1 uppercase tracking-widest text-xs">{label}</p>
          <p className="text-3xl tracking-tighter">{payload[0].value} <span className="text-sm opacity-50 uppercase">Soru</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full p-10 bg-white border-8 border-slate-900 rounded-[4rem] shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group animate-in fade-in zoom-in duration-700">
      
      {/* Visual Background Accent */}
      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
         <TrendingUp size={240} />
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 relative z-10">
        <div className="space-y-2">
           <div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-sm">
              <Calendar size={18} /> OCAK 2026 - MART 2026
           </div>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">Son 3 Ay Performans Trendi</h2>
           <p className="text-xl font-bold text-slate-400 italic">Haftalık detaylandırılmış gelişim analitiği.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[140px] shadow-xl">
             <span className="text-xs font-black opacity-50 uppercase tracking-widest leading-none mb-1">Ortalama</span>
             <span className="text-2xl font-black leading-none tracking-tighter italic">295 SORU</span>
          </div>
          <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[140px] shadow-xl">
             <span className="text-xs font-black opacity-50 uppercase tracking-widest leading-none mb-1">Trend</span>
             <span className="text-2xl font-black leading-none tracking-tighter italic">YÜKSELİŞTE</span>
          </div>
        </div>
      </header>

      <div className="h-[400px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={demoTrendData}>
            <defs>
              <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontWeight: '900', fontSize: 13, fill: '#1e293b', fontStyle: 'italic'}} 
              dy={20}
            />
            
            <YAxis hide domain={[0, 'auto']} />
            
            <Tooltip 
              cursor={{ stroke: '#2563eb', strokeWidth: 4, strokeDasharray: '10 10' }}
              content={<CustomTooltip />}
            />

            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="#94a3b8" 
              strokeWidth={4} 
              strokeDasharray="10 10"
              fillOpacity={1} 
              fill="url(#colorTarget)" 
              name="Hedef"
            />

            <Area 
              type="monotone" 
              dataKey="solved" 
              stroke="#2563eb" 
              strokeWidth={10} 
              fillOpacity={1} 
              fill="url(#colorSolved)" 
              animationDuration={2500}
              name="Çözülen"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <footer className="mt-12 pt-8 border-t-4 border-slate-50 flex items-center justify-between text-slate-300 font-black uppercase italic tracking-widest text-sm">
         <div className="flex items-center gap-2">
            <Filter size={16} /> FİLTRELEME: HAFTALIK (Q1)
         </div>
         <div>VERİ KAYNAĞI: EXCEL ANALYTICS HUB</div>
      </footer>

    </Card>
  );
};

export default WeeklyTrendChart;
