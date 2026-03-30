import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Güvenlik: Sadece giriş yapmış kullanıcılar (Öğretmenler) güncelleyebilir
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const { bioAudioUrl } = await req.json();

    if (!bioAudioUrl) {
      return NextResponse.json({ error: 'Ses bağlantısı (URL) bulunamadı' }, { status: 400 });
    }

    // Kullanıcının email'ine göre veritabanını güncelle
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { bioAudio: bioAudioUrl },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Profil sesiniz başarıyla veritabanına kaydedildi!',
      user: { id: updatedUser.id, name: updatedUser.name } 
    });
  } catch (error) {
    console.error('Update Bio Error:', error);
    return NextResponse.json({ error: 'Sunucu tarafında bir hata oluştu' }, { status: 500 });
  }
}
