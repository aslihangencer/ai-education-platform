"use server";

import * as XLSX from 'xlsx';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { updateGlobalStats } from '@/lib/stats';

/**
 * importLessonsFromExcel:
 * Parses an uploaded .xlsx file and bulk-creates LessonLog entries 
 * for student performance tracking.
 */
export async function importLessonsFromExcel(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'TEACHER') {
      throw new Error("Unauthorized: Only teachers can import lesson logs.");
    }

    const file = formData.get('file') as File;
    if (!file) throw new Error("No file selected.");

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Excel Columns: Date, BookName, PagesRead, QuestionsSolved, DurationMinutes, StudentId
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);

    if (data.length === 0) throw new Error("Excel file is empty.");

    const createdLessons = await Promise.all(
      data.map(async (row: any) => {
        // Validate student existence before creating log
        const student = await prisma.user.findUnique({
          where: { id: row.StudentId || "" }
        });

        if (!student) return null;

        return prisma.lessonLog.create({
          data: {
            date: new Date(row.Date),
            bookName: row.BookName || "Bilinmeyen Kitap",
            pagesRead: parseInt(row.PagesRead) || 0,
            questionsSolved: parseInt(row.QuestionsSolved) || 0,
            duration: parseInt(row.DurationMinutes) || 0,
            teacherId: session.user.id,
            studentId: student.id,
          }
        });
      })
    );

    const validLessons = createdLessons.filter(l => l !== null);
    
    // Calculate totals for Social Proof / Growth Metrics
    const totalQuestions = validLessons.reduce((acc, l: any) => acc + (l.questionsSolved || 0), 0);
    const totalDuration = validLessons.reduce((acc, l: any) => acc + (l.duration || 0), 0);

    // Update system-wide persistence
    await updateGlobalStats({ 
       questionsSolved: totalQuestions, 
       durationMinutes: totalDuration 
    });

    // Revalidate dashboard to reflect new data
    revalidatePath('/dashboard');

    return { success: true, count: validLessons.length };
  } catch (error) {
    console.error("Excel Import Error:", error);
    throw new Error("Excel verisi işlenemedi. Şablon formatını kontrol edin.");
  }
}
