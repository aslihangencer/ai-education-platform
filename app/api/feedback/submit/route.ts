import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id || session.user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized: Only teachers can provide feedback' }, { status: 401 });
  }

  const { submissionId, audioUrl, grade } = await req.json();

  if (!submissionId || !audioUrl) {
    return NextResponse.json({ error: 'Missing submissionId or audioUrl' }, { status: 400 });
  }

  const updatedSubmission = await prisma.submission.update({
    where: { id: submissionId },
    data: {
      audioFeedback: audioUrl,
      grade: grade || "Değerlendirildi"
    }
  });

  return NextResponse.json({ 
    success: true, 
    message: 'Sesli geri bildiriminiz öğrenciye başarıyla iletildi!',
    submission: updatedSubmission
  });
}
