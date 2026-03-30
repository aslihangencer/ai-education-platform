import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bioAudio } = await req.json();

    if (!bioAudio) {
      return NextResponse.json({ error: 'Ses kaydı bulunamadı' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { bioAudio },
    });

    return NextResponse.json({ message: 'Profil başarıyla güncellendi', user: updatedUser });
  } catch (error) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
