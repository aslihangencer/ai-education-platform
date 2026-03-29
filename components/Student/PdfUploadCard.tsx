'use client';

import React, { useId, useState, type ChangeEvent } from 'react';
import type { Lesson } from '../../lib/lessonTypes';

export function PdfUploadCard({
  onLessonGenerated,
}: {
  onLessonGenerated: (lessonId: string, lesson: Lesson) => void;
}) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [referenceTranscript, setReferenceTranscript] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setFileName(null);
      setSelectedFile(null);
      return;
    }

    // UI-only validation: ensure it's a PDF by MIME or extension.
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setFileName(null);
      setSelectedFile(null);
      // We keep the UI minimal for now; future versions can show errors here.
      return;
    }

    setFileName(file.name);
    setSelectedFile(file);
    setErrorMessage(null);
  }

  function clearFile() {
    setFileName(null);
    setSelectedFile(null);
    setErrorMessage(null);
  }

  async function generateLesson() {
    if (!selectedFile) return;

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('pdf', selectedFile);
      formData.append('referenceTranscript', ''); // Optional; can be added to UI later.

      // Include teacher-defined guidelines from localStorage
      const teachingPersona = localStorage.getItem('teaching_persona') || 'encouraging';
      const customGuidelines = localStorage.getItem('teaching_guidelines') || '';
      formData.append('teachingPersona', teachingPersona);
      formData.append('customGuidelines', customGuidelines);

      const res = await fetch('/api/student/generate-lesson', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        throw new Error(msg || `Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as { lessonId: string; lesson: Lesson };
      onLessonGenerated(data.lessonId, data.lesson);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate lesson.';
      setErrorMessage(message);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <section className="card" aria-labelledby="upload-title">
      <div className="cardHeader">
        <h2 id="upload-title" className="title">
          Create New Lesson
        </h2>
        <p className="subtitle">
          Upload any PDF study material to generate a custom AI-powered lesson.
        </p>
      </div>

      <div className="sectionSpacer" />

      <div className="uploadArea">
        <label className="fieldLabel" htmlFor={inputId}>
          Study Material (PDF)
        </label>
        <div className={`fileDropZone ${fileName ? 'hasFile' : ''}`}>
          <input
            id={inputId}
            className="fileInputHidden"
            type="file"
            accept="application/pdf"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] ?? null;
              if (!file) {
                setFileName(null);
                setSelectedFile(null);
                return;
              }

              // UI-only validation: ensure it's a PDF by MIME or extension.
              const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
              if (!isPdf) {
                setFileName(null);
                setSelectedFile(null);
                // We keep the UI minimal for now; future versions can show errors here.
                return;
              }

              setFileName(file.name);
              setSelectedFile(file);
              setErrorMessage(null);
            }}
          />
          <div className="dropZoneContent">
            <svg className="uploadIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <p className="dropZoneText">
              {fileName ? (
                <>Selected: <strong>{fileName}</strong></>
              ) : (
                'Click or drag PDF here to upload'
              )}
            </p>
          </div>
        </div>
        
        {fileName && (
          <div className="fileActionRow">
            <button type="button" className="btnText" onClick={clearFile}>Remove File</button>
          </div>
        )}
      </div>

      <div className="sectionSpacer" />

      <div className="optionArea">
        <label className="fieldLabel" htmlFor={`${inputId}-reference`}>
          Teaching Style Reference (Optional)
        </label>
        <textarea
          id={`${inputId}-reference`}
          className="textArea"
          value={referenceTranscript}
          onChange={(e) => setReferenceTranscript(e.target.value)}
          rows={3}
          placeholder="Paste a transcript here to mimic a specific teacher's style..."
          aria-describedby={`${inputId}-reference-help`}
        />
        <p id={`${inputId}-reference-help`} className="helpText">
          The AI will match the tone and structure of this reference if provided.
        </p>
      </div>

      <div className="sectionSpacer" />

      <div className="cardActions">
        <button
          type="button"
          className={`btnLink btnPrimary fullWidth ${!fileName || isGenerating ? 'disabledBtn' : ''}`.trim()}
          aria-busy={isGenerating}
          disabled={!fileName || isGenerating}
          onClick={generateLesson}
        >
          {isGenerating ? (
            <>
              <span className="spinner"></span>
              Analyzing Library...
            </>
          ) : (
            'Generate Lesson'
          )}
        </button>
      </div>

      {errorMessage ? (
        <div className="errorAlert" role="alert">
          <svg className="errorIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          {errorMessage}
        </div>
      ) : null}
    </section>
  );
}

