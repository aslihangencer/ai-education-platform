"use client";

import { useAudio } from "@/context/AudioGuideContext";
import { Zap, ShieldCheck, Trophy, Star } from "lucide-react";

/**
 * AchievementBadge:
 * A high-contrast, interactive badge component for social proof 
 * and user milestones. Integrates with the Smart Audio Guide.
 */
interface AchievementBadgeProps {
  label: string;
  description: string;
  type?: "veteran" | "expert" | "master" | "rookie";
}

export const AchievementBadge = ({ label, description, type = "veteran" }: AchievementBadgeProps) => {
  const { speak, stop } = useAudio();

  const getIcon = () => {
    switch (type) {
      case "veteran": return <ShieldCheck className="text-yellow-400" size={24} />;
      case "expert": return <Trophy className="text-blue-400" size={24} />;
      case "master": return <Zap className="text-purple-400" size={24} />;
      default: return <Star className="text-green-400" size={24} />;
    }
  };

  return (
    <div 
      onMouseEnter={() => speak(`${label}: ${description}`)}
      onMouseLeave={stop}
      className="inline-flex items-center gap-3 bg-black text-white px-8 py-3 rounded-full border-4 border-slate-700 shadow-xl hover:border-yellow-400 hover:scale-105 transition-all cursor-help group"
      aria-label={`${label}: ${description}`}
    >
      <div className="bg-slate-800 p-2 rounded-full group-hover:bg-slate-700">
         {getIcon()}
      </div>
      <div className="flex flex-col">
         <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-yellow-400">
            {label}
         </span>
         <span className="text-sm font-bold truncate max-w-[200px]">
            {description}
         </span>
      </div>
    </div>
  );
};

export default AchievementBadge;
