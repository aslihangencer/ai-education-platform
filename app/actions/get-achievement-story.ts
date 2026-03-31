"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * getStudentAchievementStory:
 * Mock AI-driven motivational engine for demonstration.
 * In production, this would use actual AI API like Gemini.
 */
export async function getStudentAchievementStory() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("Unauthorized");

    const studentId = session.user.id;

    // 1. Fetch data from the last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const stats = await prisma.lessonLog.findMany({
      where: {
        studentId: studentId,
        date: { gte: lastWeek }
      },
      orderBy: { date: 'desc' }
    });

    const recentResults = await prisma.result.findMany({
      where: {
        studentId: studentId,
        completedAt: { gte: lastWeek }
      },
      include: { exam: true }
    });

    // 2. Data Aggregation
    const totalSolved = stats.reduce((acc: number, curr: any) => acc + curr.questionsSolved, 0);
    const totalPages = stats.reduce((acc: number, curr: any) => acc + curr.pagesRead, 0);
    const topBook = stats[0]?.bookName || "kitapların";
    const avgScore = recentResults.length > 0
      ? Math.round(recentResults.reduce((acc: number, curr: any) => acc + curr.score, 0) / recentResults.length)
      : null;

    // 3. Mock AI Generation - simulates Gemini response
    const mockStories = [
      `Harikasın! Bu hafta ${totalSolved} soru çözdün ve ${totalPages} sayfa okudun. ${topBook} kitabındaki çalışmaların gerçekten etkileyici. Devam et, başarı seninle!`,
      `Tebrikler! Son 7 günde gösterdiğin azim takdire şayan. ${totalSolved} soruyu başarıyla tamamladın. ${avgScore ? `Ortalama puanının %${avgScore} olması` : 'Çalışmaların'} seni gururlandırıyor.`,
      `Muhteşem bir hafta geçirdin! ${totalPages} sayfa okuma ve ${totalSolved} soru çözme başarını kutluyorum. ${topBook} konusundaki ilerlemen harika görünüyor.`
    ];

    const story = mockStories[Math.floor(Math.random() * mockStories.length)];

    return {
      success: true,
      story: story,
      stats: {
        totalSolved,
        totalPages,
        avgScore
      }
    };
  } catch (error) {
    console.error("Achievement Story Error:", error);
    return {
      success: false,
      story: "Bu hafta gösterdiğin çaba için tebrikler! Çalışmaya devam et, her adım seni hedefine yaklaştırıyor."
    };
  }
}
