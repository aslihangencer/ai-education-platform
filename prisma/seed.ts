import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * prisma/seed.ts:
 * Generates a comprehensive 3-month demo data set (Jan-Mar 2026) 
 * to showcase the 'Living Academy' dashboard features.
 */
async function main() {
  console.log("🌱 Temizlik başlatılıyor...");
  
  // 1. Delete existing logs/results/exams to prevent primary key collisions in demo
  await prisma.lessonLog.deleteMany();
  await prisma.result.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.systemConfig.deleteMany();
  
  console.log("✅ Eski veriler temizlendi. Demo veriler yükleniyor...");

  // 2. Create or find the Primary Teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'hoca@akademi.com' },
    update: {},
    create: {
      id: 'teacher-demo-01',
      name: "Dr. Ahmet Arslan",
      email: 'hoca@akademi.com',
      role: Role.TEACHER,
      highContrast: false,
    }
  });

  // 3. Create Demo Students
  const studentA = await prisma.user.upsert({
    where: { email: 'ali@akademi.com' },
    update: {},
    create: {
      id: 'student-ali-01',
      name: "Ali Yılmaz",
      email: 'ali@akademi.com',
      role: Role.STUDENT,
      highContrast: true,
    }
  });

  const studentB = await prisma.user.upsert({
    where: { email: 'ayse@akademi.com' },
    update: {},
    create: {
      id: 'student-ayse-01',
      name: "Ayşe Kaya",
      email: 'ayse@akademi.com',
      role: Role.STUDENT,
      highContrast: false,
    }
  });

  // 4. Create a Demo Material & Exam for Results
  const material = await prisma.material.create({
    data: {
      id: 'material-demo-01',
      title: "YKS Matematik - Temel Kavramlar",
      url: "https://example.com/demo.pdf",
      ownerId: studentA.id,
    }
  });

  const exam = await prisma.exam.create({
    data: {
      id: 'exam-demo-01',
      title: "Haftalık Tarama Sınavı",
      materialId: material.id,
      content: { questions: [] }
    }
  });

  // 5. Generate 60+ Lesson Logs for the last 3 months (Jan - Mar 2026)
  const books = ["Matematik Soru Bankası", "Türkçe Dil Bilgisi", "Fen Bilimleri", "İngilizce Gramer", "Tyt Tarih"];
  const logs = [];

  for (let i = 0; i < 60; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (i * 1.5)); // Historical staggering

    logs.push({
      date: date,
      bookName: books[Math.floor(Math.random() * books.length)],
      pagesRead: Math.floor(Math.random() * 30) + 5,
      questionsSolved: Math.floor(Math.random() * 80) + 20,
      duration: Math.floor(Math.random() * 90) + 30,
      teacherId: teacher.id,
      studentId: i % 2 === 0 ? studentA.id : studentB.id,
    });
  }

  await prisma.lessonLog.createMany({ data: logs });

  // 6. Initialize Global Stats for Social Proof
  const totalSolved = logs.reduce((acc, l) => acc + l.questionsSolved, 0);
  const totalHours = Math.round(logs.reduce((acc, l) => acc + l.duration, 0) / 60);

  await prisma.systemConfig.create({
    data: {
      key: "global_stats",
      value: {
        totalSolved: 12450 + totalSolved,
        totalHours: 450 + totalHours,
        activeStudents: 85,
        lastUpdated: new Date().toISOString()
      }
    }
  });

  // 6. Generate Historical Exam Results
  for (let i = 0; i < 10; i++) {
     await prisma.result.create({
       data: {
         score: Math.floor(Math.random() * 40) + 60, // 60-100 range
         correctCount: 8,
         wrongCount: 2,
         studentId: i % 2 === 0 ? studentA.id : studentB.id,
         examId: exam.id,
         completedAt: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)) // Weekly results
       }
     });
  }

  console.log(`🚀 BAŞARILI! 
    - 1 Hoca ve 2 Öğrenci oluşturuldu.
    - 60 Ders Kaydı eklendi.
    - 10 Sınav Sonucu işlendi.
  `);
}

main()
  .catch((e) => {
    console.error("Seed Hatası:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
