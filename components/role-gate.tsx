'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

interface RoleGateProps {
  allowedRole: 'STUDENT' | 'TEACHER';
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGate({ allowedRole, children, fallback = null }: RoleGateProps) {
  const { data: session, status } = useSession();

  // Optionally handle loading state
  if (status === 'loading') {
     return <div className="sr-only" aria-live="polite">Role yükleniyor...</div>;
  }

  // Enforce Rendering
  if (session?.user?.role !== allowedRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
