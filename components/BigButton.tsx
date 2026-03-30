'use client';

import React from 'react';
import Link from 'next/link';

interface BigButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string; // Optional override
  primary?: boolean;
  children?: React.ReactNode;
}

export default function BigButton({ label, onClick, href, className = '', primary = true, children }: BigButtonProps) {
  
  // Audio feedback wrapper
  const handleClick = (e: React.MouseEvent) => {
    // Play a short tick sound (simulated by a very short beep)
    if ('vibrate' in navigator) navigator.vibrate(40);
    
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = `
    w-full 
    min-h-[80px] 
    text-2xl md:text-3xl 
    font-black 
    rounded-3xl 
    my-4
    px-8
    flex
    items-center
    justify-center
    text-center
    focus:outline-none 
    focus:ring-8 
    focus:ring-yellow-400
    focus:ring-offset-4
    transition-transform
    active:scale-95
    shadow-[0_8px_0_0_rgba(0,0,0,0.2)]
    active:shadow-[0_0px_0_0_rgba(0,0,0,0.2)]
    active:translate-y-2
  `;

  const colorClasses = primary 
    ? "bg-slate-900 hover:bg-black text-white" 
    : "bg-white hover:bg-slate-100 text-slate-900 border-4 border-slate-900";

  const finalClassName = `${baseClasses} ${colorClasses} ${className}`;

  const content = children || label;

  if (href) {
    return (
      <Link href={href} className={finalClassName} onClick={handleClick} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={finalClassName}
      aria-label={label}
    >
      {content}
    </button>
  );
}
