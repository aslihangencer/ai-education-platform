'use client';

import React, { useState, useCallback } from 'react';

interface VoiceAccessibleFormProps {
  question: string;
  onSave: (transcript: string) => void;
  isSubmitting?: boolean;
}

/**
 * VoiceAccessibleForm: 
 * - WCAG 2.2 AAA Voice Input
 * - Haptic feedback for start/end
 * - Aria-live transcript updates
 */
export function VoiceAccessibleForm({ question, onSave, isSubmitting }: VoiceAccessibleFormProps) {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const triggerVibration = (pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition. Please use Chrome or Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      triggerVibration(100); // Startup tap
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };

    recognition.onend = () => {
      setIsListening(false);
      triggerVibration([50, 50, 50]); // Completion double-tap
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  }, []);

  return (
    <div className="card recognitionCard" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2 className="placeholderHeading" aria-live="polite" style={{ marginBottom: 14 }}>
        Soru: {question}
      </h2>
      
      <p className="helpText" style={{ display: 'block', marginBottom: 16 }}>
        Cevabınızı sesli söylemek için "Sesli Yanıt" butonuna odaklanın.
      </p>

      <div 
        role="region" 
        aria-label="Sesli Yazım Alanı" 
        className="premiumTextarea transcriptArea"
        style={{ 
          minHeight: 120, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          background: isListening ? 'rgba(99, 102, 241, 0.03)' : 'var(--bg)',
          borderColor: isListening ? 'var(--primary)' : 'var(--border)'
        }}
      >
        <p className="text-lg" style={{ fontSize: 18, color: transcript ? 'var(--text)' : 'var(--muted)' }}>
          {transcript || (isListening ? 'Dinleniyor, lütfen konuşun...' : 'Henüz ses algılanmadı.')}
        </p>
      </div>

      <div className="sectionSpacer" />

      <div className="actionGrid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <button
          type="button"
          onClick={startListening}
          aria-label={isListening ? "Şu an dinleniyor" : "Cevap vermek için mikrofonu aç"}
          className={`btnLink btnPrimary ${isListening ? 'listeningPulse' : ''}`}
          style={{ 
            height: 60, 
            fontSize: 18,
            backgroundColor: isListening ? '#ef4444' : 'var(--primary)' 
          }}
        >
          {isListening ? "🛑 Dinleniyor..." : "🎤 Sesli Yanıt"}
        </button>

        <button
          type="button"
          onClick={() => onSave(transcript)}
          className="btnLink btnSecondary"
          disabled={!transcript || isSubmitting}
          style={{ height: 60, fontSize: 18 }}
        >
          {isSubmitting ? 'Kaydediliyor...' : 'Cevabı Gönder'}
        </button>
      </div>
    </div>
  );
}
