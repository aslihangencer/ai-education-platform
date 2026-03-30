'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BrainCircuit, 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  User,
  Mic2,
  Highlighter
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';
import SmartAssistantPanel from '@/components/AI/SmartAssistantPanel';

interface NavItem {
  label: string;
  href: string;
  icon: any;
  role?: 'student' | 'teacher' | 'all';
}

const navItems: NavItem[] = [
  { label: 'Panelim', href: '/student', icon: LayoutDashboard, role: 'student' },
  { label: 'Panelim', href: '/teacher', icon: LayoutDashboard, role: 'teacher' },
  { label: 'Derslerim', href: '/student/lessons', icon: BookOpen, role: 'student' },
  { label: 'Öğrencilerim', href: '/teacher/students', icon: User, role: 'teacher' },
  { label: 'Takvimim', href: '/calendar', icon: Calendar, role: 'all' },
  { label: 'Sesli Notlar', href: '/notes', icon: Mic2, role: 'all' },
  { label: 'Ayarlar', href: '/settings', icon: Settings, role: 'all' },
];

export default function DashboardShell({ children, role = 'student' }: { children: React.ReactNode, role?: 'student' | 'teacher' }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const filteredNav = navItems.filter(item => item.role === 'all' || item.role === role);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      
      {/* 📱 MOBILE TOPBAR */}
      <header className="md:hidden flex items-center justify-between p-6 bg-white border-b-2 border-slate-100 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3" onClick={() => router.push('/')}>
           <BrainCircuit size={32} className="text-blue-600" />
           <span className="text-xl font-black uppercase italic tracking-tighter">ERİŞİLEBİLİR<span className="text-blue-600">AI</span></span>
        </div>
        <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-3 bg-slate-50 rounded-xl"
            aria-label="Menüyü Aç"
        >
          <Menu size={24} />
        </button>
      </header>

      <div className="flex-1 flex relative">
        
        {/* 🏰 SIDEBAR (Desktop Fixed, Mobile Overlay) */}
        <aside className={`
          fixed inset-y-0 left-0 w-80 bg-slate-900 text-white z-[100] transform transition-transform duration-500 ease-in-out
          md:translate-x-0 md:static md:flex md:flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Sidebar Header */}
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
               <div className="bg-blue-600 p-2 rounded-xl">
                 <BrainCircuit size={32} className="text-white" />
               </div>
               <span className="text-2xl font-black uppercase italic tracking-tighter">ERİŞİLEBİLİR<span className="text-blue-400">AI</span></span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-slate-400">
              <X size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-6 space-y-3 mt-4">
            {filteredNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`
                    flex items-center gap-4 p-5 rounded-2xl font-black text-xl transition-all group
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={24} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-8 border-t-2 border-slate-800">
             <button 
               onClick={() => signOut({ callbackUrl: '/' })}
               className="flex items-center gap-4 text-xl font-black text-slate-400 hover:text-red-400 transition-colors w-full group"
             >
               <LogOut size={24} />
               Çıkış Yap
             </button>
          </div>
        </aside>

        {/* 🌫️ MOBILE OVERLAY */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 💻 MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
          
          {/* TOPBAR (Desktop Only) */}
          <header className="hidden md:flex h-24 items-center justify-between px-12 bg-white border-b-2 border-slate-100 shadow-sm sticky top-0 z-40">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic underline underline-offset-8 decoration-blue-500">
              {navItems.find(i => i.href === pathname)?.label || 'Panel'}
            </h2>

            <div className="flex items-center gap-8">
               <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all relative">
                 <Bell size={24} />
                 <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
               </button>
               
               <div className="flex items-center gap-4 pl-8 border-l-2 border-slate-100">
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900 leading-none">Aslıhan Gencer</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-70">
                    {role.toUpperCase() === 'TEACHER' ? 'Eğitmen' : 'Öğrenci'}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-blue-50">
                    AG
                  </div>
               </div>
            </div>
          </header>

          <div className="flex-1 p-8 md:p-12 max-w-[1600px] mx-auto w-full">
            {children}
          </div>

          {/* Global AI Assistant for Dashboards */}
          <SmartAssistantPanel />
        </main>

      </div>

      {/* 📣 Screen Reader Announcer */}
      <div id="a11y-announcer" aria-live="assertive" className="sr-only"></div>
    </div>
  );
}
