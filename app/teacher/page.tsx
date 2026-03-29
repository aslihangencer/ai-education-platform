'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PersonaConfiguration } from '../../components/Teacher/PersonaConfiguration';
import { LessonManager } from '../../components/Teacher/LessonManager';
import { ScheduleLessonForm } from '../../components/Teacher/ScheduleLessonForm';

/**
 * TeacherWorkspace:
 * Professional teacher's dashboard with polished SaaS styling.
 */
export default function TeacherWorkspace() {
  const { user } = useAuth();

  return (
    <div className="teacherDashboard">
      <header className="pageHeader">
        <h1 id="teacher-dashboard-title" className="title">
          Eğitmen Portalı
        </h1>
        <p className="subtitle">Hoş Geldiniz, {user?.name || 'Eğitmen'}! Öğrencileriniz için yeni dersler oluşturun, AI rehberlerini yapılandırın ve takviminizi yönetin.</p>
      </header>

      <div className="sectionSpacer" />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 32, alignItems: 'start' }}>
        <div className="mainCol" style={{ display: 'grid', gap: 32 }}>
          <section>
            <h2 className="placeholderHeading" style={{ marginBottom: 16, fontSize: 20 }}>Yapay Zeka Yapılandırması</h2>
            <PersonaConfiguration />
          </section>
          
          <section>
            <h2 className="placeholderHeading" style={{ marginBottom: 16, fontSize: 20 }}>Ders İçerikleri</h2>
            <LessonManager lessonStats={{ total: 12, completed: 8 }} />
          </section>
        </div>

        <aside className="sideCol" style={{ display: 'grid', gap: 32 }}>
          <section>
             <h2 className="placeholderHeading" style={{ marginBottom: 16, fontSize: 20 }}>Ders Planlama</h2>
             <ScheduleLessonForm />
          </section>
          
          <div className="card" style={{ background: 'var(--primary-soft)', border: '1px dashed var(--primary)' }}>
            <h3 className="placeholderHeading" style={{ fontSize: 16 }}>Erişilebilirlik İpucu</h3>
            <p className="helpText" style={{ fontSize: 13, marginTop: 8 }}>
              Ders oluştururken PDF'lerinizin metin katmanlı olduğundan emin olun. Bu, AI'nın daha kaliteli seslendirme yapmasını sağlar.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
