"use client";

import React from "react";
import { BookOpen, HelpCircle, Clock, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";

/**
 * StatsCards:
 * A high-impact dashboard row for teachers to instantly grasp 
 * student engagement metrics (Questions, Pages, Duration).
 */
export const StatsCards = ({ stats }: { stats: any }) => {
  const items = [
    {
      label: "TOPLAM SORU",
      value: stats?.totalSolved || 0,
      icon: <HelpCircle size={32} />,
      color: "bg-blue-600",
      textColor: "text-white",
      shadow: "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
    },
    {
      label: "OKUNAN SAYFA",
      value: stats?.totalPages || 0,
      icon: <BookOpen size={32} />,
      color: "bg-white",
      textColor: "text-black",
      shadow: "shadow-[12px_12px_0px_0px_rgba(37,99,235,1)]"
    },
    {
      label: "ÇALIŞMA (SAAT)",
      value: Math.round((stats?.totalHours || 0)),
      icon: <Clock size={32} />,
      color: "bg-slate-900",
      textColor: "text-white",
      shadow: "shadow-[12px_12px_0px_0px_rgba(251,191,36,1)]"
    },
    {
      label: "AKTİF ÖĞRENCİ",
      value: stats?.activeStudents || 0,
      icon: <Zap size={32} />,
      color: "bg-yellow-400",
      textColor: "text-black",
      shadow: "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
      {items.map((item, idx) => (
        <Card 
          key={idx} 
          className={`${item.color} ${item.textColor} ${item.shadow} p-10 rounded-[3rem] border-4 border-black relative overflow-hidden group hover:-translate-y-2 transition-all duration-300`}
        >
           <div className="absolute top-0 right-0 p-6 opacity-20 transform group-hover:rotate-12 transition-transform">
              {item.icon}
           </div>
           <div className="relative z-10 space-y-2">
              <p className="font-black uppercase tracking-widest text-sm opacity-70 italic">{item.label}</p>
              <h4 className="text-6xl font-black tracking-tighter leading-none">
                {item.value.toLocaleString()}
              </h4>
           </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
