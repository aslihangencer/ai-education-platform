'use client';

import { useState } from 'react';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { PlusCircle, Edit3, Trash2, Mic, Eye, FileAudio } from 'lucide-react';
import VoiceRecorder from '@/components/VoiceRecorder';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TeacherLessonsPage() {
  const { data: lessons, error, mutate } = useSWR('/api/lessons', fetcher);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', audioUrl: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Ders başarıyla eklendi! ✨', { icon: '👏' });
        setFormData({ title: '', content: '', audioUrl: '' });
        setIsCreating(false);
        mutate();
        if ('vibrate' in navigator) navigator.vibrate(200);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Ders eklenirken hata oluştu.');
      }
    } catch (error) {
      toast.error('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`"${title}" dersini tamamen silmek istediğinize emin misiniz?`)) {
      toast.error('Simülasyon: Silme işlemi şu anda kapalı.', { icon: '🔒' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-4 border-slate-200 pb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500 rounded px-1" tabIndex={0}>
            Açık Ders Yönetimi
          </h1>
          <p className="text-xl text-slate-600 font-semibold mt-2" tabIndex={0}>Mevcut tüm dersleri listele ve yeni içerik, sesli not üret.</p>
        </div>
        
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-8 focus:ring-blue-300 text-white font-black text-2xl h-16 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
            aria-label="Yeni Ders İçeriği Ekle"
          >
            <PlusCircle size={28} />
            <span>Yeni Ekle</span>
          </button>
        )}
      </header>

      {isCreating && (
        <section className="bg-white p-8 rounded-2xl shadow-xl border-4 border-blue-100" aria-label="Yeni Ders Ekleme Formu">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3"><Edit3 className="text-blue-700"/> Yeni İçerik Editörü</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-2xl font-bold text-slate-800 mb-2">Ders Başlığı</label>
              <input 
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xl p-4 border-4 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-300 transition-all font-semibold"
                placeholder="Örn: Evrensel Tasarım Prensipleri"
              />
            </div>
            
            <div className="border-t-4 border-dashed border-slate-200 pt-8 mt-8">
               <h3 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                 <Mic className="text-red-500" /> Öğrenciler İçin Sesli Not (Opsiyonel)
               </h3>
               <p className="text-lg text-slate-500 mb-6 font-semibold">Öğrencilere kendi sesinizle rehberlik edin (Maksimum 45 Saniye).</p>
               <VoiceRecorder onSave={(base64: string | null) => setFormData({ ...formData, audioUrl: base64 || '' })} />
            </div>

            <div className="border-t-4 border-dashed border-slate-200 pt-8 mt-8">
              <label htmlFor="content" className="block text-2xl font-bold text-slate-800 mb-2">Okunacak Ders Metni (Yapay zeka seslendirecek)</label>
              <textarea 
                id="content"
                required
                rows={5}
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                className="w-full text-xl p-4 border-4 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-300 transition-all font-semibold resize-y"
                placeholder="Öğrenciler dersi açtığında sesli asistan tarafından bu alandaki metin okunacaktır..."
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 min-h-[80px] bg-green-600 hover:bg-green-700 text-white font-black text-2xl rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-8 focus:ring-green-400"
              >
                {loading ? 'Kaydediliyor...' : 'Yayınla ve Kaydet'}
              </button>
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 min-h-[80px] bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-2xl rounded-2xl transition-all active:scale-95 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] focus:outline-none focus:ring-8 focus:ring-slate-400"
              >
                İptal Et
              </button>
            </div>
          </form>
        </section>
      )}

      {!lessons && !error && (
        <div className="flex items-center justify-center p-12" aria-busy="true">
           <div className="text-3xl font-black text-slate-400 animate-pulse">Dersler yükleniyor...</div>
        </div>
      )}

      {Array.isArray(lessons) && lessons.length === 0 && (
        <div className="text-center p-16 bg-white rounded-2xl border-4 border-dashed border-slate-300" tabIndex={0}>
           <p className="text-2xl font-bold text-slate-500 mb-4">Henüz yayınlanmış bir ders bulunmuyor.</p>
           <p className="text-lg text-slate-400">Yukarıdaki butona tıklayarak ilk içerik harikanızı oluşturun!</p>
        </div>
      )}

      {Array.isArray(lessons) && lessons.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {lessons.map((lesson: any) => (
            <article key={lesson.id} className="bg-white p-8 rounded-2xl shadow-md border-2 border-slate-200 flex flex-col hover:border-blue-400 transition-all">
               <div className="flex-1">
                 <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight" tabIndex={0}>{lesson.title}</h3>
                 <p className="text-xl text-slate-600 font-medium line-clamp-3 mb-6" tabIndex={0}>{lesson.content}</p>
                 <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 flex-col md:flex-row rounded-lg font-bold">
                    <span className="flex items-center gap-1"><Mic size={18}/> Dinamik TTS hazır</span>
                    {lesson.audioUrl && (
                      <span className="flex items-center gap-1 ml-4 text-green-700"><FileAudio size={18}/> 🎙️ Öğretmen Sesi Eklendi</span>
                    )}
                 </div>
               </div>
               
               <div className="flex gap-4 border-t-2 border-slate-100 pt-6 mt-6">
                 <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 font-black rounded-xl transition-colors focus:ring-4 outline-none">
                    <Eye size={24}/> İncele
                 </button>
                 <button onClick={() => handleDelete(lesson.id, lesson.title)} className="flex items-center justify-center gap-2 px-8 py-4 bg-red-50 hover:bg-red-600 hover:text-white text-red-700 font-black rounded-xl transition-colors focus:ring-4 outline-none">
                    <Trash2 size={24}/>
                 </button>
               </div>
            </article>
           ))}
        </div>
      )}
    </div>
  );
}
