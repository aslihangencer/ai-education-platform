import { prisma } from './prisma';

export async function createLessonAppointment(data: {
  studentId: string;
  teacherId: string;
  startTime: Date;
  endTime: Date;
  title: string;
}) {
  // 1. Google Meet Linki Oluşturma (Simülasyon - API Key gelince aktifleşecek)
  const generatedMeetLink = "https://meet.google.com/abc-defg-hij"; 

  // 2. Prisma ile Veritabanına Kaydetme
  const appointment = await prisma.appointment.create({
    data: {
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      studentId: data.studentId,
      teacherId: data.teacherId,
      meetLink: generatedMeetLink, // Meet linki buraya ekleniyor
      status: 'ACCEPTED'
    }
  });

  return appointment;
}
