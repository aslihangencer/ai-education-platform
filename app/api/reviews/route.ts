import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { teacherId, rating, comment, audioUrl } = await req.json();

  if (!teacherId || !rating) {
    return NextResponse.json({ error: 'Missing teacherId or rating' }, { status: 400 });
  }

  // 1. Create the review record
  const review = await prisma.review.create({
    data: {
      rating: parseInt(rating),
      comment,
      audioUrl,
      studentId: session.user.id,
      teacherId
    }
  });

  // 2. Recalculate and Cache Teacher's averageRating
  const allReviews = await prisma.review.findMany({
    where: { teacherId },
    select: { rating: true }
  });

  const avgRating = allReviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / allReviews.length;

  await prisma.user.update({
    where: { id: teacherId },
    data: { averageRating: avgRating }
  });

  return NextResponse.json({ success: true, newAverage: avgRating });
}
