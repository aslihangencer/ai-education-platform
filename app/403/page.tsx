'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '100px auto', 
      padding: '40px 24px', 
      textAlign: 'center',
      border: '2px solid #ef4444',
      borderRadius: 16,
      background: '#fef2f2'
    }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🚫</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#b91c1c', marginBottom: 16 }}>
        Erişim Engellendi
      </h1>
      <p style={{ fontSize: 18, color: '#7f1d1d', marginBottom: 32, lineHeight: 1.6 }}>
        Bu sayfayı görüntülemek için yetkiniz bulunmamaktadır. 
        Lütfen doğru hesapla giriş yaptığınızdan emin olun.
      </p>
      
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '16px 32px',
            fontSize: 18,
            fontWeight: 700,
            borderRadius: 8,
            border: '2px solid #b91c1c',
            background: 'transparent',
            color: '#b91c1c',
            cursor: 'pointer'
          }}
        >
          Geri Dön
        </button>
        <button
          onClick={() => window.location.href = '/login'}
          style={{
            padding: '16px 32px',
            fontSize: 18,
            fontWeight: 700,
            borderRadius: 8,
            border: 'none',
            background: '#b91c1c',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Giriş Sayfasına Git
        </button>
      </div>
    </div>
  );
}
