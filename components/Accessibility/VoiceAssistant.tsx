'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Volume2 } from 'lucide-react';

/**
 * VoiceAssistant: Advanced voice-driven navigation inspired by VoiceOver and Be My Eyes.
 * Features continuous listening, contextual commands, and visual assistance requests.
 */
export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const router = useRouter();

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'tr-TR';
      speech.pitch = 1.0;
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
  }, []);

  const handleSpeech = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      speak('Ses tanıma bu tarayıcıda desteklenmiyor.');
      return;
    }

    const Recognition = (window as any).webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = 'tr-TR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      speak('Dinliyorum...');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log('Voice Command:', transcript);
      setLastCommand(transcript);

      // Enhanced command recognition
      if (transcript.includes('dashboard') || transcript.includes('panel') || transcript.includes('ana sayfa')) {
        router.push('/dashboard');
        speak('AI Dashboard\'a yönlendiriliyorsunuz.');
      } else if (transcript.includes('öğrenci') || transcript.includes('student')) {
        router.push('/student');
        speak('Öğrenci çalışma alanına yönlendiriliyorsunuz.');
      } else if (transcript.includes('öğretmen') || transcript.includes('teacher')) {
        router.push('/teacher');
        speak('Öğretmen paneline yönlendiriliyorsunuz.');
      } else if (transcript.includes('analiz') || transcript.includes('ai')) {
        // Simulate clicking AI analysis button
        const aiButton = document.querySelector('[aria-label*="AI analiz"]') as HTMLButtonElement;
        if (aiButton) {
          aiButton.click();
          speak('AI analizi başlatılıyor.');
        } else {
          speak('AI analiz butonu bulunamadı.');
        }
      } else if (transcript.includes('yardım') || transcript.includes('help')) {
        speak('Kullanılabilir komutlar: dashboard, öğrenci, öğretmen, analiz, yardım, durdur. Görsel yardım için "görsel yardım" deyin.');
      } else if (transcript.includes('görsel yardım') || transcript.includes('be my eyes')) {
        speak('Görsel yardım modu etkinleştirildi. Lütfen ne görmek istediğinizi tarif edin.');
        // Here you could integrate with Be My Eyes API or similar service
      } else if (transcript.includes('durdur') || transcript.includes('stop')) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          speak('Ses durduruldu.');
        } else {
          speak('Şu anda ses çalmıyor.');
        }
      } else if (transcript.includes('tekrar') || transcript.includes('repeat')) {
        if (lastCommand) {
          speak(`Son komut: ${lastCommand}`);
        } else {
          speak('Henüz bir komut verilmedi.');
        }
      } else {
        speak(`"${transcript}" komutu anlaşılamadı. Yardım için "yardım" deyin.`);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      speak('Ses tanıma hatası oluştu. Lütfen tekrar deneyin.');
      setIsListening(false);
    };

    recognition.start();
  }, [router, speak, lastCommand]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'v') {
        e.preventDefault();
        setIsActive(!isActive);
        if (!isActive) {
          speak('Sesli asistan etkinleştirildi. Komut vermek için konuşun.');
        } else {
          speak('Sesli asistan devre dışı bırakıldı.');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, speak]);

  if (!isActive) {
    return (
      <button
        onClick={() => setIsActive(true)}
        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-110 focus:ring-4 focus:ring-blue-300"
        aria-label="Sesli asistanı etkinleştir (Alt + V)"
        title="Sesli asistanı etkinleştir (Alt + V)"
      >
        <MicOff className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSpeech}
        disabled={isListening}
        className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-110 focus:ring-4 focus:ring-blue-300 ${
          isListening
            ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-label={isListening ? "Dinleniyor..." : "Sesli komut ver"}
        title={isListening ? "Dinleniyor..." : "Sesli komut ver (Alt + V ile aç/kapa)"}
      >
        {isListening ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>

      {lastCommand && (
        <div className="bg-white rounded-lg px-3 py-1 shadow-md text-xs text-slate-600 max-w-32 truncate">
          Son: {lastCommand}
        </div>
      )}

      <button
        onClick={() => setIsActive(false)}
        className="text-xs text-slate-500 hover:text-slate-700 underline"
        aria-label="Sesli asistanı kapat"
      >
        Kapat
      </button>
    </div>
  );
}

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const handleGlobalShortcut = (e: KeyboardEvent) => {
      // Alt + V for Voice Assistant
      if (e.altKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        handleSpeech();
      }
    };

    window.addEventListener('keydown', handleGlobalShortcut);
    return () => window.removeEventListener('keydown', handleGlobalShortcut);
  }, [handleSpeech]);

  return (
    <div 
      aria-live="assertive" 
      className={`voiceStatus ${isListening ? 'listening' : ''}`}
      style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
    >
      {isListening && (
        <div className="voiceIndicator">
          <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48" style={{ color: 'var(--primary)', animation: 'pulse 1.5s infinite' }}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span className="sr-only">Sesli asistan dinliyor...</span>
        </div>
      )}
    </div>
  );
}
