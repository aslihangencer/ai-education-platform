import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, context: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = context.params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Ders bulunamadı' }, { status: 404 });
    }

    // Optionally mark student progress
    if (session.user.role === 'STUDENT') {
       // Fire and forget progress update
       try {
           await prisma.studentLesson.upsert({
               where: {
                   lessonId_studentId: {
                       lessonId: id,
                       studentId: session.user.id
                   }
               },
               update: { completed: true, progress: 100 },
               create: {
                   lessonId: id,
                   studentId: session.user.id,
                   completed: true,
                   progress: 100
               }
           });
       } catch (e) {
           console.log("Progress not tracked this time.");
       }
    }

    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
