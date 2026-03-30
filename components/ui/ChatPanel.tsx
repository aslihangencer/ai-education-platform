'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, MoreVertical, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ChatMessage {
  sender: string;
  message: string;
}

export const ChatPanel: React.FC<{ initialMessages?: ChatMessage[] }> = ({ initialMessages = [] }) => {
  const [chat, setChat] = useState(initialMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChat([...chat, { sender: 'Ben', message: input }]);
    setInput('');
    setTimeout(() => {
       alert(`💬 Mesaj gönderildi: ${input}`);
    }, 500);
  };

  useEffect(() => {
     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat]);

  return (
    <Card className="flex flex-col h-[600px] border-4 border-slate-100 dark:border-slate-800 rounded-premium overflow-hidden bg-slate-50 dark:bg-slate-950 p-0 shadow-premium group">
       <div className="bg-white dark:bg-slate-900 p-8 border-b-4 border-slate-50 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600"><MessageSquare size={28} /></div>
            <div>
               <h3 className="font-black text-3xl italic tracking-tight text-slate-800 dark:text-white uppercase leading-none">Sınıf Sohbeti</h3>
               <p className="text-xl font-bold text-slate-400 mt-1 uppercase italic tracking-widest">Aktif Kanal</p>
            </div>
          </div>
          <button className="p-4 hover:bg-slate-50 text-slate-300 transition-colors rounded-2xl"><MoreVertical size={24} /></button>
       </div>
       
       <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
          {(chat.length > 0 ? chat : [
            { sender: "Sistem", message: "Hoş geldiniz! Sohbet şu an aktif." }
          ]).map((m, i) => {
             const isMe = m.sender === 'Ben';
             return (
               <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-${isMe ? 'right' : 'left'}-4 duration-300`}>
                  <div className={`flex items-center gap-3 mb-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-lg font-black text-slate-400 uppercase italic tracking-widest">{m.sender}</span>
                    <span className="text-sm font-bold text-slate-300 uppercase leading-none">12:45</span>
                  </div>
                  <div className={`px-8 py-6 rounded-[2.5rem] max-w-[85%] shadow-premium transition-all hover:shadow-xl ${isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white rounded-bl-sm'}`}>
                     <p className="font-extrabold text-2xl leading-relaxed">{m.message}</p>
                  </div>
               </div>
             );
          })}
       </div>

       <form onSubmit={sendMessage} className="p-6 bg-white dark:bg-slate-900 border-t-4 border-slate-50 dark:border-slate-800 flex gap-4 shrink-0 items-center">
          <button type="button" className="p-4 text-slate-400 hover:text-primary transition-all rounded-2xl hover:bg-slate-50" aria-label="Dosya Ekle">
             <Paperclip size={28} />
          </button>
          <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Mesajınızı buraya yazın..."
             className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] h-20 px-8 font-black text-slate-800 dark:text-white outline-none focus:ring-8 ring-primary/20 border-4 border-transparent focus:border-primary transition-all text-2xl"
          />
          <Button 
            type="submit" 
            variant="primary"
            className="w-20 h-20 flex items-center justify-center rounded-[1.5rem] transition-all disabled:opacity-40" 
            disabled={!input.trim()}
            aria-label="Gönder"
          >
             <Send size={32} />
          </Button>
       </form>
    </Card>
  );
};

export default ChatPanel;
