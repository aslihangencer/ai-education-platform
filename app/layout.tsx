'use client';

import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import SkipToContent from '../components/Accessibility/SkipToContent';
import { HighContrastProvider } from '../components/Theme/HighContrastProvider';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import { AuthProvider } from '../context/AuthContext';
import { NextAuthProvider } from '../components/NextAuthProvider';
import Navbar from '../components/Navbar';
import { AudioGuideProvider } from '../context/AudioGuideContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [clientLoaded, setClientLoaded] = useState(false);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  return (
    <html lang="tr" className={clientLoaded ? "scroll-smooth mdl-js" : "scroll-smooth"} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-white text-slate-900 min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
        <SkipToContent />
        <HighContrastProvider>
          <AccessibilityProvider>
            <NextAuthProvider>
              <AuthProvider>
                <AudioGuideProvider>
                  {/* Full-width container for immersive designs */}
                  <div className="flex-1 flex flex-col w-full min-h-screen">
                    {/* Global Navbar */}
                    <Navbar />
                    
                    <main id="main-content" className="flex-1">
                      <Toaster 
                        position="top-center" 
                        toastOptions={{ 
                          style: { fontSize: '1.25rem', padding: '16px', fontWeight: '800', background: '#1e293b', color: '#fff' }
                        }} 
                      />
                      {children}
                    </main>
                  </div>
                </AudioGuideProvider>
              </AuthProvider>
            </NextAuthProvider>
          </AccessibilityProvider>
        </HighContrastProvider>
      </body>
    </html>
  );
}
