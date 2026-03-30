'use client';

import React from 'react';
import { FileText, Download, FileUp, MoreVertical, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface FileCardProps {
  name: string;
  type: string;
}

export const FileCard: React.FC<FileCardProps> = ({ name, type }) => {
  const handleDownload = () => {
    alert(`📥 "${name}" dosyası indiriliyor...`);
  };

  const handlePreview = () => {
    alert(`👁️ "${name}" dosyası önizleniyor.`);
  };

  return (
    <div 
      className="p-6 rounded-[2rem] border-4 border-slate-50 dark:border-slate-800 hover:border-emerald-400 bg-white dark:bg-slate-900 hover:bg-emerald-50/20 transition-all group flex items-center justify-between cursor-pointer shadow-premium"
      tabIndex={0}
      onClick={handlePreview}
    >
      <div className="flex items-center gap-6">
         <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-3xl text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:rotate-6">
            <FileText size={32} />
         </div>
         <div className="text-left">
            <p className="font-black text-2xl text-slate-800 dark:text-white tracking-tight line-clamp-1 uppercase italic leading-none">{name}</p>
            <div className="flex items-center gap-3 mt-3">
               <span className="text-sm font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-lg uppercase tracking-widest">{type}</span>
               <span className="text-lg font-bold text-slate-400 italic">2.4 MB</span>
            </div>
         </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
           onClick={(e) => { e.stopPropagation(); handleDownload(); }}
           className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-all active:scale-90"
           aria-label="İndir"
        >
           <Download size={28} />
        </button>
        <button className="p-4 text-slate-200 transition-colors" aria-label="Seçenekler">
           <MoreVertical size={24} />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
