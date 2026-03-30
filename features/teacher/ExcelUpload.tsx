"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { importLessonsFromExcel } from "@/app/actions/import-lessons";
import { toast } from "react-hot-toast";

/**
 * ExcelUpload:
 * A professional Drag & Drop component for teachers to bulk-upload 
 * student lesson records. Features real-time feedback and A11y audio cues.
 */
export const ExcelUpload = () => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await importLessonsFromExcel(formData);
      if (result.success) {
        toast.success(`${result.count} ders kaydı başarıyla eklendi!`, {
          icon: '🚀',
          style: { borderRadius: '20px', background: '#1e293b', color: '#fff' },
        });
        
        // Auditory feedback for visually impaired teachers
        if ("speechSynthesis" in window) {
           const speech = new SpeechSynthesisUtterance(`${result.count} kayıt sisteme işlendi.`);
           speech.lang = "tr-TR";
           window.speechSynthesis.speak(speech);
        }
      }
    } catch (err) {
      toast.error("Dosya formatı hatalı. Lütfen şablonu kullanın.");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] 
    },
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`
        relative p-12 border-8 border-dashed rounded-[3rem] transition-all cursor-pointer text-center group
        ${isDragActive 
          ? "border-blue-600 bg-blue-50/50 scale-[0.98] shadow-inner" 
          : "border-slate-200 bg-white hover:border-blue-600 hover:shadow-2xl"}
      `}
      aria-label="Excel dosyasını buraya sürükleyin veya tıklayarak yükleyin (Ders Kayıtları)"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-6">
        <div className={`p-8 rounded-full transition-colors ${isDragActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"}`}>
           {loading ? (
             <Loader2 className="w-16 h-16 animate-spin" />
           ) : (
             <FileSpreadsheet className="w-16 h-16" />
           )}
        </div>
        
        <div className="space-y-2">
           <h3 className="text-4xl font-black uppercase italic tracking-tighter">
             {isDragActive ? "BURAYA BIRAK!" : "EXCEL DOSYASINI YÜKLE"}
           </h3>
           <p className="text-xl font-bold text-slate-500 italic opacity-60">
             Veya tıklayarak .xlsx formatında dosya seçin
           </p>
        </div>

        {isDragActive && (
          <div className="absolute inset-0 bg-blue-600/5 rounded-[2.5rem] animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default ExcelUpload;
