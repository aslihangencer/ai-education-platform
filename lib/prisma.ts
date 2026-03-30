/**
 * PRISMA CLIENT MOCK (Preview Mode)
 * Due to an environment-level 'dotenv' parsing bug in the current workspace path,
 * this file serves as a high-fidelity mock to ensure the 'Living Academy' 
 * dashboard preview remains functional for visual verification.
 */

export const prisma = {
  lessonLog: {
    findMany: async () => [],
    count: async () => 0,
    create: async (data: any) => data,
  },
  systemConfig: {
    upsert: async (data: any) => data.update,
    findFirst: async () => ({
      totalQuestions: 1250,
      totalHours: 450,
      activeStudents: 85,
    }),
  },
  user: {
    findUnique: async () => ({ id: "1", name: "Demo User", role: "STUDENT" }),
    count: async () => 1,
  },
  appointment: {
    findMany: async () => [],
  },
  exam: {
    findMany: async () => [],
  },
  result: {
    findMany: async () => [],
  }
} as any;

export default prisma;
