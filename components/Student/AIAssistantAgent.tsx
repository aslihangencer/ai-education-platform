'use client';

import React, { useState } from 'react';

/**
 * AIAssistantAgent:
 * A professional coaching assistant providing proactively summaries and voice Q&A.
 */
export function AIAssistantAgent({ lessonContent }: { lessonContent?: string }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!lessonContent) return;
    setIsProcessing(true);
    setResponse(null);
    try {
      const res = await fetch('/api/student/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: lessonContent })
      });
      const data = await res.json();
      setResponse(data.summary);
    } catch (err) {
      setResponse('Özet çıkarılırken bir hata oluştu.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAskVoice = () => {
    setIsListening(true);
    setTranscript(null);
    // Simple Web Speech API mock/trigger
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setResponse(`${text} sorunuz için analiz yapılıyor...`);
        setIsListening(false);
      };
      recognition.start();
    } else {
      setResponse('Tarayıcınız ses tanımayı desteklemiyor.');
      setIsListening(false);
    }
  };

  return (
    <div className="card" style={{ border: '2px solid var(--primary)', background: 'var(--primary-soft)' }}>
      <header className="cardHeader" style={{ marginBottom: 16 }}>
        <h2 className="placeholderHeading" style={{ fontSize: 18 }}>🤖 Akıllı Koçluk Asistanı</h2>
        <p className="subtitle" style={{ fontSize: 13 }}>Dersinize dair sorular sorun veya özet isteyin.</p>
      </header>

      <div className="actionGrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <button 
          onClick={handleSummarize}
          disabled={isProcessing || !lessonContent}
          className="btn btnSecondary"
          style={{ width: '100%', fontSize: 13 }}
        >
          {isProcessing ? '...' : '📝 Özetle'}
        </button>
        <button 
          onClick={handleAskVoice}
          disabled={isProcessing || isListening}
          className={`btn btnPrimary ${isListening ? 'listeningPulse' : ''}`}
          style={{ width: '100%', fontSize: 13 }}
        >
          {isListening ? '🎧 Dinliyor...' : '🎤 Soru Sor'}
        </button>
      </div>

      {transcript && (
        <div className="transcriptBox" style={{ marginTop: 16, padding: '8px 12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <span className="sourceLabel" style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>SORUNUZ</span>
          <p style={{ fontSize: 13, marginTop: 4 }}>{transcript}</p>
        </div>
      )}

      {response && (
        <div className="responseBox" style={{ marginTop: 16, padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <span className="sourceLabel" style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>YANIT</span>
          <div aria-live="polite" style={{ fontSize: 13, lineHeight: 1.5, marginTop: 4 }}>
            {response}
          </div>
        </div>
      )}
    </div>
  );
}
