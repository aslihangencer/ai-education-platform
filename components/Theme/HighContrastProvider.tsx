'use client';

import { useEffect, useId, useState } from 'react';
import type { ReactNode } from 'react';

export function HighContrastProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const toggleId = useId();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('hc');
      setEnabled(stored === '1');
    } catch {
      // If storage is blocked, default stays off.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    try {
      if (enabled) {
        root.dataset.contrast = 'high';
        window.localStorage.setItem('hc', '1');
      } else {
        delete root.dataset.contrast;
        window.localStorage.setItem('hc', '0');
      }
    } catch {
      // Ignore storage failures.
    }
  }, [enabled]);

  return (
    <div className="appShell">
      <header className="topBar">
        <div className="topBarInner">
          <div className="brand" aria-label="Application brand">
            <div className="brandTitle">AI Education Platform</div>
            <div className="brandSub">Choose Student or Teacher panels</div>
          </div>

          <div className="toggleRow">
            <label className="toggleLabel" htmlFor={toggleId}>
              High contrast
            </label>
            <div className="toggleSwitch">
              <input
                id={toggleId}
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                aria-label="Toggle high contrast mode"
              />
              <span className="toggleTrack" aria-hidden="true">
                <span className="toggleThumb" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </header>

      <main id="content" className="pageContainer" tabIndex={-1}>
        <div className="contentInner">{children}</div>
      </main>
    </div>
  );
}

