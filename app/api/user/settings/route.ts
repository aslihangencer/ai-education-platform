import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();

  // Map user-provided speechRate to schema preferredSpeed
  const updateData: any = {};
  if (data.highContrast !== undefined) updateData.highContrast = data.highContrast;
  if (data.isTtsEnabled !== undefined) updateData.isTtsEnabled = data.isTtsEnabled;
  if (data.speechRate !== undefined) updateData.preferredSpeed = data.speechRate;
  if (data.preferredSpeed !== undefined) updateData.preferredSpeed = data.preferredSpeed;

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: updateData
  });

  return NextResponse.json(updatedUser);
}
