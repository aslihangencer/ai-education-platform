'use client';

import React, { useState } from 'react';
import type { Lesson } from '../../lib/lessonTypes';
import { PdfUploadCard } from '../../components/Student/PdfUploadCard';
import { LessonPlaceholder } from '../../components/Student/LessonPlaceholder';
import { AudioLessonCard } from '../../components/Student/AudioLessonCard';
import { LessonContentCard } from '../../components/Student/LessonContentCard';
import { AIAssistantAgent } from '../../components/Student/AIAssistantAgent';
import { PdfAnalysisPanel } from '../../components/Student/PdfAnalysisPanel';
import { LessonRequestList } from '../../components/Student/LessonRequestList';
import { EmergencyCallButton } from '../../components/Accessibility/EmergencyCallButton';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  return (
    <div className="studentDashboard">
      <header className="pageHeader">
        <h1 id="student-dashboard-title" className="title">
          Eğitim Paneli
        </h1>
        <p className="subtitle">Hoş Geldiniz, {user?.name || 'Öğrenci'}! Akıllı materyallerinizle öğrenmeye hazırsınız.</p>
      </header>

      <div className="sectionSpacer" />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 24, alignItems: 'start' }}>
        <div className="mainCol">
          <PdfAnalysisPanel />
          <AudioLessonCard lessonId={lessonId} autoGenerateAudio />
          {lesson ? <LessonContentCard lesson={lesson} /> : <LessonPlaceholder />}
        </div>
        
        <aside className="sideCol" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <EmergencyCallButton />
          <div className="card" style={{ padding: '0px', border: 'none', background: 'transparent' }}>
             <PdfUploadCard 
               onLessonGenerated={(id, nextLesson) => {
                 setLessonId(id);
                 setLesson(nextLesson);
               }} 
             />
          </div>
          <LessonRequestList />
          <AIAssistantAgent lessonContent={lesson?.audioScript} />
        </aside>
      </div>
    </div>
  );
}
