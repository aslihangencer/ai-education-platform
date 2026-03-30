"use server";

import { prisma } from "@/lib/prisma";
import { getGlobalStats } from "@/lib/stats";

/**
 * getStudentAnalytics:
 * A professional Server Action to aggregate student performance data 
 * from both manual LessonLogs (Excel) and AI-generated Exams.
 * Now integrated with persistent SystemConfig stats.
 */
export async function getStudentAnalytics(teacherId: string) {
  try {
    // 1. Fetch students and their recent activity
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        studentResults: {
          include: { exam: true },
          orderBy: { completedAt: 'desc' },
          take: 5
        },
        studentLogs: {
          orderBy: { date: 'desc' },
          take: 10
        },
        _count: {
          select: { materials: true }
        }
      }
    });

    // 2. Fetch persistent global stats
    const globalStats = await getGlobalStats();

    // 3. Dynamic counts for additional dashboard context
    const currentSessionsCount = await prisma.appointment.count();

    return {
      students,
      stats: {
        ...globalStats,
        totalAppointments: currentSessionsCount
      }
    };
  } catch (error) {
    console.error("Analytics Error:", error);
    // Return empty but safe structure to prevent UI crashes
    return {
       students: [],
       stats: { totalSolved: 0, totalHours: 0, activeStudents: 0 }
    };
  }
}
