"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * getStudentAchievementStory:
 * An AI-driven motivational engine that synthesizes raw lesson logs 
 * and exam results into a personalized "Success Story" for the student.
 * Uses Gemini 1.5 Flash for high-speed, empathetic narrations.
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

    // 3. AI Generation via Gemini 1.5 Flash
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Sen "Engelsiz Akademi" projesinde yapay zeka tabanlı bir eğitim mentorusun. 
      Görevin, görme engelli bir öğrenciye haftalık performans özetini sesli okunacak şekilde sunmak.
      
      Öğrencinin son 7 günlük verileri:
      - Toplam Çözülen Soru: ${totalSolved}
      - Toplam Okunan Sayfa: ${totalPages}
      - En Çok Çalışılan Kaynak: ${topBook}
      - Son Sınav Puan Ortalaması: ${avgScore ? `%${avgScore}` : "Sınav girişi yok"}
      
      Talimatlar:
      - 2-3 cümlelik, samimi, cesaret verici ve başarıyı kutlayan bir metin yaz.
      - Metin sesli asistan tarafından okunacağı için karmaşık sembollerden kaçın.
      - Öğrenciye ismiyle hitap etme (anonim tut).
      - Türkçe konuş.
    `;

    const result = await model.generateContent(prompt);
    const story = result.response.text().trim();

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
