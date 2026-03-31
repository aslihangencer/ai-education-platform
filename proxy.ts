import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // 'any' yerine doğru tipi kullanıyoruz

export function proxy(request: NextRequest) {
  // SaaS mantığı: Burada auth kontrolü veya loglama yapabiliriz
  return NextResponse.next();
}

// Hata Buradaydı: Matcher asla boş bırakılmamalıdır.
export const config = {
  matcher: [
    /*
     * Middleware'in çalışmasını istediğin rotalar:
     * - api (API rotaları)
     * - _next/static (statik dosyalar)
     * - _next/image (resim optimizasyon dosyaları)
     * - favicon.ico (favicon dosyası)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
