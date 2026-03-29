'use client';

import React, { useState } from 'react';
import { useA11y } from '../../context/AccessibilityContext';
import { useHaptics } from '../../hooks/useHaptics';

export function EmergencyCallButton() {
  const [isCalling, setIsCalling] = useState(false);
  const { announce } = useA11y();
  const { errorHaptic, successHaptic } = useHaptics();

  const handleCall = () => {
    setIsCalling(true);
    errorHaptic(); // Urgent vibration
    announce('Acil Erişilebilirlik Çağrısı başlatılıyor. Bir öğretmene veya gönüllüye bağlanıyorsunuz...', 'assertive');

    // Simulate connection delay
    setTimeout(() => {
      announce('Yardım yolda. Öğretmen Ayşe Hanım bağlandı. Görüntülü ve sesli görüşme başlıyor.', 'polite');
      successHaptic();
      // In a real app, this would trigger a WebRTC call
    }, 4000);
  };

  return (
    <div className="emergencyCallContainer" style={{ marginBottom: 16 }}>
      <button 
        onClick={handleCall}
        disabled={isCalling}
        style={{ 
          width: '100%', 
          padding: '16px', 
          borderRadius: 12, 
          background: 'var(--error)', 
          color: 'white', 
          border: 'none', 
          fontWeight: 800, 
          fontSize: 16,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
        }}
        aria-label="Acil Erişilebilirlik Çağrısı Yap: Gönüllüye bağlan"
      >
        <span style={{ fontSize: 24 }}>🆘</span>
        {isCalling ? 'BAĞLANILIYOR...' : 'ACİL YARDIM ÇAĞRISI'}
      </button>
    </div>
  );
}
