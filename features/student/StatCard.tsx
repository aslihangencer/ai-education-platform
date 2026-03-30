"use client";

import { useAudio } from "@/context/AudioGuideContext";
import { Card } from "@/components/ui/Card";

/**
 * StatCard:
 * A high-contrast, interactive metric display for students.
 * Integrates with the Smart Audio Guide to provide contextual 
 * feedback when the user hovers over the data.
 */
interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
}

export const StatCard = ({ title, value, unit = "", icon, color = "bg-white" }: StatCardProps) => {
  const { speak, stop } = useAudio();
  const description = `${title}: ${value} ${unit}`;

  return (
    <div 
      onMouseEnter={() => speak(description)}
      onMouseLeave={stop}
      className={`${color} p-10 border-8 border-black rounded-[40px] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 transition-all cursor-help group relative overflow-hidden`}
    >
      {/* Decorative Icon Background */}
      {icon && (
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-125">
           {icon}
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-2xl font-black uppercase text-slate-500 group-hover:text-black italic tracking-tight">
          {title}
        </h3>
        <p className="text-7xl font-black mt-2 tracking-tighter leading-none">
          {value}
          {unit && <span className="text-2xl ml-2 opacity-40 uppercase italic font-bold">{unit}</span>}
        </p>
      </div>

      {/* A11y Visual Indicator */}
      <div className="absolute bottom-4 right-8 w-4 h-4 rounded-full bg-slate-900/10 group-hover:bg-black/20" />
    </div>
  );
};

export default StatCard;
