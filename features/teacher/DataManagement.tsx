"use client";

import { Download, UploadCloud, Info } from "lucide-react";
import { ExcelUpload } from "./ExcelUpload";
import { Card } from "@/components/ui/Card";

/**
 * DataManagement:
 * The management hub for teachers. 
 * Combines the ExcelUpload area with template export and system instructions.
 */
export const DataManagement = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      {/* 1. EXCEL UPLOAD ZONE (MAJOR) */}
      <div className="lg:col-span-8">
        <ExcelUpload />
      </div>

      {/* 2. REHBER & ŞABLON (SUPPORT) */}
      <div className="lg:col-span-4 bg-slate-900 text-white p-10 rounded-[3rem] flex flex-col justify-between border-8 border-slate-900 shadow-3xl relative overflow-hidden group">
        
        {/* Visual Decoration */}
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
           <Info size={120} />
        </div>

        <div className="space-y-6 relative z-10">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter">VERİ SİSTEM REHBERİ</h3>
          <p className="text-lg font-bold text-slate-400 leading-relaxed italic">
            Öğrenci gelişimini AI analitiklerine aktarabilmek için Excel dosyanızın kolon isimleri 
            <span className="text-blue-400"> standart şablon</span> ile birebir aynı olmalıdır.
          </p>
          <ul className="space-y-2 text-sm font-black text-slate-500 uppercase tracking-widest">
             <li className="flex items-center gap-2 underline decoration-blue-600 underline-offset-4 decoration-4">Sütun 1: Tarih (Date)</li>
             <li className="flex items-center gap-2 underline decoration-blue-600 underline-offset-4 decoration-4">Sütun 2: Kitap (BookName)</li>
             <li className="flex items-center gap-2 underline decoration-blue-600 underline-offset-4 decoration-4">Sütun 3: Sayfa (PagesRead)</li>
          </ul>
        </div>
        
        <a 
          href="/api/template" 
          download="engelsiz_akademi_sablon.xlsx"
          className="mt-10 flex items-center justify-center gap-4 bg-blue-600 hover:bg-white hover:text-blue-600 transition-all p-8 rounded-3xl font-black uppercase italic tracking-widest text-xl group"
        >
          <Download size={32} className="group-hover:translate-y-1 transition-transform" />
          ÖRNEK ŞABLONU İNDİR
        </a>
      </div>

    </div>
  );
};

export default DataManagement;
