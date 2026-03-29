'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const SAMPLE_MP3_DATA_URI =
  'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV';

/**
 * AudioLessonCard:
 * A professional, SaaS-styled audio player for educational lessons.
 * Includes speed control, progress tracking, and accessible navigation.
 */
export function AudioLessonCard({
  lessonId,
  autoGenerateAudio,
}: {
  lessonId: string | null;
  autoGenerateAudio?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sourceLabel, setSourceLabel] = useState<'Sample' | 'Lesson'>('Sample');
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [lessonAudioUrl, setLessonAudioUrl] = useState<string | null>(null);
  const [activeSrc, setActiveSrc] = useState<string>(SAMPLE_MP3_DATA_URI);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync state with audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setError('Ses dosyası yüklenemedi.');

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => setError('Oynatma başlatılamadı.'));
  };

  const onSeek = (val: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const onRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  const generateAudio = async () => {
    if (!lessonId) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/student/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      });
      if (!res.ok) throw new Error('Ses oluşturma başarısız.');
      const data = await res.json();
      setLessonAudioUrl(data.audioUrl);
      setActiveSrc(data.audioUrl);
      setSourceLabel('Lesson');
    } catch (err) {
      setError('Seslendirici şu an meşgul, lütfen tekrar deneyin.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="card" aria-labelledby="audio-title" style={{ marginBottom: 24 }}>
      <header className="cardHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 id="audio-title" className="placeholderHeading" style={{ fontSize: 18 }}>Sesli Ders Navigasyonu</h2>
          <p className="subtitle" style={{ fontSize: 13 }}>Yapay zeka sesiyle dersinizi dinleyin.</p>
        </div>
        <div className="statusBadge">
          <span className="pill" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>{sourceLabel}</span>
        </div>
      </header>

      <audio ref={audioRef} src={activeSrc} preload="metadata" />

      <div className="playerLayout" style={{ display: 'flex', gap: 20, alignItems: 'center', background: 'var(--bg)', padding: '16px', borderRadius: '12px' }}>
        <button 
          onClick={togglePlayPause}
          className="playerBtn mainPlay"
          aria-label={isPlaying ? 'Durdur' : 'Oynat'}
          style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div style={{ flex: 1 }}>
          <div className="progressMeta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, fontWeight: 600 }}>
            <span>{formatTime(currentTime)}</span>
            <span style={{ color: 'var(--text-muted)' }}>{formatTime(duration)}</span>
          </div>
          <input 
            type="range"
            className="premiumRange"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>
      </div>

      <div className="sectionSpacer" />

      <div className="speedControl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="sourceLabel" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>OKUMA HIZI</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0.5, 1.0, 1.5, 2.0].map(rate => (
            <button 
              key={rate}
              onClick={() => onRateChange(rate)}
              className={`iconBtn ${playbackRate === rate ? 'active' : ''}`}
              style={{ padding: '4px 12px', fontSize: 12, background: playbackRate === rate ? 'var(--primary-soft)' : 'transparent', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      <div className="sectionSpacer" />

      <div className="actionGrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <button 
          onClick={() => { setActiveSrc(SAMPLE_MP3_DATA_URI); setSourceLabel('Sample'); }}
          className="btn btnSecondary"
          style={{ width: '100%', fontSize: 13 }}
        >
          Örnek Sesi Yükle
        </button>
        <button 
          onClick={generateAudio}
          disabled={!lessonId || isGenerating}
          className="btn btnPrimary"
          style={{ width: '100%', fontSize: 13 }}
        >
          {isGenerating ? 'Oluşturuluyor...' : 'Dersi Seslendir'}
        </button>
      </div>

      {error && <p style={{ color: 'var(--error)', fontSize: 12, marginTop: 12, fontWeight: 600 }}>{error}</p>}
    </section>
  );
}
