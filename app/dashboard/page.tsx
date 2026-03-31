"use client";

import { useState } from "react";

const rows = [
  { student: "Ayşe K.", subject: "Üslü Sayılar", book: "Karekök Yayınları", pages: 20, questions: 60, duration: "45 dk", status: "✅ Tamam" },
  { student: "Ahmet Y.", subject: "Modern Fizik", book: "Palme", pages: 15, questions: 40, duration: "30 dk", status: "⏳ Devam" },
  { student: "Mehmet D.", subject: "Organik Kimya", book: "Aydın", pages: 8, questions: 15, duration: "10 dk", status: "🔴 Yetersiz" },
];

const getSimulatedAIResponse = (input: string) => {
  const lowercaseInput = input.toLowerCase();

  if (lowercaseInput.includes("ders") || lowercaseInput.includes("çalış")) {
    return "Bugün matematik dersinde 40 soru çözdün, harikasın! Trigonometriye odaklanmanı öneririm.";
  }
  if (lowercaseInput.includes("meet") || lowercaseInput.includes("toplantı")) {
    return "Google Meet linkin otomatik olarak oluşturuldu. Öğrencin Ahmet seni bekliyor.";
  }
  if (lowercaseInput.includes("pdf") || lowercaseInput.includes("yükle")) {
    return "PDF başarıyla tarandı. İçerikte 12 adet çözülmüş soru ve 3 adet konu özeti buldum.";
  }

  return "Seni anlıyorum. Eğitim yolculuğunda her zaman yanındayım!";
};

const playVoice = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "tr-TR";
  speech.pitch = 1.0;
  speech.rate = 0.9;
  window.speechSynthesis.speak(speech);
};

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      const out = getSimulatedAIResponse("ders");
      setAnalysis(out);
      playVoice(out);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-black uppercase tracking-wide">AI Dashboard (Dikey)</h1>

        <div className="mb-6 rounded-lg border border-black bg-yellow-100 p-4">
          <p className="font-bold uppercase text-xs">AI Önerisi</p>
          <p className="mt-1 text-sm italic">Ayşe bugün 50 soru çözdü, harika! Devamında kısa testler ve tekrar öneriyorum.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-2 text-left">Öğrenci</th>
                <th className="p-2 text-left">Konu</th>
                <th className="p-2 text-left">Kitap</th>
                <th className="p-2 text-left">Sayfa</th>
                <th className="p-2 text-left">Soru</th>
                <th className="p-2 text-left">Süre</th>
                <th className="p-2 text-left">Durum</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-slate-100" : "bg-white"}>
                  <td className="p-2">{row.student}</td>
                  <td className="p-2">{row.subject}</td>
                  <td className="p-2">{row.book}</td>
                  <td className="p-2">{row.pages}</td>
                  <td className="p-2">{row.questions}</td>
                  <td className="p-2">{row.duration}</td>
                  <td className="p-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleAnalysis}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "AI Analiz Ediyor..." : "Generate AI Analysis"}
          </button>

          {analysis && (
            <div className="rounded border border-slate-300 bg-slate-100 p-4">
              <p className="font-semibold">AI Sonucu:</p>
              <p>{analysis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
