'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useA11y } from '../../context/AccessibilityContext';

/**
 * PdfAnalysisPanel: 
 * - Specialized for "Textbook Mode"
 * - Supports page range selection (e.g. 30-55)
 * - Highly accessible form controls
 */
export function PdfAnalysisPanel() {
  const [range, setRange] = useState({ start: 1, end: 5 });
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { announce, updateLocation } = useA11y();

  useEffect(() => {
    if (result) {
      resultRef.current?.focus();
      updateLocation('Kitap Analiz Sonucu', 2);
    }
  }, [result, updateLocation]);

  const handleAnalyze = async () => {
    if (!file) {
      alert('Lütfen bir PDF dosyası seçin.');
      return;
    }
    
    setIsAnalyzing(true);
    setResult(null);
    announce('Seçili sayfalar analiz ediliyor, lütfen bekleyin.', 'polite');

    // Simulated API call to the Python/FastAPI backend or Next.js bridge
    try {
      // Simulate/Trigger specialized VLM prompt
      const spatialPrompt = `
        Sen bir 'Dijital Göz' asistanısın. Görme engelli bir öğrenciye bu PDF sayfalarını anlatıyorsun.
        GÖREVLERİN:
        1. Sayfa yerleşimini anlat (Örn: "Sayfanın ortasında büyük bir grafik var").
        2. Matematiksel ifadeleri sesli okunacak şekilde (LaTeX/MathML) açıkla.
        3. Görsellerin/diyagramların içindeki öğelerin birbirine göre konumunu belirt.
      `;
      
      const res = await fetch('/api/student/analyze-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fileId: 'mock-id', // Assuming a fileId would be generated or passed for the backend to retrieve the file
          startPage: range.start,
          endPage: range.end,
          systemPrompt: spatialPrompt
        })
      });

      const data = await res.json();
      setResult(data.analysis); // Changed from data.summary to data.analysis
      announce('Analiz tamamlandı. Akıllı anlatım hazır.', 'assertive');

    } catch (err) {
      announce('Analiz sırasında bir hata oluştu.', 'assertive');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="card recognitionCard" role="region" aria-labelledby="pdf-analiz-title">
      <h2 id="pdf-analiz-title" className="title">Ders Kitabı Analiz Asistanı</h2>
      <p className="subtitle">Belirli sayfa aralıklarını seçin ve AI'nın size bir öğretmen gibi anlatmasını isteyin.</p>
      
      <div className="sectionSpacer" />

      <div className="actionGrid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="inputGroup">
          <label htmlFor="start-page" className="label">Başlangıç Sayfası</label>
          <input 
            id="start-page"
            type="number" 
            min={1}
            value={range.start}
            onChange={(e) => setRange({...range, start: parseInt(e.target.value) || 1})}
            className="premiumInput"
            aria-label="Analiz için başlangıç sayfasını girin"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="end-page" className="label">Bitiş Sayfası</label>
          <input 
            id="end-page"
            type="number" 
            min={range.start}
            value={range.end}
            onChange={(e) => setRange({...range, end: parseInt(e.target.value) || 1})}
            aria-label="Analiz için bitiş sayfasını girin"
          />
        </div>
        <button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !file}
          className="btn btnPrimary"
          style={{ height: 48 }}
          aria-busy={isAnalyzing}
        >
          {isAnalyzing ? '...' : 'Anlat'}
        </button>
      </div>

      <div className="sectionSpacer" />

      <div className="uploadZone">
        <label htmlFor="pdf-file-upload" className="label">Ders Kitabı (PDF)</label>
        <input 
          id="pdf-file-upload"
          type="file" 
          accept=".pdf" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="premiumInput"
          style={{ padding: '12px 16px' }}
          aria-label="Ders kitabınızı PDF olarak yükleyin"
        />
        {file && <p className="helpText" style={{ marginTop: 8 }}>Seçili dosya: {file.name}</p>}
      </div>

      <div className="sectionSpacer" />

      <button 
        onClick={handleAnalyze} 
        disabled={isAnalyzing || !file}
        className="btn btnPrimary"
        style={{ width: '100%', height: 48 }}
        aria-busy={isAnalyzing}
      >
        {isAnalyzing ? 'Analiz Ediliyor...' : 'Sayfaları Analiz Et'}
      </button>

      {result && (
        <div 
          ref={resultRef}
          tabIndex={-1}
          className="analysisResult"
          style={{ marginTop: 24, padding: 20, background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--primary-soft)', outline: 'none' }}
          role="region"
          aria-label="Analiz Sonucu"
        >
          <h3 style={{ fontSize: 16, marginBottom: 12, color: 'var(--primary)' }}>AKILLI ANLATIM</h3>
          <div className="prose" style={{ fontSize: 15, lineHeight: 1.7 }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
