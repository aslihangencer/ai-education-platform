'use client';

import React, { useState } from 'react';

/**
 * PersonaConfiguration:
 * Allows teachers to configure the AI's personality and teaching style.
 */
export function PersonaConfiguration() {
  const [tone, setTone] = useState('Dost Canlısı');
  const [speed, setSpeed] = useState(1.0);

  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="inputGroup" style={{ marginBottom: 20 }}>
        <label className="label" style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 13, color: 'var(--text-muted)' }}>AI ANLATIM TONU</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Dost Canlısı', 'Akademik', 'Basit', 'Hızlı'].map(t => (
            <button 
              key={t}
              onClick={() => setTone(t)}
              className={`pill ${tone === t ? 'active' : ''}`}
              style={{ padding: '8px 16px', background: tone === t ? 'var(--primary)' : 'var(--bg)', color: tone === t ? 'white' : 'var(--text)', border: '1px solid var(--border)', cursor: 'pointer', borderRadius: 20, fontSize: 13 }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="inputGroup">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label className="label" style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-muted)' }}>VARSAYILAN OKUMA HIZI</label>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{speed}x</span>
        </div>
        <input 
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="premiumRange"
          style={{ width: '100%', accentColor: 'var(--primary)' }}
        />
      </div>

      <div className="sectionSpacer" />
      
      <button className="btn btnPrimary" style={{ width: '100%' }}>Yapılandırmayı Kaydet</button>
    </div>
  );
}
