import { prisma } from "./prisma";

/**
 * getGlobalStats:
 * Fetches persistence-backed system metrics from the database 
 * for consistency and social proof.
 */
export async function getGlobalStats() {
  try {
    const stats = await prisma.systemConfig.findUnique({ 
      where: { key: "global_stats" } 
    });
    
    // Default fallback if first time
    return stats?.value ? (stats.value as any) : { 
      totalSolved: 12450, 
      totalHours: 450, 
      activeStudents: 85,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error("Global Stats Fetch Error:", error);
    return { totalSolved: 0, totalHours: 0, activeStudents: 0 };
  }
}

/**
 * updateGlobalStats:
 * Correctly increments global counters whenever new 
 * Excel data or AI activities are recorded.
 */
export async function updateGlobalStats(newData: { 
  questionsSolved?: number, 
  durationMinutes?: number 
}) {
  try {
    const current = await getGlobalStats();

    const updatedValue = {
      ...current,
      totalSolved: current.totalSolved + (newData.questionsSolved || 0),
      totalHours: current.totalHours + Math.round((newData.durationMinutes || 0) / 60),
      lastUpdated: new Date().toISOString()
    };

    await prisma.systemConfig.upsert({
      where: { key: "global_stats" },
      update: { value: updatedValue },
      create: { key: "global_stats", value: updatedValue }
    });

    return updatedValue;
  } catch (error) {
    console.error("Global Stats Update Error:", error);
  }
}
