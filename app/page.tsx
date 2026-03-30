'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, GraduationCap, User, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-4xl max-auto space-y-16">
        
        {/* BRANDING HEADER */}
        <header className="flex flex-col items-center text-center space-y-6">
          <div className="bg-blue-600 p-4 rounded-3xl shadow-xl shadow-blue-600/20">
            <BrainCircuit size={48} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase italic flex items-center justify-center mb-2">
              Erişilebilir<span className="text-blue-600">AI</span>
            </h1>
            <p className="text-2xl text-slate-500 font-medium">Hangi paneli kullanmak istiyorsunuz?</p>
          </div>
        </header>

        {/* ROLE SELECTION CARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* STUDENT BUTTON CARDS */}
          <button 
            onClick={() => router.push('/student')}
            className="text-left w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/50 rounded-3xl transition-all hover:scale-[1.02] active:scale-95 group"
            aria-label="Öğrenci Paneline Git"
          >
            <Card className="h-full border-2 border-slate-200 group-hover:border-blue-500 group-hover:shadow-2xl group-active:border-blue-600 transition-all p-8 md:p-10 flex flex-col items-center gap-6">
              <div className="bg-blue-50 text-blue-600 p-8 rounded-[2rem] group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <GraduationCap size={64} />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Öğrenci Paneli</h2>
                <p className="text-xl text-slate-500 font-medium">Öğrenme araçları, sesli notlar ve AI mentor asistanına erişin.</p>
              </div>
            </Card>
          </button>

          {/* TEACHER BUTTON CARD */}
          <button 
            onClick={() => router.push('/teacher')}
            className="text-left w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/50 rounded-3xl transition-all hover:scale-[1.02] active:scale-95 group"
            aria-label="Öğretmen Paneline Git"
          >
            <Card className="h-full border-2 border-slate-200 group-hover:border-indigo-500 group-hover:shadow-2xl group-active:border-indigo-600 transition-all p-8 md:p-10 flex flex-col items-center gap-6">
              <div className="bg-indigo-50 text-indigo-600 p-8 rounded-[2rem] group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <User size={64} />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">Eğitmen Paneli</h2>
                <p className="text-xl text-slate-500 font-medium">Öğrencileri yönet, ders takvimini planla ve ödevleri değerlendir.</p>
              </div>
            </Card>
          </button>

        </div>
      </div>

    </main>
  );
}
