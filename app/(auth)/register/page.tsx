'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, GraduationCap, User, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  const [role, setRole] = useState<'STUDENT' | 'TEACHER' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating registration flow
    setTimeout(() => {
      setLoading(false);
      router.push(role === 'TEACHER' ? '/teacher' : '/student');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* 🏙️ LEFT SIDE: BRANDING */}
      <section className="hidden md:flex md:w-5/12 bg-slate-50 border-r border-slate-100 flex-col items-start justify-between p-16 relative overflow-hidden">
        {/* Decorative subtle gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-600/20">
            <BrainCircuit size={36} className="text-white" />
          </div>
          <span className="text-3xl font-black text-slate-900 tracking-tight">Erişilebilir<span className="text-blue-600">AI</span></span>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Bugün yeni bir <br/> pencere açıyoruz.
          </h2>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed">
            Görme engelli öğrenciler ve gönüllü eğitmenler için dünyadaki ilk %100 erişilebilir eğitim portalı.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-lg font-bold text-slate-400">© 2026 ErişilebilirAI Inc.</p>
        </div>
      </section>

      {/* 📝 RIGHT SIDE: REGISTER FORM */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-white relative overflow-y-auto">
        <div className="w-full max-w-[480px]">
          
          <div className="md:hidden flex items-center gap-3 mb-10 cursor-pointer" onClick={() => router.push('/')}>
            <div className="bg-blue-600 p-2 rounded-xl">
              <BrainCircuit size={28} className="text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900">Erişilebilir<span className="text-blue-600">AI</span></span>
          </div>

          <header className="mb-10 text-center md:text-left transition-all duration-300">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Kayıt Ol
            </h1>
            <p className="text-xl text-slate-500">
              {role ? "Bilgilerinizi girerek hesabınızı oluşturun." : "Öğrenmek veya öğretmek için rolünüzü seçin."}
            </p>
          </header>

          {!role ? (
            /* 🎭 STEP 1: ROLE SELECTION */
            <div className="space-y-6">
              <RoleCard 
                title="Öğrenci Olarak Kayıt Ol" 
                desc="Genişletilmiş erişilebilirlik, sesli komutlar ve AI destekli öğrenim araçları." 
                icon={GraduationCap}
                onClick={() => setRole('STUDENT')}
              />
              <RoleCard 
                title="Eğitmen Olarak Kayıt Ol" 
                desc="Topluluğa katıl, kendi sınıflarını aç ve bilgi paylaş." 
                icon={User}
                onClick={() => setRole('TEACHER')}
              />
              
              <p className="text-center text-lg font-medium text-slate-500 mt-8">
                Zaten bir hesabınız var mı? <a href="/login" className="text-blue-600 font-bold hover:underline underline-offset-4">Giriş Yapın</a>
              </p>
            </div>
          ) : (
            /* 📝 STEP 2: REGISTRATION DETAILS */
            <div className="animate-in slide-in-from-right-8 duration-500">
               <Card className="shadow-none border-none md:shadow-premium md:border-solid md:border-slate-100 border p-0 md:p-2">
                 <CardContent className="p-0 md:p-8 pt-0 md:pt-8 flex flex-col gap-6">
                   <button 
                    onClick={() => setRole(null)}
                    className="mb-2 text-blue-600 font-bold text-lg flex items-center gap-2 hover:-translate-x-1 transition-transform w-fit"
                   >
                     <ArrowLeft size={24} /> Rol Seçimine Dön
                   </button>

                   <form onSubmit={handleRegister} className="flex flex-col gap-6">
                     
                     <div className="flex flex-col gap-3">
                        <label htmlFor="name" className="text-lg font-bold text-slate-700 ml-1">
                          Ad Soyad
                        </label>
                        <Input 
                            id="name"
                            placeholder="Tam Adınız" 
                            required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                     </div>

                     <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-lg font-bold text-slate-700 ml-1">
                          E-posta Adresi
                        </label>
                        <Input 
                            id="email"
                            type="email"
                            placeholder="ornek@mail.com" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                     
                     <div className="flex flex-col gap-3">
                        <label htmlFor="password" className="text-lg font-bold text-slate-700 ml-1">
                          Şifre Belirleyin
                        </label>
                        <Input 
                            id="password"
                            type="password"
                            placeholder="••••••••" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>

                     <Button 
                        type="submit"
                        size="lg"
                        className="w-full mt-4 h-16 text-xl" 
                        disabled={loading}
                     >
                        {loading ? (
                          <Loader2 className="w-8 h-8 animate-spin" />
                        ) : (
                          <>HESABIMI OLUŞTUR <ArrowRight className="w-6 h-6 ml-2" /></>
                        )}
                     </Button>
                   </form>
                 </CardContent>
               </Card>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}

function RoleCard({ title, desc, icon: Icon, onClick }: any) {
  return (
    <Card 
       onClick={onClick} 
       className="p-6 cursor-pointer flex items-start gap-6 border-2 border-slate-100 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/10 transition-all active:scale-95 group"
    >
      <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={40} />
      </div>
      <div className="flex-1 mt-1">
        <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-lg font-medium text-slate-500 leading-snug">{desc}</p>
      </div>
    </Card>
  );
}
