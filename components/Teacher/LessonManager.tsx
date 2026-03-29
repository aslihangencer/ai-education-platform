'use client';

import React from 'react';

/**
 * LessonManager:
 * Shows existing lessons and completion stats.
 */
export function LessonManager({ lessonStats }: { lessonStats: { total: number; completed: number } }) {
  const completionRate = Math.round((lessonStats.completed / lessonStats.total) * 100);

  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: '6px solid var(--primary-soft)', borderTopColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>
          %{completionRate}
        </div>
        <div>
          <h3 className="placeholderHeading" style={{ fontSize: 18 }}>Tamamlama Oranı</h3>
          <p className="subtitle" style={{ fontSize: 13 }}>Öğrencileriniz {lessonStats.total} dersin {lessonStats.completed}'ini tamamladı.</p>
        </div>
      </div>

      <div className="lessonList" style={{ display: 'grid', gap: 12 }}>
        {[
          { title: 'Modern Tarih 101', date: '2 saat önce', status: 'Aktif' },
          { title: 'Erişilebilirlik Temelleri', date: 'Dün', status: 'Tamamlandı' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</p>
              <p className="timeText" style={{ fontSize: 12 }}>{item.date}</p>
            </div>
            <span className="pill" style={{ background: item.status === 'Aktif' ? 'var(--primary-soft)' : 'var(--bg)', color: item.status === 'Aktif' ? 'var(--primary)' : 'var(--text-muted)' }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
