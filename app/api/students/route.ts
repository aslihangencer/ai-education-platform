import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Aciklamalar eklenecek' }, { status: 403 });
    }

    // Fetch all users with role STUDENT
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        preferredSpeed: true,
        enrolledLessons: {
          select: {
            completed: true,
            progress: true,
            lesson: {
              select: { title: true }
            }
          }
        }
      }
    });

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
