'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrainCircuit, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/student';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans">
      {/* LEFT SIDE: BRANDING */}
      <section className="hidden md:flex md:w-5/12 bg-slate-50 border-r border-slate-100 flex-col items-start justify-between p-16 relative overflow-hidden">
        {/* Decorative subtle gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-600/20">
            <BrainCircuit size={36} className="text-white" />
          </div>
          <span className="text-3xl font-black text-slate-900 tracking-tight">Erişilebilir<span className="text-blue-600">AI</span></span>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Öğrenmenin <br/> en net ve sade hali.
          </h2>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed">
            Erişilebilirlik standartlarına uygun, göz yormayan, karmaşadan uzak yeni nesil eğitim paneli.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-lg font-bold text-slate-400">© 2026 ErişilebilirAI Inc.</p>
        </div>
      </section>

      {/* RIGHT SIDE: LOGIN FORM */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-[480px]">
          <div className="md:hidden flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-xl">
              <BrainCircuit size={28} className="text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900">Erişilebilir<span className="text-blue-600">AI</span></span>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Giriş Yap
            </h1>
            <p className="text-xl text-slate-500">
              Hesabınıza erişmek için bilgilerinizi girin.
            </p>
          </div>

          <Card className="shadow-none border-none md:shadow-premium md:border-solid md:border-slate-100 border md:p-2 p-0">
            <CardContent className="p-0 md:p-8 pt-0 md:pt-8 flex flex-col gap-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-xl flex gap-3 h-16"
                onClick={() => signIn('google', { callbackUrl })}
                aria-label="Google hesabınızla giriş yapın"
              >
                <Globe className="w-6 h-6 text-slate-700" />
                Google ile Devam Et
              </Button>

              <div className="relative flex items-center justify-center py-4">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="absolute bg-white px-4 text-base font-bold text-slate-400">
                  VEYA E-POSTA İLE
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-lg font-bold border border-red-100" role="alert">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-lg font-bold text-slate-700 ml-1 cursor-pointer">
                    E-posta Adresi
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@ogrenci.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-required="true"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="password" className="text-lg font-bold text-slate-700 ml-1 cursor-pointer">
                    Şifre
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-required="true"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-2 text-xl h-16"
                  disabled={loading}
                  aria-label="Sisteme Giriş Yap"
                >
                  {loading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <>GİRİŞ YAP <ArrowRight className="w-6 h-6 ml-2" /></>
                  )}
                </Button>
              </form>

              <p className="text-center text-lg font-medium text-slate-500 mt-4">
                Hesabınız yok mu? <a href="/register" className="text-blue-600 font-bold hover:underline underline-offset-4">Kayıt Olun</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
