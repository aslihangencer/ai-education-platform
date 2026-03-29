'use client';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Note: Ensure AuthContext is exported from AuthContext.tsx
// I will update AuthContext.tsx to export the context object if needed.
// But for now, let's assume it's there.

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
