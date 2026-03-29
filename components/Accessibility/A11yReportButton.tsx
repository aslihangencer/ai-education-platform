'use client';

import React, { useState } from 'react';
import { useA11y } from '../../context/AccessibilityContext';
import { useHaptics } from '../../hooks/useHaptics';

export function A11yReportButton() {
  const [isReporting, setIsReporting] = useState(false);
  const { announce } = useA11y();
  const { infoHaptic, successHaptic } = useHaptics();

  const startReport = () => {
    setIsReporting(true);
    infoHaptic();
    announce('Erişilebilirlik sorunu bildirimi başlatıldı. Lütfen sorunu sesli olarak anlatın.', 'assertive');
    
    // Simulate Voice Recording then Send
    setTimeout(() => {
      setIsReporting(false);
      successHaptic();
      announce('Geri bildiriminiz alındı, teşekkür ederiz. Sorun en kısa sürede incelenecektir.', 'polite');
    }, 5000);
  };

  return (
    <div className="a11yReportContainer" style={{ position: 'fixed', bottom: 32, left: 32, zIndex: 1000 }}>
      <button 
        onClick={startReport}
        disabled={isReporting}
        className={`iconBtn ${isReporting ? 'listeningPulse' : ''}`}
        style={{ 
          width: 56, 
          height: 56, 
          borderRadius: '50%', 
          background: 'var(--error)', 
          color: 'white', 
          border: 'none', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Erişilebilirlik Sorunu Bildir (Sesli)"
      >
        <span style={{ fontSize: 24 }}>🚩</span>
      </button>
      
      {isReporting && (
        <div 
          style={{ position: 'absolute', bottom: 70, left: 0, background: 'var(--surface)', padding: '12px 20px', borderRadius: 12, border: '1px solid var(--error)', whiteSpace: 'nowrap', fontWeight: 700, fontSize: 13 }}
          aria-hidden="true"
        >
          Sorun Kaydediliyor...
        </div>
      )}
    </div>
  );
}
