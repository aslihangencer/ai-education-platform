import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role === 'TEACHER') {
      const lessons = await prisma.lesson.findMany({
        where: { teacherId: session.user.id },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(lessons);
    } else {
      // Students see published lessons
      const lessons = await prisma.lesson.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json(lessons);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const json = await request.json();
    const { title, content, audioUrl } = json;

    if (!title || !content) {
      return NextResponse.json({ error: 'Başlık ve içerik zorunludur' }, { status: 400 });
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        audioUrl,
        teacherId: session.user.id,
        status: 'PUBLISHED',
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
