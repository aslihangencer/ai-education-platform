"use client";

import { useState } from "react";
import { Video, Calendar, ArrowUpRight, User, Mail, Sparkles, TrendingUp } from "lucide-react";
import { handleScheduleMeeting } from "@/app/actions/schedule";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/Card";

/**
 * StudentActionList:
 * The primary operations center for teachers. 
 * Allows for quick assessment of student needs and 
 * one-click Google Meet scheduling (automated booking).
 */
export const StudentActionList = ({ students = [] }: { students?: any[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Fallback demo students if none provided
  const demoStudents = [
    { id: "s1", name: "Ali Yılmaz", email: "ali@example.com", status: "Yükselişte", trend: "+12%" },
    { id: "s2", name: "Ayşe Kaya", email: "ayse@example.com", status: "Stabil", trend: "0%" },
    { id: "s3", name: "Murat Han", email: "murat@example.com", status: "Kritik", trend: "-5%" },
  ];

  const displayStudents = students.length > 0 ? students : demoStudents;

  const onSchedule = async (id: string, email: string) => {
    setLoadingId(id);
    try {
      const result = await handleScheduleMeeting(id, email);
      
      if (result.success) {
        toast.success("Google Meet Randevusu Takvime İşlendi!", {
           icon: '📅',
           style: { borderRadius: '20px', background: '#2563eb', color: '#fff' }
        });
        
        // Open the meet link immediately for the teacher
        if (result.meetLink) {
           window.open(result.meetLink, "_blank");
        }
      } else {
        toast.error(result.error || "Randevu ayarlanırken bir hata oluştu.");
      }
    } catch (err) {
      toast.error("İşlem başarısız.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card className="mt-12 bg-white border-8 border-slate-900 rounded-[4rem] overflow-hidden shadow-3xl animate-in fade-in slide-in-from-bottom-10 duration-700">
      
      {/* HEADER SECTION */}
      <div className="p-10 border-b-8 border-slate-900 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h3 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">Öğrenci Takip & Aksiyon</h3>
           <p className="text-xl font-bold text-slate-400 mt-1 italic">Hızlı değerlendirme ve otomatik görüşme planlama.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest italic animate-pulse">
              CANLI TAKİP AKTİF
           </div>
        </div>
      </div>

      {/* STUDENT DATA LIST */}
      <div className="divide-y-8 divide-slate-900">
        {displayStudents.map((student) => (
          <div key={student.id} className="p-10 flex flex-col xl:flex-row justify-between items-center hover:bg-blue-50/50 transition-all gap-10 group">
            
            {/* STUDENT IDENTITY */}
            <div className="flex items-center gap-8 w-full xl:w-auto">
              <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-5xl font-black shadow-xl ring-8 ring-blue-50 group-hover:ring-white transition-all transform group-hover:scale-105">
                {student.name[0]}
              </div>
              <div>
                <h4 className="text-3xl font-black uppercase italic text-slate-900 tracking-tighter leading-none mb-2">{student.name}</h4>
                <div className="flex items-center gap-3 text-slate-400 font-bold">
                   <Mail size={18} /> <span>{student.email}</span>
                </div>
              </div>
            </div>

            {/* PERFORMANCE TAGS (VISUALLY RICH) */}
            <div className="flex flex-wrap gap-4 w-full xl:w-auto justify-center xl:justify-start">
               <div className="bg-indigo-50 border-2 border-indigo-100 px-6 py-3 rounded-2xl flex items-center gap-3">
                  <Sparkles size={20} className="text-indigo-600" />
                  <span className="font-black text-indigo-900 text-sm uppercase italic">YKS Matematik-1</span>
               </div>
               <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border-2 ${
                  student.status === 'Yükselişte' ? 'bg-green-50 border-green-100 text-green-700' : 
                  student.status === 'Kritik' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-slate-50 border-slate-100 text-slate-700'
               }`}>
                  <TrendingUp size={20} />
                  <span className="font-black text-sm uppercase italic">{student.trend || "Stabil"}</span>
               </div>
            </div>

            {/* ACTIONS (SaaS PRIMARY ACTIONS) */}
            <div className="flex gap-6 w-full xl:w-auto">
              <button 
                onClick={() => onSchedule(student.id, student.email)}
                disabled={loadingId === student.id}
                className="flex-1 xl:flex-none flex items-center justify-center gap-4 bg-slate-900 text-white px-10 h-24 rounded-[2rem] font-black uppercase italic tracking-widest text-xl hover:bg-blue-600 hover:scale-105 transition-all shadow-xl disabled:opacity-50"
                aria-label={`${student.name} için Google Meet seansı başlat`}
              >
                {loadingId === student.id ? (
                  <Sparkles className="animate-spin" size={32} />
                ) : (
                  <>
                    <Video size={32} className="fill-current" /> 
                    <span>RANDEVU AYARLA</span>
                  </>
                )}
              </button>
              <button className="p-8 border-4 border-slate-900 rounded-[2rem] text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-lg group">
                <ArrowUpRight size={36} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

          </div>
        ))}
      </div>

      <div className="p-10 bg-slate-50 border-t-8 border-slate-900 flex justify-center italic font-black text-slate-300 uppercase tracking-widest">
         SİSTEM SON GÜNCELLEME: ŞİMDİ
      </div>
    </Card>
  );
};

export default StudentActionList;
