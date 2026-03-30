"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Volume2, CheckCircle, XCircle, RotateCcw, Headphones, Keyboard } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

/**
 * QuizPlayer:
 * Core educational module for Accessible Academy.
 * Focuses on an "Auditory Quiz" experience where students use voice and keyboard
 * to answer AI-generated questions.
 */
export const QuizPlayer = ({ 
  questions, 
  title = "AI Kazanım Kavrama Testi" 
}: { 
  questions: QuizQuestion[], 
  title?: string 
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQ = questions[currentIdx];

  // 1. Voice Synthesis Logic
  const announceQuestion = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      
      const qText = `Soru ${currentIdx + 1}: ${currentQ.question}. Seçenekler şunlardır: `;
      const optionsText = currentQ.options
        .map((opt, i) => `${i + 1}. ${opt}.`)
        .join(" ");
      const hint = " Lütfen 1 2 3 veya 4 tuşuna basın, ya da seçeneğe tıklayın.";

      const utterance = new SpeechSynthesisUtterance(qText + optionsText + hint);
      utterance.lang = "tr-TR";
      utterance.rate = 0.9;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentIdx, currentQ]);

  // Use state instead of local isPlaying for UI
  const [isPlaying, setIsPlaying] = useState(false);

  // 2. Answer Handling
  const handleAnswer = (idx: number) => {
    if (selectedIdx !== null) return; // Prevent double clicks
    
    setSelectedIdx(idx);
    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
      playFeedback("Tebrikler! Doğru cevap.");
    } else {
      playFeedback(`Maalesef yanlış. Doğru seçenek: ${currentQ.options[currentQ.correctAnswer]}.`);
    }

    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(c => c + 1);
        setSelectedIdx(null);
      } else {
        setShowResults(true);
      }
    }, 3000);
  };

  const playFeedback = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    window.speechSynthesis.speak(utterance);
  };

  // 3. Keyboard Navigation
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (showResults) return;
      
      if (e.key === "1") handleAnswer(0);
      if (e.key === "2") handleAnswer(1);
      if (e.key === "3") handleAnswer(2);
      if (e.key === "4") handleAnswer(3);
      if (e.key === "r" || e.key === "R") announceQuestion();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [showResults, announceQuestion, handleAnswer]);

  // Initial announcement
  useEffect(() => {
    if (!showResults) {
      announceQuestion();
    }
  }, [currentIdx, showResults]);

  if (showResults) {
    return (
      <Card className="p-16 border-[12px] border-blue-600 rounded-[4rem] text-center space-y-10 bg-slate-900 text-white shadow-3xl animate-in zoom-in duration-500">
         <div className="bg-blue-600/20 w-32 h-32 mx-auto rounded-full flex items-center justify-center text-blue-400">
            <Award size={64} />
         </div>
         <div className="space-y-4">
            <h2 className="text-5xl font-black uppercase tracking-widest italic">Sınav Tamamlandı!</h2>
            <p className="text-3xl font-bold text-slate-400">Başarı Oranın: %{(score / questions.length) * 100}</p>
         </div>
         <div className="text-8xl font-black text-blue-500 tracking-tighter">
            {score}/{questions.length}
         </div>
         <Button 
            className="h-20 px-12 text-3xl font-black rounded-3xl w-full"
            onClick={() => window.location.reload()}
         >
            <RotateCcw className="mr-4" /> YENİDEN BAŞLAT
         </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-700">
      
      {/* HEADER: PROGRESS */}
      <header className="w-full flex justify-between items-end border-b-8 border-slate-100 pb-8">
        <div>
           <div className="inline-flex items-center gap-3 bg-blue-600/10 text-blue-600 px-6 py-2 rounded-full font-black uppercase italic tracking-widest text-lg">
              <Headphones size={24} /> {title}
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase italic leading-none mt-4">
             SORU {currentIdx + 1} / {questions.length}
           </h2>
        </div>
        <div className="text-right">
           <p className="text-4xl font-black text-blue-600 tabular-nums">{score} PUAN</p>
           <p className="text-lg font-bold text-slate-400 uppercase tracking-widest italic">BAŞARI</p>
        </div>
      </header>

      {/* QUESTION CARD */}
      <Card className="w-full p-12 bg-slate-900 border-[12px] border-blue-600 rounded-[3.5rem] shadow-3xl space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
           <Sparkles size={180} />
        </div>
        
        <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight text-center italic">
          {currentQ.question}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {currentQ.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selectedIdx !== null}
              className={`p-10 text-3xl font-black rounded-[2.5rem] border-8 transition-all transform active:scale-95 flex items-center justify-between group
                ${selectedIdx === null 
                  ? "bg-blue-700 border-blue-500 text-white hover:bg-white hover:text-blue-700 hover:border-white shadow-xl" 
                  : selectedIdx === i
                    ? i === currentQ.correctAnswer 
                      ? "bg-green-600 border-green-400 text-white shadow-none" 
                      : "bg-red-600 border-red-400 text-white shadow-none"
                    : i === currentQ.correctAnswer
                      ? "bg-green-600/20 border-green-600/40 text-green-500 opacity-50"
                      : "opacity-20 translate-y-4"
                }`}
              aria-label={`Seçenek ${i + 1}: ${opt}`}
            >
              <div className="flex items-center gap-6">
                 <span className="opacity-30 group-hover:opacity-100 transition-opacity italic">{i + 1}.</span>
                 <span className="text-left leading-none">{opt}</span>
              </div>
              {selectedIdx === i && (
                i === currentQ.correctAnswer ? <CheckCircle size={48} /> : <XCircle size={48} />
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button 
            variant="outline" 
            onClick={announceQuestion}
            className="px-10 h-16 rounded-2xl border-white/20 text-white hover:bg-white/10 text-xl font-black uppercase italic tracking-widest gap-4"
          >
            <RotateCcw size={28} /> SORUYU TEKRAR DİNLE (R)
          </Button>
        </div>
      </Card>

      <footer className="w-full flex items-center justify-center gap-10 opacity-40">
         <div className="flex items-center gap-3 text-slate-500 font-bold">
            <Keyboard size={24} /> <span className="uppercase tracking-widest">1, 2, 3, 4: CEVAPLA</span>
         </div>
         <div className="flex items-center gap-3 text-slate-500 font-bold">
            <Volume2 size={24} /> <span className="uppercase tracking-widest">SESLİ OKUMA AKTİF</span>
         </div>
      </footer>

    </div>
  );
};

export default QuizPlayer;

function Award(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 15l-3.5 1.5 1-4.5-3-3.5 4.5-.5L12 4l1 4 4.5.5-3 3.5 1 4.5L12 15z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function Sparkles(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
