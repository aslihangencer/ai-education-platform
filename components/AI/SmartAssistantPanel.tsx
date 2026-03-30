'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Mic2, 
  X, 
  ChevronRight, 
  Sparkles, 
  MessageSquare, 
  HelpCircle,
  Play,
  StopCircle,
  FileText
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SmartAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-12 w-24 h-24 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-500/40 flex items-center justify-center group hover:scale-110 active:scale-95 transition-all z-[100] border-4 border-white"
        aria-label="Yapay Zeka Asistanını Aç"
      >
        <BrainCircuit size={40} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full border-2 border-white animate-pulse" />
      </button>
    );
  }

  return (
    <aside className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] z-[100] flex flex-col border-l-4 border-slate-50 animate-in slide-in-from-right-full duration-500">
      
      {/* 🏙️ PANEL HEADER */}
      <header className="p-8 bg-slate-900 text-white flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex items-center gap-4 relative z-10">
           <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20">
              <BrainCircuit size={32} />
           </div>
           <div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Akıllı Asistan</h3>
              <p className="text-sm font-bold text-blue-400 uppercase tracking-widest opacity-80">Aktif & Dinliyor</p>
           </div>
        </div>

        <button 
          onClick={() => setIsOpen(false)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors relative z-10"
          aria-label="Panelini Kapat"
        >
          <X size={24} />
        </button>
      </header>

      {/* 📑 TABS SECTION */}
      <div className="flex p-2 bg-slate-50 mx-8 my-6 rounded-2xl gap-2">
         <button 
           onClick={() => setActiveTab('chat')}
           className={`flex-1 p-3 rounded-xl font-black text-lg transition-all ${activeTab === 'chat' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Sohbet
         </button>
         <button 
           onClick={() => setActiveTab('history')}
           className={`flex-1 p-3 rounded-xl font-black text-lg transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Geçmiş Analizler
         </button>
      </div>

      {/* 💬 CHAT / CONTENT AREA */}
      <div className="flex-1 overflow-y-auto px-8 space-y-8 scroll-smooth pb-32">
         
         <div className="space-y-6">
            <AssistantMessage text="Merhaba Aslıhan! Bugün sana nasıl yardımcı olabilirim? Yeni yüklediğin 'Türev' dökümanını özetlememi ister misin?" />
            
            <UserMessage text="Evet lütfen, en önemli 3 noktayı özetle." />

            <Card variant="glass" padding="md" className="border-l-8 border-emerald-500 shadow-xl relative overflow-hidden">
               <div className="flex items-center gap-3 mb-4 text-emerald-600 font-black uppercase text-sm tracking-widest">
                  <Sparkles size={18} /> AI ÖZETİ HAZIR
               </div>
               <div className="space-y-4">
                  <SummaryItem text="Türev, fonksiyonun bir noktadaki değişim oranını belirtir." />
                  <SummaryItem text="Geometrik olarak teğet doğrusunun eğimine eşittir." />
                  <SummaryItem text="Fiziksel olarak anlık hızı ifade eder." />
               </div>
               <Button variant="ghost" className="w-full mt-6 text-emerald-600 font-black border-2 border-emerald-50 border-dashed">SESLİ OKU</Button>
            </Card>
         </div>

      </div>

      {/* 🎤 INTERACTION BAR (Persistent Bottom) */}
      <footer className="p-8 pt-4 bg-white border-t-4 border-slate-50 absolute bottom-0 inset-x-0">
         <div className="bg-slate-50 rounded-[2.5rem] p-3 flex items-center gap-4 shadow-inner border-2 border-slate-100">
            <button 
              className="p-4 bg-white rounded-full text-slate-400 hover:text-blue-600 shadow-sm transition-all focus:ring-4 focus:ring-blue-100"
              aria-label="Yardım Al"
            >
              <HelpCircle size={24} />
            </button>
            <input 
              type="text" 
              placeholder="Asistan ile konuşun..." 
              className="flex-1 bg-transparent border-none outline-none p-2 text-xl font-bold text-slate-800 placeholder-slate-300"
            />
            <button 
               onClick={() => setIsRecording(!isRecording)}
               className={`
                  p-6 rounded-full shadow-2xl transition-all active:scale-90
                  ${isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white shadow-blue-500/20'}
               `}
               aria-label={isRecording ? 'Kaydı Durdur' : 'Sesli Sor'}
            >
               {isRecording ? <StopCircle size={32} /> : <Mic2 size={32} />}
            </button>
         </div>
      </footer>

      {/* 📣 Screen Reader Announcer */}
      <div id="ai-announcer" aria-live="assertive" className="sr-only"></div>
    </aside>
  );
}

function AssistantMessage({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-start gap-3 max-w-[85%] animate-in slide-in-from-left-4">
       <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-lg">
             AI
          </div>
          <span className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">İNCİ</span>
       </div>
       <div className="bg-slate-100 p-6 rounded-[2rem] rounded-tl-none text-xl font-bold text-slate-800 leading-relaxed shadow-sm">
          {text}
       </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-end gap-3 max-w-[85%] ml-auto animate-in slide-in-from-right-4">
       <div className="bg-blue-600 p-6 rounded-[2rem] rounded-tr-none text-xl font-bold text-white leading-relaxed shadow-xl shadow-blue-200">
          {text}
       </div>
    </div>
  );
}

function SummaryItem({ text }: { text: string }) {
  return (
    <div className="flex gap-4 items-start group">
       <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 group-hover:scale-110 transition-transform">
          <FileText size={16} />
       </div>
       <p className="text-xl font-black text-slate-800 tracking-tight leading-tight">{text}</p>
    </div>
  );
}
