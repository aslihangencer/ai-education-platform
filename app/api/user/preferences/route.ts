import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      highContrast: true,
      preferredSpeed: true,
      isTtsEnabled: true
    }
  });

  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      highContrast: data.highContrast,
      preferredSpeed: data.preferredSpeed,
      isTtsEnabled: data.isTtsEnabled
    }
  });

  return NextResponse.json(updatedUser);
}
