'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationCardProps {
  title: string;
  message: string;
  priority?: "low" | "medium" | "high";
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  priority = "low",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    console.log(`Notification dismissed: ${title}`);
  };

  const isHigh = priority === "high";
  const isMedium = priority === "medium";

  const Icon = isHigh ? AlertCircle : isMedium ? Info : CheckCircle2;
  
  const bgColors = {
    high: "bg-red-50 hover:bg-red-100 border-red-200 text-red-700",
    medium: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700",
    low: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700"
  };

  const iconColors = {
    high: "text-red-600 bg-red-100",
    medium: "text-yellow-600 bg-yellow-100",
    low: "text-emerald-500 bg-emerald-100"
  };

  return (
    <div 
       className={cn(
         "p-6 rounded-premium border-2 transition-all flex gap-6 items-start animate-in fade-in zoom-in-95 duration-300 shadow-premium hover:shadow-lg focus-within:ring-4 ring-primary/20",
         bgColors[priority as keyof typeof bgColors]
       )}
       role="alert"
    >
      <div className={cn("p-4 rounded-3xl shrink-0 mt-1", iconColors[priority as keyof typeof iconColors])}>
        <Icon size={32} />
      </div>
      <div className="flex-1">
        <h4 className="text-2xl font-black mb-2 tracking-tight uppercase italic">{title}</h4>
        <p className="text-xl font-medium opacity-90 leading-snug">{message}</p>
      </div>
      <button 
        onClick={handleDismiss}
        className="p-3 ml-auto text-slate-400 hover:text-red-600 transition-colors rounded-2xl hover:bg-white/50 focus:outline-none focus:ring-4 ring-red-400 shrink-0"
        aria-label="Bildirimi Kapat"
      >
        <X size={28} />
      </button>
    </div>
  );
};

export default NotificationCard;
