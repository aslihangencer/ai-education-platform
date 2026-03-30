import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { content, category } = await req.json();

  if (!content || !category) {
    return NextResponse.json({ error: 'Missing content or category' }, { status: 400 });
  }

  const feedback = await prisma.feedback.create({
    data: {
      content,
      category,
      role: session.user.role,
      userId: session.user.id
    }
  });

  return NextResponse.json({ 
    success: true, 
    message: 'Geri bildiriminiz için teşekkürler! Gelişimimize katkıda bulundunuz.' 
  });
}
