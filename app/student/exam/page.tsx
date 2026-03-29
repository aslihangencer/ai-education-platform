'use client';

import React, { useState, useRef, useEffect } from 'react';
import { StudentNav } from '../../../components/Student/StudentNav';

const AccessibleInput = ({ label, id, error, hint, ...props }: any) => {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {hint && (
        <span id={hintId} className="helpText" style={{ display: 'block', marginBottom: 8 }}>
          {hint}
        </span>
      )}
      <input
        id={id}
        className="premiumInput"
        aria-describedby={`${hint ? hintId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={!!error}
        style={{ width: '100%', borderColor: error ? 'var(--error)' : 'var(--border)' }}
        {...props}
      />
      {error && (
        <span id={errorId} className="saveSuccessText" style={{ color: 'var(--error, #ef4444)', marginTop: 8, display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
};

import { VoiceAccessibleForm } from '../../../components/Student/VoiceAccessibleForm';

export default function StudentExamPage() {
  const [formData, setFormData] = useState({ studentName: '', answerText: '' });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const handleVoiceSave = (transcript: string) => {
    setFormData({ ...formData, answerText: transcript });
    setErrors({ ...errors, answerText: null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!formData.studentName) newErrors.studentName = 'Öğrenci ismi gereklidir.';
    if (!formData.answerText) newErrors.answerText = 'Lütfen soruyu cevaplayın.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      errorSummaryRef.current?.focus();
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Sınav başarıyla gönderildi!');
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <section aria-labelledby="exam-page-title">
      <h1 id="exam-page-title" className="title">Erişilebilir Sınav Portalı</h1>
      <p className="subtitle">
        Lütfen aşağıdaki soruları sesli veya yazılı olarak cevaplayın. Sesli yardım için Alt+V kısayolunu kullanabilirsiniz.
      </p>

      <div className="sectionSpacer" />
      <StudentNav active="lesson" />
      <div className="sectionSpacer" />

      {/* Live Region for Screen Readers */}
      <div aria-live="assertive" className="sr-only">
        {Object.keys(errors).length > 0 && `Formda ${Object.keys(errors).length} hata bulundu.`}
      </div>

      {Object.keys(errors).length > 0 && (
        <div 
          ref={errorSummaryRef} 
          tabIndex={-1} 
          className="card" 
          role="alert" 
          style={{ borderColor: 'var(--error, #ef4444)', background: 'rgba(239, 68, 68, 0.05)' }}
        >
          <h2 className="placeholderHeading" style={{ color: 'var(--error, #ef4444)' }}>Gönderim Başarısız</h2>
          <ul style={{ marginTop: 10, paddingLeft: 20 }}>
            {Object.entries(errors).map(([field, msg]: any) => (
              <li key={field}>
                <a href={`#${field}`} style={{ color: 'inherit' }}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="sectionSpacer" />

      <form onSubmit={handleSubmit} noValidate>
        <AccessibleInput
          label="Ad Soyad"
          id="studentName"
          value={formData.studentName}
          onChange={(e: any) => setFormData({ ...formData, studentName: e.target.value })}
          hint="Öğrenci kimliğinizdeki gibi yazınız."
          error={errors.studentName}
          required
        />

        <div className="sectionSpacer" />

        <VoiceAccessibleForm 
          question="Mitokondrinin hücredeki görevi nedir?"
          onSave={handleVoiceSave}
          isSubmitting={isSubmitting}
        />

        {errors.answerText && (
          <div className="errorAlert" role="alert" style={{ marginTop: 10 }}>
             <svg className="errorIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
             {errors.answerText}
          </div>
        )}

        <div className="sectionSpacer" />

        <button 
          type="submit" 
          className="btnLink btnPrimary fullWidth"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'AI Değerlendirmesi Yapılıyor...' : 'Sınavı Bitir ve Gönder'}
        </button>
      </form>
    </section>
  );
}
