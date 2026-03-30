'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, User } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide Navbar on Landing and Login pages to avoid duplication
  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  return (
    <nav className="px-8 py-6 border-b-2 border-slate-100 flex justify-between items-center bg-white sticky top-0 z-50 shadow-sm">
      <button 
        onClick={() => router.push('/')}
        className="flex items-center gap-3 text-2xl font-black focus:outline-none focus:ring-8 focus:ring-blue-100 p-2 rounded-xl transition-all active:scale-95 group"
        aria-label="Ana Sayfaya Dön"
      >
        <div className="bg-slate-900 text-white p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
          <Home size={28} />
        </div>
        <span className="text-slate-900">Ana Menü</span>
      </button>

      {/* Profil button is optional, but helps them navigate settings */}
      <button 
        onClick={() => router.push('/settings')}
        className="text-xl font-black bg-blue-50 text-blue-700 px-6 py-4 rounded-2xl focus:outline-none focus:ring-8 focus:ring-blue-100 transition-all active:scale-95 flex items-center gap-2 hover:bg-blue-100"
        aria-label="Erişilebilirlik Ayarları"
      >
        <User size={24} />
        Ayarlar
      </button>
    </nav>
  );
}
