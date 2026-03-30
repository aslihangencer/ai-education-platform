'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ForbiddenPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleReturn = () => {
    if (session?.user?.role === 'TEACHER') {
      router.push('/teacher');
    } else if (session?.user?.role === 'STUDENT') {
      router.push('/student');
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <section
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        aria-labelledby="forbidden-heading"
      >
        <div className="text-6xl md:text-8xl mb-6" aria-hidden="true">🚫</div>

        <h1 id="forbidden-heading" className="text-4xl md:text-6xl font-black text-red-700 mb-6">
          Erişim Reddedildi (403)
        </h1>

        <p className="text-2xl font-medium text-slate-800 mb-8" tabIndex={0}>
          Görmeye çalıştığınız sayfaya erişim yetkiniz bulunmuyor. Bu durum rolünüzle ilgili bir kısıtlamadan kaynaklanmaktadır.
        </p>

        <button
          onClick={handleReturn}
          className="mt-4 w-full md:w-auto px-10 py-5 bg-slate-800 hover:bg-slate-900 focus:ring-8 focus:ring-slate-400 text-white rounded-xl text-3xl font-bold transition-all shadow-lg outline-none"
          aria-label="Güvenli alanıma geri dön"
        >
          Paneline Geri Dön
        </button>
      </section>
    </main>
  );
}
