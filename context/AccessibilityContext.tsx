'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface AccessibilityState {
  lastAnnouncement: string;
  currentHierarchy: string[];
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  updateLocation: (name: string, level: number) => void;
  whereAmI: () => string;
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [lastAnnouncement, setLastAnnouncement] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState<'polite' | 'assertive'>('polite');
  const [currentHierarchy, setCurrentHierarchy] = useState<string[]>([]);
  const pathname = usePathname();

  // 1. Proactive Announcement System
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setLastAnnouncement(''); // Clear to trigger re-render for same message
    setTimeout(() => {
      setLastAnnouncement(message);
      setAnnouncementPriority(priority);
    }, 50);
  }, []);

  // 2. Hierarchical Location Tracking
  const updateLocation = useCallback((name: string, level: number) => {
    setCurrentHierarchy(prev => {
      const next = [...prev];
      next[level] = name;
      return next.slice(0, level + 1);
    });
  }, []);

  // 3. 'Neredeyim?' (Where am I?) Command
  const whereAmI = useCallback(() => {
    const location = currentHierarchy.join(' içindeki ');
    const pageName = pathname.split('/').pop() || 'Ana Sayfa';
    const status = `Şu an ${pageName} sayfasında, ${location || 'genel alan'} üzerindesiniz.`;
    announce(status, 'assertive');
    return status;
  }, [currentHierarchy, pathname, announce]);

  // 4. Session Recovery (Local Storage)
  useEffect(() => {
    const saved = localStorage.getItem('a11y_last_path');
    if (saved && saved !== pathname) {
      announce(`Oturumunuz geri yüklendi. ${saved} sayfasından devam ediyorsunuz.`, 'polite');
    }
    localStorage.setItem('a11y_last_path', pathname);
  }, [pathname, announce]);

  // 5. Global Command Listener (Alt + Shift + Q for 'Neredeyim?')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'Q') {
        whereAmI();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [whereAmI]);

  return (
    <AccessibilityContext.Provider value={{ lastAnnouncement, currentHierarchy, announce, updateLocation, whereAmI }}>
      {children}
      {/* Global ARIA-Live Region */}
      <div 
        aria-live={announcementPriority} 
        aria-atomic="true" 
        className="sr-only" 
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
      >
        {lastAnnouncement}
      </div>
    </AccessibilityContext.Provider>
  );
}

export const useA11y = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useA11y must be used within AccessibilityProvider');
  return context;
};
