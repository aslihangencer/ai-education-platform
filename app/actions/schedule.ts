"use server";

import { createMeetEvent } from "@/lib/google-calendar";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * handleScheduleMeeting:
 * Orchestrates the full booking flow: creating a Google Meet session, 
 * persisting the appointment, and returning the link.
 */
export async function handleScheduleMeeting(studentId: string, studentEmail: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    // 1. Determine local time (e.g., tomorrow at 10:00 AM)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    // 2. Persist a Pending Appointment first to get an ID
    const appointment = await prisma.appointment.create({
      data: {
        title: "Haftalık Gelişim Değerlendirmesi",
        startTime: tomorrow,
        endTime: new Date(tomorrow.getTime() + 60 * 60 * 1000),
        status: "PENDING",
        teacherId: session.user.id,
        studentId: studentId
      }
    });

    // 3. Trigger Google Calendar Automation
    const meetResult = await createMeetEvent(
      appointment.id,
      tomorrow.toISOString(),
      studentEmail
    );

    return { 
      success: true, 
      meetLink: meetResult.meetLink 
    };
  } catch (error) {
    console.error("Schedule Meeting Error:", error);
    return { 
      success: false, 
      error: "Takvim bağlantısı kurulamadı. Lütfen Google izinlerini kontrol edin." 
    };
  }
}
