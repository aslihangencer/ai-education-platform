'use client';

import React, { useState } from 'react';

/**
 * ScheduleLessonForm:
 * A polished SaaS form for scheduling new lessons.
 */
export function ScheduleLessonForm() {
  const [formData, setFormData] = useState({
    title: '',
    studentEmail: '',
    startTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Ders planlandı! Öğrenciye bildirim gönderildi.');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="inputGroup" style={{ marginBottom: 20 }}>
        <label className="label">Ders Başlığı</label>
        <input 
          type="text" 
          className="premiumInput" 
          placeholder="Örn: 20. Yüzyıl Siyasi Tarihi"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div className="inputGroup" style={{ marginBottom: 20 }}>
        <label className="label">Öğrenci E-posta</label>
        <input 
          type="email" 
          className="premiumInput" 
          placeholder="ogrenci@okul.edu.tr"
          value={formData.studentEmail}
          onChange={(e) => setFormData({...formData, studentEmail: e.target.value})}
          required
        />
      </div>

      <div className="inputGroup" style={{ marginBottom: 24 }}>
        <label className="label">Başlangıç Zamanı</label>
        <input 
          type="datetime-local" 
          className="premiumInput"
          value={formData.startTime}
          onChange={(e) => setFormData({...formData, startTime: e.target.value})}
          required
        />
      </div>

      <button type="submit" className="btn btnPrimary" style={{ width: '100%', height: 48 }}>
        Ders Talebi Gönder
      </button>

      <div className="sectionSpacer" />
      <p className="helpText" style={{ fontSize: 11, textAlign: 'center' }}>
         Otomatik Google Meet linki oluşturulacaktır.
      </p>
    </form>
  );
}
