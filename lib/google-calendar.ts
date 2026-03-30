"use server";

import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * createMeetEvent:
 * Automates Google Meet link generation for mentorship sessions
 * by integrating with the teacher's Google Calendar.
 */
export async function createMeetEvent(
  appointmentId: string, 
  startTime: string, 
  studentEmail: string
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      throw new Error("Calendar access requires Google authentication.");
    }

    // 1. Initialize Google OAuth2 Client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // 2. Define the Meet Event
    const event = {
      summary: 'Engelsiz Akademi - Erişilebilir Özel Ders',
      description: 'AI destekli ve sesli asistan uyumlu birebir eğitim seansı.',
      start: { 
        dateTime: startTime, 
        timeZone: 'Europe/Istanbul' 
      },
      end: { 
        dateTime: new Date(new Date(startTime).getTime() + 60 * 60 * 1000).toISOString(), 
        timeZone: 'Europe/Istanbul' 
      },
      attendees: [{ email: studentEmail }],
      conferenceData: {
        createRequest: { 
          requestId: `meet-${appointmentId}-${Date.now()}`, 
          conferenceSolutionKey: { type: 'hangoutsMeet' } 
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    // 3. Create the Event with Meet Link
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });

    const meetLink = response.data.hangoutLink;

    if (!meetLink) {
      throw new Error("Google Meet link could not be generated.");
    }

    // 4. Persistence: Update the Appointment in Prisma
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { meetLink: meetLink }
    });

    return {
      success: true,
      meetLink: meetLink,
      eventId: response.data.id
    };
  } catch (error) {
    console.error("Google Calendar API Error:", error);
    throw new Error("Randevu oluşturulurken bir hata oluştu. Lütfen Google izinlerini kontrol edin.");
  }
}
