import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

export function LinkButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: LinkProps & { variant?: 'primary' | 'secondary'; className?: string; children: ReactNode }) {
  const variantClass = variant === 'primary' ? 'btnPrimary' : 'btnSecondary';
  return (
    <Link
      {...props}
      className={`btnLink ${variantClass} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}

