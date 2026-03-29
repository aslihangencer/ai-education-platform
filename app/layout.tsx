'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import SkipToContent from '../components/Accessibility/SkipToContent';
import { HighContrastProvider } from '../components/Theme/HighContrastProvider';
import { VoiceAssistant } from '../components/Accessibility/VoiceAssistant';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { A11yReportButton } from '../components/Accessibility/A11yReportButton';

function AuthenticatedApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  const navItems = [
    { label: 'Eğitim Paneli', href: '/student', icon: '📊', voiceLabel: '1: Eğitim Paneli', roles: ['STUDENT'] },
    { label: 'Sınavlar', href: '/student/exam', icon: '📝', voiceLabel: '2: Sınavlar', roles: ['STUDENT'] },
    { label: 'Eğitmen Paneli', href: '/teacher', icon: '👩‍🏫', voiceLabel: '3: Eğitmen Paneli', roles: ['TEACHER'] },
  ];

  // Filter items based on user role
  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role as string)
  );

  if (isLoading) {
    return <div className="loadingScreen" aria-busy="true" aria-label="Yükleniyor...">Yükleniyor...</div>;
  }

  return (
    <div className="appShell">
      {user && (
        <aside className="sidebar" role="navigation" aria-label="Ana Gezinti Menüsü">
          <div className="sidebarHeader">
            <div className="brand">
              <span className="brandTitle">SMART ED</span>
              <span className="brandSub">Erişilebilir Eğitim</span>
            </div>
          </div>
          <nav className="sidebarNav">
            <ul>
              {filteredNavItems.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className={`sidebarItem ${pathname === item.href ? 'active' : ''}`}
                    aria-label={item.voiceLabel}
                  >
                    <span className="navIcon" aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sidebarFooter">
            <div className="miniProfile" aria-label={`Kullanıcı profili: ${user.name}, ${user.role === 'STUDENT' ? 'Öğrenci' : 'Eğitmen'}`}>
              <div className="avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</div>
              <div className="profileInfo">
                <span className="profileName">{user.name}</span>
                <span className="profileRole">{user.role === 'STUDENT' ? 'Öğrenci' : 'Eğitmen'}</span>
              </div>
              <button 
                onClick={logout} 
                className="logoutBtn" 
                aria-label="Çıkış Yap"
                style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px' }}
              >
                🚪
              </button>
            </div>
          </div>
        </aside>
      )}

      <div className="mainWrapper">
        <header className="topNav">
          <div className="breadcrumb">
            <span className="text-muted">Sayfalar</span> / 
            <span className="activeStep">{pathname.split('/').pop() || 'Ana Sayfa'}</span>
          </div>
          <div className="topActions">
             <button className="iconBtn" aria-label="Bildirimler">🔔</button>
             <button className="iconBtn" aria-label="Ayarlar">⚙️</button>
          </div>
        </header>

        <main id="main-content" className="contentArea">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <SkipToContent />
        <HighContrastProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <AuthenticatedApp>
                {children}
              </AuthenticatedApp>
              <VoiceAssistant />
              <A11yReportButton />
            </AuthProvider>
          </AccessibilityProvider>
        </HighContrastProvider>
      </body>
    </html>
  );
}
