'use client';

import React, { useState } from 'react';

interface LessonRequest {
  id: string;
  title: string;
  teacher: string;
  time: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED';
}

/**
 * LessonRequestList:
 * - Shows pending lesson requests to students.
 * - Supports haptic and voice-enabled responses.
 */
export function LessonRequestList() {
  const [requests, setRequests] = useState<LessonRequest[]>([
    { id: '1', title: 'Biyoloji: Hücre Teorisi', teacher: 'Ahmet Y.', time: 'Yarın 14:00', status: 'PENDING' }
  ]);

  const handleResponse = async (id: string, response: 'ACCEPTED' | 'DECLINED') => {
    // Simulated sound/haptic
    if (navigator.vibrate) navigator.vibrate(response === 'ACCEPTED' ? 100 : [100, 50, 100]);

    setRequests(requests.map(r => r.id === id ? { ...r, status: response } : r));

    // Call API to sync with Google Calendar
    try {
      await fetch('/api/student/respond-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, response })
      });
    } catch (err) {
      console.error('Response sync error');
    }
  };

  return (
    <div className="card recognitionCard">
      <h2 className="title">Ders Talepleri</h2>
      <p className="subtitle">Öğretmenlerinizden gelen canlı ders tekliflerini yönetin.</p>

      <div className="sectionSpacer" />

      {requests.length === 0 && <p className="helpText">Bekleyen ders talebi yok.</p>}

      {requests.map(req => (
        <div key={req.id} className="lessonItem" style={{ 
          padding: 16, 
          background: 'rgba(0,0,0,0.02)', 
          borderRadius: 12, 
          marginBottom: 12,
          borderLeft: `5px solid ${req.status === 'PENDING' ? 'var(--primary)' : req.status === 'ACCEPTED' ? 'var(--success, #10b981)' : 'var(--error, #ef4444)'}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>{req.title}</h3>
              <p className="helpText">{req.teacher} • {req.time}</p>
            </div>
            <span style={{ 
                fontSize: 12, 
                fontWeight: 600, 
                padding: '4px 8px', 
                borderRadius: 4,
                backgroundColor: req.status === 'PENDING' ? 'rgba(99,102,241,0.1)' : 'rgba(0,0,0,0.05)'
            }}>
                {req.status}
            </span>
          </div>

          {req.status === 'PENDING' && (
            <div className="actionGrid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
              <button 
                onClick={() => handleResponse(req.id, 'ACCEPTED')}
                className="btn btnPrimary"
                style={{ height: 40, fontSize: 13 }}
                aria-label={`${req.title} dersini kabul et`}
              >
                Onayla
              </button>
              <button 
                onClick={() => handleResponse(req.id, 'DECLINED')}
                className="btn btnSecondary"
                style={{ height: 40, fontSize: 13 }}
                aria-label={`${req.title} dersini reddet`}
              >
                Reddet
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
