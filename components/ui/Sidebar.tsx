'use client';

import React from 'react';
import { Home, Users, Bell, Palette, Settings, GraduationCap, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Öğrenciler", icon: GraduationCap, href: "/student" },
    { title: "Eğitmenler", icon: Users, href: "/teacher" },
    { title: "Bildirimler", icon: Bell, href: "/notifications" },
    { title: "Görünüm", icon: Palette, href: "#" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-white dark:bg-slate-950 border-r-4 border-slate-100 dark:border-slate-800 flex flex-col p-8 z-40">
      <div className="mb-16 flex items-center gap-4">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
           <GraduationCap size={32} />
        </div>
        <h2 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">Eduv2.0</h2>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.title} 
              href={item.href}
              className={cn(
                "flex items-center gap-5 p-5 rounded-[1.5rem] font-black text-xl transition-all group",
                isActive 
                  ? "bg-primary text-white shadow-xl shadow-primary/20 translate-x-2" 
                  : "text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              <Icon size={28} className={cn("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-300")} />
              <span className="uppercase tracking-tight">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 border-t-2 border-slate-100 dark:border-slate-800 space-y-4">
         <button className="flex items-center gap-5 p-5 w-full text-slate-400 font-bold text-xl hover:text-red-500 transition-colors uppercase italic group focus:outline-none">
            <LogOut size={28} className="group-hover:-translate-x-1 transition-transform" />
            ÇIKIŞ YAP
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
