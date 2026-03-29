'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

/**
 * VoiceAssistant: Leverages Web Speech API for voice-driven navigation.
 * Triggers on a global shortcut (e.g., Alt + V).
 */
export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const handleSpeech = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const Recognition = (window as any).webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.lang = 'tr-TR'; // Turkish for the user
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Voice Command:', transcript);

      // Simple keyword-based navigation
      if (transcript.includes('dashboard') || transcript.includes('panel')) {
        router.push('/student');
        speak('Öğrenci paneline yönlendiriliyorsunuz.');
      } else if (transcript.includes('teacher') || transcript.includes('öğretmen')) {
        router.push('/teacher');
        speak('Öğretmen çalışma alanına yönlendiriliyorsunuz.');
      } else if (transcript.includes('home') || transcript.includes('ana sayfa')) {
        router.push('/');
        speak('Ana sayfaya dönülüyor.');
      } else {
        speak('Komut anlaşılamadı. Lütfen tekrar deneyin.');
      }
    };

    recognition.start();
  }, [router]);

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
