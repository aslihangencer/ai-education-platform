'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'TEACHER'>('STUDENT');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Lütfen bir e-posta adresi giriniz.');
      return;
    }
    try {
      await login(email, role);
    } catch (err) {
      setError('Giriş başarısız. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="authContainer" style={{ maxWidth: 500, margin: '80px auto', padding: '40px 24px' }}>
      <header className="authHeader" style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 12 }}>Smart Ed Giriş</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 18 }}>Devam etmek için hesabınıza giriş yapın.</p>
      </header>

      <form onSubmit={handleSubmit} className="authForm" aria-label="Giriş Formu">
        {error && (
          <div 
            role="alert" 
            style={{ 
              background: '#fee2e2', 
              color: '#b91c1c', 
              padding: 16, 
              borderRadius: 8, 
              marginBottom: 24,
              border: '1px solid #f87171',
              fontWeight: 600
            }}
          >
            {error}
          </div>
        )}

        <div className="formGroup" style={{ marginBottom: 24 }}>
          <label 
            htmlFor="email" 
            style={{ display: 'block', fontSize: 18, fontWeight: 600, marginBottom: 8 }}
          >
            E-posta Adresi
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            aria-required="true"
            style={{ 
              width: '100%', 
              padding: '16px', 
              fontSize: 18, 
              borderRadius: 8, 
              border: '2px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        <div className="formGroup" style={{ marginBottom: 32 }}>
          <label 
            htmlFor="role-select" 
            style={{ display: 'block', fontSize: 18, fontWeight: 600, marginBottom: 12 }}
          >
            Sisteme giriş rolünüzü seçin:
          </label>
          <div 
            id="role-select" 
            role="radiogroup" 
            aria-labelledby="role-select"
            style={{ display: 'flex', gap: 16 }}
          >
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              aria-checked={role === 'STUDENT'}
              role="radio"
              style={{
                flex: 1,
                padding: '16px',
                fontSize: 18,
                fontWeight: 700,
                borderRadius: 8,
                border: role === 'STUDENT' ? '3px solid var(--primary)' : '2px solid var(--border)',
                background: role === 'STUDENT' ? 'var(--primary-soft)' : 'transparent',
                color: role === 'STUDENT' ? 'var(--primary)' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              Öğrenci
            </button>
            <button
              type="button"
              onClick={() => setRole('TEACHER')}
              aria-checked={role === 'TEACHER'}
              role="radio"
              style={{
                flex: 1,
                padding: '16px',
                fontSize: 18,
                fontWeight: 700,
                borderRadius: 8,
                border: role === 'TEACHER' ? '3px solid var(--primary)' : '2px solid var(--border)',
                background: role === 'TEACHER' ? 'var(--primary-soft)' : 'transparent',
                color: role === 'TEACHER' ? 'var(--primary)' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              Eğitmen
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btnPrimary"
          style={{ width: '100%', padding: '20px', fontSize: 20, fontWeight: 800 }}
        >
          Giriş Yap
        </button>
      </form>

      <footer style={{ marginTop: 40, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          Hesabınız yok mu? <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Kayıt Olun</a>
        </p>
      </footer>
    </div>
  );
}
