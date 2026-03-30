'use client';

import React, { useState, useMemo } from "react";
import DashboardShell from "@/components/DashboardShell";
import { VoiceAssistant } from "@/features/ai/VoiceAssistant";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BookOpen, Sparkles, FileText, Headphones, ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * StudentLessonPage:
 * A functional, accessible lesson view that integrates the AI-analyzed PDF content
 * with voice-first navigation.
 */
export default function StudentLessonPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  // Mock data for demonstration of the flow
  const mockLesson = {
    title: "Kuantum Fiziğine Giriş: Schrödinger'in Kedisi",
    author: "Dr. Selin Gökçe",
    date: "30 Mart 2026"
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate Gemini 1.5 Pro processing delay
    setTimeout(() => {
      setAnalysisResult(`
        HOŞ GELDİNİZ. BU DERSİN KONUSU: KUANTUM FİZİĞİNE GİRİŞ.
        
        1. GENEL YAPI: BU MATERYAL 3 ANA BÖLÜMDEN OLUŞUYOR. ÖNCE TEORİK TEMELLER, SONRA DENEYSEL GÖZLEMLER VE SON OLARAK MATEMATİKSEL MODELLER.
        
        2. MANTIKSAL AKIŞ: 
           İLK OLARAK, KUANTUM SÜPERPOZİSYONU KAVRAMINI İNCELEYECEĞİZ. BU, BİR PARÇACIĞIN AYNI ANDA BİRDEN FAZLA DURUMDA OLABİLECEĞİ ANLAMINA GELİR.
           BUNUN ÜZERİNE, SCHRÖDINGER'İN MEŞHUR KEDİ DENEYİNİ ELE ALACAĞIZ. BU DENEY, SÜPERPOZİSYONUN MAKROSKOBİK DÜNYADAKİ ABSÜRTLÜĞÜNÜ GÖSTERİR.
           FİNALDE İSE, GÖZLEMCİ ETKİSİNİ VE DALGA FONKSİYONUNUN ÇÖKMESİNİ KONUŞACAĞIZ.
        
        3. SORULAR:
           BİRİNCİ SORU: SÜPERPOZİSYON NEDİR?
           İKİNCİ SORU: GÖZLEMCİ ÖLÇÜM YAPTIĞINDA PARÇACIĞA NE OLUR?
           ÜÇÜNCÜ SORU: SCHRÖDINGER'İN KEDİSİ NEDEN AYNI ANDA HEM ÖLÜ HEM CANLIDIR?
        
        4. MEKANSAL TARİF:
           SAYFANIN SAĞ ÜST KÖŞESİNDE, BİR KUTU İÇİNDE HEM UYUYAN HEM DE UYANIK GÖZÜKEN BİR KEDİ ÇİZİMİ VAR. BU, SÜPERPOZİSYONUN GÖRSEL TEMSİLİDİR.
      `);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <DashboardShell role="student">
      <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 pb-24">
        
        {/* BACK NAVIGATION */}
        <Link href="/student" className="inline-flex items-center gap-3 text-slate-500 hover:text-blue-600 font-black uppercase italic tracking-widest text-lg transition-colors group">
           <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" /> Geri Dön
        </Link>

        {/* LESSON HEADER */}
        <header className="space-y-6 border-b-8 border-slate-100 pb-10">
           <div className="flex items-center gap-4 text-blue-600 font-black uppercase tracking-[0.2em]">
              <BookOpen size={32} /> DERS MATERYALİ
           </div>
           <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">
             {mockLesson.title}
           </h1>
           <div className="flex flex-wrap gap-6 pt-4">
              <span className="bg-slate-100 px-6 py-2 rounded-full text-xl font-bold text-slate-500">
                Eğitmen: {mockLesson.author}
              </span>
              <span className="bg-slate-100 px-6 py-2 rounded-full text-xl font-bold text-slate-500">
                Tarih: {mockLesson.date}
              </span>
           </div>
        </header>

        {/* ANALYSIS TRIGGER / CONTENT */}
        {!analysisResult ? (
          <section className="py-20 text-center space-y-10 bg-blue-50 rounded-[4rem] border-4 border-dashed border-blue-200">
            <div className="bg-white w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-xl text-blue-600">
               <FileText size={64} />
            </div>
            <div className="space-y-4">
               <h2 className="text-4xl font-black text-blue-900 uppercase italic">PDF Analize Hazır</h2>
               <p className="text-2xl font-bold text-blue-700/60 max-w-2xl mx-auto">
                 Gemini 1.5 Pro bu dokümanı senin için tarayacak ve mekansal bir ders özetine dönüştürecek.
               </p>
            </div>
            <Button 
               size="lg" 
               onClick={handleStartAnalysis}
               disabled={isAnalyzing}
               className="h-24 px-16 text-3xl font-black rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
               {isAnalyzing ? (
                 <span className="flex items-center gap-4"><Sparkles className="animate-spin" /> ANALİZ EDİLİYOR...</span>
               ) : (
                 <span className="flex items-center gap-4"><Sparkles /> AI ANALİZİNİ BAŞLAT</span>
               )}
            </Button>
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-12">
             
             {/* VOICE ASSISTANT (PRIORITY 1) */}
             <section aria-label="Sesli Asistan Kontrolü">
                <VoiceAssistant text={analysisResult} />
             </section>

             {/* TEXT BREAKDOWN (FOR BRAILLE READERS / LOW VISION) */}
             <section className="space-y-8 animate-in fade-in duration-1000 delay-300">
                <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4 italic uppercase">
                   <Headphones size={36} className="text-blue-600" /> DERS ÖZETİ METNİ
                </h2>
                <Card className="p-12 border-4 border-slate-100 rounded-[3rem] bg-white shadow-xl">
                   <div className="prose prose-2xl max-w-none text-slate-700 font-bold leading-relaxed whitespace-pre-wrap">
                      {analysisResult}
                   </div>
                </Card>
             </section>

          </div>
        )}

      </div>
    </DashboardShell>
  );
}
