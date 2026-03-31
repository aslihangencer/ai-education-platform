'use client';

import React, { useState } from 'react';
import { getSimulatedAIResponse } from '@/lib/fake-ai';

const playVoice = (text: string) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'tr-TR';
  speech.pitch = 1.0;
  speech.rate = 0.9; // Biraz daha "bilge" ve yavaş konuşsun
  window.speechSynthesis.speak(speech);
};

const mockData = [
  { öğrenci: 'Ayşe K.', konu: 'Üslü Sayılar', kitap: 'Karekök Yayınları', soru: 60, süre: '45 dk', durum: '✅ Tamam' },
  { öğrenci: 'Ahmet Y.', konu: 'Modern Fizik', kitap: 'Palme', soru: 40, süre: '30 dk', durum: '⏳ Devam' },
  { öğrenci: 'Mehmet D.', konu: 'Organik Kimya', kitap: 'Aydın', soru: 15, süre: '10 dk', durum: '🔴 Yetersiz' },
];

export default function AIDashboard() {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleAnaliz = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const response = getSimulatedAIResponse('analiz');
      setAiResponse(response);
      playVoice(response);
    }, 2000);
  };

  const handleMeet = () => {
    const response = getSimulatedAIResponse('meet');
    setAiResponse(response);
    playVoice(response);
  };

  const handlePdf = () => {
    const response = getSimulatedAIResponse('pdf');
    setAiResponse(response);
    playVoice(response);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen text-[13px]">
      <h1 className="text-xl font-black italic border-b-2 border-black pb-2 uppercase tracking-tighter">
        Living Academy AI Intelligence
      </h1>

      {/* AI ÖNERİSİ */}
      <div className="bg-yellow-300 p-4 rounded-lg shadow-lg border-2 border-black">
        <p className="font-bold uppercase text-[11px] mb-1">AI Tavsiyesi</p>
        <p className="italic font-medium">"Ayşe'nin fizik notları çok iyi gidiyor. Onu ileri seviye bir testle ödüllendir."</p>
      </div>

      {/* AI YANITI */}
      {aiResponse && (
        <div className="bg-green-200 p-4 rounded-lg shadow-lg border-2 border-black">
          <p className="font-bold uppercase text-[11px] mb-1">AI Yanıtı</p>
          <p className="italic font-medium">{aiResponse}</p>
        </div>
      )}

      {/* EXCEL TABLOSU */}
      <div className="bg-white border-2 border-black overflow-hidden rounded-md">
        <div className="bg-black text-white p-2 font-bold uppercase text-center">Öğrenci Takip Exceli</div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-black p-2 text-left">Öğrenci</th>
              <th className="border border-black p-2 text-left">Konu</th>
              <th className="border border-black p-2 text-left">Kitap</th>
              <th className="border border-black p-2 text-left">Soru</th>
              <th className="border border-black p-2 text-left">Süre</th>
              <th className="border border-black p-2 text-left">Durum</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-black p-2">{row.öğrenci}</td>
                <td className="border border-black p-2">{row.konu}</td>
                <td className="border border-black p-2">{row.kitap}</td>
                <td className="border border-black p-2">{row.soru}</td>
                <td className="border border-black p-2">{row.süre}</td>
                <td className="border border-black p-2">{row.durum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AKSİYON TUŞLARI */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={handleAnaliz}
          className="bg-blue-600 text-white p-4 font-black uppercase hover:bg-black transition-all"
        >
          {loading ? "AI Analiz Ediyor..." : "Sınıfı AI İle Kontrol Et"}
        </button>
        <button
          onClick={handleMeet}
          className="bg-green-600 text-white p-4 font-black uppercase hover:bg-black transition-all"
        >
          Google Meet Linki Oluştur
        </button>
        <button
          onClick={handlePdf}
          className="bg-purple-600 text-white p-4 font-black uppercase hover:bg-black transition-all"
        >
          PDF'yi Tara ve Analiz Et
        </button>
      </div>
    </div>
  );
}